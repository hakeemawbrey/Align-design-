// Houston Star Talk · worker w10 (hst236–hst260): props for the courtroom (court) and nature-doc (doc) parodies.
// Pure functions of t; no document at module top level. Episodes: w10court.js (hst236–247), w10doc.js (hst248–260).
import { clamp, prog, ease } from '../../src/lib.js'
import { FLOOR, box, txt } from '../starrace/ep.js'
import { label, pop01, signChar, GOLD, BONE, PINK, INK, MONO, SERIF, INTER, SKYB, MINT } from '../signs3kit.js'
import { BRAKE, HGREEN } from './kit.js'

export const Y = 1255
export const BADGE = { text: 'HOU BETA · JAN 9', x: 230, y: 150 }
export const STING = [['glitter', 0.0, 0.7], ['pop', 0.02, 880, 0.03, 0]]
export const Kp = (lt, a, d = 0.3) => clamp(ease.outBack(prog(lt, a, a + d)))
/** a sticker that pops in at lt=a for d seconds, at any height (ep.js stickers sit at y=640) */
export function stamp(x, t, lt, a, d, text, { bg = PINK, y = 640, cx = 540, size = 50, rot = -0.04 } = {}) {
  if (lt < a || lt > a + d) return
  label(x, cx, y, text, pop01(t, t - lt + a, 0.3, 1.8) * (1 - ease.inQuad(prog(lt, a + d - 0.3, a + d))), { size, bg, rot })
}
/** a gavel cue at t: a woody knock */
export const BANG = t => [['pluck', t, 110, 0.05, 0.45, 0], ['pop', t + 0.01, 220, 0.02, 0]]

