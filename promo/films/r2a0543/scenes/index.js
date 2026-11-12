// r2a0543: star_advice, ADVICE-SOLO (capricorn), "Capricorn, you're allowed | to want more." (signs3kit social cut, music: lofi · C).
// Nine cards: a relatable Capricorn truth + a warm reframe, one visual gag each. Ending: lesson.
import { makeFilm, sparkles, hearts, bubble, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, confetti, friend, bits, zzz, swapLabel, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#2fc79a', S = 'capricorn', ST = { x: -170 }

/** a tall slice of cake on a plate */
function cake(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-130, 70, 260, 26); x.fillStyle = BONE; x.fillRect(-124, 74, 248, 16)
  x.fillStyle = INK; x.fillRect(-96, -126, 192, 200)
  const lay = ['#f3d9a8', PINK, '#f3d9a8', PINK, '#f3d9a8']
  lay.forEach((c, i) => { x.fillStyle = c; x.fillRect(-90, -120 + i * 38, 180, 38) })
  x.fillStyle = '#ffffff'; x.fillRect(-90, -120, 180, 16)
  x.fillStyle = RED; x.beginPath(); x.arc(0, -138, 20, 0, Math.PI * 2); x.fill()
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Asking for more? | *You earned it.*', mood: lt => lt > 1.4 ? 'sparkle' : 'neutral', look: [1, 0], star: ST, hops: [1.5],
    front(x, t, lt, P) {
      sheet(x, 790, 800, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 300, h: 280, head: 'MY REQUEST', headBg: ACC, headInk: INK, lines: ['more time', 'more credit', 'more joy'], size: 30, progress: prog(lt, 0.4, 1.2) })
      L(x, 790, 1080, 'APPROVED', pop01(t, P.t0 + 1.5, 0.3, 2.6), GOLD, -0.06, 40)
    } },
  { sign: S, cap: 'Rest isn’t lazy. | *It’s maintenance.*', mood: lt => lt > 1.0 ? 'sleepy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'PILLOW', 790, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      if (lt > 1.0) zzz(x, t, 760, 760, { size: 46 })
      L(x, 790, 1100, 'RECHARGING: 80%', pop01(t, P.t0 + 1.2, 0.3, 2.2), MINT, -0.04, 30)
    } },
  { sign: S, cap: 'Dreaming big? | *Dream bigger.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', look: [1, -1], star: ST, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const g = 10 + 18 * ease.outCubic(prog(lt, 0.4, 1.4))
      bits(x, 'STAR', 790, 820, g * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 1100, 'GOAL: UPGRADED', pop01(t, P.t0 + 1.4, 0.3, 2.2), GOLD, 0.04, 32)
      sparkles(x, t, 790, 820, P.t0 + 1.5, 8, 200, 0.4)
    } },
  { sign: S, cap: 'Want the dessert? | *Order the dessert.*', mood: lt => lt > 1.2 ? 'heart' : 'squint', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      cake(x, 790, 860, pop01(t, P.t0 + 0.9, 0.3, 2))
      bubble(x, 790, 640, 'just water, | thanks', pop01(t, P.t0 + 0.2, 0.25, 2.2) * (1 - prog(lt, 0.8, 0.95)), { size: 36, tail: 'bl' })
      L(x, 790, 1090, 'EXTRA SLICE', pop01(t, P.t0 + 1.3, 0.3, 2.2), PINK, -0.04, 34)
    } },
  { sign: S, cap: 'Asking for help | *is strong too.*', mood: lt => lt > 1.2 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'BOX', 820, 1010, 14 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'BOX', 820, 930, 14 * pop01(t, P.t0 + 0.3, 0.3, 2))
      friend(x, t, 'cancer', 820, 760, 160, pop01(t, P.t0 + 0.9, 0.3, 2), { mood: 'sparkle', look: [-1, 0] })
      bubble(x, 760, 600, 'I got you!', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 38, col: GOLD, tail: 'br' })
    } },
  { sign: S, cap: 'Hit a goal? | *Celebrate first.*', mood: lt => lt > 1.1 ? 'sparkle' : 'neutral', look: [1, 0], star: ST, hops: [1.2, 1.7],
    front(x, t, lt, P) {
      bits(x, 'TROPHY', 790, 840, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      if (lt > 1.0) confetti(x, t, 790, 760, P.t0 + 1.0 * 1.29, { n: 22, spread: 260 })
      L(x, 790, 1080, 'NEXT GOAL: LATER', pop01(t, P.t0 + 1.4, 0.3, 2.2), MINT, -0.04, 30)
    } },
  { sign: S, cap: 'Fun isn’t a reward. | *It’s allowed today.*', mood: lt => lt > 1.4 ? 'sparkle' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 790, 800, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 300, h: 260, head: 'CALENDAR', headBg: STEEL, headInk: INK, lines: ['9: work', '12: work', '3: FUN'], size: 32, progress: prog(lt, 0.4, 1.2) })
      if (lt > 1.2) swapLabel(x, 790, 1060, lt, 1.6, 'FUN: SATURDAY', 'FUN: NOW', { size: 32, fromBg: STEEL, toBg: GOLD })
    } },
  { sign: S, cap: 'Want more closeness? | *Let people in.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      bits(x, 'HOUSE', 790, 860, 30 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 1090, 'DOOR: OPEN', pop01(t, P.t0 + 0.9, 0.3, 2.2), PINK, -0.04, 34)
      hearts(x, t, 790, 860, P.t0 + 1.2, { n: 6, life: 1.8, spread: 220, cell: 7, seed: 3 })
    } },
  { sign: S, cap: 'You’re more than | *your to-do list.*', mood: lt => lt > 1.4 ? 'heart' : 'wide', look: [1, 0], star: ST, hops: [1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      sheet(x, 790, 800, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 300, h: 300, head: 'TO DO', headBg: STEEL, headInk: INK, lines: ['finish report', 'reply to all', 'fix everything'], size: 28 })
      const s = prog(lt, 0.7, 1.2)
      if (s > 0) { x.save(); x.strokeStyle = RED; x.lineWidth = 10; x.lineCap = 'round'; x.beginPath(); x.moveTo(670, 780); x.lineTo(670 + 240 * s, 860 + 20 * s); x.stroke(); x.restore() }
      L(x, 790, 1080, 'STILL AMAZING', pop01(t, P.t0 + 1.4, 0.3, 2.2), GOLD, -0.04, 34)
    } },
]

const F = makeFilm({
  id: 'r2a0543', key: 'C', accent: ACC, solo: S, ending: 'lesson',
  title: 'Cap, you’re allowed | *to want more.*',
  cameos: CAMEOS,
  group: { cap: 'Hard worker. | *Big dreamer.*', mood: 'sparkle' },
  lesson: { text: 'Wanting more | is *not greedy.*', chip: 'PERMISSION: GRANTED' },
  last: { text: 'Now go order | *that dessert.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
