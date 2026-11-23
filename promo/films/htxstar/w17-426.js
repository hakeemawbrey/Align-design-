// hst426 · 3 days · Libra's playlist is 9 hours long (zydeco, Tejano, screwed, house…) · house
import { ep, C, Y, Kp, clamp, box, txt, sparkles, GOLD, BONE, PINK, INK, MONO, SKYB, MINT, LAV, BRAKE, djTable, heldPhone } from './w17.js'

const L = 300, R = 780, M = 540
const CRATES = ['ZYDECO', 'TEJANO', 'SCREWED', 'HOUSE', 'R&B']
const set = (x, t, lt = 0) => djTable(x, t, lt, CRATES)
const clockCard = (x, s, k, col = GOLD) => { if (k <= 0) return; x.save(); x.translate(M, 520); x.scale(k, k); x.rotate(-0.03); box(x, -230, -60, 460, 120, '#1c1240', 6); txt(x, s, 0, 2, { size: 50, col, font: MONO, weight: 700 }); x.restore() }

export const EP = ep(3, {
  hook: "Libra's playlist is | 9 hours long. | 3 days left.",
  hookSet: (x, t, lt) => set(x, t, lt),
  hookCast: C({ libra: [[0, L, Y, 270], [0.6, L + 40, Y, 270], [1.2, L, Y, 270], [1.8, L + 40, Y, 270]] }), hookMood: { libra: 'sparkle' }, hookLook: { libra: [0, 0] },
  hookHops: { libra: [0.02, 0.45, 0.9, 1.35, 1.8, 2.25] },
  calX: 800, calY: 760, calS: 0.6,
  scenes: [
    { dur: 3.4, set, front: (x, t, lt, P) => heldPhone(x, P, 'libra', 1), cast: C({ libra: [M, Y, 300] }), mood: { libra: 'wide' }, look: { libra: [0, 0] },
      lines: [[0.15, 1.5, 'libra', 'help me order | these songs.'], [1.8, 1.4, 'libra', 'all of them.']] },
    { dur: 3.6, set: (x, t, lt) => { set(x, t, lt); clockCard(x, 'ZYDECO OR TEJANO?', Kp(lt, 0.05)) }, cast: C({ libra: [L, Y, 240], taurus: [R, Y, 220] }), mood: { libra: 'squint', taurus: 'happy' },
      lines: [[0.4, 1.4, 'libra', 'which | goes first?'], [1.9, 1.5, 'taurus', 'both. | we two-step.']] },
    { dur: 3.8, set, cast: C({ scorpio: [M, Y, 280] }), mood: { scorpio: 'sleepy' },
      lines: [[0.3, 3.2, 'scorpio', 'slooow... it... | dooown...']], stick: [[0.1, 1.6, 'SCREWED HOUR', LAV]] },
    { dur: 3.4, set: (x, t, lt) => { set(x, t, lt); clockCard(x, 'RUNTIME: 10 HRS', Kp(lt, 1.6), BRAKE) }, cast: C({ gemini: [L, Y, 220], libra: [R, Y, 240] }), mood: { gemini: 'wink', libra: 'wide' },
      lines: [[0.2, 1.3, 'gemini', 'add one | more hour.'], [1.8, 1.4, 'libra', 'done. | wait—']] },
    { dur: 3.6, set, cast: C({ virgo: [L, Y, 230], libra: [R, Y, 240] }), mood: { virgo: 'squint', libra: 'eyeroll' },
      lines: [[0.2, 1.5, 'virgo', 'cut it to | the best 40.'], [1.9, 1.5, 'libra', 'but they are | ALL the best!']] },
    { dur: 3.4, set, cast: C({ pisces: [M, Y, 260] }), mood: { pisces: 'heart' },
      lines: [[0.3, 2.6, 'pisces', 'leave in the | sad slow one.']] },
    { dur: 3.6, set, cast: C({ libra: [M, Y, 300] }), mood: { libra: 'happy' }, look: { libra: [0, 0] },
      lines: [[0.15, 1.6, 'libra', 'pick what makes | people dance.'], [1.9, 1.6, 'libra', 'done beats | perfect.']] },
  ],
  stamp: { set, cast: C({ libra: [L, Y, 240], scorpio: [R, Y, 210] }), mood: { libra: 'sparkle', scorpio: 'heart' }, look: { libra: [0, 0] },
    lines: [[1.2, 2.2, 'libra', 'comment your | song request.']] },
  line: 'Bring your requests. Jan 9.', stars: ['libra', 'scorpio', 'taurus', 'pisces'],
})
