// r2a0344: star_advice, ADVICE ROLLCALL, "How each sign | treats themselves." (~56 s vertical, signs3kit social cut, music: lofi · E)
// Twelve signs in zodiac order, one warm, specific way each one treats themselves, each with one light visual gag.
//   0.0–3.6    "How each sign | *treats themselves.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   one card per sign (3.8 s each):
//              ♈ a sunrise run, personal best: happy · ♉ fresh sheets, a nap with the alarm off · ♊ a new notebook for the new idea
//              · ♋ a blanket fort, NO ADULTS · ♌ flowers, from: me · ♍ a label maker, labelled the label maker
//              · ♎ moved the furniture just for the vibes · ♏ a day off, location: secret · ♐ the long way home, on purpose
//              · ♑ finally bought the nice pen · ♒ a night alone with the stars · ♓ a sad movie on purpose, bliss
//  49.2        "Twelve signs. | *Twelve kinds of rest.*"  The twelve fly up into a group photo.
//  52.6        callback: "Virgo labelled | *this moment too.*" (the label maker, paid off).
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, notes, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', WOOD = '#8a4a2e', PAPER = '#fff4e2'

// ── props
const SUN = [
  '....Y....',
  '.Y..Y..Y.',
  '..OOOOO..',
  'YOOOOOOOY',
  '.OOOOOOO.',
  'GGGGGGGGG',
]
const SUN_C = { Y: GOLD, O: '#ffb34a', G: '#5fd068' }
const CLOCK = [
  '.B.....B.',
  'BBBBBBBBB',
  'BWWWKWWWB',
  'BWWWKWWWB',
  'BWWWKKKWB',
  'BWWWWWWWB',
  'BBBBBBBBB',
  '.K.....K.',
]
const CLOCK_C = { B: '#e23d4e', W: PAPER, K: INK }
const PILLOW = ['.WWWWWWWWWW.', 'WWWWWWWWWWWW', 'WWWWWWWWWWWW', '.WWWWWWWWWW.']
const PILLOW_C = { W: '#e0f4ff' }
const FORT = [
  '.......F.......',
  '.......FRR.....',
  '.......FRRR....',
  '.......F.......',
  '......BBB......',
  '....BBBBBBB....',
  '..BBBPBBBPBBB..',
  '.BBBBBBBBBBBBB.',
  'BBBBBBDDDBBBBBB',
  'BBBBBDDDDDBBBBB',
  'BBBBBDDDDDBBBBB',
]
const FORT_C = { F: WOOD, R: GOLD, B: '#6fc3ff', P: '#c9e9ff', D: '#140c30' }
const FLOWERS = [
  '.P..R..Y.',
  'PPPRRRYYY',
  '.P..R..Y.',
  '..G.G.G..',
  '...GGG...',
  '..WWWWW..',
  '..WWWWW..',
  '...WWW...',
]
const FLOWERS_C = { P: PINK, R: RED, Y: GOLD, G: '#5fd068', W: '#c9c2e6' }
const MAKER = [
  'KKKKKKKKKK',
  'KYYYYYYYYK',
  'KYSSSSSSYK',
  'KYSSSSSSYK',
  'KYYYYYYYYK',
  'KYWYWYWYYK',
  'KYYWYWYWYK',
  'KYWYWYWYYK',
  'KYYYYYYYYK',
  'KKKKKKKKKK',
]
const MAKER_C = { K: INK, Y: '#7dffb0', S: '#2a2350', W: PAPER }
const LAMP = [
  '.YYYYY.',
  'YYYYYYY',
  '...K...',
  '...K...',
  '...K...',
  '..KKK..',
]
const LAMP_C = { Y: GOLD, K: '#9aa5c4' }
const PLANT = ['..L.L..', '.LLLLL.', 'LL.L.LL', '...L...', '.TTTTT.', '..TTT..']
const PLANT_C = { L: '#5fd068', T: '#c9744a' }
const PEN = [
  '..........GK',
  '.........GGK',
  '........BBK.',
  '.......BBB..',
  '......BBB...',
  '.....BBB....',
  '....BBB.....',
  '...BBB......',
  '..WBB.......',
  '.KW.........',
  'K...........',
]
const PEN_C = { G: GOLD, K: INK, B: '#2a2350', W: '#c9c2e6' }
const SCOPE = [
  '..........KK',
  '........BBBK',
  '......BBBBB.',
  '....BBBBB...',
  '..BBBBB.....',
  '.BBB........',
  '....K.......',
  '...K.K......',
  '..K...K.....',
  '.K.....K....',
]
const SCOPE_C = { K: '#9aa5c4', B: '#6fc3ff' }
const TV = [
  '..K.....K..',
  '...K...K...',
  'WWWWWWWWWWW',
  'WSSSSSSSSSW',
  'WSSSHHSSSSW',
  'WSSSHHHSSSW',
  'WSSSHHSSSSW',
  'WSSSSSSSSSW',
  'WWWWWWWWWWW',
  '..W.....W..',
]
const TV_C = { K: '#9aa5c4', W: '#4a4470', S: '#6fc3ff', H: PINK }

