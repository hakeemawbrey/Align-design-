// st13eclipse (45 s vertical Align ad, Star Talk season 13 "Star Talk Explains", S13 E15) · story 0–40.6, then the end card.
//   ❓ "Why do astrologers *love* eclipses?" ♈ ARIES (the student) asks; ☽ THE MOON teaches at the chalkboard:
//   ✓ an eclipse is the Sun, Moon and Earth lining up (solar: Moon in the middle; lunar: Earth in the middle) ·
//   ✓ eclipse seasons come roughly every six months · ✓ never look at the Sun without proper eclipse glasses (Aries puts
//   a pair on) · ✦ astrologers read eclipses as turning points. Lightbulb, THE SHORT VERSION, and the last line
//   (the Moon): "Line up. *Light* up."
// The engine is ./explainkit.js (this folder's copy); the season look is ../../stexplain.js. Pure f(t).
import { clamp, prog } from '../../../src/lib.js'
import { signStar } from '../../startalk.js'
import { chalkLine, chalkCircle, chalkText, EX } from '../../stexplain.js'
import { makeEpisode, R, INK, r3 } from './explainkit.js'

const ARIES = signStar('aries')
const MOONC = '#e9e4ff', MOONLIGHT = '#bcd2ff'

// a chalk body: a circle that draws on, with a soft fill once it closes
function body(x, t, cx, cy, r, at, color, fillA = 0.18) {
  chalkCircle(x, t, { x: cx, y: cy, r, at, dur: 0.45, color, width: 5 })
  const k = clamp(prog(t, at + 0.35, at + 0.6))
  if (k > 0) { x.save(); x.globalAlpha *= k * fillA; x.fillStyle = color; x.beginPath(); x.arc(cx, cy, r - 3, 0, Math.PI * 2); x.fill(); x.restore() }
}
// a row of three bodies on one chalk line (the line-up), left to right
function lineUp(x, t, B, dy, at, order) {
  const Y = B.y0 + dy
  const X = [B.x0 + 90, B.x0 + 420, B.x0 + 640]
  chalkLine(x, t, { pts: [[B.x0 + 20, Y], [B.x1 - 60, Y]], at: at + 1.0, dur: 0.6, color: EX.chalkYellow, width: 3, dash: [10, 12] })
  order.forEach((who, i) => {
    const r = who === 'SUN' ? 54 : who === 'EARTH' ? 30 : 17
    const col = who === 'SUN' ? EX.chalkYellow : who === 'EARTH' ? EX.chalkBlue : EX.chalk
    body(x, t, X[i], Y, r, at + i * 0.3, col)
    chalkText(x, t, { text: who, x: X[i], y: Y + 84, at: at + 0.2 + i * 0.3, size: 26, align: 'center', cps: 30, color: col })
  })
}
// pixel eclipse glasses (cardboard frame, dark lenses), centred on (cx, cy), px = one pixel
function glasses(x, cx, cy, px, k = 1) {
  if (k <= 0) return
  x.save(); x.globalAlpha *= k
  const o = (i, j, w, h, c) => R(x, c, cx + i * px, cy + j * px, w * px, h * px)
  o(-13, -4, 26, 8, INK); o(-12, -3, 24, 6, '#fbf3e2')
  o(-11, -2, 9, 4, '#1a1428'); o(2, -2, 9, 4, '#1a1428')
  o(-10, -2, 3, 1, '#6a5f8a'); o(3, -2, 3, 1, '#6a5f8a')
  o(-1, -3, 2, 2, '#e8455e')
  x.restore()
}

