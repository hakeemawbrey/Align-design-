// r2a0600: star_advice, ADVICE SOLO (virgo), "Virgo, your care | *is in the details.*" (signs3kit social cut, music: lofi · G).
// Nine cards, a relatable Virgo detail + a warm reframe: you remember everyone's allergies · spare chargers, hero
// · you notice the haircut · lists are caring · rest counts too · not every crumb needs fixing · 97% is great
// · you proofread your friend's match profile · your care shows.
// Ending: group ("Small details. | *Big* love.").
import { makeFilm, sparkles, hearts, bubble, signChar, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, zzz, swapLabel, friend, bits, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ff9ec4', ST = { x: -180 }, SG = 'virgo'
const CHARGER = ['..KK..', '..KK..', 'SSSSSS', 'SSSSSS', 'SWSSWS', 'SSSSSS', '..KK..', '..KK..', '..KK..', '...KK.', '....KK']

const CAMEOS = [
  { sign: SG, cap: 'You remember allergies. | That’s *love.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      sheet(x, 800, 830, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 340, h: 300, head: 'DINNER PLAN', headBg: MINT, headInk: INK, align: 'left', size: 30, lines: ['leo: no nuts ✓', 'libra: no dairy ✓', 'you: extra bread ✓'], progress: clamp((lt - 0.3) / 1.0) })
      L(x, 800, 1090, 'EVERYONE FED ♡', pop01(t, P.t0 + 1.5, 0.3, 2.4), PINK, -0.04, 34)
    } },
  { sign: SG, cap: 'Spare chargers, packed. | *Hero* behaviour.', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      drawBits(x, CHARGER, { K: BONE, S: STEEL, W: '#fff' }, 760, 880, 16 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.15 })
      drawBits(x, CHARGER, { K: BONE, S: STEEL, W: '#fff' }, 900, 900, 16 * pop01(t, P.t0 + 0.4, 0.3, 2), { rot: 0.15 })
      L(x, 800, 1090, 'SAVED THE TRIP', pop01(t, P.t0 + 1.2, 0.3, 2.4), GOLD, 0.04, 36)
    } },
  { sign: SG, cap: 'You noticed the haircut. | *Day one.*', mood: 'heart', look: [1, 0], star: ST, hops: [1.1],
    front(x, t, lt, P) {
      friend(x, t, 'leo', 850, 920, 200, pop01(t, P.t0 + 0.2, 0.3, 2), { mood: lt > 1.1 ? 'heart' : 'wide', look: [-1, 0], seed: 56 })
      bubble(x, 800, 680, 'new cut? love it.', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 36, col: PINK, tail: 'br' })
      L(x, 830, 1110, 'FELT SEEN ♡', pop01(t, P.t0 + 1.3, 0.3, 2.4), MINT, -0.04, 34)
    } },
  { sign: SG, cap: 'Your lists aren’t nagging. | They’re *caring.*', mood: 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      sheet(x, 800, 830, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 320, h: 300, head: 'FOR YOU ♡', headBg: ACC, headInk: INK, align: 'left', size: 30, lines: ['[ ] drink water', '[ ] eat lunch', '[ ] text mom'], progress: clamp((lt - 0.3) / 1.0) })
      L(x, 800, 1090, 'LOVE, IN LIST FORM', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, -0.04, 32)
    } },
  { sign: SG, cap: 'Rest counts too. | *Not* just tasks.', mood: lt => lt > 1.1 ? 'sleepy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P, F) {
      swapLabel(x, 800, 780, lt, 1.0, 'TO DO: 40', 'TO DO: NAP', { size: 44, fromBg: STEEL, toBg: LAV })
      if (lt > 1.1) { bits(x, 'PILLOW', F.x, F.cy + 120, 15 * pop01(lt, 1.1, 0.3, 2)); zzz(x, t, 470, 700) }
      L(x, 800, 1060, 'ALSO PRODUCTIVE', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, 0.04, 32)
    } },
  { sign: SG, cap: 'Not every crumb | needs *fixing.*', mood: lt => lt > 1.2 ? 'happy' : 'wide', look: [1, 1], star: ST, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'COOKIE', 800, 900, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      for (let i = 0; i < 3; i++) { x.fillStyle = '#d99a52'; x.fillRect(880 + i * 26, 990 + (i % 2) * 14, 12, 12) }
      bits(x, 'BROOM', 940, 820, 14 * pop01(t, P.t0 + 0.4, 0.3, 2) * (lt > 1.2 ? 0 : 1), { rot: 0.3 })
      L(x, 800, 1090, 'LET IT BE ♡', pop01(t, P.t0 + 1.3, 0.3, 2.4), PINK, -0.04, 36)
    } },
  { sign: SG, cap: '97% is | *already great.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      swapLabel(x, 800, 820, lt, 1.0, 'SCORE: 97% (UGH)', 'SCORE: GREAT ✦', { size: 38, fromBg: STEEL, toBg: GOLD })
      sparkles(x, t, 800, 820, P.t0 + 1.4, 7, 180, 0.4)
      L(x, 800, 1040, 'PERFECT IS OPTIONAL', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, 0.04, 30)
    } },
  { sign: SG, cap: 'Proofread their profile. | *Kindly.*', mood: 'squint', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      const fixed = lt > 1.0
      phone(x, t, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'FRIEND’S PROFILE', headCol: PINK, size: 22, lines: [[fixed ? 'loves hiking ✓' : 'loves hikng', fixed ? MINT : BONE, 1], [fixed ? 'and cooking ✓' : 'and cookin', fixed ? MINT : BONE, 1]] })
      L(x, 800, 1120, 'NEW MATCHES: 3 ♡', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, -0.04, 32)
    } },
  { sign: SG, cap: 'Your care shows. | *We see it.*', mood: 'heart', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      friend(x, t, 'cancer', 760, 900, 160, pop01(t, P.t0 + 0.2, 0.3, 2), { mood: 'heart', look: [-1, 0], seed: 57 })
      friend(x, t, 'pisces', 910, 900, 160, pop01(t, P.t0 + 0.35, 0.3, 2), { mood: 'heart', look: [-1, 0], seed: 58, tears: 1 })
      hearts(x, t, 830, 780, P.t0 + 1.0, { n: 6, life: 1.6, spread: 220, cell: 7, seed: 8 })
      L(x, 830, 1090, 'THANK YOU, VIRGO', pop01(t, P.t0 + 1.2, 0.3, 2.4), PINK, 0.04, 32)
    } },
]

const F = makeFilm({
  id: 'r2a0600', key: 'G', accent: ACC, solo: SG, ending: 'group',
  title: 'Virgo, your care | *is in the details.*',
  cameos: CAMEOS,
  group: {
    cap: 'Small details. | *Big* love.', mood: 'heart',
    draw(x, t, lt) { hearts(x, t, 540, 760, t - lt + 0.8, { n: 10, life: 2.4, spread: 600, cell: 8, seed: 3 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
