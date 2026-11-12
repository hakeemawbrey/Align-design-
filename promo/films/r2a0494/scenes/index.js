// r2a0494: star_advice, ADVICE ROLLCALL, "Each sign’s best | *roommate match.*" (~54 s vertical, signs3kit social cut,
// music: lofi · E). Twelve signs in zodiac order: each meets its best roommate sign (a small star beside it) and one warm,
// specific reason it works, with one light gag. Ending: lesson.
//   0.0–3.6    hook; the twelve line up, then dive into the pip row.
//   3.6–49.2   ♈+♐ spontaneous road trips · ♉+♋ soup on Sundays · ♊+♒ 3 a.m. debates · ♋+♓ movie nights, tissues ready
//              · ♌+♎ the cutest apartment · ♍+♑ the chore chart, respected · ♎+♊ never a quiet dinner
//              · ♏+♉ quiet nights, shared snacks · ♐+♈ yes to every plan · ♑+♍ bills paid early
//              · ♒+♊ weird ideas welcome · ♓+♋ someone tucks you in (tears, happy ones)
//  49.2        "Home sweet | *home.*"
//  52.4        LESSON: "Home is who | you *share it with.*"  ROOMMATES: ALIGNED
//  58.3        "Best roommate? | One who *gets you.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const CREAM = '#fff4e2', RED = '#e23d4e', ORANGE = '#ffb34a', DEEP = '#2a2350', GREEN = '#5fd068'
const ACC = '#ffc98f'
const ST = { x: -190 }
const L = (x, cx, cy, text, k, bg = GOLD, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700, color })
const R = (t, P, a = 0.2) => pop01(t, P.t0 + a, 0.3, 2)

