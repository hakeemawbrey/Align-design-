// st13pace (45 s vertical Align ad, Star Talk season 13 "Star Talk Explains", S13 E26) · story 0–40.6, then the end card.
//   ❓ "How fast is *too fast*?"  ♐ SAGITTARIUS (student) already booked a trip; ♉ TAURUS teaches at the board:
//   ♥ there's no right speed, only a matched one (a dial with no numbers, two pixel cars side by side) ·
//   ♥ check in out loud: "is this pace good for you?" · ♥ feeling rushed is information. Last line (TAURUS): "Match the *pace*."
// The engine is ./classkit.js (this folder's copy); the season kit is ../../stexplain.js. Pure f(t).
import { clamp, prog, ease } from '../../../src/lib.js'
import { signStar } from '../../startalk.js'
import { makeEpisode, R, INK, BONE, pop01 } from './classkit.js'

const TAU = signStar('taurus'), SAG = signStar('sagittarius')
const PINK = '#ff8fb1', MINT = '#8ff0c0', NEON = '#ff7ad9', CYAN = '#7ae8ff'

// a little pixel car (side view), facing right
function car(x, cx, cy, px, body, t, seed) {
  const b = Math.round(Math.sin(t * 14 + seed) * 0.6) * 2
  const rows = ['...XXXX...', '..XWWWWX..', 'XXXXXXXXXX', 'XXXXXXXXXX', '.OO....OO.']
  rows.forEach((r, j) => [...r].forEach((c, i) => {
    if (c === '.') return
    const col = c === 'X' ? body : c === 'W' ? '#c4ecff' : INK
    R(x, INK, cx + (i - 5) * px - 2, cy + (j - 2.5) * px + (c === 'O' ? 0 : b) - 2, px + 4, px + 4)
    R(x, col, cx + (i - 5) * px, cy + (j - 2.5) * px + (c === 'O' ? 0 : b), px, px)
  }))
}
// the speedometer: a chalk arc with no numbers, the needle wobbling (there is no "right" number)
function dial(x, t, B, at) {
  const k = clamp(prog(t, at, at + 0.5)); if (k <= 0) return
  const cx = B.x0 + 90, cy = B.y0 + 175, a = -Math.PI + 0.35 + (Math.PI - 0.7) * (0.5 + 0.45 * Math.sin((t - at) * 2.3))
  x.save(); x.globalAlpha *= k; x.strokeStyle = '#f4f1e8'; x.lineWidth = 6; x.lineCap = 'round'
  x.beginPath(); x.moveTo(cx, cy); x.lineTo(cx + Math.cos(a) * 66, cy + Math.sin(a) * 66); x.stroke()
  R(x, '#f4f1e8', cx - 7, cy - 7, 14, 14)
  x.restore()
}
// the two cars, side by side on two lanes, cruising together
function cars(x, t, B, at) {
  const p = pop01(t, at, 0.35, 2)
  if (p <= 0) return
  const drift = 120 + Math.sin((t - at) * 1.3) * 100
  x.save(); x.globalAlpha *= clamp(p)
  car(x, B.x0 + drift, B.y0 + 262, 7, NEON, t, 1)
  car(x, B.x0 + drift, B.y0 + 318, 7, CYAN, t, 4)
  x.restore()
}

const EP = makeEpisode({
  id: 'st13pace', numeral: 'S13 E26', duration: 45, key: 'A',
  q: 'How fast is *too fast*?', qAccent: NEON,
  teacher: { tag: '♉ TAURUS', color: TAU.color, glyph: TAU.glyph, pitch: 392 },
  student: { tag: '♐ SAGITTARIUS', color: SAG.color, glyph: SAG.glyph, pitch: 698 },
  board: { title: 'PACE' },
  lines: [
    ['s', 'we met tuesday. I already booked a *trip.*'],
    ['t', "whoa. there's no *right* speed for love."],
    ['s', "then how do I know it's *too fast?*"],
    ['t', 'there\'s only a *matched* speed: you two.'],
    ['s', 'so we... *race?*'],
    ['t', 'no racing. you ride *side by side*.'],
    ['t', "ask out loud: 'is this pace *good* for you?'"],
    ['t', 'and feeling *rushed* is information.'],
    ['t', "'slower, please' is a full *sentence*."],
    ['s', 'so maybe I ask *before* I book the trip.', { bulb: true }],
  ],
  chalk: [
    // beat 1: no right speed (a dial with no numbers)
    { kind: 'circle', x: 90, y: 175, r: 80, at: [1, 0.2], dur: 0.5, from: Math.PI, sweep: Math.PI },
    { kind: 'draw', at: [1, 0.6], fn: dial },
    { kind: 'text', text: 'no *right*|speed', x: 200, y: 110, at: [1, 0.7], size: 40 },
    { kind: 'tag', tag: 'tip', x: 900, y: 110, at: [1, 0.3] },
    // beat 2: a matched one (two lanes, two cars side by side)
    { kind: 'line', at: [3, 0.2], dur: 0.5, width: 4, dash: [18, 14], pts: [[0, 290], [500, 290]] },
    { kind: 'line', at: [3, 0.3], dur: 0.5, width: 4, pts: [[0, 346], [500, 346]] },
    { kind: 'draw', at: [3, 0.6], fn: cars },
    { kind: 'text', text: '*matched* speed', x: 250, y: 228, at: [3, 0.9], size: 32, align: 'center' },
    { kind: 'tag', tag: 'tip', x: 900, y: 290, at: [3, 0.3] },
    // beat 3: check in out loud; rushed is information
    { kind: 'text', text: "'is this pace *good*?'", x: 0, y: 398, at: [6, 0.4], size: 32, color: MINT },
    { kind: 'tag', tag: 'tip', x: 900, y: 398, at: [6, 0.3] },
    { kind: 'text', text: '*rushed* = info', x: 0, y: 450, at: [7, 0.4], size: 32, accent: PINK },
    { kind: 'tag', tag: 'tip', x: 900, y: 452, at: [7, 0.3] },
  ],
  recap: ['Only a *matched* speed', 'Ask: is this pace *good*?', 'Rushed is *information*'],
  last: 'Match the *pace*.', lastWho: 't',
  moods(ph, t, T) {
    if (ph === 'q') return [{ mood: 'neutral' }, { mood: 'wide', look: [1, -1] }]
    if (ph === 0) return [{ mood: 'wide', look: [-1, 0] }, { mood: 'sparkle', look: [1, 0] }]
    if (ph === 1) return [{ mood: 'happy', look: [-1, -1] }, { mood: 'wide', look: [1, 0] }]
    if (ph === 2) return [{ mood: 'neutral', look: [-1, 0] }, { mood: 'squint', look: [1, -1] }]
    if (ph === 3) return [{ mood: 'happy', look: [-1, -1] }, { mood: 'neutral', look: [1, -1] }]
    if (ph === 4) return [{ mood: 'eyeroll' }, { mood: 'wink', look: [1, 0] }]
    if (ph === 5 || ph === 6 || ph === 7 || ph === 8) return [{ mood: 'happy', look: [-1, -1] }, { mood: 'neutral', look: [1, -1] }]
    if (ph === 9) return [{ mood: 'heart', look: [-1, 0] }, { mood: 'sparkle', look: [1, 0] }]
    return [{ mood: 'happy', look: [0, 0] }, { mood: 'happy', look: [1, 0] }]
  },
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void ease; void BONE
