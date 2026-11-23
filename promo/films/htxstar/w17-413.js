// hst413 · 16 days · Scorpio doesn't care (they do) · a Montrose mural alley · screwed
import { ep, C, Y, Kp, clamp, prog, box, txt, sparkles, heart, GOLD, BONE, PINK, INK, MONO, SKYB, LAV, BRAKE, alley, bedroom, rack, shades, streetSign } from './w17.js'

const L = 300, R = 780, M = 540
const set = (x, t) => alley(x, t)
const notebook = (x, t, lt, open = 1) => {
  x.save(); x.translate(M, 780); x.rotate(-0.03)
  box(x, -300, -220, 600, 440, '#1c1240', 8); box(x, -280, -200, 270, 400, BONE, 3); box(x, 10, -200, 270, 400, BONE, 3)
  txt(x, 'NOT A', -145, -150, { size: 34, col: INK, font: MONO, weight: 700 }); txt(x, 'COUNTDOWN', -145, -105, { size: 32, col: INK, font: MONO, weight: 700 })
  const n = Math.min(24, Math.floor(clamp(lt / 1.8) * 24))
  for (let i = 0; i < n; i++) { const g = Math.floor(i / 5), j = i % 5; x.fillStyle = INK; if (j < 4) x.fillRect(-250 + g * 52 + j * 10, -40 + Math.floor(g / 4) * 0, 5, 60); else { x.save(); x.translate(-230 + g * 52, -10); x.rotate(-0.9); x.fillRect(-35, -3, 70, 5); x.restore() } }
  txt(x, '16', 145, -60, { size: 150, col: BRAKE }); txt(x, 'days', 145, 50, { size: 40, col: INK, font: MONO, weight: 700 }); heart(x, 145, 140, 7, BRAKE)
  x.restore()
}
const closet = (x, t) => { bedroom(x, t, { wall: '#2a2236', floor: '#1e1a28' }); rack(x, 300, 520, ['#1b1236', '#120c24', '#22183a', '#0b0820', '#1b1236', '#160f2e']); for (let i = 0; i < 6; i++) txt(x, `#${i + 1}`, 355 + i * 70, 720, { size: 24, col: BONE, font: MONO, weight: 700 }) }

export const EP = ep(16, {
  hook: '16 days left. | Scorpio doesn\'t care. | (they do)',
  hookSet: (x, t) => { set(x, t); streetSign(x, 760, 1000, 'MONTROSE', { pole: false }) },
  hookFront: (x, t, lt, P) => shades(x, P, 'scorpio'),
  hookCast: C({ scorpio: [[0, L, Y, 270], [2.6, L, Y, 270]] }), hookMood: { scorpio: 'neutral' }, hookLook: { scorpio: [0, 0] },
  calX: 760, calY: 760, calS: 0.6,
  scenes: [
    { dur: 3.4, set, front: (x, t, lt, P) => shades(x, P, 'scorpio'), cast: C({ scorpio: [M, Y, 300] }), mood: { scorpio: 'neutral' }, look: { scorpio: [0, 0] },
      lines: [[0.15, 1.5, 'scorpio', 'a party? | oh.'], [1.8, 1.4, 'scorpio', "hadn't | noticed."]] },
    { dur: 3.6, set: (x, t, lt) => { set(x, t); notebook(x, t, lt) }, cast: C({ gemini: [R + 60, Y + 20, 210] }), mood: { gemini: 'wide' },
      lines: [[1.8, 1.6, 'gemini', 'you have | a countdown.']] },
    { dur: 3.2, set, front: (x, t, lt, P) => shades(x, P, 'scorpio'), cast: C({ scorpio: [L, Y, 240], gemini: [R, Y, 220] }), mood: { scorpio: 'squint', gemini: 'wink' },
      lines: [[0.2, 1.4, 'scorpio', "that's a | grocery list."], [1.8, 1.2, 'gemini', 'sure.']] },
    { dur: 3.6, set: closet, cast: C({ leo: [L, Y, 230], scorpio: [R, Y, 240] }), mood: { leo: 'wide', scorpio: 'neutral' },
      lines: [[0.2, 1.4, 'leo', 'these are | all black.'], [1.8, 1.5, 'scorpio', 'six different | blacks.']] },
    { dur: 3.8, set, front: (x, t, lt, P) => shades(x, P, 'scorpio'), cast: C({ scorpio: [[0, 120, Y, 240], [3.4, 560, Y, 240]] }), mood: { scorpio: 'sleepy' },
      lines: [[0.3, 3.2, 'scorpio', 'act... | caaasual...']], stick: [[0.1, 1.6, 'ENTRANCE PRACTICE #31', LAV]] },
    { dur: 3.4, set, cast: C({ pisces: [L, Y, 230], scorpio: [R, Y, 240] }), mood: { pisces: 'heart', scorpio: lt => lt > 1.8 ? 'happy' : 'squint' },
      lines: [[0.2, 1.4, 'pisces', "you're | EXCITED!"], [1.8, 1.4, 'scorpio', '...a little.']] },
    { dur: 3.6, set, cast: C({ scorpio: [M, Y, 300] }), mood: { scorpio: 'happy' }, look: { scorpio: [0, 0] },
      lines: [[0.15, 1.6, 'scorpio', 'you can care | out loud.'], [1.9, 1.6, 'scorpio', "it's not | cringe."]] },
  ],
  stamp: { set, front: (x, t, lt, P) => { if (lt < 1.4) shades(x, P, 'scorpio') }, cast: C({ scorpio: [L, Y, 240], pisces: [R, Y, 210] }), mood: { scorpio: lt => lt > 1.4 ? 'heart' : 'neutral', pisces: 'heart' }, look: { scorpio: [0, 0] },
    lines: [[1.5, 2.0, 'scorpio', 'see you | there. early.']] },
  line: 'Act cool. Show up early.', stars: ['scorpio', 'pisces', 'gemini', 'leo'],
})
