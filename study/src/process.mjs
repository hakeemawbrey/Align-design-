// Work out what's in every downloaded post, on your own computer:
//   frames   six stills per reel, weighted to the first seconds (the hook)
//   sheet    those stills (or a carousel's slides) on one small image
//   text     the words on screen in each still or slide (macOS text recognition)
//   speech   what's said, with timings (whisper.cpp, offline)
//
//   node src/process.mjs tylerinthemaking
//   node src/process.mjs tylerinthemaking --model base.en     # smaller, faster speech model
//   node src/process.mjs tylerinthemaking --no-ocr --no-transcripts
//
// Needs ffmpeg. Speech needs whisper.cpp (brew install whisper-cpp); the
// model downloads itself the first time (~470 MB for small.en). On-screen
// text needs a Mac (it compiles src/ocr.swift once). Whatever's missing is
// skipped and filled in on a later run. Results: media/<handle>/_work/.
import { createWriteStream, existsSync, readdirSync, renameSync, rmSync, statSync } from 'node:fs'
import { Readable } from 'node:stream'
import { pipeline } from 'node:stream/promises'
import { spawnSync } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { run } from './download.mjs'
import { HOME, ROOT, ensureDir, flag, handlesFromArgs, mediaDir, readJson, workDir, writeJson } from './paths.mjs'
import { readPosts } from './posts.mjs'

export const VERSION = 1
const FRAME_W = 720

/** Seconds to grab a still at: three in the hook, three across the rest. */
export function frameTimes(duration) {
  const d = Number(duration)
  if (!Number.isFinite(d) || d <= 0) return [0]
  const wanted = [0.2, 1.2, 2.5, d * 0.4, d * 0.65, d * 0.9].map((t) => Math.min(t, Math.max(0, d - 0.1)))
  const out = []
  for (const t of wanted.sort((a, b) => a - b)) if (!out.length || t - out.at(-1) >= 0.6) out.push(Math.round(t * 10) / 10)
  return out
}

/** whisper.cpp's -oj output → { text, segments, words, speech }. Drops [Music], (laughs), ♪ and the like. */
export function cleanTranscript(json) {
  return transcriptFrom((json?.transcription ?? []).map((s) => ({ from: (s.offsets?.from ?? 0) / 1000, to: (s.offsets?.to ?? 0) / 1000, text: s.text })))
}

/** [{ from, to (seconds), text }] from any source (whisper, YouTube's captions) → { text, segments, words, speech }. */
export function transcriptFrom(raw) {
  const segs = (raw ?? []).map((s) => ({
    from: Math.round((Number(s.from) || 0) * 10) / 10,
    to: Math.round((Number(s.to) || 0) * 10) / 10,
    text: String(s.text ?? '').replace(/\[[^\]]*\]|\([^)]*\)|\*[^*]*\*|♪+/g, ' ').replace(/\s+/g, ' ').trim(),
  })).filter((s) => s.text && /[\p{L}\p{N}]/u.test(s.text))
  const text = segs.map((s) => s.text).join(' ').replace(/\s+/g, ' ').trim()
  const words = text ? text.split(/\s+/).length : 0
  return { text, segments: segs, words, speech: words >= 4 }
}

/** OCR helper output (one JSON object per line) → lines per file, in the order given. */
export function parseOcr(stdout, files) {
  const byFile = new Map()
  for (const line of String(stdout).split('\n')) {
    try { const o = JSON.parse(line); if (o?.file) byFile.set(o.file, (o.lines ?? []).map((l) => String(l).trim()).filter(Boolean)) } catch {}
  }
  return files.map((f) => byFile.get(f) ?? [])
}

/** Lines that show up across stills (a caption that stays on screen) only once, in first-seen order. */
export function uniqueLines(perFrame) {
  const seen = new Set(), out = []
  for (const lines of perFrame ?? []) for (const l of lines) {
    const k = l.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim()
    if (k && !seen.has(k)) { seen.add(k); out.push(l) }
  }
  return out
}

export function sheetLayout(type, n) {
  if (type === 'reel') return { cols: Math.min(3, n), w: 240 }
  if (type === 'photo') return { cols: 1, w: 540 }
  return { cols: Math.min(5, n), w: 360 }
}

const has = (bin, arg = '-version') => spawnSync(bin, [arg], { stdio: 'ignore' }).status === 0

export function tools({ ocr = true, transcripts = true, model = 'small.en' } = {}) {
  const whisper = transcripts ? ['whisper-cli', 'whisper-cpp'].find((b) => has(b, '--help')) ?? null : null
  return {
    ffmpeg: has('ffmpeg') && has('ffprobe'),
    whisper,
    model: whisper ? path.join(HOME, 'models', `ggml-${model}.bin`) : null,
    modelName: model,
    ocr: ocr && process.platform === 'darwin' ? ocrHelper() : null,
  }
}

