// r2a0597: star_advice, ADVICE SOLO (taurus), "How to encourage | *a Taurus.*" (signs3kit social cut, music: lofi · F).
// Nine cards, a relatable Taurus truth + a warm way to cheer them on: praise the small steps · snacks, then the pep talk
// · don't rush, they finish strong · show how far they've come · notice the effort · a cozy space · "stubborn" is
// "determined" · celebrate with their favourite meal · say "I believe in you".
// Ending: lesson ("Steady wins. | Cheer them *on.*") then "Snacks first. | *Then* greatness."
import { makeFilm, sparkles, hearts, bubble, signChar, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, steam, swapLabel, friend, bits, confetti, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#9be37a', ST = { x: -180 }, SG = 'taurus'
const GRN = '#4fbf6a', TERRA = '#d9774a'
const SPROUT = ['..G...G..', '.GGG.GGG.', '..GGGGG..', '....G....', '....G....', 'OOOOOOOOO', '.OOOOOOO.', '..OOOOO..']
const CAN = ['......BB', 'BBBBBBB.', 'BBBBBBB.', 'BWBBBBB.', 'BBBBBBB.', '.BBBBB..']

const CAMEOS = [
  { sign: SG, cap: 'Praise the small steps. | They *count.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(800, 860); x.scale(k, k)
        for (let i = 0; i < 4; i++) { const on = lt > 0.5 + i * 0.25; x.fillStyle = INK; x.fillRect(-150 + i * 76, 60 - i * 50, 72, 40 + i * 50); x.fillStyle = on ? ACC : '#2a2350'; x.fillRect(-144 + i * 76, 66 - i * 50, 60, 28 + i * 50) }
        x.restore()
      }
      L(x, 800, 1090, 'STEP 4 OF 1000 ✓', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, -0.04, 34)
    } },
  { sign: SG, cap: 'Bring snacks. | *Then* the pep talk.', mood: lt => lt > 1.0 ? 'heart' : 'wide', look: [1, 0], star: ST, hops: [0.9],
    front(x, t, lt, P) {
      bits(x, 'PIZZA', 820, 880, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 3.14 })
      bubble(x, 800, 1080, 'ok… I’m listening.', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 36, col: MINT, tail: 'bl' })
    } },
  { sign: SG, cap: 'Don’t rush them. | They *finish* strong.', mood: lt => lt > 1.4 ? 'sparkle' : 'sleepy', look: [1, 0], star: ST, hops: [1.6],
    front(x, t, lt, P, F) {
      bits(x, 'CLOCK', 800, 800, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      swapLabel(x, 800, 1050, lt, 1.3, 'STILL GOING…', 'DONE. PERFECTLY.', { size: 36, fromBg: STEEL, toBg: ACC })
      confetti(x, t, F.x, F.cy - 40, P.t0 + 1.5, { spread: 220 })
    } },
  { sign: SG, cap: 'Show them how far | they’ve *come.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      bits(x, 'MAP', 800, 860, 26 * k)
      if (k > 0.9) {
        const p = clamp((lt - 0.4) / 1.0)
        x.save(); x.strokeStyle = RED; x.lineWidth = 8; x.setLineDash([16, 12]); x.beginPath(); x.moveTo(680, 960)
        x.lineTo(lerp(680, 920, p), lerp(960, 770, p)); x.stroke(); x.restore()
      }
      L(x, 800, 1090, 'YOU WERE HERE → NOW HERE', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, 0.04, 26)
    } },
  { sign: SG, cap: 'Notice the effort. | Not just the *result.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      const g = ease.outCubic(prog(lt, 0.6, 1.4))
      drawBits(x, SPROUT, { G: GRN, O: TERRA }, 860, 940 - g * 20, (12 + g * 8) * pop01(t, P.t0 + 0.2, 0.3, 2))
      drawBits(x, CAN, { B: SKYB, W: '#fff' }, 680, 760, 14 * pop01(t, P.t0 + 0.4, 0.3, 2), { rot: lt > 0.5 ? 0.4 : 0 })
      L(x, 800, 1100, 'GROWING. SLOWLY. ♡', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, -0.04, 32)
    } },
  { sign: SG, cap: 'Cozy space. | *Clear* mind.', mood: 'sleepy', look: [1, 0], star: ST,
    front(x, t, lt, P, F) {
      bits(x, 'BLANKET', F.x, F.cy + 100, 17 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'CANDLE', 830, 880, 16 * pop01(t, P.t0 + 0.4, 0.3, 2))
      L(x, 810, 1090, 'FOCUS MODE: COMFY', pop01(t, P.t0 + 1.2, 0.3, 2.4), LAV, 0.04, 32)
    } },
  { sign: SG, cap: 'Not stubborn. | *Determined.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, 0], star: ST, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      sheet(x, 800, 830, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 330, h: 250, head: 'TAURUS ♉︎ PROFILE', headBg: ACC, headInk: INK, size: 30, lines: ['earth sign', 'loyal · steady'] })
      swapLabel(x, 800, 1060, lt, 0.9, 'STUBBORN', 'DETERMINED ✦', { size: 38, fromBg: STEEL, toBg: GOLD })
    } },
  { sign: SG, cap: 'Celebrate with | their *favourite* meal.', mood: 'heart', look: [1, 0], star: ST, hops: [1.1],
    front(x, t, lt, P) {
      bits(x, 'PLATE', 820, 900, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      if (lt > 0.6) steam(x, t, 820, 850)
      hearts(x, t, 560, 760, P.t0 + 1.0, { n: 5, life: 1.5, spread: 140, cell: 7, seed: 5 })
      L(x, 810, 1090, 'TABLE FOR TWO ♡', pop01(t, P.t0 + 1.2, 0.3, 2.4), PINK, -0.04, 34)
    } },
  { sign: SG, cap: 'Say “I believe in you.” | They *keep* it.', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      friend(x, t, 'virgo', 860, 920, 190, pop01(t, P.t0 + 0.2, 0.3, 2), { mood: 'happy', look: [-1, 0], seed: 39 })
      bubble(x, 800, 680, 'I believe in you.', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 36, col: PINK, tail: 'br' })
      L(x, 800, 1110, 'SAVED FOREVER', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, 0.04, 34)
      hearts(x, t, 560, 800, P.t0 + 1.3, { n: 5, life: 1.5, spread: 140, cell: 7, seed: 9 })
    } },
]

const F = makeFilm({
  id: 'r2a0597', key: 'F', accent: ACC, solo: SG, ending: 'lesson',
  title: 'How to encourage | *a Taurus.*',
  cameos: CAMEOS,
  group: { cap: 'Slow and steady. | *Unstoppable.*', mood: 'sparkle' },
  lesson: { text: 'Steady wins. | Cheer them *on.*', chip: 'STATUS: ENCOURAGED' },
  last: { text: 'Snacks first. | *Then* greatness.' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
