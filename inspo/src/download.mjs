// Download every post in data/inspo.json into media/<shortcode>/.
//
//   npm run download                      # Meta's official API (needs a token, see README)
//   npm run download -- --via ytdlp       # yt-dlp on your own computer instead
//   npm run download -- --via both        # Meta first, yt-dlp for whatever Meta can't give
//   npm run download -- --only i0001-i0100 --creator kevbuildsapps --limit 50
//
// Already-downloaded posts are skipped, so it's safe to stop and run again.
// Failures are written to media/_failed.json with the reason.
import { createWriteStream, existsSync, readFileSync, writeFileSync } from 'node:fs'
import { spawn, spawnSync } from 'node:child_process'
import { Readable } from 'node:stream'
import { pipeline } from 'node:stream/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { MEDIA, ensureDir, loadItems, mediaIndex } from './items.mjs'

const STREAK = 8
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
const FIELDS = 'permalink,media_type,media_product_type,media_url,thumbnail_url,timestamp'

export function shortcodeOf(url) {
  return url?.match(/instagram\.com\/(?:[^/]+\/)?(?:reels?|p|tv)\/([A-Za-z0-9_-]+)/)?.[1] ?? null
}

function metaError(body, status) {
  const e = body?.error
  return e ? `Meta said: ${e.message} (code ${e.code})` : `Meta answered HTTP ${status}`
}

/**
 * Meta's Business Discovery lists a public Business/Creator account's posts
 * with direct media links. Page through one creator until every wanted
 * shortcode is found (or the account runs out, or `maxPages`).
 * Returns shortcode → [{ url, kind }] and the reason for anything missing.
 */
export async function findOnMeta(handle, wanted, { token, userId, version = 'v24.0', maxPages = 40, fetch = globalThis.fetch, pause = 0 }) {
  const left = new Set(wanted)
  const found = {}
  let after = null
  let children = true
  for (let page = 0; page < maxPages && left.size; page++) {
    const fields = children ? `${FIELDS},children{media_type,media_url,thumbnail_url}` : FIELDS
    const q = `business_discovery.username(${handle}){media${after ? `.after(${after})` : ''}.limit(50){${fields}}}`
    const res = await fetch(`https://graph.facebook.com/${version}/${userId}?fields=${encodeURIComponent(q)}&access_token=${encodeURIComponent(token)}`)
    const body = await res.json().catch(() => null)
    if (!res.ok || body?.error) {
      if (children && /children/.test(body?.error?.message ?? '')) { children = false; page--; continue }
      if (body?.error?.code === 4 || body?.error?.code === 32 || body?.error?.code === 613) {
        const err = new Error(`rate limited by Meta: ${body.error.message}`); err.rateLimited = true; throw err
      }
      return { found, missing: metaError(body, res.status) }
    }
    const media = body.business_discovery?.media
    for (const m of media?.data ?? []) {
      const code = shortcodeOf(m.permalink)
      if (!left.has(code)) continue
      const parts = m.children?.data?.length ? m.children.data : [m]
      const files = parts.map((p) => ({ url: p.media_url ?? p.thumbnail_url, kind: p.media_type === 'VIDEO' ? 'video' : 'image' })).filter((f) => f.url)
      if (files.length) { found[code] = files; left.delete(code) }
    }
    after = media?.paging?.cursors?.after
    if (!media?.data?.length || !after || !media?.paging?.next) break
    if (pause) await sleep(pause)
  }
  return { found, missing: left.size ? 'not in what Meta returned for this account (too old, or the video has licensed music so Meta withholds the file)' : null }
}

async function save(url, file, fetch = globalThis.fetch) {
  const res = await fetch(url)
  if (!res.ok || !res.body) throw new Error(`download failed: HTTP ${res.status}`)
  await pipeline(Readable.fromWeb(res.body), createWriteStream(file + '.part'))
  const { renameSync } = await import('node:fs')
  renameSync(file + '.part', file)
}

export function extFor(kind, url) {
  const m = new URL(url).pathname.match(/\.(mp4|jpe?g|png|webp|heic)$/i)
  return m ? m[1].toLowerCase().replace('jpeg', 'jpg') : kind === 'video' ? 'mp4' : 'jpg'
}

