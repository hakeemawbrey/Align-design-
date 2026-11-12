// r2a0673: star_advice, ADVICE SOLO (taurus), "Taurus, protect | *your peace.*" (signs3kit social cut, music: lofi · C).
// One sign the whole way: nine gentle truths about a Taurus guarding their calm, each with a warm reframe and one light
// gag. Ending: group.
//   phone on do-not-disturb · said no to plans, the couch said yes · a slow morning (mug) · muted the drama · garden
//   time · ate the good snack, no sharing · a whole blanket day · not everyone gets a key · the ones who match your calm
//   group "Calm is | *a superpower.*"
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, friend, bits, swapLabel, steam, zzz, RED, CREAM, STEEL, NIGHT, WOOD, clamp, lerp, ease, prog } from './props.js'

const ACC = '#5fd068', S = 'taurus', ST = { x: -190 }

const CAMEOS = [
  { sign: S, cap: 'Phone on silent? | *That’s self-care.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 1], star: ST,
    front(x, t, lt, P) {
      const n = Math.floor(clamp((lt - 0.2) / 1.0) * 23)
      phone(x, t, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'DO NOT DISTURB', headCol: MINT, lines: [[`missed: ${n}`, STEEL, 1, false], ['later :)', BONE, pop01(t, P.t0 + 1.5, 0.25, 2), true]] })
    } },
  { sign: S, cap: 'Said no to plans? | *Your couch said yes.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'COUCH', 800, 950, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 690, 'RSVP: NO, LOVINGLY', pop01(t, P.t0 + 0.9, 0.3, 2.2), CREAM, -0.04, 30)
      hearts(x, t, 800, 880, P.t0 + 1.4, { n: 4, life: 1.5, spread: 180, cell: 6, seed: 2 })
    } },
  { sign: S, cap: 'Slow morning? | *Not lazy. Lovely.*', mood: lt => lt > 1.2 ? 'sleepy' : 'happy', star: ST,
    front(x, t, lt, P) {
      bits(x, 'MUG', 800, 900, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      steam(x, t, 780, 800, { n: 3, alpha: 0.8 })
      L(x, 800, 1110, 'ALARM: SNOOZED', pop01(t, P.t0 + 1.2, 0.3, 2.2), LAV, 0.04, 32)
    } },
  { sign: S, cap: 'Muted the group drama? | *Good call.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      x.save(); x.globalAlpha = lt > 1.2 ? 0.35 : 1
      for (let i = 0; i < 3; i++) bubble(x, 720 + i * 60, 680 + i * 130, i === 1 ? 'did you SEE' : '!!!', pop01(t, P.t0 + 0.2 + i * 0.2, 0.25, 2.2), { size: 40, col: i === 1 ? PINK : BONE, tail: 'bl' })
      x.restore()
      L(x, 800, 1110, 'MUTED ✓', pop01(t, P.t0 + 1.3, 0.3, 2.4), MINT, -0.04, 40)
    } },
  { sign: S, cap: 'Garden time? | *Therapy with dirt.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const grow = clamp((lt - 0.3) / 1.2)
      bits(x, 'SEED', 800, 1060, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      if (grow > 0) bits(x, 'FLOWER', 800, lerp(1020, 860, grow), 22 * grow)
      L(x, 800, 650, 'GROWING: YOU TOO', pop01(t, P.t0 + 1.6, 0.3, 2.2), GOLD, -0.04, 30)
    } },
  { sign: S, cap: 'Ate the good snack | *without sharing?* Fine.', mood: lt => lt > 1.1 ? 'heart' : 'wink', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'COOKIE', 800, 880, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 660, 'THE LAST ONE', pop01(t, P.t0 + 0.6, 0.3, 2.2), CREAM, 0.04, 32)
      L(x, 800, 1100, 'MINE. PEACEFULLY.', pop01(t, P.t0 + 1.4, 0.3, 2.2), GOLD, -0.04, 32)
    } },
  { sign: S, cap: 'Need a blanket day? | *Take the whole day.*', mood: 'sleepy', star: { x: -190, y: -20 },
    front(x, t, lt, P, F) {
      bits(x, 'BLANKET', F.x, F.cy + 110, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 760, 'BLANKET: ON', pop01(t, P.t0 + 0.8, 0.3, 2.2), LAV, 0.04, 36)
      L(x, 800, 960, 'DAY: CANCELLED', pop01(t, P.t0 + 1.5, 0.3, 2.2), MINT, -0.04, 32)
      zzz(x, t, F.x + 90, F.cy - 120, { alpha: clamp(lt - 0.6) })
    } },
  { sign: S, cap: 'Not everyone gets | *a key.*', mood: lt => lt > 1.2 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'KEY', 800, 860, 26 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: Math.sin(t * 2) * 0.1 })
      sheet(x, 800, 1080, pop01(t, P.t0 + 1.0, 0.3, 2), { w: 300, h: 150, head: 'GUEST LIST', headBg: ACC, headInk: INK, lines: ['very short'], size: 28 })
    } },
  { sign: S, cap: 'People who match your calm? | *Keep them close.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      friend(x, t, 'cancer', 810, 920, 210, pop01(t, P.t0 + 0.3, 0.35, 2), { mood: 'happy', look: [-1, 0] })
      L(x, 810, 660, '✦ COMPATIBLE: CALM', pop01(t, P.t0 + 1.0, 0.3, 2.2), MINT, -0.04, 30)
      hearts(x, t, 650, 880, P.t0 + 1.4, { n: 5, life: 1.6, spread: 220, cell: 7, seed: 6 })
    } },
]

const F = makeFilm({
  id: 'r2a0673', key: 'C', accent: ACC, solo: S, ending: 'group',
  title: 'Taurus, protect | *your peace.*',
  cameos: CAMEOS,
  group: {
    cap: 'Calm is | *a superpower.*', mood: 'sparkle',
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
