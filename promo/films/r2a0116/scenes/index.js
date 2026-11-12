// r2a0116: ADVICE SOLO, "Aquarius, let yourself | be loved." (~52 s vertical, signs3kit social cut, music: lofi · D)
// One sign the whole film (makeFilm solo mode, 9 cards): a relatable Aquarius truth + a warm reframe, one gag each.
//   0.0–3.6    "Aquarius, let yourself | *be loved.*"
//   3.6–37.8   hugs feel weird (start with a high five) · help is teamwork (a heavy box, two carriers) · your weird is
//              adorable (alien headband: so cute!) · compliment incoming (lower the shield) · need space (a friend waits
//              with a snack) · birthday attention (just say thanks) · feelings are data (upload: feelings) · saving the
//              world (someone saved you a seat) · your people chose you
//  37.8        "Different is | *lovable.*"
//  41.0        LESSON: "You don’t have to earn it. | Just *let it in.*"  STATUS: LOVED
//  46.9        "From high five | to *full hug.*" over the match card: Aquarius + Leo (the high-five friend, paid off).
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const AQUA = '#6fc3ff', BROWN = '#8a4a2e', RED = '#e23d4e'
const S = 'aquarius'

const BOX = ['BBBBBBBBBBBB', 'BBBBBTTBBBBB', 'BBBBBTTBBBBB', 'BBBBBBBBBBBB', 'BBBBBBBBBBBB', 'BBBBBBBBBBBB', 'BBBBBBBBBBBB']
const BOX_C = { B: '#c98f5a', T: '#e8c48a' }
const ANTENNA = ['G.......G', '.K.....K.', '..K...K..', '..KKKKK..']
const ANT_C = { G: MINT, K: '#9aa5c4' }
const SHIELD = ['.SSSSSSS.', 'SSSSSSSSS', 'SSSWWWSSS', 'SSSWWWSSS', 'SSSSSSSSS', '.SSSSSSS.', '..SSSSS..', '...SSS...', '....S....']
const SHIELD_C = { S: '#9aa5c4', W: BONE }
const CAKE = ['..F..F..F..', '..W..W..W..', 'PPPPPPPPPPP', 'PBPPBPPBPPB', 'CCCCCCCCCCC', 'CCCCCCCCCCC', 'CCCCCCCCCCC']
const CAKE_C = { F: GOLD, W: BONE, P: PINK, B: '#ffffff', C: '#c98f5a' }
const CHAIR = ['RRRRRR', 'RRRRRR', 'RRRRRR', 'R....R', 'RRRRRR', 'RRRRRR', 'K....K', 'K....K', 'K....K']
const CHAIR_C = { R: RED, K: BROWN }

