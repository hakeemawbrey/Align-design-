// Download a YouTube channel's Shorts and videos, using your own logged-in browser.
//
//   node src/youtube.mjs https://youtube.com/@greenbrorants
//   node src/youtube.mjs @greenbrorants --limit 12             # try a few first
//   node src/youtube.mjs yt-greenbrorants --links-only         # only list what's on the channel
//   node src/youtube.mjs @greenbrorants --cookies-from-browser safari
//
// yt-dlp lists the channel's Videos and Shorts tabs (--flat-playlist, one
// request per tab), then downloads each video at up to 720p with its details
// and YouTube's English captions, 4–9 seconds apart. It reads your login from
// your own browser (Chrome unless you say otherwise): YouTube asks logged-out
// computers to sign in to prove they're not a bot, and a logged-in browser
// going slowly is what it expects. There's nothing else to it: no tricks
// around that check. If YouTube still asks, it stops and the Mac button waits.
//
// Files land in media/yt-<handle>/ shaped like the Instagram downloads
// (<id>.01.mp4 plus <id>.01.mp4.json), the numbers in _numbers.json, and the
// captions as a ready-made transcript in _captions/<id>.json, so
// `npm run process` (which then needs whisper only for videos without
// captions) and `npm run report` work on them unchanged.
// Already-downloaded videos are skipped, so it's safe to stop and run again.
//
// Exit codes: 0 done · 75 YouTube wants a break or a sign-in check (run again later) · 77 the browser's YouTube login is gone · 1 anything else.
import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { EXIT, run } from './download.mjs'
import { fromYtdlp } from './numbers.mjs'
import { transcriptFrom } from './process.mjs'
import { ensureDir, flag, mediaDir, readJson, sleep, writeJson } from './paths.mjs'

const YT = 'https://www.youtube.com'
const STREAK = 8
const jitter = (lo, hi) => sleep(1000 * (lo + Math.random() * (hi - lo)))

/**
 * Which channel, and what to call it, from whatever gets pasted.
 *   @greenbrorants, youtube.com/@GreenBroRants/shorts?si=x → { handle: 'yt-greenbrorants', url: 'https://www.youtube.com/@GreenBroRants' }
 *   youtube.com/channel/UC…                                 → { handle: 'yt-uc…', url: 'https://www.youtube.com/channel/UC…' }
 *   youtube.com/c/name, youtube.com/user/name               → { handle: 'yt-name', url: … }
 * A single video's link (watch?v=, youtu.be/, /shorts/<id>) isn't a channel: null.
 */
export function channelOf(s) {
  const raw = String(s ?? '').trim()
  const slug = (t) => t.toLowerCase().replace(/[^a-z0-9._-]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 44)
  if (/^@[\w.-]{3,30}$/.test(raw)) return { handle: `yt-${slug(raw.slice(1))}`, url: `${YT}/${raw}` }
  let u
  try { u = new URL(/^https?:/i.test(raw) ? raw : `https://${raw}`) } catch { return null }
  if (!/(^|\.)youtube\.com$/i.test(u.hostname)) return null
  const parts = u.pathname.split('/').filter(Boolean).map((p) => decodeURIComponent(p))
  const at = parts[0]?.match(/^@([\w.-]{3,30})$/)?.[1]
  if (at) return { handle: `yt-${slug(at)}`, url: `${YT}/@${at}` }
  if (parts[0] === 'channel' && /^UC[\w-]{10,}$/.test(parts[1] ?? '')) return { handle: `yt-${slug(parts[1])}`, url: `${YT}/channel/${parts[1]}` }
  if ((parts[0] === 'c' || parts[0] === 'user') && /^[\w.-]{2,100}$/.test(parts[1] ?? '')) return { handle: `yt-${slug(parts[1])}`, url: `${YT}/${parts[0]}/${parts[1]}` }
  return null
}

/** "yt-greenbrorants" on its own: the channel this Mac saved before, or the @handle it came from. */
export function channelFromHandle(handle, saved) {
  if (saved?.url && saved.handle === handle) return saved
  const name = handle.match(/^yt-([\w.-]{3,30})$/)?.[1]
  return name && !/^uc[\w-]{10,}$/.test(name) ? { handle, url: `${YT}/@${name}` } : null
}

