// Houston Star Talk · worker w11 props (mission control + movie-trailer parodies). Pure functions of t; no document.
// Generic shapes only: no agency, studio, rating-board, team or brand marks.
import { clamp, ease, prog } from '../../src/lib.js'
import { label, sparkles, pop01, signChar, GOLD, BONE, PINK, INK, INTER, MONO, SERIF, MINT, SKYB, LAV } from '../signs3kit.js'
import { box, txt, FLOOR, outside } from '../starrace/ep.js'
import { skyline, BRAKE, HGREEN } from './kit.js'

export const Y = 1255
export const BADGE = { text: 'HOU BETA · JAN 9', x: 230, y: 150 }
// t=0 sting: the calm mix keeps bells/toms (pop + glitter are dropped), so the hook lands with sound on frame 0
export const STING = [['glitter', 0.0, 0.7], ['pop', 0.02, 880, 0.03, 0], ['bell', 0.0, 1318.51, 0.03, 1.4, 0], ['tom', 0.02, 110, { gain: 0.22, decay: 0.3 }]]
export const Kp = (lt, a, d = 0.3) => clamp(ease.outBack(prog(lt, a, a + d)))
export const fadeK = (lt, a, b, d = 0.25) => clamp((lt - a) / d) * (1 - clamp((lt - b) / d))
export const big = (x, s, y = 610, col = GOLD, size = 120) => txt(x, s, 540, y, { size, col })
export const mono = (x, s, cx, cy, size = 30, col = MINT, align = 'center') => txt(x, s, cx, cy, { size, col, font: MONO, weight: 700, align })

