// nx2e07 (45 s vertical, "Star Talk Explains, Volume 2", episode 7) · story 0–40.6, then the shared end card.
//   ❓ "Is a *blue moon* actually blue?"  ♉ TAURUS asks; ♋ CANCER teaches: ✓ usually not; it's about the calendar: two
//   full moons in one month and the second is the "blue moon" · ✓ the older meaning: the 3rd of 4 full moons in one
//   season · ✓ either way it comes around every few years · ♥ don't save sweet things for a blue moon: small kindness,
//   often. The Pisces classmate cries happy tears. Last line (Cancer): "Don't wait for *blue*."
// Engine: ../../nx2e01/scenes/x2kit.js · drawings: ../../nx2e01/scenes/x2draw.js. Pure f(t).
import { signStar } from '../../startalk.js'
import { chalkLine, chalkCircle, EX } from '../../stexplain.js'
import { makeEpisode, checkLengths } from '../../nx2e01/scenes/x2kit.js'
import { moonPhase, pixHeart, popK, fadeK } from '../../nx2e01/scenes/x2draw.js'

const TAU = signStar('taurus'), CAN = signStar('cancer')
const TAG = (k, dy = 14) => ({ kind: k, dx: 800, dy, align: 'right' })

const CFG = {
  id: 'nx2e07', duration: 45, key: 'C',
  q: 'Is a *blue moon* actually blue?', qAccent: EX.chalkBlue,
  teacher: { tag: '♋ CANCER', color: CAN.color, glyph: CAN.glyph, pitch: 494 },
  student: { tag: '♉ TAURUS', color: TAU.color, glyph: TAU.glyph, pitch: 659 },
  boardTitle: 'BLUE MOONS',
  beats: [
    { // ✓ the calendar meaning
      lines: [
        ['student', 'once in a blue moon… so is it *blue?*'],
        ['teacher', 'usually not. it’s about the *calendar.*', { tag: TAG('sky'), point: [400, 230] }],
        ['teacher', 'two full moons in one month: the 2nd is *blue.*', { point: [690, 330] }],
      ],
      draw(x, t, B, b) {
        const a = b.lines[1].t, X0 = B.x0 + 120, Y0 = B.y0 + 90, cw = 80, ch = 64
        // a month grid (5 rows × 7), drawn on cell by cell
        for (let r = 0; r <= 5; r++) chalkLine(x, t, { pts: [[X0, Y0 + r * ch], [X0 + 7 * cw, Y0 + r * ch]], at: a + r * 0.06, dur: 0.3, width: 2, alpha: 0.7 })
        for (let c = 0; c <= 7; c++) chalkLine(x, t, { pts: [[X0 + c * cw, Y0], [X0 + c * cw, Y0 + 5 * ch]], at: a + 0.3 + c * 0.04, dur: 0.3, width: 2, alpha: 0.7 })
        const s = b.lines[2].t
        moonPhase(x, X0 + cw * 0.5, Y0 + ch * 0.5, 24, 0.5, popK(t, s + 0.3))
        moonPhase(x, X0 + cw * 1.5, Y0 + ch * 4.5, 24, 0.5, popK(t, s + 0.9))
        chalkCircle(x, t, { x: X0 + cw * 1.5, y: Y0 + ch * 4.5, r: 36, at: s + 1.3, dur: 0.5, color: EX.chalkBlue, width: 6 })
      },
      chalk: [{ dt: 0.3, line: 2, text: 'DAY 1', x: 700, y: 120, size: 24 }, { dt: 1.0, line: 2, text: 'DAY 30', x: 700, y: 375, size: 24 }, { dt: 1.6, line: 2, text: '*BLUE*', x: 300, y: 375, size: 34 }],
    },
    { // ✓ the older seasonal meaning; every few years
      lines: [
        ['teacher', 'or: the 3rd of 4 full moons in one *season.*', { tag: TAG('sky'), point: [400, 200] }],
        ['teacher', 'either way, it comes around every *few years.*', { point: [400, 340] }],
      ],
      draw(x, t, B, b) {
        const a = b.lines[0].t, Y = B.y0 + 190
        for (let i = 0; i < 4; i++) moonPhase(x, B.x0 + 130 + i * 180, Y, 52, 0.5, popK(t, a + 0.3 + i * 0.25))
        chalkCircle(x, t, { x: B.x0 + 490, y: Y, r: 74, at: a + 1.5, dur: 0.5, color: EX.chalkBlue, width: 6 })
      },
      chalk: [
        { dt: 0.4, line: 0, text: '1', x: 130, y: 260, size: 28, align: 'center' }, { dt: 0.65, line: 0, text: '2', x: 310, y: 260, size: 28, align: 'center' },
        { dt: 0.9, line: 0, text: '*3*', x: 490, y: 260, size: 28, align: 'center' }, { dt: 1.15, line: 0, text: '4', x: 670, y: 260, size: 28, align: 'center' },
        { dt: 0.9, line: 1, text: 'EVERY *FEW YEARS*', x: 400, y: 360, size: 38, align: 'center' },
      ],
    },
    { // ♥ small kindness, often
      lines: [
        ['teacher', 'don’t save sweet things for a *blue moon.*', { tag: TAG('tip'), point: [400, 220] }],
        ['teacher', 'small kindness, *often.* that’s the magic.', { point: [400, 220] }],
        ['student', 'so: snacks every week. not every *few years.*'],
      ],
      draw(x, t, B, b) {
        const a = b.lines[1].t, Y = B.y0 + 220
        const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
        days.forEach((d, i) => {
          const X = B.x0 + 85 + i * 105
          chalkLine(x, t, { pts: [[X - 40, Y + 60], [X + 40, Y + 60]], at: a + i * 0.08, dur: 0.2, width: 3 })
          pixHeart(x, X, Y, 7, popK(t, a + 0.5 + i * 0.18, 0.3))
        })
      },
      chalk: ['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => ({ dt: 0.3 + i * 0.08, line: 1, text: d, x: 85 + i * 105, y: 330, size: 30, align: 'center', cps: 30 })),
    },
  ],
  bulb: 'so love should be a *regular* moon.',
  items: ['2nd full moon in a *month*', 'Comes every *few years*', 'Kindness: *often*, not rare'],
  last: 'Don’t wait for *blue*.', lastWho: 'teacher',
}
const bad = checkLengths(CFG)
if (bad.length) throw new Error('nx2e07: too long: ' + bad.join(' | '))
const EP = makeEpisode(CFG)
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
void fadeK
