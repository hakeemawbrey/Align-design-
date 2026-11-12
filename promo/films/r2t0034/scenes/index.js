// r2t0034: star_talk BELIKE, "Zodiacs tripping | in public be like." (~62 s vertical, signs3kit social cut, music: lofi · D)
// Twelve signs in zodiac order tripping in public, each the most extreme version of itself:
//   ♈ turned it into a sprint · ♉ lay down, stayed · ♊ narrated it live · ♋ said sorry to the ground
//   · ♌ called it choreography · ♍ reported the crack · ♎ tripped into a cute stranger (it's a match)
//   · ♏ never spoke of it again · ♐ laughed for an hour · ♑ kept walking, composure intact · ♒ questioned gravity
//   · ♓ cried, so did a stranger
//  49.2   "Twelve trips. | *Zero shame.*"  group photo
//  52.4   LESSON UNLOCKED: "Everyone trips. | Get up *laughing.*"  DIGNITY: RESTORED
//  58.3   "Mind the step. | Or make it *iconic.*"
import { prog, lerp, ease } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO,
} from '../../signs3kit.js'

const STONE = '#7d86a8'
// ── props
/** the pavement: a kerb line across the panel floor with a crack (the culprit) */
function pavement(x, k, crackX = 640) {
  if (k <= 0.01) return
  x.save(); x.globalAlpha *= Math.min(1, k)
  x.fillStyle = INK; x.fillRect(130, 1050, 820, 26); x.fillStyle = STONE; x.fillRect(136, 1054, 808, 18)
  x.strokeStyle = INK; x.lineWidth = 6; x.beginPath(); x.moveTo(crackX - 30, 1054); x.lineTo(crackX - 8, 1064); x.lineTo(crackX + 6, 1056); x.lineTo(crackX + 30, 1070); x.stroke()
  x.restore()
}
function bang(x, t, cx, cy, t0) { const k = pop01(t, t0, 0.25, 2.6); if (k > 0.01) label(x, cx, cy, '!', k, { size: 64, bg: GOLD, rot: 0.12 }) }
function speedLines(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.globalAlpha *= k; x.fillStyle = BONE
  for (let i = 0; i < 5; i++) { const ph = (t * 3 + i * 0.27) % 1; x.fillRect(cx - 260 - ph * 120, cy - 100 + i * 50, 140, 8) }
  x.restore()
}
const CLIPBOARD = ['.KKKK.', 'BBBBBB', 'BWWWWB', 'BWKKWB', 'BWWWWB', 'BWKKWB', 'BWWWWB', 'BWKKWB', 'BWWWWB', 'BBBBBB']

