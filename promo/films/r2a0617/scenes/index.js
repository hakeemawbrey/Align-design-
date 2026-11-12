// r2a0617: star_advice, ADVICE SOLO (capricorn), "Capricorn, you can | *be a beginner.*" (topic: you're allowed to be a beginner; signs3kit, lofi · F).
// One sign the whole way: nine gentle truths about a Capricorn learning something new, each with a warm reframe.
// Ending: callback (the five-year pottery plan comes back as day 30: one wobbly bowl, made by hand).
//   a five-year plan for pottery · day one is day one · asking for help · the first pancake · level 1 vs level 99
//   · practising till midnight · laughing at the oops · the wobbly first drawing (Pisces cries) · a gold star for you
//   group "Ambitious. And | *still learning.*"   last "Day 30: | *one wobbly bowl.*"
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, label, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER } from '../../signs3kit.js'
import { L, sheet, bits, friend, swapLabel, zzz, steam, confetti, RED, CREAM, STEEL, WOOD, clamp, lerp, ease, prog } from './props.js'

const ACC = '#2fc79a', S = 'capricorn', ST = { x: -190 }
const BIGSTAR = ['....Y....', '...YYY...', 'YYYYYYYYY', '.YYYWYYY.', '..YYYYY..', '.YYY.YYY.', 'YY.....YY']

