// r2a0577: star_advice, ADVICE SOLO (taurus), "How to check in | *on a Taurus.*" (signs3kit social cut, music: lofi · F).
// Nine warm, specific ways to check in on a Taurus, one visual gag each:
//   bring a snack (that's the hello) · "I'm fine" (ask over dinner) · don't rush them (the plant grows slowly)
//   · sit with them (quiet counts) · compliment the blanket (it matters) · plans changed (tell them early)
//   · skip reading their chart (just ask) · won't ask for help (show up with soup) · stubborn about feelings (give it a day).
// Ending: lesson ("Steady love | is their language." CHECKED IN), then "Bring snacks. | Stay a while."
import { makeFilm, sparkles, hearts, bubble, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO, INTER } from '../../signs3kit.js'
import { L, sheet, phone, steam, confetti, zzz, bits, friend, swapLabel, RED, CREAM, STEEL, WOOD, clamp, lerp, ease, prog } from './props.js'

const S = 'taurus', ACC = '#5fd068', ST = { x: -170 }
const WHEEL = ['#ff6b5a', '#5fd068', '#ffd23a', '#8fe3ff', '#ffb34a', '#7dffb0', '#ff8fb1', '#c97bff', '#ff9a4a', '#9aa5c4', '#6fc3ff', '#b7a6ff']
function chart(x, cx, cy, r, k, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(t * 0.25)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 8, 0, Math.PI * 2); x.fill()
  for (let i = 0; i < 12; i++) { x.fillStyle = WHEEL[i]; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, r, (i / 12) * Math.PI * 2, ((i + 1) / 12) * Math.PI * 2); x.closePath(); x.fill() }
  x.fillStyle = '#140c30'; x.beginPath(); x.arc(0, 0, r * 0.62, 0, Math.PI * 2); x.fill()
  x.restore()
}
// a potted plant that grows a stem + leaves with g (0…1)
function grow(x, cx, cy, k, g) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  const h = 40 + 220 * g
  x.fillStyle = INK; x.fillRect(-11, -h - 4, 22, h + 4); x.fillStyle = '#4fbf6a'; x.fillRect(-6, -h, 12, h)
  const leaves = Math.floor(g * 4)
  for (let i = 0; i < leaves; i++) { const y = -60 - i * 50, s = i % 2 ? 1 : -1; x.fillStyle = INK; x.fillRect(s > 0 ? 4 : -50, y - 4, 46, 26); x.fillStyle = '#7dffb0'; x.fillRect(s > 0 ? 8 : -46, y, 38, 18) }
  if (g > 0.95) { x.fillStyle = INK; x.fillRect(-22, -h - 34, 44, 40); x.fillStyle = PINK; x.fillRect(-16, -h - 28, 32, 28) }
  x.fillStyle = INK; x.fillRect(-62, -4, 124, 94); x.fillStyle = '#c96a3a'; x.fillRect(-54, 0, 108, 82)
  x.restore()
}

