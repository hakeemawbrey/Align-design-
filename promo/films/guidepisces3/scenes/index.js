// guidepisces3 (20 s vertical Align ad, Star Talk "Your Star Guide", Pisces note 3 / 3: try this week) · story 0–15.6,
// then the shared end card.
//   0.00       "Try this week, *Pisces*."  The ♓ guide mid-juggle under a rain of favour requests ("one more favour?",
//              "help me move?", "can you…"); its little battery reads low and blinks red.
//   2.82 drop  ♓ YOUR STAR: "say your boundary before you're tired."  4.40 A small pixel fence pops up post by post round the
//              guide, a gate with a heart on it in the middle. The requests bounce softly off the fence.
//   6.40       "kind to them. kind to you. both."  A coral friend knocks; the gate swings open for a hug, then shuts.
//              The battery refills. The ★ ASTROLOGY SAYS chip: the natural ruler of the 12th house (rest, the hidden).
//   10.40 cut  "Kind to them. | *Kind* *to* *you.*"  Inside the little garden, the gate's heart glows, battery full.
// One canvas (sky + fence + stars), DOM type above it. Pure f(t).
import { lerp, prog, ease } from '../../../src/lib.js'
import { talkHops, signStar } from '../../startalk.js'
import { guideFilm, BEAT, GOLD, BONE, INK, MONO, PINK, sparkles } from './guide.js'

const PIS = signStar('pisces')
const ACC = '#b3adff'
const MATE = '#ffa070'
const SPEAK = '♓ YOUR STAR'
const T = {
  hookOut: [2.3, 2.6], open: 2.6, l1: BEAT(4) + 0.02, fence: [4.4, 5.6],
  l2: 6.4, knock: 7.0, gate: [7.3, 7.6], hug: 7.8, shut: [8.6, 8.9], refill: [8.9, 9.7], fact: 6.9, factDur: 3.0, close: 9.9,
  cut: 10.4, last: 10.48, lastLand: 10.95, out: [15.15, 15.45],
}
const LINES = [
  { t: T.l1, text: "say your boundary *before you're tired.*" },
  { t: T.l2, text: 'kind to them. kind to you. *both.*' },
]
const HOPS = [...talkHops(LINES.map(l => ({ ...l, speaker: SPEAK })), SPEAK, { cps: 30 }), T.hug, T.refill[1], T.lastLand]
const ASKS = ['one more favour?', 'help me move?', 'can you…', 'quick ask!', 'u up?', 'cover my shift?']
const HEART = ['.H.H.', 'HWHHH', 'HHHHH', '.HHH.', '..H..']
const GY = 1290                                  // the ground line of the little garden
const POSTS = [170, 290, 410, 670, 790, 910]     // the gate sits between 410 and 670

function asks(x, t, K, vis) {
  if (t > T.l2 + 0.5) return
  const fenced = prog(t, T.fence[0], T.fence[1])
  for (let i = 0; i < ASKS.length; i++) {
    const per = 2.4, ph = ((t + i * 0.43) % per) / per
    let yy = lerp(480, 1120, ph), xx = 240 + ((i * 167) % 600)
    // once the fence is up, each request bounces back off the top rail
    if (fenced > 0.5 && yy > 1000) yy = 1000 - (yy - 1000) * 0.8
    const a = Math.sin(Math.PI * ph) * vis * (1 - prog(t, T.l2, T.l2 + 0.5))
    if (a < 0.02) continue
    x.save(); x.globalAlpha = a; x.font = `700 34px ${MONO}`
    const w = x.measureText(ASKS[i]).width + 32
    x.fillStyle = INK; x.fillRect(xx - w / 2 - 5, yy - 27, w + 10, 54); x.fillStyle = BONE; x.fillRect(xx - w / 2, yy - 22, w, 44)
    x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(ASKS[i], xx, yy + 1)
    x.restore()
  }
}

