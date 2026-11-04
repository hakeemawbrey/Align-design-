// nx2e14 (60 s vertical, "Star Talk Explains, Volume 2", episode 14) · story 0–55.6, then the shared end card.
//   ❓ "What *is* the winter solstice?"  ♉ TAURUS ("why is it dark at 4 PM? rude.") asks; ♄ SATURN teaches: ✓ Earth's
//   axis is tilted about 23.4° · ✓ around 21 December the north leans farthest from the Sun: the shortest day and longest
//   night there, while the south gets its longest day (2026: 21 Dec, 20:50 UTC; only "around 21 December" is on screen)
//   · ✓ after it the days slowly get longer · ✦ astrologers say Capricorn season starts here · ♥ on long nights, reach out
//   to your people. The Pisces classmate cries happy tears. Last line (Saturn): "Longest night. *Then* more light."
// Engine: ../../nx2e01/scenes/x2kit.js · drawings: ../../nx2e01/scenes/x2draw.js. Pure f(t).
import { prog, ease } from '../../../src/lib.js'
import { signStar } from '../../startalk.js'
import { chalkLine, chalkCircle, EX } from '../../stexplain.js'
import { SATURN, drawSaturn } from '../../st5cast.js'
import { makeEpisode, checkLengths } from '../../nx2e01/scenes/x2kit.js'
import { sunChalk, earthChalk, pixHeart, popK, fadeK } from '../../nx2e01/scenes/x2draw.js'

const TAU = signStar('taurus')
const TAG = (k, dy = 14) => ({ kind: k, dx: 800, dy, align: 'right' })
const SATMOOD = { sparkle: 'happy', heart: 'happy', wink: 'happy' }
const TILT = 23.4 * Math.PI / 180

/** Earth with its tilted axis (north leaning away from a Sun on the left), night side shaded */
function tiltedEarth(x, t, cx, cy, r, at, shade = 0) {
  earthChalk(x, cx, cy, r, popK(t, at))
  const k = fadeK(t, at + 0.2)
  if (shade > 0 && k > 0) { x.save(); x.globalAlpha *= 0.6 * shade * k; x.fillStyle = '#05100c'; x.beginPath(); x.arc(cx, cy, r, -Math.PI / 2, Math.PI / 2); x.closePath(); x.fill(); x.restore() }
  const dx = Math.sin(TILT) * (r + 40), dy = Math.cos(TILT) * (r + 40)
  chalkLine(x, t, { pts: [[cx - dx, cy + dy], [cx + dx, cy - dy]], at: at + 0.3, dur: 0.5, color: EX.chalkYellow, width: 4, arrow: true })
}

