// r2a0044: star_advice, ADVICE ROLLCALL, "Each sign's | season of growth." (~62 s vertical, signs3kit social cut, music: lofi · E)
// Twelve signs in zodiac order, one warm, specific growth line each, with a light visual gag.
//   0.0–3.6    "Each sign’s | *season of growth.*"  The twelve line up, then dive into the pips.
//   3.6–49.2   ♈ finishing what you start (a finish ribbon) · ♉ one new thing (a new dish, one bite) · ♊ one hobby, kept
//              · ♋ letting yourself be cared for (soup delivered) · ♌ clapping for others, sincerely · ♍ good enough
//              (a crooked frame, left alone) · ♎ saying what you want ("pizza.") · ♏ trusting a little sooner (a lock
//              opening) · ♐ growing roots (suitcase: unpacked) · ♑ resting without earning it (out of office)
//              · ♒ letting people close (a hug, accepted) · ♓ crying, then blooming (a flower in the tears)
//  49.2        "Twelve signs. | *All growing.*"
//  52.4        LESSON: "Growth is slow. | *You’re* still growing."  STATUS: BLOOMING
//  58.3        "Even Taurus | *tried a new snack.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const CREAM = '#fff4e2', RED = '#e23d4e', WOOD = '#c98f2a', GREEN = '#5fd068'

const BOWL = ['..s.s.s..', '.s.s.s...', 'WWWWWWWWW', 'WSSSSSSSW', '.WWWWWWW.', '..WWWWW..']
const BOWL_C = { W: CREAM, S: '#ffb34a', s: 'rgba(239,230,214,0.7)' }
const DISH = ['....GG....', '..PPGGYY..', '.PPPPYYYY.', 'WWWWWWWWWW', '.WWWWWWWW.']
const DISH_C = { G: GREEN, P: '#ff8fb1', Y: GOLD, W: CREAM }
const GUITAR = ['.......KK', '......KK.', '.....BB..', '....BB...', '.OOOB....', 'OOOOOO...', 'OOKOOO...', 'OOOOOO...', '.OOOO....']
const GUITAR_C = { K: INK, B: '#8a4a2e', O: '#ffb34a' }
const LOCK = ['..KKKK..', '.K....K.', '.K....K.', 'YYYYYYYY', 'YYYKKYYY', 'YYYKKYYY', 'YYYYYYYY']
const SUIT = ['...KKKK...', '..K....K..', 'RRRRRRRRRR', 'RRRRRRRRRR', 'RYRRRRRRYR', 'RRRRRRRRRR', 'RRRRRRRRRR', '.K......K.']
const SUIT_C = { K: INK, R: '#ff9a4a', Y: GOLD }
const FLOWER = ['..PP.PP..', '.PPPPPPP.', '..PPYPP..', '.PPPPPPP.', '..PP.PP..', '....G....', '..G.G....', '...GG....', '....G....']
const FLOWER_C = { P: '#ff8fb1', Y: GOLD, G: GREEN }
const SNACK = ['..YYYY..', '.YRYYRY.', 'YYYYYYYY', 'YYRYYRYY', '.YYYYYY.']
const SNACK_C = { Y: '#e8a24a', R: '#8a4a2e' }
const LAPTOP = ['.KKKKKKKKKK.', '.KSSSSSSSSK.', '.KSSSSSSSSK.', '.KSSSSSSSSK.', '.KKKKKKKKKK.', 'GGGGGGGGGGGG']
const LAPTOP_C = { K: '#6b62a8', S: '#2a2350', G: '#c4cbe0' }

