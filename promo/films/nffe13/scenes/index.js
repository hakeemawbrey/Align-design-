// nffe13: FRIENDS FIRST ep 13, "Far away for the holidays" (25 s vertical, star_advice, music: dreamy · Eb).
// Story 0–20.6, then the shared end card. Look: ../../nffe01/scenes/friendskit.js.
//   0.0–7.0    "Your friend can't | come *home* this year."  Aquarius in a small room in the new city, mid-hop, next to a
//              tiny pixel tree with one ornament. AQUARIUS: "it's fine. it's just one *December*."  Pisces sniffles.
//   7.0        card cut.  Cancer's kitchen: Cancer, Taurus and Leo each write a note and stuff one envelope; THE STARS
//              watch through the window: "send something they can *hold*." → "a note from each of you. by *hand*."
//   13.6       Aquarius's room: the envelope arrives, opens, and the notes fan out, every friend's handwriting:
//              "miss your laugh" · "save me a snowball" · "you're a call away" · "(this one is just tears) ♡".
//   17.2       Last line: "Far, not *forgotten.*"
import { makeFriends, stars, say, envelope, box, R, INK, BONE, SERIF, MONO, table, glow, hearts, sparkles, pop01, ease, prog, lerp } from '../../nffe01/scenes/friendskit.js'

const AQU = 'aquarius', CAN = 'cancer', TAU = 'taurus', LEO = 'leo'
function tinyTree(x, t, cx) {
  R(x, INK, cx - 10, 1110, 20, 60); R(x, '#7a5034', cx - 6, 1110, 12, 60)
  x.fillStyle = INK; x.beginPath(); x.moveTo(cx - 64, 1118); x.lineTo(cx, 960); x.lineTo(cx + 64, 1118); x.fill()
  x.fillStyle = '#2f8a5a'; x.beginPath(); x.moveTo(cx - 54, 1110); x.lineTo(cx, 976); x.lineTo(cx + 54, 1110); x.fill()
  R(x, INK, cx + 4, 1060, 22, 22); R(x, '#e8344e', cx + 8, 1064, 14, 14); glow(x, cx + 15, 1071, 40, 0.6 + 0.3 * Math.sin(t * 2))
}
const NOTES = [['miss your laugh', '#ffe2a0', -2], ['save me a snowball', '#cfe4ff', 1], ['you’re a call away', '#ffc38a', -1], ['(this one is just tears) ♡', '#c8d8ff', 2]]
function note(x, cx, cy, txt, col, rot, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot * 0.05); x.scale(k, k)
  box(x, -210, -46, 420, 92, col, { b: 6 })
  x.font = `italic 500 38px ${SERIF}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(txt, 0, 2)
  x.restore()
}
const EP = makeFriends({
  id: 'nffe13', dur: 25, cut: 7.0,
  hook: { text: 'Your friend can’t | come *home* this year.', out: 3.4, color: '#a8ecff' },
  lines: [
    say(3.85, AQU, 'it’s fine. it’s just one *December*.'),
    stars(7.4, 'send something they can *hold*.'),
    stars(10.2, 'a note from each of you. by *hand*.'),
  ],
  boxes: [{ from: 0, to: 1, close: 6.85 }, { from: 1, to: 3, close: 13.4 }],
  last: { at: 17.2, text: 'Far, not *forgotten.*', color: '#a8ecff' },
  shots: [
    { at: 0, set: 'bedroom', setOpts: { wall: '#26365a' }, pis: { x: 950, y: 1260, s: 100, tears: 1, mood: 'wide', look: [-1, -1] },
      draw(x, t, S) {
        tinyTree(x, t, 820)
        S.star(x, t, AQU, { x: 420, y: 960, s: 280, mood: t < 3.9 ? 'neutral' : 'squint', look: [1, 0.3], hops: [-0.12, ...S.hopsFor(AQU)] })
      } },
    { at: 7.0, set: 'kitchen', pis: { x: 950, y: 1260, s: 110, tears: 2, mood: 'sparkle' },
      draw(x, t, S) {
        S.star(x, t, 'stars', { x: 540, y: 520, s: 170, mood: t > 11.2 ? 'happy' : 'neutral', look: [0, 1], hops: S.STARS_HOPS, seed: 2, glow: 1.1 })
        S.star(x, t, CAN, { x: 270, y: 990, s: 210, mood: 'squint', look: [1, 1], hops: [7.6, 8.3, 11.6] })
        S.star(x, t, TAU, { x: 540, y: 990, s: 210, mood: 'happy', look: [0, 1], hops: [8.0, 8.9, 11.8] })
        S.star(x, t, LEO, { x: 810, y: 990, s: 210, mood: 'sparkle', look: [-1, 1], hops: [8.5, 9.4, 12.0] })
      },
      front(x, t) {
        table(x, 540, 1110, 820, '#8a5a3a')
        NOTES.slice(0, 3).forEach(([, col], i) => { const p = ease.inOutCubic(prog(t, 11.0 + i * 0.3, 11.5 + i * 0.3)); x.save(); x.translate(lerp(270 + i * 270, 540, p), lerp(1090, 1080, p)); x.scale(1 - 0.6 * p, 1 - 0.6 * p); box(x, -60, -16, 120, 32, col, { b: 4 }); x.restore() })
        envelope(x, 540, 1095, 0.5, { open: t < 12.2 ? 1 : 0 })
      } },
    { at: 13.6, set: 'bedroom', setOpts: { wall: '#26365a' }, pis: { x: 950, y: 1260, s: 100, tears: 3, mood: 'happy' },
      draw(x, t, S) {
        tinyTree(x, t, 820)
        const op = t > 14.0
        S.star(x, t, AQU, { x: 300, y: 980, s: 250, mood: t < 14.2 ? 'wide' : 'happy', look: [1, -0.5], hops: [13.7, 14.1, 15.6], tears: t > 15.0 ? 2 : 0 })
        envelope(x, 520, 1080, 0.7, { open: op ? 1 : 0 })
        sparkles(x, t, 520, 1060, 14.0, 10, 120, 1)
        NOTES.forEach(([txt, col, rot], i) => note(x, 560, 520 + i * 112, txt, col, rot, pop01(t, 14.2 + i * 0.4, 0.3, 2.2) * (1 - ease.inQuad(prog(t, 16.9, 17.15)))))
        hearts(x, t, 15.6, 300, 830, { n: 6 })
      } },
  ],
  cues: [
    ...[7.6, 8.0, 8.5, 8.9, 9.4].map(a => ['tick', a, 0.025]), ['whoosh', 11.0, 0.9, 0.025], ['pop', 12.2, 880, 0.04, 0],
    ['whoosh', 13.65, 0.3, 0.03], ['pop', 14.0, 1318.51, 0.045, 0], ['glitter', 14.0, 14.4],
    ...NOTES.map((n, i) => ['pop', 14.2 + i * 0.4, [880, 987.77, 1174.66, 1318.51][i], 0.035, 0.3]), ['pluck', 15.6, 1174.66, 0.035, 0.5, -0.3],
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const WARN = EP.warn
void [BONE, MONO]
