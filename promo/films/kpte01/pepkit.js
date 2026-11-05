// THE 10-SECOND PEP TALK: the shared format kit for kpte01–kpte20 (Month 2 boost, batch m14, star_advice posts).
// Every episode imports this file from kpte01 (other films never edit it). Rows: promo/films/month2/m14.md.
// No end card, no card transition, no logo: DURATION is the story. Hook effects come from ../hookkit.js (read-only).
//
// The short format (makePep, ~17–18 s):
//   0.0–3.0    THE GRAB: frame 0 is the best friend (the coach) mid-lunge into the lens, huge and tilted, speed lines,
//              the hook line already up; the listener behind mid-situation (cfg.hook draws the set + the listener + props),
//              Pisces sniffling in a corner. A pattern break at T.brk (cfg.brk: 'whip' | 'scratch' | 'flash' | 'glitch'
//              | 'shake'). The coach pulls back by 1.3; the premise chip ("for when …") pops at 1.15.
//   3.0–5.4    THE SPIRAL: a flash cut to the feeling (cfg.spiral draws it; cfg.bubbles add canvas bubbles).
//   5.4–15.4   THE PEP TALK: the 10-second stopwatch counts down; the coach says three short lines in the dialogue box
//              (cfg.lines), the listener perks up line by line (slump → wide → happy → sparkle); cfg.pep(x, t, S) adds
//              per-line props (S.i = the current line, S.ui = time since it started). DING at 15.4.
//   15.4–end   THE LAST LINE: big type (cfg.last), the listener glowing, the coach happy, Pisces in happy-tear fountains.
//              cfg.end 'cut' (hard cut, ~1 s hold) or 'loop' (the last 0.45 s eases back into the frame-0 composition).
//
// makePep(cfg) → { DURATION, SCENES, CUES, T }
//   cfg.id · cfg.sign (listener) · cfg.coach (sign id of the friend) · cfg.hookLine '…' (≤ 7 words, | = break, *x* accent)
//   cfg.premise 'for when you think | you’re *too much*' · cfg.lines [3 strings ≤ 45 chars] · cfg.last
//   cfg.hook(x, t, S) the frame-0 set + listener (S.L(x, t, o) draws the listener) · cfg.spiral(x, t, S) · cfg.pep(x, t, S)
//   cfg.fin(x, t, S) extra props in the last beat · cfg.bubbles [{ t0, t1, x, y, text, … }] · cfg.cues extra sound
//   cfg.pis { x, y, s } Pisces' corner in the grab/spiral (default bottom right) · cfg.end 'cut' | 'loop'
//   cfg.coachIsPisces / cfg.listenerIsPisces are worked out from the signs (then that star does the crying).
// makeLong(cfg) (in ./pepkit-long.js) builds the 60–90 s "full pep talk" episodes on the same pieces.
// Pure f(t); DOM and canvases only inside build().
import { clamp, lerp, prog, ease, el } from '../../src/lib.js'
import { fill } from '../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas, drawPixelStar } from '../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../wheel.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar, STAR } from '../startalk.js'
import { popText } from '../lesson.js'
import { whipZoom, whipZoomCues, recordScratch, recordScratchCues, frozen, slamTitle, slamTitleCues, screenShake, shakeCues, glitch, glitchCues, loopBack, loopCues } from '../hookkit.js'

export const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', LAV = '#c9a6ff', RED = '#e8344e', MINT = '#9fe6b0', SKYB = '#7fd0ff'
export const PEP = '#ff8a5c'          // the series colour (coral)
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const SERIF = "'EB Garamond', Georgia, serif"
export const MONO = "'Space Mono', ui-monospace, monospace"
export const r3 = v => +v.toFixed(3)
export const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
export const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
export { clamp, lerp, prog, ease, easeOutBack, drawStarChar, signStar, STAR, drawPixelStar, el, popText, dialogueBox, talkCues, talkHops, drawSky, drawGrain, layerCanvas, fill, SKY_H, GRAIN_H }
export const NAME = id => id === 'sagittarius' ? 'Sagittarius' : id[0].toUpperCase() + id.slice(1)
export const speaker = id => `${signStar(id).glyph}︎ ${id.toUpperCase()}`

