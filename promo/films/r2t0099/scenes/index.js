// r2t0099: star_talk, SOLO film, "Pisces in group chats | be like." (~43 s vertical, signs3kit social cut, music: lofi · D)
// One sign the whole film (makeFilm solo mode, 9 cards): Pisces in the group chat, every card with tears. Ending: group.
//   0.0–3.6    "Pisces in the chat | *be like.*"
//   3.6–37.8   an eleven-minute voice note · someone said "lol", Pisces felt seen · replied to a message from three days
//              ago · reacted with forty crying faces · shared a dream at 4am · left on read, wrote a poem · muted the chat,
//              missed everyone · sent a sad song to cheer everyone up · your bad day, Pisces cried harder
//  37.8        "Heart of the chat. | *Tissues on standby.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, notes,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const SEA = '#9fb6ff', RED = '#e23d4e', CREAM = '#fff4e2'

function card(x, cx, cy, w, h, col, { rot = 0, k = 1 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = col; x.fillRect(-w / 2, -h / 2, w, h)
  x.restore()
}
function text(x, s, cx, cy, size, col = INK, font = INTER, weight = 800) {
  x.fillStyle = col; x.font = `${weight} ${size}px ${font}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(s, cx, cy)
}
// a voice-note bubble with a wiggling waveform and a timer
function voiceNote(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  card(x, cx, cy, 330, 130, SKYB, { k })
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-140, -24); x.lineTo(-110, 0); x.lineTo(-140, 24); x.fill()
  for (let i = 0; i < 14; i++) { const h = 10 + Math.abs(Math.sin(t * 6 + i * 1.3)) * 44; x.fillRect(-90 + i * 16, -h / 2, 9, h) }
  x.restore()
  const s = Math.floor(clamp(lt / 2) * 662)
  label(x, cx, cy + 120, `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`, k, { size: 40, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
}
const DROP = ['..B..', '.BBB.', 'BBBBB', 'BBWBB', '.BBB.']
const MOON = ['..YYY.', '.YY...', 'YY....', 'YY....', 'YY....', '.YY...', '..YYY.']
const BELL = ['...YY...', '..YYYY..', '.YYYYYY.', '.YYYYYY.', '.YYYYYY.', 'YYYYYYYY', '...KK...']
// a page with a poem: lines appearing, a title
function poem(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  card(x, cx, cy, 300, 380, CREAM, { k, rot: -0.04 })
  x.save(); x.translate(cx, cy); x.rotate(-0.04); x.scale(k, k)
  text(x, '“SEEN, 4:02”', 0, -140, 32, INK)
  text(x, 'a poem', 0, -100, 24, '#6b62a8', MONO, 700)
  const n = Math.floor(clamp((lt - 0.4) / 1.4) * 7)
  for (let i = 0; i < n; i++) { x.fillStyle = '#9aa5c4'; x.fillRect(-110 + (i % 2) * 20, -56 + i * 34, 200 - (i * 31) % 70, 12) }
  x.restore()
}

const S = 'pisces'
const TEARS = lt => lt > 1.2 ? 3 : 2
const CAMEOS = [
  { sign: S, cap: 'Sent a voice note. | *Eleven minutes.*', mood: 'happy', tears: 2, look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      voiceNote(x, t, 800, 820, pop01(t, P.t0 + 0.15, 0.35, 2), lt)
      bubble(x, 800, 1080, 'part one', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: S, cap: 'Someone typed “lol.” | Pisces *felt seen.*', mood: 'heart', tears: 2, look: [1, 0], star: { x: -180 }, hops: [1.2],
    front(x, t, lt, P) {
      bubble(x, 800, 760, 'lol', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 70, tail: 'bl', col: LAV })
      hearts(x, t, 560, 820, P.t0 + 1.0, { n: 6, life: 1.8, spread: 200, cell: 7, seed: 2 })
      label(x, 800, 1040, 'BEST FRIENDS NOW', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Replied to a message | *from Tuesday.*', mood: 'wide', tears: 2, look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      bubble(x, 800, 720, 'anyone up | for lunch?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 34, tail: 'bl' })
      bubble(x, 800, 930, 'yes!!! | wait', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 40, tail: 'br', col: SKYB })
      label(x, 800, 1110, 'IT’S FRIDAY', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 36, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Reacted with | *forty crying faces.*', mood: 'wide', tears: 3, look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const n = Math.floor(clamp((lt - 0.2) / 1.6) * 20)
      for (let i = 0; i < n; i++) drawBits(x, DROP, { B: SKYB, W: '#fff' }, 680 + (i % 5) * 60, 700 + Math.floor(i / 5) * 70, 9)
      label(x, 800, 1080, '×40', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 52, bg: SKYB, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Shared a dream. | *At 4am. In detail.*', mood: 'sparkle', tears: 2, look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      drawBits(x, MOON, { Y: GOLD }, 640, 690, 14 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 830, 860, 'so I was a | whale, but | also a lamp', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 32, tail: 'bl', col: LAV })
      label(x, 800, 1110, '4:12 AM', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 40, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Left on read? | Wrote *a poem.*', mood: 'neutral', tears: TEARS, look: [1, 0], star: { x: -180 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) { poem(x, 800, 860, pop01(t, P.t0 + 0.15, 0.35, 2), lt) } },
  { sign: S, cap: 'Muted the chat. | Missed them *instantly.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', tears: TEARS, look: [1, 0], star: { x: -180 }, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.35, 2)
      drawBits(x, BELL, { Y: GOLD, K: INK }, 800, 840, 26 * k, { rot: Math.sin(t * 12) * 0.1 * (lt > 1.1 ? 1 : 0) })
      if (lt < 1.1 && k > 0.5) { x.strokeStyle = RED; x.lineWidth = 16; x.beginPath(); x.moveTo(690, 950); x.lineTo(910, 730); x.stroke() }
      label(x, 800, 1090, lt < 1.1 ? 'MUTED: 3 SEC' : 'UNMUTED ♡', pop01(t, P.t0 + 0.6, 0.3, 2.4), { size: 34, bg: lt < 1.1 ? RED : PINK, color: lt < 1.1 ? CREAM : INK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Sent a sad song | *to cheer you up.*', mood: 'sleepy', tears: 2, look: [1, 0], star: { x: -180 },
    front(x, t, lt, P, F) {
      notes(x, t, F.x + 260, F.cy - 40, { n: 5, cell: 7, col: SEA, seed: 3 })
      label(x, 800, 700, 'TRACK 1 OF 40', pop01(t, P.t0 + 0.4, 0.3, 2.4), { size: 34, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 800, 1060, 'this one | helped me', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: S, cap: 'You had a bad day. | Pisces *cried harder.*', mood: 'wide', tears: 3, look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'capricorn', 820, 980, 190 * k, { mood: lt > 1.4 ? 'squint' : 'neutral', look: [-1, 0], seed: 13, glyph: false })
      x.fillStyle = 'rgba(143,227,255,0.6)'; const pw = 300 * ease.outCubic(prog(lt, 0.6, 2.2)); x.beginPath(); x.ellipse(560, 1130, pw, 26, 0, 0, Math.PI * 2); x.fill()
      bubble(x, 820, 700, 'I’m… fine? | are YOU ok?', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 32, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'r2t0099', key: 'D', accent: SEA, solo: S, ending: 'group',
  title: 'Pisces in the chat | *be like.*',
  cameos: CAMEOS,
  group: {
    cap: 'Heart of the chat. | *Tissues on standby.*', mood: 'heart',
    draw(x, t, lt) {
      label(x, 300, 640, 'ily', pop01(t, t - lt + 1.2, 0.3, 2.2), { size: 44, bg: PINK, rot: -0.08 })
      label(x, 790, 700, 'ily more', pop01(t, t - lt + 1.6, 0.3, 2.2), { size: 44, bg: SKYB, rot: 0.06 })
      hearts(x, t, 540, 1150, t - lt + 1.4, { n: 8, life: 2.4, spread: 500, cell: 7, seed: 5 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
