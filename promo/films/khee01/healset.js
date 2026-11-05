// HEALING ERA: the shared sets and props for khee01–khee20 (Month 2 boost, batch m15). Read-only for other films.
//   kitchen(x, t, o)       the series' kitchen (fridge left, counter + stove right, window, wall calendar). o:
//                           { morning 0…1 (night → sunrise), dim 0…1, fridgeNote: 'text|text', mess: 0…1, stoveClock,
//                             cal: { day, flips: [{ at, to, back? }] } (the tear-off DAY calendar on the wall), noCal }
//   bigCal(x, t, cx, cy, o) a free-standing tear-off DAY calendar (same look, any size): { day, flips, s, rot }
//   dayAt(cal, t)          the calendar's day at t
//   bedroom(x, t, o)       a bed under a window (morning 0…1), for the "good morning" films
//   shopAisle(x, t, o)     a corner-shop aisle (oranges, shelves), for khee14
//   tile floor, blanket, cereal, plates, pot, laptop, suitcase, plant, talkCard: small pixel props (see below)
// Pure f(t). Imports the Single and Thriving prop helpers (nste01/singlekit.js) read-only.
import { R, box, ink, label, glow, drawBits, HEART, INK, BONE, GOLD, PINK, MINT, SKYB, RED, LAV, INTER, MONO, SERIF, pop01, outK, clamp, lerp, prog, ease, drawPixelStar, easeOutBack } from '../nste01/singlekit.js'

export const NIGHT = { wall: '#2a2050', wall2: '#251b48', floorA: '#3a2a52', floorB: '#33254a', sky0: '#0e0b2a', sky1: '#1d1650' }
export const MORN = { wall: '#5a4478', wall2: '#523f70', floorA: '#6a5072', floorB: '#5e4668', sky0: '#ffb68a', sky1: '#ffd9a0' }
const mixHex = (a, b, k) => {
  const p = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16))
  const A = p(a), B = p(b)
  return '#' + A.map((v, i) => Math.round(lerp(v, B[i], clamp(k))).toString(16).padStart(2, '0')).join('')
}
export const pal = k => Object.fromEntries(Object.keys(NIGHT).map(n => [n, mixHex(NIGHT[n], MORN[n], k)]))
export { mixHex }

/** the tile floor from y to the bottom */
export function tileFloor(x, y, k = 0, { a, b } = {}) {
  const P = pal(k)
  R(x, INK, 0, y - 6, 1080, 10)
  const s = 120
  for (let j = 0; y + j * s < 1920; j++) for (let i = 0; i < 9; i++) R(x, (i + j) % 2 ? (b || P.floorB) : (a || P.floorA), i * s, y + 4 + j * s, s, s)
  for (let j = 0; j < 5; j++) R(x, 'rgba(255,255,255,0.03)', 0, y + 30 + j * 120, 1080, 4)
}

/** the tear-off DAY pad, centred at (cx, cy), s = scale (1 → 180 × 200) */
export function dayAt(cal, t) {
  let d = cal.day
  for (const f of cal.flips || []) if (t >= f.at + (f.dur ?? 0.5)) d = f.to
  return d
}
export function bigCal(x, t, cx, cy, { day, flips = [], s = 1, rot = 0, col = RED } = {}) {
  const w = 180 * s, h = 200 * s
  const page = (d, px = 0, py = 0, r = 0, a = 1) => {
    x.save(); x.globalAlpha *= a; x.translate(px, py); x.rotate(r)
    box(x, -w / 2, -h / 2, w, h, BONE, { b: 6 * s })
    R(x, col, -w / 2, -h / 2, w, 52 * s)
    ink(x, 'DAY', 0, -h / 2 + 27 * s, { size: 30 * s, col: BONE, font: INTER, weight: 800 })
    ink(x, String(d), 0, 26 * s, { size: (String(d).length > 1 ? 104 : 118) * s, col: INK, font: INTER, weight: 800 })
    x.restore()
  }
  x.save(); x.translate(cx, cy); x.rotate(rot)
  // two ring binders
  // the current page, plus any page mid-flight
  let cur = day, flying = null
  for (const f of flips) {
    const d = f.dur ?? 0.5
    if (t >= f.at + d) cur = f.to
    else if (t >= f.at) flying = { f, p: (t - f.at) / d, from: cur }
  }
  if (flying) {
    const { f, p, from } = flying
    // a burst of torn pages (fast flips through the days in between)
    const n = Math.min(6, Math.abs(f.to - from))
    page(f.to)
    for (let i = n - 1; i >= 0; i--) {
      const q = clamp(p * 1.6 - i * 0.12)
      if (q <= 0 || q >= 1) { if (q <= 0) page(i === 0 ? from : lerp(from, f.to, i / n) | 0); continue }
      const dir = (i % 2 ? -1 : 1)
      page(i === 0 ? from : Math.round(lerp(from, f.to, i / n)), dir * q * 260 * s, -q * 220 * s + q * q * 520 * s, dir * q * 2.2, 1 - q)
    }
  } else page(cur)
  for (const dx of [-0.25, 0.25]) { R(x, INK, dx * w - 9 * s, -h / 2 - 14 * s, 18 * s, 26 * s); R(x, '#b9b2cc', dx * w - 5 * s, -h / 2 - 10 * s, 10 * s, 18 * s) }
  x.restore()
}

