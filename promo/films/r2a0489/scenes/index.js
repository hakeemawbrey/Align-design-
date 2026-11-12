// r2a0489: star_advice, ADVICE ROLL CALL, "How to celebrate | *each sign.*" (signs3kit social cut, music: lofi · E).
// Twelve signs in zodiac order, one warm, specific line each with one light gag. Ending: group (confetti for everyone).
//   ♈ a race they get to win · ♉ a long dinner, dessert first · ♊ two parties, same night · ♋ a cozy night with the photo
//   albums · ♌ a crown and a standing ovation · ♍ let them plan it · ♎ flowers, so many · ♏ a chart reading for two
//   · ♐ a surprise trip · ♑ say "proud of you" out loud · ♒ a party at the planetarium · ♓ a handwritten card, tissues
//   included.   group "Everyone deserves | a little confetti."
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ACC = '#ff8fb1', CREAM = '#fff4e2', RED = '#e23d4e', SLATE = '#9aa5c4'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700 })
const CONF = [GOLD, PINK, MINT, SKYB, LAV, '#ff9a4a']
function confetti(x, t, t0, l, tp, w, h, n = 26) {
  const dt = t - t0; if (dt < 0) return
  x.save(); x.beginPath(); x.rect(l, tp, w, h); x.clip()
  for (let i = 0; i < n; i++) {
    const cx = l + ((i * 137) % w) + Math.sin(dt * 3 + i) * 20, cy = tp - 30 + ((dt * (180 + (i % 5) * 40) + i * 41) % (h + 60))
    x.save(); x.translate(cx, cy); x.rotate(dt * 4 + i); x.fillStyle = CONF[i % CONF.length]; x.fillRect(-8, -5, 16, 10); x.restore()
  }
  x.restore()
}

// ── props
const FLAG = [
  'KWKWKW',
  'WKWKWK',
  'KWKWKW',
  'WKWKWK',
  'P.....',
  'P.....',
  'P.....',
  'P.....',
]
const FLAG_C = { K: INK, W: '#fff', P: SLATE }
const CAKE = [
  '......F......',
  '......C......',
  '.WWWWWWWWWWW.',
  '.PPPPPPPPPPP.',
  'WWWWWWWWWWWWW',
  'PPPPPPPPPPPPP',
  'PPPPPPPPPPPPP',
]
const CAKE_C = { F: GOLD, C: SKYB, W: CREAM, P: PINK }
const ALBUM = [
  'BBBBBBBBBBBB',
  'BWWWWBBWWWWB',
  'BWSSWBBWHHWB',
  'BWSSWBBWHHWB',
  'BWWWWBBWWWWB',
  'BBBBBBBBBBBB',
]
const ALBUM_C = { B: '#8a5a2e', W: CREAM, S: SKYB, H: PINK }
const CROWN = [
  'Y..Y..Y..Y',
  'YY.YY.YY.Y',
  'YYYYYYYYYY',
  'YRYYBYYRYY',
  'YYYYYYYYYY',
]
const CROWN_C = { Y: GOLD, R: RED, B: SKYB }
const FLOWERS = [
  '.P..R..P.',
  'PYP.RYRPYP',
  '.P..R..P.',
  '..G.G.G..',
  '...GGG...',
  '...WWW...',
  '...WWW...',
]
const FLOWERS_C = { P: PINK, R: '#c97bff', Y: GOLD, G: '#5fd068', W: '#e0a56a' }
const CASE = [
  '...HHHH...',
  '...H..H...',
  'BBBBBBBBBB',
  'BYBBBBBBYB',
  'BBBBBBBBBB',
  'BBBBBBBBBB',
  'BYBBBBBBYB',
  'BBBBBBBBBB',
]
const CASE_C = { H: INK, B: '#ff9a4a', Y: GOLD }
const PLANET = [
  '....PPPP....',
  '..PPPPPPPP..',
  'RRRRRRRRRRRR',
  '.PPPPPPPPPP.',
  '..PPPPPPPP..',
  '....PPPP....',
]
const PLANET_C = { P: '#c97bff', R: GOLD }
const WHEEL = ['#ff6b5a', '#5fd068', '#ffd23a', '#8fe3ff', '#ffb34a', '#7dffb0', '#ff8fb1', '#c97bff', '#ff9a4a', '#9aa5c4', '#6fc3ff', '#b7a6ff']
function chart(x, cx, cy, r, k, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(t * 0.25)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 8, 0, Math.PI * 2); x.fill()
  for (let i = 0; i < 12; i++) { x.fillStyle = WHEEL[i]; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, r, (i / 12) * Math.PI * 2, ((i + 1) / 12) * Math.PI * 2); x.closePath(); x.fill() }
  x.fillStyle = '#140c30'; x.beginPath(); x.arc(0, 0, r * 0.62, 0, Math.PI * 2); x.fill()
  x.fillStyle = GOLD; for (const a of [0.4, 2.6, 4.5]) x.fillRect(Math.cos(a) * r * 0.4 - 8, Math.sin(a) * r * 0.4 - 8, 16, 16)
  x.restore()
}
// a folded card with handwriting lines
function card(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.05); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-150, -110, 300, 220); x.fillStyle = CREAM; x.fillRect(-144, -104, 288, 208)
  x.fillStyle = '#e8dcc4'; x.fillRect(-2, -104, 4, 208)
  x.strokeStyle = '#6b62a8'; x.lineWidth = 5
  for (let i = 0; i < 4; i++) { x.beginPath(); for (let j = 0; j <= 10; j++) { const px = 20 + j * 11, py = -60 + i * 36 + Math.sin(j * 1.7 + i) * 4; j ? x.lineTo(px, py) : x.moveTo(px, py) } x.stroke() }
  drawBits(x, ['.HH.HH.', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: PINK }, -72, 0, 10)
  x.restore()
}

