// The Claude API engine: fresh copy in the house voice.
//
// The system prompt is built at runtime from SPEC.md (voice / core / slide
// rules) and the hand-written carousels in content/*.json (few-shot), so it
// stays in sync with whatever the team edits. Claude writes copy only;
// backgrounds come from the same assignBackgrounds() the bank engine uses.
// Every carousel is validated; failures get one repair round with the errors.

import Anthropic from '@anthropic-ai/sdk'
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { SIGNS, CORE, LIMITS, validate } from './schema.mjs'
import { assignBackgrounds } from './backdrop.mjs'
import { ARCS, SIGN_BANK, THEMES } from './bank.mjs'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

// The most capable widely released Claude model; override with --model or ALIGN_MODEL.
export const DEFAULT_MODEL = 'claude-fable-5-1'
// Models that accept the server-side refusal fallback ("default" routing).
const FALLBACK_MODELS = ['claude-fable-5-1', 'claude-opus-5-5', 'claude-opus-5', 'claude-sonnet-5-5']

const COPY_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['carousels'],
  properties: {
    carousels: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['id', 'theme', 'title', 'signs', 'core', 'caption', 'hashtags', 'slides'],
        properties: {
          id: { type: 'string', description: 'short lowercase slug, e.g. leo-applause' },
          theme: { type: 'string', description: 'the advice theme id you were given' },
          title: { type: 'string' },
          signs: { type: 'array', items: { type: 'string', enum: SIGNS } },
          core: { type: 'array', items: { type: 'string', enum: CORE } },
          caption: { type: 'string' },
          hashtags: { type: 'array', items: { type: 'string' } },
          slides: {
            type: 'array',
            items: {
              type: 'object',
              additionalProperties: false,
              required: ['text'],
              properties: { text: { type: 'string' } },
            },
          },
        },
      },
    },
  },
}

/** Hand-written examples: content/*.json (top level only, not generated/). */
export function loadExamples() {
  const dir = path.join(ROOT, 'content')
  if (!existsSync(dir)) return []
  return readdirSync(dir)
    .filter((f) => f.endsWith('.json'))
    .sort()
    .flatMap((f) => {
      try {
        return [JSON.parse(readFileSync(path.join(dir, f), 'utf8'))]
      } catch {
        return []
      }
    })
}

export function buildSystemPrompt() {
  const spec = readFileSync(path.join(ROOT, 'SPEC.md'), 'utf8')
  const examples = loadExamples().map((c) => ({
    title: c.title, signs: c.signs, core: c.core, caption: c.caption, hashtags: c.hashtags,
    slides: (c.slides ?? []).map((s) => s.text),
  }))
  const traits = Object.entries(SIGN_BANK)
    .map(([s, d]) => `- ${s}: ${d.traits.map((t) => t.t.replace(/^you /, '')).join('; ')}`)
    .join('\n')
  const themes = THEMES.map((t) => `- ${t}: ${ARCS[t].label}`).join('\n')

  return `You write Instagram carousels for Align, a zodiac dating app played as a card game.

About Align, so the subtle lines are true: people are veiled cards; photos only show when both people align ("your face comes last"). You "release" a card instead of ghosting. There's a new deal of cards every night at 11:11. Dealbreakers go on your card, up front. Your Sun is who you are; Venus runs your heart (how you love). Never write an ad, never say "download" or "app".

The house spec below is the contract. Follow its Voice, core message and Slides rules exactly. Ignore the Visual and JSON sections: you only write copy, backgrounds are added afterwards.

<spec>
${spec}
</spec>

Hard limits checked by a validator: ${LIMITS.minSlides}–${LIMITS.maxSlides} slides; each slide at most ${LIMITS.maxWords} words and ${LIMITS.maxChars} characters (count them); all lowercase; no "!" or "#"; no emoji; caption lowercase, under ${LIMITS.maxCaption} characters, offhand; ${LIMITS.minTags}–${LIMITS.maxTags} hashtags, lowercase letters/digits/underscore, no "#". Titles can use normal capitalisation.

True sign traits you can lean on (one per carousel, never a lecture):
${traits}

Advice themes (use the theme id you're given in "theme"):
${themes}

These hand-written carousels are the bar for voice, rhythm and how lightly the Align line lands. Match their quality; don't copy their lines:
${JSON.stringify(examples, null, 1)}

Before answering, read each carousel aloud as one sentence. It should sound like a blunt, warm friend, be grammatical across the slide breaks, and end on the line that stings.`
}

function requireKey() {
  if (!process.env.ANTHROPIC_API_KEY && !process.env.ANTHROPIC_AUTH_TOKEN) {
    const e = new Error(
      'ANTHROPIC_API_KEY is not set, so the ai engine cannot run.\n' +
        '  export ANTHROPIC_API_KEY=sk-ant-...   then retry, or\n' +
        '  use the offline engine:  node src/generate.mjs --engine bank --sign all --count 12',
    )
    e.code = 'NO_API_KEY'
    throw e
  }
}