/** The channel's Videos and Shorts tabs. */
export function tabsOf(channel) {
  return [{ kind: 'video', url: `${channel.url}/videos` }, { kind: 'short', url: `${channel.url}/shorts` }]
}

function cookieArgs(o = {}) {
  if (o.cookies) return ['--cookies', o.cookies]
  return ['--cookies-from-browser', o.cookiesFromBrowser || 'chrome']
}

/** One tab, listed without opening any video. */
export function listArgs(tab, o = {}) {
  return [...cookieArgs(o), '--flat-playlist', '-J', '--no-warnings', '--no-progress', ...(o.limit ? ['--playlist-end', String(o.limit)] : []), tab.url]
}

/** yt-dlp -J --flat-playlist of a tab → [{ id, url, kind, title }], one per video. */
export function entriesOf(listing, kind) {
  const out = []
  const walk = (es) => {
    for (const e of es ?? []) {
      if (e?._type === 'playlist' || Array.isArray(e?.entries)) { walk(e.entries); continue }
      const id = e?.id
      if (!/^[\w-]{11}$/.test(id ?? '')) continue
      const short = kind === 'short' || /\/shorts\//.test(e.url ?? '')
      out.push({ id, url: short ? `${YT}/shorts/${id}` : `${YT}/watch?v=${id}`, kind: short ? 'short' : 'video', title: e.title ?? null })
    }
  }
  walk(listing?.entries)
  return out
}

/** Several tabs' entries → one list, each video once (first seen wins). */
export function mergeEntries(...lists) {
  const seen = new Map()
  for (const e of lists.flat()) if (e?.id && !seen.has(e.id)) seen.set(e.id, e)
  return [...seen.values()]
}

/** A tab's listing → what the page says about the channel. */
export function profileOf(listing, channel) {
  const l = listing ?? {}
  const at = String(l.uploader_id ?? '').startsWith('@') ? l.uploader_id : channel.url.match(/\/(@[\w.-]+)/)?.[1] ?? null
  return {
    site: 'youtube', username: channel.handle, name: l.channel ?? l.uploader ?? (l.title ? String(l.title).replace(/\s+-\s+(Videos|Shorts)$/i, '') : null),
    youtube: at, channelId: l.channel_id ?? null,
    bio: String(l.description ?? '').trim() || null, category: null,
    link: at ? `${YT}/${at}` : l.channel_url ?? channel.url, links: [],
    followers: Number.isFinite(l.channel_follower_count) ? l.channel_follower_count : null, following: null, posts: null,
    verified: false, professional: true, private: false,
  }
}

export function videoArgs(entry, dir, o = {}) {
  const side = path.join(dir, '_yt', entry.id)
  return [
    ...cookieArgs(o), '--no-warnings', '--no-progress', '--no-playlist',
    '-f', 'bv*[height<=720][ext=mp4]+ba[ext=m4a]/b[height<=720][ext=mp4]/bv*[height<=720]+ba/b[height<=720]/b',
    '--merge-output-format', 'mp4',
    '--write-info-json', '-o', `infojson:${side}`,
    '--write-subs', '--write-auto-subs', '--sub-langs', 'en.*', '--sub-format', 'json3/vtt/best', '--sleep-subtitles', '2',
    '-o', `subtitle:${side}`,
    '-o', path.join(dir, `${entry.id}.01.%(ext)s`),
    entry.url,
  ]
}

/**
 * Why a yt-dlp run failed.
 *   'slowDown' YouTube's "sign in to confirm you're not a bot" wall, or HTTP 429: stop and come back later (exit 75)
 *   'login'    the browser's YouTube cookies are no longer good (exit 77)
 *   'skip'     just this video (private, members-only, age check, removed)
 *   'failed'   anything else
 */
export function whyFailed(stderr) {
  const s = String(stderr)
  if (/not a bot|\b429\b|too many requests|rate.?limit|this content isn.t available, try again later|temporarily blocked|unusual traffic/i.test(s)) return 'slowDown'
  if (/cookies are no longer valid|cookies (have )?expired|could not (find|copy|decrypt)[^\n]*cookie|failed to decrypt/i.test(s)) return 'login'
  if (/private video|members.only|join this channel|confirm your age|age.restricted|video (is )?unavailable|has been removed|no longer available|premieres? in/i.test(s)) return 'skip'
  return 'failed'
}

