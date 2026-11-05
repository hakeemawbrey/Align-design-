// Download every post on an Instagram page, using your own logged-in browser.
//
//   node src/download.mjs tylerinthemaking --cookies-from-browser chrome
//   node src/download.mjs tylerinthemaking --cookies-from-browser chrome --limit 12   # try a few first
//   node src/download.mjs tylerinthemaking --reels-tab    # also reels that never went on the grid (one extra request each, slower)
//   node src/download.mjs tylerinthemaking --check        # only check that the login works
//
// Files land in media/<handle>/ as <shortcode>.<NN>.<ext> with a .json of
// details beside each. Already-downloaded posts are skipped (an archive
// file remembers them), so it's safe to stop and run again.
//
// Exit codes: 0 done · 75 Instagram asked us to slow down (run again later;
// the Mac button waits 30 minutes and does it for you) · 77 not logged in ·
// 1 anything else.
import { spawn } from 'node:child_process'
import { readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { ensureDir, flag, handlesFromArgs, mediaDir, writeJson } from './paths.mjs'

export const EXIT = { ok: 0, failed: 1, slowDown: 75, login: 77 }

function cookieArgs(o) {
  if (o.cookiesFromBrowser) return ['--cookies-from-browser', o.cookiesFromBrowser]
  if (o.cookies) return ['--cookies', o.cookies]
  return []
}

/** gallery-dl arguments for a whole profile. */
export function galleryArgs(handle, dir, o = {}) {
  // Slower than gallery-dl's own Instagram default (6-12s between requests).
  const sleep = o.sleep ?? 8
  const args = [
    '--sleep-request', `${sleep}-${sleep * 2}`, '--sleep', '0.5-1.5',
    '--download-archive', path.join(dir, '_archive.sqlite3'),
    '--write-metadata',
    '-D', dir, '-f', '{post_shortcode}.{num:>02}.{extension}',
    '-o', `include=${o.reelsTab ? 'posts,reels' : 'posts'}`,
  ]
  if (Number.isFinite(o.limit)) args.push('-o', `max-posts=${o.limit}`)
  if (o.cursor && !o.check) args.push('-o', `cursor=${o.cursor}`)
  if (o.check) args.push('--simulate', '-o', 'max-posts=1')
  args.push(...cookieArgs(o), `https://www.instagram.com/${handle}/`)
  return args
}

/** gallery-dl -j on /info/ prints [[2, {user}]]. Pull out the numbers worth keeping. */
export function parseProfile(stdout) {
  let data
  try { data = JSON.parse(stdout) } catch { return null }
  const user = (Array.isArray(data) ? data : []).map((m) => (Array.isArray(m) ? m[1] : null)).find((u) => u && u.username)
  if (!user) return null
  const count = (...keys) => keys.map((k) => k.split('.').reduce((o, p) => o?.[p], user)).find((n) => Number.isFinite(n)) ?? null
  return {
    username: user.username,
    name: user.full_name || null,
    bio: user.biography || null,
    category: user.category_name || user.category || null,
    link: user.external_url || null,
    links: (user.bio_links ?? []).map((l) => ({ title: l.title || null, url: l.url || l.lynx_url || null })).filter((l) => l.url),
    followers: count('follower_count', 'count_followed', 'edge_followed_by.count'),
    following: count('following_count', 'count_follow', 'edge_follow.count'),
    posts: count('media_count', 'count_media', 'edge_owner_to_timeline_media.count'),
    verified: Boolean(user.is_verified),
    professional: Boolean(user.is_professional_account || user.is_business_account),
    private: Boolean(user.is_private),
  }
}

/**
 * Why a gallery-dl run stopped, from its exit code and its error lines.
 * Only "[error]"/"[warning]" lines count: info lines ("Extracted 40 cookies…")
 * and file names (a shortcode can contain "404") would mislead.
 */
export function classify(code, stderr) {
  if (code === 0) return 'ok'
  const lines = String(stderr).split('\n').filter((l) => /\]\[(error|warning)\]|error:|exception/i.test(l))
  const s = lines.length ? lines.join('\n') : String(stderr).split('\n').filter((l) => !/\]\[(info|debug)\]/.test(l)).slice(-3).join('\n')
  if (/\b429\b|too many requests|wait a few minutes|rate.?limit|try again later/i.test(s)) return 'slowDown'
  if (/login page|login required|authrequired|not logged in|\b401\b|checkpoint|challenge page/i.test(s)) return 'login'
  if (/is private|private profile|private account/i.test(s)) return 'private'
  if (/user could not be found|notfounderror|user not found|no user|does not exist/i.test(s)) return 'missing'
  return 'failed'
}

