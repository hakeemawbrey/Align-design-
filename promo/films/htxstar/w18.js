// Houston Star Talk, worker w18: party prep (hst429–hst452). Shared helpers and props for w18a/b/c.js.
// Everything is a pure function of t. No brands, venues, times or prices: only the date (Jan 9) is known.
import { clamp, prog, ease } from '../../src/lib.js'
import { FLOOR, box, txt, outside, room } from '../starrace/ep.js'
import { label, sparkles, pop01, signChar, GOLD, BONE, PINK, INK, INTER, MONO, SERIF, MINT, SKYB, LAV } from '../signs3kit.js'
import { skyline, partyCard, HGREEN } from './kit.js'

export const Y = 1255
export const BADGE = { text: 'HOU BETA · JAN 9', x: 230, y: 150 }
export const NAME = id => id[0].toUpperCase() + id.slice(1)
export const Kp = (lt, a, d = 0.3) => clamp(ease.outBack(prog(lt, a, a + d)))
export const fadeK = (lt, a, b, f = 0.25) => clamp((lt - a) / f) * (1 - clamp((lt - b) / f))
export const sting = (f = 880) => [['glitter', 0.0, 0.7], ['pop', 0.02, f, 0.03, 0], ['whoosh', 0.05, 0.4, 0.02]]
export const music = (style, key, seed) => ({ style, key, seed, lufs: -26, musicRel: -15, crackle: false })
export { GOLD, BONE, PINK, INK, MINT, SKYB, LAV }

/** the series ending: the Jan 9 ticket with a closing line */
export const ticket = (line, stars) => (x, t, lt) => partyCard(x, t, lt, { line, stars })

/** a hop wave for a cast (frame-0 motion) */
export const waveHops = (ids, t0 = 0.02, step = 0.08) => Object.fromEntries(ids.map((id, i) => [id, [t0 + i * step, 1.1 + i * step, 2.2 + i * step]]))

/** big centred text with fade */
export function title(x, s, y, k, { size = 96, col = GOLD, font = INTER, weight = 800, italic = false } = {}) {
  if (k <= 0) return
  x.save(); x.globalAlpha = clamp(k); txt(x, s, 540, y, { size, col, font, weight, italic }); x.restore()
}

