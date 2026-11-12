// r2t0386: star_talk, SOLO (capricorn), "Your Capricorn sibling | be like." (signs3kit social cut, music: lofi · C). Ending: lesson.
//   nine cards: borrowed five bucks → invoice · a chore chart for YOUR chores · board game night, now your landlord
//   · up at 5, disappointed in you · birthday gift: a savings plan · lost keys, labelled spares · road trip with scheduled
//   bathroom breaks · won't say "love you", fixed your bike · teased you all childhood, defended you from everyone else
//   group "Strict. Stubborn. | Secretly soft." · lesson · last "Still sends invoices. | With hearts." (callback)
import { makeFilm, sparkles, hearts, bubble, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, confetti, friend, bits, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const S = 'capricorn', ACC = '#b9a6ff', ST = { x: -170 }
const SIB = 'gemini'

const CAMEOS = [
  { sign: S, cap: 'Borrowed five bucks once. | Got an *invoice.*', mood: lt => lt > 1.2 ? 'squint' : 'neutral', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      sheet(x, 780, 830, pop01(t, P.t0 + 0.25, 0.35, 2), { w: 320, h: 360, head: 'INVOICE #001', lines: ['1 × five bucks', 'late fee', ['TOTAL: $5.50', RED]], size: 32, progress: (lt - 0.4) / 0.9 })
      L(x, 780, 1080, 'DUE: FRIDAY', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, 0.05, 34)
    } },
  { sign: S, cap: 'Made a chore chart. | For *your* chores.', mood: 'happy', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      const rows = ['dishes', 'laundry', 'trash', 'your room']
      const n = Math.floor(clamp((lt - 0.5) / 1.0) * 4)
      sheet(x, 790, 820, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 340, h: 380, head: 'CHORES: YOU', headBg: ACC, headInk: INK, lines: rows.map((r, i) => [`${i < n ? '[x]' : '[ ]'} ${r}`, INK]), size: 32, align: 'left' })
      L(x, 790, 1080, 'MINE: SUPERVISING', pop01(t, P.t0 + 1.6, 0.3, 2.4), MINT, -0.04, 30)
    } },
  { sign: S, cap: 'Board game night. | Now *your landlord.*', mood: lt => lt > 1.0 ? 'wink' : 'happy', look: [1, 0], star: ST, hops: [0.9],
    front(x, t, lt, P) {
      for (let i = 0; i < 4; i++) bits(x, 'HOUSE', 660 + i * 76, 900 - (i % 2) * 30, 14 * pop01(t, P.t0 + 0.2 + i * 0.15, 0.3, 2.2))
      L(x, 790, 730, 'RENT DUE', pop01(t, P.t0 + 1.0, 0.3, 2.4), RED, -0.05, 44)
      bubble(x, 790, 1080, 'pay up.', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: S, cap: 'Up since 5 a.m. | *Judging* your alarm.', mood: lt => lt > 1.1 ? 'squint' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'CLOCK', 800, 820, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 1010, 'YOUR ALARM: 11:40', pop01(t, P.t0 + 0.7, 0.3, 2.2), STEEL, 0.04, 30)
      bubble(x, 790, 640, 'ran 5k. you?', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: S, cap: 'Your birthday gift? | A *savings plan.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      const open = lt > 1.0
      if (!open) bits(x, 'GIFT', 790, 880, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.04 * Math.sin(t * 9) })
      else sheet(x, 790, 860, pop01(t, P.t0 + 1.0, 0.3, 2.2), { w: 320, h: 320, head: 'SAVINGS PLAN', headBg: MINT, headInk: INK, lines: ['year 1: save', 'year 2: save', 'year 3: house?'], size: 30 })
      if (open) confetti(x, t, 790, 760, P.t0 + 1.0, { n: 16, spread: 220 })
      L(x, 790, 1110, 'YOU’RE WELCOME', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, -0.04, 32)
    } },
  { sign: S, cap: 'Lost your keys? | They have *labelled spares.*', mood: 'happy', look: [1, 0], star: ST, hops: [0.9],
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) {
        const k = pop01(t, P.t0 + 0.3 + i * 0.25, 0.3, 2.2)
        bits(x, 'KEY', 760, 720 + i * 120, 14 * k, { rot: -0.1 })
        L(x, 900, 720 + i * 120, `SPARE #${i + 1}`, k, [GOLD, MINT, SKYB][i], 0.04, 26)
      }
      bubble(x, 420, 590, 'i have a system.', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 32, tail: 'bc' })
    } },
  { sign: S, cap: 'Family road trip. | Bathroom breaks *pre-scheduled.*', mood: lt => lt > 1.2 ? 'squint' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 790, 840, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 340, h: 400, head: 'ITINERARY', headBg: ACC, headInk: INK, lines: ['08:00 leave', '10:42 bathroom', '10:46 back in car', 'no snack stops'], size: 28, align: 'left', progress: (lt - 0.4) / 1.0 })
      L(x, 790, 1110, '4 MINUTES. GO.', pop01(t, P.t0 + 1.6, 0.3, 2.4), RED, 0.04, 34)
    } },
  { sign: S, cap: 'Won’t say “love you.” | Fixed your *bike* instead.', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: ST, hops: [1.5],
    front(x, t, lt, P, F) {
      bits(x, 'WRENCH', F.x + 150, F.cy + 20, 14 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.5 + 0.25 * Math.sin(t * 8) })
      L(x, 800, 760, 'BIKE: FIXED', pop01(t, P.t0 + 0.9, 0.3, 2.2), MINT, -0.04, 38)
      L(x, 800, 900, 'TRANSLATION:', pop01(t, P.t0 + 1.3, 0.3, 2), BONE, 0.03, 28)
      L(x, 800, 990, 'I LOVE YOU', pop01(t, P.t0 + 1.6, 0.3, 2.4), PINK, -0.04, 40)
    } },
  { sign: S, cap: 'Teased you for years. | Defends you *from everyone.*', mood: lt => lt > 1.1 ? 'squint' : 'happy', look: [1, 0], star: { x: -60 }, hops: [1.1],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    back(x, t, lt, P) {
      friend(x, t, SIB, 260, 990, 170, pop01(t, P.t0 + 0.2, 0.3, 2), { mood: lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], seed: 12 })
    },
    front(x, t, lt, P) {
      bubble(x, 800, 700, 'hey, your | sibling is—', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 32, col: LAV, tail: 'bl' })
      bubble(x, 760, 1060, 'finish that sentence.', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 32, col: BONE, tail: 'bl' })
      sparkles(x, t, 540, 860, P.t0 + 1.1, 6, 190, 0.6)
    } },
]

const F = makeFilm({
  id: 'r2t0386', key: 'C', accent: ACC, solo: S, ending: 'lesson',
  title: 'Your Capricorn | sibling *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Strict. Stubborn. | *Secretly soft.*', mood: 'sparkle' },
  lesson: { text: 'Their love comes as plans. | *Let them* plan.', chip: 'STATUS: PROTECTED' },
  last: {
    text: 'Still sends invoices. | *With hearts.*',
    draw(x, t, lt) {
      const t0 = t - lt
      sheet(x, 810, 1190, pop01(t, t0 + 0.6, 0.4, 2), { w: 280, h: 260, rot: 0.04, head: 'INVOICE #214', lines: ['one hug', ['TOTAL: ♡', PINK]], size: 36 })
      hearts(x, t, 810, 1010, t0 + 1.2, { n: 7, life: 2, spread: 260, cell: 8, seed: 6 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
