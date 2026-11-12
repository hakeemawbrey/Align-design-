// r2a0591: star_advice, ADVICE SOLO (pisces), "How to apologise | *to a Pisces.*" (signs3kit social cut, music: lofi · D).
// Nine cards, a relatable Pisces truth + a warm reframe (Pisces cries in every one, kindly): say sorry first, then just
// listen · skip the excuses, bring a blanket · say it gently, they hear every tone · write it down, they'll keep the note
// · let them cry, it's how they heal · don't rush the hug · bring the snack they mentioned once · check in later, a
// text means a lot · forgive yourself too, they already did.
// Ending: lesson ("Soft hearts heal fast | with *a kind word.*") then "Still crying. | *Happy tears* now."
import { makeFilm, sparkles, hearts, bubble, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, bits, friend, swapLabel, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#8fe3ff', ST = { x: -180 }, SG = 'pisces'
const sob = lt => lt < 1.2 ? 2 : 1          // tears: still crying, then a sniffle once it's handled kindly

const CAMEOS = [
  { sign: SG, cap: 'Say sorry first. | Then *just listen.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', look: [1, 0], tears: sob, star: ST, hops: [1.4],
    front(x, t, lt, P) {
      friend(x, t, 'aries', 800, 960, 200, pop01(t, P.t0 + 0.2, 0.3, 2), { mood: 'neutral', look: [-1, 0], seed: 21 })
      bubble(x, 800, 700, 'I’m sorry.', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 42, tail: 'bc' })
      L(x, 800, 1140, 'EARS: ON ♡', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, -0.04, 36)
    } },
  { sign: SG, cap: 'Skip the excuses. | Bring *a blanket.*', mood: lt => lt > 1.2 ? 'sleepy' : 'wide', tears: sob, star: ST, hops: [1.3],
    front(x, t, lt, P, F) {
      swapLabel(x, 800, 720, lt, 0.9, 'EXCUSES', 'BLANKET ♡', { size: 38, fromBg: STEEL, toBg: LAV })
      const k = pop01(t, P.t0 + 1.2, 0.35, 2)
      bits(x, 'BLANKET', F.x, F.cy + 170, 17 * k)
      L(x, 800, 960, 'COZY SORRY', pop01(t, P.t0 + 1.6, 0.3, 2.4), PINK, 0.04, 38)
    } },
  { sign: SG, cap: 'Say it gently. | They hear *every tone.*', mood: lt => lt > 1.3 ? 'happy' : 'wide', look: [1, 0], tears: sob, star: ST,
    front(x, t, lt, P) {
      // a little pixel sound meter: spiky, then calm
      const calm = clamp((lt - 0.9) / 0.4)
      x.save(); x.translate(800, 830)
      for (let i = 0; i < 9; i++) {
        const h = lerp(40 + 130 * Math.abs(Math.sin(i * 1.7 + t * 6)), 30 + 20 * Math.sin(i * 0.9 + t * 2), calm)
        x.fillStyle = INK; x.fillRect(-170 + i * 38 - 4, -h / 2 - 4, 30, h + 8)
        x.fillStyle = calm > 0.5 ? MINT : RED; x.fillRect(-170 + i * 38, -h / 2, 22, h)
      }
      x.restore()
      L(x, 800, 1040, calm > 0.5 ? 'TONE: SOFT ✓' : 'TONE: SHARP', 1, calm > 0.5 ? MINT : RED, -0.04, 36)
    } },
  { sign: SG, cap: 'Write it down. | They’ll *keep the note.*', mood: lt => lt > 1.3 ? 'heart' : 'sparkle', look: [1, 0], tears: lt => lt > 1.3 ? 3 : 2, star: ST, hops: [1.4],
    front(x, t, lt, P) {
      sheet(x, 800, 830, pop01(t, P.t0 + 0.25, 0.35, 2), { w: 320, h: 280, head: 'A NOTE', headBg: PINK, headInk: INK, lines: ['I’m sorry.', 'You matter', 'to me. ♡'], size: 36, progress: clamp((lt - 0.4) / 0.8) })
      L(x, 800, 1060, 'FILED UNDER: FOREVER', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, 0.04, 28)
    } },
  { sign: SG, cap: 'Let them cry. | It’s *how they heal.*', mood: lt => lt > 1.5 ? 'happy' : 'wide', tears: lt => lt > 1.5 ? 1 : 3, star: ST,
    front(x, t, lt, P) {
      bits(x, 'TISSUE', 800, 860, 20 * pop01(t, P.t0 + 0.25, 0.3, 2))
      L(x, 800, 680, 'TISSUES: READY', pop01(t, P.t0 + 0.6, 0.3, 2.2), SKYB, 0.04, 34)
      L(x, 800, 1040, 'FEELINGS: FELT ✓', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, -0.04, 32)
    } },
  { sign: SG, cap: 'Don’t rush the hug. | Let it *last.*', mood: 'heart', look: [1, 0], tears: 1, star: { x: -120 }, hops: [1.5],
    front(x, t, lt, P) {
      friend(x, t, 'aries', 720, 900, 230, pop01(t, P.t0 + 0.2, 0.3, 2), { mood: 'heart', look: [-1, 0], seed: 22 })
      const m = Math.floor(clamp((lt - 0.5) / 1.4) * 5)
      L(x, 790, 650, `HUG: ${m} MIN`, pop01(t, P.t0 + 0.5, 0.3, 2.2), PINK, 0.04, 40)
      hearts(x, t, 560, 800, P.t0 + 0.9, { n: 7, life: 2.0, spread: 220, cell: 7, seed: 3 })
    } },
  { sign: SG, cap: 'Bring the snack | they *mentioned once.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', look: [1, 0], tears: lt => lt > 1.2 ? 3 : 1, star: ST, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'COOKIE', 800, 870, 26 * pop01(t, P.t0 + 0.3, 0.3, 2))
      bubble(x, 800, 660, 'you REMEMBERED?', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 34, col: PINK, tail: 'bl' })
      L(x, 800, 1070, 'SAID IT IN MAY', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, -0.04, 32)
    } },
  { sign: SG, cap: 'Check in later. | A text *means a lot.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], tears: lt => lt > 1.3 ? 2 : 1, star: ST, hops: [1.4],
    front(x, t, lt, P) {
      phone(x, t, 800, 860, pop01(t, P.t0 + 0.2, 0.35, 2), { head: 'MATCH ♡', headCol: SKYB, lines: [
        ['still ok? ♡', BONE, pop01(t, P.t0 + 0.6, 0.25, 2)],
        ['…yes ♡', PINK, pop01(t, P.t0 + 1.3, 0.25, 2), true],
      ], typing: lt > 0.8 && lt < 1.3 ? 1 : 0, size: 26 })
    } },
  { sign: SG, cap: 'Forgive yourself too. | They *already did.*', mood: 'sparkle', tears: 1, star: ST, hops: [1.2],
    front(x, t, lt, P) {
      L(x, 800, 720, 'FORGIVEN:', pop01(t, P.t0 + 0.25, 0.3, 2), LAV, -0.04, 36)
      L(x, 800, 860, '2 SECONDS AGO', pop01(t, P.t0 + 0.8, 0.3, 2.3), GOLD, 0.04, 40)
      L(x, 800, 1020, 'ALL GOOD ♡', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, -0.04, 40)
      sparkles(x, t, 800, 860, P.t0 + 1.4, 8, 200, 0.4)
    } },
]

const F = makeFilm({
  id: 'r2a0591', key: 'D', accent: ACC, solo: SG, ending: 'lesson',
  title: 'How to apologise | *to a Pisces.*',
  cameos: CAMEOS,
  group: { cap: 'Soft heart. | *Big hug.*', mood: 'heart' },
  lesson: { text: 'Soft hearts heal fast | with *a kind word.*', chip: 'HEART: MENDED' },
  last: { text: 'Still crying. | *Happy tears* now.' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
