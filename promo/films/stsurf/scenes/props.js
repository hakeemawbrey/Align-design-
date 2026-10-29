// stsurf props: the little pixel drawings for "Catch the Wave." (Star Talk "Wild Lessons" #19). Every prop is a pure
// draw call; one art pixel = px screen px, crisp rectangles, so they sit next to the pixel stars.
//   bitmap(ctx, rows, pal, x, y, px)                     rows of chars → pixels; (x, y) = top-left; '.' = empty
//   drawBoard(ctx, x, y, len, { rot, col, stripe })      a surfboard; (x, y) = its centre
//   drawShades(ctx, x, y, size, { rot })                 dark surf sunglasses on a star of `size`
//   drawLei(ctx, x, y, size)                             a flower lei around a star's middle (the guru)
//   drawSeaweed(ctx, x, y, px, t)                        a dripping clump of seaweed (sits on a head)
//   drawStopSign(ctx, x, y, px, rot)                     a tiny STOP sign on a stick; (x, y) = the bottom of the stick
//   drawScore(ctx, x, y, text, k, { rot })               a judge's white score paddle; (x, y) = the card's centre
//   drawTower(ctx, x, base, seat)                        the lifeguard tower (legs, ladder, seat, a red flag)
//   drawCloud(ctx, x, y, px, t, rain)                    a grey pixel rain cloud with falling drops
//   drawBubble / drawTear / drawSweat / drawPixelHeart / drawTissue      the small stuff
// Pure functions of their arguments; nothing touches `document`.
const OUT = '#1a1030'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"

export function bitmap(ctx, rows, pal, x, y, px) {
  rows.forEach((row, j) => { for (let i = 0; i < row.length; i++) { const c = pal[row[i]]; if (c) { ctx.fillStyle = c; ctx.fillRect(Math.round(x + i * px), Math.round(y + j * px), Math.ceil(px), Math.ceil(px)) } } })
}
export const R = (ctx, x, y, w, h, c) => { ctx.fillStyle = c; ctx.fillRect(Math.round(x), Math.round(y), Math.ceil(w), Math.ceil(h)) }

// ─────────────────────────────── the surfboard
export function drawBoard(ctx, x, y, len, { rot = 0, col = '#ff9a3c', stripe = '#fff1c8', alpha = 1 } = {}) {
  if (alpha <= 0) return
  const px = Math.max(3, Math.round(len / 34)), n = Math.round(len / px), hh = 3
  ctx.save(); ctx.globalAlpha *= alpha; ctx.translate(x, y); ctx.rotate(rot)
  for (let i = 0; i < n; i++) {
    const u = (i / (n - 1)) * 2 - 1                      // −1 … 1 along the board
    const th = Math.max(1, Math.round(hh * Math.sqrt(Math.max(0, 1 - Math.pow(Math.abs(u), u > 0 ? 2.2 : 4)))))
    const X = -len / 2 + i * px
    R(ctx, X, -th * px - px, px, (2 * th + 2) * px, OUT)
  }
  for (let i = 1; i < n - 1; i++) {
    const u = (i / (n - 1)) * 2 - 1
    const th = Math.max(1, Math.round(hh * Math.sqrt(Math.max(0, 1 - Math.pow(Math.abs(u), u > 0 ? 2.2 : 4))))) - 1
    if (th < 1) continue
    const X = -len / 2 + i * px
    R(ctx, X, -th * px, px, 2 * th * px, col)
    R(ctx, X, -th * px, px, px, 'rgba(255,255,255,0.35)')
    if (Math.abs(u) < 0.8) R(ctx, X, -px * 0.5, px, px, stripe)
  }
  ctx.restore()
}

