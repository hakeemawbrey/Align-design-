// hst424 · 5 days · Cancer knit everyone a sweater (it's 80° out, the AC inside is arctic) · lofi
import { ep, C, Y, Kp, clamp, box, txt, sparkles, heart, GOLD, BONE, PINK, INK, MONO, SKYB, MINT, BRAKE, cozy, yarn, glasses, sweater, thermo, room } from './w17.js'

const L = 300, R = 780, M = 540
const set = (x, t) => { cozy(x, t); yarn(x, 860, 1330, '#c0304a', t); yarn(x, 960, 1340, SKYB, t) }
const needles = (x, t, P, id) => { const [cx, cy, s] = P.at(id); const w = Math.sin(t * 10) * 0.2; x.save(); x.translate(cx + s * 0.4, cy + s * 0.1); x.rotate(-0.6 + w); box(x, -4, -s * 0.3, 8, s * 0.5, '#c98e5a', 2); x.rotate(1.2 - 2 * w); box(x, -4, -s * 0.3, 8, s * 0.5, '#c98e5a', 2); x.restore() }
const auntie = (x, t, P) => { glasses(x, P, 'cancer'); needles(x, t, P, 'cancer') }
const arctic = (x, t) => { room(x, { wall: '#bfe6ff', floor: '#8fb6d8', trim: '#5a7a9a' }); for (let k = 0; k < 30; k++) { const ph = (t * 0.3 + k * 0.07) % 1; x.fillStyle = 'rgba(255,255,255,0.8)'; x.fillRect((k * 131) % 1080, ph * 1390, 8, 8) } box(x, 140, 340, 260, 40, '#dfe9f0', 4); txt(x, 'AC: 62°', 820, 520, { size: 56, col: '#2b5fb0', font: MONO, weight: 700 }) }

export const EP = ep(5, {
  hook: '5 sleeps left. | Cancer knit you | a sweater.',
  hookSet: (x, t) => set(x, t),
  hookFront: (x, t, lt, P) => auntie(x, t, P),
  hookCast: C({ cancer: [[0, L, Y, 270], [2.6, L, Y, 270]] }), hookMood: { cancer: 'happy' }, hookLook: { cancer: [0, 0] },
  calX: 560, calY: 820, calS: 0.6,
  scenes: [
    { dur: 3.4, set, front: (x, t, lt, P) => auntie(x, t, P), cast: C({ cancer: [M - 80, Y, 300] }), mood: { cancer: 'happy' }, look: { cancer: [0, 0] },
      lines: [[0.15, 1.5, 'cancer', "it's 80° out. | I know."], [1.8, 1.4, 'cancer', 'I know, baby.']] },
    { dur: 3.4, set: arctic, front: (x, t, lt, P) => glasses(x, P, 'cancer'), cast: C({ cancer: [M, Y, 280] }), mood: { cancer: 'squint' }, look: { cancer: [0, 0] },
      lines: [[0.2, 2.8, 'cancer', 'but inside? | the AC is ARCTIC.']] },
    { dur: 3.6, set, front: (x, t, lt, P) => { glasses(x, P, 'cancer'); if (lt > 1.0) sweater(x, P, 'leo', GOLD, 'star') }, cast: C({ cancer: [L, Y, 240], leo: [R, Y, 230] }), mood: { cancer: 'happy', leo: lt => lt > 1.0 ? 'sparkle' : 'happy' },
      lines: [[0.2, 1.3, 'leo', 'is mine | gold?'], [1.7, 1.4, 'cancer', 'of course | it\'s gold.']] },
    { dur: 3.6, set, front: (x, t, lt, P) => { glasses(x, P, 'cancer'); if (lt > 1.0) sweater(x, P, 'scorpio', '#1b1236') }, cast: C({ cancer: [L, Y, 240], scorpio: [R, Y, 230] }), mood: { cancer: 'wink', scorpio: lt => lt > 1.0 ? 'heart' : 'neutral' },
      lines: [[0.2, 1.3, 'scorpio', 'black?'], [1.7, 1.4, 'cancer', 'six kinds, | baby.']] },
    { dur: 3.4, set, front: (x, t, lt, P) => { glasses(x, P, 'cancer'); sweater(x, P, 'pisces', '#7a9aff', 'fish') }, cast: C({ cancer: [L, Y, 240], pisces: [R, Y, 230] }), mood: { cancer: 'heart', pisces: 'heart' },
      lines: [[0.3, 2.6, 'pisces', 'it has a | little FISH.']] },
    { dur: 3.6, set: (x, t, lt) => (lt < 1.6 ? set : arctic)(x, t), front: (x, t, lt, P) => { if (lt > 2.2) sweater(x, P, 'aries', BRAKE) }, cast: C({ aries: [[0, 300, Y, 240], [1.6, 540, Y, 240]] }), mood: { aries: lt => lt < 1.6 ? 'squint' : lt < 2.2 ? 'wide' : 'happy' },
      lines: [[0.2, 1.2, 'aries', 'too hot!'], [2.3, 1.2, 'aries', '...okay.']] },
    { dur: 3.6, set, front: (x, t, lt, P) => auntie(x, t, P), cast: C({ cancer: [M - 80, Y, 300] }), mood: { cancer: 'happy' }, look: { cancer: [0, 0] },
      lines: [[0.15, 1.6, 'cancer', 'take care of | your people'], [1.9, 1.6, 'cancer', 'in small | ways.']] },
  ],
  stamp: { set, front: (x, t, lt, P) => { glasses(x, P, 'cancer'); sweater(x, P, 'pisces', '#7a9aff', 'fish') }, cast: C({ cancer: [L, Y, 240], pisces: [R, Y, 210] }), mood: { cancer: 'heart', pisces: 'heart' }, look: { cancer: [0, 0] },
    lines: [[1.2, 2.2, 'cancer', 'bring your | sweater.']] },
  line: 'Bring a sweater. Trust Cancer.', stars: ['cancer', 'pisces', 'leo', 'scorpio'],
})
