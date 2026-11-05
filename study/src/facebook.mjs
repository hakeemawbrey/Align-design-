// Download a Facebook page's reels and videos, using your own Facebook login.
//
//   node src/facebook.mjs https://www.facebook.com/share/1KezBxmTFj/
//   node src/facebook.mjs https://www.facebook.com/people/Astriva/61595402754931/ --limit 12   # try a few first
//   node src/facebook.mjs fb-astriva --links-only      # only list what's on the page
//
// Neither gallery-dl nor yt-dlp can list a Facebook page's videos, but yt-dlp
// can download any single one. So this:
//   1. opens a Chrome window of its own (its own profile in ~/.align-study/facebook-browser,
//      so it never fights your everyday Chrome). The first time, you log into
//      Facebook in it; it remembers you after that.
//   2. scrolls the page's Reels and Videos tabs, slowly, and notes every link,
//   3. downloads each one with yt-dlp using that window's login, a few seconds
//      apart, with its caption, date, views, reactions and comments.
//
// Files land in media/fb-<page>/ shaped like the Instagram downloads
// (<id>.01.mp4 plus <id>.01.mp4.json), with the numbers in _numbers.json, so
// `npm run process` and `npm run report` work on them unchanged.
// Already-downloaded videos are skipped, so it's safe to stop and run again.
//
// Exit codes: 0 done · 75 Facebook wants a break (run again later) · 77 not logged in · 1 anything else.
import { chmodSync, existsSync, readdirSync, statSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { EXIT, run } from './download.mjs'
import { fromYtdlp } from './numbers.mjs'
import { HOME, ensureDir, flag, handleOf, mediaDir, readJson, sleep, writeJson } from './paths.mjs'

const FB = 'https://www.facebook.com'
const STREAK = 8
const jitter = (lo, hi) => sleep(1000 * (lo + Math.random() * (hi - lo)))

/**
 * Where a page lives and what to call it, from any non-share Facebook link.
 *   facebook.com/people/Astriva/61595402754931/ → { handle: 'fb-astriva', id: '61595402754931' }
 *   facebook.com/profile.php?id=615…            → { handle: 'fb-615…', id: '615…' }
 *   facebook.com/astrivapage                    → { handle: 'fb-astrivapage', vanity: 'astrivapage' }
 * Share links (facebook.com/share/…) need opening first: null.
 */
export function pageOf(s) {
  let u
  try { u = new URL(/^https?:/i.test(s) ? s : `https://${s}`) } catch { return null }
  if (!/(^|\.)facebook\.com$/i.test(u.hostname)) return null
  const parts = u.pathname.split('/').filter(Boolean)
  const slug = (t) => t.toLowerCase().normalize('NFKD').replace(/[^a-z0-9.]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 40)
  if (parts[0] === 'people' && /^\d+$/.test(parts[2] ?? '')) {
    const name = slug(decodeURIComponent(parts[1] ?? '')) || parts[2]
    return { handle: `fb-${name}`, id: parts[2], name: decodeURIComponent(parts[1] ?? '').replace(/-/g, ' ') || null }
  }
  if (parts[0] === 'profile.php' && /^\d+$/.test(u.searchParams.get('id') ?? '')) return { handle: `fb-${u.searchParams.get('id')}`, id: u.searchParams.get('id') }
  const skip = ['share', 'reel', 'watch', 'groups', 'login', 'plugins', 'story.php', 'permalink.php', 'photo', 'photo.php', 'events', 'marketplace', 'gaming', 'hashtag']
  if (parts[0] && !skip.includes(parts[0].toLowerCase()) && /^[A-Za-z0-9.]{3,80}$/.test(parts[0])) return { handle: `fb-${slug(parts[0])}`, vanity: parts[0] }
  return null
}

/** The Reels and Videos tabs of a page. */
export function tabsOf(page) {
  if (page.id) return [`${FB}/profile.php?id=${page.id}&sk=reels_tab`, `${FB}/profile.php?id=${page.id}&sk=videos`]
  return [`${FB}/${page.vanity}/reels/`, `${FB}/${page.vanity}/videos/`]
}

/** Every reel or video link among a page's hrefs → [{ id, url }], first seen first, one per video. */
export function videoLinks(hrefs) {
  const seen = new Map()
  for (const h of hrefs) {
    const s = String(h ?? '')
    const reel = s.match(/\/reel\/(\d{6,})/)?.[1]
    const video = s.match(/\/videos\/(?:[^/?#]+\/)?(\d{6,})/)?.[1] ?? s.match(/\/watch\/?\?(?:[^#]*&)?v=(\d{6,})/)?.[1]
    const id = reel ?? video
    if (!id || seen.has(id)) continue
    seen.set(id, { id, url: reel ? `${FB}/reel/${id}` : `${FB}/watch/?v=${id}` })
  }
  return [...seen.values()]
}

/** "9,433 followers", "9.4K followers" → 9433 / 9400. */
export function countOf(text, word) {
  const m = String(text ?? '').match(new RegExp(`([\\d.,]+)\\s*([KkMm])?\\s+${word}`))
  if (!m) return null
  const n = Number(m[1].replace(/,/g, ''))
  if (!Number.isFinite(n)) return null
  return Math.round(n * (m[2] ? (/k/i.test(m[2]) ? 1e3 : 1e6) : 1))
}

/** Playwright cookies → the Netscape cookies.txt yt-dlp reads. */
export function cookiesTxt(cookies) {
  const lines = ['# Netscape HTTP Cookie File', '# Written by Align Study from its own Facebook window. Keep private.']
  for (const c of cookies) {
    if (!/facebook\.com$/.test(c.domain.replace(/^\./, ''))) continue
    const domain = c.domain.startsWith('.') ? c.domain : `.${c.domain}`
    lines.push([domain, 'TRUE', c.path || '/', c.secure ? 'TRUE' : 'FALSE', c.expires > 0 ? Math.round(c.expires) : 0, c.name, c.value].join('\t'))
  }
  return lines.join('\n') + '\n'
}

/** yt-dlp's title for a Facebook video is often "12K views · 300 reactions | the caption | Page". Keep the caption. */
export function captionOf(info, pageName) {
  const d = String(info?.description ?? '').trim()
  if (d) return d
  let t = String(info?.title ?? '').trim()
  t = t.replace(/^[\d.,]+[KkMm]?\s+(views|plays)\s*·\s*[\d.,]+[KkMm]?\s+(reactions?|likes?)\s*\|\s*/i, '')
  if (pageName) t = t.replace(new RegExp(`\\s*\\|\\s*${pageName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*$`, 'i'), '')
  return /^(video|reel|facebook)$/i.test(t) ? '' : t
}

/** yt-dlp's info for one video → the details file posts.mjs reads (same keys gallery-dl writes for Instagram). */
export function metaOf(info, link, pageName) {
  const ts = Number.isFinite(info?.timestamp) ? info.timestamp : null
  const day = /^\d{8}$/.test(info?.upload_date ?? '') ? `${info.upload_date.slice(0, 4)}-${info.upload_date.slice(4, 6)}-${info.upload_date.slice(6)}T12:00:00Z` : null
  return {
    category: 'facebook', subcategory: link.url.includes('/reel/') ? 'reel' : 'video',
    post_shortcode: link.id, post_url: link.url,
    description: captionOf(info, pageName),
    date: ts ? new Date(ts * 1000).toISOString() : day,
    likes: Number.isFinite(info?.like_count) ? info.like_count : null,
    width: info?.width ?? null, height: info?.height ?? null,
    num: 1, uploader: info?.uploader ?? null,
  }
}

/** Why a yt-dlp run on one video failed. */
export function whyFailed(stderr) {
  const s = String(stderr)
  if (/\b429\b|too many requests|rate.?limit|temporarily blocked|try again later/i.test(s)) return 'slowDown'
  if (/registered users|use --cookies|login required|log in|checkpoint|\b401\b/i.test(s)) return 'login'
  return 'failed'
}

export function ytdlpVideoArgs(link, dir, cookieFile) {
  return [
    '--cookies', cookieFile, '--no-warnings', '--no-progress', '--no-playlist',
    '-f', 'bv*[height<=1920]+ba/b', '--merge-output-format', 'mp4',
    '--write-info-json', '-o', `infojson:${path.join(dir, '_fb', link.id)}`,
    '-o', path.join(dir, `${link.id}.01.%(ext)s`),
    link.url,
  ]
}

/** The video file yt-dlp left for an id, if any (it picks the extension). */
export function videoFileOf(dir, id) {
  try {
    return readdirSync(dir).find((f) => f.startsWith(`${id}.01.`) && /\.(mp4|mov|webm|m4v)$/i.test(f) && statSync(path.join(dir, f)).size > 0) ?? null
  } catch { return null }
}

// ---------- The browser part ----------

async function openBrowser() {
  let chromium
  try { ({ chromium } = await import('playwright-core')) } catch {
    console.error('Missing a piece: run `npm install` in the study folder (the Mac button does this for you).'); process.exit(EXIT.failed)
  }
  const profile = ensureDir(path.join(HOME, 'facebook-browser'))
  const base = { headless: false, viewport: { width: 1100, height: 900 } }
  const tries = process.env.STUDY_CHROME ? [{ executablePath: process.env.STUDY_CHROME }] : [{ channel: 'chrome' }, { channel: 'msedge' }, { channel: 'chromium' }, {}]
  let last
  for (const t of tries) {
    try { return await chromium.launchPersistentContext(profile, { ...base, ...t }) } catch (e) { last = e }
  }
  console.error(`Couldn't open a browser window: ${last?.message?.split('\n')[0]}\nInstall Google Chrome (google.com/chrome) and run again.`)
  process.exit(EXIT.failed)
}

const loggedIn = async (ctx) => (await ctx.cookies(FB)).some((c) => c.name === 'c_user' && c.value)

async function ensureLogin(ctx, page) {
  if (await loggedIn(ctx)) return
  await page.goto(`${FB}/login/`, { waitUntil: 'domcontentloaded' }).catch(() => {})
  console.log('\nLog into Facebook in the Chrome window that just opened (any account that can see the page).')
  console.log('It carries on by itself once you\'re in, and remembers the login next time.')
  const until = Date.now() + 15 * 60 * 1000
  while (Date.now() < until) {
    await sleep(2000)
    if (await loggedIn(ctx)) { console.log('Logged in.'); await sleep(3000); return }
  }
  console.error('Not logged in after 15 minutes. Run again when you\'re ready.')
  process.exit(EXIT.login)
}

/** Open whatever was pasted (share links redirect to the page) and work out the page. */
async function resolve(page, input) {
  const direct = pageOf(input)
  if (direct) return direct
  const url = /^https?:/i.test(input) ? input : `https://${input}`
  await page.goto(url, { waitUntil: 'domcontentloaded' })
  await sleep(2500)
  return pageOf(page.url())
}

async function readProfile(page, info) {
  await page.goto(info.id ? `${FB}/profile.php?id=${info.id}` : `${FB}/${info.vanity}/`, { waitUntil: 'domcontentloaded' }).catch(() => {})
  await jitter(3, 5)
  const got = await page.evaluate(() => ({
    title: document.title,
    og: document.querySelector('meta[property="og:description"]')?.content ?? null,
    text: document.body?.innerText?.slice(0, 20000) ?? '',
  })).catch(() => ({ title: '', og: null, text: '' }))
  const name = got.title.replace(/^\(\d+\)\s*/, '').replace(/\s*\|\s*Facebook\s*$/i, '').trim() || info.name || null
  const both = `${got.og ?? ''}\n${got.text}`
  // og:description reads "Astriva. 9,433 followers · 16,881 talking about this. The stars have stories..."
  const bio = got.og ? got.og.replace(/^.*?talking about this\.?\s*/i, '').replace(/^[^.]*followers?[^.]*\.\s*/i, '').trim() || null : null
  return {
    site: 'facebook', username: info.handle, name, bio,
    category: null, link: info.id ? `${FB}/profile.php?id=${info.id}` : `${FB}/${info.vanity}`, links: [],
    followers: countOf(both, 'followers'), following: null, posts: null,
    verified: false, professional: true, private: false,
  }
}

export async function collect(page, tab, { limit, max = 400, pause = [1.5, 3.5], settle = [3, 5] } = {}) {
  await page.goto(tab, { waitUntil: 'domcontentloaded' }).catch(() => {})
  await jitter(...settle)
  if (/\/(checkpoint|login)\b/.test(page.url())) return { links: [], blocked: true }
  let links = [], still = 0
  for (let round = 0; round < max && still < 4; round++) {
    const hrefs = await page.$$eval('a[href]', (as) => as.map((a) => a.getAttribute('href'))).catch(() => [])
    const now = videoLinks([...links.map((l) => l.url), ...hrefs])
    still = now.length > links.length ? 0 : still + 1
    links = now
    if (Number.isFinite(limit) && links.length >= limit) break
    process.stdout.write(`\r  ${links.length} found so far…`)
    await page.mouse.wheel(0, 1800).catch(() => {})
    await jitter(...pause)
  }
  process.stdout.write('\n')
  return { links, blocked: false }
}

// ---------- Downloading ----------

async function download(links, dir, cookieFile, pageName) {
  const numbersFile = path.join(dir, '_numbers.json')
  const numbers = readJson(numbersFile, {})
  const todo = links.filter((l) => !(videoFileOf(dir, l.id) && existsSync(path.join(dir, `${videoFileOf(dir, l.id)}.json`))) && (numbers[l.id]?.failed ?? 0) < 2)
  console.log(`${links.length - todo.length} of ${links.length} already here. Downloading ${todo.length}.`)
  let streak = 0, ok = 0
  for (const [i, l] of todo.entries()) {
    const r = await run('yt-dlp', ytdlpVideoArgs(l, dir, cookieFile), { echo: false })
    if (r.code === 127) { console.error('yt-dlp is not installed (brew install yt-dlp).'); process.exit(EXIT.failed) }
    const info = readJson(path.join(dir, '_fb', `${l.id}.info.json`))
    const file = videoFileOf(dir, l.id)
    if (r.code === 0 && file && info) {
      writeJson(path.join(dir, `${file}.json`), metaOf(info, l, pageName))
      numbers[l.id] = fromYtdlp(info)
      ok++; streak = 0
      const n = numbers[l.id]
      console.log(`  [${i + 1}/${todo.length}] ${l.id}  ${n.duration ? `${Math.round(n.duration)}s · ` : ''}${n.views ?? '–'} views · ${n.likes ?? '–'} reactions · ${n.comments ?? '–'} comments`)
    } else {
      const why = whyFailed(r.err)
      numbers[l.id] = { failed: (numbers[l.id]?.failed ?? 0) + 1, at: new Date().toISOString() }
      streak++
      console.log(`  [${i + 1}/${todo.length}] ${l.id}  ✗ ${r.err.trim().split('\n').pop() || 'no video'}`)
      if (why !== 'failed' || streak >= STREAK) {
        writeJson(numbersFile, numbers)
        if (why === 'login') { console.error('Facebook wants a fresh login. Run again and log in in the window.'); process.exit(EXIT.login) }
        console.error(`Facebook probably wants a break. Saved ${ok}; run again later and it carries on.`)
        process.exit(EXIT.slowDown)
      }
    }
    writeJson(numbersFile, numbers)
    if (i < todo.length - 1) await jitter(4, 9)
  }
  return ok
}

async function main() {
  const argv = process.argv.slice(2)
  const input = argv.find((a, i) => !a.startsWith('--') && !(argv[i - 1] ?? '').match(/^--(limit|handle-file)$/))
  if (!input) { console.error('Usage: node src/facebook.mjs <facebook page link> [--limit N] [--links-only] [--handle-file path]'); process.exit(2) }
  const limit = flag(argv, 'limit') ? Number(flag(argv, 'limit')) : undefined

  // "fb-astriva" on its own: a page this Mac has studied before.
  let known = null
  if (/^fb-/.test(input)) known = readJson(path.join(mediaDir(input), '_source.json'))
  if (/^fb-/.test(input) && !known) { console.error(`Haven't studied ${input} on this Mac yet. Paste its Facebook link instead.`); process.exit(2) }

  const ctx = await openBrowser()
  const page = ctx.pages()[0] ?? await ctx.newPage()
  try {
    await ensureLogin(ctx, page)
    const info = known ?? await resolve(page, input)
    if (!info) { console.error(`"${input}" doesn't open a Facebook page. Paste the page's link (or a share link to it).`); process.exit(EXIT.failed) }
    const dir = ensureDir(mediaDir(info.handle))
    writeJson(path.join(dir, '_source.json'), info)
    if (flag(argv, 'handle-file')) writeFileSync(flag(argv, 'handle-file'), info.handle + '\n')

    const profile = await readProfile(page, info)
    writeJson(path.join(dir, '_profile.json'), { ...profile, fetchedAt: new Date().toISOString() })
    console.log(`${profile.name ?? info.handle}: ${profile.followers ?? '?'} followers. Saving as ${info.handle}.`)

    const seen = readJson(path.join(dir, '_links.json'), [])
    let links = [...seen]
    for (const tab of tabsOf(info)) {
      console.log(`Scrolling ${/reels/.test(tab) ? 'Reels' : 'Videos'}…`)
      const got = await collect(page, tab, { limit })
      if (got.blocked) { console.error('Facebook sent the window to a login or security check. Sort it out in the window, then run again.'); process.exit(EXIT.login) }
      links = videoLinks([...links.map((l) => l.url), ...got.links.map((l) => l.url)])
    }
    if (Number.isFinite(limit)) links = links.slice(0, limit)
    writeJson(path.join(dir, '_links.json'), videoLinks([...seen.map((l) => l.url), ...links.map((l) => l.url)]))
    console.log(`${links.length} reels and videos on the page.`)
    if (!links.length) { console.error('Found no reels or videos. Check the page in the window has a Reels or Videos tab.'); process.exit(EXIT.failed) }
    if (argv.includes('--links-only')) return

    const cookieFile = path.join(HOME, 'facebook-cookies.txt')
    writeFileSync(cookieFile, cookiesTxt(await ctx.cookies()))
    chmodSync(cookieFile, 0o600)
    await ctx.close().catch(() => {})   // the window's done; downloads need only its login
    const ok = await download(links, dir, cookieFile, profile.name)
    console.log(`Done: ${ok} downloaded this run. Next: npm run process -- ${info.handle}`)
  } finally {
    await ctx.close().catch(() => {})
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().then(() => process.exit(EXIT.ok), (e) => { console.error(e?.message ?? e); process.exit(EXIT.failed) })
}
