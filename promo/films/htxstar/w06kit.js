// Houston Star Talk · worker w06 (style: pov). "POV: you're a Houston [sign]": the day, the habits and the dating
// life through that sign's eyes. The sign's star IS the viewer ("YOU"), a time/place chip sets each beat, a
// second-person narration strip talks to the viewer, and every video ends on the Jan 9 party ticket (kit.js).
// Built on promo/films/starrace/ep.js. Own props only (never edits ep.js / kit.js). Pure functions of t.
import { clamp, prog, ease } from '../../src/lib.js'
import { FLOOR, box, txt, room, outside, table, heart } from '../starrace/ep.js'
import { label, sparkles, pop01, notes, GOLD, BONE, PINK, INK, INTER, MONO, SERIF, MINT, SKYB, LAV, SIGN_IDS } from '../signs3kit.js'
import { streetSign, shield, skyline, car, freeway, heatSun, sweat, shimmer, partyCard, taco, overheadSign, puffer, soupPot, kolache, klobasnek, mural, coffeeShop, houses, cones, BRAKE, HGREEN } from './kit.js'

export const Y = 1255
export const BADGE = { text: 'HOU BETA · JAN 9', x: 230, y: 150 }
export const STING = [['glitter', 0.0, 0.7], ['pop', 0.02, 880, 0.03, 0], ['whoosh', 0.05, 0.4, 0.02]]
export const Kp = (lt, a, d = 0.3) => clamp(ease.outBack(prog(lt, a, a + d)))
export const NAME = id => id[0].toUpperCase() + id.slice(1)
const TAU = Math.PI * 2

