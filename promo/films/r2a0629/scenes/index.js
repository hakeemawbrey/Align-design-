// r2a0629: star_advice, ADVICE SOLO (gemini), "What Geminis need | *from a friend.*" (signs3kit social cut, music: lofi · E).
// Nine cards: what a Gemini needs from a friend, one gag each: someone who answers all twelve texts · plans change?
// someone who says "cool" · weird facts? someone who asks more · two moods a day, love both · fifty tabs, help close
// one · quiet days, someone who just sits with you · laughs at the same joke twice · need a hype friend? find a Leo ·
// someone who remembers what you said (the guitar).
// Ending: callback ("Twelve texts. | *Twelve replies.*", the phone from card one comes back).
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, bits, swapLabel, friend, zzz, RED, CREAM, STEEL, WOOD, NIGHT, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ffd23a', ST = { x: -180 }, SG = 'gemini'
const GUITAR = ['......KK', '.....KK.', '....KK..', '...KK...', '.OOK....', 'OOOOO...', 'OOKOOO..', 'OOOOOO..', '.OOOO...']
const GUITAR_C = { K: '#8a4a2e', O: '#ff9a4a' }

const CAMEOS = [
  { sign: SG, cap: 'A friend who answers | *all twelve texts.*', mood: lt => lt > 1.4 ? 'heart' : 'sparkle', look: [1, 0], star: ST, hops: [1.5],
    front(x, t, lt, P) {
      const n = 1 + Math.floor(clamp((lt - 0.2) / 1.0) * 11)
      phone(x, t, 800, 880, 1.2 * pop01(t, P.t0 + 0.2, 0.3, 2), { head: `SENT: ${n}`, headCol: GOLD, lines: [['omg', GOLD, 1, true], ['wait also', GOLD, 1, true], ['yes. yes. lol. YES', MINT, pop01(t, P.t0 + 1.4, 0.25, 2.2)]], size: 20 })
    } },
  { sign: SG, cap: 'Plans changed? | A friend who says *“cool.”*', mood: lt => lt > 1.3 ? 'happy' : 'wide', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      const PL = ['PLAN A', 'PLAN B', 'PLAN C', 'PLAN D']
      const i = Math.min(3, Math.floor(Math.max(0, lt - 0.2) / 0.3))
      L(x, 800, 700, PL[i], pop01(t, P.t0 + 0.2, 0.3, 2), STEEL, -0.04, 44)
      friend(x, t, 'taurus', 800, 930, 180, pop01(t, P.t0 + 0.9, 0.3, 2), { mood: 'happy', look: [-1, 0] })
      bubble(x, 800, 1110, 'cool. see you there.', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 30, tail: 'bc' })
    } },
  { sign: SG, cap: 'Weird fact? | A friend who *asks more.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.6, 1.5],
    front(x, t, lt, P) {
      bubble(x, 760, 660, 'octopuses have | three hearts!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 32, tail: 'bl' })
      friend(x, t, 'virgo', 820, 960, 170, pop01(t, P.t0 + 0.8, 0.3, 2), { mood: lt > 1.3 ? 'wide' : 'happy', look: [-1, -1] })
      L(x, 820, 1120, 'TELL ME MORE', pop01(t, P.t0 + 1.4, 0.3, 2.2), MINT, 0.04, 32)
    } },
  { sign: SG, cap: 'Two moods a day? | A friend who *loves both.*', mood: lt => Math.floor(lt * 2) % 2 ? 'sleepy' : 'sparkle', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      L(x, 800, 720, 'MOOD 1: CHAOS ♡', pop01(t, P.t0 + 0.3, 0.3, 2), GOLD, -0.04, 32)
      L(x, 800, 860, 'MOOD 2: NAP ♡', pop01(t, P.t0 + 0.9, 0.3, 2), LAV, 0.04, 32)
      hearts(x, t, 800, 1060, P.t0 + 1.4, { n: 6, life: 1.6, spread: 200, cell: 8, seed: 3 })
    } },
  { sign: SG, cap: 'Fifty tabs open? | Someone who *closes one.*', mood: lt => lt > 1.5 ? 'happy' : 'wide', look: [1, 0], star: ST, hops: [1.6],
    front(x, t, lt, P) {
      const n = lt < 1.2 ? 50 : 49
      bits(x, 'LAPTOP', 800, 900, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 690, `TABS: ${n}`, pop01(t, P.t0 + 0.3, 0.3, 2), lt < 1.2 ? RED : MINT, 0.04, 44)
      L(x, 800, 1110, 'PROGRESS!', pop01(t, P.t0 + 1.5, 0.3, 2.2), GOLD, -0.04, 36)
    } },
  { sign: SG, cap: 'Quiet day? | Someone who *just sits.*', mood: 'sleepy', look: [1, 0], star: { x: -180, y: 30 },
    back(x, t, lt, P) { bits(x, 'COUCH', 560, 1010, 26 * pop01(t, P.t0 + 0.15, 0.3, 2)) },
    front(x, t, lt, P) {
      friend(x, t, 'cancer', 760, 930, 180, pop01(t, P.t0 + 0.5, 0.3, 2), { mood: 'sleepy', look: [-1, 0] })
      zzz(x, t, 820, 760)
      L(x, 820, 650, 'NO TALKING NEEDED', pop01(t, P.t0 + 1.3, 0.3, 2.2), LAV, -0.04, 28)
    } },
  { sign: SG, cap: 'Laughs at your joke. | *The second time too.*', mood: lt => lt > 0.9 ? 'happy' : 'wink', look: [1, 0], star: ST, hops: [1.0, 1.8],
    front(x, t, lt, P) {
      bubble(x, 800, 680, 'so a cloud walks into…', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 30, tail: 'bl' })
      L(x, 800, 880, 'HAHA!', pop01(t, P.t0 + 0.8, 0.3, 2), GOLD, -0.06, 50)
      L(x, 800, 1040, 'AGAIN: HAHA!', pop01(t, P.t0 + 1.6, 0.3, 2.2), PINK, 0.05, 44)
    } },
  { sign: SG, cap: 'Need a hype friend? | *Find a Leo.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.2, 1.6],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      friend(x, t, 'leo', 800, 920, 200, pop01(t, P.t0 + 0.3, 0.3, 2), { mood: 'sparkle', look: [-1, 0], hops: [P.t0 + 1.0, P.t0 + 1.5] })
      L(x, 800, 680, 'FRIEND MATCH ♌︎', pop01(t, P.t0 + 0.7, 0.3, 2), '#ffb34a', -0.04, 34)
      bubble(x, 800, 1110, 'YOU’RE A GENIUS!!', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 34, tail: 'bc' })
    } },
  { sign: SG, cap: 'Someone who | *remembers.*', mood: lt => lt > 1.4 ? 'heart' : 'wide', look: [1, 0], star: ST, hops: [1.5],
    front(x, t, lt, P) {
      bubble(x, 800, 660, '“i want to learn | guitar” (once)', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 28, tail: 'bl' })
      bits(x, 'GIFT', 800, 920, 18 * pop01(t, P.t0 + 0.7, 0.3, 2), { alpha: lt < 1.3 ? 1 : 0 })
      if (lt >= 1.3) drawBits(x, GUITAR, GUITAR_C, 800, 920, 20 * pop01(t, P.t0 + 1.3, 0.3, 2.2), { rot: -0.2 })
      sparkles(x, t, 800, 920, P.t0 + 1.35, 7, 160, 0.3)
    } },
]

const F = makeFilm({
  id: 'r2a0629', key: 'E', accent: ACC, solo: SG, ending: 'callback',
  title: 'What Geminis need | *from a friend.*',
  cameos: CAMEOS,
  group: { cap: 'Busy brain. | *Big heart.*', mood: 'heart' },
  last: {
    text: 'Twelve texts. | *Twelve replies.*',
    draw(x, t, lt) {
      phone(x, t, 540, 1380, 1.6 * pop01(t, t - lt + 0.5, 0.35, 2), { head: 'REPLIES: 12', headCol: MINT, lines: [['yes!!', MINT, pop01(t, t - lt + 1.0, 0.25, 2.2)], ['lol same', MINT, pop01(t, t - lt + 1.3, 0.25, 2.2)], ['tell me EVERYTHING', MINT, pop01(t, t - lt + 1.6, 0.25, 2.2)]], size: 20, rot: 0.04 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
