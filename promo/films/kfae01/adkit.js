// FAKE AD show kit (batch m31, kfae01–kfae24, promo/films/month2/m31.md). Imported read-only by kfae02–kfae24.
// A late-night infomercial parody: grainy black-and-white BEFORE footage of one sign mid-disaster (frame 0 = thumbnail +
// hook line), a record-scratch freeze, a colour flash into the loud infomercial set, "INTRODUCING…", a fictional product
// box slams in, opens, and the product is the real healthy tip. Pisces is the studio testimonial and always cries.
// No end card, no card cut, no logo: the ad ends on its punchline (hard cut) or eases back into frame 0 (loop).
//
//   makeAd(cfg) → { DURATION, SCENES, CUES, T }      the whole short ad (6–12 s) from one config, see the bottom
//   pieces for the long ads (kfae23/24): drawBox, drawTipCard, drawStarburst, drawPhone, bubble, label, motion,
//   flyer, drawTears, pisces, hero, BWLayer, buildBug, buildHead, buildLower, buildFine, adCues …
// Pure f(t); nothing touches `document` at module top level (the sound build imports this file).
import { clamp, lerp, prog, ease, el } from '../../src/lib.js'
import { fill } from '../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas, drawPixelStar } from '../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../wheel.js'
import { drawStarChar, signStar } from '../startalk.js'
import * as HK from '../hookkit.js'
import { frozen } from '../hookkit.js'

export const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', RED = '#ff3b4e', HOT = '#ff2f8a'
export const YEL = '#ffe14d', CYAN = '#5fe3ff', MINT = '#7dffb0', LAV = '#c9a6ff', BOXR = '#ff4f6d', BOXB = '#3a6cff'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const SERIF = "'EB Garamond', Georgia, serif"
export const MONO = "'Space Mono', ui-monospace, monospace"
export const SHADOW = '0 4px 26px rgba(6,4,18,0.92), 0 0 4px rgba(6,4,18,0.7)'
export const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
export const r3 = v => +v.toFixed(3)
export { clamp, lerp, prog, ease, el, easeOutBack, drawPixelStar, signStar, drawStarChar, HK }

// ─────────────────────────────────────────────── characters
/** a sign star: hero(x, t, { sign, x, y, s, mood, look, hops, pop, alpha, rot, tears, seed }) */
export function star(x, t, o) {
  const S = signStar(o.sign)
  const k = o.pop ?? 1
  if (k <= 0.01 || (o.alpha ?? 1) <= 0.01) return
  x.save()
  if (o.rot) { x.translate(o.x, o.y); x.rotate(o.rot); x.translate(-o.x, -o.y) }
  drawStarChar(x, o.x, o.y, o.s, t, { color: S.color, glyph: o.glyph === false ? null : S.glyph, mood: o.mood || 'neutral', look: o.look, hops: o.hops, pop: k, seed: o.seed ?? 3, glow: o.glow ?? 1, alpha: o.alpha ?? 1, blush: o.blush, blink: o.blink })
  if (o.tears) drawTears(x, t, o.x, o.y, o.s * k, o.tears, o.hops, o.seed ?? 3)
  x.restore()
}

// tears seated on the sprite (mirrors startalk's sprite frame: 36 cells, eyes on rows ~20)
const G = 36, HALF = 18, FOOT_ROW = 19.6 + 17.6 * Math.cos(Math.PI / 5)
function hopLift(t, hops) {
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
/** k: 1 sniffle · 2 streams · 3 fountains */
export function drawTears(ctx, t, x, y, size, k, hops, seed = 3) {
  if (k <= 0 || size <= 0) return
  const cell = size >= 100 ? Math.max(1, Math.round(size / G)) : size / G, S = cell * G
  const hs = hopLift(t, hops)
  const sq = hs.sq + 0.018 * Math.sin(t * 3.1 + seed * 1.7)
  const cy = y + Math.sin(t * 2.2 + seed * 2.1) * size * 0.035 - hs.lift * size * 0.09
  const base = (FOOT_ROW - HALF) * cell
  ctx.save(); ctx.translate(Math.round(x), Math.round(cy + base)); ctx.scale(1 + sq, 1 - sq * 0.9); ctx.translate(-S / 2, -S / 2 - base); ctx.scale(cell, cell)
  const drop = (i, j) => { ctx.fillStyle = INK; ctx.fillRect(i - 0.15, j - 0.15, 1.3, 1.7); ctx.fillStyle = '#8fe3ff'; ctx.fillRect(i, j, 1, 1.4); ctx.fillStyle = '#ffffff'; ctx.fillRect(i, j, 0.5, 0.5) }
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
    ctx.fillStyle = '#8fe3ff'; ctx.fillRect(d < 0 ? 10 : 20, 23.2, 6, 0.9)
  }
  ctx.restore()
}

