// winter.js — the WINTER ON THE LANE add-ons for Moonlight Lane, Season 2 (eps 6–10, batch b20). Built with nml2e06.
// Imports the Moonlight kit read-only from mlpilot; other episodes import this file from ../../nml2e06/scenes/winter.js.
//
//   snowGround(ctx, t, { k })        call INSIDE drawLane's fg (world coords), FIRST: snow caps on the roofs, sills, awning,
//                                    stall canopy, lamp heads, bench and a drift along the pavement. k 0…1 fades it in.
//   snowfall(ctx, t, { n, k, wind, seed, speed, big })   screen-space falling flakes (pure f(t)); call after the set.
//   drawWinter(ctx, sign, x, y, size, t, opts)  drawSign + winter clothes: opts.scarf (colour) · opts.hat (beanie colour)
//                                    · opts.mitt (no). Everything else goes to drawSign. Returns its result.
//   drawGift(ctx, cx, cy, w, h, t, { col, ribbon, lid = 0, rot = 0, alpha = 1, lumpy = 0 })   a wrapped box (lid 0…1 opens)
//   drawMap(ctx, cx, cy, w, t, { k = 1, rot = 0, pins = 6, newPin = null, label = 'OUR LANE' })   the hand-drawn map of
//                                    the lane with heart pins (Aquarius' gift). pins: a count of MAP_PINS or an array of [u, v, label] (0…1 map
//                                    coords). newPin: { at, x, y, label } pops a gold heart in at `at`
//   drawTalkCard(ctx, cx, cy, w, t, { text, rot = 0, alpha = 1, flip = 1 })   a talk card (cream, gold border, TALK CARD
//                                    header, the question in bold). flip < 0 shows the back.
//   drawLongTable(ctx, t, { y = 1330, x0 = 60, x1 = 1020, dishes = true, candles = true, cloth = '#f3e6d0' })
//                                    a long dinner table front (draw AFTER the seated stars), soup bowls, bread, candles.
//   drawStringBulbs(ctx, t, x0, x1, y0, sag, { k = 1, n = 12, seed = 1 })  a string of bulbs (k = how lit, 0 = dark)
//   drawSnowman(ctx, x, y, s, t)    a small pixel snowman (feet at y)
import { clamp, lerp } from '../../../src/lib.js'
import { drawSign, starFrame, inSprite, INK, ML_GOLD, BONE, PINK, CYAN, MONO, INTER, rgba } from '../../mlpilot/scenes/mlkit.js'

export const SNOW = '#f4f6ff', SNOW_SH = '#c9d0ec'

function rng(seed) { let s = seed >>> 0 || 1; return () => { s ^= s << 13; s >>>= 0; s ^= s >> 17; s ^= s << 5; s >>>= 0; return s / 4294967296 } }

