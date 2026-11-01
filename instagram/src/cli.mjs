// Post Align reels to one or more Instagram accounts as trial reels, then
// pull back how they did.
//   node src/cli.mjs accounts
//   node src/cli.mjs post leo --account main,backup
//   node src/cli.mjs post reels/out/05-leo.mp4 --caption "for the leos" --all
//   node src/cli.mjs stats
// See README.md for setup.

import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { accountsFromEnv, client, DEFAULT_VERSION } from './ig.mjs'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const REPO = path.resolve(ROOT, '..')
const LOG = path.join(ROOT, 'data', 'posts.json')
const STATS_CSV = path.join(ROOT, 'data', 'stats.csv')

/** Where each kind of reel keeps its scripts and its renders. */
const LIBRARIES = [
  { scripts: 'reels/scripts', out: 'reels/out' },
  { scripts: 'reels/town/scripts', out: 'reels/out/town' },
]

/**
 * A reel from a path or a name. A name matches a script id ("05-leo"), the
 * part after the number ("leo", "full-moon-taurus"), or a zodiac sign.
 */
export function resolveReel(arg, { repo = REPO } = {}) {
  const asPath = path.resolve(arg)
  if (existsSync(asPath) && asPath.endsWith('.mp4')) {
    // A render of a known script keeps that script's caption and hook.
    const id = path.basename(asPath, '.mp4').replace(/\.web$/, '')
    let known = null
    try { known = resolveReel(id, { repo }) } catch {}
    return { id, caption: null, hook: null, ...known, file: asPath }
  }
  const want = arg.toLowerCase().replace(/\.json$/, '')
  const hits = []
  for (const lib of LIBRARIES) {
    const dir = path.join(repo, lib.scripts)
    if (!existsSync(dir)) continue
    for (const f of readdirSync(dir).filter((f) => f.endsWith('.json'))) {
      const s = JSON.parse(readFileSync(path.join(dir, f), 'utf8'))
      const id = s.id ?? path.basename(f, '.json')
      const named = id === want || id.replace(/^\d+-/, '') === want
      const bySign = lib.scripts === 'reels/scripts' && s.sign === want
      if (named || bySign) hits.push({ s, id, out: path.join(repo, lib.out, `${id}.mp4`) })
    }
  }
  if (!hits.length) throw new Error(`No reel called "${arg}". Use a script id like 05-leo, or a path to an .mp4.`)
  if (hits.length > 1) throw new Error(`"${arg}" matches ${hits.map((h) => h.id).join(', ')}. Use the full id.`)
  const { s, id, out } = hits[0]
  const tags = (s.hashtags ?? []).map((t) => `#${t.replace(/^#/, '')}`).join(' ')
  return {
    id,
    file: out,
    caption: [s.caption, tags].filter(Boolean).join('\n\n'),
    hook: s.scenes?.[0]?.text ?? s.title ?? null,
  }
}

export function readLog(file = LOG) {
  return existsSync(file) ? JSON.parse(readFileSync(file, 'utf8')) : { posts: [] }
}

function writeLog(log, file = LOG) {
  mkdirSync(path.dirname(file), { recursive: true })
  writeFileSync(file, JSON.stringify(log, null, 2) + '\n')
}

/** The accounts a command should use: --account a,b, --all, or the only one. */
export function pickAccounts(all, { account, everyone }) {
  if (!all.length) throw new Error('No Instagram accounts found. Set IG_<NAME>_TOKEN for each one (see README.md).')
  if (everyone) return all
  if (!account) {
    if (all.length === 1) return all
    throw new Error(`${all.length} accounts are set up (${all.map((a) => a.name).join(', ')}). Pick with --account <name>[,<name>] or --all.`)
  }
  return account.split(',').map((n) => {
    const a = all.find((x) => x.name === n.trim().toLowerCase())
    if (!a) throw new Error(`No account called "${n}". Set up: ${all.map((x) => x.name).join(', ')}.`)
    return a
  })
}

