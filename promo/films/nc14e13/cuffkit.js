// CUFFING SEASON: the shared look of the Season 14 episodes 13–24 (nc14e13 … nc14e24, promo/films/next30/b02.md).
// Every episode imports this file from here (read-only for the others), so the twelve films look like one season.
//
//   makeEp(cfg) → { DURATION, SCENES, CUES }
//     cfg.id, cfg.ep (episode number), cfg.duration (incl. the 4.4 s end card), cfg.key (the music key, for lessonCues)
//     cfg.heads:  [{ text, at, out: [a, b], top?, size?, accentSize?, accentColor?, late?, lateAt?, wobble? }]
//                 (the first head's `at` is negative so the hook is fully on screen at frame 0)
//     cfg.boxes:  [{ lines: [{ t, speaker, text, color? }], open?, close?, y? }]
//     cfg.lesson: { at, out: [a, b], text, chip } (optional, 40–45 s films)
//     cfg.ghost:  { at, x, y, from, cell? } (the season-wide easter egg, also written to lore.json)
//     cfg.cuts:   card-cut candidates (cardfx plays the middle one)
//     cfg.scene(x, t, K): the episode's picture on the main canvas.  K = { ok, SE, img(name) }
//     cfg.snow:   flake amount 0–1 (number or f(t)), cfg.ground: snowy ground top y (or false for interiors)
//     cfg.cues:   the episode's own sound cues (headlines, dialogue, lesson, cuts and end card are added here)
// Pure f(t): nothing touches `document` at module top level (the sound build imports this in node).
import { clamp, lerp, prog, ease, el } from '../../src/lib.js'
import { fill, A } from '../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas, drawPixelStar } from '../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar, STAR } from '../startalk.js'
import { drawSeedConstellation, drawGhostCameo } from '../stlore.js'
import { buildLesson, lessonCues, popText } from '../lesson.js'