// ── backgrounds ──────────────────────────────────────────────────────────────────────────────────────────────
/** a daytime Houston sky (paints over the night sky layer), optional skyline and heat haze */
export function daySky(x, t, { top = '#5fb4ff', bot = '#ffe3a6', city = true, ground = '#6a8f4a', gy = FLOOR + 60 } = {}) {
  const g = x.createLinearGradient(0, 0, 0, gy); g.addColorStop(0, top); g.addColorStop(1, bot); x.fillStyle = g; x.fillRect(0, 0, 1080, gy)
  for (let k = 0; k < 4; k++) { const cx = ((k * 330 + t * 18) % 1400) - 160, cy = 330 + (k % 2) * 140; x.fillStyle = 'rgba(255,255,255,0.85)'; for (const [dx, dy, r] of [[0, 0, 46], [44, -16, 56], [96, 0, 44]]) { x.beginPath(); x.arc(cx + dx, cy + dy, r, 0, Math.PI * 2); x.fill() } }
  if (city) skyline(x, gy, t, { col: '#5a6a9a', lit: '#cfe3ff', alpha: 0.55 })
  x.fillStyle = ground; x.fillRect(0, gy, 1080, 1920 - gy); x.fillStyle = INK; x.fillRect(0, gy - 6, 1080, 10)
}
/** a sunset sky over the bayou (the trail, the water, the downtown skyline) */
export function bayou(x, t, { sun = true } = {}) {
  const g = x.createLinearGradient(0, 0, 0, FLOOR); g.addColorStop(0, '#3a2a6a'); g.addColorStop(0.55, '#ff8a6a'); g.addColorStop(1, '#ffd08a'); x.fillStyle = g; x.fillRect(0, 0, 1080, FLOOR + 60)
  if (sun) { x.fillStyle = '#fff0b8'; x.beginPath(); x.arc(780, 900, 90, 0, Math.PI * 2); x.fill() }
  skyline(x, FLOOR - 120, t, { col: '#2a1d52', lit: '#ffd36b', alpha: 0.9 })
  x.fillStyle = '#3d6a7a'; x.fillRect(0, FLOOR - 120, 1080, 180)
  for (let k = 0; k < 9; k++) { const ph = (t * 0.3 + k / 9) % 1; x.fillStyle = 'rgba(255,220,170,0.35)'; x.fillRect((k * 131 + ph * 200) % 1080, FLOOR - 100 + (k % 4) * 36, 80, 5) }
  x.fillStyle = '#4a7a3a'; x.fillRect(0, FLOOR + 60, 1080, 860); x.fillStyle = '#c9b48a'; x.fillRect(0, FLOOR + 60, 1080, 40); x.fillStyle = INK; x.fillRect(0, FLOOR + 54, 1080, 8)
}
/** a bedroom: wall, floor, a window with the skyline, a bed */
export function bedroom(x, t, { wall = '#3a2a6a', floor = '#5a3a2a', night = true } = {}) {
  room(x, { wall, floor, trim: '#1b1236' })
  box(x, 640, 420, 340, 300, night ? '#0b0820' : '#8fd0ff', 10)
  x.save(); x.beginPath(); x.rect(640, 420, 340, 300); x.clip(); skyline(x, 720, t, { alpha: 0.9, col: night ? '#1a1338' : '#5a6a9a', lit: night ? '#ffd36b' : '#cfe3ff' }); x.restore()
  x.fillStyle = INK; x.fillRect(806, 420, 8, 300); x.fillRect(640, 566, 340, 8)
}
/** a clothes rail with hanging shirts that sway; cols = shirt colours */
export function rack(x, cx, cy, cols, t, { w = 760, pick = -1, pickK = 0 } = {}) {
  box(x, cx - w / 2, cy - 10, w, 16, '#8f96a0', 5); box(x, cx - w / 2, cy, 16, 560, '#8f96a0', 5); box(x, cx + w / 2 - 16, cy, 16, 560, '#8f96a0', 5)
  cols.forEach((c, i) => {
    const hx = cx - w / 2 + 70 + i * ((w - 140) / Math.max(1, cols.length - 1)), sw = Math.sin(t * 2 + i) * 0.05
    const lift = i === pick ? -60 * clamp(pickK) : 0
    x.save(); x.translate(hx, cy + 6 + lift); x.rotate(sw)
    x.strokeStyle = INK; x.lineWidth = 6; x.beginPath(); x.moveTo(0, 0); x.lineTo(0, 24); x.moveTo(-50, 50); x.lineTo(0, 24); x.lineTo(50, 50); x.stroke()
    box(x, -54, 48, 108, 150, c, 5); box(x, -78, 48, 30, 70, c, 5); box(x, 48, 48, 30, 70, c, 5)
    x.restore()
  })
}
/** a tall mirror with a gold frame */
export function mirror(x, cx, cy, w = 300, h = 560, t = 0) {
  box(x, cx - w / 2, cy - h / 2, w, h, GOLD, 8); x.fillStyle = '#bfe6ff'; x.fillRect(cx - w / 2 + 18, cy - h / 2 + 18, w - 36, h - 36)
  const ph = (t * 0.3) % 1; x.fillStyle = 'rgba(255,255,255,0.45)'; x.save(); x.beginPath(); x.rect(cx - w / 2 + 18, cy - h / 2 + 18, w - 36, h - 36); x.clip(); x.translate(cx - w / 2 + ph * w * 1.6 - w * 0.3, cy); x.rotate(0.5); x.fillRect(-20, -h, 40, 2 * h); x.restore()
}

