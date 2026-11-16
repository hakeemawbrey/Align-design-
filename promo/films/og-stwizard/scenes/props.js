// stwizard props: small pixel drawings on canvas (Star Talk Wild #24, "Potion Class."). One art pixel = px screen px.
//   bitmap(ctx, rows, pal, x, y, px)                 rows of chars → pixels; (x, y) = top-left; '.' = empty
//   drawWizHat(ctx, x, y, px, { color, light, band, rot })   a pointy wizard hat; (x, y) = the middle of the brim's bottom
//   drawWand(ctx, x, y, px, rot)                      a wand; (x, y) = the grip end, rot = direction of the tip
//   drawCauldron(ctx, cx, by, px, t, { liq })        the class cauldron on little legs, flames under it; by = floor y
//   drawBottle(ctx, x, y, px, rot)                    a round potion flask (pink), cork up; (x, y) = its centre
//   drawJar(ctx, x, y, px, t)                         a jar of moonlight (glowing); (x, y) = its centre
//   drawPetal(ctx, x, y, px, rot)                     a rose petal
//   drawGoblet(ctx, x, y, px, liq)                    a goblet; (x, y) = its base centre
//   drawChair(ctx, x, by, px)                         an ordinary wooden chair, front view; (x, by) = bottom centre
//   drawChalkboard(ctx, cx, cy, w, h)                 the board (frame + slate + chalk tray)
//   drawDesk(ctx, cx, y, w, h, { books })             a teacher's / student's desk; (cx, y) = top centre
//   drawSaturn(ctx, x, y, c, t, opts)                 PROFESSOR SATURN: a ringed pixel planet with a beard, half-moon
//                                                     glasses and a wizard hat; c = cell px
//   drawBell(ctx, x, y, px, rot)                      a hand bell; (x, y) = the top of the handle
//   drawBubble / drawTear / drawSweat / drawPixelHeart / drawTissue / drawPuff    the small stuff
// Pure functions of their arguments; nothing touches `document`.
const OUT = '#1a1030'

export function bitmap(ctx, rows, pal, x, y, px) {
  rows.forEach((row, j) => { for (let i = 0; i < row.length; i++) { const c = pal[row[i]]; if (c) { ctx.fillStyle = c; ctx.fillRect(Math.round(x + i * px), Math.round(y + j * px), Math.ceil(px), Math.ceil(px)) } } })
}
const R = (ctx, x, y, w, h, c) => { ctx.fillStyle = c; ctx.fillRect(Math.round(x), Math.round(y), Math.ceil(w), Math.ceil(h)) }

// ─────────────────────────────── hats, wands
const HAT = [
  '.........DD......',
  '........DLD......',
  '.......DHLD......',
  '.......DHHD......',
  '......DHHHHD.....',
  '......DHHSHD.....',
  '.....DHHSSSHD....',
  '.....DHHHSHHD....',
  '....DHHHHHHHHD...',
  '....DHHHHHHHHD...',
  '...DBBBBBBBBBBD..',
  '.DDDDDDDDDDDDDDD.',
  'DHHHHHHHHHHHHHHHD',
  '.DDDDDDDDDDDDDDD.',
]
export function drawWizHat(ctx, x, y, px, { color = '#6a45d6', light = '#9d7cff', band = '#ffd23f', rot = 0, alpha = 1 } = {}) {
  if (alpha <= 0) return
  ctx.save(); ctx.globalAlpha *= alpha; ctx.translate(x, y); ctx.rotate(rot)
  bitmap(ctx, HAT, { D: OUT, H: color, L: light, S: '#ffd23f', B: band }, -8.5 * px, -14 * px, px)
  ctx.restore()
}
export function drawWand(ctx, x, y, px, rot = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot)
  R(ctx, -px, -px * 1.5, px * 15, px * 3, OUT)
  R(ctx, 0, -px * 0.5, px * 4, px, '#5a2e12'); R(ctx, px * 4, -px * 0.5, px * 9, px, '#8a4a20')
  R(ctx, px * 12, -px * 1.5, px * 3, px * 3, OUT); R(ctx, px * 12.5, -px, px * 2, px * 2, '#fff6d0')
  ctx.restore()
}

