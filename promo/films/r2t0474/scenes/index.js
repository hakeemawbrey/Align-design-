// r2t0474: star_talk, ROLLCALL, "The signs at | *a housewarming.*" (topic: the signs at a housewarming party) (signs3kit
// social cut, music: lofi · D). Twelve signs in zodiac order, each the most extreme version of itself at a friend's
// housewarming. Ending: callback (Leo's portrait is still up in the hallway).
//   ♈ came early, built all the shelves · ♉ found the kitchen, never left · ♊ gave three tours of a house that isn't
//   theirs · ♋ brought soup, a blanket and their mom · ♌ gift: a portrait of Leo · ♍ gift: a vacuum · ♎ still deciding
//   where to sit · ♏ turned off the big light · ♐ a gift from four countries ago · ♑ asked about the mortgage
//   · ♒ brought a stranger, now roommates · ♓ cried on the tour.
//   group "New house. | *Same chaos.*"   last "Leo's portrait? | *Still in the hallway.*"
import { clamp, prog, ease } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { note, bits, frame, ORANGE, RED, WOOD, PAPER, SLATE, GREEN } from '../props.js'

const L = { x: -190 }, ACC = '#ffb86b'
const SHELF = ['WWWWWWWWWWWW', 'W..........W', 'WWWWWWWWWWWW', 'W..........W', 'WWWWWWWWWWWW', 'W..........W', 'WWWWWWWWWWWW']
const POT = ['..SSSSS..', '.SSSSSSS.', 'KKKKKKKKK', 'KRRRRRRRK', 'KRRRRRRRK', '.KRRRRRK.']
const VAC = ['..KKKK..', '..K..K..', '...KK...', '...KK...', '..RRRR..', '.RRRRRR.', '.RRWRRR.', '.RRRRRR.', '.RRRRRR.', 'KKKKKKKK', 'K.K..K.K']
const CHAIR = ['RRRR', 'R..R', 'R...', 'RRRR', 'R..R', 'R..R']
const LAMP = ['.YYYYY.', 'YYYYYYY', '...K...', '...K...', '...K...', '..KKK..']

/** Leo's portrait, framed */
const portrait = (x, t, cx, cy, k, rot = -0.03) => frame(x, cx, cy, k, 200, 230, x => {
  x.fillStyle = '#3a2766'; x.fillRect(-100, -115, 200, 230)
  signChar(x, t, 'leo', 0, 10, 150, { mood: 'sparkle', glyph: false, seed: 9 })
}, { col: GOLD, rot })