// ── the phone (generic chat, no app UI) ─────────────────────────────────────────────────────────────────────
/** msgs: [[at, side ('L' | 'R'), text, who?]]; shows the last `max` that have arrived; typing dots before each */
export function phone(x, cx, cy, lt, msgs, { w = 640, h = 1000, head = 'group chat', max = 6, k = 1 } = {}) {
  if (k <= 0) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  box(x, -w / 2, -h / 2, w, h, '#0e0b1c', 12); x.fillStyle = '#f4f0ff'; x.fillRect(-w / 2 + 20, -h / 2 + 70, w - 40, h - 130)
  x.fillStyle = INK; x.fillRect(-60, -h / 2 + 26, 120, 18)
  x.fillStyle = '#e4dcff'; x.fillRect(-w / 2 + 20, -h / 2 + 70, w - 40, 80); txt(x, head, 0, -h / 2 + 110, { size: 34, col: INK })
  const shown = msgs.filter(m => lt >= m[0]).slice(-max)
  let y = -h / 2 + 190
  for (const [at, side, text, who] of shown) {
    const a = clamp((lt - at) / 0.18), lines = text.split(' | ')
    x.font = `700 34px ${INTER}`; const bw = Math.min(w - 120, Math.max(...lines.map(l => x.measureText(l).width)) + 44), bh = lines.length * 42 + 26 + (who ? 32 : 0)
    const bx = side === 'R' ? w / 2 - 40 - bw : -w / 2 + 40
    x.save(); x.globalAlpha = a; x.translate(0, (1 - a) * 20)
    box(x, bx, y, bw, bh, side === 'R' ? '#7a5cff' : '#ffffff', 4)
    if (who) txt(x, who, bx + 22, y + 22, { size: 24, col: side === 'R' ? '#e4dcff' : '#7a5cff', font: MONO, weight: 700, align: 'left' })
    lines.forEach((l, i) => txt(x, l, bx + 22, y + (who ? 32 : 0) + 34 + i * 42, { size: 34, col: side === 'R' ? '#ffffff' : INK, weight: 700, align: 'left' }))
    x.restore()
    y += bh + 22
  }
  const next = msgs.find(m => m[0] > lt && m[0] - lt < 0.7)
  if (next) { const bx = next[1] === 'R' ? w / 2 - 150 : -w / 2 + 40; box(x, bx, y, 110, 54, '#ffffff', 4); for (let d = 0; d < 3; d++) { x.fillStyle = INK; x.globalAlpha = 0.4 + 0.6 * Math.abs(Math.sin(lt * 8 + d)); x.fillRect(bx + 22 + d * 26, y + 22, 14, 14) } x.globalAlpha = 1 }
  x.restore()
}

/** a clipboard checklist; items [[text, checkAt]]; Virgo energy */
export function clipboard(x, cx, cy, head, items, lt, { k = 1, w = 560 } = {}) {
  if (k <= 0) return
  const h = 150 + items.length * 78
  x.save(); x.translate(cx, cy); x.rotate(-0.03); x.scale(k, k)
  box(x, -w / 2, -h / 2, w, h, '#a8763e', 8); x.fillStyle = '#fbf7ec'; x.fillRect(-w / 2 + 24, -h / 2 + 50, w - 48, h - 74)
  box(x, -80, -h / 2 - 18, 160, 50, '#8f96a0', 5)
  txt(x, head, 0, -h / 2 + 96, { size: 38, col: INK })
  items.forEach(([s, at], i) => {
    const y = -h / 2 + 170 + i * 78, on = at != null && lt >= at
    box(x, -w / 2 + 50, y - 22, 44, 44, '#ffffff', 4)
    if (on) { const p = clamp((lt - at) / 0.2); x.strokeStyle = '#1f9a5a'; x.lineWidth = 9; x.beginPath(); x.moveTo(-w / 2 + 56, y); x.lineTo(-w / 2 + 70, y + 14 * p); if (p > 0.5) x.lineTo(-w / 2 + 70 + 26 * (p - 0.5) * 2, y + 14 - 34 * (p - 0.5) * 2); x.stroke() }
    txt(x, s, -w / 2 + 120, y + 2, { size: 32, col: INK, weight: 700, align: 'left' })
  })
  x.restore()
}

/** a thermometer sign with a joke reading (never a forecast) */
export function thermo(x, cx, cy, deg, k = 1, { hot = true } = {}) {
  if (k <= 0) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  box(x, -26, -170, 52, 260, BONE, 6); const fillH = hot ? 210 : 90; x.fillStyle = hot ? '#ff4a4a' : '#4a8aff'; x.fillRect(-12, 80 - fillH, 24, fillH)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 110, 50, 0, Math.PI * 2); x.fill(); x.fillStyle = hot ? '#ff4a4a' : '#4a8aff'; x.beginPath(); x.arc(0, 110, 40, 0, Math.PI * 2); x.fill()
  label(x, 0, -220, deg, 1, { size: 52, bg: hot ? '#ffd36b' : SKYB, rot: 0.04 })
  x.restore()
}

