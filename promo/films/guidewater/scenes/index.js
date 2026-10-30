// guidewater (30 s vertical Align ad, Star Talk "Your Star Guide", element pep talk: the water signs) · story 0–25.6, then
// the shared end card.
//   0.00       "*Water* signs, gather round."  Under a full moon the gold guide floats on a little cloud, lantern lit; Cancer
//              and Pisces scurry in from the sides and Scorpio pops up out of the moonlit pool (splash).
//   2.82 drop  ★ YOUR STAR: "you feel everything. that's your power."  Each sign lets a drop fall: ripples, the pool glows.
//              The ★ ASTROLOGY SAYS chip: the water signs, Cancer, Scorpio, Pisces.
//   7.20       "but you can't hold the whole ocean."  Each grabs a brimming bucket and heaves it overhead; behind them the pool
//              swells into a wave; they wobble, buckets slopping.
//   11.40      "share some. let them help."  Three friend stars pop in and take the buckets; the wave settles back down.
//   15.40      The pool ripples into hearts that float up.
//   18.00 cut  "Feel deep. | *Share* the weight."  All six round the pool; a group hop, the lantern flares, a big heart rises.
// One canvas (sky + moon + pool + stars), DOM type above it. Pure f(t).
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { talkHops, signStar, STAR } from '../../startalk.js'
import { guideFilm, BEAT, GOLD, BONE, INK, PINK, sparkles } from './guide.js'

const SIG = ['cancer', 'scorpio', 'pisces'].map(signStar)
const ACC = '#6fd2ff'
const SPEAK = '★ YOUR STAR'
const T = {
  hookOut: [2.3, 2.6], gather: [0, 1.4], open: 2.6, l1: BEAT(4) + 0.02, drops: [3.7, 4.1, 4.5], fact: 4.9, factDur: 4.1,
  l2: 7.2, buckets: 7.8, wave: [8.0, 9.6], l3: 11.4, help: [12.0, 12.3, 12.6], settle: [12.6, 13.8], pour: [14.0, 15.0], close: 15.2,
  hearts: 15.4, cut: 18.0, last: 18.08, lastLand: 18.6, hop: 19.6, flare: 21.0, big: [22.3, 23.6], wave2: 24.2, out: [25.15, 25.45],
}
const LINES = [
  { t: T.l1, text: "you feel everything. *that's your power.*" },
  { t: T.l2, text: "but you can't hold *the whole ocean.*" },
  { t: T.l3, text: 'share some. *let them help.*' },
]
const HOPS = talkHops(LINES.map(l => ({ ...l, speaker: SPEAK })), SPEAK, { cps: 30 })
const SEATS = [250, 540, 830], SY = 1250
const POOL = { x: 540, y: 1075, rx: 410, ry: 115 }
const HELP = ['#ffa070', '#c9b8f0', '#9fe0a8']
const BUCKET = ['WWWWWWW', 'GBBBBBG', 'GBBBBBG', '.GBBBG.', '.GGGGG.']
const HEART = ['.H.H.', 'HWHHH', 'HHHHH', '.HHH.', '..H..']
const HEARTB = ['.HH.HH.', 'HHWHHHH', 'HWHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...']

const waveH = t => ease.inOutCubic(prog(t, ...T.wave)) * (1 - ease.inOutCubic(prog(t, ...T.settle)))

function cloud(x, cx, cy, vis) {
  x.save(); x.globalAlpha = vis
  const puffs = [[-110, 10, 52], [-55, -14, 66], [10, -24, 74], [80, -8, 62], [130, 14, 46]]
  x.fillStyle = INK; for (const [dx, dy, r] of puffs) { x.beginPath(); x.arc(cx + dx, cy + dy, r + 8, 0, 7); x.fill() }
  x.fillRect(cx - 160, cy + 8, 330, 52)
  x.fillStyle = '#ece6ff'; for (const [dx, dy, r] of puffs) { x.beginPath(); x.arc(cx + dx, cy + dy, r, 0, 7); x.fill() }
  x.fillRect(cx - 152, cy + 10, 314, 42)
  x.fillStyle = '#c9c0ef'; x.fillRect(cx - 152, cy + 36, 314, 16)
  x.restore()
}

