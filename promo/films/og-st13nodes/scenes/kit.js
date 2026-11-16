// st12sunsign kit — the Moon and the Sun for this episode only (copied, per the Star Talk "copy, don't share" rule, from
// st8auction/scenes/kit.js (drawMoonChar) and stsupernova/scenes/props.js (drawSun)). Pure f(t); nothing touches
// `document` at module top level (the Sun's sprite buffer is made lazily on the first draw).
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { easeOutBack } from '../../wheel.js'

const TAU = Math.PI * 2
export const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }
const BM = s => s.trim().split(/\s+/)
const canvasOf = (w, h) => (typeof OffscreenCanvas !== 'undefined' ? new OffscreenCanvas(w, h) : Object.assign(document.createElement('canvas'), { width: w, height: h }))
export function glowAt(ctx, x, y, r, color, a) {
  if (a <= 0 || r <= 0) return
  ctx.save(); ctx.globalCompositeOperation = 'lighter'
  const g = ctx.createRadialGradient(x, y, 0, x, y, r)
  g.addColorStop(0, rgba(color, 0.5 * a)); g.addColorStop(0.4, rgba(color, 0.2 * a)); g.addColorStop(1, rgba(color, 0))
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill()
  ctx.restore()
}

// ─────────────────────────────────────────────── the star sprite's grid (the same geometry as startalk.js)
const G = 36, HALF = 18
const SG = 60, SCX = 30, SDR = 17.5
const SUN = { body: '#ffcc4a', core: '#ffe486', light: '#fff2b8', shade: '#f6a234', deep: '#e57d22', line: '#7f3410', ray: '#ffb83a', rayHi: '#ffe08a', rayLine: '#93400f', blush: '#ff7a6e' }
const SUN_EYES = {
  open: BM(`.XXXX. XWWXXX XWWXXX XWXXXX XXXXXX XXXXXX XXXXWX .XXXX.`),
  half: BM(`...... ...... ...... XXXXXX XXXXXX XWXXXX XXXXWX .XXXX.`),
  shut: BM(`...... ...... ...... ...... ...... XXXXXX .XXXX. ......`),
  happy: BM(`...... ...... .XXXX. XXXXXX XX..XX X....X ...... ......`),
}
let SUN_BUF = null
function paintSun(t, eyeL, eyeR, lx, ly, blush) {
  if (!SUN_BUF) { const c = canvasOf(SG, SG); SUN_BUF = { c, x: c.getContext('2d') } }
  const x = SUN_BUF.x
  x.clearRect(0, 0, SG, SG)
  const px = (i, j, col) => { x.fillStyle = col; x.fillRect(i, j, 1, 1) }
  const Lx = -0.62, Ly = -0.78
  // rays: 12 chunky triangles, long and short in turn
  for (let j = 0; j < SG; j++) for (let i = 0; i < SG; i++) {
    const dx = i + 0.5 - SCX, dy = j + 0.5 - SCX, d = Math.hypot(dx, dy)
    if (d < SDR - 0.2 || d > 26.5) continue
    const a = Math.atan2(dy, dx) + Math.PI / 2, k = Math.round(a / (TAU / 12)), off = a - k * TAU / 12
    const len = k % 2 ? 23.6 : 26.2, wid = (1 - (d - SDR) / (len - SDR)) * 0.19
    if (d > SDR && d < len && Math.abs(off) < wid) px(i, j, Math.abs(off) < wid - 0.075 ? (dx * Lx + dy * Ly > 0 ? SUN.rayHi : SUN.ray) : SUN.rayLine)
  }
  // the disc, lit from the upper-left
  for (let j = 0; j < SG; j++) for (let i = 0; i < SG; i++) {
    const dx = i + 0.5 - SCX, dy = j + 0.5 - SCX, d = Math.hypot(dx, dy)
    if (d > SDR + 0.9) continue
    if (d > SDR) { px(i, j, SUN.line); continue }
    const f = (dx * Lx + dy * Ly) / (d || 1)
    let col = SUN.body
    if (d > SDR - 1.4 && f < -0.2) col = SUN.deep
    else if (d > SDR - 2.6 && f < -0.05) col = SUN.shade
    else if (d > SDR - 1.6 && f > 0.25) col = SUN.light
    else if (d < 9) col = SUN.core
    px(i, j, col)
  }
  for (const [i, j] of [[19, 16], [20, 15], [21, 14], [18, 17], [22, 14]]) px(i, j, '#fffbe6')
  if (blush > 0) { x.globalAlpha = blush; for (const i of [18, 19, 20, 40, 41, 42]) { px(i, 35, SUN.blush); px(i, 36, SUN.blush) } x.globalAlpha = 1 }
  const put = (bm, x0, y0) => bm.forEach((row, jj) => [...row].forEach((ch, ii) => { if (ch !== '.') px(x0 + ii, y0 + jj, ch === 'X' ? '#1b1236' : '#ffffff') }))
  put(eyeL, 21 + (eyeL === SUN_EYES.open ? lx : 0), 26 + (eyeL === SUN_EYES.open ? ly : 0))
  put(eyeR, 33 + (eyeR === SUN_EYES.open ? lx : 0), 26 + (eyeR === SUN_EYES.open ? ly : 0))
  return SUN_BUF.c
}
const lidOf = (k, base) => (k >= 0.75 ? SUN_EYES.shut : k >= 0.25 ? SUN_EYES.half : base)
/** the Sun centred at x, y; cell = px per sprite cell (disc ≈ 35 cells across). eyes: 'open' | 'half' | 'happy';
 *  wink 0…1 closes the right eye into a happy arc; blink 0…1 both lids; rot = roll angle (radians) */
