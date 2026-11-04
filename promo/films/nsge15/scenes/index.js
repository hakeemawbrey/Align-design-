// nsge15 · Remix: Snow Globe Cities · "Reykjavik: reading the sky" (30 s vertical, music: dreamy · F) · story 0–25.6,
// then the shared end card. Look: ../globekit.js. Rows: promo/films/next30/b17.md.
//   0.00–5.2   "Reykjavik, in a | snow *globe.*"  The globe mid-shake: low coloured houses, the stepped church tower, the
//              mountain across the bay, green aurora ribbons. ♒ Aquarius stares up; ♎ Libra (the crush) across the square.
//              The aurora curls into a heart… then a sock. Pisces at the glass, sniffling.
//   5.4–13.1   "Reading the sky | for *signs.*"  THE STARS: "babe. that's particles from the Sun." (true: the aurora is
//              charged particles from the Sun hitting the upper air). Aquarius builds a snow SIGN DETECTOR: it beeps
//              SIGN! at the aurora, at the lamp post, then at Pisces crying at the glass.
//  13.5        card cut.
//  13.6–20.8   "Skip the | *sky reading.*"  THE STARS: "want to know if they like you? ask." Aquarius walks over: "hi! what's
//              a hill you'd die on?" A talk card floats between them. LIBRA: "socks are a great gift." (callback). Hearts.
//  21.0–25.5   "Don't read the lights. | Just *ask.*"  The aurora goes every colour; Pisces fountains.
import { globeFilm, G, GOLD, BONE, ICE, INK, PINK, TAU, pop01, outK, popOut, bump, inR, walk, drawBits, heart, sparkles, chip, drawCard, rgba } from '../globekit.js'
import { clamp, lerp, prog, ease } from '../../../src/lib.js'

const T = {
  h0Out: [5.05, 5.25], heart: [1.5, 2.6], sock: [3.2, 3.9], starsIn: 5.4,
  h1: 5.45, h1Out: [12.9, 13.1], det: [7.9, 8.5], beeps: [9.75, 10.55, 11.35], cut: 13.5,
  h2: 13.65, h2Out: [20.7, 20.9], walk: [15.0, 16.2], card: [17.5, 18.0], laugh: 20.25,
  h3: 21.0, wild: 21.2, out: [25.1, 25.45],
}
const AQ_X = t => walk(t, [[T.walk[0], 395, 0], [T.walk[1], 575, 0]])[0]
const LI_X = 735, GY = G.ground - 62

