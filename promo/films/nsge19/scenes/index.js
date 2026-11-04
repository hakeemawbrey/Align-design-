// nsge19 · Remix: Snow Globe Cities · "Vienna: the grand entrance" (30 s vertical, music: cinematic · D) · story 0–25.6,
// then the shared end card. Look: ../nsge15/globekit.js. Rows: promo/films/next30/b17.md.
//   0.00–5.2   "Vienna, in a | snow *globe.*"  The tall cathedral spire with its zig-zag tiled roof, a palace front, and a
//              grand staircase in the snow with a spotlight. ♌ Leo, crowned, mid-twirl at the top: "one waltz and they'll
//              fall for me." Entrance one: perfect.
//   5.4–9.3    "Entrance two: | *bigger.*"  "and now… with sparkles." Sparkles everywhere.
//   9.4–13.0   "Entrance three: | *oops.*"  Leo trips on the last step and tumbles: "…I meant to do that."
//  13.4        card cut.
//  13.55–20.8 "No spotlight. | *Just sway.*"  ♒ Aquarius claps (kindly): "that was great. wanna just sway?" THE STARS: "the
//              right one likes you off the stage." The spotlight clicks off; they sway in the snow.
//  21.0–25.5   "Find someone who claps | for the *real* you."  Tonight's deck deals a card. Pisces fountains.
import { globeFilm, G, GOLD, BONE, INK, PINK, ICE, pop01, outK, popOut, inR, walk, drawBits, heart, sparkles, chip, drawCard } from '../../nsge15/globekit.js'
import { clamp, lerp, prog, ease } from '../../../src/lib.js'

const T = {
  h0Out: [5.0, 5.2], e1: [0.4, 2.2], up1: [3.4, 4.6],
  h1: 5.4, h1Out: [9.1, 9.3], e2: [6.4, 8.2], up2: [8.3, 9.2],
  h1b: 9.4, h1bOut: [12.85, 13.05], e3: [9.6, 10.3], trip: 10.3, tumble: [10.3, 11.0], cut: 13.4,
  h2: 13.55, h2Out: [20.7, 20.9], aqIn: [13.7, 14.7], claps: [14.8, 15.05, 15.3], leoTo: [16.8, 17.6], off: 18.0, sway: 19.4,
  h3: 21.0, deal: [21.6, 22.1], out: [25.1, 25.45],
}
const GY = G.ground - 62
// the staircase: 5 steps from the landing (top-left) down to the snow
const ST = Array.from({ length: 5 }, (_, i) => ({ x: 240 + i * 52, y: 1000 + i * 38 }))
function stairPos(k) { const f = clamp(k) * 5; const i = Math.min(4, Math.floor(f)); const a = i === 0 ? { x: 220, y: 962 } : ST[i - 1], b = ST[i]; const u = f - i; return [lerp(a.x, b.x + 26, u), lerp(a.y, b.y, u) - 62 - 18 * Math.sin(Math.PI * u)] }
function leoPos(t) {
  if (t < T.e1[0]) return [220, 962 - 62]
  const segs = [[T.e1, 'down'], [T.up1, 'up'], [T.e2, 'down'], [T.up2, 'up'], [T.e3, 'down']]
  let p = [220, 900]
  for (const [[a, b], d] of segs) { if (t < a) break; const k = prog(t, a, b); p = d === 'down' ? stairPos(k * 0.999) : stairPos(1 - k); if (d === 'down' && k >= 1) p = [ST[4].x + 26, ST[4].y - 62] }
  if (t >= T.e3[1] && t < T.e3[1] + 0.01) return p
  if (t >= T.trip) {
    const k = ease.outCubic(prog(t, ...T.tumble))
    p = [lerp(ST[3].x + 26, 470, k), lerp(ST[3].y - 62, GY, k) - 60 * Math.sin(Math.PI * k)]
    if (t > T.leoTo[0]) p = [walk(t, [[T.leoTo[0], 470, 0], [T.leoTo[1], 440, 0]])[0], GY]
    if (t > T.sway) p = [p[0] + 26 * Math.sin((t - T.sway) * 3), GY]
  }
  return p
}
const AQ_X = t => { const b = walk(t, [[T.aqIn[0], 1100, 0], [T.aqIn[1], 700, 0], [T.leoTo[0], 700, 0], [T.leoTo[1], 630, 0]])[0]; return t > T.sway ? b + 26 * Math.sin((t - T.sway) * 3) : b }

