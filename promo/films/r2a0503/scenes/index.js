// r2a0503: star_advice, ADVICE SOLO (capricorn), "Capricorn, log off | at five." (signs3kit social cut, music: lofi · C).
// Nine cards, a relatable Capricorn truth + a warm reframe: it's 5:01, the laptop can close · your worth isn't your
// output · emails at 11 p.m. are tomorrow's problem · rest is productive · hobbies don't need to make money · say yes
// to dinner · call your mom back · out-of-office on, guilt off · a match asked about your weekend, have one.
// Ending: lesson ("You already | earned your rest.") then "See you tomorrow. | At nine."
import { makeFilm, sparkles, hearts, bubble, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO } from '../../signs3kit.js'
import { L, sheet, phone, steam, zzz, swapLabel, friend, bits, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#7dffb0', ST = { x: -180 }, SG = 'capricorn'

const CAMEOS = [
  { sign: SG, cap: 'It’s 5:01. | The laptop can *close.*', mood: lt => lt > 1.4 ? 'sparkle' : 'neutral', look: [1, 0], star: ST, hops: [1.5],
    front(x, t, lt, P) {
      const shut = ease.inOutCubic(prog(lt, 0.9, 1.3))
      bits(x, 'LAPTOP', 800, 900, 18 * pop01(t, P.t0 + 0.2, 0.3, 2), { sy: lerp(1, 0.25, shut) })
      L(x, 800, 690, '5:01 PM', pop01(t, P.t0 + 0.5, 0.3, 2.2), STEEL, 0.04, 40)
      L(x, 800, 1080, 'CLICK. ♡', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, -0.04, 38)
    } },
  { sign: SG, cap: 'Your worth isn’t | your *output.*', mood: 'heart', look: [1, 0], star: ST, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      sheet(x, 800, 840, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 340, h: 300, head: 'YOU', headBg: PINK, headInk: INK, lines: ['kind', 'funny', 'loved'], size: 38, progress: clamp((lt - 0.4) / 1.0) })
      L(x, 800, 1080, 'NOT A KPI', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, -0.04, 36)
    } },
  { sign: SG, cap: 'Emails at 11 p.m.? | *Tomorrow’s* problem.', mood: lt => lt > 1.2 ? 'sleepy' : 'wide', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      bits(x, 'MOON', 800, 720, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 800, 960, lt > 1.2 ? 'snooze ♡' : 'NEW EMAIL', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 40, col: lt > 1.2 ? LAV : BONE, tail: 'bl' })
      if (lt > 1.3) zzz(x, t, 420, 700)
    } },
  { sign: SG, cap: 'Rest is *productive.* | Promise.', mood: 'sleepy', look: [1, 0], star: ST,
    front(x, t, lt, P, F) {
      bits(x, 'PILLOW', F.x, F.cy + 120, 16 * pop01(t, P.t0 + 0.2, 0.3, 2))
      zzz(x, t, 470, 700)
      sheet(x, 800, 840, pop01(t, P.t0 + 0.5, 0.35, 2), { w: 300, h: 220, head: 'TO DO', headBg: STEEL, headInk: INK, lines: [lt > 1.3 ? '[x] nap' : '[ ] nap'], size: 40 })
      L(x, 800, 1030, 'DONE. GREAT WORK.', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, -0.04, 30)
    } },
  { sign: SG, cap: 'Hobbies don’t need | to *make money.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      bits(x, 'BOOK', 800, 860, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.06 })
      swapLabel(x, 800, 1060, lt, 1.1, 'PROFIT: ?', 'JUST FOR FUN', { size: 32, fromBg: STEEL, toBg: GOLD })
    } },
  { sign: SG, cap: 'Say yes to dinner. | Not *one more task.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      friend(x, t, 'cancer', 700, 900, 200, pop01(t, P.t0 + 0.3, 0.3, 2), { mood: 'heart', look: [-1, 0], seed: 24 })
      friend(x, t, 'taurus', 900, 900, 200, pop01(t, P.t0 + 0.5, 0.3, 2), { mood: 'happy', look: [-1, 0], seed: 25 })
      bits(x, 'PIZZA', 800, 1070, 14 * pop01(t, P.t0 + 0.8, 0.3, 2), { rot: 3.14 })
      L(x, 800, 680, 'TABLE FOR 3', pop01(t, P.t0 + 1.2, 0.3, 2.4), GOLD, 0.04, 36)
    } },
  { sign: SG, cap: 'Call your mom back. | *She misses you.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      bits(x, 'HOUSE', 800, 900, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 770, 690, 'MOM: call me? ♡', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 32, col: PINK, tail: 'bl' })
      L(x, 800, 1100, 'CALLING…', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, -0.04, 34)
      hearts(x, t, 800, 820, P.t0 + 1.5, { n: 5, life: 1.5, spread: 160, cell: 7, seed: 8 })
    } },
  { sign: SG, cap: 'Out-of-office on. | *Guilt* off.', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      L(x, 800, 720, 'OUT OF OFFICE', pop01(t, P.t0 + 0.2, 0.3, 2.2), SKYB, 0.04, 36)
      swapLabel(x, 800, 900, lt, 1.0, 'GUILT: ON', 'GUILT: OFF', { size: 42, fromBg: RED, toBg: MINT })
      sparkles(x, t, 800, 900, P.t0 + 1.4, 6, 160, 0.2)
    } },
  { sign: SG, cap: 'A match asked about | your *weekend.* Have one.', mood: lt => lt > 1.3 ? 'heart' : 'wide', look: [1, 0], star: ST, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'NEW MATCH ♑︎', headCol: PINK, lines: [['weekend plans?', PINK, pop01(t, P.t0 + 0.4, 0.25, 2.2)], ['…work?', STEEL, pop01(t, P.t0 + 0.9, 0.25, 2.2), true], ['jk. brunch?', MINT, pop01(t, P.t0 + 1.4, 0.25, 2.2), true]], size: 22 })
    } },
]

const F = makeFilm({
  id: 'r2a0503', key: 'C', accent: ACC, solo: SG, ending: 'lesson',
  title: 'Capricorn, log off | *at five.*',
  cameos: CAMEOS,
  group: { cap: 'Clocked out. | *Finally.*', mood: 'sparkle' },
  lesson: { text: 'You already | *earned* your rest.', chip: 'STATUS: OFF THE CLOCK' },
  last: { text: 'See you tomorrow. | *At nine.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
