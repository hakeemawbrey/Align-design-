// Houston Star Talk · worker w08 (hst186–hst210): "Your star just texted you" (texts) and "Your Houston love
// forecast" (forecast). See promo/posting/htx/FARM.md and promo/films/HOUSTON-STARTALK.md.
// Own props only (a generic phone + chat, a weather studio); the shared kit/engine files are imported, never edited.
import { clamp, prog, ease, lerp } from '../../src/lib.js'
import { FLOOR, box, txt, outside } from '../starrace/ep.js'
import { label, sparkles, pop01, signChar, hearts, GOLD, BONE, PINK, INK, MONO, SERIF, INTER, GLYPH_FONT, SKYB, MINT, LAV } from '../signs3kit.js'
import { signStar } from '../startalk.js'
import { skyline, car, freeway, heatSun, sweat, partyCard, taco, shield, streetSign, loopMap, houses, mural, coffeeShop, BRAKE, HGREEN, kolache, klobasnek, puffer, soupPot } from './kit.js'

export { box, txt, label, sparkles, pop01, signChar, hearts, GOLD, BONE, PINK, INK, MONO, SERIF, INTER, SKYB, MINT, LAV, FLOOR, outside }
export { skyline, car, freeway, heatSun, sweat, partyCard, taco, shield, streetSign, loopMap, houses, mural, coffeeShop, BRAKE, HGREEN, kolache, klobasnek, puffer, soupPot }

export const BADGE = { text: 'HOU BETA · JAN 9', x: 230, y: 150 }
export const STING = [['glitter', 0.0, 0.7], ['pop', 0.02, 880, 0.03, 0]]
const r2 = v => Math.round(v * 100) / 100
export const Kp = (lt, a, d = 0.3) => clamp(ease.outBack(prog(lt, a, a + d)))
const NAMES = { aries: 'Aries', taurus: 'Taurus', gemini: 'Gemini', cancer: 'Cancer', leo: 'Leo', virgo: 'Virgo', libra: 'Libra', scorpio: 'Scorpio', sagittarius: 'Sagittarius', capricorn: 'Capricorn', aquarius: 'Aquarius', pisces: 'Pisces' }

function wrap(x, s, maxW) {
  const out = []
  for (const part of String(s).split('|').map(p => p.trim())) {
    let cur = ''
    for (const w of part.split(' ')) { const tr = cur ? cur + ' ' + w : w; if (x.measureText(tr).width > maxW && cur) { out.push(cur); cur = w } else cur = tr }
    out.push(cur)
  }
  return out
}

