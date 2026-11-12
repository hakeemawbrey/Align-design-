// r2a0323: star_advice, ADVICE SOLO (scorpio), "Scorpio, you're allowed | to want more." (signs3kit social cut, music:
// lofi · C). Nine warm permissions, one gag each. Ending: callback (crumbs → the whole cake).
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', CREAM = '#fff4e2', ACC = '#c97bff'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700 })
const CAKE = ['....Y.Y.Y....', '....R.R.R....', '.PPPPPPPPPPP.', '.PWWWWWWWWWP.', '.PPPPPPPPPPP.', 'CCCCCCCCCCCCC', 'CCCCCCCCCCCCC', 'KKKKKKKKKKKKK']
const CAKE_C = { Y: GOLD, R: RED, P: PINK, W: CREAM, C: '#fff0f5', K: INK }
const PLATE = ['..WWWWWWWWW..', '.WWWWWWWWWWW.', 'WWWWWWWWWWWWW', '.WWWWWWWWWWW.']
const SHOVEL = ['..KKK..', '..KWK..', '...K...', '...K...', '...K...', '...K...', '...K...', '.SSSSS.', 'SSSSSSS', 'SSSSSSS', '.SSSSS.', '..SSS..']
const SCROLL = ['KKKKKKKKK', 'KWWWWWWWK', 'KWKKKKKWK', 'KWWWWWWWK', 'KWKKKKWWK', 'KWWWWWWWK', 'KWKKKKKWK', 'KWWWWWWWK', 'KKKKKKKKK']
const SCALE = ['......K......', '.....KKK.....', 'KKKKKKKKKKKKK', 'K.....K.....K', 'K.....K.....K', 'YYY...K...YYY', '......K......', '....KKKKK....']
const BADGE = ['..YYYYY..', '.YYYYYYY.', 'YYYKYKYYY', 'YYYYYYYYY', 'YYKYYYKYY', '.YYKKKYY.', '..YYYYY..', '..R...R..', '.RR...RR.']

/** a quiz sheet, crossed out at x */
function quiz(x, cx, cy, k, cross) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-136, -166, 272, 332); x.fillStyle = CREAM; x.fillRect(-128, -158, 256, 316)
  x.fillStyle = INK; x.font = `800 26px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('LOYALTY QUIZ', 0, -126)
  x.font = `700 22px ${MONO}`; x.textAlign = 'left'
  ;['1. trap?', '2. test?', '3. riddle?', '4. bonus trap'].forEach((q, i) => x.fillText(q, -108, -70 + i * 52))
  if (cross > 0) { x.strokeStyle = RED; x.lineWidth = 12; x.lineCap = 'round'; x.beginPath(); x.moveTo(-110, -130); x.lineTo(-110 + 220 * cross, -130 + 260 * cross); x.stroke() }
  x.restore()
}
function billboard(x, cx, cy, k, text) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-20, 60, 14, 160); x.fillRect(6, 60, 14, 160)
  x.fillStyle = INK; x.fillRect(-170, -90, 340, 160); x.fillStyle = GOLD; x.fillRect(-160, -80, 320, 140)
  x.fillStyle = INK; x.font = `800 34px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  text.split('|').forEach((s, i, a) => x.fillText(s, 0, -10 + (i - (a.length - 1) / 2) * 44))
  x.restore()
}

