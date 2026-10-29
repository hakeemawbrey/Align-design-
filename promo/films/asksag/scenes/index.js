// asksag (15 s vertical Align ad, Star Talk season 1 extra "Ask the Stars") · story 0–10.6, then the shared end card.
//   0.00       A DM lands: "Is it okay to want *space*?" Below, the ♐ star sits on a tiny pixel bench under a tree, its
//              backpack beside it, leaves drifting down, mid content-sigh. 1.8 a leaf lands on its tip (blink, then a smile).
//   2.82 drop  ♐ SAGITTARIUS STAR: "yes. and say it out loud."  It pops up a sign on a stick: NIGHT IN.
//              The REAL ASTROLOGY chip: mutable fire, ruled by Jupiter.
//   5.00       The DM slides away; a talk card drops in up top ("What does a perfect lazy Sunday look like for you?"),
//              "talk cards make it easy to ask".  5.2 "'i need a night to myself' isn't a breakup."  Dusk falls, a moon.
//   8.30 cut   "Space, | *said kindly,* | is healthy."  The sign flips: SEE YOU / TOMORROW ♥. A little wave.
// One canvas (sky + bench + star + props), DOM type above it. Pure f(t).
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { drawStarChar, talkHops, signStar } from '../../startalk.js'
import { askFilm, BEAT, GOLD, BONE, INK, MONO, PINK, sparkles } from './ask.js'

const SAG = signStar('sagittarius')
const ACC = '#c99bff'
const SPEAK = '♐ SAGITTARIUS STAR'
const T = {
  leaf: 1.8, open: 2.62, l1: BEAT(4) + 0.02, sign: 3.45,
  dmOut: [4.75, 5.0], tie: 5.0, l2: 5.25, dusk: [5.6, 6.6],
  close: 8.25, tieOut: [8.05, 8.26],
  cut: 8.3, last: 8.36, lastLand: 8.76, signFlip: [8.7, 8.95], wave: 9.3, out: [10.12, 10.45],
}
const LINES = [
  { t: T.l1, text: 'yes. and *say it out loud.*' },
  { t: T.l2, text: "'i need a night to myself' *isn't a breakup.*" },
]
const HOPS = [...talkHops(LINES.map(l => ({ ...l, speaker: SPEAK })), SPEAK, { cps: 30 }), T.lastLand, T.wave, T.wave + 0.4]
const LEAF = ['..G', '.GL', 'GL.', 'G..']
const LEAF_C = { G: '#3fa35a', L: '#7fd88a' }
const PACK = ['.OOOO.', 'OOOOOO', 'ObbbbO', 'OOOOOO', 'OyOOyO', 'OOOOOO', 'OOOOOO']
const PACK_C = { O: '#e0823a', b: '#b45a22', y: '#f7c948' }
const MOON = ['..WWW.', '.WW...', 'WW....', 'WW....', 'WW....', '.WW...', '..WWW.']

function sagState(t) {
  if (t < T.leaf) return { mood: 'happy' }
  if (t < T.leaf + 0.5) return { mood: 'wide', look: [0, -1], blink: false }
  if (t < T.l1) return { mood: 'happy' }
  if (t < T.l2) return { mood: 'sparkle', look: [0, 0] }
  if (t < T.cut) return { mood: 'happy' }
  return { mood: 'happy', blush: 1 }
}

