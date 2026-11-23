// hst406 · 23 days · Leo's outfit crisis (80° in January) · Heights bedroom mirror · pop
import { ep, C, Y, Kp, clamp, box, txt, label, sparkles, GOLD, BONE, PINK, INK, MONO, SKYB, LAV, BRAKE, bedroom, mirror, rack, heatSun, sweat, thermo, puffer, sweater, scarf, streetSign, bigWindow, skyFill } from './w17.js'

const L = 300, R = 780, M = 540
const set = (x, t) => { bedroom(x, t, { wall: '#5a2a4a', floor: '#6a4a2a' }); mirror(x, 800, 860, 300, 560, t); rack(x, 40, 1000, ['#7a3ac9', '#e05a3a', GOLD, '#f4e1b0']) }
const hotWin = (x, t) => bigWindow(x, 210, 560, 300, 380, t, (cx, cy, w, h) => { skyFill(x, '#6fb6ff', '#ffe2a8', cy - h / 2, cy + h / 2); heatSun(x, cx, cy - 30, t, 70) })
const velvet = (x, P) => sweater(x, P, 'leo', '#6a2a9a')
const sequins = (x, t, P) => { const [cx, cy, s] = P.at('leo'); sweater(x, P, 'leo', '#c9a6ff'); for (let k = 0; k < 10; k++) { const a = 0.5 + 0.5 * Math.sin(t * 9 + k * 2); x.fillStyle = `rgba(255,255,255,${a.toFixed(2)})`; x.fillRect(cx - s * 0.26 + (k * 37) % (s * 0.5), cy + s * 0.1 + (k * 23) % (s * 0.2), 8, 8) } }
const fan = (x, t, cx, cy) => { box(x, cx - 8, cy, 16, 120, '#8f96a0', 4); x.save(); x.translate(cx, cy); x.rotate(t * 20); for (let k = 0; k < 3; k++) { x.rotate(Math.PI * 2 / 3); box(x, -10, -70, 20, 60, SKYB, 3) } x.restore() }
const linen = (x, P) => { sweater(x, P, 'leo', '#f4e1b0'); scarf(x, P, 'leo', GOLD) }

export const EP = ep(23, {
  hook: 'Your Leo, 23 days out: | the outfit crisis',
  hookSet: (x, t) => { set(x, t); streetSign(x, 210, 330 + 470, 'THE HEIGHTS', { pole: false }) },
  hookFront: (x, t, lt, P) => velvet(x, P),
  hookCast: C({ leo: [[0, L, Y, 270], [1.2, L + 60, Y, 270], [2.4, L, Y, 270]] }), hookMood: { leo: 'sparkle' }, hookLook: { leo: [0, 0] },
  calX: 800, calY: 820, calS: 0.75,
  scenes: [
    { dur: 3.4, set, front: (x, t, lt, P) => velvet(x, P), cast: C({ leo: [M, Y, 300] }), mood: { leo: 'wide' }, look: { leo: [0, 0] },
      lines: [[0.15, 1.5, 'leo', 'be honest | with me.'], [1.8, 1.4, 'leo', 'is this | a lot?']], stick: [[0.1, 1.6, 'LOOK 1: VELVET', LAV]] },
    { dur: 3.4, set: (x, t) => { set(x, t); hotWin(x, t) }, front: (x, t, lt, P) => { velvet(x, P); const [cx, cy, s] = P.at('leo'); sweat(x, cx, cy - s * 0.5, t); thermo(x, 820, 600, '81°', Kp(lt, 0.1)) },
      cast: C({ leo: [L + 60, Y, 260] }), mood: { leo: 'squint' },
      lines: [[0.4, 2.6, 'leo', 'velvet. in Houston. | in January.']] },
    { dur: 3.6, set, front: (x, t, lt, P) => puffer(x, P, 'leo', '#e05a3a'), cast: C({ leo: [L, Y, 250], gemini: [R, Y, 210] }), mood: { leo: 'sparkle', gemini: 'eyeroll' },
      lines: [[0.2, 1.6, 'leo', 'the one 55° day | might happen!'], [2.0, 1.3, 'gemini', "it won't."]], stick: [[0.1, 1.5, 'LOOK 2: PUFFER', SKYB]] },
    { dur: 3.6, set, front: (x, t, lt, P) => { sequins(x, t, P); fan(x, t, 140, 1200) }, cast: C({ leo: [L + 40, Y, 250], virgo: [R, Y, 210] }), mood: { leo: 'wink', virgo: 'squint' },
      lines: [[0.2, 1.5, 'leo', 'sequins breathe, | right?'], [1.9, 1.4, 'virgo', 'they do | not.']], stick: [[0.1, 1.5, 'LOOK 3: SEQUINS', GOLD]] },
    { dur: 3.6, set, front: (x, t, lt, P) => sequins(x, t, P), cast: C({ leo: [L, Y, 250], taurus: [R, Y, 220] }), mood: { leo: 'eyeroll', taurus: 'happy' },
      lines: [[0.2, 1.5, 'taurus', 'linen. linen is | the answer.'], [1.9, 1.5, 'leo', 'linen is for | porches, Taurus.']] },
    { dur: 3.6, set, front: (x, t, lt, P) => sequins(x, t, P), cast: C({ leo: [L, Y, 250], libra: [R, Y, 220] }), mood: { leo: lt => lt > 2 ? 'sparkle' : 'neutral', libra: 'wink' },
      lines: [[0.2, 1.7, 'libra', 'and a sweater | for the arctic AC.'], [2.1, 1.3, 'leo', "...that's | genius."]] },
    { dur: 3.4, set, front: (x, t, lt, P) => { linen(x, P); if (lt > 0.3) sparkles(x, t, M, Y - 60, t - lt + 0.3, 12, 260, 5) }, cast: C({ leo: [M, Y, 300] }), mood: { leo: 'sparkle' }, hops: { leo: [0.3, 0.9] },
      lines: [[1.2, 1.9, 'leo', 'linen. gold sweater | on the shoulders.']], stick: [[0.1, 1.2, 'LOOK 47: PERFECT', PINK]] },
    { dur: 3.6, set, front: (x, t, lt, P) => linen(x, P), cast: C({ leo: [M, Y, 300] }), mood: { leo: 'happy' }, look: { leo: [0, 0] },
      lines: [[0.15, 1.6, 'leo', "you don't need | a new outfit."], [1.9, 1.6, 'leo', 'wear what feels | like you.']] },
  ],
  stamp: { set, front: (x, t, lt, P) => linen(x, P), cast: C({ leo: [L, Y, 240], taurus: [R, Y, 210] }), mood: { leo: 'sparkle', taurus: 'heart' }, look: { leo: [0, 0] },
    lines: [[1.2, 2.2, 'leo', '23 days to | perfect it anyway.']] },
  line: 'Dress for 80°. Shine anyway.', stars: ['leo', 'libra', 'taurus', 'virgo'],
})
