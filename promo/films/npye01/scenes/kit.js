// Next 30, batch b38: the shared look of two star_advice trial-reel series (promo/films/next30/b38.md):
//   YOUR SIGN AT THE HOLIDAY PARTY (npye01–npye12) and THE SIGNS AS WINTER GIFTS (ngie01–ngie12).
// Every episode imports this file from promo/films/npye01/scenes/kit.js.
//
// The format (16 s: story 0–11.6, then the shared end card):
//   0.00–2.40   hook. Frame 0 is the thumbnail: the bug, the progress bar and the headline ("*Aries* at the | holiday
//               party:" / "If *Aries* were a | winter gift:") are already up, and the sign star is mid-action.
//   2.40–5.20   beat 1, a jump cut (white flash + zoom punch) and numbered caption sticker 1.
//   5.20–8.00   beat 2, the turn, under the one card cut (5.2), caption sticker 2 (pink badge).
//   8.00–11.55  finale: THE STARS pop in and give the advice (the last line); Pisces cries happy tears.
// Pisces cries in the background of every beat (in the Pisces episodes Pisces is the hero and cries throughout).
//
//   makeEp(cfg) → { DURATION, SCENES, CUES, T, CUTS }
//     cfg.id, cfg.series ('party' | 'gifts'), cfg.sign ('aries'…), cfg.name ('Aries')
//     cfg.hook(x, t, S)                draws the hook (0–2.4). S = { u, hero, guest, ... }
//     cfg.beats: [{ caption, draw(x, t, S), cues: [[kind, dt, ...]], pis: { x, y, s } | false }] × 2
//     cfg.finale(x, t, S) optional     the hero in the finale (S.ok = pop-out factor)
//     cfg.last                         THE STARS' line (≤ 44 chars, *accent*)
//     cfg.boxCol / cfg.ribbon          gifts: the wrapping colours
//     cfg.hookCues                     extra [kind, t, ...] cues in the hook (absolute times)
// Everything draws as a pure function of t; DOM / canvases are only made inside build().
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas, drawPixelStar } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar, STAR } from '../../startalk.js'
import { popText } from '../../lesson.js'

export const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', LAV = '#c9a6ff', RED = '#e8344e', MINT = '#9fe6b0', SKYB = '#8fd3ff'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const SERIF = "'EB Garamond', Georgia, serif"
export const MONO = "'Space Mono', ui-monospace, monospace"
export const BUG_PINK = '#ff7eb6'
export const r3 = v => +v.toFixed(3)
export const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
export const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
export { clamp, lerp, prog, ease, easeOutBack, drawStarChar, signStar, STAR, drawPixelStar }

// ── the fixed timeline (same in all 24 films)
export const DURATION = 16
export const STORY_END = DURATION - ENDCARD_LEN          // 11.6
export const T = {
  beats: [[2.4, 5.2], [5.2, 8.0]], cut: 5.2, fin: 8.0,
  starsIn: 8.12, pisIn: 8.22, last: 8.3, boxClose: 11.15,
  out: [11.2, 11.55],
}
const CPS = 32