/** gallery-dl says "Use '-o cursor=…' to continue" when it stops partway. */
export function cursorOf(stderr) {
  return [...String(stderr).matchAll(/-o cursor=([^'"\s]+)/g)].at(-1)?.[1] ?? null
}

export function countPosts(dir) {
  try {
    return new Set(readdirSync(dir).filter((f) => f.endsWith('.json') && !f.startsWith('_')).map((f) => f.split('.')[0])).size
  } catch { return 0 }
}

/** Run a program, echo its output live, and keep the end of stderr to read the reason. */
export function run(bin, args, { echo = true } = {}) {
  return new Promise((resolve) => {
    const p = spawn(bin, args, { stdio: ['ignore', 'pipe', 'pipe'] })
    let out = '', err = ''
    p.stdout.on('data', (d) => { out += d; if (echo) process.stdout.write(d) })
    p.stderr.on('data', (d) => { err = (err + d).slice(-8000); if (echo) process.stderr.write(d) })
    p.on('error', (e) => resolve({ code: 127, out, err: e.code === 'ENOENT' ? `${bin} is not installed` : e.message }))
    p.on('close', (code) => resolve({ code: code ?? 1, out, err }))
  })
}

function parseArgs(argv) {
  return {
    cookiesFromBrowser: flag(argv, 'cookies-from-browser'),
    cookies: flag(argv, 'cookies'),
    limit: flag(argv, 'limit') ? Number(flag(argv, 'limit')) : undefined,
    sleep: flag(argv, 'sleep') ? Number(flag(argv, 'sleep')) : undefined,
    reelsTab: argv.includes('--reels-tab'),
    check: argv.includes('--check'),
  }
}

const LOGIN_HELP = 'Instagram wants a login. Log into instagram.com in your browser, then run again with --cookies-from-browser chrome (or safari / firefox / brave / edge).'

async function main() {
  const argv = process.argv.slice(2)
  const [handle] = handlesFromArgs(argv, 'Usage: node src/download.mjs <instagram handle> [--cookies-from-browser chrome] [--limit N] [--reels-tab] [--check]')
  const o = parseArgs(argv)
  const dir = ensureDir(mediaDir(handle))

  if (o.check) {
    const r = await run('gallery-dl', ['--quiet', ...galleryArgs(handle, dir, o)], { echo: false })
    const why = classify(r.code, r.err)
    if (why === 'ok') { console.log(`Logged in, and @${handle} is readable.`); process.exit(EXIT.ok) }
    console.error(r.err.trim().split('\n').slice(-3).join('\n'))
    process.exit(why === 'slowDown' ? EXIT.slowDown : why === 'login' ? EXIT.login : EXIT.failed)
  }

  // The profile: followers, bio, links. Cheap, and worth having even if the posts stop partway.
  const info = await run('gallery-dl', ['-j', ...cookieArgs(o), `https://www.instagram.com/${handle}/info/`], { echo: false })
  const profile = parseProfile(info.out)
  if (profile) {
    writeJson(path.join(dir, '_profile.json'), { ...profile, fetchedAt: new Date().toISOString() })
    console.log(`@${profile.username}${profile.name ? ` (${profile.name})` : ''}: ${profile.followers ?? '?'} followers, ${profile.posts ?? '?'} posts.`)
    if (profile.private) console.log('This account is private: only works if you follow it from the logged-in browser.')
  }

  // Pick up the feed where the last stopped run left it, instead of paging from the top again.
  const cursorFile = path.join(dir, '_cursor.txt')
  try { o.cursor = readFileSync(cursorFile, 'utf8').trim() || null } catch {}
  if (o.cursor) console.log('Carrying on from where the last run stopped.')
  const before = countPosts(dir)
  console.log(`${before} posts already here. Downloading the rest (each line is a file; "#" means already had it).`)
  const r = await run('gallery-dl', galleryArgs(handle, dir, o))
  const after = countPosts(dir)
  const why = classify(r.code, r.err)
  console.log(`\n${after} posts on disk (${after - before} new this run).`)
  const cursor = cursorOf(r.err)
  if (why === 'ok') { rmSync(cursorFile, { force: true }); process.exit(EXIT.ok) }
  if (cursor) writeFileSync(cursorFile, cursor)
  if (r.code === 127) { console.error(`${r.err}. Install it: brew install gallery-dl (or pip install -U gallery-dl).`); process.exit(EXIT.failed) }
  if (why === 'login') { console.error(LOGIN_HELP); process.exit(EXIT.login) }
  if (why === 'private') { console.error(`@${handle} is private. Follow it from the logged-in account, or ask them for their posts.`); process.exit(EXIT.failed) }
  if (why === 'missing') { console.error(`Instagram says @${handle} doesn't exist. Check the spelling.`); process.exit(EXIT.failed) }
  if (why === 'slowDown') {
    console.error('Instagram asked us to slow down. Run again later and it picks up where it left off.')
    process.exit(EXIT.slowDown)
  }
  // Anything else (a file or two that wouldn't download, say) isn't worth waiting on.
  console.error(`gallery-dl finished with some errors (above). ${after ? 'Carrying on with what downloaded.' : ''}`)
  process.exit(after ? EXIT.ok : EXIT.failed)
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main()
