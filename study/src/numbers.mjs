// Views, comments and length for every downloaded post.
//
//   node src/numbers.mjs tylerinthemaking --cookies-from-browser chrome   # yt-dlp, one post at a time
//   IG_ACCESS_TOKEN=… IG_USER_ID=… node src/numbers.mjs tylerinthemaking  # Meta's official API instead
//
// gallery-dl gives likes but not views or comments, so this fills them in.
// With Meta set up (the same two variables founder/ and inspo/ use) it reads
// the whole account in a few requests and the numbers are exact; that only
// works if the page is a Business or Creator account. Otherwise yt-dlp reads
// each post with your logged-in browser, 3 seconds apart.
//
// Saved in media/<handle>/_numbers.json; posts already done are skipped.
// Exit 75 = Instagram asked us to slow down; run again later.
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { fetchCreator } from '../../founder/src/import-ig.mjs'
import { run, EXIT } from './download.mjs'
import { flag, handlesFromArgs, mediaDir, readJson, sleep, writeJson } from './paths.mjs'
import { readPosts } from './posts.mjs'

const STREAK = 8
const int = (n) => (Number.isFinite(n) && n >= 0 ? Math.round(n) : null)

/** yt-dlp --dump-single-json → our numbers. Carousels come back as a playlist with the same top-level counts. */
export function fromYtdlp(info) {
  if (!info || typeof info !== 'object') return null
  const firstVideo = (info.entries ?? []).find((e) => e?.duration) ?? null
  return {
    views: int(info.view_count ?? firstVideo?.view_count),
    likes: int(info.like_count),
    comments: int(info.comment_count),
    duration: Number.isFinite(info.duration) ? info.duration : Number.isFinite(firstVideo?.duration) ? firstVideo.duration : null,
    from: 'yt-dlp',
  }
}

/** A Meta Business Discovery media object → our numbers, keyed by shortcode. */
export function fromMeta(posts) {
  const out = {}
  for (const m of posts) {
    const code = m.permalink?.match(/\/(?:p|reels?|tv)\/([A-Za-z0-9_-]+)/)?.[1]
    if (!code) continue
    out[code] = { views: int(m.view_count), likes: int(m.like_count), comments: int(m.comments_count), duration: null, from: 'meta' }
  }
  return out
}

export function ytdlpArgs(url, o = {}) {
  const args = ['--skip-download', '--dump-single-json', '--ignore-no-formats-error', '--no-warnings', '--no-progress', '--flat-playlist']
  if (o.cookiesFromBrowser) args.push('--cookies-from-browser', o.cookiesFromBrowser)
  if (o.cookies) args.push('--cookies', o.cookies)
  return [...args, url]
}

async function main() {
  const argv = process.argv.slice(2)
  const [handle] = handlesFromArgs(argv, 'Usage: node src/numbers.mjs <instagram handle> [--cookies-from-browser chrome] [--via meta|ytdlp] [--refresh]')
  const dir = mediaDir(handle)
  const file = path.join(dir, '_numbers.json')
  const numbers = argv.includes('--refresh') ? {} : readJson(file, {})
  const posts = readPosts(dir)
  if (!posts.length) { console.error(`Nothing downloaded for @${handle} yet. Run: npm run download -- ${handle}`); process.exit(EXIT.failed) }

  const token = process.env.IG_ACCESS_TOKEN, userId = process.env.IG_USER_ID
  const via = flag(argv, 'via') ?? (token && userId ? 'meta' : 'ytdlp')

  if (via === 'meta') {
    if (!token || !userId) { console.error('Meta needs IG_ACCESS_TOKEN and IG_USER_ID (see inspo/README.md, "Option A"). Or use --via ytdlp.'); process.exit(EXIT.failed) }
    try {
      const res = await fetchCreator(handle, { token, userId, version: process.env.IG_API_VERSION, max: 5000, log: console.log })
      const got = fromMeta(res.posts)
      for (const [code, n] of Object.entries(got)) numbers[code] = { ...numbers[code], ...n, duration: numbers[code]?.duration ?? null }
      writeJson(file, numbers)
      console.log(`Meta gave numbers for ${Object.keys(got).length} posts${res.views ? '' : ' (no view counts on this API version)'}.`)
    } catch (e) {
      console.error(`${e.message}\nFalling back to yt-dlp.`)
    }
  }

  const o = { cookiesFromBrowser: flag(argv, 'cookies-from-browser'), cookies: flag(argv, 'cookies') }
  const pause = Number(flag(argv, 'sleep') ?? 3) * 1000
  const todo = posts.filter((p) => !numbers[p.shortcode])
  if (!todo.length) { console.log(`All ${posts.length} posts have numbers.`); process.exit(EXIT.ok) }
  console.log(`${posts.length - todo.length} of ${posts.length} posts already have numbers. Reading ${todo.length} more with yt-dlp.`)
  let streak = 0, ok = 0
  for (const [i, p] of todo.entries()) {
    const r = await run('yt-dlp', ytdlpArgs(p.url, o), { echo: false })
    if (r.code === 127) { console.error('yt-dlp is not installed (brew install yt-dlp).'); process.exit(EXIT.failed) }
    let n = null
    try { n = fromYtdlp(JSON.parse(r.out)) } catch {}
    if (n) {
      numbers[p.shortcode] = n; ok++; streak = 0
      console.log(`  [${i + 1}/${todo.length}] ${p.shortcode}  ${n.views ?? '–'} views · ${n.likes ?? '–'} likes · ${n.comments ?? '–'} comments`)
    } else {
      streak++
      console.log(`  [${i + 1}/${todo.length}] ${p.shortcode}  ✗ ${r.err.trim().split('\n').pop() || 'no numbers'}`)
      if (streak >= STREAK) {
        writeJson(file, numbers)
        console.log(`\n${STREAK} in a row failed, so Instagram probably wants a break. Saved ${ok}; run again later to carry on.`)
        process.exit(EXIT.slowDown)
      }
    }
    if ((i + 1) % 10 === 0) writeJson(file, numbers)
    if (pause && i < todo.length - 1) await sleep(pause)
  }
  writeJson(file, numbers)
  console.log(`Done: numbers for ${Object.keys(numbers).length} of ${posts.length} posts.`)
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main()
