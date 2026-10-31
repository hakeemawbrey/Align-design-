// st13flags (45 s vertical Align ad, Star Talk season 13 "Star Talk Explains", S13 E20) · story 0–40.6, then the end card.
//   ❓ "Red flag or *green* flag?" ♓ PISCES (the student) asks; ♍ VIRGO teaches at the chalkboard with the clipboard
//   (all ♥): green = consistency, respecting a no, curiosity about you · red = pressure, contempt, secrecy · Pisces asks
//   if a Gemini is a red flag → no sign is a red flag; behavior is. Lightbulb ("I watch what they *do,* not their
//   birthday."), THE SHORT VERSION, and the last line (Virgo): "Flags are *actions*."
// The engine is ./explainkit.js (this folder's copy); props.js is stmeetfriends2's, unchanged; the season look is
// ../../stexplain.js. Pure f(t).
import { clamp, prog } from '../../../src/lib.js'
import { signStar } from '../../startalk.js'
import { chalkLine, chalkCircle, chalkText, EX } from '../../stexplain.js'
import { makeEpisode, R, INK } from './explainkit.js'
import { drawClipboard } from './props.js'

const VIRGO = signStar('virgo'), PISCES = signStar('pisces')
const GREEN = '#5fdc7a', RED = '#ff4f5e'

// a pixel flag on a pole, (x, y) = pole base; wave by t
function flag(x, t, px0, py0, px, col, k) {
  if (k <= 0) return
  x.save(); x.globalAlpha *= k
  const s = px
  R(x, INK, px0 - s, py0 - 30 * s, 3 * s, 30 * s); R(x, '#d9d2c2', px0, py0 - 29 * s, s, 29 * s)
  for (let i = 0; i < 14; i++) {
    const dy = Math.round(Math.sin(t * 6 - i * 0.5) * 1.2) * s
    R(x, INK, px0 + 2 * s + i * s, py0 - 29 * s + dy - s, s + 1, 11 * s)
    R(x, col, px0 + 2 * s + i * s, py0 - 29 * s + dy, s + 1, 9 * s)
  }
  x.restore()
}
function list(x, t, B, dx, items, ats, mark, col) {
  items.forEach((s, i) => {
    chalkText(x, t, { text: mark, x: B.x0 + dx, y: B.y0 + 120 + i * 90, at: ats[i], size: 40, color: col })
    chalkText(x, t, { text: s, x: B.x0 + dx + 50, y: B.y0 + 120 + i * 90, at: ats[i] + 0.1, size: 36 })
  })
}

const EP = makeEpisode({
  id: 'st13flags', numeral: 'S13 E20', duration: 45, key: 'G',
  q: 'Red flag or *green* flag?', qAccent: GREEN,
  teacher: { tag: '♍ VIRGO', color: VIRGO.color, glyph: VIRGO.glyph, accent: '#ff9cc0', pitch: 494,
    prop: (x, r, t, T) => drawClipboard(x, r.x - 112, r.y + 40, 6, { rot: -0.15 + 0.05 * Math.sin(t * 1.7), page: t > T.beats[1].at ? 1 : 0 }) },
  student: { tag: '♓ PISCES', color: PISCES.color, glyph: PISCES.glyph, accent: '#b6b0ff', pitch: 740 },
  boardTitle: 'THE FLAG LIST',
  beats: [
    { // ♥ green
      lines: [
        ['student', 'how do I know if it\'s a *red flag?*'],
        ['teacher', 'check the list. green first: *consistency.*', { tag: { kind: 'tip', dx: 800, dy: 14, align: 'right' }, point: [300, 120] }],
        ['teacher', 'they respect your *no.*', { point: [300, 210] }],
        ['teacher', 'and they\'re *curious* about you.', { point: [300, 300] }],
      ],
      draw(x, t, B, b) {
        flag(x, t, B.x0 + 640, B.y0 + 400, 9, GREEN, clamp(prog(t, b.lines[1].t, b.lines[1].t + 0.3)))
        list(x, t, B, 10, ['CONSISTENT', 'RESPECTS A NO', 'CURIOUS ABOUT YOU'], [b.lines[1].t + 1.0, b.lines[2].t + 0.4, b.lines[3].t + 0.5], '✓', GREEN)
      },
    },
    { // ♥ red
      lines: [
        ['teacher', 'red: *pressure.* contempt. secrecy.', { tag: { kind: 'tip', dx: 800, dy: 14, align: 'right' }, point: [300, 210] }],
      ],
      draw(x, t, B, b) {
        const a = b.lines[0].t
        flag(x, t, B.x0 + 640, B.y0 + 400, 9, RED, clamp(prog(t, a, a + 0.3)))
        list(x, t, B, 10, ['PRESSURE', 'CONTEMPT', 'SECRECY'], [a + 0.3, a + 0.8, a + 1.3], '✕', RED)
      },
    },
    { // ♥ no sign is a red flag; behavior is
      lines: [
        ['student', 'and if they\'re a Gemini? *red flag?*'],
        ['teacher', 'no sign is a red flag. *behavior* is.', { tag: { kind: 'tip', dx: 800, dy: 14, align: 'right' }, point: [600, 230] }],
      ],
      draw(x, t, B, b) {
        const a0 = b.lines[0].t, a = b.lines[1].t
        chalkText(x, t, { text: 'BIRTHDAY', x: B.x0 + 200, y: B.y0 + 200, at: a0 + 0.8, size: 46, align: 'center', color: '#bdb6a6' })
        chalkLine(x, t, { pts: [[B.x0 + 70, B.y0 + 250], [B.x0 + 330, B.y0 + 150]], at: a + 0.5, dur: 0.25, color: EX.red, width: 7 })
        chalkText(x, t, { text: '*BEHAVIOR*', x: B.x0 + 590, y: B.y0 + 200, at: a + 1.0, size: 50, align: 'center', accent: EX.chalkYellow })
        chalkCircle(x, t, { x: B.x0 + 590, y: B.y0 + 200, r: 150, at: a + 1.7, dur: 0.6, color: EX.chalkYellow, width: 4 })
      },
    },
  ],
  bulb: 'so I watch what they *do,* not their birthday.',
  items: ['Green: respects a *no*', 'Red: *pressure*, contempt', 'Signs aren\'t *flags*'],
  last: 'Flags are *actions*.', lastWho: 'teacher',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
