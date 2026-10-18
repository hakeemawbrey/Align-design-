// npm run write -- [options]
//
// Asks Claude for fresh lines and appends the ones that pass CONTENT.md to
// content/<sign>.json, so the library never runs dry.
//
//   --sign scorpio      write for this sign
//   --all               write for every sign
//   --n 10              lines per sign (default 10)
//   --topic love|self   only this topic (default: about half each)
//   --dry               print what would be added, write nothing
//
// Needs ANTHROPIC_API_KEY. Set CONTENT_DIR to point at another library.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import Anthropic from '@anthropic-ai/sdk'
import { jsonSchemaOutputFormat } from '@anthropic-ai/sdk/helpers/json-schema'
import { ROOT, CONTENT_DIR, SIGNS, TOPICS, validateLine, norm, loadLibrary } from './content.mjs'

export const MODEL = 'claude-opus-5-5'
const RETRIES = 2
const RULES = fs.readFileSync(path.join(ROOT, 'CONTENT.md'), 'utf8')

const SCHEMA = {
  type: 'object',
  properties: {
    lines: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          topic: { type: 'string', enum: TOPICS },
          text: { type: 'string' },
          caption: { type: 'string' },
        },
        required: ['topic', 'text', 'caption'],
        additionalProperties: false,
      },
    },
  },
  required: ['lines'],
  additionalProperties: false,
}

const SYSTEM = `You write lines for zodiac.exe, a series of short vertical reels where a Windows-98 popup types out one line of advice to one zodiac sign.

Follow this writing guide exactly. Lines that break it are thrown away.

<writing_guide>
${RULES}
</writing_guide>

Each request gives you the lines the library already has. Every new line must be a new idea, not a rewording of an existing one, and not an existing sentence with a different sign's name. Count characters carefully: the text, including the sign's name, must be 40 to 95 characters.`

const cap = (s) => s[0].toUpperCase() + s.slice(1)
const shuffle = (a) => a.map((v) => [Math.random(), v]).sort((x, y) => x[0] - y[0]).map((x) => x[1])

function split(n, topic) {
  if (topic) return { [topic]: n }
  const love = Math.ceil(n / 2)
  return { love, self: n - love }
}

function prompt(sign, want, library, extra) {
  const mine = library.filter((l) => l.sign === sign)
  const others = shuffle(library.filter((l) => l.sign !== sign)).slice(0, 40)
  const total = Object.values(want).reduce((a, b) => a + b, 0)
  const asks = Object.entries(want).filter(([, k]) => k > 0).map(([t, k]) => `${k} ${t}`).join(', ')
  const parts = [
    `Sign: ${sign} (every line starts with "${cap(sign)}, ").`,
    `Existing ${sign} lines (match this voice, do not repeat these ideas):\n` + mine.map((l) => `- [${l.topic}] ${l.text}`).join('\n'),
    `A sample of other signs' lines (do not reuse these sentences):\n` + others.map((l) => `- ${l.text}`).join('\n'),
  ]
  if (extra.accepted.length) parts.push('Already accepted this session (do not repeat):\n' + extra.accepted.map((l) => `- ${l.text}`).join('\n'))
  if (extra.rejected.length) parts.push('These were rejected, write replacements, not fixes of the same idea if it was a duplicate:\n' + extra.rejected.map((r) => `- ${r.text} (${r.why})`).join('\n'))
  parts.push(`Write ${total} new ${sign} line${total === 1 ? '' : 's'}: ${asks}.`)
  return parts.join('\n\n')
}

// One request. Returns the candidate lines Claude wrote.
async function ask(client, content) {
  const res = await client.beta.messages.parse({
    model: MODEL,
    max_tokens: 16000,
    betas: ['server-side-fallback-2026-07-01'],
    fallbacks: 'default',
    system: [{ type: 'text', text: SYSTEM, cache_control: { type: 'ephemeral' } }],
    messages: [{ role: 'user', content }],
    output_config: { effort: 'high', format: jsonSchemaOutputFormat(SCHEMA) },
  })
  if (res.stop_reason === 'refusal') throw new Error(`Claude declined (${res.stop_details?.category ?? 'no category'})`)
  if (res.stop_reason === 'max_tokens') throw new Error('response hit max_tokens')
  if (!res.parsed_output?.lines) throw new Error('response had no parseable lines')
  return res.parsed_output.lines
}