/** the fridge (left), with magnets and an optional note */
export function fridge(x, t, X = 40, top = 600, w = 300, floorY = 1420, { note = null, noteK = 1, k = 0 } = {}) {
  const body = mixHex('#c9d3ea', '#e9e2f2', k)
  box(x, X, top, w, floorY - top - 6, body, { b: 8, hi: 'rgba(255,255,255,0.35)' })
  R(x, INK, X, top + 250, w, 8)
  R(x, INK, X + w - 46, top + 120, 16, 90); R(x, INK, X + w - 46, top + 300, 16, 160)
  R(x, '#8f9ab8', X + w - 42, top + 124, 8, 82); R(x, '#8f9ab8', X + w - 42, top + 304, 8, 152)
  // magnets
  const M = [[X + 40, top + 40, PINK], [X + 110, top + 70, GOLD], [X + 60, top + 320, MINT], [X + 170, top + 520, SKYB]]
  for (const [mx, my, c] of M) { R(x, INK, mx - 4, my - 4, 36, 36); R(x, c, mx, my, 28, 28) }
  if (note && noteK > 0.01) {
    x.save(); x.translate(X + w / 2 + 40, top + 420); x.rotate(-0.05); x.scale(noteK, noteK)
    box(x, -110, -80, 220, 160, '#fff1a6', { b: 5 })
    const L = note.split('|')
    L.forEach((l, i) => ink(x, l, 0, (i - (L.length - 1) / 2) * 34, { size: 26, font: INTER, weight: 800 }))
    R(x, INK, -14, -92, 28, 22); R(x, PINK, -10, -88, 20, 14)
    x.restore()
  }
}

