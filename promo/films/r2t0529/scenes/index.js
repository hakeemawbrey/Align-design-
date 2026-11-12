// r2t0529: star_talk, ROLLCALL, "The signs | at *bingo night.*" (~59 s vertical, signs3kit social cut, music: lofi · D)
// Twelve signs in zodiac order at bingo night, each the most extreme version of itself. Ending: lesson.
//   3.6–49.2   ♈ yelled BINGO at the first number · ♉ came for the snacks · ♊ twelve cards, talking all game
//              · ♋ brought gran, gran is winning · ♌ won, gave a speech · ♍ checked the caller's maths
//              · ♎ picked a seat by compatibility · ♏ knew the number first · ♐ left mid-game for a road trip
//              · ♑ a spreadsheet of every card · ♒ invented reverse bingo · ♓ cried happy for the winner
//  49.2        "Nobody | *read the rules.*"
//  52.4        LESSON: "The prize? | *Each other.*"  GAME: WON
//  58.3        "Aries is still | *yelling bingo.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO, GLYPH_FONT,
} from '../../signs3kit.js'

const CREAM = '#fff8ea', RED = '#e23d4e', BROWN = '#8a4a2e', SLATE = '#9aa5c4', GREEN = '#5fd068', ORANGE = '#ffb34a'

