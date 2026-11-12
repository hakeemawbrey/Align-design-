// r2a0073: star_advice, ADVICE SOLO, "What an Aries | won't say." (~45 s vertical, signs3kit social cut, music: lofi · C)
// One sign the whole film (makeFilm solo mode, 9 cards): the thing an Aries won't say out loud + a warm reframe.
//   0.0–3.6    "What an Aries | *won’t say.*"
//   3.6–37.8   "I'm tired" (rest counts) · "that hurt" (you can say it) · "I need help" (asking is brave)
//              · "wait for me" (we will) · "I'm nervous" (brave includes that) · "was I too much?" (never)
//              · "I miss you" (text it first) · "I was wrong" (still a win: a tiny trophy) · "did I do okay?" (you did great)
//  37.8        "All fire. | Big *soft heart.*"
//  41.2        CALLBACK: "Said “I was wrong.” | Still got *the trophy.*"  Aries holding the tiny trophy, proud.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#ff6b5a', CREAM = '#fff4e2', ORANGE = '#ffb34a'
const PILLOW = ['.LLLLLLLLLLLL.', 'LLLLLLLLLLLLLL', 'LLLWLLLLLLLLLL', 'LLLLLLLLLLLLLL', 'LLLLLLLLLLLLLL', '.LLLLLLLLLLLL.']
const BANDAGE = ['..BBBBBBBBBB..', '.BBBBBBBBBBBB.', 'BBBBWWWWWWBBBB', 'BBBBWDWWDWBBBB', 'BBBBWWWWWWBBBB', '.BBBBBBBBBBBB.', '..BBBBBBBBBB..']
const TROPHY = ['YYYYYYYYY', 'YYYYYYYYY', 'Y.YYYYY.Y', 'Y.YYYYY.Y', '.YYYYYYY.', '..YYYYY..', '...YYY...', '....Y....', '...YYY...', '..KKKKK..']
const TROPHY_C = { Y: GOLD, K: '#8a4a2e' }
const STAR_STK = ['....G....', '...GGG...', 'GGGGGGGGG', '.GGGGGGG.', '..GGGGG..', '.GG...GG.', 'GG.....GG']
const SHOE = ['.....RRR....', '....RRRRR...', 'RRRRRRRRRR..', 'RRRRRRRRRRRR', 'WWWWWWWWWWWW']

// the unsaid line: a bubble that starts crossed-out-faint, then says it
function unsaid(x, t, txt, P, { y = 650 } = {}) {
  bubble(x, 790, y, txt, pop01(t, P.t0 + 0.2, 0.25, 2), { size: 40, col: LAV, tail: 'bl' })
}

