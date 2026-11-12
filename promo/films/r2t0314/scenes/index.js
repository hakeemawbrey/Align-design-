// r2t0314: THE SIGNS AS… v3, SOLO film, "Aries at | board game night." (~48 s vertical, signs3kit social cut, music: lofi · D)
// One sign the whole way: nine game-night moments, each the most extreme (and lovable) Aries version. Ending: callback.
//   0.0–3.6    "Aries at | *board game night.*"  One big Aries pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              read zero rules, already winning · rolled before their turn · lost one round, best of nine
//              · owned the whole board in four minutes · flipped the timer while you were thinking
//              · invented a rule mid-turn · won, victory lap · charades: guessed their own clue
//              · lost the tiebreaker, challenged the dog
//  37.8        "Just a game? | *Not to Aries.*"  Aries comes back, big.
//  41.2        callback: "Final score? | Best of *forty-one.*" (the best-of-nine, paid off).
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ARED = '#ff6b5a', RED = '#e23d4e', PAPER = '#fff4e2'

// ── props
const DIE = [
  'WWWWWWWWW',
  'WKKWWWWWW',
  'WKKWWWWWW',
  'WWWWKKWWW',
  'WWWWKKWWW',
  'WWWWWWKKW',
  'WWWWWWKKW',
  'WWWWWWWWW',
]
const DIE_C = { W: PAPER, K: INK }
const BOOK = [
  'KKKKKKKKKKKK',
  'KBBBBBBBBBBK',
  'KBWWWWWWWWBK',
  'KBWLLLLLLWBK',
  'KBWWWWWWWWBK',
  'KBWLLLLWWWBK',
  'KBWWWWWWWWBK',
  'KBBBBBBBBBBK',
  'KKKKKKKKKKKK',
]
const BOOK_C = { K: INK, B: '#6fc3ff', W: PAPER, L: '#b9b0a0' }
const GLASS = [
  'BBBBBBBBB',
  '.WSSSSSW.',
  '..WSSSW..',
  '...WSW...',
  '....W....',
  '...W.W...',
  '..W...W..',
  '.WSSSSSW.',
  'BBBBBBBBB',
]
const GLASS_C = { B: '#8a4a2e', W: '#d8dbe8', S: '#ffd23a' }
const DOG = [
  'BB.......',
  'BBB.....B',
  '.BWWWW.BB',
  '.WWKWKWB.',
  '.WWWWWWW.',
  '..WWPWW..',
  '..WWWWWWW',
  '..WWWWWWW',
  '..W.W.W.W',
]
const DOG_C = { B: '#8a4a2e', W: '#e8b77e', K: INK, P: PINK }

