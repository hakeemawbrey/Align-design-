// SIGN SWAP kit (Month 2 boost, batch m11: kswe01–kswe20). Lives in kswe01; the other 19 films import it read-only.
// One sign wakes up as another sign right before something that matters. Pure f(t) drawing; DOM only inside build().
//
//   star(x, t, px, py, size, sign, o)          a sign star (sign id or { color, glyph }); o.tears 0–3, o.color override,
//                                              plus any drawStarChar opts (mood, look, pop, hops, seed, alpha, squash…)
//   swapper(x, t, px, py, size, from, to, k, o) a star mid-swap: colour + glyph morph from → to with k (0…1); when
//                                              o.soul is true a tiny "who's really inside" glyph orbits the head
//   swapBolt(x, t, at, o)                       the SWAP flash: zig-zag bolt between two points + colour rays + white pop
//   swapTag(x, t, cx, cy, from, to, at, o)      the "♈ ARIES → ♉ TAURUS" pill (the arrow flips in at `at`)
//   room(x, t, kind, o)                         sets: bed · cafe · street · kitchen · dinner · wedding · hall · office · sofa · door
//   phone(x, t, P)                              a pixel phone with a chat thread (lines pile up at their `at`), typing dots
//   bubble, label, box, R, shadow, sparkles, hearts, drawBits, clockFace, mirror, tissues, scalesProp, stringBoard
//   buildBug(root)                              the SIGN SWAP bug (Inter 800 small caps, letter-spaced, top-left)
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { drawPixelStar } from '../../sky.js'
import { easeOutBack, SIGNS } from '../../wheel.js'
import { drawStarChar, signStar } from '../../startalk.js'

export const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', LAV = '#c9a6ff', RED = '#e8344e', TEAR = '#8fe3ff'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const SERIF = "'EB Garamond', Georgia, serif"
export const MONO = "'Space Mono', ui-monospace, monospace"
export const r3 = v => +v.toFixed(3)
export const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
export const win = (t, a, b, fi = 0.25, fo = 0.2) => pop01(t, a, fi, 2) * outK(t, [b - fo, b])
export { clamp, lerp, prog, ease, easeOutBack, drawStarChar, signStar, drawPixelStar, SIGNS }
export const SIGN = id => SIGNS.find(s => s.id === id)
export const NAME = id => SIGN(id).name.toUpperCase()
export const TAG = id => `${SIGN(id).glyph}︎ ${NAME(id)}`

// ── colour helpers
const hx = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16))
export function mix(a, b, k) { const A = hx(a), B = hx(b); return '#' + A.map((v, i) => Math.round(lerp(v, B[i], clamp(k))).toString(16).padStart(2, '0')).join('') }
export const rgba = (h, a) => { const [r, g, b] = hx(h); return `rgba(${r},${g},${b},${clamp(a)})` }

