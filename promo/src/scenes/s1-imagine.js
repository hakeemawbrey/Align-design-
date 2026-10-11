import { clamp, lerp, prog, ease, tw, rng, noise1, el, mix, C, PIXEL_PALETTE, TypeLine } from '../lib.js'
import { W, H, IMG, PEOPLE, SANS, SERIF, MONO, fill, img, Ticks, makeCard, makeStars } from "./common.js"

// index.html ships Inter 200/300/400/600 only; weight 500 would silently fall back to 400.
// Register the 500 face locally (shared guard with s2) — document.fonts.ready waits for it.
if (typeof document !== 'undefined' && !window.__inter500) {
  window.__inter500 = new FontFace('Inter', "url(../app/node_modules/@fontsource/inter/files/inter-latin-500-normal.woff2) format('woff2')", { weight: '500' })
  document.fonts.add(window.__inter500); window.__inter500.load().catch(() => {})
}

// ─────────────────────────────────────────────────────────────── S1 · Imagine
// Juniper's portrait at 720×960 → face centre ≈ (330, 520) in source px.
const FACE_X = 620, FACE_Y = 270          // where her face sits on screen (upper-left of the line)
const LAYER_W = 1500, LAYER_H = 2000
/** typing starts here (sound cue); 37 chars × perChar 0.026 + fade 0.3 → fully typed by ~1.44s */
const TYPE_START = 0.2
const SCRIM_W = 1640, SCRIM_H = 230, SCRIM_A = 0.5
const FIELD_W = 2700, FIELD_H = 3600      // sharp(er) silhouette layer, native 3:4 aspect
export function sceneImagine(stage) {
  const root = fill(stage, { background: C.void })
  // background group: a heavily blurred full-bleed colour field + a less blurred, offset silhouette layer
  const makeBg = (parent, pad = 0) => {
    const g = el('div', { position: 'absolute', left: -pad + 'px', top: 0, width: (W + 2 * pad) + 'px', height: H + 'px', overflow: 'hidden', background: 'linear-gradient(180deg, #8f7ae0 0%, #b493ea 32%, #e59ab8 66%, #f4ad86 100%)' }, parent)
    const field = img(g, IMG + 'juniper.jpg', {
      left: '0', top: '0', width: FIELD_W + 'px', height: FIELD_H + 'px', objectFit: 'cover',
      filter: 'blur(90px) saturate(1.1)', transformOrigin: '0 0', opacity: 0.35,
    })
    const face = img(g, IMG + 'juniper.jpg', {
      left: '0', top: '0', width: LAYER_W + 'px', height: LAYER_H + 'px', objectFit: 'cover',
      filter: 'blur(26px) saturate(1.2) brightness(1.06)', transformOrigin: '0 0',
      webkitMaskImage: 'radial-gradient(ellipse 30% 34% at 46% 62%, #000 50%, transparent 100%)',
      maskImage: 'radial-gradient(ellipse 30% 34% at 46% 62%, #000 50%, transparent 100%)',
    })
    return { g, field, face, pad }
  }
  const bg = makeBg(root)
  // dreamy pastel wash (lavender top → rose/peach bottom) so it reads as an aura, not a photo
  const wash = fill(root, { background: 'linear-gradient(180deg, #b9a2f0 0%, #c9a6ff 30%, #f0a6c2 70%, #f7b58f 100%)', mixBlendMode: 'soft-light', opacity: 0.85 })
  const tint = fill(root, { background: 'linear-gradient(180deg, rgba(20,10,46,0.50) 0%, rgba(154,123,224,0.10) 45%, rgba(232,98,138,0.12) 100%)' })
  // glitch: cloned slices of the background, displaced horizontally on noisy frames
  const slices = Array.from({ length: 4 }, () => makeBg(root, 120))
  slices.forEach(sl => { sl.g.style.background = 'transparent'; sl.g.style.display = 'none' })
  root.appendChild(wash); root.appendChild(tint) // washes above the slices too
  const bands = Array.from({ length: 7 }, () => el('div', { position: 'absolute', left: 0, width: W + 'px', height: '2px', background: 'rgba(255,247,236,0.35)', opacity: 0 }, root))
  const strips = Array.from({ length: 5 }, () => el('div', { position: 'absolute', left: 0, width: W + 'px', background: 'rgba(255,247,236,0.07)', opacity: 0, mixBlendMode: 'screen' }, root))
  // soft indigo scrim behind the caption so bone text holds ≥3.5:1 over the light pink right half.
  // A blurred pill (not a pure radial) so the plateau covers the whole 1430px line, ends included;
  // a touch denser on the right where the aura is palest.
  const scrimWrap = el('div', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px', pointerEvents: 'none' }, root)
  const scrim = el('div', {
    position: 'absolute', left: (W / 2 - SCRIM_W / 2) + 'px', top: (H / 2 - SCRIM_H / 2 + 6) + 'px', width: SCRIM_W + 'px', height: SCRIM_H + 'px',
    borderRadius: SCRIM_H / 2 + 'px', filter: 'blur(64px)', opacity: 0, pointerEvents: 'none',
    background: `linear-gradient(90deg, rgba(58,22,108,${SCRIM_A * 0.72}) 0%, rgba(58,22,108,${SCRIM_A}) 45%, rgba(58,22,108,${SCRIM_A * 1.04}) 100%)`,
  }, scrimWrap)
  const line = new TypeLine(root, 'What if the stars chose who you meet?', {
    left: '50%', top: '50%', transform: 'translate(-50%,-50%)', fontFamily: SANS, fontWeight: 500, fontSize: '80px', letterSpacing: '-0.018em',
    textShadow: '0 2px 24px rgba(46,16,96,0.55), 0 0 2px rgba(46,16,96,0.3)',
  }, { perChar: 0.026, fade: 0.3, final: C.bone, accent: [C.rub, C.amber, C.gold, C.plum] })
  const r = rng(7)
  const bandY = bands.map(() => r() * H)
  const stripY = strips.map(() => [r() * H, 30 + r() * 120])
  const sliceDef = slices.map(() => ({ y: 140 + r() * 620, h: 20 + r() * 70, dir: r() < 0.5 ? -1 : 1, amp: 30 + r() * 40 }))

  const pose = (b, t) => {
    const k = prog(t, 0, 3.6)
    const s = lerp(1.0, 1.12, ease.inOutQuad(k))
    const dx = lerp(-40, 30, k), dy = lerp(20, -16, k)
    const gx = FIELD_W * 330 / 720, gy = FIELD_H * 520 / 960
    b.field.style.transform = `translate(${b.pad + FACE_X + dx * 0.5 - gx * s}px, ${FACE_Y + dy * 0.5 - gy * s}px) scale(${s})`
    // face layer: put the source face point (330/720, 520/960 of the layer) at FACE_X/Y, scaling about it
    const fx = LAYER_W * 330 / 720, fy = LAYER_H * 520 / 960
    b.face.style.transform = `translate(${b.pad + FACE_X + dx - fx * s}px, ${FACE_Y + dy - fy * s}px) scale(${s})`
  }

  return {
    start: 0, end: 3.55, root,
    update(t) {
      pose(bg, t)
      bg.g.style.opacity = String(lerp(0.6, 1, ease.outQuad(prog(t, 0, 0.3))))
      tint.style.opacity = String(lerp(1, 0.6, prog(t, 0, 3)))
      line.update(t - TYPE_START)
      // the scrim spreads left → right just ahead of the typing cursor, so it never sits there as an empty band
      scrim.style.opacity = String(ease.outQuad(prog(t, TYPE_START - 0.1, TYPE_START + 0.4)))
      // mask on the wrapper (a mask on the blurred element itself would clip its halo to a hard pill)
      const cur = 244 + 1431 * clamp((t - TYPE_START) / (37 * 0.026))   // ≈ typing cursor x
      const edge = cur + 280 + 1000 * ease.inQuad(prog(t, TYPE_START + 37 * 0.026, TYPE_START + 37 * 0.026 + 0.5))
      scrimWrap.style.webkitMaskImage = scrimWrap.style.maskImage = edge > W + 400 ? 'none' : `linear-gradient(90deg, #000 ${edge - 320}px, transparent ${edge}px)`
    },
  }
}

/** stepped pixel wipe from the top, painted on the fx canvas (S1 → S2) */
export function fxStairWipe(ctx, t, { start, dur, color, seed = 3, size = 48, fromBottom = false }) {
  const p = prog(t, start, start + dur)
  if (p <= 0 || p >= 1) return p >= 1
  const cols = Math.ceil(W / size), rows = Math.ceil(H / size)
  const r = rng(seed)
  const jitter = Array.from({ length: cols }, () => r())
  const maxStair = 14
  const front = ease.inOutQuad(p) * (rows + maxStair + 2)
  for (let cx = 0; cx < cols; cx++) {
    const stair = Math.floor(cx / 4) * 1.4 + jitter[cx] * 1.2
    for (let cy = 0; cy < rows; cy++) {
      const row = fromBottom ? rows - 1 - cy : cy
      const d = front - (row + stair)
      if (d <= 0) continue
      if (d < 1.2) {
        const rr = rng(seed * 131 + cx * 977 + cy * 31 + (Math.round(t * 30) >> 1))
        ctx.fillStyle = PIXEL_PALETTE[Math.floor(rr() * PIXEL_PALETTE.length)]
      } else ctx.fillStyle = color
      ctx.fillRect(cx * size, cy * size, size + 0.5, size + 0.5)
    }
  }
  return false
}
