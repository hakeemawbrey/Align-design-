// r2a0592: star_advice, ADVICE SOLO (aries), "Signs an Aries | *trusts you.*" (signs3kit social cut, music: lofi · F).
// Nine cards, a relatable Aries truth + a warm reframe: they let you drive · they admit they're tired · they let you win
// (once) · they ask your opinion and actually wait · they show you the plan before doing it · they cry in front of you
// · a 6 a.m. "u up?" (gym buddy unlocked) · they slow down for you · they show you their whole chart.
// Ending: group ("Fast to start. | *Loyal for life.*").
import { makeFilm, sparkles, hearts, bubble, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, bits, zzz, swapLabel, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ff6b5a', ST = { x: -180 }, SG = 'aries'

const CAMEOS = [
  { sign: SG, cap: 'They let you drive. | *Huge* honour.', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      const pass = ease.inOutCubic(prog(lt, 0.5, 1.2))
      bits(x, 'KEY', lerp(520, 800, pass), 860, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.2 })
      L(x, 800, 1060, 'KEYS: YOURS', pop01(t, P.t0 + 1.3, 0.3, 2.4), GOLD, -0.04, 38)
      sparkles(x, t, 800, 860, P.t0 + 1.25, 7, 160, 0.3)
    } },
  { sign: SG, cap: 'They admit they’re tired. | *Rest with them.*', mood: lt => lt > 1.1 ? 'sleepy' : 'wide', star: ST,
    front(x, t, lt, P, F) {
      swapLabel(x, 800, 720, lt, 0.8, 'I’M FINE!!', 'ok… tired', { size: 38, fromBg: RED, toBg: LAV })
      bits(x, 'PILLOW', 800, 920, 18 * pop01(t, P.t0 + 1.1, 0.3, 2))
      if (lt > 1.2) zzz(x, t, F.x + 40, F.cy - 140)
      L(x, 800, 1080, 'NAP: SHARED', pop01(t, P.t0 + 1.6, 0.3, 2.4), MINT, -0.04, 34)
    } },
  { sign: SG, cap: 'They let you win. | *Once.* Cherish it.', mood: lt => lt > 1.2 ? 'happy' : 'squint', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      bits(x, 'TROPHY', 800, 850, 20 * pop01(t, P.t0 + 0.3, 0.3, 2))
      L(x, 800, 660, 'WINNER: YOU', pop01(t, P.t0 + 0.7, 0.3, 2.2), GOLD, 0.04, 36)
      L(x, 800, 1060, 'REMATCH: TOMORROW', pop01(t, P.t0 + 1.5, 0.3, 2.4), RED, -0.04, 30)
    } },
  { sign: SG, cap: 'They ask your opinion. | *Then actually wait.*', mood: lt => lt > 0.9 ? 'squint' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'what do YOU think?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 34, tail: 'bl' })
      const s = Math.min(3, Math.floor(Math.max(0, lt - 0.8) / 0.4) + 1)
      if (lt > 0.8) L(x, 800, 900, `WAITING… ${s} SEC`, 1, BONE, 0.04, 36)
      L(x, 800, 1050, 'PERSONAL BEST', pop01(t, P.t0 + 1.7, 0.3, 2.4), MINT, -0.04, 34)
    } },
  { sign: SG, cap: 'They show you the plan. | *Before* doing it.', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      sheet(x, 800, 850, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 300, h: 300, head: 'THE PLAN', headBg: RED, lines: ['step 1: GO', 'step 2: GO', 'step 3: ask you'], size: 30, align: 'left', progress: clamp((lt - 0.3) / 1.0) })
      L(x, 800, 1070, 'YOU’RE STEP 3 ♡', pop01(t, P.t0 + 1.5, 0.3, 2.4), PINK, -0.04, 34)
    } },
  { sign: SG, cap: 'They cry in front of you. | Hold that *gently.*', mood: lt => lt > 1.4 ? 'heart' : 'wide', tears: lt => lt > 1.4 ? 1 : 2, star: ST,
    front(x, t, lt, P) {
      bits(x, 'TISSUE', 800, 860, 18 * pop01(t, P.t0 + 0.3, 0.3, 2))
      bubble(x, 800, 680, 'it’s allergies', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 34, tail: 'bl' })
      L(x, 800, 1050, 'SAFE HERE ♡', pop01(t, P.t0 + 1.4, 0.3, 2.4), LAV, -0.04, 36)
      hearts(x, t, 800, 860, P.t0 + 1.5, { n: 4, life: 1.5, spread: 140, cell: 7, seed: 2 })
    } },
  { sign: SG, cap: 'A 6 a.m. “u up?” | *Gym buddy* unlocked.', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [0.6, 1.2, 1.8],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, t, 800, 850, pop01(t, P.t0 + 0.2, 0.35, 2), { head: '6:00 AM', headCol: RED, lines: [
        ['u up?', BONE, pop01(t, P.t0 + 0.5, 0.25, 2)],
        ['run?? 5k??', BONE, pop01(t, P.t0 + 0.9, 0.25, 2)],
        ['…ok ♡', MINT, pop01(t, P.t0 + 1.4, 0.25, 2), true],
      ], size: 24 })
    } },
  { sign: SG, cap: 'They slow down | *for you.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const v = Math.max(3, Math.round(100 - 97 * clamp((lt - 0.4) / 1.1)))
      L(x, 800, 760, 'SPEED', pop01(t, P.t0 + 0.2, 0.3, 2), STEEL, -0.04, 32)
      L(x, 800, 880, `${v}%`, pop01(t, P.t0 + 0.3, 0.3, 2), v < 10 ? MINT : RED, 0.04, 72)
      L(x, 800, 1050, 'STROLL MODE', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, -0.04, 34)
    } },
  { sign: SG, cap: 'They show you their chart. | *Moon sign* and all.', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [1, 0], star: ST, hops: [1.5],
    front(x, t, lt, P) {
      sheet(x, 800, 850, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 300, h: 300, head: 'MY CHART', headBg: LAV, headInk: INK, lines: ['sun: aries', 'moon: soft', '(don’t tell)'], size: 32, progress: clamp((lt - 0.4) / 1.0) })
      L(x, 800, 1070, 'TOP SECRET ♡', pop01(t, P.t0 + 1.5, 0.3, 2.4), PINK, -0.04, 34)
    } },
]

const F = makeFilm({
  id: 'r2a0592', key: 'F', accent: ACC, solo: SG, ending: 'group',
  title: 'Signs an Aries | *trusts you.*',
  cameos: CAMEOS,
  group: { cap: 'Fast to start. | *Loyal for life.*', mood: 'heart' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
