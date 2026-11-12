// r2a0405: star_advice, ADVICE ROLL CALL, "Each sign knows | it's a match." (topic: how each sign knows it's a match; ~63 s vertical, signs3kit social cut,
// music: lofi · G). Twelve signs in zodiac order, one warm, specific line each with one light gag. Ending: card.
//   0.0–3.6    "Each sign knows | *it’s a match.*"
//   3.6–49.2   ♈ they slow down (pace gauge) · ♉ they share the last bite · ♊ the chat never ends · ♋ it feels like
//              home · ♌ they cheer the loudest (FAN #1) · ♍ a little mess feels okay (one sock) · ♎ choosing is easy
//              (the scale balances) · ♏ they share a secret (a heart lock opens) · ♐ they give up the window seat
//              · ♑ work can wait (out of office) · ♒ weird gets a laugh · ♓ the tears are happy
//  49.2        "Twelve ways | to *just know.*"
//  52.4        LESSON: "A match feels like | *being yourself.*"  STATUS: ALIGNED
//  58.3        "And that last bite? | *Shared.*" over the match card: Taurus + Cancer (the last bite, and home).
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const PAPER = '#fff4e2', RED = '#e23d4e', ROSE = '#ff7aa8', GREEN = '#5fd068'

const SLICE = [
  '......PP',
  '....PPPP',
  '..PPWPPP',
  'PPPPPPPP',
  'CCCCCCCC',
  'CCCCCCCC',
  'BBBBBBBB',
]
const SLICE_C = { P: PINK, W: '#fff', C: PAPER, B: '#c98f5a' }
const HOUSE = [
  '......RR......',
  '....RRRRRR....',
  '..RRRRRRRRRR..',
  'RRRRRRRRRRRRRR',
  '.WWWWWWWWWWWW.',
  '.WYYWWWWWWYYW.',
  '.WYYWWDDWWYYW.',
  '.WWWWWDDWWWWW.',
  '.WWWWWDDWWWWW.',
]
const HOUSE_C = { R: RED, W: PAPER, Y: '#ffd23a', D: '#8a5a2e' }
const SOCK = [
  '.SSSS..',
  '.SPPS..',
  '.SSSS..',
  '.SPPS..',
  '.SSSSSS',
  'SSSSSSS',
  'SSSSSS.',
]
const SOCK_C = { S: MINT, P: '#fff' }
const FINGER = [
  '...YY...',
  '...YY...',
  '...YY...',
  '.YYYYYY.',
  'YYYYYYYY',
  'YYYYYYYY',
  '.YYYYYY.',
  '..BBBB..',
  '..BBBB..',
]
const FINGER_C = { Y: GOLD, B: '#5b8cff' }
const LOCK = [
  '..KKKK..',
  '.K....K.',
  '.K....K.',
  'HHHHHHHH',
  'HHHWHHHH',
  'HHHHHHHH',
  'HHHKKHHH',
  'HHHKKHHH',
  '.HHHHHH.',
]

