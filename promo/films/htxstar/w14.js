// Houston Star Talk · worker w14 · style "assigns" ("Houston X as zodiac signs"): the engine, sets, cards and icons.
// The scripts are in w14a.js (hst333–hst344) and w14b.js (hst345–hst356). Every episode is a makeEpisode() spec
// (promo/films/starrace/ep.js): a busy frame-0 crowd + hero prop, 12 sign cards (all 12 signs), a bonus round, a
// comment prompt, then the Jan 9 party ticket (kit.js partyCard). Pure functions of t; no document at module level.
import { clamp, prog, ease } from '../../src/lib.js'
import { FLOOR, box, txt, outside } from '../starrace/ep.js'
import { sparkles, GOLD, BONE, PINK, INK, INTER, MONO, SERIF, SIGN_IDS } from '../signs3kit.js'
import { streetSign, shield, skyline, partyCard, kolache, klobasnek, heatSun, car, slab, freeway, HGREEN, BRAKE } from './kit.js'

export const Y = 1255
export const BADGE = { text: 'HOU BETA · JAN 9', x: 230, y: 150 }
export const STING = [['glitter', 0.0, 0.7], ['pop', 0.02, 880, 0.03, 0]]
export const Kp = (lt, a, d = 0.3) => clamp(ease.outBack(prog(lt, a, a + d)))
const TAU = Math.PI * 2

