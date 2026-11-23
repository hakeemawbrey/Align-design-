// Houston Star Talk · worker w15 (hst357–hst380): tier lists ("tier") and "tell me you're a Houston [sign]" ("tellme").
// Builders return makeEpisode() specs (promo/films/starrace/ep.js) that end on the party ticket (kit.js partyCard).
// Scripts: w15tier.js and w15tell.js. Everything is a pure function of t; no document access at module top level.
import { clamp, prog, ease, lerp } from '../../src/lib.js'
import { FLOOR, box, txt, outside, room } from '../starrace/ep.js'
import { label, signChar, sparkles, pop01, hearts, GOLD, BONE, PINK, INK, INTER, MONO, SERIF, MINT, SKYB, LAV, SIGN_IDS } from '../signs3kit.js'
import { streetSign, shield, skyline, car, freeway, heatSun, sweat, shimmer, partyCard, taco, kolache, klobasnek, coffeeShop, cones, houses, mural, BRAKE, HGREEN } from './kit.js'

export const Y = 1270
export const BADGE = { text: 'HOU BETA · JAN 9', x: 230, y: 150 }
export const NAME = id => id[0].toUpperCase() + id.slice(1)
export const Kp = (lt, a, d = 0.3) => clamp(ease.outBack(prog(lt, a, a + d)))
const STING = [['glitter', 0.0, 0.7], ['pop', 0.02, 880, 0.03, 0]]
const hash = n => { const s = Math.sin(n * 127.1) * 43758.5453; return s - Math.floor(s) }

