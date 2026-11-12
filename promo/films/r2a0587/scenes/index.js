// r2a0587: star_advice, ADVICE SOLO (capricorn), "Capricorn, you can | *ask for help.*" (signs3kit social cut, music: lofi · F).
// One sign the whole way: nine gentle truths about a Capricorn who never asks, each with a warm reframe and one light gag.
// Ending: group (the group beat is the punchline).
//   carrying every box · three hours of research vs one question · asking = delegating · deleted "can you help?"
//   · friends like being needed (Cancer: "finally!") · rest isn't falling behind (nap: scheduled) · mountain goats climb
//   in herds · asked once, nothing collapsed · "thank you" counts as paying back
//   group "Strong. | *And supported.*"
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, friend, bits, swapLabel, RED, CREAM, STEEL, NIGHT, clamp, lerp, ease, prog } from './props.js'

const ACC = '#7dffb0', S = 'capricorn', ST = { x: -190 }
const box = (x, cx, cy, cell, o) => bits(x, 'BOX', cx, cy, cell, o)

/** a pixel mountain with a snowy top */
function mountain(x, cx, base, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, base); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-200, 8); x.lineTo(0, -278); x.lineTo(200, 8); x.closePath(); x.fill()
  x.fillStyle = '#7a6fb0'; x.beginPath(); x.moveTo(-186, 0); x.lineTo(0, -264); x.lineTo(186, 0); x.closePath(); x.fill()
  x.fillStyle = '#5a5090'; x.beginPath(); x.moveTo(0, -264); x.lineTo(186, 0); x.lineTo(40, 0); x.closePath(); x.fill()
  x.fillStyle = BONE; x.beginPath(); x.moveTo(-50, -194); x.lineTo(0, -264); x.lineTo(50, -194); x.lineTo(20, -206); x.lineTo(0, -190); x.lineTo(-22, -206); x.closePath(); x.fill()
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Carrying every box? | *Set one down.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const wob = lt < 1.3 ? 0.05 * Math.sin(t * 9) : 0
      for (let i = 0; i < 4; i++) { const down = i === 3 ? ease.inOutCubic(prog(lt, 1.3, 1.7)) : 0; box(x, 810 - down * 150, lerp(1040 - i * 90, 1040, down), 14 * pop01(t, P.t0 + 0.2 + i * 0.12, 0.3, 2), { rot: down ? 0 : wob * (i + 1) }) }
      L(x, 790, 640, lt < 1.3 ? 'LOAD: TOO MUCH' : 'LOAD: LIGHTER', pop01(t, P.t0 + 0.4, 0.3, 2), lt < 1.3 ? RED : MINT, -0.04, 32)
    } },
  { sign: S, cap: 'Researched it for hours? | *One question works too.*', mood: lt => lt > 1.3 ? 'wide' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'LAPTOP', 810, 900, 16 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 700, 'TABS OPEN: ALL', pop01(t, P.t0 + 0.5, 0.3, 2), STEEL, -0.04, 32)
      bubble(x, 800, 1070, 'just ask?', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 44, col: MINT, tail: 'bl' })
    } },
  { sign: S, cap: 'Asking isn’t failing. | *It’s delegating.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      sheet(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 330, h: 300, head: 'TO DO', headBg: STEEL, headInk: INK, lines: ['taxes: me', 'move: me', lt > 1.1 ? ['dinner: friends', '#2f9a4a'] : 'dinner: me'], size: 34, rot: -0.04 })
      L(x, 800, 1100, 'VERY EXECUTIVE', pop01(t, P.t0 + 1.5, 0.3, 2.2), GOLD, 0.04, 32)
    } },
  { sign: S, cap: 'Deleted “can you help?” | *Send it this time.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, t, 810, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'TO: BESTIE', headCol: MINT, lines: [['can you help?', GOLD, pop01(t, P.t0 + 0.5, 0.2, 2), true], ['of course!!', MINT, pop01(t, P.t0 + 1.6, 0.2, 2), false]], typing: lt > 1.0 && lt < 1.6 ? 1 : 0 })
      L(x, 800, 1120, 'SENT. FINALLY.', pop01(t, P.t0 + 1.7, 0.3, 2.2), PINK, -0.04, 30)
    } },
  { sign: S, cap: 'Feel like a burden? | *Friends like being needed.*', mood: lt => lt > 1.1 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      friend(x, t, 'cancer', 820, 920, 210, pop01(t, P.t0 + 0.3, 0.35, 2), { mood: 'heart', look: [-1, 0] })
      bubble(x, 820, 680, 'finally!', pop01(t, P.t0 + 0.9, 0.25, 2.4), { size: 56, col: SKYB, tail: 'bl' })
      hearts(x, t, 820, 820, P.t0 + 1.3, { n: 4, life: 1.6, spread: 160, cell: 6, seed: 4 })
    } },
  { sign: S, cap: 'Rest isn’t | *falling behind.*', mood: lt => lt > 1.0 ? 'sleepy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'PILLOW', 810, 920, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 700, 'NAP: SCHEDULED', pop01(t, P.t0 + 0.6, 0.3, 2), LAV, -0.04, 36)
      L(x, 800, 1100, '2:00 – 2:20 PM', pop01(t, P.t0 + 1.4, 0.3, 2.2), CREAM, 0.04, 30)
    } },
  { sign: S, cap: 'Even mountain goats | *climb together.*', mood: 'happy', look: [1, -1], star: ST, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      mountain(x, 800, 1080, pop01(t, P.t0 + 0.2, 0.35, 2))
      const c = ease.inOutCubic(prog(lt, 0.6, 1.8))
      friend(x, t, 'capricorn', lerp(670, 740, c), lerp(1040, 880, c), 110, pop01(t, P.t0 + 0.5, 0.3, 2), { mood: 'happy' })
      friend(x, t, 'taurus', lerp(760, 860, c), lerp(1050, 910, c), 110, pop01(t, P.t0 + 0.6, 0.3, 2), { mood: 'happy' })
      L(x, 800, 1130, 'ROPE TEAM: 2', pop01(t, P.t0 + 1.5, 0.3, 2.2), GOLD, 0.04, 30)
    } },
  { sign: S, cap: 'Asked for help once? | *Nothing collapsed.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      for (let i = 0; i < 4; i++) box(x, 810, 1040 - i * 90, 14 * pop01(t, P.t0 + 0.2 + i * 0.1, 0.3, 2))
      L(x, 800, 640, 'STILL STANDING', pop01(t, P.t0 + 1.1, 0.3, 2.2), MINT, -0.04, 34)
      sparkles(x, t, 810, 900, P.t0 + 1.4, 6, 170, 0.2)
    } },
  { sign: S, cap: '“Thank you” counts | *as paying back.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      bubble(x, 800, 700, 'thank you.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 56, col: MINT, tail: 'bl' })
      swapLabel(x, 800, 960, lt, 1.0, 'OWED: A FAVOUR', 'OWED: NOTHING', { size: 32, fromBg: STEEL, toBg: PINK })
      hearts(x, t, 800, 900, P.t0 + 1.6, { n: 4, life: 1.6, spread: 200, cell: 6, seed: 7 })
    } },
]

const F = makeFilm({
  id: 'r2a0587', key: 'F', accent: ACC, solo: S, ending: 'group',
  title: 'Capricorn, you can | *ask for help.*',
  cameos: CAMEOS,
  group: { cap: 'Strong. | *And supported.*', mood: 'heart' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