/** Compile src/ocr.swift once into ~/.align-study/bin (macOS only). */
function ocrHelper() {
  const src = path.join(ROOT, 'src', 'ocr.swift')
  const bin = path.join(HOME, 'bin', 'align-ocr')
  if (existsSync(bin) && statSync(bin).mtimeMs >= statSync(src).mtimeMs) return bin
  if (!has('swiftc', '--version')) return null
  ensureDir(path.dirname(bin))
  console.log('Building the on-screen text reader (once)...')
  const r = spawnSync('swiftc', ['-O', src, '-o', bin], { encoding: 'utf8' })
  if (r.status !== 0) { console.log(`  couldn't build it, so on-screen text is skipped:\n  ${(r.stderr || '').trim().split('\n').slice(0, 3).join('\n  ')}`); return null }
  return bin
}

export async function ensureModel(file, name, fetch = globalThis.fetch) {
  if (existsSync(file) && statSync(file).size > 1e6) return true
  const url = `https://huggingface.co/ggerganov/whisper.cpp/resolve/main/ggml-${name}.bin`
  console.log(`Downloading the speech model ${name} (once; a few hundred MB)...`)
  try {
    const res = await fetch(url)
    if (!res.ok || !res.body) throw new Error(`HTTP ${res.status}`)
    ensureDir(path.dirname(file))
    await pipeline(Readable.fromWeb(res.body), createWriteStream(file + '.part'))
    renameSync(file + '.part', file)
    return true
  } catch (e) {
    console.log(`  couldn't download it (${e.message}); transcripts are skipped this run.`)
    return false
  }
}

export async function probe(file) {
  const r = await run('ffprobe', ['-v', 'error', '-show_entries', 'format=duration:stream=codec_type,width,height', '-of', 'json', file], { echo: false })
  const j = (() => { try { return JSON.parse(r.out) } catch { return {} } })()
  const v = (j.streams ?? []).find((s) => s.codec_type === 'video')
  return {
    duration: Number(j.format?.duration) || null,
    hasAudio: (j.streams ?? []).some((s) => s.codec_type === 'audio'),
    width: v?.width ?? null, height: v?.height ?? null,
  }
}

const ff = (args) => run('ffmpeg', ['-v', 'error', '-y', ...args], { echo: false })

async function still(input, t, out) {
  const r = await ff([...(t != null ? ['-ss', String(t)] : []), '-i', input, '-frames:v', '1', '-vf', `scale='min(${FRAME_W},iw)':-2`, '-q:v', '3', out])
  return r.code === 0 && existsSync(out)
}

/**
 * Stills named 01.jpg, 02.jpg… in `dir` → one tiled sheet. Each still is
 * fitted into the same w×h cell first: if sizes change mid-sequence, ffmpeg
 * rebuilds its filters and the tile loses the cells before the change.
 */
export async function makeSheet(dir, n, out, { cols, w }) {
  const first = await probe(path.join(dir, '01.jpg'))
  const h = Math.round((w * (first.height || 16)) / (first.width || 9) / 2) * 2
  const cells = ensureDir(path.join(dir, '_cells'))
  for (let i = 1; i <= n; i++) {
    const name = `${String(i).padStart(2, '0')}.jpg`
    await ff(['-i', path.join(dir, name), '-vf', `scale=${w}:${h}:force_original_aspect_ratio=decrease,pad=${w}:${h}:(ow-iw)/2:(oh-ih)/2:color=white`, '-q:v', '3', path.join(cells, name)])
  }
  const rows = Math.ceil(n / cols)
  const r = await ff(['-start_number', '1', '-i', path.join(cells, '%02d.jpg'), '-vf', `tile=${cols}x${rows}:padding=6:margin=6:color=white`, '-frames:v', '1', '-q:v', '5', out])
  rmSync(cells, { recursive: true, force: true })
  return r.code === 0 && existsSync(out)
}

async function transcribe(video, base, t) {
  const wav = base + '.wav'
  const a = await ff(['-i', video, '-vn', '-ac', '1', '-ar', '16000', '-c:a', 'pcm_s16le', '-t', '600', wav])
  if (a.code !== 0) return null
  const lang = t.modelName.endsWith('.en') ? 'en' : 'auto'
  const r = await run(t.whisper, ['-m', t.model, '-f', wav, '-l', lang, '-oj', '-of', base, '-np'], { echo: false })
  rmSync(wav, { force: true })
  const json = readJson(base + '.json')
  rmSync(base + '.json', { force: true })
  if (r.code !== 0 || !json) return null
  return { ...cleanTranscript(json), model: t.modelName }
}

