// trs3scorpio: THE SIGNS AS… v3 SOLO, "Dating a Scorpio | be like." (~51 s vertical, signs3kit social cut, music: lofi · C)
// One sign the whole film (makeFilm solo mode, 9 cards). The format look lives in ../../signs3kit.js.
//   0.0–3.6    "Dating a Scorpio | *be like.*"  One big Scorpio pops in, then dives away.
//   3.6–37.8   nine situations of dating a Scorpio (3.8 s each), each pushed to the extreme:
//              their profile bio is redacted · eye contact until the candle burned out · "how was your day?" "define day."
//              · ran your compatibility fourteen times · you said you like mangoes, they planted a tree
//              · you said "I'm fine", they brought soup anyway · knows your chart better than you
//              · someone mocked your sweater, Scorpio wore it too · took a year to trust you, now you're in the will
//  37.8        "All in. | *No refunds.*"  The big Scorpio comes back.
//  41.0        LESSON UNLOCKED: "Earn the trust. | Get *forever.*"  TRUST: EARNED
//  46.9        "Taurus stayed | for *the mangoes.*" over the match card: Scorpio + Taurus (the mango tree, paid off).
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, INTER, MONO, SERIF,
} from '../../signs3kit.js'

const RED = '#e23d4e', PURPLE = '#c97bff'

// ── props
const TREE = [
  '.....LLLLL.....',
  '...LLLLLLLLL...',
  '..LLOLLLLLLOL..',
  '.LLLLLLOLLLLLL.',
  'LLOLLLLLLLLLOLL',
  'LLLLLOLLLOLLLLL',
  '.LLLLLLLLLLLLL.',
  '..LLOLLLLLOLL..',
  '....LLLLLLL....',
  '......TTT......',
  '......TTT......',
  '......TTT......',
  '.....TTTTT.....',
  '..GGGGGGGGGGG..',
]
const TREE_C = { L: '#5fd068', O: '#ffb34a', T: '#8a4a2e', G: '#3f9e4a' }
const BOWL = [
  'YYYYYYYYYYYYY',
  'WYWYYWYYWYYWY',
  'RRRRRRRRRRRRR',
  '.RRRRRRRRRRR.',
  '..RRRWWWRRR..',
  '...RRRRRRR...',
  '....KKKKK....',
]
const BOWL_C = { Y: '#ffe7a8', W: '#fff4e2', R: '#e23d4e', K: '#8a4a2e' }
const SWEATER = [
  '....RR...RR....',
  '.RRRRRRRRRRRRR.',
  'RRRRRRRRRRRRRRR',
  'RRYRYRYRYRYRYRR',
  'RR.GGGGGGGGG.RR',
  'RR.GWGGWGGWG.RR',
  'RR.GGGGGGGGG.RR',
  'RR.RYRYRYRYR.RR',
  'YY.RRRRRRRRR.YY',
  '...RRRRRRRRR...',
  '...YYYYYYYYY...',
]
const SWEATER_C = { R: RED, Y: GOLD, G: '#5fd068', W: BONE }