function pool(x, t, vis) {
  const glow = prog(t, T.drops[0], T.drops[2] + 0.6)
  x.save(); x.globalAlpha = vis
  x.fillStyle = INK; x.beginPath(); x.ellipse(POOL.x, POOL.y, POOL.rx + 16, POOL.ry + 16, 0, 0, 7); x.fill()
  x.fillStyle = '#8a8fb8'; x.beginPath(); x.ellipse(POOL.x, POOL.y, POOL.rx + 8, POOL.ry + 8, 0, 0, 7); x.fill()
  const g = x.createRadialGradient(POOL.x, POOL.y, 10, POOL.x, POOL.y, POOL.rx)
  g.addColorStop(0, lerpHex('#1f4f8f', '#3fa6e8', glow)); g.addColorStop(1, '#13234f')
  x.fillStyle = g; x.beginPath(); x.ellipse(POOL.x, POOL.y, POOL.rx, POOL.ry, 0, 0, 7); x.fill()
  // the moon's reflection, shimmering
  for (let i = 0; i < 5; i++) { x.fillStyle = `rgba(255,246,214,${0.55 - i * 0.08})`; const w = 90 - i * 12 + Math.sin(t * 4 + i) * 10; x.fillRect(POOL.x + 160 - w / 2, POOL.y - 60 + i * 22, w, 8) }
  x.restore()
  // ripples: drops on line 1, the heart ripples later
  x.save(); x.beginPath(); x.ellipse(POOL.x, POOL.y, POOL.rx, POOL.ry, 0, 0, 7); x.clip()
  T.drops.forEach((d, i) => {
    for (let k = 0; k < 3; k++) { const p = prog(t, d + k * 0.25, d + k * 0.25 + 1.4); if (p <= 0 || p >= 1) continue
      x.strokeStyle = `rgba(200,240,255,${(1 - p) * 0.8 * vis})`; x.lineWidth = 5; x.beginPath(); x.ellipse(SEATS[i], POOL.y + 10, 30 + p * 170, (30 + p * 170) * 0.28, 0, 0, 7); x.stroke() }
  })
  if (t > T.hearts) for (let k = 0; k < 4; k++) { const p = ((t - T.hearts) * 0.5 + k * 0.25) % 1
    x.strokeStyle = `rgba(255,170,200,${(1 - p) * 0.7 * vis})`; x.lineWidth = 6; x.beginPath(); x.ellipse(POOL.x, POOL.y, 40 + p * 380, (40 + p * 380) * 0.28, 0, 0, 7); x.stroke() }
  x.restore()
  // the wave: the pool swells up behind the signs
  const h = waveH(t)
  if (h > 0.01) {
    x.save(); x.globalAlpha = vis
    x.beginPath(); x.moveTo(POOL.x - POOL.rx, POOL.y)
    for (let i = 0; i <= 40; i++) { const u = i / 40, xx = POOL.x - POOL.rx + u * POOL.rx * 2; x.lineTo(xx, POOL.y - h * (260 * Math.sin(Math.PI * u) + 30 * Math.sin(u * 14 + t * 5))) }
    x.lineTo(POOL.x + POOL.rx, POOL.y); x.closePath()
    const wg = x.createLinearGradient(0, POOL.y - 300, 0, POOL.y); wg.addColorStop(0, '#9fe6ff'); wg.addColorStop(1, '#2a6fc0')
    x.fillStyle = wg; x.fill(); x.strokeStyle = INK; x.lineWidth = 8; x.stroke()
    x.fillStyle = '#ffffff'; for (let i = 2; i < 40; i += 5) { const u = i / 40; x.fillRect(POOL.x - POOL.rx + u * POOL.rx * 2 - 8, POOL.y - h * (260 * Math.sin(Math.PI * u) + 30 * Math.sin(u * 14 + t * 5)) + 6, 16, 8) }
    x.restore()
  }
}
function lerpHex(a, b, k) {
  const h = s => [1, 3, 5].map(i => parseInt(s.slice(i, i + 2), 16)), A = h(a), B = h(b)
  return '#' + A.map((v, i) => Math.round(lerp(v, B[i], clamp(k))).toString(16).padStart(2, '0')).join('')
}

