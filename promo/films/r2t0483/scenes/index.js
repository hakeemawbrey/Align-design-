// r2t0483: star_talk, ROLLCALL, "The signs | at chess club." (~54 s vertical, signs3kit social cut, music: lofi · G).
// Ending: group (the group beat is the punchline).
//   0.0–3.6    "The signs | *at chess club.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   one chess club moment per sign (3.8 s each):
//              ♈ moved before the game started · ♉ brought chocolate pieces, ate their own queen · ♊ played both
//              sides, lost to themself · ♋ won't take your pawn, it has a family · ♌ won once, bought a trophy
//              · ♍ straightens every piece, every turn · ♎ offered a draw on move one · ♏ already knows your next
//              fourteen moves · ♐ knocked the board over laughing · ♑ a five-year plan for one game · ♒ new rule:
//              the horse flies · ♓ held a funeral for your knight
//  49.2        "Game one. | *Day nine.*"  The twelve fly up into a group photo; a "NOBODY HAS WON" sign.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const PAPER = '#fff4e2', RED = '#e23d4e', ACC = '#7dffb0'

const PAWN = ['.PP.', 'PPPP', '.PP.', '.PP.', 'PPPP', 'PPPP']
const KING = ['..P..', '.PPP.', '..P..', '.PPP.', 'PPPPP', '.PPP.', '.PPP.', 'PPPPP', 'PPPPP']
const QUEEN = ['P.P.P', 'PPPPP', '.PPP.', '.PPP.', '..P..', '.PPP.', 'PPPPP', 'PPPPP']
const KNIGHT = ['..PPP.', '.PPPPP', 'PPWPPP', 'PPPPPP', '...PPP', '..PPP.', '.PPPP.', 'PPPPPP', 'PPPPPP']
const WING = ['WW....', 'WWWW..', '.WWWWW', '..WWWW', '....WW']
const TROPHY = [
  'GGGGGGGGGG',
  'G.GGGGGG.G',
  'G.GGGGGG.G',
  '.GGGGGGGG.',
  '..GGGGGG..',
  '....GG....',
  '....GG....',
  '..BBBBBB..',
  '.BBBBBBBB.',
]
const TROPHY_C = { G: GOLD, B: '#8a4a2e' }
const FLOWER = ['.P.P.', 'PPYPP', '.PPP.', '..G..', '.GG..', '..G..']
const CLIP = [
  '...KKKK...',
  'BBBKKKKBBB',
  'BWWWWWWWWB',
  'BWKKKKKKWB',
  'BWWWWWWWWB',
  'BWKKKKKWWB',
  'BWWWWWWWWB',
  'BWKKKKKKWB',
  'BWWWWWWWWB',
  'BWKKKWWWWB',
  'BBBBBBBBBB',
]
const CLIP_C = { K: '#6b62a8', B: '#8a4a2e', W: PAPER }

// a small chessboard (n×n squares), with an optional slight tilt
function board(x, cx, cy, sq, k, { n = 4, rot = 0 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  const w = n * sq
  x.fillStyle = INK; x.fillRect(-w / 2 - 8, -w / 2 - 8, w + 16, w + 16)
  for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) { x.fillStyle = (i + j) % 2 ? '#6b4a8a' : PAPER; x.fillRect(-w / 2 + i * sq, -w / 2 + j * sq, sq, sq) }
  x.restore()
}
const piece = (x, bm, cx, cy, cell, col, o = {}) => drawBits(x, bm, { P: col, W: INK }, cx, cy, cell, o)

