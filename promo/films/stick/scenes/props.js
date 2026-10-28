// stick props: small pixel drawings on canvas (Star Talk S3 #7, "Is it, though?"). Every prop is a pure draw call; one
// art pixel = px screen px, crisp rectangles where they don't rotate, so they sit next to the pixel stars.
//   bitmap(ctx, rows, pal, x, y, px)                   rows of chars → pixels; (x, y) = top-left; '.' = empty
//   drawScales(ctx, x, y, px, ang, { glint })          Libra's little gold balance; (x, y) = the beam's pivot; ang > 0
//                                                      tips the right pan down
//   drawGavel(ctx, x, y, px, rot)                       the judge's gavel; (x, y) = the grip, rot = handle direction
//   drawSoundBlock(ctx, x, y, px)                       the round block it bangs on; (x, y) = top centre
//   drawWig(ctx, x, y, c)                               a judge's wig for a star; (x, y) = the star's top tip, c = its cell
//   drawBench(ctx, x, y, w, h)                          the judge's bench with an ICK COURT plaque; (x, y) = top centre
//   drawLectern(ctx, x, y, w, h)                        Libra's lectern; (x, y) = top centre
//   drawRail(ctx, x0, x1, y, px)                        the gallery rail (balusters); y = top of the rail
//   drawEaselLegs(ctx, cx, top, w, h, px)               the easel behind the exhibit board
//   drawPlane(ctx, x, y, px, { tilt, gear })            a chubby pixel airliner facing left; (x, y) = under the wheels
//   drawRunway(ctx, x0, x1, y, t)                       a strip of runway with a dashed centre line
//   drawBus(ctx, x, y, px, t)                           a city bus, facing right; (x, y) = bottom centre
//   drawRunner(ctx, x, y, px, t)                        a tiny stick figure running (2-frame cycle); (x, y) = feet
//   drawCup(ctx, x, y, px, t)                           a coffee cup on a saucer with steam; (x, y) = bottom centre
//   drawPlate(ctx, x, y, px)                            a plate with a slice of cake; (x, y) = centre
//   drawDog(ctx, x, y, px, t)                           a sitting pixel dog, tail wagging; (x, y) = bottom centre
//   drawSeats(ctx, cx, y, w, px)                        a row of cinema seat backs; y = top of the backs
//   drawBubble(ctx, x, y, w, h, { tail, tailX, px })    a pixel speech bubble; (x, y) = top-left
//   drawTear / drawSweat / drawPixelHeart / drawCrown / drawTissue    the small stuff
//   drawStamp(ctx, x, y, k, rot)                        the red ICK: DISMISSED rubber stamp; k = 0…1 ink
// Pure functions of their arguments; nothing touches `document`.
import { clamp } from '../../../src/lib.js'

const OUT = '#1a1030'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', ui-monospace, monospace"

export function bitmap(ctx, rows, pal, x, y, px) {
  rows.forEach((row, j) => { for (let i = 0; i < row.length; i++) { const c = pal[row[i]]; if (c) { ctx.fillStyle = c; ctx.fillRect(Math.round(x + i * px), Math.round(y + j * px), Math.ceil(px), Math.ceil(px)) } } })
}
const R = (ctx, x, y, w, h, c) => { ctx.fillStyle = c; ctx.fillRect(Math.round(x), Math.round(y), Math.ceil(w), Math.ceil(h)) }