// ── drawing helpers
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
export function confetti(x, t, t0, cx, cy, { n = 26, life = 2.2, cols = [GOLD, PINK, SKYB, MINT, BONE, PEP] } = {}) {
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
export function bubble(x, t, cx, cy, t0, t1, text, { col = BONE, ink: inkc = INK, size = 34, tail = 0, font = INTER, weight = 800, up = false, think = false } = {}) {
  const k = pop01(t, t0, 0.25, 2.4) * outK(t, [t1 - 0.15, t1])
  if (k <= 0.01 || t < t0 || t > t1) return
  x.font = `${weight} ${size}px ${font}`
  const w = x.measureText(text).width + 44, h = size + 32
  const ccx = clamp(cx, w / 2 + 34, 1080 - w / 2 - 34)
  tail = clamp(tail + (cx - ccx) / Math.max(1, w / 2 - 40), -1, 1)
  x.save(); x.translate(ccx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-w / 2 - 5, -h / 2, w + 10, h); x.fillRect(-w / 2, -h / 2 - 5, w, h + 10)
  x.fillStyle = col; x.fillRect(-w / 2, -h / 2, w, h)
  const tx = tail * (w / 2 - 40), sy = up ? -1 : 1
  if (think) {
    for (const [dx, dy, r] of [[0, h / 2 + 18, 9], [tail * 14, h / 2 + 40, 6]]) { x.fillStyle = INK; x.fillRect(tx + dx - r - 3, sy * dy - r - 3, 2 * r + 6, 2 * r + 6); x.fillStyle = col; x.fillRect(tx + dx - r, sy * dy - r, 2 * r, 2 * r) }
  } else if (up) {
    x.fillStyle = INK; x.fillRect(tx - 14, -h / 2 - 16, 14, 12); x.fillRect(tx - 7, -h / 2 - 22, 8, 8)
    x.fillStyle = col; x.fillRect(tx - 9, -h / 2 - 9, 9, 9)
  } else {
    x.fillStyle = INK; x.fillRect(tx - 14, h / 2 + 4, 14, 12); x.fillRect(tx - 7, h / 2 + 14, 8, 8)
    x.fillStyle = col; x.fillRect(tx - 9, h / 2, 9, 9)
  }
  x.fillStyle = inkc; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 2)
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
export function ink(x, text, cx, cy, { size = 26, col = INK, align = 'center', font = INTER, weight = 800, rot = 0, alpha = 1 } = {}) {
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot)
  x.font = `${weight} ${size}px ${font}`; x.textAlign = align; x.textBaseline = 'middle'; x.fillStyle = col; x.fillText(text, 0, 0)
  x.restore()
}
export function shadow(x, cx, cy, w, a = 0.35) { if (w <= 0) return; x.save(); x.globalAlpha = a; x.fillStyle = '#05030c'; x.beginPath(); x.ellipse(cx, cy, w / 2, w * 0.09, 0, 0, Math.PI * 2); x.fill(); x.restore() }
export function glow(x, cx, cy, r, a, col = '255,214,150') {
  if (a <= 0) return
  const g = x.createRadialGradient(cx, cy, 0, cx, cy, r); g.addColorStop(0, `rgba(${col},${a})`); g.addColorStop(1, `rgba(${col},0)`)
  x.fillStyle = g; x.fillRect(cx - r, cy - r, 2 * r, 2 * r)
}
/** a pixel stamp: a rotated ink-bordered label that slams in at t0 */
export function stamp(x, t, text, cx, cy, t0, { col = RED, size = 54, rot = -0.12, life = 99, bg = 'rgba(255,246,234,0.94)' } = {}) {
  const k = pop01(t, t0, 0.22, 3) * outK(t, [t0 + life - 0.15, t0 + life])
  if (k <= 0.01 || t < t0) return
  const s = lerp(1.8, 1, Math.min(1, k)) * Math.max(0.01, k)
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
  x.font = `800 ${size}px ${INTER}`
  const w = x.measureText(text).width + 50, h = size + 30
  R(x, INK, -w / 2 - 6, -h / 2 - 6, w + 12, h + 12); R(x, col, -w / 2, -h / 2, w, h); R(x, bg, -w / 2 + 7, -h / 2 + 7, w - 14, h - 14)
  x.fillStyle = col; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 3)
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
/** a sweat drop beside the sprite (cells) */
export function sweatCells(ctx, t) {
  const p = (t * 0.9) % 1
  ctx.fillStyle = INK; ctx.fillRect(30.4, 6 + p * 5, 2.4, 3.4); ctx.fillStyle = '#8fe3ff'; ctx.fillRect(30.8, 6.4 + p * 5, 1.6, 2.6)
}