const S = 'scorpio', ST = { x: -170 }
const CAMEOS = [
  { sign: S, cap: 'Always “I’m fine”? | You can *ask for more.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 780, 660, "I'm fine.", pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 44, col: LAV, tail: 'bl' })
      bubble(x, 790, 880, '...a hug, | actually?', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 40, col: MINT, tail: 'bl' })
      hearts(x, t, 640, 1140, P.t0 + 1.5, { n: 4, life: 1.4, spread: 140, cell: 7, seed: 3 })
    } },
  { sign: S, cap: 'Craving the deep talk? | *Ask for it.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, SHOVEL, { K: '#8a4a2e', W: '#c9915a', S: '#c9c9d8' }, 790, 860, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.35 })
      L(x, 790, 640, 'SMALL TALK: SKIPPED', pop01(t, P.t0 + 0.8, 0.3, 2.4), BONE, -0.04, 30)
      L(x, 790, 1120, 'DIGGING DEEPER', pop01(t, P.t0 + 1.4, 0.3, 2.4), ACC, 0.04, 34)
    } },
  { sign: S, cap: 'No more loyalty tests. | *Just ask.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      quiz(x, 790, 840, pop01(t, P.t0 + 0.2, 0.3, 2), ease.outCubic(prog(lt, 0.8, 1.2)))
      bubble(x, 790, 1110, 'can we talk?', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 40, col: MINT, tail: 'bl' })
    } },
  { sign: S, cap: 'Want the big dream? | *Say it out loud.*', mood: lt => lt > 1.0 ? 'sparkle' : 'wide', look: [1, -1], star: ST, hops: [1.0],
    front(x, t, lt, P) {
      bubble(x, 780, 660, 'I want...', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, col: LAV, tail: 'bl' })
      bubble(x, 760, 860, 'EVERYTHING.', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 46, col: GOLD, tail: 'bl' })
      sparkles(x, t, 790, 860, P.t0 + 1.0, 8, 200, 0.4)
      L(x, 790, 1080, 'VALID', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, -0.04, 40)
    } },
  { sign: S, cap: 'Tired of crumbs? | Ask for *the cake.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, PLATE, { W: CREAM }, 790, 1000, 18 * k)
      if (lt < 1.0) { x.fillStyle = '#e8a24a'; for (let i = 0; i < 3; i++) x.fillRect(760 + i * 22, 975 - (i % 2) * 6, 10, 10) }
      else drawBits(x, CAKE, CAKE_C, 790, 900, 22 * pop01(t, P.t0 + 1.0, 0.35, 2))
      L(x, 790, 640, lt < 1.0 ? 'OFFERED: CRUMBS' : 'ASKED: THE CAKE', 1 * k, lt < 1.0 ? BONE : PINK, -0.04, 32)
    } },
  { sign: S, cap: 'You give everything. | *Expect it back.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const b = lerp(0.3, 0, ease.inOutCubic(prog(lt, 0.6, 1.3)))
      drawBits(x, SCALE, { K: BONE, Y: GOLD }, 790, 860, 24 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: b })
      L(x, 790, 1080, 'EFFORT: MATCHED', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, -0.04, 34)
    } },
  { sign: S, cap: 'Keeping a list? | You can *want peace.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const p = ease.inCubic(prog(lt, 0.9, 1.4))
      drawBits(x, SCROLL, { K: INK, W: CREAM }, 790, lerp(840, 1060, p), 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: p * 0.5 })
      L(x, 790, 640, lt < 1.3 ? 'THE LIST' : 'THE LIST: RETIRED', pop01(t, P.t0 + 0.4, 0.3, 2), lt < 1.3 ? RED : MINT, -0.04, 34)
    } },
  { sign: S, cap: 'Want to be chosen? | *Out loud.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      billboard(x, 790, 820, pop01(t, P.t0 + 0.3, 0.35, 2), 'I PICK|SCORPIO')
      L(x, 790, 1120, 'IT’S A MATCH ✦', pop01(t, P.t0 + 1.3, 0.3, 2.4), PINK, 0.04, 34)
    } },
  { sign: S, cap: 'Asking isn’t weak. | It’s *brave.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, BADGE, { Y: GOLD, K: INK, R: RED }, 790, 840, 20 * pop01(t, P.t0 + 0.4, 0.35, 2), { rot: 0.08 })
      sparkles(x, t, 790, 840, P.t0 + 0.6, 8, 160, 0.4)
      L(x, 790, 1070, 'BRAVE: CERTIFIED', pop01(t, P.t0 + 1.1, 0.3, 2.4), MINT, -0.04, 32)
    } },
]

const F = makeFilm({
  id: 'r2a0323', key: 'C', accent: ACC, solo: 'scorpio', ending: 'callback',
  title: 'Scorpio, it’s okay | to *want more.*',
  cameos: CAMEOS,
  group: { cap: 'Ask big. | You’re *worth it.*', mood: 'heart' },
  last: {
    text: 'The whole cake. | *Yours.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const k = pop01(t, t0 + 0.2, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'scorpio', 380, 1080, 280 * k, { mood: lt > 1.2 ? 'heart' : 'happy', seed: 7, look: [1, 0], hops: [t0 + 1.3] })
      drawBits(x, CAKE, CAKE_C, 760, 1100, 26 * pop01(t, t0 + 0.6, 0.4, 2))
      if (lt > 1.4) hearts(x, t, 600, 1000, t0 + 1.4, { n: 6, life: 1.6, spread: 360, cell: 8, seed: 5 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
