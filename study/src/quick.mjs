// A quick read of a YouTube channel: no video downloads, no login, runs anywhere
// (including Claude's cloud sessions, where YouTube blocks full downloads).
//
//   node src/quick.mjs https://www.youtube.com/@somechannel
//   node src/quick.mjs https://youtu.be/<id>               # a video: reads the channel it's from
//   node src/quick.mjs @somechannel --limit 300 --no-thumbs
//
// From the channel's Videos and Shorts lists alone (title, views, length) it
// works out what pulls: how each upload did against the channel's typical one,
// the best and weakest titles, title shapes and lengths that win, and a
// contact sheet of the top thumbnails to look at. That's the packaging half of
// a study; the Mac's `npm run youtube` adds what's said and shown.
//
// Writes pack/yt-<channel>/quick.json, quick.md and quick-top.jpg / quick-bottom.jpg.
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { run } from './download.mjs'
import { ensureDir, flag, mediaDir, packDir, readJson, writeJson } from './paths.mjs'
import { fmt, median } from './report.mjs'
import { channelOf, linksOf, listArgs, mergeLinks, videoIdOf } from './youtube.mjs'

const YT = 'https://www.youtube.com'

/** Title shapes worth testing against views. Each: [key, label, test(title)]. */
export const TITLE_SHAPES = [
  ['question', 'Asks a question', (t) => /\?/.test(t)],
  ['number', 'Has a number ("7 ways", "$10,000", "30 days")', (t) => /\d/.test(t)],
  ['list', 'A list ("5 things…")', (t) => /\b\d+\s+(signs?|things?|ways?|reasons?|rules?|mistakes?|tips?|steps?|questions?|types?|habits?|lessons?|truths?|ideas?|places?)\b/i.test(t)],
  ['i-me', 'First person ("I", "my", "we")', (t) => /\b(I|I'm|I've|my|me|we|our)\b/.test(t)],
  ['you', 'Says "you"', (t) => /\b(you|your|you're)\b/i.test(t)],
  ['caps', 'A word in CAPS', (t) => /\b[A-Z]{3,}\b/.test(t.replace(/\b(USA|UK|AI|TV|NYC|LA|DIY|CEO|FAQ|ASMR|POV|VR|AR)\b/g, ''))],
  ['brackets', 'Brackets or parentheses', (t) => /[[\]()]/.test(t)],
  ['colon-dash', 'Split with ":" or " - " / " | "', (t) => /:\s|\s[-–—|]\s/.test(t)],
  ['exclaim', 'Exclamation mark', (t) => /!/.test(t)],
  ['emoji', 'Emoji', (t) => /\p{Extended_Pictographic}/u.test(t)],
  ['negative', 'Negative or warning ("never", "stop", "worst", "mistake")', (t) => /\b(never|stop|don'?t|worst|mistakes?|wrong|bad|avoid|quit|fail(ed|ing)?|regret|truth|lie|scam)\b/i.test(t)],
  ['superlative', 'Superlative ("best", "most", "ever", "only")', (t) => /\b(best|most|ever|only|ultimate|biggest|craziest|perfect)\b/i.test(t)],
  ['challenge', 'Challenge or experiment ("I tried", "for 30 days", "vs")', (t) => /\b(tried|testing|tested|challenge|experiment|for \d+ (days?|hours?|weeks?)|vs\.?|versus|survived?)\b/i.test(t)],
  ['how-why', 'How / why / what', (t) => /^(how|why|what|when|where|which)\b/i.test(t) || /\b(how to|why (you|I|we))\b/i.test(t)],
  ['story', 'A story ("the day…", "I was…", "my first…")', (t) => /\b(story|the day|the time|I was|my first|happened|finally)\b/i.test(t)],
]

const words = (t) => String(t ?? '').trim().split(/\s+/).filter(Boolean).length

/** Each upload against its own kind's typical one (long videos and Shorts apart). */
export function withLift(links) {
  const typical = new Map(['video', 'short'].map((k) => [k, median(links.filter((l) => l.kind === k && l.views > 0).map((l) => l.views))]))
  return links.map((l) => {
    const t = typical.get(l.kind)
    const shapes = TITLE_SHAPES.filter(([, , test]) => test(l.title ?? '')).map(([k]) => k)
    return { ...l, lift: t && l.views > 0 ? Math.round((l.views / t) * 100) / 100 : null, shapes, titleWords: words(l.title) }
  })
}

/** For one group: how often a feature shows up in the top quarter vs the bottom quarter, and its median lift. */
export function compare(recs, has) {
  const ranked = recs.filter((r) => Number.isFinite(r.lift)).sort((a, b) => b.lift - a.lift)
  const q = Math.max(1, Math.floor(ranked.length / 4))
  const top = ranked.slice(0, q), bottom = ranked.slice(-q)
  const share = (rs) => (rs.length ? rs.filter(has).length / rs.length : 0)
  const withIt = ranked.filter(has)
  return { count: withIt.length, top: share(top), bottom: share(bottom), lift: median(withIt.map((r) => r.lift)) }
}

const BUCKETS = {
  video: [[0, 240, 'under 4 min'], [240, 480, '4–8 min'], [480, 720, '8–12 min'], [720, 1200, '12–20 min'], [1200, 2400, '20–40 min'], [2400, Infinity, '40 min +']],
  short: [[0, 15, 'under 15s'], [15, 30, '15–30s'], [30, 45, '30–45s'], [45, 61, '45–60s'], [61, Infinity, 'over 60s']],
}

const pct = (x) => `${Math.round(100 * x)}%`
const lx = (x) => (Number.isFinite(x) ? `×${x >= 10 ? Math.round(x) : x.toFixed(1)}` : '–')
const esc = (s) => String(s ?? '').replace(/\|/g, '\\|').replace(/\s+/g, ' ').trim()
const table = (head, rows) => rows.length ? [`| ${head.join(' | ')} |`, `| ${head.map(() => '---').join(' | ')} |`, ...rows.map((r) => `| ${r.join(' | ')} |`), ''].join('\n') : ''

export function quickReport({ handle, about, recs, now = new Date() }) {
  const L = [`# ${about?.name ?? handle}: quick read`, '']
  L.push(`Made ${now.toISOString().slice(0, 10)} from the channel's lists alone (titles, views, lengths; no downloads). ${fmt(about?.followers)} subscribers · ${about?.link ?? ''}`)
  L.push('"× typical" is an upload\'s views against the channel\'s median upload of the same kind (long videos and Shorts apart). These are lifetime views, so the newest uploads are still climbing.', '')
  for (const [kind, label] of [['video', 'Long videos'], ['short', 'Shorts']]) {
    const rs = recs.filter((r) => r.kind === kind)
    if (!rs.length) continue
    const ranked = rs.filter((r) => Number.isFinite(r.lift)).sort((a, b) => b.lift - a.lift)
    L.push(`## ${label} (${rs.length})`, '')
    L.push(`Typical: ${fmt(median(rs.map((r) => r.views)))} views${kind === 'video' ? `, ${fmt(median(rs.map((r) => r.duration)) / 60)} min` : ''}, ${fmt(median(rs.map((r) => r.titleWords)))}-word titles. Best: ${lx(ranked[0]?.lift)}.`, '')
    const row = (r) => [lx(r.lift), fmt(r.views), r.duration ? (kind === 'video' ? `${Math.round(r.duration / 60)}m` : `${r.duration}s`) : '–', esc(r.title), `[open](${r.url})`]
    L.push('### Best', '', table(['× typical', 'Views', 'Length', 'Title', ''], ranked.slice(0, 20).map(row)))
    L.push('### Weakest', '', table(['× typical', 'Views', 'Length', 'Title', ''], ranked.slice(-10).reverse().map(row)))
    if (ranked.length >= 8) {
      L.push('### Title shapes', '', 'Share of the top quarter vs the bottom quarter that has it. A big gap is a lead worth a look, not proof.', '')
      L.push(table(['Shape', 'Uploads', 'Top quarter', 'Bottom quarter', 'Median × typical'],
        TITLE_SHAPES.map(([k, lab]) => [lab, compare(ranked, (r) => r.shapes.includes(k))]).filter(([, c]) => c.count).sort((a, b) => (b[1].top - b[1].bottom) - (a[1].top - a[1].bottom))
          .map(([lab, c]) => [esc(lab), String(c.count), pct(c.top), pct(c.bottom), lx(c.lift)])))
      L.push(table(['Title length', 'Uploads', 'Median × typical'], [[0, 5, '1–4 words'], [5, 8, '5–7 words'], [8, 11, '8–10 words'], [11, 99, '11+ words']]
        .map(([a, b, lab]) => [lab, ranked.filter((r) => r.titleWords >= a && r.titleWords < b)]).filter(([, g]) => g.length).map(([lab, g]) => [lab, String(g.length), lx(median(g.map((r) => r.lift)))])))
      if (rs.some((r) => r.duration)) {
        L.push(table(['Length', 'Uploads', 'Median × typical'], BUCKETS[kind].map(([a, b, lab]) => [lab, ranked.filter((r) => r.duration >= a && r.duration < b)])
          .filter(([, g]) => g.length).map(([lab, g]) => [lab, String(g.length), lx(median(g.map((r) => r.lift)))])))
      }
    }
  }
  L.push('`quick-top.jpg` and `quick-bottom.jpg` are the thumbnails of the best and weakest long videos (or Shorts, if that\'s all there is), best first.', '')
  return L.join('\n')
}

async function thumbSheet(recs, out) {
  if (!recs.length) return false
  const tmp = mkdtempSync(path.join(os.tmpdir(), 'align-quick-'))
  try {
    let n = 0
    for (const r of recs) {
      const res = await fetch(`https://i.ytimg.com/vi/${r.id}/${r.kind === 'short' ? 'oardefault' : 'mqdefault'}.jpg`).catch(() => null)
      const alt = res?.ok ? res : await fetch(`https://i.ytimg.com/vi/${r.id}/hqdefault.jpg`).catch(() => null)
      if (!alt?.ok) continue
      writeFileSync(path.join(tmp, `${String(++n).padStart(2, '0')}.jpg`), Buffer.from(await alt.arrayBuffer()))
    }
    if (!n) return false
    const cols = Math.min(4, n), rows = Math.ceil(n / cols)
    const r = await run('ffmpeg', ['-y', '-loglevel', 'error', '-start_number', '1', '-i', path.join(tmp, '%02d.jpg'), '-vf', `scale=320:180:force_original_aspect_ratio=decrease,pad=320:180:(ow-iw)/2:(oh-ih)/2:white,tile=${cols}x${rows}:padding=6:margin=6:color=white`, '-frames:v', '1', '-q:v', '4', out], { echo: false })
    return r.code === 0
  } finally { rmSync(tmp, { recursive: true, force: true }) }
}

export async function channelFor(input) {
  let channel = channelOf(input)
  let video = null
  // "yt-somechannel": one this computer has studied before.
  if (channel && !channel.url) channel = readJson(path.join(mediaDir(channel.handle), '_source.json')) ?? channel
  if (!channel?.url && videoIdOf(input)) {
    const r = await fetch(`${YT}/oembed?format=json&url=${encodeURIComponent(input)}`).then((x) => x.json()).catch(() => null)
    channel = channelOf(r?.author_url)
    video = r ? { id: videoIdOf(input), title: r.title, channel: r.author_name } : null
  }
  return { channel, video }
}

async function main() {
  const argv = process.argv.slice(2)
  const input = argv.find((a, i) => !a.startsWith('--') && !(argv[i - 1] ?? '').match(/^--limit$/))
  const limit = Number(flag(argv, 'limit') ?? 500)
  const { channel, video } = await channelFor(input)
  if (!channel?.url) { console.error('Usage: node src/quick.mjs <channel link, @handle or a video link> [--limit 500] [--no-thumbs]'); process.exit(2) }
  console.log(`Quick read of ${channel.url}${video ? ` (from "${video.title}")` : ''}`)
  const lists = []
  let about = null
  for (const [kind, tab] of [['video', 'videos'], ['short', 'shorts']]) {
    const r = await run('yt-dlp', listArgs(`${channel.url}/${tab}`, { limit }), { echo: false })
    if (r.code === 127) { console.error('yt-dlp is not installed (pip install yt-dlp, or brew install yt-dlp).'); process.exit(1) }
    let j = null
    try { j = JSON.parse(r.out) } catch {}
    if (!j) continue
    about ??= { name: j.channel ?? null, followers: j.channel_follower_count ?? null, bio: j.description ?? null, link: channel.url }
    lists.push(linksOf(j, kind))
    console.log(`  ${tab}: ${lists.at(-1).length}`)
  }
  const recs = withLift(mergeLinks(...lists))
  if (!recs.length) { console.error('Found no uploads. Check the link opens a channel.'); process.exit(1) }
  const out = ensureDir(packDir(channel.handle))
  writeJson(path.join(out, 'quick.json'), { handle: channel.handle, about, video, madeAt: new Date().toISOString(), count: recs.length, uploads: recs })
  writeFileSync(path.join(out, 'quick.md'), quickReport({ handle: channel.handle, about, recs }))
  if (!argv.includes('--no-thumbs')) {
    const kind = recs.some((r) => r.kind === 'video' && Number.isFinite(r.lift)) ? 'video' : 'short'
    const ranked = recs.filter((r) => r.kind === kind && Number.isFinite(r.lift)).sort((a, b) => b.lift - a.lift)
    await thumbSheet(ranked.slice(0, 12), path.join(out, 'quick-top.jpg'))
    await thumbSheet(ranked.slice(-8).reverse(), path.join(out, 'quick-bottom.jpg'))
  }
  console.log(`${about?.name ?? channel.handle}: ${recs.length} uploads read. ${path.join(out, 'quick.md')}`)
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((e) => { console.error(e?.message ?? e); process.exit(1) })
}
