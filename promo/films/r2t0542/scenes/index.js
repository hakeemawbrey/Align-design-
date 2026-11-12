// r2t0542: star_talk, ROLLCALL, "The signs | doing a crossword." (signs3kit social cut, music: lofi · E).
// Twelve signs in zodiac order, each the most extreme crossword solver. Ending: callback (Sagittarius' made-up word).
import { makeFilm, sparkles, hearts, bubble, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { L, sheet, phone, confetti, friend, bits, swapLabel, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#8fe3ff', ST = { x: -170 }
const BLACK = new Set([1, 3, 11, 13, 21, 23])

/** a 5×5 crossword grid; fill(i) → [letter, colour] or null; n = how many cells are filled so far */
function grid(x, cx, cy, k, { cell = 58, fill = () => null, n = 25, rot = 0.04 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  const W = cell * 5
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-W / 2 + 10, -W / 2 + 12, W, W)
  x.fillStyle = INK; x.fillRect(-W / 2 - 6, -W / 2 - 6, W + 12, W + 12)
  x.font = `800 ${cell * 0.62}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  for (let i = 0; i < 25; i++) {
    const gx = -W / 2 + (i % 5) * cell, gy = -W / 2 + Math.floor(i / 5) * cell
    x.fillStyle = BLACK.has(i) ? INK : CREAM; x.fillRect(gx + 2, gy + 2, cell - 4, cell - 4)
    const f = !BLACK.has(i) && i < n ? fill(i) : null
    if (f) { x.fillStyle = f[1] || INK; x.fillText(f[0], gx + cell / 2, gy + cell / 2 + 2) }
  }
  x.restore()
}
const word = (w, row, col = INK) => i => (Math.floor(i / 5) === row && i % 5 < w.length ? [w[i % 5], col] : null)

const CAMEOS = [
  { sign: 'aries', cap: 'Filled every box. | In pen. *All wrong.*', mood: lt => lt > 1.5 ? 'wide' : 'sparkle', look: [1, 0], star: ST, hops: [0.5, 1.0],
    front(x, t, lt, P) {
      const n = Math.floor(clamp(prog(lt, 0.3, 1.0)) * 25)
      grid(x, 790, 820, pop01(t, P.t0 + 0.15, 0.3, 2), { n, fill: i => ['X', RED] })
      L(x, 790, 1110, 'TIME: 9 SECONDS', pop01(t, P.t0 + 1.2, 0.3, 2.2), GOLD, -0.04, 32)
    } },
  { sign: 'taurus', cap: 'Clue: “a snack.” | *Went to get one.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      grid(x, 790, 760, pop01(t, P.t0 + 0.15, 0.3, 2), { cell: 50, fill: () => null, n: 0 })
      bits(x, 'SANDWICH', 800, 1050, 18 * pop01(t, P.t0 + 1.2, 0.3, 2))
      L(x, 790, 620, 'PUZZLE: PAUSED', pop01(t, P.t0 + 0.8, 0.3, 2.2), PINK, -0.04, 30)
    } },
  { sign: 'gemini', cap: 'Started six puzzles. | *Finished none.*', mood: lt => Math.floor(lt * 2.5) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      for (let i = 0; i < 6; i++) grid(x, 700 + (i % 3) * 90, 760 + Math.floor(i / 3) * 170, 0.45 * pop01(t, P.t0 + 0.2 + i * 0.2, 0.3, 2), { rot: (i - 2.5) * 0.08, n: 4, fill: i2 => ['A', INK] })
      L(x, 790, 1120, 'DONE: 0 OF 6', pop01(t, P.t0 + 1.6, 0.3, 2.2), GOLD, 0.04, 32)
    } },
  { sign: 'cancer', cap: 'Kept every finished one. | *In a scrapbook.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      bits(x, 'BOOK', 790, 860, 26 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.05 })
      L(x, 790, 1100, 'VOLUME 14', pop01(t, P.t0 + 0.9, 0.3, 2.2), PINK, 0.04, 36)
      hearts(x, t, 790, 860, P.t0 + 1.2, { n: 5, life: 1.8, spread: 180, cell: 7, seed: 2 })
    } },
  { sign: 'leo', cap: 'One across: “a star.” | *Wrote their name.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      const n = lt > 0.9 ? 25 : 0
      grid(x, 790, 820, pop01(t, P.t0 + 0.15, 0.3, 2), { n, cell: 68, fill: word('LEO!!', 1, '#ff9a3a') })
      sparkles(x, t, 790, 700, P.t0 + 1.2, 7, 160, 0.4)
      L(x, 790, 1110, 'NAILED IT', pop01(t, P.t0 + 1.5, 0.3, 2.2), GOLD, -0.04, 34)
    } },
  { sign: 'virgo', cap: 'Found a typo. | *Emailed the editor.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 790, 820, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 310, h: 330, head: 'DEAR EDITOR', headBg: MINT, headInk: INK, lines: ['re: clue 14', 'page 1 of 3', 'kind regards'], size: 28, progress: prog(lt, 0.5, 1.4) })
      L(x, 790, 1110, 'SENT 6:02 A.M.', pop01(t, P.t0 + 1.6, 0.3, 2.2), GOLD, 0.04, 32)
    } },
  { sign: 'libra', cap: 'Two answers fit. | *Wrote both.*', mood: lt => lt > 1.6 ? 'wink' : 'squint', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      const n = lt > 0.8 ? 25 : 0
      grid(x, 790, 820, pop01(t, P.t0 + 0.15, 0.3, 2), { n, cell: 68, fill: i => i === 12 ? ['A/E', PINK] : null })
      L(x, 790, 1110, 'BOTH? BOTH.', pop01(t, P.t0 + 1.4, 0.3, 2.2), PINK, -0.04, 36)
    } },
  { sign: 'scorpio', cap: 'Done in four minutes. | *Told no one.*', mood: lt => lt > 1.4 ? 'wink' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const n = Math.floor(clamp(prog(lt, 0.3, 1.1)) * 25)
      grid(x, 790, 800, pop01(t, P.t0 + 0.15, 0.3, 2), { n, fill: i => ['ABCDEFGHIJKLMNOPQRSTUVWXY'[i], '#c97bff'] })
      bubble(x, 790, 1090, 'what puzzle?', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 38, col: LAV, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Made up a word. | *Defended it.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.8, 1.6],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      L(x, 790, 680, 'ZORBLEFLIP', pop01(t, P.t0 + 0.3, 0.3, 2.2), '#ff9a3a', -0.05, 44)
      bubble(x, 790, 900, 'it’s a real | word, look it up!', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 34, tail: 'bl' })
      L(x, 790, 1110, 'DICTIONARY: NO', pop01(t, P.t0 + 1.6, 0.3, 2.2), STEEL, 0.04, 28)
    } },
  { sign: 'capricorn', cap: 'Beat yesterday’s time. | *By one second.*', mood: lt => lt > 1.4 ? 'sparkle' : 'neutral', look: [1, 0], star: ST, hops: [1.5],
    front(x, t, lt, P) {
      bits(x, 'CLOCK', 790, 800, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      if (lt > 0.4) swapLabel(x, 790, 1070, lt, 1.2, 'BEST: 6:41', 'NEW BEST: 6:40', { size: 32, fromBg: STEEL, toBg: MINT })
      if (lt > 1.6) sparkles(x, t, 790, 1070, P.t0 + 1.7 * 1.29, 7, 150, 0.2)
    } },
  { sign: 'aquarius', cap: 'Wrote their own crossword. | *In alien.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const n = Math.floor(clamp(prog(lt, 0.3, 1.2)) * 25)
      grid(x, 790, 820, pop01(t, P.t0 + 0.15, 0.3, 2), { n, fill: i => ['◊∆¤§¥ø∞≈µ¶'[i % 10], '#2fa5c9'] })
      L(x, 790, 1110, 'DIFFICULTY: COSMIC', pop01(t, P.t0 + 1.4, 0.3, 2.2), MINT, -0.04, 30)
    } },
  { sign: 'pisces', cap: 'Clue: “heartbreak.” | *Needed a minute.*', mood: lt => lt < 0.9 ? 'neutral' : 'wide', tears: lt => lt < 0.9 ? 1 : 3, look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      grid(x, 790, 760, pop01(t, P.t0 + 0.15, 0.3, 2), { cell: 50, n: 0 })
      bits(x, 'TISSUE', 790, 1060, 18 * pop01(t, P.t0 + 1.0, 0.3, 2))
      L(x, 790, 620, '14 DOWN: TOO REAL', pop01(t, P.t0 + 0.6, 0.3, 2.2), LAV, -0.04, 28)
    } },
]

const F = makeFilm({
  id: 'r2t0542', key: 'E', accent: ACC, ending: 'callback',
  title: 'The signs doing | *a crossword.*',
  cameos: CAMEOS,
  group: { cap: 'Nobody finished. | *Everyone* won.' },
  last: {
    text: 'Next day’s answer: | *“zorbleflip.”*',
    draw(x, t, lt) {
      const t0 = t - lt
      const k = pop01(t, t0 + 0.2, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'sagittarius', 380, 1080, 250 * k, { mood: lt > 1.3 ? 'sparkle' : 'wide', look: [1, 0], seed: 9, hops: [t0 + 1.3, t0 + 1.9] })
      grid(x, 750, 1060, pop01(t, t0 + 0.5, 0.3, 2), { cell: 66, n: 25, fill: word('ZORBL', 1, '#ff9a3a') })
      L(x, 740, 1290, 'IT’S OFFICIAL', pop01(t, t0 + 1.2, 0.3, 2.4), GOLD, -0.04, 32)
      if (lt > 1.3) confetti(x, t, 560, 960, t0 + 1.3, { n: 20, spread: 320 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