function frame(x, cx, cy, k, rot) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-120, -100, 240, 200); x.fillStyle = WOOD; x.fillRect(-112, -92, 224, 184)
  x.fillStyle = SKYB; x.fillRect(-92, -72, 184, 144)
  x.fillStyle = GREEN; x.fillRect(-92, 20, 184, 52); x.fillStyle = GOLD; x.fillRect(30, -50, 30, 30)
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Learning to | *finish what you start.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', star: { x: -150 }, hops: [1.3],
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2), br = lt > 1.2
      if (k <= 0.01) return
      x.save(); x.globalAlpha *= k
      x.fillStyle = INK; x.fillRect(616, 700, 20, 480); x.fillRect(916, 700, 20, 480)
      x.fillStyle = CREAM; x.fillRect(620, 704, 12, 472); x.fillRect(920, 704, 12, 472)
      x.fillStyle = RED
      if (!br) x.fillRect(632, 860, 288, 14)
      else { x.save(); x.translate(632, 860); x.rotate(0.9); x.fillRect(0, 0, 120, 14); x.restore(); x.save(); x.translate(920, 860); x.rotate(Math.PI - 0.9); x.fillRect(0, 0, 120, 14); x.restore() }
      x.restore()
    },
    front(x, t, lt, P) {
      label(x, 776, 760, 'FINISH', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 36, bg: GOLD, rot: 0, font: MONO, weight: 700 })
      sparkles(x, t, 776, 860, P.t0 + 1.2 * 1.29, 8, 160, 0.3)
    } },
  { sign: 'taurus', cap: 'Trying one | *new thing.* Just one.', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      drawBits(x, DISH, DISH_C, 790, 960, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 760, 'NEW DISH', pop01(t, P.t0 + 0.6, 0.3, 2), { size: 36, bg: '#5fd068', rot: 0.04 })
      bubble(x, 330, 620, '...oh. | that’s good.', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 34, tail: 'br' })
    } },
  { sign: 'gemini', cap: 'Picking one hobby. | *Keeping it.*', mood: lt => lt > 1.3 ? 'heart' : 'wink', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      drawBits(x, GUITAR, GUITAR_C, 790, 950, 30 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.1 })
      label(x, 790, 720, 'MONTH 3. STILL HERE.', pop01(t, P.t0 + 0.8, 0.3, 2), { size: 28, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 930, P.t0 + 1.4, 6, 140, 0.4)
    } },
  { sign: 'cancer', cap: 'Letting yourself | *be cared for.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', star: { x: -180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'taurus', 820, 980, 180 * k, { mood: 'happy', look: [-1, 0], seed: 41, glyph: false })
      drawBits(x, BOWL, BOWL_C, 680, 1060, 14 * pop01(t, P.t0 + 0.7, 0.3, 2))
      label(x, 790, 720, 'SOUP: DELIVERED', pop01(t, P.t0 + 1.2, 0.3, 2), { size: 30, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 560, 800, P.t0 + 1.5, { n: 4, life: 1.4, spread: 140, cell: 6, seed: 2 })
    } },
  { sign: 'leo', cap: 'Clapping for others. | *Sincerely.*', mood: 'sparkle', look: [1, 0], star: { x: -180 }, hops: [0.8, 1.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'virgo', 800, 960, 200 * k, { mood: lt > 1.0 ? 'heart' : 'happy', look: [-1, 0], seed: 42, glyph: false })
      bubble(x, 330, 620, 'go you!!', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 44, tail: 'br' })
      sparkles(x, t, 800, 900, P.t0 + 1.0, 8, 160, 0.2)
      label(x, 800, 720, 'NOT ABOUT ME', pop01(t, P.t0 + 1.5, 0.3, 2), { size: 30, bg: '#ffb34a', rot: 0.04 })
    } },
  { sign: 'virgo', cap: 'Letting it be | *good enough.*', mood: lt => lt > 1.5 ? 'happy' : 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      frame(x, 790, 850, pop01(t, P.t0 + 0.2, 0.3, 2), 0.09)
      label(x, 790, 1060, 'A BIT CROOKED. FINE.', pop01(t, P.t0 + 1.2, 0.3, 2), { size: 28, bg: MINT, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Saying what | *you actually want.*', mood: lt => lt > 1.3 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -180 }, hops: [1.3],
    front(x, t, lt, P) {
      bubble(x, 790, 760, lt > 1.1 ? 'pizza. | final answer.' : 'whatever | you want...', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 42, tail: 'bl' })
      label(x, 790, 980, 'OPINION: SHARED', pop01(t, P.t0 + 1.5, 0.3, 2), { size: 30, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Trusting someone | *a little sooner.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), open = ease.outBack ? clamp(prog(lt, 1.0, 1.3)) : prog(lt, 1.0, 1.3)
      if (k > 0.01) {
        drawBits(x, LOCK.slice(3), { Y: GOLD, K: INK }, 790, 990, 30 * k)
        drawBits(x, LOCK.slice(0, 3), { K: '#d8d4e8' }, 790 + 50 * open, 880 - 60 * open, 30 * k, { rot: -0.4 * open })
      }
      label(x, 790, 720, 'UNLOCKED: A LITTLE', pop01(t, P.t0 + 1.4, 0.3, 2), { size: 28, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Staying put. | *Growing roots.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      drawBits(x, SUIT, SUIT_C, 790, 990, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 760, 'UNPACKED (!)', pop01(t, P.t0 + 0.9, 0.3, 2), { size: 34, bg: GOLD, rot: -0.04 })
      drawBits(x, FLOWER, FLOWER_C, 900, 870, 13 * pop01(t, P.t0 + 1.5, 0.3, 2))
    } },
  { sign: 'capricorn', cap: 'Resting | *without earning it.*', mood: lt => lt > 1.0 ? 'sleepy' : 'neutral', star: { x: -180 },
    front(x, t, lt, P) {
      drawBits(x, LAPTOP, { ...LAPTOP_C, S: lt > 0.9 ? '#2a2350' : SKYB }, 790, 980, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 760, 'OUT OF OFFICE', pop01(t, P.t0 + 1.0, 0.3, 2), { size: 34, bg: '#2fc79a', rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Letting people | *close.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', star: { x: -110 },
    front(x, t, lt, P) {
      const come = ease.inOutCubic(prog(lt, 0.4, 1.2)), k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'leo', lerp(900, 720, come), 960, 200 * k, { mood: 'heart', look: [-1, 0], seed: 43, glyph: false })
      label(x, 760, 720, 'HUG: ACCEPTED', pop01(t, P.t0 + 1.3, 0.3, 2), { size: 32, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 600, 820, P.t0 + 1.4, { n: 5, life: 1.4, spread: 200, cell: 6, seed: 4 })
    } },
  { sign: 'pisces', cap: 'Cry it out. | Then *bloom.*', mood: lt => lt > 1.4 ? 'sparkle' : 'wide', tears: lt => lt < 1.2 ? 3 : 2, star: { x: -180 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const g = clamp(prog(lt, 0.8, 1.6))
      drawBits(x, FLOWER, FLOWER_C, 790, 1000 - 60 * g, 10 + 12 * g)
      label(x, 790, 740, 'WATERED, HONESTLY', pop01(t, P.t0 + 1.6, 0.3, 2), { size: 28, bg: '#b7a6ff', rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0044', key: 'E', accent: '#7dffb0', ending: 'lesson',
  title: 'Each sign’s | *season of growth.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve signs. | *All growing.*' },
  lesson: { text: 'Growth is slow. | *You’re* still growing.', chip: 'STATUS: BLOOMING' },
  last: {
    text: 'Even Taurus | *tried a new snack.*',
    draw(x, t, lt) { drawBits(x, SNACK, SNACK_C, 540, 1580, 26 * pop01(t, t - lt + 0.7, 0.35, 2)) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
