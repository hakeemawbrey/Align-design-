// hst419 · 10 days · Virgo mapped every ride (a corkboard with the three loops) · synthwave
import { ep, C, Y, Kp, clamp, prog, box, txt, sparkles, GOLD, BONE, PINK, INK, MONO, SKYB, MINT, LAV, BRAKE, corkboard, loopMap, pin, clipboard, night, car, freeway, skyline, outside } from './w17.js'

const L = 300, R = 780, M = 540
const PLACES = { KATY: [250, 760], PEARLAND: [640, 980], SPRING: [560, 470], 'SUGAR LAND': [330, 980], HEIGHTS: [560, 690], PARTY: [600, 760] }
const board = (dots = [], routes = []) => (x, t, lt) => corkboard(x, t, () => {
  loopMap(x, 540, 740, 0.95, t)
  routes.forEach(([a, b], i) => { const k = clamp((lt - 0.3 - i * 0.4) / 0.6), A = PLACES[a], B = PLACES[b]; if (k <= 0) return; x.strokeStyle = BRAKE; x.lineWidth = 6; x.setLineDash([12, 10]); x.beginPath(); x.moveTo(A[0], A[1]); x.lineTo(A[0] + (B[0] - A[0]) * k, A[1] + (B[1] - A[1]) * k); x.stroke(); x.setLineDash([]) })
  dots.forEach((d, i) => { const [px, py] = PLACES[d]; if (lt < 0.1 + i * 0.15) return; pin(x, px, py, d === 'PARTY' ? GOLD : BRAKE); txt(x, d, px, py - 36, { size: 24, col: INK, font: MONO, weight: 700 }) })
})
const ALL = ['KATY', 'PEARLAND', 'SPRING', 'SUGAR LAND', 'HEIGHTS', 'PARTY']
const road = (x, t) => { skyline(x, 1000, t, { alpha: 0.8 }); freeway(x, 1000, 420, 3, t * 300); outside(x, { ground: '#2a2638' }) }

export const EP = ep(10, {
  hook: 'T-minus 10 days. | Virgo mapped | every ride.',
  hookSet: board(ALL, [['KATY', 'PARTY'], ['PEARLAND', 'PARTY'], ['SPRING', 'PARTY']]),
  hookFront: (x, t, lt, P) => clipboard(x, P, 'virgo'),
  hookCast: C({ virgo: [[0, 200, Y + 40, 250], [1.4, 240, Y + 40, 250]] }), hookMood: { virgo: 'squint' }, hookLook: { virgo: [0, 0] },
  calX: 860, calY: 1160, calS: 0.5,
  scenes: [
    { dur: 3.4, set: board(ALL), front: (x, t, lt, P) => clipboard(x, P, 'virgo'), cast: C({ virgo: [M, Y + 40, 290] }), mood: { virgo: 'squint' }, look: { virgo: [0, 0] },
      lines: [[0.15, 1.5, 'virgo', "who's driving | you? I need"], [1.8, 1.4, 'virgo', 'names.']] },
    { dur: 3.6, set: board(['KATY', 'SPRING', 'PARTY'], [['KATY', 'PARTY'], ['SPRING', 'PARTY']]), front: (x, t, lt, P) => clipboard(x, P, 'virgo'), cast: C({ virgo: [180, Y + 60, 220] }), mood: { virgo: 'happy' },
      lines: [[0.8, 2.4, 'virgo', 'Cancer: Katy. | Sag: Spring.']] },
    { dur: 3.6, set: board(['SPRING']), cast: C({ sagittarius: [L, Y + 40, 230], virgo: [R, Y + 40, 230] }), mood: { sagittarius: 'wink', virgo: 'wide' },
      lines: [[0.2, 1.6, 'sagittarius', 'is it Spring | or the Woodlands?'], [2.0, 1.3, 'virgo', 'do NOT.']] },
    { dur: 3.4, set: road, front: (x, t) => { car(x, 540, 1220, '#ff5a6e', { open: true }) }, cast: C({ aries: [520, 1140, 170], virgo: [[0, 1250, Y + 60, 190], [1.6, 900, Y + 60, 190]] }), mood: { aries: 'sparkle', virgo: 'wide' },
      lines: [[0.3, 1.4, 'aries', "I'll take | the 610."], [1.9, 1.4, 'virgo', 'at 5pm? | absolutely not.']] },
    { dur: 3.6, set: board(['PEARLAND', 'PARTY'], [['PEARLAND', 'PARTY']]), front: (x, t, lt, P) => clipboard(x, P, 'virgo'), cast: C({ virgo: [L, Y + 40, 230], gemini: [R, Y + 40, 220] }), mood: { virgo: 'happy', gemini: 'eyeroll' },
      lines: [[0.2, 1.5, 'virgo', 'Pearland is | 20 minutes.'], [1.9, 1.5, 'gemini', '...without | traffic.']] },
    { dur: 3.6, set: board(ALL, [['KATY', 'SUGAR LAND'], ['SUGAR LAND', 'PARTY'], ['SPRING', 'HEIGHTS'], ['HEIGHTS', 'PARTY']]), cast: C({ capricorn: [L, Y + 40, 230], virgo: [R, Y + 40, 230] }), mood: { capricorn: 'happy', virgo: 'sparkle' },
      lines: [[1.6, 1.8, 'virgo', 'nobody | drives alone.']], stick: [[0.1, 1.4, 'CARPOOLS: 4', GOLD]] },
    { dur: 3.6, set: board(ALL), front: (x, t, lt, P) => clipboard(x, P, 'virgo'), cast: C({ virgo: [M, Y + 40, 290] }), mood: { virgo: 'happy' }, look: { virgo: [0, 0] },
      lines: [[0.15, 1.6, 'virgo', 'plan your | ride home'], [1.9, 1.6, 'virgo', 'before you | leave home.']] },
  ],
  stamp: { set: night, front: (x, t, lt, P) => clipboard(x, P, 'virgo'), cast: C({ virgo: [L, Y, 240], cancer: [R, Y, 210] }), mood: { virgo: 'sparkle', cancer: 'heart' }, look: { virgo: [0, 0] },
    lines: [[1.2, 2.2, 'virgo', 'comment where | you drive from.']] },
  line: 'Ride together. Jan 9.', stars: ['virgo', 'cancer', 'sagittarius', 'aries'],
})
