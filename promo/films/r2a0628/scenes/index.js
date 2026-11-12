// r2a0628: star_advice, ADVICE SOLO (aquarius), "Aquarius, your sign | *to call home.*" (batch topic shortened so the hook fits two lines) (signs3kit social cut, lofi · C).
// Nine cards: a relatable Aquarius truth + a warm reframe, one gag each: saving the world? call home first ·
// think they don't get you? ask them · six missed calls, one back is plenty · independent, and still allowed home ·
// they asked about your invention, tell them · hugs feel weird? a quick one counts · unmute the family chat ·
// Sunday dinner, bring the weird snacks · your chart says you're softer than you think.
// Ending: group ("Go be a genius. | *Then call home.*", the phone rings HOME).
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, bits, swapLabel, chart, RED, CREAM, STEEL, WOOD, NIGHT, clamp, lerp, ease, prog } from './props.js'

const ACC = '#6fc3ff', ST = { x: -180 }, SG = 'aquarius'
const GLOBE = ['...BBBB...', '.BBGGBBBB.', 'BBGGGGBBBB', 'BGGGGBBGGB', 'BBGGBBGGGB', 'BBBBBBGGBB', 'BBGBBBBBBB', '.BGGBBBBB.', '...BBBB...']
const GLOBE_C = { B: '#3a8ad0', G: '#5fd068' }

const CAMEOS = [
  { sign: SG, cap: 'Saving the world? | *Call home* first.', mood: lt => lt > 1.3 ? 'heart' : 'sparkle', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      drawBits(x, GLOBE, GLOBE_C, 800, 820, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: t * 0.3 })
      L(x, 800, 650, 'WORLD: ON HOLD', pop01(t, P.t0 + 0.8, 0.3, 2), STEEL, -0.04, 32)
      L(x, 800, 1060, 'CALLING: MOM ♡', pop01(t, P.t0 + 1.4, 0.3, 2.2), PINK, 0.04, 36)
    } },
  { sign: SG, cap: 'Think they don’t get you? | *Ask them.*', mood: lt => lt > 1.5 ? 'wide' : 'squint', look: [1, 0], star: ST, hops: [1.6],
    front(x, t, lt, P) {
      sheet(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 340, h: 320, head: 'DO THEY KNOW ME?', headBg: '#3a8ad0', lines: [['fav color ✓', '#2f8a48'], ['weird hobby ✓', '#2f8a48'], ['the cereal ✓', '#2f8a48']], size: 32, progress: clamp((lt - 0.4) / 1.1) })
      bubble(x, 800, 1130, 'oh. they do.', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: SG, cap: 'Six missed calls? | *One* back is plenty.', mood: lt => lt > 1.3 ? 'happy' : 'wide', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      phone(x, t, 800, 880, 1.2 * pop01(t, P.t0 + 0.2, 0.3, 2), { head: lt < 1.2 ? 'MISSED: 6' : 'CALLING…', headCol: lt < 1.2 ? RED : MINT, lines: [['MOM', BONE, pop01(t, P.t0 + 0.4, 0.25, 2.2)], ['“hi sweetie!!”', PINK, pop01(t, P.t0 + 1.5, 0.25, 2.2), true]], size: 22 })
    } },
  { sign: SG, cap: 'Fiercely independent. | *Still welcome home.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      const lit = lt > 1.0
      bits(x, 'HOUSE', 800, 880, 30 * pop01(t, P.t0 + 0.2, 0.3, 2))
      if (lit) { x.save(); x.globalAlpha = 0.35; x.fillStyle = '#fff1b0'; x.beginPath(); x.arc(800, 930, 170, 0, Math.PI * 2); x.fill(); x.restore() }
      L(x, 800, 1120, 'PORCH LIGHT: ON', pop01(t, P.t0 + 1.1, 0.3, 2.2), GOLD, 0.04, 34)
    } },
  { sign: SG, cap: 'Asked about your invention? | *Tell them!*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.8, 1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'GADGET', 800 + Math.sin(t * 20) * (lt > 0.8 ? 3 : 0), 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 800, 680, 'it folds socks!', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 40, col: MINT, tail: 'bl' })
      L(x, 800, 1110, 'DAD: FASCINATED', pop01(t, P.t0 + 1.6, 0.3, 2.2), SKYB, -0.04, 32)
    } },
  { sign: SG, cap: 'Hugs feel weird? | A *quick one* counts.', mood: lt => lt > 1.2 ? 'heart' : 'squint', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      const n = Math.min(2, Math.floor(clamp((lt - 0.4) / 1.0) * 3))
      L(x, 800, 700, 'HUG TIMER', pop01(t, P.t0 + 0.2, 0.3, 2), LAV, -0.04, 40)
      L(x, 800, 860, `${n + 1}… ${n >= 2 ? 'DONE!' : ''}`, pop01(t, P.t0 + 0.5, 0.3, 2), GOLD, 0.04, 56)
      if (lt > 1.4) hearts(x, t, 800, 1000, P.t0 + 1.4, { n: 5, life: 1.6, spread: 160, cell: 7, seed: 4 })
      L(x, 800, 1110, 'NOT BAD, ACTUALLY', pop01(t, P.t0 + 1.8, 0.3, 2.2), MINT, -0.04, 30)
    } },
  { sign: SG, cap: 'The family chat? | *Unmute it.* Once.', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      phone(x, t, 800, 880, 1.2 * pop01(t, P.t0 + 0.2, 0.3, 2), { head: lt < 1.0 ? 'FAMILY (MUTED)' : 'FAMILY ♡', headCol: lt < 1.0 ? STEEL : SKYB, lines: [['grandma sent a pic', BONE, pop01(t, P.t0 + 1.1, 0.25, 2.2)], ['it’s a potato', GOLD, pop01(t, P.t0 + 1.5, 0.25, 2.2)], ['love it.', MINT, pop01(t, P.t0 + 1.9, 0.25, 2.2), true]], size: 18 })
    } },
  { sign: SG, cap: 'Sunday dinner? | Bring *the weird snacks.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      bits(x, 'BOWL', 800, 920, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 700, 'SEAWEED CANDY?', pop01(t, P.t0 + 0.6, 0.3, 2), MINT, 0.04, 36)
      L(x, 800, 1100, 'GRANDMA: INTRIGUED', pop01(t, P.t0 + 1.5, 0.3, 2.2), PINK, -0.04, 30)
    } },
  { sign: SG, cap: 'Your chart says: | *secretly soft.*', mood: 'heart', look: [1, 0], star: ST, hops: [1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      chart(x, 800, 800, 135, pop01(t, P.t0 + 0.2, 0.35, 2), t)
      L(x, 800, 1030, 'MOON: SENTIMENTAL', pop01(t, P.t0 + 0.9, 0.3, 2.2), LAV, -0.04, 30)
      hearts(x, t, 800, 760, P.t0 + 1.3, { n: 5, life: 1.6, spread: 160, cell: 7, seed: 6 })
    } },
]

const F = makeFilm({
  id: 'r2a0628', key: 'C', accent: ACC, solo: SG, ending: 'group',
  title: 'Aquarius, your sign | *to call home.*',
  cameos: CAMEOS,
  group: {
    cap: 'Go be a genius. | *Then call home.*', mood: 'heart',
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