function fence(x, t, K, vis, last) {
  const gateOpen = last ? 0 : ease.outCubic(prog(t, ...T.gate)) * (1 - ease.inCubic(prog(t, ...T.shut)))
  x.save(); x.globalAlpha = vis
  POSTS.forEach((px, i) => {
    const k = last ? 1 : ease.outBack(prog(t, T.fence[0] + i * 0.15, T.fence[0] + i * 0.15 + 0.3))
    if (k <= 0) return
    const h = 150 * k
    x.fillStyle = INK; x.fillRect(px - 20, GY - h - 8, 40, h + 8); x.fillStyle = '#f3e6c8'; x.fillRect(px - 13, GY - h - 1, 26, h)
    x.fillStyle = INK; x.fillRect(px - 13, GY - h - 14, 26, 14)
  })
  const rails = last ? 1 : prog(t, T.fence[1] - 0.3, T.fence[1])
  if (rails > 0) for (const [a, b] of [[170, 410], [670, 910]]) for (const ry of [GY - 110, GY - 50]) {
    x.fillStyle = INK; x.fillRect(a, ry - 7, (b - a) * rails, 22); x.fillStyle = '#f3e6c8'; x.fillRect(a, ry - 2, (b - a) * rails, 12)
  }
  // the gate (swings: squashes toward its hinge on the left)
  if (rails > 0.9) {
    const gw = 230 * (1 - 0.85 * gateOpen), gx = 425
    x.fillStyle = INK; x.fillRect(gx, GY - 140, gw, 130); x.fillStyle = '#f7d8e4'; x.fillRect(gx + 7, GY - 133, gw - 14, 116)
    if (gw > 80) K.drawBits(x, HEART, { H: '#ff4f86', W: '#ffd1de' }, gx + gw / 2, GY - 75, 11 * (gw / 230))
  }
  x.restore()
  if (rails > 0.9 && (last || t > T.fence[1])) {
    const glow = last ? 0.5 + 0.2 * Math.sin(t * 3) : 0.15
    x.save(); x.globalCompositeOperation = 'lighter'; x.globalAlpha = glow * vis
    const g = x.createRadialGradient(540, GY - 75, 4, 540, GY - 75, 180); g.addColorStop(0, 'rgba(255,120,170,0.8)'); g.addColorStop(1, 'rgba(255,120,170,0)'); x.fillStyle = g; x.fillRect(360, GY - 255, 360, 360); x.restore()
  }
  sparkles(x, t, 540, GY - 80, T.fence[1], 10, 200, 0.2, [PINK, GOLD, BONE])
}

function battery(x, t, cx, cy, vis) {
  const lvl = t < T.refill[0] ? 0.15 : lerp(0.15, 1, prog(t, ...T.refill))
  const blink = lvl < 0.3 && Math.floor(t * 3) % 2 === 0
  x.save(); x.globalAlpha = vis; x.translate(cx, cy)
  x.fillStyle = INK; x.fillRect(-60, -30, 120, 60); x.fillRect(60, -14, 12, 28)
  x.fillStyle = '#20314a'; x.fillRect(-52, -22, 104, 44)
  x.fillStyle = lvl < 0.3 ? (blink ? '#ff4a5e' : '#7a2a35') : '#5fe08a'; x.fillRect(-48, -18, 96 * lvl, 36)
  x.restore()
}

