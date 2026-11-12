// r2t0414: star_talk, SOLO (libra), "Being a Libra | *be like.*" (signs3kit social cut, music: lofi · D). Ending: callback (the chair forgives them).
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', ORANGE = '#ffb34a', CREAM = '#fff4e2', GREY = '#9aa5c4'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700, color })
const K = (t, P, d, dur = 0.3, s = 2) => pop01(t, P.t0 + d, dur, s)
const ST = { x: -170 }

/** a sheet of paper / list with an optional coloured header */
function paper(x, cx, cy, k, lines, { w = 330, size = 30, rot = 0.04, head = null, headBg = GOLD } = {}) {
  if (k <= 0.01) return
  const lh = size * 1.45, h = lines.length * lh + 40 + (head ? 60 : 0)
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = BONE; x.fillRect(-w / 2, -h / 2, w, h)
  let y0 = -h / 2 + 20
  if (head) { x.fillStyle = headBg; x.fillRect(-w / 2, -h / 2, w, 60); x.fillStyle = INK; x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -h / 2 + 31); y0 += 60 }
  x.fillStyle = INK; x.font = `800 ${size}px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'
  lines.forEach((l, i) => { if (typeof l === 'function') l = l(); if (l) x.fillText(l, -w / 2 + 24, y0 + lh * (i + 0.5)) })
  x.restore()
}
/** a pixel phone with a header bar and chat chips: lines = [[text, colour, k, right?], …] */
function phone(x, cx, cy, k, { head = '', headCol = MINT, lines = [], rot = 0.05 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -192, 256, 400)
  x.fillStyle = INK; x.fillRect(-134, -204, 268, 408)
  x.fillStyle = '#2a2350'; x.fillRect(-124, -194, 248, 388)
  x.fillStyle = '#140c30'; x.fillRect(-112, -170, 224, 340)
  if (head) { x.fillStyle = headCol; x.fillRect(-100, -156, 200, 46); x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -132) }
  x.textAlign = 'left'; x.textBaseline = 'middle'
  lines.forEach(([txt, col, kk, right], i) => {
    if (kk <= 0.01) return
    x.font = `700 24px ${MONO}`; const w = x.measureText(txt).width + 24
    x.save(); x.translate(right ? 96 - w : -96, -60 + i * 64); x.scale(kk, kk)
    x.fillStyle = col; x.fillRect(0, -22, w, 44); x.fillStyle = INK; x.fillText(txt, 12, 2)
    x.restore()
  })
  x.restore()
}
/** a square sticky note with a few lines of text */
function note(x, cx, cy, k, lines, { rot = -0.05, bg = '#ffe76a', size = 34 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-140, -134, 296, 296)
  x.fillStyle = INK; x.fillRect(-152, -152, 304, 304); x.fillStyle = bg; x.fillRect(-144, -144, 288, 288)
  x.fillStyle = INK; x.font = `800 ${size}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  lines.forEach((l, i) => x.fillText(l, 0, (i - (lines.length - 1) / 2) * size * 1.25))
  x.restore()
}
/** a crossed-out sticker swapped for a new one at local time `at` */
function swapLabel(x, cx, cy, lt, at, from, to, { size = 34, fromBg = GREY, toBg = MINT } = {}) {
  if (lt < at) { L(x, cx, cy, from, 1, fromBg, -0.04, size); return }
  const p = clamp((lt - at) / 0.25)
  if (p < 1) {
    L(x, cx, cy, from, 1, fromBg, -0.04, size)
    x.save(); x.strokeStyle = RED; x.lineWidth = 10; x.lineCap = 'round'; x.beginPath(); x.moveTo(cx - 150, cy + 10); x.lineTo(cx - 150 + 300 * p, cy - 10); x.stroke(); x.restore()
    return
  }
  L(x, cx, cy, to, pop01(lt, at + 0.3, 0.3, 2.4), toBg, 0.04, size)
}
/** little "z z z" drifting up */
function zzz(x, t, cx, cy, { alpha = 1, size = 40 } = {}) {
  x.save(); x.fillStyle = BONE; x.font = `800 ${size}px ${INTER}`; x.textAlign = 'center'
  for (let i = 0; i < 3; i++) { const ph = ((t * 0.6 + i / 3) % 1 + 1) % 1; x.globalAlpha = alpha * Math.sin(Math.PI * ph); x.fillText('z', cx + i * 26 + Math.sin(ph * 6) * 8, cy - ph * 120) }
  x.restore()
}
const DROP = ['.B.', 'BBB', 'BBB', '.B.']
function rain(x, t, cx, cy, w, h, n, col = SKYB, rate = 1.2) {
  for (let i = 0; i < n; i++) {
    const ph = ((t * rate + i * 0.173) % 1 + 1) % 1
    drawBits(x, DROP, { B: col }, cx - w / 2 + ((i * 97) % w), cy + ph * h, 7, { alpha: Math.sin(Math.PI * ph) })
  }
}
/** paper confetti falling */
function confetti(x, t, cx, cy, t0, { n = 20, spread = 320, h = 480 } = {}) {
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
/** a plain rounded box with centred text lines (screens, signs, tickets) */
function card(x, cx, cy, k, w, h, lines, { bg = BONE, fg = INK, rot = 0.04, size = 32, font = INTER, weight = 800, head = null, headBg = GOLD } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  let top = -h / 2, hh = h
  if (head) { x.fillStyle = headBg; x.fillRect(-w / 2, -h / 2, w, 56); x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -h / 2 + 29); top += 56; hh -= 56 }
  x.fillStyle = fg; x.font = `${weight} ${size}px ${font}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  lines.forEach((l, i) => x.fillText(l, 0, top + hh / 2 + (i - (lines.length - 1) / 2) * size * 1.3))
  x.restore()
}

// ── shared pixel props
const CROWN = ['Y...Y...Y', 'YY.YYY.YY', 'YYYYYYYYY', 'YRYYBYYRY', 'YYYYYYYYY']
const CROWN_C = { Y: GOLD, R: RED, B: SKYB }
const CLOUD = ['....CCCC......', '..CCCCCCCC....', '.CCCCCCCCCCCC.', 'CCCCCCCCCCCCCC', 'CCCCCCCCCCCCCC', '.CCCCCCCCCCCC.']
const SUN = ['...Y..Y..Y...', '.............', 'Y...OOOOO...Y', '...OOOOOOO...', '..OOOOOOOOO..', 'Y.OOOOOOOOO.Y', '..OOOOOOOOO..', '...OOOOOOO...', 'Y...OOOOO...Y', '.............', '...Y..Y..Y...']
const MUG = ['.S.S....', 'S.S.....', 'WWWWWW..', 'WCCCCWWW', 'WCCCCW.W', 'WCCCCW.W', 'WCCCCWWW', 'WCCCCW..', '.WWWW...']
const LAPTOP = ['.KKKKKKKKKK.', '.KSSSSSSSSK.', '.KSBBBBBBSK.', '.KSBBBBBBSK.', '.KSSSSSSSSK.', '.KKKKKKKKKK.', 'GGGGGGGGGGGG', 'GGGGGGGGGGGG']
const LAPTOP_C = { K: INK, S: '#6fc3ff', B: '#bfe8ff', G: '#9aa5c4' }
const PILLOW = ['.PPPPPPPPPP.', 'PPPPPPPPPPPP', 'PPWPPPPPPPPP', 'PPPPPPPPPPPP', 'PPPPPPPPPPPP', '.PPPPPPPPPP.']
const GIFT = ['...R...R...', '....R.R....', 'GGGGGRGGGGG', 'GGGGGRGGGGG', '.BBBBRBBBB.', '.BBBBRBBBB.', '.BBBBRBBBB.', '.BBBBRBBBB.']
const GIFT_C = { R: RED, G: GOLD, B: PINK }
const BAG = ['...KKKK...', '..K....K..', '.BBBBBBBB.', 'BBBBBBBBBB', 'BBBWWWWBBB', 'BBBWWWWBBB', 'BBBBBBBBBB', 'BBBBBBBBBB']
const HOUSE = ['.....R.....', '....RRR....', '...RRRRR...', '..RRRRRRR..', '.RRRRRRRRR.', '..WWWWWWW..', '..WBBWWDW..', '..WBBWWDW..', '..WWWWWDW..']
const HOUSE_C = { R: RED, W: CREAM, B: SKYB, D: '#8a4a2e' }
const BOOK = ['KKKKKKKKKK', 'KPPPPKPPPK', 'KPPPPKPPPK', 'KPPPPKPPPK', 'KPPPPKPPPK', 'KPPPPKPPPK', 'KKKKKKKKKK']
const PLANT = ['..G..G..', '.GGG.GG.', 'GG.GGG.G', '.GGGGGG.', '...GG...', '.TTTTTT.', '.TTTTTT.', '..TTTT..', '..TTTT..']
const PLANT_C = { G: '#5bd18b', T: '#c46a3a' }
const CLOCK = ['..KKKKK..', '.KWWWWWK.', 'KWWWKWWWK', 'KWWWKWWWK', 'KWWWKKKWK', 'KWWWWWWWK', 'KWWWWWWWK', '.KWWWWWK.', '..KKKKK..']
const CLOCK_C = { K: INK, W: CREAM }
const STOPSIGN = ['..RRRR..', '.RRRRRR.', 'RRRRRRRR', 'RWWWWWWR', 'RRRRRRRR', '.RRRRRR.', '..RRRR..', '...KK...', '...KK...', '...KK...', '...KK...']
const PUMPKIN = ['.....G.....', '....GG.....', '..OOOOOOO..', '.OOoOOOoOO.', 'OOOoOOOoOOO', 'OOOoOOOoOOO', 'OOOoOOOoOOO', '.OOoOOOoOO.', '..OOOOOOO..']
const PUMPKIN_C = { G: '#5bd18b', O: ORANGE, o: '#d9792a' }
const HEADPH = ['..KKKKKK..', '.K......K.', 'K........K', 'K........K', 'PP......PP', 'PP......PP', 'PP......PP']
const TISSUE = ['...WW...', '..WWWW..', 'BBBBBBBB', 'BWWBBWWB', 'BBBBBBBB', 'BBBBBBBB']
const TISSUE_C = { W: '#ffffff', B: SKYB }
const BLANKET = ['LLLLLLLLLLLL', 'LPLPLPLPLPLP', 'LLLLLLLLLLLL', 'PLPLPLPLPLPL', 'LLLLLLLLLLLL']
const SNACK = ['.KKKKKK.', 'KYYYYYYK', 'KYRRRRYK', 'KYRWWRYK', 'KYRRRRYK', 'KYYYYYYK', '.KKKKKK.']
const SNACK_C = { K: INK, Y: GOLD, R: RED, W: CREAM }
const TEA = ['..S.S..', '.S.S...', 'KKKKKKK', 'KWWWWWKK', 'KWWWWWK.K', 'KWWWWWKK', '.KWWWK..', '..KKK...']
const TEA_C = { K: INK, W: '#c9f0d8', S: CREAM }
//   four-item menu, ordered after forty minutes · outfit check: wearing both · broke up a fight, both sides hugged them
//   asked one opinion, then eleven more · pros and cons list for a sandwich · profile bio, draft 63 · straightened every frame
//   bumped a chair, apologised to it · compatibility check with the whole group chat
const ACC = '#ff9ad5'
const S = 'libra'
const SHIRT = ['..PP..MM..', '.PPPPMMMM.', 'PPPPPMMMMM', 'PPPPPMMMMM', '.PPPPMMMM.', '.PPPPMMMM.', '.PPPPMMMM.', '.PPPPMMMM.']
const SAND = ['..YYYYYY..', '.YYYYYYYY.', 'GGGGGGGGGG', 'RRRRRRRRRR', 'CCCCCCCCCC', '.YYYYYYYY.']
const SAND_C = { Y: '#e8b86a', G: '#5bd18b', R: RED, C: '#ffe76a' }
function chair(x, cx, cy, k, col, rot = 0) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-58, -110, 116, 150); x.fillRect(-70, 30, 140, 40); x.fillRect(-62, 70, 16, 70); x.fillRect(46, 70, 16, 70)
  x.fillStyle = col; x.fillRect(-50, -102, 100, 134); x.fillRect(-62, 36, 124, 28)
  x.restore()
}
function frame(x, cx, cy, k, rot) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-96, -76, 192, 152); x.fillStyle = GOLD; x.fillRect(-88, -68, 176, 136)
  x.fillStyle = '#8fd0ff'; x.fillRect(-70, -50, 140, 100); x.fillStyle = '#5bd18b'; x.beginPath(); x.ellipse(-10, 50, 90, 46, 0, Math.PI, 0); x.fill()
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Four things on the menu. | *Ordered at minute 40.*', mood: lt => lt > 1.6 ? 'wide' : 'squint', look: lt => [Math.sin(lt * 4) > 0 ? 1 : 0, 0], star: ST,
    front(x, t, lt, P) {
      paper(x, 790, 830, K(t, P, 0.2), ['soup?', 'pasta?', 'salad?', 'soup again?'], { head: 'MENU', headBg: PINK, w: 280, size: 30, rot: 0.04 })
      const m = Math.floor(clamp((lt - 0.3) / 1.6) * 40)
      L(x, 790, 1090, `DECIDING: ${m} MIN`, K(t, P, 0.4, 0.3, 2.2), BONE, -0.04, 32)
    } },
  { sign: S, cap: 'Outfit check? | *Wore both.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P, F) {
      drawBits(x, SHIRT, { P: PINK, M: MINT }, 790, 840, 26 * K(t, P, 0.2))
      L(x, 790, 640, 'PINK OR MINT?', K(t, P, 0.5, 0.3, 2.2), BONE, 0.04, 32)
      L(x, 790, 1070, 'ANSWER: YES', K(t, P, 1.3, 0.3, 2.4), GOLD, -0.04, 36)
    } },
  { sign: S, cap: 'Broke up a fight. | *Both sides hugged them.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: { x: -210 },
    front(x, t, lt, P) {
      const j = ease.inOutCubic(prog(lt, 0.9, 1.4)), k = K(t, P, 0.2)
      if (k > 0.01) {
        signChar(x, t, 'aries', lerp(640, 720, j), 900, 160 * k, { mood: lt > 1.3 ? 'heart' : 'squint', look: [1, 0], seed: 11, glyph: false })
        signChar(x, t, 'scorpio', lerp(940, 860, j), 900, 160 * k, { mood: lt > 1.3 ? 'heart' : 'squint', look: [-1, 0], seed: 12, glyph: false })
      }
      if (lt < 1.0) bubble(x, 790, 700, 'ARGH', K(t, P, 0.3, 0.25, 2.2), { size: 40, col: '#ff6b6b', tail: 'bc' })
      else L(x, 790, 700, 'PEACE: ACHIEVED', pop01(lt, 1.0, 0.3, 2.4), MINT, 0.04, 32)
      hearts(x, t, 790, 860, P.t0 + 1.4, { n: 5, life: 1.5, spread: 220, cell: 7, seed: 2 })
    } },
  { sign: S, cap: 'Asked for one opinion. | *Then eleven more.*', mood: lt => lt > 1.5 ? 'wide' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const n = 1 + Math.floor(clamp((lt - 0.3) / 1.4) * 11)
      phone(x, 790, 850, K(t, P, 0.2), { head: 'POLL: BANGS?', headCol: ACC, lines: [
        ['yes!', MINT, K(t, P, 0.5, 0.25, 2.2)],
        ['no!', '#ff6b6b', K(t, P, 0.8, 0.25, 2.2)],
        [`votes: ${n}`, BONE, K(t, P, 1.0, 0.25, 2.2), true],
        ['still unsure', LAV, K(t, P, 1.8, 0.25, 2.2), true],
      ] })
    } },
  { sign: S, cap: 'A pros and cons list | *for a sandwich.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, SAND, SAND_C, 790, 680, 16 * K(t, P, 0.2))
      card(x, 790, 920, K(t, P, 0.6), 330, 220, ['+ it’s bread', '− it’s bread'], { head: 'PROS / CONS', headBg: MINT, size: 32, rot: -0.04 })
    } },
  { sign: S, cap: 'Profile bio? | *Draft number 63.*', mood: lt => lt > 1.2 ? 'wide' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 830, K(t, P, 0.2), 320, 260, [lt > 1.2 ? 'hi! I like… hm.' : 'hi! I lo…', 'no wait.'], { head: '♎︎ MY PROFILE', headBg: ACC, size: 32, rot: 0.04 })
      const n = 1 + Math.floor(clamp((lt - 0.3) / 1.4) * 62)
      L(x, 790, 1080, `DRAFT ${n} · DELETE`, K(t, P, 0.5, 0.3, 2.2), BONE, -0.04, 30)
    } },
  { sign: S, cap: 'One crooked frame. | *Fixed the whole street’s.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      const r = lerp(0.25, 0, ease.outBack(clamp((lt - 0.8) / 0.4)))
      frame(x, 790, 820, K(t, P, 0.2), r)
      L(x, 790, 1050, lt > 1.3 ? 'BALANCE: RESTORED' : 'OH NO.', K(t, P, 0.4, 0.3, 2.2), lt > 1.3 ? MINT : '#ff6b6b', -0.04, 34)
      sparkles(x, t, 790, 820, P.t0 + 1.4, 6, 150, 0.4)
    } },
  { sign: S, cap: 'Bumped into a chair. | *Apologised to it.*', mood: lt => lt > 0.8 ? 'wide' : 'happy', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      chair(x, 790, 900, K(t, P, 0.2), '#c98f5a', 0.12 * Math.max(0, 1 - lt) * Math.sin(lt * 20))
      bubble(x, 760, 660, 'so sorry!!', K(t, P, 0.8, 0.25, 2.2), { size: 40, col: PINK, tail: 'bl' })
      L(x, 790, 1110, 'CHAIR: FINE', K(t, P, 1.6, 0.3, 2.4), BONE, -0.04, 30)
    } },
  { sign: S, cap: 'Ran compatibility | *with the whole group chat.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const rows = ['♈︎ ♥♥♥', '♋︎ ♥♥♥', '♏︎ ♥♥♥', '♒︎ ♥♥♥']
      paper(x, 790, 830, K(t, P, 0.2), rows.map((r, i) => () => lt > 0.5 + i * 0.25 ? r : ''), { head: 'MATCHES', headBg: ACC, w: 280, size: 32, rot: 0.04 })
      L(x, 790, 1090, 'VERDICT: LOVE ALL', K(t, P, 1.6, 0.3, 2.4), GOLD, -0.04, 30)
    } },
]

const F = makeFilm({
  id: 'r2t0414', key: 'D', accent: ACC, solo: S, ending: 'callback',
  title: 'Being a Libra | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Undecided. | *But so lovely.*', mood: 'sparkle' },
  last: {
    text: 'The chair | *forgave them.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const k = pop01(t, t0 + 0.2, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, S, 380, 1100, 260 * k, { mood: lt > 1.2 ? 'heart' : 'wide', seed: 7, look: [1, 0], hops: [t0 + 1.3] })
      chair(x, 720, 1130, 1.2 * pop01(t, t0 + 0.5, 0.4, 2), '#c98f5a')
      if (lt > 1.0) bubble(x, 740, 880, 'it’s ok ♥', pop01(t, t0 + 1.0, 0.25, 2.4), { size: 46, tail: 'bc' })
      if (lt > 1.5) hearts(x, t, 380, 960, t0 + 1.5, { n: 6, life: 1.6, spread: 160, cell: 8, seed: 5 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
