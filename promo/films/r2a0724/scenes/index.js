// r2a0724: star_advice, ADVICE SOLO (sagittarius), "Signs a Sagittarius | trusts you." (signs3kit social cut, lofi · E).
// One sign the whole way: nine warm, relatable tells that a Sagittarius trusts you, each with one light gag. Ending: lesson.
//   invited on the spontaneous trip · tells you the real story (unedited) · lets YOU plan something
//   · roasts you gently · shares the 3 a.m. idea (a boat) · stays after the party · shows you the backpack chaos
//   · asks your opinion and waits · shows you their birth chart (access granted)
//   group "Free spirit. | *Loyal heart.*"  LESSON "Their freedom | *has room for you.*"  TRUST: EARNED
//   last "Pack light. | *Two seats booked.*"
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, friend, bits, swapLabel, chart, B, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#c97bff', S = 'sagittarius', ST = { x: -190 }

const CAMEOS = [
  { sign: S, cap: 'Invited you | *on the spontaneous trip.*', mood: 'sparkle', star: ST, hops: [1.1],
    front(x, t, lt, P) {
      const p = prog(lt, 0.2, 1.4)
      if (p > 0 && p < 1) bits(x, 'PLANE', lerp(620, 980, p), 680 - 40 * p, 14, { rot: 0.1 })
      bits(x, 'STUB', 800, 900, 30 * pop01(t, P.t0 + 0.5, 0.3, 2), { rot: -0.06 })
      L(x, 800, 1090, 'LEAVING: IN 1 HOUR', pop01(t, P.t0 + 1.2, 0.3, 2.2), GOLD, 0.04, 30)
    } },
  { sign: S, cap: 'They tell you | *the real story.*', mood: lt => lt > 1.2 ? 'wink' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'okay, the TRUE | version…', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 38, tail: 'bl' })
      L(x, 800, 920, 'UNEDITED', pop01(t, P.t0 + 1.0, 0.3, 2.4), MINT, 0.04, 40)
      L(x, 800, 1080, 'FOR YOU ONLY', pop01(t, P.t0 + 1.6, 0.3, 2.2), LAV, -0.04, 32)
    } },
  { sign: S, cap: 'They let *you* | plan something.', mood: lt => lt > 1.2 ? 'wide' : 'sparkle', star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 280, h: 280, head: 'SATURDAY', headBg: ACC, headInk: INK, lines: ['your idea', '(they’re in)'], size: 30 })
      swapLabel(x, 800, 1100, lt, 1.1, 'PLANNER: SAG', 'PLANNER: YOU', { size: 34, fromBg: STEEL, toBg: GOLD })
    } },
  { sign: S, cap: 'They roast you. | *Gently. With love.*', mood: lt => lt > 1.0 ? 'wink' : 'sparkle', star: ST,
    front(x, t, lt, P) {
      bubble(x, 780, 680, 'nice socks, | grandpa', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 36, tail: 'bl' })
      friend(x, t, 'cancer', 830, 1000, 160, pop01(t, P.t0 + 0.5, 0.35, 2), { mood: lt > 1.2 ? 'happy' : 'wide', look: [-1, 0], hops: [P.t0 + 1.3, P.t0 + 1.6] })
      L(x, 800, 860, 'ROAST LEVEL: MILD', pop01(t, P.t0 + 1.2, 0.3, 2.2), MINT, -0.04, 28)
    } },
  { sign: S, cap: 'They text you | *the 3 a.m. idea.*', mood: lt => lt > 1.0 ? 'wide' : 'sparkle', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      bits(x, 'MOON', 860, 640, 14 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 840, 'what if we | lived on a boat', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 34, tail: 'bl' })
      L(x, 800, 1080, 'IDEA #47 (TONIGHT)', pop01(t, P.t0 + 1.4, 0.3, 2.2), GOLD, 0.04, 30)
    } },
  { sign: S, cap: 'Party’s over. | *They stayed.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', star: ST,
    front(x, t, lt, P) {
      bits(x, 'CLOCK', 800, 820, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 650, '1:00 A.M.', pop01(t, P.t0 + 0.4, 0.3, 2.2), LAV, -0.05, 36)
      L(x, 800, 1060, 'STILL HERE. CHATTING.', pop01(t, P.t0 + 1.2, 0.3, 2.2), MINT, 0.04, 28)
    } },
  { sign: S, cap: 'They show you | *the backpack chaos.*', mood: lt => lt > 1.2 ? 'wink' : 'sparkle', star: ST,
    front(x, t, lt, P) {
      bits(x, 'BACKPACK', 800, 960, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const out = clamp((lt - 0.6) / 0.8)
      if (out > 0) { bits(x, 'MAP', 700, lerp(940, 720, out), 12, { rot: -0.3 }); bits(x, 'COOKIE', 880, lerp(940, 700, out), 12); bits(x, 'SHADES', 800, lerp(940, 650, out), 10) }
      L(x, 800, 1140, 'CONTENTS: EVERYTHING', pop01(t, P.t0 + 1.5, 0.3, 2.2), GOLD, 0.04, 28)
    } },
  { sign: S, cap: 'They ask your opinion. | *And actually wait.*', mood: lt => lt > 1.2 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'be honest?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 44, tail: 'bl' })
      swapLabel(x, 800, 920, lt, 1.0, 'TALKING', 'LISTENING', { size: 40, fromBg: STEEL, toBg: MINT })
      L(x, 800, 1080, 'STILL. QUIET.', pop01(t, P.t0 + 1.6, 0.3, 2.2), LAV, 0.04, 30)
    } },
  { sign: S, cap: 'They show you | *their birth chart.* Rare.', mood: lt => lt > 1.3 ? 'heart' : 'sparkle', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      chart(x, 800, 860, 140, pop01(t, P.t0 + 0.2, 0.35, 2), t * 0.3)
      L(x, 800, 1090, 'ACCESS: GRANTED', pop01(t, P.t0 + 1.2, 0.3, 2.4), MINT, 0.04, 34)
      sparkles(x, t, 800, 860, P.t0 + 1.3, 7, 140, 0.5)
    } },
]

const F = makeFilm({
  id: 'r2a0724', key: 'E', accent: ACC, solo: S, ending: 'lesson',
  title: 'Signs a Sagittarius | *trusts you.*',
  cameos: CAMEOS,
  group: { cap: 'Free spirit. | *Loyal heart.*', mood: 'heart' },
  lesson: { text: 'Their freedom | *has room for you.*', chip: 'TRUST: EARNED' },
  last: { text: 'Pack light. | *Two seats booked.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
