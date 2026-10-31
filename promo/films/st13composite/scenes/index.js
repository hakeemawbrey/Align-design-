// st13composite (45 s vertical Align ad, Star Talk season 13 "Star Talk Explains", S13 E34) · story 0–40.6, then the end card.
//   ❓ "What's a *composite* chart?" ♊ GEMINI (student) asks whose chart it is; ♀ VENUS (teacher, pointer) answers: neither.
//   The board: one chalk wheel with YOUR VENUS and THEIR VENUS, an arc between them and the MIDPOINT dot (✦ astrologers
//   take the midpoint of each matching pair), then an arrow to a new gold wheel labelled US, filling with midpoints (one new
//   chart for the relationship itself). Then a chalk heart with YOU → ♥ ← THEM: the us is its own thing you both tend (♥).
//   Lightbulb: "So it's you, me, and a little *us*." Last line (Venus): "The *us* has a chart."
// The engine is ./classkit.js (this folder's copy); the season look is ../../stexplain.js. Pure f(t).
import { clamp, prog, ease } from '../../../src/lib.js'
import { signStar } from '../../startalk.js'
import { drawVenus, VENUS } from '../../st8cast.js'
import { chalkCircle, chalkLine, chalkText } from '../../stexplain.js'
import { makeLesson, CHALK, R } from './classkit.js'
import { drawHearts } from './props.js'

const GEM = signStar('gemini')
const RAD = d => d / 180 * Math.PI

function ticks(x, t, cx, cy, r, at, col) {
  const k = clamp(prog(t, at, at + 0.3))
  if (k <= 0) return
  x.save(); x.globalAlpha *= k; x.strokeStyle = col; x.lineWidth = 3
  for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; x.beginPath(); x.moveTo(cx + Math.cos(a) * r * 0.62, cy + Math.sin(a) * r * 0.62); x.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r); x.stroke() }
  x.restore()
}
function dot(x, t, cx, cy, at, col, s0 = 24) {
  const p = ease.outBack(clamp(prog(t, at, at + 0.25)))
  if (p <= 0) return
  const s = s0 * p
  R(x, '#1b1236', cx - s / 2 - 3, cy - s / 2 - 3, s + 6, s + 6); R(x, col, cx - s / 2, cy - s / 2, s, s)
}

