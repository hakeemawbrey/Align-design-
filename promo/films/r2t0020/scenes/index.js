// r2t0020: star_talk, BELIKE, "Flight delayed? | Zodiacs be like." (topic: zodiacs when their flight is delayed) (~57 s vertical, signs3kit social cut, music: lofi · F)
// Twelve signs in zodiac order, each one’s most extreme reaction to a delayed flight. Ending: callback (Aries walked there).
//   0.0–3.6    hook; the twelve line up, then dive into the pip row.
//   3.6–49.2   ♈ delayed ten minutes, started walking · ♉ found the food court, moved in · ♊ two-hour delay, left with a match
//              · ♋ built a blanket fort at gate 12 · ♌ gave a speech to the whole gate · ♍ three backup flights booked in a minute
//              · ♎ texted their match “should I be mad?” · ♏ knew before the airline did · ♐ learned Italian by boarding
//              · ♑ turned gate 12 into an office · ♒ started a gate 12 book club · ♓ cried at every plane taking off
//  49.2        "One gate. | *Twelve plans.*"
//  52.6        CALLBACK: "Aries walked. | *Arrived first.*"  Aries and an ARRIVED sticker.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const SKY2 = '#8fb8ff', RED = '#e23d4e', GREEN = '#7ee08a', ORANGE = '#ff9a4a'

