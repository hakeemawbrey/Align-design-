// r2t0692: star_talk, ROLLCALL (twelve signs), "The signs | *as teachers.*" (signs3kit social cut, music: lofi · E).
// Aries: pop quiz on day one · Taurus: period 3 is lunch · Gemini: six subjects, one sentence · Cancer: snacks, everyone
// is "sweetie" · Leo: every lesson a one-Leo musical · Virgo: corrected the textbook in red pen · Libra: seating chart
// by compatibility · Scorpio: knew who cheated before the test · Sagittarius: field trip, bring a passport
// · Capricorn: homework over summer break · Aquarius: teaches in their own language · Pisces: cried grading essays.
// Ending: lesson. "Every sign teaches | *something good.*" CLASS: DISMISSED, then "Homework: | *hug a Pisces.*"
import { makeFilm, sparkles, hearts, bubble, notes, signChar, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { L, sheet, bits, friend, RED, CREAM, STEEL, NIGHT, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ffd23a', ST = { x: -180 }
const CHALK = '#2f5a45'
// a chalkboard with lines of chalk text
function board(x, cx, cy, k, lines, { size = 34, rot = 0.03, w = 340, h = 250, font = INTER } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 12, -h / 2 + 14, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 14, -h / 2 - 14, w + 28, h + 28)
  x.fillStyle = '#8a4a2e'; x.fillRect(-w / 2 - 8, -h / 2 - 8, w + 16, h + 16)
  x.fillStyle = CHALK; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = '#eaf4ea'; x.font = `700 ${size}px ${font}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  lines.forEach((l, i) => x.fillText(l, 0, -h / 2 + 50 + i * size * 1.4))
  x.restore()
}
const SPOT = ['..YYYY..', '.YYYYYY.', 'YYYYYYYY', '...KK...', '...KK...']

const CAMEOS = [
  { sign: 'aries', cap: 'Pop quiz. | On *day one.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      sheet(x, 800, 840, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 300, h: 300, head: 'POP QUIZ!', headBg: RED, headInk: CREAM, lines: ['1. your name?', '2. ready??', '3. GO'], size: 32, align: 'left' })
      bubble(x, 800, 1090, 'pencils up!', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Every period | is *snack period.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'SANDWICH', 800, 860, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      board(x, 800, 640, pop01(t, P.t0 + 0.5, 0.3, 2), ['TODAY: LUNCH'], { size: 34, h: 100, w: 320 })
      L(x, 800, 1080, 'PERIOD 3: ALSO LUNCH', pop01(t, P.t0 + 1.4, 0.3, 2.2), GOLD, -0.04, 28)
    } },
  { sign: 'gemini', cap: 'Taught six subjects | in *one sentence.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      board(x, 800, 820, pop01(t, P.t0 + 0.2, 0.3, 2), ['math, so like,', 'history, which', 'is basically art…'].slice(0, 1 + Math.floor(clamp((lt - 0.3) / 1.0) * 2.99)), { size: 32 })
      L(x, 800, 1070, 'TOPIC: YES', pop01(t, P.t0 + 1.5, 0.3, 2.2), '#ffe76a', 0.04, 34)
    } },
  { sign: 'cancer', cap: 'Brought snacks. | Everyone’s *“sweetie.”*', mood: lt => lt > 1.0 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'COOKIE', 800, 850, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 800, 640, 'eat up, sweetie', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 38, col: PINK, tail: 'bl' })
      L(x, 800, 1080, 'EVEN THE PRINCIPAL', pop01(t, P.t0 + 1.6, 0.3, 2.2), CREAM, -0.04, 28)
    } },
  { sign: 'leo', cap: 'Every lesson? | A *one-Leo musical.*', mood: 'sparkle', star: ST, hops: [0.9, 1.7],
    back(x, t, lt, P) {
      x.save(); x.globalAlpha = 0.22 * pop01(t, P.t0 + 0.2, 0.3, 2); x.fillStyle = '#fff1b0'
      x.beginPath(); x.moveTo(330, 460); x.lineTo(390, 460); x.lineTo(500, 1080); x.lineTo(220, 1080); x.fill(); x.restore()
    },
    front(x, t, lt, P) {
      drawBits(x, SPOT, { Y: '#ffe76a', K: INK }, 360, 520, 12 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 3.14 })
      notes(x, t, 760, 900, { n: 4, cell: 8, col: GOLD, seed: 2 })
      L(x, 800, 700, 'ACT TWO: FRACTIONS', pop01(t, P.t0 + 0.9, 0.3, 2.2), GOLD, 0.04, 28)
      bubble(x, 800, 1070, 'encore!', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'virgo', cap: 'Corrected the textbook. | *In red pen.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      bits(x, 'BOOK', 800, 850, 30 * k, { rot: 0.04 })
      if (k > 0.5) { x.save(); x.strokeStyle = RED; x.lineWidth = 8; x.lineCap = 'round'; const p = clamp((lt - 0.5) / 0.8)
        for (let i = 0; i < 3; i++) { if (p * 3 < i) break; const q = clamp(p * 3 - i); x.beginPath(); x.moveTo(680, 790 + i * 50); x.lineTo(680 + 240 * q, 800 + i * 50); x.stroke() } x.restore() }
      L(x, 800, 1080, 'TYPOS: FIXED (ALL)', pop01(t, P.t0 + 1.5, 0.3, 2.2), RED, -0.04, 28, )
    } },
  { sign: 'libra', cap: 'Seating chart? | Sorted by *compatibility.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      const IDS = ['aries', 'libra', 'cancer', 'pisces']
      IDS.forEach((id, i) => friend(x, t, id, 720 + (i % 2) * 170, 760 + Math.floor(i / 2) * 170, 120, pop01(t, P.t0 + 0.3 + i * 0.15, 0.3, 2), { mood: 'heart', tears: id === 'pisces' ? 1 : 0 }))
      if (lt > 1.2) hearts(x, t, 805, 780, P.t0 + 1.2, { n: 4, life: 1.4, spread: 160, cell: 6, seed: 3 })
      L(x, 800, 1090, 'TABLE 1: ALIGNED', pop01(t, P.t0 + 1.5, 0.3, 2.2), PINK, 0.04, 30)
    } },
  { sign: 'scorpio', cap: 'Knew who cheated. | *Before the test.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'LENS', 800, 840, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.1 })
      bubble(x, 800, 630, 'interesting.', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 40, tail: 'bl' })
      L(x, 800, 1080, 'I SEE ALL', pop01(t, P.t0 + 1.5, 0.3, 2.4), '#ff5a7a', 0.04, 36)
    } },
  { sign: 'sagittarius', cap: 'Field trip. | *Bring a passport.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      bits(x, 'PLANE', 800 + lt * 30, 820 - lt * 20, 28 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.2 })
      L(x, 800, 1060, 'PERMISSION SLIP:', pop01(t, P.t0 + 0.9, 0.3, 2.2), CREAM, -0.04, 28)
      L(x, 800, 1130, 'SEE YOU IN MARCH', pop01(t, P.t0 + 1.5, 0.3, 2.2), '#ffb34a', 0.04, 28)
    } },
  { sign: 'capricorn', cap: 'Homework due | *over summer break.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      for (let i = 0; i < 4; i++) bits(x, 'PAPERS', 800 + (i % 2 ? 10 : -10), 980 - i * 70, 18 * pop01(t, P.t0 + 0.2 + i * 0.15, 0.25, 2))
      L(x, 800, 640, 'DUE: DAY 1 OF BREAK', pop01(t, P.t0 + 1.2, 0.3, 2.2), MINT, -0.04, 28)
    } },
  { sign: 'aquarius', cap: 'Teaches in | *their own language.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      board(x, 800, 820, pop01(t, P.t0 + 0.2, 0.3, 2), ['zorp + flim', '= blarg', '(obviously)'], { size: 36, font: MONO })
      bubble(x, 800, 1070, 'any questions?', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'Grading essays. | *Crying at all of them.*', tears: lt => lt > 0.6 ? 3 : 2, mood: 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'PAPERS', 800, 830, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.05 })
      L(x, 800, 1060, 'A+ FOR FEELINGS', pop01(t, P.t0 + 1.0, 0.3, 2.2), SKYB, 0.04, 32)
      bits(x, 'TISSUE', 640, 1040, 12 * pop01(t, P.t0 + 1.5, 0.3, 2))
    } },
]

const F = makeFilm({
  id: 'r2t0692', key: 'E', accent: ACC, ending: 'lesson',
  title: 'The signs | *as teachers.*',
  cameos: CAMEOS,
  group: { cap: 'Class is | *in session.*', moods: ['sparkle', 'heart', 'wink', 'heart', 'sparkle', 'squint', 'heart', 'squint', 'sparkle', 'neutral', 'sparkle', 'wide'] },
  lesson: { text: 'Every sign teaches | *something good.*', chip: 'CLASS: DISMISSED' },
  last: { text: 'Homework: | *hug a Pisces.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
