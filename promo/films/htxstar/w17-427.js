// hst427 · 2 days · king cake season (it started Jan 6) and Aquarius found the tiny baby · jazzy
import { ep, C, Y, Kp, clamp, box, txt, sparkles, GOLD, BONE, PINK, INK, MONO, SKYB, MINT, LAV, BRAKE, kitchen, kingCake, tinyBaby, table, dayCal } from './w17.js'

const L = 300, R = 780, M = 540
const set = (x, t, lt = 0, cut = 3) => { kitchen(x, t, { wall: '#d8c8f0' }); kingCake(x, M, 1130, 1, cut) }
const babyOn = id => (x, t, lt, P) => { const [cx, cy, s] = P.at(id); tinyBaby(x, cx + s * 0.45, cy - s * 0.1, 1.2) }
const jan = (x, t, lt) => { const k = Kp(lt, 0.1); if (k > 0) { x.save(); x.translate(M, 560); x.scale(k, k); box(x, -230, -70, 460, 140, '#1c1240', 6); txt(x, 'KING CAKE SEASON', 0, -18, { size: 40, col: GOLD }); txt(x, 'SINCE JAN 6', 0, 34, { size: 30, col: BONE, font: MONO, weight: 700 }); x.restore() } }

export const EP = ep(2, {
  hook: 'T-minus 2 days: | king cake season.',
  hookSet: (x, t, lt) => set(x, t, lt, 2),
  hookFront: babyOn('aquarius'),
  hookCast: C({ aquarius: [[0, L - 60, Y, 260], [1.4, L - 20, Y, 260]], gemini: [R + 80, Y, 210] }), hookMood: { aquarius: 'sparkle', gemini: 'wide' }, hookLook: { aquarius: [0, 0] },
  calX: 800, calY: 700, calS: 0.6,
  scenes: [
    { dur: 3.4, set: (x, t, lt) => { set(x, t, lt); jan(x, t, lt) }, cast: C({ aquarius: [L - 60, Y, 260] }), mood: { aquarius: 'happy' }, look: { aquarius: [0, 0] },
      lines: [[0.4, 2.6, 'aquarius', 'it started | Jan 6. obviously.']] },
    { dur: 3.4, set, front: babyOn('aquarius'), cast: C({ aquarius: [L - 60, Y, 260], gemini: [R + 80, Y, 220] }), mood: { aquarius: 'sparkle', gemini: 'wink' },
      lines: [[0.2, 1.4, 'aquarius', 'I found | the tiny baby.'], [1.8, 1.4, 'gemini', 'so you buy | the next one.']] },
    { dur: 3.4, set, front: babyOn('aquarius'), cast: C({ capricorn: [L - 60, Y, 230], aquarius: [R + 80, Y, 240] }), mood: { capricorn: 'squint', aquarius: 'eyeroll' },
      lines: [[0.2, 1.3, 'capricorn', "that's | the rule."], [1.7, 1.5, 'aquarius', 'I reject | the rule.']] },
    { dur: 3.6, set: (x, t, lt) => set(x, t, lt, 4), front: (x, t, lt, P) => { if (lt < 1.0) babyOn('aquarius')(x, t, lt, P); else if (lt > 1.8) babyOn('leo')(x, t, lt, P) }, cast: C({ aquarius: [L - 60, Y, 230], leo: [R + 80, Y, 240] }), mood: { aquarius: 'wink', leo: lt => lt > 1.8 ? 'wide' : 'happy' },
      lines: [[0.2, 1.0, 'aquarius', '*sneaky*'], [2.0, 1.4, 'leo', 'I FOUND IT?!']] },
    { dur: 3.4, set: (x, t, lt) => set(x, t, lt, 7), cast: C({ taurus: [L - 60, Y, 250] }), mood: { taurus: 'heart' },
      lines: [[0.3, 2.6, 'taurus', 'more cake | either way.']] },
    { dur: 3.4, set: (x, t, lt) => set(x, t, lt, 9), cast: C({ pisces: [L - 60, Y, 240], aquarius: [R + 80, Y, 220] }), mood: { pisces: 'heart', aquarius: 'happy' },
      lines: [[0.3, 2.6, 'pisces', 'TWO days. | *sob*']] },
    { dur: 3.6, set: (x, t, lt) => set(x, t, lt, 10), cast: C({ aquarius: [M, Y - 40, 290] }), mood: { aquarius: 'happy' }, look: { aquarius: [0, 0] },
      lines: [[0.15, 1.6, 'aquarius', 'two days. | tell one person'], [1.9, 1.6, 'aquarius', "you're | coming."]] },
  ],
  stamp: { set: (x, t, lt) => set(x, t, lt, 11), front: babyOn('aquarius'), cast: C({ aquarius: [L - 60, Y, 240], leo: [R + 80, Y, 210] }), mood: { aquarius: 'sparkle', leo: 'heart' }, look: { aquarius: [0, 0] },
    lines: [[1.2, 2.2, 'aquarius', 'two sleeps. | that\'s it.']] },
  line: 'Two sleeps. Jan 9.', stars: ['aquarius', 'leo', 'pisces', 'taurus'],
})
