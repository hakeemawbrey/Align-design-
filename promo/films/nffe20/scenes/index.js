// nffe20: FRIENDS FIRST ep 20, "Thank your friend" (18 s vertical, star_advice, music: jazzy · Ab).
// Story 0–15.6, then the short shared end card (2.4 s). Look: ../../nffe01/scenes/friendskit.js.
//   0.0–5.0    "When did you last | *thank* a friend?"  Cancer at the kitchen table, mid-hop, writing a note that writes
//              on: "Dear Taurus, thank you for every Tuesday call this year. You kept me going." Pisces sniffles.
//   5.0        hard cut.  THE STARS: "be specific. name the *thing* they did."
//   9.8        the couch: Taurus reads the note… "I didn't think you noticed."  Taurus cries; Pisces, right beside,
//              cries harder. Cancer hugs in. Hearts.
//   12.4       Last line: "Thank them *for the thing.*"
import { makeFriends, stars, bubble, box, R, INK, BONE, SERIF, table, hearts, pop01, outK, prog, clamp } from '../../nffe01/scenes/friendskit.js'

const CAN = 'cancer', TAU = 'taurus'
const NOTE = [['Dear Taurus,', -1], ['thank you for every', 0.6], ['Tuesday call this year.', 1.6], ['You kept me going. ♡', 2.7]]
function noteCard(x, t, cx, cy, s, rot, live) {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
  box(x, -280, -170, 560, 340, '#fff6e0', { b: 8 }); for (let i = 0; i < 4; i++) R(x, 'rgba(160,140,200,0.35)', -250, -96 + i * 72, 500, 3)
  x.font = `italic 500 46px ${SERIF}`; x.fillStyle = INK; x.textAlign = 'left'; x.textBaseline = 'alphabetic'
  NOTE.forEach(([l, at], i) => { const n = live ? Math.floor(l.length * clamp(prog(t, at, at + 0.8))) : l.length; x.fillStyle = i === 2 ? '#c0577a' : INK; x.fillText(l.slice(0, n), -240, -104 + i * 72) })
  x.restore()
}
const EP = makeFriends({
  id: 'nffe20', dur: 20, cut: 5.0,
  hook: { text: 'When did you last | *thank* a friend?', out: 3.0, color: '#ffd89a' },
  lines: [stars(5.4, 'be specific. name the *thing* they did.')],
  boxes: [{ from: 0, to: 1, close: 9.6 }],
  last: { at: 12.4, text: 'Thank them *for the thing.*', color: '#ffd89a' },
  shots: [
    { at: 0, set: 'kitchen', pis: { x: 940, y: 960, s: 110, tears: 1, mood: 'sparkle', look: [-1, 0], tissues: false },
      draw(x, t, S) { S.star(x, t, CAN, { x: 300, y: 980, s: 250, mood: 'happy', look: [1, 1], hops: [-0.12, 0.65, 1.65, 2.75] }) },
      front(x, t) { table(x, 480, 1110, 600, '#8a5a3a') } },
    { at: 5.0, set: 'sky', dim: 0.75, pis: { x: 880, y: 1240, s: 130, tears: 2 },
      draw(x, t, S) {
        S.star(x, t, 'stars', { x: 540, y: 860, s: 360, mood: t > 6.9 ? 'happy' : 'neutral', look: [0, 0.2], hops: [5.05, ...S.STARS_HOPS], seed: 2, glow: 1.1 })
        S.star(x, t, CAN, { x: 220, y: 1250, s: 160, mood: 'sparkle', look: [1, -1], hops: [6.9] })
      } },
    { at: 9.8, set: 'room', pis: { x: 850, y: 1020, s: 170, tears: 3, mood: 'happy', tissues: false },
      draw(x, t, S) {
        S.star(x, t, CAN, { x: 270, y: 1010, s: 220, mood: 'happy', look: [1, 0], hops: [11.6, 12.2] })
        S.star(x, t, TAU, { x: 540, y: 1000, s: 260, mood: t < 10.7 ? 'neutral' : 'happy', look: [0, 1], hops: [10.7, 11.5], tears: t > 10.7 ? 2 : 0 })
        bubble(x, t, 560, 720, 10.75, 12.3, 'I didn’t think you noticed.', { size: 34, col: '#b8f0c0', maxW: 460 })
        hearts(x, t, 11.6, 400, 860, { n: 7 })
      } },
  ],
  overlay(x, t) {
    if (t < 5.0) { const k = outK(t, [4.75, 5.0]); if (k > 0.01) noteCard(x, t, 560, 760, k, -0.03, true) }
    if (t > 9.8) { const k = pop01(t, 9.8, 0.3, 2) * outK(t, [10.6, 10.75]); if (k > 0.01) noteCard(x, t, 540, 760, k * 0.9, 0.03, false) }
  },
  cues: [
    ...NOTE.slice(1).flatMap(([, at]) => Array.from({ length: 7 }, (_, i) => ['tick', at + i * 0.11, 0.016])),
    ['pluck', 2.7, 1318.51, 0.035, 0.6, 0], ['whoosh', 9.8, 0.3, 0.03], ['pop', 10.75, 880, 0.035, 0.2], ['pluck', 11.6, 1174.66, 0.035, 0.6, 0], ['glitter', 11.6, 12.0],
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const WARN = EP.warn
void BONE