/** The exit code a failure means for the whole run (null: carry on with the next video). */
export function exitFor(why) {
  return why === 'slowDown' ? EXIT.slowDown : why === 'login' ? EXIT.login : null
}

/** The video file yt-dlp left for an id, if any. */
export function videoFileOf(dir, id) {
  try {
    return readdirSync(dir).find((f) => f.startsWith(`${id}.01.`) && /\.(mp4|mov|webm|m4v|mkv)$/i.test(f) && statSync(path.join(dir, f)).size > 0) ?? null
  } catch { return null }
}

/** yt-dlp's info for one video → the details file posts.mjs reads (same keys gallery-dl writes for Instagram). */
export function metaOf(info, entry) {
  const ts = Number.isFinite(info?.timestamp) ? info.timestamp : Number.isFinite(info?.release_timestamp) ? info.release_timestamp : null
  const day = /^\d{8}$/.test(info?.upload_date ?? '') ? `${info.upload_date.slice(0, 4)}-${info.upload_date.slice(4, 6)}-${info.upload_date.slice(6)}T12:00:00Z` : null
  const title = String(info?.title ?? entry?.title ?? '').trim()
  const description = String(info?.description ?? '').trim()
  // The title reads as the caption; the description follows it, if it says anything more.
  const caption = [title, description && description !== title ? description : ''].filter(Boolean).join('\n\n')
  const short = entry?.kind === 'short' || /\/shorts\//.test(info?.webpage_url ?? '') || (info?.height > info?.width && (info?.duration ?? 999) <= 180)
  return {
    category: 'youtube', subcategory: short ? 'short' : 'video',
    post_shortcode: entry?.id ?? info?.id, post_url: short ? `${YT}/shorts/${entry?.id ?? info?.id}` : `${YT}/watch?v=${entry?.id ?? info?.id}`,
    title, description: caption,
    date: ts ? new Date(ts * 1000).toISOString() : day,
    likes: Number.isFinite(info?.like_count) ? info.like_count : null,
    width: info?.width ?? null, height: info?.height ?? null,
    num: 1, uploader: info?.channel ?? info?.uploader ?? null,
  }
}

// ---------- Captions → transcript ----------

/** YouTube's json3 captions → [{ from, to, text }] in seconds. */
export function json3Segments(json) {
  const out = []
  for (const e of json?.events ?? []) {
    if (!e?.segs) continue
    const text = e.segs.map((s) => s.utf8 ?? '').join('').replace(/\s+/g, ' ').trim()
    if (!text) continue
    const start = e.tStartMs ?? 0
    out.push({ from: start / 1000, to: (start + (e.dDurationMs ?? 0)) / 1000, text })
  }
  return out
}

const vttTime = (t) => {
  const m = String(t).trim().match(/^(?:(\d+):)?(\d+):(\d+)[.,](\d+)/)
  return m ? ((Number(m[1] ?? 0) * 3600 + Number(m[2]) * 60 + Number(m[3])) * 1000 + Number(m[4].padEnd(3, '0').slice(0, 3))) / 1000 : 0
}

/**
 * WebVTT captions → [{ from, to, text }]. YouTube's automatic ones roll: each
 * cue repeats the line before it, with 10 ms "hold" cues in between, so lines
 * already shown by the cue before are dropped.
 */
export function vttSegments(text) {
  const cues = []
  let cur = null
  for (const line of String(text ?? '').replace(/\r/g, '').split('\n')) {
    if (line.includes('-->')) {
      if (cur?.idLike) cur.lines.pop()   // a numbered cue's id, not words
      const [a, b] = line.split('-->')
      cur = { from: vttTime(a), to: vttTime(b), lines: [], gap: false }
      cues.push(cur)
      continue
    }
    if (!cur) continue
    const l = line.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/\s+/g, ' ').trim()
    if (l) { cur.idLike = cur.gap && /^\d+$/.test(l); cur.lines.push(l); cur.gap = false } else cur.gap = true
  }
  const out = []
  let prev = []
  for (const c of cues) {
    if (c.to - c.from < 0.05) { if (c.lines.length) prev = c.lines; continue }
    const fresh = c.lines.filter((l) => !prev.includes(l))
    if (c.lines.length) prev = c.lines
    if (fresh.length) out.push({ from: c.from, to: c.to, text: fresh.join(' ') })
  }
  return out
}