/** the roommate: a smaller sign star on the right of the panel */
function mate(x, t, P, id, { mood = 'happy', tears = 0, y = 1000, xx = 820, s = 190 } = {}) {
  const k = R(t, P, 0.35)
  if (k > 0.01) signChar(x, t, id, xx, y, s * k, { mood, look: [-1, 0], seed: 50 + P.i, glyph: false, tears, hops: [P.t0 + 1.2] })
}
function note(x, cx, cy, k, lines, { w = 300, bg = '#ffe27a', size = 34, rot = -0.06, font = INTER, weight = 800 } = {}) {
  if (k <= 0.01) return
  const lh = size * 1.5, h = lines.length * lh + 46
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 10, -h / 2 + 12, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 8, -h / 2 - 8, w + 16, h + 16); x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = INK; x.font = `${weight} ${size}px ${font}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  lines.forEach((l, i) => x.fillText(l, 0, -h / 2 + 23 + lh * (i + 0.5)))
  x.restore()
}
const CAR = ['...RRRR...', '..RWWWWR..', 'RRRRRRRRRR', 'RRRRRRRRRR', '.KK....KK.']
const POT = ['..KKKKKKKK..', '.KSSSSSSSSK.', 'KK........KK', 'K.GGGGGGGG.K', 'K.GGGGGGGG.K', '.K........K.', '..KKKKKKKK..']
const POT_C = { K: INK, S: '#c9c9d8', G: '#9aa5c4' }
const TISSUE = ['...WW...', '..WWWW..', 'BBBBBBBB', 'BPPBBPPB', 'BBBBBBBB', 'BBBBBBBB']
const PLANT = ['.G.G.G.', 'GGGGGGG', '.GGGGG.', '..KKK..', '.TTTTT.', '.TTTTT.', '..TTT..']
const PLANT_C = { G: GREEN, K: INK, T: '#d0703a' }
const SNACK = ['.YYYYY.', 'YYrYYYY', 'YYYYYrY', 'PPPPPPP', 'PPWWWPP', 'PPPPPPP', '.PPPPP.']
const BULB = ['.YYYY.', 'YYYYYY', 'YYWYYY', 'YYYYYY', '.YYYY.', '.KKKK.', '.KKKK.']
const BLANKET = ['PPPPPPPPPP', 'PWPWPWPWPW', 'PPPPPPPPPP', 'PWPWPWPWPW']

const CAMEOS = [
  { sign: 'aries', cap: 'Room with *a Sag.* | Road trips, daily.', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      mate(x, t, P, 'sagittarius', { mood: 'sparkle' })
      drawBits(x, CAR, { R: RED, W: SKYB, K: INK }, 820, 740, 26 * R(t, P, 0.8))
      L(x, 820, 620, 'LEAVING: NOW', pop01(t, P.t0 + 1.3, 0.3, 2.2), GOLD, -0.04, 32)
    } },
  { sign: 'taurus', cap: 'Room with *a Cancer.* | Soup every Sunday.', mood: 'heart', star: ST,
    front(x, t, lt, P) {
      mate(x, t, P, 'cancer', { mood: 'heart' })
      drawBits(x, POT, POT_C, 820, 750, 24 * R(t, P, 0.7))
      if (lt > 0.8) for (let i = 0; i < 3; i++) { const ph = ((t * 0.7 + i / 3) % 1); x.save(); x.globalAlpha = Math.sin(Math.PI * ph) * 0.8; x.fillStyle = '#e6e1f2'; x.fillRect(780 + i * 40, 680 - ph * 100, 20, 24); x.restore() }
      L(x, 820, 1130, 'SECONDS? ALWAYS', pop01(t, P.t0 + 1.4, 0.3, 2.2), GOLD, 0.04, 30)
    } },
  { sign: 'gemini', cap: 'Room with *an Aquarius.* | 3 a.m. debates.', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      mate(x, t, P, 'aquarius', { mood: lt > 1.4 ? 'wide' : 'squint' })
      bubble(x, 620, 680, 'but WHY | is the sky?', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 32, tail: 'bl' })
      bubble(x, 840, 780, 'ok hear | me out…', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 32, col: LAV, tail: 'br' })
    } },
  { sign: 'cancer', cap: 'Room with *a Pisces.* | Movie nights, tissues ready.', mood: 'heart', star: ST,
    front(x, t, lt, P) {
      mate(x, t, P, 'pisces', { mood: 'sparkle', tears: 2 })
      drawBits(x, TISSUE, { W: '#ffffff', B: SKYB, P: PINK }, 820, 740, 22 * R(t, P, 0.7))
      L(x, 820, 1130, 'BOTH CRYING. HAPPY.', pop01(t, P.t0 + 1.4, 0.3, 2.2), LAV, 0.04, 28)
    } },
  { sign: 'leo', cap: 'Room with *a Libra.* | Cutest apartment ever.', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      mate(x, t, P, 'libra', { mood: 'sparkle' })
      drawBits(x, PLANT, PLANT_C, 680, 700, 18 * R(t, P, 0.6))
      L(x, 860, 680, 'GOLD MIRROR ✦', pop01(t, P.t0 + 1.0, 0.3, 2.2), GOLD, 0.05, 28)
      sparkles(x, t, 820, 900, P.t0 + 1.3, 7, 170, 0.4)
    } },
  { sign: 'virgo', cap: 'Room with *a Capricorn.* | Chore chart: respected.', mood: lt => lt < 1.3 ? 'squint' : 'heart', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      mate(x, t, P, 'capricorn', { mood: 'happy' })
      note(x, 820, 730, R(t, P, 0.6), ['CHORES', 'dishes ✓', 'bins ✓'], { w: 240, bg: CREAM, size: 30, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Room with *a Gemini.* | Never a quiet dinner.', mood: 'happy', look: [1, 0], star: ST, hops: [1.5],
    front(x, t, lt, P) {
      mate(x, t, P, 'gemini', { mood: 'sparkle' })
      bubble(x, 820, 740, 'AND THEN—', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 40, tail: 'bc' })
      L(x, 820, 1130, 'DESSERT: 2 HRS LATER', pop01(t, P.t0 + 1.5, 0.3, 2.2), PINK, 0.04, 26)
    } },
  { sign: 'scorpio', cap: 'Room with *a Taurus.* | Quiet nights, shared snacks.', mood: lt => lt < 1.2 ? 'neutral' : 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      mate(x, t, P, 'taurus', { mood: 'happy' })
      drawBits(x, SNACK, { Y: '#ffd23a', r: ORANGE, P: LAV, W: CREAM }, 820, 750, 22 * R(t, P, 0.7))
      L(x, 820, 600, 'NO SMALL TALK ♡', pop01(t, P.t0 + 1.3, 0.3, 2.2), MINT, -0.04, 30)
    } },
  { sign: 'sagittarius', cap: 'Room with *an Aries.* | Yes to every plan.', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.1, 1.6],
    front(x, t, lt, P) {
      mate(x, t, P, 'aries', { mood: 'sparkle' })
      bubble(x, 620, 680, 'skydiving?', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 34, tail: 'bl' })
      bubble(x, 840, 780, 'YES.', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 44, col: GOLD, tail: 'br' })
    } },
  { sign: 'capricorn', cap: 'Room with *a Virgo.* | Bills paid early.', mood: lt => lt < 1.2 ? 'neutral' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      mate(x, t, P, 'virgo', { mood: 'happy' })
      note(x, 820, 730, R(t, P, 0.6), ['RENT', 'PAID ✓', '(a week early)'], { w: 260, bg: MINT, size: 30, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Room with *a Gemini.* | Weird ideas welcome.', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      mate(x, t, P, 'gemini', { mood: 'wide' })
      drawBits(x, BULB, { Y: '#ffe27a', W: '#ffffff', K: INK }, 820, 730, 22 * R(t, P, 0.7))
      L(x, 820, 1130, 'INVENTION #6: A HAT FAN', pop01(t, P.t0 + 1.3, 0.3, 2.2), SKYB, 0.04, 24)
    } },
  { sign: 'pisces', cap: 'Room with *a Cancer.* | Someone tucks you in.', mood: lt => lt < 1.2 ? 'sparkle' : 'heart', tears: 2, star: { x: -190, y: 20 },
    front(x, t, lt, P) {
      mate(x, t, P, 'cancer', { mood: 'heart' })
      const k = R(t, P, 1.0)
      if (k > 0.01) drawBits(x, BLANKET, { P: PINK, W: CREAM }, 350, lerp(980, 1040, k), 24 * k)
      hearts(x, t, 600, 860, P.t0 + 1.4, { n: 5, life: 1.6, spread: 200, cell: 7, seed: 3 })
    } },
]

const F = makeFilm({
  id: 'r2a0494', key: 'E', accent: ACC, ending: 'lesson',
  title: 'Each sign’s best | *roommate match.*',
  cameos: CAMEOS,
  group: { cap: 'Home sweet | *home.*' },
  lesson: { text: 'Home is who | you *share it with.*', chip: 'ROOMMATES: ALIGNED' },
  last: {
    text: 'Best roommate? | One who *gets you.*',
    draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 0.3, { n: 10, life: 2.2, spread: 700, cell: 8, seed: 5 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