// ── snow caps on the lane (world coords; the lane's geometry from mlkit's laneLayer)
let CAPS = null
function capsCanvas() {
  if (CAPS) return CAPS
  const cv = document.createElement('canvas'); cv.width = 2160; cv.height = 1920
  const c = cv.getContext('2d')
  const r = rng(77)
  const ledge = (x0, x1, y, h = 16) => {
    c.fillStyle = SNOW_SH; c.fillRect(x0, y + h - 4, x1 - x0, 4)
    c.fillStyle = SNOW
    for (let x = x0; x < x1; x += 12) { const hh = h - 4 + Math.round(r() * 6); c.fillRect(x, y + h - 4 - hh, Math.min(12, x1 - x), hh) }
    // drips
    for (let x = x0 + 10; x < x1 - 10; x += 34 + r() * 30) { c.fillRect(Math.round(x), y + h - 2, 6, 6 + Math.round(r() * 8)) }
  }
  // roofs (building tops: 620 · 740 · 900 · 640; trim starts 6 px above)
  ledge(-8, 513, 600, 22); ledge(497, 1173, 720, 22); ledge(1157, 1653, 880, 18); ledge(1637, 2168, 620, 22)
  // window sills (the panes' sills sit at w.y + w.h + 6)
  const sills = [[48, 690 + 120], [188, 810], [328, 810], [48, 980], [188, 980], [328, 980], [548, 960], [758, 960 - 6], [988, 960], [1188, 1070], [1338, 1070], [1488, 1070], [1678, 820], [1828, 820], [1978, 820], [1678, 980], [1828, 980], [1978, 980], [1678, 1130], [1828, 1130], [1978, 1130]]
  for (const [x, y] of sills) ledge(x, x + 124, y - 6, 12)
  // café awning top + the hanging sign
  ledge(526, 1134, 1056, 16); ledge(1108, 1192, 998, 14)
  // stall canopy
  ledge(1706, 2056, 1114, 18)
  // lamp heads
  for (const lx of [440, 1060, 1700]) { ledge(lx - 28, lx + 28, 984, 16) }
  // bench back + seat ends (leave the middle of the seat clear: people sit there)
  ledge(1080, 1300, 1326, 12); ledge(1074, 1100, 1374, 10); ledge(1280, 1306, 1374, 10)
  // roof terrace railing
  ledge(1176, 1628, 842, 14)
  // the pavement drift along the building fronts + the curb
  c.fillStyle = SNOW_SH; c.fillRect(0, 1330, 2160, 6)
  c.fillStyle = SNOW
  for (let x = 0; x < 2160; x += 10) { const h = 10 + Math.round(5 * Math.sin(x * 0.013) + r() * 4); c.fillRect(x, 1330, 10, h) }
  for (let x = 0; x < 2160; x += 10) { const h = 8 + Math.round(4 * Math.sin(x * 0.021 + 2) + r() * 3); c.fillRect(x, 1486 - h + 4, 10, h) }
  c.fillStyle = SNOW_SH; for (let x = 0; x < 2160; x += 70 + r() * 60) c.fillRect(Math.round(x), 1486, 40 + Math.round(r() * 30), 4)
  // a few soft patches on the cobbles
  c.fillStyle = 'rgba(230,236,255,0.35)'
  for (let i = 0; i < 40; i++) { const x = r() * 2160, y = 1520 + r() * 380; c.fillRect(Math.round(x), Math.round(y), 30 + Math.round(r() * 60), 8 + Math.round(r() * 8)) }
  CAPS = cv
  return cv
}
export function snowGround(ctx, t, { k = 1 } = {}) {
  if (k <= 0.01) return
  ctx.save(); ctx.globalAlpha *= clamp(k); ctx.imageSmoothingEnabled = false
  ctx.drawImage(capsCanvas(), 0, 0)
  ctx.restore()
}

// ── falling snow (screen space)
export function snowfall(ctx, t, { n = 90, k = 1, wind = 0.25, seed = 3, speed = 1, big = 1, y0 = 0, y1 = 1920 } = {}) {
  if (k <= 0.01) return
  const r = rng(seed)
  ctx.save()
  for (let i = 0; i < n; i++) {
    const depth = 0.35 + r() * 0.65, sz = Math.round((2 + depth * 6) * big), vy = (60 + depth * 110) * speed
    const x0 = r() * 1180 - 50, ph = r(), sway = 18 + r() * 30, sf = 0.6 + r() * 1.2
    const H = y1 - y0 + 40
    const y = y0 - 20 + ((ph * H + t * vy) % H)
    const x = ((x0 + t * vy * wind + Math.sin(t * sf + i) * sway) % 1180 + 1180) % 1180 - 50
    ctx.globalAlpha = k * (0.35 + depth * 0.6)
    ctx.fillStyle = depth > 0.75 ? '#ffffff' : '#dfe6ff'
    ctx.fillRect(Math.round(x), Math.round(y), sz, sz)
  }
  ctx.restore()
}