// ── sets ────────────────────────────────────────────────────────────────────────────────────────────────────
function grad(x, top, bot, y0 = 0, y1 = FLOOR + 60) { const g = x.createLinearGradient(0, y0, 0, y1); g.addColorStop(0, top); g.addColorStop(1, bot); x.fillStyle = g; x.fillRect(0, y0, 1080, y1 - y0) }
function clouds(x, t, n = 4, col = 'rgba(255,255,255,0.85)', y0 = 300) {
  for (let k = 0; k < n; k++) { const cx = ((k * 290 + t * 18 * (1 + (k % 2))) % 1400) - 160, cy = y0 + (k * 137) % 360; x.fillStyle = col; x.fillRect(cx, cy, 160, 34); x.fillRect(cx + 30, cy - 24, 90, 28); x.fillRect(cx + 20, cy + 30, 120, 14) }
}
export function tree(x, cx, base, h, col = '#3f8f4a', { kind = 'oak', dots = null, t = 0 } = {}) {
  const sw = Math.sin(t * 1.4 + cx) * 4
  if (kind === 'palm') {
    for (let k = 0; k < 8; k++) box(x, cx - 12 + k * 2, base - (k + 1) * h / 8, 24, h / 8 - 2, '#9a7a4a', 3)
    for (let k = 0; k < 6; k++) { const a = -Math.PI + k * Math.PI / 5 + 0.05 * Math.sin(t + k); x.strokeStyle = INK; x.lineWidth = 22; x.beginPath(); x.moveTo(cx + 4, base - h); x.quadraticCurveTo(cx + Math.cos(a) * 90, base - h - 60, cx + Math.cos(a) * 150 + sw, base - h + Math.abs(Math.sin(a)) * 10 + 40); x.stroke(); x.strokeStyle = col; x.lineWidth = 12; x.stroke() }
    return
  }
  if (kind === 'pine') { box(x, cx - 12, base - h * 0.3, 24, h * 0.3, '#6b4a2a', 4); for (let k = 0; k < 3; k++) { const w = 150 - k * 34, yy = base - h * 0.25 - k * h * 0.24; x.fillStyle = INK; x.beginPath(); x.moveTo(cx - w / 2 - 8 + sw, yy + 6); x.lineTo(cx + sw, yy - h * 0.36 - 8); x.lineTo(cx + w / 2 + 8 + sw, yy + 6); x.fill(); x.fillStyle = col; x.beginPath(); x.moveTo(cx - w / 2 + sw, yy); x.lineTo(cx + sw, yy - h * 0.36); x.lineTo(cx + w / 2 + sw, yy); x.fill() } return }
  box(x, cx - 16, base - h * 0.45, 32, h * 0.45, '#6b4a2a', 4)
  const r = h * 0.3
  for (const [dx, dy, rr] of [[-r * 0.6, -h * 0.55, r * 0.75], [r * 0.6, -h * 0.55, r * 0.75], [0, -h * 0.72, r]]) { x.fillStyle = INK; x.beginPath(); x.arc(cx + dx + sw, base + dy, rr + 6, 0, TAU); x.fill() }
  for (const [dx, dy, rr] of [[-r * 0.6, -h * 0.55, r * 0.75], [r * 0.6, -h * 0.55, r * 0.75], [0, -h * 0.72, r]]) { x.fillStyle = col; x.beginPath(); x.arc(cx + dx + sw, base + dy, rr, 0, TAU); x.fill() }
  if (dots) for (let k = 0; k < 9; k++) { x.fillStyle = dots; x.fillRect(cx - r + ((k * 53) % (2 * r)) + sw, base - h * 0.9 + ((k * 37) % (h * 0.45)), 12, 12) }
}
export const BG = {
  night: ({ ground = '#221b38', city = '#1a1338', lit = '#ffd36b' } = {}) => (x, t) => { skyline(x, FLOOR + 60, t, { alpha: 0.85, col: city, lit }); outside(x, { ground }) },
  day: ({ top = '#6fc3ff', bot = '#ffe2a8', ground = '#3d6b3a', city = '#3a4f7a', sun = true, n = 4 } = {}) => (x, t) => { grad(x, top, bot); if (sun) heatSun(x, 880, 330, t, 70); clouds(x, t, n); skyline(x, FLOOR + 60, t, { col: city, lit: '#cfe6ff', alpha: 0.9 }); outside(x, { ground }) },
  sunset: ({ top = '#3a1d5e', bot = '#ff9a5a', ground = '#2a1d3a', city = '#2a1838' } = {}) => (x, t) => { grad(x, top, bot); x.fillStyle = '#ffd36b'; x.beginPath(); x.arc(540, FLOOR - 120, 150, Math.PI, 0); x.fill(); skyline(x, FLOOR + 60, t, { col: city, lit: '#ffb35c', alpha: 0.95 }); outside(x, { ground }) },
  kitchen: ({ wall = '#f3d9b1', tile = '#e8c493', top = '#c9783a', counter = '#7a4a2c' } = {}) => (x, t) => {
    x.fillStyle = wall; x.fillRect(0, 0, 1080, 1920); x.fillStyle = tile
    for (let r = 0; r < 20; r++) for (let c = 0; c < 10; c++) if ((r + c) % 2) x.fillRect(c * 108, r * 70, 108, 70)
    box(x, -10, FLOOR + 50, 1100, 40, top, 6); x.fillStyle = counter; x.fillRect(0, FLOOR + 96, 1080, 1920)
  },
  park: ({ top = '#7fd0ff', bot = '#d8f2ff', grass = '#4f9a48', pond = '#4aa8d8', trees = ['#3f8f4a', '#2f7a3e', '#5aa84f'] } = {}) => (x, t) => {
    grad(x, top, bot); clouds(x, t, 3)
    for (let k = 0; k < 7; k++) tree(x, 60 + k * 165, FLOOR + 70, 300 + (k % 3) * 60, trees[k % trees.length], { t })
    x.fillStyle = grass; x.fillRect(0, FLOOR + 60, 1080, 1920); x.fillStyle = INK; x.fillRect(0, FLOOR + 54, 1080, 8)
    x.fillStyle = pond; x.beginPath(); x.ellipse(540, FLOOR + 330, 520, 70, 0, 0, TAU); x.fill()
    for (let k = 0; k < 6; k++) { x.fillStyle = 'rgba(255,255,255,0.5)'; x.fillRect(120 + ((k * 170 + t * 30) % 840), FLOOR + 310 + (k % 3) * 16, 50, 5) }
  },
  bayou: ({ top = '#2b2a6e', bot = '#ff9e7a', water = '#2d6f8a', ground = '#3d5a34' } = {}) => (x, t) => {
    grad(x, top, bot); skyline(x, FLOOR - 40, t, { col: '#241a46', lit: '#ffd36b', alpha: 0.9 })
    x.fillStyle = ground; x.fillRect(0, FLOOR - 40, 1080, 100); x.fillStyle = water; x.fillRect(0, FLOOR + 60, 1080, 1920)
    for (let k = 0; k < 14; k++) { const ph = (t * 0.25 + k / 14) % 1; x.fillStyle = 'rgba(255,220,170,0.35)'; x.fillRect((k * 151 + ph * 200) % 1080, FLOOR + 90 + (k * 41) % 360, 70, 6) }
    x.fillStyle = INK; x.fillRect(0, FLOOR + 54, 1080, 8)
  },
  studio: ({ wall = '#1d4fa8', wall2 = '#163a7e', floor = '#10224a' } = {}) => (x, t) => {
    grad(x, wall, wall2, 0, 1920)
    x.strokeStyle = 'rgba(255,255,255,0.08)'; x.lineWidth = 3; for (let k = 0; k < 12; k++) { x.beginPath(); x.moveTo(0, 360 + k * 90); x.lineTo(1080, 300 + k * 90); x.stroke() }
    x.fillStyle = 'rgba(125,220,140,0.25)'; x.beginPath(); x.moveTo(0, 1100); x.quadraticCurveTo(400, 980, 700, 1080); x.quadraticCurveTo(900, 1150, 1080, 1060); x.lineTo(1080, 1390); x.lineTo(0, 1390); x.fill()   // a coastline on the map wall
    x.fillStyle = floor; x.fillRect(0, FLOOR + 60, 1080, 1920); x.fillStyle = INK; x.fillRect(0, FLOOR + 54, 1080, 8)
  },
  truck: ({ body = '#ff8fb1', stripe = '#fff3c4', sky = ['#ffd1a8', '#ffefc9'], ground = '#4a3a5e' } = {}) => (x, t) => {
    grad(x, sky[0], sky[1]); clouds(x, t, 3, 'rgba(255,255,255,0.7)', 160)
    box(x, 40, 380, 1000, 1010, body, 8)
    for (let k = 0; k < 10; k++) { x.fillStyle = k % 2 ? stripe : body; x.fillRect(40 + k * 100, 380, 100, 70) } x.fillStyle = INK; x.fillRect(40, 450, 1000, 8)
    box(x, 120, 980, 840, 40, '#c9c2b4', 6)   // the serving shelf
    x.fillStyle = 'rgba(0,0,0,0.12)'; x.fillRect(40, 1030, 1000, 360)
    outside(x, { ground })
  },
  road: ({ sky = ['#ff9a5a', '#ffd0a0'], city = '#3a2850' } = {}) => (x, t) => { grad(x, sky[0], sky[1]); skyline(x, FLOOR - 150, t, { col: city, lit: '#ffd36b', alpha: 0.85 }); freeway(x, FLOOR - 160, 600, 3, t * 300) },
  neon: ({ bg = '#120c24', lines = ['#ff8fb1', '#8fe3ff', '#c9a6ff'] } = {}) => (x, t) => {
    x.fillStyle = bg; x.fillRect(0, 0, 1080, 1920)
    for (let k = 0; k < 10; k++) { const c = lines[k % lines.length]; x.save(); x.shadowColor = c; x.shadowBlur = 20; x.strokeStyle = c; x.globalAlpha = 0.35 + 0.25 * Math.sin(t * 2 + k); x.lineWidth = 6; x.beginPath(); x.moveTo(0, FLOOR + 60 + k * 50); x.lineTo(1080, FLOOR + 60 + k * 50); x.stroke(); x.restore() }
    x.fillStyle = INK; x.fillRect(0, FLOOR + 54, 1080, 8)
  },
  shop: ({ wall = '#ffe1ec', shelf = '#c98e5a', cups = ['#ffb3c7', '#c9a6ff', '#ffd36b', '#8fe3ff'], floor = '#6b4a6e' } = {}) => (x, t) => {
    x.fillStyle = wall; x.fillRect(0, 0, 1080, 1920)
    for (let r = 0; r < 3; r++) { box(x, 60, 700 + r * 230, 960, 20, shelf, 5); for (let k = 0; k < 9; k++) icon(x, 'cup', 120 + k * 105, 650 + r * 230, 0.42, cups[(k + r) % cups.length], PINK, t) }
    x.fillStyle = floor; x.fillRect(0, FLOOR + 60, 1080, 1920); x.fillStyle = INK; x.fillRect(0, FLOOR + 54, 1080, 8)
  },
  garage: ({ wall = '#2a2c3a', floor = '#3a3c48', paint = '#f2c75c' } = {}) => (x, t) => {
    x.fillStyle = wall; x.fillRect(0, 0, 1080, 1920); for (let k = 0; k < 5; k++) { x.fillStyle = '#3a3c4e'; x.fillRect(k * 240, 300, 40, 1100) }
    x.fillStyle = floor; x.fillRect(0, FLOOR + 60, 1080, 1920); for (let k = 0; k < 4; k++) { x.fillStyle = paint; x.fillRect(80 + k * 280, FLOOR + 120, 12, 300) }
    txt(x, 'LEVEL 6 · ROOF', 540, 260, { size: 34, col: 'rgba(255,255,255,0.25)', font: MONO, weight: 700 })
  },
}