/** a little game board: a 5×5 grid of squares, the first n turn the Aries colour */
function board(x, cx, cy, k, n) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-150, -140, 310, 300)
  x.fillStyle = INK; x.fillRect(-162, -162, 324, 324); x.fillStyle = '#5fd068'; x.fillRect(-154, -154, 308, 308)
  for (let j = 0; j < 5; j++) for (let i = 0; i < 5; i++) {
    const idx = j * 5 + i
    x.fillStyle = idx < n ? ARED : PAPER; x.fillRect(-140 + i * 56, -140 + j * 56, 48, 48)
    if (idx < n) { x.fillStyle = '#fff4e2'; x.fillRect(-128 + i * 56, -128 + j * 56, 10, 10) }
  }
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Read zero rules. | *Already winning.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -170 }, hops: [0.6, 1.4],
    front(x, t, lt, P) {
      const fly = ease.inCubic(prog(lt, 0.8, 1.4))
      drawBits(x, BOOK, BOOK_C, lerp(790, 1100, fly), lerp(920, 600, fly), 18 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: lerp(0.05, 2.4, fly), alpha: 1 - prog(lt, 1.2, 1.4) })
      label(x, 790, 700, 'RULEBOOK: 40 PAGES', pop01(t, P.t0 + 0.3, 0.3, 2) * (1 - prog(lt, 0.9, 1.1)), { size: 28, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 900, 'RULES: SKIPPED', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 40, bg: ARED, color: '#fff4e2', rot: 0.04 })
      label(x, 790, 1030, 'SCORE: 1ST', pop01(t, P.t0 + 1.8, 0.3, 2.2), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aries', cap: 'Rolled the dice | *before their turn.*', mood: lt => lt > 1.0 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const r = ease.outCubic(prog(lt, 0.3, 1.0))
      drawBits(x, DIE, DIE_C, lerp(640, 740, r), 960, 16 * pop01(t, P.t0 + 0.3, 0.25, 2), { rot: lerp(3, 0.1, r) })
      drawBits(x, DIE, DIE_C, lerp(700, 870, r), 1000, 16 * pop01(t, P.t0 + 0.35, 0.25, 2), { rot: lerp(-3, -0.15, r) })
      label(x, 800, 700, 'NOT YOUR TURN', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 38, bg: GOLD, rot: -0.04 })
      bubble(x, 800, 820, 'it is now', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'aries', cap: 'Lost one round. | Demanded *best of nine.*', mood: lt => lt > 0.8 ? 'squint' : 'wide', look: [1, 0], star: { x: -170 }, hops: [0.9, 1.5],
    front(x, t, lt, P) {
      const v = lt < 0.9 ? 3 : lt < 1.5 ? 5 : 9
      label(x, 790, 860, `BEST OF ${v}`, pop01(t, P.t0 + (v === 3 ? 0.2 : v === 5 ? 0.9 : 1.5), 0.25, 2.6), { size: 64, bg: v === 9 ? ARED : GOLD, color: v === 9 ? '#fff4e2' : INK, rot: v === 5 ? 0.05 : -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 1060, 'again. AGAIN.', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'aries', cap: 'Owned the whole board | *in four minutes.*', mood: lt => lt > 1.6 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      board(x, 790, 880, pop01(t, P.t0 + 0.2, 0.3, 2), Math.floor(clamp((lt - 0.4) / 1.2) * 25))
      label(x, 790, 1120, 'PROPERTY: ALL', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 36, bg: ARED, color: '#fff4e2', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aries', cap: 'Flipped the timer | *while you were thinking.*', mood: lt => lt > 0.9 ? 'squint' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const fl = ease.inOutCubic(prog(lt, 0.5, 0.9))
      drawBits(x, GLASS, GLASS_C, 790, 900, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: Math.PI * fl })
      bubble(x, 790, 680, 'GO GO GO', pop01(t, P.t0 + 1.0, 0.25, 2.4), { size: 46, col: GOLD, tail: 'bl' })
      label(x, 790, 1110, 'YOU: STILL THINKING', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 28, bg: LAV, rot: 0.04 })
    } },
  { sign: 'aries', cap: 'Invented a new rule. | *Mid-turn.*', mood: lt => lt > 1.2 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -170 }, hops: [1.2],
    front(x, t, lt, P) {
      label(x, 790, 760, 'NEW RULE:', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 34, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 880, 'ARIES WINS', pop01(t, P.t0 + 0.9, 0.3, 2.6), { size: 56, bg: ARED, color: '#fff4e2', rot: 0.04 })
      label(x, 790, 1010, 'EFFECTIVE: NOW', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 28, bg: GOLD, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: 'aries', cap: 'Won. | Took *a victory lap.*', mood: 'sparkle', look: lt => [Math.sin(lt * 5) > 0 ? 1 : -1, 0], star: { x: -170 }, hops: [0.5, 1.0, 1.5, 2.0],
    front(x, t, lt, P) {
      const n = 1 + Math.min(4, Math.floor(lt / 0.5))
      label(x, 790, 760, `LAP ${n}`, pop01(t, P.t0 + 0.2, 0.3, 2), { size: 60, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
      label(x, 790, 920, 'AROUND THE TABLE', pop01(t, P.t0 + 0.8, 0.3, 2), { size: 28, bg: BONE, rot: -0.04 })
      sparkles(x, t, 400, 860, P.t0 + 1.0, 8, 190, 0.6, [GOLD, ARED, BONE])
      bubble(x, 790, 1080, 'GG! GG!', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'aries', cap: 'Charades. | Guessed *their own clue.*', mood: lt => lt > 1.3 ? 'wide' : 'squint', look: [1, -1], star: { x: -170 }, hops: [1.4],
    front(x, t, lt, P) {
      label(x, 790, 700, 'CLUE: ARIES', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 34, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 880, 'OH! OH! | IT’S ME!', pop01(t, P.t0 + 1.2, 0.25, 2.4), { size: 46, col: GOLD, tail: 'bl' })
      label(x, 790, 1080, '+1 POINT (TO ARIES)', pop01(t, P.t0 + 1.7, 0.3, 2.2), { size: 28, bg: MINT, rot: 0.04 })
    } },
  { sign: 'aries', cap: 'Lost the tiebreaker. | Challenged *the dog.*', mood: lt => lt > 1.2 ? 'squint' : 'wide', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, DOG, DOG_C, 820, 1000, 20 * pop01(t, P.t0 + 0.6, 0.3, 2))
      label(x, 790, 700, 'ROUND 2:', pop01(t, P.t0 + 1.0, 0.3, 2), { size: 30, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 790, 'ARIES vs DOG', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 44, bg: ARED, color: '#fff4e2', rot: 0.04 })
      bubble(x, 870, 1170, 'woof', pop01(t, P.t0 + 1.8, 0.25, 2.2), { size: 34, tail: 'bc' })
    } },
]

const F = makeFilm({
  id: 'r2t0314', key: 'D', accent: ARED, solo: 'aries', ending: 'callback',
  title: 'Aries at | *board game night.*',
  cameos: CAMEOS,
  group: { cap: 'Just a game? | *Not to Aries.*', mood: 'squint' },
  last: {
    text: 'Final score? | Best of *forty-one.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.3, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'aries', 540, 1000, 300 * k, { mood: 'sparkle', seed: 12, hops: [t - lt + 1.0, t - lt + 1.8, t - lt + 2.6] })
      const v = Math.min(41, 9 + 2 * Math.floor(Math.max(0, lt - 0.8) / 0.14))
      label(x, 540, 1330, `BEST OF ${v}`, 1.3 * pop01(t, t - lt + 0.7, 0.35, 2.2), { size: 46, bg: v >= 41 ? ARED : GOLD, color: v >= 41 ? '#fff4e2' : INK, rot: -0.04, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
