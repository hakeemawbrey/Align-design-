// nx2e08 (50 s vertical, "Star Talk Explains, Volume 2", episode 8) · story 0–45.6, then the shared end card.
//   ❓ "Why isn't there an eclipse *every month*?"  ♒ AQUARIUS asks; ♄ SATURN teaches: ✓ the Moon's path is tilted about
//   5° to Earth's, so most new and full moons pass above or below · ✓ eclipses happen only near the two crossings (the
//   nodes), which face the Sun about twice a year (Aquarius: "a tilted hula hoop") · ✦ astrologers read eclipses as rare
//   plot twists · ♥ most of love happens in ordinary months. The Pisces classmate cries happy tears.
//   Last line (Saturn): "Love lives in the *ordinary*."
// Engine: ../../nx2e01/scenes/x2kit.js · drawings: ../../nx2e01/scenes/x2draw.js. Pure f(t).
import { prog } from '../../../src/lib.js'
import { signStar } from '../../startalk.js'
import { chalkLine, chalkCircle, EX } from '../../stexplain.js'
import { SATURN, drawSaturn } from '../../st5cast.js'
import { makeEpisode, checkLengths } from '../../nx2e01/scenes/x2kit.js'
import { sunChalk, earthChalk, moonPhase, disc, pixHeart, popK, fadeK } from '../../nx2e01/scenes/x2draw.js'

const AQU = signStar('aquarius')
const TAG = (k, dy = 14) => ({ kind: k, dx: 800, dy, align: 'right' })
const SATMOOD = { sparkle: 'happy', heart: 'happy', wink: 'happy' }

/** an ellipse that draws on (sampled into a chalk polyline) */
function ellipse(x, t, cx, cy, rx, ry, rot, at, color, width = 4) {
  const pts = Array.from({ length: 49 }, (_, i) => { const a = i / 48 * Math.PI * 2; const ex = Math.cos(a) * rx, ey = Math.sin(a) * ry; return [cx + ex * Math.cos(rot) - ey * Math.sin(rot), cy + ex * Math.sin(rot) + ey * Math.cos(rot)] })
  chalkLine(x, t, { pts, at, dur: 0.8, color, width })
}

