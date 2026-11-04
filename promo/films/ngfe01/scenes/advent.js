// 24 DAYS OF GREEN FLAGS: the shared look of ngfe01–ngfe24 (promo/films/next30/b09.md). Every episode imports this file
// from ngfe01 (shared modules stay read-only; this kit belongs to the series).
//
// The format (18 s, story 0–13.6, then the shared end card):
//   0.00–2.35  THE CALENDAR. Frame 0 is the thumbnail: the hook headline is up, a pixel advent calendar of 24 doors
//              (numbers shuffled like a real one) fills the frame, the doors before today are open with a tiny green
//              flag inside, today's door glows, the hero star is mid-hop at it, Pisces sniffles in the corner.
//              Push-in on today's door (1.3–2.35), the door swings open (1.75–2.3), a warm light burst (2.3).
//   2.35–8.8   BEHIND THE DOOR. The episode's tiny scene (cfg.scene), the caption sticker "<flag>" with a green
//              numbered badge, Pisces crying somewhere in the back (cfg.pis, or the scene draws its own).
//   8.8        the one card cut (flip).
//   8.85–13.5  PLANTED. A green pennant drops between the pair and plants (9.35); THE STARS say the last line;
//              the 24-flag strip along the bottom fills to today.
// Everything draws as a pure function of t; DOM / canvases are only made inside build().
//
//   makeDoor(cfg) → { DURATION, SCENES, CUES, T, CUTS }
//     cfg.day (1–24), cfg.hero / cfg.mate (sign ids), cfg.hook ('line | *accent*'), cfg.flag (sticker text with
//     one *accent*), cfg.last (THE STARS' last line), cfg.scene(x, t, S), cfg.cues (relative to the scene start),
//     cfg.pis ({ x, y, s, look } | false), cfg.payoff(x, t, S) extra props in the payoff, cfg.payPair (false = the
//     payoff draws its own cast), cfg.accent (headline accent colour), cfg.heroMood / mateMood (payoff moods).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas, drawPixelStar } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar, STAR } from '../../startalk.js'
import { popText } from '../../lesson.js'

export const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', LAV = '#c9a6ff', RED = '#e8344e'
export const GREEN = '#5fd38a', GREEN_D = '#2f9a5a', GREEN_L = '#b8f5c8', WOOD = '#8a5a36', WOOD_D = '#5e3a22', WOOD_L = '#b07a4c'
export const SNOW = '#f4f1ff', SKYBLUE = '#7fd0ff'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const SERIF = "'EB Garamond', Georgia, serif"
export const MONO = "'Space Mono', ui-monospace, monospace"
export const r3 = v => +v.toFixed(3)
export const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
export const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
export { clamp, lerp, prog, ease, easeOutBack, drawStarChar, signStar, STAR, drawPixelStar }

