// r2a0689: star_advice, ADVICE SOLO (scorpio), "Scorpio, it's okay | *to miss them.*" (signs3kit social cut, lofi · E).
// One sign the whole way: nine gentle truths about a Scorpio missing someone, a warm reframe and one light gag each.
//   rereading old texts · "totally fine" (not fine) · kept their hoodie · their song came on · missing isn't going back
//   (the chart says forward) · hard shell, soft heart · write the text, keep it in drafts · miss a friend? tell them
//   · your heart still works
// Ending: card. group "Soft heart. | *Strong Scorpio.*" · lesson "Missing them means | *you loved well.*"
//   · "Next match? | *Hoodie included.*" over the match card: Scorpio + Cancer (the friend who missed you back).
import { makeFilm, sparkles, hearts, bubble, signChar, pop01, drawBits, notes, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, bits, chart, swapLabel, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ff6b8a', S = 'scorpio', ST = { x: -190 }
const HOODIE = ['...HHHHHH...', '..HHKKKKHH..', '.HHHK..KHHH.', 'HHHHHKKHHHHH', 'HHHHHHHHHHHH', 'HH.HHHHHH.HH', 'HH.HPPPPH.HH', 'HH.HPPPPH.HH', 'HH.HHHHHH.HH', 'WW.HHHHHH.WW', '...HHHHHH...']

const CAMEOS = [
  { sign: S, cap: 'Rereading old texts? | *Love leaves echoes.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, t, 810, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: '2 YEARS AGO', headCol: LAV, lines: [['you up? :)', PINK, pop01(t, P.t0 + 0.4, 0.2, 2), false], ['always ♡', MINT, pop01(t, P.t0 + 0.8, 0.2, 2), true], ['…scrolling', STEEL, pop01(t, P.t0 + 1.4, 0.2, 2), true]], size: 26 })
    } },
  { sign: S, cap: '“Totally fine”? | *You’re allowed not to be.*', mood: lt => lt > 1.2 ? 'neutral' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      swapLabel(x, 800, 820, lt, 1.0, 'TOTALLY FINE', 'OKAY, A LITTLE SAD', { size: 38, fromBg: GOLD, toBg: SKYB })
      L(x, 800, 1020, 'ALSO OKAY', pop01(t, P.t0 + 1.8, 0.3, 2.4), MINT, 0.04, 32)
    } },
  { sign: S, cap: 'Kept their hoodie? | *Keep it. It’s cozy.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, HOODIE, { H: '#9aa5c4', K: INK, P: '#7a86a8', W: BONE }, 800, 870, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.05 })
      L(x, 800, 1110, 'RETURN DATE: NEVER', pop01(t, P.t0 + 1.2, 0.3, 2.4), PINK, -0.04, 30)
    } },
  { sign: S, cap: 'Their song came on? | *Let it play.*', mood: lt => lt > 1.2 ? 'sleepy' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      notes(x, t, 800, 900, { n: 5, cell: 9, col: PINK, seed: 3 })
      L(x, 800, 720, 'SKIP?', pop01(t, P.t0 + 0.3, 0.3, 2), STEEL, 0.04, 44)
      L(x, 800, 1080, 'NOT TODAY', pop01(t, P.t0 + 1.2, 0.3, 2.4), MINT, -0.04, 38)
    } },
  { sign: S, cap: 'Missing them isn’t | *going back.*', mood: lt => lt > 1.3 ? 'sparkle' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      chart(x, 800, 840, 130, pop01(t, P.t0 + 0.2, 0.35, 2), t)
      L(x, 800, 1070, 'CHART SAYS: FORWARD →', pop01(t, P.t0 + 1.2, 0.3, 2.4), GOLD, -0.04, 30)
    } },
  { sign: S, cap: 'Hard shell, soft heart? | *Both are allowed.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      const open = ease.inOutCubic(prog(lt, 1.0, 1.4))
      bits(x, 'HEARTB', 800, 870, 18 * pop01(t, P.t0 + 0.2, 0.3, 2) * (1 + 0.06 * Math.sin(t * 8)))
      bits(x, 'SHIELD', lerp(800, 900, open), 870, 26 * pop01(t, P.t0 + 0.2, 0.3, 2), { alpha: 1 - 0.6 * open, rot: 0.3 * open })
      L(x, 800, 1100, 'SOFT INSIDE', pop01(t, P.t0 + 1.5, 0.3, 2.4), PINK, -0.04, 34)
    } },
  { sign: S, cap: 'Want to text them? | *Drafts are allowed.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, t, 810, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'DRAFT', headCol: STEEL, lines: [['i miss u', PINK, pop01(t, P.t0 + 0.5, 0.2, 2), true]], typing: lt > 0.3 && lt < 0.6 ? 1 : 0, size: 30 })
      L(x, 810, 1110, 'SAVED. NOT SENT.', pop01(t, P.t0 + 1.3, 0.3, 2.4), MINT, -0.04, 32)
    } },
  { sign: S, cap: 'Miss a friend? | *Tell them. They miss you.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: ST, hops: [1.5],
    front(x, t, lt, P) {
      phone(x, t, 810, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'TO: ♋ BESTIE', headCol: SKYB, lines: [['miss you.', PINK, pop01(t, P.t0 + 0.5, 0.2, 2), true], ['OMG ME TOO', MINT, pop01(t, P.t0 + 1.4, 0.2, 2), false], ['coffee?? ♡', MINT, pop01(t, P.t0 + 1.6, 0.2, 2), false]], size: 28 })
      hearts(x, t, 810, 800, P.t0 + 1.6, { n: 5, life: 1.6, spread: 200, cell: 7, seed: 3 })
    } },
  { sign: S, cap: 'Still miss them? | *Your heart still works.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      const b = 1 + 0.1 * Math.max(0, Math.sin(t * 7))
      bits(x, 'HEARTB', 800, 860, 26 * pop01(t, P.t0 + 0.2, 0.3, 2) * b)
      L(x, 800, 1090, 'WORKING PERFECTLY', pop01(t, P.t0 + 1.2, 0.3, 2.4), MINT, -0.04, 32)
      sparkles(x, t, 800, 860, P.t0 + 1.3, 7, 200, 0.6)
    } },
]

const F = makeFilm({
  id: 'r2a0689', key: 'E', accent: ACC, solo: S, ending: 'card',
  title: 'Scorpio, it’s okay | *to miss them.*',
  cameos: CAMEOS,
  card: { a: 'scorpio', b: 'cancer', chip: 'IT’S A MATCH' },
  group: { cap: 'Soft heart. | *Strong Scorpio.*', mood: 'heart' },
  lesson: { text: 'Missing them means | *you loved well.*', chip: 'HEART: OPEN' },
  last: { text: 'Next match? | *Hoodie included.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
