// st13attachment (60 s vertical Align ad, Star Talk season 13 "Star Talk Explains", S13 E17) · story 0–55.6, then the end card.
//   ❓ "What's an *attachment style*?" ♒ AQUARIUS (the student) asks; ♋ CANCER teaches at the chalkboard (all ♥):
//   a psychology idea about how people seek closeness and safety · the usual names: secure, anxious, avoidant, and a mix
//   of anxious and avoidant · gag: Aquarius starts labelling everyone (the ex, the cat) → it's a pattern, not a diagnosis,
//   and never a label for a whole person ("*especially* not your cat") · styles can shift in safe, steady bonds.
//   Lightbulb, THE SHORT VERSION, and the last line (Cancer): "Styles can *grow*."
// The engine is ./explainkit.js (this folder's copy); props.js is stmeetfriends2's, unchanged; the season look is ../../stexplain.js. Pure f(t).
import { clamp, prog } from '../../../src/lib.js'
import { signStar } from '../../startalk.js'
import { chalkLine, chalkCircle, chalkText, EX } from '../../stexplain.js'
import { makeEpisode, R } from './explainkit.js'
import { auntie } from './props.js'

const CANCER = signStar('cancer'), AQUA = signStar('aquarius')

// a tiny chalk star (5 points), centred on (cx, cy)
function chalkStar(x, t, cx, cy, r, at, color = EX.chalk) {
  const pts = []
  for (let i = 0; i <= 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * 0.45 : r; pts.push([cx + Math.cos(a) * rr, cy + Math.sin(a) * rr]) }
  chalkLine(x, t, { pts, at, dur: 0.5, color, width: 4 })
}
function chalkHeart(x, t, cx, cy, s, at, color = EX.chalkPink) {
  const pts = []
  for (let i = 0; i <= 24; i++) { const a = i / 24 * Math.PI * 2; pts.push([cx + s * 16 * Math.sin(a) ** 3 / 16, cy - s * (13 * Math.cos(a) - 5 * Math.cos(2 * a) - 2 * Math.cos(3 * a) - Math.cos(4 * a)) / 16]) }
  chalkLine(x, t, { pts, at, dur: 0.6, color, width: 5 })
}

