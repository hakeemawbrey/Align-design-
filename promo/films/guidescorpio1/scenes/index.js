// guidescorpio1 (20 s vertical Align ad, Star Talk "Your Star Guide", ♏ note 1 / 3: the blind spot) · story 0–15.6, then the end card.
//   0.00  "Scorpio, your star has a note."  Exam room. The ♏ guide, lantern lit, stern as a proctor, holds up a POP QUIZ
//         ("will you stay if i go quiet?") to a pale little star sweating at a school desk. The wall clock ticks.
//   2.8   ♏ YOUR STAR: "you test people to see if they'll stay."  The student chews its pencil. Chip: fixed water, Mars/Pluto.
//   7.2   "just tell them what you need."  Scorpio looks at its own quiz… crumples it, and lobs it in the bin: SWISH.
//   9.1   Scorpio: "i need to hear you'll stay."  The student: "i'm staying." Heart eyes.
//  10.75  card flip · "Ask. Don't *test*."  Same pose as frame 0, but the paper now just says "can we talk?"
// One canvas (sky + room + two stars + props), DOM type above it. Pure f(t).
import { lerp, prog, ease, clamp } from '../../../src/lib.js'
import { signStar } from '../../startalk.js'
import { guideFilm, GOLD, BONE, INK, MONO, INTER, SERIF } from './guidefilm.js'

const SCO = signStar('scorpio'), COL = SCO.color, ACC = '#ff7d9a', PAL = '#9fd8ff'
const T = {
  hookOut: [2.5, 2.8], open: 2.8, l1: 3.0, fact: 3.8, chew: 4.6, sweat: 5.6, look: 6.5,
  l2: 7.2, crumple: [8.25, 8.6], toss: [8.7, 9.25], swish: 9.25, ask: 9.5, reply: 10.1, close: 10.6,
  cut: 10.75, last: 10.82, lastLand: 11.25, again: 12.6, nod: 13.4, out: [15.15, 15.5],
}
const LINES = [
  { t: T.l1, text: "you test people to see if they'll *stay.*" },
  { t: T.l2, text: 'just tell them what you *need.*' },
]
const HX = 360, HY = 1140, HS = 310
const PX = 800, PY = 1170
const K_out = t => 1 - ease.inCubic(prog(t, ...T.out))

function paper(x, cx, cy, rot, k, rows, { head = 'POP QUIZ', boxes = true } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-196, -150, 392, 300)
  x.fillStyle = '#f5eedf'; x.fillRect(-188, -142, 376, 284)
  x.fillStyle = 'rgba(122,106,168,0.35)'; for (let i = 0; i < 6; i++) x.fillRect(-170, -66 + i * 38, 340, 2)
  x.fillStyle = '#e23d66'; x.fillRect(-150, -142, 3, 284)
  x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillStyle = head === 'POP QUIZ' ? '#c42a52' : '#7a3a9a'; x.font = `800 46px ${INTER}`; x.fillText(head, 0, -100)
  x.fillStyle = INK; x.font = `italic 500 38px ${SERIF}`
  rows.forEach((r, i) => x.fillText(r, 10, -36 + i * 42))
  if (boxes) {
    x.font = `700 26px ${MONO}`; x.textAlign = 'left'
    for (const [i, lab] of [[0, 'yes'], [1, 'no']]) { x.strokeStyle = INK; x.lineWidth = 3; x.strokeRect(-100 + i * 130, 62, 26, 26); x.fillText(lab, -64 + i * 130, 76) }
  }
  x.restore()
}

function ball(x, cx, cy, s, rot) {
  x.save(); x.translate(cx, cy); x.rotate(rot)
  const pts = 11
  x.beginPath()
  for (let i = 0; i < pts; i++) { const a = i / pts * Math.PI * 2, r = s * (0.8 + 0.25 * Math.sin(i * 5.3)); x.lineTo(Math.cos(a) * r, Math.sin(a) * r) }
  x.closePath(); x.fillStyle = '#f5eedf'; x.fill(); x.lineWidth = 6; x.strokeStyle = INK; x.stroke()
  x.strokeStyle = 'rgba(122,106,168,0.7)'; x.lineWidth = 3
  x.beginPath(); x.moveTo(-s * 0.4, -s * 0.2); x.lineTo(s * 0.1, s * 0.1); x.lineTo(s * 0.3, -s * 0.3); x.moveTo(-s * 0.3, s * 0.4); x.lineTo(s * 0.2, s * 0.3); x.stroke()
  x.restore()
}

