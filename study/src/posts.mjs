// What's on disk → one record per post.
//
// gallery-dl saves each file as <shortcode>.<NN>.<ext> next to a
// <shortcode>.<NN>.<ext>.json holding that post's details (caption, likes,
// date, pinned...). A carousel is several files with the same shortcode.
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import path from 'node:path'
import { mediaDir, readJson, workDir } from './paths.mjs'

const VIDEO = /\.(mp4|mov|webm|m4v)$/i
const IMAGE = /\.(jpe?g|png|webp|heic)$/i

/** gallery-dl writes dates as "2026-10-03 17:04:11" in UTC. */
export function isoDate(d) {
  if (!d) return null
  const s = String(d).trim()
  const t = Date.parse(/^\d{4}-\d\d-\d\d \d/.test(s) ? s.replace(' ', 'T') + 'Z' : s)
  return Number.isNaN(t) ? null : new Date(t).toISOString()
}

export function hashtagsOf(text) {
  return [...new Set((String(text ?? '').match(/#[\p{L}\p{N}_]+/gu) ?? []).map((t) => t.toLowerCase()))]
}

export function mentionsOf(text) {
  return [...new Set((String(text ?? '').match(/(?<![\w.])@[A-Za-z0-9._]{2,30}/g) ?? []).map((t) => t.toLowerCase().replace(/\.$/, '')))]
}

/**
 * Every post downloaded for one handle, newest first.
 * Each: { shortcode, url, type: reel | carousel | photo, date, pinned,
 *         caption, hashtags, mentions, coauthors, likes, files: [{ num, file, kind, width, height }] }
 */
export function readPosts(dir) {
  if (!existsSync(dir)) return []
  const byCode = new Map()
  for (const name of readdirSync(dir)) {
    if (!name.endsWith('.json') || name.startsWith('_') || name.startsWith('.')) continue
    const meta = readJson(path.join(dir, name))
    if (!meta || typeof meta !== 'object') continue
    const file = name.slice(0, -'.json'.length)
    const full = path.join(dir, file)
    if (!existsSync(full) || statSync(full).size === 0) continue
    const code = meta.post_shortcode ?? file.split('.')[0]
    const kind = VIDEO.test(file) ? 'video' : IMAGE.test(file) ? 'image' : null
    if (!code || !kind) continue
    let post = byCode.get(code)
    if (!post) {
      const caption = String(meta.description ?? '').trim()
      post = {
        shortcode: code,
        url: meta.post_url ?? `https://www.instagram.com/p/${code}/`,
        type: null,
        date: isoDate(meta.post_date ?? meta.date),
        pinned: Boolean(meta.pinned && (Array.isArray(meta.pinned) ? meta.pinned.length : true)),
        caption,
        ...(meta.title ? { title: String(meta.title) } : {}),   // YouTube videos have a title as well
        hashtags: hashtagsOf(caption),
        mentions: mentionsOf(caption),
        coauthors: (meta.coauthors ?? []).map((c) => c?.username).filter(Boolean),
        likes: Number.isFinite(meta.likes) && meta.likes > 0 ? meta.likes : null,
        location: meta.location_name || null,
        // gallery-dl's "count" also counts a reel's music, so only sidecar_shortcode marks a carousel.
        sidecar: Boolean(meta.sidecar_shortcode),
        files: [],
      }
      byCode.set(code, post)
    }
    post.files.push({ num: Number(meta.num) || post.files.length + 1, file, kind, width: meta.width || null, height: meta.height || null })
  }
  const posts = [...byCode.values()]
  for (const p of posts) {
    p.files.sort((a, b) => a.num - b.num)
    p.type = p.files.length > 1 || p.sidecar ? 'carousel' : p.files[0].kind === 'video' ? 'reel' : 'photo'
    delete p.sidecar
  }
  return posts.sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''))
}

/** Numbers from yt-dlp or Meta (views, comments, exact likes), worked-out media (transcript, on-screen text). */
export function loadPosts(handle) {
  const dir = mediaDir(handle)
  const numbers = readJson(path.join(dir, '_numbers.json'), {})
  return readPosts(dir).map((p) => mergeNumbers(p, numbers[p.shortcode]))
}

export function mergeNumbers(post, n) {
  if (!n) return { ...post, views: null, comments: null, duration: null, numbersFrom: null }
  return {
    ...post,
    views: n.views ?? null,
    likes: n.likes ?? post.likes,
    comments: n.comments ?? null,
    duration: n.duration ?? null,
    numbersFrom: n.from ?? null,
  }
}

export function loadWork(handle, shortcode) {
  return readJson(path.join(workDir(handle), `${shortcode}.json`))
}
