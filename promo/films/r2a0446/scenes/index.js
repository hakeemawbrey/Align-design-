// r2a0446: star_advice, ADVICE SOLO, "How to befriend | *a Leo.*" (~51 s vertical, signs3kit social cut, music: lofi · D)
// One sign the whole film (solo mode, 9 cards): a relatable Leo truth + a warm reframe, one light gag each. Ending: lesson.
//   3.6–37.8   laugh at the rehearsed joke · notice the haircut out loud · say yes to the group photo · let them feed you
//              · clap loudest · they'll defend you, let them · tell them your sign · anything shiny · quiet days: sit with them
//  37.8        "Loyal. Loud. | *Yours for life.*"
//  41.0        LESSON: "Cheer for a Leo. | They cheer *back louder.*"  BFF: UNLOCKED
//  46.9        "Welcome to | the *fan club.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { sheet, phone, meter, counter, BM, RED, CREAM, ORANGE, WOOD, GREEN } from './props.js'

const S = 'leo'
const SCISSORS = ['KK....KK', 'KWK..KWK', '.KWKKWK.', '..KWWK..', '..KSSK..', '.KSKKSK.', 'KSK..KSK', 'KK....KK']
const SCISSORS_C = { K: INK, W: '#d8dbe8', S: RED }

const CAMEOS = [
  { sign: S, cap: 'Laugh at the joke. | They *rehearsed it.*', mood: lt => lt > 1.3 ? 'happy' : 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      sheet(x, 780, 850, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 340, h: 360, head: 'JOKE: TAKE 14', headCol: ORANGE, size: 28, rows: [
        ['pause ✓', INK, pop01(t, P.t0 + 0.5, 0.2, 2)], ['wink ✓', INK, pop01(t, P.t0 + 0.8, 0.2, 2)], ['punchline ✓', INK, pop01(t, P.t0 + 1.1, 0.2, 2)], ['you laughed ♡', RED, pop01(t, P.t0 + 1.5, 0.2, 2)],
      ] })
    } },
  { sign: S, cap: 'Notice the haircut. | *Out loud.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', look: [1, 0], star: { x: -170 }, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P, F) {
      drawBits(x, SCISSORS, SCISSORS_C, F.x + 120, F.top - 30, 11 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.4 })
      bubble(x, 790, 680, 'notice | anything??', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 42, tail: 'bl' })
      bubble(x, 790, 960, 'YOUR HAIR!!', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 48, col: GOLD, tail: 'bl' })
      sparkles(x, t, 380, 700, P.t0 + 1.2, 8, 170, 0.4)
    } },
  { sign: S, cap: 'Say yes to | the *group photo.*', mood: 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, BM.CAMERA, BM.CAMERA_C, 790, 820, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const n = 3 - Math.floor(prog(lt, 0.5, 1.6) * 3)
      counter(x, 790, 1040, pop01(t, P.t0 + 0.5, 0.25, 2), lt < 1.6 ? String(Math.max(1, n)) : 'ONE MORE!', { size: 52, bg: lt < 1.6 ? BONE : PINK })
      const dF = lt - 1.6
      if (dF > 0 && dF < 0.25) { x.fillStyle = `rgba(255,250,235,${(0.5 * (1 - dF / 0.25)).toFixed(3)})`; x.fillRect(100, 470, 880, 760) }
    } },
  { sign: S, cap: 'Let them host. | They *love feeding you.*', mood: 'happy', look: [1, 0], star: { x: -170 }, hops: [1.0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      if (k > 0.01) { x.save(); x.fillStyle = INK; x.fillRect(600, 1000, 380 * k, 26); x.fillStyle = WOOD; x.fillRect(606, 1004, 368 * k, 16); x.restore() }
      for (let i = 0; i < 5; i++) drawBits(x, i % 2 ? BM.PIZZA : BM.SOUP, i % 2 ? BM.PIZZA_C : BM.SOUP_C, 650 + i * 72, 960 - (i % 2) * 70 - (i === 2 ? 120 : 0), 10 * pop01(t, P.t0 + 0.4 + i * 0.15, 0.3, 2.2))
      bubble(x, 780, 680, 'seconds? | thirds?', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 42, col: GOLD, tail: 'bl' })
    } },
  { sign: S, cap: 'Go to their thing. | *Clap the loudest.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      label(x, 790, 700, 'APPLAUSE METER', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 32, bg: BONE, rot: 0, font: MONO, weight: 700 })
      meter(x, 790, 800, pop01(t, P.t0 + 0.3, 0.3, 2), ease.outCubic(prog(lt, 0.4, 1.4)) * 1.0, { w: 300, h: 52, col: GOLD, text: lt > 1.4 ? 'MAX ✦' : '' })
      label(x, 790, 940, 'YOU: 11/10', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 40, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 800, P.t0 + 1.4, 8, 180, 0.2)
    } },
  { sign: S, cap: 'They’ll defend you. | *Loudly. Let them.*', mood: 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, BM.SHIELD, BM.SHIELD_C, 520, 900, 14 * pop01(t, P.t0 + 0.25, 0.3, 2))
      bubble(x, 790, 700, 'NOT MY | FRIEND!', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 50, col: ORANGE, tail: 'bl' })
      label(x, 790, 1000, '(you were early)', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Tell them your sign. | They’ll *check the match.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      phone(x, 780, 860, pop01(t, P.t0 + 0.15, 0.3, 2), { head: '♌︎ + YOU', headCol: ORANGE, lines: [
        ['compatible?', BONE, pop01(t, P.t0 + 0.5, 0.25, 2.2)], ['checking…', LAV, pop01(t, P.t0 + 0.9, 0.25, 2.2), true], ['BESTIES ✓', MINT, pop01(t, P.t0 + 1.4, 0.25, 2.2), true],
      ] })
    } },
  { sign: S, cap: 'A gift? | *Anything shiny.*', mood: lt => lt > 1.0 ? 'sparkle' : 'wide', look: [1, 0], star: { x: -170 }, hops: [1.1],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), open = ease.outCubic(prog(lt, 0.8, 1.2))
      drawBits(x, BM.GIFT.slice(2), BM.GIFT_C, 790, 960, 22 * k)
      drawBits(x, BM.GIFT.slice(0, 3), BM.GIFT_C, 790 + open * 80, 870 - open * 120, 22 * k, { rot: open * 0.5 })
      if (lt > 1.0) drawBits(x, BM.STAR5, BM.STAR5_C, 790, 860 - 60 * ease.outCubic(prog(lt, 1.0, 1.4)), 12)
      sparkles(x, t, 790, 820, P.t0 + 1.1, 8, 150, 0.3)
      label(x, 790, 1120, 'IT SPARKLES. 10/10', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'On quiet days, | *just sit with them.*', mood: 'sleepy', look: [1, 0], star: { x: -110, y: 20 },
    back(x, t, lt, P) { drawBits(x, BM.COUCH, BM.COUCH_C, 540, 990, 40 * pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.6, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'libra', 740, 930, 200 * k, { mood: 'happy', look: [-1, 0], seed: 31, glyph: false })
      drawBits(x, BM.BLANKET, BM.BLANKET_C, 560, 1010, 26 * pop01(t, P.t0 + 1.1, 0.3, 2))
      label(x, 600, 640, 'NO SHOW TODAY ♡', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: LAV, rot: 0.03, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0446', key: 'D', accent: ORANGE, solo: S, ending: 'lesson',
  title: 'How to befriend | *a Leo.*',
  cameos: CAMEOS,
  group: { cap: 'Loyal. Loud. | *Yours for life.*', mood: 'heart' },
  lesson: { text: 'Cheer for a Leo. | They cheer *back louder.*', chip: 'BFF: UNLOCKED' },
  last: { text: 'Welcome to | the *fan club.*', draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 0.4, { n: 8, life: 2.2, spread: 600, cell: 8, seed: 2 }) } },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
