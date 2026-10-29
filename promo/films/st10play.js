// st10play — the small shared kit of Star Talk season 10 "Little Stars" E09–E12 (Sag, Capricorn, Aquarius, Pisces), owned
// by that session (promo/films/STARTALK11.md). The season look itself (baby/kid stars, nursery, academy, crayon frame,
// growUp) lives in st10kids.js: this file only adds what those four episodes share on top of it.
//
// ═══════════════════════════════════════ API (copy-paste) ═══════════════════════════════════════
//   import { crayonText, drawSlide, drawSwings, swingSeat, drawSandbox, drawStickHorse, drawCrayonMap, drawDoodle, DOODLES,
//            burst, pop01, popOut, rgba, r3, PLAY_FONTS } from '../../st10play.js'
//
// crayonText(ctx, text, x, y, { size = 48, color = '#ff6fa8', rot = 0, align = 'center', alpha = 1, seed = 1 })
//   a line of waxy crayon lettering (Inter 800 drawn as a few jittered, streaky passes). Static per seed.
// drawSlide(ctx, x, y, s, t, { color })   a big pixel playground slide; (x, y) = the ladder's foot, s = cell px
//   (the platform's top is y − 36·s; the chute ends about x + 45·s).
// drawSwings(ctx, t, x, y, s, { swing = 1 })   an A-frame swing set (two swings swaying), (x, y) = the top bar centre.
//   swingSeat(t, x, y, s, i, swing) → { x, y, a }: where swing i (0 left, 1 right) has its seat, to sit a kid on it.
// drawSandbox(ctx, t, x, y, w, h, { dunes = 1, heat = 0 })   a wooden sandbox with dunes (top-left at x, y); heat 0…1 =
//   a desert heat shimmer above it.
// drawStickHorse(ctx, x, y, s, t, { rot, color, mane })   a hobby horse (stick + head + mane); (x, y) = the hand-hold.
// drawCrayonMap(ctx, t, { x, y, w, h, route = 0, marks, pop = 1, rot, title, titleColor })   the crayon treasure map
//   (centred), a dashed route drawing on (route 0…1 along marks[]), each mark { x, y, label, icon: 'home' | 'x' | 'flag'
//   | '?' | 'heart' | any short text, ly, size, color } in map units 0…1.
// drawDoodle(ctx, t, kind, x, y, s, { alpha = 1, color, fill = 0, wobble = 1, lw, flip, rot })   a crayon-outline
//   imaginary friend: kind ∈ DOODLES ('fish', 'lion', 'ram', 'cow', 'crab', 'bird', 'robot', 'goat', 'scorpion', 'heart',
//   'star'). fill 0…1 colours it in. The outline boils (3-frame crayon jitter) like a hand-drawn cartoon.
// burst(ctx, t, cx, cy, t0, n, R, cols, { life, size })   a ring of pixel sparkles flying out from t0.
// The Moon nurse, the age caption and growUp come from st10kids.js. Pure f(t); nothing touches `document` at top level.
// ═══════════════════════════════════════════════════════════════════════════════════════════════════
import { clamp, lerp, prog, ease } from '../src/lib.js'
import { drawPixelStar } from './sky.js'
import { easeOutBack } from './wheel.js'

export const GOLD = '#f2c75c', BONE = '#efe6d6', INK = '#1b1236', PINK = '#ff8fb1'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const PLAY_FONTS = ['800 48px Inter', '700 30px Inter']

export const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
export const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }
export const r3 = v => +v.toFixed(3)
const R = (x, c, x0, y0, w, h) => { x.fillStyle = c; x.fillRect(Math.round(x0), Math.round(y0), Math.round(w), Math.round(h)) }
const hash = n => { const s = Math.sin(n * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s) }

