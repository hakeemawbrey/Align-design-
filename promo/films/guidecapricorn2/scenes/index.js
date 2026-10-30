// guidecapricorn2 (15 s vertical Align ad, Star Talk "Your Star Guide", Capricorn note 2 / 3: what you need) · story 0–10.6,
// then the shared end card.
//   0.00       "What you *need*, Capricorn."  The ♑ guide, lantern lit, mid-scramble up a pixel mountain (a hop on every step).
//   2.50 drop  ♑ YOUR STAR: "someone with their own big goals…"  A warm coral star climbs the twin peak next door.
//              The ★ ASTROLOGY SAYS chip: the natural ruler of the 10th house (career).
//   5.60       "who respects yours. a team."  Both reach the tops; two little flags plant side by side (thunk, thunk).
//              The coral star waves across the gap.
//   8.40 cut   "*Build* | together."  Both on their peaks, flags waving; a plank bridge builds between them, board by board,
//              and a heart pops over the middle.
// One canvas (sky + mountains + stars), DOM type above it. Pure f(t).
import { lerp, prog, ease } from '../../../src/lib.js'
import { talkHops, signStar } from '../../startalk.js'
import { guideFilm, BEAT, GOLD, BONE, INK, PINK, sparkles } from './guide.js'

const CAP = signStar('capricorn')
const ACC = '#5fe0b4'
const MATE = '#ffa070'
const SPEAK = '♑ YOUR STAR'
const T = {
  hookOut: [2.15, 2.45], open: 2.3, l1: BEAT(3.4) + 0.01, fact: 3.0, factDur: 4.6,
  mate: [2.6, 5.4], climb: [0, 5.2], l2: 5.6, flagA: 6.1, flagB: 6.55, wave: 7.0, close: 8.3,
  cut: 8.4, last: 8.46, lastLand: 8.46, bridge: [8.7, 9.9], heart: 9.95, out: [10.2, 10.45],
}
const LINES = [
  { t: T.l1, text: 'someone with their own *big goals…*' },
  { t: T.l2, text: 'who respects yours. *a team.*' },
]
const HOPS = [0.15, 0.6, 1.05, 1.5, 1.95, 2.4, ...talkHops(LINES.map(l => ({ ...l, speaker: SPEAK })), SPEAK, { cps: 30 }), T.flagA, T.lastLand]
const MATE_HOPS = [3.0, 3.5, 4.0, 4.5, 5.0, T.flagB, T.wave + 0.3, T.heart]
const HEART = ['.H.H.', 'HWHHH', 'HHHHH', '.HHH.', '..H..']
const PK = { L: { x: 290, y: 1000 }, R: { x: 790, y: 1000 } }        // the two summits

function mountains(x, t, vis) {
  x.save(); x.globalAlpha = vis
  // far range
  x.fillStyle = '#2a2560'
  x.beginPath(); x.moveTo(0, 1460); x.lineTo(120, 1180); x.lineTo(240, 1300); x.lineTo(540, 1110); x.lineTo(860, 1280); x.lineTo(1000, 1160); x.lineTo(1080, 1250); x.lineTo(1080, 1460); x.closePath(); x.fill()
  // the twin peaks (stepped pixel slopes)
  for (const [px, col, sn] of [[PK.L.x, '#3f8f72', '#d8f5ea'], [PK.R.x, '#4a7f8f', '#e3f1f6']]) {
    const top = PK.L.y + 70
    x.fillStyle = INK
    for (let k = 0; k < 17; k++) { const yy = top + k * 32, hw = 30 + k * 34; x.fillRect(px - hw - 8, yy - 8, 2 * hw + 16, 40) }
    x.fillStyle = col
    for (let k = 0; k < 17; k++) { const yy = top + k * 32, hw = 30 + k * 34; x.fillRect(px - hw, yy, 2 * hw, 32) }
    x.fillStyle = sn
    for (let k = 0; k < 3; k++) { const yy = top + k * 32, hw = 30 + k * 34; x.fillRect(px - hw, yy, 2 * hw, k === 2 ? 14 : 32) }
  }
  x.restore()
}

function flag(x, t, px, py, t0, col) {
  if (t < t0 - 0.25) return
  const drop = ease.outCubic(prog(t, t0 - 0.25, t0))
  const y = lerp(py - 300, py, drop)
  x.save(); x.translate(px, y)
  x.fillStyle = INK; x.fillRect(-7, -150, 14, 160)
  x.fillStyle = BONE; x.fillRect(-3, -146, 6, 152)
  for (let i = 0; i < 6; i++) {
    const wv = Math.sin(t * 7 - i * 0.8) * 6 * (t > t0 ? 1 : 0)
    x.fillStyle = INK; x.fillRect(3 + i * 16, -150 + wv - 4, 16, 64)
    x.fillStyle = col; x.fillRect(3 + i * 16, -146 + wv, 16, 56)
  }
  x.restore()
}