// ── icons (each fits about ±110 × ±100 at s = 1) ─────────────────────────────────────────────────────────────
const circ = (x, px, py, r, col, ink = 5) => { if (ink) { x.fillStyle = INK; x.beginPath(); x.arc(px, py, r + ink, 0, TAU); x.fill() } x.fillStyle = col; x.beginPath(); x.arc(px, py, r, 0, TAU); x.fill() }
const poly = (x, pts, col, ink = 5) => { const P = () => { x.beginPath(); pts.forEach(([a, b], i) => i ? x.lineTo(a, b) : x.moveTo(a, b)); x.closePath() }; if (ink) { x.strokeStyle = INK; x.lineWidth = ink * 2; x.lineJoin = 'round'; P(); x.stroke() } x.fillStyle = col; P(); x.fill() }
function steam(x, t, n = 3, y = -60) { for (let k = 0; k < n; k++) { const ph = (t * 0.6 + k / n) % 1; x.strokeStyle = `rgba(255,255,255,${(0.7 * (1 - ph)).toFixed(2)})`; x.lineWidth = 6; x.beginPath(); x.moveTo(-40 + k * 40, y - ph * 70); x.quadraticCurveTo(-25 + k * 40, y - 30 - ph * 70, -40 + k * 40, y - 60 - ph * 70); x.stroke() } }
export function icon(x, kind, cx, cy, s = 1, a1 = null, a2 = null, t = 0) {
  const c1 = a1 ?? GOLD, c2 = a2 ?? PINK
  x.save(); x.translate(cx, cy); x.scale(s, s)
  const B = (l, tp, w, h, col, ink = 5) => box(x, l, tp, w, h, col, ink)
  switch (kind) {
    case 'taco': { x.fillStyle = INK; x.beginPath(); x.arc(0, 40, 98, Math.PI, 0); x.fill(); x.fillStyle = a2 || '#f4e1b0'; x.beginPath(); x.arc(0, 40, 90, Math.PI, 0); x.fill()
      B(-62, -20, 40, 22, c1, 4); B(-14, -34, 40, 24, '#ffe27a', 4); B(32, -20, 36, 20, '#7dbf5a', 4); for (let k = 0; k < 4; k++) { x.fillStyle = 'rgba(160,110,50,0.5)'; x.fillRect(-60 + k * 36, 8 + (k % 2) * 14, 10, 10) } break }
    case 'kolache': kolache(x, 0, 0, 1.6); circ(x, 0, 0, 38, c1, 0); x.fillStyle = 'rgba(255,255,255,0.6)'; x.fillRect(-12, -18, 12, 8); break
    case 'klob': klobasnek(x, 0, 0, 1.7); if (c1 !== GOLD) { B(-40, -72, 80, 30, c1, 4) } break
    case 'bowl': { x.fillStyle = INK; x.beginPath(); x.arc(0, -10, 112, 0, Math.PI); x.fill(); x.fillStyle = a2 || BONE; x.beginPath(); x.arc(0, -10, 104, 0, Math.PI); x.fill()
      x.fillStyle = c1; x.beginPath(); x.ellipse(0, -10, 104, 22, 0, 0, TAU); x.fill(); x.strokeStyle = INK; x.lineWidth = 6; x.stroke(); for (let k = 0; k < 4; k++) { x.fillStyle = ['#7dbf5a', '#fff', '#c9783a', '#ff5a3a'][k]; x.fillRect(-60 + k * 34, -18, 16, 10) } steam(x, t, 3, -40); break }
    case 'cup': { poly(x, [[-62, -80], [62, -80], [48, 90], [-48, 90]], 'rgba(232,244,255,0.95)'); x.fillStyle = c1; x.beginPath(); x.moveTo(-58, -46); x.lineTo(58, -46); x.lineTo(48, 86); x.lineTo(-48, 86); x.fill()
      for (let k = 0; k < 9; k++) circ(x, -34 + (k % 5) * 17, 70 - Math.floor(k / 5) * 16, 8, '#2a1a10', 0); B(-70, -96, 140, 18, BONE, 4); B(12, -170, 18, 90, c2, 4); break }
    case 'raspa': { poly(x, [[-60, -10], [60, -10], [44, 100], [-44, 100]], BONE); x.fillStyle = BRAKE; x.fillRect(-52, 30, 104, 12)
      x.fillStyle = INK; x.beginPath(); x.arc(0, -10, 74, Math.PI, 0); x.fill(); x.fillStyle = c1; x.beginPath(); x.arc(0, -10, 66, Math.PI, 0); x.fill()
      x.fillStyle = c2; for (let k = 0; k < 5; k++) x.fillRect(-50 + k * 24, -60 + (k % 2) * 16, 14, 40 + (k % 3) * 10); x.fillStyle = 'rgba(255,255,255,0.6)'; for (let k = 0; k < 8; k++) x.fillRect(-50 + k * 13, -40 - (k % 3) * 12, 6, 6); break }
    case 'plate': { x.fillStyle = INK; x.beginPath(); x.ellipse(0, 20, 130, 58, 0, 0, TAU); x.fill(); x.fillStyle = BONE; x.beginPath(); x.ellipse(0, 20, 122, 50, 0, 0, TAU); x.fill()
      circ(x, -50, 10, 30, c1, 4); circ(x, 20, 2, 34, c2, 4); circ(x, 66, 26, 22, '#7dbf5a', 4); break }
    case 'crawfish': { const c = a1 || '#e0402a'; for (let k = 0; k < 5; k++) circ(x, -70 + k * 30, 10 - k * 2, 26 - k * 2, c, 4); circ(x, 80, 0, 30, c, 4)
      for (const sy of [-1, 1]) { x.strokeStyle = INK; x.lineWidth = 10; x.beginPath(); x.moveTo(90, sy * 10); x.lineTo(120, sy * 50); x.stroke(); circ(x, 124, sy * 62, 18, c, 4) } x.fillStyle = INK; x.fillRect(84, -12, 8, 8); break }
    case 'cake': { poly(x, [[-100, 60], [100, 60], [100, -20], [-100, 20]], c1); x.fillStyle = c2; x.fillRect(-96, 26, 192, 12); x.fillStyle = BONE; x.fillRect(-96, 8, 192, 10); circ(x, 60, -36, 16, '#c0304a', 4); break }
    case 'bun': circ(x, 0, 10, 80, c1); x.fillStyle = c2; for (let k = 0; k < 4; k++) { x.fillRect(-60 + k * 30, -40 + (k % 2) * 30, 50, 12) } break
    case 'wings': for (let k = 0; k < 3; k++) { x.save(); x.translate(-60 + k * 60, 10 - (k % 2) * 20); x.rotate(0.5 - k * 0.4); circ(x, 0, 0, 34, c1, 5); B(-6, 28, 12, 40, BONE, 4); x.restore() } x.fillStyle = c2; for (let k = 0; k < 10; k++) x.fillRect(-90 + (k * 37) % 180, -30 + (k * 23) % 60, 6, 6); break
    case 'sandwich': B(-110, -50, 220, 36, '#e8b86a'); B(-104, -14, 208, 30, c1); B(-110, 16, 220, 36, '#e8b86a'); x.fillStyle = '#7dbf5a'; x.fillRect(-100, -18, 200, 8); break
    case 'link': for (let k = 0; k < 2; k++) { x.save(); x.translate(0, -24 + k * 50); x.rotate(-0.1 + k * 0.2); B(-100, -20, 200, 40, c1); x.fillStyle = 'rgba(255,255,255,0.3)'; x.fillRect(-80, -12, 120, 6); x.restore() } break
    case 'chips': { x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 110, 0, Math.PI); x.fill(); x.fillStyle = a2 || '#c0304a'; x.beginPath(); x.arc(0, 0, 102, 0, Math.PI); x.fill(); for (let k = 0; k < 6; k++) poly(x, [[-80 + k * 30, 0], [-50 + k * 30, -60 - (k % 2) * 20], [-30 + k * 30, 4]], '#f2c75c', 3); circ(x, 70, -40, 30, c1, 4); break }
    case 'sun': heatSun(x, 0, 0, t, 70); break
    case 'cloud': { const c = a1 || BONE; circ(x, -50, 10, 46, c, 5); circ(x, 10, -16, 60, c, 5); circ(x, 66, 14, 42, c, 5); x.fillStyle = c; x.fillRect(-60, 10, 130, 50); break }
    case 'rain': icon(x, 'cloud', 0, -30, 0.9, a1 || '#c9d4e8'); for (let k = 0; k < 5; k++) { const ph = (t * 1.5 + k / 5) % 1; x.fillStyle = '#5ec8ff'; x.fillRect(-70 + k * 34, 30 + ph * 60, 8, 22) } break
    case 'pollen': icon(x, 'cloud', 0, 0, 0.9, '#f2e27a'); for (let k = 0; k < 14; k++) { const ph = (t * 0.4 + k / 14) % 1; x.fillStyle = '#e0c23a'; x.fillRect(-100 + (k * 61) % 200, -80 + ph * 160, 8, 8) } break
    case 'fog': for (let k = 0; k < 5; k++) { x.fillStyle = `rgba(230,235,245,${(0.5 + 0.1 * k).toFixed(2)})`; x.fillRect(-110 + Math.sin(t + k) * 14, -80 + k * 36, 220, 20) } break
    case 'thermo': { B(-26, -100, 52, 150, BONE); circ(x, 0, 70, 40, a2 || BRAKE); x.fillStyle = a2 || BRAKE; x.fillRect(-12, -40, 24, 110); txt(x, c1, 90, -30, { size: 56, col: INK }); break }
    case 'snow': for (let k = 0; k < 3; k++) { x.save(); x.translate(-70 + k * 70, -20 + (k % 2) * 40); x.rotate(t * 0.5 + k); x.strokeStyle = a1 || '#bfe6ff'; x.lineWidth = 8; for (let a = 0; a < 3; a++) { x.rotate(Math.PI / 3); x.beginPath(); x.moveTo(-34, 0); x.lineTo(34, 0); x.stroke() } x.restore() } break
    case 'tree': tree(x, 0, 100, 220, c1, { dots: a2, t }); break
    case 'palm': tree(x, 0, 110, 210, c1, { kind: 'palm', t }); break
    case 'pine': tree(x, 0, 110, 220, c1, { kind: 'pine', t }); break
    case 'moss': tree(x, 0, 100, 220, c1, { t }); x.strokeStyle = '#a9b8a0'; x.lineWidth = 6; for (let k = 0; k < 6; k++) { x.beginPath(); x.moveTo(-70 + k * 28, -60); x.lineTo(-70 + k * 28 + Math.sin(t + k) * 6, 0 + (k % 3) * 14); x.stroke() } break
    case 'flower': for (let k = 0; k < 3; k++) { const fx = -60 + k * 60; x.strokeStyle = '#3f8f4a'; x.lineWidth = 8; x.beginPath(); x.moveTo(fx, 100); x.lineTo(fx, 0); x.stroke(); for (let p = 0; p < 5; p++) circ(x, fx + Math.cos(p * TAU / 5) * 20, -10 + Math.sin(p * TAU / 5) * 20 - k * 6, 14, c1, 3); circ(x, fx, -10 - k * 6, 10, a2 || GOLD, 3) } break
    case 'car': car(x, 0, 20, c1, { s: 0.85, brake: c2 === BRAKE ? 1 : 0 }); break
    case 'convert': car(x, 0, 20, c1, { s: 0.85, open: true }); break
    case 'slab': slab(x, 0, 10, t, { col: c1, col2: c2, elbows: 1, s: 0.3 }); break
    case 'truck': B(-120, -30, 240, 60, c1); B(10, -80, 100, 52, c1); x.fillStyle = '#bfe6ff'; x.fillRect(30, -70, 60, 32); for (const wx of [-70, 70]) circ(x, wx, 40, 30, INK, 0); B(-110, -60, 110, 30, a2 || '#8f96a0'); break
    case 'van': B(-120, -70, 240, 100, c1); for (let k = 0; k < 3; k++) { x.fillStyle = '#bfe6ff'; x.fillRect(-100 + k * 70, -54, 56, 34) } for (const wx of [-70, 70]) circ(x, wx, 40, 28, INK, 0); break
    case 'shield': shield(x, 0, 0, c1, 1.05); break
    case 'blade': streetSign(x, 0, 0, c1, { pole: false, w: Math.max(240, c1.length * 34 + 60) }); break
    case 'uturn': { x.strokeStyle = INK; x.lineWidth = 34; x.beginPath(); x.moveTo(-50, 90); x.lineTo(-50, -10); x.arc(0, -10, 50, Math.PI, 0); x.lineTo(50, 40); x.stroke(); x.strokeStyle = c1; x.lineWidth = 20; x.stroke(); poly(x, [[20, 40], [80, 40], [50, 90]], c1); break }
    case 'cone': poly(x, [[-50, 100], [0, -100], [50, 100]], '#ff7a2a'); x.fillStyle = BONE; x.fillRect(-26, -10, 52, 18); B(-80, 90, 160, 20, '#ff7a2a'); break
    case 'quote': { x.font = `800 230px ${SERIF}`; x.fillStyle = c1; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('“', -70, 40); x.fillText('”', 70, 40); break }
    case 'pin': { x.fillStyle = INK; x.beginPath(); x.arc(0, -30, 70, Math.PI * 0.85, Math.PI * 0.15); x.lineTo(0, 100); x.closePath(); x.fill(); x.fillStyle = c1; x.beginPath(); x.arc(0, -30, 62, Math.PI * 0.85, Math.PI * 0.15); x.lineTo(0, 88); x.closePath(); x.fill(); circ(x, 0, -30, 24, BONE, 0); break }
    case 'water': for (let k = 0; k < 4; k++) { x.strokeStyle = k % 2 ? c1 : (a2 || '#8fe3ff'); x.lineWidth = 14; x.beginPath(); for (let xx = -110; xx <= 110; xx += 10) x.lineTo(xx, -50 + k * 36 + Math.sin(xx * 0.05 + t * 3 + k) * 10); x.stroke() } break
    case 'boat': { x.fillStyle = '#4aa8d8'; x.fillRect(-120, 50, 240, 40); poly(x, [[-90, 50], [90, 50], [70, 0], [-70, 0]], c1); B(-50, -40, 100, 40, a2 || BONE); circ(x, 60, 30, 22, BONE, 4); break }
    case 'bat': { const f = Math.sin(t * 12) * 20; for (let k = 0; k < 3; k++) { x.save(); x.translate(-70 + k * 70, -20 + (k % 2) * 50); poly(x, [[-50, -f * 0.5], [-14, 0], [0, -10], [14, 0], [50, -f * 0.5], [20, 16], [0, 8], [-20, 16]], a1 || '#3a2a50', 3); x.restore() } break }
    case 'runner': { circ(x, 20, -70, 22, c1, 4); x.strokeStyle = INK; x.lineWidth = 22; x.lineCap = 'round'; const a = Math.sin(t * 8) * 0.6; x.beginPath(); x.moveTo(10, -40); x.lineTo(-10, 30); x.moveTo(-10, 30); x.lineTo(-10 + Math.sin(a) * 60, 100); x.moveTo(-10, 30); x.lineTo(-10 - Math.sin(a) * 60, 100); x.moveTo(5, -20); x.lineTo(5 + Math.sin(a) * 50, 20); x.stroke(); x.strokeStyle = c1; x.lineWidth = 12; x.stroke(); x.lineCap = 'butt'; break }
    case 'lantern': B(-30, 40, 60, 60, '#a9a39a'); B(-60, 0, 120, 40, '#a9a39a'); B(-40, -50, 80, 50, '#bdb6aa'); x.fillStyle = GOLD; x.fillRect(-20, -40, 40, 30); poly(x, [[-80, -50], [0, -100], [80, -50]], '#8f8a80'); break
    case 'fountain': B(-110, 40, 220, 50, '#a9a39a'); for (let k = 0; k < 7; k++) { const ph = (t * 1.2 + k / 7) % 1; x.fillStyle = `rgba(143,227,255,${(1 - ph).toFixed(2)})`; x.fillRect(-90 + k * 30, 30 - Math.sin(Math.PI * ph) * 110, 12, 16) } break
    case 'stage': B(-120, 0, 240, 80, c1); poly(x, [[-130, 0], [0, -90], [130, 0]], a2 || BONE); for (let k = 0; k < 5; k++) { x.fillStyle = GOLD; x.fillRect(-100 + k * 50, 70, 12, 12) } break
    case 'frame': B(-110, -80, 220, 160, '#c98e4a', 6); x.fillStyle = c1; x.fillRect(-90, -60, 180, 120); x.fillStyle = c2; x.fillRect(-90, -60, 90, 120); break
    case 'note': for (let k = 0; k < 2; k++) { const dx = -50 + k * 90, by = Math.sin(t * 4 + k) * 8; circ(x, dx, 50 + by, 26, c1, 4); B(dx + 20, -70 + by, 12, 120, INK, 0) } B(-20, -76, 102, 18, INK, 0); break
    case 'mic': circ(x, 0, -50, 46, '#8f96a0'); x.fillStyle = INK; for (let k = 0; k < 4; k++) x.fillRect(-30, -70 + k * 14, 60, 4); B(-14, -6, 28, 100, c1); break
    case 'acc': { for (let k = 0; k < 7; k++) B(-90 + k * 26, -60 - Math.sin(t * 3) * (k - 3) * 2, 20, 120, k % 2 ? c1 : c2); B(-130, -70, 40, 140, '#2a2638'); B(90, -70, 40, 140, '#2a2638'); break }
    case 'boot': poly(x, [[-40, -100], [30, -100], [30, 30], [100, 40], [100, 90], [-40, 90]], c1); x.fillStyle = c2; x.fillRect(-30, -60, 50, 10); x.fillRect(-30, -30, 50, 10); break
    case 'record': circ(x, 0, 0, 100, '#1a1a1a'); circ(x, 0, 0, 34, c1, 0); x.save(); x.rotate(t * 1.2); x.fillStyle = 'rgba(255,255,255,0.15)'; x.fillRect(-90, -4, 180, 8); x.restore(); break
    case 'speaker': B(-80, -100, 160, 200, '#2a2638'); circ(x, 0, -40, 34 + Math.abs(Math.sin(t * 6)) * 6, c1); circ(x, 0, 50, 22, c1); break
    case 'bug': { const f = Math.sin(t * 30) * 0.3; x.save(); x.rotate(0.2); x.fillStyle = 'rgba(200,230,255,0.75)'; x.beginPath(); x.ellipse(-20, -40, 50, 20, -0.5 + f, 0, TAU); x.fill(); x.beginPath(); x.ellipse(20, -40, 50, 20, 0.5 - f, 0, TAU); x.fill(); x.restore(); B(-50, -16, 100, 32, c1); circ(x, 62, 0, 20, c1, 4); x.strokeStyle = INK; x.lineWidth = 5; for (let k = 0; k < 3; k++) { x.beginPath(); x.moveTo(-30 + k * 30, 16); x.lineTo(-40 + k * 30, 60); x.stroke() } if (c2 === 'nose') { x.beginPath(); x.moveTo(80, 0); x.lineTo(130, 10); x.stroke() } break }
    case 'bird': { poly(x, [[-90, 40], [-30, 0], [40, -10], [70, -40], [100, -30], [80, 0], [60, 40], [0, 50]], c1); poly(x, [[-90, 40], [-140, 20], [-130, 70]], c1); circ(x, 76, -30, 6, a2 || GOLD, 0); poly(x, [[100, -30], [130, -24], [100, -18]], INK, 0); break }
    case 'egret': { x.strokeStyle = INK; x.lineWidth = 8; x.beginPath(); x.moveTo(-10, 40); x.lineTo(-20, 110); x.moveTo(20, 40); x.lineTo(20, 110); x.stroke(); x.fillStyle = INK; x.beginPath(); x.ellipse(0, 10, 64, 40, -0.2, 0, TAU); x.fill(); x.fillStyle = a1 || BONE; x.beginPath(); x.ellipse(0, 10, 56, 32, -0.2, 0, TAU); x.fill(); x.lineWidth = 18; x.strokeStyle = INK; x.beginPath(); x.moveTo(40, -10); x.quadraticCurveTo(70, -60, 50, -90); x.stroke(); x.strokeStyle = a1 || BONE; x.lineWidth = 10; x.stroke(); poly(x, [[50, -96], [100, -86], [50, -80]], GOLD, 3); break }
    case 'squirrel': { circ(x, -60, -20, 50, c1); circ(x, 20, 20, 50, c1); circ(x, 70, -30, 30, c1); circ(x, 60, -60, 10, c1, 3); x.fillStyle = INK; x.fillRect(80, -40, 8, 8); circ(x, 100, 30, 14, a2 || '#a5452a', 3); break }
    case 'armadillo': { x.fillStyle = INK; x.beginPath(); x.arc(0, 30, 100, Math.PI, 0); x.fill(); x.fillStyle = c1; x.beginPath(); x.arc(0, 30, 92, Math.PI, 0); x.fill(); x.strokeStyle = INK; x.lineWidth = 5; for (let k = -2; k <= 2; k++) { x.beginPath(); x.moveTo(k * 30, 30); x.lineTo(k * 24, -56); x.stroke() } poly(x, [[90, 30], [150, 20], [100, 0]], c1); poly(x, [[-90, 30], [-150, 50], [-100, 40]], c1); break }
    case 'lizard': { x.strokeStyle = INK; x.lineWidth = 34; x.lineCap = 'round'; x.beginPath(); x.moveTo(-110, 40); x.quadraticCurveTo(-40, -10, 40, 10); x.lineTo(100, -10); x.stroke(); x.strokeStyle = c1; x.lineWidth = 22; x.stroke(); x.lineCap = 'butt'; const dl = 0.5 + 0.5 * Math.sin(t * 3); circ(x, 70, 20, 10 + 20 * dl, a2 || '#ff5a8a', 3); x.fillStyle = INK; x.fillRect(96, -20, 8, 8); break }
    case 'turtle': { x.fillStyle = INK; x.beginPath(); x.arc(0, 30, 90, Math.PI, 0); x.fill(); x.fillStyle = c1; x.beginPath(); x.arc(0, 30, 82, Math.PI, 0); x.fill(); circ(x, 104, 10, 26, '#7dbf5a'); x.fillStyle = INK; x.fillRect(110, 0, 8, 8); x.fillStyle = 'rgba(0,0,0,0.2)'; for (let k = -1; k <= 1; k++) x.fillRect(k * 40 - 14, -20, 28, 28); break }
    case 'ant': for (let k = 0; k < 3; k++) circ(x, -60 + k * 50, 0, 22 - (k === 1 ? 6 : 0), c1); break
    case 'fan': for (let k = 0; k < 7; k++) { x.save(); x.rotate(-0.9 + k * 0.3 + Math.sin(t * 6) * 0.05); poly(x, [[0, 60], [-18, -90], [18, -90]], k % 2 ? c1 : c2); x.restore() } B(-10, 50, 20, 60, '#8a6a4a'); break
    case 'sweater': poly(x, [[-60, -90], [60, -90], [120, -40], [90, 0], [70, -20], [70, 100], [-70, 100], [-70, -20], [-90, 0], [-120, -40]], c1); x.fillStyle = c2; for (let k = 0; k < 4; k++) x.fillRect(-60, -20 + k * 30, 120, 10); break
    case 'umbrella': { x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 118, Math.PI, 0); x.fill(); for (let k = 0; k < 4; k++) { x.fillStyle = k % 2 ? c1 : c2; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, 110, Math.PI + k * Math.PI / 4, Math.PI + (k + 1) * Math.PI / 4); x.fill() } B(-6, 0, 12, 100, INK, 0); x.strokeStyle = INK; x.lineWidth = 10; x.beginPath(); x.arc(-20, 100, 20, 0, Math.PI); x.stroke(); break }
    case 'cooler': B(-110, -40, 220, 130, c1); B(-120, -70, 240, 40, BONE); B(-40, -100, 80, 26, c2); break
    case 'shade': { B(-130, -70, 260, 140, '#c9d4e8'); x.fillStyle = '#a8b4cc'; for (let k = 0; k < 8; k++) x.fillRect(-120 + k * 32, -60, 16, 120); txt(x, a1 || '', 0, 4, { size: 30, col: INK, font: MONO, weight: 700 }); break }
    case 'bottle': B(-40, -60, 80, 160, c1); B(-24, -100, 48, 40, c2); x.fillStyle = 'rgba(255,255,255,0.5)'; x.fillRect(-26, -40, 12, 110); break
    case 'hat': x.fillStyle = INK; x.beginPath(); x.ellipse(0, 40, 140, 34, 0, 0, TAU); x.fill(); x.fillStyle = c1; x.beginPath(); x.ellipse(0, 40, 132, 26, 0, 0, TAU); x.fill(); B(-70, -50, 140, 90, c1); x.fillStyle = c2; x.fillRect(-70, 10, 140, 18); break
    case 'shades': for (const sx of [-1, 1]) { x.fillStyle = INK; x.beginPath(); x.ellipse(sx * 60, 0, 56, 44, 0, 0, TAU); x.fill(); x.fillStyle = c1; x.beginPath(); x.ellipse(sx * 60, 0, 46, 34, 0, 0, TAU); x.fill() } B(-14, -10, 28, 12, INK, 0); break
    case 'jacket': poly(x, [[-60, -90], [60, -90], [120, -20], [90, 20], [70, 0], [70, 100], [-70, 100], [-70, 0], [-90, 20], [-120, -20]], c1); for (let k = 0; k < 4; k++) { x.fillStyle = 'rgba(0,0,0,0.15)'; x.fillRect(-70, -40 + k * 34, 140, 8) } B(-4, -90, 8, 190, c2, 0); break
    case 'P': B(-90, -90, 180, 180, '#2b5fb0'); txt(x, 'P', 0, 6, { size: 150, col: BONE }); break
    case 'garage': B(-120, -90, 240, 180, '#8f96a0'); for (let k = 0; k < 3; k++) B(-100, -70 + k * 56, 200, 30, '#5a6070', 3); break
    case 'meter': B(-12, 0, 24, 110, '#8f96a0'); B(-50, -100, 100, 100, '#6d7480'); x.fillStyle = '#bfe6ff'; x.fillRect(-34, -84, 68, 40); break
    case 'beach': { x.fillStyle = '#e8c88a'; x.fillRect(-120, 40, 240, 60); x.fillStyle = '#8a6a3a'; x.fillRect(-120, 10, 240, 34); heatSun(x, 60, -50, t, 30); icon(x, 'umbrella', -50, -10, 0.5, c1, c2, t); break }
    case 'paddle': { x.save(); x.rotate(-0.4); x.fillStyle = INK; x.beginPath(); x.ellipse(0, -30, 70, 86, 0, 0, TAU); x.fill(); x.fillStyle = c1; x.beginPath(); x.ellipse(0, -30, 62, 78, 0, 0, TAU); x.fill(); B(-14, 50, 28, 70, c2); x.restore(); circ(x, 80, 60, 18, '#e8f04a', 4); break }
    case 'brunch': icon(x, 'plate', 0, 10, 0.9, '#ffe27a', '#e8b86a'); B(70, -90, 40, 70, c1); break
    case 'chapel': B(-90, -90, 180, 180, '#3a3a3a'); x.fillStyle = '#1a1a1a'; x.fillRect(-60, -40, 120, 130); break
    case 'tunnel': { x.fillStyle = INK; x.beginPath(); x.arc(0, 40, 120, Math.PI, 0); x.fill(); x.fillStyle = '#ffd99a'; x.beginPath(); x.arc(0, 40, 108, Math.PI, 0); x.fill(); x.fillStyle = '#c9a66a'; x.beginPath(); x.arc(0, 40, 60, Math.PI, 0); x.fill(); icon(x, 'snow', 0, -20, 0.4, '#5ec8ff', 0, t); break }
    case 'kingcake': { x.fillStyle = INK; x.beginPath(); x.ellipse(0, 10, 128, 70, 0, 0, TAU); x.fill(); const C = ['#9b4fd0', '#f2c75c', '#3fae5a']; for (let k = 0; k < 12; k++) { x.fillStyle = C[k % 3]; x.beginPath(); x.moveTo(0, 10); x.ellipse(0, 10, 120, 62, 0, k * TAU / 12, (k + 1) * TAU / 12); x.fill() } x.fillStyle = INK; x.beginPath(); x.ellipse(0, 10, 50, 26, 0, 0, TAU); x.fill(); x.fillStyle = BONE; x.beginPath(); x.ellipse(0, 10, 42, 20, 0, 0, TAU); x.fill(); break }
    case 'coat': icon(x, 'jacket', 0, 0, 1, c1, c2, t); for (let k = 0; k < 3; k++) { x.fillStyle = 'rgba(0,0,0,0.18)'; x.fillRect(-70, -20 + k * 40, 140, 14) } break
    case 'tv': B(-120, -80, 240, 160, '#2a2638'); x.fillStyle = c1; x.fillRect(-100, -62, 200, 124); B(-40, 84, 80, 16, '#2a2638'); break
    case 'lamp': { const sw = Math.sin(t * 2) * 0.1; x.save(); x.rotate(sw); B(-8, -100, 16, 60, INK, 0); B(-60, -40, 120, 110, c1); x.fillStyle = c2; for (let k = 0; k < 3; k++) x.fillRect(-60, -20 + k * 32, 120, 8); x.restore(); break }
    case 'pot': B(-110, -40, 220, 130, '#8f96a0'); B(-130, -60, 260, 26, '#6d7480'); x.fillStyle = c1; x.fillRect(-100, -34, 200, 20); steam(x, t, 3, -70); break
    case 'corn': x.save(); x.rotate(-0.5); B(-30, -100, 60, 180, '#f2d64a'); x.fillStyle = '#e0b83a'; for (let k = 0; k < 8; k++) x.fillRect(-24, -90 + k * 22, 48, 6); poly(x, [[-30, 80], [-60, 120], [0, 100], [60, 120], [30, 80]], '#7dbf5a'); x.restore(); break
    case 'potato': circ(x, 0, 10, 70, '#c9945a'); for (let k = 0; k < 4; k++) { x.fillStyle = '#8a5a2a'; x.fillRect(-30 + k * 20, -10 + (k % 2) * 30, 8, 8) } break
    case 'garlic': circ(x, 0, 20, 70, '#f4efe4'); x.strokeStyle = '#c9c2b4'; x.lineWidth = 5; for (let k = -1; k <= 1; k++) { x.beginPath(); x.moveTo(k * 30, -40); x.lineTo(k * 34, 80); x.stroke() } poly(x, [[-14, -50], [0, -100], [14, -50]], '#f4efe4', 4); break
    case 'butter': B(-100, -40, 200, 80, '#ffe27a'); x.fillStyle = 'rgba(255,255,255,0.5)'; x.fillRect(-90, -30, 180, 10); break
    case 'paper': B(-130, -70, 260, 140, '#e8e2d4'); x.fillStyle = 'rgba(40,40,40,0.3)'; for (let k = 0; k < 5; k++) x.fillRect(-110, -50 + k * 24, k % 2 ? 140 : 220, 8); break
    case 'hands': circ(x, -50, 10, 50, a1 || '#c98e5a'); circ(x, 50, 10, 50, a1 || '#c98e5a'); B(-80, -60, 30, 50, a1 || '#c98e5a', 4); B(50, -60, 30, 50, a1 || '#c98e5a', 4); break
    case 'chair': B(-80, 0, 160, 24, c1); B(-80, -100, 20, 100, c1); B(-80, 24, 16, 80, c1); B(64, 24, 16, 80, c1); break
    default: { x.fillStyle = c1; x.beginPath(); for (let k = 0; k < 10; k++) { const a = -Math.PI / 2 + k * Math.PI / 5, rr = k % 2 ? 45 : 100; x.lineTo(Math.cos(a) * rr, Math.sin(a) * rr) } x.closePath(); x.fill(); x.strokeStyle = INK; x.lineWidth = 6; x.stroke() }
  }
  x.restore()
}

