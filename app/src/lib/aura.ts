import type { FaceDetector, ImageSegmenter } from '@mediapipe/tasks-vision'
import type { Element } from '../data/signs'

/**
 * Aura photo: checks the picture has one real person in it, then paints an
 * aura behind them in their element's colours, framed like the card photo.
 * Runs on the phone (MediaPipe, in WebAssembly); nothing is uploaded.
 *
 * The WebAssembly ships next to the app in mp/wasm and the models are bundled
 * (lib/auraModels.ts), so it works offline and inside hosts that block outside
 * downloads.
 */

export const OUT_W = 900
export const OUT_H = 1080

export type AuraResult =
  | { ok: true; url: string; faces: 1; score: number }
  | { ok: false; reason: 'no-face' | 'many-faces' | 'too-small' | 'unreadable' | 'unavailable'; message: string }

const MESSAGES: Record<Exclude<AuraResult, { ok: true }>['reason'], string> = {
  'no-face': 'We couldn’t find a face. Use a clear photo of you, facing the camera.',
  'many-faces': 'There’s more than one person here. Use a photo of just you.',
  'too-small': 'You’re too far away. Use a closer photo, head and shoulders.',
  unreadable: 'That file didn’t open as a photo. Try a JPG or PNG.',
  unavailable: 'The photo check couldn’t start on this device.',
}
const fail = (reason: keyof typeof MESSAGES): AuraResult => ({ ok: false, reason, message: MESSAGES[reason] })

let models: Promise<{ face: FaceDetector; seg: ImageSegmenter | null }> | null = null

/** load once; the segmenter is optional (without it the aura goes behind a soft oval) */
export function loadAuraModels() {
  models ??= (async () => {
    const [{ FilesetResolver, FaceDetector, ImageSegmenter }, { FACE_MODEL, SEG_MODEL }] = await Promise.all([import('@mediapipe/tasks-vision'), import('./auraModels')])
    const base = new URL('mp/', document.baseURI).href
    const files = await FilesetResolver.forVisionTasks(`${base}wasm`)
    const face = await FaceDetector.createFromOptions(files, {
      baseOptions: { modelAssetBuffer: FACE_MODEL(), delegate: 'CPU' },
      runningMode: 'IMAGE', minDetectionConfidence: 0.5,
    })
    const seg = await ImageSegmenter.createFromOptions(files, {
      baseOptions: { modelAssetBuffer: SEG_MODEL(), delegate: 'CPU' },
      runningMode: 'IMAGE', outputConfidenceMasks: true, outputCategoryMask: false,
    }).catch(() => null)
    return { face, seg }
  })()
  models.catch(() => { models = null })
  return models
}

async function toImage(file: Blob): Promise<HTMLCanvasElement | null> {
  try {
    const bmp = await createImageBitmap(file, { imageOrientation: 'from-image' } as ImageBitmapOptions)
    // work at a sane size: big phone photos are slow and gain nothing
    const k = Math.min(1, 1280 / Math.max(bmp.width, bmp.height))
    const c = document.createElement('canvas')
    c.width = Math.round(bmp.width * k); c.height = Math.round(bmp.height * k)
    c.getContext('2d')!.drawImage(bmp, 0, 0, c.width, c.height)
    bmp.close()
    return c
  } catch {
    return null
  }
}

/** the aura's colours for each element: inner, middle, outer */
const PALETTE: Record<Element, [string, string, string, string]> = {
  fire: ['#ffd36a', '#ff7a3a', '#ff3d6e', '#b14cff'],
  earth: ['#fff07a', '#ffcf5a', '#9fe870', '#ff9f4a'],
  air: ['#fff3c4', '#7fe0ff', '#b18cff', '#ff9ad8'],
  water: ['#c8f4ff', '#3fd8ff', '#4f7cff', '#b05cff'],
}