function drawStage(x, t, K) {
  const out = K.popOut(t, T.out)
  if (out <= 0) return
  const last = t >= T.cut
  mountains(x, t, out)
  // the climb: up the left slope to the summit
  const cp = last ? 1 : ease.inOutQuad(prog(t, ...T.climb))
  const step = Math.floor(cp * 8) / 8
  const gx = lerp(PK.L.x - 110, PK.L.x - 20, step), gy = lerp(PK.L.y + 200, PK.L.y, step)
  const mp = last ? 1 : ease.inOutQuad(prog(t, ...T.mate)), ms = Math.floor(mp * 6) / 6
  const mx = lerp(PK.R.x + 260, PK.R.x + 20, ms), my = lerp(PK.R.y + 260, PK.R.y, ms)
  // the bridge, board by board
  if (last) {
    const n = Math.floor(prog(t, ...T.bridge) * 10.999)
    for (let i = 0; i < n; i++) {
      const bx = lerp(PK.L.x + 110, PK.R.x - 110, i / 9), by = PK.L.y + 70 + Math.sin(Math.PI * i / 9) * 30
      x.save(); x.globalAlpha = out; x.fillStyle = INK; x.fillRect(bx - 22, by - 8, 44, 28); x.fillStyle = '#c98a4e'; x.fillRect(bx - 17, by - 4, 34, 20); x.restore()
    }
    if (n > 0) { x.save(); x.globalAlpha = out; x.strokeStyle = '#7a4a2a'; x.lineWidth = 5; x.beginPath(); x.moveTo(PK.L.x + 90, PK.L.y + 40); x.quadraticCurveTo(540, PK.L.y + 90, lerp(PK.L.x + 90, PK.R.x - 90, n / 10), PK.L.y + 40 + Math.sin(Math.PI * n / 10) * 30); x.stroke(); x.restore() }
    if (t > T.heart) { const p = prog(t, T.heart, T.heart + 0.5); K.drawBits(x, HEART, { H: '#ff4f86', W: '#ffd1de' }, 540, PK.L.y - 60 - p * 30, 14 * ease.outBack(p)) }
    sparkles(x, t, 540, PK.L.y - 60, T.heart, 10, 120, 0.3, [PINK, GOLD, BONE])
  }
  K.guide(t, { x: mx, y: my, size: 240, color: MATE, glyph: null, mood: t > T.flagB ? 'happy' : 'neutral', look: [-1, 0], hops: MATE_HOPS, seed: 4, pop: out * (t < T.mate[0] ? ease.outBack(prog(t, T.mate[0] - 0.3, T.mate[0])) : 1), lantern: 0, alpha: t < T.mate[0] - 0.3 ? 0 : 1 })
  K.guide(t, { x: gx, y: gy, size: 260, color: CAP.color, glyph: CAP.glyph, mood: t < T.l1 ? 'squint' : t < T.flagA ? 'neutral' : 'happy', look: t < T.mate[0] ? [0, -1] : [1, 0], hops: HOPS, seed: 10, pop: out })
  flag(x, t, PK.L.x + 125, PK.L.y + 110, T.flagA, CAP.color)
  flag(x, t, PK.R.x - 125, PK.R.y + 110, T.flagB, MATE)
  sparkles(x, t, PK.L.x + 70, PK.L.y - 20, T.flagA, 8, 90, 0.2, [CAP.color, GOLD, BONE])
  sparkles(x, t, PK.R.x - 70, PK.R.y - 20, T.flagB, 8, 90, 0.5, [MATE, GOLD, BONE])
}

const F = guideFilm({
  duration: 15, sign: 'capricorn', n: 2, speaker: SPEAK, accent: ACC,
  hook: 'What you | *need,* | Capricorn.', hookOut: T.hookOut, chipOut: [T.cut - 0.3, T.cut],
  lines: LINES, open: T.open, close: T.close,
  fact: { text: 'CAPRICORN IS THE NATURAL RULER|OF THE 10TH HOUSE (CAREER)', at: T.fact, dur: T.factDur, x: 540, y: 330 },
  heads: [
    { text: '*Build* | together.', at: T.last, out: T.out, top: 300, size: 132, accentSize: 200, accentColor: ACC },
  ],
  drawBack: drawStage,
  cues: [
    ...[0.15, 0.6, 1.05, 1.5, 1.95, 2.4].map((v, i) => ['tick', v, 0.03 + (i % 2) * 0.01]),
    ['whoosh', T.mate[0] - 0.3, 0.3, 0.025], ...[3.0, 3.5, 4.0, 4.5, 5.0].map(v => ['tick', v, 0.025]),
    ['boom', T.flagA, 0.12], ['pop', T.flagA, 880, 0.04, -0.4], ['boom', T.flagB, 0.12], ['pop', T.flagB, 1046.5, 0.04, 0.4],
    ['pluck', T.wave + 0.3, 1318.51, 0.03, 0.6, 0.4],
    ...Array.from({ length: 10 }, (_, i) => ['tick', +(T.bridge[0] + i * (T.bridge[1] - T.bridge[0]) / 10).toFixed(3), 0.03]),
    ['glitter', T.heart, T.heart + 0.5], ['pluck', T.heart, 1567.98, 0.04, 0.6, 0],
  ],
  cuts: [{ t: T.cut, kind: 'flip' }],
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