// ═══════════════════════════════════════════ sets and props (shared look)
/** an interior at night: back wall, floor, an optional window with stars. Returns the floor y. */
export function room(x, t, { wall = '#2a2050', wall2 = '#241a46', floor = '#3a2a4a', floorY = 1420, win = { x: 640, y: 470, w: 300, h: 330 }, top = 380, alpha = 1, lamp = 0 } = {}) {
  x.save(); x.globalAlpha *= alpha
  R(x, wall, 0, top, 1080, floorY - top)
  for (let i = 0; i < 1080; i += 90) R(x, wall2, i, top, 44, floorY - top)
  R(x, 'rgba(5,4,12,0.35)', 0, top, 1080, 16)
  if (win) {
    box(x, win.x, win.y, win.w, win.h, '#0e0b26', { b: 10 })
    R(x, '#151040', win.x, win.y, win.w, win.h)
    for (let i = 0; i < 9; i++) drawPixelStar(x, win.x + 30 + ((i * 97) % (win.w - 60)), win.y + 30 + ((i * 61) % (win.h * 0.6)), 10, 1, i % 3 ? BONE : GOLD)
    x.fillStyle = '#efe6d6'; x.beginPath(); x.arc(win.x + win.w * 0.72, win.y + win.h * 0.3, 26, 0, Math.PI * 2); x.fill()
    x.fillStyle = '#151040'; x.beginPath(); x.arc(win.x + win.w * 0.72 + 12, win.y + win.h * 0.3 - 6, 22, 0, Math.PI * 2); x.fill()
    R(x, INK, win.x + win.w / 2 - 5, win.y, 10, win.h); R(x, INK, win.x, win.y + win.h / 2 - 5, win.w, 10)
    R(x, '#5a4a7a', win.x - 24, win.y + win.h + 10, win.w + 48, 18)
  }
  if (lamp > 0) { x.save(); x.globalCompositeOperation = 'lighter'; glow(x, 200, 760, 380, 0.16 * lamp); x.restore() }
  R(x, INK, 0, floorY - 6, 1080, 10)
  R(x, floor, 0, floorY + 4, 1080, 1920 - floorY)
  for (let j = 0; j < 4; j++) R(x, 'rgba(255,255,255,0.04)', 0, floorY + 40 + j * 90, 1080, 6)
  x.restore()
  return floorY
}
/** a bed seen from the side (mattress top at y) */
export function bed(x, cx, y, { w = 640, col = '#5a4a9a', sheet = '#c9b8f0', pillow = BONE } = {}) {
  box(x, cx - w / 2, y, w, 90, sheet, { b: 7, hi: 'rgba(255,255,255,0.25)' })
  box(x, cx - w / 2 - 30, y - 120, 40, 330, col, { b: 7 })
  box(x, cx + w / 2 - 10, y - 30, 40, 240, col, { b: 7 })
  R(x, INK, cx - w / 2, y + 96, w, 110); R(x, col, cx - w / 2 + 6, y + 100, w - 12, 100)
  box(x, cx - w / 2 + 30, y - 46, 150, 50, pillow, { b: 6 })
}
/** a sofa (seat at cy) */
export function couch(x, cx, cy, w = 560, col = '#6a4fa8') {
  box(x, cx - w / 2, cy - 170, w, 120, col, { b: 7, hi: 'rgba(255,255,255,0.12)' })
  box(x, cx - w / 2 + 20, cy - 60, w - 40, 70, col, { b: 7, hi: 'rgba(255,255,255,0.16)' })
  box(x, cx - w / 2 - 50, cy - 120, 60, 140, col, { b: 7 }); box(x, cx + w / 2 - 10, cy - 120, 60, 140, col, { b: 7 })
  R(x, INK, cx - w / 2 - 30, cy + 16, 18, 30); R(x, INK, cx + w / 2 + 12, cy + 16, 18, 30)
}
/** a table top with legs (top surface at y) */
export function table(x, cx, y, w = 640, col = '#6b4a2f') {
  box(x, cx - w / 2, y, w, 34, col, { b: 6, hi: '#8a6440' })
  R(x, INK, cx - w / 2 + 24, y + 40, 22, 160); R(x, INK, cx + w / 2 - 46, y + 40, 22, 160)
}
/** a mug with steam */
export function mug(x, t, cx, cy, { s = 1, col = '#e8344e', steam = true } = {}) {
  const w = 64 * s, h = 60 * s
  box(x, cx - w / 2, cy - h, w, h, col, { b: 5, hi: 'rgba(255,255,255,0.22)' })
  R(x, INK, cx + w / 2, cy - h * 0.75, 16 * s, 8 * s); R(x, INK, cx + w / 2 + 10 * s, cy - h * 0.75, 8 * s, 34 * s); R(x, INK, cx + w / 2, cy - h * 0.75 + 28 * s, 16 * s, 8 * s)
  if (steam) for (let i = 0; i < 3; i++) {
    const p = ((t * 0.7 + i / 3) % 1)
    x.save(); x.globalAlpha = 0.55 * Math.sin(Math.PI * p)
    R(x, BONE, cx - 14 * s + i * 14 * s + 6 * Math.sin(t * 3 + i), cy - h - 14 * s - p * 70 * s, 7 * s, 16 * s)
    x.restore()
  }
}
/** a sticky note / card with up to 3 lines of text (| = line break) */
export function note(x, cx, cy, text, { w = 220, h = 130, col = '#ffe27a', rot = 0, size = 30, k = 1, txt = INK } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  R(x, 'rgba(6,4,18,0.4)', -w / 2 + 10, -h / 2 + 12, w, h)
  box(x, -w / 2, -h / 2, w, h, col, { b: 5 })
  const lines = String(text).split('|')
  lines.forEach((l, i) => ink(x, l, 0, (i - (lines.length - 1) / 2) * size * 1.15, { size, col: txt }))
  x.restore()
}
/** a pixel tissue box */
export function tissues(x, cx, cy, s) {
  box(x, cx - s / 2, cy - s * 0.3, s, s * 0.6, '#9fd8f6', { b: 4, hi: '#c9ecfb' })
  R(x, INK, cx - s * 0.18 - 4, cy - s * 0.3 - 4, s * 0.36 + 8, 8)
  R(x, '#ffffff', cx - s * 0.12, cy - s * 0.3 - s * 0.32, s * 0.24, s * 0.34)
}
/** a flying tissue (for chaos) */
export function flyTissue(x, cx, cy, rot, s = 1) {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
  R(x, INK, -26, -20, 52, 40); R(x, '#ffffff', -22, -16, 44, 32); R(x, '#dfe8f4', -22, 6, 44, 10)
  x.restore()
}
/** a phone with a message thread: msgs [{ at, side: 'L'|'R', text, col }]; typing [a, b] shows the dots */
export function phone(x, t, { cx = 540, top = 520, w = 520, h = 760, title = '', msgs = [], typing = null, alpha = 1, rot = 0, size = 30, glowA = 0 } = {}) {
  x.save(); x.globalAlpha *= alpha; x.translate(cx, top + h / 2); x.rotate(rot); x.translate(-cx, -(top + h / 2))
  if (glowA > 0) { x.save(); x.globalCompositeOperation = 'lighter'; glow(x, cx, top + h / 2, h * 0.8, 0.18 * glowA, '160,200,255'); x.restore() }
  box(x, cx - w / 2, top, w, h, '#2a2148', { b: 8 })
  R(x, '#120e28', cx - w / 2 + 16, top + 70, w - 32, h - 100)
  R(x, INK, cx - 50, top + 22, 100, 14)
  x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = BONE; x.fillText(title, cx, top + 100)
  R(x, 'rgba(239,230,214,0.15)', cx - w / 2 + 16, top + 128, w - 32, 3)
  const shown = msgs.filter(m => t >= m.at)
  const maxW = w - 90
  x.font = `700 ${size}px ${INTER}`
  const wrap = s => { const out = []; let cur = ''; for (const wd of s.split(' ')) { const nx = cur ? cur + ' ' + wd : wd; if (x.measureText(nx).width > maxW - 36 && cur) { out.push(cur); cur = wd } else cur = nx } if (cur) out.push(cur); return out }
  let y = top + h - 60
  if (typing && t > typing[0] && t < typing[1]) {
    R(x, INK, cx - w / 2 + 30, y - 52, 116, 56); R(x, '#3a3170', cx - w / 2 + 34, y - 48, 108, 48)
    for (let i = 0; i < 3; i++) R(x, BONE, cx - w / 2 + 52 + i * 28, y - 30 - (Math.floor(t * 6 + i) % 3 === 0 ? 6 : 0), 14, 14)
    y -= 70
  }
  x.save(); x.beginPath(); x.rect(cx - w / 2 + 16, top + 132, w - 32, h - 162); x.clip()
  for (let i = shown.length - 1; i >= 0; i--) {
    const m = shown[i], L = wrap(m.text), bw = Math.min(maxW, Math.max(...L.map(l => x.measureText(l).width)) + 36), bh = L.length * size * 1.2 + 24
    const k = pop01(t, m.at, 0.22, 2.4)
    const bx = m.side === 'R' ? cx + w / 2 - 30 - bw : cx - w / 2 + 30
    const col = m.side === 'R' ? (m.col || '#5fa8ff') : (m.col || '#efe6d6')
    x.save(); x.translate(bx + (m.side === 'R' ? bw : 0), y); x.scale(k, k); x.translate(-(bx + (m.side === 'R' ? bw : 0)), -y)
    R(x, INK, bx - 4, y - bh - 4, bw + 8, bh + 8); R(x, col, bx, y - bh, bw, bh)
    x.fillStyle = m.side === 'R' ? '#ffffff' : INK; x.textAlign = 'left'; x.textBaseline = 'middle'
    L.forEach((l, j) => x.fillText(l, bx + 18, y - bh + 12 + size * 0.6 + j * size * 1.2))
    if (m.read) { x.font = `700 20px ${MONO}`; x.fillStyle = '#9a94b8'; x.textAlign = 'right'; x.fillText(m.read, bx + bw, y + 18); x.font = `700 ${size}px ${INTER}` }
    x.restore()
    y -= bh + (m.read ? 40 : 18)
  }
  x.restore()
  x.restore()
}
/** a wall clock / bedside clock showing a time string */
export function clockFace(x, cx, cy, text, { col = '#ff6b6b', w = 230 } = {}) {
  box(x, cx - w / 2, cy - 50, w, 100, '#120e28', { b: 7 })
  x.font = `700 54px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.save(); x.globalCompositeOperation = 'lighter'; glow(x, cx, cy, w * 0.7, 0.12, '255,107,107'); x.restore()
  x.fillStyle = col; x.fillText(text, cx, cy + 3)
}
/** radial speed lines around a focus (the lunge) */
export function speedLines(x, t, cx, cy, a, { n = 34, r0 = 380, r1 = 1500, col = 'rgba(239,230,214,0.5)', seed = 1 } = {}) {
  if (a <= 0.01) return
  x.save(); x.globalAlpha *= a; x.fillStyle = col
  for (let i = 0; i < n; i++) {
    const ang = (i / n) * Math.PI * 2 + 0.2 * Math.sin(i * 7.3 + seed)
    const j = Math.floor(t * 20 + i * 3) % 3
    const rr0 = r0 + 60 * j, len = 240 + 160 * ((i * 5) % 3)
    x.save(); x.translate(cx + Math.cos(ang) * rr0, cy + Math.sin(ang) * rr0); x.rotate(ang)
    x.fillRect(0, -4, len, 8 - (i % 2) * 3); x.restore()
    void r1
  }
  x.restore()
}

// ── the 10-second stopwatch (series signature)
export function stopwatch(x, t, cx, cy, t0, { dur = 10, r = 92, k = 1 } = {}) {
  if (k <= 0.01) return
  const left = clamp(dur - (t - t0), 0, dur)
  const ding = t >= t0 + dur
  const shakeX = ding && t < t0 + dur + 0.4 ? 8 * Math.sin((t - t0 - dur) * 70) * Math.exp(-(t - t0 - dur) * 8) : 0
  x.save(); x.translate(cx + shakeX, cy); x.scale(k, k)
  // button + crown
  R(x, INK, -22, -r - 44, 44, 34); R(x, ding ? RED : PEP, -16, -r - 38, 32, 24)
  R(x, INK, -10, -r - 14, 20, 18)
  x.save(); x.rotate(0.7); R(x, INK, -12, -r - 26, 24, 22); R(x, BONE, -8, -r - 22, 16, 14); x.restore()
  // body
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 10, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#fff6ea'; x.beginPath(); x.arc(0, 0, r, 0, Math.PI * 2); x.fill()
  // remaining arc (pixel wedge)
  const f = left / dur
  if (f > 0) {
    x.fillStyle = left <= 3 ? '#ff6b6b' : PEP
    x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, r - 10, -Math.PI / 2, -Math.PI / 2 + f * Math.PI * 2); x.closePath(); x.fill()
  }
  for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i / 10 * Math.PI * 2; x.save(); x.rotate(a); R(x, INK, r - 18, -3, 14, 6); x.restore() }
  // number
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r * 0.52, 0, Math.PI * 2); x.fill()
  x.font = `700 ${Math.round(r * 0.62)}px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillStyle = ding ? GOLD : BONE; x.fillText(ding ? '0' : String(Math.ceil(left - 1e-6)), 0, 4)
  x.restore()
  if (ding && t < t0 + dur + 0.9) {
    const p = prog(t, t0 + dur, t0 + dur + 0.9)
    label(x, 'DING!', cx - 10, cy + r + 52 + 0 * p, { size: 46 * (1 + 0.3 * (1 - p)), col: GOLD, font: INTER, weight: 800, alpha: 1 - ease.inQuad(p), rot: -0.08 })
  }
}

