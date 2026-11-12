// r2a0725: star_advice, ADVICE SOLO (scorpio), "Scorpio, you can't | fix everyone." (the batch hook, re-split to fit
// two lines) (signs3kit social cut, lofi · G).
// One sign the whole way: nine gentle truths for a Scorpio who takes on everyone's problems, each with a warm reframe
// and one light gag. Ending: lesson.
//   their problem is not your project (the toolbox) · you see through everyone (the magnifier) · on call at 2 a.m.
//   · some people just want to vent · carrying every secret, set some down (the heavy bag) · intensity: dial it to cozy
//   · you can water the plant, it grows on its own time · loyalty, save some for you · your chart today: off duty
//   group "Fierce heart. | *Gentle hands.*"  LESSON "You can love people | *without fixing them.*"  TOOLBOX: DOWN
//   last "Toolbox down. | *Snacks up.*"
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, friend, bits, swapLabel, chart, zzz, B, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#c97bff', S = 'scorpio', ST = { x: -190 }

const CAMEOS = [
  { sign: S, cap: 'Their problem? | *Not your project.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const down = ease.inOutCubic(clamp((lt - 1.1) / 0.5))
      bits(x, 'WRENCH', 800, lerp(860, 1040, down), 28 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: lerp(-0.4, 0, down) })
      L(x, 800, 680, 'PROJECT #12: A FRIEND', pop01(t, P.t0 + 0.5, 0.3, 2.2), STEEL, -0.04, 28)
      L(x, 800, 1140, 'BREAK: TAKEN', pop01(t, P.t0 + 1.6, 0.3, 2.4), MINT, 0.04, 32)
    } },
  { sign: S, cap: 'You see through everyone. | *Let some stay blurry.*', mood: lt => lt > 1.3 ? 'wink' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const blur = clamp((lt - 1.0) / 0.5)
      drawBits(x, B.LENS, { K: GOLD, W: '#c9c9d8', B: SKYB }, 800, 900, 32 * pop01(t, P.t0 + 0.2, 0.3, 2), { alpha: 1 - 0.3 * blur, rot: 0.1 * blur })
      swapLabel(x, 800, 680, lt, 1.1, 'ANALYSING…', 'OFF. JUST VIBES.', { size: 32, fromBg: STEEL, toBg: LAV })
    } },
  { sign: S, cap: 'On call at 2 a.m.? | *You need sleep too.*', mood: lt => lt > 1.3 ? 'sleepy' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P, F) {
      phone(x, t, 800, 880, 1.2 * pop01(t, P.t0 + 0.2, 0.3, 2), { head: '2:00 A.M.', headCol: LAV, size: 26, lines: [['help!!', PINK, pop01(t, P.t0 + 0.5, 0.25, 2.2)], ['silent mode', MINT, pop01(t, P.t0 + 1.2, 0.25, 2.2), true]] })
      if (lt > 1.3) zzz(x, t, F.x + 70, F.top - 10, { alpha: clamp((lt - 1.3) / 0.3), size: 46 })
    } },
  { sign: S, cap: 'Some just need to vent. | *Not a solution.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      friend(x, t, 'gemini', 840, 1000, 170, pop01(t, P.t0 + 0.2, 0.35, 2), { mood: lt > 1.4 ? 'happy' : 'wide', look: [-1, 0] })
      bubble(x, 800, 700, 'i just need | to rant', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 36, tail: 'br' })
      swapLabel(x, 760, 860, lt, 1.2, 'PLAN: 5 STEPS', 'PLAN: LISTEN', { size: 30, fromBg: STEEL, toBg: MINT })
    } },
  { sign: S, cap: 'Carrying every secret? | *Set some down.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: ST, squash: lt => lt < 1.2 ? 0.08 : 0,
    front(x, t, lt, P) {
      const light = clamp((lt - 1.2) / 0.4)
      drawBits(x, B.BAG, { K: INK, R: LAV, W: '#9a6fd0' }, 800, lerp(1040, 960, light), 24 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: lerp(0.08, 0, light) })
      swapLabel(x, 800, 690, lt, 1.2, 'WEIGHT: A LOT', 'WEIGHT: LIGHTER', { size: 32, fromBg: STEEL, toBg: GOLD })
    } },
  { sign: S, cap: 'Intensity is love. | *Cozy works too.*', mood: lt => lt > 1.2 ? 'heart' : 'squint', star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      const a = lerp(0.9, -0.9, ease.inOutCubic(clamp((lt - 0.7) / 0.6)))
      if (k > 0.01) {
        x.save(); x.translate(800, 940); x.scale(k, k)
        x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 130, Math.PI, 0); x.fill()
        x.fillStyle = '#ff6b5a'; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, 118, Math.PI * 1.5, 0); x.fill()
        x.fillStyle = MINT; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, 118, Math.PI, Math.PI * 1.5); x.fill()
        x.rotate(a); x.fillStyle = BONE; x.fillRect(-6, -110, 12, 110); x.restore()
      }
      swapLabel(x, 800, 700, lt, 1.0, 'INTENSITY: 100', 'INTENSITY: COZY', { size: 32, fromBg: '#ff6b5a', toBg: MINT })
    } },
  { sign: S, cap: 'Water the plant. | *It grows in its own time.*', mood: lt => lt > 1.5 ? 'sparkle' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const g = clamp((lt - 0.9) / 0.9)
      if (g < 0.5) bits(x, 'SEED', 800, 1020, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      else bits(x, 'FLOWER', 800, 950, 18 * pop01(t, P.t0 + 1.35, 0.35, 2))
      L(x, 800, 700, 'GROWING: SLOWLY', pop01(t, P.t0 + 0.6, 0.3, 2.2), MINT, -0.04, 32)
      sparkles(x, t, 800, 930, P.t0 + 1.4, 6, 120, 0.3)
    } },
  { sign: S, cap: 'Loyal to everyone? | *Save some for you.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', star: ST,
    front(x, t, lt, P, F) {
      const go = ease.inOutCubic(clamp((lt - 0.8) / 0.6))
      bits(x, 'HEARTB', lerp(800, F.x + 120, go), lerp(860, F.cy - 40, go), 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 680, 'LOYALTY: ENDLESS', pop01(t, P.t0 + 0.5, 0.3, 2.2), PINK, -0.04, 32)
      L(x, 800, 1100, 'THIS ONE: FOR YOU', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, 0.04, 32)
    } },
  { sign: S, cap: 'Your chart today: | *off duty.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      chart(x, 800, 860, 140, pop01(t, P.t0 + 0.2, 0.35, 2), t * 0.3)
      L(x, 800, 1090, 'SCORPIO: RESTING', pop01(t, P.t0 + 1.2, 0.3, 2.4), LAV, 0.04, 34)
      sparkles(x, t, 800, 860, P.t0 + 1.3, 7, 140, 0.5)
    } },
]

const F = makeFilm({
  id: 'r2a0725', key: 'G', accent: ACC, solo: S, ending: 'lesson',
  title: 'Scorpio, you can’t | *fix everyone.*',
  cameos: CAMEOS,
  group: { cap: 'Fierce heart. | *Gentle hands.*', mood: 'heart' },
  lesson: { text: 'You can love people | *without fixing them.*', chip: 'TOOLBOX: DOWN' },
  last: { text: 'Toolbox down. | *Snacks up.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
