// r2a0524: star_advice, ADVICE ROLL CALL, "What each sign | *wishes you’d ask.*" (topic: what each sign wishes people asked
// about) (~62 s vertical, signs3kit social cut, music: lofi · E). Twelve signs in zodiac order, one warm question each.
// Ending: lesson.
//   0.0–3.6    "What each sign | *wishes you’d ask.*"
//   3.6–49.2   ♈ their big idea · ♉ their comfort food · ♊ how they really are · ♋ their family · ♌ what made them proud
//              · ♍ if they need help · ♎ what they want · ♏ their moon sign · ♐ the trip · ♑ how they're resting
//              · ♒ their weird hobby · ♓ last night's dream
//  49.2        "Everyone wants | *to be asked.*"
//  52.4        LESSON: "Ask more. | *Then listen.*"  FRIENDSHIP: DEEPER
//  58.3        "Go on. | *Ask them.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ACC = '#8fe3ff', RED = '#e23d4e', CREAM = '#fff4e2', ORANGE = '#ffb34a', BROWN = '#8a4a2e', GREY = '#9aa5c4'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700, color })
const SL = { x: -160 }, SR = { x: 150 }

function txt(x, s, px, py, size, col = INK, align = 'center', font = INTER, w = 800) {
  x.fillStyle = col; x.font = `${w} ${size}px ${font}`; x.textAlign = align; x.textBaseline = 'middle'; x.fillText(s, px, py)
}
function sheet(x, cx, cy, w, h, k, rot, fn, bg = CREAM) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 10, -h / 2 + 12, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 7, -h / 2 - 7, w + 14, h + 14)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  fn(); x.restore()
}
const BULB = ['..YYYY..', '.YYWYYY.', 'YYWYYYYY', 'YYYYYYYY', 'YYYYYYYY', '.YYYYYY.', '..YYYY..', '..GGGG..', '..gggg..', '..GGGG..']
const BOWL = ['..S.S.S...', '...S.S.S..', 'KKKKKKKKKK', 'KOOOOOOOOK', '.KOOOOOOK.', '..KOOOOK..', '...KKKK...']
const MEDAL = ['RR....RR', '.RR..RR.', '..RRRR..', '...YY...', '..YYYY..', '.YYWYYY.', '.YYYYYY.', '..YYYY..']
const BOOK = ['KKKKKKKKKKKK', 'KBBBBBBBBBBK', 'KWWWWWWWWWWK', 'KPPPPPPPPPPK', 'KWWWWWWWWWWK', 'KGGGGGGGGGGK', 'KKKKKKKKKKKK']
const MUSH = ['...RRRRRR...', '..RRWRRRWR..', '.RRRRRRRRRR.', 'RRWRRRRRWRRR', 'RRRRRRRRRRRR', '....CCCC....', '....CCCC....', '...CCCCCC...']
const MOON = ['..YYY...', '.YYY....', 'YYY.....', 'YYY.....', 'YYY.....', '.YYY....', '..YYYYY.', '...YYY..']
const CLOUD = ['...WWW......', '..WWWWW.WW..', '.WWWWWWWWWW.', 'WWWWWWWWWWWW', '.WWWWWWWWWW.']

