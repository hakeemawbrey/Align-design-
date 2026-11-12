// r2t0003: star_talk, SOLO film, "How to spot | an Aquarius." (~45 s vertical, signs3kit social cut, music: lofi · G)
// One sign the whole way through: nine field-guide signs you are looking at an Aquarius, each pushed to the extreme.
//   0.0–3.6    "How to spot | *an Aquarius.*"  One big Aquarius pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              socks that don't match, on purpose · a theory about everything (corkboard + string) · outfit = next year's trend
//              · at the party, talking to the dog · profile says "ask me about bees" · fixed your laptop with a paperclip
//              · group photo, looking the other way · pet rock with a name and a job (Greg, CFO) · friends with their ex's ex
//  37.8        "Weird? | *Wonderfully.*"  Aquarius comes back, big.
//  41.2        callback: "The pet rock? | *Got promoted.*"  Greg returns: GREG, CEO.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const AQUA = '#6fc3ff', RED = '#e23d4e', CREAM = '#fff4e2', WOOD = '#c98f2a', GREEN = '#5fd068'
const S = 'aquarius'

// ── props
const SOCK_A = [
  'RRRR..',
  'RWWR..',
  'RRRR..',
  'RWWR..',
  'RRRR..',
  'RRRRR.',
  'RRRRRR',
  '.RRRRR',
]
const SOCK_B = [
  'GGGG..',
  'GYGY..',
  'YGYG..',
  'GYGY..',
  'YGYG..',
  'GYGYG.',
  'YGYGYG',
  '.GYGYG',
]
const SOCK_C = { R: '#ff6b5a', W: CREAM, G: GREEN, Y: GOLD }
const HAT = [
  '.....P.....',
  '....PPP....',
  '...PYPPP...',
  '..PPPPYPP..',
  '.PPYPPPPPP.',
  'GGGGGGGGGGG',
]
const HAT_C = { P: '#c9a6ff', Y: GOLD, G: MINT }
const DOG = [
  'BB.......BB.',
  'BBBBBBBBBBB.',
  '.BWBBBWBB...',
  '.BBBBBBBB...',
  '.BBBKKBBBTT.',
  '..BBBBBBBBTT',
  '..BBBBBBBBB.',
  '..BB.BB.BB..',
  '..BB.BB.BB..',
]
const DOG_C = { B: '#c98f6a', W: INK, K: '#5b2e1a', T: '#c98f6a' }
const ROCK = [
  '...GGGGG...',
  '.GGGGGGGGG.',
  'GGgGGGGGGgG',
  'GGGGWGGWGGG',
  'GGGGGGGGGGG',
  'GGGGGRRGGGG',
  '.GGGGRRGGG.',
  '..GGGRRGG..',
]
const ROCK_C = { G: '#9aa5c4', g: '#c4ccdf', W: INK, R: '#3a4a9a' }
const CLIP = ['.SSSS.', 'S....S', 'S.SS.S', 'S.S..S', 'S.S..S', 'S.SSSS', 'S.....', '.SSSSS']