// ── drawing primitives
export const R = (x, col, X, Y, w, h) => { x.fillStyle = col; x.fillRect(Math.round(X), Math.round(Y), Math.round(w), Math.round(h)) }
export function box(x, X, Y, w, h, col, { b = 6, hi = null, lo = null } = {}) {
  R(x, INK, X - b, Y - b, w + 2 * b, h + 2 * b); R(x, col, X, Y, w, h)
  if (hi) R(x, hi, X, Y, w, Math.max(b, h * 0.14))
  if (lo) R(x, lo, X, Y + h - Math.max(b, h * 0.14), w, Math.max(b, h * 0.14))
}
export function drawBits(x, bm, cols, cx, cy, cell, { rot = 0, outline = INK, alpha = 1 } = {}) {
  const w = bm[0].length, h = bm.length
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot)
  const ox = -w * cell / 2, oy = -h * cell / 2
  const on = (i, j) => j >= 0 && j < h && i >= 0 && i < w && bm[j][i] !== '.'
  if (outline) { x.fillStyle = outline; for (let j = -1; j <= h; j++) for (let i = -1; i <= w; i++) if (!on(i, j) && (on(i + 1, j) || on(i - 1, j) || on(i, j + 1) || on(i, j - 1))) x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5) }
  for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) { const ch = bm[j][i]; if (ch === '.') continue; x.fillStyle = cols[ch]; x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5) }
  x.restore()
}
/** a pixel speech bubble at (cx, cy); shows t0…t1. Text may contain '\n'. tail −1…1 (0 = centre) or null */
export function bubble(x, t, cx, cy, t0, t1, text, { col = BONE, ink = INK, size = 34, tail = 0, font = INTER, weight = 800, rot = 0, k: kk = null, maxW = 900 } = {}) {
  const k = kk ?? (pop01(t, t0, 0.25, 2.4) * outK(t, [t1 - 0.15, t1]))
  if (k <= 0.01 || (kk == null && t < t0)) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.font = `${weight} ${size}px ${font}`
  const rows = String(text).split('\n')
  const w = Math.min(maxW, Math.max(...rows.map(r => x.measureText(r).width)) + 44), lh = size * 1.18, h = rows.length * lh + 26
  x.fillStyle = INK; x.fillRect(-w / 2 - 5, -h / 2, w + 10, h); x.fillRect(-w / 2, -h / 2 - 5, w, h + 10)
  x.fillStyle = col; x.fillRect(-w / 2, -h / 2, w, h)
  if (tail != null) { const tx = tail * (w / 2 - 40); x.fillStyle = INK; x.fillRect(tx - 14, h / 2 + 4, 14, 12); x.fillRect(tx - 7, h / 2 + 14, 8, 8); x.fillStyle = col; x.fillRect(tx - 9, h / 2, 9, 9) }
  x.fillStyle = ink; x.textAlign = 'center'; x.textBaseline = 'middle'
  rows.forEach((r, i) => x.fillText(r, 0, 2 + (i - (rows.length - 1) / 2) * lh))
  x.restore()
}
export function label(x, text, cx, cy, { size = 28, col = BONE, align = 'center', alpha = 1, font = MONO, weight = 700, rot = 0, scale = 1 } = {}) {
  if (alpha <= 0 || scale <= 0.01) return
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot); x.scale(scale, scale)
  x.font = `${weight} ${size}px ${font}`; x.textAlign = align; x.textBaseline = 'middle'
  x.fillStyle = 'rgba(6,4,18,0.85)'; x.fillText(text, 3, 4)
  x.fillStyle = col; x.fillText(text, 0, 0)
  x.restore()
}
/** a chunky sticker plate with text (rotated), e.g. "1 HOUR TO THE DATE" */
export function sticker(x, t, text, cx, cy, at, out, { col = GOLD, ink = INK, size = 34, rot = -0.04, font = INTER, weight = 800 } = {}) {
  const k = pop01(t, at, 0.3, 2.6) * outK(t, [out - 0.2, out])
  if (k <= 0.01 || t < at) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.font = `${weight} ${size}px ${font}`
  const w = x.measureText(text).width + 48, h = size + 30
  R(x, INK, -w / 2 - 6, -h / 2 - 6, w + 12, h + 12); R(x, col, -w / 2, -h / 2, w, h)
  x.fillStyle = ink; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 3)
  x.restore()
}
export function shadow(x, cx, cy, w, a = 0.35) { x.save(); x.globalAlpha = a; x.fillStyle = '#05030c'; x.beginPath(); x.ellipse(cx, cy, w / 2, w * 0.09, 0, 0, Math.PI * 2); x.fill(); x.restore() }
export function sparkles(x, t, cx, cy, t0, n, Rr, seed, cols = [GOLD, BONE, PINK]) {
  const tt = t - t0
  if (tt < 0 || tt > 0.7) return
  const p = ease.outCubic(tt / 0.7)
  x.save(); x.globalAlpha = 1 - ease.inQuad(tt / 0.7)
  for (let i = 0; i < n; i++) { const a = (i / n) * Math.PI * 2 + seed; drawPixelStar(x, cx + Math.cos(a) * Rr * (0.7 + 0.5 * p), cy + Math.sin(a) * Rr * (0.7 + 0.5 * p), 26 * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length]) }
  x.restore()
}
const HEART = ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...']
export function heart(x, cx, cy, cell, col = PINK, o = {}) { drawBits(x, HEART, { H: col }, cx, cy, cell, o) }
export function hearts(x, t, t0, cx, cy, { n = 5, col = PINK, spread = 160, rise = 260, dur = 1.6 } = {}) {
  const tt = t - t0
  if (tt < 0 || tt > dur) return
  for (let i = 0; i < n; i++) {
    const p = clamp((tt - i * 0.08) / (dur - 0.4)); if (p <= 0) continue
    const ang = (i / Math.max(1, n - 1) - 0.5) * 1.6
    heart(x, cx + Math.sin(ang) * spread * p + Math.sin(tt * 5 + i) * 8, cy - rise * ease.outCubic(p), 6, col, { alpha: 1 - ease.inQuad(p) })
  }
}

