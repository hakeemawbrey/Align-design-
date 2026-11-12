// r2a0700: star_advice, ADVICE SOLO (pisces), "What Pisces need | *from a friend.*" (signs3kit social cut, music: lofi · G)
// One sign (solo, 9 cards): what a Pisces needs from a friend, warm and a little funny; Pisces cries in every card.
// Ending: group (the group beat is the ending).
//   "cry, I'll wait" (tissues) · someone who texts back · honesty, softly (volume: low) · gets the daydreams (castle
//   on the moon: same!) · plans with a little notice · "eat something" (a snack reminder) · watches the sad movie with them (cried: both)
//   · "that wasn't your fault" · holds the umbrella
//   group "Tears welcome. | *So are you.*"
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, signChar, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO } from '../../signs3kit.js'
import { L, sheet, phone, bits, rain, friend, RED, CREAM, STEEL, clamp, ease, prog, lerp } from './props.js'

const S = 'pisces', ST = { x: -190 }, ACC = '#b7a6ff'

const CAMEOS = [
  { sign: S, cap: 'A friend who says | *“cry, I’ll wait.”*', mood: 'wide', tears: 3, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'TISSUE', 790, 930, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 680, 'take your time ♡', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 36, tail: 'bl' })
      L(x, 790, 1120, 'TISSUES: STOCKED', pop01(t, P.t0 + 1.4, 0.3, 2.2), MINT, -0.04, 30)
    } },
  { sign: S, cap: 'Someone who | *texts back.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', tears: lt => lt > 1.2 ? 1 : 2, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'BESTIE', headCol: ACC, size: 26, lines: [['u ok?', BONE, pop01(t, P.t0 + 0.4, 0.25, 2), true], ['…', BONE, pop01(t, P.t0 + 0.8, 0.25, 2), false], ['here. always ♡', MINT, pop01(t, P.t0 + 1.3, 0.25, 2), true]] })
    } },
  { sign: S, cap: 'Honesty. | *In a soft voice.*', mood: 'neutral', tears: 1, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'can I be honest? ♡', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 34, tail: 'bl', col: LAV })
      const v = 5 - Math.min(4, Math.floor(clamp((lt - 0.6) / 1.0) * 4))
      for (let i = 0; i < 5; i++) { x.fillStyle = INK; x.fillRect(680 + i * 46, 1000 - i * 22, 36, 40 + i * 22); x.fillStyle = i < v ? GOLD : '#3a3060'; x.fillRect(684 + i * 46, 1004 - i * 22, 28, 32 + i * 22) }
      L(x, 790, 1110, 'VOLUME: LOW', pop01(t, P.t0 + 1.4, 0.3, 2.2), MINT, 0.04, 32)
    } },
  { sign: S, cap: 'A friend who gets | *the daydreams.*', mood: 'sparkle', tears: 1, look: [1, -1], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'a castle | on the moon?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 38, tail: 'bl', col: LAV })
      bits(x, 'MOON', 900, 600, 10 * pop01(t, P.t0 + 0.5, 0.3, 2))
      bubble(x, 790, 980, 'SAME!!', pop01(t, P.t0 + 1.2, 0.25, 2.4), { size: 52, tail: 'br', col: '#ffd23a' })
    } },
  { sign: S, cap: 'Plans with | *a little notice.*', mood: lt => lt > 1.1 ? 'heart' : 'wide', tears: 1, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 300, h: 280, head: 'THURSDAY', headBg: '#5a4aa8', lines: ['7pm:', ['you + me ♡', '#d0406a']], size: 38, progress: clamp((lt - 0.4) / 0.8) })
      L(x, 790, 1110, 'NO SURPRISES', pop01(t, P.t0 + 1.3, 0.3, 2.2), GOLD, -0.04, 32)
    } },
  { sign: S, cap: 'A friend who says | *“eat something.”*', mood: lt => lt > 1.2 ? 'happy' : 'sleepy', tears: 1, look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'snack break? ♡', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 38, tail: 'bl' })
      bits(x, 'APPLE', 790, 920, 22 * pop01(t, P.t0 + 0.9, 0.3, 2))
      L(x, 790, 1120, 'REMINDER #3', pop01(t, P.t0 + 1.4, 0.3, 2.2), MINT, 0.04, 32)
    } },
  { sign: S, cap: 'Watches the sad movie | *and cries too.*', mood: 'wide', tears: 3, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'TV', 800, 820, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const k = pop01(t, P.t0 + 0.6, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'virgo', 800, 1060, 150 * k, { mood: 'wide', look: [0, -1], tears: 2, glyph: false, seed: 22 })
      L(x, 600, 1140, 'CRIED: BOTH', pop01(t, P.t0 + 1.4, 0.3, 2.2), PINK, -0.04, 32)
    } },
  { sign: S, cap: '“That wasn’t | *your fault.”*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', tears: lt => lt > 1.2 ? 1 : 2, look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      friend(x, t, 'taurus', 800, 960, 210, pop01(t, P.t0 + 0.2, 0.35, 2), { mood: 'happy', look: [-1, 0], seed: 18 })
      bubble(x, 800, 690, 'not your fault. ♡', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 38, tail: 'bc' })
      hearts(x, t, 560, 900, P.t0 + 1.3, { n: 5, life: 1.6, spread: 140, cell: 7, seed: 4 })
    } },
  { sign: S, cap: 'Someone who holds | *the umbrella.*', mood: lt => lt > 1.1 ? 'heart' : 'wide', tears: lt => lt > 1.1 ? 1 : 3, star: ST,
    front(x, t, lt, P, F) {
      const u = clamp((lt - 0.8) / 0.4)
      bits(x, 'CLOUD', F.x, 560, 16 * pop01(t, P.t0 + 0.1, 0.3, 2))
      rain(x, t, F.x, 600, { w: 300, h: lerp(380, 60, u), alpha: 1 })
      if (u > 0) bits(x, 'UMB', F.x + 20, lerp(500, F.top - 30, ease.outCubic(u)), 20, { alpha: u })
      if (lt > 1.2) friend(x, t, 'cancer', 760, 980, 190, pop01(t, P.t0 + 1.0, 0.35, 2), { mood: 'happy', look: [-1, 0] })
      L(x, 790, 1150, 'DRY NOW ♡', pop01(t, P.t0 + 1.5, 0.3, 2.2), MINT, 0.04, 34)
    } },
]

const F = makeFilm({
  id: 'r2a0700', key: 'G', accent: ACC, solo: S, ending: 'group',
  title: 'What Pisces need | *from a friend.*',
  cameos: CAMEOS,
  group: {
    cap: 'Tears welcome. | *So are you.*', mood: 'heart',
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
