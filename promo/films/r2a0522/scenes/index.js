// r2a0522: star_advice, ADVICE SOLO, "How to surprise | *an Aries.*" (~51 s vertical, signs3kit social cut, music: lofi · F)
// One sign the whole way: nine warm ways to surprise an Aries, each a relatable truth + a kind reframe. Ending: lesson.
//   0.0–3.6    "How to surprise | *an Aries.*"
//   3.6–37.8   nine cards: they hate waiting, surprise them today · plan an adventure, not a dinner · a little competition,
//              they light up · say you're proud, out loud · they act tough, hugs still land · book the front row
//              · pack a bag, leave in ten minutes · it's Aries season, bring the candles · their reaction? loud. enjoy it.
//  37.8        "Bold and fast | *and so loved.*"
//  41.0        LESSON: "Go big. Go now. | They’ll *glow.*"  SURPRISE: LANDED
//  46.9        "Just don’t | *make them wait.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ACC = '#ff6b5a', RED = '#e23d4e', CREAM = '#fff4e2', ORANGE = '#ffb34a', BROWN = '#8a4a2e', GREY = '#9aa5c4'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700, color })
const ST = { x: -170 }
const S = 'aries'

function txt(x, s, px, py, size, col = INK, align = 'center', font = INTER, w = 800) {
  x.fillStyle = col; x.font = `${w} ${size}px ${font}`; x.textAlign = align; x.textBaseline = 'middle'; x.fillText(s, px, py)
}
function stopwatch(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-26, -176, 52, 40); x.fillStyle = GREY; x.fillRect(-18, -168, 36, 26)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 140, 0, 7); x.fill()
  x.fillStyle = GREY; x.beginPath(); x.arc(0, 0, 130, 0, 7); x.fill()
  x.fillStyle = CREAM; x.beginPath(); x.arc(0, 0, 116, 0, 7); x.fill()
  const s = Math.max(0, 9 - Math.floor(clamp((lt - 0.3) / 1.2) * 9))
  txt(x, `0:0${s}`, 0, 6, 64, s === 0 ? RED : INK, 'center', MONO, 700)
  x.restore()
}
const MOUNTAIN = ['......F......', '......FRR....', '......FRR....', '......F......', '.....WWW.....', '....WWGGG....', '...GGGGGGG...', '..GGGGGGGGG..', '.GGGgGGGGgGG.', 'GGGGGGGGGGGGG']
const TROPHY = ['YYYYYYYYY', 'YYWYYYYYY', '.YYYYYYY.', '..YYYYY..', '...YYY...', '....Y....', '....Y....', '..KKKKK..', '..KKKKK..']
const MEGA = ['.........RR', '.......RRRR', '..KK.RRRRRR', 'KKKKRRRRRRR', 'KKKKRRRRRRR', '..KK.RRRRRR', '.......RRRR', '.........RR']
const SEAT = ['.RRRRR.', 'RRRRRRR', 'RRRRRRR', 'RRRRRRR', 'KKKKKKK', 'K.....K']
const BAG = ['...KKKK...', '...K..K...', 'BBBBBBBBBB', 'BYBBBBBBYB', 'BBBBBBBBBB', 'BBBBBBBBBB', 'BYBBBBBBYB', 'BBBBBBBBBB', '.K......K.']
const CAKE = ['.F.F.F.F.F.', '.Y.Y.Y.Y.Y.', '.W.W.W.W.W.', 'PPPPPPPPPPP', 'PCPCPCPCPCP', 'CCCCCCCCCCC', 'CCCCCCCCCCC', 'GGGGGGGGGGG']

