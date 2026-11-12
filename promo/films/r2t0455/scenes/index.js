// r2t0455: star_talk, BELIKE, "Lost again? | Zodiacs be like." (topic: zodiacs when they get lost) (~57 s vertical, signs3kit social cut, music: lofi · F)
// Twelve signs in zodiac order, each the most extreme version of itself when it's lost. Ending: callback.
//   ♈ refused directions, ran in a circle (lap 3) · ♉ stopped for a sandwich first · ♊ asked six people, six answers
//   · ♋ five minutes away, already homesick · ♌ not lost: making an entrance · ♍ redrew the map, correctly
//   · ♎ left or right? hour two · ♏ "exactly where I meant to be" · ♐ moved there (tent: home now)
//   · ♑ three backup plans · ♒ followed a cat, found a new city · ♓ cried a little; a kind stranger helped
//  group "Twelve signs. | *Zero maps.*"   callback "And Aries? | *Lap forty.*" (Aries still running its circle)
import { clamp, prog } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { note, bits, ORANGE, RED, WOOD, PAPER, SLATE, GREEN } from '../props.js'

const L = { x: -190 }, LIME = '#c6f06a'
const SANDWICH = ['..BBBBBBB..', '.BBBBBBBBB.', 'GGGGGGGGGGG', 'RRRRRRRRRRR', 'YYYYYYYYYYY', '.BBBBBBBBB.']
const POST = ['.AAAAAA>', 'AAAAAAA.', '...PP...', '<BBBBBB.', '.BBBBBBB', '...PP...', '...PP...', '...PP...']
const TENT = ['.....F.', '.....FF', '....T..', '...TTT.', '..TTTTT', '.TTTdTTT'.slice(0, 7), 'TTTdddT']
const CAT = ['K...K...', 'KK.KK...', 'KKKKK...', 'KWKWK..K', 'KKKKK.K.', '.KKKKKK.', '.KKKKKK.', '.K.K.K..']

