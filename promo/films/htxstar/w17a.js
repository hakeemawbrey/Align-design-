// Houston Star Talk · w17 countdown episodes hst405–hst416 (24 → 13 days until Jan 9). Builder and sets: w17.js.
import {
  ep, C, Y, G, Kp, clamp, prog, ease, box, txt, label, sparkles, GOLD, BONE, PINK, INK, MONO, SERIF, MINT, SKYB, LAV, BRAKE, HGREEN,
  office, whiteboard, tunnel, bedroom, mirror, rack, bigPhone, bellaire, bayou, batBridge, kitchen, lawn, beach, alley,
  night, heatSun, sweat, thermo, puffer, glasses, shades, clipboard, scarf, sunHat, heldPhone, marker, tissues, frizz, bigText,
  kolache, klobasnek, taco, soupPot, mural, houses, coffeeShop, freeway, overheadSign, streetSign, gull, mosquito, stringLights, skyFill, daySky, table, heart,
} from './w17.js'

const AT = id => ({ [id]: [0, 0] })          // look straight at you
const L = 300, R = 780, M = 540

// ── hst405 · 24 days · Capricorn has a plan (a whiteboard, the downtown tunnels) · lofi
const gantt = (x, t, lt, rows) => (cx, cy, w, h) => {
  txt(x, 'OPERATION: JAN 9', cx, cy - h / 2 + 50, { size: 44, col: INK })
  rows.forEach(([name, a, b, col], i) => {
    const y = cy - h / 2 + 130 + i * 74; txt(x, name, cx - w / 2 + 30, y, { size: 30, col: INK, font: MONO, weight: 700, align: 'left' })
    const g = clamp((lt - 0.2 - i * 0.25) / 0.4); box(x, cx - w / 2 + 230 + a * 40, y - 20, (b - a) * 40 * g, 40, col, 4)
  })
}
const PLAN = [['OUTFIT', 0, 3, '#ff8fb1'], ['RIDE', 2, 6, '#5ec8ff'], ['SNACKS', 4, 8, '#f2c75c'], ['HYPE', 5, 10, '#7dffb0']]
const PLAN2 = [...PLAN, ['BUFFER: 59', 8, 12, BRAKE]]
const hst405 = ep(24, {
  hook: '24 days to Jan 9. | Capricorn has a plan.',
  hookSet: (x, t, lt) => { office(x, t); streetSign(x, 850, 760, 'DOWNTOWN', { pole: false }); whiteboard(x, 330, 800, 540, 360, gantt(x, t, lt + 1, PLAN)) },
  hookFront: (x, t, lt, P) => marker(x, P, 'capricorn'),
  hookCast: C({ capricorn: [L, Y, 260], virgo: [R, Y, 220] }), hookMood: { capricorn: 'squint', virgo: 'sparkle' }, hookLook: AT('capricorn'),
  calX: 800, calY: 1000, calS: 0.62,
  scenes: [
    { dur: 3.4, set: (x, t) => office(x, t), cast: C({ capricorn: [M, Y, 300] }), mood: { capricorn: 'squint' }, look: AT('capricorn'), front: (x, t, lt, P) => marker(x, P, 'capricorn'),
      lines: [[0.15, 1.5, 'capricorn', 'you. yes, you. | 24 days.'], [1.8, 1.4, 'capricorn', 'we need | a plan.']] },
    { dur: 3.6, set: (x, t, lt) => { office(x, t); whiteboard(x, 540, 640, 900, 520, gantt(x, t, lt, PLAN)) }, cast: C({ capricorn: [200, Y + 40, 220] }), mood: { capricorn: 'sparkle' },
      lines: [[1.4, 1.9, 'capricorn', 'week 1: outfit. | week 2: the ride.']] },
    { dur: 3.4, set: (x, t) => office(x, t), cast: C({ capricorn: [L, Y, 240], aries: [[0, 1200, Y, 230], [0.4, R, Y, 230]] }), mood: { capricorn: 'eyeroll', aries: 'wide' },
      lines: [[0.5, 1.3, 'aries', 'can we just | go now?'], [1.9, 1.4, 'capricorn', "it's 24 days | away, Aries."]] },
    { dur: 3.6, set: (x, t) => tunnel(x, t), front: (x, t, lt) => { box(x, 700, 420, 300, 100, HGREEN, 6); txt(x, 'TUNNELS', 850, 455, { size: 40, col: BONE }); txt(x, 'CLOSED WEEKENDS', 850, 497, { size: 22, col: BONE, font: MONO, weight: 700 }) },
      cast: C({ capricorn: [[0, 260, Y, 230], [3.4, 420, Y, 230]], gemini: [[0, 680, Y, 210], [3.4, 820, Y, 210]] }), mood: { capricorn: 'squint', gemini: 'wink' },
      lines: [[0.2, 1.4, 'capricorn', 'scouting routes | in the tunnels.'], [1.8, 1.6, 'gemini', 'they close | on weekends, mane.']] },
    { dur: 3.4, set: (x, t, lt) => { office(x, t); whiteboard(x, 540, 640, 900, 520, gantt(x, t, lt + 3, PLAN2)) }, cast: C({ capricorn: [200, Y + 40, 220] }), mood: { capricorn: 'happy' },
      lines: [[0.4, 2.4, 'capricorn', 'I added buffer | for the 59.']], stick: [[1.4, 1.8, 'SOUTHWEST FWY: BUFFERED', GOLD]] },
    { dur: 3.6, set: (x, t) => office(x, t), cast: C({ capricorn: [L, Y, 240], pisces: [R, Y, 220] }), mood: { capricorn: 'neutral', pisces: 'heart' },
      lines: [[0.2, 1.5, 'pisces', 'is there a day | for feelings?'], [1.9, 1.5, 'capricorn', 'day 12. | 2 to 2:15.']] },
    { dur: 3.4, set: (x, t) => office(x, t), cast: C({ capricorn: [M, Y, 300] }), mood: { capricorn: 'happy' }, look: AT('capricorn'),
      lines: [[0.15, 1.6, 'capricorn', 'your step 1: | text one friend.'], [1.9, 1.3, 'capricorn', 'today. | "you coming?"']] },
  ],
  stamp: { set: (x, t) => office(x, t), cast: C({ capricorn: [L, Y, 230], virgo: [R, Y, 210] }), mood: { capricorn: 'sparkle', virgo: 'heart' }, look: { capricorn: [0, 0], virgo: [0, 0] },
    lines: [[1.2, 2.2, 'capricorn', 'the rest is | just showing up.']] },
  line: 'Plan it. Then show up.', stars: ['capricorn', 'virgo', 'aries', 'pisces'],
})

export const W17A = { hst405 }
