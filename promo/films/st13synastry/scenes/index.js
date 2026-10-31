// st13synastry (60 s vertical Align ad, Star Talk season 13 "Star Talk Explains", S13 E33) · story 0–55.6, then the end card.
//   ❓ "What's *synastry*?" ♎ LIBRA (student, scales in a wobble) wants a test to see if they match; ♀ VENUS (teacher,
//   pointer) draws two chalk birth-chart wheels, YOU and THEM, and slides one over the other (✦ how astrologers compare two
//   charts); chalk links between their dots: flow spots and rub spots, read as dynamics and talking points, not verdicts
//   (✦). Gag: Libra asks for a match score, "MATCH: ??%" goes up on the board and Venus crosses it out. Then two chalk
//   speech bubbles: the best match test is a real conversation (♥). Lightbulb: "So the chart starts the chat. *We* finish
//   it." Last line (Venus): "Two skies. *One* conversation."
// The engine is ./classkit.js (this folder's copy); the season look is ../../stexplain.js. Pure f(t).
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import { signStar } from '../../startalk.js'
import { drawVenus, VENUS } from '../../st8cast.js'
import { chalkCircle, chalkLine, chalkText } from '../../stexplain.js'
import { makeLesson, CHALK, R } from './classkit.js'
import { drawHearts } from './props.js'

const LIB = signStar('libra')
const DOTS_A = [20, 75, 140, 200, 250, 320], DOTS_B = [40, 110, 165, 230, 290, 345]
const LINKS = [[0, 0, 'flow'], [2, 2, 'rub'], [4, 4, 'flow']]

function wheel(x, t, cx, cy, r, at, col, dots, k = 1, dash = null) {
  if (t < at || k <= 0) return
  x.save(); x.globalAlpha *= k
  chalkCircle(x, t, { x: cx, y: cy, r, at, dur: 0.6, color: col, width: 5 })
  chalkCircle(x, t, { x: cx, y: cy, r: r * 0.62, at: at + 0.3, dur: 0.5, color: col, width: 3 })
  const tk = clamp(prog(t, at + 0.6, at + 0.9))
  if (tk > 0) {
    x.save(); x.globalAlpha *= tk; x.strokeStyle = col; x.lineWidth = 3; if (dash) x.setLineDash(dash)
    for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; x.beginPath(); x.moveTo(cx + Math.cos(a) * r * 0.62, cy + Math.sin(a) * r * 0.62); x.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r); x.stroke() }
    x.restore()
  }
  dots.forEach((d, i) => {
    const p = ease.outBack(clamp(prog(t, at + 0.9 + i * 0.08, at + 1.1 + i * 0.08)))
    if (p <= 0) return
    const a = d / 180 * Math.PI, rr = r * 0.81, s = 16 * p
    R(x, '#1b1236', cx + Math.cos(a) * rr - s / 2 - 3, cy + Math.sin(a) * rr - s / 2 - 3, s + 6, s + 6)
    R(x, col, cx + Math.cos(a) * rr - s / 2, cy + Math.sin(a) * rr - s / 2, s, s)
  })
  x.restore()
}
const dotAt = (cx, cy, r, d) => [cx + Math.cos(d / 180 * Math.PI) * r * 0.81, cy + Math.sin(d / 180 * Math.PI) * r * 0.81]