const S = 'aries'
const CAMEOS = [
  { sign: S, cap: '“I’m tired.” | *Rest counts too.*', mood: lt => lt > 1.1 ? 'sleepy' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      unsaid(x, t, '“I’m… tired.”', P)
      drawBits(x, PILLOW, { L: SKYB, W: BONE }, 790, 920, 22 * pop01(t, P.t0 + 1.0, 0.3, 2))
      label(x, 790, 1100, 'NAP = TRAINING', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: MINT, font: MONO, weight: 700 })
    } },
  { sign: S, cap: '“That hurt.” | *You can say it.*', mood: lt => lt > 1.2 ? 'happy' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      unsaid(x, t, '“that… hurt.”', P)
      drawBits(x, BANDAGE, { B: '#f2b48a', W: CREAM, D: '#d89a70' }, 790, 900, 18 * pop01(t, P.t0 + 1.0, 0.3, 2), { rot: -0.3 })
      hearts(x, t, 790, 900, P.t0 + 1.3, { n: 4, life: 1.4, spread: 180, cell: 6, seed: 2 })
    } },
  { sign: S, cap: '“I need help.” | *Asking is brave.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [0, -1], star: { x: -150, y: 40 },
    front(x, t, lt, P, Fr) {
      const lift = ease.inOutCubic(prog(lt, 1.0, 1.5))
      const k = pop01(t, P.t0 + 0.1, 0.3, 2)
      if (k > 0.01) { x.save(); x.translate(lerp(400, 560, lift), lerp(Fr.top - 70, 620, lift)); x.scale(k, k); x.fillStyle = INK; x.fillRect(-124, -64, 248, 128); x.fillStyle = '#c98f2a'; x.fillRect(-118, -58, 236, 116); x.fillStyle = '#8a5a1a'; x.fillRect(-118, -6, 236, 12); x.restore() }
      if (lt > 0.9) signChar(x, t, 'capricorn', 830, 960, 200 * pop01(t, P.t0 + 1.0, 0.3, 2), { mood: 'happy', look: [-1, 0], seed: 14, glyph: false })
      label(x, 820, 700, 'ON IT', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 40, bg: MINT, font: MONO, weight: 700 })
    } },
  { sign: S, cap: '“Wait for me.” | *We will.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      unsaid(x, t, '“wait up?”', P)
      drawBits(x, SHOE, { R: RED, W: BONE }, 790, 900, 18 * pop01(t, P.t0 + 0.9, 0.3, 2))
      label(x, 790, 1080, 'PACE: TOGETHER', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: GOLD, font: MONO, weight: 700 })
    } },
  { sign: S, cap: '“I’m nervous.” | Brave *includes that.*', mood: 'wide', look: [1, 0], star: { x: -170 }, squash: lt => 0.02 * Math.sin(lt * 40),
    front(x, t, lt, P) {
      unsaid(x, t, '“I’m nervous.”', P)
      label(x, 790, 880, 'FIRST DAY', pop01(t, P.t0 + 0.9, 0.3, 2), { size: 44, bg: ORANGE, rot: -0.05, font: MONO, weight: 700 })
      label(x, 790, 1060, 'STILL WENT. ✦', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: '“Was I too much?” | *Never.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: { x: -170 }, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      unsaid(x, t, '“was I a lot?”', P)
      label(x, 790, 900, 'JUST ENOUGH', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 46, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 900, P.t0 + 1.1, 7, 200, 0.4)
    } },
  { sign: S, cap: '“I miss you.” | *Text it first.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -180 }, hops: [1.5],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2); if (k <= 0.01) return
      x.save(); x.translate(800, 860); x.rotate(0.04); x.scale(k, k)
      x.fillStyle = INK; x.fillRect(-134, -206, 268, 412); x.fillStyle = '#2a2350'; x.fillRect(-126, -198, 252, 396); x.fillStyle = '#140c30'; x.fillRect(-112, -172, 224, 340)
      const typed = 'miss u'.slice(0, Math.floor(clamp((lt - 0.4) / 0.6) * 6))
      x.fillStyle = MINT; x.fillRect(-90, -40, 180, 70); x.fillStyle = INK; x.font = `800 34px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(typed || '…', 0, -4)
      if (lt > 1.4) { x.fillStyle = PINK; x.fillRect(-106, 60, 212, 70); x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.fillText('miss u MORE', 0, 96) }
      x.restore()
    } },
  { sign: S, cap: '“I was wrong.” | *Still a win.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -170 }, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      unsaid(x, t, '“I was… wrong.”', P)
      drawBits(x, TROPHY, TROPHY_C, 790, 920, 16 * pop01(t, P.t0 + 1.1, 0.35, 2))
      label(x, 790, 1100, 'GROWTH: UNLOCKED', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: GOLD, font: MONO, weight: 700 })
    } },
  { sign: S, cap: '“Did I do okay?” | *You did great.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', look: [1, 0], star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P, F) {
      unsaid(x, t, '“did I do okay?”', P)
      const d = ease.outCubic(prog(lt, 0.9, 1.3))
      if (lt > 0.85) drawBits(x, STAR_STK, { G: GOLD }, lerp(800, F.x + 40, d), lerp(900, F.top + 40, d), 12)
      sparkles(x, t, F.x + 40, F.top + 40, P.t0 + 1.3 * 1.29, 7, 120, 0.2)
    } },
]

const F = makeFilm({
  id: 'r2a0073', key: 'C', accent: RED, solo: 'aries', ending: 'callback',
  title: 'What an Aries | *won’t say.*',
  cameos: CAMEOS,
  group: { cap: 'All fire. | Big *soft heart.*', mood: 'heart' },
  last: {
    text: '“I was wrong.” | Still got *the trophy.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.4, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'aries', 420, 1050, 280 * k, { mood: lt > 1.4 ? 'sparkle' : 'happy', look: [1, 0], seed: 40, hops: [t - lt + 1.2] })
      drawBits(x, TROPHY, TROPHY_C, 690, 1040, 18 * pop01(t, t - lt + 0.8, 0.35, 2))
      sparkles(x, t, 690, 1020, t - lt + 1.2, 7, 160, 0.4)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
