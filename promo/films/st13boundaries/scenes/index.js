// st13boundaries (45 s vertical Align ad, Star Talk season 13 "Star Talk Explains", S13 E19) · story 0–40.6, then the end card.
//   ❓ "What's a *boundary*, really?" ♎ LIBRA (the student) asks; ♑ CAPRICORN teaches at the chalkboard (all ♥):
//   a boundary is what *you* will do, not a rule for someone else · the example: "If you yell, I'll step out and we can
//   talk later." (the board draws a door) · saying it kindly and clearly is a gift to both of you.
//   Lightbulb ("I can't control them. I *can* step out."), THE SHORT VERSION, and the last line (Capricorn):
//   "Boundaries are *doors*, not walls."
// The engine is ./explainkit.js (this folder's copy); the season look is ../../stexplain.js. Pure f(t).
import { signStar } from '../../startalk.js'
import { chalkLine, chalkText, EX } from '../../stexplain.js'
import { makeEpisode } from './explainkit.js'

const CAP = signStar('capricorn'), LIBRA = signStar('libra')
const GREY = '#bdb6a6'

// a chalk door (frame, panel, knob), (cx, by) = bottom centre; open 0…1 swings the panel
function door(x, t, cx, by, w, h, at, open = 0) {
  chalkLine(x, t, { pts: [[cx - w / 2, by], [cx - w / 2, by - h], [cx + w / 2, by - h], [cx + w / 2, by]], at, dur: 0.6, width: 6 })
  const pw = w * (1 - 0.7 * open)
  chalkLine(x, t, { pts: [[cx - w / 2, by], [cx - w / 2 + pw, by - 10 * open], [cx - w / 2 + pw, by - h + 10 * open], [cx - w / 2, by - h]], at: at + 0.5, dur: 0.5, width: 4, color: EX.chalkYellow })
  chalkLine(x, t, { pts: [[cx - w / 2 + pw - 22, by - h / 2], [cx - w / 2 + pw - 14, by - h / 2]], at: at + 1.0, dur: 0.1, width: 10, color: EX.chalkYellow })
}

