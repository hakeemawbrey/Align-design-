// nx2e12 (50 s vertical, "Star Talk Explains, Volume 2", episode 12) · story 0–45.6, then the shared end card.
//   ❓ "What if my chart has *no* fire?"  ♍ VIRGO (who counted) asks; ♒ AQUARIUS teaches: ✦ astrologers count your
//   planets by element (a tally on the board, fire empty) · ✦ an empty element doesn't mean broken; some read it as
//   something you learn later, or admire in others · ♥ you can learn any skill, and a partner isn't your missing piece.
//   The Pisces classmate cries happy tears. Last line (Aquarius): "You're not *missing* a piece."
// Engine: ../../nx2e01/scenes/x2kit.js · drawings: ../../nx2e01/scenes/x2draw.js. Pure f(t).
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { signStar } from '../../startalk.js'
import { chalkLine, chalkCircle, chalkText, EX } from '../../stexplain.js'
import { makeEpisode, checkLengths, R } from '../../nx2e01/scenes/x2kit.js'
import { popK, fadeK } from '../../nx2e01/scenes/x2draw.js'

const VIR = signStar('virgo'), AQU = signStar('aquarius')
const TAG = (k, dy = 14) => ({ kind: k, dx: 800, dy, align: 'right' })
const FIRE = '#ff9a6a'
const ELS = [['FIRE', FIRE, 0], ['EARTH', EX.chalkGreen, 4], ['AIR', EX.chalkYellow, 3], ['WATER', EX.chalkBlue, 3]]
const FLAME = ['...Y...', '..YY...', '..YOY..', '.YOOY..', '.YORRY.', 'YORRROY', 'YORRROY', '.YORRY.', '..YYY..']
function flame(x, cx, cy, px, a) {
  if (a <= 0) return
  const C = { Y: '#ffe27a', O: '#ff9a3c', R: '#ff5d4a' }
  x.save(); x.globalAlpha *= a
  FLAME.forEach((row, j) => [...row].forEach((ch, i) => { if (C[ch]) R(x, C[ch], cx + (i - 3.5) * px, cy + (j - 4.5) * px, px + 0.5, px + 0.5) }))
  x.restore()
}

const CFG = {
  id: 'nx2e12', duration: 50, key: 'Ab',
  q: 'What if my chart has *no* fire?', qAccent: FIRE,
  teacher: { tag: '♒ AQUARIUS', color: AQU.color, glyph: AQU.glyph, pitch: 698 },
  student: { tag: '♍ VIRGO', color: VIR.color, glyph: VIR.glyph, pitch: 587 },
  boardTitle: 'THE ELEMENT COUNT',
  beats: [
    { // ✦ count by element; empty isn't broken
      lines: [
        ['student', 'i counted. my chart has *zero* fire.'],
        ['teacher', 'astrologers count your planets by *element.*', { tag: TAG('astro'), point: [400, 260] }],
        ['teacher', 'an empty element doesn’t mean *broken.*', { point: [130, 300] }],
      ],
      draw(x, t, B, b) {
        const a = b.lines[1].t, base = B.y0 + 360
        chalkLine(x, t, { pts: [[B.x0 + 30, base], [B.x1 - 30, base]], at: a, dur: 0.4, width: 4 })
        ELS.forEach(([n, col, v], i) => {
          const X = B.x0 + 130 + i * 180
          const h = 52 * v * ease.outCubic(prog(t, a + 0.6 + i * 0.25, a + 1.2 + i * 0.25))
          if (v > 0 && h > 0) { x.save(); x.globalAlpha *= 0.85; x.fillStyle = col; x.fillRect(X - 40, base - h, 80, h); x.restore() }
          if (v === 0) chalkLine(x, t, { pts: [[X - 40, base], [X - 40, base - 60], [X + 40, base - 60], [X + 40, base]], at: b.lines[2].t + 0.3, dur: 0.5, color: FIRE, width: 4, dash: [8, 8] })
        })
      },
      chalk: [
        ...ELS.map(([n, col], i) => ({ dt: 0.3 + i * 0.15, line: 1, text: n, x: 130 + i * 180, y: 405, size: 26, align: 'center', color: col })),
        { dt: 0.9, line: 2, text: '*0*', x: 130, y: 280, size: 40, align: 'center' },
      ],
    },
    { // ✦ learn later, admire in others
      lines: [
        ['teacher', 'some read it as something you *learn* later.', { tag: TAG('astro'), point: [220, 240] }],
        ['teacher', 'or something you *admire* in others.', { point: [580, 240] }],
        ['student', 'that’s why i love loud people at *parties.*'],
      ],
      draw(x, t, B, b) {
        const a = b.lines[0].t, c = b.lines[1].t
        const g = ease.inOutCubic(prog(t, a + 0.4, a + 2.4))
        flame(x, B.x0 + 220, B.y0 + 250 - g * 20, lerp(6, 16, g), popK(t, a + 0.3))
        chalkCircle(x, t, { x: B.x0 + 580, y: B.y0 + 230, r: 90, at: c + 0.3, dur: 0.6, color: EX.chalkYellow, width: 4 })
        flame(x, B.x0 + 580, B.y0 + 230, 12, popK(t, c + 0.8))
      },
      chalk: [{ dt: 1.2, line: 0, text: '*LEARN*', x: 220, y: 400, size: 36, align: 'center' }, { dt: 1.2, line: 1, text: '*ADMIRE*', x: 580, y: 400, size: 36, align: 'center' }],
    },
    { // ♥ learn any skill; whole + whole
      lines: [
        ['teacher', 'you can learn any skill. even *spark.*', { tag: TAG('tip'), point: [250, 240] }],
        ['teacher', 'and a partner isn’t your *missing* piece.', { point: [550, 240] }],
      ],
      draw(x, t, B, b) {
        const c = b.lines[1].t
        chalkCircle(x, t, { x: B.x0 + 250, y: B.y0 + 230, r: 110, at: b.at + 0.4, dur: 0.7, color: EX.chalk, width: 6 })
        chalkCircle(x, t, { x: B.x0 + 550, y: B.y0 + 230, r: 110, at: c + 0.3, dur: 0.7, color: EX.chalkPink, width: 6 })
        chalkText(x, t, { text: '+', x: B.x0 + 400, y: B.y0 + 250, at: c + 1.0, size: 60, align: 'center' })
      },
      chalk: [{ dt: 0.6, text: 'WHOLE', x: 250, y: 245, size: 34, align: 'center' }, { dt: 0.8, line: 1, text: 'WHOLE', x: 550, y: 245, size: 34, align: 'center', color: EX.chalkPink }],
    },
  ],
  bulb: 'so i’m not missing fire. i’m *learning* it.',
  items: ['Count planets by *element*', 'Empty doesn’t mean *broken*', 'Skills can be *learned*'],
  last: 'You’re not *missing* a piece.', lastWho: 'teacher',
}
const bad = checkLengths(CFG)
if (bad.length) throw new Error('nx2e12: too long: ' + bad.join(' | '))
const EP = makeEpisode(CFG)
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
void clamp; void fadeK
