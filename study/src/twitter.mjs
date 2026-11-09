// Download every video and photo an X (Twitter) account has posted, using your own logged-in browser.
//
//   node src/twitter.mjs https://x.com/someone --cookies-from-browser chrome
//   node src/twitter.mjs @someone --cookies-from-browser chrome --limit 40   # try a few first
//   node src/twitter.mjs x-someone --check --cookies-from-browser chrome     # only check the login works
//
// gallery-dl reads the account's Media tab (its own posts with a video or
// photo, no reposts), a few seconds between requests, and saves each file with
// its details. Then each post is reshaped like the Instagram downloads
// (<id>.<NN>.<ext> plus a .json beside it) with views, likes, reposts and replies
// in _numbers.json, so `npm run process` and `npm run report` work unchanged.
// Already-downloaded posts are skipped (an archive file remembers them).
//
// Exit codes: 0 done · 75 X wants a break · 77 not logged in · 1 anything else.
import { readdirSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { EXIT, classify, run } from './download.mjs'
import { ensureDir, flag, mediaDir, readJson, writeJson } from './paths.mjs'

const RESERVED = ['home', 'i', 'search', 'explore', 'notifications', 'messages', 'settings', 'login', 'signup', 'intent', 'share', 'hashtag', 'compose', 'tos', 'privacy']

/** "@Someone", "x.com/someone/media", "twitter.com/someone/status/123" → { handle: 'x-someone', user: 'someone', status }. */
export function accountOf(s) {
  const raw = String(s ?? '').trim()
  if (/^x-[a-z0-9_]{1,15}$/.test(raw)) return { handle: raw, user: raw.slice(2), status: null }
  if (/^@[A-Za-z0-9_]{1,15}$/.test(raw)) return { handle: `x-${raw.slice(1).toLowerCase()}`, user: raw.slice(1), status: null }
  let u
  try { u = new URL(/^https?:/i.test(raw) ? raw : `https://${raw}`) } catch { return null }
  if (!/(^|\.)(x|twitter)\.com$/i.test(u.hostname)) return null
  const [user, kind, id] = u.pathname.split('/').filter(Boolean)
  if (!user || !/^[A-Za-z0-9_]{1,15}$/.test(user) || RESERVED.includes(user.toLowerCase())) return null
  return { handle: `x-${user.toLowerCase()}`, user, status: kind === 'status' && /^\d+$/.test(id ?? '') ? id : null }
}

export function galleryArgs(user, dir, o = {}) {
  const sleep = o.sleep ?? 4
  const args = [
    '--sleep-request', `${sleep}-${sleep * 2}`, '--sleep', '0.5-1.5',
    '--download-archive', path.join(dir, '_archive.sqlite3'),
    '--write-metadata', '-D', dir, '-f', '{tweet_id}.{num:>02}.{extension}',
    '-o', 'retweets=false', '-o', 'videos=true', '-o', 'text-tweets=false',
  ]
  if (Number.isFinite(o.limit)) args.push('-o', `max-posts=${o.limit}`)  // gallery-dl ≥1.30 understands max-posts for every site
  if (o.check) args.push('--simulate', '-o', 'max-posts=1')
  if (o.cookiesFromBrowser) args.push('--cookies-from-browser', o.cookiesFromBrowser)
  if (o.cookies) args.push('--cookies', o.cookies)
  return [...args, `https://x.com/${user}/media`]
}

const int = (n) => (Number.isFinite(n) && n >= 0 ? Math.round(n) : null)

/** gallery-dl's details for one X file → the details file posts.mjs reads (the keys gallery-dl writes for Instagram). */
export function metaOf(m, user) {
  const id = String(m.tweet_id)
  const text = String(m.content ?? '').replace(/\s*https:\/\/t\.co\/\w+\s*$/, '').trim()
  return {
    category: 'twitter', subcategory: m.extension && /mp4|mov|webm|m4v/i.test(m.extension) ? 'video' : 'photo',
    post_shortcode: id, post_url: `https://x.com/${m.author?.name ?? user}/status/${id}`,
    description: text, date: m.date ?? null, likes: int(m.favorite_count),
    width: m.width ?? null, height: m.height ?? null, num: Number(m.num) || 1,
    uploader: m.author?.name ?? user,
  }
}

export function numbersOf(m) {
  return { views: int(m.view_count), likes: int(m.favorite_count), comments: int(m.reply_count), reposts: int(m.retweet_count), quotes: int(m.quote_count), bookmarks: int(m.bookmark_count), duration: Number.isFinite(m.duration) ? m.duration : null, from: 'gallery-dl' }
}

/** The account itself, from the "user" block gallery-dl puts on every post. */
export function profileOf(m, handle) {
  const u = m?.user ?? m?.author ?? {}
  return {
    site: 'twitter', username: handle, name: u.nick ?? null, bio: u.description ?? null, category: null,
    link: `https://x.com/${u.name ?? handle.slice(2)}`, links: u.url ? [{ title: null, url: u.url }] : [],
    followers: int(u.followers_count), following: int(u.friends_count), posts: int(u.statuses_count ?? u.media_count),
    verified: Boolean(u.verified), professional: true, private: Boolean(u.protected),
  }
}

/**
 * gallery-dl writes <id>.<NN>.<ext> with a .json of X's details beside it. Reshape each
 * new .json in place (the keys posts.mjs reads) and move the numbers into _numbers.json.
 * Already-reshaped files are left alone, so this is safe to run again. Returns how many posts there are.
 */
export function settle(dir, handle, user) {
  const numbers = readJson(path.join(dir, '_numbers.json'), {})
  let profile = null
  const ids = new Set()
  let names = []
  try { names = readdirSync(dir) } catch { return 0 }
  for (const name of names) {
    if (!name.endsWith('.json') || name.startsWith('_')) continue
    const m = readJson(path.join(dir, name))
    if (!m || !names.includes(name.slice(0, -'.json'.length))) continue
    if (m.category === 'twitter' && m.post_shortcode) { ids.add(m.post_shortcode); continue }
    if (!m.tweet_id) continue
    const id = String(m.tweet_id)
    writeJson(path.join(dir, name), metaOf(m, user))
    numbers[id] = { ...numbers[id], ...numbersOf(m) }
    ids.add(id)
    profile = profileOf(m, handle)
  }
  writeJson(path.join(dir, '_numbers.json'), numbers)
  if (profile) writeJson(path.join(dir, '_profile.json'), { ...profile, fetchedAt: new Date().toISOString() })
  return ids.size
}

async function main() {
  const argv = process.argv.slice(2)
  const input = argv.find((a, i) => !a.startsWith('--') && !(argv[i - 1] ?? '').match(/^--(limit|sleep|cookies|cookies-from-browser|handle-file)$/))
  const acct = accountOf(input)
  if (!acct) { console.error('Usage: node src/twitter.mjs <x.com link or @handle> [--cookies-from-browser chrome] [--limit N] [--check]'); process.exit(2) }
  const o = { cookiesFromBrowser: flag(argv, 'cookies-from-browser'), cookies: flag(argv, 'cookies'), limit: flag(argv, 'limit') ? Number(flag(argv, 'limit')) : undefined, sleep: flag(argv, 'sleep') ? Number(flag(argv, 'sleep')) : undefined, check: argv.includes('--check') }
  const dir = ensureDir(mediaDir(acct.handle))
  if (flag(argv, 'handle-file')) writeFileSync(flag(argv, 'handle-file'), acct.handle + '\n')
  console.log(`${o.check ? 'Checking the login for' : 'Downloading the Media tab of'} @${acct.user}. Saving as ${acct.handle}.`)
  const r = await run('gallery-dl', galleryArgs(acct.user, dir, o), { echo: !o.check })
  if (r.code === 127) { console.error('gallery-dl is not installed (brew install gallery-dl).'); process.exit(EXIT.failed) }
  const why = classify(r.code, r.err)
  const authRequired = /AuthRequired|authenticated cookies needed|login/i.test(r.err)
  const n = o.check ? 0 : settle(dir, acct.handle, acct.user)
  if (authRequired) { console.error('X wants a login. Log into x.com in your browser, then run again.'); process.exit(EXIT.login) }
  if (why === 'slowDown') { console.error(`X wants a break. Saved ${n} posts; run again later and it carries on.`); process.exit(EXIT.slowDown) }
  if (why !== 'ok' && !n) { console.error(r.err.trim().split('\n').slice(-3).join('\n') || 'gallery-dl stopped.'); process.exit(EXIT.failed) }
  if (o.check) { console.log('Logged in.'); return }
  console.log(`Done: ${n} posts with video or photos. Next: npm run process -- ${acct.handle}`)
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().then(() => process.exit(EXIT.ok), (e) => { console.error(e?.message ?? e); process.exit(EXIT.failed) })
}
