// r2a0452: star_advice, ADVICE SOLO, "Leo, before you | send that text." (~49 s vertical, signs3kit social cut, music: lofi · F)
// One sign (solo, 9 cards): a relatable Leo-about-to-text truth + a warm reframe, one light gag each. Ending: callback.
//   draft 14 (your feelings are valid) · pride stings (give it a night) · ALL CAPS (lowercase still counts)
//   · you give so much (ask for some back) · their silence isn't about you (they're at work) · need applause (clap for you)
//   · call a friend first (Sagittarius hypes you up) · not a crown, a heart (feelings > winning) · still sending? send it kindly
//  group "Big heart. | *Soft landing.*"   callback "Draft 15? | *Just “hey ♡”.*" (the draft phone returns, short and sweet)
import { clamp, prog } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { phone, note, bits, ORANGE, RED, WOOD, PAPER, SLATE, GREEN } from '../props.js'

const S = 'leo', L = { x: -180 }

const CAMEOS = [
  { sign: S, cap: 'Draft fourteen? | *Your feelings are valid.*', mood: 'wide', look: [1, 0], star: L,
    front(x, t, lt, P) {
      const n = 1 + Math.floor(clamp((lt - 0.2) / 1.3) * 13.99)
      phone(x, 800, 880, pop01(t, P.t0 + 0.2, 0.3, 2), { top: `draft ${n}`, head: 'TO: THEM', msg: 'so basically | (4 pages)', bg: GOLD, size: 30 })
      hearts(x, t, 560, 800, P.t0 + 1.5, { n: 4, life: 1.6, spread: 140, cell: 6, seed: 2 })
    } },
  { sign: S, cap: 'Pride stings? | *Give it one night.*', mood: lt => lt > 1.2 ? 'sleepy' : 'neutral', look: [1, -1], star: L,
    front(x, t, lt, P) {
      bits(x, 'moon', 800, 800, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 800, 1080, 'SEND: TOMORROW?', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 34, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Typing in ALL CAPS? | *Lowercase still counts.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: L,
    front(x, t, lt, P) {
      note(x, 800, 880, pop01(t, P.t0 + 0.2, 0.3, 2), 'I’M FINE!!! | i’m a bit hurt', { head: 'REWRITE', headBg: ORANGE, size: 34, w: 360, strike: lt > 1.0 ? [0] : [], rot: 0.03 })
      sparkles(x, t, 800, 900, P.t0 + 1.4, 7, 180, 0.5)
    } },
  { sign: S, cap: 'You give *so much.* | Ask for some back.', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: L, hops: [1.4],
    front(x, t, lt, P) {
      const p = prog(lt, 0.3, 1.1)
      bits(x, 'gift', 700 + 200 * p, 880, 16 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'heart', 900 - 200 * prog(lt, 1.2, 1.9), 1040, 14 * pop01(t, P.t0 + 1.2, 0.3, 2))
      label(x, 800, 680, 'IT GOES BOTH WAYS', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 30, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'A slow reply | *isn’t about you.*', mood: lt => lt > 1.3 ? 'happy' : 'wide', look: [1, 0], star: L,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, 800, 880, pop01(t, P.t0 + 0.2, 0.3, 2), { top: '2:14', msg: lt > 1.2 ? 'at work, | text u later!' : '…', bg: SKYB, size: 30 })
      label(x, 800, 1120, 'NOT IGNORED. BUSY.', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 30, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Need applause? | *Start with yours.*', mood: 'sparkle', look: [1, 0], star: L, hops: [0.8, 1.4],
    front(x, t, lt, P) {
      bubble(x, 800, 700, 'proud of me.', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 42, tail: 'bl' })
      label(x, 800, 960, 'CLAP CLAP CLAP', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 36, bg: GOLD, rot: -0.05 })
      sparkles(x, t, 800, 900, P.t0 + 1.0, 8, 200, 0.2)
    } },
  { sign: S, cap: 'Call a friend first. | *They’ll hype you up.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: L, hops: [1.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'sagittarius', 790, 980, 190 * k, { mood: 'sparkle', look: [-1, 0], seed: 34, glyph: false, hops: [P.t0 + 1.0, P.t0 + 1.6] })
      bubble(x, 790, 680, 'YOU’RE A STAR', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 38, tail: 'bc' })
    } },
  { sign: S, cap: 'Winning the argument? | *Keeping the friend.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: L,
    front(x, t, lt, P) {
      bits(x, 'trophy', 720, 920, 18 * pop01(t, P.t0 + 0.2, 0.3, 2) * (1 - 0.5 * prog(lt, 1.0, 1.4)))
      bits(x, 'heart', 880, 900, 20 * pop01(t, P.t0 + 1.0, 0.3, 2))
      label(x, 800, 1120, 'BETTER PRIZE', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 34, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Still want to send it? | *Send it kindly.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: L, hops: [1.4],
    front(x, t, lt, P) {
      phone(x, 800, 880, pop01(t, P.t0 + 0.2, 0.3, 2), { top: 'send?', msg: 'can we talk? ♡', bg: PINK, size: 30 })
      label(x, 800, 1120, 'SENT WITH LOVE', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0452', key: 'F', accent: '#ffb34a', solo: S, ending: 'callback',
  title: 'Leo, before you | *send that text.*',
  cameos: CAMEOS,
  group: { cap: 'Big heart. | *Soft landing.*', mood: 'heart' },
  last: {
    text: 'Draft fifteen? | *Just “hey ♡”.*',
    draw(x, t, lt) {
      const t0 = t - lt
      phone(x, 700, 1140, 1.45 * pop01(t, t0 + 0.4, 0.35, 2), { top: 'draft 15', head: 'TO: THEM', msg: 'hey ♡', bg: GOLD, size: 44 })
      const s = pop01(t, t0 + 0.7, 0.45, 1.8)
      if (s > 0.01) signChar(x, t, S, 360, 1180, 300 * s, { mood: 'heart', seed: 44, hops: [t0 + 1.4] })
      hearts(x, t, 560, 1000, t0 + 1.4, { n: 6, life: 1.8, spread: 300, cell: 7, seed: 8 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
