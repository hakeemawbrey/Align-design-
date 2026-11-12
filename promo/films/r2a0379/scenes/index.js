// r2a0379: star_advice ADVICE-ROLLCALL, "How each sign | *says goodbye.*" (~57 s vertical, signs3kit social cut, lofi · E)
// Twelve signs in zodiac order, one warm, specific goodbye each, with a light visual gag:
//   ♈ gone in a flash, texts "home safe!" · ♉ a long hug · ♊ says bye, talks another hour · ♋ waves until you turn the
//   corner · ♌ makes it a whole moment · ♍ checks you have your keys · ♎ "let's do this again", means it · ♏ quiet
//   goodbye, remembers every word · ♐ says bye from the departure gate · ♑ a proper thank-you note · ♒ vanishes, sends
//   a song later · ♓ cries at every goodbye, even "see you tomorrow"
//  49.2   "Twelve ways to say | *“see you soon.”*"  group photo
//  52.6   callback: "Gemini is still | *at the door.*"  Gemini in the doorway, one more thing.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, pop01, signChar,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ACC = '#ffc6a8'
const HAND = ['.Y.Y.Y.', '.Y.Y.Y.', 'YYYYYYY', 'YYYYYYY', '.YYYYY.', '..YYY..']
const KEY = ['.GGG.....', 'G...G....', 'G...GGGGG', 'G...G.G.G', '.GGG.....']
const LOCKET = ['..GGG..', '.G...G.', '..GGG..', '.PPPPP.', 'PPPPPPP', '.PPPPP.', '..PPP..', '...P...']
const LOCKET_C = { G: GOLD, P: PINK }
const ENVELOPE = ['WWWWWWWWWWWW', 'WWWWWWWWWWWW', 'WKWWWWWWWWKW', 'WWKKWWWWKKWW', 'WWWWKRRKWWWW', 'WWWWWRRWWWWW', 'WWWWWWWWWWWW']
const ENVELOPE_C = { W: '#fff4e2', K: '#c9b8a0', R: '#e23d4e' }
const PLANE = ['....W.......', '....WW......', 'WWWWWWWWWWW.', '.WBWBWBWWWWW', 'WWWWWWWWWWW.', '....WW......', '....W.......']
const PLANE_C = { W: '#fff4e2', B: SKYB }
// a doorway (warm light inside)
function doorway(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-150, -260, 300, 520)
  x.fillStyle = '#a8743f'; x.fillRect(-140, -250, 280, 510)
  x.fillStyle = '#ffe7a8'; x.fillRect(-116, -226, 232, 486)
  x.restore()
}