const L = { x: -160 }, R = { x: 150 }
const CAMEOS = [
  { sign: 'aries', cap: 'Moved before | *the game started.*', mood: 'sparkle', star: L, hops: [0.4, 0.8],
    front(x, t, lt, P) {
      board(x, 790, 980, 54, pop01(t, P.t0 + 0.15, 0.3, 2))
      const m = ease.inOutCubic(prog(lt, 0.5, 0.9))
      piece(x, PAWN, lerp(763, 763, m), lerp(1060, 900, m), 12, PAPER)
      label(x, 790, 720, 'CLOCK: NOT STARTED', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Brought chocolate pieces. | Ate *their own queen.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', star: L, hops: [1.2],
    front(x, t, lt, P) {
      board(x, 790, 1000, 54, pop01(t, P.t0 + 0.15, 0.3, 2))
      piece(x, QUEEN, 760, 920, 14, '#8a4a2e', { alpha: 1 - prog(lt, 0.8, 1.1) })
      piece(x, PAWN, 840, 950, 12, '#8a4a2e')
      label(x, 790, 720, 'QUEEN: EATEN', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 36, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Played both sides. | *Lost to themself.*', mood: lt => lt > 1.5 ? 'wide' : 'wink', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      board(x, 600, 1060, 40, pop01(t, P.t0 + 0.15, 0.3, 2))
      const k = pop01(t, P.t0 + 0.4, 0.4, 2)
      if (k > 0.01) signChar(x, t, 'gemini', 800, 900, 230 * k, { mood: lt > 1.5 ? 'sparkle' : 'squint', look: [-1, 0], seed: 19, glyph: false })
      label(x, 800, 1110, 'WINNER: ALSO ME', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 30, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Won’t take your pawn. | *It has a family.*', mood: lt => lt > 1.2 ? 'wide' : 'happy', look: [1, 0], star: L,
    front(x, t, lt, P) {
      for (let i = 0; i < 4; i++) piece(x, PAWN, 680 + i * 72, 1000, i === 0 ? 18 : 12, PAPER, { alpha: pop01(t, P.t0 + 0.2 + i * 0.15, 0.3, 2) })
      bubble(x, 790, 760, 'he has | kids!!', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 44, tail: 'bl' })
      hearts(x, t, 790, 980, P.t0 + 1.4, { n: 4, life: 1.6, spread: 200, cell: 7, seed: 2 })
    } },
  { sign: 'leo', cap: 'Won one game. | *Bought a trophy.*', mood: 'sparkle', star: L, hops: [1.0],
    front(x, t, lt, P) {
      drawBits(x, TROPHY, TROPHY_C, 790, 950, 24 * pop01(t, P.t0 + 0.3, 0.4, 2))
      label(x, 790, 1130, 'CHAMPION (SELF-NAMED)', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 28, bg: '#ffb34a', rot: 0.04 })
      sparkles(x, t, 790, 930, P.t0 + 1.0, 7, 170, 0.2)
    } },
  { sign: 'virgo', cap: 'Straightens every piece. | *Every turn.*', mood: 'squint', look: [1, 0], star: L,
    front(x, t, lt, P) {
      board(x, 790, 990, 54, pop01(t, P.t0 + 0.15, 0.3, 2))
      const st = ease.outCubic(prog(lt, 0.6, 1.2))
      for (let i = 0; i < 4; i++) piece(x, PAWN, 709 + i * 54, 1048, 9, PAPER, { rot: (1 - st) * (i % 2 ? 0.4 : -0.35) })
      label(x, 790, 720, 'OFF BY: 1 MM', pop01(t, P.t0 + 0.4, 0.3, 2), { size: 34, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1150, 'FIXED. AGAIN.', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 30, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Offered a draw. | *On move one.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: L,
    front(x, t, lt, P) {
      bubble(x, 790, 740, 'draw? we | both win!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, tail: 'bl' })
      piece(x, KING, 730, 990, 16, PAPER, { alpha: pop01(t, P.t0 + 0.7, 0.3, 2) })
      piece(x, KING, 850, 990, 16, '#6b4a8a', { alpha: pop01(t, P.t0 + 0.8, 0.3, 2) })
      label(x, 790, 1140, 'MATCH: A TIE', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 32, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Knows your next move. | *And the next fourteen.*', mood: lt => lt > 1.4 ? 'wink' : 'neutral', look: [1, 0], star: L,
    front(x, t, lt, P) {
      bubble(x, 790, 760, 'knight to | c3. then…', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, col: LAV, tail: 'bl' })
      piece(x, KNIGHT, 790, 990, 18, PAPER, { alpha: pop01(t, P.t0 + 0.6, 0.3, 2) })
      label(x, 790, 1140, 'PREDICTED: 14', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Laughed so hard | *the board flew.*', mood: lt => lt > 0.7 ? 'sparkle' : 'happy', star: R, hops: [0.7, 1.1],
    front(x, t, lt, P) {
      const f = ease.outCubic(prog(lt, 0.7, 1.6))
      board(x, 320, 1000 - 220 * Math.sin(Math.PI * Math.min(1, f)) * 0.6, 50, pop01(t, P.t0 + 0.15, 0.3, 2), { rot: f * 2.4 })
      const BMS = [PAWN, KING, QUEEN, KNIGHT, PAWN]
      BMS.forEach((bm, i) => { if (f > 0) piece(x, bm, 320 + Math.cos(i * 1.3) * 240 * f, 980 - Math.sin(Math.PI * f) * (180 + i * 40) + f * 80, 9, i % 2 ? PAPER : '#6b4a8a', { rot: f * (i + 1) }) })
      bubble(x, 320, 720, 'HAHA sorry', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 40, tail: 'br' })
    } },
  { sign: 'capricorn', cap: 'A five-year plan. | *For one game.*', mood: 'neutral', look: [-1, 0], star: R,
    front(x, t, lt, P) {
      drawBits(x, CLIP, CLIP_C, 320, 940, 24 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: -0.05 })
      label(x, 320, 700, 'PHASE 1 OF 9', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 34, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
      label(x, 320, 1150, 'MOVE 1: PENDING', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 30, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'New rule: | *the horse flies.*', mood: 'sparkle', look: [1, -1], star: L, hops: [1.3],
    front(x, t, lt, P) {
      const fy = 980 - 160 * ease.inOutCubic(prog(lt, 0.6, 1.4)) + 10 * Math.sin(t * 4)
      const flap = Math.sin(t * 14) > 0 ? 1 : 0.7
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, WING, { W: SKYB }, 730, fy - 20, 12 * k, { sy: flap })
      drawBits(x, WING, { W: SKYB }, 850, fy - 20, 12 * k, { sx: -1, sy: flap })
      piece(x, KNIGHT, 790, fy, 15, PAPER, { alpha: k })
      label(x, 790, 1140, 'RULEBOOK: UPDATED', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 30, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Your knight got taken. | Pisces *held a funeral.*', mood: 'wide', tears: lt => lt < 0.8 ? 2 : 3, star: L,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      piece(x, KNIGHT, 790, 990, 16, PAPER, { rot: Math.PI / 2, alpha: pop01(t, P.t0 + 0.2, 0.3, 2) })
      for (let i = 0; i < 3; i++) drawBits(x, FLOWER, { P: [PINK, LAV, GOLD][i], Y: GOLD, G: '#5fd068' }, 700 + i * 90, 1110, 13 * pop01(t, P.t0 + 0.7 + i * 0.15, 0.3, 2))
      bubble(x, 790, 760, 'it was a | good match', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'r2t0483', key: 'G', accent: ACC, ending: 'group',
  title: 'The signs | *at chess club.*',
  cameos: CAMEOS,
  group: {
    cap: 'Game one. | *Day nine.*',
    draw(x, t, lt) { label(x, 540, 760, 'NOBODY HAS WON', pop01(t, t - lt + 1.4, 0.35, 2.2), { size: 44, bg: GOLD, rot: -0.04, font: MONO, weight: 700 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
