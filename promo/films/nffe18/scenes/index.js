// nffe18: FRIENDS FIRST ep 18, "The weekly check-in" (18 s vertical, star_advice, music: chiptune · E).
// Story 0–15.6, then the short shared end card (2.4 s). Look: ../../nffe01/scenes/friendskit.js.
//   0.0–5.0    "Our group chat has | *one rule.*"  Cancer on the couch, mid-hop, phone up. The pinned message: ROSE +
//              THORN SUNDAY, one good thing and one hard thing. TAURUS "rose: the soup worked. thorn: still sniffly" ·
//              LEO "rose: NEW JOB. thorn: nervous!!" · VIRGO "rose: labels. thorn: out of labels"
//   5.0        hard cut.  THE STARS: "a small ritual makes honesty *normal*."
//   9.8        Capricorn's turn: "rose: you all. thorn: this month's been heavy."  The replies pour in: "here for you ♡",
//              "soup incoming", "walk tomorrow?", "♡♡♡". Capricorn smiles.
//   12.4       Last line: "One rose, *one thorn.*"
import { makeFriends, stars, bigPhone, label, box, phoneSmall, hearts, pop01, outK } from '../../nffe01/scenes/friendskit.js'

const CAN = 'cancer', CAP = 'capricorn'
const N = (name, col, text, at) => ({ at, from: 'them', name, nameCol: col, text })
const A = [
  N('TAURUS', '#b8f0c0', 'rose: the soup worked. thorn: still sniffly', -9),
  N('LEO', '#ffc38a', 'rose: NEW JOB. thorn: nervous!!', 1.3),
  N('VIRGO', '#d6f0b0', 'rose: labels. thorn: out of labels', 2.7),
]
const C = [
  { at: 10.0, from: 'me', text: 'rose: you all. thorn: this month’s been heavy.' },
  N('CANCER', '#cfe4ff', 'here for you ♡', 10.8), N('TAURUS', '#b8f0c0', 'soup incoming', 11.2), N('GEMINI', '#ffe58a', 'walk tomorrow?', 11.6), N('LEO', '#ffc38a', '♡♡♡', 12.0),
]
function pinned(x, t, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(660, cy); x.scale(k, k); box(x, -230, -34, 460, 68, '#ffb37a', { b: 6 }); x.restore()
  label(x, '📌︎ ROSE + THORN SUNDAY', 660, cy, { size: 28 * k, col: '#1b1236', font: 'Inter, sans-serif', weight: 800 })
}
const EP = makeFriends({
  id: 'nffe18', dur: 20, cut: 5.0,
  hook: { text: 'Our group chat has | *one rule.*', out: 3.0, color: '#ffb37a' },
  lines: [stars(5.4, 'a small ritual makes honesty *normal*.')],
  boxes: [{ from: 0, to: 1, close: 9.6 }],
  last: { at: 12.4, text: 'One rose, *one thorn.*', color: '#ffb37a' },
  shots: [
    { at: 0, set: 'room', pis: { x: 950, y: 1260, s: 110, tears: 1, mood: 'sparkle' },
      draw(x, t, S) { S.star(x, t, CAN, { x: 230, y: 1000, s: 260, mood: 'happy', look: [1, -0.5], hops: [-0.12, 1.35, 2.75] }); phoneSmall(x, t, 330, 1060, { s: 0.6, rot: 0.2 }) } },
    { at: 5.0, set: 'sky', dim: 0.75, pis: { x: 880, y: 1240, s: 130, tears: 2 },
      draw(x, t, S) {
        S.star(x, t, 'stars', { x: 540, y: 860, s: 360, mood: t > 6.9 ? 'happy' : 'neutral', look: [0, 0.2], hops: [5.05, ...S.STARS_HOPS], seed: 2, glow: 1.1 })
        S.star(x, t, CAN, { x: 220, y: 1250, s: 160, mood: 'sparkle', look: [1, -1], hops: [6.9] })
      } },
    { at: 9.8, set: 'room', pis: { x: 950, y: 1260, s: 110, tears: 3, mood: 'happy' },
      draw(x, t, S) {
        S.star(x, t, CAP, { x: 230, y: 1000, s: 260, mood: t < 10.8 ? 'neutral' : 'happy', look: [1, -0.5], hops: [10.0, 10.85, 11.25, 11.65, 12.05] })
        hearts(x, t, 11.0, 230, 860, { n: 7 })
      } },
  ],
  overlay(x, t) {
    if (t < 5.0) {
      const k = outK(t, [4.75, 5.0])
      bigPhone(x, t, { cx: 660, cy: 900, w: 520, h: 600, title: 'the group ✦', msgs: A, pop: k, rot: 0.02, accent: '#ffb37a' })
      pinned(x, t, 735, k)
    }
    if (t > 9.85) {
      const k = pop01(t, 9.85, 0.35, 2) * outK(t, [15.2, 15.5])
      bigPhone(x, t, { cx: 660, cy: 990, w: 520, h: 720, title: 'the group ✦', msgs: C, pop: k, rot: 0.02, accent: '#ffb37a' })
      pinned(x, t, 765, k)
    }
  },
  cues: [
    ...A.slice(1).map((m, i) => ['pop', m.at, [880, 987.77, 1174.66][i], 0.04, 0.3]),
    ['whoosh', 9.85, 0.3, 0.03], ['pop', 10.0, 739.99, 0.04, 0.2],
    ...C.slice(1).map((m, i) => ['pop', m.at, [987.77, 1174.66, 1318.51, 1567.98][i], 0.04, 0.3]), ['glitter', 11.0, 12.1],
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const WARN = EP.warn
