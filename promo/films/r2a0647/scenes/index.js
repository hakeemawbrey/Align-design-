// r2a0647: star_advice, ADVICE SOLO (aries), "Aries, you can | change your *mind.*" (topic: "Aries, you’re allowed to change your mind"; signs3kit social cut, music: lofi · F).
// One sign the whole way: nine warm truths for an all-in Aries, each a gentle permission to change course, one light gag.
// Ending: callback.
//   said yes too fast (YES! → ACTUALLY, NO) · signed up for everything (drop one) · new hobby Monday, quit Wednesday
//   · changing the plan isn't losing (trophy) · hot take, new take (pineapple pizza) · ran in first, walk back out (door)
//   · said Libra wasn't your type (compatibility, look again) · bought the loud jacket (receipt kept) · mind changed, still brave
//   group "Bold can mean | *changing course.*"
//   last  "Pineapple on pizza? | Aries: *now a fan.*" (the hot-take card, paid off)
import { makeFilm, sparkles, hearts, bubble, signChar, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, bits, B, swapLabel, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ff6b5a', S = 'aries', ST = { x: -190 }

const CAMEOS = [
  { sign: S, cap: 'Said yes too fast? | You can *take it back.*', mood: lt => lt > 1.3 ? 'happy' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.25, 0.3, 2)
      if (k < 1) L(x, 790, 860, 'YES!', k, GOLD, -0.04, 44)
      else swapLabel(x, 790, 860, lt, 1.1, 'YES!', 'ACTUALLY, NO', { size: 40, fromBg: GOLD, toBg: MINT })
    } },
  { sign: S, cap: 'Signed up for everything? | *Drop one.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 300, h: 330, head: 'THIS WEEK', headBg: RED, lines: ['run club', 'pottery', 'a band', 'night class'], size: 32, progress: prog(lt, 0.4, 1.1) })
      L(x, 790, 1090, 'DROPPED ONE ✓', pop01(t, P.t0 + 1.5, 0.3, 2.2), MINT, 0.05, 34)
    } },
  { sign: S, cap: 'New hobby Monday? | *Quitting Wednesday is fine.*', mood: lt => lt > 1.3 ? 'wink' : 'sparkle', star: ST,
    front(x, t, lt, P) {
      bits(x, 'BOOK', 790, 840, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.08 })
      L(x, 790, 1050, 'HOBBY #7', pop01(t, P.t0 + 0.8, 0.3, 2.2), GOLD, -0.05, 44)
    } },
  { sign: S, cap: 'Changing the plan | isn’t *losing.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', star: ST, hops: [1.2],
    front(x, t, lt, P) {
      bits(x, 'TROPHY', 790, 830, 22 * pop01(t, P.t0 + 0.25, 0.3, 2))
      L(x, 790, 1060, 'STILL A WINNER', pop01(t, P.t0 + 1.0, 0.3, 2.2), GOLD, 0.04, 36)
      sparkles(x, t, 790, 830, P.t0 + 1.1, 7, 170, 0.2)
    } },
  { sign: S, cap: 'Hot take, then a new take? | That’s *growth.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'PIZZA', 790, 960, 18 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.15 })
      bubble(x, 750, 740, lt < 1.3 ? 'pineapple? NO.' : 'pineapple? …yes.', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: S, cap: 'Ran in first? | You can *walk back out.*', mood: lt => lt > 1.3 ? 'happy' : 'wide', star: ST, hops: [0.4],
    front(x, t, lt, P) {
      bits(x, 'DOORX', 790, 860, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 1070, 'EXIT: ALLOWED', pop01(t, P.t0 + 1.0, 0.3, 2.2), MINT, -0.04, 36)
    } },
  { sign: S, cap: 'Said Libra wasn’t your type? | *Look again.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      L(x, 790, 740, '✦ COMPATIBILITY', pop01(t, P.t0 + 0.2, 0.3, 2), LAV, -0.04, 32)
      const k = pop01(t, P.t0 + 0.5, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'libra', 790, 900, 180 * k, { mood: lt > 1.4 ? 'heart' : 'happy', look: [-1, 0], seed: 21, glyph: false })
      L(x, 790, 1080, 'ARIES + LIBRA: ✓', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, 0.04, 34)
      hearts(x, t, 790, 900, P.t0 + 1.5, { n: 5, life: 1.6, spread: 160, cell: 7, seed: 6 })
    } },
  { sign: S, cap: 'Bought the loud jacket? | *Return it, or rock it.*', mood: lt => lt > 1.2 ? 'wink' : 'happy', star: ST,
    front(x, t, lt, P) {
      bits(x, 'TAG', 790, 860, 28 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 1060, 'RECEIPT: KEPT', pop01(t, P.t0 + 1.0, 0.3, 2.2), BONE, 0.05, 36)
    } },
  { sign: S, cap: 'Changed your mind? | Still *brave.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', star: ST, hops: [1.0, 1.7],
    front(x, t, lt, P) {
      bits(x, 'SHIELD', 790, 850, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 1060, 'STILL YOU', pop01(t, P.t0 + 1.0, 0.3, 2.2), PINK, -0.04, 40)
      hearts(x, t, 420, 820, P.t0 + 1.2, { n: 5, life: 1.6, spread: 160, cell: 7, seed: 1 })
    } },
]

const F = makeFilm({
  id: 'r2a0647', key: 'F', accent: ACC, solo: S, ending: 'callback',
  title: 'Aries, you can | change your *mind.*',
  cameos: CAMEOS,
  group: { cap: 'Bold can mean | *changing course.*', mood: 'sparkle' },
  last: {
    text: 'Pineapple on pizza? | Aries: *now a fan.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const k = pop01(t, t0 + 0.4, 0.4, 2)
      if (k > 0.01) signChar(x, t, 'aries', 420, 1170, 240 * k, { mood: lt > 1.3 ? 'heart' : 'happy', look: [1, 0], seed: 12, glyph: false, hops: [t0 + 1.3] })
      bits(x, 'PIZZA', 710, 1150, 22 * pop01(t, t0 + 0.7, 0.35, 2), { rot: 0.15 })
      sparkles(x, t, 710, 1150, t0 + 1.1, 7, 150, 0.3)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
