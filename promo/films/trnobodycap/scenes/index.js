// trnobodycap: NOBODY: · "Capricorn planning date night:" (15 s vertical, Star Talk Trends §2.3, music: chiptune · C#)
// Story 0–10.6, then the shared end card. The format's look lives in ./nobody.js (identical in all five NOBODY: films).
//   0.00–2.72  "Nobody:"  the blank meme card, a blinking caret, crickets, a tumbleweed. Silence.
//   2.72       card cut → "Capricorn planning *date night:*" (drop 2.82). ♑ Capricorn, pointer in hand, at a big
//              color-coded planner: FRI · DATE NIGHT. Blocks fill in like a marker (rule of three, third twisted):
//              7:00 DINNER · 8:15 WALK · 9:00 SPONTANEOUS FUN (scheduled).
//   4.55       ♑: "9:00 to 9:05: *spontaneous fun.*"  ♓ Pisces, in the corner, weeps at the color-coding.
//   6.0–6.6    the escalation: the fun gets its own sub-schedule. 9:01 GASP (NATURAL) · 9:02 TWIRL · 9:03 "WOW, SO RANDOM!"
//              ♌ their date peeks in, reads it… and is charmed.
//   7.75       a BOOKED stamp THUNKs onto the planner: "Spontaneity: *booked*."
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { signStar } from '../../startalk.js'
import {
  makeNobody, T, GOLD, BONE, INK, MONO, INTER, MEME, R, r3, pop01, outK, sparkles, hearts, star, starFrame, pisces,
} from './nobody.js'

const CAP = signStar('capricorn'), LEO = signStar('leo')
const KSP = `${CAP.glyph}︎ CAPRICORN`
const LINES = [{ t: 4.55, speaker: KSP, color: '#7dffc8', text: '9:00 to 9:05: *spontaneous fun.*' }]

const E = { board: 2.95, rows: [3.35, 3.85, 4.35, 6.0, 6.3, 6.6], date: 6.95, stamp: 7.75 }
const BD = { x: 470, y: 560, w: 545, h: 740 }
const ROWS = [
  { time: '7:00', label: 'DINNER', col: '#7fb8ff' },
  { time: '8:15', label: 'WALK', col: '#ffd166' },
  { time: '9:00', label: 'SPONTANEOUS FUN', sub: '(scheduled)', col: '#ff8fb1' },
  { time: '9:01', label: 'GASP (NATURAL)', col: '#ffb3cf' },
  { time: '9:02', label: 'TWIRL', col: '#ffb3cf' },
  { time: '9:03', label: '“WOW, SO RANDOM!”', col: '#ffb3cf' },
]
const rowY = i => BD.y + 92 + i * 106
const CAP_P = { x: 225, y: 1160, s: 245 }
const CAP_HOPS = [T.drop + 0.1, ...E.rows.map(r => r + 0.02), 4.6, 5.1, E.stamp - 0.25, T.PLate + 0.05, T.PLate + 0.5]
const LEO_HOPS = [E.date + 0.05, E.stamp + 0.15, T.PLate + 0.2, T.PLate + 0.62]