// ─────────────────────────────── the cauldron
const POT_W = 15                       // half-width in cells
function potHW(j) {                    // body half-width for row j (0 = just under the rim)
  const u = (j - 5) / 9
  return Math.max(4, Math.round(POT_W * Math.sqrt(Math.max(0, 1 - u * u * 0.85))))
}
export function drawCauldron(ctx, cx, by, px, t, { liq = '#5fd38a', liqHi = '#b6ffcf', alpha = 1 } = {}) {
  if (alpha <= 0) return
  ctx.save(); ctx.globalAlpha *= alpha
  const H = 15, top = by - (H + 6) * px
  // flames under it
  for (let k = 0; k < 5; k++) {
    const fx = cx + (k - 2) * 4.2 * px, fl = 4 + ((Math.floor(t * 9 + k * 3) % 3)), w = 3
    R(ctx, fx - w * px / 2, by - fl * px, w * px, fl * px, '#ff6a2a')
    R(ctx, fx - px / 2, by - (fl - 1.5) * px, px, (fl - 1.5) * px, '#ffd23f')
  }
  // legs
  R(ctx, cx - 11 * px, by - 4 * px, 3 * px, 4 * px, OUT); R(ctx, cx + 8 * px, by - 4 * px, 3 * px, 4 * px, OUT)
  // body
  for (let j = 0; j < H; j++) {
    const hw = potHW(j), y = top + (j + 3) * px
    R(ctx, cx - (hw + 1) * px, y, (2 * hw + 2) * px, px, OUT)
    R(ctx, cx - hw * px, y, 2 * hw * px, px, '#2c2148')
    R(ctx, cx - (hw - 2) * px, y, 2 * px, px, '#4d3f78')
    R(ctx, cx + (hw - 4) * px, y, 3 * px, px, '#1f1735')
  }
  R(ctx, cx - (potHW(H - 1) - 1) * px, top + (H + 3) * px, (2 * potHW(H - 1) - 2) * px, px, OUT)
  // rim + liquid
  R(ctx, cx - (POT_W + 2) * px, top, (2 * POT_W + 4) * px, 4 * px, OUT)
  R(ctx, cx - (POT_W + 1) * px, top + px, (2 * POT_W + 2) * px, 2 * px, '#4d3f78')
  R(ctx, cx - (POT_W - 1) * px, top - px, (2 * POT_W - 2) * px, 2 * px, liq)
  R(ctx, cx - (POT_W - 4) * px, top - 2 * px, (2 * POT_W - 8) * px, px, liq)
  for (let k = 0; k < 4; k++) R(ctx, cx + (-11 + k * 6 + Math.round(Math.sin(t * 3 + k) * 1.5)) * px, top - 2 * px, 2 * px, px, liqHi)
  ctx.restore()
}

