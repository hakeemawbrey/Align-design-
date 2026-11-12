// r2t0634: star_talk, SOLO (leo), "Leo red flags | *we love.*" (signs3kit social cut, music: lofi · D). Ending: card.
//   brings a speech to every birthday · calls you their number one fan · matching outfits, not optional · cartwheel,
//   then waits for applause · an hour getting ready for the grocery store · grand gestures on a Tuesday · sleeps like a
//   starfish · jealous of your pet duck · bodyguard mode if anyone's mean to you
//   group "Red flags? | *Gold flags.*"  lesson "Dramatic? Yes. | *Loyal? Forever.*"  FLAGS: ADORABLE
//   last "Perfect match? | *Their biggest fan.*" over the match card: Leo + Pisces (the fan club, paid off)
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, friend, bits, zzz, RED, CREAM, STEEL, NIGHT, WOOD, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ffb34a', S = 'leo', ST = { x: -190 }
const TEE = ['.YY....YY.', 'YYYYYYYYYY', 'YYYYYYYYYY', '.YYYKKYYY.', '.YYYKKYYY.', '.YYYYYYYY.', '.YYYYYYYY.']
const FLAG = ['KRRRRRR', 'KRRRRRR', 'KRRRRRR', 'KRRRRR.', 'K......', 'K......', 'K......', 'K......']

const CAMEOS = [
  { sign: S, cap: 'Brings a speech | to *every birthday.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 300, h: 340, rot: 0.05, head: `PAGE 1 OF 12`, headBg: ACC, headInk: INK, lines: ['friends,', 'family,', 'it’s me.'], size: 32, progress: clamp((lt - 0.4) / 1.2) })
      L(x, 800, 1120, 'NOT THEIR BIRTHDAY', pop01(t, P.t0 + 1.6, 0.3, 2.2), PINK, -0.04, 28)
    } },
  { sign: S, cap: 'Calls you | *“my number one fan.”*', mood: 'wink', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'GLOVE', 800, 880, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.1 })
      L(x, 800, 680, 'FAN CLUB: 1 MEMBER', pop01(t, P.t0 + 0.9, 0.3, 2.2), GOLD, -0.04, 30)
    } },
  { sign: S, cap: 'Matching outfits. | *Not optional.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, TEE, { Y: ACC, K: INK }, 710, 880, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      drawBits(x, TEE, { Y: ACC, K: INK }, 890, 880, 18 * pop01(t, P.t0 + 0.5, 0.3, 2))
      L(x, 800, 1080, 'SIZE: YOU', pop01(t, P.t0 + 1.2, 0.3, 2.2), BONE, 0.04, 34)
    } },
  { sign: S, cap: 'Did one cartwheel. | *Waited for applause.*', mood: lt => lt > 1.0 ? 'squint' : 'sparkle', look: [1, 0], star: ST, hops: [0.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 800, 720, 'and…?', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 52, tail: 'bl' })
      L(x, 800, 960, 'APPLAUSE: PENDING', pop01(t, P.t0 + 1.4, 0.3, 2.2), GOLD, 0.04, 32)
    } },
  { sign: S, cap: 'An hour getting ready. | *For the grocery store.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'BAG', 800, 960, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 720, 'RUNWAY: AISLE 4', pop01(t, P.t0 + 0.9, 0.3, 2.2), PINK, -0.04, 32)
      sparkles(x, t, 350, 880, P.t0 + 1.2, 8, 190, 0.6)
    } },
  { sign: S, cap: 'Grand gestures. | *On a random Tuesday.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      ;[[720, 880], [800, 840], [880, 880], [760, 940], [840, 940]].forEach(([a, b], i) => bits(x, 'FLOWER', a, b, 11 * k, { rot: (i - 2) * 0.15 }))
      L(x, 800, 1130, 'OCCASION: NONE', pop01(t, P.t0 + 1.2, 0.3, 2.2), GOLD, 0.04, 32)
    } },
  { sign: S, cap: 'Takes the whole bed. | *Like a starfish.*', mood: 'sleepy', look: [0, 1], squash: lt => -0.12, star: { x: -150, y: 40 },
    back(x, t, lt, P) { bits(x, 'PILLOW', 520, 1020, 26 * pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P) {
      zzz(x, t, 560, 760, { alpha: clamp(lt - 0.4) })
      L(x, 780, 700, 'YOUR SIDE: 4 INCHES', pop01(t, P.t0 + 1.1, 0.3, 2.2), LAV, 0.04, 26)
    } },
  { sign: S, cap: 'Jealous of your pet. | *For the attention.*', mood: lt => lt > 0.9 ? 'squint' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'DUCK', 800, 960, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 760, 700, 'look at ME', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 44, tail: 'bl' })
    } },
  { sign: S, cap: 'Someone’s mean to you? | *Bodyguard mode.*', mood: 'squint', look: [1, 0], star: ST, hops: [1.0],
    front(x, t, lt, P) {
      const d = ease.outCubic(prog(lt, 0.3, 0.8))
      if (lt > 0.3) bits(x, 'SHADES', 350, lerp(700, 850, d), 13)
      L(x, 800, 860, 'SECURITY', pop01(t, P.t0 + 0.9, 0.3, 2.4), BONE, -0.04, 44)
      L(x, 800, 1040, 'PROTECTING: YOU', pop01(t, P.t0 + 1.5, 0.3, 2.2), GOLD, 0.04, 30)
    } },
]

const F = makeFilm({
  id: 'r2t0634', key: 'D', accent: ACC, solo: S, ending: 'card',
  title: 'Leo red flags | *we love.*',
  cameos: CAMEOS,
  card: { a: 'leo', b: 'pisces', chip: 'IT’S A MATCH' },
  group: {
    cap: 'Red flags? | *Gold flags.*', mood: 'sparkle',
  },
  lesson: { text: 'Dramatic? Yes. | *Loyal? Forever.*', chip: 'FLAGS: ADORABLE' },
  last: { text: 'Perfect match? | *Their biggest fan.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
