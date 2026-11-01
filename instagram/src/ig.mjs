// Instagram's official Graph API: accounts from the environment, trial-reel
// publishing, and Reels insights. No dependencies; `fetch` is injectable so
// the tests never touch the network.

import { readFileSync, statSync } from 'node:fs'

export const DEFAULT_VERSION = 'v24.0'

/** What `stats` asks Meta for on every reel. Unsupported ones are dropped. */
export const REEL_METRICS = [
  'views', 'reach', 'likes', 'comments', 'shares', 'saved', 'total_interactions',
  'ig_reels_avg_watch_time', 'ig_reels_video_view_total_time', 'reels_skip_rate',
]

const HOSTS = {
  facebook: { graph: 'https://graph.facebook.com', rupload: 'https://rupload.facebook.com' },
  instagram: { graph: 'https://graph.instagram.com', rupload: 'https://rupload.facebook.com' },
}

/**
 * Every account configured in the environment. One account per name:
 *   IG_<NAME>_TOKEN     required: a long-lived access token
 *   IG_<NAME>_USER_ID   optional: the Instagram account's numeric id (looked up if missing)
 *   IG_<NAME>_LOGIN     optional: facebook | instagram (guessed from the token if missing)
 * The older single-account IG_ACCESS_TOKEN / IG_USER_ID pair becomes "default".
 */
export function accountsFromEnv(env = process.env) {
  const out = new Map()
  for (const [key, value] of Object.entries(env)) {
    const m = /^IG_([A-Z0-9_]+)_TOKEN$/.exec(key)
    if (!m || !value || m[1] === 'ACCESS') continue // IG_ACCESS_TOKEN is the legacy pair below
    const NAME = m[1]
    out.set(NAME.toLowerCase(), {
      name: NAME.toLowerCase(),
      token: value.trim(),
      userId: env[`IG_${NAME}_USER_ID`]?.trim() || null,
      login: loginFor(value, env[`IG_${NAME}_LOGIN`]),
    })
  }
  if (env.IG_ACCESS_TOKEN && !out.has('default')) {
    out.set('default', { name: 'default', token: env.IG_ACCESS_TOKEN.trim(), userId: env.IG_USER_ID?.trim() || null, login: loginFor(env.IG_ACCESS_TOKEN, env.IG_LOGIN) })
  }
  return [...out.values()].sort((a, b) => a.name.localeCompare(b.name))
}

/** Instagram Login tokens start with "IG"; Facebook Login tokens with "EAA". */
function loginFor(token, explicit) {
  const e = (explicit ?? '').trim().toLowerCase()
  if (e === 'facebook' || e === 'instagram') return e
  return /^IG/.test(token.trim()) ? 'instagram' : 'facebook'
}

/** A Meta error as one readable line, never including the token. */
export function metaError(body, status) {
  const e = body?.error
  return e ? `Meta said: ${e.message} (code ${e.code}${e.error_subcode ? `, subcode ${e.error_subcode}` : ''})` : `Meta answered HTTP ${status}`
}

