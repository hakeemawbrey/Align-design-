// r2a0412: star_advice, ADVICE SOLO (leo), "Signs a Leo | *misses you.*" (signs3kit social cut, music: lofi · F). Ending: card (leo + libra, the saved seat).
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
const ACC = '#ffb34a'
const S = 'leo'
const CARPET = ['RRRRRRRRRRRRRRRRRR', 'RrRRRRRRRRRRRRRRrR', 'RRRRRRRRRRRRRRRRRR', 'RRRRRRRRRRRRRRRRRR', 'RrRRRRRRRRRRRRRRrR', 'RRRRRRRRRRRRRRRRRR']
const BRACELET = ['..PPPPPP..', '.Y......M.', 'S........S', 'M........Y', '.P......P.', '..YSMPYS..']
const BR_C = { P: PINK, Y: GOLD, M: MINT, S: SKYB }
/** a polaroid with a sign star inside */
function polaroid(x, t, cx, cy, k, id, { rot = 0.06, cap = '' , mood = 'wink', blur = false } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -142, 256, 300)
  x.fillStyle = INK; x.fillRect(-134, -154, 268, 308)
  x.fillStyle = CREAM; x.fillRect(-128, -148, 256, 296)
  x.fillStyle = '#2a2350'; x.fillRect(-108, -128, 216, 200)
  if (blur) x.filter = 'blur(6px)'
  signChar(x, t, id, 0, -24, 150, { mood, seed: 33, glyph: false, glow: 0.6 })
  x.filter = 'none'
  x.fillStyle = INK; x.font = `700 24px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(cap, 0, 112)
  x.restore()
}
function chair(x, cx, cy, k, col) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-58, -110, 116, 150); x.fillRect(-70, 30, 140, 40); x.fillRect(-62, 70, 16, 70); x.fillRect(46, 70, 16, 70)
  x.fillStyle = col; x.fillRect(-50, -102, 100, 134); x.fillRect(-62, 36, 124, 28)
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Sends you a selfie? | *That’s a love letter.*', mood: lt => lt > 1.2 ? 'heart' : 'wink', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      polaroid(x, t, 790, 830, K(t, P, 0.2), S, { cap: 'for you ✦' })
      L(x, 790, 1080, 'SENT TO: ONLY YOU', K(t, P, 1.2, 0.3, 2.4), PINK, -0.04, 30)
    } },
  { sign: S, cap: 'Saved you the best seat. | *Next to them.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.1],
    front(x, t, lt, P) {
      chair(x, 790, 860, K(t, P, 0.2), GOLD)
      L(x, 790, 760, 'RESERVED', K(t, P, 0.6, 0.3, 2.2), RED, -0.05, 36, CREAM)
      L(x, 790, 1090, 'FOR: YOU. ONLY YOU.', K(t, P, 1.3, 0.3, 2.4), BONE, 0.04, 30)
      sparkles(x, t, 790, 860, P.t0 + 0.9, 6, 150, 0.4)
    } },
  { sign: S, cap: 'Tells your stories at parties? | *You’re their favourite.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.7],
    front(x, t, lt, P, F) {
      bubble(x, 790, 680, 'ok so MY friend…', K(t, P, 0.2, 0.25, 2.2), { size: 36, tail: 'bl' })
      const n = 1 + Math.floor(clamp((lt - 0.4) / 1.3) * 11)
      L(x, 790, 880, `STORY #${n} ABOUT YOU`, K(t, P, 0.6, 0.3, 2.2), GOLD, 0.04, 32)
      L(x, 790, 1060, 'AUDIENCE: OBSESSED', K(t, P, 1.5, 0.3, 2.4), MINT, -0.04, 30)
    } },
  { sign: S, cap: 'Extra loud texts? | *That’s “I miss you.”*', mood: lt => lt > 1.4 ? 'heart' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, 790, 850, K(t, P, 0.2), { head: 'YOU ♥', headCol: ACC, lines: [
        ['HELLO???', BONE, K(t, P, 0.4, 0.25, 2.4), true],
        ['WHERE ARE U', BONE, K(t, P, 0.7, 0.25, 2.4), true],
        ['(miss u)', PINK, K(t, P, 1.3, 0.25, 2.2), true],
        ['miss u too ♥', MINT, K(t, P, 1.8, 0.25, 2.2)],
      ] })
    } },
  { sign: S, cap: 'Threw a whole party | *so you’d come.*', mood: lt => lt > 1.1 ? 'heart' : 'sparkle', look: [1, 0], star: ST, hops: [0.6, 1.2],
    front(x, t, lt, P) {
      card(x, 790, 820, K(t, P, 0.2), 320, 220, ['GUEST OF', 'HONOUR:', 'YOU'], { head: 'PARTY!!', headBg: PINK, size: 36, rot: 0.04 })
      confetti(x, t, 640, 820, P.t0 + 0.8, { n: 16, spread: 260, h: 420 })
      L(x, 790, 1080, 'OTHER GUESTS: OPTIONAL', K(t, P, 1.5, 0.3, 2.4), GOLD, -0.04, 28)
    } },
  { sign: S, cap: 'Still wears your gift? | *Every. Single. Day.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, BRACELET, BR_C, 790, 840, 26 * K(t, P, 0.3), { rot: 0.1 })
      L(x, 790, 650, 'DAY 412', K(t, P, 0.8, 0.3, 2.2), BONE, 0.04, 38)
      L(x, 790, 1060, 'NEVER TAKES IT OFF', K(t, P, 1.4, 0.3, 2.4), PINK, -0.04, 30)
    } },
  { sign: S, cap: 'Says they’re fine? | *Hug them anyway.*', mood: lt => lt > 1.0 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      if (K(t, P, 0.2) > 0.5) swapLabel(x, 790, 800, lt, 0.9, 'I’M TOTALLY FINE ✦', 'OK. I MISSED YOU', { size: 32, fromBg: GOLD, toBg: PINK })
      hearts(x, t, 790, 980, P.t0 + 1.3, { n: 5, life: 1.6, spread: 200, cell: 7, seed: 2 })
    } },
  { sign: S, cap: 'Likes every photo? | *Even the blurry ones.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      polaroid(x, t, 790, 820, K(t, P, 0.2), 'libra', { cap: 'blurry', mood: 'happy', blur: true, rot: -0.05 })
      const n = Math.min(3, Math.floor(clamp((lt - 0.6) / 0.9) * 4))
      for (let i = 0; i < n; i++) drawBits(x, ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: '#ff4f86' }, 700 + i * 90, 1060, 10)
      L(x, 790, 620, 'LIKED ×3. BY LEO.', K(t, P, 1.5, 0.3, 2.4), BONE, 0.04, 28)
    } },
  { sign: S, cap: '“Come over”? | Comes with *a red carpet.*', mood: 'sparkle', look: [1, 0], star: { x: -200 }, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    back(x, t, lt, P) {
      const p = ease.outCubic(prog(lt, 0.2, 1.0))
      if (p <= 0) return
      x.save(); x.beginPath(); x.rect(300, 1020, 620 * p, 120); x.clip()
      drawBits(x, CARPET, { R: RED, r: GOLD }, 610, 1080, 34, { rot: 0 })
      x.restore()
    },
    front(x, t, lt, P) {
      L(x, 790, 700, 'WELCOME BACK ✦', K(t, P, 1.0, 0.3, 2.4), GOLD, 0.04, 36)
      sparkles(x, t, 790, 700, P.t0 + 1.1, 7, 180, 0.2)
    } },
]

const F = makeFilm({
  id: 'r2a0412', key: 'F', accent: ACC, solo: S, ending: 'card',
  title: 'Signs a Leo | *misses you.*',
  cameos: CAMEOS,
  card: { a: 'leo', b: 'libra', chip: 'IT’S A MATCH' },
  group: { cap: 'Big heart. | *Bigger welcome.*', mood: 'heart' },
  lesson: { text: 'Miss a Leo? | *Say it first.*', chip: 'STATUS: MISSED' },
  last: { text: 'Your seat is | *still saved.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