// ─────────────────────────────────────────────── props (canvas)
export function R(x, c, a, b, w, h) { x.fillStyle = c; x.fillRect(a, b, w, h) }
/** a chunky pixel box with an ink border and a top highlight */
export function block(x, a, b, w, h, col, { bw = 7, hi = 'rgba(255,255,255,0.22)' } = {}) {
  R(x, INK, a - bw, b - bw, w + bw * 2, h + bw * 2); R(x, col, a, b, w, h); if (hi) R(x, hi, a, b, w, Math.max(4, h * 0.08))
}
/** wrap text to width (canvas font must be set) */
export function wrap(x, text, maxW) {
  const out = []
  for (const para of String(text).split('|')) {
    let line = ''
    for (const w of para.trim().split(/\s+/)) {
      const tryL = line ? line + ' ' + w : w
      if (x.measureText(tryL).width > maxW && line) { out.push(line); line = w } else line = tryL
    }
    if (line) out.push(line)
  }
  return out
}
/** a speech bubble (pops at t0, gone after t1) */
export function bubble(x, t, cx, cy, t0, t1, text, { size = 34, col = BONE, ink = INK, tail = 0, maxW = 520, weight = 700, font = INTER, life = 99 } = {}) {
  if (t < t0 || t > Math.min(t1, t0 + life)) return
  const k = pop01(t, t0, 0.24, 2.4) * outK(t, [t1 - 0.12, t1])
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.font = `${weight} ${size}px ${font}`
  const L = wrap(x, text, maxW), lh = size * 1.18
  const w = Math.max(...L.map(l => x.measureText(l).width)) + 44, h = L.length * lh + 26
  R(x, ink, -w / 2 - 5, -h / 2, w + 10, h); R(x, ink, -w / 2, -h / 2 - 5, w, h + 10)
  R(x, col, -w / 2, -h / 2, w, h)
  const tx = tail * w * 0.35
  R(x, ink, tx - 14, h / 2 + 2, 22, 14); R(x, col, tx - 9, h / 2 - 2, 12, 12)
  x.fillStyle = ink; x.textAlign = 'center'; x.textBaseline = 'middle'
  L.forEach((l, i) => x.fillText(l, 0, -h / 2 + 13 + lh * (i + 0.5) + 1))
  x.restore()
}
/** bold text with an ink outline */
export function label(x, text, cx, cy, { size = 48, col = BONE, rot = 0, weight = 900, font = INTER, k = 1, alpha = 1, stroke = INK, sw = 0.16, align = 'center' } = {}) {
  if (k <= 0.01 || alpha <= 0.01) return
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.font = `${weight} ${size}px ${font}`; x.textAlign = align; x.textBaseline = 'middle'; x.lineJoin = 'round'
  if (stroke) { x.strokeStyle = stroke; x.lineWidth = size * sw; x.strokeText(text, 0, 0) }
  x.fillStyle = col; x.fillText(text, 0, 0)
  x.restore()
}
/** a pixel phone (screen fn draws inside a 0..w × 0..h screen) */
export function drawPhone(x, cx, cy, { w = 300, h = 540, rot = 0, k = 1, screen = null, t = 0, glow = 0 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  if (glow > 0) { x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(0, 0, 0, 0, 0, h); g.addColorStop(0, `rgba(170,210,255,${0.25 * glow})`); g.addColorStop(1, 'rgba(170,210,255,0)'); x.fillStyle = g; x.fillRect(-h, -h, h * 2, h * 2); x.restore() }
  block(x, -w / 2, -h / 2, w, h, '#2a2148', { bw: 8 })
  R(x, '#120d26', -w / 2 + 16, -h / 2 + 40, w - 32, h - 80)
  R(x, '#5a5470', -30, -h / 2 + 16, 60, 10)
  if (screen) { x.save(); x.translate(-w / 2 + 16, -h / 2 + 40); x.beginPath(); x.rect(0, 0, w - 32, h - 80); x.clip(); screen(x, w - 32, h - 80, t); x.restore() }
  x.restore()
}
/** chat bubbles inside a phone screen: msgs [{ side:'L'|'R', text, at }] (newest at the bottom) */
export function chat(x, t, W, H, msgs, { size = 22, title = null, read = null } = {}) {
  if (title) { R(x, '#1e1740', 0, 0, W, 54); x.font = `700 ${size}px ${INTER}`; x.fillStyle = BONE; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(title, W / 2, 28) }
  const shown = msgs.filter(m => t >= m.at)
  let y = H - 18
  x.font = `600 ${size}px ${INTER}`
  if (read && t >= read.at) { x.font = `700 ${size - 4}px ${MONO}`; x.fillStyle = 'rgba(239,230,214,0.7)'; x.textAlign = 'right'; x.textBaseline = 'alphabetic'; x.fillText(read.text, W - 14, y); y -= size + 8; x.font = `600 ${size}px ${INTER}` }
  for (let i = shown.length - 1; i >= 0 && y > 60; i--) {
    const m = shown[i], L = wrap(x, m.text, W * 0.66), lh = size * 1.2
    const bw = Math.max(...L.map(l => x.measureText(l).width)) + 26, bh = L.length * lh + 16
    const k = easeOutBack(prog(t, m.at, m.at + 0.22), 2)
    const bx = m.side === 'R' ? W - 12 - bw : 12
    x.save(); x.translate(bx + bw / 2, y - bh / 2); x.scale(k, k)
    R(x, m.side === 'R' ? '#4f7cff' : '#3a3260', -bw / 2, -bh / 2, bw, bh)
    x.fillStyle = BONE; x.textAlign = 'left'; x.textBaseline = 'middle'
    L.forEach((l, j) => x.fillText(l, -bw / 2 + 13, -bh / 2 + 8 + lh * (j + 0.5)))
    x.restore()
    y -= bh + 12
  }
}
/** speed lines radiating around a point (mid-action energy) */
export function motion(x, t, cx, cy, { r0 = 180, r1 = 320, n = 14, col = 'rgba(239,230,214,0.75)', w = 8, seed = 1, alpha = 1 } = {}) {
  if (alpha <= 0.01) return
  x.save(); x.globalAlpha *= alpha; x.fillStyle = col
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 + seed + Math.sin(t * 9 + i) * 0.05
    const j = ((Math.sin(i * 12.9898 + seed) * 43758.5453) % 1 + 1) % 1
    const ra = r0 + j * 40 + 20 * Math.sin(t * 17 + i * 2), rb = r1 + j * 60
    x.save(); x.translate(cx, cy); x.rotate(a); x.fillRect(ra, -w / 2, rb - ra, w); x.restore()
  }
  x.restore()
}
/** a thing flying across: drawFn(x) at its own origin, along a path p(t) → { x, y, rot } */
export function flyer(x, t, p, drawFn, alpha = 1) {
  const q = p(t); if (!q) return
  x.save(); x.globalAlpha *= alpha; x.translate(q.x, q.y); x.rotate(q.rot || 0); if (q.s) x.scale(q.s, q.s); drawFn(x); x.restore()
}
/** small pixel icons */
export const ICON = {
  heart: ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'],
  bubble: ['.WWWWWWW.', 'WWWWWWWWW', 'WDWWDWWDW', 'WWWWWWWWW', '.WWWWWWW.', '.WW......', 'W........'],
  zz: ['ZZZZ', '..Z.', '.Z..', 'ZZZZ'],
  clock: ['.WWWWW.', 'WWWDWWW', 'WWWDWWW', 'WWWDDWW', 'WWWWWWW', 'WWWWWWW', '.WWWWW.'],
  spark: ['..W..', '..W..', 'WWWWW', '..W..', '..W..'],
  mug: ['WWWWW..', 'WHHHWWW', 'WHHHW.W', 'WHHHWWW', 'WHHHW..', '.WWW...'],
  cal: ['RRRRRRR', 'WWWWWWW', 'WDWDWDW', 'WWWWWWW', 'WDWRWDW', 'WWWWWWW'],
  tea: ['..W....', '.WWW...', 'WWWWWWW', 'WMMMW.W', 'WMMMWW.', '.WWW...'],
  envelope: ['WWWWWWWWW', 'WDWWWWWDW', 'WWDWWWDWW', 'WWWDWDWWW', 'WWWWDWWWW', 'WWWWWWWWW'],
  question: ['.WWW.', 'W...W', '...W.', '..W..', '.....', '..W..'],
}
export const ICOL = { H: '#ff4f86', W: BONE, D: INK, R: RED, Z: BONE, M: '#c98a4a' }
export function bits(x, bm, cx, cy, cell, cols = ICOL, { rot = 0, alpha = 1 } = {}) {
  const w = bm[0].length, h = bm.length
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot)
  const ox = -w * cell / 2, oy = -h * cell / 2
  const on = (i, j) => j >= 0 && j < h && i >= 0 && i < w && bm[j][i] !== '.'
  x.fillStyle = INK
  for (let j = -1; j <= h; j++) for (let i = -1; i <= w; i++) if (!on(i, j) && (on(i + 1, j) || on(i - 1, j) || on(i, j + 1) || on(i, j - 1))) x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5)
  for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) { const ch = bm[j][i]; if (ch === '.') continue; x.fillStyle = cols[ch] || BONE; x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5) }
  x.restore()
}
/** a ring of pixel sparkles bursting at t0 */
export function sparkles(x, t, cx, cy, t0, n = 10, Rr = 160, seed = 1, cols = [GOLD, BONE, PINK]) {
  const tt = t - t0
  if (tt < 0 || tt > 0.7) return
  const p = ease.outCubic(tt / 0.7)
  x.save(); x.globalAlpha = 1 - ease.inQuad(tt / 0.7)
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 + seed
    drawPixelStar(x, cx + Math.cos(a) * Rr * (0.7 + 0.5 * p), cy + Math.sin(a) * Rr * (0.7 + 0.5 * p), 26 * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length])
  }
  x.restore()
}
/** hearts floating up from (cx, cy) from t0 */
export function hearts(x, t, cx, cy, t0, { n = 5, life = 1.6, cell = 6 } = {}) {
  for (let i = 0; i < n; i++) {
    const b = t0 + i * 0.16, p = prog(t, b, b + life)
    if (p <= 0 || p >= 1) continue
    bits(x, ICON.heart, cx + Math.sin(i * 2.3 + p * 5) * 60 + (i - n / 2) * 30, cy - p * 260, cell * (0.6 + 0.4 * Math.sin(Math.PI * p)), ICOL, { alpha: Math.sin(Math.PI * p) })
  }
}

