// r2t0689: star_talk, ROLLCALL, "The signs training | *the new hire.*" (signs3kit social cut, music: lofi · D).
// Twelve signs in zodiac order, each the most extreme trainer:
//   ♈ training took four minutes · ♉ step one: the snack drawer · ♊ covered everything except the job
//   · ♋ day one, already their emergency contact · ♌ the training video stars Leo · ♍ the manual, volume one of nine
//   · ♎ asked the new hire where to get lunch · ♏ explained nothing, stared meaningfully · ♐ day-one training was a road trip
//   · ♑ a five-year plan on day one · ♒ seating chart by sign compatibility · ♓ cried at their first "good morning".
// Ending: callback. group "Training complete. | *Good luck.*", then "Volume nine | *just arrived.*" (Virgo's manual returns)
import { makeFilm, sparkles, hearts, bubble, signChar, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, bits, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#7dffb0', ST = { x: -170 }
const DRAWER = ['KKKKKKKKKKKK', 'KWWWWWWWWWWK', 'KWWWWKKWWWWK', 'KWWWWWWWWWWK', 'KKKKKKKKKKKK']
/** a stack of n manuals, bottom at (cx, by) */
function manuals(x, cx, by, n, cell, k) {
  if (k <= 0.01) return
  const cols = [LAV, MINT, PINK, SKYB, GOLD]
  for (let i = 0; i < n; i++) drawBits(x, bitsBook, { K: INK, B: cols[i % cols.length], W: CREAM }, cx + ((i * 37) % 5 - 2) * 4, by - i * cell * 4.2 * k, cell * k)
}
const bitsBook = ['KKKKKKKKKKKKKK', 'KBBBBBBBBBBBWK', 'KBBBBBBBBBBBWK', 'KKKKKKKKKKKKKK']

const CAMEOS = [
  { sign: 'aries', cap: 'Training took four minutes. | *“You’ll figure it out.”*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', look: [1, 0], star: ST, hops: [0.5, 1.0],
    front(x, t, lt, P) {
      bits(x, 'CLOCK', 800, 830, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 1050, 'TRAINING: 4 MIN', pop01(t, P.t0 + 0.9, 0.3, 2.4), RED, -0.04, 36)
    } },
  { sign: 'taurus', cap: 'Step one: | *the snack drawer.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, DRAWER, { K: '#8a4a2e', W: '#c98f5a' }, 800, 930, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      for (let i = 0; i < 3; i++) bits(x, 'COOKIE', 720 + i * 80, 820 - (i % 2) * 20, 10 * pop01(t, P.t0 + 0.6 + i * 0.12, 0.3, 2))
      L(x, 800, 680, 'MOST IMPORTANT', pop01(t, P.t0 + 1.3, 0.3, 2.4), GOLD, 0.04, 32)
    } },
  { sign: 'gemini', cap: 'Covered everything. | *Except the job.*', mood: lt => Math.floor(lt * 2.6) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const TOP = ['the coffee lore', 'office gossip', 'my cousin', 'our signs!', 'a podcast']
      const i = Math.min(TOP.length - 1, Math.floor(Math.max(0, lt - 0.3) / 0.36))
      bubble(x, 800, 760, TOP[i], pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, tail: 'bl' })
      L(x, 800, 1020, 'THE JOB: NOT COVERED', pop01(t, P.t0 + 1.6, 0.3, 2.4), PINK, -0.04, 30)
    } },
  { sign: 'cancer', cap: 'Day one. | Their *emergency contact.*', mood: 'heart', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      sheet(x, 800, 850, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 340, h: 260, head: 'EMERGENCY', headBg: SKYB, headInk: INK, lines: ['name: cancer ♡', 'relation: “mum”'], size: 30, align: 'left' })
      hearts(x, t, 620, 760, P.t0 + 1.2, { n: 4, life: 1.6, spread: 120, cell: 7, seed: 2 })
      L(x, 800, 1080, 'KNOWN THEM: 3 HRS', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, -0.04, 30)
    } },
  { sign: 'leo', cap: 'The training video? | *Starring Leo.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.9, 1.5],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      bits(x, 'TV', 800, 860, 24 * k)
      if (k > 0.6) signChar(x, t, 'leo', 800, 845, 120, { mood: 'wink', seed: 40, glyph: false, glow: 0.4 })
      L(x, 800, 1090, 'NOW SHOWING: ME', pop01(t, P.t0 + 1.2, 0.3, 2.4), GOLD, -0.04, 34)
    } },
  { sign: 'virgo', cap: 'Handed over the manual. | *Volume one of nine.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      manuals(x, 800, 1020, 1 + Math.floor(clamp((lt - 0.3) / 1.2) * 4), 18, pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 660, 'VOL. 1 OF 9', pop01(t, P.t0 + 0.6, 0.3, 2), MINT, 0.04, 40)
      L(x, 800, 1110, 'QUIZ ON FRIDAY', pop01(t, P.t0 + 1.6, 0.3, 2.4), RED, -0.04, 30)
    } },
  { sign: 'libra', cap: 'Asked the new hire | *where to get lunch.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'you pick! no, wait…', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 38, tail: 'bl' })
      L(x, 800, 920, 'DAY 1: STILL DECIDING', pop01(t, P.t0 + 1.2, 0.3, 2.4), PINK, -0.04, 30)
    } },
  { sign: 'scorpio', cap: 'Explained nothing. | *Stared meaningfully.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 720, '…', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 70, tail: 'bl' })
      L(x, 800, 930, 'LESSON 1: OBSERVE', pop01(t, P.t0 + 1.2, 0.3, 2.4), RED, -0.04, 32)
      L(x, 800, 1060, 'NEW HIRE: LEARNED IT', pop01(t, P.t0 + 1.7, 0.3, 2.4), MINT, 0.04, 28)
    } },
  { sign: 'sagittarius', cap: 'Day-one training | was *a road trip.*', mood: lt => lt > 1.1 ? 'sparkle' : 'happy', look: [-1, 0], star: { x: 170 }, hops: [1.1],
    front(x, t, lt, P) {
      bits(x, 'MAP', 330, 830, 26 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.05 })
      L(x, 330, 1050, 'OFFICE: 300 MI BACK', pop01(t, P.t0 + 1.3, 0.3, 2.4), GOLD, -0.04, 30)
    } },
  { sign: 'capricorn', cap: 'A five-year plan. | *On day one.*', mood: 'neutral', look: [-1, 0], star: { x: 170 },
    front(x, t, lt, P) {
      sheet(x, 330, 860, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 330, h: 330, head: 'YOUR 5-YR PLAN', headBg: STEEL, headInk: INK, lines: ['yr 1: learn', 'yr 3: lead', ['yr 5: my job', '#c2185b']], size: 32, align: 'left', progress: clamp((lt - 0.4) / 1.1) })
      L(x, 330, 1110, 'LUNCH: 11:58–12:04', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, -0.04, 28)
    } },
  { sign: 'aquarius', cap: 'Made the seating chart | *by sign compatibility.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      sheet(x, 800, 860, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 320, h: 320, head: 'SEATING', headBg: SKYB, headInk: INK, lines: ['♈ + ♌ ✓', '♉ + ♍ ✓', '♊ + ♒ ✓', '♓ + tissues'], size: 34, progress: clamp((lt - 0.4) / 1.1) })
      L(x, 800, 1110, 'HR: CONFUSED', pop01(t, P.t0 + 1.6, 0.3, 2.4), LAV, -0.04, 30)
    } },
  { sign: 'pisces', cap: 'Cried at their | *first “good morning.”*', mood: 'wide', tears: lt => lt < 1.0 ? 2 : 3, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 800, 720, 'good morning!', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 44, tail: 'br' })
      bits(x, 'TISSUE', 800, 930, 14 * pop01(t, P.t0 + 0.8, 0.3, 2))
      L(x, 800, 1090, 'SO PROUD', pop01(t, P.t0 + 1.5, 0.3, 2.4), SKYB, -0.04, 34)
    } },
]

const F = makeFilm({
  id: 'r2t0689', key: 'D', accent: ACC, ending: 'callback',
  title: 'The signs training | *the new hire.*',
  cameos: CAMEOS,
  group: { cap: 'Training complete. | *Good luck.*' },
  last: {
    text: 'Volume nine | *just arrived.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const k = pop01(t, t0 + 0.2, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'virgo', 400, 1150, 280 * k, { mood: lt > 1.5 ? 'happy' : 'squint', look: [1, 0], seed: 7, hops: [t0 + 1.6] })
      manuals(x, 720, 1290, 1 + Math.floor(clamp((lt - 0.4) / 1.4) * 8), 16, pop01(t, t0 + 0.4, 0.35, 2))
      L(x, 560, 1400, 'READ BY MONDAY', pop01(t, t0 + 1.8, 0.3, 2.4), RED, -0.04, 38)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
