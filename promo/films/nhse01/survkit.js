// HOLIDAY SURVIVAL GUIDE: the shared look of the Next-30 series nhse01–nhse24 (promo/films/next30/b29.md).
// Lives in nhse01's folder; every other episode imports it from '../../nhse01/survkit.js'. Read-only for other films.
//
// The format (30 s, story 0–25.6, then the shared 4.4 s end card):
//   0.00–6.60   ACT 0 · the problem. The hook headline is fully on screen at frame 0 (the thumbnail) and the hero is
//               mid-action. Pisces sniffles in the background with a tissue box.
//   6.60–13.90  ACT 1 · it escalates (hard cut: white flash + zoom punch). Optional character line in a dialogue box.
//   13.90       the one card cut (cardfx flip).
//   13.90–21.60 ACT 2 · THE STARS give the tip: two dialogue lines (14.55, 17.55); the episode shows the fix.
//   21.60–25.60 ACT 3 · the payoff: the SURVIVAL KIT tin pops open, the episode's item drops in with a label; the hero
//               and Pisces (happy tears) cheer; THE STARS say the last line (22.45, box shuts 25.5).
//
//   makeSurv(cfg) → { DURATION, SCENES, CUES, T }
//     cfg.id, cfg.ep (episode number for the bug), cfg.hero ('gemini'…), cfg.accent (headline accent colour)
//     cfg.heads: [hook, escalation, tip, payoff]   popText strings ('|' = line break, '*word*' = italic accent)
//     cfg.acts:  [draw0, draw1, draw2, extra3?]    draw(x, t, S) with S = { u, t0, t1, i, hero, star, pisces, HERO }
//     cfg.line1: optional { t, speaker, color, text } said in act 1 (box 1)
//     cfg.tips:  [tip line 1, tip line 2] (THE STARS)      cfg.last: the last line (THE STARS)
//     cfg.item:  { label: 'BLANK SQUARE', draw(x, t, cx, cy, s) }  the kit item (drawn centred, s ≈ 1 at full size)
//     cfg.pis:   [P0, P1, P2] Pisces spots per act ({ x, y, s, look, tears, noTissues } or null = the act draws it)
//     cfg.cues:  [[...act 0 cues], [...act 1], [...act 2], [...act 3]] times relative to the act start
//     cfg.finaleHero: optional (x, t, S) to draw the hero in the payoff (default: hero hops on the left)
// Everything draws as a pure function of t; DOM / canvases are only made inside build().
import { clamp, lerp, prog, ease, el } from '../../src/lib.js'
import { fill } from '../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas, drawPixelStar } from '../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, signStar, STAR } from '../startalk.js'
import { popText } from '../lesson.js'

export const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', LAV = '#c9a6ff', RED = '#e8344e'
export const MINT = '#8fe8d0', ICE = '#bfe8ff', PINE = '#2f8a5a', CREAM = '#fff1c8', SKYB = '#7fd0ff', GREEN = '#9fe6b0'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const SERIF = "'EB Garamond', Georgia, serif"
export const MONO = "'Space Mono', ui-monospace, monospace"
export const r3 = v => +v.toFixed(3)
export const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
export const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
/** 0→1→0 window: rises over [a, a+r], holds, falls over [b-r, b] */
export const win = (t, a, b, r = 0.2) => Math.min(clamp((t - a) / r), clamp((b - t) / r))
export { clamp, lerp, prog, ease, easeOutBack, drawStarChar, signStar, STAR, drawPixelStar }