const ST = { x: -170 }
const CAMEOS = [
  { sign: 'aries', cap: 'Tripped. | *Turned it into a sprint.*', mood: 'sparkle', look: [1, 0], star: { x: -60 }, hops: [0.3, 0.6, 0.9, 1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      pavement(x, pop01(t, P.t0 + 0.05, 0.3, 1.5), 400)
      bang(x, t, 380, 640, P.t0 + 0.3)
      speedLines(x, t, 540, 900, prog(lt, 0.6, 0.9))
      label(x, 790, 640, 'MEANT THAT', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 40, bg: '#ff6b5a', font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Tripped. | *Lay down. Stayed.*', mood: 'sleepy', star: { x: -60, y: 110, s: 280 },
    front(x, t, lt, P) {
      pavement(x, pop01(t, P.t0 + 0.05, 0.3, 1.5), 760)
      bubble(x, 760, 760, 'comfy here.', pop01(t, P.t0 + 0.8, 0.25, 2.4), { size: 44, tail: 'bl' })
      label(x, 760, 620, 'MOVING: NO', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 36, bg: '#9fd8a8', font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Tripped. | *Narrated it live.*', mood: lt => Math.floor(lt * 2.5) % 2 ? 'wink' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      pavement(x, pop01(t, P.t0 + 0.05, 0.3, 1.5), 400)
      bubble(x, 780, 700, 'and they go DOWN—', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 34, tail: 'bl' })
      bubble(x, 790, 880, 'a comeback!', pop01(t, P.t0 + 1.3, 0.25, 2.4), { size: 40, col: GOLD, tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'Tripped. | *Said sorry to the ground.*', mood: 'wide', look: [0, 1], star: ST,
    front(x, t, lt, P) {
      pavement(x, pop01(t, P.t0 + 0.05, 0.3, 1.5), 560)
      bubble(x, 780, 760, 'so sorry!!', pop01(t, P.t0 + 0.6, 0.25, 2.4), { size: 50, col: SKYB, tail: 'bl' })
      hearts(x, t, 560, 1000, P.t0 + 1.2, { n: 4, life: 1.6, spread: 160, cell: 6, seed: 2 })
    } },
  { sign: 'leo', cap: 'Tripped. | *Called it choreography.*', mood: 'sparkle', look: [1, -1], star: ST, hops: [0.5, 1.0],
    front(x, t, lt, P) {
      pavement(x, pop01(t, P.t0 + 0.05, 0.3, 1.5), 300)
      sparkles(x, t, 370, 880, P.t0 + 0.9, 10, 200, 0.2)
      label(x, 790, 760, 'JUDGES: 10', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 44, bg: GOLD, font: MONO, weight: 700, rot: -0.05 })
      label(x, 790, 900, 'JUDGES: 10', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 44, bg: GOLD, font: MONO, weight: 700, rot: 0.04 })
    } },
  { sign: 'virgo', cap: 'Tripped. | *Reported the crack.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      pavement(x, pop01(t, P.t0 + 0.05, 0.3, 1.5), 800)
      drawBits(x, CLIPBOARD, { K: INK, B: '#8a4a2e', W: BONE }, 790, 800, 26 * pop01(t, P.t0 + 0.4, 0.3, 2))
      label(x, 790, 640, 'CRACK: 2 CM', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 38, bg: MINT, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Tripped. | *Into a cute stranger.*', mood: lt => lt > 1.0 ? 'heart' : 'wide', look: [1, 0], star: { x: -150 },
    front(x, t, lt, P) {
      pavement(x, pop01(t, P.t0 + 0.05, 0.3, 1.5), 500)
      const k = pop01(t, P.t0 + 0.3, 0.4, 1.8)
      if (k > 0.01) signChar(x, t, 'aquarius', 720, 900, 230 * k, { mood: lt > 1.2 ? 'heart' : 'wide', look: [-1, 0], seed: 31, hops: [P.t0 + 0.6] })
      label(x, 560, 640, '✦ IT’S A MATCH ✦', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 36, bg: PINK, font: MONO, weight: 700 })
      hearts(x, t, 560, 820, P.t0 + 1.3, { n: 5, life: 1.8, spread: 240, cell: 7, seed: 6 })
    } },
  { sign: 'scorpio', cap: 'Tripped. | *Never spoke of it again.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      pavement(x, pop01(t, P.t0 + 0.05, 0.3, 1.5), 420)
      label(x, 790, 820, 'CLASSIFIED', pop01(t, P.t0 + 0.6, 0.3, 2.4), { size: 50, bg: '#c97bff', color: BONE, font: MONO, weight: 700, rot: -0.06 })
      bubble(x, 790, 640, 'what trip?', pop01(t, P.t0 + 1.4, 0.25, 2.4), { size: 40, col: LAV, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Tripped. | *Laughed for an hour.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: ST, hops: [0.4, 0.8, 1.2, 1.6],
    front(x, t, lt, P) {
      pavement(x, pop01(t, P.t0 + 0.05, 0.3, 1.5), 380)
      for (let i = 0; i < 3; i++) bubble(x, 760 + (i % 2) * 60, 640 + i * 150, 'HA', pop01(t, P.t0 + 0.4 + i * 0.35, 0.25, 2.4), { size: 50 + i * 8, col: i === 2 ? GOLD : BONE, tail: 'bl' })
    } },
  { sign: 'capricorn', cap: 'Tripped. | *Kept walking.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      pavement(x, pop01(t, P.t0 + 0.05, 0.3, 1.5), 300)
      bang(x, t, 300, 640, P.t0 + 0.3)
      label(x, 790, 800, 'COMPOSURE: 100%', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 34, bg: '#9fd8a8', font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Tripped. | *Questioned gravity.*', mood: lt => lt > 1.2 ? 'squint' : 'wide', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      pavement(x, pop01(t, P.t0 + 0.05, 0.3, 1.5), 400)
      bubble(x, 790, 700, 'gravity? | really?', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 42, col: SKYB, tail: 'bl' })
      label(x, 790, 920, 'THEORY: PENDING', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: SKYB, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Tripped. Cried. | *So did a stranger.*', mood: 'wide', tears: lt => lt < 0.8 ? 2 : 3, look: [1, 0], star: { x: -150 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      pavement(x, pop01(t, P.t0 + 0.05, 0.3, 1.5), 420)
      const k = pop01(t, P.t0 + 0.8, 0.4, 1.8)
      if (k > 0.01) signChar(x, t, 'cancer', 730, 900, 220 * k, { mood: 'wide', look: [-1, 0], seed: 32, tears: 3 })
      label(x, 600, 640, 'HUG BREAK', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 40, bg: LAV, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0034', key: 'D', accent: GOLD, ending: 'lesson',
  title: 'Zodiacs tripping | in public *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve trips. | *Zero shame.*' },
  lesson: { text: 'Everyone trips. | Get up *laughing.*', chip: 'DIGNITY: RESTORED' },
  last: { text: 'Mind the step. | Or make it *iconic.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
