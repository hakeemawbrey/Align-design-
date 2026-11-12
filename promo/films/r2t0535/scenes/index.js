// r2t0535: star_talk, SOLO (pisces), "Pisces as your boss | be like." (signs3kit social cut, music: lofi · F).
// Nine cards of the softest, most emotional boss alive; Pisces cries in every card. Ending: lesson.
import { makeFilm, sparkles, hearts, bubble, notes, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, zzz, friend, bits, swapLabel, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#8fe3ff', ST = { x: -180 }
const PS = { sign: 'pisces', look: [1, 0], star: ST }

const CAMEOS = [
  { ...PS, cap: 'Gave you feedback. | *Both* of you cried.', mood: 'wide', tears: 3, hops: [1.3],
    front(x, t, lt, P) {
      sheet(x, 800, 760, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 280, h: 200, head: 'FEEDBACK', headBg: SKYB, headInk: INK, lines: ['great job ♡'], size: 32 })
      friend(x, t, 'virgo', 820, 1020, 140, pop01(t, P.t0 + 0.8, 0.3, 2), { mood: 'wide', look: [-1, 0], seed: 48, tears: lt > 1.2 ? 2 : 0 })
    } },
  { ...PS, cap: 'Meeting agenda: | *vibes.*', mood: 'sparkle', tears: 2, hops: [1.2],
    front(x, t, lt, P) {
      sheet(x, 800, 830, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 300, h: 320, head: 'AGENDA', headBg: LAV, headInk: INK, lines: ['1. vibes', '2. feelings', '3. more vibes'], size: 32, align: 'left', progress: clamp((lt - 0.3) / 1.0) })
    } },
  { ...PS, cap: 'Deadline? | *“When it feels right.”*', mood: 'sleepy', tears: 2,
    front(x, t, lt, P) {
      bits(x, 'CLOCK', 800, 800, 18 * pop01(t, P.t0 + 0.2, 0.35, 2), { sy: 1 + 0.25 * clamp((lt - 0.5) / 1.2), rot: 0.1 * Math.sin(t) })
      L(x, 800, 1060, 'DUE: SOMEDAY ♡', pop01(t, P.t0 + 1.2, 0.3, 2.4), SKYB, -0.04, 32)
    } },
  { ...PS, cap: 'Office playlist: | *whale songs.*', mood: 'heart', tears: 2, hops: [1.3],
    front(x, t, lt, P) {
      notes(x, t, 800, 900, { n: 5, cell: 8, col: SKYB, seed: 1 })
      L(x, 800, 720, 'NOW PLAYING: WHALES', pop01(t, P.t0 + 0.3, 0.3, 2.2), MINT, 0.04, 30)
      L(x, 800, 1080, 'MOVED TO TEARS', pop01(t, P.t0 + 1.3, 0.3, 2.4), LAV, -0.04, 30)
    } },
  { ...PS, cap: 'You called in sick. | They sent *a poem.*', mood: 'wide', tears: 2, hops: [1.3],
    front(x, t, lt, P) {
      sheet(x, 800, 830, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 300, h: 340, head: 'GET WELL', headBg: PINK, headInk: INK, lines: ['o tired one,', 'rest like', 'the tide…', 'p. 1 of 9'], size: 28, align: 'left', progress: clamp((lt - 0.3) / 1.2) })
    } },
  { ...PS, cap: 'Had to let you go. | *Rehired you.* Sobbing.', mood: 'wide', tears: 3, hops: [1.3],
    front(x, t, lt, P) {
      if (lt > 0.2) swapLabel(x, 800, 830, lt, 1.0, 'YOU’RE LET GO', 'NO WAIT, STAY', { size: 34, fromBg: STEEL, toBg: MINT })
      bits(x, 'TISSUE', 800, 1050, 12 * pop01(t, P.t0 + 1.4, 0.3, 2))
    } },
  { ...PS, cap: 'Hiring by | *birth chart.*', mood: 'sparkle', tears: 2, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      sheet(x, 800, 820, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 300, h: 280, head: 'CANDIDATE', headBg: SKYB, headInk: INK, lines: ['skills: ?', 'moon: cancer'], size: 30, align: 'left' })
      L(x, 800, 1080, 'WATER SIGN: HIRED', pop01(t, P.t0 + 1.3, 0.3, 2.4), MINT, -0.04, 30)
    } },
  { ...PS, cap: 'Team retreat? | *A group nap.*', mood: 'sleepy', tears: 2,
    front(x, t, lt, P) {
      bits(x, 'PILLOW', 800, 900, 20 * pop01(t, P.t0 + 0.2, 0.35, 2))
      zzz(x, t, 760, 780)
      L(x, 800, 690, 'MANDATORY REST', pop01(t, P.t0 + 1.1, 0.3, 2.4), LAV, 0.04, 32)
    } },
  { ...PS, cap: 'Your review: | *“You’re a gift.”*', mood: 'heart', tears: 3, hops: [1.3],
    front(x, t, lt, P) {
      bits(x, 'GIFT', 800, 830, 20 * pop01(t, P.t0 + 0.2, 0.35, 2))
      L(x, 800, 1070, 'RATING: 10/10', pop01(t, P.t0 + 1.2, 0.3, 2.4), PINK, -0.04, 32)
      hearts(x, t, 800, 760, P.t0 + 1.3, { n: 5, life: 1.6, spread: 180, cell: 7, seed: 2 })
    } },
]

const F = makeFilm({
  id: 'r2t0535', key: 'F', accent: ACC, solo: 'pisces', ending: 'lesson',
  title: 'Pisces as your boss | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Softest boss ever. | *Bring tissues.*', mood: 'heart' },
  lesson: { text: 'A soft boss | is a *strong* one.', chip: 'MORALE: HIGH' },
  last: { text: 'Best job ever. | *Tissues included.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
