// nffe11: FRIENDS FIRST ep 11, "The tiny check-in" (18 s vertical, star_advice, music: chiptune · A).
// Story 0–15.6, then the short shared end card (2.4 s). Look: ../../nffe01/scenes/friendskit.js.
//   0.0–5.0    "No energy to | *text back?*"  Capricorn under a blanket, mid-hop, phone up: 14 UNREAD in the group. Capricorn
//              types a long apology paragraph… strikes it out. Pisces sniffles on the rug.
//   5.0        hard cut.  THE STARS: "small check-ins *count*. send the tiny one."
//   9.8        the phone: Capricorn sends a ten-second voice note: "alive. tired. love you."  The group answers with
//              hearts: GEMINI "♡♡♡" · TAURUS "love you too" · CANCER "proud of you ♡".
//   12.4       Last line: "Small counts. *Always.*"
import { makeFriends, stars, bigPhone, blanket, bubble, label, hearts, pop01, outK, prog, clamp, phoneSmall } from '../../nffe01/scenes/friendskit.js'

const CAP = 'capricorn'
const OLD = [
  { at: -9, from: 'them', name: 'GEMINI', nameCol: '#ffe58a', text: 'cap?? you alive' },
  { at: -9, from: 'them', name: 'TAURUS', nameCol: '#b8f0c0', text: 'no pressure! just checking' },
  { at: -9, from: 'them', name: 'CANCER', nameCol: '#cfe4ff', text: 'thinking of you ♡' },
]
const NEW = [...OLD,
  { at: 10.1, from: 'me', text: '▶ voice note · 0:10' },
  { at: 11.0, from: 'them', name: 'GEMINI', nameCol: '#ffe58a', text: '♡♡♡' },
  { at: 11.4, from: 'them', name: 'TAURUS', nameCol: '#b8f0c0', text: 'love you too' },
  { at: 11.8, from: 'them', name: 'CANCER', nameCol: '#cfe4ff', text: 'proud of you ♡' },
]
const DRAFT = 'so sorry I’ve been terrible at replying, work has'
const DR = { type: [0.3, 3.3], strike: 3.5, clear: 4.2 }
const EP = makeFriends({
  id: 'nffe11', dur: 20, cut: 5.0,
  hook: { text: 'No energy to | *text back?*', out: 3.0, color: '#e9d9a8' },
  lines: [stars(5.4, 'small check-ins *count*. send the tiny one.')],
  boxes: [{ from: 0, to: 1, close: 9.6 }],
  last: { at: 12.4, text: 'Small counts. *Always.*', color: '#e9d9a8' },
  shots: [
    { at: 0, set: 'room', setOpts: { couch: true }, pis: { x: 950, y: 1260, s: 110, tears: 1, mood: 'wide', look: [-1, -1] },
      draw(x, t, S) {
        S.star(x, t, CAP, { x: 260, y: 990, s: 270, mood: t < 3.5 ? 'squint' : 'sleepy', zzz: false, look: [1, -0.5], hops: [-0.12, 3.5] })
        blanket(x, 280, 1060, 300, 110, '#5a8a7a')
        phoneSmall(x, t, 380, 1010, { s: 0.7, rot: 0.2 })
      } },
    { at: 5.0, set: 'sky', dim: 0.75, pis: { x: 880, y: 1240, s: 130, tears: 2 },
      draw(x, t, S) {
        S.star(x, t, 'stars', { x: 540, y: 860, s: 360, mood: t > 7.1 ? 'happy' : 'neutral', look: [0, 0.2], hops: [5.05, ...S.STARS_HOPS], seed: 2, glow: 1.1 })
        S.star(x, t, CAP, { x: 220, y: 1250, s: 160, mood: t < 7.0 ? 'sleepy' : 'sparkle', zzz: false, look: [1, -1], hops: [7.1] })
      } },
    { at: 9.8, set: 'room', pis: { x: 950, y: 1260, s: 110, tears: 3, mood: 'happy' },
      draw(x, t, S) {
        S.star(x, t, CAP, { x: 230, y: 1000, s: 250, mood: t < 11.0 ? 'neutral' : 'happy', look: [1, -0.5], hops: [10.1, 11.0, 11.4, 11.8] })
        blanket(x, 250, 1060, 280, 110, '#5a8a7a')
        bubble(x, t, 250, 780, 10.15, 12.25, 'alive. tired. love you.', { size: 30, col: '#e9d9a8', maxW: 200 })
        hearts(x, t, 12.3, 230, 860, { n: 7 })
      } },
  ],
  overlay(x, t) {
    if (t < 5.0) {
      const pop = pop01(t, -0.3, 0.3) * outK(t, [4.75, 5.0])
      const n = t < DR.type[0] ? 0 : t < DR.clear ? Math.floor(DRAFT.length * clamp(prog(t, ...DR.type))) : 0
      bigPhone(x, t, { cx: 690, cy: 890, w: 500, h: 760, title: 'the group ✦', msgs: OLD, pop, rot: 0.03, draft: { text: n > 26 ? '…' + DRAFT.slice(n - 26, n) : DRAFT.slice(0, n), chars: 99, strike: t > DR.strike } })
      const bk = pop01(t, -0.3, 0.3) * outK(t, [4.75, 5.0])
      if (bk > 0.01) label(x, '14 UNREAD', 690, 600, { size: 34 * bk, col: '#ff6b7f', font: 'Inter, sans-serif', weight: 800 })
    }
    if (t > 9.85) {
      const pop = pop01(t, 9.85, 0.35, 2) * outK(t, [15.2, 15.5])
      bigPhone(x, t, { cx: 690, cy: 1000, w: 500, h: 700, title: 'the group ✦', msgs: NEW, pop, rot: 0.02 })
    }
  },
  cues: [
    ...Array.from({ length: 22 }, (_, i) => ['tick', DR.type[0] + i * 0.135, 0.016]),
    ['pluck', DR.strike, 440, 0.03, 0.3, 0.3], ['whoosh', DR.clear - 0.1, 0.25, 0.025],
    ['whoosh', 9.85, 0.3, 0.03], ['pop', 10.1, 987.77, 0.045, 0.2], ['pop', 11.0, 1174.66, 0.04, 0.3], ['pop', 11.4, 1318.51, 0.04, 0.3], ['pop', 11.8, 1567.98, 0.04, 0.3], ['glitter', 11.0, 11.9],
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const WARN = EP.warn