/** a card with ink border and drop shadow; fn draws inside (origin at the card's centre) */
function card(x, cx, cy, w, h, k, rot, bg, fn) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 5, -h / 2 - 5, w + 10, h + 10)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  fn(); x.restore()
}
const txt = (x, s, X, Y, size, col = INK, font = INTER, w = 800, align = 'center') => { x.fillStyle = col; x.font = `${w} ${size}px ${font}`; x.textAlign = align; x.textBaseline = 'middle'; x.fillText(s, X, Y) }
/** a strip of label tape */
const tape = (x, cx, cy, s, k, rot = -0.05) => label(x, cx, cy, s, k, { size: 30, bg: '#7dffb0', rot, font: MONO, weight: 700 })

const CAMEOS = [
  { sign: 'aries', cap: 'A sunrise run. | *Personal best: happy.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', star: { x: -170 }, hops: [0.4, 0.8, 1.2],
    front(x, t, lt, P) {
      drawBits(x, SUN, SUN_C, 800, 1040 - 60 * ease.outCubic(prog(lt, 0.2, 1.2)), 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 720, 'PB: HAPPY', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 46, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Fresh sheets. | *The alarm stays off.*', mood: lt => lt > 1.0 ? 'sleepy' : 'happy', star: { x: -170 },
    back(x, t, lt, P) { drawBits(x, PILLOW, PILLOW_C, 380, 1040, 24 * pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.4, 0.3, 2)
      drawBits(x, CLOCK, CLOCK_C, 800, 900, 22 * k)
      if (lt > 1.0 && k > 0.9) { x.save(); x.strokeStyle = INK; x.lineWidth = 16; x.beginPath(); x.moveTo(690, 790); x.lineTo(910, 1010); x.stroke(); x.strokeStyle = RED; x.lineWidth = 9; x.stroke(); x.restore() }
      label(x, 800, 1130, 'ALARM: OFF ✓', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 34, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'A new notebook. | *For the new idea.*', mood: lt => lt > 1.3 ? 'heart' : 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      card(x, 800, 880, 260, 340, pop01(t, P.t0 + 0.2, 0.3, 2), 0.05, '#ffd23a', () => {
        x.fillStyle = INK; for (let i = 0; i < 6; i++) x.fillRect(-130, -140 + i * 56, 20, 12)
        x.fillStyle = PAPER; x.fillRect(-80, -100, 180, 80)
        txt(x, 'IDEA #1', 10, -60, 30, INK, MONO, 700)
      })
      sparkles(x, t, 800, 880, P.t0 + 1.1, 7, 190, 0.3)
    } },
  { sign: 'cancer', cap: 'A blanket fort. | *No adults allowed.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, FORT, FORT_C, 800, 960, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 800, 1140, 'NO ADULTS', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 38, bg: PINK, rot: -0.05 })
    } },
  { sign: 'leo', cap: 'Flowers for themselves. | *Signed the card.*', mood: lt => lt > 1.2 ? 'wink' : 'sparkle', star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, FLOWERS, FLOWERS_C, 760, 940, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      card(x, 890, 1060, 200, 130, pop01(t, P.t0 + 1.0, 0.3, 2.2), 0.08, PAPER, () => {
        txt(x, 'TO: ME', 0, -26, 30, INK, MONO, 700); txt(x, 'FROM: ME ♥', 0, 24, 26, RED, MONO, 700)
      })
    } },
  { sign: 'virgo', cap: 'A label maker. | *Labelled the label maker.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, MAKER, MAKER_C, 800, 920, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.05 })
      tape(x, 800, 1110, 'LABEL MAKER', pop01(t, P.t0 + 1.1, 0.3, 2.4))
      tape(x, 800, 690, 'ME: RELAXED', pop01(t, P.t0 + 1.6, 0.3, 2.4), 0.05)
    } },
  { sign: 'libra', cap: 'Moved the furniture. | *Just for the vibes.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const p = ease.inOutCubic(prog(lt, 0.4, 1.2))
      drawBits(x, LAMP, LAMP_C, lerp(900, 700, p), 970, 30 * pop01(t, P.t0 + 0.2, 0.3, 2))
      drawBits(x, PLANT, PLANT_C, lerp(700, 900, p), 1000, 28 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 800, 720, 'VIBES: IMMACULATE', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 32, bg: PINK, rot: -0.05 })
    } },
  { sign: 'scorpio', cap: 'A whole day off. | *Location: secret.*', mood: lt => lt > 1.2 ? 'wink' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      card(x, 800, 880, 320, 230, pop01(t, P.t0 + 0.2, 0.3, 2), 0.04, '#2a2350', () => {
        txt(x, 'OUT OF OFFICE', 0, -60, 30, BONE, MONO, 700)
        txt(x, 'back: someday', 0, 0, 28, LAV, MONO, 700)
        txt(x, 'where: ✦✦✦', 0, 54, 28, PINK, MONO, 700)
      })
      bubble(x, 790, 650, 'don’t look | for me ♥', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 36, col: LAV, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Took the long way home. | *On purpose.*', mood: 'sparkle', look: [-1, 0], star: { x: 150 }, hops: [0.6, 1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(330, 860); x.scale(k, k)
        x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 130, 0, Math.PI * 2); x.fill()
        x.fillStyle = GOLD; x.beginPath(); x.arc(0, 0, 120, 0, Math.PI * 2); x.fill()
        x.fillStyle = PAPER; x.beginPath(); x.arc(0, 0, 100, 0, Math.PI * 2); x.fill()
        txt(x, 'N', 0, -72, 28, INK, MONO, 700)
        x.rotate(t * 5)
        x.fillStyle = RED; x.beginPath(); x.moveTo(0, -80); x.lineTo(14, 0); x.lineTo(-14, 0); x.closePath(); x.fill()
        x.fillStyle = '#9aa5c4'; x.beginPath(); x.moveTo(0, 80); x.lineTo(14, 0); x.lineTo(-14, 0); x.closePath(); x.fill()
        x.restore()
      }
      label(x, 330, 1080, 'DETOUR: +2 HRS ♥', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 32, bg: GOLD, rot: -0.05 })
    } },
  { sign: 'capricorn', cap: 'Finally bought | *the nice pen.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [-1, 0], star: { x: 160 },
    front(x, t, lt, P) {
      drawBits(x, PEN, PEN_C, 330, 880, 28 * pop01(t, P.t0 + 0.2, 0.3, 2))
      sparkles(x, t, 330, 880, P.t0 + 0.6, 7, 180, 0.2)
      label(x, 330, 1100, 'WORTH IT', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 40, bg: MINT, rot: 0.05 })
    } },
  { sign: 'aquarius', cap: 'A night alone | *with the stars.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, -1], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, SCOPE, SCOPE_C, 800, 990, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      for (let i = 0; i < 5; i++) { const a = pop01(t, P.t0 + 0.8 + i * 0.15, 0.3, 2); drawBits(x, ['.Y.', 'YYY', '.Y.'], { Y: i % 2 ? BONE : GOLD }, 700 + i * 55, 640 + (i % 2) * 70, 10 * a, { outline: null }) }
      label(x, 800, 1150, 'TONIGHT: ALL MINE', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 30, bg: MINT, rot: -0.04 })
    } },
  { sign: 'pisces', cap: 'A sad movie. | *On purpose.* Bliss.', mood: lt => lt < 0.9 ? 'happy' : 'wide', tears: lt => lt < 0.9 ? 2 : 3, star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, TV, TV_C, 800, 900, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 800, 1130, 'TISSUES: READY', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 34, bg: SKYB, rot: 0.05 })
      hearts(x, t, 800, 800, P.t0 + 1.3, { n: 5, life: 1.8, spread: 200, cell: 7, seed: 6 })
    } },
]

const F = makeFilm({
  id: 'r2a0344', key: 'E', accent: MINT, ending: 'callback',
  title: 'How each sign | *treats themselves.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve signs. | *Twelve kinds of rest.*' },
  last: {
    text: 'Virgo labelled | *this moment too.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.3, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'virgo', 400, 1130, 290 * k, { mood: lt > 1.4 ? 'heart' : 'happy', look: [1, 0], seed: 12, hops: [t - lt + 1.3] })
      drawBits(x, MAKER, MAKER_C, 720, 1150, 18 * pop01(t, t - lt + 0.6, 0.35, 2), { rot: 0.05 })
      tape(x, 640, 920, 'NICE ONE ♥', pop01(t, t - lt + 1.3, 0.3, 2.4), -0.06)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
