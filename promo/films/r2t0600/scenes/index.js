// r2t0600: star_talk, BELIKE, "“Be honest.” | *Zodiacs be like.*" (signs3kit social cut, music: lofi · F).
// Twelve signs in zodiac order, each the most extreme version of itself when someone says "be honest":
//   ♈ already yelling it · ♉ "needs more cheese" · ♊ "define honest?" · ♋ says it gently, then cries for you
//   · ♌ makes it about themself · ♍ a twelve-point list · ♎ "it's… nice?" · ♏ brutal, then a hug · ♐ "NO." before you
//   finish asking · ♑ books a feedback meeting · ♒ honest, in riddles · ♓ can't say it, cries instead
// Ending: callback. "Taurus’s review? | *Ate it anyway.*" (the 6/10 pizza comes back, gone).
import { makeFilm, sparkles, hearts, bubble, signChar, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, swapLabel, friend, bits, C, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#f2c75c', ST = { x: -160 }
const EMPTY = ['..PPPPPPPP..', '.PFFFFFFFFP.', 'PFFCFFFFFFFP', 'PFFFFFFCFFFP', 'PFCFFFFFFFFP', '.PFFFFFFFFP.', '..PPPPPPPP..']
const EMPTY_C = { P: BONE, F: '#ffffff', C: '#c98f2a' }

const CAMEOS = [
  { sign: 'aries', cap: '“Be honest?” | Already *yelling it.*', mood: 'wide', look: [1, 0], star: ST, hops: [0.4, 0.8],
    front(x, t, lt, P) {
      bubble(x, 790, 760, 'IT’S BAD!!', pop01(t, P.t0 + 0.3, 0.25, 2.4), { size: 64, col: '#ff6b5a', tail: 'bl' })
      L(x, 800, 1060, 'FILTER: NONE', pop01(t, P.t0 + 1.2, 0.3, 2.4), GOLD, 0.04, 36)
    } },
  { sign: 'taurus', cap: 'Honest review: | *needs more cheese.*', mood: 'squint', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'PIZZA', 820, 880, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 3.14 })
      L(x, 800, 1080, 'RATING: 6/10', pop01(t, P.t0 + 1.0, 0.3, 2.4), MINT, -0.04, 38)
    } },
  { sign: 'gemini', cap: 'Asked three questions | *first.*', mood: 'squint', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      bubble(x, 780, 680, 'define honest?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 38, col: SKYB, tail: 'bl' })
      bubble(x, 820, 860, 'like, how honest?', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 34, tail: 'bl' })
      L(x, 800, 1060, 'CLARIFYING… (3/3)', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, 0.04, 30)
    } },
  { sign: 'cancer', cap: 'Says it gently. | *Then cries* for you.', mood: lt => lt > 1.1 ? 'wide' : 'happy', look: [1, 0], tears: lt => lt > 1.1 ? 2 : 0, star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'it’s… a lot? ♡', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 38, col: PINK, tail: 'bl' })
      bits(x, 'TISSUE', 830, 930, 14 * pop01(t, P.t0 + 1.0, 0.3, 2))
    } },
  { sign: 'leo', cap: 'Honestly? | *Talks about themself.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.8, 1.5],
    front(x, t, lt, P, F) {
      bubble(x, 790, 720, 'anyway, ME—', pop01(t, P.t0 + 0.4, 0.25, 2.4), { size: 52, col: GOLD, tail: 'bl' })
      sparkles(x, t, F.x, F.cy, P.t0 + 0.6, 7, 170, 0.1)
      L(x, 800, 1060, 'TOPIC: CHANGED', pop01(t, P.t0 + 1.4, 0.3, 2.4), LAV, -0.04, 34)
    } },
  { sign: 'virgo', cap: 'Sends a | *bullet-point list.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 840, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 330, h: 320, head: 'FEEDBACK (12)', headBg: MINT, headInk: INK, align: 'left', size: 30, lines: ['• the font', '• the colours', '• the vibe', '• also…'], progress: clamp((lt - 0.3) / 1.0) })
      L(x, 800, 1090, 'WITH LOVE, THOUGH', pop01(t, P.t0 + 1.5, 0.3, 2.4), PINK, -0.04, 30)
    } },
  { sign: 'libra', cap: 'Your profile photo? | *“It’s… nice?”*', mood: lt => lt > 1.1 ? 'wide' : 'squint', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      phone(x, t, 800, 840, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'YOUR PROFILE', headCol: PINK, size: 22, lines: [] })
      if (pop01(t, P.t0 + 0.2, 0.3, 2) > 0.9) friend(x, t, 'cancer', 800, 860, 150, 1, { mood: 'happy', seed: 55 })
      swapLabel(x, 800, 1080, lt, 1.0, 'GOOD? BAD?', 'IT’S… NICE?', { size: 36, fromBg: STEEL, toBg: PINK })
    } },
  { sign: 'scorpio', cap: 'Brutally honest. | *Then a hug.*', mood: lt => lt > 1.2 ? 'heart' : 'squint', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P, F) {
      bubble(x, 790, 720, 'it’s awful.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 46, col: LAV, tail: 'bl' })
      if (lt > 1.2) hearts(x, t, F.x, F.cy - 60, P.t0 + 1.2, { n: 6, life: 1.6, spread: 180, cell: 7, seed: 6 })
      L(x, 800, 1060, 'HUG INCLUDED ♡', pop01(t, P.t0 + 1.3, 0.3, 2.4), PINK, 0.04, 36)
    } },
  { sign: 'sagittarius', cap: 'Answered before | you *finished asking.*', mood: 'happy', look: [1, 0], star: ST, hops: [0.3],
    front(x, t, lt, P) {
      bubble(x, 600, 650, 'be hon—', pop01(t, P.t0 + 0.2, 0.2, 2.2), { size: 34, col: STEEL, tail: 'bl' })
      bubble(x, 820, 860, 'NO.', pop01(t, P.t0 + 0.4, 0.25, 2.6), { size: 96, col: GOLD, tail: 'bl' })
      L(x, 800, 1090, 'RESPONSE TIME: 0.2s', pop01(t, P.t0 + 1.3, 0.3, 2.4), MINT, -0.04, 30)
    } },
  { sign: 'capricorn', cap: 'Booked a | *feedback meeting.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 830, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 320, h: 280, head: 'CALENDAR', headBg: STEEL, headInk: INK, size: 32, lines: ['3:00 PM', 're: your outfit', '(agenda attached)'], progress: clamp((lt - 0.3) / 0.9) })
      L(x, 800, 1080, 'ATTENDANCE: REQUIRED', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, 0.04, 30)
    } },
  { sign: 'aquarius', cap: 'Honest, but | *in riddles.*', mood: 'sparkle', look: [1, -1], star: ST, hops: [1.1],
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'it’s… cosmic?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 46, col: SKYB, tail: 'bl' })
      L(x, 800, 1060, 'MEANING: UNCLEAR', pop01(t, P.t0 + 1.2, 0.3, 2.4), LAV, -0.04, 34)
    } },
  { sign: 'pisces', cap: 'Can’t say it. | *Cries* instead.', mood: 'wide', look: [1, 0], tears: lt => lt < 0.8 ? 2 : 3, star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'it’s… it’s…', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 44, col: LAV, tail: 'bl' })
      L(x, 800, 1060, 'SO, BAD THEN?', pop01(t, P.t0 + 1.2, 0.3, 2.4), SKYB, 0.04, 34)
    } },
]

const F = makeFilm({
  id: 'r2t0600', key: 'F', accent: ACC, ending: 'callback',
  title: '“Be honest.” | *Zodiacs be like.*',
  cameos: CAMEOS,
  group: { cap: 'Asked for honesty. | *Got twelve answers.*' },
  last: {
    text: 'Taurus’s review? | *Ate it anyway.*',
    draw(x, t, lt) {
      const t0 = t - lt
      if (lt > 1.3) drawBits(x, EMPTY, EMPTY_C, 740, 1080, 22)
      else bits(x, 'PIZZA', 740, 1080, 24 * pop01(t, t0 + 0.4, 0.3, 2), { rot: 3.14 })
      const k = pop01(t, t0 + 0.6, 0.4, 2)
      if (k > 0.01) signChar(x, t, 'taurus', 340, 1080, 320 * k, { mood: lt > 1.3 ? 'heart' : 'squint', look: [1, 0], seed: 88, glyph: false, hops: [t0 + 1.35] })
      if (lt > 1.3) label(x, 740, 1260, '10/10', pop01(t, t0 + 1.4, 0.3, 2.4), { size: 44, bg: MINT, rot: -0.05 })
    },
  },
})
import { label } from '../../signs3kit.js'
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