// aurora shapes (unit coords), resampled to N points
const N = 64
function resample(pts, closed = true) {
  const P = closed ? [...pts, pts[0]] : pts, seg = []
  let L = 0
  for (let i = 1; i < P.length; i++) { const d = Math.hypot(P[i][0] - P[i - 1][0], P[i][1] - P[i - 1][1]); seg.push(d); L += d }
  const out = []
  for (let k = 0; k < N; k++) {
    let d = (k / (N - 1)) * L, i = 0
    while (i < seg.length - 1 && d > seg[i]) { d -= seg[i]; i++ }
    const f = seg[i] ? d / seg[i] : 0
    out.push([lerp(P[i][0], P[i + 1][0], f), lerp(P[i][1], P[i + 1][1], f)])
  }
  return out
}
const HEART_P = Array.from({ length: N }, (_, k) => { const a = (k / (N - 1)) * TAU; return [16 * Math.sin(a) ** 3 / 16, -(13 * Math.cos(a) - 5 * Math.cos(2 * a) - 2 * Math.cos(3 * a) - Math.cos(4 * a)) / 16] })
const SOCK_P = resample([[-0.55, -1.0], [0.15, -1.0], [0.15, 0.15], [0.95, 0.45], [0.95, 0.95], [-0.25, 0.95], [-0.55, 0.45]])
function auroraPts(t) {
  const hk = ease.inOutCubic(prog(t, T.heart[0], T.heart[1])) * (1 - ease.inOutCubic(prog(t, T.sock[0], T.sock[1])))
  const sk = ease.inOutCubic(prog(t, T.sock[0], T.sock[1])) * (1 - ease.inOutCubic(prog(t, 4.9, 5.8)))
  return Array.from({ length: N }, (_, k) => {
    const u = k / (N - 1)
    const wx = 180 + u * 720, wy = 690 + 46 * Math.sin(u * 7 + t * 0.9) + 22 * Math.sin(u * 13 - t * 1.3)
    const hx = 540 + HEART_P[k][0] * 150, hy = 720 + HEART_P[k][1] * 150
    const sx = 540 + SOCK_P[k][0] * 130, sy = 730 + SOCK_P[k][1] * 130
    return [wx * (1 - hk - sk) + hx * hk + sx * sk, wy * (1 - hk - sk) + hy * hk + sy * sk]
  })
}
function aurora(x, t) {
  const pts = auroraPts(t), wild = prog(t, T.wild, T.wild + 0.8)
  x.save(); x.globalCompositeOperation = 'lighter'
  // curtains under the line (fade when it holds a shape)
  const shapeK = clamp(ease.inOutCubic(prog(t, T.heart[0], T.heart[1])) * (1 - prog(t, 4.9, 5.8)))
  pts.forEach(([px, py], k) => {
    const col = wild > 0 ? `hsl(${(k * 9 + t * 120) % 360},90%,60%)` : k % 7 < 4 ? '#5dffb0' : '#9a7bff'
    const h = (110 + 50 * Math.sin(k * 0.7 + t * 2)) * (1 - shapeK)
    if (h > 4) { const g = x.createLinearGradient(0, py, 0, py + h); g.addColorStop(0, col); g.addColorStop(1, 'rgba(0,0,0,0)'); x.globalAlpha = 0.22; x.fillStyle = g; x.fillRect(px - 6, py, 12, h) }
  })
  x.globalAlpha = 1
  for (const [w, a] of [[26, 0.12], [12, 0.3], [5, 0.85]]) {
    x.lineWidth = w; x.lineJoin = 'round'; x.lineCap = 'round'
    x.strokeStyle = wild > 0 ? `hsla(${(t * 160) % 360},90%,65%,${a})` : `rgba(110,255,190,${a})`
    x.beginPath(); pts.forEach(([px, py], k) => (k ? x.lineTo(px, py) : x.moveTo(px, py))); x.stroke()
  }
  x.restore()
}
// Reykjavik in pixels: the mountain across the bay, low coloured houses, the stepped concrete church tower
function skyline(x, t) {
  x.fillStyle = '#2a3360'; x.beginPath(); x.moveTo(140, 1000); x.lineTo(300, 900); x.lineTo(380, 930); x.lineTo(470, 880); x.lineTo(600, 940); x.lineTo(760, 900); x.lineTo(940, 1000); x.closePath(); x.fill()
  x.fillStyle = '#e9f2ff'; x.beginPath(); x.moveTo(300, 900); x.lineTo(270, 918); x.lineTo(330, 918); x.closePath(); x.fill(); x.beginPath(); x.moveTo(470, 880); x.lineTo(440, 900); x.lineTo(500, 900); x.closePath(); x.fill()
  x.fillStyle = '#1b2348'; x.fillRect(140, 990, 800, 40)
  // the church: stepped wings rising to a tall central tower
  const cx = 610, by = 1120
  x.fillStyle = INK; x.fillRect(cx - 108, by - 120, 216, 124); x.fillRect(cx - 34, by - 300, 68, 304)
  const steps = [[100, 60], [82, 90], [64, 120], [46, 160]]
  x.fillStyle = '#c9ccd8'; for (const [w, h] of steps) x.fillRect(cx - w, by - h, 2 * w, h)
  x.fillStyle = '#e3e6f0'; x.fillRect(cx - 28, by - 290, 56, 290); x.beginPath(); x.moveTo(cx - 28, by - 290); x.lineTo(cx, by - 330); x.lineTo(cx + 28, by - 290); x.fill()
  x.fillStyle = '#ffd98a'; x.fillRect(cx - 8, by - 250, 16, 22); x.fillRect(cx - 8, by - 190, 16, 22)
  // houses with pitched roofs
  const H = [[220, '#d8484a'], [300, '#3f7cf0'], [380, '#f2c75c'], [760, '#5fd38a'], [840, '#c9a6ff']]
  for (const [hx, col] of H) {
    const w = 70, h = 70, y0 = 1150
    x.fillStyle = INK; x.fillRect(hx - w / 2 - 3, y0 - h - 3, w + 6, h + 6)
    x.fillStyle = col; x.fillRect(hx - w / 2, y0 - h, w, h)
    x.fillStyle = '#e9f2ff'; x.beginPath(); x.moveTo(hx - w / 2 - 8, y0 - h); x.lineTo(hx, y0 - h - 36); x.lineTo(hx + w / 2 + 8, y0 - h); x.fill()
    x.fillStyle = (Math.sin(t * 1.3 + hx) > -0.6) ? '#ffe08a' : '#5a4a30'; x.fillRect(hx - 12, y0 - 46, 24, 24)
  }
}
// the snow SIGN DETECTOR: a lumpy snow box with a dish and a red light
function detector(x, t) {
  const k = pop01(t, T.det[0], 0.5, 2) * outK(t, T.h1Out)
  if (k <= 0.01) return
  const px = 265, py = G.ground - 40
  let aim = -0.5
  if (t > T.beeps[0] - 0.3) aim = -0.9
  if (t > T.beeps[1] - 0.3) aim = 0.25
  if (t > T.beeps[2] - 0.3) aim = -2.2
  const lit = T.beeps.some(b => inR(t, b, b + 0.35))
  drawBits(x, ['..SSSSSS..', '.SSSSSSSS.', 'SSSSSSSSSS', 'SSSSRRSSSS', 'SSSSRRSSSS', 'SSSSSSSSSS', 'SSSSSSSSSS'], { S: '#e9f2ff', R: lit ? '#ff4040' : '#7a2030' }, px, py, 11 * k)
  x.save(); x.translate(px, py - 58 * k); x.rotate(aim + 0.06 * Math.sin(t * 6)); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-4, -46, 8, 46)
  drawBits(x, ['GGGGGGG', '.GGGGG.', '..GGG..'], { G: '#cfd6ec' }, 0, -54, 8)
  x.restore()
  if (lit) { x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(px, py, 0, px, py, 90); g.addColorStop(0, 'rgba(255,60,60,0.5)'); g.addColorStop(1, 'rgba(255,60,60,0)'); x.fillStyle = g; x.fillRect(px - 90, py - 90, 180, 180); x.restore() }
}
function lamp(x, t) {
  const px = 860, py = G.ground - 10
  x.fillStyle = INK; x.fillRect(px - 7, py - 230, 14, 230)
  x.fillStyle = '#3b3560'; x.fillRect(px - 4, py - 226, 8, 226)
  drawBits(x, ['.KKKK.', 'KYYYYK', 'KYYYYK', '.KKKK.'], { K: '#3b3560', Y: '#ffe08a' }, px, py - 244, 9)
  x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(px, py - 240, 0, px, py - 240, 120); g.addColorStop(0, 'rgba(255,220,140,0.35)'); g.addColorStop(1, 'rgba(255,220,140,0)'); x.fillStyle = g; x.fillRect(px - 120, py - 360, 240, 240); x.restore()
}

