// famkit.js: the shared look of "Season 16: Meet the Family", episodes 13–24 (nf16e13…nf16e24, batch b22, see
// promo/films/next30/b22.md). nf16e13 owns this file; nf16e14–nf16e24 import it read-only from ../../nf16e13/famkit.js.
//
// The format (28–43 s, story = DURATION − 2.4, then the short 2.4 s end card):
//   beats[0]   the hook: the headline is already in at frame 0 and the cast is mid-action inside a lit "room" diorama
//              (porch, living room, table, kitchen, guest room, car, street, desk) floating on the night sky.
//   beats[…]   the situation in 1–3 quick scene beats (a white flash + zoom punch on each hard cut).
//   notes      THE STARS' NOTES: a bone note card with three numbered tips (Inter 800 + one EB Garamond italic accent),
//              the cast acting under it. (No card-back cut: the card drops in on its own whoosh.)
//   lesson     optional ★ LESSON UNLOCKED (lesson.js), for the 45 s films.
//   payoff     the callback, and THE STARS say the last line. Pisces cries in every film (always happy tears).
// Bug: "MEET THE FAMILY" in Inter 800 small caps, letter-spaced, warm amber, top-left 56 px.
//
//   makeFamily(cfg) → { DURATION, SCENES, CUES, B, STORY_END, CUT }
//     cfg.cast  { key: { sign, role?, acc? } }   acc: { glasses, beanie: col, scarf: col, apron: col, bow: col, pearls }
//     cfg.beats [{ len, head?, accent?, room?, roomOpts?, draw?(x, t, S), lines?: [{ u, who, text }], cues?: [[name, u, …]],
//                 pis?: { x, y, s, mood, tears, look, tissues } | false, kind?: 'scene' | 'notes' | 'lesson',
//                 tips? (notes: three strings), text?/chip? (lesson), last? (payoff: THE STARS' last line), lastU? }]
//     S (handed to draw) = { u, t0, t1, k, out, cast(x, t, key, o), stars(x, t, o), pisces(x, t, o), B }
// Everything draws as a pure function of t; DOM and canvases are made only inside build().
import { clamp, lerp, prog, ease, el } from '../../src/lib.js'
import { fill } from '../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas, drawPixelStar } from '../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../wheel.js'
import { ENDCARD_SHORT_LEN, buildEndcard, endcardCues } from '../endcard.js'
import { cardFrame } from '../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar, STAR } from '../startalk.js'
import { popText, buildLesson, lessonCues } from '../lesson.js'

export const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', LAV = '#c9a6ff', RED = '#e8344e', MINT = '#9fe6b0', SKYB = '#7fd0ff'
export const AMBER = '#ffb45e'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const SERIF = "'EB Garamond', Georgia, serif"
export const MONO = "'Space Mono', ui-monospace, monospace"
export const r3 = v => +v.toFixed(3)
export const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
export const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
export { clamp, lerp, prog, ease, easeOutBack, drawStarChar, signStar, STAR, drawPixelStar }
const CPS = 30

// ── room diorama bounds
export const ROOM = { x: 40, y: 400, w: 1000, h: 960 }
export const FLOOR = 1220