// ── star sprite frame (mirrors startalk.js drawStarChar) so tears sit on the sprite through hops and squash
const G = 36, HALF = 18
const FOOT_ROW = 19.6 + 17.6 * Math.cos(Math.PI / 5)
function hopState(t, hops) {
  if (!hops || !hops.length) return { lift: 0, sq: 0 }
  let h = -1e9
  for (const v of hops) if (v <= t && v > h) h = v
  const dt = t - h
  if (dt > 0.6) return { lift: 0, sq: 0 }
  const AIR = 0.26
  if (dt < 0.05) return { lift: 0, sq: 0.12 * Math.sin(Math.PI * dt / 0.05) }
  if (dt < 0.05 + AIR) { const p = (dt - 0.05) / AIR; return { lift: Math.sin(Math.PI * p), sq: -0.1 * Math.sin(Math.PI * Math.min(1, p * 1.6)) } }
  const d = dt - 0.05 - AIR
  return { lift: 0, sq: 0.16 * Math.exp(-d * 11) * Math.cos(d * 26) }
}
export function starFrame(x, y, size, t, { pop = 1, bob, squash = 0, hops = null, seed = 1 } = {}) {
  const s = size * pop
  const cell = s >= 100 ? Math.max(1, Math.round(s / G)) : s / G
  const S = cell * G
  const bobA = bob === undefined ? size * 0.035 : bob
  const hs = hopState(t, hops)
  const sq = squash + hs.sq + 0.018 * Math.sin(t * 3.1 + seed * 1.7)
  const cy = y + Math.sin(t * 2.2 + seed * 2.1) * bobA - hs.lift * size * 0.09
  const base = (FOOT_ROW - HALF) * cell
  return { cell, S, cy, base, ox: Math.round(x), oy: Math.round(cy + base), sx: 1 + sq, sy: 1 - sq * 0.9 }
}
export function inSprite(ctx, F, fn) {
  ctx.save(); ctx.translate(F.ox, F.oy); ctx.scale(F.sx, F.sy); ctx.translate(-F.S / 2, -F.S / 2 - F.base); ctx.scale(F.cell, F.cell)
  fn(); ctx.restore()
}
/** tears from both eyes (sprite cells), k: 1 sniffle · 2 streams · 3 fountains */
export function tearsCells(ctx, t, k) {
  if (k <= 0) return
  const drop = (i, j) => { ctx.fillStyle = INK; ctx.fillRect(i - 0.15, j - 0.15, 1.3, 1.7); ctx.fillStyle = TEAR; ctx.fillRect(i, j, 1, 1.4); ctx.fillStyle = '#ffffff'; ctx.fillRect(i, j, 0.5, 0.5) }
  const n = k >= 3 ? 9 : k >= 2 ? 5 : 2, rate = k >= 3 ? 1.9 : k >= 2 ? 1.2 : 0.7
  for (const d of [-1, 1]) {
    const ex = d < 0 ? 10.2 : 25.2
    for (let q = 0; q < n; q++) {
      const ph = ((t * rate + q / n + (d > 0 ? 0.13 : 0)) % 1 + 1) % 1
      if (k === 1 && ph > 0.75) continue
      let px, py
      if (k >= 3) { px = ex + d * 15 * ph; py = 20 - 9 * ph + 24 * ph * ph }
      else if (k === 2) { px = ex + d * 3.5 * ph; py = 20.5 + 15 * ph * ph }
      else { px = ex + d * 0.6 * ph; py = 21 + 8 * ph * ph }
      drop(Math.round(px * 2) / 2, Math.round(py * 2) / 2)
    }
    ctx.fillStyle = TEAR; ctx.fillRect(d < 0 ? 10 : 20, 23.2, 6, 0.9)
  }
}
/** a sign star; sign = id | { color, glyph }. o.tears 0–3 (Pisces' running gag), o.glyph false hides the badge */
export function star(x, t, px, py, size, sign, o = {}) {
  const S = typeof sign === 'string' ? signStar(sign) : sign
  const { tears = 0, glyph = true, color, ...rest } = o
  const opts = { color: color ?? S.color, glyph: glyph && size >= 120 ? S.glyph : null, glow: 0.9, ...rest }
  const r = drawStarChar(x, px, py, size, t, opts)
  if (tears && (rest.pop ?? 1) > 0.3 && (rest.alpha ?? 1) > 0) {
    const F = starFrame(px, py, size, t, opts)
    x.save(); x.globalAlpha *= rest.alpha ?? 1; inSprite(x, F, () => tearsCells(x, t, tears)); x.restore()
  }
  return r
}
/** a star mid-swap: body colour and badge morph from → to (k 0…1). o.soul: a small orbiting glyph of who's really inside */
export function swapper(x, t, px, py, size, from, to, k, o = {}) {
  const A = SIGN(from), B = SIGN(to)
  const { soul = true, ...rest } = o
  const jit = k > 0.02 && k < 0.98 ? Math.sin(t * 90) * 6 * Math.sin(Math.PI * k) : 0
  const r = star(x, t, px + jit, py, size, { color: mix(A.color, B.color, ease.inOutQuad(k)), glyph: k < 0.5 ? A.glyph : B.glyph }, rest)
  if (soul && k > 0.5) {
    const a = t * 2.4, sx = px + Math.cos(a) * size * 0.55, sy = r.top - size * 0.08 + Math.sin(a) * size * 0.08
    const s = size * 0.2 * clamp((k - 0.5) * 3)
    x.save(); x.globalAlpha *= 0.95 * (rest.alpha ?? 1)
    x.fillStyle = INK; x.beginPath(); x.arc(sx, sy, s * 0.62, 0, Math.PI * 2); x.fill()
    x.fillStyle = A.color; x.beginPath(); x.arc(sx, sy, s * 0.52, 0, Math.PI * 2); x.fill()
    x.font = `700 ${Math.round(s * 0.7)}px ${SERIF}, 'Segoe UI Symbol', 'Noto Sans Symbols 2'`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = INK; x.fillText(A.glyph + '︎', sx, sy + 2)
    x.restore()
  }
  return r
}