// ── the fixed timeline (same in every episode)
export const DURATION = 30
export const STORY_END = DURATION - ENDCARD_LEN          // 25.6
export const T = {
  bug: -1,
  acts: [[0, 6.6], [6.6, 13.9], [13.9, 21.6], [21.6, STORY_END]],
  heads: [-1, 6.72, 14.05, 21.72],
  headOut: [[6.42, 6.6], [13.6, 13.8], [21.38, 21.58], [25.15, 25.45]],
  cut: 13.9,
  starsIn: 14.15, tip1: 14.55, tip2: 17.55, box2Close: 21.2,
  kitIn: 21.62, lid: 21.95, drop: [22.05, 22.42], tag: 22.5,
  last: 22.45, boxClose: 25.5,
  out: [25.12, 25.5], bugOut: [25.25, 25.55],
}
export const CPS = 30

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
export function hearts(x, t, t0, cx, cy, { n = 5, cell = 6, spread = 120, life = 1.4, cols = ['#ff5c8a', PINK, GOLD] } = {}) {
  for (let i = 0; i < n; i++) {
    const b = t0 + i * 0.16, p = (t - b) / life
    if (p < 0 || p > 1) continue
    const hx = cx + Math.sin(i * 2.3) * spread * 0.5 + Math.sin(t * 3 + i) * 10, hy = cy - p * 200
    drawBits(x, HEART, { H: cols[i % cols.length] }, hx, hy, cell * (0.6 + 0.4 * Math.min(1, p * 4)), { alpha: 1 - ease.inQuad(p) })
  }
}
/** pixel confetti falling from a burst at t0 */
export function confetti(x, t, t0, cx, cy, { n = 26, life = 2.2, cols = [GOLD, PINK, SKYB, GREEN, BONE] } = {}) {
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
export function bubble(x, t, cx, cy, t0, t1, text, { col = BONE, ink = INK, size = 34, tail = 0, font = INTER, weight = 800, maxW = 900 } = {}) {
  const k = pop01(t, t0, 0.25, 2.4) * outK(t, [t1 - 0.15, t1])
  if (k <= 0.01 || t < t0) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.font = `${weight} ${size}px ${font}`
  const w = Math.min(maxW, x.measureText(text).width + 44), h = size + 32
  x.fillStyle = INK; x.fillRect(-w / 2 - 5, -h / 2, w + 10, h); x.fillRect(-w / 2, -h / 2 - 5, w, h + 10)
  x.fillStyle = col; x.fillRect(-w / 2, -h / 2, w, h)
  const tx = tail * (w / 2 - 40)
  x.fillStyle = INK; x.fillRect(tx - 14, h / 2 + 4, 14, 12); x.fillRect(tx - 7, h / 2 + 14, 8, 8)
  x.fillStyle = col; x.fillRect(tx - 9, h / 2, 9, 9)
  x.fillStyle = ink; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 2, maxW - 30)
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
/** plain ink text on a prop (no shadow) */
export function ink(x, text, cx, cy, { size = 26, col = INK, align = 'center', font = MONO, weight = 700, rot = 0, maxW } = {}) {
  x.save(); x.translate(cx, cy); x.rotate(rot)
  x.font = `${weight} ${size}px ${font}`; x.textAlign = align; x.textBaseline = 'middle'; x.fillStyle = col
  if (maxW) x.fillText(text, 0, 0, maxW); else x.fillText(text, 0, 0)
  x.restore()
}
/** a soft floor shadow */
export function shadow(x, cx, cy, w, a = 0.35) { x.save(); x.globalAlpha = a; x.fillStyle = '#05030c'; x.beginPath(); x.ellipse(cx, cy, w / 2, w * 0.09, 0, 0, Math.PI * 2); x.fill(); x.restore() }
/** a warm glow pool */
export function glow(x, cx, cy, r, a, col = '255,214,150') {
  if (a <= 0) return
  const g = x.createRadialGradient(cx, cy, 0, cx, cy, r); g.addColorStop(0, `rgba(${col},${a})`); g.addColorStop(1, `rgba(${col},0)`)
  x.fillStyle = g; x.fillRect(cx - r, cy - r, 2 * r, 2 * r)
}
/** a warm spotlight cone from (tx, top) down to an ellipse at (bx, by) */
export function spotlight(x, tx, top, bx, by, w, a, col = '255,236,180') {
  if (a <= 0) return
  x.save(); x.globalCompositeOperation = 'lighter'
  const g = x.createLinearGradient(0, top, 0, by)
  g.addColorStop(0, `rgba(${col},${0.05 * a})`); g.addColorStop(1, `rgba(${col},${0.26 * a})`)
  x.fillStyle = g; x.beginPath(); x.moveTo(tx - 30, top); x.lineTo(tx + 30, top); x.lineTo(bx + w / 2, by); x.lineTo(bx - w / 2, by); x.closePath(); x.fill()
  x.restore()
}

// ── winter set pieces
/** falling pixel snow (deterministic) inside [x0, x1] × [y0, y1] */
export function snow(x, t, { x0 = 0, x1 = 1080, y0 = 0, y1 = 1920, n = 60, alpha = 0.8, speed = 1, seed = 1 } = {}) {
  x.save(); x.globalAlpha *= alpha; x.fillStyle = '#f4f8ff'
  for (let i = 0; i < n; i++) {
    const h1 = Math.sin(i * 12.9898 + seed * 78.233) * 43758.5453, h = h1 - Math.floor(h1)
    const h2 = Math.sin(i * 4.1414 + seed * 9.17) * 24634.6345, g = h2 - Math.floor(h2)
    const v = (40 + 60 * g) * speed, sz = g > 0.7 ? 8 : g > 0.35 ? 6 : 4
    const py = y0 + (((h * (y1 - y0) + t * v) % (y1 - y0)) + (y1 - y0)) % (y1 - y0)
    const px = x0 + h * (x1 - x0) + Math.sin(t * (0.8 + g) + i) * 14
    x.fillRect(Math.round(px / 2) * 2, Math.round(py / 2) * 2, sz, sz)
  }
  x.restore()
}
const BULBS = ['#ff5c6c', GOLD, '#6fe0a0', SKYB, PINK]
/** a sagging string of twinkling bulbs from (xa, y) to (xb, y) */
export function stringLights(x, t, xa, xb, y, { sag = 40, n = 12, size = 12, seed = 0 } = {}) {
  x.save(); x.strokeStyle = INK; x.lineWidth = 4; x.beginPath()
  for (let i = 0; i <= 24; i++) { const f = i / 24, px = lerp(xa, xb, f), py = y + sag * Math.sin(Math.PI * f); if (i) x.lineTo(px, py); else x.moveTo(px, py) }
  x.stroke()
  for (let i = 0; i < n; i++) {
    const f = (i + 0.5) / n, px = lerp(xa, xb, f), py = y + sag * Math.sin(Math.PI * f) + 6
    const on = 0.55 + 0.45 * Math.sin(t * 3 + i * 1.7 + seed)
    const c = BULBS[(i + seed) % BULBS.length]
    glow(x, px, py + size, size * 3.2, 0.22 * on, c === GOLD ? '242,199,92' : c === SKYB ? '127,208,255' : c === PINK ? '255,143,177' : c === '#6fe0a0' ? '111,224,160' : '255,92,108')
    R(x, INK, px - size / 2 - 3, py - 3, size + 6, size * 1.4 + 6); R(x, c, px - size / 2, py, size, size * 1.4)
    R(x, 'rgba(255,255,255,0.6)', px - size / 2 + 2, py + 2, size / 3, size / 3)
  }
  x.restore()
}
/** a cosy interior: back wall, window with snow, a floor line, optional string lights */
export function room(x, t, { wall = '#2a1f4a', wall2 = '#33275a', floorY = 1240, floor = '#3b2a2a', win: W0 = { x: 640, y: 470, w: 300, h: 340 }, lights = true, alpha = 1 } = {}) {
  x.save(); x.globalAlpha *= alpha
  R(x, wall, 0, 280, 1080, floorY - 280)
  for (let i = 0; i < 9; i++) R(x, wall2, i * 130 + 30, 280, 54, floorY - 280)       // wallpaper stripes
  R(x, INK, 0, floorY - 8, 1080, 12); R(x, floor, 0, floorY + 4, 1080, 1920 - floorY)
  for (let i = 0; i < 8; i++) R(x, 'rgba(0,0,0,0.18)', 0, floorY + 40 + i * 90, 1080, 6)
  if (W0) {
    box(x, W0.x, W0.y, W0.w, W0.h, '#16224a', { b: 10 })
    x.save(); x.beginPath(); x.rect(W0.x, W0.y, W0.w, W0.h); x.clip()
    const g = x.createLinearGradient(0, W0.y, 0, W0.y + W0.h); g.addColorStop(0, '#0d1638'); g.addColorStop(1, '#2a3a6e'); x.fillStyle = g; x.fillRect(W0.x, W0.y, W0.w, W0.h)
    snow(x, t, { x0: W0.x, x1: W0.x + W0.w, y0: W0.y, y1: W0.y + W0.h, n: 22, seed: 3 })
    R(x, '#e8f0ff', W0.x, W0.y + W0.h - 30, W0.w, 30)
    x.restore()
    R(x, INK, W0.x + W0.w / 2 - 5, W0.y, 10, W0.h); R(x, INK, W0.x, W0.y + W0.h / 2 - 5, W0.w, 10)
    R(x, '#5a3d2a', W0.x - 24, W0.y + W0.h + 8, W0.w + 48, 18)
  }
  if (lights) stringLights(x, t, -20, 1100, 300, { sag: 50, n: 14 })
  x.restore()
}
/** a table with a cloth, top at y */
export function table(x, cx, y, w, { cloth = '#b8374a', trim = '#f2e6c9' } = {}) {
  box(x, cx - w / 2, y, w, 34, cloth, { b: 6, hi: 'rgba(255,255,255,0.18)' })
  R(x, cloth, cx - w / 2, y + 34, w, 46); R(x, trim, cx - w / 2, y + 70, w, 10)
  R(x, INK, cx - w / 2 + 20, y + 86, 18, 140); R(x, INK, cx + w / 2 - 38, y + 86, 18, 140)
}
/** a wrapped gift box (bottom-centred on (cx, by)) */
export function gift(x, cx, by, w, h, col, { ribbon = GOLD, lid = 0, rot = 0 } = {}) {
  x.save(); x.translate(cx, by); x.rotate(rot)
  box(x, -w / 2, -h, w, h, col, { b: 6, hi: 'rgba(255,255,255,0.2)' })
  R(x, ribbon, -w * 0.07, -h, w * 0.14, h)
  const ly = -h - 18 - lid
  box(x, -w / 2 - 10, ly, w + 20, 22, col, { b: 6 }); R(x, ribbon, -w * 0.07, ly, w * 0.14, 22)
  drawBits(x, ['RR.RR', 'RRRRR', '..R..'], { R: ribbon }, 0, ly - 14, Math.max(5, w / 22))
  x.restore()
}
/** a mug of cocoa with steam */
export function mug(x, t, cx, cy, s = 1, col = '#e86a5a') {
  box(x, cx - 26 * s, cy - 30 * s, 52 * s, 60 * s, col, { b: 5, hi: 'rgba(255,255,255,0.25)' })
  R(x, '#6b3f2a', cx - 22 * s, cy - 28 * s, 44 * s, 8 * s)
  R(x, INK, cx + 26 * s, cy - 18 * s, 18 * s, 32 * s); R(x, col, cx + 30 * s, cy - 12 * s, 9 * s, 20 * s)
  x.save(); x.globalAlpha = 0.5
  for (let i = 0; i < 3; i++) { const p = ((t * 0.7 + i / 3) % 1); R(x, '#f4f0ff', cx - 14 * s + i * 12 * s + Math.sin(t * 3 + i) * 5, cy - 40 * s - p * 60 * s, 6 * s, 10 * s) }
  x.restore()
}
/** a tissue box (Pisces' constant companion) */
export function tissues(x, cx, cy, s, { col = '#9fd8f6', pull = 0 } = {}) {
  box(x, cx - s / 2, cy - s * 0.3, s, s * 0.6, col, { b: 4, hi: '#c9ecfb' })
  R(x, INK, cx - s * 0.18 - 4, cy - s * 0.3 - 4, s * 0.36 + 8, 8)
  R(x, '#ffffff', cx - s * 0.12, cy - s * 0.3 - s * 0.32 - pull, s * 0.24, s * 0.34)
}
/** a phone with a chat thread. msgs: [{ at, side: 'L'|'R', text }]; shows messages with at <= t, newest at the bottom */
export function phone(x, t, { cx, cy, w = 420, h = 640, title = '', msgs = [], rot = 0, alpha = 1, size = 26, typing = null } = {}) {
  if (alpha <= 0) return
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot)
  box(x, -w / 2, -h / 2, w, h, '#2a2148', { b: 8 })
  R(x, '#14102a', -w / 2 + 14, -h / 2 + 50, w - 28, h - 80)
  R(x, '#3a2f66', -w / 2 + 14, -h / 2 + 14, w - 28, 36)
  ink(x, title, 0, -h / 2 + 33, { size: 20, col: BONE })
  x.beginPath(); x.rect(-w / 2 + 14, -h / 2 + 50, w - 28, h - 80); x.clip()
  // lay out bottom-up
  x.font = `700 ${size}px ${INTER}`
  const maxW = w - 110, lines = []
  const shown = msgs.filter(m => t >= m.at)
  for (const m of shown) {
    const words = m.text.split(' '), rows = []; let cur = ''
    for (const wd of words) { const tr = cur ? cur + ' ' + wd : wd; if (x.measureText(tr).width > maxW && cur) { rows.push(cur); cur = wd } else cur = tr }
    rows.push(cur)
    lines.push({ m, rows, bw: Math.max(...rows.map(r => x.measureText(r).width)) + 32 })
  }
  let y = h / 2 - 46
  if (typing && t > typing[0] && t < typing[1]) {
    R(x, '#4a3f7a', -w / 2 + 30, y - 40, 90, 40)
    for (let i = 0; i < 3; i++) R(x, BONE, -w / 2 + 48 + i * 22, y - 26 + (Math.floor(t * 6 + i) % 2 ? -4 : 0), 10, 10)
    y -= 56
  }
  for (let n = lines.length - 1; n >= 0; n--) {
    const { m, rows, bw } = lines[n], bh = rows.length * (size + 8) + 22
    const k = pop01(t, m.at, 0.22, 2.2)
    const L = m.side === 'L', bx = L ? -w / 2 + 30 : w / 2 - 30 - bw
    x.save(); x.translate(bx + (L ? 0 : bw), y - bh / 2); x.scale(k, k); x.translate(-(bx + (L ? 0 : bw)), -(y - bh / 2))
    R(x, L ? '#4a3f7a' : (m.col || '#3fa88a'), bx, y - bh, bw, bh)
    x.fillStyle = BONE; x.textAlign = 'left'; x.textBaseline = 'top'
    rows.forEach((r, i) => x.fillText(r, bx + 16, y - bh + 12 + i * (size + 8)))
    x.restore()
    y -= bh + 14
    if (y < -h / 2 + 50) break
  }
  x.restore()
}
/** a paper note with lines of text */
export function note(x, cx, cy, w, h, lines, { rot = 0, col = CREAM, size = 30, font = MONO, weight = 700, ink: ic = INK, k = 1 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  R(x, 'rgba(6,4,18,0.45)', -w / 2 + 12, -h / 2 + 14, w, h)
  box(x, -w / 2, -h / 2, w, h, col, { b: 5 })
  lines.forEach((l, i) => ink(x, l, 0, -h / 2 + (i + 0.5) * (h / lines.length), { size, font, weight, col: ic, maxW: w - 30 }))
  x.restore()
}
/** a month calendar: cols × rows of squares; marks[i] = colour / 'X' / text per square */
export function calendar(x, cx, cy, w, { cols = 7, rows = 4, marks = {}, title = 'DECEMBER', k = 1 } = {}) {
  if (k <= 0.01) return
  const cw = (w - 40) / cols, hh = cw * rows + 110
  x.save(); x.translate(cx, cy); x.scale(k, k)
  box(x, -w / 2, -hh / 2, w, hh, BONE, { b: 7 })
  R(x, '#c8463c', -w / 2, -hh / 2, w, 76); ink(x, title, 0, -hh / 2 + 40, { size: 36, col: BONE, font: INTER, weight: 800 })
  for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
    const n = j * cols + i, X = -w / 2 + 20 + i * cw, Y = -hh / 2 + 94 + j * cw
    R(x, '#d9cfbd', X, Y, cw - 6, cw - 6)
    const m = marks[n]
    if (m) {
      if (m.fill) R(x, m.fill, X + 4, Y + 4, cw - 14, cw - 14)
      if (m.text) ink(x, m.text, X + (cw - 6) / 2, Y + (cw - 6) / 2, { size: m.size || 18, col: m.col || INK, font: INTER, weight: 800, maxW: cw - 12 })
      if (m.ring) { x.strokeStyle = m.ring; x.lineWidth = 6; x.beginPath(); x.ellipse(X + (cw - 6) / 2, Y + (cw - 6) / 2, cw * 0.5, cw * 0.44, 0, 0, Math.PI * 2); x.stroke() }
    }
  }
  x.restore()
}
/** a door (bottom-centred), open 0…1 swings the leaf */
export function door(x, cx, by, { w = 200, h = 380, col = '#8a4a3a', open = 0, wreath = true, light = 0 } = {}) {
  box(x, cx - w / 2 - 14, by - h - 14, w + 28, h + 14, '#5a3428', { b: 6 })
  if (open > 0) { R(x, '#ffd896', cx - w / 2, by - h, w, h); glow(x, cx, by - h / 2, w * 1.6, 0.25 * open + light) }
  const lw = w * (1 - 0.8 * open)
  box(x, cx - w / 2, by - h, lw, h, col, { b: 5, hi: 'rgba(255,255,255,0.12)' })
  if (open < 0.6) {
    R(x, GOLD, cx - w / 2 + lw - 30, by - h / 2, 14, 14)
    if (wreath) { x.save(); x.strokeStyle = PINE; x.lineWidth = 14; x.beginPath(); x.arc(cx - w / 2 + lw / 2, by - h + 90, 40, 0, Math.PI * 2); x.stroke(); R(x, RED, cx - w / 2 + lw / 2 - 10, by - h + 125, 20, 16); x.restore() }
  }
}
/** a battery meter (centre), level 0…1 */
export function battery(x, t, cx, cy, level, { w = 200, h = 90, k = 1 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  box(x, -w / 2, -h / 2, w, h, '#14102a', { b: 8 }); R(x, INK, w / 2 + 6, -h / 4, 20, h / 2)
  const col = level < 0.15 ? RED : level < 0.5 ? GOLD : '#5fd38a'
  const blink = level < 0.15 ? (Math.floor(t * 4) % 2 ? 0.35 : 1) : 1
  x.globalAlpha *= blink
  R(x, col, -w / 2 + 8, -h / 2 + 8, Math.max(8, (w - 16) * level), h - 16)
  x.globalAlpha = 1
  label(x, `${Math.round(level * 100)}%`, 0, h / 2 + 34, { size: 34, col })
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
/** a pixel item worn on top of the sprite (sprite cells): 'beanie' | 'crown' | 'shades' | 'scarf' | 'pjs' */
export function wear(ctx, kind, col = RED) {
  const P = (c, i, j, w = 1, h = 1) => { ctx.fillStyle = c; ctx.fillRect(i, j, w, h) }
  if (kind === 'beanie') { P(INK, 11, 0.6, 14, 6.4); P(col, 12, 1.4, 12, 5); P(BONE, 11.5, 5.2, 13, 2.2); P(INK, 16.5, -1.6, 3, 2.6); P(BONE, 17, -1.2, 2, 2) }
  if (kind === 'crown') { P(INK, 13, -1.2, 10, 5.2); P(GOLD, 13.6, -0.6, 8.8, 4.2); P(INK, 15.5, -0.6, 1, 1.6); P(INK, 19.5, -0.6, 1, 1.6); P(RED, 17.6, 1.4, 1, 1) }
  if (kind === 'shades') { for (const ex of [13.4, 22.6]) { P(INK, ex - 3.6, 16, 7.2, 5.2); P('#2b2140', ex - 3, 16.6, 6, 4); P('rgba(255,255,255,0.75)', ex - 2.4, 17.2, 1.6, 0.8) } P(INK, 16.8, 17, 2.4, 1.2) }
  if (kind === 'scarf') { P(INK, 9, 23.6, 18, 3.8); P(col, 9.6, 24.2, 16.8, 2.6); P(INK, 22, 26.6, 3.6, 6); P(col, 22.6, 27.2, 2.4, 4.8); P(BONE, 9.6, 25.2, 16.8, 0.6) }
}

// ── the series bug: a pixel thermos + "HOLIDAY SURVIVAL GUIDE" in Inter 800 small caps, icy mint, letter-spaced
function buildBug(root, ep) {
  const b = el('div', { position: 'absolute', left: '56px', top: '56px', height: '44px', display: 'flex', alignItems: 'center', gap: '14px', transformOrigin: '0% 50%', pointerEvents: 'none' }, root)
  const th = el('canvas', { width: '18px', height: '30px', imageRendering: 'pixelated' }, b)
  th.width = 6; th.height = 10
  { const c = th.getContext('2d'); const P = (col, i, j, w, h) => { c.fillStyle = col; c.fillRect(i, j, w, h) }
    P(INK, 1, 0, 4, 2); P(RED, 0, 2, 6, 8); P(BONE, 0, 5, 6, 2); P('rgba(255,255,255,0.5)', 1, 3, 1, 6) }
  th.style.width = '18px'; th.style.height = '30px'; th.style.filter = 'drop-shadow(0 0 6px rgba(143,232,208,0.6))'
  el('div', { font: `800 28px ${INTER}`, letterSpacing: '0.2em', color: MINT, textShadow: '0 2px 12px rgba(6,4,18,0.9)', whiteSpace: 'nowrap', fontVariant: 'small-caps' }, b,
    `HOLIDAY&nbsp;SURVIVAL&nbsp;GUIDE<span style="color:rgba(255,255,255,0.6)">&nbsp;·&nbsp;No.&nbsp;${ep}</span>`)
  return {
    update(t, out = 1) {
      b.style.display = out <= 0.01 ? 'none' : 'flex'
      b.style.opacity = String(out)
    },
  }
}

// ── the SURVIVAL KIT tin (canvas), centred on (cx, cy); lid 0…1 opens
function drawTin(x, t, cx, cy, k, lid) {
  if (k <= 0.01) return
  const w = 440, h = 250
  x.save(); x.translate(cx, cy); x.scale(k, k)
  shadow(x, 0, h / 2 + 18, w * 1.1, 0.45)
  // inside (dark) shows when the lid is up
  R(x, INK, -w / 2 - 8, -h / 2 - 8, w + 16, 30)
  R(x, '#2a1530', -w / 2 + 6, -h / 2 - 2, w - 12, 18)
  // lid, hinged at the back: squashes upward as it opens
  const lh = 64, ly = -h / 2 - lh * (0.25 + 0.75 * (1 - lid)) - lid * 70
  x.save(); x.translate(0, -h / 2); x.scale(1, 1 - 0.75 * lid); x.translate(0, h / 2)
  box(x, -w / 2 - 14, -h / 2 - lh + 6 - lid * 60, w + 28, lh, '#d24a3c', { b: 8, hi: '#ff7a68' })
  for (let i = 0; i < 6; i++) R(x, GOLD, -w / 2 + 10 + i * (w / 6), -h / 2 - lh + 30 - lid * 60, 22, 10)
  x.restore()
  void ly
  // body
  box(x, -w / 2, -h / 2 + 10, w, h - 10, '#c8463c', { b: 8, hi: '#e8685a', lo: '#9a3028' })
  R(x, GOLD, -w / 2, -h / 2 + 30, w, 10); R(x, GOLD, -w / 2, h / 2 - 34, w, 10)
  // label plate
  box(x, -150, -38, 300, 92, BONE, { b: 6 })
  ink(x, 'SURVIVAL', 0, -12, { size: 36, font: INTER, weight: 800, col: INK })
  ink(x, 'KIT', 0, 26, { size: 32, font: INTER, weight: 800, col: '#c8463c' })
  drawBits(x, ['..W..', '..W..', 'WWWWW', '..W..', '..W..'], { W: '#c8463c' }, -118, 6, 6, { outline: null })
  drawBits(x, ['..W..', '..W..', 'WWWWW', '..W..', '..W..'], { W: '#c8463c' }, 118, 6, 6, { outline: null })
  x.restore()
}

// ═══════════════════════════════════════════════════════════════════════════ the episode
export function makeSurv(cfg) {
  const HERO = signStar(cfg.hero), PIS = signStar('pisces')
  const SPEAK = 'THE STARS'
  const L1 = cfg.line1 ? [cfg.line1] : null
  const L2 = [{ t: T.tip1, speaker: SPEAK, text: cfg.tips[0] }, { t: T.tip2, speaker: SPEAK, text: cfg.tips[1] }]
  const L3 = [{ t: T.last, speaker: SPEAK, text: cfg.last }]
  const STARS_HOPS = [T.starsIn + 0.3, ...talkHops(L2, SPEAK, { cps: CPS }), ...talkHops(L3, SPEAK, { cps: CPS })]
  const HERO_FIN_HOPS = [T.kitIn + 0.1, T.drop[1] + 0.02, T.drop[1] + 0.5, T.last + 1.8]
  const PIS_DEF = [{ x: 930, y: 1260, s: 120 }, { x: 930, y: 1260, s: 120 }, { x: 935, y: 560, s: 110 }]

  const star = (sign, x, t, o = {}) => { const S = sign === 'stars' ? { color: STAR.sky, glyph: null } : signStar(sign); return drawStarChar(x, o.x, o.y, o.s, t, { color: S.color, glyph: o.s >= 150 ? S.glyph : null, seed: 5, glow: 1, ...o }) }
  const hero = (x, t, o = {}) => drawStarChar(x, o.x, o.y, o.s, t, { color: HERO.color, glyph: o.s >= 150 ? HERO.glyph : null, seed: 3, glow: 1.1, ...o })
  function pisces(x, t, P, tears = 1, mood = 'wide', look = [-1, -0.5]) {
    const opts = { color: PIS.color, glyph: P.s >= 150 ? PIS.glyph : null, mood, look, seed: 6, glow: 0.8, pop: P.pop ?? 1, alpha: P.alpha ?? 1, hops: P.hops, tips: false, squash: P.squash || 0 }
    drawStarChar(x, P.x, P.y, P.s, t, opts)
    const F = starFrame(P.x, P.y, P.s, t, opts)
    if (tears) inSprite(x, F, () => tearsCells(x, t, tears))
    return F
  }

  // readability guard (dev): every box line holds ≥ 1.5 s after it finishes typing
  if (typeof process !== 'undefined' && process.env && process.env.SURV_CHECK) {
    const chk = (lines, close) => { const tm = lineTimes(lines, { cps: CPS }); tm.forEach((m, i) => { const nxt = i + 1 < lines.length ? lines[i + 1].t : close; if (nxt - m.done < 1.5) console.warn(`[${cfg.id}] line "${lines[i].text}" holds only ${(nxt - m.done).toFixed(2)} s`) }) }
    if (L1) chk(L1, cfg.line1.close); chk(L2, T.box2Close); chk(L3, T.boxClose)
  }

  async function build(stage) {
    try {
      await Promise.all(["800 112px Inter", "800 50px Inter", "800 36px Inter", "800 28px Inter", "700 30px Inter", "italic 500 150px 'EB Garamond'", "italic 500 64px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 26px 'Space Mono'", "700 20px 'Space Mono'"].map(f => document.fonts.load(f)))
    } catch (_) { /* fonts optional */ }
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const acc = cfg.accent || HERO.color
    const hs = cfg.headSize || [96, 96, 92, 92]
    const HEADS = cfg.heads.map((h, i) => popText(root, h, { top: i === 0 ? 168 : 172, size: hs[i], accentSize: Math.round(hs[i] * 1.36), at: T.heads[i], gap: 0.09, accentColor: i === 2 ? GOLD : i === 3 ? MINT : acc, fit: true, wobble: i === 0 }))
    const box1 = L1 ? dialogueBox(root, { lines: L1, y: 1400, open: L1[0].t - 0.22, close: cfg.line1.close, cps: CPS }) : null
    const box2 = dialogueBox(root, { lines: L2, y: 1400, open: T.tip1 - 0.25, close: T.box2Close, cps: CPS })
    const box3 = dialogueBox(root, { lines: L3, y: 1400, open: T.last - 0.22, close: T.boxClose, cps: CPS })
    const top = layerCanvas(root), tx = top.getContext('2d')
    const bug = buildBug(root, cfg.ep)
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
    const flash = el('div', { position: 'absolute', inset: 0, background: '#fff6ea', opacity: 0, pointerEvents: 'none' }, root)

    function payoff(t) {
      const [a] = T.acts[3]
      if (t < a || t > T.out[1]) return
      const ok = popOut(t, T.out)
      if (ok <= 0) return
      const tinK = pop01(t, T.kitIn, 0.4, 2.0) * ok
      const lid = ease.outBack(prog(t, T.lid, T.lid + 0.3))
      glow(x, 540, 960, 520, 0.18 * tinK)
      // hero (left) and Pisces (right) cheer
      if (cfg.finaleHero) cfg.finaleHero(x, t, { hero, star, pisces, ok, HOPS: HERO_FIN_HOPS })
      else { shadow(x, 200, 1300, 200 * ok); hero(x, t, { x: 200, y: 1150, s: 210, pop: ok, mood: t > T.drop[1] ? 'happy' : 'wide', look: [1, -0.3], hops: HERO_FIN_HOPS }) }
      if (!cfg.finaleNoPisces) {
        tissues(x, 1000, 1290, 80 * ok, { pull: 8 * Math.abs(Math.sin(t * 4)) })
        pisces(x, t, { x: 880, y: 1150, s: 190, pop: pop01(t, T.kitIn + 0.15, 0.36, 2.2) * ok, hops: [T.drop[1] + 0.05, T.drop[1] + 0.45, T.last + 1.2] }, 3, 'sparkle', [-1, -0.6])
      }
      // the item: drops from above, bounces, then floats above the open tin
      const dp = prog(t, ...T.drop)
      const iy = dp < 1 ? lerp(320, 820, ease.inCubic(dp)) : 820 - 70 * ease.outBack(prog(t, T.drop[1], T.drop[1] + 0.45)) + 6 * Math.sin((t - T.drop[1]) * 3)
      const ik = (t >= T.drop[0] ? 1 : 0) * ok
      if (ik > 0) {
        const sq = t > T.drop[1] && t < T.drop[1] + 0.12 ? 0.15 * Math.sin(Math.PI * (t - T.drop[1]) / 0.12) : 0
        x.save(); x.translate(540, iy); x.scale(1 + sq, 1 - sq); cfg.item.draw(x, t, 0, 0, 1); x.restore()
      }
      drawTin(x, t, 540, 1010, tinK, lid)
      sparkles(x, t, 540, 820, T.drop[1] + 0.02, 12, 220, 1, [GOLD, MINT, BONE])
      // the item's tag
      const gk = pop01(t, T.tag, 0.3, 2.6) * ok
      if (gk > 0.01) {
        x.save(); x.translate(540, 1240); x.rotate(-0.03); x.scale(gk, gk)
        x.font = `800 34px ${INTER}`
        const w = x.measureText('+ ' + cfg.item.label).width + 50
        box(x, -w / 2, -32, w, 64, MINT, { b: 6 })
        ink(x, '+ ' + cfg.item.label, 0, 2, { size: 34, font: INTER, weight: 800, col: INK })
        x.restore()
      }
      if (cfg.acts[3]) cfg.acts[3](x, t, { u: t - a, t0: a, t1: STORY_END, i: 3, hero, star, pisces, HERO, ok })
    }

    function starsHost(t) {
      // THE STARS during the tip act (bottom-left), and small in the payoff (top-right is busy, so bottom-left again)
      const [a, b] = T.acts[2]
      if (t >= a && t < b) {
        const k = pop01(t, T.starsIn, 0.38, 2.1) * outK(t, [b - 0.2, b])
        if (k > 0.01) drawStarChar(x, 160, 1250, 170, t, { color: STAR.sky, mood: t > T.tip2 + 1.6 ? 'happy' : 'neutral', look: [1, -0.4], hops: STARS_HOPS, pop: k, seed: 2, glow: 1.05 })
      }
    }

    return {
      start: 0, end: STORY_END + 0.01, root,
      update(t) {
        drawSky(x, t, SKY_H)
        // camera punch on the hard cuts into acts 1 and 3
        x.save()
        cfg.acts.slice(0, 3).forEach((draw, i) => {
          const [a, b] = T.acts[i]
          if (t < a || t >= b) return
          const punch = i === 1 ? 1 + 0.06 * (1 - ease.outCubic(prog(t, a, a + 0.3))) : 1
          x.save(); x.translate(540, 900); x.scale(punch, punch); x.translate(-540, -900)
          const S = { u: t - a, t0: a, t1: b, i, hero, star, pisces, HERO }
          draw(x, t, S)
          // Pisces in the background with tissues, more tears each act
          const P = cfg.pis && cfg.pis[i] === null ? null : { ...PIS_DEF[i], ...((cfg.pis && cfg.pis[i]) || {}) }
          if (P) {
            const pk = pop01(t, a + (i === 0 ? -1 : 0.3), 0.3, 2) * outK(t, [b - 0.15, b])
            if (pk > 0.01) {
              if (!P.noTissues) tissues(x, P.x - P.s * 0.75, P.y + P.s * 0.28, P.s * 0.5 * Math.min(1, pk), { pull: 6 * Math.abs(Math.sin(t * 3)) })
              pisces(x, t, { ...P, pop: pk }, P.tears ?? (i === 0 ? 1 : 2), P.mood || (i === 2 ? 'sparkle' : 'wide'), P.look || [-1, -0.5])
            }
          }
          x.restore()
        })
        starsHost(t)
        payoff(t)
        x.restore()
        tx.clearRect(0, 0, 1080, 1920)
        HEADS.forEach((h, i) => h.update(t, outK(t, T.headOut[i])))
        if (box1) box1.update(t)
        box2.update(t); box3.update(t)
        bug.update(t, outK(t, T.bugOut))
        const fl = Math.max(0, ...[T.acts[1][0], T.acts[3][0]].map(c => (t >= c && t < c + 0.14) ? 1 - (t - c) / 0.14 : 0))
        flash.style.opacity = String(0.55 * fl)
        drawGrain(gx, t)
      },
    }
  }

  const CUTS = [{ t: T.cut, kind: 'flip' }]
  const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl br' }), cardCuts(CUTS)]

  // ── sound (pitched SFX are shifted into the film's key by the engine)
  const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
  const wordPops = (t0, n, gap, b0 = 0, gain = 0.024) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(b0 + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
  const nWords = s => s.replace(/[|*]/g, ' ').trim().split(/\s+/).length
  const CUES = [
    ['pop', 0.05, 987.77, 0.03, 0], ['glitter', 0.02, 0.4],
    ...[1, 2, 3].flatMap(i => wordPops(T.heads[i], Math.min(7, nWords(cfg.heads[i])), 0.09, i)),
    ['whoosh', r3(T.acts[1][0] - 0.08), 0.28, 0.035], ['tick', T.acts[1][0], 0.05],
    ['pop', r3(T.starsIn + 0.05), 739.99, 0.035, -0.4],
    ...talkCues(L2, { cps: CPS }), ...talkCues(L3, { cps: CPS }), ...(L1 ? talkCues(L1, { cps: CPS }) : []),
    // the payoff: tin pops, lid creaks open, item drops, tag
    ['whoosh', r3(T.acts[3][0] - 0.08), 0.3, 0.035], ['tick', T.acts[3][0], 0.05],
    ['pop', r3(T.kitIn + 0.05), 659.25, 0.045, 0], ['pop', r3(T.lid + 0.05), 1174.66, 0.04, 0], ['tick', r3(T.lid + 0.02), 0.05],
    ['whoosh', T.drop[0], 0.3, 0.03], ['tom', T.drop[1], 110, { gain: 0.22, decay: 0.22 }], ['tick', T.drop[1], 0.06], ['bell', r3(T.drop[1] + 0.06), 1760, 0.03, 1.1, 0], ['glitter', r3(T.drop[1] + 0.03), r3(T.drop[1] + 0.5)],
    ['pop', T.tag, 1318.51, 0.045, 0.2], ['pop', r3(T.tag + 0.08), 1567.98, 0.03, 0.2],
    ['whoosh', T.out[0], 0.35, 0.03],
    ...(cfg.cues || []).flatMap((cs, i) => (cs || []).map(c => [c[0], r3(c[1] + T.acts[i][0]), ...c.slice(2)])),
    ...cardCutCues(CUTS),
    ...endcardCues(STORY_END),
  ]
  return { DURATION, SCENES, CUES, T, CUTS }
}