// ── the fixed timeline (same in all 24 films)
export const DURATION = 18
export const STORY_END = DURATION - ENDCARD_LEN          // 13.6
export const T = {
  bug: -1, h0: -1, h0Out: [1.2, 1.45],
  zoom: [1.3, 2.35], door: [1.75, 2.3], burst: 2.3, calOut: 2.35,
  scene: [2.35, 8.8], sticker: 2.9, stickerOut: [8.55, 8.75],
  cut: 8.8,
  pay: 8.85, h1: 8.95, flagDrop: [8.95, 9.35], plant: 9.35, unfurl: [9.4, 9.8], starsIn: 9.3, last: 9.75, strip: 10.4,
  boxClose: 13.2, out: [13.1, 13.5], bugOut: [13.2, 13.5],
}
const CPS = 30

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
export function confetti(x, t, t0, cx, cy, { n = 26, life = 2.2, cols = [GOLD, PINK, SKYBLUE, GREEN, BONE] } = {}) {
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
/** a pixel speech bubble (canvas), popping at t0, fading by t1. text may hold '\n' for two rows */
export function bubble(x, t, cx, cy, t0, t1, text, { col = BONE, ink = INK, size = 34, tail = 0, font = INTER, weight = 800, tailUp = false } = {}) {
  const k = pop01(t, t0, 0.25, 2.4) * outK(t, [t1 - 0.15, t1])
  if (k <= 0.01 || t < t0 || t > t1) return
  const rows = String(text).split('\n')
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.font = `${weight} ${size}px ${font}`
  const w = Math.max(...rows.map(r => x.measureText(r).width)) + 44, lh = size * 1.18, h = lh * rows.length + 32 - (lh - size)
  x.fillStyle = INK; x.fillRect(-w / 2 - 5, -h / 2, w + 10, h); x.fillRect(-w / 2, -h / 2 - 5, w, h + 10)
  x.fillStyle = col; x.fillRect(-w / 2, -h / 2, w, h)
  const tx = tail * (w / 2 - 40)
  if (tailUp) { x.fillStyle = INK; x.fillRect(tx - 14, -h / 2 - 16, 14, 12); x.fillRect(tx - 7, -h / 2 - 22, 8, 8); x.fillStyle = col; x.fillRect(tx - 9, -h / 2 - 9, 9, 9) }
  else { x.fillStyle = INK; x.fillRect(tx - 14, h / 2 + 4, 14, 12); x.fillRect(tx - 7, h / 2 + 14, 8, 8); x.fillStyle = col; x.fillRect(tx - 9, h / 2, 9, 9) }
  x.fillStyle = ink; x.textAlign = 'center'; x.textBaseline = 'middle'
  rows.forEach((r, i) => x.fillText(r, 0, 2 + (i - (rows.length - 1) / 2) * lh))
  x.restore()
}
/** pixel label text on canvas (Space Mono), with an ink drop shadow */
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
  const g = x.createRadialGradient(cx, cy, 0, cx, cy, r); g.addColorStop(0, `rgba(${col},${a})`); g.addColorStop(1, `rgba(${col},0)`)
  x.fillStyle = g; x.fillRect(cx - r, cy - r, 2 * r, 2 * r)
}
/** gentle pixel snowfall over a rect */
export function snowfall(x, t, { n = 60, X = 0, Y = 0, w = 1080, h = 1920, speed = 70, alpha = 0.85, seed = 1 } = {}) {
  x.save(); x.globalAlpha *= alpha; x.fillStyle = SNOW
  for (let i = 0; i < n; i++) {
    const r1 = Math.abs(Math.sin(i * 12.9898 + seed) * 43758.5453) % 1, r2 = Math.abs(Math.sin(i * 78.233 + seed) * 12345.678) % 1
    const sz = 4 + Math.round(r2 * 3) * 2, sp = speed * (0.6 + 0.8 * r2)
    const py = Y + ((r1 * h + t * sp) % h), px = X + ((r2 * w + Math.sin(t * 1.3 + i) * 16) % w)
    x.fillRect(Math.round(px), Math.round(py), sz, sz)
  }
  x.restore()
}
/** a room: wall + skirting + floor boards */
export function room(x, { wall = '#2c2350', wall2 = '#352a5e', floor = '#4a3260', floorY = 1180, stripes = true } = {}) {
  R(x, wall, 0, 0, 1080, floorY)
  if (stripes) for (let i = 0; i < 1080; i += 120) R(x, wall2, i, 0, 60, floorY)
  R(x, INK, 0, floorY - 8, 1080, 10); R(x, '#5a4680', 0, floorY - 22, 1080, 14)
  R(x, floor, 0, floorY, 1080, 1920 - floorY)
  for (let j = floorY + 40; j < 1920; j += 70) R(x, 'rgba(0,0,0,0.18)', 0, j, 1080, 6)
}
/** a window onto the night (with optional snow) */
export function windowFrame(x, t, X, Y, w, h, { snow = true, frost = 0 } = {}) {
  box(x, X, Y, w, h, '#120d2c', { b: 10 })
  x.save(); x.beginPath(); x.rect(X, Y, w, h); x.clip()
  const g = x.createLinearGradient(0, Y, 0, Y + h); g.addColorStop(0, '#1d1650'); g.addColorStop(1, '#3a2a70'); x.fillStyle = g; x.fillRect(X, Y, w, h)
  for (let i = 0; i < 9; i++) drawPixelStar(x, X + ((i * 97) % w), Y + ((i * 53) % (h * 0.6)), 10, 1, BONE)
  if (snow) snowfall(x, t, { n: 18, X, Y, w, h, speed: 50, seed: X })
  if (frost > 0) { x.globalAlpha = frost; x.fillStyle = 'rgba(220,235,255,0.75)'; x.fillRect(X, Y, w, h) }
  x.restore()
  R(x, '#5a4680', X + w / 2 - 6, Y, 12, h); R(x, '#5a4680', X, Y + h / 2 - 6, w, 12)
  R(x, '#5a4680', X - 24, Y + h + 4, w + 48, 18)
}
/** a café / dinner table seen from the front */
export function table(x, cx, y, w, { col = '#7a4a2c', cloth = null } = {}) {
  box(x, cx - w / 2, y, w, 26, col, { b: 6, hi: '#9a6440' })
  if (cloth) { R(x, INK, cx - w / 2 + 10, y + 26, w - 20, 70); R(x, cloth, cx - w / 2 + 16, y + 26, w - 32, 62) }
  R(x, INK, cx - w / 2 + 34, y + 30, 22, 220); R(x, col, cx - w / 2 + 38, y + 30, 14, 216)
  R(x, INK, cx + w / 2 - 56, y + 30, 22, 220); R(x, col, cx + w / 2 - 52, y + 30, 14, 216)
}
/** a mug with steam */
export function mug(x, t, cx, cy, s = 1, col = '#e86a8a', { steam = true } = {}) {
  box(x, cx - 26 * s, cy - 34 * s, 52 * s, 50 * s, col, { b: 5, hi: 'rgba(255,255,255,0.3)' })
  R(x, INK, cx + 26 * s, cy - 24 * s, 18 * s, 30 * s); R(x, col, cx + 26 * s, cy - 18 * s, 10 * s, 18 * s)
  if (steam) for (let i = 0; i < 3; i++) { const p = (t * 0.7 + i / 3) % 1; x.save(); x.globalAlpha = 0.5 * Math.sin(Math.PI * p); R(x, BONE, cx - 14 * s + i * 14 * s + Math.sin(t * 3 + i) * 5, cy - 44 * s - p * 60 * s, 8 * s, 8 * s); x.restore() }
}
/** a phone (front), with a title bar and up to 4 chat bubbles: msgs [{ side: 'L'|'R', text, at }] */
export function phone(x, t, cx, cy, { w = 360, h = 620, title = '', msgs = [], rot = 0, scale = 1, glowA = 0 } = {}) {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(scale, scale)
  if (glowA > 0) glow(x, 0, 0, w * 1.1, 0.3 * glowA, '190,220,255')
  box(x, -w / 2, -h / 2, w, h, '#2a2148', { b: 8 })
  R(x, '#120d2c', -w / 2 + 14, -h / 2 + 50, w - 28, h - 80)
  R(x, '#1f1840', -w / 2 + 14, -h / 2 + 50, w - 28, 54)
  x.font = `700 24px ${MONO}`; x.fillStyle = BONE; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(title, 0, -h / 2 + 78)
  R(x, INK, -36, -h / 2 + 18, 72, 12)
  let yy = -h / 2 + 130
  for (const m of msgs) {
    if (t < m.at) continue
    const k = pop01(t, m.at, 0.25, 2.2)
    x.font = `700 ${m.size || 24}px ${INTER}`
    const rows = wrap(x, m.text, w - 110)
    const bw = Math.max(...rows.map(r => x.measureText(r).width)) + 34, bh = rows.length * 30 + 22
    const bx = m.side === 'R' ? w / 2 - 26 - bw : -w / 2 + 26
    x.save(); x.translate(bx + bw / 2, yy + bh / 2); x.scale(k, k)
    R(x, INK, -bw / 2 - 4, -bh / 2 - 4, bw + 8, bh + 8); R(x, m.side === 'R' ? '#7fd0ff' : BONE, -bw / 2, -bh / 2, bw, bh)
    x.fillStyle = INK; x.textAlign = 'left'
    rows.forEach((r, i) => x.fillText(r, -bw / 2 + 17, -bh / 2 + 26 + i * 30))
    x.restore()
    yy += bh + 18
  }
  x.restore()
}
export function wrap(x, text, maxW) {
  const words = String(text).split(' '), rows = []; let cur = ''
  for (const w of words) { const n = cur ? cur + ' ' + w : w; if (x.measureText(n).width > maxW && cur) { rows.push(cur); cur = w } else cur = n }
  if (cur) rows.push(cur)
  return rows
}
/** a wall clock showing h:m (12 h) */
export function clock(x, cx, cy, r, h, m) {
  x.save()
  x.fillStyle = INK; x.beginPath(); x.arc(cx, cy, r + 8, 0, Math.PI * 2); x.fill()
  x.fillStyle = BONE; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill()
  for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; R(x, INK, cx + Math.sin(a) * r * 0.82 - 4, cy - Math.cos(a) * r * 0.82 - 4, 8, 8) }
  const hand = (a, L, w, col) => { x.save(); x.translate(cx, cy); x.rotate(a); x.fillStyle = col; x.fillRect(-w / 2, -L, w, L); x.restore() }
  hand(((h % 12) + m / 60) / 12 * Math.PI * 2, r * 0.5, 10, INK)
  hand(m / 60 * Math.PI * 2, r * 0.78, 7, RED)
  R(x, INK, cx - 7, cy - 7, 14, 14)
  x.restore()
}
/** snowy ground with a soft horizon */
export function snowGround(x, y = 1180, { col = '#8d86c9', shade = '#7a72b8' } = {}) {
  R(x, INK, 0, y - 8, 1080, 10)
  R(x, col, 0, y, 1080, 1920 - y)
  for (let i = 0; i < 1080; i += 90) R(x, shade, i + ((i / 90) % 2) * 30, y + 30 + ((i / 90) % 3) * 40, 60, 10)
}
/** a pixel green flag on a pole; k = unfurl 0…1 */
export function flag(x, t, cx, base, h, { k = 1, cell = 8, col = GREEN, text = null, sub = null } = {}) {
  R(x, INK, cx - 7, base - h - 6, 14, h + 6); R(x, '#e7e0f2', cx - 3, base - h, 6, h)
  drawBits(x, ['.GG.', 'GGGG', 'GGGG', '.GG.'], { G: GOLD }, cx, base - h - 10, cell * 0.8)
  if (k <= 0.01) return
  const W = 360 * k, H = 176, top = base - h + 6
  x.save()
  // pennant: wavy cells
  const n = Math.max(1, Math.round(W / cell))
  for (let pass = 0; pass < 2; pass++) for (let i = 0; i < n; i++) {
    const f = i / n, hh = H * (1 - 0.55 * f), wv = Math.sin(t * 6 - i * 0.35) * 6 * f
    const X = cx + 3 + i * cell, Y = top + (H - hh) / 2 + wv
    if (pass === 0) R(x, INK, X - 3, Y - 5, cell + 6, hh + 10)
    else { R(x, col, X, Y, cell + 0.5, hh); R(x, GREEN_D, X, Y + hh - 10, cell + 0.5, 10); R(x, GREEN_L, X, Y, cell + 0.5, 8) }
  }
  if (text && k > 0.85) {
    const a = clamp((k - 0.85) / 0.15)
    x.globalAlpha = a; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.font = `800 40px ${INTER}`; x.fillStyle = INK; x.fillText(text, cx + 3 + W * 0.42, top + H / 2 - (sub ? 16 : 0) + Math.sin(t * 6 - 4) * 3)
    if (sub) { x.font = `700 24px ${MONO}`; x.fillText(sub, cx + 3 + W * 0.42, top + H / 2 + 24 + Math.sin(t * 6 - 4) * 3) }
  }
  x.restore()
}
/** the tiny flag that sits inside an opened door / the strip */
export const MINI_FLAG = ['P.....', 'PGGG..', 'PGGGGG', 'PGGG..', 'P.....', 'P.....']
export function miniFlag(x, cx, cy, cell, { alpha = 1, col = GREEN } = {}) {
  drawBits(x, MINI_FLAG, { P: BONE, G: col }, cx, cy, cell, { alpha })
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
/** a little tissue box */
export function tissues(x, cx, cy, s) {
  box(x, cx - s / 2, cy - s * 0.3, s, s * 0.6, '#9fd8f6', { b: 4, hi: '#c9ecfb' })
  R(x, INK, cx - s * 0.18 - 4, cy - s * 0.3 - 4, s * 0.36 + 8, 8)
  R(x, '#ffffff', cx - s * 0.12, cy - s * 0.3 - s * 0.32, s * 0.24, s * 0.34)
}

// ── the series bug: "24 DAYS OF GREEN FLAGS · DOOR N" in Inter 800 small caps, letter-spaced, top-left 56 px
function buildBug(root, day) {
  const b = el('div', { position: 'absolute', left: '56px', top: '56px', height: '44px', display: 'flex', alignItems: 'center', gap: '14px', transformOrigin: '0% 50%', pointerEvents: 'none' }, root)
  el('div', { width: '18px', height: '18px', background: GREEN, boxShadow: `0 0 0 4px ${INK}, 0 0 16px rgba(95,211,138,0.7)` }, b)
  el('div', { font: `800 28px ${INTER}`, letterSpacing: '0.2em', color: GREEN, textShadow: '0 2px 12px rgba(6,4,18,0.9)', whiteSpace: 'nowrap', fontVariant: 'small-caps' }, b,
    `24&nbsp;DAYS&nbsp;OF&nbsp;GREEN&nbsp;FLAGS<span style="color:rgba(255,255,255,0.6)">&nbsp;·&nbsp;DOOR&nbsp;${day}</span>`)
  return { update(t, out = 1) { b.style.display = out <= 0.01 ? 'none' : 'flex'; b.style.opacity = String(clamp(out)) } }
}

// ── the caption sticker: a tilted bone sticker, a green flag badge with the door number, Inter 800 + one *italic* accent
function buildSticker(root, { day, text }) {
  const wrap = el('div', { position: 'absolute', left: '0', top: '1340px', width: '1080px', display: 'none', justifyContent: 'center', pointerEvents: 'none' }, root)
  const st = el('div', { display: 'flex', alignItems: 'center', gap: '22px', maxWidth: '960px', padding: '18px 34px 20px 20px', background: BONE, border: `6px solid ${INK}`, borderRadius: '14px',
    boxShadow: `10px 10px 0 rgba(6,4,18,0.7)`, transformOrigin: '50% 50%' }, wrap)
  el('div', { flex: '0 0 auto', width: '84px', height: '84px', borderRadius: '50%', background: GREEN, border: `5px solid ${INK}`, display: 'grid', placeItems: 'center', font: `800 40px ${INTER}`, color: INK }, st, String(day))
  const html = text.replace(/\*([^*]+)\*/g, `<span style="font:italic 500 66px ${SERIF};color:${GREEN_D};letter-spacing:0">$1</span>`)
  el('div', { font: `800 50px ${INTER}`, lineHeight: '1.08', color: INK, letterSpacing: '-0.01em' }, st, html)
  return {
    update(t) {
      const on = t >= T.sticker && t < T.stickerOut[1]
      wrap.style.display = on ? 'flex' : 'none'
      if (!on) return
      const k = easeOutBack(prog(t, T.sticker, T.sticker + 0.34), 2.6), o = outK(t, T.stickerOut)
      st.style.opacity = String(clamp(prog(t, T.sticker, T.sticker + 0.1)) * o)
      st.style.transform = `translateY(${((1 - o) * 30).toFixed(1)}px) scale(${(lerp(0.4, 1, k) * lerp(0.85, 1, o)).toFixed(4)}) rotate(-1.6deg)`
    },
  }
}

// ── the calendar: 24 doors in a 4 × 6 grid, numbers shuffled
export const ORDER = [7, 15, 2, 20, 11, 23, 5, 18, 1, 13, 24, 9, 16, 4, 21, 12, 19, 8, 14, 3, 6, 22, 10, 17]
const BOARD = { x: 90, y: 440, w: 900, h: 960 }
const GRID = { top: 92, pad: 30, gap: 14, cols: 4, rows: 6 }
export function doorRect(n) {
  const i = ORDER.indexOf(n), c = i % GRID.cols, r = Math.floor(i / GRID.cols)
  const cw = (BOARD.w - 2 * GRID.pad - (GRID.cols - 1) * GRID.gap) / GRID.cols
  const ch = (BOARD.h - GRID.top - GRID.pad - (GRID.rows - 1) * GRID.gap) / GRID.rows
  return { x: BOARD.x + GRID.pad + c * (cw + GRID.gap), y: BOARD.y + GRID.top + r * (ch + GRID.gap), w: cw, h: ch }
}
function drawBoard(x, t, day, open, { allOpen = false } = {}) {
  const B = BOARD
  // board + frame
  box(x, B.x, B.y, B.w, B.h, '#6a3f2a', { b: 10 })
  R(x, '#7b4a31', B.x + 12, B.y + 12, B.w - 24, B.h - 24)
  // garland across the top: green pixel bumps + berries
  for (let i = 0; i < 26; i++) { const gx = B.x + 6 + i * 35, gy = B.y + 6 + 8 * Math.sin(i * 1.3); R(x, INK, gx - 4, gy - 4, 34, 30); R(x, i % 2 ? '#2f9a5a' : '#3fb070', gx, gy, 26, 22) }
  for (let i = 0; i < 9; i++) { const gx = B.x + 50 + i * 100, gy = B.y + 22 + 6 * Math.sin(i * 2.1); R(x, INK, gx - 3, gy - 3, 18, 18); R(x, RED, gx, gy, 12, 12) }
  x.save(); x.font = `700 32px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = '#ffe9b8'; x.fillText('D E C E M B E R', B.x + B.w / 2, B.y + 68); x.restore()
  for (let n = 1; n <= 24; n++) {
    const D = doorRect(n)
    const isToday = n === day, wasOpen = allOpen ? n !== day || open >= 1 : n < day
    // the hole behind (dark, warm)
    R(x, INK, D.x - 5, D.y - 5, D.w + 10, D.h + 10)
    R(x, wasOpen || isToday ? '#2a1840' : '#3a2240', D.x, D.y, D.w, D.h)
    if (wasOpen && !isToday) miniFlag(x, D.x + D.w / 2, D.y + D.h / 2 + 4, 9)
    // the door leaf
    let f = wasOpen && !isToday ? 1 : 0
    if (isToday) f = open
    const lw = D.w * Math.cos(Math.PI * 0.5 * f)   // hinge on the left
    if (isToday && f > 0) { glow(x, D.x + D.w / 2, D.y + D.h / 2, D.w * 0.9, 0.55 * f, '255,236,180'); R(x, `rgba(255,244,214,${0.85 * f})`, D.x, D.y, D.w, D.h) }
    if (f >= 0.999) { R(x, '#a06b46', D.x - 12, D.y, 12, D.h); continue }
    const col = isToday ? '#c98a4e' : n % 3 === 0 ? '#9c6a44' : n % 3 === 1 ? '#a87650' : '#94603c'
    R(x, INK, D.x - 2, D.y - 2, lw + 4, D.h + 4)
    R(x, col, D.x, D.y, lw, D.h)
    R(x, 'rgba(255,255,255,0.14)', D.x, D.y, lw, 8)
    if (lw > D.w * 0.4) {
      x.save(); x.font = `800 ${Math.round(D.h * 0.42)}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
      x.fillStyle = isToday ? '#fff1c8' : '#ffe9b8'; x.globalAlpha = clamp((lw / D.w - 0.4) / 0.4)
      x.fillText(String(n), D.x + lw / 2, D.y + D.h / 2 + 4); x.restore()
      R(x, GOLD, D.x + lw - 22, D.y + D.h / 2 - 6, 10, 12)
    }
    if (isToday && f < 0.05) {
      // today's door: a pulsing gold outline + ribbon
      const pulse = 0.5 + 0.5 * Math.sin(t * 6)
      x.save(); x.strokeStyle = `rgba(242,199,92,${0.55 + 0.45 * pulse})`; x.lineWidth = 8; x.strokeRect(D.x - 10, D.y - 10, D.w + 20, D.h + 20); x.restore()
      R(x, RED, D.x + D.w / 2 - 7, D.y, 14, D.h); R(x, RED, D.x, D.y + D.h / 2 - 7, D.w, 14)
      drawBits(x, ['RR.RR', 'RRRRR', '.RRR.'], { R: '#ff5c6e' }, D.x + D.w / 2, D.y + D.h / 2, 7)
    }
  }
}

