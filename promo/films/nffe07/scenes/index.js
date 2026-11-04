// nffe07: FRIENDS FIRST ep 7, "Who checks on the checker?" (23 s vertical, star_advice, music: lofi · Bm).
// Story 0–20.6, then the short shared end card (2.4 s). Look: ../../nffe01/scenes/friendskit.js.
//   0.0–7.0    "The friend who | *always* listens."  The couch: Cancer, mid-nod, a phone at each ear. Bubbles pile in
//              from everyone: "can I vent real quick?" "do you think they like me?" "and THEN my boss…"  Cancer: "mm-hm."
//              CANCER: "of course! I'm here. *always.*"  …and slowly droops. Pisces sniffles by the lamp.
//   7.0        hard cut.  THE STARS: "the listener needs a *listener* too." → "ask them how *they* are. then wait."
//   13.6       the couch. Virgo sits down with two mugs: "your turn. how are YOU?"  Cancer blinks… tears up: "…honestly?
//              kind of tired."  Virgo leans in; hearts.
//   17.2       Last line: "Check on the *checker.*"
import { makeFriends, stars, say, bubble, phoneSmall, mug, hearts, lerp, ease, prog } from '../../nffe01/scenes/friendskit.js'

const CAN = 'cancer', VIR = 'virgo'
const IN = [[-0.3, 'can I vent real quick?', 760, 640, '#ffe58a'], [0.9, 'do you think they like me?', 360, 560, '#ffc8ec'], [2.1, 'and THEN my boss…', 740, 760, '#b8f0c0'], [3.2, 'wait, one more thing', 340, 700, '#ffb8a0']]
const EP = makeFriends({
  id: 'nffe07', dur: 25, cut: 7.0,
  hook: { text: 'The friend who | *always* listens.', out: 3.4, color: '#cfe4ff' },
  lines: [
    say(3.9, CAN, 'of course! I’m here. *always*.'),
    stars(7.4, 'the listener needs a *listener* too.'),
    stars(10.4, 'ask them how *they* are. then wait.'),
  ],
  boxes: [{ from: 0, to: 1, close: 6.9 }, { from: 1, to: 3, close: 13.4 }],
  last: { at: 17.2, text: 'Check on the *checker.*', color: '#cfe4ff' },
  shots: [
    { at: 0, set: 'room', pis: { x: 210, y: 1270, s: 110, tears: 1, mood: 'wide', look: [1, -1] },
      draw(x, t, S) {
        const droop = ease.inOutQuad(prog(t, 5.6, 6.8))
        const nods = [-0.1, 0.5, 1.1, 1.7, 2.3, 2.9, 3.5]
        S.star(x, t, CAN, { x: 540, y: 1000, s: 300, mood: droop > 0.5 ? 'sleepy' : t > 4.2 ? 'happy' : 'neutral', zzz: false, look: [0, 0.3], hops: [...nods, ...S.hopsFor(CAN)], squash: 0.1 * droop })
        phoneSmall(x, t, 370, 950 + 20 * droop, { s: 0.75, rot: -0.3, glowA: 0.6 }); phoneSmall(x, t, 710, 950 + 20 * droop, { s: 0.75, rot: 0.3, glowA: 0.6 })
        IN.forEach(([a, q, bx, by, c]) => bubble(x, t, bx, by, a, 6.9, q, { size: 34, col: c, tail: bx > 540 ? -0.5 : 0.5 }))
        bubble(x, t, 540, 830, 1.5, 2.9, 'mm-hm.', { size: 30, col: '#cfe4ff' })
      } },
    { at: 7.0, set: 'sky', dim: 0.75, pis: { x: 880, y: 1240, s: 130, tears: 2 },
      draw(x, t, S) {
        S.star(x, t, 'stars', { x: 540, y: 860, s: 360, mood: t > 11.9 ? 'happy' : 'neutral', look: [0, 0.2], hops: [7.05, ...S.STARS_HOPS], seed: 2, glow: 1.1 })
        S.star(x, t, CAN, { x: 220, y: 1250, s: 160, mood: t < 10.3 ? 'sleepy' : 'wide', zzz: false, look: [1, -1], hops: [10.35] })
      } },
    { at: 13.6, set: 'room', pis: { x: 210, y: 1270, s: 110, tears: 3, mood: 'happy' },
      draw(x, t, S) {
        const lean = ease.outCubic(prog(t, 16.0, 16.5))
        S.star(x, t, CAN, { x: lerp(420, 450, lean), y: 1000, s: 270, mood: t < 14.8 ? 'wide' : t < 16.2 ? 'neutral' : 'happy', look: [1, 0], hops: [14.75, 15.4], tears: t > 15.0 ? 1 : 0 })
        S.star(x, t, VIR, { x: lerp(720, 680, lean), y: 1000, s: 250, mood: t < 15.6 ? 'happy' : 'sparkle', look: [-1, 0], hops: [13.9, 14.3, 16.0] })
        mug(x, t, 790, 1110, 1, '#d6f0b0'); mug(x, t, 330, 1110, 1, '#cfe4ff')
        bubble(x, t, 720, 780, 13.9, 17.0, 'your turn. how are YOU?', { size: 36, col: '#d6f0b0', tail: -0.2 })
        bubble(x, t, 400, 650, 15.4, 20.4, '…honestly? kind of tired.', { size: 34, col: '#cfe4ff', tail: 0.2, up: false })
        hearts(x, t, 16.2, 560, 880, { n: 6 })
      } },
  ],
  cues: [
    ...IN.map(([a], i) => ['pop', Math.max(0.05, a), [880, 987.77, 1174.66, 1318.51][i], 0.035, i % 2 ? -0.3 : 0.3]),
    ['pop', 1.5, 659.25, 0.03, 0], ['whoosh', 5.6, 1.0, 0.02],
    ['pop', 13.9, 1174.66, 0.035, 0.3], ['pluck', 14.75, 880, 0.03, 0.6, -0.2], ['pop', 15.4, 739.99, 0.035, -0.3], ['pluck', 16.2, 1174.66, 0.035, 0.5, 0],
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const WARN = EP.warn
