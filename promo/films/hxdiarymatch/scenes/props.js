// props — hxdiarymatch's field kit (copied from hxdiarytalkcard): the bayou trail at sunset → night (generic skyline, live
// oaks, the bayou), a bench, a talk card prop that can flip in the hand, chat bubbles. Generic city, no real buildings
// or brands. Pure f(t); no `document` at top level.
import { clamp, lerp, ease, rng } from '../../../src/lib.js'
import { drawStarChar } from '../../startalk.js'
import { drawBits, INK, BONE, GOLD, MONO, rgba } from './lab.js'

const SERIF = "'EB Garamond', Georgia, serif"
export const HORIZON = 1010, WATER = [1046, 1196], TRAIL = [1232, 1330]

// ── the sky: a warm Houston sunset (k = 1) that can sink to dusk (k = 0)
export function drawSunsetSky(x, t, { k = 1, sunY = 930 } = {}) {
  const g = x.createLinearGradient(0, 0, 0, HORIZON + 40)
  const top = k > 0.5 ? '#2b1656' : '#140a33'
  g.addColorStop(0, top)
  g.addColorStop(0.45, rgba('#8a2f7a', 0.6 + 0.4 * k))
  g.addColorStop(0.75, k > 0.5 ? '#e0566a' : '#6a2a6a')
  g.addColorStop(1, k > 0.5 ? '#ffb14a' : '#c2506a')
  x.fillStyle = g; x.fillRect(0, 0, 1080, HORIZON + 40)
  // pixel cloud streaks lit from below
  const r = rng(12)
  for (let i = 0; i < 7; i++) {
    const cy = 560 + i * 62 + r() * 20, cx = ((r() * 1400 + t * (6 + i * 2)) % 1400) - 200, w = 160 + r() * 260
    x.fillStyle = rgba(i % 2 ? '#ff9fb0' : '#ffc27a', (0.22 + 0.1 * (i / 7)) * (0.4 + 0.6 * k))
    x.fillRect(Math.round(cx), Math.round(cy), Math.round(w), 10); x.fillRect(Math.round(cx + 30), Math.round(cy - 8), Math.round(w * 0.5), 8)
  }
  // the sun: a big low disc with horizontal cut bands (sinks with k)
  const sy = lerp(sunY + 140, sunY, k), R = 150
  x.save(); x.beginPath(); x.rect(0, 0, 1080, HORIZON); x.clip()
  x.globalCompositeOperation = 'lighter'
  const sg = x.createRadialGradient(760, sy, 20, 760, sy, 420); sg.addColorStop(0, `rgba(255,200,120,${0.55 * k})`); sg.addColorStop(1, 'rgba(255,200,120,0)')
  x.fillStyle = sg; x.fillRect(300, sy - 440, 900, 880)
  x.globalCompositeOperation = 'source-over'
  for (let yy = -R; yy < R; yy += 8) {
    const band = yy > 30 && Math.floor((yy - 30) / 22) % 2 === 1
    if (band) continue
    const hw = Math.sqrt(Math.max(0, R * R - (yy + 4) ** 2))
    x.fillStyle = yy < -40 ? '#ffe6a0' : yy < 30 ? '#ffc65a' : '#ff8a4a'
    x.fillRect(Math.round(760 - hw), Math.round(sy + yy), Math.round(hw * 2), 8)
  }
  x.restore()
  // first stars at dusk
  if (k < 0.9) for (let i = 0; i < 26; i++) {
    const sx = (i * 397) % 1080, syy = 120 + ((i * 263) % 520), tw = 0.5 + 0.5 * Math.sin(t * 3 + i)
    x.fillStyle = rgba('#fff6d8', (1 - k) * 0.8 * tw); x.fillRect(sx, syy, 4, 4)
  }
}