function skyline(x, t) {
  // the cathedral: a steep zig-zag roof and a tall spire
  x.fillStyle = INK; x.fillRect(560, 900, 300, 200)
  x.fillStyle = '#b9a98f'; x.fillRect(564, 904, 292, 196)
  x.fillStyle = INK; x.beginPath(); x.moveTo(556, 904); x.lineTo(710, 800); x.lineTo(864, 904); x.fill()
  x.fillStyle = '#3f8a6a'; x.beginPath(); x.moveTo(566, 900); x.lineTo(710, 806); x.lineTo(854, 900); x.fill()
  x.fillStyle = '#f2c75c'; for (let r = 0; r < 4; r++) for (let c = 0; c < 8 - r * 2; c++) { const zx = 600 + r * 36 + c * 32, zy = 890 - r * 22; x.beginPath(); x.moveTo(zx, zy); x.lineTo(zx + 16, zy - 12); x.lineTo(zx + 32, zy); x.lineTo(zx + 16, zy - 6); x.fill() }
  x.fillStyle = INK; x.fillRect(796, 700, 60, 210); x.fillStyle = '#a89a82'; x.fillRect(800, 704, 52, 206)
  x.fillStyle = INK; x.beginPath(); x.moveTo(790, 706); x.lineTo(826, 560); x.lineTo(862, 706); x.fill(); x.fillStyle = '#a89a82'; x.beginPath(); x.moveTo(798, 704); x.lineTo(826, 572); x.lineTo(854, 704); x.fill()
  x.fillStyle = '#e9f2ff'; x.fillRect(820, 600, 12, 6)
  x.fillStyle = '#ffd98a'; for (let i = 0; i < 4; i++) { x.fillRect(590 + i * 50, 960, 18, 36) } x.fillRect(816, 760, 20, 30)
  // the palace front on the left, behind the stairs
  x.fillStyle = INK; x.fillRect(150, 880, 380, 220); x.fillStyle = '#f0dca0'; x.fillRect(154, 884, 372, 216)
  x.fillStyle = '#e9f2ff'; x.fillRect(150, 872, 380, 12)
  for (let c = 0; c < 7; c++) { x.fillStyle = '#d8c27f'; x.fillRect(166 + c * 52, 884, 8, 216); x.fillStyle = (c + Math.floor(t)) % 4 ? '#ffe08a' : '#7a6440'; x.fillRect(182 + c * 52, 910, 22, 36); x.fillRect(182 + c * 52, 980, 22, 36) }
}
function stairs(x, t) {
  x.fillStyle = INK; x.fillRect(170, 962, 90, 230)
  x.fillStyle = '#d9cfc0'; x.fillRect(174, 966, 82, 226)
  ST.forEach(s => { x.fillStyle = INK; x.fillRect(s.x - 4, s.y - 4, 60, 240); x.fillStyle = '#d9cfc0'; x.fillRect(s.x, s.y, 52, 236); x.fillStyle = '#b81f3a'; x.fillRect(s.x, s.y, 52, 18); x.fillRect(s.x + 10, s.y, 32, 60); x.fillStyle = '#f4f8ff'; x.fillRect(s.x + 30, s.y - 6, 22, 6) })
  x.fillStyle = '#b81f3a'; x.fillRect(174, 962, 82, 10)
}
function spotlight(x, t) {
  const on = t < T.off ? 1 : 1 - prog(t, T.off, T.off + 0.15)
  if (on <= 0) return
  const [lx, ly] = leoPos(t)
  x.save(); x.globalCompositeOperation = 'lighter'; x.globalAlpha = 0.28 * on
  const g = x.createLinearGradient(0, 590, 0, ly + 80); g.addColorStop(0, 'rgba(255,240,200,0.1)'); g.addColorStop(1, 'rgba(255,240,200,0.9)')
  x.fillStyle = g; x.beginPath(); x.moveTo(lx - 30, 590); x.lineTo(lx + 30, 590); x.lineTo(lx + 140, ly + 90); x.lineTo(lx - 140, ly + 90); x.fill()
  x.restore()
}
const CROWN = ['G.G.G', 'GGGGG', 'GRGRG', 'GGGGG']