// a speed gauge whose needle drops
function gauge(x, cx, cy, k, p) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 150, Math.PI, 0); x.fill()
  const segs = [MINT, GOLD, RED]
  segs.forEach((c, i) => { x.fillStyle = c; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, 138, Math.PI + i * Math.PI / 3, Math.PI + (i + 1) * Math.PI / 3); x.fill() })
  x.fillStyle = '#140c30'; x.beginPath(); x.arc(0, 0, 92, Math.PI, 0); x.fill()
  const a = Math.PI + lerp(0.92, 0.12, p) * Math.PI
  x.strokeStyle = BONE; x.lineWidth = 12; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(a) * 124, Math.sin(a) * 124); x.stroke()
  x.fillStyle = BONE; x.fillRect(-16, -16, 32, 32)
  x.restore()
}
// a balance scale; tilt eases to level
function scale(x, t, cx, cy, k, tilt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-10, -150, 20, 290); x.fillRect(-80, 130, 160, 22)
  x.fillStyle = GOLD; x.fillRect(-5, -146, 10, 282); x.fillRect(-76, 134, 152, 14)
  x.save(); x.translate(0, -140); x.rotate(tilt)
  x.fillStyle = INK; x.fillRect(-170, -8, 340, 16); x.fillStyle = GOLD; x.fillRect(-166, -4, 332, 8)
  for (const s of [-1, 1]) {
    x.save(); x.translate(s * 150, 0); x.rotate(-tilt)
    x.strokeStyle = INK; x.lineWidth = 4; x.beginPath(); x.moveTo(0, 0); x.lineTo(-46, 80); x.moveTo(0, 0); x.lineTo(46, 80); x.stroke()
    x.fillStyle = INK; x.fillRect(-60, 78, 120, 16); x.fillStyle = '#c3cbe0'; x.fillRect(-56, 80, 112, 10)
    drawBits(x, ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: s < 0 ? PINK : ROSE }, 0, 52, 8)
    x.restore()
  }
  x.restore(); x.restore()
}
// a plane window with a little sky
function planeWindow(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.roundRect(-110, -150, 220, 300, 90); x.fill()
  x.fillStyle = '#c3cbe0'; x.beginPath(); x.roundRect(-102, -142, 204, 284, 84); x.fill()
  x.fillStyle = SKYB; x.beginPath(); x.roundRect(-80, -120, 160, 240, 70); x.fill()
  x.fillStyle = '#fff'; for (let i = 0; i < 3; i++) { const px = ((t * 40 + i * 70) % 220) - 110; x.fillRect(px - 30, -60 + i * 50, 60, 16) }
  x.restore()
}
// a closed laptop with an out-of-office sticker
function laptop(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-176, -20, 352, 60)
  x.fillStyle = '#9aa5c4'; x.fillRect(-170, -14, 340, 26); x.fillStyle = '#6b7590'; x.fillRect(-176, 12, 352, 22)
  x.restore()
}

