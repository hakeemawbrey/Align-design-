// r2a0746: star_advice, ADVICE SOLO, "Signs a Scorpio | *likes you.*" (~52 s vertical, signs3kit social cut, music: lofi · D).
// One sign the whole way, 9 cards, each a relatable Scorpio truth told warmly, one visual gag each:
//   remembers your coffee order from one mention · sends the real playlist · laughs too loud around you · skips small talk
//   · quietly checked your compatibility (twice) · texts back fast, plays it cool · introduces you to the one friend
//   · has your back · hands you a key to the real them
//  37.8  "Intense? Yes. | *Loyal? Forever.*"   41.0  LESSON "Slow to open. | *Worth the wait.*" TRUST: EARNED
//  46.9  "Got the key? | *You're in.*" over the match card: Scorpio + Taurus (the key comes back).
import { makeFilm, drawBits, sparkles, hearts, bubble, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { L, sheet, bits, phone, friend, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const S = 'scorpio', ACC = '#e23d66', ST = { x: -170 }
const BIGKEY = ['.YYYY..........', 'YY..YY.........', 'Y....YYYYYYYYYY', 'Y....YYYYYYYYYY', 'YY..YY....Y.Y.Y', '.YYYY.....Y.Y..']
const KEY_C = { Y: GOLD }

const CAMEOS = [
  { sign: S, cap: 'Remembers your order. | *From one mention.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'MUG', 790, 930, 20 * pop01(t, P.t0 + 0.3, 0.3, 2))
      bubble(x, 790, 680, 'oat, extra hot?', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 38, tail: 'bl' })
      L(x, 790, 1110, 'NOTED ♡ MONTHS AGO', pop01(t, P.t0 + 1.4, 0.3, 2.4), PINK, -0.04, 28)
    } },
  { sign: S, cap: 'Sends you the *real* playlist. | Not the public one.', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), { head: 'PRIVATE ♡', headCol: ACC, lines: [['1. sad song', LAV, pop01(t, P.t0 + 0.6, 0.25, 2)], ['2. sadder song', LAV, pop01(t, P.t0 + 0.9, 0.25, 2)], ['3. for you', PINK, pop01(t, P.t0 + 1.2, 0.25, 2)]], size: 22 })
      L(x, 790, 1120, 'ACCESS: GRANTED', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, 0.04, 30)
    } },
  { sign: S, cap: 'Laughs *too loud.* | Only around you.', mood: lt => lt > 0.7 ? 'happy' : 'neutral', squash: lt => lt > 0.7 ? 0.05 * Math.sin(lt * 30) : 0, star: ST, hops: [0.8, 1.3],
    front(x, t, lt, P) {
      bubble(x, 790, 760, 'HA HA HA', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 70, tail: 'bl' })
      L(x, 790, 1000, 'GUARD: DOWN', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, -0.05, 38)
    } },
  { sign: S, cap: 'Skips small talk. | *Asks the real stuff.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'weather? no. | what’s your | biggest dream?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 34, tail: 'bl', col: LAV })
      L(x, 790, 990, 'DATE 2. DEEP END.', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, 0.04, 32)
    } },
  { sign: S, cap: 'Checked your compatibility. | *Quietly. Twice.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      sheet(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 320, h: 300, head: 'COMPATIBILITY', headBg: ACC, lines: ['scorpio + you', 'check 1: ♡', 'check 2: ♡♡'], size: 30, align: 'left', progress: clamp((lt - 0.3) / 1.1) })
      L(x, 790, 1100, 'TELLING NO ONE', pop01(t, P.t0 + 1.6, 0.3, 2.4), LAV, -0.04, 30)
      hearts(x, t, 370, 760, P.t0 + 1.5, { n: 4, life: 1.6, spread: 140, cell: 7, seed: 5 })
    } },
  { sign: S, cap: 'Replies in seconds. | Calls it *“casual.”*', mood: lt => lt > 1.2 ? 'wink' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), { head: 'YOU ♡', headCol: MINT, lines: [['hey', BONE, pop01(t, P.t0 + 0.4, 0.25, 2), true], ['oh hi :)', PINK, pop01(t, P.t0 + 0.6, 0.25, 2)]], typing: 0 })
      L(x, 790, 620, 'REPLY: 0.3 SEC', pop01(t, P.t0 + 0.8, 0.3, 2.4), GOLD, 0.05, 34)
      bubble(x, 420, 640, 'was just | around', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 32, tail: 'br' })
    } },
  { sign: S, cap: 'Introduces you to | *the one friend.*', mood: 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      friend(x, t, 'cancer', 790, 960, 220, pop01(t, P.t0 + 0.3, 0.35, 2), { mood: lt > 1.2 ? 'heart' : 'wide', look: [-1, 0], hops: [P.t0 + 1.3] })
      L(x, 790, 680, 'INNER CIRCLE: 2', pop01(t, P.t0 + 0.8, 0.3, 2.4), GOLD, 0.04, 34)
      bubble(x, 420, 640, 'this is | huge.', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 34, tail: 'br' })
    } },
  { sign: S, cap: 'Hears one bad word about you. | *Full shield.*', mood: 'squint', look: [1, 0], star: ST, hops: [0.9],
    front(x, t, lt, P) {
      bits(x, 'SHIELD', 790, 880, 26 * pop01(t, P.t0 + 0.8, 0.35, 2))
      bubble(x, 790, 640, 'excuse me?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, tail: 'bl' })
      L(x, 790, 1120, 'ON YOUR SIDE ♡', pop01(t, P.t0 + 1.5, 0.3, 2.4), PINK, -0.04, 32)
    } },
  { sign: S, cap: 'Hands you a key. | To the *real them.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, BIGKEY, KEY_C, 790, 860, 18 * pop01(t, P.t0 + 0.3, 0.35, 2), { rot: -0.15 })
      sparkles(x, t, 790, 860, P.t0 + 0.6, 7, 180, 0.4)
      L(x, 790, 1080, 'ONLY COPY', pop01(t, P.t0 + 1.3, 0.3, 2.4), GOLD, 0.04, 36)
    } },
]

const F = makeFilm({
  id: 'r2a0746', key: 'D', accent: ACC, solo: S, ending: 'card',
  title: 'Signs a Scorpio | *likes you.*',
  cameos: CAMEOS,
  card: { a: 'scorpio', b: 'taurus', chip: 'ALIGNED' },
  group: { cap: 'Intense? Yes. | *Loyal? Forever.*', mood: 'heart' },
  lesson: { text: 'Slow to open. | *Worth the wait.*', chip: 'TRUST: EARNED' },
  last: {
    text: 'Got the key? | *You’re in.*',
    draw(x, t, lt) { drawBits(x, BIGKEY, KEY_C, 540, 1490, 12 * pop01(t, t - lt + 1.6, 0.3, 2), { rot: -0.1 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