// ── a generic downtown skyline silhouette (no real towers), scrolling slowly
const TOWERS = (() => { const r = rng(77), out = []; let xx = -40; while (xx < 2400) { const w = 50 + Math.floor(r() * 70), h = 90 + Math.floor(r() * (xx > 500 && xx < 1300 ? 340 : 170)); out.push({ x: xx, w, h, cap: Math.floor(r() * 4), seed: Math.floor(r() * 99) }); xx += w + 6 + Math.floor(r() * 20) } return out })()
export function drawSkyline(x, t, { scroll = 0, k = 1 } = {}) {
  const col = k > 0.5 ? '#3c1c4c' : '#1c1030'
  for (const b of TOWERS) {
    const bx = Math.round(((b.x - scroll * 0.12) % 2400 + 2400) % 2400 - 300)
    if (bx > 1100 || bx + b.w < -20) continue
    const top = HORIZON - b.h
    x.fillStyle = col; x.fillRect(bx, top, b.w, b.h + 40)
    if (b.cap === 1) { x.fillRect(bx + 8, top - 16, b.w - 16, 16); x.fillRect(bx + b.w / 2 - 3, top - 50, 6, 34) }
    if (b.cap === 2) for (let s = 0; s < 4; s++) x.fillRect(bx + s * 6, top - (s + 1) * 10, b.w - s * 12, 10)
    // windows
    const r = rng(b.seed + 3)
    for (let wy = top + 14; wy < HORIZON - 10; wy += 18) for (let wx = bx + 8; wx < bx + b.w - 8; wx += 14) {
      if (r() < 0.78) continue
      x.fillStyle = rgba('#ffd27a', 0.55 + 0.35 * (1 - k)); x.fillRect(wx, wy, 6, 8)
    }
  }
}

// ── live-oak tree line (a row of round pixel canopies), parallax f
function treeRow(x, y, scroll, f, cols, seed, size = 70) {
  const r = rng(seed), list = []
  for (let i = 0; i < 26; i++) list.push({ x: i * 110 + r() * 50, s: size * (0.7 + r() * 0.6) })
  for (const tr of list) {
    const tx = ((tr.x - scroll * f) % 2860 + 2860) % 2860 - 200
    if (tx > 1200 || tx < -260) continue
    const s = tr.s
    x.fillStyle = cols[0]; x.fillRect(Math.round(tx - s), Math.round(y - s * 0.9), Math.round(s * 2), Math.round(s))
    x.fillRect(Math.round(tx - s * 0.7), Math.round(y - s * 1.3), Math.round(s * 1.4), Math.round(s * 0.6))
    x.fillStyle = cols[1]; x.fillRect(Math.round(tx - s * 0.6), Math.round(y - s * 1.2), Math.round(s * 0.7), Math.round(s * 0.3))
    x.fillStyle = cols[2]; x.fillRect(Math.round(tx - 6), Math.round(y - 4), 12, 30)
  }
}

