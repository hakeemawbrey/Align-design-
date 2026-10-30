// guideaquarius3 (20 s vertical Align ad, Star Talk "Your Star Guide", Aquarius note 3 / 3: try this week) · story 0–15.6,
// then the shared end card.
//   0.00       "Try this week, *Aquarius*."  The ♒ guide mid-scribble at a whiteboard crammed with theories: boxes, arrows,
//              a graph, "feelings = f(x)?".
//   2.82 drop  ♒ YOUR STAR: "share a feeling. not a theory."  4.60 An eraser sweeps the board clean, row by row.
//   6.40       "'i felt happy today' counts."  On the clean board the guide draws one heart, cell by cell, and writes
//              "i felt happy today" under it. The ★ ASTROLOGY SAYS chip: an air sign, despite the water-bearer.
//   10.40 cut  "Feel it | *out loud.*"  The heart pops off the board, big, and floats over the guide; a speech bubble:
//              "i felt happy today."
// One canvas (sky + board + guide), DOM type above it. Pure f(t).
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { talkHops, signStar } from '../../startalk.js'
import { guideFilm, BEAT, GOLD, BONE, INK, MONO, PINK, sparkles } from './guide.js'

const AQU = signStar('aquarius')
const ACC = '#7fe3ff'
const SPEAK = '♒ YOUR STAR'
const T = {
  hookOut: [2.3, 2.6], open: 2.6, l1: BEAT(4) + 0.02, wipe: [4.6, 5.8],
  l2: 6.4, draw: [6.8, 8.2], write: [8.2, 9.2], fact: 3.9, factDur: 4.6, close: 9.9,
  cut: 10.4, last: 10.48, lastLand: 10.95, lift: [10.6, 11.3], say: 11.8, out: [15.15, 15.45],
}
const LINES = [
  { t: T.l1, text: 'share a feeling. *not a theory.*' },
  { t: T.l2, text: "*'i felt happy today'* counts." },
]
const HOPS = [...talkHops(LINES.map(l => ({ ...l, speaker: SPEAK })), SPEAK, { cps: 30 }), T.wipe[1], T.write[1], T.lastLand, T.say]
const HEART = ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...']
const HEARTW = ['.HH.HH.', 'HHWHHHH', 'HWHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...']
const BX = 540, BY = 770, BW = 860, BH = 520

function theories(x, t) {
  // rows of scribbles; the eraser wipes them top-down
  const wp = prog(t, ...T.wipe), cut = BY - BH / 2 + wp * BH
  x.save(); x.beginPath(); x.rect(BX - BW / 2, cut, BW, BH); x.clip()
  x.strokeStyle = '#2b4c9a'; x.fillStyle = '#2b4c9a'; x.lineWidth = 6
  x.font = `700 34px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'
  x.fillText('feelings = f(x)?', BX - 380, BY - 220)
  x.strokeRect(BX - 380, BY - 160, 170, 80); x.strokeRect(BX - 100, BY - 160, 170, 80); x.strokeRect(BX + 180, BY - 160, 170, 80)
  x.beginPath(); x.moveTo(BX - 210, BY - 120); x.lineTo(BX - 100, BY - 120); x.moveTo(BX + 70, BY - 120); x.lineTo(BX + 180, BY - 120); x.stroke()
  x.fillText('if love → ??', BX - 360, BY - 10)
  x.strokeStyle = '#c0392b'
  x.beginPath(); x.moveTo(BX + 60, BY + 160); x.lineTo(BX + 60, BY + 20); x.moveTo(BX + 60, BY + 160); x.lineTo(BX + 360, BY + 160); x.stroke()
  x.beginPath(); x.moveTo(BX + 70, BY + 150); for (let i = 0; i <= 12; i++) x.lineTo(BX + 70 + i * 24, BY + 150 - Math.abs(Math.sin(i * 1.3)) * 110); x.stroke()
  x.fillStyle = '#2b4c9a'; x.fillText('theory #7', BX - 360, BY + 90); x.fillText('(see #3)', BX - 360, BY + 150)
  // the scribble being written right now (frame 0 is mid-stroke)
  const n = Math.floor(clamp(t / 2.2) * 9)
  x.fillText('∴ ????'.slice(0, Math.max(1, Math.ceil(n * 6 / 9))), BX - 380, BY + 220)
  x.restore()
  if (wp > 0 && wp < 1) {
    x.save(); x.fillStyle = INK; x.fillRect(BX - BW / 2 + 20 + Math.sin(t * 30) * 320 + 320, cut - 40, 160, 70)
    x.fillStyle = '#ffd24a'; x.fillRect(BX - BW / 2 + 28 + Math.sin(t * 30) * 320 + 320, cut - 32, 144, 30)
    x.fillStyle = '#5a6b80'; x.fillRect(BX - BW / 2 + 28 + Math.sin(t * 30) * 320 + 320, cut - 2, 144, 24); x.restore()
  }
}

function board(x, t, K, vis) {
  x.save(); x.globalAlpha = vis
  x.fillStyle = INK; x.fillRect(BX - BW / 2 - 16, BY - BH / 2 - 16, BW + 32, BH + 32)
  x.fillStyle = '#c8cdd6'; x.fillRect(BX - BW / 2 - 8, BY - BH / 2 - 8, BW + 16, BH + 16)
  x.fillStyle = '#f7f8fb'; x.fillRect(BX - BW / 2, BY - BH / 2, BW, BH)
  x.fillStyle = '#c8cdd6'; x.fillRect(BX - 200, BY + BH / 2 + 8, 400, 18)
  theories(x, t)
  // the heart, drawn cell by cell
  const cells = []
  HEART.forEach((r, j) => [...r].forEach((ch, i) => { if (ch === 'H') cells.push([i, j]) }))
  const n = Math.floor(prog(t, ...T.draw) * cells.length)
  const c = 34, ox = BX - 3.5 * c, oy = BY - 200
  x.fillStyle = '#e8336d'
  for (let k = 0; k < n; k++) { const [i, j] = cells[k]; x.fillRect(ox + i * c, oy + j * c, c - 2, c - 2) }
  const w = 'i felt happy today', m = Math.floor(prog(t, ...T.write) * w.length)
  x.fillStyle = '#2b4c9a'; x.font = `700 46px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText(w.slice(0, m), BX, BY + 160)
  x.restore()
  if (t > T.draw[1]) sparkles(x, t, BX, BY - 80, T.draw[1], 10, 180, 0.2, [PINK, GOLD, ACC])
}