/** the kitchen. Returns the floor y (1420). */
export function kitchen(x, t, { morning = 0, dim = 0, fridgeNote = null, noteK = 1, cal = null, stoveClock = null, mess = 0, pot = false, win = true } = {}) {
  const P = pal(morning)
  const floorY = 1420
  R(x, P.wall, 0, 300, 1080, floorY - 300)
  for (let i = 0; i < 1080; i += 90) R(x, P.wall2, i, 300, 44, floorY - 300)
  // window with the sky (night stars → sunrise)
  if (win) {
    const WX = 600, WY = 470, WW = 300, WH = 300
    box(x, WX, WY, WW, WH, P.sky0, { b: 10 })
    for (let j = 0; j < 10; j++) R(x, mixHex(P.sky0, P.sky1, j / 9), WX, WY + j * WH / 10, WW, WH / 10 + 1)
    if (morning < 0.6) for (let i = 0; i < 8; i++) drawPixelStar(x, WX + 30 + ((i * 97) % (WW - 60)), WY + 30 + ((i * 61) % (WH * 0.6)), 10, 1, i % 3 ? BONE : GOLD)
    if (morning > 0.2) {
      const sy = lerp(WY + WH + 60, WY + 170, morning)
      x.save(); x.beginPath(); x.rect(WX, WY, WW, WH); x.clip()
      x.globalCompositeOperation = 'lighter'; glow(x, WX + 160, sy, 220, 0.35 * morning, '255,200,140'); x.globalCompositeOperation = 'source-over'
      R(x, INK, WX + 112, sy - 52, 104, 104); R(x, '#ffd86a', WX + 116, sy - 48, 96, 96); R(x, '#fff1b8', WX + 128, sy - 36, 30, 30)
      x.restore()
    } else {
      // a pixel crescent moon
      const MOON = ['..XXX..', '.XX....', 'XX.....', 'XX.....', 'XX.....', '.XX....', '..XXX..']
      drawBits(x, MOON, { X: '#f4ecd8' }, WX + 232, WY + 205, 8)
    }
    R(x, INK, WX + WW / 2 - 5, WY, 10, WH); R(x, INK, WX, WY + WH / 2 - 5, WW, 10)
    R(x, '#7a5e9a', WX - 24, WY + WH + 10, WW + 48, 18)
    if (morning > 0.3) { x.save(); x.globalAlpha = 0.18 * morning; x.fillStyle = '#ffd9a0'; x.beginPath(); x.moveTo(WX, WY + WH); x.lineTo(WX + WW, WY + WH); x.lineTo(WX + WW + 260, floorY + 300); x.lineTo(WX - 200, floorY + 300); x.closePath(); x.fill(); x.restore() }
  }
  // upper cabinets
  box(x, 370, 470, 200, 280, '#6a4f8e', { b: 7, hi: 'rgba(255,255,255,0.12)' }); R(x, INK, 548, 590, 10, 50)
  box(x, 930, 470, 160, 280, '#6a4f8e', { b: 7, hi: 'rgba(255,255,255,0.12)' }); R(x, INK, 946, 590, 10, 50)
  // counter + lower cabinets
  box(x, 370, 1060, 720, 40, '#d8c6a8', { b: 7, hi: '#efe0c4' })
  box(x, 380, 1106, 700, floorY - 1112, '#5a4280', { b: 6 })
  for (const cx of [380, 555, 730, 905]) { R(x, INK, cx + 170, 1106, 6, floorY - 1112); R(x, INK, cx + 140, 1150, 12, 44) }
  // stove
  box(x, 760, 1030, 230, 30, '#3a3352', { b: 5 })
  for (const sx of [800, 950]) { R(x, INK, sx - 26, 1026, 52, 8) }
  if (stoveClock) { box(x, 690, 1112, 120, 50, '#120e28', { b: 5 }); ink(x, stoveClock, 750, 1138, { size: 30, col: '#7fe3a0', font: MONO, weight: 700 }) }
  if (pot) { box(x, 820, 950, 150, 80, '#9aa4c0', { b: 6, hi: '#c9d0e4' }); R(x, INK, 800, 966, 24, 12); R(x, INK, 966, 966, 24, 12) }
  // the fridge
  fridge(x, t, 40, 600, 300, floorY, { note: fridgeNote, noteK, k: morning })
  // wall calendar above the counter (left of the window)
  if (cal) bigCal(x, t, 470, 900, { day: cal.day, flips: cal.flips, s: 0.62, rot: -0.03 })
  tileFloor(x, floorY, morning)
  // the mess (crumbs, a tissue or two)
  if (mess > 0) for (let i = 0; i < Math.round(12 * mess); i++) { const px = 120 + (i * 173) % 860, py = 1480 + (i * 89) % 300; R(x, INK, px - 3, py - 3, 22, 18); R(x, i % 3 ? '#f4f0ff' : '#e0b070', px, py, 16, 12) }
  if (dim > 0) R(x, `rgba(5,4,14,${dim})`, 0, 0, 1080, 1920)
  return floorY
}

