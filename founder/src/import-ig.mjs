// Pull a creator's Instagram posts through Meta's official API (Business
// Discovery), then hand them to the same scorer as everything else.
//   IG_ACCESS_TOKEN=… IG_USER_ID=… node src/import-ig.mjs hothighpriestess jettfranzen
//   node src/import-ig.mjs hothighpriestess --max 400 --reels
//
// Needs your own Instagram professional account (Business or Creator) linked
// to a Facebook Page, and a token from a Meta app with instagram_basic and
// pages_show_list (Facebook Login). IG_USER_ID is your Instagram account's
// numeric id. Business Discovery reads any other public Business or Creator
// account: captions, likes, comments, links, dates, and views where Meta
// returns them. Personal and age-gated accounts can't be read.
//
// Writes data/imports/ig-<handle>.json. Numbers come from Meta, so they count
// as exact. Run `npm run crunch` afterwards.

import { mkdirSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const BASE_FIELDS = ['id', 'caption', 'like_count', 'comments_count', 'media_type', 'media_product_type', 'permalink', 'timestamp']

/** One Business Discovery request for one page of media. */
function discoveryUrl({ version, userId, token, handle, after, limit, views }) {
  const fields = views ? [...BASE_FIELDS, 'view_count'] : BASE_FIELDS
  const media = `media${after ? `.after(${after})` : ''}.limit(${limit}){${fields.join(',')}}`
  const q = `business_discovery.username(${handle}){username,name,followers_count,media_count,${media}}`
  return `https://graph.facebook.com/${version}/${userId}?fields=${encodeURIComponent(q)}&access_token=${encodeURIComponent(token)}`
}

/** A Meta error as one readable line, never including the token. */
function metaError(body, status) {
  const e = body?.error
  return e ? `Meta said: ${e.message} (code ${e.code}${e.error_subcode ? `, subcode ${e.error_subcode}` : ''})` : `Meta answered HTTP ${status}`
}

/**
 * Every post Meta will give for one handle, newest first, up to `max`.
 * `fetch` is injectable so the tests don't touch the network.
 */
export async function fetchCreator(handle, { token, userId, version = 'v24.0', max = 1000, limit = 50, fetch = globalThis.fetch, log = () => {} }) {
  let views = true
  let after = null
  let account = null
  const posts = []
  while (posts.length < max) {
    const res = await fetch(discoveryUrl({ version, userId, token, handle, after, limit: Math.min(limit, max - posts.length), views }))
    const body = await res.json().catch(() => null)
    if (!res.ok || body?.error) {
      // Some API versions don't offer view_count on other accounts' media:
      // drop it once and carry on with likes and comments.
      if (views && /view_count/.test(body?.error?.message ?? '')) { views = false; log('  views aren\'t available here; continuing with likes and comments'); continue }
      throw new Error(`@${handle}: ${metaError(body, res.status)}`)
    }
    const bd = body.business_discovery
    if (!bd) throw new Error(`@${handle}: Meta returned no account. It may be personal, private or age-gated.`)
    account ??= { username: bd.username, name: bd.name, followers: bd.followers_count, mediaCount: bd.media_count }
    const page = bd.media?.data ?? []
    posts.push(...page)
    log(`  ${posts.length}${bd.media_count ? ` of ${bd.media_count}` : ''} posts`)
    after = bd.media?.paging?.cursors?.after
    if (!page.length || !after || !bd.media?.paging?.next) break
  }
  return { account, posts, views }
}

/** A Meta media object → an import row (see src/parse.mjs normalize). */
export function toRow(m, handle) {
  const caption = (m.caption ?? '').trim()
  const isReel = m.media_product_type === 'REELS'
  return {
    creator: handle,
    platform: 'instagram',
    url: m.permalink ?? null,
    date: m.timestamp ? m.timestamp.slice(0, 10) : null,
    hook: caption.split('\n').find((l) => l.trim())?.trim() ?? '',
    caption,
    format: isReel ? 'instagram reel' : m.media_type === 'CAROUSEL_ALBUM' ? 'carousel' : (m.media_type ?? '').toLowerCase().replace('_', ' '),
    views: m.view_count ?? '',
    likes: m.like_count ?? '',
    comments: m.comments_count ?? '',
  }
}

async function main() {
  const args = process.argv.slice(2)
  const handles = args.filter((a, i) => !a.startsWith('--') && args[i - 1] !== '--max').map((h) => h.replace(/^@/, ''))
  const max = args.includes('--max') ? Number(args[args.indexOf('--max') + 1]) : 1000
  const reelsOnly = args.includes('--reels')
  const token = process.env.IG_ACCESS_TOKEN
  const userId = process.env.IG_USER_ID
  if (!handles.length) { console.error('Usage: node src/import-ig.mjs <handle> [<handle>…] [--max N] [--reels]'); process.exit(1) }
  if (!token || !userId) {
    console.error('Set IG_ACCESS_TOKEN and IG_USER_ID first (see the top of this file, or "Instagram, officially" in README.md).')
    process.exit(1)
  }
  mkdirSync(path.join(ROOT, 'data', 'imports'), { recursive: true })
  let failed = 0
  for (const handle of handles) {
    console.log(`@${handle}`)
    try {
      const { account, posts, views } = await fetchCreator(handle, { token, userId, version: process.env.IG_API_VERSION, max, log: console.log })
      const rows = posts.map((m) => toRow(m, handle)).filter((r) => !reelsOnly || r.format === 'instagram reel')
      const out = path.join(ROOT, 'data', 'imports', `ig-${handle}.json`)
      writeFileSync(out, JSON.stringify({ account, fetchedAt: new Date().toISOString(), videos: rows }, null, 2) + '\n')
      console.log(`  wrote ${rows.length} ${reelsOnly ? 'reels' : 'posts'} to ${path.relative(ROOT, out)}${views ? '' : ' (no view counts)'}`)
    } catch (e) {
      failed++
      console.error(`  ${e.message}`)
    }
  }
  if (failed < handles.length) console.log('Now run: npm run crunch')
  process.exit(failed ? 1 : 0)
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main()
