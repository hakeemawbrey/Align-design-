// r2t0596: star_talk, SOLO (gemini), "The two moods | *of a Gemini.*" (signs3kit social cut, music: lofi · C).
// Nine cards, each one Gemini flipping between two extremes: going out → already in pajamas · forty memes → gone
// · loves everyone → battery 2% · four hobbies, all 25% · pizza AND tacos · profile bio changes daily
// · calm at 2:00, chaos at 2:05 · sobbing at the movie → laughing at the bloopers · both moods adore you.
// Ending: lesson ("Love both sides. | They're *both* real.") then "Which Gemini | *texted you today?*"
import { makeFilm, sparkles, hearts, bubble, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, zzz, swapLabel, friend, bits, confetti, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#8fe3ff', ST = { x: -180 }, SG = 'gemini'

const CAMEOS = [
  { sign: SG, cap: 'Wants to go out. | *Already* in pajamas.', mood: lt => lt > 1.1 ? 'sleepy' : 'sparkle', look: [1, 0], star: ST, hops: [0.6],
    front(x, t, lt, P, F) {
      swapLabel(x, 800, 760, lt, 0.9, 'GOING OUT!!', 'NEVER MIND', { size: 40, fromBg: PINK, toBg: LAV })
      if (lt > 1.0) bits(x, 'BLANKET', F.x, F.cy + 100, 17 * pop01(lt, 1.0, 0.3, 2))
      L(x, 800, 1060, '8:00 → 8:05 PM', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, 0.04, 34)
      if (lt > 1.4) zzz(x, t, 470, 700)
    } },
  { sign: SG, cap: 'Sends forty memes. | Then *vanishes.*', mood: lt => lt > 1.3 ? 'sleepy' : 'wink', look: [1, 0], star: ST, hops: [0.5, 0.9],
    front(x, t, lt, P) {
      const gone = lt > 1.3
      phone(x, t, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: gone ? 'AWAY · 3 DAYS' : 'GEMINI ♊︎', headCol: gone ? STEEL : SKYB, size: 22, lines: [
        ['LOL look', SKYB, pop01(t, P.t0 + 0.35, 0.2, 2.2)], ['this one!!', SKYB, pop01(t, P.t0 + 0.55, 0.2, 2.2)], ['meme #40', SKYB, pop01(t, P.t0 + 0.75, 0.2, 2.2)],
        ['haha omg', BONE, pop01(t, P.t0 + 1.0, 0.2, 2.2), true], ['hello??', BONE, pop01(t, P.t0 + 1.5, 0.2, 2.2), true],
      ] })
    } },
  { sign: SG, cap: 'Loves everyone. | Needs a *break.*', mood: lt => lt > 1.2 ? 'sleepy' : 'heart', look: [1, 0], star: ST, hops: [0.5],
    front(x, t, lt, P) {
      const leave = ease.inCubic(prog(lt, 1.0, 1.3))
      if (leave < 1) {
        friend(x, t, 'leo', 720, 900, 170, pop01(t, P.t0 + 0.2, 0.3, 2) * (1 - leave), { mood: 'sparkle', look: [-1, 0] })
        friend(x, t, 'libra', 900, 900, 170, pop01(t, P.t0 + 0.35, 0.3, 2) * (1 - leave), { mood: 'happy', look: [-1, 0], seed: 32 })
      }
      swapLabel(x, 800, 1070, lt, 1.1, 'PARTY MODE', 'BATTERY: 2%', { size: 38, fromBg: GOLD, toBg: RED })
      if (lt > 1.3) zzz(x, t, 470, 700)
    } },
  { sign: SG, cap: 'Starts four hobbies. | *Finishes* none.', mood: lt => lt > 1.4 ? 'wink' : 'sparkle', look: [1, 0], star: ST, hops: [1.5],
    front(x, t, lt, P) {
      sheet(x, 800, 840, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 340, h: 330, head: 'HOBBIES', headBg: SKYB, headInk: INK, align: 'left', size: 32, lines: ['guitar · 25%', 'pottery · 25%', 'french · 25%', 'yoga · 25%'], progress: clamp((lt - 0.3) / 0.9) })
      L(x, 800, 1090, 'NEW ONE: KNITTING', pop01(t, P.t0 + 1.5, 0.3, 2.4), PINK, -0.04, 32)
    } },
  { sign: SG, cap: 'Two opinions. | *Both* very sure.', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: lt => lt < 0.8 ? [1, -1] : [1, 1], star: ST, hops: [0.4, 0.9],
    front(x, t, lt, P) {
      bubble(x, 720, 700, 'PIZZA.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 52, col: '#ffd23a', tail: 'bl' })
      bubble(x, 880, 900, 'TACOS.', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 52, col: MINT, tail: 'bl' })
      L(x, 800, 1090, 'FINAL ANSWER: YES', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, 0.04, 34)
    } },
  { sign: SG, cap: 'Their profile bio | changes *daily.*', mood: 'wink', look: [1, 0], star: ST, hops: [1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, t, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'MY PROFILE ♊︎', headCol: SKYB, size: 22, lines: [
        ['MON: homebody', BONE, pop01(t, P.t0 + 0.4, 0.2, 2.2)], ['TUE: wild one', PINK, pop01(t, P.t0 + 0.75, 0.2, 2.2)],
        ['WED: hermit', LAV, pop01(t, P.t0 + 1.1, 0.2, 2.2)], ['THU: ask me', MINT, pop01(t, P.t0 + 1.45, 0.2, 2.2)],
      ] })
      L(x, 800, 1120, 'BIO UPDATED (AGAIN)', pop01(t, P.t0 + 1.7, 0.3, 2.4), GOLD, -0.04, 28)
    } },
  { sign: SG, cap: 'Calm at 2:00. | *Chaos* at 2:05.', mood: lt => lt > 1.0 ? 'wide' : 'sleepy', look: [1, 0], star: ST, hops: [1.1, 1.4, 1.7],
    front(x, t, lt, P, F) {
      bits(x, 'CLOCK', 800, 820, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: lt > 1.0 ? 0.08 * Math.sin(t * 28) : 0 })
      swapLabel(x, 800, 1070, lt, 0.9, '2:00 · CALM', '2:05 · CHAOS', { size: 40, fromBg: MINT, toBg: '#ff6b5a' })
      confetti(x, t, F.x, F.cy - 40, P.t0 + 0.9, { spread: 220 })
    } },
  { sign: SG, cap: 'Sobs at the movie. | Laughs at the *credits.*', mood: lt => lt > 1.2 ? 'happy' : 'wide', look: [1, 0], tears: lt => lt > 1.2 ? 0 : 2, star: ST, hops: [1.3, 1.6],
    front(x, t, lt, P) {
      bits(x, 'TV', 800, 820, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 800, 1060, lt > 1.2 ? 'HAHA BLOOPERS' : 'NOOO SHE LEFT', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 34, col: lt > 1.2 ? GOLD : SKYB, tail: 'bl' })
    } },
  { sign: SG, cap: 'Their two moods? | *Both* adore you.', mood: 'heart', look: [1, 0], star: ST, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      friend(x, t, 'gemini', 720, 880, 170, pop01(t, P.t0 + 0.2, 0.3, 2), { mood: 'sparkle', look: [1, 0], seed: 33 })
      friend(x, t, 'gemini', 900, 880, 170, pop01(t, P.t0 + 0.4, 0.3, 2), { mood: 'sleepy', look: [-1, 0], seed: 34 })
      L(x, 810, 1080, 'BESTIE · BOTH OF US', pop01(t, P.t0 + 1.2, 0.3, 2.4), PINK, 0.04, 30)
      hearts(x, t, 810, 800, P.t0 + 1.3, { n: 6, life: 1.6, spread: 200, cell: 7, seed: 6 })
    } },
]

const F = makeFilm({
  id: 'r2t0596', key: 'C', accent: ACC, solo: SG, ending: 'lesson',
  title: 'The two moods | *of a Gemini.*',
  cameos: CAMEOS,
  group: { cap: 'Two moods. | *One* big heart.', mood: 'sparkle' },
  lesson: { text: 'Love both sides. | They’re *both* real.', chip: 'MOOD: BOTH' },
  last: { text: 'Which Gemini | *texted you today?*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