/** a bed under a window (khee15) */
export function bedroom(x, t, { morning = 1, dim = 0 } = {}) {
  const P = pal(morning)
  R(x, P.wall, 0, 300, 1080, 1120); for (let i = 0; i < 1080; i += 90) R(x, P.wall2, i, 300, 44, 1120)
  const WX = 300, WY = 430, WW = 480, WH = 380
  box(x, WX, WY, WW, WH, P.sky0, { b: 10 })
  for (let j = 0; j < 10; j++) R(x, mixHex(P.sky0, P.sky1, j / 9), WX, WY + j * WH / 10, WW, WH / 10 + 1)
  const sy = lerp(WY + WH + 40, WY + 150, morning)
  x.save(); x.beginPath(); x.rect(WX, WY, WW, WH); x.clip(); x.globalCompositeOperation = 'lighter'; glow(x, WX + 240, sy, 300, 0.4 * morning, '255,200,140'); x.globalCompositeOperation = 'source-over'
  R(x, INK, WX + 186, sy - 56, 112, 112); R(x, '#ffd86a', WX + 190, sy - 52, 104, 104); x.restore()
  R(x, INK, WX + WW / 2 - 5, WY, 10, WH); R(x, INK, WX, WY + WH / 2 - 5, WW, 10)
  x.save(); x.globalAlpha = 0.2 * morning; x.fillStyle = '#ffd9a0'; x.beginPath(); x.moveTo(WX, WY + WH); x.lineTo(WX + WW, WY + WH); x.lineTo(WX + WW + 300, 1920); x.lineTo(WX - 300, 1920); x.closePath(); x.fill(); x.restore()
  tileFloor(x, 1420, morning, { a: '#5a3e5e', b: '#523857' })
  // the bed
  box(x, 90, 1060, 900, 120, '#7a5aa8', { b: 8 }); box(x, 60, 980, 70, 440, '#5a3e7a', { b: 7 }); box(x, 950, 1060, 70, 360, '#5a3e7a', { b: 7 })
  box(x, 130, 1180, 820, 180, '#f0e6ff', { b: 7, hi: '#ffffff' }); box(x, 150, 1120, 220, 70, '#ffffff', { b: 6 })
  box(x, 330, 1200, 620, 160, '#ff8fb1', { b: 6, hi: '#ffb3cb' })
  if (dim > 0) R(x, `rgba(5,4,14,${dim})`, 0, 0, 1080, 1920)
}

/** a corner-shop aisle (khee14) */
export function shopAisle(x, t, { dim = 0 } = {}) {
  R(x, '#3a3060', 0, 300, 1080, 1120)
  for (const sx of [-40, 640]) {
    box(x, sx, 420, 480, 1000, '#5a4a80', { b: 7 })
    for (let j = 0; j < 5; j++) {
      const sy = 520 + j * 180
      R(x, INK, sx, sy + 110, 480, 14)
      for (let i = 0; i < 6; i++) { const c = [GOLD, PINK, MINT, SKYB, '#ff9b5c', LAV][(i + j + (sx > 0 ? 2 : 0)) % 6]; box(x, sx + 24 + i * 76, sy + 10, 56, 96, c, { b: 4, hi: 'rgba(255,255,255,0.25)' }) }
    }
  }
  // the speaker on the ceiling
  box(x, 480, 330, 120, 60, '#2a2148', { b: 6 }); for (let i = 0; i < 4; i++) R(x, INK, 496 + i * 26, 346, 14, 28)
  tileFloor(x, 1420, 0.3, { a: '#d8d0e8', b: '#c4bad8' })
  if (dim > 0) R(x, `rgba(5,4,14,${dim})`, 0, 0, 1080, 1920)
}

