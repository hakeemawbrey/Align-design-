// nffe12: FRIENDS FIRST ep 12, "Boundaries with friends" (28 s vertical, star_advice, music: cinematic · Dm).
// Story 0–25.6, then the short shared end card (2.4 s). Look: ../../nffe01/scenes/friendskit.js.
//   0.0–8.6    "It's 1 AM. They want | to *vent.* Again."  Cancer in bed, mid-jolt, the phone buzzing on the nightstand
//              (GEMINI, calling). The clock: 1:04 AM. Cancer answers: "okay so you will NOT believe…"  A tally of
//              nights stacks up: MON · TUE · WED · THU. CANCER: "I love them. but I'm running on *empty*."
//   8.6        hard cut.  THE STARS: "a boundary is care for *both* of you." → "say the no *and* the next yes."
//   15.8       the next evening, the phone: CANCER "I love you, and I can't talk tonight. lunch tomorrow?" · GEMINI
//              "deal. thank you for telling me ♡"
//   20.5       lunch at the café: both rested, laughing, mugs up. Last line: "*Tomorrow* is still love."
import { makeFriends, stars, say, bigPhone, bubble, label, phoneSmall, blanket, table, mug, hearts, pop01, outK, box } from '../../nffe01/scenes/friendskit.js'

const CAN = 'cancer', GEM = 'gemini'
const NIGHTS = ['MON 1 AM', 'TUE 1 AM', 'WED 1 AM', 'THU 1 AM']
const MSGS = [
  { at: 16.1, from: 'me', text: 'I love you, and I can’t talk tonight. lunch tomorrow?' },
  { at: 17.5, from: 'them', name: 'GEMINI', nameCol: '#ffe58a', text: 'deal. thank you for telling me ♡' },
]
function clockBox(x, txt) { box(x, 760, 880, 200, 64, '#141028', { b: 6 }); label(x, txt, 860, 913, { size: 32, col: '#ff6b7f' }) }
const EP = makeFriends({
  id: 'nffe12', dur: 30, cut: 8.6,
  hook: { text: 'It’s 1 AM. They want | to *vent.* Again.', out: 3.6, color: '#ffe58a' },
  lines: [
    say(4.6, CAN, 'I love them. but I’m running on *empty*.'),
    stars(9.0, 'a boundary is care for *both* of you.'),
    stars(12.2, 'say the no *and* the next yes.'),
  ],
  boxes: [{ from: 0, to: 1, close: 8.4 }, { from: 1, to: 3, close: 15.5 }],
  last: { at: 21.4, text: '*Tomorrow* is still love.', color: '#ffe58a' },
  shots: [
    { at: 0, set: 'bedroom', dim: 0.5, pis: { x: 640, y: 1250, s: 100, tears: 1, mood: 'wide', look: [-1, -1] },
      draw(x, t, S) {
        const ring = t < 2.0
        S.star(x, t, CAN, { x: 300, y: 950, s: 270, mood: ring ? 'wide' : t < 4.4 ? 'sleepy' : 'squint', zzz: false, look: [1, 0.3], hops: [-0.12, 2.0] })
        blanket(x, 420, 1010, 600, 130, '#4a5a9a')
        clockBox(x, '1:04 AM')
        phoneSmall(x, t, ring ? 860 : 400, ring ? 980 : 930, { s: 0.75, rot: ring ? 0 : -0.3, text: ring ? 'GEMINI|calling' : null, buzz: ring ? 1 : 0, glowA: 1.2 })
        bubble(x, t, 600, 760, 2.3, 4.3, 'okay so you will NOT believe…', { size: 32, col: '#ffe58a', maxW: 420 })
        NIGHTS.forEach((n, i) => { const k = pop01(t, 4.4 + i * 0.35, 0.25, 2.6) * outK(t, [8.2, 8.5]); if (k > 0.01) label(x, '☎ ' + n, 760, 560 + i * 60, { size: 30 * k, col: i === 3 ? '#ff6b7f' : '#cfe4ff', align: 'left' }) })
      } },
    { at: 8.6, set: 'sky', dim: 0.75, pis: { x: 880, y: 1240, s: 130, tears: 2 },
      draw(x, t, S) {
        S.star(x, t, 'stars', { x: 540, y: 860, s: 360, mood: t > 13.4 ? 'happy' : 'neutral', look: [0, 0.2], hops: [8.65, ...S.STARS_HOPS], seed: 2, glow: 1.1 })
        S.star(x, t, CAN, { x: 220, y: 1250, s: 160, mood: t < 12.0 ? 'sleepy' : 'sparkle', zzz: false, look: [1, -1], hops: [12.2] })
      } },
    { at: 15.8, set: 'room', pis: { x: 950, y: 1260, s: 110, tears: 2, mood: 'sparkle' },
      draw(x, t, S) {
        S.star(x, t, CAN, { x: 230, y: 1000, s: 250, mood: t < 17.5 ? 'neutral' : 'happy', look: [1, -0.5], hops: [16.1, 17.6] })
        hearts(x, t, 17.7, 230, 860, { n: 5 })
      } },
    { at: 20.5, set: 'cafe', pis: { x: 210, y: 1270, s: 110, tears: 3, mood: 'happy' },
      draw(x, t, S) {
        S.star(x, t, CAN, { x: 360, y: 1000, s: 260, mood: 'happy', look: [1, 0], hops: [20.6, 21.9, 23.0] })
        S.star(x, t, GEM, { x: 720, y: 1000, s: 260, mood: 'sparkle', look: [-1, 0], hops: [20.7, 22.2, 23.3] })
        hearts(x, t, 21.0, 540, 880, { n: 6 })
      },
      front(x, t) { table(x, 540, 1110, 460, '#7a4a32'); mug(x, t, 440, 1104, 1, '#cfe4ff'); mug(x, t, 640, 1104, 1, '#ffe58a') } },
  ],
  overlay(x, t) {
    if (t > 15.85 && t < 20.5) {
      const pop = pop01(t, 15.85, 0.35, 2) * outK(t, [20.2, 20.5])
      bigPhone(x, t, { cx: 680, cy: 900, w: 520, h: 520, title: 'gemini ✦', msgs: MSGS, pop, rot: 0.02, typing: [16.7, 17.5] })
    }
  },
  cues: [
    ...Array.from({ length: 8 }, (_, i) => ['pluck', i * 0.24, 1318.51, 0.02, 0.2, 0.4]), ['tick', 2.0, 0.05], ['pop', 2.3, 987.77, 0.035, 0.2],
    ...NIGHTS.map((n, i) => ['pop', 4.4 + i * 0.35, [659.25, 739.99, 880, 987.77][i], 0.035, 0.3]),
    ['whoosh', 15.85, 0.3, 0.03], ['pop', 16.1, 987.77, 0.04, 0.2], ['tick', 16.8, 0.02], ['tick', 17.15, 0.02], ['pop', 17.5, 1318.51, 0.045, -0.2], ['pluck', 17.7, 1174.66, 0.035, 0.5, -0.3],
    ['pluck', 21.0, 1174.66, 0.035, 0.5, 0], ['glitter', 21.0, 21.4],
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const WARN = EP.warn