// ── drawing helpers
export const R = (x, col, X, Y, w, h) => { x.fillStyle = col; x.fillRect(Math.round(X), Math.round(Y), Math.round(w), Math.round(h)) }
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
export const FLAKE = ['..W..', 'W.W.W', '.WWW.', 'W.W.W', '..W..']
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
/** a pixel speech bubble (canvas), popping at t0, fading by t1 */
export function bubble(x, t, cx, cy, t0, t1, text, { col = BONE, ink = INK, size = 34, tail = 0, font = INTER, weight = 800 } = {}) {
  const k = pop01(t, t0, 0.25, 2.4) * outK(t, [t1 - 0.15, t1])
  if (k <= 0.01 || t < t0) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.font = `${weight} ${size}px ${font}`
  const w = x.measureText(text).width + 44, h = size + 32
  x.fillStyle = INK; x.fillRect(-w / 2 - 5, -h / 2, w + 10, h); x.fillRect(-w / 2, -h / 2 - 5, w, h + 10)
  x.fillStyle = col; x.fillRect(-w / 2, -h / 2, w, h)
  const tx = tail * (w / 2 - 40)
  x.fillStyle = INK; x.fillRect(tx - 14, h / 2 + 4, 14, 12); x.fillRect(tx - 7, h / 2 + 14, 8, 8)
  x.fillStyle = col; x.fillRect(tx - 9, h / 2, 9, 9)
  x.fillStyle = ink; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 2)
  x.restore()
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
/** a bone placard / card with centred text lines */
export function card(x, cx, cy, w, h, lines, { col = BONE, ink = INK, size = 36, rot = 0, k = 1, font = INTER, weight = 800, b = 6, gap = 1.15 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  box(x, -w / 2, -h / 2, w, h, col, { b })
  x.fillStyle = ink; x.textAlign = 'center'; x.textBaseline = 'middle'; x.font = `${weight} ${size}px ${font}`
  const n = lines.length
  lines.forEach((l, i) => x.fillText(l, 0, (i - (n - 1) / 2) * size * gap + 2))
  x.restore()
}
/** a soft floor shadow */
export function shadow(x, cx, cy, w, a = 0.35) { x.save(); x.globalAlpha = a; x.fillStyle = '#05030c'; x.beginPath(); x.ellipse(cx, cy, w / 2, w * 0.09, 0, 0, Math.PI * 2); x.fill(); x.restore() }
/** a warm spotlight cone from (tx, top) down to an ellipse at (bx, by) */
export function spotlight(x, tx, top, bx, by, w, a, col = '255,236,180') {
  if (a <= 0) return
  x.save(); x.globalCompositeOperation = 'lighter'
  const g = x.createLinearGradient(0, top, 0, by)
  g.addColorStop(0, `rgba(${col},${0.05 * a})`); g.addColorStop(1, `rgba(${col},${0.26 * a})`)
  x.fillStyle = g; x.beginPath(); x.moveTo(tx - 30, top); x.lineTo(tx + 30, top); x.lineTo(bx + w / 2, by); x.lineTo(bx - w / 2, by); x.closePath(); x.fill()
  x.fillStyle = `rgba(${col},${0.3 * a})`; x.beginPath(); x.ellipse(bx, by, w / 2, w * 0.1, 0, 0, Math.PI * 2); x.fill()
  x.restore()
}
/** a round pixel cookie */
export function cookie(x, cx, cy, r, bite = 0) {
  x.save(); x.fillStyle = INK; x.beginPath(); x.arc(cx, cy, r + 5, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#d9a35a'; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#f0c27a'; x.beginPath(); x.arc(cx - r * 0.2, cy - r * 0.2, r * 0.6, 0, Math.PI * 2); x.fill()
  for (const [a, d] of [[0.3, 0.5], [2.1, 0.55], [3.9, 0.4], [5.2, 0.6], [1.2, 0.1]]) R(x, '#5a3420', cx + Math.cos(a) * r * d - r * 0.1, cy + Math.sin(a) * r * d - r * 0.1, r * 0.2, r * 0.2)
  if (bite > 0) { x.globalCompositeOperation = 'destination-out'; x.beginPath(); x.arc(cx + r * 0.9, cy - r * 0.5, r * 0.45 * bite, 0, Math.PI * 2); x.arc(cx + r * 0.6, cy - r * 0.95, r * 0.35 * bite, 0, Math.PI * 2); x.fill() }
  x.restore()
}
/** a plate (ellipse) with optional stack height */
export function plate(x, cx, cy, w) {
  x.save(); x.fillStyle = INK; x.beginPath(); x.ellipse(cx, cy, w / 2 + 6, w * 0.16 + 6, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#f4efe6'; x.beginPath(); x.ellipse(cx, cy, w / 2, w * 0.16, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#d8d0c4'; x.beginPath(); x.ellipse(cx, cy, w * 0.34, w * 0.1, 0, 0, Math.PI * 2); x.fill()
  x.restore()
}
/** a mug of cocoa with steam */
export function mug(x, t, cx, cy, s, col = '#e8344e') {
  box(x, cx - s / 2, cy - s * 0.5, s, s, col, { b: 5, hi: 'rgba(255,255,255,0.25)' })
  R(x, INK, cx + s / 2, cy - s * 0.3, s * 0.3, s * 0.55); R(x, col, cx + s / 2 + 2, cy - s * 0.3 + 8, s * 0.3 - 12, s * 0.55 - 16)
  R(x, '#6b3d22', cx - s / 2, cy - s * 0.5, s, s * 0.12)
  for (let i = 0; i < 3; i++) { const p = (t * 0.8 + i / 3) % 1; x.save(); x.globalAlpha = 0.55 * (1 - p); R(x, BONE, cx - s * 0.25 + i * s * 0.25 + Math.sin(t * 4 + i) * 6, cy - s * 0.6 - p * s * 0.9, 8, 14); x.restore() }
}
/** a box of tissues */
export function tissues(x, cx, cy, s) {
  box(x, cx - s / 2, cy - s * 0.3, s, s * 0.6, '#9fd8f6', { b: 4, hi: '#c9ecfb' })
  R(x, INK, cx - s * 0.18 - 4, cy - s * 0.3 - 4, s * 0.36 + 8, 8)
  R(x, '#ffffff', cx - s * 0.12, cy - s * 0.3 - s * 0.32, s * 0.24, s * 0.34)
}
/** a pixel wall clock: h (0–12) and m (0–60) */
export function clock(x, cx, cy, r, h, m) {
  x.save(); x.fillStyle = INK; x.beginPath(); x.arc(cx, cy, r + 7, 0, Math.PI * 2); x.fill()
  x.fillStyle = BONE; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill()
  for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; R(x, INK, cx + Math.sin(a) * r * 0.82 - 3, cy - Math.cos(a) * r * 0.82 - 3, 6, 6) }
  const hand = (a, L, w) => { x.save(); x.translate(cx, cy); x.rotate(a); R(x, INK, -w / 2, -L, w, L); x.restore() }
  hand(((h % 12) + m / 60) / 12 * Math.PI * 2, r * 0.5, 9); hand(m / 60 * Math.PI * 2, r * 0.75, 6)
  R(x, RED, cx - 5, cy - 5, 10, 10)
  x.restore()
}
/** a generic handheld mic */
export function mic(x, cx, cy, rot = 0, s = 1) {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
  box(x, -9, 0, 18, 70, '#3a3352', { b: 5 })
  x.fillStyle = INK; x.beginPath(); x.arc(0, -10, 24, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#b9b3cc'; x.beginPath(); x.arc(0, -10, 18, 0, Math.PI * 2); x.fill()
  for (let i = -2; i <= 2; i++) R(x, '#8a84a2', i * 7 - 1, -24, 2, 28)
  x.restore()
}
/** deterministic falling snow inside a rect */
export function snowfall(x, t, X, Y, w, h, { n = 40, size = 6, speed = 70, alpha = 0.85 } = {}) {
  x.save(); x.globalAlpha = alpha
  for (let i = 0; i < n; i++) {
    const sp = speed * (0.6 + ((i * 37) % 10) / 14)
    const px = X + ((i * 137.508) % w) + Math.sin(t * 1.3 + i) * 14
    const py = Y + (((i * 97.3) % h) + t * sp) % h
    const s = size * (0.6 + (i % 3) * 0.3)
    R(x, '#ffffff', px, py, s, s)
  }
  x.restore()
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
/** a striped party hat on the top tip (sprite cells) */
export function hatCells(ctx, col = PINK, stripe = GOLD, tilt = 0) {
  ctx.save(); ctx.translate(18, 1.5); ctx.rotate(tilt); ctx.translate(-18, -1.5)
  const rows = 7
  for (let pass = 0; pass < 2; pass++) for (let j = 0; j < rows; j++) {
    const w = 1 + j * 1.15, X = 18 - w / 2, Y = -3.6 + j
    if (pass === 0) { ctx.fillStyle = INK; ctx.fillRect(X - 0.6, Y - 0.6, w + 1.2, 1.6) }
    else { ctx.fillStyle = j % 2 ? stripe : col; ctx.fillRect(X, Y, w, 1) }
  }
  ctx.fillStyle = INK; ctx.fillRect(16.9, -6.2, 2.2, 2.2); ctx.fillStyle = BONE; ctx.fillRect(17.3, -5.8, 1.4, 1.4)
  ctx.restore()
}
/** a knitted scarf round the middle (sprite cells) */
export function scarfCells(ctx, col = RED, stripe = BONE) {
  ctx.fillStyle = INK; ctx.fillRect(7.4, 24.4, 21.2, 3.4); ctx.fillRect(21.4, 26, 3.6, 8)
  for (let i = 0; i < 10; i++) { ctx.fillStyle = i % 3 === 2 ? stripe : col; ctx.fillRect(8 + i * 2, 25, 2, 2.2) }
  ctx.fillStyle = col; ctx.fillRect(22, 26.6, 2.4, 6.8); ctx.fillStyle = stripe; ctx.fillRect(22, 30, 2.4, 1)
}

// ── the bug: the series name in Inter 800 small caps, letter-spaced, top-left 56 px (already up at frame 0)
function buildBug(root, words) {
  const b = el('div', { position: 'absolute', left: '56px', top: '56px', height: '44px', display: 'flex', alignItems: 'center', gap: '14px', pointerEvents: 'none' }, root)
  el('div', { width: '18px', height: '18px', background: BUG_PINK, boxShadow: `0 0 0 4px ${INK}, 0 0 16px rgba(255,126,182,0.7)` }, b)
  el('div', { font: `800 26px ${INTER}`, letterSpacing: '0.18em', color: BUG_PINK, textShadow: '0 2px 12px rgba(6,4,18,0.9)', whiteSpace: 'nowrap', fontVariant: 'small-caps' }, b,
    `${words[0].replace(/ /g, '&nbsp;')}<span style="color:rgba(255,255,255,0.6)">&nbsp;${words[1].replace(/ /g, '&nbsp;')}</span>`)
  return { update(t, out = 1) { b.style.display = out <= 0.01 ? 'none' : 'flex'; b.style.opacity = String(out) } }
}

// ── the caption sticker: a tilted bone sticker, numbered badge, Inter 800 + one *italic* accent
function buildSticker(root, { n, text, deep, badge, at, out, tilt }) {
  const wrap = el('div', { position: 'absolute', left: '0', top: '1330px', width: '1080px', display: 'none', justifyContent: 'center', pointerEvents: 'none' }, root)
  const st = el('div', { display: 'flex', alignItems: 'center', gap: '22px', maxWidth: '960px', padding: '18px 34px 20px 22px', background: BONE, border: `6px solid ${INK}`, borderRadius: '14px',
    boxShadow: `10px 10px 0 rgba(6,4,18,0.7)`, transformOrigin: '50% 50%' }, wrap)
  el('div', { flex: '0 0 auto', width: '74px', height: '74px', borderRadius: '50%', background: badge, border: `5px solid ${INK}`, display: 'grid', placeItems: 'center', font: `800 40px ${INTER}`, color: INK }, st, String(n))
  const html = text.replace(/\*([^*]+)\*/g, `<span style="font:italic 500 62px ${SERIF};color:${deep};letter-spacing:0">$1</span>`)
  el('div', { font: `800 48px ${INTER}`, lineHeight: '1.1', color: INK, letterSpacing: '-0.01em' }, st, html)
  return {
    update(t) {
      const on = t >= at && t < out[1]
      wrap.style.display = on ? 'flex' : 'none'
      if (!on) return
      const k = easeOutBack(prog(t, at, at + 0.34), 2.6), o = outK(t, out)
      st.style.opacity = String(clamp(prog(t, at, at + 0.1)) * o)
      st.style.transform = `translateY(${((1 - o) * 30).toFixed(1)}px) scale(${(lerp(0.4, 1, k) * lerp(0.85, 1, o)).toFixed(4)}) rotate(${tilt}deg)`
    },
  }
}

// ── the fake progress bar: 4 segments (hook, beat 1, beat 2, advice) under the bug
const SEGS = [[0, 2.4], [2.4, 5.2], [5.2, 8.0], [8.0, 11.15]]
function drawBar(x, t, col) {
  const k = outK(t, T.out)
  if (k <= 0.01) return
  const X0 = 56, X1 = 1024, GAP = 10, n = SEGS.length, w = (X1 - X0 - GAP * (n - 1)) / n, Y = 120, Hh = 8
  x.save(); x.globalAlpha = clamp(k)
  SEGS.forEach(([a, b], i) => {
    const sx = X0 + i * (w + GAP)
    R(x, 'rgba(239,230,214,0.25)', sx, Y, w, Hh)
    const f = Math.max(prog(t, a, b), i === 0 ? 0.04 : 0)
    if (f > 0) R(x, i === 3 ? col : BONE, sx, Y, w * f, Hh)
  })
  x.restore()
}

// ═════════════════════════════════════════════════════════════ the sets
// PARTY: a cozy room. A window on the night sky (snow falling), string lights, a wreath, a warm floor.
export const WALL = '#2b1b48', FLOOR_Y = 1150
function stringLights(x, t, y0, sag, n, phase = 0) {
  const pts = []
  for (let i = 0; i <= 60; i++) { const u = i / 60, X = -20 + u * 1120, Y = y0 + sag * Math.sin(Math.PI * ((u * 2) % 1)); pts.push([X, Y]) }
  x.save(); x.strokeStyle = '#140c26'; x.lineWidth = 5; x.beginPath(); pts.forEach(([X, Y], i) => i ? x.lineTo(X, Y) : x.moveTo(X, Y)); x.stroke(); x.restore()
  const cols = [GOLD, PINK, '#7fd0ff', MINT, '#ff9a5a']
  for (let i = 0; i < n; i++) {
    const u = (i + 0.5) / n, X = -20 + u * 1120, Y = y0 + sag * Math.sin(Math.PI * ((u * 2) % 1)) + 10
    const c = cols[i % cols.length], tw = 0.6 + 0.4 * Math.sin(t * 3 + i * 1.7 + phase)
    x.save(); x.globalCompositeOperation = 'lighter'
    const g = x.createRadialGradient(X, Y + 10, 2, X, Y + 10, 46); g.addColorStop(0, c + '88'); g.addColorStop(1, c + '00')
    x.globalAlpha = tw; x.fillStyle = g; x.fillRect(X - 46, Y - 36, 92, 92); x.restore()
    R(x, INK, X - 9, Y - 4, 18, 30); R(x, c, X - 5, Y + 2, 10, 18); R(x, '#5a5470', X - 6, Y - 4, 12, 6)
  }
}
function wreath(x, t, cx, cy, r) {
  for (let i = 0; i < 28; i++) {
    const a = i / 28 * Math.PI * 2, X = cx + Math.cos(a) * r, Y = cy + Math.sin(a) * r
    R(x, INK, X - 16, Y - 16, 32, 32)
  }
  for (let i = 0; i < 28; i++) {
    const a = i / 28 * Math.PI * 2, X = cx + Math.cos(a) * r, Y = cy + Math.sin(a) * r
    R(x, i % 2 ? '#2f8a4e' : '#3fa862', X - 12, Y - 12, 24, 24)
    if (i % 5 === 0) R(x, RED, X - 5, Y - 5, 10, 10)
  }
  drawBits(x, ['RR.RR', 'RRRRR', '.RRR.', 'R.R.R'], { R: RED }, cx, cy + r + 4, 8)
  void t
}
export function drawRoom(x, t, { win = true, wreathOn = true, lightsY = 420, dim = 0 } = {}) {
  const g = x.createLinearGradient(0, 0, 0, FLOOR_Y)
  g.addColorStop(0, '#1d1236'); g.addColorStop(1, WALL)
  x.fillStyle = g; x.fillRect(0, 0, 1080, FLOOR_Y)
  // wallpaper dots
  x.fillStyle = 'rgba(255,255,255,0.035)'
  for (let j = 0; j < 14; j++) for (let i = 0; i < 12; i++) if ((i + j) % 2 === 0) x.fillRect(i * 92 + 30, j * 84 + 20, 8, 8)
  if (win) {
    const X = 70, Y = 470, W = 380, H = 420
    x.save(); x.beginPath(); x.rect(X, Y, W, H); x.clip()
    drawSky(x, t, { ...SKY_H, zoom: 1.2 })
    snowfall(x, t, X, Y, W, H, { n: 26, size: 7, speed: 60 })
    R(x, '#dfe8f5', X, Y + H - 40, W, 40)
    x.restore()
    R(x, INK, X - 14, Y - 14, W + 28, 14); R(x, INK, X - 14, Y + H, W + 28, 14); R(x, INK, X - 14, Y, 14, H); R(x, INK, X + W, Y, 14, H)
    R(x, '#5a3d2e', X - 8, Y - 8, W + 16, 8); R(x, '#5a3d2e', X - 8, Y + H, W + 16, 8); R(x, '#5a3d2e', X - 8, Y, 8, H); R(x, '#5a3d2e', X + W, Y, 8, H)
    R(x, INK, X + W / 2 - 7, Y, 14, H); R(x, INK, X, Y + H / 2 - 7, W, 14)
    R(x, '#7a5a44', X - 30, Y + H + 10, W + 60, 22); R(x, INK, X - 30, Y + H + 32, W + 60, 6)
  }
  if (wreathOn) wreath(x, t, 850, 640, 92)
  // floor
  R(x, INK, 0, FLOOR_Y - 8, 1080, 10)
  R(x, '#4a2f3e', 0, FLOOR_Y, 1080, 1920 - FLOOR_Y)
  for (let j = 0; j < 10; j++) { R(x, 'rgba(0,0,0,0.18)', 0, FLOOR_Y + 40 + j * 70, 1080, 4); for (let i = 0; i < 5; i++) R(x, 'rgba(0,0,0,0.12)', ((i * 260 + j * 130) % 1180) - 50, FLOOR_Y + 44 + j * 70, 4, 66) }
  R(x, 'rgba(255,200,140,0.07)', 0, FLOOR_Y, 1080, 120)
  stringLights(x, t, lightsY, 80, 16)
  if (dim > 0) { x.fillStyle = `rgba(8,4,20,${dim})`; x.fillRect(0, 0, 1080, 1920) }
}
// GIFTS: a snowy night under a pixel pine.
export function pine(x, t, cx, base, s) {
  R(x, INK, cx - s * 0.09 - 6, base - s * 0.2, s * 0.18 + 12, s * 0.2 + 6); R(x, '#6b4a2f', cx - s * 0.09, base - s * 0.2, s * 0.18, s * 0.2)
  for (let k = 0; k < 4; k++) {
    const w = s * (0.95 - k * 0.2), y1 = base - s * 0.18 - k * s * 0.24, h = s * 0.34
    x.fillStyle = INK; x.beginPath(); x.moveTo(cx - w / 2 - 10, y1 + 6); x.lineTo(cx, y1 - h - 12); x.lineTo(cx + w / 2 + 10, y1 + 6); x.closePath(); x.fill()
    x.fillStyle = k % 2 ? '#2f8a4e' : '#287a44'; x.beginPath(); x.moveTo(cx - w / 2, y1); x.lineTo(cx, y1 - h); x.lineTo(cx + w / 2, y1); x.closePath(); x.fill()
    x.fillStyle = '#eef3fb'; x.beginPath(); x.moveTo(cx - w * 0.3, y1 - h * 0.45); x.lineTo(cx, y1 - h); x.lineTo(cx + w * 0.3, y1 - h * 0.45); x.lineTo(cx, y1 - h * 0.62); x.closePath(); x.fill()
  }
  const cols = [GOLD, PINK, '#7fd0ff', MINT]
  for (let i = 0; i < 9; i++) {
    const k = i % 4, w = s * (0.9 - k * 0.2), yy = base - s * 0.24 - k * s * 0.24 - (i % 3) * 10, xx = cx + ((i * 0.37) % 1 - 0.5) * w * 0.7
    const tw = 0.5 + 0.5 * Math.sin(t * 3.4 + i * 2.1)
    R(x, INK, xx - 9, yy - 9, 18, 18); x.save(); x.globalAlpha = 0.5 + 0.5 * tw; R(x, cols[i % 4], xx - 5, yy - 5, 10, 10); x.restore()
  }
  drawPixelStar(x, cx, base - s * 1.18, 46, 2, GOLD)
}
export function drawSnowNight(x, t, { tree = true } = {}) {
  drawSky(x, t, SKY_H)
  // far hills
  x.fillStyle = '#b9c7e0'; x.beginPath(); x.moveTo(0, 1120)
  for (let i = 0; i <= 20; i++) x.lineTo(i * 54, 1100 - 40 * Math.sin(i * 0.7) - 20 * Math.sin(i * 1.9))
  x.lineTo(1080, 1920); x.lineTo(0, 1920); x.closePath(); x.fill()
  R(x, INK, 0, 1146, 1080, 8)
  R(x, '#e6eef9', 0, 1154, 1080, 766)
  for (let i = 0; i < 18; i++) R(x, '#cfdcef', (i * 173) % 1080, 1190 + (i * 61) % 600, 70, 8)
  if (tree) pine(x, t, 150, 1160, 560)
  snowfall(x, t, 0, 0, 1080, 1920, { n: 70, size: 7, speed: 80, alpha: 0.8 })
}
/** a wrapped gift box: bottom centre (cx, base), lid offset/rotation, ribbon state 0…1 (1 = bow tied) */
export function giftBox(x, t, cx, base, w, h, col, rib, { lidDy = 0, lidDx = 0, lidRot = 0, bow = 1, open = false, shake = 0 } = {}) {
  const sx = shake ? Math.sin(t * 40) * shake : 0
  x.save(); x.translate(sx, 0)
  // body
  box(x, cx - w / 2, base - h, w, h, col, { b: 7, lo: 'rgba(0,0,0,0.18)' })
  R(x, rib, cx - w * 0.07, base - h, w * 0.14, h)
  if (open) { R(x, '#140c26', cx - w / 2, base - h, w, 18) }
  // lid
  x.save(); x.translate(cx + lidDx, base - h - 10 + lidDy); x.rotate(lidRot)
  box(x, -w / 2 - 18, -48, w + 36, 58, col, { b: 7, hi: 'rgba(255,255,255,0.22)' })
  R(x, rib, -w * 0.07, -48, w * 0.14, 58)
  if (bow > 0.01) {
    x.save(); x.scale(bow, bow)
    drawBits(x, ['BB.....BB', 'BBB...BBB', 'BBBBKBBBB', 'BBB...BBB', 'BB.....BB'], { B: rib, K: '#ffffff' }, 0, -76, 13)
    x.restore()
  }
  x.restore()
  x.restore()
}

// ═════════════════════════════════════════════════════════════ the episode
const SERIES = {
  party: { bug: ['YOUR SIGN', 'AT THE HOLIDAY PARTY'], head: n => `*${n}* at the | holiday party:`, set: (x, t) => drawRoom(x, t) },
  gifts: { bug: ['THE SIGNS', 'AS WINTER GIFTS'], head: n => `If *${n}* were a | winter gift:`, set: (x, t) => drawSnowNight(x, t) },
}

export function makeEp(cfg) {
  const SER = SERIES[cfg.series]
  const HERO = signStar(cfg.sign), PIS = signStar('pisces')
  const SPEAK = 'THE STARS'
  const LINES = [{ t: T.last, speaker: SPEAK, text: cfg.last }]
  const STARS_HOPS = [T.starsIn + 0.3, ...talkHops(LINES, SPEAK, { cps: CPS })]
  const FIN_HOPS = [T.fin + 0.05, T.fin + 0.5, T.last + 1.9]
  const PIS_DEF = { x: 940, y: 1175, s: 130 }
  const isPis = cfg.sign === 'pisces'

  const hero = (x, t, o = {}) => drawStarChar(x, o.x, o.y, o.s, t, { color: HERO.color, glyph: o.s >= 150 ? HERO.glyph : null, seed: 3, glow: 1.1, ...o })
  const guest = (x, t, id, o = {}) => { const C = signStar(id); return drawStarChar(x, o.x, o.y, o.s, t, { color: C.color, glyph: null, seed: o.seed ?? 5, glow: 0.8, ...o }) }
  /** draw a star and run fn in its sprite cells (for hats, scarves, tears) */
  const dress = (x, t, o, fn) => { const F = starFrame(o.x, o.y, o.s, t, o); inSprite(x, F, fn); return F }
  const heroHat = (x, t, o) => { if (cfg.series === 'party') dress(x, t, o, () => hatCells(x, cfg.hat || PINK, cfg.hatStripe || GOLD, o.hatTilt || 0.12)) }

  function pisces(x, t, P, tears, mood = 'sparkle', look = [-1, -0.5]) {
    const opts = { color: PIS.color, mood, look, seed: 6, glow: 0.8, pop: P.pop ?? 1, alpha: P.alpha ?? 1, hops: P.hops, tips: false }
    drawStarChar(x, P.x, P.y, P.s, t, opts)
    const F = starFrame(P.x, P.y, P.s, t, opts)
    if (tears) inSprite(x, F, () => tearsCells(x, t, tears))
    if (cfg.series === 'party') inSprite(x, F, () => hatCells(x, MINT, BONE, -0.15))
    return F
  }

  const helpers = { hero, guest, dress, heroHat, pisces, HERO, cfg }

  async function build(stage) {
    try {
      await Promise.all(["800 116px Inter", "800 80px Inter", "800 48px Inter", "800 26px Inter", "800 36px Inter", "italic 500 116px 'EB Garamond'", "italic 500 62px 'EB Garamond'", "700 52px 'Space Mono'", "700 28px 'Space Mono'"].map(f => document.fonts.load(f)))
    } catch (_) { /* fonts optional */ }
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const H0 = popText(root, SER.head(cfg.name), { top: 150, size: 80, accentSize: 116, at: -1, gap: 0.07, accentColor: cfg.accent || HERO.color, fit: true })
    const stickers = cfg.beats.map((b, i) => buildSticker(root, { n: i + 1, text: b.caption, deep: cfg.deep || '#7a2a5a', badge: i === 1 ? PINK : HERO.color, at: T.beats[i][0] + 0.3, out: [T.beats[i][1] - 0.18, T.beats[i][1]], tilt: [-2, 1.6][i] }))
    const top = layerCanvas(root), tx = top.getContext('2d')
    const box1 = dialogueBox(root, { lines: LINES, y: 1420, open: T.last - 0.2, close: T.boxClose, cps: CPS })
    const bug = buildBug(root, SER.bug)
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
    const flash = el('div', { position: 'absolute', inset: 0, background: '#fff6ea', opacity: 0, pointerEvents: 'none' }, root)

    function finale(t) {
      if (t < T.fin || t > T.out[1]) return
      const ok = popOut(t, T.out)
      if (ok <= 0) return
      const S = { ...helpers, ok, u: t - T.fin, t0: T.fin, HOPS: FIN_HOPS }
      if (cfg.finale) cfg.finale(x, t, S)
      else {
        shadow(x, 540, 1110, 240 * ok)
        const o = { x: 540, y: 900, s: 290, pop: ok, mood: 'sparkle', look: [0, 0], hops: FIN_HOPS }
        hero(x, t, o); heroHat(x, t, o)
      }
      // THE STARS
      const sk = pop01(t, T.starsIn, 0.38, 2.1) * ok
      if (sk > 0.01) drawStarChar(x, 170, 1235, 150, t, { color: STAR.sky, mood: t > T.last + 1.6 ? 'happy' : 'neutral', look: [1, -0.3], hops: STARS_HOPS, pop: sk, seed: 2, glow: 1.05 })
      // Pisces: happy-tear fountains (in the Pisces episodes, a friend holds the tissues instead)
      const pk = pop01(t, T.pisIn, 0.36, 2.2) * ok
      if (pk > 0.01) {
        if (isPis) {
          const fr = cfg.friend || 'cancer'
          guest(x, t, fr, { x: 910, y: 1235, s: 150, pop: pk, mood: 'happy', look: [-1, -0.5], hops: [T.pisIn + 0.3, T.last + 1.2] })
          tissues(x, 910 - 95, 1270, 70 * pk)
        } else {
          pisces(x, t, { x: 910, y: 1235, s: 150, pop: pk, hops: [T.pisIn + 0.3, T.last + 0.6, T.last + 1.4] }, 3, 'sparkle', [-1, -1])
          if (cfg.series === 'gifts') giftBox(x, t, 910 - 92, 1300, 70 * pk, 56 * pk, cfg.boxCol || HERO.color, cfg.ribbon || BONE, { bow: pk * 0.4 })
          else tissues(x, 910 - 96, 1272, 66 * pk)
        }
      }
    }

    return {
      start: 0, end: STORY_END + 0.01, root,
      update(t) {
        SER.set(x, t)
        // the hook
        if (t < T.beats[0][0]) cfg.hook(x, t, { ...helpers, u: t })
        // the two beats: jump cuts with a zoom punch
        cfg.beats.forEach((b, i) => {
          const [a, e] = T.beats[i]
          if (t < a || t >= e) return
          const punch = i === 1 ? 1 : 1 + 0.07 * (1 - ease.outCubic(prog(t, a, a + 0.28)))
          x.save(); x.translate(540, 900); x.scale(punch, punch); x.translate(-540, -900)
          b.draw(x, t, { ...helpers, u: t - a, t0: a, t1: e, i })
          x.restore()
          // Pisces in the background, sniffling
          if (b.pis === false || isPis) return
          const P = { ...PIS_DEF, ...(b.pis || {}) }
          const pk = pop01(t, a + 0.2, 0.3, 2) * outK(t, [e - 0.12, e])
          if (pk > 0.01) {
            tissues(x, P.x - P.s * 0.74, P.y + P.s * 0.26, P.s * 0.5 * Math.min(1, pk))
            pisces(x, t, { ...P, pop: pk }, i === 1 ? 2 : 1, i === 1 ? 'sparkle' : 'wide', P.look || [-1, -0.6])
          }
        })
        finale(t)
        drawBar(x, t, BUG_PINK)
        tx.clearRect(0, 0, 1080, 1920)
        if (cfg.top) cfg.top(tx, t, helpers)
        sparkles(tx, t, 540, 860, T.fin + 0.02, 12, 330, 1, [GOLD, BONE, PINK])
        H0.update(t, outK(t, T.out))
        stickers.forEach(s => s.update(t))
        box1.update(t)
        bug.update(t, outK(t, [T.out[0] + 0.05, T.out[1]]))
        // white flash on the hard cuts (not the card cut)
        const fl = Math.max(0, ...[T.beats[0][0], T.fin].map(c => (t >= c && t < c + 0.12) ? 1 - (t - c) / 0.12 : 0))
        flash.style.opacity = String(0.5 * fl)
        drawGrain(gx, t)
      },
    }
  }

  // one card-cut candidate: under the swap into the turn
  const CUTS = [{ t: T.cut, kind: 'flip' }]
  const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl br' }), cardCuts(CUTS)]

  // ── sound (pitched SFX are shifted into the film's key by the engine)
  const CUES = [
    ['pop', 0.02, 987.77, 0.035, 0], ['glitter', 0.02, 0.4],
    ...(cfg.series === 'party' ? [['bell', 0.05, 1174.66, 0.02, 1.2, -0.3], ['bell', 0.13, 1479.98, 0.018, 1.1, 0.3]] : [['bell', 0.05, 1318.51, 0.02, 1.4, 0]]),
    ...(cfg.hookCues || []),
    ...cfg.beats.flatMap((b, i) => {
      const a = T.beats[i][0], st = a + 0.3
      return [
        ...(i === 0 ? [['whoosh', r3(a - 0.08), 0.28, 0.035], ['tick', a, 0.05]] : []),
        ['pop', r3(st), 1174.66, 0.045, 0.1], ['pop', r3(st + 0.07), 1567.98, 0.03, -0.1], ['tick', r3(st + 0.02), 0.04],
        ...(b.cues || []).map(c => [c[0], r3(c[1] + a), ...c.slice(2)]),
      ]
    }),
    ['whoosh', r3(T.fin - 0.08), 0.3, 0.035], ['tick', T.fin, 0.05], ['glitter', r3(T.fin + 0.02), r3(T.fin + 0.5)],
    ['pop', r3(T.starsIn + 0.05), 739.99, 0.035, -0.4], ['pop', r3(T.pisIn + 0.05), 987.77, 0.03, 0.4],
    ...talkCues(LINES, { cps: CPS }),
    ['whoosh', T.out[0], 0.35, 0.03],
    ...cardCutCues(CUTS),
    ...endcardCues(STORY_END),
  ]
  return { DURATION, SCENES, CUES, T, CUTS }
}