function drawStage(x, t, K) {
  const out = K.popOut(t, T.out)
  if (out <= 0) return
  const last = t >= T.cut
  x.save(); x.globalAlpha = out; x.fillStyle = INK; x.fillRect(60, GY, 960, 14); x.fillStyle = '#3f8f72'; x.fillRect(60, GY + 4, 960, 10); x.restore()
  asks(x, t, K, out)
  // the coral friend: knocks at the gate, hugs, steps back out
  const fIn = ease.outCubic(prog(t, T.knock - 0.5, T.knock)) * (1 - ease.inCubic(prog(t, T.shut[1], T.shut[1] + 0.5)))
  const hugK = ease.inOutCubic(prog(t, T.hug - 0.2, T.hug + 0.2)) * (1 - ease.inOutCubic(prog(t, T.shut[0] - 0.3, T.shut[0])))
  if (!last && fIn > 0.01) K.guide(t, { x: lerp(1200, 680, fIn) - hugK * 60, y: 1120, size: 220, color: MATE, glyph: null, mood: hugK > 0.5 ? 'happy' : 'neutral', look: [-1, 0], hops: [T.knock, T.knock + 0.25, T.hug], seed: 4, pop: out, lantern: 0 })
  const jug = t < T.fence[0] ? Math.sin(t * 9) * 0.06 : 0
  const gx = last ? 540 : 400 + hugK * 100
  const mood = t < T.fence[1] ? 'squint' : t < T.hug ? 'neutral' : t < T.refill[1] ? 'happy' : 'happy'
  const r = K.guide(t, { x: gx, y: last ? 1000 : 1110, size: last ? 300 : 270, color: PIS.color, glyph: PIS.glyph, mood: last ? 'happy' : mood, look: t < T.fence[0] ? [0, -1] : [1, 0], hops: HOPS, seed: 12, pop: out, squash: jug, side: -1 })
  fence(x, t, K, out, last)
  battery(x, t, r.x + (last ? 0 : 0), r.top - 70, out)
  if (t > T.hug && t < T.hug + 1 && !last) { const p = prog(t, T.hug, T.hug + 1); K.drawBits(x, HEART, { H: '#ff4f86', W: '#ffd1de' }, gx + 120, 900 - p * 120, 8, { alpha: Math.sin(Math.PI * p) }) }
  sparkles(x, t, r.x, r.top - 70, T.refill[1], 8, 90, 0.3, ['#5fe08a', GOLD, BONE])
}

const F = guideFilm({
  duration: 20, sign: 'pisces', n: 3, speaker: SPEAK, accent: ACC,
  hook: 'Try this week, | *Pisces.*', hookOut: T.hookOut, chipOut: [T.cut - 0.3, T.cut],
  lines: LINES, open: T.open, close: T.close,
  fact: { text: 'PISCES IS THE NATURAL RULER OF|THE 12TH HOUSE (REST, THE HIDDEN)', at: T.fact, dur: T.factDur, x: 540, y: 360 },
  heads: [
    { text: 'Kind to them. | *Kind* *to* *you.*', at: T.last, out: T.out, top: 230, size: 112, accentSize: 170, accentColor: ACC, late: 3, lateAt: T.lastLand },
  ],
  drawBack: drawStage,
  cues: [
    ...Array.from({ length: 8 }, (_, i) => ['pop', +(0.1 + i * 0.3).toFixed(2), [659.25, 739.99, 880, 987.77][i % 4], 0.02, (i % 2 ? 0.4 : -0.4)]),
    ...[0, 0.6, 1.2, 1.8].map(v => ['tick', T.l1 + v, 0.02]),
    ...Array.from({ length: 6 }, (_, i) => ['pop', +(T.fence[0] + i * 0.15).toFixed(2), 523.25 + i * 60, 0.035, (i - 2.5) * 0.15]),
    ['glitter', T.fence[1], T.fence[1] + 0.5], ['pluck', T.fence[1], 1318.51, 0.035, 0.6, 0],
    ['tick', T.knock, 0.06], ['tick', T.knock + 0.25, 0.06], ['whoosh', T.gate[0], 0.3, 0.025], ['pluck', T.hug, 1174.66, 0.04, 0.6, 0],
    ['whoosh', T.shut[0], 0.3, 0.025], ['tick', T.shut[1], 0.05], ['riser', T.refill[0], T.refill[1], 0.025], ['bell', T.refill[1], 1567.98, 0.03, 1.2, 0],
    ['whoosh', T.out[0], 0.35, 0.03],
  ],
  cuts: [{ t: T.cut, kind: 'flip' }],
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