// ── courtroom ────────────────────────────────────────────────────────────────────────────────────────────────
export const COURT = {
  wood: { wall: '#3a2418', a: '#4a2e1e', b: '#422818', bench: '#6b3b1f', lip: '#8a5530', floor: '#2a1a10', head: GOLD },
  marble: { wall: '#2b3346', a: '#3a4560', b: '#34405a', bench: '#5a6684', lip: '#c9d2e6', floor: '#1d2232', head: '#bfe6ff' },
  rose: { wall: '#4a1f36', a: '#5a2842', b: '#52223c', bench: '#8a3a5c', lip: '#ff8fb1', floor: '#2a1020', head: PINK },
  mint: { wall: '#1d3a34', a: '#25483f', b: '#21423a', bench: '#2f6a58', lip: MINT, floor: '#122822', head: MINT },
  night: { wall: '#1a1638', a: '#221d48', b: '#1e1a40', bench: '#3b2f6e', lip: '#c9a6ff', floor: '#0f0c24', head: '#c9a6ff' },
  sun: { wall: '#5a3a1a', a: '#6a4620', b: '#62401c', bench: '#9a5e24', lip: '#ffd36b', floor: '#2e1c0c', head: '#ffd36b' },
}
/** a courtroom in a palette, with a headline plate under the floor line */
export function court(x, t, pal, head = '', { bench = true } = {}) {
  const P = COURT[pal] || COURT.wood
  x.fillStyle = P.wall; x.fillRect(0, 0, 1080, 1920)
  for (let k = 0; k < 9; k++) { x.fillStyle = k % 2 ? P.a : P.b; x.fillRect(k * 120, 300, 120, 1100) }
  x.fillStyle = 'rgba(0,0,0,0.18)'; for (let k = 0; k < 9; k++) x.fillRect(k * 120 + 112, 300, 8, 1100)
  if (bench) { box(x, 220, 640, 640, 260, P.bench, 8); x.fillStyle = P.lip; x.fillRect(220, 640, 640, 22); scales(x, 540, 790, t, 0.8) }
  x.fillStyle = P.floor; x.fillRect(0, 1340, 1080, 580)
  if (head) txt(x, head, 540, 1420, { size: head.length > 26 ? 38 : head.length > 20 ? 44 : 50, col: P.head, font: MONO, weight: 700 })
}
/** balance scales (a generic justice prop), tipping with tilt */
export function scales(x, cx, cy, t, s = 1, tilt = Math.sin(t * 1.4) * 0.12) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  box(x, -6, -70, 12, 120, '#e8c27a', 3); box(x, -40, 50, 80, 14, '#e8c27a', 3)
  x.save(); x.translate(0, -70); x.rotate(tilt); box(x, -110, -5, 220, 10, '#e8c27a', 3)
  for (const sx of [-1, 1]) { const py = sx * Math.sin(tilt) * 0; x.strokeStyle = '#e8c27a'; x.lineWidth = 3; x.beginPath(); x.moveTo(sx * 100, 0); x.lineTo(sx * 80, 50 + py); x.moveTo(sx * 100, 0); x.lineTo(sx * 120, 50 + py); x.stroke(); x.fillStyle = INK; x.fillRect(sx * 100 - 34, 48, 68, 14); x.fillStyle = '#e8c27a'; x.fillRect(sx * 100 - 30, 50, 60, 10) }
  x.restore(); x.restore()
}
/** the witness stand (front panel), drawn in front of a star at the right */
export function stand(x, cx = 780, pal = 'wood') {
  const P = COURT[pal] || COURT.wood
  box(x, cx - 170, Y + 40, 340, 100, P.bench, 7); x.fillStyle = P.lip; x.fillRect(cx - 170, Y + 40, 340, 14)
  txt(x, 'WITNESS', cx, Y + 96, { size: 30, col: P.lip, font: MONO, weight: 700 })
}
/** the jury box rail */
export function juryRail(x, pal = 'wood', y = 1000) { const P = COURT[pal] || COURT.wood; box(x, 70, y, 940, 70, P.bench, 7); x.fillStyle = P.lip; x.fillRect(70, y, 940, 14); txt(x, 'THE JURY', 540, y + 44, { size: 28, col: P.lip, font: MONO, weight: 700 }) }
/** an exhibit on an easel: draw(cx, cy) paints the picture; tag = 'EXHIBIT A' */
export function easel(x, cx, cy, k, tag, draw, { w = 420, h = 340 } = {}) {
  if (k <= 0) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.translate(-cx, -cy)
  x.strokeStyle = INK; x.lineWidth = 14; x.beginPath(); x.moveTo(cx - w * 0.3, cy + h / 2); x.lineTo(cx - w * 0.42, cy + h / 2 + 200); x.moveTo(cx + w * 0.3, cy + h / 2); x.lineTo(cx + w * 0.42, cy + h / 2 + 200); x.stroke()
  x.strokeStyle = '#8a5530'; x.lineWidth = 8; x.stroke()
  box(x, cx - w / 2, cy - h / 2, w, h, BONE, 8)
  x.save(); x.beginPath(); x.rect(cx - w / 2, cy - h / 2, w, h); x.clip(); draw?.(cx, cy + 10, w, h); x.restore()
  label(x, cx, cy - h / 2 - 6, tag, 1, { size: 30, bg: GOLD, rot: -0.03, font: MONO, weight: 700 })
  x.restore()
}
/** a white judge's collar (jabot) worn by a star */
export function jabot(x, P, id) { const [cx, cy, s] = P.at(id); x.fillStyle = INK; x.beginPath(); x.moveTo(cx - s * 0.16 - 5, cy + s * 0.2); x.lineTo(cx + s * 0.16 + 5, cy + s * 0.2); x.lineTo(cx, cy + s * 0.46 + 6); x.fill(); x.fillStyle = BONE; x.beginPath(); x.moveTo(cx - s * 0.16, cy + s * 0.22); x.lineTo(cx + s * 0.16, cy + s * 0.22); x.lineTo(cx, cy + s * 0.44); x.fill() }
/** reading glasses (the aunties) worn by a star */
export function specs(x, P, id, col = '#c0304a') {
  const [cx, cy, s] = P.at(id), r = s * 0.1, ey = cy - s * 0.02
  x.strokeStyle = INK; x.lineWidth = 9; for (const sx of [-1, 1]) { x.beginPath(); x.arc(cx + sx * s * 0.13, ey, r, 0, Math.PI * 2); x.stroke() }
  x.strokeStyle = col; x.lineWidth = 5; for (const sx of [-1, 1]) { x.beginPath(); x.arc(cx + sx * s * 0.13, ey, r, 0, Math.PI * 2); x.stroke() }
  x.beginPath(); x.moveTo(cx - s * 0.03, ey); x.lineTo(cx + s * 0.03, ey); x.stroke()
}
/** a phone held up (a generic chat bubble or a word on screen) */
export function phone(x, cx, cy, s, text, { col = '#bfe6ff', sub = null } = {}) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  box(x, -70, -130, 140, 260, INK, 5); x.fillStyle = col; x.fillRect(-60, -116, 120, 226)
  box(x, -52, -70, 104, 54, '#ffffff', 3); txt(x, text, 0, -42, { size: text.length > 6 ? 18 : 24, col: INK })
  if (sub) txt(x, sub, 0, 40, { size: 18, col: INK, font: MONO, weight: 700 })
  x.restore()
}
/** a speaking cloud (the humidity, the cold front) with a face */
export function cloud(x, cx, cy, s, t, { col = '#dfe6f2', mood = 'smug' } = {}) {
  x.save(); x.translate(cx, cy + Math.sin(t * 2) * 8); x.scale(s, s)
  const B = [[-90, 10, 70], [-20, -30, 90], [70, 0, 75], [0, 30, 80]]
  x.fillStyle = INK; for (const [bx, by, r] of B) { x.beginPath(); x.arc(bx, by, r + 7, 0, Math.PI * 2); x.fill() }
  x.fillStyle = col; for (const [bx, by, r] of B) { x.beginPath(); x.arc(bx, by, r, 0, Math.PI * 2); x.fill() }
  x.fillStyle = INK; const bl = (t % 2.7) < 0.12 ? 3 : 16; x.fillRect(-40, -10, 16, bl); x.fillRect(24, -10, 16, bl)
  if (mood === 'smug') { x.fillRect(-20, 34, 44, 8); x.fillRect(24, 26, 8, 10) } else { x.fillRect(-20, 30, 40, 8) }
  x.restore()
}
/** a thermostat on a wall */
export function thermostat(x, cx, cy, s, deg, t) {
  x.save(); x.translate(cx, cy); x.scale(s, s); box(x, -80, -100, 160, 200, BONE, 6); box(x, -56, -70, 112, 80, '#14213a', 4)
  txt(x, deg, 0, -30, { size: 46, col: SKYB, font: MONO, weight: 700 }); x.fillStyle = INK; x.fillRect(-40, 40, 30, 30); x.fillRect(10, 40, 30, 30); x.restore()
}
/** frost crystals in the corners (an arctic office) */
export function frost(x, a = 1) {
  x.save(); x.globalAlpha = a; x.strokeStyle = 'rgba(220,240,255,0.8)'; x.lineWidth = 5
  for (const [cx, cy] of [[0, 300], [1080, 300], [0, 1340], [1080, 1340]]) for (let k = 0; k < 7; k++) { const an = k * Math.PI / 12 + (cx ? Math.PI / 2 : 0) + (cy > 800 ? (cx ? Math.PI / 2 : -Math.PI / 2) : 0); x.beginPath(); x.moveTo(cx, cy); x.lineTo(cx + Math.cos(an) * 160, cy + Math.sin(an) * 160); x.stroke() }
  x.restore()
}
/** a hanging sweater / cardigan prop */
export function sweater(x, cx, cy, s = 1, col = '#c9a6ff') { x.save(); x.translate(cx, cy); x.scale(s, s); box(x, -80, -70, 160, 150, col, 6); box(x, -130, -70, 50, 120, col, 6); box(x, 80, -70, 50, 120, col, 6); x.fillStyle = INK; x.fillRect(-4, -60, 8, 130); for (let k = 0; k < 3; k++) { x.fillStyle = BONE; x.fillRect(10, -40 + k * 40, 10, 10) } x.restore() }
/** a bowl of queso with a chip */
export function queso(x, cx, cy, s = 1) { x.save(); x.translate(cx, cy); x.scale(s, s); x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 76, 0, Math.PI); x.fill(); x.fillStyle = '#e05a3a'; x.beginPath(); x.arc(0, 0, 70, 0, Math.PI); x.fill(); x.fillStyle = INK; x.fillRect(-80, -12, 160, 16); x.fillStyle = '#ffcf4a'; x.fillRect(-72, -10, 144, 12); x.fillStyle = INK; x.beginPath(); x.moveTo(20, -8); x.lineTo(60, -70); x.lineTo(80, -8); x.fill(); x.fillStyle = '#f4d58a'; x.beginPath(); x.moveTo(28, -10); x.lineTo(60, -60); x.lineTo(72, -10); x.fill(); x.restore() }
/** a restaurant check */
export function check(x, cx, cy, s = 1, rot = -0.08) { x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s); box(x, -70, -100, 140, 200, BONE, 5); for (let k = 0; k < 5; k++) { x.fillStyle = '#9a8f80'; x.fillRect(-50, -70 + k * 30, k === 4 ? 50 : 100, 8) } txt(x, 'CHECK', 0, -84, { size: 20, col: INK, font: MONO, weight: 700 }); x.restore() }
/** a pile of crawfish (simple red pixel bugs) */
export function crawfish(x, cx, cy, s = 1, n = 5) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  for (let k = 0; k < n; k++) { const px = (k - (n - 1) / 2) * 46, py = (k % 2) * -24; x.fillStyle = INK; x.fillRect(px - 26, py - 14, 52, 28); x.fillStyle = '#e0402a'; x.fillRect(px - 22, py - 10, 44, 20); x.fillStyle = INK; x.fillRect(px + 22, py - 18, 14, 10); x.fillRect(px + 22, py + 8, 14, 10); x.fillStyle = '#ff7a5a'; x.fillRect(px - 16, py - 6, 10, 6) }
  x.restore()
}
/** a pair of cowboy boots */
export function boots(x, cx, cy, s = 1, col = '#8a4a2a') { x.save(); x.translate(cx, cy); x.scale(s, s); for (const bx of [-50, 50]) { box(x, bx - 26, -110, 52, 120, col, 5); box(x, bx - 26, 0, 80, 30, col, 5); x.fillStyle = GOLD; x.fillRect(bx - 16, -90, 32, 8); x.fillRect(bx - 16, -60, 32, 8) } x.restore() }
/** a blinker arrow (turn signal) */
export function blinker(x, cx, cy, t, on = true, s = 1) { const lit = on && Math.floor(t * 2.6) % 2 === 0; x.save(); x.translate(cx, cy); x.scale(s, s); x.fillStyle = INK; x.beginPath(); x.moveTo(-60, -40); x.lineTo(20, -40); x.lineTo(20, -70); x.lineTo(80, 0); x.lineTo(20, 70); x.lineTo(20, 40); x.lineTo(-60, 40); x.fill(); x.fillStyle = lit ? '#ffb02a' : '#5a4020'; x.beginPath(); x.moveTo(-50, -30); x.lineTo(28, -30); x.lineTo(28, -52); x.lineTo(68, 0); x.lineTo(28, 52); x.lineTo(28, 30); x.lineTo(-50, 30); x.fill(); x.restore() }
/** a postcard with a place name */
export function postcard(x, cx, cy, s, top, big, col = '#8fe3ff', rot = -0.06) { x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s); box(x, -170, -110, 340, 220, BONE, 6); x.fillStyle = col; x.fillRect(-160, -100, 320, 110); txt(x, top, 0, -70, { size: 22, col: INK, font: MONO, weight: 700 }); txt(x, big, 0, -26, { size: big.length > 12 ? 34 : 44, col: INK }); txt(x, 'wish you were here', 0, 60, { size: 26, col: INK, font: SERIF, weight: 500, italic: true }); x.restore() }
/** a hair swoosh on top of a star (Leo's hair; frizz 0..1) */
export function hair(x, P, id, frizz = 0, t = 0) {
  const [cx, cy, s] = P.at(id); if (frizz <= 0) return
  for (let k = 0; k < 9; k++) { const a = -Math.PI + k * Math.PI / 8, r = s * (0.46 + 0.2 * frizz * (1 + Math.sin(k * 3 + t * 6))), px = cx + Math.cos(a) * r, py = cy - s * 0.1 + Math.sin(a) * r * 0.9; x.fillStyle = INK; x.fillRect(px - 17, py - 17, 34, 34); x.fillStyle = '#e0a030'; x.fillRect(px - 12, py - 12, 24, 24) }
}