// ─────────────────────────────── Libra's scales
const SG = '#ffcf3f', SGL = '#fff2a6', SGD = '#b5740e'
export function drawScales(ctx, x, y, px, ang = 0, { alpha = 1, glint = 0 } = {}) {
  if (alpha <= 0) return
  ctx.save(); ctx.globalAlpha *= alpha
  const c = (i, j, w, h, col) => R(ctx, x + i * px, y + j * px, w * px, h * px, col)
  // post + base
  c(-1.5, -0.5, 3, 11, OUT); c(-6, 9.5, 12, 3, OUT)
  c(-0.5, 0, 1, 10, SG); c(-0.5, 0, 0.5, 10, SGL)
  c(-5, 10, 10, 1.5, SG); c(-5, 10, 10, 0.5, SGL); c(-5, 11, 10, 0.5, SGD)
  // the beam: a stepped line of cells, outline first
  const L = 10, ca = Math.cos(ang), sa = Math.sin(ang)
  const beam = []
  for (let k = -L; k <= L; k++) beam.push([Math.round(k * ca), Math.round(k * sa)])
  for (const [i, j] of beam) c(i - 1, j - 1.5, 3, 3, OUT)
  for (const [i, j] of beam) { c(i - 0.5, j - 1, 2, 1, SGL); c(i - 0.5, j, 2, 1, SG) }
  // finial knob on the pivot
  c(-2, -3.5, 4, 3, OUT); c(-1.5, -3, 3, 2.5, SG); c(-1, -3, 1, 1, '#ffffff')
  // chains + pans (the pans hang straight down from each end)
  for (const s of [-1, 1]) {
    const [ei, ej] = beam[s < 0 ? 0 : beam.length - 1]
    // two chain lines, a stepped V
    for (let k = 1; k <= 5; k++) { const d = Math.round(k * 0.7); c(ei - d - 0.5 + 0.5, ej + k, 1, 1, SGD); c(ei + d - 0.5 + 0.5, ej + k, 1, 1, SGD) }
    const py = ej + 6
    c(ei - 5, py - 1, 11, 3, OUT); c(ei - 4, py + 1, 9, 2, OUT); c(ei - 3, py + 2, 7, 2, OUT)
    c(ei - 4, py, 9, 1, SGL); c(ei - 3, py + 1, 7, 1, SG); c(ei - 2, py + 2, 5, 1, SGD)
  }
  if (glint > 0) {
    ctx.globalAlpha = clamp(glint) * alpha
    const g = (2 + 3 * clamp(glint))
    c(-0.5, -2 - g, 1, 2 * g + 1, '#ffffff'); c(-0.5 - g, -2, 2 * g + 1, 1, '#ffffff')
  }
  ctx.restore()
}

// ─────────────────────────────── the gavel + its block
const WOOD = '#9a5a2c', WOOD_HI = '#d08a50', WOOD_LO = '#5e3216', BAND = '#ffd23f'
export function drawGavel(ctx, x, y, px, rot = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot)
  const c = (i, j, w, h, col) => { ctx.fillStyle = col; ctx.fillRect(i * px, j * px, w * px, h * px) }
  // handle
  c(-1, -1.2, 14, 2.4, OUT); c(0, -0.6, 12.5, 1.2, WOOD_HI); c(0, 0.2, 12.5, 0.6, WOOD)
  // head (perpendicular, at the far end)
  c(11, -5.2, 6.4, 10.4, OUT); c(12, -4.4, 4.4, 8.8, WOOD); c(12, -4.4, 1.4, 8.8, WOOD_HI); c(15.2, -4.4, 1.2, 8.8, WOOD_LO)
  c(12, -3.4, 4.4, 1, BAND); c(12, 2.4, 4.4, 1, BAND)
  ctx.restore()
}
export function drawSoundBlock(ctx, x, y, px) {
  R(ctx, x - 7 * px, y - px, 14 * px, 5 * px, OUT)
  R(ctx, x - 6 * px, y, 12 * px, 1.5 * px, WOOD_HI); R(ctx, x - 6 * px, y + 1.5 * px, 12 * px, 2 * px, WOOD_LO)
}

