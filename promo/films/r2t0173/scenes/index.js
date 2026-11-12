// r2t0173: star_talk, ROLL CALL, "The signs | *at the coffee shop.*" (~54 s vertical, signs3kit social cut, music: lofi · G)
// Twelve signs in zodiac order, each the most extreme version of itself in a coffee shop. Ending: group.
//   0.0–3.6    "The signs | *at the coffee shop.*"
//   3.6–49.2   ♈ ordered before the menu loaded · ♉ one pastry, then the whole case · ♊ changed the order seven times
//              · ♋ brought a mug from home · ♌ name on the cup, with a crown · ♍ wiped the table before sitting
//              · ♎ couldn't pick a milk, asked the barista's sign · ♏ ordered off the secret menu (there isn't one)
//              · ♐ came for coffee, left with a plane ticket · ♑ opened a laptop, started a company
//              · ♒ invented a drink (mostly sparkles) · ♓ latte art heart, cried
//  49.2        "Twelve signs. | *One tired barista.*"  (group is the ending)
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', ORANGE = '#ffb34a', COFFEE = '#8a5a3a'

// ── props
// a takeaway cup with text written on the sleeve
function cup(x, cx, cy, k, { text = '', col = BONE, lid = '#ffffff', size = 34, rot = 0.04, font = INTER } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-110, -150); x.lineTo(110, -150); x.lineTo(86, 170); x.lineTo(-86, 170); x.closePath(); x.fill()
  x.fillStyle = col; x.beginPath(); x.moveTo(-100, -142); x.lineTo(100, -142); x.lineTo(78, 162); x.lineTo(-78, 162); x.closePath(); x.fill()
  x.fillStyle = INK; x.fillRect(-124, -186, 248, 44); x.fillStyle = lid; x.fillRect(-118, -180, 236, 32)
  x.fillStyle = '#c98f5a'; x.fillRect(-96, -40, 192, 110)
  if (text) { x.fillStyle = INK; x.font = `800 ${size}px ${font}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 15) }
  x.restore()
}
function ticket(x, cx, cy, k, lines, struck) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  const h = 60 + lines.length * 44
  x.fillStyle = INK; x.fillRect(-140, -h / 2 - 6, 280, h + 12); x.fillStyle = '#fff8ea'; x.fillRect(-134, -h / 2, 268, h)
  x.font = `700 26px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'
  lines.forEach((l, i) => {
    const y = -h / 2 + 50 + i * 44
    x.fillStyle = INK; x.fillText(l, -112, y)
    if (i < struck) { x.strokeStyle = RED; x.lineWidth = 5; x.beginPath(); x.moveTo(-118, y); x.lineTo(118, y); x.stroke() }
  })
  x.fillStyle = INK; x.font = `700 20px ${MONO}`; x.fillText('ORDER', -112, -h / 2 + 18)
  x.restore()
}
const CROISSANT = ['...KKKK...', '..KOOOOK..', '.KOoOOoOK.', 'KOOoOOoOOK', 'KOoOOOOoOK', '.KKOOOOKK.', '...KKKK...']
function tray(x, cx, cy, k, n) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-180, -150, 360, 300); x.fillStyle = 'rgba(190,240,255,0.25)'; x.fillRect(-172, -142, 344, 284)
  x.fillStyle = BONE; x.fillRect(-172, -10, 344, 8); x.fillRect(-172, 120, 344, 8)
  for (let i = 0; i < 6; i++) { if (i < n) continue; drawBits(x, CROISSANT, { K: INK, O: '#e8a84a', o: '#c9782a' }, -110 + (i % 3) * 110, -50 + Math.floor(i / 3) * 130, 8) }
  x.restore()
}
const MUG = ['KKKKKKKKK..', 'KCCCCCCCK..', 'KCHHCHHCKKK', 'KCHHHHHCK.K', 'KCCHHHCCK.K', 'KCCCHCCCKKK', 'KCCCCCCCK..', '.KKKKKKK...']
const BOTTLE = ['..KKK.', '..KWK.', '.KKKKK', '.KBBBK', 'KBBBBBK', 'KBWBBBK', 'KBBBBBK', 'KBBBBBK', 'KKKKKKK']
function planeTicket(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.07); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-180, -90, 360, 180); x.fillStyle = SKYB; x.fillRect(-172, -82, 344, 164)
  x.fillStyle = BONE; x.fillRect(80, -82, 6, 164)
  x.fillStyle = INK; x.font = `800 36px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText('BOARDING', -150, -36)
  x.font = `700 26px ${MONO}`; x.fillText('to: anywhere', -150, 14); x.fillText('gate: now', -150, 50)
  x.restore()
}
function laptop(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-170, -140, 340, 220); x.fillStyle = '#2a2350'; x.fillRect(-160, -130, 320, 200)
  x.fillStyle = '#140c30'; x.fillRect(-146, -116, 292, 172)
  x.fillStyle = MINT; x.font = `700 22px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'
  const L = ['business plan', 'v1 ✓', 'hire team ✓', 'IPO? ...']
  L.slice(0, 1 + Math.floor(clamp((lt - 0.3) / 1.4) * 4)).forEach((l, i) => x.fillText(l, -128, -90 + i * 38))
  x.fillStyle = INK; x.fillRect(-200, 80, 400, 30); x.fillStyle = '#9aa5c4'; x.fillRect(-194, 84, 388, 20)
  x.restore()
}
function latte(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 60, 210, 50, 0, 0, 7); x.fill(); x.fillStyle = BONE; x.beginPath(); x.ellipse(0, 56, 200, 42, 0, 0, 7); x.fill()
  x.fillStyle = INK; x.beginPath(); x.arc(0, -10, 136, 0, 7); x.fill(); x.fillStyle = BONE; x.beginPath(); x.arc(0, -10, 128, 0, 7); x.fill()
  x.fillStyle = COFFEE; x.beginPath(); x.arc(0, -10, 108, 0, 7); x.fill()
  drawBits(x, ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: '#f4e2c8' }, 0, -8, 18, { outline: null })
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Ordered before | the *menu loaded.*', mood: 'wide', look: [1, 0], star: { x: -180 }, hops: [0.4, 0.8],
    front(x, t, lt, P) {
      cup(x, 790, 880, pop01(t, P.t0 + 0.2, 0.3, 2), { text: 'LARGE. NOW.', col: '#ff8a7a', size: 30 })
      label(x, 790, 620, 'ORDER #1 (OF THE DAY)', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 28, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'One pastry. | Then *the whole case.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', hops: [1.6], look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      tray(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), Math.floor(clamp((lt - 0.5) / 1.2) * 6))
      label(x, 790, 1110, 'CASE: EMPTY', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 34, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Changed their order | *seven times.*', mood: lt => Math.floor(lt * 2) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const n = Math.floor(clamp((lt - 0.3) / 1.4) * 6)
      ticket(x, 790, 870, pop01(t, P.t0 + 0.2, 0.3, 2), ['latte', 'mocha', 'tea', 'latte?', 'juice', 'mocha!', 'surprise me'], n)
    } },
  { sign: 'cancer', cap: 'Brought their *own mug.* | From home.', mood: 'heart', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      drawBits(x, MUG, { K: INK, C: '#9fd8ee', H: RED }, 790, 880, 30 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1110, 'IT’S COSIER', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Name on the cup. | *With a crown.*', mood: 'sparkle', look: [1, 0], star: { x: -190 }, hops: [1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      cup(x, 790, 880, pop01(t, P.t0 + 0.2, 0.3, 2), { text: lt > 1.0 ? '♛ LEO ♛' : 'LEO', col: GOLD, size: 40 })
      sparkles(x, t, 790, 860, P.t0 + 1.4, 7, 190, 0.2)
    } },
  { sign: 'virgo', cap: 'Wiped the table | *before sitting down.*', mood: 'squint', look: [1, 0], star: { x: -190 },
    back(x, t, lt, P) { x.fillStyle = INK; x.fillRect(560, 1000, 420, 30); x.fillStyle = COFFEE; x.fillRect(566, 1004, 408, 22) },
    front(x, t, lt, P) {
      drawBits(x, BOTTLE, { K: INK, W: BONE, B: SKYB }, 800 + Math.sin(t * 6) * 60 * (lt < 1.5 ? 1 : 0), 870, 28 * pop01(t, P.t0 + 0.2, 0.3, 2))
      sparkles(x, t, 790, 980, P.t0 + 0.6, 8, 220, 0.5, [BONE, '#fff', MINT])
      label(x, 790, 640, 'TWICE.', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 40, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Couldn’t pick a milk. | Asked *the barista’s sign.*', mood: lt => lt > 1.4 ? 'sparkle' : 'wide', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      label(x, 790, 720, 'OAT? SOY? WHOLE?', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 32, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 900, 'what’s your sign?', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 38, tail: 'bl' })
      label(x, 790, 1100, 'BARISTA: VIRGO. OAT.', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 28, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Ordered off the secret menu. | *There isn’t one.*', mood: lt => lt > 1.2 ? 'wink' : 'neutral', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      cup(x, 790, 880, pop01(t, P.t0 + 0.2, 0.3, 2), { text: '???', col: '#3a2a4a', size: 54, lid: '#2a2350' })
      label(x, 790, 1120, 'THERE IS NOW.', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: '#ff6b8a', rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Came for coffee. | Left with *a plane ticket.*', mood: 'sparkle', look: [1, 0], star: { x: -190 }, hops: [0.6, 1.3],
    front(x, t, lt, P) {
      planeTicket(x, 790, 860, pop01(t, P.t0 + 0.3, 0.35, 2))
      bubble(x, 790, 1090, 'back in a month!', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 34, tail: 'tl' })
    } },
  { sign: 'capricorn', cap: 'Opened a laptop. | *Started a company.*', mood: 'squint', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      laptop(x, 790, 900, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 790, 640, 'CEO SINCE 9:14', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Invented a new drink. | *Mostly sparkles.*', mood: lt => lt > 1.1 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -190 }, hops: [1.1],
    front(x, t, lt, P) {
      cup(x, 790, 900, pop01(t, P.t0 + 0.2, 0.3, 2), { text: 'THE ♒︎', col: LAV, size: 40 })
      sparkles(x, t, 790, 680, P.t0 + 0.6, 10, 140, 0.8, [LAV, SKYB, MINT, GOLD])
      label(x, 790, 1120, 'ON THE MENU NOW', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Latte art heart. | Pisces *cried.*', mood: 'happy', tears: lt => lt < 0.9 ? 1 : 3, look: [1, 0], star: { x: -190 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      latte(x, t, 790, 880, pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 1120, 'TOO BEAUTIFUL TO DRINK', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 26, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0173', key: 'G', accent: ORANGE, ending: 'group',
  title: 'The signs | *at the coffee shop.*',
  cameos: CAMEOS,
  group: {
    cap: 'Twelve signs. | *One tired barista.*',
    draw(x, t, lt) { label(x, 540, 640, 'CLOSING EARLY TODAY', pop01(t, t - lt + 1.6, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