// ── skies and grounds ───────────────────────────────────────────────────────────────────────────────────────
export function sky(x, top, bot, y1 = FLOOR + 60) { const g = x.createLinearGradient(0, 0, 0, y1); g.addColorStop(0, top); g.addColorStop(1, bot); x.fillStyle = g; x.fillRect(0, 0, 1080, y1) }
export const SKIES = {
  morning: ['#7ec8f0', '#ffe2b0'], noon: ['#4fa8e8', '#bfe6ff'], sunset: ['#3a2a6a', '#ff9a6a'], dusk: ['#1c1846', '#c0608a'],
  haze: ['#9ab8c8', '#f4e6c0'], gold: ['#f09a4a', '#ffe0a0'], night: null,
}
function ground(x, col = '#3a6a3a', y = FLOOR + 60) { x.fillStyle = col; x.fillRect(0, y, 1080, 1920 - y); x.fillStyle = INK; x.fillRect(0, y - 6, 1080, 10) }
export function tree(x, cx, base, s = 1, leaf = '#3f8a4a') {   // a live oak: wide, low canopy
  box(x, cx - 16 * s, base - 170 * s, 32 * s, 170 * s, '#6b4a2c', 5)
  for (const [dx, dy, r] of [[-70, -190, 70], [0, -230, 85], [70, -190, 70], [-30, -160, 60], [40, -160, 60]]) { x.fillStyle = INK; x.beginPath(); x.arc(cx + dx * s, base + dy * s, r * s + 6, 0, TAU); x.fill() }
  for (const [dx, dy, r] of [[-70, -190, 70], [0, -230, 85], [70, -190, 70], [-30, -160, 60], [40, -160, 60]]) { x.fillStyle = leaf; x.beginPath(); x.arc(cx + dx * s, base + dy * s, r * s, 0, TAU); x.fill() }
}
export function palm(x, cx, base, t, s = 1) {
  box(x, cx - 10 * s, base - 330 * s, 20 * s, 330 * s, '#8a6a4a', 4)
  for (let k = 0; k < 6; k++) { const a = -Math.PI / 2 + (k - 2.5) * 0.5 + Math.sin(t * 1.5 + k) * 0.05; x.strokeStyle = '#2f7a3a'; x.lineWidth = 16 * s; x.beginPath(); x.moveTo(cx, base - 330 * s); x.quadraticCurveTo(cx + Math.cos(a) * 90 * s, base - 330 * s + Math.sin(a) * 90 * s - 30 * s, cx + Math.cos(a) * 160 * s, base - 330 * s + Math.sin(a) * 60 * s + 60 * s); x.stroke() }
}
export function sun(x, cx, cy, r = 60, col = '#ffd36b') { x.fillStyle = INK; x.beginPath(); x.arc(cx, cy, r + 6, 0, TAU); x.fill(); x.fillStyle = col; x.beginPath(); x.arc(cx, cy, r, 0, TAU); x.fill() }
export function cloud(x, cx, cy, t, s = 1) { const dx = (t * 20) % 1300; const X = ((cx + dx) % 1300) - 110; x.fillStyle = 'rgba(255,255,255,0.85)'; for (const [a, b, r] of [[0, 0, 40], [40, -14, 50], [90, 0, 40]]) { x.beginPath(); x.arc(X + a * s, cy + b * s, r * s, 0, TAU); x.fill() } }
export function bungalow(x, cx, base, col = '#7ab0c8') {   // a Heights bungalow with a porch
  box(x, cx - 260, base - 300, 520, 300, col, 7)
  x.fillStyle = INK; x.beginPath(); x.moveTo(cx - 300, base - 296); x.lineTo(cx, base - 470); x.lineTo(cx + 300, base - 296); x.fill(); x.fillStyle = '#5a3a5a'; x.beginPath(); x.moveTo(cx - 284, base - 300); x.lineTo(cx, base - 456); x.lineTo(cx + 284, base - 300); x.fill()
  box(x, cx - 280, base - 150, 560, 22, BONE, 5); for (let k = 0; k < 5; k++) box(x, cx - 260 + k * 128, base - 128, 16, 128, BONE, 3)
  box(x, cx - 200, base - 250, 110, 90, '#ffe7a0', 5); box(x, cx + 90, base - 250, 110, 90, '#ffe7a0', 5); box(x, cx - 40, base - 260, 80, 130, '#6b3b1f', 5)
}
export function dog(x, cx, base, t, col = '#c98e4a', band = BRAKE) {   // a dog in a bandana
  const wag = Math.sin(t * 14) * 0.5
  box(x, cx - 60, base - 70, 120, 50, col, 5); box(x, cx + 40, base - 110, 56, 50, col, 5); box(x, cx + 78, base - 96, 10, 10, INK, 0)
  x.fillStyle = band; x.beginPath(); x.moveTo(cx + 38, base - 64); x.lineTo(cx + 96, base - 64); x.lineTo(cx + 67, base - 34); x.fill()
  for (const lx of [-50, -20, 20, 44]) box(x, cx + lx, base - 22, 14, 22, col, 4)
  x.save(); x.translate(cx - 60, base - 64); x.rotate(-0.8 + wag); box(x, -8, -46, 14, 46, col, 4); x.restore()
}
export function water(x, top, h, t, col = '#2f6a7a', hi = 'rgba(255,255,255,0.25)') {
  x.fillStyle = col; x.fillRect(0, top, 1080, h)
  for (let k = 0; k < 14; k++) { const yy = top + 20 + (k * 47) % (h - 30), xx = ((k * 211 + t * 60 * (k % 2 ? 1 : -1)) % 1200 + 1200) % 1200 - 60; x.fillStyle = hi; x.fillRect(xx, yy, 70, 6) }
}
export function bats(x, t, n = 20, cx = 540, cy = 760) {
  for (let k = 0; k < n; k++) {
    const ph = (t * 0.25 + k / n) % 1, bx = cx - 400 + ph * 900 + Math.sin(k * 3.1) * 160, by = cy - ph * 520 + Math.sin(t * 3 + k) * 30, f = Math.sin(t * 18 + k) * 10
    x.fillStyle = '#1b1236'; x.beginPath(); x.moveTo(bx - 22, by - f); x.lineTo(bx, by + 6); x.lineTo(bx + 22, by - f); x.lineTo(bx, by - 4); x.fill()
  }
}
export function crawfish(x, cx, cy, s = 1, rot = 0) {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
  box(x, -34, -12, 68, 26, '#d8402a', 4); box(x, 34, -20, 22, 20, '#d8402a', 3); box(x, 34, 6, 22, 20, '#d8402a', 3); box(x, -52, -8, 18, 18, '#b03020', 3)
  x.fillStyle = INK; x.fillRect(-20, -6, 4, 4); x.restore()
}
export function crawfishPile(x, cx, base, t) {
  for (let k = 0; k < 26; k++) { const r = k < 12 ? 0 : k < 20 ? 1 : 2; crawfish(x, cx - 240 + (k % 12) * 42 + r * 40, base - 20 - r * 34 - Math.sin(k) * 6, 0.8, Math.sin(k * 1.7) * 0.6) }
  box(x, cx + 210, base - 70, 40, 70, '#ffd36b', 4); box(x, cx - 280, base - 46, 40, 40, '#d9b58a', 4)
}
export function newspaperTable(x, cx = 540, top = FLOOR - 40) { table(x, cx, 760, top, '#8a6a4a'); x.fillStyle = '#e8e2d2'; x.fillRect(cx - 370, top - 6, 740, 22); for (let k = 0; k < 9; k++) { x.fillStyle = '#9a948a'; x.fillRect(cx - 350 + k * 80, top - 2, 50, 4) } }
export function frame(x, cx, cy, w, h, cols, t = 0) { box(x, cx - w / 2, cy - h / 2, w, h, '#c9a24a', 10); cols.forEach((c, i) => { x.fillStyle = c; x.fillRect(cx - w / 2 + 14, cy - h / 2 + 14 + i * (h - 28) / cols.length, w - 28, (h - 28) / cols.length + 1) }) }
export function phone(x, cx, cy, s = 1, draw) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  box(x, -150, -280, 300, 560, '#1b1236', 8); x.fillStyle = '#f4f1ea'; x.fillRect(-134, -250, 268, 490)
  x.fillStyle = INK; x.fillRect(-40, -266, 80, 8)
  draw?.(); x.restore()
}
export function chatB(x, y, text, mine, k = 1, col) {     // a generic chat bubble inside a phone (local coords)
  if (k <= 0) return
  x.save(); x.globalAlpha = clamp(k); x.font = `800 24px ${INTER}`
  const w = Math.min(230, x.measureText(text).width + 30), l = mine ? 120 - w : -120
  x.fillStyle = mine ? (col || '#2b8af0') : '#dcd6e8'; x.fillRect(l, y - 22, w, 44)
  txt(x, text, l + w / 2, y + 1, { size: 24, col: mine ? '#fff' : INK }); x.restore()
}
export function ac(x, cx, cy, t) {     // an arctic AC vent with frost and a cold draft
  box(x, cx - 130, cy - 40, 260, 80, '#d8dde6', 6); for (let k = 0; k < 5; k++) { x.fillStyle = '#8f96a0'; x.fillRect(cx - 110, cy - 28 + k * 14, 220, 6) }
  for (let k = 0; k < 7; k++) { x.fillStyle = '#bfe6ff'; x.beginPath(); x.moveTo(cx - 120 + k * 40, cy + 40); x.lineTo(cx - 108 + k * 40, cy + 40 + 30 + (k % 3) * 18); x.lineTo(cx - 96 + k * 40, cy + 40); x.fill() }
  for (let k = 0; k < 5; k++) { const ph = (t * 0.8 + k / 5) % 1; x.strokeStyle = `rgba(191,230,255,${(0.6 * (1 - ph)).toFixed(2)})`; x.lineWidth = 5; x.beginPath(); x.moveTo(cx - 80 + k * 40, cy + 70 + ph * 300); x.lineTo(cx - 70 + k * 40, cy + 110 + ph * 300); x.stroke() }
}
export function snowflakes(x, t, n = 14) { for (let k = 0; k < n; k++) { const ph = (t * 0.3 + k / n) % 1, sx = (k * 151) % 1080, sy = 360 + ph * 1000; x.fillStyle = 'rgba(239,246,255,0.8)'; x.fillRect(sx - 6, sy - 2, 12, 4); x.fillRect(sx - 2, sy - 6, 4, 12) } }
export function pollen(x, t, n = 40) { for (let k = 0; k < n; k++) { const ph = (t * 0.15 + k / n) % 1; x.fillStyle = 'rgba(240,210,60,0.75)'; x.fillRect((k * 97 + Math.sin(t + k) * 40) % 1080, 300 + ph * 1100, 8, 8) } }
export function mosquito(x, t, cx, cy, k = 0) { const mx = cx + Math.sin(t * 7 + k) * 60, my = cy + Math.cos(t * 9 + k * 2) * 30; x.fillStyle = INK; x.fillRect(mx - 8, my - 3, 16, 6); x.fillStyle = 'rgba(191,230,255,0.8)'; x.fillRect(mx - 6, my - 12 + Math.sin(t * 60) * 3, 6, 8); x.fillRect(mx + 2, my - 12 - Math.sin(t * 60) * 3, 6, 8) }
export function stringLights(x, t, y = 420, cols = [GOLD, PINK, SKYB, MINT]) {
  x.strokeStyle = INK; x.lineWidth = 4; x.beginPath(); x.moveTo(0, y); for (let xx = 0; xx <= 1080; xx += 90) x.quadraticCurveTo(xx + 45, y + 40, xx + 90, y); x.stroke()
  for (let k = 0; k < 13; k++) { const on = Math.sin(t * 3 + k * 1.3) > -0.4; x.fillStyle = on ? cols[k % cols.length] : '#3a3050'; x.beginPath(); x.arc(k * 90 + 45, y + 22, 12, 0, TAU); x.fill() }
}
export function shopSign(x, cx, cy, text, col, t, k = 1, glow = true) {
  if (k <= 0) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.font = `800 40px ${INTER}`; const w = x.measureText(text).width + 50
  if (glow) { x.shadowColor = col; x.shadowBlur = 24 + 8 * Math.sin(t * 4 + cx) }
  box(x, -w / 2, -36, w, 72, '#120c24', 6); x.shadowBlur = 0; txt(x, text, 0, 2, { size: 40, col }); x.restore()
}
export function confetti(x, t, n = 22, top = 360) { for (let k = 0; k < n; k++) { const ph = (t * 0.35 + k / n) % 1; x.fillStyle = [GOLD, PINK, SKYB, MINT][k % 4]; x.save(); x.translate(60 + (k * 113) % 960, top + ph * 1000); x.rotate(t * 3 + k); x.fillRect(-8, -12, 16, 24); x.restore() } }
export function mic(x, cx, base) { box(x, cx - 6, base - 300, 12, 300, '#8f96a0', 4); box(x, cx - 18, base - 340, 36, 50, '#3a3a4a', 5); box(x, cx - 60, base - 10, 120, 14, '#8f96a0', 4) }
export function boat(x, cx, cy, t, col = '#5ec8ff') {   // a paddle boat
  const b = Math.sin(t * 2) * 6
  box(x, cx - 170, cy - 30 + b, 340, 70, col, 7); box(x, cx - 120, cy - 120 + b, 240, 20, BONE, 5); box(x, cx - 110, cy - 100 + b, 14, 70, BONE, 3); box(x, cx + 96, cy - 100 + b, 14, 70, BONE, 3)
  for (let k = 0; k < 4; k++) { const a = t * 5 + k * Math.PI / 2; x.fillStyle = '#ff5a6e'; x.fillRect(cx + 190 + Math.cos(a) * 26 - 6, cy + 10 + b + Math.sin(a) * 26 - 6, 12, 12) }
}
export function court(x, t, col = '#2f7a5a') {
  sky(x, ...SKIES.noon); x.fillStyle = '#3a6ab0'; x.fillRect(0, FLOOR - 200, 1080, 1920 - FLOOR + 200)
  x.fillStyle = col; x.fillRect(80, FLOOR - 160, 920, 700); x.strokeStyle = BONE; x.lineWidth = 8; x.strokeRect(80, FLOOR - 160, 920, 700); x.beginPath(); x.moveTo(540, FLOOR - 160); x.lineTo(540, FLOOR + 540); x.stroke()
  box(x, 60, FLOOR + 140, 960, 12, BONE, 4); for (let k = 0; k < 24; k++) { x.fillStyle = 'rgba(239,230,214,0.5)'; x.fillRect(70 + k * 40, FLOOR + 60, 3, 80) }
}
export function paddle(x, cx, cy, rot = 0, col = '#ff8fb1') { x.save(); x.translate(cx, cy); x.rotate(rot); box(x, -40, -60, 80, 90, col, 5); box(x, -10, 30, 20, 50, '#3a3a4a', 4); x.restore() }
export function ball(x, cx, cy, col = '#f2e14a') { x.fillStyle = INK; x.beginPath(); x.arc(cx, cy, 20, 0, TAU); x.fill(); x.fillStyle = col; x.beginPath(); x.arc(cx, cy, 15, 0, TAU); x.fill(); x.fillStyle = INK; for (const [a, b] of [[-5, -5], [5, 3], [-3, 6]]) x.fillRect(cx + a - 2, cy + b - 2, 4, 4) }
export function mansion(x, cx, base) {
  box(x, cx - 220, base - 360, 440, 360, '#efe6d6', 7); x.fillStyle = INK; x.beginPath(); x.moveTo(cx - 250, base - 356); x.lineTo(cx, base - 470); x.lineTo(cx + 250, base - 356); x.fill(); x.fillStyle = '#8a8fa8'; x.beginPath(); x.moveTo(cx - 236, base - 360); x.lineTo(cx, base - 456); x.lineTo(cx + 236, base - 360); x.fill()
  for (let k = 0; k < 4; k++) box(x, cx - 190 + k * 110, base - 330, 20, 330, '#f8f4ec', 3)
  for (let k = 0; k < 3; k++) box(x, cx - 150 + k * 110, base - 250, 60, 80, '#bfe6ff', 4)
}
export function tacoStand(x, cx, base, t, sign = 'TACOS') {
  box(x, cx - 150, base - 230, 300, 230, '#e05a3a', 6); box(x, cx - 170, base - 280, 340, 60, '#ffd36b', 6); txt(x, sign, cx, base - 250, { size: 40, col: INK })
  box(x, cx - 110, base - 190, 220, 90, '#2a1a10', 4); for (let k = 0; k < 6; k++) { x.fillStyle = k % 2 ? '#fff' : '#e05a3a'; x.fillRect(cx - 170 + k * 57, base - 222, 57, 20) }
}
export function foodTruck(x, cx, base, t, sign = 'TACOS', col = '#5ec8ff') {
  box(x, cx - 260, base - 300, 420, 250, col, 7); box(x, cx + 160, base - 220, 120, 170, col, 7); x.fillStyle = '#bfe6ff'; x.fillRect(cx + 180, base - 200, 80, 60)
  box(x, cx - 220, base - 250, 300, 110, '#2a1a10', 5); box(x, cx - 240, base - 140, 340, 16, '#8f96a0', 4); shopSign(x, cx - 50, base - 340, sign, '#ffd36b', t, 1, false)
  for (const wx of [-170, 200]) { x.fillStyle = INK; x.beginPath(); x.arc(cx + wx, base - 40, 40, 0, TAU); x.fill(); x.fillStyle = '#8f96a0'; x.beginPath(); x.arc(cx + wx, base - 40, 18, 0, TAU); x.fill() }
}
export function counter(x, top = FLOOR - 60, col = '#8a5530') { box(x, 0, top, 1080, 1920 - top, col, 0); x.fillStyle = 'rgba(255,255,255,0.15)'; x.fillRect(0, top, 1080, 14); x.fillStyle = INK; x.fillRect(0, top - 6, 1080, 8) }
export function tray(x, cx, cy, items) { box(x, cx - 200, cy - 20, 400, 30, '#c9c3b5', 5); items.forEach((f, i) => f(cx - 140 + i * 95, cy - 50)) }
export function bed(x, cx, base) { box(x, cx - 300, base - 150, 600, 110, '#c9a6ff', 7); box(x, cx - 320, base - 300, 50, 300, '#6b3b1f', 6); box(x, cx - 260, base - 200, 140, 60, BONE, 5) }
export function windowSun(x, cx, cy, t, w = 300, h = 260, sk = SKIES.morning) {
  box(x, cx - w / 2, cy - h / 2, w, h, '#fff', 10); x.save(); x.beginPath(); x.rect(cx - w / 2, cy - h / 2, w, h); x.clip()
  const g = x.createLinearGradient(0, cy - h / 2, 0, cy + h / 2); g.addColorStop(0, sk[0]); g.addColorStop(1, sk[1]); x.fillStyle = g; x.fillRect(cx - w / 2, cy - h / 2, w, h); sun(x, cx + 60, cy - 30, 40); x.restore()
  x.fillStyle = INK; x.fillRect(cx - 5, cy - h / 2, 10, h); x.fillRect(cx - w / 2, cy - 5, w, 10)
}
export function thermo(x, cx, cy, deg, col = BRAKE) { box(x, cx - 110, cy - 56, 220, 112, '#120c24', 6); txt(x, deg, cx, cy + 4, { size: 64, col, font: MONO, weight: 700 }) }
export function tunnel(x, t) {
  x.fillStyle = '#e8e0cc'; x.fillRect(0, 0, 1080, 1920)
  x.fillStyle = '#d0c6ae'; x.beginPath(); x.moveTo(0, 300); x.lineTo(380, 640); x.lineTo(700, 640); x.lineTo(1080, 300); x.lineTo(1080, 1920); x.lineTo(0, 1920); x.fill()
  x.fillStyle = '#b8ac90'; x.fillRect(380, 640, 320, 420); x.fillStyle = '#9a8f78'; x.beginPath(); x.moveTo(0, 1920); x.lineTo(380, 1060); x.lineTo(700, 1060); x.lineTo(1080, 1920); x.fill()
  for (let k = 0; k < 8; k++) { x.fillStyle = 'rgba(255,255,240,0.6)'; const w = 200 - k * 20; x.fillRect(540 - w / 2, 330 + k * 40, w, 8) }
}
export function stage(x, t, col = '#2a1450') {
  x.fillStyle = col; x.fillRect(0, 0, 1080, 1920)
  for (let k = 0; k < 7; k++) { x.fillStyle = k % 2 ? '#a0203a' : '#c0304a'; x.fillRect(k * 160, 300, 160, 1000) }
  x.fillStyle = 'rgba(255,240,200,0.18)'; x.beginPath(); x.moveTo(470, 300); x.lineTo(200, FLOOR + 60); x.lineTo(880, FLOOR + 60); x.lineTo(610, 300); x.fill()
  x.fillStyle = '#3a2418'; x.fillRect(0, FLOOR + 60, 1080, 1920 - FLOOR - 60); x.fillStyle = INK; x.fillRect(0, FLOOR + 54, 1080, 10)
}
export function lyrics(x, cx, cy, text, t, prog01) {
  box(x, cx - 340, cy - 70, 680, 140, '#0e1630', 8); x.font = `800 42px ${INTER}`; const w = x.measureText(text).width
  txt(x, text, cx, cy, { size: 42, col: BONE }); x.save(); x.beginPath(); x.rect(cx - w / 2, cy - 40, w * clamp(prog01), 80); x.clip(); txt(x, text, cx, cy, { size: 42, col: '#5ee0ff' }); x.restore()
}
export function racks(x, t) { for (let k = 0; k < 3; k++) { const cx = 180 + k * 360; box(x, cx - 150, 620, 300, 12, '#8f96a0', 4); for (let j = 0; j < 7; j++) box(x, cx - 140 + j * 40, 640, 34, 200 + (j % 3) * 30, ['#ff8fb1', '#ffd36b', '#7dffb0', '#c9a6ff', '#ff9a3c', '#8fe3ff', '#e05a3a'][(j + k) % 7], 4) } }
export function plant(x, cx, base, s = 1) { box(x, cx - 40 * s, base - 70 * s, 80 * s, 70 * s, '#c9783a', 5); for (let k = 0; k < 5; k++) { x.fillStyle = '#3f8a4a'; x.beginPath(); x.ellipse(cx + (k - 2) * 22 * s, base - 110 * s - (k % 2) * 30 * s, 18 * s, 50 * s, (k - 2) * 0.3, 0, TAU); x.fill() } }
export function bridge(x, base, t, col = '#5a5070') {   // a low concrete bridge over the bayou
  box(x, 0, base - 160, 1080, 60, col, 6); for (let k = 0; k < 5; k++) box(x, 60 + k * 230, base - 100, 40, 160, col, 5)
  for (let k = 0; k < 18; k++) { x.fillStyle = '#2a2040'; x.fillRect(30 + k * 60, base - 104, 30, 10) }
}
export function sand(x, y = FLOOR + 60) { x.fillStyle = '#e8cf98'; x.fillRect(0, y, 1080, 1920 - y); for (let k = 0; k < 50; k++) { x.fillStyle = 'rgba(160,120,70,0.35)'; x.fillRect((k * 131) % 1080, y + 20 + (k * 73) % 500, 10, 6) } }
export function gull(x, t, cx, cy) { const f = Math.sin(t * 10) * 12, X = (cx + t * 80) % 1200 - 60; x.strokeStyle = BONE; x.lineWidth = 8; x.beginPath(); x.moveTo(X - 30, cy - f); x.lineTo(X, cy); x.lineTo(X + 30, cy - f); x.stroke() }
export function grill(x, cx, base, t) { box(x, cx - 120, base - 160, 240, 100, '#3a3a4a', 6); for (const lx of [-90, 80]) box(x, cx + lx, base - 60, 14, 60, '#3a3a4a', 3); for (let k = 0; k < 3; k++) { const ph = (t * 0.7 + k / 3) % 1; x.strokeStyle = `rgba(220,220,220,${(0.5 * (1 - ph)).toFixed(2)})`; x.lineWidth = 8; x.beginPath(); x.moveTo(cx - 40 + k * 40, base - 170 - ph * 160); x.lineTo(cx - 30 + k * 40, base - 200 - ph * 160); x.stroke() } }
export function boba(x, cx, cy, s = 1, col = '#d9b58a') { x.save(); x.translate(cx, cy); x.scale(s, s); box(x, -36, -70, 72, 120, col, 5); box(x, -40, -80, 80, 14, '#efe6d6', 4); box(x, 6, -130, 10, 60, PINK, 2); for (let k = 0; k < 6; k++) { x.fillStyle = '#2a1a10'; x.beginPath(); x.arc(-22 + (k % 3) * 22, 30 + Math.floor(k / 3) * 14, 8, 0, TAU); x.fill() } x.restore() }
export function bowl(x, cx, cy, s = 1, col = '#f4d49a') { x.save(); x.translate(cx, cy); x.scale(s, s); x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 76, 0, Math.PI); x.fill(); x.fillStyle = '#e8e2d2'; x.beginPath(); x.arc(0, 0, 70, 0, Math.PI); x.fill(); x.fillStyle = col; x.fillRect(-66, -8, 132, 14); x.restore() }
export function queso(x, cx, cy, s = 1) { bowl(x, cx, cy, s, '#ffcf4a'); x.fillStyle = '#ffcf4a'; x.beginPath(); x.arc(cx + 50 * s, cy + 6 * s, 10 * s, 0, TAU); x.fill() }
export function wing(x, cx, cy, s = 1) { x.save(); x.translate(cx, cy); x.scale(s, s); x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 40, 26, 0.4, 0, TAU); x.fill(); x.fillStyle = '#e8a83a'; x.beginPath(); x.ellipse(0, 0, 34, 20, 0.4, 0, TAU); x.fill(); x.fillStyle = '#fff6c9'; for (let k = 0; k < 5; k++) x.fillRect(-20 + k * 9, -6 + (k % 2) * 8, 4, 4); x.restore() }
export function raspa(x, cx, cy, s = 1) { x.save(); x.translate(cx, cy); x.scale(s, s); box(x, -34, -20, 68, 90, '#efe6d6', 4); x.fillStyle = INK; x.beginPath(); x.arc(0, -20, 44, Math.PI, 0); x.fill(); x.fillStyle = '#ff5a8e'; x.beginPath(); x.arc(0, -20, 38, Math.PI, 0); x.fill(); x.fillStyle = '#5ec8ff'; x.fillRect(-38, -26, 38, 6); x.restore() }
export function kingCake(x, cx, cy, s = 1) { x.save(); x.translate(cx, cy); x.scale(s, s); x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 110, 50, 0, 0, TAU); x.fill(); x.fillStyle = '#e8b86a'; x.beginPath(); x.ellipse(0, 0, 104, 44, 0, 0, TAU); x.fill(); x.fillStyle = '#1b1236'; x.beginPath(); x.ellipse(0, 0, 50, 18, 0, 0, TAU); x.fill(); for (let k = 0; k < 18; k++) { x.fillStyle = ['#9a4ae0', '#f2c75c', '#3fbf5a'][k % 3]; const a = k / 18 * TAU; x.fillRect(Math.cos(a) * 78 - 5, Math.sin(a) * 30 - 4, 10, 8) } x.restore() }
export function sweater(x, P, id, col = '#c0304a') { const [cx, cy, s] = P.at(id); box(x, cx - s * 0.3, cy + s * 0.2, s * 0.6, s * 0.2, col, 4); for (let k = 0; k < 4; k++) { x.fillStyle = BONE; x.fillRect(cx - s * 0.24 + k * s * 0.14, cy + s * 0.27, s * 0.06, s * 0.06) } }
export function coat(x, P, id, col = '#e05a3a', col2 = '#2b5fb0') {   // a beanie + a scarf (keeps the face clear)
  const [cx, cy, s] = P.at(id)
  box(x, cx - s * 0.24, cy - s * 0.66, s * 0.48, s * 0.15, col2, 4); x.fillStyle = BONE; x.beginPath(); x.arc(cx, cy - s * 0.7, s * 0.06, 0, Math.PI * 2); x.fill()
  box(x, cx - s * 0.28, cy + s * 0.2, s * 0.56, s * 0.09, col, 4); box(x, cx + s * 0.08, cy + s * 0.26, s * 0.1, s * 0.2, col, 4)
}
export function shades(x, P, id) { const [cx, cy, s] = P.at(id); x.fillStyle = INK; x.fillRect(cx - s * 0.3, cy - s * 0.12, s * 0.26, s * 0.12); x.fillRect(cx + s * 0.04, cy - s * 0.12, s * 0.26, s * 0.12); x.fillRect(cx - s * 0.05, cy - s * 0.1, s * 0.1, 6) }
export function cap(x, P, id, col = '#2b5fb0') { const [cx, cy, s] = P.at(id); box(x, cx - s * 0.28, cy - s * 0.56, s * 0.56, s * 0.16, col, 4); box(x, cx, cy - s * 0.44, s * 0.38, s * 0.06, col, 3) }
export function headband(x, P, id, col = '#ff5a6e') { const [cx, cy, s] = P.at(id); box(x, cx - s * 0.3, cy - s * 0.36, s * 0.6, s * 0.08, col, 3) }
export function clipboard(x, P, id, side = 1) { const [cx, cy, s] = P.at(id); const bx = cx + side * s * 0.5; box(x, bx - 40, cy - 20, 80, 110, '#c98e5a', 5); box(x, bx - 30, cy - 6, 60, 84, BONE, 3); for (let k = 0; k < 4; k++) { x.fillStyle = INK; x.fillRect(bx - 22, cy + 6 + k * 18, 44, 4) } box(x, bx - 16, cy - 28, 32, 14, '#8f96a0', 3) }
export function holding(x, P, id, draw, side = 1, dy = 20) { const [cx, cy, s] = P.at(id); draw(cx + side * s * 0.5, cy + dy) }

