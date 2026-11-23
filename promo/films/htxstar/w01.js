// Houston Star Talk · worker w01 · the ADVICE format (OG Star Talk): one sign's star looks at YOU and gives Houston-flavoured
// dating advice in the retro RPG dialogue box, then ★ LESSON UNLOCKED, then the Jan 9 party ticket (kit.js partyCard).
// Built on starrace/ep.js (makeEpisode). Everything here is a pure function of t; no `document` at module top level.
//
// advice(A) → an episode object for makeEpisode. A = {
//   sign, hook, close, stars: [4 ids for the ticket], lesson: ['Inter line', 'Garamond accent line'],
//   tags?: { id: 'AUNTIE ♋ CANCER' }, wear?: { id: 'glasses' }, pal?: { box, tag }, cues?: [...],
//   beats: [{ set: 'freeway' | fn, o?: {...set options}, say: ['line', ['pisces', 'line'], …], mood?, at?: [x, y, size],
//             cast?: { id: [x, y, size, mood?] }, wear?: { id: 'shades' }, stick?: 'TEXT' | ['TEXT', bg], dur?, front?(x, t, lt) }] }
import { clamp, prog, ease } from '../../src/lib.js'
import { box, txt, FLOOR } from '../starrace/ep.js'
import { label, sparkles, pop01, signChar, starFrame, inSprite, GOLD, BONE, PINK, INK, INTER, MONO, SERIF, GLYPH_FONT, MINT, SKYB, LAV } from '../signs3kit.js'
import { SIGNS } from '../wheel.js'
import { skyline, car, freeway, heatSun, shimmer, partyCard, taco, BRAKE, HGREEN, streetSign, shield, overheadSign, calendar, cones, loopMap, mural, coffeeShop, slab, houses, kolache, klobasnek, soupPot, puffer } from './kit.js'

export const GY = 1010                        // ground line of every set (the box covers 1080–1400)
const BOX = { l: 60, t: 1084, w: 960, h: 316 }
const CPS = 30, ROW = 28
const SG = id => SIGNS.find(s => s.id === id)
const r2 = v => Math.round(v * 100) / 100
const hash = n => { const s = Math.sin(n * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s) }

// ── little helpers ───────────────────────────────────────────────────────────────────────────────────────────
export function grad(x, top, bot, y0 = 0, y1 = GY) { const g = x.createLinearGradient(0, y0, 0, y1); g.addColorStop(0, top); g.addColorStop(1, bot); x.fillStyle = g; x.fillRect(0, y0, 1080, y1 - y0) }
export function ground(x, col = '#2a2140', { y = GY, edge = INK } = {}) { x.fillStyle = col; x.fillRect(0, y, 1080, 1920 - y); x.fillStyle = edge; x.fillRect(0, y - 5, 1080, 10) }
export function farSky(x, t, base, s = 0.5, alpha = 0.8, col) { x.save(); x.translate(540 * (1 - s), base * (1 - s)); x.scale(s, s); skyline(x, base, t, { alpha, ...(col ? { col } : {}) }); x.restore() }
export function tree(x, cx, base, s = 1, col = '#2f7a46') {
  box(x, cx - 12 * s, base - 120 * s, 24 * s, 120 * s, '#5a3a24', 5)
  for (const [dx, dy, r] of [[0, -170, 70], [-55, -130, 55], [55, -130, 55]]) { x.fillStyle = INK; x.beginPath(); x.arc(cx + dx * s, base + dy * s, (r + 6) * s, 0, Math.PI * 2); x.fill() }
  for (const [dx, dy, r] of [[0, -170, 70], [-55, -130, 55], [55, -130, 55]]) { x.fillStyle = col; x.beginPath(); x.arc(cx + dx * s, base + dy * s, r * s, 0, Math.PI * 2); x.fill() }
}
function stringLights(x, t, y = 300, cols = [GOLD, PINK, MINT, SKYB]) {
  x.strokeStyle = INK; x.lineWidth = 4; x.beginPath(); x.moveTo(0, y); for (let k = 0; k <= 12; k++) x.quadraticCurveTo(k * 90 - 45, y + 40, k * 90, y); x.stroke()
  for (let k = 0; k < 24; k++) { const on = Math.sin(t * 3 + k * 1.3) > -0.4; x.fillStyle = on ? cols[k % cols.length] : '#3a3050'; x.beginPath(); x.arc(22 + k * 45, y + 18 + 8 * Math.sin(k * 1.57), 9, 0, Math.PI * 2); x.fill() }
}
function snow(x, t, l, top, w, h, n = 20, col = '#dff4ff') { for (let k = 0; k < n; k++) { const ph = (t * 0.25 + hash(k)) % 1; x.fillStyle = col; x.fillRect(l + hash(k + 9) * w + Math.sin(t * 2 + k) * 10, top + ph * h, 8, 8) } }
function neon(x, cx, cy, text, col, t, size = 54) { x.save(); x.shadowColor = col; x.shadowBlur = 24 + 8 * Math.sin(t * 5); txt(x, text, cx, cy, { size, col, font: MONO, weight: 700 }); x.restore() }
function sign(x, cx, cy, text, { bg = BONE, col = INK, size = 34, rot = 0 } = {}) { x.save(); x.translate(cx, cy); x.rotate(rot); x.font = `800 ${size}px ${INTER}`; const w = x.measureText(text).width + 40; box(x, -w / 2, -size * 0.8, w, size * 1.6, bg, 5); txt(x, text, 0, 2, { size, col }); x.restore() }
function heartPx(x, cx, cy, s = 6, col = PINK) { const H = ['.##.##.', '#######', '#######', '.#####.', '..###..', '...#...']; H.forEach((r, j) => [...r].forEach((c, i) => { if (c === '#') { x.fillStyle = col; x.fillRect(cx + (i - 3.5) * s, cy + (j - 3) * s, s, s) } })) }

