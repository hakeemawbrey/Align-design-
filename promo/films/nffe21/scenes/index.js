// nffe21: FRIENDS FIRST ep 21, "Quiet company" (25 s vertical, star_advice, music: lofi · Dm).
// Story 0–20.6, then the shared end card. Look: ../../nffe01/scenes/friendskit.js.
//   0.0–7.0    "Your friend doesn't | want to *talk.*"  Capricorn at a half-done jigsaw on the low table, mid-hop, eyes down.
//              Taurus tiptoes in and hovers: "say something? say SOMETHING?!"  Pisces sniffles by the lamp.
//   7.0        card cut.  THE STARS: "you don't need the right *words*." → "presence is a whole *sentence*."
//   13.6       Taurus sits and quietly finds an edge piece. The clock slides 8:00 → 9:00 PM; the puzzle fills piece by
//              piece. CAPRICORN: "thanks for staying."  Hearts.
//   17.2       Last line: "Just *be there.*"
import { makeFriends, stars, bubble, thought, box, R, INK, label, table, mug, hearts, sparkles, pop01, ease, prog, lerp } from '../../nffe01/scenes/friendskit.js'

const CAP = 'capricorn', TAU = 'taurus'
const COLS = ['#7fd0ff', '#9fe6b0', '#ffd23f', '#ff8fb1', '#c9a6ff']
function puzzle(x, t, filled) {
  box(x, 330, 930, 420, 190, '#2b2350', { b: 6 })
  for (let r = 0; r < 3; r++) for (let c = 0; c < 6; c++) {
    const i = r * 6 + c
    if (i < filled) { R(x, COLS[(r + c) % 5], 340 + c * 68, 940 + r * 58, 64, 54); R(x, 'rgba(255,255,255,0.25)', 340 + c * 68, 940 + r * 58, 64, 8) }
    else R(x, 'rgba(255,255,255,0.06)', 340 + c * 68, 940 + r * 58, 64, 54)
  }
}
function clock(x, txt) { box(x, 740, 600, 210, 64, '#141028', { b: 6 }); label(x, txt, 845, 633, { size: 32, col: '#e9d9a8' }) }
const EP = makeFriends({
  id: 'nffe21', dur: 25, cut: 7.0,
  hook: { text: 'Your friend doesn’t | want to *talk.*', out: 3.4, color: '#e9d9a8' },
  lines: [
    stars(7.4, 'you don’t need the right *words*.'),
    stars(10.4, 'presence is a whole *sentence*.'),
  ],
  boxes: [{ from: 0, to: 2, close: 13.4 }],
  last: { at: 17.2, text: 'Just *be there.*', color: '#e9d9a8' },
  shots: [
    { at: 0, set: 'room', setOpts: { couch: false }, pis: { x: 230, y: 1290, s: 100, tears: 1, mood: 'wide', look: [1, -1] },
      draw(x, t, S) {
        clock(x, '8:00 PM')
        const inP = ease.outCubic(prog(t, 2.4, 3.4))
        S.star(x, t, CAP, { x: 540, y: 860, s: 230, mood: 'neutral', look: [0, 1], hops: [-0.12] })
        if (inP > 0) S.star(x, t, TAU, { x: lerp(1200, 870, inP), y: 1010, s: 220, mood: t < 3.8 ? 'neutral' : 'wide', look: [-1, 0], hops: [2.4, 2.75, 3.1, 4.0, 5.2, 6.0] })
      },
      front(x, t) { table(x, 540, 1120, 520, '#7a5034'); puzzle(x, t, 7); mug(x, t, 800, 1114, 1, '#e9d9a8'); thought(x, t, 700, 740, 3.8, 6.85, 'say something? say SOMETHING?!', { size: 30, maxW: 340, fromX: 860, fromY: 900 }) } },
    { at: 7.0, set: 'sky', dim: 0.75, pis: { x: 880, y: 1240, s: 130, tears: 2 },
      draw(x, t, S) {
        S.star(x, t, 'stars', { x: 540, y: 860, s: 360, mood: t > 11.5 ? 'happy' : 'neutral', look: [0, 0.2], hops: [7.05, ...S.STARS_HOPS], seed: 2, glow: 1.1 })
        S.star(x, t, TAU, { x: 220, y: 1250, s: 160, mood: t < 10.3 ? 'wide' : 'sparkle', look: [1, -1], hops: [10.4] })
      } },
    { at: 13.6, set: 'room', setOpts: { couch: false }, pis: { x: 230, y: 1290, s: 100, tears: 3, mood: 'happy' },
      draw(x, t, S) {
        clock(x, t < 14.8 ? '8:00 PM' : '9:00 PM')
        S.star(x, t, CAP, { x: 470, y: 860, s: 230, mood: t < 15.9 ? 'neutral' : 'happy', look: t < 15.9 ? [0, 1] : [1, 0], hops: [15.95, 16.5] })
        S.star(x, t, TAU, { x: 700, y: 870, s: 220, mood: t < 15.9 ? 'neutral' : 'happy', look: t < 15.9 ? [-0.5, 1] : [-1, 0], hops: [13.8, 14.3, 16.6] })
        bubble(x, t, 470, 640, 15.9, 17.05, 'thanks for staying.', { size: 36, col: '#e9d9a8' })
        hearts(x, t, 16.5, 580, 740, { n: 6 })
      },
      front(x, t) {
        const n = 7 + Math.floor(11 * ease.inOutQuad(prog(t, 14.0, 15.8)))
        table(x, 540, 1120, 520, '#7a5034'); puzzle(x, t, n); mug(x, t, 800, 1114, 1, '#e9d9a8'); mug(x, t, 280, 1114, 1, '#b8f0c0')
        sparkles(x, t, 540, 1020, 15.85, 12, 200, 1)
      } },
  ],
  cues: [
    ...[2.4, 2.75, 3.1].map(a => ['tick', a, 0.025]), ['pop', 3.8, 739.99, 0.03, 0.3],
    ['whoosh', 14.75, 0.4, 0.02], ...Array.from({ length: 11 }, (_, i) => ['tick', 14.0 + i * 0.165, 0.02]),
    ['bell', 15.85, 1760, 0.025, 1.2, 0], ['glitter', 15.85, 16.3], ['pop', 15.9, 880, 0.035, -0.2], ['pluck', 16.5, 1174.66, 0.035, 0.5, 0],
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const WARN = EP.warn
void pop01