// a laptop with an upload bar
function laptop(x, cx, cy, k, p) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-150, -110, 300, 196); x.fillStyle = '#2a2350'; x.fillRect(-140, -100, 280, 176)
  x.fillStyle = '#140c30'; x.fillRect(-124, -84, 248, 144)
  x.fillStyle = BONE; x.font = `700 24px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('feelings.txt', 0, -46)
  x.fillStyle = INK; x.fillRect(-104, 4, 208, 30); x.fillStyle = MINT; x.fillRect(-100, 8, 200 * p, 22)
  x.fillStyle = INK; x.fillRect(-180, 86, 360, 26); x.fillStyle = '#9aa5c4'; x.fillRect(-172, 90, 344, 18)
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Hugs feel weird? | Start with *a high five.*', mood: lt => lt > 1.3 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -170 }, hops: [1.25],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.25, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'leo', 790, 960, 220 * k, { mood: lt > 1.3 ? 'heart' : 'happy', look: [-1, 0], seed: 11, glyph: false, hops: [P.t0 + 1.6] })
      bubble(x, 790, 720, 'up top!', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 44, tail: 'bc' })
      sparkles(x, t, 580, 860, P.t0 + 1.6, 7, 130, 0.3)
      label(x, 580, 1120, 'HIGH FIVE ✓', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Asking for help? | That’s *teamwork.*', mood: lt => lt > 1.2 ? 'happy' : 'squint', look: [1, 0], star: { x: -200, s: 260 },
    front(x, t, lt, P) {
      const lift = ease.outCubic(prog(lt, 1.0, 1.6))
      drawBits(x, BOX, BOX_C, 560, 1050 - 60 * lift, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const k = pop01(t, P.t0 + 0.7, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'taurus', 820, 980, 220 * k, { mood: 'sparkle', look: [-1, 0], seed: 13, glyph: false })
      label(x, 800, 700, 'TEAMWORK', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 44, bg: MINT, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Your weird? | Someone finds it *adorable.*', mood: 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P, F) {
      drawBits(x, ANTENNA, ANT_C, F.x, F.top - 40, 18 * pop01(t, P.t0 + 0.25, 0.3, 2))
      bubble(x, 780, 760, 'so cute!!', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 48, col: PINK, tail: 'bl' })
      hearts(x, t, 780, 1000, P.t0 + 1.1, { n: 5, life: 1.8, spread: 180, cell: 8, seed: 2 })
    } },
  { sign: S, cap: 'Compliment incoming? | *Don’t dodge it.*', mood: lt => lt > 1.4 ? 'heart' : 'wide', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P, F) {
      const down = ease.inOutCubic(prog(lt, 1.0, 1.4))
      drawBits(x, SHIELD, SHIELD_C, F.x + 80, lerp(F.cy, F.cy + 260, down), 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { alpha: 1 - down })
      bubble(x, 790, 760, 'you’re great!', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 42, tail: 'bl' })
      label(x, 790, 1000, 'RECEIVED ✓', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 40, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Need space? | Say so. *They’ll wait.*', mood: 'sleepy', star: { x: -200, s: 260 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 810, 990, 200 * k, { mood: 'happy', look: [-1, 0], seed: 15, glyph: false })
      label(x, 810, 1170, 'WAITING W/ SNACKS', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 28, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 800, 720, 'take your | time!', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 40, tail: 'bc' })
    } },
  { sign: S, cap: 'Birthday attention? | *Just say thanks.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, CAKE, CAKE_C, 790, 960, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 740, 'thank… you?', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 42, tail: 'bl' })
      label(x, 790, 1130, 'NAILED IT', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 38, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 900, P.t0 + 1.5, 7, 160, 0.4)
    } },
  { sign: S, cap: 'Feelings are data | *worth sharing.*', mood: lt => lt > 1.6 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const p = clamp((lt - 0.5) / 1.3)
      laptop(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), p)
      label(x, 790, 650, p >= 1 ? 'SHARED ✓' : 'UPLOADING…', pop01(t, P.t0 + 0.5, 0.3, 2), { size: 36, bg: p >= 1 ? GOLD : SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Saving the world? | Let someone *save you a seat.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, CHAIR, CHAIR_C, 790, 980, 26 * pop01(t, P.t0 + 0.25, 0.3, 2))
      label(x, 790, 720, 'RESERVED: AQUARIUS', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 30, bg: AQUA, rot: 0.04, font: MONO, weight: 700 })
      hearts(x, t, 790, 900, P.t0 + 1.3, { n: 4, life: 1.6, spread: 140, cell: 6, seed: 4 })
    } },
  { sign: S, cap: 'Your people? | They *chose you* on purpose.', mood: 'heart', star: { x: 0, y: -40, s: 260 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const pals = [['leo', 280, 1060], ['cancer', 540, 1110], ['taurus', 800, 1060]]
      pals.forEach(([id, px, py], i) => { const k = pop01(t, P.t0 + 0.4 + i * 0.2, 0.35, 2); if (k > 0.01) signChar(x, t, id, px, py, 150 * k, { mood: 'sparkle', look: [0, -1], seed: 20 + i, glyph: false, hops: [P.t0 + 1.3 + i * 0.1] }) })
      label(x, 540, 610, 'YOUR PEOPLE', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 40, bg: GOLD, rot: -0.03, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0116', key: 'D', accent: AQUA, solo: 'aquarius', ending: 'card',
  title: 'Aquarius, let | yourself *be loved.*',
  cameos: CAMEOS,
  card: { a: 'aquarius', b: 'leo', chip: 'ALIGNED' },
  group: { cap: 'Different is | *lovable.*', mood: 'heart' },
  lesson: { text: 'You don’t have to earn it. | Just *let it in.*', chip: 'STATUS: LOVED' },
  last: {
    text: 'From high five | to *full hug.*',
    draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 0.3, { n: 10, life: 2.2, spread: 700, cell: 8, seed: 3 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