// ── mission control ──────────────────────────────────────────────────────────────────────────────────────
export const PAL = {
  teal: { bg: '#0d1426', scr: '#0b2232', grid: 'rgba(125,255,176,0.12)', desk: '#2a3550' },
  plum: { bg: '#1a0f2a', scr: '#22123a', grid: 'rgba(255,143,177,0.14)', desk: '#3a2552' },
  amber: { bg: '#1c140a', scr: '#2a1d0c', grid: 'rgba(242,199,92,0.14)', desk: '#4a3520' },
  navy: { bg: '#0a0f24', scr: '#0e1838', grid: 'rgba(143,227,255,0.14)', desk: '#25305a' },
  red: { bg: '#200a10', scr: '#2e0d16', grid: 'rgba(255,90,110,0.18)', desk: '#4a1a26' },
  green: { bg: '#0b1a12', scr: '#0d2a1a', grid: 'rgba(125,255,176,0.16)', desk: '#1f4030' },
}
/** a mission-control room: big wall screen (draw paints inside it: cx 540, cy 610, 900×560) and two console rows */
export function mcRoom(x, t, draw, { pal = PAL.teal, tag = null, alarm = 0 } = {}) {
  x.fillStyle = pal.bg; x.fillRect(0, 0, 1080, 1920)
  for (let k = 0; k < 5; k++) { x.fillStyle = 'rgba(255,255,255,0.05)'; x.fillRect(60 + k * 200, 240, 160, 14) }
  box(x, 90, 330, 900, 560, pal.scr, 10)
  x.save(); x.beginPath(); x.rect(90, 330, 900, 560); x.clip(); x.fillStyle = pal.scr; x.fillRect(90, 330, 900, 560)
  x.strokeStyle = pal.grid; x.lineWidth = 2
  for (let gx = 90; gx < 990; gx += 60) { x.beginPath(); x.moveTo(gx, 330); x.lineTo(gx, 890); x.stroke() }
  for (let gy = 330; gy < 890; gy += 60) { x.beginPath(); x.moveTo(90, gy); x.lineTo(990, gy); x.stroke() }
  draw?.(540, 610, 900, 560)
  x.fillStyle = 'rgba(255,255,255,0.05)'; x.fillRect(90, 330 + ((t * 140) % 560), 900, 8)   // a scan line
  x.restore()
  if (tag) mono(x, tag, 540, 925, 28, MINT)
  for (let row = 0; row < 2; row++) {
    const y = 1380 + row * 230; box(x, 40, y, 1000, 70, pal.desk, 6)
    for (let k = 0; k < 6; k++) { const on = Math.sin(t * 4 + k * 1.7 + row) > 0; x.fillStyle = on ? MINT : '#ff5a6e'; x.fillRect(90 + k * 160, y + 22, 16, 16); x.fillStyle = SKYB; x.fillRect(120 + k * 160, y + 18, 80, 30) }
  }
  if (alarm > 0) { const a = 0.18 * alarm * (0.5 + 0.5 * Math.sin(t * 9)); x.fillStyle = `rgba(255,58,78,${a.toFixed(3)})`; x.fillRect(0, 0, 1080, 1920) }
}
/** a headset on a star (static stars only) */
export function headset(x, P, id, col = '#5ec8ff') {
  const [cx, cy, s] = P.at(id)
  x.strokeStyle = INK; x.lineWidth = s * 0.07; x.beginPath(); x.arc(cx, cy - s * 0.02, s * 0.44, Math.PI * 1.08, Math.PI * 1.92); x.stroke()
  box(x, cx - s * 0.5, cy - s * 0.1, s * 0.12, s * 0.2, col, 4); box(x, cx + s * 0.38, cy - s * 0.1, s * 0.12, s * 0.2, col, 4)
  x.strokeStyle = INK; x.lineWidth = 7; x.beginPath(); x.moveTo(cx - s * 0.44, cy + s * 0.08); x.quadraticCurveTo(cx - s * 0.4, cy + s * 0.26, cx - s * 0.16, cy + s * 0.24); x.stroke()
  x.fillStyle = INK; x.fillRect(cx - s * 0.2, cy + s * 0.2, 20, 16)
}
/** a glass space helmet around a star; fog 0..1 */
export function helmet(x, P, id, fog = 0) {
  const [cx, cy, s] = P.at(id)
  x.fillStyle = `rgba(191,230,255,${(0.12 + 0.6 * clamp(fog)).toFixed(3)})`; x.beginPath(); x.arc(cx, cy, s * 0.66, 0, Math.PI * 2); x.fill()
  x.strokeStyle = INK; x.lineWidth = 10; x.stroke(); x.strokeStyle = '#d8dce4'; x.lineWidth = 5; x.stroke()
  x.strokeStyle = 'rgba(255,255,255,0.7)'; x.lineWidth = 8; x.beginPath(); x.arc(cx, cy, s * 0.54, Math.PI * 1.15, Math.PI * 1.45); x.stroke()
  box(x, cx - s * 0.4, cy + s * 0.6, s * 0.8, s * 0.12, '#d8dce4', 5)
}
/** a little pixel rocket (nose up) with a label down its side */
export function rocket(x, cx, cy, s, t, flame = 0, text = 'JAN 9') {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  if (flame > 0) for (let k = 0; k < 4; k++) { const L = 70 + 90 * flame * (0.75 + 0.25 * Math.sin(t * 31 + k * 2)); x.fillStyle = ['#ff7a2a', '#ffd36b', '#ff5a3a', '#fff3c4'][k]; x.beginPath(); x.moveTo(-34 + k * 8, 112); x.lineTo(34 - k * 8, 112); x.lineTo(0, 112 + L * (1 - k * 0.18)); x.fill() }
  x.fillStyle = INK; x.beginPath(); x.moveTo(-58, 120); x.lineTo(-96, 150); x.lineTo(-58, 40); x.fill(); x.beginPath(); x.moveTo(58, 120); x.lineTo(96, 150); x.lineTo(58, 40); x.fill()
  x.fillStyle = BRAKE; x.beginPath(); x.moveTo(-52, 112); x.lineTo(-86, 138); x.lineTo(-52, 54); x.fill(); x.beginPath(); x.moveTo(52, 112); x.lineTo(86, 138); x.lineTo(52, 54); x.fill()
  box(x, -52, -110, 104, 228, BONE, 6)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-58, -110); x.lineTo(0, -200); x.lineTo(58, -110); x.fill(); x.fillStyle = BRAKE; x.beginPath(); x.moveTo(-46, -114); x.lineTo(0, -186); x.lineTo(46, -114); x.fill()
  x.fillStyle = INK; x.beginPath(); x.arc(0, -56, 26, 0, Math.PI * 2); x.fill(); x.fillStyle = SKYB; x.beginPath(); x.arc(0, -56, 18, 0, Math.PI * 2); x.fill()
  x.save(); x.translate(0, 40); x.rotate(-Math.PI / 2); txt(x, text, 0, 0, { size: 34, col: INK, font: MONO, weight: 700 }); x.restore()
  x.restore()
}
/** a scrolling telemetry line inside a box; f(u, t) → 0..1 */
export function telemetry(x, l, top, w, h, t, f, { col = MINT, name = '', speed = 0.25 } = {}) {
  x.strokeStyle = 'rgba(255,255,255,0.25)'; x.lineWidth = 3; x.strokeRect(l, top, w, h)
  x.strokeStyle = col; x.lineWidth = 6; x.beginPath()
  for (let i = 0; i <= 60; i++) { const u = i / 60, v = clamp(f(u + t * speed, t, u)); const px = l + u * w, py = top + h - 10 - v * (h - 20); i ? x.lineTo(px, py) : x.moveTo(px, py) }
  x.stroke(); if (name) mono(x, name, l + 14, top + 26, 24, col, 'left')
}
/** a row of stations with GO / NO GO lights */
export function goBoard(x, rows, cx = 540, top = 400, w = 760) {
  rows.forEach(([name, st], i) => {
    const y = top + i * 74; mono(x, name, cx - w / 2 + 20, y, 36, BONE, 'left')
    if (st == null) return
    const go = st === 'GO', k = st === '?' ? 0.4 : 1
    box(x, cx + w / 2 - 210, y - 26, 190, 52, st === '?' ? '#3a3a50' : go ? '#1f7a4a' : '#a5233a', 4)
    x.save(); x.globalAlpha = k; mono(x, st === '?' ? '...' : st, cx + w / 2 - 115, y + 2, 32, BONE); x.restore()
  })
}
/** a clipboard checklist: items [text, mark?]; n = how many are ticked so far */
export function checklist(x, cx, cy, items, n, { w = 620, title = 'CHECKLIST' } = {}) {
  const h = 120 + items.length * 74
  box(x, cx - w / 2, cy - h / 2, w, h, BONE, 8); box(x, cx - 80, cy - h / 2 - 26, 160, 44, '#8f96a0', 5)
  mono(x, title, cx, cy - h / 2 + 50, 32, INK)
  items.forEach(([s, mark], i) => {
    const y = cy - h / 2 + 120 + i * 74; box(x, cx - w / 2 + 30, y - 22, 44, 44, '#fff', 4)
    txt(x, s, cx - w / 2 + 100, y, { size: 36, col: INK, align: 'left' })
    if (i < n) { const k = clamp(n - i); x.save(); x.globalAlpha = k; if (mark === 'x') { x.strokeStyle = BRAKE; x.lineWidth = 9; x.beginPath(); x.moveTo(cx - w / 2 + 38, y - 14); x.lineTo(cx - w / 2 + 66, y + 14); x.moveTo(cx - w / 2 + 66, y - 14); x.lineTo(cx - w / 2 + 38, y + 14); x.stroke() } else { x.strokeStyle = '#1f7a4a'; x.lineWidth = 10; x.beginPath(); x.moveTo(cx - w / 2 + 36, y); x.lineTo(cx - w / 2 + 50, y + 14); x.lineTo(cx - w / 2 + 74, y - 20); x.stroke() } x.restore() }
  })
}
/** a generic phone with chat bubbles: msgs [[side 'l'|'r', text, k]]; typing 0..1 shows the three dots */
export function phoneChat(x, cx, cy, t, msgs, { typing = 0, s = 1, head = '' } = {}) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  box(x, -200, -330, 400, 660, '#1e1a2a', 10); x.fillStyle = '#f4efe4'; x.fillRect(-180, -290, 360, 580)
  x.fillStyle = INK; x.fillRect(-40, -312, 80, 10)
  if (head) { x.fillStyle = '#d9d2c4'; x.fillRect(-180, -290, 360, 64); txt(x, head, 0, -258, { size: 30, col: INK }) }
  let y = head ? -200 : -250
  for (const [side, text, k = 1] of msgs) {
    if (k <= 0) continue
    const lines = text.split(' | '); const h = 22 + lines.length * 38
    x.save(); x.globalAlpha = clamp(k)
    x.font = `700 30px ${INTER}`; const w = Math.max(...lines.map(l => x.measureText(l).width)) + 36
    const l = side === 'r' ? 160 - w : -160
    box(x, l, y, w, h, side === 'r' ? '#5ec8ff' : '#ffffff', 4)
    lines.forEach((ln, j) => txt(x, ln, l + w / 2, y + 30 + j * 38, { size: 30, col: INK, weight: 700 }))
    x.restore(); y += h + 22
  }
  if (typing > 0) { box(x, -160, y, 120, 54, '#ffffff', 4); for (let k = 0; k < 3; k++) { const b = Math.sin(t * 8 - k) > 0.3 ? -6 : 0; x.fillStyle = INK; x.fillRect(-138 + k * 32, y + 22 + b, 14, 14) } }
  x.restore()
}

