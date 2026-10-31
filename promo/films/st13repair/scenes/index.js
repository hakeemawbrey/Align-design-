// st13repair (45 s vertical Align ad, Star Talk season 13 "Star Talk Explains", S13 E18) · story 0–40.6, then the end card.
//   ❓ "How do you *fix* a fight?" ♈ ARIES (the student, who "won") asks; ♎ LIBRA teaches at the chalkboard with the
//   scales (all ♥): fights aren't won, they're repaired · start soft: "I feel…" not "you always" · if it's getting hot,
//   take a real break and agree when you'll come back · repair is small: a joke, a touch, "I hear you".
//   Lightbulb ("I lose the fight and win the *us?*"), THE SHORT VERSION, and the last line (Libra): "Pause. *Then* repair."
// The engine is ./explainkit.js (this folder's copy); the season look is ../../stexplain.js. Pure f(t).
import { clamp, prog } from '../../../src/lib.js'
import { signStar } from '../../startalk.js'
import { chalkLine, chalkCircle, chalkText, EX } from '../../stexplain.js'
import { makeEpisode, R, INK } from './explainkit.js'

const LIBRA = signStar('libra'), ARIES = signStar('aries')

/** Libra's pixel scales on a post, (x, y) = base centre, tilt in rad (+ = right pan down) */
function scales(x, cx, cy, px, tilt) {
  R(x, INK, cx - 6 * px, cy - px, 12 * px, 2 * px); R(x, '#c98a1c', cx - 5 * px, cy - 0.5 * px, 10 * px, px)
  R(x, INK, cx - 1.5 * px, cy - 16 * px, 3 * px, 16 * px); R(x, EX.gold, cx - 0.5 * px, cy - 15.5 * px, px, 15 * px)
  const top = cy - 16 * px, L = 11 * px, ca = Math.cos(tilt), sa = Math.sin(tilt)
  x.save(); x.translate(cx, top); x.rotate(tilt); R(x, INK, -L - px, -1.5 * px, 2 * L + 2 * px, 3 * px); R(x, EX.gold, -L, -0.5 * px, 2 * L, px); x.restore()
  for (const s of [-1, 1]) {
    const ex = cx + s * L * ca, ey = top + s * L * sa
    x.strokeStyle = 'rgba(242,199,92,0.9)'; x.lineWidth = Math.max(2, px * 0.5)
    x.beginPath(); x.moveTo(ex, ey); x.lineTo(ex - 4 * px, ey + 7 * px); x.moveTo(ex, ey); x.lineTo(ex + 4 * px, ey + 7 * px); x.stroke()
    R(x, INK, ex - 5 * px, ey + 7 * px, 10 * px, 2 * px); R(x, EX.gold, ex - 4.5 * px, ey + 7 * px, 9 * px, px)
  }
}

