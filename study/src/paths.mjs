// Where things live, and small helpers every step shares.
//   media/<handle>/  everything downloaded and worked out (big; never committed)
//   pack/<handle>/   what goes to Claude (small; sent to your private repo, never this public one)
import { existsSync, mkdirSync, readFileSync, writeFileSync, renameSync } from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
export const MEDIA = process.env.STUDY_MEDIA_DIR ? path.resolve(process.env.STUDY_MEDIA_DIR) : path.join(ROOT, 'media')
export const PACK = process.env.STUDY_PACK_DIR ? path.resolve(process.env.STUDY_PACK_DIR) : path.join(ROOT, 'pack')
/** Per-computer things: the OCR helper, whisper models, which browser you use. */
export const HOME = process.env.STUDY_HOME ? path.resolve(process.env.STUDY_HOME) : path.join(os.homedir(), '.align-study')

/** "@TylerInTheMaking", "instagram.com/tylerinthemaking?x=1" → "tylerinthemaking"; "fb-astriva" and "yt-greenbrorants" stay as they are. */
export function handleOf(s) {
  const raw = String(s ?? '').trim()
  // Facebook pages are saved as fb-<page> (src/facebook.mjs works the name out from the link),
  // YouTube channels as yt-<handle> (src/youtube.mjs).
  if (/^fb-[a-z0-9.-]{1,44}$/.test(raw)) return raw
  if (/^yt-[a-z0-9._-]{1,44}$/.test(raw)) return raw
  const fromUrl = raw.match(/instagram\.com\/([A-Za-z0-9._]+)/)?.[1]
  const h = (fromUrl ?? raw).replace(/^@/, '').replace(/[/?#].*$/, '').toLowerCase()
  if (!/^[a-z0-9._]{1,30}$/.test(h) || ['p', 'reel', 'reels', 'stories', 'explore'].includes(h)) return null
  return h
}

export function ensureDir(d) { mkdirSync(d, { recursive: true }); return d }

export function readJson(file, fallback = null) {
  try { return JSON.parse(readFileSync(file, 'utf8')) } catch { return fallback }
}

/** Write through a temp file so a Ctrl+C never leaves half a JSON file behind. */
export function writeJson(file, data) {
  ensureDir(path.dirname(file))
  writeFileSync(file + '.tmp', JSON.stringify(data, null, 1) + '\n')
  renameSync(file + '.tmp', file)
}

export const mediaDir = (handle) => path.join(MEDIA, handle)
export const workDir = (handle) => path.join(MEDIA, handle, '_work')
export const packDir = (handle) => path.join(PACK, handle)

/** The handle(s) on the command line, or a friendly exit. */
export function handlesFromArgs(argv, usage) {
  const handles = argv.filter((a, i) => !a.startsWith('--') && !(argv[i - 1] ?? '').match(/^--(limit|sleep|cookies|cookies-from-browser|via|model|tz|handle-file)$/)).map(handleOf)
  if (!handles.length || handles.some((h) => !h)) { console.error(usage); process.exit(2) }
  return handles
}

export function flag(argv, name, fallback = null) {
  const i = argv.indexOf(`--${name}`)
  return i >= 0 ? (argv[i + 1] ?? fallback) : fallback
}

export const exists = existsSync
export const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
