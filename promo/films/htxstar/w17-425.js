// hst425 · 4 days · crawfish season is back (early and tiny; Viet-Cajun garlic butter) · funk
import { ep, C, Y, Kp, clamp, box, txt, sparkles, GOLD, BONE, PINK, INK, MONO, SKYB, MINT, BRAKE, boilTable, bib, crawdad, soupPot, glasses } from './w17.js'

const L = 300, R = 780, M = 540
const set = (x, t, lt = 0) => boilTable(x, t, lt)
const bibs = ids => (x, t, lt, P) => ids.forEach(id => bib(x, P, id))
const tiny = (x, t, lt) => { set(x, t, lt); const k = Kp(lt, 0.3); if (k > 0) { x.save(); x.translate(M, 640); x.scale(k, k); box(x, -220, -150, 440, 300, '#1c1240', 6); crawdad(x, 0, 0, 0.012); txt(x, 'ACTUAL SIZE (JAN)', 0, 110, { size: 28, col: GOLD, font: MONO, weight: 700 }); x.restore() } }
const butter = (x, t, lt) => { set(x, t, lt); box(x, 380, 520, 320, 200, '#f2c75c', 6); txt(x, 'GARLIC', 540, 590, { size: 44, col: INK }); txt(x, 'BUTTER', 540, 650, { size: 44, col: INK }); for (let k = 0; k < 6; k++) { const ph = (t * 0.8 + k / 6) % 1; x.fillStyle = `rgba(255,240,200,${(0.8 * (1 - ph)).toFixed(2)})`; x.fillRect(400 + k * 50, 520 - ph * 120, 10, 24) } }
const peel = (x, t, lt) => { set(x, t, lt); const steps = ['PINCH', 'TWIST', 'PEEL']; steps.forEach((s, i) => { const k = Kp(lt, 0.2 + i * 0.6); if (k > 0) { x.save(); x.translate(260 + i * 280, 600); x.scale(k, k); box(x, -110, -44, 220, 88, [PINK, GOLD, MINT][i], 5); txt(x, s, 0, 2, { size: 40, col: INK }); x.restore() } }) }

export const EP = ep(4, {
  hook: 'Crawfish season | is back. | 4 days to go.',
  hookSet: (x, t, lt) => { set(x, t, lt); soupPot(x, t, 860, 980) },
  hookFront: bibs(['scorpio']),
  hookCast: C({ scorpio: [[0, L, Y - 120, 270], [1.4, L + 40, Y - 120, 270]] }), hookMood: { scorpio: 'sparkle' }, hookLook: { scorpio: [0, 0] },
  calX: 560, calY: 760, calS: 0.6,
  scenes: [
    { dur: 3.4, set, front: bibs(['scorpio']), cast: C({ scorpio: [M, Y - 120, 300] }), mood: { scorpio: 'wink' }, look: { scorpio: [0, 0] },
      lines: [[0.15, 1.5, 'scorpio', "it's early | season."], [1.8, 1.4, 'scorpio', "they're | tiny."]] },
    { dur: 3.4, set: tiny, front: bibs(['scorpio']), cast: C({ scorpio: [200, Y - 120, 230] }), mood: { scorpio: 'squint' },
      lines: [[1.4, 1.9, 'scorpio', "not waiting | for March."]] },
    { dur: 3.6, set: butter, front: bibs(['scorpio', 'taurus']), cast: C({ scorpio: [L, Y - 120, 240], taurus: [R, Y - 120, 230] }), mood: { scorpio: 'sparkle', taurus: 'heart' },
      lines: [[0.2, 1.5, 'scorpio', 'Viet-Cajun. | the Houston way.'], [1.9, 1.4, 'taurus', 'say less.']] },
    { dur: 3.6, set: peel, front: (x, t, lt, P) => { bibs(['virgo', 'gemini'])(x, t, lt, P); glasses(x, P, 'virgo') }, cast: C({ virgo: [L, Y - 120, 240], gemini: [R, Y - 120, 220] }), mood: { virgo: 'squint', gemini: lt => lt > 2 ? 'wide' : 'happy' },
      lines: [[2.0, 1.5, 'gemini', '...I made | a mess.']] },
    { dur: 3.4, set, front: (x, t) => { box(x, 680, 1060, 120, 50, '#f2c75c', 4) }, cast: C({ pisces: [L, Y - 120, 240] }), mood: { pisces: 'heart' },
      lines: [[0.3, 2.6, 'pisces', 'the corn looks | so happy.']] },
    { dur: 3.6, set, front: bibs(['scorpio', 'sagittarius']), cast: C({ sagittarius: [L, Y - 120, 230], scorpio: [R, Y - 120, 240] }), mood: { sagittarius: 'sparkle', scorpio: 'happy' },
      lines: [[0.2, 1.5, 'sagittarius', 'same table, | Jan 9?'], [1.9, 1.5, 'scorpio', 'same energy. | 4 days.']] },
    { dur: 3.6, set, front: bibs(['scorpio']), cast: C({ scorpio: [M, Y - 120, 300] }), mood: { scorpio: 'happy' }, look: { scorpio: [0, 0] },
      lines: [[0.15, 1.6, 'scorpio', 'find people | who share'], [1.9, 1.6, 'scorpio', 'the good stuff. | keep them.']] },
  ],
  stamp: { set, front: bibs(['scorpio', 'pisces']), cast: C({ scorpio: [L, Y - 120, 240], pisces: [R, Y - 120, 210] }), mood: { scorpio: 'sparkle', pisces: 'heart' }, look: { scorpio: [0, 0] },
    lines: [[1.2, 2.2, 'scorpio', "season's on. | so are we."]] },
  line: "Season's on. Jan 9.", stars: ['scorpio', 'taurus', 'pisces', 'sagittarius'],
})