// ── nature doc ───────────────────────────────────────────────────────────────────────────────────────────────
/** the doc camera frame: corner brackets, a small REC dot and a soft vignette */
export function viewfinder(x, t, { rec = true } = {}) {
  const g = x.createRadialGradient(540, 900, 380, 540, 900, 1100); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,0,0.35)'); x.fillStyle = g; x.fillRect(0, 0, 1080, 1920)
  x.fillStyle = 'rgba(239,230,214,0.85)'
  for (const [cx, cy, sx, sy] of [[90, 330, 1, 1], [990, 330, -1, 1], [90, 1320, 1, -1], [990, 1320, -1, -1]]) { x.fillRect(cx, cy, 70 * sx, 8 * sy); x.fillRect(cx, cy, 8 * sx, 70 * sy) }
  if (rec && Math.floor(t * 1.5) % 2 === 0) { x.fillStyle = BRAKE; x.beginPath(); x.arc(930, 380, 12, 0, Math.PI * 2); x.fill() }
}
/** sky gradient (sunset, dawn, noon, dusk) over the whole frame top */
export function sky(x, top, bot, y1 = FLOOR + 60) { const g = x.createLinearGradient(0, 0, 0, y1); g.addColorStop(0, top); g.addColorStop(1, bot); x.fillStyle = g; x.fillRect(0, 0, 1080, y1) }
export const SKIES = { sunset: ['#3b2a6e', '#ff9a5a'], dawn: ['#5a6aa8', '#ffd1a0'], noon: ['#5ec8ff', '#cfefff'], dusk: ['#1a1638', '#8a4a8a'], night: ['#0b0820', '#2a1d52'], gulf: ['#8fd0ff', '#f4e8c8'] }
/** a pixel tree (round crown) or a pine */
export function tree(x, cx, base, s = 1, pine = false, col = '#2f7a4a') {
  x.save(); x.translate(cx, base); x.scale(s, s); box(x, -14, -120, 28, 120, '#6b3b1f', 4)
  if (pine) { for (let k = 0; k < 3; k++) { x.fillStyle = INK; x.beginPath(); x.moveTo(-90 + k * 16, -100 - k * 90); x.lineTo(0, -230 - k * 90); x.lineTo(90 - k * 16, -100 - k * 90); x.fill(); x.fillStyle = col; x.beginPath(); x.moveTo(-80 + k * 16, -106 - k * 90); x.lineTo(0, -220 - k * 90); x.lineTo(80 - k * 16, -106 - k * 90); x.fill() } }
  else { x.fillStyle = INK; x.beginPath(); x.arc(0, -180, 106, 0, Math.PI * 2); x.fill(); x.fillStyle = col; x.beginPath(); x.arc(0, -180, 98, 0, Math.PI * 2); x.fill(); x.fillStyle = 'rgba(255,255,255,0.12)'; x.beginPath(); x.arc(-30, -210, 40, 0, Math.PI * 2); x.fill() }
  x.restore()
}
/** a bayou: grassy banks, slow brown-green water, a trail */
export function bayou(x, t, { skyc = SKIES.dawn, city = true } = {}) {
  sky(x, skyc[0], skyc[1], 1100)
  if (city) { for (const [l, w, h] of [[300, 80, 260], [400, 110, 380], [530, 90, 300], [640, 120, 420], [780, 80, 240]]) { x.fillStyle = 'rgba(40,30,80,0.55)'; x.fillRect(l, 1100 - h, w, h) } }
  x.fillStyle = '#3f7a3a'; x.fillRect(0, 1000, 1080, 140)
  x.fillStyle = '#4f6a4a'; x.fillRect(0, 1140, 1080, 170)
  for (let k = 0; k < 14; k++) { const y = 1150 + (k * 37) % 150, ph = (t * 40 + k * 90) % 1200 - 60; x.fillStyle = 'rgba(220,230,200,0.25)'; x.fillRect(ph, y, 60, 5) }
  x.fillStyle = '#3f7a3a'; x.fillRect(0, 1310, 1080, 610); x.fillStyle = '#c9b48a'; x.fillRect(0, 1360, 1080, 70); x.fillStyle = INK; x.fillRect(0, 1356, 1080, 6)
  for (let k = 0; k < 4; k++) tree(x, 80 + k * 300 + (k % 2) * 60, 1020, 0.7 + (k % 2) * 0.2, false, k % 2 ? '#2f7a4a' : '#3d8a52')
}
/** a Heights-style bungalow with a deep porch, a swing and string lights */
export function bungalow(x, t, { skyc = SKIES.noon } = {}) {
  sky(x, skyc[0], skyc[1]); x.fillStyle = '#4f8a42'; x.fillRect(0, FLOOR + 60, 1080, 1920)
  box(x, 120, 620, 840, 760, '#7fb0c8', 8); x.fillStyle = BONE; for (let k = 0; k < 18; k++) x.fillRect(120, 640 + k * 42, 840, 4)
  x.fillStyle = INK; x.beginPath(); x.moveTo(60, 640); x.lineTo(540, 360); x.lineTo(1020, 640); x.fill(); x.fillStyle = '#5a3a5a'; x.beginPath(); x.moveTo(90, 630); x.lineTo(540, 380); x.lineTo(990, 630); x.fill()
  box(x, 120, 900, 840, 30, BONE, 6); for (const px of [150, 520, 930]) box(x, px - 14, 930, 28, 450, BONE, 5)
  for (let k = 0; k < 14; k++) { const lx = 160 + k * 56, ly = 950 + Math.sin(k * 0.9) * 14, on = Math.sin(t * 3 + k) > -0.4; x.fillStyle = on ? '#ffd36b' : '#7a6a3a'; x.beginPath(); x.arc(lx, ly, 9, 0, Math.PI * 2); x.fill() }
  box(x, 600, 1040, 200, 180, '#bfe6ff', 6); box(x, 260, 1040, 180, 300, '#8a4a2a', 6)
}
/** a late-night food strip (generic signs: BOBA, PHO, HOT POT, KARAOKE) */
export function foodStrip(x, t, words = ['BOBA', 'PHO', 'HOT POT', 'KARAOKE']) {
  sky(x, '#0b0820', '#2a1d52'); x.fillStyle = '#221b38'; x.fillRect(0, FLOOR + 60, 1080, 1920)
  const cols = ['#ff8fb1', '#7dffb0', '#ffd36b', '#8fe3ff']
  words.forEach((w, i) => {
    const l = 30 + i * 260, h = 520 + (i % 2) * 120
    box(x, l, FLOOR + 60 - h, 240, h, ['#2a2450', '#30285a'][i % 2], 6)
    const on = Math.sin(t * 2.2 + i * 1.3) > -0.7; x.save(); x.shadowColor = cols[i]; x.shadowBlur = on ? 30 : 0
    box(x, l + 14, FLOOR + 60 - h + 30, 212, 90, '#120c24', 5); txt(x, w, l + 120, FLOOR + 60 - h + 76, { size: w.length > 5 ? 34 : 46, col: on ? cols[i] : '#5a5070' }); x.restore()
    box(x, l + 40, FLOOR - 220, 160, 200, '#ffd9a0', 5)
  })
}
/** a bridge over the bayou at dusk with bats pouring out (generic) */
export function batBridge(x, t, lt, n = 40) {
  sky(x, '#2a1d52', '#ff8a5a', 1200); x.fillStyle = '#3a5a3a'; x.fillRect(0, 1180, 1080, 740); x.fillStyle = '#5a6a7a'; x.fillRect(0, 1200, 1080, 120)
  box(x, -20, 980, 1120, 90, '#8f96a0', 8); for (const px of [200, 540, 880]) box(x, px - 30, 1070, 60, 200, '#8f96a0', 6)
  for (let k = 0; k < n; k++) { const ph = (lt * 0.35 + k / n) % 1, bx = 120 + (k * 211) % 840 + Math.sin(lt * 3 + k) * 60 + ph * 160, by = 1050 - ph * 700 - (k % 5) * 20; if (ph < 0.02) continue; const f = Math.floor(t * 10 + k) % 2; x.fillStyle = INK; x.fillRect(bx - 4, by - 3, 8, 6); x.fillRect(bx - 14, by - (f ? 8 : 0), 10, 4); x.fillRect(bx + 4, by - (f ? 8 : 0), 10, 4) }
}
/** a park lake with paddle boats */
export function paddleLake(x, t, { skyc = SKIES.noon } = {}) {
  sky(x, skyc[0], skyc[1], 980); x.fillStyle = '#4f8a42'; x.fillRect(0, 900, 1080, 120)
  for (let k = 0; k < 5; k++) tree(x, 100 + k * 220, 960, 0.6, false)
  x.fillStyle = '#3a7aa8'; x.fillRect(0, 1000, 1080, 920); for (let k = 0; k < 20; k++) { const y = 1020 + (k * 53) % 600, ph = (t * 30 + k * 70) % 1180 - 50; x.fillStyle = 'rgba(255,255,255,0.18)'; x.fillRect(ph, y, 50, 5) }
}
/** a paddle boat (swan-ish pixel shape) at cx, cy; a star sits in it */
export function paddleBoat(x, cx, cy, t, col = '#ff8fb1') { const b = Math.sin(t * 2 + cx) * 6; x.save(); x.translate(cx, cy + b); box(x, -150, -30, 300, 80, col, 7); box(x, 110, -130, 40, 110, col, 6); box(x, 110, -150, 70, 40, col, 6); x.fillStyle = INK; x.fillRect(150, -140, 10, 10); x.fillStyle = 'rgba(255,255,255,0.4)'; x.fillRect(-140, 54, 280, 6); x.restore() }
/** the downtown tunnel: a tiled corridor with little shopfronts */
export function tunnel(x, t, { closed = false } = {}) {
  x.fillStyle = '#d9d2c4'; x.fillRect(0, 0, 1080, 1920)
  x.fillStyle = '#c4bba9'; for (let k = 0; k < 12; k++) x.fillRect(0, 300 + k * 90, 1080, 4)
  x.fillStyle = '#f4f0e4'; x.fillRect(0, 300, 1080, 60); for (let k = 0; k < 5; k++) { x.fillStyle = 'rgba(255,255,240,0.9)'; x.fillRect(60 + k * 220, 316, 140, 26) }
  for (const [l, w] of [['LUNCH', 60], ['SALAD', 400], ['SHOES', 740]]) { box(x, w, 600, 280, 380, '#8f96a0', 6); box(x, w + 20, 620, 240, 70, '#2b5fb0', 4); txt(x, l, w + 140, 656, { size: 40, col: BONE }); box(x, w + 30, 720, 220, 240, closed ? '#5a5a66' : '#bfe6ff', 4) }
  x.fillStyle = '#9a917f'; x.fillRect(0, FLOOR + 60, 1080, 1920); for (let k = 0; k < 12; k++) { x.fillStyle = k % 2 ? '#a89f8c' : '#9a917f'; x.fillRect(k * 90, FLOOR + 60, 90, 600) }
  if (closed) { x.save(); x.translate(540, 1080); x.rotate(-0.05); box(x, -300, -60, 600, 120, BRAKE, 6); txt(x, 'CLOSED SAT · SUN', 0, 4, { size: 50, col: BONE }); x.restore() }
}
/** a row of identical skinny townhomes (EaDo) */
export function townhomes(x, t, { skyc = SKIES.noon, mark = -1 } = {}) {
  sky(x, skyc[0], skyc[1]); x.fillStyle = '#6a6a72'; x.fillRect(0, FLOOR + 60, 1080, 1920)
  for (let k = 0; k < 5; k++) { const l = 20 + k * 212; box(x, l, 520, 196, 880, '#e8e4dc', 6); box(x, l, 520, 196, 70, '#3a3a44', 4); for (let r = 0; r < 3; r++) box(x, l + 40, 640 + r * 200, 116, 120, '#2a3a4a', 4); box(x, l + 60, 1240, 76, 160, k === mark ? '#ffd36b' : '#3a3a44', 4) }
}
/** the gulf: brown-ish water, a sandy beach, a pier */
export function gulf(x, t) {
  sky(x, SKIES.gulf[0], SKIES.gulf[1], 980); x.fillStyle = '#a88a5a'; x.fillRect(0, 900, 1080, 420)
  for (let k = 0; k < 6; k++) { const y = 940 + k * 60, ph = Math.sin(t * 1.6 + k) * 30; x.fillStyle = 'rgba(255,250,230,0.5)'; x.fillRect(ph - 40, y, 1160, 6) }
  x.fillStyle = '#f0d9a0'; x.fillRect(0, 1300, 1080, 620); x.fillStyle = INK; x.fillRect(0, 1296, 1080, 6)
  box(x, 760, 820, 340, 30, '#8a6a4a', 5); for (const px of [800, 900, 1000]) box(x, px, 850, 18, 260, '#8a6a4a', 4)
  for (let k = 0; k < 3; k++) { const gx = (t * 60 + k * 400) % 1300 - 100, gy = 600 + k * 60 + Math.sin(t * 3 + k) * 20; x.strokeStyle = INK; x.lineWidth = 5; x.beginPath(); x.moveTo(gx - 24, gy); x.quadraticCurveTo(gx - 12, gy - 14, gx, gy); x.quadraticCurveTo(gx + 12, gy - 14, gx + 24, gy); x.stroke() }
}
/** a marina: masts, water, a dock */
export function marina(x, t) {
  sky(x, SKIES.dawn[0], SKIES.dawn[1], 1000); x.fillStyle = '#3a6a9a'; x.fillRect(0, 960, 1080, 400)
  for (let k = 0; k < 4; k++) { const bx = 120 + k * 260, b = Math.sin(t * 1.5 + k) * 6; box(x, bx - 90, 1000 + b, 180, 50, BONE, 5); box(x, bx - 4, 640 + b, 8, 360, '#e8e4dc', 3); x.fillStyle = INK; x.beginPath(); x.moveTo(bx + 6, 660 + b); x.lineTo(bx + 90, 960 + b); x.lineTo(bx + 6, 960 + b); x.fill(); x.fillStyle = BONE; x.beginPath(); x.moveTo(bx + 10, 680 + b); x.lineTo(bx + 80, 950 + b); x.lineTo(bx + 10, 950 + b); x.fill() }
  x.fillStyle = '#8a6a4a'; x.fillRect(0, 1340, 1080, 580); for (let k = 0; k < 12; k++) { x.fillStyle = 'rgba(0,0,0,0.15)'; x.fillRect(k * 90, 1340, 5, 580) }
}
/** tall pines (The Woodlands) with a winding path */
export function pines(x, t, { skyc = SKIES.noon } = {}) {
  sky(x, skyc[0], skyc[1]); x.fillStyle = '#3d6a3a'; x.fillRect(0, FLOOR + 60, 1080, 1920)
  for (let k = 0; k < 7; k++) tree(x, 40 + k * 170, FLOOR + 60 - (k % 2) * 40, 1.25 + (k % 3) * 0.15, true, ['#2f6a3a', '#3a7a44', '#24583a'][k % 3])
  x.fillStyle = '#c9b48a'; x.beginPath(); x.moveTo(440, 1920); x.quadraticCurveTo(560, 1500, 520, FLOOR + 60); x.lineTo(600, FLOOR + 60); x.quadraticCurveTo(680, 1500, 700, 1920); x.fill()
}
/** a bedroom closet: rail, hangers, a shelf; the boots under it */
export function closet(x, t, { open = 1 } = {}) {
  x.fillStyle = '#3a2a4a'; x.fillRect(0, 0, 1080, 1920)
  box(x, 140, 420, 800, 960, '#1a1228', 8); box(x, 160, 520, 760, 14, '#c9b48a', 3)
  const cols = ['#ff8fb1', '#8fe3ff', '#ffd36b', '#7dffb0', '#c9a6ff', '#e05a3a']
  for (let k = 0; k < 6; k++) { const hx = 230 + k * 120, sw = Math.sin(t * 2 + k) * 0.05; x.save(); x.translate(hx, 534); x.rotate(sw); box(x, -46, 20, 92, 260, cols[k], 5); x.restore() }
  x.fillStyle = '#5a4a3a'; x.fillRect(0, FLOOR + 60, 1080, 1920)
  const d = 400 * (1 - clamp(open)); box(x, 140, 420, d, 960, '#7a5a3a', 8); box(x, 940 - d, 420, d, 960, '#7a5a3a', 8)
}
/** a Montrose-ish plant shelf with pothos and a vintage lamp */
export function plants(x, t) {
  x.fillStyle = '#2e5a4a'; x.fillRect(0, 0, 1080, 1920)
  for (let r = 0; r < 3; r++) { box(x, 80, 560 + r * 260, 920, 22, '#c98e5a', 5); for (let k = 0; k < 5; k++) { const px = 160 + k * 190 + (r % 2) * 50, py = 560 + r * 260; box(x, px - 40, py - 80, 80, 80, ['#c9783a', '#e8c27a', '#ff8fb1'][(k + r) % 3], 5); for (let l = 0; l < 6; l++) { const a = -Math.PI / 2 + (l - 2.5) * 0.4 + Math.sin(t * 1.5 + k + l) * 0.05, L = 60 + (l % 3) * 25; x.fillStyle = INK; x.beginPath(); x.ellipse(px + Math.cos(a) * L, py - 80 + Math.sin(a) * L, 22, 13, a, 0, Math.PI * 2); x.fill(); x.fillStyle = ['#4fae5a', '#7dbf5a'][l % 2]; x.beginPath(); x.ellipse(px + Math.cos(a) * L, py - 80 + Math.sin(a) * L, 18, 10, a, 0, Math.PI * 2); x.fill() } } }
  x.fillStyle = '#6b4a3a'; x.fillRect(0, FLOOR + 60, 1080, 1920)
}
/** generic run-club pace flag and joggers' path (Memorial-style loop) */
export function trailLoop(x, t, { skyc = SKIES.dawn } = {}) {
  sky(x, skyc[0], skyc[1]); x.fillStyle = '#3d7a3a'; x.fillRect(0, FLOOR + 60, 1080, 1920)
  for (let k = 0; k < 6; k++) tree(x, 60 + k * 200, FLOOR - 40, 1 + (k % 2) * 0.3, k % 3 === 0, ['#2f7a4a', '#3d8a52', '#24683a'][k % 3])
  x.fillStyle = '#c9a070'; x.fillRect(0, FLOOR + 90, 1080, 110); x.fillStyle = 'rgba(0,0,0,0.12)'; for (let k = 0; k < 20; k++) x.fillRect(((k * 97) - t * 200) % 1180 + 1080 * (((k * 97) - t * 200) % 1180 < -100 ? 1 : 0), FLOOR + 110 + (k % 4) * 22, 20, 6)
  txt(x, `MILE ${(1 + Math.floor(t / 3) % 3)}`, 900, FLOOR - 80, { size: 30, col: BONE, font: MONO, weight: 700 })
}
/** a boba cup */
export function boba(x, cx, cy, s = 1, col = '#d9b48a') { x.save(); x.translate(cx, cy); x.scale(s, s); x.fillStyle = INK; x.beginPath(); x.moveTo(-56, -90); x.lineTo(56, -90); x.lineTo(44, 90); x.lineTo(-44, 90); x.fill(); x.fillStyle = col; x.beginPath(); x.moveTo(-48, -80); x.lineTo(48, -80); x.lineTo(38, 82); x.lineTo(-38, 82); x.fill(); x.fillStyle = INK; for (let k = 0; k < 7; k++) { x.beginPath(); x.arc(-26 + (k % 4) * 17, 60 - Math.floor(k / 4) * 16, 8, 0, Math.PI * 2); x.fill() } box(x, 6, -170, 14, 100, PINK, 3); x.restore() }
/** a steaming bowl (pho / hot pot) */
export function bowl(x, cx, cy, t, s = 1) { x.save(); x.translate(cx, cy); x.scale(s, s); x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 96, 0, Math.PI); x.fill(); x.fillStyle = BONE; x.beginPath(); x.arc(0, 0, 90, 0, Math.PI); x.fill(); x.fillStyle = '#c9783a'; x.fillRect(-86, -10, 172, 14); for (let k = 0; k < 3; k++) { const ph = (t * 0.7 + k / 3) % 1; x.strokeStyle = `rgba(255,255,255,${(0.7 * (1 - ph)).toFixed(2)})`; x.lineWidth = 6; x.beginPath(); x.moveTo(-40 + k * 40, -20 - ph * 120); x.quadraticCurveTo(-20 + k * 40, -60 - ph * 120, -40 + k * 40, -100 - ph * 120); x.stroke() } x.restore() }
/** a mic (karaoke) */
export function mic(x, cx, cy, s = 1) { x.save(); x.translate(cx, cy); x.scale(s, s); box(x, -12, 0, 24, 110, '#5a5a66', 4); x.fillStyle = INK; x.beginPath(); x.arc(0, -10, 34, 0, Math.PI * 2); x.fill(); x.fillStyle = '#8f96a0'; x.beginPath(); x.arc(0, -10, 28, 0, Math.PI * 2); x.fill(); x.restore() }
/** a field-notes clipboard for the narrator star (in front of a star) */
export function binoculars(x, P, id) { const [cx, cy, s] = P.at(id); for (const sx of [-1, 1]) { box(x, cx + sx * s * 0.14 - s * 0.09, cy - s * 0.1, s * 0.18, s * 0.2, '#3a3a44', 5); x.fillStyle = '#8fe3ff'; x.fillRect(cx + sx * s * 0.14 - s * 0.05, cy - s * 0.06, s * 0.1, s * 0.06) } }
/** a dog in a bandana (Heights) */
export function dog(x, cx, base, t, col = '#c98e5a', band = BRAKE) { const w = Math.sin(t * 10) * 10; x.save(); x.translate(cx, base); box(x, -70, -90, 140, 60, col, 5); box(x, 50, -140, 60, 60, col, 5); box(x, 90, -150, 16, 24, '#8a5a3a', 3); for (const lx of [-60, -20, 30, 56]) box(x, lx - 8, -30, 16, 30, col, 3); x.fillStyle = INK; x.fillRect(86, -124, 8, 8); x.save(); x.translate(-70, -80); x.rotate(-0.6 + w * 0.03); box(x, -40, -6, 40, 12, col, 3); x.restore(); x.fillStyle = band; x.beginPath(); x.moveTo(44, -96); x.lineTo(110, -96); x.lineTo(78, -66); x.fill(); x.restore() }
/** a big pixel sun low on the horizon */
export function lowSun(x, cx, cy, r = 110, col = '#ffb05a') { x.fillStyle = INK; x.beginPath(); x.arc(cx, cy, r + 6, 0, Math.PI * 2); x.fill(); x.fillStyle = col; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill() }
/** a tape-measure / note card a narrator holds */
export function card(x, cx, cy, s, l1, l2 = '', col = BONE) { x.save(); x.translate(cx, cy); x.rotate(-0.05); x.scale(s, s); box(x, -150, -80, 300, 160, col, 6); txt(x, l1, 0, l2 ? -26 : 0, { size: 38, col: INK }); if (l2) txt(x, l2, 0, 32, { size: 30, col: INK, font: MONO, weight: 700 }); x.restore() }
export { HGREEN, BRAKE, GOLD, BONE, PINK, INK, MONO, SERIF, INTER, SKYB, MINT, signChar }
/** cold-day outfit that keeps the face clear: a beanie with a pompom, a scarf, puffy sleeves */
export function coat(x, P, id, col = '#e05a3a', hat = '#2b5fb0') {
  const [cx, cy, s] = P.at(id); if (s < 40) return
  for (const sx of [-1, 1]) box(x, cx + sx * s * 0.42 - s * 0.11, cy - s * 0.02, s * 0.22, s * 0.2, col, 5)
  box(x, cx - s * 0.36, cy + s * 0.16, s * 0.72, s * 0.12, col, 5); box(x, cx + s * 0.1, cy + s * 0.2, s * 0.13, s * 0.26, col, 4)
  box(x, cx - s * 0.2, cy - s * 0.5, s * 0.4, s * 0.12, hat, 4); x.fillStyle = BONE; x.beginPath(); x.arc(cx, cy - s * 0.56, s * 0.06, 0, Math.PI * 2); x.fill()
}
