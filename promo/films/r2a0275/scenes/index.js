// r2a0275: star_advice, ADVICE ROLLCALL, "What each sign | *needs in winter.*" (~59 s vertical, signs3kit social cut, music: lofi · G)
// Twelve signs, one warm, specific winter need each, with a light gag. Ending: lesson.
//   ♈ a cold run, then cocoa · ♉ the softest blanket ever made · ♊ a friend to call on long nights · ♋ a warm kitchen,
//   a fresh batch · ♌ a cozy sweater that still sparkles · ♍ a slow Sunday with no list · ♎ a candlelit date
//   · ♏ long nights, deep talks · ♐ a snowy trip somewhere new · ♑ permission to hibernate · ♒ stargazing in the cold
//   · ♓ naming snowflakes, one by one
//   group "Twelve signs. | *One big blanket.*"  LESSON "Rest isn’t lazy. | It’s *how you bloom.*"  last "Stay cozy. | *Spring’s coming.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { phone, note, calendar, bits, ORANGE, RED, WOOD, PAPER, SLATE } from '../props.js'

const ST = { x: -170 }
const BLANKET = [['PPPPPPPPPPPPP', 'PWPPWPPWPPWPP', 'PPPPPPPPPPPPP', 'PPWPPWPPWPPWP', 'PPPPPPPPPPPPP', 'PWPPWPPWPPWPP', 'PPPPPPPPPPPPP'], { P: LAV, W: PAPER }]
const SWEATER = [['..RRR.RRR..', '.RRRRRRRRR.', 'RRRRWRWRRRR', 'RR.RRRRR.RR', 'RR.RWRWR.RR', 'WW.RRRRR.WW', '...RRRRR...', '...WWWWW...'], { R: RED, W: PAPER }]
const CANDLE = [['....F....', '...FYF...', '....K....', '..PPPPP..', '..PPPPP..', '..PPPPP..', '..PPPPP..', '..PPPPP..'], { F: ORANGE, Y: GOLD, K: INK, P: PAPER }]
const FLAKE = [['....W....', '.W..W..W.', '..W.W.W..', '...WWW...', 'WWWWWWWWW', '...WWW...', '..W.W.W..', '.W..W..W.', '....W....'], { W: '#e8f6ff' }]
const SCOPE = [['.........SS', '.......SSSS', '.....SSSS..', '...SSSS....', '..SSS......', '....K......', '...K.K.....', '..K...K....'], { S: '#9aa5c4', K: WOOD }]
function snow(x, t, k = 1, area = [620, 960, 600, 1100], n = 14, seed = 0) {
  if (k <= 0.01) return
  x.save(); x.globalAlpha = k * 0.9; x.fillStyle = '#ffffff'
  for (let i = 0; i < n; i++) {
    const ph = ((t * 0.25 + i * 0.137 + seed) % 1 + 1) % 1
    const px = area[0] + ((i * 97) % (area[1] - area[0])) + Math.sin(t * 1.5 + i) * 14, py = area[2] + ph * (area[3] - area[2])
    x.fillRect(px - 3, py - 9, 6, 18); x.fillRect(px - 9, py - 3, 18, 6)
  }
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'A cold morning run. | *Then cocoa.*', mood: lt => lt > 1.1 ? 'heart' : 'sparkle', look: [1, 0], star: ST, hops: [0.5, 0.9],
    front(x, t, lt, P) {
      snow(x, t, pop01(t, P.t0 + 0.1, 0.3, 2))
      bits(x, 'mug', 790, 850, 24 * pop01(t, P.t0 + 0.7, 0.3, 2))
      label(x, 790, 1060, 'EARNED IT', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 42, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'The softest blanket | *ever made.*', mood: lt => lt > 1.0 ? 'sleepy' : 'heart', star: ST,
    front(x, t, lt, P, F) {
      drawBits(x, BLANKET[0], BLANKET[1], F.x + 20, F.cy + 70, 22 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: -0.05 })
      label(x, 800, 700, 'DO NOT MOVE ME', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 36, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'A friend to call | *on long nights.*', mood: lt => lt > 1.1 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, 790, 820, 1.15 * pop01(t, P.t0 + 0.2, 0.3, 2), { top: '11:58', head: 'INCOMING', msg: 'just checking | in ♡', bg: MINT })
      label(x, 790, 1080, 'TALKED TILL 3', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 36, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'A warm kitchen. | *A fresh batch.*', mood: 'heart', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) bits(x, 'cookie', 700 + i * 90, 860 - (i % 2) * 40, 14 * pop01(t, P.t0 + 0.2 + i * 0.15, 0.3, 2))
      label(x, 790, 680, 'FOR EVERYONE', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 40, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 1040, 'TAKE TWO', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 38, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'A cozy sweater | *that still sparkles.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, SWEATER[0], SWEATER[1], 790, 830, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      sparkles(x, t, 790, 830, P.t0 + 0.9, 8, 180, 0.4); sparkles(x, t, 790, 830, P.t0 + 1.6, 6, 140, 1.1)
      label(x, 790, 1060, 'WARM + ICONIC', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 38, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'A slow Sunday. | *No list.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      note(x, 790, 820, pop01(t, P.t0 + 0.2, 0.3, 2), 'laundry | email | reorganize', { head: 'TO-DO', headBg: MINT, size: 36, w: 330, strike: lt > 1.0 ? [0, 1, 2] : [] })
      label(x, 790, 1060, 'JUST REST', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 42, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'A cozy date | *by candlelight.*', mood: lt => lt > 1.0 ? 'heart' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, CANDLE[0], CANDLE[1], 790, 840, 28 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 640, 'IT’S A MATCH', pop01(t, P.t0 + 0.8, 0.3, 2.4), { size: 40, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 470, 760, P.t0 + 1.2, { n: 4, life: 1.5, spread: 120, cell: 6, seed: 4 })
    } },
  { sign: 'scorpio', cap: 'Long nights. | *Deep talks.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: ST, keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'moon', 800, 720, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 960, 'so what are | you afraid of?', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 38, tail: 'bl', col: LAV })
    } },
  { sign: 'sagittarius', cap: 'A snowy trip | *somewhere new.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.9, 1.5],
    front(x, t, lt, P) {
      snow(x, t, pop01(t, P.t0 + 0.1, 0.3, 2), [620, 960, 600, 1100], 14, 0.4)
      bits(x, 'suitcase', 790, 860, 22 * pop01(t, P.t0 + 0.4, 0.3, 2))
      label(x, 790, 680, 'BOOKED IT', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 42, bg: ORANGE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Permission | *to hibernate.*', mood: lt => lt > 0.9 ? 'sleepy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'pillow', 790, 900, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 700, 'OUT OF OFFICE', pop01(t, P.t0 + 0.8, 0.3, 2.4), { size: 40, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1060, 'APPROVED ✓', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 38, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Stargazing | *in the cold.*', mood: 'sparkle', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      drawBits(x, SCOPE[0], SCOPE[1], 790, 900, 27 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'star', 880, 690, 14 * pop01(t, P.t0 + 0.8, 0.3, 2.4)); sparkles(x, t, 880, 690, P.t0 + 0.9, 6, 90, 0.3)
      label(x, 760, 1080, 'WORTH IT', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 40, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Naming snowflakes. | *One by one.*', mood: lt => lt > 1.0 ? 'heart' : 'sparkle', tears: lt => lt > 1.0 ? 3 : 2, look: [1, -1], star: ST,
    front(x, t, lt, P) {
      snow(x, t, pop01(t, P.t0 + 0.1, 0.3, 2), [620, 960, 600, 1000], 10, 0.7)
      drawBits(x, FLAKE[0], FLAKE[1], 800, 820, 20 * pop01(t, P.t0 + 0.5, 0.35, 2), { rot: t * 0.6 })
      bubble(x, 790, 1060, 'this one’s Gus.', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'r2a0275', key: 'G', accent: SKYB, ending: 'lesson',
  title: 'What each sign | *needs in winter.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve signs. | *One big blanket.*' },
  lesson: { text: 'Rest isn’t lazy. | It’s *how you bloom.*', chip: 'WARMTH: FULL' },
  last: { text: 'Stay cozy. | *Spring’s coming.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