/** a match profile card: a mystery photo and a bio that gets redacted line by line */
function profile(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  const W = 320, H = 440
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-W / 2 + 8, -H / 2 + 10, W, H)
  x.fillStyle = INK; x.fillRect(-W / 2 - 5, -H / 2 - 5, W + 10, H + 10)
  x.fillStyle = BONE; x.fillRect(-W / 2, -H / 2, W, H)
  // photo: a dark square with a big question mark
  x.fillStyle = '#2a2350'; x.fillRect(-W / 2 + 20, -H / 2 + 20, W - 40, 200)
  x.fillStyle = PURPLE; x.font = `800 150px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('?', 0, -H / 2 + 128)
  x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.textAlign = 'left'; x.fillText('♏︎ SCORPIO', -W / 2 + 22, -H / 2 + 252)
  x.fillText('BIO:', -W / 2 + 22, -H / 2 + 292)
  // the bio lines: each one blacks out in turn
  const ROWS = [[230, 0.55], [190, 0.8], [250, 1.05], [140, 1.3]]
  ROWS.forEach(([w, at], i) => {
    const y = -H / 2 + 322 + i * 30
    const r = ease.outCubic(prog(lt, at, at + 0.2))
    x.fillStyle = '#9aa5c4'; x.fillRect(-W / 2 + 22, y, w, 10)
    x.fillStyle = INK; x.fillRect(-W / 2 + 18, y - 6, (w + 8) * r, 22)
  })
  x.restore()
}

/** a candle that melts down to nothing over the card, then a curl of smoke */
function candle(x, cx, base, k, lt, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, base); x.scale(k, k)
  const melt = ease.inOutQuad(prog(lt, 0.3, 1.9)), h = lerp(240, 0, melt)
  // holder
  x.fillStyle = INK; x.fillRect(-96, -6, 192, 30)
  x.fillStyle = GOLD; x.fillRect(-90, 0, 180, 18)
  // a puddle of wax that grows as it melts
  x.fillStyle = '#fff4e2'; x.beginPath(); x.ellipse(0, -4, 40 + 46 * melt, 10 + 4 * melt, 0, 0, Math.PI * 2); x.fill()
  if (h > 2) {
    x.fillStyle = INK; x.fillRect(-40, -h - 6, 80, h + 6)
    x.fillStyle = '#fff4e2'; x.fillRect(-34, -h, 68, h)
    x.fillStyle = '#e8dcc6'; x.fillRect(14, -h, 20, h)
  }
  if (melt < 0.97) {
    const fl = 1 + 0.12 * Math.sin(t * 23) + 0.06 * Math.sin(t * 41)
    x.save(); x.translate(0, -h - 30); x.scale(1, fl)
    x.fillStyle = 'rgba(255,210,90,0.25)'; x.beginPath(); x.arc(0, 0, 60, 0, Math.PI * 2); x.fill()
    x.fillStyle = '#ffb34a'; x.beginPath(); x.ellipse(0, 0, 16, 30, 0, 0, Math.PI * 2); x.fill()
    x.fillStyle = '#fff1a8'; x.beginPath(); x.ellipse(0, 8, 8, 16, 0, 0, Math.PI * 2); x.fill()
    x.restore()
  } else {
    const s = prog(lt, 1.9, 2.4)
    x.save(); x.globalAlpha = 0.55 * (1 - s); x.strokeStyle = BONE; x.lineWidth = 8; x.lineCap = 'round'
    x.beginPath(); for (let j = 0; j <= 12; j++) { const yy = -10 - j * 14 * (0.4 + s), xx = Math.sin(j * 0.7 + t * 3) * 14; j ? x.lineTo(xx, yy) : x.moveTo(xx, yy) } x.stroke()
    x.restore()
  }
  x.restore()
}

/** a phone running the compatibility check again (and again): a bar refills every few tenths of a second */
function compatPhone(x, cx, cy, k, lt, n) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.06); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -192, 260, 400)
  x.fillStyle = INK; x.fillRect(-130, -200, 260, 400)
  x.fillStyle = '#2a2350'; x.fillRect(-120, -190, 240, 380)
  x.fillStyle = '#140c30'; x.fillRect(-108, -160, 216, 320)
  x.fillStyle = BONE; x.font = `700 24px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText('COMPATIBILITY', 0, -124)
  x.font = `700 70px ${SERIF}`; x.fillStyle = PURPLE; x.fillText('♏︎', -52, -40)
  x.fillStyle = PINK; x.fillText('♥', 0, -40)
  x.fillStyle = MINT; x.font = `800 40px ${INTER}`; x.fillText('YOU', 56, -36)
  // the progress bar refills on every check
  const ph = n >= 14 ? 1 : ((Math.max(0, lt - 0.4) / 0.11) % 1)
  x.fillStyle = INK; x.fillRect(-88, 34, 176, 34)
  x.fillStyle = MINT; x.fillRect(-82, 40, 164 * ph, 22)
  x.fillStyle = BONE; x.font = `700 24px ${MONO}`; x.fillText(n >= 14 ? 'ALIGNED' : 'CHECKING…', 0, 112)
  x.fillStyle = '#6b62a8'; x.fillRect(-30, 168, 60, 10)
  x.restore()
}

