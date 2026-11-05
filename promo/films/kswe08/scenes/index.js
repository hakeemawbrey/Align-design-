// kswe08 · SIGN SWAP · "Scorpio Woke Up Chatty" (18 s vertical, Month 2 boost m11 #8, funk · E, hard cut)
//   0.0   frame 0: the café, first date, Scorpio mid-whisper, the swap bolt mid-strike, half Gemini-yellow, and a
//         speech bubble already the size of the screen. Hook "Scorpio woke up *an open book.*"  0.7 "caught" circle.
//   2.6   the overshare speedrun: Kevin the goldfish · three hobbies · the dream about a giraffe. ♎ the date stares.
//   7.0   Gemini-Scorpio freezes in horror: "wait. *too much?*"
//   8.8   the date: "wait. the GIRAFFE?? ME TOO." hearts. "Plot twist: *same dream.*"
//   12.0  ♓ Pisces at the next table, sobbing: "this is FATE"
//   15.8  last line "Said too much. *Found a match.*" holds, hard cut at 18.0.
import { makeSwap } from '../../kswe01/scenes/swapfilm.js'
import { star, swapper, swapBolt, swapTag, bubble, sticker, shadow, hearts, sparkles, table, mug, drawBits, label, R, box, INK, GOLD, PINK, RED, BONE, SIGN, pop01, outK, prog, ease, clamp, lerp, r3 } from '../../kswe01/scenes/swapkit.js'

const FROM = 'scorpio', TO = 'gemini'
const A = SIGN(FROM), B = SIGN(TO)

const GIRAFFE = ['.....YY', '....YYY', '....YB.', '....Y..', '...YY..', '...Y...', 'YYYYY..', 'YBYBY..', 'YYYYY..', 'Y.Y.Y..']
function giraffe(x, cx, cy, cell, rot = 0) { drawBits(x, GIRAFFE, { Y: '#f2c75c', B: '#a0703a' }, cx, cy, cell, { rot }) }
function scene(x, t, opts = {}) {
  table(x, 540, 1130, 620)
  mug(x, 440, 1130, '#e9b24a', 1, 1, t); mug(x, 650, 1130, '#c96a3a', 1, 1, t)
}
function opening(x, t) {
  scene(x, t)
  swapBolt(x, t, -0.25, { x1: 300, y1: 160, x2: 280, y2: 900, colA: A.color, colB: B.color, dur: 1.1 })
  const k = clamp(0.45 + t / 0.6 * 0.55)
  shadow(x, 290, 1195, 260)
  swapper(x, t, 290, 980, 290, FROM, TO, k, { mood: t < 0.6 ? 'squint' : 'wide', look: [1, -0.2], hops: [1.9] })
  shadow(x, 800, 1195, 240)
  star(x, t, 800, 990, 260, 'libra', { mood: 'wide', look: [-1, -0.3], seed: 3 })
  // the giant speech bubble, already enormous on frame 0
  const g = 1 + 0.04 * Math.sin(t * 9)
  x.save(); x.translate(540, 640); x.scale(g, g)
  bubble(x, t, 0, 0, -1, 2.6, 'SO. MY CHILDHOOD.\nMY FEARS. MY GOLDFISH.\nMY FIVE-YEAR PLAN.', { size: 56, tail: -0.6, k: outK(t, [2.3, 2.6]), col: '#fff3c8' })
  x.restore()
  swapTag(x, t, 540, 1360, FROM, TO, 1.9, { out: 2.6 })
}
const SHARE = [
  ['my first pet was a\ngoldfish named KEVIN', 2.8],
  ['i do pottery, climbing\nAND choir', 4.2],
  ['last night i dreamt a\ngiraffe gave me advice', 5.6],
]
function overshare(x, t) {
  scene(x, t)
  const horror = t > 7.0 && t < 8.8
  shadow(x, 290, 1195, 260)
  swapper(x, t, 290 + (horror ? Math.sin(t * 50) * 3 : 0), 980, 290, FROM, TO, 1, { mood: horror ? 'wide' : t > 8.9 ? 'heart' : 'happy', look: [1, -0.2], blink: horror ? false : undefined, hops: [...SHARE.map(s => s[1]), 3.3, 4.7, 6.1, 9.0] })
  shadow(x, 800, 1195, 240)
  star(x, t, 800, 990, 260, 'libra', { mood: t < 8.8 ? 'wide' : 'heart', look: [-1, -0.3], blink: t < 8.8 ? false : undefined, hops: [8.85, 9.3], seed: 3 })
  SHARE.forEach(([txt, at], i) => {
    const y = 520 + i * 170 - Math.max(0, (t - at)) * 0
    bubble(x, t, 470 + (i % 2) * 40, y, at, 7.0, txt, { size: 44, tail: -0.6, col: i === 2 ? '#fff3c8' : BONE })
  })
  if (t > 5.9 && t < 7.0) giraffe(x, 900, 560, 16, Math.sin(t * 6) * 0.1)
  if (horror) bubble(x, t, 330, 700, 7.1, 8.8, 'wait. too much?', { size: 48, tail: -0.3, col: '#ffd6cc' })
  if (t > 8.8) {
    bubble(x, t, 760, 640, 8.9, 12.0, 'the GIRAFFE??\nME TOO.', { size: 52, tail: 0.3, col: '#ffe7a8' })
    giraffe(x, 545, 850, 14, 0)
    hearts(x, t, 9.2, 290, 820, { n: 6 }); hearts(x, t, 9.3, 800, 820, { n: 6 })
  }
  if (t > 12.0) {
    const pk = ease.outCubic(prog(t, 12.0, 12.5))
    star(x, t, 540, lerp(1900, 1520, pk), 300, 'pisces', { mood: 'sparkle', look: [0, -0.6], tears: 3, hops: [12.6, 13.2, 13.8, 14.4, 15.0] })
    bubble(x, t, 540, 1770, 12.5, 18.2, 'this is FATE', { size: 46, col: '#d9d4ff', tail: null })
  }
}