const EP = makeEpisode({
  id: 'st13attachment', numeral: 'S13 E17', duration: 60, key: 'D',
  q: 'What\'s an *attachment style*?', qAccent: '#8fdcff',
  teacher: { tag: '♋ CANCER', color: CANCER.color, glyph: CANCER.glyph, accent: '#8fdcff', pitch: 440,     // the teacher's reading glasses + bead chain
    draw: (ctx, X, Y, s, t, o) => auntie(ctx, X, Y, s, t, { color: CANCER.color, glyph: CANCER.glyph, glasses: { chain: true }, ...o }) },
  student: { tag: '♒ AQUARIUS', color: AQUA.color, glyph: AQUA.glyph, accent: '#9ff0ff', pitch: 760 },
  boardTitle: 'ATTACHMENT STYLES',
  beats: [
    { // ♥ closeness and safety
      lines: [
        ['student', 'what\'s an *attachment style?* asking for me.'],
        ['teacher', 'a psychology idea about how we seek *closeness*', { tag: { kind: 'tip', dx: 800, dy: 14, align: 'right' }, point: [400, 200] }],
        ['teacher', '...and how we look for *safety* with people.', { point: [400, 200] }],
      ],
      draw(x, t, B, b) {
        const a = b.lines[1].t, a2 = b.lines[2].t
        chalkStar(x, t, B.x0 + 200, B.y0 + 200, 70, a)
        chalkStar(x, t, B.x0 + 600, B.y0 + 200, 70, a + 0.3)
        chalkLine(x, t, { pts: [[B.x0 + 290, B.y0 + 200], [B.x0 + 360, B.y0 + 200]], at: a + 0.8, dur: 0.3, width: 4, arrow: true })
        chalkLine(x, t, { pts: [[B.x0 + 510, B.y0 + 200], [B.x0 + 440, B.y0 + 200]], at: a + 0.9, dur: 0.3, width: 4, arrow: true })
        chalkHeart(x, t, B.x0 + 400, B.y0 + 200, 34, a + 1.2)
        chalkText(x, t, { text: '*CLOSENESS*', x: B.x0 + 230, y: B.y0 + 350, at: a + 1.0, size: 38, align: 'center' })
        chalkText(x, t, { text: '+ *SAFETY*', x: B.x0 + 590, y: B.y0 + 350, at: a2 + 0.6, size: 38, align: 'center', accent: EX.chalkBlue })
      },
    },
    { // ♥ the usual names
      lines: [
        ['teacher', 'the usual names: *secure,* anxious, avoidant,', { tag: { kind: 'tip', dx: 800, dy: 14, align: 'right' }, point: [200, 160] }],
        ['teacher', 'and a *mix* of anxious and avoidant.', { point: [600, 300] }],
      ],
      draw(x, t, B, b) {
        const a = b.lines[0].t, a2 = b.lines[1].t
        const cx = B.x0 + 400, cy = B.y0 + 240
        chalkLine(x, t, { pts: [[cx, cy - 150], [cx, cy + 170]], at: a, dur: 0.4, width: 4 })
        chalkLine(x, t, { pts: [[B.x0 + 20, cy + 10], [B.x1 - 20, cy + 10]], at: a + 0.3, dur: 0.4, width: 4 })
        chalkText(x, t, { text: '*SECURE*', x: cx - 200, y: cy - 70, at: a + 0.6, size: 40, align: 'center', accent: EX.chalkGreen })
        chalkText(x, t, { text: 'ANXIOUS', x: cx + 200, y: cy - 70, at: a + 1.1, size: 40, align: 'center' })
        chalkText(x, t, { text: 'AVOIDANT', x: cx - 200, y: cy + 90, at: a + 1.5, size: 40, align: 'center' })
        chalkText(x, t, { text: 'A *MIX*|(anx + avoid)', x: cx + 200, y: cy + 70, at: a2 + 0.3, size: 34, align: 'center', accent: EX.chalkPink })
      },
    },
    { // ♥ gag + pattern, not a label
      lines: [
        ['student', 'ooh. my ex? avoidant. my cat? *anxious.*'],
        ['teacher', 'careful! it\'s a *pattern,* not a diagnosis.', { tag: { kind: 'tip', dx: 800, dy: 14, align: 'right' }, point: [400, 230] }],
        ['teacher', 'and never a *label* for a whole person.', { point: [400, 230] }],
        ['student', 'not even for my *cat?*'],
        ['teacher', '*especially* not your cat.', { point: [640, 300] }],
      ],
      draw(x, t, B, b) {
        const a0 = b.lines[0].t, a = b.lines[1].t, a2 = b.lines[2].t, a4 = b.lines[4].t
        // Aquarius' name tags, scribbled on, then struck through
        const tagBox = (cx, cy, txt, at) => {
          chalkLine(x, t, { pts: [[cx - 150, cy - 50], [cx + 150, cy - 50], [cx + 150, cy + 50], [cx - 150, cy + 50], [cx - 150, cy - 50]], at, dur: 0.5, width: 4 })
          chalkText(x, t, { text: 'HELLO, I AM', x: cx, y: cy - 22, at: at + 0.3, size: 22, align: 'center', cps: 40, color: '#bdb6a6' })
          chalkText(x, t, { text: txt, x: cx, y: cy + 18, at: at + 0.5, size: 34, align: 'center' })
          chalkLine(x, t, { pts: [[cx - 170, cy + 40], [cx + 170, cy - 40]], at: a2 + 0.5, dur: 0.25, color: EX.red, width: 7 })
        }
        tagBox(B.x0 + 200, B.y0 + 140, 'AVOIDANT', a0 + 0.4)
        tagBox(B.x0 + 600, B.y0 + 140, 'ANXIOUS', a0 + 1.2)
        // a cat doodle under the second tag
        const cx = B.x0 + 600, cy = B.y0 + 310
        chalkCircle(x, t, { x: cx, y: cy, r: 40, at: a0 + 1.8, dur: 0.4, width: 4 })
        chalkLine(x, t, { pts: [[cx - 34, cy - 20], [cx - 30, cy - 62], [cx - 8, cy - 40]], at: a0 + 2.1, dur: 0.2, width: 4 })
        chalkLine(x, t, { pts: [[cx + 8, cy - 40], [cx + 30, cy - 62], [cx + 34, cy - 20]], at: a0 + 2.2, dur: 0.2, width: 4 })
        const k = clamp(prog(t, a0 + 2.4, a0 + 2.5)); if (k > 0) { R(x, EX.chalk, cx - 16, cy - 6, 7, 7); R(x, EX.chalk, cx + 9, cy - 6, 7, 7) }
        chalkHeart(x, t, cx + 100, cy - 20, 24, a4 + 0.6)
        chalkText(x, t, { text: 'A *PATTERN*', x: B.x0 + 200, y: B.y0 + 300, at: a + 0.6, size: 40, align: 'center' })
        chalkText(x, t, { text: 'NOT A LABEL', x: B.x0 + 200, y: B.y0 + 360, at: a2 + 0.7, size: 30, align: 'center', color: '#bdb6a6' })
      },
    },
    { // ♥ styles can shift
      lines: [
        ['teacher', 'and styles can *shift* in safe, steady bonds.', { tag: { kind: 'tip', dx: 800, dy: 14, align: 'right' }, point: [500, 220] }],
      ],
      draw(x, t, B, b) {
        const a = b.lines[0].t
        const pts = []
        for (let i = 0; i <= 40; i++) { const u = i / 40, amp = 70 * (1 - u) ** 1.5; pts.push([B.x0 + 40 + u * 700, B.y0 + 260 - u * 120 + Math.sin(u * 26) * amp]) }
        chalkLine(x, t, { pts, at: a + 0.2, dur: 1.4, width: 5, arrow: true, color: EX.chalkBlue })
        chalkText(x, t, { text: 'WOBBLY', x: B.x0 + 40, y: B.y0 + 390, at: a + 0.4, size: 30, color: '#bdb6a6' })
        chalkText(x, t, { text: '*STEADIER*', x: B.x1 - 20, y: B.y0 + 70, at: a + 1.6, size: 40, align: 'right', accent: EX.chalkGreen })
      },
    },
  ],
  bulb: 'oh! a pattern I learned, not who I *am.*',
  items: ['How we seek *closeness*', 'A *pattern*, not a label', 'Styles can *shift*'],
  last: 'Styles can *grow*.', lastWho: 'teacher',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