// ── backgrounds ──────────────────────────────────────────────────────────────────────────────────────────────
export function grad(x, top, bot, y0 = 0, y1 = 1920) { const g = x.createLinearGradient(0, y0, 0, y1); g.addColorStop(0, top); g.addColorStop(1, bot); x.fillStyle = g; x.fillRect(0, 0, 1080, 1920) }
export function dots(x, t, col = 'rgba(255,255,255,0.08)', n = 40) { for (let k = 0; k < n; k++) { const y = (k * 211 + t * 30) % 1920, xx = (k * 137) % 1080; x.fillStyle = col; x.fillRect(xx, y, 10, 10) } }
/** a pixel moon / sun disc */
export function disc(x, cx, cy, r, col) { x.fillStyle = INK; x.beginPath(); x.arc(cx, cy, r + 6, 0, Math.PI * 2); x.fill(); x.fillStyle = col; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill() }
/** brake-light traffic: rows of cars on a freeway */
export function traffic(x, t, top, { rows = 2, crawl = 6, col = ['#e0a030', '#5ec8ff', '#c9a6ff', '#7dbf5a', '#ff8fb1'] } = {}) {
  freeway(x, top, rows * 170 + 40, rows, t * 40)
  for (let r = 0; r < rows; r++) for (let k = -1; k < 5; k++) { const cx = ((k * 300 + r * 140 + t * crawl) % 1500) - 200, cy = top + 120 + r * 170; car(x, cx, cy, col[(k + r + 5) % col.length], { brake: 0.6 + 0.4 * Math.sin(t * 3 + k + r), s: 0.8 }) }
}
/** a bayou: water band with ripples, a trail, trees */
export function bayou(x, t, { sky = ['#ff9a6b', '#5b3a8a'], water = '#2f6f7a', y = 1180 } = {}) {
  grad(x, sky[0], sky[1], 0, y)
  skyline(x, y - 120, t, { alpha: 0.75, col: '#2a1d52' })
  x.fillStyle = '#3e7a3a'; x.fillRect(0, y - 130, 1080, 140)
  for (let k = 0; k < 7; k++) { const cx = 80 + k * 160; x.fillStyle = INK; x.beginPath(); x.arc(cx, y - 150, 74, 0, Math.PI * 2); x.fill(); x.fillStyle = k % 2 ? '#2f6a33' : '#3c8240'; x.beginPath(); x.arc(cx, y - 150, 66, 0, Math.PI * 2); x.fill() }
  x.fillStyle = water; x.fillRect(0, y, 1080, 1920 - y)
  for (let k = 0; k < 26; k++) { const yy = y + 40 + (k * 53) % (1920 - y - 60), xx = ((k * 173) + t * 40) % 1180 - 100; x.fillStyle = 'rgba(239,230,214,0.25)'; x.fillRect(xx, yy, 70, 6) }
  x.fillStyle = '#c9b48a'; x.fillRect(0, y - 20, 1080, 28)
}
/** a bridge with bats spilling out at sunset */
export function batBridge(x, t, lt, n = 40) {
  x.fillStyle = INK; x.fillRect(0, 1000, 1080, 70); x.fillStyle = '#6b6f80'; x.fillRect(0, 1008, 1080, 54)
  for (let k = 0; k < 4; k++) box(x, 120 + k * 260, 1070, 40, 200, '#6b6f80', 6)
  for (let k = 0; k < n; k++) {
    const p = (lt * 0.35 + k / n) % 1, bx = 150 + (k * 97) % 800 + Math.sin(t * 3 + k) * 40, by = 1060 - p * 700 - (k % 5) * 20
    if (lt * 0.35 < k / n * 0.6) continue
    const f = Math.sin(t * 18 + k) > 0 ? 1 : -1; x.fillStyle = INK; x.fillRect(bx - 4, by - 3, 8, 8); x.fillRect(bx - 16, by - 4 - f * 4, 12, 5); x.fillRect(bx + 4, by - 4 - f * 4, 12, 5)
  }
}
/** a porch (Heights bungalow): boards, a railing, a hanging fern */
export function porch(x, t, { wall = '#7fb7a8', trim = BONE } = {}) {
  x.fillStyle = wall; x.fillRect(0, 0, 1080, 1360); for (let k = 0; k < 40; k++) { x.fillStyle = 'rgba(0,0,0,0.08)'; x.fillRect(0, k * 34, 1080, 4) }
  box(x, 640, 520, 280, 520, '#4a3a6a', 8); x.fillStyle = '#ffd36b'; x.fillRect(670, 560, 220, 160)
  x.fillStyle = '#8a6a4a'; x.fillRect(0, 1360, 1080, 560); for (let k = 0; k < 12; k++) { x.fillStyle = 'rgba(0,0,0,0.15)'; x.fillRect(0, 1380 + k * 46, 1080, 4) }
  for (let k = 0; k < 14; k++) box(x, 20 + k * 78, 1210, 14, 150, trim, 4); box(x, 0, 1196, 1080, 22, trim, 5)
  const sw = Math.sin(t * 1.4) * 8; x.strokeStyle = INK; x.lineWidth = 4; x.beginPath(); x.moveTo(200, 0); x.lineTo(200 + sw, 330); x.stroke()
  for (let k = 0; k < 9; k++) { x.fillStyle = k % 2 ? '#3c8240' : '#2f6a33'; x.beginPath(); x.ellipse(200 + sw + (k - 4) * 22, 360 + Math.abs(k - 4) * 16, 30, 60, (k - 4) * 0.3, 0, Math.PI * 2); x.fill() }
  box(x, 160 + sw, 320, 80, 60, '#c96a3a', 5)
}
/** a night street with a row of neon food signs (Bellaire Blvd style, generic words only) */
export function neonStreet(x, t, words = ['PHO', 'BOBA', 'HOT POT', 'DUMPLINGS'], { sky = '#160f36' } = {}) {
  x.fillStyle = sky; x.fillRect(0, 0, 1080, 1920)
  const cols = ['#ff5a8a', '#7dffb0', '#ffd36b', '#8fe3ff', '#c9a6ff']
  words.forEach((w, i) => {
    const l = (i % 2) * 540, tp = 420 + Math.floor(i / 2) * 420
    box(x, l + 20, tp, 500, 380, ['#2a2250', '#22305a', '#3a2250', '#24304a'][i % 4], 8)
    const on = Math.sin(t * 2 + i * 1.7) > -0.85; x.save(); if (on) { x.shadowColor = cols[i % 5]; x.shadowBlur = 30 } txt(x, w, l + 270, tp + 120, { size: 70, col: on ? cols[i % 5] : '#4a4070' }); x.restore()
    box(x, l + 80, tp + 200, 380, 150, '#ffd36b', 5); x.fillStyle = 'rgba(0,0,0,0.2)'; x.fillRect(l + 80, tp + 290, 380, 60)
  })
  x.fillStyle = '#231c3a'; x.fillRect(0, 1300, 1080, 620); x.fillStyle = INK; x.fillRect(0, 1294, 1080, 10)
}
/** a beach (Galveston day trip): sand, brownish water, gulls, a far pier */
export function beach(x, t, { sky = ['#8fd3ff', '#ffd9a8'] } = {}) {
  grad(x, sky[0], sky[1], 0, 1000)
  disc(x, 820, 380, 80, '#ffe28a')
  x.fillStyle = '#9a8a5a'; x.fillRect(0, 1000, 1080, 260)
  for (let k = 0; k < 10; k++) { const yy = 1010 + k * 24, xx = ((k * 211) + t * 50) % 1300 - 200; x.fillStyle = 'rgba(255,255,255,0.35)'; x.fillRect(xx, yy, 120, 6) }
  x.fillStyle = '#e8d3a0'; x.fillRect(0, 1260, 1080, 660); for (let k = 0; k < 50; k++) { x.fillStyle = 'rgba(160,120,60,0.25)'; x.fillRect((k * 151) % 1080, 1280 + (k * 89) % 600, 8, 8) }
  x.fillStyle = INK; x.fillRect(0, 980, 420, 16); for (let k = 0; k < 6; k++) x.fillRect(20 + k * 70, 990, 8, 40)
  for (let k = 0; k < 3; k++) { const gx = (200 + k * 300 + t * 60) % 1200 - 60, gy = 300 + k * 90 + Math.sin(t * 3 + k) * 20; x.strokeStyle = INK; x.lineWidth = 5; x.beginPath(); x.moveTo(gx - 24, gy); x.quadraticCurveTo(gx - 12, gy - 14, gx, gy); x.quadraticCurveTo(gx + 12, gy - 14, gx + 24, gy); x.stroke() }
}
/** a park: lawn, a pond with paddle boats, trees */
export function park(x, t, { sky = ['#9fe0ff', '#f6e6c4'], boats = true } = {}) {
  grad(x, sky[0], sky[1], 0, 900)
  skyline(x, 900, t, { alpha: 0.5, col: '#5a6a9a', lit: '#fff3c4' })
  x.fillStyle = '#5aa05a'; x.fillRect(0, 880, 1080, 1040)
  box(x, 80, 1000, 920, 320, '#3a8ab0', 8)
  for (let k = 0; k < 12; k++) { x.fillStyle = 'rgba(255,255,255,0.3)'; x.fillRect(110 + (k * 173 + t * 20) % 840, 1030 + (k * 41) % 260, 50, 5) }
  if (boats) for (let k = 0; k < 3; k++) { const bx = 220 + k * 300 + Math.sin(t * 0.8 + k * 2) * 50, by = 1150 + (k % 2) * 70; box(x, bx - 60, by - 20, 120, 46, ['#ffd36b', '#ff8fb1', '#7dffb0'][k], 5); box(x, bx - 24, by - 56, 48, 36, BONE, 4) }
  for (let k = 0; k < 5; k++) { const cx = 60 + k * 240; x.fillStyle = INK; x.beginPath(); x.arc(cx, 880, 84, 0, Math.PI * 2); x.fill(); x.fillStyle = '#3c8240'; x.beginPath(); x.arc(cx, 880, 76, 0, Math.PI * 2); x.fill() }
}
/** an office / museum interior with a ceiling vent blowing arctic AC */
export function arctic(x, t, { wall = '#cfe3f0', floor = '#8aa0b8' } = {}) {
  x.fillStyle = wall; x.fillRect(0, 0, 1080, 1380); x.fillStyle = floor; x.fillRect(0, 1380, 1080, 540)
  box(x, 380, 330, 320, 70, '#9ab0c4', 6); for (let k = 0; k < 6; k++) { x.fillStyle = INK; x.fillRect(400 + k * 50, 345, 30, 40) }
  for (let k = 0; k < 12; k++) { const p = (t * 0.8 + k / 12) % 1; x.fillStyle = `rgba(255,255,255,${(0.9 * (1 - p)).toFixed(2)})`; x.fillRect(420 + (k * 37) % 240 + Math.sin(t * 4 + k) * 20, 410 + p * 500, 10, 10) }
}
/** a downtown tunnel: tiled walls, ceiling lights, a long vanishing hall */
export function tunnel(x, t) {
  x.fillStyle = '#e8dcc0'; x.fillRect(0, 0, 1080, 1920)
  x.fillStyle = '#d4c6a4'; x.beginPath(); x.moveTo(0, 300); x.lineTo(420, 820); x.lineTo(660, 820); x.lineTo(1080, 300); x.lineTo(1080, 1920); x.lineTo(660, 1060); x.lineTo(420, 1060); x.lineTo(0, 1920); x.fill()
  box(x, 420, 820, 240, 240, '#2a2250', 4)
  for (let k = 0; k < 6; k++) { const p = k / 6, w = lerp(600, 120, p), y = lerp(330, 800, p); x.fillStyle = 'rgba(255,240,190,0.9)'; x.fillRect(540 - w / 2, y, w, 12) }
  x.fillStyle = '#b8a888'; x.beginPath(); x.moveTo(0, 1920); x.lineTo(420, 1060); x.lineTo(660, 1060); x.lineTo(1080, 1920); x.fill()
  txt(x, '← SHOPS · OFFICES →', 540, 760, { size: 30, col: INK, font: MONO, weight: 700 })
}
/** a kitchen / home interior */
export function kitchen(x, t, { wall = '#f2d0a8', tile = '#e6b88a' } = {}) {
  x.fillStyle = wall; x.fillRect(0, 0, 1080, 1920)
  for (let k = 0; k < 12; k++) for (let j = 0; j < 6; j++) { x.fillStyle = (k + j) % 2 ? tile : wall; x.fillRect(k * 90, 700 + j * 90, 90, 90) }
  box(x, 0, 1240, 1080, 60, '#8a5a3a', 6); x.fillStyle = '#6b3b1f'; x.fillRect(0, 1300, 1080, 620)
  box(x, 120, 380, 280, 220, '#bfe6ff', 8); x.fillStyle = INK; x.fillRect(255, 380, 10, 220); x.fillRect(120, 485, 280, 10)
}

