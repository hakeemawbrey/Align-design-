// r2t0452: star_talk, SOLO, "Shopping with a | Capricorn." (topic: Capricorns shopping, be like) (~51 s vertical, signs3kit social cut, music: lofi · E)
// One sign (solo, 9 cards): Capricorn's most extreme, most organised version of a shopping trip. Ending: lesson.
//   a spreadsheet for groceries · compared prices at nine stores · one sock, an investment piece · "treated themself" to a
//   48-pack · haggled with the self-checkout · window shopping: bought the window · read the fine print twice
//   · checked the store's compatibility · spent nothing: great day
//  group "One cart. | *A five-year plan.*"   lesson "Love a Capricorn. | They *plan for two.*"  BUDGET: BLESSED
//  last "Their big splurge? | *A nicer pen.*"
import { clamp, prog } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { phone, note, frame, bits, ORANGE, RED, WOOD, PAPER, SLATE, GREEN } from '../props.js'

const S = 'capricorn', L = { x: -180 }, TEAL = '#5fd0c0'
const SOCK = ['.SSS..', '.SSS..', '.sss..', '.SSS..', '.SSS..', '.SSSS.', 'SSSSSS', 'SSSSS.']
const BOX = ['BBBBBBBBB', 'BbbbbbbbB', 'BbBBBBBbB', 'BbbbbbbbB', 'BBBBBBBBB']
const PEN = ['......GG', '.....GBG', '....GBG.', '...GBG..', '..GBG...', '.GBG....', 'KBG.....', 'KK......']

const CAMEOS = [
  { sign: S, cap: 'A spreadsheet | *for the grocery run.*', mood: 'squint', look: [1, 0], star: L,
    front(x, t, lt, P) {
      note(x, 800, 870, pop01(t, P.t0 + 0.2, 0.3, 2), 'milk ....... 1 | eggs ....... 12 | snacks ..... 0', { head: 'GROCERIES_V7', headBg: TEAL, size: 28, w: 340, font: MONO, weight: 700, rot: 0.03 })
      label(x, 800, 1110, 'COLOUR-CODED', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 34, bg: GOLD, rot: -0.04 })
    } },
  { sign: S, cap: 'Compared prices | at *nine stores.*', mood: lt => lt > 1.4 ? 'sparkle' : 'neutral', look: [1, 0], star: L, hops: [0.6, 1.1, 1.6],
    front(x, t, lt, P) {
      const n = 1 + Math.floor(clamp((lt - 0.2) / 1.4) * 8.99)
      bits(x, 'house', 800, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 800, 680, `STORE ${n}/9`, pop01(t, P.t0 + 0.3, 0.3, 2.2), { size: 44, bg: TEAL, rot: 0.04, font: MONO, weight: 700 })
      label(x, 800, 1110, 'SAVED: 4 CENTS', pop01(t, P.t0 + 1.7, 0.3, 2.2), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Bought one sock. | *Investment piece.*', mood: 'sparkle', look: [1, 0], star: L,
    front(x, t, lt, P) {
      drawBits(x, SOCK, { S: '#7a8cff', s: BONE }, 800, 900, 28 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.1 })
      label(x, 800, 1130, 'COST PER WEAR: TINY', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 28, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: '“Treat yourself.” | *A 48-pack of tissues.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: L, hops: [1.3],
    front(x, t, lt, P) {
      for (let i = 0; i < 4; i++) drawBits(x, BOX, { B: SKYB, b: BONE }, 800, 1040 - i * 80, 18 * pop01(t, P.t0 + 0.2 + i * 0.15, 0.25, 2))
      label(x, 800, 660, 'BULK DEAL ✦', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 38, bg: PINK, rot: 0.04 })
    } },
  { sign: S, cap: 'Haggled with | *the self-checkout.*', mood: 'squint', look: [1, 0], star: L,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, 820, 900, pop01(t, P.t0 + 0.2, 0.3, 2), { top: 'SCAN', head: 'CHECKOUT', msg: 'please wait | for help', bg: SKYB, size: 30, rot: 0 })
      bubble(x, 440, 640, 'final offer.', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 38, tail: 'bc' })
    } },
  { sign: S, cap: 'Window shopping. | *Bought the window.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: L, hops: [1.4],
    front(x, t, lt, P) {
      frame(x, 800, 880, pop01(t, P.t0 + 0.2, 0.3, 2), 240, 260, x => {
        x.fillStyle = '#8fe3ff'; x.fillRect(-120, -130, 240, 260); x.fillStyle = 'rgba(255,255,255,0.5)'; x.fillRect(-90, -110, 30, 160); x.fillRect(-40, -110, 14, 120)
        x.fillStyle = WOOD; x.fillRect(-6, -130, 12, 260); x.fillRect(-120, -6, 240, 12)
      }, { col: WOOD, rot: 0.03 })
      label(x, 800, 1110, 'SOLD ✓', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 44, bg: RED, color: PAPER, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: '“SALE!” | Read the fine print. *Twice.*', mood: 'squint', look: [1, 0], star: L,
    front(x, t, lt, P) {
      note(x, 800, 870, pop01(t, P.t0 + 0.2, 0.3, 2), 'SALE* | *on tuesdays | *if it rains', { head: '50% OFF*', headBg: RED, size: 32, w: 320, rot: -0.04 })
      label(x, 800, 1110, 'READ: 2 TIMES', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 32, bg: TEAL, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Checked their compatibility | *with the store.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: L,
    front(x, t, lt, P) {
      label(x, 800, 740, '♑︎ + STORE', pop01(t, P.t0 + 0.2, 0.3, 2.2), { size: 46, bg: BONE, rot: 0.03, font: MONO, weight: 700 })
      label(x, 800, 920, '✦ LOYALTY: ALIGNED', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 800, 900, P.t0 + 1.2, { n: 5, life: 1.6, spread: 200, cell: 6, seed: 4 })
    } },
  { sign: S, cap: 'Spent nothing. | *Best day ever.*', mood: lt => lt > 1.0 ? 'heart' : 'sparkle', look: [1, 0], star: L, hops: [1.0, 1.7],
    front(x, t, lt, P) {
      note(x, 800, 870, pop01(t, P.t0 + 0.2, 0.3, 2), 'items: 0 | TOTAL: 0.00', { head: 'RECEIPT', headBg: BONE, size: 34, w: 320, font: MONO, weight: 700, rot: 0.04 })
      sparkles(x, t, 800, 870, P.t0 + 1.0, 8, 200, 0.4)
      label(x, 800, 1100, 'PERSONAL BEST', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 34, bg: MINT, rot: -0.04 })
    } },
]

const F = makeFilm({
  id: 'r2t0452', key: 'E', accent: TEAL, solo: S, ending: 'lesson',
  title: 'Shopping with a | *Capricorn.*',
  cameos: CAMEOS,
  group: { cap: 'One cart. | *A five-year plan.*', mood: 'sparkle' },
  lesson: { text: 'Love a Capricorn. | They *plan for two.*', chip: 'BUDGET: BLESSED' },
  last: {
    text: 'Their big splurge? | *A nicer pen.*',
    draw(x, t, lt) { drawBits(x, PEN, { G: GOLD, B: '#2a2350', K: INK }, 790, 1130, 30 * pop01(t, t - lt + 0.8, 0.35, 2)); sparkles(x, t, 790, 1130, t - lt + 1.1, 8, 180, 0.2) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