// ── the Houston sets: (x, t, lt, o) ──────────────────────────────────────────────────────────────────────────
export const SETS = {
  night(x, t) { farSky(x, t, GY, 0.9, 0.9); ground(x, '#221b38') },
  cityglow(x, t) {   // why you can't see stars: the city glow at the horizon
    const g = x.createLinearGradient(0, 300, 0, GY); g.addColorStop(0, 'rgba(255,150,80,0)'); g.addColorStop(1, 'rgba(255,150,80,0.55)'); x.fillStyle = g; x.fillRect(0, 300, 1080, GY - 300)
    farSky(x, t, GY, 0.8, 1); ground(x, '#2a2036')
  },
  freeway(x, t, lt, o = {}) {
    grad(x, o.top || '#3b2a6a', o.bot || '#f08a5a', 0, 760); farSky(x, t, 760, 0.45, 0.8)
    x.fillStyle = '#2a2638'; x.fillRect(0, 760, 1080, GY - 760); x.fillStyle = GOLD; x.fillRect(0, 768, 1080, 6)
    for (let d = -((t * (o.speed ?? 30)) % 120) - 120; d < 1080; d += 120) { x.fillStyle = BONE; x.fillRect(d, 880, 64, 7) }
    const cols = ['#5ec8ff', '#ff8fb1', '#7dffb0', '#c9a6ff', '#ffd36b', '#e05a3a']
    for (let k = 0; k < 6; k++) { const cx = ((k * 230 + t * (o.speed ?? 30)) % 1380) - 150; car(x, cx, k % 2 ? 960 : 840, cols[k], { brake: o.brake ?? 1, s: 0.55, flip: false }) }
    if (o.road) { box(x, 780, 120, 14, 330, '#8f96a0', 4); shield(x, 787, 220, o.road, 0.9) }
    ground(x, '#1f1a2e', { y: GY })
  },
  feeder(x, t, lt, o = {}) {
    grad(x, '#6fb7e8', '#f6d7a6', 0, GY); farSky(x, t, 760, 0.4, 0.6, '#5a6a8a')
    x.fillStyle = '#9aa0ad'; x.fillRect(0, 700, 1080, 50); x.fillStyle = INK; x.fillRect(0, 700, 1080, 6); x.fillRect(0, 744, 1080, 6)   // the freeway overhead
    for (let k = 0; k < 6; k++) box(x, 80 + k * 190, 750, 22, GY - 750, '#7a808c', 4)
    coffeeShop(x, o.shopX ?? 820, GY, !!o.closed)
    streetSign(x, 210, 520, o.street || 'FEEDER RD', { k: 1, pole: false, sub: o.sub || 'U-TURN AHEAD' })
    ground(x, '#4a4656')
  },
  bayou(x, t, lt, o = {}) {
    grad(x, o.top || '#2b2060', o.bot || '#ff9a6a', 0, 860); farSky(x, t, 840, 0.5, 0.85)
    x.fillStyle = '#2f6a4a'; x.fillRect(0, 820, 1080, 60)
    x.fillStyle = '#2a4f6a'; x.fillRect(0, 870, 1080, 80); for (let k = 0; k < 14; k++) { const w = (k * 97 + t * 30) % 1180 - 100; x.fillStyle = 'rgba(255,220,180,0.45)'; x.fillRect(w, 886 + (k % 3) * 20, 60, 5) }
    x.fillStyle = '#c9a77a'; x.fillRect(0, 950, 1080, 60); x.fillStyle = INK; x.fillRect(0, 946, 1080, 6)
    tree(x, 90, 950, 0.9); tree(x, 990, 950, 1.1, '#2a6b3e')
    ground(x, '#3a5a3a')
  },
  bats(x, t, lt) {
    grad(x, '#3a2a78', '#ff8a4a', 0, 860)
    x.fillStyle = '#ffd36b'; x.beginPath(); x.arc(820, 760, 90, 0, Math.PI * 2); x.fill()
    x.fillStyle = '#2a3a5a'; x.fillRect(0, 860, 1080, 150)
    box(x, -10, 720, 1100, 60, '#3a3450', 6); for (const px of [160, 540, 920]) box(x, px - 25, 780, 50, 230, '#3a3450', 6)
    for (let k = 0; k < 70; k++) {          // the bats stream out from under the bridge at sunset
      const ph = (t * 0.22 + hash(k)) % 1, bx = 540 + (hash(k + 3) - 0.5) * 700 * ph + Math.sin(t * 3 + k) * 20, by = 760 - ph * 640 + hash(k + 7) * 40
      const f = Math.sin(t * 18 + k) > 0; x.fillStyle = '#140e22'; x.fillRect(bx - 4, by - 3, 8, 6); x.fillRect(bx - 14, by - (f ? 9 : -2), 10, 4); x.fillRect(bx + 4, by - (f ? 9 : -2), 10, 4)
    }
    ground(x, '#2a3a2a')
  },
  paddle(x, t) {
    grad(x, '#8fd0ff', '#d8f0ff', 0, 760); tree(x, 120, 800, 1); tree(x, 960, 800, 1.2, '#3a8a4a'); tree(x, 300, 790, 0.7, '#2f7a46')
    x.fillStyle = '#4a9ac0'; x.fillRect(0, 780, 1080, GY - 780)
    for (let k = 0; k < 10; k++) { x.fillStyle = 'rgba(255,255,255,0.4)'; x.fillRect((k * 131 + t * 20) % 1080, 800 + (k % 4) * 50, 50, 5) }
    for (const [k, col] of [[0, '#ff8fb1'], [1, '#7dffb0'], [2, '#ffd36b']]) {
      const bx = 160 + k * 380 + Math.sin(t * 0.8 + k) * 30, by = 850 + (k % 2) * 60
      box(x, bx - 70, by - 20, 140, 40, col, 5); box(x, bx - 40, by - 70, 80, 14, col, 4); box(x, bx - 36, by - 56, 8, 36, BONE, 2); box(x, bx + 28, by - 56, 8, 36, BONE, 2)
    }
    ground(x, '#4a8a4a')
  },
  porch(x, t) {
    x.fillStyle = '#e8e0cc'; x.fillRect(0, 0, 1080, GY); for (let y = 40; y < GY; y += 44) { x.fillStyle = 'rgba(0,0,0,0.08)'; x.fillRect(0, y, 1080, 5) }
    box(x, 80, 260, 220, 300, '#6fb7e8', 8); box(x, 780, 260, 220, 300, '#6fb7e8', 8); x.fillStyle = INK; x.fillRect(186, 260, 8, 300); x.fillRect(886, 260, 8, 300)
    stringLights(x, t, 140)
    x.fillStyle = '#6b4a34'; x.fillRect(0, 900, 1080, 16); for (let k = 0; k < 1080; k += 54) box(x, k + 10, 916, 16, GY - 916, BONE, 3)
    // the dog in a bandana on the porch
    const dx = 880, dy = 860; box(x, dx - 60, dy - 40, 120, 60, '#c98e4a', 5); box(x, dx + 40, dy - 80, 56, 56, '#c98e4a', 5); x.fillStyle = INK; x.fillRect(dx + 72, dy - 64, 8, 8); x.fillStyle = BRAKE; x.beginPath(); x.moveTo(dx + 40, dy - 30); x.lineTo(dx + 96, dy - 30); x.lineTo(dx + 68, dy); x.fill()
    const wag = Math.sin(t * 14) * 10; box(x, dx - 84, dy - 50 + wag, 26, 10, '#c98e4a', 3)
    ground(x, '#8a6a4a')
  },
  tacotruck(x, t, lt, o = {}) {
    grad(x, '#ffb36b', '#ffe2a8', 0, GY); farSky(x, t, 760, 0.4, 0.5, '#6a5a7a')
    box(x, 520, 420, 520, 460, o.col || '#e05a3a', 8); box(x, 580, 500, 280, 180, '#bfe6ff', 6)
    for (let k = 0; k < 7; k++) { x.fillStyle = k % 2 ? BONE : (o.col || '#e05a3a'); x.fillRect(560 + k * 46, 470, 46, 30) }
    box(x, 880, 520, 130, 220, '#1c1240', 5); txt(x, 'MENU', 945, 550, { size: 26, col: GOLD, font: MONO, weight: 700 })
    for (let k = 0; k < 4; k++) { x.fillStyle = BONE; x.fillRect(900, 580 + k * 36, 90, 10) }
    for (const wx of [620, 960]) { x.fillStyle = INK; x.beginPath(); x.arc(wx, 890, 46, 0, Math.PI * 2); x.fill(); x.fillStyle = '#8f96a0'; x.beginPath(); x.arc(wx, 890, 20, 0, Math.PI * 2); x.fill() }
    sign(x, 780, 380, o.menu || 'BREAKFAST TACOS', { bg: GOLD, size: 36 })
    ground(x, '#6a5a50')
  },
  crawfish(x, t) {
    farSky(x, t, 700, 0.5, 0.6); stringLights(x, t, 260, [GOLD, '#ff7a4a', BONE])
    x.fillStyle = '#5a3a2a'; x.fillRect(0, 640, 1080, 70); for (let k = 0; k < 1080; k += 60) box(x, k, 560, 44, 150, '#7a5236', 3)   // the backyard fence
    box(x, 40, 900, 1000, 110, '#e8e0cc', 6); for (let k = 0; k < 8; k++) { x.fillStyle = 'rgba(40,30,50,0.25)'; x.fillRect(70 + k * 120, 920, 90, 6); x.fillRect(70 + k * 120, 940, 70, 6) }
    for (let k = 0; k < 34; k++) { const cx = 180 + (k % 17) * 44 + (k > 16 ? 22 : 0), cy = 900 - (k > 16 ? 34 : 6) - hash(k) * 10; x.fillStyle = INK; x.fillRect(cx - 18, cy - 12, 36, 24); x.fillStyle = '#e8402a'; x.fillRect(cx - 14, cy - 8, 28, 16); x.fillRect(cx + 12, cy - 14, 10, 6) }
    for (const cx of [120, 960]) { box(x, cx - 18, 850, 36, 64, '#ffd34a', 4) }
    for (let k = 0; k < 4; k++) { const ph = (t * 0.6 + k / 4) % 1; x.strokeStyle = `rgba(255,255,255,${(0.5 * (1 - ph)).toFixed(2)})`; x.lineWidth = 6; x.beginPath(); x.moveTo(300 + k * 160, 860 - ph * 160); x.quadraticCurveTo(320 + k * 160, 820 - ph * 160, 300 + k * 160, 780 - ph * 160); x.stroke() }
    ground(x, '#3a3428')
  },
  karaoke(x, t, lt, o = {}) {
    x.fillStyle = '#140a28'; x.fillRect(0, 0, 1080, GY)
    for (let k = 0; k < 12; k++) { const a = t * 0.8 + k; x.fillStyle = ['rgba(255,143,177,0.25)', 'rgba(143,227,255,0.25)', 'rgba(125,255,176,0.2)'][k % 3]; x.beginPath(); x.arc(540 + Math.cos(a) * 420, 360 + Math.sin(a * 1.3) * 220, 30, 0, Math.PI * 2); x.fill() }
    box(x, 190, 300, 700, 360, '#0b1a3a', 10)
    txt(x, o.song || 'SLOW JAM #7', 540, 380, { size: 40, col: SKYB, font: MONO, weight: 700 })
    const w = 560 * ((t * 0.3) % 1); x.fillStyle = '#3a3a6a'; x.fillRect(260, 520, 560, 56); x.fillStyle = PINK; x.fillRect(260, 520, w, 56); txt(x, o.lyric || 'la la la la la', 540, 548, { size: 40, col: BONE })
    neon(x, 540, 220, o.neon || 'KARAOKE', PINK, t, 64)
    x.fillStyle = '#2a1840'; x.fillRect(0, 900, 1080, GY - 900)
    ground(x, '#1e1430')
  },
  museum(x, t, lt, o = {}) {
    x.fillStyle = '#efe8dc'; x.fillRect(0, 0, 1080, GY)
    const art = [[200, 360, 220, 280, ['#e05a3a', '#2b5fb0']], [540, 330, 240, 340, ['#ffd36b', '#1b1236']], [880, 360, 220, 280, ['#7dffb0', '#c9a6ff']]]
    for (const [cx, cy, w, h, [a, b]] of art) { box(x, cx - w / 2 - 16, cy - h / 2 - 16, w + 32, h + 32, '#c9a46a', 6); x.fillStyle = a; x.fillRect(cx - w / 2, cy - h / 2, w, h); x.fillStyle = b; x.fillRect(cx - w / 2, cy, w, h / 2) }
    sign(x, 540, 640, o.sign || 'FREE THURSDAY', { bg: INK, col: GOLD, size: 34 })
    x.fillStyle = '#c9bca6'; x.fillRect(0, 900, 1080, 10)
    ground(x, '#a88a6a')
  },
  tunnel(x, t) {
    x.fillStyle = '#3a3a4a'; x.fillRect(0, 0, 1080, GY)
    x.fillStyle = '#4a4a5c'; x.beginPath(); x.moveTo(0, 0); x.lineTo(380, 380); x.lineTo(380, 760); x.lineTo(0, GY); x.fill(); x.beginPath(); x.moveTo(1080, 0); x.lineTo(700, 380); x.lineTo(700, 760); x.lineTo(1080, GY); x.fill()
    box(x, 380, 380, 320, 380, '#bfe6ff', 6)
    for (let k = 0; k < 5; k++) { const y = 60 + k * 70; x.fillStyle = '#fff6d8'; x.fillRect(540 - 200 + k * 36, y, 400 - k * 72, 14) }
    box(x, 120, 120, 120, 40, '#8f96a0', 4); snow(x, t, 100, 170, 180, 700, 14)
    sign(x, 860, 560, 'CLOSED WEEKENDS', { bg: BRAKE, col: BONE, size: 28, rot: 0.05 })
    ground(x, '#5a5a6a')
  },
  beach(x, t) {
    grad(x, '#7fc6ff', '#e6f6ff', 0, 700)
    x.fillStyle = '#ffd36b'; x.beginPath(); x.arc(860, 200, 70, 0, Math.PI * 2); x.fill()
    x.fillStyle = '#8a7a4a'; x.fillRect(0, 700, 1080, 180)    // the beloved brown-ish gulf
    for (let k = 0; k < 12; k++) { x.fillStyle = 'rgba(255,255,255,0.5)'; x.fillRect((k * 113 + t * 40) % 1080, 720 + (k % 4) * 40, 70, 6) }
    x.fillStyle = '#ecd8a6'; x.fillRect(0, 880, 1080, GY - 880)
    for (let k = 0; k < 3; k++) { const gx = (200 + k * 300 + t * 50) % 1180 - 50, gy = 300 + k * 60 + Math.sin(t * 3 + k) * 20, f = Math.sin(t * 8 + k) > 0 ? -10 : 6; x.strokeStyle = BONE; x.lineWidth = 6; x.beginPath(); x.moveTo(gx - 24, gy + f); x.lineTo(gx, gy); x.lineTo(gx + 24, gy + f); x.stroke() }
    ground(x, '#d8c08a')
  },
  office(x, t) {
    x.fillStyle = '#b8d8ee'; x.fillRect(0, 0, 1080, GY)
    box(x, 640, 200, 360, 300, '#ffcf7a', 8); heatSun(x, 820, 340, t, 60)
    box(x, 120, 150, 260, 60, '#e8eef4', 5); for (let k = 0; k < 5; k++) { x.fillStyle = '#8fa0b0'; x.fillRect(140 + k * 48, 165, 30, 30) }
    snow(x, t, 100, 210, 300, 650, 22)
    box(x, 60, 860, 960, 40, '#8a6a4a', 5)
    ground(x, '#6a7a8a')
  },
  pollen(x, t) {
    grad(x, '#bfe6a8', '#f6f0c0', 0, GY); tree(x, 200, 860, 1.4, '#4a8a3a')
    car(x, 760, 930, '#c9b84a', { s: 1.3 }); for (let k = 0; k < 60; k++) { x.fillStyle = 'rgba(220,210,90,0.9)'; x.fillRect(620 + hash(k) * 300, 820 + hash(k + 1) * 40, 8, 6) }
    for (let k = 0; k < 40; k++) { const ph = (t * 0.15 + hash(k + 5)) % 1; x.fillStyle = 'rgba(210,200,60,0.7)'; x.fillRect(hash(k) * 1080 + Math.sin(t + k) * 30, ph * GY, 7, 7) }
    ground(x, '#8aa05a')
  },
  heat(x, t) {
    grad(x, '#ffb84a', '#ffe9b0', 0, GY); heatSun(x, 830, 240, t, 100); shimmer(x, 300, 600, t)
    tree(x, 260, 900, 1.2, '#4a8a3a'); for (let k = 0; k < 3; k++) car(x, 170 + k * 90, 950 - k * 20, ['#5ec8ff', '#ff8fb1', '#7dffb0'][k], { s: 0.6 })
    ground(x, '#9a8a7a')
  },
  phone(x, t, lt, o = {}) {
    grad(x, o.top || '#2a1d52', o.bot || '#4a2d6a', 0, GY)
    const px = o.x ?? 790, py = o.y ?? 640
    box(x, px - 180, py - 330, 360, 660, '#120c24', 10); x.fillStyle = '#f4efe4'; x.fillRect(px - 160, py - 290, 320, 580)
    x.fillStyle = '#2a1d52'; x.fillRect(px - 160, py - 290, 320, 60); txt(x, o.who || 'NEW MATCH', px, py - 260, { size: 26, col: BONE, font: MONO, weight: 700 })
    ;(o.msgs || []).forEach(([side, s, at = 0], i) => {
      if (lt < at) return
      const k = clamp(ease.outBack(prog(lt, at, at + 0.3))), w = Math.min(270, s.length * 15 + 40), bx = side > 0 ? px + 140 - w : px - 140, by = py - 190 + i * 96
      x.save(); x.translate(bx + w / 2, by); x.scale(k, k); box(x, -w / 2, -32, w, 64, side > 0 ? '#5ec8ff' : '#e0d8ea', 3); txt(x, s, 0, 2, { size: 26, col: INK }); x.restore()
    })
    ground(x, '#1e1430')
  },
  mural(x, t) { mural(x, t); ground(x, '#5a4a6a') },
  dance(x, t) {
    x.fillStyle = '#2a1a14'; x.fillRect(0, 0, 1080, GY); stringLights(x, t, 120, [GOLD, BONE])
    for (let k = 0; k < 12; k++) { x.fillStyle = k % 2 ? '#4a2e1e' : '#3e2618'; x.fillRect(k * 90, 200, 90, 700) }
    box(x, 340, 260, 400, 110, '#1c1240', 6); neon(x, 540, 315, 'TWO-STEP NIGHT', GOLD, t, 40)
    x.fillStyle = '#a8743a'; x.fillRect(0, 880, 1080, GY - 880); for (let k = 0; k < 1080; k += 80) { x.fillStyle = 'rgba(0,0,0,0.15)'; x.fillRect(k, 880, 4, GY - 880) }
    ground(x, '#7a5428')
  },
  bellaire(x, t) {
    x.fillStyle = '#1a1030'; x.fillRect(0, 0, 1080, GY)
    for (let k = 0; k < 4; k++) box(x, 20 + k * 265, 400, 245, 500, ['#2a1d52', '#2a2a4a', '#3a1d42', '#20304a'][k], 6)
    ;[['BOBA', PINK], ['PHO', SKYB], ['HOT POT', '#ff7a4a'], ['KARAOKE', MINT]].forEach(([s, c], k) => neon(x, 142 + k * 265, 460, s, c, t + k, s.length > 5 ? 34 : 46))
    for (let k = 0; k < 6; k++) { const lx = 90 + k * 180, ly = 250 + Math.sin(t * 2 + k) * 8; x.fillStyle = INK; x.fillRect(lx - 3, 180, 6, ly - 200); box(x, lx - 32, ly - 30, 64, 70, BRAKE, 4); x.fillStyle = GOLD; x.fillRect(lx - 32, ly - 30, 64, 8); x.fillRect(lx - 32, ly + 32, 64, 8) }
    ground(x, '#2a2036')
  },
  pho(x, t, lt, o = {}) {
    grad(x, '#3a2a5a', '#6a4a6a', 0, GY)
    box(x, 0, 880, 1080, 30, '#7a4a2c', 6)
    x.fillStyle = INK; x.beginPath(); x.ellipse(220, 860, 170, 60, 0, 0, Math.PI); x.fill(); x.fillStyle = '#f4efe4'; x.beginPath(); x.ellipse(220, 850, 160, 50, 0, 0, Math.PI); x.fill(); x.fillStyle = '#c98e4a'; x.fillRect(70, 840, 300, 16)
    for (let k = 0; k < 4; k++) { const ph = (t * 0.6 + k / 4) % 1; x.strokeStyle = `rgba(255,255,255,${(0.6 * (1 - ph)).toFixed(2)})`; x.lineWidth = 6; x.beginPath(); x.moveTo(140 + k * 50, 820 - ph * 200); x.quadraticCurveTo(160 + k * 50, 780 - ph * 200, 140 + k * 50, 740 - ph * 200); x.stroke() }
    box(x, 860, 260, 90, 320, BONE, 6); x.fillStyle = BRAKE; x.fillRect(888, 400, 34, 160); txt(x, o.temp || '60°', 905, 320, { size: 40, col: INK })
    ground(x, '#3a2418')
  },
  kolache(x, t) {
    x.fillStyle = '#f6e6c8'; x.fillRect(0, 0, 1080, GY); sign(x, 540, 200, 'KOLACHES · KLOBASNEKS', { bg: '#c0304a', col: BONE, size: 40 })
    box(x, 40, 640, 1000, 300, '#bfe6ff', 8); x.fillStyle = 'rgba(255,255,255,0.35)'; x.fillRect(60, 660, 960, 40)
    for (let k = 0; k < 5; k++) kolache(x, 130 + k * 90, 760, 0.7)
    for (let k = 0; k < 3; k++) klobasnek(x, 720 + k * 0, 730 + k * 70, 0.8)
    ground(x, '#a8743a')
  },
  pickle(x, t) {
    grad(x, '#8fd0ff', '#dff4ff', 0, 700); x.fillStyle = '#3a8a6a'; x.fillRect(0, 700, 1080, GY - 700); x.fillStyle = '#2b6fb0'; x.fillRect(100, 740, 880, GY - 760)
    x.fillStyle = BONE; x.fillRect(100, 740, 880, 6); x.fillRect(536, 740, 8, GY - 760)
    box(x, 520, 660, 40, 140, '#8f96a0', 3); for (let k = 0; k < 6; k++) { x.fillStyle = 'rgba(255,255,255,0.6)'; x.fillRect(100, 670 + k * 16, 880, 3) }
    const ph = (t * 0.7) % 1, bx = 160 + ph * 760, by = 640 - Math.sin(Math.PI * ph) * 260; x.fillStyle = INK; x.beginPath(); x.arc(bx, by, 22, 0, Math.PI * 2); x.fill(); x.fillStyle = '#e6f04a'; x.beginPath(); x.arc(bx, by, 17, 0, Math.PI * 2); x.fill()
    ground(x, '#3a8a6a')
  },
  run(x, t, lt, o = {}) {
    grad(x, '#ff9ab0', '#ffd8a0', 0, 860); farSky(x, t, 840, 0.5, 0.7)
    x.fillStyle = '#c9a77a'; x.fillRect(0, 900, 1080, GY - 900); x.fillStyle = '#3a7a4a'; x.fillRect(0, 840, 1080, 60)
    tree(x, 80, 900, 0.8); tree(x, 1000, 900, 0.9)
    sign(x, 860, 560, o.sign || 'RUN CLUB · 6AM', { bg: MINT, size: 32 })
    ground(x, '#3a5a3a')
  },
  slab(x, t, lt, o = {}) { farSky(x, t, 900, 0.7, 0.9); ground(x, '#221b38', { y: 900 }); slab(x, 540, 830, t, { paint: 1, col: o.col || '#3a6ae0', col2: o.col2 || '#9a3ae0', elbows: 1, glow: 1, trunk: o.trunk ?? 0, msg: o.msg || 'BETA PARTY · JAN 9', s: 0.9 }) },
  marina(x, t) {
    grad(x, '#6fb7e8', '#ffe2c0', 0, 780)
    x.fillStyle = '#3a7aa8'; x.fillRect(0, 780, 1080, GY - 780)
    for (let k = 0; k < 4; k++) { const bx = 130 + k * 270, by = 860 + Math.sin(t * 1.5 + k) * 6; box(x, bx - 90, by - 20, 180, 44, BONE, 5); box(x, bx - 4, by - 280, 8, 260, '#8f96a0', 2); x.fillStyle = k % 2 ? BONE : '#ffd36b'; x.beginPath(); x.moveTo(bx + 6, by - 270); x.lineTo(bx + 6, by - 40); x.lineTo(bx + 100, by - 40); x.fill() }
    ground(x, '#8a6a4a')
  },
  lawn(x, t) {
    grad(x, '#8fd0ff', '#e0f6ff', 0, 760); farSky(x, t, 760, 0.6, 0.7, '#6a7a9a')
    x.fillStyle = '#5aa04a'; x.fillRect(0, 760, 1080, GY - 760)
    box(x, 640, 900, 340, 80, '#ff8fb1', 5); for (let k = 0; k < 4; k++) { x.fillStyle = BONE; x.fillRect(660 + k * 84, 900, 40, 80) }
    ground(x, '#4a8a3a')
  },
  brunch(x, t) {
    x.fillStyle = '#f2d8c0'; x.fillRect(0, 0, 1080, GY)
    box(x, 120, 200, 840, 90, '#2b5fb0', 6); txt(x, 'BRUNCH', 540, 247, { size: 60, col: BONE })
    for (let k = 0; k < 6; k++) { x.fillStyle = k % 2 ? '#ff8fb1' : BONE; x.fillRect(120 + k * 140, 290, 140, 50) }
    box(x, 160, 400, 300, 360, '#bfe6ff', 6); box(x, 620, 400, 300, 360, '#bfe6ff', 6)
    sign(x, 540, 820, 'WAIT: 90 MIN', { bg: BONE, size: 34, rot: -0.03 })
    ground(x, '#c9a07a')
  },
  suburb(x, t) { grad(x, '#8fd0ff', '#e6f6ff', 0, GY); houses(x, 900, t); ground(x, '#5aa04a', { y: 900 }) },
  closet(x, t) {
    x.fillStyle = '#4a3a5a'; x.fillRect(0, 0, 1080, GY); box(x, 80, 120, 920, 20, '#8a6a4a', 4)
    for (let k = 0; k < 6; k++) { x.strokeStyle = INK; x.lineWidth = 5; x.beginPath(); x.moveTo(160 + k * 150, 140); x.lineTo(160 + k * 150, 180); x.stroke(); box(x, 110 + k * 150, 180, 100, 240, ['#e05a3a', '#5ec8ff', BONE, '#ffd36b', '#7dffb0', PINK][k], 5) }
    for (let k = 0; k < 4; k++) { const bx = 160 + k * 240; box(x, bx - 30, 800, 50, 130, '#8a4a2a', 5); box(x, bx - 30, 900, 100, 40, '#8a4a2a', 5); x.fillStyle = GOLD; x.fillRect(bx - 22, 830, 34, 6) }
    ground(x, '#3a2a3a')
  },
  cold(x, t, lt, o = {}) {
    grad(x, '#8aa0c0', '#d8e0ea', 0, GY); farSky(x, t, 900, 0.6, 0.6, '#5a6a8a')
    box(x, 860, 240, 120, 90, INK, 5); txt(x, o.temp || '55°', 920, 285, { size: 48, col: SKYB, font: MONO, weight: 700 })
    snow(x, t, 0, 0, 1080, 900, 10, 'rgba(255,255,255,0.6)')
    ground(x, '#6a7a8a', { y: 900 })
  },
  loops(x, t, lt, o = {}) { x.fillStyle = '#0d1426'; x.fillRect(0, 0, 1080, GY); box(x, 60, 300, 960, 640, '#0b2232', 8); loopMap(x, 540, 620, 1, t, o); ground(x, '#151a2e') },
  wardrobe(x, t, lt, o = {}) {   // a mirror + outfit: getting ready
    x.fillStyle = o.wall || '#5a3a6a'; x.fillRect(0, 0, 1080, GY)
    box(x, 700, 220, 280, 640, '#c9a46a', 8); x.fillStyle = '#bfe6ff'; x.fillRect(716, 236, 248, 608); x.fillStyle = 'rgba(255,255,255,0.4)'; x.fillRect(740, 260, 30, 400)
    ground(x, '#3a2a4a')
  },
  sky(x, t) { /* just the nebula + a soft horizon */ x.fillStyle = 'rgba(20,12,40,0.5)'; x.fillRect(0, GY, 1080, 1920 - GY); x.fillStyle = INK; x.fillRect(0, GY - 5, 1080, 10) },
}

