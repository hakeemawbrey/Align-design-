// r2t0159: star_talk ROLLCALL, "The signs | *making it official.*" (~62 s vertical, signs3kit social cut, music: lofi · D).
// Twelve signs in zodiac order, each making a relationship official in the most extreme way:
//   ♈ on the first date · ♉ shared their dessert (basically a proposal) · ♊ made it official, then asked again · ♋ told their mom
//   first · ♌ held a press conference · ♍ made a slideshow, "why us" · ♎ matching outfits on the profile · ♏ already
//   knew you’d say yes · ♐ asked on a mountain top, out of breath · ♑ drafted a contract · ♒ asked with a riddle
//   · ♓ said yes, cried for a week
//  49.2   "Twelve ways | to say *“us.”*"  group photo
//  52.4   LESSON UNLOCKED: "Every love story | has *its own speed.*"  STATUS: OFFICIAL
//  58.3   "Taurus shared dessert. | *It’s serious.*" over the match card: Taurus + Cancer (the dessert, paid off)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ROSE = '#ff7aa8', RED = '#e23d4e', ORANGE = '#ffb34a', BROWN = '#8a4a2e'
const ST = { x: -170 }

const CAKE = [
  '.....R.....',
  '....WWW....',
  '..PPPPPPP..',
  '.PPPPPPPPP.',
  'WWWWWWWWWWW',
  'BBBBBBBBBBB',
  'BBBBBBBBBBB',
  '.DDDDDDDDD.',
]
const CAKE_C = { R: RED, W: BONE, P: PINK, B: '#c98f5a', D: '#d8dbe8' }
const MOUNTAIN = [
  '......WW......',
  '.....WWWW.....',
  '....GGGGGG....',
  '...GGGGGGGG...',
  '..GGGGgGGGGG..',
  '.GGGgGGGGgGGG.',
  'GGGGGGGGGGGGGG',
]

