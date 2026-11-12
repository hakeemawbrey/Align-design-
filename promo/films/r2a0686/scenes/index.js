// r2a0686: star_advice, ADVICE SOLO (pisces), "Pisces, you're allowed | *to change your mind.*" (signs3kit social cut, lofi · D).
// One sign the whole way (Pisces cries in every card, soft happy tears): nine times a Pisces changes their mind, each
// with a warm reframe and one light gag. Ending: group.
//   said yes, meant no · dream job version 7 · wanted their plate (swap) · the couch moved three times · over the crush
//   (a new match) · big plans → big nap · read a book, new opinion · left early, the blanket waited · still you (the chart)
//   group "Change your mind. | *Keep your heart.*"
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, bits, chart, swapLabel, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#b7a6ff', S = 'pisces', ST = { x: -190 }
const cry = 2

const CAMEOS = [
  { sign: S, cap: 'Said yes, meant no? | *You can still say no.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', tears: cry, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, t, 810, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'TO: BESTIE', headCol: SKYB, lines: [['sure, i’ll go!', PINK, pop01(t, P.t0 + 0.4, 0.2, 2), true], ['actually… no ♡', PINK, pop01(t, P.t0 + 1.0, 0.2, 2), true], ['totally fine!', MINT, pop01(t, P.t0 + 1.6, 0.2, 2), false]], size: 26 })
    } },
  { sign: S, cap: 'New dream this week? | *Dreams can update.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', tears: cry, look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      sheet(x, 800, 860, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 340, h: 340, head: 'DREAM JOB', headBg: LAV, headInk: INK, lines: [['painter', '#9a94b8'], ['baker', '#9a94b8'], ['sea biologist', '#9a94b8'], ['all of them ✓', '#c2185b']], size: 32, progress: clamp((lt - 0.3) / 1.2) })
      L(x, 800, 1110, 'VERSION 7', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, -0.04, 34)
    } },
  { sign: S, cap: 'Ordered, then wanted theirs? | *Just ask to swap.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', tears: cry, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const sw = ease.inOutCubic(prog(lt, 1.0, 1.5)), k = pop01(t, P.t0 + 0.2, 0.3, 2)
      const a = lerp(700, 900, sw), b = lerp(900, 700, sw), hop = Math.sin(Math.PI * sw) * 60
      bits(x, 'BOWL', a, 900 - hop, 14 * k)
      bits(x, 'PLATE', b, 900 + hop, 14 * k)
      bubble(x, 800, 690, 'swap? ♡', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 44, col: SKYB, tail: 'bl' })
      L(x, 800, 1090, 'THEY SAID YES', pop01(t, P.t0 + 1.6, 0.3, 2.4), MINT, -0.04, 32)
    } },
  { sign: S, cap: 'Moved the couch three times? | *Cozy takes tries.*', mood: lt => lt > 1.6 ? 'happy' : 'squint', tears: cry, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const spots = [680, 900, 760], i = Math.min(2, Math.floor(lt / 0.6))
      const cxp = lerp(spots[Math.max(0, i - 1)], spots[i], ease.outCubic(clamp((lt - i * 0.6) / 0.3)))
      bits(x, 'COUCH', cxp, 920, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 700, `SPOT ${i + 1}`, pop01(t, P.t0 + 0.4, 0.3, 2), PINK, 0.04, 40)
      L(x, 800, 1100, 'THIS ONE ♡', pop01(t, P.t0 + 1.8, 0.3, 2.4), MINT, -0.04, 32)
    } },
  { sign: S, cap: 'Over the crush already? | *Hearts get to move.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', tears: cry, look: [1, 0], star: ST, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, t, 810, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: '✦ NEW MATCH', headCol: PINK, lines: [['♓ + ♋', GOLD, pop01(t, P.t0 + 0.6, 0.2, 2), false], ['hi :)', MINT, pop01(t, P.t0 + 1.1, 0.2, 2), false], ['hi!! ♡', PINK, pop01(t, P.t0 + 1.4, 0.2, 2), true]], size: 30 })
      hearts(x, t, 810, 800, P.t0 + 1.5, { n: 5, life: 1.6, spread: 200, cell: 7, seed: 4 })
    } },
  { sign: S, cap: 'Big plans, then a nap? | *Rest counts too.*', mood: lt => lt > 1.2 ? 'sleepy' : 'neutral', tears: 2, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      swapLabel(x, 800, 820, lt, 1.0, 'SAT: BIG PLANS', 'SAT: BIG NAP', { size: 40, fromBg: GOLD, toBg: LAV })
      bits(x, 'PILLOW', 800, 1010, 14 * pop01(t, P.t0 + 1.4, 0.3, 2))
    } },
  { sign: S, cap: 'Read one book, new opinion? | *That’s growing.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', tears: cry, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'BOOK', 800, 920, 18 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.05 })
      bits(x, 'LAMP', 800, 720, 14 * pop01(t, P.t0 + 1.0, 0.3, 2))
      sparkles(x, t, 800, 720, P.t0 + 1.1, 6, 110, 0.3)
      L(x, 800, 1100, 'OPINION 2.0', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, -0.04, 34)
    } },
  { sign: S, cap: 'Want to leave early? | *Go home. Be cozy.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', tears: cry, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'HOUSE', 800, 880, 30 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 800, 660, 'night, all! ♡', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 42, tail: 'bl' })
      L(x, 800, 1100, 'BLANKET: WAITING', pop01(t, P.t0 + 1.4, 0.3, 2.4), LAV, -0.04, 32)
    } },
  { sign: S, cap: 'Changed a lot this year? | *Still you. Still loved.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', tears: cry, look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      chart(x, 800, 860, 150, pop01(t, P.t0 + 0.2, 0.35, 2), t)
      L(x, 800, 1090, 'STILL PISCES ♡', pop01(t, P.t0 + 1.2, 0.3, 2.4), SKYB, -0.04, 36)
      hearts(x, t, 800, 760, P.t0 + 1.4, { n: 5, life: 1.8, spread: 220, cell: 7, seed: 8 })
    } },
]

const F = makeFilm({
  id: 'r2a0686', key: 'D', accent: ACC, solo: S, ending: 'group',
  title: 'Pisces, you’re allowed | *to change your mind.*',
  cameos: CAMEOS,
  group: { cap: 'Change your mind. | *Keep your heart.*', mood: 'heart',
    draw(x, t, lt) { hearts(x, t, 540, 700, t - lt + 0.9, { n: 8, life: 2.6, spread: 520, cell: 8, seed: 2 }) } },
})
export const DURATION = F.DURATION
// the hook is long: widen the title box so each ' | ' line stays on one line, then scale it down to the safe width
async function build(stage) {
  const sc = await F.SCENES[0](stage)
  const tb = sc.root.children[1].children[1]
  Object.assign(tb.style, { left: '-20px', width: '1120px', transformOrigin: '50% 0', transform: 'scale(0.84)' })
  return sc
}
export const SCENES = [build]
export const CUES = F.CUES
export const T = F.T
