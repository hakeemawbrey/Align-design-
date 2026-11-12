// gags.js: this film's prop helpers (pixel props + text cards) for the signs3kit social cut. Local to the film folder.
//   cam(sign, cap, opts, items) builds one cameo: items are drawn in front of the star, each popping in at its `at`
//   (cameo-local seconds), optionally only while `from <= lt < to`. Item kinds:
//     ['bubble', cx, cy, text | lt => text, at, { size, col, tail }]
//     ['label',  cx, cy, text | lt => text, at, { size, bg, rot, mono }]
//     ['bits',   name, cx, cy, cell, at, { rot, sx }]          (a bitmap from BITS)
//     ['cup' | 'phone' | 'doc' | 'board' | 'profile' | 'frame', cx, cy, at, {...}]
//     ['hearts', cx, cy, at, { n, spread }] · ['sparkles', cx, cy, at, { n, R }] · ['fn', (x, t, lt, P) => …]
import { prog, ease, clamp } from '../../../src/lib.js'
import { drawBits, sparkles, hearts, bubble, label, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'

export const RED = '#e23d4e', CREAM = '#fff4e2', ORANGE = '#ffb34a', GREEN = '#5fd068', BROWN = '#8a4a2e', GREY = '#9aa5c4', DARK = '#2a2350'
const C = { K: INK, W: '#ffffff', B: BONE, C: CREAM, R: RED, O: ORANGE, Y: GOLD, G: GREEN, g: '#3f9e4a', N: BROWN, n: '#c58b5c', P: PINK, L: LAV, M: MINT, S: SKYB, D: DARK, A: GREY, V: '#c97bff', U: '#4f7dff', T: '#e8dcc6', E: '#5a5470' }

export const BITS = {
  rocket: ['.....RR.....', '....RWWR....', '...RWSSWR...', '...WWSSWW...', '...WWWWWW...', '...WWRRWW...', '...WWWWWW...', '..RWWWWWWR..', '.RRWWWWWWRR.', 'RRR.WWWW.RRR', '....OYYO....', '....YOOY....', '.....OO.....'],
  cactus: ['.....GG.....', '....GGGG....', '.G..GGGG....', 'GG..GGGG..G.', 'GG..GgGG.GG.', 'GGGGGGGG.GG.', '.GGGGGgGGGG.', '....GGGGGG..', '....GGGG....', '..NNNNNNNN..', '..NnNNNNnN..', '...NNNNNN...', '...NNNNNN...'],
  headphones: ['...KKKKKK...', '..K......K..', '.K........K.', 'K..........K', 'K..........K', 'RR........RR', 'RRR......RRR', 'RRR......RRR', 'RR........RR'],
  calendar: ['.K..K..K..K.', 'RRRRRRRRRRRR', 'RRRRRRRRRRRR', 'WWWWWWWWWWWW', 'WAAWAAWAAWAW', 'WWWWWWWWWWWW', 'WAAWPPWAAWAW', 'WWWWPPWWWWWW', 'WAAWAAWAAWAW', 'WWWWWWWWWWWW'],
  box: ['NNNNNNNNNN', 'NnnnnnnnnN', 'NnnnnnnnnN', 'NNNNNNNNNN', 'NnnnnnnnnN', 'NnnnnnnnnN', 'NnnnnnnnnN', 'NNNNNNNNNN'],
  hoodie: ['...LLLLLL...', '..LL....LL..', '.LLLL..LLLL.', 'LLLLLWWLLLLL', 'LLLLLWWLLLLL', 'LL.LLLLLL.LL', 'LL.LLLLLL.LL', 'LL.LVVVVL.LL', 'LL.LVVVVL.LL', '...LLLLLL...', '...LLLLLL...'],
  pillow: ['.WWWWWWWWWWWW.', 'WWBWWWWWWWWBWW', 'WWWWWWWWWWWWWW', 'WWWWWWWWWWWWWW', 'WWBWWWWWWWWBWW', '.WWWWWWWWWWWW.'],
  cat: ['K.....K', 'KO...OK', 'OOOOOOO', 'OKOOOKO', 'OOOPOOO', '.OOOOO.'],
  battery: ['RRRRRRRRRRRR.', 'RAAAAAAAAAAR.', 'RRAAAAAAAAARR', 'RRAAAAAAAAARR', 'RAAAAAAAAAAR.', 'RRRRRRRRRRRR.'],
  pot: ['....AAAA....', '..AAAAAAAA..', 'A.EEEEEEEE.A', 'AAEEEEEEEEAA', '..EEEEEEEE..', '..EEEEEEEE..', '..EEEEEEEE..', '...EEEEEE...'],
  bowl: ['YYOYYYOYYYOYY', 'CYCYYCYYCYYCY', 'SSSSSSSSSSSSS', '.SSSSSSSSSSS.', '..SSSWWWSSS..', '...SSSSSSS...', '....SSSSS....'],
  onion: ['.....g.....', '.....g.....', '....VVV....', '..VVVVVVV..', '.VVLVVVVVV.', 'VVLVVVVVVVV', 'VVLVVVVVVVV', 'VVVVVVVVVVV', '.VVVVVVVVV.', '..VVVVVVV..', '....NNN....'],
  muffin: ['...NNNNN...', '..NNNnNNN..', '.NNnNNNNnN.', 'NNNNNNnNNNN', 'NNnNNNNNNnN', '.PPPPPPPPP.', '.PWPPWPPWP.', '..PPPPPPP..', '..PWPPWPP..', '...PPPPP...'],
  cake: ['.....Y.....', '.....R.....', '.....W.....', '.PPPPPPPPP.', 'PWPWPWPWPWP', 'PPPPPPPPPPP', 'CCCCCCCCCCC', 'CRCCRCCRCCR', 'CCCCCCCCCCC', 'NNNNNNNNNNN'],
  lock: ['...AAAAA...', '..AA...AA..', '..A.....A..', '..A.....A..', 'YYYYYYYYYYY', 'YYYYYYYYYYY', 'YYYYKKYYYYY', 'YYYYKKYYYYY', 'YYYYYKYYYYY', 'YYYYYYYYYYY', 'YYYYYYYYYYY'],
  backpack: ['...GGGGG...', '..G.....G..', '.GGGGGGGGG.', 'GGgggggggGG', 'GGgggggggGG', 'GGGGGGGGGGG', 'GGGYYYYYGGG', 'GGGYYYYYGGG', 'GGGGGGGGGGG', '.GGGGGGGGG.'],
  paint: ['..AAAAAAA..', '.A.......A.', 'RRRRRRRRRRR', 'RAAAAAAAAAR', 'AAAAAAAAAAA', 'AAARRRRRAAA', 'AAARRRRRAAA', 'AAAAAAAAAAA', 'AAAAAAAAAAA', '.AAAAAAAAA.'],
  plantBlack: ['..E..E..E..', '.EKE.E.EKE.', '.EKEEKEEKE.', '..EKEKEKE..', '...EEKEE...', '....EKE....', '..NNNNNNN..', '..NnnnnnN..', '...NnnnN...', '...NNNNN...'],
  fork: ['A.A.A', 'A.A.A', 'AAAAA', '.AAA.', '..A..', '..A..', '..A..', '..A..'],
  jar: ['.NNNNNN.', 'NNNNNNNN', 'WWWWWWWW', 'WOOOOOOW', 'WOROROOW', 'WOOOOOOW', 'WOOROROW', 'WOOOOOOW', 'WWWWWWWW'],
  spatula: ['.AAAA.', '.A..A.', '.AAAA.', '.A..A.', '.AAAA.', '..NN..', '..NN..', '..NN..', '..NN..', '..NN..'],
  mic: ['.AAA.', 'AAAAA', 'AAAAA', '.AAA.', '..K..', '..K..', '.KKK.'],
  camera: ['..KKK.......', 'KKKKKKKKKKKK', 'KAAAAAAAAARK', 'KAAAKKKKAAAK', 'KAAKSSSSKAAK', 'KAAKSWSSKAAK', 'KAAKSSSSKAAK', 'KAAAKKKKAAAK', 'KKKKKKKKKKKK'],
  bed: ['K..........K', 'KWWWWWWWWWWK', 'KWLLLLLLLLWK', 'KLLLLLLLLLLK', 'KLLLLLLLLLLK', 'KKKKKKKKKKKK', 'K..........K'],
  desk: ['DDDDDDDDDDDDDD', 'DSSSSSSD......', 'DSSSSSSD......', 'DDDDDDDD......', '...KK.........', 'NNNNNNNNNNNNNN', 'N............N', 'N............N', 'N............N'],
  mirror: ['.YYYYY.', 'YSSSSSY', 'YSWSSSY', 'YSSWSSY', 'YSSSSSY', 'YSSSSSY', 'YSSSSSY', '.YYYYY.'],
  map: ['CCCCCCCCCCCC', 'CSSGGSSSSSSC', 'CSGGGGSSRSSC', 'CSSGGSSSSSSC', 'CSSSSSSGGSSC', 'CSRSSSGGGGSC', 'CSSSSSSGGSSC', 'CCCCCCCCCCCC'],
  swatch: ['TTTT', 'TTTT', 'TTTT', 'TTTT', 'CCCC'],
  heartBig: ['.PP.PP.', 'PPPPPPP', 'PWPPPPP', 'PPPPPPP', '.PPPPP.', '..PPP..', '...P...'],
  plate: ['...WWWWWWWW...', '.WWBBBBBBBBWW.', 'WWBBBBBBBBBBWW', '.WWBBBBBBBBWW.', '...WWWWWWWW...'],
  cup: ['WWWWWWWW..', 'NNNNNNNN..', 'NNNNNNNNWW', 'NNNNNNNNW.W', 'NNNNNNNNWW', '.NNNNNN...', '..NNNN....'],
  scales: ['......Y......', '.....YYY.....', 'YYYYYYYYYYYYY', 'Y.....Y.....Y', 'Y.....Y.....Y', 'YYY...Y...YYY', '.Y....Y....Y.', '.....YYY.....', '....YYYYY....'],
  star5: ['...Y...', '..YYY..', 'YYYYYYY', '.YYYYY.', '.YY.YY.', 'Y.....Y'],
  vault: ['AAAAAAAAAA', 'AEEEEEEEEA', 'AEAAAAAAEA', 'AEA.YY.AEA', 'AEAYYYYAEA', 'AEA.YY.AEA', 'AEAAAAAAEA', 'AEEEEEEEEA', 'AAAAAAAAAA'],
  bulbs: ['K.K.K.K.K.K.K', 'Y.P.S.M.Y.P.S'],
  guitar: ['....NN', '...NN.', '..NN..', '.OOO..', 'OOKOO.', 'OOOOO.', '.OOO..'],
  photoFrame: ['YYYYYYYYYY', 'YSSSSSSSSY', 'YSSSSSSSSY', 'YSSGGSSSSY', 'YSGGGGSGSY', 'YGGGGGGGGY', 'YYYYYYYYYY'],
  muffinTray: ['NnNNnNNnNNn', 'NNNNNNNNNNN'],
}

// ── text cards ─────────────────────────────────────────────────────────────────────────────────────────────
function shadowBox(x, w, h, bg, { r = 0 } = {}) {
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 5, -h / 2 - 5, w + 10, h + 10)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
}
const txt = (x, s, px, py, size, { col = INK, align = 'center', mono = false, weight = 800 } = {}) => {
  x.fillStyle = col; x.font = `${mono ? 700 : weight} ${size}px ${mono ? MONO : INTER}`; x.textAlign = align; x.textBaseline = 'middle'; x.fillText(s, px, py)
}
/** a paper takeaway cup with a name scrawled on it */
export function cup(x, cx, cy, k, { name = '', rot = 0.04, col = RED } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.beginPath(); x.moveTo(-120, -150); x.lineTo(130, -150); x.lineTo(100, 200); x.lineTo(-90, 200); x.fill()
  x.fillStyle = INK; x.beginPath(); x.moveTo(-132, -170); x.lineTo(132, -170); x.lineTo(102, 196); x.lineTo(-102, 196); x.fill()
  x.fillStyle = CREAM; x.beginPath(); x.moveTo(-122, -160); x.lineTo(122, -160); x.lineTo(94, 186); x.lineTo(-94, 186); x.fill()
  x.fillStyle = INK; x.fillRect(-146, -206, 292, 46); x.fillStyle = BONE; x.fillRect(-138, -198, 276, 30)
  x.fillStyle = BROWN; x.fillRect(-116, 40, 226, 70)
  x.save(); x.rotate(-0.06); txt(x, name, 0, -60, name.length > 6 ? 54 : 66, { col }); x.restore()
  x.restore()
}
/** a pixel phone: head bar + chat chips [[text, colour, k, right?], …] */
export function phone(x, cx, cy, k, { head = '', headCol = MINT, lines = [], rot = 0.05, big = '', s = 1.25 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k * s, k * s)
  shadowBox(x, 268, 408, DARK)
  x.fillStyle = '#140c30'; x.fillRect(-112, -170, 224, 340)
  if (head) { x.fillStyle = headCol; x.fillRect(-100, -156, 200, 46); txt(x, head, 0, -132, 28, { mono: true }) }
  if (big) txt(x, big, 0, 20, 64, { col: BONE })
  lines.forEach(([s, col, kk, right], i) => {
    if (kk <= 0.01) return
    x.font = `700 30px ${MONO}`; const w = x.measureText(s).width + 24
    x.save(); x.translate(right ? 96 - w : -96, -60 + i * 64); x.scale(kk, kk)
    x.fillStyle = col; x.fillRect(0, -24, w, 48); txt(x, s, 12, 2, 30, { mono: true, align: 'left' })
    x.restore()
  })
  x.restore()
}
/** a sheet of paper: a title, ruled lines, optional red marks / ticks */
export function doc(x, cx, cy, k, { title = '', rows = 5, rot = -0.05, marks = 0, ticks = 0, chart = false, w = 300, h = 380 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  shadowBox(x, w, h, CREAM)
  txt(x, title, 0, -h / 2 + 44, 30, { mono: true })
  for (let i = 0; i < rows; i++) {
    const y = -h / 2 + 100 + i * 44, ww = w - 80 - (i % 3) * 40
    x.fillStyle = GREY; x.fillRect(-w / 2 + 34, y, ww, 10)
    if (i < ticks) { x.strokeStyle = '#2bb673'; x.lineWidth = 8; x.beginPath(); x.moveTo(w / 2 - 44, y + 2); x.lineTo(w / 2 - 34, y + 12); x.lineTo(w / 2 - 16, y - 12); x.stroke() }
    if (i < marks) { x.strokeStyle = RED; x.lineWidth = 7; x.beginPath(); x.ellipse(-w / 2 + 34 + ww * 0.6, y + 5, 40, 18, 0, 0, Math.PI * 2); x.stroke() }
  }
  if (chart) {
    const hs = [40, 70, 55, 110, 150]
    hs.forEach((hh, i) => { x.fillStyle = [MINT, SKYB, LAV, GOLD, PINK][i]; x.fillRect(-w / 2 + 44 + i * 46, h / 2 - 40 - hh, 32, hh) })
  }
  x.restore()
}
/** a protest-style sign on a stick */
export function board(x, cx, cy, k, { text = '', rot = -0.06, bg = BONE, col = RED, size = 64 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-18, 60, 36, 260); x.fillStyle = BROWN; x.fillRect(-11, 60, 22, 254)
  shadowBox(x, 330, 200, bg)
  const lines = text.split('|').map(s => s.trim())
  lines.forEach((l, i) => txt(x, l, 0, (i - (lines.length - 1) / 2) * size * 1.1, size, { col }))
  x.restore()
}
/** a sign profile card (the app's world): a photo square with the sign's star, a name, a status line */
export function profile(x, cx, cy, k, { sign = '', glyph = '', color = MINT, status = '', rot = 0.04, statusCol = RED } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  shadowBox(x, 320, 420, BONE)
  x.fillStyle = DARK; x.fillRect(-140, -190, 280, 190)
  x.fillStyle = color; x.font = `800 140px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('★', 0, -92)
  txt(x, `${glyph}︎ ${sign.toUpperCase()}`, 0, 40, 28, { mono: true })
  txt(x, 'MOOD:', 0, 100, 26, { mono: true, col: GREY })
  txt(x, status, 0, 150, 40, { col: statusCol })
  x.restore()
}
/** a gold picture frame around a little scene or a word */
export function frame(x, cx, cy, k, { text = '', rot = 0.05, w = 260, h = 220, bg = SKYB, size = 50, col = INK } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  shadowBox(x, w + 40, h + 40, GOLD)
  x.fillStyle = INK; x.fillRect(-w / 2 - 4, -h / 2 - 4, w + 8, h + 8); x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  const lines = text.split('|').map(s => s.trim())
  lines.forEach((l, i) => txt(x, l, 0, (i - (lines.length - 1) / 2) * size * 1.15, size, { col }))
  x.restore()
}

// ── the cameo builder ───────────────────────────────────────────────────────────────────────────────────────
const CARDS = { cup, phone, doc, board, profile, frame }
export function drawItems(x, t, lt, t0, items) {
  for (const it of items) {
    const [kind] = it
    if (kind === 'fn') { x.save(); it[1](x, t, lt, t0); x.restore(); continue }
    const o = it[it.length - 1] && typeof it[it.length - 1] === 'object' && !Array.isArray(it[it.length - 1]) ? it[it.length - 1] : {}
    if (o.from !== undefined && lt < o.from) continue
    if (o.to !== undefined && lt >= o.to) continue
    const val = v => typeof v === 'function' ? v(lt) : v
    if (kind === 'bubble') {
      const [, cx, cy, text, at] = it
      bubble(x, cx, cy, val(text), pop01(t, t0 + at, 0.25, 2.2), { size: o.size || 42, col: val(o.col) || BONE, tail: o.tail || 'bl' })
    } else if (kind === 'label') {
      const [, cx, cy, text, at] = it
      label(x, cx, cy, val(text), pop01(t, t0 + at, 0.3, 2), { size: o.size || 32, bg: val(o.bg) || GOLD, rot: o.rot ?? -0.05, ...(o.mono ? { font: MONO, weight: 700 } : {}) })
    } else if (kind === 'bits') {
      const [, name, cx, cy, cell, at] = it
      const k = o.grow ? ease.outCubic(prog(lt, at, at + 0.6)) : pop01(t, t0 + at, 0.3, 2)
      drawBits(x, BITS[name], { ...C, ...(o.cols || {}) }, cx + (o.wob ? Math.sin(t * o.wob) * 8 : 0), cy, cell * k, { rot: o.rot || 0, sx: o.sx || 1 })
    } else if (kind === 'hearts') {
      const [, cx, cy, at] = it
      hearts(x, t, cx, cy, t0 + at, { n: o.n || 5, life: 1.8, spread: o.spread || 160, cell: 7, seed: o.seed || 2 })
    } else if (kind === 'sparkles') {
      const [, cx, cy, at] = it
      sparkles(x, t, cx, cy, t0 + at, o.n || 6, o.R || 150, o.seed || 0.3)
    } else if (CARDS[kind]) {
      const [, cx, cy, at] = it
      const oo = {}; for (const key in o) oo[key] = val(o[key])
      CARDS[kind](x, cx, cy, pop01(t, t0 + at, 0.3, 2), oo)
    }
  }
}
export function cam(sign, cap, opts, items) {
  return { sign, cap, look: [1, 0], star: { x: -170 }, ...opts, front(x, t, lt, P) { drawItems(x, t, lt, P.t0, items) } }
}
export const L = (s) => s
export { clamp, PINK, GOLD, MINT, LAV, SKYB, BONE, INK }
