import { clamp, lerp, prog, ease, tw, rng, noise1, el, mix, C, PIXEL_PALETTE, TypeLine } from '../lib.js'
import { W, H, IMG, PEOPLE, SANS, SERIF, MONO, fill, img, Ticks, makeCard, makeStars } from "./common.js"

// ─────────────────────────────────────────────────────────────── S1 · Imagine
// Juniper's portrait at 720×960 → face centre ≈ (330, 520) in source px.
const FACE_X = 620, FACE_Y = 270          // where her face sits on screen (upper-left of the line)
const LAYER_W = 1500, LAYER_H = 2000
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
  const line = new TypeLine(root, 'What if the stars chose who you meet?', {
    left: '50%', top: '50%', transform: 'translate(-50%,-50%)', fontFamily: SANS, fontWeight: 300, fontSize: '60px', letterSpacing: '-0.01em',
    textShadow: '0 1px 18px rgba(20,10,46,0.35), 0 0 2px rgba(20,10,46,0.22)',
  }, { perChar: 0.034, final: C.bone, accent: [C.rub, C.amber, C.gold, C.plum] })
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
      line.update(t - 0.45)
      const g = prog(t, 2.0, 3.3)
      // displaced slices ~2.2–3.0s
      slices.forEach((sl, i) => {
        const d = sliceDef[i]
        const on = t > 2.2 && t < 3.0 && noise1(t * 11 + i * 5.3, 21 + i) > 0.52
        if (!on) { sl.g.style.display = 'none'; return }
        sl.g.style.display = 'block'
        pose(sl, t)
        const jit = noise1(t * 23 + i, 41 + i)
        const y = d.y + Math.round((noise1(t * 4 + i * 2, 61 + i) - 0.5) * 120)
        sl.g.style.clipPath = `inset(${y}px 0 ${H - y - d.h}px 0)`
        sl.g.style.transform = `translateX(${d.dir * d.amp * (0.6 + 0.8 * jit)}px)`
        sl.g.style.filter = i % 2 ? `hue-rotate(${-(25 + 25 * jit)}deg) saturate(1.25) brightness(1.06)` : 'brightness(1.05)'
      })
      bands.forEach((b, i) => {
        const on = g > 0 && noise1(t * 9 + i * 3, 3 + i) > 0.45
        b.style.top = (bandY[i] + Math.sin(t * 3 + i) * 40) + 'px'
        b.style.opacity = on ? String(0.25 + 0.5 * g) : '0'
      })
      strips.forEach((s2, i) => {
        s2.style.top = stripY[i][0] + 'px'; s2.style.height = stripY[i][1] + 'px'
        s2.style.opacity = g > 0 && noise1(t * 6 + i, 11 + i) > 0.5 ? String(g) : '0'
      })
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
        const rr = rng(seed * 131 + cx * 977 + cy * 31 + Math.floor(t * 20))
        ctx.fillStyle = PIXEL_PALETTE[Math.floor(rr() * PIXEL_PALETTE.length)]
      } else ctx.fillStyle = color
      ctx.fillRect(cx * size, cy * size, size + 0.5, size + 0.5)
    }
  }
  return false
}
