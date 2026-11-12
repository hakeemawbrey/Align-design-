// r2a0586: star_advice, ADVICE SOLO (sagittarius), "What Sags need | *after a fight.*" (signs3kit social cut, music: lofi · D).
// One sign the whole way: nine gentle truths about a Sagittarius after a fight, each with a warm reframe and one light gag.
// Ending: card (lesson + last line over the Sagittarius + Aries match card: Aries is the one who says "truce?", card 9).
//   a very long walk · a joke mid-argument · "back in 20" door sign · nearly booked a flight · blunt → gentle
//   · the grudge expires in an hour · needs a window open · the apology meme · you came back (Aries: "truce?")
//   group "Free spirit. | *Big heart.*"  lesson "Space and love | *can share a room.*"  PEACE: MADE
//   last "Fight fast. | *Forgive faster.*"
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, friend, bits, swapLabel, RED, CREAM, STEEL, NIGHT, WOOD, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ff9a4a', S = 'sagittarius', ST = { x: -190 }
const FOOT = ['.KK.', 'KKKK', 'KKKK', '.KK.', '....', '.KK.', '.KK.']
const WINDOW = ['KKKKKKKKKKKK', 'KSSSSKSSSSSK', 'KSSSSKSSSSSK', 'KSSSSKSSSSSK', 'KKKKKKKKKKKK', 'KSSSSKSSSSSK', 'KSSSSKSSSSSK', 'KSSSSKSSSSSK', 'KKKKKKKKKKKK']
const DOOR = ['KKKKKKKKKK', 'KWWWWWWWWK', 'KWDDDDDDWK', 'KWDDDDDDWK', 'KWDDDDDDWK', 'KWDDDDYDWK', 'KWDDDDDDWK', 'KWDDDDDDWK', 'KWDDDDDDWK', 'KKKKKKKKKK']

const CAMEOS = [
  { sign: S, cap: 'Need a long walk first? | *Walk it off.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: ST, hops: [0.8, 1.2, 1.6],
    front(x, t, lt, P) {
      for (let i = 0; i < 6; i++) drawBits(x, FOOT, { K: BONE }, 640 + i * 62, 1060 - (i % 2) * 44 - i * 50, 14 * pop01(t, P.t0 + 0.2 + i * 0.16, 0.25, 2), { rot: -0.5, alpha: 0.85 })
      L(x, 800, 650, 'WALK: VERY LONG', pop01(t, P.t0 + 1.2, 0.3, 2.2), GOLD, -0.04, 32)
    } },
  { sign: S, cap: 'Joked mid-argument? | *Humour is how you heal.*', mood: lt => lt > 1.0 ? 'wink' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'too soon?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 54, col: '#ff9a4a', tail: 'bl' })
      bubble(x, 800, 960, 'a little.', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 42, col: BONE, tail: 'br' })
      L(x, 800, 1120, 'TIMING: WORKING ON IT', pop01(t, P.t0 + 1.6, 0.3, 2.2), LAV, 0.04, 26)
    } },
  { sign: S, cap: 'Need space? | *Say when you’ll be back.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, DOOR, { K: INK, W: '#c98f5a', D: WOOD, Y: GOLD }, 810, 880, 30 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 810, 820, 'BACK IN 20', pop01(t, P.t0 + 0.9, 0.3, 2.4), CREAM, 0.06, 34)
      hearts(x, t, 810, 760, P.t0 + 1.5, { n: 3, life: 1.4, spread: 120, cell: 6, seed: 3 })
    } },
  { sign: S, cap: 'Almost booked a flight? | *A walk works too.*', mood: lt => lt > 1.2 ? 'happy' : 'wide', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      bits(x, 'PLANE', 810, 780, 26 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.5 })
      L(x, 800, 640, 'ONE WAY: ANYWHERE', pop01(t, P.t0 + 0.4, 0.3, 2), CREAM, -0.04, 30)
      swapLabel(x, 800, 1010, lt, 1.2, 'GATE 12', 'PARK BENCH', { size: 34, fromBg: STEEL, toBg: MINT })
    } },
  { sign: S, cap: 'Honest to a fault? | *Kind can be honest too.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      swapLabel(x, 800, 860, lt, 0.9, 'BLUNT', 'GENTLE', { size: 60, fromBg: RED, toBg: PINK })
      L(x, 800, 1080, 'SAME TRUTH. SOFTER.', pop01(t, P.t0 + 1.7, 0.3, 2.2), GOLD, 0.04, 28)
    } },
  { sign: S, cap: 'Over it in an hour? | *That’s a gift.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      bits(x, 'CLOCK', 800, 780, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 1040, lt < 1.2 ? 'GRUDGE: ACTIVE' : 'GRUDGE: EXPIRED', pop01(t, P.t0 + 0.4, 0.3, 2), lt < 1.2 ? RED : MINT, -0.04, 34)
      sparkles(x, t, 800, 780, P.t0 + 1.6, 6, 150, 0.4)
    } },
  { sign: S, cap: 'Feeling boxed in? | *Open a window.*', mood: lt => lt > 1.1 ? 'happy' : 'neutral', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      const o = ease.outCubic(prog(lt, 0.6, 1.1))
      drawBits(x, WINDOW, { K: INK, S: o > 0.5 ? SKYB : '#3a3a5a' }, 810, 800, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      if (o > 0.5) for (let i = 0; i < 4; i++) { const ph = ((t * 0.9 + i / 4) % 1); x.save(); x.globalAlpha = 0.7 * Math.sin(Math.PI * ph); x.fillStyle = BONE; x.fillRect(lerp(900, 560, ph), 740 + i * 34, 60, 8); x.restore() }
      L(x, 800, 1080, 'FRESH AIR: ON', pop01(t, P.t0 + 1.2, 0.3, 2.2), SKYB, 0.04, 34)
    } },
  { sign: S, cap: 'Sorry feels awkward? | *Start with a meme.*', mood: lt => lt > 1.4 ? 'wink' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, t, 810, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'TO: THEM', headCol: '#ff9a4a', lines: [['[meme]', GOLD, pop01(t, P.t0 + 0.6, 0.25, 2), true], ['also sorry', BONE, pop01(t, P.t0 + 1.2, 0.25, 2), true], ['lol ok. me too', MINT, pop01(t, P.t0 + 1.9, 0.25, 2), false]], typing: lt > 1.4 && lt < 1.9 ? 1 : 0 })
    } },
  { sign: S, cap: 'You came back. | *That’s what matters.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      friend(x, t, 'aries', 820, 920, 200, pop01(t, P.t0 + 0.3, 0.35, 2), { mood: 'happy', look: [-1, 0] })
      bubble(x, 820, 680, 'truce?', pop01(t, P.t0 + 0.9, 0.25, 2.4), { size: 56, col: '#ff6b5a', tail: 'bl' })
      hearts(x, t, 680, 880, P.t0 + 1.6, { n: 4, life: 1.6, spread: 200, cell: 7, seed: 6 })
    } },
]

const F = makeFilm({
  id: 'r2a0586', key: 'D', accent: ACC, solo: S, ending: 'card',
  title: 'What Sags need | *after a fight.*',
  cameos: CAMEOS,
  card: { a: 'sagittarius', b: 'aries', chip: 'MADE UP' },
  group: { cap: 'Free spirit. | *Big heart.*', mood: 'heart' },
  lesson: { text: 'Space and love | *can share a room.*', chip: 'PEACE: MADE' },
  last: { text: 'Fight fast. | *Forgive faster.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
