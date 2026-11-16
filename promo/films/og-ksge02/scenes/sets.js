// Spot the Green Flag (m32): reusable take backdrops and props, panel-local (504 × 770 set, floor at FLOOR = 600).
// Shared by ksge02–ksge24 (read-only for everyone else). Pure drawing functions; nothing touches the DOM.
import { R, box, drawBits, shadow, INK, BONE, GOLD, PINK, RED, GREEN, SKYB, PW, FLOOR, INTER, MONO, HEART, clamp, lerp, ease, prog } from '../../ksge01/scenes/greenkit.js'

const wallStripes = (x, a, b, w = 48) => { R(x, a, 0, 0, PW, FLOOR); for (let i = 0; i < PW; i += w) R(x, b, i, 0, w / 2, FLOOR) }
const woodFloor = (x, c = '#4a3524', d = '#3e2c1e') => { R(x, INK, 0, FLOOR - 6, PW, 10); R(x, c, 0, FLOOR + 4, PW, 300); for (let i = 0; i < PW; i += 84) R(x, d, i, FLOOR + 4, 6, 300) }
const tileFloor = (x, c = '#3a3a5c', d = '#2f2f4e') => { R(x, INK, 0, FLOOR - 6, PW, 10); for (let i = 0; i < PW; i += 56) for (let j = FLOOR + 4; j < 900; j += 56) R(x, ((i + j) / 56) % 2 < 1 ? c : d, i, j, 56, 56) }
export function windowNight(x, X, Y, w = 170, h = 150) {
  box(x, X, Y, w, h, '#1c1640', { b: 6 }); R(x, INK, X + w / 2 - 3, Y, 6, h); R(x, INK, X, Y + h / 2 - 3, w, 6)
  for (let i = 0; i < 5; i++) R(x, 'rgba(242,199,92,0.7)', X + 16 + i * 30, Y + 20 + (i % 2) * 70, 6, 6)
}
export function wallClock(x, X, Y, text) {
  box(x, X, Y, 150, 70, BONE, { b: 6 }); x.font = `700 46px ${MONO}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, X + 75, Y + 37)
}
export function cafe(x, { clock = null } = {}) { wallStripes(x, '#3b2a55', '#352650'); windowNight(x, 40, 120); if (clock) wallClock(x, 300, 110, clock); woodFloor(x) }
export function kitchen(x) {
  wallStripes(x, '#2f4a5c', '#2a4354', 40)
  box(x, 20, 90, 200, 120, '#e0d6c4', { b: 6 }); box(x, 280, 90, 200, 120, '#e0d6c4', { b: 6 }); R(x, INK, 118, 90, 6, 120); R(x, INK, 378, 90, 6, 120)
  R(x, GOLD, 110, 150, 6, 14); R(x, GOLD, 388, 150, 6, 14)
  tileFloor(x)
}
export function living(x, { lamp = true, wall = '#40305e', wall2 = '#3a2b56' } = {}) {
  wallStripes(x, wall, wall2, 60); windowNight(x, 300, 100, 160, 140)
  if (lamp) { R(x, INK, 60, 260, 8, 340); box(x, 24, 200, 80, 60, GOLD, { b: 5 }); x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(64, 240, 10, 64, 240, 220); g.addColorStop(0, 'rgba(242,199,92,0.25)'); g.addColorStop(1, 'rgba(242,199,92,0)'); x.fillStyle = g; x.fillRect(0, 20, 300, 440); x.restore() }
  woodFloor(x, '#5a3f2a', '#4c3523')
}
export function couch(x, cx, y, w = 340, col = '#7d5cc6') {
  box(x, cx - w / 2, y - 120, w, 90, col, { b: 6, hi: 'rgba(255,255,255,0.18)' })
  box(x, cx - w / 2 - 20, y - 60, w + 40, 70, col, { b: 6 })
  R(x, INK, cx - w / 2, y + 10, 14, 30); R(x, INK, cx + w / 2 - 14, y + 10, 14, 30)
}
export function party(x, t, { banner = 'PARTY', wall = '#4a2d62', wall2 = '#43285a', floor = 'wood' } = {}) {
  wallStripes(x, wall, wall2, 56)
  // bunting
  for (let i = 0; i < 9; i++) { const bx = 10 + i * 58, by = 70 + 18 * Math.sin(i / 8 * Math.PI); x.fillStyle = INK; x.beginPath(); x.moveTo(bx - 4, by - 4); x.lineTo(bx + 46, by - 4); x.lineTo(bx + 21, by + 46); x.fill(); x.fillStyle = [PINK, GOLD, GREEN, SKYB][i % 4]; x.beginPath(); x.moveTo(bx, by); x.lineTo(bx + 42, by); x.lineTo(bx + 21, by + 38); x.fill() }
  if (banner) { box(x, 90, 150, 324, 64, BONE, { b: 6 }); x.font = `800 34px ${INTER}`; x.fillStyle = RED; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(banner, 252, 184) }
  for (let i = 0; i < 3; i++) { const bx = 40 + i * 30, by = 300 + 10 * Math.sin(t * 2 + i); R(x, INK, bx + 12, by + 40, 3, 120); drawBits(x, ['.BB.', 'BBBB', 'BBBB', '.BB.'], { B: [PINK, GOLD, SKYB][i] }, bx + 14, by + 20, 10) }
  if (floor === 'wood') woodFloor(x, '#5a3f2a', '#4c3523'); else tileFloor(x)
}
export function park(x, t, { sky = '#7fb8e8', grass = '#4caf6a', night = false } = {}) {
  R(x, night ? '#1c1640' : sky, 0, 0, PW, FLOOR)
  if (!night) { drawBits(x, ['..WWW...', '.WWWWWW.', 'WWWWWWWW'], { W: '#f4f1ea' }, 120 + 10 * Math.sin(t * 0.5), 120, 12, { outline: null }); drawBits(x, ['..WWW..', 'WWWWWWW'], { W: '#f4f1ea' }, 380, 200, 10, { outline: null }) }
  for (const [tx, th] of [[60, 260], [440, 300]]) { R(x, INK, tx - 14, FLOOR - th + 100, 28, th - 100); R(x, '#7b5634', tx - 8, FLOOR - th + 100, 16, th - 100); drawBits(x, ['..LLL..', '.LLLLL.', 'LLLLLLL', 'LLLLLLL', '.LLLLL.'], { L: '#2f8a4c' }, tx, FLOOR - th + 70, 24) }
  R(x, INK, 0, FLOOR - 6, PW, 10); R(x, grass, 0, FLOOR + 4, PW, 300); for (let i = 0; i < PW; i += 36) R(x, '#3e9a5a', i, FLOOR + 10 + (i % 3) * 20, 8, 14)
}
export function bedroomDark(x, t, { glow = 0 } = {}) {
  R(x, '#141030', 0, 0, PW, FLOOR); windowNight(x, 300, 100, 160, 140)
  drawBits(x, ['.MM.', 'M...', 'M...', '.MM.'], { M: '#f4ecc4' }, 380, 170, 9, { outline: null })
  box(x, 30, 430, 440, 120, '#3a3070', { b: 6, hi: '#4a3f86' }); box(x, 40, 400, 120, 50, BONE, { b: 5 })
  R(x, INK, 0, FLOOR - 6, PW, 10); R(x, '#201a40', 0, FLOOR + 4, PW, 300)
  if (glow > 0) { x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(330, 420, 10, 330, 420, 260); g.addColorStop(0, `rgba(170,200,255,${0.3 * glow})`); g.addColorStop(1, 'rgba(170,200,255,0)'); x.fillStyle = g; x.fillRect(0, 100, PW, 600); x.restore() }
}
export function office(x) { wallStripes(x, '#2c3a5a', '#283452', 64); windowNight(x, 40, 110, 200, 150); woodFloor(x, '#3e3a52', '#34304a') }
export function street(x, t, { day = false } = {}) {
  R(x, day ? '#8cc6ee' : '#1c1640', 0, 0, PW, FLOOR)
  if (!day) for (let i = 0; i < 14; i++) R(x, `rgba(239,230,214,${0.25 + 0.25 * Math.abs(Math.sin(t + i))})`, (i * 97) % PW, (i * 53) % 260, 4, 4)
  for (let i = 0; i < 4; i++) { const bx = i * 140 - 20, bh = 240 + (i % 2) * 90; box(x, bx, FLOOR - bh, 120, bh, day ? ['#e0a070', '#d08a8a', '#b8a070', '#c48a60'][i] : '#2d2456', { b: 4 }); for (let j = 0; j < 3; j++) R(x, day ? '#bfe8ff' : (j % 2 ? GOLD : '#5a4c8c'), bx + 22 + j * 30, FLOOR - bh + 40, 16, 22) }
  R(x, INK, 0, FLOOR - 6, PW, 10); R(x, '#5f5a7c', 0, FLOOR + 4, PW, 300); for (let i = 0; i < 6; i++) R(x, 'rgba(239,230,214,0.35)', i * 96 + 10, FLOOR + 80, 50, 8)
}

// ── props
export function plate(x, cx, cy, { food = '#e9b24a', steam = 0, t = 0, w = 130 } = {}) {
  box(x, cx - w / 2, cy, w, 14, BONE, { b: 5 })
  drawBits(x, ['.FFFF.', 'FFFFFF', 'FFFFFF'], { F: food }, cx, cy - 12, 12)
  if (steam > 0) for (let i = 0; i < 3; i++) { const ph = (t * 0.8 + i / 3) % 1; x.save(); x.globalAlpha *= steam * (1 - ph); R(x, '#efe6d6', cx - 30 + i * 28 + 8 * Math.sin(ph * 6 + i), cy - 40 - ph * 80, 8, 18); x.restore() }
}
export function cup(x, cx, cy, { col = BONE, rot = 0, fillc = '#7a4a2a' } = {}) {
  x.save(); x.translate(cx, cy); x.rotate(rot); box(x, -24, -34, 48, 56, col, { b: 5 }); R(x, fillc, -20, -30, 40, 8); R(x, INK, 24, -20, 12, 6); R(x, INK, 30, -20, 6, 24); R(x, INK, 24, 0, 12, 6); x.restore()
}
export function splash(x, cx, cy, k, { col = '#8a5a34' } = {}) {
  if (k <= 0) return
  for (let i = 0; i < 9; i++) { const a = -Math.PI * (0.1 + 0.8 * i / 8), r = 30 + 70 * k; drawBits(x, ['.D.', 'DDD', '.D.'], { D: col }, cx + Math.cos(a) * r, cy + Math.sin(a) * r * 0.8, 6 + 3 * (i % 2)) }
}
export function heartsBits(x, cx, cy, cell = 6, col = PINK) { drawBits(x, HEART, { H: col }, cx, cy, cell) }
export function calendarPage(x, cx, cy, { rot = 0, rip = 0, text = 'FRI', sub = '7 PM' } = {}) {
  x.save(); x.translate(cx, cy); x.rotate(rot)
  box(x, -80, -90, 160, 180, BONE, { b: 6 }); R(x, RED, -80, -90, 160, 44)
  for (let i = 0; i < 4; i++) R(x, INK, -60 + i * 40, -100, 8, 22)
  x.font = `800 44px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 8); x.font = `700 22px ${MONO}`; x.fillText(sub, 0, 56)
  if (rip > 0) { x.save(); x.translate(lerp(0, 120, rip), lerp(0, -40, rip)); x.rotate(rip * 0.6); x.globalAlpha *= 1 - rip * 0.3; R(x, '#ddd2bf', 0, -90, 80, 180); x.restore() }
  x.restore()
}
export function stamp(x, text, cx, cy, k, { col = RED, rot = -0.2, size = 40 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); const s = lerp(1.8, 1, ease.outCubic(clamp(k))); x.scale(s, s); x.globalAlpha *= clamp(k * 2)
  x.font = `800 ${size}px ${INTER}`; const w = x.measureText(text).width + 30
  x.strokeStyle = col; x.lineWidth = 6; x.strokeRect(-w / 2, -size * 0.75, w, size * 1.5)
  x.fillStyle = col; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 2)
  x.restore()
}
export function balloonText(x, text, cx, cy, { size = 30, col = BONE, rot = 0 } = {}) {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.font = `800 ${size}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.lineWidth = 8; x.strokeStyle = INK; x.strokeText(text, 0, 0); x.fillStyle = col; x.fillText(text, 0, 0); x.restore()
}
export { prog, ease, clamp, lerp, shadow }
