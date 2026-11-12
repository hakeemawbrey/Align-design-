// r2a0552: star_advice, ADVICE SOLO (leo), "Leo, this is your sign | to call home." (signs3kit social cut, music: lofi · F).
// Nine warm nudges for a busy Leo to call the people who love them, each with one visual gag. Ending: lesson.
import { makeFilm, sparkles, hearts, bubble, notes, drawBits, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, steam, zzz, friend, bits, swapLabel, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ffb34a', ST = { x: -180 }
const ring = (t, lt, a, b) => (lt > a && lt < b ? Math.sin(t * 40) * 0.08 : 0)

const CAMEOS = [
  { sign: 'leo', cap: 'You’ve been busy. | They *still miss you.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: ST, hops: [1.5],
    front(x, t, lt, P) {
      phone(x, t, 800, 840, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'HOME ♥', headCol: PINK, rot: 0.05 + ring(t, lt, 0.3, 1.2), lines: [['just checking in!', BONE, pop01(t, P.t0 + 0.6, 0.25, 2.2)], ['no rush. love you', MINT, pop01(t, P.t0 + 1.2, 0.25, 2.2)]] })
      L(x, 800, 1090, 'MISSED: YOU', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, 0.04, 32)
    } },
  { sign: 'leo', cap: 'No big news? | *Just say hi.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      sheet(x, 800, 820, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 300, h: 240, head: 'MY NEWS', headBg: STEEL, headInk: INK, lines: ['ate a sandwich.', 'that’s it.'], size: 30 })
      if (lt > 0.3) swapLabel(x, 800, 1070, lt, 1.2, 'TOO BORING?', 'PERFECT. CALL.', { size: 34, toBg: GOLD })
    } },
  { sign: 'leo', cap: 'They want *your* stories. | Even boring ones.', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.9, 1.6],
    front(x, t, lt, P) {
      friend(x, t, 'cancer', 820, 920, 170, pop01(t, P.t0 + 0.3, 0.3, 2), { mood: lt > 1.2 ? 'heart' : 'happy', look: [-1, 0], seed: 46 })
      bubble(x, 800, 680, 'and THEN?!', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 40, col: GOLD, tail: 'bc' })
      L(x, 800, 1110, 'BIGGEST FAN: HOME', pop01(t, P.t0 + 1.6, 0.3, 2.4), PINK, -0.04, 30)
    } },
  { sign: 'leo', cap: 'Ten minutes counts. | *Truly.*', mood: 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      bits(x, 'CLOCK', 800, 830, 22 * pop01(t, P.t0 + 0.2, 0.35, 2))
      const m = Math.min(10, Math.floor(clamp((lt - 0.4) / 1.2) * 10))
      L(x, 800, 650, `CALL: ${m} MIN`, pop01(t, P.t0 + 0.4, 0.3, 2.2), LAV, 0.05, 32)
      L(x, 800, 1070, 'DAY: MADE', pop01(t, P.t0 + 1.7, 0.3, 2.4), GOLD, -0.04, 34)
    } },
  { sign: 'leo', cap: 'Let them brag about you. | *You earned it.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'TROPHY', 800, 830, 22 * pop01(t, P.t0 + 0.2, 0.35, 2))
      L(x, 800, 1070, 'FRIDGE HALL OF FAME', pop01(t, P.t0 + 1.2, 0.3, 2.4), GOLD, -0.04, 28)
      sparkles(x, t, 800, 830, P.t0 + 1.0, 7, 170, 0.4)
    } },
  { sign: 'leo', cap: 'Ask how *they* are. | Then really listen.', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.5],
    front(x, t, lt, P) {
      bubble(x, 800, 660, 'how are YOU?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 38, tail: 'bl' })
      friend(x, t, 'taurus', 820, 930, 170, pop01(t, P.t0 + 0.6, 0.3, 2), { mood: lt > 1.3 ? 'heart' : 'wide', look: [-1, 0], seed: 47, hops: [P.t0 + 1.4] })
      L(x, 800, 1110, 'EARS: ON', pop01(t, P.t0 + 1.6, 0.3, 2.4), MINT, 0.04, 32)
    } },
  { sign: 'leo', cap: 'Missed their call? | *Call back.* No guilt.', mood: lt => lt > 1.3 ? 'sparkle' : 'wide', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      phone(x, t, 800, 820, pop01(t, P.t0 + 0.2, 0.3, 2), { head: lt > 1.2 ? 'CALLING…' : 'MISSED CALL', headCol: lt > 1.2 ? MINT : RED, rot: 0.05 + ring(t, lt, 1.2, 2.4), lines: [['HOME ♥', BONE, 1]] })
      L(x, 800, 1090, 'GUILT: OPTIONAL', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, -0.04, 32)
    } },
  { sign: 'leo', cap: 'Home can be a person. | *Call them too.*', mood: 'heart', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      bits(x, 'HOUSE', 800, 800, 20 * pop01(t, P.t0 + 0.2, 0.35, 2))
      friend(x, t, 'libra', 800, 830, 90, pop01(t, P.t0 + 0.9, 0.3, 2), { mood: 'happy', seed: 48 })
      L(x, 800, 1070, 'CHOSEN FAMILY', pop01(t, P.t0 + 1.4, 0.3, 2.4), PINK, 0.04, 32)
    } },
  { sign: 'leo', cap: 'You’re someone’s | *favorite voice.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.9, 1.7],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'HEARTB', 800, 830, 24 * pop01(t, P.t0 + 0.2, 0.35, 2) * (1 + 0.07 * Math.max(0, Math.sin(t * 7))))
      notes(x, t, 800, 680, { n: 4, cell: 7, col: GOLD, seed: 3 })
      L(x, 800, 1070, 'NOW PLAYING: YOU', pop01(t, P.t0 + 1.2, 0.3, 2.4), LAV, -0.04, 30)
    } },
]

const F = makeFilm({
  id: 'r2a0552', key: 'F', accent: ACC, solo: 'leo', ending: 'lesson',
  title: 'Leo, this is your | sign *to call home.*',
  cameos: CAMEOS,
  group: { cap: 'Big heart. | *Bigger reach.*', mood: 'heart' },
  lesson: { text: 'The people who love you | *light up* when you call.', chip: 'CALL: CONNECTED' },
  last: { text: 'Go on. | *They’ll pick up.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