export const { DURATION, SCENES, CUES, MUSIC } = globeFilm({
  id: 'nsge19', plate: 'Vienna', lead: 'leo', partner: 'aquarius',
  sky: { top: '#0a0b2c', bot: '#2c2450', glow: '#ffd98a' },
  shakes: [-0.25],
  skyline(x, t) { skyline(x, t); stairs(x, t) },
  back(x, t) { spotlight(x, t) },
  cast(t, K) {
    const [lx, ly] = leoPos(t)
    let lm = 'sparkle', ll = [1, 0.3]
    if (inR(t, T.up1[0], T.up1[1]) || inR(t, T.up2[0], T.up2[1])) lm = 'happy'
    if (t > T.trip - 0.05) lm = 'wide'
    if (t > T.tumble[1] + 0.3) { lm = 'eyeroll'; ll = undefined }
    if (t > 11.4) { lm = 'squint'; ll = [1, -1] }
    if (t > T.claps[0]) { lm = 'wide'; ll = [1, 0] }
    if (t > 16.2) lm = 'happy'
    if (t > T.sway) lm = 'heart'
    const spin = inR(t, T.tumble[0], T.tumble[1]) ? 0.3 : 0
    const aqOn = t > T.aqIn[0]
    return [
      aqOn ? { sign: 'aquarius', x: AQ_X(t), y: GY, s: 180, mood: t < T.sway ? 'happy' : 'sparkle', look: [-1, 0], hops: [...T.claps, T.aqIn[1], T.sway + 0.1, 22.6, ...K.HOPS.partner], seed: 3, hat: '#3fb8ff' } : null,
      { sign: 'leo', x: lx, y: ly, s: 176, mood: lm, look: ll, squash: spin * Math.sin(t * 30), hops: [0.0, T.e1[1], T.e2[1], 7.0, 7.6, T.tumble[1], T.sway + 0.05, 22.5, ...K.HOPS.lead], seed: 11 },
    ]
  },
  front(x, t) {
    // Leo's crown (falls off in the tumble, back on at the end)
    const [lx, ly] = leoPos(t)
    if (t < T.trip) drawBits(x, CROWN, { G: GOLD, R: '#e8284a' }, lx, ly - 92, 7)
    else if (t < 19.0) { const k = ease.outCubic(prog(t, T.trip, T.trip + 0.9)); drawBits(x, CROWN, { G: GOLD, R: '#e8284a' }, lerp(lx, 300, k), lerp(ly - 92, G.ground - 10, k) - 120 * Math.sin(Math.PI * k), 7, { rot: k * 3.6 }) }
    else drawBits(x, CROWN, { G: GOLD, R: '#e8284a' }, lx, ly - 92, 7 * pop01(t, 19.0, 0.3, 2.4))
    if (t > T.sway && t < T.out[1]) for (let i = 0; i < 3; i++) { const tt = t - T.sway - i * 0.4; if (tt > 0 && tt < 2.4) heart(x, 535 + 26 * Math.sin(tt * 3 + i), GY - 150 - tt * 70, 6, i % 2 ? '#ff4f86' : '#ff8fb1', { alpha: 1 - tt / 2.4 }) }
    // sparkles on entrance two
    if (inR(t, T.e2[0], T.e2[1] + 0.6)) for (let i = 0; i < 4; i++) sparkles(x, t, leoPos(T.e2[0] + i * 0.45)[0], leoPos(T.e2[0] + i * 0.45)[1], T.e2[0] + i * 0.45, 8, 90, i, [GOLD, BONE, PINK])
  },
  stars(t) {
    const k = pop01(t, 9.0, 0.4, 2.1) * popOut(t, T.out)
    return { x: 925, y: 650, s: 125, mood: t < T.trip ? 'neutral' : t < T.cut ? 'wide' : t > T.sway ? 'sparkle' : 'happy', look: [-1, 0.7], pop: k }
  },
  pisces(t) {
    return { x: 126, y: 1200, s: 150, mood: inR(t, T.trip, T.trip + 1.2) ? 'wide' : t > T.sway ? 'happy' : 'sparkle', look: [1, -0.3], tears: t < T.e2[0] ? 1 : t < T.sway ? 2 : 3, hops: [T.trip + 0.1, T.sway + 0.2] }
  },
  over(x, t, K) {
    T.claps.forEach((c, i) => chip(x, 790 + i * 30, 900 - i * 50, 'clap', pop01(t, c, 0.2, 2.6) * outK(t, [16.0, 16.2]), { size: 26, col: ICE, bar: ICE, rot: (i - 1) * 0.12 }))
    chip(x, 500, 860, 'CLICK', pop01(t, T.off, 0.2, 2.6) * outK(t, [T.off + 0.9, T.off + 1.1]), { size: 26 })
    if (t > T.deal[0]) {
      const k = ease.outBack(prog(t, ...T.deal)), o = popOut(t, T.out)
      drawCard(x, K.img.back, lerp(1250, 560, k), lerp(700, 870, k) + 6 * Math.sin(t * 2), 160 * o, lerp(1.2, -0.05, k))
    }
    sparkles(x, t, 560, 870, T.deal[1], 12, 140, 2, [GOLD, PINK, BONE])
  },
  heads: [
    { text: 'Vienna, in a | snow *globe.*', at: -1, lateAt: -0.6, out: T.h0Out, accentColor: GOLD },
    { text: 'Entrance two: | *bigger.*', at: T.h1, lateAt: T.h1 + 0.35, out: T.h1Out, accentColor: '#ff9a3a' },
    { text: 'Entrance three: | *oops.*', at: T.h1b, lateAt: T.trip, out: T.h1bOut, accentColor: '#ff6a6a' },
    { text: 'No spotlight. | *Just sway.*', at: T.h2, lateAt: T.h2 + 0.4, out: T.h2Out, late: 2, accentColor: ICE },
    { text: 'Find someone who | claps for the | *real* you.', at: T.h3, lateAt: T.h3 + 0.55, out: T.out, size: 88, accentSize: 132, accentColor: PINK },
  ],
  boxes: [
    { open: 0.8, close: 12.8, lines: [
      { t: 1.0, who: 'lead', text: "one waltz and they'll *fall for me.*" },
      { t: 6.0, who: 'lead', text: 'and now… *with sparkles.*' },
      { t: 11.1, who: 'lead', text: '…I meant to *do that.*' },
    ] },
    { open: 15.4, close: 22.3, lines: [
      { t: 15.6, who: 'partner', text: 'that was great. wanna just *sway?*' },
      { t: 18.3, who: 'stars', text: 'the right one likes you *off* the stage.' },
    ] },
  ],
  cuts: [T.h1Out[1], { t: T.cut, kind: 'flip' }, T.h2Out[1]],
  music: { style: 'cinematic', key: 'D', seed: 1919, drop: T.h1, breakdown: [T.cut], lift: [T.sway], hits: [T.trip, T.h3] },
  cues: [
    ...[0, 1, 2, 3, 4].map(i => ['pluck', +(T.e1[0] + i * 0.36).toFixed(2), [587.33, 659.25, 739.99, 880, 987.77][i], 0.035, 0.4, -0.2]),
    ...[0, 1, 2, 3, 4].map(i => ['pluck', +(T.e2[0] + i * 0.36).toFixed(2), [880, 987.77, 1174.66, 1318.51, 1567.98][i], 0.035, 0.4, 0.2]), ['glitter', T.e2[0], T.e2[1]],
    ['tick', T.trip, 0.06], ['tom', T.tumble[1], 90, { gain: 0.25, decay: 0.3 }], ['pop', T.tumble[1] + 0.1, 440, 0.04, 0],
    ...T.claps.map(c => ['tick', c, 0.05]), ['whoosh', T.aqIn[0], 0.5, 0.03],
    ['tick', T.off, 0.07], ['bell', T.sway, 1318.51, 0.03, 1.2, 0],
    ['whoosh', T.deal[0], 0.4, 0.04], ['tick', T.deal[1], 0.05], ['glitter', T.deal[1], T.deal[1] + 0.5],
  ],
})
