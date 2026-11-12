// r2a0769: star_advice, ADVICE SOLO (gemini), "Gemini, let yourself | *be loved.*" (signs3kit social cut, lofi · E).
// One sign the whole way: nine Gemini truths about letting love in, each with a warm reframe and one light gag.
// Ending: card (lesson + last line over the match card: Gemini + Cancer, the friend who asked "how are you, really?").
//   jokes when it gets serious · changes the subject (topic: still you) · "too much"? both of you are loved (the twin)
//   · compliment → just "thank you" · the fun one can be the tired one · fifty friends, let one in (door)
//   · scared they'll get bored (topics: 14) · love feels like a lot, start with a hug · "how are you, really?" tell them
//   lesson "You’re easy to love. | *Let it land.*"   last "Your match? | *Asks you twice.*"
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, friend, bits, swapLabel, RED, CREAM, STEEL, WOOD, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ffd23a', S = 'gemini', ST = { x: -180 }

const CAMEOS = [
  { sign: S, cap: 'Joke when it gets deep? | *We still see you.*', mood: lt => lt > 1.4 ? 'heart' : 'wink', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'haha anyway—', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, tail: 'bl' })
      L(x, 790, 920, 'NICE TRY', pop01(t, P.t0 + 1.1, 0.3, 2.4), LAV, -0.04, 40)
      L(x, 790, 1080, 'STILL LISTENING', pop01(t, P.t0 + 1.7, 0.3, 2.2), MINT, 0.04, 32)
    } },
  { sign: S, cap: 'Changed the subject again? | *You’re allowed to stay.*', mood: lt => lt > 1.3 ? 'happy' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      swapLabel(x, 770, 780, lt, 0.9, 'TOPIC: YOU', 'TOPIC: WEATHER?', { size: 32, fromBg: PINK, toBg: STEEL })
      L(x, 770, 1010, 'TOPIC: STILL YOU', pop01(t, P.t0 + 1.9, 0.3, 2.4), PINK, 0.04, 32)
    } },
  { sign: S, cap: 'Feel like “too much”? | *Both of you are loved.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: { x: -200 }, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      friend(x, t, 'gemini', 820, 960, 240, pop01(t, P.t0 + 0.4, 0.35, 2), { mood: lt > 1.2 ? 'heart' : 'neutral', look: [-1, 0], hops: [P.t0 + 1.3 * 1.29] })
      L(x, 780, 680, 'VERSIONS: 2', pop01(t, P.t0 + 0.7, 0.3, 2.2), CREAM, -0.04, 34)
      L(x, 600, 1130, 'BOTH: WELCOME', pop01(t, P.t0 + 1.6, 0.3, 2.2), ACC, 0.04, 32)
      hearts(x, t, 640, 1040, P.t0 + 1.4, { n: 6, life: 1.8, spread: 160, cell: 7, seed: 3 })
    } },
  { sign: S, cap: 'Got a compliment? | *Just say thank you.*', mood: lt => lt > 1.5 ? 'heart' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 690, 'you’re | wonderful.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, tail: 'br', col: PINK })
      swapLabel(x, 790, 940, lt, 1.0, '“no YOU are”', '“…thank you.”', { size: 34, fromBg: STEEL, toBg: MINT })
      L(x, 790, 1100, 'PROGRESS', pop01(t, P.t0 + 2.0, 0.3, 2.2), GOLD, 0.04, 32)
    } },
  { sign: S, cap: 'Always the fun one? | *Be the tired one.*', mood: lt => lt > 1.0 ? 'sleepy' : 'happy', star: { x: -180, y: 10 },
    front(x, t, lt, P) {
      bits(x, 'BLANKET', 800, 940, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      swapLabel(x, 770, 690, lt, 0.9, 'PARTY: 9PM', 'COUCH: ALL NIGHT', { size: 30, fromBg: '#ff9a4a', toBg: LAV })
      L(x, 790, 1110, 'STILL INVITED', pop01(t, P.t0 + 1.8, 0.3, 2.2), MINT, 0.04, 30)
    } },
  { sign: S, cap: 'Fifty friends? | *Let one in close.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const op = ease.outCubic(clamp((lt - 0.8) / 0.5))
      bits(x, 'DOORX', 800, 880, 24 * pop01(t, P.t0 + 0.2, 0.3, 2), { sx: lerp(1, 0.25, op) })
      if (op > 0.2) friend(x, t, 'cancer', 860, 930, 200, op, { mood: 'happy', look: [-1, 0] })
      L(x, 800, 650, 'FRIENDS: 50', pop01(t, P.t0 + 0.3, 0.3, 2.2), CREAM, -0.04, 34)
      L(x, 800, 1120, 'CLOSE ONES: +1', pop01(t, P.t0 + 1.6, 0.3, 2.2), PINK, 0.04, 32)
    } },
  { sign: S, cap: 'Scared they’ll get bored? | *You’re never boring.*', mood: lt => lt > 1.4 ? 'sparkle' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 850, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 300, h: 330, head: 'TONIGHT’S TOPICS', headBg: ACC, headInk: INK, lines: ['1. octopuses', '2. old songs', '3. your dream', '…14. space?'], size: 28, progress: clamp((lt - 0.3) / 1.3) })
      L(x, 800, 1100, 'BORED: NOBODY', pop01(t, P.t0 + 1.8, 0.3, 2.2), MINT, 0.04, 30)
    } },
  { sign: S, cap: 'Love feels like a lot? | *Start with a hug.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', look: [1, 0], star: { x: -150 },
    front(x, t, lt, P) {
      friend(x, t, 'libra', 760, 950, 220, pop01(t, P.t0 + 0.35, 0.35, 2), { mood: 'heart', look: [-1, 0], hops: [P.t0 + 1.2] })
      L(x, 780, 1130, 'HUG: 10/10', pop01(t, P.t0 + 1.0, 0.3, 2.2), PINK, -0.04, 34)
      hearts(x, t, 560, 800, P.t0 + 1.2, { n: 6, life: 1.8, spread: 220, cell: 7, seed: 5 })
    } },
  { sign: S, cap: '“How are you, really?” | *Tell them.*', mood: lt => lt > 1.5 ? 'heart' : 'neutral', look: [1, 0], star: { x: -200 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      friend(x, t, 'cancer', 840, 1000, 180, pop01(t, P.t0 + 0.3, 0.35, 2), { mood: lt > 1.5 ? 'heart' : 'happy', look: [-1, 0] })
      bubble(x, 760, 680, 'honestly? | kinda tired.', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 38, tail: 'bl' })
      L(x, 700, 1130, 'THEY STAYED', pop01(t, P.t0 + 1.7, 0.3, 2.2), MINT, 0.04, 32)
    } },
]

const F = makeFilm({
  id: 'r2a0769', key: 'E', accent: ACC, solo: S, ending: 'card',
  title: 'Gemini, let yourself | *be loved.*',
  cameos: CAMEOS,
  card: { a: 'gemini', b: 'cancer', chip: 'ALIGNED' },
  group: { cap: 'All of you. | *Every version.*', mood: 'heart' },
  lesson: { text: 'You’re easy to love. | *Let it land.*', chip: 'STATUS: LOVED' },
  last: {
    text: 'Your match? | *Asks you twice.*',
    draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 0.3, { n: 10, life: 2.2, spread: 700, cell: 8, seed: 3 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
