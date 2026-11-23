// hst414 · 15 days · Sag already planned Jan 10 (a Galveston day trip; the brown water is "character") · funk
import { ep, C, Y, Kp, clamp, prog, box, txt, sparkles, GOLD, BONE, PINK, INK, MONO, SKYB, MINT, BRAKE, beach, sunHat, clipboard, overheadSign, freeway, daySky, outside, taco } from './w17.js'

const L = 300, R = 780, M = 540
const set = (x, t) => beach(x, t)
const map = (x, t, lt, stops) => {
  x.save(); x.translate(M, 760); x.rotate(0.02); box(x, -340, -240, 680, 480, '#f4e1b0', 8)
  stops.forEach(([s, col], i) => { const k = clamp((lt - 0.2 - i * 0.35) / 0.3); if (k <= 0) return; const y = -170 + i * 90; box(x, -300, y - 30, 60, 60, col, 4); txt(x, String(i + 1), -270, y + 2, { size: 34, col: INK }); txt(x, s, -210, y + 2, { size: 40, col: INK, align: 'left' }) })
  x.restore()
}
const stealSnack = (x, t, lt) => { const ph = clamp((lt - 1.0) / 1.6); const gx = 760 - ph * 700, gy = 1080 - Math.sin(Math.PI * ph) * 300; x.strokeStyle = BONE; x.lineWidth = 8; const f = Math.sin(t * 12) * 14; x.beginPath(); x.moveTo(gx - 40, gy - f); x.quadraticCurveTo(gx - 16, gy - 18, gx, gy); x.quadraticCurveTo(gx + 16, gy - 18, gx + 40, gy - f); x.stroke(); if (ph > 0) taco(x, gx, gy + 30, 0.5); else taco(x, 760, 1110, 0.7) }

export const EP = ep(15, {
  hook: '15 days out. | Sag already | planned Jan 10.',
  hookSet: (x, t) => set(x, t),
  hookFront: (x, t, lt, P) => sunHat(x, P, 'sagittarius'),
  hookCast: C({ sagittarius: [[0, L, Y, 270], [1.4, L + 60, Y, 270], [2.8, L, Y, 270]] }), hookMood: { sagittarius: 'sparkle' }, hookLook: { sagittarius: [0, 0] },
  calX: 790, calY: 760, calS: 0.65,
  scenes: [
    { dur: 3.6, set, front: (x, t, lt, P) => sunHat(x, P, 'sagittarius'), cast: C({ sagittarius: [M, Y, 300] }), mood: { sagittarius: 'sparkle' }, look: { sagittarius: [0, 0] },
      lines: [[0.15, 1.5, 'sagittarius', 'Jan 9: | the party.'], [1.8, 1.6, 'sagittarius', 'Jan 10: | GALVESTON!']] },
    { dur: 3.4, set, front: (x, t, lt, P) => { sunHat(x, P, 'sagittarius'); clipboard(x, P, 'capricorn', -1) }, cast: C({ capricorn: [L, Y, 230], sagittarius: [R, Y, 240] }), mood: { capricorn: 'squint', sagittarius: 'happy' },
      lines: [[0.2, 1.3, 'capricorn', "it's | January."], [1.7, 1.4, 'sagittarius', 'and 78°!']] },
    { dur: 3.6, set, front: (x, t, lt, P) => sunHat(x, P, 'sagittarius'), cast: C({ virgo: [L, Y, 230], sagittarius: [R, Y, 240] }), mood: { virgo: 'squint', sagittarius: 'wink' },
      lines: [[0.2, 1.4, 'virgo', 'the water | is brown.'], [1.9, 1.5, 'sagittarius', "that's | character."]] },
    { dur: 3.4, set: (x, t, lt) => { set(x, t); stealSnack(x, t, lt) }, cast: C({ gemini: [L, Y, 230] }), mood: { gemini: lt => lt > 1.2 ? 'wide' : 'happy' },
      lines: [[1.4, 1.8, 'gemini', 'the gull took | my taco!']] },
    { dur: 3.8, set: (x, t, lt) => { set(x, t); map(x, t, lt, [['BEACH', SKYB], ['SEAWALL WALK', MINT], ['BELLAIRE DINNER', PINK], ['KARAOKE', GOLD]]) }, cast: C({ sagittarius: [200, Y + 40, 220], taurus: [880, Y + 40, 210] }), mood: { sagittarius: 'sparkle', taurus: 'sleepy' },
      lines: [[2.0, 1.6, 'taurus', 'breathe. | please.']] },
    { dur: 3.6, set, cast: C({ pisces: [L, Y, 230], sagittarius: [R, Y, 230] }), mood: { pisces: 'heart', sagittarius: 'happy' },
      lines: [[0.2, 1.5, 'pisces', 'can we just | watch the waves?'], [1.9, 1.5, 'sagittarius', '...yeah. | we can.']] },
    { dur: 3.6, set, front: (x, t, lt, P) => sunHat(x, P, 'sagittarius'), cast: C({ sagittarius: [M, Y, 300] }), mood: { sagittarius: 'happy' }, look: { sagittarius: [0, 0] },
      lines: [[0.15, 1.6, 'sagittarius', 'plan the fun. | but also:'], [1.9, 1.6, 'sagittarius', 'leave a day | for nothing.']] },
  ],
  stamp: { set, front: (x, t, lt, P) => sunHat(x, P, 'sagittarius'), cast: C({ sagittarius: [L, Y, 240], pisces: [R, Y, 210] }), mood: { sagittarius: 'sparkle', pisces: 'heart' }, look: { sagittarius: [0, 0] },
    lines: [[1.2, 2.2, 'sagittarius', 'party first. | beach after.']] },
  line: 'Party first. Beach after.', stars: ['sagittarius', 'pisces', 'virgo', 'gemini'],
})