// ── winter clothes (cells on the star sprite's 36-cell grid)
function cells(ctx, rows, pal, ox, oy) {
  rows.forEach((row, j) => { for (let i = 0; i < row.length; i++) { const c = pal[row[i]]; if (c) { ctx.fillStyle = c; ctx.fillRect(ox + i, oy + j, 1.02, 1.02) } } })
}
const SCARF = [
  '.KKKKKKKKKKKKKKKKK.',
  'KSSDSSDSSDSSDSSDSSK',
  'KSSSSSSSSSSSSSSSSSK',
  '.KSSSKKKKKKKKKKKKK.',
  '.KSDK..............',
  '.KSSK..............',
  '.KSDK..............',
  '.KFFK..............',
  '.KKKK..............',
]
const HAT = [
  '....KKK....',
  '...KPPPK...',
  '..KKKKKKK..',
  '.KHHHHHHHK.',
  'KHHDHHDHHHK',
  'KHHHHHHHHHK',
  'KRRRRRRRRRK',
  'KKKKKKKKKKK',
]
const shade = (hex, k) => { const n = parseInt(hex.slice(1), 16), f = v => Math.round(clamp(v * k, 0, 255)); return `rgb(${f(n >> 16)},${f((n >> 8) & 255)},${f(n & 255)})` }
export function drawWinter(ctx, sign, x, y, size, t, opts = {}) {
  const { scarf = null, hat = null, ...o } = opts
  const res = drawSign(ctx, sign, x, y, size, t, o)
  if ((!scarf && !hat) || (o.alpha ?? 1) <= 0 || (o.pop ?? 1) <= 0) return res
  const so = { seed: o.seed ?? 1, hops: o.hops, squash: o.squash, bob: o.bob, pop: o.pop }
  const F = starFrame(x, y, size, t, so)
  ctx.save(); ctx.globalAlpha *= o.alpha ?? 1
  if (o.rot) { ctx.translate(F.ox, F.oy); ctx.rotate(o.rot); ctx.translate(-F.ox, -F.oy) }
  if (scarf) inSprite(ctx, F, () => cells(ctx, SCARF, { K: INK, S: scarf, D: shade(scarf, 0.72), F: BONE }, 8.5, 27.8))
  if (hat && sign !== 'scorpio') inSprite(ctx, F, () => cells(ctx, HAT, { K: INK, H: hat, D: shade(hat, 0.75), R: BONE, P: BONE }, 12.5, -3.2))
  ctx.restore()
  return res
}

// ── props
export function drawGift(ctx, cx, cy, w, h, t, { col = '#d8455f', ribbon = ML_GOLD, lid = 0, rot = 0, alpha = 1, lumpy = 0 } = {}) {
  if (alpha <= 0.01) return
  ctx.save(); ctx.globalAlpha *= alpha; ctx.translate(Math.round(cx), Math.round(cy)); ctx.rotate(rot)
  const R = (x, y, ww, hh, c) => { ctx.fillStyle = c; ctx.fillRect(Math.round(x), Math.round(y), Math.round(ww), Math.round(hh)) }
  // box
  R(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12, INK)
  R(-w / 2, -h / 2, w, h, col)
  if (lumpy) { R(-w / 2 - 6 - 14, -h * 0.1, 20, h * 0.4, INK); R(-w / 2 - 14, -h * 0.05, 16, h * 0.3, col); R(w / 2 - 2, -h * 0.35, 22, h * 0.3, INK); R(w / 2, -h * 0.3, 14, h * 0.2, col) }
  R(-w / 2, -h / 2, w, 8, shade(col, 1.18))
  R(-10, -h / 2, 20, h, ribbon); R(-w / 2, -6, w, 12, ribbon)
  // lid + bow (lid lifts and tips)
  ctx.save(); ctx.translate(0, -h / 2 - lid * h * 0.7); ctx.rotate(-lid * 0.5)
  R(-w / 2 - 12, -26, w + 24, 30, INK); R(-w / 2 - 6, -20, w + 12, 18, shade(col, 0.85)); R(-10, -20, 20, 18, ribbon)
  R(-40, -50, 34, 26, INK); R(6, -50, 34, 26, INK); R(-34, -44, 24, 14, ribbon); R(10, -44, 24, 14, ribbon); R(-10, -40, 20, 16, INK); R(-6, -36, 12, 10, shade(ribbon, 0.8))
  ctx.restore()
  ctx.restore()
}