function board(x, t, k) {
  const bk = pop01(t, E.board, 0.4, 1.8) * k
  if (bk <= 0.01) return
  x.save(); x.translate(BD.x + BD.w / 2, BD.y + BD.h / 2); x.scale(bk, bk); x.translate(-(BD.x + BD.w / 2), -(BD.y + BD.h / 2))
  R(x, 'rgba(6,4,18,0.5)', BD.x + 14, BD.y + 16, BD.w, BD.h)
  R(x, INK, BD.x - 6, BD.y - 6, BD.w + 12, BD.h + 12); R(x, MEME, BD.x, BD.y, BD.w, BD.h)
  R(x, '#2fc79a', BD.x, BD.y, BD.w, 70)
  x.font = `700 32px ${MONO}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText('FRI · DATE NIGHT', BD.x + BD.w / 2, BD.y + 37)
  // ring binding
  for (let i = 0; i < 6; i++) { R(x, INK, BD.x + 40 + i * 92, BD.y - 20, 14, 34); R(x, '#cfd6ea', BD.x + 43 + i * 92, BD.y - 17, 8, 28) }
  ROWS.forEach((rw, i) => {
    const y = rowY(i)
    R(x, 'rgba(27,18,54,0.12)', BD.x + 16, y + 98, BD.w - 32, 3)
    const f = ease.inOutCubic(prog(t, E.rows[i], E.rows[i] + 0.35))
    if (f <= 0) return
    x.font = `700 28px ${MONO}`; x.fillStyle = 'rgba(27,18,54,0.75)'; x.textAlign = 'left'
    x.globalAlpha = clamp(f * 3); x.fillText(rw.time, BD.x + 20, y + 50); x.globalAlpha = 1
    const bx = BD.x + 122, bw = (BD.w - 140) * f, small = i >= 3
    R(x, INK, bx - 4, y + 10 - 4, bw + 8, 84 + 8); R(x, rw.col, bx, y + 10, bw, 84)
    R(x, 'rgba(255,255,255,0.4)', bx, y + 10, bw, 8)
    // the label writes on with the marker
    x.save(); x.beginPath(); x.rect(bx, y, bw, 100); x.clip()
    x.fillStyle = INK; x.textAlign = 'left'
    x.font = `800 ${small ? 28 : 32}px ${INTER}`
    x.fillText(rw.label, bx + 18, rw.sub ? y + 40 : y + 53)
    if (rw.sub) { x.font = `italic 500 30px 'EB Garamond', Georgia, serif`; x.fillText(rw.sub, bx + 18, y + 74) }
    x.restore()
    if (f < 1) { R(x, INK, bx + bw - 6, y + 2, 16, 100); R(x, '#2fc79a', bx + bw - 2, y + 6, 8, 92) }   // the marker
  })
  x.restore()
}

function stamp(x, t, k) {
  if (t < E.stamp - 0.25) return
  const d = ease.inQuad(prog(t, E.stamp - 0.25, E.stamp))
  const s = lerp(2.4, 1, d) * k, a = clamp(d * 2) * k
  if (s <= 0.01) return
  x.save(); x.translate(870, 975); x.rotate(-0.16); x.scale(s, s); x.globalAlpha *= a * 0.85
  x.font = `800 64px ${INTER}`
  const w = x.measureText('BOOKED').width + 60
  x.fillStyle = 'rgba(251,248,241,0.55)'; x.fillRect(-w / 2, -48, w, 96)
  x.strokeStyle = '#d6284a'; x.lineWidth = 10; x.strokeRect(-w / 2, -48, w, 96)
  x.lineWidth = 3; x.strokeRect(-w / 2 + 11, -37, w - 22, 74)
  x.fillStyle = '#d6284a'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('BOOKED', 0, 4)
  x.restore()
}

function scene(x, t, Tm, k) {
  if (k <= 0) return
  const dS = t - E.stamp, shake = dS > 0 && dS < 0.4 ? 12 * Math.exp(-dS * 10) * Math.sin(dS * 55) : 0
  x.save(); x.translate(0, shake)
  // ♓ Pisces, moved by the color-coding
  const pp = pop01(t, Tm.drop + 0.4, 0.3, 2) * k
  pisces(x, t, { x: 130, y: 640, s: 130, pop: pp }, t > Tm.PLate ? 3 : t > E.rows[2] + 0.3 ? 2 : 1, t > E.rows[1] ? 'sparkle' : 'neutral', [1, 0])
  board(x, t, k)
  stamp(x, t, k)
  sparkles(x, t, 870, 975, E.stamp, 12, 200, 1, ['#ff8fb1', GOLD, BONE])
  // ♌ the date peeks in, charmed
  const lp = pop01(t, E.date, 0.36, 2.2) * k
  if (lp > 0.01) {
    let lm = 'wide', ll = [1, -0.3]
    if (t > E.date + 0.5) { lm = 'sparkle'; ll = [1, -0.5] }
    if (t > E.stamp + 0.1) { lm = 'happy'; ll = undefined }
    star(x, t, { x: 300, y: 855, s: 165, pop: lp }, { color: LEO.color, glyph: LEO.glyph, mood: lm, look: ll, hops: LEO_HOPS, seed: 7 })
    if (t > Tm.PLate) hearts(x, t, 300, 760, Tm.PLate + 0.1, 4, 3)
  }
  // ♑ Capricorn with the pointer
  const cp = pop01(t, Tm.drop, 0.36, 2.1) * k
  let cur = -1
  E.rows.forEach((r, i) => { if (t >= r - 0.1) cur = i })
  let m = 'neutral', l = [1, -0.4]
  if (t > E.rows[2] + 0.2) { m = 'happy'; l = undefined }
  if (t > E.rows[3] - 0.1) { m = 'squint'; l = [1, -0.6] }
  if (t > E.stamp - 0.25) { m = 'wink'; l = undefined }
  if (t > Tm.PLate) m = 'happy'
  const F = starFrame(CAP_P.x, CAP_P.y, CAP_P.s, t, { pop: cp, hops: CAP_HOPS, seed: 5 })
  if (cp > 0.3) {
    const ty = cur >= 0 && t < E.stamp - 0.3 ? rowY(cur) + 52 : 975, tx = cur >= 0 && t < E.stamp - 0.3 ? BD.x + 110 : 740
    const sx = F.ox + F.S * 0.36, sy = F.cy - F.S * 0.08
    const n = 24
    for (let i = 0; i <= n; i++) R(x, INK, lerp(sx, tx, i / n) - 7, lerp(sy, ty, i / n) - 7, 14, 14)
    for (let i = 0; i <= n; i++) R(x, i > n - 3 ? '#f4e8cc' : '#a0703c', lerp(sx, tx, i / n) - 4, lerp(sy, ty, i / n) - 4, 8, 8)
  }
  star(x, t, { ...CAP_P, pop: cp }, { color: CAP.color, glyph: CAP.glyph, mood: m, look: l, hops: CAP_HOPS, seed: 5, glow: 1.1 })
  x.restore()
  void INTER
}

const EP = makeNobody({
  caption: 'Capricorn planning *date night:*', capAccent: '#14936c',
  last: 'Spontaneity: *booked*.', lastAccent: '#ff8fb1',
  lines: LINES,
  scene,
  cues: Tm => [
    ['pop', r3(Tm.drop + 0.02), 659.25, 0.04, -0.3], ['pop', r3(E.board + 0.05), 880, 0.035, 0.3], ['tick', r3(E.board + 0.1), 0.04],
    // marker squeaks for each block
    ...E.rows.flatMap((r, i) => [['tick', r, 0.03], ['pluck', r3(r + 0.05), [880, 987.77, 1174.66, 1318.51, 1479.98, 1760][i], 0.03, 0.3, 0.35], ['tick', r3(r + 0.2), 0.02]]),
    ['pop', E.date, 1318.51, 0.035, -0.4], ['pop', r3(E.date + 0.5), 1567.98, 0.025, -0.4],
    ['whoosh', r3(E.stamp - 0.25), 0.25, 0.035], ['boom', E.stamp, 0.28], ['tom', E.stamp, 92, { gain: 0.28, decay: 0.3 }], ['tick', E.stamp, 0.07],
    ['pluck', r3(Tm.PLate + 0.2), 1174.66, 0.035, 0.5, -0.3], ['pluck', r3(Tm.PLate + 0.32), 1567.98, 0.03, 0.5, -0.3],
  ],
})
void MEME

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