function bubble(x, cx, cy, text, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.font = `700 38px ${MONO}`; const w = x.measureText(text).width + 60
  x.fillStyle = INK; x.fillRect(-w / 2 - 8, -46, w + 16, 92); x.fillStyle = ACC; x.fillRect(-w / 2, -38, w, 76)
  x.fillStyle = INK; x.fillRect(-w / 2 + 40, 38, 32, 26); x.fillStyle = ACC; x.fillRect(-w / 2 + 48, 38, 16, 16)
  x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 2)
  x.restore()
}

function drawStage(x, t, K) {
  const out = K.popOut(t, T.out)
  if (out <= 0) return
  const last = t >= T.cut
  if (!last) board(x, t, K, out)
  const scrib = (t < 2.4 || (t > T.draw[0] && t < T.write[1])) ? Math.sin(t * 22) * 10 : 0
  const P = last ? { x: 540, y: 1250, size: 300 } : { x: 830 + scrib, y: 1210, size: 270 }
  const mood = t < T.l1 ? 'squint' : t < T.wipe[1] ? 'neutral' : t < T.cut ? 'happy' : t < T.say ? 'sparkle' : 'happy'
  const r = K.guide(t, { ...P, color: AQU.color, glyph: AQU.glyph, mood, look: last ? [0, -1] : [-1, -1], hops: HOPS, seed: 11, pop: out, side: last ? 1 : -1 })
  if (last) {
    const lp = ease.outBack(prog(t, ...T.lift))
    K.drawBits(x, HEARTW, { H: '#ff4f86', W: '#ffd1de' }, 540, lerp(560, 720, lp) + Math.sin(t * 2.4) * 10, lerp(20, 30, lp) * out)
    sparkles(x, t, 540, 760, T.lift[1], 12, 220, 0.4, [PINK, GOLD, BONE])
    bubble(x, 600, r.top - 90, 'i felt happy today.', K.pop01(t, T.say, 0.32, 2.4) * out)
  }
}

const F = guideFilm({
  duration: 20, sign: 'aquarius', n: 3, speaker: SPEAK, accent: ACC,
  hook: 'Try this week, | *Aquarius.*', hookOut: T.hookOut, chipOut: [T.cut - 0.3, T.cut],
  lines: LINES, open: T.open, close: T.close,
  fact: { text: 'AQUARIUS IS AN AIR SIGN,|DESPITE THE WATER-BEARER', at: T.fact, dur: T.factDur, x: 540, y: 330 },
  heads: [
    { text: 'Feel it | *out* *loud.*', at: T.last, out: T.out, top: 200, size: 124, accentSize: 186, accentColor: ACC, late: 2, lateAt: T.lastLand },
  ],
  drawBack: drawStage,
  cues: [
    ...Array.from({ length: 10 }, (_, i) => ['tick', +(0.05 + i * 0.22).toFixed(2), 0.02]),
    ['whoosh', T.wipe[0], 0.4, 0.03], ['whoosh', T.wipe[0] + 0.4, 0.4, 0.03], ['whoosh', T.wipe[0] + 0.8, 0.4, 0.03],
    ...Array.from({ length: 8 }, (_, i) => ['pop', +(T.draw[0] + i * 0.18).toFixed(2), [880, 987.77, 1174.66, 1318.51][i % 4], 0.02, 0]),
    ['pluck', T.draw[1], 1318.51, 0.04, 0.6, 0], ['glitter', T.draw[1], T.draw[1] + 0.5],
    ...Array.from({ length: 6 }, (_, i) => ['tick', +(T.write[0] + i * 0.17).toFixed(2), 0.02]),
    ['riser', T.lift[0], T.lift[1], 0.025], ['glitter', T.lift[1], T.lift[1] + 0.6], ['pop', T.say, 1046.5, 0.04, 0.3],
    ['whoosh', T.out[0], 0.35, 0.03],
  ],
  cuts: [{ t: T.cut, kind: 'flip' }],
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