/** a bingo card: 5×5 numbers, `marks` daubed cells (indices), drawn at k */
function bingo(x, cx, cy, k, { marks = [], col = PINK, cell = 52, rot = 0.04, flip = false } = {}) {
  if (k <= 0.01) return
  const W = cell * 5 + 24, H = cell * 5 + 74
  x.save(); x.translate(cx, cy); x.rotate(rot + (flip ? Math.PI : 0)); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-W / 2 + 8, -H / 2 + 10, W, H)
  x.fillStyle = INK; x.fillRect(-W / 2 - 6, -H / 2 - 6, W + 12, H + 12); x.fillStyle = CREAM; x.fillRect(-W / 2, -H / 2, W, H)
  x.fillStyle = col; x.fillRect(-W / 2, -H / 2, W, 54)
  x.fillStyle = INK; x.font = `800 ${Math.round(cell * 0.62)}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  'BINGO'.split('').forEach((c, i) => x.fillText(c, -W / 2 + 12 + cell * (i + 0.5), -H / 2 + 28))
  x.font = `700 ${Math.round(cell * 0.42)}px ${MONO}`
  for (let r = 0; r < 5; r++) for (let c = 0; c < 5; c++) {
    const px = -W / 2 + 12 + cell * (c + 0.5), py = -H / 2 + 64 + cell * (r + 0.5), i = r * 5 + c
    x.fillStyle = '#d8d0c0'; x.fillRect(px - cell / 2 + 2, py - cell / 2 + 2, cell - 4, cell - 4)
    x.fillStyle = INK; x.fillText(String(c * 15 + 1 + ((r * 7 + c * 3) % 14)), px, py + 1)
    if (marks.includes(i)) { x.globalAlpha = 0.75; x.fillStyle = col; x.beginPath(); x.arc(px, py, cell * 0.4, 0, Math.PI * 2); x.fill(); x.globalAlpha = 1 }
  }
  x.restore()
}
const POPCORN = ['.W.WW.W.', 'WWWWWWWW', '.WYWWYW.', 'RWRWRWRW', 'RWRWRWRW', 'RWRWRWRW', '.RWRWRW.']
const TROPHY = ['YYYYYYYYY', 'YY.YYY.YY', '.YYYYYYY.', '..YYYYY..', '...YYY...', '....Y....', '..BBBBB..', '..BBBBB..']
const DAUB = ['.CC.', 'CCCC', 'CCCC', 'CCCC', 'CCCC', 'KKKK', '.KK.']
const BACKPACK = ['..KKKK..', '.K....K.', 'OOOOOOOO', 'OOOOOOOO', 'OYYYYYYO', 'OYOOOOYO', 'OOOOOOOO', 'OOOOOOOO']

const CAMEOS = [
  { sign: 'aries', cap: 'Yelled BINGO. | *First number.*', mood: lt => lt > 1.2 ? 'wide' : 'sparkle', star: { x: -160 }, hops: [0.3, 0.6],
    front(x, t, lt, P) {
      bubble(x, 790, 650, 'BINGO!!!', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 60, col: RED, tail: 'bl' })
      bingo(x, 790, 920, pop01(t, P.t0 + 0.3, 0.3, 2), { marks: [12], col: '#ff6b5a', cell: 44 })
      label(x, 790, 1130, 'MARKED: 1', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Came for the snacks. | *Card untouched.*', mood: 'heart', star: { x: -160 },
    front(x, t, lt, P) {
      drawBits(x, POPCORN, { W: CREAM, Y: GOLD, R: RED }, 790, 820, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1060, 'NUMBERS CALLED: ?', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Twelve cards. | *Talked the whole game.*', mood: 'sparkle', look: lt => [Math.floor(lt * 3) % 2 ? 1 : -1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      for (let i = 0; i < 4; i++) bingo(x, 700 + (i % 2) * 170, 760 + Math.floor(i / 2) * 230, pop01(t, P.t0 + 0.2 + i * 0.15, 0.3, 2), { marks: [i, 7, 12 + i], col: GOLD, cell: 28, rot: (i % 2 ? 0.08 : -0.06) })
      bubble(x, 430, 610, 'anyway SO', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 34, tail: 'bc' })
    } },
  { sign: 'cancer', cap: 'Brought their gran. | *Gran is winning.*', mood: 'heart', look: [1, 0], star: { x: -170 }, hops: [1.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'capricorn', 790, 930, 200 * k, { mood: lt > 1.3 ? 'sparkle' : 'happy', look: [-1, 0], seed: 33, glyph: false, hops: [P.t0 + 1.5] })
      label(x, 790, 680, 'GRAN: 3 WINS', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 36, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 430, 620, 'so proud!', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 34, col: PINK, tail: 'bc' })
    } },
  { sign: 'leo', cap: 'Won one game. | *Gave a speech.*', mood: 'sparkle', star: { x: -160 }, hops: [0.6],
    front(x, t, lt, P) {
      drawBits(x, TROPHY, { Y: GOLD, B: BROWN }, 790, 880, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 640, 'I’d like | to thank…', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 40, tail: 'bl' })
      label(x, 790, 1100, 'SPEECH: MIN 6', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 32, bg: ORANGE, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 860, P.t0 + 0.5, 7, 170, 0.2)
    } },
  { sign: 'virgo', cap: 'Checked the caller’s | *maths.*', mood: 'squint', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bingo(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { marks: [0, 6, 18], col: MINT, cell: 48 })
      label(x, 790, 1110, 'B-12 WAS SKIPPED', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 32, bg: RED, color: CREAM, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Picked a seat | *by compatibility.*', mood: 'happy', look: lt => [Math.sin(lt * 4) > 0 ? 1 : -1, 0], star: { x: -170 }, hops: [1.5],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 840); x.rotate(0.04); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-162, -142, 324, 284); x.fillStyle = '#140c30'; x.fillRect(-154, -134, 308, 268)
        x.fillStyle = PINK; x.fillRect(-154, -134, 308, 58); x.fillStyle = INK; x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('SEAT CHECK', 0, -104)
        x.fillStyle = BONE; x.font = `700 92px ${GLYPH_FONT}`; x.fillText('♎︎ ♊︎', 0, 30)
        x.restore()
      }
      label(x, 790, 1090, 'TABLE 7: APPROVED', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Knew the number | *before the caller.*', mood: 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'G-47.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 56, col: LAV, tail: 'bl' })
      label(x, 790, 940, 'CALLER: “…G-47?”', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 32, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Left mid-game. | *Road trip.*', mood: 'sparkle', star: { x: -160 }, hops: [0.6, 1.2],
    front(x, t, lt, P) {
      drawBits(x, BACKPACK, { K: INK, O: ORANGE, Y: GOLD }, 790, 870, 26 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.08 })
      label(x, 790, 640, 'FINISH MY CARD!', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 32, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1100, 'BACK IN JUNE', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'A spreadsheet | *of every card.*', mood: 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 860); x.rotate(0.04); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-170, -150, 340, 300); x.fillStyle = CREAM; x.fillRect(-162, -142, 324, 284)
        x.fillStyle = GREEN; x.fillRect(-162, -142, 324, 48)
        const n = Math.min(7, 1 + Math.floor(clamp((lt - 0.4) / 1.2) * 7))
        for (let r = 0; r < n; r++) for (let c = 0; c < 4; c++) { x.fillStyle = (r + c) % 3 ? '#d8d0c0' : MINT; x.fillRect(-150 + c * 78, -84 + r * 32, 70, 24) }
        x.restore()
      }
      label(x, 790, 1100, 'TAB 14: STRATEGY', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Invented | *reverse bingo.*', mood: 'wink', star: { x: -170 }, hops: [1.2],
    front(x, t, lt, P) {
      bingo(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { marks: [], col: SKYB, cell: 46, flip: lt > 0.9, rot: 0.04 + (lt > 0.9 ? 0 : Math.sin(t * 6) * 0.04) })
      label(x, 790, 1110, 'LOWEST SCORE WINS', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Didn’t win. | *Cried happy for the winner.*', mood: 'heart', tears: lt => lt > 0.9 ? 3 : 1, star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'taurus', 790, 930, 200 * k, { mood: 'wide', look: [-1, 0], seed: 37, glyph: false })
      label(x, 790, 680, 'WINNER: TAURUS', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 430, 620, 'SO HAPPY | for you', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 34, col: SKYB, tail: 'bc' })
    } },
]

const F = makeFilm({
  id: 'r2t0529', key: 'D', accent: PINK, ending: 'lesson',
  title: 'The signs | at *bingo night.*',
  cameos: CAMEOS,
  group: { cap: 'Nobody | *read the rules.*' },
  lesson: { text: 'The prize? | *Each other.*', chip: 'GAME: WON' },
  last: {
    text: 'Aries is still | *yelling bingo.*',
    draw(x, t, lt) { bubble(x, 540, 780, 'BINGO!!!', pop01(t, t - lt + 0.8 + Math.floor(Math.max(0, lt - 0.8) / 0.9) * 0.9, 0.25, 2.2), { size: 64, col: RED, tail: 'bc' }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
