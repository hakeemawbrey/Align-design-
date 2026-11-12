// r2a0502: star_advice, ADVICE SOLO (leo), "Leo, celebrate | the small wins." (signs3kit social cut, music: lofi · F).
// Nine cards, a relatable Leo truth + a warm nudge to cheer the little things: one email sent, victory lap · drank
// your water, gold star · made the bed · not every win needs an audience · cooked dinner, chef's kiss · said no kindly,
// growth · texted a match back, brave · rough day, still here · celebrate you the way you celebrate us.
// Ending: lesson ("Small wins add up. | So do you.") then "Go on, Leo. | Take a bow."
import { makeFilm, sparkles, hearts, bubble, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO } from '../../signs3kit.js'
import { L, sheet, phone, steam, confetti, friend, bits, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ffd23a', ST = { x: -180 }, SG = 'leo'

const CAMEOS = [
  { sign: SG, cap: 'Sent one email? | *Victory lap.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.6, 1.0, 1.4, 1.8],
    front(x, t, lt, P) {
      bits(x, 'LAPTOP', 800, 880, 16 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 690, 'EMAIL: SENT', pop01(t, P.t0 + 0.6, 0.3, 2.4), MINT, 0.04, 36)
      confetti(x, t, 560, 860, P.t0 + 0.9, { n: 20, spread: 260 })
      L(x, 800, 1080, 'LAP 1 OF 3', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, -0.04, 32)
    } },
  { sign: SG, cap: 'Drank your water. | *Gold star.* Seriously.', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) { // a pixel glass of water, draining
        const lv = 1 - clamp((lt - 0.4) / 0.8)
        x.save(); x.translate(800, 880); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-74, -124, 148, 248); x.fillStyle = '#d8eefa'; x.fillRect(-64, -114, 128, 228)
        x.fillStyle = SKYB; x.fillRect(-64, 114 - 228 * lv, 128, 228 * lv); x.restore()
      }
      L(x, 800, 690, '★ HYDRATED ★', pop01(t, P.t0 + 1.3, 0.3, 2.4), GOLD, 0.04, 36)
      sparkles(x, t, 800, 880, P.t0 + 1.3, 7, 170, 0.5)
    } },
  { sign: SG, cap: 'Made the bed. | That *counts.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      bits(x, 'BLANKET', 800, 960, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'PILLOW', 800, 860, 12 * pop01(t, P.t0 + 0.5, 0.3, 2))
      L(x, 800, 690, 'BED: MADE', pop01(t, P.t0 + 1.2, 0.3, 2.4), MINT, -0.04, 38)
      bubble(x, 800, 1110, 'iconic.', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: SG, cap: 'Not every win | needs *an audience.*', mood: 'heart', look: [1, 0], star: ST, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      L(x, 800, 820, 'AUDIENCE: YOU', pop01(t, P.t0 + 0.7, 0.3, 2.4), PINK, 0.04, 38)
      bubble(x, 800, 1040, 'and that’s plenty.', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 32, tail: 'bl' })
      hearts(x, t, 400, 840, P.t0 + 1.4, { n: 5, life: 1.6, spread: 140, cell: 7, seed: 2 })
    } },
  { sign: SG, cap: 'Cooked dinner. | *Chef’s kiss* to you.', mood: lt => lt > 1.2 ? 'wink' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      bits(x, 'PLATE', 800, 900, 20 * pop01(t, P.t0 + 0.2, 0.3, 2)); steam(x, t, 800, 820)
      bubble(x, 800, 680, 'mwah.', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 42, col: PINK, tail: 'bl' })
      L(x, 800, 1080, '5 STARS (FROM YOU)', pop01(t, P.t0 + 1.7, 0.3, 2.4), GOLD, -0.04, 28)
    } },
  { sign: SG, cap: 'Said “no” kindly. | *Growth.* Big growth.', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      bubble(x, 800, 720, 'no, thank you ♡', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 36, tail: 'bl' })
      const g = clamp((lt - 0.9) / 0.8)
      x.save(); x.fillStyle = INK; x.fillRect(680, 860, 240, 40); x.fillStyle = MINT; x.fillRect(686, 866, 228 * g, 28); x.restore()
      L(x, 800, 990, 'LEVEL UP', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, 0.04, 40)
      sparkles(x, t, 800, 880, P.t0 + 1.6, 6, 150, 0.6)
    } },
  { sign: SG, cap: 'Texted a match back. | *Brave.* Proud of you.', mood: lt => lt > 1.2 ? 'heart' : 'wide', look: [1, 0], star: ST, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'NEW MATCH ♌︎', headCol: PINK, lines: [['hi! love your', PINK, pop01(t, P.t0 + 0.4, 0.25, 2.2)], ['sun sign', PINK, pop01(t, P.t0 + 0.4, 0.25, 2.2)], ['hi back!! :)', BONE, pop01(t, P.t0 + 1.1, 0.25, 2.2), true]] })
      hearts(x, t, 790, 640, P.t0 + 1.3, { n: 4, life: 1.4, spread: 140, cell: 7, seed: 6 })
    } },
  { sign: SG, cap: 'Rough day. Still here. | That’s *a win.*', mood: lt => lt > 1.3 ? 'happy' : 'sleepy', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      bits(x, 'CLOUD', 380, 640, 14 * pop01(t, P.t0 + 0.2, 0.3, 2) * (1 - clamp((lt - 1.0) / 0.4)))
      bits(x, 'TROPHY', 800, 860, 20 * pop01(t, P.t0 + 1.0, 0.3, 2))
      L(x, 800, 1080, 'STILL SHINING', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, -0.04, 34)
    } },
  { sign: SG, cap: 'Cheer for *you* | like you cheer for us.', mood: lt => lt > 1.2 ? 'heart' : 'wide', star: ST, hops: [1.3, 1.7],
    front(x, t, lt, P) {
      friend(x, t, 'cancer', 700, 990, 200, pop01(t, P.t0 + 0.3, 0.3, 2), { mood: 'sparkle', look: [-1, 0], seed: 24, hops: [P.t0 + 0.9, P.t0 + 1.5] })
      friend(x, t, 'aries', 900, 990, 200, pop01(t, P.t0 + 0.5, 0.3, 2), { mood: 'sparkle', look: [-1, 0], seed: 25, hops: [P.t0 + 1.1, P.t0 + 1.7] })
      bubble(x, 800, 720, 'YAY, LEO!', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 42, tail: 'bl' })
      confetti(x, t, 800, 900, P.t0 + 1.2, { n: 18, spread: 240 })
    } },
]

const F = makeFilm({
  id: 'r2a0502', key: 'F', accent: ACC, solo: SG, ending: 'lesson',
  title: 'Leo, celebrate | *the small wins.*',
  cameos: CAMEOS,
  group: { cap: 'Tiny wins. | *Big glow.*', mood: 'sparkle' },
  lesson: { text: 'Small wins add up. | So do *you.*', chip: 'STATUS: CELEBRATED' },
  last: { text: 'Go on, Leo. | *Take a bow.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