// ── the bayou: water with the sun's broken reflection, banks, trees
export function drawBayou(x, t, { scroll = 0, k = 1 } = {}) {
  drawSkyline(x, t, { scroll, k })
  treeRow(x, HORIZON + 40, scroll, 0.35, k > 0.5 ? ['#24302e', '#34463a', '#1a1a22'] : ['#141a24', '#1e2a30', '#0e0e18'], 5, 54)
  // water
  const g = x.createLinearGradient(0, WATER[0], 0, WATER[1]); g.addColorStop(0, k > 0.5 ? '#6a3a6a' : '#2a1a40'); g.addColorStop(1, k > 0.5 ? '#2a2246' : '#120c26')
  x.fillStyle = g; x.fillRect(0, WATER[0], 1080, WATER[1] - WATER[0])
  // the reflection: broken bright bars under the sun
  for (let yy = WATER[0] + 6; yy < WATER[1] - 4; yy += 10) {
    const d = (yy - WATER[0]) / (WATER[1] - WATER[0]), w = lerp(220, 90, d) * (0.7 + 0.3 * Math.sin(t * 3 + yy * 0.1)) * k
    const off = Math.sin(t * 2 + yy * 0.07) * 18
    if (w < 8) continue
    x.fillStyle = rgba(d < 0.3 ? '#ffd88a' : '#ff9a5a', 0.75 - d * 0.4); x.fillRect(Math.round(760 - w / 2 + off), yy, Math.round(w), 4)
  }
  // ripples
  for (let i = 0; i < 18; i++) { const rx = ((i * 211 - scroll * 0.6) % 1180 + 1180) % 1180 - 50, ry = WATER[0] + 20 + (i * 47) % (WATER[1] - WATER[0] - 30); x.fillStyle = 'rgba(255,220,240,0.18)'; x.fillRect(Math.round(rx), ry, 26, 3) }
  // the near bank: grass + reeds
  x.fillStyle = k > 0.5 ? '#2e5a36' : '#1a3424'; x.fillRect(0, WATER[1], 1080, TRAIL[0] - WATER[1])
  for (let i = 0; i < 40; i++) { const rx = ((i * 61 - scroll * 0.9) % 1120 + 1120) % 1120 - 20; x.fillStyle = k > 0.5 ? '#3f7a42' : '#24442c'; x.fillRect(Math.round(rx), WATER[1] - 14 - (i % 3) * 6, 6, 18 + (i % 3) * 6) }
  // the trail: pale concrete with expansion joints
  x.fillStyle = INK; x.fillRect(0, TRAIL[0] - 4, 1080, 4)
  x.fillStyle = k > 0.5 ? '#d9b994' : '#8a7a8a'; x.fillRect(0, TRAIL[0], 1080, TRAIL[1] - TRAIL[0])
  x.fillStyle = k > 0.5 ? '#f0d4ae' : '#a898a8'; x.fillRect(0, TRAIL[0], 1080, 8)
  x.fillStyle = k > 0.5 ? '#b8956e' : '#6a5a6a'
  for (let i = 0; i < 12; i++) { const jx = ((i * 140 - scroll) % 1680 + 1680) % 1680 - 120; x.fillRect(Math.round(jx), TRAIL[0] + 8, 4, TRAIL[1] - TRAIL[0] - 8) }
  // the grass below
  const gg = x.createLinearGradient(0, TRAIL[1], 0, 1920); gg.addColorStop(0, k > 0.5 ? '#3a6a3a' : '#1c3424'); gg.addColorStop(1, '#0e1a16')
  x.fillStyle = gg; x.fillRect(0, TRAIL[1], 1080, 1920 - TRAIL[1])
  x.fillStyle = INK; x.fillRect(0, TRAIL[1], 1080, 4)
}

// ── the trailhead parking lot: asphalt, painted lines, a row of cars, a TRAILHEAD sign
const CAR = ['...BBBBB....', '..BWWBWWB...', '.BBBBBBBBBB.', 'BBBBBBBBBBBB', 'BBLBBBBBBLBB', '.KK......KK.']
const CAR_COLS = ['#5fb6ff', '#ff6a7a', '#f2c75c', '#7dffb0', '#c9a6ff', '#ff9a4a']
export function drawLot(x, t, { k = 1 } = {}) {
  drawSkyline(x, t, { scroll: 300, k })
  treeRow(x, HORIZON + 40, 300, 0.35, ['#24302e', '#34463a', '#1a1a22'], 5, 54)
  x.fillStyle = '#3a3448'; x.fillRect(0, HORIZON + 30, 1080, 1920)
  x.fillStyle = '#463e56'; for (let i = 0; i < 30; i++) x.fillRect((i * 173) % 1080, HORIZON + 60 + (i * 89) % 800, 8, 4)
  // painted stall lines
  for (let i = 0; i < 7; i++) { x.fillStyle = '#e8e0f0'; x.fillRect(40 + i * 170, 1080, 8, 120); x.fillRect(40 + i * 170, 1280, 8, 120) }
  // two rows of cars
  for (let i = 0; i < 6; i++) drawBits(x, CAR, { B: CAR_COLS[i], W: '#bfe8ff', L: '#ffe6a0', K: INK }, 124 + i * 170, 1140, 11)
  for (let i = 0; i < 6; i++) if (i !== 2) drawBits(x, CAR, { B: CAR_COLS[(i + 3) % 6], W: '#bfe8ff', L: '#ffe6a0', K: INK }, 124 + i * 170, 1340, 11)
  // the sign
  x.fillStyle = INK; x.fillRect(886, 830, 16, 190); x.fillRect(796, 806, 196, 74)
  x.fillStyle = '#3f7a42'; x.fillRect(802, 812, 184, 62)
  x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = BONE
  x.fillText('TRAIL →', 894, 845)
  void k
}

