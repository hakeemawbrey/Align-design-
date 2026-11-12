// r2a0535: star_advice, ADVICE ROLLCALL (twelve signs), "Each sign's wish | for their friends." (signs3kit social cut, music: lofi · G).
// One warm wish per sign with a light visual gag. Ending: callback (Pisces' wish comes true: happy tears).
import { makeFilm, sparkles, hearts, bubble, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, zzz, confetti, friend, bits, swapLabel, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ffe7a8', ST = { x: -180 }

const CAMEOS = [
  { sign: 'aries', cap: 'May you *win.* | Loudly. Often.', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.4, 0.8, 1.2],
    front(x, t, lt, P) {
      bits(x, 'TROPHY', 800, 830, 20 * pop01(t, P.t0 + 0.2, 0.35, 2))
      L(x, 800, 1060, 'FIRST PLACE: YOU', pop01(t, P.t0 + 1.1, 0.3, 2.4), GOLD, -0.04, 32)
      sparkles(x, t, 800, 830, P.t0 + 1.2, 7, 180, 0.2)
    } },
  { sign: 'taurus', cap: 'May your fridge | be *always* full.', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      bits(x, 'PLATE', 800, 820, 20 * pop01(t, P.t0 + 0.2, 0.35, 2))
      bits(x, 'BOWL', 800, 1000, 14 * pop01(t, P.t0 + 0.6, 0.3, 2))
      L(x, 800, 670, 'SNACKS: INFINITE', pop01(t, P.t0 + 1.2, 0.3, 2.4), MINT, 0.04, 30)
    } },
  { sign: 'gemini', cap: 'May you never | *run out of stories.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) bits(x, 'BOOK', 720 + i * 80, 860 - i * 30, 12 * pop01(t, P.t0 + 0.2 + i * 0.3, 0.3, 2), { rot: (i - 1) * 0.12 })
      L(x, 800, 1070, 'VOLUME 47', pop01(t, P.t0 + 1.3, 0.3, 2.4), GOLD, -0.04, 34)
    } },
  { sign: 'cancer', cap: 'May you always | have *a home.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      bits(x, 'HOUSE', 800, 830, 26 * pop01(t, P.t0 + 0.2, 0.35, 2))
      L(x, 800, 1070, 'DOOR: ALWAYS OPEN', pop01(t, P.t0 + 1.2, 0.3, 2.4), PINK, -0.04, 30)
      hearts(x, t, 800, 720, P.t0 + 1.3, { n: 4, life: 1.4, spread: 140, cell: 6, seed: 3 })
    } },
  { sign: 'leo', cap: 'May you feel | *seen.* Every day.', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.0],
    front(x, t, lt, P) {
      bits(x, 'LAMP', 800, 780, 22 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: Math.PI })
      friend(x, t, 'capricorn', 800, 1010, 140, pop01(t, P.t0 + 0.7, 0.3, 2), { mood: lt > 1.3 ? 'sparkle' : 'wide', look: [-1, -1], seed: 51 })
      L(x, 800, 1150, 'SPOTLIGHT: YOURS', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, 0.04, 30)
    } },
  { sign: 'virgo', cap: 'May your plans | go *perfectly.*', mood: 'happy', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      sheet(x, 800, 830, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 300, h: 320, head: 'YOUR PLANS', headBg: MINT, headInk: INK, lines: ['[x] step 1', '[x] step 2', '[x] step 3', '[x] nap'], size: 30, align: 'left', progress: clamp((lt - 0.3) / 1.1) })
    } },
  { sign: 'libra', cap: 'May you find | *your person.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, t, 800, 850, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'IT’S A MATCH', headCol: PINK, lines: [['hi ♡', BONE, pop01(t, P.t0 + 0.6, 0.25, 2.2)], ['hi!! ♡', PINK, pop01(t, P.t0 + 1.1, 0.25, 2.2), true]] })
      hearts(x, t, 800, 1060, P.t0 + 1.4, { n: 5, life: 1.5, spread: 200, cell: 7, seed: 5 })
    } },
  { sign: 'scorpio', cap: 'May you trust | *the right people.*', mood: 'squint', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      bits(x, 'KEY', 800, 830, 18 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: -0.2 })
      L(x, 800, 1060, 'COPIES: VERY FEW', pop01(t, P.t0 + 1.2, 0.3, 2.4), LAV, -0.04, 30)
    } },
  { sign: 'sagittarius', cap: 'May you see | *the whole world.*', mood: 'sparkle', look: [1, -1], star: ST, hops: [0.7, 1.4],
    front(x, t, lt, P) {
      bits(x, 'MAP', 800, 820, 24 * pop01(t, P.t0 + 0.2, 0.35, 2))
      L(x, 800, 1060, 'PINS: ALL OF THEM', pop01(t, P.t0 + 1.2, 0.3, 2.4), GOLD, 0.04, 30)
    } },
  { sign: 'capricorn', cap: 'May you *rest.* | No guilt.', mood: lt => lt > 1.0 ? 'sleepy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'PILLOW', 800, 880, 20 * pop01(t, P.t0 + 0.2, 0.35, 2))
      if (lt > 1.0) zzz(x, t, 470, 700)
      L(x, 800, 690, 'INBOX: CLOSED', pop01(t, P.t0 + 1.0, 0.3, 2.4), MINT, 0.04, 32)
    } },
  { sign: 'aquarius', cap: 'May you stay | *weird.* Forever.', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.9, 1.7],
    front(x, t, lt, P) {
      bits(x, 'GADGET', 800, 830, 18 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: Math.sin(t * 5) * 0.08 })
      L(x, 800, 1060, 'NORMAL: OVERRATED', pop01(t, P.t0 + 1.2, 0.3, 2.4), SKYB, -0.04, 30)
    } },
  { sign: 'pisces', cap: 'May you only cry | *happy* tears.', mood: 'heart', tears: 3, look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      bits(x, 'TISSUE', 800, 830, 16 * pop01(t, P.t0 + 0.2, 0.35, 2))
      L(x, 800, 1060, 'HAPPY ONES ONLY', pop01(t, P.t0 + 1.2, 0.3, 2.4), SKYB, 0.04, 30)
    } },
]

const F = makeFilm({
  id: 'r2a0535', key: 'G', accent: ACC, ending: 'callback',
  title: 'Each sign’s wish | for their *friends.*',
  cameos: CAMEOS,
  group: { cap: 'Good friends | *wish big.*', moods: ['sparkle', 'heart', 'sparkle', 'heart', 'sparkle', 'happy', 'heart', 'happy', 'sparkle', 'sleepy', 'sparkle', 'heart'] },
  last: {
    text: 'Pisces cried. | *Happy* tears.',
    draw(x, t, lt) {
      const t0 = t - lt
      const k = pop01(t, t0 + 0.2, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'pisces', 540, 1060, 300 * k, { mood: 'heart', tears: 3, seed: 7, hops: [t0 + 1.0, t0 + 1.7] })
      L(x, 540, 1300, 'WISH: GRANTED ✓', pop01(t, t0 + 0.9, 0.3, 2.4), GOLD, -0.04, 36)
      hearts(x, t, 540, 960, t0 + 1.2, { n: 8, life: 2.0, spread: 420, cell: 8, seed: 3 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
