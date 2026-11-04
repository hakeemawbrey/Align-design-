// nx2e04 (45 s vertical, "Star Talk Explains, Volume 2", episode 4) · story 0–40.6, then the shared end card.
//   ❓ "Why is the Moon out in the *daytime*?"  ♌ LEO ("it's MY Sun's shift") asks; ☽ THE MOON teaches: ✓ the Moon is
//   up in daylight on many days of the month, bright enough to show through blue sky · ✓ it rises about 50 minutes later
//   each day on average · ✦ astrologers say the Moon is feelings · ♥ say soft things at noon too, not just at 2 AM.
//   The Pisces classmate cries happy tears. Last line (the Moon): "Feelings work *days*, too."
// Engine: ../../nx2e01/scenes/x2kit.js · drawings: ../../nx2e01/scenes/x2draw.js. Pure f(t).
import { lerp, prog, ease } from '../../../src/lib.js'
import { signStar } from '../../startalk.js'
import { chalkLine, chalkCircle, EX } from '../../stexplain.js'
import { makeEpisode, checkLengths } from '../../nx2e01/scenes/x2kit.js'
import { sunChalk, moonPhase, pixHeart, popK, fadeK } from '../../nx2e01/scenes/x2draw.js'

const LEO = signStar('leo')
const MOONC = '#e9e4ff', MOONLIGHT = '#bcd2ff'
const TAG = (k, dy = 14) => ({ kind: k, dx: 800, dy, align: 'right' })

const CFG = {
  id: 'nx2e04', duration: 45, key: 'A',
  q: 'Why is the Moon out in the *daytime?*', qAccent: '#ffe27a',
  teacher: { tag: '☽ THE MOON', color: MOONC, glyph: '☽', accent: MOONLIGHT, pitch: 392 },
  student: { tag: '♌ LEO', color: LEO.color, glyph: LEO.glyph, pitch: 660 },
  boardTitle: 'THE DAYTIME MOON',
  beats: [
    { // ✓ up in daylight, bright enough
      lines: [
        ['student', 'it’s MY Sun’s shift. why are *you* here?'],
        ['teacher', 'i’m up in daylight on *many* days a month.', { tag: TAG('sky'), point: [560, 200] }],
        ['teacher', 'and bright enough to show through *blue sky.*', { point: [560, 200] }],
      ],
      draw(x, t, B, b) {
        const a = b.lines[1].t, H = B.y0 + 360
        // a soft daytime wash on the slate
        const k = fadeK(t, a, 0.8)
        if (k > 0) { x.save(); x.globalAlpha *= 0.28 * k; x.fillStyle = EX.chalkBlue; x.fillRect(B.x0, B.y0 + 40, B.x1 - B.x0, H - B.y0 - 40); x.restore() }
        chalkLine(x, t, { pts: [[B.x0 + 20, H], [B.x1 - 20, H]], at: a, dur: 0.5, width: 5 })
        sunChalk(x, B.x0 + 200, B.y0 + 170, 56, t, popK(t, a + 0.3))
        const m = b.lines[2].t
        moonPhase(x, B.x0 + 560, B.y0 + 200, 50, 0.3, popK(t, a + 0.9) * (0.5 + 0.5 * fadeK(t, m + 0.6, 0.6)))
      },
      chalk: [{ dt: 1.2, line: 2, text: '*STILL VISIBLE*', x: 560, y: 300, size: 30, align: 'center' }],
    },
    { // ✓ ~50 minutes later each day
      lines: [
        ['teacher', 'i rise about 50 minutes later *each day.*', { tag: TAG('sky'), point: [400, 200] }],
        ['student', 'so you just… *drift* into my shift?'],
      ],
      draw(x, t, B, b) {
        const a = b.lines[0].t, H = B.y0 + 300
        chalkLine(x, t, { pts: [[B.x0 + 20, H], [B.x1 - 20, H]], at: a, dur: 0.5, width: 4, arrow: true })
        for (let i = 0; i < 4; i++) {
          const X = B.x0 + 110 + i * 190
          chalkLine(x, t, { pts: [[X, H - 12], [X, H + 12]], at: a + 0.3 + i * 0.1, dur: 0.15, width: 4 })
          moonPhase(x, X + i * 18, H - 110 - i * 8, 34, 0.18 + i * 0.04, popK(t, a + 0.6 + i * 0.35, 0.3))
        }
      },
      chalk: [
        { dt: 0.4, line: 0, text: 'DAY 1', x: 110, y: 350, size: 26, align: 'center' },
        { dt: 0.7, line: 0, text: 'DAY 2', x: 300, y: 350, size: 26, align: 'center' },
        { dt: 1.0, line: 0, text: 'DAY 3', x: 490, y: 350, size: 26, align: 'center' },
        { dt: 1.3, line: 0, text: 'DAY 4', x: 680, y: 350, size: 26, align: 'center' },
        { dt: 1.8, line: 0, text: '+*50 MIN* EACH', x: 400, y: 100, size: 34, align: 'center' },
      ],
    },
    { // ✦ the Moon = feelings · ♥ noon, not just 2 AM
      lines: [
        ['teacher', 'astrologers say the Moon is *feelings.*', { tag: TAG('astro'), point: [260, 140] }],
        ['teacher', 'say soft things at noon too, not just *2 AM.*', { tag: TAG('tip', 84), point: [560, 270] }],
        ['student', 'feelings in *daylight?* that’s so bold.'],
      ],
      draw(x, t, B, b) {
        const c = b.lines[1].t, cx = B.x0 + 560, cy = B.y0 + 270
        chalkCircle(x, t, { x: cx, y: cy, r: 92, at: c + 0.2, dur: 0.6, color: EX.chalk, width: 5 })
        chalkLine(x, t, { pts: [[cx, cy], [cx, cy - 66]], at: c + 0.8, dur: 0.2, color: EX.chalkYellow, width: 6 })
        chalkLine(x, t, { pts: [[cx, cy], [cx + 4, cy - 50]], at: c + 0.9, dur: 0.2, color: EX.chalkYellow, width: 8 })
        pixHeart(x, cx + 130, cy - 80, 8, popK(t, c + 1.3))
      },
      chalk: [{ dt: 0.5, line: 0, text: 'MOON = *FEELINGS*', x: 30, y: 150, size: 38 }, { dt: 1.0, line: 1, text: '12', x: 560, y: 170, size: 26, align: 'center' }],
    },
  ],
  bulb: 'so the Moon works *days.* respect.',
  items: ['The Moon is up on *many* days', 'Rises ~*50 min* later daily', 'Say soft things at *noon*'],
  last: 'Feelings work *days*, too.', lastWho: 'teacher',
}
const bad = checkLengths(CFG)
if (bad.length) throw new Error('nx2e04: too long: ' + bad.join(' | '))
const EP = makeEpisode(CFG)
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
void lerp; void prog; void ease