// ── sets ─────────────────────────────────────────────────────────────────────────────────────────────────
/** a dusk sky gradient over the whole frame (covers the shared night sky) */
export function duskSky(x, top = '#2a1d52', mid = '#c2557a', low = '#ffb36b', h = FLOOR + 60) {
  const g = x.createLinearGradient(0, 0, 0, h); g.addColorStop(0, top); g.addColorStop(0.6, mid); g.addColorStop(1, low); x.fillStyle = g; x.fillRect(0, 0, 1080, h)
}
export const night = (x, t, ground = '#221b38') => { skyline(x, FLOOR + 60, t, { alpha: 0.85 }); outside(x, { ground }) }
/** Buffalo-Bayou-style water band with ripples and trees */
export function bayou(x, t, { top = FLOOR - 40, col = '#2b4a6a' } = {}) {
  x.fillStyle = INK; x.fillRect(0, top - 6, 1080, 8); x.fillStyle = col; x.fillRect(0, top, 1080, 1920 - top)
  for (let k = 0; k < 26; k++) { const ph = (t * 0.25 + k * 0.137) % 1; x.fillStyle = `rgba(255,220,180,${(0.35 * Math.sin(Math.PI * ph)).toFixed(2)})`; x.fillRect((k * 173) % 1080 + ph * 60, top + 30 + (k * 71) % 480, 70, 6) }
  for (let k = 0; k < 7; k++) { const cx = 60 + k * 170, h = 120 + (k % 3) * 50; x.fillStyle = '#1a2a22'; x.beginPath(); x.arc(cx, top - h, 70 + (k % 2) * 20, 0, Math.PI * 2); x.fill(); x.fillRect(cx - 8, top - h, 16, h) }
}
/** a bat swarm leaving a bridge at sunset (k = how far out) */
export function bats(x, t, k = 1, { cx = 540, cy = 1100, n = 60 } = {}) {
  for (let i = 0; i < n; i++) {
    const ph = (t * 0.18 + i * 0.0617) % 1, d = ph * k
    const bx = cx + Math.sin(i * 2.3 + t * 0.6) * 520 * d + (i % 2 ? 1 : -1) * 60 * d, by = cy - d * (500 + (i % 7) * 60) + Math.sin(t * 3 + i) * 20
    const f = Math.sin(t * 22 + i) > 0 ? 1 : -1
    x.fillStyle = INK; x.fillRect(bx - 4, by - 3, 8, 8); x.fillRect(bx - 16, by - 3 * f - 2, 12, 5); x.fillRect(bx + 4, by - 3 * f - 2, 12, 5)
  }
}
export function bridge(x, base) { box(x, 0, base - 70, 1080, 46, '#5a5470', 6); for (let k = 0; k < 6; k++) box(x, 60 + k * 190, base - 24, 40, 200, '#4a4460', 5) }
/** a generic storefront with a sign */
export function shop(x, cx, base, sign, { col = '#c98e5a', awn = '#ff8fb1', w = 560, open = null } = {}) {
  box(x, cx - w / 2, base - 400, w, 400, col, 8)
  for (let k = 0; k < 7; k++) { x.fillStyle = k % 2 ? awn : BONE; x.fillRect(cx - w / 2 - 20 + k * (w + 40) / 7, base - 300, (w + 40) / 7, 50) }
  box(x, cx - w / 2 - 20, base - 470, w + 40, 76, INK, 0); txt(x, sign, cx, base - 431, { size: 46, col: GOLD })
  box(x, cx - w / 2 + 40, base - 230, w * 0.42, 150, '#bfe6ff', 5); box(x, cx + w * 0.08, base - 230, w * 0.3, 230, '#6b3b1f', 5)
  if (open) { box(x, cx - w / 2 + 60, base - 210, 170, 50, BRAKE, 3); mono(x, open, cx - w / 2 + 145, base - 184, 24, BONE) }
}
export function curtains(x, k, t) {   // k: 0 closed, 1 open
  for (const side of [-1, 1]) {
    const w = 560 * (1 - 0.82 * clamp(k)), l = side < 0 ? 0 : 1080 - w
    x.fillStyle = '#8a1830'; x.fillRect(l, 0, w, 1920)
    for (let f = 0; f < w; f += 60) { x.fillStyle = 'rgba(0,0,0,0.2)'; x.fillRect(l + f + 20, 0, 18, 1920) }
  }
  x.fillStyle = '#6a0f22'; x.fillRect(0, 0, 1080, 230); for (let k2 = 0; k2 < 12; k2++) { x.fillStyle = GOLD; x.fillRect(k2 * 92 + 30, 220, 30, 18) }
}
export function spotlight(x, cx, base, w = 300, col = 'rgba(255,240,200,0.18)') { x.fillStyle = col; x.beginPath(); x.moveTo(cx - 40, 230); x.lineTo(cx + 40, 230); x.lineTo(cx + w / 2, base); x.lineTo(cx - w / 2, base); x.fill(); x.beginPath(); x.ellipse(cx, base, w / 2, 40, 0, 0, Math.PI * 2); x.fill() }
export function stage(x, t, { wall = '#2a1030' } = {}) { x.fillStyle = wall; x.fillRect(0, 0, 1080, 1920); x.fillStyle = '#5a3020'; x.fillRect(0, FLOOR + 60, 1080, 600); x.fillStyle = INK; x.fillRect(0, FLOOR + 54, 1080, 10); for (let k = 0; k < 10; k++) { x.fillStyle = 'rgba(0,0,0,0.15)'; x.fillRect(k * 108, FLOOR + 60, 4, 600) } }
/** party lights: a dark room with drifting colored dots */
export function partyRoom(x, t, { wall = '#1a1033' } = {}) {
  x.fillStyle = wall; x.fillRect(0, 0, 1080, 1920)
  for (let k = 0; k < 26; k++) { const ph = (t * 0.2 + k * 0.071) % 1; x.fillStyle = [GOLD, PINK, SKYB, MINT][k % 4]; x.globalAlpha = 0.5 + 0.5 * Math.sin(t * 2 + k); x.beginPath(); x.arc((k * 197 + t * 30) % 1080, 300 + (k * 113) % 1000, 10 + (k % 3) * 6, 0, Math.PI * 2); x.fill() }
  x.globalAlpha = 1; x.fillStyle = '#2a1a40'; x.fillRect(0, FLOOR + 60, 1080, 600); for (let k = 0; k < 8; k++) { x.fillStyle = k % 2 ? '#3a2a55' : '#2a1a40'; x.fillRect(k * 135, FLOOR + 60, 135, 600) }
}
/** a cold office lobby: AC vents blowing snowflakes */
export function lobby(x, t) {
  x.fillStyle = '#c9d6e4'; x.fillRect(0, 0, 1080, 1920); x.fillStyle = '#9fb0c4'; x.fillRect(0, FLOOR + 60, 1080, 600)
  for (const vx of [240, 840]) { box(x, vx - 110, 300, 220, 60, '#e8eef4', 5); for (let k = 0; k < 4; k++) { x.fillStyle = INK; x.fillRect(vx - 90, 312 + k * 12, 180, 4) } }
  for (let k = 0; k < 40; k++) { const ph = (t * 0.35 + k * 0.05) % 1; const vx = k % 2 ? 240 : 840; x.fillStyle = '#ffffff'; x.fillRect(vx - 100 + (k * 37) % 200 + Math.sin(t * 3 + k) * 20, 370 + ph * 900, 10, 10) }
}
export function glassDoors(x, k) { const o = 220 * clamp(k); for (const s of [-1, 1]) { box(x, 540 + (s < 0 ? -440 - o : 0 + o), 560, 440, 820, 'rgba(191,230,255,0.35)', 8) } box(x, 80, 520, 920, 40, '#8f96a0', 6) }
export function parkingLot(x, t) { x.fillStyle = '#3a3646'; x.fillRect(0, FLOOR - 200, 1080, 900); for (let k = 0; k < 6; k++) { x.fillStyle = BONE; x.fillRect(40 + k * 190, FLOOR - 160, 10, 220) } }
/** a pile of crawfish on a tray, with corn and potatoes */
export function crawfish(x, cx, cy, s = 1, rot = 0) {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
  x.fillStyle = INK; x.fillRect(-46, -16, 92, 32); x.fillStyle = '#d9402a'; x.fillRect(-42, -12, 84, 24)
  for (let k = 0; k < 4; k++) { x.fillStyle = '#b0301e'; x.fillRect(-30 + k * 18, -12, 6, 24) }
  box(x, 42, -26, 26, 18, '#d9402a', 3); box(x, 42, 8, 26, 18, '#d9402a', 3); x.fillStyle = INK; x.fillRect(-50, -24, 6, 48)
  x.fillStyle = INK; x.fillRect(30, -6, 6, 6); x.restore()
}
export function crawTray(x, cx, cy, t, n = 14) {
  box(x, cx - 330, cy - 40, 660, 120, '#c9c2b0', 6)
  for (let k = 0; k < n; k++) crawfish(x, cx - 260 + (k * 97) % 520, cy - 10 + ((k * 53) % 3) * 18, 0.9, (k % 5) * 0.6 - 1.2)
  box(x, cx + 180, cy - 30, 90, 40, '#f2c75c', 5); box(x, cx - 300, cy - 20, 40, 40, '#d9b27a', 4); box(x, cx - 240, cy + 10, 40, 40, '#d9b27a', 4)
}
export function boba(x, cx, cy, s = 1, col = '#e8c8a0') {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-50, -80); x.lineTo(50, -80); x.lineTo(38, 90); x.lineTo(-38, 90); x.fill()
  x.fillStyle = col; x.beginPath(); x.moveTo(-42, -60); x.lineTo(42, -60); x.lineTo(32, 82); x.lineTo(-32, 82); x.fill()
  for (let k = 0; k < 8; k++) { x.fillStyle = INK; x.beginPath(); x.arc(-22 + (k % 4) * 15, 50 + Math.floor(k / 4) * 16, 7, 0, Math.PI * 2); x.fill() }
  box(x, -6, -150, 12, 90, PINK, 3); x.restore()
}
export function paddleBoat(x, cx, cy, col, t) {
  const b = Math.sin(t * 2.4 + cx) * 6
  box(x, cx - 130, cy - 30 + b, 260, 70, col, 6); box(x, cx - 90, cy - 120 + b, 180, 20, '#f4efe4', 5); box(x, cx - 80, cy - 100 + b, 14, 70, '#f4efe4', 3); box(x, cx + 66, cy - 100 + b, 14, 70, '#f4efe4', 3)
  x.fillStyle = INK; x.beginPath(); x.arc(cx + 120, cy + 10 + b, 34, 0, Math.PI * 2); x.fill(); x.strokeStyle = BONE; x.lineWidth = 6; for (let k = 0; k < 4; k++) { const a = t * 3 + k * Math.PI / 2; x.beginPath(); x.moveTo(cx + 120, cy + 10 + b); x.lineTo(cx + 120 + Math.cos(a) * 30, cy + 10 + b + Math.sin(a) * 30); x.stroke() }
}
export function mosquito(x, cx, cy, t, s = 1) {
  x.save(); x.translate(cx + Math.sin(t * 7) * 20, cy + Math.cos(t * 9) * 14); x.scale(s, s)
  const f = Math.sin(t * 60) > 0 ? 1 : 0.4
  x.fillStyle = 'rgba(191,230,255,0.8)'; x.fillRect(-30, -26 * f, 26, 18 * f); x.fillRect(4, -26 * f, 26, 18 * f)
  box(x, -16, -8, 32, 16, '#5a4a3a', 3); x.fillStyle = INK; x.fillRect(14, -2, 26, 4); for (let k = 0; k < 3; k++) { x.fillRect(-10 + k * 10, 8, 3, 18) }
  x.restore()
}
export function cape(x, P, id, t, col = BRAKE) {
  const [cx, cy, s] = P.at(id), fl = Math.sin(t * 7) * 0.1
  x.fillStyle = INK; x.beginPath(); x.moveTo(cx - s * 0.3, cy - s * 0.15); x.lineTo(cx + s * 0.3, cy - s * 0.15); x.lineTo(cx + s * (0.75 + fl), cy + s * 0.75); x.lineTo(cx - s * (0.75 - fl), cy + s * 0.75); x.fill()
  x.fillStyle = col; x.beginPath(); x.moveTo(cx - s * 0.26, cy - s * 0.1); x.lineTo(cx + s * 0.26, cy - s * 0.1); x.lineTo(cx + s * (0.68 + fl), cy + s * 0.7); x.lineTo(cx - s * (0.68 - fl), cy + s * 0.7); x.fill()
}
export function cowboyHat(x, P, id, col = '#a8703a') {
  const [cx, cy, s] = P.at(id)
  box(x, cx - s * 0.5, cy - s * 0.46, s, s * 0.08, col, 5); box(x, cx - s * 0.22, cy - s * 0.66, s * 0.44, s * 0.22, col, 5); x.fillStyle = INK; x.fillRect(cx - s * 0.22, cy - s * 0.5, s * 0.44, 8)
}
export function readingGlasses(x, P, id) {
  const [cx, cy, s] = P.at(id)
  x.strokeStyle = INK; x.lineWidth = 7
  for (const d of [-1, 1]) { x.beginPath(); x.arc(cx + d * s * 0.14, cy + s * 0.05, s * 0.1, 0, Math.PI * 2); x.stroke() }
  x.beginPath(); x.moveTo(cx - s * 0.04, cy + s * 0.05); x.lineTo(cx + s * 0.04, cy + s * 0.05); x.stroke()
}
export function clipboardOn(x, P, id) { const [cx, cy, s] = P.at(id); box(x, cx + s * 0.32, cy - s * 0.05, s * 0.36, s * 0.46, BONE, 5); box(x, cx + s * 0.42, cy - s * 0.1, s * 0.16, s * 0.08, '#8f96a0', 3); for (let k = 0; k < 3; k++) { x.fillStyle = INK; x.fillRect(cx + s * 0.38, cy + s * 0.08 + k * s * 0.1, s * 0.24, 5) } }
export function tumbleweed(x, cx, cy, t, r = 60) { x.save(); x.translate(cx, cy); x.rotate(t * 4); x.strokeStyle = '#a8803a'; x.lineWidth = 6; for (let k = 0; k < 9; k++) { x.beginPath(); x.arc(Math.cos(k) * 10, Math.sin(k * 2) * 10, r * (0.5 + (k % 3) * 0.2), k, k + 3.6); x.stroke() } x.restore() }
export function boot(x, cx, cy, s = 1, col = '#8a4a2a') { x.save(); x.translate(cx, cy); x.scale(s, s); box(x, -40, -140, 80, 140, col, 6); box(x, -40, -10, 150, 50, col, 6); x.fillStyle = GOLD; for (let k = 0; k < 3; k++) x.fillRect(-26, -120 + k * 34, 52, 6); box(x, -46, 34, 40, 18, INK, 0); x.restore() }
export function radioDish(x, cx, base, t) {
  box(x, cx - 14, base - 260, 28, 260, '#8f96a0', 5)
  x.save(); x.translate(cx, base - 280); x.rotate(-0.5 + 0.12 * Math.sin(t * 0.7))
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 170, 70, 0, 0, Math.PI); x.fill(); x.fillStyle = '#d8dce4'; x.beginPath(); x.ellipse(0, 0, 160, 60, 0, 0, Math.PI); x.fill()
  x.strokeStyle = INK; x.lineWidth = 6; x.beginPath(); x.moveTo(-60, 30); x.lineTo(0, -90); x.lineTo(60, 30); x.stroke(); x.fillStyle = BRAKE; x.fillRect(-10, -100, 20, 20)
  for (let k = 0; k < 3; k++) { const ph = (t * 0.8 + k / 3) % 1; x.strokeStyle = `rgba(125,255,176,${(0.8 * (1 - ph)).toFixed(2)})`; x.lineWidth = 6; x.beginPath(); x.arc(0, -90, 40 + ph * 260, Math.PI * 1.15, Math.PI * 1.85); x.stroke() }
  x.restore()
}
export function viewfinder(x, t) {
  x.strokeStyle = BONE; x.lineWidth = 8
  for (const [cx, cy, dx, dy] of [[110, 300, 1, 1], [970, 300, -1, 1], [110, 1600, 1, -1], [970, 1600, -1, -1]]) { x.beginPath(); x.moveTo(cx, cy + dy * 80); x.lineTo(cx, cy); x.lineTo(cx + dx * 80, cy); x.stroke() }
  if (Math.sin(t * 5) > 0) { x.fillStyle = BRAKE; x.beginPath(); x.arc(150, 1540, 16, 0, Math.PI * 2); x.fill() }
  mono(x, 'REC', 200, 1542, 34, BONE, 'left')
}
export function tacoStandMansion(x, t) {
  box(x, 520, FLOOR - 460, 500, 520, '#efe6d6', 8); x.fillStyle = '#8a6a4a'; x.beginPath(); x.moveTo(500, FLOOR - 460); x.lineTo(770, FLOOR - 640); x.lineTo(1040, FLOOR - 460); x.fill()
  for (let k = 0; k < 4; k++) box(x, 560 + k * 115, FLOOR - 390, 70, 110, '#bfe6ff', 4); for (let k = 0; k < 4; k++) box(x, 560 + k * 115, FLOOR - 200, 20, 260, BONE, 3)
  box(x, 60, FLOOR - 200, 360, 260, '#e05a3a', 6); box(x, 40, FLOOR - 250, 400, 60, '#f2c75c', 5); txt(x, 'TACOS', 240, FLOOR - 220, { size: 44, col: INK })
  box(x, 100, FLOOR - 150, 280, 80, '#ffe2b0', 4)
}
/** yearbook grid of little star portraits */
export function yearbook(x, t, ids, k = 1) {
  box(x, 110, 340, 860, 900, BONE, 8); mono(x, 'YEARBOOK', 540, 390, 40, INK)
  ids.forEach((id, i) => { const cx = 250 + (i % 3) * 290, cy = 560 + Math.floor(i / 3) * 300; box(x, cx - 110, cy - 110, 220, 220, '#cfc6b4', 4); if (k > i / ids.length) signChar(x, t, id, cx, cy + 10, 170, { mood: 'happy', seed: 40 + i, glyph: false }); x.fillStyle = INK; x.fillRect(cx - 70, cy + 130, 140, 10) })
}

