// r2a0159: star_advice ADVICE ROLLCALL, "Each sign’s | *exam reminder.*" (topic: exam-week reminder) (~61 s vertical, signs3kit social cut,
// music: lofi · E). Twelve signs in zodiac order; one warm, specific reminder per sign with a light visual gag:
//   ♈ read the question twice · ♉ snack breaks count · ♊ one tab, just one · ♋ call home, then study · ♌ no crowd needed
//   to shine · ♍ done beats perfect · ♎ pick an answer, trust it · ♏ study hard, then sleep · ♐ the trip can wait
//   · ♑ a B is not a disaster · ♒ your weird method works · ♓ cry, drink water, page twelve
//  49.2   "You’ve got | *this.*"  group photo
//  52.4   LESSON UNLOCKED: "One page at a time | *still adds up.*"  STATUS: READY
//  58.3   "Good luck. | *You’re ready.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, HEART,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const SAGE = '#9be3a6', RED = '#e23d4e', ORANGE = '#ffb34a', BROWN = '#8a4a2e'
const ST = { x: -170 }

const COOKIE = ['..CCCC..', '.CkCCCC.', 'CCCCkCCC', 'CkCCCCkC', 'CCCkCCCC', '.CCCCkC.', '..CCCC..']
const MOON = ['..YYYY..', '.YYY....', 'YYY.....', 'YYY.....', 'YYY.....', '.YYY....', '..YYYY..']
const SUITCASE = ['...KKKK...', '...K..K...', 'OOOOOOOOOO', 'OKOOOOOOKO', 'OOOOOOOOOO', 'OKOOOOOOKO', 'OOOOOOOOOO', '.K......K.']
const LAMP = ['..YYYYYY..', '.YYYYYYYY.', 'YYYYYYYYYY', '....KK....', '....KK....', '....KK....', '..KKKKKK..']

