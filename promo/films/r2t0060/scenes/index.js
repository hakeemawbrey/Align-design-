// r2t0060: star_talk, BELIKE (twelve signs), "Zodiacs meditating | be like." (~57 s vertical, signs3kit, music: lofi · F)
// Twelve signs in zodiac order, each the most extreme version of itself trying to meditate.
//   0.0–3.6    "Zodiacs meditating | *be like.*"
//   3.6–49.2   four seconds, done · fell asleep, called it a win · forty other thoughts (lunch? their sign? aliens?)
//              · thought of mom, called mom · meditated for an audience · alphabetised the incense · couldn't pick a
//              cushion · reached inner peace, kept it classified · on a mountain, obviously · scheduled inner peace
//              · levitated, slightly · heard the rain sounds, wept
//  49.2        "Inner peace: | *loading…*"
//  52.6        CALLBACK: "Aquarius? | *Still up there.*"  Aquarius floating high above an empty cushion.
import { prog, lerp, ease } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', BROWN = '#8a4a2e', GREEN = '#7ee08a', TEAL = '#5fd0c0'

const CUSH = ['.CCCCCCCCCC.', 'CCCCCCCCCCCC', 'CCCWCCCCWCCC', 'CCCCCCCCCCCC', '.CCCCCCCCCC.']
const MOUNT = ['......W......', '.....WWW.....', '....WWGWW....', '...GGGGGGG...', '..GGGGGGGGG..', '.GGGGGGGGGGG.', 'GGGGGGGGGGGGG']
function cushion(x, cx, cy, cell, col, k) { drawBits(x, CUSH, { C: col, W: BONE }, cx, cy, cell * k) }
function incense(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  ;['A', 'B', 'C'].forEach((l, i) => {
    const px = -90 + i * 90
    x.fillStyle = INK; x.fillRect(px - 6, -150, 12, 160); x.fillStyle = BROWN; x.fillRect(px - 3, -148, 6, 156)
    x.fillStyle = RED; x.fillRect(px - 4, -158, 8, 10)
    x.fillStyle = 'rgba(239,230,214,0.45)'; for (let s = 0; s < 4; s++) x.fillRect(px - 4 + Math.sin(t * 3 + s + i) * 10, -180 - s * 26, 8, 14)
    x.fillStyle = INK; x.fillRect(px - 28, 20, 56, 50); x.fillStyle = BONE; x.fillRect(px - 22, 26, 44, 38)
    x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(l, px, 46)
  })
  x.fillStyle = INK; x.fillRect(-140, 0, 280, 20); x.fillStyle = '#c96a3a'; x.fillRect(-134, 4, 268, 12)
  x.restore()
}
function rain(x, t, cx, cy, w, h, a) {
  if (a <= 0.01) return
  x.save(); x.globalAlpha = a
  for (let i = 0; i < 18; i++) { const px = cx - w / 2 + (i * 53) % w, py = cy - h / 2 + (((t * 420 + i * 97) % h) + h) % h; x.fillStyle = SKYB; x.fillRect(px, py, 6, 22) }
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Meditated for | *four seconds.*', mood: lt => lt > 1.2 ? 'sparkle' : 'sleepy', star: { x: -170 }, hops: [1.3],
    back(x, t, lt, P) { cushion(x, 370, 1110, 22, RED, pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P) {
      const s = Math.min(4, Math.floor(prog(lt, 0.2, 1.1) * 4.99))
      label(x, 790, 800, `00:0${s}`, pop01(t, P.t0 + 0.2, 0.3, 2), { size: 70, bg: BONE, font: MONO, weight: 700 })
      label(x, 790, 960, 'ENLIGHTENED.', pop01(t, P.t0 + 1.3, 0.3, 2.6), { size: 36, bg: RED, color: BONE, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Fell asleep. | *Called it a win.*', mood: 'sleepy', star: { x: -170 },
    back(x, t, lt, P) { cushion(x, 370, 1110, 22, GREEN, pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P) { label(x, 790, 860, 'MEDITATION: NAP', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 32, bg: GOLD, font: MONO, weight: 700 }) } },
  { sign: 'gemini', cap: 'Had forty | *other thoughts.*', mood: 'wide', look: lt => [Math.floor(lt * 3) % 2 ? 1 : -1, -1], star: { x: -170 },
    front(x, t, lt, P) {
      ;['lunch?', 'their sign?', 'aliens??'].forEach((w, i) => bubble(x, 790 + (i % 2 ? 30 : -20), 660 + i * 150, w, pop01(t, P.t0 + 0.3 + i * 0.45, 0.25, 2.2), { size: 36, col: [BONE, PINK, SKYB][i], tail: 'bl' }))
    } },
  { sign: 'cancer', cap: 'Thought of mom. | *Called mom.*', mood: 'heart', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 790, 760, 'hi mom!', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 52, col: PINK, tail: 'bl' })
      label(x, 790, 960, 'SESSION: 2 HOURS', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: SKYB, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Meditated where | *everyone could see.*', mood: 'sparkle', star: { x: -170 },
    back(x, t, lt, P) { cushion(x, 370, 1110, 22, GOLD, pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P) {
      label(x, 790, 780, 'AUDIENCE: WELCOME', pop01(t, P.t0 + 0.6, 0.3, 2), { size: 30, bg: GOLD, font: MONO, weight: 700 })
      sparkles(x, t, 380, 860, P.t0 + 0.9, 8, 200, 0.4)
      bubble(x, 790, 960, 'so calm. look.', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'virgo', cap: 'Alphabetised | *the incense.*', mood: 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) { incense(x, t, 790, 980, pop01(t, P.t0 + 0.2, 0.3, 2), lt) } },
  { sign: 'libra', cap: 'Couldn’t pick | *a cushion.*', mood: 'squint', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: { x: 0, y: -80 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      cushion(x, 320, 1080, 18, PINK, k); cushion(x, 760, 1080, 18, LAV, k)
      label(x, 540, 1170, 'STILL STANDING', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: BONE, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Found inner peace. | *Told no one.*', mood: 'wink', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    back(x, t, lt, P) { cushion(x, 370, 1110, 22, RED, pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P) { label(x, 790, 860, 'CLASSIFIED', pop01(t, P.t0 + 0.9, 0.3, 2.6), { size: 48, bg: RED, color: BONE, rot: -0.06, font: MONO, weight: 700 }) } },
  { sign: 'sagittarius', cap: 'On a mountain. | *Obviously.*', mood: 'sparkle', look: [-1, 0], star: { x: 170, y: -60 },
    back(x, t, lt, P) { drawBits(x, MOUNT, { W: BONE, G: '#6b62a8' }, 330, 960, 30 * pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P) { label(x, 320, 620, 'ALTITUDE: VIBES', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.05, font: MONO, weight: 700 }) } },
  { sign: 'capricorn', cap: 'Scheduled | *inner peace.*', mood: 'neutral', look: [-1, 0], star: { x: 170 },
    front(x, t, lt, P) {
      label(x, 320, 760, 'CALM: 3:15', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 40, bg: BONE, font: MONO, weight: 700 })
      label(x, 320, 900, 'BACK TO WORK: 3:20', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 28, bg: GREEN, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Levitated. | *Slightly.*', mood: 'sleepy', star: { x: -170, y: -120 },
    back(x, t, lt, P) {
      cushion(x, 370, 1110, 22, SKYB, pop01(t, P.t0 + 0.1, 0.3, 2))
      x.fillStyle = 'rgba(6,4,18,0.35)'; x.beginPath(); x.ellipse(370, 1060, 110, 18, 0, 0, Math.PI * 2); x.fill()
    },
    front(x, t, lt, P) {
      label(x, 790, 860, '+2 INCHES', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 44, bg: TEAL, font: MONO, weight: 700 })
      sparkles(x, t, 370, 760, P.t0 + 1.1, 7, 150, 0.2)
    } },
  { sign: 'pisces', cap: 'Played rain sounds. | *Wept.*', mood: 'wide', tears: lt => lt < 1.0 ? 2 : 3, look: [0, -1], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    back(x, t, lt, P) { rain(x, t, 790, 860, 300, 560, 0.7 * ease.outCubic(prog(lt, 0.2, 0.7))) },
    front(x, t, lt, P) { label(x, 790, 1090, 'SO BEAUTIFUL', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 34, bg: LAV, font: MONO, weight: 700 }) } },
]

const F = makeFilm({
  id: 'r2t0060', key: 'F', accent: TEAL, ending: 'callback',
  title: 'Zodiacs meditating | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Inner peace: | *loading…*' },
  last: {
    text: 'Aquarius? | *Still up there.*',
    draw(x, t, lt) {
      cushion(x, 540, 1200, 22, SKYB, pop01(t, t - lt + 0.3, 0.35, 2))
      const k = pop01(t, t - lt + 0.5, 0.45, 1.8)
      const y = lerp(1100, 760, ease.inOutCubic(prog(lt, 0.6, 2.4)))
      if (k > 0.01) signChar(x, t, 'aquarius', 540, y, 200 * k, { mood: 'sleepy', seed: 40 })
      sparkles(x, t, 540, 760, t - lt + 2.4, 8, 150, 0.3)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