const STAR = { x: -170 }
const CAMEOS = [
  { sign: 'aries', cap: 'Aries knows when | *they slow down.*', mood: lt => lt > 1.4 ? 'heart' : 'wide', look: [1, 0], star: STAR, hops: [1.5],
    front(x, t, lt, P) {
      gauge(x, 790, 980, pop01(t, P.t0 + 0.2, 0.3, 2), ease.inOutCubic(prog(lt, 0.6, 1.5)))
      label(x, 790, 700, 'PACE: COZY', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 36, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Taurus shares | *the last bite.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: STAR, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const m = ease.inOutCubic(prog(lt, 0.8, 1.3))
      drawBits(x, SLICE, SLICE_C, lerp(560, 760, m), 1080, 16 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 830, 920, 190 * k, { mood: m > 0.9 ? 'heart' : 'wide', look: [-1, 0], seed: 37, glyph: false })
      label(x, 790, 660, 'RARE. HUGE. LOVE.', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 32, bg: GOLD, rot: 0.04 })
    } },
  { sign: 'gemini', cap: 'Gemini knows: | *chats never end.*', mood: lt => Math.floor(lt * 2.5) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: STAR,
    front(x, t, lt, P) {
      const n = Math.floor(lerp(40, 3004, ease.inCubic(clamp((lt - 0.3) / 1.8))))
      label(x, 790, 800, `MESSAGES: ${n.toLocaleString('en-US')}`, pop01(t, P.t0 + 0.2, 0.3, 2), { size: 36, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 980, 'ok but ONE more', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'Cancer knows: | *it feels like home.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: STAR, hops: [1.2],
    front(x, t, lt, P) {
      drawBits(x, HOUSE, HOUSE_C, 790, 940, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      hearts(x, t, 790, 800, P.t0 + 1.0, { n: 6, life: 1.8, spread: 220, cell: 7, seed: 3 })
    } },
  { sign: 'leo', cap: 'Leo knows: | *they cheer loudest.*', mood: 'sparkle', look: [1, 0], star: STAR, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      drawBits(x, FINGER, FINGER_C, 800, 940 + Math.sin(t * 9) * 10, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.1 * Math.sin(t * 6) })
      label(x, 800, 920, '#1', pop01(t, P.t0 + 0.6, 0.3, 2), { size: 44, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      label(x, 800, 680, 'BIGGEST FAN', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 34, bg: GOLD, rot: 0.04 })
    } },
  { sign: 'virgo', cap: 'Virgo knows: | *mess feels fine.*', mood: lt => lt > 1.4 ? 'heart' : 'wide', look: [1, 1], star: STAR, hops: [1.5],
    front(x, t, lt, P) {
      drawBits(x, SOCK, SOCK_C, 800, 1080, 16 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.4 })
      label(x, 800, 720, 'ONE SOCK ON THE FLOOR', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 28, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
      label(x, 800, 860, 'ALLOWED ♥︎', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 36, bg: MINT, rot: 0.04 })
    } },
  { sign: 'libra', cap: 'Libra knows: | *choosing is easy.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: STAR, hops: [1.5],
    front(x, t, lt, P) {
      scale(x, t, 770, 980, pop01(t, P.t0 + 0.2, 0.3, 2), lerp(0.3 * Math.sin(lt * 7), 0, ease.inOutCubic(prog(lt, 0.4, 1.4))))
      label(x, 790, 660, 'BALANCED ✦', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 34, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Scorpio knows: | *trust comes easy.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: STAR, hops: [1.3],
    front(x, t, lt, P) {
      const open = ease.outBack ? ease.outBack(clamp((lt - 1.0) / 0.4)) : clamp((lt - 1.0) / 0.4)
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      x.save(); x.translate(800, 940); x.scale(k, k)
      drawBits(x, LOCK.slice(0, 3), { K: INK }, 0, -100 - 34 * open, 22)
      drawBits(x, LOCK.slice(3), { H: ROSE, W: '#fff', K: INK }, 0, 22, 22)
      x.restore()
      label(x, 790, 660, 'TRUST: UNLOCKED', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Sagittarius gives up | *the window seat.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', look: [1, 0], star: STAR, hops: [1.3],
    front(x, t, lt, P) {
      planeWindow(x, t, 800, 900, pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 800, 1130, 'SEAT 12A: YOURS', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 30, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Capricorn knows: | *work can wait.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: STAR, hops: [1.4],
    front(x, t, lt, P) {
      laptop(x, 790, 1060, pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1020, 'OUT OF OFFICE', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 760, 'dinner? | yes. now.', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'aquarius', cap: 'Aquarius knows: | *weird is welcome.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: STAR, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 760, 700, 'i collect | spoons.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, tail: 'bl' })
      bubble(x, 760, 900, 'HAHA same?!', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 40, col: PINK, tail: 'br' })
      label(x, 790, 1090, 'WEIRDNESS: MATCHED', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 28, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Pisces knows: | *happy tears.*', mood: 'heart', look: [1, 0], star: STAR, tears: 3, hops: [1.4],
    front(x, t, lt, P) {
      label(x, 790, 760, 'HAPPY TEARS ✦', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 36, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 790, 1000, P.t0 + 1.0, { n: 7, life: 2.0, spread: 280, cell: 8, seed: 5 })
    } },
]

const F = makeFilm({
  id: 'r2a0405', key: 'G', accent: ROSE, ending: 'card',
  title: 'Each sign knows | *it’s a match.*',
  cameos: CAMEOS,
  card: { a: 'taurus', b: 'cancer', chip: 'IT’S A MATCH' },
  group: { cap: 'Twelve ways | to *just know.*' },
  lesson: { text: 'A match feels like | *being yourself.*', chip: 'STATUS: ALIGNED' },
  last: { text: 'And that last bite? | *Shared.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