export class MetaError extends Error {
  constructor(body, status) { super(metaError(body, status)); this.body = body; this.status = status }
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

/** A client for one account. */
export function client(account, { version = DEFAULT_VERSION, fetch = globalThis.fetch, wait = sleep } = {}) {
  const host = HOSTS[account.login] ?? HOSTS.facebook
  const base = `${host.graph}/${version}`

  async function call(method, path, params = {}) {
    const qs = new URLSearchParams({ ...params, access_token: account.token })
    const url = method === 'GET' ? `${base}/${path}?${qs}` : `${base}/${path}`
    const res = await fetch(url, method === 'GET' ? { method } : { method, headers: { 'content-type': 'application/x-www-form-urlencoded' }, body: qs.toString() })
    const body = await res.json().catch(() => null)
    if (!res.ok || body?.error) throw new MetaError(body, res.status)
    return body
  }

  /** The account's numeric id and handle, looking the id up if it wasn't given. */
  async function whoami() {
    if (account.login === 'instagram') {
      const me = await call('GET', account.userId ?? 'me', { fields: 'user_id,username' })
      account.userId ??= String(me.user_id ?? me.id)
      return { id: account.userId, username: me.username }
    }
    if (!account.userId) {
      const pages = await call('GET', 'me/accounts', { fields: 'instagram_business_account{id,username}' })
      const linked = (pages.data ?? []).map((p) => p.instagram_business_account).filter(Boolean)
      if (!linked.length) throw new Error('This token sees no Facebook Page with a linked Instagram professional account.')
      if (linked.length > 1) throw new Error(`This token sees ${linked.length} Instagram accounts (${linked.map((a) => '@' + a.username).join(', ')}). Set IG_${account.name.toUpperCase()}_USER_ID to pick one.`)
      account.userId = linked[0].id
    }
    const me = await call('GET', account.userId, { fields: 'username' })
    return { id: account.userId, username: me.username }
  }

  /** How many API posts are left in the rolling 24 hours, when Meta says. */
  async function quota() {
    const { id } = await whoami()
    const r = await call('GET', `${id}/content_publishing_limit`, { fields: 'config,quota_usage' })
    const row = r.data?.[0] ?? {}
    const total = row.config?.quota_total ?? null
    return { used: row.quota_usage ?? null, total, left: total == null || row.quota_usage == null ? null : total - row.quota_usage }
  }

  /**
   * Post one reel. Give `file` (a local .mp4, uploaded directly; Facebook
   * Login only) or `videoUrl` (a public link Meta downloads).
   * `trial`: 'manual' | 'auto' | null. Manual trials are shared to followers
   * from the app; auto trials are shared by Meta if they do well.
   */
  async function postReel({ file, videoUrl, caption = '', trial = 'manual', shareToFeed = true, coverMs, pollMs = 15000, timeoutMs = 10 * 60000, log = () => {} }) {
    if (!file && !videoUrl) throw new Error('Give a video file or a public video URL.')
    if (file && account.login === 'instagram') throw new Error('Instagram Login accounts can\'t upload a local file. Host the .mp4 somewhere public and pass --url, or use a Facebook Login token.')
    const { id: igId } = await whoami()
    const params = { media_type: 'REELS', caption, share_to_feed: String(shareToFeed) }
    if (trial) params.trial_params = JSON.stringify({ graduation_strategy: trial === 'auto' ? 'SS_PERFORMANCE' : 'MANUAL' })
    if (coverMs != null) params.thumb_offset = String(coverMs)
    if (file) params.upload_type = 'resumable'
    else params.video_url = videoUrl

    const container = await call('POST', `${igId}/media`, params)
    log(`  container ${container.id}`)

    if (file) {
      const size = statSync(file).size
      log(`  uploading ${(size / 1e6).toFixed(1)} MB`)
      const res = await fetch(`${host.rupload}/ig-api-upload/${version}/${container.id}`, {
        method: 'POST',
        headers: { Authorization: `OAuth ${account.token}`, offset: '0', file_size: String(size), 'content-type': 'application/octet-stream' },
        body: readFileSync(file),
      })
      const body = await res.json().catch(() => null)
      if (!res.ok || body?.error || body?.success === false) throw new MetaError(body, res.status)
    }

    const started = Date.now()
    for (;;) {
      const s = await call('GET', container.id, { fields: 'status_code,status' })
      if (s.status_code === 'FINISHED') break
      if (s.status_code === 'ERROR' || s.status_code === 'EXPIRED') throw new Error(`Meta couldn't process the video (${s.status_code}${s.status ? `: ${s.status}` : ''}).`)
      if (Date.now() - started > timeoutMs) throw new Error(`Meta was still processing the video after ${Math.round(timeoutMs / 60000)} min (container ${container.id}). Nothing was posted; try again.`)
      log(`  processing (${s.status_code ?? 'waiting'})`)
      await wait(pollMs)
    }

    const published = await call('POST', `${igId}/media_publish`, { creation_id: container.id })
    const media = await call('GET', published.id, { fields: 'permalink,shortcode,timestamp' }).catch(() => ({}))
    return { mediaId: published.id, containerId: container.id, permalink: media.permalink ?? null, postedAt: media.timestamp ?? new Date().toISOString() }
  }

  /**
   * Insights for one reel. Meta rejects the whole request when one metric
   * isn't available (new metrics roll out unevenly), so on failure each
   * metric is asked for on its own and the ones that work are kept.
   */
  async function insights(mediaId, metrics = REEL_METRICS) {
    const read = (r) => Object.fromEntries((r.data ?? []).map((d) => [d.name, d.values?.[0]?.value ?? d.total_value?.value ?? null]))
    try {
      return read(await call('GET', `${mediaId}/insights`, { metric: metrics.join(',') }))
    } catch (e) {
      if (!(e instanceof MetaError) || metrics.length === 1) throw e
      const out = {}
      let firstError = e
      for (const m of metrics) {
        try { Object.assign(out, read(await call('GET', `${mediaId}/insights`, { metric: m }))) } catch (err) { firstError = err }
      }
      if (!Object.keys(out).length) throw firstError
      return out
    }
  }

  return { account, call, whoami, quota, postReel, insights }
}
