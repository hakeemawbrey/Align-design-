// nx2e03 (45 s vertical, "Star Talk Explains, Volume 2", episode 3) · story 0–40.6, then the shared end card.
//   ❓ "Why is a half moon called a *quarter*?"  ♊ GEMINI asks; ☽ THE MOON teaches: ✓ at first quarter the Moon is a
//   quarter of the way around its orbit, so we see half its face lit · ✓ first quarter rises around noon, last quarter
//   around midnight · ✦ astrologers read first quarter as a push and last quarter as a clear-out · ♥ halfway through
//   anything is a good check-in. The Pisces classmate cries happy tears. Last line (the Moon): "Halfway is a *check-in*."
// Engine: ../../nx2e01/scenes/x2kit.js · drawings: ../../nx2e01/scenes/x2draw.js. Pure f(t).
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { signStar } from '../../startalk.js'
import { chalkLine, chalkCircle, EX } from '../../stexplain.js'
import { makeEpisode, checkLengths, R, INK } from '../../nx2e01/scenes/x2kit.js'
import { sunChalk, earthChalk, moonPhase, litHalf, pixHeart, popK, fadeK } from '../../nx2e01/scenes/x2draw.js'

const GEM = signStar('gemini')
const MOONC = '#e9e4ff', MOONLIGHT = '#bcd2ff'
const TAG = k => ({ kind: k, dx: 800, dy: 14, align: 'right' })

