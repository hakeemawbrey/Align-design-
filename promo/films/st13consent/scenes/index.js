// st13consent (30 s vertical Align ad, Star Talk season 13 "Star Talk Explains", S13 E22) · story 0–25.6, then the end card.
//   ❓ "What does *enthusiastic* consent mean?"  ♉ TAURUS (student) is mid-"huh?"; THE STARS teach at the chalkboard:
//   ♥ a clear, freely given yes · ♥ a yes can change to a no at any time · ♥ check in, and keep checking in.
//   Kept gentle and non-explicit (a hug, holding hands). Last line (THE STARS): "Only *yes* means yes."
// The engine is ./classkit.js (this folder's copy); the season kit is ../../stexplain.js. Pure f(t).
import { STAR, signStar } from '../../startalk.js'
import { makeEpisode, R, INK, BONE } from './classkit.js'

const TAU = signStar('taurus')
const PINK = '#ff8fb1', MINT = '#8ff0c0'

// a chalk speech bubble (outline only), drawn on as one stroke, with its text written inside
function bubbleItems(x, y, w, text, at, tail = 'left') {
  const h = 70, tx = tail === 'left' ? x + 40 : x + w - 40
  return [
    { kind: 'line', at, dur: 0.5, width: 5, pts: [[x + 14, y], [x + w - 14, y], [x + w, y + 14], [x + w, y + h - 14], [x + w - 14, y + h], [tx + 22, y + h], [tx, y + h + 26], [tx - 4, y + h], [x + 14, y + h], [x, y + h - 14], [x, y + 14], [x + 14, y]] },
    { kind: 'text', text, x: x + w / 2, y: y + 36, at: [at[0], at[1] + 0.35], size: 28, align: 'center' },
  ]
}

const EP = makeEpisode({
  id: 'st13consent', numeral: 'S13 E22', duration: 30, key: 'F',
  q: 'What does *enthusiastic* consent mean?', qAccent: PINK,
  teacher: { tag: '★ THE STARS', color: STAR.sky, pitch: 523 },
  student: { tag: '♉ TAURUS', color: TAU.color, glyph: TAU.glyph, pitch: 392 },
  board: { title: 'CONSENT' },
  lines: [
    ['s', "wait, isn't a yes just... a *yes?*"],
    ['t', 'a real yes is *clear* and freely given.'],
    ['t', 'it can change to a *no* at any time.'],
    ['t', 'so *check in*, and keep checking in.'],
    ['s', "so 'um... I guess?' isn't a yes. *got it!*", { bulb: true }],
  ],
  chalk: [
    // beat 1: what a yes is
    { kind: 'text', text: 'YES', x: 0, y: 120, at: [1, 0.25], size: 100, color: MINT, cps: 10 },
    { kind: 'text', text: 'clear +|freely given', x: 200, y: 96, at: [1, 0.6], size: 42 },
    { kind: 'tag', tag: 'tip', x: 900, y: 120, at: [1, 0.3] },
    // beat 2: a yes can turn into a no
    { kind: 'text', text: 'yes', x: 0, y: 266, at: [2, 0.2], size: 60, color: MINT },
    { kind: 'line', at: [2, 0.5], dur: 0.4, pts: [[124, 266], [222, 266]], arrow: true },
    { kind: 'text', text: 'no', x: 240, y: 266, at: [2, 0.9], size: 60, color: PINK },
    { kind: 'text', text: '(anytime)', x: 328, y: 268, at: [2, 1.1], size: 30 },
    { kind: 'tag', tag: 'tip', x: 900, y: 266, at: [2, 0.3] },
    // beat 3: check in, keep checking in
    ...bubbleItems(0, 358, 256, 'can I hug you?', [3, 0.25], 'left'),
    ...bubbleItems(270, 358, 196, 'still good?', [3, 1.0], 'right'),
    { kind: 'tag', tag: 'tip', x: 900, y: 393, at: [3, 0.3] },
  ],
  recap: ['A *clear* yes, freely given', 'A yes can become a *no*', '*Check in*, and keep checking'],
  last: 'Only *yes* means yes.', lastWho: 't',
  moods(ph, t, T) {
    if (ph === 'q') return [{ mood: 'happy' }, { mood: 'wide', look: [1, -1] }]
    if (ph === 0) return [{ mood: 'neutral', look: [-1, 0] }, { mood: 'squint', look: [1, -1] }]
    if (ph === 1 || ph === 2) return [{ mood: 'happy', look: [-1, -1] }, { mood: 'neutral', look: [1, -1] }]
    if (ph === 3) return [{ mood: 'sparkle', look: [-1, 0] }, { mood: 'wide', look: [1, -1] }]
    if (ph === 4) return [{ mood: 'happy', look: [-1, 0] }, { mood: 'sparkle', look: [1, 0] }]
    return [{ mood: 'happy', look: [0, 0] }, { mood: 'happy', look: [1, 0] }]
  },
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void R; void INK; void BONE