function ytdlpArgs(item, dir, opts) {
  const args = ['--no-progress', '--no-warnings', '--restrict-filenames', '--no-overwrites',
    '--sleep-requests', String(opts.sleep ?? 2), '-o', path.join(dir, '%(playlist_index|1)02d.%(ext)s')]
  if (opts.cookiesFromBrowser) args.push('--cookies-from-browser', opts.cookiesFromBrowser)
  if (opts.cookies) args.push('--cookies', opts.cookies)
  args.push(item.url)
  return args
}

/** gallery-dl handles image posts and mixed carousels, which yt-dlp skips. */
export function galleryArgs(item, dir, opts) {
  const args = ['--quiet', '--sleep-request', String(opts.sleep ?? 2), '-D', dir, '-f', '{num:>02}.{extension}']
  if (opts.cookiesFromBrowser) args.push('--cookies-from-browser', opts.cookiesFromBrowser)
  if (opts.cookies) args.push('--cookies', opts.cookies)
  args.push(item.url)
  return args
}

function run(bin, args) {
  return new Promise((resolve) => {
    const p = spawn(bin, args, { stdio: ['ignore', 'ignore', 'pipe'] })
    let err = ''
    p.stderr.on('data', (d) => { err += d })
    p.on('error', (e) => resolve(e.code === 'ENOENT' ? `${bin} is not installed (brew install ${bin})` : e.message))
    p.on('close', (code) => resolve(code === 0 ? null : (err.trim().split('\n').pop() || `${bin} exited with ${code}`)))
  })
}

/** Reels go to yt-dlp; image posts and carousels to gallery-dl when it's installed. Each falls back to the other. */
async function fetchOne(item, dir, opts) {
  const tools = item.type === 'Reel' ? ['yt-dlp', 'gallery-dl'] : ['gallery-dl', 'yt-dlp']
  let why = null
  for (const bin of tools.filter((t) => opts.have[t])) {
    why = await run(bin, bin === 'yt-dlp' ? ytdlpArgs(item, dir, opts) : galleryArgs(item, dir, opts))
    if (!why && mediaIndex(path.dirname(dir))[item.shortcode]) return null
    why ??= `${bin} finished but saved nothing`
  }
  return why
}

function parseArgs(argv) {
  const o = { via: null, only: null, creator: null, limit: Infinity, type: null, cookiesFromBrowser: null, cookies: null, sleep: 3 }
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i], v = () => argv[++i]
    if (a === '--via') o.via = v()
    else if (a === '--only') o.only = v()
    else if (a === '--creator') o.creator = v().replace(/^@/, '')
    else if (a === '--type') o.type = v().toLowerCase()
    else if (a === '--limit') o.limit = Number(v())
    else if (a === '--sleep') o.sleep = Number(v())
    else if (a === '--cookies-from-browser') o.cookiesFromBrowser = v()
    else if (a === '--cookies') o.cookies = v()
    else if (a === '--retry-failed') o.retryFailed = true
    else { console.error(`Unknown option ${a}. See the top of src/download.mjs.`); process.exit(1) }
  }
  return o
}

/** "i0001-i0100,i0200" → a predicate on item ids. */
export function idFilter(spec) {
  if (!spec) return () => true
  const parts = spec.split(',').map((s) => s.trim().split('-').map((x) => Number(x.replace(/\D/g, ''))))
  return (id) => { const n = Number(id.slice(1)); return parts.some(([a, b = a]) => n >= a && n <= b) }
}

