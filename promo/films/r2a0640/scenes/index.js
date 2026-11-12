// r2a0640: star_advice, ADVICE SOLO (pisces), "Pisces, celebrate | *the small wins.*" (signs3kit social cut, music:
// lofi · G). Nine small, relatable wins for a Pisces, each with a warm reframe and one light gag; Pisces cries happy tears
// in every card. Ending: callback.
//   drank water, that counts · made the bed, throw a party · replied to one email, hero behaviour · watered the plant, it
//   noticed · out of bed (11:58), gold medal · said how you felt, so brave · sent the first message, look at you · cooked
//   an egg, chef's kiss · cried then felt better, also a win
//   group "Tiny wins. | *Huge heart.*"
//   last "The plant | *is thriving.*" (card 4, paid off: the plant is back, much bigger, with hearts)
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { L, sheet, phone, friend, bits, confetti, RED, CREAM, STEEL, NIGHT, WOOD, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ffd23a', S = 'pisces', ST = { x: -190 }
const GLASS = ['W......W', 'W......W', 'WBBBBBBW', 'WBBBBBBW', 'WBBBBBBW', '.WBBBBW.', '.WBBBBW.', '..WWWW..']
const EGG = ['..WWWWW..', '.WWWWWWW.', 'WWWYYYWWW', 'WWYYYYYWW', 'WWWYYYWWW', '.WWWWWWW.', '..WWWWW..']
const TEARS = lt => lt > 1.2 ? 2 : 3
const HAPPY = at => lt => lt > at ? 'heart' : 'happy'

const CAMEOS = [
  { sign: S, cap: 'Drank water today? | *That counts.*', mood: HAPPY(1.2), tears: TEARS, star: ST,
    front(x, t, lt, P) {
      drawBits(x, GLASS, { W: '#e8f6ff', B: SKYB }, 800, 860, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 1100, 'HYDRATED ✓', pop01(t, P.t0 + 1.1, 0.3, 2.2), MINT, 0.04, 38)
      confetti(x, t, 800, 760, P.t0 + 1.2, { n: 16, spread: 220 })
    } },
  { sign: S, cap: 'Made the bed? | *Throw a party.*', mood: HAPPY(1.2), tears: TEARS, star: ST, hops: [1.3, 1.8],
    front(x, t, lt, P) {
      bits(x, 'PILLOW', 800, 860, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'BLANKET', 800, 990, 18 * pop01(t, P.t0 + 0.4, 0.3, 2))
      L(x, 800, 660, 'BED: MADE!', pop01(t, P.t0 + 1.1, 0.3, 2.2), GOLD, -0.05, 42)
      confetti(x, t, 800, 760, P.t0 + 1.2, { n: 26, spread: 320 })
    } },
  { sign: S, cap: 'Replied to one email? | *Hero behaviour.*', mood: HAPPY(1.3), tears: TEARS, star: ST,
    front(x, t, lt, P) {
      bits(x, 'LAPTOP', 800, 960, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 700, lt < 1.3 ? 'INBOX: 211' : 'INBOX: 210', pop01(t, P.t0 + 0.4, 0.3, 2), lt < 1.3 ? RED : MINT, -0.04, 42)
      if (lt > 1.3) bits(x, 'TROPHY', 920, 600, 11 * pop01(t, P.t0 + 1.35, 0.3, 2.4))
    } },
  { sign: S, cap: 'Watered the plant? | *It noticed.*', mood: HAPPY(1.4), tears: TEARS, star: ST,
    keyCue: t0 => ['pluck', t0 + 1.4, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const g = 0.75 + 0.35 * clamp((lt - 0.6) / 0.8)
      bits(x, 'FLOWER', 800, 930, 18 * g * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.05 * Math.sin(t * 2) })
      x.save(); x.fillStyle = SKYB; for (let i = 0; i < 4; i++) { const ph = ((t * 1.5 + i / 4) % 1); if (lt < 1.2) { x.globalAlpha = 1 - ph; x.fillRect(760 + i * 22, 700 + ph * 90, 10, 16) } } x.restore()
      bubble(x, 800, 650, 'thank u :)', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 44, tail: 'bc' })
    } },
  { sign: S, cap: 'Got out of bed? | *Gold medal.*', mood: HAPPY(1.2), tears: TEARS, star: ST,
    front(x, t, lt, P) {
      L(x, 800, 660, 'TIME: 11:58 AM', pop01(t, P.t0 + 0.2, 0.3, 2), STEEL, -0.04, 36)
      bits(x, 'TROPHY', 800, 920, 18 * pop01(t, P.t0 + 0.9, 0.3, 2))
      sparkles(x, t, 800, 900, P.t0 + 1.0, 8, 190, 0.3)
    } },
  { sign: S, cap: 'Said how you felt? | *So brave.*', mood: lt => lt > 1.4 ? 'sparkle' : 'wide', tears: TEARS, star: ST,
    front(x, t, lt, P) {
      bubble(x, 800, 720, 'that hurt | my feelings', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 44, tail: 'bl' })
      L(x, 800, 960, 'COURAGE +1', pop01(t, P.t0 + 1.3, 0.3, 2.2), GOLD, 0.05, 44)
      hearts(x, t, 360, 760, P.t0 + 1.4, { n: 5, life: 1.6, spread: 200, cell: 7, seed: 6 })
    } },
  { sign: S, cap: 'Sent the first message? | *Look at you.*', mood: lt => lt > 1.5 ? 'heart' : 'wide', tears: TEARS, star: ST,
    keyCue: t0 => ['pluck', t0 + 1.5, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, t, 790, 840, 1.2 * pop01(t, P.t0 + 0.2, 0.3, 2), { head: '✦ MATCH: CANCER', headCol: SKYB, size: 32,
        lines: [['hi :)', LAV, pop01(t, P.t0 + 0.5, 0.25, 2), true], ['HI!! :)', MINT, pop01(t, P.t0 + 1.5, 0.25, 2), false]] })
      confetti(x, t, 790, 700, P.t0 + 1.55, { n: 18, spread: 240 })
    } },
  { sign: S, cap: 'Cooked an egg? | *Chef’s kiss.*', mood: HAPPY(1.2), tears: TEARS, star: ST,
    front(x, t, lt, P) {
      drawBits(x, EGG, { W: '#ffffff', Y: '#ffd23a' }, 800, 880, 24 * pop01(t, P.t0 + 0.3, 0.3, 2))
      L(x, 800, 660, 'MENU: 1 EGG', pop01(t, P.t0 + 0.8, 0.3, 2), BONE, -0.04, 36)
      L(x, 800, 1100, 'REVIEW: ★★★★★', pop01(t, P.t0 + 1.3, 0.3, 2.2), GOLD, 0.04, 34)
    } },
  { sign: S, cap: 'Cried, then felt better? | *Also a win.*', mood: lt => lt > 1.3 ? 'happy' : 'wide', tears: lt => lt > 1.3 ? 1 : 3, star: ST,
    front(x, t, lt, P) {
      bits(x, 'TISSUE', 800, 900, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 1110, 'FEELINGS: FELT ✓', pop01(t, P.t0 + 1.3, 0.3, 2.2), MINT, 0.04, 34)
      sparkles(x, t, 800, 900, P.t0 + 1.35, 7, 180, 0.4)
    } },
]

const F = makeFilm({
  id: 'r2a0640', key: 'G', accent: ACC, solo: S, ending: 'callback',
  title: 'Pisces, celebrate | *the small wins.*',
  cameos: CAMEOS,
  group: { cap: 'Tiny wins. | *Huge heart.*', mood: 'heart' },
  last: {
    text: 'The plant | *is thriving.*',
    draw(x, t, lt) {
      const t0 = t - lt
      bits(x, 'FLOWER', 540, 1140, 30 * pop01(t, t0 + 0.5, 0.4, 2), { rot: 0.05 * Math.sin(t * 2) })
      hearts(x, t, 540, 1000, t0 + 1.0, { n: 8, life: 2.0, spread: 380, cell: 8, seed: 2 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