// ── the SWAP flash: a zig-zag bolt between two points, colour rays and a white pop. Visible from at−0.05 to at+0.7.
export function swapBolt(x, t, at, { x1 = 540, y1 = 300, x2 = 540, y2 = 1300, colA = GOLD, colB = PINK, flash = 0.9, rays = true, dur = 0.7 } = {}) {
  const tt = t - at
  if (tt < -0.05 || tt > dur) return
  const p = clamp(tt / dur)
  // white pop
  const wk = tt < 0 ? 1 + tt / 0.05 : 1 - ease.outCubic(clamp(tt / 0.35))
  if (wk > 0 && flash > 0) { x.save(); x.globalAlpha = flash * wk; x.fillStyle = '#fffaf0'; x.fillRect(0, 0, 1080, 1920); x.restore() }
  // colour rays from the middle
  if (rays) {
    const cx = (x1 + x2) / 2, cy = (y1 + y2) / 2
    x.save(); x.globalCompositeOperation = 'lighter'; x.globalAlpha = 0.5 * (1 - p)
    for (let i = 0; i < 16; i++) {
      const a = i / 16 * Math.PI * 2 + tt * 1.5, w = 0.07
      x.fillStyle = i % 2 ? colA : colB
      x.beginPath(); x.moveTo(cx, cy); x.lineTo(cx + Math.cos(a - w) * 1600, cy + Math.sin(a - w) * 1600); x.lineTo(cx + Math.cos(a + w) * 1600, cy + Math.sin(a + w) * 1600); x.fill()
    }
    x.restore()
  }
  // the bolt (re-jags every 60 ms)
  const seed = Math.floor(Math.max(0, tt) / 0.06)
  const N = 9, pts = []
  for (let i = 0; i <= N; i++) {
    const k = i / N, n = i === 0 || i === N ? 0 : Math.sin(seed * 12.9898 + i * 78.233) * 43758.5453 % 1
    pts.push([lerp(x1, x2, k) + n * 90, lerp(y1, y2, k) + n * 30])
  }
  const a = 1 - ease.inQuad(p)
  x.save(); x.lineJoin = 'miter'; x.lineCap = 'square'
  for (const [w, c] of [[34, INK], [22, colA], [9, '#fffef4']]) {
    x.globalAlpha = a; x.strokeStyle = c; x.lineWidth = w
    x.beginPath(); pts.forEach(([px, py], i) => i ? x.lineTo(px, py) : x.moveTo(px, py)); x.stroke()
  }
  x.restore()
}
/** the "♈ ARIES → ♉ TAURUS" pill (the arrow + second name pop in at `at`) */
export function swapTag(x, t, cx, cy, from, to, at, { out = 1e9, size = 38, both = false } = {}) {
  const k = pop01(t, at - 0.3, 0.3, 2.4) * outK(t, [out - 0.2, out])
  if (k <= 0.01 || t < at - 0.3) return
  const A = SIGN(from), B = SIGN(to)
  const k2 = pop01(t, at, 0.3, 2.6)
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.font = `800 ${size}px ${INTER}`
  const tA = `${A.glyph}︎ ${NAME(from)}`, tB = `${B.glyph}︎ ${NAME(to)}`, arr = both ? '  ⇄  ' : '  →  '
  const wA = x.measureText(tA).width, wB = x.measureText(tB).width, wR = x.measureText(arr).width
  const W = wA + wR + wB + 60, H = size + 34
  R(x, INK, -W / 2 - 6, -H / 2 - 6, W + 12, H + 12); R(x, 'rgba(18,10,40,0.96)', -W / 2, -H / 2, W, H)
  x.textAlign = 'left'; x.textBaseline = 'middle'
  let X = -W / 2 + 30
  x.fillStyle = A.color; x.fillText(tA, X, 3); X += wA
  x.globalAlpha = clamp(k2); x.fillStyle = BONE; x.fillText(arr, X, 3); X += wR
  x.save(); x.translate(X + wB / 2, 0); x.scale(clamp(k2, 0, 1.3), clamp(k2, 0, 1.3)); x.fillStyle = B.color; x.textAlign = 'center'; x.fillText(tB, 0, 3); x.restore()
  x.restore()
}

