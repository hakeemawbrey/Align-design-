// props.js: this film's pixel props and little drawn objects (a private copy per film folder; signs3kit look).
// Every helper is pure f(t): (x = 2d context, cx, cy, k = pop scale 0…1, …). Coordinates are the kit's 1080×1920 space.
import { clamp, ease } from '../../../src/lib.js'
import { drawBits, signChar, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'

export const RED = '#e23d4e', CREAM = '#fff4e2', WOOD = '#c98f2a', GREEN = '#5fd068', ORANGE = '#ffb34a', VIOLET = '#b98cff', DARK = '#2a2350', NIGHT = '#140c30'

const shadowBox = (x, l, t, w, h) => { x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(l + 10, t + 12, w, h) }
const inkBox = (x, l, t, w, h, col, b = 8) => { x.fillStyle = INK; x.fillRect(l - b, t - b, w + 2 * b, h + 2 * b); x.fillStyle = col; x.fillRect(l, t, w, h) }
const txt = (x, s, X, Y, font, col = INK, align = 'center') => { x.font = font; x.fillStyle = col; x.textAlign = align; x.textBaseline = 'middle'; x.fillText(s, X, Y) }

/** a phone, face up: a coloured header and up to five message pills [text, colour, k] */
export function phone(x, cx, cy, k, { head = '', headCol = MINT, lines = [], rot = 0.05, dim = 0, size = 26 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  shadowBox(x, -134, -204, 268, 408)
  inkBox(x, -124, -194, 248, 388, DARK, 10)
  x.fillStyle = NIGHT; x.fillRect(-112, -170, 224, 340)
  if (head) { x.fillStyle = headCol; x.fillRect(-100, -156, 200, 46); txt(x, head, 0, -132, `700 22px ${MONO}`) }
  const gap = lines.length > 3 ? 54 : 66
  lines.forEach(([s, col, kk], i) => {
    if (kk <= 0.01) return
    x.save(); x.translate(i % 2 ? 14 : -14, -66 + i * gap); x.scale(kk, kk)
    x.font = `800 ${size}px ${INTER}`; const w = Math.min(214, x.measureText(s).width + 30)
    x.fillStyle = col; x.fillRect(-w / 2, -22, w, 44); txt(x, s, 0, 2, `800 ${size}px ${INTER}`)
    x.restore()
  })
  if (dim > 0.01) { x.fillStyle = `rgba(6,4,18,${(0.7 * dim).toFixed(3)})`; x.fillRect(-112, -170, 224, 340) }
  x.fillStyle = '#6b62a8'; x.fillRect(-30, 176, 60, 8)
  x.restore()
}

/** a paper note / list: a title and lines; ticks: how many lines are ticked (fractional fine), strike: strike them */
export function note(x, cx, cy, k, { title = '', lines = [], ticks = 0, w = 300, bg = CREAM, head = GOLD, rot = 0.04, strike = false, size = 28 } = {}) {
  if (k <= 0.01) return
  const lh = size * 1.75, h = 90 + lines.length * lh
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  shadowBox(x, -w / 2, -h / 2, w, h)
  inkBox(x, -w / 2, -h / 2, w, h, bg, 7)
  x.fillStyle = head; x.fillRect(-w / 2, -h / 2, w, 62)
  txt(x, title, 0, -h / 2 + 32, `800 28px ${INTER}`)
  lines.forEach((s, i) => {
    const y = -h / 2 + 62 + lh * (i + 0.6), on = i < Math.floor(ticks)
    x.strokeStyle = INK; x.lineWidth = 4; x.strokeRect(-w / 2 + 22, y - 14, 28, 28)
    txt(x, s, -w / 2 + 66, y + 1, `700 ${size}px ${INTER}`, on && strike ? '#8a7f6a' : INK, 'left')
    if (on) {
      x.strokeStyle = GREEN; x.lineWidth = 7; x.beginPath(); x.moveTo(-w / 2 + 24, y); x.lineTo(-w / 2 + 34, y + 12); x.lineTo(-w / 2 + 54, y - 18); x.stroke()
      if (strike) { x.strokeStyle = INK; x.lineWidth = 3; x.beginPath(); x.moveTo(-w / 2 + 62, y + 2); x.lineTo(-w / 2 + 66 + x.measureText(s).width, y + 2); x.stroke() }
    }
  })
  x.restore()
}

/** a framed board (whiteboard / sign / tv / chart): fn(x) draws the inside in local coords */
export function board(x, cx, cy, k, { w = 340, h = 240, frame = '#c9c9d8', bg = '#f4f2ff', rot = -0.03, legs = false } = {}, fn) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  if (legs) { x.fillStyle = INK; x.fillRect(-w / 2 + 30, h / 2, 14, 110); x.fillRect(w / 2 - 44, h / 2, 14, 110) }
  shadowBox(x, -w / 2, -h / 2, w, h)
  inkBox(x, -w / 2 - 12, -h / 2 - 12, w + 24, h + 24, frame, 6)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  if (fn) { x.save(); x.beginPath(); x.rect(-w / 2, -h / 2, w, h); x.clip(); fn(x); x.restore() }
  x.restore()
}

/** a round clock face; hours/minutes as numbers */
export function clock(x, cx, cy, k, h, m, { r = 110, face = CREAM, rim = GOLD } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.beginPath(); x.arc(8, 10, r + 12, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 12, 0, Math.PI * 2); x.fill()
  x.fillStyle = rim; x.beginPath(); x.arc(0, 0, r + 6, 0, Math.PI * 2); x.fill()
  x.fillStyle = face; x.beginPath(); x.arc(0, 0, r - 4, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; x.fillRect(Math.cos(a) * (r - 22) - 5, Math.sin(a) * (r - 22) - 5, 10, 10) }
  const hand = (a, len, w) => { x.save(); x.rotate(a); x.fillStyle = INK; x.fillRect(-w / 2, -len, w, len + 8); x.restore() }
  hand(((h % 12) + m / 60) / 12 * Math.PI * 2, r * 0.5, 12); hand(m / 60 * Math.PI * 2, r * 0.78, 8)
  x.fillStyle = RED; x.beginPath(); x.arc(0, 0, 10, 0, Math.PI * 2); x.fill()
  x.restore()
}

/** paper confetti falling around (cx, cy) from t0 */
export function confetti(x, t, cx, cy, t0, { n = 22, spread = 340, h = 520 } = {}) {
  const lt = t - t0
  if (lt <= 0) return
  const COLS = [GOLD, PINK, MINT, SKYB, ORANGE, LAV]
  for (let i = 0; i < n; i++) {
    const ph = (lt * 0.55 + i * 0.137) % 1
    const px = cx + Math.sin(i * 2.71) * spread + Math.sin(t * 2 + i) * 18, py = cy - h / 2 + ph * h
    x.save(); x.translate(px, py); x.rotate(t * 3 + i); x.globalAlpha = Math.sin(Math.PI * ph)
    x.fillStyle = COLS[i % COLS.length]; x.fillRect(-9, -5, 18, 10); x.restore()
  }
}

/** sleepy z's drifting up */
export function zzz(x, t, cx, cy, { col = LAV, size = 54, alpha = 1 } = {}) {
  for (let i = 0; i < 3; i++) {
    const ph = ((t * 0.5 + i / 3) % 1 + 1) % 1
    x.save(); x.globalAlpha = alpha * Math.sin(Math.PI * ph)
    txt(x, 'z', cx + i * 26 + Math.sin(ph * 6) * 10, cy - ph * 160, `800 ${Math.round(size * (0.6 + 0.4 * ph))}px ${INTER}`, col)
    x.restore()
  }
}

/** a ringed planet (Saturn-style): body + tilted ring */
export function ringed(x, cx, cy, r, k, { body = '#ffcf7a', band = '#e0a24a', ring = BONE, tilt = -0.35 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(tilt)
  x.strokeStyle = INK; x.lineWidth = 18; x.beginPath(); x.ellipse(0, 0, r * 1.75, r * 0.45, 0, Math.PI, Math.PI * 2); x.stroke()
  x.strokeStyle = ring; x.lineWidth = 9; x.beginPath(); x.ellipse(0, 0, r * 1.75, r * 0.45, 0, Math.PI, Math.PI * 2); x.stroke()
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 6, 0, Math.PI * 2); x.fill()
  x.fillStyle = body; x.beginPath(); x.arc(0, 0, r, 0, Math.PI * 2); x.fill()
  x.save(); x.beginPath(); x.arc(0, 0, r, 0, Math.PI * 2); x.clip(); x.fillStyle = band; x.fillRect(-r, -r * 0.25, 2 * r, r * 0.22); x.fillRect(-r, r * 0.25, 2 * r, r * 0.14); x.restore()
  x.strokeStyle = INK; x.lineWidth = 18; x.beginPath(); x.ellipse(0, 0, r * 1.75, r * 0.45, 0, 0, Math.PI); x.stroke()
  x.strokeStyle = ring; x.lineWidth = 9; x.beginPath(); x.ellipse(0, 0, r * 1.75, r * 0.45, 0, 0, Math.PI); x.stroke()
  x.restore()
}
/** a plain round planet / moon with a few craters */
export function planet(x, cx, cy, r, k, { body = '#c9b8a6', crater = '#a8957f', face = null } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 6, 0, Math.PI * 2); x.fill()
  x.fillStyle = body; x.beginPath(); x.arc(0, 0, r, 0, Math.PI * 2); x.fill()
  x.fillStyle = crater; for (const [a, b, c] of [[-0.35, -0.3, 0.18], [0.3, 0.2, 0.13], [-0.1, 0.45, 0.1]]) { x.beginPath(); x.arc(a * r, b * r, c * r, 0, Math.PI * 2); x.fill() }
  if (face) {   // 'sad' or 'shy': two dot eyes and a little mouth
    x.fillStyle = INK; x.fillRect(-r * 0.32, -r * 0.08, r * 0.12, r * 0.16); x.fillRect(r * 0.2, -r * 0.08, r * 0.12, r * 0.16)
    if (face === 'sad') { x.fillRect(-r * 0.16, r * 0.34, r * 0.32, r * 0.08); x.fillRect(-r * 0.22, r * 0.4, r * 0.08, r * 0.08); x.fillRect(r * 0.14, r * 0.4, r * 0.08, r * 0.08) }
    else { x.fillStyle = PINK; x.fillRect(-r * 0.46, r * 0.14, r * 0.18, r * 0.1); x.fillRect(r * 0.28, r * 0.14, r * 0.18, r * 0.1); x.fillStyle = INK; x.fillRect(-r * 0.08, r * 0.3, r * 0.16, r * 0.08) }
  }
  x.restore()
}

