// r2t0042: star_talk, ROLLCALL, "The signs | at a play." (~62 s vertical, signs3kit social cut, music: lofi · E)
//   0.0–3.6    "The signs | *at a play.*"  The twelve line up, then dive into the pips.
//   3.6–49.2   one night at the theatre per sign, pushed to the extreme:
//              ♈ clapped first, at the wrong moment · ♉ brought snacks, crunchy ones · ♊ whispered the whole time, loudly
//              · ♋ brought tissues for the whole row · ♌ took a bow, wasn't in it · ♍ spotted a continuity error
//              · ♎ shipped the hero with the villain · ♏ guessed the twist from the poster · ♐ left at intermission,
//              found a better show · ♑ arrived early: the day before · ♒ rooting for the tree (no lines)
//              · ♓ cried at the play: a comedy
//  49.2        "Standing ovation. | For *themselves.*"
//  52.4        LESSON: "Everyone feels it | *their own* way."  SEATS: SAVED
//  58.3        "Cancer still | has *tissues.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const CREAM = '#fff4e2', RED = '#e23d4e', WOOD = '#c98f2a'

const CHIPS = [
  '.KKKKKKKK.',
  'KYYYYYYYYK',
  'KYRRRRRRYK',
  'KYRYYYYRYK',
  'KYRRRRRRYK',
  'KYYYYYYYYK',
  'KYYYYYYYYK',
  '.KKKKKKKK.',
]
const CHIPS_C = { K: '#d04030', Y: '#ffd23a', R: RED }
const TISSUE = [
  '....WWW.....',
  '...WWWWW....',
  'BBBBWWWBBBBB',
  'BPPPPPPPPPPB',
  'BPPHPPPPHPPB',
  'BPPPPPPPPPPB',
  'BBBBBBBBBBBB',
]
const TISSUE_C = { W: '#ffffff', B: '#6fc3ff', P: '#bfe6ff', H: PINK }
const ROSE = [
  '.RR.',
  'RRRR',
  '.RR.',
  '..G.',
  '.GG.',
  '..G.',
  '..G.',
]
const ROSE_C = { R: '#ff4f86', G: '#5fd068' }
const VASE = [
  '..BBB..',
  '...B...',
  '..BBB..',
  '.BBBBB.',
  'BBBBBBB',
  '.BBBBB.',
  '..BBB..',
]
const TREE = [
  '....GGG....',
  '..GGGGGGG..',
  '.GGGGGGGGG.',
  'GGGGGGGGGGG',
  '.GGGGGGGGG.',
  '..GGGGGGG..',
  '....BBB....',
  '....BBB....',
  '....BBB....',
  '..WWWWWWW..',
]
const TREE_C = { G: '#5fd068', B: '#8a4a2e', W: '#c98f2a' }
const MOON = ['..YYY.', '.YY...', 'YY....', 'YY....', 'YY....', '.YY...', '..YYY.']