const EP = makeLesson({
  id: 'st13composite', numeral: 'S13 E34', duration: 45, key: 'G',
  q: 'What\'s a *composite* chart?', qAccent: VENUS.tagColor,
  cast: {
    venus: {
      tag: '♀︎ VENUS', color: VENUS.color, accent: VENUS.tagColor, x: 230, y: 1176, size: 250, enter: 2.3, pitch: 659.25, pointer: true,
      draw: (ctx, X, Y, s, t, o) => drawVenus(ctx, X, Y, s, t, o),
    },
    gemini: { tag: '♊ GEMINI', color: GEM.color, glyph: GEM.glyph, x: 850, y: 1176, size: 250, x0: 600, y0: 930, size0: 480, pitch: 880 },
  },
  student: 'gemini',
  board: { title: 'COMPOSITE' },
  lines: [
    ['gemini', 'Wait. Is it *your* chart or mine?'],
    ['venus', 'Neither. It\'s one chart for the *two* of you.'],
    ['venus', 'Pair them up: your Venus, *their* Venus.', { mark: 'pair' }],
    ['venus', 'Astrologers find the *midpoint* between them.', { mark: 'mid' }],
    ['venus', 'Every pair gets one. Together: a *new* chart.', { mark: 'new' }],
    ['gemini', 'A chart for the relationship *itself*?'],
    ['venus', 'Yes. The *us* is its own thing...', { mark: 'tend' }],
    ['venus', '...and you *both* tend it.', { mark: 'both' }],
    ['gemini', 'So it\'s you, me, and a little *us*.', { mark: 'bulb' }],
  ],
  chalk: [
    { text: 'YOUR VENUS', at: ['pair', 0.6], out: ['tend', 0.1], x: 0, y: 410, size: 28, color: CHALK.pink },
    { text: 'THEIR VENUS', at: ['pair', 1.4], out: ['tend', 0.1], x: 0, y: 450, size: 28, color: CHALK.blue },
    { text: 'MIDPOINT', at: ['mid', 1.4], out: ['tend', 0.1], x: 190, y: 225, size: 28, color: CHALK.gold, align: 'center' },
    { text: 'US', at: ['new', 1.0], out: ['tend', 0.1], x: 610, y: 225, size: 56, color: CHALK.gold, align: 'center' },
    { text: 'YOU', at: ['tend', 0.9], x: 70, y: 220, size: 44, color: CHALK.pink },
    { text: 'THEM', at: ['tend', 1.2], x: 730, y: 220, size: 44, color: CHALK.blue, align: 'right' },
    { text: 'the *us*', at: ['tend', 1.6], x: 400, y: 360, size: 46, align: 'center', accent: CHALK.gold },
    { text: 'tended by *both*', at: ['both', 0.5], x: 400, y: 420, size: 34, align: 'center', accent: CHALK.green },
  ],
  tags: [
    { kind: 'astro', at: ['mid', 2.0], out: ['tend', 0.1], x: 800, y: 450, align: 'right' },
    { kind: 'tip', at: ['both', 1.6], x: 400, y: 470, align: 'center' },
  ],
  bulb: ['bulb', 0.25],
  recap: ['A midpoint for each *pair*', 'One chart for the *us*', 'You *both* tend it'],
  last: 'The *us* has a chart.', lastWho: 'venus',
  moods(who, t, T) {
    if (who === 'gemini') {
      if (t < T.walk[0]) return { mood: 'wide', look: [-1, -1], tilt: 0.12 }
      if (t < T.m.pair) return { mood: 'squint', look: [-1, 0] }
      if (t < T.m.tend) return { mood: 'wide', look: [-1, -1] }
      if (t < T.bulb) return { mood: 'neutral', look: [-1, -1] }
      return { mood: 'sparkle', look: [-1, 0] }
    }
    if (t >= T.bulb) return { mood: 'heart', look: [1, 0] }
    if (t < T.m.pair) return { mood: 'wink', look: [1, 0] }
    return { mood: 'neutral', look: [1, -1] }
  },
  draw(x, t, T, B) {
    const fade = 1 - clamp(prog(t, T.m.tend, T.m.tend + 0.4))
    const r = 150, ax = B.x0 + 190, bx = B.x0 + 610, cy = B.y0 + 225
    if (fade > 0) {
      x.save(); x.globalAlpha *= fade
      // the pair wheel
      chalkCircle(x, t, { x: ax, y: cy, r, at: T.m.pair - 0.2, dur: 0.6, width: 5 })
      chalkCircle(x, t, { x: ax, y: cy, r: r * 0.62, at: T.m.pair + 0.1, dur: 0.4, width: 3 })
      ticks(x, t, ax, cy, r, T.m.pair + 0.4, CHALK.white)
      const p1 = 200, p2 = 300, mid = (p1 + p2) / 2, rr = r * 0.81
      dot(x, t, ax + Math.cos(RAD(p1)) * rr, cy + Math.sin(RAD(p1)) * rr, T.m.pair + 0.6, CHALK.pink)
      dot(x, t, ax + Math.cos(RAD(p2)) * rr, cy + Math.sin(RAD(p2)) * rr, T.m.pair + 1.4, CHALK.blue)
      chalkCircle(x, t, { x: ax, y: cy, r: rr, at: T.m.mid + 0.4, dur: 0.6, color: CHALK.gold, width: 5, from: RAD(p1), sweep: RAD(p2 - p1) })
      dot(x, t, ax + Math.cos(RAD(mid)) * rr, cy + Math.sin(RAD(mid)) * rr, T.m.mid + 1.1, CHALK.gold, 30)
      // the arrow to the new chart, and the new chart filling with midpoints
      chalkLine(x, t, { pts: [[ax + r + 14, cy], [bx - r - 14, cy]], at: T.m.new + 0.3, dur: 0.4, color: CHALK.gold, width: 5, arrow: true })
      chalkCircle(x, t, { x: bx, y: cy, r, at: T.m.new + 0.5, dur: 0.6, color: CHALK.gold, width: 5 })
      ticks(x, t, bx, cy, r, T.m.new + 1.0, CHALK.gold)
      ;[250, 30, 95, 160, 330, 200].forEach((d, i) => dot(x, t, bx + Math.cos(RAD(d)) * rr, cy + Math.sin(RAD(d)) * rr, T.m.new + 1.1 + i * 0.12, CHALK.gold))
      x.restore()
    }
    // the us: a chalk heart between YOU and THEM, two arrows in, then a beat
    const hx = B.x0 + 400, hy = B.y0 + 210
    const beat = 1 + 0.06 * Math.max(0, Math.sin(t * 6)) * clamp(prog(t, T.m.both, T.m.both + 0.3))
    x.save(); x.translate(hx, hy); x.scale(beat, beat); x.translate(-hx, -hy)
    const heart = []
    for (let i = 0; i <= 40; i++) {
      const a = i / 40 * Math.PI * 2
      heart.push([hx + 5.2 * 16 * Math.pow(Math.sin(a), 3), hy - 5.2 * (13 * Math.cos(a) - 5 * Math.cos(2 * a) - 2 * Math.cos(3 * a) - Math.cos(4 * a)) + 10])
    }
    chalkLine(x, t, { pts: heart, at: T.m.tend + 0.4, dur: 0.8, color: CHALK.gold, width: 7 })
    x.restore()
    chalkLine(x, t, { pts: [[B.x0 + 190, B.y0 + 220], [hx - 100, hy]], at: T.m.both + 0.2, dur: 0.3, color: CHALK.pink, width: 5, arrow: true })
    chalkLine(x, t, { pts: [[B.x0 + 600, B.y0 + 220], [hx + 100, hy]], at: T.m.both + 0.4, dur: 0.3, color: CHALK.blue, width: 5, arrow: true })
  },
  front(x, t, T, Rr) {
    const G = Rr.gemini, V = Rr.venus
    if (G) drawHearts(x, t, T.bulb + 0.4, G.x, G.top - 10, { n: 5, px: 6, spread: 110 })
    if (V) drawHearts(x, t, T.last + 0.2, V.x, V.top - 10, { n: 5, px: 6, spread: 110 })
  },
  cues: T => [['pluck', +(T.m.mid + 1.1).toFixed(3), 1567.98, 0.05, 0.6, 0], ['whoosh', +(T.m.new + 0.3).toFixed(3), 0.4, 0.02]],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