// ─────────────────────────────── bottles, jars, petals, goblet
export function drawBottle(ctx, x, y, px, rot = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot)
  bitmap(ctx, [
    '....CCC....',
    '....CCC....',
    '...OOOOO...',
    '....OGO....',
    '....OGO....',
    '..OOOGOOO..',
    '.OGGGGGGGO.',
    'OGWPPPPPPGO',
    'OGWPPPPPPGO',
    'OGPPPPPPPGO',
    'OGPPPPPPPGO',
    '.OPPPPPPPO.',
    '..OOOOOOO..',
  ], { O: OUT, G: '#d8ecff', P: '#ff5fb0', W: '#ffd0e8', C: '#b07a3a' }, -5.5 * px, -6.5 * px, px)
  ctx.restore()
}
export function drawJar(ctx, x, y, px, t) {
  const g = 0.7 + 0.3 * Math.sin(t * 6)
  ctx.save(); ctx.globalAlpha *= 0.35 * g; ctx.fillStyle = '#cfe6ff'; ctx.beginPath(); ctx.arc(x, y, px * 9, 0, Math.PI * 2); ctx.fill(); ctx.restore()
  bitmap(ctx, [
    '.OOOOOOO.',
    '.OLLLLLO.',
    'OOOOOOOOO',
    'OGMMMMMGO',
    'OGMWMMMGO',
    'OGMMMMWGO',
    'OGMMMMMGO',
    '.OOOOOOO.',
  ], { O: OUT, L: '#b07a3a', G: '#d8ecff', M: '#eaf4ff', W: '#ffffff' }, x - 4.5 * px, y - 4 * px, px)
}
export function drawPetal(ctx, x, y, px, rot = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot)
  bitmap(ctx, ['.OOO.', 'ORRRO', 'ORWRO', 'ORRRO', '.ORO.', '..O..'], { O: '#5a0f22', R: '#ff3d6e', W: '#ff9ab5' }, -2.5 * px, -3 * px, px)
  ctx.restore()
}
export function drawGoblet(ctx, x, y, px, liq = '#ff5fb0') {
  bitmap(ctx, [
    'OOOOOOOOO',
    'OLLLLLLLO',
    'OGPPPPPGO',
    'OGPPPPPGO',
    '.OGGGGGO.',
    '..OOGOO..',
    '...OGO...',
    '...OGO...',
    '..OOGOO..',
    '.OGGGGGO.',
    'OOOOOOOOO',
  ], { O: OUT, G: '#ffd23f', P: liq, L: '#ffd0e8' }, x - 4.5 * px, y - 11 * px, px)
}

// ─────────────────────────────── the chair
const CHAIR = [
  'OOOOOOOOOOOOOO',
  'OLLLLLLLLLLLLO',
  'OwwwwwwwwwwwwO',
  'OOOOOOOOOOOOOO',
  'OwO........OwO',
  'OwO........OwO',
  'OOOOOOOOOOOOOO',
  'OwwwwwwwwwwwwO',
  'OOOOOOOOOOOOOO',
  'OwO........OwO',
  'OwO........OwO',
  'OOOOOOOOOOOOOO',
  'OLLLLLLLLLLLLO',
  'OLLLLLLLLLLLLO',
  'OwwwwwwwwwwwwO',
  'OOOOOOOOOOOOOO',
  'OwOOdO..OdOOwO',
  'OwOOdO..OdOOwO',
  'OwO.OO..OO.OwO',
  'OwO........OwO',
  'OwO........OwO',
  'OwO........OwO',
  'OOO........OOO',
]
export function drawChair(ctx, x, by, px, { rot = 0, alpha = 1 } = {}) {
  if (alpha <= 0) return
  ctx.save(); ctx.globalAlpha *= alpha; ctx.translate(x, by); ctx.rotate(rot)
  bitmap(ctx, CHAIR, { O: '#3a1f10', w: '#a8642e', L: '#d58d4a', d: '#6e3d1a' }, -7 * px, -23 * px, px)
  ctx.restore()
}