// the map: a cream sheet with the lane's five buildings, a dashed path, heart pins at the places they've talked
const PINS = [[0.14, 0.62, 'BENCH'], [0.38, 0.4, 'CAFÉ'], [0.62, 0.3, 'ROOF'], [0.84, 0.58, 'STALL'], [0.3, 0.8, 'BUS STOP'], [0.7, 0.8, 'CORNER']]
export const MAP_PINS = PINS
export function drawMap(ctx, cx, cy, w, t, { k = 1, rot = 0, pins = 6, newPin = null, label = 'OUR LANE', alpha = 1 } = {}) {
  if (k <= 0.01 || alpha <= 0.01) return
  const h = w * 0.72
  ctx.save(); ctx.globalAlpha *= alpha; ctx.translate(cx, cy); ctx.rotate(rot); ctx.scale(k, k)
  const R = (x, y, ww, hh, c) => { ctx.fillStyle = c; ctx.fillRect(Math.round(x), Math.round(y), Math.round(ww), Math.round(hh)) }
  R(-w / 2 - 8, -h / 2 - 8, w + 16, h + 16, INK)
  R(-w / 2, -h / 2, w, h, '#fbf1dc')
  R(-w / 2, -h / 2, w, 10, '#efe0c0'); R(-w / 2, h / 2 - 10, w, 10, '#efe0c0')
  // folds
  R(-w / 6 - 1, -h / 2, 2, h, 'rgba(160,130,90,0.35)'); R(w / 6 - 1, -h / 2, 2, h, 'rgba(160,130,90,0.35)')
  // the street + buildings
  R(-w / 2 + 20, h * 0.08, w - 40, 10, '#b8a48a')
  const bw = (w - 60) / 5
  for (let i = 0; i < 5; i++) { const bh = [0.32, 0.26, 0.2, 0.3, 0.24][i] * h; R(-w / 2 + 30 + i * bw, h * 0.08 - bh, bw - 10, bh, ['#e3b8c4', '#d9c3e6', '#bccbe8', '#cdbfe6', '#e8d2b0'][i]); R(-w / 2 + 30 + i * bw, h * 0.08 - bh, bw - 10, 4, '#8a6a7a') }
  // the moon
  R(w / 2 - 70, -h / 2 + 22, 34, 34, ML_GOLD); R(w / 2 - 58, -h / 2 + 22, 22, 22, '#fbf1dc')
  // dashed path between pins
  const P = (Array.isArray(pins) ? pins : PINS.slice(0, pins)).map(([u, v, lab]) => [-w / 2 + u * w, -h / 2 + v * h, lab])
  ctx.fillStyle = '#d8455f'
  for (let i = 1; i < P.length; i++) { const [ax, ay] = P[i - 1], [bx, by] = P[i]; const n = Math.max(3, Math.round(Math.hypot(bx - ax, by - ay) / 16)); for (let q = 1; q < n; q += 2) ctx.fillRect(Math.round(lerp(ax, bx, q / n)) - 2, Math.round(lerp(ay, by, q / n)) - 2, 5, 5) }
  const sc = w / 520
  const heart = (x, y, s, col) => { const c = Math.max(2, Math.round(3 * s)); const H = ['.KK.KK.', 'KPPKPPK', 'KPPPPPK', '.KPPPK.', '..KPK..', '...K...']; H.forEach((row, j) => { for (let i = 0; i < row.length; i++) { const ch = row[i]; if (ch === '.') continue; ctx.fillStyle = ch === 'K' ? INK : col; ctx.fillRect(Math.round(x - 3.5 * c + i * c), Math.round(y - 4 * c + j * c), c, c) } }) }
  ctx.font = `700 ${Math.round(15 * sc)}px ${MONO}`; ctx.textAlign = 'center'; ctx.textBaseline = 'top'
  for (const [x, y, lab] of P) { heart(x, y, sc, '#ff6b8a'); ctx.fillStyle = '#7a5a4a'; ctx.fillText(lab, x, y + 12 * sc) }
  if (newPin && t > newPin.at) {
    const p = clamp((t - newPin.at) / 0.3), s = sc * (p < 1 ? 1 + 0.6 * Math.sin(Math.PI * p) : 1)
    const x = -w / 2 + newPin.x * w, y = -h / 2 + newPin.y * h
    ctx.globalAlpha *= clamp(p * 2)
    heart(x, y, s * 1.25, ML_GOLD); ctx.fillStyle = '#c2306a'; ctx.fillText(newPin.label || 'NEW', x, y + 16 * sc)
  }
  // title
  ctx.globalAlpha = alpha
  ctx.fillStyle = '#c2306a'; ctx.font = `700 ${Math.round(24 * sc)}px ${MONO}`; ctx.textAlign = 'left'; ctx.textBaseline = 'top'
  ctx.fillText(label, -w / 2 + 22, -h / 2 + 18)
  ctx.restore()
}

