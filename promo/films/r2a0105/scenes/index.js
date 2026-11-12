// r2a0105: star_advice, ADVICE ROLLCALL, "What each sign | won't ask for." (~57 s vertical, signs3kit social cut, music: lofi · G)
// The format look lives in ../../signs3kit.js. Ending: callback.
//   0.0–3.6    "What each sign | *won't ask for.*"
//   3.6–49.2   one warm, relatable line per sign (3.8 s each), each with a light gag:
//              ♈ help, asking is brave too · ♉ the last fry, just ask · ♊ someone to really listen (a tin-can phone)
//              · ♋ care back, let them return it (the casserole comes home) · ♌ reassurance, even stars ask · ♍ a compliment,
//              earned plenty (gold star) · ♎ their own way, your pick matters · ♏ a hug, yes even you · ♐ someone to stay
//              (two pins on one map) · ♑ a day off, the world won't end · ♒ company, your people are close · ♓ to be first, you matter
//  49.2        "Ask anyway. | *We're listening.*"  The twelve fly up into a group photo.
//  52.6        CALLBACK: "Taurus asked. | *Got the whole basket.*"  the fries come back, full.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e'

// ── props
function fries(x, cx, cy, k, n) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  for (let i = 0; i < n; i++) { const fx = n === 1 ? 0 : -70 + (i % 8) * 20, h = 110 + ((i * 37) % 50); x.save(); x.translate(fx, -40); x.rotate(n === 1 ? 0.1 : ((i % 5) - 2) * 0.06); x.fillStyle = INK; x.fillRect(-11, -h, 22, h + 4); x.fillStyle = GOLD; x.fillRect(-7, -h + 4, 14, h); x.restore() }
  x.fillStyle = INK; x.beginPath(); x.moveTo(-110, -60); x.lineTo(110, -60); x.lineTo(84, 120); x.lineTo(-84, 120); x.closePath(); x.fill()
  x.fillStyle = RED; x.beginPath(); x.moveTo(-100, -52); x.lineTo(100, -52); x.lineTo(76, 112); x.lineTo(-76, 112); x.closePath(); x.fill()
  x.fillStyle = BONE; x.beginPath(); x.arc(0, 30, 30, 0, 7); x.fill()
  x.restore()
}
function canPhone(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.globalAlpha *= clamp(k)
  x.strokeStyle = BONE; x.lineWidth = 4; x.beginPath(); x.moveTo(cx - 180, cy); x.quadraticCurveTo(cx, cy + 60 + Math.sin(t * 3) * 10, cx + 180, cy); x.stroke()
  for (const [px, d] of [[cx - 200, 1], [cx + 200, -1]]) { x.fillStyle = INK; x.fillRect(px - 44, cy - 60, 88, 120); x.fillStyle = '#c9c9d8'; x.fillRect(px - 36, cy - 52, 72, 104); x.fillStyle = '#9aa0b4'; x.fillRect(px - 36, cy - 20, 72, 14) }
  x.restore()
}
function dish(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-150, -50, 300, 110); x.fillRect(-190, -20, 40, 30); x.fillRect(150, -20, 40, 30)
  x.fillStyle = SKYB; x.fillRect(-140, -40, 280, 90)
  x.fillStyle = INK; x.fillRect(-150, -90, 300, 40); x.fillRect(-20, -116, 40, 30); x.fillStyle = '#c9e8ff'; x.fillRect(-140, -82, 280, 26)
  x.fillStyle = PINK; x.fillRect(-80, -4, 160, 30); x.fillStyle = INK; x.font = `700 20px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('for you', 0, 12)
  x.restore()
}
const STAR = ['....Y....', '...YYY...', 'YYYYYYYYY', '.YYYYYYY.', '..YYYYY..', '.YYY.YYY.', 'YY.....YY']
function menu(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-160, -200, 320, 400); x.fillStyle = '#fff4e2'; x.fillRect(-150, -190, 300, 380)
  x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('MENU', 0, -150)
  x.font = `700 24px ${MONO}`; ;['what they want', 'what they want', 'WHAT I WANT', 'what they want'].forEach((l, i) => x.fillText(l, 0, -80 + i * 64))
  const c = clamp((lt - 0.8) / 0.5)
  if (c > 0) { x.strokeStyle = RED; x.lineWidth = 6; x.beginPath(); x.ellipse(0, 48, 140, 34, 0, 0, Math.PI * 2 * c); x.stroke() }
  x.restore()
}
function map(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.04); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-190, -150, 380, 300); x.fillStyle = '#9fd4ff'; x.fillRect(-180, -140, 360, 280)
  x.fillStyle = '#7dd08a'; x.beginPath(); x.ellipse(-70, -20, 110, 80, 0.3, 0, 7); x.fill(); x.beginPath(); x.ellipse(100, 50, 70, 60, -0.2, 0, 7); x.fill()
  const m = ease.inOutCubic(prog(lt, 0.6, 1.2))
  const pin = (px, py, col) => { x.fillStyle = INK; x.beginPath(); x.arc(px, py - 30, 24, 0, 7); x.fill(); x.fillRect(px - 4, py - 30, 8, 34); x.fillStyle = col; x.beginPath(); x.arc(px, py - 30, 17, 0, 7); x.fill() }
  pin(lerp(120, -50, m), lerp(60, -10, m), '#c97bff'); pin(-90, -10, PINK)
  x.restore()
}
function sign(x, cx, cy, k, text, bg) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-12, 60, 24, 220); x.fillStyle = '#c98f2a'; x.fillRect(-6, 60, 12, 216)
  x.restore()
  label(x, cx, cy, text, k, { size: 40, bg, rot: -0.04 })
}
const WALKIE = ['..K.....', '..K.....', 'KKKKKKKK', 'KGGGGGGK', 'KGSSSSGK', 'KGSSSSGK', 'KGGGGGGK', 'KGKGKGGK', 'KGGGGGGK', 'KGKGKGGK', 'KGGGGGGK', 'KKKKKKKK']
const WALKIE_C = { K: INK, G: '#6fc3ff', S: '#d6f4ff' }
const ROSETTE = ['..BBBBB..', '.BBYYYBB.', 'BBYYYYYBB', 'BYYKYYYYB', 'BYYKYYYYB', 'BYYKYYYYB', 'BBYYYYYBB', '.BBYYYBB.', '..BBBBB..', '..RR.RR..', '..RR.RR..', '..R...R..']
const ROSETTE_C = { B: '#b7a6ff', Y: GOLD, K: INK, R: '#c97bff' }

const CAMEOS = [
  { sign: 'aries', cap: 'Help. | *Asking is brave too.*', mood: lt => lt > 1.2 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 780, 720, 'help?', pop01(t, P.t0 + 0.3, 0.25, 2.2) * (lt < 1.0 ? 0.55 : 1.2), { size: 50, tail: 'bl' })
      label(x, 790, 1000, 'ON THE WAY!', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 36, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'The last fry. | *Just ask. It’s yours.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      fries(x, 790, 980, 1.45 * pop01(t, P.t0 + 0.2, 0.35, 2), 1)
      bubble(x, 790, 650, 'can I…?', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 44, tail: 'bl' })
      label(x, 790, 1150, 'OF COURSE', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Someone to really listen. | *You deserve that.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      canPhone(x, t, 720, 900, pop01(t, P.t0 + 0.2, 0.35, 2))
      bubble(x, 800, 680, 'go on, I’m here', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 34, col: MINT, tail: 'br' })
      label(x, 790, 1080, 'LISTENING: 100%', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Care back. | *Let them return it.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const back = ease.inOutCubic(prog(lt, 0.4, 1.1))
      dish(x, lerp(1100, 750, back), 960, 1.05 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 700, 'RETURNED. FULL.', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
      if (lt > 1.2) hearts(x, t, 790, 880, P.t0 + 1.2 * 1.29, { n: 4, life: 1.6, spread: 160, cell: 7, seed: 2 })
    } },
  { sign: 'leo', cap: 'Reassurance. | *Even stars ask.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      bubble(x, 780, 680, 'was I okay?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 44, tail: 'bl' })
      label(x, 790, 930, 'YOU WERE GREAT', pop01(t, P.t0 + 1.1, 0.3, 2.6), { size: 38, bg: '#ffb34a', rot: -0.05 })
      sparkles(x, t, 790, 930, P.t0 + 1.4, 7, 200, 0.3)
    } },
  { sign: 'virgo', cap: 'A compliment. | *You’ve earned plenty.*', mood: lt => lt > 1.0 ? 'heart' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, STAR, { Y: GOLD }, 790, 860, 30 * pop01(t, P.t0 + 0.5, 0.35, 2.4), { rot: Math.sin(t * 2) * 0.08 })
      label(x, 790, 1100, 'GOLD STAR. FOR YOU.', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Their own way. | *Your pick matters.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) { menu(x, 790, 880, pop01(t, P.t0 + 0.2, 0.35, 2), lt) } },
  { sign: 'scorpio', cap: 'A hug. | *Yes, even you.*', mood: lt => lt > 1.2 ? 'heart' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      sign(x, 790, 780, pop01(t, P.t0 + 0.2, 0.35, 2), 'FREE HUGS', PINK)
      label(x, 790, 900, '(SCORPIO TOO)', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 30, bg: LAV, rot: 0.05, font: MONO, weight: 700 })
      if (lt > 1.2) hearts(x, t, 790, 1000, P.t0 + 1.2 * 1.29, { n: 5, life: 1.6, spread: 200, cell: 7, seed: 6 })
    } },
  { sign: 'sagittarius', cap: 'Someone to stay. | *The right ones will.*', mood: 'sparkle', star: { x: 150 }, hops: [1.3],
    front(x, t, lt, P) {
      map(x, t, 330, 860, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      label(x, 330, 1100, 'SAME PLACE. FINALLY.', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 28, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'A day off. | *The world won’t end.*', mood: lt => lt < 1.0 ? 'squint' : 'sleepy', look: [-1, 0], star: { x: 150 },
    front(x, t, lt, P) {
      sign(x, 330, 820, pop01(t, P.t0 + 0.2, 0.35, 2), 'OUT OF OFFICE', '#2fc79a')
      label(x, 330, 1080, 'WORLD: STILL FINE', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: BONE, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Company. | *Your people are close.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, WALKIE, WALKIE_C, 760, 960, 22 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: -0.08 })
      bubble(x, 800, 680, 'over? (I’m lonely)', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 32, tail: 'bl' })
      bubble(x, 830, 820, 'omw!', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 40, col: SKYB, tail: 'br' })
    } },
  { sign: 'pisces', cap: 'To come first. | *You matter too.*', mood: lt => lt < 1.1 ? 'wide' : 'heart', tears: lt => lt < 1.1 ? 2 : 3, star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, ROSETTE, ROSETTE_C, 790, 880, 28 * pop01(t, P.t0 + 0.6, 0.35, 2.4))
      label(x, 790, 1130, 'FIRST PLACE: YOU', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
]
const F = makeFilm({
  id: 'r2a0105', key: 'G', accent: GOLD, ending: 'callback',
  title: 'What each sign | *won’t ask for.*',
  cameos: CAMEOS,
  group: { cap: 'Ask anyway. | *We’re listening.*' },
  last: {
    text: 'Taurus asked. | *Got the whole basket.*',
    draw(x, t, lt) {
      fries(x, 700, 1180, 1.4 * pop01(t, t - lt + 0.3, 0.45, 1.8), 16)
      const k = pop01(t, t - lt + 0.5, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'taurus', 340, 1100, 260 * k, { mood: lt > 1.3 ? 'heart' : 'happy', look: [1, 0], seed: 40, hops: [t - lt + 1.3] })
      label(x, 700, 1400, 'SHARED, TOO', pop01(t, t - lt + 1.4, 0.3, 2.4), { size: 36, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