// ── pixel bitmaps
export const TELESCOPE = [
  '..........KK',
  '........BBBK',
  '......BBBBB.',
  '....BBBBBB..',
  '..BBBBBBB...',
  'GGBBBBB.....',
  'GGBBB.......',
  '....LL......',
  '...L..L.....',
  '..L....L....',
  '.L......L...',
]
export const TELESCOPE_C = { B: '#7a86b8', K: INK, G: GOLD, L: '#c9c9d8' }
export const MUG = [
  '..s..s....',
  '.s..s.....',
  '..s..s....',
  'MMMMMMM...',
  'MWWWWWMMM.',
  'MWWWWWM.M.',
  'MWWWWWM.M.',
  'MWWWWWMMM.',
  'MWWWWWM...',
  '.MMMMM....',
]
export const MUG_C = { M: PINK, W: '#c98f5a', s: '#ffffff' }
export const BOOK = [
  'RRRRRRRRRRRR',
  'RWWWWWWWWWWR',
  'RWKKKKKKKKWR',
  'RWWWWWWWWWWR',
  'RWKKKKKKWWWR',
  'RWWWWWWWWWWR',
  'RWKKKKKKKKWR',
  'RWWWWWWWWWWR',
  'RRRRRRRRRRRR',
]
export const BOOK_C = { R: VIOLET, W: CREAM, K: '#8a7f9a' }
export const POT = [
  '.TTTTTTTT.',
  'TTTTTTTTTT',
  '.TTTTTTTT.',
  '.TTTTTTTT.',
  '..TTTTTT..',
  '..TTTTTT..',
]
export const POT_C = { T: '#d0703a' }
export const CAT = [
  'K.......K..',
  'KK.....KK..',
  'KKKKKKKKK..',
  'KWKKKKKWK..',
  'KKKKPKKKK..',
  '.KKKKKKK...',
  '.KKKKKKKK..',
  'KKKKKKKKKK.',
  'KKKKKKKKKKK',
  'KKKKKKKKK.K',
  '.KK...KK..K',
]
export const CAT_C = { K: '#6b5a8a', W: '#fff4a8', P: PINK }
export const BIRD = [
  '...GGGG...',
  '..GGGGWG..',
  '..GGGGKGYY',
  '.GGGGGGG..',
  'GGGgggGG..',
  'GGGGgggGG.',
  '.GGGGGGG..',
  '...Y..Y...',
]
export const BIRD_C = { G: '#9aa0b8', g: '#7a8098', W: '#ffffff', K: INK, Y: ORANGE }
export const SNAIL = [
  '.........E.E',
  '..SSSS...E.E',
  '.SSssSS..BBB',
  'SSsSSsSS.BBB',
  'SSsSSsSS.BBB',
  'SSssssSS.BB.',
  '.SSSSSSBBBB.',
  'BBBBBBBBBBB.',
]
export const SNAIL_C = { S: '#e7a04a', s: '#a85f2a', B: '#9ad08a', E: INK }
export const HANGER = [
  '....KK....',
  '...K..K...',
  '......K...',
  '.....K....',
  '....KK....',
  '..KK..KK..',
  'KK......KK',
  'KKKKKKKKKK',
]
export const HANGER_C = { K: '#c9c9d8' }
export const SWEATER = [
  '...SS..SS...',
  'SSSSSSSSSSSS',
  'SSSSSSSSSSSS',
  'SSSSpSSpSSSS',
  'SS.SSSSSS.SS',
  'SS.SpSSpS.SS',
  'SS.SSSSSS.SS',
  'ss.SpSSpS.ss',
  '...SSSSSS...',
  '...ssssss...',
]
export const SWEATER_C = { S: '#ff9ac0', s: '#d06a90', p: CREAM }
export const HAT = [
  '....HHHH....',
  '...HHHHHH...',
  '...HHHHHH...',
  '...BBBBBB...',
  'HHHHHHHHHHHH',
]
export const HAT_C = { H: '#8a4a2e', B: GOLD }
export const CANDLE = [
  '..F..',
  '.FYF.',
  '.FYF.',
  '..K..',
  'WWWWW',
  'WWWWW',
  'WWWWW',
  'WWWWW',
  'WWWWW',
  'WWWWW',
]
export const CANDLE_C = { F: ORANGE, Y: '#fff1a0', K: INK, W: CREAM }
export const GUITAR = [
  '......KK',
  '.....KK.',
  '....NN..',
  '...NN...',
  '.WWN....',
  'WWWWW...',
  'WWOWWW..',
  'WWWWWW..',
  '.WWWW...',
]
export const GUITAR_C = { K: INK, N: '#8a4a2e', W: '#e7a04a', O: INK }
export const BIRDFIRE = [
  'O.......O',
  'OO..R..OO',
  'OOO.RRROO',
  '.OOORYOO.',
  '..OORRO..',
  '...RRR...',
  '...ORO...',
  '..O.O.O..',
]
export const BIRDFIRE_C = { O: ORANGE, R: RED, Y: '#fff1a0' }
export const MAGNIFIER = [
  '.KKKK.....',
  'KSSSSK....',
  'KSWSSK....',
  'KSSSSK....',
  'KSSSSK....',
  '.KKKKH....',
  '.....HH...',
  '......HH..',
  '.......HH.',
  '........HH',
]
export const MAGNIFIER_C = { K: GOLD, S: SKYB, W: '#ffffff', H: '#8a4a2e' }
export const SPROUT = [
  '.LL...LL.',
  'LLLL.LLLL',
  '.LLLSLLL.',
  '....S....',
  '....S....',
]
export const SPROUT_C = { L: GREEN, S: '#3a9a48' }
export const DEAD = [
  '.b.....b.',
  'bb.....bb',
  '.bb...bb.',
  '...bSb...',
  '....S....',
  '....S....',
]
export const DEAD_C = { b: '#a8956a', S: '#7a6a4a' }
export const FLOWER = [
  '..PP.PP..',
  '.PPPPPPP.',
  'PPPYYYPPP',
  '.PPYYYPP.',
  'PPPYYYPPP',
  '.PPPPPPP.',
  '..PP.PP..',
  '....S....',
  '.LL.S.LL.',
  'LLLLSLLLL',
  '....S....',
]
export const FLOWER_C = { P: PINK, Y: GOLD, S: '#3a9a48', L: GREEN }
export const CLOUD = [
  '....WWWW......',
  '..WWWWWWWW.WW.',
  '.WWWWWWWWWWWWW',
  'WWWWWWWWWWWWWW',
  'WWWWWWWWWWWWWW',
  '.WWWWWWWWWWWW.',
]
export const CLOUD_C = { W: '#f4f2ff' }
export const HEARTCLOUD = [
  '.WWWW..WWWW.',
  'WWWWWWWWWWWW',
  'WWWWWWWWWWWW',
  'WWWWWWWWWWWW',
  '.WWWWWWWWWW.',
  '..WWWWWWWW..',
  '...WWWWWW...',
  '....WWWW....',
  '.....WW.....',
]
export const PLANE = [
  '.....K.......',
  '.....KK......',
  'K....KKK.....',
  'KK.KKKKKKKKK.',
  'KKKKKKKKKKKKK',
  'KK.KKKKKKKKK.',
  'K....KKK.....',
  '.....KK......',
  '.....K.......',
]
export const PLANE_C = { K: '#f4f2ff' }

