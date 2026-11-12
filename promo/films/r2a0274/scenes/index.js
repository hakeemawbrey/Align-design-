// r2a0274: star_advice, ADVICE ROLLCALL, "One question | *to ask each sign.*" (~57 s vertical, signs3kit social cut, music: lofi · E)
// Twelve signs, one warm, specific question each (the one they'd love to be asked), with a light gag. Ending: callback.
//   ♈ what's got you excited? (talks for an hour) · ♉ best thing you ate this week? (a match asks) · ♊ newest obsession?
//   · ♋ who takes care of you? · ♌ what are you proud of? · ♍ what would you do with a free day? (?!) · ♎ what do YOU want?
//   · ♏ what are you loving lately? (fine. dogs.) · ♐ where to next? · ♑ when did you last rest? (loading…)
//   · ♒ what's your weirdest idea? · ♓ what's your favourite daydream? (happy tears)
//   group "Ask, then | *really listen.*"   callback "Aries? | *Still answering.*" (the hour-long answer, now hour two)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { phone, note, calendar, bits, ORANGE, RED, WOOD, PAPER, SLATE } from '../props.js'

const ST = { x: -170 }
const BULB = [['..YYYY..', '.YYYYYY.', 'YYYWYYYY', 'YYYYYYYY', '.YYYYYY.', '..YYYY..', '..SSSS..', '..SSSS..'], { Y: GOLD, W: '#fff', S: '#9aa5c4' }]
const CLOUD = [['...WWWW.....', '..WWWWWW.WW.', '.WWWWWWWWWWW', 'WWWWWWWWWWWW', '.WWWWWWWWWW.'], { W: '#e6dcff' }]
const DOG = [['KK......KK..', 'KBK....KBK..', '.BBBBBBBB...', '.BWBBBBWB...', '.BBBBBBBB...', '..BBNNBB....', '...BBBB.....'], { K: '#5a3a1e', B: '#d9a35a', W: INK, N: INK }]

const CAMEOS = [
  { sign: 'aries', cap: '“What’s got you | *excited* lately?”', mood: lt => lt > 0.8 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [0.8, 1.2, 1.6],
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'OK SO. FIRST—', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 42, tail: 'bl' })
      label(x, 790, 960, 'TALKED FOR AN HOUR', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: '“Best thing you | *ate* this week?”', mood: lt => lt > 1.1 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, 790, 820, 1.15 * pop01(t, P.t0 + 0.2, 0.3, 2), { top: '✦', head: 'NEW MATCH', msg: 'best thing | you ate?', bg: MINT })
      hearts(x, t, 470, 760, P.t0 + 1.1, { n: 4, life: 1.5, spread: 120, cell: 6, seed: 4 })
    } },
  { sign: 'gemini', cap: '“What’s your newest | *obsession?*”', mood: lt => Math.floor(lt * 2.8) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      note(x, 790, 820, pop01(t, P.t0 + 0.2, 0.3, 2), 'pottery | moths | a new | language', { head: 'THIS WEEK', headBg: GOLD, size: 34, w: 300, strike: lt > 1.4 ? [0] : [] })
    } },
  { sign: 'cancer', cap: '“Who takes | care of *you?*”', mood: lt => lt > 1.2 ? 'heart' : 'wide', look: [1, 0], star: ST, keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'nobody | asks that…', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 42, tail: 'bl', col: LAV })
      label(x, 790, 960, 'I DO, TODAY ♡', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 40, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: '“What are you | *proud* of?”', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.1],
    front(x, t, lt, P) {
      bits(x, 'trophy', 790, 790, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1040, 'HAS A SLIDESHOW', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 36, bg: ORANGE, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 790, P.t0 + 1.0, 7, 180, 0.4)
    } },
  { sign: 'virgo', cap: '“What would you do | with a *free day?*”', mood: lt => lt > 1.0 ? 'wide' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      calendar(x, 790, 800, pop01(t, P.t0 + 0.2, 0.3, 2), 'FREE DAY', lt > 0.9 ? '?!' : '—', { topBg: RED })
      bubble(x, 790, 1060, 'a… what?', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 42, tail: 'bl' })
    } },
  { sign: 'libra', cap: '“What do *you* | want?”', mood: lt => lt > 1.4 ? 'heart' : 'wide', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'what do… | I want?', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 42, tail: 'bl', col: LAV })
      label(x, 790, 960, 'TAKE YOUR TIME', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 38, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: '“What are you | *loving* lately?”', mood: lt => lt > 1.2 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'fine. dogs.', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 44, tail: 'bl' })
      drawBits(x, DOG[0], DOG[1], 800, 900, 18 * pop01(t, P.t0 + 1.0, 0.3, 2))
      hearts(x, t, 470, 760, P.t0 + 1.3, { n: 4, life: 1.5, spread: 120, cell: 6, seed: 7 })
    } },
  { sign: 'sagittarius', cap: '“Where to | *next?*”', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.8, 1.3, 1.8],
    front(x, t, lt, P) {
      bits(x, 'suitcase', 790, 840, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 640, 'EVERYWHERE.', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 44, tail: 'bl' })
      label(x, 790, 1060, 'ALREADY PACKED', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 36, bg: ORANGE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: '“When did you | last *rest?*”', mood: lt => lt > 1.0 ? 'sleepy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'pillow', 790, 860, 22 * pop01(t, P.t0 + 0.8, 0.3, 2))
      label(x, 790, 680, `THINKING${'.'.repeat(1 + Math.floor(lt * 2) % 3)}`, pop01(t, P.t0 + 0.3, 0.3, 2.2), { size: 40, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1040, 'NAP: APPROVED', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 38, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: '“What’s your | *weirdest* idea?”', mood: 'sparkle', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      drawBits(x, BULB[0], BULB[1], 790, 760, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1010, 'FINALLY, ASKED!', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 38, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 760, P.t0 + 1.0, 7, 160, 0.2)
    } },
  { sign: 'pisces', cap: '“Favourite | *daydream?*”', mood: lt => lt > 1.0 ? 'heart' : 'sparkle', tears: lt => lt > 1.0 ? 2 : 1, look: [1, -1], star: ST, keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, CLOUD[0], CLOUD[1], 800, 780 + Math.sin(t * 2) * 8, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      hearts(x, t, 800, 760, P.t0 + 0.6, { n: 5, life: 1.8, spread: 160, cell: 6, seed: 9 })
      label(x, 800, 1020, 'HAPPY TEARS', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 40, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0274', key: 'E', accent: GOLD, ending: 'callback',
  title: 'One question | *to ask each sign.*',
  cameos: CAMEOS,
  group: { cap: 'Ask, then | *really listen.*' },
  last: {
    text: 'Aries? | *Still answering.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.5, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'aries', 540, 1120, 260, { mood: 'sparkle', seed: 71, pop: k, hops: [t - lt + 0.9, t - lt + 1.5, t - lt + 2.1], glyph: false })
      bubble(x, 740, 900, '…and ANOTHER | thing', pop01(t, t - lt + 1.0, 0.25, 2.2), { size: 38, tail: 'bl' })
      label(x, 330, 800, 'HOUR TWO', pop01(t, t - lt + 1.5, 0.3, 2.4), { size: 38, bg: GOLD, rot: -0.06, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