const CAMEOS = [
  // 1 · a snack is a hello
  { sign: S, cap: 'Bring a snack. | *That’s the hello.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.1],
    front(x, t, lt, P) {
      const sx = lerp(940, 560, ease.outCubic(prog(lt, 0.3, 0.9)))
      bits(x, 'COOKIE', sx, 900, 18 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.1 })
      hearts(x, t, 440, 780, P.t0 + 1.1, { n: 5, life: 1.6, spread: 180, cell: 7, seed: 3 })
      L(x, 790, 660, 'GREETING: ACCEPTED', pop01(t, P.t0 + 1.2, 0.3, 2.4), MINT, -0.04, 30)
    } },
  // 2 · "I'm fine"
  { sign: S, cap: '“I’m fine”? | *Ask over dinner.*', mood: lt => lt > 1.2 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      if (lt < 1.2) bubble(x, 560, 640, 'i’m fine.', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 44, tail: 'bl' })
      else bubble(x, 560, 640, 'okay so actually…', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 38, col: MINT, tail: 'bl' })
      bits(x, 'PLATE', 800, 960, 18 * pop01(t, P.t0 + 0.6, 0.3, 2)); steam(x, t, 800, 890, { alpha: lt > 0.8 ? 0.6 : 0 })
      L(x, 800, 1120, 'TALKS AFTER BITE 3', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, 0.04, 28)
    } },
  // 3 · don't rush them
  { sign: S, cap: 'Don’t rush them. | Slow is *how they open.*', mood: lt => lt > 1.6 ? 'sparkle' : 'happy', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      grow(x, 800, 1030, pop01(t, P.t0 + 0.2, 0.3, 2), ease.inOutCubic(prog(lt, 0.4, 2.0)))
      L(x, 800, 1180, 'GROWING. SLOWLY.', pop01(t, P.t0 + 0.6, 0.3, 2.4), MINT, -0.04, 28)
      if (lt > 2.0) sparkles(x, t, 800, 760, P.t0 + 2.05, 6, 120, 0.3)
    } },
  // 4 · sit with them
  { sign: S, cap: 'Just sit with them. | Quiet *counts too.*', mood: 'heart', look: [1, 0], star: { x: -140, y: -10 },
    back(x, t, lt, P) { bits(x, 'SOFA', 540, 1060, 26 * pop01(t, P.t0 + 0.15, 0.3, 2)) },
    front(x, t, lt, P) {
      friend(x, t, 'cancer', 720, 900, 220, pop01(t, P.t0 + 0.5, 0.35, 2), { mood: 'happy', look: [-1, 0] })
      L(x, 540, 640, 'WORDS SAID: 0. NICE.', pop01(t, P.t0 + 1.3, 0.3, 2.4), LAV, 0.04, 30)
      hearts(x, t, 540, 880, P.t0 + 1.4, { n: 4, life: 1.6, spread: 160, cell: 7, seed: 5 })
    } },
  // 5 · compliment the blanket
  { sign: S, cap: 'Compliment the blanket. | *It matters to them.*', mood: lt => lt > 1.1 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'BLANKET', 790, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.04 })
      bubble(x, 790, 680, 'so soft!', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 44, tail: 'bc' })
      L(x, 790, 1080, 'CHOSEN OVER 3 MONTHS', pop01(t, P.t0 + 1.3, 0.3, 2.4), PINK, -0.04, 28)
      sparkles(x, t, 790, 900, P.t0 + 1.1, 6, 170, 0.2)
    } },
  // 6 · plans changed
  { sign: S, cap: 'Plans changed? | Tell them *early.*', mood: lt => lt > 1.3 ? 'happy' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 790, 820, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 320, h: 260, head: 'SATURDAY', headBg: '#5fd068', headInk: INK, font: MONO, weight: 700, size: 28, lines: ['brunch → 1pm'] })
      bubble(x, 790, 610, 'heads up!', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 40, tail: 'bc' })
      L(x, 790, 1060, 'HEADS-UP: LOVED', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, 0.04, 32)
    } },
  // 7 · Align: skip the chart, just ask
  { sign: S, cap: 'Studying their chart? | *Just ask them.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      chart(x, 800, 820, 130, pop01(t, P.t0 + 0.2, 0.35, 2) * (1 - ease.inCubic(prog(lt, 1.0, 1.3))), t)
      bubble(x, 790, 820, 'how are you, | really?', pop01(t, P.t0 + 1.25, 0.3, 2.2), { size: 40, col: MINT, tail: 'bl' })
      L(x, 790, 1080, 'WORKS EVERY TIME', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, -0.04, 30)
    } },
  // 8 · show up with soup
  { sign: S, cap: 'Won’t ask for help? | Show up *with soup.*', mood: lt => lt > 1.1 ? 'heart' : 'sleepy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'BOWL', 790, 880, 20 * pop01(t, P.t0 + 0.3, 0.3, 2)); steam(x, t, 790, 790, { alpha: lt > 0.6 ? 0.7 : 0, h: 140 })
      L(x, 790, 1080, 'DELIVERY: LOVE', pop01(t, P.t0 + 1.1, 0.3, 2.4), PINK, 0.04, 32)
    } },
  // 9 · stubborn feelings
  { sign: S, cap: 'Stubborn about feelings? | *Give it a day.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [1, 0], star: ST, hops: [1.5],
    front(x, t, lt, P) {
      swapLabel(x, 760, 740, lt, 1.3, 'FEELINGS: NO', 'FEELINGS: …OK, SOME', { size: 26, fromBg: STEEL, toBg: PINK })
      bits(x, 'CLOCK', 790, 960, 16 * pop01(t, P.t0 + 0.4, 0.3, 2))
      if (lt > 1.4) hearts(x, t, 440, 780, P.t0 + 1.5, { n: 5, life: 1.6, spread: 160, cell: 7, seed: 8 })
    } },
]

const F = makeFilm({
  id: 'r2a0577', key: 'F', accent: ACC, solo: S, ending: 'lesson',
  title: 'How to check in | *on a Taurus.*',
  cameos: CAMEOS,
  card: { a: 'taurus', b: 'cancer', chip: 'ALIGNED' },
  group: { cap: 'Calm on the outside. | *Soft inside.*', mood: 'heart' },
  lesson: { text: 'Steady love | is *their language.*', chip: 'CHECKED IN' },
  last: { text: 'Bring snacks. | *Stay a while.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
