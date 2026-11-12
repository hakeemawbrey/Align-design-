// r2a0385: star_advice, ADVICE ROLLCALL, "Each sign vs. | a surprise visit." (topic: How each sign handles a surprise visit) (signs3kit social cut, music: lofi · G).
// Ending: lesson. One warm, specific line per sign with a light gag:
//   ♈ door open before you knock · ♉ panics, then the snack board · ♊ turns it into a little party · ♋ kettle on before hello
//   · ♌ the grand tour · ♍ apologises for the mess (one sock) · ♎ makes it lovely in four minutes · ♏ "oh. hi." secretly delighted
//   · ♐ grabs the keys · ♑ checks the calendar, makes room · ♒ shows you the new invention · ♓ happy tears, you came!
//   group "Surprise! | You're welcome."  lesson "Show up for people. | They're glad you did."  last "Next time? | Bring snacks."
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', CREAM = '#fff4e2', ORANGE = '#ffb34a', SLATE = '#9aa5c4', ACC = GOLD
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700 })

const DOOR = ['KKKKKKKK', 'KBBBBBBK', 'KBDDDDBK', 'KBDDDDBK', 'KBBBBBBK', 'KBBBBYBK', 'KBDDDDBK', 'KBDDDDBK', 'KBBBBBBK', 'KKKKKKKK']
const DOOR_C = { K: INK, B: '#8a4a2e', D: '#6b3a22', Y: GOLD }
const BOARD = ['..YY..WW..', '.YYYYWWWW.', 'BBBBBBBBBB', 'BRRBGGBBYB', 'BBBBBBBBBB', '.B......B.']
const BOARD_C = { Y: GOLD, W: CREAM, B: '#c98f5a', R: RED, G: '#5fd068' }
const HAT = ['....Y....', '...PPP...', '..PYPYP..', '.PPPPPPP.', 'PYPYPYPYP']
const KETTLE = ['...KKK....', '..KSSSK...', '.SSSSSSS.K', 'SSSSSSSSSK', 'SSSWSSSSSK', 'SSSSSSSSK.', '.SSSSSSS..']
const SOCK = ['.PP.', '.PP.', '.PP.', '.PPP', 'PPPP', 'PPP.']
const VASE = ['.R.Y.P.', 'RRYYYPP', '.R.Y.P.', '..GGG..', '...G...', '..VVV..', '.VVVVV.', '.VVVVV.', '..VVV..']
const VASE_C = { R: RED, Y: GOLD, P: PINK, G: '#5fd068', V: SKYB }
const KEYS = ['.YYY......', 'Y...Y.....', 'Y...YYYYYY', 'Y...Y..Y.Y', '.YYY......']
const GIZMO = ['....R.....', '....K.....', '.KKKKKKKK.', '.KGGMMGGK.', '.KGYMMYGK.', '.KGGGGGGK.', '.KKKKKKKK.', '..K....K..', '.KK....KK.']
const GIZMO_C = { R: RED, K: INK, G: SLATE, M: MINT, Y: GOLD }

function steam(x, t, cx, cy) {
  x.save(); x.strokeStyle = 'rgba(239,230,214,0.7)'; x.lineWidth = 6; x.lineCap = 'round'
  for (let i = 0; i < 2; i++) { const ph = ((t * 0.8 + i / 2) % 1 + 1) % 1; x.globalAlpha = Math.sin(Math.PI * ph); x.beginPath(); for (let j = 0; j <= 6; j++) { const yy = cy - j * 12 - ph * 40, xx = cx + (i - 0.5) * 40 + Math.sin(j + t * 3) * 10; j ? x.lineTo(xx, yy) : x.moveTo(xx, yy) } x.stroke() }
  x.restore()
}
function confetti(x, t, cx, cy, t0) {
  const lt = t - t0; if (lt <= 0) return
  const COLS = [GOLD, PINK, MINT, SKYB, ORANGE, LAV]
  for (let i = 0; i < 18; i++) {
    const ph = (lt * 0.55 + i * 0.137) % 1, px = cx + Math.sin(i * 2.71) * 300, py = cy - 260 + ph * 520
    x.save(); x.translate(px, py); x.rotate(t * 3 + i); x.globalAlpha = Math.sin(Math.PI * ph); x.fillStyle = COLS[i % 6]; x.fillRect(-9, -5, 18, 10); x.restore()
  }
}

