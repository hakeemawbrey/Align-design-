// klne03: LONG DISTANCE NOTES, "The Someday List" (22 s vertical, star_advice post, jazzy · F). Hard cut.
// Kit: ../../klne01/ldnkit.js. Houston (CST, UTC−6) ↔ Lagos (WAT, UTC+1): Lagos is 7 hours ahead.
//   0.0  frame 0: Houston 2 PM, ♏ Scorpio mid-gasp at a food truck, a snack in hand; Lagos 9 PM, ♉ Taurus asleep.
//        "You found their favourite food. | *They’re asleep.*"
//   3.2  "you HAVE to try this" … "it’ll be cold by morning."   8.3 THE STARS: "start a *someday list.* add one thing a day."
//  10.0  the list appears on the seam; items land (the food truck, a sunset spot); 13.2 the clocks jump 10 hours:
//  14.0  Lagos 7 AM: Taurus wakes, reads it, adds "the food truck. FIRST STOP." · Pisces (Scorpio's friend) cries.
//  20.3  "Every item is a | *someday* date."
import { makeLDN, card, R, box, label, bubble, hearts, sparkles, drawBits, GOLD, INK, INTER, pop01, prog } from '../../klne01/ldnkit.js'

const T = { gasp: 0, try: 3.2, cold: 5.4, line: 8.3, list: 10.0, i1: 10.6, i2: 11.6, jump: 13.2, wake: 14.0, i3: 15.0, i4: 16.4, cry: 15.2, last: 20.3 }
const ITEMS = [[T.i1, '♏ the food truck'], [T.i2, '♏ the sunset bridge'], [T.i3, '♉ THE FOOD TRUCK. first stop.'], [T.i4, '♉ a dance class (both)']]
const EP = makeLDN({
  id: 'klne03', len: 22, ending: 'cut', music: { style: 'jazzy', key: 'F', seed: 2323 },
  hook: 'You found their favourite food. | *They’re asleep.*', hookSize: 84,
  L: { sign: 'scorpio', city: 'Houston', min0: 14 * 60 },
  R: { sign: 'taurus', city: 'Lagos', offset: 420 },
  jumps: [[T.jump, 600]],
  sets: [[0, 'street', 'room', { bedR: true, bedColR: '#5fb87a' }], [T.jump + 0.2, 'room', 'room', { bedL: true, bedR: true, bedColL: '#7a3a6a', bedColR: '#5fb87a' }]],
  badgeAt: 0.6, gap: '7 HOURS APART', gapAt: 1.0, gapOut: [3.0, 3.2],
  lines: [{ t: T.line, text: 'start a *someday list.* add one thing a day.' }],
  boxes: [{ from: 0, to: 1, close: 12.2 }],
  pose(t, side) {
    if (side === 'L') {
      const night = t > T.jump + 0.2
      return { x: 250, y: night ? 1135 : 1130, s: 250, mood: night ? 'sleepy' : t < 0.6 ? 'wide' : t < T.cold ? 'sparkle' : t < T.line ? 'neutral' : 'happy', look: [1, 0], hops: [T.try, T.i1, T.i2],
        prop: (x, F) => { if (!night) drawBits(x, ['.YYYY.', 'YRGRGY', 'YYYYYY'], { Y: '#f2c75c', R: '#e8344e', G: '#5fb87a' }, F.ox + 120, F.oy - F.base - 30, 12, { rot: -0.2 }) } }
    }
    const awake = t > T.wake
    return { x: 820, y: 1135, s: 240, mood: !awake ? 'sleepy' : t < T.wake + 0.5 ? 'wide' : t < T.i3 ? 'neutral' : 'heart', look: awake ? [-1, -0.6] : [0, 0], hops: [T.wake, T.i3, T.i4] }
  },
  pis: { side: 'L', x: 440, y: 1240, s: 120, look: [-1, -0.4], tears: t => (t > T.cry ? 3 : 2), mood: t => (t > T.cry ? 'happy' : 'sparkle'), hops: [T.cry], hideAt: T.jump + 0.2 },
  draw(x, t) {
    // the food truck (Houston, by day)
    if (t < T.jump + 0.2) x.save(), x.beginPath(), x.rect(0, 0, 540, 1920), x.clip(), box(x, 30, 880, 220, 200, '#ff9a3a', { b: 7 }), R(x, '#bfe8ff', 50, 900, 180, 70), label(x, 'SNACK TRUCK', 140, 1010, { size: 26, col: INK, font: INTER, weight: 800 }), R(x, INK, 50, 1080, 40, 40), R(x, INK, 190, 1080, 40, 40), x.restore()
    bubble(x, t, 280, 780, T.try, T.cold - 0.1, 'you HAVE to try this', { size: 32, tail: -0.1 })
    bubble(x, t, 280, 780, T.cold, T.line - 0.2, '…it’ll be cold by morning.', { size: 30, tail: -0.1, col: '#d9d4ea' })
    if (t < T.line) label(x, 'z z z', 860, 940 + 10 * Math.sin(t * 2), { size: 34, col: '#cfeeff', alpha: 0.9 })
    // the someday list, on the seam
    const k = pop01(t, T.list, 0.35, 2)
    if (t > T.list && t < T.last + 0.1) {
      x.save(); x.translate(540, 760); x.scale(k, k); x.rotate(-0.03)
      card(x, 0, 0, 520, 360, '#fff8e0')
      label(x, 'SOMEDAY LIST', 0, -136, { size: 34, col: '#c42a3f', font: INTER, weight: 800 })
      ITEMS.forEach(([at, txt], i) => { const q = pop01(t, at, 0.25, 2.4); if (q > 0.01) label(x, `${i + 1}. ${txt}`, -230, -70 + i * 62, { size: 27 * q, col: i === 2 ? '#c42a3f' : INK, align: 'left', font: INTER, weight: 800, maxW: 470 }) })
      x.restore()
    }
    ITEMS.forEach(([at], i) => sparkles(x, t, 540, 690 + i * 62, at, 8, 80, i))
    hearts(x, t, T.i3 + 0.3, 820, 960, { n: 6 })
  },
  last: { t: T.last, text: 'Every item is a | *someday* date.', size: 90 },
  sections: { drop: 0.6, breakdown: [T.line], lift: [T.wake], outroAt: T.last + 0.5 },
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = [...EP.CUES, ['pop', T.list, 880, 0.05, 0], ...[T.i1, T.i2, T.i3, T.i4].map((a, i) => ['pop', a, [987.77, 1174.66, 1318.51, 1567.98][i], 0.05, 0]), ['bell', T.wake, 1760, 0.035, 0.8, 0.3], ['pluck', T.cry, 659.25, 0.035, 0.5, -0.3], ['pluck', T.cry + 0.14, 587.33, 0.035, 0.5, -0.3]]
export const MUSIC = EP.music
void prog
