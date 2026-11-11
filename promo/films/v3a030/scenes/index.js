// v3a030: star_advice, ADVICE SOLO, "Cancer, you're allowed | to rest." (~51 s vertical, signs3kit social cut, music: lofi · C)
// One sign the whole way through (makeFilm solo mode, 9 cards): permission to rest, Cancer-style, one gag each.
//   0.0–3.6    "Cancer, you’re allowed | *to rest.*"  One big Cancer pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              everyone's fed: KITCHEN CLOSED sign · the giant backpack of EVERYONE'S FEELINGS, put down
//              · the group chat (99+) goes face down · a bath counts as a plan (bubbles + duck)
//              · someone else hosts Sunday: NOT YOUR TURN · crying at a film is rest too (a TV with a heart)
//              · the MOM FRIEND badge hangs on its hook · Virgo fluffs a pillow: your turn to sit
//              · heart on AIRPLANE MODE
//  37.8        "Caretaker. | *Off the clock.*"  Cancer comes back, sleepy.
//  41.0        LESSON UNLOCKED: "Being looked after | *is your turn too.*"  REST: EARNED
//  46.9        "Kitchen closed. | *Cancer’s napping.*" (the first card's sign, paid off)
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const SILVER = '#dfe7f2', WOOD = '#c98f2a', RED = '#e23d4e', BLUE = '#5aa9ff'
const S = 'cancer'