// a corkboard: pinned notes connected with red string
function corkboard(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.03); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-180, -150, 360, 300); x.fillStyle = '#b8864e'; x.fillRect(-172, -142, 344, 284)
  const N = [[-120, -90, 'MOON'], [90, -100, 'BEES'], [-90, 70, 'SOCKS'], [110, 80, 'PIGEONS'], [0, -10, '???']]
  const shown = Math.min(N.length, 1 + Math.floor(Math.max(0, lt - 0.3) / 0.2))
  x.strokeStyle = RED; x.lineWidth = 4
  for (let i = 1; i < shown; i++) { x.beginPath(); x.moveTo(N[4][0], N[4][1]); x.lineTo(N[i - 1][0], N[i - 1][1]); x.stroke() }
  N.slice(0, shown).forEach(([px, py, s]) => {
    x.fillStyle = CREAM; x.fillRect(px - 54, py - 24, 108, 48); x.fillStyle = INK; x.font = `700 20px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(s, px, py + 2)
    x.fillStyle = RED; x.fillRect(px - 5, py - 30, 10, 10)
  })
  x.restore()
}
// a profile card with a prompt
function profile(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-142, -192, 300, 400)
  x.fillStyle = INK; x.fillRect(-154, -204, 308, 408); x.fillStyle = '#2a2350'; x.fillRect(-146, -196, 292, 392)
  x.fillStyle = '#140c30'; x.fillRect(-130, -180, 260, 190)
  signChar(x, t, S, 0, -86, 140, { mood: 'wink', seed: 71, glyph: false, glow: 0.8 })
  x.fillStyle = AQUA; x.font = `700 24px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('♒︎ AQUARIUS', 0, 36)
  x.fillStyle = CREAM; x.fillRect(-126, 64, 252, 112)
  x.fillStyle = INK; x.font = `800 28px ${INTER}`; x.fillText('ask me', 0, 98); x.fillText('about bees', 0, 138)
  x.restore()
}
// a laptop, screen cracked with sparks until the paperclip fixes it
function laptop(x, t, cx, cy, k, fixed) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-170, -150, 340, 230); x.fillStyle = '#9aa5c4'; x.fillRect(-162, -142, 324, 214)
  x.fillStyle = fixed ? '#2fc79a' : '#140c30'; x.fillRect(-146, -126, 292, 182)
  if (fixed) { x.fillStyle = INK; x.font = `800 44px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('✓ OK', 0, -36) }
  else { x.strokeStyle = BONE; x.lineWidth = 3; x.beginPath(); x.moveTo(-60, -120); x.lineTo(-20, -40); x.lineTo(-70, 0); x.lineTo(-30, 50); x.stroke() }
  x.fillStyle = INK; x.fillRect(-200, 80, 400, 34); x.fillStyle = '#c4ccdf'; x.fillRect(-192, 84, 384, 24)
  x.restore()
}
// a camera viewfinder with the corner brackets
function viewfinder(x, cx, cy, w, h, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.strokeStyle = BONE; x.lineWidth = 8
  for (const [sx, sy] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) { x.beginPath(); x.moveTo(sx * w / 2, sy * (h / 2 - 50)); x.lineTo(sx * w / 2, sy * h / 2); x.lineTo(sx * (w / 2 - 50), sy * h / 2); x.stroke() }
  x.fillStyle = RED; x.beginPath(); x.arc(-w / 2 + 34, -h / 2 + 34, 10, 0, Math.PI * 2); x.fill()
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Socks don’t match. | *On purpose.*', mood: 'wink', look: [1, 0], star: { x: -190 }, hops: [1.2],
    front(x, t, lt, P) {
      drawBits(x, SOCK_A, SOCK_C, 720, 880, 22 * pop01(t, P.t0 + 0.25, 0.3, 2), { rot: -0.1 })
      drawBits(x, SOCK_B, SOCK_C, 880, 880, 22 * pop01(t, P.t0 + 0.45, 0.3, 2), { rot: 0.1 })
      label(x, 800, 650, 'A CHOICE.', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 40, bg: AQUA, rot: -0.04 })
    } },
  { sign: S, cap: 'Has a theory | about *everything.*', mood: lt => lt > 1.4 ? 'wide' : 'squint', look: [1, 0], star: { x: -200 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      corkboard(x, t, 790, 850, pop01(t, P.t0 + 0.15, 0.35, 2), lt)
      label(x, 790, 1110, 'IT’S ALL CONNECTED', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: RED, color: CREAM, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Their outfit? | *Next year’s trend.*', mood: 'sparkle', star: { x: -170, y: 30 }, hops: [0.8],
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.4, 0.3, 2)
      if (k > 0.01) drawBits(x, HAT, HAT_C, F.x + 6, F.top - 40, 21 * k, { rot: -0.1 })
      bubble(x, 790, 700, 'is that | a lamp?', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 38, col: LAV, tail: 'bl' })
      label(x, 790, 1050, 'EVERYONE, NEXT YEAR', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 28, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'At the party: | *talking to the dog.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', look: [1, 0], star: { x: -200 }, hops: [1.1],
    front(x, t, lt, P) {
      drawBits(x, DOG, DOG_C, 800, 990, 18 * pop01(t, P.t0 + 0.2, 0.3, 2), { sx: -1, rot: 0.03 * Math.sin(t * 9) })
      bubble(x, 760, 680, 'finally, someone | REAL', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 34, tail: 'bl' })
      hearts(x, t, 800, 900, P.t0 + 1.3, { n: 5, life: 1.6, spread: 140, cell: 6, seed: 4 })
    } },
  { sign: S, cap: 'Their profile: | *“ask me about bees.”*', mood: 'sparkle', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      profile(x, t, 790, 850, pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 610, '✦ NEW MATCH?', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Fixed your laptop | with *a paperclip.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -200 }, hops: [1.4],
    front(x, t, lt, P) {
      laptop(x, t, 800, 880, pop01(t, P.t0 + 0.2, 0.3, 2), lt > 1.2)
      const c = pop01(t, P.t0 + 0.6, 0.3, 2)
      drawBits(x, CLIP, { S: '#c4ccdf' }, lerp(620, 760, ease.inOutCubic(prog(lt, 0.7, 1.1))), 990, 9 * c, { rot: 0.5 })
      sparkles(x, t, 800, 820, P.t0 + 1.25, 7, 170, 0.3)
      label(x, 800, 650, 'DON’T ASK.', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 38, bg: AQUA, rot: 0.04 })
    } },
  { sign: S, cap: 'Group photo? | *Looking elsewhere.*', mood: 'happy', look: lt => [lt > 0.6 ? 1 : 0, -1], star: { x: 0, y: 30, s: 220 },
    front(x, t, lt, P, F) {
      viewfinder(x, 540, 900, 740, 520, pop01(t, P.t0 + 0.1, 0.3, 2))
      ;[['leo', 330], ['libra', 750]].forEach(([id, px], i) => {
        const k = pop01(t, P.t0 + 0.2 + i * 0.1, 0.35, 2)
        if (k > 0.01) signChar(x, t, id, px, 940, 170 * k, { mood: 'sparkle', look: [0, 0], seed: 30 + i, glyph: false })
      })
      bubble(x, 760, 660, 'is that | a cloud fish?', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 32, tail: 'bl' })
      label(x, 540, 1170, 'CLICK.', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 40, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Their pet rock | *has a job.*', mood: 'heart', look: [1, 0], star: { x: -200 }, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, ROCK, ROCK_C, 800, 960, 20 * pop01(t, P.t0 + 0.25, 0.35, 2))
      label(x, 800, 720, 'GREG, CFO', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 44, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 420, 640, 'he’s busy', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 36, tail: 'bc' })
    } },
  { sign: S, cap: 'Best friends with | *their ex’s ex.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', star: { x: -200 }, hops: [1.0, 1.8],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.25, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'gemini', 800, 980, 190 * k, { mood: 'sparkle', look: [-1, 0], seed: 32, glyph: false, hops: [P.t0 + 1.0, P.t0 + 1.8] })
      bubble(x, 800, 690, 'brunch | sunday?', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 38, tail: 'bl' })
      label(x, 540, 1170, 'BESTIES. SOMEHOW.', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: PINK, rot: 0.03, font: MONO, weight: 700 })
      hearts(x, t, 600, 900, P.t0 + 1.4, { n: 4, life: 1.5, spread: 140, cell: 6, seed: 7 })
    } },
]

const F = makeFilm({
  id: 'r2t0003', key: 'G', accent: AQUA, solo: S, ending: 'callback',
  title: 'How to spot | *an Aquarius.*',
  cameos: CAMEOS,
  group: { cap: 'Weird? | *Wonderfully.*', mood: 'wink' },
  last: {
    text: 'The pet rock? | *Got promoted.*',
    draw(x, t, lt) {
      const t0 = t - lt
      drawBits(x, ROCK, ROCK_C, 540, 1000, 28 * pop01(t, t0 + 0.5, 0.4, 2))
      label(x, 540, 1230, 'GREG, CEO', pop01(t, t0 + 1.2, 0.3, 2.4), { size: 56, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 540, 1000, t0 + 1.2, 8, 230, 0.2)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