// a dashed circle with an arrowhead running round it (Aries' lap)
function lap(x, t, cx, cy, r, k, col = '#ff7a5a') {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(t * 2)
  x.strokeStyle = INK; x.lineWidth = 16; x.setLineDash([30, 22]); x.beginPath(); x.arc(0, 0, r, 0, 7); x.stroke()
  x.strokeStyle = col; x.lineWidth = 9; x.beginPath(); x.arc(0, 0, r, 0, 7); x.stroke()
  x.setLineDash([]); x.fillStyle = col; x.beginPath(); x.moveTo(r - 24, -6); x.lineTo(r + 24, -6); x.lineTo(r, 30); x.fill()
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Refused directions. | *Ran in a circle.*', mood: 'wide', look: [1, 0], star: L, hops: [0.4, 0.8, 1.2, 1.6],
    front(x, t, lt, P) {
      lap(x, t, 800, 900, 160, pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 800, 900, `LAP ${1 + Math.floor(clamp((lt - 0.3) / 1.5) * 2.99)}`, pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 40, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Lost? | *Sandwich first.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: L,
    front(x, t, lt, P) {
      drawBits(x, SANDWICH, { B: '#e7b46a', G: GREEN, R: RED, Y: GOLD }, 800, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 800, 1100, 'PRIORITIES', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 38, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Asked six people. | *Got six answers.*', mood: lt => lt > 1.3 ? 'squint' : 'sparkle', look: [1, 0], star: L,
    front(x, t, lt, P) {
      ;['left!', 'right!', 'up?', 'back!', 'north', 'it moved'].forEach((s, i) => bubble(x, 690 + (i % 2) * 220, 680 + Math.floor(i / 2) * 150, s, pop01(t, P.t0 + 0.2 + i * 0.2, 0.25, 2.2), { size: 32, col: i % 2 ? LAV : BONE, tail: i % 2 ? 'br' : 'bl' }))
    } },
  { sign: 'cancer', cap: 'Five minutes from home. | *Already homesick.*', mood: 'wide', look: [1, 0], star: L,
    front(x, t, lt, P) {
      bubble(x, 800, 720, 'I miss | my couch', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 38, col: SKYB, tail: 'bl' })
      label(x, 800, 1080, 'DISTANCE: 400 STEPS', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 28, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Not lost. | *Making an entrance.*', mood: 'sparkle', look: [1, 0], star: L, hops: [1.0],
    front(x, t, lt, P) {
      label(x, 800, 760, 'WRONG PARTY', pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 36, bg: BONE, rot: -0.05, font: MONO, weight: 700 })
      label(x, 800, 1000, 'STILL ICONIC', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 40, bg: ORANGE, rot: 0.04 })
      sparkles(x, t, 400, 820, P.t0 + 1.0, 8, 190, 0.2)
    } },
  { sign: 'virgo', cap: 'Got lost. | *Redrew the map. Correctly.*', mood: 'squint', look: [1, 0], star: L,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) { x.save(); x.translate(800, 900); x.rotate(0.03); x.scale(k, k); x.fillStyle = INK; x.fillRect(-176, -146, 352, 292); x.fillStyle = PAPER; x.fillRect(-170, -140, 340, 280); x.fillStyle = MINT; x.fillRect(-170, -140, 340, 52); x.fillStyle = INK; x.font = `700 24px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('MAP V2 (FIXED)', 0, -112); x.fillStyle = '#d9c9ad'; for (let i = 0; i < 4; i++) { x.fillRect(-150 + i * 90, -80, 14, 200); x.fillRect(-160, -60 + i * 50, 320, 12) } x.restore() }
      if (k > 0.5) { x.save(); x.translate(800, 900); x.rotate(0.03); x.strokeStyle = RED; x.lineWidth = 8; x.setLineDash([16, 12]); x.beginPath(); const p = prog(lt, 0.5, 1.6); x.moveTo(-130, 60); x.lineTo(-130 + 120 * Math.min(1, p * 2), 60 - 60 * Math.min(1, p * 2)); if (p > 0.5) x.lineTo(-10 + 140 * (p - 0.5) * 2, 0 - 40 * (p - 0.5) * 2); x.stroke(); x.restore() }
      label(x, 800, 1110, 'NORTH: ACCURATE', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Left or right? | *Hour two.*', mood: lt => Math.floor(lt * 2) % 2 ? 'squint' : 'neutral', look: lt => [Math.floor(lt * 2) % 2 ? 1 : -1, 0], star: L,
    front(x, t, lt, P) {
      drawBits(x, POST, { A: PINK, B: SKYB, P: WOOD, '>': PINK, '<': SKYB }, 800, 900, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 800, 1130, 'STILL THINKING', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 32, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Lost? | *“This was the plan.”*', mood: 'squint', look: [1, 0], star: L,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 800, 740, 'exactly where | I meant to be.', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 34, tail: 'bl' })
      label(x, 800, 1060, 'IT WAS NOT.', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 36, bg: '#c2375a', color: PAPER, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Got lost. | *Moved there.*', mood: 'sparkle', look: [1, 0], star: L, hops: [1.1],
    front(x, t, lt, P) {
      drawBits(x, TENT, { T: ORANGE, F: RED, d: '#7a3a1e' }, 800, 940, 26 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 800, 700, 'HOME NOW', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 40, bg: LIME, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Lost? Never. | *Three backup plans.*', mood: 'neutral', look: [1, 0], star: L,
    front(x, t, lt, P) {
      note(x, 800, 880, pop01(t, P.t0 + 0.2, 0.3, 2), 'PLAN A | PLAN B | PLAN C', { head: 'IN CASE', headBg: '#5fd0c0', size: 34, w: 300, font: MONO, weight: 700, rot: -0.03 })
      label(x, 800, 1120, 'PLAN D: PENDING', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 30, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Followed a cat. | *Found a new city.*', mood: lt => lt > 1.3 ? 'heart' : 'sparkle', look: [1, 0], star: L, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, CAT, { K: '#3a3460', W: GOLD }, 760 + 80 * prog(lt, 0.2, 1.4), 1000, 16 * pop01(t, P.t0 + 0.2, 0.3, 2), { outline: BONE })
      label(x, 800, 720, 'NEW CITY UNLOCKED', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 30, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Cried a little. | *A kind stranger helped.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', tears: lt => lt > 1.3 ? 1 : 3, look: [1, 0], star: L,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.6, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'taurus', 820, 980, 190 * k, { mood: 'happy', look: [-1, 0], seed: 36, glyph: false })
      bubble(x, 800, 700, 'this way ♡', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 38, tail: 'bc' })
    } },
]

const F = makeFilm({
  id: 'r2t0455', key: 'F', accent: LIME, ending: 'callback',
  title: 'Lost again? | *Zodiacs be like.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve signs. | *Zero maps.*' },
  last: {
    text: 'And Aries? | *Lap forty.*',
    draw(x, t, lt) {
      const t0 = t - lt, k = pop01(t, t0 + 0.3, 0.45, 1.8)
      lap(x, t, 540, 1180, 300, k)
      if (k > 0.01) { const a = t * 2.4; signChar(x, t, 'aries', 540 + Math.cos(a) * 300, 1180 + Math.sin(a) * 300, 200 * k, { mood: 'wide', seed: 47 }) }
      label(x, 540, 1180, 'LAP 40', pop01(t, t0 + 1.0, 0.3, 2.2), { size: 48, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