const CFG = {
  id: 'nx2e08', duration: 50, key: 'F#m',
  q: 'Why isn’t there an eclipse *every month?*', qAccent: EX.chalkYellow,
  teacher: { tag: SATURN.tag, color: SATURN.tagColor, pitch: 440,
    draw: (ctx, X, Y, s, t, o) => { const r = drawSaturn(ctx, X, Y - 24, s * 1.15, t, { ...o, mood: SATMOOD[o.mood] || o.mood, pointer: false }); return { ...r, size: s } } },
  student: { tag: '♒ AQUARIUS', color: AQU.color, glyph: AQU.glyph, pitch: 698 },
  boardTitle: 'ECLIPSE MATH',
  beats: [
    { // ✓ a tilted path: above or below
      lines: [
        ['student', 'new moon every month… so why no *eclipse?*'],
        ['teacher', 'the Moon’s path is *tilted* about 5 degrees.', { tag: TAG('sky'), point: [500, 220] }],
        ['teacher', 'so most months it passes *above or below.*', { point: [300, 160] }],
      ],
      draw(x, t, B, b) {
        const a = b.lines[1].t, cx = B.x0 + 480, cy = B.y0 + 240
        sunChalk(x, B.x0 + 80, cy, 46, t, popK(t, a - 0.1))
        chalkLine(x, t, { pts: [[B.x0 + 150, cy], [B.x1 - 20, cy]], at: a, dur: 0.6, width: 4, dash: [10, 10] })
        earthChalk(x, cx, cy, 30, popK(t, a + 0.2))
        chalkLine(x, t, { pts: [[cx - 260, cy - 70], [cx + 260, cy + 70]], at: a + 0.6, dur: 0.6, color: EX.chalkPink, width: 5 })
        const s = b.lines[2].t
        moonPhase(x, cx - 200, cy - 54, 22, 0.02, popK(t, s + 0.3))   // a new moon, passing above
        moonPhase(x, cx + 200, cy + 54, 22, 0.5, popK(t, s + 0.8))    // a full moon, passing below
        chalkLine(x, t, { pts: [[cx - 200, cy - 20], [cx - 200, cy - 2]], at: s + 0.5, dur: 0.2, color: EX.chalkYellow, width: 3, arrow: true })
      },
      chalk: [{ dt: 1.3, line: 1, text: '*~5°*', x: 760, y: 360, size: 40, align: 'right' }, { dt: 1.0, line: 2, text: 'MISS!', x: 280, y: 100, size: 30, align: 'center', color: EX.chalkBlue }],
    },
    { // ✓ the crossings (nodes), twice a year
      lines: [
        ['teacher', 'it only lines up where the paths *cross.*', { tag: TAG('sky'), point: [180, 240] }],
        ['teacher', 'the crossings face the Sun about *twice a year.*', { point: [620, 240] }],
        ['student', 'so it’s a tilted *hula hoop.* got it.'],
      ],
      draw(x, t, B, b) {
        const a = b.lines[0].t, cx = B.x0 + 400, cy = B.y0 + 240
        ellipse(x, t, cx, cy, 300, 80, 0, a - 0.1, EX.chalk, 4)
        ellipse(x, t, cx, cy, 300, 80, 0.22, a + 0.4, EX.chalkPink, 5)
        earthChalk(x, cx, cy, 26, popK(t, a))
        // the two nodes, blinking
        for (const s of [-1, 1]) {
          const k = popK(t, a + 1.3 + (s > 0 ? 0.2 : 0))
          if (k <= 0) continue
          const X = cx + s * 296, Y = cy + s * 8
          x.save(); x.globalAlpha *= 0.7 + 0.3 * Math.sin(t * 6)
          chalkLine(x, t, { pts: [[X - 16, Y - 16], [X + 16, Y + 16]], at: a + 1.3, dur: 0.15, color: EX.chalkYellow, width: 6 })
          chalkLine(x, t, { pts: [[X + 16, Y - 16], [X - 16, Y + 16]], at: a + 1.45, dur: 0.15, color: EX.chalkYellow, width: 6 })
          x.restore()
        }
        const h = b.lines[2].t
        disc(x, cx, cy, 0, EX.chalk, 0)
        void h
      },
      chalk: [{ dt: 1.6, line: 0, text: 'NODE', x: 100, y: 330, size: 28, align: 'center' }, { dt: 1.8, line: 0, text: 'NODE', x: 700, y: 330, size: 28, align: 'center' }, { dt: 1.0, line: 1, text: '*2×* A YEAR', x: 400, y: 410, size: 36, align: 'center' }],
    },
    { // ✦ rare plot twists · ♥ ordinary months
      lines: [
        ['teacher', 'astrologers read eclipses as rare *plot twists.*', { tag: TAG('astro'), point: [400, 180] }],
        ['teacher', 'and most of love happens in *ordinary* months.', { tag: TAG('tip', 84), point: [400, 300] }],
      ],
      draw(x, t, B, b) {
        const a = b.lines[0].t, c = b.lines[1].t
        for (let i = 0; i < 12; i++) {
          const X = B.x0 + 70 + (i % 6) * 132, Y = B.y0 + 190 + Math.floor(i / 6) * 130
          const twist = i === 4 || i === 10
          chalkCircle(x, t, { x: X, y: Y, r: 42, at: a + 0.3 + i * 0.07, dur: 0.3, color: twist ? EX.chalkYellow : EX.chalk, width: twist ? 6 : 3 })
          if (twist) chalkLine(x, t, { pts: [[X - 22, Y + 8], [X - 4, Y - 16], [X + 6, Y + 14], [X + 22, Y - 10]], at: a + 1.4, dur: 0.4, color: EX.chalkYellow, width: 5 })
          else pixHeart(x, X, Y, 5, popK(t, c + 0.5 + i * 0.09, 0.3))
        }
      },
      chalk: [{ dt: 1.5, line: 0, text: '12 MONTHS', x: 20, y: 80, size: 30 }],
    },
  ],
  bulb: 'so: twists are rare. *ordinary* is love.',
  items: ['The Moon’s path is *tilted*', 'Eclipses need a *crossing*', 'Ordinary months *count*'],
  last: 'Love lives in the *ordinary*.', lastWho: 'teacher',
}
const bad = checkLengths(CFG)
if (bad.length) throw new Error('nx2e08: too long: ' + bad.join(' | '))
const EP = makeEpisode(CFG)
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
void prog; void fadeK
