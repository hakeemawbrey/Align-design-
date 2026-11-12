// r2a0390: star_advice, ADVICE ROLLCALL (twelve signs), "What each sign | needs in a bestie." (signs3kit social cut, music: lofi · G).
// Ending: callback (someone finally picks the restaurant for Libra).
import { makeFilm, sparkles, hearts, bubble, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, steam, confetti, friend, bits, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#7dffb0', ST = { x: -180 }

const CAMEOS = [
  { sign: 'aries', cap: 'Someone who keeps up. | And *cheers* the loudest.', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.3, 0.6, 0.9, 1.2],
    front(x, t, lt, P) {
      friend(x, t, 'sagittarius', 800, 930, 190, pop01(t, P.t0 + 0.3, 0.3, 2), { mood: 'sparkle', look: [-1, 0], seed: 24, hops: [P.t0 + 0.7, P.t0 + 1.1, P.t0 + 1.5] })
      L(x, 800, 710, 'RACE YOU!', pop01(t, P.t0 + 0.8, 0.3, 2.4), RED, 0.05, 36)
      L(x, 800, 1120, 'BOTH WON', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, -0.04, 32)
    } },
  { sign: 'taurus', cap: 'Someone who knows | their *coffee order.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      bits(x, 'MUG', 800, 900, 18 * pop01(t, P.t0 + 0.4, 0.3, 2)); steam(x, t, 785, 830, { n: 2 })
      L(x, 800, 720, 'OAT, EXTRA HOT', pop01(t, P.t0 + 0.9, 0.3, 2.2), BONE, 0.04, 30)
      L(x, 800, 1080, 'NO NEED TO ASK', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, -0.04, 30)
    } },
  { sign: 'gemini', cap: 'Someone who listens | to *all four* stories.', mood: 'happy', look: [1, 0], star: ST, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      const n = 1 + Math.floor(clamp((lt - 0.4) / 1.4) * 4)
      for (let i = 0; i < Math.min(4, n); i++) L(x, 720 + (i % 2) * 160, 720 + Math.floor(i / 2) * 110, `STORY ${i + 1}`, pop01(t, P.t0 + 0.4 + i * 0.35, 0.3, 2.2), [GOLD, MINT, PINK, SKYB][i], (i % 2 ? 0.05 : -0.05), 28)
      friend(x, t, 'libra', 800, 1060, 150, pop01(t, P.t0 + 0.3, 0.3, 2), { mood: 'heart', look: [-1, -1], seed: 25 })
    } },
  { sign: 'cancer', cap: 'Someone who texts | *“home safe?”* first.', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      phone(x, t, 800, 850, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'BEST FRIEND', headCol: PINK, lines: [['home safe?', PINK, pop01(t, P.t0 + 0.6, 0.25, 2.2)], ['yes ♡', BONE, pop01(t, P.t0 + 1.3, 0.25, 2.2), true]] })
      hearts(x, t, 560, 1060, P.t0 + 1.5, { n: 4, life: 1.4, spread: 120, cell: 7, seed: 3 })
    } },
  { sign: 'leo', cap: 'Someone who hypes them. | *Loudly.* In public.', mood: 'sparkle', star: ST, hops: [0.7, 1.4],
    front(x, t, lt, P) {
      friend(x, t, 'aries', 800, 950, 180, pop01(t, P.t0 + 0.3, 0.3, 2), { mood: 'sparkle', look: [-1, 0], seed: 26 })
      bits(x, 'MEGA', 690, 880, 10 * pop01(t, P.t0 + 0.5, 0.3, 2), { sx: -1 })
      bubble(x, 800, 690, 'THAT’S MY FRIEND!', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 32, tail: 'bl' })
      L(x, 800, 1130, 'LEO: GLOWING', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, -0.04, 30)
    } },
  { sign: 'virgo', cap: 'Someone who says | *“you’ve done enough.”*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      sheet(x, 800, 830, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 300, h: 340, head: 'TO DO', headBg: STEEL, headInk: INK, lines: ['[x] so much', '[x] even more', '[ ] rest'], size: 30, align: 'left' })
      L(x, 800, 1080, 'REST: APPROVED', pop01(t, P.t0 + 1.3, 0.3, 2.4), MINT, -0.04, 30)
    } },
  { sign: 'libra', cap: 'Someone who just | *picks the restaurant.*', mood: lt => lt > 1.4 ? 'heart' : 'wide', look: [1, 0], star: ST, hops: [0.8],
    front(x, t, lt, P) {
      const opts = ['TACOS?', 'SUSHI?', 'PASTA?', 'CURRY?']
      if (lt < 1.3) L(x, 800, 820, opts[Math.floor(lt * 4) % 4], pop01(t, P.t0 + 0.2, 0.3, 2), [GOLD, PINK, MINT, SKYB][Math.floor(lt * 4) % 4], 0.05 * Math.sin(lt * 9), 48)
      else L(x, 800, 820, 'TACOS. DONE.', pop01(t, P.t0 + 1.3, 0.3, 2.4), GOLD, -0.03, 44)
      bubble(x, 800, 1060, 'i love you.', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 36, col: PINK, tail: 'bl' })
    } },
  { sign: 'scorpio', cap: 'Someone who keeps | *their word.* Always.', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      sheet(x, 800, 820, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 300, h: 260, head: 'PROMISE', headBg: LAV, headInk: INK, lines: ['“i’ll be there', 'at 8.”'], size: 32 })
      bits(x, 'CLOCK', 800, 1030, 10 * pop01(t, P.t0 + 0.9, 0.3, 2))
      L(x, 800, 1140, '8:00. THERE.', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, 0.04, 30)
    } },
  { sign: 'sagittarius', cap: 'Someone who says yes | to *the random trip.*', mood: 'sparkle', look: [1, -1], star: ST, hops: [0.7, 1.3, 1.9],
    front(x, t, lt, P) {
      phone(x, t, 800, 850, pop01(t, P.t0 + 0.2, 0.3, 2), { head: '2 AM', headCol: GOLD, lines: [['road trip??', BONE, pop01(t, P.t0 + 0.5, 0.25, 2.2), true], ['packing.', MINT, pop01(t, P.t0 + 1.1, 0.25, 2.2)]] })
      bits(x, 'PLANE', 470, 600, 10 * pop01(t, P.t0 + 1.4, 0.3, 2), { rot: 0.6 })
    } },
  { sign: 'capricorn', cap: 'Someone who makes them | *take a day off.*', mood: lt => lt > 1.3 ? 'sleepy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      if (pop01(t, P.t0 + 0.2, 0.3, 2) > 0.5) {
        L(x, 800, 820, lt < 1.0 ? 'MONDAY: WORK' : 'MONDAY: BEACH', 1, lt < 1.0 ? STEEL : SKYB, -0.04, 36)
      }
      friend(x, t, 'leo', 800, 1030, 140, pop01(t, P.t0 + 0.8, 0.3, 2), { mood: 'wink', look: [-1, 0], seed: 27 })
      L(x, 800, 690, 'BOOKED IT FOR YOU', pop01(t, P.t0 + 1.2, 0.3, 2.4), GOLD, 0.04, 28)
    } },
  { sign: 'aquarius', cap: 'Someone who gets | *the weird ideas.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.9, 1.6],
    front(x, t, lt, P) {
      bubble(x, 800, 700, 'what if birds | had jobs?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 32, col: SKYB, tail: 'bl' })
      friend(x, t, 'gemini', 800, 970, 170, pop01(t, P.t0 + 0.8, 0.3, 2), { mood: 'sparkle', look: [-1, 0], seed: 28 })
      L(x, 800, 1140, '“GO ON…”', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, 0.04, 32)
    } },
  { sign: 'pisces', cap: 'Someone who passes | the *tissues.* No judgment.', mood: 'sparkle', tears: 3, look: [1, 0], star: ST, hops: [1.6],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      friend(x, t, 'cancer', 820, 960, 170, pop01(t, P.t0 + 0.3, 0.3, 2), { mood: 'heart', look: [-1, 0], seed: 29 })
      bits(x, 'TISSUE', 680, 880, 10 * pop01(t, P.t0 + 0.7, 0.3, 2))
      L(x, 800, 720, 'TAKE THE WHOLE BOX', pop01(t, P.t0 + 1.3, 0.3, 2.4), SKYB, -0.04, 28)
    } },
]

const F = makeFilm({
  id: 'r2a0390', key: 'G', accent: ACC, ending: 'callback',
  title: 'What each sign | needs in a *bestie.*',
  cameos: CAMEOS,
  group: { cap: 'Find your people. | *Keep them.*', moods: ['sparkle', 'heart', 'happy', 'heart', 'sparkle', 'happy', 'heart', 'happy', 'sparkle', 'sleepy', 'sparkle', 'sparkle'] },
  last: {
    text: 'Dinner? Picked. | Libra is *free.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const k = pop01(t, t0 + 0.2, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'libra', 400, 1060, 280 * k, { mood: lt > 1.2 ? 'heart' : 'sparkle', seed: 7, look: [1, 0], hops: [t0 + 1.2, t0 + 1.8, t0 + 2.4] })
      L(x, 770, 1000, 'TABLE FOR 2', pop01(t, t0 + 0.6, 0.3, 2.2), GOLD, 0.05, 36)
      L(x, 770, 1110, 'CHOICES MADE: 0', pop01(t, t0 + 1.1, 0.3, 2.4), MINT, -0.04, 30)
      if (lt > 1.4) confetti(x, t, 540, 960, t0 + 1.4, { n: 20, spread: 320 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
