// askaquarius (20 s vertical Align ad, Star Talk season 1 extra "Ask the Stars") · story 0–15.6, then the shared end card.
//   0.00       A DM lands: "Am I too *weird* to date?" Below, the ♒ star is mid-scribble at a whiteboard of its odd hobbies
//              ("rates clouds /10" done, "knows 40 knots" being written).
//   2.82 drop  ♒ AQUARIUS STAR: "the right person likes your weird."  Item 3, "rocks with faces", plus a doodle; at 4.6 the
//              star proudly holds up its own rock with a face. The REAL ASTROLOGY chip: fixed air, Saturn and Uranus.
//   6.20       "lead with it. it filters fast."  Three faint passers-by drift off, unbothered (the filter at work).
//   8.40       Another star drops in holding the SAME rock with a face. Both wide-eyed; then heart-eyes.
//   9.90       The box shuts, the DM slides away: "Talk cards: | lead with *you.*" A card flips to a real talk card
//              ("What's a hill you will die on?").
//   12.66 cut  "Weird is a *filter.* | Use it."  The two stars side by side, rocks raised together; sparkles.
// One canvas (sky + whiteboard + stars), DOM type above it. Pure f(t).
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { drawStarChar, talkHops, signStar, STAR } from '../../startalk.js'
import { askFilm, BEAT, GOLD, BONE, INK, MONO, sparkles } from './ask.js'

const AQU = signStar('aquarius')
const ACC = '#7fe3ff'
const MATE = '#ffb36b'                  // the other star: a plain warm star, no sign (no compatibility verdicts)
const SPEAK = '♒ AQUARIUS STAR'
const T = {
  open: 2.62, l1: BEAT(4) + 0.02, item3: 3.1, doodle: 3.9, rock: 4.6,
  l2: 6.2, passers: [6.7, 8.0], mate: 8.4, gasp: 8.75, hearts: 9.25,
  close: 9.8, dmOut: [9.65, 9.92],
  tie: 9.98, flip: [10.42, 10.82], tieOut: [12.4, 12.62],
  cut: 12.66, last: 12.72, lastLand: 13.12, clink: 13.6, out: [15.2, 15.45],
}
const LINES = [
  { t: T.l1, text: 'the right person *likes your weird.*' },
  { t: T.l2, text: 'lead with it. *it filters fast.*' },
]
const HOPS = [...talkHops(LINES.map(l => ({ ...l, speaker: SPEAK })), SPEAK, { cps: 30 }), T.rock, T.hearts, T.lastLand, T.clink]
const MATE_HOPS = [T.mate + 0.25, T.hearts, T.lastLand, T.clink]
const ROCK = ['..GGGG..', '.GGGGGG.', 'GWKGGWKG', 'GGGGGGGG', 'GGGMMGGG', '.GGGGGG.']
const ROCK_C = { G: '#9a9aae', W: '#ffffff', K: INK, M: '#5a5a6e' }
const HEART = ['.H.H.', 'HWHHH', 'HHHHH', '.HHH.', '..H..']
const ITEMS = [{ t: -1, text: '1. rates clouds /10' }, { t: -0.45, text: '2. knows 40 knots' }, { t: T.item3, text: '3. rocks with faces' }]
const WCPS = 14

function aquState(t) {
  if (t < T.l1) return { mood: 'happy', look: [-1, 0] }
  if (t < T.rock) return { mood: 'neutral', look: [-1, 0] }
  if (t < T.l2) return { mood: 'sparkle', look: [0, 0] }
  if (t < T.mate) return { mood: 'happy' }
  if (t < T.mate + 0.3) return { mood: 'neutral', look: [-1, 0] }
  if (t < T.hearts) return { mood: 'wide', look: [-1, 0], blink: false }
  if (t < T.cut) return { mood: 'heart' }
  return { mood: 'happy', look: [-1, 0] }
}
function mateState(t) {
  if (t < T.gasp) return { mood: 'neutral', look: [1, 0] }
  if (t < T.hearts) return { mood: 'wide', look: [1, 0], blink: false }
  if (t < T.cut) return { mood: 'heart' }
  return { mood: 'happy', look: [1, 0] }
}