// ── small props
export function cereal(x, cx, cy, { rot = 0, s = 1 } = {}) {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
  box(x, -60, -90, 120, 180, '#ffb03a', { b: 6, hi: '#ffd06a' }); R(x, RED, -60, -40, 120, 40); ink(x, 'O-OS', 0, -20, { size: 26, col: BONE })
  for (let i = 0; i < 3; i++) { R(x, INK, -34 + i * 26, 30, 20, 20); R(x, '#f6d48a', -30 + i * 26, 34, 12, 12) }
  x.restore()
}
export function flyingBits(x, t, t0, cx, cy, { n = 10, col = '#f6d48a', life = 1.2, spread = 1 } = {}) {
  const tt = t - t0
  if (tt < 0 || tt > life) return
  for (let i = 0; i < n; i++) {
    const a = -Math.PI / 2 + (i / n - 0.5) * 2.6 * spread, v = 380 + (i * 53) % 220
    const px = cx + Math.cos(a) * v * tt, py = cy + Math.sin(a) * v * tt + 900 * tt * tt
    R(x, INK, px - 3, py - 3, 20, 20); R(x, col, px, py, 14, 14)
  }
}
export function plate(x, cx, cy, { s = 1, food = false, glowK = 0 } = {}) {
  if (glowK > 0) { x.save(); x.globalCompositeOperation = 'lighter'; glow(x, cx, cy, 160 * s, 0.4 * glowK, '255,214,150'); x.restore() }
  R(x, INK, cx - 74 * s, cy - 18 * s, 148 * s, 36 * s); R(x, '#f4f0ff', cx - 68 * s, cy - 14 * s, 136 * s, 26 * s); R(x, '#d8d0ee', cx - 44 * s, cy - 8 * s, 88 * s, 12 * s)
  if (food) { R(x, INK, cx - 40 * s, cy - 40 * s, 80 * s, 30 * s); R(x, '#e8a04a', cx - 36 * s, cy - 36 * s, 72 * s, 24 * s); R(x, MINT, cx - 10 * s, cy - 44 * s, 16 * s, 12 * s) }
}
export function laptop(x, cx, cy, { s = 1, open = 1, screen = null, col = '#1a2a48' } = {}) {
  // base
  box(x, cx - 150 * s, cy, 300 * s, 22 * s, '#9aa4c0', { b: 5 })
  if (open <= 0.02) return
  x.save(); x.translate(cx, cy); x.scale(1, open)
  box(x, -140 * s, -200 * s, 280 * s, 196 * s, '#9aa4c0', { b: 5 })
  R(x, col, -128 * s, -188 * s, 256 * s, 172 * s)
  if (screen) screen(x, -128 * s, -188 * s, 256 * s, 172 * s)
  x.restore()
}
export function suitcase(x, cx, cy, { s = 1, open = 0, col = '#e8344e' } = {}) {
  box(x, cx - 140 * s, cy - 180 * s, 280 * s, 180 * s, col, { b: 7, hi: 'rgba(255,255,255,0.2)' })
  R(x, INK, cx - 40 * s, cy - 210 * s, 80 * s, 14 * s); R(x, INK, cx - 40 * s, cy - 210 * s, 12 * s, 34 * s); R(x, INK, cx + 28 * s, cy - 210 * s, 12 * s, 34 * s)
  if (open > 0) {
    x.save(); x.translate(cx, cy - 180 * s); x.rotate(-open * 1.1)
    box(x, -140 * s, -40 * s, 280 * s, 40 * s, col, { b: 6 }); x.restore()
    for (let i = 0; i < 4; i++) { const c = [GOLD, MINT, SKYB, PINK][i]; R(x, INK, cx - 110 * s + i * 60 * s, cy - 214 * s - open * 30 * (i % 2), 50 * s, 40 * s); R(x, c, cx - 106 * s + i * 60 * s, cy - 210 * s - open * 30 * (i % 2), 42 * s, 32 * s) }
  }
}
export function plant(x, t, cx, cy, { s = 1, wilt = 0, leaves = 3, bloom = 0 } = {}) {
  box(x, cx - 60 * s, cy - 90 * s, 120 * s, 90 * s, '#c96a3a', { b: 6, hi: '#e08a5a' })
  const stemTop = cy - 90 * s - lerp(160, 60, wilt) * s
  x.save(); x.strokeStyle = INK; x.lineWidth = 14 * s; x.beginPath(); x.moveTo(cx, cy - 90 * s); x.quadraticCurveTo(cx + wilt * 90 * s, stemTop - 20 * s, cx + wilt * 120 * s, stemTop + wilt * 60 * s); x.stroke()
  x.strokeStyle = '#3fae5a'; x.lineWidth = 7 * s; x.stroke(); x.restore()
  for (let i = 0; i < leaves; i++) {
    const p = (i + 1) / (leaves + 1), lx = cx + wilt * 120 * s * p * p + (i % 2 ? 26 : -26) * s, ly = lerp(cy - 90 * s, stemTop + wilt * 60 * s, p)
    x.save(); x.translate(lx, ly); x.rotate((i % 2 ? 0.6 : -0.6) + wilt * 1.2 * (i % 2 ? 1 : -1))
    R(x, INK, -30 * s, -14 * s, 60 * s, 28 * s); R(x, i === leaves - 1 && leaves > 3 ? '#8af07a' : '#3fae5a', -26 * s, -10 * s, 52 * s, 20 * s); x.restore()
  }
  if (bloom > 0.01) { const k = bloom; x.save(); x.translate(cx + wilt * 120 * s, stemTop + wilt * 60 * s - 10 * s); x.scale(k, k); for (let i = 0; i < 6; i++) { const a = i / 6 * Math.PI * 2; R(x, INK, Math.cos(a) * 30 * s - 20 * s, Math.sin(a) * 30 * s - 20 * s, 40 * s, 40 * s); R(x, PINK, Math.cos(a) * 30 * s - 16 * s, Math.sin(a) * 30 * s - 16 * s, 32 * s, 32 * s) } R(x, INK, -20 * s, -20 * s, 40 * s, 40 * s); R(x, GOLD, -16 * s, -16 * s, 32 * s, 32 * s); x.restore() }
}
/** a talk card (drawn, never branded): a face-down back or a face-up question */
export function talkCard(x, cx, cy, { text = '', up = 1, s = 1, rot = 0, k = 1 } = {}) {
  if (k <= 0.01) return
  const w = 300 * s, h = 420 * s
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k * Math.max(0.04, Math.abs(Math.cos(Math.PI * up))), k)
  R(x, 'rgba(6,4,18,0.45)', -w / 2 + 12, -h / 2 + 16, w, h)
  if (up < 0.5) {
    box(x, -w / 2, -h / 2, w, h, '#2a1f5a', { b: 7 * s }); R(x, GOLD, -w / 2 + 18 * s, -h / 2 + 18 * s, w - 36 * s, 6 * s); R(x, GOLD, -w / 2 + 18 * s, h / 2 - 24 * s, w - 36 * s, 6 * s)
    drawPixelStar(x, -40 * s, -40 * s, 80 * s, 0, GOLD, BONE)
  } else {
    box(x, -w / 2, -h / 2, w, h, '#fff6e6', { b: 7 * s }); R(x, '#dcaaf2', -w / 2, -h / 2, w, 64 * s)
    ink(x, 'TALK CARD', 0, -h / 2 + 33 * s, { size: 24 * s, col: INK, font: MONO, weight: 700 })
    const L = text.split('|')
    L.forEach((l, i) => ink(x, l, 0, 10 * s + (i - (L.length - 1) / 2) * 40 * s, { size: 30 * s, col: INK }))
    drawPixelStar(x, -17 * s, h / 2 - 67 * s, 34 * s, 1, GOLD, BONE)
  }
  x.restore()
}
export function blanket(x, cx, cy, w, h, { col = '#7c74f0', col2 = '#9a92ff' } = {}) {
  box(x, cx - w / 2, cy - h / 2, w, h, col, { b: 7 })
  for (let i = 0; i < w; i += 60) R(x, col2, cx - w / 2 + i, cy - h / 2, 30, h)
}
export { HEART, drawBits, easeOutBack }