/** a parchment will: "MY WILL", some lines, and you in it */
function will(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  const W = 300, H = 380
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-W / 2 + 8, -H / 2 + 10, W, H)
  x.fillStyle = INK; x.fillRect(-W / 2 - 5, -H / 2 - 5, W + 10, H + 10)
  x.fillStyle = '#f3e2b8'; x.fillRect(-W / 2, -H / 2, W, H)
  x.fillStyle = '#d9c28e'; x.fillRect(-W / 2, -H / 2, W, 22); x.fillRect(-W / 2, H / 2 - 22, W, 22)
  x.fillStyle = INK; x.font = `italic 600 52px ${SERIF}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('My Will', 0, -H / 2 + 72)
  x.fillStyle = '#b39b6a'
  for (let i = 0; i < 5; i++) x.fillRect(-W / 2 + 34, -H / 2 + 130 + i * 34, i % 2 ? 190 : 232, 10)
  x.restore()
}

// a birth-chart wheel (yours, which Scorpio has memorised)
const WHEEL = ['#ff6b5a', '#5fd068', '#ffd23a', '#8fe3ff', '#ffb34a', '#7dffb0', '#ff8fb1', '#c97bff', '#ff9a4a', '#9aa5c4', '#6fc3ff', '#b7a6ff']
function chart(x, cx, cy, r, k, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(t * 0.25)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 8, 0, Math.PI * 2); x.fill()
  for (let i = 0; i < 12; i++) { x.fillStyle = WHEEL[i]; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, r, (i / 12) * Math.PI * 2, ((i + 1) / 12) * Math.PI * 2); x.closePath(); x.fill() }
  x.fillStyle = '#140c30'; x.beginPath(); x.arc(0, 0, r * 0.62, 0, Math.PI * 2); x.fill()
  x.strokeStyle = BONE; x.lineWidth = 3
  for (const [a, b] of [[0.4, 2.6], [2.6, 4.5], [4.5, 0.4], [1.2, 3.9]]) { x.beginPath(); x.moveTo(Math.cos(a) * r * 0.55, Math.sin(a) * r * 0.55); x.lineTo(Math.cos(b) * r * 0.55, Math.sin(b) * r * 0.55); x.stroke() }
  x.fillStyle = GOLD
  for (const a of [0.4, 2.6, 4.5, 1.2, 3.9]) x.fillRect(Math.cos(a) * r * 0.55 - 7, Math.sin(a) * r * 0.55 - 7, 14, 14)
  x.restore()
}

const S = 'scorpio'
const CAMEOS = [
  { sign: S, cap: 'Their whole bio: | *redacted.*', mood: lt => lt > 1.6 ? 'wink' : 'neutral', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      profile(x, 790, 840, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 770, 1130, 'BIO: CLASSIFIED', pop01(t, P.t0 + 1.55, 0.3, 2.2), { size: 32, bg: PURPLE, color: '#fff4e2', rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Held eye contact | till the *candle died.*', mood: 'wide', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      candle(x, 780, 1120, 1.3 * pop01(t, P.t0 + 0.15, 0.3, 2), lt, t)
      label(x, 740, 620, 'EYE CONTACT: ONGOING', pop01(t, P.t0 + 0.5, 0.3, 2), { size: 30, bg: GOLD, rot: -0.05 })
    } },
  { sign: S, cap: 'Asked about their day. | *“Define day.”*', mood: lt => lt > 0.9 ? 'squint' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 760, 640, 'how was | your day?', pop01(t, P.t0 + 0.25, 0.25, 2.2), { size: 38, col: BONE, tail: 'br' })
      bubble(x, 760, 900, 'define | “day.”', pop01(t, P.t0 + 0.9, 0.25, 2.4), { size: 72, col: LAV, tail: 'bl' })
    } },
  { sign: S, cap: 'Ran our compatibility. | *Fourteen times.*', mood: lt => lt > 1.9 ? 'heart' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const n = Math.min(14, 1 + Math.floor(Math.max(0, lt - 0.4) / 0.11))
      compatPhone(x, 790, 880, pop01(t, P.t0 + 0.2, 0.3, 2), lt, n)
      label(x, 790, 620, `CHECK #${n}`, pop01(t, P.t0 + 0.4, 0.3, 2), { size: 40, bg: MINT, rot: -0.05, font: MONO, weight: 700 })
      if (n >= 14) sparkles(x, t, 790, 880, P.t0 + 2.0, 6, 170, 0.3)
    } },
  { sign: S, cap: 'Said you like mangoes. | They *planted a tree.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -170 }, hops: [1.5],
    back(x, t, lt, P) {
      const g = ease.outCubic(prog(lt, 0.25, 1.1))
      if (g > 0.01) drawBits(x, TREE, TREE_C, 790, 1110 - 14 * 22 * g / 2, 22 * g)
    },
    front(x, t, lt, P) {
      label(x, 770, 640, 'MANGO TREE: YOURS', pop01(t, P.t0 + 1.3, 0.3, 2), { size: 30, bg: '#ffb34a', rot: 0.04 })
      sparkles(x, t, 790, 860, P.t0 + 1.1, 6, 170, 0.5)
    } },
  { sign: S, cap: 'Said “I’m fine.” | They brought *soup anyway.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: { x: -170 },
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 1.0, 0.3, 2)
      drawBits(x, BOWL, BOWL_C, 780, 1040, 26 * k)
      if (k > 0.9) {
        x.save(); x.strokeStyle = 'rgba(255,255,255,0.45)'; x.lineWidth = 10; x.lineCap = 'round'
        for (const dx of [-60, 0, 60]) { x.beginPath(); for (let j = 0; j <= 10; j++) { const yy = 950 - j * 9, xx = 780 + dx + Math.sin(j * 0.8 + t * 4 + dx) * 10; j ? x.lineTo(xx, yy) : x.moveTo(xx, yy) } x.stroke() }
        x.restore()
      }
    },
    front(x, t, lt, P) {
      bubble(x, 740, 650, 'you’re not.', pop01(t, P.t0 + 0.35, 0.25, 2.2), { size: 58, col: LAV, tail: 'bl' })
      hearts(x, t, 790, 980, P.t0 + 1.4, { n: 4, life: 1.6, spread: 160, cell: 7, seed: 2 })
    } },
  { sign: S, cap: 'Knows your chart | *better than you.*', mood: lt => lt > 1.4 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      chart(x, 790, 720, 130, pop01(t, P.t0 + 0.2, 0.35, 2), t)
      bubble(x, 760, 990, 'that explains | your tuesday.', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 38, col: LAV, tail: 'bl' })
    } },
  { sign: S, cap: 'They mocked your sweater. | Scorpio *wore it too.*', mood: lt => lt > 1.4 ? 'wink' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const a = pop01(t, P.t0 + 0.2, 0.3, 2), b = pop01(t, P.t0 + 1.0, 0.3, 2.2)
      drawBits(x, SWEATER, SWEATER_C, 700, 800, 16 * a, { rot: -0.1 })
      drawBits(x, SWEATER, SWEATER_C, 850, 930, 16 * b, { rot: 0.1 })
      label(x, 750, 1130, 'MATCHING. ON PURPOSE.', pop01(t, P.t0 + 1.4, 0.3, 2), { size: 28, bg: GOLD, rot: -0.04 })
    } },
  { sign: S, cap: 'A year to trust you. | Now you’re *in the will.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      will(x, 790, 820, pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 760, 1080, 'TO YOU: EVERYTHING', pop01(t, P.t0 + 1.1, 0.3, 2.6), { size: 34, bg: PINK, rot: -0.08 })
      hearts(x, t, 580, 1060, P.t0 + 1.4, { n: 5, life: 1.8, spread: 70, cell: 7, seed: 5 })
    } },
]

const F = makeFilm({
  id: 'trs3scorpio', key: 'C', accent: PURPLE, solo: 'scorpio',
  title: 'Dating a Scorpio | *be like.*',
  cameos: CAMEOS,
  card: { a: 'scorpio', b: 'taurus', chip: 'ALIGNED' },
  group: { cap: 'All in. | *No refunds.*', mood: 'heart' },
  lesson: { text: 'Earn the trust. | Get *forever.*', chip: 'TRUST: EARNED' },
  last: {
    text: 'Taurus stayed | for *the mangoes.*',
    draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 0.3, { n: 8, life: 2.2, spread: 700, cell: 8, seed: 3 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
