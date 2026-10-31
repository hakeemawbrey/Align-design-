// st13birthchart (30 s vertical Align ad, Star Talk season 13 "Star Talk Explains", S13 E16) · story 0–25.6, then the end card.
//   ❓ "What *is* a birth chart?" ♓ PISCES (the student) asks; THE STARS teach at the chalkboard:
//   ✓ a map of where the Sun, Moon and planets were, seen from where you were born, at the minute you were born ·
//   ✦ astrologers read it like a story, not a sentence. Lightbulb ("my baby photo... of the sky!"), THE SHORT VERSION,
//   and the last line (the Stars): "Your *first* sky."
// The engine is ./explainkit.js (this folder's copy); the season look is ../../stexplain.js. Pure f(t).
import { clamp, prog } from '../../../src/lib.js'
import { signStar, STAR } from '../../startalk.js'
import { chalkLine, chalkCircle, chalkText, EX } from '../../stexplain.js'
import { makeEpisode, R, INK } from './explainkit.js'

const PISCES = signStar('pisces')

// the chart wheel: a ring, twelve spokes, then the bodies dropping onto it (☉ ☽ and planet dots)
function wheel(x, t, cx, cy, r, at) {
  chalkCircle(x, t, { x: cx, y: cy, r, at, dur: 0.6, width: 5 })
  chalkCircle(x, t, { x: cx, y: cy, r: r * 0.62, at: at + 0.3, dur: 0.5, width: 3 })
  for (let i = 0; i < 12; i++) {
    const a = i / 12 * Math.PI * 2 + Math.PI / 12
    chalkLine(x, t, { pts: [[cx + Math.cos(a) * r * 0.62, cy + Math.sin(a) * r * 0.62], [cx + Math.cos(a) * r, cy + Math.sin(a) * r]], at: at + 0.6 + i * 0.04, dur: 0.15, width: 3 })
  }
  const bodies = [[0.3, EX.chalkYellow, 15], [2.1, EX.chalk, 12], [0.9, EX.chalkPink, 8], [3.6, EX.chalkBlue, 8], [4.4, '#ff9a6a', 8], [5.3, EX.chalkGreen, 8], [1.5, EX.chalkYellow, 7]]
  bodies.forEach(([a, c, s], i) => {
    const k = clamp(prog(t, at + 1.3 + i * 0.16, at + 1.5 + i * 0.16))
    if (k <= 0) return
    const rr = r * 0.81
    x.save(); x.globalAlpha *= k; x.shadowColor = c; x.shadowBlur = 12
    R(x, c, cx + Math.cos(a) * rr - s, cy + Math.sin(a) * rr - s, s * 2, s * 2)
    x.restore()
  })
}

const EP = makeEpisode({
  id: 'st13birthchart', numeral: 'S13 E16', duration: 30, key: 'Ab',
  q: 'What *is* a birth chart?', qAccent: '#c9b8ff',
  teacher: { tag: 'THE STARS', color: STAR.sky, pitch: 523 },
  student: { tag: '♓ PISCES', color: PISCES.color, glyph: PISCES.glyph, accent: '#b6b0ff', pitch: 740 },
  boardTitle: 'THE BIRTH CHART',
  beats: [
    { // ✓ the map: where the bodies were, from your birthplace, at your birth minute
      lines: [
        ['student', 'everyone keeps asking for my *birth chart.*'],
        ['teacher', 'a map: where the Sun, Moon and planets *were,*', { tag: { kind: 'sky', dx: 800, dy: 14, align: 'right' }, point: [200, 250] }],
        ['teacher', 'from your birthplace, at your *birth minute.*', { point: [560, 250] }],
      ],
      draw(x, t, B, b) {
        wheel(x, t, B.x0 + 200, B.y0 + 250, 160, b.lines[1].t)
        const a = b.lines[2].t
        // a little pin (where) and a clock (when)
        const px = B.x0 + 440, py = B.y0 + 160
        chalkCircle(x, t, { x: px, y: py, r: 16, at: a, dur: 0.3, color: EX.chalkPink, width: 5 })
        chalkLine(x, t, { pts: [[px - 14, py + 8], [px, py + 40], [px + 14, py + 8]], at: a + 0.3, dur: 0.3, color: EX.chalkPink, width: 5 })
        const cx = B.x0 + 440, cy = B.y0 + 300
        chalkCircle(x, t, { x: cx, y: cy, r: 30, at: a + 1.0, dur: 0.4, color: EX.chalkBlue, width: 5 })
        chalkLine(x, t, { pts: [[cx, cy - 20], [cx, cy], [cx + 14, cy + 6]], at: a + 1.4, dur: 0.3, color: EX.chalkBlue, width: 5 })
        chalkText(x, t, { text: 'WHERE', x: px + 50, y: py + 10, at: a + 0.4, size: 34, color: EX.chalkPink })
        chalkText(x, t, { text: 'WHEN|(the *minute*)', x: cx + 50, y: cy - 6, at: a + 1.5, size: 34, color: EX.chalkBlue })
      },
    },
    { // ✦ in astrology: a story, not a sentence
      lines: [
        ['teacher', 'to astrologers, it\'s a *story,* not a sentence.', { tag: { kind: 'astro', dx: 800, dy: 14, align: 'right' }, point: [400, 200] }],
      ],
      draw(x, t, B, b) {
        const a = b.lines[0].t
        // an open book doodle
        const cx = B.x0 + 400, cy = B.y0 + 180
        chalkLine(x, t, { pts: [[cx, cy - 60], [cx - 150, cy - 80], [cx - 150, cy + 60], [cx, cy + 80], [cx + 150, cy + 60], [cx + 150, cy - 80], [cx, cy - 60], [cx, cy + 80]], at: a + 0.1, dur: 0.9, width: 5 })
        for (let i = 0; i < 3; i++) for (const s of [-1, 1]) chalkLine(x, t, { pts: [[cx + s * 30, cy - 30 + i * 36], [cx + s * 120, cy - 44 + i * 36]], at: a + 0.9 + i * 0.1, dur: 0.2, width: 3 })
        chalkText(x, t, { text: 'A *STORY*', x: cx - 180, y: cy + 160, at: a + 1.2, size: 40, align: 'center' })
        chalkText(x, t, { text: 'A SENTENCE', x: cx + 190, y: cy + 160, at: a + 1.8, size: 34, align: 'center', color: '#bdb6a6' })
        chalkLine(x, t, { pts: [[cx + 80, cy + 170], [cx + 300, cy + 150]], at: a + 2.4, dur: 0.25, color: EX.red, width: 6 })
      },
    },
  ],
  bulb: 'so it\'s my baby photo... of the *sky!*',
  items: ['A sky *map*', 'Your place + *minute*', 'Read as a *story*'],
  last: 'Your *first* sky.', lastWho: 'teacher',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
