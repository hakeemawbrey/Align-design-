// r2a0735: star_advice, ADVICE SOLO (taurus), "What Tauruses | need *after a fight.*" (the batch hook, re-split so it fits two lines) (signs3kit social cut, lofi · G).
// One sign the whole way: nine gentle truths about making up with a Taurus, each with a warm reframe and one light gag.
// Ending: card (lesson + last line over the match card).
//   time to cool down (snail speed) · a cozy spot, then the talk · their pace, not yours · consistency, daily
//   · a real apology, not a vague one · something you made (homegrown flowers) · the past stays in the box
//   · their things, right where they were · then: loyal for years (Virgo, still here)
//   group "Slow to cool. | *Built to last.*"  lesson "Steady love | *outlasts storms.*"
//   last "Back to cozy. | *Like always.*" over the match card: Taurus + Virgo (the friend who stayed, paid off)
import { makeFilm, sparkles, hearts, bubble, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, bits, swapLabel, friend, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#8fdc6a', S = 'taurus', ST = { x: -190 }

const CAMEOS = [
  { sign: S, cap: 'Time to cool down. | *Slowly.*', mood: lt => lt > 1.6 ? 'neutral' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'SNAIL', lerp(700, 860, clamp(lt / 2.4)), 1020, 16 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 760, 'CALM-DOWN SPEED', pop01(t, P.t0 + 0.6, 0.3, 2.2), MINT, -0.04, 34)
      L(x, 800, 860, '(GETTING THERE)', pop01(t, P.t0 + 1.4, 0.3, 2.2), CREAM, 0.04, 28)
    } },
  { sign: S, cap: 'A cozy spot. | *Then the talk.*', mood: lt => lt > 1.2 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      bits(x, 'COUCH', 800, 1020, 20 * k)
      bits(x, 'BLANKET', 800, 960, 12 * pop01(t, P.t0 + 0.7, 0.3, 2), { rot: -0.05 })
      L(x, 800, 740, 'TALK LOCATION: COUCH', pop01(t, P.t0 + 1.1, 0.3, 2.2), GOLD, -0.04, 28)
    } },
  { sign: S, cap: 'Their pace. | *Not yours.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'CLOCK', 800, 920, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      swapLabel(x, 800, 1120, lt, 1.2, 'TALK NOW?', 'TALK WHEN READY', { size: 32, fromBg: STEEL, toBg: MINT })
    } },
  { sign: S, cap: 'Show up steady. | *Every day.*', mood: lt => lt > 1.6 ? 'heart' : 'happy', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      sheet(x, 800, 880, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 300, h: 340, head: 'THIS WEEK', headBg: '#4fbf6a', lines: [['mon: there ✓', INK], ['tue: there ✓', INK], ['wed: there ✓', INK], ['thu: there ✓', INK]], size: 30, progress: clamp((lt - 0.3) / 1.3) })
      L(x, 800, 1120, 'TRUST: REBUILDING', pop01(t, P.t0 + 1.8, 0.3, 2.2), GOLD, 0.04, 30)
    } },
  { sign: S, cap: 'A real apology. | *Not a vague one.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      swapLabel(x, 780, 820, lt, 1.0, 'MISTAKES WERE MADE', 'I WAS WRONG. SORRY.', { size: 26, fromBg: STEEL, toBg: PINK })
      L(x, 800, 1020, 'ACCEPTED', pop01(t, P.t0 + 1.8, 0.3, 2.2), MINT, 0.04, 36)
    } },
  { sign: S, cap: 'Something you made. | *Effort counts.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.1],
    front(x, t, lt, P) {
      bits(x, 'FLOWER', 800, 930, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 690, 'HOMEGROWN', pop01(t, P.t0 + 0.7, 0.3, 2.2), PINK, -0.04, 36)
      L(x, 800, 1150, '(ONE IS A WEED)', pop01(t, P.t0 + 1.6, 0.3, 2.2), CREAM, 0.04, 28)
      hearts(x, t, 800, 900, P.t0 + 1.1, { n: 4, life: 1.6, spread: 150, cell: 7, seed: 2 })
    } },
  { sign: S, cap: 'The past? | *Stays in the box.*', mood: lt => lt > 1.5 ? 'sparkle' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'BOX', 800, 1000, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const lid = clamp((lt - 0.8) / 0.4)
      x.save(); x.translate(800, lerp(800, 920, lid)); x.rotate(lerp(-0.4, 0, lid)); x.fillStyle = INK; x.fillRect(-120, -18, 240, 36); x.fillStyle = '#c98f5a'; x.fillRect(-112, -12, 224, 24); x.restore()
      L(x, 800, 690, 'OLD FIGHTS', pop01(t, P.t0 + 0.4, 0.3, 2.2), STEEL, -0.04, 34)
      L(x, 800, 1150, 'LID: CLOSED', pop01(t, P.t0 + 1.4, 0.3, 2.2), MINT, 0.04, 32)
    } },
  { sign: S, cap: 'Their things. | *Right where they were.*', mood: lt => lt > 1.2 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'LAMP', 750, 950, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'PILLOW', 880, 1090, 17 * pop01(t, P.t0 + 0.4, 0.3, 2))
      L(x, 800, 720, 'NOTHING MOVED', pop01(t, P.t0 + 0.9, 0.3, 2.2), GOLD, -0.04, 34)
    } },
  { sign: S, cap: 'Then? | Loyal *for years.*', mood: 'heart', look: [1, 0], star: ST, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      friend(x, t, 'virgo', 820, 960, 210, pop01(t, P.t0 + 0.3, 0.35, 2), { mood: 'heart', look: [-1, 0], hops: [P.t0 + 1.4] })
      L(x, 820, 720, 'STILL HERE: YEAR 9', pop01(t, P.t0 + 0.9, 0.3, 2.2), PINK, -0.04, 30)
      hearts(x, t, 680, 920, P.t0 + 1.5, { n: 5, life: 1.6, spread: 160, cell: 7, seed: 9 })
    } },
]

const F = makeFilm({
  id: 'r2a0735', key: 'G', accent: ACC, solo: S, ending: 'card',
  title: 'What Tauruses | need *after a fight.*',
  cameos: CAMEOS,
  card: { a: 'taurus', b: 'virgo', chip: 'ALIGNED' },
  group: { cap: 'Slow to cool. | *Built to last.*', mood: 'heart' },
  lesson: { text: 'Steady love | *outlasts storms.*', chip: 'BOND: SOLID' },
  last: {
    text: 'Back to cozy. | *Like always.*',
    draw(x, t, lt) { hearts(x, t, 540, 1000, t - lt + 1.4, { n: 6, life: 1.8, spread: 300, cell: 7, seed: 4 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
