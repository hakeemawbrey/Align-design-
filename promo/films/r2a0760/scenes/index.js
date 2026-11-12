// r2a0760: star_advice, ADVICE SOLO (virgo), "How to cheer up | *a Virgo.*" (signs3kit social cut, lofi · G).
// One sign the whole way: nine kind ways to lift the friend who quietly fixes everything, each with one light gag.
// Ending: lesson.
//   don't say "relax", help them tidy · make a list of their wins · fix one tiny thing (the wobbly table)
//   · tea made exactly right, ask how · tell them it's good enough (it really is) · a walk with no plan (okay, a small
//   plan) · let them vent, don't fix it · rest is productive · their chart says perfectionist; yours says "so loved"
//   group "Little things. | *Big comfort.*"  lesson "They care so much. | *Care for them back.*"
//   last "Then compliment | *their spreadsheet.*"
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO } from '../../signs3kit.js'
import { L, sheet, friend, bits, swapLabel, steam, chart, zzz, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#7dffb0', S = 'virgo', ST = { x: -190 }
const tick = (x, cx, cy, k) => { if (k <= 0.01) return; x.save(); x.translate(cx, cy); x.scale(k, k); x.strokeStyle = '#2f8a48'; x.lineWidth = 8; x.lineCap = 'round'; x.beginPath(); x.moveTo(-12, 0); x.lineTo(-2, 10); x.lineTo(16, -12); x.stroke(); x.restore() }

const CAMEOS = [
  { sign: S, cap: 'Don’t say “relax.” | *Help them tidy.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      friend(x, t, 'gemini', 860, 950, 180, pop01(t, P.t0 + 0.2, 0.35, 2), { mood: 'happy', look: [-1, 0] })
      bits(x, 'BROOM', 720, 980, 14 * pop01(t, P.t0 + 0.5, 0.3, 2), { rot: -0.3 + Math.sin(t * 6) * 0.15 })
      L(x, 800, 680, 'TIDY: TOGETHER', pop01(t, P.t0 + 1.2, 0.3, 2.2), MINT, -0.04, 32)
    } },
  { sign: S, cap: 'Make them a list. | *Of their wins.*', mood: lt => lt > 1.5 ? 'heart' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const W = ['fixed the wifi', 'remembered bday', 'saved the plant', 'made us laugh']
      sheet(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 340, h: 340, head: 'YOUR WINS', headBg: MINT, headInk: INK, lines: W, size: 29, align: 'left', progress: prog(lt, 0.4, 1.4) })
      L(x, 800, 1110, 'LIST: APPROVED', pop01(t, P.t0 + 1.7, 0.3, 2.2), GOLD, 0.04, 28)
    } },
  { sign: S, cap: 'Fix one tiny thing. | *The wobbly table.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const fixed = lt > 1.2
      bits(x, 'TABLE', 800, 960, 18 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: fixed ? 0 : Math.sin(t * 14) * 0.04 })
      bits(x, 'WRENCH', 900, 1100, 10 * pop01(t, P.t0 + 0.6, 0.3, 2), { rot: 0.4 })
      L(x, 800, 720, fixed ? 'WOBBLE: 0.0' : 'WOBBLE: 2.3', 1, fixed ? MINT : RED, -0.04, 34)
      if (fixed) sparkles(x, t, 800, 900, P.t0 + 1.2 * 1.29, 7, 170, 0.3)
    } },
  { sign: S, cap: 'Make their tea. | *Ask how first.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'TEA', 800, 930, 18 * pop01(t, P.t0 + 0.2, 0.3, 2)); steam(x, t, 790, 860, { n: 3, alpha: 0.7, h: 120 })
      L(x, 800, 680, 'STEEP: 3 MIN 20 S', pop01(t, P.t0 + 0.7, 0.3, 2.2), CREAM, -0.04, 30)
      L(x, 800, 1100, 'NOTED. FOREVER.', pop01(t, P.t0 + 1.5, 0.3, 2.2), MINT, 0.04, 30)
    } },
  { sign: S, cap: 'Tell them it’s good enough. | *It really is.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      swapLabel(x, 790, 820, lt, 0.9, 'SCORE: 93%', 'SCORE: GREAT', { size: 40, fromBg: STEEL, toBg: MINT })
      L(x, 800, 1040, '7% WAS NEVER NEEDED', pop01(t, P.t0 + 1.6, 0.3, 2.2), GOLD, 0.04, 26)
      sparkles(x, t, 790, 820, P.t0 + 1.3, 7, 180, 0.6)
    } },
  { sign: S, cap: 'A walk with no plan. | *Okay, a small plan.*', mood: 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      bits(x, 'MAP', 800, 860, 26 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.04 })
      L(x, 800, 1090, 'ROUTE v2: FLEXIBLE', pop01(t, P.t0 + 1.2, 0.3, 2.2), GOLD, 0.04, 28)
    } },
  { sign: S, cap: 'Let them vent. | *Don’t fix it.*', mood: lt => lt > 1.4 ? 'heart' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      friend(x, t, 'cancer', 850, 980, 180, pop01(t, P.t0 + 0.2, 0.35, 2), { mood: 'happy', look: [-1, 0], hops: [P.t0 + 1.0, P.t0 + 1.6] })
      bubble(x, 760, 690, 'and ANOTHER | thing…', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 38, tail: 'bl' })
      L(x, 850, 1130, 'NODS: 14', pop01(t, P.t0 + 1.3, 0.3, 2.2), PINK, 0.04, 30)
    } },
  { sign: S, cap: 'Remind them: | *rest is productive.*', mood: lt => lt > 1.0 ? 'squint' : 'happy', star: { x: -190, y: 10 },
    front(x, t, lt, P, F) {
      bits(x, 'PILLOW', F.x, F.cy + 120, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      if (lt > 1.0) zzz(x, t, F.x + 90, F.top, { size: 44 })
      L(x, 820, 760, 'TO-DO: NAP', pop01(t, P.t0 + 0.6, 0.3, 2.2), CREAM, -0.04, 34)
      tick(x, 960, 760, pop01(t, P.t0 + 1.4, 0.3, 2.4))
    } },
  { sign: S, cap: 'Their chart says perfectionist. | Yours says *“so loved.”*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      chart(x, 800, 850, 150, pop01(t, P.t0 + 0.2, 0.35, 2), t * 0.3)
      hearts(x, t, 800, 820, P.t0 + 1.2, { n: 6, life: 1.8, spread: 220, cell: 8, seed: 5 })
      L(x, 800, 1100, 'READING: VERY LOVED', pop01(t, P.t0 + 1.3, 0.3, 2.2), MINT, -0.04, 28)
    } },
]

const F = makeFilm({
  id: 'r2a0760', key: 'G', accent: ACC, solo: S, ending: 'lesson',
  title: 'How to cheer up | *a Virgo.*',
  cameos: CAMEOS,
  group: { cap: 'Little things. | *Big comfort.*', mood: 'heart' },
  lesson: { text: 'They care so much. | *Care for them back.*', chip: 'MOOD: LIFTED' },
  last: { text: 'Then compliment | *their spreadsheet.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
