// nx2e02 (50 s vertical, "Star Talk Explains, Volume 2", episode 2) · story 0–45.6, then the shared end card.
//   ❓ "Why does the Moon change *shape*?"  ♓ PISCES (worried a thin Moon is sad) asks; ☽ THE MOON teaches:
//   ✓ the Moon makes no light, it reflects the Sun's · ✓ half of it is always lit · ✓ as it circles Earth we see more or
//   less of that half; it isn't Earth's shadow (that's an eclipse) · ✓ new to new is about 29.5 days · ✦ astrologers read
//   the cycle as begin, peak, rest · ♥ a thin week in love isn't the end. Pisces cries (relief). Last line (the Moon):
//   "Always half lit. *Always* whole."
// Engine: ../../nx2e01/scenes/x2kit.js · drawings: ../../nx2e01/scenes/x2draw.js. Pure f(t).
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { signStar } from '../../startalk.js'
import { chalkLine, chalkCircle, EX } from '../../stexplain.js'
import { makeEpisode, checkLengths } from '../../nx2e01/scenes/x2kit.js'
import { sunChalk, earthChalk, moonPhase, litHalf, pixHeart, popK, fadeK } from '../../nx2e01/scenes/x2draw.js'

const PIS = signStar('pisces')
const MOONC = '#e9e4ff', MOONLIGHT = '#bcd2ff'
const TAG = { kind: 'sky', dx: 800, dy: 14, align: 'right' }