// ── backgrounds (each paints the whole frame below the sky; motion comes from t) ───────────────────────────
const dayGrad = (x, top, bot, a = '#7cc6f0', b = '#ffd9a8') => { const g = x.createLinearGradient(0, 0, 0, bot); g.addColorStop(0, a); g.addColorStop(1, b); x.fillStyle = g; x.fillRect(0, top, 1080, bot - top) }
const ground = (x, col, y = FLOOR + 60) => { x.fillStyle = col; x.fillRect(0, y, 1080, 1920 - y); x.fillStyle = INK; x.fillRect(0, y - 6, 1080, 10) }
function tree(x, cx, base, s = 1, col = '#3f8f4a') {
  box(x, cx - 14 * s, base - 150 * s, 28 * s, 150 * s, '#6b4a2c', 5)
  for (const [dx, dy, r] of [[-50, -170, 70], [40, -180, 76], [0, -240, 84]]) { x.fillStyle = INK; x.beginPath(); x.arc(cx + dx * s, base + dy * s, r * s + 6, 0, Math.PI * 2); x.fill() }
  for (const [dx, dy, r] of [[-50, -170, 70], [40, -180, 76], [0, -240, 84]]) { x.fillStyle = col; x.beginPath(); x.arc(cx + dx * s, base + dy * s, r * s, 0, Math.PI * 2); x.fill() }
}
function clouds(x, t, n = 4, y0 = 330) { for (let k = 0; k < n; k++) { const cx = ((k * 310 + t * 18) % 1400) - 160, cy = y0 + (k * 97) % 260; x.fillStyle = 'rgba(255,255,255,0.75)'; for (const [dx, r] of [[-50, 36], [0, 50], [50, 36]]) { x.beginPath(); x.arc(cx + dx, cy, r, 0, Math.PI * 2); x.fill() } } }
function stringLights(x, t, y = 980, cols = [GOLD, PINK, SKYB, MINT]) {
  x.strokeStyle = INK; x.lineWidth = 4; x.beginPath(); x.moveTo(0, y); for (let k = 0; k <= 12; k++) x.lineTo(k * 90, y + 30 * Math.sin(Math.PI * ((k % 4) / 4))); x.stroke()
  for (let k = 0; k <= 12; k++) { const on = Math.sin(t * 3 + k) > -0.4; x.fillStyle = on ? cols[k % cols.length] : '#3a3050'; x.beginPath(); x.arc(k * 90, y + 16 + 30 * Math.sin(Math.PI * ((k % 4) / 4)), 11, 0, Math.PI * 2); x.fill() }
}
export const BG = {
  night: (x, t) => { skyline(x, FLOOR + 60, t, { alpha: 0.85 }); outside(x, { ground: '#221b38' }) },
  freeway: (x, t) => { skyline(x, FLOOR - 150, t, { alpha: 0.8 }); freeway(x, FLOOR - 160, 620, 3, t * 260) },
  traffic: (x, t) => { skyline(x, FLOOR - 150, t, { alpha: 0.8 }); freeway(x, FLOOR - 160, 620, 3, 0); for (const [cx, col] of [[150, '#7a5ab0'], [930, '#3a8f6a']]) car(x, cx, FLOOR + 40, col, { brake: 0.6 + 0.4 * Math.sin(t * 3 + cx), s: 0.8 }); },
  day: (x, t) => { dayGrad(x, 0, FLOOR + 60); clouds(x, t); tree(x, 120, FLOOR + 60, 1.1); tree(x, 960, FLOOR + 60, 0.95, '#4f9f55'); ground(x, '#4f8a3c') },
  heat: (x, t) => { dayGrad(x, 0, FLOOR + 60, '#ffb36b', '#ffe3a1'); heatSun(x, 860, 1000, t, 90); skyline(x, FLOOR + 60, t, { col: '#6b4a6a', lit: '#ffe3a1', alpha: 0.5 }); shimmer(x, 900, 500, t); ground(x, '#b98a4a') },
  cold: (x, t) => { dayGrad(x, 0, FLOOR + 60, '#8fa6c8', '#d8e2ef'); skyline(x, FLOOR + 60, t, { col: '#4a5a7a', lit: '#fff3c4', alpha: 0.7 }); ground(x, '#6f7f96') },
  bayou: (x, t) => {
    dayGrad(x, 0, FLOOR + 60, '#5a3a8a', '#ff9a6a'); x.fillStyle = '#ffcf6b'; x.beginPath(); x.arc(540, 1110, 110, 0, Math.PI * 2); x.fill()
    skyline(x, FLOOR - 40, t, { col: '#2a1a40', lit: '#ffd36b', alpha: 0.75 })
    box(x, 0, 1100, 1080, 40, '#4a3a5a', 6); for (let k = 0; k < 9; k++) box(x, 40 + k * 125, 1140, 18, 120, '#4a3a5a', 4)   // the bridge
    for (let k = 0; k < 16; k++) { const ph = (t * 0.25 + hash(k + 3)) % 1, bx = 100 + hash(k) * 880 + Math.sin(t * 2 + k) * 40, by = 1080 - ph * 700, w = 14 + 6 * Math.sin(t * 14 + k); x.fillStyle = INK; x.beginPath(); x.moveTo(bx - w, by - 6); x.lineTo(bx, by + 4); x.lineTo(bx + w, by - 6); x.lineTo(bx, by - 1); x.fill() }   // bats leave at sunset
    x.fillStyle = '#3a6a6a'; x.fillRect(0, FLOOR + 60, 1080, 1920 - FLOOR - 60); for (let k = 0; k < 12; k++) { x.fillStyle = 'rgba(255,207,107,0.35)'; x.fillRect(((k * 173 + t * 40) % 1180) - 100, FLOOR + 90 + (k * 53) % 300, 90, 6) }
  },
  kitchen: (x, t) => { room(x, { wall: '#c9785a', floor: '#6b4a3a', trim: '#4a2a1a' }); box(x, 0, FLOOR - 60, 1080, 60, '#e8d9c0', 6); box(x, 640, 720, 300, 220, '#bfe6ff', 8); x.fillStyle = INK; x.fillRect(786, 720, 8, 220); x.fillRect(640, 826, 300, 8) },
  bellaire: (x, t) => {
    x.fillStyle = '#120c2a'; x.fillRect(0, 0, 1080, FLOOR + 60)
    const S = [['PHO', '#ff5a6e'], ['BOBA', '#7dffb0'], ['KARAOKE', '#c9a6ff'], ['HOT POT', '#ffd36b'], ['BAKERY', '#8fe3ff']]
    S.forEach(([w, c], i) => { const l = -40 + i * 230, top = 860 + (i % 2) * 60; box(x, l, top, 220, FLOOR + 60 - top, ['#2a2050', '#24305a', '#3a2048'][i % 3], 6); const on = Math.sin(t * 2.3 + i * 1.7) > -0.7; x.save(); if (on) { x.shadowColor = c; x.shadowBlur = 24 } txt(x, w, l + 110, top + 50, { size: w.length > 5 ? 34 : 46, col: on ? c : '#4a4060' }); x.restore(); x.fillStyle = '#ffd36b55'; x.fillRect(l + 30, top + 110, 160, 120) })
    for (let k = 0; k < 7; k++) { const cx = 80 + k * 155, cy = 700 + 14 * Math.sin(t * 1.5 + k); x.fillStyle = INK; x.fillRect(cx - 34, cy - 40, 68, 80); x.fillStyle = '#e8323c'; x.fillRect(cx - 28, cy - 34, 56, 68); x.fillStyle = GOLD; x.fillRect(cx - 28, cy - 4, 56, 8) }   // lanterns
    outside(x, { ground: '#1e1834' })
  },
  park: (x, t) => {
    dayGrad(x, 0, FLOOR + 60, '#8fd0f5', '#e8f5ff'); clouds(x, t, 3); tree(x, 110, 1060, 0.9); tree(x, 980, 1060, 1.0, '#4f9f55')
    x.fillStyle = '#3a8fb0'; x.fillRect(0, 1060, 1080, FLOOR + 60 - 1060); for (let k = 0; k < 10; k++) { x.fillStyle = 'rgba(255,255,255,0.4)'; x.fillRect(((k * 211 + t * 30) % 1180) - 100, 1090 + (k * 37) % 180, 70, 5) }
    for (const [k, col] of [[0, '#ff8fb1'], [1, '#ffd36b']]) { const bx = 300 + k * 420 + 40 * Math.sin(t * 0.7 + k), by = 1150 + 6 * Math.sin(t * 2 + k); box(x, bx - 70, by - 20, 140, 46, col, 5); box(x, bx - 34, by - 70, 68, 50, '#efe6d6', 5); x.fillStyle = INK; x.beginPath(); x.arc(bx + 76, by, 22, 0, Math.PI * 2); x.fill() }   // paddle boats
    ground(x, '#5a9a44')
  },
  beach: (x, t) => {
    dayGrad(x, 0, 1100, '#9fd6f2', '#fff1d0'); clouds(x, t, 3, 360)
    x.fillStyle = '#8a8a5a'; x.fillRect(0, 1100, 1080, 200); for (let k = 0; k < 8; k++) { const ph = (t * 0.4 + k / 8) % 1; x.fillStyle = 'rgba(255,255,255,0.55)'; x.fillRect(((k * 190) % 1080) - 40 + ph * 60, 1120 + k * 22, 120, 6) }
    ground(x, '#e8cf94', 1300); for (let k = 0; k < 30; k++) { x.fillStyle = 'rgba(160,120,60,0.4)'; x.fillRect((k * 131) % 1080, 1340 + (k * 47) % 500, 8, 8) }
  },
  lot: (x, t) => {
    dayGrad(x, 0, 1000, '#9fd0f0', '#ffe8b8'); skyline(x, 1000, t, { col: '#5a5a7a', lit: '#fff3c4', alpha: 0.5 })
    x.fillStyle = '#4a4a58'; x.fillRect(0, 1000, 1080, 920); for (let k = 0; k < 7; k++) { x.fillStyle = BONE; x.fillRect(40 + k * 170, 1040, 10, 200) }
    car(x, 200, 1170, '#3a7ad8', { s: 0.75 }); car(x, 880, 1170, '#d84a5a', { s: 0.75 })
    tree(x, 540, 1160, 0.9); x.fillStyle = 'rgba(0,0,0,0.25)'; x.beginPath(); x.ellipse(540, 1200, 180, 40, 0, 0, Math.PI * 2); x.fill()
  },
  boil: (x, t) => {
    x.fillStyle = '#1a1438'; x.fillRect(0, 0, 1080, FLOOR + 60); houses(x, 1150, t * 0.3); stringLights(x, t, 900)
    outside(x, { ground: '#2a3a2a' })
  },
  porch: (x, t) => {
    dayGrad(x, 0, FLOOR + 60, '#9fd0f0', '#ffe0b0'); box(x, 80, 760, 920, 520, '#e8d9b8', 8); x.fillStyle = '#8a4a3a'; x.beginPath(); x.moveTo(40, 760); x.lineTo(540, 560); x.lineTo(1040, 760); x.fill(); x.strokeStyle = INK; x.lineWidth = 6; x.stroke()
    for (let k = 0; k < 6; k++) box(x, 110 + k * 170, 900, 18, 380, BONE, 4); box(x, 80, 1240, 920, 30, '#a0703a', 5); box(x, 420, 920, 240, 330, '#6b3b1f', 5)
    ground(x, '#5a8a44')
  },
  mural: (x, t) => { mural(x, t); x.fillStyle = '#2a2240'; x.fillRect(0, 0, 1080, 420); ground(x, '#3a3350') },
  coffee: (x, t) => { dayGrad(x, 0, FLOOR + 60, '#a8d8f0', '#ffe8c0'); coffeeShop(x, 640, FLOOR + 60); box(x, 0, FLOOR + 90, 1080, 70, '#3a3450', 0); txt(x, 'FEEDER ROAD', 820, FLOOR + 125, { size: 28, col: BONE, font: MONO, weight: 700 }); ground(x, '#6a6a78', FLOOR + 160) },
  museum: (x, t) => { room(x, { wall: '#efe6d6', floor: '#8a6a4a', trim: '#5a4030' }); for (const [l, w, c] of [[90, 260, '#2b5fb0'], [410, 260, '#c0304a'], [730, 260, '#1b1236']]) { box(x, l, 680, w, 330, '#c9a050', 10); x.fillStyle = c; x.fillRect(l + 20, 700, w - 40, 290) } },
  quiet: (x, t) => { x.fillStyle = '#16121e'; x.fillRect(0, 0, 1080, FLOOR + 60); for (const l of [120, 450, 780]) { box(x, l, 620, 200, 520, '#241a30', 8); x.fillStyle = `rgba(90,40,90,${(0.5 + 0.1 * Math.sin(t)).toFixed(2)})`; x.fillRect(l + 16, 640, 168, 480) } ground(x, '#2a2430') },
  slab: (x, t) => { x.fillStyle = '#1e1a2a'; x.fillRect(0, 0, 1080, FLOOR + 60); skyline(x, FLOOR - 60, t, { alpha: 0.6 }); outside(x, { ground: '#2a2638' }) },
  space: (x, t) => { x.fillStyle = 'rgba(8,10,30,0.55)'; x.fillRect(0, 0, 1080, FLOOR + 60); x.fillStyle = '#2a6a8a'; x.fillRect(0, 1120, 1080, FLOOR + 60 - 1120); for (let k = 0; k < 3; k++) { const bx = 200 + k * 330 + 30 * Math.sin(t * 0.6 + k); box(x, bx - 60, 1110, 120, 30, BONE, 4); box(x, bx - 4, 1000, 8, 110, BONE, 2) } outside(x, { ground: '#2a3044' }) },
  woods: (x, t) => { dayGrad(x, 0, FLOOR + 60, '#a8d8c8', '#e8f0d8'); for (let k = 0; k < 7; k++) tree(x, 60 + k * 160, FLOOR + 60, 0.8 + 0.25 * hash(k), k % 2 ? '#2f6f3a' : '#3f8f4a'); ground(x, '#4a7a3c') },
  run: (x, t) => { dayGrad(x, 0, FLOOR + 60, '#ffcf9a', '#ffeed0'); skyline(x, 1150, t, { col: '#8a6a8a', lit: '#fff3c4', alpha: 0.6 }); x.fillStyle = '#3a8fb0'; x.fillRect(0, 1150, 1080, 80); x.fillStyle = '#c9b08a'; x.fillRect(0, 1230, 1080, 90); for (let k = 0; k < 9; k++) { x.fillStyle = BONE; x.fillRect(((k * 140 - t * 120) % 1260 + 1260) % 1260 - 90, 1272, 60, 6) } ground(x, '#5a8a44', 1320) },
}

