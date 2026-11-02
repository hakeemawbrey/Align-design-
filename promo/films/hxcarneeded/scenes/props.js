// props — hxcarneeded's field kit: a golden-hour street (low shops, a bike lane, a bus stop), a bus, a bike, a friend's
// car, a pixel city map with a long route, a bus-stop bench at dusk, phone chat bubbles, a toy car and a tandem bike
// (the specimens). Generic city, no real brands, routes or numbers. Pure f(t); no `document` at top level.
import { clamp, lerp, ease, rng } from '../../../src/lib.js'
import { drawStarChar } from '../../startalk.js'
import { drawPixelStar } from '../../sky.js'
import { drawBits, INK, BONE, GOLD, MONO, rgba } from './lab.js'

const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const ROAD = [1060, 1290], WALK_BACK = 1000

// ── the sky: golden hour (k = 1) → dusk (k = 0)
export function drawGoldSky(x, t, { k = 1 } = {}) {
  const g = x.createLinearGradient(0, 0, 0, 1000)
  g.addColorStop(0, k > 0.5 ? '#3a2266' : '#160c36'); g.addColorStop(0.6, k > 0.5 ? '#c2507a' : '#4a2a6a'); g.addColorStop(1, k > 0.5 ? '#ffc070' : '#a04a6a')
  x.fillStyle = g; x.fillRect(0, 0, 1080, 1000)
  if (k < 0.9) for (let i = 0; i < 24; i++) { const tw = 0.5 + 0.5 * Math.sin(t * 3 + i); x.fillStyle = rgba('#fff6d8', (1 - k) * 0.8 * tw); x.fillRect((i * 397) % 1080, 110 + ((i * 263) % 480), 4, 4) }
}
// ── a row of low shops (awnings, windows, no names)
const SHOPS = (() => { const r = rng(21), out = []; let xx = -20; while (xx < 1100) { const w = 170 + Math.floor(r() * 120), h = 220 + Math.floor(r() * 160); out.push({ x: xx, w, h, c: ['#7a3a5a', '#5a3a7a', '#7a5a3a', '#3a5a6a'][out.length % 4], aw: ['#ff8fb1', '#7fe0ff', GOLD, '#7dffb0'][out.length % 4] }); xx += w + 10 } return out })()
export function drawStreet(x, t, { k = 1 } = {}) {
  drawGoldSky(x, t, { k })
  for (const s of SHOPS) {
    const top = WALK_BACK - s.h
    x.fillStyle = INK; x.fillRect(s.x - 4, top - 4, s.w + 8, s.h + 8)
    x.fillStyle = s.c; x.fillRect(s.x, top, s.w, s.h)
    x.fillStyle = 'rgba(0,0,0,0.2)'; x.fillRect(s.x, top, s.w, 16)
    // awning stripes
    for (let i = 0; i < s.w; i += 28) { x.fillStyle = (i / 28) % 2 ? BONE : s.aw; x.fillRect(s.x + i, WALK_BACK - 170, 28, 34) }
    x.fillStyle = INK; x.fillRect(s.x, WALK_BACK - 136, s.w, 4)
    // windows, lit
    x.fillStyle = rgba('#ffd27a', k > 0.5 ? 0.55 : 0.85); x.fillRect(s.x + 18, WALK_BACK - 120, s.w - 100, 90); x.fillStyle = INK; x.fillRect(s.x + s.w - 70, WALK_BACK - 120, 50, 120)
    for (let wy = top + 30; wy < WALK_BACK - 200; wy += 60) for (let wx = s.x + 20; wx < s.x + s.w - 40; wx += 56) { x.fillStyle = rgba('#ffd27a', (k > 0.5 ? 0.35 : 0.7) * ((wx + wy) % 3 ? 1 : 0.4)); x.fillRect(wx, wy, 30, 34) }
  }
  // a street tree
  for (const tx of [130, 640]) { x.fillStyle = '#5a3a28'; x.fillRect(tx - 8, WALK_BACK - 220, 16, 230); x.fillStyle = '#2e5a36'; x.fillRect(tx - 80, WALK_BACK - 360, 160, 150); x.fillStyle = '#3f7a42'; x.fillRect(tx - 60, WALK_BACK - 390, 110, 70) }
  // back sidewalk, road, bike lane, curb, front sidewalk
  x.fillStyle = '#b8a8b8'; x.fillRect(0, WALK_BACK, 1080, ROAD[0] - WALK_BACK)
  x.fillStyle = INK; x.fillRect(0, ROAD[0] - 4, 1080, 4)
  x.fillStyle = '#3a3448'; x.fillRect(0, ROAD[0], 1080, ROAD[1] - ROAD[0])
  x.fillStyle = '#3f8a5a'; x.fillRect(0, ROAD[0] + 8, 1080, 60)                       // the green bike lane
  x.fillStyle = BONE; x.fillRect(0, ROAD[0] + 72, 1080, 6)
  for (let i = 0; i < 6; i++) { x.fillStyle = '#efe6d6'; x.fillRect(60 + i * 190, ROAD[0] + 150, 90, 8) }
  drawBits(x, ['.KK...KK.', 'K..K.K..K', 'K..KKK..K', '.KK...KK.'], { K: '#cfe8d8' }, 900, ROAD[0] + 38, 7, { outline: null })
  x.fillStyle = INK; x.fillRect(0, ROAD[1], 1080, 8)
  x.fillStyle = '#c9b9c9'; x.fillRect(0, ROAD[1] + 8, 1080, 1920 - ROAD[1])
  x.fillStyle = '#a898a8'; for (let i = 0; i < 9; i++) x.fillRect(i * 130, ROAD[1] + 8, 4, 140)
  // the bus stop sign
  x.fillStyle = INK; x.fillRect(946, 1080, 14, 260); x.fillRect(900, 1010, 106, 84); x.fillStyle = '#5fb6ff'; x.fillRect(906, 1016, 94, 72)
  x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = BONE; x.fillText('BUS', 953, 1053)
}

