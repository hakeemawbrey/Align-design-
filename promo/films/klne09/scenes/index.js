// klne09: LONG DISTANCE NOTES, "One Walk, Two Cities" (22 s vertical, star_advice post, jazzy · A). Hard cut.
// Kit: ../../klne01/ldnkit.js. Toronto (EST, UTC−5) ↔ Vancouver (PST, UTC−8): Toronto is 3 hours ahead.
//   0.0  frame 0: Toronto 9 PM, snow: ♋ Cancer mid-shiver walking home; Vancouver 6 PM, rain: ♐ Sagittarius walking.
//        "Walking home alone… | *again.*"
//   3.2  Cancer: "this walk is SO long." · Sag: "rain. again."
//   8.3  THE STARS: "walk *together.* call, earbuds in, keep walking." → 10.0 earbuds in, a call line across the seam,
//        the two fall into the same step · 11.4 "a dog in a tiny coat just passed me" · 12.9 "a bakery here smells
//        like cinnamon" · 14.5 both laugh · Pisces (Cancer's friend, walking along) cries happy.
//  20.3  "Two cities, | *one* walk."
import { makeLDN, R, label, bubble, hearts, drawBits, GOLD, INK } from '../../klne01/ldnkit.js'

const T = { c1: 3.2, s1: 4.6, line: 8.3, buds: 10.0, sync: 10.5, d1: 11.4, d2: 12.9, laugh: 14.5, cry: 14.2, last: 20.3 }
const STEP = 0.5
const steps = (from, to, off = 0) => { const a = []; for (let t = from + off; t < to; t += STEP) a.push(+t.toFixed(3)); return a }
const buds = (x, F) => { R(x, INK, F.ox - F.S * 0.36 - 9, F.oy - F.base - F.S * 0.46 - 9, 22, 26); R(x, '#ffffff', F.ox - F.S * 0.36 - 5, F.oy - F.base - F.S * 0.46 - 5, 14, 18); R(x, INK, F.ox + F.S * 0.36 - 13, F.oy - F.base - F.S * 0.46 - 9, 22, 26); R(x, '#ffffff', F.ox + F.S * 0.36 - 9, F.oy - F.base - F.S * 0.46 - 5, 14, 18) }
const walking = t => (t > 0 ? t * 140 : 0)
const EP = makeLDN({
  id: 'klne09', len: 22, ending: 'cut', music: { style: 'jazzy', key: 'A', seed: 2329 },
  hook: 'Walking home alone… | *again.*',
  L: { sign: 'cancer', city: 'Toronto', min0: 21 * 60, weather: 'snow' },
  R: { sign: 'sagittarius', city: 'Vancouver', offset: -180, weather: 'rain' },
  sets: [[0, 'street', 'street', {}]],
  walkL: walking, walkR: walking,
  badgeAt: 0.6, gap: '3 HOURS APART', gapAt: 1.0, gapOut: [3.0, 3.2],
  lines: [{ t: T.line, text: 'walk *together.* call, earbuds in, keep walking.' }],
  boxes: [{ from: 0, to: 1, close: 11.2 }],
  pose(t, side) {
    if (side === 'L') return { x: 250, y: 1150, s: 240, mood: t < T.line ? 'squint' : t < T.laugh ? 'happy' : 'sparkle', look: [1, 0], hops: [...steps(0, T.sync, 0.1), ...steps(T.sync, T.last + 2)], squash: t < 0.6 ? 0.08 * Math.sin(t * 40) : 0, prop: (x, F) => { if (t > T.buds) buds(x, F) } }
    return { x: 820, y: 1150, s: 240, mood: t < T.line ? 'neutral' : t < T.laugh ? 'happy' : 'sparkle', look: [-1, 0], hops: [...steps(0, T.sync, 0.33), ...steps(T.sync, T.last + 2)], prop: (x, F) => { if (t > T.buds) buds(x, F); drawBits(x, ['..UUU..', '.UUUUU.', 'UUUUUUU', '...I...', '...I...', '...I..I', '....II.'], { U: '#e8344e', I: INK }, F.ox + 90, F.oy - F.base - F.S * 0.62, 14) } }
  },
  pis: { side: 'L', x: 450, y: 1250, s: 120, look: [-1, -0.4], tears: t => (t > T.cry ? 3 : 2), mood: t => (t > T.cry ? 'happy' : 'wide'), hops: steps(T.sync, T.last + 2, 0.05) },
  draw(x, t) {
    if (t < 0.9) label(x, 'brrr!!', 330, 880, { size: 52, col: '#cfeeff', font: 'Inter', weight: 800, rot: -0.1 })
    bubble(x, t, 260, 790, T.c1, T.line - 0.2, 'this walk is SO long.', { size: 30 })
    bubble(x, t, 820, 790, T.s1, T.line - 0.2, 'rain. again.', { size: 32, col: '#d9d4ea' })
    if (t > T.buds && t < T.last) { x.save(); x.globalCompositeOperation = 'lighter'; x.strokeStyle = 'rgba(127,224,255,0.7)'; x.lineWidth = 8; x.setLineDash([24, 16]); x.lineDashOffset = -t * 120; x.beginPath(); x.moveTo(370, 1020); x.quadraticCurveTo(540, 940 + 20 * Math.sin(t * 4), 700, 1020); x.stroke(); x.restore(); if (t > T.sync) label(x, 'SAME STEP', 540, 960, { size: 26, col: '#7fe0ff' }) }
    bubble(x, t, 260, 760, T.d1, T.laugh + 1.2, ['a dog in a tiny coat', 'just passed me'], { size: 28 })
    bubble(x, t, 820, 760, T.d2, T.laugh + 1.2, ['a bakery here smells', 'like cinnamon'], { size: 28 })
    if (t > T.laugh && t < T.last) { label(x, 'HA!', 360, 920, { size: 44, col: GOLD, font: 'Inter', weight: 800, rot: -0.1 }); label(x, 'HAHA', 720, 920, { size: 40, col: GOLD, font: 'Inter', weight: 800, rot: 0.1 }) }
    hearts(x, t, T.laugh, 540, 1100, { n: 7, spread: 320 })
  },
  last: { t: T.last, text: 'Two cities, | *one* walk.', size: 96 },
  sections: { drop: 0.6, breakdown: [T.line], lift: [T.sync], outroAt: T.last + 0.5 },
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = [...EP.CUES, ['pop', T.buds, 1174.66, 0.04, -0.3], ['pop', T.buds + 0.1, 1174.66, 0.04, 0.3], ...steps(T.sync, T.laugh).map(s => ['tick', s, 0.02]), ['glitter', T.laugh, T.laugh + 0.5], ['pluck', T.cry, 659.25, 0.035, 0.5, -0.3], ['pluck', T.cry + 0.14, 587.33, 0.035, 0.5, -0.3]]
export const MUSIC = EP.music
