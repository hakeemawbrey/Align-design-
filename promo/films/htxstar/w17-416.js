// hst416 · 13 days · Aquarius invented a dance: "the Feeder Road" (park lawn, string lights) · chiptune
import { ep, C, Y, Kp, clamp, prog, box, txt, sparkles, GOLD, BONE, PINK, INK, MONO, SKYB, MINT, LAV, BRAKE, lawn, shades, streetSign } from './w17.js'

const L = 300, R = 780, M = 540
const set = (x, t) => lawn(x, t, { dusk: true })
const move = (name, sub) => (x, t, lt) => { set(x, t); const k = Kp(lt, 0.05); if (k > 0) { x.save(); x.translate(M, 560); x.scale(k, k); x.rotate(-0.03); box(x, -260, -70, 520, 140, '#1c1240', 6); txt(x, name, 0, -14, { size: 52, col: GOLD }); txt(x, sub, 0, 40, { size: 28, col: BONE, font: MONO, weight: 700 }); x.restore() } }
const arrow = (x, t, cx, cy, dir) => { const b = Math.sin(t * 8) * 10; x.fillStyle = GOLD; x.beginPath(); x.moveTo(cx + dir * (60 + b), cy); x.lineTo(cx + dir * (b), cy - 40); x.lineTo(cx + dir * (b), cy + 40); x.fill(); x.strokeStyle = INK; x.lineWidth = 5; x.stroke() }
const dance = (cx, amp = 90, per = 0.6, n = 6, s = 260) => { const k = [[0, cx, Y, s]]; for (let i = 1; i <= n; i++) k.push([i * per, cx + (i % 2 ? amp : -amp) * 0.5, Y, s]); return k }

export const EP = ep(13, {
  hook: 'Aquarius invented | a new dance. | 13 days left.',
  hookSet: (x, t) => { set(x, t); streetSign(x, 800, 1010, 'DOWNTOWN', { pole: false }) },
  hookCast: C({ aquarius: dance(L, 120, 0.35, 8, 270) }), hookMood: { aquarius: 'sparkle' }, hookLook: { aquarius: [0, 0] },
  hookHops: { aquarius: [0.02, 0.37, 0.72, 1.07, 1.42, 1.77, 2.12, 2.47] },
  calX: 800, calY: 760, calS: 0.62,
  cues: [['pop', 0.37, 784, 0.015, 0], ['pop', 0.72, 988, 0.015, 0], ['pop', 1.07, 1175, 0.015, 0]],
  scenes: [
    { dur: 3.4, set, cast: C({ aquarius: [M, Y, 300] }), mood: { aquarius: 'wink' }, look: { aquarius: [0, 0] },
      lines: [[0.15, 1.5, 'aquarius', "you'll learn | this. it's"], [1.8, 1.4, 'aquarius', 'called: the | Feeder Road.']] },
    { dur: 3.4, set: move('MOVE 1', 'SIGNAL LEFT. GO STRAIGHT.'), front: (x, t) => arrow(x, t, 200, 1000, -1), cast: C({ aquarius: [[0, M, Y, 270], [1.6, M, Y, 270], [2.6, M + 160, Y, 270]] }), mood: { aquarius: 'sparkle' },
      lines: [[0.6, 2.4, 'aquarius', 'blink left... | ...go straight.']] },
    { dur: 3.4, set: move('MOVE 2', 'THE TEXAS U-TURN'), cast: C({ aquarius: [[0, 300, Y, 270], [1.2, 780, Y, 270], [2.4, 300, Y - 120, 270], [3.0, 300, Y, 270]] }), mood: { aquarius: 'wide' },
      lines: [[0.4, 1.6, 'aquarius', 'and | U-TURN!']] },
    { dur: 3.6, set, cast: C({ aries: dance(L - 60, 200, 0.2, 16, 220), virgo: [R + 40, Y, 220] }), mood: { aries: 'sparkle', virgo: 'squint' },
      lines: [[0.2, 1.3, 'aries', 'faster?!'], [1.7, 1.6, 'virgo', '5, 6, 7, 8. | ON the beat.']] },
    { dur: 3.6, set, cast: C({ taurus: [L, Y, 230], aquarius: [R, Y, 240] }), mood: { taurus: 'squint', aquarius: 'eyeroll' },
      lines: [[0.2, 1.5, 'taurus', 'is this just | the two-step?'], [1.9, 1.5, 'aquarius', "it's the FUTURE | two-step."]] },
    { dur: 3.4, set, cast: C({ pisces: dance(M, 100, 0.4, 8, 260) }), mood: { pisces: 'heart' },
      lines: [[0.4, 2.4, 'pisces', "I'm dancing | AND crying."]], stick: [[0.1, 1.4, 'ZYDECO REMIX', MINT]] },
    { dur: 3.6, set, cast: C({ aquarius: [M, Y, 300] }), mood: { aquarius: 'happy' }, look: { aquarius: [0, 0] },
      lines: [[0.15, 1.6, 'aquarius', 'dance badly. | dance anyway.'], [1.9, 1.6, 'aquarius', "nobody's | grading."]] },
  ],
  stamp: { set, cast: C({ aquarius: dance(L, 80, 0.4, 8, 240), pisces: dance(R, 80, 0.4, 8, 210) }), mood: { aquarius: 'sparkle', pisces: 'heart' }, look: { aquarius: [0, 0] },
    lines: [[1.2, 2.2, 'aquarius', 'learn it by | Jan 9.']] },
  line: 'Learn the Feeder Road by Jan 9.', stars: ['aquarius', 'pisces', 'taurus', 'aries'],
})