/** check the photo and paint the aura; returns a JPEG data URL sized for the card */
export async function makeAuraPhoto(file: Blob, element: Element): Promise<AuraResult> {
  const src = await toImage(file)
  if (!src) return fail('unreadable')
  let m: Awaited<ReturnType<typeof loadAuraModels>>
  try { m = await loadAuraModels() } catch { return fail('unavailable') }

  const det = m.face.detect(src).detections
  if (!det.length) return fail('no-face')
  // ignore tiny background faces when deciding if there are "many"
  const boxes = det.map((d) => d.boundingBox!).filter(Boolean)
  const biggest = boxes.reduce((a, b) => (b.width * b.height > a.width * a.height ? b : a))
  const real = boxes.filter((b) => b.width > biggest.width * 0.45)
  if (real.length > 1) return fail('many-faces')
  if (biggest.width < src.width * 0.08) return fail('too-small')
  const score = det.find((d) => d.boundingBox === biggest)?.categories[0]?.score ?? 0.5

  // frame: face centred, about a third of the width, eyes a little above the middle
  const faceW = biggest.width
  // leave room for the halo, but keep the photo covering most of the frame
  const scale = Math.max((OUT_W * 0.27) / faceW, (OUT_H * 0.82) / src.height, (OUT_W * 0.82) / src.width)
  const fcx = biggest.originX + biggest.width / 2
  const fcy = biggest.originY + biggest.height / 2
  const out = document.createElement('canvas')
  out.width = OUT_W; out.height = OUT_H
  const g = out.getContext('2d')!
  const dx = OUT_W / 2 - fcx * scale
  const dy = OUT_H * 0.42 - fcy * scale
  const head = { x: OUT_W / 2, y: OUT_H * 0.42, r: faceW * scale }

  // 1 · the room, dark and soft
  g.fillStyle = '#07040f'; g.fillRect(0, 0, OUT_W, OUT_H)
  g.filter = 'blur(30px) brightness(0.22) saturate(0.6)'
  g.drawImage(src, dx, dy, src.width * scale, src.height * scale)
  g.filter = 'none'

  // the person's silhouette (or a soft oval if the segmenter didn't load)
  const mask = document.createElement('canvas')
  mask.width = OUT_W; mask.height = OUT_H
  const mg = mask.getContext('2d')!
  let cut = false
  if (m.seg) {
    try {
      const res = m.seg.segment(src)
      const conf = res.confidenceMasks?.[0]
      if (conf) {
        const w = conf.width, h = conf.height, data = conf.getAsFloat32Array()
        const raw = document.createElement('canvas'); raw.width = w; raw.height = h
        const id = raw.getContext('2d')!.createImageData(w, h)
        for (let i = 0; i < data.length; i++) { const a = Math.max(0, Math.min(1, (data[i] - 0.25) / 0.5)); id.data[i * 4 + 3] = a * 255 }
        raw.getContext('2d')!.putImageData(id, 0, 0)
        mg.filter = 'blur(3px)'
        mg.drawImage(raw, dx, dy, src.width * scale, src.height * scale)
        mg.filter = 'none'
        cut = true
      }
      res.close()
    } catch { /* fall through to the oval */ }
  }
  if (!cut) {
    const grd = mg.createRadialGradient(head.x, head.y + head.r, head.r * 0.8, head.x, head.y + head.r, head.r * 2.6)
    grd.addColorStop(0, '#000'); grd.addColorStop(1, 'rgba(0,0,0,0)')
    mg.fillStyle = grd; mg.fillRect(0, 0, OUT_W, OUT_H)
  }
  // fade the cut-out where the photo itself ends, so no hard edge shows
  {
    const x0 = dx, y0 = dy, x1 = dx + src.width * scale, y1 = dy + src.height * scale
    const f = Math.min(x1 - x0, y1 - y0) * 0.12
    mg.globalCompositeOperation = 'destination-in'
    const v = mg.createLinearGradient(0, y0, 0, y1)
    v.addColorStop(0, 'rgba(0,0,0,0)'); v.addColorStop(Math.min(0.5, f / (y1 - y0) * 0.4), '#000')
    v.addColorStop(Math.max(0.5, 1 - f / (y1 - y0)), '#000'); v.addColorStop(1, 'rgba(0,0,0,0)')
    mg.fillStyle = v; mg.fillRect(0, 0, OUT_W, OUT_H)
    const h = mg.createLinearGradient(x0, 0, x1, 0)
    h.addColorStop(0, 'rgba(0,0,0,0)'); h.addColorStop(Math.min(0.5, f / (x1 - x0)), '#000')
    h.addColorStop(Math.max(0.5, 1 - f / (x1 - x0)), '#000'); h.addColorStop(1, 'rgba(0,0,0,0)')
    mg.fillStyle = h; mg.fillRect(0, 0, OUT_W, OUT_H)
    mg.globalCompositeOperation = 'source-over'
  }

  // 2 · the aura: light that follows the silhouette, warm over the head, cool down the sides
  const [c0, c1, c2, c3] = PALETTE[element]
  const paint = (ctx: CanvasRenderingContext2D) => {
    // conic gradients arrived in Safari 16.4; older phones get bands instead
    const conic = typeof (ctx as Partial<CanvasRenderingContext2D>).createConicGradient === 'function'
    let grd: CanvasGradient
    if (conic) {
      grd = ctx.createConicGradient(-Math.PI / 2, head.x, head.y + head.r * 0.6)
      grd.addColorStop(0, c0); grd.addColorStop(0.14, c1); grd.addColorStop(0.32, c2); grd.addColorStop(0.5, c3)
      grd.addColorStop(0.68, c2); grd.addColorStop(0.86, c1); grd.addColorStop(1, c0)
    } else {
      grd = ctx.createLinearGradient(0, 0, 0, OUT_H)
      grd.addColorStop(0, c0); grd.addColorStop(0.4, c1); grd.addColorStop(0.7, c2); grd.addColorStop(1, c3)
    }
    ctx.fillStyle = grd; ctx.fillRect(0, 0, OUT_W, OUT_H)
  }
  const halo = (blur: number, grow: number, alpha: number) => {
    const h = document.createElement('canvas'); h.width = OUT_W; h.height = OUT_H
    const hg = h.getContext('2d')!
    hg.filter = `blur(${blur}px)`
    // the silhouette, a little bigger than the person, centred on the head
    hg.translate(head.x, head.y); hg.scale(grow, grow); hg.translate(-head.x, -head.y)
    hg.drawImage(mask, 0, 0)
    hg.setTransform(1, 0, 0, 1, 0, 0); hg.filter = 'none'
    hg.globalCompositeOperation = 'source-in'
    paint(hg)
    g.globalAlpha = alpha; g.drawImage(h, 0, 0); g.globalAlpha = 1
  }
  g.globalCompositeOperation = 'screen'
  // a wide ambient glow so even a tight portrait gets colour behind it
  const amb = g.createRadialGradient(head.x, head.y, head.r * 0.5, head.x, head.y, OUT_W * 0.95)
  amb.addColorStop(0, c1); amb.addColorStop(0.45, c2); amb.addColorStop(1, 'rgba(0,0,0,0)')
  g.globalAlpha = 0.55; g.fillStyle = amb; g.fillRect(0, 0, OUT_W, OUT_H); g.globalAlpha = 1
  halo(90, 1.35, 1)
  halo(40, 1.15, 0.9)
  halo(16, 1.04, 0.7)
  g.globalCompositeOperation = 'source-over'

  // 3 · the person, cut out
  const person = document.createElement('canvas')
  person.width = OUT_W; person.height = OUT_H
  const p = person.getContext('2d')!
  p.drawImage(src, dx, dy, src.width * scale, src.height * scale)
  p.globalCompositeOperation = 'destination-in'
  p.drawImage(mask, 0, 0)
  g.drawImage(person, 0, 0)

  // 4 · a light wash of the aura over them, like an aura camera
  const wash = document.createElement('canvas'); wash.width = OUT_W; wash.height = OUT_H
  const wg = wash.getContext('2d')!
  paint(wg)
  wg.globalCompositeOperation = 'destination-in'; wg.drawImage(mask, 0, 0)
  g.globalCompositeOperation = 'soft-light'; g.globalAlpha = 0.32
  g.drawImage(wash, 0, 0)
  g.globalCompositeOperation = 'source-over'; g.globalAlpha = 1

  // 5 · film grain and a soft vignette
  const noise = g.getImageData(0, 0, OUT_W, OUT_H)
  for (let i = 0; i < noise.data.length; i += 4) {
    const n = (Math.random() - 0.5) * 26
    noise.data[i] += n; noise.data[i + 1] += n; noise.data[i + 2] += n
  }
  g.putImageData(noise, 0, 0)
  const vig = g.createRadialGradient(OUT_W / 2, OUT_H * 0.45, OUT_W * 0.35, OUT_W / 2, OUT_H * 0.45, OUT_W * 0.85)
  vig.addColorStop(0, 'rgba(0,0,0,0)'); vig.addColorStop(1, 'rgba(5,2,15,0.6)')
  g.fillStyle = vig; g.fillRect(0, 0, OUT_W, OUT_H)

  return { ok: true, url: out.toDataURL('image/jpeg', 0.86), faces: 1, score }
}