// ── the sets (each paints a whole background for a beat) ─────────────────────────────────────────────────────
// Every set takes (x, t, lt, o) where o carries per-beat options.
export const SET = {
  bedroom: (x, t, lt, o = {}) => { room(x, { wall: o.wall || '#4a3a7a', floor: '#6b4a3a', trim: '#2a1d52' }); windowSun(x, 780, 640, t, 320, 280, o.sky || SKIES.morning); bed(x, 420, FLOOR + 60); if (o.ac) ac(x, 240, 440, t) },
  porch: (x, t, lt, o = {}) => { sky(x, ...(o.sky || SKIES.morning)); cloud(x, 200, 400, t); tree(x, 960, FLOOR + 60, 1.1); ground(x, '#4a8a4a'); bungalow(x, 520, FLOOR + 60, o.col || '#7ab0c8') },
  street: (x, t, lt, o = {}) => { sky(x, ...(o.sky || SKIES.noon)); skyline(x, FLOOR + 60, t, { alpha: 0.5, col: '#5a6a90', lit: '#fff3c4' }); ground(x, '#4a4a5a'); if (o.sign) streetSign(x, 820, 760, o.sign, { k: Kp(lt, 0.02), w: Math.max(320, o.sign.length * 32 + 80) }) },
  night: (x, t, lt, o = {}) => { skyline(x, FLOOR + 60, t, { alpha: 0.85 }); outside(x, { ground: o.ground || '#221b38' }); if (o.sign) streetSign(x, 820, 760, o.sign, { k: Kp(lt, 0.02), w: Math.max(320, o.sign.length * 32 + 80) }) },
  freeway: (x, t, lt, o = {}) => { sky(x, ...(o.sky || SKIES.haze), FLOOR - 150); x.fillStyle = '#3a3450'; x.fillRect(0, FLOOR + 400, 1080, 1920 - FLOOR - 400); skyline(x, FLOOR - 150, t, { alpha: 0.75 }); freeway(x, FLOOR - 160, 600, 3, o.move ? t * 700 : 0); if (o.shield) shield(x, 880, 640, o.shield, 0.9); if (o.over) overheadSign(x, 540, 800, o.over, o.sub || '', Kp(lt, 0.05), { gold: !!o.gold }) },
  feeder: (x, t, lt, o = {}) => { SET.freeway(x, t, lt, o); box(x, 0, FLOOR + 460, 1080, 60, '#3a3450', 0); txt(x, 'FEEDER ROAD', 820, FLOOR + 490, { size: 28, col: BONE, font: MONO, weight: 700 }) },
  brunch: (x, t, lt, o = {}) => { room(x, { wall: o.wall || '#e8a0a0', floor: '#8a6a4a', trim: '#a05a5a' }); for (let k = 0; k < 3; k++) plant(x, 160 + k * 380, 560, 0.8); box(x, 660, 640, 300, 200, '#2a1a10', 7); txt(x, 'WAIT:', 810, 700, { size: 40, col: BONE, font: MONO, weight: 700 }); txt(x, o.wait || '90 MIN', 810, 780, { size: 56, col: GOLD, font: MONO, weight: 700 }) },
  truck: (x, t, lt, o = {}) => { sky(x, ...(o.sky || SKIES.dusk)); stringLights(x, t, 380); ground(x, '#4a4a5a'); foodTruck(x, 620, FLOOR + 60, t, o.sign || 'TACOS', o.col || '#5ec8ff') },
  bayou: (x, t, lt, o = {}) => { sky(x, ...(o.sky || SKIES.morning)); skyline(x, 900, t, { alpha: 0.55, col: '#5a6a90', lit: '#fff3c4' }); x.fillStyle = '#4a8a4a'; x.fillRect(0, 880, 1080, 200); water(x, 1000, 140, t, '#3a6a6a'); tree(x, 140, 1000, 0.8); tree(x, 960, 1000, 0.9); ground(x, '#5a7a4a'); box(x, 0, FLOOR + 90, 1080, 60, '#b8ac90', 0) },
  museum: (x, t, lt, o = {}) => { room(x, { wall: '#f1ece2', floor: '#b89a74', trim: '#d8d0c0' }); frame(x, 270, 640, 300, 380, ['#e05a3a', '#2b5fb0', '#ffd36b']); frame(x, 800, 600, 340, 280, ['#7dffb0', '#ff8fb1']); if (o.free) label(x, 540, 360, 'FREE THURSDAY', 1, { size: 36, bg: MINT, rot: -0.02, font: MONO, weight: 700 }) },
  chapel: (x, t, lt) => { x.fillStyle = '#2a2630'; x.fillRect(0, 0, 1080, 1920); for (let k = 0; k < 3; k++) { box(x, 70 + k * 330, 420, 280, 620, ['#2a1f3a', '#1f2030', '#2a1a2a'][k], 6) } x.fillStyle = 'rgba(255,250,230,0.12)'; x.fillRect(340, 300, 400, 80); x.fillStyle = '#3a3440'; x.fillRect(0, FLOOR + 60, 1080, 1920 - FLOOR - 60); box(x, 240, FLOOR + 10, 600, 40, '#5a4a3a', 5) },
  bats: (x, t, lt, o = {}) => { sky(x, ...SKIES.sunset); sun(x, 300, 720, 90, '#ffb36b'); skyline(x, 960, t, { alpha: 0.6, col: '#3a2a5a', lit: '#ffd36b' }); water(x, 1060, 220, t, '#4a3a6a', 'rgba(255,180,120,0.35)'); bridge(x, FLOOR + 60, t); ground(x, '#3a4a3a', FLOOR + 140); if (lt > (o.batsAt ?? 0)) bats(x, t - (o.batsAt ?? 0), o.n || 22) },
  beach: (x, t, lt, o = {}) => { sky(x, ...(o.sky || SKIES.noon)); sun(x, 860, 440, 60); x.fillStyle = '#7a8a5a'; x.fillRect(0, 900, 1080, 300); water(x, 900, 300, t, '#8a7a4a', 'rgba(255,255,255,0.35)'); gull(x, t, 200, 520); gull(x, t + 3, 700, 600); sand(x, 1180); },
  crawfish: (x, t, lt, o = {}) => { sky(x, ...(o.sky || SKIES.gold)); stringLights(x, t, 400); tree(x, 140, FLOOR - 40, 1); ground(x, '#4a7a3a'); grill(x, 900, FLOOR - 40, t); newspaperTable(x, 540); crawfishPile(x, 540, FLOOR - 46, t) },
  karaoke: (x, t, lt, o = {}) => { stage(x, t, o.col); lyrics(x, 540, 470, o.lyric || 'la la la la la', t, prog(lt, 0.2, 2.6)); mic(x, 820, FLOOR + 60); notes(x, t, 540, 900, { n: 5 }) },
  paddle: (x, t, lt, o = {}) => { sky(x, ...(o.sky || SKIES.morning)); x.fillStyle = '#4a8a4a'; x.fillRect(0, 780, 1080, 140); tree(x, 160, 900, 0.9); tree(x, 920, 900, 0.8); water(x, 900, FLOOR + 60 - 900, t, '#3a7a8a'); x.fillStyle = '#3a7a8a'; x.fillRect(0, FLOOR + 60, 1080, 1920 - FLOOR - 60); water(x, FLOOR + 60, 600, t, '#2f6a7a') },
  mural: (x, t, lt) => { mural(x, t); x.fillStyle = '#3a3450'; x.fillRect(0, FLOOR + 60, 1080, 1920 - FLOOR - 60); x.fillStyle = INK; x.fillRect(0, FLOOR + 54, 1080, 10); x.fillStyle = 'rgba(0,0,0,0.0)' },
  vintage: (x, t, lt) => { room(x, { wall: '#3a6a5a', floor: '#8a5a3a', trim: '#2a4a3a' }); racks(x, t); plant(x, 120, FLOOR + 60, 1.2); plant(x, 980, FLOOR + 60, 1) },
  tunnel: (x, t, lt, o = {}) => { tunnel(x, t); shopSign(x, 540, 560, o.sign || 'LUNCH', '#ffd36b', t, 1, false); ac(x, 180, 380, t) },
  pickle: (x, t) => court(x, t),
  coffee: (x, t, lt, o = {}) => { sky(x, ...(o.sky || SKIES.haze)); ground(x, '#4a4a5a'); coffeeShop(x, 540, FLOOR + 60, !!o.closed); box(x, 0, FLOOR + 460, 1080, 60, '#3a3450', 0); txt(x, 'FEEDER ROAD', 820, FLOOR + 490, { size: 28, col: BONE, font: MONO, weight: 700 }) },
  parking: (x, t, lt, o = {}) => { sky(x, ...SKIES.noon); heatSun(x, 880, 440, t, 70); ground(x, '#5a5a66'); for (let k = 0; k < 6; k++) { x.fillStyle = BONE; x.fillRect(60 + k * 180, FLOOR + 80, 8, 180) } tree(x, 220, FLOOR + 60, 1); x.fillStyle = 'rgba(20,40,20,0.35)'; x.beginPath(); x.ellipse(220, FLOOR + 140, 230, 50, 0, 0, TAU); x.fill(); shimmer(x, FLOOR - 200, 300, t) },
  nozoning: (x, t, lt) => { sky(x, ...SKIES.noon); ground(x, '#5a5a66'); mansion(x, 280, FLOOR + 60); tacoStand(x, 800, FLOOR + 60, t) },
  lawn: (x, t, lt, o = {}) => { sky(x, ...(o.sky || SKIES.sunset)); skyline(x, 1000, t, { alpha: 0.95 }); ground(x, '#4a8a4a', 1000); for (let k = 0; k < 30; k++) { x.fillStyle = 'rgba(30,80,30,0.5)'; x.fillRect((k * 97) % 1080, 1020 + (k * 53) % 700, 6, 18) } },
  bellaire: (x, t, lt) => { skyline(x, FLOOR + 60, t, { alpha: 0.4 }); x.fillStyle = 'rgba(12,8,30,0.5)'; x.fillRect(0, 0, 1080, FLOOR + 60); for (const [cx, cy, s, c, d] of [[230, 520, 'NOODLES', '#ff5a6e', 0], [800, 470, 'BOBA', '#7dffb0', 0.1], [270, 760, 'PHO', '#ffd36b', 0.2], [820, 720, 'HOT POT', '#ff8fd0', 0.3], [540, 960, 'KARAOKE', '#5ee0ff', 0.4]]) shopSign(x, cx, cy, s, c, t, 1); outside(x, { ground: '#2a2440' }) },
  kolache: (x, t, lt) => { room(x, { wall: '#f4d9b0', floor: '#8a5530', trim: '#c98e5a' }); box(x, 120, 420, 840, 260, '#bfe6ff', 8); for (let r = 0; r < 2; r++) for (let k = 0; k < 6; k++) { const cx = 200 + k * 136, cy = 490 + r * 120; if ((k + r) % 2) kolache(x, cx, cy, 0.7); else klobasnek(x, cx, cy, 0.6) } counter(x, FLOOR - 20, '#a06a3a') },
  office: (x, t, lt, o = {}) => { room(x, { wall: '#c8d0dc', floor: '#6a7280', trim: '#9aa2b0' }); ac(x, 540, 360, t); box(x, 620, FLOOR - 120, 360, 40, '#8a6a4a', 6); box(x, 680, FLOOR - 320, 240, 180, '#2a3550', 7); snowflakes(x, t, o.snow ?? 10) },
  party: (x, t, lt) => { x.fillStyle = '#1c1240'; x.fillRect(0, 0, 1080, 1920); stringLights(x, t, 340, [GOLD, PINK, SKYB]); confetti(x, t); x.fillStyle = '#2a1d52'; x.fillRect(0, FLOOR + 60, 1080, 1920 - FLOOR - 60); x.fillStyle = INK; x.fillRect(0, FLOOR + 54, 1080, 10); heartsRise(x, t) },
  kitchen: (x, t, lt, o = {}) => { room(x, { wall: o.wall || '#f0c890', floor: '#8a6a4a', trim: '#c08850' }); box(x, 120, 420, 260, 200, '#e8e2d2', 6); box(x, 700, 420, 260, 200, '#e8e2d2', 6); counter(x, FLOOR - 40, '#b07a4a'); soupPot(x, 800, FLOOR - 110, t) },
  pollenCar: (x, t, lt, o = {}) => { sky(x, ...SKIES.haze); tree(x, 820, FLOOR + 60, 1.2, '#6a9a3a'); ground(x, '#5a5a66'); car(x, 420, FLOOR - 20, o.clean ? '#2b5fb0' : '#c9b84a', { s: 1.6 }); if (!o.clean) { x.fillStyle = 'rgba(230,200,60,0.85)'; x.fillRect(240, FLOOR - 160, 360, 18); x.fillRect(250, FLOOR - 100, 340, 10) } pollen(x, t, o.n ?? 40) },
  movies: (x, t, lt) => { x.fillStyle = '#120c24'; x.fillRect(0, 0, 1080, 1920); const fl = 0.7 + 0.3 * Math.sin(t * 5); x.fillStyle = `rgba(191,230,255,${(0.85 * fl).toFixed(2)})`; x.fillRect(90, 640, 900, 360); x.fillStyle = 'rgba(191,230,255,0.10)'; x.beginPath(); x.moveTo(90, 1000); x.lineTo(990, 1000); x.lineTo(1080, 1500); x.lineTo(0, 1500); x.fill(); for (let r = 0; r < 2; r++) for (let k = 0; k < 7; k++) box(x, 30 + k * 150, FLOOR + 80 + r * 180, 120, 110, '#7a1f3a', 5); snowflakes(x, t, 8) },
  gym: (x, t) => { room(x, { wall: '#2a3a5a', floor: '#3a3a4a', trim: '#1a2a4a' }); for (let k = 0; k < 4; k++) box(x, 120 + k * 230, 520, 150, 260, '#8f96a0', 6) },
}

