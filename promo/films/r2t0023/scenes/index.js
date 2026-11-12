// r2t0023: THE SIGNS AS… v3, SOLO film, "Being a Sagittarius | be like." (~52 s vertical, signs3kit, music: lofi · G)
// One sign the whole way through: nine everyday situations, each the most extreme (and lovable) Sagittarius version.
//   0.0–3.6    "Being a Sagittarius | *be like.*"
//   3.6–37.8   laughed so loud: noise complaint #4 · you asked for honesty (the bangs? no.) · "5 minutes away" = 300 miles
//              · a new hobby every week · RSVP: maybe? · 3 a.m.: "what is time?" · a backpack older than you
//              · tripped, called it a dance move · fixed the room's mood in four seconds
//  37.8        "Chaos, but | make it *joy.*"
//  41.0        LESSON UNLOCKED: "Let them roam. | They *come back.*"  FREE SPIRIT: LOVED
//  46.9        "Usually | *with souvenirs.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, notes, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const PURPLE = '#c97bff', RED = '#e23d4e', BROWN = '#8a4a2e', ORANGE = '#ff9a3a'

// ── props
const PIN = ['..RRRR..', '.RRRRRR.', 'RRRWWRRR', 'RRRWWRRR', '.RRRRRR.', '..RRRR..', '...RR...', '...RR...']
const PACK = ['...BBBB...', '..B....B..', '.BBBBBBBB.', 'BBBBBBBBBB', 'BBBPPPPBBB', 'BBBPPPPBBB', 'BBBBBBBBBB', 'BBBBBBBBBB', 'BPBBBBBBPB', 'BBBBBBBBBB']
const PACK_C = { B: '#7a5a3a', P: '#b98b5a' }
const SUN = ['...Y...', '.Y.Y.Y.', '..YYY..', 'YYYYYYY', '..YYY..', '.Y.Y.Y.', '...Y...']

const S = 'sagittarius'
const CAMEOS = [
  { sign: S, cap: 'Laughed so loud. | *Noise complaint.*', mood: lt => lt > 1.3 ? 'wide' : 'squint', look: [1, 0], star: { x: -170 }, hops: [0.4, 0.8, 1.2],
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'HA HA HA', pop01(t, P.t0 + 0.2, 0.25, 2.4), { size: 60, tail: 'bl' })
      label(x, 790, 960, 'NOISE COMPLAINT #4', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 32, bg: RED, color: BONE, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'You asked for honesty. | *Big mistake.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 800, 680, 'thoughts on | my bangs?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, col: MINT, tail: 'br' })
      bubble(x, 760, 960, 'no.', pop01(t, P.t0 + 1.2, 0.25, 2.6), { size: 80, tail: 'bl' })
    } },
  { sign: S, cap: '“Five minutes away.” | *Different state.*', mood: 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      label(x, 790, 680, 'ETA: 5 MIN', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 44, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      drawBits(x, PIN, { R: RED, W: '#ffffff' }, 790, 870, 18 * pop01(t, P.t0 + 0.9, 0.3, 2))
      label(x, 790, 1060, 'DISTANCE: 300 MI', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 36, bg: PURPLE, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'A new hobby | *every single week.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      ;[['POTTERY', GOLD], ['SALSA', PINK], ['BEEKEEPING', MINT], ['ACCORDION', SKYB]].forEach(([s, bg], i) =>
        label(x, 780 + (i % 2 ? 30 : -20), 660 + i * 125, s, pop01(t, P.t0 + 0.25 + i * 0.4, 0.3, 2.4), { size: 38, bg, rot: (i % 2 ? 0.06 : -0.05), font: MONO, weight: 700 }))
    } },
  { sign: S, cap: 'Committed to the plans. | *Loosely.*', mood: lt => lt > 1.2 ? 'wink' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      label(x, 790, 760, 'RSVP:', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 44, bg: BONE, rot: -0.03 })
      const w = lt < 0.9 ? 'YES!' : lt < 1.5 ? 'PROBABLY' : 'MAYBE?'
      label(x, 790, 920, w, pop01(t, P.t0 + 0.5, 0.3, 2), { size: 58, bg: lt < 1.5 ? GOLD : LAV, rot: 0.05 })
    } },
  { sign: S, cap: '3 a.m.: | “*What is time?*”', mood: 'wide', look: [0, -1], star: { x: -170 },
    front(x, t, lt, P) {
      label(x, 790, 650, '3:00 AM', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 44, bg: '#6b62a8', color: BONE, font: MONO, weight: 700 })
      bubble(x, 790, 860, 'are clocks | even real?', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 44, col: LAV, tail: 'bl' })
      sparkles(x, t, 790, 860, P.t0 + 1.4, 6, 220, 0.2, [LAV, SKYB, BONE])
    } },
  { sign: S, cap: 'Their backpack | is *older than you.*', mood: 'heart', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, PACK, PACK_C, 790, 880, 28 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.05 })
      label(x, 790, 1110, 'EST. 2009', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 42, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Tripped in public. | Called it *a dance.*', mood: lt => lt < 0.7 ? 'wide' : 'sparkle', look: [1, 0], star: { x: -170 }, hops: [0.8, 1.2, 1.6, 2.0],
    squash: lt => lt < 0.6 ? 0.18 * Math.sin(lt * 10) : 0,
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'meant that.', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 48, tail: 'bl' })
      notes(x, t, 790, 1060, { n: 4, cell: 9, col: GOLD, alpha: pop01(t, P.t0 + 1.0, 0.3, 2) })
      label(x, 790, 920, 'NEW MOVE', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 40, bg: PINK, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Fixed the room’s mood | in *four seconds.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [1.2],
    front(x, t, lt, P) {
      drawBits(x, SUN, { Y: GOLD }, 790, 820, 40 * pop01(t, P.t0 + 0.3, 0.35, 2), { rot: t * 0.6 })
      label(x, 790, 1080, 'MOOD: FIXED ✓', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 40, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 820, P.t0 + 1.0, 8, 200, 0.2)
    } },
]

const F = makeFilm({
  id: 'r2t0023', key: 'G', accent: PURPLE, solo: 'sagittarius', ending: 'lesson',
  title: 'Being a Sagittarius | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Chaos, but | make it *joy.*', mood: 'sparkle' },
  lesson: { text: 'Let them roam. | They *come back.*', chip: 'FREE SPIRIT: LOVED' },
  last: { text: 'Usually | *with souvenirs.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
