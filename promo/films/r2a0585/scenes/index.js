// r2a0585: star_advice, ADVICE ROLLCALL, "How each sign | *keeps the spark alive.*" (signs3kit social cut, music: lofi · G).
// Twelve signs in zodiac order: one warm, specific way each sign keeps love fresh, with a light visual gag. Ending: card
// (lesson + last line over the Leo + Libra match card: Leo's loud compliments meet Libra still dressing up for date night).
//   ♈ plans surprise dates, tells you anyway · ♉ slow dances in the kitchen · ♊ still texts like it's week one · ♋ remembers
//   every anniversary · ♌ compliments you loudly, in public · ♍ notices the little things (fixes the squeaky door) · ♎ still
//   dresses up for date night · ♏ midnight deep talks · ♐ a spontaneous trip · ♑ date night in the calendar, never cancelled
//   · ♒ a new date idea every month · ♓ writes love notes, cries reading them
//   group "Different sparks. | *Same fire.*"  lesson "Love isn’t luck. | It’s *little choices.*"  SPARK: ON
//   last "Leo’s still shouting | *“gorgeous!!”*"
import { makeFilm, sparkles, hearts, bubble, signChar, pop01, drawBits, notes, label, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO } from '../../signs3kit.js'
import { L, sheet, phone, friend, bits, B, fitTitleScenes, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ff8fb1', ST = { x: -170 }
const DRESS = ['.P...P.', '.P...P.', '.PPPPP.', '..PPP..', '..PWP..', '.PPPPP.', '.PPPPP.', 'PPPPPPP', 'PPPPPPP', 'PPPPPPP']

const CAMEOS = [
  { sign: 'aries', cap: 'Plans surprise dates. | *Tells you anyway.*', mood: lt => lt > 1.2 ? 'wide' : 'sparkle', look: [1, 0], star: ST, hops: [0.6, 1.3],
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'SURPRISE! | it’s bowling!', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 40, col: '#ff8a7a', tail: 'bl' })
      L(x, 790, 960, 'SURPRISE: SPOILED', pop01(t, P.t0 + 1.3, 0.3, 2.2), GOLD, 0.04, 32)
    } },
  { sign: 'taurus', cap: 'Slow dances in the kitchen. | *No music needed.*', mood: 'heart', look: [1, 0], star: { x: -170 }, hops: [],
    front(x, t, lt, P) {
      friend(x, t, 'virgo', 790, 940 + Math.sin(t * 2) * 10, 220, pop01(t, P.t0 + 0.3, 0.35, 2), { mood: 'heart', look: [-1, 0], seed: 70 })
      notes(x, t, 600, 820, { n: 4, cell: 7, col: PINK, seed: 3, alpha: clamp(lt - 0.5) })
      L(x, 790, 690, 'KITCHEN: DANCE FLOOR', pop01(t, P.t0 + 1.0, 0.3, 2.2), GOLD, -0.04, 28)
    } },
  { sign: 'gemini', cap: 'Still texts like | *it’s the first week.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      phone(x, t, 790, 860, 1.12 * pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'YEAR 6', headCol: '#ffd23a', lines: [['thinking abt u', BONE, 1, true], ['u r so cute', BONE, 1, true], ['stoppp', PINK, lt > 1.1 ? pop01(lt, 1.1, 0.25, 2.2) : 0]], size: 22 })
    } },
  { sign: 'cancer', cap: 'Remembers every date. | *Even the tiny ones.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      sheet(x, 790, 880, 1.1 * pop01(t, P.t0 + 0.2, 0.3, 2), { w: 300, h: 300, head: 'CELEBRATING', headBg: SKYB, headInk: INK, lines: ['first date', 'first “hi”', 'first shared', 'fries'], size: 30, progress: prog(lt, 0.3, 1.3), rot: -0.04 })
    } },
  { sign: 'leo', cap: 'Compliments you. | *Loudly. In public.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.8, 1.4],
    front(x, t, lt, P) {
      bubble(x, 770, 760, 'MY PERSON IS | GORGEOUS!!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, col: '#ffb34a', tail: 'bl' })
      L(x, 790, 990, 'VOLUME: MAX', pop01(t, P.t0 + 1.2, 0.3, 2.2), BONE, 0.04, 34)
      sparkles(x, t, 790, 760, P.t0 + 0.5, 8, 200, 0.3)
    } },
  { sign: 'virgo', cap: 'Notices the little things. | *Fixed the squeaky door.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      bits(x, 'WRENCH', 790, 860, 18 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: Math.sin(t * 8) * 0.2 })
      L(x, 790, 700, 'SQUEAK: GONE', pop01(t, P.t0 + 1.0, 0.3, 2.2), MINT, -0.04, 34)
      L(x, 790, 1040, 'ALSO: YOUR FAV TEA', pop01(t, P.t0 + 1.5, 0.3, 2.2), GOLD, 0.04, 30)
    } },
  { sign: 'libra', cap: 'Still dresses up | *for date night.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, DRESS, { P: '#ff8fd8', W: GOLD }, 790, 880, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 690, 'DATE NIGHT: TUESDAY', pop01(t, P.t0 + 0.6, 0.3, 2), BONE, -0.04, 30)
      L(x, 790, 1090, 'OUTFIT 3 OF 3', pop01(t, P.t0 + 1.4, 0.3, 2.2), GOLD, 0.04, 32)
      sparkles(x, t, 790, 880, P.t0 + 1.0, 7, 170, 0.6)
    } },
  { sign: 'scorpio', cap: 'Deep talks at midnight. | *Every single time.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      bits(x, 'MOON', 790, 780, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 1000, 'what are you | REALLY afraid of?', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 32, col: '#e2c4ff', tail: 'bl' })
      L(x, 790, 1150, '12:00 AM. 3:00 AM.', pop01(t, P.t0 + 1.5, 0.3, 2.2), STEEL, 0.04, 28)
    } },
  { sign: 'sagittarius', cap: 'Books a spontaneous trip. | *Leaves on Friday.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.7, 1.4],
    front(x, t, lt, P) {
      bits(x, 'SUITCASE', 760, 950, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'PLANE', 830 + lt * 40, 760 - lt * 30, 14 * pop01(t, P.t0 + 0.6, 0.3, 2), { rot: -0.3 })
      L(x, 790, 1140, 'PACK. WE LEAVE AT 6.', pop01(t, P.t0 + 1.3, 0.3, 2.2), GOLD, -0.04, 30)
    } },
  { sign: 'capricorn', cap: 'Books date night. | *Never cancels.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      sheet(x, 790, 870, 1.1 * pop01(t, P.t0 + 0.2, 0.3, 2), { w: 300, h: 280, head: 'FRIDAY', headBg: STEEL, headInk: INK, lines: ['7:00', 'DATE NIGHT', '(do not move)'], size: 32, rot: 0.04 })
      L(x, 790, 1130, 'CANCELLED: NEVER', pop01(t, P.t0 + 1.4, 0.3, 2.2), MINT, -0.04, 32)
    } },
  { sign: 'aquarius', cap: 'A brand-new date idea. | *Every month.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.0],
    front(x, t, lt, P) {
      const I = ['IDEA: PICNIC ON THE ROOF', 'IDEA: BACKWARDS DINNER', 'IDEA: STARGAZING'], n = Math.min(2, Math.floor(Math.max(0, lt - 0.3) / 0.5))
      L(x, 790, 820, I[n], pop01(t, P.t0 + 0.3, 0.3, 2), MINT, -0.04, 28)
      L(x, 790, 1000, `IDEA #${37 + n}`, pop01(t, P.t0 + 0.6, 0.3, 2), GOLD, 0.04, 40)
    } },
  { sign: 'pisces', cap: 'Writes love notes. | *Cries reading them.*', mood: 'heart', tears: lt => lt < 0.8 ? 2 : 3, look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      sheet(x, 790, 870, 1.1 * pop01(t, P.t0 + 0.2, 0.3, 2), { w: 300, h: 280, head: 'DEAR YOU,', headBg: PINK, headInk: INK, lines: ['you are my', 'favourite', 'person…'], size: 32, rot: -0.04 })
      L(x, 790, 1130, 'NOTE NO. 212', pop01(t, P.t0 + 1.3, 0.3, 2.2), SKYB, 0.04, 32)
      hearts(x, t, 580, 780, P.t0 + 1.2, { n: 5, life: 1.6, spread: 140, cell: 7, seed: 3 })
    } },
]

const F = makeFilm({
  id: 'r2a0585', key: 'G', accent: ACC, ending: 'card',
  title: 'How each sign | *keeps the spark alive.*',
  cameos: CAMEOS,
  card: { a: 'leo', b: 'libra', chip: 'IT’S A MATCH' },
  group: { cap: 'Different sparks. | *Same fire.*', moods: Array(12).fill('heart') },
  lesson: { text: 'Love isn’t luck. | It’s *little choices.*', chip: 'SPARK: ON' },
  last: { text: 'Leo’s still shouting | *“gorgeous!!”*' },
})
export const DURATION = F.DURATION
export const SCENES = fitTitleScenes(F.SCENES)
export const CUES = F.CUES
export const T = F.T