const CFG = {
  id: 'nx2e03', duration: 45, key: 'Bb',
  q: 'Why is a half moon called a *quarter?*', qAccent: MOONLIGHT,
  teacher: { tag: '☽ THE MOON', color: MOONC, glyph: '☽', accent: MOONLIGHT, pitch: 392 },
  student: { tag: '♊ GEMINI', color: GEM.color, glyph: GEM.glyph, pitch: 760 },
  boardTitle: 'QUARTER MOONS',
  beats: [
    { // ✓ a quarter of the orbit → half the face lit
      lines: [
        ['student', 'it’s literally *half* a circle. explain.'],
        ['teacher', 'i’m a quarter of the way around my *orbit.*', { tag: TAG('sky'), point: [260, 140] }],
        ['teacher', 'so you see half my face lit: *first quarter.*', { point: [620, 240] }],
      ],
      draw(x, t, B, b) {
        const a = b.lines[1].t, cx = B.x0 + 260, cy = B.y0 + 250
        chalkCircle(x, t, { x: cx, y: cy, r: 140, at: a, dur: 0.7, color: EX.chalk, width: 3 })
        earthChalk(x, cx, cy, 30, popK(t, a + 0.1))
        for (let i = 0; i < 3; i++) chalkLine(x, t, { pts: [[B.x0 + 10, cy - 100 + i * 100], [B.x0 + 70, cy - 100 + i * 100]], at: a + 0.3 + i * 0.1, dur: 0.25, color: EX.chalkYellow, width: 4, arrow: true })
        // the quarter of the orbit, new (left) → first quarter (top)
        chalkCircle(x, t, { x: cx, y: cy, r: 140, at: a + 0.8, dur: 0.8, color: EX.chalkPink, width: 8, from: Math.PI, sweep: Math.PI / 2 })
        const p = ease.inOutCubic(prog(t, a + 0.8, a + 1.6)), g = Math.PI + p * Math.PI / 2
        litHalf(x, cx + Math.cos(g) * 140, cy + Math.sin(g) * 140, 26, Math.PI, popK(t, a + 0.7))
        const f = b.lines[2].t
        moonPhase(x, B.x0 + 620, B.y0 + 230, 80, 0.25, popK(t, f + 0.5))
      },
      chalk: [{ dt: 1.6, line: 1, text: '*¼* LAP', x: 120, y: 90, size: 34, align: 'center' }, { dt: 1.0, line: 2, text: 'FIRST *QUARTER*', x: 620, y: 360, size: 30, align: 'center' }],
    },
    { // ✓ rise times
      lines: [
        ['teacher', 'first quarter rises around *noon.*', { tag: TAG('sky'), point: [200, 220] }],
        ['teacher', 'last quarter rises around *midnight.*', { point: [600, 220] }],
      ],
      draw(x, t, B, b) {
        const H = B.y0 + 300
        for (const [i, X, ph] of [[0, B.x0 + 200, 0.25], [1, B.x0 + 600, 0.75]]) {
          const a = b.lines[i].t
          chalkLine(x, t, { pts: [[X - 150, H], [X + 150, H]], at: a, dur: 0.4, width: 5 })
          const rise = ease.outCubic(prog(t, a + 0.4, a + 1.6))
          x.save(); x.beginPath(); x.rect(X - 160, B.y0 + 40, 320, H - B.y0 - 42); x.clip()
          moonPhase(x, X, lerp(H + 60, H - 140, rise), 52, ph, fadeK(t, a + 0.4))
          x.restore()
        }
      },
      chalk: [{ dt: 1.2, line: 0, text: '≈ *12 PM*', x: 200, y: 350, size: 34, align: 'center' }, { dt: 1.2, line: 1, text: '≈ *12 AM*', x: 600, y: 350, size: 34, align: 'center' }],
    },
    { // ✦ push / clear-out
      lines: [
        ['teacher', 'astrologers read first quarter as a *push.*', { tag: TAG('astro'), point: [250, 200] }],
        ['teacher', 'last quarter? a *clear-out.* let go of extras.', { point: [560, 200] }],
      ],
      draw(x, t, B, b) {
        const a = b.lines[0].t, c = b.lines[1].t
        moonPhase(x, B.x0 + 150, B.y0 + 180, 54, 0.25, popK(t, a))
        chalkLine(x, t, { pts: [[B.x0 + 230, B.y0 + 180], [B.x0 + 330, B.y0 + 180]], at: a + 0.6, dur: 0.3, color: EX.lilac, width: 6, arrow: true })
        moonPhase(x, B.x0 + 150, B.y0 + 330, 54, 0.75, popK(t, c))
        chalkLine(x, t, { pts: [[B.x0 + 230, B.y0 + 330], [B.x0 + 330, B.y0 + 330]], at: c + 0.6, dur: 0.3, color: EX.lilac, width: 6, arrow: true })
      },
      chalk: [{ dt: 0.9, line: 0, text: '*PUSH*', x: 360, y: 200, size: 52 }, { dt: 0.9, line: 1, text: '*CLEAR OUT*', x: 360, y: 350, size: 52 }],
    },
    { // ♥ halfway check-in
      lines: [
        ['teacher', 'halfway through anything is a good *check-in.*', { tag: TAG('tip'), point: [400, 240] }],
      ],
      draw(x, t, B, b) {
        const a = b.lines[0].t, X0 = B.x0 + 80, X1 = B.x1 - 80, Y = B.y0 + 250
        const k = fadeK(t, a)
        if (k <= 0) return
        x.save(); x.globalAlpha *= k
        x.strokeStyle = EX.chalk; x.lineWidth = 6; x.strokeRect(X0, Y - 36, X1 - X0, 72)
        const f = ease.inOutCubic(prog(t, a + 0.3, a + 1.5)) * 0.5
        x.fillStyle = EX.chalkGreen; x.globalAlpha *= 0.8; x.fillRect(X0 + 8, Y - 28, (X1 - X0 - 16) * f, 56)
        x.restore()
        pixHeart(x, (X0 + X1) / 2, Y - 110, 12, popK(t, a + 1.6))
      },
      chalk: [{ dt: 1.9, text: '*50%* · HOW ARE WE?', x: 400, y: 380, size: 34, align: 'center' }],
    },
  ],
  bulb: 'so a half moon is a *quarter* trip. cute.',
  items: ['A *quarter* of the orbit', 'First quarter rises ~*noon*', 'Halfway? *Check in*'],
  last: 'Halfway is a *check-in*.', lastWho: 'teacher',
}
const bad = checkLengths(CFG)
if (bad.length) throw new Error('nx2e03: too long: ' + bad.join(' | '))
const EP = makeEpisode(CFG)
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
void R; void INK; void clamp; void sunChalk