// ── the series bug: "THE 10-SECOND PEP TALK", Inter 800 small caps, letter-spaced, top-left 56 px
export function buildBug(root) {
  const b = el('div', { position: 'absolute', left: '56px', top: '56px', height: '44px', display: 'flex', alignItems: 'center', gap: '14px', transformOrigin: '0% 50%', pointerEvents: 'none' }, root)
  el('div', { width: '18px', height: '18px', background: PEP, boxShadow: `0 0 0 4px ${INK}, 0 0 16px rgba(255,138,92,0.7)` }, b)
  el('div', { font: `800 28px ${INTER}`, letterSpacing: '0.2em', color: PEP, textShadow: '0 2px 12px rgba(6,4,18,0.9)', whiteSpace: 'nowrap', fontVariant: 'small-caps' }, b, 'THE&nbsp;10-SECOND<span style="color:rgba(255,255,255,0.75)">&nbsp;PEP&nbsp;TALK</span>')
  return { update(t, k = 1) { b.style.display = k <= 0.01 ? 'none' : 'flex'; b.style.opacity = String(clamp(k)) } }
}
/** the premise chip ("for when …"): a coral pixel tag with DOM type */
export function premiseChip(root, text, { top = 470, at = 1.15 } = {}) {
  const wrap = el('div', { position: 'absolute', left: '0px', width: '1080px', top: top + 'px', display: 'none', justifyContent: 'center', pointerEvents: 'none' }, root)
  const c = el('div', { background: 'rgba(16,9,38,0.92)', border: `6px solid ${PEP}`, boxShadow: `0 0 0 5px ${INK}, 0 10px 30px rgba(6,4,18,0.7)`, padding: '14px 30px 16px', font: `800 46px ${INTER}`, color: BONE, textAlign: 'center', lineHeight: '1.12', maxWidth: '880px', transformOrigin: '50% 50%' }, wrap)
  c.innerHTML = String(text).replace(/\*(.+?)\*/g, `<span style="font-family:${SERIF};font-style:italic;font-weight:500;color:${PEP};font-size:1.25em">$1</span>`).replace(/\s*\|\s*/g, '<br>')
  return {
    update(t, out = 1) {
      const k = pop01(t, at, 0.3, 2.6) * out
      wrap.style.display = k <= 0.01 || t < at ? 'none' : 'flex'
      c.style.transform = `scale(${k.toFixed(4)}) rotate(${(-1.2).toFixed(1)}deg)`
      wrap.style.opacity = String(clamp(out * 1.5))
    },
  }
}

