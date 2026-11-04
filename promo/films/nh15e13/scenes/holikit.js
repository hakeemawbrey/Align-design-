// HOME FOR THE HOLIDAYS: the shared look of Star Talk Season 15, episodes 13–24 (nh15e13 … nh15e24, rows in
// promo/films/next30/b04.md). This file lives in nh15e13 and the other eleven episodes import it from here.
//
// The format (30–45 s vertical, story 0 … DURATION − 4.4, then the shared end card):
//   t = 0     the hook caption is already in (frame 0 is the thumbnail) and the cast is mid-action in the house.
//   shots     jump cuts (white blink + zoom punch), one Inter 800 headline with an italic accent per beat.
//   end       THE STARS' advice in the dialogue box, an optional LESSON UNLOCKED, then the last line (popText).
// The bug "HOME FOR THE HOLIDAYS" sits top-left for the whole story. Pisces cries somewhere in every film.
//
//   makeEp(cfg) → { DURATION, SCENES, CUES, STORY_END }
//     cfg.duration · cfg.hook { text, out, color, top?, size?, accentSize? } · cfg.heads [{ at, out:[a,b], text, ... }]
//     cfg.shots [{ at, draw(x, t, S), cam?: [z, cx, cy], flash?: false }]   S = { u: t − at, at, end, i }
//     cfg.lines (dialogue) · cfg.boxes [{ open, close, from, to, y? }] · cfg.lesson { at, out, text, chip } (optional)
//     cfg.last { at, text, color } · cfg.cuts (card-cut candidates; cardfx keeps the middle one)
//     cfg.punch [{ at, dur, z, x, y }] · cfg.overlay(x, t) (drawn above the headlines, under the box) · cfg.cues
// Everything draws as a pure function of t; DOM / canvases are only made inside build().
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas, drawPixelStar } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar, STAR } from '../../startalk.js'
import { buildLesson, lessonCues, popText } from '../../lesson.js'

export { clamp, lerp, prog, ease, easeOutBack, drawStarChar, signStar, STAR, drawPixelStar, talkHops }
export const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', RED = '#e8344e', GREEN = '#3fae6a', HOLLY = '#2f8a57'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const SERIF = "'EB Garamond', Georgia, serif"
export const MONO = "'Space Mono', ui-monospace, monospace"
export const BUG_COL = '#ff9a8a'
export const CPS = 28
export const r3 = v => +v.toFixed(3)
export const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
export const inOut = (t, a, b, d = 0.3) => pop01(t, a, d, 2) * outK(t, [b - 0.2, b])