const EP = makeEpisode({
  id: 'st13boundaries', numeral: 'S13 E19', duration: 45, key: 'Eb',
  q: 'What\'s a *boundary*, really?', qAccent: '#8ff0cf',
  teacher: { tag: '♑ CAPRICORN', color: CAP.color, glyph: CAP.glyph, accent: '#8ff0cf', pitch: 392 },
  student: { tag: '♎ LIBRA', color: LIBRA.color, glyph: LIBRA.glyph, accent: '#ffa8f2', pitch: 740 },
  boardTitle: 'BOUNDARIES',
  beats: [
    { // ♥ what you will do vs a rule for them
      lines: [
        ['student', 'so a boundary is a *rule* for other people?'],
        ['teacher', 'nope. a boundary is what *you* will do.', { tag: { kind: 'tip', dx: 800, dy: 14, align: 'right' }, point: [600, 200] }],
        ['teacher', 'a rule tries to control *them.*', { point: [200, 200] }],
      ],
      chalk: [
        { dt: 0.6, line: 0, text: 'RULE', x: 200, y: 100, size: 48, align: 'center', color: GREY },
        { dt: 1.4, line: 0, text: '"you can\'t|yell at me."', x: 200, y: 200, size: 34, align: 'center', color: GREY },
        { dt: 0.6, line: 1, text: '*BOUNDARY*', x: 600, y: 100, size: 48, align: 'center', accent: EX.chalkGreen },
        { dt: 1.3, line: 1, text: '"if you yell,|*I\'ll* step out."', x: 600, y: 200, size: 34, align: 'center' },
      ],
      draw(x, t, B, b) {
        const a = b.lines[2].t
        chalkLine(x, t, { pts: [[B.x0 + 400, B.y0 + 70], [B.x0 + 400, B.y0 + 400]], at: b.lines[1].t, dur: 0.4, width: 3 })
        chalkLine(x, t, { pts: [[B.x0 + 70, B.y0 + 330], [B.x0 + 330, B.y0 + 330]], at: a + 0.6, dur: 0.3, color: EX.red, width: 6 })
        chalkText(x, t, { text: 'controls THEM', x: B.x0 + 200, y: B.y0 + 380, at: a + 0.9, size: 26, align: 'center', color: EX.chalkPink })
        chalkText(x, t, { text: 'what YOU do', x: B.x0 + 600, y: B.y0 + 380, at: a + 1.4, size: 26, align: 'center', color: EX.chalkGreen })
      },
    },
    { // ♥ the example, as a door
      lines: [
        ['teacher', '"if you yell, I\'ll *step out*..."', { tag: { kind: 'tip', dx: 800, dy: 14, align: 'right' }, point: [200, 250] }],
        ['teacher', '"...and we can talk *later.*"', { point: [560, 250] }],
      ],
      draw(x, t, B, b) {
        const a = b.lines[0].t, a2 = b.lines[1].t
        door(x, t, B.x0 + 200, B.y0 + 410, 170, 290, a + 0.2, Math.min(1, Math.max(0, (t - a - 1.4) / 0.6)))
        chalkText(x, t, { text: 'STEP OUT', x: B.x0 + 200, y: B.y0 + 90, at: a + 1.4, size: 30, align: 'center', color: EX.chalkYellow })
        chalkLine(x, t, { pts: [[B.x0 + 330, B.y0 + 260], [B.x0 + 450, B.y0 + 260]], at: a2 + 0.2, dur: 0.4, width: 5, arrow: true })
        chalkText(x, t, { text: 'TALK|*LATER*', x: B.x0 + 600, y: B.y0 + 230, at: a2 + 0.6, size: 48, align: 'center', accent: EX.chalkGreen })
      },
    },
    { // ♥ kind + clear = a gift
      lines: [
        ['student', 'but won\'t saying it make it *awkward?*'],
        ['teacher', 'said kindly and clearly, it\'s a *gift.*', { tag: { kind: 'tip', dx: 800, dy: 14, align: 'right' }, point: [560, 230] }],
        ['teacher', 'for both of you. no *guessing* games.', { point: [560, 230] }],
      ],
      draw(x, t, B, b) {
        const a = b.lines[1].t, a2 = b.lines[2].t
        chalkText(x, t, { text: '*KIND*', x: B.x0 + 30, y: B.y0 + 140, at: a + 0.4, size: 52, accent: EX.chalkPink })
        chalkText(x, t, { text: '+ *CLEAR*', x: B.x0 + 30, y: B.y0 + 230, at: a + 0.9, size: 52, accent: EX.chalkBlue })
        // a chalk gift box with a bow
        const cx = B.x0 + 580, cy = B.y0 + 250
        chalkLine(x, t, { pts: [[cx - 110, cy - 50], [cx + 110, cy - 50], [cx + 110, cy + 110], [cx - 110, cy + 110], [cx - 110, cy - 50]], at: a + 1.3, dur: 0.6, width: 5 })
        chalkLine(x, t, { pts: [[cx, cy - 50], [cx, cy + 110]], at: a + 1.8, dur: 0.3, width: 5, color: EX.chalkPink })
        chalkLine(x, t, { pts: [[cx, cy - 50], [cx - 60, cy - 100], [cx - 40, cy - 50], [cx, cy - 50], [cx + 40, cy - 50], [cx + 60, cy - 100], [cx, cy - 50]], at: a + 2.0, dur: 0.5, width: 5, color: EX.chalkPink })
        chalkText(x, t, { text: 'NO GUESSING', x: B.x0 + 30, y: B.y0 + 350, at: a2 + 0.9, size: 32, color: EX.chalkYellow })
      },
    },
  ],
  bulb: 'oh! I can\'t control them. I *can* step out.',
  items: ['About what *you* will do', 'Not a rule for *them*', 'Kind + clear = a *gift*'],
  last: 'Boundaries are *doors*, not walls.', lastWho: 'teacher',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