const EP = makeEpisode({
  id: 'st13repair', numeral: 'S13 E18', duration: 45, key: 'Bb',
  q: 'How do you *fix* a fight?', qAccent: '#ffadc6',
  teacher: { tag: '♎ LIBRA', color: LIBRA.color, glyph: LIBRA.glyph, accent: '#ffa8f2', pitch: 466,
    prop: (x, r, t, T) => {                               // the scales, wobbling level as the lesson goes on
      const settle = clamp(prog(t, T.board, T.recap))
      scales(x, r.x - 110, r.y + 92, 6, 0.3 * (1 - settle) * Math.sin(t * 2.2))
    } },
  student: { tag: '♈ ARIES', color: ARIES.color, glyph: ARIES.glyph, accent: '#ffa27a', pitch: 784 },
  boardTitle: 'FIXING A FIGHT',
  beats: [
    { // ♥ fights get repaired, not won
      lines: [
        ['student', 'we fought. I won. why do I feel *worse?*'],
        ['teacher', 'fights aren\'t won. they\'re *repaired.*', { tag: { kind: 'tip', dx: 800, dy: 14, align: 'right' }, point: [400, 220] }],
      ],
      chalk: [{ dt: 0.6, text: 'WIN?', x: 200, y: 200, size: 64, align: 'center', color: '#bdb6a6' }, { dt: 0.5, line: 1, text: '*REPAIR*', x: 580, y: 200, size: 64, align: 'center' }],
      draw(x, t, B, b) {
        const a = b.lines[1].t
        chalkLine(x, t, { pts: [[B.x0 + 90, B.y0 + 240], [B.x0 + 310, B.y0 + 160]], at: a + 0.2, dur: 0.25, color: EX.red, width: 7 })
        chalkLine(x, t, { pts: [[B.x0 + 330, B.y0 + 200], [B.x0 + 430, B.y0 + 200]], at: a + 0.5, dur: 0.3, width: 5, arrow: true })
      },
    },
    { // ♥ start soft
      lines: [
        ['teacher', 'start soft: "I feel..." not "you *always.*"', { tag: { kind: 'tip', dx: 800, dy: 14, align: 'right' }, point: [400, 230] }],
      ],
      chalk: [{ dt: 0.5, text: '"YOU ALWAYS..."', x: 400, y: 140, size: 48, align: 'center', color: '#bdb6a6' }, { dt: 1.6, line: 0, text: '"I *FEEL*..."', x: 400, y: 300, size: 60, align: 'center' }],
      draw(x, t, B, b) {
        const a = b.lines[0].t
        chalkLine(x, t, { pts: [[B.x0 + 170, B.y0 + 145], [B.x0 + 630, B.y0 + 135]], at: a + 1.4, dur: 0.3, color: EX.red, width: 7 })
      },
    },
    { // ♥ take a real break, agree when you'll come back
      lines: [
        ['student', 'and if I\'m already *boiling?*'],
        ['teacher', 'take a real break. agree when you\'ll *return.*', { tag: { kind: 'tip', dx: 800, dy: 14, align: 'right' }, point: [480, 220] }],
      ],
      draw(x, t, B, b) {
        const a0 = b.lines[0].t, a = b.lines[1].t
        // the thermometer, filling while Aries boils, cooling on the break
        const tx = B.x0 + 120, ty0 = B.y0 + 90, ty1 = B.y0 + 340
        chalkLine(x, t, { pts: [[tx - 20, ty1], [tx - 20, ty0], [tx + 20, ty0], [tx + 20, ty1]], at: a0, dur: 0.5, width: 5 })
        chalkCircle(x, t, { x: tx, y: ty1 + 26, r: 34, at: a0 + 0.4, dur: 0.4, width: 5 })
        const heat = clamp(prog(t, a0 + 0.6, a0 + 1.6)) * (1 - 0.7 * clamp(prog(t, a + 0.8, a + 2.2)))
        if (t > a0 + 0.6) {
          const col = heat > 0.6 ? EX.red : EX.chalkPink
          R(x, col, tx - 10, ty1 - heat * (ty1 - ty0 - 20), 20, heat * (ty1 - ty0 - 20) + 20)
          x.fillStyle = col; x.beginPath(); x.arc(tx, ty1 + 26, 22, 0, Math.PI * 2); x.fill()
        }
        chalkText(x, t, { text: '*PAUSE*', x: B.x0 + 250, y: B.y0 + 150, at: a + 0.3, size: 52 })
        chalkLine(x, t, { pts: [[B.x0 + 260, B.y0 + 220], [B.x0 + 480, B.y0 + 220]], at: a + 1.1, dur: 0.4, width: 5, arrow: true })
        chalkText(x, t, { text: 'COME *BACK*', x: B.x0 + 250, y: B.y0 + 300, at: a + 1.5, size: 52, accent: EX.chalkGreen })
      },
    },
    { // ♥ repair is small
      lines: [
        ['teacher', 'then repair is small: a joke, a *touch,*', { tag: { kind: 'tip', dx: 800, dy: 14, align: 'right' }, point: [300, 200] }],
        ['teacher', 'or just three words: "I *hear* you."', { point: [400, 330] }],
      ],
      draw(x, t, B, b) {
        const a = b.lines[0].t, a2 = b.lines[1].t
        chalkText(x, t, { text: 'A *JOKE*', x: B.x0 + 30, y: B.y0 + 110, at: a + 0.8, size: 48 })
        chalkText(x, t, { text: 'A *TOUCH*', x: B.x0 + 30, y: B.y0 + 200, at: a + 1.3, size: 48 })
        chalkText(x, t, { text: '"I *HEAR* YOU."', x: B.x0 + 30, y: B.y0 + 330, at: a2 + 0.8, size: 56, accent: EX.chalkPink })
        // small: a teeny bracket of size
        chalkLine(x, t, { pts: [[B.x1 - 120, B.y0 + 100], [B.x1 - 100, B.y0 + 100], [B.x1 - 100, B.y0 + 340], [B.x1 - 120, B.y0 + 340]], at: a2 + 1.6, dur: 0.4, width: 4 })
        chalkText(x, t, { text: 'small', x: B.x1 - 80, y: B.y0 + 220, at: a2 + 1.9, size: 26, color: EX.chalkYellow })
      },
    },
  ],
  bulb: 'so I lose the fight and win the *us?*',
  items: ['Start *soft*', 'Hot? Take a *real* break', 'Repair is *small*'],
  last: 'Pause. *Then* repair.', lastWho: 'teacher',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
