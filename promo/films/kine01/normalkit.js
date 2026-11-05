// normalkit — IS THIS NORMAL? (Star Talk Month 2 boost, batch m13: kine01–kine20, star_advice posts).
// Read-only for every other film: kine02–kine20 import it from '../../kine01/normalkit.js'.
//
// The format: a big relatable question slams in at frame 0 while the asking sign is mid-chaos; a pattern break in the
// first second (record-scratch freeze + "caught" circle, whip zoom or colour flash); the premise lands by ~3 s; the
// NORMAL-O-METER (a pixel gauge: WEIRD · NORMAL · SO NORMAL) swings around and lands with a stamp; THE STARS answer in
// the dialogue box (why it happens, then what helps); the takeaway line pops; Pisces cries in every film.
// No end card, no card cut, no logo. Endings are a hard cut (the last line holds ~0.8 s) or a seamless loop back into
// the frame-0 composition (cfg.ending = 'loop': hookkit's loopBack blends a copy of frame 0 over the last 0.4 s).
// Hook effects come from the shared promo/films/hookkit.js: the slam title (landed at frame 0), a whip zoom caught
// mid-zoom at frame 0, record scratch + freeze + "caught" circle, chapter stickers and loopBack. cfg.fx adds any other
// hookkit effect: [[factory, cuesFn, opts], …].
//
//   makeNormal(cfg) → { DURATION, SCENES, CUES }
//   cfg = {
//     id, D, ending: 'cut' | 'loop', hero: 'cancer' (the asking sign),
//     hook: { text: 'Miss the ex | *YOU* broke up with?', top, size, accent, out: [a, b] }   (≤ 7 words, on screen at t = 0)
//     rec:    { at, len, caption, sub }   record scratch + freeze (hookkit) · catch: { at, x, y, r, out, label, arrow }
//     whips:  [{ at, … }] extra whip zooms (hookkit) · flashes: [{ t, col, a, d }] colour flashes
//     heads:  [{ text, at, out: [a, b], top, size, accent }]                                   later headlines (popText)
//     meter:  { at, land: 'so' | 'normal', out: [a, b], cx, cy, s }                             the verdict gauge
//     lines:  [{ t, text, speaker? }]  (THE STARS unless speaker), box: { y, open, close }
//     boxes:  [{ lines, y, open, close }]  extra dialogue boxes (long films: one per chapter)
//     stars:  { in, out: [a, b], x, y, s }                                                       THE STARS narrator pose
//     last:   { text, at, top, size, accent }                                                   the takeaway (holds to D / loop)
//     scene(x, t, S)  the film's world, drawn under the kit's overlays (S: helpers, see below)
//     chapters: [{ at, n, title }]   (long films) chapter stickers
//     promise: { text, at, out }      (long films) a "wait for the verdict" sticker
//     shakes: [t…], punches: [t…]     camera shake / zoom punch moments
//     cues: [...]                     the film's own cues (absolute times)
//   }
//   S = { hero(x, t, o), stars(x, t, o), pis(x, t, o), sign(id) → drawer, img }
// Pure f(t) throughout; the DOM is only made inside build().
import { clamp, lerp, prog, ease, el } from '../../src/lib.js'
import { fill, A } from '../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas, drawPixelStar } from '../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../wheel.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar, STAR } from '../startalk.js'
import { popText } from '../lesson.js'
import { drawPhone } from '../sxmail1/scenes/mail.js'
import { whipZoom, whipZoomCues, slamTitle, slamTitleCues, recordScratch, recordScratchCues, frozen, freezeTime, caught, caughtCues, chapter, chapterCues, loopBack, loopCues } from '../hookkit.js'

export const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', LAV = '#c9a6ff', RED = '#e8344e', MINT = '#7dffb0', CYAN = '#7fe0ff'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const SERIF = "'EB Garamond', Georgia, serif"
export const MONO = "'Space Mono', ui-monospace, monospace"
export const r3 = v => +v.toFixed(3)
export const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
export const inK = (t, [a, b]) => ease.outCubic(prog(t, a, b))
export const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
export const win = (t, a, b) => t >= a && t < b
export { clamp, lerp, prog, ease, easeOutBack, drawStarChar, signStar, STAR, drawPixelStar, drawPhone, A, freezeTime }
export * as hook from '../hookkit.js'

