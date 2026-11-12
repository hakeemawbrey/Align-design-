// r2t0488: star_talk, SOLO (pisces), "How to spot | *a Pisces.*" (signs3kit social cut, music: lofi · G).
// Ending: callback (Gerald the plant comes back, blooming). Pisces cries in every card.
//   tissues in every pocket · apologised to a chair · stared at the moon for three hours · named the plant Gerald, cries
//   when it droops · a playlist for every mood (nine hundred) · asks your sign, already loves you · always near water,
//   somehow · laughs and cries in the same sentence · gave their lunch to a pigeon.
//   group "Found one? | Hug them gently."   last "And Gerald? | Thriving."
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const S = 'pisces', ACC = '#6fc3ff', CREAM = '#fff4e2', RED = '#e23d4e', SLATE = '#9aa5c4'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700 })

// ── props
const TISSUE = [
  '...WW...',
  '..WWWW..',
  'BBBBBBBB',
  'BPBBBBPB',
  'BBBBBBBB',
  'BPBBBBPB',
]
const TISSUE_C = { W: '#ffffff', B: SKYB, P: PINK }
const CHAIR = [
  'WW......',
  'WW......',
  'WW......',
  'WW......',
  'WWWWWWWW',
  'WWWWWWWW',
  'W......W',
  'W......W',
  'W......W',
]
const CHAIR_C = { W: '#b0703e' }
const MOON = [
  '...MMMM...',
  '.MMMMMMMM.',
  'MMMDMMMMMM',
  'MMMMMMMDMM',
  'MMMMMMMMMM',
  'MDMMMMMMMM',
  'MMMMMDMMMM',
  '.MMMMMMMM.',
  '...MMMM...',
]
const MOON_C = { M: '#f2e8c4', D: '#d8cc9e' }
// Gerald: a potted plant, droop 0 (perky) … 1 (wilted), bloom adds a flower
function gerald(x, t, cx, cy, cell, droop = 0, bloom = 0) {
  if (cell <= 0.01) return
  x.save(); x.translate(cx, cy)
  const POT = ['PPPPPPPP', '.PPPPPP.', '.PPPPPP.', '..PPPP..']
  drawBits(x, POT, { P: '#e0855a' }, 0, cell * 3, cell)
  x.save(); x.translate(0, cell * 1); x.rotate(droop * 0.9)
  const STEM = ['..G..', '.GG..', '..G..', '..GG.', '..G..', 'GGG..', '..G..']
  drawBits(x, STEM, { G: '#5fd068' }, 0, -cell * 3.5, cell)
  drawBits(x, ['GG...', 'GGG..', '.GG..'], { G: '#2fc79a' }, -cell * 2.5, -cell * 4, cell)
  drawBits(x, ['...GG', '..GGG', '..GG.'], { G: '#2fc79a' }, cell * 2.5, -cell * 2.5, cell)
  if (bloom > 0.01) drawBits(x, ['.PPP.', 'PPYPP', '.PPP.'], { P: PINK, Y: GOLD }, 0, -cell * 8, cell * bloom)
  x.restore(); x.restore()
}
const FISH = [
  '...BBBB..B',
  '.BBBBBBBBB',
  'BBWBBBBBB.',
  'BBBBBBBBBB',
  '.BBBBBBB.B',
]
const FISH_C = { B: ACC, W: '#fff' }
const SANDWICH = ['.BBBBBB.', 'BBBBBBBB', 'GGGGGGGG', 'MMMMMMMM', 'BBBBBBBB']
const SANDWICH_C = { B: '#e8b07a', G: '#5fd068', M: PINK }
const PIGEON = [
  '..GGG.....',
  '.GKGGG....',
  'OOGGGGG...',
  '..GGGGGGGG',
  '..GGLLLGGG',
  '...GGGGGG.',
  '....O..O..',
]
const PIGEON_C = { G: '#9aa5c4', K: INK, O: '#ff9a4a', L: '#c97bff' }

