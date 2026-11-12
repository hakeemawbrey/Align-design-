// r2a0273: star_advice, ADVICE SOLO (scorpio), "Scorpio, here’s your | *Monday pep talk.*" (~50 s vertical, signs3kit social cut, music: lofi · C)
// Nine cards: a relatable Scorpio truth plus a warm, funny reframe for a Monday. Ending: lesson.
//   yes it's Monday, you've survived worse · your intensity is a superpower · black outfit again? iconic
//   · put the grudge down for today · not everything is a plot (it's just a latte) · feel it all, then go get lunch
//   · someone out there loves deep talks · trust one person a little · you're not too much, you're a lot (good)
//   group "Intense. Loyal. | *Ready.*"  LESSON "Go easy on yourself. | You’re *doing great.*"  last "Now go. | *Mysteriously.*"
import { prog, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { phone, note, meter, calendar, bits, ORANGE, RED, WOOD, PAPER, SLATE } from '../props.js'

const S = 'scorpio', L = { x: -180 }
const HANGER = [['.....KK.....', '....K..K....', '.......K....', '......K.....', '..BBBBBBBB..', '.BBBBBBBBBB.', 'BBBBBBBBBBBB', 'BB.BBBBBB.BB', '...BBBBBB...', '...BBBBBB...', '...BBBBBB...'], { K: '#9aa5c4', B: '#2a2350' }]
const BOX = [['WWWWWWWWWWWW', 'WDDDDDDDDDDW', 'WDDDDDDDDDDW', 'WDDDDDDDDDDW', 'WDDDDDDDDDDW', 'WDDDDDDDDDDW', 'WWWWWWWWWWWW'], { W: '#8a5a2a', D: WOOD }]

const CAMEOS = [
  { sign: S, cap: 'Yes, it’s Monday. | *You’ve survived worse.*', mood: lt => lt > 1.0 ? 'happy' : 'eyeroll', look: [1, 0], star: L,
    front(x, t, lt, P) {
      calendar(x, 790, 790, pop01(t, P.t0 + 0.2, 0.3, 2), 'MONDAY', lt > 0.9 ? 'AGAIN' : 'MON')
      label(x, 790, 1060, 'YOU GOT THIS', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 40, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'That intensity? | *A superpower.*', mood: 'sparkle', look: [1, 0], star: L, hops: [1.2],
    front(x, t, lt, P) {
      meter(x, 790, 820, pop01(t, P.t0 + 0.2, 0.3, 2), ease.inOutCubic(prog(lt, 0.4, 1.3)), { w: 320, col: RED, title: 'INTENSITY' })
      label(x, 790, 1000, 'FULLY CHARGED', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 40, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 820, P.t0 + 1.3, 7, 190, 0.2)
    } },
  { sign: S, cap: 'All black again? | *Iconic.*', mood: lt => lt > 1.1 ? 'wink' : 'neutral', look: [1, 0], star: L,
    front(x, t, lt, P) {
      drawBits(x, HANGER[0], HANGER[1], 790, 810, 24 * pop01(t, P.t0 + 0.2, 0.3, 2), { outline: BONE })
      label(x, 790, 1060, 'DRESS CODE: MYSTERY', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 32, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'That grudge? | *Put it down today.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: L, keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const d = ease.outBounce ? ease.outBounce(prog(lt, 0.6, 1.2)) : ease.outCubic(prog(lt, 0.6, 1.2))
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), y = 720 + 300 * d
      drawBits(x, BOX[0], BOX[1], 790, y, 20 * k)
      if (k > 0.01) { x.save(); x.translate(790, y); x.scale(k, k); x.fillStyle = INK; x.font = `800 40px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('GRUDGE', 0, 2); x.restore() }
      label(x, 790, 620, 'SO LIGHT NOW', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 38, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Not everything | *is a plot.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: L,
    front(x, t, lt, P) {
      bits(x, 'mug', 790, 760, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 950, 'why is it | so… nice?', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 38, tail: 'bl', col: LAV })
      label(x, 790, 1100, 'JUST A LATTE', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 38, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Feel it all. | *Then get lunch.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: L,
    front(x, t, lt, P) {
      note(x, 790, 720, pop01(t, P.t0 + 0.2, 0.3, 2), '1. feel things | 2. noodles', { head: 'TODAY’S PLAN', headBg: PINK, size: 36, w: 340 })
      bits(x, 'bowl', 790, 990, 28 * pop01(t, P.t0 + 1.0, 0.3, 2))
    } },
  { sign: S, cap: 'Someone out there | *loves deep talks.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', look: [1, 0], star: L, hops: [1.2],
    front(x, t, lt, P) {
      phone(x, 790, 820, 1.15 * pop01(t, P.t0 + 0.2, 0.3, 2), { top: '✦', head: 'NEW MATCH', msg: 'deep talk | tonight?', bg: PINK })
      hearts(x, t, 470, 760, P.t0 + 1.2, { n: 4, life: 1.5, spread: 120, cell: 6, seed: 8 })
    } },
  { sign: S, cap: 'Trust one person. | *A little.*', mood: lt => lt > 1.2 ? 'happy' : 'neutral', look: [1, 0], star: L, keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 800, 840, 200 * k, { mood: 'happy', look: [-1, 0], seed: 61, glyph: false, hops: [P.t0 + 1.2] })
      bubble(x, 800, 640, 'hi! :)', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 44, tail: 'bc' })
      label(x, 800, 1070, 'TRUST: A BIT', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 34, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Not too much. | *A lot. In a good way.*', mood: 'sparkle', look: [1, 0], star: L, hops: [0.9, 1.4],
    front(x, t, lt, P) {
      label(x, 790, 760, 'A LOT', pop01(t, P.t0 + 0.3, 0.3, 2.6), { size: 72, bg: RED, color: BONE, rot: -0.06 })
      label(x, 800, 920, '(compliment)', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 44, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 820, P.t0 + 1.2, 8, 210, 0.6)
    } },
]

const F = makeFilm({
  id: 'r2a0273', key: 'C', accent: '#ff6f8a', solo: S, ending: 'lesson',
  title: 'Scorpio, here’s your | *Monday pep talk.*',
  cameos: CAMEOS,
  group: { cap: 'Intense. Loyal. | *Ready.*', mood: 'sparkle' },
  lesson: { text: 'Go easy on yourself. | You’re *doing great.*', chip: 'MONDAY: HANDLED' },
  last: { text: 'Now go. | *Mysteriously.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