export function drawTalkCard(ctx, cx, cy, w, t, { text = '', rot = 0, alpha = 1, flip = 1, size = 34 } = {}) {
  if (alpha <= 0.01 || Math.abs(flip) < 0.02) return
  const h = w * 1.3
  ctx.save(); ctx.globalAlpha *= alpha; ctx.translate(Math.round(cx), Math.round(cy)); ctx.rotate(rot); ctx.scale(Math.abs(flip), 1)
  const R = (x, y, ww, hh, c) => { ctx.fillStyle = c; ctx.fillRect(Math.round(x), Math.round(y), Math.round(ww), Math.round(hh)) }
  R(-w / 2 - 8, -h / 2 - 8, w + 16, h + 16, INK)
  if (flip < 0) {
    R(-w / 2, -h / 2, w, h, '#2a1f5a'); R(-w / 2 + 12, -h / 2 + 12, w - 24, h - 24, '#3a2d78')
    ctx.fillStyle = ML_GOLD; ctx.font = `800 ${Math.round(w * 0.32)}px ${INTER}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('?', 0, 4)
    ctx.restore(); return
  }
  R(-w / 2, -h / 2, w, h, ML_GOLD); R(-w / 2 + 8, -h / 2 + 8, w - 16, h - 16, '#fbf3e2')
  R(-w / 2 + 8, -h / 2 + 8, w - 16, w * 0.2, '#2a1f5a')
  ctx.fillStyle = ML_GOLD; ctx.font = `700 ${Math.round(w * 0.075)}px ${MONO}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  ctx.fillText('TALK CARD', 0, -h / 2 + 8 + w * 0.1)
  // wrap the question
  const fs = Math.round(size * w / 360)
  ctx.fillStyle = INK; ctx.font = `800 ${fs}px ${INTER}`
  const words = text.split(' '), lines = []; let cur = ''
  for (const wd of words) { const tr = cur ? cur + ' ' + wd : wd; if (ctx.measureText(tr).width > w - 56 && cur) { lines.push(cur); cur = wd } else cur = tr }
  if (cur) lines.push(cur)
  const lh = fs * 1.18, y0 = w * 0.12 - (lines.length - 1) * lh / 2
  lines.forEach((ln, i) => ctx.fillText(ln, 0, y0 + i * lh))
  ctx.fillStyle = '#c9a6ff'; ctx.fillRect(-8, h / 2 - 40, 16, 16)
  ctx.restore()
}

export function drawLongTable(ctx, t, { y = 1330, x0 = 40, x1 = 1040, dishes = true, candles = true, cloth = '#f3e6d0', alpha = 1 } = {}) {
  ctx.save(); ctx.globalAlpha *= alpha
  const R = (x, yy, w, h, c) => { ctx.fillStyle = c; ctx.fillRect(Math.round(x), Math.round(yy), Math.round(w), Math.round(h)) }
  R(x0 - 8, y - 8, x1 - x0 + 16, 200, INK)
  R(x0, y, x1 - x0, 24, cloth); R(x0, y + 24, x1 - x0, 150, shade(cloth, 0.9))
  for (let x = x0 + 30; x < x1; x += 60) R(x, y + 24, 6, 150, shade(cloth, 0.82))
  R(x0, y + 168, x1 - x0, 8, '#d8455f')
  if (dishes) {
    for (let x = x0 + 90; x < x1 - 40; x += 210) {
      R(x - 44, y - 22, 88, 26, INK); R(x - 38, y - 18, 76, 18, '#fbf3e2'); R(x - 30, y - 18, 60, 8, '#e89a4a')
      const s = Math.sin(t * 2 + x) * 4
      ctx.globalAlpha = alpha * 0.4; R(x - 10 + s, y - 60, 6, 30, '#ffffff'); R(x + 6 - s, y - 72, 6, 34, '#ffffff'); ctx.globalAlpha = alpha
    }
    // bread
    const bx = (x0 + x1) / 2
    R(bx - 64, y - 34, 128, 40, INK); R(bx - 58, y - 28, 116, 30, '#d9954a'); for (let i = 0; i < 4; i++) R(bx - 44 + i * 28, y - 26, 14, 6, '#f1c27a')
  }
  if (candles) {
    for (const cx of [x0 + 200, x1 - 200]) {
      R(cx - 9, y - 70, 18, 72, INK); R(cx - 5, y - 66, 10, 66, BONE)
      const f = 0.8 + 0.2 * Math.sin(t * 13 + cx)
      R(cx - 5, y - 88 - 4 * f, 10, 18 + 4 * f, '#ffb84a'); R(cx - 2, y - 82, 4, 8, '#fff1c0')
      ctx.globalCompositeOperation = 'lighter'
      const g = ctx.createRadialGradient(cx, y - 80, 0, cx, y - 80, 110); g.addColorStop(0, `rgba(255,190,90,${0.25 * f * alpha})`); g.addColorStop(1, 'rgba(255,190,90,0)')
      ctx.fillStyle = g; ctx.fillRect(cx - 110, y - 190, 220, 220); ctx.globalCompositeOperation = 'source-over'
    }
  }
  ctx.restore()
}

export function drawStringBulbs(ctx, t, x0, x1, y0, sag, { k = 1, n = 12, seed = 1, flicker = 0 } = {}) {
  ctx.save()
  ctx.strokeStyle = INK; ctx.lineWidth = 4; ctx.beginPath()
  for (let i = 0; i <= 40; i++) { const u = i / 40; ctx.lineTo(lerp(x0, x1, u), y0 + Math.sin(Math.PI * u) * sag) }
  ctx.stroke()
  const BC = ['#ffd36e', '#ff8fb1', '#7fe0ff', '#7dffb0', '#fff1c8']
  for (let i = 1; i < n; i++) {
    const u = i / n, bx = lerp(x0, x1, u), by = y0 + Math.sin(Math.PI * u) * sag + 10
    const fl = flicker ? (Math.sin(t * 37 + i * 5.1 + seed) > 0.2 ? 1 : 0.15) : 1
    const kk = clamp(k * fl)
    ctx.fillStyle = INK; ctx.fillRect(Math.round(bx - 8), Math.round(by - 8), 16, 20)
    ctx.fillStyle = kk > 0.05 ? BC[(i + seed) % BC.length] : '#4a4466'
    ctx.globalAlpha = 0.35 + 0.65 * kk; ctx.fillRect(Math.round(bx - 5), Math.round(by - 4), 10, 13); ctx.globalAlpha = 1
    if (kk > 0.05) {
      ctx.globalCompositeOperation = 'lighter'
      const g = ctx.createRadialGradient(bx, by + 2, 0, bx, by + 2, 40); g.addColorStop(0, rgba(BC[(i + seed) % BC.length], 0.4 * kk)); g.addColorStop(1, rgba(BC[(i + seed) % BC.length], 0))
      ctx.fillStyle = g; ctx.fillRect(bx - 40, by - 38, 80, 80); ctx.globalCompositeOperation = 'source-over'
    }
  }
  ctx.restore()
}

export function drawSnowman(ctx, x, y, s, t) {
  const R = (a, b, w, h, c) => { ctx.fillStyle = c; ctx.fillRect(Math.round(x + a * s), Math.round(y + b * s), Math.ceil(w * s), Math.ceil(h * s)) }
  R(-24, -44, 48, 44, INK); R(-21, -41, 42, 40, SNOW); R(-21, -8, 42, 6, SNOW_SH)
  R(-17, -74, 34, 32, INK); R(-14, -71, 28, 28, SNOW)
  R(-8, -64, 4, 4, INK); R(4, -64, 4, 4, INK); R(-2, -58, 10, 4, '#ff9a3a')
  R(-18, -80, 36, 8, INK); R(-12, -96, 24, 18, INK)
  R(-16, -46, 32, 6, '#d8455f'); R(6, -46, 6, 16, '#d8455f')
  R(-34, -36, 12, 3, '#6a4a3a'); R(22, -36, 12, 3, '#6a4a3a')
}