// ─────────────────────────────────────────────── crayon lettering
export function crayonText(x, text, px, py, { size = 48, color = '#ff6fa8', rot = 0, align = 'center', alpha = 1, seed = 1, weight = 800 } = {}) {
  if (alpha <= 0) return
  x.save(); x.globalAlpha *= alpha
  x.translate(px, py); x.rotate(rot)
  x.font = `${weight} ${size}px ${INTER}`; x.textAlign = align; x.textBaseline = 'middle'
  x.lineJoin = 'round'
  // waxy: a soft dark under-stroke, then three jittered colour passes, then streaks of paper showing through
  x.strokeStyle = 'rgba(20,10,40,0.35)'; x.lineWidth = size * 0.16; x.strokeText(text, 2, 3)
  for (let k = 0; k < 3; k++) {
    x.globalAlpha = alpha * (k === 0 ? 1 : 0.55)
    x.fillStyle = color
    x.fillText(text, (hash(seed + k) - 0.5) * size * 0.06, (hash(seed + k + 9) - 0.5) * size * 0.06)
  }
  x.globalAlpha = alpha * 0.28
  x.strokeStyle = '#ffffff'; x.lineWidth = Math.max(1, size * 0.03)
  const w = x.measureText(text).width, ox = align === 'center' ? -w / 2 : align === 'right' ? -w : 0
  x.save(); x.beginPath(); x.rect(ox - 4, -size * 0.6, w + 8, size * 1.2); x.clip()
  x.globalCompositeOperation = 'source-atop'
  for (let i = 0; i < 9; i++) {
    const yy = -size * 0.45 + (i + hash(seed * 3 + i) * 0.7) * size * 0.11
    x.beginPath(); x.moveTo(ox, yy); x.lineTo(ox + w, yy + (hash(i + seed) - 0.5) * 6); x.stroke()
  }
  x.restore()
  x.restore()
}
// ─────────────────────────────────────────────── playground props (pixel blocks, 1-cell ink outlines)
function blk(x, x0, y0, w, h, fill, o = 4) { R(x, INK, x0 - o, y0 - o, w + 2 * o, h + 2 * o); R(x, fill, x0, y0, w, h) }
export function drawSlide(x, px, py, s, t, { color = '#ff7a59' } = {}) {
  // ladder up the left, a platform, the chute down to the right
  const H = 34 * s
  for (const lx of [0, 8 * s]) blk(x, px + lx, py - H, 2 * s, H, '#c9d2e8', s * 0.6)
  for (let i = 1; i < 8; i++) R(x, '#c9d2e8', px, py - i * 4 * s, 10 * s, s)
  blk(x, px - s, py - H - 2 * s, 14 * s, 3 * s, '#ffd36a', s * 0.6)
  // railing
  blk(x, px, py - H - 9 * s, s, 7 * s, '#c9d2e8', s * 0.5); blk(x, px + 11 * s, py - H - 9 * s, s, 7 * s, '#c9d2e8', s * 0.5)
  R(x, '#c9d2e8', px, py - H - 9 * s, 12 * s, s)
  // the chute: a stepped diagonal
  x.save(); x.fillStyle = INK
  const N = 15
  for (let i = 0; i < N; i++) {
    const cx0 = px + 12 * s + i * 2.2 * s, cy0 = py - H - s + i * 2.2 * s
    x.fillStyle = INK; x.fillRect(cx0 - s * 0.6, cy0 - s * 0.6, 3.4 * s, 4.4 * s)
  }
  for (let i = 0; i < N; i++) {
    const cx0 = px + 12 * s + i * 2.2 * s, cy0 = py - H - s + i * 2.2 * s
    x.fillStyle = color; x.fillRect(cx0, cy0, 2.4 * s, 3.2 * s)
    x.fillStyle = 'rgba(255,255,255,0.35)'; x.fillRect(cx0, cy0, 2.4 * s, s * 0.7)
  }
  blk(x, px + 12 * s + N * 2.2 * s - s, py - 2 * s, 6 * s, 2 * s, color, s * 0.6)
  x.restore()
}
export function drawSwings(x, t, px, py, s, { swing = 1 } = {}) {
  const W = 40 * s, H = 36 * s
  // A-frame legs
  x.save(); x.lineCap = 'square'
  for (const sx of [-1, 1]) {
    x.strokeStyle = INK; x.lineWidth = 3.2 * s
    x.beginPath(); x.moveTo(px + sx * W / 2, py); x.lineTo(px + sx * (W / 2 + 8 * s), py + H); x.moveTo(px + sx * W / 2, py); x.lineTo(px + sx * (W / 2 - 8 * s), py + H); x.stroke()
    x.strokeStyle = '#5fb8ff'; x.lineWidth = 1.8 * s
    x.beginPath(); x.moveTo(px + sx * W / 2, py); x.lineTo(px + sx * (W / 2 + 8 * s), py + H); x.moveTo(px + sx * W / 2, py); x.lineTo(px + sx * (W / 2 - 8 * s), py + H); x.stroke()
  }
  x.restore()
  blk(x, px - W / 2 - s, py - s, W + 2 * s, 2.4 * s, '#5fb8ff', s * 0.6)
  for (const [ox, ph] of [[-W / 4, 0], [W / 4, 1.7]]) {
    const a = 0.35 * swing * Math.sin(t * 2.6 + ph)
    const L = H * 0.72
    const sx0 = px + ox, sy0 = py + s
    const ex = sx0 + Math.sin(a) * L, ey = sy0 + Math.cos(a) * L
    x.strokeStyle = '#c9d2e8'; x.lineWidth = Math.max(2, s * 0.6)
    x.beginPath(); x.moveTo(sx0 - 3 * s, sy0); x.lineTo(ex - 3 * s, ey); x.moveTo(sx0 + 3 * s, sy0); x.lineTo(ex + 3 * s, ey); x.stroke()
    blk(x, ex - 4.5 * s, ey - s, 9 * s, 2 * s, '#ffd36a', s * 0.5)
  }
}
/** where swing i (0 = left, 1 = right) of drawSwings(…, s, { swing }) has its seat at t → { x, y, a } */
export function swingSeat(t, px, py, s, i, swing = 1) {
  const ox = (i ? 1 : -1) * 10 * s, ph = i ? 1.7 : 0
  const a = 0.35 * swing * Math.sin(t * 2.6 + ph), L = 36 * s * 0.72
  return { x: px + ox + Math.sin(a) * L, y: py + s + Math.cos(a) * L, a }
}
export function drawSandbox(x, t, px, py, w, h, { dunes = 1, heat = 0 } = {}) {
  blk(x, px, py, w, h, '#f3d58f', 6)
  // dunes: stepped humps of darker sand
  const n = 4
  for (let i = 0; i < n; i++) {
    const cx = px + (i + 0.5) * w / n + Math.sin(i * 3) * 14, hh = (18 + 12 * hash(i)) * dunes
    for (let k = 0; k < 6; k++) R(x, k % 2 ? '#e7c477' : '#ecca82', cx - (6 - k) * 12, py + h * 0.55 - k * hh / 6, (6 - k) * 24, hh / 6 + 2)
  }
  // wooden rim
  R(x, '#b87a44', px - 6, py - 6, w + 12, 14); R(x, '#d39758', px - 6, py - 6, w + 12, 6)
  R(x, '#b87a44', px - 6, py + h - 8, w + 12, 14)
  R(x, '#9c6438', px - 6, py, 12, h); R(x, '#9c6438', px + w - 6, py, 12, h)
  if (heat > 0) {
    x.save(); x.globalAlpha = 0.28 * heat; x.strokeStyle = '#fff6d0'; x.lineWidth = 3
    for (let i = 0; i < 5; i++) {
      const bx = px + 40 + i * (w - 80) / 4
      x.beginPath()
      for (let k = 0; k < 10; k++) { const yy = py - 10 - k * 12, xx = bx + Math.sin(t * 5 + k * 0.9 + i) * 6; k ? x.lineTo(xx, yy) : x.moveTo(xx, yy) }
      x.stroke()
    }
    x.restore()
  }
}
export function drawStickHorse(x, px, py, s, t, { rot = -0.5, color = '#c98a4a', mane = '#ff6fa8' } = {}) {
  x.save(); x.translate(px, py); x.rotate(rot)
  // the stick (from the hand down/back) and the head forward at the top
  blk(x, -s * 0.8, -6 * s, 1.6 * s, 34 * s, '#8a5a32', s * 0.5)
  // head: a chunky pixel horse head facing right
  const head = [
    '..MMM.......',
    '.MHHHH......',
    'MHHHHHHH....',
    'MHHEHHHHHH..',
    '.HHHHHHHHHN.',
    '.HHHHHHHHHH.',
    '.HHHH..HHH..',
    '.HHHH.......',
    '..HH........',
  ]
  const cols = { M: mane, H: color, E: INK, N: '#5a3820' }
  const c = s * 1.1, ox = -2 * c, oy = -15 * c
  head.forEach((r, j) => [...r].forEach((ch, i) => { if (ch !== '.') { x.fillStyle = INK; x.fillRect(ox + i * c - 1.5, oy + j * c - 1.5, c + 3, c + 3) } }))
  head.forEach((r, j) => [...r].forEach((ch, i) => { if (ch !== '.') { x.fillStyle = cols[ch]; x.fillRect(ox + i * c, oy + j * c, c + 0.5, c + 0.5) } }))
  // the reins: a little red ribbon
  R(x, '#ff3d5a', ox + 5 * c, oy + 6 * c, 4 * c, c * 0.7)
  x.restore()
}
// ─────────────────────────────────────────────── the crayon map
export function drawCrayonMap(x, t, { x: cx = 540, y: cy = 960, w = 720, h = 520, route = 0, marks = [], pop = 1, rot = -0.03, title = 'THE GREAT EXPEDITION', titleColor = '#a35cf0' } = {}) {
  if (pop <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(pop, pop)
  // paper with a torn, wobbly edge
  x.fillStyle = 'rgba(10,6,24,0.4)'; x.fillRect(-w / 2 + 10, -h / 2 + 14, w, h)
  x.fillStyle = '#fbf3df'; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = 'rgba(160,120,70,0.1)'; for (let i = 0; i < 6; i++) x.fillRect(-w / 2, -h / 2 + (i + 0.5) * h / 6, w, 2)
  crayonText(x, title, 0, -h / 2 + 46, { size: 42, color: titleColor, seed: 11 })
  // route: dashed crayon line, drawn on along the marks
  if (marks.length > 1 && route > 0) {
    const pts = marks.map(m => [(m.x - 0.5) * w, (m.y - 0.5) * h])
    const seg = []; let L = 0
    for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); seg.push(d); L += d }
    let left = route * L
    x.save(); x.setLineDash([16, 12]); x.lineWidth = 7; x.strokeStyle = '#e2453c'; x.lineCap = 'round'
    x.beginPath(); x.moveTo(...pts[0])
    for (let i = 1; i < pts.length && left > 0; i++) {
      const f = Math.min(1, left / seg[i - 1]); left -= seg[i - 1]
      x.lineTo(lerp(pts[i - 1][0], pts[i][0], f), lerp(pts[i - 1][1], pts[i][1], f))
    }
    x.stroke(); x.restore()
  }
  for (const [i, m] of marks.entries()) {
    const mx = (m.x - 0.5) * w, my = (m.y - 0.5) * h
    if (m.icon === 'x') { x.strokeStyle = '#e2453c'; x.lineWidth = 8; x.beginPath(); x.moveTo(mx - 16, my - 16); x.lineTo(mx + 16, my + 16); x.moveTo(mx + 16, my - 16); x.lineTo(mx - 16, my + 16); x.stroke() }
    else if (m.icon === 'home') { x.fillStyle = '#ff9fc8'; x.beginPath(); x.moveTo(mx - 22, my); x.lineTo(mx, my - 22); x.lineTo(mx + 22, my); x.closePath(); x.fill(); x.fillStyle = '#ffd36a'; x.fillRect(mx - 16, my, 32, 22); x.fillStyle = INK; x.fillRect(mx - 4, my + 8, 8, 14) }
    else if (m.icon === 'flag') { x.fillStyle = '#6b4a2a'; x.fillRect(mx - 2, my - 30, 5, 34); x.fillStyle = '#2fc79a'; x.fillRect(mx + 3, my - 30, 22, 14) }
    else if (m.icon === '?') crayonText(x, '?', mx, my, { size: 54, color: '#7c74f0', seed: 5 + i })
    else if (m.icon === 'heart') crayonText(x, '♥', mx, my, { size: 46, color: '#ff4f86', seed: 5 + i })
    else if (m.icon) crayonText(x, m.icon, mx, my, { size: 40, color: '#3d2a6e', seed: 5 + i })
    if (m.label) crayonText(x, m.label, mx + (m.lx ?? 0), my + (m.ly ?? 40), { size: m.size || 26, color: m.color || '#3d2a6e', seed: 20 + i, weight: 700 })
  }
  x.restore()
}