function curtains(x, k) {
  if (k <= 0.01) return
  x.save(); x.globalAlpha *= 0.55 * k
  for (const side of [-1, 1]) {
    const bx = side < 0 ? 110 : 970 - 90
    for (let i = 0; i < 3; i++) { x.fillStyle = i % 2 ? '#a3243a' : '#c8304a'; x.fillRect(bx + i * 30, 480, 30, 740) }
  }
  x.fillStyle = '#a3243a'; x.fillRect(110, 480, 860, 46)
  x.restore()
}
function poster(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-130, -180, 260, 360); x.fillStyle = '#2a2350'; x.fillRect(-122, -172, 244, 344)
  x.fillStyle = GOLD; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText('THE', 0, -130); x.fillText('MYSTERY', 0, -95)
  x.fillStyle = CREAM; x.fillRect(-60, -50, 120, 150); x.fillStyle = INK; x.fillRect(-30, -20, 18, 18); x.fillRect(12, -20, 18, 18)
  x.fillStyle = '#c97bff'; x.fillRect(-36, 30, 72, 14)
  x.fillStyle = BONE; x.font = `700 20px ${MONO}`; x.fillText('starring the butler', 0, 140)
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Clapped first. | At the *wrong moment.*', mood: lt => lt > 1.4 ? 'wide' : 'sparkle', star: { x: -170 }, hops: [0.5, 0.8, 1.1],
    back(x, t, lt, P) { curtains(x, P.k) },
    front(x, t, lt, P) {
      bubble(x, 760, 640, 'BRAVO!!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 52, tail: 'bl' })
      label(x, 780, 880, 'ACT 1 · LINE 2', pop01(t, P.t0 + 1.2, 0.3, 2), { size: 34, bg: GOLD, rot: 0.05 })
      label(x, 760, 1020, '(the actor paused)', pop01(t, P.t0 + 1.7, 0.3, 2), { size: 26, bg: CREAM, rot: -0.04 })
    } },
  { sign: 'taurus', cap: 'Brought snacks. | *Crunchy* ones.', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    back(x, t, lt, P) { curtains(x, P.k) },
    front(x, t, lt, P) {
      const crunch = Math.floor(lt * 4) % 2
      drawBits(x, CHIPS, CHIPS_C, 760, 930, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: crunch ? 0.06 : -0.04 })
      label(x, 760, 690, 'CRUNCH', pop01(t, P.t0 + 0.6, 0.25, 2.2) * (crunch ? 1.1 : 1), { size: 44, bg: '#ffd23a', rot: crunch ? 0.08 : -0.06 })
      bubble(x, 320, 620, 'shhh!', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 40, col: LAV, tail: 'br' })
    } },
  { sign: 'gemini', cap: 'Whispered all night. | *Loudly.*', mood: 'wink', look: [1, 0], star: { x: -170 },
    back(x, t, lt, P) { curtains(x, P.k) },
    front(x, t, lt, P) {
      const W = ['wait, who’s that?', 'what’s his sign?', 'is she the mom?', 'OH I GET IT']
      const n = Math.min(3, Math.floor(Math.max(0, lt - 0.3) / 0.5))
      bubble(x, 740, 720, W[n], pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, tail: 'bl' })
      label(x, 760, 960, 'WHISPER LEVEL: 11', pop01(t, P.t0 + 1.0, 0.3, 2), { size: 30, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Brought tissues | *for the whole row.*', mood: 'sparkle', look: [1, 0], star: { x: -170 },
    back(x, t, lt, P) { curtains(x, P.k) },
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) drawBits(x, TISSUE, TISSUE_C, 760, 1060 - i * 100, 16 * pop01(t, P.t0 + 0.2 + i * 0.2, 0.3, 2), { rot: (i - 1) * 0.05 })
      label(x, 760, 700, 'ROW F: COVERED', pop01(t, P.t0 + 1.1, 0.3, 2), { size: 34, bg: SKYB, rot: -0.05 })
    } },
  { sign: 'leo', cap: 'Took a bow. | *Wasn’t in it.*', mood: 'sparkle', star: { x: -150 }, hops: [1.0],
    back(x, t, lt, P) { curtains(x, P.k) },
    front(x, t, lt, P, F) {
      for (let i = 0; i < 5; i++) {
        const p = prog(lt, 0.7 + i * 0.12, 1.3 + i * 0.12)
        if (p > 0) drawBits(x, ROSE, ROSE_C, lerp(980, F.x - 120 + i * 60, p), lerp(560, 1120, p) - Math.sin(Math.PI * p) * 160, 9, { rot: p * 4 + i })
      }
      label(x, 770, 760, 'ENCORE?', pop01(t, P.t0 + 1.2, 0.3, 2), { size: 40, bg: '#ffb34a', rot: 0.05 })
      bubble(x, 760, 930, 'thank you, | I know', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: 'virgo', cap: 'Spotted a | *continuity error.*', mood: lt => lt > 1.2 ? 'squint' : 'neutral', look: [1, 0], star: { x: -170 },
    back(x, t, lt, P) { curtains(x, P.k) },
    front(x, t, lt, P) {
      const vx = lt > 1.0 ? 830 : 700
      drawBits(x, VASE, { B: '#6fc3ff' }, vx, 1050, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 760, 680, 'the vase | MOVED.', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 42, tail: 'bl' })
      label(x, 760, 880, 'NOTE #14', pop01(t, P.t0 + 1.7, 0.3, 2), { size: 34, bg: MINT, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Shipped the hero | *with the villain.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    back(x, t, lt, P) { curtains(x, P.k) },
    front(x, t, lt, P) {
      label(x, 660, 700, 'HERO', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 32, bg: SKYB, rot: -0.06 })
      label(x, 860, 820, 'VILLAIN', pop01(t, P.t0 + 0.4, 0.3, 2), { size: 32, bg: '#c97bff', rot: 0.06 })
      label(x, 770, 960, '✦ COMPATIBLE ✦', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 34, bg: PINK, rot: -0.03, font: MONO, weight: 700 })
      hearts(x, t, 770, 860, P.t0 + 1.3, { n: 5, life: 1.6, spread: 200, cell: 7, seed: 3 })
    } },
  { sign: 'scorpio', cap: 'Guessed the twist | *from the poster.*', mood: lt => lt > 1.3 ? 'wink' : 'neutral', look: [1, 0], star: { x: -180 },
    back(x, t, lt, P) { curtains(x, P.k) },
    front(x, t, lt, P) {
      poster(x, 770, 830, pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 770, 1080, 'CALLED IT', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 38, bg: RED, color: CREAM, rot: -0.05 })
    } },
  { sign: 'sagittarius', cap: 'Left at intermission. | Found a *better show.*', mood: 'sparkle', star: { x: 120 }, hops: [0.6, 1.2],
    back(x, t, lt, P) { curtains(x, P.k) },
    front(x, t, lt, P) {
      label(x, 320, 700, 'EXIT →', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 40, bg: '#2fc79a', rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 330, 900, 'street | juggler!', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 40, tail: 'br' })
    } },
  { sign: 'capricorn', cap: 'Arrived early. | *The day before.*', mood: lt => lt > 1.5 ? 'sleepy' : 'neutral', star: { x: -170 },
    back(x, t, lt, P) {
      x.save(); x.globalAlpha *= 0.4 * P.k; x.fillStyle = '#05040c'; x.fillRect(110, 480, 860, 740); x.restore()
    },
    front(x, t, lt, P) {
      drawBits(x, MOON, { Y: GOLD }, 800, 680, 20 * pop01(t, P.t0 + 0.3, 0.3, 2))
      label(x, 770, 900, 'DOORS OPEN: TOMORROW', pop01(t, P.t0 + 0.8, 0.3, 2), { size: 28, bg: CREAM, rot: 0.04, font: MONO, weight: 700 })
      label(x, 770, 1030, 'SEAT A1', pop01(t, P.t0 + 1.4, 0.3, 2), { size: 34, bg: '#2fc79a', rot: -0.04 })
    } },
  { sign: 'aquarius', cap: 'Rooting for the tree. | It *had no lines.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, 0], star: { x: -170 },
    back(x, t, lt, P) { curtains(x, P.k) },
    front(x, t, lt, P) {
      drawBits(x, TREE, TREE_C, 790, 960, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 700, 'TREE #2: ICON', pop01(t, P.t0 + 0.9, 0.3, 2), { size: 34, bg: MINT, rot: 0.05 })
      hearts(x, t, 790, 900, P.t0 + 1.4, { n: 4, life: 1.5, spread: 160, cell: 7, seed: 6 })
    } },
  { sign: 'pisces', cap: 'Cried at the play. | It was *a comedy.*', mood: 'wide', tears: lt => lt < 0.9 ? 2 : 3, star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    back(x, t, lt, P) { curtains(x, P.k) },
    front(x, t, lt, P) {
      bubble(x, 770, 680, 'ha ha ha', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 44, col: GOLD, tail: 'bl' })
      label(x, 770, 900, 'GENRE: COMEDY', pop01(t, P.t0 + 0.9, 0.3, 2), { size: 34, bg: '#b7a6ff', rot: -0.05 })
      bubble(x, 770, 1060, 'so moving', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 36, col: SKYB, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'r2t0042', key: 'E', accent: '#ff6b7a', ending: 'lesson',
  title: 'The signs | *at a play.*',
  cameos: CAMEOS,
  group: { cap: 'Standing ovation. | For *themselves.*' },
  lesson: { text: 'Everyone feels it | *their own* way.', chip: 'SEATS: SAVED' },
  last: {
    text: 'Cancer still | has *tissues.*',
    draw(x, t, lt) { drawBits(x, TISSUE, TISSUE_C, 540, 1580, 18 * pop01(t, t - lt + 0.7, 0.35, 2)) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