/** One post → its work record, reusing whatever an earlier run already made. */
export async function processPost(post, mdir, wdir, t) {
  const file = path.join(wdir, `${post.shortcode}.json`)
  const prev = readJson(file)
  const w = prev?.v === VERSION ? prev : { v: VERSION, type: post.type }
  const fdir = path.join(wdir, post.shortcode)
  const did = []

  if (!w.frames || !existsSync(fdir)) {
    rmSync(fdir, { recursive: true, force: true })   // no leftovers in the 01.jpg… sequence
    ensureDir(fdir)
    delete w.onScreen
    const frames = []
    if (post.type === 'reel') {
      const video = path.join(mdir, post.files[0].file)
      const p = await probe(video)
      Object.assign(w, { duration: p.duration, hasAudio: p.hasAudio, width: p.width, height: p.height })
      for (const [i, s] of frameTimes(p.duration).entries()) {
        const name = `${String(i + 1).padStart(2, '0')}.jpg`
        if (await still(video, s, path.join(fdir, name))) frames.push({ t: s, file: name })
      }
    } else {
      for (const [i, f] of post.files.entries()) {
        const name = `${String(i + 1).padStart(2, '0')}.jpg`
        const src = path.join(mdir, f.file)
        const ok = f.kind === 'video' ? await still(src, 0.5, path.join(fdir, name)) : await still(src, null, path.join(fdir, name))
        if (ok) frames.push({ slide: i + 1, kind: f.kind, file: name })
      }
    }
    // Renumber if a still failed, so the sheet's %02d sequence has no gaps.
    frames.forEach((f, i) => { const want = `${String(i + 1).padStart(2, '0')}.jpg`; if (f.file !== want) { renameSync(path.join(fdir, f.file), path.join(fdir, want)); f.file = want } })
    w.frames = frames
    w.sheet = frames.length && await makeSheet(fdir, frames.length, path.join(fdir, 'sheet.jpg'), sheetLayout(post.type, frames.length)) ? 'sheet.jpg' : null
    did.push(`${frames.length} still${frames.length === 1 ? '' : 's'}`)
  }

  if (w.onScreen == null && t.ocr && w.frames.length) {
    const files = w.frames.map((f) => path.join(fdir, f.file))
    const r = await run(t.ocr, files, { echo: false })
    if (r.code === 0) {
      w.onScreen = parseOcr(r.out, files)
      did.push(`${uniqueLines(w.onScreen).length} lines of on-screen text`)
    }
  }

  // YouTube's own captions, when src/youtube.mjs saved some, stand in for whisper.
  const captions = post.type === 'reel' ? readJson(path.join(mdir, '_captions', `${post.shortcode}.json`)) : null
  if (w.transcript == null && captions?.segments) {
    w.transcript = captions
    did.push(captions.speech ? `${captions.words} words spoken (YouTube's captions)` : 'no speech in YouTube\'s captions')
  }
  if (w.transcript == null && post.type === 'reel' && w.hasAudio !== false && t.whisper && t.modelReady) {
    w.transcript = await transcribe(path.join(mdir, post.files[0].file), path.join(fdir, 'speech'), t)
    if (w.transcript) did.push(w.transcript.speech ? `${w.transcript.words} words spoken` : 'no speech (music only)')
  }
  if (post.type === 'reel' && w.hasAudio === false) w.transcript ??= { text: '', segments: [], words: 0, speech: false, model: null }

  writeJson(file, w)
  return did
}

async function main() {
  const argv = process.argv.slice(2)
  const [handle] = handlesFromArgs(argv, 'Usage: node src/process.mjs <instagram handle> [--model small.en] [--no-ocr] [--no-transcripts]')
  const t = tools({ ocr: !argv.includes('--no-ocr'), transcripts: !argv.includes('--no-transcripts'), model: flag(argv, 'model') ?? process.env.STUDY_WHISPER_MODEL ?? 'small.en' })
  if (!t.ffmpeg) { console.error('ffmpeg is not installed (brew install ffmpeg).'); process.exit(1) }
  if (t.whisper) t.modelReady = await ensureModel(t.model, t.modelName)
  console.log(`Speech: ${t.whisper && t.modelReady ? `whisper.cpp, ${t.modelName}` : 'skipped (brew install whisper-cpp)'} · On-screen text: ${t.ocr ? 'yes' : process.platform === 'darwin' ? 'skipped (needs Xcode command line tools: xcode-select --install)' : 'skipped (Mac only)'}`)

  const mdir = mediaDir(handle)
  const wdir = ensureDir(workDir(handle))
  const posts = readPosts(mdir)
  if (!posts.length) { console.error(`Nothing downloaded for @${handle} yet. Run: npm run download -- ${handle}`); process.exit(1) }
  // Drop work for posts that are gone from disk (deleted and re-downloaded, say).
  const live = new Set(posts.map((p) => p.shortcode))
  for (const f of readdirSync(wdir)) if (f.endsWith('.json') && !live.has(f.slice(0, -5))) rmSync(path.join(wdir, f), { force: true })

  let n = 0
  for (const [i, p] of posts.entries()) {
    const did = await processPost(p, mdir, wdir, t)
    if (did.length) { n++; console.log(`  [${i + 1}/${posts.length}] ${p.type.padEnd(8)} ${p.shortcode}  ${did.join(' · ')}`) }
  }
  console.log(`Done: ${n} posts worked on this run, ${posts.length} in all. Next: npm run report -- ${handle}`)
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main()
