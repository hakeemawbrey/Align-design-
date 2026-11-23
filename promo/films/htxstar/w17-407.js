// hst407 · 22 days · Gemini made 4 group chats · a giant phone over the skyline · chiptune
import { ep, C, Y, Kp, clamp, box, txt, sparkles, GOLD, BONE, PINK, INK, MONO, SKYB, MINT, LAV, BRAKE, night, bigPhone, heldPhone, tissues } from './w17.js'

const L = 300, R = 780, M = 540
const P1 = [[1, 'JAN 9 !!!', '#ffd36b'], [1, 'JAN 9 (real one)', '#7dffb0'], [1, 'jan 9 no leo', '#ff8fb1'], [1, 'JAN 9 RIDES', '#8fe3ff']]
const chats = (x, t, lt, k = 1) => { bigPhone(x, M, 720, 620, 560, "GEMINI'S CHATS", P1.map(([s, w, c]) => [-1, w, c]), lt, { every: 0.35 }) }
const set = (x, t) => night(x, t, '#1e2a3a')

export const EP = ep(22, {
  hook: 'Gemini made | 4 group chats. | 22 days left.',
  hookSet: (x, t, lt) => { set(x, t); bigPhone(x, 300, 860, 400, 420, 'JAN 9 !!!', [[-1, 'who in'], [1, 'ME'], [-1, 'me x2'], [1, 'ok wait'], [-1, 'new chat']], lt + 0.6, { every: 0.3 }) },
  hookFront: (x, t, lt, P) => heldPhone(x, P, 'gemini', 1),
  hookCast: C({ gemini: [[0, R, Y, 260], [1.3, R - 40, Y, 260], [2.6, R, Y, 260]] }), hookMood: { gemini: 'sparkle' }, hookLook: { gemini: [0, 0] },
  calX: 790, calY: 760, calS: 0.7,
  cues: [['pop', 0.35, 1046, 0.02, 0], ['pop', 0.65, 1175, 0.02, 0], ['pop', 0.95, 1318, 0.02, 0]],
  scenes: [
    { dur: 3.4, set, front: (x, t, lt, P) => heldPhone(x, P, 'gemini', 1), cast: C({ gemini: [M, Y, 300] }), mood: { gemini: 'wink' }, look: { gemini: [0, 0] },
      lines: [[0.15, 1.5, 'gemini', 'I added you | to a group chat.'], [1.8, 1.3, 'gemini', 'four, | actually.']] },
    { dur: 3.6, set: (x, t, lt) => { set(x, t); chats(x, t, lt) }, cast: C({ gemini: [200, Y + 40, 200] }), mood: { gemini: 'happy' },
      lines: [[1.6, 1.8, 'gemini', 'one chat | per mood.']] },
    { dur: 3.6, set: (x, t, lt) => { set(x, t); bigPhone(x, M, 640, 560, 380, 'jan 9 no leo', [[-1, 'shh'], [1, 'surprise?']], 9) }, cast: C({ leo: [L, Y, 250], gemini: [R, Y, 220] }), mood: { leo: 'wide', gemini: 'wide' },
      lines: [[0.2, 1.4, 'leo', 'I SEE | THIS ONE.'], [1.8, 1.6, 'gemini', "...it's a surprise | for you?"]] },
    { dur: 3.6, set: (x, t, lt) => { set(x, t); bigPhone(x, M, 640, 560, 420, 'JAN 9 RIDES', [[-1, "who's in Katy?"], [1, 'my cousin'], [-1, 'my cousin too'], [1, 'everyone has one']], lt, { every: 0.5 }) },
      cast: C({ cancer: [L, Y, 230], sagittarius: [R, Y, 210] }), mood: { cancer: 'heart', sagittarius: 'happy' },
      lines: [[2.1, 1.4, 'cancer', 'my Katy cousin | wants in.']] },
    { dur: 3.6, set, cast: C({ virgo: [L, Y, 240], gemini: [R, Y, 230] }), mood: { virgo: 'squint', gemini: 'sparkle' },
      lines: [[0.2, 1.6, 'virgo', 'name the chats | by purpose.'], [2.0, 1.4, 'gemini', 'done: CHAT, | CHAT 2...']] },
    { dur: 3.4, set: (x, t, lt) => { set(x, t); tissues(x, 880, 1330, 0.9) }, cast: C({ aquarius: [L, Y, 230], pisces: [R, Y, 220] }), mood: { aquarius: 'eyeroll', pisces: 'heart' },
      lines: [[0.2, 1.4, 'aquarius', 'I left. | I came back.'], [1.8, 1.4, 'pisces', '*sends a | voice note*']] },
    { dur: 3.6, set, front: (x, t, lt, P) => heldPhone(x, P, 'gemini', 1), cast: C({ gemini: [M, Y, 300] }), mood: { gemini: 'happy' }, look: { gemini: [0, 0] },
      lines: [[0.15, 1.6, 'gemini', 'real tip: | one chat.'], [1.9, 1.6, 'gemini', 'add the people | you love.']] },
    { dur: 3.0, set: (x, t, lt) => { set(x, t); const m = clamp(lt / 1.2); for (let i = 0; i < 4; i++) { const a = i * Math.PI / 2 + 0.6, r = 300 * (1 - m); box(x, M + Math.cos(a) * r - 80, 720 + Math.sin(a) * r * 0.6 - 140, 160, 280, [GOLD, MINT, PINK, SKYB][i], 6) } if (lt > 1.2) { box(x, M - 140, 560, 280, 320, GOLD, 8); txt(x, 'JAN 9', M, 720, { size: 70, col: INK }); sparkles(x, t, M, 720, t - lt + 1.2, 12, 260, 6) } },
      cast: C({ gemini: [M, Y + 20, 240] }), mood: { gemini: 'sparkle' }, hops: { gemini: [1.2, 1.6] },
      lines: [[1.4, 1.5, 'gemini', 'merged. | ONE chat.']] },
  ],
  stamp: { set, cast: C({ gemini: [L, Y, 240], leo: [R, Y, 210] }), mood: { gemini: 'sparkle', leo: 'heart' }, look: { gemini: [0, 0] },
    lines: [[1.2, 2.2, 'gemini', 'see you in | the chat. and IRL.']] },
  line: 'One chat. One night. Jan 9.', stars: ['gemini', 'leo', 'cancer', 'pisces'],
})