function drawSign(x, cx, cy, rows, k, rot, col) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-10, 0, 20, 220); x.fillStyle = '#a0683a'; x.fillRect(-5, 0, 10, 216)
  const w = 300, h = rows.length > 1 ? 150 : 100
  x.fillStyle = INK; x.fillRect(-w / 2 - 8, -h - 8, w + 16, h + 16)
  x.fillStyle = col; x.fillRect(-w / 2, -h, w, h)
  x.fillStyle = 'rgba(255,255,255,0.4)'; x.fillRect(-w / 2, -h, w, 8)
  x.fillStyle = INK; x.font = `700 44px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  rows.forEach((r, i) => x.fillText(r, 0, -h / 2 + (i - (rows.length - 1) / 2) * 54 + 3))
  x.restore()
}

function drawStage(x, t, K) {
  const out = K.popOut(t, T.out)
  if (out <= 0) return
  const dusk = ease.inOutCubic(prog(t, ...T.dusk))
  // dusk tint + a moon (top right, under the DM's spot once it's gone)
  if (dusk > 0) {
    x.save(); x.fillStyle = `rgba(10,6,30,${0.35 * dusk})`; x.fillRect(0, 0, 1080, 1920); x.restore()
    K.drawBits(x, MOON, { W: '#fff3c8' }, 940, 640 - 40 * dusk, 14, { alpha: dusk * out, outline: null })
  }
  const GY = 1205                                             // ground line under the bench
  x.save(); x.globalAlpha = clamp(out)
  // ground: a soft grass strip
  x.fillStyle = 'rgba(40,110,70,0.55)'; x.fillRect(120, GY, 840, 14); x.fillStyle = 'rgba(70,160,90,0.55)'; x.fillRect(140, GY - 6, 800, 6)
  // the tree (left)
  x.fillStyle = INK; x.fillRect(196, 820, 68, GY - 820)
  x.fillStyle = '#7a4a2a'; x.fillRect(206, 830, 48, GY - 830); x.fillStyle = '#9c6236'; x.fillRect(206, 830, 14, GY - 830)
  const sway = Math.sin(t * 1.6) * 6
  const blob = (cx, cy, rx, ry, c) => { x.fillStyle = c; for (let j = -ry; j <= ry; j += 12) { const w = Math.round(rx * Math.sqrt(1 - (j / ry) ** 2) / 12) * 12; x.fillRect(cx - w + sway * (1 - j / ry) * 0.5, cy + j, 2 * w, 12) } }
  blob(230, 760, 190, 150, INK); blob(230, 752, 176, 136, '#2f8a4c'); blob(200, 720, 110, 80, '#46b062'); blob(170, 700, 50, 34, '#7fd88a')
  // the bench
  x.fillStyle = INK; x.fillRect(388, GY - 110, 404, 32); x.fillRect(388, GY - 170, 404, 26); x.fillRect(410, GY - 110, 22, 110); x.fillRect(748, GY - 110, 22, 110)
  x.fillStyle = '#b8783e'; x.fillRect(394, GY - 104, 392, 20); x.fillRect(394, GY - 165, 392, 16)
  x.fillStyle = '#d99a58'; x.fillRect(394, GY - 104, 392, 5)
  x.fillStyle = '#5a5a6a'; x.fillRect(416, GY - 84, 10, 84); x.fillRect(754, GY - 84, 10, 84)
  x.restore()
  // backpack on the bench (left end)
  K.drawBits(x, PACK, PACK_C, 455, GY - 150, 13, { alpha: out })
  // the star, sitting on the right half
  const sigh = t < 1.2 ? -0.08 * Math.sin(Math.PI * clamp(t / 1.2)) : 0
  const opts = { color: SAG.color, glyph: SAG.glyph, ...sagState(t), hops: HOPS, seed: 9, glow: 1.15, pop: out, squash: sigh }
  const r = drawStarChar(x, 620, GY - 230, 300, t, opts)
  const tp = K.tipOf(t, r, 300, out, opts)
  // falling leaves (pure f(t)): a loop of 5, plus THE leaf that lands on the tip at T.leaf
  for (let i = 0; i < 5; i++) {
    const ph = ((t * 0.22 + i * 0.21) % 1 + 1) % 1
    const lx = 120 + i * 190 + Math.sin(ph * 9 + i) * 40, ly = 620 + ph * 620
    K.drawBits(x, LEAF, LEAF_C, lx, ly, 8, { alpha: Math.sin(Math.PI * ph) * 0.9 * out, rot: Math.sin(ph * 7 + i) * 0.6 })
  }
  if (t < T.l1 + 1.0) {
    const p = prog(t, T.leaf - 1.1, T.leaf)
    const lx = lerp(330, tp.x, p) + Math.sin(p * 10) * 30 * (1 - p), ly = lerp(700, tp.y - 14, ease.inQuad(p))
    const fade = 1 - prog(t, T.l1 + 0.6, T.l1 + 1.0)
    K.drawBits(x, LEAF, LEAF_C, lx, ly, 9, { alpha: fade * out, rot: p < 1 ? Math.sin(p * 8) * 0.6 : 0.3 })
  }
  // the sign on a stick: NIGHT IN → SEE YOU / TOMORROW ♥
  const sk = K.pop01(t, T.sign, 0.34, 2.2) * out
  const fp = prog(t, ...T.signFlip), flipK = Math.abs(Math.cos(Math.PI * fp))
  const wave = t > T.wave && t < T.wave + 1 ? Math.sin((t - T.wave) * 14) * 0.12 * (1 - (t - T.wave)) : 0
  drawSign(x, 850, GY - 230, fp < 0.5 ? ['NIGHT IN'] : ['SEE YOU', 'TOMORROW ♥'], sk * Math.max(0.05, flipK), 0.08 + wave + Math.sin(t * 2) * 0.02, fp < 0.5 ? '#ffd27a' : '#ffc1d6')
  if (fp >= 1) sparkles(x, t, 850, GY - 330, T.signFlip[1], 8, 120, 0.4, [PINK, GOLD, BONE])
  if (t > T.sign) sparkles(x, t, 850, GY - 310, T.sign + 0.1, 8, 110, 0.1, [GOLD, ACC, BONE])
}

const F = askFilm({
  duration: 15, sign: 'sagittarius', speaker: SPEAK, accent: ACC,
  question: 'Is it okay to | want *space*?', qSize: 100,
  dmOut: T.dmOut,
  lines: LINES, open: T.open, close: T.close,
  note: { t: 1.2, out: [8.05, 8.25], rows: ['♐ SAGITTARIUS · MUTABLE FIRE', 'RULED BY JUPITER'], w: 740 },
  heads: [
    { text: 'Space, | *said* *kindly,* | is healthy.', at: T.last, out: T.out, top: 170, size: 98, accentSize: 136, accentColor: ACC, late: 2, lateAt: T.lastLand, lineHeight: 1.02 },
  ],
  tie: { img: 'card-talk-3.png', at: T.tie, out: T.tieOut, x: 540, y: 470, h: 500, rot: 0.04, chip: { t: T.tie + 0.4, text: 'talk cards make it easy to ask', top: 745 } },
  drawBack: drawStage,
  cuts: [{ t: T.cut, kind: 'flip' }],
  cues: [
    ['whoosh', 0.3, 0.6, 0.015], ['pluck', T.leaf, 1318.51, 0.035, 0.6, 0], ['tick', T.leaf + 0.02, 0.03],
    ['pop', T.sign, 739.99, 0.04, 0.4], ['pop', T.sign + 0.08, 987.77, 0.03, 0.4], ['glitter', T.sign + 0.1, T.sign + 0.5],
    ['bell', T.dusk[0] + 0.3, 1046.5, 0.025, 1.6, 0.4],
    ['whoosh', T.signFlip[0], 0.3, 0.03], ['pluck', T.signFlip[1], 1567.98, 0.045, 0.6, 0.4], ['glitter', T.signFlip[1], T.signFlip[1] + 0.4],
    ['tick', T.wave, 0.02], ['tick', T.wave + 0.15, 0.02], ['whoosh', T.out[0], 0.35, 0.03],
  ],
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
