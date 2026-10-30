// guidelibra1 (20 s vertical Align ad, Star Talk "Your Star Guide", ♎ note 1 / 3: the blind spot) · story 0–15.6, then the end card.
//   0.00  "Libra, your star has a note."  The ♎ guide, lantern lit, beams under a giant pixel scale that's tipped hard:
//         THEIR PICK sits heavy in one pan, YOUR PICK is empty. Libra's bubble: "whatever you want!"
//   2.8   ♎ YOUR STAR: "you say 'whatever you want.' you mean it?"  The scale creaks lower; the chip: cardinal air, Venus.
//   6.8   "share your opinion. balance needs two."  Libra pulls out its own weight and lobs it into the empty pan.
//   9.4   CLONK: the scale swings level. Sparkles.
//  10.7   card flip · "Your *opinion* is welcome."  Under the level scale Libra finally picks: "honestly? tacos."
// One canvas (sky + scale + guide), DOM type above it. Pure f(t).
import { lerp, prog, ease } from '../../../src/lib.js'
import { signStar } from '../../startalk.js'
import { guideFilm, GOLD, BONE, INK, MONO, GLYPH } from './guidefilm.js'

const LIB = signStar('libra'), COL = LIB.color, ACC = '#f59be9'
const T = {
  hookOut: [2.5, 2.8], bubOut: [2.45, 2.75], open: 2.8, l1: 3.0, creak: 5.3, fact: 4.4,
  l2: 6.8, grab: 8.5, throw: [8.95, 9.4], land: 9.4, close: 10.55,
  cut: 10.68, last: 10.75, lastLand: 11.2, pick: 12.7, heart: 13.6, out: [15.15, 15.5],
}
const LINES = [
  { t: T.l1, text: "you say 'whatever you want.' you *mean* it?" },
  { t: T.l2, text: 'share your opinion. balance needs *two.*' },
]

// ── the scale
const PIV = { x: 540, y: 640 }, ARM = 330, DROP = 180
function tilt(t) {
  if (t < T.land) {
    const base = t < T.creak ? -0.3 : lerp(-0.3, -0.38, ease.outBack(prog(t, T.creak, T.creak + 0.4)))
    return base + Math.sin(t * 2.2) * 0.015
  }
  const d = t - T.land
  return -0.38 * Math.exp(-d * 3.4) * Math.cos(d * 9)
}
const KB = ['...KKKK...', '..K....K..', '..K....K..', '.MMMMMMMM.', 'MMHMMMMMMM', 'MHMMMMMMMM', 'MMMMMMMMMM', 'MMMMMMMMMM', '.MMMMMMMM.', '..MMMMMM..']
const KB_THEIRS = { K: '#8c86a8', M: '#c9a24a', H: '#ffe9a8' }
const KB_YOURS = { K: '#8c86a8', M: COL, H: '#ffd0f6' }

function pan(x, cx, cy, K, t, label, labelCol) {
  // strings
  x.strokeStyle = 'rgba(239,230,214,0.7)'; x.lineWidth = 4
  x.beginPath(); x.moveTo(cx, cy - DROP); x.lineTo(cx - 92, cy); x.moveTo(cx, cy - DROP); x.lineTo(cx + 92, cy); x.stroke()
  // the dish
  x.fillStyle = INK; x.fillRect(cx - 110, cy - 6, 220, 30)
  x.fillStyle = '#d6b25a'; x.fillRect(cx - 104, cy, 208, 18)
  x.fillStyle = '#9c7a2e'; x.fillRect(cx - 84, cy + 18, 168, 10)
  x.fillStyle = '#ffe9a8'; x.fillRect(cx - 96, cy + 2, 60, 5)
  // label under it
  x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'top'
  x.fillStyle = 'rgba(6,4,18,0.75)'; const w = x.measureText(label).width + 24; x.fillRect(cx - w / 2, cy + 44, w, 38)
  x.fillStyle = labelCol; x.fillText(label, cx, cy + 50)
}