// ── small pixel props
const SNEAKER = ['...WWWW.....', '...WPPW.....', '..WWWWWW....', '.WWWWWWWWW..', 'WWWWWWWWWWWW', 'GGGGGGGGGGGG']
export const drawSneaker = (x, cx, cy, cell, o = {}) => drawBits(x, SNEAKER, { W: '#f4ecdc', P: o.lace || '#ff8fb1', G: o.sole || '#7fe0ff' }, cx, cy, cell, o)

const DOG = [
  ['.BB.........', 'BBBB.......T', 'BKBBBBBBBBT.', 'NBBBBBBBBB..', '.BBBBBBBBB..', '.B.B....B.B.', '.B.B....B.B.'],
  ['.BB.........', 'BBBB......T.', 'BKBBBBBBBBT.', 'NBBBBBBBBB..', '.BBBBBBBBB..', 'B...B..B...B', 'B...B..B...B'],
]
export const drawDog = (x, cx, cy, cell, t, o = {}) => drawBits(x, DOG[Math.floor(t * 8) % 2], { B: o.color || '#c98a4a', K: INK, T: o.color || '#c98a4a', N: INK }, cx, cy, cell, o)

const HERON = [
  ['......GGG...', '.....GGKGYYY', '......GG....', '......G.....', '.....GG.....', '..GGGGGG....', 'GGGGGGGG....', '.GGGGGG.....', '...GGG......', '...L.L......', '...L.L......', '...L..L.....', '..L...L.....'],
  ['......GGG...', '.....GGKGYYY', '......GG....', '......G.....', '.....GG.....', '..GGGGGG....', 'GGGGGGGG....', '.GGGGGG.....', '...GGG......', '...L.L......', '...L.L......', '..L..L......', '..L...L.....'],
]
export const drawHeron = (x, cx, cy, cell, t, { walk = 0, ...o } = {}) => drawBits(x, HERON[walk ? Math.floor(t * 4) % 2 : 0], { G: '#9aa6c8', K: INK, Y: GOLD, L: '#6a6f8a' }, cx, cy, cell, o)

const STROLLER = ['.HHHHH.....', 'HHHHHHH....', 'HHHHHHH...P', 'BBBBBBBB.P.', 'BBBBBBBBP..', '.W....W....']
export const drawStroller = (x, cx, cy, cell, o = {}) => drawBits(x, STROLLER, { H: '#5fb6ff', B: '#3a7cff', P: '#c9cde8', W: INK }, cx, cy, cell, o)

const BAND = (x, r, size, col) => { const c = size / 36; x.fillStyle = col; x.fillRect(Math.round(r.x - 7 * c), Math.round(r.y - size * 0.2), Math.round(14 * c), Math.round(2.2 * c)) }
/** a walking star: a quick step bob + squash in time with `pace` steps/s; returns drawStarChar's result */
export function walker(x, cx, baseY, size, t, opts = {}, { pace = 2.4, band = null } = {}) {
  const ph = t * pace * Math.PI + (opts.seed || 0)
  const lift = Math.abs(Math.sin(ph)) * size * 0.07
  const r = drawStarChar(x, cx, baseY - size * 0.5 - lift, size, t, { bob: 0, squash: 0.05 * Math.cos(ph * 2), ...opts })
  if (band) BAND(x, r, size, band)
  return r
}