// ─────────────────────────────── the judge's wig (sits on the star's top tip, curls hang beside the top arm)
// a judge's wig: a puffy cap on the top tip + flared side rolls of stacked curls (mirrored; the cap's shine on the left)
const WIG = [
  '...........OOOOOOOO...........',
  '........OOOWWWWWWWWOOO........',
  '......OOWWWHHWWWWWWWWWOO......',
  '.....OWWWWHWWWWWWWWWWWWWO.....',
  '....OWWWWWWWWWWWWWWWWWWWWO....',
  '...OWWSWWWWSWWWWWWSWWWWSWWO...',
  '..OWWWWWWWWWWWWWWWWWWWWWWWWO..',
  '..OWSSWOOOOOOOOOOOOOOOOWSSWO..',
  '.OHWWWWO..............OWWWWHO.',
  '.OSSSSSO..............OSSSSSO.',
  'OHWWWWWO..............OWWWWWHO',
  'OSSSSSSO..............OSSSSSSO',
  'OHWWWWWO..............OWWWWWHO',
  'OSSSSSSO..............OSSSSSSO',
  '.OOOOOO................OOOOOO.',
]
export function drawWig(ctx, x, y, c, { alpha = 1 } = {}) {
  ctx.save(); ctx.globalAlpha *= alpha
  bitmap(ctx, WIG, { O: '#2a2040', W: '#f4efe6', S: '#b4a9c9', H: '#ffffff' }, x - 15 * c, y - 3.5 * c, c)
  ctx.restore()
}

