// FRIENDS FIRST: the shared look of the 24 Friends First films nffe01–nffe24 (promo/films/next30/b34.md). Lives in
// nffe01's folder; the other 23 episodes import it from here ('../../nffe01/scenes/friendskit.js').
//
// The format (cfg.dur 20 / 25 / 30 → films of 18 / 23 / 28 s; the last 2.4 s is the short shared end card):
//   frame 0     the hook caption is already up (bold top caption, one *italic* accent) over a set, with a character
//               mid-hop. Shot A: the situation.
//   cut         a hard cut (white blink) into shot B: THE STARS' advice (dialogue box). No card transition.
//   shot C      the friend does the kind thing: the CHECK-IN card (the words to send) and the last line.
// The bug "FRIENDS FIRST" sits top-left (Inter 800 small caps, letter-spaced, 56 px in). ♓ Pisces cries somewhere in
// every film (happy tears count): the kit draws Pisces per shot unless the shot says `pis: false`.
//
//   makeFriends(cfg) → { DURATION, SCENES, CUES, LINES, BOXES }
//     cfg.id, cfg.dur (20 | 25 | 30)
//     cfg.hook: { text, out, color }         text with `|` line breaks and one *accent*
//     cfg.shots: [{ at, set, setOpts, draw(x, t, S), front(x, t, S)?, pis, cam: [z, cx, cy], push }]
//                set: 'room' | 'cafe' | 'kitchen' | 'bedroom' | 'street' | 'park' | 'split' | 'dinner' | 'sky'
//                S = { u (time in shot), t0, t1, star, pisces, i }
//     cfg.lines: [{ t, speaker, text, color }]   cfg.boxes: [{ from, to, open, close, y }] (default: one box)
//     cfg.check: { at, out, text, label }    the CHECK-IN card (talk-card look), text with one *accent*
//     cfg.last: { at, text, color }           cfg.cut: where shot B starts (kept for reference; no card cut plays)
//     cfg.cues: extra sound cues             cfg.overlay(x, t) optional top-layer painter (phones etc.)
// Everything draws as a pure function of t; DOM / canvases are only made inside build().
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas, drawPixelStar } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_SHORT_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, signStar, STAR } from '../../startalk.js'
import { popText } from '../../lesson.js'

export const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', LAV = '#c9a6ff', RED = '#e8344e', MINT = '#9fe6b0', SKYB = '#8fd8f6'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const SERIF = "'EB Garamond', Georgia, serif"
export const MONO = "'Space Mono', ui-monospace, monospace"
export const BUG = '#ffb37a'
export const r3 = v => +v.toFixed(3)
export const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
export const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
export { clamp, lerp, prog, ease, easeOutBack, drawStarChar, signStar, STAR, drawPixelStar, talkHops }
export const STARS = 'THE STARS'
export const TAG = id => { const s = signStar(id); return `${s.glyph}︎ ${id.toUpperCase()}` }
export const TAGCOL = { cancer: '#cfe4ff', capricorn: '#e9d9a8', gemini: '#ffe58a', taurus: '#b8f0c0', aquarius: '#a8ecff', leo: '#ffc38a', virgo: '#d6f0b0', scorpio: '#ffa8c0', sagittarius: '#ffb8a0', libra: '#ffc8ec', pisces: '#c8d8ff', aries: '#ffb0a0' }
export const say = (t, sign, text) => ({ t, speaker: TAG(sign), color: TAGCOL[sign], text })
export const stars = (t, text) => ({ t, speaker: STARS, text })