// ─────────────────────────────────────────────── crayon doodles (imaginary friends)
// polylines in a −1…1 box; each [path, closed]
const D = {
  fish: [[[[-0.9, 0], [-0.5, -0.45], [0.1, -0.5], [0.55, -0.15], [0.55, 0.15], [0.1, 0.5], [-0.5, 0.45]], true], [[[0.5, 0], [0.95, -0.4], [0.95, 0.4]], true], [[[-0.5, -0.08], [-0.45, -0.08]], false], [[[-0.1, -0.5], [0.05, -0.75], [0.25, -0.45]], false]],
  lion: [[[[0, -0.95], [0.45, -0.8], [0.8, -0.45], [0.95, 0], [0.8, 0.45], [0.45, 0.8], [0, 0.95], [-0.45, 0.8], [-0.8, 0.45], [-0.95, 0], [-0.8, -0.45], [-0.45, -0.8]], true], [[[-0.5, 0], [-0.35, -0.45], [0.35, -0.45], [0.5, 0], [0.35, 0.45], [-0.35, 0.45]], true], [[[-0.2, -0.12], [-0.18, -0.12]], false], [[[0.18, -0.12], [0.2, -0.12]], false], [[[-0.15, 0.2], [0, 0.3], [0.15, 0.2]], false]],
  ram: [[[[-0.6, -0.2], [0.2, -0.45], [0.7, -0.2], [0.7, 0.35], [-0.6, 0.35]], true], [[[0.6, -0.25], [0.95, -0.55], [0.9, -0.05], [0.65, 0]], false], [[[-0.4, 0.35], [-0.4, 0.75]], false], [[[0.4, 0.35], [0.4, 0.75]], false], [[[-0.8, 0.1], [-1, 0.6], [-0.6, 0.5]], true]],
  cow: [[[[-0.8, -0.3], [0.5, -0.3], [0.5, 0.35], [-0.8, 0.35]], true], [[[0.5, -0.45], [0.95, -0.45], [0.95, 0.1], [0.5, 0.1]], true], [[[-0.6, 0.35], [-0.6, 0.75]], false], [[[0.3, 0.35], [0.3, 0.75]], false], [[[-0.3, -0.1], [-0.05, -0.1], [-0.05, 0.12], [-0.3, 0.12]], true]],
  crab: [[[[-0.6, 0], [-0.3, -0.35], [0.3, -0.35], [0.6, 0], [0.3, 0.3], [-0.3, 0.3]], true], [[[-0.6, -0.05], [-0.9, -0.5], [-0.65, -0.75], [-0.75, -0.45]], false], [[[0.6, -0.05], [0.9, -0.5], [0.65, -0.75], [0.75, -0.45]], false], [[[-0.4, 0.3], [-0.65, 0.6]], false], [[[0.4, 0.3], [0.65, 0.6]], false]],
  bird: [[[[-0.7, 0.1], [-0.2, -0.4], [0.4, -0.3], [0.7, 0.05], [0.2, 0.4], [-0.4, 0.35]], true], [[[0.65, -0.05], [0.95, 0.05], [0.65, 0.15]], true], [[[-0.2, 0], [0.1, -0.6], [0.3, -0.05]], false]],
  robot: [[[[-0.5, -0.4], [0.5, -0.4], [0.5, 0.5], [-0.5, 0.5]], true], [[[-0.3, -0.4], [-0.3, -0.65], [0.3, -0.65], [0.3, -0.4]], false], [[[0, -0.65], [0, -0.9]], false], [[[-0.25, -0.1], [-0.1, -0.1]], false], [[[0.1, -0.1], [0.25, -0.1]], false], [[[-0.2, 0.2], [0.2, 0.2]], false]],
  goat: [[[[-0.7, -0.15], [0.3, -0.15], [0.3, 0.35], [-0.7, 0.35]], true], [[[0.3, -0.15], [0.55, -0.55], [0.85, -0.4], [0.7, 0]], true], [[[0.5, -0.5], [0.4, -0.9]], false], [[[0.7, 0], [0.75, 0.25]], false], [[[-0.5, 0.35], [-0.5, 0.75]], false], [[[0.1, 0.35], [0.1, 0.75]], false]],
  scorpion: [[[[-0.6, 0.1], [-0.2, -0.15], [0.3, -0.1], [0.35, 0.2], [-0.2, 0.3]], true], [[[0.3, 0], [0.6, -0.2], [0.75, -0.6], [0.55, -0.8], [0.4, -0.6]], false], [[[-0.6, 0.05], [-0.9, -0.25]], false], [[[-0.6, 0.15], [-0.9, 0.4]], false]],
  heart: [[[[0, 0.75], [-0.85, -0.05], [-0.7, -0.6], [-0.25, -0.7], [0, -0.35], [0.25, -0.7], [0.7, -0.6], [0.85, -0.05]], true]],
  star: [[[[0, -0.95], [0.25, -0.3], [0.95, -0.3], [0.4, 0.12], [0.6, 0.85], [0, 0.42], [-0.6, 0.85], [-0.4, 0.12], [-0.95, -0.3], [-0.25, -0.3]], true]],
}
D.fish2 = D.fish
export const DOODLES = Object.keys(D)
export function drawDoodle(x, t, kind, px, py, s, { alpha = 1, color = '#ff8f4a', fill = 0, wobble = 1, lw = null, flip = false, rot = 0 } = {}) {
  const shape = D[kind]; if (!shape || alpha <= 0) return
  const frame = Math.floor(t * 8) % 3
  x.save(); x.globalAlpha *= alpha; x.translate(px, py); x.rotate(rot); if (flip) x.scale(-1, 1)
  x.lineJoin = 'round'; x.lineCap = 'round'
  const pathOf = (pts, closed, j) => {
    x.beginPath()
    pts.forEach(([u, v], i) => {
      const jx = (hash(i * 7 + frame * 13 + j) - 0.5) * 0.05 * wobble, jy = (hash(i * 5 + frame * 11 + j + 3) - 0.5) * 0.05 * wobble
      const X = (u + jx) * s, Y = (v + jy) * s
      i ? x.lineTo(X, Y) : x.moveTo(X, Y)
    })
    if (closed) x.closePath()
  }
  shape.forEach(([pts, closed], j) => {
    if (closed && fill > 0) { pathOf(pts, closed, j); x.save(); x.globalAlpha *= 0.55 * fill; x.fillStyle = color; x.fill(); x.restore() }
  })
  shape.forEach(([pts, closed], j) => {
    pathOf(pts, closed, j)
    x.strokeStyle = 'rgba(255,255,255,0.35)'; x.lineWidth = (lw || s * 0.09) + 4; x.stroke()
    pathOf(pts, closed, j)
    x.strokeStyle = color; x.lineWidth = lw || s * 0.09; x.stroke()
  })
  x.restore()
}

