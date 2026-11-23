// Houston Star Talk · worker w17 · COUNTDOWN (hst405–hst428): "N days until Jan 9: [sign] is getting ready".
// hst405 = 24 days … hst428 = 1 day (numbered from the id order, counting down; never a weekday).
// This file: the countdown builder (tear-off day calendar, day chip, final stamp) and the sets/props this batch uses.
// Episode scripts: w17a.js (hst405–hst416) and w17b.js (hst417–hst428). Engine: starrace/ep.js; ticket: kit.js partyCard.
import { clamp, prog, ease } from '../../src/lib.js'
import { FLOOR, box, txt, room, outside, table, heart } from '../starrace/ep.js'
import { label, sparkles, pop01, signChar, GOLD, BONE, PINK, INK, INTER, MONO, SERIF, MINT, SKYB, LAV, SIGN_IDS } from '../signs3kit.js'
import { skyline, partyCard, heatSun, sweat, BRAKE, HGREEN, mural, houses, coffeeShop, freeway, loopMap, overheadSign, kolache, klobasnek, taco, soupPot, puffer, streetSign } from './kit.js'

export { clamp, prog, ease, FLOOR, box, txt, room, outside, table, heart, label, sparkles, pop01, signChar, GOLD, BONE, PINK, INK, INTER, MONO, SERIF, MINT, SKYB, LAV, SIGN_IDS }
export { skyline, heatSun, sweat, BRAKE, HGREEN, mural, houses, coffeeShop, freeway, loopMap, overheadSign, kolache, klobasnek, taco, soupPot, puffer, streetSign }

export const Y = 1255, G = FLOOR + 60
export const BADGE = { text: 'HOU BETA · JAN 9', x: 230, y: 150 }
export const Kp = (lt, a, d = 0.3) => clamp(ease.outBack(prog(lt, a, a + d)))
export const NAME = id => id === 'sagittarius' ? 'Sag' : id[0].toUpperCase() + id.slice(1)

// ── tiny scene helpers ──────────────────────────────────────────────────────────────────────────────────────
/** cast shorthand: { leo: [x, y, size] } or { leo: [[lt, x, y, size], …] } */
export const C = m => Object.fromEntries(Object.entries(m).map(([k, v]) => [k, Array.isArray(v[0]) ? v : [[0, ...v]]]))
/** a hop wave for frame-0 motion */
export const waveHops = (ids, t0 = 0.02) => Object.fromEntries(ids.map((id, i) => [id, [t0 + i * 0.08, 1.1 + i * 0.08]]))
export const STING = [['glitter', 0.0, 0.7], ['pop', 0.02, 880, 0.03, 0], ['whoosh', 0.05, 0.4, 0.02]]

// ── the tear-off day calendar ───────────────────────────────────────────────────────────────────────────────
/** a tear-off page block: "JAN 9 IN" header, a big number, "DAYS" footer. flip 0→1 tears the old page off (prev). */
export function dayCal(x, cx, cy, s, num, { prev = null, flip = 1, foot = null, col = BRAKE, k = 1 } = {}) {
  if (k <= 0) return
  const unit = String(num) === '1' ? 'DAY' : 'DAYS'
  const page = (n, u) => {
    box(x, -150, -170, 300, 340, BONE, 8)
    x.fillStyle = col; x.fillRect(-150, -170, 300, 74)
    txt(x, 'JAN 9 IN', 0, -132, { size: 34, col: BONE, font: MONO, weight: 700 })
    txt(x, String(n), 0, 10, { size: String(n).length > 2 ? 120 : 170, col: INK })
    txt(x, foot || u, 0, 122, { size: 38, col: INK, font: MONO, weight: 700 })
    for (const rx of [-90, 0, 90]) { x.fillStyle = INK; x.fillRect(rx - 8, -186, 16, 30) }
  }
  x.save(); x.translate(cx, cy); x.scale(s * k, s * k)
  x.fillStyle = 'rgba(0,0,0,0.25)'; x.fillRect(-142, -160, 300, 346)
  page(num, unit)
  if (prev != null && flip < 1) {                                  // the old page lifts and flies off up-right
    const f = ease.inCubic(clamp(flip))
    x.save(); x.translate(150 * f + 260 * f * f, -260 * f * f); x.rotate(0.9 * f); x.globalAlpha = 1 - 0.6 * f
    page(prev, String(prev) === '1' ? 'DAY' : 'DAYS'); x.restore()
  }
  x.restore()
}
/** the day chip (top right, after the hook) */
export function dayChip(x, t, n, at = 2.7) {
  const k = clamp((t - at) / 0.3); if (k <= 0) return
  label(x, 880, 150, n === 1 ? '1 DAY' : `${n} DAYS`, k, { size: 34, bg: GOLD, rot: 0.03, font: MONO, weight: 700 })
}