// ── props ──────────────────────────────────────────────────────────────────────────────────────────────────
export function crawfish(x, cx, cy, s = 1, rot = 0) {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
  for (const d of [-1, 1]) { box(x, d * 40 - 14, -70, 28, 40, '#d8402a', 4); box(x, d * 52 - 18, -104, 36, 36, '#e8502a', 4) }   // claws
  for (let k = 0; k < 4; k++) box(x, -26 + k * 2, -40 + k * 26, 52 - k * 4, 26, k % 2 ? '#c8362a' : '#e04a2a', 4)
  box(x, -30, 64, 60, 18, '#c8362a', 4); x.fillStyle = INK; x.fillRect(-14, -30, 8, 8); x.fillRect(6, -30, 8, 8)
  x.restore()
}
export function boba(x, cx, cy, s = 1, col = '#d8a8f0') {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-56, -80); x.lineTo(56, -80); x.lineTo(42, 90); x.lineTo(-42, 90); x.fill()
  x.fillStyle = col; x.beginPath(); x.moveTo(-48, -72); x.lineTo(48, -72); x.lineTo(36, 82); x.lineTo(-36, 82); x.fill()
  for (let k = 0; k < 7; k++) { x.fillStyle = '#3a2418'; x.beginPath(); x.arc(-26 + (k % 4) * 17, 62 - Math.floor(k / 4) * 16, 8, 0, Math.PI * 2); x.fill() }
  box(x, 6, -150, 16, 80, '#ff8fb1', 3); box(x, -62, -92, 124, 18, BONE, 4)
  x.restore()
}
export function phone(x, cx, cy, s = 1, text = '', t = 0) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  box(x, -90, -160, 180, 320, INK, 6); x.fillStyle = '#e8f0ff'; x.fillRect(-78, -140, 156, 270)
  if (text) { const L = text.split(' | '); L.forEach((l, i) => { box(x, -74, -126 + i * 74, 148, 60, i % 2 ? '#ff8fb1' : '#8fe3ff', 3); txt(x, l, 0, -96 + i * 74, { size: l.length > 9 ? 24 : 30, col: INK, font: INTER, weight: 800 }) }) }
  x.restore()
}
export function bowl(x, cx, cy, s = 1, t = 0) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 96, 0, Math.PI); x.fill(); x.fillRect(-100, -8, 200, 12)
  x.fillStyle = '#efe6d6'; x.beginPath(); x.arc(0, 0, 88, 0, Math.PI); x.fill(); x.fillStyle = '#d8a050'; x.fillRect(-88, -6, 176, 12)
  for (let k = 0; k < 3; k++) { const ph = (t * 0.7 + k / 3) % 1; x.strokeStyle = `rgba(255,255,255,${(0.7 * (1 - ph)).toFixed(2)})`; x.lineWidth = 6; x.beginPath(); x.moveTo(-40 + k * 40, -20 - ph * 100); x.quadraticCurveTo(-20 + k * 40, -50 - ph * 100, -40 + k * 40, -80 - ph * 100); x.stroke() }
  x.restore()
}
export function coat(x, cx, cy, s = 1, col = '#e05a3a') { x.save(); x.translate(cx, cy); x.scale(s, s); for (let k = 0; k < 4; k++) box(x, -70, -90 + k * 46, 140, 42, col, 5); box(x, -110, -90, 36, 150, col, 5); box(x, 74, -90, 36, 150, col, 5); box(x, -50, -130, 100, 40, '#2b5fb0', 5); x.restore() }
export function sweater(x, cx, cy, s = 1, col = '#8fe3ff') { x.save(); x.translate(cx, cy); x.scale(s, s); box(x, -80, -70, 160, 150, col, 6); box(x, -130, -70, 50, 120, col, 5); box(x, 80, -70, 50, 120, col, 5); for (let k = 0; k < 3; k++) { x.fillStyle = BONE; x.fillRect(-60, -40 + k * 40, 120, 8) } x.restore() }
export function clipboard(x, cx, cy, s = 1) { x.save(); x.translate(cx, cy); x.scale(s, s); box(x, -70, -95, 140, 190, '#a0703a', 6); box(x, -56, -78, 112, 160, BONE, 3); box(x, -30, -108, 60, 26, '#8f96a0', 4); for (let k = 0; k < 5; k++) { x.fillStyle = INK; x.fillRect(-40, -50 + k * 28, 18, 6); x.fillRect(-14, -50 + k * 28, 56, 6) } x.restore() }
export function glasses(x, P, id) { const [cx, cy, s] = P.at(id); x.strokeStyle = INK; x.lineWidth = Math.max(4, s * 0.025); for (const d of [-1, 1]) x.strokeRect(cx + d * s * 0.13 - s * 0.1, cy - s * 0.12, s * 0.2, s * 0.12); x.beginPath(); x.moveTo(cx - s * 0.03, cy - s * 0.07); x.lineTo(cx + s * 0.03, cy - s * 0.07); x.stroke() }
export function bandana(x, cx, cy, s = 1) { x.save(); x.translate(cx, cy); x.scale(s, s); x.fillStyle = INK; x.beginPath(); x.moveTo(-64, -6); x.lineTo(64, -6); x.lineTo(0, 66); x.fill(); x.fillStyle = '#e8323c'; x.beginPath(); x.moveTo(-54, 0); x.lineTo(54, 0); x.lineTo(0, 54); x.fill(); for (let k = 0; k < 4; k++) { x.fillStyle = BONE; x.fillRect(-30 + k * 16, 10 + (k % 2) * 10, 6, 6) } x.restore() }
export function dog(x, cx, cy, s = 1, t = 0) { x.save(); x.translate(cx, cy); x.scale(s, s); box(x, -70, -30, 140, 60, '#c98e4a', 5); box(x, 50, -80, 60, 60, '#c98e4a', 5); box(x, 90, -60, 30, 20, '#6b3b1f', 3); for (const lx of [-60, -20, 20, 50]) box(x, lx, 30, 16, 40, '#c98e4a', 3); x.save(); x.translate(-70, -20); x.rotate(Math.sin(t * 12) * 0.5); box(x, -40, -8, 40, 14, '#c98e4a', 3); x.restore(); x.fillStyle = INK; x.fillRect(80, -66, 8, 8); bandana(x, 70, -20, 0.45); x.restore() }
export function cone(x, cx, base, s = 1) { x.save(); x.translate(cx, base); x.scale(s, s); x.fillStyle = INK; x.beginPath(); x.moveTo(-44, 0); x.lineTo(0, -120); x.lineTo(44, 0); x.fill(); x.fillStyle = '#ff7a2a'; x.beginPath(); x.moveTo(-36, -4); x.lineTo(0, -110); x.lineTo(36, -4); x.fill(); x.fillStyle = BONE; x.fillRect(-20, -66, 40, 12); x.restore() }
export function mapPin(x, cx, cy, s = 1, col = BRAKE) { x.save(); x.translate(cx, cy); x.scale(s, s); x.fillStyle = INK; x.beginPath(); x.arc(0, -40, 46, Math.PI, 0); x.lineTo(0, 50); x.closePath(); x.fill(); x.fillStyle = col; x.beginPath(); x.arc(0, -40, 38, Math.PI, 0); x.lineTo(0, 38); x.closePath(); x.fill(); x.fillStyle = BONE; x.beginPath(); x.arc(0, -40, 14, 0, Math.PI * 2); x.fill(); x.restore() }
export function sneaker(x, cx, cy, s = 1, col = '#ff5a6e') { x.save(); x.translate(cx, cy); x.scale(s, s); box(x, -80, -20, 160, 50, col, 5); box(x, -80, -60, 80, 44, col, 5); box(x, -84, 30, 170, 16, BONE, 4); x.fillStyle = BONE; for (let k = 0; k < 3; k++) x.fillRect(-60 + k * 18, -50, 10, 30); x.restore() }
export function paddle(x, cx, cy, s = 1) { x.save(); x.translate(cx, cy); x.scale(s, s); x.rotate(-0.4); box(x, -50, -70, 100, 110, '#2b5fb0', 6); box(x, -12, 40, 24, 80, '#6b4a2c', 4); x.fillStyle = BONE; for (let k = 0; k < 9; k++) x.fillRect(-36 + (k % 3) * 30, -52 + Math.floor(k / 3) * 32, 8, 8); x.restore() }
export function hedge(x, cx, base, s = 1) { x.save(); x.translate(cx, base); x.scale(s, s); box(x, -110, -120, 220, 120, '#2f6f3a', 6); x.strokeStyle = 'rgba(255,255,255,0.25)'; x.lineWidth = 3; for (let k = 0; k < 5; k++) { x.beginPath(); x.moveTo(-100, -100 + k * 22); x.lineTo(100, -100 + k * 22); x.stroke() } x.restore() }
export function thermo(x, cx, cy, s = 1, text = '55°') { x.save(); x.translate(cx, cy); x.scale(s, s); box(x, -24, -130, 48, 200, BONE, 5); x.fillStyle = BRAKE; x.fillRect(-10, -40, 20, 110); x.fillStyle = INK; x.beginPath(); x.arc(0, 90, 40, 0, Math.PI * 2); x.fill(); x.fillStyle = BRAKE; x.beginPath(); x.arc(0, 90, 32, 0, Math.PI * 2); x.fill(); txt(x, text, 0, -170, { size: 54, col: INK }); x.restore() }
export function ticketMini(x, cx, cy, s = 1) { x.save(); x.translate(cx, cy); x.rotate(-0.08); x.scale(s, s); box(x, -130, -70, 260, 140, '#1c1240', 6); x.fillStyle = GOLD; x.fillRect(-130, -70, 260, 10); txt(x, 'JAN 9', 0, 6, { size: 60, col: GOLD }); x.restore() }
export function signpole(x, cx, cy, text, s = 0.8) { streetSign(x, cx, cy, text, { k: s, w: Math.max(300, text.length * 34 + 80) }) }

