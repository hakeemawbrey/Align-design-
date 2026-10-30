// guidelibra2 (15 s vertical Align ad, Star Talk "Your Star Guide", ♎ note 2 / 3: what you need) · story 0–10.6, then the end card.
//   0.00  "What you need, Libra."  The ♎ guide, lantern lit, stands at one end of a little pixel bridge; another star waits at
//         the far end. Above them a stadium scoreboard is mid-tally: YOU 12 · THEM 11, a +1 popping.
//   2.6   ♎ YOUR STAR: "someone who meets you halfway…"  Both walk to the HALFWAY flag and meet. Chip: the 7th house.
//   5.4   "and doesn't keep score."  The scoreboard's plug yanks itself out of the wall: BZZT. The board goes dark.
//   8.05  card flip · "*Halfway* is a place you meet."  Both stars under the flag, the dark board reading OFF.
// One canvas (sky + bridge + board + two stars), DOM type above it. Pure f(t).
import { lerp, prog, ease, clamp } from '../../../src/lib.js'
import { signStar } from '../../startalk.js'
import { guideFilm, GOLD, BONE, INK, MONO } from './guidefilm.js'

const LIB = signStar('libra'), COL = LIB.color, ACC = '#f59be9', PAL = '#8fd3ff'
const T = {
  hookOut: [2.15, 2.45], open: 2.4, l1: 2.6, walk: [2.7, 4.5], meet: 4.5, fact: 3.3,
  l2: 5.45, yank: 6.7, dark: 6.95, close: 7.9,
  cut: 8.05, last: 8.12, lastLand: 8.45, out: [10.15, 10.45],
}
const LINES = [
  { t: T.l1, text: 'someone who meets you *halfway*…' },
  { t: T.l2, text: "and doesn't keep *score.*" },
]
const DECK_Y = 1250

function drawBridge(x, t) {
  // planks
  for (let i = 0; i < 22; i++) {
    const px = 70 + i * 43
    x.fillStyle = INK; x.fillRect(px - 2, DECK_Y - 4, 43, 34)
    x.fillStyle = i % 2 ? '#8a5a3a' : '#9c6a44'; x.fillRect(px, DECK_Y, 39, 26)
    x.fillStyle = '#c08a5a'; x.fillRect(px, DECK_Y, 39, 5)
  }
  // rope rail
  x.strokeStyle = '#efe6d6'; x.globalAlpha = 0.55; x.lineWidth = 5
  x.beginPath(); x.moveTo(70, DECK_Y - 110); x.quadraticCurveTo(540, DECK_Y - 40, 1010, DECK_Y - 110); x.stroke(); x.globalAlpha = 1
  for (const px of [70, 1010]) { x.fillStyle = INK; x.fillRect(px - 14, DECK_Y - 130, 28, 140); x.fillStyle = '#9c6a44'; x.fillRect(px - 8, DECK_Y - 124, 16, 128) }
  // the HALFWAY flag
  x.fillStyle = INK; x.fillRect(536, DECK_Y - 420, 10, 420)
  x.fillStyle = BONE; x.fillRect(538, DECK_Y - 418, 6, 416)
  const wave = Math.sin(t * 5) * 6
  x.fillStyle = INK; x.fillRect(544, DECK_Y - 420, 196, 76 + 6)
  x.fillStyle = GOLD; x.fillRect(546, DECK_Y - 416 + wave * 0.2, 190, 72)
  x.fillStyle = INK; x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('HALFWAY', 641, DECK_Y - 379 + wave * 0.2)
}

