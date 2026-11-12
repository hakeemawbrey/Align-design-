// r2a0529: star_advice, ADVICE ROLLCALL, "Treat yourself, | *sign by sign.*" (each sign's treat-yourself rule; ~59 s
// vertical, signs3kit social cut, music: lofi · E). Twelve signs in zodiac order, one warm, specific treat each with a
// light visual gag. Ending: group (the group beat is the punchline).
//   3.6–49.2   ♈ a mid-day nap · ♉ the good cheese, not just for guests · ♊ a new book, finishing optional
//              · ♋ a night in, someone else cooks · ♌ a new outfit, you're the occasion · ♍ leave one dish
//              · ♎ flowers from yourself · ♏ phone in a drawer · ♐ a day trip, no plan · ♑ log off at five
//              · ♒ a weird museum, solo · ♓ a good cry movie
//  49.2        "Today’s rule: | *be kind to you.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO, GLYPH_FONT,
} from '../../signs3kit.js'

const CREAM = '#fff8ea', RED = '#e23d4e', BROWN = '#8a4a2e', SLATE = '#9aa5c4', GREEN = '#5fd068', ORANGE = '#ffb34a'

const PILLOW = ['.WWWWWWWWWW.', 'WWWWWWWWWWWW', 'WWLLWWWWLLWW', 'WWWWWWWWWWWW', '.WWWWWWWWWW.']
const CHEESE = ['.......YY', '.....YYYY', '...YYOYYY', '.YYYYYYYY', 'YYOYYYYOY', 'YYYYYOYYY', 'YYYYYYYYY']
const BOOK = ['RRRRRRRRRR', 'RWWWWWWWWR', 'RWRRRRRRWR', 'RWWWWWWWWR', 'RWRRRRWWWR', 'RWWWWWWWWR', 'RWWWWWWWWR', 'RRRRRRRRRR']
const BOWL = ['...S..S..S..', '....S..S..S.', 'OOOOOOOOOOOO', 'WOYYGOOYYGOW', '.WWWWWWWWWW.', '..WWWWWWWW..']
const SHIRT = ['.GG....GG.', 'GGGG..GGGG', 'GGGGGGGGGG', '..GGYYGG..', '..GGGGGG..', '..GGYYGG..', '..GGGGGG..', '..GGGGGG..']
const PLATE = ['..WWWWWW..', '.WWWWWWWW.', 'WWWSSSSWWW', '.WWWWWWWW.', '..WWWWWW..']
const BOUQUET = ['.P.R.P.', 'PRPYPRP', '.PRPRP.', '..GGG..', '...G...', '..PPP..', '.PPPPP.', '..PPP..']
const DRAWER = ['KKKKKKKKKKKK', 'KBBBBBBBBBBK', 'KBBBBBBBBBBK', 'KBBBBYYBBBBK', 'KBBBBBBBBBBK', 'KKKKKKKKKKKK']
const SUN = ['...Y...', '.Y.Y.Y.', '..YYY..', 'YYYYYYY', '..YYY..', '.Y.Y.Y.', '...Y...']
const CLOCK5 = 5
const TISSUE = ['...WW...', '..W..W..', 'BBBBBBBB', 'BLLLLLLB', 'BLBBBBLB', 'BBBBBBBB']

function clock(x, cx, cy, k, h, m) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 122, 0, Math.PI * 2); x.fill()
  x.fillStyle = CREAM; x.beginPath(); x.arc(0, 0, 110, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; x.fillRect(Math.cos(a) * 92 - 5, Math.sin(a) * 92 - 5, 10, 10) }
  const ha = (h + m / 60) / 12 * Math.PI * 2 - Math.PI / 2, ma = m / 60 * Math.PI * 2 - Math.PI / 2
  x.strokeStyle = INK; x.lineWidth = 14; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(ha) * 52, Math.sin(ha) * 52); x.stroke()
  x.lineWidth = 9; x.strokeStyle = RED; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(ma) * 82, Math.sin(ma) * 82); x.stroke()
  x.restore()
}