/** prop dispatcher: [name, ...args] drawn at (cx, cy) */
export function prop(x, P, t, lt, spec, cx = 800, cy = 1290) {
  if (!spec) return
  const [n, a, b] = spec, k = Kp(lt, 0.1, 0.35); if (k <= 0) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.translate(-cx, -cy)
  const bob = Math.sin(t * 3) * 6
  switch (n) {
    case 'taco': taco(x, cx, cy + bob, 2.0); if (a) txt(x, a, cx, cy + 90, { size: 34, col: BONE, font: MONO, weight: 700 }); break
    case 'tacos': taco(x, cx - 70, cy + bob, 1.5); taco(x, cx + 70, cy - bob, 1.5); break
    case 'kolache': kolache(x, cx, cy + bob, 1.6); break
    case 'klobasnek': klobasnek(x, cx, cy + bob, 1.4); break
    case 'both': kolache(x, cx - 80, cy + bob, 1.1); klobasnek(x, cx + 70, cy - bob, 1.0); break
    case 'crawfish': crawfish(x, cx, cy + bob, 1.1, 0.2 * Math.sin(t * 2)); break
    case 'pile': for (let k = 0; k < 7; k++) crawfish(x, cx - 120 + (k % 4) * 80, cy - Math.floor(k / 4) * 70 + 20, 0.55, k * 0.7); break
    case 'boba': boba(x, cx, cy + bob, 1.1, a || '#d8a8f0'); break
    case 'bowl': bowl(x, cx, cy, 1.1, t); break
    case 'phone': phone(x, cx, cy - 40 + bob, 1.2, a || '', t); break
    case 'coat': coat(x, cx, cy + bob, 0.9, a || '#e05a3a'); break
    case 'sweater': sweater(x, cx, cy + bob, 0.9, a || '#8fe3ff'); break
    case 'clipboard': clipboard(x, cx, cy + bob, 1.1); break
    case 'dog': dog(x, cx, cy + 40, 1.1, t); break
    case 'cone': cone(x, cx - 60, cy + 70, 1); cone(x, cx + 60, cy + 70, 1); break
    case 'pin': mapPin(x, cx, cy + bob, 1.3, a || BRAKE); break
    case 'sneaker': sneaker(x, cx, cy + bob, 1.1, a || '#ff5a6e'); break
    case 'paddle': paddle(x, cx, cy, 1.1); break
    case 'hedge': hedge(x, cx, cy + 80, 1.1); break
    case 'thermo': thermo(x, cx, cy + 20, 1.0, a || '55°'); break
    case 'sun': heatSun(x, cx, cy - 40, t, 80); break
    case 'sweat': heatSun(x, cx, cy - 40, t, 60); sweat(x, cx, cy + 60, t, 3); break
    case 'car': car(x, cx, cy + 40, a || '#3a7ad8', { s: 0.85, brake: Math.sin(t * 4) > 0 ? 1 : 0 }); break
    case 'shield': shield(x, cx, cy, a || '610', 1.0); break
    case 'sign': streetSign(x, cx, cy - 60, a, { k: 0.75, pole: false, w: Math.max(300, a.length * 34 + 80) }); break
    case 'coffee': box(x, cx - 50, cy - 60, 100, 130, BONE, 6); box(x, cx - 50, cy - 20, 100, 40, '#8a5530', 0); box(x, cx + 50, cy - 30, 30, 60, BONE, 5); break
    case 'ticket': ticketMini(x, cx, cy + bob, 1.1); break
    case 'heart': hearts(x, t, cx, cy, t - lt, { n: 5, spread: 120, cell: 8, seed: 3 }); break
    case 'text': { box(x, cx - 170, cy - 70, 340, 140, a === 'dark' ? INK : BONE, 6); txt(x, b, cx, cy, { size: 40, col: a === 'dark' ? GOLD : INK, font: MONO, weight: 700 }); break }
  }
  x.restore()
}