// ─────────────────────────────────────────────── the infomercial set
/** spinning starburst rays (the loud colour set) */
export function drawStarburst(x, t, cx, cy, { k = 1, cols = ['#ff2f8a', '#ff8a2f'], n = 18, spin = 0.25, R0 = 1500 } = {}) {
  if (k <= 0.01) return
  x.save(); x.globalAlpha *= clamp(k); x.translate(cx, cy); x.rotate(t * spin)
  x.fillStyle = cols[0]; x.fillRect(-R0, -R0, R0 * 2, R0 * 2)
  x.fillStyle = cols[1]
  for (let i = 0; i < n; i++) { const a = (i / n) * Math.PI * 2; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(a) * R0, Math.sin(a) * R0); x.lineTo(Math.cos(a + Math.PI / n) * R0, Math.sin(a + Math.PI / n) * R0); x.closePath(); x.fill() }
  const g = x.createRadialGradient(0, 0, 0, 0, 0, R0 * 0.7)
  g.addColorStop(0, 'rgba(255,255,230,0.55)'); g.addColorStop(0.35, 'rgba(255,255,230,0.0)'); g.addColorStop(1, 'rgba(20,8,40,0.55)')
  x.fillStyle = g; x.fillRect(-R0, -R0, R0 * 2, R0 * 2)
  x.restore()
}
/** a jagged "NEW!" burst badge */
export function burstBadge(x, t, cx, cy, text = 'NEW!', { r = 92, col = YEL, k = 1, rot = -0.2, size = 40 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot + 0.06 * Math.sin(t * 6)); x.scale(k * (1 + 0.04 * Math.sin(t * 12)), k * (1 + 0.04 * Math.sin(t * 12)))
  const pts = 14
  const path = (rr) => { x.beginPath(); for (let i = 0; i < pts * 2; i++) { const a = (i / (pts * 2)) * Math.PI * 2, q = i % 2 ? rr * 0.74 : rr; x.lineTo(Math.cos(a) * q, Math.sin(a) * q) } x.closePath() }
  x.fillStyle = INK; path(r + 9); x.fill()
  x.fillStyle = col; path(r); x.fill()
  x.font = `900 ${size}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = RED; x.fillText(text, 0, 2)
  x.restore()
}
/** the product box: a chunky retail package. o: { name, sub, col, col2, icon, lid (0..1 open), k, rot } */
export function drawBox(x, t, cx, cy, o) {
  const k = o.k ?? 1
  if (k <= 0.01) return
  const W2 = o.w || 440, H2 = o.h || 380, col = o.col || BOXR, col2 = o.col2 || '#ffd23a'
  x.save(); x.translate(cx, cy); x.rotate(o.rot || 0); x.scale(k, k)
  // shadow
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-W2 / 2 + 24, -H2 / 2 + 30, W2, H2)
  // side face (depth)
  R(x, INK, W2 / 2 - 4, -H2 / 2 + 18, 52, H2); R(x, shade(col, -0.35), W2 / 2 + 3, -H2 / 2 + 26, 38, H2 - 14)
  // body
  block(x, -W2 / 2, -H2 / 2, W2, H2, col, { bw: 8 })
  // label band
  R(x, INK, -W2 / 2 + 22, -H2 / 2 + 92, W2 - 44, H2 * 0.46 + 8); R(x, col2, -W2 / 2 + 26, -H2 / 2 + 96, W2 - 52, H2 * 0.46)
  // the name (auto-fit)
  x.textAlign = 'center'; x.textBaseline = 'middle'
  const lines = String(o.name).split('|')
  let fs = o.nameSize || 64
  x.font = `900 ${fs}px ${INTER}`
  const widest = () => Math.max(...lines.map(l => x.measureText(l).width))
  while (widest() > W2 - 80 && fs > 26) { fs -= 2; x.font = `900 ${fs}px ${INTER}` }
  const cyN = -H2 / 2 + 96 + H2 * 0.23 - (lines.length - 1) * fs * 0.5
  lines.forEach((l, i) => { x.fillStyle = INK; x.fillText(l, 3, cyN + i * fs + 4); x.fillStyle = RED; x.fillText(l, 0, cyN + i * fs) })
  // tagline
  if (o.sub) { x.font = `700 24px ${MONO}`; x.fillStyle = BONE; x.fillText(o.sub.toUpperCase(), 0, H2 / 2 - 52) }
  // product icon on the corner
  if (o.icon) bits(x, ICON[o.icon] || o.icon, -W2 / 2 + 62, -H2 / 2 + 50, 6)
  // the lid (hinged at the back edge)
  const lid = o.lid || 0
  x.save(); x.translate(0, -H2 / 2)
  x.scale(1, 1 - 1.9 * ease.outCubic(lid)); x.rotate(0)
  block(x, -W2 / 2 - 14, -36, W2 + 28, 44, shade(col, 0.12), { bw: 8 })
  x.restore()
  // light pouring out when open
  if (lid > 0.2) { x.save(); x.globalCompositeOperation = 'lighter'; x.globalAlpha = clamp((lid - 0.2) * 1.6) * (0.6 + 0.15 * Math.sin(t * 10)); const g = x.createLinearGradient(0, -H2 / 2, 0, -H2 / 2 - 420); g.addColorStop(0, 'rgba(255,240,180,0.85)'); g.addColorStop(1, 'rgba(255,240,180,0)'); x.fillStyle = g; x.beginPath(); x.moveTo(-W2 / 2 + 10, -H2 / 2); x.lineTo(W2 / 2 - 10, -H2 / 2); x.lineTo(W2 * 0.85, -H2 / 2 - 420); x.lineTo(-W2 * 0.85, -H2 / 2 - 420); x.closePath(); x.fill(); x.restore() }
  if (o.badge !== false) burstBadge(x, t, W2 / 2 - 6, -H2 / 2 + 10, o.badge || 'NEW!', { k: o.badgeK ?? 1, r: 78, size: 34 })
  x.restore()
}
function shade(hex, f) {
  const n = parseInt(hex.slice(1), 16), c = [(n >> 16) & 255, (n >> 8) & 255, n & 255]
  const m = c.map(v => Math.round(f < 0 ? v * (1 + f) : v + (255 - v) * f))
  return `rgb(${m[0]},${m[1]},${m[2]})`
}
/** the tip card (the product itself): a white card with the tip in big type */
export function drawTipCard(x, t, cx, cy, text, { k = 1, w = 900, size = 58, rot = 0, kicker = 'CONTAINS:', col = '#fffaf0', accent = RED } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.font = `800 ${size}px ${INTER}`
  const L = wrap(x, text, w - 90), lh = size * 1.14
  const h = L.length * lh + 120
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 18, -h / 2 + 22, w, h)
  block(x, -w / 2, -h / 2, w, h, col, { bw: 8, hi: null })
  R(x, accent, -w / 2, -h / 2, w, 14)
  x.font = `700 26px ${MONO}`; x.fillStyle = accent; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(kicker, 0, -h / 2 + 46)
  x.font = `800 ${size}px ${INTER}`; x.fillStyle = INK
  L.forEach((l, i) => x.fillText(l, 0, -h / 2 + 92 + lh * (i + 0.5)))
  x.restore()
  return h
}
/** "BEFORE" footage chrome: scanlines, a REC-style tag, tracking jitter (drawn over the grey layer) */
export function beforeChrome(x, t, { alpha = 1, tag = 'BEFORE' } = {}) {
  if (alpha <= 0.01) return
  x.save(); x.globalAlpha *= alpha
  x.fillStyle = 'rgba(0,0,0,0.16)'
  for (let y = 0; y < 1920; y += 6) x.fillRect(0, y, 1080, 2)
  const band = ((t * 0.37) % 1) * 2200 - 140
  x.fillStyle = 'rgba(255,255,255,0.06)'; x.fillRect(0, band, 1080, 60)
  // the tag: red box, white letters, top-right under the bug line
  x.translate(200, 1700); x.rotate(-0.06)
  R(x, INK, -150, -46, 300, 92); R(x, '#d8263a', -142, -38, 284, 76)
  x.font = `900 48px ${INTER}`; x.fillStyle = '#ffffff'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(tag, 0, 3)
  x.restore()
}

// ─────────────────────────────────────────────── DOM chrome
/** the show bug: "FAKE AD" (Inter 800, letter-spaced small caps) + a tiny pixel TV */
const TV = ['.A...A.', '..A.A..', 'KKKKKKK', 'KSSSSSK', 'KSSSSSK', 'KSSSSSK', 'KKKKKKK', '.K...K.']
export function buildBug(root, { at = 0 } = {}) {
  const box = el('div', { position: 'absolute', left: '56px', top: '56px', height: '44px', display: 'flex', alignItems: 'center', gap: '14px', transformOrigin: '0% 50%', pointerEvents: 'none', zIndex: 5 }, root)
  const ic = el('canvas', { width: '44px', height: '50px', imageRendering: 'pixelated' }, box)
  ic.width = 44; ic.height = 50
  bits(ic.getContext('2d'), TV, 22, 25, 5, { A: BONE, K: '#3a3260', S: HOT })
  el('div', { font: `800 30px ${INTER}`, letterSpacing: '0.22em', color: YEL, textShadow: '0 2px 12px rgba(6,4,18,0.9)', whiteSpace: 'nowrap', fontVariant: 'small-caps' }, box, 'FAKE&nbsp;AD')
  return { update(t, out = 1) { const k = at <= 0 ? 1 : pop01(t, at, 0.3, 2); box.style.opacity = String(clamp(k) * out); box.style.display = out * k <= 0.01 ? 'none' : 'flex' } }
}
/** markup → html: *accent* = Garamond italic in colour, | = line break */
export function markup(text, accent = YEL, accentScale = 1.12) {
  let open = false, out = ''
  for (const ch of String(text)) {
    if (ch === '*') { out += open ? '</span>' : `<span style="font-family:${SERIF};font-style:italic;font-weight:500;color:${accent};font-size:${accentScale}em;letter-spacing:0">`; open = !open; continue }
    if (ch === '|') { out += '<br>'; continue }
    out += ch === '<' ? '&lt;' : ch
  }
  return out + (open ? '</span>' : '')
}
/** a big headline that is fully on screen at its start (frame 0 safe). update(t, k, wob) */
export function buildHead(root, text, { top = 170, size = 92, accent = YEL, color = BONE, width = 960, z = 4 } = {}) {
  const box = el('div', { position: 'absolute', left: (540 - width / 2) + 'px', width: width + 'px', top: top + 'px', textAlign: 'center', font: `900 ${size}px ${INTER}`, lineHeight: '1.04', color, textShadow: SHADOW, letterSpacing: '-0.01em', transformOrigin: '50% 50%', zIndex: z }, root, markup(text, accent))
  return {
    root: box,
    update(t, k = 1, { rot = 0, dy = 0 } = {}) {
      box.style.display = k <= 0.01 ? 'none' : 'block'
      box.style.opacity = String(clamp(k * 1.5))
      box.style.transform = `translateY(${dy.toFixed(1)}px) scale(${(0.6 + 0.4 * k).toFixed(4)}) rotate(${rot.toFixed(2)}deg)`
    },
  }
}
/** a lower third: coloured bar with a name + a line */
export function buildLower(root, name, line, { top = 1630, col = HOT } = {}) {
  const box = el('div', { position: 'absolute', left: '0px', top: top + 'px', display: 'none', zIndex: 4 }, root)
  el('div', { display: 'inline-block', background: col, color: '#fff', font: `900 40px ${INTER}`, letterSpacing: '0.06em', padding: '10px 28px 10px 64px', boxShadow: `8px 8px 0 ${INK}` }, box, name)
  el('div', { background: BONE, color: INK, font: `700 32px ${INTER}`, padding: '10px 28px 12px 64px', marginTop: '6px', display: 'inline-block', boxShadow: `8px 8px 0 ${INK}`, fontStyle: 'italic' }, el('div', {}, box), line)
  return { update(t, k) { box.style.display = k <= 0.01 ? 'none' : 'block'; box.style.transform = `translateX(${((1 - k) * -900).toFixed(1)}px)`; box.style.opacity = String(clamp(k * 2)) } }
}
/** the fine print strip (bottom, small mono, scrolls fast like real fine print) */
export function buildFine(root, text, { top = 1830 } = {}) {
  const box = el('div', { position: 'absolute', left: '40px', right: '40px', top: top + 'px', font: `700 27px ${MONO}`, color: 'rgba(239,230,214,0.92)', textAlign: 'center', textShadow: SHADOW, display: 'none', zIndex: 4, letterSpacing: '0.02em' }, root, text)
  return { update(t, k) { box.style.display = k <= 0.01 ? 'none' : 'block'; box.style.opacity = String(clamp(k)); box.style.transform = `translateY(${((1 - k) * 40).toFixed(1)}px)` } }
}
/** the BEFORE world is drawn into its own canvas and composited in grey */
export function BWLayer() {
  const c = document.createElement('canvas'); c.width = 1080; c.height = 1920
  return { c, x: c.getContext('2d') }
}
export function compositeBW(x, layer, { alpha = 1, grey = 1 } = {}) {
  if (alpha <= 0.01) return
  x.save(); x.globalAlpha *= alpha
  x.filter = `grayscale(${grey.toFixed(3)}) contrast(${(1 + 0.25 * grey).toFixed(3)}) brightness(${(1 - 0.06 * grey).toFixed(3)})`
  x.drawImage(layer.c, 0, 0)
  x.restore()
}
/** flash overlay amount at t (white colour flash) */
export const flashAt = (t, t0, d = 0.28) => t < t0 || t > t0 + d ? 0 : 1 - ease.outCubic((t - t0) / d)
/** a damped shake */
export const shakeAt = (t, t0, amp = 18, d = 0.4) => { const dt = t - t0; return dt > 0 && dt < d ? amp * Math.exp(-dt * 9) * Math.sin(dt * 60) : 0 }

// ─────────────────────────────────────────────── the short ad
/**
 * cfg = {
 *   id, sign, dur, ending: 'cut' | 'loop', seed (music), key, style,
 *   hook: 'Do YOU overthink | *every text?*',  product: 'JUST ASK™', sub: 'one honest question', icon: 'bubble', col, col2,
 *   tip: '“hey, what did you mean?”', quote: 'it changed my LIFE', fine: '*PRICE: FREE. SIDE EFFECTS: CALM.',
 *   last: 'One question beats *forty drafts.*', badge: 'NEW!',
 *   before(x, t, S)  the B&W chaos (t is frozen during the freeze-frame; S.hero(x, t, opts) draws the lead sign)
 *   after(x, t, S)   the colour demo, from T.after (S.u = t - T.after)
 *   caught: { x, y, r, label }  the freeze-frame circle, beforeCues, afterCues: extra SFX [kind, relT, ...]
 *   pis: { x, y, s }  Pisces testimonial spot
 * }
 */
export function adTimes(D) {
  const T = { freeze: 0.55, flip: 1.45, intro: 1.49, box: 1.75, open: 2.6, tip: 2.72 }
  T.after = T.tip + 1.35
  T.tipOut = [D - 2.05, D - 1.85]
  T.pis = Math.max(T.after + 0.75, D - 3.55)
  T.fine = D - 2.2
  T.last = D - 1.86
  T.loop = [D - 0.45, D]
  return T
}
export function makeAd(cfg) {
  const D = cfg.dur, T = { ...adTimes(D), ...(cfg.times || {}) }
  const LOOP = cfg.ending === 'loop'
  const PIS = cfg.pis || { x: 850, y: 1470, s: 200 }
  const HERO = cfg.heroPos || { x: 540, y: 1060, s: 330 }
  const HOOK = { at: -1, text: cfg.hook, top: cfg.hookTop || 250, size: cfg.hookSize || 108, accentColor: YEL, out: [T.flip - 0.06, T.flip] }
  const REC = { at: T.freeze, len: T.flip - T.freeze, caption: cfg.rec || 'sound *familiar?*', top: cfg.recTop || 1480 }
  const CAUGHT = { at: T.freeze + 0.04, r: 150, rec: false, arrow: 'bl', out: [T.flip - 0.04, T.flip], ...(cfg.caught || {}) }
  if (CAUGHT.x === undefined) { CAUGHT.x = HERO.x; CAUGHT.y = HERO.y - 20 }
  const WHIP = { at: T.flip, from: 1.7, flash: 0.5 }
  const SHAKE0 = { at: 0.02, len: 0.45, amp: 16 }, SHAKE1 = { at: T.box + 0.25, len: 0.4, amp: 24 }

  async function build(stage) {
    try { await Promise.all(["900 92px Inter", "800 58px Inter", "700 30px Inter", "900 40px Inter", "italic 500 100px 'EB Garamond'", "700 26px 'Space Mono'"].map(f => document.fonts.load(f))) } catch (_) { /* fonts optional */ }
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const BW = BWLayer()
    const intro = buildHead(root, 'INTRODUCING…', { top: 300, size: 96, color: YEL })
    const last = buildHead(root, cfg.last, { top: cfg.lastTop || 200, size: cfg.lastSize || 96, accent: YEL })
    const lower = buildLower(root, '♓︎ PISCES', cfg.lowerLine || 'very moved studio audience')
    const fine = buildFine(root, cfg.fine)
    const bug = buildBug(root)
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
    const S = { T, D, cfg, hero: (xx, t, o = {}) => star(xx, t, { sign: cfg.sign, ...HERO, ...o }) }

    function beforeWorld(t) {
      const bx = BW.x
      drawSky(bx, t, { ...SKY_H, zoom: 1.6, dim: 0.9 })
      cfg.before(bx, t, S)
    }
    function colourWorld(t) {
      drawStarburst(x, t, 540, 1020, { k: 1, cols: cfg.burst || ['#ff2f8a', '#ff7a2f'], spin: 0.22 })
      R(x, 'rgba(20,8,40,0.35)', 0, 1440, 1080, 480)
      // the box: slams in, opens, then becomes the product shot bottom-left
      const slam = easeOutBack(prog(t, T.box, T.box + 0.3), 1.2)
      const shrink = ease.inOutCubic(prog(t, T.after - 0.3, T.after + 0.1))
      const bp = { x: lerp(540, 200, shrink), y: lerp(lerp(-400, 1120, slam), 1520, shrink), k: lerp(1, 0.46, shrink) }
      const lid = ease.outCubic(prog(t, T.open, T.open + 0.25))
      if (t >= T.box) {
        drawBox(x, t, bp.x, bp.y, { name: cfg.product, sub: cfg.sub, icon: cfg.icon, col: cfg.col, col2: cfg.col2, lid, k: bp.k, rot: -0.03 + 0.02 * Math.sin(t * 3), badge: cfg.badge })
        sparkles(x, t, 540, 1120, T.box + 0.28, 12, 260, 1, [YEL, BONE, CYAN])
      }
      if (t >= T.after - 0.05) cfg.after(x, t, { ...S, u: t - T.after })
      // the tip card rises out of the box and stays up top until the last line
      if (t >= T.tip && t < T.tipOut[1]) {
        const r = easeOutBack(prog(t, T.tip, T.tip + 0.42), 1.5)
        const up = ease.inOutCubic(prog(t, T.after - 0.3, T.after + 0.05))
        const out = ease.inCubic(prog(t, ...T.tipOut))
        const cy = lerp(lerp(1000, 700, r), 470, up) - out * 900
        drawTipCard(x, t, 540, cy, cfg.tip, { k: lerp(0.3, 1, r) * lerp(1, 0.9, up), size: cfg.tipSize || 58, rot: -0.02 + 0.015 * Math.sin(t * 2.4), kicker: cfg.kicker || 'CONTAINS:' })
      }
      // Pisces, the testimonial
      if (t >= T.pis) {
        const pk = pop01(t, T.pis, 0.34, 2)
        star(x, t, { sign: 'pisces', x: PIS.x, y: PIS.y, s: PIS.s, pop: pk, mood: cfg.pisMood || 'happy', look: [-1, 0], tears: t > T.pis + 0.5 ? 3 : 2, hops: [T.pis + 0.3, T.pis + 0.9, T.pis + 1.5], seed: 6 })
        bubble(x, t, PIS.x - 70, PIS.y - PIS.s * 0.85, T.pis + 0.25, D + 1, cfg.quote, { size: 42, tail: 0.4, maxW: 420, col: '#ffffff' })
      }
    }

    return {
      start: 0, end: D + 0.01, root,
      update(t) {
        if (t < T.flip) { beforeWorld(t); compositeBW(x, BW); beforeChrome(x, t) }
        else colourWorld(t)
        const ik = t >= T.intro && t < T.tip + 0.2 ? easeOutBack(prog(t, T.intro, T.intro + 0.25), 2.4) * outK(t, [T.tip, T.tip + 0.2]) : 0
        intro.update(t, ik, { rot: -3 })
        last.update(t, t >= T.last ? easeOutBack(prog(t, T.last, T.last + 0.32), 2.2) : 0, { rot: t >= T.last ? 2 * Math.sin((t - T.last) * 14) * Math.exp(-(t - T.last) * 4) : 0 })
        lower.update(t, t >= T.pis + 0.15 ? ease.outCubic(prog(t, T.pis + 0.15, T.pis + 0.45)) : 0)
        fine.update(t, t >= T.fine ? prog(t, T.fine, T.fine + 0.2) : 0)
        bug.update(t, t >= T.freeze && t < T.flip ? 0 : 1)
        drawGrain(gx, t)
      },
    }
  }

  const SCENES = [frozen(build, [REC]), HK.screenShake(SHAKE0), HK.screenShake(SHAKE1), HK.whipZoom(WHIP), HK.slamTitle(HOOK), HK.recordScratch(REC), HK.caught(CAUGHT)]
  if (LOOP) SCENES.push(HK.loopBack([build, HK.slamTitle(HOOK)], { duration: D }))
  const CUES = [...adCues(cfg, T, D), ...HK.recordScratchCues(REC), ...HK.caughtCues(CAUGHT), ...HK.whipZoomCues(WHIP), ...HK.shakeCues(SHAKE1),
    ...(LOOP ? HK.loopCues({ duration: D }) : [])].filter(c => c[1] >= 0 && c[1] < D)
  return { DURATION: D, SCENES, CUES, T, music: adMusic(cfg, T, D) }
}

/** the freeze-frame "caught" circle + label (hand-drawn red ring that draws itself on) */
export function caught(x, t, t0, { x: cx, y: cy, r = 200, label: lab = 'YEP. THAT\'S YOU.', ly } = {}) {
  const p = ease.outCubic(prog(t, t0, t0 + 0.22))
  if (p <= 0) return
  x.save(); x.strokeStyle = RED; x.lineWidth = 14; x.lineCap = 'round'
  x.beginPath()
  for (let i = 0; i <= 60 * p; i++) { const a = -1.9 + (i / 60) * Math.PI * 2.15, rr = r * (1 + 0.06 * Math.sin(i * 0.7)); x.lineTo(cx + Math.cos(a) * rr * 1.08, cy + Math.sin(a) * rr * 0.92) }
  x.stroke(); x.restore()
  label(x, lab, cx, ly ?? (cy + r + 70), { size: 50, col: '#ffffff', k: easeOutBack(prog(t, t0 + 0.12, t0 + 0.34), 2.4), rot: -0.04, stroke: RED, sw: 0.3 })
}

// ─────────────────────────────────────────────── sound
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
export function scratch(t0, gain = 0.06) {
  return [['whoosh', r3(t0), 0.12, gain], ['whoosh', r3(t0 + 0.09), 0.1, gain * 0.8], ['tick', r3(t0 + 0.02), 0.08], ['tick', r3(t0 + 0.1), 0.06]]
}
export function adCues(cfg, T, D) {
  const C = [
    // frame 0: mid-chaos
    ['boom', 0.0, 0.18], ['whoosh', 0.0, 0.4, 0.05], ['pop', 0.05, 1174.66, 0.04, 0],
    // freeze + caught
    ...scratch(T.freeze), ['pop', T.freeze + 0.14, 1567.98, 0.045, 0.2], ['tick', T.freeze + 0.24, 0.05],
    // flip into colour: flash, whip zoom, INTRODUCING
    ['whoosh', T.flip - 0.12, 0.35, 0.06], ['crash', T.flip, { gain: 0.05 }], ['bell', T.flip + 0.02, 1760, 0.035, 1.0, 0],
    ['pop', T.intro + 0.05, 880, 0.04, -0.2], ['pop', T.intro + 0.15, 1174.66, 0.04, 0.2],
    // box slam
    ['whoosh', T.box, 0.25, 0.05], ['boom', T.box + 0.25, 0.3], ['tom', T.box + 0.25, 90, { gain: 0.28, decay: 0.3 }], ['glitter', T.box + 0.28, T.box + 0.7],
    // open + tip card
    ['tick', T.open, 0.06], ['riser', T.open, T.tip + 0.3, 0.03], ['bell', T.tip + 0.3, 2349.32, 0.03, 1.1, 0], ['pluck', T.tip + 0.32, 1174.66, 0.04, 0.6, 0],
    // demo
    ['whoosh', T.after - 0.3, 0.3, 0.035],
    // Pisces: pop + sob plucks
    ['pop', T.pis, 659.25, 0.04, 0.4], ['pluck', T.pis + 0.5, 987.77, 0.03, 0.5, 0.4], ['pluck', T.pis + 0.62, 880, 0.03, 0.5, 0.4], ['pluck', T.pis + 0.74, 739.99, 0.03, 0.6, 0.4],
    // fine print ticks + last line
    ...Array.from({ length: 6 }, (_, i) => ['tick', r3(T.fine + i * 0.05), 0.025]),
    ['pop', T.last + 0.02, 1174.66, 0.05, 0], ['pop', T.last + 0.12, 1567.98, 0.045, 0], ['bell', T.last + 0.14, 2349.32, 0.03, 1.2, 0],
  ]
  for (const [kind, rel, ...a] of cfg.beforeCues || []) C.push([kind, r3(rel), ...a])
  for (const [kind, rel, ...a] of cfg.afterCues || []) C.push([kind, r3(T.after + rel), ...a])
  return C.filter(c => c[1] >= 0 && c[1] < D)
}
export function adMusic(cfg, T, D) {
  return { style: cfg.style, key: cfg.key, seed: cfg.seed, sections: { drop: T.flip, breakdown: [T.pis], lift: [T.last], outroAt: D - 0.6 }, hits: [T.box + 0.25, T.last] }
}
void NOTE
