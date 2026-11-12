// r2a0610: star_advice, ADVICE SOLO (aquarius), "Before you text, | *Aquarius…*" (topic: Aquarius, before you send that text) (signs3kit, lofi · G).
// Nine kind nudges for an Aquarius with a text half-written, each with a warm reframe and one light gag. Ending: card.
//   draft #9 (the first was fine) · a 600-word essay (one line works) · "k." → "aw, miss you!" · weird is your charm
//   · gone a week? a hi still counts · 3am? morning works too · compatibility: ask them · the right one will get you
//   · pressed send (Leo replies "omg hi!!")
//   lesson "Your real self | *is the best text.*"  SENT: BRAVELY
//   last "They replied. | *In four seconds.*" over the Aquarius + Leo match card (Leo: the fast reply, card 9)
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, bits, chart, swapLabel, confetti, RED, CREAM, STEEL, WOOD, clamp, lerp, ease, prog } from './props.js'

const ACC = '#8fe3ff', S = 'aquarius', ST = { x: -190 }

const CAMEOS = [
  { sign: S, cap: 'Rewrote it nine times? | *The first was fine.*', mood: lt => lt > 1.5 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, t, 800, 840, 1.2 * pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'DRAFT', headCol: SKYB, lines: [['hey! so…', BONE, 1, true]], typing: 1 })
      L(x, 810, 1100, `DRAFT #${Math.min(9, 1 + Math.floor(Math.max(0, lt - 0.3) / 0.15))}`, pop01(t, P.t0 + 0.3, 0.3, 2), GOLD, -0.04, 34)
    } },
  { sign: S, cap: 'Writing an essay? | *One line works.*', mood: lt => lt > 1.5 ? 'wink' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 840, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 300, h: 380, head: 'A TEXT', headBg: SKYB, headInk: INK, lines: ['so basically', 'what i think is', 'part 1: the', 'theory of us', '(cont. p2)'], size: 28, align: 'left', progress: clamp((lt - 0.2) / 1.0) })
      L(x, 800, 1100, 'WORDS: 600', pop01(t, P.t0 + 1.4, 0.3, 2.2), PINK, 0.04, 32)
    } },
  { sign: S, cap: 'Playing it cool? | *Warm is okay too.*', mood: lt => lt > 1.1 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      swapLabel(x, 800, 820, lt, 1.0, 'k.', 'aw, miss you!', { size: 50, fromBg: STEEL, toBg: PINK })
      hearts(x, t, 800, 760, P.t0 + 1.5, { n: 4, life: 1.6, spread: 180, cell: 7, seed: 3 })
      L(x, 800, 1060, 'COOL → COZY', pop01(t, P.t0 + 1.6, 0.3, 2.2), MINT, -0.04, 30)
    } },
  { sign: S, cap: 'Worried it’s too weird? | *Weird is your charm.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'fun fact about | jellyfish…', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, col: SKYB, tail: 'bl' })
      L(x, 800, 960, 'WEIRD: CHARMING', pop01(t, P.t0 + 1.1, 0.3, 2.2), GOLD, 0.04, 34)
      sparkles(x, t, 800, 960, P.t0 + 1.2, 7, 170, 0.2)
    } },
  { sign: S, cap: 'Gone quiet a week? | *A hi still counts.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, t, 800, 840, 1.2 * pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'MESSAGES', headCol: MINT, lines: [['hi! i’m back', SKYB, pop01(t, P.t0 + 0.5, 0.25, 2), true], ['yay!! hi!', BONE, pop01(t, P.t0 + 1.3, 0.25, 2), false]], size: 24 })
      L(x, 810, 1100, 'WELCOME BACK', pop01(t, P.t0 + 1.7, 0.3, 2.2), GOLD, -0.04, 30)
    } },
  { sign: S, cap: 'Sending it at 3am? | *Morning works too.*', mood: lt => lt > 1.2 ? 'sleepy' : 'wide', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      bits(x, 'MOON', 800, 780, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      swapLabel(x, 800, 1020, lt, 1.0, 'SEND: 3:00 AM', 'SEND: 9:00 AM', { size: 32, fromBg: LAV, toBg: GOLD })
    } },
  { sign: S, cap: 'Checking your compatibility? | *Just ask them.*', mood: lt => lt > 1.3 ? 'wink' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      chart(x, 800, 800, 120, pop01(t, P.t0 + 0.2, 0.35, 2), t)
      L(x, 800, 1040, 'BEST CHECK: A CHAT', pop01(t, P.t0 + 1.1, 0.3, 2.2), MINT, -0.04, 30)
    } },
  { sign: S, cap: 'Scared they won’t get you? | *The right one will.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'you’re SO | interesting', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 44, col: BONE, tail: 'bl' })
      hearts(x, t, 800, 960, P.t0 + 1.1, { n: 6, life: 1.8, spread: 220, cell: 7, seed: 6 })
      L(x, 800, 1080, 'GOT YOU: YES', pop01(t, P.t0 + 1.4, 0.3, 2.2), PINK, 0.04, 32)
    } },
  { sign: S, cap: 'Pressed send? | *Proud of you.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', look: [1, 0], star: ST, hops: [1.3, 1.6],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, t, 800, 840, 1.2 * pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'TO: LEO', headCol: GOLD, lines: [['hey you', SKYB, pop01(t, P.t0 + 0.4, 0.25, 2), true], ['omg hi!!', '#ffb34a', pop01(t, P.t0 + 1.2, 0.25, 2.4), false]], typing: lt > 0.7 && lt < 1.2 ? 1 : 0, size: 26 })
      confetti(x, t, 810, 760, P.t0 + 1.25, { n: 20, spread: 260 })
    } },
]

const F = makeFilm({
  id: 'r2a0610', key: 'G', accent: ACC, solo: S, ending: 'card',
  title: 'Before you text, | *Aquarius…*',
  cameos: CAMEOS,
  card: { a: 'aquarius', b: 'leo', chip: "IT'S A MATCH" },
  group: { cap: 'Be you. | *Hit send.*', mood: 'sparkle' },
  lesson: { text: 'Your real self | *is the best text.*', chip: 'SENT: BRAVELY' },
  last: { text: 'They replied. | *In four seconds.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
