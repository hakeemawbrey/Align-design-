// r2t0105: THE SIGNS AS… v3, ROLLCALL, "The signs | at the zoo." (~57 s vertical, signs3kit social cut, music: lofi · F)
// The format look lives in ../../signs3kit.js. Ending: callback.
//   0.0–3.6    "The signs | *at the zoo.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   one zoo moment per sign (3.8 s each), pushed to the extreme:
//              ♈ raced the cheetah, lost, demanded a rematch · ♉ came for the animals, stayed for the snacks
//              · ♊ the parrot asked their sign · ♋ tried to adopt the baby turtle · ♌ stared down the lion, the lion blinked first
//              · ♍ read every sign, corrected two · ♎ made the flamingo their profile pic · ♏ only visited the snake house
//              · ♐ tried to ride the giraffe · ♑ asked about the zoo's budget · ♒ started a petition for the ducks
//              · ♓ cried at the otters holding hands
//  49.2        "The zoo staff? | *Exhausted.*"  The twelve fly up into a group photo.
//  52.6        CALLBACK: "Aries' rematch? | *The cheetah declined.*"  Aries at the finish line, alone.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', GREEN = '#5fd068'

// ── props
const CHEETAH = ['.........YY.', '........YYYY', 'Y......YYKYY', '.Y.....YYYYK', '..YYYYYYYYY.', '..YKYYKYYKY.', '..YYYYYYYY..', '..YY.YY.YY..', '..Y..Y..Y...']
const CHEETAH_C = { Y: '#f2b84a', K: INK }
const PARROT = ['..RRR..', '.RRRRY.', '.RKRRYY', '.RRRR..', 'RRRRR..', 'RGGRR..', 'RGGGR..', '.GGBB..', '..BBB..', '..B.B..']
const PARROT_C = { R: RED, Y: GOLD, K: INK, G: GREEN, B: '#3d8fd8' }
const TURTLE = ['....GGG.....', '...GGGGG....', '..GDGDGDG...', '.GGGGGGGGG..', 'GDGDGDGDGDGL', '.LL.....LLLL', '.LL.....LKL.', '..........L.']
const TURTLE_C = { G: '#2fa060', D: '#1f7a48', L: '#8ad070', K: INK }
const LION = ['..MMMMMMM..', '.MMMMMMMMM.', 'MMMYYYYYMMM', 'MMYKYYYKYMM', 'MMYYYYYYYMM', 'MMYYYNNYYMM', 'MMMYYYYYMMM', '.MMMYYYMMM.', '..MMMMMMM..']
const LION_C = { M: '#c8643a', Y: '#f2b84a', K: INK, N: '#6b3a22' }
const SNAKE = ['......GGG.', '.....GKGGR', '.....GGGG.', '....GG....', '...GG.....', '..GG......', '.GGGGGGG..', '........GG', '.GGGGGGGG.']
const SNAKE_C = { G: '#5fd068', K: INK, R: RED }
const DUCK = ['..YYY...', '.YYKYOO.', '.YYYY...', 'YYYYYYY.', 'YYYYYYYY', '.YYYYYY.']
const DUCK_C = { Y: GOLD, K: INK, O: '#ff9a4a' }
const OTTER = ['.BBB.', 'BKBKB', 'BBNBB', '.BBB.', 'BBBBB', 'BBBBB', 'BBBBB', '.B.B.']
const OTTER_C = { B: '#b06a4a', K: INK, N: INK }
const CONE = ['.PPPP.', 'PPWPPP', 'PPPPPP', '.MMMM.', 'CCCCCC', '.CCCC.', '.CCCC.', '..CC..', '..CC..', '...C..']
const CONE_C = { P: PINK, W: '#fff', M: '#8a4a2e', C: '#e8a24a' }
const FLAMINGO = ['..PP...', '.PPKY..', '..PP.Y.', '..P....', '..P....', '.PPPP..', 'PPPPPP.', '.PPPP..', '...P...', '...P...', '..PP...']
const FLAMINGO_C = { P: '#ff8fb1', K: INK, Y: '#ffd23a' }
function phone(x, cx, cy, k, fn) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-118, -178, 252, 372)
  x.fillStyle = INK; x.fillRect(-130, -190, 260, 380); x.fillStyle = '#2a2350'; x.fillRect(-120, -180, 240, 360)
  x.fillStyle = '#140c30'; x.fillRect(-108, -158, 216, 316)
  fn(x); x.restore()
}
function signBoard(x, cx, cy, k, lines, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-12, 120, 24, 160); x.fillStyle = '#8a4a2e'; x.fillRect(-6, 120, 12, 156)
  x.fillStyle = INK; x.fillRect(-190, -140, 380, 270); x.fillStyle = '#2f9e5b'; x.fillRect(-180, -130, 360, 250)
  x.fillStyle = BONE; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('THE OTTER', 0, -90)
  x.font = `700 22px ${MONO}`; lines.forEach((l, i) => x.fillText(l, 0, -30 + i * 44))
  x.strokeStyle = RED; x.lineWidth = 7; x.lineCap = 'round'
  if (lt > 0.9) { x.beginPath(); x.moveTo(-120, -30); x.lineTo(lerp(-120, 120, clamp((lt - 0.9) / 0.3)), -30); x.stroke() }
  if (lt > 1.3) { x.beginPath(); x.moveTo(-100, 102); x.lineTo(lerp(-100, 100, clamp((lt - 1.3) / 0.3)), 102); x.stroke() }
  x.restore()
}
function giraffe(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-36, -360, 72, 480); x.fillRect(-80, -420, 120, 80)
  x.fillStyle = '#f2b84a'; x.fillRect(-28, -352, 56, 464); x.fillRect(-72, -412, 104, 64)
  x.fillStyle = '#b06a4a'; for (let i = 0; i < 7; i++) x.fillRect(-20 + (i % 2) * 18, -330 + i * 62, 22, 26)
  x.fillStyle = INK; x.fillRect(-40, -396, 12, 12); x.fillRect(-10, -450, 10, 34); x.fillRect(16, -450, 10, 34)
  x.restore()
}
function clipboard(x, cx, cy, k, fn, rot = 0.04) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-170, -200, 340, 400); x.fillStyle = '#c98f2a'; x.fillRect(-160, -190, 320, 380)
  x.fillStyle = '#fff4e2'; x.fillRect(-140, -150, 280, 320)
  x.fillStyle = INK; x.fillRect(-50, -210, 100, 40)
  x.textAlign = 'center'; x.textBaseline = 'middle'
  fn(x); x.restore()
}
function ribbon(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-174, -154, 24, 308); x.fillRect(150, -154, 24, 308); x.fillStyle = BONE; x.fillRect(-168, -150, 12, 300); x.fillRect(156, -150, 12, 300)
  x.fillStyle = '#ffffff'; for (let i = 0; i < 8; i++) { x.fillStyle = i % 2 ? INK : BONE; x.fillRect(-154 + i * 38.5, -150, 38.5, 36) }
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Raced the cheetah. Lost. | *Demanded a rematch.*', mood: lt => lt > 1.2 ? 'squint' : 'sparkle', look: [1, 0], star: { x: -200 }, hops: [0.3, 0.6, 0.9],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const run = ease.inOutCubic(prog(lt, 0.2, 0.9))
      drawBits(x, CHEETAH, CHEETAH_C, lerp(560, 840, run), 1020, 22 * pop01(t, P.t0 + 0.1, 0.3, 2))
      label(x, 800, 820, 'CHEETAH: WINS', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 30, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 740, 640, 'AGAIN!', pop01(t, P.t0 + 1.4, 0.25, 2.4), { size: 50, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Came for the animals. | *Stayed for snacks.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, CONE, CONE_C, 790, 880, 30 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: 0.08 })
      label(x, 790, 640, 'ANIMALS SEEN: 0', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'The parrot asked | *their sign.*', mood: lt => lt > 1.1 ? 'sparkle' : 'wide', look: [1, 0], star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, PARROT, PARROT_C, 820, 960, 26 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: Math.sin(t * 5) * 0.06 })
      bubble(x, 800, 680, 'what’s your sign?', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 36, col: MINT, tail: 'br' })
      label(x, 600, 1120, 'BEST FRIENDS NOW', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 28, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Tried to adopt | *the baby turtle.*', mood: lt => lt > 0.8 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, TURTLE, TURTLE_C, 800, 980, 22 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 760, 'NAMED IT ALREADY', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 30, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
      if (lt > 0.8) hearts(x, t, 800, 900, P.t0 + 0.8 * 1.29, { n: 5, life: 1.8, spread: 160, cell: 7, seed: 4 })
    } },
  { sign: 'leo', cap: 'Stared down the lion. | *The lion blinked.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -170 }, hops: [1.4],
    front(x, t, lt, P) {
      const blink = lt > 1.1 && lt < 1.3
      drawBits(x, blink ? LION.map(r => r.replace(/K/g, 'N')) : LION, LION_C, 800, 900, 26 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 1120, 'WINNER: LEO', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: '#ffb34a', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Read every sign. | *Corrected two.*', mood: lt => lt > 1.6 ? 'happy' : 'squint', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      signBoard(x, 735, 860, 1.15 * pop01(t, P.t0 + 0.2, 0.35, 2), ['eats fihs', 'sleeps a lot', 'holds hands', 'very cutte'], lt)
    } },
  { sign: 'libra', cap: 'Made the flamingo | *their profile pic.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      phone(x, 790, 880, pop01(t, P.t0 + 0.2, 0.3, 2), x => {
        x.fillStyle = '#3d3470'; x.fillRect(-90, -140, 180, 200)
        drawBits(x, FLAMINGO, FLAMINGO_C, 0, -40, 14)
        if (lt > 1.0) { x.fillStyle = PINK; x.fillRect(-96, 80, 192, 50); x.fillStyle = INK; x.font = `700 20px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('✦ 3 NEW MATCHES', 0, 105) }
      })
      label(x, 790, 640, 'NEW PROFILE PIC', pop01(t, P.t0 + 0.6, 0.3, 2.4), { size: 30, bg: '#ff8fb1', rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Only visited | *the snake house.*', mood: lt => lt > 1.1 ? 'wink' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, SNAKE, SNAKE_C, 800, 900, 26 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: Math.sin(t * 3) * 0.05 })
      bubble(x, 800, 660, 'my people', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 40, col: LAV, tail: 'bl' })
      label(x, 790, 1130, 'VISIT 6 OF 6', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Tried to ride | *the giraffe.*', mood: 'sparkle', star: { x: 150, y: -40, s: 250 }, hops: [0.5, 1.0, 1.5],
    back(x, t, lt, P) { giraffe(x, t, 330, 1060, 1.1 * pop01(t, P.t0 + 0.2, 0.35, 2)) },
    front(x, t, lt, P) {
      label(x, 750, 1130, 'GIRAFFE: NO', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Asked about | *the zoo’s budget.*', mood: lt => lt < 1.0 ? 'neutral' : 'squint', look: [-1, 0], star: { x: 150 },
    front(x, t, lt, P) {
      clipboard(x, 330, 860, pop01(t, P.t0 + 0.2, 0.35, 2), x => {
        x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.fillText('QUESTIONS', 0, -110)
        x.font = `700 22px ${MONO}`; ;['1. penguin ROI?', '2. lion overtime?', '3. otter salary?'].forEach((l, i) => { if (lt > 0.4 + i * 0.35) x.fillText(l, 0, -40 + i * 60) })
      })
      label(x, 330, 1110, 'TOUR GUIDE: TIRED', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 28, bg: '#2fc79a', rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Started a petition. | *For the ducks.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -170 }, hops: [1.4],
    front(x, t, lt, P) {
      clipboard(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), x => {
        x.fillStyle = INK; x.font = `800 32px ${INTER}`; x.fillText('FREE THE', 0, -110); x.fillText('DUCKS', 0, -68)
        drawBits(x, DUCK, DUCK_C, 0, 40, 16)
      })
      label(x, 790, 1130, '(THEY’RE WILD)', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Cried at the otters. | *They held hands.*', mood: 'wide', tears: lt => lt < 0.9 ? 2 : 3, star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      drawBits(x, OTTER, OTTER_C, 730, 960, 26 * k); drawBits(x, OTTER, OTTER_C, 870, 960, 26 * k)
      if (k > 0.5) { x.fillStyle = INK; x.fillRect(780, 990, 40, 18); x.fillStyle = '#b06a4a'; x.fillRect(784, 994, 32, 10) }
      hearts(x, t, 800, 820, P.t0 + 0.9, { n: 5, life: 1.8, spread: 160, cell: 7, seed: 5 })
    } },
]

const F = makeFilm({
  id: 'r2t0105', key: 'F', accent: GREEN, ending: 'callback',
  title: 'The signs | *at the zoo.*',
  cameos: CAMEOS,
  group: { cap: 'The zoo staff? | *Exhausted.*' },
  last: {
    text: 'Aries’ rematch? | *The cheetah declined.*',
    draw(x, t, lt) {
      ribbon(x, 700, 1100, pop01(t, t - lt + 0.3, 0.45, 1.8))
      const k = pop01(t, t - lt + 0.5, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'aries', 380, 1120, 260 * k, { mood: lt > 1.4 ? 'squint' : 'sparkle', look: [1, 0], seed: 40, hops: [t - lt + 0.8, t - lt + 1.1] })
      drawBits(x, CHEETAH.map(r => r.replace(/K/g, 'Y')), CHEETAH_C, 760, 1200, 18 * pop01(t, t - lt + 0.9, 0.35, 2))
      label(x, 700, 1330, 'CHEETAH: NAPPING', pop01(t, t - lt + 1.3, 0.3, 2.4), { size: 34, bg: '#f2b84a', rot: -0.04, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