/**
 * The caption file to use among those yt-dlp left in _yt/ for a video:
 * captions the creator added first, then YouTube's automatic English
 * (en-orig is the untranslated one), json3 before vtt.
 */
export function pickCaption(files, id, info) {
  const mine = files.map((f) => f.match(new RegExp(`^${id.replace(/[-]/g, '\\-')}\\.(en(?:[-_][\\w-]+)?)\\.(json3|vtt)$`))).filter(Boolean)
  if (!mine.length) return null
  const manual = new Set(Object.keys(info?.subtitles ?? {}))
  const rank = (m) => (manual.has(m[1]) ? 0 : 10) + (m[1] === 'en-orig' ? 0 : m[1] === 'en' ? 1 : 2) + (m[2] === 'json3' ? 0 : 0.5)
  const best = mine.sort((x, y) => rank(x) - rank(y))[0]
  return { file: best[0], lang: best[1], format: best[2], auto: !manual.has(best[1]) }
}

/** A caption file's text → the transcript process.mjs keeps (same shape as whisper's). */
export function captionTranscript(content, format, { auto = true } = {}) {
  let segs = []
  if (format === 'json3') { try { segs = json3Segments(JSON.parse(content)) } catch { segs = [] } } else segs = vttSegments(content)
  return { ...transcriptFrom(segs), model: auto ? 'youtube-auto-captions' : 'youtube-captions' }
}

/** Save a video's captions as media/<handle>/_captions/<id>.json, if it has any. */
export function saveCaptions(dir, id, info) {
  const side = path.join(dir, '_yt')
  let files = []
  try { files = readdirSync(side) } catch {}
  const pick = pickCaption(files, id, info)
  if (!pick) return null
  const t = captionTranscript(readFileSync(path.join(side, pick.file), 'utf8'), pick.format, pick)
  writeJson(path.join(dir, '_captions', `${id}.json`), { ...t, lang: pick.lang })
  return t
}

// ---------- Running it ----------

async function ytdlp(args) {
  const r = await run('yt-dlp', args, { echo: false })
  if (r.code === 127) { console.error('yt-dlp is not installed (brew install yt-dlp).'); process.exit(EXIT.failed) }
  return r
}

function stop(why, msg) {
  if (why === 'login') console.error(`${msg}\nYouTube didn't take your browser's login. Open YouTube in that browser, make sure you're signed in, and run again.`)
  else console.error(`${msg}\nYouTube wants a break (it asked to confirm you're not a bot, or said too many requests). Run again later and it carries on.`)
  process.exit(exitFor(why))
}

async function listChannel(channel, o) {
  const lists = []
  let profile = null
  for (const tab of tabsOf(channel)) {
    const r = await ytdlp(listArgs(tab, o))
    let listing = null
    try { listing = JSON.parse(r.out) } catch {}
    if (r.code !== 0 || !listing) {
      const why = whyFailed(r.err)
      if (exitFor(why) != null) stop(why, `Listing ${tab.kind}s: ${r.err.trim().split('\n').pop()}`)
      if (/does not have a \w+ tab|has no \w+|404/i.test(r.err)) { console.log(`  no ${tab.kind}s tab`); await jitter(2, 4); continue }
      console.error(`Couldn't list the channel's ${tab.kind}s: ${r.err.trim().split('\n').pop() || 'no answer'}`)
      process.exit(EXIT.failed)
    }
    profile ??= profileOf(listing, channel)
    const got = entriesOf(listing, tab.kind)
    console.log(`  ${got.length} ${tab.kind}s`)
    lists.push(got)
    await jitter(2, 4)
  }
  return { entries: mergeEntries(...lists), profile }
}