/** a speech-free "talk to camera" dialogue box (retro RPG style) with a typewriter reveal */
export function rpg(x, lt, name, text, at, d, { y = 1110, col = GOLD } = {}) {
  const k = fadeK(lt, at, at + d, 0.15); if (k <= 0) return
  x.save(); x.globalAlpha = k
  box(x, 70, y, 940, 250, '#120c2a', 8); x.strokeStyle = BONE; x.lineWidth = 4; x.strokeRect(84, y + 14, 912, 222)
  label(x, 220, y - 4, name, 1, { size: 34, bg: col, rot: 0, font: MONO, weight: 700 })
  const lines = text.split(' | '), total = lines.join('').length, n = Math.floor(clamp((lt - at) / Math.max(0.4, total * 0.035)) * total)
  let used = 0
  lines.forEach((l, i) => { const s = l.slice(0, Math.max(0, n - used)); used += l.length; txt(x, s, 120, y + 90 + i * 64, { size: 46, col: BONE, weight: 700, align: 'left' }) })
  if (n >= total && Math.sin(lt * 8) > 0) { x.fillStyle = GOLD; x.beginPath(); x.moveTo(960, y + 200); x.lineTo(980, y + 200); x.lineTo(970, y + 214); x.fill() }
  x.restore()
}

// ── wearables: overlays that ride on a star at P.at(id) ─────────────────────────────────────────────────────
export function wear(x, P, id, item, col = PINK) {
  const [cx, cy, s] = P.at(id)
  wearAt(x, cx, cy, s, item, col)
}
export function wearAt(x, cx, cy, s, item, col = PINK) {
  const u = s / 260
  x.save(); x.translate(cx, cy); x.scale(u, u)
  switch (item) {
    case 'shades': box(x, -86, -40, 74, 40, INK, 0); box(x, 12, -40, 74, 40, INK, 0); x.fillStyle = INK; x.fillRect(-14, -34, 28, 8); x.fillStyle = 'rgba(143,227,255,0.6)'; x.fillRect(-78, -34, 22, 10); x.fillRect(20, -34, 22, 10); break
    case 'hat': box(x, -120, -112, 240, 22, col, 5); box(x, -64, -176, 128, 70, col, 5); x.fillStyle = INK; x.fillRect(-64, -128, 128, 12); break        // a wide-brim hat (boots season)
    case 'cap': box(x, -70, -150, 140, 56, col, 5); box(x, 40, -108, 90, 18, col, 4); break
    case 'crown': x.fillStyle = INK; x.beginPath(); x.moveTo(-70, -96); x.lineTo(-70, -170); x.lineTo(-35, -130); x.lineTo(0, -180); x.lineTo(35, -130); x.lineTo(70, -170); x.lineTo(70, -96); x.closePath(); x.fill(); x.fillStyle = GOLD; x.beginPath(); x.moveTo(-60, -104); x.lineTo(-60, -150); x.lineTo(-35, -120); x.lineTo(0, -164); x.lineTo(35, -120); x.lineTo(60, -150); x.lineTo(60, -104); x.closePath(); x.fill(); break
    case 'scarf': box(x, -90, 30, 180, 30, col, 5); box(x, 30, 56, 34, 80, col, 5); break
    case 'bow': x.fillStyle = INK; x.beginPath(); x.moveTo(0, 50); x.lineTo(-56, 22); x.lineTo(-56, 86); x.closePath(); x.moveTo(0, 50); x.lineTo(56, 22); x.lineTo(56, 86); x.closePath(); x.fill(); x.fillStyle = col; x.beginPath(); x.moveTo(0, 50); x.lineTo(-46, 32); x.lineTo(-46, 76); x.closePath(); x.moveTo(0, 50); x.lineTo(46, 32); x.lineTo(46, 76); x.closePath(); x.fill(); box(x, -10, 40, 20, 20, col, 3); break
    case 'sweater': for (let k = 0; k < 2; k++) box(x, -94, 20 + k * 40, 188, 34, k ? col : BONE, 4); break
    case 'boots': for (const d of [-1, 1]) { box(x, d * 50 - 24, 92, 48, 54, col, 5); box(x, d * 50 - (d < 0 ? 40 : 8), 136, 48, 18, col, 4) } break
    case 'fan': x.save(); x.translate(110, 10); x.rotate(Math.sin(cx * 0.01 + cy) * 0.2 - 0.3); x.fillStyle = INK; x.beginPath(); x.moveTo(0, 40); x.arc(0, 40, 90, -2.3, -0.8); x.closePath(); x.fill(); x.fillStyle = col; x.beginPath(); x.moveTo(0, 40); x.arc(0, 40, 80, -2.25, -0.85); x.closePath(); x.fill(); x.restore(); break
    case 'headphones': x.strokeStyle = INK; x.lineWidth = 16; x.beginPath(); x.arc(0, -40, 112, Math.PI * 1.08, Math.PI * 1.92); x.stroke(); box(x, -130, -60, 40, 70, col, 5); box(x, 90, -60, 40, 70, col, 5); break
    case 'chain': x.strokeStyle = GOLD; x.lineWidth = 8; x.setLineDash([10, 6]); x.beginPath(); x.arc(0, 10, 80, 0.4, Math.PI - 0.4); x.stroke(); x.setLineDash([]); box(x, -16, 82, 32, 32, GOLD, 4); break
    case 'tie': x.fillStyle = INK; x.beginPath(); x.moveTo(-18, 36); x.lineTo(18, 36); x.lineTo(26, 120); x.lineTo(0, 150); x.lineTo(-26, 120); x.closePath(); x.fill(); x.fillStyle = col; x.beginPath(); x.moveTo(-10, 44); x.lineTo(10, 44); x.lineTo(17, 118); x.lineTo(0, 138); x.lineTo(-17, 118); x.closePath(); x.fill(); break
    case 'flower': for (let k = 0; k < 5; k++) { const a = k * Math.PI * 2 / 5; x.fillStyle = INK; x.beginPath(); x.arc(-80 + Math.cos(a) * 22, -110 + Math.sin(a) * 22, 20, 0, Math.PI * 2); x.fill(); x.fillStyle = col; x.beginPath(); x.arc(-80 + Math.cos(a) * 22, -110 + Math.sin(a) * 22, 15, 0, Math.PI * 2); x.fill() } x.fillStyle = GOLD; x.beginPath(); x.arc(-80, -110, 14, 0, Math.PI * 2); x.fill(); break
    case 'beanie': box(x, -80, -150, 160, 56, col, 5); x.fillStyle = BONE; x.beginPath(); x.arc(0, -160, 20, 0, Math.PI * 2); x.fill(); break
    case 'frizz': for (let k = 0; k < 14; k++) { const a = Math.PI + k * Math.PI / 13; x.strokeStyle = col; x.lineWidth = 8; x.beginPath(); x.moveTo(Math.cos(a) * 110, -40 + Math.sin(a) * 120); x.lineTo(Math.cos(a) * 160, -40 + Math.sin(a) * 175 + (k % 2 ? 14 : -14)); x.stroke() } break
  }
  x.restore()
}

