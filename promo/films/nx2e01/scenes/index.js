// nx2e01 (45 s vertical, "Star Talk Explains, Volume 2", episode 1) · story 0–40.6, then the shared end card.
//   ❓ "Born on the *cusp*: am I both signs?"  ♐ SAGITTARIUS (born 21 December) asks; ♎ LIBRA teaches at the board:
//   ✓ the Sun changes sign at one exact moment, and that moment can shift a day from year to year (the Sun dot wobbles
//   across the SAG | CAP line) · ✦ a cusp is just the line between two signs; your birth time puts your Sun on one side ·
//   ✦ one Sun sign; the Moon and rising add more · ♥ bring the whole you to love, not a label (two heart halves snap
//   together). Pisces (the classmate) cries happy tears. Last line (Libra): "Not half and half. *Whole*."
// The engine is ./x2kit.js (the Volume 2 kit, shared by every episode); the season look is ../../stexplain.js. Pure f(t).
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { signStar } from '../../startalk.js'
import { easeOutBack } from '../../wheel.js'
import { chalkLine, chalkCircle, chalkText, EX } from '../../stexplain.js'
import { makeEpisode, checkLengths, R, INK, r3 } from './x2kit.js'

const SAG = signStar('sagittarius'), LIB = signStar('libra')
const SUNC = EX.chalkYellow

/** a filled chalk disc (no draw-on), for things that move */
function disc(x, cx, cy, r, color, a = 1) {
  if (a <= 0) return
  x.save(); x.globalAlpha *= a
  x.shadowColor = color; x.shadowBlur = 14
  x.fillStyle = color; x.globalAlpha *= 0.35; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill()
  x.globalAlpha /= 0.35; x.lineWidth = 5; x.strokeStyle = color; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.stroke()
  x.restore()
}
// a pixel heart half (left or right), px = one cell
const HEART = ['.HH...HH.', 'HHHH.HHHH', 'HHHHHHHHH', 'HHHHHHHHH', '.HHHHHHH.', '..HHHHH..', '...HHH...', '....H....']
function heartHalf(x, cx, cy, px, side, k = 1) {
  if (k <= 0) return
  x.save(); x.globalAlpha *= k
  HEART.forEach((row, j) => [...row].forEach((ch, i) => {
    if (ch !== 'H') return
    if (side < 0 && i > 4) return
    if (side > 0 && i < 4) return
    if (i === 4 && side < 0 && j % 2) return            // a jagged crack down the middle
    if (i === 4 && side > 0 && !(j % 2)) return
    R(x, INK, cx + (i - 4.5) * px - 2, cy + (j - 4) * px - 2, px + 4, px + 4)
  }))
  HEART.forEach((row, j) => [...row].forEach((ch, i) => {
    if (ch !== 'H') return
    if (side < 0 && i > 4) return
    if (side > 0 && i < 4) return
    if (i === 4 && side < 0 && j % 2) return
    if (i === 4 && side > 0 && !(j % 2)) return
    R(x, j < 2 && i % 3 === 1 ? '#ffd1de' : '#ff4f86', cx + (i - 4.5) * px, cy + (j - 4) * px, px, px)
  }))
  x.restore()
}

