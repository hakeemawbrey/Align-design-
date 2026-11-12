// r2a0388: star_advice, ADVICE SOLO (gemini), "Gemini, have you | eaten today?" (signs3kit social cut, music: lofi · C).
// Ending: callback (the sandwich from card one, finally eaten).
//   nine cards: lunch forgotten mid-chat · ten hobbies this week · racing mind at night · eating while texting · plan F
//   · "a lot" = a lot of fun · two moods in one day (the twin) · hungry for new things · busy brain, big heart
import { makeFilm, sparkles, hearts, bubble, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, steam, zzz, swapLabel, confetti, friend, bits, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const S = 'gemini', ACC = '#ffe27a', ST = { x: -170 }

const CAMEOS = [
  { sign: S, cap: 'Forgot lunch mid-chat? | *Eat.* They’ll wait.', mood: lt => lt > 1.3 ? 'happy' : 'wide', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      phone(x, t, 820, 820, pop01(t, P.t0 + 0.2, 0.3, 2), { head: '3 CHATS', headCol: ACC, typing: 1, lines: [['and THEN', BONE, 1, true], ['wait also', BONE, 1, true]] })
      bits(x, 'SANDWICH', 620, 1060, 14 * pop01(t, P.t0 + 1.0, 0.35, 2.2), { rot: -0.05 })
      L(x, 840, 1110, 'BRB: LUNCH', pop01(t, P.t0 + 1.6, 0.3, 2.4), MINT, 0.04, 32)
    } },
  { sign: S, cap: 'Ten hobbies this week? | *Rest* counts as one.', mood: lt => lt > 1.4 ? 'sleepy' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 790, 820, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 320, h: 400, head: 'THIS WEEK', headBg: ACC, headInk: INK, lines: ['guitar', 'pottery', 'french', 'juggling', ['NAP', '#3a7bd5']], size: 30, align: 'left', progress: (lt - 0.3) / 1.2 })
      L(x, 790, 1100, 'NEW HOBBY: NAPS', pop01(t, P.t0 + 1.6, 0.3, 2.4), LAV, -0.04, 30)
    } },
  { sign: S, cap: 'Mind racing at night? | *Jot it down.* Then sleep.', mood: lt => lt > 1.3 ? 'sleepy' : 'wide', look: [1, -1], star: ST,
    front(x, t, lt, P, F) {
      bits(x, 'MOON', 880, 640, 16 * pop01(t, P.t0 + 0.2, 0.3, 2))
      if (lt < 1.2) for (let i = 0; i < 3; i++) L(x, F.x + Math.cos(lt * 4 + i * 2.1) * 160, F.top - 40 + Math.sin(lt * 4 + i * 2.1) * 50, ['IDEA', 'IDEA', 'IDEA?'][i], 1, [GOLD, MINT, PINK][i], 0, 24)
      bits(x, 'BOOK', 790, 920, 18 * pop01(t, P.t0 + 1.0, 0.35, 2))
      if (lt > 1.3) zzz(x, t, F.x + 80, F.top - 30)
      L(x, 790, 1100, 'SAVED FOR MORNING', pop01(t, P.t0 + 1.6, 0.3, 2.4), LAV, 0.04, 28)
    } },
  { sign: S, cap: 'Eating while texting? | *Taste* one bite.', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (lt < 1.1) phone(x, t, 820, 840, k, { head: 'PINGING', headCol: STEEL, typing: 1, lines: [] })
      bits(x, 'PIZZA', F.x + 150, F.cy - 10, 14 * pop01(t, P.t0 + 0.4, 0.3, 2), { rot: -0.4 })
      if (lt > 1.1) L(x, 820, 760, 'PHONE: DOWN', pop01(t, P.t0 + 1.1, 0.3, 2.4), MINT, 0.04, 32)
      if (lt > 1.3) bubble(x, 820, 1040, 'oh. delicious.', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: S, cap: 'Changed the plan again? | That’s *growth.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      const plans = ['PLAN A', 'PLAN B', 'PLAN C', 'PLAN D', 'PLAN E', 'PLAN F']
      const i = Math.min(5, Math.floor(clamp((lt - 0.3) / 1.4) * 6))
      L(x, 790, 820, plans[i], pop01(t, P.t0 + 0.2, 0.3, 2), [GOLD, MINT, SKYB, PINK, LAV, ACC][i], 0.06 * Math.sin(lt * 7), 54)
      L(x, 790, 1040, 'STILL A GREAT PLAN', pop01(t, P.t0 + 1.7, 0.3, 2.4), MINT, -0.04, 28)
    } },
  { sign: S, cap: 'Told you’re “a lot”? | A lot *of fun.*', mood: lt => lt > 1.2 ? 'wink' : 'neutral', look: [1, 0], star: ST, hops: [1.3, 1.8],
    front(x, t, lt, P) {
      if (pop01(t, P.t0 + 0.2, 0.3, 2) > 0.5) swapLabel(x, 790, 800, lt, 0.9, 'TOO MUCH', 'JUST ENOUGH', { size: 40, toBg: GOLD })
      confetti(x, t, 790, 760, P.t0 + 1.3, { n: 18, spread: 240 })
      bubble(x, 790, 1030, 'party of one!', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: S, cap: 'Two moods in one day? | *Both* are welcome.', mood: 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      friend(x, t, S, 800, 930, 240, pop01(t, P.t0 + 0.4, 0.4, 2), { mood: lt > 1.4 ? 'happy' : 'neutral', look: [-1, 0], seed: 19 })
      L(x, 800, 700, 'MOOD #2', pop01(t, P.t0 + 0.9, 0.3, 2), LAV, 0.04, 32)
      if (lt > 1.4) hearts(x, t, 600, 800, P.t0 + 1.4, { n: 4, life: 1.4, spread: 220, cell: 7, seed: 8 })
      L(x, 600, 1120, 'BOTH: INVITED', pop01(t, P.t0 + 1.6, 0.3, 2.4), MINT, -0.04, 30)
    } },
  { sign: S, cap: 'Hungry for new things? | *Food* is a new thing.', mood: lt => lt > 1.3 ? 'heart' : 'sparkle', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      sheet(x, 790, 840, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 320, h: 380, head: 'MENU', headBg: RED, lines: ['[x] dumplings', '[x] tacos', '[x] curry', '[x] the special'], size: 28, align: 'left', progress: (lt - 0.4) / 1.0 })
      L(x, 790, 1100, 'TRY IT ALL', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, 0.04, 34)
    } },
  { sign: S, cap: 'Busy brain, big heart. | *Feed both.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.2, 1.8],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'BOOK', 700, 840, 14 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'BOWL', 880, 860, 13 * pop01(t, P.t0 + 0.5, 0.3, 2))
      steam(x, t, 880, 810, { n: 2 })
      bits(x, 'HEARTB', 790, 660, 14 * pop01(t, P.t0 + 1.1, 0.35, 2.4))
      L(x, 790, 1060, 'MIND + TUMMY: FULL', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, -0.04, 28)
    } },
]

const F = makeFilm({
  id: 'r2a0388', key: 'C', accent: ACC, solo: S, ending: 'callback',
  title: 'Gemini, have you | *eaten today?*',
  cameos: CAMEOS,
  group: { cap: 'Curious minds | *need snacks.*', mood: 'heart' },
  last: {
    text: 'And that lunch? | *Finally* eaten.',
    draw(x, t, lt) {
      const t0 = t - lt
      const k = pop01(t, t0 + 0.2, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, S, 400, 1060, 280 * k, { mood: lt > 1.3 ? 'heart' : 'happy', seed: 7, look: [1, 0], hops: [t0 + 1.2, t0 + 1.9] })
      bits(x, lt > 1.1 ? 'BITTEN' : 'SANDWICH', 760, 1100, 18 * pop01(t, t0 + 0.5, 0.4, 2))
      if (lt > 1.1) L(x, 760, 960, 'NOM.', pop01(t, t0 + 1.1, 0.3, 2.4), GOLD, 0.05, 40)
      if (lt > 1.5) hearts(x, t, 600, 1000, t0 + 1.5, { n: 6, life: 1.6, spread: 360, cell: 8, seed: 5 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