// ── pictures a star can send (drawn inside a photo frame in the chat) ──────────────────────────────────────────
export const PIC = {
  traffic: (x, cx, cy, w, h, t) => { x.fillStyle = '#2b2350'; x.fillRect(cx - w / 2, cy - h / 2, w, h); for (let r = 0; r < 3; r++) for (let k = 0; k < 6; k++) { const px = cx - w / 2 + 30 + k * 70 + r * 20, py = cy - h / 2 + 60 + r * 70; x.fillStyle = BRAKE; x.fillRect(px, py, 16, 10); x.fillRect(px + 34, py, 16, 10); x.save(); x.globalAlpha = 0.35 + 0.2 * Math.sin(t * 4 + k); x.beginPath(); x.arc(px + 25, py + 5, 30, 0, Math.PI * 2); x.fill(); x.restore() } },
  taco: (x, cx, cy, w, h) => { x.fillStyle = '#ffe9c4'; x.fillRect(cx - w / 2, cy - h / 2, w, h); taco(x, cx, cy + 30, 2.2) },
  bats: (x, cx, cy, w, h, t) => { const g = x.createLinearGradient(0, cy - h / 2, 0, cy + h / 2); g.addColorStop(0, '#ff9a6b'); g.addColorStop(1, '#5b3a8a'); x.fillStyle = g; x.fillRect(cx - w / 2, cy - h / 2, w, h); x.fillStyle = INK; x.fillRect(cx - w / 2, cy + 60, w, 30); for (let k = 0; k < 30; k++) { const bx = cx - w / 2 + 20 + (k * 53) % (w - 40), by = cy + 40 - (k * 37) % 150, f = Math.sin(t * 16 + k) > 0 ? 3 : -3; x.fillRect(bx - 3, by, 6, 5); x.fillRect(bx - 11, by - f, 8, 4); x.fillRect(bx + 3, by - f, 8, 4) } },
  sky: (x, cx, cy, w, h, t) => { x.fillStyle = '#ff9a6b'; x.fillRect(cx - w / 2, cy - h / 2, w, h); x.fillStyle = '#ffd36b'; x.beginPath(); x.arc(cx, cy + 40, 60, Math.PI, 0); x.fill(); skylineMini(x, cx, cy + h / 2, w) },
  beach: (x, cx, cy, w, h) => { x.fillStyle = '#8fd3ff'; x.fillRect(cx - w / 2, cy - h / 2, w, h / 2); x.fillStyle = '#9a8a5a'; x.fillRect(cx - w / 2, cy, w, h / 4); x.fillStyle = '#e8d3a0'; x.fillRect(cx - w / 2, cy + h / 4, w, h / 4); disc(x, cx + 100, cy - 60, 30, '#ffe28a') },
  map: (x, cx, cy, w, h, t) => { x.fillStyle = '#e8e2d0'; x.fillRect(cx - w / 2, cy - h / 2, w, h); x.strokeStyle = '#c9a65a'; x.lineWidth = 8; x.beginPath(); x.ellipse(cx, cy, w * 0.32, h * 0.32, 0, 0, Math.PI * 2); x.stroke(); x.strokeStyle = '#b0b8c8'; x.lineWidth = 6; x.beginPath(); x.moveTo(cx - w / 2, cy + 10); x.lineTo(cx + w / 2, cy - 10); x.stroke(); x.fillStyle = BRAKE; x.beginPath(); x.arc(cx + 30, cy - 20, 14 + 3 * Math.sin(t * 6), 0, Math.PI * 2); x.fill() },
  soup: (x, cx, cy, w, h, t) => { x.fillStyle = '#f2d0a8'; x.fillRect(cx - w / 2, cy - h / 2, w, h); soupPot(x, cx, cy + 40, t) },
  paddle: (x, cx, cy, w, h) => { x.fillStyle = '#3a8ab0'; x.fillRect(cx - w / 2, cy - h / 2, w, h); box(x, cx - 90, cy - 10, 180, 70, '#ffd36b', 5); box(x, cx - 40, cy - 70, 80, 60, BONE, 4) },
  calendar: (x, cx, cy, w, h) => { x.fillStyle = BONE; x.fillRect(cx - w / 2, cy - h / 2, w, h); x.fillStyle = BRAKE; x.fillRect(cx - w / 2, cy - h / 2, w, 60); txt(x, 'JANUARY', cx, cy - h / 2 + 32, { size: 30, col: BONE, font: MONO, weight: 700 }); for (let k = 0; k < 14; k++) { const gx = cx - w / 2 + 30 + (k % 7) * ((w - 60) / 7), gy = cy - 30 + Math.floor(k / 7) * 80; txt(x, String(k + 1), gx + 20, gy, { size: 26, col: INK, font: MONO, weight: 700 }); if (k === 8) { x.strokeStyle = BRAKE; x.lineWidth = 5; x.beginPath(); x.arc(gx + 20, gy, 26, 0, Math.PI * 2); x.stroke() } } },
  puffer: (x, cx, cy, w, h) => { x.fillStyle = '#bfe6ff'; x.fillRect(cx - w / 2, cy - h / 2, w, h); box(x, cx - 90, cy - 70, 180, 160, '#e05a3a', 6); for (let k = 0; k < 4; k++) { x.fillStyle = 'rgba(0,0,0,0.2)'; x.fillRect(cx - 90, cy - 40 + k * 36, 180, 6) } box(x, cx - 50, cy - 120, 100, 50, '#c9a6ff', 5) },
  shorts: (x, cx, cy, w, h, t) => { x.fillStyle = '#ffd9a8'; x.fillRect(cx - w / 2, cy - h / 2, w, h); heatSun(x, cx + w / 2 - 70, cy - h / 2 + 70, t, 40); box(x, cx - 80, cy - 20, 160, 70, '#5ec8ff', 6); box(x, cx - 80, cy + 50, 70, 60, '#5ec8ff', 6); box(x, cx + 10, cy + 50, 70, 60, '#5ec8ff', 6) },
  kolache: (x, cx, cy, w, h) => { x.fillStyle = '#fff0d6'; x.fillRect(cx - w / 2, cy - h / 2, w, h); kolache(x, cx - 90, cy + 10, 1.2); klobasnek(x, cx + 90, cy + 10, 1.2) },
  tunnel: (x, cx, cy, w, h) => { x.fillStyle = '#e8dcc0'; x.fillRect(cx - w / 2, cy - h / 2, w, h); box(x, cx - 50, cy - 50, 100, 100, '#2a2250', 3); for (let k = 0; k < 4; k++) { const ww = lerp(w * 0.8, 120, k / 4); x.fillStyle = '#fff3c4'; x.fillRect(cx - ww / 2, cy - h / 2 + 20 + k * 22, ww, 6) } },
  pho: (x, cx, cy, w, h, t) => { x.fillStyle = '#2a2250'; x.fillRect(cx - w / 2, cy - h / 2, w, h); x.fillStyle = INK; x.beginPath(); x.ellipse(cx, cy + 20, 130, 70, 0, 0, Math.PI); x.fill(); x.fillStyle = BONE; x.beginPath(); x.ellipse(cx, cy + 16, 124, 30, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = '#c98e4a'; x.beginPath(); x.ellipse(cx, cy + 16, 110, 22, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = '#7dbf5a'; x.fillRect(cx - 40, cy + 8, 20, 10); x.fillRect(cx + 20, cy + 12, 24, 8); for (let k = 0; k < 3; k++) { x.strokeStyle = 'rgba(255,255,255,0.5)'; x.lineWidth = 5; x.beginPath(); x.moveTo(cx - 40 + k * 40, cy - 20); x.quadraticCurveTo(cx - 60 + k * 40 + Math.sin(t * 3 + k) * 20, cy - 60, cx - 40 + k * 40, cy - 100); x.stroke() } },
  run: (x, cx, cy, w, h, t) => { const g = x.createLinearGradient(0, cy - h / 2, 0, cy + h / 2); g.addColorStop(0, '#ffb07a'); g.addColorStop(1, '#ffe3b8'); x.fillStyle = g; x.fillRect(cx - w / 2, cy - h / 2, w, h); x.fillStyle = '#3e7a3a'; x.fillRect(cx - w / 2, cy + 20, w, 40); x.fillStyle = '#2f6f7a'; x.fillRect(cx - w / 2, cy + 60, w, h / 2 - 60); for (let k = 0; k < 5; k++) { x.fillStyle = ['#ff8fb1', '#ffd36b', '#7dffb0', '#c9a6ff', '#8fe3ff'][k]; x.fillRect(cx - w / 2 + 40 + k * 70 + (t * 30) % 40, cy - 10, 16, 30) } },
  slab: (x, cx, cy, w, h) => { x.fillStyle = '#2a2250'; x.fillRect(cx - w / 2, cy - h / 2, w, h); box(x, cx - 160, cy - 20, 320, 70, '#b0306a', 5); box(x, cx - 90, cy - 70, 160, 50, '#b0306a', 5); for (const wx of [-100, 100]) { x.fillStyle = '#d8dce6'; x.beginPath(); x.arc(cx + wx, cy + 56, 30, 0, Math.PI * 2); x.fill(); x.fillStyle = INK; x.beginPath(); x.arc(cx + wx, cy + 56, 12, 0, Math.PI * 2); x.fill() } },
  fit: (x, cx, cy, w, h) => { x.fillStyle = '#ffe0ef'; x.fillRect(cx - w / 2, cy - h / 2, w, h); box(x, cx - 70, cy - 80, 140, 120, GOLD, 6); box(x, cx - 70, cy + 40, 60, 80, INK, 4); box(x, cx + 10, cy + 40, 60, 80, INK, 4); tinyStarAt(x, cx, cy - 20, 26, PINK) },
}
function tinyStarAt(x, cx, cy, s, col) { x.fillStyle = col; x.beginPath(); for (let k = 0; k < 10; k++) { const a = -Math.PI / 2 + k * Math.PI / 5, rr = k % 2 ? s * 0.45 : s; x.lineTo(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr) } x.closePath(); x.fill(); x.strokeStyle = INK; x.lineWidth = 3; x.stroke() }
function skylineMini(x, cx, base, w) { const T = [[0.05, 0.12, 0.3], [0.2, 0.1, 0.5], [0.33, 0.14, 0.7], [0.5, 0.1, 0.55], [0.63, 0.15, 0.8], [0.8, 0.12, 0.45]]; for (const [l, ww, hh] of T) { x.fillStyle = '#2a1d52'; x.fillRect(cx - w / 2 + l * w, base - hh * 160, ww * w, hh * 160) } }

// ── the phone (generic: no app, no brand UI) ───────────────────────────────────────────────────────────────
export const PH = { cx: 540, top: 520, w: 660, h: 920 }
const MSG = 44, MAXW = 480, IMG = [400, 260]
function msgSize(x, m) {
  if (typeof m.body === 'function') return { w: IMG[0], h: IMG[1] + 20, lines: null }
  x.font = `800 ${MSG}px ${INTER}`
  const lines = wrap(x, m.body, MAXW), w = Math.max(...lines.map(l => x.measureText(l).width)) + 44
  return { w, h: lines.length * MSG * 1.2 + 30 + (m.who.length > 1 ? 34 : 0), lines }
}
/** draw the phone and the thread as it stands at time t. thread = [{ at, who: 's' | 'y', body }] */
export function phone(x, t, { sign, name, thread, scheme = {} }) {
  const col = scheme.col || signStar(sign).color, glyph = scheme.glyph || signStar(sign).glyph
  const L = PH.cx - PH.w / 2, T = PH.top, W = PH.w, H = PH.h
  const lastIn = thread.filter(m => m.who !== 'y' && m.at <= t).map(m => m.at).pop() ?? -9
  const sh = t - lastIn < 0.3 ? Math.sin((t - lastIn) * 70) * 7 * (1 - (t - lastIn) / 0.3) : 0
  x.save(); x.translate(sh, 0)
  x.fillStyle = 'rgba(6,4,18,0.35)'; x.fillRect(L + 16, T + 22, W, H)
  box(x, L - 18, T - 18, W + 36, H + 36, scheme.body || '#15121f', 8)
  x.fillStyle = scheme.screen || '#120d26'; x.fillRect(L, T, W, H)
  // header
  x.fillStyle = scheme.head || '#1e1840'; x.fillRect(L, T, W, 118)
  x.fillStyle = INK; x.fillRect(PH.cx - 70, T + 8, 140, 16)
  txt(x, '‹', L + 40, T + 70, { size: 60, col: BONE })
  x.fillStyle = INK; x.beginPath(); x.arc(L + 120, T + 70, 40, 0, Math.PI * 2); x.fill(); x.fillStyle = col; x.beginPath(); x.arc(L + 120, T + 70, 34, 0, Math.PI * 2); x.fill()
  txt(x, glyph, L + 120, T + 72, { size: 40, col: INK, font: GLYPH_FONT, weight: 700 })
  const typing = thread.some(m => m.who !== 'y' && t > m.at - 0.75 && t < m.at)
  txt(x, name || NAMES[sign], L + 180, T + 56, { size: 40, col: BONE, align: 'left' })
  txt(x, typing ? 'typing…' : (scheme.status || 'online'), L + 182, T + 94, { size: 24, col: typing ? MINT : 'rgba(239,230,214,0.6)', font: MONO, weight: 700, align: 'left' })
  // messages (newest at the bottom, the stack slides up as a new one lands)
  x.save(); x.beginPath(); x.rect(L, T + 118, W, H - 118 - 96); x.clip()
  const vis = thread.filter(m => m.at <= t)
  let y = T + H - 112
  if (typing) {   // typing dots
    const bw = 130, bh = 70; y -= bh + 16
    box(x, L + 28, y, bw, bh, col, 5)
    for (let k = 0; k < 3; k++) { const b = Math.sin(t * 10 - k) > 0.3 ? -8 : 0; x.fillStyle = INK; x.fillRect(L + 52 + k * 30, y + 30 + b, 16, 16) }
  }
  for (let i = vis.length - 1; i >= 0; i--) {
    const m = vis[i], s = msgSize(x, m), slide = ease.outCubic(prog(t, m.at, m.at + 0.25))
    const hh = (s.h + 18) * (i === vis.length - 1 ? slide : 1)
    y -= hh
    if (y + s.h < T + 100) break
    const k = i === vis.length - 1 ? ease.outBack(prog(t, m.at, m.at + 0.3)) : 1
    const me = m.who === 'y', bx = me ? L + W - 28 - s.w : L + 28
    x.save(); x.translate(me ? bx + s.w : bx, y + s.h); x.scale(k, k); x.translate(-(me ? bx + s.w : bx), -(y + s.h))
    if (s.lines) {
      const grp = m.who.length > 1, gc = grp ? signStar(m.who).color : col
      box(x, bx, y, Math.max(s.w, grp ? 220 : 0), s.h, me ? (scheme.me || SKYB) : gc, 5)
      if (grp) txt(x, signStar(m.who).glyph + ' ' + NAMES[m.who].toUpperCase(), bx + 18, y + 22, { size: 22, col: INK, font: MONO, weight: 700, align: 'left' })
      x.font = `800 ${MSG}px ${INTER}`; x.fillStyle = INK; x.textAlign = 'left'; x.textBaseline = 'middle'
      s.lines.forEach((l, j) => x.fillText(l, bx + 22, y + (grp ? 34 : 0) + 15 + MSG * 1.2 * (j + 0.5) + 2))
    } else {
      box(x, bx, y, s.w, s.h, BONE, 5)
      x.save(); x.beginPath(); x.rect(bx + 10, y + 10, s.w - 20, s.h - 20); x.clip(); m.body(x, bx + s.w / 2, y + s.h / 2, s.w - 20, s.h - 20, t); x.restore()
    }
    x.restore()
    if (me && i === vis.length - 1 && t - m.at > 0.9) txt(x, 'Read', bx + s.w - 40, y + s.h + 14, { size: 20, col: 'rgba(239,230,214,0.6)', font: MONO, weight: 700 })
  }
  x.restore()
  // input bar: your reply types itself in just before it sends
  const next = thread.find(m => m.who === 'y' && t > m.at - 0.7 && t < m.at && typeof m.body === 'string')
  box(x, L + 24, T + H - 84, W - 130, 64, '#2a2450', 4)
  if (next) { const s = String(next.body).replace(/\|/g, ' '), n = Math.ceil(s.length * prog(t, next.at - 0.7, next.at - 0.1)); x.save(); x.beginPath(); x.rect(L + 30, T + H - 84, W - 145, 64); x.clip(); txt(x, s.slice(0, n) + (Math.sin(t * 12) > 0 ? '|' : ''), L + 44, T + H - 52, { size: 30, col: BONE, align: 'left', weight: 700 }); x.restore() }
  else txt(x, 'Message', L + 44, T + H - 52, { size: 30, col: 'rgba(239,230,214,0.4)', align: 'left', weight: 700 })
  x.fillStyle = INK; x.beginPath(); x.arc(L + W - 60, T + H - 52, 36, 0, Math.PI * 2); x.fill(); x.fillStyle = next ? MINT : '#4a4470'; x.beginPath(); x.arc(L + W - 60, T + H - 52, 30, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; x.beginPath(); x.moveTo(L + W - 72, T + H - 66); x.lineTo(L + W - 44, T + H - 52); x.lineTo(L + W - 72, T + H - 38); x.fill()
  x.restore()
}
/** a tiny phone held next to a star (for the cutaways) */
export function handPhone(x, P, id, lt, col = '#15121f') {
  const [cx, cy, s] = P.at(id); const px = cx + s * 0.42, py = cy + s * 0.05 + Math.sin(lt * 14) * 3
  box(x, px - 26, py - 44, 52, 88, col, 5); x.fillStyle = '#8fe3ff'; x.fillRect(px - 18, py - 34, 36, 62)
}

/** a "texts" episode: phone beats (the chat, the star peeking in the corner) and cutaways (the star out in Houston,
 *  typing the line you then see land). beats: [{ dur, kind: 'phone' | 'cut', msgs: [[lt, 's' | 'y', text | PIC fn]],
 *  bg?, set?, cast?, mood?, hops?, lines?, stick?, tags?: [[lt, d, text, bg]], front?, peekMood? }] */
export function textsEp(E) {
  let acc = 0; const thread = []
  for (const b of E.beats) { for (const m of b.msgs || []) thread.push({ at: r2(acc + m[0]), who: m[1], body: m[2] }); b.t0 = acc; acc += b.dur }
  const peek = E.peek || [130, 1450, 210]
  const scenes = E.beats.map(b => {
    const tags = (x, t, lt) => { for (const [l0, d, text, bg] of b.tags || []) { if (lt < l0 || lt > l0 + d) continue; label(x, 540, 445, text, pop01(t, t - lt + l0, 0.3, 1.8) * (1 - ease.inQuad(prog(lt, l0 + d - 0.3, l0 + d))), { size: 44, bg: bg || GOLD, rot: -0.03 }) } }
    if (b.kind === 'cut') {
      const lines = [...(b.lines || [])]
      const own = (b.msgs || []).filter(m => m[1] === 's')
      own.forEach((m, i) => lines.push([m[0], (own[i + 1]?.[0] ?? b.dur) - m[0] - 0.1, E.sign, typeof m[2] === 'string' ? m[2] : 'sent you | a pic']))
      return { dur: b.dur, set: b.set, back: b.back, cast: b.cast || {}, mood: b.mood, hops: b.hops, look: b.look, lines, stick: b.stick,
        front: (x, t, lt, P) => { b.front?.(x, t, lt, P); if (b.hand !== false && P.at(E.sign)) handPhone(x, P, E.sign, lt); tags(x, t, lt) } }
    }
    const msgsHere = (b.msgs || []).filter(m => m[1] === 's').map(m => m[0])
    return { dur: b.dur, set: b.bg || E.bg, back: (x, t, lt, P) => { b.back?.(x, t, lt, P); phone(x, t, { sign: E.sign, name: E.name, thread, scheme: E.scheme || {} }) },
      cast: { [E.sign]: [[0, ...peek]], ...(b.cast || {}) }, look: { [E.sign]: [0.6, -0.5], ...(b.look || {}) },
      mood: { [E.sign]: b.peekMood || (lt => msgsHere.some(a => lt > a - 0.8 && lt < a + 0.6) ? 'sparkle' : (E.peekMood || 'happy')), ...(b.mood || {}) },
      hops: { [E.sign]: msgsHere.map(a => a + 0.02), ...(b.hops || {}) }, lines: b.lines,
      front: (x, t, lt, P) => { b.front?.(x, t, lt, P); tags(x, t, lt) } }
  })
  const cues = [...STING, ...thread.flatMap(m => m.who !== 'y' ? [['pop', r2(m.at), 1318.5, 0.02, 0], ['pop', r2(m.at + 0.09), 1760, 0.016, 0]] : [['whoosh', r2(m.at), 0.25, 0.05]]), ...(E.cues || [])]
  return { hook: E.hook, badge: E.badge || BADGE, cues, endLen: 6.2, scenes,
    end: (x, t, lt) => partyCard(x, t, lt, { line: E.endLine, stars: E.endStars || [E.sign, 'leo', 'cancer', 'gemini'] }) }
}

// ── forecast props ─────────────────────────────────────────────────────────────────────────────────────────
export function wxIcon(x, kind, cx, cy, s = 1, t = 0) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  const cloud = (col = BONE) => { x.fillStyle = INK; for (const [dx, dy, r] of [[-40, 6, 40], [0, -16, 52], [44, 8, 38]]) { x.beginPath(); x.arc(dx, dy, r + 6, 0, Math.PI * 2); x.fill() } x.fillRect(-80, 8, 160, 52); x.fillStyle = col; for (const [dx, dy, r] of [[-40, 6, 40], [0, -16, 52], [44, 8, 38]]) { x.beginPath(); x.arc(dx, dy, r, 0, Math.PI * 2); x.fill() } x.fillRect(-74, 10, 148, 44) }
  if (kind === 'sun') heatSun(x, 0, 0, t, 52)
  else if (kind === 'cloud') cloud()
  else if (kind === 'hearts') { cloud('#ffd0de'); for (let k = 0; k < 3; k++) { const p = (t * 1.2 + k / 3) % 1; heartPix(x, -50 + k * 50, 70 + p * 60, 4, PINK) } }
  else if (kind === 'storm') { cloud('#9a9ab8'); x.fillStyle = GOLD; x.beginPath(); x.moveTo(-6, 50); x.lineTo(-30, 110); x.lineTo(0, 100); x.lineTo(-14, 150); x.lineTo(30, 80); x.lineTo(4, 88); x.lineTo(16, 50); x.fill(); x.strokeStyle = INK; x.lineWidth = 4; x.stroke() }
  else if (kind === 'fog') { cloud('#cfc8e0'); for (let k = 0; k < 3; k++) { x.fillStyle = 'rgba(239,230,214,0.8)'; x.fillRect(-90 + Math.sin(t * 2 + k) * 10, 70 + k * 22, 180, 10) } }
  else if (kind === 'heart') heartPix(x, 0, 0, 12, PINK)
  else if (kind === 'sweat') { heatSun(x, 0, 0, t, 44); sweat(x, 50, 30, t, 2) }
  else if (kind === 'cold') { cloud('#bfe6ff'); for (let k = 0; k < 4; k++) { const p = (t * 0.8 + k / 4) % 1; x.fillStyle = BONE; x.fillRect(-60 + k * 40, 70 + p * 70, 10, 10) } }
  else if (kind === 'pollen') { for (let k = 0; k < 14; k++) { const a = k * 2.4 + t, r = 20 + (k * 13) % 60; x.fillStyle = '#e8d040'; x.fillRect(Math.cos(a) * r - 6, Math.sin(a) * r - 6, 12, 12) } }
  else if (kind === 'stars') { for (let k = 0; k < 5; k++) tinyStarAt(x, -60 + (k * 37) % 120, -40 + (k * 53) % 90, 16 + 4 * Math.sin(t * 4 + k), GOLD) }
  else if (kind === 'rainbow') { const cs = ['#ff5a6e', '#ffb04a', '#ffe36b', '#7dffb0', '#8fe3ff', '#c9a6ff']; cs.forEach((c, i) => { x.strokeStyle = c; x.lineWidth = 12; x.beginPath(); x.arc(0, 40, 90 - i * 12, Math.PI, 0); x.stroke() }) }
  else if (kind === 'wind') { for (let k = 0; k < 3; k++) { x.strokeStyle = BONE; x.lineWidth = 8; x.beginPath(); const o = Math.sin(t * 3 + k) * 10; x.moveTo(-80 + o, -30 + k * 30); x.quadraticCurveTo(30 + o, -50 + k * 30, 60 + o, -20 + k * 30); x.stroke() } }
  x.restore()
}
export function heartPix(x, cx, cy, s = 8, col = PINK) {
  const H = ['.KK.KK.', 'KppKppK', 'KpppppK', '.KpppK.', '..KpK..', '...K...']
  H.forEach((row, j) => [...row].forEach((ch, i) => { if (ch !== '.') { x.fillStyle = ch === 'K' ? INK : col; x.fillRect(cx + (i - 3.5) * s, cy + (j - 3) * s, s, s) } }))
}
/** the weather studio: a wall-size map screen, a station bug, a temperature bug */
export function wxStudio(x, t, { wall = '#10264a', screen = '#123a5a', station = 'STAR WEATHER', temp = '81°', tag = 'LOVE FORECAST', draw } = {}) {
  x.fillStyle = wall; x.fillRect(0, 0, 1080, 1920)
  for (let k = 0; k < 9; k++) { x.fillStyle = k % 2 ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.05)'; x.fillRect(k * 120, 0, 120, 1920) }
  box(x, 60, 520, 960, 700, screen, 10)
  x.save(); x.beginPath(); x.rect(60, 520, 960, 700); x.clip()
  x.strokeStyle = 'rgba(143,227,255,0.10)'; x.lineWidth = 2; for (let gx = 60; gx < 1020; gx += 60) { x.beginPath(); x.moveTo(gx, 520); x.lineTo(gx, 1220); x.stroke() } for (let gy = 520; gy < 1220; gy += 60) { x.beginPath(); x.moveTo(60, gy); x.lineTo(1020, gy); x.stroke() }
  draw?.(540, 870, 960, 700); x.restore()
  x.fillStyle = '#0a1830'; x.fillRect(0, 1360, 1080, 560); x.fillStyle = INK; x.fillRect(0, 1354, 1080, 10)
  stationBug(x, t, station, tag, temp)
}
export function stationBug(x, t, station, tag, temp) {
  box(x, 40, 1240, 640, 100, '#0e1a3a', 5); x.fillStyle = BRAKE; x.fillRect(40, 1240, 14, 100)
  txt(x, station, 74, 1272, { size: 34, col: BONE, align: 'left' }); txt(x, tag, 74, 1314, { size: 26, col: GOLD, font: MONO, weight: 700, align: 'left' })
  if (temp) { box(x, 820, 1240, 220, 100, '#e05a3a', 5); txt(x, temp, 930, 1292, { size: 64, col: BONE }) }
}
/** a Houston map for the screen: the three loops, labelled areas, weather icons on top */
export function wxMap(x, cx, cy, t, { areas = [], icons = [], front = null, sweep = false } = {}) {
  loopMap(x, cx, cy, 1.05, t)
  for (const [ax, ay, lab] of areas) { x.fillStyle = BONE; x.fillRect(cx + ax - 6, cy + ay - 6, 12, 12); txt(x, lab, cx + ax, cy + ay + 26, { size: 22, col: BONE, font: MONO, weight: 700 }) }
  if (sweep) { const a = t * 2.2; x.save(); x.globalAlpha = 0.25; x.fillStyle = MINT; x.beginPath(); x.moveTo(cx, cy); x.arc(cx, cy, 420, a, a + 0.5); x.fill(); x.restore() }
  if (front) { const [fx0, col] = front, fx = cx + fx0; for (let k = 0; k < 6; k++) { x.fillStyle = col; x.beginPath(); x.moveTo(fx, cy - 300 + k * 110); x.lineTo(fx + 44, cy - 278 + k * 110); x.lineTo(fx, cy - 256 + k * 110); x.fill() } x.fillStyle = col; x.fillRect(fx - 6, cy - 300, 8, 640) }
  for (const [ix, iy, kind, s, a] of icons) wxIcon(x, kind, cx + ix, cy + iy, s ?? 0.8, t + (a || 0))
}
/** a 5-panel outlook board (labels never claim a weekday) */
export function outlook(x, t, lt, cards, { y = 870, at = 0.2 } = {}) {
  const n = cards.length, w = 180, gap = 12, L = 540 - (n * w + (n - 1) * gap) / 2
  cards.forEach(([head, kind, temp, note], i) => {
    const k = Kp(lt, at + i * 0.22); if (k <= 0) return
    const cx = L + i * (w + gap) + w / 2
    x.save(); x.translate(cx, y); x.scale(k, k)
    box(x, -w / 2, -230, w, 460, i === n - 1 ? '#3a1d52' : '#12305a', 6)
    x.fillStyle = i === n - 1 ? GOLD : '#2b5fb0'; x.fillRect(-w / 2, -230, w, 64)
    txt(x, head, 0, -198, { size: head.length > 7 ? 24 : 30, col: i === n - 1 ? INK : BONE, font: MONO, weight: 700 })
    wxIcon(x, kind, 0, -60, 0.72, t + i)
    txt(x, temp, 0, 80, { size: 64, col: BONE })
    if (note) { const parts = note.split(' | '); parts.forEach((p, j) => txt(x, p, 0, 150 + j * 34, { size: 24, col: GOLD, font: MONO, weight: 700 })) }
    x.restore()
  })
}
/** a red alert crawl band ("FLIRT ADVISORY IN EFFECT…") */
export function alertBand(x, t, head, crawl, { y = 1440, col = BRAKE } = {}) {
  box(x, 0, y, 1080, 90, col, 5); txt(x, head, 540, y + 46, { size: 46, col: BONE })
  x.fillStyle = BONE; x.fillRect(0, y + 96, 1080, 64)
  x.save(); x.beginPath(); x.rect(0, y + 96, 1080, 64); x.clip(); const w = crawl.length * 21, off = (t * 160) % w
  for (let k = -1; k < 3; k++) txt(x, crawl, -off + k * w, y + 130, { size: 32, col: INK, font: MONO, weight: 700, align: 'left' }); x.restore()
}
/** a clicker in the forecaster's hand */
export function clicker(x, P, id, t) { const [cx, cy, s] = P.at(id); const px = cx + s * 0.45, py = cy + s * 0.1; box(x, px - 12, py - 30, 24, 60, '#2a2a3a', 4); x.fillStyle = BRAKE; x.fillRect(px - 5, py - 22, 10, 10) }
/** an on-location reporter set: microphone, wind lines, a lower third */
export function mic(x, P, id) { const [cx, cy, s] = P.at(id); const px = cx + s * 0.5, py = cy + s * 0.05; box(x, px - 8, py - 10, 16, 90, '#2a2a3a', 4); x.fillStyle = INK; x.beginPath(); x.arc(px, py - 20, 26, 0, Math.PI * 2); x.fill(); x.fillStyle = '#6b6f80'; x.beginPath(); x.arc(px, py - 20, 20, 0, Math.PI * 2); x.fill(); box(x, px - 24, py + 10, 48, 30, BRAKE, 3) }
export function lowerBar(x, head, sub, k = 1, { y = 1500, col = '#0e1a3a', acc = BRAKE } = {}) {
  if (k <= 0) return
  x.save(); x.globalAlpha = clamp(k); box(x, 40, y, 1000 * clamp(k), 120, col, 5); x.fillStyle = acc; x.fillRect(40, y, 14, 120)
  txt(x, head, 76, y + 42, { size: 40, col: BONE, align: 'left' }); if (sub) txt(x, sub, 76, y + 90, { size: 28, col: GOLD, font: MONO, weight: 700, align: 'left' }); x.restore()
}
export const SIGNS12 = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces']
