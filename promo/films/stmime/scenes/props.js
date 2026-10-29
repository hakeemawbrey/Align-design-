// stmime props: the little pixel drawings of "The Mime." (Star Talk "Wild Lessons" #21). A moonlit park in the sky, shot
// like a silent picture. Every prop is a pure draw call; one art pixel = px screen px, crisp rectangles.
//   bitmap(ctx, rows, pal, x, y, px)         rows of chars → pixels; (x, y) = top-left; '.' = empty
//   drawBeret(ctx, x, y, px, rot)            a black mime beret; (x, y) = the middle of its band
//   drawCroissant(ctx, x, y, px, rot)        Taurus' croissant; (x, y) = centre
//   drawBench(ctx, cx, ground, px)           a park bench; cx = its middle, ground = where its feet stand
//   drawLamp(ctx, cx, top, ground, glow)     a park lamppost (the lamp at top)
//   drawPiano(ctx, x0, y0, w, h)             the cinema's upright piano (seen from the audience)
//   drawKey(ctx, x, y, px, rot)              the little key a mime throws away
//   drawZipper(ctx, cx, y, w, k, px)         a zip across a mouth; k = 0…1 how far it is closed
//   drawNote(ctx, x, y, px, col)             a pixel ♪
//   drawGround(ctx, y, w, h)                 the park lawn and path
//   drawTear / drawSweat / drawPixelHeart / drawTissue      the small stuff
// Pure functions of their arguments; nothing touches `document`.
const OUT = '#1a1030'

export function bitmap(ctx, rows, pal, x, y, px) {
  rows.forEach((row, j) => { for (let i = 0; i < row.length; i++) { const c = pal[row[i]]; if (c) { ctx.fillStyle = c; ctx.fillRect(Math.round(x + i * px), Math.round(y + j * px), Math.ceil(px), Math.ceil(px)) } } })
}
const R = (ctx, x, y, w, h, c) => { ctx.fillStyle = c; ctx.fillRect(Math.round(x), Math.round(y), Math.ceil(w), Math.ceil(h)) }

const BERET = [
  '.........OO......',
  '........ONNO.....',
  '....OOOOOOOOOO...',
  '..OOBBBBBBBBBBOO.',
  '.OBBLLBBBBBBBBBBO',
  'OBBLBBBBBBBBBBBBO',
  'OBBBBBBBBBBBBBBO.',
  '.ORRRRRRRRRRRRO..',
  '..OOOOOOOOOOOO...',
]
export function drawBeret(ctx, x, y, px, rot = -0.18, alpha = 1) {
  if (alpha <= 0) return
  ctx.save(); ctx.globalAlpha *= alpha; ctx.translate(x, y); ctx.rotate(rot)
  bitmap(ctx, BERET, { O: OUT, B: '#2a2438', L: '#4a4060', N: '#2a2438', R: '#c8324a' }, -8.5 * px, -8 * px, px)
  ctx.restore()
}

const CROI = [
  '....OOOOOO....',
  '..OODLLDDLOO..',
  '.ODLLDDLLDDLO.',
  'OODDLLDDLLDDOO',
  'OD.OODDLLOO.DO',
  'OO...OOOO...OO',
]
export function drawCroissant(ctx, x, y, px, rot = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot)
  bitmap(ctx, CROI, { O: '#5a2e14', D: '#d0862c', L: '#f2c06a' }, -7 * px, -3 * px, px)
  ctx.restore()
}

export function drawBench(ctx, cx, ground, px = 6) {
  const w = 300, x0 = cx - w / 2
  // legs
  for (const lx of [x0 + 24, x0 + w - 24 - 3 * px]) { R(ctx, lx - px, ground - 92, 5 * px, 92, OUT); R(ctx, lx, ground - 90, 3 * px, 90, '#3a3a48') }
  // back slats
  for (const [yy, c] of [[ground - 196, '#8e5638'], [ground - 164, '#7a4630']]) { R(ctx, x0 - px, yy - px, w + 2 * px, 22 + 2 * px, OUT); R(ctx, x0, yy, w, 22, c); R(ctx, x0, yy, w, 4, '#a8683c') }
  for (const lx of [x0 + 30, x0 + w - 40]) { R(ctx, lx - px, ground - 200, 4 * px, 110, OUT); R(ctx, lx, ground - 198, 2 * px, 108, '#3a3a48') }
  // seat
  R(ctx, x0 - 14 - px, ground - 100 - px, w + 28 + 2 * px, 26 + 2 * px, OUT); R(ctx, x0 - 14, ground - 100, w + 28, 26, '#9a6040'); R(ctx, x0 - 14, ground - 100, w + 28, 5, '#c08050')
}