function drawRoom(x, t, K) {
  const ko = K_out(t)
  x.save(); x.globalAlpha = ko
  // the floor line
  x.fillStyle = 'rgba(239,230,214,0.18)'; x.fillRect(60, 1310, 960, 6)
  // the wall clock (ticks once a second)
  const cx = 920, cy = 600, R = 70
  x.fillStyle = INK; x.beginPath(); x.arc(cx, cy, R + 8, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#f5eedf'; x.beginPath(); x.arc(cx, cy, R, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; x.fillRect(cx + Math.cos(a) * (R - 14) - 3, cy + Math.sin(a) * (R - 14) - 3, 6, 6) }
  const sec = Math.floor(t) / 60 * Math.PI * 2 - Math.PI / 2
  x.strokeStyle = INK; x.lineWidth = 7; x.beginPath(); x.moveTo(cx, cy); x.lineTo(cx + Math.cos(-0.9) * 36, cy + Math.sin(-0.9) * 36); x.stroke()
  x.strokeStyle = '#e23d66'; x.lineWidth = 4; x.beginPath(); x.moveTo(cx, cy); x.lineTo(cx + Math.cos(sec * 12) * 58, cy + Math.sin(sec * 12) * 58); x.stroke()
  // the desk
  x.fillStyle = INK; x.fillRect(PX - 150, PY + 50, 300, 34); x.fillRect(PX - 130, PY + 80, 20, 110); x.fillRect(PX + 110, PY + 80, 20, 110)
  x.fillStyle = '#9c6a44'; x.fillRect(PX - 144, PY + 56, 288, 22)
  x.fillStyle = '#c08a5a'; x.fillRect(PX - 144, PY + 56, 288, 6)
  // the bin
  const bx = 120, by = 1236
  x.fillStyle = INK; x.fillRect(bx - 62, by - 76, 124, 150)
  x.fillStyle = '#5a5f78'; x.fillRect(bx - 54, by - 68, 108, 136)
  x.fillStyle = '#7a8098'; for (let i = 0; i < 4; i++) x.fillRect(bx - 40 + i * 26, by - 56, 8, 112)
  x.restore()
}

function scoMood(t) {
  if (t < T.look) return { mood: 'squint', look: [1, 0], blink: false }
  if (t < T.l2) return { mood: 'neutral', look: [1, -0.4] }
  if (t < T.crumple[0]) return { mood: 'wide', look: [0.8, -0.6] }
  if (t < T.swish + 0.1) return { mood: 'squint', look: [-1, -0.5] }
  if (t < T.reply) return { mood: 'neutral', look: [1, 0] }
  if (t < T.again) return { mood: 'happy' }
  return { mood: 'happy', look: [1, 0] }
}

const F = guideFilm({
  duration: 20, speaker: '♏ YOUR STAR', color: COL, accent: ACC, glyph: SCO.glyph,
  chip: { sign: 'SCORPIO', glyph: '♏', n: 1, of: 3 },
  hook: { text: '*Scorpio,* your star | has a note.', out: T.hookOut },
  lines: LINES, open: T.open, close: T.close,
  fact: { text: 'SCORPIO: FIXED WATER|RULED BY MARS (TRADITIONAL)|AND PLUTO (MODERN)', at: T.fact, dur: T.l2 - T.fact - 0.2, x: 520, y: 520, size: 28 },
  heads: [{ text: 'Ask. | Don\'t *test.*', at: T.last, out: T.out, top: 196, size: 124, accentSize: 190, accentColor: ACC, late: 1, lateAt: T.lastLand }],
  guide(t) {
    const throwK = t > T.toss[0] && t < T.toss[0] + 0.3 ? 0.14 * Math.sin(Math.PI * prog(t, T.toss[0], T.toss[0] + 0.3)) : 0
    return { x: HX, y: HY, size: HS, ...scoMood(t), squash: throwK, pop: K_out(t), side: -1 }
  },
  drawBack: drawRoom,
  drawFront(x, t, K) {
    const ko = K_out(t)
    if (ko <= 0.01) return
    // the student
    const sweat = t > T.l1 && t < T.l2 + 0.6
    const pm = t < T.ask ? (t > T.sweat ? { mood: 'wide', look: [-1, -0.3], blink: false } : { mood: 'neutral', look: [-1, -0.4] }) : t < T.reply ? { mood: 'sparkle', look: [-1, 0] } : t < T.again ? { mood: 'heart' } : { mood: 'happy', look: [-1, 0] }
    const nod = t > T.nod && t < T.nod + 0.8 ? 0.08 * Math.sin((t - T.nod) * 16) : 0
    K.star({ x: PX, y: PY - 10, size: 210, t, color: PAL, glyph: null, ...pm, seed: 9, hops: [], squash: nod + (t < T.sweat ? 0 : 0), pop: ko })
    if (sweat) {
      const ph = (t * 1.1) % 1
      x.save(); x.globalAlpha = Math.sin(Math.PI * ph) * ko; x.fillStyle = '#8fd3ff'
      x.fillRect(PX + 92, PY - 90 + ph * 50, 12, 18); x.fillRect(PX + 95, PY - 98 + ph * 50, 6, 8); x.restore()
    }
    // the pencil it chews
    if (t > T.chew && t < T.ask) {
      const w = Math.sin(t * 20) * 0.1
      x.save(); x.globalAlpha = ko; x.translate(PX - 40, PY + 30); x.rotate(-0.6 + w)
      x.fillStyle = INK; x.fillRect(-8, -70, 16, 92); x.fillStyle = '#ffd34d'; x.fillRect(-4, -66, 8, 70); x.fillStyle = '#ff8fb1'; x.fillRect(-4, -74, 8, 10); x.restore()
    }
    // the quiz → the crumple → the toss
    const hold = { x: HX + 215, y: 880 }
    if (t < T.crumple[0]) {
      const shake = t < T.look ? Math.sin(t * 3) * 0.03 : 0
      paper(x, hold.x, hold.y, -0.06 + shake, ko, ['will you stay', 'if i go quiet?'])
    } else if (t < T.toss[1]) {
      const c = prog(t, ...T.crumple)
      if (c < 1) paper(x, hold.x, hold.y, -0.06 + c * 0.6, lerp(1, 0.25, ease.inCubic(c)), ['will you stay', 'if i go quiet?'])
      const p = prog(t, ...T.toss)
      const bx = lerp(hold.x - 60, 120, p), by = lerp(hold.y, 1190, p) - Math.sin(Math.PI * p) * 300
      if (c >= 0.6) ball(x, t < T.toss[0] ? hold.x - 60 : bx, t < T.toss[0] ? hold.y : by, 40, p * 9)
    }
    K.burst(150, 1050, 90, t, T.swish, { word: 'SWISH', size: 38, color: '#ffd34d' })
    K.sparkles(t, 120, 1160, T.swish, 8, 120, 0.2, [GOLD, BONE, ACC])
    // the ask + the answer
    const ka = K.pop01(t, T.ask, 0.3, 2.4) * (1 - ease.inCubic(prog(t, T.close - 0.2, T.close + 0.1)))
    if (ka > 0.01) K.bubble(HX + 60, 900, "i need to hear you'll stay.", { size: 38, k: ka, color: '#9a1f40' })
    const kr = K.pop01(t, T.reply, 0.3, 2.4) * (1 - ease.inCubic(prog(t, T.close - 0.2, T.close + 0.1)))
    if (kr > 0.01) K.bubble(PX + 20, 990, "i'm staying.", { size: 42, k: kr, color: '#1e5a8a' })
    // the rhyme: the paper's back, but it's a question now
    const kg = K.pop01(t, T.again, 0.4, 2.2) * ko
    if (kg > 0.01) paper(x, hold.x, hold.y, -0.06, kg, ['can we talk?'], { head: 'A NOTE', boxes: false })
    K.sparkles(t, hold.x, hold.y, T.again + 0.1, 10, 220, 0.5, [GOLD, ACC, BONE])
  },
  cues: [
    ...Array.from({ length: 9 }, (_, i) => ['tick', i + 0.02, 0.025]).filter(c => c[1] < T.l2),
    ['pop', T.chew, 659.25, 0.02, 0.3], ['pop', T.sweat, 1318.51, 0.025, 0.3],
    ['whoosh', T.crumple[0], 0.25, 0.04], ['tick', T.crumple[0] + 0.1, 0.05], ['tick', T.crumple[0] + 0.2, 0.05], ['tick', T.crumple[0] + 0.3, 0.05],
    ['whoosh', T.toss[0], 0.5, 0.04], ['boom', T.swish, 0.08], ['pluck', T.swish + 0.05, 1567.98, 0.04, 0.6, -0.5], ['glitter', T.swish, T.swish + 0.4],
    ['pop', T.ask, 880, 0.04, -0.2], ['pop', T.reply, 1174.66, 0.045, 0.3], ['pluck', T.reply + 0.2, 1318.51, 0.035, 0.7, 0.3],
    ['pop', T.again, 987.77, 0.04, 0], ['glitter', T.again + 0.1, T.again + 0.5], ['pop', T.nod, 1318.51, 0.03, 0.3], ['pop', T.nod + 0.2, 1318.51, 0.025, 0.3],
    ['whoosh', T.out[0], 0.35, 0.03],
  ],
  cuts: [{ t: T.cut, kind: 'flip' }],
})

export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
