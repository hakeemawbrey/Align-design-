// hst418 · 11 days · Leo vs the humidity (3 hours on the hair, 3 seconds outside) · house
import { ep, C, Y, Kp, clamp, prog, box, txt, sparkles, GOLD, BONE, PINK, INK, MONO, SKYB, MINT, BRAKE, mirror, room, frizz, sweat, heatSun, skyFill, daySky, outside, skyline, sunHat, sweater, thermo } from './w17.js'

const L = 300, R = 780, M = 540
const MANE = '#ffb347'
const salon = (x, t) => { room(x, { wall: '#3a2a52', floor: '#2a2236', trim: '#1b1236' }); mirror(x, 760, 760, 360, 520, t, true) }
const outdoors = (x, t, lt) => { daySky(x, t); x.fillStyle = 'rgba(255,200,120,0.25)'; x.fillRect(0, 0, 1080, 1390); heatSun(x, 860, 420, t, 80); skyline(x, 1390, t, { alpha: 0.6, col: '#6a6a9a' }); outside(x, { ground: '#8a7a6a' }); for (let k = 0; k < 14; k++) { const y = 500 + (k * 61) % 800; x.strokeStyle = 'rgba(255,255,255,0.2)'; x.lineWidth = 4; x.beginPath(); x.moveTo(0, y); for (let xx = 0; xx <= 1080; xx += 60) x.lineTo(xx, y + Math.sin(xx * 0.03 + t * 6 + k) * 8); x.stroke() } }
const office = (x, t) => { room(x, { wall: '#9ac4d8', floor: '#5a6a7a', trim: '#2a3a4a' }); for (let k = 0; k < 3; k++) { box(x, 150 + k * 300, 330, 180, 30, '#dfe9f0', 4); for (let j = 0; j < 4; j++) { const ph = (t * 0.8 + j / 4 + k * 0.3) % 1; x.fillStyle = `rgba(143,227,255,${(0.7 * (1 - ph)).toFixed(2)})`; x.fillRect(170 + k * 300 + j * 40, 370 + ph * 200, 8, 30) } } txt(x, '64°', 900, 560, { size: 60, col: '#2b5fb0', font: MONO, weight: 700 }) }
const mane = amt => (x, t, lt, P) => frizz(x, P, 'leo', typeof amt === 'function' ? amt(lt) : amt, MANE)

export const EP = ep(11, {
  hook: '11 days left. | Leo vs the humidity.',
  hookSet: (x, t) => salon(x, t),
  hookBack: (x, t, lt, P) => frizz(x, P, 'leo', 0.4 + 0.5 * Math.abs(Math.sin(lt * 3)), MANE),
  hookCast: C({ leo: [L, Y, 270] }), hookMood: { leo: 'wide' }, hookLook: { leo: [0, 0] },
  calX: 760, calY: 760, calS: 0.62,
  scenes: [
    { dur: 3.4, set: salon, back: mane(0.15), cast: C({ leo: [M - 120, Y, 300] }), mood: { leo: 'sparkle' }, look: { leo: [0, 0] },
      lines: [[0.15, 1.5, 'leo', 'my hair took | three hours.'], [1.8, 1.4, 'leo', 'look at | this shine.']] },
    { dur: 3.6, set: outdoors, back: mane(lt => 0.15 + 1.2 * clamp((lt - 0.8) / 1.2)), front: (x, t, lt, P) => { const [cx, cy, s] = P.at('leo'); sweat(x, cx, cy - s * 0.6, t) }, cast: C({ leo: [M, Y, 260] }), mood: { leo: lt => lt > 1.2 ? 'wide' : 'happy' },
      lines: [[0.2, 1.0, 'leo', '*steps | outside*'], [2.0, 1.4, 'leo', '...three | seconds.']], stick: [[1.4, 1.6, 'HUMIDITY: YES', SKYB]] },
    { dur: 3.4, set: outdoors, back: (x, t, lt, P) => frizz(x, P, 'leo', 1.3, MANE), cast: C({ gemini: [L - 40, Y, 220], leo: [R, Y, 230] }), mood: { gemini: 'wink', leo: 'squint' },
      lines: [[0.2, 1.4, 'gemini', "it's not | the heat..."], [1.8, 1.2, 'leo', "DON'T."]] },
    { dur: 3.4, set: salon, front: (x, t, lt, P) => sunHat(x, P, 'leo', '#ffd36b'), cast: C({ leo: [L, Y, 240], virgo: [R - 80, Y, 220] }), mood: { leo: 'neutral', virgo: 'happy' },
      lines: [[0.2, 1.4, 'leo', 'a hat? | on ME?'], [1.8, 1.4, 'virgo', 'hats are | valid.']] },
    { dur: 3.6, set: office, back: mane(lt => 1.3 - 1.2 * clamp(lt / 1.4)), cast: C({ leo: [L, Y, 250], cancer: [R, Y, 220] }), mood: { leo: lt => lt > 1.4 ? 'sparkle' : 'wide', cancer: 'happy' },
      lines: [[0.4, 1.4, 'leo', 'the AC | fixed it!'], [2.0, 1.4, 'cancer', 'bring | a sweater.']] },
    { dur: 3.6, set: outdoors, back: (x, t, lt, P) => frizz(x, P, 'leo', 1.4, MANE), front: (x, t, lt) => { if (lt > 0.6) sparkles(x, t, M, Y - 80, t - lt + 0.6, 12, 300, 3) }, cast: C({ leo: [M, Y, 260] }), mood: { leo: 'sparkle' }, hops: { leo: [0.6, 1.2] },
      lines: [[0.4, 2.8, 'leo', 'actually? | this is the look.']], stick: [[0.2, 1.4, 'VOLUME: ICONIC', GOLD]] },
    { dur: 3.6, set: salon, back: mane(1.0), cast: C({ leo: [M - 120, Y, 290] }), mood: { leo: 'happy' }, look: { leo: [0, 0] },
      lines: [[0.15, 1.6, 'leo', 'the humidity | always wins.'], [1.9, 1.6, 'leo', 'confidence | wins more.']] },
  ],
  stamp: { set: outdoors, back: (x, t, lt, P) => frizz(x, P, 'leo', 1.2, MANE), cast: C({ leo: [L, Y, 240], gemini: [R, Y, 210] }), mood: { leo: 'sparkle', gemini: 'heart' }, look: { leo: [0, 0] },
    lines: [[1.2, 2.2, 'leo', 'big hair. | bigger night.']] },
  line: 'Big hair. Bigger night.', stars: ['leo', 'gemini', 'virgo', 'cancer'],
})
