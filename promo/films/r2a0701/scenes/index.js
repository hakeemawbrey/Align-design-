// r2a0701: star_advice, ADVICE SOLO (aquarius), "How to apologise | *to an Aquarius.*" (signs3kit social cut, music:
// lofi · D). One sign the whole way: nine gentle, slightly funny ways to make up with an Aquarius. Ending: group.
//   space first (they'll come back) · skip the grand gesture · facts, kindly (apology v2, footnotes) · they seem
//   detached, they still care (read… typing… we good) · honest beats agreeing · a weird gift (a tiny robot) · ask what
//   they think (forty minutes later) · check the charts, then check in · forgiven: they act like nothing happened
//   group "Be honest. Be kind. | *Be weird together.*"
import { makeFilm, sparkles, hearts, bubble, signChar, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, friend, swapLabel, bits, chart, gift, confetti, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#6fe3ff', S = 'aquarius', ST = { x: -190 }
const ROBOT = ['..K..', '.SSS.', 'SKSKS', 'SSSSS', '.SRS.', 'S.S.S', 'S...S']
const ROBOT_C = { K: GOLD, S: '#c9d6ff', R: PINK }

const CAMEOS = [
  { sign: S, cap: 'Give them space first. | *They’ll come back.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const d = lerp(940, 760, ease.inOutCubic(prog(lt, 1.2, 2.2)))
      friend(x, t, 'libra', d, 900, 130, pop01(t, P.t0 + 0.3, 0.3, 2), { mood: lt > 1.4 ? 'heart' : 'neutral', look: [-1, 0] })
      L(x, 790, 680, 'SPACE: RESPECTED', pop01(t, P.t0 + 0.6, 0.3, 2), SKYB, -0.04, 32)
      L(x, 790, 1100, 'BACK IN 1 DAY', pop01(t, P.t0 + 1.5, 0.3, 2.2), MINT, 0.04, 30)
    } },
  { sign: S, cap: 'Skip the big scene. | *Simple is sweeter.*', mood: lt => lt > 1.1 ? 'heart' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      if (lt < 1.0) confetti(x, t, 800, 820, P.t0 + 0.3, { n: 18, spread: 260 })
      swapLabel(x, 800, 820, lt, 1.0, 'BRASS BAND?', 'JUST TALK', { size: 40, fromBg: GOLD, toBg: MINT })
      L(x, 800, 1060, 'PHEW', pop01(t, P.t0 + 1.6, 0.3, 2.2), BONE, 0.04, 34)
    } },
  { sign: S, cap: 'Facts over drama. | *Explain it kindly.*', mood: lt => lt > 1.5 ? 'sparkle' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 860, 1.1 * pop01(t, P.t0 + 0.2, 0.3, 2), { w: 340, h: 340, head: 'MY APOLOGY v2', headBg: SKYB, headInk: INK, lines: ['1. what happened', '2. my part in it', '3. sorry, really', '(see footnotes)'], size: 27, align: 'left', progress: prog(lt, 0.3, 1.5), rot: -0.04 })
    } },
  { sign: S, cap: 'They seem detached. | *They still care.*', mood: lt => lt > 1.5 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, t, 810, 860, 1.15 * pop01(t, P.t0 + 0.2, 0.3, 2), { head: '♒ AQUARIUS', headCol: SKYB, lines: [['i’m sorry', PINK, pop01(t, P.t0 + 0.4, 0.2, 2), true], ['read 2:14', STEEL, pop01(t, P.t0 + 0.8, 0.2, 2), true], ['we’re good ♥', MINT, pop01(t, P.t0 + 1.7, 0.2, 2), false]], typing: lt > 0.9 && lt < 1.6 ? 1 : 0, size: 26 })
    } },
  { sign: S, cap: 'Don’t just agree. | *They love honest.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'actually, I | see it differently', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 34, col: BONE, tail: 'br' })
      L(x, 800, 960, 'RESPECT: +100', pop01(t, P.t0 + 1.2, 0.3, 2.4), MINT, 0.04, 36)
      sparkles(x, t, 400, 820, P.t0 + 1.3, 6, 170, 0.4)
    } },
  { sign: S, cap: 'Bring a weird gift. | *They’ll treasure it.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      const open = prog(lt, 0.8, 1.3)
      gift(x, 800, 1000, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 220, h: 150, col: LAV, rib: PINK, open })
      if (open > 0.2) drawBits(x, ROBOT, ROBOT_C, 800, lerp(1000, 800, ease.outCubic(prog(lt, 0.9, 1.5))), 20 * clamp(open * 1.5))
      L(x, 800, 640, 'A TINY ROBOT', pop01(t, P.t0 + 1.5, 0.3, 2.2), GOLD, -0.04, 32)
    } },
  { sign: S, cap: 'Ask what they think. | *Then really listen.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 800, 680, 'what do | YOU think?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, col: LAV, tail: 'br' })
      const m = Math.round(clamp((lt - 0.6) / 1.4) * 40)
      L(x, 800, 920, `TALKING: ${m} MIN`, pop01(t, P.t0 + 0.6, 0.3, 2), SKYB, 0.04, 36)
      L(x, 800, 1080, 'WORTH IT', pop01(t, P.t0 + 1.8, 0.3, 2.2), MINT, -0.04, 32)
    } },
  { sign: S, cap: 'Check your charts. | *Then check in.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      chart(x, 800, 850, 150, pop01(t, P.t0 + 0.2, 0.35, 2), t)
      L(x, 800, 1090, 'STILL COMPATIBLE', pop01(t, P.t0 + 1.3, 0.3, 2.4), GOLD, 0.04, 32)
      hearts(x, t, 800, 800, P.t0 + 1.5, { n: 4, life: 1.6, spread: 180, cell: 7, seed: 5 })
    } },
  { sign: S, cap: 'Forgiven? | *Like it never happened.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.1],
    front(x, t, lt, P) {
      friend(x, t, 'libra', 800, 930, 170, pop01(t, P.t0 + 0.2, 0.3, 2), { mood: lt > 1.3 ? 'heart' : 'wide', look: [-1, 0] })
      bubble(x, 800, 680, 'anyway, | aliens?', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 40, col: SKYB, tail: 'bl' })
      L(x, 800, 1120, 'ALREADY MOVED ON', pop01(t, P.t0 + 1.6, 0.3, 2.2), MINT, -0.04, 30)
    } },
]

const F = makeFilm({
  id: 'r2a0701', key: 'D', accent: ACC, solo: S, ending: 'group',
  title: 'How to apologise | *to an Aquarius.*',
  cameos: CAMEOS,
  group: { cap: 'Be honest. Be kind. | *Be weird together.*', mood: 'heart' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
