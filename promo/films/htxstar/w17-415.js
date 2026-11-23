// hst415 · 14 days · Two weeks out, Auntie Cancer is cooking (and asking the Houston questions) · lofi
import { ep, C, Y, Kp, clamp, prog, box, txt, sparkles, heart, GOLD, BONE, PINK, INK, MONO, SKYB, MINT, BRAKE, kitchen, soupPot, glasses, thermo } from './w17.js'

const L = 300, R = 780, M = 540
const set = (x, t) => { kitchen(x, t, { wall: '#e8c8a0' }); soupPot(x, t, 860, 1100) }
const aunties = (x, P) => { glasses(x, P, 'cancer'); if (P.at('taurus')) glasses(x, P, 'taurus', PINK) }
const containers = (x, t, lt) => { for (let i = 0; i < 5; i++) { const k = Kp(lt, 0.2 + i * 0.25); if (k <= 0) continue; x.save(); x.translate(380 + (i % 3) * 160, 1110 - Math.floor(i / 3) * 90); x.scale(k, k); box(x, -60, -36, 120, 72, '#f4efe4', 4); x.fillStyle = [BRAKE, SKYB, MINT, GOLD, PINK][i]; x.fillRect(-60, -36, 120, 16); x.restore() } }

export const EP = ep(14, {
  hook: 'Two weeks out. | Auntie Cancer | is cooking.',
  hookSet: (x, t) => set(x, t),
  hookFront: (x, t, lt, P) => aunties(x, P),
  hookCast: C({ cancer: [[0, L, Y, 270], [1.3, L + 40, Y, 270]] }), hookMood: { cancer: 'happy' }, hookLook: { cancer: [0, 0] },
  calX: 760, calY: 720, calS: 0.62,
  scenes: [
    { dur: 3.4, set, front: (x, t, lt, P) => aunties(x, P), cast: C({ cancer: [M - 80, Y, 300] }), mood: { cancer: 'happy' }, look: { cancer: [0, 0] },
      lines: [[0.15, 1.5, 'cancer', 'baby, you | eating?'], [1.8, 1.4, 'cancer', 'come in, | come in.']] },
    { dur: 3.4, set, front: (x, t, lt, P) => aunties(x, P), cast: C({ cancer: [M - 80, Y, 300] }), mood: { cancer: 'squint' }, look: { cancer: [0, 0] },
      lines: [[0.2, 2.8, 'cancer', 'nobody goes | to a party hungry.']] },
    { dur: 3.6, set, front: (x, t, lt, P) => aunties(x, P), cast: C({ taurus: [L, Y, 240], cancer: [R - 80, Y, 230] }), mood: { taurus: 'squint', cancer: 'happy' },
      lines: [[0.2, 1.5, 'taurus', "where'd you go | to high school?"], [1.9, 1.5, 'cancer', 'and where are you | from originally?']] },
    { dur: 3.6, set: (x, t, lt) => { set(x, t); thermo(x, 300, 620, '81°', Kp(lt, 1.6)) }, front: (x, t, lt, P) => aunties(x, P), cast: C({ gemini: [L, Y, 220], cancer: [R - 80, Y, 240] }), mood: { gemini: 'eyeroll', cancer: 'squint' },
      lines: [[0.2, 1.4, 'cancer', "it's soup | weather."], [1.8, 1.5, 'gemini', "Auntie, | it's 81."]] },
    { dur: 3.4, set, front: (x, t, lt, P) => aunties(x, P), cast: C({ gemini: [L, Y, 220], cancer: [R - 80, Y, 240] }), mood: { gemini: 'wide', cancer: 'wink' },
      lines: [[0.2, 2.8, 'cancer', 'soup weather | is a feeling.']] },
    { dur: 3.6, set: (x, t, lt) => { set(x, t); containers(x, t, lt) }, front: (x, t, lt, P) => aunties(x, P), cast: C({ cancer: [180, Y, 230] }), mood: { cancer: 'heart' },
      lines: [[1.6, 1.8, 'cancer', 'take some for | your roommate.']] },
    { dur: 3.6, set, front: (x, t, lt, P) => aunties(x, P), cast: C({ cancer: [M - 80, Y, 300] }), mood: { cancer: 'happy' }, look: { cancer: [0, 0] },
      lines: [[0.15, 1.6, 'cancer', 'before the party, | check on'], [1.9, 1.6, 'cancer', 'your friends. | text them.']] },
  ],
  stamp: { set, front: (x, t, lt, P) => aunties(x, P), cast: C({ cancer: [L, Y, 240], taurus: [R - 60, Y, 220] }), mood: { cancer: 'heart', taurus: 'heart' }, look: { cancer: [0, 0] },
    lines: [[1.2, 2.2, 'cancer', 'eat first. | then we dance.']] },
  line: 'Eat first. Then Jan 9.', stars: ['cancer', 'taurus', 'gemini', 'pisces'],
})