const CFG = {
  id: 'nx2e14', duration: 60, key: 'C',
  q: 'What *is* the winter solstice?', qAccent: EX.chalkBlue,
  teacher: { tag: SATURN.tag, color: SATURN.tagColor, pitch: 440,
    draw: (ctx, X, Y, s, t, o) => { const r = drawSaturn(ctx, X, Y - 24, s * 1.15, t, { ...o, mood: SATMOOD[o.mood] || o.mood, pointer: false }); return { ...r, size: s } } },
  student: { tag: '♉ TAURUS', color: TAU.color, glyph: TAU.glyph, pitch: 659 },
  boardTitle: 'THE SOLSTICE',
  beats: [
    { // ✓ the tilt
      lines: [
        ['student', 'why is it dark at *4 PM?* rude.'],
        ['teacher', 'Earth’s axis is tilted about *23.4 degrees.*', { tag: TAG('sky'), point: [560, 220] }],
        ['teacher', 'so for half the year, the north leans *away.*', { point: [600, 120] }],
      ],
      draw(x, t, B, b) {
        const a = b.lines[1].t
        sunChalk(x, B.x0 + 110, B.y0 + 240, 60, t, popK(t, a - 0.1))
        tiltedEarth(x, t, B.x0 + 560, B.y0 + 240, 80, a + 0.2)
        chalkLine(x, t, { pts: [[B.x0 + 560, B.y0 + 100], [B.x0 + 560, B.y0 + 380]], at: a + 0.9, dur: 0.4, width: 2, dash: [6, 8], alpha: 0.6 })
      },
      chalk: [{ dt: 1.4, line: 1, text: '*23.4°*', x: 690, y: 110, size: 36 }, { dt: 0.8, line: 2, text: 'N', x: 600, y: 90, size: 30, align: 'center', color: EX.chalkYellow }],
    },
    { // ✓ ~21 December: north long night, south long day
      lines: [
        ['teacher', 'around 21 December it leans *farthest* away.', { tag: TAG('sky'), point: [500, 240] }],
        ['teacher', 'shortest day, longest night in the *north.*', { point: [560, 150] }],
        ['teacher', 'the south gets its *longest* day. same planet.', { point: [560, 330] }],
      ],
      draw(x, t, B, b) {
        const a = b.lines[0].t
        sunChalk(x, B.x0 + 90, B.y0 + 240, 50, t, popK(t, a - 0.2))
        tiltedEarth(x, t, B.x0 + 500, B.y0 + 240, 100, a, 1)
      },
      chalk: [
        { dt: 1.2, line: 0, text: '~*21 DEC*', x: 230, y: 100, size: 34, align: 'center' },
        { dt: 0.6, line: 1, text: 'NORTH: *LONG NIGHT*', x: 20, y: 390, size: 26 },
        { dt: 0.6, line: 2, text: 'SOUTH: *LONG DAY*', x: 20, y: 430, size: 26 },
      ],
    },
    { // ✓ then the days get longer
      lines: [
        ['teacher', 'after that, days slowly get *longer* again.', { tag: TAG('sky'), point: [400, 280] }],
        ['student', 'so the solstice is the *bottom* of the dip.'],
      ],
      draw(x, t, B, b) {
        const a = b.lines[0].t, base = B.y0 + 380
        chalkLine(x, t, { pts: [[B.x0 + 40, base], [B.x1 - 40, base]], at: a, dur: 0.4, width: 4 })
        for (let i = 0; i < 9; i++) {
          const h = 60 + Math.abs(i - 4) * 38
          const k = ease.outCubic(prog(t, a + 0.4 + i * 0.12, a + 0.8 + i * 0.12))
          if (k <= 0) continue
          x.save(); x.globalAlpha *= 0.85; x.fillStyle = i === 4 ? EX.chalkBlue : EX.chalkYellow
          x.fillRect(B.x0 + 90 + i * 76, base - h * k, 50, h * k); x.restore()
        }
      },
      chalk: [{ dt: 1.6, text: 'DAY LENGTH', x: 30, y: 90, size: 28 }, { dt: 1.4, text: '21 DEC', x: 419, y: 415, size: 24, align: 'center', color: EX.chalkBlue }],
    },
    { // ✦ Capricorn season · ♥ reach out
      lines: [
        ['teacher', 'astrologers say Capricorn season *starts* here.', { tag: TAG('astro'), point: [400, 200] }],
        ['teacher', 'on long nights, *reach out* to your people.', { tag: TAG('tip', 84), point: [400, 300] }],
        ['teacher', 'the light comes back a little *each day.*', { point: [400, 300] }],
      ],
      draw(x, t, B, b) {
        const c = b.lines[1].t, d = b.lines[2].t
        // a row of chalk windows that light up one by one
        for (let i = 0; i < 5; i++) {
          const X = B.x0 + 120 + i * 140, Y = B.y0 + 260
          chalkLine(x, t, { pts: [[X - 44, Y - 50], [X + 44, Y - 50], [X + 44, Y + 50], [X - 44, Y + 50], [X - 44, Y - 50]], at: c + 0.3 + i * 0.1, dur: 0.3, width: 4 })
          const k = fadeK(t, d + 0.3 + i * 0.35, 0.3)
          if (k > 0) { x.save(); x.globalAlpha *= 0.75 * k; x.fillStyle = EX.chalkYellow; x.fillRect(X - 38, Y - 44, 76, 88); x.restore() }
          pixHeart(x, X, Y, 4, popK(t, c + 0.8 + i * 0.15))
        }
      },
      chalk: [{ dt: 0.6, line: 0, text: '*CAPRICORN* SEASON', x: 30, y: 110, size: 30 }],
    },
  ],
  bulb: 'so dark at 4 is temporary. *noted.*',
  items: ['Earth is *tilted*', '~21 Dec: *longest* night (north)', 'Then the days *grow*'],
  last: 'Longest night. *Then* more light.', lastWho: 'teacher',
}
const bad = checkLengths(CFG)
if (bad.length) throw new Error('nx2e14: too long: ' + bad.join(' | '))
const EP = makeEpisode(CFG)
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
void chalkCircle
