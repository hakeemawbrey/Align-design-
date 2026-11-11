// v3a007: zodiac.advice444, ADVICE ROLL CALL, "What each sign is | secretly great at." (~57 s vertical, signs3kit social cut, music: lofi · E)
// Twelve signs in zodiac order, one warm, specific hidden talent each with a light visual gag. Ending: callback.
//   0.0–3.6    "What each sign is | *secretly great at.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   one talent per sign (3.8 s each):
//              ♈ starting over, every time (RESTART, attempt #9) · ♉ finding the best bread in town (a medal on the loaf)
//              · ♊ making friends with literally anyone (a pigeon: "what's your sign??" "coo?") · ♋ knowing you're sad
//              before you do (a care package) · ♌ hyping your worst haircut (ICONIC.) · ♍ finding the thing you lost
//              (keys: IT WAS IN YOUR COAT) · ♎ wrapping gifts like a museum (BOW: PERFECT) · ♏ keeping secrets, forever
//              (the vault) · ♐ making a long line a party (beach ball) · ♑ building furniture without the manual
//              · ♒ inventing a gadget for one problem (SOCK FINDER 3000) · ♓ making you feel deeply loved
//              (handmade cards, one for every sign; crying)
//  49.2        "Small talents. | *Big hearts.*"  The twelve fly up into a group photo.
//  52.6        CALLBACK: "The pigeon? | *Best friends now.*"  Gemini and the pigeon, side by side.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', WOOD = '#c98f2a', CORAL = '#ff8a6b'

