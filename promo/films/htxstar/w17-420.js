// hst420 · 9 days · single digits, and Houston hits 55° (puffers, pho, then 79° by 2pm) · jazzy
import { ep, C, Y, Kp, clamp, prog, box, txt, sparkles, GOLD, BONE, PINK, INK, MONO, SKYB, MINT, BRAKE, daySky, skyline, outside, skyFill, pufferLow, beanie, sweat, heatSun, thermo, heldPhone, soupPot, bellaire } from './w17.js'

const L = 300, R = 780, M = 540
const cold = (x, t) => { skyFill(x, '#8fb6d8', '#dfeaf2', 0, 1390); for (let k = 0; k < 4; k++) { const cx = ((k * 330 + t * 30) % 1400) - 160; x.fillStyle = 'rgba(255,255,255,0.8)'; x.fillRect(cx, 360 + (k % 2) * 140, 220, 46) } skyline(x, 1390, t, { alpha: 0.7, col: '#5a6a8a' }); outside(x, { ground: '#6a7a8a' }) }
const warm = (x, t) => { daySky(x, t); heatSun(x, 860, 420, t, 80); skyline(x, 1390, t, { alpha: 0.6, col: '#6a6a9a' }); outside(x, { ground: '#8a7a6a' }) }
const bundled = (ids, col = '#e05a3a') => (x, t, lt, P) => ids.forEach((id, i) => pufferLow(x, P, id, [col, '#2b5fb0', '#7a3ac9', '#2fa84a'][i % 4]))
const shorts = (x, P, id) => { const [cx, cy, s] = P.at(id); box(x, cx - s * 0.26, cy + s * 0.2, s * 0.52, s * 0.1, '#ffd36b', 3) }

export const EP = ep(9, {
  hook: 'Single digits, Houston. | And it\'s 55°.',
  hookSet: (x, t, lt) => { cold(x, t); thermo(x, 260, 620, '55°', 1, SKYB) },
  hookFront: bundled(['gemini']),
  hookCast: C({ gemini: [[0, R, Y, 270], [0.4, R - 30, Y, 270], [0.8, R + 30, Y, 270], [1.2, R - 30, Y, 270], [1.6, R, Y, 270]] }), hookMood: { gemini: 'wide' }, hookLook: { gemini: [0, 0] },
  calX: 300, calY: 1000, calS: 0.55,
  scenes: [
    { dur: 3.4, set: cold, front: bundled(['gemini']), cast: C({ gemini: [M, Y, 300] }), mood: { gemini: 'wide' }, look: { gemini: [0, 0] },
      lines: [[0.15, 1.5, 'gemini', "it's | FREEZING."], [1.8, 1.4, 'gemini', '55 | degrees!']] },
    { dur: 3.6, set: cold, front: (x, t, lt, P) => { bundled(['aries', 'leo', 'libra'])(x, t, lt, P); heldPhone(x, P, 'leo', 1) }, cast: C({ aries: [200, Y, 220], leo: [M, Y, 230], libra: [880, Y, 220] }), mood: { aries: 'squint', leo: 'sparkle', libra: 'wide' },
      lines: [[0.3, 2.6, 'leo', 'posting the | car thermometer.']], stick: [[0.1, 1.4, 'PUFFER SEASON (1 DAY)', SKYB]] },
    { dur: 3.4, set: (x, t) => { bellaire(x, t) }, front: (x, t, lt, P) => { bundled(['taurus'])(x, t, lt, P); soupPot(x, t, 780, 1180) }, cast: C({ taurus: [L, Y, 250] }), mood: { taurus: 'heart' },
      lines: [[0.3, 2.6, 'taurus', 'pho. | immediately.']] },
    { dur: 3.6, set: (x, t, lt) => { (lt < 1.6 ? cold : warm)(x, t); const h = Math.floor(9 + clamp(lt / 1.6) * 5); txt(x, `${h > 12 ? h - 12 : h}:00 ${h >= 12 ? 'PM' : 'AM'}`, M, 560, { size: 90, col: lt < 1.6 ? INK : BRAKE, font: MONO, weight: 700 }); if (lt > 1.6) thermo(x, 820, 760, '79°', Kp(lt, 1.6)) },
      front: (x, t, lt, P) => { bundled(['gemini'])(x, t, lt, P); if (lt > 1.6) { const [cx, cy, s] = P.at('gemini'); sweat(x, cx, cy - s * 0.6, t) } }, cast: C({ gemini: [L, Y, 260] }), mood: { gemini: lt => lt > 1.6 ? 'squint' : 'happy' },
      lines: [[2.0, 1.5, 'gemini', '...never | mind.']] },
    { dur: 3.4, set: warm, front: (x, t, lt, P) => { if (lt < 1.2) bundled(['gemini'])(x, t, lt, P); else shorts(x, P, 'gemini') }, cast: C({ gemini: [M, Y, 280] }), mood: { gemini: 'sparkle' }, hops: { gemini: [1.2, 1.5] },
      lines: [[1.4, 1.9, 'gemini', 'two seasons. | one day.']] },
    { dur: 3.4, set: warm, cast: C({ capricorn: [L, Y, 240], pisces: [R, Y, 220] }), mood: { capricorn: 'squint', pisces: 'heart' },
      lines: [[0.2, 1.4, 'capricorn', 'dress | in layers.'], [1.8, 1.4, 'pisces', 'I miss the | cold already.']] },
    { dur: 3.6, set: warm, cast: C({ gemini: [M, Y, 300] }), mood: { gemini: 'happy' }, look: { gemini: [0, 0] },
      lines: [[0.15, 1.6, 'gemini', 'weather changes. | plans can too.'], [1.9, 1.6, 'gemini', "that's okay. | just show up."]] },
  ],
  stamp: { set: warm, front: (x, t, lt, P) => shorts(x, P, 'gemini'), cast: C({ gemini: [L, Y, 240], leo: [R, Y, 210] }), mood: { gemini: 'sparkle', leo: 'heart' }, look: { gemini: [0, 0] },
    lines: [[1.2, 2.2, 'gemini', 'bring a jacket. | (you won\'t need it.)']] },
  line: "Bring a jacket. You won't need it.", stars: ['gemini', 'taurus', 'leo', 'pisces'],
})
