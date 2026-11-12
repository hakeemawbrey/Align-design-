// r2t0022: THE SIGNS AS… v3, ROLL CALL, "The signs as | fairy godmothers." (~57 s vertical, signs3kit, music: lofi · E)
// Twelve signs in zodiac order, each the most extreme version of themselves with a magic wand.
//   0.0–3.6    "The signs as | *fairy godmothers.*"
//   3.6–49.2   ♈ pumpkin carriage, speeding ticket · ♉ turned the pumpkin into pie · ♊ two wands, two opinions
//              · ♋ packed snacks and a curfew · ♌ made you a gown, wore a bigger one · ♍ the wand has a 27-page manual
//              · ♎ granted your wish, and theirs (only fair) · ♏ knew your wish before you did · ♐ the carriage became a road trip
//              · ♑ wishes need two weeks' notice · ♒ wish granted, in a parallel universe · ♓ watched you dance, cried the whole song
//  49.2        "You still made it | *to the ball.*"
//  52.6        CALLBACK: "The pumpkin pie? | Taurus *saved you a slice.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, notes, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ORANGE = '#ff9a3a', RED = '#e23d4e', BROWN = '#8a4a2e'

// ── props
const WAND = ['....Y', '...YY', '..B..', '.B...', 'B....']
const WAND_C = { Y: GOLD, B: BONE }
const PUMPKIN = ['....GG....', '...GG.....', '.OOOOOOOO.', 'OOoOOOOoOO', 'OOoOOOOoOO', 'OOoOOOOoOO', 'OOoOOOOoOO', '.OOOOOOOO.']
const PUMPKIN_C = { G: '#5fd068', O: ORANGE, o: '#d9731f' }
const PIE = ['....CCCCCC....', '..CCOOOOOOCC..', '.COOOOOOOOOOC.', 'CCCCCCCCCCCCCC', '.TTTTTTTTTTTT.']
const PIE_C = { C: '#e8b46a', O: ORANGE, T: '#b9773a' }
const SLICE = ['C.....', 'OC....', 'OOC...', 'OOOC..', 'CCCCC.', 'TTTTT.']
const GOWN = ['....PP....', '...PPPP...', '...PPPP...', '..PPPPPP..', '.PPPPPPPP.', 'PPPPPPPPPP', 'PPPPPPPPPP', 'PPPPPPPPPP']
const BOOK = ['KKKKKKKKKKK', 'KWWWWKWWWWK', 'KWWWWKWWWWK', 'KWWWWKWWWWK', 'KWWWWKWWWWK', 'KWWWWKWWWWK', 'KKKKKKKKKKK']
const BALL = ['...KKKK...', '.KSSSSSSK.', 'KSWSSSSSSK', 'KSSSSSSSSK', 'KSSSSSSSSK', '.KSSSSSSK.', '..KKKKKK..', '.BBBBBBBB.', 'BBBBBBBBBB']
const BALL_C = { K: INK, S: '#c97bff', W: '#ffffff', B: BROWN }
const CAR = ['....SSSSSS......', '...SWWSWWWS.....', 'RRRRRRRRRRRRRRR.', 'RRRRRRRRRRRRRRRR', 'RRRRRRRRRRRRRRRR', '..KK.......KK...', '..KK.......KK...']
const CAR_C = { S: SKYB, W: '#ffffff', R: '#ff6b5a', K: INK }

