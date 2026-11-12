// r2a0079: star_advice ADVICE ROLLCALL, "How each sign | asks for space." (~61 s vertical, signs3kit social cut,
// music: lofi · E). Twelve signs in zodiac order; one warm, relatable line per sign with a light visual gag:
//   ♈ "brb", goes for a run · ♉ space, and a snack · ♊ space from their own thoughts · ♋ asks for space, checks on you
//   twice · ♌ profile status: recharging · ♍ space, with a schedule · ♎ asks so nicely you agree · ♏ goes quiet, comes
//   back closer · ♐ needs space, as in outer space · ♑ books themself a quiet afternoon · ♒ sends a meme instead
//   · ♓ needs a cry, then a hug
//  49.2   "Different ways. | *Same need.*"  group photo
//  52.4   LESSON UNLOCKED: "Space isn’t distance. | *It’s a breath.*"  BOND: STRONG
//  58.3   "Take your time. | *We’ll be here.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const TEAL = '#8fe3d0', RED = '#e23d4e', BROWN = '#8a4a2e', ORANGE = '#ffb34a'
const ST = { x: -170 }

function card(x, cx, cy, w, h, bg, k, rot = 0) {
  if (k <= 0.01) return false
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  return true
}
function text(x, s, px, py, size, col = INK, font = INTER, weight = 800) {
  x.fillStyle = col; x.font = `${weight} ${size}px ${font}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(s, px, py)
}
function phone(x, cx, cy, k, draw, rot = 0.05) {
  if (!card(x, cx, cy, 250, 400, '#2a2350', k, rot)) return
  x.fillStyle = '#140c30'; x.fillRect(-110, -170, 220, 340)
  draw(); x.restore()
}
const SHOE = ['..RRRR....', '.RRRRRR...', 'RRRRRRRRR.', 'RRRRRRRRRR', 'WWWWWWWWWW']
const SNACK = ['..CCCCCCC..', '.CkCCCkCCC.', 'CCCCkCCCCkC', 'WWWWWWWWWWW', '.WWWWWWWWW.']
const MOON = ['..YYYY..', '.YYY....', 'YYY.....', 'YYY.....', 'YYY.....', 'YYY.....', '.YYY....', '..YYYY..']
const PLANET = [
  '.....PPPP.....',
  '...PPPPPPPP...',
  'RRPPPPPPPPPPRR',
  '.RRRRRRRRRRRR.',
  '...PPPPPPPP...',
  '.....PPPP.....',
]
const HEART = ['.HH.HH.', 'HHHHHHH', 'HWHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...']
function profile(x, t, cx, cy, k, sign, status) {
  if (!card(x, cx, cy, 260, 330, BONE, k, 0.04)) return
  x.fillStyle = '#2a2350'; x.fillRect(-110, -145, 220, 190)
  x.restore()
  if (k > 0.5) signChar(x, t, sign, cx, cy - 55, 150 * k, { mood: 'sleepy', seed: 11, glyph: false, zzz: false })
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  text(x, status, 0, 100, 26, INK, MONO, 700)
  x.restore()
}
function calendar(x, cx, cy, k, meK, word = 'ME') {
  if (!card(x, cx, cy, 300, 300, BONE, k, 0.03)) return
  x.fillStyle = RED; x.fillRect(-150, -150, 300, 46)
  const cols = ['#9aa5c4', '#7d86a8', '#b7a6ff']
  for (let j = 0; j < 4; j++) for (let i = 0; i < 4; i++) {
    const me = i >= 1 && i <= 2 && j === 2
    x.fillStyle = me && meK > 0.5 ? GOLD : cols[(i + j) % 3]
    x.fillRect(-136 + i * 68, -92 + j * 58, 60, 50)
  }
  if (meK > 0.5) text(x, word, 0, -92 + 2 * 58 + 25, 26, INK, MONO, 700)
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Says “brb.” | *Goes for a run.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.4, 0.8, 1.2, 1.6],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, SHOE, { R: RED, W: BONE }, 730, 1000 - Math.abs(Math.sin(t * 8)) * 24, 16 * k)
      drawBits(x, SHOE, { R: RED, W: BONE }, 870, 1000 - Math.abs(Math.cos(t * 8)) * 24, 16 * k)
      bubble(x, 790, 700, 'brb!!', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 48, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Asks for space. | *And a snack.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, SNACK, { C: '#e3b15a', k: BROWN, W: BONE }, 790, 900, 22 * pop01(t, P.t0 + 0.9, 0.3, 2))
      label(x, 790, 680, 'SPACE + SNACK', pop01(t, P.t0 + 0.3, 0.3, 2.2), { size: 34, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Needs space | *from their own thoughts.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      const quiet = lt > 1.4
      bubble(x, 800, 680, quiet ? '…' : 'what if', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 36, tail: 'bl' })
      bubble(x, 780, 850, quiet ? '…' : 'but also', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 36, col: LAV, tail: 'bl' })
      bubble(x, 800, 1020, quiet ? 'ahh. quiet.' : 'and then', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'Asks for space. | *Checks on you twice.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const n = lt > 1.3 ? 2 : 1
      phone(x, 790, 860, pop01(t, P.t0 + 0.15, 0.3, 2), () => {
        for (let i = 0; i < n; i++) { x.fillStyle = SKYB; x.fillRect(-90, -110 + i * 90, 180, 66); text(x, 'u ok? <3', 0, -77 + i * 90, 30, INK, MONO, 700) }
      })
    } },
  { sign: 'leo', cap: 'Profile status: | *“recharging.”*', mood: 'sleepy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      profile(x, t, 790, 850, pop01(t, P.t0 + 0.15, 0.3, 2), 'leo', 'RECHARGING')
      sparkles(x, t, 790, 800, P.t0 + 1.2, 6, 150, 0.4)
    } },
  { sign: 'virgo', cap: 'Asks for space | *with a schedule.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      calendar(x, 790, 850, pop01(t, P.t0 + 0.15, 0.3, 2), prog(lt, 0.9, 1.0), 'SPACE')
      label(x, 790, 1090, '2:00–4:00 PM', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 34, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Asks so nicely | *you say yes.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'only if it’s ok!!', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 34, tail: 'bl' })
      const k = pop01(t, P.t0 + 0.9, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'aries', 820, 990, 170 * k, { mood: 'heart', look: [-1, 0], seed: 17, glyph: false })
      label(x, 790, 1150, 'OF COURSE', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Goes quiet. | *Comes back closer.*', mood: lt => lt > 1.3 ? 'heart' : 'sleepy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, MOON, { Y: GOLD }, 790, 800, 24 * pop01(t, P.t0 + 0.15, 0.3, 2), { rot: 0.2 })
      hearts(x, t, 790, 960, P.t0 + 1.4, { n: 5, life: 1.6, spread: 160, cell: 7, seed: 4 })
      label(x, 790, 1080, 'BACK, WARMER', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Needs space. | *As in outer space.*', mood: 'sparkle', look: [1, -1], star: ST, hops: [0.8],
    front(x, t, lt, P) {
      drawBits(x, PLANET, { P: ORANGE, R: LAV }, 790 + Math.sin(t) * 10, 780, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.15 })
      sparkles(x, t, 790, 780, P.t0 + 0.8, 7, 180, 0.2, [GOLD, BONE, SKYB])
      label(x, 790, 1060, 'ORBIT: SOLO', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 36, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Books themself | *a quiet afternoon.*', mood: lt => lt > 1.2 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      calendar(x, 790, 860, pop01(t, P.t0 + 0.15, 0.3, 2), prog(lt, 1.0, 1.1), 'ME')
    } },
  { sign: 'aquarius', cap: 'Needs space. | *Sends a meme instead.*', mood: 'wink', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (card(x, 790, 860, 280, 280, BONE, k, -0.04)) {
        x.fillStyle = '#2a2350'; x.fillRect(-120, -120, 240, 170); text(x, 'me, on my', 0, 80, 26, INK, MONO, 700); text(x, 'own planet', 0, 112, 26, INK, MONO, 700)
        x.restore()
        if (k > 0.5) drawBits(x, PLANET, { P: TEAL, R: GOLD }, 790, 800, 10)
      }
    } },
  { sign: 'pisces', cap: 'Needs a little cry. | *Then a hug.*', mood: lt => lt > 1.4 ? 'heart' : 'sparkle', tears: lt => lt < 1.4 ? 3 : 1, look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 1.0, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 800, 960, 200 * k, { mood: 'heart', look: [-1, 0], seed: 21, glyph: false, hops: [P.t0 + 1.4] })
      drawBits(x, HEART, { H: '#ff4f86', W: '#fff' }, 790, 700, 14 * pop01(t, P.t0 + 1.5, 0.3, 2.4))
    } },
]

const F = makeFilm({
  id: 'r2a0079', key: 'E', accent: TEAL, ending: 'lesson',
  title: 'How each sign | *asks for space.*',
  cameos: CAMEOS,
  group: { cap: 'Different ways. | *Same need.*' },
  lesson: { text: 'Space isn’t distance. | *It’s a breath.*', chip: 'BOND: STRONG' },
  last: {
    text: 'Take your time. | *We’ll be here.*',
    draw(x, t, lt) { hearts(x, t, 540, 1150, t - lt + 0.5, { n: 8, life: 2.2, spread: 500, cell: 7, seed: 6 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
