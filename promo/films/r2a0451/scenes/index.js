// r2a0451: star_advice, ADVICE SOLO, "Taurus, it's okay | to miss them." (~52 s vertical, signs3kit social cut, music: lofi · D)
// One sign the whole way through (solo, 9 cards): a relatable Taurus-missing-someone truth + a warm reframe, one gag each.
//   kept the hoodie (it's cozy) · their song came on (let it play) · cooked for two (lunch tomorrow) · day 12 (still growing)
//   · still have their number (okay for now) · slow to let go (roots: deep) · comfort cake, 8 slices (valid)
//   · missing them means it mattered (the old photo) · text a friend: Cancer brings snacks
//  group "Soft heart. | *Strong roots.*"   lesson "You loved for real. | That's *a superpower.*"  HEART: STILL SOFT
//  ending: card. "Snack friend? | *Always a match.*" over Taurus + Cancer (COZY CREW): pays off card 9.
import { clamp, prog } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { phone, note, calendar, frame, bits, ORANGE, RED, WOOD, PAPER, SLATE, GREEN } from '../props.js'

const S = 'taurus', L = { x: -180 }, SAGE = '#9be3b0'
const HOODIE = ['..HHHHH..', '.HHhhhHH.', 'HHHHHHHHH', 'HHHHHHHHH', 'HH.HHH.HH', 'HH.HHH.HH', 'HH.HHH.HH', '...HHH...', '...HHH...']
const RADIO = ['.......A..', '......A...', 'RRRRRRRRRR', 'RSSSRRDDDR', 'RSSSRRDDDR', 'RSSSRRRRRR', 'RRRRRRRRRR']
const ROOTS = ['..R.R.R..', '.R..R..R.', 'R...R...R', '...R.R...', '..R...R..']

const CAMEOS = [
  { sign: S, cap: 'Still have their hoodie? | *Keep it. It’s cozy.*', mood: lt => lt > 1.3 ? 'sleepy' : 'neutral', look: [1, 0], star: L,
    front(x, t, lt, P) {
      drawBits(x, HOODIE, { H: LAV, h: '#a585e0' }, 800, 900, 26 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.05 })
      label(x, 800, 1130, 'COZY: 100%', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 34, bg: SAGE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Their song came on. | *Let it play.*', mood: lt => lt > 1.2 ? 'sleepy' : 'wide', look: [1, 0], star: L,
    front(x, t, lt, P) {
      drawBits(x, RADIO, { R: ORANGE, S: '#5a3a1e', D: GOLD, A: BONE }, 800, 920, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      notes(x, t, 800, 820, { n: 4, cell: 7, col: PINK, seed: 1, alpha: clamp((lt - 0.4) * 3) })
      label(x, 800, 680, 'NOW PLAYING: FEELINGS', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 28, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Cooked for two again? | *Lunch tomorrow.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: L, hops: [1.4],
    front(x, t, lt, P) {
      bits(x, 'bowl', 720, 960, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'bowl', 880, 960, 20 * pop01(t, P.t0 + 0.35, 0.3, 2))
      label(x, 880, 800, 'FOR FUTURE YOU', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Still missing them? | *Still growing.*', mood: 'happy', look: [1, 0], star: L, hops: [1.5],
    front(x, t, lt, P) {
      calendar(x, 800, 880, pop01(t, P.t0 + 0.2, 0.3, 2), 'DAY', String(1 + Math.floor(clamp((lt - 0.3) / 1.2) * 11)), { topBg: SAGE })
      bits(x, 'flower', 640, 1040, 14 * pop01(t, P.t0 + 1.4, 0.3, 2))
    } },
  { sign: S, cap: 'Can’t delete their number? | *That’s okay for now.*', mood: 'neutral', look: [1, 0], star: L,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, 800, 880, pop01(t, P.t0 + 0.2, 0.3, 2), { top: 'contacts', head: 'SAVED', msg: 'them ♡', bg: PINK, size: 40 })
      label(x, 800, 1120, 'NO RUSH', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 36, bg: SAGE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Slow to let go? | *Roots take time.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: L,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      bits(x, 'plant', 800, 870, 22 * k)
      drawBits(x, ROOTS, { R: WOOD }, 800, 1030, 18 * k * clamp((lt - 0.5) * 2), { outline: null })
      label(x, 800, 660, 'ROOTS: DEEP', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 36, bg: SAGE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Comfort cake? | *Valid. Delicious.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: L, hops: [1.3],
    front(x, t, lt, P) {
      bits(x, 'cake', 800, 920, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 800, 1110, `SLICE ${1 + Math.floor(clamp((lt - 0.4) / 1.3) * 7)} OF 8`, pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 34, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Missing them means | *it mattered.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: L,
    front(x, t, lt, P) {
      frame(x, 800, 880, pop01(t, P.t0 + 0.2, 0.3, 2), 240, 200, x => {
        x.fillStyle = '#3a2f6e'; x.fillRect(-120, -100, 240, 200)
        signChar(x, t, 'taurus', -50, 10, 110, { mood: 'happy', seed: 51, glyph: false, glow: 0.4 })
        signChar(x, t, 'gemini', 50, 10, 110, { mood: 'happy', seed: 52, glyph: false, glow: 0.4 })
      }, { col: GOLD })
      hearts(x, t, 800, 820, P.t0 + 1.2, { n: 5, life: 1.6, spread: 180, cell: 6, seed: 2 })
    } },
  { sign: S, cap: 'Text a friend. | *They’ll bring snacks.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: L, hops: [1.6],
    front(x, t, lt, P) {
      bubble(x, 800, 660, 'come over?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 38, tail: 'bl' })
      const k = pop01(t, P.t0 + 1.0, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 770, 960, 200 * k, { mood: 'heart', look: [-1, 0], seed: 33, glyph: false })
      bits(x, 'cookie', 890, 1040, 12 * pop01(t, P.t0 + 1.3, 0.3, 2))
      label(x, 800, 1150, 'ON MY WAY ♡', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 32, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0451', key: 'D', accent: SAGE, solo: S, ending: 'card',
  title: 'Taurus, it’s okay | *to miss them.*',
  cameos: CAMEOS,
  card: { a: 'taurus', b: 'cancer', chip: 'COZY CREW' },
  group: { cap: 'Soft heart. | *Strong roots.*', mood: 'heart' },
  lesson: { text: 'You loved for real. | That’s *a superpower.*', chip: 'HEART: STILL SOFT' },
  last: { text: 'Snack friend? | *Always a match.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