// ── vehicles
const BUS = [
  '.BBBBBBBBBBBBBBBBBBBBBB.',
  'BBBBBBBBBBBBBBBBBBBBBBBB',
  'BWWWW.WWWW.WWWW.WWWW.WWB',
  'BWWWW.WWWW.WWWW.WWWW.WWB',
  'BWWWW.WWWW.WWWW.WWWW.WWB',
  'BBBBBBBBBBBBBBBBBBBBBBBB',
  'SSSSSSSSSSSSSSSSSSSSSSSS',
  'BBBBBBBBBBBBBBBBBBBBBBLB',
  '.BBKKBBBBBBBBBBBBBKKBBB.',
  '...KK.............KK....',
]
export function drawBus(x, cx, cy, cell, t, { riders = [] } = {}) {
  drawBits(x, BUS, { B: '#8a6ae0', W: '#cfe8ff', S: GOLD, L: '#fff2b0', K: INK }, cx, cy, cell)
  // riders in the windows (small sign stars)
  const w = BUS[0].length * cell, h = BUS.length * cell
  riders.forEach((r, i) => drawStarChar(x, cx - w / 2 + (2.5 + i * 5) * cell, cy - h / 2 + 3.6 * cell, cell * 3.4, t, { color: r, mood: 'happy', look: [1, 0], glow: 0.3, tips: false, seed: 70 + i, bob: 2 }))
}
const BIKE = ['.....KK...', '....K.....', '.KKKKKKK..', 'KK.K.K.KK.', 'K..KKK..K.', 'KK.....KK.', '.KK...KK..']
export const drawBike = (x, cx, cy, cell, o = {}) => drawBits(x, BIKE, { K: o.color || '#7fe0ff' }, cx, cy, cell, o)
const CAR = ['....BBBBBB....', '...BWWBBWWB...', '..BBWWBBWWBB..', 'BBBBBBBBBBBBBB', 'BBLBBBBBBBBBLB', 'BBBBBBBBBBBBBB', '.KKK......KKK.', '.KKK......KKK.']
export const drawCar = (x, cx, cy, cell, o = {}) => drawBits(x, CAR, { B: o.color || '#ff6a7a', W: '#cfe8ff', L: '#fff2b0', K: INK }, cx, cy, cell, o)
const TOYCAR = ['..RRRR..', '.RWWRWR.', 'RRRRRRRR', 'RRRRRRRR', '.KK..KK.']
export const drawToyCar = (x, cx, cy, cell, o = {}) => drawBits(x, TOYCAR, { R: '#ff6a7a', W: '#cfe8ff', K: INK }, cx, cy, cell, o)
const TANDEM = ['...K....K....', '..KK...KK....', '.KKKKKKKKKKK.', 'KK.K..K..K.KK', 'K..KK.K.KK..K', 'KK.........KK', '.KK.......KK.']
export const drawTandem = (x, cx, cy, cell, o = {}) => drawBits(x, TANDEM, { K: o.color || GOLD }, cx, cy, cell, o)