const CFG = {
  id: 'nx2e02', duration: 50, key: 'G',
  q: 'Why does the Moon change *shape?*', qAccent: MOONLIGHT,
  teacher: { tag: '☽ THE MOON', color: MOONC, glyph: '☽', accent: MOONLIGHT, pitch: 392 },
  student: { tag: '♓ PISCES', color: PIS.color, glyph: PIS.glyph, pitch: 830 },
  boardTitle: 'MOON PHASES',
  beats: [
    { // ✓ reflected light; half always lit
      lines: [
        ['student', 'the Moon looks thin tonight. is it *sad?*'],
        ['teacher', 'i don’t make light. i *reflect* the Sun’s.', { tag: TAG, point: [300, 230] }],
        ['teacher', 'and half of me is always lit. *always.*', { point: [560, 230] }],
      ],
      draw(x, t, B, b) {
        const a = b.lines[1].t, Y = B.y0 + 240
        sunChalk(x, B.x0 + 110, Y, 52, t, popK(t, a))
        for (let i = 0; i < 3; i++) chalkLine(x, t, { pts: [[B.x0 + 200, Y - 50 + i * 50], [B.x0 + 470, Y - 50 + i * 50]], at: a + 0.4 + i * 0.12, dur: 0.4, color: EX.chalkYellow, width: 4, dash: [12, 10], arrow: true })
        litHalf(x, B.x0 + 580, Y, 80, Math.PI, popK(t, a + 0.9))
        const h = b.lines[2].t
        chalkCircle(x, t, { x: B.x0 + 580, y: Y, r: 100, at: h + 0.4, dur: 0.5, color: EX.chalkPink, width: 4, from: Math.PI / 2, sweep: Math.PI })
      },
      chalk: [{ dt: 0.3, line: 1, text: 'SUN', x: 110, y: 340, size: 30, align: 'center' }, { dt: 0.8, line: 2, text: '*HALF LIT*', x: 580, y: 370, size: 34, align: 'center' }],
    },
    { // ✓ the angle changes as it orbits; not Earth's shadow
      lines: [
        ['teacher', 'as i circle Earth, you see *more or less* of it.', { tag: TAG, point: [400, 230] }],
        ['student', 'so it’s Earth’s *shadow* on you?'],
        ['teacher', 'nope. that’s an eclipse. phases are *angles.*', { point: [400, 120] }],
      ],
      draw(x, t, B, b) {
        const a = b.lines[0].t, cx = B.x0 + 450, cy = B.y0 + 240
        chalkCircle(x, t, { x: cx, y: cy, r: 160, at: a, dur: 0.8, color: EX.chalk, width: 3 })
        earthChalk(x, cx, cy, 34, popK(t, a + 0.2))
        for (let i = 0; i < 8; i++) {
          const g = i * Math.PI / 4
          litHalf(x, cx + Math.cos(g) * 160, cy + Math.sin(g) * 160, 24, Math.PI, popK(t, a + 0.7 + i * 0.12, 0.3))
        }
        // sunlight from the left
        for (let i = 0; i < 3; i++) chalkLine(x, t, { pts: [[B.x0 + 20, cy - 110 + i * 110], [B.x0 + 150, cy - 110 + i * 110]], at: a + 0.3 + i * 0.1, dur: 0.3, color: EX.chalkYellow, width: 4, arrow: true })
        // "SHADOW?" crossed out
        const s = b.lines[2].t
        chalkLine(x, t, { pts: [[B.x0 + 10, B.y0 + 395], [B.x0 + 190, B.y0 + 420]], at: s + 0.4, dur: 0.25, color: EX.red, width: 7 })
      },
      chalk: [{ dt: 0.5, line: 1, text: 'SHADOW?', x: 20, y: 400, size: 32, color: EX.chalkBlue }, { dt: 1.2, line: 2, text: '*ANGLES*', x: 760, y: 400, size: 38, align: 'right' }],
    },
    { // ✓ 29.5 days; ✦ begin, peak, rest
      lines: [
        ['teacher', 'new to new takes about *29.5 days.*', { tag: TAG, point: [400, 170] }],
        ['teacher', 'astrologers read it as *begin, peak, rest.*', { tag: { kind: 'astro', dx: 800, dy: 74, align: 'right' }, point: [400, 300] }],
      ],
      draw(x, t, B, b) {
        const a = b.lines[0].t, Y = B.y0 + 180
        for (let i = 0; i < 8; i++) moonPhase(x, B.x0 + 60 + i * 97, Y, 36, i / 8, popK(t, a + 0.2 + i * 0.12, 0.3))
        chalkLine(x, t, { pts: [[B.x0 + 24, Y + 64], [B.x0 + 24, Y + 80], [B.x1 - 40, Y + 80], [B.x1 - 40, Y + 64]], at: a + 1.3, dur: 0.6, color: EX.chalkPink, width: 4 })
      },
      chalk: [
        { dt: 1.7, line: 0, text: '~*29.5* DAYS', x: 400, y: 300, size: 38, align: 'center' },
        { dt: 0.6, line: 1, text: 'BEGIN', x: 60, y: 400, size: 28, align: 'center', color: EX.lilac },
        { dt: 1.0, line: 1, text: 'PEAK', x: 448, y: 400, size: 28, align: 'center', color: EX.lilac },
        { dt: 1.4, line: 1, text: 'REST', x: 700, y: 400, size: 28, align: 'center', color: EX.lilac },
      ],
    },
    { // ♥ a thin week isn't the end
      lines: [
        ['teacher', 'a thin week in love isn’t *the end* either.', { tag: { kind: 'tip', dx: 800, dy: 14, align: 'right' }, point: [300, 240] }],
      ],
      draw(x, t, B, b) {
        const a = b.lines[0].t
        const ph = lerp(0.1, 0.5, ease.inOutCubic(prog(t, a + 0.3, a + 2.6)))
        moonPhase(x, B.x0 + 280, B.y0 + 240, 110, ph, popK(t, a))
        pixHeart(x, B.x0 + 590, B.y0 + 240, 16 * (0.6 + 0.4 * clamp(prog(t, a + 2.4, a + 2.8))), fadeK(t, a + 2.4))
      },
    },
  ],
  bulb: 'you were whole the *whole time?!*',
  items: ['The Moon *reflects* sunlight', 'Half is *always* lit', 'Phases = our *angle*'],
  last: 'Always half lit. *Always* whole.', lastWho: 'teacher',
}
const bad = checkLengths(CFG)
if (bad.length) throw new Error('nx2e02: too long: ' + bad.join(' | '))
const EP = makeEpisode(CFG)
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