export function burst(x, t, cx, cy, t0, n, R0, cols = [GOLD, BONE, PINK, '#7fdcff'], { life = 0.7, size = 24 } = {}) {
  const tt = t - t0
  if (tt < 0 || tt > life) return
  const p = ease.outCubic(tt / life)
  x.save(); x.globalAlpha *= 1 - ease.inQuad(tt / life)
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 + t0
    drawPixelStar(x, cx + Math.cos(a) * R0 * (0.5 + 0.7 * p), cy + Math.sin(a) * R0 * (0.5 + 0.7 * p), size * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length])
  }
  x.restore()
}
export { clamp, lerp, prog, ease, easeOutBack }

/** st10kids's ageCaption with a pop-out that doesn't need its `out` (its out path calls ease.inBack, which lib.js lacks):
 *  springs in at `at` (its own), shrinks away over [out, out + 0.25] here. Same opts as ageCaption. */
export function ageCaptionSafe(ageCaption, x, t, o) {
  const { out = null, ...rest } = o
  if (t < rest.at) return null
  if (out == null) return ageCaption(x, t, rest)
  const p = prog(t, out, out + 0.25)
  if (p >= 1) return null
  const k = p <= 0 ? 1 : (1 + 0.15 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p))
  const px = rest.x ?? 540, py = rest.y ?? 1660
  x.save(); x.translate(px, py); x.scale(k, k); x.translate(-px, -py)
  const r = ageCaption(x, t, rest)
  x.restore()
  return r
}