// ─────────────────────────────── furniture
export function drawBench(ctx, x, y, w, h, { alpha = 1 } = {}) {
  ctx.save(); ctx.globalAlpha *= alpha
  const L = x - w / 2
  R(ctx, L - 6, y - 6, w + 12, h + 12, OUT)
  R(ctx, L, y + 22, w, h - 22, '#6e3a1e')
  // top ledge
  R(ctx, L - 14, y - 4, w + 28, 26, OUT); R(ctx, L - 10, y, w + 20, 18, '#c27a3e'); R(ctx, L - 10, y, w + 20, 5, '#eaa964'); R(ctx, L - 10, y + 14, w + 20, 4, '#7d4320')
  // raised panels
  const n = 3, gap = 16, pw = (w - gap * (n + 1)) / n
  for (let k = 0; k < n; k++) {
    const px0 = L + gap + k * (pw + gap)
    R(ctx, px0, y + 36, pw, h - 52, '#5a2e17'); R(ctx, px0 + 6, y + 42, pw - 12, h - 64, '#7a4222'); R(ctx, px0 + 6, y + 42, pw - 12, 4, '#9a5a2c')
  }
  // plaque
  const pw2 = 300, ph = 54, py = y + 26 + (h - 26) / 2 - ph / 2
  R(ctx, x - pw2 / 2 - 4, py - 4, pw2 + 8, ph + 8, OUT); R(ctx, x - pw2 / 2, py, pw2, ph, '#f2c75c'); R(ctx, x - pw2 / 2, py, pw2, 4, '#fff1b0'); R(ctx, x - pw2 / 2, py + ph - 5, pw2, 5, '#b5740e')
  ctx.fillStyle = '#2a1408'; ctx.font = `700 30px ${MONO}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  if ('letterSpacing' in ctx) ctx.letterSpacing = '4px'
  ctx.fillText('ICK COURT', x + 2, py + ph / 2 + 2)
  if ('letterSpacing' in ctx) ctx.letterSpacing = '0px'
  ctx.restore()
}
export function drawLectern(ctx, x, y, w, h, { alpha = 1 } = {}) {
  ctx.save(); ctx.globalAlpha *= alpha
  // slanted top
  ctx.fillStyle = OUT; ctx.beginPath(); ctx.moveTo(x - w / 2 - 14, y + 10); ctx.lineTo(x + w / 2 + 14, y - 8); ctx.lineTo(x + w / 2 + 14, y + 22); ctx.lineTo(x - w / 2 - 14, y + 34); ctx.closePath(); ctx.fill()
  ctx.fillStyle = '#c27a3e'; ctx.beginPath(); ctx.moveTo(x - w / 2 - 8, y + 12); ctx.lineTo(x + w / 2 + 8, y - 2); ctx.lineTo(x + w / 2 + 8, y + 14); ctx.lineTo(x - w / 2 - 8, y + 26); ctx.closePath(); ctx.fill()
  ctx.fillStyle = '#eaa964'; ctx.beginPath(); ctx.moveTo(x - w / 2 - 8, y + 12); ctx.lineTo(x + w / 2 + 8, y - 2); ctx.lineTo(x + w / 2 + 8, y + 3); ctx.lineTo(x - w / 2 - 8, y + 17); ctx.closePath(); ctx.fill()
  // body (narrows a little to the base)
  const top = y + 24, bw = w * 0.86
  R(ctx, x - bw / 2 - 6, top, bw + 12, h - 24, OUT)
  R(ctx, x - bw / 2, top, bw, h - 30, '#7a4222'); R(ctx, x - bw / 2, top, 6, h - 30, '#9a5a2c')
  R(ctx, x - bw / 2 + 18, top + 22, bw - 36, h - 76, '#5a2e17'); R(ctx, x - bw / 2 + 24, top + 28, bw - 48, h - 88, '#6e3a1e')
  // a gold ♎-ish emblem: two bars
  R(ctx, x - 22, top + 48, 44, 6, '#f2c75c'); R(ctx, x - 22, top + 62, 44, 6, '#f2c75c'); R(ctx, x - 6, top + 40, 12, 10, '#f2c75c')
  ctx.restore()
}
export function drawRail(ctx, x0, x1, y, px = 6, { alpha = 1 } = {}) {
  ctx.save(); ctx.globalAlpha *= alpha
  const H = 26 * px
  // balusters
  for (let x = x0 + 8 * px; x < x1 - 4 * px; x += 11 * px) {
    R(ctx, x - px, y + 3 * px, 5 * px, H - 3 * px, OUT)
    R(ctx, x, y + 3 * px, 3 * px, H - 3 * px, '#9a5a2c'); R(ctx, x, y + 3 * px, px, H - 3 * px, '#c27a3e')
    R(ctx, x - px * 0.5, y + 8 * px, 4 * px, 2 * px, '#7a4222')
  }
  // bottom rail
  R(ctx, x0, y + H - 2 * px, x1 - x0, 6 * px, OUT); R(ctx, x0, y + H - px, x1 - x0, 4 * px, '#7a4222')
  // top rail
  R(ctx, x0, y - px, x1 - x0, 6 * px, OUT); R(ctx, x0, y, x1 - x0, 4 * px, '#c27a3e'); R(ctx, x0, y, x1 - x0, px, '#eaa964'); R(ctx, x0, y + 3 * px, x1 - x0, px, '#7d4320')
  ctx.restore()
}
/** the easel's legs (drawn BEFORE the board): two splayed front legs + a back mast, a ledge under the board */
export function drawEaselLegs(ctx, cx, top, w, h, px = 6, { alpha = 1 } = {}) {
  ctx.save(); ctx.globalAlpha *= alpha
  const leg = (xa, ya, xb, yb, wd) => {
    const n = Math.ceil(Math.hypot(xb - xa, yb - ya) / px)
    for (let k = 0; k <= n; k++) { const u = k / n, lx = xa + (xb - xa) * u, ly = ya + (yb - ya) * u; R(ctx, lx - wd / 2 - px, ly, wd + 2 * px, px + 1, OUT) }
    for (let k = 0; k <= n; k++) { const u = k / n, lx = xa + (xb - xa) * u, ly = ya + (yb - ya) * u; R(ctx, lx - wd / 2, ly, wd, px + 1, k % 7 === 0 ? '#c27a3e' : '#9a5a2c') }
  }
  leg(cx, top - 50, cx, top + h + 150, 3 * px)                       // back mast
  leg(cx - w * 0.3, top + 20, cx - w * 0.42, top + h + 170, 3 * px)
  leg(cx + w * 0.3, top + 20, cx + w * 0.42, top + h + 170, 3 * px)
  // ledge
  R(ctx, cx - w / 2 - 14, top + h - 4, w + 28, 4 * px, OUT); R(ctx, cx - w / 2 - 10, top + h, w + 20, 2 * px, '#c27a3e')
  ctx.restore()
}

// ─────────────────────────────── the plane (facing left) + runway
const PLANE = [
  '..................................OOO...',
  '.................................OTTO...',
  '................................OTTTO...',
  '...............................OTTTTO..',
  '......OOOOOOOOOOOOOOOOOOOOOOOOOOTTTTTO..',
  '....OOWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWO.',
  '...OCCWWYYWWYYWWYYWWYYWWYYWWYYWWYYWWWWO.',
  '..OCCWWWYYWWYYWWYYWWYYWWYYWWYYWWYYWWWWWO',
  '.OWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWO',
  '.OBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBO.',
  '..OSSSSSSSSSSDDDDDDDDDDDSSSSSSSSSSSSSO..',
  '...OOOOOOOOOODDDDDDDDDDDDOOOOOOOOOOOO...',
  '............ODDDDDDDDDDDDO..............',
  '.............OOOOOOOOOOOO...............',
]
const PLANE_PAL = { O: OUT, W: '#f6f2ff', S: '#c6bde6', B: '#5b7bff', Y: '#ffe08a', C: '#8fdcff', T: '#ff5c7a', D: '#9a90c8' }
export const PLANE_W = 40, PLANE_H = 14
export function drawPlane(ctx, x, y, px, { tilt = 0, gear = 1, alpha = 1 } = {}) {
  if (alpha <= 0) return
  ctx.save(); ctx.globalAlpha *= alpha
  ctx.translate(x, y); ctx.rotate(tilt)
  const ox = -PLANE_W / 2 * px, oy = -(PLANE_H + 3) * px
  // gear (struts + wheels)
  if (gear > 0) {
    for (const gx of [7, 20]) {
      R(ctx, ox + gx * px, oy + 13 * px, px, 2 * px * gear, '#8d84ab')
      R(ctx, ox + (gx - 1) * px, oy + (13 + 2 * gear) * px, 3 * px, 1.6 * px, '#2a1846')
    }
  }
  bitmap(ctx, PLANE, PLANE_PAL, ox, oy, px)
  ctx.restore()
}
export function drawRunway(ctx, x0, x1, y, t, { alpha = 1 } = {}) {
  if (alpha <= 0) return
  ctx.save(); ctx.globalAlpha *= alpha
  R(ctx, x0, y, x1 - x0, 34, '#241a40'); R(ctx, x0, y, x1 - x0, 4, '#3c2d66')
  for (let x = x0 + 20; x < x1 - 30; x += 70) R(ctx, x, y + 15, 38, 6, 'rgba(239,230,214,0.75)')
  for (let x = x0 + 12; x < x1; x += 56) { const on = Math.floor(t * 3 + x / 56) % 3 === 0; R(ctx, x, y - 8, 6, 6, on ? '#ffe08a' : '#a8803a') }
  ctx.restore()
}

// ─────────────────────────────── exhibit art
const BUS = [
  'OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO..',
  'OYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYO.',
  'OYBBBBYBBBBYBBBBYBBBBYBBBBYYBBBBBYYO',
  'OYBBBBYBBBBYBBBBYBBBBYBBBBYYBBBBBBYO',
  'OYBBBBYBBBBYBBBBYBBBBYBBBBYYBBBBBBYO',
  'OYYYYYYYYYYYYYYYYYYYYYYYYYYYBBBBBBYO',
  'ORRRRRRRRRRRRRRRRRRRRRRRRRRYBBBBBBYO',
  'OYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYLO',
  'OYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYO',
  'OOOOKKKKOOOOOOOOOOOOOOOOOKKKKOOOOOOO',
  '...KKGGKK...............KKGGKK......',
  '....KKKK.................KKKK.......',
]
export function drawBus(ctx, x, y, px, t) {
  const bob = Math.round(Math.sin(t * 18) * 0.6) * px * 0.5
  bitmap(ctx, BUS, { O: OUT, Y: '#ffc93f', B: '#8fdcff', R: '#ff5c7a', K: '#2a1846', G: '#c4bce0', L: '#fff6c0' }, x - 18 * px, y - 12 * px + bob, px)
}
/** a tiny stick figure running to the right, arms up (2-frame cycle) */
export function drawRunner(ctx, x, y, px, t) {
  const f = Math.floor(t * 9) % 2
  const A = f ? [
    '..XX....',
    '..XX..X.',
    'X.XX.X..',
    '.XXXX...',
    '..XX....',
    '..XX....',
    '.X..X...',
    'X....X..',
  ] : [
    '..XX....',
    'X.XX....',
    '.XXXX.X.',
    '..XX.X..',
    '..XX....',
    '..XXX...',
    '..X..X..',
    '.X....X.',
  ]
  const hop = f ? -px : 0
  bitmap(ctx, A, { X: '#2a1846' }, x - 4 * px, y - 8 * px + hop, px)
}
export function drawCup(ctx, x, y, px, t) {
  const CUP = [
    '.OOOOOOOOOO....',
    '.OCCCCCCCCO....',
    '.OWWWWWWWWOOO..',
    '.OWWWWWWWWO.O..',
    '.OWWWWWWWWO.O..',
    '..OWWWWWWOOO...',
    '..OWWWWWWO.....',
    'OOOOOOOOOOOO...',
    'OSSSSSSSSSSO...',
    '.OOOOOOOOOO....',
  ]
  bitmap(ctx, CUP, { O: OUT, C: '#6b3a1f', W: '#fbf6ec', S: '#d9cdf0' }, x - 6 * px, y - 10 * px, px)
  // steam: three wiggling columns
  for (let k = 0; k < 3; k++) {
    for (let j = 0; j < 4; j++) {
      const ph = (t * 1.6 + k * 0.33 + j * 0.25) % 1
      const dx = Math.round(Math.sin((j + t * 3 + k) * 1.7)) * px
      ctx.globalAlpha = 0.75 * Math.sin(Math.PI * ph)
      R(ctx, x - 3 * px + k * 3 * px + dx, y - (12 + j * 2 + ph * 2) * px, px, 1.5 * px, '#efe6d6')
    }
  }
  ctx.globalAlpha = 1
}
export function drawPlate(ctx, x, y, px) {
  // plate (an ellipse in steps) + a slice of cake with a cherry
  const rows = [10, 13, 14, 13, 10]
  rows.forEach((hw, j) => R(ctx, x - (hw + 1) * px, y + (j - 2) * px, (2 * hw + 2) * px, px, OUT))
  rows.forEach((hw, j) => R(ctx, x - hw * px, y + (j - 2) * px, 2 * hw * px, px, j === 0 ? '#ffffff' : j < 3 ? '#efe9f8' : '#c9c0d8'))
  const CAKE = [
    '.....OO.....',
    '....ORRO....',
    '..OOOOOOOO..',
    '.OPPPPPPPPO.',
    '.OCCCCCCCCO.',
    '.OPPPPPPPPO.',
    '.OCCCCCCCCO.',
    '.OOOOOOOOOO.',
  ]
  bitmap(ctx, CAKE, { O: OUT, R: '#ff3d55', P: '#ffb3c9', C: '#fff1d6' }, x - 6 * px, y - 9 * px, px)
}
export function drawDog(ctx, x, y, px, t) {
  const wag = Math.floor(t * 8) % 2
  const DOG = [
    '..OOO.....OOOO......',
    '.OEEEO...OTTTTO.....',
    '.OEEEOOOOTTTTTTO....',
    '..OEETTTTTTTTTTO....',
    '...OTTKTTTTKTTO.....',
    '...OTTTTTTTTTTO.....',
    '...OTTTTNNNTTTO.....',
    '....OTTTPPTTTO......',
    '.....OOTTTTOO.......',
    '....OTTTTTTTTO......',
    '...OTTTWWWTTTTO.....',
    '...OTTWWWWWTTTTO....',
    '...OTTWWWWWTTTTTO...',
    '...OTTTTTTTTTTTTO...',
    '...OTTOTTTTOTTTTO...',
    '...OOOOOOOOOOOOOO...',
  ]
  bitmap(ctx, DOG, { O: OUT, T: '#e0a25a', E: '#8a5226', K: '#1a1030', N: '#2a1846', P: '#ff7a9a', W: '#fbf1dc' }, x - 10 * px, y - 16 * px, px)
  // tail
  const tx = x + 6 * px, ty = y - 6 * px
  if (wag) { R(ctx, tx, ty - 3 * px, px * 2, px * 2, OUT); R(ctx, tx + px * 2, ty - 5 * px, px * 2, px * 2, OUT); R(ctx, tx + px * 0.5, ty - 2.5 * px, px, px, '#e0a25a') }
  else { R(ctx, tx, ty - px, px * 2, px * 2, OUT); R(ctx, tx + px * 2, ty - px, px * 2, px * 2, OUT); R(ctx, tx + px * 4, ty - 2 * px, px * 2, px * 2, OUT) }
}
export function drawSeats(ctx, cx, y, w, px, { n = 5, color = '#a8243e' } = {}) {
  const sw = w / n
  for (let k = 0; k < n; k++) {
    const sx = cx - w / 2 + k * sw + sw * 0.08, ww = sw * 0.84
    R(ctx, sx - px, y - px, ww + 2 * px, 14 * px, OUT)
    R(ctx, sx, y, ww, 13 * px, color); R(ctx, sx, y, ww, 2 * px, '#e0566e'); R(ctx, sx + px, y + 2 * px, px, 10 * px, '#c83a56')
  }
}

// ─────────────────────────────── bubbles, drops, the small stuff
/** a pixel speech bubble (white, stepped corners, ink outline), tail pointing down (or up) at tailX (px from the left) */
export function drawBubble(ctx, x, y, w, h, { tail = 'down', tailX = 40, px = 5, fill = '#fffaf0', alpha = 1 } = {}) {
  if (alpha <= 0) return
  ctx.save(); ctx.globalAlpha *= alpha
  const step = (o, col) => {
    ctx.fillStyle = col
    ctx.fillRect(Math.round(x + 2 * px - o), Math.round(y - o), Math.round(w - 4 * px + 2 * o), Math.round(h + 2 * o))
    ctx.fillRect(Math.round(x - o), Math.round(y + 2 * px - o), Math.round(w + 2 * o), Math.round(h - 4 * px + 2 * o))
    ctx.fillRect(Math.round(x + px - o), Math.round(y + px - o), Math.round(w - 2 * px + 2 * o), Math.round(h - 2 * px + 2 * o))
  }
  step(px, OUT)
  // tail
  const tx = x + tailX
  for (let k = 0; k < 4; k++) {
    const ty = tail === 'down' ? y + h + k * px : y - (k + 1) * px
    R(ctx, tx - (4 - k) * px * 0.5 - px, ty - (tail === 'down' ? px : 0), (4 - k) * px + 2 * px, px * 2, OUT)
  }
  for (let k = 0; k < 3; k++) {
    const ty = tail === 'down' ? y + h - px + k * px : y - k * px
    R(ctx, tx - (3 - k) * px * 0.5, ty, (3 - k) * px, px, fill)
  }
  step(0, fill)
  ctx.restore()
}
export function drawTear(ctx, x, y, px) {
  bitmap(ctx, ['.T.', 'TWT', 'TTT', '.T.'], { T: '#6fd3ff', W: '#e6f8ff' }, x - 1.5 * px, y - 2 * px, px)
}
export function drawSweat(ctx, x, y, px) {
  bitmap(ctx, ['..O..', '.OSO.', '.OSO.', 'OSWSO', 'OSSSO', '.OOO.'], { O: '#1f3a6e', S: '#7fd6ff', W: '#ffffff' }, x - 2.5 * px, y - 3 * px, px)
}
export function drawPixelHeart(ctx, x, y, px, col = '#ff4f7e') {
  bitmap(ctx, ['.XX.XX.', 'XWXXXXX', 'XXXXXXX', '.XXXXX.', '..XXX..', '...X...'], { X: col, W: '#ffd0dc' }, x - 3.5 * px, y - 3 * px, px)
}
export function drawCrown(ctx, x, y, px, rot = -0.12) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot)
  bitmap(ctx, [
    'L...L...L',
    'GL.LGL.LG',
    'GGLGGGLGG',
    'GGGGGGGGG',
    'GRGGBGGRG',
    'GGGGGGGGG',
    'LLLLLLLLL',
  ], { L: '#7a4a10', G: '#ffd23f', R: '#ff3d6e', B: '#38c4ec' }, -4.5 * px, -7 * px, px)
  R(ctx, -3.5 * px, -5 * px, px, px, '#fff6c0')
  ctx.restore()
}
/** a tissue held up (a white square with a soft fold), fluttering */
export function drawTissue(ctx, x, y, px, t) {
  const f = Math.floor(t * 6) % 2
  bitmap(ctx, f ? ['..OOOO.', '.OWWWWO', 'OWWSWWO', 'OWWWWO.', '.OOOO..'] : ['.OOOO..', 'OWWWWO.', 'OWWSWWO', '.OWWWWO', '..OOOO.'], { O: '#5a5478', W: '#ffffff', S: '#dcd6ee' }, x - 3.5 * px, y - 2.5 * px, px)
}

// ─────────────────────────────── the stamp
const SPECK = Array.from({ length: 90 }, (_, i) => [((i * 0.6180339) % 1), ((i * 0.7548776 + 0.3) % 1), 3 + (i * 7) % 6])
let STAMP = null
/** the stamp art, drawn once into its own canvas (so the worn-ink knock-outs only cut the stamp) */
function stampArt(w, h) {
  if (STAMP && STAMP.w === w && STAMP.h === h) return STAMP.c
  const M = 24, c = document.createElement('canvas'); c.width = w + 2 * M; c.height = h + 2 * M
  const x = c.getContext('2d'); x.translate(c.width / 2, c.height / 2)
  const RED = '#e8344e'
  x.strokeStyle = RED; x.lineWidth = 12
  x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, 20); x.stroke()
  x.lineWidth = 5; x.beginPath(); x.roundRect(-w / 2 + 16, -h / 2 + 16, w - 32, h - 32, 10); x.stroke()
  x.fillStyle = RED; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.font = `800 ${Math.round(h * 0.25)}px ${INTER}`
  if ('letterSpacing' in x) x.letterSpacing = `${Math.round(h * 0.03)}px`
  x.fillText('ICK:', 0, -h * 0.17)
  x.font = `800 ${Math.round(h * 0.3)}px ${INTER}`
  x.fillText('DISMISSED', 0, h * 0.18)
  if ('letterSpacing' in x) x.letterSpacing = '0px'
  // worn ink: knock little holes out of it
  x.globalCompositeOperation = 'destination-out'
  for (const [u, v, s] of SPECK) { x.fillStyle = 'rgba(0,0,0,0.75)'; x.fillRect(-w / 2 - 10 + u * (w + 20), -h / 2 - 10 + v * (h + 20), s, s * 0.7) }
  STAMP = { w, h, c, M }
  return c
}
/** red rubber stamp "ICK: DISMISSED" centred on (x, y), w × h; k = ink 0…1 */
export function drawStamp(ctx, x, y, w, h, { k = 1, rot = -0.1, scale = 1 } = {}) {
  if (k <= 0) return
  const im = stampArt(w, h)
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(scale, scale)
  ctx.globalAlpha *= clamp(k)
  ctx.drawImage(im, -im.width / 2, -im.height / 2)
  ctx.restore()
}
