// r2a0763: star_advice, ADVICE SOLO (leo), "Leo, you're allowed | to be a beginner." (signs3kit social cut, lofi · C).
// Ending: lesson. Nine first-time moments, each a gentle reframe for the sign that hates not being great yet.
//   wonky first painting (still yours) · don't know the steps (dance anyway) · asked a question (brave, not dumb)
//   · burned the pancakes (breakfast still counts) · no spotlight today (you still glow) · need help (even stars ask)
//   · lost the game (learned the rules) · slow sprout (still growing) · wear the L plate with pride
//   group "Brand new. | *Still shining.*"   LESSON "Every star | *started small.*" LEVEL: GROWING
//   last "Beginner Leo? | *Still iconic.*"
import { makeFilm, sparkles, hearts, bubble, notes, pop01, drawBits, signChar, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { L, sheet, bits, friend, RED, CREAM, STEEL, WOOD, clamp, lerp, ease, prog } from './props.js'

const S = 'leo', ACC = '#ffb34a', ST = { x: -170 }

const SPROUT = ['...G.G...', '..GGGGG..', '...GGG...', '....G....', '....G....', '.PPPPPPP.', '..PPPPP..', '..PPPPP..']
const SPROUT_C = { G: '#5fd068', P: '#c97a4a' }
const DICE = ['KKKKKKK', 'KWWWWWK', 'KWKWWWK', 'KWWKWWK', 'KWWWKWK', 'KWWWWWK', 'KKKKKKK']
const DICE_C = { K: INK, W: CREAM }

/** the learner "L" plate: white square, red L */
function lplate(x, cx, cy, k, rot = -0.06) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-104, -96, 220, 220)
  x.fillStyle = INK; x.fillRect(-116, -116, 232, 232); x.fillStyle = '#ffffff'; x.fillRect(-106, -106, 212, 212)
  x.fillStyle = RED; x.fillRect(-50, -70, 36, 140); x.fillRect(-50, 34, 100, 36)
  x.restore()
}
/** a wonky first painting: crooked sun, a lopsided cat */
function wonky(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.08); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-150, -130, 300, 260); x.fillStyle = WOOD; x.fillRect(-142, -122, 284, 244)
  x.fillStyle = CREAM; x.fillRect(-124, -104, 248, 208)
  x.fillStyle = '#ffd23a'; x.fillRect(50, -84, 44, 30); x.fillRect(58, -94, 30, 50)
  x.fillStyle = '#ff9a4a'; x.fillRect(-80, -10, 90, 64); x.fillRect(-76, -34, 20, 26); x.fillRect(-20, -26, 18, 18)
  x.fillStyle = INK; x.fillRect(-60, 6, 10, 10); x.fillRect(-26, 14, 10, 10); x.fillRect(10, 30, 50, 8)
  x.fillStyle = '#5fd068'; x.fillRect(-124, 70, 248, 34)
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Wonky first painting? | *Still yours.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      wonky(x, t, 790, 830, pop01(t, P.t0 + 0.2, 0.35, 2))
      L(x, 790, 1080, 'MASTERPIECE (V1)', pop01(t, P.t0 + 1.2, 0.3, 2.4), GOLD, -0.04, 32)
    } },
  { sign: S, cap: 'Don’t know the steps? | *Dance anyway.*', mood: lt => lt > 1.0 ? 'sparkle' : 'wide', star: ST, hops: [0.6, 1.0, 1.4, 1.8],
    squash: lt => 0.06 * Math.sin(lt * 9),
    front(x, t, lt, P, F) {
      notes(x, t, 790, 900, { n: 5, cell: 8, col: ACC, seed: 3 })
      L(x, 790, 680, 'STEP 1 OF ???', pop01(t, P.t0 + 0.3, 0.3, 2), PINK, 0.05, 36)
      L(x, 790, 1080, 'VIBES: CORRECT', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, -0.04, 34)
    } },
  { sign: S, cap: 'Asked a “silly” question? | *That’s brave.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'um… how do | i start?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, tail: 'bl' })
      L(x, 790, 960, 'GREAT QUESTION ✦', pop01(t, P.t0 + 1.2, 0.3, 2.4), GOLD, 0.05, 36)
      sparkles(x, t, 790, 960, P.t0 + 1.3, 6, 170, 0.2)
    } },
  { sign: S, cap: 'Burned the pancakes? | *Breakfast still counts.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      bits(x, 'PLATE', 790, 960, 18 * k)
      for (let i = 0; i < 3; i++) { if (k <= 0.01) break; x.fillStyle = INK; x.fillRect(790 - 92, 900 - i * 34, 184, 30); x.fillStyle = i === 2 ? '#5a3420' : '#8a5a32'; x.fillRect(790 - 86, 904 - i * 34, 172, 22) }
      x.save(); x.fillStyle = STEEL
      for (let i = 0; i < 3; i++) { const ph = ((t * 0.7 + i / 3) % 1); x.globalAlpha = 0.6 * Math.sin(Math.PI * ph) * k; x.fillRect(760 + i * 30, 820 - ph * 140, 16, 16) }
      x.restore()
      L(x, 790, 640, 'CHEF: IN TRAINING', pop01(t, P.t0 + 1.1, 0.3, 2.4), ACC, 0.05, 32)
    } },
  { sign: S, cap: 'No spotlight today? | You *still glow.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', star: ST, hops: [1.3],
    back(x, t, lt, P, F) {
      const g = ease.outCubic(prog(lt, 1.0, 1.6))
      if (g > 0) { x.save(); x.globalAlpha = 0.35 * g; x.fillStyle = '#fff1b0'; x.beginPath(); x.arc(F.x, F.cy, 200, 0, Math.PI * 2); x.fill(); x.restore() }
    },
    front(x, t, lt, P) {
      bits(x, 'LAMP', 800, 880, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { alpha: 0.55 })
      L(x, 800, 700, 'SPOTLIGHT: OFF', pop01(t, P.t0 + 0.4, 0.3, 2), STEEL, 0.05, 32)
      L(x, 800, 1060, 'GLOW: BUILT-IN', pop01(t, P.t0 + 1.3, 0.3, 2.4), GOLD, -0.04, 34)
    } },
  { sign: S, cap: 'Need help? | *Even stars ask.*', mood: lt => lt > 1.2 ? 'heart' : 'squint', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      friend(x, t, 'virgo', 820, 980, 200, pop01(t, P.t0 + 0.4, 0.35, 2), { mood: 'happy', look: [-1, 0], hops: [P.t0 + 1.2] })
      bubble(x, 800, 760, 'i got you', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 40, tail: 'bc' })
      L(x, 800, 620, 'MATCH: STUDY BUDDY', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, 0.05, 28)
    } },
  { sign: S, cap: 'Lost the game? | You *learned the rules.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      const roll = Math.floor(lt * 6) % 4
      drawBits(x, DICE, DICE_C, 730, 900, 16 * k, { rot: lt < 1 ? roll * 0.4 : 0.1 })
      drawBits(x, DICE, DICE_C, 860, 930, 16 * k, { rot: lt < 1 ? -roll * 0.5 : -0.15 })
      L(x, 790, 700, 'SCORE: LAST', pop01(t, P.t0 + 0.6, 0.3, 2), STEEL, 0.05, 34)
      L(x, 790, 1090, 'RULES: KNOWN NOW', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, -0.04, 32)
    } },
  { sign: S, cap: 'Slow progress? | *Still progress.*', mood: lt => lt > 1.5 ? 'sparkle' : 'neutral', look: [1, 1], star: ST,
    front(x, t, lt, P) {
      const g = 0.6 + 0.8 * ease.outCubic(prog(lt, 0.4, 2.0))
      drawBits(x, SPROUT, SPROUT_C, 790, 1040 - 4 * 18 * g, 18 * g * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 650, `DAY ${1 + Math.floor(clamp((lt - 0.4) / 1.6) * 29)}`, pop01(t, P.t0 + 0.3, 0.3, 2), MINT, 0.05, 40)
      sparkles(x, t, 790, 860, P.t0 + 2.0, 6, 150, 0.4)
    } },
  { sign: S, cap: 'Wear the “L” | *with pride.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      lplate(x, 790, 850, pop01(t, P.t0 + 0.3, 0.35, 2))
      L(x, 790, 1080, 'L FOR LEARNING ✦', pop01(t, P.t0 + 1.2, 0.3, 2.4), GOLD, -0.04, 32)
      sparkles(x, t, 790, 850, P.t0 + 0.7, 7, 180, 0.6)
    } },
]

const F = makeFilm({
  id: 'r2a0763', key: 'C', accent: ACC, solo: S, ending: 'lesson',
  title: 'Leo, you’re allowed | *to be a beginner.*',
  cameos: CAMEOS,
  group: { cap: 'Brand new. | *Still shining.*', mood: 'sparkle' },
  lesson: { text: 'Every star | *started small.*', chip: 'LEVEL: GROWING' },
  last: {
    text: 'Beginner Leo? | *Still iconic.*',
    draw(x, t, lt) {
      lplate(x, 790, 1120, pop01(t, t - lt + 0.9, 0.35, 2) * 0.75, 0.08)
      sparkles(x, t, 790, 1120, t - lt + 1.2, 7, 150, 0.4)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