const CAMEOS = [
  { sign: S, cap: 'They hate waiting. | *Surprise them today.*', mood: lt => lt > 1.6 ? 'sparkle' : 'squint', look: [1, 0], star: ST, hops: [1.7],
    front(x, t, lt, P) {
      stopwatch(x, t, 790, 840, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      L(x, 790, 1080, 'WAIT TIME: NONE', pop01(t, P.t0 + 1.6, 0.3, 2.4), MINT, 0.04, 32)
    } },
  { sign: S, cap: 'Plan an adventure, | *not a dinner.*', mood: 'sparkle', look: [1, -1], star: ST, hops: [1.0, 1.6],
    front(x, t, lt, P) {
      drawBits(x, MOUNTAIN, { F: BROWN, R: ACC, W: CREAM, G: '#6e7896', g: '#4a5170' }, 790, 870, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 1100, 'RESERVATION: SUMMIT', pop01(t, P.t0 + 1.2, 0.3, 2.4), GOLD, -0.04, 30)
    } },
  { sign: S, cap: 'Add a little competition. | *They light up.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, TROPHY, { Y: GOLD, W: '#fff', K: INK }, 790, 870, 26 * pop01(t, P.t0 + 0.6, 0.35, 2))
      bubble(x, 790, 620, 'race you!', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 42, tail: 'bl' })
      sparkles(x, t, 790, 870, P.t0 + 1.1, 7, 180, 0.3)
      L(x, 790, 1110, 'WINNER: ARIES (AGAIN)', pop01(t, P.t0 + 1.5, 0.3, 2.4), ORANGE, 0.04, 28)
    } },
  { sign: S, cap: 'Say you’re proud. | *Out loud.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', star: ST,
    front(x, t, lt, P) {
      drawBits(x, MEGA, { K: INK, R: ACC }, 750, 930, 21 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.15 })
      bubble(x, 760, 680, 'SO PROUD | OF YOU!', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 46, col: GOLD, tail: 'br' })
      hearts(x, t, 470, 820, P.t0 + 1.2, { n: 5, life: 1.6, spread: 140, cell: 7, seed: 3 })
    } },
  { sign: S, cap: 'They act tough. | *Hugs still land.*', mood: lt => lt > 1.1 ? 'heart' : 'neutral', star: { x: -120 },
    front(x, t, lt, P) {
      const d = ease.outCubic(prog(lt, 0.3, 1.0))
      signChar(x, t, 'cancer', lerp(940, 680, d), 900, 230, { mood: 'heart', look: [-1, 0], seed: 17, glyph: false, hops: [P.t0 + 1.0] })
      L(x, 700, 1110, 'TOUGH ACT: MELTED', pop01(t, P.t0 + 1.2, 0.3, 2.4), PINK, -0.04, 32)
      hearts(x, t, 540, 780, P.t0 + 1.1, { n: 5, life: 1.6, spread: 200, cell: 7, seed: 6 })
    } },
  { sign: S, cap: 'Book the front row. | *They want to see.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      for (let r = 0; r < 2; r++) for (let c = 0; c < 3; c++) drawBits(x, SEAT, { R: r ? '#7a2a3a' : ACC, K: INK }, 690 + c * 110, 840 + r * 130, 13 * pop01(t, P.t0 + 0.2 + (r * 3 + c) * 0.08, 0.3, 2), { alpha: r ? 0.7 : 1 })
      L(x, 790, 660, 'ROW 1 · SEAT 1', pop01(t, P.t0 + 0.9, 0.3, 2.4), GOLD, 0.04, 32)
      L(x, 790, 1120, 'ROW 2: TOO FAR', pop01(t, P.t0 + 1.5, 0.3, 2.4), BONE, -0.04, 28)
    } },
  { sign: S, cap: 'Pack a bag. | Leave *in ten minutes.*', mood: lt => lt > 1.2 ? 'wide' : 'happy', look: [1, 0], star: ST, hops: [1.3, 1.8],
    front(x, t, lt, P) {
      drawBits(x, BAG, { K: INK, B: SKYB, Y: GOLD }, 790, 880, 24 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.05 })
      L(x, 790, 640, 'DESTINATION: ???', pop01(t, P.t0 + 0.8, 0.3, 2.4), LAV, -0.04, 32)
      bubble(x, 790, 1110, 'I’M READY. | WHERE?', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: S, cap: 'It’s Aries season. | *Bring the candles.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const fl = 0.9 + 0.1 * Math.sin(t * 14)
      drawBits(x, CAKE, { F: ORANGE, Y: GOLD, W: CREAM, P: PINK, C: '#c8865a', G: '#d8dbe8' }, 790, 900, 24 * pop01(t, P.t0 + 0.2, 0.3, 2), { sy: 1 })
      L(x, 790, 650, '♈︎ ARIES SEASON', pop01(t, P.t0 + 0.8, 0.3, 2.4), ACC, 0.04, 34)
      L(x, 790, 1110, 'CANDLES: ALL OF THEM', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, -0.03, 28)
      sparkles(x, t, 790, 820, P.t0 + 1.0, 6, 150 * fl, 0.4)
    } },
  { sign: S, cap: 'Their reaction? | Loud. *Enjoy it.*', mood: lt => lt > 0.8 ? 'wide' : 'happy', star: { x: -150 }, hops: [0.8, 1.2, 1.6],
    front(x, t, lt, P) {
      bubble(x, 760, 760, 'NO WAAAY!!', pop01(t, P.t0 + 0.7, 0.25, 2.4), { size: 60, col: GOLD, tail: 'bl' })
      sparkles(x, t, 400, 860, P.t0 + 0.8, 8, 200, 0.1)
      L(x, 790, 1010, 'VOLUME: MAX', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, 0.04, 32)
      hearts(x, t, 760, 900, P.t0 + 1.5, { n: 4, life: 1.4, spread: 140, cell: 7, seed: 8 })
    } },
]

const F = makeFilm({
  id: 'r2a0522', key: 'F', accent: ACC, solo: 'aries', ending: 'lesson',
  title: 'How to surprise | *an Aries.*',
  cameos: CAMEOS,
  group: { cap: 'Bold and fast | *and so loved.*', mood: 'heart' },
  lesson: { text: 'Go big. Go now. | They’ll *glow.*', chip: 'SURPRISE: LANDED' },
  last: { text: 'Just don’t | *make them wait.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