// ── props
export function clockFace(x, cx, cy, text, { col = '#ff4d5e', size = 64, alpha = 1, blink = false, t = 0 } = {}) {
  x.save(); x.globalAlpha *= alpha
  x.font = `700 ${size}px ${MONO}`; const w = x.measureText(text).width + 40, h = size + 24
  box(x, cx - w / 2, cy - h / 2, w, h, '#120a20', { b: 6 })
  x.fillStyle = col; x.textAlign = 'center'; x.textBaseline = 'middle'
  if (!blink || Math.floor(t * 2.5) % 2 === 0) x.fillText(text, cx, cy + 3)
  x.restore()
}
/** a standing mirror; inside(x) paints the reflection, clipped to the glass */
export function mirror(x, cx, cy, w, h, inside, { frame = '#c99a4a' } = {}) {
  box(x, cx - w / 2 - 14, cy - h / 2 - 14, w + 28, h + 28, frame, { b: 6 })
  x.save(); x.beginPath(); x.rect(cx - w / 2, cy - h / 2, w, h); x.clip()
  R(x, '#2b3a66', cx - w / 2, cy - h / 2, w, h)
  if (inside) inside(x)
  x.globalAlpha = 0.18; x.fillStyle = '#ffffff'
  x.beginPath(); x.moveTo(cx - w / 2 + 20, cy - h / 2); x.lineTo(cx - w / 2 + 70, cy - h / 2); x.lineTo(cx - w / 2 + 10, cy + h / 2); x.lineTo(cx - w / 2 - 40, cy + h / 2); x.fill()
  x.restore()
}
export function tissues(x, cx, cy, s = 1) {
  box(x, cx - 60 * s, cy - 34 * s, 120 * s, 68 * s, '#7cc6e8', { b: 5, hi: 'rgba(255,255,255,0.3)' })
  R(x, INK, cx - 26 * s, cy - 70 * s, 52 * s, 40 * s); R(x, '#fffdf6', cx - 22 * s, cy - 66 * s, 44 * s, 36 * s)
}
export function plant(x, cx, cy, s = 1, t = 0) {
  box(x, cx - 40 * s, cy - 50 * s, 80 * s, 50 * s, '#c96a3a', { b: 5 })
  for (let i = -2; i <= 2; i++) { x.save(); x.translate(cx + i * 10 * s, cy - 50 * s); x.rotate(i * 0.35 + Math.sin(t * 2 + i) * 0.05); R(x, INK, -11 * s, -86 * s, 22 * s, 88 * s); R(x, '#3fae6a', -7 * s, -82 * s, 14 * s, 82 * s); x.restore() }
}
export function mug(x, cx, cy, col = '#e9b24a', s = 1, steam = 0, t = 0) {
  box(x, cx - 30 * s, cy - 50 * s, 60 * s, 50 * s, col, { b: 5 })
  R(x, INK, cx + 30 * s, cy - 40 * s, 18 * s, 30 * s); R(x, col, cx + 32 * s, cy - 34 * s, 10 * s, 18 * s)
  if (steam) for (let i = 0; i < 3; i++) { const p = (t * 0.8 + i / 3) % 1; x.save(); x.globalAlpha = steam * 0.6 * (1 - p); R(x, '#ffffff', cx - 16 * s + i * 14 * s + Math.sin(t * 4 + i) * 6, cy - 70 * s - p * 70 * s, 8 * s, 18 * s); x.restore() }
}
export function scalesProp(x, cx, cy, tilt = 0, s = 1) {
  R(x, INK, cx - 8 * s, cy - 150 * s, 16 * s, 160 * s); R(x, GOLD, cx - 4 * s, cy - 146 * s, 8 * s, 152 * s)
  box(x, cx - 50 * s, cy, 100 * s, 16 * s, GOLD, { b: 5 })
  x.save(); x.translate(cx, cy - 150 * s); x.rotate(tilt)
  R(x, INK, -130 * s, -6 * s, 260 * s, 12 * s); R(x, GOLD, -126 * s, -3 * s, 252 * s, 6 * s)
  for (const d of [-1, 1]) { x.save(); x.translate(d * 120 * s, 0); x.rotate(-tilt); R(x, INK, -2 * s, 0, 4 * s, 70 * s); box(x, -50 * s, 70 * s, 100 * s, 14 * s, GOLD, { b: 5 }); x.restore() }
  x.restore()
}
/** a cork board with pinned notes and red string (n notes visible) */
export function stringBoard(x, t, cx, cy, n = 6, { w = 520, h = 380, notes = [] } = {}) {
  box(x, cx - w / 2, cy - h / 2, w, h, '#b07a48', { b: 8 })
  const P = [[-0.32, -0.28], [0.3, -0.3], [-0.05, 0.02], [0.33, 0.22], [-0.33, 0.26], [0.05, -0.32], [0.1, 0.3]]
  const pts = P.slice(0, Math.min(n, P.length)).map(([a, b]) => [cx + a * w, cy + b * h])
  x.save(); x.strokeStyle = '#e8344e'; x.lineWidth = 5
  for (let i = 1; i < pts.length; i++) { x.beginPath(); x.moveTo(...pts[i - 1]); x.lineTo(...pts[i]); x.stroke() }
  if (pts.length > 3) { x.beginPath(); x.moveTo(...pts[0]); x.lineTo(...pts[3]); x.stroke() }
  x.restore()
  pts.forEach(([px, py], i) => {
    x.save(); x.translate(px, py); x.rotate((i % 3 - 1) * 0.1)
    R(x, INK, -66, -40, 132, 80); R(x, ['#fff3a8', '#ffd1de', '#c9f2d4', '#d9e6ff'][i % 4], -62, -36, 124, 72)
    if (notes[i]) { x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = INK; x.fillText(notes[i], 0, 2) }
    x.restore()
    R(x, INK, px - 9, py - 49, 18, 18); R(x, '#e8344e', px - 6, py - 46, 12, 12)
  })
  void t
}
/** a bed with a blanket (k 0…1 = blanket thrown off) */
export function bed(x, cx, cy, { w = 620, col = '#5a6ad8', k = 0 } = {}) {
  box(x, cx - w / 2, cy - 60, w, 90, '#8a5a3a', { b: 6 })
  box(x, cx - w / 2 - 10, cy - 180, 40, 210, '#8a5a3a', { b: 6 })
  box(x, cx - w / 2 + 40, cy - 100, 150, 50, '#f4ecdc', { b: 5 })
  x.save(); x.translate(cx + 60 + k * 260, cy - 90 - k * 120); x.rotate(k * 0.6)
  box(x, -w * 0.38, -20, w * 0.76, 60, col, { b: 6, hi: 'rgba(255,255,255,0.22)' }); x.restore()
}
export function table(x, cx, cy, w = 560, col = '#8a5a3a', cloth = null) {
  box(x, cx - w / 2, cy, w, 30, col, { b: 6 })
  if (cloth) R(x, cloth, cx - w / 2, cy, w, 20)
  R(x, INK, cx - w / 2 + 30, cy + 30, 22, 220); R(x, INK, cx + w / 2 - 52, cy + 30, 22, 220)
}