// a hanging sign on two strings
function hangSign(x, cx, cy, text, k, { bg = BONE, size = 40, swing = 0 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy - 120); x.rotate(swing); x.scale(k, k)
  x.strokeStyle = INK; x.lineWidth = 5; x.beginPath(); x.moveTo(-90, 0); x.lineTo(-120, 120); x.moveTo(90, 0); x.lineTo(120, 120); x.stroke()
  x.fillStyle = INK; x.fillRect(-14, -14, 28, 28); x.fillStyle = GOLD; x.fillRect(-8, -8, 16, 16)
  x.restore()
  label(x, cx + Math.sin(swing) * 120, cy, text, k, { size, bg, rot: swing, font: MONO, weight: 700 })
}
const PLATE = ['..WWWW..', '.WWWWWW.', 'WWWccWWW', 'WWccccWW', 'WWWccWWW', '.WWWWWW.', '..WWWW..']
const PLATE_C = { W: '#fff4e2', c: '#e9d8bf' }
// a big hiking backpack
function backpack(x, cx, cy, k, rot = 0) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-120, -150, 260, 330)
  x.fillStyle = INK; x.fillRect(-134, -170, 268, 340); x.fillRect(-100, -200, 200, 40)
  x.fillStyle = '#b5523a'; x.fillRect(-126, -162, 252, 324); x.fillRect(-92, -192, 184, 34)
  x.fillStyle = '#8c3a28'; x.fillRect(-100, 30, 200, 110)
  x.fillStyle = INK; x.fillRect(-100, 26, 200, 6)
  x.fillStyle = GOLD; x.fillRect(-16, 50, 32, 18)
  x.restore()
}
// a phone, face up or face down
function phone(x, cx, cy, k, flip, t) {
  if (k <= 0.01) return
  const sy = Math.cos(Math.PI * flip)
  x.save(); x.translate(cx, cy); x.rotate(0.06); x.scale(k, k * Math.max(0.05, Math.abs(sy)))
  x.fillStyle = INK; x.fillRect(-120, -200, 240, 400)
  if (sy > 0) {
    x.fillStyle = '#2a2350'; x.fillRect(-110, -190, 220, 380)
    x.fillStyle = '#140c30'; x.fillRect(-98, -170, 196, 340)
    for (let i = 0; i < 4; i++) { x.fillStyle = [MINT, PINK, SKYB, GOLD][i]; x.fillRect(-84, -150 + i * 78, 168, 56) }
    x.fillStyle = RED; x.beginPath(); x.arc(96, -178, 46, 0, Math.PI * 2); x.fill()
    x.fillStyle = '#fff'; x.font = `800 36px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('99+', 96, -176)
  } else {
    x.fillStyle = '#3b3270'; x.fillRect(-110, -190, 220, 380)
    x.fillStyle = INK; x.fillRect(-70, -160, 40, 40)
  }
  x.restore()
}
// a bathtub full of bubbles and one duck
const DUCK = ['..YY..', '.YYYYo', '.YkYY.', 'YYYYYY', 'YYYYYY', '.YYYY.']
function bathtub(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  for (let i = 0; i < 9; i++) {
    const bx = -150 + i * 38 + 6 * Math.sin(t * 2 + i), by = -60 - 24 * Math.abs(Math.sin(i * 1.7)) - 6 * Math.sin(t * 3 + i)
    x.fillStyle = INK; x.beginPath(); x.arc(bx, by, 34, 0, Math.PI * 2); x.fill()
    x.fillStyle = '#ffffff'; x.beginPath(); x.arc(bx, by, 29, 0, Math.PI * 2); x.fill()
    x.fillStyle = SKYB; x.beginPath(); x.arc(bx - 8, by - 9, 7, 0, Math.PI * 2); x.fill()
  }
  x.fillStyle = INK; x.beginPath(); x.roundRect(-196, -56, 392, 150, 40); x.fill()
  x.fillStyle = SILVER; x.beginPath(); x.roundRect(-188, -48, 376, 134, 34); x.fill()
  x.fillStyle = INK; x.fillRect(-150, 86, 20, 34); x.fillRect(130, 86, 20, 34)
  x.restore()
  drawBits(x, DUCK, { Y: GOLD, o: '#ff8a3d', k: INK }, cx + 110, cy - 110 + 6 * Math.sin(t * 3), 12 * k)
}
// a dinner table set for many (with a NOT YOUR TURN card)
function table(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-200, -20, 400, 40); x.fillRect(-180, 20, 26, 120); x.fillRect(154, 20, 26, 120)
  x.fillStyle = WOOD; x.fillRect(-194, -14, 388, 28)
  x.restore()
  for (let i = 0; i < 4; i++) drawBits(x, PLATE, PLATE_C, cx - 150 + i * 100, cy - 30, 9 * k)
}
// a little TV with a weepy film on it
function tv(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.strokeStyle = INK; x.lineWidth = 8; x.beginPath(); x.moveTo(-40, -150); x.lineTo(0, -110); x.lineTo(40, -150); x.stroke()
  x.fillStyle = INK; x.fillRect(-170, -114, 340, 240); x.fillRect(-60, 126, 120, 24)
  x.fillStyle = '#2a2350'; x.fillRect(-160, -104, 320, 220)
  x.fillStyle = '#ffd9a6'; x.fillRect(-140, -84, 280, 180)
  x.restore()
  const hb = 1 + 0.08 * Math.sin(t * 9)
  drawBits(x, ['.HH.HH.', 'HHHHHHH', 'HWHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: '#ff4f86', W: '#fff' }, cx, cy - 2, 16 * k * hb)
}
// a badge on a coat hook
function badgeHook(x, cx, cy, k, drop) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-110, -170, 220, 30); x.fillStyle = WOOD; x.fillRect(-104, -164, 208, 18)
  x.fillStyle = INK; x.fillRect(-8, -146, 16, 40); x.fillRect(-8, -112, 34, 14)
  x.translate(0, lerp(80, -40, drop))
  x.strokeStyle = INK; x.lineWidth = 6; x.beginPath(); x.moveTo(-60, -70); x.lineTo(0, -110); x.lineTo(60, -70); x.stroke()
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 92, 0, Math.PI * 2); x.fill()
  x.fillStyle = PINK; x.beginPath(); x.arc(0, 0, 84, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#fff4e2'; x.beginPath(); x.arc(0, 0, 66, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; x.font = `800 28px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText('MOM', 0, -14); x.fillText('FRIEND', 0, 20)
  x.restore()
}
const PILLOW = ['.PPPPPPPPPP.', 'PPPPPPPPPPPP', 'PPPwPPPPPPPP', 'PPPPPPPPPPPP', 'PPPPPPPPPwPP', 'PPPPPPPPPPPP', '.PPPPPPPPPP.']
const BIGHEART = ['.HH.HH.', 'HHHHHHH', 'HWHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...']
function plane(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.5); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-60, -12, 120, 24); x.fillRect(-14, -54, 28, 108); x.fillRect(-58, -30, 18, 60)
  x.fillStyle = '#fff'; x.fillRect(-54, -6, 108, 12); x.fillRect(-8, -48, 16, 96); x.fillRect(-52, -24, 6, 48)
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Everyone’s fed. | *Now sit down.*', mood: lt => lt > 1.3 ? 'sleepy' : 'happy', look: [1, 0], star: { x: -210 }, hops: [0.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      for (let i = 0; i < 4; i++) drawBits(x, PLATE, PLATE_C, 790, 1080 - i * 30, 14 * pop01(t, P.t0 + 0.2 + i * 0.12, 0.3, 2))
      hangSign(x, 780, 760, 'KITCHEN: CLOSED', pop01(t, P.t0 + 1.0, 0.35, 2.2), { bg: PINK, size: 38, swing: 0.06 * Math.sin(t * 3) })
    } },
  { sign: S, cap: 'Everyone’s feelings? | *Put them down.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -210 }, hops: [1.5],
    squash: lt => lt < 1.3 ? 0.12 : 0,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.35, 2), drop = ease.inOutCubic(prog(lt, 1.0, 1.4))
      backpack(x, lerp(450, 790, drop), lerp(780, 980, drop), k * lerp(0.95, 0.8, drop), lerp(-0.15, 0.08, drop))
      label(x, lerp(450, 790, drop), lerp(640, 900, drop), 'EVERYONE’S FEELINGS', k, { size: 26, bg: BONE, rot: -0.05, font: MONO, weight: 700 })
      if (drop >= 1) sparkles(x, t, 330, 880, P.t0 + 1.45, 7, 170, 0.4)
      label(x, 790, 640, 'PUT DOWN. PHEW.', pop01(t, P.t0 + 2.0, 0.3, 2.4), { size: 32, bg: MINT, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'The group chat | *can wait.*', mood: lt => lt > 1.3 ? 'happy' : 'wide', look: [1, 0], star: { x: -210 }, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, 780, 850, pop01(t, P.t0 + 0.2, 0.3, 2), ease.inOutCubic(prog(lt, 0.9, 1.3)), t)
      label(x, 780, 1110, 'FACE DOWN. FOR NOW.', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 28, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'A bath counts | *as a plan.*', mood: 'sleepy', star: { x: 0, y: 30, s: 260 },
    back(x, t, lt, P) { },
    front(x, t, lt, P) {
      bathtub(x, t, 540, 1010, pop01(t, P.t0 + 0.2, 0.35, 1.8), lt)
      label(x, 540, 620, 'TONIGHT’S PLANS: THIS', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 32, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Someone else | *can host Sunday.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      table(x, 780, 1010, pop01(t, P.t0 + 0.2, 0.35, 2))
      const k = pop01(t, P.t0 + 0.6, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'libra', 800, 830, 180 * k, { mood: 'happy', look: [-1, 0], seed: 21, glyph: false, hops: [P.t0 + 1.6] })
      bubble(x, 760, 620, 'my turn! | you sit.', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 34, tail: 'br' })
    } },
  { sign: S, cap: 'Crying at a film | *is rest too.*', mood: 'sparkle', look: [1, 0], star: { x: -210 }, tears: 2,
    front(x, t, lt, P) {
      tv(x, t, 780, 880, pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 780, 1110, 'THIRD TIME. STILL GOT ME.', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 26, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: '“Mom friend” | *is off tonight.*', mood: lt => lt > 1.3 ? 'wink' : 'happy', look: [1, -1], star: { x: -210 }, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.4, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      badgeHook(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), ease.inOutCubic(prog(lt, 0.8, 1.3)))
      label(x, 790, 1130, 'BACK TOMORROW', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Let someone | *fluff your pillow.*', mood: lt => lt > 1.4 ? 'heart' : 'wide', look: [1, 0], star: { x: -210 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'virgo', 820, 860, 200 * k, { mood: 'happy', look: [-1, 0], seed: 22, glyph: false, hops: [P.t0 + 0.9, P.t0 + 1.4] })
      const fl = 1 + 0.12 * Math.sin(lt * 14) * (lt > 0.6 && lt < 1.5 ? 1 : 0)
      drawBits(x, PILLOW, { P: '#fff4e2', w: LAV }, 560, 1060, 22 * pop01(t, P.t0 + 0.4, 0.3, 2), { sx: fl, sy: 2 - fl })
      bubble(x, 800, 620, 'your turn | to sit.', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 34, tail: 'br' })
    } },
  { sign: S, cap: 'Your heart’s | *on airplane mode.*', mood: 'sleepy', look: [1, 0], star: { x: -200 }, hops: [0.6],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      drawBits(x, BIGHEART, { H: '#ff4f86', W: '#fff' }, 790, 870, 30 * k * (1 + 0.04 * Math.sin(t * 4)))
      plane(x, lerp(980, 820, ease.outCubic(prog(lt, 0.6, 1.2))), 720, pop01(t, P.t0 + 0.8, 0.3, 2) * 1.3)
      label(x, 790, 1120, 'NOTIFICATIONS: SOFT', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'v3a030', key: 'C', accent: SKYB, solo: S, ending: 'lesson',
  title: 'Cancer, you’re | allowed *to rest.*',
  cameos: CAMEOS,
  group: { cap: 'Caretaker. | *Off the clock.*', mood: 'sleepy' },
  lesson: { text: 'Let someone | *care for you.*', chip: 'REST: EARNED' },
  last: {
    text: 'Kitchen closed. | *Cancer’s napping.*',
    draw(x, t, lt) { hangSign(x, 540, 1150, 'KITCHEN: CLOSED', pop01(t, t - lt + 0.6, 0.35, 2.2), { bg: PINK, size: 40, swing: 0.05 * Math.sin(t * 2.4) }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