export function heartsRise(x, t) { for (let k = 0; k < 6; k++) { const ph = (t * 0.3 + k / 6) % 1; heart(x, 120 + k * 170, 1250 - ph * 600, 7, [PINK, GOLD, SKYB][k % 3]) } }

// ── POV furniture ────────────────────────────────────────────────────────────────────────────────────────────
/** the time + place chip (top centre) */
export function chip(x, t, text, k = 1, acc = GOLD) { if (!text || k <= 0) return; label(x, 540, 300, text, k, { size: 34, bg: acc, rot: -0.02, font: MONO, weight: 700 }) }
/** second-person narration strip (talks to the viewer) */
export function capStrip(x, lt, text, at = 0.15, acc = PINK) {
  if (!text) return
  const k = clamp((lt - at) / 0.25); if (k <= 0) return
  const [a, b] = text.split(' | ')
  x.save(); x.globalAlpha = k; x.fillStyle = 'rgba(14,9,32,0.86)'; x.fillRect(70, 400, 940, b ? 170 : 104); x.fillStyle = acc; x.fillRect(70, 400, 12, b ? 170 : 104)
  txt(x, a, 560, 452, { size: 48, col: BONE }); if (b) txt(x, b, 560, 520, { size: 48, col: BONE }); x.restore()
}
/** "YOU" tag under the viewer's star */
export function youTag(x, cx, cy, sign, acc = PINK) { label(x, cx, cy, `YOU (${sign.toUpperCase()})`, 1, { size: 28, bg: acc, rot: 0.02, font: MONO, weight: 700 }) }

