// hst411 · 18 days · Aries is training (run club on the bayou trail) · house
import { ep, C, Y, Kp, clamp, box, txt, sparkles, GOLD, BONE, PINK, INK, MONO, SKYB, MINT, BRAKE, bayou, sweat, mosquito, skyFill, skyline, outside } from './w17.js'

const L = 300, R = 780, M = 540
const trail = (x, t) => bayou(x, t)
const dusk = (x, t) => bayou(x, t, { sunset: true })
const headband = (x, P, id, col = BRAKE) => { const [cx, cy, s] = P.at(id); box(x, cx - s * 0.2, cy - s * 0.2, s * 0.4, s * 0.07, col, 3) }
const run = (x0, x1, d) => [[0, x0, Y, 240], [d, x1, Y, 240]]
const dawn = (x, t) => { skyFill(x, '#1a1446', '#ffb27a', 0, 1390); skyline(x, 1100, t, { alpha: 0.8, col: '#2a2250' }); x.fillStyle = '#3f7a46'; x.fillRect(0, 1100, 1080, 290); outside(x, { ground: '#2f5a36' }); for (let k = 0; k < 8; k++) { x.fillStyle = INK; x.beginPath(); x.arc(60 + k * 140, 1100, 70, Math.PI, 0); x.fill(); x.fillStyle = '#2f6a3a'; x.beginPath(); x.arc(60 + k * 140, 1102, 62, Math.PI, 0); x.fill() } }

export const EP = ep(18, {
  hook: 'Day 18 until Jan 9: | Aries is training',
  hookSet: (x, t) => trail(x, t),
  hookFront: (x, t, lt, P) => headband(x, P, 'aries'),
  hookCast: C({ aries: run(-100, 380, 1.4), leo: [[0, -300, Y, 200], [1.8, 160, Y, 200]] }), hookMood: { aries: 'sparkle', leo: 'wide' }, hookLook: { aries: [0, 0] },
  calX: 800, calY: 820, calS: 0.7,
  scenes: [
    { dur: 3.4, set: trail, front: (x, t, lt, P) => headband(x, P, 'aries'), cast: C({ aries: [M, Y, 300] }), mood: { aries: 'sparkle' }, look: { aries: [0, 0] }, hops: { aries: [0.1, 0.5, 0.9, 1.3, 1.7, 2.1, 2.5] },
      lines: [[0.15, 1.5, 'aries', 'you. lace up. | we train.'], [1.8, 1.4, 'aries', 'for the | PARTY.']] },
    { dur: 3.6, set: dawn, front: (x, t, lt, P) => { headband(x, P, 'aries'); txt(x, '5:00 AM', 540, 560, { size: 64, col: GOLD, font: MONO, weight: 700 }) }, cast: C({ aries: run(160, 520, 3.4), capricorn: [R + 60, Y, 220] }), mood: { aries: 'squint', capricorn: 'sleepy' },
      lines: [[0.3, 1.4, 'aries', 'the park loop. | 5am.'], [1.9, 1.5, 'capricorn', 'already | ran it.']] },
    { dur: 3.4, set: (x, t) => { skyFill(x, '#ffd27a', '#ffe9c0', 0, 1390); bayou(x, t); x.fillStyle = 'rgba(255,190,90,0.25)'; x.fillRect(0, 0, 1080, 1390) }, front: (x, t, lt, P) => { for (const id of ['aries', 'gemini']) { const [cx, cy, s] = P.at(id); sweat(x, cx, cy - s * 0.55, t) } mosquito(x, 820, 640, t) },
      cast: C({ aries: [L, Y, 240], gemini: [R, Y, 220] }), mood: { aries: 'squint', gemini: 'eyeroll' },
      lines: [[0.2, 1.4, 'aries', "it's not | the heat..."], [1.8, 1.4, 'gemini', "it's the | humidity."]] },
    { dur: 3.6, set: trail, front: (x, t, lt, P) => headband(x, P, 'aries'), cast: C({ pisces: [[0, 200, Y, 220], [3.4, 340, Y, 220]], aries: [[0, 900, Y, 240], [1.2, 900, Y, 240], [2.4, 520, Y, 240]] }), mood: { pisces: 'heart', aries: 'happy' },
      lines: [[0.2, 1.3, 'pisces', 'wait | for me!'], [2.2, 1.3, 'aries', 'nobody | left behind.']] },
    { dur: 3.6, set: dusk, cast: C({ libra: [L, Y, 230], gemini: [R, Y, 220] }), mood: { libra: 'wink', gemini: 'heart' },
      lines: [[0.2, 1.4, 'libra', 'I came | for the vibes.'], [1.8, 1.5, 'gemini', 'and the cute | pace leader.']], stick: [[0.1, 1.2, 'RUN CLUB · BAYOU TRAIL', GOLD]] },
    { dur: 3.6, set: dusk, front: (x, t, lt, P) => headband(x, P, 'aries'), cast: C({ aries: [[0, 300, Y, 240], [0.6, 420, Y, 240], [1.2, 300, Y, 240], [1.8, 420, Y, 240], [2.4, 300, Y, 240]], taurus: [R, Y, 220] }), mood: { aries: 'sparkle', taurus: 'happy' },
      lines: [[0.2, 1.4, 'aries', 'cooldown: | two-step!'], [1.9, 1.4, 'taurus', 'finally, | my sport.']] },
    { dur: 3.6, set: trail, front: (x, t, lt, P) => headband(x, P, 'aries'), cast: C({ aries: [M, Y, 300] }), mood: { aries: 'happy' }, look: { aries: [0, 0] },
      lines: [[0.15, 1.6, 'aries', 'real training: | sleep. water.'], [1.9, 1.6, 'aries', 'and say yes | to plans.']] },
  ],
  stamp: { set: dusk, front: (x, t, lt, P) => headband(x, P, 'aries'), cast: C({ aries: [L, Y, 240], pisces: [R, Y, 210] }), mood: { aries: 'sparkle', pisces: 'heart' }, look: { aries: [0, 0] }, hops: { aries: [1.2, 1.6, 2.0] },
    lines: [[1.2, 2.2, 'aries', 'run, | don\'t walk.']] },
  line: 'Run, don\'t walk. Jan 9.', stars: ['aries', 'pisces', 'libra', 'capricorn'],
})
