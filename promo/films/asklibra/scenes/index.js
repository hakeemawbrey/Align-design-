// asklibra (20 s vertical Align ad, Star Talk season 1 extra "Ask the Stars") · story 0–15.6, then the shared end card.
//   0.00       A DM lands (NEW MESSAGE · asked anonymously): "We can never pick *where* to eat." Under it the ♎ star is
//              already mid-wobble, balancing two menus (PIZZA / TACOS) on a pixel scale on its head, eyes darting.
//   1.70       The scale tips (TACOS crashes down), wide eyes, a sweat drop. 2.10 a coin flips up, spins, sparkles at the top,
//              and lands on the raised pan: the scale see-saws the other way (3.15). Still no answer.
//   2.82 drop  ♎ LIBRA STAR: "take turns choosing. write it down."  (the REAL ASTROLOGY chip: cardinal air, ruled by Venus)
//   5.90       "you pick tuesday. they pick friday."  TUE · YOU and FRI · THEM tags pop onto the pans; the scale levels out.
//   8.90       "fair is a schedule, not a feeling."  Level and calm; a heart floats off the beam.
//   11.8       The box shuts, the DM slides away: "Talk cards: | you *both* answer." A card back flips to a real talk card
//              ("Cook at home or try somewhere new?").
//   13.72 cut  "*Take turns.* | Love grows there."  The star front and centre, scale level, both menus kept.
// One canvas (sky + star + props), DOM type above it. Pure f(t).
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { drawPixelStar } from '../../sky.js'
import { drawStarChar, talkHops, signStar } from '../../startalk.js'
import { askFilm, BEAT, GOLD, BONE, PINK, INK, MONO, sparkles } from './ask.js'

const LIB = signStar('libra')
const ACC = '#ff9be8'
const SPEAK = '♎ LIBRA STAR'
const T = {
  tip: 1.7, coin: [2.1, 3.1], coinTop: 2.6, see: 3.15, open: 2.6,
  l1: BEAT(4) + 0.02, l2: 5.9, tags: 6.3, level: 6.7, l3: 8.9, heart: 9.6,
  close: 11.68, dmOut: [11.5, 11.78],
  tie: 11.82, flip: [12.35, 12.75], tieOut: [13.45, 13.68],
  cut: 13.72, last: 13.8, lastLand: 14.2, out: [15.2, 15.45],
}
const LINES = [
  { t: T.l1, text: 'take turns choosing. *write it down.*' },
  { t: T.l2, text: 'you pick *tuesday*. they pick *friday*.' },
  { t: T.l3, text: 'fair is a *schedule*, not a feeling.' },
]
const HOPS = [0.0, ...talkHops(LINES.map(l => ({ ...l, speaker: SPEAK })), SPEAK, { cps: 30 }), T.lastLand, T.lastLand + 0.5]

// ── pixel bits
const PIZZA = ['...Y...', '..YRY..', '..YYY..', '.YRYYY.', '.YYYRY.', 'YRYYYYY', 'ddddddd']
const TACO = ['..ddddd..', '.dGRGRGd.', 'dYYYYYYYd', 'dYYYYYYYd', '.ddddddd.']
const FOOD_C = { Y: '#f7c948', R: '#ff3d6e', d: '#c98a1f', G: '#5fd07a' }
const DROP = ['..X..', '.XWX.', 'XWXXX', 'XXXXX', '.XXX.']
const HEART = ['.H.H.', 'HWHHH', 'HHHHH', '.HHH.', '..H..']

/** the scale's tilt (radians, + = right pan down) */
function tilt(t) {
  if (t < T.tip) return 0.16 * Math.sin(t * 7.5 + 1.1) + 0.04 * Math.sin(t * 13 + 0.5)
  if (t < T.see) { const p = prog(t, T.tip, T.tip + 0.3); return 0.42 * ease.outBack(p) + 0.05 * Math.sin((t - T.tip) * 30) * Math.exp(-(t - T.tip) * 5) }
  if (t < T.level) { const p = prog(t, T.see, T.see + 0.35); return lerp(0.42, -0.36, ease.outBack(p)) + 0.02 * Math.sin(t * 9) }
  const p = prog(t, T.level, T.level + 0.6)
  return lerp(-0.36, 0, ease.outElastic ? ease.outElastic(p) : ease.outBack(p)) + 0.015 * Math.sin(t * 2.2)
}