function drawStage(x, t, K) {
  const out = K.popOut(t, T.out)
  if (out <= 0) return
  const last = t >= T.cut
  pool(x, t, out)
  // the guide on its cloud, drifting
  const toR = ease.inOutCubic(prog(t, T.cut, T.cut + 0.5))
  const cx = lerp(360, 790, toR) + Math.sin(t * 0.6) * 30, cy = lerp(700, 880, toR) + Math.sin(t * 1.1) * 10
  const flare = last ? 1 + 0.6 * Math.sin(Math.PI * prog(t, T.flare, T.flare + 1)) : 1
  K.guide(t, { x: cx, y: cy - 110, size: 220, color: STAR.sky, glyph: null, mood: t < T.l2 ? 'happy' : t < T.l3 ? 'neutral' : 'happy', look: [0, 1], hops: [...HOPS, T.hop], seed: 2, pop: out, lanternGlow: flare })
  cloud(x, cx, cy, out)
  if (last) sparkles(x, t, cx + 120, cy - 130, T.flare, 10, 120, 0.4, [GOLD, BONE, ACC])
  // the three signs: gather (frame 0 mid-scurry; Scorpio pops up out of the pool), then sit at the rim
  const g = ease.outCubic(prog(t, ...T.gather))
  const hk = waveH(t)
  SIG.forEach((s, i) => {
    const sx = i === 0 ? lerp(90, SEATS[0], g) : i === 2 ? lerp(990, SEATS[2], g) : SEATS[1]
    const sy = i === 1 ? lerp(POOL.y, SY, g) : SY
    const mood = t < T.l2 ? (i === 1 ? 'wink' : 'happy') : t < T.help[i] ? 'wide' : 'happy'
    const hops = [0.3 + i * 0.25, T.drops[i], T.help[i] + 0.2, T.hop, T.wave2 + i * 0.12]
    const r = K.guide(t, { x: sx + (hk > 0.1 && t < T.help[i] ? Math.sin(t * 13 + i) * 10 * hk : 0), y: sy, size: 190, color: s.color, glyph: s.glyph, mood, look: t < T.l1 ? [0, 0] : [0, -1], hops, seed: 20 + i, pop: out, lantern: 0, squash: t > T.buckets && t < T.help[i] ? 0.08 : 0 })
    // the drop on line 1
    const dp = prog(t, T.drops[i] - 0.5, T.drops[i])
    if (dp > 0 && dp < 1) K.drawBits(x, ['.X.', 'XWX', 'XXX'], { X: '#9fe6ff', W: '#ffffff' }, r.x, lerp(r.y + 40, POOL.y + 10, dp), 7)
    // the bucket: heaved overhead, then handed to a friend
    const bk = K.pop01(t, T.buckets + i * 0.12, 0.3, 2) * (1 - prog(t, T.pour[0], T.pour[1]))
    if (t > T.buckets && bk > 0.01) {
      const hp = ease.inOutCubic(prog(t, T.help[i] + 0.15, T.help[i] + 0.6))
      const bx = lerp(r.x, r.x + (i === 2 ? -120 : 120), hp), by = lerp(r.top - 50, r.top - 10, hp) + (t < T.help[i] ? Math.sin(t * 9 + i) * 8 : 0)
      K.drawBits(x, BUCKET, { W: '#cfeeff', B: '#3fa6e8', G: '#8a8fb8' }, bx, by, 13 * bk, { rot: t < T.help[i] ? Math.sin(t * 7 + i) * 0.15 : 0 })
      if (t < T.help[i] && t > T.wave[0]) { const ph = (t * 2 + i * 0.3) % 1; K.drawBits(x, ['X'], { X: '#9fe6ff' }, bx + 40 - ph * 20, by + ph * 100, 8, { alpha: 1 - ph }) }
    }
    // the friend who helps
    const fk = ease.outBack(prog(t, T.help[i], T.help[i] + 0.35))
    if (fk > 0.01) K.guide(t, { x: r.x + (i === 2 ? -120 : 120) * (last ? 0.85 : 1), y: SY + 30, size: 140, color: HELP[i], glyph: null, mood: 'happy', look: [i === 2 ? 1 : -1, 0], hops: [T.help[i] + 0.4, T.hop, T.wave2 + 0.3], seed: 30 + i, pop: out * fk, lantern: 0 })
    sparkles(x, t, r.x + (i === 2 ? -120 : 120), SY - 40, T.help[i], 8, 90, i, [HELP[i], GOLD, BONE])
  })
  // hearts float up out of the pool
  if (t > T.hearts) for (let i = 0; i < 8; i++) {
    const b = T.hearts + i * 0.6, p = prog(t, b, b + 2.2)
    if (p > 0 && p < 1) K.drawBits(x, HEART, { H: '#ff4f86', W: '#ffd1de' }, POOL.x + Math.sin(i * 2.4) * 300, POOL.y - 20 - p * 380, 7, { alpha: Math.sin(Math.PI * p) * out })
  }
  if (last) {
    const bp = ease.outBack(prog(t, ...T.big))
    if (bp > 0) { K.drawBits(x, HEARTB, { H: '#ff4f86', W: '#ffd1de' }, 360, lerp(POOL.y, 840, bp) + Math.sin(t * 2) * 8, lerp(6, 22, bp) * out); sparkles(x, t, 360, 840, T.big[1], 12, 200, 0.2, [PINK, GOLD, ACC]) }
  }
}