function board(x, t, k) {
  if (k <= 0.01) return
  const BX = 400, BY = 780
  x.save(); x.translate(BX, BY); x.scale(k, k)
  // legs + frame + white surface
  x.fillStyle = INK; x.fillRect(-250, 170, 18, 150); x.fillRect(232, 170, 18, 150)
  x.fillStyle = '#9aa3b8'; x.fillRect(-246, 174, 10, 140); x.fillRect(236, 174, 10, 140)
  x.fillStyle = INK; x.fillRect(-330, -210, 660, 400)
  x.fillStyle = '#b8c0d0'; x.fillRect(-322, -202, 644, 384)
  x.fillStyle = '#f7f4ee'; x.fillRect(-306, -186, 612, 352)
  x.fillStyle = '#5a6278'; x.fillRect(-306, 166, 612, 12)                    // tray
  x.fillStyle = '#ff5c7a'; x.fillRect(-200, 158, 54, 10); x.fillStyle = '#3f8cff'; x.fillRect(-120, 158, 54, 10)
  // title
  x.font = `700 36px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'
  x.fillStyle = '#3f8cff'; x.fillText('MY HOBBIES ★', -280, -146)
  x.fillStyle = '#3f8cff'; x.fillRect(-280, -120, 300, 5)
  x.font = `700 38px ${MONO}`; x.fillStyle = '#1b1236'
  ITEMS.forEach((it, i) => {
    const n = it.t <= -1 ? it.text.length : Math.floor(clamp((t - it.t) * WCPS, 0, it.text.length))
    if (n > 0) x.fillText(it.text.slice(0, n), -280, -66 + i * 70)
  })
  // doodle: a little rock with a face next to item 3
  const dk = prog(t, T.doodle, T.doodle + 0.5)
  if (dk > 0) {
    x.globalAlpha *= dk
    x.strokeStyle = '#1b1236'; x.lineWidth = 5; x.beginPath(); x.ellipse(220, 74, 44, 32, 0, 0, Math.PI * 2); x.stroke()
    x.fillStyle = '#1b1236'; x.fillRect(200, 62, 9, 9); x.fillRect(232, 62, 9, 9); x.fillRect(208, 86, 26, 5)
    x.globalAlpha /= dk
  }
  x.restore()
}

/** the marker tip position while writing (follows the current item's last letter) */
function markerAt(t) {
  const BX = 400, BY = 780
  const it = t < T.item3 ? ITEMS[1] : ITEMS[2]
  const i = t < T.item3 ? 1 : 2
  const n = clamp((t - it.t) * WCPS, 0, it.text.length)
  return { x: BX - 280 + n * 23, y: BY - 66 + i * 70 + 10 + Math.sin(t * 40) * 4 }
}

function drawStage(x, t, K) {
  const out = K.popOut(t, T.out)
  if (out <= 0) return
  const last = t >= T.cut
  const tieHide = !last && t >= T.tie - 0.12 ? ease.inOutCubic(prog(t, T.tie - 0.12, T.tie + 0.2)) : 0
  const vis = out * (1 - tieHide)
  if (vis <= 0.01) return
  if (!last) board(x, t, vis)
  // passers-by: three faint little stars drift off, unbothered (the filter)
  if (!last && t > T.passers[0] && t < T.passers[1]) for (let i = 0; i < 3; i++) {
    const p = prog(t, T.passers[0] + i * 0.15, T.passers[1])
    drawStarChar(x, lerp(160 + i * 180, -120 - i * 80, ease.inQuad(p)), 1150 - i * 24, 110, t, { color: '#b9b2d8', mood: 'neutral', look: [-1, 0], alpha: 0.6 * Math.sin(Math.PI * Math.min(1, p * 1.4 + 0.2)), seed: 20 + i, tips: false, glow: 0.4 })
  }
  // our star
  const A = last ? { x: 690, y: 1160, size: 290 } : { x: 860, y: 1040, size: 270 }
  const writing = !last && t < T.item3 + ITEMS[2].text.length / WCPS + 0.1 && t < T.doodle + 0.5
  const optsA = { color: AQU.color, glyph: AQU.glyph, ...aquState(t), hops: HOPS, seed: 2, glow: 1.15, pop: vis, squash: writing ? 0.02 * Math.sin(t * 20) : 0 }
  const rA = drawStarChar(x, A.x, A.y, A.size, t, optsA)
  // the marker (an arm-less star holds it by magic): a little pen flying at the board while writing
  if (writing) {
    const m = markerAt(t)
    x.save(); x.translate(m.x + 14, m.y - 18); x.rotate(-0.6)
    x.fillStyle = INK; x.fillRect(-8, -40, 16, 56); x.fillStyle = '#3f8cff'; x.fillRect(-4, -36, 8, 30); x.fillStyle = BONE; x.fillRect(-4, -6, 8, 18)
    x.restore()
    // a dotted "magic" trail from the star's tip to the marker
    x.fillStyle = 'rgba(127,227,255,0.6)'
    for (let i = 1; i < 6; i++) { const u = i / 6; x.fillRect(lerp(rA.x - 60, m.x + 14, u) + Math.sin(t * 6 + i) * 6, lerp(rA.y - 60, m.y - 40, u), 6, 6) }
  }
  // the rocks: ours (from 4.6), the mate's (from 8.4), clinked together at the end
  const rk = K.pop01(t, T.rock, 0.35, 2.4)
  if (rk > 0.01) {
    const clink = last && t > T.clink && t < T.clink + 0.3 ? Math.sin((t - T.clink) * Math.PI / 0.3) * 20 : 0
    const rx = last ? 560 - clink : rA.x - 10, ry = last ? 940 : rA.y - A.size * 0.62
    K.drawBits(x, ROCK, ROCK_C, rx, ry + Math.sin(t * 3) * 4, 13 * rk * vis, { rot: last ? -0.15 : 0.08 })
    if (!last) sparkles(x, t, rx, ry, T.rock + 0.1, 8, 90, 0.2, [ACC, GOLD, BONE])
  }
  // the mate
  if (t >= T.mate) {
    const drop = 1 - ease.outCubic(prog(t, T.mate - 0.1, T.mate + 0.25))
    const M = last ? { x: 380, y: 1170, size: 270 } : { x: 230, y: 1130 - drop * 600, size: 240 }
    const mk = K.pop01(t, T.mate, 0.36, 2) * vis
    const rM = drawStarChar(x, M.x, M.y, M.size, t, { color: MATE, ...mateState(t), hops: MATE_HOPS, seed: 11, glow: 1.1, pop: mk })
    const clink = last && t > T.clink && t < T.clink + 0.3 ? Math.sin((t - T.clink) * Math.PI / 0.3) * 20 : 0
    const rx = last ? 520 + clink : rM.x + 10, ry = last ? 950 : rM.y - M.size * 0.62
    K.drawBits(x, ROCK, ROCK_C, rx, ry + Math.sin(t * 3 + 1) * 4, 12 * mk, { rot: last ? 0.15 : -0.08, sx: -1 })
    if (!last && t > T.hearts) for (let i = 0; i < 4; i++) { const b = T.hearts + i * 0.18, p = prog(t, b, b + 1.0); if (p > 0 && p < 1) K.drawBits(x, HEART, { H: '#ff4f86', W: '#ffd1de' }, (rM.x + rA.x) / 2 + (i - 1.5) * 90, 960 - p * 220, 8, { alpha: Math.sin(Math.PI * p) }) }
    if (!last) sparkles(x, t, (rM.x + rA.x) / 2, 1000, T.gasp, 10, 220, 0.5, [ACC, GOLD, MATE])
  }
  if (last) { sparkles(x, t, 540, 945, T.clink + 0.1, 10, 120, 0.3, [GOLD, ACC, MATE]); sparkles(x, t, 540, 1080, T.lastLand, 12, 330, 0.1, [GOLD, ACC, BONE]) }
}

const F = askFilm({
  duration: 20, sign: 'aquarius', speaker: SPEAK, accent: ACC,
  question: 'Am I too *weird* | to date?', qSize: 104,
  dmOut: T.dmOut,
  lines: LINES, open: T.open, close: T.close,
  note: { t: 1.2, out: [9.6, 9.8], rows: ['♒ AQUARIUS · FIXED AIR', 'RULED BY SATURN (TRADITIONAL)', 'AND URANUS (MODERN)'], w: 760, top: 1250 },
  heads: [
    { text: 'Talk cards: | lead with *you.*', at: T.tie + 0.05, out: T.tieOut, top: 150, size: 100, accentSize: 140, accentColor: GOLD, late: 1, lateAt: T.tie + 0.45 },
    { text: 'Weird is a *filter.* | Use it.', at: T.last, out: T.out, top: 230, size: 112, accentSize: 160, accentColor: ACC, late: 2, lateAt: T.lastLand, lineHeight: 1.02 },
  ],
  tie: { img: 'card-talk-1.png', back: 'card-back.png', at: T.tie, flip: T.flip, out: T.tieOut, y: 920, h: 740, chip: { t: T.flip[1] + 0.1, text: 'answers stay hidden until you both play', top: 1330 } },
  drawBack: drawStage,
  cuts: [T.tie - 0.04, { t: T.cut, kind: 'flip' }],
  cues: [
    ...Array.from({ length: 10 }, (_, i) => ['tick', +(0.1 + i * 0.13).toFixed(2), 0.012]),
    ...Array.from({ length: 12 }, (_, i) => ['tick', +(T.item3 + i * 0.11).toFixed(2), 0.012]),
    ['pluck', T.doodle, 1174.66, 0.03, 0.4, -0.3], ['pop', T.rock, 739.99, 0.045, 0.3], ['glitter', T.rock + 0.1, T.rock + 0.5],
    ['whoosh', T.passers[0], 0.9, 0.025],
    ['whoosh', T.mate - 0.15, 0.35, 0.035], ['pop', T.mate + 0.2, 587.33, 0.05, -0.4], ['pop', T.gasp, 880, 0.04, -0.2], ['pop', T.gasp + 0.06, 880, 0.04, 0.2],
    ['bell', T.gasp + 0.05, 1318.51, 0.03, 1.4, 0], ['pluck', T.hearts, 1174.66, 0.045, 0.6, 0], ['glitter', T.hearts, T.hearts + 0.6],
    ['pop', T.clink + 0.15, 1567.98, 0.05, 0], ['tick', T.clink + 0.15, 0.06], ['glitter', T.clink + 0.15, T.clink + 0.5],
    ['whoosh', T.out[0], 0.35, 0.03],
  ],
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
