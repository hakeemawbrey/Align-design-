// r2a0731: star_advice, ADVICE SOLO (scorpio), "What Scorpios need | *from a friend.*" (signs3kit social cut, lofi · D).
// One sign the whole way: nine gentle truths about being a good friend to a Scorpio, each with a warm reframe and one
// light gag. Ending: lesson.
//   patience (trust loading) · a secret actually kept · honesty, kindly · room to be quiet (two mugs)
//   · staying for the 3 a.m. deep talk · loyalty back (Cancer, friend since forever) · unbothered by the stare
//   · the grudge list getting shorter · being seen, all of it (the birth chart)
//   group "Intense. | *Loyal for life.*"  lesson "Earn the trust. | They keep you *forever.*"  last "Your secrets? | *Safe forever.*"
import { makeFilm, sparkles, hearts, bubble, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, bits, swapLabel, steam, zzz, friend, chart, loadbar, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ff6f8f', S = 'scorpio', ST = { x: -190 }

const CAMEOS = [
  { sign: S, cap: 'Patience. | Trust takes *a minute.*', mood: lt => lt > 1.6 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const p = 0.1 + 0.6 * ease.inOutCubic(clamp((lt - 0.4) / 1.6))
      loadbar(x, 800, 860, 300, p, pop01(t, P.t0 + 0.2, 0.3, 2), { text: `TRUST: ${Math.round(p * 100)}%` })
      L(x, 800, 1060, 'TAKE YOUR TIME', pop01(t, P.t0 + 1.6, 0.3, 2.2), MINT, 0.04, 32)
    } },
  { sign: S, cap: 'A secret kept. | *Actually kept.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'ENVELOPE', 800, 880, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.05 })
      bits(x, 'LOCK', 880, 980, 14 * pop01(t, P.t0 + 0.7, 0.3, 2.2))
      L(x, 800, 690, 'TOLD: NOBODY', pop01(t, P.t0 + 1.2, 0.3, 2.2), GOLD, -0.04, 34)
    } },
  { sign: S, cap: 'Honesty. | *Gently* is fine.', mood: lt => lt > 1.5 ? 'sparkle' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 800, 720, 'be real with me', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 38, col: LAV, tail: 'bl' })
      swapLabel(x, 800, 930, lt, 1.2, 'SUGARCOATED', 'HONEST + KIND', { size: 36, fromBg: PINK, toBg: MINT })
    } },
  { sign: S, cap: 'Quiet time | *together.* No questions.', mood: lt => lt > 1.0 ? 'sleepy' : 'happy', star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      bits(x, 'MUG', 720, 1040, 14 * k); bits(x, 'MUG', 880, 1040, 14 * k)
      steam(x, t, 720, 980, { n: 2, alpha: 0.6 * k, h: 90 }); steam(x, t, 880, 980, { n: 2, alpha: 0.6 * k, h: 90 })
      L(x, 800, 760, 'SILENCE: COZY', pop01(t, P.t0 + 0.9, 0.3, 2.2), LAV, -0.04, 34)
    } },
  { sign: S, cap: 'Someone who stays | for the *deep talk.*', mood: lt => lt > 1.4 ? 'wide' : 'neutral', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'CLOCK', 800, 960, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 1120, '3:07 A.M.', pop01(t, P.t0 + 0.5, 0.3, 2.2), STEEL, 0.04, 36)
      bubble(x, 800, 720, 'but what IS love?', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: S, cap: 'Loyalty back. | They *give all of theirs.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      friend(x, t, 'cancer', 810, 940, 200, pop01(t, P.t0 + 0.3, 0.35, 2), { mood: 'heart', look: [-1, 0], hops: [P.t0 + 1.2] })
      L(x, 810, 720, 'FRIENDS SINCE: FOREVER', pop01(t, P.t0 + 0.9, 0.3, 2.2), GOLD, -0.04, 28)
      hearts(x, t, 680, 900, P.t0 + 1.4, { n: 4, life: 1.6, spread: 160, cell: 7, seed: 3 })
    } },
  { sign: S, cap: 'A friend unbothered | by *the stare.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      const F = friend(x, t, 'libra', 820, 960, 190, k, { mood: 'happy', look: [-1, 0] })
      if (F) bits(x, 'SHADES', 820, F.cy - 10, 10 * pop01(t, P.t0 + 0.8, 0.25, 2.2))
      L(x, 800, 720, 'EYE CONTACT: 100%', pop01(t, P.t0 + 0.6, 0.3, 2.2), RED, -0.04, 30)
      bubble(x, 820, 1130, 'cool, cool', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 34, tail: 'bc' })
    } },
  { sign: S, cap: 'The grudge list? | *Getting shorter.*', mood: lt => lt > 1.6 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 880, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 320, h: 320, head: 'GRUDGES', headBg: RED, lines: ['the 2016 thing', 'the cake thing', 'the cake (again)'], size: 28 })
      for (let i = 0; i < 3; i++) {
        const p = clamp((lt - 0.7 - i * 0.35) / 0.25)
        if (p > 0) { x.save(); x.strokeStyle = '#2fc79a'; x.lineWidth = 8; x.lineCap = 'round'; x.beginPath(); x.moveTo(676, 822 + i * 38 - i * 0); x.lineTo(676 + 248 * p, 812 + i * 38); x.stroke(); x.restore() }
      }
      L(x, 800, 1110, 'FORGIVEN (MOSTLY)', pop01(t, P.t0 + 1.8, 0.3, 2.2), MINT, 0.04, 30)
    } },
  { sign: S, cap: 'To be seen. | *All of it.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      chart(x, 800, 860, 150, pop01(t, P.t0 + 0.2, 0.35, 2), t * 0.3)
      L(x, 780, 1100, 'WHOLE CHART: LOVED', pop01(t, P.t0 + 1.2, 0.3, 2.2), PINK, -0.04, 28)
      sparkles(x, t, 800, 860, P.t0 + 1.3, 7, 140, 0.5)
    } },
]

const F = makeFilm({
  id: 'r2a0731', key: 'D', accent: ACC, solo: S, ending: 'lesson',
  title: 'What Scorpios need | *from a friend.*',
  cameos: CAMEOS,
  group: { cap: 'Intense. | *Loyal for life.*', mood: 'heart' },
  lesson: { text: 'Earn the trust. | They keep you *forever.*', chip: 'FRIEND: FOR LIFE' },
  last: {
    text: 'Your secrets? | *Safe forever.*',
    draw(x, t, lt) { hearts(x, t, 540, 1150, t - lt + 0.4, { n: 8, life: 2, spread: 500, cell: 8, seed: 5 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