// ── the sets. Every set is a full-frame backdrop (camera space, 1080 × 1920), floor line about y = 1180.
const WALLS = {
  bed: ['#2a2350', '#3a2f6a'], cafe: ['#3a2430', '#4e3040'], street: null, kitchen: ['#24384a', '#2f4a5e'],
  dinner: ['#43262a', '#5a3236'], wedding: ['#2e2a52', '#3e3870'], hall: ['#2c2c44', '#3a3a5a'], office: ['#22323a', '#2c4048'],
  sofa: ['#2e2448', '#3d305e'], door: ['#33284a', '#43345e'], studio: ['#1a1430', '#241c40'],
}
export function room(x, t, kind, { dark = 0, warm = 0, snow = 0, lamps = true } = {}) {
  const W = WALLS[kind]
  if (kind === 'street') {
    // night street: sky band is the shared sky (painted by the engine), buildings + pavement
    for (let i = 0; i < 6; i++) {
      const bx = i * 200 - 40, bh = 520 + (i * 137 % 260)
      box(x, bx, 1180 - bh, 190, bh, i % 2 ? '#2a2246' : '#231c3c', { b: 5 })
      for (let j = 0; j < 6; j++) for (let k = 0; k < 2; k++) { const on = ((i * 7 + j * 3 + k) % 4) !== 0; R(x, on ? '#ffd98a' : '#3a3260', bx + 30 + k * 80, 1180 - bh + 40 + j * 80, 46, 46) }
    }
    R(x, INK, 0, 1180, 1080, 14); R(x, '#3a3456', 0, 1194, 1080, 726)
    for (let i = 0; i < 8; i++) R(x, '#2c2848', i * 150, 1194, 6, 726)
    // lamp posts
    if (lamps) for (const lx of [150, 900]) { R(x, INK, lx - 10, 760, 20, 430); box(x, lx - 36, 730, 72, 40, '#ffe7a8', { b: 6 }); x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(lx, 760, 10, lx, 760, 320); g.addColorStop(0, 'rgba(255,220,150,0.35)'); g.addColorStop(1, 'rgba(255,220,150,0)'); x.fillStyle = g; x.fillRect(lx - 320, 440, 640, 640); x.restore() }
  } else {
    const [a, b] = W
    R(x, a, 0, 0, 1080, 1180); for (let i = 0; i < 11; i++) R(x, b, i * 104, 0, 52, 1180)
    R(x, INK, 0, 1180, 1080, 14)
    R(x, kind === 'wedding' ? '#e8dcc6' : kind === 'kitchen' ? '#d6d0c0' : '#5a3a2a', 0, 1194, 1080, 726)
    for (let i = 0; i < 9; i++) R(x, kind === 'wedding' || kind === 'kitchen' ? 'rgba(0,0,0,0.08)' : 'rgba(0,0,0,0.18)', 0, 1240 + i * 80, 1080, 6)
    if (kind === 'bed' || kind === 'sofa' || kind === 'door') {
      // a night window with the moon
      box(x, 660, 300, 300, 360, '#0f1440', { b: 10 })
      R(x, '#1d2660', 670, 310, 280, 340); R(x, INK, 806, 300, 10, 360); R(x, INK, 660, 476, 300, 10)
      x.fillStyle = '#fff3c8'; x.beginPath(); x.arc(890, 380, 34, 0, Math.PI * 2); x.fill()
      for (let i = 0; i < 7; i++) R(x, '#fffbe0', 690 + (i * 97 % 240), 330 + (i * 53 % 300), 5, 5)
    }
    if (kind === 'cafe') {
      box(x, 90, 260, 900, 380, '#1a1838', { b: 10 })
      for (let i = 0; i < 8; i++) R(x, ['#ffd98a', '#ff9bbf', '#9fe8ff'][i % 3], 130 + i * 110, 300 + (i % 2) * 20, 24, 24)
      R(x, INK, 90, 440, 900, 10)
      // string lights
      for (let i = 0; i < 12; i++) { const lx = 40 + i * 92, ly = 190 + Math.sin(i * 0.9) * 16; R(x, INK, lx - 9, ly - 9, 18, 22); R(x, Math.floor(t * 2 + i) % 3 ? '#ffe7a8' : '#ffb3c8', lx - 6, ly - 6, 12, 16) }
    }
    if (kind === 'kitchen') {
      box(x, 60, 640, 960, 70, '#8a6a4a', { b: 6 }); for (let i = 0; i < 4; i++) box(x, 90 + i * 240, 300, 200, 220, '#3c5a70', { b: 6, hi: 'rgba(255,255,255,0.12)' })
      box(x, 0, 1000, 1080, 40, '#b8a888', { b: 6 })
    }
    if (kind === 'dinner') {
      // a long holiday table: garland, candles
      for (let i = 0; i < 10; i++) { const gx = 40 + i * 110; x.save(); x.fillStyle = '#2f8a4a'; x.beginPath(); x.arc(gx, 180, 40, 0, Math.PI); x.fill(); x.restore(); R(x, i % 2 ? '#e8344e' : GOLD, gx - 8, 214, 16, 16) }
      box(x, 140, 300, 260, 320, '#2a1838', { b: 8 }); box(x, 680, 300, 260, 320, '#2a1838', { b: 8 })
      for (const fx of [270, 810]) for (let i = 0; i < 5; i++) R(x, '#ffd98a', fx - 90 + i * 40, 340 + (i % 2) * 120, 10, 10)
    }
    if (kind === 'wedding') {
      // a floral arch
      x.save(); x.strokeStyle = INK; x.lineWidth = 40; x.beginPath(); x.arc(540, 700, 340, Math.PI, 0); x.stroke(); x.strokeStyle = '#f4ecdc'; x.lineWidth = 26; x.stroke(); x.restore()
      R(x, INK, 180, 690, 40, 500); R(x, '#f4ecdc', 186, 690, 28, 500); R(x, INK, 860, 690, 40, 500); R(x, '#f4ecdc', 866, 690, 28, 500)
      for (let i = 0; i < 14; i++) { const a = Math.PI + i / 13 * Math.PI; heart(x, 540 + Math.cos(a) * 340, 700 + Math.sin(a) * 340, 5, i % 2 ? PINK : '#fff0f6') }
    }
    if (kind === 'hall') { for (const dx of [80, 420, 760]) { box(x, dx, 540, 240, 640, '#6a4a3a', { b: 8 }); R(x, GOLD, dx + 190, 860, 20, 20) } }
    if (kind === 'office') { box(x, 120, 300, 360, 260, '#1a2a44', { b: 8 }); for (let i = 0; i < 5; i++) R(x, '#7fe3ff', 150 + i * 60, 520 - i * 40, 40, i * 40 + 20); box(x, 620, 300, 340, 260, '#e8e0cc', { b: 8 }) }
    if (kind === 'studio') { for (const sx of [180, 900]) { x.save(); x.globalCompositeOperation = 'lighter'; x.fillStyle = 'rgba(255,240,200,0.06)'; x.beginPath(); x.moveTo(sx - 30, 0); x.lineTo(sx + 30, 0); x.lineTo(sx + 260, 1200); x.lineTo(sx - 260, 1200); x.fill(); x.restore() } }
  }
  if (snow > 0) { x.save(); x.globalAlpha = snow; for (let i = 0; i < 60; i++) { const sx = (i * 173 + t * (30 + i % 5 * 8)) % 1080, sy = (i * 311 + t * (90 + i % 7 * 12)) % 1920; R(x, '#ffffff', sx, sy, 7, 7) } x.restore() }
  if (warm > 0) { x.save(); x.globalCompositeOperation = 'lighter'; x.fillStyle = `rgba(255,170,90,${0.12 * warm})`; x.fillRect(0, 0, 1080, 1920); x.restore() }
  if (dark > 0) { x.save(); x.fillStyle = `rgba(6,4,18,${0.6 * dark})`; x.fillRect(0, 0, 1080, 1920); x.restore() }
}

