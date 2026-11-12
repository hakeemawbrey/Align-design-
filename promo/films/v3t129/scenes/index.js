// v3t129: THE SIGNS AS… v3, SOLO film, "Aries in love | be like." (~47 s vertical, signs3kit social cut, music: lofi · F)
// One sign the whole way through: nine love situations, each the most extreme (and lovable) Aries version.
//   0.0–3.6    "Aries in love | *be like.*"  One big Aries pops in, then the cards start.
//   3.6–37.8   nine cards: matched at 9:00, date at 9:05 · lost a board game, rematch forty · met your ex, raced
//              them · your jar won't open, Aries opened it (and the lid flew) · slow dance, Aries speed-danced
//              · sorry within four seconds of a fight · bought you flowers, the entire shop · movie night,
//              skipped to the ending · fell asleep first, mid-sentence
//  37.8        group ending: "Fast. Loud. | *All in.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#ff6b5a', DARK = '#2a2350', STEEL = '#9aa5c4', BROWN = '#8a4a2e', GREEN = '#5fd068'

const BOARD = [
  'KKKKKKKKKK',
  'KWBWBWBWBK',
  'KBWBWBWBWK',
  'KWBWBWBWBK',
  'KBWBWBWBWK',
  'KKKKKKKKKK',
]
const BOARD_C = { K: BROWN, W: BONE, B: DARK }
const JAR = [
  '.LLLLLL.',
  '.LLLLLL.',
  'GGGGGGGG',
  'GJJJJJJG',
  'GJJJJJJG',
  'GJJJJJJG',
  'GJJJJJJG',
  '.GGGGGG.',
]
const LID = ['.LLLLLL.', '.LLLLLL.']
const FLOWER = [
  '.P.P.',
  'PPYPP',
  '.PPP.',
  '..G..',
  '..G..',
  '..G..',
]
const REMOTE = [
  'KKKK',
  'KRWK',
  'KWWK',
  'KWWK',
  'KWWK',
  'KKKK',
]

const A = 'aries'
const CAMEOS = [
  { sign: A, cap: 'Matched at 9:00. | *Date at 9:05.*', mood: 'sparkle', star: { x: -170 }, hops: [0.4, 0.8, 1.2],
    front(x, t, lt, P) {
      label(x, 790, 700, '✦ NEW MATCH · 9:00', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 32, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 790, 900, 'outside. | now?', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 44, tail: 'bl' })
      label(x, 790, 1100, 'DATE: 9:05', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 38, bg: RED, color: BONE, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: A, cap: 'Lost at board games. | *Rematch forty.*', mood: lt => lt > 1.0 ? 'squint' : 'wide', star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, BOARD, BOARD_C, 790, 980, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const n = Math.min(40, 1 + Math.floor(clamp((lt - 0.3) / 1.6) * 39))
      label(x, 790, 720, `REMATCH ${n}`, pop01(t, P.t0 + 0.4, 0.3, 2), { size: 48, bg: RED, color: BONE, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: A, cap: 'Met your ex. | *Raced them.*', mood: lt => lt > 0.8 ? 'squint' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.3, 2)
      if (k > 0.01) signChar(x, t, 'libra', 820, 940, 200 * k, { mood: lt > 1.2 ? 'wide' : 'happy', look: [-1, 0], seed: 17, glyph: false })
      label(x, 820, 760, 'THE EX', pop01(t, P.t0 + 0.6, 0.3, 2), { size: 34, bg: BONE, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 560, 620, 'to the tree. | GO.', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: A, cap: 'Your jar wouldn’t open. | *Now it’s open.*', mood: lt => lt > 1.0 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -170 }, squash: lt => lt > 0.5 && lt < 1.0 ? 0.12 : 0,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, JAR, { L: STEEL, G: BONE, J: '#e23d4e' }, 790, 960, 22 * k)
      const f = clamp((lt - 1.0) / 0.8)
      if (f > 0) drawBits(x, LID, { L: STEEL }, 790 + f * 140, 860 - Math.sin(Math.PI * f) * 260 - f * 40, 22, { rot: f * 6 })
      label(x, 790, 660, 'LID: SOMEWHERE', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 32, bg: GOLD, rot: 0.05 })
    } },
  { sign: A, cap: 'Slow dance? | Aries *speed-danced.*', mood: 'sparkle', star: { x: -170 }, hops: [0.3, 0.6, 0.9], squash: lt => 0.12 * Math.sin(lt * 26), look: lt => [Math.sin(lt * 13) > 0 ? 1 : -1, 0],
    front(x, t, lt, P) {
      label(x, 790, 760, 'TEMPO: MAX', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 44, bg: RED, color: BONE, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 790, 960, 'keep up!', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 44, tail: 'bl' })
    } },
  { sign: A, cap: 'Had a fight. | Sorry *in four seconds.*', mood: lt => lt < 0.6 ? 'squint' : 'heart', star: { x: -170 }, hops: [0.7],
    front(x, t, lt, P) {
      const s = Math.min(4, Math.floor(lt * 2.2))
      label(x, 790, 720, `0:0${s}`, pop01(t, P.t0 + 0.2, 0.3, 2), { size: 60, bg: INK, color: RED, rot: 0, font: MONO, weight: 700 })
      bubble(x, 790, 940, 'sorry! | hug?', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 46, tail: 'bl' })
    } },
  { sign: A, cap: 'Bought you flowers. | *The entire shop.*', mood: 'heart', star: { x: -180 },
    front(x, t, lt, P) {
      const n = Math.min(12, 1 + Math.floor(Math.max(0, lt - 0.2) / 0.1))
      for (let i = 0; i < n; i++) drawBits(x, FLOWER, { P: [PINK, RED, LAV, GOLD][i % 4], Y: '#fff1b0', G: GREEN }, 640 + (i % 4) * 100, 760 + Math.floor(i / 4) * 130, 12)
      label(x, 790, 1150, 'SHOP: EMPTY', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 36, bg: PINK, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: A, cap: 'Movie night. | *Skipped to the ending.*', mood: lt => lt > 1.0 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, REMOTE, { K: DARK, R: '#e23d4e', W: STEEL }, 640, 1000, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.3 })
      x.save(); const k = pop01(t, P.t0 + 0.4, 0.3, 2); x.translate(820, 820); x.scale(k, k)
      x.fillStyle = INK; x.fillRect(-140, -100, 280, 200); x.fillStyle = '#140c30'; x.fillRect(-128, -88, 256, 176)
      x.fillStyle = BONE; x.font = `700 40px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
      x.fillText(lt > 0.9 ? 'THE END' : '▶▶ 2:04', 0, 0); x.restore()
      bubble(x, 820, 1070, 'who won?', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: A, cap: 'Fell asleep first. | *Mid-sentence.*', mood: lt => lt > 1.0 ? 'sleepy' : 'happy', star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 760, lt > 1.0 ? 'love y—' : 'love you so—', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 44, tail: 'bl' })
      label(x, 790, 980, 'BATTERY: 0', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 38, bg: LAV, rot: 0.05, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'v3t129', key: 'F', accent: RED, solo: A, ending: 'group',
  title: 'Aries in love | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Fast. Loud. | *All in.*', mood: 'heart' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