async function download(entries, dir, o) {
  const numbersFile = path.join(dir, '_numbers.json')
  const numbers = readJson(numbersFile, {})
  const done = (e) => { const f = videoFileOf(dir, e.id); return f && existsSync(path.join(dir, `${f}.json`)) }
  const todo = entries.filter((e) => !done(e) && (numbers[e.id]?.failed ?? 0) < 2)
  console.log(`${entries.length - todo.length} of ${entries.length} already here. Downloading ${todo.length}.`)
  let streak = 0, ok = 0
  for (const [i, e] of todo.entries()) {
    const r = await ytdlp(videoArgs(e, dir, o))
    const info = readJson(path.join(dir, '_yt', `${e.id}.info.json`))
    const file = videoFileOf(dir, e.id)
    if (r.code === 0 && file && info) {
      writeJson(path.join(dir, `${file}.json`), metaOf(info, e))
      numbers[e.id] = fromYtdlp(info)
      const cap = saveCaptions(dir, e.id, info)
      ok++; streak = 0
      const n = numbers[e.id]
      console.log(`  [${i + 1}/${todo.length}] ${e.kind} ${e.id}  ${n.duration ? `${Math.round(n.duration)}s · ` : ''}${n.views ?? '–'} views · ${n.likes ?? '–'} likes · ${n.comments ?? '–'} comments${cap ? ` · captions (${cap.words} words)` : ''}`)
    } else {
      const why = whyFailed(r.err)
      numbers[e.id] = { failed: (numbers[e.id]?.failed ?? 0) + (why === 'skip' ? 2 : 1), at: new Date().toISOString() }
      if (why !== 'skip') streak++
      console.log(`  [${i + 1}/${todo.length}] ${e.id}  ✗ ${r.err.trim().split('\n').pop() || 'no video'}`)
      writeJson(numbersFile, numbers)
      if (exitFor(why) != null) stop(why, `Saved ${ok} this run.`)
      if (streak >= STREAK) stop('slowDown', `${STREAK} failed in a row. Saved ${ok} this run.`)
    }
    writeJson(numbersFile, numbers)
    if (i < todo.length - 1) await jitter(4, 9)
  }
  return ok
}

async function main() {
  const argv = process.argv.slice(2)
  const input = argv.find((a, i) => !a.startsWith('--') && !(argv[i - 1] ?? '').match(/^--(limit|handle-file|cookies|cookies-from-browser)$/))
  if (!input) { console.error('Usage: node src/youtube.mjs <channel link or @handle> [--limit N] [--links-only] [--cookies-from-browser chrome]'); process.exit(2) }
  const limit = flag(argv, 'limit') ? Number(flag(argv, 'limit')) : undefined
  const o = { cookiesFromBrowser: flag(argv, 'cookies-from-browser') ?? 'chrome', cookies: flag(argv, 'cookies'), limit: Number.isFinite(limit) ? limit : undefined }

  const channel = /^yt-/.test(input) ? channelFromHandle(input, readJson(path.join(mediaDir(input), '_source.json'))) : channelOf(input)
  if (!channel) { console.error(`"${input}" isn't a YouTube channel. Paste the channel's link (like youtube.com/@greenbrorants) or its @handle.`); process.exit(2) }
  const dir = ensureDir(mediaDir(channel.handle))
  writeJson(path.join(dir, '_source.json'), channel)
  if (flag(argv, 'handle-file')) writeFileSync(flag(argv, 'handle-file'), channel.handle + '\n')

  console.log(`Listing ${channel.url} (Videos and Shorts), signed in through ${o.cookies ? 'your cookies file' : o.cookiesFromBrowser}…`)
  const { entries: listed, profile } = await listChannel(channel, o)
  const seen = readJson(path.join(dir, '_links.json'), [])
  let entries = mergeEntries(listed, seen)
  writeJson(path.join(dir, '_links.json'), entries)
  if (profile) {
    profile.posts = entries.length
    writeJson(path.join(dir, '_profile.json'), { ...profile, fetchedAt: new Date().toISOString() })
  }
  console.log(`${profile?.name ?? channel.handle}: ${profile?.followers ?? '?'} subscribers, ${entries.length} Shorts and videos. Saving as ${channel.handle}.`)
  if (o.limit) entries = entries.slice(0, o.limit)
  if (!entries.length) { console.error('Found no Shorts or videos on that channel.'); process.exit(EXIT.failed) }
  if (argv.includes('--links-only')) return

  const ok = await download(entries, dir, o)
  console.log(`Done: ${ok} downloaded this run. Next: npm run process -- ${channel.handle}`)
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().then(() => process.exit(EXIT.ok), (e) => { console.error(e?.message ?? e); process.exit(EXIT.failed) })
}