// ── accessories, drawn in sprite cells (the 36-cell star grid) so they ride the hops ─────────────────────────
const WEAR = {
  glasses(x) { x.fillStyle = INK; for (const l of [8, 20]) { x.fillRect(l, 14, 8, 1); x.fillRect(l, 21, 8, 1); x.fillRect(l, 14, 1, 8); x.fillRect(l + 7, 14, 1, 8) } x.fillRect(16, 16, 4, 1) },
  shades(x) { x.fillStyle = INK; x.fillRect(7, 14, 22, 2); x.fillRect(8, 15, 8, 6); x.fillRect(20, 15, 8, 6); x.fillStyle = 'rgba(255,255,255,0.6)'; x.fillRect(9, 16, 2, 2); x.fillRect(21, 16, 2, 2) },
  crown(x) { x.fillStyle = INK; x.fillRect(12, -3, 12, 6); x.fillStyle = GOLD; x.fillRect(13, -1, 10, 3); x.fillRect(13, -3, 2, 2); x.fillRect(17, -4, 2, 3); x.fillRect(21, -3, 2, 2) },
  hat(x) { x.fillStyle = INK; x.fillRect(5, 5, 26, 3); x.fillRect(12, -2, 12, 8); x.fillStyle = '#c98e4a'; x.fillRect(6, 6, 24, 1); x.fillRect(13, -1, 10, 6); x.fillStyle = '#8a4a2a'; x.fillRect(13, 3, 10, 1) },
  beanie(x) { x.fillStyle = INK; x.fillRect(11, -1, 14, 9); x.fillStyle = '#e05a3a'; x.fillRect(12, 0, 12, 7); x.fillStyle = BONE; x.fillRect(12, 6, 12, 2); x.fillRect(16, -3, 4, 3) },
  headband(x) { x.fillStyle = INK; x.fillRect(9, 9, 18, 3); x.fillStyle = MINT; x.fillRect(10, 10, 16, 1) },
  headset(x) { x.fillStyle = INK; x.fillRect(4, 14, 3, 8); x.fillRect(29, 14, 3, 8); x.fillRect(6, 4, 24, 2); x.fillRect(29, 21, 1, 6); x.fillRect(24, 27, 6, 2) },
  clipboard(x) { x.fillStyle = INK; x.fillRect(27, 18, 10, 13); x.fillStyle = '#c98e4a'; x.fillRect(28, 19, 8, 11); x.fillStyle = BONE; x.fillRect(29, 21, 6, 8); x.fillStyle = INK; x.fillRect(30, 22, 4, 1); x.fillRect(30, 24, 4, 1); x.fillRect(30, 26, 3, 1); x.fillStyle = '#8f96a0'; x.fillRect(30, 18, 4, 2) },
  scarf(x) { x.fillStyle = INK; x.fillRect(8, 24, 20, 4); x.fillStyle = '#e05a3a'; x.fillRect(9, 25, 18, 2); x.fillRect(22, 26, 3, 6) },
  mic(x) { x.fillStyle = INK; x.fillRect(28, 20, 3, 10); x.fillStyle = '#8f96a0'; x.fillRect(27, 17, 5, 4) },
}

