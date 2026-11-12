// r2t0715: star_talk, SOLO, "Gemini red flags | we love." (signs3kit social cut, music: lofi · F, ending: card)
// One sign the whole way (solo mode, 9 cards), each red flag the most extreme (and lovable) Gemini version:
//   0.0–3.6    "Gemini red flags | *we love.*"
//   3.6–37.8   nine cards: replies in seven separate texts · started a story, forgot the ending · new favourite food
//              every day · knows everyone at the party, somehow · bought a guitar, now it's a coat rack · asks your sign,
//              then argues with it · laughs at their own joke first · "on my way" (still in bed) · two personalities,
//              both your favourite
//  37.8        "Chaotic. | *Never boring.*"
//  41.0        LESSON: "Keep up with a Gemini. | It's *worth it.*"  STATUS: ENTERTAINED
//  46.9        "Their match? | *Can keep up.*" over the match card: Gemini + Sagittarius.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { phone, note, board, bed, friend, chartWheel, zzz, GUITAR, GUITAR_C, RED, CREAM, ORANGE, VIOLET, NIGHT } from './props.js'

const S = 'gemini', YEL = '#ffd23a'
const SCARF = ['RRRRRRRR', 'RWRWRWRW', 'RRRRRRRR', '......RR', '......RW', '......RR', '......RW']
const COAT = ['..CCCC..', '.CCCCCC.', 'CCCCCCCC', 'CCcCCcCC', 'CCCCCCCC', 'CCcCCcCC', 'CCCCCCCC', 'CC.CC.CC']