async function ask(client, { model, system, messages }) {
  const params = {
    model,
    max_tokens: 64000,
    thinking: { type: 'adaptive' },
    output_config: { effort: 'high', format: { type: 'json_schema', schema: COPY_SCHEMA } },
    system: [{ type: 'text', text: system, cache_control: { type: 'ephemeral' } }],
    messages,
  }
  let msg
  if (FALLBACK_MODELS.includes(model)) {
    // server-side refusal fallback: a declined request is re-run on a fallback model
    msg = await client.beta.messages
      .stream({ ...params, betas: ['server-side-fallback-2026-07-01'], fallbacks: 'default' })
      .finalMessage()
  } else {
    msg = await client.messages.stream(params).finalMessage()
  }
  if (msg.stop_reason === 'refusal') {
    throw new Error(`model declined the request${msg.stop_details?.category ? ` (${msg.stop_details.category})` : ''}`)
  }
  if (msg.stop_reason === 'max_tokens') throw new Error('response hit max_tokens; try a smaller --count')
  const text = msg.content.filter((b) => b.type === 'text').map((b) => b.text).join('')
  let parsed
  try {
    parsed = JSON.parse(text)
  } catch (e) {
    throw new Error(`could not parse model output as JSON: ${e.message}`)
  }
  return { msg, carousels: Array.isArray(parsed.carousels) ? parsed.carousels : [] }
}

const slug = (s) => String(s ?? '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 40)

/** Turn Claude's copy into a full carousel: id, cleanup, backgrounds. */
function finish(raw, job, seed) {
  const sign = job.sign ?? (SIGNS.includes(raw.signs?.[0]) ? raw.signs[0] : 'all')
  const theme = job.theme ?? (THEMES.includes(raw.theme) ? raw.theme : slug(raw.theme) || 'fresh')
  const c = {
    id: `g-${sign}-${theme}-${seed}`,
    title: String(raw.title ?? ''),
    signs: (raw.signs ?? []).filter((s) => SIGNS.includes(s)),
    core: (raw.core ?? []).filter((k) => CORE.includes(k)),
    caption: String(raw.caption ?? '').toLowerCase(),
    hashtags: (raw.hashtags ?? []).map((h) => String(h).replace(/^#/, '').toLowerCase()),
    theme,
    engine: 'ai',
    seed,
    slides: (raw.slides ?? []).map((s) => ({ text: String(s?.text ?? '') })),
  }
  if (!c.signs.length) c.signs = [sign]
  return assignBackgrounds(c, seed)
}

/**
 * Generate carousels with Claude.
 * jobs: [{ sign, theme? }]  (theme omitted = Claude picks a fresh one)
 * existingTitles: titles to avoid repeating.
 */
export async function generateAI({ jobs, seed, model, existingTitles = [], log = console.error }) {
  requireKey()
  const client = new Anthropic()
  model = model || process.env.ALIGN_MODEL || DEFAULT_MODEL
  const system = buildSystemPrompt()

  const list = jobs
    .map((j, i) => `${i + 1}. sign: ${j.sign}, theme: ${j.theme ?? 'your choice (pick a theme id, or a fresh one not in the list)'}`)
    .join('\n')
  const avoid = existingTitles.length
    ? `\n\nThese already exist; don't repeat their angle or lines:\n${existingTitles.map((t) => `- ${t}`).join('\n')}`
    : ''
  const messages = [
    {
      role: 'user',
      content: `Write ${jobs.length} new carousel${jobs.length > 1 ? 's' : ''}, one per line below, in this order:\n${list}${avoid}\n\nEach one: signs = [its sign], 1–2 core keys it actually carries, a short offhand caption, 3–6 hashtags.`,
    },
  ]

  log(`ai: asking ${model} for ${jobs.length} carousel(s)…`)
  const first = await ask(client, { model, system, messages })
  const out = jobs.map((job, i) => (first.carousels[i] ? finish(first.carousels[i], job, seed + i) : null))

  // one repair round for anything that fails validation
  const broken = out
    .map((c, i) => ({ i, errs: c ? validate(c) : ['missing from the response'] }))
    .filter((x) => x.errs.length)
  if (broken.length) {
    log(`ai: ${broken.length} failed validation, asking for one repair…`)
    const report = broken
      .map(({ i, errs }) => {
        const slides = out[i]?.slides.map((s) => s.text).join(' / ') ?? '(none)'
        return `#${i + 1} (${jobs[i].sign}, ${jobs[i].theme ?? 'free'}): ${slides}\n  problems: ${errs.join('; ')}`
      })
      .join('\n')
    messages.push({ role: 'assistant', content: first.msg.content })
    messages.push({
      role: 'user',
      content: `These failed the validator:\n${report}\n\nReturn corrected versions of only these ${broken.length}, in the same order, same schema. Keep the voice; fix the problems.`,
    })
    try {
      const fix = await ask(client, { model, system, messages })
      broken.forEach(({ i }, k) => {
        if (fix.carousels[k]) out[i] = finish(fix.carousels[k], jobs[i], seed + i)
      })
    } catch (e) {
      log(`ai: repair failed: ${e.message}`)
    }
  }

  const good = []
  out.forEach((c, i) => {
    const errs = c ? validate(c) : ['missing']
    if (errs.length) log(`ai: dropped #${i + 1} (${jobs[i].sign}): ${errs.join('; ')}`)
    else good.push(c)
  })
  return good
}