export function drawLamp(ctx, cx, top, ground, glow = 1) {
  if (glow > 0) {
    const g = ctx.createRadialGradient(cx, top + 40, 0, cx, top + 40, 300)
    g.addColorStop(0, `rgba(255,226,150,${0.38 * glow})`); g.addColorStop(1, 'rgba(255,226,150,0)')
    ctx.fillStyle = g; ctx.fillRect(cx - 300, top - 260, 600, 600)
    // the pool of light on the ground
    ctx.fillStyle = `rgba(255,226,150,${0.12 * glow})`; ctx.beginPath(); ctx.ellipse(cx, ground + 20, 260, 34, 0, 0, Math.PI * 2); ctx.fill()
  }
  R(ctx, cx - 11, top + 80, 22, ground - top - 80, OUT); R(ctx, cx - 6, top + 80, 12, ground - top - 80, '#3c3850'); R(ctx, cx - 6, top + 80, 4, ground - top - 80, '#5c5878')
  R(ctx, cx - 26, ground - 30, 52, 30, OUT); R(ctx, cx - 20, ground - 26, 40, 26, '#3c3850')
  // the lantern
  R(ctx, cx - 40, top - 6, 80, 96, OUT)
  R(ctx, cx - 34, top + 10, 68, 70, '#ffe7a0'); R(ctx, cx - 34, top + 10, 68, 10, '#fff6d0')
  R(ctx, cx - 4, top + 10, 8, 70, '#3c3850')
  R(ctx, cx - 50, top - 14, 100, 16, OUT); R(ctx, cx - 44, top - 10, 88, 8, '#5c5878')
  R(ctx, cx - 10, top - 30, 20, 18, OUT)
  R(ctx, cx - 40, top + 82, 80, 12, '#3c3850')
}

/** the upright piano (back panel towards us, keys on top edge), x0, y0 = top-left */
export function drawPiano(ctx, x0, y0, w, h) {
  R(ctx, x0 - 6, y0 - 6, w + 12, h + 6, OUT)
  R(ctx, x0, y0, w, h, '#4a2a22'); R(ctx, x0, y0, w, 8, '#6e3f2c')
  R(ctx, x0 + 16, y0 + 30, w - 32, h - 60, '#3a2018'); R(ctx, x0 + 22, y0 + 36, w - 44, h - 72, '#52302a')
  // the music stand + sheet
  R(ctx, x0 + w * 0.3 - 4, y0 - 54, w * 0.4 + 8, 52, OUT); R(ctx, x0 + w * 0.3, y0 - 50, w * 0.4, 46, '#f3ead8')
  for (let k = 0; k < 4; k++) R(ctx, x0 + w * 0.3 + 6, y0 - 42 + k * 10, w * 0.4 - 12, 2, '#8a7a68')
  // candle-ish brass trims
  R(ctx, x0 + 10, y0 + 12, 12, 6, '#d8a84a'); R(ctx, x0 + w - 22, y0 + 12, 12, 6, '#d8a84a')
  // feet
  R(ctx, x0 + 8, y0 + h - 4, 22, 10, OUT); R(ctx, x0 + w - 30, y0 + h - 4, 22, 10, OUT)
}

export function drawKey(ctx, x, y, px, rot = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot)
  bitmap(ctx, ['.OOO.......', 'OYWYO......', 'OY.YOOOOOOO', 'OYYYYYYYYYO', '.OOOOOOYOYO', '.......O.O.'], { O: OUT, Y: '#f2c75c', W: '#fff4c0' }, -5.5 * px, -3 * px, px)
  ctx.restore()
}

/** a zip across a mouth: teeth from the left edge up to the pull tab at k (0 = open … 1 = shut) */
export function drawZipper(ctx, cx, y, w, k, px) {
  if (k <= 0) return
  const x0 = cx - w / 2, xe = x0 + w * k
  R(ctx, x0 - px, y - px, xe - x0 + 2 * px, 3 * px, OUT)
  for (let xx = x0; xx < xe; xx += 2 * px) { R(ctx, xx, y, px, px, '#d9d4e6'); R(ctx, xx + px, y + px * 0.5, px, px, '#9a94ae') }
  // the pull tab
  R(ctx, xe - px, y - 2 * px, 3 * px, 6 * px, OUT); R(ctx, xe, y - px, px, 4 * px, '#e8e2f2')
}

export function drawNote(ctx, x, y, px, col = '#efe6d6') {
  bitmap(ctx, ['...XX', '...XXX', '...X.X', '...X..', '...X..', '.XXX..', 'XXXX..', '.XX...'], { X: col }, x - 2.5 * px, y - 4 * px, px)
}

export function drawGround(ctx, y, w, h) {
  const g = ctx.createLinearGradient(0, y, 0, y + h)
  g.addColorStop(0, '#3e5a4a'); g.addColorStop(0.2, '#2c4238'); g.addColorStop(1, '#141c22')
  ctx.fillStyle = g; ctx.fillRect(0, y, w, h)
  R(ctx, 0, y, w, 6, '#5e8068'); R(ctx, 0, y + 6, w, 4, '#4a6a56')
  // a cobbled path
  ctx.fillStyle = 'rgba(200,190,170,0.18)'
  for (let i = 0; i < 18; i++) ctx.fillRect(((i * 71) % w), y + 34 + (i % 3) * 18, 44, 10)
  // grass tufts
  for (let i = 0; i < 30; i++) { const px = (i * 137.3) % w, py = y + 8 + ((i * 53.1) % 60); R(ctx, px, py - 10, 4, 10, 'rgba(120,170,130,0.45)'); R(ctx, px + 6, py - 6, 4, 6, 'rgba(120,170,130,0.35)') }
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
export function drawTissue(ctx, x, y, px, t) {
  const f = Math.floor(t * 6) % 2
  bitmap(ctx, f ? ['..OOOO.', '.OWWWWO', 'OWWSWWO', 'OWWWWO.', '.OOOO..'] : ['.OOOO..', 'OWWWWO.', 'OWWSWWO', '.OWWWWO', '..OOOO.'], { O: '#5a5478', W: '#ffffff', S: '#dcd6ee' }, x - 3.5 * px, y - 2.5 * px, px)
}
