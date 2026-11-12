// r2t0334: star_talk, ROLL CALL (twelve signs), "The signs at | a comedy show." (~54 s vertical, signs3kit, lofi · D)
// The twelve signs in zodiac order, each the most extreme version of itself in the audience. Ending: group.
//   0.0–3.6    "The signs at | *a comedy show.*"
//   3.6–49.2   Aries heckles with encouragement · Taurus came for the nachos · Gemini laughs at a joke from ten minutes
//              ago · Cancer feels bad for the joke that flopped · Leo got picked, did an encore · Virgo took notes on the
//              timing · Libra came with their match, laughed in sync · Scorpio: "any Scorpios here?" silence · Sagittarius
//              laughed so loud the comedian stopped · Capricorn worked out laughs per ticket · Aquarius only laughed at the
//              weird bit · Pisces laughed till they cried, kept crying
//  49.2        group ending: "The real show? | *The audience.*" with a STANDING OVATION sign.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const PAPER = '#fff4e2'

// ── props
const MIC = [
  '.GGGG.',
  'GgGGgG',
  'GGgGGG',
  'GgGGgG',
  '.GGGG.',
  '..KK..',
  '..KK..',
  '..KK..',
  '..KK..',
  '..KK..',
  '.KKKK.',
  'KKKKKK',
]
const MIC_C = { G: '#c9c9d8', g: '#8a8aa0', K: '#2a2350' }
const NACHOS = [
  '...Y.....Y...',
  '..YYY...YYY..',
  '.YYOYY.YYOYY.',
  'YYYYYYYYYYYYY',
  'OYYCYYYYCYYYO',
  'BBBBBBBBBBBBB',
  '.BBBBBBBBBBB.',
  '..BBBBBBBBB..',
]
const NACHOS_C = { Y: '#ffd23a', O: '#ff9a3a', C: '#ffef8a', B: '#e23d4e' }
const CLIP = [
  '...KKKK...',
  'BBBKKKKBBB',
  'BWWWWWWWWB',
  'BWKKKKKKWB',
  'BWWWWWWWWB',
  'BWKKKKWWWB',
  'BWWWWWWWWB',
  'BWKKKKKKWB',
  'BWWWWWWWWB',
  'BWKKKWWWWB',
  'BWWWWWWWWB',
  'BBBBBBBBBB',
]
const CLIP_C = { K: '#6b62a8', B: '#8a4a2e', W: PAPER }
const TICKET = [
  'TTTTTTTTTTTTT',
  'T.TTTTTTTTT.T',
  'TTTTTTTTTTTTT',
  'TTTTTTTTTTTTT',
  'T.TTTTTTTTT.T',
  'TTTTTTTTTTTTT',
]
const PIGEON = [
  '..GGG......',
  '.GGKGG.....',
  'OGGGGG.....',
  '..GGGGGGG..',
  '..GGWGGGGGG',
  '...GGGGGGG.',
  '....GGGGG..',
  '.....O.O...',
]
const PIGEON_C = { G: '#9aa5c4', K: INK, O: '#ffb34a', W: '#c3cbe0' }

// a stage spotlight cone from above onto (cx, cy)
function spotlight(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.globalAlpha = 0.32 * k
  const g = x.createLinearGradient(cx, cy - 420, cx, cy + 120)
  g.addColorStop(0, '#fff6d0'); g.addColorStop(1, 'rgba(255,246,208,0)')
  x.fillStyle = g; x.beginPath(); x.moveTo(cx - 40, cy - 420); x.lineTo(cx + 40, cy - 420); x.lineTo(cx + 200, cy + 140); x.lineTo(cx - 200, cy + 140); x.fill()
  x.restore()
}

