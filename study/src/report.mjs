// Turn one page's downloads into the pack Claude reads, and the numbers report.
//
//   node src/report.mjs tylerinthemaking [--tz America/Chicago]
//
// Writes pack/<handle>/:
//   report.md      what they post, how often, and what does best (the numbers, no opinions)
//   posts.json     every post: numbers, caption, what's said, what's on screen, the hook
//   posts.csv      the same as a spreadsheet
//   sheets/*.jpg   one small contact sheet per post (stills of a reel, or a carousel's slides)
//   README.md      what this is
//
// The pack holds someone else's work, so it never goes in this public repo:
// pack/ is git-ignored, and "Send to Claude" pushes it to your own private
// repo instead (see mac/run.sh).
import { copyFileSync, existsSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { ensureDir, flag, handlesFromArgs, mediaDir, packDir, readJson, workDir, writeJson } from './paths.mjs'
import { loadPosts } from './posts.mjs'
import { uniqueLines } from './process.mjs'

// ---------- small helpers ----------

export function median(xs) {
  const a = xs.filter((x) => Number.isFinite(x)).sort((p, q) => p - q)
  if (!a.length) return null
  const m = a.length >> 1
  return a.length % 2 ? a[m] : (a[m - 1] + a[m]) / 2
}

export function fmt(n) {
  if (!Number.isFinite(n)) return '–'
  const a = Math.abs(n)
  if (a >= 1e6) return `${(n / 1e6).toFixed(a >= 1e7 ? 0 : 1)}M`
  if (a >= 1e3) return `${(n / 1e3).toFixed(a >= 1e4 ? 0 : 1)}K`
  return String(Math.round(n))
}

const pct = (n, d) => (d ? `${Math.round((100 * n) / d)}%` : '–')
const lift = (x) => (Number.isFinite(x) ? `×${x >= 10 ? Math.round(x) : x.toFixed(1)}` : '–')
const cell = (s, n = 90) => {
  const t = String(s ?? '').replace(/\s+/g, ' ').replace(/\|/g, '/').trim()
  return t.length > n ? t.slice(0, n - 1).trimEnd() + '…' : t
}
const words = (s) => (String(s ?? '').match(/[\p{L}\p{N}'’]+/gu) ?? []).length

function table(head, rows) {
  if (!rows.length) return '_None._\n'
  return [`| ${head.join(' | ')} |`, `| ${head.map(() => '---').join(' | ')} |`, ...rows.map((r) => `| ${r.join(' | ')} |`)].join('\n') + '\n'
}

// ---------- reading a post ----------

/** First sentence, at most `max` words. */
export function firstSentence(text, max = 25) {
  const t = String(text ?? '').replace(/\s+/g, ' ').trim()
  if (!t) return ''
  const s = t.match(/^.+?[.!?](?=\s|$)/)?.[0] ?? t
  const w = s.split(' ')
  return w.length > max ? w.slice(0, max).join(' ') + '…' : s
}

export function captionHook(caption) {
  const line = String(caption ?? '').split('\n').map((l) => l.replace(/#[\p{L}\p{N}_]+/gu, '').trim()).find((l) => /[\p{L}\p{N}]/u.test(l))
  return line ? firstSentence(line, 30) : ''
}

/** The hook three ways: words on screen in the first ~2.5s (or slide 1), the first thing said, the caption's first line. */
export function hookOf(post, work) {
  const frames = work?.frames ?? []
  const byFrame = work?.onScreen ?? []
  const early = frames.map((f, i) => ({ f, lines: byFrame[i] ?? [] })).filter(({ f }, i) => (post.type === 'reel' ? (f.t ?? 0) <= 2.6 : i === 0))
  // Leave out watermarks: the creator's @handle or a bare link.
  const screen = uniqueLines(early.map((e) => e.lines.filter((l) => !/^\s*(@[\w.]+|(https?:\/\/|www\.)\S+)\s*$/i.test(l)))).join(' / ')
  const segs = work?.transcript?.segments ?? []
  const spoken = work?.transcript?.speech ? firstSentence(segs.filter((s) => s.from < 8).map((s) => s.text).join(' ') || work.transcript.text) : ''
  return { screen, spoken, caption: captionHook(post.caption) }
}

export const TOPICS = [
  ['texting', 'Texting and the talking stage', /\b(text(s|ing|ed)?|left on read|double.?text|talking stage|dm(s|ed)?|facetime|call(s|ed|ing)? (her|him|me|you))\b/i],
  ['first-dates', 'First dates and asking out', /\b(first date|second date|date ideas?|ask(ed|ing)? (her|him) out|take (her|him) out|date night|on a date)\b/i],
  ['attraction', 'Attraction and confidence', /\b(attract(ion|ive|ed|s)?|confiden(t|ce)|rizz|approach(ing|ed)?|chemistry|flirt(ing|y)?|charm(ing)?|masculin(e|ity)|feminin(e|ity))\b/i],
  ['standards', 'Standards, red and green flags', /\b(standards?|red flags?|green flags?|deal.?breakers?|non.?negotiables?|deserves?|settl(e|ing)|bare minimum)\b/i],
  ['gentleman', 'Being a gentleman', /\b(gentle(man|men)|chivalr(y|ous)|manners|etiquette|open(ing)? (the|her|a) door|pull(ing)? out (her|the) chair|take the lead|protect(or|ive)?|respect(ful|s)?)\b/i],
  ['money', 'Money, paying and providing', /\b(money|pay(s|ing)? for|paid for|the (bill|check|tab)|provid(e|er|ing)|financ(es?|ial(ly)?)|broke|50.?50|split(ting)? the|gold.?digger)\b/i],
  ['commitment', 'Commitment, situationships, marriage', /\b(commit(ment|ted)?|situationships?|exclusive|make it official|boyfriend|girlfriend|marr(y|ied|iage)|wife|husband|engag(ed|ement)|wedding|long.?term)\b/i],
  ['breakups', 'Breakups, exes and ghosting', /\b(break.?ups?|broke up|exes|my ex|your ex|her ex|his ex|heart.?br(eak|oken)|move on|moving on|ghost(ed|ing)?|cheat(ed|ing|er|s)?|toxic|no contact)\b/i],
  ['communication', 'Communication and conflict', /\b(communicat(e|ion|ing)|argu(e|ment|ing)|fight(s|ing)?|conflict|apologi[sz]e|listen(ing|s)?|boundar(y|ies)|trust|jealous(y)?|insecur(e|ity))\b/i],
  ['self-work', 'Working on yourself', /\b(self.?(improvement|worth|respect|love|care)|discipline|gym|glow.?up|heal(ing|ed)?|therapy|better version|habits?|purpose|mindset|in the making)\b/i],
  ['matching', 'Compatibility and the right person', /\b(compatib(le|ility)|soul.?mates?|the one|right (person|one|man|woman|girl|guy)|values|align(ed|ment)?|in common|match(es|ed)?)\b/i],
  ['dating-apps', 'Dating apps', /\b(dating apps?|tinder|hinge|bumble|raya|swip(e|ed|ing)|dating profile)\b/i],
  ['intimacy', 'Intimacy and sex', /\b(sex(ual|ually)?|intima(cy|te)|body count|celiba(te|cy)|hook.?ups?|one night stand)\b/i],
  ['family', 'Family and kids', /\b(kids|children|family|parents|my (mom|mother|dad|father)|her (mom|dad|father|mother))\b/i],
  ['astrology', 'Zodiac and astrology', /\b(zodiac|astrolog(y|er|ical)|horoscopes?|aries|taurus|gemini|leo|virgo|libra|scorpio|sagittarius|capricorn|aquarius|pisces|retrograde|birth chart)\b/i],
]

export const FORMATS = [
  ['speech', 'Talks (speech in the video)', (p) => p.speech === true],
  ['no-speech', 'No speech (music or silence)', (p) => p.type === 'reel' && p.speech === false],
  ['screen-hook', 'Words on screen from the first second', (p) => Boolean(p.hook.screen)],
  ['list', 'A list ("3 signs…", "5 things…")', (p) => /\b(\d+|three|four|five|six|seven|eight|nine|ten)\s+(signs?|things?|ways?|reasons?|rules?|mistakes?|tips?|steps?|questions?|types?|red flags?|green flags?|habits?|traits?|lessons?|truths?)\b/i.test(hookText(p))],
  ['question', 'Opens with a question', (p) => /\?\s*$/.test(firstHook(p)) || /^(why|how|what|who|when|is|are|do|does|did|should|would|could|can|have|has|will)\b/i.test(firstHook(p))],
  ['pov', 'POV', (p) => /\bpov\b/i.test(hookText(p))],
  ['reply', 'Replying to a comment', (p) => /repl(y|ying) to .{0,40}comment|reply to @/i.test(p.onScreen.join(' '))],
  ['series', 'Part of a numbered series ("part 2")', (p) => /\b(part|pt\.?|episode|ep\.?|day)\s*#?\d+\b/i.test(`${hookText(p)} ${p.caption}`)],
  ['to-men', 'Speaks to men ("fellas", "men", "bro")', (p) => /\b(men|guys|fellas|bros?|brothers?|kings?|gentlemen|young man)\b/i.test(hookText(p))],
  ['to-women', 'Speaks to women ("ladies", "women", "girls")', (p) => /\b(ladies|women|girls|queens?|sis|young lady)\b/i.test(hookText(p))],
  ['you', 'Says "you" in the hook', (p) => /\b(you|your|you're|youre)\b/i.test(hookText(p))],
]

export const CTAS = [
  ['comment-word', 'Comment a word to get something', /\b(?:comment|Comment|COMMENT)(?:ing|ING)?\s+(?:["“'‘][^"”'’]{1,24}["”'’]|[A-Z]{2,}\b)/],
  ['comment', 'Asks for comments or opinions', /\b(comment below|in the comments|let me know|drop a|what do you think|thoughts\?|agree\?|would you)\b/i],
  ['save', 'Save this', /\bsave (this|it|for later)\b/i],
  ['share', 'Send it to / tag someone', /\b(send|share) (this|it) (to|with)\b|\btag (a|your|someone|him|her|the)\b/i],
  ['follow', 'Follow for more', /\bfollow (me|for|along|@)|\bhit follow\b|\bfollow for more\b/i],
  ['link', 'Link in bio', /\blink (is )?in (my )?bio\b|\bin my bio\b|\bbio link\b/i],
  ['dm', 'DM me', /\b(dm me|send me a dm|message me|dm ["“'‘]?[A-Z]{2,})/i],
  ['offer', 'Plugs a guide, tool or program', /\b(guide|e-?book|course|coaching|calculator|protocol|free (pdf|guide|download)|waitlist|book a call|program|masterclass)\b/i],
]

const hookText = (p) => [p.hook.screen, p.hook.spoken, p.hook.caption].filter(Boolean).join(' / ')
const firstHook = (p) => p.hook.screen || p.hook.spoken || p.hook.caption || ''

/** posts (with numbers) + work → flat records with the hook, topics, formats, CTAs, and a lift against the page's typical post. */
export function buildRecords(posts, workOf) {
  const recs = posts.map((p) => {
    const w = workOf(p.shortcode) ?? {}
    const onScreenByFrame = w.onScreen ?? null
    const rec = {
      shortcode: p.shortcode, url: p.url, type: p.type, date: p.date, pinned: p.pinned,
      views: p.views, likes: p.likes, comments: p.comments,
      duration: p.duration ?? w.duration ?? null,
      slides: p.type === 'reel' ? null : p.files.length,
      ...(p.title ? { title: p.title } : {}),
      caption: p.caption, hashtags: p.hashtags, mentions: p.mentions, coauthors: p.coauthors, location: p.location,
      speech: w.transcript ? w.transcript.speech : null,
      transcript: w.transcript?.text ?? null,
      segments: w.transcript?.segments ?? null,
      onScreen: onScreenByFrame ? uniqueLines(onScreenByFrame) : [],
      onScreenByFrame: onScreenByFrame ? (w.frames ?? []).map((f, i) => ({ at: f.t ?? null, slide: f.slide ?? null, lines: onScreenByFrame[i] ?? [] })) : null,
      sheet: w.sheet ? `sheets/${p.shortcode}.jpg` : null,
      numbersFrom: p.numbersFrom,
    }
    rec.hook = hookOf(p, w)
    const all = `${rec.caption}\n${rec.transcript ?? ''}\n${rec.onScreen.join('\n')}`
    // Hashtags left out of topics: the same tags on every post would put every post in every topic.
    const said = all.replace(/#[\p{L}\p{N}_]+/gu, ' ')
    rec.topics = TOPICS.filter(([, , re]) => re.test(said)).map(([k]) => k)
    rec.formats = FORMATS.filter(([, , test]) => test(rec)).map(([k]) => k)
    rec.ctas = CTAS.filter(([, , re]) => re.test(all)).map(([k]) => k)
    return rec
  })
  // How each post did against the page's typical post of the same kind:
  // reels by views when we have them, everything else by likes.
  const metricOf = (r) => (r.type === 'reel' && Number.isFinite(r.views) && r.views > 0 ? ['views', r.views] : Number.isFinite(r.likes) && r.likes > 0 ? ['likes', r.likes] : [null, null])
  const groups = new Map()
  for (const r of recs) {
    const [name, v] = metricOf(r)
    r.metric = name
    if (!name) continue
    const key = `${r.type}:${name}`
    groups.set(key, [...(groups.get(key) ?? []), v])
  }
  const typical = new Map([...groups].map(([k, vs]) => [k, median(vs)]))
  for (const r of recs) {
    const [name, v] = metricOf(r)
    const t = name ? typical.get(`${r.type}:${name}`) : null
    r.lift = t ? Math.round((v / t) * 100) / 100 : null
  }
  return recs
}

// ---------- the report ----------

function tzParts(iso, tz) {
  const d = new Date(iso)
  const parts = Object.fromEntries(new Intl.DateTimeFormat('en-US', { timeZone: tz, weekday: 'short', hour: 'numeric', hourCycle: 'h23' }).formatToParts(d).map((x) => [x.type, x.value]))
  return { weekday: parts.weekday, hour: Number(parts.hour) % 24 }
}

/** Openers that repeat (the first 2–3 words of the hook): a page's running formats. */
export function repeatedOpeners(recs, min = 3) {
  const out = []
  const covered = new Set()
  for (const k of [3, 2]) {
    const counts = new Map()
    for (const r of recs) {
      const w = firstHook(r).toLowerCase().replace(/[^\p{L}\p{N}' ]+/gu, ' ').trim().split(/\s+/).filter(Boolean)
      if (w.length < k) continue
      const key = w.slice(0, k).join(' ')
      counts.set(key, [...(counts.get(key) ?? []), r])
    }
    for (const [key, rs] of counts) {
      if (rs.length < min) continue
      if (k === 2 && [...covered].some((c) => c.startsWith(key + ' ') && out.find((o) => o.opener === c)?.posts.length === rs.length)) continue
      covered.add(key)
      out.push({ opener: key, posts: rs })
    }
  }
  return out.sort((a, b) => b.posts.length - a.posts.length)
}

function liftRow(label, rs, total) {
  return [label, String(rs.length), pct(rs.length, total), lift(median(rs.map((r) => r.lift)))]
}

function postRow(r, i) {
  return [String(i + 1), r.date?.slice(0, 10) ?? '–', r.type, fmt(r.views), fmt(r.likes), fmt(r.comments), lift(r.lift), cell(firstHook(r), 80) || '_(no words)_', `[open](${r.url})`]
}

export function buildReport({ handle, profile, recs, tz = 'America/Chicago', now = new Date() }) {
  const L = []
  const n = recs.length
  const by = (t) => recs.filter((r) => r.type === t)
  const reels = by('reel')
  const ranked = recs.filter((r) => Number.isFinite(r.lift)).sort((a, b) => b.lift - a.lift)
  const withViews = reels.filter((r) => Number.isFinite(r.views))
  const withComments = recs.filter((r) => Number.isFinite(r.comments))
  const withSpeech = reels.filter((r) => r.speech != null)
  const withOcr = recs.filter((r) => r.onScreenByFrame)

  L.push(`# @${handle}: what they post and what works`, '')
  L.push(`Made ${now.toISOString().slice(0, 10)} from ${n} posts${profile?.posts ? ` (the profile says ${profile.posts})` : ''}. Times are ${tz}.`)
  L.push(`Views for ${withViews.length} of ${reels.length} reels, comments for ${withComments.length} posts, speech for ${withSpeech.length} reels, on-screen text for ${withOcr.length} posts.`)
  L.push(`"× typical" compares a post with the page's median post of the same kind: reels by views (likes if there are no views), carousels and photos by likes. ×2.0 means twice the usual.`, '')

  if (profile) {
    L.push('## The page', '')
    L.push(`- **${profile.name ?? '@' + handle}**${profile.category ? ` · ${profile.category}` : ''}${profile.verified ? ' · verified' : ''}`)
    L.push(`- ${fmt(profile.followers)} followers · ${fmt(profile.following)} following · ${fmt(profile.posts)} posts`)
    if (profile.bio) L.push(`- Bio: ${cell(profile.bio, 300)}`)
    for (const l of profile.links?.length ? profile.links : profile.link ? [{ url: profile.link }] : []) L.push(`- Link: ${l.title ? `${l.title}: ` : ''}${l.url}`)
    L.push('')
  }

  // At a glance
  const newest = recs.map((r) => r.date).filter(Boolean).sort().at(-1)
  const oldest = recs.map((r) => r.date).filter(Boolean).sort()[0]
  const spanWeeks = newest ? (new Date(newest) - new Date(oldest)) / (7 * 864e5) : 0
  const weeks = Math.max(1, Math.min(12, Math.ceil(spanWeeks)))
  const since = newest ? new Date(new Date(newest).getTime() - weeks * 7 * 864e5).toISOString() : null
  const recent = since ? recs.filter((r) => r.date && r.date >= since).length : 0
  L.push('## At a glance', '')
  L.push(`- Mix: ${['reel', 'carousel', 'photo'].map((t) => `${pct(by(t).length, n)} ${t}s`).join(', ')}.`)
  if (reels.length) L.push(`- Typical reel: ${fmt(median(reels.map((r) => r.duration)))}s long, ${fmt(median(withViews.map((r) => r.views)))} views, ${fmt(median(reels.map((r) => r.likes)))} likes, ${fmt(median(reels.map((r) => r.comments)))} comments.`)
  if (by('carousel').length) L.push(`- Typical carousel: ${fmt(median(by('carousel').map((r) => r.slides)))} slides, ${fmt(median(by('carousel').map((r) => r.likes)))} likes, ${fmt(median(by('carousel').map((r) => r.comments)))} comments.`)
  if (newest) L.push(`- Posting: ${(recent / weeks).toFixed(1)} a week over the last ${weeks} week${weeks > 1 ? 's' : ''} of posts; ${n} posts from ${oldest.slice(0, 10)} to ${newest.slice(0, 10)}.`)
  if (withSpeech.length) L.push(`- ${pct(withSpeech.filter((r) => r.speech).length, withSpeech.length)} of reels have someone talking.`)
  L.push(withOcr.length ? `- ${pct(withOcr.filter((r) => r.hook.screen).length, withOcr.length)} of posts put words on screen from the first second.` : '- On-screen text wasn\'t read (that needs a Mac), so the "words on screen" numbers below are empty.')
  const capWords = recs.map((r) => words(r.caption))
  L.push(`- Captions: ${fmt(median(capWords))} words typical; ${pct(recs.filter((r) => r.hashtags.length).length, n)} use hashtags (${fmt(median(recs.map((r) => r.hashtags.length)))} typical).`)
  if (ranked.length) L.push(`- Best post: ${lift(ranked[0].lift)} typical, "${cell(firstHook(ranked[0]), 100)}" (${ranked[0].url}).`)
  L.push('')

  // Formats
  L.push('## Formats', '')
  L.push(table(['Kind', 'Posts', 'Share', 'Median views', 'Median likes', 'Median comments'],
    ['reel', 'carousel', 'photo'].filter((t) => by(t).length).map((t) => [t, String(by(t).length), pct(by(t).length, n), fmt(median(by(t).map((r) => r.views))), fmt(median(by(t).map((r) => r.likes))), fmt(median(by(t).map((r) => r.comments)))])))
  L.push(table(['Shape', 'Posts', 'Share', 'Median × typical'], FORMATS.map(([k, label]) => liftRow(label, recs.filter((r) => r.formats.includes(k)), n)).filter((row) => row[1] !== '0')))

  // Top and bottom
  L.push(`## Top ${Math.min(25, ranked.length)} posts`, '')
  L.push(table(['#', 'Date', 'Kind', 'Views', 'Likes', 'Comments', '× typical', 'Hook', 'Link'], ranked.slice(0, 25).map(postRow)))
  if (ranked.length > 30) {
    L.push('## Bottom 10 (for contrast)', '')
    L.push(table(['#', 'Date', 'Kind', 'Views', 'Likes', 'Comments', '× typical', 'Hook', 'Link'], ranked.slice(-10).reverse().map(postRow)))
  }

  // What the top quarter does differently
  if (ranked.length >= 12) {
    const q = Math.max(3, Math.floor(ranked.length / 4))
    const top = ranked.slice(0, q), bottom = ranked.slice(-q)
    const share = (rs, f) => pct(rs.filter(f).length, rs.length)
    const rows = [
      ['Hook length (words, median)', fmt(median(top.map((r) => words(firstHook(r))))), fmt(median(bottom.map((r) => words(firstHook(r)))))],
      ['Reel length (seconds, median)', fmt(median(top.map((r) => r.duration))), fmt(median(bottom.map((r) => r.duration)))],
      ...FORMATS.map(([k, label]) => [label, share(top, (r) => r.formats.includes(k)), share(bottom, (r) => r.formats.includes(k))]),
      ...CTAS.map(([k, label]) => [`CTA: ${label}`, share(top, (r) => r.ctas.includes(k)), share(bottom, (r) => r.ctas.includes(k))]),
      ['Caption length (words, median)', fmt(median(top.map((r) => words(r.caption)))), fmt(median(bottom.map((r) => words(r.caption))))],
    ].filter((row) => !(row[1] === '0%' && row[2] === '0%'))
    L.push(`## Top quarter vs bottom quarter (${q} posts each)`, '')
    L.push(table(['', 'Top', 'Bottom'], rows))
  }

  // Length
  if (reels.some((r) => r.duration)) {
    const buckets = [[0, 15, 'under 15s'], [15, 30, '15–30s'], [30, 60, '30–60s'], [60, 90, '60–90s'], [90, Infinity, '90s+']]
    L.push('## Reel length', '')
    L.push(table(['Length', 'Reels', 'Share', 'Median × typical'], buckets.map(([a, b, label]) => liftRow(label, reels.filter((r) => r.duration >= a && r.duration < b), reels.length)).filter((row) => row[1] !== '0')))
  }

  // Topics
  L.push('## Topics', '')
  L.push('Matched on words in the caption, what\'s said and what\'s on screen. A post can have several.', '')
  L.push(table(['Topic', 'Posts', 'Share', 'Median × typical', 'Best hook'], TOPICS.map(([k, label]) => {
    const rs = recs.filter((r) => r.topics.includes(k))
    const best = rs.filter((r) => Number.isFinite(r.lift)).sort((a, b) => b.lift - a.lift)[0]
    return [...liftRow(label, rs, n), best ? `${cell(firstHook(best), 70)} (${lift(best.lift)})` : '–']
  }).filter((row) => row[1] !== '0').sort((a, b) => Number(b[1]) - Number(a[1]))))

  // Running openers
  const openers = repeatedOpeners(recs).slice(0, 15)
  L.push('## Openers they reuse', '')
  L.push(table(['Opens with', 'Posts', 'Median × typical', 'Example'], openers.map((o) => [`"${o.opener}…"`, String(o.posts.length), lift(median(o.posts.map((r) => r.lift))), cell(firstHook(o.posts.slice().sort((a, b) => (b.lift ?? 0) - (a.lift ?? 0))[0]), 80)])))

  // CTAs
  L.push('## Calls to action', '')
  L.push(table(['Ask', 'Posts', 'Share', 'Median × typical'], CTAS.map(([k, label]) => liftRow(label, recs.filter((r) => r.ctas.includes(k)), n)).filter((row) => row[1] !== '0')))
  const tags = new Map()
  for (const r of recs) for (const t of r.hashtags) tags.set(t, (tags.get(t) ?? 0) + 1)
  if (tags.size) L.push(`Most-used hashtags: ${[...tags].sort((a, b) => b[1] - a[1]).slice(0, 20).map(([t, c]) => `${t} (${c})`).join(', ')}`, '')

  // When
  const dated = recs.filter((r) => r.date)
  if (dated.length) {
    const parts = dated.map((r) => ({ r, ...tzParts(r.date, tz) }))
    L.push(`## When they post (${tz})`, '')
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    L.push(table(['Day', 'Posts', 'Share', 'Median × typical'], days.map((d) => liftRow(d, parts.filter((p) => p.weekday === d).map((p) => p.r), dated.length))))
    const slots = [[5, 9, 'early morning (5–9)'], [9, 12, 'morning (9–12)'], [12, 15, 'early afternoon (12–3)'], [15, 18, 'late afternoon (3–6)'], [18, 21, 'evening (6–9)'], [21, 24, 'late (9–midnight)'], [0, 5, 'overnight (midnight–5)']]
    L.push(table(['Time', 'Posts', 'Share', 'Median × typical'], slots.map(([a, b, label]) => liftRow(label, parts.filter((p) => p.hour >= a && p.hour < b).map((p) => p.r), dated.length)).filter((row) => row[1] !== '0')))
  }

  L.push('## Every post', '')
  L.push('`posts.json` has every post in full (caption, transcript with timings, on-screen text per still, numbers, topics); `posts.csv` is the same as a spreadsheet; `sheets/` has one contact sheet per post.', '')
  return L.join('\n')
}

// ---------- the pack ----------

const CSV_COLS = ['shortcode', 'url', 'date', 'type', 'views', 'likes', 'comments', 'lift', 'duration', 'slides', 'hook_screen', 'hook_spoken', 'hook_caption', 'topics', 'formats', 'ctas', 'hashtags', 'on_screen', 'transcript', 'caption']

export function toCsv(recs) {
  const q = (v) => {
    const s = Array.isArray(v) ? v.join(' ') : v == null ? '' : String(v)
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
  }
  const row = (r) => [r.shortcode, r.url, r.date, r.type, r.views, r.likes, r.comments, r.lift, r.duration, r.slides, r.hook.screen, r.hook.spoken, r.hook.caption, r.topics, r.formats, r.ctas, r.hashtags, r.onScreen.join(' / '), r.transcript, r.caption]
  return [CSV_COLS.join(','), ...recs.map((r) => row(r).map(q).join(','))].join('\n') + '\n'
}

function dirSize(d) {
  let total = 0
  for (const f of readdirSync(d, { withFileTypes: true })) total += f.isDirectory() ? dirSize(path.join(d, f.name)) : statSync(path.join(d, f.name)).size
  return total
}

export function writePack(handle, { tz } = {}) {
  const posts = loadPosts(handle)
  if (!posts.length) throw new Error(`Nothing downloaded for @${handle} yet. Run: npm run download -- ${handle}`)
  const wdir = workDir(handle)
  const workOf = (code) => readJson(path.join(wdir, `${code}.json`))
  const recs = buildRecords(posts, workOf)
  const profile = readJson(path.join(mediaDir(handle), '_profile.json'))
  const out = ensureDir(packDir(handle))
  const sheets = ensureDir(path.join(out, 'sheets'))

  const keep = new Set()
  for (const r of recs) {
    if (!r.sheet || !existsSync(path.join(wdir, r.shortcode, 'sheet.jpg'))) { r.sheet = null; continue }
    copyFileSync(path.join(wdir, r.shortcode, 'sheet.jpg'), path.join(out, r.sheet))
    keep.add(path.basename(r.sheet))
  }
  for (const f of readdirSync(sheets)) if (!keep.has(f)) rmSync(path.join(sheets, f), { force: true })

  writeJson(path.join(out, 'posts.json'), { handle, profile, madeAt: new Date().toISOString(), count: recs.length, posts: recs })
  writeFileSync(path.join(out, 'posts.csv'), toCsv(recs))
  writeFileSync(path.join(out, 'report.md'), buildReport({ handle, profile, recs, tz }))
  writeFileSync(path.join(out, 'README.md'), [
    `# @${handle}: study pack`, '',
    `Every post on ${profile?.site === 'facebook' ? `${profile.link} (Facebook reels and videos)` : profile?.site === 'youtube' ? `${profile.link} (YouTube Shorts and videos)` : `instagram.com/${handle}`}, downloaded and read on a personal computer by Align's study program (\`study/\` in the Align design repo) so Claude can learn how the page works.`,
    'It is reference material for private analysis only: keep this repo private and don\'t repost any of it.', '',
    '- `report.md`: the numbers (formats, top posts, hooks, topics, CTAs, timing)',
    '- `posts.json`: every post in full; `posts.csv`: the same as a spreadsheet',
    '- `sheets/<shortcode>.jpg`: stills of each reel (first three from the first 2.5 seconds) or a carousel\'s slides', '',
  ].join('\n'))
  return { out, recs, bytes: dirSize(out) }
}

function main() {
  const argv = process.argv.slice(2)
  const [handle] = handlesFromArgs(argv, 'Usage: node src/report.mjs <instagram handle> [--tz America/Chicago]')
  try {
    const { out, recs, bytes } = writePack(handle, { tz: flag(argv, 'tz') ?? process.env.STUDY_TZ ?? 'America/Chicago' })
    console.log(`Packed ${recs.length} posts (${(bytes / 1e6).toFixed(1)} MB) in ${out}`)
    console.log(`Read the numbers: ${path.join(out, 'report.md')}`)
  } catch (e) {
    console.error(e.message); process.exit(1)
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main()