// ─────────────────────────────── classroom
export function drawChalkboard(ctx, cx, cy, w, h) {
  const L = cx - w / 2, T = cy - h / 2
  R(ctx, L - 14, T - 14, w + 28, h + 28, OUT)
  R(ctx, L - 10, T - 10, w + 20, h + 20, '#8a5228'); R(ctx, L - 10, T - 10, w + 20, 5, '#b8743c')
  R(ctx, L, T, w, h, OUT); R(ctx, L + 4, T + 4, w - 8, h - 8, '#1f4a3a')
  ctx.fillStyle = 'rgba(255,255,255,0.05)'
  for (let k = 0; k < 6; k++) ctx.fillRect(L + 30 + k * 97, T + 20 + (k % 3) * 40, 60, 6)
  R(ctx, L - 6, T + h + 8, w + 12, 12, '#6e3d1a'); R(ctx, L + 60, T + h + 2, 30, 8, '#fffaf0'); R(ctx, L + 110, T + h + 2, 22, 8, '#ff9ab5')
}
export function drawDesk(ctx, cx, y, w, h, { books = false } = {}) {
  if (books) {
    const bx = cx - w / 2 + 30
    R(ctx, bx - 3, y - 51, 96, 54, OUT)
    R(ctx, bx, y - 48, 90, 14, '#c0392b'); R(ctx, bx + 6, y - 32, 80, 14, '#2e86de'); R(ctx, bx - 2, y - 16, 92, 14, '#27ae60')
    R(ctx, bx + 10, y - 44, 30, 4, '#ffd23f'); R(ctx, bx + 16, y - 28, 30, 4, '#ffd23f')
  }
  R(ctx, cx - w / 2 - 4, y - 4, w + 8, h + 8, OUT)
  R(ctx, cx - w / 2, y, w, h, '#7a4524'); R(ctx, cx - w / 2, y, w, 10, '#b06a36'); R(ctx, cx - w / 2, y + h - 8, w, 8, '#5a3018')
}

// ─────────────────────────────── Professor Saturn
const SAT_BAND = ['#f6e1ad', '#ecc985', '#dcaa62', '#ecc985', '#f6e1ad', '#d39b55', '#ecc985']
const Z = ['XXX', '..X', '.X.', 'X..', 'XXX']
/** opts: eyes 'sleep' | 'open' | 'wide' | 'happy', look [-1..1, -1..1], mouth 'snore' | 'flat' | 'o' | 'smile',
 *  spin (ring stripe phase), brows (lift 0..1), zzz (bool) */