function drawBoard(x, t, K) {
  const on = t < T.dark ? 1 : 0
  const flick = t > T.l2 && t < T.dark ? (Math.sin(t * 60) > 0.3 ? 1 : 0.55) : 1
  const bx = 190, by = 520, bw = 620, bh = 230
  // the cord to a wall socket on the right
  const sx = 960, sy = 930
  const yk = prog(t, T.yank, T.yank + 0.5)
  const plugX = t < T.yank ? sx : lerp(sx, sx - 60, ease.outBack(yk)), plugY = t < T.yank ? sy : lerp(sy, sy + 150, ease.outBack(yk)) + Math.sin((t - T.yank) * 9) * 10 * Math.exp(-(t - T.yank) * 2)
  x.strokeStyle = INK; x.lineWidth = 12; x.beginPath(); x.moveTo(bx + bw - 30, by + bh); x.quadraticCurveTo(bx + bw + 20, by + bh + 200, plugX, plugY); x.stroke()
  x.strokeStyle = '#4a4f66'; x.lineWidth = 6; x.stroke()
  x.fillStyle = INK; x.fillRect(sx + 6, sy - 34, 52, 68); x.fillStyle = '#c9c3d8'; x.fillRect(sx + 12, sy - 28, 40, 56)
  x.fillStyle = INK; x.fillRect(sx + 22, sy - 14, 6, 12); x.fillRect(sx + 36, sy - 14, 6, 12)
  x.fillStyle = INK; x.fillRect(plugX - 30, plugY - 22, 40, 44); x.fillStyle = '#efe6d6'; x.fillRect(plugX - 26, plugY - 18, 32, 36)
  if (t > T.yank) { x.fillStyle = '#c9c3d8'; x.fillRect(plugX + 10, plugY - 12, 16, 6); x.fillRect(plugX + 10, plugY + 6, 16, 6) }
  // the board
  x.fillStyle = INK; x.fillRect(bx - 10, by - 10, bw + 20, bh + 20)
  x.fillStyle = '#16102e'; x.fillRect(bx, by, bw, bh)
  x.fillStyle = '#2a2050'; for (let i = 0; i < 6; i++) x.fillRect(bx + 14 + i * 100, by + 10, 8, 8)
  x.textAlign = 'center'; x.textBaseline = 'middle'
  x.font = `700 34px ${MONO}`
  x.fillStyle = on ? `rgba(255,206,92,${0.9 * flick})` : 'rgba(255,206,92,0.12)'
  x.fillText('YOU', bx + 150, by + 52); x.fillText('THEM', bx + bw - 150, by + 52)
  // the tally ticks up on both sides (nobody's winning)
  const n = Math.min(4, Math.floor(t / 0.75))
  const you = 12 + Math.floor((n + 1) / 2), them = 11 + Math.floor(n / 2) + (t > 1.9 ? 1 : 0)
  x.font = `700 110px ${MONO}`
  if (on) {
    x.shadowColor = '#ff9a3a'; x.shadowBlur = 24 * flick
    x.fillStyle = `rgba(255,170,60,${flick})`
    x.fillText(String(you), bx + 150, by + 150); x.fillText(String(them), bx + bw - 150, by + 150)
    x.shadowBlur = 0
    x.fillStyle = `rgba(255,206,92,${flick})`; x.fillText(':', bx + bw / 2, by + 146)
  } else {
    x.fillStyle = 'rgba(255,170,60,0.1)'; x.fillText('--', bx + 150, by + 150); x.fillText('--', bx + bw - 150, by + 150)
    const k = K.pop01(t, T.dark + 0.25, 0.3, 2.2)
    x.save(); x.translate(bx + bw / 2, by + bh / 2 + 10); x.scale(k, k); x.rotate(-0.08)
    x.fillStyle = INK; x.fillRect(-110, -44, 220, 88); x.fillStyle = '#efe6d6'; x.fillRect(-104, -38, 208, 76)
    x.fillStyle = INK; x.font = `800 60px ${MONO}`; x.fillText('OFF', 0, 4); x.restore()
  }
  // +1 pops during the tally
  for (let i = 0; i < 4; i++) {
    const t0 = 0.75 * (i + 1) - 0.75 + 0.05, p = prog(t, t0, t0 + 0.6)
    if (t < 0 || p <= 0 || p >= 1 || t > T.dark) continue
    x.globalAlpha = 1 - p; x.fillStyle = GOLD; x.font = `800 46px ${MONO}`
    x.fillText('+1', (i % 2 ? bx + bw - 150 : bx + 150) + 90, by + 90 - p * 70); x.globalAlpha = 1
  }
  K.burst(sx - 10, sy - 120, 92, t, T.yank, { word: 'BZZT', size: 42, color: '#8fd3ff' })
}

