// nffe16: FRIENDS FIRST ep 16, "When your friend says 'I'm fine'" (25 s vertical, star_advice, music: cinematic · Em).
// Story 0–20.6, then the shared end card. Look: ../../nffe01/scenes/friendskit.js.
//   0.0–7.0    "They said *'I'm fine.'* | Three times."  A snowy park bench: Scorpio, arms-crossed squash, mid-hop; Cancer
//              beside them. "you okay?" "fine." "sure?" "fine." "FINE."  Cancer wonders: "do I push? do I go?"
//   7.0        card cut.  THE STARS: "don't push. don't *vanish*, either." → "respect it, and leave the door *open*."
//   13.6       the bench. CANCER: "okay. I'm here if fine changes."  Scorpio uncrosses, just a little.
//   16.2       3 DAYS LATER, the phone: SCORPIO "fine changed. can we talk?" · CANCER "always. calling you now ♡"
//   17.6       Last line: "The door *stays open.*"
import { makeFriends, stars, bubble, thought, bigPhone, label, hearts, pop01, outK, phoneSmall } from '../../nffe01/scenes/friendskit.js'

const SCO = 'scorpio', CAN = 'cancer'
const FINES = [[-0.3, 'you okay?', CAN], [0.7, 'fine.', SCO], [1.4, 'sure?', CAN], [2.1, 'fine.', SCO], [2.9, 'FINE.', SCO]]
const MSGS = [
  { at: 16.6, from: 'them', name: 'SCORPIO', nameCol: '#ffa8c0', text: 'fine changed. can we talk?' },
  { at: 17.4, from: 'me', text: 'always. calling you now ♡' },
]
const EP = makeFriends({
  id: 'nffe16', dur: 25, cut: 7.0,
  hook: { text: 'They said *‘I’m fine.’* | Three times.', out: 3.4, color: '#ffa8c0' },
  lines: [
    stars(7.4, 'don’t push. don’t *vanish*, either.'),
    stars(10.45, 'respect it, and leave the door *open*.'),
  ],
  boxes: [{ from: 0, to: 2, close: 13.45 }],
  last: { at: 17.6, text: 'The door *stays open.*', color: '#ffa8c0' },
  shots: [
    { at: 0, set: 'park', pis: { x: 950, y: 1300, s: 100, tears: 1, mood: 'wide', look: [-1, -1], tissues: false },
      draw(x, t, S) {
        S.star(x, t, CAN, { x: 380, y: 990, s: 230, mood: t < 3.6 ? 'neutral' : 'squint', look: [1, 0], hops: [-0.12, 1.4] })
        S.star(x, t, SCO, { x: 680, y: 1000, s: 240, mood: 'squint', look: [1, 0.3], squash: 0.1, hops: [0.7, 2.1, 2.9], scarf: '#2f4a6a' })
        FINES.forEach(([a, w, who], i) => bubble(x, t, who === CAN ? 380 : 720, 770 - (i % 2) * 60, a, i < 4 ? FINES[i + 1][0] + 0.6 : 3.9, w, { size: i === 4 ? 56 : 36, col: who === CAN ? '#cfe4ff' : '#ffa8c0', tail: who === CAN ? 0.2 : -0.2 }))
        thought(x, t, 360, 680, 4.0, 6.85, 'do I push? do I go?', { size: 34, fromX: 380, fromY: 860 })
      } },
    { at: 7.0, set: 'sky', dim: 0.75, pis: { x: 880, y: 1240, s: 130, tears: 2 },
      draw(x, t, S) {
        S.star(x, t, 'stars', { x: 540, y: 860, s: 360, mood: t > 11.8 ? 'happy' : 'neutral', look: [0, 0.2], hops: [7.05, ...S.STARS_HOPS], seed: 2, glow: 1.1 })
        S.star(x, t, CAN, { x: 220, y: 1250, s: 160, mood: t < 10.3 ? 'neutral' : 'sparkle', look: [1, -1], hops: [10.3] })
      } },
    { at: 13.6, set: 'park', pis: { x: 950, y: 1300, s: 100, tears: 2, mood: 'sparkle', tissues: false },
      draw(x, t, S) {
        S.star(x, t, CAN, { x: 380, y: 990, s: 230, mood: 'happy', look: [1, 0], hops: [13.85, 14.4] })
        S.star(x, t, SCO, { x: 680, y: 1000, s: 240, mood: t < 15.0 ? 'squint' : 'neutral', look: t < 15.0 ? [1, 0.3] : [-1, 0], squash: t < 15.0 ? 0.1 : 0.03, hops: [15.0], scarf: '#2f4a6a' })
        bubble(x, t, 420, 740, 13.8, 16.1, 'okay. I’m here if fine changes.', { size: 36, col: '#cfe4ff', maxW: 520 })
      } },
    { at: 16.2, set: 'room', pis: { x: 950, y: 1260, s: 110, tears: 3, mood: 'happy' },
      draw(x, t, S) {
        S.star(x, t, CAN, { x: 230, y: 1000, s: 250, mood: t < 16.6 ? 'neutral' : 'sparkle', look: [1, -0.5], hops: [16.65, 17.4] })
        phoneSmall(x, t, 330, 1060, { s: 0.6, rot: 0.2 })
        hearts(x, t, 17.5, 230, 860, { n: 6 })
        const k = pop01(t, 16.25, 0.3, 2.4) * outK(t, [17.4, 17.6])
        if (k > 0.01) label(x, '3 DAYS LATER', 540, 560, { size: 54 * k, col: '#ffa8c0', font: 'Inter, sans-serif', weight: 800 })
      } },
  ],
  overlay(x, t) {
    if (t > 16.4) bigPhone(x, t, { cx: 680, cy: 960, w: 500, h: 520, title: 'scorpio ✦', msgs: MSGS, pop: pop01(t, 16.4, 0.3, 2) * outK(t, [20.2, 20.5]), rot: 0.02, accent: '#ffa8c0' })
  },
  cues: [
    ...FINES.map(([a, , who], i) => ['pop', Math.max(0.05, a), who === CAN ? 880 : 659.25, i === 4 ? 0.06 : 0.035, who === CAN ? -0.3 : 0.3]), ['tom', 2.9, 120, { gain: 0.18, decay: 0.2 }],
    ['pop', 4.0, 739.99, 0.025, -0.3],
    ['pop', 13.8, 987.77, 0.035, -0.2], ['pluck', 15.0, 880, 0.03, 0.6, 0.3],
    ['whoosh', 16.15, 0.3, 0.03], ['pop', 16.25, 1174.66, 0.04, 0], ['pop', 16.6, 1318.51, 0.045, 0.3], ['pop', 17.4, 987.77, 0.04, 0.2], ['pluck', 17.5, 1174.66, 0.035, 0.5, -0.3],
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const WARN = EP.warn