function sheet(x, cx, cy, w, h, bg, k, rot = 0) {
  if (k <= 0.01) return false
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  return true
}
function txt(x, s, px, py, size, col = INK, font = INTER, weight = 800) {
  x.fillStyle = col; x.font = `${weight} ${size}px ${font}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(s, px, py)
}

const CAMEOS = [
  { sign: 'aries', cap: 'Slow down. | *Read it twice.*', mood: lt => lt > 1.2 ? 'squint' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (sheet(x, 800, 830, 300, 300, BONE, k, 0.03)) {
        txt(x, 'Q1.', -100, -110, 34, INK, MONO, 700)
        x.fillStyle = '#b9b0a0'; for (let i = 0; i < 4; i++) x.fillRect(-120, -60 + i * 40, i === 3 ? 140 : 240, 16)
        if (lt > 1.2) { x.strokeStyle = RED; x.lineWidth = 5; x.strokeRect(-128, -72, 256, 156) }
        x.restore()
      }
      label(x, 800, 1060, 'READ IT AGAIN', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 36, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Snack breaks count | *as studying.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, COOKIE, { C: '#e3b15a', k: BROWN }, 800, 820, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 800, 1040, 'BRAIN FOOD', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 42, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'One tab open. | *Just one.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const n = Math.max(1, 6 - Math.floor(clamp((lt - 0.6) / 0.9) * 5))
      for (let i = 0; i < n; i++) {
        const k = pop01(t, P.t0 + 0.1 + i * 0.06, 0.25, 2)
        if (sheet(x, 730 + i * 28, 720 + i * 46, 250, 170, i === n - 1 ? BONE : '#c9c9d8', k, (i % 2 ? 0.04 : -0.03))) {
          x.fillStyle = SKYB; x.fillRect(-125, -85, 250, 34); txt(x, i === 0 && n === 1 ? 'NOTES' : `TAB ${i + 1}`, 0, -68, 22, INK, MONO, 700); x.restore()
        }
      }
      if (n === 1) label(x, 790, 1050, 'FOCUS: ON', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 40, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Call home. | *Then hit the books.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (sheet(x, 800, 820, 220, 360, '#2a2350', k, 0.05)) {
        x.fillStyle = '#140c30'; x.fillRect(-96, -160, 192, 320)
        txt(x, 'HOME', 0, -110, 30, SKYB, MONO, 700); drawBits(x, HEART, { H: '#ff4f86', W: '#fff' }, 0, 0, 14)
        x.restore()
      }
      bubble(x, 800, 1060, 'you got this, hon', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 34, col: PINK, tail: 'bc' })
    } },
  { sign: 'leo', cap: 'No audience needed. | *You still shine.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, LAMP, { Y: GOLD, K: '#2a2350' }, 820, 760, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      x.save(); x.globalAlpha = 0.25 * pop01(t, P.t0 + 0.4, 0.3, 1.6); x.fillStyle = '#fff1c0'; x.beginPath(); x.moveTo(740, 800); x.lineTo(900, 800); x.lineTo(980, 1060); x.lineTo(660, 1060); x.fill(); x.restore()
      if (sheet(x, 820, 1010, 260, 70, BONE, pop01(t, P.t0 + 0.5, 0.3, 2), 0)) { txt(x, 'CHAPTER 6', 0, 0, 30, INK, MONO, 700); x.restore() }
      sparkles(x, t, 820, 900, P.t0 + 1.4, 6, 150, 0.4)
    } },
  { sign: 'virgo', cap: 'Done is better | than *perfect.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (sheet(x, 800, 820, 280, 280, BONE, k, 0.04)) {
        x.fillStyle = '#b9b0a0'; for (let i = 0; i < 5; i++) x.fillRect(-110, -100 + i * 40, 220, 14)
        if (lt > 1.3) { x.strokeStyle = '#2f8a4a'; x.lineWidth = 14; x.lineCap = 'round'; x.beginPath(); x.moveTo(-60, 10); x.lineTo(-10, 60); x.lineTo(80, -50); x.stroke() }
        x.restore()
      }
      label(x, 800, 1040, 'GOOD ENOUGH. SUBMIT.', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Pick an answer. | *Trust it.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: lt => lt > 1.3 ? [1, 0] : [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      label(x, 720, 740, 'A', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 70, bg: BONE, rot: -0.05, font: MONO, weight: 700 })
      label(x, 880, 740, 'B', pop01(t, P.t0 + 0.35, 0.3, 2), { size: 70, bg: BONE, rot: 0.05, font: MONO, weight: 700 })
      if (lt > 1.3) { x.save(); x.strokeStyle = PINK; x.lineWidth = 8; x.beginPath(); x.ellipse(880, 742, 74, 70, 0, 0, Math.PI * 2); x.stroke(); x.restore() }
      label(x, 800, 960, 'FIRST INSTINCT', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 36, bg: PINK, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Study hard. | *Then actually sleep.*', mood: lt => lt > 1.3 ? 'sleepy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, MOON, { Y: GOLD }, 820, 780, 26 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.2 })
      label(x, 800, 1020, lt > 1.3 ? 'BED: 11 PM' : 'ONE MORE PAGE…', pop01(t, P.t0 + (lt > 1.3 ? 1.3 : 0.5), 0.3, 2.4), { size: 36, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'The trip can wait. | *Two more weeks.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, SUITCASE, { O: ORANGE, K: '#2a2350' }, 800, 830, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.05 })
      label(x, 800, 1040, 'PACKED. PATIENT.', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 36, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'A B is not | *a disaster.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      label(x, 800, 790, 'B+', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 110, bg: BONE, color: RED, rot: -0.05, font: INTER, weight: 800 })
      label(x, 800, 1000, 'STILL PROUD', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 40, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
      if (lt > 1.3) sparkles(x, t, 800, 790, P.t0 + 1.3, 7, 170, 0.6)
    } },
  { sign: 'aquarius', cap: 'Your weird method? | *It works.*', mood: 'wink', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      const cols = [PINK, GOLD, MINT, SKYB, LAV, ORANGE]
      for (let i = 0; i < 6; i++) {
        const k = pop01(t, P.t0 + 0.2 + i * 0.15, 0.25, 2)
        if (sheet(x, 690 + (i % 3) * 110, 700 + Math.floor(i / 3) * 140 + (i % 2 ? 14 : 0), 90, 90, cols[i], k, (i - 2.5) * 0.06)) x.restore()
      }
      label(x, 800, 1060, 'MY SYSTEM', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 40, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Cry a little. Sip water. | *Then page twelve.*', mood: lt => lt > 1.3 ? 'happy' : 'wide', tears: lt => lt > 1.3 ? 1 : 3, look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (sheet(x, 800, 830, 240, 280, BONE, k, 0.04)) { txt(x, 'p. 12', 0, -100, 34, INK, MONO, 700); x.fillStyle = '#b9b0a0'; for (let i = 0; i < 4; i++) x.fillRect(-90, -40 + i * 40, 180, 14); x.restore() }
      label(x, 800, 1050, 'BACK TO IT', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 38, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0159', key: 'E', accent: SAGE, ending: 'lesson',
  title: 'Each sign’s | *exam reminder.*',
  cameos: CAMEOS,
  group: { cap: 'You’ve got | *this.*' },
  lesson: { text: 'One page at a time | *still adds up.*', chip: 'STATUS: READY' },
  last: {
    text: 'Good luck. | *You’re ready.*',
    draw(x, t, lt) { hearts(x, t, 540, 1150, t - lt + 0.5, { n: 8, life: 2.2, spread: 500, cell: 7, seed: 6 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
