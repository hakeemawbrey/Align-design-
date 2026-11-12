// r2a0534: star_advice, ADVICE ROLLCALL (twelve signs), "Each sign's | kindest habit." (signs3kit social cut, music: lofi · E).
// One warm, specific habit per sign with a light visual gag. Ending: lesson.
import { makeFilm, sparkles, hearts, bubble, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, steam, friend, bits, swapLabel, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ff8fb1', ST = { x: -180 }

const CAMEOS = [
  { sign: 'aries', cap: 'Defends you. | *Instantly.*', mood: 'squint', look: [1, 0], star: ST, hops: [0.3, 0.6],
    front(x, t, lt, P, F) {
      bits(x, 'SHIELD', F.x + 170, F.cy, 16 * pop01(t, P.t0 + 0.2, 0.25, 2))
      friend(x, t, 'pisces', 860, 1000, 130, pop01(t, P.t0 + 0.4, 0.3, 2), { mood: 'heart', look: [-1, 0], seed: 41, tears: 1 })
      L(x, 800, 690, 'ON IT.', pop01(t, P.t0 + 0.9, 0.3, 2.4), RED, 0.05, 40)
    } },
  { sign: 'taurus', cap: 'Always brings | *snacks to share.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      bits(x, 'BAG', 800, 830, 18 * pop01(t, P.t0 + 0.2, 0.35, 2))
      bits(x, 'COOKIE', 700, 1020, 10 * pop01(t, P.t0 + 0.9, 0.3, 2)); bits(x, 'COOKIE', 900, 1020, 10 * pop01(t, P.t0 + 1.1, 0.3, 2))
      L(x, 800, 650, 'ONE FOR YOU', pop01(t, P.t0 + 1.3, 0.3, 2.4), GOLD, 0.04, 32)
    } },
  { sign: 'gemini', cap: 'Texts first | when you go *quiet.*', mood: 'happy', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      phone(x, t, 800, 850, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'GEMINI ♊︎', headCol: GOLD, lines: [['you ok? ♡', GOLD, pop01(t, P.t0 + 0.5, 0.25, 2.2)], ['meme for you', BONE, pop01(t, P.t0 + 1.0, 0.25, 2.2)], ['…better now', MINT, pop01(t, P.t0 + 1.6, 0.25, 2.2), true]] })
    } },
  { sign: 'cancer', cap: 'Remembers | *your mom’s birthday.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      bits(x, 'GIFT', 800, 840, 20 * pop01(t, P.t0 + 0.2, 0.35, 2))
      L(x, 800, 1070, 'CARD SENT ✓', pop01(t, P.t0 + 1.2, 0.3, 2.4), PINK, -0.04, 34)
    } },
  { sign: 'leo', cap: 'Gives the *best* | compliments.', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.8],
    front(x, t, lt, P) {
      bubble(x, 800, 740, 'your laugh? | ICONIC.', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 38, col: GOLD, tail: 'bl' })
      friend(x, t, 'virgo', 820, 1010, 150, pop01(t, P.t0 + 0.8, 0.3, 2), { mood: lt > 1.3 ? 'heart' : 'wide', look: [-1, 0], seed: 42 })
    } },
  { sign: 'virgo', cap: 'Fixes things | *before you ask.*', mood: 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      bits(x, 'WRENCH', 800, 830, 18 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: Math.sin(t * 6) * 0.2 })
      L(x, 800, 1060, 'FIXED. QUIETLY.', pop01(t, P.t0 + 1.2, 0.3, 2.4), MINT, -0.04, 34)
    } },
  { sign: 'libra', cap: 'Makes sure everyone | feels *included.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      friend(x, t, 'capricorn', 720, 980, 120, pop01(t, P.t0 + 0.2, 0.3, 2), { mood: 'neutral', look: [1, 0], seed: 43 })
      friend(x, t, 'scorpio', 880, 980, 120, pop01(t, P.t0 + 0.9, 0.3, 2), { mood: 'happy', look: [-1, 0], seed: 44 })
      L(x, 800, 720, 'ALL SIGNS WELCOME', pop01(t, P.t0 + 0.6, 0.3, 2.4), PINK, 0.04, 30)
    } },
  { sign: 'scorpio', cap: 'Keeps your secrets. | *Forever.*', mood: 'squint', look: [1, 0], star: ST, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'KEY', 800, 830, 20 * pop01(t, P.t0 + 0.2, 0.35, 2))
      L(x, 800, 1060, 'VAULT: LOCKED', pop01(t, P.t0 + 1.2, 0.3, 2.4), LAV, -0.04, 34)
    } },
  { sign: 'sagittarius', cap: 'Makes you laugh | on *bad days.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.7, 1.3],
    front(x, t, lt, P) {
      friend(x, t, 'cancer', 820, 980, 150, pop01(t, P.t0 + 0.2, 0.3, 2), { mood: lt > 1.2 ? 'happy' : 'neutral', look: [-1, 0], seed: 45, hops: [P.t0 + 1.3, P.t0 + 1.6] })
      bubble(x, 780, 720, 'okay so a duck | walks in…', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 30, tail: 'bl' })
      L(x, 800, 1140, 'HA!', pop01(t, P.t0 + 1.3, 0.3, 2.4), GOLD, 0.05, 40)
    } },
  { sign: 'capricorn', cap: 'Shows up. | *Every* time.', mood: 'happy', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      bits(x, 'CLOCK', 800, 830, 18 * pop01(t, P.t0 + 0.2, 0.35, 2))
      L(x, 800, 1060, 'EARLY. AGAIN.', pop01(t, P.t0 + 1.1, 0.3, 2.4), MINT, -0.04, 34)
    } },
  { sign: 'aquarius', cap: 'Loves you | *exactly* as you are.', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.9],
    front(x, t, lt, P) {
      friend(x, t, 'gemini', 820, 990, 150, pop01(t, P.t0 + 0.2, 0.3, 2), { mood: 'wink', look: [-1, 0], seed: 46 })
      bubble(x, 780, 720, 'your chart? weird. | perfect.', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 38, col: SKYB, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'Feels it | *with* you.', mood: 'heart', tears: 3, look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      friend(x, t, 'taurus', 840, 960, 160, pop01(t, P.t0 + 0.2, 0.3, 2), { mood: 'neutral', look: [-1, 0], seed: 47, tears: 1 })
      bits(x, 'TISSUE', 840, 750, 15 * pop01(t, P.t0 + 0.8, 0.3, 2))
      L(x, 800, 1140, 'CRYING TOGETHER', pop01(t, P.t0 + 1.4, 0.3, 2.4), SKYB, -0.04, 30)
    } },
]

const F = makeFilm({
  id: 'r2a0534', key: 'E', accent: ACC, ending: 'lesson',
  title: 'Each sign’s | *kindest habit.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve ways | to be *kind.*', moods: ['sparkle', 'heart', 'happy', 'heart', 'sparkle', 'happy', 'heart', 'happy', 'sparkle', 'happy', 'sparkle', 'heart'] },
  lesson: { text: 'Small kindness, | every day, *adds up.*', chip: 'STATUS: KIND' },
  last: { text: 'Be the friend | with *the snacks.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
