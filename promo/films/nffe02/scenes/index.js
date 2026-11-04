// nffe02: FRIENDS FIRST ep 2, "Check-in, not a quiz" (20 s vertical, star_advice, music: chiptune · C).
// Story 0–15.6, then the shared end card. Look: ../../nffe01/scenes/friendskit.js.
//   0.0–5.2    "A check-in, | not a *quiz.*"  The café. Gemini, mid-hop, fires question bubbles at Capricorn: "are you
//              ok?" "why?" "since when?" "is it work?" "is it me?" "do you need a PLAN?"  Capricorn shrinks behind
//              the mug: "…um."  Pisces sniffles by the chalkboard.
//   5.2        card cut.  THE STARS: "one soft question. then let the *quiet* work."
//   10.0       the café again, calm. GEMINI: "how are you, really?" … a beat of quiet … CAPRICORN: "honestly? tired.
//              can I tell you about it?"  Gemini nods; hearts.
//   12.6       Last line: "Ask once. *Hear everything.*"
import { makeFriends, stars, bubble, table, mug, hearts, sparkles } from '../../nffe01/scenes/friendskit.js'

const GEM = 'gemini', CAP = 'capricorn'
const QS = [
  [-0.2, 'are you ok?', 330, 830], [0.7, 'why?', 560, 760], [1.4, 'since when?', 300, 690], [2.1, 'is it work?', 600, 620],
  [2.8, 'is it me?', 330, 550], [3.5, 'do you need a PLAN?', 500, 470],
]
function cafeTable(x, t, calm) {
  table(x, 540, 1110, 420, '#7a4a32')
  mug(x, t, 430, 1104, 1, '#ffe58a', calm)
  mug(x, t, 660, 1104, 1, '#e9d9a8', true)
}
const EP = makeFriends({
  id: 'nffe02', dur: 20, cut: 5.2,
  hook: { text: 'A check-in, | not a *quiz.*', out: 3.0, color: '#ffe58a' },
  lines: [stars(5.6, 'one soft question. then let the *quiet* work.')],
  boxes: [{ from: 0, to: 1, close: 9.8 }],
  last: { at: 12.6, text: 'Ask once. *Hear everything.*', color: '#ffe58a', size: 104, accentSize: 150 },
  shots: [
    { at: 0, set: 'cafe', pis: { x: 210, y: 1270, s: 110, tears: 1, mood: 'wide', look: [1, -1] },
      draw(x, t, S) {
        S.star(x, t, GEM, { x: 330, y: 1010, s: 270, mood: t < 4 ? 'wide' : 'squint', look: [1, -0.5], hops: [-0.12, ...QS.map(q => q[0] + 0.02).filter(v => v > 0)] })
        const shrink = Math.min(1, Math.max(0, t / 4))
        S.star(x, t, CAP, { x: 770, y: 1030 + 40 * shrink, s: 250 - 40 * shrink, mood: t < 4.1 ? 'wide' : 'squint', look: [-1, 0], squash: 0.08 * shrink })
        QS.forEach(([a, q, bx, by], i) => bubble(x, t, bx, by, a, 5.15, q, { size: 38 + i * 2, tail: -0.4, col: i === 5 ? '#ffe58a' : '#fff6d8' }))
        bubble(x, t, 820, 860, 4.2, 5.15, '…um.', { size: 34, col: '#e8e2f6', tail: 0.2 })
      },
      front(x, t) { cafeTable(x, t, false) } },
    { at: 5.2, set: 'sky', dim: 0.75, pis: { x: 880, y: 1240, s: 130, tears: 2 },
      draw(x, t, S) {
        S.star(x, t, 'stars', { x: 540, y: 860, s: 360, mood: t > 7.6 ? 'happy' : 'neutral', look: [0, 0.2], hops: [5.25, ...S.STARS_HOPS], seed: 2, glow: 1.1 })
        S.star(x, t, GEM, { x: 220, y: 1250, s: 160, mood: t < 7.4 ? 'wide' : 'sparkle', look: [1, -1], hops: [7.5] })
      } },
    { at: 10.0, set: 'cafe', pis: { x: 210, y: 1270, s: 110, tears: 3, mood: 'happy' },
      draw(x, t, S) {
        S.star(x, t, GEM, { x: 330, y: 1010, s: 260, mood: t < 11.5 ? 'neutral' : 'happy', look: [1, 0], hops: [10.3, 12.0] })
        S.star(x, t, CAP, { x: 760, y: 1015, s: 260, mood: t < 11.4 ? 'neutral' : t < 12.2 ? 'squint' : 'happy', look: [-1, 0], hops: [11.6, 12.1] })
        bubble(x, t, 380, 820, 10.25, 15.4, 'how are you, really?', { size: 38, tail: -0.3 })
        bubble(x, t, 700, 680, 11.5, 15.4, 'honestly? tired. can I tell you about it?', { size: 34, tail: 0.4, col: '#e9d9a8', maxW: 520 })
        hearts(x, t, 12.3, 330, 860, { n: 5 })
        sparkles(x, t, 760, 930, 11.55, 8, 120, 2)
      },
      front(x, t) { cafeTable(x, t, true) } },
  ],
  cues: [
    ...[0.7, 1.4, 2.1, 2.8, 3.5].map((a, i) => ['pop', a, [880, 987.77, 1174.66, 1318.51, 1567.98][i], 0.045, -0.2]),
    ['pluck', 4.2, 440, 0.03, 0.4, 0.3],
    ['pop', 10.25, 880, 0.035, -0.2], ['pop', 11.5, 659.25, 0.035, 0.3], ['pluck', 12.3, 1174.66, 0.035, 0.5, -0.2],
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const WARN = EP.warn