// ── props on a star (P.at(id) → [cx, cy, size]) ────────────────────────────────────────────────────────────
export function glasses(x, P, id, col = GOLD) {
  const [cx, cy, s] = P.at(id); const w = s * 0.17, h = s * 0.13, ey = cy - s * 0.01
  x.strokeStyle = INK; x.lineWidth = Math.max(4, s * 0.025)
  for (const d of [-1, 1]) { x.fillStyle = 'rgba(255,255,255,0.18)'; x.fillRect(cx + d * s * 0.135 - w / 2, ey - h / 2, w, h); x.strokeRect(cx + d * s * 0.135 - w / 2, ey - h / 2, w, h) }
  x.beginPath(); x.moveTo(cx - s * 0.05, ey); x.lineTo(cx + s * 0.05, ey); x.stroke()
  x.strokeStyle = col; x.lineWidth = 3; x.beginPath(); x.moveTo(cx - s * 0.22, ey + h / 2); x.quadraticCurveTo(cx, ey + s * 0.3, cx + s * 0.22, ey + h / 2); x.stroke()   // the chain
}
export function shades(x, P, id) {
  const [cx, cy, s] = P.at(id); const ey = cy - s * 0.01
  for (const d of [-1, 1]) box(x, cx + d * s * 0.135 - s * 0.1, ey - s * 0.065, s * 0.2, s * 0.12, '#0b0820', 3)
  x.fillStyle = INK; x.fillRect(cx - s * 0.05, ey - s * 0.03, s * 0.1, s * 0.03)
  x.fillStyle = 'rgba(255,255,255,0.5)'; x.fillRect(cx - s * 0.21, ey - s * 0.045, s * 0.05, s * 0.02); x.fillRect(cx + s * 0.07, ey - s * 0.045, s * 0.05, s * 0.02)
}
export function clipboard(x, P, id, side = 1) {
  const [cx, cy, s] = P.at(id); const bx = cx + side * s * 0.48, by = cy + s * 0.12
  box(x, bx - s * 0.14, by - s * 0.18, s * 0.28, s * 0.36, '#c98e5a', 4); box(x, bx - s * 0.11, by - s * 0.13, s * 0.22, s * 0.28, BONE, 2)
  for (let k = 0; k < 4; k++) { x.fillStyle = INK; x.fillRect(bx - s * 0.08, by - s * 0.08 + k * s * 0.06, s * 0.15, 3) }
  box(x, bx - s * 0.05, by - s * 0.2, s * 0.1, s * 0.05, '#8f96a0', 2)
}
export function beanie(x, P, id, col = '#2b5fb0') {
  const [cx, cy, s] = P.at(id)
  box(x, cx - s * 0.14, cy - s * 0.56, s * 0.28, s * 0.12, col, 4); x.fillStyle = BONE; x.beginPath(); x.arc(cx, cy - s * 0.6, s * 0.06, 0, Math.PI * 2); x.fill()
}
export function sunHat(x, P, id, col = '#f4e1b0') {
  const [cx, cy, s] = P.at(id)
  x.fillStyle = INK; x.beginPath(); x.ellipse(cx, cy - s * 0.4, s * 0.42, s * 0.08, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = col; x.beginPath(); x.ellipse(cx, cy - s * 0.4, s * 0.38, s * 0.06, 0, 0, Math.PI * 2); x.fill()
  box(x, cx - s * 0.13, cy - s * 0.58, s * 0.26, s * 0.16, col, 4); x.fillStyle = PINK; x.fillRect(cx - s * 0.13, cy - s * 0.46, s * 0.26, s * 0.04)
}
export function bib(x, P, id) {
  const [cx, cy, s] = P.at(id)
  box(x, cx - s * 0.14, cy + s * 0.15, s * 0.28, s * 0.2, BONE, 3); crawdad(x, cx, cy + s * 0.25, s * 0.0022)
}
export function scarf(x, P, id, col = GOLD) {
  const [cx, cy, s] = P.at(id)
  box(x, cx - s * 0.26, cy + s * 0.15, s * 0.52, s * 0.07, col, 3); box(x, cx + s * 0.1, cy + s * 0.2, s * 0.08, s * 0.16, col, 3)
}
export function sweater(x, P, id, col = '#c0304a', motif = null) {   // a knit band across the star's lower half (below the mouth)
  const [cx, cy, s] = P.at(id); const top = cy + s * 0.17, h = s * 0.14
  box(x, cx - s * 0.3, top, s * 0.6, h, col, 4)
  for (let k = 0; k < 5; k++) { x.fillStyle = 'rgba(255,255,255,0.35)'; x.fillRect(cx - s * 0.26 + k * s * 0.12, top + h * 0.3, s * 0.06, h * 0.3) }
  if (motif === 'fish') { const fy = top + h / 2; x.fillStyle = SKYB; x.beginPath(); x.ellipse(cx, fy, s * 0.06, s * 0.035, 0, 0, Math.PI * 2); x.fill(); x.beginPath(); x.moveTo(cx + s * 0.05, fy); x.lineTo(cx + s * 0.1, fy - s * 0.04); x.lineTo(cx + s * 0.1, fy + s * 0.04); x.fill() }
  if (motif === 'star') { x.fillStyle = GOLD; x.fillRect(cx - s * 0.04, top + h * 0.2, s * 0.08, h * 0.6) }
}
export function pufferLow(x, P, id, col = '#e05a3a') { const [cx, cy, s] = P.at(id); for (let k = 0; k < 2; k++) box(x, cx - s * 0.34, cy + s * 0.14 + k * s * 0.12, s * 0.68, s * 0.11, col, 4); beanie(x, P, id) }
export function frizz(x, P, id, amt, col) {      // humidity hair: a puffy mane behind the star
  if (amt <= 0) return
  const [cx, cy, s] = P.at(id); const R = s * (0.5 + 0.35 * amt)
  for (let k = 0; k < 22; k++) { const a = k / 22 * Math.PI * 2, rr = R * (0.85 + 0.15 * Math.sin(k * 3.1)); x.fillStyle = INK; x.beginPath(); x.arc(cx + Math.cos(a) * rr * 0.9, cy - s * 0.05 + Math.sin(a) * rr * 0.8, s * 0.17 * (0.6 + amt * 0.6) + 5, 0, Math.PI * 2); x.fill() }
  for (let k = 0; k < 22; k++) { const a = k / 22 * Math.PI * 2, rr = R * (0.85 + 0.15 * Math.sin(k * 3.1)); x.fillStyle = col; x.beginPath(); x.arc(cx + Math.cos(a) * rr * 0.9, cy - s * 0.05 + Math.sin(a) * rr * 0.8, s * 0.17 * (0.6 + amt * 0.6), 0, Math.PI * 2); x.fill() }
}
export function heldPhone(x, P, id, side = 1, glow = '#bfe6ff') {
  const [cx, cy, s] = P.at(id); const px = cx + side * s * 0.46, py = cy + s * 0.05
  box(x, px - s * 0.08, py - s * 0.15, s * 0.16, s * 0.3, INK, 3); x.fillStyle = glow; x.fillRect(px - s * 0.065, py - s * 0.125, s * 0.13, s * 0.24)
}
export function marker(x, P, id) { const [cx, cy, s] = P.at(id); box(x, cx + s * 0.4, cy - s * 0.05, s * 0.07, s * 0.26, '#2b5fb0', 3); x.fillStyle = BONE; x.fillRect(cx + s * 0.41, cy + s * 0.12, s * 0.05, s * 0.06) }
export function tissues(x, cx, cy, s = 1) { x.save(); x.translate(cx, cy); x.scale(s, s); box(x, -60, -30, 120, 60, SKYB, 5); x.fillStyle = BONE; x.beginPath(); x.moveTo(-20, -30); x.quadraticCurveTo(0, -80, 24, -30); x.fill(); x.strokeStyle = INK; x.lineWidth = 4; x.stroke(); x.restore() }

// ── small pixel things ─────────────────────────────────────────────────────────────────────────────────────
export function crawdad(x, cx, cy, s = 1) {
  x.save(); x.translate(cx, cy); x.scale(s * 100, s * 100)
  x.fillStyle = INK; x.fillRect(-26, -10, 52, 20); x.fillStyle = '#d8402a'; x.fillRect(-22, -7, 44, 14)
  x.fillStyle = '#d8402a'; x.fillRect(22, -16, 14, 10); x.fillRect(22, 6, 14, 10); x.fillRect(-36, -5, 14, 10)
  x.fillStyle = INK; x.fillRect(10, -5, 4, 4)
  x.restore()
}
export function bat(x, cx, cy, t, s = 1) {
  const f = Math.sin(t * 14 + cx * 0.05) > 0 ? 1 : -1
  x.fillStyle = '#120c24'; x.fillRect(cx - 6 * s, cy - 4 * s, 12 * s, 8 * s)
  x.beginPath(); x.moveTo(cx - 6 * s, cy); x.lineTo(cx - 22 * s, cy - 10 * s * f); x.lineTo(cx - 12 * s, cy + 4 * s); x.fill()
  x.beginPath(); x.moveTo(cx + 6 * s, cy); x.lineTo(cx + 22 * s, cy - 10 * s * f); x.lineTo(cx + 12 * s, cy + 4 * s); x.fill()
}
export function dog(x, cx, base, t, col = '#c98e5a') {
  const wag = Math.sin(t * 10) * 10
  box(x, cx - 60, base - 70, 120, 50, col, 5); box(x, cx + 50, base - 110, 56, 50, col, 5)
  box(x, cx - 50, base - 26, 16, 26, col, 3); box(x, cx + 30, base - 26, 16, 26, col, 3)
  x.strokeStyle = INK; x.lineWidth = 8; x.beginPath(); x.moveTo(cx - 60, base - 60); x.lineTo(cx - 90, base - 90 + wag); x.stroke()
  x.fillStyle = INK; x.fillRect(cx + 84, base - 96, 8, 8); x.fillRect(cx + 100, base - 82, 10, 8)
  x.fillStyle = BRAKE; x.beginPath(); x.moveTo(cx + 44, base - 64); x.lineTo(cx + 104, base - 64); x.lineTo(cx + 74, base - 34); x.fill()   // the bandana
}
export function duck(x, cx, cy, t) {
  const b = Math.sin(t * 3) * 4
  box(x, cx - 34, cy - 16 + b, 68, 32, '#f4efe4', 4); box(x, cx + 18, cy - 46 + b, 30, 30, '#2f8a4a', 4); x.fillStyle = '#f2a03c'; x.fillRect(cx + 48, cy - 34 + b, 18, 8); x.fillStyle = INK; x.fillRect(cx + 34, cy - 38 + b, 5, 5)
}
export function gull(x, cx, cy, t) { const f = Math.sin(t * 8) * 10; x.strokeStyle = BONE; x.lineWidth = 7; x.beginPath(); x.moveTo(cx - 30, cy - f); x.quadraticCurveTo(cx - 12, cy - 14, cx, cy); x.quadraticCurveTo(cx + 12, cy - 14, cx + 30, cy - f); x.stroke() }
export function mosquito(x, cx, cy, t) {
  const jx = cx + Math.sin(t * 7) * 30, jy = cy + Math.cos(t * 9) * 20
  x.fillStyle = INK; x.fillRect(jx - 10, jy - 4, 20, 8); x.fillRect(jx + 8, jy - 2, 18, 3)
  x.fillStyle = 'rgba(239,230,214,0.7)'; const w = Math.sin(t * 40) > 0 ? 14 : 6; x.fillRect(jx - 8, jy - 4 - w, 8, w); x.fillRect(jx + 2, jy - 4 - w, 8, w)
}
export function stringLights(x, y, t, cols = [GOLD, PINK, MINT, SKYB]) {
  x.strokeStyle = INK; x.lineWidth = 4; x.beginPath(); x.moveTo(0, y); for (let k = 0; k <= 6; k++) x.quadraticCurveTo(k * 180 + 90, y + 60, k * 180 + 180, y); x.stroke()
  for (let k = 0; k < 24; k++) { const px = 22 + k * 45, py = y + 30 * Math.sin(Math.PI * ((px % 180) / 180)); const on = 0.6 + 0.4 * Math.sin(t * 3 + k); x.fillStyle = cols[k % cols.length]; x.globalAlpha = on; x.beginPath(); x.arc(px, py + 10, 9, 0, Math.PI * 2); x.fill(); x.globalAlpha = 1 }
}
export function thermo(x, cx, cy, temp, k = 1, col = BRAKE) {   // a big thermometer readout card (a joke number)
  if (k <= 0) return
  x.save(); x.translate(cx, cy); x.scale(k, k); box(x, -150, -70, 300, 140, '#120c24', 7); txt(x, temp, 0, 4, { size: 92, col, font: MONO, weight: 700 }); x.restore()
}
export function bigText(x, lines, y, k = 1, { col = GOLD, size = 110, col2 = BONE } = {}) {
  if (k <= 0) return
  x.save(); x.globalAlpha = clamp(k); lines.forEach((s, i) => txt(x, s, 540, y + i * size * 1.05, { size: i ? size * 0.7 : size, col: i ? col2 : col })); x.restore()
}

// ── sets ───────────────────────────────────────────────────────────────────────────────────────────────────
export const night = (x, t, ground = '#221b38') => { skyline(x, G, t, { alpha: 0.85 }); outside(x, { ground }) }
export function skyFill(x, top, bot, y0 = 0, y1 = G) { const g = x.createLinearGradient(0, y0, 0, y1); g.addColorStop(0, top); g.addColorStop(1, bot); x.fillStyle = g; x.fillRect(0, y0, 1080, y1 - y0) }
export function daySky(x, t) { skyFill(x, '#6fb6ff', '#d8f0ff'); for (let k = 0; k < 4; k++) { const cx = ((k * 330 + t * 18) % 1400) - 160, cy = 360 + (k % 2) * 150; x.fillStyle = 'rgba(255,255,255,0.85)'; x.fillRect(cx, cy, 200, 40); x.fillRect(cx + 40, cy - 30, 120, 40) } }
export function sunsetSky(x) { skyFill(x, '#3a2a6a', '#ff9a5a', 0, G) }
export function bigWindow(x, cx, cy, w, h, t, inside) {
  box(x, cx - w / 2, cy - h / 2, w, h, '#0e0a26', 10)
  x.save(); x.beginPath(); x.rect(cx - w / 2, cy - h / 2, w, h); x.clip(); if (inside) inside(cx, cy, w, h); else { x.save(); x.translate(cx - 540 * 0.6, cy + h / 2 - G * 0.6); x.scale(0.6, 0.6); skyline(x, G, t); x.restore() } x.restore()
  x.fillStyle = INK; x.fillRect(cx - 5, cy - h / 2, 10, h); x.fillRect(cx - w / 2, cy - 5, w, 10)
}
export function whiteboard(x, cx, cy, w, h, inside) { box(x, cx - w / 2, cy - h / 2, w, h, '#f7f4ee', 10); x.fillStyle = '#8f96a0'; x.fillRect(cx - w / 2, cy + h / 2 + 10, w, 14); x.save(); x.beginPath(); x.rect(cx - w / 2, cy - h / 2, w, h); x.clip(); inside?.(cx, cy, w, h); x.restore() }
export function office(x, t, wall = '#2f3d5a') { room(x, { wall, floor: '#3a3242', trim: '#1b1236' }); bigWindow(x, 880, 520, 300, 420, t) }
export function tunnel(x, t) {
  x.fillStyle = '#d9d2c2'; x.fillRect(0, 0, 1080, 1920)
  for (let r = 0; r < 14; r++) for (let c = 0; c < 10; c++) { x.fillStyle = (r + c) % 2 ? '#cfc6b2' : '#e3dccd'; x.fillRect(c * 108, 300 + r * 80, 106, 78) }
  x.fillStyle = '#2b2a36'; x.beginPath(); x.moveTo(300, G); x.lineTo(430, 520); x.lineTo(650, 520); x.lineTo(780, G); x.fill()   // the corridor going away
  x.fillStyle = '#f4efe4'; x.fillRect(470, 540, 140, 18)
  for (let k = 0; k < 5; k++) { const y = 300 + k * 50; x.fillStyle = `rgba(255,250,220,${(0.6 + 0.4 * Math.sin(t * 2 + k)).toFixed(2)})`; x.fillRect(160 + k * 40, y, 760 - k * 80, 10) }
  x.fillStyle = '#6d6a7a'; x.fillRect(0, G, 1080, 1920 - G); x.fillStyle = INK; x.fillRect(0, G - 6, 1080, 10)
  for (let k = 0; k < 3; k++) { x.fillStyle = 'rgba(143,227,255,0.4)'; x.fillRect(120 + k * 360, 300, 120, 16) }   // AC vents
}
export function bedroom(x, t, { wall = '#4a2a5a', floor = '#5a3a2a', glow = null } = {}) {
  room(x, { wall, floor, trim: '#2a1636' }); bigWindow(x, 210, 560, 300, 380, t, glow ? (cx, cy, w, h) => { skyFill(x, '#1a1040', glow, cy - h / 2, cy + h / 2); x.save(); x.translate(cx - 540 * 0.55, cy + h / 2 - G * 0.55); x.scale(0.55, 0.55); skyline(x, G, t); x.restore() } : null)
}
export function mirror(x, cx, cy, w, h, t, bulbs = false) {
  box(x, cx - w / 2, cy - h / 2, w, h, '#bfe6ff', 12); x.fillStyle = 'rgba(255,255,255,0.35)'; x.beginPath(); x.moveTo(cx - w / 2 + 30, cy + h / 2 - 40); x.lineTo(cx - w / 2 + 90, cy - h / 2 + 30); x.lineTo(cx - w / 2 + 130, cy - h / 2 + 30); x.lineTo(cx - w / 2 + 70, cy + h / 2 - 40); x.fill()
  if (bulbs) for (let k = 0; k < 6; k++) for (const sx of [-1, 1]) { x.fillStyle = INK; x.beginPath(); x.arc(cx + sx * (w / 2 + 6), cy - h / 2 + 40 + k * (h - 80) / 5, 22, 0, Math.PI * 2); x.fill(); x.fillStyle = `rgba(255,236,170,${(0.75 + 0.25 * Math.sin(t * 3 + k)).toFixed(2)})`; x.beginPath(); x.arc(cx + sx * (w / 2 + 6), cy - h / 2 + 40 + k * (h - 80) / 5, 16, 0, Math.PI * 2); x.fill() }
}
export function rack(x, l, y, cols) { x.fillStyle = INK; x.fillRect(l, y, cols.length * 70 + 40, 10); cols.forEach((c, i) => { box(x, l + 30 + i * 70, y + 20, 50, 130, c, 4); x.fillStyle = INK; x.fillRect(l + 52 + i * 70, y + 4, 6, 18) }) }
export function bigPhone(x, cx, cy, w, h, head, msgs, lt, { every = 0.45, start = 0.1 } = {}) {
  box(x, cx - w / 2, cy - h / 2, w, h, INK, 10); x.fillStyle = '#f4efe4'; x.fillRect(cx - w / 2 + 16, cy - h / 2 + 16, w - 32, h - 32)
  x.fillStyle = '#2b2550'; x.fillRect(cx - w / 2 + 16, cy - h / 2 + 16, w - 32, 80); txt(x, head, cx, cy - h / 2 + 56, { size: 38, col: BONE })
  const shown = msgs.filter((m, i) => lt >= start + i * every)
  const vis = shown.slice(-6)
  vis.forEach(([side, s, col], i) => {
    const y = cy - h / 2 + 150 + i * 96; x.font = `800 34px ${INTER}`; const tw = Math.min(w - 120, x.measureText(s).width + 50)
    const l = side > 0 ? cx + w / 2 - 40 - tw : cx - w / 2 + 40
    box(x, l, y - 34, tw, 68, col || (side > 0 ? '#5ec8ff' : '#ffffff'), 4); txt(x, s, l + tw / 2, y, { size: 34 })
  })
}
export function bellaire(x, t) {
  skyFill(x, '#120a2a', '#2a1a4a')
  const shops = [['PHO', '#ff5a6e'], ['BOBA', '#7dffb0'], ['HOT POT', '#ffd36b'], ['BAKERY', '#8fe3ff'], ['KARAOKE', '#ff8fb1']]
  shops.forEach(([w, c], i) => {
    const l = -40 + i * 240; box(x, l, 520 + (i % 2) * 60, 230, G - 520 - (i % 2) * 60, i % 2 ? '#3a2a5a' : '#2a2050', 6)
    x.save(); x.shadowColor = c; x.shadowBlur = 24 + 10 * Math.sin(t * 4 + i); txt(x, w, l + 115, 600 + (i % 2) * 60, { size: w.length > 5 ? 34 : 44, col: c }); x.restore()
    for (let k = 0; k < 2; k++) { x.fillStyle = `rgba(255,220,140,${(0.4 + 0.3 * Math.sin(t + k + i)).toFixed(2)})`; x.fillRect(l + 30 + k * 100, 760, 70, 110) }
  })
  outside(x, { ground: '#2a2240' }); streetSign(x, 880, 1000, 'BELLAIRE BLVD', { pole: false, w: 380 })
}
export function bayou(x, t, { sunset = false } = {}) {
  if (sunset) sunsetSky(x); else daySky(x, t)
  skyline(x, 980, t, { alpha: sunset ? 0.9 : 0.7, col: sunset ? '#3a2350' : '#5a6a9a' })
  x.fillStyle = '#3f7a46'; x.fillRect(0, 960, 1080, 120)
  x.fillStyle = sunset ? '#6a4a6a' : '#5a7a5a'; x.fillRect(0, 1060, 1080, 150)
  for (let k = 0; k < 12; k++) { x.fillStyle = 'rgba(255,255,255,0.25)'; x.fillRect(((k * 97 + t * 40) % 1180) - 100, 1080 + (k % 4) * 30, 70, 5) }
  x.fillStyle = '#c9b48a'; x.fillRect(0, 1210, 1080, G - 1210); x.fillStyle = '#3f7a46'; x.fillRect(0, G, 1080, 1920 - G); x.fillStyle = INK; x.fillRect(0, G - 6, 1080, 8)
  for (const tx of [80, 1000]) { box(x, tx - 14, 760, 28, 220, '#6b3b1f', 4); x.fillStyle = INK; x.beginPath(); x.arc(tx, 740, 110, 0, Math.PI * 2); x.fill(); x.fillStyle = '#2f6a3a'; x.beginPath(); x.arc(tx, 740, 100, 0, Math.PI * 2); x.fill() }
}
export function batBridge(x, t, lt) {
  sunsetSky(x); x.fillStyle = '#ffb35a'; x.beginPath(); x.arc(780, 820, 90, 0, Math.PI * 2); x.fill()
  skyline(x, 960, t, { alpha: 0.9, col: '#3a2350' })
  x.fillStyle = '#6a4a6a'; x.fillRect(0, 960, 1080, 260); for (let k = 0; k < 10; k++) { x.fillStyle = 'rgba(255,200,150,0.35)'; x.fillRect(((k * 131 + t * 30) % 1180) - 100, 1000 + (k % 4) * 40, 80, 5) }
  box(x, -20, 860, 1120, 60, '#5a5060', 6); for (let k = 0; k < 6; k++) box(x, 60 + k * 190, 920, 40, 300, '#5a5060', 5)   // the bridge
  for (let k = 0; k < 40; k++) { const ph = ((lt * 0.35 + k * 0.137) % 1), bx = 100 + (k * 223) % 900 + Math.sin(t * 2 + k) * 40, by = 900 - ph * 600; if (ph > 0.02) bat(x, bx, by, t + k, 1.2) }
  x.fillStyle = '#c9b48a'; x.fillRect(0, 1220, 1080, G - 1220); x.fillStyle = '#3f6a46'; x.fillRect(0, G, 1080, 1920 - G); x.fillStyle = INK; x.fillRect(0, G - 6, 1080, 8)
}
export function kitchen(x, t, { wall = '#f0d9a8' } = {}) {
  x.fillStyle = wall; x.fillRect(0, 0, 1080, G)
  for (let r = 0; r < 6; r++) for (let c = 0; c < 10; c++) { x.fillStyle = (r + c) % 2 ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.04)'; x.fillRect(c * 108, 700 + r * 70, 106, 68) }
  box(x, 80, 360, 300, 200, '#c98e5a', 6); box(x, 700, 360, 300, 200, '#c98e5a', 6)
  box(x, -10, 1160, 1100, 60, '#8a5530', 6); x.fillStyle = '#6b3b1f'; x.fillRect(0, 1220, 1080, 1920 - 1220)
}
export function lawn(x, t, { dusk = true } = {}) {
  if (dusk) skyFill(x, '#1a1040', '#ff8f7a', 0, 1000); else daySky(x, t)
  skyline(x, 1000, t, { alpha: 0.9 }); x.fillStyle = '#3f8a46'; x.fillRect(0, 990, 1080, 1920 - 990)
  for (let k = 0; k < 60; k++) { x.fillStyle = 'rgba(0,0,0,0.12)'; x.fillRect((k * 151) % 1080, 1020 + (k * 67) % 800, 10, 18) }
  stringLights(x, 760, t)
}
export function porch(x, t) {
  daySky(x, t)
  x.fillStyle = '#9ac4d8'; x.fillRect(0, 380, 1080, G - 380)   // the bungalow siding
  for (let k = 0; k < 14; k++) { x.fillStyle = 'rgba(0,0,0,0.08)'; x.fillRect(0, 400 + k * 70, 1080, 6) }
  box(x, 640, 520, 260, 330, BONE, 6); x.fillStyle = '#bfe6ff'; x.fillRect(660, 540, 220, 290)
  box(x, 120, 520, 220, 560, '#2b5fb0', 6); x.fillStyle = GOLD; x.beginPath(); x.arc(310, 820, 10, 0, Math.PI * 2); x.fill()
  box(x, -10, 360, 1100, 40, BONE, 6)
  for (const px of [40, 1010]) box(x, px - 20, 400, 40, G - 400, BONE, 5)
  x.fillStyle = '#b07a4a'; x.fillRect(0, G - 30, 1080, 1920 - G + 30); x.fillStyle = INK; x.fillRect(0, G - 36, 1080, 8)
  for (let k = 0; k < 12; k++) { x.fillStyle = BONE; x.fillRect(40 + k * 90, 1180, 16, 180) } x.fillStyle = BONE; x.fillRect(0, 1170, 1080, 18)   // the porch rail
  x.strokeStyle = INK; x.lineWidth = 4; x.beginPath(); x.moveTo(960, 400); x.lineTo(960, 470); x.stroke(); box(x, 920, 470, 80, 60, '#c9783a', 4); x.fillStyle = '#3f8a46'; x.beginPath(); x.arc(960, 470, 50, Math.PI, 0); x.fill()   // a hanging fern
}
export function pond(x, t) {
  daySky(x, t); x.fillStyle = '#2f6a3a'; x.fillRect(0, 840, 1080, 160)
  for (let k = 0; k < 7; k++) { x.fillStyle = INK; x.beginPath(); x.arc(70 + k * 160, 850, 90, Math.PI, 0); x.fill(); x.fillStyle = '#3f8a46'; x.beginPath(); x.arc(70 + k * 160, 852, 82, Math.PI, 0); x.fill() }
  x.fillStyle = '#4a8aa8'; x.fillRect(0, 1000, 1080, 1920 - 1000)
  for (let k = 0; k < 24; k++) { x.fillStyle = 'rgba(255,255,255,0.3)'; x.fillRect(((k * 113 + t * 30) % 1180) - 100, 1040 + (k * 71) % 700, 80, 6) }
}
export function paddleBoat(x, cx, cy, t, col = '#ff8f3c', spin = 0) {
  x.save(); x.translate(cx, cy + Math.sin(t * 2) * 6); x.scale(Math.cos(spin) || 0.001, 1)
  box(x, -230, -20, 460, 90, col, 7); box(x, -200, -60, 400, 46, BONE, 5)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 30, 60, 0, Math.PI * 2); x.fill(); for (let k = 0; k < 6; k++) { const a = t * 4 + k * Math.PI / 3; x.fillStyle = '#d8dce4'; x.fillRect(Math.cos(a) * 40 - 8, 30 + Math.sin(a) * 40 - 8, 16, 16) }
  x.restore()
}
export function beach(x, t) {
  daySky(x, t); x.fillStyle = '#ffd36b'; x.beginPath(); x.arc(860, 420, 70, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#8a7a52'; x.fillRect(0, 880, 1080, 340)   // the beloved brown water
  for (let k = 0; k < 5; k++) { x.fillStyle = 'rgba(255,255,255,0.45)'; const y = 920 + k * 64, o = Math.sin(t * 1.5 + k) * 40; for (let c = -1; c < 7; c++) x.fillRect(c * 180 + o, y, 120, 8) }
  x.fillStyle = '#e8d3a0'; x.fillRect(0, 1210, 1080, 1920 - 1210); x.fillStyle = 'rgba(0,0,0,0.06)'; for (let k = 0; k < 40; k++) x.fillRect((k * 173) % 1080, 1230 + (k * 61) % 600, 12, 6)
  gull(x, 240 + Math.sin(t * 0.7) * 120, 520, t); gull(x, 640 + Math.cos(t * 0.6) * 90, 460, t + 1)
}
export function boilTable(x, t, lt, n = 40) {
  lawn(x, t, { dusk: true })
  box(x, 90, 1120, 900, 50, '#c9a67a', 6); for (const lx of [140, 900]) box(x, lx, 1170, 40, 260, '#8a6a4a', 5)
  x.fillStyle = '#e8e2d2'; x.fillRect(110, 1124, 860, 40); for (let k = 0; k < 8; k++) { x.fillStyle = 'rgba(27,18,54,0.25)'; x.fillRect(130 + k * 105, 1132, 70, 6) }   // newspaper
  for (let k = 0; k < n; k++) { const px = 220 + (k * 97) % 640, py = 1110 - ((k * 37) % 70); crawdad(x, px, py, 0.008 + 0.002 * (k % 3)) }
  for (let k = 0; k < 4; k++) box(x, 300 + k * 170, 1090, 50, 26, '#f2c75c', 3)    // corn
}
export function court(x, t) {
  daySky(x, t); x.fillStyle = '#2f6a9a'; x.fillRect(0, 860, 1080, 1920 - 860); x.fillStyle = '#3f8a5a'; x.fillRect(0, 860, 1080, 60)
  x.strokeStyle = BONE; x.lineWidth = 8; x.strokeRect(80, 960, 920, 700); x.beginPath(); x.moveTo(540, 960); x.lineTo(540, 1660); x.stroke()
  box(x, 60, 1040, 960, 16, BONE, 4); for (let k = 0; k < 24; k++) { x.fillStyle = 'rgba(27,18,54,0.6)'; x.fillRect(70 + k * 40, 940, 4, 100) }   // the net
}
export function foodTruck(x, cx, base, word, col = '#ff8f3c', t = 0) {
  box(x, cx - 220, base - 300, 440, 240, col, 7); box(x, cx + 140, base - 260, 120, 200, col, 6)
  box(x, cx - 170, base - 260, 260, 110, '#1c1240', 5); txt(x, word, cx - 40, base - 205, { size: 40, col: GOLD })
  for (const wx of [-140, 160]) { x.fillStyle = INK; x.beginPath(); x.arc(cx + wx, base - 50, 44, 0, Math.PI * 2); x.fill(); x.fillStyle = '#8f96a0'; x.beginPath(); x.arc(cx + wx, base - 50, 18, 0, Math.PI * 2); x.fill() }
}
export function karaoke(x, t, lt, words = 'la la la') {
  x.fillStyle = '#1a0f30'; x.fillRect(0, 0, 1080, G); for (let k = 0; k < 9; k++) { x.fillStyle = `hsla(${(k * 40 + t * 60) % 360},80%,60%,0.12)`; x.beginPath(); x.moveTo(540, 300); x.lineTo(k * 135 - 100, G); x.lineTo(k * 135 + 20, G); x.fill() }
  box(x, 240, 420, 600, 300, '#0b0820', 8); const sw = 520 * clamp((lt % 3) / 3); x.font = `800 48px ${INTER}`; txt(x, words, 540, 570, { size: 48, col: BONE }); x.save(); x.beginPath(); x.rect(280, 520, sw, 100); x.clip(); txt(x, words, 540, 570, { size: 48, col: PINK }); x.restore()
  outside(x, { ground: '#2a1a3a' })
}
export function cozy(x, t, { wall = '#6a3a4a' } = {}) {
  room(x, { wall, floor: '#7a5a3a', trim: '#3a1a2a' }); bigWindow(x, 820, 560, 300, 360, t, (cx, cy, w, h) => { skyFill(x, '#6fb6ff', '#ffe2a8', cy - h / 2, cy + h / 2); heatSun(x, cx, cy - 40, t, 60); x.fillStyle = 'rgba(255,200,120,0.25)'; x.fillRect(cx - w / 2, cy - h / 2, w, h) })
  x.strokeStyle = INK; x.lineWidth = 4; x.beginPath(); x.moveTo(60, 420); x.lineTo(600, 420); x.stroke()
  ;[['#c0304a'], [GOLD], ['#2b2a36'], [SKYB]].forEach(([c], i) => box(x, 90 + i * 130, 430, 100, 120, c, 4))   // sweaters on a line
}
export function yarn(x, cx, cy, col, t) { x.fillStyle = INK; x.beginPath(); x.arc(cx, cy, 44, 0, Math.PI * 2); x.fill(); x.fillStyle = col; x.beginPath(); x.arc(cx, cy, 38, 0, Math.PI * 2); x.fill(); x.strokeStyle = 'rgba(255,255,255,0.4)'; x.lineWidth = 4; for (let k = -1; k <= 1; k++) { x.beginPath(); x.arc(cx + k * 10, cy, 28, 0.3 + t * 0.2, 2.2 + t * 0.2); x.stroke() } }
export function djTable(x, t, lt, crates) {
  x.fillStyle = '#140c2a'; x.fillRect(0, 0, 1080, G)
  for (let k = 0; k < 18; k++) { const h = 80 + 220 * Math.abs(Math.sin(t * 5 + k * 0.7)); x.fillStyle = [PINK, GOLD, MINT, SKYB][k % 4]; x.globalAlpha = 0.5; x.fillRect(40 + k * 56, 900 - h, 40, h); x.globalAlpha = 1 }
  skyline(x, 900, t, { alpha: 0.35 })
  box(x, 80, 1100, 920, 70, '#2a2638', 6); for (const dx of [300, 780]) { x.fillStyle = INK; x.beginPath(); x.arc(dx, 1080, 70, 0, Math.PI * 2); x.fill(); x.fillStyle = '#3a3448'; x.beginPath(); x.arc(dx, 1080, 60, 0, Math.PI * 2); x.fill(); x.fillStyle = GOLD; x.save(); x.translate(dx, 1080); x.rotate(t * 3); x.fillRect(-4, -54, 8, 30); x.restore() }
  outside(x, { ground: '#221838' })
  ;(crates || []).forEach((w, i) => { const cx = 140 + i * 200; box(x, cx - 85, 1440, 170, 110, '#8a5530', 6); txt(x, w, cx, 1495, { size: w.length > 6 ? 26 : 32, col: BONE, font: MONO, weight: 700 }) })
}
export function kingCake(x, cx, cy, s = 1, cut = 0) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 230, 110, 0, 0, Math.PI * 2); x.fill()
  const segs = ['#8a3ac9', '#2fa84a', GOLD]
  for (let k = 0; k < 12; k++) { if (k < cut) continue; x.fillStyle = segs[k % 3]; x.beginPath(); x.moveTo(0, 0); x.ellipse(0, 0, 222, 102, 0, k / 12 * Math.PI * 2, (k + 1) / 12 * Math.PI * 2); x.fill() }
  x.fillStyle = '#d9a55a'; x.beginPath(); x.ellipse(0, 0, 110, 46, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = '#1c1240'; x.beginPath(); x.ellipse(0, 0, 90, 34, 0, 0, Math.PI * 2); x.fill()
  x.restore()
}
export function tinyBaby(x, cx, cy, s = 1) { x.save(); x.translate(cx, cy); x.scale(s, s); x.fillStyle = INK; x.fillRect(-14, -30, 28, 60); x.fillStyle = '#ffd1e0'; x.fillRect(-10, -26, 20, 20); x.fillRect(-12, -2, 24, 28); x.restore() }
export function quietRoom(x, t) {
  x.fillStyle = '#1e1a24'; x.fillRect(0, 0, 1080, G); for (let k = 0; k < 3; k++) { box(x, 80 + k * 330, 420, 260, 560, ['#2a1a2e', '#1f1a30', '#2a2030'][k], 6) }
  x.fillStyle = 'rgba(255,240,200,0.07)'; x.beginPath(); x.moveTo(460, 0); x.lineTo(620, 0); x.lineTo(800, G); x.lineTo(280, G); x.fill()
  outside(x, { ground: '#2a2430' }); box(x, 180, 1300, 720, 40, '#6b4a2e', 5)
}
export function alley(x, t) { mural(x, t); x.fillStyle = 'rgba(14,8,32,0.55)'; x.fillRect(0, 0, 1080, 1920); outside(x, { ground: '#2a2234' }) }
export function corkboard(x, t, inside) {
  room(x, { wall: '#3a3a52', floor: '#3a2a22', trim: '#1b1236' })
  box(x, 70, 360, 940, 760, '#c99a62', 10); for (let k = 0; k < 120; k++) { x.fillStyle = 'rgba(80,50,20,0.25)'; x.fillRect(80 + (k * 89) % 920, 370 + (k * 53) % 740, 6, 6) }
  x.save(); x.beginPath(); x.rect(70, 360, 940, 760); x.clip(); inside?.(540, 740); x.restore()
}
export function pin(x, px, py, col = BRAKE) { x.fillStyle = INK; x.beginPath(); x.arc(px, py, 16, 0, Math.PI * 2); x.fill(); x.fillStyle = col; x.beginPath(); x.arc(px, py, 11, 0, Math.PI * 2); x.fill() }
export function calWall(x, t, lt, n, from) {   // a wall calendar with pages flying off (Aries)
  room(x, { wall: '#5a2a2a', floor: '#3a2a22', trim: '#2a1010' })
  for (let k = 0; k < 10; k++) { const ph = (lt * 1.4 + k * 0.1) % 1; x.save(); x.translate(540 + ph * 500 * (k % 2 ? 1 : -1), 760 - ph * 700 + Math.sin(k) * 40); x.rotate(ph * 4 + k); x.globalAlpha = 1 - ph; box(x, -60, -70, 120, 140, BONE, 4); x.restore() }
}

