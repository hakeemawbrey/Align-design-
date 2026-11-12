// r2a0200: star_advice, ADVICE ROLL CALL, "Each sign hears | your good news." (~54 s vertical, signs3kit social cut, lofi · G)
// Twelve signs in zodiac order: how each one handles a friend's good news, one warm, specific line each. Ending: group.
//   0.0–3.6    "Each sign hears | *your good news.*"
//   3.6–49.2   ♈ already planning the party · ♉ shows up with a cake, immediately · ♊ tells everyone, kindly, loudly
//              · ♋ a hug so long it counts as two · ♌ hands you the spotlight, gladly · ♍ a plan to keep you winning
//              · ♎ already picked your outfit for it · ♏ quietly proud, saves it forever · ♐ books a trip to celebrate
//              · ♑ checked your chart: "saw it coming" · ♒ invents a holiday in your name · ♓ cries happier than you do
//  49.2        GROUP ENDING: "Your win? | *Their favourite day.*"  The twelve fly up into a group photo, confetti falls.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', ORANGE = '#ffb34a', SUN = '#ffd86a'

const TROPHY = ['YYYYYYYY', 'YYYYYYYY', 'YYYYYYYY', '.YYYYYY.', '..YYYY..', '...YY...', '...YY...', '.YYYYYY.']
const MEGA = ['.......KK', '.....KKMK', 'KKKKKMMMK', 'KWWKMMMMK', 'KWWKMMMMK', 'KKKKKMMMK', '.....KKMK', '.......KK']
const DRESS = ['...KK...', '..K..K..', '..DDDD..', '.DDDDDD.', '..DDDD..', '.DDDDDD.', 'DDDDDDDD', 'DDDDDDDD', 'DDDDDDDD']
function box(x, cx, cy, w, h, k, fillC, rot = 0) {
  if (k <= 0.01) return false
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = fillC; x.fillRect(-w / 2, -h / 2, w, h)
  return true
}
function text(x, s, X, Y, size, col = INK, font = INTER, weight = 800) { x.fillStyle = col; x.font = `${weight} ${size}px ${font}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(s, X, Y) }
function confetti(x, t, y0, t0, spread = 860) {
  if (t < t0) return
  const cols = [PINK, MINT, SKYB, GOLD, LAV, ORANGE]
  for (let i = 0; i < 40; i++) {
    const ph = ((t - t0) * 0.35 + (i * 0.137) % 1) % 1
    x.fillStyle = cols[i % 6]; x.save(); x.translate(540 + ((i * 97) % spread) - spread / 2, y0 + ph * 900); x.rotate(t * 3 + i); x.fillRect(-12, -7, 24, 14); x.restore()
  }
}

const CAMEOS = [
  { sign: 'aries', cap: 'Already planning | *the party.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [0.5, 1.0],
    front(x, t, lt, P) {
      label(x, 790, 760, 'PARTY: TONIGHT', pop01(t, P.t0 + 0.3, 0.3, 2.4), { size: 36, bg: '#ff6b4a', rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 790, 960, 'who’s coming?? | everyone!!', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Shows up with cake. | *Immediately.*', mood: 'heart', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 930); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-156, -26, 312, 112); x.fillStyle = '#ffd9e6'; x.fillRect(-150, -20, 300, 100)
        x.fillStyle = PINK; for (let i = 0; i < 8; i++) x.fillRect(-150 + i * 38, -20, 22, 18 + (i % 2) * 8)
        x.fillStyle = INK; x.fillRect(-7, -86, 14, 64); x.fillStyle = SKYB; x.fillRect(-4, -82, 8, 58)
        x.fillStyle = ORANGE; x.fillRect(-6, -112, 12, 22)
        x.restore()
      }
      label(x, 790, 700, 'ARRIVED: 4 MIN', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Tells everyone. | *Kindly. Loudly.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, squash: lt => 0.03 * Math.sin(lt * 18),
    front(x, t, lt, P) {
      drawBits(x, MEGA, { K: INK, M: '#ffd23a', W: '#fff' }, 790, 880, 28 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: -0.1 })
      label(x, 790, 1100, 'SHARED WITH: ALL', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: '#ffd23a', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'A hug so long | *it counts as two.*', mood: 'heart', look: [1, 0], star: { x: -110 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'virgo', 700, 900, 220 * k, { mood: 'heart', look: [-1, 0], seed: 61, glyph: false })
      hearts(x, t, 560, 760, P.t0 + 0.8, { n: 6, life: 2.2, spread: 200, cell: 7, seed: 2 })
      label(x, 760, 650, 'HUG: STILL GOING', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: '#cfe0ff', rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Hands you the spotlight. | *Gladly.*', mood: 'heart', look: [1, 0], star: { x: -200 },
    back(x, t, lt, P) {
      const k = clamp((lt - 0.4) / 0.5)
      x.save(); x.globalAlpha = 0.4 * k; x.fillStyle = '#fff1c8'
      x.beginPath(); x.moveTo(760, 470); x.lineTo(840, 470); x.lineTo(990, 1180); x.lineTo(610, 1180); x.closePath(); x.fill()
      x.restore()
    },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'aquarius', 800, 960, 210 * k, { mood: lt > 1.0 ? 'sparkle' : 'wide', look: [-1, 0], seed: 63, glyph: false, hops: [P.t0 + 1.3] })
      sparkles(x, t, 800, 900, P.t0 + 1.0, 7, 170, 0.4)
      label(x, 800, 660, 'STAR: YOU', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 36, bg: ORANGE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Makes a plan | *to keep you winning.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      if (box(x, 790, 880, 300, 340, pop01(t, P.t0 + 0.2, 0.35, 2), BONE, 0.04)) {
        x.fillStyle = MINT; x.fillRect(-150, -170, 300, 56); text(x, 'THE PLAN', 0, -142, 28, INK, MONO, 700)
        const items = ['1. celebrate', '2. rest', '3. win again']
        const n = Math.floor(clamp((lt - 0.4) / 1.3) * 3.99)
        x.textAlign = 'left'; items.slice(0, n).forEach((s, i) => { x.fillStyle = INK; x.font = `800 34px ${INTER}`; x.textAlign = 'left'; x.fillText(s, -124, -60 + i * 70) })
        x.restore()
      }
    } },
  { sign: 'libra', cap: 'Already picked | *your outfit for it.*', mood: 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, DRESS, { K: INK, D: PINK }, 790, 880, 30 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: 0.05 * Math.sin(t * 2) })
      sparkles(x, t, 790, 860, P.t0 + 1.0, 7, 180, 0.6)
      label(x, 790, 1120, 'ICONIC, OBVIOUSLY', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 28, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Quietly proud. | *Saves it forever.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      if (box(x, 790, 860, 260, 300, pop01(t, P.t0 + 0.2, 0.35, 2), '#b8243a', -0.04)) {
        x.fillStyle = '#fbf7ee'; x.fillRect(-100, -110, 200, 160)
        drawBits(x, TROPHY, { Y: GOLD }, 0, -30, 12)
        text(x, 'YOUR BIG DAY', 0, 100, 24, '#fbf7ee', MONO, 700)
        x.restore()
      }
      label(x, 790, 1100, 'SAVED: FOREVER', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: '#ff6b8a', rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Books a trip | *to celebrate.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [0.8, 1.5],
    front(x, t, lt, P) {
      if (box(x, 790, 880, 330, 170, pop01(t, P.t0 + 0.2, 0.35, 2), '#fbf7ee', 0.06)) {
        x.fillStyle = '#c58bff'; x.fillRect(-165, -85, 70, 170)
        text(x, 'TICKET', 40, -40, 30, INK, MONO, 700); text(x, 'TO: FUN', 40, 20, 40)
        x.restore()
      }
      label(x, 790, 1080, 'LEAVING: FRIDAY', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Checked your chart. | *“Saw it coming.”*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 850); x.scale(k, k); x.rotate(t * 0.15)
        x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 136, 0, 7); x.fill(); x.fillStyle = '#fbf7ee'; x.beginPath(); x.arc(0, 0, 126, 0, 7); x.fill()
        x.strokeStyle = '#2f8a6a'; x.lineWidth = 3; x.beginPath(); x.arc(0, 0, 86, 0, 7); x.stroke()
        for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; x.beginPath(); x.moveTo(Math.cos(a) * 86, Math.sin(a) * 86); x.lineTo(Math.cos(a) * 126, Math.sin(a) * 126); x.stroke() }
        x.restore()
        drawBits(x, ['.Y.', 'YYY', '.Y.'], { Y: GOLD }, 790, 850, 22 * k)
      }
      label(x, 790, 1080, 'CALLED IT', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Invents a holiday | *in your name.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -170 }, hops: [1.2],
    front(x, t, lt, P) {
      if (box(x, 790, 870, 280, 300, pop01(t, P.t0 + 0.2, 0.35, 2), BONE, -0.04)) {
        x.fillStyle = SKYB; x.fillRect(-140, -150, 280, 64); text(x, 'NEW HOLIDAY', 0, -118, 26, INK, MONO, 700)
        text(x, 'YOU', 0, 0, 92); text(x, 'DAY', 0, 90, 60, '#5aa8d8')
        x.restore()
      }
    } },
  { sign: 'pisces', cap: 'Cries happier | *than you do.*', mood: 'heart', tears: 3, look: [1, 0], star: { x: -170 }, hops: [1.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'leo', 820, 960, 180 * k, { mood: 'wide', look: [-1, 0], seed: 67, glyph: false })
      bubble(x, 800, 680, 'SO PROUD!!', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 40, col: LAV, tail: 'bl' })
      label(x, 820, 1140, 'TISSUES: OUT', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0200', key: 'G', accent: SUN, ending: 'group',
  title: 'Each sign hears | *your good news.*',
  cameos: CAMEOS,
  group: {
    cap: 'Your win? | *Their favourite day.*',
    draw(x, t, lt) { confetti(x, t, 560, t - lt + 1.0) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