/** a talk card prop (cream face, gold border, a question in Garamond italic). pop scales it; rot tilts it */
export function drawTalkCard(x, cx, cy, w, { pop = 1, rot = 0, q = ['What’s your', 'favorite view?'], alpha = 1 } = {}) {
  if (pop <= 0.01 || alpha <= 0) return
  const h = w * 1.4
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot); x.scale(pop, pop)
  x.fillStyle = 'rgba(6,4,18,0.5)'; x.fillRect(-w / 2 + 10, -h / 2 + 14, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = '#f6eedb'; x.fillRect(-w / 2, -h / 2, w, h)
  x.strokeStyle = GOLD; x.lineWidth = 5; x.strokeRect(-w / 2 + 12, -h / 2 + 12, w - 24, h - 24)
  x.font = `700 ${Math.round(w * 0.075)}px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = '#8a6a2a'
  x.fillText('TALK CARD', 0, -h / 2 + w * 0.17)
  x.font = `italic 500 ${Math.round(w * 0.15)}px ${SERIF}`; x.fillStyle = INK
  q.forEach((ln, i) => x.fillText(ln, 0, -w * 0.1 + i * w * 0.18))
  x.fillStyle = GOLD; x.fillText('✦', 0, h / 2 - w * 0.2)
  x.restore()
}

/** a small HUD panel with tally marks (no numerals): n marks, grouped in fives with a slash */
export function drawTally(x, cx, cy, n, t, { label = 'WALKERS SPOTTED', alpha = 1, w = 330 } = {}) {
  if (alpha <= 0) return
  const h = 128
  x.save(); x.globalAlpha *= alpha
  x.fillStyle = INK; x.fillRect(cx - w / 2 - 5, cy - h / 2 - 5, w + 10, h + 10)
  x.fillStyle = 'rgba(16,9,38,0.94)'; x.fillRect(cx - w / 2, cy - h / 2, w, h)
  x.fillStyle = GOLD; x.fillRect(cx - w / 2, cy - h / 2, w, 4)
  x.font = `700 20px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = BONE
  x.fillText(label, cx, cy - h / 2 + 26)
  const whole = Math.floor(n), part = n - whole
  for (let i = 0; i < Math.ceil(n); i++) {
    const g = Math.floor(i / 5), j = i % 5, a = i < whole ? 1 : part
    const gx = cx - w / 2 + 34 + g * 92, gy = cy + 18
    x.globalAlpha = alpha * a
    x.fillStyle = '#7dffb0'
    if (j < 4) x.fillRect(gx + j * 16, gy - 26, 6, 52)
    else { x.save(); x.translate(gx + 26, gy); x.rotate(-0.95); x.fillRect(-42, -3, 84, 6); x.restore() }
  }
  x.restore()
  void t; void clamp; void ease
}

// ── the bench (front, wide), a little lamp post
export function drawBench(x, t, { y = 1250, lamp = 0 } = {}) {
  x.fillStyle = INK; x.fillRect(120, y - 150, 840, 30); x.fillStyle = '#a8744a'; x.fillRect(126, y - 146, 828, 22)
  x.fillStyle = INK; x.fillRect(100, y - 10, 880, 36); x.fillStyle = '#c8955a'; x.fillRect(106, y - 6, 868, 26)
  for (const px of [150, 910]) { x.fillStyle = INK; x.fillRect(px - 10, y - 160, 20, 260) }
  if (lamp > 0) {
    x.fillStyle = INK; x.fillRect(1010, 620, 16, 700); x.fillRect(990, 600, 56, 30)
    x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(1018, 640, 6, 1018, 640, 360); g.addColorStop(0, `rgba(255,214,140,${0.5 * lamp})`); g.addColorStop(1, 'rgba(255,214,140,0)'); x.fillStyle = g; x.fillRect(600, 280, 800, 800); x.restore()
    x.fillStyle = `rgba(255,232,170,${lamp})`; x.fillRect(996, 628, 44, 18)
  }
  void t
}

