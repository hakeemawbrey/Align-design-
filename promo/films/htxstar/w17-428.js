// hst428 · 1 day · Tomorrow: Pisces can't sleep (city glow, everyone's awake too) · synthwave
import { ep, C, Y, G, Kp, clamp, prog, box, txt, sparkles, heart, signChar, GOLD, BONE, PINK, INK, MONO, SKYB, MINT, LAV, BRAKE, bedroom, skyline, outside, skyFill, heldPhone, room } from './w17.js'

const L = 300, R = 780, M = 540
const bed = (x) => { box(x, 520, 1220, 520, 110, '#5a6aa8', 6); box(x, 540, 1170, 160, 60, BONE, 5); box(x, 500, 1180, 30, 210, '#6b3b1f', 5); box(x, 1030, 1220, 30, 170, '#6b3b1f', 5) }
const set = (x, t) => { bedroom(x, t, { wall: '#1e1a3a', floor: '#2a2236', glow: '#ff8a6a' }); bed(x); x.fillStyle = 'rgba(10,6,30,0.35)'; x.fillRect(0, 0, 1080, 1920) }
const glow = (x, t) => { skyFill(x, '#120a30', '#ff7a6a', 0, G); skyline(x, G, t, { alpha: 1, col: '#1a1038', lit: '#ffd36b' }); outside(x, { ground: '#1a1030' }) }
const WIN = [['aries', 150, 760], ['leo', 330, 640], ['capricorn', 450, 560], ['cancer', 600, 700], ['gemini', 770, 520], ['virgo', 880, 760], ['libra', 230, 1000], ['scorpio', 700, 960]]
const windows = (x, t, lt) => WIN.forEach(([id, wx, wy], i) => { const k = Kp(lt, 0.2 + i * 0.12); if (k <= 0) return; box(x, wx - 62, wy - 62, 124, 124, '#ffd36b', 5); signChar(x, t, id, wx, wy + 6, 100 * k, { mood: 'happy', seed: 50 + i, hops: [t - lt + 0.3 + i * 0.12] }) })

export const EP = ep(1, {
  hook: 'Tomorrow, Houston. | Pisces can\'t sleep.',
  hookSet: (x, t) => set(x, t),
  hookCast: C({ pisces: [[0, 720, 1130, 250], [1.2, 720, 1110, 250], [2.4, 720, 1130, 250]] }), hookMood: { pisces: 'heart' }, hookLook: { pisces: [0, 0] },
  calX: 540, calY: 760, calS: 0.6,
  endLen: 6.4,
  scenes: [
    { dur: 3.4, set, front: (x, t, lt, P) => heldPhone(x, P, 'pisces', -1, '#ffd36b'), cast: C({ pisces: [720, 1120, 280] }), mood: { pisces: 'wide' }, look: { pisces: [0, 0] },
      lines: [[0.15, 1.5, 'pisces', 'are you | awake?'], [1.8, 1.4, 'pisces', "I'm | awake."]] },
    { dur: 3.8, set: glow, cast: C({ pisces: [M, Y, 280] }), mood: { pisces: 'neutral' }, look: { pisces: [0, -1] },
      lines: [[0.2, 1.7, 'pisces', "you can't see | stars in Houston."], [2.1, 1.5, 'pisces', 'the city glow. | too bright.']], stick: [[0.1, 1.6, '✓ REAL: LIGHT POLLUTION', MINT]] },
    { dur: 3.8, set: (x, t, lt) => { glow(x, t); windows(x, t, lt) }, cast: C({ pisces: [M, Y + 40, 220] }), mood: { pisces: 'heart' },
      lines: [[1.6, 2.0, 'pisces', 'oh. EVERYONE | is awake.']] },
    { dur: 3.4, set: (x, t, lt) => { glow(x, t); windows(x, t, 9) }, cast: C({ capricorn: [L, Y + 40, 220], pisces: [R, Y + 40, 220] }), mood: { capricorn: 'squint', pisces: 'heart' },
      lines: [[0.2, 1.4, 'capricorn', 'sleep. | that IS the plan.'], [1.8, 1.4, 'pisces', 'okay, | okay.']] },
    { dur: 3.4, set: (x, t, lt) => { glow(x, t); windows(x, t, 9) }, cast: C({ leo: [L, Y + 40, 220], cancer: [R, Y + 40, 220] }), mood: { leo: 'sparkle', cancer: 'happy' },
      lines: [[0.2, 1.4, 'leo', "outfit's | on the chair."], [1.8, 1.4, 'cancer', 'you ate, | baby?']] },
    { dur: 3.6, set, cast: C({ pisces: [720, 1120, 280] }), mood: { pisces: 'heart' }, look: { pisces: [0, 0] },
      lines: [[0.15, 1.6, 'pisces', 'tomorrow, | come as you are.'], [1.9, 1.6, 'pisces', "that's | enough."]] },
  ],
  stamp: { set: glow, front: (x, t, lt) => { if (lt > 0.6) for (let k = 0; k < 3; k++) heart(x, 300 + k * 240, 1020 - ((lt * 60 + k * 40) % 120), 7) }, cast: C({ pisces: [L, Y, 240], scorpio: [R, Y, 220] }), mood: { pisces: 'heart', scorpio: 'heart' }, look: { pisces: [0, 0] },
    lines: [[1.2, 2.2, 'pisces', 'see you | TOMORROW.']] },
  line: 'Tomorrow. Jan 9. Come as you are.', stars: ['pisces', 'scorpio', 'leo', 'cancer'],
})