const ST_L = { x: -170 }, ST_R = { x: 160 }
const CAMEOS = [
  { sign: 'aries', cap: 'Door open | *before you knock.*', mood: lt => lt > 0.8 ? 'heart' : 'sparkle', star: ST_L, hops: [0.4, 0.8],
    front(x, t, lt, P) {
      drawBits(x, DOOR, DOOR_C, 800, 870, 34 * pop01(t, P.t0 + 0.15, 0.35, 2), { sx: lt > 0.5 ? 0.35 : 1 })
      bubble(x, 790, 620, 'COME IN!!', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 44, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Panics for a second. | Then *the snack board.*', mood: lt => lt > 1.0 ? 'heart' : 'wide', look: [1, 0], star: ST_L,
    front(x, t, lt, P) {
      drawBits(x, BOARD, BOARD_C, 790, 900, 24 * pop01(t, P.t0 + 0.9, 0.35, 2))
      L(x, 790, 680, lt > 0.9 ? 'SNACKS: READY' : 'OH NO. GUESTS.', pop01(t, P.t0 + 0.2, 0.3, 2), lt > 0.9 ? MINT : SLATE, -0.04, 34)
    } },
  { sign: 'gemini', cap: 'Turns it into | *a little party.*', mood: 'sparkle', look: lt => [Math.floor(lt * 2) % 2 ? 1 : -1, 0], star: ST_L, hops: [1.0, 1.5],
    front(x, t, lt, P, F) {
      drawBits(x, HAT, { Y: GOLD, P: PINK }, F.x, F.top - 40, 14 * pop01(t, P.t0 + 0.3, 0.3, 2.2))
      confetti(x, t, 790, 860, P.t0 + 0.8)
      L(x, 790, 760, 'PARTY OF 2!', pop01(t, P.t0 + 0.9, 0.3, 2.4), MINT, 0.04, 40)
    } },
  { sign: 'cancer', cap: 'Kettle’s on | *before hello.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', look: [1, 0], star: ST_L,
    front(x, t, lt, P) {
      drawBits(x, KETTLE, { K: INK, S: SKYB, W: '#ffffff' }, 790, 880, 22 * pop01(t, P.t0 + 0.2, 0.35, 2))
      if (lt > 0.5) steam(x, t, 900, 780)
      bubble(x, 790, 1090, 'sit, sit!', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 40, col: PINK, tail: 'bl' })
    } },
  { sign: 'leo', cap: 'Gives you | *the grand tour.*', mood: lt => lt > 1.0 ? 'wink' : 'sparkle', star: ST_L, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      const n = 1 + Math.floor(clamp((lt - 0.3) / 1.5) * 13)
      L(x, 790, 700, `TOUR STOP ${n} OF 14`, pop01(t, P.t0 + 0.2, 0.3, 2), GOLD, -0.04, 34)
      bubble(x, 790, 900, 'and THIS is | my favourite mug', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: 'virgo', cap: 'Sorry for the mess! | *There’s no mess.*', mood: lt => lt > 1.3 ? 'happy' : 'wide', look: [1, 0], star: ST_L,
    front(x, t, lt, P) {
      drawBits(x, SOCK, { P: PINK }, 800, 1060, 14 * pop01(t, P.t0 + 0.4, 0.3, 2), { rot: 0.4 })
      L(x, 790, 700, 'MESS: ONE SOCK', pop01(t, P.t0 + 0.8, 0.3, 2.2), BONE, 0.04, 36)
      sparkles(x, t, 790, 860, P.t0 + 1.3, 8, 200, 0.2)
    } },
  { sign: 'libra', cap: 'Makes it lovely. | In *four minutes.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST_L, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, VASE, VASE_C, 790, 880, 22 * pop01(t, P.t0 + 0.3, 0.35, 2))
      L(x, 790, 1110, '0:04:00 FLAT', pop01(t, P.t0 + 1.1, 0.3, 2.4), PINK, -0.04, 36)
      sparkles(x, t, 790, 820, P.t0 + 1.2, 7, 160, 0.5)
    } },
  { sign: 'scorpio', cap: '“Oh. Hi.” | *Secretly delighted.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: ST_L,
    front(x, t, lt, P, F) {
      bubble(x, 790, 660, 'oh. hi.', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 44, col: LAV, tail: 'bl' })
      L(x, 790, 900, 'INSIDE: YAY!!', pop01(t, P.t0 + 1.1, 0.3, 2.4), PINK, 0.04, 40)
      hearts(x, t, F.x + 40, F.top, P.t0 + 1.2, { n: 5, life: 1.6, spread: 140, cell: 7, seed: 8 })
    } },
  { sign: 'sagittarius', cap: 'Grabs the keys. | *“Let’s go somewhere!”*', mood: 'sparkle', star: ST_R, hops: [0.6, 1.2],
    front(x, t, lt, P) {
      drawBits(x, KEYS, { Y: GOLD }, 320, 820, 18 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.2 * Math.sin(t * 6) })
      L(x, 320, 1060, 'DESTINATION: ???', pop01(t, P.t0 + 1.0, 0.3, 2.4), ORANGE, -0.04, 32)
    } },
  { sign: 'capricorn', cap: 'Checks the calendar. | *Makes room anyway.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [-1, 0], star: ST_R,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(320, 830); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-150, -150, 300, 300); x.fillStyle = CREAM; x.fillRect(-142, -142, 284, 284)
        x.fillStyle = SLATE; for (let i = 0; i < 4; i++) x.fillRect(-124, -120 + i * 60, 248, 40)
        x.restore()
      }
      L(x, 320, 950, '+ YOU ♡', pop01(t, P.t0 + 1.1, 0.3, 2.4), MINT, -0.04, 44)
    } },
  { sign: 'aquarius', cap: 'Shows you | *the new invention.*', mood: lt => lt > 1.0 ? 'wide' : 'sparkle', look: [1, 0], star: ST_L, hops: [1.1],
    front(x, t, lt, P) {
      drawBits(x, GIZMO, GIZMO_C, 790, 860, 22 * pop01(t, P.t0 + 0.3, 0.35, 2), { rot: 0.03 * Math.sin(t * 9) })
      bubble(x, 790, 620, 'it waters plants. | sometimes.', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 32, col: '#6fc3ff', tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'Happy tears. | *You came!*', mood: 'heart', tears: lt => lt > 0.6 ? 3 : 2, star: ST_L, hops: [0.8],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'you’re HERE!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, col: SKYB, tail: 'bl' })
      hearts(x, t, 790, 1000, P.t0 + 0.7, { n: 7, life: 1.8, spread: 220, cell: 8, seed: 4 })
    } },
]

const F = makeFilm({
  id: 'r2a0385', key: 'G', accent: ACC,
  title: 'Each sign vs. | *a surprise visit.*',
  cameos: CAMEOS,
  ending: 'lesson',
  group: { cap: 'Surprise! | *You’re welcome.*' },
  lesson: { text: 'Show up for people. | They’re *glad you did.*', chip: 'VISIT: WELCOME' },
  last: { text: 'Next time? | *Bring snacks.*', draw(x, t, lt) { drawBits(x, BOARD, BOARD_C, 540, 760, 22 * pop01(t, t - lt + 0.7, 0.35, 2)) } },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