const ST = { x: -170 }
const CAMEOS = [
  { sign: 'aries', cap: 'Aries: a race | *they get to win.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.6, 1.1],
    front(x, t, lt, P) {
      drawBits(x, FLAG, FLAG_C, 800, 860, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.05 * Math.sin(t * 6) })
      L(x, 790, 1100, 'WINNER: ARIES (AGAIN)', pop01(t, P.t0 + 1.2, 0.3, 2.4), GOLD, -0.04, 28)
      sparkles(x, t, 800, 820, P.t0 + 1.2, 8, 180, 0.3)
    } },
  { sign: 'taurus', cap: 'Taurus: a long dinner. | *Dessert first.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, CAKE, CAKE_C, 790, 920, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 680, 'COURSE 1: CAKE', pop01(t, P.t0 + 1.0, 0.3, 2.4), PINK, 0.04, 34)
    } },
  { sign: 'gemini', cap: 'Gemini: two parties. | *Same night.*', mood: lt => Math.floor(lt * 2.5) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: ST, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      L(x, 790, 760, 'PARTY 1: 8PM', pop01(t, P.t0 + 0.2, 0.3, 2.4), SKYB, -0.04, 36)
      L(x, 790, 920, 'PARTY 2: 8:05PM', pop01(t, P.t0 + 0.8, 0.3, 2.4), GOLD, 0.04, 36)
      bubble(x, 790, 1090, 'see you both!', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'Cancer: a cozy night | *with the photo albums.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, ALBUM, ALBUM_C, 790, 880, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      hearts(x, t, 790, 780, P.t0 + 0.9, { n: 5, life: 1.6, spread: 200, cell: 7, seed: 3 })
      L(x, 790, 1090, 'BLANKET: PROVIDED', pop01(t, P.t0 + 1.3, 0.3, 2.4), LAV, -0.04, 30)
    } },
  { sign: 'leo', cap: 'Leo: a crown | *and a standing ovation.*', mood: 'sparkle', look: [1, 0], star: { x: -170, y: 30 },
    front(x, t, lt, P, F) {
      drawBits(x, CROWN, CROWN_C, F.x, F.top - 18, 16 * pop01(t, P.t0 + 0.4, 0.3, 2.2), { rot: 0.06 })
      L(x, 790, 820, 'CROWD: ON ITS FEET', pop01(t, P.t0 + 1.0, 0.3, 2.4), GOLD, -0.04, 30)
      sparkles(x, t, 370, 760, P.t0 + 0.6, 8, 160, 0.4)
    } },
  { sign: 'virgo', cap: 'Virgo: let them | *plan the whole thing.*', mood: lt => lt > 1.2 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      x.save(); const k = pop01(t, P.t0 + 0.2, 0.3, 2); x.translate(790, 860); x.rotate(0.04); x.scale(k, k)
      x.fillStyle = INK; x.fillRect(-150, -170, 300, 340); x.fillStyle = CREAM; x.fillRect(-144, -164, 288, 328)
      x.fillStyle = '#6b62a8'; x.fillRect(-50, -186, 100, 34)
      x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'
      ;['7:00 arrive', '7:04 smile', '7:06 cake', '7:09 tidy'].forEach((r, i) => { x.globalAlpha = pop01(t, P.t0 + 0.4 + i * 0.25, 0.2, 2) > 0.5 ? 1 : 0; x.fillText(r, -118, -110 + i * 66) })
      x.restore()
      L(x, 790, 1120, 'RUN OF SHOW: PERFECT', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, -0.04, 28)
    } },
  { sign: 'libra', cap: 'Libra: flowers. | *So many flowers.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const n = Math.min(3, 1 + Math.floor(Math.max(0, lt - 0.3) / 0.4))
      for (let i = 0; i < n; i++) drawBits(x, FLOWERS, FLOWERS_C, 690 + i * 110, 920 - (i % 2) * 40, 16 * pop01(t, P.t0 + 0.3 + i * 0.5, 0.25, 2))
      L(x, 790, 680, 'VASES: NOT ENOUGH', pop01(t, P.t0 + 1.4, 0.3, 2.4), PINK, 0.04, 30)
    } },
  { sign: 'scorpio', cap: 'Scorpio: a chart reading | *just for two.*', mood: lt => lt > 1.1 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      chart(x, 790, 840, 140, pop01(t, P.t0 + 0.2, 0.35, 2), t)
      L(x, 790, 1070, 'GUESTS: 2. PERFECT.', pop01(t, P.t0 + 1.1, 0.3, 2.4), LAV, -0.04, 30)
    } },
  { sign: 'sagittarius', cap: 'Sag: a surprise trip. | *Bag already packed.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.0, 1.5],
    front(x, t, lt, P) {
      drawBits(x, CASE, CASE_C, 790, 880, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.05 * Math.sin(t * 5) })
      L(x, 790, 1090, 'DESTINATION: ???', pop01(t, P.t0 + 1.1, 0.3, 2.4), GOLD, -0.04, 32)
    } },
  { sign: 'capricorn', cap: 'Capricorn: say it out loud. | *“Proud of you.”*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 780, 720, 'proud of you.', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 48, col: GOLD, tail: 'bl' })
      L(x, 790, 960, 'WORK: PAUSED (WOW)', pop01(t, P.t0 + 1.2, 0.3, 2.4), SLATE, 0.04, 30)
      hearts(x, t, 380, 760, P.t0 + 1.3, { n: 4, life: 1.5, spread: 160, cell: 7, seed: 6 })
    } },
  { sign: 'aquarius', cap: 'Aquarius: a party | *at the planetarium.*', mood: 'sparkle', look: [1, -1], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      drawBits(x, PLANET, PLANET_C, 800, 820, 24 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: -0.2 + 0.05 * Math.sin(t * 2) })
      sparkles(x, t, 800, 820, P.t0 + 0.8, 10, 210, 0.2, [SKYB, BONE, LAV])
      L(x, 790, 1070, 'THEME: SPACE, OBVIOUSLY', pop01(t, P.t0 + 1.3, 0.3, 2.4), SKYB, -0.04, 26)
    } },
  { sign: 'pisces', cap: 'Pisces: a handwritten card. | *Tissues included.*', mood: lt => lt > 0.9 ? 'heart' : 'wide', tears: lt => lt > 0.9 ? 3 : 1, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 850, pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 1080, 'READ IT 9 TIMES', pop01(t, P.t0 + 1.2, 0.3, 2.4), SKYB, 0.04, 32)
    } },
]

const F = makeFilm({
  id: 'r2a0489', key: 'E', accent: ACC, ending: 'group',
  title: 'How to celebrate | *each sign.*',
  cameos: CAMEOS,
  group: {
    cap: 'Everyone deserves | *a little confetti.*',
    draw(x, t, lt) { confetti(x, t, t - lt + 1.1, 0, 440, 1080, 1100, 44) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