const EP = makeSwap({
  duration: 18, ending: 'cut',
  hook: { text: 'Scorpio woke up *an open book.*', out: [2.4, 2.6], top: 220, size: 98 },
  caps: [
    { at: 2.7, out: [6.8, 7.0], text: 'First date. *Overshare speedrun.*', top: 230, size: 80 },
    { at: 8.9, out: [12.0, 12.2], text: 'Plot twist: *same dream.*', top: 230 },
  ],
  shots: [
    { at: 0, room: 'cafe', cam: [1.1, 540, 980], push: 0.05, draw: opening },
    { at: 2.6, room: 'cafe', cam: [1.1, 540, 1000], push: 0.05, draw: overshare },
  ],
  fx: [
    { kind: 'whip', at: -0.2, from: 1.45 },
    { kind: 'shake', at: 0.0, len: 0.45, amp: 22 },
    { kind: 'caught', at: 0.7, x: 290, y: 980, r: 180, out: [1.8, 1.95], label: 'the quiet one??', arrow: 'br', rec: true },
    { kind: 'rec', at: 7.0, len: 1.0, caption: 'oh no. *the giraffe.*', top: 1560 },
    { kind: 'shake', at: 8.85, len: 0.4, amp: 18 },
  ],
  flash: [{ at: 1.85, col: B.color, a: 0.4 }, { at: 8.85, col: GOLD, a: 0.35 }],
  punch: [{ at: 5.6, dur: 1.3, z: 0.08, x: 520, y: 900 }],
  last: { at: 15.8, text: 'Said too much. *Found a match.*', top: 300, size: 94 },
  cues: [
    ['glitter', 0.0, 0.5], ['pop', 1.9, 1174.66, 0.05, 0],
    ...SHARE.flatMap(([, at]) => [['pop', r3(at), 987.77, 0.04, -0.3], ...[0.12, 0.24, 0.36].map(d => ['pop', r3(at + d), 1318.51, 0.02, -0.3])]),
    ['glitter', 8.9, 9.6], ['pop', 8.9, 1567.98, 0.04, 0.3],
    ['pluck', 12.6, 659.25, 0.035, 0.5, 0.3], ['pluck', 12.75, 587.33, 0.035, 0.5, 0.3], ['pluck', 13.4, 523.25, 0.03, 0.5, -0.3],
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