// ───────────────────────────────────────────────────────────── drawing helpers
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
/** pixel label text on canvas (Space Mono), with an ink drop shadow */
export function label(x, text, cx, cy, { size = 28, col = BONE, align = 'center', alpha = 1, font = MONO, weight = 700, rot = 0, shadow = true } = {}) {
  if (alpha <= 0) return
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot)
  x.font = `${weight} ${size}px ${font}`; x.textAlign = align; x.textBaseline = 'middle'
  if (shadow) { x.fillStyle = 'rgba(6,4,18,0.85)'; x.fillText(text, 3, 4) }
  x.fillStyle = col; x.fillText(text, 0, 0)
  x.restore()
}
/** a soft floor shadow */
export function shadow(x, cx, cy, w, a = 0.35) { x.save(); x.globalAlpha = a; x.fillStyle = '#05030c'; x.beginPath(); x.ellipse(cx, cy, w / 2, w * 0.09, 0, 0, Math.PI * 2); x.fill(); x.restore() }
/** a soft warm glow (additive) */
export function glow(x, cx, cy, r, a = 0.3, col = '255,210,140') {
  if (a <= 0) return
  x.save(); x.globalCompositeOperation = 'lighter'
  const g = x.createRadialGradient(cx, cy, 0, cx, cy, r)
  g.addColorStop(0, `rgba(${col},${a})`); g.addColorStop(1, `rgba(${col},0)`)
  x.fillStyle = g; x.fillRect(cx - r, cy - r, 2 * r, 2 * r); x.restore()
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
/** happy tears from both eyes (sprite cells), k: 1 sniffle · 2 streams · 3 fountains */
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
const cellsR = (ctx, col, i, j, w, h) => { ctx.fillStyle = col; ctx.fillRect(i, j, w, h) }
/** accessories for the family (sprite cells) */
function glassesCells(ctx, col = '#2b2140') {
  for (const ex of [13.4, 22.6]) { cellsR(ctx, INK, ex - 3.4, 15.9, 6.8, 5.4); cellsR(ctx, 'rgba(220,240,255,0.55)', ex - 2.6, 16.7, 5.2, 3.8); cellsR(ctx, '#ffffff', ex - 2.2, 17.1, 1.4, 0.8) }
  cellsR(ctx, INK, 16.8, 17.2, 2.4, 1.1); void col
}
function bunCells(ctx, col = '#d8d2e6') { cellsR(ctx, INK, 15.2, -1.2, 5.6, 4.6); cellsR(ctx, col, 15.9, -0.5, 4.2, 3.2); cellsR(ctx, '#ffffff', 16.4, -0.1, 1.2, 0.9) }
function hatCells(ctx, a = RED, b = BONE) {
  cellsR(ctx, INK, 13.2, 0.6, 9.6, 7.2); cellsR(ctx, a, 14, 1.4, 8, 5.2)
  cellsR(ctx, b, 14, 4.6, 8, 1.4); cellsR(ctx, INK, 16.6, -1.6, 2.8, 2.6); cellsR(ctx, b, 17.1, -1.1, 1.8, 1.6)
}
function mustacheCells(ctx, col = '#6b4a2f') { cellsR(ctx, INK, 13.6, 22.6, 8.8, 2.4); cellsR(ctx, col, 14.2, 23, 7.6, 1.5) }
function scarfCells(ctx, a = '#3fae6a', b = BONE) {
  cellsR(ctx, INK, 9.6, 25.6, 16.8, 3.6); cellsR(ctx, a, 10.2, 26.2, 15.6, 2.4)
  for (let i = 0; i < 4; i++) cellsR(ctx, b, 11 + i * 4, 26.2, 1.4, 2.4)
  cellsR(ctx, INK, 21.4, 27.8, 3.4, 6.4); cellsR(ctx, a, 22, 28.2, 2.2, 5.4)
}
function bowCells(ctx, col = PINK) { cellsR(ctx, INK, 20.8, 4.6, 7.4, 4.2); cellsR(ctx, col, 21.4, 5.2, 2.6, 3); cellsR(ctx, col, 25, 5.2, 2.6, 3); cellsR(ctx, '#ffffff', 23.8, 5.8, 1.4, 1.6) }
function antlersCells(ctx, col = '#a8743e') { for (const d of [-1, 1]) { const bx = 18 + d * 4.2; cellsR(ctx, INK, bx - 1.1, -2.6, 2.2, 6); cellsR(ctx, col, bx - 0.5, -2, 1, 5); cellsR(ctx, INK, bx + d * 0.6 - 1.1, -2.8, 3, 2); cellsR(ctx, col, bx + d * 0.6 - 0.6, -2.3, 2, 1) } }

/** the family: pale relatives with one accessory each (never a sign, never the joke) */
export const FAMILY = {
  GRANDMA: { color: '#d8c6f2', tag: '✦ GRANDMA', tagColor: '#d8c6f2', acc: [glassesCells, bunCells], seed: 21 },
  UNCLE: { color: '#a9e2c6', tag: '✦ UNCLE', tagColor: '#a9e2c6', acc: [mustacheCells, ctx => hatCells(ctx, '#3a7fd0', BONE)], seed: 22 },
  AUNTIE: { color: '#ffd3b0', tag: '✦ AUNTIE', tagColor: '#ffd3b0', acc: [ctx => scarfCells(ctx, '#e8344e', BONE), glassesCells], seed: 23 },
  MOM: { color: '#ffe3a0', tag: '✦ MOM', tagColor: '#ffe3a0', acc: [ctx => scarfCells(ctx, '#7c74f0', BONE)], seed: 24 },
  COUSIN: { color: '#bfe8ff', tag: '✦ COUSIN', tagColor: '#bfe8ff', acc: [ctx => hatCells(ctx, '#2fae6a', BONE)], seed: 25 },
  KID: { color: '#ffc6e0', tag: '✦ LITTLE COUSIN', tagColor: '#ffc6e0', acc: [bowCells], seed: 26 },
}
/** a family member: FAMILY[who] + accessories. o: { x, y, s, mood, look, hops, pop, alpha } */
export function rel(x, t, who, o) {
  const F0 = FAMILY[who]
  const opts = { color: F0.color, seed: F0.seed, glow: 0.7, tips: false, ...o }
  const r = drawStarChar(x, o.x, o.y, o.s, t, opts)
  if ((o.pop ?? 1) > 0.01 && (o.alpha ?? 1) > 0.01) {
    const F = starFrame(o.x, o.y, o.s, t, opts)
    x.save(); x.globalAlpha *= (o.alpha ?? 1)
    inSprite(x, F, () => { for (const a of F0.acc) a(x); if (o.tears) tearsCells(x, t, o.tears) })
    x.restore()
  }
  return r
}
/** a sign star (glyph on when big enough). o: { x, y, s, ... } plus extras: tears, antlers, hat, scarf */
export function sign(x, t, id, o) {
  const S0 = signStar(id)
  const opts = { color: S0.color, glyph: o.s >= 150 ? S0.glyph : null, seed: o.seed ?? (id.length * 3 + 1), glow: 1, ...o }
  const r = drawStarChar(x, o.x, o.y, o.s, t, opts)
  if ((o.tears || o.scarf || o.hat || o.antlers) && (o.pop ?? 1) > 0.01) {
    const F = starFrame(o.x, o.y, o.s, t, opts)
    inSprite(x, F, () => {
      if (o.scarf) scarfCells(x, o.scarf, BONE)
      if (o.hat) hatCells(x, o.hat, BONE)
      if (o.antlers) antlersCells(x)
      if (o.tears) tearsCells(x, t, o.tears)
    })
  }
  return r
}
/** Pisces, always a little teary (the running gag). tears: 1 sniffle · 2 streams · 3 fountains */
export function pisces(x, t, o, tears = 2) { return sign(x, t, 'pisces', { mood: 'sparkle', look: [-1, -0.5], seed: 6, ...o, tears }) }
/** THE STARS (the gold host star) */
export function theStars(x, t, o) { return drawStarChar(x, o.x, o.y, o.s, t, { color: STAR.sky, seed: 2, glow: 1.05, ...o }) }
export const tagOf = id => { const s = signStar(id); return `${s.glyph}︎ ${id.toUpperCase()}` }
export const colOf = id => signStar(id).color

// ───────────────────────────────────────────────────────────── the sets
export function snow(x, t, { n = 60, alpha = 0.85, x0 = 0, x1 = 1080, y0 = 0, y1 = 1920, speed = 70, size = 6, seed = 1 } = {}) {
  x.save(); x.globalAlpha *= alpha; x.fillStyle = '#f4f1ff'
  for (let i = 0; i < n; i++) {
    const h = Math.sin(i * 12.9898 + seed * 78.233) * 43758.5453, fr = h - Math.floor(h)
    const sp = speed * (0.6 + 0.8 * fr), H = y1 - y0
    const py = y0 + (((fr * H + t * sp) % H) + H) % H
    const px = x0 + ((i * 97.3 + seed * 13) % (x1 - x0)) + Math.sin(t * (0.8 + fr) + i) * 14
    const s = size * (fr > 0.6 ? 1 : 0.67)
    x.fillRect(Math.round(px), Math.round(py), s, s)
  }
  x.restore()
}
/** a night window with snow (and an optional moon) */
export function windowView(x, t, X, Y, w, h, { frame = '#f2e2c4', snowN = 18, stars = true } = {}) {
  box(x, X, Y, w, h, '#10183a', { b: 8 })
  x.save(); x.beginPath(); x.rect(X, Y, w, h); x.clip()
  const g = x.createLinearGradient(0, Y, 0, Y + h); g.addColorStop(0, '#0c1236'); g.addColorStop(1, '#2a2f6a'); x.fillStyle = g; x.fillRect(X, Y, w, h)
  if (stars) for (let i = 0; i < 10; i++) { const a = 0.5 + 0.5 * Math.sin(t * 2 + i * 1.7); R(x, `rgba(255,248,220,${0.4 + 0.5 * a})`, X + ((i * 53) % w), Y + ((i * 37) % (h * 0.6)), 4, 4) }
  R(x, '#e9ecff', X, Y + h - 22, w, 22); R(x, '#cfd5f2', X, Y + h - 22, w, 6)
  snow(x, t, { n: snowN, x0: X, x1: X + w, y0: Y, y1: Y + h, size: 5, speed: 40 })
  x.restore()
  // frame + cross bars + a little snow on the sill
  R(x, frame, X + w / 2 - 5, Y, 10, h); R(x, frame, X, Y + h / 2 - 5, w, 10)
  box(x, X - 18, Y + h + 4, w + 36, 18, frame, { b: 5 }); R(x, '#ffffff', X - 12, Y + h, w + 24, 6)
}
/** string lights sagging between two points */
export function stringLights(x, t, x0, y0, x1, y1, { sag = 50, n = 12, cols = [RED, GOLD, '#3fd08a', '#5fb8ff', PINK] } = {}) {
  x.save(); x.strokeStyle = '#2a3a2a'; x.lineWidth = 4; x.beginPath()
  for (let i = 0; i <= 30; i++) { const p = i / 30, px = lerp(x0, x1, p), py = lerp(y0, y1, p) + Math.sin(Math.PI * p) * sag; i ? x.lineTo(px, py) : x.moveTo(px, py) }
  x.stroke(); x.restore()
  for (let i = 0; i < n; i++) {
    const p = (i + 0.5) / n, px = lerp(x0, x1, p), py = lerp(y0, y1, p) + Math.sin(Math.PI * p) * sag
    const c = cols[i % cols.length], on = 0.6 + 0.4 * Math.sin(t * 3 + i * 1.3)
    glow(x, px, py + 12, 34, 0.22 * on, c === RED ? '255,90,90' : c === GOLD ? '255,210,110' : c === PINK ? '255,140,190' : c === '#3fd08a' ? '90,230,150' : '110,190,255')
    R(x, INK, px - 7, py + 2, 14, 20); R(x, c, px - 4, py + 5, 8, 14); R(x, '#ffffff', px - 3, py + 6, 3, 3)
  }
}
export function wreath(x, t, cx, cy, r = 60) {
  for (let i = 0; i < 16; i++) { const a = i / 16 * Math.PI * 2; box(x, cx + Math.cos(a) * r - 14, cy + Math.sin(a) * r - 14, 28, 28, i % 2 ? HOLLY : GREEN, { b: 4 }) }
  for (let i = 0; i < 5; i++) { const a = i / 5 * Math.PI * 2 + 0.4; R(x, RED, cx + Math.cos(a) * r - 5, cy + Math.sin(a) * r - 5, 10, 10) }
  box(x, cx - 22, cy + r - 10, 44, 22, RED, { b: 4 }); void t
}
/** a pixel holiday tree */
export function tree(x, t, cx, base, h = 420) {
  box(x, cx - 26, base - 50, 52, 50, '#7a4a2a', { b: 6 })
  const rows = 6
  for (let j = 0; j < rows; j++) {
    const w = lerp(90, 330, j / (rows - 1)) * h / 420, y = base - 50 - (rows - j) * (h - 60) / rows
    box(x, cx - w / 2, y, w, (h - 60) / rows + 6, j % 2 ? HOLLY : GREEN, { b: 6 })
  }
  const BALLS = [[-60, 0.55], [50, 0.7], [-100, 0.85], [90, 0.88], [0, 0.42], [-20, 0.72], [110, 0.6]]
  BALLS.forEach(([dx, p], i) => { const by = base - 50 - (1 - p) * (h - 60); const c = [RED, GOLD, '#5fb8ff', PINK][i % 4]; R(x, INK, cx + dx * h / 420 - 10, by - 10, 20, 20); R(x, c, cx + dx * h / 420 - 7, by - 7, 14, 14); R(x, '#fff', cx + dx * h / 420 - 5, by - 5, 4, 4) })
  drawPixelStar(x, cx, base - h - 10, 60 + 6 * Math.sin(t * 3), 2, GOLD)
}
/** the warm interior: wallpaper, wainscot, floor, a snowy window, string lights, a wreath. o: { wall, tint, window, tree, wreath, floorY } */
export function room(x, t, o = {}) {
  const wall = o.wall ?? '#6e3a4e', floorY = o.floorY ?? 1290
  R(x, wall, 0, 0, 1080, floorY)
  // wallpaper stripes + a little diamond print
  for (let i = 0; i < 1080; i += 90) R(x, 'rgba(255,230,200,0.06)', i, 0, 40, floorY)
  for (let j = 0; j < 14; j++) for (let i = 0; i < 12; i++) if ((i + j) % 2 === 0) R(x, 'rgba(255,220,170,0.07)', i * 90 + 62, j * 92 + 30, 8, 8)
  // wainscot
  R(x, o.wains ?? '#4a2436', 0, floorY - 300, 1080, 300); R(x, '#2a1222', 0, floorY - 306, 1080, 12)
  for (let i = 40; i < 1080; i += 200) box(x, i, floorY - 260, 150, 200, 'rgba(255,220,190,0.06)', { b: 4 })
  // floor
  R(x, o.floor ?? '#5a3420', 0, floorY, 1080, 1920 - floorY)
  for (let j = 0; j < 8; j++) R(x, 'rgba(0,0,0,0.18)', 0, floorY + j * 84, 1080, 6)
  for (let j = 0; j < 8; j++) for (let i = 0; i < 6; i++) R(x, 'rgba(0,0,0,0.12)', ((i * 220 + j * 110) % 1200) - 60, floorY + j * 84, 6, 84)
  if (o.window !== false) windowView(x, t, o.winX ?? 120, o.winY ?? 470, o.winW ?? 300, o.winH ?? 360)
  if (o.wreath !== false) wreath(x, t, o.wreathX ?? 800, o.wreathY ?? 560, 58)
  if (o.lights !== false) stringLights(x, t, -20, o.lightsY ?? 440, 1100, o.lightsY ?? 440, { sag: 60, n: 13 })
  if (o.tree) tree(x, t, o.treeX ?? 900, floorY + 30, o.treeH ?? 460)
  // warm vignette from the lamps
  glow(x, 540, 900, 900, 0.12, '255,190,120')
}
/** the dining table, front view (draw AFTER the seated cast so it covers their lower half) */
export function table(x, cx, y, w, { cloth = '#f3ead8', runner = RED, legs = true, h = 230 } = {}) {
  box(x, cx - w / 2, y, w, 34, cloth, { b: 6 })
  R(x, cloth, cx - w / 2, y + 34, w, h - 34); R(x, INK, cx - w / 2 - 6, y + 34, 6, h - 34); R(x, INK, cx + w / 2, y + 34, 6, h - 34); R(x, INK, cx - w / 2 - 6, y + h, w + 12, 6)
  for (let i = 0; i < w; i += 60) R(x, 'rgba(120,80,60,0.12)', cx - w / 2 + i, y + 34, 30, h - 34)
  R(x, runner, cx - 70, y, 140, h); R(x, 'rgba(255,255,255,0.18)', cx - 70, y, 140, 8)
  for (let i = 0; i < 7; i++) R(x, GOLD, cx - 60 + i * 20, y + h - 18, 8, 8)
  if (legs) for (const d of [-1, 1]) box(x, cx + d * (w / 2 - 50) - 16, y + h + 6, 32, 90, '#6b4a2f', { b: 6 })
}
export function plate(x, cx, cy, food = '#d98a3a') { R(x, INK, cx - 52, cy - 12, 104, 26); R(x, '#ffffff', cx - 46, cy - 8, 92, 18); R(x, food, cx - 24, cy - 16, 48, 14); R(x, INK, cx - 24, cy - 20, 48, 4) }
export function candle(x, t, cx, base, h = 70, col = RED) {
  box(x, cx - 10, base - h, 20, h, col, { b: 4 }); R(x, '#ffffff', cx - 6, base - h, 4, h)
  const f = 1 + 0.15 * Math.sin(t * 17 + cx)
  glow(x, cx, base - h - 18, 60, 0.35, '255,200,110')
  R(x, INK, cx - 7, base - h - 30 * f, 14, 28 * f); R(x, GOLD, cx - 4, base - h - 26 * f, 8, 22 * f); R(x, '#fff3c0', cx - 2, base - h - 16 * f, 4, 10 * f)
}
export function pie(x, cx, cy, w = 160) { box(x, cx - w / 2, cy - 30, w, 40, '#d99a4a', { b: 6, hi: '#f2c27a' }); for (let i = 0; i < 4; i++) R(x, '#a5652a', cx - w / 2 + 20 + i * (w - 40) / 3, cy - 24, 12, 26); R(x, '#b9b0c8', cx - w / 2 - 14, cy + 12, w + 28, 10) }
export function mug(x, cx, cy, col = RED) { box(x, cx - 22, cy - 26, 44, 50, col, { b: 5 }); R(x, INK, cx + 22, cy - 16, 16, 30); R(x, col, cx + 22, cy - 10, 10, 18); R(x, '#5a3420', cx - 18, cy - 24, 36, 8) }
/** a wrapped gift */
export function gift(x, cx, base, w, h, col, ribbon = GOLD, { rot = 0, k = 1 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, base); x.rotate(rot); x.scale(k, k)
  box(x, -w / 2, -h, w, h, col, { b: 6, hi: 'rgba(255,255,255,0.18)' })
  R(x, ribbon, -8, -h, 16, h); R(x, ribbon, -w / 2, -h * 0.55 - 8, w, 16)
  R(x, INK, -30, -h - 24, 24, 22); R(x, ribbon, -26, -h - 20, 16, 14); R(x, INK, 6, -h - 24, 24, 22); R(x, ribbon, 10, -h - 20, 16, 14)
  x.restore()
}
/** an outdoor snowy night street: houses with lit windows, a snowbank, a lamp post. o: { scroll } */
export function street(x, t, o = {}) {
  const sc = o.scroll ?? 0
  const g = x.createLinearGradient(0, 0, 0, 1920); g.addColorStop(0, 'rgba(8,10,40,0.35)'); g.addColorStop(1, 'rgba(30,30,80,0.5)'); x.fillStyle = g; x.fillRect(0, 0, 1080, 1920)
  for (let i = -1; i < 5; i++) {
    const hx = ((i * 330 - sc) % 1650 + 1650) % 1650 - 300, hy = 930 + (i % 2) * 30, hw = 280, hh = 300
    box(x, hx, hy, hw, hh, ['#3a2a4e', '#2e3a5a', '#4a2a3a'][((i % 3) + 3) % 3], { b: 6 })
    x.fillStyle = INK; x.beginPath(); x.moveTo(hx - 26, hy + 4); x.lineTo(hx + hw / 2, hy - 140); x.lineTo(hx + hw + 26, hy + 4); x.fill()
    x.fillStyle = '#e9ecff'; x.beginPath(); x.moveTo(hx - 16, hy - 2); x.lineTo(hx + hw / 2, hy - 128); x.lineTo(hx + hw + 16, hy - 2); x.fill()
    for (const wx of [hx + 40, hx + hw - 100]) { glow(x, wx + 30, hy + 120, 90, 0.25, '255,200,120'); box(x, wx, hy + 80, 60, 80, '#ffd27a', { b: 5 }); R(x, '#c98a3a', wx + 27, hy + 80, 6, 80) }
    stringLights(x, t, hx, hy + 14, hx + hw, hy + 14, { sag: 18, n: 6 })
  }
  // ground + snowbank
  R(x, '#dfe4fb', 0, 1230, 1080, 690); R(x, '#c7cdea', 0, 1230, 1080, 14)
  for (let i = 0; i < 9; i++) R(x, '#ffffff', ((i * 160 - sc * 1.4) % 1300 + 1300) % 1300 - 110, 1236 + (i % 3) * 8, 90, 10)
  R(x, '#b9bfe0', 0, 1480, 1080, 6)
  // lamp post
  const lx = (((760 - sc * 1.2) % 1400) + 1400) % 1400 - 160
  box(x, lx - 10, 820, 20, 420, '#2a2840', { b: 5 }); box(x, lx - 34, 780, 68, 50, '#ffe6a0', { b: 6 }); glow(x, lx, 820, 260, 0.35, '255,220,140')
}
/** the car interior at night: windshield view of a snowy road, dashboard, steering wheel. o: { speed, wheelX, turn } */
export function carInterior(x, t, o = {}) {
  const sp = o.speed ?? 1
  // the windshield: sky + road vanishing point
  x.save(); x.beginPath(); x.rect(60, 360, 960, 620); x.clip()
  const g = x.createLinearGradient(0, 360, 0, 980); g.addColorStop(0, '#0b1034'); g.addColorStop(1, '#262a64'); x.fillStyle = g; x.fillRect(60, 360, 960, 620)
  for (let i = 0; i < 14; i++) { const a = 0.5 + 0.5 * Math.sin(t * 2 + i * 1.3); R(x, `rgba(255,248,220,${0.35 + 0.5 * a})`, 80 + (i * 71) % 920, 380 + (i * 43) % 220, 4, 4) }
  const vx = 540 + (o.turn ?? 0) * 120, vy = 700
  x.fillStyle = '#1a1a34'; x.beginPath(); x.moveTo(vx - 10, vy); x.lineTo(vx + 10, vy); x.lineTo(1100, 1000); x.lineTo(-20, 1000); x.fill()
  x.fillStyle = '#e9ecff'; x.beginPath(); x.moveTo(60, vy + 10); x.lineTo(vx - 14, vy); x.lineTo(-40, 1000); x.lineTo(60, 1000); x.fill(); x.beginPath(); x.moveTo(1020, vy + 10); x.lineTo(vx + 14, vy); x.lineTo(1120, 1000); x.lineTo(1020, 1000); x.fill()
  for (let i = 0; i < 6; i++) { const p = ((t * 0.9 * sp + i / 6) % 1), q = p * p; const y = lerp(vy, 1000, q), w = lerp(2, 26, q), h = lerp(4, 70, q); R(x, GOLD, lerp(vx, 540, q) - w / 2, y, w, h) }
  // trees on the roadside
  for (let i = 0; i < 6; i++) { const p = ((t * 0.5 * sp + i / 6) % 1), q = p * p; for (const d of [-1, 1]) { const tx = lerp(vx, 540 + d * 700, q), ty = lerp(vy, 980, q), s = lerp(6, 160, q); x.fillStyle = INK; x.beginPath(); x.moveTo(tx, ty - s * 2); x.lineTo(tx - s * 0.6, ty); x.lineTo(tx + s * 0.6, ty); x.fill(); x.fillStyle = '#e9ecff'; x.beginPath(); x.moveTo(tx, ty - s * 2); x.lineTo(tx - s * 0.25, ty - s * 1.2); x.lineTo(tx + s * 0.25, ty - s * 1.2); x.fill() } }
  snow(x, t, { n: 40, x0: 60, x1: 1020, y0: 360, y1: 980, size: 6, speed: 260 * sp })
  x.restore()
  // the frame: pillars + roof + mirror
  R(x, '#141026', 0, 0, 1080, 360); R(x, '#141026', 0, 360, 60, 900); R(x, '#141026', 1020, 360, 60, 900)
  R(x, '#221a3c', 0, 330, 1080, 30); box(x, 440, 380, 200, 60, '#2a2240', { b: 6 }); R(x, '#4a4a7a', 452, 392, 176, 36)
  // seats glimpse + dashboard
  R(x, '#1e1834', 0, 980, 1080, 940)
  box(x, 0, 980, 1080, 120, '#2e2448', { b: 8, hi: '#3a3058' })
  for (let i = 0; i < 4; i++) { const a = 0.6 + 0.4 * Math.sin(t * 2 + i); R(x, `rgba(127,227,255,${0.5 * a})`, 160 + i * 40, 1010, 22, 8) }
  label(x, o.clock ?? '9:48 PM', 820, 1030, { size: 30, col: '#7fe3ff' })
}
/** the steering wheel (draw in front of the driver) */
export function steeringWheel(x, t, cx, cy, turn = 0) {
  x.save(); x.translate(cx, cy); x.rotate(turn * 0.5 + 0.03 * Math.sin(t * 1.7))
  x.strokeStyle = INK; x.lineWidth = 34; x.beginPath(); x.arc(0, 0, 130, 0, Math.PI * 2); x.stroke()
  x.strokeStyle = '#3a3050'; x.lineWidth = 22; x.beginPath(); x.arc(0, 0, 130, 0, Math.PI * 2); x.stroke()
  R(x, INK, -16, -10, 32, 140); R(x, '#3a3050', -10, -4, 20, 134); R(x, INK, -130, -14, 260, 28); R(x, '#3a3050', -126, -8, 252, 16)
  box(x, -38, -30, 76, 60, '#2a2240', { b: 6 })
  x.restore()
}
/** a phone (portrait) with a clipped screen painter fn(x, X, Y, w, h) */
export function phone(x, X, Y, w, h, fn, { rot = 0, k = 1, body = '#1d1830' } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(X + w / 2, Y + h / 2); x.rotate(rot); x.scale(k, k); x.translate(-w / 2, -h / 2)
  box(x, 0, 0, w, h, body, { b: 8 }); R(x, '#3a3456', 6, 6, w - 12, 6)
  x.save(); x.beginPath(); x.rect(16, 40, w - 32, h - 80); x.clip(); fn(x, 16, 40, w - 32, h - 80); x.restore()
  R(x, '#3a3456', w / 2 - 40, h - 26, 80, 8)
  x.restore()
}
/** the app's talk card (a real feature): a deep violet card with a gold rim, "TALK CARD" and the question */
export function talkCard(x, t, cx, cy, k, text, { w = 520, h = 330, rot = -0.04 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot + 0.02 * Math.sin(t * 2)); x.scale(k, k)
  R(x, 'rgba(6,4,18,0.6)', -w / 2 + 14, -h / 2 + 16, w, h)
  box(x, -w / 2, -h / 2, w, h, '#2a1850', { b: 8 }); R(x, GOLD, -w / 2 + 14, -h / 2 + 14, w - 28, 6); R(x, GOLD, -w / 2 + 14, h / 2 - 20, w - 28, 6)
  drawPixelStar(x, -w / 2 + 46, -h / 2 + 52, 34, 1, GOLD)
  label(x, 'TALK CARD', -w / 2 + 76, -h / 2 + 54, { size: 26, col: GOLD, align: 'left' })
  x.font = `800 40px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = BONE
  const words = text.split(' '), rows = []; let cur = ''
  for (const wd of words) { const tt = cur ? cur + ' ' + wd : wd; if (x.measureText(tt).width > w - 70 && cur) { rows.push(cur); cur = wd } else cur = tt }
  rows.push(cur)
  rows.forEach((r, i) => x.fillText(r, 0, 20 + (i - (rows.length - 1) / 2) * 50))
  x.restore()
}
/** a name/place card (folded tent) */
export function placeCard(x, cx, cy, name, { col = BONE, ink = INK, rot = 0, k = 1, w = 170, glitter = false, t = 0 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  box(x, -w / 2, -40, w, 80, col, { b: 5 }); R(x, 'rgba(0,0,0,0.12)', -w / 2, 26, w, 14)
  x.font = `800 ${name.length > 7 ? 26 : 32}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = ink; x.fillText(name, 0, -4)
  if (glitter) for (let i = 0; i < 6; i++) { const a = 0.5 + 0.5 * Math.sin(t * 6 + i * 2); R(x, `rgba(255,220,120,${a})`, -w / 2 + 12 + i * (w - 24) / 5, -34 + (i % 2) * 52, 6, 6) }
  x.restore()
}
/** a tissue box (Pisces' prop) */
export function tissues(x, cx, cy, s) {
  box(x, cx - s / 2, cy - s * 0.3, s, s * 0.6, '#9fd8f6', { b: 4, hi: '#c9ecfb' })
  R(x, INK, cx - s * 0.18 - 4, cy - s * 0.3 - 4, s * 0.36 + 8, 8)
  R(x, '#ffffff', cx - s * 0.12, cy - s * 0.3 - s * 0.32, s * 0.24, s * 0.34)
}

// ───────────────────────────────────────────────────────────── the bug: HOME FOR THE HOLIDAYS
function buildBug(root) {
  const b = el('div', { position: 'absolute', left: '56px', top: '56px', height: '44px', display: 'flex', alignItems: 'center', gap: '14px', transformOrigin: '0% 50%', pointerEvents: 'none' }, root)
  el('div', { width: '18px', height: '18px', background: BUG_COL, boxShadow: `0 0 0 4px ${INK}, 0 0 16px rgba(255,154,138,0.7)` }, b)
  el('div', { font: `800 28px ${INTER}`, letterSpacing: '0.2em', color: BUG_COL, textShadow: '0 2px 12px rgba(6,4,18,0.9)', whiteSpace: 'nowrap', fontVariant: 'small-caps' }, b, 'HOME<span style="color:rgba(255,255,255,0.6)">&nbsp;FOR&nbsp;THE&nbsp;HOLIDAYS</span>')
  return { update(t, out = 1) { b.style.display = out <= 0.01 ? 'none' : 'flex'; b.style.opacity = String(clamp(out)) } }
}

// ═══════════════════════════════════════════════════════════════════════════ the episode
export function makeEp(cfg) {
  const DURATION = cfg.duration, STORY_END = DURATION - ENDCARD_LEN
  const L = cfg.last
  const SHOTS = cfg.shots, LINES = cfg.lines || [], HEADS = cfg.heads || [], PUNCH = cfg.punch || []
  const shotAt = t => { let s = SHOTS[0]; for (const sh of SHOTS) if (t >= sh.at) s = sh; return s }
  const endOf = sh => { const i = SHOTS.indexOf(sh); return i < SHOTS.length - 1 ? SHOTS[i + 1].at : STORY_END }
  function applyCam(x, t, sh) {
    let [z, cx, cy] = typeof sh.cam === 'function' ? sh.cam(t) : (sh.cam || [1, 540, 960])
    z *= 1 + (sh.push ?? 0.03) * prog(t, sh.at, endOf(sh))
    if (sh.at > 0 && sh.flash !== false) z *= 1 + 0.06 * (1 - ease.outCubic(prog(t, sh.at, sh.at + 0.3)))
    for (const p of PUNCH) {
      const k = ease.outCubic(prog(t, p.at, p.at + 0.16)) * (1 - ease.inOutQuad(prog(t, p.at + p.dur - 0.3, p.at + p.dur)))
      if (k <= 0) continue
      const sh2 = Math.sin((t - p.at) * 70) * 5 * (1 - prog(t, p.at, p.at + 0.25))
      z *= 1 + p.z * k; cx = lerp(cx, p.x, k) + sh2; cy = lerp(cy, p.y, k)
    }
    x.translate(540, 960); x.scale(z, z); x.translate(-cx, -cy)
  }

  async function build(stage) {
    try {
      await Promise.all(["800 112px Inter", "800 50px Inter", "800 40px Inter", "800 28px Inter", "italic 500 150px 'EB Garamond'", "italic 500 64px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 26px 'Space Mono'"].map(f => document.fonts.load(f)))
    } catch (_) { /* fonts optional */ }
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const H = cfg.hook
    // the hook is fully in at t = 0 (frame 0 is the thumbnail): its words are timed before 0
    const hook = popText(root, H.text, { top: H.top ?? 170, size: H.size ?? 84, accentSize: H.accentSize ?? 124, at: -3, gap: 0.01, accentColor: H.color ?? GOLD, fit: true, wobble: true })
    const heads = HEADS.map(h => ({ h, p: popText(root, h.text, { top: h.top ?? 176, size: h.size ?? 80, accentSize: h.accentSize ?? 118, at: h.at, gap: 0.07, accentColor: h.color ?? GOLD, fit: true }) }))
    const ov = layerCanvas(root), ox = ov.getContext('2d')
    const boxes = (cfg.boxes || []).map(b => dialogueBox(root, { lines: LINES.slice(b.from, b.to), y: b.y ?? 1440, width: 960, height: b.h ?? 270, open: b.open, close: b.close, cps: CPS }))
    const lesson = cfg.lesson ? buildLesson(root, { at: cfg.lesson.at, out: cfg.lesson.out, text: cfg.lesson.text, chip: cfg.lesson.chip, accentColor: cfg.lesson.color ?? GOLD, dim: 0.55 }) : null
    const last = popText(root, L.text, { top: L.top ?? 190, size: L.size ?? 104, accentSize: L.accentSize ?? 160, at: L.at, gap: 0.08, accentColor: L.color ?? GOLD, wobble: true, late: 1, lateAt: L.at + 0.4, fit: true })
    const bug = buildBug(root)
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
    const flash = el('div', { position: 'absolute', inset: 0, background: '#fff6ea', opacity: 0, pointerEvents: 'none' }, root)
    return {
      start: 0, end: STORY_END + 0.01, root,
      update(t) {
        const sh = shotAt(t), i = SHOTS.indexOf(sh)
        drawSky(x, t, SKY_H)
        x.save(); applyCam(x, t, sh)
        sh.draw(x, t, { u: t - sh.at, at: sh.at, end: endOf(sh), i })
        x.restore()
        ox.clearRect(0, 0, 1080, 1920)
        if (cfg.overlay) cfg.overlay(ox, t, sh)
        hook.update(t, outK(t, H.out))
        for (const { h, p } of heads) p.update(t, t < h.out[1] ? outK(t, h.out) : 0)
        for (const b of boxes) b.update(t)
        if (lesson) lesson.update(t)
        last.update(t, outK(t, [STORY_END - 0.3, STORY_END]))
        bug.update(t, outK(t, [STORY_END - 0.3, STORY_END]))
        const fl = SHOTS.reduce((m, s) => (s.at > 0 && s.flash !== false && t >= s.at && t < s.at + 0.12) ? Math.max(m, 1 - (t - s.at) / 0.12) : m, 0)
        flash.style.opacity = String(0.32 * fl)
        drawGrain(gx, t)
      },
    }
  }
  const CUTS = cfg.cuts
  const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl br', fadeIn: 0, label: 'TONIGHT’S DECK' }), cardCuts(CUTS)]

  // ── sound (pitched SFX are shifted into the film's key by the engine)
  const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
  const wordPops = (t0, n, gap, b0 = 0, gain = 0.024) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(b0 + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
  const nWords = s => s.replace(/\|/g, ' ').split(/\s+/).filter(Boolean).length
  const PITCH = cfg.pitch || {}
  const CUES = [
    ['bell', 0.05, 1760, 0.02, 1.0, 0],
    ...SHOTS.filter(s => s.at > 0 && s.flash !== false).flatMap(s => [['whoosh', r3(s.at - 0.07), 0.26, 0.03], ['tick', r3(s.at), 0.04]]),
    ...PUNCH.flatMap(p => [['whoosh', r3(p.at - 0.03), 0.18, 0.02], ['pop', r3(p.at + 0.04), 1318.51, 0.03, 0]]),
    ...HEADS.flatMap((h, k) => wordPops(h.at, Math.min(6, nWords(h.text)), 0.07, k)),
    ...(cfg.boxes || []).map(b => ['pop', r3(b.open), 739.99, 0.035, 0]),
    ...(LINES.length ? talkCues(LINES, { cps: CPS, pitch: PITCH }) : []),
    ...(cfg.lesson ? lessonCues(cfg.lesson.at, { text: cfg.lesson.text, chip: cfg.lesson.chip }) : []),
    ...wordPops(L.at, 3, 0.08, 2), ['pop', r3(L.at + 0.4), 1174.66, 0.05, 0], ['bell', r3(L.at + 0.42), 1567.98, 0.025, 1.2, 0],
    ...(cfg.cues || []).map(c => [c[0], r3(c[1]), ...c.slice(2)]),
    ...cardCutCues(CUTS),
    ...endcardCues(STORY_END),
  ]
  return { DURATION, SCENES, CUES, STORY_END, CUTS }
}