// ── TIER LIST builder ──────────────────────────────────────────────────────────────────────────────────────
const TIERS = [['S', '#ff5a6e'], ['A', '#ff9a3c'], ['B', '#f2c75c'], ['C', '#7dffb0'], ['D', '#8fe3ff']]
const BX = 50, BW = 980, BY = 340, RH = 100
const slotXY = (tier, slot) => [BX + 120 + 80 + slot * 160, BY + tier * RH + RH / 2]
function board(x, t, items, upto, lt, { title, head = GOLD, lane = 'rgba(14,10,32,0.82)' }) {
  label(x, 540, BY - 52, title, 1, { size: 36, bg: head, rot: -0.02 })
  TIERS.forEach(([L, c], i) => { const y = BY + i * RH; box(x, BX, y, 112, RH - 8, c, 5); txt(x, L, BX + 56, y + RH / 2 - 2, { size: 62, col: INK }); x.fillStyle = INK; x.fillRect(BX + 118, y - 5, BW - 118, RH + 2); x.fillStyle = lane; x.fillRect(BX + 123, y, BW - 128, RH - 8) })
  items.forEach((it, i) => {
    if (i > upto) return
    const [sx, sy] = slotXY(it.tier, it.slot), k = i < upto ? 1 : clamp(ease.outBack(prog(lt, 2.15, 2.45)))
    if (k > 0) signChar(x, t, it.id, sx, sy - 4, 84, { mood: it.mood || 'happy', pop: k, seed: 10 + i, tears: it.id === 'pisces' ? 1 : 0, hops: [t - lt + 2.2] })
  })
}
/**
 * tierEp({ hook, title, bg, head, music, items: [[sign, 'S'|'A'|…, 'line | two', prop?, mood?]], intro: [sign, line],
 *          twist: [[lt, d, sign, line]], twistCast, cta: ['big', 'small'], end: { line, stars } })
 */
