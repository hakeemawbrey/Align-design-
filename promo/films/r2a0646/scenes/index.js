// r2a0646: star_advice, ADVICE SOLO (leo), "What Leos need | *from a friend.*" (signs3kit social cut, music: lofi · D).
// One sign the whole way: nine warm, relatable things a Leo needs from a friend, each with one light gag.
// Ending: callback.
//   hype them up (megaphone) · notice the new haircut (stopwatch) · front row at their big night · they check on
//   everyone, check on them · laugh at the joke, third time · proud outside, soft inside (FRAGILE box) · know their
//   rising sign (chart) · let them treat you (gift stack) · bad day: snacks, not advice
//   group "Love them loud. | They *love you louder.*"
//   last  "And yes, they got | *another haircut.*" (the stopwatch card, paid off: NOTICED IN 0:04)
import { makeFilm, sparkles, hearts, bubble, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, bits, chart, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ffb34a', S = 'leo', ST = { x: -190 }

const CAMEOS = [
  { sign: S, cap: 'Hype them up. | *Loudly.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', star: ST, hops: [1.0, 1.6],
    front(x, t, lt, P) {
      bits(x, 'MEGA', 790, 860, 34 * pop01(t, P.t0 + 0.25, 0.3, 2), { rot: -0.2 })
      L(x, 790, 1060, 'LOUDER!', pop01(t, P.t0 + 0.9, 0.3, 2.4), GOLD, 0.05, 48)
      sparkles(x, t, 400, 820, P.t0 + 1.1, 7, 180, 0.4)
    } },
  { sign: S, cap: 'Notice the new haircut. | *Fast.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'CLOCK', 790, 820, 22 * pop01(t, P.t0 + 0.25, 0.3, 2))
      const s = Math.min(58, Math.floor(clamp((lt - 0.4) / 1.0) * 58))
      L(x, 790, 1040, `NOTICED IN 0:${String(s).padStart(2, '0')}`, pop01(t, P.t0 + 0.5, 0.3, 2), MINT, -0.04, 34)
    } },
  { sign: S, cap: 'Show up for their big night. | *Front row.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', star: ST, hops: [1.3],
    front(x, t, lt, P) {
      sheet(x, 790, 830, pop01(t, P.t0 + 0.25, 0.35, 2), { w: 280, h: 240, head: 'FRONT ROW', headBg: RED, lines: ['SEAT A1:', ['YOU', RED]], size: 40, progress: prog(lt, 0.5, 1.0) })
      bubble(x, 790, 1060, 'you came!!', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 42, tail: 'bl' })
    } },
  { sign: S, cap: 'They check on everyone. | *Check on them.*', mood: lt => lt > 1.4 ? 'heart' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 780, 'how are YOU?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, col: LAV, tail: 'br' })
      bubble(x, 560, 990, 'wait… me?', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 40, tail: 'bl' })
      hearts(x, t, 420, 820, P.t0 + 1.5, { n: 5, life: 1.6, spread: 160, cell: 7, seed: 2 })
    } },
  { sign: S, cap: 'Laugh at the joke. | Even the *third time.*', mood: lt => Math.floor(lt * 2.4) % 2 ? 'wink' : 'sparkle', star: ST,
    front(x, t, lt, P) {
      const n = 1 + Math.min(2, Math.floor(Math.max(0, lt - 0.3) / 0.5))
      L(x, 790, 780, `JOKE #${n}`, pop01(t, P.t0 + 0.3, 0.3, 2), GOLD, 0.05, 48)
      bubble(x, 790, 1000, 'HA! classic.', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 42, col: MINT, tail: 'bl' })
    } },
  { sign: S, cap: 'Proud on the outside. | *Soft* on the inside.', mood: lt => lt > 1.3 ? 'heart' : 'happy', star: ST,
    front(x, t, lt, P) {
      bits(x, 'BOX', 790, 900, 30 * pop01(t, P.t0 + 0.25, 0.3, 2))
      L(x, 790, 900, 'FRAGILE: HEART', pop01(t, P.t0 + 0.8, 0.3, 2.2), PINK, -0.06, 32)
      L(x, 790, 720, 'HANDLE GENTLY', pop01(t, P.t0 + 1.4, 0.3, 2.2), BONE, 0.04, 30)
    } },
  { sign: S, cap: 'Know their birthday. | Bonus: their *rising sign.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      chart(x, 790, 810, 140, pop01(t, P.t0 + 0.25, 0.35, 2), t)
      L(x, 790, 1050, 'SUN: LEO ✓  RISING: ✓', pop01(t, P.t0 + 1.0, 0.3, 2.2), GOLD, -0.04, 28)
    } },
  { sign: S, cap: 'Let them treat you. | It’s *their love language.*', mood: lt => lt > 1.0 ? 'heart' : 'sparkle', star: ST,
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) bits(x, 'GIFT', 790 + (i - 1) * 20, 1000 - i * 110, 15 * pop01(t, P.t0 + 0.25 + i * 0.25, 0.3, 2), { rot: (i - 1) * 0.08 })
      L(x, 790, 700, 'MY TREAT!', pop01(t, P.t0 + 1.2, 0.3, 2.4), GOLD, 0.05, 40)
    } },
  { sign: S, cap: 'Bad day? | Bring *snacks, not advice.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: ST, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'COOKIE', 760, 860, 20 * pop01(t, P.t0 + 0.3, 0.3, 2))
      bits(x, 'MUG', 860, 920, 14 * pop01(t, P.t0 + 0.5, 0.3, 2))
      bubble(x, 790, 1070, 'thank you.', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 42, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'r2a0646', key: 'D', accent: ACC, solo: S, ending: 'callback',
  title: 'What Leos need | *from a friend.*',
  cameos: CAMEOS,
  group: { cap: 'Love them out loud. | *Always.*', mood: 'heart' },
  last: {
    text: 'And yes, they got | *another haircut.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const k = pop01(t, t0 + 0.4, 0.4, 2)
      if (k > 0.01) signChar(x, t, 'leo', 430, 1160, 240 * k, { mood: lt > 1.3 ? 'heart' : 'sparkle', seed: 12, glyph: false, hops: [t0 + 1.3] })
      bits(x, 'CLOCK', 710, 1120, 26 * pop01(t, t0 + 0.6, 0.35, 2))
      L(x, 540, 1400, 'NOTICED IN 0:04', pop01(t, t0 + 1.0, 0.3, 2.2), MINT, -0.04, 40)
      sparkles(x, t, 430, 1160, t0 + 1.3, 7, 170, 0.5)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
