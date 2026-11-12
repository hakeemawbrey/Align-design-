// r2t0274: star_talk, BE LIKE, "Zodiacs parallel | parking *be like.*" (~59 s vertical, signs3kit social cut, music: lofi · D)
// The batch topic "Zodiacs trying to parallel park | be like." tightened to two lines. Twelve signs, each one's most
// extreme parking attempt. Ending: lesson.
//   ♈ one move, on the curb · ♉ waiting for the spot by the door · ♊ started chatting, forgot to park · ♋ apologized to
//   the curb · ♌ parked badly, took a bow · ♍ attempt seven, still two centimetres off · ♎ couldn't pick between two spots
//   · ♏ perfect, no witnesses · ♐ gave up, parked a mile away · ♑ read the manual first · ♒ parked sideways, calls it
//   innovation · ♓ someone honked, sobbing
//   group "Twelve signs. | *Zero straight cars.*"  LESSON "Take your time. | *Everyone* gets there."  last "Crooked counts. | *You made it.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { note, bits, ORANGE, RED, WOOD, PAPER, SLATE } from '../props.js'

const ST = { x: -170 }
const CARBM = ['....CCCCCC.....', '...CWWCWWWC....', '..CCWWCWWWCC...', 'CCCCCCCCCCCCCCC', 'CCCCCCCCCCCCCYC', 'CCCCCCCCCCCCCCC', '..KK.....KK....', '..KK.....KK....']
const car = (x, cx, cy, cell, col, o = {}) => drawBits(x, CARBM, { C: col, W: '#cfe8ff', Y: GOLD, K: INK }, cx, cy, cell * 1.4, o)
const CURB = (x, k, y = 1010) => { if (k <= 0.01) return; x.save(); x.globalAlpha = k; x.fillStyle = INK; x.fillRect(600, y - 6, 380, 34); x.fillStyle = '#9aa5c4'; x.fillRect(606, y, 368, 22); x.restore() }
function sign(x, cx, cy, k, txt = 'P') {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k * 1.4, k * 1.4)
  x.fillStyle = '#9aa5c4'; x.fillRect(-5, 30, 10, 90)
  x.fillStyle = INK; x.fillRect(-42, -42, 84, 84); x.fillStyle = '#4a7dff'; x.fillRect(-36, -36, 72, 72)
  x.fillStyle = BONE; x.font = `800 52px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(txt, 0, 3)
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Parked in one move. | *On the curb.*', mood: lt => lt > 1.0 ? 'wide' : 'sparkle', star: ST, hops: [0.5, 1.0],
    front(x, t, lt, P) {
      CURB(x, pop01(t, P.t0 + 0.2, 0.3, 2))
      const d = ease.outCubic(prog(lt, 0.3, 0.8))
      car(x, lerp(1100, 790, d), 960 - 40 * d, 15, RED, { rot: -0.18 * d })
      label(x, 790, 680, 'NAILED IT?', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 44, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Waiting for the spot | *right by the door.*', mood: lt => lt > 1.2 ? 'sleepy' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sign(x, 800, 760, pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 800, 1020, lt > 1.2 ? 'STILL WAITING' : 'WAITING', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 40, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Started chatting. | *Forgot to park.*', mood: lt => Math.floor(lt * 2.8) % 2 ? 'wink' : 'sparkle', star: ST,
    front(x, t, lt, P) {
      car(x, 800, 960, 14 * pop01(t, P.t0 + 0.2, 0.3, 2), SKYB, { rot: 0.1 })
      bubble(x, 790, 700, 'wait, you’re | a Leo too?!', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 40, tail: 'bl', col: LAV })
    } },
  { sign: 'cancer', cap: 'Bumped the curb. | *Apologized to it.*', mood: lt => lt > 1.0 ? 'squint' : 'wide', look: [1, 1], star: ST,
    front(x, t, lt, P) {
      CURB(x, pop01(t, P.t0 + 0.2, 0.3, 2))
      car(x, 800, 950, 14 * pop01(t, P.t0 + 0.2, 0.3, 2), ORANGE)
      bubble(x, 790, 720, 'sorry, buddy.', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 42, tail: 'bl' })
      hearts(x, t, 880, 1000, P.t0 + 1.3, { n: 3, life: 1.2, spread: 80, cell: 5, seed: 2 })
    } },
  { sign: 'leo', cap: 'Parked badly. | *Took a bow.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      car(x, 800, 920, 15 * pop01(t, P.t0 + 0.2, 0.3, 2), GOLD, { rot: 0.32 })
      label(x, 790, 680, 'APPLAUSE', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 46, bg: PINK, rot: -0.05 })
      sparkles(x, t, 790, 860, P.t0 + 1.0, 7, 200, 0.3)
    } },
  { sign: 'virgo', cap: 'Attempt seven. | *Still two centimetres off.*', mood: lt => lt > 1.1 ? 'squint' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      CURB(x, pop01(t, P.t0 + 0.2, 0.3, 2))
      car(x, 800 + Math.sin(lt * 6) * 14, 950, 14 * pop01(t, P.t0 + 0.2, 0.3, 2), MINT)
      label(x, 790, 700, `ATTEMPT ${1 + Math.min(6, Math.floor(lt * 3))}`, pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 44, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Two empty spots. | *Couldn’t choose.*', mood: 'neutral', look: lt => [Math.sin(lt * 4) > 0 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      sign(x, 700, 800, pop01(t, P.t0 + 0.2, 0.3, 2))
      sign(x, 890, 800, pop01(t, P.t0 + 0.4, 0.3, 2))
      bubble(x, 790, 1060, 'this one? | no, that one.', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 36, tail: 'bl', col: LAV })
    } },
  { sign: 'scorpio', cap: 'Perfect park. | *No witnesses.*', mood: lt => lt > 1.1 ? 'wink' : 'neutral', look: [1, 0], star: ST, keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      CURB(x, pop01(t, P.t0 + 0.2, 0.3, 2))
      car(x, 790, 950, 15 * pop01(t, P.t0 + 0.2, 0.3, 2), '#6b4aa8')
      label(x, 790, 700, 'FLAWLESS', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 44, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 1110, 'of course.', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Gave up. | *Parked a mile away.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.9, 1.4],
    front(x, t, lt, P) {
      car(x, 880, 760, 8 * pop01(t, P.t0 + 0.2, 0.3, 2), '#a77bff')
      label(x, 790, 920, '1 MILE WALK', pop01(t, P.t0 + 0.8, 0.3, 2.4), { size: 42, bg: ORANGE, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 790, 1080, 'scenic route!', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'capricorn', cap: 'Read the manual. | *Then parked.*', mood: 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'book', 790, 780, 24 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.05 })
      label(x, 790, 640, 'CHAPTER 9: CURBS', pop01(t, P.t0 + 0.7, 0.3, 2.2), { size: 34, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 1040, 'PERFECT. SLOWLY.', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 36, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Parked sideways. | *Calls it innovation.*', mood: lt => lt > 1.0 ? 'wink' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      car(x, 800, 880, 15 * pop01(t, P.t0 + 0.2, 0.3, 2), SKYB, { rot: Math.PI / 2 * ease.inOutCubic(prog(lt, 0.4, 1.0)) })
      label(x, 800, 1090, 'THE FUTURE', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 40, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Someone honked. | *Sobbing.*', mood: 'wide', tears: lt => lt > 0.8 ? 3 : 1, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      car(x, 820, 980, 13 * pop01(t, P.t0 + 0.2, 0.3, 2), PINK, { rot: 0.2 })
      label(x, 800, 720, 'beep.', pop01(t, P.t0 + 0.6, 0.3, 2.4), { size: 50, bg: BONE, rot: 0.05, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0274', key: 'D', accent: SKYB, ending: 'lesson',
  title: 'Zodiacs parallel | parking *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve signs. | *Zero straight cars.*' },
  lesson: { text: 'Take your time. | *Everyone* gets there.', chip: 'PARKED: EVENTUALLY' },
  last: { text: 'Crooked counts. | *You made it.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
