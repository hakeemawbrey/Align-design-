// v3a134: ADVICE ROLL CALL, "Each sign in | healthy love." (topic: in a healthy relationship) (~57 s vertical, signs3kit social cut, music: lofi · G)
// Twelve signs, one warm line each: what good love looks like on them. Ending: callback (Libra decided: pasta).
//   ♈ competitive, now on the same team · ♉ sofa date nights · ♊ talks it through, no ghosting · ♋ shell: optional
//   ♌ compliments, 2 for 1 · ♍ lets the dishes wait (trying) · ♎ says what they want: pasta, in 2 sec
//   ♏ detective: retired · ♐ back for dinner · ♑ Friday date, no work emails · ♒ space given, hugs on request
//   ♓ matched a year, happy tears only
//   49.2 "Love looks | *good on everyone.*"   52.6 "Libra picked dinner. | *Pasta, obviously.*"
import { prog, ease } from '../../../src/lib.js'
import { makeFilm, sparkles, hearts, bubble, label, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO } from '../../signs3kit.js'
import { phone, note, calendar, bits, ORANGE, RED, PAPER } from '../props.js'

const L = { x: -160 }
const LENS = [['..WWWW....', '.W....W...', 'W..SS..W..', 'W..S...W..', 'W......W..', '.W....W...', '..WWWWWB..', '.......BB.', '........BB'], { W: BONE, S: SKYB, B: '#8a5a3a' }]
const PASTA = [['.Y.Y.Y.Y.', 'YYYYYYYYY', '.YRYYRYY.', 'BBBBBBBBB', 'BWWWWWWWB', '.BWWWWWB.', '..BBBBB..'], { Y: '#ffd98a', R: RED, B: SKYB, W: PAPER }]
const CAMEOS = [
  { sign: 'aries', cap: 'Still competitive. | Now *on the same team.*', mood: 'sparkle', look: [1, 0], star: L, hops: [1.2],
    front(x, t, lt, P) {
      bits(x, 'trophy', 790, 820, 22 * pop01(t, P.t0 + 0.3, 0.3, 2))
      label(x, 790, 1040, 'TEAM: US', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 50, bg: RED, color: BONE, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Cozy nights in | *feel like dates.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: L,
    front(x, t, lt, P) {
      bits(x, 'mug', 730, 870, 14 * pop01(t, P.t0 + 0.3, 0.3, 2))
      bits(x, 'mug', 870, 870, 14 * pop01(t, P.t0 + 0.6, 0.3, 2))
      label(x, 800, 680, 'DATE NIGHT: SOFA', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 38, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 800, 1080, P.t0 + 1.2, { n: 4, life: 1.0, spread: 140, cell: 6, seed: 3 })
    } },
  { sign: 'gemini', cap: 'Talks it through. | *Doesn’t ghost.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: L,
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'can we talk? | (nicely)', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 44, tail: 'bl' })
      bubble(x, 790, 880, 'of course ♡', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 44, tail: 'br', col: LAV })
      label(x, 790, 1070, 'TALKED. SORTED.', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 36, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Out of the shell. | *Staying out.*', mood: lt => lt > 1.0 ? 'sparkle' : 'neutral', star: L, hops: [1.0],
    front(x, t, lt, P) {
      bits(x, 'shell', 800, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 800, 700, 'SHELL: OPTIONAL', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 40, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Gets a compliment. | Gives back *double.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, 0], star: L,
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'cute shirt!', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 44, tail: 'br', col: LAV })
      bubble(x, 790, 880, 'YOU’RE cute. | and SMART.', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 44, tail: 'bl' })
      label(x, 790, 1080, '2 FOR 1', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 40, bg: ORANGE, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Lets the dishes wait. | *Sometimes.*', mood: lt => lt > 1.5 ? 'happy' : 'squint', look: [1, 0], star: L,
    front(x, t, lt, P) {
      for (let i = 0; i < 4; i++) { const k = pop01(t, P.t0 + 0.2 + i * 0.12, 0.3, 2); x.fillStyle = INK; x.fillRect(690, 960 - i * 46, 200 * k, 40); x.fillStyle = PAPER; x.fillRect(696, 966 - i * 46, 188 * k, 28) }
      label(x, 790, 720, 'DISHES: LATER', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 42, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1080, 'relaxed (trying)', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 32, bg: BONE, rot: 0.04 })
    } },
  { sign: 'libra', cap: 'Says what they want. | *Out loud.*', mood: lt => lt > 1.0 ? 'sparkle' : 'wide', look: [1, 0], star: L, hops: [1.0], keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'I want | pasta.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 58, tail: 'bl' })
      label(x, 790, 960, 'DECIDED IN: 2 SEC', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 36, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 700, P.t0 + 1.1, 8, 200, 0.1)
    } },
  { sign: 'scorpio', cap: 'Trusts you. | *Investigates never.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: L,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), drop = ease.inCubic(prog(lt, 0.9, 1.4))
      drawBits(x, LENS[0], LENS[1], 790, 800 + drop * 240, 18 * k, { rot: drop * 1.2, alpha: 1 - 0.3 * drop })
      label(x, 790, 680, 'DETECTIVE: RETIRED', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 36, bg: '#b07dff', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Roams free. | *Still comes home.*', mood: 'sparkle', look: [1, 0], star: L, hops: [1.3],
    front(x, t, lt, P) {
      bits(x, 'house', 790, 860, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1080, 'BACK FOR DINNER', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 38, bg: ORANGE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Books the date. | *Leaves work at work.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: L,
    front(x, t, lt, P) {
      calendar(x, 790, 780, pop01(t, P.t0 + 0.2, 0.3, 2), 'FRIDAY', 'DATE')
      label(x, 790, 1060, 'WORK EMAILS: OFF', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 36, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Space when needed. | *Hugs when asked.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: L,
    front(x, t, lt, P) {
      label(x, 790, 720, 'SPACE: GIVEN', pop01(t, P.t0 + 0.3, 0.3, 2.2), { size: 46, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 900, 'HUGS: ON REQUEST', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 40, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
      hearts(x, t, 790, 1100, P.t0 + 1.4, { n: 4, life: 1.6, spread: 160, cell: 6, seed: 5 })
    } },
  { sign: 'pisces', cap: 'Cries happy tears. | *For once.*', mood: 'heart', tears: lt => lt < 1.0 ? 1 : 2, star: L,
    front(x, t, lt, P) {
      label(x, 790, 720, '✦ MATCHED: 1 YEAR', pop01(t, P.t0 + 0.3, 0.3, 2.2), { size: 38, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 900, 'HAPPY TEARS ONLY', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 40, bg: SKYB, rot: 0.04 })
      hearts(x, t, 790, 1100, P.t0 + 1.2, { n: 5, life: 1.8, spread: 220, cell: 7, seed: 7 })
    } },
]

const F = makeFilm({
  id: 'v3a134', key: 'G', accent: PINK, ending: 'callback',
  title: 'Each sign in | *healthy love.*',
  cameos: CAMEOS,
  group: { cap: 'Love looks | *good on everyone.*' },
  last: {
    text: 'Libra picked dinner. | *Pasta, obviously.*',
    draw(x, t, lt) { const k = pop01(t, t - lt + 0.7, 0.35, 2); drawBits(x, PASTA[0], PASTA[1], 540, 1180, 44 * k); sparkles(x, t, 540, 1180, t - lt + 1.0, 8, 220, 0.4) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