const F = guideFilm({
  duration: 30, sign: 'water', speaker: SPEAK, accent: ACC,
  hook: '*Water* signs, | gather round.', hookOut: T.hookOut, chipOut: [T.cut - 0.3, T.cut],
  chipOpts: { label: 'STAR GUIDE · WATER SIGNS · PEP TALK' },
  sky: t => ({ moon: { x: t < T.cut ? 860 : 170, y: t < T.cut ? 560 : 640, r: 62, phase: 0.5, alpha: 1 } }),
  lines: LINES, open: T.open, close: T.close,
  fact: { text: 'THE WATER SIGNS:|CANCER, SCORPIO, PISCES', at: T.fact, dur: T.factDur, x: 540, y: 330 },
  heads: [
    { text: 'Feel deep. | *Share* the weight.', at: T.last, out: T.out, top: 200, size: 112, accentSize: 170, accentColor: ACC },
  ],
  drawBack: drawStage,
  cues: [
    ['whoosh', 0.05, 0.5, 0.03], ['pop', 0.6, 523.25, 0.03, -0.4], ['pop', 0.75, 659.25, 0.03, 0.4], ['whoosh', 0.2, 0.3, 0.025],
    ...T.drops.map((d, i) => ['pluck', d, [1174.66, 1318.51, 1567.98][i], 0.035, 0.8, (i - 1) * 0.5]),
    ...[0, 1, 2].map(i => ['pop', +(T.buckets + i * 0.12).toFixed(2), 392 + i * 50, 0.035, (i - 1) * 0.5]),
    ['riser', T.wave[0], T.wave[1], 0.035], ['whoosh', T.wave[1] - 0.4, 0.8, 0.035],
    ...T.help.map((h, i) => ['pop', h, [880, 987.77, 1174.66][i], 0.04, (i - 1) * 0.5]), ...T.help.map(h => ['glitter', h, h + 0.3]),
    ['whoosh', T.settle[0], 1.0, 0.03], ['whoosh', T.pour[0], 0.6, 0.025],
    ...Array.from({ length: 8 }, (_, i) => ['pluck', +(T.hearts + i * 0.6).toFixed(2), [1174.66, 1318.51, 1567.98, 1318.51][i % 4], 0.022, 0.8, Math.sin(i * 2.4) * 0.5]),
    ['tick', T.hop, 0.04], ['pop', T.hop + 0.05, 1046.5, 0.035, 0], ['bell', T.flare, 1567.98, 0.03, 1.4, -0.3], ['glitter', T.flare, T.flare + 0.6],
    ['riser', T.big[0], T.big[1], 0.025], ['pluck', T.big[1], 1318.51, 0.045, 0.8, 0.3], ['glitter', T.big[1], T.big[1] + 0.6],
    ['tick', T.wave2, 0.03], ['tick', T.wave2 + 0.12, 0.03], ['tick', T.wave2 + 0.24, 0.03],
    ['whoosh', T.out[0], 0.35, 0.03],
  ],
  cuts: [{ t: T.cut, kind: 'flip' }],
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