export const NAMES = { aries: 'ARIES', taurus: 'TAURUS', gemini: 'GEMINI', cancer: 'CANCER', leo: 'LEO', virgo: 'VIRGO', libra: 'LIBRA', scorpio: 'SCORPIO', sagittarius: 'SAGITTARIUS', capricorn: 'CAPRICORN', aquarius: 'AQUARIUS', pisces: 'PISCES' }
export const tag = id => `${signStar(id).glyph}︎ ${NAMES[id]}`

// ─────────────────────────────────────────────── drawing helpers
export const R = (x, col, X, Y, w, h) => { x.fillStyle = col; x.fillRect(Math.round(X), Math.round(Y), Math.round(w), Math.round(h)) }
export function box(x, X, Y, w, h, col, { b = 6, hi = null, lo = null } = {}) {
  R(x, INK, X - b, Y - b, w + 2 * b, h + 2 * b); R(x, col, X, Y, w, h)
  if (hi) R(x, hi, X, Y, w, Math.max(b, h * 0.14))
  if (lo) R(x, lo, X, Y + h - Math.max(b, h * 0.14), w, Math.max(b, h * 0.14))
}
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
export const BROKEN = ['.HH.HH.', 'HHH.HHH', 'HH.HHHH', '.HH.HH.', '..H.H..', '...H...']
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
export function hearts(x, t, t0, cx, cy, { n = 5, cell = 6, spread = 120, life = 1.4, cols = ['#ff5c8a', '#ff8fb1', GOLD] } = {}) {
  for (let i = 0; i < n; i++) {
    const b = t0 + i * 0.16, p = (t - b) / life
    if (p < 0 || p > 1) continue
    const hx = cx + Math.sin(i * 2.3) * spread * 0.5 + Math.sin(t * 3 + i) * 10, hy = cy - p * 200
    drawBits(x, HEART, { H: cols[i % cols.length] }, hx, hy, cell * (0.6 + 0.4 * Math.min(1, p * 4)), { alpha: 1 - ease.inQuad(p) })
  }
}
export function confetti(x, t, t0, cx, cy, { n = 26, life = 2.2, cols = [GOLD, PINK, '#7fd0ff', '#9fe6b0', BONE] } = {}) {
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
/** a pixel speech bubble (canvas) popping at t0, gone by t1 */
export function bubble(x, t, cx, cy, t0, t1, text, { col = BONE, ink = INK, size = 34, tail = 0, font = INTER, weight = 800, up = false } = {}) {
  const k = pop01(t, t0, 0.25, 2.4) * outK(t, [t1 - 0.15, t1])
  if (k <= 0.01 || t < t0 || t >= t1) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.font = `${weight} ${size}px ${font}`
  const w = x.measureText(text).width + 44, h = size + 32
  x.fillStyle = INK; x.fillRect(-w / 2 - 5, -h / 2, w + 10, h); x.fillRect(-w / 2, -h / 2 - 5, w, h + 10)
  x.fillStyle = col; x.fillRect(-w / 2, -h / 2, w, h)
  const tx = tail * (w / 2 - 40), dy = up ? -1 : 1
  x.fillStyle = INK; x.fillRect(tx - 14, dy * (h / 2 + 4) - (up ? 12 : 0), 14, 12); x.fillRect(tx - 7, dy * (h / 2 + 14) - (up ? 8 : 0), 8, 8)
  x.fillStyle = col; x.fillRect(tx - 9, up ? -h / 2 - 9 : h / 2, 9, 9)
  x.fillStyle = ink; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 2)
  x.restore()
}
export function label(x, text, cx, cy, { size = 28, col = BONE, align = 'center', alpha = 1, font = MONO, weight = 700, rot = 0 } = {}) {
  if (alpha <= 0) return
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot)
  x.font = `${weight} ${size}px ${font}`; x.textAlign = align; x.textBaseline = 'middle'
  x.fillStyle = 'rgba(6,4,18,0.85)'; x.fillText(text, 3, 4)
  x.fillStyle = col; x.fillText(text, 0, 0)
  x.restore()
}
export function shadow(x, cx, cy, w, a = 0.35) { x.save(); x.globalAlpha = a; x.fillStyle = '#05030c'; x.beginPath(); x.ellipse(cx, cy, w / 2, w * 0.09, 0, 0, Math.PI * 2); x.fill(); x.restore() }
export function glowAt(x, cx, cy, r, rgb, a) {
  if (a <= 0) return
  x.save(); x.globalCompositeOperation = 'lighter'
  const g = x.createRadialGradient(cx, cy, 0, cx, cy, r); g.addColorStop(0, `rgba(${rgb},${a})`); g.addColorStop(1, `rgba(${rgb},0)`)
  x.fillStyle = g; x.fillRect(cx - r, cy - r, 2 * r, 2 * r); x.restore()
}
/** a floor strip / room: a dark back wall band and a floor line */
export function room(x, { wall = '#1d1640', floor = '#2a2052', y = 1180, alpha = 1 } = {}) {
  if (alpha <= 0) return
  x.save(); x.globalAlpha *= alpha
  x.fillStyle = wall; x.globalAlpha *= 0.55; x.fillRect(0, 380, 1080, y - 380); x.globalAlpha /= 0.55
  R(x, INK, 0, y - 6, 1080, 12); R(x, floor, 0, y + 6, 1080, 1920 - y)
  for (let i = 0; i < 9; i++) R(x, 'rgba(239,230,214,0.06)', i * 130 + 10, y + 40 + (i % 2) * 30, 80, 6)
  x.restore()
}
/** a pixel tissue box */
export function tissues(x, cx, cy, s) {
  box(x, cx - s / 2, cy - s * 0.3, s, s * 0.6, '#9fd8f6', { b: 4, hi: '#c9ecfb' })
  R(x, INK, cx - s * 0.18 - 4, cy - s * 0.3 - 4, s * 0.36 + 8, 8)
  R(x, '#ffffff', cx - s * 0.12, cy - s * 0.3 - s * 0.32, s * 0.24, s * 0.34)
}
/** a small handheld phone (canvas) with a few lines of screen text */
export function miniPhone(x, cx, cy, { rot = 0, s = 1, lines = [], glow = 0, col = '#14102a', textCol = BONE } = {}) {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
  if (glow > 0) glowAt(x, 0, 0, 260, '170,200,255', 0.25 * glow)
  box(x, -70, -125, 140, 250, '#2a2148', { b: 7 })
  R(x, col, -58, -108, 116, 210)
  x.textAlign = 'center'; x.textBaseline = 'middle'
  lines.forEach((l, i) => { x.font = `700 ${l.size || 18}px ${MONO}`; x.fillStyle = l.col || textCol; x.fillText(l.text, 0, -70 + i * 26 + (l.dy || 0)) })
  x.restore()
}