// ─────────────────────────────── shades, lei, seaweed
export function drawShades(ctx, x, y, size, { rot = 0, alpha = 1 } = {}) {
  if (alpha <= 0) return
  const px = Math.max(2, Math.round(size / 36))
  ctx.save(); ctx.globalAlpha *= alpha; ctx.translate(x, y + size * 0.03); ctx.rotate(rot)
  bitmap(ctx, [
    'OOOOOOOOOOOOOOOOOO',
    'OSSSSSOOOOOOSSSSSO',
    'OSWSSSO....OSWSSSO',
    'OSSSSSO....OSSSSSO',
    '.OSSSO......OSSSO.',
    '..OOO........OOO..',
  ], { O: OUT, S: '#2b2350', W: '#9fe4ff' }, -9 * px, -3 * px, px)
  ctx.restore()
}
export function drawLei(ctx, x, y, size) {
  const px = Math.max(3, Math.round(size / 40)), cols = ['#ff6fa8', '#ffd23f', '#ff9a3c', '#c9a6ff', '#7dffb0']
  for (let i = 0; i < 9; i++) {
    const a = Math.PI * (0.12 + 0.76 * i / 8), fx = x - Math.cos(a) * size * 0.27, fy = y + size * 0.08 + Math.sin(a) * size * 0.1
    bitmap(ctx, ['.X.', 'XYX', '.X.'], { X: cols[i % cols.length], Y: '#fff6c8' }, fx - 1.5 * px, fy - 1.5 * px, px)
  }
}
export function drawSeaweed(ctx, x, y, px, t = 0) {
  bitmap(ctx, [
    '..G....G.....',
    '.GG...GDG..G.',
    '.GDG.GGDGGGD.',
    'GGDGGGDDGGDG.',
    'GDDGGDGGDGDGG',
    '.G.GD.G.GD.G.',
    '.G..D...G..G.',
    '....G......D.',
  ], { G: '#3fbf6a', D: '#1f7a45' }, x - 6.5 * px, y - 7 * px, px)
  const k = (t * 1.4) % 1
  R(ctx, x - 4 * px, y + px + k * 10 * px, px, px * 1.5, '#7fd6ff')
  R(ctx, x + 3 * px, y + px + ((k + 0.5) % 1) * 10 * px, px, px * 1.5, '#7fd6ff')
}
export function drawStopSign(ctx, x, y, px, rot = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot)
  R(ctx, -px * 0.5, -14 * px, px, 14 * px, '#c8c0dc')
  bitmap(ctx, [
    '...OOOOO...',
    '..ORRRRRO..',
    '.ORRRRRRRO.',
    'ORRRRRRRRRO',
    'ORRRRRRRRRO',
    'ORRRRRRRRRO',
    'ORRRRRRRRRO',
    '.ORRRRRRRO.',
    '..ORRRRRO..',
    '...OOOOO...',
  ], { O: '#ffffff', R: '#e0303f' }, -5.5 * px, -23 * px, px)
  ctx.fillStyle = '#ffffff'; ctx.font = `800 ${Math.round(px * 3.2)}px ${INTER}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  ctx.fillText('STOP', 0, -18 * px)
  ctx.restore()
}

// ─────────────────────────────── the judge's score paddle
export function drawScore(ctx, x, y, text, k = 1, { rot = 0, col = '#1b1236', w = 150, h = 108 } = {}) {
  if (k <= 0.02) return
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(k, k)
  R(ctx, -5, h / 2 - 4, 10, 70, '#a77b4f'); R(ctx, -5, h / 2 - 4, 3, 70, '#c99b6a')
  R(ctx, -w / 2 - 6, -h / 2, w + 12, h, OUT); R(ctx, -w / 2, -h / 2 - 6, w, h + 12, OUT)
  R(ctx, -w / 2, -h / 2, w, h, '#fffaf0'); R(ctx, -w / 2, h / 2 - 12, w, 12, '#e3dccb')
  ctx.fillStyle = col; ctx.font = `800 ${Math.round(h * 0.6)}px ${INTER}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  ctx.fillText(text, 0, -2)
  ctx.restore()
}

// ─────────────────────────────── the lifeguard tower
export function drawTower(ctx, x, base, seat) {
  const W_ = '#e8e0cf', D = '#a89e8a'
  // legs (splayed) and cross bars
  for (const s of [-1, 1]) for (let y = seat; y < base; y += 8) { const k = (y - seat) / (base - seat); R(ctx, x + s * (44 + 26 * k) - 6, y, 12, 8, s < 0 ? W_ : D) }
  for (const yy of [seat + (base - seat) * 0.35, seat + (base - seat) * 0.72]) R(ctx, x - 56, yy, 112, 8, D)
  // the seat box + a backrest
  R(ctx, x - 70, seat - 10, 140, 22, OUT); R(ctx, x - 66, seat - 6, 132, 14, '#e0303f'); R(ctx, x - 66, seat - 6, 132, 4, '#ff7a85')
  // a red flag on a pole
  R(ctx, x + 62, seat - 150, 6, 150, '#c8c0dc')
  bitmap(ctx, ['RRRRRR..', 'RRRRRRRR', 'RRRRRR..', 'RRRR....'], { R: '#ff4f5e' }, x + 68, seat - 150, 7)
}

// ─────────────────────────────── the rain cloud
export function drawCloud(ctx, x, y, px, t, rain = 1, alpha = 1) {
  if (alpha <= 0) return
  ctx.save(); ctx.globalAlpha *= alpha
  if (rain > 0) {
    for (let i = 0; i < 9; i++) {
      const ph = (t * 1.7 + i * 0.37) % 1
      ctx.globalAlpha = alpha * rain * (1 - ph)
      R(ctx, x + (i - 4) * px * 2.3, y + 3 * px + ph * 26 * px, px * 0.6, px * 1.8, '#8fc4ff')
    }
    ctx.globalAlpha = alpha
  }
  bitmap(ctx, [
    '.....OOOO.......',
    '...OOGGGGOO.OO..',
    '..OGGGLLGGGOGGO.',
    '.OGGLLLGGGGGGGGO',
    'OGGGGGGGGGGGGGGO',
    'OGGGGGGGGGGGGGDO',
    '.ODDDDDDDDDDDDO.',
    '..OOOOOOOOOOOO..',
  ], { O: OUT, G: '#7d7a98', L: '#a9a6c4', D: '#5b587a' }, x - 8 * px, y - 4 * px, px)
  ctx.restore()
}

// ─────────────────────────────── the small stuff
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
export function drawTissue(ctx, x, y, px, t) {
  const f = Math.floor(t * 6) % 2
  bitmap(ctx, f ? ['..OOOO.', '.OWWWWO', 'OWWSWWO', 'OWWWWO.', '.OOOO..'] : ['.OOOO..', 'OWWWWO.', 'OWWSWWO', '.OWWWWO', '..OOOO.'], { O: '#5a5478', W: '#ffffff', S: '#dcd6ee' }, x - 3.5 * px, y - 2.5 * px, px)
}