/** a walking star (step bob) */
export function walker(x, cx, baseY, size, t, opts = {}, { pace = 2.4 } = {}) {
  const ph = t * pace * Math.PI + (opts.seed || 0)
  return drawStarChar(x, cx, baseY - size * 0.5 - Math.abs(Math.sin(ph)) * size * 0.07, size, t, { bob: 0, squash: 0.05 * Math.cos(ph * 2), ...opts })
}

/** the no-car checklist HUD (words + checks, no numbers) */
export function drawChecklist(x, cx, cy, rows, t, { title = 'NO-CAR TEST', alpha = 1 } = {}) {
  if (alpha <= 0) return
  const w = 340, h = 70 + rows.length * 50
  x.save(); x.globalAlpha *= alpha
  x.fillStyle = INK; x.fillRect(cx - w / 2 - 5, cy - 5, w + 10, h + 10)
  x.fillStyle = 'rgba(16,9,38,0.94)'; x.fillRect(cx - w / 2, cy, w, h)
  x.fillStyle = GOLD; x.fillRect(cx - w / 2, cy, w, 4)
  x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = BONE; x.fillText(title, cx, cy + 32)
  rows.forEach((r, i) => {
    const y = cy + 82 + i * 50, on = clamp((t - r.at) * 5)
    x.globalAlpha = alpha * (0.35 + 0.65 * on)
    x.textAlign = 'left'; x.font = `700 26px ${MONO}`; x.fillStyle = BONE; x.fillText(r.text, cx - w / 2 + 24, y)
    x.fillStyle = INK; x.fillRect(cx + w / 2 - 64, y - 18, 36, 36); x.fillStyle = '#2a2050'; x.fillRect(cx + w / 2 - 60, y - 14, 28, 28)
    if (on > 0) { x.save(); x.translate(cx + w / 2 - 46, y); x.scale(on * (1 + 0.3 * Math.exp(-(t - r.at) * 8)), on * (1 + 0.3 * Math.exp(-(t - r.at) * 8))); x.textAlign = 'center'; x.font = `800 34px ${INTER}`; x.fillStyle = '#7dffb0'; x.fillText('✓', 0, 0); x.restore() }
  })
  x.restore()
}

