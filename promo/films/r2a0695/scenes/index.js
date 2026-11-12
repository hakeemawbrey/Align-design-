// r2a0695: star_advice, ADVICE SOLO (aquarius), "Signs an Aquarius | *misses you.*" (signs3kit, lofi · G).
// Nine quirky ways an Aquarius says "I miss you", each with a warm reframe and one light gag. Ending: card.
//   sent you octopus facts · made you a playlist · "was nearby" (drove forty minutes) · still quotes your weird theory
//   · fixed your gadget without asking · checked your chart "for science" · saved you a seat at stargazing
//   · memes, no words · talks about the future with you in it
//   group "Odd signals. | *Real love.*"
//   lesson "Their love is quirky. | It’s *still love.*" SIGNAL: RECEIVED
//   last "Send a fact | *back.*" over the Aquarius + Gemini match card (the fact-swapping friends).
import { makeFilm, sparkles, hearts, bubble, notes, label, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { L, sheet, phone, bits, chart, RED, CREAM, STEEL, NIGHT, clamp, lerp, ease, prog } from './props.js'

const ACC = '#8fe3ff', S = 'aquarius', ST = { x: -190 }
const OCTO = ['...PPPP...', '..PPPPPP..', '.PPWKPWKP.', '.PPPPPPPP.', '.PPPPPPPP.', 'P.P.PP.P.P', 'P.P.P..P.P', '.P..P..P..']
const SCOPE = ['.........SS', '.......SSSS', '.....SSSSS.', '...SSSSS...', '.SSSSS.....', 'SSSS.......', '.SS........', '..K........', '.K.K.......', 'K...K......']
const ROCKET = ['...W...', '..WWW..', '..WBW..', '..WWW..', '.WWWWW.', 'RW.W.WR', 'R..O..R', '...Y...']

const CAMEOS = [
  { sign: S, cap: 'Sent you octopus facts? | *That’s a hug.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, OCTO, { P: '#ff8fb1', W: '#ffffff', K: INK }, 800, 820, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: Math.sin(t * 3) * 0.06 })
      bubble(x, 760, 1050, '3 hearts, btw!', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 34, tail: 'bl' })
      hearts(x, t, 800, 720, P.t0 + 1.5, { n: 3, life: 1.4, spread: 140, cell: 6, seed: 3 })
    } },
  { sign: S, cap: 'Made you a playlist? | *That’s love, coded.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, t, 800, 840, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'FOR: YOU', headCol: ACC, lines: [['track 1: space', BONE, pop01(t, P.t0 + 0.5, 0.25, 2)], ['track 2: whales', BONE, pop01(t, P.t0 + 0.8, 0.25, 2)], ['track 3: you', MINT, pop01(t, P.t0 + 1.1, 0.25, 2)]] })
      notes(x, t, 560, 680, { n: 3, cell: 6, col: ACC, seed: 1 })
    } },
  { sign: S, cap: '“Was nearby.” | They *drove forty minutes.*', mood: lt => lt > 1.4 ? 'wink' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 690, 'oh hey, was nearby', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 36, tail: 'bl' })
      bits(x, 'MAP', 800, 880, 18 * pop01(t, P.t0 + 0.8, 0.3, 2))
      L(x, 800, 1070, 'NEARBY: 40 MIN', pop01(t, P.t0 + 1.4, 0.3, 2.2), GOLD, -0.04, 32)
    } },
  { sign: S, cap: 'Still quoting | *your weird theory?*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 830, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 330, h: 300, head: 'YOUR THEORY', headBg: LAV, headInk: INK, lines: ['pigeons are', 'tiny', 'astronauts'], size: 34 })
      L(x, 800, 1070, 'CITED: WEEKLY', pop01(t, P.t0 + 1.4, 0.3, 2.2), MINT, 0.04, 32)
    } },
  { sign: S, cap: 'Fixed your gadget? | *That’s missing you.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'GADGET', 800, 830, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'WRENCH', 800, 1000, 14 * pop01(t, P.t0 + 0.6, 0.3, 2), { rot: -0.3 + Math.sin(t * 7) * 0.2 })
      L(x, 800, 650, 'UPGRADED ✦', pop01(t, P.t0 + 1.4, 0.3, 2.2), ACC, -0.04, 34)
    } },
  { sign: S, cap: 'Checked your chart | *“for science.”*', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      chart(x, 800, 830, 140, pop01(t, P.t0 + 0.2, 0.35, 2), t)
      L(x, 800, 1070, 'RESULT: COMPATIBLE', pop01(t, P.t0 + 1.4, 0.3, 2.2), PINK, 0.04, 28)
    } },
  { sign: S, cap: 'Saved you a seat | *at stargazing.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [0, -1], star: ST,
    front(x, t, lt, P) {
      drawBits(x, SCOPE, { S: STEEL, K: INK }, 800, 860, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 650, 'SEAT 2: YOURS', pop01(t, P.t0 + 0.9, 0.3, 2.2), GOLD, -0.04, 32)
      sparkles(x, t, 860, 700, P.t0 + 1.2, 6, 120, 0.4, [GOLD, BONE, SKYB])
    } },
  { sign: S, cap: 'Memes, no words? | Still *means hi.*', mood: lt => lt > 1.2 ? 'wink' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, t, 800, 850, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'AQUARIUS', headCol: ACC, lines: [['[a frog meme]', BONE, pop01(t, P.t0 + 0.5, 0.25, 2)], ['[another frog]', BONE, pop01(t, P.t0 + 0.9, 0.25, 2)], ['[frog, waving]', MINT, pop01(t, P.t0 + 1.3, 0.25, 2)]] })
      L(x, 800, 1100, 'TRANSLATION: MISS U', pop01(t, P.t0 + 1.7, 0.3, 2.2), PINK, 0.04, 28)
    } },
  { sign: S, cap: 'Plans the future | *with you in it.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, ROCKET, { W: BONE, B: SKYB, R: RED, O: '#ff8a3a', Y: GOLD }, 800, 840 - clamp((lt - 1.0) / 1.2) * 60, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 1080, 'CREW: YOU + ME', pop01(t, P.t0 + 1.2, 0.3, 2.2), MINT, -0.04, 32)
    } },
]

const F = makeFilm({
  id: 'r2a0695', key: 'G', accent: ACC, solo: S, ending: 'card',
  title: 'Signs an Aquarius | *misses you.*',
  cameos: CAMEOS,
  card: { a: 'aquarius', b: 'gemini', chip: 'ALIGNED' },
  group: { cap: 'Odd signals. | *Real love.*', mood: 'heart' },
  lesson: { text: 'Their love is quirky. | It’s *still love.*', chip: 'SIGNAL: RECEIVED' },
  last: { text: 'Send a fact | *back.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