export function drawSaturn(ctx, x, y, c, t, { eyes = 'open', look = [0, 0], mouth = 'flat', spin = 0, brows = 0, zzz = false, alpha = 1, hatRot = -0.12 } = {}) {
  if (alpha <= 0) return
  const rc = 14
  ctx.save(); ctx.globalAlpha *= alpha
  const cell = (i, j, col) => R(ctx, x + i * c - c / 2, y + j * c - c / 2, c, c, col)
  // the ring: sampled pixels on three ellipses, tilted; back half first
  const tilt = -0.22, ry0 = 4
  const ringPts = []
  for (const [k, rr] of [[0, 1.72], [1, 1.86], [2, 2.0]].map(([a, b]) => [a, b])) {
    const N = 150
    for (let n = 0; n < N; n++) {
      const a = n / N * Math.PI * 2
      const ex = Math.cos(a) * rc * rr, ey = Math.sin(a) * rc * rr * 0.26
      const qx = Math.round(ex * Math.cos(tilt) - ey * Math.sin(tilt)), qy = Math.round(ex * Math.sin(tilt) + ey * Math.cos(tilt) + ry0)
      const stripe = (Math.floor((a + spin) * 6 / Math.PI) % 2 + 2) % 2
      const col = k === 1 ? (stripe ? '#c9a6ff' : '#a98ae6') : k === 0 ? '#e8d6ff' : '#7a5fc4'
      ringPts.push([qx, qy, col, Math.sin(a) < 0])
    }
  }
  for (const [i, j, col, back] of ringPts) if (back) cell(i, j, col)
  // the body
  for (let j = -rc; j <= rc; j++) for (let i = -rc; i <= rc; i++) {
    const d = i * i + j * j
    if (d > rc * rc + rc * 0.6) continue
    const edge = (i + 1) ** 2 + j * j > rc * rc + rc * 0.6 || (i - 1) ** 2 + j * j > rc * rc + rc * 0.6 || i * i + (j + 1) ** 2 > rc * rc + rc * 0.6 || i * i + (j - 1) ** 2 > rc * rc + rc * 0.6
    let col = edge ? '#3a2412' : SAT_BAND[Math.floor((j + rc + Math.round(Math.sin(i * 0.4) * 0.6)) / 4) % SAT_BAND.length]
    if (!edge && i + j > rc * 0.95) col = '#c08844'
    if (!edge && i + j < -rc * 1.05 && (i + j) % 3 === 0) col = '#fff4cf'
    cell(i, j, col)
  }
  // brows
  const by = -7 - Math.round(brows * 2)
  for (const s of [-1, 1]) for (let k = 0; k < 4; k++) cell(s * (3 + k), by + (k === 3 ? 1 : 0), '#fbf8ff')
  // eyes
  const lx = Math.round(look[0]), ly = Math.round(look[1])
  for (const s of [-1, 1]) {
    const ex = s * 5
    if (eyes === 'sleep') { for (let k = -1; k <= 1; k++) cell(ex + k, -2, '#1b1236') }
    else if (eyes === 'happy') { cell(ex - 1, -2, '#1b1236'); cell(ex, -3, '#1b1236'); cell(ex + 1, -2, '#1b1236') }
    else if (eyes === 'wide') {
      for (let a = -1; a <= 1; a++) for (let b = -1; b <= 1; b++) cell(ex + a, -3 + b, '#ffffff')
      cell(ex + lx, -3 + ly, '#1b1236')
    } else { cell(ex + lx, -3 + ly, '#1b1236'); cell(ex + lx, -2 + ly, '#1b1236') }
  }
  // half-moon glasses: the lower halves of two rims + a bridge
  for (const s of [-1, 1]) {
    const gx = s * 5
    for (let k = -2; k <= 2; k++) cell(gx + k, 0, '#ffd23f')
    cell(gx - 3, -1, '#ffd23f'); cell(gx + 3, -1, '#ffd23f')
  }
  cell(-1, -1, '#ffd23f'); cell(0, -1, '#ffd23f'); cell(1, -1, '#ffd23f')
  // the front half of the ring
  for (const [i, j, col, back] of ringPts) if (!back) cell(i, j, col)
  // mustache + beard (hangs over the ring)
  for (let j = 2; j <= rc + 9; j++) {
    const hw = j < 4 ? 6 : Math.max(0, Math.round(6.5 - (j - 4) * 0.33))
    for (let i = -hw; i <= hw; i++) cell(i, j, Math.abs(i) === hw ? '#bdb3db' : (i + j) % 5 === 0 ? '#e1dbf2' : '#fbf8ff')
  }
  if (mouth === 'o' || mouth === 'snore') { const big = mouth === 'snore' ? (Math.sin(t * 3.2) > 0 ? 1 : 0) : 1; cell(0, 4, '#5a1a2a'); if (big) { cell(-1, 4, '#5a1a2a'); cell(0, 5, '#5a1a2a'); cell(-1, 5, '#5a1a2a') } }
  else if (mouth === 'smile') { cell(-2, 4, '#5a1a2a'); cell(-1, 5, '#5a1a2a'); cell(0, 5, '#5a1a2a'); cell(1, 5, '#5a1a2a'); cell(2, 4, '#5a1a2a') }
  else { for (let k = -1; k <= 1; k++) cell(k, 4, '#5a1a2a') }
  ctx.restore()
  // the hat, on top
  drawWizHat(ctx, x + 2 * c, y - rc * c + 4 * c, c * 1.15, { color: '#3d2a8a', light: '#6a52c8', band: '#ffd23f', rot: hatRot, alpha })
  if (zzz) {
    ctx.save(); ctx.globalAlpha *= alpha
    for (let k = 0; k < 3; k++) {
      const ph = ((t * 0.45 + k / 3) % 1), zc = Math.max(2, Math.round(c * (0.8 + 0.7 * ph)))
      const zx = Math.round(x + rc * c * (0.9 + 0.5 * ph) + Math.sin(ph * 6 + k) * c), zy = Math.round(y - rc * c * (0.5 + 0.9 * ph))
      ctx.globalAlpha = alpha * Math.sin(Math.PI * ph) * 0.95; ctx.fillStyle = '#efe6d6'
      Z.forEach((row, j) => [...row].forEach((ch, i) => { if (ch === 'X') ctx.fillRect(zx + i * zc, zy + j * zc, zc, zc) }))
    }
    ctx.restore()
  }
}