const CAMEOS = [
  { sign: S, cap: 'Replies in | *seven separate texts.*', mood: 'sparkle', look: [1, 0], star: { x: -200 }, hops: [0.6, 1.0, 1.4, 1.8],
    front(x, t, lt, P) {
      const M = ['hi', 'wait', 'omg', 'ok so', 'LOL', 'nvm', 'call me']
      const n = Math.floor(clamp((lt - 0.3) / 1.6) * 7.99)
      phone(x, 790, 850, 1.1 * pop01(t, P.t0 + 0.2, 0.3, 2), { head: `${Math.min(7, n)} NEW`, headCol: YEL, lines: M.slice(Math.max(0, n - 5), n).map((s, i) => [s, i % 2 ? LAV : BONE, 1]) })
    } },
  { sign: S, cap: 'Started a story. | *Forgot the ending.*', mood: lt => lt > 1.3 ? 'wide' : 'sparkle', look: [1, 0], star: { x: -200 }, hops: [0.7],
    front(x, t, lt, P) {
      bubble(x, 780, 650, 'so THEN she—', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 36, tail: 'bl' })
      bubble(x, 800, 820, 'wait, who?', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 36, tail: 'bl', col: LAV })
      label(x, 790, 1060, 'PLOT: LOST', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 38, bg: YEL, font: MONO, weight: 700, rot: -0.05 })
    } },
  { sign: S, cap: 'New favourite food | *every single day.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      note(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), { title: 'MY FAVE ♡', lines: ['MON: tacos', 'TUE: soup', 'WED: just tacos', 'THU: never tacos'], ticks: clamp((lt - 0.5) / 1.3) * 4.01, strike: true, w: 360, head: YEL })
    } },
  { sign: S, cap: 'Knows everyone here. | *Somehow.*', mood: 'sparkle', star: { x: -220 }, hops: [0.8, 1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const IDS = ['cancer', 'virgo', 'aquarius', 'aries', 'libra']
      IDS.forEach((id, i) => friend(x, t, id, 620 + (i % 3) * 140, 760 + Math.floor(i / 3) * 210 + (i % 2) * 30, 140, pop01(t, P.t0 + 0.3 + i * 0.15, 0.35, 2), { mood: 'happy', look: [-1, 0], hops: [P.t0 + 1.1 + i * 0.1] }))
      bubble(x, 780, 600, 'HEYYY BESTIE', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: S, cap: 'Bought a guitar. | *Now it’s a coat rack.*', mood: lt => lt > 1.4 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      drawBits(x, GUITAR, GUITAR_C, 790, 880, 30 * k, { rot: 0.1 })
      drawBits(x, SCARF, { R: PINK, W: CREAM }, 880, 680, 13 * pop01(t, P.t0 + 0.9, 0.3, 2), { rot: 0.3 })
      drawBits(x, COAT, { C: '#7a86b8', c: INK }, 760, 900, 12 * pop01(t, P.t0 + 1.2, 0.3, 2), { rot: -0.1 })
      label(x, 790, 1120, 'LESSONS: 1', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 34, bg: YEL, font: MONO, weight: 700, rot: 0.04 })
    } },
  { sign: S, cap: 'Asks your sign. | *Then argues with it.*', mood: lt => lt > 1.2 ? 'squint' : 'sparkle', look: [1, 0], star: { x: -200 }, hops: [1.3],
    front(x, t, lt, P) {
      friend(x, t, 'taurus', 820, 980, 190, pop01(t, P.t0 + 0.3, 0.35, 2), { mood: lt > 1.4 ? 'wide' : 'happy', look: [-1, 0] })
      bubble(x, 820, 760, 'taurus.', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 34, tail: 'bc', col: LAV })
      bubble(x, 560, 620, 'no. you’re SO | a leo.', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: S, cap: 'Laughs at their own joke. | *Before the punchline.*', mood: lt => lt > 0.6 ? 'squint' : 'happy', squash: lt => lt > 0.6 ? 0.06 * Math.sin(lt * 30) : 0, star: { x: -200 },
    front(x, t, lt, P) {
      bubble(x, 790, 660, 'okay so a duck—', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 34, tail: 'bl' })
      label(x, 790, 880, 'HAHAHAHA', pop01(t, P.t0 + 0.7, 0.3, 2.2), { size: 52, bg: YEL, font: INTER, weight: 800, rot: -0.06 + 0.04 * Math.sin(t * 12) })
      bubble(x, 790, 1080, 'wait i’ll start over', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 30, tail: 'bl', col: LAV })
    } },
  { sign: S, cap: 'Texted “on my way.” | *Still in bed.*', mood: 'sleepy', star: { x: -120, y: -40, s: 260 },
    back(x, t, lt, P) { bed(x, 540, 1020, 0.9 * pop01(t, P.t0 + 0.1, 0.35, 2), { blanket: YEL }) },
    front(x, t, lt, P) {
      phone(x, 820, 740, 0.7 * pop01(t, P.t0 + 0.4, 0.3, 2), { head: 'SENT', headCol: MINT, rot: 0.1, lines: [['omw!!', BONE, 1]] })
      label(x, 300, 640, 'ETA: TUESDAY', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: LAV, font: MONO, weight: 700, rot: -0.05 })
    } },
  { sign: S, cap: 'Two personalities. | *Both your favourite.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', star: { x: -200 }, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      friend(x, t, S, 720, 900, 180, k, { mood: 'wink', look: [1, 0], seed: 61 })
      friend(x, t, S, 880, 880, 180, pop01(t, P.t0 + 0.6, 0.35, 2), { mood: 'squint', look: [-1, 0], seed: 62 })
      label(x, 720, 1080, 'FUN', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 34, bg: YEL, font: MONO, weight: 700, rot: -0.06 })
      label(x, 860, 1100, 'ALSO FUN', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: PINK, font: MONO, weight: 700, rot: 0.06 })
    } },
]

const F = makeFilm({
  id: 'r2t0715', key: 'F', accent: YEL, solo: S, ending: 'card',
  title: 'Gemini red flags | *we love.*',
  cameos: CAMEOS,
  card: { a: 'gemini', b: 'sagittarius', chip: 'IT’S A MATCH' },
  group: { cap: 'Chaotic. | *Never boring.*', mood: 'wink' },
  lesson: { text: 'Keep up with a Gemini. | It’s *worth it.*', chip: 'STATUS: ENTERTAINED' },
  last: {
    text: 'Their match? | *Can keep up.*',
    draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 0.3, { n: 10, life: 2.2, spread: 700, cell: 8, seed: 5 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