const CAMEOS = [
  { sign: 'aries', cap: 'Ask Aries about | *their big idea.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', star: SL, hops: [1.1, 1.5],
    front(x, t, lt, P) {
      drawBits(x, BULB, { Y: GOLD, W: '#fff', G: GREY, g: '#6e7896' }, 790, 860, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      sparkles(x, t, 790, 820, P.t0 + 0.6, 7, 160, 0.2)
      bubble(x, 790, 640, 'okay so—', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 40, tail: 'bl' })
      L(x, 790, 1100, 'TALKING: 40 MIN', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, 0.04, 30)
    } },
  { sign: 'taurus', cap: 'Ask Taurus about | *their comfort food.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', star: SL,
    front(x, t, lt, P) {
      drawBits(x, BOWL, { K: INK, O: ORANGE, S: 'rgba(239,230,214,0.7)' }, 790, 900, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 1100, 'oh, sit down.', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 40, tail: 'bl' })
      hearts(x, t, 790, 830, P.t0 + 1.0, { n: 4, life: 1.4, spread: 140, cell: 7, seed: 2 })
      L(x, 790, 640, 'RECIPE: SHARED', pop01(t, P.t0 + 1.5, 0.3, 2.4), '#5fd068', -0.04, 30)
    } },
  { sign: 'gemini', cap: 'Ask Gemini | *how they really are.*', mood: lt => lt > 1.2 ? 'neutral' : 'sparkle', look: [1, 0], star: SL,
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'great! busy!', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, tail: 'bl' })
      bubble(x, 790, 860, 'no, really?', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 40, col: MINT, tail: 'br' })
      bubble(x, 790, 1040, '…okay, so.', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 40, col: LAV, tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'Ask Cancer | *about their family.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', star: SL,
    front(x, t, lt, P) {
      sheet(x, 790, 860, 320, 260, pop01(t, P.t0 + 0.2, 0.3, 2), 0.05, () => {
        x.fillStyle = '#2a2350'; x.fillRect(-140, -110, 280, 170)
        for (let i = 0; i < 3; i++) signChar(x, t, 'cancer', -90 + i * 90, -20, 90 - (i === 1 ? 0 : 20), { mood: 'happy', seed: 30 + i, glyph: false, glow: 0.4 })
        txt(x, 'my people ♥', 0, 96, 28, INK, 'center', "'EB Garamond', Georgia, serif", 500)
      })
      L(x, 790, 1100, 'PHOTOS: 212 (EACH ONE)', pop01(t, P.t0 + 1.3, 0.3, 2.4), PINK, 0.04, 26)
    } },
  { sign: 'leo', cap: 'Ask Leo | *what made them proud.*', mood: 'sparkle', star: SL, hops: [1.0],
    front(x, t, lt, P) {
      drawBits(x, MEDAL, { R: RED, Y: GOLD, W: '#fff' }, 790, 860, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      sparkles(x, t, 790, 880, P.t0 + 0.7, 7, 170, 0.6)
      bubble(x, 790, 1090, 'you want | the full story?', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: 'virgo', cap: 'Ask Virgo | *if they need help.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', look: [1, 0], star: SL,
    front(x, t, lt, P) {
      sheet(x, 790, 850, 290, 330, pop01(t, P.t0 + 0.2, 0.3, 2), -0.04, () => {
        txt(x, 'TO DO', 0, -130, 30, INK, 'center', MONO, 700)
        for (let i = 0; i < 5; i++) { x.fillStyle = '#d9d0bf'; x.fillRect(-110, -80 + i * 50, 220, 20); if (i < 2 && lt > 1.0 + i * 0.3) { x.fillStyle = '#2fc79a'; x.fillRect(-120, -78 + i * 50, 240, 8) } }
      })
      bubble(x, 790, 615, 'wait… you will?', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 38, col: MINT, tail: 'bl' })
      L(x, 790, 1100, 'HELP: ACCEPTED', pop01(t, P.t0 + 1.6, 0.3, 2.4), MINT, 0.04, 30)
    } },
  { sign: 'libra', cap: 'Ask Libra | *what they want.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', star: SL,
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'what do YOU want?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 38, col: BONE, tail: 'br' })
      bubble(x, 790, 880, '…me? oh! um—', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 38, col: PINK, tail: 'bl' })
      L(x, 790, 1080, 'NOBODY ASKS. THANK YOU.', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, -0.03, 26)
    } },
  { sign: 'scorpio', cap: 'Ask Scorpio | *about their moon sign.*', mood: lt => lt > 1.2 ? 'wink' : 'squint', look: [1, -1], star: SL,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, MOON, { Y: GOLD }, 790, 780, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 1000, 'finally. | pull up a chair.', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 34, col: LAV, tail: 'bl' })
      sparkles(x, t, 790, 780, P.t0 + 0.6, 6, 150, 0.3)
    } },
  { sign: 'sagittarius', cap: 'Ask Sagittarius | *about the trip.*', mood: 'sparkle', star: SR, hops: [0.8],
    front(x, t, lt, P) {
      const n = 1 + Math.floor(clamp((lt - 0.4) / 1.6) * 7)
      sheet(x, 330, 840, 300, 240, pop01(t, P.t0 + 0.2, 0.3, 2), -0.05, () => {
        x.fillStyle = [SKYB, '#5fd068', ORANGE, PINK, LAV, GOLD, MINT][n % 7]; x.fillRect(-136, -106, 272, 170)
        x.fillStyle = '#fff'; x.beginPath(); x.arc(70, -60, 24, 0, 7); x.fill()
        x.fillStyle = '#4a4470'; x.beginPath(); x.moveTo(-136, 64); x.lineTo(-40, -30); x.lineTo(40, 30); x.lineTo(90, -10); x.lineTo(136, 64); x.fill()
        txt(x, `photo ${n} of 300`, 0, 92, 24, INK, 'center', MONO, 700)
      })
      L(x, 330, 1060, 'HOURS: CLEARED', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, 0.04, 30)
    } },
  { sign: 'capricorn', cap: 'Ask Capricorn | *how they’re resting.*', mood: lt => lt > 1.3 ? 'happy' : 'wide', look: [-1, 0], star: SR,
    front(x, t, lt, P) {
      bubble(x, 330, 680, 'resting? me?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, tail: 'br' })
      L(x, 330, 880, 'NAP: SCHEDULED ♥', pop01(t, P.t0 + 1.1, 0.3, 2.4), LAV, -0.04, 32)
      L(x, 330, 1020, 'THANKS FOR ASKING', pop01(t, P.t0 + 1.6, 0.3, 2.4), BONE, 0.04, 28)
    } },
  { sign: 'aquarius', cap: 'Ask Aquarius | *about their weird hobby.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', look: [1, 0], star: SL, hops: [1.1],
    front(x, t, lt, P) {
      drawBits(x, MUSH, { R: RED, W: CREAM, C: CREAM }, 790, 880, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 750, 650, 'ok so MUSHROOMS—', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 34, col: MINT, tail: 'bl' })
      L(x, 790, 1090, 'FUN FACTS: ENDLESS', pop01(t, P.t0 + 1.5, 0.3, 2.4), SKYB, 0.04, 30)
    } },
  { sign: 'pisces', cap: 'Ask Pisces | *about last night’s dream.*', mood: lt => lt > 1.0 ? 'heart' : 'sparkle', tears: 2, star: SL,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, CLOUD, { W: '#e9e4ff' }, 790 + 10 * Math.sin(t * 1.5), 800, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 1000, 'there was a | flying whale…', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 34, col: LAV, tail: 'bl' })
      L(x, 790, 650, 'HAPPY TEARS', pop01(t, P.t0 + 1.4, 0.3, 2.4), SKYB, -0.04, 30)
    } },
]

const F = makeFilm({
  id: 'r2a0524', key: 'E', accent: ACC, ending: 'lesson',
  title: 'What each sign | *wishes you’d ask.*',
  cameos: CAMEOS,
  group: { cap: 'Everyone wants | *to be asked.*' },
  lesson: { text: 'Ask more. | *Then listen.*', chip: 'FRIENDSHIP: DEEPER' },
  last: { text: 'Go on. | *Ask them.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