// ═══════════════════════════════════════════════════════════════════════════ the episode
export function makeDoor(cfg) {
  const DAY = cfg.day
  const HERO = signStar(cfg.hero), MATE = signStar(cfg.mate), PIS = signStar('pisces')
  const SPEAK = 'THE STARS'
  const LINES = [{ t: T.last, speaker: SPEAK, text: cfg.last }]
  const STARS_HOPS = [T.starsIn + 0.3, ...talkHops(LINES, SPEAK, { cps: CPS })]
  const PAY_HOPS = [T.plant + 0.02, T.plant + 0.5, T.strip + 0.05]

  const star = (sign, seed = 5) => { const S = signStar(sign); return (x, t, o = {}) => drawStarChar(x, o.x, o.y, o.s, t, { color: S.color, glyph: o.s >= 150 ? S.glyph : null, seed, glow: 1, ...o }) }
  const hero = star(cfg.hero, 3), mate = star(cfg.mate, 7)
  function pisces(x, t, P, tears, mood = 'wide', look = [-1, -0.5]) {
    const opts = { color: PIS.color, glyph: P.s >= 150 ? PIS.glyph : null, mood, look, seed: 6, glow: 0.8, pop: P.pop ?? 1, alpha: P.alpha ?? 1, hops: P.hops, tips: false, ...(P.opts || {}) }
    drawStarChar(x, P.x, P.y, P.s, t, opts)
    const F = starFrame(P.x, P.y, P.s, t, opts)
    if (tears) inSprite(x, F, () => tearsCells(x, t, tears))
    return F
  }
  const D = doorRect(DAY)
  const DC = { x: D.x + D.w / 2, y: D.y + D.h / 2 }

  async function build(stage) {
    try {
      await Promise.all(["800 112px Inter", "800 50px Inter", "800 30px Inter", "800 28px Inter", "700 30px Inter", "italic 500 150px 'EB Garamond'", "italic 500 66px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 24px 'Space Mono'", "700 20px 'Space Mono'"].map(f => document.fonts.load(f)))
    } catch (_) { /* fonts optional */ }
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const H0 = popText(root, cfg.hook, { top: 160, size: 88, accentSize: 120, at: T.h0, gap: 0.06, accentColor: cfg.accent || GREEN, fit: true })
    const H1 = popText(root, `Green flag *No. ${DAY}*`, { top: 176, size: 92, accentSize: 128, at: T.h1, gap: 0.08, accentColor: GREEN, fit: true })
    const sticker = buildSticker(root, { day: DAY, text: cfg.flag })
    const top = layerCanvas(root), tx = top.getContext('2d')
    const box1 = dialogueBox(root, { lines: LINES, y: 1420, open: T.last - 0.22, close: T.boxClose, cps: CPS })
    const bug = buildBug(root, DAY)
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
    const flash = el('div', { position: 'absolute', inset: 0, background: '#fff6ea', opacity: 0, pointerEvents: 'none' }, root)

    // ── 1. the calendar
    function calendar(t) {
      if (t >= T.calOut) return
      drawSky(x, t, { ...SKY_H, zoom: 1.12 })
      const z = ease.inOutCubic(prog(t, ...T.zoom))
      const sc = lerp(1, 1080 / D.w * 0.92, z)
      const cx = lerp(540, DC.x, z), cy = lerp(920, DC.y, z)
      x.save(); x.translate(540, 960); x.scale(sc, sc); x.translate(-cx, -cy)
      drawBoard(x, t, DAY, ease.inOutCubic(prog(t, ...T.door)), { allOpen: cfg.allOpen })
      x.restore()
      // the cast in front: hero mid-hop at t = 0, Pisces sniffling with tissues
      const leave = ease.inCubic(prog(t, T.zoom[0], T.zoom[0] + 0.5))
      if (leave < 1) {
        const hx = 270 - leave * 500, hy = 1610
        const look = [clamp((DC.x - hx) / 300, -1, 1), -1]
        shadow(x, hx, hy + 150, 230)
        if (cfg.calHero) cfg.calHero(x, t, { x: hx, y: hy, s: 270, look, hops: [-0.14, 0.62, 1.1] })
        else hero(x, t, { x: hx, y: hy, s: 270, mood: t < 0.55 ? 'sparkle' : 'happy', look, hops: [-0.14, 0.62, 1.1] })
        const px = 880 + leave * 400, py = 1660
        tissues(x, px - 120, py + 70, 80)
        if (cfg.calPisces !== false) pisces(x, t, { x: px, y: py, s: 170, hops: [0.9] }, 1, 'wide', [-1, -1])
      }
      // light burst as the door opens
      const bk = prog(t, T.door[0] + 0.3, T.calOut)
      if (bk > 0) { x.save(); x.globalCompositeOperation = 'lighter'; glow(x, 540, 960, 900, 0.5 * bk, '255,240,200'); x.restore() }
    }

    // ── 2. behind the door
    function scene(t) {
      if (t < T.scene[0] || t >= T.cut + 0.02) return
      const S = { u: t - T.scene[0], t0: T.scene[0], t1: T.scene[1], hero, mate, star, pisces, HERO, MATE, day: DAY }
      const punch = 1 + 0.06 * (1 - ease.outCubic(prog(t, T.scene[0], T.scene[0] + 0.4)))
      x.save(); x.translate(540, 900); x.scale(punch, punch); x.translate(-540, -900)
      cfg.scene(x, t, S)
      x.restore()
      if (cfg.pis !== false) {
        const P = { x: 945, y: 1715, s: 150, ...(cfg.pis || {}) }
        const pk = pop01(t, T.scene[0] + 0.5, 0.3, 2) * outK(t, [T.scene[1] - 0.15, T.scene[1]])
        if (pk > 0.01) {
          if (!P.noTissues) tissues(x, P.x - P.s * 0.75, P.y + P.s * 0.28, P.s * 0.5 * Math.min(1, pk))
          pisces(x, t, { ...P, pop: pk }, t > T.scene[0] + 3.4 ? 3 : 2, P.mood || 'wide', P.look || [-1, -0.6])
        }
      }
    }

    // ── 3. planted
    function payoff(t) {
      if (t < T.pay - 0.05) return
      drawSky(x, t, { ...SKY_H, zoom: 1.05 })
      snowGround(x, 1200)
      snowfall(x, t, { n: 40, h: 1200, speed: 40, alpha: 0.6, seed: DAY })
      const ok = popOut(t, T.out)
      if (ok <= 0) return
      const S = { hero, mate, star, pisces, ok, PAY_HOPS, HERO, MATE, day: DAY }
      // the flag drops in and plants
      const fd = prog(t, ...T.flagDrop)
      const fy = lerp(-200, 1215, ease.inCubic(fd))
      const plantSq = t > T.plant && t < T.plant + 0.25 ? Math.sin(Math.PI * (t - T.plant) / 0.25) * 0.08 : 0
      x.save(); x.translate(540, fy); x.scale(1 + plantSq, 1 - plantSq); x.translate(-540, -fy)
      x.globalAlpha = clamp(ok)
      flag(x, t, 500, fy, 600, { k: ease.outBack(prog(t, ...T.unfurl)), text: 'GREEN FLAG', sub: `DEC ${DAY}` })
      x.restore()
      if (t > T.plant) { sparkles(x, t, 520, 1215, T.plant, 12, 160, 1, [GREEN, GOLD, BONE]); confetti(x, t, T.plant + 0.05, 540, 700, { cols: [GREEN, GREEN_L, GOLD, BONE] }) }
      // the pair
      if (cfg.payPair !== false) {
        const hk = pop01(t, T.pay, 0.36, 2.1) * ok, mk = pop01(t, T.pay + 0.1, 0.36, 2.1) * ok
        shadow(x, 280, 1215, 220 * hk); shadow(x, 800, 1215, 220 * mk)
        const wow = t > T.plant && t < T.plant + 0.6
        hero(x, t, { x: 280, y: 1060, s: 240, pop: hk, mood: wow ? 'wide' : cfg.heroMood || 'happy', look: [1, -0.4], hops: PAY_HOPS })
        mate(x, t, { x: 800, y: 1060, s: 240, pop: mk, mood: wow ? 'wide' : cfg.mateMood || 'heart', look: [-1, -0.4], hops: PAY_HOPS.map(h => h + 0.08) })
      }
      if (cfg.payoff) cfg.payoff(x, t, S)
      // THE STARS (small, upper left of the box) and Pisces (fountains, upper right)
      const sk = pop01(t, T.starsIn, 0.38, 2.1) * ok
      if (sk > 0.01) drawStarChar(x, 140, 1310, 120, t, { color: STAR.sky, mood: t > T.last + 1.6 ? 'happy' : 'neutral', look: [1, -0.3], hops: STARS_HOPS, pop: sk, seed: 2, glow: 1.05, tips: false })
      if (cfg.payPisces !== false) {
        const pk = pop01(t, T.starsIn + 0.25, 0.36, 2.2) * ok
        if (pk > 0.01) pisces(x, t, { x: 950, y: 1310, s: 120, pop: pk, hops: [T.strip + 0.02, T.strip + 0.7] }, 3, 'sparkle', [-1, -1])
      }
      // the 24-flag strip
      strip(x, t, ok)
    }
    function strip(x, t, ok) {
      const k = pop01(t, T.pay + 0.4, 0.3, 1.8) * ok
      if (k <= 0.01) return
      const y = 1800, X0 = 92, step = (988 - X0) / 23
      x.save(); x.globalAlpha = clamp(k)
      R(x, 'rgba(6,4,18,0.55)', X0 - 34, y - 46, 988 - X0 + 68, 92)
      for (let n = 1; n <= 24; n++) {
        const cx = X0 + (n - 1) * step
        if (n < DAY || (cfg.allOpen && n !== DAY)) miniFlag(x, cx, y, 5)
        else if (n === DAY) { const pk = pop01(t, T.strip, 0.35, 3); if (pk > 0.01) miniFlag(x, cx, y - 6 * Math.sin(Math.PI * clamp((t - T.strip) / 0.4)), 5 * pk) ; else R(x, 'rgba(239,230,214,0.25)', cx - 4, y - 4, 8, 8) }
        else R(x, 'rgba(239,230,214,0.25)', cx - 4, y - 4, 8, 8)
      }
      x.restore()
      sparkles(x, t, X0 + (DAY - 1) * step, y, T.strip, 8, 40, 2, [GREEN, GOLD, BONE])
    }

    return {
      start: 0, end: STORY_END + 0.01, root,
      update(t) {
        const dP = t - T.plant, shake = dP > 0 && dP < 0.4 ? 12 * Math.exp(-dP * 10) * Math.sin(dP * 55) : 0
        x.save(); x.translate(0, shake)
        if (t < T.calOut) calendar(t)
        else if (t < T.cut + 0.02) { drawSky(x, t, SKY_H); scene(t) }
        else payoff(t)
        x.restore()
        tx.clearRect(0, 0, 1080, 1920)
        if (cfg.top) cfg.top(tx, t)
        H0.update(t, outK(t, T.h0Out))
        H1.update(t, outK(t, T.out))
        sticker.update(t)
        box1.update(t)
        bug.update(t, outK(t, T.bugOut))
        const fl = t >= T.burst && t < T.burst + 0.25 ? 1 - (t - T.burst) / 0.25 : 0
        flash.style.opacity = String(0.8 * fl)
        drawGrain(gx, t)
      },
    }
  }

  // one card-cut candidate: between the scene and the payoff
  const CUTS = [{ t: T.cut, kind: 'flip' }]
  const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl br' }), cardCuts(CUTS)]

  // ── sound (pitched SFX are shifted into the film's key by the engine)
  const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
  const wordPops = (t0, n, gap, b0 = 0, gain = 0.024) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(b0 + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
  const S0 = T.scene[0]
  const CUES = [
    ['pop', 0.02, 987.77, 0.03, -0.3], ['pluck', 0.62, 1174.66, 0.025, 0.3, -0.3], ['pluck', 1.1, 1318.51, 0.025, 0.3, -0.3],
    ['pluck', 0.9, 2349.32, 0.012, 0.3, 0.6],
    // push-in, creak, the door swings, light burst
    ['whoosh', T.zoom[0], 0.6, 0.035], ['riser', T.zoom[0], T.door[1], 0.02],
    ['tick', T.door[0], 0.05], ['tick', T.door[0] + 0.12, 0.04], ['pluck', T.door[0] + 0.05, 220, 0.02, 0.6, 0],
    ['bell', T.burst, 1760, 0.035, 1.4, 0], ['bell', r3(T.burst + 0.08), 2349.32, 0.025, 1.2, 0.2], ['glitter', T.burst, r3(T.burst + 0.6)],
    // the sticker
    ['pop', T.sticker, 1174.66, 0.045, 0.1], ['pop', r3(T.sticker + 0.07), 1567.98, 0.03, -0.1], ['tick', r3(T.sticker + 0.02), 0.04],
    ['pluck', r3(S0 + 0.6), 2349.32, 0.012, 0.3, 0.6],
    ...(cfg.cues || []).map(c => [c[0], r3(c[1] + S0), ...c.slice(2)]),
    // planted
    ...wordPops(T.h1, 4, 0.08, 2),
    ['whoosh', T.flagDrop[0], 0.38, 0.035], ['boom', T.plant, 0.3], ['tom', T.plant, 92, { gain: 0.3, decay: 0.3 }], ['tick', T.plant, 0.07],
    ['whoosh', T.unfurl[0], 0.3, 0.02], ['bell', r3(T.unfurl[1]), 1760, 0.03, 1.1, 0], ['glitter', T.plant, r3(T.plant + 0.5)],
    ['pop', T.starsIn + 0.05, 739.99, 0.035, -0.4], ['pop', T.starsIn + 0.3, 987.77, 0.03, 0.4],
    ...talkCues(LINES, { cps: CPS }),
    ['pop', T.strip, 1318.51, 0.045, 0], ['pop', r3(T.strip + 0.08), 1760, 0.035, 0], ['glitter', T.strip, r3(T.strip + 0.3)],
    ['whoosh', T.out[0], 0.35, 0.03],
    ...cardCutCues(CUTS),
    ...endcardCues(STORY_END),
  ]
  return { DURATION, SCENES, CUES, T, CUTS }
}

/** the cues.js config for an episode */
export function musicConfig(id, style, key, seed, { breakdown = 5.6 } = {}) {
  return { id, duration: DURATION, music: { style, key, seed, sections: { drop: T.burst, breakdown: [breakdown], lift: [T.cut], outroAt: DURATION - 4.4 }, hits: [T.plant] } }
}