const GL = 6                                              // the line index of "*never.*" (Aries' glasses go on)
const EP = makeEpisode({
  id: 'st13eclipse', numeral: 'S13 E15', duration: 45, key: 'F#',
  q: 'Why do astrologers *love* eclipses?', qAccent: MOONLIGHT,
  teacher: { tag: '☽ THE MOON', color: MOONC, glyph: '☽', accent: MOONLIGHT, pitch: 392 },
  student: { tag: '♈ ARIES', color: ARIES.color, glyph: ARIES.glyph, pitch: 784,
    prop: (x, r, t, T) => {                               // Aries puts the glasses on when the Moon says "never."
      const at = T.lines[GL].t + 0.9
      const k = clamp(prog(t, at, at + 0.25))
      if (k <= 0) return
      const cell = r.size / 36
      glasses(x, r.x, r.y + 1.2 * cell - (1 - k) * 60, Math.max(4, Math.round(cell * 0.85)), k)
    } },
  boardTitle: 'ECLIPSES 101',
  beats: [
    { // ✓ the line-up: solar (Moon in the middle), lunar (Earth in the middle)
      lines: [
        ['student', 'why does everyone lose it over *eclipses?*'],
        ['teacher', 'first, the sky part: three of us *line up.*', { tag: { kind: 'sky', dx: 800, dy: 14, align: 'right' }, point: [420, 150] }],
        ['teacher', 'Moon between Sun and Earth: *solar eclipse.*', { point: [420, 150] }],
        ['teacher', 'Earth between Sun and Moon: *lunar eclipse.*', { point: [420, 330] }],
      ],
      draw(x, t, B, b) {
        lineUp(x, t, B, 150, b.lines[1].t, ['SUN', 'MOON', 'EARTH'])
        lineUp(x, t, B, 330, b.lines[3].t, ['SUN', 'EARTH', 'MOON'])
      },
    },
    { // ✓ eclipse seasons, roughly every six months
      lines: [
        ['teacher', 'eclipse seasons come roughly every *six months.*', { tag: { kind: 'sky', dx: 800, dy: 14, align: 'right' }, point: [400, 230] }],
      ],
      draw(x, t, B, b) {
        const a = b.lines[0].t, Y = B.y0 + 260, xa = B.x0 + 150, xb = B.x0 + 650
        chalkLine(x, t, { pts: [[B.x0 + 20, Y], [B.x1 - 20, Y]], at: a, dur: 0.6, width: 5 })
        for (const [i, X] of [xa, xb].entries()) {
          body(x, t, X, Y, 34, a + 0.5 + i * 0.4, EX.chalkYellow, 0.2)
          body(x, t, X + 12, Y - 4, 30, a + 0.7 + i * 0.4, EX.chalk, 0.55)
        }
        chalkCircle(x, t, { x: (xa + xb) / 2, y: Y + 190, r: 330, at: a + 1.4, dur: 0.7, color: EX.chalkPink, width: 4, from: -Math.PI / 2 - 0.86, sweep: 1.72 })
      },
      chalk: [{ dt: 2.0, text: '~*6 MONTHS*', x: 400, y: 120, size: 40, align: 'center' }, { dt: 0.9, text: 'ECLIPSE SEASON', x: 150, y: 340, size: 24, align: 'center' }, { dt: 1.4, text: 'ECLIPSE SEASON', x: 650, y: 340, size: 24, align: 'center' }],
    },
    { // ✓ safety
      lines: [
        ['student', 'cool. so I just *stare* right at it?'],
        ['teacher', '*never.* proper eclipse glasses, always.', { tag: { kind: 'sky', dx: 800, dy: 14, align: 'right' }, point: [400, 210] }],
      ],
      draw(x, t, B, b) {
        const a = b.lines[1].t
        const k = clamp(prog(t, a, a + 0.3))
        glasses(x, B.x0 + 480, B.y0 + 200, 20 * (0.6 + 0.4 * k), k)
        // a big chalk ✕ over a bare eye, left
        const e = [B.x0 + 100, B.y0 + 210]
        chalkCircle(x, t, { x: e[0], y: e[1], r: 46, at: a - 0.4, dur: 0.4, color: EX.chalk, width: 4, from: Math.PI, sweep: Math.PI })
        chalkCircle(x, t, { x: e[0], y: e[1] - 30, r: 46, at: a - 0.2, dur: 0.4, color: EX.chalk, width: 4, from: 0.35, sweep: Math.PI - 0.7 })
        chalkLine(x, t, { pts: [[e[0] - 60, e[1] - 70], [e[0] + 60, e[1] + 50]], at: a + 0.1, dur: 0.2, color: EX.red, width: 8 })
        chalkLine(x, t, { pts: [[e[0] + 60, e[1] - 70], [e[0] - 60, e[1] + 50]], at: a + 0.3, dur: 0.2, color: EX.red, width: 8 })
      },
      chalk: [{ dt: 1.0, line: 1, text: 'ECLIPSE *GLASSES*', x: 480, y: 350, size: 40, align: 'center' }],
    },
    { // ✦ in astrology: turning points
      lines: [
        ['teacher', 'astrologers read eclipses as *turning points.*', { tag: { kind: 'astro', dx: 800, dy: 14, align: 'right' }, point: [520, 200] }],
      ],
      draw(x, t, B, b) {
        const a = b.lines[0].t
        chalkLine(x, t, { pts: [[B.x0 + 40, B.y0 + 330], [B.x0 + 330, B.y0 + 330], [B.x0 + 430, B.y0 + 300], [B.x0 + 520, B.y0 + 200], [B.x0 + 600, B.y0 + 130]], at: a + 0.2, dur: 1.0, color: EX.chalk, width: 6, arrow: true })
        // a tiny eclipse at the bend
        body(x, t, B.x0 + 330, B.y0 + 330, 28, a + 1.0, EX.chalkYellow, 0.25)
        body(x, t, B.x0 + 340, B.y0 + 326, 24, a + 1.2, EX.chalk, 0.6)
      },
      chalk: [{ dt: 1.4, text: 'A NEW *CHAPTER*', x: 780, y: 110, size: 34, align: 'right' }],
    },
  ],
  bulb: 'so: line up, *glasses on,* plot twist.',
  items: ['Sun, Moon, Earth *line up*', 'Seasons: every ~*6 months*', 'Astrology: a *turning point*'],
  last: 'Line up. *Light* up.', lastWho: 'teacher',
  cues: T => [['pop', r3(T.lines[GL].t + 0.9), 1046.5, 0.05, 0.4], ['tick', r3(T.lines[GL].t + 1.15), 0.05]],
})
if (!EP.T.lines[GL].text.startsWith('*never.*')) throw new Error('st13eclipse: GL is off')

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
