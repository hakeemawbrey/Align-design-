// Download a whole YouTube channel (long videos and Shorts) for study.
//
//   node src/youtube.mjs https://www.youtube.com/@somechannel
//   node src/youtube.mjs @somechannel --limit 20                 # try the newest 20 of each tab first
//   node src/youtube.mjs @somechannel --cookies-from-browser chrome
//   node src/youtube.mjs yt-somechannel --links-only             # only list what's there
//
// It lists the channel's Videos and Shorts tabs, then has yt-dlp fetch each one
// small (480p is plenty for stills and on-screen text) with its details, its
// thumbnail and YouTube's own captions. Captions stand in for whisper, so a
// 20-minute video is transcribed instantly and in full.
//
// Files land in media/yt-<channel>/ shaped like the Instagram downloads
// (<id>.01.mp4 plus <id>.01.mp4.json), with the numbers in _numbers.json, so
// `npm run process` and `npm run report` work on them unchanged.
// Already-downloaded videos are skipped, so it's safe to stop and run again.
//
// Exit codes: 0 done · 75 YouTube wants a break · 77 YouTube wants a login (bot check) · 1 anything else.
import { existsSync, readdirSync, statSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { EXIT, run } from './download.mjs'
import { fromYtdlp } from './numbers.mjs'
import { ensureDir, flag, mediaDir, readJson, writeJson } from './paths.mjs'

const YT = 'https://www.youtube.com'
const STREAK = 8

/**
 * A channel from anything pasted, or null.
 *   "@MKBHD", "youtube.com/@mkbhd/videos"        → { handle: 'yt-mkbhd', url: 'https://www.youtube.com/@mkbhd' }
 *   "youtube.com/channel/UCBJycsmduvYEL83R_U4JriQ" → { handle: 'yt-ucbjycsmduvyel83r_u4jriq', url: … }
 *   "youtube.com/c/Name", "/user/Name"           → { handle: 'yt-name', url: … }
 * Video links (watch, shorts, youtu.be) aren't channels: see videoIdOf.
 */
export function channelOf(s) {
  const raw = String(s ?? '').trim()
  if (/^yt-[a-z0-9._-]{1,60}$/.test(raw)) return { handle: raw, url: null }
  if (/^@[A-Za-z0-9._-]{2,60}$/.test(raw)) return { handle: `yt-${raw.slice(1).toLowerCase()}`, url: `${YT}/${raw}` }
  let u
  try { u = new URL(/^https?:/i.test(raw) ? raw : `https://${raw}`) } catch { return null }
  if (!/(^|\.)youtube\.com$/i.test(u.hostname)) return null
  const [a, b] = u.pathname.split('/').filter(Boolean)
  if (a?.startsWith('@') && a.length > 2) return { handle: `yt-${decodeURIComponent(a.slice(1)).toLowerCase()}`, url: `${YT}/${a}` }
  if (['channel', 'c', 'user'].includes(a) && b) return { handle: `yt-${b.toLowerCase()}`, url: `${YT}/${a}/${b}` }
  return null
}

/** The video id in a watch, shorts, live, embed or youtu.be link, or null. */
export function videoIdOf(s) {
  let u
  try { u = new URL(/^https?:/i.test(String(s).trim()) ? String(s).trim() : `https://${String(s).trim()}`) } catch { return null }
  const id = /(^|\.)youtu\.be$/i.test(u.hostname) ? u.pathname.slice(1).split('/')[0]
    : /(^|\.)youtube\.com$/i.test(u.hostname) ? (u.searchParams.get('v') ?? u.pathname.match(/^\/(?:shorts|live|embed)\/([^/?#]+)/)?.[1]) : null
  return /^[A-Za-z0-9_-]{11}$/.test(id ?? '') ? id : null
}

/** yt-dlp --flat-playlist -J on a tab → [{ id, kind, title, views, duration }]. */
export function linksOf(listing, kind) {
  return (listing?.entries ?? []).filter((e) => /^[A-Za-z0-9_-]{11}$/.test(e?.id ?? '')).map((e) => ({
    id: e.id, kind, title: e.title ?? null,
    views: Number.isFinite(e.view_count) ? e.view_count : null,
    duration: Number.isFinite(e.duration) ? e.duration : null,
    url: kind === 'short' ? `${YT}/shorts/${e.id}` : `${YT}/watch?v=${e.id}`,
  }))
}

/** Merge listings, first seen first, one per id. */
export function mergeLinks(...lists) {
  const seen = new Map()
  for (const l of lists.flat()) if (l?.id && !seen.has(l.id)) seen.set(l.id, l)
  return [...seen.values()]
}

/** YouTube's json3 captions → the transcript shape process.mjs keeps ({ text, segments, words, speech }). */
export function captionsOf(json3) {
  const segments = []
  for (const ev of json3?.events ?? []) {
    if (!ev?.segs) continue
    const text = ev.segs.map((s) => s.utf8 ?? '').join('').replace(/\s+/g, ' ').replace(/\[(music|applause|laughter)\]/gi, '').trim()
    if (!text) continue
    const from = (ev.tStartMs ?? 0) / 1000
    segments.push({ from: Math.round(from * 10) / 10, to: Math.round((from + (ev.dDurationMs ?? 0) / 1000) * 10) / 10, text })
  }
  const text = segments.map((s) => s.text).join(' ').replace(/\s+/g, ' ').trim()
  const words = text ? text.split(' ').length : 0
  return { text, segments, words, speech: words > 3, model: 'youtube-captions' }
}

/** The best English caption file yt-dlp left for an id: made by the creator first, auto-generated after. */
export function captionFileOf(dir, id) {
  let names = []
  try { names = readdirSync(dir).filter((f) => f.startsWith(`${id}.`) && f.endsWith('.json3')) } catch { return null }
  const rank = (f) => (/\.en\.json3$/.test(f) ? 0 : /\.en-orig\.json3$/.test(f) ? 1 : /\.en[-.]/.test(f) ? 2 : 3)
  return names.sort((a, b) => rank(a) - rank(b))[0] ?? null
}

/** yt-dlp's info for one video → the details file posts.mjs reads (the keys gallery-dl writes for Instagram). */
export function metaOf(info, link) {
  const day = /^\d{8}$/.test(info?.upload_date ?? '') ? `${info.upload_date.slice(0, 4)}-${info.upload_date.slice(4, 6)}-${info.upload_date.slice(6)}T12:00:00Z` : null
  const ts = Number.isFinite(info?.timestamp) ? new Date(info.timestamp * 1000).toISOString() : null
  const title = String(info?.title ?? link.title ?? '').trim()
  const desc = String(info?.description ?? '').trim()
  return {
    category: 'youtube', subcategory: link.kind,
    post_shortcode: link.id, post_url: link.url,
    // The title is a YouTube video's first line of packaging, so it leads the "caption".
    title, description: [title, desc].filter(Boolean).join('\n\n'),
    date: ts ?? day,
    likes: Number.isFinite(info?.like_count) ? info.like_count : null,
    width: info?.width ?? null, height: info?.height ?? null,
    num: 1, uploader: info?.uploader ?? info?.channel ?? null,
    tags: info?.tags ?? [], chapters: (info?.chapters ?? []).map((c) => ({ at: c.start_time, title: c.title })),
  }
}

export function whyFailed(stderr) {
  const s = String(stderr)
  if (/\b429\b|too many requests|rate.?limit|try again later/i.test(s)) return 'slowDown'
  if (/confirm you.?re not a bot|sign in to confirm|use --cookies|login required/i.test(s)) return 'login'
  return 'failed'
}

function cookieArgs(o) {
  if (o.cookiesFromBrowser) return ['--cookies-from-browser', o.cookiesFromBrowser]
  if (o.cookies) return ['--cookies', o.cookies]
  return []
}

export function listArgs(tabUrl, o = {}) {
  const args = ['--flat-playlist', '-J', '--no-warnings', ...cookieArgs(o)]
  if (Number.isFinite(o.limit)) args.push('--playlist-end', String(o.limit))
  return [...args, tabUrl]
}

export function videoArgs(link, dir, o = {}) {
  return [
    '--no-warnings', '--no-progress', '--no-playlist', ...cookieArgs(o),
    '-f', 'bv*[height<=480]+ba/b[height<=480]/wv*+ba/w', '--merge-output-format', 'mp4',
    '--write-info-json', '-o', `infojson:${path.join(dir, '_yt', link.id)}`,
    '--write-subs', '--write-auto-subs', '--sub-langs', 'en,en-orig,en-US,en-GB', '--sub-format', 'json3',
    '-o', `subtitle:${path.join(dir, '_yt', link.id)}`,
    '--write-thumbnail', '--convert-thumbnails', 'jpg', '-o', `thumbnail:${path.join(dir, '_thumbs', link.id)}`,
    '-o', path.join(dir, `${link.id}.01.%(ext)s`),
    link.url,
  ]
}

export function videoFileOf(dir, id) {
  try {
    return readdirSync(dir).find((f) => f.startsWith(`${id}.01.`) && /\.(mp4|mov|webm|m4v)$/i.test(f) && statSync(path.join(dir, f)).size > 0) ?? null
  } catch { return null }
}

/** Turn what yt-dlp left for one id into the files the later steps read. True when it's all there. */
export function settle(dir, link) {
  const info = readJson(path.join(dir, '_yt', `${link.id}.info.json`))
  const file = videoFileOf(dir, link.id)
  if (!info || !file) return false
  writeJson(path.join(dir, `${file}.json`), metaOf(info, link))
  const cap = captionFileOf(path.join(dir, '_yt'), link.id)
  if (cap) writeJson(path.join(dir, '_captions', `${link.id}.json`), captionsOf(readJson(path.join(dir, '_yt', cap))))
  return { info, file }
}

const jitter = (lo, hi) => new Promise((r) => setTimeout(r, 1000 * (lo + Math.random() * (hi - lo))))

async function list(channel, o) {
  const tabs = [['video', `${channel.url}/videos`], ['short', `${channel.url}/shorts`]]
  const lists = []
  let about = null
  for (const [kind, url] of tabs) {
    const r = await run('yt-dlp', listArgs(url, o), { echo: false })
    if (r.code === 127) { console.error('yt-dlp is not installed (brew install yt-dlp).'); process.exit(EXIT.failed) }
    let j = null
    try { j = JSON.parse(r.out) } catch {}
    if (!j) { if (!/does not have a (shorts|videos) tab/i.test(r.err)) console.log(`  ${kind === 'short' ? 'Shorts' : 'Videos'}: ${r.err.trim().split('\n').pop() || 'nothing'}`); continue }
    about ??= { site: 'youtube', username: channel.handle, name: j.channel ?? j.uploader ?? null, bio: j.description ?? null, link: channel.url, links: [], followers: j.channel_follower_count ?? null, following: null, posts: null, verified: false, professional: true, private: false }
    const got = linksOf(j, kind)
    console.log(`  ${kind === 'short' ? 'Shorts' : 'Videos'}: ${got.length}`)
    lists.push(got)
  }
  return { links: mergeLinks(...lists), about }
}

async function main() {
  const argv = process.argv.slice(2)
  const input = argv.find((a, i) => !a.startsWith('--') && !(argv[i - 1] ?? '').match(/^--(limit|cookies|cookies-from-browser|handle-file)$/))
  const o = { limit: flag(argv, 'limit') ? Number(flag(argv, 'limit')) : undefined, cookiesFromBrowser: flag(argv, 'cookies-from-browser'), cookies: flag(argv, 'cookies') }
  let channel = channelOf(input)
  if (!channel && videoIdOf(input)) {
    // A video link: study the channel it's from.
    const r = await fetch(`${YT}/oembed?format=json&url=${encodeURIComponent(input)}`).then((x) => x.json()).catch(() => null)
    channel = channelOf(r?.author_url)
  }
  if (!channel) { console.error('Usage: node src/youtube.mjs <channel link, @handle or a video from it> [--limit N] [--cookies-from-browser chrome] [--links-only]'); process.exit(2) }
  const dir = ensureDir(mediaDir(channel.handle))
  if (!channel.url) channel = readJson(path.join(dir, '_source.json'))
  if (!channel?.url) { console.error(`Haven't studied ${input} on this computer yet. Paste the channel's link instead.`); process.exit(2) }
  writeJson(path.join(dir, '_source.json'), channel)
  if (flag(argv, 'handle-file')) writeFileSync(flag(argv, 'handle-file'), channel.handle + '\n')

  console.log(`Listing ${channel.url}`)
  const { links: found, about } = await list(channel, o)
  if (about) writeJson(path.join(dir, '_profile.json'), { ...about, fetchedAt: new Date().toISOString() })
  const links = mergeLinks(readJson(path.join(dir, '_links.json'), []), found)
  writeJson(path.join(dir, '_links.json'), links)
  console.log(`${about?.name ?? channel.handle}: ${about?.followers ?? '?'} subscribers, ${links.length} videos and Shorts. Saving as ${channel.handle}.`)
  if (!links.length) { console.error('Found nothing to download. Check the link opens a channel.'); process.exit(EXIT.failed) }
  if (argv.includes('--links-only')) return

  const want = Number.isFinite(o.limit) ? found : links
  const numbersFile = path.join(dir, '_numbers.json')
  const numbers = readJson(numbersFile, {})
  for (const l of want) if (!numbers[l.id]?.views && videoFileOf(dir, l.id)) { const s = settle(dir, l); if (s) numbers[l.id] = fromYtdlp(s.info) }
  const todo = want.filter((l) => !(videoFileOf(dir, l.id) && existsSync(path.join(dir, `${videoFileOf(dir, l.id)}.json`))) && (numbers[l.id]?.failed ?? 0) < 2)
  console.log(`${want.length - todo.length} of ${want.length} already here. Downloading ${todo.length} (small, 480p).`)
  let streak = 0, ok = 0
  for (const [i, l] of todo.entries()) {
    const r = await run('yt-dlp', videoArgs(l, dir, o), { echo: false })
    const s = settle(dir, l)   // a missing caption can fail the run while the video itself came down fine
    if (s) {
      numbers[l.id] = fromYtdlp(s.info)
      ok++; streak = 0
      const n = numbers[l.id]
      console.log(`  [${i + 1}/${todo.length}] ${l.kind === 'short' ? 'short' : 'video'} ${l.id}  ${n.duration ? `${Math.round(n.duration)}s · ` : ''}${n.views ?? '–'} views · ${n.likes ?? '–'} likes · ${n.comments ?? '–'} comments`)
    } else {
      const why = whyFailed(r.err)
      numbers[l.id] = { failed: (numbers[l.id]?.failed ?? 0) + 1, at: new Date().toISOString() }
      streak++
      console.log(`  [${i + 1}/${todo.length}] ${l.id}  ✗ ${r.err.trim().split('\n').pop() || 'no video'}`)
      if (why !== 'failed' || streak >= STREAK) {
        writeJson(numbersFile, numbers)
        if (why === 'login') { console.error('YouTube wants to check you\'re not a bot. Log into YouTube in your browser and run again.'); process.exit(EXIT.login) }
        console.error(`YouTube probably wants a break. Saved ${ok}; run again later and it carries on.`)
        process.exit(EXIT.slowDown)
      }
    }
    writeJson(numbersFile, numbers)
    if (i < todo.length - 1) await jitter(3, 8)
  }
  console.log(`Done: ${ok} downloaded this run. Next: npm run process -- ${channel.handle}`)
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().then(() => process.exit(EXIT.ok), (e) => { console.error(e?.message ?? e); process.exit(EXIT.failed) })
}