// ── food and things people bring (generic, no brands) ───────────────────────────────────────────────────────
export function dish(x, kind, cx, cy, s = 1, t = 0) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  switch (kind) {
    case 'queso': box(x, -90, -10, 180, 70, '#c84a2a', 6); x.fillStyle = '#ffcf4a'; x.beginPath(); x.ellipse(0, -10, 86, 24, 0, 0, Math.PI * 2); x.fill(); for (let k = 0; k < 3; k++) { const ph = (t * 0.7 + k / 3) % 1; x.strokeStyle = `rgba(255,255,255,${(0.6 * (1 - ph)).toFixed(2)})`; x.lineWidth = 5; x.beginPath(); x.moveTo(-40 + k * 40, -30 - ph * 80); x.lineTo(-30 + k * 40, -60 - ph * 80); x.stroke() } break
    case 'kingcake': x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 112, 56, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = '#d9a55a'; x.beginPath(); x.ellipse(0, -4, 104, 48, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = '#3a2a1e'; x.beginPath(); x.ellipse(0, -4, 44, 18, 0, 0, Math.PI * 2); x.fill(); for (let k = 0; k < 12; k++) { const a = k * Math.PI / 6; x.fillStyle = ['#7a3ab0', '#2fae5a', '#f2c75c'][k % 3]; x.fillRect(Math.cos(a) * 76 - 12, -4 + Math.sin(a) * 34 - 6, 24, 12) } break
    case 'crawfish': x.fillStyle = INK; x.beginPath(); x.ellipse(0, 20, 120, 40, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = '#c0c4cc'; x.beginPath(); x.ellipse(0, 16, 112, 32, 0, 0, Math.PI * 2); x.fill(); for (let k = 0; k < 9; k++) { const px = -80 + (k % 5) * 40 + (k > 4 ? 20 : 0), py = k > 4 ? -10 : 8; box(x, px - 20, py - 12, 40, 20, '#e0442a', 3) } box(x, -20, -40, 20, 30, '#f2d64a', 3); break
    case 'boba': box(x, -40, -80, 80, 140, '#e9d2b0', 5); x.fillStyle = INK; for (let k = 0; k < 6; k++) x.fillRect(-28 + (k % 3) * 22, 20 + Math.floor(k / 3) * 18, 14, 14); box(x, 6, -130, 14, 60, PINK, 3); break
    case 'chips': x.fillStyle = INK; x.beginPath(); x.moveTo(-100, -20); x.lineTo(100, -20); x.lineTo(70, 50); x.lineTo(-70, 50); x.closePath(); x.fill(); x.fillStyle = '#e8a33a'; x.beginPath(); x.moveTo(-92, -14); x.lineTo(92, -14); x.lineTo(64, 44); x.lineTo(-64, 44); x.closePath(); x.fill(); for (let k = 0; k < 6; k++) { x.fillStyle = '#ffd36b'; x.beginPath(); x.moveTo(-70 + k * 28, -16); x.lineTo(-56 + k * 28, -50); x.lineTo(-42 + k * 28, -16); x.fill() } break
    case 'tray': box(x, -120, 0, 240, 30, '#8f96a0', 5); for (let k = 0; k < 4; k++) { x.fillStyle = INK; x.beginPath(); x.arc(-84 + k * 56, -18, 26, 0, Math.PI * 2); x.fill(); x.fillStyle = '#e8b86a'; x.beginPath(); x.arc(-84 + k * 56, -18, 21, 0, Math.PI * 2); x.fill(); x.fillStyle = ['#c0304a', '#f2c75c', '#7a3ab0', '#c0304a'][k]; x.beginPath(); x.arc(-84 + k * 56, -18, 9, 0, Math.PI * 2); x.fill() } break   // kolaches
    case 'pot': box(x, -110, -60, 220, 120, '#8f96a0', 6); box(x, -130, -76, 260, 24, '#6d7480', 5); for (let k = 0; k < 3; k++) { const ph = (t * 0.6 + k / 3) % 1; x.strokeStyle = `rgba(255,255,255,${(0.6 * (1 - ph)).toFixed(2)})`; x.lineWidth = 6; x.beginPath(); x.moveTo(-50 + k * 50, -90 - ph * 120); x.quadraticCurveTo(-30 + k * 50, -130 - ph * 120, -50 + k * 50, -160 - ph * 120); x.stroke() } break
    case 'cooler': box(x, -110, -70, 220, 130, '#3a8fd0', 6); box(x, -116, -86, 232, 30, BONE, 5); box(x, -30, -104, 60, 20, BONE, 4); break
    case 'cake': box(x, -90, -40, 180, 90, PINK, 6); box(x, -90, -40, 180, 22, BONE, 0); for (let k = 0; k < 3; k++) { box(x, -50 + k * 44, -86, 12, 40, LAV, 3); x.fillStyle = '#ffb02e'; x.beginPath(); x.arc(-44 + k * 44, -96 + Math.sin(t * 9 + k) * 2, 8, 0, Math.PI * 2); x.fill() } break
    case 'bag': box(x, -90, -60, 180, 140, '#c98e5a', 6); x.strokeStyle = INK; x.lineWidth = 8; x.beginPath(); x.arc(0, -60, 50, Math.PI, 0); x.stroke(); break
    case 'suitcase': box(x, -110, -80, 220, 170, '#7a5cff', 6); box(x, -40, -112, 80, 30, INK, 0); x.fillStyle = BONE; x.fillRect(-110, -14, 220, 10); break
    case 'speaker': box(x, -80, -120, 160, 240, '#2a2638', 6); for (const [yy, r] of [[-50, 44], [50, 30]]) { x.fillStyle = INK; x.beginPath(); x.arc(0, yy, r + Math.abs(Math.sin(t * 9)) * 4, 0, Math.PI * 2); x.fill(); x.fillStyle = '#5a5470'; x.beginPath(); x.arc(0, yy, r * 0.5, 0, Math.PI * 2); x.fill() } break
    case 'sweater': box(x, -90, -60, 180, 140, '#5a8a6a', 6); box(x, -130, -60, 44, 110, '#5a8a6a', 5); box(x, 86, -60, 44, 110, '#5a8a6a', 5); for (let k = 0; k < 4; k++) { x.fillStyle = BONE; x.fillRect(-70 + k * 40, -10, 20, 12) } break
    case 'umbrella': x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 110, Math.PI, 0); x.fill(); x.fillStyle = PINK; x.beginPath(); x.arc(0, 0, 100, Math.PI, 0); x.fill(); box(x, -5, 0, 10, 110, INK, 0); break
    case 'fan': x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 80, 0, Math.PI * 2); x.fill(); x.fillStyle = '#bfe6ff'; x.beginPath(); x.arc(0, 0, 70, 0, Math.PI * 2); x.fill(); x.save(); x.rotate(t * 20); for (let k = 0; k < 3; k++) { x.rotate(Math.PI * 2 / 3); x.fillStyle = '#5a8aff'; x.beginPath(); x.ellipse(0, -34, 16, 34, 0, 0, Math.PI * 2); x.fill() } x.restore(); box(x, -8, 80, 16, 60, INK, 0); box(x, -50, 136, 100, 16, INK, 0); break
    case 'gift': box(x, -70, -60, 140, 120, LAV, 6); x.fillStyle = GOLD; x.fillRect(-10, -60, 20, 120); x.fillRect(-70, -10, 140, 20); break
    case 'lights': for (let k = 0; k < 8; k++) { const on = Math.sin(t * 5 + k * 1.3) > 0; x.fillStyle = INK; x.beginPath(); x.arc(-210 + k * 60, Math.sin(k) * 10, 16, 0, Math.PI * 2); x.fill(); x.fillStyle = on ? [GOLD, PINK, MINT, SKYB][k % 4] : '#4a4060'; x.beginPath(); x.arc(-210 + k * 60, Math.sin(k) * 10, 12, 0, Math.PI * 2); x.fill() } x.strokeStyle = INK; x.lineWidth = 4; x.beginPath(); x.moveTo(-240, -10); for (let k = 0; k < 8; k++) x.lineTo(-210 + k * 60, Math.sin(k) * 10 - 16); x.lineTo(240, -10); x.stroke(); break
  }
  x.restore()
}
/** a table with a cloth */
export function partyTable(x, cx, top, w = 820, col = '#c84a6a') {
  box(x, cx - w / 2, top, w, 30, '#7a4a2c', 6); x.fillStyle = col; x.fillRect(cx - w / 2 + 10, top + 30, w - 20, 120); for (let k = 0; k < w / 60; k++) { x.fillStyle = 'rgba(255,255,255,0.18)'; x.fillRect(cx - w / 2 + 20 + k * 60, top + 30, 24, 120) }
}
/** a car seen from behind with the stars' heads in the windows (the ride share) */
export function carBack(x, cx, cy, col, t, { s = 1, brake = 0 } = {}) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  box(x, -300, -60, 600, 180, col, 8); box(x, -230, -220, 460, 170, col, 8); x.fillStyle = '#2a3550'; x.fillRect(-206, -198, 412, 130)
  x.fillStyle = brake > 0 ? '#ff3a4e' : '#7a2a33'; x.fillRect(-286, -30, 90, 40); x.fillRect(196, -30, 90, 40)
  box(x, -90, 10, 180, 50, BONE, 4); txt(x, 'JAN 9', 0, 36, { size: 34, col: INK, font: MONO, weight: 700 })
  for (const wx of [-230, 230]) box(x, wx - 40, 120, 80, 50, INK, 0)
  x.restore()
}
/** a generic "ride arriving" map card with a route between labelled pins; p = progress of the car */
export function routeMap(x, cx, cy, pins, p, t, { w = 860, h = 620, k = 1, title: head = 'RIDE ARRIVING' } = {}) {
  if (k <= 0) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  box(x, -w / 2, -h / 2, w, h, '#e9efe4', 8)
  x.strokeStyle = '#ffffff'; x.lineWidth = 22; for (let i = -3; i <= 3; i++) { x.beginPath(); x.moveTo(-w / 2, i * 90); x.lineTo(w / 2, i * 90 + 40); x.stroke(); x.beginPath(); x.moveTo(i * 130, -h / 2); x.lineTo(i * 130 - 50, h / 2); x.stroke() }
  x.fillStyle = '#9ad0ff'; x.beginPath(); x.moveTo(-w / 2, 120); x.bezierCurveTo(-200, 60, 100, 200, w / 2, 100); x.lineTo(w / 2, 130); x.bezierCurveTo(100, 230, -200, 90, -w / 2, 150); x.fill()   // a bayou
  x.setLineDash([18, 12]); x.strokeStyle = '#7a5cff'; x.lineWidth = 10; x.beginPath(); pins.forEach(([px, py], i) => i ? x.lineTo(px, py) : x.moveTo(px, py)); x.stroke(); x.setLineDash([])
  pins.forEach(([px, py, lab], i) => { x.fillStyle = INK; x.beginPath(); x.arc(px, py, 22, 0, Math.PI * 2); x.fill(); x.fillStyle = i === pins.length - 1 ? GOLD : PINK; x.beginPath(); x.arc(px, py, 15, 0, Math.PI * 2); x.fill(); if (lab) label(x, px, py - 52, lab, 1, { size: 26, bg: BONE, rot: 0, font: MONO, weight: 700 }) })
  const seg = pins.length - 1, q = clamp(p) * seg, i = Math.min(seg - 1, Math.floor(q)), f = q - i
  const ax = pins[i][0] + (pins[i + 1][0] - pins[i][0]) * f, ay = pins[i][1] + (pins[i + 1][1] - pins[i][1]) * f
  box(x, ax - 26, ay - 18, 52, 36, '#7a5cff', 5)
  box(x, -w / 2, -h / 2, w, 70, INK, 0); txt(x, head, 0, -h / 2 + 37, { size: 32, col: BONE, font: MONO, weight: 700 })
  x.restore()
}
/** a polaroid-style photo frame that the cast poses inside */
export function photoFrame(x, cx, cy, w, h, k = 1, cap = '') {
  if (k <= 0) return
  x.save(); x.globalAlpha = clamp(k); x.strokeStyle = BONE; x.lineWidth = 26; x.strokeRect(cx - w / 2, cy - h / 2, w, h)
  x.fillStyle = BONE; x.fillRect(cx - w / 2 - 13, cy + h / 2, w + 26, 110); if (cap) txt(x, cap, cx, cy + h / 2 + 56, { size: 44, col: INK, font: SERIF, weight: 500, italic: true })
  x.restore()
}
/** one soft camera flash at lt = at (no strobing) */
export function flash(x, lt, at) { const d = lt - at; if (d > 0 && d < 0.3) { x.fillStyle = `rgba(255,255,255,${(0.4 * (1 - d / 0.3)).toFixed(3)})`; x.fillRect(0, 0, 1080, 1920) } }
/** a calendar day square: "JAN" + a day number, with a tear-off flip */
export function dayCard(x, cx, cy, day, k = 1, { top = 'JAN', col = '#ff5a6e' } = {}) {
  if (k <= 0) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  box(x, -120, -130, 240, 260, BONE, 7); x.fillStyle = col; x.fillRect(-120, -130, 240, 70)
  txt(x, top, 0, -94, { size: 40, col: BONE, font: MONO, weight: 700 }); txt(x, String(day), 0, 30, { size: 120, col: INK })
  x.restore()
}
/** a list card: a sign's name, one item, and a sticker (for the "each sign" list formats) */
export function nameTag(x, id, cx, cy, col = BONE) { txt(x, id.toUpperCase(), cx, cy, { size: 34, col, font: MONO, weight: 700 }) }
/** a wardrobe "closet" door frame */
export function closet(x, cx, cy, w = 860, h = 760, open = 1, col = '#8a5a3a') {
  box(x, cx - w / 2, cy - h / 2, w, h, '#2a1d3a', 10)
  const dw = (w / 2) * (1 - 0.8 * clamp(open))
  box(x, cx - w / 2, cy - h / 2, dw, h, col, 6); box(x, cx + w / 2 - dw, cy - h / 2, dw, h, col, 6)
  x.fillStyle = GOLD; x.fillRect(cx - w / 2 + dw - 24, cy - 10, 10, 40); x.fillRect(cx + w / 2 - dw + 14, cy - 10, 10, 40)
}
/** a glowing "now" clock in the corner (a fake time stamp for gags; never the party's time) */
export function stamp(x, s, cx = 880, cy = 300, col = '#ff5a6e') { box(x, cx - 150, cy - 46, 300, 92, '#120c24', 6); txt(x, s, cx, cy + 4, { size: 48, col, font: MONO, weight: 700 }) }

export { signChar, sparkles, pop01, label, txt, box, outside, room, FLOOR, clamp, prog, ease, MONO, SERIF, INTER, HGREEN }