// ═══════════════════════════════════════════════════════════════════════ the short episode
export const ST = {
  brk: 0.42, coachBack: [0.95, 1.45], premise: 1.15, h0Out: [2.85, 3.0],
  spiral: [3.0, 5.4],
  pep: [5.4, 15.4], h2: 5.5, h2Out: [15.2, 15.4], lines: [5.75, 8.95, 12.15], box: [5.55, 15.3],
  last: [15.4, null], h3: 15.5, h3Late: 15.85,
}
const CPS = 30

export async function loadFonts() {
  try {
    await Promise.all(["800 112px Inter", "800 50px Inter", "800 46px Inter", "800 30px Inter", "800 28px Inter", "700 30px Inter", "italic 500 150px 'EB Garamond'", "italic 500 64px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 26px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
}

export function makePep(cfg) {
  const T = { ...ST }
  const loop = cfg.end === 'loop'
  const LOOP_LEN = 0.45
  // hard cut: the last line is fully up by h3Late + ~0.4, then holds ~1 s · loop: the same hold, then 0.45 s back to frame 0
  const DURATION = r3(cfg.duration || (loop ? 17.6 : 17.2))
  T.last = [ST.pep[1], DURATION]
  T.loop = [r3(DURATION - LOOP_LEN), DURATION]
  const LS = signStar(cfg.sign), CS = signStar(cfg.coach), PIS = signStar('pisces')
  const coachP = cfg.coach === 'pisces', listP = cfg.sign === 'pisces'
  const SPK = speaker(cfg.coach)
  const LINES = cfg.lines.map((text, i) => ({ t: T.lines[i], speaker: SPK, text, color: cfg.accent || PEP }))
  const C_HOPS = talkHops(LINES, SPK, { cps: CPS })
  const BUBBLES = cfg.bubbles || []
  const brk = cfg.brk || 'whip'

  // stars
  const L = (x, t, o = {}) => {
    const r = drawStarChar(x, o.x, o.y, o.s, t, { color: LS.color, glyph: o.s >= 150 && o.glyph !== false ? LS.glyph : null, seed: 3, glow: 1.1, ...o })
    if (listP && o.tears !== 0) { const F = starFrame(o.x, o.y, o.s, t, { seed: 3, ...o }); inSprite(x, F, () => tearsCells(x, t, o.tears || 2)) }
    return r
  }
  const C = (x, t, o = {}) => {
    const r = drawStarChar(x, o.x, o.y, o.s, t, { color: CS.color, glyph: o.s >= 150 && o.glyph !== false ? CS.glyph : null, seed: 7, glow: 1.1, ...o })
    if (coachP && o.tears !== 0) { const F = starFrame(o.x, o.y, o.s, t, { seed: 7, ...o }); inSprite(x, F, () => tearsCells(x, t, o.tears || 2)) }
    return r
  }
  const star = (x, t, sign, o = {}) => { const s = signStar(sign); return drawStarChar(x, o.x, o.y, o.s, t, { color: s.color, glyph: o.s >= 150 && o.glyph !== false ? s.glyph : null, seed: o.seed ?? 5, glow: 1, ...o }) }
  function pisces(x, t, P, tears, mood = 'wide', look = [-1, -0.5]) {
    const opts = { color: PIS.color, mood, look, seed: 6, glow: 0.8, pop: P.pop ?? 1, alpha: P.alpha ?? 1, hops: P.hops, tips: false, glyph: P.s >= 150 ? PIS.glyph : null, squash: P.squash || 0 }
    drawStarChar(x, P.x, P.y, P.s, t, opts)
    const F = starFrame(P.x, P.y, P.s, t, opts)
    if (tears) inSprite(x, F, () => tearsCells(x, t, tears))
    return F
  }
  const PIS_AT = cfg.pis || { x: 940, y: 1560, s: 170 }
  function cornerPisces(x, t, k, tears, mood = 'wide') {
    if (coachP || listP || k <= 0.01) return
    tissues(x, PIS_AT.x - PIS_AT.s * 0.75, PIS_AT.y + PIS_AT.s * 0.28, PIS_AT.s * 0.5 * Math.min(1, k))
    pisces(x, t, { ...PIS_AT, pop: k }, tears, mood, [-1, -0.6])
  }

  // ── the grab (frame 0): the coach huge in the lens, pulling back to the left by coachBack[1]
  function coachGrab(x, t, tt) {
    const b = ease.inOutCubic(prog(tt, ...T.coachBack))
    const lunge = 1 - b
    const cx = lerp(560, 230, b) + lunge * 14 * Math.sin(tt * 31), cy = lerp(1330, 1300, b), s = lerp(720, 250, b)
    const rot = lerp(-0.16, 0, b)
    if (lunge > 0.02) speedLines(x, tt, cx, cy - 200, 0.7 * lunge, { r0: 420 })
    x.save(); x.translate(cx, cy); x.rotate(rot); x.translate(-cx, -cy)
    C(x, tt, { x: cx, y: cy, s, mood: tt < T.coachBack[1] ? 'wide' : 'happy', look: tt < T.coachBack[0] ? [0, 0] : [1, -0.4], blink: false, glyph: s < 400, hops: [T.coachBack[1] + 0.05, 1.9, 2.3], squash: lunge * 0.06 * Math.sin(tt * 18) })
    x.restore()
  }
  function grabScene(x, tt, S) {
    if (cfg.hook) cfg.hook(x, tt, S)
    cornerPisces(x, tt, 1, 2, 'wide')
    coachGrab(x, tt, tt)
  }

  async function build(stage) {
    await loadFonts()
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const PRE = premiseChip(root, cfg.premise, { top: cfg.premiseTop || 420, at: T.premise })
    const H2 = popText(root, cfg.pepHead || `*${NAME(cfg.coach)},* | ten seconds. Go.`, { top: 160, size: 76, accentSize: 104, at: T.h2, gap: 0.07, accentColor: CS.color, fit: true, left: 70, width: 700 })
    const H3 = popText(root, cfg.last, { top: cfg.lastTop || 190, size: cfg.lastSize || 96, accentSize: (cfg.lastSize || 96) * 1.4, at: T.h3, gap: 0.08, late: cfg.lastLate ?? 1, lateAt: T.h3Late, wobble: true, accentColor: cfg.accent || PEP, fit: true })
    const top = layerCanvas(root), tx = top.getContext('2d')
    const box = dialogueBox(root, { lines: LINES, y: 1400, open: T.box[0], close: T.box[1], cps: CPS })
    const bug = buildBug(root)
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
    const flash = el('div', { position: 'absolute', inset: 0, background: '#fff6ea', opacity: 0, pointerEvents: 'none' }, root)
    const S0 = { L, C, star, pisces, LS, CS, T, DURATION }

    function scene(x, t) {
      // sky (frozen-ish zoom in the grab, then the normal sky)
      const ss = ease.inOutCubic(prog(t, 0, 3))
      drawSky(x, t, t < 3 ? { ...SKY_H, zoom: lerp(1.7, SKY_H.zoom, ss) } : SKY_H)
      const [s0, s1] = T.spiral, [p0, p1] = T.pep
      if (t < s0) grabScene(x, t, { ...S0, u: t, t0: 0, t1: s0 })
      else if (t < s1) {
        const punch = 1 + 0.07 * (1 - ease.outCubic(prog(t, s0, s0 + 0.3)))
        x.save(); x.translate(540, 960); x.scale(punch, punch); x.translate(-540, -960)
        if (cfg.spiral) cfg.spiral(x, t, { ...S0, u: t - s0, t0: s0, t1: s1 })
        cornerPisces(x, t, 1, 2, 'wide')
        x.restore()
      } else if (t < p1) pepScene(x, t)
      else lastScene(x, t)
    }

    function pepScene(x, t) {
      const [p0, p1] = T.pep
      const i = T.lines.filter(v => t >= v).length - 1
      const ui = i >= 0 ? t - T.lines[i] : 0
      const punch = 1 + 0.05 * Math.max(0, ...T.lines.map(v => (t >= v && t < v + 0.3) ? 1 - ease.outCubic((t - v) / 0.3) : 0), (t < p0 + 0.3 ? 1 - ease.outCubic((t - p0) / 0.3) : 0))
      x.save(); x.translate(540, 960); x.scale(punch, punch); x.translate(-540, -960)
      if (cfg.pepSet) cfg.pepSet(x, t, { ...S0, u: t - p0, i, ui })
      else { room(x, t, { win: { x: 120, y: 470, w: 260, h: 300 }, floorY: 1330 }) }
      // listener perks up line by line
      const perk = clamp(i + 1 + (i >= 0 ? Math.min(1, ui / 0.5) - 1 : 0), 0, 3)
      const mood = perk < 0.5 ? (cfg.slumpMood || 'neutral') : perk < 1.5 ? 'wide' : perk < 2.5 ? 'happy' : 'sparkle'
      const LP = cfg.lpos || { x: 760, y: 1110, s: 270 }, CP = cfg.cpos || { x: 290, y: 1120, s: 260 }
      shadow(x, LP.x, (cfg.floorY || 1330) + 4, LP.s * 0.9); shadow(x, CP.x, (cfg.floorY || 1330) + 4, CP.s * 0.9)
      const lHops = [T.lines[0] + 0.6, T.lines[1] + 0.6, T.lines[2] + 0.6, T.lines[2] + 1.0]
      L(x, t, { ...LP, mood, look: perk < 0.5 ? [-0.4, 1] : [-1, -0.2], squash: lerp(0.16, -0.04, perk / 3), hops: lHops, tears: listP ? (perk > 2 ? 3 : 2) : 0, blink: mood === 'wide' ? false : undefined })
      C(x, t, { ...CP, mood: i >= 2 && ui > 1.4 ? 'happy' : 'sparkle', look: [1, -0.2], hops: [p0 + 0.2, ...C_HOPS], tears: coachP ? 2 : 0 })
      if (cfg.pep) cfg.pep(x, t, { ...S0, u: t - p0, i, ui, perk, LP, CP })
      for (const v of T.lines) sparkles(x, t, LP.x, LP.y - 40, v + 0.6, 8, LP.s * 0.7, v, [GOLD, BONE, PEP])
      if (!coachP && !listP) {
        const P = cfg.pepPis || { x: 960, y: 820, s: 110 }
        tissues(x, P.x - P.s * 0.75, P.y + P.s * 0.28, P.s * 0.5)
        pisces(x, t, P, perk > 2 ? 3 : 2, perk > 1.5 ? 'sparkle' : 'wide', [-1, 0.5])
      }
      x.restore()
      stopwatch(x, t, cfg.watch?.x || 900, cfg.watch?.y || 330, p0 + 0.0, { k: pop01(t, p0 - 0.05, 0.3, 2.4) * (t < p1 ? 1 : 0) })
    }

    function lastScene(x, t) {
      const [a] = T.last
      const u = t - a
      x.save(); x.globalCompositeOperation = 'lighter'; glow(x, 540, 1000, 520, 0.22, '255,138,92'); x.restore()
      if (cfg.lastSet) cfg.lastSet(x, t, { ...S0, u, t0: a })
      shadow(x, 540, 1300, 300)
      L(x, t, { x: 540, y: 1060, s: 340, mood: u > 1.2 ? 'happy' : 'sparkle', look: [0, 0], hops: [a + 0.1, a + 0.55, a + 1.4], tears: listP ? 3 : 0, squash: -0.03 })
      sparkles(x, t, 540, 1030, a + 0.08, 14, 300, 1, [PEP, GOLD, BONE])
      confetti(x, t, a + 0.05, 540, 900)
      const ck = pop01(t, a + 0.12, 0.36, 2.1)
      if (!coachP) C(x, t, { x: 185, y: 1450, s: 170, pop: ck, mood: 'happy', look: [1, -0.6], hops: [a + 0.4, a + 1.0], seed: 7 })
      if (cfg.fin) cfg.fin(x, t, { ...S0, u, t0: a })
      // Pisces: happy-tear fountains (the coach or the listener when either is Pisces)
      const pk = pop01(t, a + 0.22, 0.36, 2.2)
      if (coachP) pisces(x, t, { x: 185, y: 1450, s: 180, pop: ck, hops: [a + 0.4, a + 1.0] }, 3, 'happy', [1, -0.6])
      else if (!listP) pisces(x, t, { x: 895, y: 1450, s: 165, pop: pk, hops: [a + 0.5, a + 1.1] }, 3, 'sparkle', [-1, -0.8])
      else C(x, t, { x: 895, y: 1450, s: 165, pop: pk, mood: 'happy', look: [-1, -0.6], hops: [a + 0.5, a + 1.1] })
    }

    // the pattern break in the first second (pure, small; the hook kit's effects are layered by the episode if wanted)
    function cameraFX(t) {
      let sc = 1, dx = 0, dy = 0, rot = 0
      // a constant mid-lunge shake while the coach is in the lens
      const lunge = 1 - prog(t, ...T.coachBack)
      dx += lunge * 9 * Math.sin(t * 47); dy += lunge * 7 * Math.cos(t * 39)
      const b = T.brk
      void b
      // the cut punches
      return { sc, dx, dy, rot }
    }

    return {
      start: 0, end: DURATION + 0.01, root,
      update(t) {
        // the record-scratch freeze: time holds still for 0.45 s at brk
        const ts = t
        const F = cameraFX(t)
        x.save(); x.translate(540 + F.dx, 960 + F.dy); x.rotate(F.rot); x.scale(F.sc, F.sc); x.translate(-540, -960)
        scene(x, ts)
        x.restore()
        const lk = 0
        // top canvas: bubbles + per-episode overlays
        tx.clearRect(0, 0, 1080, 1920)
        for (const B of BUBBLES) bubble(tx, ts, B.x, B.y, B.t0, B.t1, B.text, B)
        if (cfg.top) cfg.top(tx, ts, S0)
        // DOM type
        PRE.update(ts, outK(t, [T.spiral[1] - 0.2, T.spiral[1]]) * (1 - lk))
        H2.update(t, outK(t, T.h2Out))
        H3.update(t, t >= T.last[0] ? 1 - lk : 0)
        box.update(t)
        bug.update(t)
        // white flash on the beat cuts (and the colour flash break)
        const cuts = [T.spiral[0], T.pep[0], T.last[0]]
        let fl = Math.max(0, ...cuts.map(c => (t >= c && t < c + 0.12) ? 1 - (t - c) / 0.12 : 0))
        if (brk === 'flash' && t > T.brk && t < T.brk + 0.2) fl = Math.max(fl, 1.6 * (1 - (t - T.brk) / 0.2))
        flash.style.background = brk === 'flash' && t > T.brk && t < T.brk + 0.2 ? (cfg.flashCol || PEP) : '#fff6ea'
        flash.style.opacity = String(clamp(0.55 * fl))
        drawGrain(gx, t)
      },
    }
  }

  // the hook kit: the slam title on frame 0, the first-second pattern break, the loop seam
  const HOOK = { at: -1, text: cfg.hookLine, top: cfg.hookTop || 150, size: cfg.hookSize || 112, accentColor: cfg.accent || PEP, out: T.h0Out }
  const FX = {
    whip: { at: T.brk, len: 0.45, from: 1.45 },
    scratch: { at: T.brk, len: 1.0, caption: cfg.scratchCap || 'yep. *that’s you.*', top: 1560 },
    glitch: { at: T.brk, len: 0.55, dialog: false },
    shake: { at: T.brk, len: 0.55, amp: 30 },
  }[brk]
  const main = brk === 'scratch' ? frozen(build, [FX]) : build
  const fxScene = { whip: whipZoom, scratch: recordScratch, glitch, shake: screenShake }[brk]
  const SCENES = [main, slamTitle(HOOK), ...(fxScene ? [fxScene(FX)] : []), ...(loop ? [loopBack([build, slamTitle(HOOK)], { duration: DURATION, len: LOOP_LEN })] : [])]

  // ── sound (pitched SFX are shifted into the film's key by the engine)
  const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
  const wordPops = (t0, n, gap, b0 = 0, gain = 0.024) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(b0 + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
  const nw = s => s.replace(/\|/g, ' ').trim().split(/\s+/).length
  const BRK = brk === 'flash' ? [['boom', T.brk, 0.22], ['glitter', T.brk, T.brk + 0.35], ['tick', T.brk, 0.06]]
    : ({ whip: whipZoomCues, scratch: recordScratchCues, glitch: glitchCues, shake: shakeCues }[brk])(FX)
  const CUES = [
    // frame 0: the lunge (already mid-whoosh), the grab shake
    ['whoosh', 0.0, 0.3, 0.05], ['tom', 0.05, 100, { gain: 0.2, decay: 0.2 }], ['pop', 0.08, 880, 0.03, -0.3],
    ...BRK, ...slamTitleCues(HOOK),
    ['whoosh', T.coachBack[0], 0.4, 0.03], ['pop', T.coachBack[1], 659.25, 0.03, -0.4],
    ['pop', T.premise, 1174.66, 0.04, 0], ['tick', r3(T.premise + 0.05), 0.04],
    ['whoosh', r3(T.spiral[0] - 0.1), 0.3, 0.035], ['tick', T.spiral[0], 0.05], ['pluck', r3(T.spiral[0] + 0.1), 392, 0.03, 0.4, -0.2],
    ...BUBBLES.flatMap((B, i) => [['pop', r3(B.t0), NOTE[(i * 2 + 1) % 7], 0.04, B.x < 540 ? -0.25 : 0.25], ['tick', r3(B.t0 + 0.02), 0.03]]),
    // the pep: whoosh in, the stopwatch ticks every second, a pop per line, DING
    ['whoosh', r3(T.pep[0] - 0.1), 0.3, 0.04], ['tick', T.pep[0], 0.06], ['bell', r3(T.pep[0] + 0.05), 1760, 0.02, 0.6, 0.4],
    ...wordPops(T.h2, Math.min(6, nw(cfg.pepHead || 'x ten seconds. Go.')), 0.07, 1),
    ...Array.from({ length: 10 }, (_, i) => ['tick', r3(T.pep[0] + i + 0.98), i >= 7 ? 0.045 : 0.025]),
    ...T.lines.flatMap((v, i) => [['pop', r3(v + 0.6), NOTE[(i * 2 + 2) % 7] * 2, 0.03, 0.3], ['glitter', r3(v + 0.6), r3(v + 0.9)]]),
    ...talkCues(LINES, { cps: CPS }),
    ['bell', T.pep[1], 2349.32, 0.05, 1.4, 0.2], ['bell', r3(T.pep[1] + 0.02), 1760, 0.04, 1.2, -0.2], ['boom', T.pep[1], 0.2],
    // the last line
    ['tick', T.last[0], 0.05], ['glitter', T.last[0], r3(T.last[0] + 0.5)],
    ...wordPops(T.h3, Math.max(1, nw(cfg.last) - 1), 0.08, 0), ['pop', T.h3Late, 1174.66, 0.05, 0], ['pop', r3(T.h3Late + 0.08), 1567.98, 0.04, 0], ['glitter', T.h3Late, r3(T.h3Late + 0.5)],
    ['pluck', r3(T.last[0] + 0.5), 1567.98, 0.03, 0.4, 0.4], ['pluck', r3(T.last[0] + 0.62), 2093, 0.025, 0.4, 0.4],
    ...(loop ? loopCues({ duration: DURATION, len: LOOP_LEN }) : []),
    ...(cfg.cues || []).map(c => [c[0], r3(c[1]), ...c.slice(2)]),
  ]
  return { DURATION, SCENES, CUES, T }
}