function parseArgs(argv) {
  const flags = {}
  const rest = []
  const valued = new Set(['account', 'caption', 'url', 'trial', 'cover-ms', 'version'])
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (!a.startsWith('--')) { rest.push(a); continue }
    const key = a.slice(2)
    flags[key] = valued.has(key) ? argv[++i] : true
  }
  return { flags, rest }
}

const fmt = {
  n: (v) => (v == null ? '' : Number(v).toLocaleString('en-US')),
  secs: (ms) => (ms == null ? '' : `${(ms / 1000).toFixed(1)}s`),
  pct: (v) => (v == null ? '' : `${Number(v).toFixed(1)}%`),
}

/** Posts ranked best first: lowest skip rate, then longest average watch. */
export function rank(posts) {
  const skip = (p) => p.stats?.reels_skip_rate ?? Infinity
  const watch = (p) => p.stats?.ig_reels_avg_watch_time ?? 0
  return [...posts].sort((a, b) => skip(a) - skip(b) || watch(b) - watch(a))
}

export function toCsv(posts) {
  const cols = ['account', 'username', 'reel', 'trial', 'postedAt', 'permalink', 'hook', 'views', 'reach', 'avg_watch_s', 'skip_rate_pct', 'likes', 'comments', 'shares', 'saved', 'statsAt']
  const q = (v) => (v == null ? '' : /[",\n]/.test(String(v)) ? `"${String(v).replace(/"/g, '""')}"` : String(v))
  const rows = posts.map((p) => {
    const s = p.stats ?? {}
    return [p.account, p.username, p.reel, p.trial ?? 'off', p.postedAt, p.permalink, p.hook, s.views, s.reach,
      s.ig_reels_avg_watch_time == null ? null : (s.ig_reels_avg_watch_time / 1000).toFixed(1), s.reels_skip_rate, s.likes, s.comments, s.shares, s.saved, p.statsAt].map(q).join(',')
  })
  return [cols.join(','), ...rows].join('\n') + '\n'
}

async function cmdAccounts(accounts, opts) {
  for (const a of accounts) {
    const c = client(a, opts)
    try {
      const me = await c.whoami()
      const q = await c.quota().catch(() => null)
      const left = q?.left != null ? `, ${q.left} of ${q.total} posts left today` : ''
      console.log(`${a.name}: @${me.username} (${me.id}, ${a.login} login${left})`)
    } catch (e) {
      console.log(`${a.name}: ${e.message}`)
    }
  }
}

async function cmdPost(accounts, reelArgs, flags, opts) {
  if (!reelArgs.length) throw new Error('Name a reel: node src/cli.mjs post <reel|file.mp4> [more…] --account <name>')
  const trial = flags.public ? null : (flags.trial ?? 'manual')
  if (trial && !['manual', 'auto'].includes(trial)) throw new Error('--trial is manual or auto (or use --public for a normal reel).')
  const reels = reelArgs.map((r) => resolveReel(r))
  for (const r of reels) {
    if (flags.caption) r.caption = flags.caption
    if (!flags.url && !existsSync(r.file)) throw new Error(`${r.id}: no video at ${path.relative(REPO, r.file)}. Render it first (see reels/README.md), or pass --url.`)
  }
  if (flags.url && reels.length > 1) throw new Error('--url works with one reel at a time.')

  const log = readLog()
  let failed = 0
  for (const a of accounts) {
    const c = client(a, opts)
    let me
    try { me = await c.whoami() } catch (e) { console.error(`${a.name}: ${e.message}`); failed += reels.length; continue }
    for (const r of reels) {
      const label = `${r.id} → ${a.name} (@${me.username})${trial ? `, trial (${trial})` : ''}`
      if (!flags.again && log.posts.some((p) => p.account === a.name && p.reel === r.id)) { console.log(`${label}: already posted, skipping (use --again to post it twice)`); continue }
      if (flags['dry-run']) { console.log(`${label}: would post\n  ${(r.caption ?? '').replace(/\n/g, '\n  ')}`); continue }
      console.log(label)
      try {
        const q = await c.quota().catch(() => null)
        if (q?.left === 0) throw new Error(`no API posts left in the last 24 hours (${q.used} of ${q.total} used)`)
        const res = await c.postReel({
          file: flags.url ? null : r.file, videoUrl: flags.url ?? null, caption: r.caption ?? '', trial,
          shareToFeed: !flags['no-feed'], coverMs: flags['cover-ms'] != null ? Number(flags['cover-ms']) : undefined, log: console.log,
        })
        log.posts.push({ account: a.name, username: me.username, reel: r.id, hook: r.hook, caption: r.caption, trial, ...res, stats: null, statsAt: null })
        writeLog(log)
        console.log(`  posted ${res.permalink ?? res.mediaId}`)
      } catch (e) {
        failed++
        console.error(`  ${e.message}`)
      }
    }
  }
  if (trial && !flags['dry-run']) console.log('\nTrial reels go to non-followers first. Run `npm run stats` in a day or two to see how they did.')
  return failed
}

async function cmdStats(accounts, flags, opts) {
  const log = readLog()
  const names = new Set(accounts.map((a) => a.name))
  const mine = log.posts.filter((p) => names.has(p.account))
  if (!mine.length) { console.log('Nothing posted from these accounts yet.'); return 0 }
  let failed = 0
  for (const p of mine) {
    const c = client(accounts.find((a) => a.name === p.account), opts)
    try {
      p.stats = await c.insights(p.mediaId)
      p.statsAt = new Date().toISOString()
    } catch (e) {
      failed++
      console.error(`${p.reel} on ${p.account}: ${e.message}`)
    }
  }
  writeLog(log)
  writeFileSync(STATS_CSV, toCsv(rank(log.posts)))

  console.log('Best first (lowest 3-second skip rate, then longest average watch):\n')
  const rows = rank(mine).map((p) => [p.account, p.reel, fmt.n(p.stats?.views), fmt.secs(p.stats?.ig_reels_avg_watch_time), fmt.pct(p.stats?.reels_skip_rate), fmt.n(p.stats?.shares), fmt.n(p.stats?.saved)])
  const head = ['account', 'reel', 'views', 'avg watch', 'skip', 'shares', 'saves']
  const w = head.map((h, i) => Math.max(h.length, ...rows.map((r) => r[i].length)))
  for (const r of [head, ...rows]) console.log(r.map((v, i) => (i < 2 ? v.padEnd(w[i]) : v.padStart(w[i]))).join('  '))
  console.log(`\nWrote ${path.relative(REPO, STATS_CSV)}. Meta marks skip rate and views as estimates still in development.`)
  return failed
}

async function main() {
  const [cmd, ...argv] = process.argv.slice(2)
  const { flags, rest } = parseArgs(argv)
  const opts = { version: flags.version ?? process.env.IG_API_VERSION ?? DEFAULT_VERSION }
  try {
    const all = accountsFromEnv()
    let failed = 0
    if (cmd === 'accounts') await cmdAccounts(pickAccounts(all, { everyone: true }), opts)
    else if (cmd === 'post') failed = await cmdPost(pickAccounts(all, { account: flags.account, everyone: flags.all }), rest, flags, opts)
    else if (cmd === 'stats') failed = await cmdStats(pickAccounts(all, { account: flags.account, everyone: !flags.account }), flags, opts)
    else { console.error('Usage: node src/cli.mjs accounts | post <reel…> [--account a,b | --all] | stats [--account a]'); process.exit(1) }
    process.exit(failed ? 1 : 0)
  } catch (e) {
    console.error(e.message)
    process.exit(1)
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main()