// ── the city map: a road grid, a ring road, the bayou, YOU and the DATE pins, and a long route drawn p = 0…1
const ROUTE = [[190, 1180], [190, 1080], [330, 1080], [330, 960], [470, 960], [470, 860], [610, 860], [610, 760], [760, 760], [760, 690], [880, 690]]
export function drawMap(x, t, { route = 0, transfers = [] } = {}) {
  x.fillStyle = '#122236'; x.fillRect(0, 0, 1080, 1920)
  x.fillStyle = '#16304a'; for (let i = 0; i < 40; i++) x.fillRect((i * 271) % 1080, (i * 433) % 1920, 120, 90)
  // grid
  x.fillStyle = '#2a4a6a'
  for (let gx = 50; gx < 1080; gx += 140) x.fillRect(gx, 480, 10, 1000)
  for (let gy = 480; gy < 1480; gy += 100) x.fillRect(0, gy, 1080, 10)
  // the ring road
  x.strokeStyle = '#c9a6ff'; x.lineWidth = 16; x.strokeRect(330, 760, 420, 400)
  x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.fillStyle = '#c9a6ff'; x.fillText('THE LOOP', 540, 742)
  // the bayou
  x.strokeStyle = '#4fb8ff'; x.lineWidth = 12; x.beginPath()
  for (let i = 0; i <= 40; i++) { const xx = i * 27, yy = 1010 + Math.sin(i * 0.5) * 40; i ? x.lineTo(xx, yy) : x.moveTo(xx, yy) }
  x.stroke()
  // the route (dashed, drawn up to `route`)
  const pts = ROUTE, segL = []
  let L = 0; for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); segL.push(d); L += d }
  let left = L * clamp(route)
  x.strokeStyle = GOLD; x.lineWidth = 10; x.setLineDash([22, 14]); x.lineDashOffset = -t * 40; x.beginPath(); x.moveTo(...pts[0])
  let head = pts[0]
  for (let i = 1; i < pts.length && left > 0; i++) { const d = segL[i - 1], u = Math.min(1, left / d); head = [lerp(pts[i - 1][0], pts[i][0], u), lerp(pts[i - 1][1], pts[i][1], u)]; x.lineTo(...head); left -= d }
  x.stroke(); x.setLineDash([])
  // transfer badges
  for (const tr of transfers) {
    if (t < tr.at) continue
    const k = clamp((t - tr.at) * 4)
    x.save(); x.translate(tr.x, tr.y); x.scale(k, k)
    x.fillStyle = INK; x.fillRect(-74, -24, 148, 48); x.fillStyle = '#ff8a3a'; x.fillRect(-70, -20, 140, 40)
    x.font = `700 20px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = INK; x.fillText('TRANSFER', 0, 1)
    x.restore()
  }
  // pins
  const pin = (px, py, col, label) => {
    x.fillStyle = INK; x.fillRect(px - 26, py - 70, 52, 52); x.fillRect(px - 8, py - 22, 16, 22)
    x.fillStyle = col; x.fillRect(px - 20, py - 64, 40, 40)
    x.font = `700 24px ${MONO}`; x.textAlign = 'center'; x.fillStyle = BONE; x.fillText(label, px, py + 30)
  }
  pin(190, 1180, '#7dffb0', 'YOU')
  pin(880, 690, '#ff4f86', 'DATE ♥')
  if (route > 0 && route < 1) drawPixelStar(x, head[0], head[1], 30, 2, GOLD)
}

/** a phone-chat bubble (rounded pixel), left or right tail */
export function drawChat(x, cx, cy, text, { k = 1, side = 'left', col = '#f4ecdc', w = 420 } = {}) {
  if (k <= 0.01) return
  const h = 86
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-w / 2 - 5, -h / 2 - 5, w + 10, h + 10)
  x.fillStyle = col; x.fillRect(-w / 2, -h / 2, w, h)
  const s = side === 'left' ? -1 : 1
  x.fillStyle = INK; x.fillRect(s * (w / 2 - 70) - 14, h / 2, 28, 26); x.fillStyle = col; x.fillRect(s * (w / 2 - 70) - 10, h / 2 - 4, 20, 24)
  x.font = `600 34px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = INK; x.fillText(text, 0, 2)
  x.restore()
}

/** the bus stop at dusk: a shelter + bench */
export function drawShelter(x, t) {
  x.fillStyle = INK; x.fillRect(150, 920, 780, 26); x.fillStyle = '#5fb6ff'; x.fillRect(156, 924, 768, 18)
  for (const px of [170, 900]) { x.fillStyle = INK; x.fillRect(px - 8, 940, 24, 400); x.fillStyle = '#9aa0c8'; x.fillRect(px - 4, 940, 16, 400) }
  x.fillStyle = 'rgba(200,230,255,0.12)'; x.fillRect(186, 946, 708, 300)
  x.fillStyle = INK; x.fillRect(220, 1236, 640, 30); x.fillStyle = '#a8744a'; x.fillRect(226, 1240, 628, 20)
  for (const px of [260, 820]) { x.fillStyle = INK; x.fillRect(px, 1266, 16, 70) }
  void t; void ease
}