const ST = { x: -170 }
const CAMEOS = [
  // 1 · tissues everywhere
  { sign: S, cap: 'Tissues in | *every single pocket.*', mood: 'wide', tears: 2, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const n = Math.min(6, 1 + Math.floor(Math.max(0, lt - 0.2) / 0.25))
      for (let i = 0; i < n; i++) drawBits(x, TISSUE, TISSUE_C, 700 + (i % 3) * 110, 1040 - Math.floor(i / 3) * 110, 13 * pop01(t, P.t0 + 0.25 + i * 0.32, 0.2, 2), { rot: (i % 3 - 1) * 0.08 })
      L(x, 790, 650, 'TISSUES: 14', pop01(t, P.t0 + 1.5, 0.3, 2.4), SKYB, -0.04, 38)
    } },
  // 2 · apologised to a chair
  { sign: S, cap: 'Bumped a chair. | *Apologised to it.*', mood: lt => lt > 0.8 ? 'wide' : 'happy', tears: 1, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, CHAIR, CHAIR_C, 790, 950, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: lt > 0.6 ? 0.08 * Math.sin(t * 20) * (1 - clamp(lt - 0.8)) : 0 })
      bubble(x, 760, 650, 'oh! so sorry!', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 42, col: SKYB, tail: 'bl' })
      L(x, 790, 1170, 'CHAIR: FORGIVES YOU', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, -0.04, 28)
    } },
  // 3 · moon staring
  { sign: S, cap: 'Looked at the moon. | *Three hours ago.*', mood: 'heart', look: [1, -1], tears: 2, star: { x: -190, y: 60 },
    front(x, t, lt, P) {
      drawBits(x, MOON, MOON_C, 800, 700, 22 * pop01(t, P.t0 + 0.2, 0.4, 2))
      const n = Math.round(lerp(1, 180, ease.inCubic(prog(lt, 0.4, 2.0))))
      L(x, 790, 1020, `STARING: ${n} MIN`, pop01(t, P.t0 + 0.6, 0.3, 2.4), LAV, 0.04, 32)
    } },
  // 4 · Gerald the plant
  { sign: S, cap: 'Named the plant Gerald. | *Cries if it droops.*', mood: lt => lt > 1.0 ? 'wide' : 'heart', tears: lt => lt > 1.0 ? 3 : 1, look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      gerald(x, t, 800, 920, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), ease.inOutCubic(prog(lt, 0.8, 1.2)) * 0.7)
      L(x, 800, 1130, 'GERALD', pop01(t, P.t0 + 0.5, 0.3, 2.4), MINT, -0.05, 38)
    } },
  // 5 · a playlist for every mood
  { sign: S, cap: 'A playlist for every mood. | *All nine hundred.*', mood: 'sleepy', tears: 1, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      notes(x, t, 790, 980, { n: 5, cell: 9, col: GOLD, alpha: clamp(lt * 2) })
      const n = Math.round(lerp(12, 900, ease.inCubic(prog(lt, 0.3, 1.6))))
      L(x, 790, 700, `PLAYLISTS: ${n}`, pop01(t, P.t0 + 0.2, 0.3, 2.4), PINK, -0.04, 36)
      L(x, 790, 1120, 'NOW: SAD BUT CUTE', pop01(t, P.t0 + 1.4, 0.3, 2.4), LAV, 0.04, 30)
    } },
  // 6 · Align: asks your sign
  { sign: S, cap: 'Asks your sign. | *Already loves you.*', mood: lt => lt > 1.0 ? 'heart' : 'sparkle', tears: 2, look: [1, 0], star: ST, hops: [1.1],
    front(x, t, lt, P) {
      bubble(x, 770, 680, 'what’s your sign?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, col: SKYB, tail: 'bl' })
      hearts(x, t, 420, 760, P.t0 + 1.0, { n: 7, life: 1.8, spread: 240, cell: 8, seed: 4 })
      L(x, 790, 1100, 'BEST FRIENDS NOW', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, -0.04, 32)
    } },
  // 7 · always near water
  { sign: S, cap: 'Always near water. | *Somehow.*', mood: 'sparkle', tears: 1, look: [1, 0], star: ST,
    back(x, t, lt, P) {
      const a = clamp(lt * 2)
      x.save(); x.globalAlpha = a; x.fillStyle = 'rgba(111,195,255,0.35)'
      for (let i = 0; i < 18; i++) x.fillRect(120 + i * 48, 1080 + Math.sin(t * 3 + i * 0.7) * 14, 48, 150)
      x.restore()
    },
    front(x, t, lt, P) {
      const j = prog(lt, 0.5, 1.5)
      if (j > 0 && j < 1) drawBits(x, FISH, FISH_C, lerp(660, 900, j), 1080 - Math.sin(Math.PI * j) * 320, 14, { rot: lerp(-0.6, 0.6, j) })
      L(x, 790, 650, 'LOCATION: BY A LAKE', pop01(t, P.t0 + 0.3, 0.3, 2.4), ACC, -0.04, 30)
    } },
  // 8 · laughs and cries at once
  { sign: S, cap: 'Laughs and cries | *in the same sentence.*', mood: lt => Math.floor(lt * 2.5) % 2 ? 'squint' : 'wide', tears: 3, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 780, 700, 'haha i’m fine', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, tail: 'bl' })
      L(x, 790, 1000, 'MOOD: BOTH', pop01(t, P.t0 + 1.0, 0.3, 2.4), PINK, 0.04, 40)
    } },
  // 9 · lunch to a pigeon
  { sign: S, cap: 'Gave their lunch | *to a pigeon.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', tears: 2, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const m = ease.inOutCubic(prog(lt, 0.6, 1.1))
      drawBits(x, SANDWICH, SANDWICH_C, lerp(560, 720, m), lerp(900, 1040, m), 14 * pop01(t, P.t0 + 0.2, 0.3, 2))
      drawBits(x, PIGEON, PIGEON_C, 850, 1020, 24 * pop01(t, P.t0 + 0.3, 0.3, 2))
      L(x, 790, 680, 'PIGEON: VERY FED', pop01(t, P.t0 + 1.3, 0.3, 2.4), GOLD, -0.04, 32)
    } },
]

const F = makeFilm({
  id: 'r2t0488', key: 'G', accent: ACC, solo: S,
  title: 'How to spot | *a Pisces.*',
  cameos: CAMEOS,
  ending: 'callback',
  group: { cap: 'Found one? | *Hug them gently.*', mood: 'heart' },
  last: {
    text: 'And Gerald? | *Thriving.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.6, 0.4, 2)
      gerald(x, t, 540, 1050, 30 * k, 0, pop01(t, t - lt + 1.3, 0.4, 2.4))
      sparkles(x, t, 540, 860, t - lt + 1.4, 8, 220, 0.3)
      label(x, 540, 1300, 'GERALD: BLOOMING', pop01(t, t - lt + 1.6, 0.3, 2.4), { size: 36, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