// ── props
function board(x, cx, cy, k, line, col = RED) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-190, -60, 380, 120); x.fillStyle = '#1a1a2e'; x.fillRect(-180, -50, 360, 100)
  x.fillStyle = col; x.font = `700 40px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(line, 0, 2)
  x.restore()
}
const BOWL = ['.N.N..N.N.', 'NNNNNNNNNN', 'BBBBBBBBBB', '.BBBBBBBB.', '..BBBBBB..']
const TENT = ['.....B.....', '....BBB....', '...BPBPB...', '..BPBPBPB..', '.BPBPBPBPB.', 'BPBP...PBPB', 'BPBP...PBPB']
const MIC = ['.KKK.', 'KGGGK', 'KGGGK', '.KKK.', '..K..', '..K..', '.KKK.']
const LAPTOP = ['.KKKKKKKKKK.', '.KSSSSSSSSK.', '.KSSSSSSSSK.', '.KSSSSSSSSK.', '.KKKKKKKKKK.', 'GGGGGGGGGGGG']
const BOOK = ['RRRRRRRRRR', 'WWWWWWWWWR', 'RRRRRRRRRR']
const PLANE = ['....W.......', '....WW......', 'WWWWWWWWWWW.', '.WWWWWWWWWWW', '....WW......', '....W.......']
const FLAG = ['KRRRRR', 'KRRRRR', 'KRRRR.', 'K.....', 'K.....', 'K.....']

const CAMEOS = [
  { sign: 'aries', cap: 'Delayed ten minutes. | *Started walking.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -190 }, hops: [1.3, 1.6, 1.9],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      board(x, 790, 760, pop01(t, P.t0 + 0.2, 0.3, 2), 'DELAYED 0:10')
      label(x, 790, 980, 'ON FOOT: 2,000 KM', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Found the food court. | *Moved in.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      drawBits(x, BOWL, { N: '#fff1b0', B: GREEN }, 790, 880, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1080, 'NEW ADDRESS: GATE 12', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 28, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Two-hour delay. | *Left with a match.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.3, 2)
      if (k > 0.01) signChar(x, t, 'libra', 840, 960, 170 * k, { mood: 'happy', look: [-1, 0], seed: 31, glyph: false })
      label(x, 790, 1110, '✦ IT’S A MATCH', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 40, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 640, 840, P.t0 + 1.2, { n: 4, life: 1.4, spread: 140, cell: 6, seed: 4 })
    } },
  { sign: 'cancer', cap: 'Built a blanket fort | *at gate 12.*', mood: 'sleepy', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      drawBits(x, TENT, { B: SKYB, P: BONE }, 790, 900, 30 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 660, 'COZY: MAXIMUM', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 34, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Gave a speech | *to the whole gate.*', mood: 'sparkle', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P, F) {
      drawBits(x, MIC, { K: INK, G: '#9aa5c4' }, F.x + 140, F.cy, 16 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.3 })
      bubble(x, 800, 700, 'friends. | travelers.', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 40, col: GOLD, tail: 'bl' })
      label(x, 790, 1060, 'STANDING OVATION', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Three backup flights. | *Booked in a minute.*', mood: 'squint', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      ;['PLAN B ✓', 'PLAN C ✓', 'PLAN D ✓'].forEach((s, i) => label(x, 790, 720 + i * 120, s, pop01(t, P.t0 + 0.3 + i * 0.35, 0.3, 2.2), { size: 40, bg: [MINT, SKYB, LAV][i], rot: (i - 1) * 0.04, font: MONO, weight: 700 }))
    } },
  { sign: 'libra', cap: 'Texted their match: | *“Should I be mad?”*', mood: lt => lt > 1.2 ? 'happy' : 'squint', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'should I | be mad??', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 42, col: PINK, tail: 'bl' })
      bubble(x, 790, 950, '✦ match: | mildly, yes', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 38, col: LAV, tail: 'br' })
    } },
  { sign: 'scorpio', cap: 'Knew it was delayed | *before the airline.*', mood: 'squint', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      board(x, 790, 760, pop01(t, P.t0 + 0.2, 0.3, 2), lt > 1.2 ? 'DELAYED' : 'ON TIME', lt > 1.2 ? RED : GREEN)
      label(x, 790, 980, 'CALLED IT. 6 AM.', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: '#c97bff', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Learned Italian | *before boarding.*', mood: 'happy', look: [1, 0], star: { x: -190 }, hops: [1.2],
    front(x, t, lt, P) {
      bubble(x, 790, 760, 'CIAO! | GRAZIE!', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 46, col: ORANGE, tail: 'bl' })
      label(x, 790, 1000, 'FLUENT-ISH', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 38, bg: GREEN, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Turned gate 12 | *into an office.*', mood: 'neutral', look: [1, 1], star: { x: -190 },
    front(x, t, lt, P) {
      drawBits(x, LAPTOP, { K: INK, S: '#6fc3ff', G: '#9aa5c4' }, 800, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 680, 'MEETING: 3 PM', pop01(t, P.t0 + 0.8, 0.3, 2.4), { size: 36, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 1100, 'PRODUCTIVITY: UP', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: GREEN, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Started a gate 12 | *book club.*', mood: 'sparkle', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const cols = [RED, SKYB, GREEN, LAV]
      cols.forEach((c, i) => drawBits(x, BOOK, { R: c, W: BONE }, 790 + (i % 2 ? 12 : -12), 1000 - i * 52, 20 * pop01(t, P.t0 + 0.2 + i * 0.12, 0.25, 2.2)))
      label(x, 790, 680, 'MEMBERS: 31', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 38, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Every plane taking off? | *Cried. Every one.*', mood: 'wide', tears: lt => lt > 0.8 ? 3 : 1, look: [1, -1], star: { x: -190 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const ph = (lt * 0.6) % 1
      drawBits(x, PLANE, { W: BONE }, lerp(660, 900, ph), lerp(940, 620, ph), 18 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.4 })
      label(x, 790, 1100, 'BYE, PLANE #7', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 34, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0020', key: 'F', accent: SKY2, ending: 'callback',
  title: 'Flight delayed? | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: { cap: 'One gate. | *Twelve plans.*' },
  last: {
    text: 'Aries walked. | *Arrived first.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.4, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'aries', 440, 1060, 260 * k, { mood: lt > 1.4 ? 'sparkle' : 'happy', look: [1, 0], seed: 40, hops: [t - lt + 1.2, t - lt + 1.5] })
      drawBits(x, FLAG, { K: BONE, R: RED }, 720, 1020, 26 * pop01(t, t - lt + 0.8, 0.3, 2))
      label(x, 720, 1220, 'ARRIVED ✓', pop01(t, t - lt + 1.3, 0.3, 2.4), { size: 56, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
      sparkles(x, t, 600, 1060, t - lt + 1.4, 8, 220, 0.3)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