// ── cards: a framed panel with the icon on top and the item's name underneath ─────────────────────────────────
function fit(x, s, maxW, size, font = INTER, weight = 800) { let z = size; x.font = `${weight} ${z}px ${font}`; while (x.measureText(s).width > maxW && z > 26) { z -= 2; x.font = `${weight} ${z}px ${font}` } return z }
export function card(x, st, cx, cy, k, it, t) {
  if (k <= 0) return
  const [, name, , kind, c1, c2] = it
  const W = st.w || 720, H = st.h || 400, hw = W / 2, hh = H / 2
  x.save(); x.translate(cx, cy); x.rotate(st.rot ?? -0.02); x.scale(k, k)
  let tc = BONE, font = INTER, weight = 800, head = st.head
  switch (st.kind) {
    case 'chalk': box(x, -hw - 22, -hh - 22, W + 44, H + 44, '#7a4a2c', 6); x.fillStyle = '#1f2f2a'; x.fillRect(-hw, -hh, W, H); x.fillStyle = 'rgba(255,255,255,0.05)'; for (let k2 = 0; k2 < 8; k2++) x.fillRect(-hw + (k2 * 97) % W, -hh + (k2 * 61) % H, 120, 4); tc = '#f4efe4'; break
    case 'green': box(x, -hw, -hh, W, H, HGREEN, 8); x.strokeStyle = '#e8f1ea'; x.lineWidth = 5; x.strokeRect(-hw + 12, -hh + 12, W - 24, H - 24); tc = '#f4fbf6'; break
    case 'park': box(x, -hw - 40, hh, 30, 160, '#6b4a2a', 5); box(x, hw + 10, hh, 30, 160, '#6b4a2a', 5); box(x, -hw, -hh, W, H, '#7a5232', 8); x.strokeStyle = '#e9d39a'; x.lineWidth = 5; x.strokeRect(-hw + 14, -hh + 14, W - 28, H - 28); tc = '#f4e6c4'; font = SERIF; weight = 700; break
    case 'tile': { const g = x.createLinearGradient(0, -hh, 0, hh); g.addColorStop(0, '#3b8cff'); g.addColorStop(1, '#1d4fa8'); x.fillStyle = INK; x.fillRect(-hw - 8, -hh - 8, W + 16, H + 16); x.fillStyle = g; x.fillRect(-hw, -hh, W, H); x.fillStyle = 'rgba(255,255,255,0.12)'; x.fillRect(-hw, -hh, W, 60); tc = '#ffffff'; break }
    case 'receipt': { x.fillStyle = INK; x.fillRect(-hw - 6, -hh - 6, W + 12, H + 30); x.fillStyle = '#fbf7ee'; x.fillRect(-hw, -hh, W, H + 10); x.fillStyle = INK; for (let k2 = 0; k2 < W / 30; k2++) { x.beginPath(); x.moveTo(-hw + k2 * 30, hh + 24); x.lineTo(-hw + k2 * 30 + 15, hh + 6); x.lineTo(-hw + k2 * 30 + 30, hh + 24); x.fill() } tc = INK; font = MONO; weight = 700; break }
    case 'polaroid': box(x, -hw, -hh, W, H + 40, '#fbf7ee', 7); x.fillStyle = st.pic || '#bfe6ff'; x.fillRect(-hw + 26, -hh + 26, W - 52, H - 130); tc = INK; font = SERIF; weight = 700; break
    case 'neon': { x.fillStyle = 'rgba(10,6,24,0.92)'; x.fillRect(-hw, -hh, W, H); x.save(); x.shadowColor = st.glow || PINK; x.shadowBlur = 30; x.strokeStyle = st.glow || PINK; x.lineWidth = 8; x.strokeRect(-hw + 10, -hh + 10, W - 20, H - 20); x.restore(); tc = BONE; break }
    case 'case': box(x, -hw, -hh, W, H, 'rgba(220,240,255,0.92)', 8); x.fillStyle = '#c98e5a'; x.fillRect(-hw, hh - 120, W, 120); x.fillStyle = 'rgba(255,255,255,0.6)'; x.fillRect(-hw + 30, -hh + 20, 20, H - 160); tc = BONE; break
    case 'pastel': box(x, -hw, -hh, W, H, st.bg || '#fff0f5', 8); x.fillStyle = st.band || PINK; x.fillRect(-hw, hh - 110, W, 110); tc = INK; break
    default: box(x, -hw, -hh, W, H, st.bg || '#1c1240', 8); tc = st.tc || BONE
  }
  if (head) { const hz = fit(x, head, W - 80, 30, MONO, 700); txt(x, head, 0, -hh + 34, { size: hz, col: st.kind === 'receipt' || st.kind === 'pastel' || st.kind === 'polaroid' ? INK : (st.headCol || GOLD), font: MONO, weight: 700 }) }
  icon(x, kind, 0, st.iconY ?? -30, st.iconS ?? 1.05, c1, c2, t)
  const z = fit(x, name, W - 70, st.nameSize || 64, font, weight)
  txt(x, name, 0, hh - (st.kind === 'pastel' ? 55 : st.kind === 'polaroid' ? 30 : 58), { size: z, col: st.kind === 'pastel' ? (st.tc || INK) : st.kind === 'case' ? INK : tc, font, weight })
  x.restore()
}