// ── the RPG dialogue box (canvas): name tag, typed Space Mono text, *accent* words, blinking ▼ ───────────────
function parse(text) { const out = []; let acc = false; for (const ch of text) { if (ch === '*') { acc = !acc; continue } out.push([ch, acc]) } return out }
function wrap(chars) {   // → rows of [ch, acc, index]
  const rows = [[]]; let word = []
  const flush = () => { const r = rows[rows.length - 1]; if (r.length && r.length + word.length > ROW) { if (r[r.length - 1]?.[0] === ' ') r.pop(); rows.push([]) } rows[rows.length - 1].push(...word); word = [] }
  chars.forEach((c, i) => { word.push([...c, i]); if (c[0] === ' ') flush() }); flush()
  return rows
}
const typeDur = s => parse(s).length / CPS
function drawBox(x, t, L, open, close, tagOf, colOf) {
  const kIn = ease.outBack(prog(t, open, open + 0.25)), kOut = 1 - ease.inQuad(prog(t, close, close + 0.22)), k = Math.min(kIn, kOut)
  if (k <= 0.01) return
  let cur = -1; for (let i = 0; i < L.length; i++) if (t >= L[i].t - 0.05) cur = i
  const ln = L[Math.max(0, cur)]
  x.save(); x.translate(540, BOX.t + BOX.h / 2); x.scale(k, k); x.translate(-540, -(BOX.t + BOX.h / 2))
  const { l, t: tp, w, h } = BOX
  x.fillStyle = 'rgba(6,4,18,0.5)'; x.fillRect(l + 10, tp + 14, w, h)
  x.fillStyle = GOLD; x.fillRect(l + 6, tp, w - 12, h); x.fillRect(l, tp + 6, w, h - 12)            // stepped pixel corners
  x.fillStyle = INK; x.fillRect(l + 12, tp + 6, w - 24, h - 12); x.fillRect(l + 6, tp + 12, w - 12, h - 24)
  x.fillStyle = 'rgba(20,12,44,0.97)'; x.fillRect(l + 14, tp + 14, w - 28, h - 28)
  x.strokeStyle = 'rgba(239,230,214,0.35)'; x.lineWidth = 2; x.strokeRect(l + 22, tp + 22, w - 44, h - 44)
  // name tag
  const tag = tagOf(ln.who), tc = colOf(ln.who)
  const tk = ease.outBack(prog(t, ln.tagAt, ln.tagAt + 0.25))
  x.save(); x.translate(l + 40, tp - 4); x.rotate((1 - tk) * -0.1)
  const [g, ...rest] = tag.split(' '), name = rest.join(' ')
  x.font = `700 34px ${MONO}`; const tw = x.measureText(name).width + 96
  box(x, 0, -30, tw, 60, tc, 5); x.fillStyle = INK; x.fillRect(8, -22, 44, 44)
  x.font = `700 34px ${GLYPH_FONT}`; x.fillStyle = tc; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(g + '\uFE0E', 30, 2)
  txt(x, name, 66, 2, { size: 34, col: INK, font: MONO, weight: 700, align: 'left' })
  x.restore()
  // text
  if (cur >= 0) {
    const n = Math.floor((t - ln.t) * CPS), rows = wrap(parse(ln.text))
    x.font = `700 50px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'
    const y0 = tp + h / 2 - (rows.length - 1) * 35
    rows.forEach((r, j) => r.forEach(([ch, acc, i], c) => { if (i >= n) return; x.fillStyle = acc ? (ln.acc || GOLD) : BONE; x.fillText(ch, l + 52 + c * 30, y0 + j * 70) }))
    if (t > ln.done + 0.1) { const ph = (t - ln.done) % 0.6; if (ph < 0.4) { x.fillStyle = GOLD; const ay = tp + h - 44 + Math.round(Math.sin((t - ln.done) * 7)) * 3; x.beginPath(); x.moveTo(l + w - 70, ay); x.lineTo(l + w - 42, ay); x.lineTo(l + w - 56, ay + 16); x.fill() } }
  }
  x.restore()
}

// ── the LESSON UNLOCKED banner ────────────────────────────────────────────────────────────────────────────────
function lessonBanner(x, t, lt, lesson) {
  const k = pop01(t, t - lt + 0.15, 0.4, 2.2)
  if (k > 0) {
    x.save(); x.translate(540, 520); x.rotate(-0.025); x.scale(k, k)
    x.fillStyle = INK; x.fillRect(-372, -62, 744, 124); x.fillStyle = GOLD; x.fillRect(-366, -56, 732, 112); x.fillStyle = INK; x.fillRect(-356, -46, 712, 92); x.fillStyle = '#2a1850'; x.fillRect(-350, -40, 700, 80)
    txt(x, '★ LESSON UNLOCKED', 0, 3, { size: 52, col: GOLD, font: MONO, weight: 700 })
    x.restore()
  }
  if (lt > 0.2) sparkles(x, t, 540, 520, t - lt + 0.2, 14, 380, 4)
  const lk = clamp((lt - 0.7) / 0.35)
  if (lk > 0) {
    x.save(); x.globalAlpha = lk; x.fillStyle = 'rgba(14,9,32,0.9)'; x.fillRect(60, 1100, 960, 290); x.fillStyle = GOLD; x.fillRect(60, 1100, 960, 8); x.fillRect(60, 1382, 960, 8)
    const [a, b] = lesson; txt(x, a, 540, 1190, { size: a.length > 24 ? 52 : 62, col: BONE }); txt(x, b, 540, 1300, { size: b.length > 26 ? 62 : 76, col: GOLD, font: SERIF, weight: 500, italic: true })
    x.restore()
  }
}

// ── the builder ──────────────────────────────────────────────────────────────────────────────────────────────
export const BADGE = { text: 'HOU BETA · JAN 9', x: 230, y: 150 }
const NOTE = { aries: 660, taurus: 392, gemini: 784, cancer: 523, leo: 587, virgo: 698, libra: 740, scorpio: 440, sagittarius: 622, capricorn: 349, aquarius: 830, pisces: 494 }

export function advice(A) {
  const hero = A.sign, H = SG(hero)
  const tags = { [hero]: `${H.glyph} ${H.name.toUpperCase()} STAR`, ...(A.tags || {}) }
  const tagOf = id => tags[id] || `${SG(id).glyph} ${SG(id).name.toUpperCase()}`
  const colOf = id => SG(id).color
  // timeline: every beat's lines, typed one after another, each held ≥ 1.6 s
  const L = [], scenes = []
  let T0 = 0
  const beats = [...A.beats, { lesson: true }]
  beats.forEach((b, bi) => {
    const lines = []
    let lt = bi === 0 ? 0.45 : 0.3
    for (const s of b.say || []) {
      const [who, text] = Array.isArray(s) ? s : [hero, s]
      const d = typeDur(text), ln = { t: r2(T0 + lt), who, text, done: r2(T0 + lt + d), acc: b.acc }
      ln.tagAt = L.length && L[L.length - 1].who === who ? -99 : ln.t - 0.12
      lines.push(ln); L.push(ln); lt += d + (b.hold ?? 1.65)
    }
    const dur = b.lesson ? 4.6 : r2(Math.max(b.dur ?? 0, lt + 0.05, 2.8))
    scenes.push({ ...b, t0: T0, dur, lines })
    T0 = r2(T0 + dur)
  })
  const LESSON_T = scenes[scenes.length - 1].t0
  const open = 0.3, close = LESSON_T - 0.05
  // hops: hero hops on every one of its lines (start + about every 0.5 s while typing), plus the frame-0 hop wave
  const hopsOf = id => {
    const h = id === hero ? [0.02, 0.38, 0.74] : []
    for (const ln of L) if (ln.who === id) for (let q = ln.t; q < ln.done; q += 0.52) h.push(r2(q))
    return h
  }
  const HOPS = {}; for (const id of new Set([hero, ...L.map(l => l.who), ...A.beats.flatMap(b => Object.keys(b.cast || {}))])) HOPS[id] = hopsOf(id)

  function people(x, t, lt, sc) {
    const pos = sc.lesson ? [540, 820, 280] : sc.at || [540, 850, 300]
    const all = [[hero, ...pos, sc.lesson ? 'heart' : sc.mood || 'happy'], ...Object.entries(sc.cast || {}).map(([id, v]) => [id, ...v])]
    all.sort((a, b) => a[2] - b[2])
    for (const [id, cx, cy, size, mood = 'happy'] of all) {
      const md = typeof mood === 'function' ? mood(lt) : mood
      const look = id === hero ? (sc.look ?? [0, 0]) : (sc.looks?.[id] ?? [0, 0])
      const hops = HOPS[id].filter(h => h <= t).slice(-3), seed = id.length + 3
      const pop = id === hero && sc.t0 > 0 ? 1 : pop01(t, sc.t0 - 0.2 + (id === hero ? 0 : 0.15), 0.3, 1.6)
      const F = signChar(x, t, id, cx, cy, size, { mood: md, look, hops, pop, seed, tears: id === 'pisces' ? 2 : 0 })
      const w = { ...(A.wear || {}), ...(sc.wear || {}) }[id]
      if (w && pop > 0.5) for (const one of String(w).split(',')) inSprite(x, F, () => WEAR[one](x))
    }
  }

  const epScenes = scenes.map(sc => ({
    dur: sc.dur, cast: {}, lines: [],
    set: (x, t, lt) => { const f = typeof sc.set === 'function' ? sc.set : SETS[sc.lesson ? (A.lessonSet || 'sky') : sc.set || 'night']; f(x, t, lt, sc.o || {}) },
    front: (x, t, lt) => {
      people(x, t, lt, sc)
      if (sc.front) { x.save(); sc.front(x, t, lt); x.restore() }
      if (sc.stick) { const [s, bg] = Array.isArray(sc.stick) ? sc.stick : [sc.stick, GOLD]; const a = sc.t0 === 0 ? 2.7 : 0.15; const k = pop01(t, sc.t0 + a, 0.3, 1.8) * (1 - ease.inQuad(prog(lt, sc.dur - 0.3, sc.dur))); if (lt > a) label(x, 540, sc.stickY ?? 610, s, k, { size: 48, bg, rot: -0.035 }) }
      if (sc.lesson) lessonBanner(x, t, lt, A.lesson)
    },
  }))

  const cues = [
    ['glitter', 0.0, 0.7], ['pop', 0.02, 880, 0.03, 0], ['whoosh', 0.05, 0.35, 0.02],
    ...L.flatMap(ln => { const n = parse(ln.text).length, f = NOTE[ln.who] || 600, out = []; for (let i = 0; i < n; i += 3) out.push(['pop', r2(ln.t + i / CPS), r2(f * (1 + 0.06 * Math.sin(i))), 0.007, 0]); out.push(['tick', r2(ln.done + 0.05), 0.03]); return out }),
    ...[523.25, 659.25, 783.99, 1046.5].map((f, i) => ['pluck', r2(LESSON_T + 0.15 + i * 0.09), f, 0.05, 0.6, 0]), ['glitter', r2(LESSON_T + 0.2), r2(LESSON_T + 1.0)],
    ...(A.cues || []),
  ]
  return {
    hook: A.hook, badge: BADGE, endLen: A.endLen ?? 6.2, cues,
    overlay: (x, t) => drawBox(x, t, L, open, close, tagOf, colOf),
    end: (x, t, lt) => { x.fillStyle = `rgba(8,5,22,${clamp(lt / 0.35).toFixed(3)})`; x.fillRect(0, 0, 1080, 1920); partyCard(x, t, lt, { line: A.close, stars: A.stars }) },
    scenes: epScenes,
  }
}
