// Download a TikTok account's videos for study. Works without a login, so it
// runs anywhere, including Claude's cloud sessions.
//
//   node src/tiktok.mjs https://www.tiktok.com/@someone
//   node src/tiktok.mjs @someone --limit 200     # the newest 200 (the default is 300)
//   node src/tiktok.mjs tt-someone --all         # every video on the account
//
// Creators often post the same short videos to TikTok and Instagram Reels, so
// this is also the way to study an Instagram creator when Instagram won't
// let a computer in without a login.
//
// yt-dlp lists the account, then fetches each video (576p at most) with its
// details and TikTok's captions, which stand in for whisper. Files land in
// media/tt-<account>/ shaped like the Instagram downloads, so
// `npm run process` and `npm run report` work on them unchanged.
// Already-downloaded videos are skipped, so it's safe to stop and run again.
//
// Exit codes: 0 done · 75 TikTok wants a break · 1 anything else.
import { readdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { EXIT, run } from './download.mjs'
import { ensureDir, flag, mediaDir, readJson, writeJson } from './paths.mjs'

const STREAK = 8

/** "@someone", "tiktok.com/@someone/video/123" → { handle: 'tt-someone', user: 'someone' }. */
export function accountOf(s) {
  const raw = String(s ?? '').trim()
  if (/^tt-[a-z0-9._]{2,24}$/.test(raw)) return { handle: raw, user: raw.slice(3) }
  if (/^@[A-Za-z0-9._]{2,24}$/.test(raw)) return { handle: `tt-${raw.slice(1).toLowerCase()}`, user: raw.slice(1) }
  const m = raw.match(/tiktok\.com\/@([A-Za-z0-9._]{2,24})/i)
  return m ? { handle: `tt-${m[1].toLowerCase()}`, user: m[1] } : null
}

/** WebVTT captions → the transcript shape process.mjs keeps ({ text, segments, words, speech }). */
export function vttTranscript(vtt) {
  const t = (s) => { const p = s.trim().split(':').map(Number); return Math.round((p.length === 3 ? p[0] * 3600 + p[1] * 60 + p[2] : p[0] * 60 + p[1]) * 10) / 10 }
  const segments = []
  for (const block of String(vtt ?? '').replace(/\r/g, '').split(/\n\n+/)) {
    const lines = block.split('\n')
    const i = lines.findIndex((l) => l.includes('-->'))
    if (i < 0) continue
    const [a, b] = lines[i].split('-->').map((x) => x.trim().split(' ')[0])
    const text = lines.slice(i + 1).join(' ').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()
    if (text && text !== segments.at(-1)?.text) segments.push({ from: t(a), to: t(b), text })
  }
  const text = segments.map((s) => s.text).join(' ').trim()
  const words = text ? text.split(/\s+/).length : 0
  return { text, segments, words, speech: words > 3, model: 'tiktok-captions' }
}

/** yt-dlp's info for one video → the details file posts.mjs reads (the keys gallery-dl writes for Instagram). */
export function metaOf(info, link) {
  return {
    category: 'tiktok', subcategory: 'video',
    post_shortcode: link.id, post_url: link.url,
    description: String(info?.description ?? info?.title ?? '').trim(),
    date: Number.isFinite(info?.timestamp) ? new Date(info.timestamp * 1000).toISOString() : null,
    likes: Number.isFinite(info?.like_count) ? info.like_count : null,
    width: info?.width ?? null, height: info?.height ?? null, num: 1,
    uploader: info?.uploader ?? null, sound: info?.track ?? null,
  }
}

export function numbersOf(info) {
  const n = (x) => (Number.isFinite(x) && x >= 0 ? Math.round(x) : null)
  return { views: n(info?.view_count), likes: n(info?.like_count), comments: n(info?.comment_count), reposts: n(info?.repost_count), saves: n(info?.save_count), duration: Number.isFinite(info?.duration) ? info.duration : null, from: 'yt-dlp' }
}

export function profileOf(listing, info, handle) {
  return {
    site: 'tiktok', username: handle, name: info?.uploader ?? listing?.uploader ?? null, bio: listing?.description ?? null, category: null,
    link: `https://www.tiktok.com/@${handle.slice(3)}`, links: [],
    followers: listing?.channel_follower_count ?? info?.channel_follower_count ?? null, following: null, posts: null,
    verified: false, professional: true, private: false,
  }
}

export function whyFailed(stderr) {
  const s = String(stderr)
  if (/\b429\b|too many requests|rate.?limit|try again later/i.test(s)) return 'slowDown'
  return 'failed'
}

export function videoArgs(link, dir) {
  return [
    '--no-warnings', '--no-progress', '--no-playlist',
    '-f', 'b[height<=576]/b', '--write-info-json', '-o', `infojson:${path.join(dir, '_tt', link.id)}`,
    '--write-subs', '--sub-langs', 'eng.*,en.*', '-o', `subtitle:${path.join(dir, '_tt', link.id)}`,
    '-o', path.join(dir, `${link.id}.01.%(ext)s`), link.url,
  ]
}

const videoFileOf = (dir, id) => {
  try { return readdirSync(dir).find((f) => f.startsWith(`${id}.01.`) && /\.(mp4|mov|webm)$/i.test(f) && statSync(path.join(dir, f)).size > 0) ?? null } catch { return null }
}

/** What yt-dlp left for one id → the files the later steps read. */
export function settle(dir, link) {
  const info = readJson(path.join(dir, '_tt', `${link.id}.info.json`))
  const file = videoFileOf(dir, link.id)
  if (!info || !file) return null
  writeJson(path.join(dir, `${file}.json`), metaOf(info, link))
  const sub = readdirSync(path.join(dir, '_tt')).find((f) => f.startsWith(`${link.id}.`) && f.endsWith('.vtt'))
  if (sub) writeJson(path.join(dir, '_captions', `${link.id}.json`), vttTranscript(readFileSync(path.join(dir, '_tt', sub), 'utf8')))
  return info
}

/** Fold the shards' numbers into _numbers.json. */
export function mergeShards(dir) {
  const file = path.join(dir, '_numbers.json')
  const all = readJson(file, {})
  for (const f of readdirSync(dir).filter((x) => /^_numbers\.shard-\d+\.json$/.test(x))) {
    for (const [id, v] of Object.entries(readJson(path.join(dir, f), {}))) if (v?.views != null || !all[id]?.views) all[id] = v
    rmSync(path.join(dir, f))
  }
  writeJson(file, all)
  console.log(`Merged: ${Object.values(all).filter((v) => v?.views != null).length} videos with numbers.`)
}

const jitter = (lo, hi) => new Promise((r) => setTimeout(r, 1000 * (lo + Math.random() * (hi - lo))))

async function main() {
  const argv = process.argv.slice(2)
  const input = argv.find((a, i) => !a.startsWith('--') && !(argv[i - 1] ?? '').match(/^--(limit|handle-file)$/))
  const acct = accountOf(input)
  if (!acct) { console.error('Usage: node src/tiktok.mjs <tiktok.com/@account link or @handle> [--limit 300] [--all]'); process.exit(2) }
  const limit = argv.includes('--all') ? Infinity : Number(flag(argv, 'limit') ?? 300)
  const dir = ensureDir(mediaDir(acct.handle))
  ensureDir(path.join(dir, '_tt'))
  if (flag(argv, 'handle-file')) writeFileSync(flag(argv, 'handle-file'), acct.handle + '\n')

  // --shard k/n: one of n downloaders running side by side on the same listing (k = 1…n).
  const shard = (flag(argv, 'shard') ?? '').match(/^(\d+)\/(\d+)$/)
  const [k, n] = shard ? [Number(shard[1]), Number(shard[2])] : [1, 1]
  if (argv.includes('--merge')) { mergeShards(dir); return }
  let listing = readJson(path.join(dir, '_listing.json'))
  if (!(shard && listing)) {
  console.log(`Listing tiktok.com/@${acct.user}${Number.isFinite(limit) ? ` (newest ${limit})` : ''}`)
  const r = await run('yt-dlp', ['--flat-playlist', '-J', '--no-warnings', ...(Number.isFinite(limit) ? ['--playlist-end', String(limit)] : []), `https://www.tiktok.com/@${acct.user}`], { echo: false })
  if (r.code === 127) { console.error('yt-dlp is not installed (pip install yt-dlp, or brew install yt-dlp).'); process.exit(EXIT.failed) }
  try { listing = JSON.parse(r.out) } catch {}
  if (!listing) { console.error(`Couldn't list @${acct.user}: ${r.err.trim().split('\n').pop() || 'nothing came back'}`); process.exit(EXIT.failed) }
  writeJson(path.join(dir, '_listing.json'), { ...listing, entries: listing.entries.map((e) => ({ id: e.id, url: e.url, view_count: e.view_count })) })
  }
  const links = (listing?.entries ?? []).filter((e) => /^\d{8,}$/.test(e?.id ?? '')).map((e) => ({ id: e.id, url: e.url ?? `https://www.tiktok.com/@${acct.user}/video/${e.id}`, views: e.view_count ?? null }))
  if (!links.length) { console.error(`Nothing listed for @${acct.user}.`); process.exit(EXIT.failed) }
  writeJson(path.join(dir, '_links.json'), links)

  const numbersFile = path.join(dir, n > 1 ? `_numbers.shard-${k}.json` : '_numbers.json')
  const numbers = { ...readJson(path.join(dir, '_numbers.json'), {}), ...readJson(numbersFile, {}) }
  const todo = links.filter((l, i) => i % n === k - 1).filter((l) => !(videoFileOf(dir, l.id) && numbers[l.id]?.views != null) && (numbers[l.id]?.failed ?? 0) < 2)
  console.log(`${links.length} videos listed; ${links.length - todo.length} already here. Downloading ${todo.length}.`)
  let streak = 0, ok = 0, profiled = Boolean(readJson(path.join(dir, '_profile.json')))
  for (const [i, l] of todo.entries()) {
    const res = await run('yt-dlp', videoArgs(l, dir), { echo: false })
    const info = settle(dir, l)
    if (info) {
      numbers[l.id] = numbersOf(info); ok++; streak = 0
      if (!profiled) { writeJson(path.join(dir, '_profile.json'), { ...profileOf(listing, info, acct.handle), fetchedAt: new Date().toISOString() }); profiled = true }
      const n = numbers[l.id]
      console.log(`  [${i + 1}/${todo.length}] ${l.id}  ${n.duration ?? '–'}s · ${n.views ?? '–'} views · ${n.likes ?? '–'} likes · ${n.comments ?? '–'} comments · ${n.reposts ?? '–'} shares`)
    } else {
      numbers[l.id] = { failed: (numbers[l.id]?.failed ?? 0) + 1, at: new Date().toISOString() }
      streak++
      console.log(`  [${i + 1}/${todo.length}] ${l.id}  ✗ ${res.err.trim().split('\n').pop() || 'no video'}`)
      if (whyFailed(res.err) === 'slowDown' || streak >= STREAK) { writeJson(numbersFile, numbers); console.error(`TikTok probably wants a break. Saved ${ok}; run again later and it carries on.`); process.exit(EXIT.slowDown) }
    }
    writeJson(numbersFile, numbers)
    if (i < todo.length - 1) await jitter(1.5, 4)
  }
  if (n > 1) console.log(`Shard ${k}/${n} done: ${ok} downloaded. When every shard is done: node src/tiktok.mjs ${acct.handle} --merge`)
  else console.log(`Done: ${ok} downloaded this run. Next: npm run process -- ${acct.handle}`)
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().then(() => process.exit(EXIT.ok), (e) => { console.error(e?.message ?? e); process.exit(EXIT.failed) })
}