function drawScale(x, t, K) {
  const a = tilt(t)
  // post + base
  x.fillStyle = INK; x.fillRect(PIV.x - 18, PIV.y - 10, 36, 640)
  x.fillStyle = '#c9a24a'; x.fillRect(PIV.x - 12, PIV.y - 4, 24, 630)
  x.fillStyle = '#ffe9a8'; x.fillRect(PIV.x - 8, PIV.y, 6, 620)
  x.fillStyle = INK; x.fillRect(PIV.x - 150, 1262, 300, 40)
  x.fillStyle = '#c9a24a'; x.fillRect(PIV.x - 144, 1268, 288, 28)
  // beam
  x.save(); x.translate(PIV.x, PIV.y); x.rotate(a)
  x.fillStyle = INK; x.fillRect(-ARM - 14, -16, 2 * ARM + 28, 32)
  x.fillStyle = '#d6b25a'; x.fillRect(-ARM - 8, -10, 2 * ARM + 16, 20)
  x.fillStyle = '#ffe9a8'; x.fillRect(-ARM, -8, 2 * ARM, 5)
  x.restore()
  // the ornament on top: a little ♎ coin
  x.fillStyle = INK; x.fillRect(PIV.x - 30, PIV.y - 58, 60, 60)
  x.fillStyle = '#d6b25a'; x.fillRect(PIV.x - 24, PIV.y - 52, 48, 48)
  x.fillStyle = INK; x.font = `700 40px ${GLYPH}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('♎\uFE0E', PIV.x, PIV.y - 26)
  const ends = [-1, 1].map(s => ({ x: PIV.x + s * ARM * Math.cos(a), y: PIV.y + s * ARM * Math.sin(a) }))
  const L = { x: ends[0].x, y: ends[0].y + DROP }, R = { x: ends[1].x, y: ends[1].y + DROP }
  pan(x, L.x, L.y, K, t, 'THEIR PICK', GOLD)
  const landed = t >= T.land
  pan(x, R.x, R.y, K, t, landed ? 'YOUR PICK ✓' : 'YOUR PICK: —', landed ? ACC : 'rgba(239,230,214,0.6)')
  K.drawBits(KB, KB_THEIRS, L.x, L.y - 52, 9)
  // the weight in flight → in the pan
  if (t >= T.grab) {
    let wx, wy, sc = 9, rot = 0
    if (t < T.throw[0]) { const p = K.pop01(t, T.grab, 0.35, 2.2); wx = 540; wy = 820 - 40 * p; sc = 9 * p }
    else if (t < T.land) { const p = prog(t, ...T.throw); wx = lerp(540, R.x, p); wy = lerp(780, R.y - 52, p) - Math.sin(Math.PI * p) * 220; rot = p * 6.28 }
    else { wx = R.x; wy = R.y - 52 }
    K.drawBits(KB, KB_YOURS, wx, wy, sc, { rot })
  }
  K.burst(R.x, R.y - 160, 100, t, T.land, { word: 'CLONK', size: 44, color: '#ffd34d' })
  K.sparkles(t, PIV.x, PIV.y + 60, T.land + 0.1, 12, 330, 0.3, [GOLD, BONE, COL])
  // the creak (it sinks lower while you think about it)
  K.burst(L.x + 30, L.y - 170, 86, t, T.creak, { word: 'creak', size: 36, color: '#c9b8f0', life: 0.9 })
}

function libraMood(t) {
  if (t < T.bubOut[0]) return { mood: 'happy', look: [0, 0] }
  if (t < T.l2) return t < T.creak + 0.6 && t > T.creak ? { mood: 'wide', look: [-1, -0.5] } : { mood: 'neutral', look: [-0.6, -0.4] }
  if (t < T.grab) return { mood: 'squint', look: [0, 0] }
  if (t < T.land + 0.5) return { mood: 'wide', look: [1, -0.6] }
  if (t < T.pick) return { mood: 'sparkle', look: [0, 0] }
  return { mood: 'happy' }
}

const F = guideFilm({
  duration: 20, speaker: '♎ YOUR STAR', color: COL, accent: ACC, glyph: LIB.glyph,
  chip: { sign: 'LIBRA', glyph: '♎', n: 1, of: 3 },
  hook: { text: '*Libra*, your star has a note.', out: T.hookOut },
  lines: LINES, open: T.open, close: T.close,
  fact: { text: 'LIBRA: CARDINAL AIR, RULED BY VENUS', at: T.fact, dur: T.close - T.fact - 0.1, x: 540, y: 1360 },
  heads: [{ text: 'Your *opinion* | is welcome.', at: T.last, out: T.out, top: 168, size: 112, accentSize: 160, accentColor: ACC, late: 2, lateAt: T.lastLand }],
  guide(t) {
    const throwK = t > T.throw[0] && t < T.throw[0] + 0.3 ? 0.12 * Math.sin(Math.PI * prog(t, T.throw[0], T.throw[0] + 0.3)) : 0
    const shrug = t < T.bubOut[1] ? 0.05 * Math.abs(Math.sin(t * 4)) : 0
    return { x: 540, y: 1050, size: 300, ...libraMood(t), squash: throwK + shrug, pop: K_out(t) }
  },
  drawBack(x, t, K) { x.save(); x.globalAlpha = K_out(t); drawScale(x, t, K); x.restore() },
  drawFront(x, t, K) {
    // frame 0: the people-pleaser bubble; the end: an actual opinion
    const k0 = 1 - ease.inCubic(prog(t, ...T.bubOut))
    if (k0 > 0.01) K.bubble(540, 836, 'whatever you want!', { size: 46, k: k0 * (1 + 0.03 * Math.sin(t * 6)) })
    const k1 = K.pop01(t, T.pick, 0.34, 2.4) * (1 - ease.inCubic(prog(t, ...T.out)))
    if (k1 > 0.01) K.bubble(540, 836, 'honestly? tacos.', { size: 50, k: k1, color: '#8a2a7e' })
    K.sparkles(t, 540, 836, T.pick + 0.05, 8, 220, 0.6, [GOLD, ACC, BONE])
    // a heart floats up off the level beam
    if (t > T.heart && t < T.out[1]) {
      const p = prog(t, T.heart, T.heart + 1.4)
      x.save(); x.globalAlpha = Math.sin(Math.PI * Math.min(1, p)) ; x.fillStyle = ACC
      const hx = 540, hy = 560 - p * 60, c = 8
      for (const [i, j] of [[1, 0], [2, 0], [4, 0], [5, 0], [0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2], [1, 3], [2, 3], [3, 3], [4, 3], [5, 3], [2, 4], [3, 4], [4, 4], [3, 5]]) x.fillRect(hx + (i - 3.5) * c, hy + j * c, c, c)
      x.restore()
    }
  },
  cues: [
    ['pop', 0.3, 1174.66, 0.03, 0], ['tick', 0.9, 0.025], ['tick', 1.5, 0.025],
    ['whoosh', T.bubOut[0], 0.3, 0.025], ['tick', T.creak, 0.05], ['boom', T.creak + 0.05, 0.08],
    ['pop', T.grab, 1318.51, 0.04, 0], ['whoosh', T.throw[0], 0.45, 0.04],
    ['boom', T.land, 0.2], ['tick', T.land, 0.07], ['glitter', T.land + 0.1, T.land + 0.6], ['pluck', T.land + 0.25, 1567.98, 0.04, 0.8, 0],
    ['pop', T.pick, 987.77, 0.045, 0], ['pluck', T.heart, 1318.51, 0.035, 0.8, 0], ['whoosh', T.out[0], 0.35, 0.03],
  ],
  cuts: [{ t: T.cut, kind: 'flip' }],
})
function K_out(t) { const p = prog(t, ...T.out); return p <= 0 ? 1 : 1 - ease.inCubic(p) }

export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