// ── star sprite frame (mirrors startalk.js drawStarChar) so props can sit on the sprite through hops and squash
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
/** sweat drop on the sprite's brow (sprite cells) */
export function sweatCells(ctx, t) {
  const p = (t * 0.9) % 1
  ctx.fillStyle = INK; ctx.fillRect(28.6, 8 + p * 6 - 0.3, 2.6, 3.6)
  ctx.fillStyle = '#8fe3ff'; ctx.fillRect(29, 8 + p * 6, 1.8, 2.8)
}

// ─────────────────────────────────────────────── the NORMAL-O-METER
// A pixel half-dial: WEIRD (red) · NORMAL (gold) · SO NORMAL (mint). The needle wakes up at `at`, swings wildly,
// then settles on the verdict with a damped spring; the stamp slams at at + METER.land.
export const METER = { pop: 0.3, swing: 1.6, land: 1.75 }
const ZONES = [[0, 1 / 3, RED, 'WEIRD'], [1 / 3, 2 / 3, GOLD, 'NORMAL'], [2 / 3, 1, MINT, 'SO NORMAL']]
export function meterValue(t, at, land = 'so', wobble = 0) {
  const target = land === 'so' ? 0.86 : land === 'normal' ? 0.5 : land
  const u = t - at
  if (u < METER.pop) return 0.04
  const s = u - METER.pop
  if (s < METER.swing) {
    // calculating: it slams to one end, then the other, ticks around, getting closer
    const p = s / METER.swing
    const wild = 0.5 + 0.48 * Math.sin(s * 9.5 + 1.2 * Math.sin(s * 4)) * (1 - 0.55 * p)
    return clamp(lerp(wild, target, ease.inCubic(p)) + wobble * Math.sin(s * 30) * 0.03)
  }
  const d = s - METER.swing
  return clamp(target + 0.08 * Math.exp(-d * 6) * Math.sin(d * 22))
}
export function drawMeter(x, t, { at, land = 'so', cx = 540, cy = 1000, s = 1, alpha = 1, out = null, wobble = 0 } = {}) {
  let k = pop01(t, at, METER.pop, 2.2)
  if (out) k *= outK(t, out)
  if (k <= 0.01 || t < at) return
  const v = meterValue(t, at, land, wobble), Rr = 300
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.scale(s * k, s * k)
  // body plate
  const W2 = 760, Hh = 420
  box(x, -W2 / 2, -Rr - 70, W2, Hh, '#1a1238', { b: 8, hi: '#2a1f55' })
  // the arc: chunky cells
  const N = 30, c = 34
  for (let pass = 0; pass < 2; pass++) for (let i = 0; i <= N; i++) {
    const f = i / N, a = Math.PI + f * Math.PI
    const px = Math.round((Math.cos(a) * Rr) / 4) * 4, py = Math.round((Math.sin(a) * Rr) / 4) * 4
    const z = ZONES.find(z2 => f <= z2[1] + 1e-6)
    if (pass === 0) R(x, INK, px - c / 2 - 5, py - c / 2 - 5, c + 10, c + 10)
    else { R(x, z[2], px - c / 2, py - c / 2, c, c); R(x, 'rgba(255,255,255,0.35)', px - c / 2, py - c / 2, c, 6) }
  }
  // zone labels
  x.textAlign = 'center'; x.textBaseline = 'middle'; x.font = `800 30px ${INTER}`
  const lab = (txt, f, col) => { const a = Math.PI + f * Math.PI, lx = Math.cos(a) * (Rr - 95), ly = Math.sin(a) * (Rr - 95); x.fillStyle = 'rgba(6,4,18,0.85)'; x.fillText(txt, lx + 2, ly + 3); x.fillStyle = col; x.fillText(txt, lx, ly) }
  lab('WEIRD', 0.12, '#ff8b9b'); lab('NORMAL', 0.5, GOLD); lab('SO', 0.86, MINT); x.font = `800 26px ${INTER}`
  { const a = Math.PI + 0.86 * Math.PI, lx = Math.cos(a) * (Rr - 95), ly = Math.sin(a) * (Rr - 95) + 30; x.fillStyle = MINT; x.fillText('NORMAL', lx, ly) }
  // needle
  const na = Math.PI + v * Math.PI, nx = Math.cos(na), ny = Math.sin(na), L = Rr - 40
  x.lineCap = 'square'
  x.strokeStyle = INK; x.lineWidth = 30; x.beginPath(); x.moveTo(0, 0); x.lineTo(nx * L, ny * L); x.stroke()
  x.strokeStyle = BONE; x.lineWidth = 16; x.beginPath(); x.moveTo(0, 0); x.lineTo(nx * L, ny * L); x.stroke()
  x.strokeStyle = RED; x.lineWidth = 16; x.beginPath(); x.moveTo(nx * L * 0.7, ny * L * 0.7); x.lineTo(nx * L, ny * L); x.stroke()
  box(x, -34, -34, 68, 68, GOLD, { b: 7, hi: '#ffe6a0' })
  // readout
  const u = t - at
  const done = u >= METER.land
  const txt = done ? (land === 'normal' ? 'NORMAL.' : 'SO NORMAL.') : 'CALCULATING' + '.'.repeat(1 + Math.floor(u * 6) % 3)
  x.font = `700 34px ${MONO}`; x.fillStyle = done ? (land === 'normal' ? GOLD : MINT) : BONE
  x.fillText(txt, 0, 70)
  x.font = `800 22px ${INTER}`; x.fillStyle = 'rgba(239,230,214,0.6)'; x.fillText('N O R M A L - O - M E T E R', 0, -Rr - 34)
  x.restore()
}
/** the verdict stamp (canvas): slams at t0 */
export function drawVerdict(x, t, t0, { land = 'so', cx = 540, cy = 1330, out = null, size = 120, rot = -0.08, text = null } = {}) {
  if (t < t0 - 0.02) return
  let o = 1
  if (out) o = popOut(t, out)
  if (o <= 0.01) return
  const p = prog(t, t0 - 0.02, t0 + 0.07)
  const sc = lerp(1.6, 1, ease.outCubic(p)) * (1 + 0.04 * Math.exp(-(t - t0) * 8) * Math.sin((t - t0) * 40)) * Math.max(0.01, o)
  const col = land === 'normal' ? GOLD : MINT
  const s = text || (land === 'normal' ? 'NORMAL.' : 'SO NORMAL.')
  x.save(); x.globalAlpha *= clamp(p * 2) * clamp(o); x.translate(cx, cy); x.rotate(rot); x.scale(sc, sc)
  x.font = `800 ${size}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  const w = x.measureText(s).width + 80, h = size * 1.25
  x.fillStyle = 'rgba(6,4,18,0.55)'; x.fillRect(-w / 2, -h / 2, w, h)
  x.strokeStyle = col; x.lineWidth = 12; x.strokeRect(-w / 2, -h / 2, w, h)
  x.lineWidth = 4; x.strokeRect(-w / 2 - 14, -h / 2 - 14, w + 28, h + 28)
  x.fillStyle = 'rgba(6,4,18,0.8)'; x.fillText(s, 4, 8)
  x.fillStyle = col; x.fillText(s, 0, 4)
  x.restore()
}

// ─────────────────────────────────────────────── DOM pieces
/** the show bug: a pixel "?" + "IS THIS NORMAL?" Inter 800 small caps, letter-spaced, top-left */
function buildBug(root) {
  const b = el('div', { position: 'absolute', left: '56px', top: '56px', height: '44px', display: 'flex', alignItems: 'center', gap: '14px', pointerEvents: 'none' }, root)
  const ic = el('canvas', { width: '40px', height: '44px', imageRendering: 'pixelated' }, b)
  ic.width = 40; ic.height = 44
  drawBits(ic.getContext('2d'), ['.MMM.', 'M...M', '...M.', '..M..', '..M..', '.....', '..M..'], { M: MINT }, 20, 22, 5)
  el('div', { font: `800 28px ${INTER}`, letterSpacing: '0.2em', color: MINT, textShadow: '0 2px 12px rgba(6,4,18,0.9)', whiteSpace: 'nowrap', fontVariant: 'small-caps' }, b, 'IS&nbsp;THIS<span style="color:rgba(255,255,255,0.62)">&nbsp;NORMAL?</span>')
  return b
}
/** a sticker (long films: chapter stickers and the payoff promise). Tilted bone sticker with a coloured badge. */
function buildSticker(root, { text, badge = '', col = MINT, top = 1500, at, out, tilt = -2.5, size = 46 }) {
  const wrap = el('div', { position: 'absolute', left: '0', top: top + 'px', width: '1080px', display: 'none', justifyContent: 'center', pointerEvents: 'none' }, root)
  const st = el('div', { display: 'flex', alignItems: 'center', gap: '18px', maxWidth: '940px', padding: '14px 30px 16px 18px', background: BONE, border: `6px solid ${INK}`, borderRadius: '12px', boxShadow: '10px 10px 0 rgba(6,4,18,0.7)', transformOrigin: '50% 50%' }, wrap)
  if (badge) el('div', { flex: '0 0 auto', minWidth: '64px', height: '64px', padding: '0 10px', borderRadius: '32px', background: col, border: `5px solid ${INK}`, display: 'grid', placeItems: 'center', font: `800 30px ${INTER}`, color: INK }, st, badge)
  const html = text.replace(/\*([^*]+)\*/g, `<span style="font:italic 500 ${Math.round(size * 1.25)}px ${SERIF};color:#8a2b4e;letter-spacing:0">$1</span>`)
  el('div', { font: `800 ${size}px ${INTER}`, lineHeight: '1.08', color: INK, letterSpacing: '-0.01em' }, st, html)
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

// ═══════════════════════════════════════════════════════════════════════════ the episode
export function makeNormal(cfg) {
  const D = cfg.D, LOOPED = cfg.ending === 'loop'
  const HERO = signStar(cfg.hero), PIS = signStar('pisces')
  const SPEAK = 'THE STARS', CPS = cfg.cps || 30
  const LINES = (cfg.lines || []).map(l => ({ speaker: SPEAK, ...l }))
  const ALL_LINES = [...LINES, ...(cfg.boxes || []).flatMap(bx => bx.lines.map(l => ({ speaker: SPEAK, ...l })))]
  const STARS_HOPS = [(cfg.stars?.in ?? 0) + 0.3, ...talkHops(ALL_LINES, SPEAK, { cps: CPS })]
  const RECS = cfg.rec ? [].concat(cfg.rec) : []

  const hero = (x, t, o = {}) => drawStarChar(x, o.x, o.y, o.s, t, { color: HERO.color, glyph: o.s >= 150 ? HERO.glyph : null, seed: 3, glow: 1.1, ...o })
  const sign = id => { const sg = signStar(id); return (x, t, o = {}) => drawStarChar(x, o.x, o.y, o.s, t, { color: sg.color, glyph: o.s >= 150 ? sg.glyph : null, seed: 5, glow: 1, ...o }) }
  const stars = (x, t, o = {}) => drawStarChar(x, o.x, o.y, o.s, t, { color: STAR.sky, seed: 2, glow: 1.05, hops: STARS_HOPS, ...o })
  /** Pisces, crying: o.tears 1 sniffle · 2 streams · 3 fountains; o.tissues draws the box beside it */
  function pis(x, t, o = {}) {
    const opts = { color: PIS.color, mood: o.mood || 'wide', look: o.look || [-1, -0.5], seed: 6, glow: 0.85, pop: o.pop ?? 1, alpha: o.alpha ?? 1, hops: o.hops, tips: false, glyph: o.s >= 150 ? PIS.glyph : null, blush: o.blush }
    if (opts.pop <= 0.01) return null
    if (o.tissues) tissues(x, o.x + (o.tissues === 'left' ? -1 : 1) * o.s * 0.75, o.y + o.s * 0.25, o.s * 0.5 * Math.min(1, opts.pop))
    drawStarChar(x, o.x, o.y, o.s, t, opts)
    const F = starFrame(o.x, o.y, o.s, t, opts)
    if (o.tears) inSprite(x, F, () => tearsCells(x, t, o.tears))
    if (o.say) bubble(x, t, o.x + (o.sayDx || 0), o.y - o.s * 0.85 + (o.sayDy || 0), o.say[0], o.say[1], o.say[2], { size: o.saySize || 30, col: '#c9ecfb', tail: o.sayTail ?? 0 })
    return F
  }
  const S = { hero, sign, stars, pis, HERO, D }

  async function build(stage) {
    try {
      await Promise.all(["800 112px Inter", "800 50px Inter", "800 28px Inter", "700 30px Inter", "600 30px Inter", "italic 500 150px 'EB Garamond'", "italic 500 64px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 26px 'Space Mono'"].map(f => document.fonts.load(f)))
    } catch (_) { /* fonts optional */ }
    const imgs = {}
    for (const n of cfg.images || []) imgs[n] = await new Promise(res => { const i = new Image(); i.onload = () => res(i); i.onerror = () => res(null); i.src = A + n })
    S.img = imgs
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const heads = (cfg.heads || []).map(h => ({ ...h, P: popText(root, h.text, { top: h.top ?? 190, size: h.size ?? 92, accentSize: h.accentSize ?? Math.round((h.size ?? 92) * 1.32), at: h.at, gap: h.gap ?? 0.08, accentColor: h.accent || MINT, late: h.late || 0, lateAt: h.lateAt ?? null, wobble: !!h.late, fit: true }) }))
    const lastP = cfg.last ? popText(root, cfg.last.text, { top: cfg.last.top ?? 190, size: cfg.last.size ?? 92, accentSize: Math.round((cfg.last.size ?? 92) * 1.35), at: cfg.last.at, gap: 0.09, accentColor: cfg.last.accent || GOLD, late: cfg.last.late ?? 1, lateAt: cfg.last.lateAt ?? null, wobble: true, fit: true }) : null
    const top = layerCanvas(root), tx = top.getContext('2d')
    const stickers = [
      ...(cfg.promise ? [buildSticker(root, { text: cfg.promise.text, badge: '!', col: GOLD, top: cfg.promise.top ?? 1600, at: cfg.promise.at, out: cfg.promise.out, tilt: 2.2, size: 42 })] : []),
      ...(cfg.stickers || []).map(s2 => buildSticker(root, s2)),
    ]
    const box1 = LINES.length ? dialogueBox(root, { lines: LINES, y: cfg.box?.y ?? 1420, open: cfg.box?.open, close: cfg.box?.close, cps: CPS }) : null
    const boxN = (cfg.boxes || []).map(bx => dialogueBox(root, { lines: bx.lines.map(l => ({ speaker: SPEAK, ...l })), y: bx.y ?? 1420, open: bx.open, close: bx.close, cps: CPS }))
    buildBug(root)
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
    const flash = el('div', { position: 'absolute', inset: 0, background: '#fff6ea', opacity: 0, pointerEvents: 'none' }, root)

    function camera(t) {
      let z = 1, sx = 0, sy = 0
      for (const p of cfg.punches || []) { const d = t - p; if (d >= 0 && d < 0.35) z += 0.08 * (1 - ease.outCubic(d / 0.35)) }
      for (const s2 of cfg.shakes || []) { const tt = typeof s2 === 'number' ? s2 : s2.t, A2 = typeof s2 === 'number' ? 16 : s2.a, d = t - tt; if (d >= 0 && d < 0.5) { sx += A2 * Math.exp(-d * 9) * Math.sin(d * 63); sy += A2 * 0.6 * Math.exp(-d * 9) * Math.cos(d * 51) } }
      return { z, sx, sy }
    }

    return {
      start: 0, end: D + 1, root,
      update(t) {
        // t here is already frozen by hookkit's frozen() during a record scratch
        const ss = ease.inOutCubic(prog(t, 0, 2.5))
        drawSky(x, t, t < 2.5 ? { ...SKY_H, zoom: lerp(1.65, SKY_H.zoom, ss), dy: lerp(-30, 0, ss) } : SKY_H)
        const cam = camera(t)
        x.save(); x.translate(540 + cam.sx, 960 + cam.sy); x.scale(cam.z, cam.z); x.translate(-540, -960)
        if (cfg.scene) cfg.scene(x, t, S)
        x.restore()
        tx.clearRect(0, 0, 1080, 1920)
        if (cfg.meter) {
          const m = cfg.meter
          tx.save(); tx.translate(cam.sx, cam.sy)
          drawMeter(tx, t, { at: m.at, land: m.land, cx: m.cx ?? 540, cy: m.cy ?? 1060, s: m.s ?? 1, out: m.out, wobble: m.wobble || 0 })
          drawVerdict(tx, t, m.at + METER.land, { land: m.land, cx: m.vx ?? 540, cy: m.vy ?? (m.cy ?? 1060) + 280, out: m.out, text: m.text })
          sparkles(tx, t, m.vx ?? 540, m.vy ?? (m.cy ?? 1060) + 280, m.at + METER.land + 0.02, 14, 380, 1, [MINT, GOLD, BONE])
          tx.restore()
        }
        if (cfg.over) cfg.over(tx, t, S)
        for (const h of heads) h.P.update(t, outK(t, h.out))
        if (lastP) lastP.update(t, cfg.last.out ? outK(t, cfg.last.out) : 1)
        stickers.forEach(s2 => s2.update(t))
        if (box1) box1.update(t)
        for (const bx of boxN) bx.update(t)
        let fl = 0, fcol = '#fff6ea'
        for (const f of cfg.flashes || []) { const d = t - f.t; if (d >= 0 && d < (f.d || 0.14)) { const v = (f.a || 0.6) * (1 - d / (f.d || 0.14)); if (v > fl) { fl = v; fcol = f.col || '#fff6ea' } } }
        flash.style.opacity = String(fl); flash.style.background = fcol
        drawGrain(gx, t)
      },
    }
  }

  // ── the hookkit layers
  const HOOK = { at: -1, top: 200, size: 104, accentColor: PINK, ...cfg.hook }
  const WHIP0 = { at: -0.25, len: 0.5, from: 1.5, blur: 12, ...(cfg.whip0 || {}) }
  const MAIN = RECS.length ? frozen(build, RECS) : build
  const frame0 = [MAIN, whipZoom(WHIP0), slamTitle(HOOK)]
  const SCENES = [
    MAIN, whipZoom(WHIP0),
    ...(cfg.whips || []).map(w => whipZoom(w)),
    ...RECS.map(r => recordScratch(r)),
    ...(cfg.catch ? [].concat(cfg.catch).map(c => caught({ rec: false, ...c })) : []),
    ...(cfg.chapters || []).map(c => chapter(c)),
    ...(cfg.fx || []).map(([f, , o]) => f(o)),
    slamTitle(HOOK),
    ...(LOOPED ? [loopBack(frame0, { duration: D })] : []),
  ]

  // ── sound (pitched SFX are shifted into the film's key by the engine)
  const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
  const wordPops = (t0, n, gap, b0 = 0, gain = 0.022) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(b0 + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
  const nWords = s => s.replace(/\|/g, ' ').trim().split(/\s+/).filter(Boolean).length
  const CUES = [
    ['boom', 0.0, 0.3], ['tom', 0.0, 90, { gain: 0.24, decay: 0.3 }],
    ...whipZoomCues(WHIP0).filter(c => c[1] >= 0),
    ...(cfg.whips || []).flatMap(w => whipZoomCues(w)),
    ...RECS.flatMap(r => recordScratchCues(r)),
    ...(cfg.catch ? [].concat(cfg.catch).flatMap(c => caughtCues(c)) : []),
    ...(cfg.chapters || []).flatMap(c => chapterCues(c)),
    ...(cfg.fx || []).flatMap(([, cf, o]) => cf ? cf(o) : []),
    ...(cfg.flashes || []).map(f => ['tick', r3(f.t), 0.07]),
    ...(cfg.heads || []).flatMap((h, i) => wordPops(h.at, Math.min(8, nWords(h.text)), h.gap ?? 0.08, i)),
    ...(cfg.meter ? [
      ['pop', cfg.meter.at, 880, 0.04, 0], ['riser', r3(cfg.meter.at + METER.pop), r3(cfg.meter.at + METER.land), 0.03],
      ...Array.from({ length: 12 }, (_, i) => ['tick', r3(cfg.meter.at + METER.pop + i * 0.12), 0.025]),
      ['boom', r3(cfg.meter.at + METER.land), 0.3], ['tom', r3(cfg.meter.at + METER.land), 88, { gain: 0.28, decay: 0.3 }], ['tick', r3(cfg.meter.at + METER.land), 0.08],
      ['bell', r3(cfg.meter.at + METER.land + 0.06), 1760, 0.03, 1.2, 0], ['glitter', r3(cfg.meter.at + METER.land + 0.04), r3(cfg.meter.at + METER.land + 0.5)],
    ] : []),
    ...(cfg.stars ? [['pop', r3(cfg.stars.in + 0.05), 739.99, 0.035, -0.4]] : []),
    ...talkCues(ALL_LINES, { cps: CPS }),
    ...(cfg.promise ? [['pop', r3(cfg.promise.at + 0.05), 1318.51, 0.04, 0.2], ['pluck', r3(cfg.promise.at + 0.1), 1567.98, 0.035, 0.4, 0.2]] : []),
    ...(cfg.last ? [...wordPops(cfg.last.at, Math.min(8, nWords(cfg.last.text)), 0.09, 2), ['bell', r3((cfg.last.lateAt ?? cfg.last.at + 0.09 * (nWords(cfg.last.text) - 1)) + 0.05), 2349.32, 0.025, 1.0, 0]] : []),
    ...(LOOPED ? loopCues({ duration: D }) : []),
    ...(cfg.cues || []),
  ].filter(c => c[1] >= 0 && c[1] < D)
  return { DURATION: D, SCENES, CUES }
}