// ── drawing helpers
const RND = Math.round
export const R = (x, col, X, Y, w, h) => { x.fillStyle = col; x.fillRect(RND(X), RND(Y), RND(w), RND(h)) }
/** an ink-outlined block (pixel-chunky prop) */
export function box(x, X, Y, w, h, col, { b = 6, hi = null, lo = null } = {}) {
  R(x, INK, X - b, Y - b, w + 2 * b, h + 2 * b); R(x, col, X, Y, w, h)
  if (hi) R(x, hi, X, Y, w, Math.max(b, h * 0.14))
  if (lo) R(x, lo, X, Y + h - Math.max(b, h * 0.14), w, Math.max(b, h * 0.14))
}
/** a bitmap of cells with a 1-cell ink outline, centred on (cx, cy) */
export function drawBits(x, bm, cols, cx, cy, cell, { rot = 0, outline = INK, alpha = 1, sx = 1, sy = 1 } = {}) {
  const w = bm[0].length, h = bm.length
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot); x.scale(sx, sy)
  const ox = -w * cell / 2, oy = -h * cell / 2
  const on = (i, j) => j >= 0 && j < h && i >= 0 && i < w && bm[j][i] !== '.'
  if (outline) {
    x.fillStyle = outline
    for (let j = -1; j <= h; j++) for (let i = -1; i <= w; i++) if (!on(i, j) && (on(i + 1, j) || on(i - 1, j) || on(i, j + 1) || on(i, j - 1))) x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5)
  }
  for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) {
    const ch = bm[j][i]; if (ch === '.') continue
    x.fillStyle = cols[ch]; x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5)
  }
  x.restore()
}
export const HEART = ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...']
export function heart(x, cx, cy, cell, col = '#ff5c8a', o = {}) { drawBits(x, HEART, { H: col }, cx, cy, cell, o) }
/** a ring of pixel sparkles bursting out at t0 */
export function sparkles(x, t, cx, cy, t0, n, Rr, seed, cols = [GOLD, BONE, PINK]) {
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
export function hearts(x, t, t0, cx, cy, { n = 5, cell = 6, spread = 120, life = 1.4, cols = ['#ff5c8a', '#ff8fb1', GOLD] } = {}) {
  for (let i = 0; i < n; i++) {
    const b = t0 + i * 0.16, p = (t - b) / life
    if (p < 0 || p > 1) continue
    const hx = cx + Math.sin(i * 2.3) * spread * 0.5 + Math.sin(t * 3 + i) * 10, hy = cy - p * 200
    drawBits(x, HEART, { H: cols[i % cols.length] }, hx, hy, cell * (0.6 + 0.4 * Math.min(1, p * 4)), { alpha: 1 - ease.inQuad(p) })
  }
}
/** pixel confetti falling from a burst at t0 */
export function confetti(x, t, t0, cx, cy, { n = 26, life = 2.2, cols = [GOLD, PINK, '#7fd0ff', MINT, BONE] } = {}) {
  const tt = t - t0
  if (tt < 0 || tt > life) return
  x.save(); x.globalAlpha = 1 - ease.inQuad(tt / life)
  for (let i = 0; i < n; i++) {
    const a = -Math.PI / 2 + ((i / n) - 0.5) * 2.4, v = 520 + 260 * ((i * 7) % 5) / 4
    const px = cx + Math.cos(a) * v * tt * 0.9 + Math.sin(tt * 6 + i) * 14, py = cy + Math.sin(a) * v * tt + 620 * tt * tt
    const sz = 10 + (i % 3) * 3
    x.fillStyle = cols[i % cols.length]
    x.save(); x.translate(px, py); x.rotate(tt * (4 + i % 5) + i); x.fillRect(-sz / 2, -sz / 4, sz, sz / 2); x.restore()
  }
  x.restore()
}
/** wrap text into lines that fit maxW at the current font */
function wrap(x, text, maxW) {
  const words = text.split(' '), out = []; let cur = ''
  for (const w of words) { const tryS = cur ? cur + ' ' + w : w; if (x.measureText(tryS).width > maxW && cur) { out.push(cur); cur = w } else cur = tryS }
  if (cur) out.push(cur)
  return out
}
/** a pixel speech bubble (canvas), popping at t0, gone by t1. Wraps at maxW. */
export function bubble(x, t, cx, cy, t0, t1, text, { col = BONE, ink = INK, size = 34, tail = 0, font = INTER, weight = 800, maxW = 640, up = false } = {}) {
  const k = pop01(t, t0, 0.25, 2.4) * outK(t, [t1 - 0.15, t1])
  if (k <= 0.01 || t < t0 || t > t1) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.font = `${weight} ${size}px ${font}`
  const rows = wrap(x, text, maxW), lh = size * 1.15
  const w = Math.max(...rows.map(r => x.measureText(r).width)) + 44, h = lh * rows.length + 30
  x.fillStyle = INK; x.fillRect(-w / 2 - 5, -h / 2, w + 10, h); x.fillRect(-w / 2, -h / 2 - 5, w, h + 10)
  x.fillStyle = col; x.fillRect(-w / 2, -h / 2, w, h)
  const tx = tail * (w / 2 - 40)
  if (up) { x.fillStyle = INK; x.fillRect(tx - 14, -h / 2 - 16, 14, 12); x.fillRect(tx - 7, -h / 2 - 22, 8, 8); x.fillStyle = col; x.fillRect(tx - 9, -h / 2 - 9, 9, 9) }
  else { x.fillStyle = INK; x.fillRect(tx - 14, h / 2 + 4, 14, 12); x.fillRect(tx - 7, h / 2 + 14, 8, 8); x.fillStyle = col; x.fillRect(tx - 9, h / 2, 9, 9) }
  x.fillStyle = ink; x.textAlign = 'center'; x.textBaseline = 'middle'
  rows.forEach((r, i) => x.fillText(r, 0, 2 + (i - (rows.length - 1) / 2) * lh))
  x.restore()
}
/** a thought bubble (three little puffs leading to it) */
export function thought(x, t, cx, cy, t0, t1, text, o = {}) {
  const k = pop01(t, t0, 0.25, 2.4) * outK(t, [t1 - 0.15, t1])
  if (k > 0.01 && t >= t0 && t <= t1) {
    const fx = o.fromX ?? cx - 120, fy = o.fromY ?? cy + 130
    for (let i = 0; i < 3; i++) { const p = (i + 1) / 4, s = (6 + i * 4) * k; R(x, INK, lerp(fx, cx, p) - s - 3, lerp(fy, cy, p) - s - 3, 2 * s + 6, 2 * s + 6); R(x, o.col || BONE, lerp(fx, cx, p) - s, lerp(fy, cy, p) - s, 2 * s, 2 * s) }
  }
  bubble(x, t, cx, cy, t0, t1, text, { ...o, tail: 0, col: o.col || '#e8e2f6' })
}
/** pixel label text on canvas, with an ink drop shadow */
export function label(x, text, cx, cy, { size = 28, col = BONE, align = 'center', alpha = 1, font = MONO, weight = 700, rot = 0 } = {}) {
  if (alpha <= 0) return
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot)
  x.font = `${weight} ${size}px ${font}`; x.textAlign = align; x.textBaseline = 'middle'
  x.fillStyle = 'rgba(6,4,18,0.85)'; x.fillText(text, 3, 4)
  x.fillStyle = col; x.fillText(text, 0, 0)
  x.restore()
}
/** a soft floor shadow */
export function shadow(x, cx, cy, w, a = 0.35) { x.save(); x.globalAlpha = a; x.fillStyle = '#05030c'; x.beginPath(); x.ellipse(cx, cy, w / 2, w * 0.09, 0, 0, Math.PI * 2); x.fill(); x.restore() }
/** a warm radial glow */
export function glow(x, cx, cy, r, a, col = '255,214,150') {
  if (a <= 0) return
  x.save(); x.globalCompositeOperation = 'lighter'
  const g = x.createRadialGradient(cx, cy, 0, cx, cy, r); g.addColorStop(0, `rgba(${col},${0.32 * a})`); g.addColorStop(1, `rgba(${col},0)`)
  x.fillStyle = g; x.fillRect(cx - r, cy - r, 2 * r, 2 * r); x.restore()
}
/** gentle pixel snowfall inside a rect */
export function snow(x, t, { x0 = 0, y0 = 0, x1 = 1080, y1 = 1920, n = 60, speed = 60, cell = 6, alpha = 0.85, seed = 3 } = {}) {
  x.save(); x.beginPath(); x.rect(x0, y0, x1 - x0, y1 - y0); x.clip(); x.globalAlpha *= alpha
  const H = y1 - y0, W = x1 - x0
  for (let i = 0; i < n; i++) {
    const h = ((i * 7919 + seed * 104729) % 1000) / 1000, h2 = ((i * 6271 + seed * 3) % 997) / 997
    const sp = speed * (0.6 + 0.8 * h2)
    const py = y0 + ((h * H + t * sp) % H), px = x0 + ((h2 * W + Math.sin(t * 0.8 + i) * 18) % W + W) % W
    const c = cell * (i % 3 === 0 ? 1.4 : 1)
    R(x, i % 4 ? '#f4f0ff' : '#cfe4ff', px, py, c, c)
  }
  x.restore()
}
/** fairy lights strung along a sagging line */
export function fairyLights(x, t, x0, x1, y, sag = 40, n = 12) {
  x.save(); x.strokeStyle = INK; x.lineWidth = 5; x.beginPath()
  for (let i = 0; i <= 30; i++) { const p = i / 30; const px = lerp(x0, x1, p), py = y + Math.sin(Math.PI * p) * sag; i ? x.lineTo(px, py) : x.moveTo(px, py) }
  x.stroke(); x.restore()
  const cols = [GOLD, PINK, '#7fd0ff', MINT, '#ffb37a']
  for (let i = 0; i < n; i++) {
    const p = (i + 0.5) / n, px = lerp(x0, x1, p), py = y + Math.sin(Math.PI * p) * sag + 12
    const on = 0.6 + 0.4 * Math.sin(t * 2.4 + i * 1.7)
    glow(x, px, py, 34, on * 0.8, '255,226,170')
    R(x, INK, px - 9, py - 9, 18, 22); R(x, cols[i % 5], px - 5, py - 5, 10, 14)
    R(x, 'rgba(255,255,255,0.7)', px - 3, py - 3, 4, 4)
  }
}
/** a mug (with optional steam) */
export function mug(x, t, cx, cy, s = 1, col = '#e86a5a', steam = true) {
  box(x, cx - 26 * s, cy - 40 * s, 52 * s, 50 * s, col, { b: 5, hi: 'rgba(255,255,255,0.25)' })
  R(x, INK, cx + 26 * s, cy - 30 * s, 18 * s, 6 * s); R(x, INK, cx + 38 * s, cy - 30 * s, 6 * s, 28 * s); R(x, INK, cx + 26 * s, cy - 8 * s, 18 * s, 6 * s)
  if (steam) for (let i = 0; i < 3; i++) { const p = ((t * 0.5 + i / 3) % 1); x.save(); x.globalAlpha = 0.55 * Math.sin(Math.PI * p); R(x, '#f4f0ff', cx - 14 * s + i * 12 * s + Math.sin(t * 3 + i) * 6 * s, cy - 54 * s - p * 70 * s, 7 * s, 12 * s); x.restore() }
}
/** a tissue box */
export function tissues(x, cx, cy, s = 60) {
  box(x, cx - s / 2, cy - s * 0.3, s, s * 0.6, '#9fd8f6', { b: 4, hi: '#c9ecfb' })
  R(x, INK, cx - s * 0.18 - 4, cy - s * 0.3 - 4, s * 0.36 + 8, 8)
  R(x, '#ffffff', cx - s * 0.12, cy - s * 0.3 - s * 0.32, s * 0.24, s * 0.34)
}
/** a small handheld phone (glowing screen), optional short text on it */
export function phoneSmall(x, t, cx, cy, { rot = 0, s = 1, text = null, glowA = 1, col = '#2a2148', screen = '#2c3f78', buzz = 0 } = {}) {
  x.save(); x.translate(cx + (buzz ? Math.sin(t * 80) * 4 * buzz : 0), cy); x.rotate(rot); x.scale(s, s)
  glow(x, 0, 0, 120, 0.5 * glowA, '160,200,255')
  box(x, -40, -70, 80, 140, col, { b: 5 })
  R(x, screen, -32, -60, 64, 116)
  if (text) { x.font = `700 15px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = BONE; String(text).split('|').forEach((l, i, a) => x.fillText(l, 0, (i - (a.length - 1) / 2) * 20)) }
  x.restore()
}
/** a pixel envelope */
export function envelope(x, cx, cy, s = 1, { open = 0, col = '#f4ead8', seal = PINK } = {}) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  box(x, -90, -55, 180, 110, col, { b: 6 })
  x.fillStyle = INK
  if (open < 0.5) { x.beginPath(); x.moveTo(-90, -55); x.lineTo(0, 10); x.lineTo(90, -55); x.lineTo(84, -55); x.lineTo(0, 2); x.lineTo(-84, -55); x.fill() }
  else { x.beginPath(); x.moveTo(-90, -55); x.lineTo(0, -120); x.lineTo(90, -55); x.closePath(); x.fill(); x.fillStyle = '#e6d8bf'; x.beginPath(); x.moveTo(-82, -57); x.lineTo(0, -110); x.lineTo(82, -57); x.closePath(); x.fill() }
  if (open < 0.5) heart(x, 0, 4, 4, seal)
  x.restore()
}
/** a soup pot with steam */
export function pot(x, t, cx, cy, s = 1) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  box(x, -80, -60, 160, 90, '#d9573f', { b: 6, hi: '#f08a6a' })
  box(x, -92, -74, 184, 18, '#b9442f', { b: 5 })
  R(x, INK, -112, -46, 24, 10); R(x, INK, 88, -46, 24, 10)
  box(x, -14, -92, 28, 14, '#b9442f', { b: 4 })
  x.restore()
  for (let i = 0; i < 4; i++) { const p = ((t * 0.45 + i / 4) % 1); x.save(); x.globalAlpha = 0.6 * Math.sin(Math.PI * p); R(x, '#f4f0ff', cx - 40 * s + i * 26 * s + Math.sin(t * 2.6 + i) * 10 * s, cy - 110 * s - p * 120 * s, 10 * s, 18 * s); x.restore() }
}
/** a blanket draped over a star: a soft lump with stripes, star's face peeks out above `faceY` */
export function blanket(x, cx, topY, w, h, col = '#7c74f0') {
  R(x, INK, cx - w / 2 - 6, topY - 6, w + 12, h + 12)
  R(x, col, cx - w / 2, topY, w, h)
  for (let i = 0; i < 4; i++) R(x, 'rgba(255,255,255,0.18)', cx - w / 2, topY + 26 + i * (h / 4.2), w, 10)
  R(x, 'rgba(255,255,255,0.3)', cx - w / 2, topY, w, 12)
}

// ── star sprite frame (mirrors startalk.js drawStarChar) so props sit on the sprite through hops and squash
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
}
/** a scarf wrapped under the face (sprite cells) */
export function scarfCells(ctx, col = '#e8344e') {
  ctx.fillStyle = INK; ctx.fillRect(9.4, 25.4, 17.2, 4.2); ctx.fillRect(21.4, 28, 4.2, 7.4)
  ctx.fillStyle = col; ctx.fillRect(10, 26, 16, 3); ctx.fillRect(22, 28.4, 3, 6.4)
  ctx.fillStyle = 'rgba(255,255,255,0.35)'; for (let i = 0; i < 4; i++) ctx.fillRect(11 + i * 4, 26, 1, 3)
}
/** a little party hat (sprite cells) */
export function hatCells(ctx, col = PINK) {
  ctx.fillStyle = INK; ctx.beginPath(); ctx.moveTo(18, -2.2); ctx.lineTo(23.6, 6.8); ctx.lineTo(12.4, 6.8); ctx.closePath(); ctx.fill()
  ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(18, -0.6); ctx.lineTo(22.2, 6); ctx.lineTo(13.8, 6); ctx.closePath(); ctx.fill()
  ctx.fillStyle = GOLD; ctx.fillRect(17.2, -2.6, 1.6, 1.6)
}

/** draw a sign star; o: { x, y, s, ...drawStarChar opts, tears, scarf, hat } */
export function star(x, t, sign, o = {}) {
  const S = sign === 'stars' ? { color: STAR.sky, glyph: null } : signStar(sign)
  const opts = { color: S.color, glyph: o.s >= 150 && sign !== 'stars' ? S.glyph : null, seed: o.seed ?? (sign.length * 3 + 1), glow: 1, ...o }
  const r = drawStarChar(x, o.x, o.y, o.s, t, opts)
  if (o.tears || o.scarf || o.hat) {
    const F = starFrame(o.x, o.y, o.s, t, opts)
    inSprite(x, F, () => { if (o.scarf) scarfCells(x, o.scarf); if (o.hat) hatCells(x, o.hat); if (o.tears) tearsCells(x, t, o.tears) })
  }
  return r
}

// ═══════════════════════════════════════════════════════════════════════════ the sets
// Interiors are a wall with one big window (the night sky shows through it), a floor from FLOOR down.
export const FLOOR = 1170
function wall(x, t, { col, win, frame = '#5a3d2e', snowIn = true, stripe = null }) {
  const [a, b, c, d] = win
  R(x, col, 0, 0, 1080, b); R(x, col, 0, d, 1080, FLOOR - d); R(x, col, 0, b, a, d - b); R(x, col, c, b, 1080 - c, d - b)
  if (stripe) for (let i = 0; i < 1080; i += 90) { R(x, stripe, i, 0, 30, b); R(x, stripe, i, d, 30, FLOOR - d); if (i < a || i > c) R(x, stripe, i, b, 30, d - b) }
  if (snowIn) snow(x, t, { x0: a, y0: b, x1: c, y1: d, n: 40, speed: 45, cell: 6 })
  // the frame + cross bars
  R(x, INK, a - 22, b - 22, c - a + 44, 22); R(x, INK, a - 22, d, c - a + 44, 22); R(x, INK, a - 22, b, 22, d - b); R(x, INK, c, b, 22, d - b)
  R(x, frame, a - 16, b - 16, c - a + 32, 12); R(x, frame, a - 16, d + 4, c - a + 32, 12); R(x, frame, a - 16, b - 4, 12, d - b + 8); R(x, frame, c + 4, b - 4, 12, d - b + 8)
  const mx = (a + c) / 2, my = (b + d) / 2
  R(x, INK, mx - 8, b, 16, d - b); R(x, frame, mx - 4, b, 8, d - b); R(x, INK, a, my - 8, c - a, 16); R(x, frame, a, my - 4, c - a, 8)
  // sill
  box(x, a - 40, d + 22, c - a + 80, 22, frame, { b: 5, hi: 'rgba(255,255,255,0.2)' })
}
function floor(x, col = '#3a2740', plank = 'rgba(0,0,0,0.22)') {
  R(x, INK, 0, FLOOR - 6, 1080, 8); R(x, col, 0, FLOOR, 1080, 1920 - FLOOR)
  for (let y = FLOOR + 50, k = 0; y < 1920; y += 60, k++) { R(x, plank, 0, y, 1080, 5); for (let i = (k % 2) * 140; i < 1080; i += 280) R(x, plank, i, y - 55, 5, 55) }
}
function lamp(x, t, cx, on = 1) {
  glow(x, cx, 760, 360, on, '255,206,140')
  R(x, INK, cx - 8, 800, 16, FLOOR - 800); R(x, '#8a6a4a', cx - 4, 800, 8, FLOOR - 800)
  box(x, cx - 70, FLOOR - 16, 140, 14, '#5a3d2e', { b: 5 })
  x.fillStyle = INK; x.beginPath(); x.moveTo(cx - 82, 812); x.lineTo(cx + 82, 812); x.lineTo(cx + 52, 700); x.lineTo(cx - 52, 700); x.closePath(); x.fill()
  x.fillStyle = '#ffd89a'; x.beginPath(); x.moveTo(cx - 72, 806); x.lineTo(cx + 72, 806); x.lineTo(cx + 46, 708); x.lineTo(cx - 46, 708); x.closePath(); x.fill()
  void t
}
export function couch(x, cx = 540, y = 1000, w = 700, col = '#c0577a') {
  box(x, cx - w / 2, y, w, 120, col, { b: 7, hi: 'rgba(255,255,255,0.18)' })            // back
  box(x, cx - w / 2 - 40, y + 70, 70, 110, col, { b: 7, hi: 'rgba(255,255,255,0.18)' })  // arms
  box(x, cx + w / 2 - 30, y + 70, 70, 110, col, { b: 7, hi: 'rgba(255,255,255,0.18)' })
  box(x, cx - w / 2 + 30, y + 110, w - 60, 60, col, { b: 7, lo: 'rgba(0,0,0,0.18)' })     // seat
  R(x, INK, cx - w / 2 - 20, y + 186, 16, 20); R(x, INK, cx + w / 2 + 4, y + 186, 16, 20)
}
export function table(x, cx, y, w, col = '#8a5a3a', { cloth = null } = {}) {
  box(x, cx - w / 2, y, w, 26, col, { b: 6, hi: 'rgba(255,255,255,0.2)' })
  if (cloth) { R(x, INK, cx - w / 2 - 6, y + 26, w + 12, 50); R(x, cloth, cx - w / 2, y + 26, w, 44); for (let i = 0; i < w; i += 40) R(x, 'rgba(255,255,255,0.25)', cx - w / 2 + i, y + 26, 20, 44) }
  R(x, INK, cx - w / 2 + 20, y + 26, 18, FLOOR + 30 - y); R(x, INK, cx + w / 2 - 38, y + 26, 18, FLOOR + 30 - y)
}
export function bench(x, cx, y = 1080, w = 560) {
  box(x, cx - w / 2, y - 120, w, 24, '#8a5a3a', { b: 6 }); box(x, cx - w / 2, y - 70, w, 24, '#8a5a3a', { b: 6 })
  box(x, cx - w / 2, y, w, 26, '#9a6a44', { b: 6, hi: 'rgba(255,255,255,0.2)' })
  for (const d of [-1, 1]) { R(x, INK, cx + d * (w / 2 - 40) - 9, y - 130, 18, FLOOR + 30 - (y - 130)) }
  R(x, '#f4f0ff', cx - w / 2, y - 6, w, 8)
}
export function lampPost(x, t, cx, on = 1) {
  glow(x, cx, 560, 300, on, '255,214,150')
  R(x, INK, cx - 12, 560, 24, FLOOR - 560); R(x, '#4a4466', cx - 6, 560, 12, FLOOR - 560)
  box(x, cx - 40, 500, 80, 70, '#ffe2a0', { b: 7 }); box(x, cx - 52, 478, 104, 20, '#4a4466', { b: 5 })
  R(x, '#f4f0ff', cx - 52, 470, 104, 10)
  void t
}
function bareTree(x, cx) {
  const br = [[0, 0, 0, -560, 26], [0, -260, -140, -420, 14], [0, -330, 160, -470, 14], [-140, -420, -200, -520, 8], [160, -470, 220, -560, 8], [0, -460, -70, -600, 8]]
  for (const [a, b, c, d, w] of br) { x.save(); x.strokeStyle = INK; x.lineWidth = w + 10; x.lineCap = 'square'; x.beginPath(); x.moveTo(cx + a, FLOOR + b); x.lineTo(cx + c, FLOOR + d); x.stroke(); x.strokeStyle = '#4a3a50'; x.lineWidth = w; x.stroke(); x.restore() }
  for (const [c, d] of [[-200, -520], [220, -560], [-70, -600], [0, -560]]) R(x, '#f4f0ff', cx + c - 20, FLOOR + d - 8, 40, 10)
}
function snowGround(x) {
  R(x, INK, 0, FLOOR - 8, 1080, 8); R(x, '#dfe6f8', 0, FLOOR, 1080, 1920 - FLOOR)
  for (let i = 0; i < 1080; i += 120) R(x, '#c8d2ee', i + 30, FLOOR + 60 + (i % 240 ? 40 : 0), 70, 10)
  R(x, '#f4f8ff', 0, FLOOR, 1080, 14)
}
function house(x, t, { door = '#2f7a5a', light = 1 } = {}) {
  R(x, INK, 548, 432, 540, FLOOR - 432); R(x, '#5a4a7a', 556, 440, 524, FLOOR - 440)
  for (let y = 460; y < FLOOR; y += 44) R(x, 'rgba(0,0,0,0.15)', 556, y, 524, 5)
  // roof eave with snow
  R(x, INK, 520, 410, 560, 34); R(x, '#f4f8ff', 528, 404, 552, 18)
  // window
  box(x, 900, 560, 140, 170, '#ffd89a', { b: 7 }); R(x, INK, 966, 560, 8, 170); R(x, INK, 900, 640, 140, 8)
  glow(x, 970, 645, 200, 0.8)
  // door + porch light + wreath
  box(x, 660, 760, 190, FLOOR - 760, door, { b: 8, hi: 'rgba(255,255,255,0.15)' })
  R(x, GOLD, 820, 960, 14, 14)
  glow(x, 610, 720, 220, light)
  box(x, 596, 700, 28, 40, '#ffe2a0', { b: 5 })
  x.save(); x.strokeStyle = INK; x.lineWidth = 26; x.beginPath(); x.arc(755, 860, 46, 0, Math.PI * 2); x.stroke(); x.strokeStyle = '#3fae6a'; x.lineWidth = 16; x.stroke(); x.restore()
  heart(x, 755, 906, 3, RED)
  // step
  box(x, 640, FLOOR - 20, 230, 20, '#8c86a8', { b: 5 }); R(x, '#f4f8ff', 640, FLOOR - 24, 230, 8)
  void t
}
function cafeBits(x, t) {
  // pendant lamps
  for (const cx of [300, 780]) { R(x, INK, cx - 3, 0, 6, 130); x.fillStyle = INK; x.beginPath(); x.moveTo(cx - 70, 200); x.lineTo(cx + 70, 200); x.lineTo(cx + 30, 126); x.lineTo(cx - 30, 126); x.fill(); x.fillStyle = '#e9b24a'; x.beginPath(); x.moveTo(cx - 60, 194); x.lineTo(cx + 60, 194); x.lineTo(cx + 26, 132); x.lineTo(cx - 26, 132); x.fill(); glow(x, cx, 240, 260, 0.9) }
  // chalkboard
  box(x, 60, 930, 150, 200, '#24352e', { b: 7 })
  x.font = `700 22px ${MONO}`; x.fillStyle = BONE; x.textAlign = 'center'; x.fillText('COCOA', 135, 980); x.fillText('TEA', 135, 1020); x.fillText('SOUP', 135, 1060)
  void t
}
function stove(x, t) {
  box(x, 0, 1000, 1080, 170, '#6a4a3a', { b: 0 }); R(x, INK, 0, 994, 1080, 10); R(x, '#c9b9a0', 0, 1004, 1080, 18)
  for (let i = 60; i < 1080; i += 240) { box(x, i, 1050, 180, 100, '#7a5a48', { b: 5 }); R(x, INK, i + 80, 1090, 20, 8) }
  void t
}
function bed(x, cx = 360) {
  box(x, cx - 330, 880, 40, 290, '#6a4a7a', { b: 7 })                 // headboard
  box(x, cx - 300, 1040, 640, 100, '#e8e2f6', { b: 7 })                 // mattress
  R(x, INK, cx - 300, 1146, 16, 24); R(x, INK, cx + 324, 1146, 16, 24)
  box(x, cx - 280, 990, 150, 60, '#ffffff', { b: 6 })                   // pillow
}
function nightstand(x, cx) { box(x, cx - 70, 1010, 140, 160, '#7a5a48', { b: 6, hi: 'rgba(255,255,255,0.15)' }); R(x, INK, cx - 20, 1070, 40, 8) }

export const SET_COLS = {
  room: { wall: '#3a2a58', stripe: 'rgba(255,255,255,0.03)', floor: '#4a3040' },
  cafe: { wall: '#4a2b36', stripe: 'rgba(0,0,0,0.12)', floor: '#2e2a3a' },
  kitchen: { wall: '#2f4656', stripe: 'rgba(255,255,255,0.05)', floor: '#3b3a4c' },
  bedroom: { wall: '#2e2a52', stripe: 'rgba(255,255,255,0.03)', floor: '#3a2e46' },
  dinner: { wall: '#4a2f48', stripe: 'rgba(255,255,255,0.04)', floor: '#3a2740' },
}
/** paint a set (the back layer); returns nothing. opts per set: { lamp, couch, lights, warm, half } */
export function drawSet(x, t, set, o = {}) {
  if (set === 'sky') return
  if (set === 'street') { snowGround(x); lampPost(x, t, 170, o.lamp ?? 1); house(x, t, o); snow(x, t, { n: 70, y1: 1920 }); return }
  if (set === 'park') { snowGround(x); bareTree(x, 160); lampPost(x, t, 930, o.lamp ?? 1); if (o.bench !== false) bench(x, 540, 1080, 600); snow(x, t, { n: 70 }); return }
  if (set === 'split') {
    // two rooms side by side (left warm, right cool), an ink divider down the middle
    for (const [side, col, wcol] of [[0, '#3a2a58', '#4a3040'], [1, '#26365a', '#2e3550']]) {
      x.save(); x.beginPath(); x.rect(side * 540, 0, 540, 1920); x.clip(); x.translate(side * 540, 0)
      const win = [110, 300, 430, 760]
      const [a, b, c, d] = win
      R(x, col, 0, 0, 540, b); R(x, col, 0, d, 540, FLOOR - d); R(x, col, 0, b, a, d - b); R(x, col, c, b, 540 - c, d - b)
      snow(x, t, { x0: a, y0: b, x1: c, y1: d, n: 18, speed: 45, cell: 6, seed: 3 + side })
      R(x, INK, a - 18, b - 18, c - a + 36, 18); R(x, INK, a - 18, d, c - a + 36, 18); R(x, INK, a - 18, b, 18, d - b); R(x, INK, c, b, 18, d - b)
      R(x, INK, (a + c) / 2 - 6, b, 12, d - b)
      R(x, INK, 0, FLOOR - 6, 540, 8); R(x, wcol, 0, FLOOR, 540, 1920 - FLOOR)
      x.restore()
    }
    R(x, INK, 532, 0, 16, 1920); R(x, BONE, 538, 0, 4, 1920)
    return
  }
  const C = SET_COLS[set] || SET_COLS.room
  const win = o.win || (set === 'kitchen' ? [300, 260, 780, 760] : set === 'bedroom' ? [560, 240, 960, 760] : set === 'cafe' ? [120, 250, 960, 820] : [150, 250, 930, 860])
  wall(x, t, { col: o.wall || C.wall, win, stripe: C.stripe, frame: set === 'cafe' ? '#2a5a4a' : '#5a3d2e' })
  floor(x, o.floor || C.floor)
  if (set === 'room') { if (o.lights !== false) fairyLights(x, t, win[0] - 30, win[2] + 30, win[1] - 40, 46, 13); if (o.lamp !== false) lamp(x, t, o.lampX ?? 150, o.warm ?? 1); if (o.couch !== false) couch(x, o.couchX ?? 560, o.couchY ?? 990, o.couchW ?? 680, o.couchCol) }
  if (set === 'cafe') cafeBits(x, t)
  if (set === 'kitchen') { stove(x, t); if (o.lights !== false) fairyLights(x, t, win[0] - 30, win[2] + 30, win[1] - 40, 30, 9) }
  if (set === 'bedroom') { bed(x, o.bedX ?? 420); nightstand(x, o.standX ?? 860) }
  if (set === 'dinner') { if (o.lights !== false) fairyLights(x, t, win[0] - 30, win[2] + 30, win[1] - 40, 46, 13) }
}
/** the long dinner table (front layer for 'dinner'), plates + candles */
export function dinnerTable(x, t, { y = 1090, w = 980, dishes = true } = {}) {
  table(x, 540, y, w, '#8a5a3a', { cloth: '#b9445a' })
  if (!dishes) return
  for (let i = 0; i < 5; i++) { const px = 540 - w / 2 + 110 + i * (w - 220) / 4; R(x, INK, px - 44, y - 14, 88, 16); R(x, '#f4f0ff', px - 40, y - 12, 80, 10) }
  for (const cx of [380, 700]) { box(x, cx - 9, y - 70, 18, 58, '#f4ead8', { b: 4 }); const f = 0.8 + 0.2 * Math.sin(t * 9 + cx); R(x, '#ffd23f', cx - 5, y - 92, 10, 18 * f); glow(x, cx, y - 90, 90, 0.8) }
  box(x, 520, y - 60, 60, 48, '#e9b24a', { b: 5 })
}

// ═══════════════════════════════════════════════════════════════════════════ the big phone (generic messages UI)
// msgs: [{ at, from: 'me' | 'them', name, text }]; typing: [a, b] shows a "…" bubble on the left
export function bigPhone(x, t, { cx = 540, cy = 860, w = 520, h = 820, title = 'the group ✦', msgs = [], typing = null, pop = 1, rot = 0, draft = null, accent = '#ff9f6b' } = {}) {
  if (pop <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(pop, pop)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 16, -h / 2 + 22, w, h)
  box(x, -w / 2, -h / 2, w, h, '#211a3c', { b: 8 })
  R(x, '#141028', -w / 2 + 18, -h / 2 + 18, w - 36, h - 36)
  // header
  R(x, '#2b2350', -w / 2 + 18, -h / 2 + 18, w - 36, 74)
  x.font = `800 30px ${INTER}`; x.fillStyle = BONE; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(title, 0, -h / 2 + 56)
  R(x, accent, -w / 2 + 40, -h / 2 + 46, 20, 20)
  // messages, bottom-anchored
  const shown = msgs.filter(m => t >= m.at)
  const bw = w - 120
  x.font = `700 27px ${INTER}`
  const laid = shown.map(m => { const rows = wrap(x, m.text, bw - 40); return { m, rows, hh: rows.length * 34 + 28 + (m.name && m.from !== 'me' ? 30 : 0) } })
  const bottom = h / 2 - 40 - (draft ? 96 : 0) - (typing && t >= typing[0] && t < typing[1] ? 70 : 0)
  let y = bottom
  x.save(); x.beginPath(); x.rect(-w / 2 + 18, -h / 2 + 92, w - 36, h - 110); x.clip()
  for (let i = laid.length - 1; i >= 0; i--) {
    const { m, rows, hh } = laid[i]
    const k = easeOutBack(prog(t, m.at, m.at + 0.25), 2.2)
    y -= hh + 14
    const mine = m.from === 'me'
    const tw = Math.max(...rows.map(r => x.measureText(r).width)) + 40
    const bx = mine ? w / 2 - 36 - tw : -w / 2 + 36
    x.save(); x.translate(bx + (mine ? tw : 0), y + hh / 2); x.scale(k, k); x.translate(-(bx + (mine ? tw : 0)), -(y + hh / 2))
    let yy = y
    if (m.name && !mine) { x.font = `700 20px ${MONO}`; x.fillStyle = m.nameCol || GOLD; x.textAlign = 'left'; x.fillText(m.name, bx + 6, yy + 12); yy += 30 }
    const bh = rows.length * 34 + 24
    R(x, INK, bx - 4, yy - 4, tw + 8, bh + 8); R(x, mine ? accent : '#e8e2f6', bx, yy, tw, bh)
    x.font = `700 27px ${INTER}`; x.fillStyle = INK; x.textAlign = 'left'
    rows.forEach((r, j) => x.fillText(r, bx + 20, yy + 30 + j * 34))
    x.restore()
  }
  if (typing && t >= typing[0] && t < typing[1]) {
    const by = bottom + 8
    R(x, INK, -w / 2 + 32, by - 4, 112, 56); R(x, '#e8e2f6', -w / 2 + 36, by, 104, 48)
    for (let i = 0; i < 3; i++) { const on = Math.floor(t * 6 + i) % 3 === 0; R(x, on ? INK : '#9a90b8', -w / 2 + 58 + i * 26, by + 18, 14, 14) }
  }
  x.restore()
  // the draft row
  if (draft) {
    const dy = h / 2 - 112
    R(x, INK, -w / 2 + 30, dy - 4, w - 60, 72); R(x, '#2b2350', -w / 2 + 34, dy, w - 68, 64)
    x.font = `700 25px ${INTER}`; x.textAlign = 'left'; x.fillStyle = draft.strike ? 'rgba(239,230,214,0.5)' : BONE
    const n = Math.max(0, Math.min(draft.text.length, Math.floor(draft.chars ?? draft.text.length)))
    const s = draft.text.slice(0, n)
    x.fillText(s, -w / 2 + 56, dy + 34)
    if (draft.strike && n > 0) R(x, RED, -w / 2 + 52, dy + 32, x.measureText(s).width + 8, 5)
    if (Math.floor(t * 2.5) % 2 === 0) R(x, BONE, -w / 2 + 58 + x.measureText(s).width, dy + 16, 4, 34)
  }
  x.restore()
}

// ═══════════════════════════════════════════════════════════════════════════ the DOM bits
// the format bug: "FRIENDS FIRST" in Inter 800 small caps, letter-spaced, top-left 56 px
function buildBug(root, at) {
  const b = el('div', { position: 'absolute', left: '56px', top: '56px', height: '44px', display: 'none', alignItems: 'center', gap: '14px', transformOrigin: '0% 50%', pointerEvents: 'none' }, root)
  el('div', { width: '18px', height: '18px', background: BUG, boxShadow: `0 0 0 4px ${INK}, 0 0 16px rgba(255,179,122,0.7)` }, b)
  el('div', { font: `800 28px ${INTER}`, letterSpacing: '0.2em', color: BUG, textShadow: '0 2px 12px rgba(6,4,18,0.9)', whiteSpace: 'nowrap', fontVariant: 'small-caps' }, b, 'FRIENDS<span style="color:rgba(255,255,255,0.7)">&nbsp;FIRST</span>')
  return {
    update(t, out = 1) {
      const k = (at <= 0 ? 1 : pop01(t, at, 0.36, 2.2)) * out
      b.style.display = k <= 0.01 ? 'none' : 'flex'
      b.style.opacity = String(clamp(k * 2) * out)
      b.style.transform = `scale(${(0.6 + 0.4 * Math.min(1, k)).toFixed(4)})`
    },
  }
}
// the CHECK-IN card: a bone talk-card look, a "CHECK-IN" chip, the words to send in Garamond italic
function buildCheck(root, { at, out, text, label: lab = 'CHECK-IN', top = 470, accent = '#c0577a' }) {
  const wrapE = el('div', { position: 'absolute', left: '0', top: top + 'px', width: '1080px', display: 'none', justifyContent: 'center', pointerEvents: 'none' }, root)
  const card = el('div', { position: 'relative', width: '760px', padding: '64px 56px 44px', background: BONE, border: `7px solid ${INK}`, borderRadius: '22px', boxShadow: `12px 14px 0 rgba(6,4,18,0.72)`, transformOrigin: '50% 60%', textAlign: 'center' }, wrapE)
  el('div', { position: 'absolute', left: '50%', top: '-30px', transform: 'translateX(-50%)', padding: '8px 22px 10px', background: BUG, border: `5px solid ${INK}`, borderRadius: '12px', font: `800 28px ${INTER}`, letterSpacing: '0.2em', color: INK, whiteSpace: 'nowrap', fontVariant: 'small-caps' }, card, '✦ ' + lab)
  const html = text.replace(/\s*\|\s*/g, '<br>').replace(/\*([^*]+)\*/g, `<span style="color:${accent}">$1</span>`)
  el('div', { font: `italic 500 62px ${SERIF}`, lineHeight: '1.12', color: INK }, card, html)
  return {
    update(t) {
      const on = t >= at && t < out[1]
      wrapE.style.display = on ? 'flex' : 'none'
      if (!on) return
      const k = easeOutBack(prog(t, at, at + 0.4), 2.2), o = outK(t, out)
      const fl = 1 - ease.outCubic(prog(t, at, at + 0.4))
      card.style.opacity = String(clamp(prog(t, at, at + 0.12) * 1.5) * o)
      card.style.transform = `translateY(${(fl * 160 - (1 - o) * 60).toFixed(1)}px) rotate(${(-3 + 4 * fl).toFixed(2)}deg) scale(${(lerp(0.5, 1, k) * lerp(0.85, 1, o)).toFixed(4)})`
    },
  }
}

// ═══════════════════════════════════════════════════════════════════════════ the episode
export function makeFriends(cfg) {
  // the story runs to cfg.dur − 4.4 exactly as written; the short end card (2.4 s) makes the film 2.0 s shorter
  const DURATION = cfg.dur - 2
  const STORY_END = DURATION - ENDCARD_SHORT_LEN
  const CPS = cfg.cps ?? 30
  const LINES = cfg.lines || []
  const BOXES = (cfg.boxes || [{ from: 0, to: LINES.length }]).map(b => ({ ...b, open: b.open ?? LINES[b.from].t - 0.22 }))
  const SHOTS = cfg.shots
  const shotAt = t => { let s = SHOTS[0]; for (const sh of SHOTS) if (t >= sh.at) s = sh; return s }
  const nextAt = sh => { const i = SHOTS.indexOf(sh); return i < SHOTS.length - 1 ? SHOTS[i + 1].at : STORY_END }
  const STARS_HOPS = talkHops(LINES, STARS, { cps: CPS })
  const hopsFor = sign => talkHops(LINES, TAG(sign), { cps: CPS })
  const PIS_DEF = { x: 950, y: 1260, s: 120, tears: 2, mood: 'sparkle', look: [-1, -0.5], tissues: true }
  const LAST_OUT = [STORY_END - 0.35, STORY_END]

  function pisces(x, t, P) {
    const o = { ...PIS_DEF, ...P }
    if (o.tissues) tissues(x, o.x - o.s * 0.75, o.y + o.s * 0.28, o.s * 0.5)
    return star(x, t, 'pisces', { seed: 6, glow: 0.8, tips: false, ...o })
  }

  async function build(stage) {
    try {
      await Promise.all(["800 112px Inter", "800 50px Inter", "800 30px Inter", "800 28px Inter", "700 27px Inter", "italic 500 150px 'EB Garamond'", "italic 500 62px 'EB Garamond'", "700 52px 'Space Mono'", "700 22px 'Space Mono'", "700 20px 'Space Mono'"].map(f => document.fonts.load(f)))
    } catch (_) { /* fonts optional */ }
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const H = cfg.hook
    const H0 = popText(root, H.text, { top: H.top ?? 150, size: H.size ?? 80, accentSize: H.accentSize ?? 116, at: -1.4, gap: 0.06, accentColor: H.color || GOLD, fit: true })
    const check = cfg.check ? buildCheck(root, cfg.check) : null
    const top = layerCanvas(root), tx = top.getContext('2d')
    const boxes = BOXES.map(b => dialogueBox(root, { lines: LINES.slice(b.from, b.to), y: b.y ?? 1430, width: 960, height: b.h ?? 270, open: b.open, close: b.close, cps: CPS }))
    const L = cfg.last
    const last = popText(root, L.text, { top: L.top ?? 300, size: L.size ?? 112, accentSize: L.accentSize ?? 170, at: L.at, gap: 0.08, accentColor: L.color ?? GOLD, wobble: true, late: 1, lateAt: L.at + 0.4, fit: true })
    const bug = buildBug(root, 0)
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
    const flash = el('div', { position: 'absolute', inset: 0, background: '#fff6ea', opacity: 0, pointerEvents: 'none' }, root)

    return {
      start: 0, end: STORY_END + 0.01, root,
      update(t) {
        const sh = shotAt(t), i = SHOTS.indexOf(sh)
        const S = { u: t - sh.at, t0: sh.at, t1: nextAt(sh), i, star, pisces, STARS_HOPS, hopsFor }
        drawSky(x, t, { ...SKY_H, dim: sh.dim ?? SKY_H.dim })
        x.save()
        // the shot camera: [zoom, cx, cy] + a slow push-in + a small punch on the cut
        const [z0, cx, cy] = sh.cam || (sh.set === 'sky' ? [1, 540, 960] : [1.14, 540, 900])
        const z = z0 * (1 + (sh.push ?? 0.035) * prog(t, sh.at, nextAt(sh))) * (sh.at > 0 && !sh.noPunch ? 1 + 0.05 * (1 - ease.outCubic(prog(t, sh.at, sh.at + 0.3))) : 1)
        x.translate(540, 960); x.scale(z, z); x.translate(-cx, -cy)
        drawSet(x, t, sh.set, sh.setOpts || {})
        sh.draw(x, t, S)
        if (sh.pis !== false) pisces(x, t, typeof sh.pis === 'object' ? sh.pis : {})
        if (sh.front) sh.front(x, t, S)
        x.restore()
        tx.clearRect(0, 0, 1080, 1920)
        if (cfg.overlay) cfg.overlay(tx, t, S)
        H0.update(t, outK(t, [H.out - 0.2, H.out]))
        if (check) check.update(t)
        for (const b of boxes) b.update(t)
        last.update(t, outK(t, LAST_OUT))
        bug.update(t, outK(t, [STORY_END - 0.3, STORY_END]))
        // white blink on every hard cut (no card transition)
        let fl = 0
        for (const s of SHOTS) if (s.at > 0 && t >= s.at && t < s.at + 0.12) fl = 1 - (t - s.at) / 0.12
        flash.style.opacity = String(0.45 * fl)
        drawGrain(gx, t)
      },
    }
  }

  const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, short: true }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl br', fadeIn: 0 })]

  // ── sound (pitched SFX are shifted into the film's key by the engine)
  const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
  const wordPops = (t0, n, gap, b0 = 0, gain = 0.024) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(b0 + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
  const PITCH = { [STARS]: 739.99 }
  const lastWords = cfg.last.text.split(/\s+/).length
  const CUES = [
    ['pop', 0.04, 1174.66, 0.04, 0], ['pluck', 0.06, 1567.98, 0.025, 0.4, 0.2],
    ...SHOTS.filter(s => s.at > 0).flatMap(s => [['whoosh', r3(s.at - 0.07), 0.26, 0.03], ['tick', r3(s.at), 0.04]]),
    ['whoosh', r3(cfg.hook.out - 0.2), 0.25, 0.02],
    ...BOXES.map(b => ['pop', r3(b.open), 739.99, 0.03, 0]),
    ...(LINES.length ? talkCues(LINES, { cps: CPS, pitch: PITCH }) : []),
    ...(cfg.check ? [['whoosh', r3(cfg.check.at - 0.05), 0.4, 0.035], ['pluck', r3(cfg.check.at + 0.3), 1318.51, 0.035, 0.6, 0], ['bell', r3(cfg.check.at + 0.34), 1760, 0.02, 1.0, 0.2], ['whoosh', r3(cfg.check.out[0]), 0.3, 0.02]] : []),
    ...wordPops(cfg.last.at, Math.max(1, lastWords - 1), 0.08, 2), ['pop', r3(cfg.last.at + 0.4), 1174.66, 0.05, 0], ['bell', r3(cfg.last.at + 0.42), 1567.98, 0.025, 1.2, 0], ['glitter', r3(cfg.last.at + 0.4), r3(cfg.last.at + 0.8)],
    ...(cfg.cues || []).map(c => c.map((v, j) => (j === 1 || (c[0] === 'glitter' && j === 2) || (c[0] === 'riser' && j === 2)) && typeof v === 'number' ? r3(v) : v)),
    ...endcardCues(STORY_END, { short: true }),
  ]

  // readability check (node only): each line ≥ 1.5 s on screen after it finishes typing
  const warn = []
  BOXES.forEach(b => {
    const ls = LINES.slice(b.from, b.to), tm = lineTimes(ls, { cps: CPS })
    tm.forEach((m, n) => { const nxt = n + 1 < ls.length ? ls[n + 1].t : b.close; if (nxt - m.done < 1.5) warn.push(`${cfg.id}: line "${ls[n].text}" only ${(nxt - m.done).toFixed(2)} s after typing`) })
    ls.forEach(l => { if (l.text.replace(/\*/g, '').length > 70) warn.push(`${cfg.id}: line over 70 chars: ${l.text}`) })
  })
  return { DURATION, STORY_END, SCENES, CUES, LINES, BOXES, warn }
}