function wand(x, cx, cy, s, t, t0) { drawBits(x, WAND, WAND_C, cx, cy, s, { rot: 0.2 * Math.sin(t * 6) }); sparkles(x, t, cx + s * 2, cy - s * 2, t0, 6, s * 5, 0.4) }
function portal(x, cx, cy, k, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  for (let i = 6; i > 0; i--) { x.fillStyle = i % 2 ? '#6fc3ff' : '#c97bff'; x.beginPath(); x.ellipse(0, 0, i * 24, i * 32, t * (i % 2 ? 1 : -1), 0, Math.PI * 2); x.fill() }
  x.fillStyle = '#140c30'; x.beginPath(); x.ellipse(0, 0, 20, 28, 0, 0, Math.PI * 2); x.fill()
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Drove the pumpkin carriage. | Got a *ticket.*', mood: lt => lt > 1.3 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -170 }, hops: [0.5],
    back(x, t, lt, P) {
      const p = prog(lt, 0.15, 1.0)
      drawBits(x, PUMPKIN, PUMPKIN_C, lerp(1000, 790, ease.outCubic(p)), 1000, 26 * pop01(t, P.t0 + 0.15, 0.3, 2))
    },
    front(x, t, lt, P) {
      label(x, 790, 720, 'TICKET: 140 MPH', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 36, bg: RED, color: BONE, rot: -0.06, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Turned the pumpkin | into *pie.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), sw = lt > 1.0
      wand(x, 600, 760, 16, t, P.t0 + 1.0)
      if (!sw) drawBits(x, PUMPKIN, PUMPKIN_C, 800, 960, 24 * k)
      else drawBits(x, PIE, PIE_C, 800, 980, 24 * pop01(t, P.t0 + 1.0 * 1.29, 0.3, 2))
      bubble(x, 800, 720, 'better', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 46, tail: 'bl' })
    } },
  { sign: 'gemini', cap: 'Two wands. | *Two opinions.*', mood: lt => Math.floor(lt * 2.6) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 2.6) % 2 ? 1 : -1, 0], star: { x: -150 },
    front(x, t, lt, P) {
      wand(x, 300, 780, 16, t, P.t0 + 0.4); wand(x, 590, 780, 16, t, P.t0 + 0.4)
      bubble(x, 800, 700, 'go to the ball!', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 36, tail: 'bl' })
      bubble(x, 800, 920, 'or… stay in?', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 36, col: MINT, tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'Packed you snacks. | And *a curfew.*', mood: lt => lt > 1.3 ? 'squint' : 'heart', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      label(x, 790, 720, 'SNACKS ✓  SCARF ✓', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 32, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 900, 'HOME BY 9:00', pop01(t, P.t0 + 1.1, 0.35, 2.6), { size: 50, bg: SKYB, rot: -0.04 })
    } },
  { sign: 'leo', cap: 'Made you a gown. | Wore *a bigger one.*', mood: 'sparkle', star: { x: 150, s: 330 }, hops: [1.3],
    back(x, t, lt, P, F) {
      const g = ease.outBack(prog(lt, 1.0, 1.4))
      drawBits(x, GOWN, { P: '#ffb34a' }, F.x, F.cy + 150, 24 * (0.6 + 0.6 * g) * pop01(t, P.t0 + 0.1, 0.3, 2))
    },
    front(x, t, lt, P) {
      drawBits(x, GOWN, { P: PINK }, 320, 980, 18 * pop01(t, P.t0 + 0.3, 0.3, 2))
      label(x, 760, 600, 'MINE', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 38, bg: '#ffb34a', rot: 0.05, font: MONO, weight: 700 })
      label(x, 320, 760, 'YOURS', pop01(t, P.t0 + 0.6, 0.3, 2), { size: 34, bg: PINK, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'The wand came | with *a manual.*', mood: lt => lt > 1.5 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, BOOK, { K: INK, W: '#fff4e2' }, 790, 880, 30 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 680, 'WAND SAFETY', pop01(t, P.t0 + 0.5, 0.3, 2), { size: 34, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1090, 'PAGE 1 OF 27', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 36, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Granted your wish. | *And your rival’s.*', mood: lt => lt > 1.3 ? 'happy' : 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      wand(x, 600, 760, 16, t, P.t0 + 0.4)
      label(x, 800, 720, 'WISH ✓', pop01(t, P.t0 + 0.4, 0.3, 2), { size: 38, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      label(x, 800, 860, 'RIVAL’S WISH ✓', pop01(t, P.t0 + 1.0, 0.3, 2), { size: 32, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 800, 1050, 'only fair!', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'scorpio', cap: 'Knew your wish | *before you did.*', mood: lt => lt > 1.3 ? 'wink' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, BALL, BALL_C, 790, 920, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 650, 'it’s the shoes.', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 40, col: LAV, tail: 'bc' })
    } },
  { sign: 'sagittarius', cap: 'Skipped the ball. | *Road trip!*', mood: 'sparkle', look: [-1, 0], star: { x: 170 }, hops: [0.6, 1.4],
    front(x, t, lt, P) {
      const p = prog(lt, 0.2, 2.2)
      drawBits(x, CAR, CAR_C, lerp(200, 480, p), 1060, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 320, 760, 'BALL → BEACH', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 40, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Wishes need | *two weeks’ notice.*', mood: 'neutral', look: [-1, 0], star: { x: 170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(320, 850); x.rotate(-0.04); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-150, -170, 300, 340); x.fillStyle = '#fff4e2'; x.fillRect(-140, -160, 280, 320)
        x.fillStyle = INK; x.font = `800 34px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('WISH FORM 3B', 0, -120)
        x.fillStyle = '#c9bca6'; for (let i = 0; i < 4; i++) x.fillRect(-110, -60 + i * 50, 220, 14)
        x.restore()
      }
      label(x, 320, 1100, 'SIGNED ×3', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 38, bg: '#2fc79a', rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Wish granted. | In *another universe.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      portal(x, 790, 860, pop01(t, P.t0 + 0.3, 0.4, 2), t)
      label(x, 790, 1100, 'DELIVERED: ELSEWHERE', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 30, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Watched you dance. | *Cried* the whole song.', mood: lt => lt < 0.9 ? 'heart' : 'wide', tears: lt => lt < 0.9 ? 2 : 3, look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      notes(x, t, 790, 1000, { n: 5, cell: 10, col: GOLD, alpha: pop01(t, P.t0 + 0.3, 0.3, 2) })
      bubble(x, 790, 680, 'so | beautiful', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 44, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'r2t0022', key: 'E', accent: LAV, ending: 'callback',
  title: 'The signs as | *fairy godmothers.*',
  cameos: CAMEOS,
  group: { cap: 'You still made it | *to the ball.*' },
  last: {
    text: 'The pie? | *Saved you a slice.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.4, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'taurus', 380, 1060, 260 * k, { mood: lt > 1.4 ? 'heart' : 'sparkle', look: [1, 0], seed: 40, hops: [t - lt + 1.3] })
      const s = pop01(t, t - lt + 0.8, 0.35, 2)
      drawBits(x, SLICE, PIE_C, 720, 1090, 34 * s)
      label(x, 720, 1250, 'LOVE, TAURUS', pop01(t, t - lt + 1.3, 0.3, 2.2), { size: 42, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 720, 1060, t - lt + 1.0, 7, 150, 0.4)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