// ── props
const BREAD = ['...BBBBBB...', '.BBLBBLBBLB.', 'BBBBBBBBBBBB', 'BLBBLBBLBBLB', 'BBBBBBBBBBBB', '.BBBBBBBBBB.']
const BREAD_C = { B: '#d99a4e', L: '#f3d39a' }
const MEDAL = ['R...R', '.R.R.', '..Y..', '.YYY.', 'YYWYY', '.YYY.']
const MEDAL_C = { R: RED, Y: GOLD, W: '#fff' }
const PIGEON = ['....GG....', '...GGWG...', '...GGGGO..', '..PGGGG...', '.GGPPGG...', 'GGGGGGGG..', '.GGGGGGGG.', '..GGGGG...', '...O..O...']
const PIGEON_C = { G: '#9aa0b4', W: '#ffffff', O: '#ff9a3c', P: '#a58fd6' }
const BOX = ['RRRRRRRRRR', 'RRRRYYRRRR', 'BBBBYYBBBB', 'BBBBYYBBBB', 'BBBBYYBBBB', 'BBBBYYBBBB', 'BBBBBBBBBB']
const BOX_C = { R: PINK, B: SKYB, Y: GOLD }
const KEYS = ['.YYY.......', 'Y...Y......', 'Y...YYYYYYY', 'Y...Y...Y.Y', '.YYY.......']
const GIFT = ['...P...P...', '....P.P....', '.....P.....', 'RRRRRPRRRRR', 'RRRRRPRRRRR', 'GGGGGPGGGGG', 'GGGGGPGGGGG', 'GGGGGPGGGGG', 'GGGGGPGGGGG']
const GIFT_C = { P: PINK, R: '#c45d85', G: '#5fd068' }
const BALL = ['..RRWW..', '.RRRWWW.', 'BBBBYYYY', 'BBBBYYYY', '.BBBYYY.', '..BBYY..']
const BALL_C = { R: RED, W: '#fff', B: SKYB, Y: GOLD }
const CHAIR = ['WW......', 'WW......', 'WW......', 'WW......', 'WWWWWWWW', 'WWWWWWWW', 'W......W', 'W......W', 'W......W']
const CARD = ['WWWWWW', 'WWHHWW', 'WHHHHW', 'WWHHWW', 'WWWWWW']
function restart(x, cx, cy, k, pressed) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-140, 40, 280, 70); x.fillStyle = '#3a3157'; x.fillRect(-132, 46, 264, 58)
  const d = pressed ? 16 : 0
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 40 + d, 120, 50, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = RED; x.beginPath(); x.ellipse(0, 30 + d, 110, 42, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = BONE; x.font = `800 34px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('RESTART', 0, 30 + d)
  x.restore()
}
function vault(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  const close = ease.inOutCubic(prog(lt, 0.5, 1.1))
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-170, -170, 340, 340); x.fillStyle = '#6b6290'; x.fillRect(-160, -160, 320, 320)
  x.fillStyle = '#140c30'; x.fillRect(-130, -130, 260 * (1 - close), 260)
  x.fillStyle = '#9aa0b4'; x.fillRect(-130 + 260 * (1 - close), -130, 260 * close, 260)
  if (close > 0.95) {
    x.save(); x.translate(0, 0); x.rotate(t0rot(lt))
    x.strokeStyle = INK; x.lineWidth = 14; x.beginPath(); x.arc(0, 0, 60, 0, Math.PI * 2); x.stroke()
    for (let i = 0; i < 3; i++) { x.rotate(Math.PI * 2 / 3); x.fillStyle = INK; x.fillRect(-6, -110, 12, 54) }
    x.restore()
  }
  x.restore()
}
const t0rot = lt => Math.max(0, lt - 1.1) * 4
function gadget(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-150, -60, 300, 160); x.fillStyle = '#4fd1c5'; x.fillRect(-142, -52, 284, 144)
  x.fillStyle = INK; x.fillRect(-20, -150, 14, 92); x.fillStyle = RED; x.beginPath(); x.arc(-13, -156, 16 + 4 * Math.sin(t * 10), 0, Math.PI * 2); x.fill()
  for (let i = 0; i < 3; i++) { x.fillStyle = [GOLD, MINT, PINK][i]; x.beginPath(); x.arc(-90 + i * 50, 50, 14, 0, Math.PI * 2); x.fill() }
  x.save(); x.translate(150, 20); x.rotate(Math.sin(t * 6) * 0.4); x.fillStyle = INK; x.fillRect(0, -10, 60, 20); x.fillStyle = '#9aa0b4'; x.fillRect(4, -6, 52, 12)
  x.fillStyle = PINK; x.fillRect(50, -26, 40, 52); x.restore()
  x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('SOCK FINDER', 0, -12); x.fillText('3000', 0, 16)
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Starting over. | *Every single time.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, 1], star: { x: -210 }, hops: [1.2, 1.5],
    front(x, t, lt, P) {
      restart(x, 780, 960, pop01(t, P.t0 + 0.2, 0.35, 2), lt > 0.9 && lt < 1.3)
      label(x, 790, 720, 'ATTEMPT #9: GOING', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Finding the best | *bread in town.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -220 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, BREAD, BREAD_C, 790, 980, 22 * pop01(t, P.t0 + 0.2, 0.35, 2))
      drawBits(x, MEDAL, MEDAL_C, 800, 800, 18 * pop01(t, P.t0 + 1.0, 0.3, 2.6))
      sparkles(x, t, 800, 820, P.t0 + 1.4, 6, 110, 0.3)
      label(x, 790, 1150, 'ASK TAURUS', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Making friends | *with literally anyone.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -230 },
    front(x, t, lt, P) {
      drawBits(x, PIGEON, PIGEON_C, 820, 1030, 20 * pop01(t, P.t0 + 0.2, 0.35, 2), { sx: -1 })
      bubble(x, 560, 640, 'what’s your | sign??', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 32, tail: 'bl' })
      bubble(x, 840, 820, 'coo?', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 36, tail: 'bc' })
    } },
  { sign: 'cancer', cap: 'Knowing you’re sad | *before you do.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', look: [1, 0], star: { x: -230 }, hops: [0.3, 0.6],
    front(x, t, lt, P) {
      drawBits(x, BOX, BOX_C, 790, 960, 24 * pop01(t, P.t0 + 0.6, 0.35, 2))
      label(x, 790, 720, 'CARE PACKAGE', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 36, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 1150, 'SENSED IT. CAME OVER.', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 26, bg: SKYB, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Hyping up | *your worst haircut.*', mood: 'sparkle', look: [1, 0], star: { x: -230 }, hops: [1.2],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) {
        const F = signChar(x, t, 'virgo', 820, 1010, 190 * k, { mood: lt > 1.3 ? 'happy' : 'neutral', look: [-1, 0], seed: 21, glyph: false })
        x.save(); x.translate(F.x, F.top + 6); x.scale(k, k); x.fillStyle = INK; x.fillRect(-72, -34, 132, 40); x.fillStyle = '#8a4a2e'; x.fillRect(-66, -28, 120, 28); x.fillRect(-66, 0, 30, 18); x.restore()
      }
      bubble(x, 580, 640, 'ICONIC.', pop01(t, P.t0 + 0.9, 0.25, 2.4), { size: 52, tail: 'bl', col: GOLD })
    } },
  { sign: 'virgo', cap: 'Finding the thing | *you lost.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      drawBits(x, KEYS, { Y: GOLD }, 790, 900, 24 * pop01(t, P.t0 + 0.6, 0.35, 2.4), { rot: -0.2 })
      sparkles(x, t, 790, 900, P.t0 + 0.9, 8, 140, 0.5)
      label(x, 790, 1120, 'IT WAS IN YOUR COAT', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 28, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Wrapping gifts | *like a museum piece.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      drawBits(x, GIFT, GIFT_C, 790, 930, 26 * pop01(t, P.t0 + 0.2, 0.35, 2))
      sparkles(x, t, 790, 840, P.t0 + 1.0, 7, 160, 0.2)
      label(x, 790, 1150, 'BOW: PERFECT', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Keeping secrets. | *Forever.*', mood: lt => lt > 1.2 ? 'wink' : 'neutral', look: [1, 0], star: { x: -230 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      vault(x, 790, 850, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      label(x, 790, 1110, 'SAFE WITH ME', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: RED, color: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Making a long line | *a party.*', mood: 'sparkle', star: { x: -220 }, hops: [0.6, 1.2, 1.8],
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) { const k = pop01(t, P.t0 + 0.2 + i * 0.1, 0.35, 2); if (k > 0.01) signChar(x, t, ['taurus', 'virgo', 'capricorn'][i], 650 + i * 120, 1060, 110 * k, { mood: lt > 1.2 ? 'happy' : 'sleepy', look: [-1, 0], seed: 30 + i, glyph: false, hops: lt > 1.2 ? [P.t0 + 1.7 + i * 0.1] : [] }) }
      const by = 820 - Math.abs(Math.sin(t * 4)) * 120
      drawBits(x, BALL, BALL_C, 740, by, 16 * pop01(t, P.t0 + 0.5, 0.3, 2), { rot: t * 3 })
      label(x, 790, 640, 'THE LINE IS A PARTY', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 28, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Building furniture | *without the manual.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      const b = ease.outCubic(prog(lt, 0.3, 1.2))
      drawBits(x, CHAIR, { W: WOOD }, 820, lerp(1160, 960, b), 26 * pop01(t, P.t0 + 0.2, 0.35, 2), { alpha: 0.4 + 0.6 * b })
      const m = pop01(t, P.t0 + 0.4, 0.3, 2), fly = ease.inCubic(prog(lt, 0.8, 1.4))
      if (m > 0.01 && fly < 1) { x.save(); x.translate(lerp(620, 1100, fly), lerp(700, 560, fly)); x.rotate(fly * 6); x.scale(m, m); x.fillStyle = INK; x.fillRect(-60, -80, 120, 160); x.fillStyle = BONE; x.fillRect(-54, -74, 108, 148); x.fillStyle = INK; x.font = `700 20px ${MONO}`; x.textAlign = 'center'; x.fillText('MANUAL', 0, 0); x.restore() }
      label(x, 790, 1170, 'ZERO SPARE SCREWS', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 28, bg: MINT, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Inventing a gadget | *for one problem.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -240 },
    front(x, t, lt, P) {
      gadget(x, t, 700, 880, pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 760, 1120, 'IT WORKS. SOMEHOW.', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 28, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Making you feel | *deeply loved.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', tears: 2, star: { x: -230 },
    front(x, t, lt, P) {
      for (let i = 0; i < 6; i++) drawBits(x, CARD, { W: BONE, H: [PINK, RED, LAV, SKYB, GOLD, MINT][i] }, 690 + (i % 3) * 100, 900 + Math.floor(i / 3) * 110, 15 * pop01(t, P.t0 + 0.3 + i * 0.1, 0.3, 2.2), { rot: (i % 2 ? 0.1 : -0.08) })
      label(x, 790, 720, 'ONE FOR EVERY SIGN', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 28, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
      hearts(x, t, 790, 1000, P.t0 + 1.5, { n: 5, life: 1.4, spread: 200, cell: 6, seed: 5 })
    } },
]

const F = makeFilm({
  id: 'v3a007', key: 'E', accent: CORAL, ending: 'callback',
  title: 'What each sign is | *secretly great at.*',
  cameos: CAMEOS,
  group: { cap: 'Small talents. | *Big hearts.*' },
  last: {
    text: 'The pigeon? | *Best friends now.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.4, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'gemini', 400, 1060, 240 * k, { mood: lt > 1.4 ? 'heart' : 'sparkle', look: [1, 0], seed: 40, hops: [t - lt + 1.2] })
      drawBits(x, PIGEON, PIGEON_C, 700, 1090, 20 * pop01(t, t - lt + 0.7, 0.35, 2), { sx: -1 })
      bubble(x, 720, 880, 'coo!', pop01(t, t - lt + 1.3, 0.25, 2.2), { size: 40, tail: 'bc' })
      hearts(x, t, 550, 980, t - lt + 1.5, { n: 6, life: 1.6, spread: 260, cell: 6, seed: 9 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