const AQ_HOPS = [0.0, 2.0, 3.95, T.det[1], ...T.beeps.map(b => b + 0.05), T.walk[1], T.laugh, T.wild + 0.1, 22.4]
const LI_HOPS = [2.45, T.card[1] + 0.1, T.laugh + 0.05, T.wild + 0.2, 22.6]

export const { DURATION, SCENES, CUES, MUSIC } = globeFilm({
  id: 'nsge15', plate: 'Reykjavik', lead: 'aquarius', partner: 'libra',
  sky: { top: '#071433', bot: '#1b3a66', glow: '#5dffb0' },
  shakes: [-0.25],
  skyline(x, t) { skyline(x, t); aurora(x, t) },
  back(x, t) { lamp(x, t); detector(x, t) },
  cast(t, K) {
    const aqMood = t < T.heart[1] ? 'wide' : t < T.sock[0] ? 'heart' : t < T.sock[1] + 0.4 ? 'wide' : t < T.starsIn + 1.4 ? 'squint' : t < T.det[1] ? 'happy' : t < T.beeps[2] ? 'sparkle' : t < T.beeps[2] + 0.9 ? 'wide' : t < T.cut ? 'neutral' : t < T.walk[1] ? 'neutral' : t < T.laugh ? 'happy' : 'sparkle'
    const aqLook = t < T.starsIn ? [0.3, -1] : t < T.starsIn + 1.4 ? [1, -1] : t < T.beeps[0] ? [-1, 0] : t < T.beeps[2] ? [-1, -0.6] : t < T.cut ? [-1, 0.3] : [1, 0]
    const liMood = t < T.card[0] ? (t < 4 ? 'happy' : 'neutral') : t < T.laugh ? 'sparkle' : 'happy'
    return [
      { sign: 'libra', x: LI_X, y: GY, s: 178, mood: liMood, look: t < T.walk[0] ? [0, -1] : [-1, 0], hops: [...LI_HOPS, ...K.HOPS.partner], seed: 5, hat: '#c9a6ff' },
      { sign: 'aquarius', x: AQ_X(t), y: GY, s: 186, mood: aqMood, look: aqLook, hops: [...AQ_HOPS, ...K.HOPS.lead], seed: 3, hat: '#3fb8ff' },
    ]
  },
  front(x, t) {
    if (t > T.laugh && t < T.out[1]) for (let i = 0; i < 3; i++) { const tt = t - T.laugh - i * 0.35; if (tt > 0 && tt < 2.6) heart(x, 655 + 30 * Math.sin(tt * 3 + i), GY - 130 - tt * 70, 6, i % 2 ? '#ff4f86' : '#ff8fb1', { alpha: 1 - tt / 2.6 }) }
  },
  stars(t) {
    const k = pop01(t, T.starsIn, 0.4, 2.1) * popOut(t, T.out)
    let mood = 'neutral', look = [-1, 0.6]
    if (t < T.starsIn + 2.5) mood = 'squint'
    if (t > T.beeps[2]) mood = 'eyeroll'
    if (t > T.cut) { mood = 'happy'; look = [-1, 0.8] }
    if (t > T.laugh) mood = 'sparkle'
    return { x: 925, y: 650, s: 125, mood, look, pop: k }
  },
  pisces(t) {
    const tears = t < T.heart[0] ? 1 : t < T.beeps[2] ? 2 : t < T.wild ? 2 : 3
    const mood = t < T.heart[1] ? 'wide' : t < T.sock[1] ? 'heart' : inR(t, T.beeps[2], T.beeps[2] + 1.2) ? 'wide' : t > T.laugh ? 'happy' : 'sparkle'
    return { x: 126, y: 1200, s: 150, mood, look: [1, -0.4], tears, hops: [T.beeps[2] + 0.05, T.wild + 0.15] }
  },
  over(x, t, K) {
    // SIGN! chips from the detector
    const at = [[470, 760, -0.08], [860, 840, 0.06], [190, 1010, -0.1]]
    T.beeps.forEach((b, i) => { const k = pop01(t, b, 0.25, 2.6) * outK(t, [b + 0.9, b + 1.1]); chip(x, at[i][0], at[i][1], i === 2 ? 'SIGN!!!' : 'SIGN!', k, { size: 34, col: '#ff6a6a', bar: '#ff4040', rot: at[i][2] }) })
    // the talk card floats in between them
    if (t > T.card[0]) {
      const k = ease.outBack(prog(t, ...T.card)), o = popOut(t, T.out)
      drawCard(x, K.img.talk1, lerp(660, 655, k), lerp(1350, 905, k) + 8 * Math.sin(t * 2.2), 196 * o, lerp(0.5, 0.05, k) + 0.03 * Math.sin(t * 1.7))
    }
    sparkles(x, t, 655, 905, T.card[1], 10, 150, 1, [GOLD, '#5dffb0', BONE])
    sparkles(x, t, 540, 760, T.wild, 14, 260, 2, ['#5dffb0', '#9a7bff', PINK, GOLD])
  },
  heads: [
    { text: 'Reykjavik, in a | snow *globe.*', at: -1, lateAt: -0.6, out: T.h0Out, accentColor: '#5dffb0' },
    { text: 'Reading the sky | for *signs.*', at: T.h1, lateAt: T.h1 + 0.4, out: T.h1Out, accentColor: '#9a7bff' },
    { text: 'Skip the | *sky reading.*', at: T.h2, lateAt: T.h2 + 0.3, out: T.h2Out, accentColor: GOLD },
    { text: "Don't read the lights. | Just *ask.*", at: T.h3, lateAt: T.h3 + 0.6, out: T.out, size: 88, accentSize: 150, accentColor: PINK },
  ],
  boxes: [
    { open: 0.85, close: 12.85, lines: [
      { t: 1.05, who: 'lead', text: 'is that a *heart?* in the sky??' },
      { t: 3.3, who: 'lead', text: "it's a heart. …no. a *sock.*" },
      { t: 5.75, who: 'stars', text: "babe. that's particles from *the Sun.*" },
      { t: 8.45, who: 'lead', text: 'my sign detector says… *yes?*' },
    ] },
    { open: 13.75, close: 22.4, lines: [
      { t: 13.95, who: 'stars', text: 'want to know if they like you? *ask.*' },
      { t: 16.35, who: 'lead', text: "hi! what's a hill you'd *die on?*" },
      { t: 19.0, who: 'partner', text: 'socks are a *great* gift.' },
    ] },
  ],
  cuts: [T.h1Out[1], { t: T.cut, kind: 'flip' }, T.h2Out[1]],
  music: { style: 'dreamy', key: 'F', seed: 1515, drop: T.h1, breakdown: [T.cut], lift: [16.35], hits: [T.h3] },
  cues: [
    ['bell', T.heart[1] - 0.2, 1318.51, 0.03, 1.2, 0], ['pluck', T.sock[1], 440, 0.04, 0.5, 0.2],
    ['riser', T.det[0], T.det[1], 0.025], ['pop', T.det[1], 880, 0.04, -0.4],
    ...T.beeps.flatMap((b, i) => [['pluck', b, 1760, 0.04, 0.2, -0.3], ['pluck', b + 0.14, 1760, 0.04, 0.2, -0.3 + i * 0.3]]),
    ['pop', T.starsIn, 739.99, 0.035, 0.4], ['whoosh', T.walk[0], 0.4, 0.025],
    ['whoosh', T.card[0], 0.4, 0.04], ['pluck', T.card[1], 1318.51, 0.04, 0.6, 0.2],
    ['pop', T.laugh, 987.77, 0.035, 0.2], ['pop', T.laugh + 0.1, 1174.66, 0.03, -0.2],
    ['glitter', T.wild, T.wild + 0.8], ['bell', T.wild + 0.05, 1760, 0.03, 1.2, 0],
  ],
})