export function drawBell(ctx, x, y, px, rot = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot)
  bitmap(ctx, [
    '...OOO...',
    '...OwO...',
    '...OwO...',
    '...OOO...',
    '..OGGGO..',
    '.OGLGGGO.',
    '.OGLGGGO.',
    '.OGGGGGO.',
    'OGGGGGGGO',
    'OOOOOOOOO',
    '...OGO...',
  ], { O: OUT, w: '#8a4a20', G: '#ffcf3f', L: '#fff2a6' }, -4.5 * px, 0, px)
  ctx.restore()
}

// ─────────────────────────────── small stuff
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
  for (let k = 0; k < 4; k++) { const ty = tail === 'down' ? y + h + k * px : y - (k + 1) * px; R(ctx, tx - (4 - k) * px * 0.5 - px, ty - (tail === 'down' ? px : 0), (4 - k) * px + 2 * px, px * 2, OUT) }
  for (let k = 0; k < 3; k++) { const ty = tail === 'down' ? y + h - px + k * px : y - k * px; R(ctx, tx - (3 - k) * px * 0.5, ty, (3 - k) * px, px, fill) }
  step(0, fill)
  ctx.restore()
}
export function drawTear(ctx, x, y, px) { bitmap(ctx, ['.T.', 'TWT', 'TTT', '.T.'], { T: '#6fd3ff', W: '#e6f8ff' }, x - 1.5 * px, y - 2 * px, px) }
export function drawSweat(ctx, x, y, px) { bitmap(ctx, ['..O..', '.OSO.', '.OSO.', 'OSWSO', 'OSSSO', '.OOO.'], { O: '#1f3a6e', S: '#7fd6ff', W: '#ffffff' }, x - 2.5 * px, y - 3 * px, px) }
export function drawPixelHeart(ctx, x, y, px, col = '#ff4f7e') { bitmap(ctx, ['.XX.XX.', 'XWXXXXX', 'XXXXXXX', '.XXXXX.', '..XXX..', '...X...'], { X: col, W: '#ffd0dc' }, x - 3.5 * px, y - 3 * px, px) }
export function drawTissue(ctx, x, y, px, t) {
  const f = Math.floor(t * 6) % 2
  bitmap(ctx, f ? ['..OOOO.', '.OWWWWO', 'OWWSWWO', 'OWWWWO.', '.OOOO..'] : ['.OOOO..', 'OWWWWO.', 'OWWSWWO', '.OWWWWO', '..OOOO.'], { O: '#5a5478', W: '#ffffff', S: '#dcd6ee' }, x - 3.5 * px, y - 2.5 * px, px)
}
/** a soft round smoke puff */
export function drawPuff(ctx, x, y, r, col = '#ffb3d9', alpha = 1) {
  if (alpha <= 0 || r <= 0) return
  ctx.save(); ctx.globalAlpha *= alpha; ctx.fillStyle = col
  for (const [dx, dy, s] of [[0, 0, 1], [-0.7, 0.25, 0.7], [0.7, 0.2, 0.75], [-0.3, -0.5, 0.65], [0.35, -0.45, 0.6]]) { ctx.beginPath(); ctx.arc(x + dx * r, y + dy * r, r * s, 0, Math.PI * 2); ctx.fill() }
  ctx.restore()
}