const CAMEOS = [
  { sign: 'aries', cap: 'Came early. | *Built all the shelves.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, 0], star: L, hops: [0.6, 1.2],
    front(x, t, lt, P) {
      const n = Math.min(4, Math.floor(clamp(lt / 1.2) * 4.99))
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) drawBits(x, SHELF.slice(0, 1 + n * 2 - (n ? 1 : 0) || 1), { W: WOOD }, 800, 900, 22 * k)
      label(x, 800, 680, 'DONE BY 6:05', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 36, bg: ORANGE, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Found the kitchen. | *Never left it.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', look: [1, 0], star: L,
    front(x, t, lt, P) {
      drawBits(x, POT, { S: BONE, K: INK, R: RED }, 800, 950, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 800, 700, 'HOUR 4: STILL HERE', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Gave three house tours. | *Not their house.*', mood: lt => lt > 1.2 ? 'wink' : 'sparkle', look: [1, 0], star: L, hops: [0.9],
    front(x, t, lt, P) {
      bubble(x, 800, 720, 'and THIS is | the bathroom!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, tail: 'bl' })
      label(x, 800, 980, `TOUR #${1 + Math.min(2, Math.floor(clamp((lt - 0.6) / 1.2) * 2.99))}`, pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 44, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Brought soup, a blanket | *and their mom.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: L, hops: [1.3],
    front(x, t, lt, P) {
      bits(x, 'bowl', 720, 1000, 16 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'pillow', 880, 1010, 14 * pop01(t, P.t0 + 0.5, 0.3, 2))
      const m = pop01(t, P.t0 + 1.2, 0.4, 1.8)
      if (m > 0.01) signChar(x, t, 'cancer', 820, 800, 170 * m, { mood: 'heart', look: [-1, 0], seed: 33, glyph: false })
      if (m > 0.5) drawBits(x, ['.WWWW.', 'WWWWWW', 'WPPPPW'], { W: LAV, P: PINK }, 820, 700 + Math.sin(t * 2.2) * 4, 10)
      label(x, 820, 1120, 'MOM', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 34, bg: PINK, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Their gift? | *A portrait of Leo.*', mood: 'sparkle', look: [1, -1], star: { x: -200 }, hops: [0.6, 1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      portrait(x, t, 790, 860, pop01(t, P.t0 + 0.3, 0.35, 2))
      label(x, 790, 1100, 'FOR YOUR WALL', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 860, P.t0 + 1.2, 8, 200, 0.4)
    } },
  { sign: 'virgo', cap: 'Brought a gift. | *It’s a vacuum.*', mood: lt => lt > 1.2 ? 'happy' : 'squint', look: [1, 0], star: L,
    front(x, t, lt, P) {
      drawBits(x, VAC, { K: '#5a5280', R: '#8fb0ff', W: BONE }, 830, 930, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'gift', 680, 1060, 12 * pop01(t, P.t0 + 0.2, 0.3, 2), { alpha: lt > 0.8 ? 0.35 : 1 })
      label(x, 800, 690, 'YOU’RE WELCOME', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 34, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Still deciding | *where to sit.*', mood: lt => lt > 1.3 ? 'squint' : 'happy', look: lt => Math.floor(lt * 2) % 2 ? [1, 0] : [-1, 0], star: { x: 0, y: 30 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, CHAIR, { R: PINK }, 270, 990, 20 * k); drawBits(x, CHAIR, { R: SKYB }, 810, 990, 20 * k, { sx: -1 })
      label(x, 540, 640, 'HOUR 2: STANDING', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Turned off the big light. | *Mood: perfect.*', mood: lt => lt > 1.0 ? 'wink' : 'squint', look: [1, 0], star: L,
    back(x, t, lt, P) {
      const d = ease.inOutCubic(prog(lt, 0.7, 1.1))
      if (d > 0) { x.save(); x.fillStyle = `rgba(4,2,14,${(0.55 * d).toFixed(3)})`; x.fillRect(120, 490, 840, 720); x.restore() }
    },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), on = lt > 0.9
      if (on && k > 0.5) { x.save(); const g = x.createRadialGradient(820, 880, 10, 820, 880, 220); g.addColorStop(0, 'rgba(255,200,120,0.45)'); g.addColorStop(1, 'rgba(255,200,120,0)'); x.fillStyle = g; x.fillRect(560, 640, 520, 520); x.restore() }
      drawBits(x, LAMP, { Y: on ? '#ffcf7a' : '#7a6a9a', K: INK }, 820, 900, 22 * k)
      label(x, 820, 1100, 'LAMPS ONLY', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 36, bg: '#c2375a', color: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Their gift? | *From four countries ago.*', mood: 'sparkle', look: [1, 0], star: L, hops: [0.7, 1.5],
    front(x, t, lt, P) {
      bits(x, 'gift', 800, 940, 22 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 800, 700, 'SOUVENIR (VINTAGE)', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 32, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Minute one: | *“So what’s the mortgage?”*', mood: 'neutral', look: [1, 0], star: L,
    front(x, t, lt, P) {
      note(x, 800, 880, pop01(t, P.t0 + 0.4, 0.3, 2), 'rate? | term? | resale?', { head: 'QUESTIONS', headBg: BONE, size: 38, w: 300, font: MONO, weight: 700, rot: -0.03 })
      label(x, 800, 1090, 'HI, BY THE WAY', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 32, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Brought a stranger. | *Now they’re roommates.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: L, hops: [1.2],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.4, 1.8)
      if (k > 0.01) signChar(x, t, 'virgo', 820, 920, 200 * k, { mood: lt > 1.2 ? 'heart' : 'wide', look: [-1, 0], seed: 34, glyph: false })
      label(x, 820, 690, 'NEW ROOMMATE', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 36, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Cried on the tour. | *“It’s just so YOU.”*', mood: 'wide', tears: lt => lt > 0.6 ? 3 : 1, look: [1, 0], star: L,
    front(x, t, lt, P) {
      bits(x, 'house', 800, 930, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 800, 680, 'the CURTAINS…', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 42, col: LAV, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'r2t0474', key: 'D', accent: ACC, ending: 'callback',
  title: 'The signs at | *a housewarming.*',
  cameos: CAMEOS,
  group: { cap: 'New house. | *Same chaos.*' },
  last: {
    text: 'Leo’s portrait? | *Still in the hallway.*',
    draw(x, t, lt) {
      portrait(x, t, 540, 1080, pop01(t, t - lt + 0.6, 0.4, 2) * 1.25, 0.02)
      label(x, 540, 1450, 'NOT MOVING IT', pop01(t, t - lt + 1.4, 0.3, 2.4), { size: 38, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 540, 1080, t - lt + 1.2, 9, 260, 0.5)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
