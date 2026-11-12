// r2t0445: star_talk, BELIKE, "Subtitled movie? | *Zodiacs be like.*" (~54 s vertical, signs3kit social cut, music: lofi · F)
// Topic: zodiacs when the movie has subtitles. Twelve signs, one short line each. Ending: group.
//   0.0–3.6    hook
//   3.6–49.2   ♈ reads ahead, spoils it · ♉ asleep by line three · ♊ reads them out loud, in accents · ♋ keeps asking "following?"
//              · ♌ "I speak it." (they don't) · ♍ found a translation error · ♎ dubbed or subtitled? still deciding
//              · ♏ turned them off, reads lips · ♐ booked a trip to the filming location · ♑ watching at 1.5×
//              · ♒ learned the language by the credits · ♓ can't read through the tears
//  49.2        "Two hours. | *Nobody read it.*"  ([ dramatic silence ])
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const CREAM = '#fff8ea', RED = '#e23d4e', SLATE = '#9aa5c4', SUB = '#ffe35a', VIOLET = '#b07bff'

/** a movie screen with a subtitle line */
function screen(x, t, cx, cy, k, sub, { w = 360, h = 230, blur = 0, rot = 0.03 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k * 1.12, k * 1.12)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 10, -h / 2 - 10, w + 20, h + 20)
  x.fillStyle = '#0c0820'; x.fillRect(-w / 2, -h / 2, w, h)
  const g = x.createLinearGradient(0, -h / 2, 0, h / 2); g.addColorStop(0, '#3a2a6a'); g.addColorStop(1, '#140c30')
  x.fillStyle = g; x.fillRect(-w / 2 + 10, -h / 2 + 10, w - 20, h - 70)
  x.fillStyle = '#ff8fb1'; x.fillRect(-60, -40, 40, 60); x.fillStyle = '#8fe3ff'; x.fillRect(30, -50, 40, 70)
  if (sub) {
    x.save(); if (blur) x.filter = `blur(${blur}px)`
    x.fillStyle = SUB; x.font = `800 34px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.strokeStyle = INK; x.lineWidth = 6; x.strokeText(sub, 0, h / 2 - 32, w - 30); x.fillText(sub, 0, h / 2 - 32, w - 30)
    x.restore()
  }
  x.restore()
}
const POP = ['.W.W.W.', 'WWWWWWW', 'RWRWRWR', 'RWRWRWR', 'RWRWRWR', '.RWRWR.']
const TICKET = ['YYYYYYYYYYY', 'YKKKYYYYKYY', 'YYYYYYYYKYY', 'YKKKKKYYKYY', 'YYYYYYYYYYY']

const CAMEOS = [
  { sign: 'aries', cap: 'Reads ahead. | *Spoils the ending.*', mood: lt => lt > 1.1 ? 'sparkle' : 'wide', look: [1, 0], star: { x: -170 }, hops: [0.8],
    front(x, t, lt, P) {
      screen(x, t, 760, 800, pop01(t, P.t0 + 0.15, 0.3, 2), 'I have a secret…')
      bubble(x, 790, 1060, 'he’s the dad!!', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 42, col: RED, ink: INK, tail: 'bc' })
    } },
  { sign: 'taurus', cap: 'Asleep | by *line three.*', mood: 'sleepy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      screen(x, t, 760, 800, pop01(t, P.t0 + 0.15, 0.3, 2), ['Line one.', 'Line two.', 'Line thr—'][Math.min(2, Math.floor(lt / 0.5))])
      drawBits(x, POP, { W: CREAM, R: RED }, 790, 1060, 18 * pop01(t, P.t0 + 0.4, 0.3, 2), { rot: 0.4 })
    } },
  { sign: 'gemini', cap: 'Reads them out loud. | *In accents.*', mood: lt => Math.floor(lt * 2.5) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      screen(x, t, 760, 800, pop01(t, P.t0 + 0.15, 0.3, 2), 'Where is the train?')
      bubble(x, 790, 1060, '“Vhere ees | ze train?!”', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 40, col: GOLD, tail: 'bc' })
    } },
  { sign: 'cancer', cap: 'Pauses every minute. | *“You following?”*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [-1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      screen(x, t, 760, 800, pop01(t, P.t0 + 0.15, 0.3, 2), '❚❚ PAUSED')
      bubble(x, 790, 1060, 'you following, | love? ♡', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 38, col: SKYB, tail: 'bc' })
    } },
  { sign: 'leo', cap: '“I speak it.” | *They don’t.*', mood: lt => lt > 1.2 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      screen(x, t, 760, 800, pop01(t, P.t0 + 0.15, 0.3, 2), 'Pass the butter.')
      bubble(x, 790, 1060, '“she said I’m | her hero”', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 38, col: GOLD, tail: 'bc' })
    } },
  { sign: 'virgo', cap: 'Found | a *translation error.*', mood: 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      screen(x, t, 760, 800, pop01(t, P.t0 + 0.15, 0.3, 2), 'Your welcome.')
      label(x, 790, 1060, 'LINE 214: “YOU’RE”', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Dubbed or subtitled? | *Still deciding.*', mood: 'squint', look: lt => [Math.sin(lt * 4) > 0 ? 1 : -1, -1], star: { x: -170 },
    front(x, t, lt, P) {
      const a = Math.sin(lt * 4) > 0
      label(x, 790, 780, 'DUBBED', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 40, bg: a ? GOLD : SLATE, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 900, 'SUBTITLED', pop01(t, P.t0 + 0.4, 0.3, 2), { size: 40, bg: a ? SLATE : GOLD, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 1080, 'MOVIE: NOT STARTED', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 28, bg: PINK, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Turned them off. | *Reads lips.*', mood: lt => lt > 1.1 ? 'squint' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      screen(x, t, 760, 800, pop01(t, P.t0 + 0.15, 0.3, 2), '')
      label(x, 790, 1060, 'SUBTITLES: OFF', pop01(t, P.t0 + 0.7, 0.3, 2.4), { size: 34, bg: VIOLET, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 600, 640, 'she lied.', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 38, tail: 'bc' })
    } },
  { sign: 'sagittarius', cap: 'Booked a trip | to the *filming location.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -170 }, hops: [1.0, 1.6],
    front(x, t, lt, P) {
      screen(x, t, 760, 780, pop01(t, P.t0 + 0.15, 0.3, 2), 'Welcome to the island.')
      label(x, 780, 1060, '✈︎ TRIP: BOOKED', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 36, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Watching at 1.5×. | *Reading at 2×.*', mood: 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      screen(x, t, 760, 800, pop01(t, P.t0 + 0.15, 0.3, 2), ['I love y—', 'Goodb—', 'THE END'][Math.min(2, Math.floor(lt / 0.5))])
      label(x, 790, 1060, 'SPEED: 1.5×', pop01(t, P.t0 + 0.4, 0.3, 2.4), { size: 38, bg: SLATE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Learned the language | *by the credits.*', mood: lt => lt > 1.2 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      screen(x, t, 760, 800, pop01(t, P.t0 + 0.15, 0.3, 2), 'THE END')
      bubble(x, 790, 1060, 'fluent now.', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 42, col: SKYB, tail: 'bc' })
    } },
  { sign: 'pisces', cap: 'Can’t read | *through the tears.*', mood: 'wide', look: [1, 0], tears: 3, star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      screen(x, t, 760, 800, pop01(t, P.t0 + 0.15, 0.3, 2), 'I’ll always remember you.', { blur: lt > 0.8 ? 3 : 0 })
      label(x, 790, 1060, 'SUBTITLES: BLURRY', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 32, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0445', key: 'F', accent: SUB, ending: 'group',
  title: 'Subtitled movie? | *Zodiacs be like.*',
  cameos: CAMEOS,
  group: {
    cap: 'Two hours. | *Nobody read it.*',
    draw(x, t, lt) {
      const t0 = t - lt
      screen(x, t, 540, 690, pop01(t, t0 + 1.4, 0.35, 2) * 1.2, '[ dramatic silence ]')
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