// ── the countdown episode builder ───────────────────────────────────────────────────────────────────────────
/** n: days left. spec: { lead, hook, hookSet(x,t,lt,P), hookCast, hookMood, hookFront, scenes: [...], stamp: { set, line, cast }, line, stars, cues }
 *  Every episode: hook scene (calendar tears from n+1 to n at frame 0), the story beats, a stamp beat ("n DAYS"), the party ticket. */
export function countdown(n, spec) {
  const calX = spec.calX ?? 540, calY = spec.calY ?? 820
  const hook = {
    dur: spec.hookDur ?? 2.8,
    set: (x, t, lt, P) => { spec.hookSet(x, t, lt, P) },
    back: spec.hookBack,
    cast: spec.hookCast, mood: spec.hookMood, look: spec.hookLook,
    hops: spec.hookHops || waveHops(Object.keys(spec.hookCast)),
    front: (x, t, lt, P) => { spec.hookFront?.(x, t, lt, P); dayCal(x, calX, calY, spec.calS ?? 0.85, n === 0 ? 'TODAY' : n, { prev: n + 1, flip: prog(lt, 0.15, 1.0) }) },
    lines: spec.hookLines || [],
  }
  const st = spec.stamp
  const stamp = {
    dur: st.dur ?? 3.6, set: st.set,
    cast: st.cast, mood: st.mood, look: st.look, hops: st.hops,
    front: (x, t, lt, P) => {
      st.front?.(x, t, lt, P)
      const k = Kp(lt, 0.05, 0.4); dayCal(x, 540, 700, 1.05 * k, n, { foot: n === 1 ? 'DAY. JUST 1.' : 'DAYS TO GO' })
      if (lt > 0.4) sparkles(x, t, 540, 700, t - lt + 0.4, 12, 260, 4)
    },
    lines: st.lines,
  }
  return {
    hook: spec.hook, badge: BADGE, endLen: spec.endLen ?? 6.2,
    cues: [...STING, ['bell', 0.95, 1318.51, 0.012, 1.2, 0], ...(spec.cues || [])],
    overlay: (x, t) => { if (t < spec._end) dayChip(x, t, n) },
    end: (x, t, lt) => partyCard(x, t, lt, { line: spec.line, stars: spec.stars }),
    scenes: [hook, ...spec.scenes, stamp],
  }
}
/** finish a spec: compute the story end (for the chip) */
export function ep(n, spec) { const total = (spec.hookDur ?? 2.8) + spec.scenes.reduce((a, s) => a + s.dur, 0) + (spec.stamp.dur ?? 3.6); spec._end = total + 0.2; return countdown(n, spec) }