function sheet(x, cx, cy, w, h, bg, k, rot = 0) {
  if (k <= 0.01) return false
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  return true
}
function txt(x, s, px, py, size, col = INK, font = INTER, weight = 800) {
  x.fillStyle = col; x.font = `${weight} ${size}px ${font}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(s, px, py)
}

const CAMEOS = [
  { sign: 'aries', cap: 'Made it official | *on the first date.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.5, 1.0],
    front(x, t, lt, P) {
      bubble(x, 790, 660, 'so we’re dating?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 38, tail: 'bl' })
      label(x, 790, 900, 'TIME: 4 MINUTES IN', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 32, bg: RED, color: '#fff4e2', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Shared their dessert. | *Basically a proposal.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, CAKE, CAKE_C, 800, 840, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      if (lt > 1.3) { x.fillStyle = INK; x.fillRect(796, 760, 8, 180) }
      label(x, 800, 1050, lt > 1.3 ? 'HALF. FOR YOU.' : 'MINE.', pop01(t, P.t0 + (lt > 1.3 ? 1.3 : 0.5), 0.3, 2.4), { size: 40, bg: lt > 1.3 ? PINK : BONE, rot: 0.04, font: MONO, weight: 700 })
      if (lt > 1.3) hearts(x, t, 800, 760, P.t0 + 1.3, { n: 4, life: 1.4, spread: 160, cell: 7, seed: 1 })
    } },
  { sign: 'gemini', cap: 'Made it official. | Then *asked again.*', mood: lt => lt > 1.3 ? 'wide' : 'happy', look: lt => [Math.floor(lt * 2.4) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 760, 680, 'we’re official!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 38, tail: 'bl' })
      bubble(x, 820, 900, 'wait. are we?', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 38, col: LAV, tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'Told their mom | *before telling you.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 820, 930, 170 * k, { mood: 'heart', look: [-1, 0], seed: 19, glyph: false })
      if (k > 0.01) drawBits(x, ['.PPPPP.', 'PPPPPPP', 'P.....P'], { P: LAV }, 820, 820, 12 * k)
      bubble(x, 800, 650, 'MOM! guess what', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 36, tail: 'br' })
      label(x, 820, 1110, 'MOM APPROVES', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Held a | *press conference.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) { x.fillStyle = INK; x.fillRect(796, 820, 10, 90); x.fillStyle = '#c9c9d8'; x.fillRect(780, 790, 40, 40); x.fillStyle = INK; x.fillRect(780, 805, 40, 6) }
      if (sheet(x, 800, 990, 260, 180, '#2a2350', k, 0)) { x.fillStyle = GOLD; x.fillRect(-130, -90, 260, 22); txt(x, 'PRESS', 0, 20, 44, GOLD, MONO, 700); x.restore() }
      label(x, 800, 650, '“WE’RE TOGETHER.”', pop01(t, P.t0 + 0.8, 0.3, 2.4), { size: 36, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 680, 700, P.t0 + 1.2, 6, 120, 0.3, [BONE, '#fff', GOLD])
      sparkles(x, t, 920, 760, P.t0 + 1.5, 6, 120, 0.9, [BONE, '#fff', GOLD])
    } },
  { sign: 'virgo', cap: 'Made a slideshow: | *“Why Us.”*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), sl = Math.min(3, 1 + Math.floor(lt / 0.6))
      if (sheet(x, 800, 820, 340, 250, BONE, k, 0.03)) {
        txt(x, `WHY US (${sl}/3)`, 0, -90, 30, INK, MONO, 700)
        x.fillStyle = MINT; x.fillRect(-120, -40, 240, 22); x.fillStyle = PINK; x.fillRect(-120, 0, 200, 22); x.fillStyle = SKYB; x.fillRect(-120, 40, 160, 22)
        x.restore()
      }
      label(x, 800, 1020, 'CITED SOURCES', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 36, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'New profile pic: | *matching outfits.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (sheet(x, 800, 830, 300, 330, '#2a2350', k, 0.04)) { x.fillStyle = '#140c30'; x.fillRect(-134, -150, 268, 230); txt(x, '♎︎ + ♌︎', 0, 120, 30, ROSE, MONO, 700); x.restore() }
      if (k > 0.5) {
        signChar(x, t, 'libra', 750, 800, 120, { mood: 'heart', seed: 61, glyph: false })
        signChar(x, t, 'leo', 850, 800, 120, { mood: 'sparkle', seed: 62, glyph: false })
        drawBits(x, ['RRRRR', 'R.R.R'], { R: GOLD }, 750, 740, 8); drawBits(x, ['RRRRR', 'R.R.R'], { R: GOLD }, 850, 740, 8)
      }
      label(x, 800, 1060, 'TWINNING', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 40, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Already knew | *you’d say yes.*', mood: 'wink', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'obviously.', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 46, col: LAV, tail: 'bl' })
      label(x, 790, 920, 'CALLED IT: MARCH', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 34, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Asked on a mountain. | *Out of breath.*', mood: lt => lt > 1.2 ? 'wide' : 'sparkle', look: [1, -1], star: ST, hops: [0.6, 1.2],
    front(x, t, lt, P) {
      drawBits(x, MOUNTAIN, { W: BONE, G: '#5fbf8f', g: '#2f7a5a' }, 790, 890, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 640, 'be… mine…? *pant*', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: 'capricorn', cap: 'Made it official. | *With a contract.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (sheet(x, 800, 830, 290, 360, BONE, k, -0.03)) {
        txt(x, 'AGREEMENT', 0, -140, 30, INK, MONO, 700)
        x.fillStyle = '#b9b0a0'; for (let i = 0; i < 5; i++) x.fillRect(-110, -90 + i * 36, i === 4 ? 120 : 220, 14)
        x.fillStyle = INK; x.fillRect(-110, 120, 100, 4); x.fillRect(20, 120, 100, 4)
        if (lt > 1.2) { x.strokeStyle = '#5b62d8'; x.lineWidth = 5; x.beginPath(); x.moveTo(-105, 112); for (let i = 0; i < 8; i++) x.lineTo(-105 + i * 12, 112 + (i % 2 ? -14 : 0)); x.stroke() }
        x.restore()
      }
      label(x, 800, 1080, 'SIGN HERE ♡', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 36, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Asked | *with a riddle.*', mood: 'wink', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'what has two | hearts and…', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 36, col: SKYB, tail: 'bl' })
      label(x, 790, 950, 'ANSWER: US', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 42, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Said yes. | *Cried for a week.*', mood: 'heart', tears: 3, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      label(x, 800, 700, 'YES!!!', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 64, bg: PINK, rot: -0.05, font: MONO, weight: 700 })
      label(x, 800, 960, 'DAY 6 OF CRYING', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 800, 700, P.t0 + 0.6, 7, 170, 0.4, [PINK, BONE, GOLD])
    } },
]

const F = makeFilm({
  id: 'r2t0159', key: 'D', accent: ROSE, ending: 'card',
  title: 'The signs | *making it official.*',
  cameos: CAMEOS,
  card: { a: 'taurus', b: 'cancer', chip: 'IT’S OFFICIAL' },
  group: { cap: 'Twelve ways | to say *“us.”*' },
  lesson: { text: 'Every love story | has *its own speed.*', chip: 'STATUS: OFFICIAL' },
  last: { text: 'They shared dessert. | *It’s serious.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