/** a big phone held in the scene. mode: 'chat' (bubbles scrolling by `scroll` px), 'notes' (typed lines), 'profile'
 *  (a photo grid), 'camera' (a selfie preview of the sign colour), 'blank'. glowK lights the face in front of it. */
export function bigPhone(x, t, cx, cy, { w = 300, h = 520, rot = 0, mode = 'chat', scroll = 0, blurK = 0, title = '', lines = [], typed = 1, col = '#5fa8ff', k = 1, badge = null } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  box(x, -w / 2, -h / 2, w, h, '#2a2148', { b: 8 })
  const sx = -w / 2 + 14, sy = -h / 2 + 46, sw = w - 28, sh = h - 70
  R(x, '#120e28', sx, sy, sw, sh)
  R(x, INK, -36, -h / 2 + 16, 72, 12)
  x.save(); x.beginPath(); x.rect(sx, sy, sw, sh); x.clip()
  if (title) { R(x, '#1e1844', sx, sy, sw, 44); ink(x, title, 0, sy + 23, { size: 22, col: BONE, font: MONO, weight: 700 }) }
  if (mode === 'chat') {
    const rowH = 64, n = Math.ceil(sh / rowH) + 2, off = ((scroll % rowH) + rowH) % rowH
    for (let i = -1; i < n; i++) {
      const idx = Math.floor(scroll / rowH) + i, right = ((idx * 7 + 3) % 5) < 2
      const bw = 90 + ((idx * 53) % 4) * 34, by = sy + 50 + i * rowH - off
      R(x, INK, right ? sx + sw - 16 - bw - 3 : sx + 13, by - 3, bw + 6, 46); R(x, right ? col : '#efe6d6', right ? sx + sw - 16 - bw : sx + 16, by, bw, 40)
      R(x, right ? 'rgba(255,255,255,0.5)' : 'rgba(27,18,54,0.35)', (right ? sx + sw - 16 - bw : sx + 16) + 12, by + 16, bw * 0.6, 8)
    }
    if (blurK > 0) { x.save(); x.globalAlpha = 0.5 * blurK; for (let j = 0; j < 6; j++) R(x, 'rgba(160,190,255,0.25)', sx, sy + ((t * 1800 + j * 97) % sh), sw, 18); x.restore() }
    // the scroll bar
    R(x, 'rgba(255,255,255,0.25)', sx + sw - 8, sy + 8 + ((scroll / 40) % (sh - 60)), 5, 48)
  } else if (mode === 'notes') {
    R(x, '#fff6d8', sx, sy + (title ? 44 : 0), sw, sh)
    const all = lines.join('\n'), shown = Math.floor(all.length * clamp(typed))
    let c = 0
    lines.forEach((l, i) => { const part = l.slice(0, Math.max(0, shown - c)); c += l.length + 1; ink(x, part, sx + 18, sy + (title ? 80 : 36) + i * 40, { size: 24, align: 'left', col: INK }) })
    if (Math.floor(t * 3) % 2 === 0) { const li = lines.length - 1; R(x, INK, sx + 22 + Math.min(sw - 40, (lines[li] || '').length * 13 * clamp(typed)), sy + (title ? 66 : 22) + li * 40, 4, 28) }
  } else if (mode === 'profile') {
    R(x, '#1e1844', sx, sy, sw, sh)
    R(x, INK, -42, sy + 20, 84, 84); R(x, col, -38, sy + 24, 76, 76)
    for (let i = 0; i < 9; i++) { const gx = sx + 10 + (i % 3) * (sw - 20) / 3, gy = sy + 130 + Math.floor(i / 3) * ((sw - 20) / 3) - scroll; R(x, INK, gx, gy, (sw - 20) / 3 - 6, (sw - 20) / 3 - 6); R(x, [PINK, GOLD, SKYB, MINT, LAV][(i * 3) % 5], gx + 4, gy + 4, (sw - 20) / 3 - 14, (sw - 20) / 3 - 14) }
  } else if (mode === 'camera') {
    for (let j = 0; j < 8; j++) R(x, mixHex('#3a2c6a', '#6a4a9a', j / 7), sx, sy + j * sh / 8, sw, sh / 8 + 1)
    drawPixelStar(x, -75, sy + sh * 0.5 - 75, 150, 0, col, '#ffffff')
    R(x, INK, -32, sy + sh - 70, 64, 64); R(x, BONE, -26, sy + sh - 64, 52, 52)
  } else R(x, '#1e1844', sx, sy, sw, sh)
  x.restore()
  if (badge) { R(x, INK, w / 2 - 44, -h / 2 - 16, 60, 44); R(x, RED, w / 2 - 40, -h / 2 - 12, 52, 36); ink(x, badge, w / 2 - 14, -h / 2 + 6, { size: 22, col: BONE }) }
  x.restore()
  if (mode === 'chat' && k > 0.5) { x.save(); x.globalCompositeOperation = 'lighter'; glow(x, cx, cy, w * 1.1, 0.18, '127,170,255'); x.restore() }
}