const EP = makeLesson({
  id: 'st13synastry', numeral: 'S13 E33', duration: 60, key: 'Bb',
  q: 'What\'s *synastry*?', qAccent: VENUS.tagColor,
  cast: {
    venus: {
      tag: '♀︎ VENUS', color: VENUS.color, accent: VENUS.tagColor, x: 230, y: 1176, size: 250, enter: 2.3, pitch: 659.25, pointer: true,
      draw: (ctx, X, Y, s, t, o) => drawVenus(ctx, X, Y, s, t, o),
    },
    libra: { tag: '♎ LIBRA', color: LIB.color, glyph: LIB.glyph, x: 850, y: 1176, size: 250, x0: 600, y0: 930, size0: 480, pitch: 523.25 },
  },
  student: 'libra',
  board: { title: 'SYNASTRY' },
  lines: [
    ['libra', 'Is there a test to see if we *match*?'],
    ['venus', 'Astrologers have one idea: *synastry*.'],
    ['venus', 'Take two birth charts...', { mark: 'two' }],
    ['venus', '...and lay one *over* the other.', { mark: 'over' }],
    ['libra', 'And then it says *yes* or no?'],
    ['venus', 'No verdicts. They read *dynamics*.', { mark: 'dyn' }],
    ['venus', 'Flow spots, rub spots: *talking points*.'],
    ['libra', 'Okay, but what\'s our *match score*?', { mark: 'meter' }],
    ['venus', 'No scores. A chart *describes*, never decides.', { mark: 'erase' }],
    ['venus', 'The best match test? A real *conversation*.', { mark: 'talk' }],
    ['libra', 'So the chart starts the chat. *We* finish it.', { mark: 'bulb' }],
  ],
  chalk: [
    { text: 'YOU', at: ['two', 1.0], out: ['over', 0.1], x: 190, y: 410, size: 34, color: CHALK.pink, align: 'center' },
    { text: 'THEM', at: ['two', 1.6], out: ['over', 0.1], x: 610, y: 410, size: 34, color: CHALK.blue, align: 'center' },
    { text: 'MATCH: ??%', at: ['meter', 0.6], out: ['erase', 1.2], x: 400, y: 400, size: 50, color: CHALK.gold, align: 'center', cps: 18 },
    { line: [[240, 370], [560, 420]], at: ['erase', 0.4], out: ['erase', 1.2], dur: 0.25, color: CHALK.red, width: 8 },
    { line: [[560, 370], [240, 420]], at: ['erase', 0.6], out: ['erase', 1.2], dur: 0.25, color: CHALK.red, width: 8 },
    { text: '"So what do|you need?"', at: ['talk', 0.6], x: 50, y: 110, size: 38, color: CHALK.pink },
    { text: '"Tell me|more."', at: ['talk', 1.4], x: 470, y: 270, size: 38, color: CHALK.blue },
  ],
  tags: [
    { kind: 'astro', at: ['over', 1.3], out: ['dyn', 0.9], x: 400, y: 455, align: 'center' },
    { kind: 'astro', at: ['dyn', 1.6], out: ['meter', 0.4], x: 400, y: 455, align: 'center' },
    { kind: 'tip', at: ['talk', 2.2], x: 400, y: 455, align: 'center' },
  ],
  bulb: ['bulb', 0.25],
  recap: ['Two charts, *overlaid*', 'Dynamics, not *verdicts*', 'Then *talk* to each other'],
  last: 'Two skies. *One* conversation.', lastWho: 'venus',
  moods(who, t, T) {
    if (who === 'libra') {
      if (t < T.walk[0]) return { mood: 'squint', look: [-1, -1], tilt: 0.1 }
      if (t < T.m.two) return { mood: 'neutral', look: [-1, -1] }
      if (t < T.m.dyn) return { mood: 'wide', look: [-1, -1] }
      if (t < T.m.meter + 2.5) return { mood: 'sparkle', look: [-1, 0] }
      if (t < T.m.talk) return { mood: 'wide', look: [-1, 0] }
      if (t < T.bulb) return { mood: 'neutral', look: [-1, -1] }
      return { mood: 'heart', look: [-1, 0] }
    }
    if (t >= T.m.meter && t < T.m.erase) return { mood: 'eyeroll' }
    if (t >= T.bulb) return { mood: 'happy', look: [1, 0] }
    return { mood: 'neutral', look: [1, -1] }
  },
  draw(x, t, T, B) {
    const ov = ease.inOutCubic(clamp(prog(t, T.m.over + 0.3, T.m.over + 1.2)))
    const fade = 1 - clamp(prog(t, T.m.talk, T.m.talk + 0.4))
    const cy = B.y0 + 225, r = 150
    const ax = B.x0 + lerp(190, 330, ov), bx = B.x0 + lerp(610, 330, ov)
    const lift = clamp(prog(t, T.m.meter, T.m.meter + 0.4)) * (1 - clamp(prog(t, T.m.erase + 1.1, T.m.erase + 1.5)))
    const yy = cy - 30 * lift
    wheel(x, t, ax, yy, r, T.m.two + 0.3, CHALK.pink, DOTS_A, fade)
    wheel(x, t, bx, yy, r * (1 - 0.18 * ov), T.m.two + 1.0, CHALK.blue, DOTS_B, fade, [8, 6])
    // the links: dynamics, not verdicts
    if (fade > 0 && t > T.m.dyn + 0.3) {
      x.save(); x.globalAlpha *= fade
      LINKS.forEach(([i, j, kind], n) => {
        const at = T.m.dyn + 0.3 + n * 0.35
        const [x0, y0] = dotAt(ax, yy, r, DOTS_A[i]), [x1, y1] = dotAt(bx, yy, r * (1 - 0.18 * ov), DOTS_B[j])
        chalkLine(x, t, { pts: [[x0, y0], [x1, y1]], at, dur: 0.3, color: kind === 'flow' ? CHALK.green : CHALK.gold, width: 5, dash: kind === 'flow' ? null : [6, 6] })
      })
      chalkText(x, t, { text: 'flow', x: B.x0 + 560, y: B.y0 + 140, at: T.m.dyn + 1.2, size: 34, color: CHALK.green })
      chalkText(x, t, { text: 'rub', x: B.x0 + 560, y: B.y0 + 200, at: T.m.dyn + 1.5, size: 34, color: CHALK.gold })
      chalkText(x, t, { text: '= talking|  points', x: B.x0 + 560, y: B.y0 + 260, at: T.m.dyn + 4.0, size: 34, color: CHALK.white })
      x.restore()
    }
    // the talk: two chalk speech bubbles
    const bubble = (x0, y0, w, h, at, col, tail) => chalkLine(x, t, { pts: [[x0, y0], [x0 + w, y0], [x0 + w, y0 + h], ...tail, [x0, y0 + h], [x0, y0]], at, dur: 0.5, color: col, width: 4 })
    bubble(B.x0 + 30, B.y0 + 70, 340, 130, T.m.talk + 0.3, CHALK.pink, [[B.x0 + 120, B.y0 + 200], [B.x0 + 80, B.y0 + 240], [B.x0 + 90, B.y0 + 200]])
    bubble(B.x0 + 450, B.y0 + 230, 300, 130, T.m.talk + 1.1, CHALK.blue, [[B.x0 + 680, B.y0 + 360], [B.x0 + 720, B.y0 + 400], [B.x0 + 660, B.y0 + 360]])
  },
  front(x, t, T, Rr) {
    const L = Rr.libra
    if (L) drawHearts(x, t, T.bulb + 0.4, L.x, L.top - 10, { n: 5, px: 6, spread: 110 })
    // Libra's little pixel scales, tipping while they wait for a yes/no, level once it clicks
    if (L && t < T.recap) {
      const P = 6, sx = L.x - L.size * 0.6, sy = L.y - L.size * 0.1
      const tip = t < T.bulb ? Math.sin(t * 2.2) * 0.25 : 0.0
      x.save(); x.translate(sx, sy)
      R(x, '#1b1236', -3 * P / 2 - 2, -2, 3 * P / 1.5 + 4, 15 * P + 4); R(x, '#f2c75c', -P / 2, 0, P, 15 * P)
      R(x, '#1b1236', -4 * P - 2, 15 * P - 2, 8 * P + 4, P * 2 + 4); R(x, '#f2c75c', -4 * P, 15 * P, 8 * P, P * 2)
      x.rotate(tip)
      R(x, '#1b1236', -9 * P - 2, -2, 18 * P + 4, P + 4); R(x, '#f2c75c', -9 * P, 0, 18 * P, P)
      for (const sd of [-1, 1]) {
        x.save(); x.translate(sd * 8 * P, P); x.rotate(-tip)
        R(x, '#fff1c8', -P / 4, 0, P / 2, 4 * P)
        R(x, '#1b1236', -3 * P - 2, 4 * P - 2, 6 * P + 4, 2 * P + 4); R(x, '#e163d6', -3 * P, 4 * P, 6 * P, 2 * P)
        x.restore()
      }
      x.restore()
    }
  },
  cues: T => [['whoosh', +(T.m.over + 0.3).toFixed(3), 0.6, 0.02], ['snare', +(T.m.erase + 0.4).toFixed(3), { gain: 0.07, tone: 180, decay: 0.1, snappy: 0.9, rev: 0.1 }], ['snare', +(T.m.erase + 0.6).toFixed(3), { gain: 0.07, tone: 180, decay: 0.1, snappy: 0.9, rev: 0.1 }]],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
