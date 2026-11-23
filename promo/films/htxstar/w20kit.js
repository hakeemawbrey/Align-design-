// Houston Star Talk · worker w20 props (food skits + romcoms). Pixel style: flat fills, ink outlines. Generic shapes only:
// no brands, teams, agencies or event marks. Pure functions of t. Used by htxstar/w20a.js (food) and w20b.js (romcom).
import { clamp, ease, prog } from '../../src/lib.js'
import { label, sparkles, GOLD, BONE, PINK, INK, MONO, SERIF } from '../signs3kit.js'
import { box, txt, FLOOR } from '../starrace/ep.js'
import { skyline, BRAKE, HGREEN } from './kit.js'

export const Y = 1255
export const BADGE = { text: 'HOU BETA · JAN 9', x: 230, y: 150 }
export const STING = [['glitter', 0.0, 0.7], ['pop', 0.02, 880, 0.03, 0], ['whoosh', 0.05, 0.5, 0.02]]
export const Kp = (lt, a, d = 0.3) => clamp(ease.outBack(prog(lt, a, a + d)))
const TAU = Math.PI * 2
const circ = (x, cx, cy, r, col, ink = 6) => { x.fillStyle = INK; x.beginPath(); x.arc(cx, cy, r + ink, 0, TAU); x.fill(); x.fillStyle = col; x.beginPath(); x.arc(cx, cy, r, 0, TAU); x.fill() }

// ── skies and grounds
export function sky(x, top = '#5ec8ff', bot = '#ffd9a8', h = FLOOR + 60) { const g = x.createLinearGradient(0, 0, 0, h); g.addColorStop(0, top); g.addColorStop(1, bot); x.fillStyle = g; x.fillRect(0, 0, 1080, h) }
export function sun(x, cx, cy, r, t, col = '#ffd36b') { for (let k = 0; k < 10; k++) { const a = k * TAU / 10 + t * 0.4; x.fillStyle = col; x.fillRect(cx + Math.cos(a) * (r + 26) - 8, cy + Math.sin(a) * (r + 26) - 8, 16, 16) } circ(x, cx, cy, r, col) }
export function clouds(x, t, y = 420, col = 'rgba(255,255,255,0.85)') { for (let k = 0; k < 4; k++) { const cx = ((k * 330 + t * 30) % 1400) - 160, cy = y + (k % 2) * 140; x.fillStyle = col; x.fillRect(cx, cy, 200, 40); x.fillRect(cx + 40, cy - 30, 110, 40) } }
export function ground(x, col = '#3d7a3a', y = FLOOR + 60, edge = INK) { x.fillStyle = col; x.fillRect(0, y, 1080, 1920 - y); x.fillStyle = edge; x.fillRect(0, y - 6, 1080, 10); for (let k = 0; k < 36; k++) { x.fillStyle = 'rgba(0,0,0,0.12)'; x.fillRect((k * 151) % 1080, y + 30 + (k * 67) % 420, 10, 10) } }
export function day(x, t, { top, bot, grass = '#3d7a3a', city = true } = {}) { sky(x, top, bot); clouds(x, t); if (city) skyline(x, FLOOR + 60, t, { col: '#6a7fb0', lit: '#e8f4ff', alpha: 0.55 }); ground(x, grass) }
export function dusk(x, t, { grass = '#2c2350' } = {}) { sky(x, '#3a2a6a', '#ff9a6a'); skyline(x, FLOOR + 60, t, { col: '#2a1d52', alpha: 0.9 }); ground(x, grass) }
export function nightCity(x, t, ground0 = '#221b38') { skyline(x, FLOOR + 60, t, { alpha: 0.85 }); ground(x, ground0) }