/**
 * pov({ sign, hook, acc, end, stars, cues, open, beats })
 * open: the first scene (frame 0, busy): { set, o, cast?, front?, lines? }  (the sign's star is at centre by default)
 * beat: { d, set, o, chip, cap, lines: [[l0, dur, who('you'|sign), text]], you: [[lt,x,y,size]…] | [x,y,size], cast, mood, front, back, stick, hops, look }
 */
export function pov(S) {
  const me = S.sign, acc = S.acc || PINK
  const fix = w => (w === 'you' ? me : w)
  const wave = ids => Object.fromEntries(ids.map((id, i) => [id, [0.02 + i * 0.08, 0.9 + i * 0.08, 1.8 + i * 0.08]]))
  const O = S.open
  const first = {
    dur: O.d || 2.7, set: (x, t, lt) => SET[O.set](x, t, lt, O.o || {}),
    back: O.back, front: (x, t, lt, P) => { O.front?.(x, t, lt, P); if (lt > 0.0) youTag(x, P.at(me)[0], P.at(me)[1] + P.at(me)[2] * 0.62, me, acc) },
    cast: { [me]: [[0, 540, Y, 320]], ...(O.cast || {}) }, mood: { [me]: O.mood || 'sparkle', ...(O.moods || {}) },
    hops: wave([me, ...Object.keys(O.cast || {})]), look: O.look || {}, lines: (O.lines || []).map(([a, d, w, s]) => [a, d, fix(w), s]),
  }
  const beats = S.beats.map(B => {
    const youK = Array.isArray(B.you?.[0]) ? B.you : [[0, ...(B.you || [380, Y, 280])]]
    return {
      dur: B.d, set: (x, t, lt) => SET[B.set](x, t, lt, B.o || {}),
      back: B.back,
      front: (x, t, lt, P) => {
        B.front?.(x, t, lt, P)
        const [cx, cy, s] = P.at(me); if (!B.noTag && s > 0) youTag(x, cx, cy + s * 0.62, me, acc)
        chip(x, t, B.chip, Kp(lt, 0.02, 0.25), acc === GOLD ? MINT : GOLD); capStrip(x, lt, B.cap, 0.12, acc)
      },
      cast: { [me]: youK, ...(B.cast || {}) },
      mood: { [me]: B.mood || 'happy', ...(B.moods || {}) }, look: { [me]: B.lookYou || [0, 0], ...(B.look || {}) },
      hops: { [me]: [0.05], ...(B.hops || {}) },
      lines: (B.lines || []).map(([a, d, w, s]) => [a, d, fix(w), s]), stick: B.stick,
    }
  })
  return {
    hook: S.hook, badge: BADGE, cues: [...STING, ...(S.cues || [])], endLen: 6.2,
    end: (x, t, lt) => partyCard(x, t, lt, { line: S.end, stars: S.stars || [me, 'leo', 'pisces', 'gemini', 'cancer'].filter((v, i, a) => a.indexOf(v) === i).slice(0, 4) }),
    scenes: [first, ...beats],
  }
}
export { clamp, prog, ease, box, txt, label, sparkles, pop01, GOLD, BONE, PINK, INK, MONO, SERIF, MINT, SKYB, LAV, INTER, taco, kolache, klobasnek, car, puffer, heatSun, sweat, skyline, streetSign, shield, overheadSign, coffeeShop, houses, cones, soupPot, notes, heart, room, outside, table, BRAKE, HGREEN, SIGN_IDS }