async function main() {
  const o = parseArgs(process.argv.slice(2))
  const token = process.env.IG_ACCESS_TOKEN, userId = process.env.IG_USER_ID
  const hasMeta = Boolean(token && userId)
  const have = { 'yt-dlp': spawnSync('yt-dlp', ['--version']).status === 0, 'gallery-dl': spawnSync('gallery-dl', ['--version']).status === 0 }
  o.have = have
  const hasYtdlp = have['yt-dlp'] || have['gallery-dl']
  o.via ??= hasMeta ? (hasYtdlp ? 'both' : 'meta') : 'ytdlp'
  if (o.via !== 'ytdlp' && !hasMeta) { console.error('Meta needs IG_ACCESS_TOKEN and IG_USER_ID (see README → "Download with Meta"). Or run with --via ytdlp.'); process.exit(1) }
  if (o.via !== 'meta' && !hasYtdlp) {
    if (o.via === 'ytdlp') { console.error('yt-dlp is not installed. Install it (pip install -U yt-dlp, or brew install yt-dlp), or set up Meta (README).'); process.exit(1) }
    console.log('yt-dlp is not installed, so only Meta will be used.'); o.via = 'meta'
  }

  ensureDir(MEDIA)
  const failedFile = path.join(MEDIA, '_failed.json')
  const failed = existsSync(failedFile) ? JSON.parse(readFileSync(failedFile, 'utf8')) : {}
  const onDisk = mediaIndex()
  const inRange = idFilter(o.only)
  const todo = loadItems().filter((it) => inRange(it.id) && !onDisk[it.shortcode]
    && (!o.creator || it.creator === o.creator) && (!o.type || it.type.toLowerCase() === o.type)
    && (o.retryFailed || !failed[it.shortcode])).slice(0, o.limit)
  const skippedFailed = Object.keys(failed).length
  console.log(`${Object.keys(onDisk).length} already downloaded. ${todo.length} to go via ${o.via}.${skippedFailed && !o.retryFailed ? ` (${skippedFailed} failed before; add --retry-failed to try them again.)` : ''}`)

  let ok = 0
  const done = (it, how) => { ok++; delete failed[it.shortcode]; console.log(`  ✓ ${it.id} @${it.creator} ${it.shortcode} (${how})`) }
  const fail = (it, why) => { failed[it.shortcode] = { id: it.id, creator: it.creator, why, at: new Date().toISOString() }; console.log(`  ✗ ${it.id} @${it.creator} ${it.shortcode}: ${why}`) }
  const flush = () => writeFileSync(failedFile, JSON.stringify(failed, null, 1) + '\n')
  process.on('SIGINT', () => { flush(); console.log(`\nStopped. ${ok} downloaded this run. Run again to continue.`); process.exit(130) })

  let leftover = todo
  if (o.via !== 'ytdlp') {
    leftover = []
    const byCreator = Map.groupBy(todo, (it) => it.creator)
    let n = 0
    for (const [handle, items] of byCreator) {
      n++
      process.stdout.write(`[${n}/${byCreator.size}] @${handle}\n`)
      let res
      try {
        res = await findOnMeta(handle, items.map((i) => i.shortcode), { token, userId, version: process.env.IG_API_VERSION, pause: 500 })
      } catch (e) {
        if (!e.rateLimited) throw e
        console.log(`  ${e.message}. Waiting 15 minutes, then carrying on (Ctrl+C to stop; progress is kept).`)
        await sleep(15 * 60_000); byCreator.set(handle, items); n--; continue
      }
      for (const it of items) {
        const files = res.found[it.shortcode]
        if (!files) { (o.via === 'both' ? leftover.push(it) : fail(it, res.missing)); continue }
        try {
          const dir = ensureDir(path.join(MEDIA, it.shortcode))
          for (const [i, f] of files.entries()) await save(f.url, path.join(dir, `${String(i + 1).padStart(2, '0')}.${extFor(f.kind, f.url)}`))
          done(it, `Meta, ${files.length} file${files.length > 1 ? 's' : ''}`)
        } catch (e) { o.via === 'both' ? leftover.push(it) : fail(it, e.message) }
      }
      flush()
    }
  }
  if (o.via !== 'meta') {
    let streak = 0
    for (const [i, it] of leftover.entries()) {
      process.stdout.write(`[${i + 1}/${leftover.length}] `)
      const why = await fetchOne(it, ensureDir(path.join(MEDIA, it.shortcode)), o)
      why ? fail(it, why) : done(it, 'downloaded')
      streak = why ? streak + 1 : 0
      if (streak >= STREAK) {
        // Many failures in a row means Instagram is refusing, not that the posts are gone.
        for (const x of leftover.slice(i + 1 - STREAK, i + 1)) delete failed[x.shortcode]
        flush()
        console.log(`\n${STREAK} failed in a row, so Instagram is probably asking us to slow down. Stopping for now; run again later and it picks up here.`)
        process.exit(75)
      }
      if (/login|rate|429|401|cookie/i.test(why ?? '') && !o.cookiesFromBrowser && !o.cookies) {
        console.log('  Instagram wants a login. Try --cookies-from-browser chrome (or safari / firefox) while signed in to Instagram there.')
      }
      flush()
      if (o.sleep) await sleep(o.sleep * 1000)
    }
  }
  flush()
  console.log(`\nDone: ${ok} downloaded this run, ${Object.keys(mediaIndex()).length} on disk, ${Object.keys(failed).length} failed (see media/_failed.json).`)
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main()