function libState(t) {
  if (t < T.tip) return { mood: 'neutral', look: [Math.sin(t * 7.5 + 1.1) > 0 ? 1 : -1, -0.4], blink: false }
  if (t < T.coin[0]) return { mood: 'wide', look: [1, 0], blink: false }
  if (t < T.coin[1]) return { mood: 'wide', look: [0, -1], blink: false }
  if (t < T.l1) return { mood: 'squint', look: [-1, 0] }
  if (t < T.level) return { mood: 'happy' }
  if (t < T.l3) return { mood: 'sparkle', look: [0, 0] }
  if (t < T.close) return { mood: 'happy' }
  if (t < T.cut) return { mood: 'sparkle', look: [0, -1] }
  if (t < T.lastLand + 0.4) return { mood: 'happy' }
  return { mood: 'heart' }
}

function menu(x, cx, cy, s, kind, rot) {
  const w = 96 * s, h = 120 * s
  x.save(); x.translate(cx, cy); x.rotate(rot)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6 * s, -h - 6 * s, w + 12 * s, h + 12 * s)
  x.fillStyle = BONE; x.fillRect(-w / 2, -h, w, h)
  x.fillStyle = kind === 'pizza' ? '#ff3d6e' : '#2fae6a'; x.fillRect(-w / 2, -h, w, 26 * s)
  x.fillStyle = BONE; x.font = `700 ${Math.round(17 * s)}px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText(kind === 'pizza' ? 'PIZZA' : 'TACOS', 0, -h + 13 * s)
  x.fillStyle = 'rgba(27,18,54,0.35)'
  for (let i = 0; i < 3; i++) x.fillRect(-w / 2 + 12 * s, -h + (76 + i * 13) * s, w - 24 * s, 5 * s)
  x.restore()
  // the food icon sits in the menu's middle (drawn unrotated, close enough)
  return { x: cx, y: cy - h * 0.62 }
}

function tag(x, cx, cy, text, col, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(-0.06)
  x.font = `700 30px ${MONO}`; const tw = x.measureText(text).width + 34
  x.fillStyle = INK; x.fillRect(-tw / 2 - 6, -28, tw + 12, 56)
  x.fillStyle = col; x.fillRect(-tw / 2, -22, tw, 44)
  x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 2)
  x.restore()
}

function drawStage(x, t, K) {
  const lastK = ease.inOutCubic(prog(t, T.cut - 0.02, T.cut + 0.02))
  const out = K.popOut(t, T.out)
  if (out <= 0) return
  const tieHide = t >= T.tie && t < T.cut ? ease.inOutCubic(prog(t, T.tie - 0.1, T.tie + 0.25)) : 0
  if (tieHide >= 1) return
  const P = { x: 540, y: lerp(1030, 1130, lastK), size: lerp(330, 340, lastK) }
  const st = libState(t)
  const sq = t >= T.tip && t < T.tip + 0.5 ? -0.12 * Math.exp(-(t - T.tip) * 7) * Math.cos((t - T.tip) * 20) : 0
  const opts = { color: LIB.color, glyph: LIB.glyph, ...st, hops: HOPS, squash: sq, seed: 5, glow: 1.15, pop: out * (1 - tieHide) }
  const r = drawStarChar(x, P.x, P.y, P.size, t, opts)
  const tp = K.tipOf(t, r, P.size, opts.pop, opts)
  const k = opts.pop
  // the scale: a fulcrum on the tip, a beam, two strings, two pans, a menu on each
  const th = tilt(t), L = 300 * k, py = tp.y - 30 * k, c = 10 * k
  x.save(); x.globalAlpha = clamp(k)
  x.fillStyle = INK; x.fillRect(tp.x - 3 * c, py - c, 6 * c, 4 * c)
  x.fillStyle = GOLD; x.fillRect(tp.x - 2 * c, py, 4 * c, 2.4 * c); x.fillStyle = '#c98a1f'; x.fillRect(tp.x - 2 * c, py + 1.6 * c, 4 * c, 0.8 * c)
  x.save(); x.translate(tp.x, py); x.rotate(th)
  x.fillStyle = INK; x.fillRect(-L - c, -1.6 * c, 2 * L + 2 * c, 3.2 * c)
  x.fillStyle = GOLD; x.fillRect(-L, -0.8 * c, 2 * L, 1.6 * c); x.fillStyle = '#fff1c8'; x.fillRect(-L, -0.8 * c, 2 * L, 0.5 * c)
  x.fillStyle = '#ff9be8'; x.fillRect(-c, -1.6 * c, 2 * c, 3.2 * c)
  x.restore()
  const ends = [-1, 1].map(s => ({ x: tp.x + s * L * Math.cos(th), y: py + s * L * Math.sin(th) }))
  const drop = 150 * k
  const kinds = ['pizza', 'tacos']
  const sw = t < T.tip ? 0.05 * Math.sin(t * 7.5 + 1) : 0.03 * Math.sin(t * 3)
  ends.forEach((e, i) => {
    const px = e.x + Math.sin(sw) * drop, pyy = e.y + drop
    x.strokeStyle = 'rgba(239,230,214,0.85)'; x.lineWidth = 4 * k
    x.beginPath(); x.moveTo(e.x, e.y); x.lineTo(px - 70 * k, pyy); x.moveTo(e.x, e.y); x.lineTo(px + 70 * k, pyy); x.stroke()
    // the pan
    x.fillStyle = INK; x.fillRect(px - 96 * k, pyy - 6 * k, 192 * k, 30 * k)
    x.fillStyle = GOLD; x.fillRect(px - 88 * k, pyy, 176 * k, 12 * k); x.fillStyle = '#c98a1f'; x.fillRect(px - 76 * k, pyy + 12 * k, 152 * k, 8 * k)
    const m = menu(x, px, pyy - 2 * k, 0.95 * k, kinds[i], -sw * 0.6)
    if (i === 0) K.drawBits(x, PIZZA, FOOD_C, m.x, m.y + 8 * k, 6 * k)
    else K.drawBits(x, TACO, FOOD_C, m.x, m.y + 8 * k, 6 * k)
    const tk = K.pop01(t, T.tags + i * 0.22, 0.3, 2.4) * (t < T.tie ? 1 : 1)
    tag(x, px, pyy + 70 * k, i === 0 ? 'TUE · YOU' : 'FRI · THEM', i === 0 ? '#ffd27a' : '#9fe7ff', t > T.tags ? tk * k : 0)
  })
  x.restore()
  // sweat drop on the tip
  if (t > T.tip && t < T.l1) { const p = prog(t, T.tip + 0.1, T.l1); K.drawBits(x, DROP, { X: '#7fdcff', W: '#ffffff' }, r.x + P.size * 0.36, r.y - P.size * 0.18 + p * 60, 7, { alpha: 1 - p }) }
  // the coin: up, spinning, a sparkle at the top, down onto the raised (left) pan
  if (t >= T.coin[0] && t < T.coin[1] + 0.12) {
    const p = prog(t, ...T.coin)
    const sx = r.x + lerp(20, -L * Math.cos(0.42), p), top = r.y - 450
    const yy = lerp(r.y - 80, top, Math.sin(Math.PI * Math.min(1, p * 1.1)) ) * (p < 0.5 ? 1 : 1)
    const y2 = p < 0.5 ? lerp(r.y - 80, top, ease.outQuad(p * 2)) : lerp(top, py - L * Math.sin(0.42) + 110, ease.inQuad((p - 0.5) * 2))
    void yy
    const spin = Math.cos(t * 26)
    x.save(); x.translate(sx, y2); x.scale(Math.max(0.12, Math.abs(spin)), 1)
    x.fillStyle = INK; x.fillRect(-30, -30, 60, 60)
    x.fillStyle = spin > 0 ? '#f7c948' : '#c98a1f'; x.fillRect(-24, -24, 48, 48)
    x.fillStyle = '#fff1c8'; x.fillRect(-16, -16, 10, 10)
    x.restore()
    if (t > T.coinTop) sparkles(x, t, sx, top, T.coinTop, 8, 70, 1, [GOLD, BONE, ACC])
  }
  // balanced! sparkle, then a heart off the beam
  sparkles(x, t, tp.x, py, T.level + 0.4, 10, 220, 0.3, [GOLD, BONE, ACC])
  if (t > T.heart && t < T.heart + 1.4) { const p = prog(t, T.heart, T.heart + 1.4); K.drawBits(x, HEART, { H: '#ff4f86', W: '#ffd1de' }, tp.x + 20, py - 40 - p * 200, 8, { alpha: Math.sin(Math.PI * p) }) }
  if (t > T.lastLand + 0.3) for (let i = 0; i < 3; i++) { const b = T.lastLand + 0.3 + i * 0.35, p = prog(t, b, b + 1.1); if (p > 0 && p < 1) K.drawBits(x, HEART, { H: '#ff4f86', W: '#ffd1de' }, tp.x + (i - 1) * 120, py - 30 - p * 160, 7, { alpha: Math.sin(Math.PI * p) }) }
  void drawPixelStar
}

const F = askFilm({
  duration: 20, sign: 'libra', speaker: SPEAK, accent: ACC,
  question: 'We can never | pick *where* to eat.', qSize: 92,
  dmOut: T.dmOut,
  lines: LINES, open: T.open, close: T.close,
  note: { t: 1.25, out: [11.5, 11.7], rows: ['♎ LIBRA · CARDINAL AIR', 'RULED BY VENUS'], w: 640 },
  heads: [
    { text: 'Talk cards: | you *both* answer.', at: T.tie + 0.05, out: [T.tieOut[0], T.tieOut[1]], top: 150, size: 100, accentSize: 130, accentColor: GOLD, late: 1, lateAt: T.tie + 0.45 },
    { text: '*Take turns.* | Love grows there.', at: T.last, out: T.out, top: 220, size: 104, accentSize: 156, accentColor: ACC, late: 3, lateAt: T.lastLand, lineHeight: 1.0 },
  ],
  tie: { img: 'card-talk-4.png', back: 'card-back.png', at: T.tie, flip: T.flip, out: T.tieOut, y: 930, h: 760, chip: { t: T.flip[1] + 0.1, text: 'answers stay hidden until you both play', top: 1340 } },
  drawBack: drawStage,
  cuts: [T.tie - 0.04, { t: T.cut, kind: 'flip' }],
  cues: [
    ['tick', 0.4, 0.02], ['tick', 0.82, 0.02], ['tick', 1.24, 0.02],
    ['boom', T.tip + 0.05, 0.12], ['pop', T.tip, 440, 0.04, 0.3], ['whoosh', T.tip - 0.05, 0.3, 0.03],
    ['pluck', T.coin[0], 1567.98, 0.04, 0.5, 0], ['bell', T.coinTop, 2093, 0.03, 1.0, 0], ['glitter', T.coinTop, T.coinTop + 0.4],
    ['tick', T.coin[1] + 0.02, 0.06], ['pop', T.see, 659.25, 0.04, -0.3], ['whoosh', T.see, 0.3, 0.025],
    ['pop', T.tags, 1174.66, 0.035, -0.3], ['pop', T.tags + 0.22, 1318.51, 0.035, 0.3],
    ['bell', T.level + 0.4, 1318.51, 0.03, 1.4, 0], ['glitter', T.level + 0.4, T.level + 0.9],
    ['pluck', T.heart, 1174.66, 0.035, 0.5, 0],
    ['bell', T.lastLand + 0.3, 1760, 0.025, 1.2, 0], ['whoosh', T.out[0], 0.35, 0.03],
  ],
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