/** a pause button (two bars in a circle) */
export function pauseBtn(x, cx, cy, k, { col = MINT } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 118, 0, Math.PI * 2); x.fill()
  x.fillStyle = col; x.beginPath(); x.arc(0, 0, 108, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; x.fillRect(-44, -52, 30, 104); x.fillRect(14, -52, 30, 104)
  x.restore()
}

/** a little ticket (two lines of text) */
export function ticket(x, cx, cy, k, a, b, { bg = GOLD, rot = -0.06, w = 330 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  shadowBox(x, -w / 2, -80, w, 160)
  inkBox(x, -w / 2, -80, w, 160, bg, 7)
  x.fillStyle = INK; x.beginPath(); x.arc(-w / 2, 0, 22, -Math.PI / 2, Math.PI / 2); x.fill(); x.beginPath(); x.arc(w / 2, 0, 22, Math.PI / 2, Math.PI * 1.5); x.fill()
  x.setLineDash([10, 8]); x.strokeStyle = INK; x.lineWidth = 3; x.beginPath(); x.moveTo(w / 2 - 70, -70); x.lineTo(w / 2 - 70, 70); x.stroke(); x.setLineDash([])
  txt(x, a, -30, -24, `700 26px ${MONO}`); txt(x, b, -30, 26, `800 32px ${INTER}`)
  x.restore()
}

/** a mini birth chart wheel: 12 coloured wedges + a centre label */
export function chartWheel(x, t, cx, cy, r, k, { center = '', spin = 0.15 } = {}) {
  if (k <= 0.01) return
  const COLS = ['#ff6b5e', '#7dd87a', '#ffd23a', '#9ad7ff', '#ffb34a', '#c7e07a', '#ff9ac0', '#b06bff', '#ff8a4a', '#9a8a7a', '#6be0ff', '#a99bff']
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.beginPath(); x.arc(10, 12, r + 12, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 10, 0, Math.PI * 2); x.fill()
  x.rotate(t * spin)
  for (let i = 0; i < 12; i++) { x.fillStyle = COLS[i]; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, r, i / 12 * Math.PI * 2, (i + 1) / 12 * Math.PI * 2); x.closePath(); x.fill() }
  x.strokeStyle = INK; x.lineWidth = 4; for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(a) * r, Math.sin(a) * r); x.stroke() }
  x.rotate(-t * spin)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r * 0.52, 0, Math.PI * 2); x.fill()
  x.fillStyle = NIGHT; x.beginPath(); x.arc(0, 0, r * 0.46, 0, Math.PI * 2); x.fill()
  if (center) txt(x, center, 0, 2, `800 ${Math.round(r * 0.22)}px ${INTER}`, BONE)
  x.restore()
}