export function tierEp(E) {
  const items = []; const count = [0, 0, 0, 0, 0]
  for (const [id, T, line, pr, mood] of E.items) { const tier = 'SABCD'.indexOf(T); items.push({ id, tier, slot: count[tier]++, line, prop: pr, mood }) }
  const bg = BG[E.bg] || BG.night
  const opt = { title: E.title, head: E.head || GOLD }
  const crowd = () => Object.fromEntries(SIGN_IDS.map((id, i) => [id, [[0, 115 + (i % 6) * 170, i < 6 ? 1060 : 1270, 150]]]))
  const wave = () => Object.fromEntries(SIGN_IDS.map((id, i) => [id, [0.02 + (i % 6) * 0.07 + (i < 6 ? 0 : 0.04), 1.2 + (i % 6) * 0.07]]))
  const intro = {
    dur: 2.6, set: (x, t, lt) => { bg(x, t, lt); if (E.introProp) { x.save(); x.translate(540, 840); x.scale(1.5, 1.5); x.translate(-540, -840); prop(x, null, t, lt + 1, E.introProp, 540, 840); x.restore() } },
    cast: crowd(), hops: wave(), mood: Object.fromEntries(SIGN_IDS.map((id, i) => [id, ['sparkle', 'wide', 'happy', 'wink'][i % 4]])),
  }
  const beats = items.map((it, i) => ({
    dur: E.beat || 3.0,
    set: (x, t, lt, P) => { bg(x, t, lt); board(x, t, items, i, lt, opt) },
    front: (x, t, lt, P) => {
      txt(x, it.id.toUpperCase(), 300, Y + 165, { size: 34, col: BONE, font: MONO, weight: 700 })
      prop(x, P, t, lt, it.prop, 800, 1300)
      const vk = pop01(t, t - lt + 1.55, 0.3, 1.8) * (1 - ease.inQuad(prog(lt, 2.6, 2.95)))
      if (vk > 0) label(x, 790, 1080, `${'SABCD'[it.tier]} TIER`, vk, { size: 64, bg: TIERS[it.tier][1], rot: 0.05 })
      const f = prog(lt, 1.8, 2.2)
      if (f > 0 && f < 1) { const [sx, sy] = slotXY(it.tier, it.slot), u = ease.inOutCubic(f); signChar(x, t, it.id, lerp(300, sx, u), lerp(Y, sy, u) - Math.sin(Math.PI * u) * 160, lerp(160, 84, u), { mood: 'sparkle', seed: 4 }) }
    },
    cast: { [it.id]: [[0, 300, Y, 250]] }, mood: { [it.id]: it.mood || (it.tier <= 1 ? 'sparkle' : it.tier >= 3 ? (it.id === 'pisces' ? 'heart' : 'wide') : 'happy') }, look: { [it.id]: [0, 0.3] },
    lines: [[0.12, 1.85, it.id, it.line]],
  }))
  const twist = { dur: E.twistDur || 3.4, set: (x, t, lt) => { bg(x, t, lt); board(x, t, items, items.length, 99, opt) }, cast: E.twistCast, mood: E.twistMood || {}, lines: E.twist, front: E.twistFront }
  const cta = {
    dur: 3.0, set: (x, t, lt) => { bg(x, t, lt); board(x, t, items, items.length, 99, opt) }, cast: crowd(), hops: wave(), mood: Object.fromEntries(SIGN_IDS.map(id => [id, 'happy'])),
    front: (x, t, lt) => { const k = Kp(lt, 0.1, 0.35); if (k > 0) { x.save(); x.globalAlpha = clamp(k); box(x, 90, 852, 900, 74, 'rgba(14,10,32,0.9)', 0); txt(x, E.cta[0], 540, 889, { size: 54, col: GOLD }); x.restore() } const k2 = Kp(lt, 0.5, 0.35); if (k2 > 0) label(x, 540, 1418, E.cta[1], k2, { size: 44, bg: PINK, rot: -0.02 }) },
  }
  const stamps = beats.map((b, i) => ['pop', Math.round((2.6 + i * (E.beat || 3.0) + 2.2) * 100) / 100, [1046.5, 880, 784, 659.25, 587.33][items[i].tier], 0.02, 0])
  return {
    hook: E.hook, badge: BADGE, cues: [...STING, ...stamps, ...(E.cues || [])], endLen: 6.2,
    end: (x, t, lt) => partyCard(x, t, lt, E.end),
    scenes: [intro, ...beats, twist, cta],
  }
}