// ── food places
/** a food truck (side view) with a serving window, an awning and a menu board */
export function foodTruck(x, cx0, base0, t, { col = '#ff8fb1', name = 'TACOS', open = 1, s = 0.68, ink = BONE } = {}) {
  x.save(); x.translate(cx0, base0); x.scale(s, s); const cx = 0, base = 0
  box(x, cx - 330, base - 470, 660, 400, col, 8); box(x, cx + 330, base - 330, 140, 260, col, 8); x.fillStyle = '#bfe6ff'; x.fillRect(cx + 350, base - 310, 90, 90)
  box(x, cx - 260, base - 410, 380, 190, '#1b1236', 5); x.fillStyle = '#ffd36b'; x.fillRect(cx - 250, base - 400, 360, 170)
  for (let k = 0; k < 7; k++) { x.fillStyle = k % 2 ? BONE : BRAKE; x.beginPath(); x.moveTo(cx - 290 + k * 60, base - 470); x.lineTo(cx - 290 + k * 60 + 60, base - 470); x.lineTo(cx - 290 + k * 60 + 30, base - 470 + 50 * open); x.fill() }
  txt(x, name, cx - 70, base - 130, { size: 60, col: ink })
  for (const wx of [cx - 200, cx + 300]) { circ(x, wx, base - 50, 48, '#2a2638'); circ(x, wx, base - 50, 20, '#8f96a0', 0) }
  x.restore()
}
export function menuBoard(x, cx, cy, lines, { w = 360, col = '#1b1236', ink = GOLD } = {}) { box(x, cx - w / 2, cy - 50 - lines.length * 32, w, 100 + lines.length * 64, col, 6); lines.forEach((l, i) => txt(x, l, cx, cy - lines.length * 32 + 32 + i * 64, { size: 40, col: ink, font: MONO, weight: 700 })) }
/** a diner/kitchen counter along the floor */
export function counter(x, { wall = '#2b5f6a', top = '#e8d8b8', front = '#c9783a', tiles = true } = {}) {
  x.fillStyle = wall; x.fillRect(0, 0, 1080, FLOOR + 60)
  if (tiles) for (let r = 0; r < 14; r++) for (let c = 0; c < 10; c++) { x.fillStyle = (r + c) % 2 ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'; x.fillRect(c * 108, 380 + r * 70, 108, 70) }
  box(x, -10, FLOOR - 10, 1100, 40, top, 6); x.fillStyle = front; x.fillRect(0, FLOOR + 36, 1080, 1920 - FLOOR); for (let k = 0; k < 1080; k += 120) { x.fillStyle = 'rgba(0,0,0,0.15)'; x.fillRect(k, FLOOR + 36, 6, 1920) }
}
export function restaurant(x, t, { wall = '#7a2a3a', lamp = '#ffd36b', sign = null } = {}) {
  x.fillStyle = wall; x.fillRect(0, 0, 1080, FLOOR + 60); for (let k = 0; k < 1080; k += 90) { x.fillStyle = 'rgba(0,0,0,0.08)'; x.fillRect(k, 0, 45, FLOOR + 60) }
  for (const lx of [220, 540, 860]) { x.fillStyle = INK; x.fillRect(lx - 3, 300, 6, 160); x.fillStyle = lamp; x.beginPath(); x.moveTo(lx - 60, 520); x.lineTo(lx, 455); x.lineTo(lx + 60, 520); x.fill(); x.save(); x.globalAlpha = 0.12; x.beginPath(); x.moveTo(lx - 60, 520); x.lineTo(lx - 200, 1300); x.lineTo(lx + 200, 1300); x.lineTo(lx + 60, 520); x.fill(); x.restore() }
  if (sign) { box(x, 290, 560, 500, 110, INK, 0); txt(x, sign, 540, 615, { size: 52, col: lamp, font: MONO, weight: 700 }) }
  x.fillStyle = '#3b2a1e'; x.fillRect(0, FLOOR + 60, 1080, 1920); x.fillStyle = INK; x.fillRect(0, FLOOR + 54, 1080, 10)
}
/** paper lanterns on a string (Lunar New Year is coming on Bellaire) */
export function lanterns(x, t, y = 360, n = 6, cols = ['#e0303a', '#ffb02e']) {
  x.strokeStyle = INK; x.lineWidth = 4; x.beginPath(); x.moveTo(0, y - 30); x.quadraticCurveTo(540, y + 40, 1080, y - 30); x.stroke()
  for (let k = 0; k < n; k++) { const cx = 90 + k * (900 / (n - 1)), cy = y + 10 + 30 * Math.sin(Math.PI * k / (n - 1)) + 6 * Math.sin(t * 2 + k); x.fillStyle = INK; x.beginPath(); x.ellipse(cx, cy + 40, 46, 56, 0, 0, TAU); x.fill(); x.fillStyle = cols[k % cols.length]; x.beginPath(); x.ellipse(cx, cy + 40, 40, 50, 0, 0, TAU); x.fill(); x.fillStyle = GOLD; x.fillRect(cx - 20, cy - 14, 40, 10); x.fillRect(cx - 20, cy + 86, 40, 10); x.fillRect(cx - 3, cy + 96, 6, 30) }
}
export function neon(x, cx, cy, s, t, col = '#ff5ec8', size = 64) { const fl = 0.75 + 0.25 * Math.sin(t * 7); x.save(); x.shadowColor = col; x.shadowBlur = 30 * fl; txt(x, s, cx, cy, { size, col, font: MONO, weight: 700 }); x.restore() }

// ── food
export function tortilla(x, cx, cy, s = 1, corn = false) { x.save(); x.translate(cx, cy); x.scale(s, s); circ(x, 0, 0, 70, corn ? '#f2c75c' : '#f4e1b0'); for (let k = 0; k < 7; k++) { x.fillStyle = corn ? '#c9983a' : '#d9b77a'; x.fillRect(-40 + (k * 37) % 80, -40 + (k * 53) % 80, 10, 10) } x.restore() }
export function crawfish(x, cx, cy, s = 1, rot = 0) {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
  const R = '#e8462a', D = '#b8301c'
  x.strokeStyle = INK; x.lineWidth = 4; x.beginPath(); x.moveTo(90, -16); x.quadraticCurveTo(150, -70, 200, -60); x.moveTo(90, 16); x.quadraticCurveTo(150, 70, 200, 60); x.stroke()   // antennae
  for (let k = 0; k < 4; k++) { x.strokeStyle = INK; x.lineWidth = 5; x.beginPath(); x.moveTo(10 + k * 16, 24); x.lineTo(0 + k * 16, 44); x.stroke() }   // legs
  x.fillStyle = INK; x.beginPath(); x.moveTo(-150, -34); x.lineTo(-112, 0); x.lineTo(-150, 34); x.fill(); x.fillStyle = D; x.beginPath(); x.moveTo(-142, -24); x.lineTo(-118, 0); x.lineTo(-142, 24); x.fill()   // tail fan
  for (let k = 0; k < 4; k++) { const h = 30 + k * 6; box(x, -118 + k * 32, -h / 2, 32, h, k % 2 ? R : D, 4) }   // tail segments
  box(x, 10, -30, 84, 60, R, 5); x.fillStyle = D; x.fillRect(16, -6, 72, 10)   // head
  for (const sy of [-1, 1]) { x.strokeStyle = INK; x.lineWidth = 9; x.beginPath(); x.moveTo(84, sy * 22); x.lineTo(124, sy * 48); x.stroke(); box(x, 120, sy * 52 - 18, 54, 36, R, 5); x.fillStyle = INK; x.fillRect(150, sy * 52 - 4, 26, 8) }   // claws
  x.fillStyle = INK; x.fillRect(80, -20, 8, 8); x.fillRect(80, 12, 8, 8); x.restore()
}
export function corn(x, cx, cy, s = 1) { x.save(); x.translate(cx, cy); x.scale(s, s); box(x, -12, 60, 24, 60, '#d9c7a8', 4); x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 40, 80, 0, 0, TAU); x.fill(); x.fillStyle = '#ffd36b'; x.beginPath(); x.ellipse(0, 0, 34, 74, 0, 0, TAU); x.fill(); for (let r = -60; r < 60; r += 16) for (let c = -20; c <= 20; c += 16) { x.fillStyle = '#f2b544'; x.fillRect(c - 5, r, 10, 10) } x.restore() }
export function potato(x, cx, cy, s = 1) { x.save(); x.translate(cx, cy); x.scale(s, s); x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 40, 28, 0, 0, TAU); x.fill(); x.fillStyle = '#c9a06a'; x.beginPath(); x.ellipse(0, 0, 34, 22, 0, 0, TAU); x.fill(); x.restore() }
/** a big boil pot with steam; contents spill in when pour > 0 */
export function boilPot(x, cx, base, t, { steam = 1 } = {}) {
  box(x, cx - 170, base - 300, 340, 300, '#9aa3ad', 8); box(x, cx - 200, base - 320, 400, 34, '#6d7480', 6); box(x, cx - 230, base - 250, 40, 30, '#6d7480', 5); box(x, cx + 190, base - 250, 40, 30, '#6d7480', 5)
  for (let k = 0; k < 6; k++) { const ph = (t * 0.7 + k / 6) % 1; x.strokeStyle = `rgba(255,255,255,${(0.55 * (1 - ph) * steam).toFixed(2)})`; x.lineWidth = 8; x.beginPath(); const sx = cx - 120 + k * 48; x.moveTo(sx, base - 340 - ph * 220); x.quadraticCurveTo(sx + 30, base - 380 - ph * 220, sx, base - 420 - ph * 220); x.stroke() }
  for (let k = 0; k < 8; k++) { const fx = cx - 300 + (k * 83) % 600, fl = 30 + 14 * Math.sin(t * 12 + k); x.fillStyle = k % 2 ? '#ff9a3c' : '#ffd36b'; x.beginPath(); x.moveTo(fx - 14, base + 6); x.lineTo(fx, base + 6 - fl); x.lineTo(fx + 14, base + 6); x.fill() }
}
/** newspaper-covered table with a pile of crawfish, corn and potatoes */
export function crawfishTable(x, cx, top, t, n = 14, sz = 0.6) {
  box(x, cx - 440, top, 880, 60, '#d8d2c0', 6); for (let k = 0; k < 9; k++) { x.fillStyle = 'rgba(27,18,54,0.25)'; x.fillRect(cx - 420 + k * 95, top + 14, 70, 6); x.fillRect(cx - 420 + k * 95, top + 30, 50, 6) }
  for (let k = 0; k < n; k++) crawfish(x, cx - 330 + (k * 97) % 660, top - 6 - (k % 3) * 22, sz, ((k * 1.7) % 2) - 1)
  corn(x, cx - 180, top - 30, 0.5); corn(x, cx + 220, top - 30, 0.5); potato(x, cx + 40, top - 20); potato(x, cx - 60, top - 26, 0.8)
}
export function bowl(x, cx, cy, s = 1, { broth = '#c98e4a', steam = 1, t = 0, noodles = true, col = '#efe6d6' } = {}) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 170, 40, 0, 0, TAU); x.fill(); x.beginPath(); x.moveTo(-170, 0); x.quadraticCurveTo(-150, 150, 0, 150); x.quadraticCurveTo(150, 150, 170, 0); x.fill()
  x.fillStyle = col; x.beginPath(); x.moveTo(-160, 4); x.quadraticCurveTo(-140, 140, 0, 140); x.quadraticCurveTo(140, 140, 160, 4); x.fill()
  x.fillStyle = broth; x.beginPath(); x.ellipse(0, 0, 158, 32, 0, 0, TAU); x.fill()
  if (noodles) { x.strokeStyle = '#f4e8c8'; x.lineWidth = 6; for (let k = 0; k < 5; k++) { x.beginPath(); x.moveTo(-100 + k * 40, -6); x.quadraticCurveTo(-80 + k * 40, 16, -60 + k * 40, -4); x.stroke() } x.fillStyle = '#7dbf5a'; x.fillRect(-40, -14, 22, 10); x.fillRect(50, -6, 20, 10); x.fillStyle = '#a5452a'; x.fillRect(0, -16, 34, 14) }
  for (let k = 0; k < 4; k++) { const ph = (t * 0.6 + k / 4) % 1; x.strokeStyle = `rgba(255,255,255,${(0.6 * (1 - ph) * steam).toFixed(2)})`; x.lineWidth = 7; x.beginPath(); x.moveTo(-70 + k * 45, -40 - ph * 170); x.quadraticCurveTo(-45 + k * 45, -80 - ph * 170, -70 + k * 45, -120 - ph * 170); x.stroke() }
  x.restore()
}
export function boba(x, cx, cy, s = 1, { tea = '#c9a06a', pearls = 1, straw = '#ff8fb1' } = {}) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  box(x, 4, -190, 22, 120, straw, 4)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-76, -96); x.lineTo(76, -96); x.lineTo(58, 116); x.lineTo(-58, 116); x.fill()
  x.fillStyle = tea; x.beginPath(); x.moveTo(-68, -78); x.lineTo(68, -78); x.lineTo(52, 108); x.lineTo(-52, 108); x.fill()
  x.fillStyle = 'rgba(255,255,255,0.5)'; x.fillRect(-70, -96, 140, 14)
  for (let k = 0; k < Math.round(12 * pearls); k++) { x.fillStyle = '#2a1a10'; x.beginPath(); x.arc(-40 + (k % 5) * 20, 96 - Math.floor(k / 5) * 18, 9, 0, TAU); x.fill() }
  x.restore()
}
export function dumpling(x, cx, cy, s = 1) { x.save(); x.translate(cx, cy); x.scale(s, s); x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 46, Math.PI, 0); x.lineTo(46, 14); x.lineTo(-46, 14); x.fill(); x.fillStyle = '#f4ecd8'; x.beginPath(); x.arc(0, 0, 40, Math.PI, 0); x.lineTo(40, 8); x.lineTo(-40, 8); x.fill(); x.fillStyle = 'rgba(0,0,0,0.15)'; for (let k = -2; k <= 2; k++) x.fillRect(k * 12 - 2, -36, 4, 20); x.restore() }
export function steamer(x, cx, cy, t, s = 1) { x.save(); x.translate(cx, cy); x.scale(s, s); box(x, -150, -20, 300, 90, '#c9a06a', 6); for (let k = 0; k < 300; k += 30) { x.fillStyle = 'rgba(0,0,0,0.15)'; x.fillRect(-150 + k, -20, 4, 90) } for (let k = 0; k < 3; k++) dumpling(x, -90 + k * 90, -30, 0.9); x.restore() }
export function hotPot(x, cx, cy, t, s = 1) { x.save(); x.translate(cx, cy); x.scale(s, s); circ(x, 0, 0, 160, '#6d7480'); circ(x, 0, 0, 140, '#c83420', 0); x.fillStyle = '#f2e6c8'; x.beginPath(); x.arc(0, 0, 140, -Math.PI / 2, Math.PI / 2); x.fill(); x.fillStyle = INK; x.fillRect(-4, -140, 8, 280); for (let k = 0; k < 8; k++) { const ph = (t * 1.3 + k * 0.37) % 1; x.fillStyle = 'rgba(255,255,255,0.5)'; x.beginPath(); x.arc(-100 + (k * 47) % 200, -80 + (k * 61) % 160, 6 + 8 * ph, 0, TAU); x.fill() } x.restore() }
/** chaat: a plate piled with crunchy puris, chutneys (green + tamarind) and sev */
export function chaat(x, cx, cy, s = 1) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 20, 200, 56, 0, 0, TAU); x.fill(); x.fillStyle = BONE; x.beginPath(); x.ellipse(0, 14, 190, 48, 0, 0, TAU); x.fill()
  for (let k = 0; k < 6; k++) circ(x, -130 + k * 52, -10 - (k % 2) * 16, 30, '#e0b060', 4)
  x.fillStyle = '#5a2a14'; for (let k = 0; k < 6; k++) x.fillRect(-140 + k * 52, -30, 34, 10)
  x.fillStyle = '#5fbf4a'; for (let k = 0; k < 5; k++) x.fillRect(-110 + k * 52, -42, 26, 8)
  x.fillStyle = '#ffd36b'; for (let k = 0; k < 40; k++) x.fillRect(-150 + (k * 37) % 300, -60 + (k * 13) % 26, 8, 4)
  x.fillStyle = '#c0304a'; for (let k = 0; k < 8; k++) x.fillRect(-120 + k * 34, -50 + (k % 3) * 6, 8, 8)
  x.restore()
}
/** a box of colourful sweets (mithai) */
export function sweetsBox(x, cx, cy, s = 1) { x.save(); x.translate(cx, cy); x.scale(s, s); box(x, -170, -60, 340, 120, '#ffd36b', 6); const C = ['#ff8fb1', '#f4ecd8', '#ff9a3c', '#7dbf5a', '#c9a6ff', '#f2c75c']; for (let k = 0; k < 6; k++) box(x, -150 + (k % 3) * 104, -44 + Math.floor(k / 3) * 56, 88, 40, C[k], 4); x.restore() }
export function jollofPot(x, cx, cy, t, s = 1) { x.save(); x.translate(cx, cy); x.scale(s, s); box(x, -180, -40, 360, 150, '#4a4a58', 8); x.fillStyle = INK; x.beginPath(); x.ellipse(0, -40, 186, 40, 0, 0, TAU); x.fill(); x.fillStyle = '#e0602a'; x.beginPath(); x.ellipse(0, -40, 172, 30, 0, 0, TAU); x.fill(); for (let k = 0; k < 30; k++) { x.fillStyle = k % 3 ? '#f08a3a' : '#c83420'; x.fillRect(-150 + (k * 41) % 300, -56 + (k * 17) % 26, 10, 6) } x.fillStyle = '#7dbf5a'; x.fillRect(-40, -54, 14, 10); x.fillRect(60, -46, 14, 10); for (let k = 0; k < 4; k++) { const ph = (t * 0.6 + k / 4) % 1; x.strokeStyle = `rgba(255,255,255,${(0.5 * (1 - ph)).toFixed(2)})`; x.lineWidth = 7; x.beginPath(); x.moveTo(-60 + k * 40, -80 - ph * 160); x.quadraticCurveTo(-35 + k * 40, -120 - ph * 160, -60 + k * 40, -160 - ph * 160); x.stroke() } x.restore() }
export function skewer(x, cx, cy, s = 1, rot = -0.3) { x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s); x.fillStyle = '#d9c7a8'; x.fillRect(-120, -4, 240, 8); for (let k = 0; k < 4; k++) box(x, -90 + k * 50, -22, 40, 44, k % 2 ? '#8a3a1a' : '#a5452a', 4); x.fillStyle = '#e0602a'; for (let k = 0; k < 10; k++) x.fillRect(-86 + k * 18, -18 + (k % 3) * 10, 6, 6); x.restore() }
export function puffpuff(x, cx, cy, s = 1) { circ(x, cx, cy, 30 * s, '#d9903a', 5); x.fillStyle = 'rgba(255,255,255,0.6)'; for (let k = 0; k < 5; k++) x.fillRect(cx - 14 * s + k * 7 * s, cy - 12 * s + (k % 2) * 10 * s, 4, 4) }
export function wing(x, cx, cy, s = 1, flat = false, wet = true) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  if (flat) { box(x, -46, -26, 92, 52, '#d98a3a', 5); x.fillStyle = '#e8c05a'; x.fillRect(-36, -16, 70, 10) }
  else { circ(x, -16, 0, 34, '#d98a3a', 5); box(x, 14, -10, 50, 20, '#f4ecd8', 4) }
  if (wet) { x.fillStyle = 'rgba(255,240,150,0.6)'; x.fillRect(-30, -20, 14, 6); x.fillStyle = '#ffd36b'; for (let k = 0; k < 6; k++) x.fillRect(-36 + k * 12, -6 + (k % 2) * 12, 5, 5) }
  x.restore()
}
export function basket(x, cx, cy, s = 1, col = BRAKE) { x.save(); x.translate(cx, cy); x.scale(s, s); x.fillStyle = INK; x.beginPath(); x.moveTo(-190, -30); x.lineTo(190, -30); x.lineTo(150, 70); x.lineTo(-150, 70); x.fill(); x.fillStyle = col; x.beginPath(); x.moveTo(-180, -24); x.lineTo(180, -24); x.lineTo(144, 62); x.lineTo(-144, 62); x.fill(); x.fillStyle = 'rgba(255,255,255,0.8)'; for (let k = 0; k < 6; k++) for (let r = 0; r < 2; r++) if ((k + r) % 2) x.fillRect(-160 + k * 54, -18 + r * 40, 54, 40); x.restore() }
export function raspa(x, cx, cy, s = 1, { syrup = '#ff4a6e', syrup2 = '#5ec8ff', melt = 0, chamoy = false } = {}) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-70, -10); x.lineTo(70, -10); x.lineTo(50, 150); x.lineTo(-50, 150); x.fill(); x.fillStyle = '#f4ecd8'; x.beginPath(); x.moveTo(-62, -4); x.lineTo(62, -4); x.lineTo(44, 142); x.lineTo(-44, 142); x.fill()
  const h = 120 * (1 - 0.5 * clamp(melt))
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, -10, 80, h * 0.9 + 6, 0, Math.PI, 0); x.fill()
  x.fillStyle = syrup; x.beginPath(); x.ellipse(0, -10, 74, h * 0.9, 0, Math.PI, 0); x.fill(); x.fillStyle = syrup2; x.beginPath(); x.ellipse(24, -10, 46, h * 0.85, 0, Math.PI, 0); x.fill()
  if (chamoy) { x.strokeStyle = '#8a1a2a'; x.lineWidth = 8; x.beginPath(); for (let k = 0; k < 6; k++) x.lineTo(-60 + k * 24, -10 - h * 0.6 + (k % 2) * 26); x.stroke(); x.fillStyle = '#e0602a'; for (let k = 0; k < 10; k++) x.fillRect(-50 + k * 10, -10 - h * 0.7 + (k % 3) * 14, 6, 6) }
  box(x, 30, -10 - h - 60, 14, 80, '#ff8fb1', 3)
  x.restore()
}
export function brisket(x, cx, cy, s = 1, sliced = 0) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  box(x, -230, 30, 460, 40, '#c9783a', 6)
  const n = Math.round(clamp(sliced) * 6)
  box(x, -190, -60, 380 - n * 40, 90, '#2a1410', 6); x.fillStyle = '#e07a5a'; x.fillRect(-180, -10, 360 - n * 40, 8)
  for (let k = 0; k < n; k++) { box(x, 190 - n * 40 + k * 44 + 10, -60, 30, 90, '#2a1410', 4); x.fillStyle = '#d07a6a'; x.fillRect(190 - n * 40 + k * 44 + 14, -54, 22, 78); x.fillStyle = '#ff9a7a'; x.fillRect(190 - n * 40 + k * 44 + 14, -54, 22, 8) }
  x.restore()
}
export function smoker(x, cx, base, t) {
  box(x, cx - 220, base - 260, 440, 170, '#2a2638', 8); box(x, cx + 160, base - 470, 50, 220, '#2a2638', 6); box(x, cx - 260, base - 90, 30, 90, '#2a2638', 4); box(x, cx + 230, base - 90, 30, 90, '#2a2638', 4)
  for (let k = 0; k < 6; k++) { const ph = (t * 0.4 + k / 6) % 1; x.fillStyle = `rgba(220,220,230,${(0.45 * (1 - ph)).toFixed(2)})`; x.beginPath(); x.arc(cx + 185 + Math.sin(ph * 6 + k) * 30, base - 480 - ph * 320, 24 + ph * 40, 0, TAU); x.fill() }
}
export function brunchTable(x, cx, top, t) {
  box(x, cx - 300, top, 600, 34, '#f4efe4', 6); box(x, cx - 260, top + 40, 26, FLOOR + 50 - top - 40, '#c9a06a', 4); box(x, cx + 234, top + 40, 26, FLOOR + 50 - top - 40, '#c9a06a', 4)
  circ(x, cx - 160, top - 20, 60, BONE, 5); for (let k = 0; k < 3; k++) circ(x, cx - 160, top - 34 + k * 8, 34, '#e8b86a', 3); x.fillStyle = '#ffd36b'; x.fillRect(cx - 180, top - 66, 40, 10)
  circ(x, cx + 160, top - 20, 60, BONE, 5); box(x, cx + 120, top - 50, 80, 30, '#f4ecd8', 4); x.fillStyle = '#ffb02e'; x.beginPath(); x.arc(cx + 160, top - 36, 14, 0, TAU); x.fill()
  box(x, cx - 20, top - 130, 40, 110, '#f4efe4', 4); x.fillStyle = '#ff8fb1'; x.beginPath(); x.arc(cx, top - 150, 26, 0, TAU); x.fill()
}
/** a king cake: an oval ring with purple, green and gold sugar bands (season starts Jan 6) */
export function kingCake(x, cx, cy, s = 1, cut = 0, t = 0) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 250, 110, 0, 0, TAU); x.fill(); x.fillStyle = '#d9a55a'; x.beginPath(); x.ellipse(0, 0, 240, 100, 0, 0, TAU); x.fill()
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 110, 40, 0, 0, TAU); x.fill(); x.fillStyle = '#f4efe4'; x.beginPath(); x.ellipse(0, 0, 100, 32, 0, 0, TAU); x.fill()
  const C = ['#7a3ab0', '#3aa04a', '#f2c75c']; for (let k = 0; k < 12; k++) { const a = k * TAU / 12; x.fillStyle = C[k % 3]; x.beginPath(); x.ellipse(Math.cos(a) * 175, Math.sin(a) * 70, 44, 22, a, 0, TAU); x.fill() }
  for (let k = 0; k < Math.round(cut * 8); k++) { const a = -Math.PI / 2 + k * TAU / 8; x.strokeStyle = INK; x.lineWidth = 6; x.beginPath(); x.moveTo(Math.cos(a) * 105, Math.sin(a) * 38); x.lineTo(Math.cos(a) * 248, Math.sin(a) * 108); x.stroke() }
  x.restore()
}
export function babyToy(x, cx, cy, s = 1) { x.save(); x.translate(cx, cy); x.scale(s, s); circ(x, 0, -24, 18, '#ffd1b0', 4); box(x, -16, -6, 32, 40, '#ffd1b0', 4); x.fillStyle = INK; x.fillRect(-8, -28, 4, 4); x.fillRect(4, -28, 4, 4); x.restore() }
export function mansion(x, cx, base, t) {
  box(x, cx - 360, base - 520, 720, 520, '#efe6d6', 8); x.fillStyle = INK; x.beginPath(); x.moveTo(cx - 400, base - 520); x.lineTo(cx, base - 700); x.lineTo(cx + 400, base - 520); x.fill(); x.fillStyle = '#6a7a9a'; x.beginPath(); x.moveTo(cx - 380, base - 526); x.lineTo(cx, base - 686); x.lineTo(cx + 380, base - 526); x.fill()
  for (let k = 0; k < 4; k++) box(x, cx - 300 + k * 180, base - 470, 20, 470, BONE, 4)
  for (let r = 0; r < 2; r++) for (let k = 0; k < 3; k++) { const wx = cx - 250 + k * 180, wy = base - 430 + r * 200; box(x, wx, wy, 120, 130, Math.sin(t + k + r) > 0 ? '#ffd36b' : '#3a4a6a', 5) }
  box(x, cx - 60, base - 200, 120, 200, '#6b3b1f', 5); x.fillStyle = '#7dbf5a'; for (let k = 0; k < 6; k++) { x.beginPath(); x.arc(cx - 380 + k * 152, base - 10, 50, Math.PI, 0); x.fill() }
}