/** a talk card held up, flipping from its back (flip 0) to its face (flip 1) — a prop in the scene, not a transition */
export function drawFlipCard(x, cx, cy, w, t, { flip = 0, pop = 1, q = [], rot = 0 } = {}) {
  if (pop <= 0.01) return
  const h = w * 1.4, sx = Math.cos(Math.PI * clamp(flip)), face = flip > 0.5
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(pop * Math.max(0.02, Math.abs(sx)), pop)
  if (face && flip > 0.95) { x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(0, 0, 20, 0, 0, w * 1.1); g.addColorStop(0, 'rgba(255,230,160,0.45)'); g.addColorStop(1, 'rgba(255,230,160,0)'); x.fillStyle = g; x.fillRect(-w * 1.2, -h, w * 2.4, h * 2); x.restore() }
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  if (!face) {
    x.fillStyle = '#3a2a8a'; x.fillRect(-w / 2, -h / 2, w, h)
    x.strokeStyle = GOLD; x.lineWidth = 5; x.strokeRect(-w / 2 + 12, -h / 2 + 12, w - 24, h - 24)
    x.font = `800 ${Math.round(w * 0.35)}px Inter`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = GOLD; x.fillText('✦', 0, 0)
  } else {
    x.fillStyle = '#f6eedb'; x.fillRect(-w / 2, -h / 2, w, h)
    x.strokeStyle = GOLD; x.lineWidth = 5; x.strokeRect(-w / 2 + 12, -h / 2 + 12, w - 24, h - 24)
    x.font = `700 ${Math.round(w * 0.07)}px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = '#8a6a2a'
    x.fillText('TALK CARD', 0, -h / 2 + w * 0.16)
    x.font = `italic 500 ${Math.round(w * 0.12)}px ${SERIF}`; x.fillStyle = INK
    q.forEach((ln, i) => x.fillText(ln, 0, -w * 0.2 + i * w * 0.15))
    x.fillStyle = GOLD; x.font = `800 ${Math.round(w * 0.12)}px Inter`; x.fillText('✦', 0, h / 2 - w * 0.17)
  }
  x.restore()
}

/** a little speech bubble with a word (rises and fades over its life) */
export function drawWordBubble(x, cx, cy, text, k, { col = '#f4ecdc', size = 40 } = {}) {
  if (k <= 0.01) return
  x.save(); x.font = `800 ${size}px Inter`
  const w = x.measureText(text).width + 40, h = size + 30
  x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-w / 2 - 4, -h / 2 - 4, w + 8, h + 8); x.fillStyle = col; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = INK; x.fillRect(-10, h / 2, 20, 16); x.fillStyle = col; x.fillRect(-6, h / 2 - 2, 12, 14)
  x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = INK; x.fillText(text, 0, 2)
  x.restore()
}

// ── the halfway map: YOU (left) and THEM (right), a dotted line, a flag dropping in the middle, two little cars
export function drawHalfMap(x, t, { line = 0, flag = 0, cars = 0 } = {}) {
  x.fillStyle = '#122236'; x.fillRect(0, 0, 1080, 1920)
  x.fillStyle = '#16304a'; for (let i = 0; i < 40; i++) x.fillRect((i * 271) % 1080, (i * 433) % 1920, 120, 90)
  x.fillStyle = '#2a4a6a'
  for (let gx = 50; gx < 1080; gx += 140) x.fillRect(gx, 480, 10, 1000)
  for (let gy = 480; gy < 1480; gy += 100) x.fillRect(0, gy, 1080, 10)
  x.strokeStyle = '#c9a6ff'; x.lineWidth = 16; x.strokeRect(330, 760, 420, 400)
  x.strokeStyle = '#4fb8ff'; x.lineWidth = 12; x.beginPath()
  for (let i = 0; i <= 40; i++) { const xx = i * 27, yy = 1010 + Math.sin(i * 0.5) * 40; i ? x.lineTo(xx, yy) : x.moveTo(xx, yy) }
  x.stroke()
  const A = [150, 1200], B = [930, 720], M = [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2]
  // the dotted line, drawn out from both ends toward the middle
  x.strokeStyle = GOLD; x.lineWidth = 10; x.setLineDash([22, 14]); x.lineDashOffset = -t * 40
  const l = clamp(line)
  x.beginPath(); x.moveTo(...A); x.lineTo(lerp(A[0], M[0], l), lerp(A[1], M[1], l)); x.stroke()
  x.beginPath(); x.moveTo(...B); x.lineTo(lerp(B[0], M[0], l), lerp(B[1], M[1], l)); x.stroke()
  x.setLineDash([])
  const pin = (px, py, col, label) => {
    x.fillStyle = INK; x.fillRect(px - 26, py - 70, 52, 52); x.fillRect(px - 8, py - 22, 16, 22)
    x.fillStyle = col; x.fillRect(px - 20, py - 64, 40, 40)
    x.font = `700 24px ${MONO}`; x.textAlign = 'center'; x.fillStyle = BONE; x.fillText(label, px, py + 30)
  }
  pin(A[0], A[1], '#7fe0ff', 'ME')
  pin(B[0], B[1], '#ff8fb1', 'THEM')
  // the cars, each driving half
  const CAR = ['.BBBB.', 'BWBBWB', 'BBBBBB', '.K..K.']
  const c = ease.inOutCubic(clamp(cars))
  if (cars > 0) {
    drawBits(x, CAR, { B: '#7fe0ff', W: '#cfe8ff', K: INK }, lerp(A[0], M[0] - 46, c), lerp(A[1], M[1] + 24, c) - 30, 8)
    drawBits(x, CAR, { B: '#ff8fb1', W: '#cfe8ff', K: INK }, lerp(B[0], M[0] + 46, c), lerp(B[1], M[1] - 24, c) - 30, 8, { sx: -1 })
  }
  // the halfway flag
  if (flag > 0.01) {
    const fk = flag, fy = M[1] - 40 - (1 - Math.min(1, fk)) * 400
    x.save(); x.translate(M[0], fy)
    x.fillStyle = INK; x.fillRect(-6, -160, 12, 170)
    x.fillStyle = INK; x.fillRect(4, -164, 200, 74); x.fillStyle = GOLD; x.fillRect(8, -160, 192, 66)
    x.font = `800 30px Inter`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = INK; x.fillText('HALFWAY ✦', 104, -126)
    x.restore()
    x.save(); x.globalAlpha = clamp(fk); x.font = `700 24px ${MONO}`; x.textAlign = 'center'; x.fillStyle = '#7dffb0'; x.fillText('a park', M[0], M[1] + 52); x.restore()
  }
  return M
}

// ── the windshield view (a parked/driving dash cam): a neon road toward the horizon, streaking lights. speed 0…1
export function drawRoadView(x, t, { speed = 1, k = 0.3 } = {}) {
  const hz = 900
  const g = x.createLinearGradient(0, 0, 0, hz); g.addColorStop(0, '#120a33'); g.addColorStop(1, '#c2457a')
  x.fillStyle = g; x.fillRect(0, 0, 1080, hz)
  for (let yy = -110; yy < 110; yy += 8) { if (yy > 20 && Math.floor((yy - 20) / 18) % 2) continue; const hw = Math.sqrt(Math.max(0, 110 * 110 - yy * yy)); x.fillStyle = yy < 0 ? '#ffd27a' : '#ff8a4a'; x.fillRect(540 - hw, hz - 40 + yy, hw * 2, 8) }
  x.fillStyle = '#0c0820'; x.fillRect(0, hz, 1080, 1920 - hz)
  // the grid road
  x.strokeStyle = '#ff4fd8'; x.lineWidth = 3
  for (let i = -8; i <= 8; i++) { x.beginPath(); x.moveTo(540 + i * 12, hz); x.lineTo(540 + i * 260, 1920); x.stroke() }
  const off = (t * speed * 1.6) % 1
  for (let j = 0; j < 14; j++) { const d = Math.pow((j + off) / 14, 2.2); const yy = hz + d * (1920 - hz); x.globalAlpha = clamp(d * 3); x.beginPath(); x.moveTo(0, yy); x.lineTo(1080, yy); x.stroke() }
  x.globalAlpha = 1
  // streaking lights (other cars, street lamps) when moving
  for (let i = 0; i < 10; i++) { const ph = (t * speed * 0.8 + i / 10) % 1, side = i % 2 ? 1 : -1, xx = 540 + side * (40 + ph * ph * 700), yy = hz + ph * ph * 500; x.fillStyle = i % 3 ? '#ffd27a' : '#7fe0ff'; x.globalAlpha = speed * clamp(ph * 2); x.fillRect(xx - 3, yy - 30 * ph * speed, 6 + ph * 10, 30 * ph * speed + 6); x.globalAlpha = 1 }
  // the dashboard + windshield frame
  x.fillStyle = INK; x.fillRect(0, 1380, 1080, 540); x.fillStyle = '#2a2050'; x.fillRect(0, 1392, 1080, 528)
  x.fillStyle = INK; x.fillRect(0, 0, 60, 1400); x.fillRect(1020, 0, 60, 1400); x.fillRect(0, 0, 1080, 120)
  void k
}