// ── TELL ME builder ────────────────────────────────────────────────────────────────────────────────────────
// tellEp({ sign, hook, hidden: 'LEO', clues: [{ bg, lines: [[lt, d, 'text']], prop, stick, cast?, mood?, front? }], cameo: scene, reveal: [...lines], end })
export function tellEp(E) {
  const id = E.sign, hid = E.hidden || id.toUpperCase()
  const titleCard = (x, t, lt, k = 1) => {
    if (k <= 0) return
    x.save(); x.translate(540, 820); x.rotate(-0.03); x.scale(k, k)
    box(x, -430, -120, 860, 240, E.card || '#1c1240', 8); x.fillStyle = GOLD; x.fillRect(-430, -120, 860, 10)
    txt(x, "TELL ME YOU'RE A HOUSTON", 0, -60, { size: 42, col: BONE, font: MONO, weight: 700 })
    const w = Math.max(260, hid.length * 52), on = Math.floor(t * 2.5) % 2
    box(x, -w / 2, -20, w, 84, INK, 0); txt(x, on ? '★ ★ ★' : 'BEEP', 0, 22, { size: 52, col: on ? GOLD : PINK })
    txt(x, 'WITHOUT TELLING ME', 0, 92, { size: 34, col: GOLD, font: MONO, weight: 700 })
    x.restore()
  }
  const intro = {
    dur: 2.6, set: (x, t, lt) => { (BG[E.introBg || E.clues[0].bg] || BG.night)(x, t, lt); titleCard(x, t, lt) },
    cast: { [id]: [[0, 540, Y, 300]], ...(E.introCast || {}) }, hops: { [id]: [0.02, 0.55, 1.1, 1.65] }, mood: { [id]: 'wink', ...(E.introMood || {}) },
  }
  const clues = E.clues.map((c, i) => { const R = i % 2 === 1, sx = c.x ?? (R ? 750 : 330); return {
    dur: c.dur || 3.6,
    set: (x, t, lt) => (BG[c.bg] || BG.night)(x, t, lt),
    back: c.back,
    front: (x, t, lt, P) => {
      prop(x, P, t, lt, c.prop, c.px ?? (R ? 290 : 800), c.py ?? 1290)
      label(x, 860, 300, `CLUE ${i + 1}`, pop01(t, t - lt + 0.05, 0.3, 1.8), { size: 40, bg: E.accent || GOLD, rot: 0.04, font: MONO, weight: 700 })
      if (c.beep && lt > c.beep && lt < c.beep + 1.0) { label(x, 540, 640, 'BEEP', pop01(t, t - lt + c.beep, 0.25, 2), { size: 90, bg: PINK, rot: -0.06 }) }
      c.front?.(x, t, lt, P)
    },
    cast: c.cast || { [id]: [[0, R ? 1250 : -170, Y, 270], [0.3, sx, Y, 270]] }, mood: c.mood || { [id]: 'happy' }, look: c.look || { [id]: [0, 0.3] }, hops: c.hops,
    lines: c.lines.map(l => l.length === 3 ? [l[0], l[1], id, l[2]] : l), stick: c.stick,
  } })
  const reveal = {
    dur: E.revealDur || 3.6, set: (x, t, lt) => { (BG[E.revealBg || 'night'])(x, t, lt); if (lt > 0.4) sparkles(x, t, 540, 1100, t - lt + 0.4, 12, 360, 7) },
    front: (x, t, lt) => { const k = Kp(lt, 1.9, 0.35); if (k > 0) label(x, 540, 1440, E.cta || 'Comment your sign.', k, { size: 46, bg: PINK, rot: -0.02 }) },
    cast: { [id]: [[0, 540, Y, 320]], ...(E.revealCast || {}) }, mood: { [id]: lt => lt > 0.9 ? 'sparkle' : 'wide', ...(E.revealMood || {}) }, hops: { [id]: [1.0, 1.4] },
    lines: E.reveal.map(l => l.length === 3 ? [l[0], l[1], id, l[2]] : l),
  }
  let acc = 2.6; const beeps = []
  for (const c of E.clues) { if (c.beep) beeps.push(['pop', Math.round((acc + c.beep) * 100) / 100, 1567.98, 0.03, 0]); acc += c.dur || 3.6 }
  return {
    hook: E.hook, badge: BADGE, cues: [...STING, ...beeps, ...(E.cues || [])], endLen: 6.2,
    end: (x, t, lt) => partyCard(x, t, lt, E.end),
    scenes: [intro, ...clues, ...(E.cameo ? [E.cameo] : []), reveal],
  }
}