export const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', LAV = '#c9a6ff', RED = '#e8344e'
export const ICE = '#bfe6ff', SNOW = '#f4f8ff', SNOW_D = '#c6d6f2', MINT = '#9fe6b0', COCOA = '#7a4a2e', WARM = '#ffd89a'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const SERIF = "'EB Garamond', Georgia, serif"
export const MONO = "'Space Mono', ui-monospace, monospace"
export const r3 = v => +v.toFixed(3)
export const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
export const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
export const win = (t, a, b) => t >= a && t < b
export { clamp, lerp, prog, ease, easeOutBack, drawStarChar, signStar, STAR, drawPixelStar, talkHops }

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
export const MITTEN = ['.MMM...', 'MMMMM.M', 'MMMMMMM', 'MMMMMMM', 'MMMMMM.', 'MMMMM..', 'CCCCC..', 'CCCCC..']
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
export function hearts(x, t, t0, cx, cy, { n = 5, cell = 6, spread = 120, life = 1.4, cols = ['#ff5c8a', PINK, GOLD] } = {}) {
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
/** a pixel speech bubble (canvas), popping at t0, fading by t1. thought: little circles instead of a tail */
export function bubble(x, t, cx, cy, t0, t1, text, { col = BONE, ink = INK, size = 34, tail = 0, font = INTER, weight = 800, thought = false, up = false } = {}) {
  const k = pop01(t, t0, 0.25, 2.4) * outK(t, [t1 - 0.15, t1])
  if (k <= 0.01 || t < t0 || t > t1) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.font = `${weight} ${size}px ${font}`
  const w = x.measureText(text).width + 44, h = size + 32
  x.fillStyle = INK; x.fillRect(-w / 2 - 5, -h / 2, w + 10, h); x.fillRect(-w / 2, -h / 2 - 5, w, h + 10)
  x.fillStyle = col; x.fillRect(-w / 2, -h / 2, w, h)
  const tx = tail * (w / 2 - 40), dir = up ? -1 : 1, edge = dir * h / 2
  if (thought) {
    for (const [dx, dy, s] of [[0, 16, 16], [tail * 18, 40, 10]]) { R(x, INK, tx + dx - s / 2 - 4, edge + dir * dy - s / 2 - 4, s + 8, s + 8); R(x, col, tx + dx - s / 2, edge + dir * dy - s / 2, s, s) }
  } else {
    R(x, INK, tx - 14, up ? edge - 16 : edge + 4, 14, 12); R(x, INK, tx - 7, up ? edge - 22 : edge + 14, 8, 8)
    R(x, col, tx - 9, up ? edge - 9 : edge, 9, 9)
  }
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
/** a soft floor shadow */
export function shadow(x, cx, cy, w, a = 0.35) { if (w <= 0) return; x.save(); x.globalAlpha = a; x.fillStyle = '#05030c'; x.beginPath(); x.ellipse(cx, cy, w / 2, w * 0.09, 0, 0, Math.PI * 2); x.fill(); x.restore() }
/** a warm glow pool */
export function glow(x, cx, cy, r, a, col = '255,214,150') {
  if (a <= 0) return
  x.save(); x.globalCompositeOperation = 'lighter'
  const g = x.createRadialGradient(cx, cy, 0, cx, cy, r); g.addColorStop(0, `rgba(${col},${0.3 * a})`); g.addColorStop(1, `rgba(${col},0)`)
  x.fillStyle = g; x.fillRect(cx - r, cy - r, 2 * r, 2 * r); x.restore()
}

// ── the star cast (sprite frame mirrors startalk.js so accessories ride the hops and squash)
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
// a bobble hat on the top point and a scarf across the lower body (sprite cells)
function hatCells(x, col, t) {
  const ink = (i, j, w, h) => { x.fillStyle = INK; x.fillRect(i - 0.5, j - 0.5, w + 1, h + 1) }
  ink(14, 1.5, 8, 3); x.fillStyle = col; x.fillRect(14, 1.5, 8, 3)
  x.fillStyle = BONE; x.fillRect(13.5, 3.8, 9, 1.4); x.fillStyle = INK; x.fillRect(13, 5.2, 10, 0.4)
  const bx = 17.2 + 0.4 * Math.sin(t * 5)
  ink(bx, -1.2, 2, 2); x.fillStyle = BONE; x.fillRect(bx, -1.2, 2, 2)
  x.fillStyle = 'rgba(255,255,255,0.35)'; x.fillRect(14.5, 1.8, 2, 1)
}
function scarfCells(x, col, t) {
  x.fillStyle = INK; x.fillRect(9.5, 25.4, 17, 3.2)
  x.fillStyle = col; x.fillRect(10, 25.9, 16, 2.2)
  x.fillStyle = 'rgba(255,255,255,0.3)'; for (let i = 0; i < 4; i++) x.fillRect(11 + i * 4, 25.9, 1.2, 2.2)
  const sw = 0.5 * Math.sin(t * 3.4)
  x.fillStyle = INK; x.fillRect(22.5 + sw, 27.6, 3.2, 6.2)
  x.fillStyle = col; x.fillRect(23 + sw, 28, 2.2, 5.4)
  x.fillStyle = BONE; x.fillRect(23 + sw, 32.6, 2.2, 0.8)
}
/** a sign star (id: 'aries'…, or 'stars' for THE STARS) with optional hat / scarf / tears; returns the sprite frame */
export function star(x, t, id, o = {}) {
  const S = id === 'stars' ? { color: STAR.sky, glyph: null } : signStar(id)
  const { x: X = 540, y: Y = 1000, s = 240, tears = 0, hat = null, scarf = null, flip = false, ...rest } = o
  if ((rest.pop ?? 1) <= 0.01 || (rest.alpha ?? 1) <= 0.01) return null
  const opts = { color: S.color, glyph: S.glyph, seed: o.seed ?? (id.length * 3 + 1), glow: id === 'stars' ? 1.05 : 0.9, ...rest }
  x.save()
  if (flip) { x.translate(X, 0); x.scale(-1, 1); x.translate(-X, 0) }
  drawStarChar(x, X, Y, s, t, opts)
  x.restore()
  const F = starFrame(X, Y, s, t, opts)
  x.save(); x.globalAlpha *= rest.alpha ?? 1
  if (hat || scarf || tears) inSprite(x, F, () => { if (scarf) scarfCells(x, scarf, t); if (hat) hatCells(x, hat, t); if (tears) tearsCells(x, t, tears) })
  x.restore()
  return F
}

// ── winter props (pixel-chunky, ink outlined)
/** a steaming mug of cocoa */
export function mug(x, t, cx, cy, s = 1, col = '#e8344e', { steam = 1, rot = 0 } = {}) {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
  box(x, -30, -36, 60, 62, col, { b: 5, hi: 'rgba(255,255,255,0.25)' })
  R(x, INK, 30, -24, 18, 34); R(x, col, 30, -18, 12, 22); R(x, INK, 30, -14, 6, 14)
  R(x, COCOA, -26, -36, 52, 9); R(x, BONE, -14, -42, 12, 8); R(x, BONE, 2, -44, 10, 8)
  x.restore()
  if (steam > 0) for (let i = 0; i < 3; i++) {
    const p = (t * 0.7 + i / 3) % 1
    x.save(); x.globalAlpha = steam * 0.55 * Math.sin(Math.PI * p)
    R(x, BONE, cx + (i - 1) * 16 * s + Math.sin(t * 3 + i * 2) * 8 * s, cy - (52 + p * 80) * s, 8 * s, 14 * s)
    x.restore()
  }
}
/** a plaid blanket draped from (cx, top), w × h, with a wavy hem */
export function blanket(x, t, cx, top, w, h, col = '#c8283c', col2 = '#f2c75c', { wave = 1 } = {}) {
  const L = cx - w / 2, n = Math.max(6, Math.round(w / 40))
  R(x, INK, L - 6, top - 6, w + 12, h + 12)
  R(x, col, L, top, w, h)
  for (let i = 1; i < n; i++) R(x, 'rgba(0,0,0,0.18)', L + i * w / n - 4, top, 8, h)
  for (let j = 1; j < 4; j++) R(x, 'rgba(0,0,0,0.18)', L, top + j * h / 4 - 4, w, 8)
  R(x, col2, L, top + h * 0.5 - 3, w, 6); R(x, col2, cx - 3, top, 6, h)
  for (let i = 0; i < n; i++) { const d = 6 * wave * Math.sin(t * 2 + i); R(x, INK, L + i * w / n, top + h + 4, w / n - 6, 8 + d); R(x, BONE, L + i * w / n + 3, top + h + 4, w / n - 12, 4 + d) }
}
/** a park bench (seat top at cy) */
export function bench(x, cx, cy, w = 560, { snow = true } = {}) {
  box(x, cx - w / 2, cy - 120, w, 26, '#8a5a36', { b: 6 }); box(x, cx - w / 2, cy - 78, w, 26, '#8a5a36', { b: 6 })
  box(x, cx - w / 2 - 10, cy, w + 20, 30, '#a06a40', { b: 6, hi: 'rgba(255,255,255,0.18)' })
  for (const d of [-0.42, 0.42]) { box(x, cx + d * w - 10, cy + 30, 20, 110, '#3a3350', { b: 5 }); box(x, cx + d * w - 10, cy - 130, 20, 130, '#3a3350', { b: 5 }) }
  if (snow) { R(x, SNOW, cx - w / 2 - 6, cy - 132, w + 12, 10); R(x, SNOW, cx - w / 2 - 14, cy - 8, w * 0.3, 10); R(x, SNOW, cx + w * 0.22, cy - 8, w * 0.3, 10) }
}
/** a couch (seat top at cy) */
export function couch(x, cx, cy, w = 700, col = '#5b4a9e') {
  box(x, cx - w / 2 + 40, cy - 200, w - 80, 170, col, { b: 7, hi: 'rgba(255,255,255,0.16)' })
  box(x, cx - w / 2 + 30, cy - 30, w - 60, 90, col, { b: 7, lo: 'rgba(0,0,0,0.2)' })
  box(x, cx - w / 2, cy - 110, 70, 170, col, { b: 7, hi: 'rgba(255,255,255,0.2)' }); box(x, cx + w / 2 - 70, cy - 110, 70, 170, col, { b: 7, hi: 'rgba(255,255,255,0.2)' })
  for (const d of [-0.42, 0.42]) R(x, INK, cx + d * w - 10, cy + 60, 20, 30)
}
/** a frosty window with snow falling outside (x, y = top-left) */
export function windowFrame(x, t, X, Y, w, h, { frost = 1, night = '#1a2a5a' } = {}) {
  box(x, X, Y, w, h, night, { b: 12 })
  const g = x.createLinearGradient(0, Y, 0, Y + h); g.addColorStop(0, '#22356c'); g.addColorStop(1, '#3a5290')
  x.fillStyle = g; x.fillRect(X, Y, w, h)
  x.save(); x.beginPath(); x.rect(X, Y, w, h); x.clip()
  for (let i = 0; i < 26; i++) { const sp = 60 + (i * 37) % 70, p = ((t * sp / h) + i * 0.137) % 1; R(x, SNOW, X + ((i * 97) % w) + 10 * Math.sin(t + i), Y + p * h, 8, 8) }
  R(x, SNOW, X, Y + h - 30, w, 30)
  if (frost > 0) { x.globalAlpha = 0.35 * frost; for (const [fx, fy] of [[0, 0], [w, 0], [0, h], [w, h]]) { const gg = x.createRadialGradient(X + fx, Y + fy, 0, X + fx, Y + fy, w * 0.5); gg.addColorStop(0, '#ffffff'); gg.addColorStop(1, 'rgba(255,255,255,0)'); x.fillStyle = gg; x.fillRect(X, Y, w, h) } }
  x.restore()
  R(x, INK, X + w / 2 - 7, Y, 14, h); R(x, INK, X, Y + h / 2 - 7, w, 14)
  R(x, '#e9dcc4', X - 20, Y + h + 6, w + 40, 18)
}
/** a warm room: wall + floor (interiors) */
export function room(x, { wall = '#2a1f4a', wall2 = '#33265a', floorY = 1200, floor = '#3a2a2a' } = {}) {
  R(x, wall, 0, 0, 1080, floorY)
  for (let i = 0; i < 1080; i += 90) R(x, wall2, i, 0, 45, floorY)
  R(x, INK, 0, floorY - 6, 1080, 12); R(x, floor, 0, floorY + 6, 1080, 1920 - floorY)
  for (let j = floorY + 50; j < 1920; j += 70) R(x, 'rgba(0,0,0,0.18)', 0, j, 1080, 6)
}
/** string lights sagging between (x0, y0) and (x1, y1) */
export function lights(x, t, x0, y0, x1, y1, { n = 12, sag = 60, on = 1, cols = [RED, GOLD, MINT, '#7fd0ff', PINK] } = {}) {
  x.save(); x.strokeStyle = INK; x.lineWidth = 5; x.beginPath()
  for (let i = 0; i <= 30; i++) { const p = i / 30, px = lerp(x0, x1, p), py = lerp(y0, y1, p) + sag * Math.sin(Math.PI * p); i ? x.lineTo(px, py) : x.moveTo(px, py) }
  x.stroke(); x.restore()
  for (let i = 0; i < n; i++) {
    const p = (i + 0.5) / n, px = lerp(x0, x1, p), py = lerp(y0, y1, p) + sag * Math.sin(Math.PI * p)
    const tw = on * (0.75 + 0.25 * Math.sin(t * 4 + i * 1.7)), c = cols[i % cols.length]
    if (tw > 0.05) glow(x, px, py + 14, 44, tw * 0.8, c === RED ? '255,90,110' : c === GOLD ? '255,214,120' : c === MINT ? '150,240,190' : c === PINK ? '255,150,190' : '140,210,255')
    R(x, INK, px - 9, py + 2, 18, 26); R(x, on > 0.5 ? c : '#4a4466', px - 5, py + 6, 10, 18)
  }
}
/** a pixel mitten (cuff at the bottom) */
export function mitten(x, cx, cy, cell, col, { rot = 0, cuff = BONE, flip = false } = {}) {
  drawBits(x, MITTEN, { M: col, C: cuff }, cx, cy, cell, { rot, sx: flip ? -1 : 1 })
}
/** a gift box with a ribbon; lid lifts by `open` 0–1 */
export function gift(x, cx, cy, w = 140, col = '#2fc79a', rib = GOLD, open = 0) {
  box(x, cx - w / 2, cy - w * 0.7, w, w * 0.7, col, { b: 6 })
  R(x, rib, cx - 9, cy - w * 0.7, 18, w * 0.7)
  const ly = cy - w * 0.7 - 30 - open * 120, lr = open * 0.5
  x.save(); x.translate(cx, ly + 15); x.rotate(-lr)
  box(x, -w / 2 - 10, -15, w + 20, 30, col, { b: 6, hi: 'rgba(255,255,255,0.25)' }); R(x, rib, -9, -15, 18, 30)
  drawBits(x, ['RR.RR', 'RRRRR', '.R.R.'], { R: rib }, 0, -28, 7)
  x.restore()
}
/** a snowman */
export function snowman(x, t, cx, cy, s = 1) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  for (const [r, yy] of [[70, -70], [52, -180], [38, -265]]) { x.fillStyle = INK; x.beginPath(); x.arc(0, yy, r + 6, 0, Math.PI * 2); x.fill(); x.fillStyle = SNOW; x.beginPath(); x.arc(0, yy, r, 0, Math.PI * 2); x.fill() }
  R(x, INK, -14, -282, 8, 8); R(x, INK, 8, -282, 8, 8); R(x, '#f39a3a', -2, -266, 26, 8)
  R(x, INK, -40, -320, 80, 12); R(x, INK, -26, -370, 52, 52); R(x, RED, -26, -330, 52, 8)
  R(x, RED, -48, -230, 96, 14); R(x, RED, 20, -230, 14, 50)
  x.restore(); void t
}
/** a phone thread. P = { cx, top, w, h, title, msgs: [{ at, side, text }], draft: [{ at, text, del? }], alpha } */
export function phone(x, t, P) {
  const { cx, top, w, h, title = '', msgs = [], draft = [], alpha = 1, clock = null } = P
  if (alpha <= 0.01) return
  x.save(); x.globalAlpha *= alpha
  const L = cx - w / 2
  box(x, L, top, w, h, '#2a2148', { b: 8 })
  R(x, '#14102a', L + 16, top + 22, w - 32, h - 44)
  R(x, '#221a40', L + 16, top + 22, w - 32, 66)
  x.font = `800 34px ${INTER}`; x.fillStyle = BONE; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(title, cx, top + 55)
  if (clock) { x.font = `700 22px ${MONO}`; x.fillStyle = ICE; x.textAlign = 'right'; x.fillText(clock, L + w - 30, top + 55) }
  // bubbles stack from the bottom up
  const live = msgs.filter(m => t >= m.at)
  let y = top + h - 140
  x.font = `700 34px ${INTER}`
  for (let i = live.length - 1; i >= 0 && y > top + 100; i--) {
    const m = live[i], k = pop01(t, m.at, 0.22, 2.2)
    const lines = wrapText(x, m.text, w - 110)
    const bh = 26 + lines.length * 42, bw = Math.min(w - 70, Math.max(...lines.map(s => x.measureText(s).width)) + 40)
    const bx = m.side === 'R' ? L + w - 26 - bw : L + 26
    y -= bh
    x.save(); x.translate(bx + bw / 2, y + bh / 2); x.scale(k, k)
    box(x, -bw / 2, -bh / 2, bw, bh, m.side === 'R' ? (m.col || '#4f7cd8') : '#3a3160', { b: 4 })
    x.fillStyle = BONE; x.textAlign = 'left'; x.textBaseline = 'middle'
    lines.forEach((s, j) => x.fillText(s, -bw / 2 + 20, -bh / 2 + 34 + j * 42))
    x.restore()
    y -= 16
  }
  // the input bar with a draft being typed (and deleted)
  R(x, '#221a40', L + 16, top + h - 100, w - 32, 78)
  box(x, L + 34, top + h - 86, w - 68, 50, '#14102a', { b: 3 })
  let txt = '', cur = false
  for (const d of draft) {
    if (t < d.at) continue
    const n = Math.min(d.text.length, Math.floor((t - d.at) * 16))
    txt = d.text.slice(0, n); cur = true
    if (d.del != null && t > d.del) { const m = Math.max(0, n - Math.floor((t - d.del) * 30)); txt = d.text.slice(0, m) }
    if (d.sent != null && t > d.sent) { txt = ''; cur = false }
  }
  x.font = `700 28px ${INTER}`; x.fillStyle = BONE; x.textAlign = 'left'; x.textBaseline = 'middle'
  const blink = cur && Math.floor(t * 3) % 2 === 0
  x.fillText(txt + (blink ? '|' : ''), L + 50, top + h - 61)
  x.restore()
}
export function wrapText(x, text, maxW) {
  const words = text.split(' '), out = []; let cur = ''
  for (const w of words) { const s = cur ? cur + ' ' + w : w; if (x.measureText(s).width > maxW && cur) { out.push(cur); cur = w } else cur = s }
  if (cur) out.push(cur)
  return out
}
/** a doorway; open 0–1 swings the door away */
export function door(x, X, Y, w, h, open = 1, { col = '#7a3a4a', light = 1 } = {}) {
  box(x, X - 16, Y - 16, w + 32, h + 16, '#5a4636', { b: 6 })
  R(x, '#ffd89a', X, Y, w, h)
  if (light > 0) glow(x, X + w / 2, Y + h * 0.6, w, light * 0.7)
  const dw = w * (1 - 0.85 * ease.inOutCubic(clamp(open)))
  box(x, X, Y, dw, h, col, { b: 5, hi: 'rgba(255,255,255,0.15)' })
  if (dw > 40) R(x, GOLD, X + dw - 30, Y + h * 0.52, 12, 12)
}
/** a talk card (or other card image) at (cx, cy), width w */
export function cardImg(x, img, cx, cy, w, rot = 0, alpha = 1) {
  if (!img || alpha <= 0.01) return
  const h = w * img.height / img.width
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 14, -h / 2 + 18, w, h)
  x.drawImage(img, -w / 2, -h / 2, w, h)
  x.restore()
}
/** a pixel card with text (for invented-in-film notes, e.g. a calendar page or a sign) */
export function note(x, cx, cy, w, h, text, { col = BONE, ink = INK, size = 34, rot = 0, font = INTER, weight = 800, sub = null, subCol = RED } = {}) {
  x.save(); x.translate(cx, cy); x.rotate(rot)
  box(x, -w / 2, -h / 2, w, h, col, { b: 6 })
  x.fillStyle = ink; x.font = `${weight} ${size}px ${font}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  const lines = String(text).split('\n')
  lines.forEach((s, i) => x.fillText(s, 0, (i - (lines.length - 1) / 2) * size * 1.15 + (sub ? -size * 0.4 : 0)))
  if (sub) { x.fillStyle = subCol; x.font = `700 ${Math.round(size * 0.6)}px ${MONO}`; x.fillText(sub, 0, h / 2 - size * 0.7) }
  x.restore()
}

// ── the season's world: falling snow + the snowy ground
const FL = Array.from({ length: 90 }, (_, i) => ({ x: (i * 211.7) % 1080, ph: (i * 0.6180339) % 1, sp: 70 + (i * 53) % 90, sz: [6, 8, 10, 6, 12][i % 5], sw: 10 + (i % 7) * 4 }))
export function snowfall(x, t, amt = 1, { front = false } = {}) {
  if (amt <= 0) return
  const n = Math.round((front ? 18 : 72) * clamp(amt))
  for (let i = 0; i < n; i++) {
    const f = FL[front ? 72 + (i % 18) : i]
    const y = ((t * f.sp * (front ? 1.6 : 1) / 2000 + f.ph) % 1) * 2040 - 60
    const xx = f.x + Math.sin(t * 0.9 + i) * f.sw
    const s = front ? f.sz * 1.8 : f.sz
    x.save(); x.globalAlpha = front ? 0.85 : 0.55 + 0.3 * ((i % 3) / 2)
    R(x, SNOW, xx, y, s, s)
    if (s >= 10) { R(x, SNOW, xx - s * 0.4, y + s * 0.3, s * 1.8, s * 0.4); R(x, SNOW, xx + s * 0.3, y - s * 0.4, s * 0.4, s * 1.8) }
    x.restore()
  }
}
export function ground(x, t, Y = 1180) {
  const g = x.createLinearGradient(0, Y, 0, 1920); g.addColorStop(0, '#dfe9fb'); g.addColorStop(1, '#9fb3dc')
  R(x, INK, 0, Y - 8, 1080, 10)
  x.fillStyle = g; x.fillRect(0, Y, 1080, 1920 - Y)
  for (let i = 0; i < 9; i++) { const cx = (i * 137) % 1080, w = 120 + (i * 41) % 100; R(x, SNOW, cx - w / 2, Y - 14 - (i % 3) * 6, w, 18 + (i % 3) * 6) }
  for (let i = 0; i < 22; i++) { const tw = Math.max(0, Math.sin(t * 2.4 + i * 2.1)); if (tw > 0.6) R(x, '#ffffff', (i * 173) % 1080, Y + 30 + (i * 59) % 160, 6, 6) }
}

// ── the bug: "CUFFING SEASON" with a pixel mitten (no season number on screen)
function buildBug(root) {
  const box_ = el('div', { position: 'absolute', left: '56px', top: '56px', height: '44px', display: 'flex', alignItems: 'center', gap: '14px', pointerEvents: 'none' }, root)
  const ic = el('canvas', { width: '40px', height: '44px', imageRendering: 'pixelated' }, box_)
  ic.width = 40; ic.height = 44
  drawBits(ic.getContext('2d'), MITTEN, { M: '#e8344e', C: BONE }, 20, 22, 4.4)
  el('div', { font: `800 34px ${INTER}`, fontVariantCaps: 'all-small-caps', letterSpacing: '0.22em', color: ICE, textShadow: '0 2px 12px rgba(6,4,18,0.95)', whiteSpace: 'nowrap' }, box_, 'Cuffing Season')
  return {
    update(t, out = 1) { box_.style.display = out <= 0.01 ? 'none' : 'flex'; box_.style.opacity = String(clamp(out)) },
  }
}

const IMGS = { talk1: 'card-talk-1.png', talk2: 'card-talk-2.png', talk3: 'card-talk-3.png', talk4: 'card-talk-4.png', talk5: 'card-talk-5.png', talk6: 'card-talk-6.png', mystery: 'card-reveal-facedown.png', back: 'card-back.png', founding: 'card-founding.png' }
const CPS = 30

/** word-pop cues for a popText headline (mirrors its schedule) */
function headCues(h) {
  const words = h.text.replace(/\|/g, ' ').split(/\s+/).filter(Boolean)
  const n = words.length, late = h.late || 0, gap = h.gap ?? 0.08
  const out = []
  const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
  for (let i = 0; i < n; i++) {
    const big = late > 0 && i >= n - late
    const at = big ? h.lateAt + (i - (n - late)) * 0.1 : h.at + i * gap
    if (at < 0.05) continue
    out.push(big ? ['pop', r3(at), 1174.66, 0.045, 0] : ['pop', r3(at), NOTE[i % 7], 0.022, i % 2 ? 0.15 : -0.15])
  }
  return out
}

export function makeEp(cfg) {
  const DURATION = cfg.duration
  const SE = DURATION - ENDCARD_LEN
  const OUT = [SE - 0.5, SE - 0.1]
  const heads = cfg.heads.map(h => ({ gap: 0.08, size: 96, accentSize: 132, top: 172, ...h }))
  const boxes = cfg.boxes || []
  async function build(stage) {
    try {
      await Promise.all(["800 112px Inter", "800 34px Inter", "700 30px Inter", "italic 500 150px 'EB Garamond'", "700 52px 'Space Mono'", "700 26px 'Space Mono'"].map(f => document.fonts.load(f)))
    } catch (_) { /* fonts optional */ }
    const imgs = {}
    await Promise.all(Object.entries(IMGS).filter(([k]) => (cfg.images || []).includes(k)).map(([k, f]) => new Promise(res => { const i = new Image(); i.onload = () => { imgs[k] = i; res() }; i.onerror = () => res(); i.src = A + f })))
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const H = heads.map(h => [popText(root, h.text, { top: h.top, size: h.size, accentSize: h.accentSize, at: h.at, gap: h.gap, late: h.late || 0, lateAt: h.lateAt ?? null, wobble: !!h.wobble, accentColor: h.accentColor || GOLD, fit: true }), h.out])
    const B = boxes.map(b => dialogueBox(root, { lines: b.lines, y: b.y ?? 1400, open: b.open, close: b.close, cps: CPS }))
    const LS = cfg.lesson ? buildLesson(root, { at: cfg.lesson.at, out: cfg.lesson.out, text: cfg.lesson.text, chip: cfg.lesson.chip, accentColor: cfg.lesson.color || GOLD }) : null
    const dom = cfg.dom ? cfg.dom(root) : null
    const bug = buildBug(root)
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
    const K = { SE, ok: 1, img: k => imgs[k] || null }
    return {
      start: 0, end: SE + 0.01, root,
      update(t) {
        K.ok = popOut(t, OUT)
        drawSky(x, t, { ...SKY_H, dim: 0.85 })
        // a cold blue wash over the sky
        x.save(); x.globalAlpha = 0.18; x.fillStyle = '#3a6ac8'; x.fillRect(0, 0, 1080, 1920); x.restore()
        drawSeedConstellation(x, t, cfg.ep, { x: 948, y: 130, r: 52, alpha: 0.28 })
        const amt = typeof cfg.snow === 'function' ? cfg.snow(t) : (cfg.snow ?? 1)
        snowfall(x, t, amt)
        if (cfg.ground !== false) ground(x, t, cfg.ground ?? 1180)
        x.save()
        cfg.scene(x, t, K)
        x.restore()
        if (cfg.ghost) drawGhostCameo(x, t, cfg.ghost)
        snowfall(x, t, amt * 0.8, { front: true })
        for (const b of B) b.update(t)
        for (const [h, o] of H) h.update(t, outK(t, o))
        if (LS) LS.update(t)
        if (dom) dom.update(t, K)
        bug.update(t, outK(t, [SE - 0.3, SE]))
        drawGrain(gx, t)
      },
    }
  }
  const CUTS = cfg.cuts || []
  const SCENES = [build, (stage) => buildEndcard(stage, { start: SE }), cardFrame({ start: 0, end: SE, corners: 'tr bl br', numeral: `EP ${cfg.ep}` }), cardCuts(CUTS)]
  const lines = boxes.flatMap(b => b.lines)
  const CUES = [
    ...heads.flatMap(headCues),
    ...talkCues(lines, { cps: CPS }),
    ...(cfg.lesson ? lessonCues(cfg.lesson.at, { text: cfg.lesson.text, chip: cfg.lesson.chip, key: cfg.key }) : []),
    ...(cfg.ghost ? [['pop', r3(cfg.ghost.at + 0.1), 1567.98, 0.012, 0.5]] : []),
    ['whoosh', r3(OUT[0]), 0.35, 0.03],
    ...(cfg.cues || []),
    ...cardCutCues(CUTS),
    ...endcardCues(SE),
  ].sort((a, b) => a[1] - b[1])
  return { DURATION, SCENES, CUES, SE, CPS }
}
