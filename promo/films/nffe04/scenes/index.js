// nffe04: FRIENDS FIRST ep 4, "The plan you can say no to" (18 s vertical, star_advice, music: jazzy · F).
// Story 0–15.6, then the short shared end card (2.4 s). Look: ../../nffe01/scenes/friendskit.js.
//   0.0–5.0    "An invite with | an *easy out.*"  The kitchen table: Cancer, mid-hop, pen in hand, writes an invitation
//              card for Capricorn: "MOVIE NIGHT, FRIDAY · pyjamas welcome · leave whenever · 'no' is totally fine ♡".
//              Pisces sniffles at the counter.
//   5.0        hard cut.  THE STARS: "make yes *easy*. make no *easier*."
//   9.8        Friday, the couch: CAPRICORN (bubble): "maybe for one movie?" → the screen's glow reads "MOVIE 2 OF 2";
//              Capricorn is still there, in pyjamas, laughing, popcorn everywhere.
//   12.4       Last line: "Make *no* easy."
import { makeFriends, stars, bubble, box, R, INK, BONE, MONO, INTER, SERIF, pop01, outK, glow, label, table, hearts, scarfCells } from '../../nffe01/scenes/friendskit.js'

const CAN = 'cancer', CAP = 'capricorn'
const INV = [
  { at: -1, text: 'MOVIE NIGHT · FRIDAY', font: `800 40px ${INTER}`, col: '#c0577a' },
  { at: -1, text: 'pyjamas welcome', font: `italic 500 44px ${SERIF}` },
  { at: 1.6, text: 'leave whenever', font: `italic 500 44px ${SERIF}` },
  { at: 2.8, text: '“no” is totally fine ♡', font: `italic 500 50px ${SERIF}`, col: '#c0577a' },
]
function invite(x, t) {
  const k = outK(t, [4.75, 5.0])
  if (k <= 0.01) return
  x.save(); x.translate(560, 760); x.rotate(-0.035); x.scale(k, k)
  box(x, -300, -170, 600, 340, BONE, { b: 8 })
  R(x, '#ffb37a', -300, -170, 600, 18)
  x.textAlign = 'center'; x.textBaseline = 'middle'
  INV.forEach((l, i) => {
    const kk = pop01(t, l.at, 0.25, 2)
    if (kk <= 0.01) return
    x.save(); x.globalAlpha = Math.min(1, kk); x.font = l.font; x.fillStyle = l.col || INK; x.fillText(l.text, 0, -100 + i * 72); x.restore()
  })
  x.restore()
}
function pen(x, t) {
  const i = INV.findIndex(l => t < l.at + 0.8 && t > l.at - 0.1)
  const px = 470 + 60 * Math.sin(t * 9), py = 1040 + 6 * Math.sin(t * 13)
  x.save(); x.translate(i >= 0 ? px : 470, i >= 0 ? py : 1040); x.rotate(0.6); box(x, -8, -70, 16, 80, '#ffe58a', { b: 4 }); R(x, INK, -4, 10, 8, 14); x.restore()
}
const EP = makeFriends({
  id: 'nffe04', dur: 20, cut: 5.0,
  hook: { text: 'An invite with | an *easy out.*', out: 3.0, color: '#ffc8ec' },
  lines: [stars(5.4, 'make yes *easy*. make no *easier*.')],
  boxes: [{ from: 0, to: 1, close: 9.6 }],
  last: { at: 12.4, text: 'Make *no* easy.', color: '#ffc8ec' },
  shots: [
    { at: 0, set: 'kitchen', pis: { x: 940, y: 960, s: 110, tears: 1, mood: 'sparkle', look: [-1, 0], tissues: false },
      draw(x, t, S) {
        S.star(x, t, CAN, { x: 380, y: 980, s: 270, mood: t < 2.8 ? 'squint' : 'sparkle', look: [1, 1], hops: [-0.12, 1.65, 2.85] })
      },
      front(x, t) { table(x, 480, 1110, 560, '#8a5a3a'); R(x, BONE, 470, 1094, 120, 14); pen(x, t) } },
    { at: 5.0, set: 'sky', dim: 0.75, pis: { x: 880, y: 1240, s: 130, tears: 2 },
      draw(x, t, S) {
        S.star(x, t, 'stars', { x: 540, y: 860, s: 360, mood: t > 6.9 ? 'wink' : 'neutral', look: [0, 0.2], hops: [5.05, ...S.STARS_HOPS], seed: 2, glow: 1.1 })
        S.star(x, t, CAN, { x: 220, y: 1250, s: 160, mood: 'sparkle', look: [1, -1], hops: [7.0] })
      } },
    { at: 9.8, set: 'room', setOpts: { lamp: false }, pis: { x: 950, y: 1260, s: 110, tears: 3, mood: 'happy' },
      draw(x, t, S) {
        glow(x, 540, 1300, 520, 0.7, '170,200,255')
        S.star(x, t, CAN, { x: 380, y: 1020, s: 230, mood: 'happy', look: [1, 0], hops: [11.3, 11.9] })
        const cap = S.star(x, t, CAP, { x: 680, y: 1020, s: 240, mood: t < 11.2 ? 'neutral' : 'happy', look: [-1, 0], hops: [10.1, 11.3, 11.8, 12.6], scarf: '#7c74f0' })
        void cap
        bubble(x, t, 700, 800, 10.05, 11.25, 'maybe for one movie?', { size: 38, tail: 0.1, col: '#e9d9a8' })
        const lk = pop01(t, 11.3, 0.3, 2.4)
        if (lk > 0.01) { x.save(); x.translate(540, 820); x.scale(lk, lk); box(x, -170, -36, 340, 72, '#2b2350', { b: 6 }); x.restore(); label(x, '▶ MOVIE 2 OF 2', 540, 820, { size: 34 * lk, col: '#9fe6b0' }) }
        // popcorn bowl
        box(x, 480, 1100, 120, 50, '#e8344e', { b: 5 }); for (let i = 0; i < 7; i++) R(x, '#fff3c8', 488 + i * 15, 1088 - (i % 2) * 8, 14, 14)
        hearts(x, t, 11.4, 540, 960, { n: 5 })
      } },
  ],
  overlay(x, t) { invite(x, t) },
  cues: [
    ...INV.slice(2).flatMap(l => Array.from({ length: 6 }, (_, i) => ['tick', l.at + i * 0.1, 0.016])),
    ['pluck', 2.8, 1318.51, 0.035, 0.6, 0], ['whoosh', 4.75, 0.25, 0.02],
    ['pop', 10.05, 880, 0.035, 0.3], ['pop', 11.3, 1318.51, 0.045, 0], ['glitter', 11.3, 11.7], ['pop', 11.4, 1174.66, 0.03, -0.2],
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const WARN = EP.warn
void [MONO, scarfCells]