/** a sign star friend (no glyph), handy for "with a friend" gags */
export function friend(x, t, id, cx, cy, size, k, o = {}) {
  if (k <= 0.01) return null
  return signChar(x, t, id, cx, cy, size * k, { glyph: false, seed: 50, ...o })
}

/** a simple bed (frame + blanket + pillow) */
export function bed(x, cx, cy, k, { blanket = LAV } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-300, -30, 600, 120); x.fillRect(-310, -150, 40, 260); x.fillRect(270, -60, 40, 170)
  x.fillStyle = WOOD; x.fillRect(-302, -142, 24, 244); x.fillRect(278, -52, 24, 154)
  x.fillStyle = CREAM; x.fillRect(-270, -60, 130, 50)
  x.fillStyle = blanket; x.fillRect(-270, -20, 540, 90)
  x.fillStyle = 'rgba(255,255,255,0.25)'; for (let i = 0; i < 6; i++) x.fillRect(-250 + i * 90, -14, 40, 78)
  x.restore()
}
/** a sofa */
export function sofa(x, cx, cy, k, { col = '#7a5cc0' } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-250, -90, 500, 190); x.fillStyle = col; x.fillRect(-242, -82, 484, 100); x.fillStyle = '#9a7ce0'; x.fillRect(-242, 18, 484, 74)
  x.fillStyle = INK; x.fillRect(-270, -40, 60, 150); x.fillRect(210, -40, 60, 150); x.fillStyle = col; x.fillRect(-264, -34, 48, 138); x.fillRect(216, -34, 48, 138)
  x.restore()
}

export { clamp, ease, drawBits }