function walkX(t, from, to) { return lerp(from, to, ease.inOutCubic(prog(t, ...T.walk))) }

const F = guideFilm({
  duration: 15, speaker: '♎ YOUR STAR', color: COL, accent: ACC, glyph: LIB.glyph,
  chip: { sign: 'LIBRA', glyph: '♎', n: 2, of: 3 },
  hook: { text: 'What you *need*, Libra.', out: T.hookOut },
  lines: LINES, open: T.open, close: T.close,
  fact: { text: 'LIBRA RULES THE 7TH HOUSE (PARTNERSHIP)', at: T.fact, dur: T.close - T.fact - 0.1, x: 540, y: 1385 },
  heads: [{ text: '*Halfway* is a | place you meet.', at: T.last, out: T.out, top: 196, size: 100, accentSize: 150, accentColor: ACC, late: 3, lateAt: T.lastLand }],
  guide(t) {
    const walking = t > T.walk[0] && t < T.walk[1]
    const mood = t < T.walk[0] ? { mood: 'happy', look: [1, 0] } : t < T.meet + 0.3 ? { mood: 'happy', look: [1, 0] } : t < T.yank ? { mood: 'sparkle', look: [0, 0] } : t < T.dark + 0.4 ? { mood: 'wide', look: [0.6, -1] } : { mood: 'happy' }
    const ko = 1 - ease.inCubic(prog(t, ...T.out))
    return { x: walkX(t, 290, 418), y: DECK_Y - 168, size: 280, ...mood, squash: walking ? 0.05 * Math.abs(Math.sin(t * 9)) : 0, pop: ko, side: -1 }
  },
  drawBack(x, t, K) {
    const ko = 1 - ease.inCubic(prog(t, ...T.out))
    x.save(); x.globalAlpha = clamp(ko * 1.4)
    drawBoard(x, t, K); drawBridge(x, t)
    x.restore()
  },
  drawFront(x, t, K) {
    const ko = 1 - ease.inCubic(prog(t, ...T.out))
    if (ko <= 0.01) return
    const walking = t > T.walk[0] && t < T.walk[1]
    const mood = t < T.meet ? { mood: 'neutral', look: [-1, 0] } : t < T.yank ? { mood: 'happy' } : t < T.dark + 0.4 ? { mood: 'wide', look: [-0.6, -1] } : { mood: 'heart' }
    K.star({ x: walkX(t, 810, 668), y: DECK_Y - 136, size: 230, t, color: PAL, glyph: null, ...mood, seed: 7, hops: [], squash: walking ? 0.05 * Math.abs(Math.sin(t * 9 + 1)) : 0, pop: ko })
    K.sparkles(t, 544, DECK_Y - 260, T.meet, 10, 170, 0.2, [GOLD, ACC, PAL])
  },
  cues: [
    ['pop', 0.05, 1318.51, 0.03, 0.3], ['pop', 0.8, 1174.66, 0.03, -0.3], ['pop', 1.55, 1318.51, 0.03, 0.3], ['pop', 2.3, 1174.66, 0.025, -0.3],
    ...[2.9, 3.3, 3.7, 4.1].map((v, i) => ['tick', v, 0.025 * (i % 2 ? 0.7 : 1)]),
    ['pluck', T.meet, 1567.98, 0.04, 0.6, 0], ['glitter', T.meet, T.meet + 0.4],
    ['whoosh', T.yank, 0.25, 0.04], ['tick', T.yank, 0.06], ['boom', T.dark, 0.12], ['pop', T.dark + 0.25, 659.25, 0.04, 0],
    ['whoosh', T.out[0], 0.35, 0.03],
  ],
  cuts: [{ t: T.cut, kind: 'flip' }],
})

export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
