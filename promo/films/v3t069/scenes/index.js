// v3t069: THE SIGNS AS… v3, SOLO film, "Scorpios in love | be like." (~45 s vertical, signs3kit social cut, music: lofi · F)
// One sign the whole way through: nine love situations, each pushed to the most extreme (and lovable) Scorpio version.
//   0.0–3.6    "Scorpios in love | *be like.*"  One big Scorpio pops in, then the cards start.
//   3.6–37.8   nine cards: "I love you" once, binding · jealous of your pillow · a nickname nobody else may use
//              · a love letter in code · first date, your deepest fear · shared their playlist · a twelve-clue birthday hunt
//              · you fear moths, they moth-proofed the house · matched with you, deleted everyone else
//  37.8        "Intense. | *Devoted.*"
//  41.2        callback: "And the pillow? | *Finally approved.*"  The rival pillow comes back, forgiven.
import {
  makeFilm, sparkles, hearts, bubble, label, signChar, pop01, drawBits,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'
import { paper, phone, readout, bits, B, clamp, prog, ease, lerp, RED, ORANGE, CREAM, GREY, DEEP, NIGHT } from './props.js'

const ACC = '#e23d66'

const CAMEOS = [
  { sign: 'scorpio', cap: 'Said “I love you” once. | It’s *binding.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: { x: -180 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 780, 660, 'i love you.', pop01(t, P.t0 + 0.25, 0.25, 2.2), { size: 50, tail: 'bl' })
      label(x, 790, 900, 'NO TAKE-BACKS', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 40, bg: ACC, color: CREAM, rot: -0.05, font: MONO, weight: 700 })
      label(x, 790, 1080, 'TERM: FOREVER', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      hearts(x, t, 380, 800, P.t0 + 1.3, { n: 4, life: 1.5, spread: 140, cell: 7, seed: 2 })
    } },
  { sign: 'scorpio', cap: 'Jealous? | *Of your pillow.*', mood: lt => lt > 0.9 ? 'squint' : 'neutral', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      drawBits(x, B.PILLOW.bm, { W: LAV }, 790, 920, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 660, 'who’s | THIS?', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 48, tail: 'bl' })
      label(x, 790, 1110, 'HUGGED IT: 8 HRS', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Gave you a nickname. | *Nobody else* may use it.', mood: lt => lt > 1.3 ? 'wink' : 'heart', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      label(x, 790, 720, '“BEAN”', pop01(t, P.t0 + 0.25, 0.3, 2.2), { size: 70, bg: PINK, rot: -0.05 })
      paper(x, 790, 980, pop01(t, P.t0 + 0.9, 0.3, 2), { w: 330, h: 190, rot: 0.04, head: 'RESERVED', headBg: ACC, lines: ['SCORPIO ONLY'], size: 30, top: 0 })
      bubble(x, 420, 610, 'mine.', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 40, tail: 'bc' })
    } },
  { sign: 'scorpio', cap: 'Their love letter? | *Written in code.*', mood: lt => lt > 1.4 ? 'wink' : 'neutral', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      paper(x, 790, 850, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 310, h: 380, rot: 0.04, head: 'TO YOU', headBg: ACC, headColor: CREAM,
        lines: ['♏︎ ✦ ◇ ▲ ♡', '◇ ▲ ✦ ♏︎ ◆', '♡ ◆ ▲ ◇ ✦', '— S'], size: 32, n: 1 + Math.floor(clamp((lt - 0.3) / 1.0) * 4) })
      label(x, 790, 1110, 'KEY: EARN IT', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'First date? | Asked your *deepest fear.*', mood: lt => lt > 0.8 ? 'squint' : 'neutral', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      bubble(x, 780, 680, 'so. your | deepest fear?', pop01(t, P.t0 + 0.25, 0.25, 2.2), { size: 44, tail: 'bl' })
      label(x, 790, 920, 'SMALL TALK: SKIPPED', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 30, bg: ACC, color: CREAM, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 790, 1100, 'um… moths?', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 36, col: LAV, tail: 'br' })
    } },
  { sign: 'scorpio', cap: 'Shared their playlist. | *A huge step.*', mood: lt => lt > 1.0 ? 'heart' : 'neutral', look: [1, 0], star: { x: -180 }, hops: [1.1],
    front(x, t, lt, P) {
      phone(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 300, h: 460, head: '♫ PRIVATE', headBg: ACC,
        msgs: [{ t: 'track 1 · ???' }, { t: 'track 2 · ???' }, { t: 'track 3 · ???' }, { t: 'shared with: | YOU', me: true, c: GOLD }], n: lt > 0.9 ? 4 : 3, size: 24 })
      sparkles(x, t, 800, 860, P.t0 + 1.0, 7, 220, 0.4)
      label(x, 420, 620, 'TRUST: +1', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: MINT, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Your birthday? | A *twelve-clue* scavenger hunt.', mood: lt => lt > 1.2 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) {
        const k = pop01(t, P.t0 + 0.2 + i * 0.35, 0.3, 2)
        paper(x, 720 + i * 70, 760 + i * 120, k, { w: 230, h: 150, rot: -0.08 + i * 0.07, bg: CREAM, head: `CLUE ${i + 1}/12`, headBg: ACC, lines: ['look under…'], size: 26, top: 6 })
      }
      label(x, 790, 1150, 'PRIZE: THEM', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'You fear moths? | They *moth-proofed the house.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -180 }, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      bits(x, 'MOTH', 790, 850, 26 * k, { rot: Math.sin(t * 6) * 0.08 })
      const s = clamp((lt - 0.7) / 0.4)
      if (s > 0) { x.save(); x.strokeStyle = RED; x.lineWidth = 16; x.lineCap = 'round'; x.beginPath(); x.moveTo(680, 740); x.lineTo(680 + 220 * s, 740 + 220 * s); x.stroke(); if (s >= 1) { x.beginPath(); x.moveTo(900, 740); x.lineTo(680, 960); x.stroke() } x.restore() }
      label(x, 790, 1100, 'MOTHS: 0. EVER.', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Matched with you. | *Deleted everyone else.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: { x: -180 }, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      label(x, 790, 640, '✦ IT’S A MATCH', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      const left = Math.max(1, 5 - Math.floor(clamp((lt - 0.6) / 0.8) * 4))
      for (let i = 0; i < left; i++) paper(x, 790, 760 + i * 70, pop01(t, P.t0 + 0.35, 0.3, 2), { w: 300, h: 56, rot: 0, bg: i === 0 ? PINK : DEEP, color: i === 0 ? INK : GREY, lines: [i === 0 ? '♡ YOU' : 'someone else'], size: 26, top: -28 })
      label(x, 790, 1120, 'MATCHES: 1', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: ACC, color: CREAM, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'v3t069', key: 'F', accent: ACC, solo: 'scorpio', ending: 'callback',
  title: 'Scorpios in love | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Intense. | *Devoted.*', mood: 'heart' },
  last: {
    text: 'And the pillow? | *Finally approved.*',
    draw(x, t, lt) {
      const t0 = t - lt
      signChar(x, t, 'scorpio', 340, 1020, 360 * pop01(t, t0 + 0.3, 0.45, 1.8), { mood: lt > 1.3 ? 'heart' : 'squint', look: [1, 0], seed: 8, hops: [t0 + 1.4] })
      drawBits(x, B.PILLOW.bm, { W: LAV }, 790, 1060, 26 * pop01(t, t0 + 0.6, 0.3, 2), { rot: -0.06 })
      label(x, 600, 1280, 'PILLOW: ALLOWED', pop01(t, t0 + 1.3, 0.3, 2.4), { size: 44, bg: ACC, color: CREAM, rot: -0.03, font: MONO, weight: 700 })
      hearts(x, t, 580, 1150, t0 + 1.5, { n: 8, life: 1.6, spread: 560, cell: 8, seed: 3 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