// ── the phone: P = { cx, cy, w, h, rot, pop, title, clock, lines: [{ from: 'me'|'them'|name, text, at }], typing: [a, b], accent }
export function phone(x, t, P) {
  const { cx = 540, cy = 900, w = 480, h = 820, rot = 0, pop = 1, title = '', clock = '9:41', lines = [], typing = null, accent = '#5a8cff', size = 30, unread = null, glow = 0 } = P
  if (pop <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(pop, pop)
  if (glow > 0) { x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(0, 0, w * 0.3, 0, 0, w * 1.1); g.addColorStop(0, rgba(accent, 0.3 * glow)); g.addColorStop(1, rgba(accent, 0)); x.fillStyle = g; x.fillRect(-w * 1.2, -h, w * 2.4, h * 2); x.restore() }
  box(x, -w / 2, -h / 2, w, h, '#1a1430', { b: 10 })
  R(x, '#f6f2ea', -w / 2 + 16, -h / 2 + 16, w - 32, h - 32)
  R(x, '#e4ddd0', -w / 2 + 16, -h / 2 + 16, w - 32, 96)
  x.textBaseline = 'middle'
  x.font = `700 20px ${MONO}`; x.fillStyle = INK; x.textAlign = 'left'; x.fillText(clock, -w / 2 + 34, -h / 2 + 38)
  x.font = `800 28px ${INTER}`; x.textAlign = 'center'; x.fillText(title, 0, -h / 2 + 80)
  if (unread) { x.font = `800 22px ${INTER}`; const uw = x.measureText(unread).width + 24; R(x, RED, w / 2 - 34 - uw, -h / 2 + 26, uw, 30); x.fillStyle = '#fff'; x.fillText(unread, w / 2 - 34 - uw / 2, -h / 2 + 42) }
  // the thread: bottom-anchored, newest at the bottom
  x.save(); x.beginPath(); x.rect(-w / 2 + 16, -h / 2 + 112, w - 32, h - 128); x.clip()
  const shown = lines.filter(l => t >= l.at)
  let y = h / 2 - 40
  if (typing && t >= typing[0] && t < typing[1]) {
    R(x, INK, -w / 2 + 34, y - 52, 110, 56); R(x, '#ddd6ea', -w / 2 + 38, y - 48, 102, 48)
    for (let i = 0; i < 3; i++) { const b = Math.sin(t * 12 - i) * 5; R(x, '#6a6488', -w / 2 + 56 + i * 26, y - 30 + b, 14, 14) }
    y -= 76
  }
  x.font = `700 ${size}px ${INTER}`
  for (let i = shown.length - 1; i >= 0; i--) {
    const l = shown[i], me = l.from === 'me', k = pop01(t, l.at, 0.22, 2.4)
    const rows = wrap(x, l.text, w - 150), bh = rows.length * size * 1.2 + 28
    const bw = Math.max(...rows.map(r => x.measureText(r).width)) + 40
    const bx = me ? w / 2 - 34 - bw : -w / 2 + 34
    x.save(); x.translate(bx + (me ? bw : 0), y); x.scale(k, k); x.translate(-(bx + (me ? bw : 0)), -y)
    R(x, INK, bx - 4, y - bh - 4, bw + 8, bh + 8); R(x, me ? accent : '#ddd6ea', bx, y - bh, bw, bh)
    x.fillStyle = me ? '#ffffff' : INK; x.textAlign = 'left'
    let ty = y - bh + 14 + size * 0.6
    if (l.from !== 'me' && l.from !== 'them') { x.font = `800 ${Math.round(size * 0.62)}px ${INTER}`; x.fillStyle = l.col ?? '#7a3a9a'; x.fillText(l.from, bx + 20, y - bh - 18); x.fillStyle = INK; x.font = `700 ${size}px ${INTER}` }
    for (const r of rows) { x.fillText(r, bx + 20, ty); ty += size * 1.2 }
    x.restore()
    y -= bh + (l.from !== 'me' && l.from !== 'them' ? 50 : 22)
    if (y < -h / 2 + 100) break
  }
  x.restore()
  x.restore()
}
export function wrap(x, text, maxW) {
  const words = String(text).split(' '), rows = []
  let cur = ''
  for (const w of words) { const n = cur ? cur + ' ' + w : w; if (x.measureText(n).width > maxW && cur) { rows.push(cur); cur = w } else cur = n }
  if (cur) rows.push(cur)
  return rows
}

// ── the SIGN SWAP bug: a tiny ⇄ swap icon + "SIGN SWAP" (Inter 800, letter-spaced small caps, gold)
const SWAP_ICON = ['....A.......', 'AAAAAA......', '....A.......', '.......B....', '......BBBBBB', '.......B....']
export function buildBug(root, { at = 0 } = {}) {
  const b = el('div', { position: 'absolute', left: '56px', top: '64px', height: '44px', display: 'flex', alignItems: 'center', gap: '14px', transformOrigin: '0% 50%', pointerEvents: 'none' }, root)
  const ic = el('canvas', { width: '60px', height: '36px', imageRendering: 'pixelated' }, b)
  ic.width = 60; ic.height = 36
  drawBits(ic.getContext('2d'), SWAP_ICON, { A: GOLD, B: PINK }, 30, 18, 4.4)
  el('div', { font: `800 28px ${INTER}`, letterSpacing: '0.22em', color: GOLD, textShadow: '0 2px 12px rgba(6,4,18,0.9)', whiteSpace: 'nowrap', fontVariant: 'small-caps' }, b, 'SIGN&nbsp;SWAP')
  return { update(t, out = 1) { const k = t < at ? 0 : 1; b.style.display = k * out <= 0.01 ? 'none' : 'flex'; b.style.opacity = String(clamp(out)) } }
}