const ST = { x: -170 }
const CAMEOS = [
  { sign: 'aries', cap: 'Gone in a flash. | Texts *“home safe!”*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.4],
    front(x, t, lt, P) {
      label(x, 790, 760, 'ZOOM', pop01(t, P.t0 + 0.2, 0.3, 2) * (1 - prog(lt, 0.9, 1.1)), { size: 56, bg: '#ff6b5a', color: '#fff4e2', rot: -0.06 })
      bubble(x, 790, 940, 'home safe!', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 48, col: BONE, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Goodbye hug. | *A long one.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 560, 900, 220 * k, { mood: 'heart', look: [-1, 0], seed: 22, glyph: false, squash: 0.06 })
      const s = Math.floor(clamp((lt - 0.4) / 1.6) * 45)
      label(x, 800, 680, `HUG: 0:${String(s).padStart(2, '0')}`, pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 42, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      hearts(x, t, 470, 760, P.t0 + 0.9, { n: 5, life: 1.8, spread: 200, cell: 7, seed: 4 })
    } },
  { sign: 'gemini', cap: 'Says bye. | *Talks another hour.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'happy', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      label(x, 790, 680, 'BYE! (1 HOUR AGO)', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 34, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 920, 'oh, ONE more | thing—', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 42, col: '#ffe36a', tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'Waves until | *you turn the corner.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P, F) {
      drawBits(x, HAND, { Y: '#8fe3ff' }, F.x + 170, F.cy - 110, 16 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: Math.sin(t * 9) * 0.35 })
      label(x, 800, 1060, 'STILL WAVING', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 36, bg: SKYB, rot: 0.04 })
    } },
  { sign: 'leo', cap: 'Makes the goodbye | *a whole moment.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.1],
    back(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.2, 0.4, 1.6)
      x.save(); x.globalAlpha = 0.28 * clamp(k); x.fillStyle = '#fff1b0'
      x.beginPath(); x.moveTo(F.x - 30, 470); x.lineTo(F.x + 30, 470); x.lineTo(F.x + 210, 1150); x.lineTo(F.x - 210, 1150); x.fill(); x.restore()
    },
    front(x, t, lt, P) {
      label(x, 800, 800, 'THE FAREWELL TOUR', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 32, bg: GOLD, rot: -0.04 })
      bubble(x, 800, 1000, 'thank you, | goodnight!', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'virgo', cap: 'Checks you have | *your keys.* Twice.', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, KEY, { G: GOLD }, 790, 840, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.2 })
      label(x, 790, 1040, lt > 1.4 ? 'KEYS ✓✓' : 'KEYS ✓', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 44, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: '“Let’s do this again.” | *Means it.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      label(x, 790, 780, 'NEXT TIME:', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 36, bg: BONE, rot: -0.03, font: MONO, weight: 700 })
      label(x, 790, 900, 'ALREADY PLANNED', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 40, bg: PINK, rot: 0.04 })
      sparkles(x, t, 790, 880, P.t0 + 1.1, 7, 180, 0.2)
    } },
  { sign: 'scorpio', cap: 'Quiet goodbye. | *Remembers every word.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, LOCKET, LOCKET_C, 790, 860, 22 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: Math.sin(t * 2) * 0.1 })
      label(x, 790, 1080, 'KEPT. FOREVER.', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 34, bg: LAV, rot: -0.04 })
    } },
  { sign: 'sagittarius', cap: 'Says bye | *from the departure gate.*', mood: 'sparkle', look: [1, -1], star: ST, hops: [1.0],
    front(x, t, lt, P) {
      const fly = ease.inCubic(prog(lt, 1.1, 2.4))
      drawBits(x, PLANE, PLANE_C, 800 + fly * 300, 780 - fly * 200, 18 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.25 * fly })
      label(x, 790, 1040, 'GATE 12: BYE!!', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 38, bg: '#c97bff', color: '#fff4e2', rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Sends a proper | *thank-you note.*', mood: lt => lt > 1.2 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, ENVELOPE, ENVELOPE_C, 790, 860, 24 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.05 })
      label(x, 790, 1070, 'HANDWRITTEN', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 36, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Vanishes. | *Sends a song later.*', mood: lt => lt > 1.2 ? 'wink' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      notes(x, t, 790, 1000, { n: 5, cell: 9, col: SKYB, seed: 2 })
      bubble(x, 790, 760, 'this made me | think of you', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 38, col: SKYB, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'Cries at goodbyes. | *Even “see you tomorrow.”*', mood: 'heart', tears: 3, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 780, 'see you | tomorrow!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, col: BONE, tail: 'br' })
      label(x, 790, 1040, 'TOO LONG!!', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 44, bg: PINK, rot: 0.04 })
    } },
]

const F = makeFilm({
  id: 'r2a0379', key: 'E', accent: ACC, ending: 'callback',
  title: 'How each sign | *says goodbye.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve ways to say | *“see you soon.”*' },
  last: {
    text: 'Gemini is still | *at the door.*',
    draw(x, t, lt) {
      doorway(x, 620, 1180, pop01(lt, 0.3, 0.4, 2))
      const k = pop01(lt, 0.5, 0.4, 2)
      if (k > 0.01) signChar(x, t, 'gemini', 620, 1260, 300 * k, { mood: Math.floor(lt * 3) % 2 ? 'wink' : 'happy', seed: 85, glyph: false })
      bubble(x, 380, 900, 'okay, REALLY | going now—', pop01(lt, 1.3, 0.25, 2.2), { size: 42, col: '#ffe36a', tail: 'br' })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