// ── romcom places
export function bayou(x, t, { water = '#4a7a6a' } = {}) {   // the trail along the bayou: trees, grass, the path, the water in front
  const y = FLOOR + 70
  skyline(x, FLOOR - 120, t, { col: '#7a7ab0', lit: '#ffe8c0', alpha: 0.5 })
  for (let k = 0; k < 6; k++) { const tx = 60 + k * 200; box(x, tx - 12, FLOOR - 300, 24, 200, '#6b3b1f', 4); x.fillStyle = INK; x.beginPath(); x.arc(tx, FLOOR - 320, 96, 0, TAU); x.fill(); x.fillStyle = k % 2 ? '#3d7a3a' : '#2f6a2a'; x.beginPath(); x.arc(tx, FLOOR - 320, 88, 0, TAU); x.fill() }
  x.fillStyle = '#3d8a3a'; x.fillRect(0, FLOOR - 120, 1080, 110); x.fillStyle = '#d8c8a8'; x.fillRect(0, FLOOR - 16, 1080, 86); x.fillStyle = INK; x.fillRect(0, FLOOR - 20, 1080, 6)
  x.fillStyle = water; x.fillRect(0, y, 1080, 1920 - y); x.fillStyle = INK; x.fillRect(0, y - 4, 1080, 8)
  for (let k = 0; k < 14; k++) { const ph = (t * 40 + k * 110) % 1180 - 50; x.fillStyle = 'rgba(255,255,255,0.22)'; x.fillRect(ph, y + 40 + (k * 47) % 420, 70, 6) }
}
export function court(x, t) {
  x.fillStyle = '#2b6a9a'; x.fillRect(0, 900, 1080, 1020); x.fillStyle = '#3a9a6a'; x.fillRect(80, 960, 920, 560)
  x.strokeStyle = BONE; x.lineWidth = 8; x.strokeRect(80, 960, 920, 560); x.beginPath(); x.moveTo(80, 1240); x.lineTo(1000, 1240); x.stroke(); x.beginPath(); x.moveTo(540, 960); x.lineTo(540, 1100); x.moveTo(540, 1380); x.lineTo(540, 1520); x.stroke()
  x.fillStyle = INK; x.fillRect(60, 1226, 960, 10); for (let k = 0; k < 24; k++) { x.fillStyle = 'rgba(239,230,214,0.6)'; x.fillRect(70 + k * 40, 1180, 3, 50) } x.fillStyle = BONE; x.fillRect(60, 1176, 960, 8)
}
export function ball(x, cx, cy, s = 1) { circ(x, cx, cy, 20 * s, '#e8f04a', 4); x.fillStyle = '#b0b83a'; for (let k = 0; k < 3; k++) x.fillRect(cx - 10 * s + k * 8 * s, cy - 4, 4, 4) }
export function paddle(x, cx, cy, s = 1, col = PINK, rot = 0) { x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s); box(x, -8, 30, 16, 60, '#6b3b1f', 4); x.fillStyle = INK; x.beginPath(); x.ellipse(0, -20, 52, 62, 0, 0, TAU); x.fill(); x.fillStyle = col; x.beginPath(); x.ellipse(0, -20, 44, 54, 0, 0, TAU); x.fill(); x.restore() }
export function scoreboard(x, cx, cy, a, b, { la = 'HOME', lb = 'AWAY', k = 1, col = '#1b1236' } = {}) { if (k <= 0) return; x.save(); x.translate(cx, cy); x.scale(k, k); box(x, -260, -90, 520, 180, col, 8); txt(x, la, -130, -50, { size: 28, col: BONE, font: MONO, weight: 700 }); txt(x, lb, 130, -50, { size: 28, col: BONE, font: MONO, weight: 700 }); txt(x, String(a), -130, 30, { size: 80, col: GOLD, font: MONO, weight: 700 }); txt(x, String(b), 130, 30, { size: 80, col: GOLD, font: MONO, weight: 700 }); x.restore() }
/** a low bridge silhouette over the bayou; bats stream out from under it when bats > 0 */
export function batBridge(x, t, bats = 0, y = 820) {   // a low bridge over the bayou at sunset; bats stream out from under it when bats > 0
  const wy = y + 250
  x.fillStyle = '#2a3a5a'; x.fillRect(0, wy, 1080, FLOOR + 60 - wy); for (let k = 0; k < 10; k++) { x.fillStyle = 'rgba(255,190,140,0.3)'; x.fillRect((k * 150 + t * 20) % 1080, wy + 20 + (k % 4) * 28, 70, 5) }
  box(x, -10, y - 40, 1100, 70, '#4a4a58', 6); for (let k = 0; k < 6; k++) box(x, 60 + k * 190, y + 30, 40, wy - y - 30, '#4a4a58', 5)
  ground(x, '#2a3a2a')
  const n = Math.round(90 * clamp(bats))
  for (let k = 0; k < n; k++) { const ph = (t * 0.25 + k * 0.137) % 1, bx = 100 + (k * 97) % 880 + Math.sin(ph * 9 + k) * 60, by = y + 40 - ph * 620, fl = Math.sin(t * 20 + k) > 0 ? 1 : -1; x.fillStyle = INK; x.fillRect(bx - 5, by - 4, 10, 8); x.fillRect(bx - 19, by - 3 * fl - 4, 14, 5); x.fillRect(bx + 5, by - 3 * fl - 4, 14, 5) }
}
export function lake(x, t, { y = 1050, col = '#3a8ab0' } = {}) { x.fillStyle = col; x.fillRect(0, y, 1080, 1920 - y); for (let k = 0; k < 16; k++) { const ph = (t * 30 + k * 90) % 1180 - 50; x.fillStyle = 'rgba(255,255,255,0.3)'; x.fillRect(ph, y + 40 + (k * 53) % 700, 70, 6) } x.fillStyle = INK; x.fillRect(0, y - 4, 1080, 8) }
export function paddleBoat(x, cx, cy, t, { col = '#5ec8ff', s = 1, spin = 0 } = {}) {
  x.save(); x.translate(cx, cy); x.rotate(spin); x.scale(s, s)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-250, -40); x.lineTo(250, -40); x.lineTo(200, 60); x.lineTo(-200, 60); x.fill(); x.fillStyle = col; x.beginPath(); x.moveTo(-240, -34); x.lineTo(240, -34); x.lineTo(194, 52); x.lineTo(-194, 52); x.fill()
  x.fillStyle = BONE; x.fillRect(-240, -34, 480, 12)
  const a = t * 6; for (const sx of [-1, 1]) { x.save(); x.translate(sx * 230, 30); x.rotate(a); x.fillStyle = '#ff8fb1'; for (let k = 0; k < 4; k++) { x.rotate(Math.PI / 2); x.fillRect(-6, 0, 12, 40) } x.restore() }
  x.restore()
}
export function gallery(x, t, { wall = '#efe6d6', floorCol = '#b89a7a' } = {}) { x.fillStyle = wall; x.fillRect(0, 0, 1080, FLOOR + 60); x.fillStyle = floorCol; x.fillRect(0, FLOOR + 60, 1080, 1920); x.fillStyle = INK; x.fillRect(0, FLOOR + 54, 1080, 10); x.fillStyle = 'rgba(0,0,0,0.06)'; x.fillRect(0, FLOOR - 20, 1080, 74) }
export function painting(x, cx, cy, w, h, kind = 0, t = 0) {
  box(x, cx - w / 2 - 20, cy - h / 2 - 20, w + 40, h + 40, '#c9983a', 6); x.fillStyle = BONE; x.fillRect(cx - w / 2, cy - h / 2, w, h)
  x.save(); x.beginPath(); x.rect(cx - w / 2, cy - h / 2, w, h); x.clip()
  if (kind === 0) { x.fillStyle = '#c83420'; x.fillRect(cx - w / 2 + 30, cy - h / 2 + 30, w - 60, h * 0.45); x.fillStyle = '#2a1a4a'; x.fillRect(cx - w / 2 + 30, cy + 10, w - 60, h * 0.36) }
  else if (kind === 1) { x.fillStyle = '#5ec8ff'; x.fillRect(cx - w / 2, cy - h / 2, w, h); circ(x, cx + w * 0.2, cy - h * 0.2, w * 0.12, '#ffd36b', 0); x.fillStyle = '#3d7a3a'; x.fillRect(cx - w / 2, cy + h * 0.1, w, h * 0.4) }
  else { for (let k = 0; k < 8; k++) { x.fillStyle = ['#ff8fb1', '#ffd36b', '#7dffb0', '#8fe3ff'][k % 4]; x.beginPath(); x.arc(cx - w / 2 + (k * 97) % w, cy - h / 2 + (k * 61) % h, 30 + (k % 3) * 16, 0, TAU); x.fill() } }
  x.restore()
  box(x, cx - 60, cy + h / 2 + 50, 120, 50, BONE, 3)
}
export function exitSign(x, cx, cy) { box(x, cx - 90, cy - 36, 180, 72, '#1f7a4a', 5); txt(x, 'EXIT', cx, cy + 2, { size: 44, col: '#f4fbf6' }) }
export function stage(x, t, { col = '#4a1a5a', spot = '#ffd36b' } = {}) {
  x.fillStyle = col; x.fillRect(0, 0, 1080, FLOOR + 60); for (let k = 0; k < 8; k++) { x.fillStyle = k % 2 ? 'rgba(0,0,0,0.12)' : 'rgba(255,255,255,0.03)'; x.fillRect(k * 135, 0, 135, FLOOR + 60) }
  box(x, -10, FLOOR + 20, 1100, 60, '#6b3b1f', 6); x.fillStyle = '#2a1a10'; x.fillRect(0, FLOOR + 86, 1080, 1920)
  for (const sx of [300, 780]) { x.save(); x.globalAlpha = 0.18 + 0.06 * Math.sin(t * 3 + sx); x.fillStyle = spot; x.beginPath(); x.moveTo(sx - 30, 0); x.lineTo(sx - 220, FLOOR + 60); x.lineTo(sx + 220, FLOOR + 60); x.lineTo(sx + 30, 0); x.fill(); x.restore() }
}
export function mic(x, cx, cy, s = 1) { x.save(); x.translate(cx, cy); x.scale(s, s); box(x, -8, 0, 16, 300, '#8f96a0', 4); box(x, -60, 290, 120, 16, '#8f96a0', 4); circ(x, 0, -10, 26, '#2a2638', 5); x.restore() }
export function lyricScreen(x, cx, cy, lines, hi, t) { box(x, cx - 330, cy - 120, 660, 240, '#0e1630', 8); lines.forEach((l, i) => txt(x, l, cx, cy - 50 + i * 90, { size: 44, col: i === hi ? GOLD : '#8f96c0', font: MONO, weight: 700 })) }
export function park(x, t, { grass = '#4a9a4a' } = {}) { sky(x, '#7ac8ff', '#e8f6ff'); clouds(x, t); skyline(x, FLOOR + 60, t, { col: '#7a8ab8', lit: '#e8f4ff', alpha: 0.5 }); ground(x, grass); for (let k = 0; k < 3; k++) { const tx = 140 + k * 400; box(x, tx - 14, FLOOR - 200, 28, 260, '#6b3b1f', 4); x.fillStyle = INK; x.beginPath(); x.arc(tx, FLOOR - 240, 110, 0, TAU); x.fill(); x.fillStyle = '#3d8a3a'; x.beginPath(); x.arc(tx, FLOOR - 240, 102, 0, TAU); x.fill() } }
export function beach(x, t, { water = '#8a7a5a' } = {}) {
  sky(x, '#8fd0ff', '#fff0d0', 1000); sun(x, 860, 330, 70, t)
  x.fillStyle = water; x.fillRect(0, 900, 1080, 300); for (let k = 0; k < 10; k++) { const ph = (t * 50 + k * 120) % 1180 - 50; x.fillStyle = 'rgba(255,255,255,0.4)'; x.fillRect(ph, 930 + (k % 4) * 60, 90, 8) }
  x.fillStyle = BONE; x.beginPath(); x.moveTo(0, 1190); for (let xx = 0; xx <= 1080; xx += 60) x.lineTo(xx, 1180 + 14 * Math.sin(xx * 0.02 + t * 2)); x.lineTo(1080, 1200); x.lineTo(0, 1200); x.fill()
  x.fillStyle = '#e8d09a'; x.fillRect(0, 1196, 1080, 1920); for (let k = 0; k < 40; k++) { x.fillStyle = 'rgba(0,0,0,0.08)'; x.fillRect((k * 131) % 1080, 1230 + (k * 71) % 600, 8, 8) }
}
export function umbrella(x, cx, base, col = '#ff5a6e') { box(x, cx - 6, base - 360, 12, 360, BONE, 4); for (let k = 0; k < 6; k++) { x.fillStyle = INK; x.beginPath(); x.moveTo(cx, base - 400); x.arc(cx, base - 340, 190, Math.PI + k * Math.PI / 6, Math.PI + (k + 1) * Math.PI / 6); x.fill(); x.fillStyle = k % 2 ? BONE : col; x.beginPath(); x.moveTo(cx, base - 396); x.arc(cx, base - 340, 182, Math.PI + k * Math.PI / 6 + 0.02, Math.PI + (k + 1) * Math.PI / 6 - 0.02); x.fill() } }
export function bungalow(x, cx, base, t, { col = '#8ab0d0', porch = true } = {}) {
  box(x, cx - 260, base - 400, 520, 400, col, 8); x.fillStyle = INK; x.beginPath(); x.moveTo(cx - 310, base - 390); x.lineTo(cx, base - 600); x.lineTo(cx + 310, base - 390); x.fill(); x.fillStyle = '#7a4a3a'; x.beginPath(); x.moveTo(cx - 290, base - 396); x.lineTo(cx, base - 584); x.lineTo(cx + 290, base - 396); x.fill()
  box(x, cx - 200, base - 320, 120, 120, '#ffd36b', 5); box(x, cx + 80, base - 320, 120, 120, '#ffd36b', 5); box(x, cx - 50, base - 230, 100, 230, '#6b3b1f', 5)
  if (porch) { box(x, cx - 290, base - 40, 580, 40, '#c9a06a', 5); for (let k = 0; k < 5; k++) box(x, cx - 280 + k * 140, base - 210, 16, 170, BONE, 3); box(x, cx - 290, base - 220, 580, 20, BONE, 4) }
}
/** a small pixel dog with a bandana */
export function dog(x, cx, base, t, { col = '#c9883a', band = BRAKE, flip = false, run = 0 } = {}) {
  x.save(); x.translate(cx, base); x.scale(flip ? -1 : 1, 1)
  const hop = run ? Math.abs(Math.sin(t * 12)) * 16 : 0; x.translate(0, -hop)
  box(x, -70, -90, 140, 60, col, 5); box(x, 60, -130, 60, 60, col, 5); box(x, 104, -110, 26, 20, '#2a1a10', 3)
  box(x, 66, -150, 18, 26, '#8a5a2a', 3); x.fillStyle = INK; x.fillRect(96, -116, 8, 8)
  x.fillStyle = band; x.beginPath(); x.moveTo(54, -96); x.lineTo(96, -96); x.lineTo(74, -66); x.fill()
  for (const lx of [-56, -20, 20, 50]) box(x, lx, -30, 14, 30 + (run ? 6 * Math.sin(t * 12 + lx) : 0), col, 3)
  const wag = Math.sin(t * 14) * 0.6; x.save(); x.translate(-70, -80); x.rotate(-0.8 + wag); box(x, -40, -6, 40, 12, col, 3); x.restore()
  x.restore()
}
/** a car interior from the back seat: dashboard, windshield, the road scrolling */
export function carInside(x, t, { night = true, scroll = 1 } = {}) {
  x.fillStyle = night ? '#141030' : '#7ac8ff'; x.fillRect(0, 0, 1080, 1920)
  if (night) skyline(x, 900, t, { alpha: 0.9 }); else skyline(x, 900, t, { col: '#6a7fb0', lit: '#e8f4ff', alpha: 0.6 })
  x.fillStyle = '#2a2638'; x.fillRect(0, 900, 1080, 300); for (let k = 0; k < 8; k++) { const ph = ((t * scroll * 1.4 + k / 8) % 1); x.fillStyle = BONE; x.fillRect(540 - 10 - ph * 40, 900 + ph * 300, 20 + ph * 40, 30 * ph + 6) }
  x.fillStyle = '#1a1626'; x.fillRect(0, 0, 1080, 220); x.fillRect(0, 0, 90, 1200); x.fillRect(990, 0, 90, 1200)
  box(x, -10, 1150, 1100, 200, '#2e2a3c', 8); box(x, 140, 1180, 200, 60, '#0e1630', 4); txt(x, '88°F', 240, 1212, { size: 30, col: '#7dffb0', font: MONO, weight: 700 })
  x.fillStyle = '#3a3448'; x.fillRect(0, 1350, 1080, 600)
}
export function chapel(x, t) { x.fillStyle = '#1a1626'; x.fillRect(0, 0, 1080, 1920); for (let k = 0; k < 3; k++) { box(x, 90 + k * 320, 420, 260, 700, ['#2a1a3a', '#1e1a3a', '#2a1426'][k], 6) } x.save(); x.globalAlpha = 0.14; x.fillStyle = '#efe6d6'; x.beginPath(); x.moveTo(440, 0); x.lineTo(240, FLOOR + 60); x.lineTo(840, FLOOR + 60); x.lineTo(640, 0); x.fill(); x.restore(); x.fillStyle = '#2a2638'; x.fillRect(0, FLOOR + 60, 1080, 1920); box(x, 140, FLOOR - 20, 800, 40, '#4a3a2a', 5) }
export function tunnel(x, t, { lit = '#ffe8b0' } = {}) {
  x.fillStyle = '#d8d0c0'; x.fillRect(0, 0, 1080, FLOOR + 60); x.fillStyle = '#b8b0a0'; x.fillRect(0, 300, 1080, 30)
  for (let k = 0; k < 5; k++) { x.fillStyle = lit; x.fillRect(80 + k * 220, 330, 140, 18) }
  for (let k = 0; k < 3; k++) { box(x, 60 + k * 340, 520, 280, 320, '#efe6d6', 5); x.fillStyle = ['#ffd36b', '#ff8fb1', '#8fe3ff'][k]; x.fillRect(60 + k * 340, 520, 280, 60); txt(x, ['LUNCH', 'SALADS', 'COFFEE'][k], 200 + k * 340, 552, { size: 34, col: INK, font: MONO, weight: 700 }) }
  x.fillStyle = '#9a8a7a'; x.fillRect(0, FLOOR + 60, 1080, 1920); for (let k = 0; k < 1080; k += 120) { x.fillStyle = 'rgba(0,0,0,0.1)'; x.fillRect(k, FLOOR + 60, 4, 1920) } x.fillStyle = INK; x.fillRect(0, FLOOR + 54, 1080, 10)
}
/** a split screen: two sides of town, each with its own colour and caption */
export function split(x, t, a, b, ca = '#2a2140', cb = '#20304a', y = 820) {
  x.fillStyle = ca; x.fillRect(0, 0, 540, 1920); x.fillStyle = cb; x.fillRect(540, 0, 540, 1920); x.fillStyle = INK; x.fillRect(532, 0, 16, 1920)
  txt(x, a, 270, y, { size: 40, col: PINK, font: MONO, weight: 700 }); txt(x, b, 810, y, { size: 40, col: '#8fe3ff', font: MONO, weight: 700 })
}
export function phone(x, cx, cy, lines, { k = 1, s = 1 } = {}) {   // a generic phone with chat bubbles (no app UI)
  if (k <= 0) return
  x.save(); x.translate(cx, cy); x.scale(s * k, s * k)
  box(x, -170, -300, 340, 600, '#1b1236', 10); x.fillStyle = '#f4efe4'; x.fillRect(-150, -270, 300, 540)
  lines.forEach(([me, text], i) => { const w = 220, bx = me ? 150 - w - 14 : -150 + 14, by = -240 + i * 110; box(x, bx, by, w, 84, me ? '#5ec8ff' : '#e0d6f0', 3); const [l1, l2] = text.split(' | '); txt(x, l1, bx + w / 2, by + (l2 ? 26 : 42), { size: 26, col: INK }); if (l2) txt(x, l2, bx + w / 2, by + 58, { size: 26, col: INK }) })
  x.restore()
}
export function heartsRain(x, t, n = 14, col = PINK) { for (let k = 0; k < n; k++) { const ph = (t * 0.35 + k / n) % 1, hx = 60 + (k * 131) % 960, hy = 300 + ph * 1100; x.fillStyle = col; x.fillRect(hx - 10, hy - 6, 8, 8); x.fillRect(hx + 2, hy - 6, 8, 8); x.fillRect(hx - 10, hy + 2, 20, 6); x.fillRect(hx - 4, hy + 8, 8, 6) } }
export function confetti(x, t, n = 22) { for (let k = 0; k < n; k++) { const ph = (t * 0.3 + k / n) % 1; x.fillStyle = [GOLD, PINK, '#8fe3ff', '#7dffb0'][k % 4]; x.fillRect(60 + (k * 113) % 960, 300 + ph * 1100, 14, 22) } }
export function partyGlow(x, t, lt) { label(x, 540, 640, 'BETA PARTY · JAN 9', Kp(lt, 0.1), { size: 46, bg: GOLD, rot: -0.03 }); confetti(x, t); if (lt > 1.2) sparkles(x, t, 540, 1000, 1.2 + (t - lt), 14, 320, 8) }
export { HGREEN, BRAKE, GOLD, BONE, PINK, INK, MONO, SERIF }
