// r2a0691: star_advice, ADVICE SOLO (capricorn), "Capricorn, it’s okay | *to start over.*" (signs3kit, lofi · D).
// Nine gentle truths for a Capricorn starting again, each with a warm reframe and one light gag. Ending: callback.
//   plan A flopped, B is still a plan · new career later, right on time · moved back home = regroup · starting from zero,
//   skills kept · goals_v1 deleted, goals_v2 · feel behind, no deadline · Saturn return, fresh-start season
//   · old goals don't fit, outgrown · beginner again, base camp
//   group "New start. | *Same strong you.*"
//   callback "Plan B? | Now it’s *Plan A.*" (card 1's sheet comes back, relabelled)
import { makeFilm, sparkles, hearts, bubble, label, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { L, sheet, bits, chart, swapLabel, RED, CREAM, STEEL, WOOD, NIGHT, PLUM, clamp, lerp, ease, prog } from './props.js'

const ACC = '#c9a6ff', S = 'capricorn', ST = { x: -190 }

const MOUNT = ['......W......', '.....WWW.....', '....GGGGG....', '...GGGGGGG...', '..GGGGGGGGG..', '.GGGGGGGGGGG.', 'GGGGGGGGGGGGG']
const MOUNT_C = { W: '#ffffff', G: STEEL }
const FLAG = ['RRRR', 'RRR.', 'K...', 'K...', 'K...']

function laptop(x, cx, cy, k, file, { strike = 0, rot = 0.04 } = {}) {
  if (k <= 0.01) return
  bits(x, 'LAPTOP', cx, cy, 24 * k, { rot })
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText(file, 0, -36)
  if (strike > 0) { x.strokeStyle = RED; x.lineWidth = 7; x.beginPath(); x.moveTo(-110, -36); x.lineTo(-110 + 220 * clamp(strike), -36); x.stroke() }
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Plan A flopped? | *B is still a plan.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 830, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 320, h: 300, head: 'THE PLAN', headBg: ACC, headInk: INK, lines: ['step 1: win', 'step 2: win', 'step 3: ???'], size: 32, align: 'left' })
      swapLabel(x, 800, 1070, lt, 1.2, 'PLAN A', 'PLAN B ✦', { size: 36 })
    } },
  { sign: S, cap: 'New career later? | *Right on time.*', mood: lt => lt > 1.3 ? 'sparkle' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'CLOCK', 800, 830, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 1070, 'RIGHT ON TIME ✦', pop01(t, P.t0 + 1.1, 0.3, 2.2), MINT, -0.04, 26)
      sparkles(x, t, 800, 830, P.t0 + 1.2, 6, 160, 0.3)
    } },
  { sign: S, cap: 'Moved back home? | That’s a *regroup.*', mood: lt => lt > 1.2 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'HOUSE', 800, 840, 34 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 1070, 'HQ: TEMPORARY', pop01(t, P.t0 + 1.0, 0.3, 2.2), GOLD, 0.04, 32)
      bubble(x, 800, 620, 'welcome back!', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 38, col: PINK, tail: 'bl' })
    } },
  { sign: S, cap: 'Starting from zero? | *You keep the skills.*', mood: lt => lt > 1.4 ? 'sparkle' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'BACKPACK', 800, 850, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 640, 'LEVEL 1', pop01(t, P.t0 + 0.7, 0.3, 2.2), STEEL, -0.05, 36)
      L(x, 800, 1080, 'SKILLS: ALL PACKED', pop01(t, P.t0 + 1.4, 0.3, 2.2), MINT, 0.04, 30)
    } },
  { sign: S, cap: 'Deleted the spreadsheet? | *Start a fresh one.*', mood: lt => lt > 1.5 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (lt < 1.4) laptop(x, 800, 860, k, 'goals_v1', { strike: (lt - 0.6) / 0.5 })
      else laptop(x, 800, 860, k, 'goals_v2 ✦')
      sparkles(x, t, 800, 820, P.t0 + 1.4, 6, 170, 0.6)
      L(x, 800, 1090, 'BLANK = POSSIBLE', pop01(t, P.t0 + 2.0, 0.3, 2.2), GOLD, -0.04, 30)
    } },
  { sign: S, cap: 'Feel behind everyone? | *There’s no deadline.*', mood: lt => lt > 1.3 ? 'happy' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 830, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 300, h: 260, head: 'LIFE DEADLINE', headBg: RED, headInk: CREAM, lines: ['', 'none.'], size: 56 })
      bubble(x, 800, 1080, 'oh. phew.', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 40, col: MINT, tail: 'bl' })
    } },
  { sign: S, cap: 'Saturn return hit? | It’s *fresh-start season.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      chart(x, 800, 830, 140, pop01(t, P.t0 + 0.2, 0.35, 2), t)
      L(x, 800, 1070, 'SATURN: RESET', pop01(t, P.t0 + 1.2, 0.3, 2.2), ACC, 0.04, 28)
      bubble(x, 790, 610, 'new chapter?', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: S, cap: 'Old goals don’t fit? | You *outgrew* them.', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'BOX', 800, 870, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 860, 'OLD GOALS', pop01(t, P.t0 + 0.5, 0.3, 2.2), CREAM, -0.03, 30)
      L(x, 800, 1080, 'SIZE: OUTGROWN', pop01(t, P.t0 + 1.4, 0.3, 2.2), MINT, 0.04, 32)
    } },
  { sign: S, cap: 'Beginner again? | Goats start *at the bottom.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, MOUNT, MOUNT_C, 800, 840, 28 * k)
      drawBits(x, FLAG, { R: RED, K: INK }, 820, 700, 12 * pop01(t, P.t0 + 0.9, 0.3, 2.4))
      L(x, 800, 1070, 'BASE CAMP ✦', pop01(t, P.t0 + 1.3, 0.3, 2.2), GOLD, -0.04, 34)
    } },
]

const F = makeFilm({
  id: 'r2a0691', key: 'D', accent: ACC, solo: S, ending: 'callback',
  title: 'Capricorn, it’s okay | *to start over.*',
  cameos: CAMEOS,
  group: { cap: 'New start. | *Same strong you.*', mood: 'heart' },
  last: {
    text: 'Plan B? | Now it’s *Plan A.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.5, 0.4, 2)
      sheet(x, 540, 1060, k, { w: 480, h: 400, rot: -0.03, head: 'THE PLAN', headBg: ACC, headInk: INK, lines: ['step 1: begin', 'step 2: keep going', 'step 3: proud'], size: 42, align: 'left' })
      label(x, 540, 1290, 'PLAN A ✦', pop01(t, t - lt + 1.2, 0.3, 2.4), { size: 40, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 540, 1060, t - lt + 1.3, 8, 240, 0.3)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