// ══════════════════════════════════════════════════════════════ drawing helpers
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
export function confetti(x, t, t0, cx, cy, { n = 26, life = 2.2, cols = [GOLD, PINK, SKYB, MINT, BONE] } = {}) {
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
/** a pixel speech bubble, popping at t0, gone by t1. tail −1…1 (left…right); think: a thought bubble */
export function bubble(x, t, cx, cy, t0, t1, text, { col = BONE, ink = INK, size = 34, tail = 0, font = INTER, weight = 800, think = false, tailDown = true } = {}) {
  const k = pop01(t, t0, 0.25, 2.4) * outK(t, [t1 - 0.15, t1])
  if (k <= 0.01 || t < t0 || t > t1) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.font = `${weight} ${size}px ${font}`
  const w = x.measureText(text).width + 44, h = size + 32
  x.fillStyle = INK; x.fillRect(-w / 2 - 5, -h / 2, w + 10, h); x.fillRect(-w / 2, -h / 2 - 5, w, h + 10)
  x.fillStyle = col; x.fillRect(-w / 2, -h / 2, w, h)
  const tx = tail * (w / 2 - 40), dir = tailDown ? 1 : -1, ty = dir * h / 2
  if (think) {
    for (const [ox, oy, r] of [[0, 18, 11], [tail * 18, 44, 7]]) { R(x, INK, tx + ox - r - 4, ty + dir * oy - r - 4, 2 * r + 8, 2 * r + 8); R(x, col, tx + ox - r, ty + dir * oy - r, 2 * r, 2 * r) }
  } else {
    x.fillStyle = INK; x.fillRect(tx - 14, ty + (dir > 0 ? 4 : -16), 14, 12); x.fillRect(tx - 7, ty + (dir > 0 ? 14 : -22), 8, 8)
    x.fillStyle = col; x.fillRect(tx - 9, ty + (dir > 0 ? 0 : -9), 9, 9)
  }
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
export function glow(x, cx, cy, r, a, col = '255,214,150') {
  if (a <= 0) return
  const g = x.createRadialGradient(cx, cy, 0, cx, cy, r); g.addColorStop(0, `rgba(${col},${a})`); g.addColorStop(1, `rgba(${col},0)`)
  x.fillStyle = g; x.fillRect(cx - r, cy - r, 2 * r, 2 * r)
}
/** a big "!" or "?" pop over a head */
export function mark(x, t, cx, cy, t0, t1, ch = '!', col = GOLD) {
  const k = pop01(t, t0, 0.22, 3) * outK(t, [t1 - 0.12, t1])
  if (k <= 0.01 || t < t0 || t > t1) return
  label(x, ch, cx, cy - 10 * Math.sin((t - t0) * 9) * Math.exp(-(t - t0) * 4), { size: 96 * k, col, font: INTER, weight: 800 })
}
/** a sweat drop / steam puff */
export function puff(x, t, cx, cy, t0, { n = 4, col = 'rgba(239,230,214,0.55)', rise = 160, life = 1.2, size = 26 } = {}) {
  for (let i = 0; i < n; i++) {
    const p = (((t - t0) / life + i / n) % 1 + 1) % 1
    if (t < t0) return
    x.save(); x.globalAlpha = Math.sin(Math.PI * p)
    const s = size * (0.6 + p)
    R(x, col, cx + Math.sin(p * 6 + i * 2) * 22 - s / 2, cy - p * rise - s / 2, s, s)
    x.restore()
  }
}

// ── star sprite frame (mirrors startalk.js drawStarChar), so props and accessories sit on the sprite
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
/** happy tears (sprite cells), k: 1 sniffle · 2 streams · 3 fountains */
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
// accessories, in sprite cells (the star: 36 cells, top tip ≈ (18, 2), eyes ≈ y 17–21 at x 13 / 23, waist ≈ y 26)
function cellsRect(ctx, col, i, j, w, h) { ctx.fillStyle = INK; ctx.fillRect(i - 0.5, j - 0.5, w + 1, h + 1); ctx.fillStyle = col; ctx.fillRect(i, j, w, h) }
export function accCells(ctx, t, acc) {
  if (!acc) return
  if (acc.scarf) {
    cellsRect(ctx, acc.scarf, 11, 25, 14, 2.4)
    cellsRect(ctx, acc.scarf, 21, 26.5, 2.6, 6 + 0.4 * Math.sin(t * 4))
    ctx.fillStyle = 'rgba(255,255,255,0.35)'; for (let i = 0; i < 4; i++) ctx.fillRect(12 + i * 3.4, 25.4, 1.2, 1.6)
  }
  if (acc.apron) { cellsRect(ctx, acc.apron, 13.5, 24, 9, 8.5); ctx.fillStyle = 'rgba(0,0,0,0.12)'; ctx.fillRect(15.5, 28, 5, 2.4) }
  if (acc.bow) { cellsRect(ctx, acc.bow, 15, 24.6, 2.4, 2.4); cellsRect(ctx, acc.bow, 18.6, 24.6, 2.4, 2.4); ctx.fillStyle = INK; ctx.fillRect(17.4, 25.2, 1.2, 1.2) }
  if (acc.pearls) for (let i = 0; i < 7; i++) { const a = Math.PI * (0.15 + 0.7 * i / 6); const px = 18 - Math.cos(a) * 6.2, py = 23.4 + Math.sin(a) * 2.4; ctx.fillStyle = INK; ctx.fillRect(px - 0.75, py - 0.75, 1.5, 1.5); ctx.fillStyle = '#fff8ee'; ctx.fillRect(px - 0.5, py - 0.5, 1, 1) }
  if (acc.glasses) {
    for (const ex of [13.6, 22.4]) { ctx.fillStyle = INK; ctx.fillRect(ex - 3.1, 16.3, 6.2, 0.9); ctx.fillRect(ex - 3.1, 21.6, 6.2, 0.9); ctx.fillRect(ex - 3.1, 16.3, 0.9, 6.2); ctx.fillRect(ex + 2.2, 16.3, 0.9, 6.2); ctx.fillStyle = 'rgba(255,255,255,0.28)'; ctx.fillRect(ex - 2.1, 17.3, 1.2, 1.2) }
    ctx.fillStyle = INK; ctx.fillRect(16.6, 17.4, 2.8, 0.9)
  }
  if (acc.beanie) {
    cellsRect(ctx, acc.beanie, 14.2, 2.2, 7.6, 3.6); cellsRect(ctx, '#fff1dc', 13.4, 5.6, 9.2, 1.6)
    cellsRect(ctx, '#fff1dc', 16.9, -0.4, 2.2, 2.2)
  }
  if (acc.bun) { cellsRect(ctx, acc.bun, 15.8, -0.6, 4.4, 3.2); ctx.fillStyle = 'rgba(255,255,255,0.3)'; ctx.fillRect(16.6, 0, 1.2, 1) }
}

// ══════════════════════════════════════════════════════════════ rooms (each → { back(x, t), front(x, t) })
const WALLS = { warm: ['#4a2f52', '#553760'], plum: ['#3a2a5a', '#44336a'], rose: ['#5a2f45', '#663a52'], teal: ['#23415a', '#2b4c68'], olive: ['#3f3d2a', '#4a4732'] }
function wall(x, kind = 'warm', stripes = true) {
  const [a, b] = WALLS[kind] || WALLS.warm
  R(x, a, ROOM.x, ROOM.y, ROOM.w, FLOOR - ROOM.y)
  if (stripes) for (let i = 0; i < 12; i++) R(x, b, ROOM.x + 20 + i * 86, ROOM.y, 30, FLOOR - ROOM.y)
}
function floorWood(x, col = '#5a3b2e') {
  R(x, col, ROOM.x, FLOOR, ROOM.w, ROOM.y + ROOM.h - FLOOR)
  R(x, INK, ROOM.x, FLOOR - 6, ROOM.w, 10); R(x, '#7a5440', ROOM.x, FLOOR + 4, ROOM.w, 6)
  for (let j = 0; j < 3; j++) for (let i = 0; i < 6; i++) R(x, 'rgba(0,0,0,0.18)', ROOM.x + ((i * 190 + j * 95) % ROOM.w), FLOOR + 30 + j * 40, 6, 34)
}
export function windowSnow(x, t, cx, cy, w, h, { moon = true } = {}) {
  box(x, cx - w / 2, cy - h / 2, w, h, '#151236', { b: 10 })
  x.save(); x.beginPath(); x.rect(cx - w / 2, cy - h / 2, w, h); x.clip()
  const g = x.createLinearGradient(0, cy - h / 2, 0, cy + h / 2); g.addColorStop(0, '#120f33'); g.addColorStop(1, '#2a2660'); x.fillStyle = g; x.fillRect(cx - w / 2, cy - h / 2, w, h)
  if (moon) { R(x, '#fff3c8', cx + w * 0.18, cy - h * 0.32, 36, 36); R(x, '#151236', cx + w * 0.18 + 12, cy - h * 0.32 - 4, 30, 30) }
  for (let i = 0; i < 26; i++) {
    const sx = cx - w / 2 + ((i * 97.3 + Math.sin(t * 0.7 + i) * 18) % w + w) % w
    const sy = cy - h / 2 + (((t * (40 + (i % 5) * 9) + i * 53) % h) + h) % h
    R(x, 'rgba(255,255,255,0.85)', sx, sy, 6, 6)
  }
  R(x, '#e9eef9', cx - w / 2, cy + h / 2 - 26, w, 26)
  x.restore()
  R(x, INK, cx - 5, cy - h / 2, 10, h); R(x, INK, cx - w / 2, cy - 5, w, 10)
}
export function tree(x, t, cx, base, h) {
  const tiers = 4
  for (let i = 0; i < tiers; i++) {
    const tw = h * (0.32 + 0.18 * (tiers - 1 - i) / (tiers - 1)) * 1.4, ty = base - h * 0.12 - i * h * 0.21
    x.save(); x.fillStyle = INK; x.beginPath(); x.moveTo(cx, ty - h * 0.3 - 8); x.lineTo(cx + tw / 2 + 8, ty + 6); x.lineTo(cx - tw / 2 - 8, ty + 6); x.closePath(); x.fill()
    x.fillStyle = i % 2 ? '#2f8f5a' : '#277a4d'; x.beginPath(); x.moveTo(cx, ty - h * 0.3); x.lineTo(cx + tw / 2, ty); x.lineTo(cx - tw / 2, ty); x.closePath(); x.fill(); x.restore()
  }
  box(x, cx - 20, base - h * 0.12, 40, h * 0.12, '#6b4a2f', { b: 5 })
  const cols = [GOLD, PINK, SKYB, MINT, '#ff7a5c']
  for (let i = 0; i < 18; i++) {
    const fy = 0.18 + 0.75 * ((i * 0.618) % 1), half = h * 0.5 * fy * 0.62
    const lx = cx + (((i * 0.37) % 1) * 2 - 1) * half, ly = base - h * 0.12 - h * 0.84 * (1 - fy)
    const on = Math.sin(t * 3 + i * 1.7) > -0.3
    R(x, INK, lx - 7, ly - 7, 14, 14); R(x, on ? cols[i % 5] : '#3a2f50', lx - 5, ly - 5, 10, 10)
  }
  drawPixelStar(x, cx, base - h * 0.98, 44, 2, GOLD)
}
export function couch(x, cx, y, w, col = '#a8475e') {
  box(x, cx - w / 2, y - 120, w, 120, col, { b: 7, hi: 'rgba(255,255,255,0.18)' })
  box(x, cx - w / 2 - 40, y - 150, 50, 150, col, { b: 7 }); box(x, cx + w / 2 - 10, y - 150, 50, 150, col, { b: 7 })
  box(x, cx - w / 2 + 10, y - 40, w - 20, 50, col, { b: 6, lo: 'rgba(0,0,0,0.18)' })
  R(x, INK, cx - w / 2 - 30, y + 10, 16, 22); R(x, INK, cx + w / 2 + 14, y + 10, 16, 22)
}
export function lamp(x, t, cx, base, h = 260, { on = 1 } = {}) {
  glow(x, cx, base - h + 30, 260, 0.22 * on)
  R(x, INK, cx - 6, base - h + 40, 12, h - 40); box(x, cx - 40, base - 14, 80, 14, '#3a2f50', { b: 5 })
  x.fillStyle = INK; x.beginPath(); x.moveTo(cx - 56, base - h + 70); x.lineTo(cx + 56, base - h + 70); x.lineTo(cx + 36, base - h - 10); x.lineTo(cx - 36, base - h - 10); x.closePath(); x.fill()
  x.fillStyle = on > 0.5 ? '#ffd98a' : '#8a7a5a'; x.beginPath(); x.moveTo(cx - 48, base - h + 63); x.lineTo(cx + 48, base - h + 63); x.lineTo(cx + 31, base - h - 3); x.lineTo(cx - 31, base - h - 3); x.closePath(); x.fill()
}
export function frameOnWall(x, cx, cy, w, h, col = '#c9a6ff', inner = null) {
  box(x, cx - w / 2, cy - h / 2, w, h, '#c79a4a', { b: 5 }); R(x, col, cx - w / 2 + 10, cy - h / 2 + 10, w - 20, h - 20)
  if (inner) inner(x, cx, cy)
  else { R(x, 'rgba(255,255,255,0.25)', cx - w / 2 + 16, cy + h / 2 - 34, w - 32, 14); drawPixelStar(x, cx, cy - 6, Math.min(w, h) * 0.36, 2, GOLD) }
}
export function wreath(x, t, cx, cy, r = 70) {
  for (let i = 0; i < 16; i++) { const a = i / 16 * Math.PI * 2; const px = cx + Math.cos(a) * r, py = cy + Math.sin(a) * r; R(x, INK, px - 20, py - 20, 40, 40); R(x, i % 2 ? '#2f8f5a' : '#3aa36a', px - 16, py - 16, 32, 32) }
  for (let i = 0; i < 5; i++) { const a = i / 5 * Math.PI * 2 + 0.3; R(x, RED, cx + Math.cos(a) * r - 6, cy + Math.sin(a) * r - 6, 12, 12) }
  box(x, cx - 22, cy + r - 6, 44, 22, RED, { b: 4 })
}
export function door(x, t, cx, base, { col = '#8a2f3e', open = 0, w = 230, h = 420 } = {}) {
  box(x, cx - w / 2 - 22, base - h - 22, w + 44, h + 22, '#efe6d6', { b: 7 })
  R(x, '#ffd98a', cx - w / 2, base - h, w, h); glow(x, cx, base - h / 2, 300, 0.3 * open)
  const dw = w * (1 - 0.85 * open)
  box(x, cx - w / 2, base - h, dw, h, col, { b: 6, hi: 'rgba(255,255,255,0.12)' })
  if (open < 0.5) {
    R(x, 'rgba(0,0,0,0.18)', cx - w / 2 + 26, base - h + 40, w - 52, 140); R(x, 'rgba(0,0,0,0.18)', cx - w / 2 + 26, base - h + 220, w - 52, 160)
    R(x, INK, cx + w / 2 - 44, base - h / 2 - 6, 22, 22); R(x, GOLD, cx + w / 2 - 40, base - h / 2 - 2, 14, 14)
    wreath(x, t, cx, base - h + 120, 62)
  }
}
export function plate(x, cx, cy, w = 120, food = null) {
  x.save(); x.fillStyle = INK; x.beginPath(); x.ellipse(cx, cy, w / 2 + 6, w * 0.2 + 6, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#f6f1e8'; x.beginPath(); x.ellipse(cx, cy, w / 2, w * 0.2, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#dcd4c6'; x.beginPath(); x.ellipse(cx, cy, w * 0.32, w * 0.12, 0, 0, Math.PI * 2); x.fill(); x.restore()
  if (food) R(x, food, cx - w * 0.2, cy - w * 0.1, w * 0.4, w * 0.12)
}
export function pie(x, cx, cy, w = 170, { slice = false } = {}) {
  box(x, cx - w / 2, cy - 30, w, 46, '#c98a3a', { b: 6, hi: '#e8b25a' })
  for (let i = 0; i < 5; i++) R(x, '#8a4a22', cx - w / 2 + 16 + i * (w - 32) / 4, cy - 26, 8, 30)
  R(x, '#e8b25a', cx - w / 2, cy - 40, w, 12)
  if (slice) R(x, '#7a2f3e', cx + w * 0.18, cy - 40, w * 0.3, 56)
}
export function roast(x, cx, cy) {
  plate(x, cx, cy + 20, 240)
  box(x, cx - 80, cy - 46, 160, 66, '#b5652e', { b: 6, hi: '#d88a46' })
  R(x, '#7fbf5a', cx - 96, cy + 4, 22, 14); R(x, '#7fbf5a', cx + 76, cy + 4, 22, 14)
}
export function candle(x, t, cx, base, h = 70) {
  box(x, cx - 9, base - h, 18, h, BONE, { b: 4 })
  const fl = 1 + 0.15 * Math.sin(t * 13 + cx)
  glow(x, cx, base - h - 16, 70, 0.25)
  R(x, INK, cx - 7, base - h - 30 * fl, 14, 26 * fl); R(x, '#ffcf5a', cx - 4, base - h - 26 * fl, 8, 20 * fl); R(x, '#fff5d0', cx - 2, base - h - 16 * fl, 4, 9 * fl)
}
export function gift(x, cx, cy, w, h, col = RED, rib = GOLD, { rot = 0 } = {}) {
  x.save(); x.translate(cx, cy); x.rotate(rot)
  box(x, -w / 2, -h / 2, w, h, col, { b: 6, hi: 'rgba(255,255,255,0.18)' })
  R(x, rib, -w * 0.08, -h / 2, w * 0.16, h); R(x, rib, -w / 2, -h * 0.1, w, h * 0.2)
  drawBits(x, ['RR...RR', 'RRR.RRR', '.RRRRR.', '...R...'], { R: rib }, 0, -h / 2 - Math.min(w, h) * 0.08, Math.max(3, Math.min(w, h) * 0.06))
  x.restore()
}
export function phone(x, t, cx, cy, w, h, { title = '', msgs = [], typing = null, rot = 0, scroll = 0, size = 30 } = {}) {
  x.save(); x.translate(cx, cy); x.rotate(rot)
  box(x, -w / 2, -h / 2, w, h, '#2a2148', { b: 8 })
  R(x, '#14102a', -w / 2 + 14, -h / 2 + 40, w - 28, h - 70)
  R(x, '#3a2f60', -w / 2 + 14, -h / 2 + 40, w - 28, 54)
  x.font = `700 ${Math.round(size * 0.85)}px ${MONO}`; x.fillStyle = BONE; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(title, 0, -h / 2 + 67)
  x.beginPath(); x.rect(-w / 2 + 14, -h / 2 + 96, w - 28, h - 126); x.clip()
  let y = -h / 2 + 120 - scroll
  x.font = `700 ${size}px ${INTER}`
  const maxW = w - 110
  for (const m of msgs) {
    if (t < m.at) continue
    const k = pop01(t, m.at, 0.22, 2.2)
    const words = m.text.split(' '), rows = []; let cur = ''
    for (const wd of words) { const tr = cur ? cur + ' ' + wd : wd; if (x.measureText(tr).width > maxW && cur) { rows.push(cur); cur = wd } else cur = tr }
    rows.push(cur)
    const bw = Math.max(...rows.map(r => x.measureText(r).width)) + 34, bh = rows.length * (size + 8) + 22
    const bx = m.side === 'R' ? w / 2 - 30 - bw : -w / 2 + 30
    x.save(); x.globalAlpha = clamp(k) * (m.gone && t > m.gone ? 1 - prog(t, m.gone, m.gone + 0.25) : 1)
    const col = m.col || (m.side === 'R' ? '#4f7cd8' : '#3a3358')
    R(x, INK, bx - 4, y - 4, bw + 8, bh + 8); R(x, col, bx, y, bw, bh)
    x.fillStyle = m.strike && t > m.strike ? 'rgba(239,230,214,0.45)' : BONE; x.textAlign = 'left'; x.textBaseline = 'top'
    rows.forEach((r, i) => x.fillText(r, bx + 17, y + 13 + i * (size + 8)))
    if (m.strike && t > m.strike) { const sp = prog(t, m.strike, m.strike + 0.3); R(x, RED, bx + 8, y + bh / 2 - 3, (bw - 16) * sp, 6) }
    x.restore()
    y += (bh + 18) * clamp(k * 1.3)
  }
  if (typing && t > typing[0] && t < typing[1]) {
    R(x, INK, -w / 2 + 26, y - 4, 108, 56); R(x, '#3a3358', -w / 2 + 30, y, 100, 48)
    for (let i = 0; i < 3; i++) { const b = Math.sin(t * 10 - i * 0.8) > 0 ? -5 : 0; R(x, BONE, -w / 2 + 48 + i * 26, y + 18 + b, 12, 12) }
  }
  x.restore()
}

function porchBack(x, t, o) {
  // night sky through the top, siding, the door, porch light, snow
  const g = x.createLinearGradient(0, ROOM.y, 0, FLOOR); g.addColorStop(0, '#1a1640'); g.addColorStop(1, '#2c2660'); x.fillStyle = g; x.fillRect(ROOM.x, ROOM.y, ROOM.w, FLOOR - ROOM.y)
  for (let i = 0; i < 9; i++) R(x, i % 2 ? '#5b4a7a' : '#544470', ROOM.x, ROOM.y + 120 + i * 80, ROOM.w, 80)
  for (let i = 0; i < 9; i++) R(x, 'rgba(0,0,0,0.25)', ROOM.x, ROOM.y + 196 + i * 80, ROOM.w, 6)
  // roof edge with icicles and pixel lights
  R(x, INK, ROOM.x, ROOM.y + 100, ROOM.w, 26); R(x, '#e9eef9', ROOM.x, ROOM.y + 92, ROOM.w, 18)
  for (let i = 0; i < 20; i++) { const lx = ROOM.x + 26 + i * 50; R(x, INK, lx - 8, ROOM.y + 130, 16, 18); R(x, Math.sin(t * 3 + i) > 0 ? [GOLD, PINK, SKYB, MINT][i % 4] : '#3a2f50', lx - 5, ROOM.y + 132, 10, 12) }
  door(x, t, o.doorX ?? 540, FLOOR, { open: o.open ? o.open(t) : 0 })
  // porch light
  const lx = (o.doorX ?? 540) + 190
  box(x, lx - 20, FLOOR - 470, 40, 56, '#ffd98a', { b: 6 }); glow(x, lx, FLOOR - 440, 220, 0.3)
  windowSnow(x, t, (o.doorX ?? 540) - 330, FLOOR - 300, 200, 230, { moon: false })
}
function porchFront(x, t) {
  R(x, '#e9eef9', ROOM.x, FLOOR, ROOM.w, ROOM.y + ROOM.h - FLOOR); R(x, INK, ROOM.x, FLOOR - 4, ROOM.w, 8)
  R(x, '#cfd8ee', ROOM.x, FLOOR + 40, ROOM.w, 10)
  box(x, 300, FLOOR + 8, 480, 30, '#8c86a8', { b: 5 })
  for (let i = 0; i < 18; i++) { const sx = ROOM.x + ((i * 131.7 + Math.sin(t + i) * 30) % ROOM.w + ROOM.w) % ROOM.w, sy = ROOM.y + (((t * (50 + (i % 4) * 12) + i * 71) % (ROOM.h)) + ROOM.h) % ROOM.h; R(x, 'rgba(255,255,255,0.8)', sx, sy, 7, 7) }
}
function livingBack(x, t, o) {
  wall(x, o.wall || 'warm'); floorWood(x)
  windowSnow(x, t, o.winX ?? 250, 700, 260, 300)
  if (o.tree !== false) tree(x, t, o.treeX ?? 880, FLOOR + 10, 520)
  if (o.frames !== false) { frameOnWall(x, 560, 580, 120, 100, '#7fd0ff'); frameOnWall(x, 700, 560, 90, 120, '#ff8fb1') }
  if (o.lamp) lamp(x, t, o.lamp, FLOOR)
  if (o.couch !== false) couch(x, o.couchX ?? 540, FLOOR - 4, o.couchW ?? 470, o.couchCol)
  glow(x, 540, 800, 700, 0.12)
}
function tableBack(x, t, o) {
  wall(x, o.wall || 'rose'); floorWood(x)
  windowSnow(x, t, 220, 640, 220, 260)
  frameOnWall(x, 560, 600, 130, 110, '#9fe6b0'); frameOnWall(x, 800, 620, 110, 140, '#c9a6ff')
  // pendant lamp
  R(x, INK, 540 - 3, ROOM.y, 6, 120); box(x, 470, ROOM.y + 120, 140, 50, '#ffd98a', { b: 6 }); glow(x, 540, ROOM.y + 170, 520, 0.25)
}
function tableFront(x, t, o) {
  const top = o.tableY ?? 1130
  box(x, 70, top, 940, 40, '#f3e9d6', { b: 7 })
  R(x, '#c94a5a', 70, top + 40, 940, 180); R(x, INK, 70, top + 40, 940, 6)
  for (let i = 0; i < 12; i++) R(x, '#b23e4e', 90 + i * 78, top + 60, 30, 160)
  if (o.dishes !== false) {
    const rx = o.roastX ?? 540
    roast(x, rx, top - 10)
    for (const [px, c] of (o.plates || [[230, '#e8b25a'], [850, '#7fbf5a']])) plate(x, px, top + 14, 120, c)
    for (const cx of (o.candles || [380, 700])) candle(x, t, cx, top + 6)
  }
}
function kitchenBack(x, t, o) {
  wall(x, o.wall || 'teal', false)
  for (let j = 0; j < 9; j++) for (let i = 0; i < 12; i++) R(x, (i + j) % 2 ? '#2f5878' : '#2b5070', ROOM.x + i * 84, 880 + j * 40, 84, 40)
  // upper cabinets
  for (let i = 0; i < 4; i++) box(x, 90 + i * 240, ROOM.y + 40, 200, 230, '#e9dcc6', { b: 6, lo: 'rgba(0,0,0,0.12)' })
  windowSnow(x, t, 540, 780, 220, 180, { moon: true })
  R(x, '#2a2240', ROOM.x, FLOOR + 140, ROOM.w, ROOM.y + ROOM.h - FLOOR - 140)
}
function kitchenFront(x, t, o) {
  const top = o.counterY ?? 1150
  box(x, ROOM.x + 10, top, ROOM.w - 20, 30, '#d8cfc0', { b: 6 })
  R(x, '#e9dcc6', ROOM.x + 10, top + 36, ROOM.w - 20, ROOM.y + ROOM.h - top - 46)
  for (let i = 0; i < 5; i++) { R(x, INK, ROOM.x + 20 + i * 196, top + 36, 6, 400); R(x, INK, ROOM.x + 120 + i * 196, top + 90, 30, 10) }
  if (o.stove !== false) {
    const sx = o.stoveX ?? 820
    box(x, sx - 120, top - 12, 240, 16, '#3a3358', { b: 5 })
    for (const [px, ph] of [[sx - 60, 90], [sx + 60, 70]]) { box(x, px - 50, top - 12 - ph, 100, ph, '#8c86a8', { b: 6, hi: '#aca6c8' }); R(x, INK, px - 64, top - 12 - ph + 14, 14, 10); puff(x, t, px, top - 12 - ph - 10, 0, { n: 3, size: 22 }) }
  }
  if (o.sink !== false) {
    const kx = o.sinkX ?? 240
    box(x, kx - 110, top - 8, 220, 14, '#aab4c8', { b: 5 })
    R(x, INK, kx - 6, top - 90, 12, 84); R(x, INK, kx - 6, top - 96, 50, 12)
  }
}
function guestBack(x, t, o) {
  wall(x, o.wall || 'plum'); floorWood(x, '#4a3346')
  windowSnow(x, t, 860, 650, 200, 240)
  frameOnWall(x, 540, 560, 260, 170, '#9fd8f6', (x, cx, cy) => { for (let i = 0; i < 5; i++) drawPixelStar(x, cx - 90 + i * 45, cy + 10 + (i % 2) * -12, 34, 2, [GOLD, PINK, SKYB, MINT, LAV][i]) })
  lamp(x, t, 180, FLOOR - 120, 190, { on: o.lampOn ? o.lampOn(t) : 1 })
  box(x, 120, FLOOR - 120, 120, 120, '#6b4a2f', { b: 6 })
  // headboard + pillows (the bed's back half)
  box(x, 300, 880, 480, 220, '#7a5a8a', { b: 7, hi: 'rgba(255,255,255,0.14)' })
  const n = o.pillows ?? 9
  for (let i = 0; i < n; i++) { const px = 320 + (i % 5) * 92 + (i >= 5 ? 46 : 0), py = 1010 - (i >= 5 ? 50 : 0) + (o.slide ? o.slide(t, i) : 0); box(x, px, py, 84, 60, [BONE, '#ffd0de', '#cfe4ff', '#e6d6ff'][i % 4], { b: 5 }) }
}
function guestFront(x, t) {
  box(x, 280, 1100, 520, 150, '#c9a6ff', { b: 7, hi: 'rgba(255,255,255,0.2)' })
  for (let i = 0; i < 6; i++) R(x, 'rgba(255,255,255,0.18)', 300 + i * 86, 1130, 40, 40)
  R(x, INK, 290, 1250, 20, 40); R(x, INK, 770, 1250, 20, 40)
  void t
}
function carBack(x, t, o) {
  // windshield view: night road rushing toward us
  const g = x.createLinearGradient(0, ROOM.y, 0, 960); g.addColorStop(0, '#0f0c2c'); g.addColorStop(1, '#2a2660'); x.fillStyle = g; x.fillRect(ROOM.x, ROOM.y, ROOM.w, ROOM.h)
  for (let i = 0; i < 30; i++) R(x, 'rgba(255,255,255,0.6)', ROOM.x + (i * 137) % ROOM.w, ROOM.y + 20 + (i * 71) % 300, 4, 4)
  R(x, '#1d1a3c', ROOM.x, 900, ROOM.w, ROOM.y + ROOM.h - 900)
  x.fillStyle = '#2e2a52'; x.beginPath(); x.moveTo(500, 900); x.lineTo(580, 900); x.lineTo(1000, 1360); x.lineTo(80, 1360); x.closePath(); x.fill()
  const sp = o.speed ?? 1
  for (let i = 0; i < 6; i++) { const p = ((t * 0.6 * sp + i / 6) % 1); const yy = 900 + p * p * 460, ww = 6 + p * 26, hh = 10 + p * 60; R(x, GOLD, 540 - ww / 2, yy, ww, hh) }
  for (const d of [-1, 1]) for (let i = 0; i < 3; i++) { const p = ((t * 0.35 * sp + i / 3 + (d > 0 ? 0.5 : 0)) % 1); const px = 540 + d * (40 + p * p * 700), py = 900 - 40 - p * 300, s = 0.3 + p * 1.4; R(x, INK, px - 4 * s, py, 8 * s, 300 * p + 40); box(x, px - 18 * s, py - 14 * s, 36 * s, 16 * s, '#ffe9a8', { b: 3 }); glow(x, px, py, 120 * s, 0.25) }
  if (o.snow) for (let i = 0; i < 24; i++) { const p = ((t * 0.5 + i / 24) % 1); R(x, 'rgba(255,255,255,0.8)', 540 + (((i * 0.37) % 1) * 2 - 1) * p * 700, 700 + Math.sin(i) * 200 * p, 4 + p * 8, 4 + p * 8) }
  // the roof and pillars
  R(x, '#141028', ROOM.x, ROOM.y, ROOM.w, 70); R(x, '#141028', ROOM.x, ROOM.y, 60, ROOM.h); R(x, '#141028', ROOM.x + ROOM.w - 60, ROOM.y, 60, ROOM.h)
  box(x, 470, ROOM.y + 70, 140, 40, '#3a3358', { b: 5 })
  // the seats' headrests
  for (const sx of [320, 760]) box(x, sx - 120, 940, 240, 300, '#3a3358', { b: 7, hi: 'rgba(255,255,255,0.08)' })
}
function carFront(x, t, o) {
  // dashboard + steering wheel (left)
  box(x, ROOM.x, 1230, ROOM.w, ROOM.y + ROOM.h - 1240, '#2a2148', { b: 7, hi: 'rgba(255,255,255,0.08)' })
  box(x, 470, 1260, 140, 60, '#14102a', { b: 5 }); label(x, o.clock || '10:42', 540, 1290, { size: 32, col: MINT })
  const wx = 320, wy = 1180
  x.save(); x.lineWidth = 34; x.strokeStyle = INK; x.beginPath(); x.ellipse(wx, wy, 150, 70, 0, Math.PI * 1.05, Math.PI * 1.95); x.stroke()
  x.lineWidth = 22; x.strokeStyle = '#4a4070'; x.beginPath(); x.ellipse(wx, wy, 150, 70, 0, Math.PI * 1.05, Math.PI * 1.95); x.stroke(); x.restore()
  void t
}
function streetBack(x, t, o) {
  const g = x.createLinearGradient(0, ROOM.y, 0, FLOOR); g.addColorStop(0, '#120f33'); g.addColorStop(1, '#2c2660'); x.fillStyle = g; x.fillRect(ROOM.x, ROOM.y, ROOM.w, ROOM.h)
  R(x, '#fff3c8', 860, ROOM.y + 60, 50, 50); R(x, '#120f33', 878, ROOM.y + 52, 42, 42)
  const scroll = (o.scroll ? o.scroll(t) : 0)
  for (let i = -1; i < 5; i++) {
    const hx = ((i * 290 - scroll) % 1450 + 1450) % 1450 - 200, hh = 260 + (i % 3) * 50
    box(x, hx, FLOOR - hh, 230, hh, ['#4a3a6a', '#3d3a62', '#53406e'][((i % 3) + 3) % 3], { b: 6 })
    x.fillStyle = INK; x.beginPath(); x.moveTo(hx - 20, FLOOR - hh); x.lineTo(hx + 115, FLOOR - hh - 100); x.lineTo(hx + 250, FLOOR - hh); x.closePath(); x.fill()
    x.fillStyle = '#e9eef9'; x.beginPath(); x.moveTo(hx - 6, FLOOR - hh - 4); x.lineTo(hx + 115, FLOOR - hh - 88); x.lineTo(hx + 236, FLOOR - hh - 4); x.closePath(); x.fill()
    for (let k = 0; k < 2; k++) { R(x, INK, hx + 30 + k * 110, FLOOR - hh + 50, 66, 70); R(x, '#ffd98a', hx + 36 + k * 110, FLOOR - hh + 56, 54, 58) }
    for (let k = 0; k < 6; k++) R(x, Math.sin(t * 3 + k + i) > 0 ? [GOLD, PINK, SKYB][k % 3] : '#3a2f50', hx + 10 + k * 38, FLOOR - hh + 12, 10, 10)
  }
  for (let i = 0; i < 3; i++) { const lx = ((i * 420 - scroll * 1.3) % 1260 + 1260) % 1260 - 100; R(x, INK, lx - 7, FLOOR - 420, 14, 420); box(x, lx - 28, FLOOR - 450, 56, 30, '#ffe9a8', { b: 5 }); glow(x, lx, FLOOR - 300, 260, 0.2) }
  R(x, '#e9eef9', ROOM.x, FLOOR, ROOM.w, ROOM.y + ROOM.h - FLOOR); R(x, INK, ROOM.x, FLOOR - 4, ROOM.w, 8)
  for (let i = 0; i < 26; i++) { const sx = ROOM.x + ((i * 97.3 + Math.sin(t * 0.7 + i) * 18) % ROOM.w + ROOM.w) % ROOM.w, sy = ROOM.y + (((t * (50 + (i % 5) * 9) + i * 53) % ROOM.h) + ROOM.h) % ROOM.h; R(x, 'rgba(255,255,255,0.85)', sx, sy, 7, 7) }
}
function deskBack(x, t, o) {
  wall(x, o.wall || 'olive'); floorWood(x)
  windowSnow(x, t, 780, 660, 280, 300)
  if (o.lamp !== false) lamp(x, t, 200, 1100, 200)
  frameOnWall(x, 460, 600, 140, 110, '#ffd0de')
}
function deskFront(x, t) {
  box(x, ROOM.x + 20, 1100, ROOM.w - 40, 40, '#8a5a3a', { b: 7, hi: '#a8704a' })
  R(x, '#6b4a2f', ROOM.x + 60, 1146, 30, 220); R(x, '#6b4a2f', ROOM.x + ROOM.w - 90, 1146, 30, 220)
  // a mug
  box(x, 860, 1040, 60, 60, PINK, { b: 5 }); R(x, INK, 922, 1056, 16, 28); puff(x, t, 890, 1030, 0, { n: 3, size: 16, rise: 90 })
}
export const ROOMS = {
  porch: { back: porchBack, front: porchFront },
  living: { back: livingBack, front: null },
  table: { back: tableBack, front: tableFront },
  kitchen: { back: kitchenBack, front: kitchenFront },
  guest: { back: guestBack, front: guestFront },
  car: { back: carBack, front: carFront },
  street: { back: streetBack, front: null },
  desk: { back: deskBack, front: deskFront },
}
function roomFrame(x, t) {
  // ink border + a soft warm rim glow, rounded stepped corners
  const { x: X, y: Y, w, h } = ROOM, b = 10
  R(x, INK, X - b, Y - b, w + 2 * b, b); R(x, INK, X - b, Y + h, w + 2 * b, b); R(x, INK, X - b, Y, b, h); R(x, INK, X + w, Y, b, h)
  R(x, 'rgba(255,180,94,0.55)', X, Y, w, 4); R(x, 'rgba(255,180,94,0.35)', X, Y + h - 4, w, 4)
  for (const [cx, cy] of [[X, Y], [X + w - 12, Y], [X, Y + h - 12], [X + w - 12, Y + h - 12]]) R(x, INK, cx, cy, 12, 12)
  void t
}

// ══════════════════════════════════════════════════════════════ the bug and the notes card (DOM)
function buildBug(root, at) {
  const b = el('div', { position: 'absolute', left: '56px', top: '56px', height: '44px', display: 'none', alignItems: 'center', gap: '14px', transformOrigin: '0% 50%', pointerEvents: 'none' }, root)
  // a tiny pixel house
  const ic = el('canvas', { width: '28px', height: '28px', imageRendering: 'pixelated' }, b)
  ic.width = 7; ic.height = 7
  { const c = ic.getContext('2d'); ['...A...', '..AAA..', '.AAAAA.', 'AAAAAAA', '.ABBBA.', '.ABWBA.', '.ABWBA.'].forEach((r, j) => [...r].forEach((ch, i) => { if (ch === '.') return; c.fillStyle = ch === 'A' ? AMBER : ch === 'W' ? '#ffd98a' : '#7a3f2a'; c.fillRect(i, j, 1, 1) })) }
  el('div', { font: `800 28px ${INTER}`, letterSpacing: '0.22em', color: AMBER, textShadow: '0 2px 12px rgba(6,4,18,0.9)', whiteSpace: 'nowrap', fontVariant: 'small-caps' }, b, 'MEET&nbsp;THE<span style="color:rgba(255,255,255,0.62)">&nbsp;FAMILY</span>')
  return {
    update(t, out = 1) {
      const k = (t < at ? 1 : 1) * out
      b.style.display = k <= 0.01 ? 'none' : 'flex'
      b.style.opacity = String(clamp(k * 2) * out)
    },
  }
}
const acc = (s, col) => s.replace(/\*([^*]+)\*/g, `<span style="font:italic 500 1.24em ${SERIF};color:${col};letter-spacing:0">$1</span>`)
function buildNotes(root, { t0, t1, tips, rowsAt, accent }) {
  const wrap = el('div', { position: 'absolute', left: '80px', top: '420px', width: '920px', display: 'none', pointerEvents: 'none', transformOrigin: '50% 0%' }, root)
  const card = el('div', { position: 'relative', background: '#f6eedd', border: `7px solid ${INK}`, borderRadius: '10px', boxShadow: '12px 12px 0 rgba(6,4,18,0.7)', padding: '78px 40px 30px 34px',
    backgroundImage: 'repeating-linear-gradient(0deg, rgba(27,18,54,0) 0 62px, rgba(127,170,230,0.35) 62px 64px)' }, wrap)
  el('div', { position: 'absolute', left: '-7px', top: '-30px', padding: '10px 26px', background: INK, borderRadius: '8px', font: `700 32px ${MONO}`, letterSpacing: '0.14em', color: GOLD, whiteSpace: 'nowrap' }, card, '★ THE STARS’ NOTES')
  el('div', { position: 'absolute', left: '70px', top: '0', bottom: '0', width: '4px', background: 'rgba(232,52,78,0.45)' }, card)
  const rows = tips.map((tx, i) => {
    const r = el('div', { display: 'flex', alignItems: 'center', gap: '24px', margin: '0 0 22px 0', opacity: '0' }, card)
    el('div', { flex: '0 0 auto', width: '68px', height: '68px', borderRadius: '50%', background: [GOLD, PINK, MINT][i], border: `5px solid ${INK}`, display: 'grid', placeItems: 'center', font: `800 38px ${INTER}`, color: INK }, r, String(i + 1))
    el('div', { font: `800 46px ${INTER}`, lineHeight: '1.1', color: INK, letterSpacing: '-0.01em' }, r, acc(tx, accent))
    return r
  })
  return {
    update(t) {
      const on = t >= t0 && t < t1
      wrap.style.display = on ? 'block' : 'none'
      if (!on) return
      const k = easeOutBack(prog(t, t0, t0 + 0.4), 1.8), o = outK(t, [t1 - 0.3, t1])
      wrap.style.opacity = String(clamp(prog(t, t0, t0 + 0.12)) * o)
      wrap.style.transform = `translateY(${((1 - k) * -120 + (1 - o) * 40).toFixed(1)}px) rotate(${(-1.2 + 1.2 * k).toFixed(2)}deg)`
      rows.forEach((r, i) => {
        const p = prog(t, rowsAt[i], rowsAt[i] + 0.3)
        r.style.opacity = String(clamp(p * 2))
        r.style.transform = `translateX(${((1 - ease.outBack(p)) * -60).toFixed(1)}px) scale(${lerp(0.85, 1, ease.outCubic(p)).toFixed(3)})`
      })
    },
  }
}

// ═══════════════════════════════════════════════════════════════════════ the episode
export function makeFamily(cfg) {
  const accent = cfg.accent || AMBER
  // timeline: beats back to back from 0
  let acc0 = 0
  const B = cfg.beats.map((b, i) => { const t0 = r3(acc0); acc0 += b.len; return { ...b, i, t0, t1: r3(acc0), kind: b.kind || 'scene' } })
  const STORY_END = r3(acc0)
  const DURATION = r3(STORY_END + ENDCARD_SHORT_LEN)
  const NB = B.find(b => b.kind === 'notes')
  const CUT = NB ? NB.t0 : null
  const CAST = cfg.cast
  const nameOf = who => {
    if (who === 'stars') return 'THE STARS'
    const c = CAST[who], s = signStar(c.sign)
    return `${s.glyph}︎ ${c.role || c.sign.toUpperCase()}`
  }
  const colOf = who => who === 'stars' ? undefined : (CAST[who].text || '#ffe7a8')
  const linesOf = b => (b.lines || []).map(L => ({ t: r3(b.t0 + L.u), speaker: nameOf(L.who), color: colOf(L.who), text: L.text }))
  if (B.length) {
    const last = B[B.length - 1]
    if (last.last) last.lines = [...(last.lines || []), { u: last.lastU ?? 0.9, who: 'stars', text: last.last }]
  }
  const ALL_LINES = B.flatMap(linesOf)
  const notesRows = NB ? [0.75, 0.75 + (NB.len - 1.6) / 3, 0.75 + 2 * (NB.len - 1.6) / 3].map(u => r3(NB.t0 + u)) : []
  const hopsFor = who => {
    const n = nameOf(who)
    return talkHops(ALL_LINES, n, { cps: CPS })
  }
  const STAR_HOPS = hopsFor('stars')

  function drawCast(x, t, key, o = {}) {
    const c = CAST[key], s = signStar(c.sign)
    const hops = [...(o.hops || []), ...hopsFor(key)]
    const opts = { color: s.color, glyph: o.s >= 150 && o.glyph !== false ? s.glyph : null, seed: c.seed ?? (key.length * 3 + 1), glow: 1, ...o, hops }
    drawStarChar(x, o.x, o.y, o.s, t, opts)
    const F = starFrame(o.x, o.y, o.s, t, opts)
    inSprite(x, F, () => { accCells(x, t, { ...(c.acc || {}), ...(o.acc || {}) }); if (o.tears) tearsCells(x, t, o.tears) })
    return F
  }
  function drawStars(x, t, o = {}) {
    const opts = { color: STAR.sky, mood: 'happy', seed: 2, glow: 1.05, ...o, hops: [...(o.hops || []), ...STAR_HOPS] }
    drawStarChar(x, o.x, o.y, o.s, t, opts)
    return starFrame(o.x, o.y, o.s, t, opts)
  }
  function drawPisces(x, t, o = {}) {
    const s = signStar('pisces')
    const opts = { color: s.color, glyph: o.s >= 150 ? s.glyph : null, mood: o.mood || 'sparkle', look: o.look || [-1, -0.6], seed: 6, glow: 0.85, pop: o.pop ?? 1, hops: o.hops, tips: false }
    drawStarChar(x, o.x, o.y, o.s, t, opts)
    const F = starFrame(o.x, o.y, o.s, t, opts)
    inSprite(x, F, () => { if (o.acc) accCells(x, t, o.acc); tearsCells(x, t, o.tears ?? 2) })
    return F
  }
  function tissues(x, cx, cy, s) {
    box(x, cx - s / 2, cy - s * 0.3, s, s * 0.6, '#9fd8f6', { b: 4, hi: '#c9ecfb' })
    R(x, INK, cx - s * 0.18 - 4, cy - s * 0.3 - 4, s * 0.36 + 8, 8)
    R(x, '#ffffff', cx - s * 0.12, cy - s * 0.3 - s * 0.32, s * 0.24, s * 0.34)
  }

  async function build(stage) {
    try {
      await Promise.all(["800 112px Inter", "800 46px Inter", "800 28px Inter", "700 30px Inter", "italic 500 150px 'EB Garamond'", "italic 500 57px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 26px 'Space Mono'"].map(f => document.fonts.load(f)))
    } catch (_) { /* fonts optional */ }
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const heads = B.filter(b => b.head).map(b => ({
      b, H: popText(root, b.head, { top: 168, size: b.headSize || 88, accentSize: b.accentSize || 122, at: b.i === 0 ? -3 : b.t0 + 0.12, gap: 0.08, accentColor: b.accent || accent, fit: true, wobble: true }),
      out: [b.t1 - 0.2, b.t1],
    }))
    const notes = NB ? buildNotes(root, { t0: NB.t0, t1: NB.t1, tips: NB.tips, rowsAt: notesRows, accent: cfg.notesAccent || '#c4482c' }) : null
    const boxes = B.filter(b => (b.lines || []).length).map(b => {
      const L = linesOf(b)
      const close = b === B[B.length - 1] ? STORY_END - 0.45 : b.t1 - 0.22
      return dialogueBox(root, { lines: L, y: 1408, open: L[0].t - 0.22, close, cps: CPS, size: 48 })
    })
    const LB = B.find(b => b.kind === 'lesson')
    const lesson = LB ? buildLesson(root, { at: LB.t0 + 0.1, out: [LB.t1 - 0.25, LB.t1], text: LB.text, chip: LB.chip, accentColor: LB.accent || accent, dim: 0.5 }) : null
    const bug = buildBug(root, 0)
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
    const flash = el('div', { position: 'absolute', inset: 0, background: '#fff6ea', opacity: 0, pointerEvents: 'none' }, root)

    function beatAt(t) { for (const b of B) if (t >= b.t0 && t < b.t1) return b; return B[B.length - 1] }

    return {
      start: 0, end: STORY_END + 0.01, root,
      update(t) {
        drawSky(x, t, SKY_H)
        const b = beatAt(t)
        const u = t - b.t0
        const outAll = popOut(t, [STORY_END - 0.42, STORY_END - 0.02])
        const S = { u, t0: b.t0, t1: b.t1, B, out: outAll, cast: drawCast, stars: drawStars, pisces: drawPisces, tissues, shake: 0 }
        // the room: the beat's own, or the previous scene's (notes / lesson keep the room behind them)
        let rb = b
        if (!rb.room) for (let j = b.i; j >= 0; j--) if (B[j].room) { rb = B[j]; break }
        const room = ROOMS[rb.room || 'living']
        const punch = b.kind === 'scene' && b.i > 0 ? 1 + 0.06 * (1 - ease.outCubic(prog(t, b.t0, b.t0 + 0.3))) : 1
        const rk = outAll
        if (rk > 0.01) {
          x.save()
          x.translate(540, 880); x.scale(punch * lerp(0.9, 1, rk), punch * lerp(0.9, 1, rk)); x.translate(-540, -880)
          x.globalAlpha = clamp(rk)
          x.save(); x.beginPath(); x.rect(ROOM.x, ROOM.y, ROOM.w, ROOM.h); x.clip()
          const ro = { ...(rb.roomOpts || {}) }
          room.back(x, t, ro)
          if (b.drawBack) b.drawBack(x, t, S)
          if (b.draw && b.kind === 'scene') b.draw(x, t, S)
          if (room.front) room.front(x, t, ro)
          if (b.drawFront) b.drawFront(x, t, S)
          // notes / lesson: the room dims behind the card and the cast stands in front of it
          if (b.kind !== 'scene') { x.fillStyle = 'rgba(8,5,20,0.42)'; x.fillRect(ROOM.x, ROOM.y, ROOM.w, ROOM.h); if (b.draw) b.draw(x, t, S) }
          x.restore()
          roomFrame(x, t)
          x.restore()
        }
        // Pisces' running gag: crying somewhere, every beat (unless the beat has Pisces in its own cast)
        if (b.pis !== false && outAll > 0.01) {
          const P = { x: 950, y: 1785, s: 135, ...(b.pis || {}) }
          const pk = (b.i === 0 ? 1 : pop01(t, b.t0 + 0.3, 0.3, 2)) * outK(t, [b.t1 - 0.15, b.t1]) * outAll
          if (pk > 0.01) {
            if (P.tissues !== false) tissues(x, P.x - P.s * 0.75, P.y + P.s * 0.28, P.s * 0.5)
            drawPisces(x, t, { ...P, pop: pk, tears: P.tears ?? (b.kind === 'scene' ? 2 : 3) })
          }
        }
        // THE STARS on the notes beat (bottom left, under the card) unless the beat draws them itself
        if (b.kind === 'notes' && b.starsAuto !== false) {
          const sk = pop01(t, b.t0 + 0.2, 0.35, 2) * outK(t, [b.t1 - 0.2, b.t1])
          drawStars(x, t, { x: 160, y: 1235, s: 170, pop: sk, mood: 'happy', look: [1, -1], hops: notesRows })
        }
        if (cfg.overlay) cfg.overlay(x, t, S)
        heads.forEach(({ b: hb, H, out }) => H.update(t, (t >= hb.t0 - (hb.i === 0 ? 9 : 0) && t < hb.t1) ? outK(t, out) : 0))
        if (notes) notes.update(t)
        boxes.forEach(bx => bx.update(t))
        if (lesson) lesson.update(t)
        bug.update(t, outK(t, [STORY_END - 0.3, STORY_END]))
        // white flash on hard cuts between scene beats
        let fl = 0
        for (const bb of B) if (bb.i > 0 && bb.kind === 'scene' && bb !== B.find(q => q.t0 === CUT) && t >= bb.t0 && t < bb.t0 + 0.12) fl = 1 - (t - bb.t0) / 0.12
        flash.style.opacity = String(0.5 * fl)
        drawGrain(gx, t)
      },
    }
  }

  // no card-back cut (owner's change, 4 Nov): the notes card drops in on its own whoosh; short 2.4 s end card
  const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, short: true }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl br' })]

  // ── sound
  const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
  const wordPops = (t0, n, gap, b0 = 0, gain = 0.024) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(b0 + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
  const words = s => s.replace(/\|/g, ' ').split(/\s+/).filter(Boolean).length
  const CUES = [
    ...B.flatMap(b => {
      const out = []
      if (b.head && b.i > 0) out.push(...wordPops(b.t0 + 0.12, Math.min(8, words(b.head)), 0.08, b.i))
      if (b.i > 0 && b.kind === 'scene') out.push(['whoosh', r3(b.t0 - 0.08), 0.28, 0.035], ['tick', b.t0, 0.05])
      if (b.pis !== false) out.push(['pluck', r3(b.t0 + 0.4), 2349.32, 0.012, 0.3, 0.6])
      out.push(...(b.cues || []).map(c => [c[0], r3(c[1] + b.t0), ...c.slice(2)]))
      return out
    }),
    ...(NB ? [['whoosh', NB.t0, 0.4, 0.04], ...notesRows.flatMap((rt, i) => [['pop', rt, NOTE[(i * 2 + 1) % 7], 0.045, -0.1], ['pop', r3(rt + 0.07), NOTE[(i * 2 + 3) % 7] * 2, 0.03, 0.1], ['tick', r3(rt + 0.02), 0.035]])] : []),
    ...(B.find(b => b.kind === 'lesson') ? (() => { const LB = B.find(b => b.kind === 'lesson'); return lessonCues(LB.t0 + 0.1, { text: LB.text, chip: LB.chip, key: cfg.key }) })() : []),
    ...talkCues(ALL_LINES, { cps: CPS }),
    ['whoosh', r3(STORY_END - 0.42), 0.35, 0.03],
    ...endcardCues(STORY_END, { short: true }),
  ]
  return { DURATION, STORY_END, SCENES, CUES, B, CUT }
}