// a wooden frame holding a wobbly crayon doodle of a star
function doodle(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-128, -128, 268, 268)
  x.fillStyle = INK; x.fillRect(-142, -142, 284, 284)
  x.fillStyle = '#c98f2a'; x.fillRect(-134, -134, 268, 268)
  x.fillStyle = CREAM; x.fillRect(-106, -106, 212, 212)
  x.strokeStyle = '#ff6b5a'; x.lineWidth = 9; x.lineJoin = 'round'; x.beginPath()
  for (let i = 0; i <= 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, r = (i % 2 ? 34 : 80) + Math.sin(i * 3.1) * 12; const px = Math.cos(a) * r + Math.sin(i * 5) * 6, py = Math.sin(a) * r + 8; i ? x.lineTo(px, py) : x.moveTo(px, py) }
  x.stroke()
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Five-year plan for pottery? | *Just touch the clay.*', mood: lt => lt > 1.5 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 840, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 330, h: 380, head: 'POTTERY: 5 YRS', headBg: ACC, headInk: INK, lines: ['yr 1: theory', 'yr 2: more theory', 'yr 3: buy clay', 'yr 4: touch clay'], size: 30, align: 'left', progress: prog(lt, 0.3, 1.4) })
      L(x, 800, 1100, 'OR: TODAY?', pop01(t, P.t0 + 1.6 * 1.29, 0.3, 2.2), GOLD, -0.04, 36)
    } },
  { sign: S, cap: 'Bad at it on day one? | *That’s just day one.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      L(x, 800, 700, 'DAY 1', pop01(t, P.t0 + 0.2, 0.3, 2), STEEL, 0.04, 48)
      swapLabel(x, 800, 900, lt, 1.2, 'GRADE: F?', 'GRADE: LEARNING', { size: 38, fromBg: RED, toBg: MINT })
      sparkles(x, t, 800, 900, P.t0 + 1.7 * 1.29, 7, 160, 0.3)
    } },
  { sign: S, cap: 'Asked someone for help? | *That’s a power move.*', mood: lt => lt > 1.3 ? 'sparkle' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      friend(x, t, 'gemini', 830, 980, 200, pop01(t, P.t0 + 0.2, 0.35, 2), { mood: 'sparkle', look: [-1, 0] })
      bubble(x, 790, 690, 'can you | show me?', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 40, tail: 'bl' })
      L(x, 820, 1150, 'BOSS MOVE', pop01(t, P.t0 + 1.5 * 1.29, 0.3, 2.2), GOLD, -0.04, 34)
    } },
  { sign: S, cap: 'Burned the first pancake? | *Everyone does.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) { x.save(); x.translate(800, 880); x.scale(k, k); x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 130, 52, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = '#4a2a1a'; x.beginPath(); x.ellipse(0, -4, 118, 42, 0, 0, Math.PI * 2); x.fill(); x.restore() }
      steam(x, t, 800, 820, { n: 3, alpha: clamp((lt - 0.4) / 0.4) * 0.6, h: 110 })
      L(x, 800, 1060, 'PANCAKE #1: CRISPY', pop01(t, P.t0 + 1.0 * 1.29, 0.3, 2.2), '#ffb34a', -0.04, 32)
      L(x, 800, 660, '#2: PERFECT', pop01(t, P.t0 + 1.7 * 1.29, 0.3, 2.2), MINT, 0.05, 32)
    } },
  { sign: S, cap: 'Comparing yourself to experts? | *They started here.*', mood: lt => lt > 1.5 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      L(x, 800, 720, 'YOU: LEVEL 1', pop01(t, P.t0 + 0.2, 0.3, 2), STEEL, -0.04, 38)
      L(x, 800, 860, 'THEM: LEVEL 99', pop01(t, P.t0 + 0.6, 0.3, 2), GOLD, 0.04, 38)
      L(x, 800, 1020, 'THEM, ONCE: LEVEL 1', pop01(t, P.t0 + 1.4 * 1.29, 0.3, 2.2), MINT, -0.03, 32)
    } },
  { sign: S, cap: 'Practising till midnight? | *Sleep counts too.*', mood: lt => lt > 1.3 ? 'sleepy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'CLOCK', 800, 830, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      zzz(x, t, 640, 720, { alpha: clamp((lt - 1.2) / 0.4), size: 48 })
      L(x, 800, 1060, 'PRACTICE: RESTING', pop01(t, P.t0 + 1.3 * 1.29, 0.3, 2.2), LAV, -0.04, 32)
    } },
  { sign: S, cap: 'Laughed at your own mistake? | *That’s the fun part.*', mood: lt => lt > 1.1 ? 'sparkle' : 'wide', look: [1, 0], star: ST, hops: [1.2, 1.7],
    front(x, t, lt, P) {
      bubble(x, 800, 760, 'oops! | haha', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 54, col: GOLD, tail: 'bl' })
      confetti(x, t, 800, 900, P.t0 + 1.2 * 1.29, { n: 22, spread: 260 })
      L(x, 800, 1070, 'FUN: UNLOCKED', pop01(t, P.t0 + 1.3 * 1.29, 0.3, 2.2), MINT, -0.04, 34)
    } },
  { sign: S, cap: 'Shared your wobbly first try? | *Someone loved it.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      doodle(x, t, 760, 790, pop01(t, P.t0 + 0.2, 0.3, 2))
      friend(x, t, 'pisces', 900, 1060, 170, pop01(t, P.t0 + 0.7, 0.35, 2), { mood: 'wide', look: [-1, -1], tears: 3 })
      bubble(x, 700, 1060, 'a masterpiece', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 32, col: '#b7a6ff', tail: 'br' })
    } },
  { sign: S, cap: 'No gold star today? | *Here’s one anyway.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, -1], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, BIGSTAR, { Y: GOLD, W: '#fff4c0' }, 800, 830, 26 * pop01(t, P.t0 + 0.4, 0.35, 2.2))
      sparkles(x, t, 800, 830, P.t0 + 0.9, 9, 180, 0.5)
      L(x, 800, 1070, 'FOR: TRYING', pop01(t, P.t0 + 1.3 * 1.29, 0.3, 2.2), PINK, -0.04, 36)
    } },
]

const F = makeFilm({
  id: 'r2a0617', key: 'F', accent: ACC, solo: S, ending: 'callback',
  title: 'Capricorn, you can | *be a beginner.*',
  cameos: CAMEOS,
  group: { cap: 'Ambitious. And | *still learning.*', mood: 'sparkle' },
  last: {
    text: 'Day 30: | *one wobbly bowl.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const k = pop01(t, t0 + 0.4, 0.4, 2)
      if (k > 0.01) friend(x, t, 'capricorn', 360, 1120, 320, k, { mood: lt > 1.4 ? 'heart' : 'happy', look: [1, 0], hops: [t0 + 1.4] })
      bits(x, 'BOWL', 740, 1100, 24 * pop01(t, t0 + 0.7, 0.3, 2), { rot: 0.1 })
      L(x, 740, 1270, 'MADE IT MYSELF', pop01(t, t0 + 1.3, 0.3, 2.4), ACC, -0.04, 34)
      sparkles(x, t, 740, 1100, t0 + 1.2, 8, 170, 0.4)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
