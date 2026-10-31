// st13lovebomb (45 s vertical Align ad, Star Talk season 13 "Star Talk Explains", S13 E21) · story 0–40.6, then the end card.
//   ❓ "What's *love bombing*?" ♌ LEO (the student, dazzled: "soulmate" on day two, nonstop gifts) asks; ♏ SCORPIO teaches
//   at the chalkboard (all ♥): big intensity very fast that later turns into pressure or control has a name, love
//   bombing · big romance isn't the problem, the pace is · real interest is happy to go at your pace.
//   Lightbulb ("if it's real, it's still real *next week.*"), THE SHORT VERSION, and the last line (Scorpio):
//   "Real love can *wait*."
// The engine is ./explainkit.js (this folder's copy); the season look is ../../stexplain.js. Pure f(t).
import { clamp, prog } from '../../../src/lib.js'
import { signStar } from '../../startalk.js'
import { chalkLine, chalkCircle, chalkText, EX } from '../../stexplain.js'
import { makeEpisode, R, INK } from './explainkit.js'

const SCORP = signStar('scorpio'), LEO = signStar('leo')

// a chalk gift box with a bow, (cx, cy) = centre
function gift(x, t, cx, cy, s, at, col = EX.chalkPink) {
  chalkLine(x, t, { pts: [[cx - s, cy - s * 0.7], [cx + s, cy - s * 0.7], [cx + s, cy + s * 0.7], [cx - s, cy + s * 0.7], [cx - s, cy - s * 0.7]], at, dur: 0.3, width: 4 })
  chalkLine(x, t, { pts: [[cx, cy - s * 0.7], [cx, cy + s * 0.7]], at: at + 0.2, dur: 0.15, width: 4, color: col })
  chalkLine(x, t, { pts: [[cx, cy - s * 0.7], [cx - s * 0.5, cy - s * 1.2], [cx, cy - s * 0.7], [cx + s * 0.5, cy - s * 1.2], [cx, cy - s * 0.7]], at: at + 0.3, dur: 0.25, width: 4, color: col })
}
// axes for the graphs: INTENSITY up, TIME across
function axes(x, t, B, at) {
  chalkLine(x, t, { pts: [[B.x0 + 60, B.y0 + 60], [B.x0 + 60, B.y0 + 400], [B.x1 - 20, B.y0 + 400]], at, dur: 0.5, width: 4 })
  chalkText(x, t, { text: 'INTENSITY', x: B.x0 + 80, y: B.y0 + 70, at: at + 0.4, size: 24, color: '#bdb6a6', cps: 40 })
  chalkText(x, t, { text: 'TIME', x: B.x1 - 20, y: B.y0 + 430, at: at + 0.6, size: 24, color: '#bdb6a6', align: 'right', cps: 40 })
}

const EP = makeEpisode({
  id: 'st13lovebomb', numeral: 'S13 E21', duration: 45, key: 'C#',
  q: 'What\'s *love bombing*?', qAccent: '#ff7a9a',
  teacher: { tag: '♏ SCORPIO', color: SCORP.color, glyph: SCORP.glyph, accent: '#ff8aa6', pitch: 370 },
  student: { tag: '♌ LEO', color: LEO.color, glyph: LEO.glyph, accent: '#ffc070', pitch: 698 },
  boardTitle: 'LOVE BOMBING',
  beats: [
    { // the setup: Leo's day two (no claim yet, so no tag)
      lines: [
        ['student', 'day two and they called me their *soulmate.*'],
        ['student', 'plus gifts. *nonstop.* I\'m a little dazzled.'],
      ],
      draw(x, t, B, b) {
        const a = b.lines[0].t, a2 = b.lines[1].t
        chalkText(x, t, { text: 'DAY 1: "hi!"', x: B.x0 + 20, y: B.y0 + 110, at: a + 0.3, size: 40 })
        chalkText(x, t, { text: 'DAY 2: "*SOULMATE*"', x: B.x0 + 20, y: B.y0 + 190, at: a + 1.0, size: 40, accent: EX.chalkPink })
        for (let i = 0; i < 5; i++) gift(x, t, B.x0 + 90 + i * 150, B.y0 + 330 - (i % 2) * 18, 44, a2 + 0.6 + i * 0.25)
      },
    },
    { // ♥ the pattern
      lines: [
        ['teacher', 'when huge intensity comes very *fast,*', { tag: { kind: 'tip', dx: 800, dy: 14, align: 'right' }, point: [200, 150] }],
        ['teacher', 'and later turns into *pressure* or control,', { point: [500, 250] }],
        ['teacher', 'that pattern is called *love bombing.*', { point: [400, 200] }],
      ],
      draw(x, t, B, b) {
        const a = b.lines[0].t, a2 = b.lines[1].t
        axes(x, t, B, a)
        chalkLine(x, t, { pts: [[B.x0 + 60, B.y0 + 390], [B.x0 + 140, B.y0 + 300], [B.x0 + 200, B.y0 + 110]], at: a + 0.6, dur: 0.6, width: 6, color: EX.chalkPink })
        chalkText(x, t, { text: 'TOO *FAST*', x: B.x0 + 230, y: B.y0 + 130, at: a + 1.2, size: 36, accent: EX.chalkPink })
        // then the line turns into a chain of links
        chalkLine(x, t, { pts: [[B.x0 + 200, B.y0 + 110], [B.x0 + 330, B.y0 + 250]], at: a2 + 0.2, dur: 0.4, width: 6, color: EX.chalkPink })
        for (let i = 0; i < 5; i++) chalkCircle(x, t, { x: B.x0 + 370 + i * 44, y: B.y0 + 268, r: 20, at: a2 + 0.6 + i * 0.12, dur: 0.2, width: 4, color: EX.red })
        chalkText(x, t, { text: 'PRESSURE|CONTROL', x: B.x0 + 590, y: B.y0 + 330, at: a2 + 1.3, size: 30, color: EX.red, align: 'left' })
      },
    },
    { // ♥ real interest goes at your pace
      lines: [
        ['student', 'so all big romance is *bad?*'],
        ['teacher', 'no! just notice the *pace.*', { point: [400, 260] }],
        ['teacher', 'real interest is happy to go at *your* pace.', { tag: { kind: 'tip', dx: 800, dy: 14, align: 'right' }, point: [500, 220] }],
      ],
      draw(x, t, B, b) {
        const a = b.lines[1].t, a2 = b.lines[2].t
        axes(x, t, B, b.lines[0].t + 0.3)
        const pts = []
        for (let i = 0; i <= 30; i++) { const u = i / 30; pts.push([B.x0 + 60 + u * 680, B.y0 + 390 - 260 * (u * u * (3 - 2 * u))]) }
        chalkLine(x, t, { pts, at: a2 + 0.2, dur: 1.4, width: 6, color: EX.chalkGreen })
        chalkText(x, t, { text: '*YOUR* PACE', x: B.x0 + 420, y: B.y0 + 330, at: a2 + 1.4, size: 40, accent: EX.chalkGreen })
        chalkText(x, t, { text: 'NOTICE THE *PACE*', x: B.x0 + 90, y: B.y0 + 130, at: a + 0.6, size: 34, accent: EX.chalkYellow })
      },
    },
  ],
  bulb: 'if it\'s real, it\'s still real *next week.*',
  items: ['Too much, too *fast*', 'Later: *pressure*', 'Real interest *waits*'],
  last: 'Real love can *wait*.', lastWho: 'teacher',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