const CFG = {
  id: 'nx2e01', duration: 45, key: 'E',
  q: 'Born on the *cusp:* am I both signs?', qAccent: '#ffadc6',
  teacher: { tag: '♎ LIBRA', color: LIB.color, glyph: LIB.glyph, pitch: 523 },
  student: { tag: '♐ SAGITTARIUS', color: SAG.color, glyph: SAG.glyph, pitch: 740 },
  boardTitle: 'THE CUSP',
  beats: [
    { // ✓ the Sun crosses into a new sign at one exact moment, and the date can shift
      lines: [
        ['student', 'i was born december 21st. am i *both?*'],
        ['teacher', 'the Sun changes sign at one *exact moment.*', { tag: { kind: 'sky', dx: 800, dy: 14, align: 'right' }, point: [400, 230] }],
        ['teacher', 'that moment can shift a day *year to year.*', { point: [400, 300] }],
      ],
      draw(x, t, B, b) {
        const a = b.lines[1].t, Y = B.y0 + 240, X = B.x0 + 400
        chalkLine(x, t, { pts: [[B.x0 + 30, Y], [B.x1 - 30, Y]], at: a - 0.1, dur: 0.6, width: 5, arrow: true })
        chalkLine(x, t, { pts: [[X, B.y0 + 100], [X, B.y0 + 380]], at: a + 0.3, dur: 0.5, color: SUNC, width: 5, dash: [14, 12] })
        // the Sun slides along the path and stops on the line, then wobbles across it as the years change
        const k = clamp(prog(t, a + 0.6, a + 0.9))
        const p = ease.inOutCubic(prog(t, a + 0.6, a + 2.2))
        const w = b.lines[2].t
        const wob = t > w ? Math.sin((t - w) * 3.4) * 46 * clamp(prog(t, w, w + 0.4)) : 0
        disc(x, lerp(B.x0 + 90, X, p) + wob, Y, 32, SUNC, k)
      },
      chalk: [
        { dt: 0.2, line: 1, text: 'SAG', x: 200, y: 150, size: 44, align: 'center' },
        { dt: 0.5, line: 1, text: 'CAP', x: 600, y: 150, size: 44, align: 'center' },
        { dt: 0.9, line: 2, text: 'DEC *21?*', x: 260, y: 350, size: 32, align: 'center' },
        { dt: 1.4, line: 2, text: 'DEC *22?*', x: 560, y: 350, size: 32, align: 'center' },
      ],
    },
    { // ✦ a cusp is the line; birth time puts the Sun on one side
      lines: [
        ['teacher', 'a cusp is just the *line* between two signs.', { tag: { kind: 'astro', dx: 800, dy: 14, align: 'right' }, point: [400, 200] }],
        ['teacher', 'your birth time puts your Sun on *one side.*', { point: [250, 220] }],
        ['student', 'so i’m not half sag, half cap?'],
      ],
      draw(x, t, B, b) {
        const a = b.lines[0].t, X = B.x0 + 400, Y = B.y0 + 230
        chalkLine(x, t, { pts: [[X, B.y0 + 90], [X, B.y0 + 380]], at: a + 0.1, dur: 0.5, color: SUNC, width: 7 })
        const s = b.lines[1].t
        const k = clamp(prog(t, s + 0.3, s + 0.6))
        disc(x, B.x0 + 250, Y, 36 * (0.7 + 0.3 * k), SUNC, k)
        chalkCircle(x, t, { x: B.x0 + 250, y: Y, r: 64, at: s + 1.0, dur: 0.6, color: EX.chalkPink, width: 5 })
      },
      chalk: [
        { dt: 0.5, line: 0, text: 'THE *CUSP*', x: 400, y: 70, size: 34, align: 'center' },
        { dt: 0.6, line: 1, text: 'YOUR SUN', x: 250, y: 340, size: 30, align: 'center' },
        { dt: 0.4, line: 2, text: '½ + ½ ?', x: 610, y: 245, size: 52, align: 'center', color: EX.chalkBlue },
      ],
    },
    { // ✦ one Sun sign; the Moon and rising add more
      lines: [
        ['teacher', 'one Sun sign. your Moon and rising add *more.*', { tag: { kind: 'astro', dx: 800, dy: 14, align: 'right' }, point: [300, 220] }],
      ],
      chalk: [
        { dt: 0.3, text: 'SUN', x: 60, y: 140, size: 44 },
        { dt: 0.5, text: '= *SAG*', x: 320, y: 140, size: 44 },
        { dt: 1.0, text: 'MOON', x: 60, y: 240, size: 44 },
        { dt: 1.2, text: '= ?', x: 320, y: 240, size: 44 },
        { dt: 1.6, text: 'RISING', x: 60, y: 340, size: 44 },
        { dt: 1.8, text: '= ?', x: 320, y: 340, size: 44 },
      ],
    },
    { // ♥ the whole you
      lines: [
        ['teacher', 'in love, bring the *whole* you, not a label.', { tag: { kind: 'tip', dx: 800, dy: 14, align: 'right' }, point: [400, 240] }],
      ],
      draw(x, t, B, b) {
        const a = b.lines[0].t, cx = B.x0 + 400, cy = B.y0 + 250
        const k = clamp(prog(t, a, a + 0.3))
        const snap = easeOutBack(prog(t, a + 1.4, a + 1.8), 2)
        const gap = lerp(110, 0, snap)
        const tilt = lerp(1, 0, snap)
        heartHalf(x, cx - gap, cy + tilt * 10, 22, -1, k)
        heartHalf(x, cx + gap, cy - tilt * 10, 22, 1, k)
      },
      chalk: [{ dt: 2.0, text: '*WHOLE*', x: 400, y: 420, size: 44, align: 'center' }],
    },
  ],
  bulb: 'so: one line, one Sun, *all of me.*',
  items: ['A cusp is just a *line*', 'Your Sun lands on *one* side', 'Moon + rising add *more*'],
  last: 'Not half and half. *Whole*.', lastWho: 'teacher',
}
const bad = checkLengths(CFG)
if (bad.length) throw new Error('nx2e01: too long: ' + bad.join(' | '))
const EP = makeEpisode(CFG)

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
void r3