export function drawSun(ctx, x, y, cell, t, { rot = 0, eyes = 'half', look = [0, 0], wink = 0, blink = 0, glow = 1, alpha = 1, k = 1, blush = 0.7 } = {}) {
  if (alpha <= 0 || k <= 0) return
  const base = SUN_EYES[eyes] || SUN_EYES.half
  const lx = clamp(Math.round(look[0]), -1, 1), ly = clamp(Math.round(look[1]), -1, 1)
  const eL = lidOf(blink, base), eR = wink >= 0.6 ? SUN_EYES.happy : wink >= 0.25 ? SUN_EYES.half : lidOf(blink, base)
  const img = paintSun(t, eL, eR, lx, ly, blush)
  const S = SG * cell * k
  ctx.save(); ctx.globalAlpha *= alpha
  glowAt(ctx, x, y, S * 0.95, '#ff9a2e', glow * (0.85 + 0.15 * Math.sin(t * 1.7)))
  glowAt(ctx, x, y, S * 0.5, '#ffd66a', glow * 0.55)
  ctx.translate(Math.round(x), Math.round(y)); ctx.rotate(rot)
  const sm = ctx.imageSmoothingEnabled; ctx.imageSmoothingEnabled = false
  ctx.drawImage(img, -S / 2, -S / 2, S, S)
  ctx.imageSmoothingEnabled = sm
  ctx.restore()
}

// ─────────────────────────────────────────────── the supernova
export const MOON = { tag: '☽ THE MOON', color: '#e9e4ff' }
export function hopState(t, hops) {
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
const CRATERS = [[-0.35, -0.3, 0.16], [0.3, 0.38, 0.2], [0.42, -0.42, 0.1], [-0.2, 0.5, 0.09]]
export function drawMoonChar(x, cx, cy, r, t, { mood = 'neutral', look = [0, 0], blink, pop = 1, hops = null, seed = 3, alpha = 1, glow = 1, blush = null } = {}) {
  if (pop <= 0 || alpha <= 0) return { x: cx, y: cy, r, top: cy - r }
  const hs = hopState(t, hops)
  const R = r * pop, N = 22, c = Math.max(2, Math.round(2 * R / N))
  const y = cy + Math.sin(t * 1.9 + seed) * r * 0.04 - hs.lift * r * 0.18
  x.save(); x.globalAlpha *= alpha
  // glow
  x.save(); x.globalCompositeOperation = 'lighter'
  const g = x.createRadialGradient(cx, y, R * 0.6, cx, y, R * 1.9)
  g.addColorStop(0, rgba('#d9d0ff', 0.32 * glow)); g.addColorStop(1, 'rgba(217,208,255,0)')
  x.fillStyle = g; x.fillRect(cx - R * 2, y - R * 2, R * 4, R * 4); x.restore()
  x.translate(Math.round(cx), Math.round(y)); x.scale(1 + hs.sq, 1 - hs.sq * 0.9)
  const h = N / 2
  for (let j = 0; j < N; j++) for (let i = 0; i < N; i++) {
    const u = (i + 0.5 - h) / h, v = (j + 0.5 - h) / h, d = Math.hypot(u, v)
    if (d > 1) continue
    const crat = CRATERS.some(([a, b, rr]) => Math.hypot(u - a, v - b) < rr)
    x.fillStyle = d > 0.9 ? '#2a2148' : crat ? '#c8bfe3' : d > 0.78 ? '#b9b0d8' : u + v < -0.8 ? '#fffbea' : MOON.color
    x.fillRect((i - h) * c, (j - h) * c, c + 0.5, c + 0.5)
  }
  // eyes
  const shut = typeof blink === 'number' ? blink > 0.5 : blink === false ? false : ((t + seed * 0.7) % 3.4) < 0.12
  const [lx, ly] = look
  for (const s of [-1, 1]) {
    const ex = s * 4 * c, ey = -1 * c
    if (mood === 'happy' || shut || mood === 'sleepy') {
      x.fillStyle = '#1b1236'
      if (mood === 'happy') { x.fillRect(ex - 1.5 * c, ey, c, c); x.fillRect(ex - 0.5 * c, ey - c, c, c); x.fillRect(ex + 0.5 * c, ey, c, c) }
      else x.fillRect(ex - 1.5 * c, ey, 3 * c, c)
      continue
    }
    if (mood === 'heart') {
      x.fillStyle = '#ff4f86'
      x.fillRect(ex - 1.5 * c, ey - c, c, c); x.fillRect(ex + 0.5 * c, ey - c, c, c); x.fillRect(ex - 1.5 * c, ey, 3 * c, c); x.fillRect(ex - 0.5 * c, ey + c, c, c)
      continue
    }
    const wide = mood === 'wide'
    x.fillStyle = '#ffffff'; x.fillRect(ex - (wide ? 1.5 : 1) * c, ey - (wide ? 2 : 1.5) * c, (wide ? 3 : 2) * c, (wide ? 4 : 3) * c)
    x.fillStyle = '#1b1236'; x.fillRect(ex - 0.5 * c + Math.round(lx) * c * 0.6, ey - 0.5 * c + Math.round(ly) * c * 0.6, c, c * (wide ? 1 : 1.5))
  }
  const bl = blush ?? (['happy', 'heart'].includes(mood) ? 0.8 : 0)
  if (bl > 0) { x.fillStyle = rgba('#ffb3cc', 0.7 * bl); for (const s of [-1, 1]) x.fillRect(s * 6 * c - c, 2 * c, 2 * c, c) }
  x.restore()
  return { x: cx, y, r: R, top: y - R }
}
