// r2a0717: star_advice, ADVICE SOLO (taurus), "How to surprise | a Taurus." (signs3kit social cut, lofi · F).
// One sign the whole way: nine gentle, true tips for surprising someone who loves comfort and calm, each with one light
// gag. Ending: callback (the home-cooked dish comes back as seconds).
//   skip the jump scare, bring snacks · schedule the surprise · blankets beat confetti · cook their favourite
//   · handmade beats fancy · don't move the couch · plant something together · a quiet day with no plans · just show up
//   group "Cozy. Simple. | Loved."   last "Best surprise ever? | Second helpings."
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, notes, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, friend, bits, swapLabel, steam, zzz, RED, CREAM, STEEL, NIGHT, WOOD, clamp, lerp, ease, prog } from './props.js'

const ACC = '#7fdc6a', S = 'taurus', ST = { x: -190 }

const CAMEOS = [
  { sign: S, cap: 'Skip the jump scare. | *Bring snacks.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', star: ST, hops: [0.4],
    front(x, t, lt, P) {
      swapLabel(x, 800, 680, lt, 0.9, 'SURPRISE!!', 'SNACKS!', { size: 40, fromBg: RED, toBg: GOLD })
      bits(x, 'PLATE', 800, 920, 20 * pop01(t, P.t0 + 1.2, 0.3, 2.2))
      L(x, 800, 1100, 'HEART RATE: CALM', pop01(t, P.t0 + 1.8, 0.3, 2.2), MINT, 0.04, 30)
    } },
  { sign: S, cap: 'Surprises are better | *with a heads-up.*', mood: 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 850, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 330, h: 300, head: 'CALENDAR', headBg: ACC, headInk: INK, lines: ['FRI 7PM:', 'surprise', '(act shocked)'], size: 36, progress: clamp((lt - 0.4) / 1.0) })
      L(x, 800, 1100, 'NOTED. THANK YOU.', pop01(t, P.t0 + 1.7, 0.3, 2.2), GOLD, 0.04, 30)
    } },
  { sign: S, cap: 'Skip the confetti. | *Bring a blanket.*', mood: lt => lt > 1.2 ? 'sleepy' : 'happy', star: ST,
    front(x, t, lt, P) {
      L(x, 770, 670, 'NO CONFETTI', pop01(t, P.t0 + 0.3, 0.3, 2), STEEL, -0.04, 34)
      bits(x, 'BLANKET', 790, 900, 17 * pop01(t, P.t0 + 0.9, 0.35, 2.2), { rot: 0.04 })
      hearts(x, t, 800, 820, P.t0 + 1.4, { n: 4, life: 1.6, spread: 200, cell: 7, seed: 3 })
    } },
  { sign: S, cap: 'Cook their favourite. | *That’s the whole plan.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      bits(x, 'DISH', 800, 900, 24 * k)
      if (k > 0.9) steam(x, t, 800, 820, { n: 3, h: 130 })
      L(x, 800, 660, 'THE PLAN: DINNER', pop01(t, P.t0 + 0.7, 0.3, 2.2), CREAM, -0.04, 32)
      L(x, 800, 1090, 'THAT’S IT. PERFECT.', pop01(t, P.t0 + 1.6, 0.3, 2.2), GOLD, 0.04, 30)
    } },
  { sign: S, cap: 'Handmade beats fancy. | *Every time.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', star: ST, hops: [1.3],
    front(x, t, lt, P) {
      bits(x, 'MUG', 800, 880, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.12, sx: 1.1 })
      L(x, 800, 660, 'SLIGHTLY LOPSIDED', pop01(t, P.t0 + 0.7, 0.3, 2.2), STEEL, 0.04, 30)
      L(x, 800, 1090, 'MADE IT MYSELF', pop01(t, P.t0 + 1.3, 0.3, 2.2), PINK, -0.04, 34)
      hearts(x, t, 800, 820, P.t0 + 1.4, { n: 4, life: 1.6, spread: 160, cell: 7, seed: 5 })
    } },
  { sign: S, cap: 'Don’t move the couch. | *They love it there.*', mood: lt => lt > 0.9 && lt < 1.6 ? 'wide' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const slide = lt < 1.0 ? ease.inOutCubic(clamp((lt - 0.3) / 0.6)) * 60 : 60 - ease.outBack(clamp((lt - 1.2) / 0.5)) * 60
      bits(x, 'COUCH', 800 + slide, 920, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 1110, 'STAYS RIGHT THERE', pop01(t, P.t0 + 1.7, 0.3, 2.2), GOLD, 0.04, 32)
      bubble(x, 800, 680, 'wait. no.', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: S, cap: 'Plant something together. | *Love it slowly.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const grown = lt > 1.3
      if (!grown) bits(x, 'SEED', 800, 960, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      else bits(x, 'FLOWER', 800, 880, 20 * pop01(t, P.t0 + 1.3, 0.35, 2.2))
      L(x, 800, 660, grown ? 'DAY 30' : 'DAY 1', 1, grown ? MINT : CREAM, -0.04, 38)
      sparkles(x, t, 800, 850, P.t0 + 1.35, 7, 160, 0.4)
    } },
  { sign: S, cap: 'A day with no plans? | *Best gift.*', mood: 'sleepy', star: ST,
    front(x, t, lt, P) {
      bits(x, 'PILLOW', 800, 920, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 680, 'SCHEDULE: NOTHING', pop01(t, P.t0 + 0.7, 0.3, 2.2), LAV, -0.04, 32)
      zzz(x, t, 820, 1100, { alpha: clamp(lt - 0.8) })
    } },
  { sign: S, cap: 'Just keep showing up. | *That’s the surprise.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'DOORX', 830, 870, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      friend(x, t, 'cancer', 690, 1000, 160, pop01(t, P.t0 + 0.9, 0.35, 2), { mood: 'happy', look: [-1, 0] })
      bubble(x, 800, 650, 'here, as always', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 36, tail: 'bl' })
      hearts(x, t, 740, 900, P.t0 + 1.6, { n: 4, life: 1.4, spread: 140, cell: 7, seed: 8 })
    } },
]

const F = makeFilm({
  id: 'r2a0717', key: 'F', accent: ACC, solo: S, ending: 'callback',
  title: 'How to surprise | *a Taurus.*',
  cameos: CAMEOS,
  group: { cap: 'Cozy. Simple. | *Loved.*', mood: 'heart' },
  last: {
    text: 'Best surprise ever? | *Second helpings.*',
    draw(x, t, lt) {
      const t0 = t - lt, k = pop01(t, t0 + 0.4, 0.35, 2)
      friend(x, t, 'taurus', 380, 1180, 220, k, { mood: lt > 1.2 ? 'heart' : 'wide', look: [1, 0], seed: 47 })
      bits(x, 'DISH', 700, 1150, 22 * pop01(t, t0 + 0.6, 0.3, 2))
      bits(x, 'DISH', 700, 1300, 22 * pop01(t, t0 + 1.2, 0.3, 2.2))
      if (lt > 1.0) steam(x, t, 700, 1080, { n: 3, h: 130 })
      L(x, 700, 1440, 'MORE? ALWAYS.', pop01(t, t0 + 1.7, 0.3, 2.2), GOLD, 0.04, 34)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