const L = (x, t, P, a, s, y = 1100, bg = GOLD, size = 32) => label(x, 790, y, s, pop01(t, P.t0 + a, 0.3, 2.4), { size, bg, rot: -0.04, font: MONO, weight: 700 })
const CAMEOS = [
  { sign: 'aries', cap: 'A mid-day nap. | *Resting isn’t losing.*', mood: lt => lt > 1.0 ? 'sleepy' : 'squint', star: { x: -160 },
    front(x, t, lt, P) {
      drawBits(x, PILLOW, { W: CREAM, L: '#ff6b5a' }, 790, 880, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 680, 'RACE: PAUSED', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 36, bg: '#ff6b5a', rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'The good cheese. | *Not just for guests.*', mood: 'heart', star: { x: -160 }, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, CHEESE, { Y: GOLD, O: ORANGE }, 790, 860, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, t, P, 1.2, 'GUEST LIST: YOU')
      sparkles(x, t, 790, 850, P.t0 + 1.25, 7, 180, 0.3)
    } },
  { sign: 'gemini', cap: 'A brand new book. | *Finishing it’s optional.*', mood: 'sparkle', look: [1, 0], star: { x: -160 },
    front(x, t, lt, P) {
      drawBits(x, BOOK, { R: GOLD, W: CREAM }, 790, 860, 24 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.06 })
      L(x, t, P, 1.2, 'CHAPTER 1 OF 3 BOOKS', 1100, BONE, 28)
    } },
  { sign: 'cancer', cap: 'A night in. | *Someone else cooks.*', mood: 'heart', look: [1, 0], star: { x: -160 },
    front(x, t, lt, P) {
      drawBits(x, BOWL, { S: 'rgba(239,230,214,0.7)', O: ORANGE, Y: GOLD, G: GREEN, W: CREAM }, 790, 860, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 650, 'sit. relax.', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 42, col: SKYB, tail: 'bl' })
      L(x, t, P, 1.4, 'DISHES: NOT YOURS', 1080, MINT)
    } },
  { sign: 'leo', cap: 'A new outfit. | *You’re the occasion.*', mood: 'sparkle', star: { x: -160 }, hops: [0.8],
    front(x, t, lt, P) {
      drawBits(x, SHIRT, { G: ORANGE, Y: GOLD }, 790, 860, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, t, P, 1.2, 'PROFILE PIC: UPDATED', 1100, GOLD, 28)
      sparkles(x, t, 790, 840, P.t0 + 0.6, 7, 190, 0.2)
    } },
  { sign: 'virgo', cap: 'Leave one dish. | *The sink can wait.*', mood: lt => lt > 1.3 ? 'happy' : 'wide', look: [1, 0], star: { x: -160 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, PLATE, { W: CREAM, S: '#c98f5a' }, 790, 880, 26 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: Math.sin(t * 3) * 0.03 })
      label(x, 790, 680, 'ONE (1) DISH', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 36, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
      L(x, t, P, 1.5, 'BREATHING THROUGH IT', 1100, MINT, 28)
    } },
  { sign: 'libra', cap: 'Flowers for yourself. | *No reason needed.*', mood: 'heart', star: { x: -160 }, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, BOUQUET, { P: PINK, R: RED, Y: GOLD, G: GREEN }, 790, 860, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, t, P, 1.2, 'FROM: ME. TO: ME.', 1100, PINK)
    } },
  { sign: 'scorpio', cap: 'Phone in a drawer. | *A whole day.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: { x: -160 },
    front(x, t, lt, P) {
      drawBits(x, DRAWER, { K: INK, B: BROWN, Y: GOLD }, 790, 880, 26 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: Math.sin(t * 14) * (lt < 1.2 ? 0.02 : 0) })
      label(x, 790, 690, lt < 1.2 ? '*buzz*' : 'MATCHES CAN WAIT', pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 32, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'A day trip. | *No plan at all.*', mood: 'sparkle', star: { x: -160 }, hops: [0.6, 1.2],
    front(x, t, lt, P) {
      drawBits(x, SUN, { Y: GOLD }, 790, 820, 26 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: t * 0.5 })
      L(x, t, P, 1.2, 'DESTINATION: ?', 1080, ORANGE)
    } },
  { sign: 'capricorn', cap: 'Log off at five. | *Exactly five.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: { x: -160 },
    front(x, t, lt, P) {
      clock(x, 790, 850, pop01(t, P.t0 + 0.2, 0.3, 2), CLOCK5, Math.min(0, -2 + lt * 2) + (lt < 1.0 ? 58 + lt * 2 : 0))
      L(x, t, P, 1.3, 'OUT OF OFFICE ✓', 1080, MINT)
    } },
  { sign: 'aquarius', cap: 'A strange museum. | *Solo, happily.*', mood: 'wink', star: { x: -160 }, hops: [1.3],
    front(x, t, lt, P) {
      label(x, 790, 760, 'MUSEUM OF', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 34, bg: BONE, rot: -0.03, font: MONO, weight: 700 })
      label(x, 790, 840, 'SPOONS', pop01(t, P.t0 + 0.4, 0.3, 2), { size: 56, bg: SKYB, rot: 0.04 })
      L(x, t, P, 1.3, 'BEST DAY EVER', 1080, GOLD)
    } },
  { sign: 'pisces', cap: 'A good cry movie. | *Tissues on standby.*', mood: 'heart', tears: lt => lt > 1.0 ? 3 : 1, star: { x: -160 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, TISSUE, { W: CREAM, B: SKYB, L: '#b7a6ff' }, 790, 880, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, t, P, 1.2, 'FEELINGS: FELT', 1080, LAV)
    } },
]

const F = makeFilm({
  id: 'r2a0529', key: 'E', accent: PINK, ending: 'group',
  title: 'Treat yourself, | *sign by sign.*',
  cameos: CAMEOS,
  group: { cap: 'Today’s rule: | *be kind to you.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