const S = { star: { x: -170 }, look: [1, 0] }
const CAMEOS = [
  { sign: 'aries', cap: 'Heckled the comedian. | *With encouragement.*', mood: 'sparkle', ...S, hops: [0.6, 1.2, 1.8],
    front(x, t, lt, P) {
      drawBits(x, MIC, MIC_C, 820, 960, 16 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 760, 690, 'YOU GOT THIS!!', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 40, tail: 'bl' })
      bubble(x, 760, 820, 'SO PROUD!', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 36, col: PINK, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Came for the jokes. | Stayed for *the nachos.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', ...S,
    front(x, t, lt, P) {
      drawBits(x, NACHOS, NACHOS_C, 790, 930, 20 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 720, 'JOKES: SURE', pop01(t, P.t0 + 0.7, 0.3, 2.2), { size: 32, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1120, 'NACHOS: 10/10', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 36, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Laughed at a joke | *from ten minutes ago.*', mood: lt => lt > 1.3 ? 'sparkle' : 'neutral', ...S, hops: [1.35, 1.6],
    front(x, t, lt, P) {
      label(x, 790, 700, 'NOW: A NEW BIT', pop01(t, P.t0 + 0.2, 0.3, 2.2), { size: 32, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
      if (lt > 1.3) label(x, 790, 900, 'HAHAHA', pop01(t, P.t0 + 1.35, 0.3, 2.4), { size: 64, bg: GOLD, rot: -0.06 })
      bubble(x, 790, 1100, 'the DUCK one!', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'A joke flopped. | Cancer *laughed for it.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', ...S, hops: [1.25],
    front(x, t, lt, P) {
      drawBits(x, MIC, MIC_C, 820, 960, 16 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 800, 1140, '…crickets…', pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 32, bg: '#3a3270', color: BONE, rot: 0.03, font: MONO, weight: 700 })
      bubble(x, 560, 650, 'HA! good one!', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 38, tail: 'bl' })
      hearts(x, t, 560, 1000, P.t0 + 1.3, { n: 4, life: 1.6, spread: 120, cell: 7, seed: 2 })
    } },
  { sign: 'leo', cap: 'Got picked from the crowd. | *Did an encore.*', mood: 'sparkle', star: { x: -60 }, hops: [0.8, 1.6],
    back(x, t, lt, P) { spotlight(x, 480, 900, pop01(t, P.t0 + 0.1, 0.4, 1.6)) },
    front(x, t, lt, P) {
      label(x, 800, 690, 'ENCORE!', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 44, bg: GOLD, rot: 0.05 })
      bubble(x, 820, 1100, 'thank you, thank you', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 30, tail: 'bl' })
      sparkles(x, t, 480, 880, P.t0 + 1.2, 8, 220, 0.4)
    } },
  { sign: 'virgo', cap: 'Took notes | *on the timing.*', mood: 'squint', ...S,
    front(x, t, lt, P) {
      drawBits(x, CLIP, CLIP_C, 790, 900, 22 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: 0.05 })
      label(x, 790, 1120, 'PACING: B+', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 38, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Came with their match. | *Laughed in sync.*', mood: lt => Math.floor(lt * 3) % 2 ? 'happy' : 'sparkle', ...S, hops: [0.9, 1.3, 1.7],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'gemini', 790, 960, 220 * k, { mood: Math.floor(lt * 3) % 2 ? 'happy' : 'sparkle', look: [-1, 0], seed: 14, glyph: false, hops: [P.t0 + 0.9 * 1.29, P.t0 + 1.3 * 1.29, P.t0 + 1.7 * 1.29] })
      label(x, 800, 690, 'IT’S A MATCH', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 34, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
      hearts(x, t, 590, 1060, P.t0 + 1.2, { n: 5, life: 1.6, spread: 140, cell: 7, seed: 6 })
    } },
  { sign: 'scorpio', cap: '“Any Scorpios here?” | *Said nothing.*', mood: lt => lt > 1.2 ? 'squint' : 'neutral', ...S,
    front(x, t, lt, P) {
      drawBits(x, MIC, MIC_C, 820, 960, 16 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 800, 690, 'any Scorpios?', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 38, col: LAV, tail: 'br' })
      label(x, 560, 1140, 'HAND: NOT RAISED', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: '#ff4f86', color: '#fff', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Laughed so loud | the *comedian stopped.*', mood: 'sparkle', ...S, hops: [0.6, 1.0, 1.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.3, 2.4) * (1 + 0.06 * Math.sin(lt * 20))
      label(x, 790, 820, 'HA!!!', k, { size: 90, bg: GOLD, rot: -0.07 })
      drawBits(x, MIC, MIC_C, 860, 1060, 11 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 760, 650, 'um… sir?', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 36, col: LAV, tail: 'br' })
    } },
  { sign: 'capricorn', cap: 'Counted the laughs. | *Ticket: worth it.*', mood: lt => lt > 1.5 ? 'happy' : 'neutral', ...S,
    front(x, t, lt, P) {
      drawBits(x, TICKET, { T: GOLD }, 790, 900, 22 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: -0.08 })
      const n = Math.round(clamp((lt - 0.3) / 1.3) * 37)
      label(x, 790, 720, `LAUGHS: ${n}`, pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 36, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 1080, 'VALUE: APPROVED', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 34, bg: MINT, rot: -0.04 })
    } },
  { sign: 'aquarius', cap: 'Only laughed | *at the weird bit.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', ...S, hops: [1.25],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, PIGEON, PIGEON_C, 800, 930, 20 * pop01(t, P.t0 + 0.9, 0.35, 2.2), { rot: Math.sin(lt * 6) * 0.06 })
      label(x, 800, 700, 'THE PIGEON BIT', pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 34, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 800, 1120, 'GENIUS.', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 42, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'Laughed till they cried. | *Kept crying.*', mood: lt => lt > 1.1 ? 'wide' : 'happy', tears: lt => lt > 1.1 ? 3 : 2, ...S,
    front(x, t, lt, P) {
      label(x, 790, 720, 'HAHAHA', pop01(t, P.t0 + 0.2, 0.3, 2.2) * (1 - clamp((lt - 1.0) / 0.2)), { size: 50, bg: GOLD, rot: -0.05 })
      bubble(x, 790, 900, 'it was SO | beautiful', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 38, tail: 'bl' })
      label(x, 790, 1110, 'TISSUES: ALL', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 32, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0334', key: 'D', accent: GOLD, ending: 'group',
  title: 'The signs at | *a comedy show.*',
  cameos: CAMEOS,
  group: {
    cap: 'The real show? | *The audience.*',
    draw(x, t, lt) { label(x, 540, 760, 'STANDING OVATION', pop01(t, t - lt + 1.4, 0.35, 2.4), { size: 44, bg: GOLD, rot: -0.03, font: MONO, weight: 700 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