// ── trailer grammar ──────────────────────────────────────────────────────────────────────────────────────
/** letterbox bars (top + bottom), drawn last in `front` */
export function bars(x, top = 200, bot = 1690) { x.fillStyle = '#000'; x.fillRect(0, 0, 1080, top); x.fillRect(0, bot, 1080, 1920 - bot) }
/** film grain + vignette for the "cinematic" look */
export function grain(x, t, a = 0.06) {
  const g = x.createRadialGradient(540, 960, 300, 540, 960, 1100); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,0,0.55)'); x.fillStyle = g; x.fillRect(0, 0, 1080, 1920)
  const f = Math.floor(t * 12); for (let k = 0; k < 90; k++) { const h = (k * 7919 + f * 104729) % 100000; x.fillStyle = `rgba(255,255,255,${a})`; x.fillRect(h % 1080, (h * 13) % 1920, 4, 4) }
}
export function tint(x, col) { x.fillStyle = col; x.fillRect(0, 0, 1080, 1920) }
/** a full black title card: lines in gold serif, slow push-in; [col] per card */
export function tcard(x, t, lt, lines, { col = GOLD, size = 96, bg = '#05040a', flicker = false, sub = null } = {}) {
  x.fillStyle = bg; x.fillRect(0, 0, 1080, 1920)
  const k = clamp(lt / 0.35), z = 1 + 0.05 * lt, fl = flicker && Math.sin(t * 37) > 0.6 ? 0.55 : 1
  x.save(); x.translate(540, 900); x.scale(z, z); x.globalAlpha = k * fl
  lines.forEach((ln, j) => txt(x, ln, 0, (j - (lines.length - 1) / 2) * size * 1.25, { size, col, font: SERIF, weight: 500 }))
  if (sub) txt(x, sub, 0, (lines.length / 2) * size * 1.25 + 40, { size: 40, col: BONE, font: MONO, weight: 700 })
  x.restore(); grain(x, t, 0.05)
}
/** the (made-up) rating card: plain bordered box, no real rating-board marks */
export function ratingCard(x, t, lt, rating, why) {
  x.fillStyle = '#05040a'; x.fillRect(0, 0, 1080, 1920)
  const k = Kp(lt, 0.05, 0.3); if (k <= 0) return
  x.save(); x.translate(540, 900); x.scale(k, k)
  x.strokeStyle = BONE; x.lineWidth = 8; x.strokeRect(-420, -260, 840, 520)
  x.fillStyle = BONE; x.fillRect(-420, -260, 840, 110); txt(x, 'THIS PREVIEW IS RATED', 0, -205, { size: 44, col: INK, font: MONO, weight: 700 })
  txt(x, rating, 0, -40, { size: 150, col: BONE })
  why.split(' | ').forEach((ln, j) => txt(x, ln, 0, 110 + j * 56, { size: 40, col: GOLD, font: SERIF, weight: 500, italic: true }))
  x.restore()
}
/** the release-date card: JAN 9, only at the Houston beta party */
export function releaseCard(x, t, lt, { top = 'ONLY AT THE HOUSTON BETA PARTY', sub = null } = {}) {
  x.fillStyle = '#05040a'; x.fillRect(0, 0, 1080, 1920)
  const k = Kp(lt, 0.05, 0.4)
  if (lt > 0.3) sparkles(x, t, 540, 900, t - lt + 0.3, 14, 380, 9)
  txt(x, top, 540, 700, { size: 40, col: BONE, font: MONO, weight: 700 })
  x.save(); x.translate(540, 900); x.scale(k, k); txt(x, 'JAN 9', 0, 0, { size: 240, col: GOLD }); x.restore()
  if (sub) txt(x, sub, 540, 1080, { size: 48, col: PINK, font: SERIF, weight: 500, italic: true })
  grain(x, t, 0.04)
}
/** a laurel wreath with a line of text (generic, made-up festival) */
export function laurel(x, cx, cy, lines, k = 1) {
  if (k <= 0) return
  x.save(); x.globalAlpha = clamp(k); x.translate(cx, cy)
  for (const s of [-1, 1]) for (let j = 0; j < 7; j++) { const a = Math.PI / 2 + s * (0.4 + j * 0.28); x.save(); x.translate(Math.cos(a) * 200 * s * -1 * -1, Math.sin(a) * 160); x.rotate(a + s * 0.6); x.fillStyle = GOLD; x.beginPath(); x.ellipse(0, 0, 30, 12, 0, 0, Math.PI * 2); x.fill(); x.restore() }
  lines.forEach((ln, j) => txt(x, ln, 0, (j - (lines.length - 1) / 2) * 52, { size: j === 0 ? 34 : 44, col: GOLD, font: j === 0 ? MONO : SERIF, weight: j === 0 ? 700 : 500 }))
  x.restore()
}
/** a cast name card in the lower area: SIGN · as ROLE */
export function castCard(x, lt, name, role, at = 0.3) {
  const k = clamp((lt - at) / 0.3); if (k <= 0) return
  x.save(); x.globalAlpha = k; x.fillStyle = 'rgba(5,4,10,0.8)'; x.fillRect(0, 1500, 1080, 150)
  txt(x, name, 540, 1545, { size: 52, col: GOLD }); txt(x, 'as ' + role, 540, 1605, { size: 40, col: BONE, font: SERIF, weight: 500, italic: true }); x.restore()
}
/** voice-over subtitle (trailer narration) above the bottom bar */
export function vo(x, lt, text, at = 0.2, d = 99, y = 1560) {
  const k = clamp((lt - at) / 0.3) * (1 - clamp((lt - at - d) / 0.3)); if (k <= 0) return
  x.save(); x.globalAlpha = k; const [a, b] = text.split(' | ')
  txt(x, a, 540, b ? y - 26 : y, { size: 44, col: BONE, font: SERIF, weight: 500, italic: true }); if (b) txt(x, b, 540, y + 30, { size: 44, col: BONE, font: SERIF, weight: 500, italic: true })
  x.restore()
}
export function flare(x, cx, cy, t, a = 0.5) {
  const g = x.createRadialGradient(cx, cy, 0, cx, cy, 260); g.addColorStop(0, `rgba(255,240,200,${a})`); g.addColorStop(1, 'rgba(255,240,200,0)'); x.fillStyle = g; x.fillRect(cx - 260, cy - 260, 520, 520)
  x.fillStyle = `rgba(255,240,200,${(a * 0.3).toFixed(2)})`; x.fillRect(0, cy - 3, 1080, 6)
}