// Generates, validates and (unless dry) appends lines for one sign.
export async function writeSign(client, sign, { n = 10, topic = null, dry = false } = {}) {
  const library = loadLibrary()
  const seen = new Set(library.map((l) => norm(l.text)))
  const target = split(n, topic)
  const accepted = []
  const rejected = []
  let lastRejects = []

  for (let round = 0; round <= RETRIES && accepted.length < n; round++) {
    const want = {}
    for (const t of Object.keys(target)) want[t] = Math.max(0, target[t] - accepted.filter((l) => l.topic === t).length)
    // if one topic overshot, top the other up so the total still comes to n
    const short = n - accepted.length - Object.values(want).reduce((a, b) => a + b, 0)
    if (short > 0) want[Object.keys(want)[0]] += short

    const cands = await ask(client, prompt(sign, want, library, { accepted, rejected: lastRejects }))
    lastRejects = []
    for (const c of cands) {
      if (accepted.length >= n) break
      const l = { topic: c.topic, text: (c.text || '').trim(), caption: (c.caption || '').trim() }
      const errs = validateLine(sign, l)
      if (topic && l.topic !== topic) errs.push(`topic must be ${topic}`)
      if (seen.has(norm(l.text))) errs.push('duplicate of an existing line')
      if (errs.length) {
        const r = { ...l, why: errs.join(', ') }
        rejected.push(r)
        lastRejects.push(r)
        continue
      }
      seen.add(norm(l.text))
      accepted.push(l)
    }
  }

  let written = 0
  if (!dry && accepted.length) {
    // re-read right before writing so edits made meanwhile are kept
    const file = path.join(CONTENT_DIR, `${sign}.json`)
    const data = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : { sign, lines: [] }
    const have = new Set(data.lines.map((l) => norm(l.text)))
    const add = accepted.filter((l) => !have.has(norm(l.text)))
    data.lines.push(...add)
    fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n')
    written = add.length
  }
  return { accepted, rejected, written }
}

function report(sign, { accepted, rejected, written }, dry) {
  const tail = dry ? '(dry run, nothing written)' : `${written} written to ${path.relative(process.cwd(), path.join(CONTENT_DIR, sign + '.json'))}`
  console.log(`${sign.padEnd(12)} ${accepted.length} accepted  ${rejected.length} rejected  ${tail}`)
  for (const l of accepted) console.log(`  + [${l.topic}] ${l.text}  · ${l.caption}`)
  for (const r of rejected) console.log(`  x ${r.text}  (${r.why})`)
}

async function main() {
  const args = process.argv.slice(2)
  const opt = (name, def) => {
    const i = args.indexOf('--' + name)
    if (i === -1) return def
    const v = args[i + 1]
    return v === undefined || v.startsWith('--') ? true : v
  }
  const ALL = opt('all', false)
  const SIGN = opt('sign', null)
  const TOPIC = opt('topic', null)
  const N = +opt('n', 10)
  const DRY = !!opt('dry', false)

  const fail = (msg) => { console.error(msg); process.exit(1) }
  if (!ALL && (!SIGN || SIGN === true)) fail('usage: npm run write -- --sign <sign> | --all  [--n 10] [--topic love|self] [--dry]')
  if (SIGN && !ALL && !SIGNS.includes(SIGN)) fail(`unknown sign "${SIGN}" (one of: ${SIGNS.join(' ')})`)
  if (TOPIC && !TOPICS.includes(TOPIC)) fail(`--topic must be love or self`)
  if (!Number.isInteger(N) || N < 1) fail('--n must be a whole number above 0')
  if (!process.env.ANTHROPIC_API_KEY) fail('ANTHROPIC_API_KEY is not set. Get a key at https://platform.claude.com/settings/keys, then: export ANTHROPIC_API_KEY=sk-ant-...')

  const client = new Anthropic()
  let total = 0
  let failed = 0
  for (const sign of ALL ? SIGNS : [SIGN]) {
    try {
      const r = await writeSign(client, sign, { n: N, topic: TOPIC, dry: DRY })
      report(sign, r, DRY)
      total += DRY ? r.accepted.length : r.written
    } catch (e) {
      failed++
      if (e instanceof Anthropic.AuthenticationError) fail('ANTHROPIC_API_KEY was rejected (401). Check the key and try again.')
      if (e instanceof Anthropic.PermissionDeniedError) fail(`API permission denied (403): ${e.message}`)
      const what = e instanceof Anthropic.APIError ? `API error ${e.status ?? ''}: ${e.message}` : e.message
      console.error(`${sign.padEnd(12)} failed: ${what}`)
    }
  }
  console.log(`\n${total} new line(s)${DRY ? ' (dry run)' : ''}${failed ? `, ${failed} sign(s) failed` : ''}`)
  if (failed) process.exit(1)
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((e) => { console.error(`write: ${e.message}`); process.exit(1) })
}