// ── the episode builder ──────────────────────────────────────────────────────────────────────────────────────
// S = { hook, bg, card, hero(x, t, lt), items: [[sign, NAME, 'line | two', icon, c1, c2, mood?]], bonus?: { title: [a, b], items },
//       ask: ['Wrong?', 'line', 'line'], close: 'closing line', stars: [4 signs], tagCol, layout: 'grid' | 'arc', fx?(x, t, lt) }
const crowd = layout => Object.fromEntries(SIGN_IDS.map((id, i) => {
  if (layout === 'arc') { const a = Math.PI * (0.06 + 0.88 * i / 11); return [id, [[0, 540 - Math.cos(a) * 450, Y + 40 - Math.sin(a) * 300, 135]]] }
  return [id, [[0, 120 + (i % 6) * 168, i < 6 ? Y - 210 : Y, 150]]]
}))
const wave = () => Object.fromEntries(SIGN_IDS.map((id, i) => [id, [0.02 + (i % 6) * 0.07 + (i < 6 ? 0 : 0.04), 1.2 + (i % 6) * 0.07]]))
const MOODS = ['sparkle', 'wink', 'happy', 'wide']
export function assigns(S) {
  const tagCol = S.tagCol || BONE
  const nameTag = (x, id, cx) => txt(x, id.toUpperCase(), cx, Y + 175, { size: 34, col: tagCol, font: MONO, weight: 700 })
  const item = (it, i, dur = 2.6) => {
    const [id, , line, , , , mood] = it
    const right = (i + (S.flip ? 1 : 0)) % 2 === 1, sx = right ? 750 : 330
    return {
      dur, set: (x, t, lt) => { S.bg(x, t, lt); card(x, S.card, 540, S.cardY ?? 700, Kp(lt, 0.02, 0.32), it, t) },
      front: (x, t, lt) => { nameTag(x, id, sx); S.fx?.(x, t, lt) },
      cast: { [id]: [[0, sx + (right ? 150 : -150), Y, 290], [0.28, sx, Y, 290]] },
      mood: { [id]: mood || (id === 'pisces' ? 'heart' : MOODS[i % 4]) }, look: { [id]: [right ? -0.6 : 0.6, -0.5] },
      lines: [[0.22, dur - 0.42, id, line]],
    }
  }
  const crowdScene = (dur, draw, moods) => ({ dur, set: (x, t, lt) => { S.bg(x, t, lt); draw?.(x, t, lt) }, front: (x, t, lt) => S.fx?.(x, t, lt), cast: crowd(S.layout), hops: wave(), mood: Object.fromEntries(SIGN_IDS.map((id, i) => [id, moods ? moods[i % moods.length] : MOODS[i % 4]])) })
  const bigText = (lines, y0 = 640) => (x, t, lt) => { const k = Kp(lt, 0.08, 0.35); if (k <= 0) return; x.save(); x.globalAlpha = clamp(k); x.translate(540, y0); x.scale(k, k); lines.forEach((s, j) => { const big = j === 0, z = fit(x, s, 900, big ? 92 : 58); const w = x.measureText(s).width; x.fillStyle = 'rgba(10,6,24,0.82)'; x.fillRect(-w / 2 - 24, j * 100 - (big ? 58 : 42) + (j ? 20 : 0), w + 48, big ? 112 : 82); txt(x, s, 0, j * 100 + (j ? 20 : 0), { size: z, col: big ? GOLD : BONE }) }); x.restore() }
  const scenes = [
    crowdScene(2.6, (x, t, lt) => S.hero(x, t, lt)),
    ...S.items.map((it, i) => item(it, i)),
  ]
  if (S.bonus) scenes.push(crowdScene(2.0, bigText(S.bonus.title), ['wide']), ...S.bonus.items.map((it, i) => item(it, i + 1)))
  scenes.push(crowdScene(3.4, bigText(S.ask), ['happy', 'wink', 'sparkle']))
  return {
    hook: S.hook, badge: BADGE, cues: [...STING, ...(S.cues || [])], endLen: 6.2,
    end: (x, t, lt) => partyCard(x, t, lt, { line: S.close, stars: S.stars }),
    scenes,
  }
}
export { sparkles }
