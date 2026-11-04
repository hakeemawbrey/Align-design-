// nc14e12: CUFFING SEASON, "Aquarius invents a heated bench" (40 s vertical, Season 14 ep 12, music: dreamy · Ab).
// Story 0–35.6, then the shared end card. The show look lives in ../../nc14e01/scenes/cuffkit.js.
// No snow falls in this one until the last beat: it ends on the first snowflakes, handing over to ep 13.
//   0.0–8.4    "Aquarius invented | a *heated bench.*"  Frame 0: a frosty park at night, Aquarius mid-turn of a wrench on
//              a bench, coils glowing under the seat. A dial goes on (WARMTH ★★★), then a sign: FREE WARMTH · ALL WELCOME.
//              Aquarius: "solving winter. for everyone."
//   8.4–17.0   "Built for *everyone.* | Sat on by *no one.*"  Aquarius sits alone, waving. Leo hurries past ("maybe
//              later!"), then Virgo (on a schedule), then Gemini (on the phone). STILL WARM. Pisces cries behind a tree.
//  17.0        card cut.
//  17.0–26.6   "Then someone | *sat down.*"  Cancer: "ooh. it's warm."  Aquarius: "it has three settings and a backup
//              coil and—"  Cancer: "but why did you build it?"  AQUARIUS: "…so someone would sit *next to me*."
//              THE STARS: "you don't need an *invention* to ask."
//  26.6–35.6   "Warmer | *together.*"  The first snowflakes drift down on the two of them. Pisces runs in: "IS THAT SNOW"
//              (sobs). THE STARS: "You can just *say* you want company."
import {
  makeCuff, R, box, bubble, label, shadow, glow, sparkles, hearts, snowGround, phone,
  pop01, outK, popOut, prog, lerp, clamp, ease, easeOutBack, INK, BONE, GOLD, ICE, PINK, RED, MINT, signStar,
} from '../../nc14e01/scenes/cuffkit.js'

const T = {
  h0Out: [8.2, 8.4], coils: 1.4, dial: 2.9, sign: 4.4, solve: 5.8,
  b2: 8.4, h1: 8.55, h1Out: [16.8, 17.0], walkers: [9.0, 11.0, 13.0], still: 15.0,
  cut: 17.0, h2: 17.15, h2Out: [26.4, 26.6], sit: [17.3, 17.9], warm: 18.2, specs: 19.4, why: 21.2,
  b4: 26.6, h3: 26.75, snow: 27.0, pisRun: [27.9, 28.6], isSnow: 28.6, last: 29.4,
}
const SP = 'THE STARS', AQ = '♒︎ AQUARIUS'
const B2 = [
  { t: 22.6, speaker: AQ, color: '#8fe6ff', text: '…so someone would sit *next to me*.' },
  { t: 24.6, speaker: SP, text: "you don't need an *invention* to ask." },
]
const B3 = [{ t: T.last, speaker: SP, text: 'You can just *say* you want company.' }]
const WALK = [['leo', 'maybe later!'], ['virgo', 'on a schedule!'], ['gemini', 'one sec, on a call!']]

function park(x, t) {
  // frosty park: lamp, trees
  for (let i = 0; i < 4; i++) { const X = 80 + i * 300; R(x, '#3a2a2a', X - 10, 1290, 20, 110); for (let j = 0; j < 3; j++) { const w = 200 - j * 50, y = 1290 - j * 110; x.fillStyle = '#163040'; x.beginPath(); x.moveTo(X - w / 2, y); x.lineTo(X + w / 2, y); x.lineTo(X, y - 150); x.closePath(); x.fill(); R(x, 'rgba(220,240,255,0.55)', X - w / 2 + 14, y - 6, w - 28, 6) } }
  R(x, INK, 930, 880, 22, 520); R(x, '#5a5470', 936, 880, 10, 520); box(x, 900, 840, 82, 54, '#f7d27a', { b: 6 }); glow(x, 941, 880, 280, 0.25)
  snowGround(x, 1400, { col: '#cfe0f4', shade: '#8ea2c8' })
  void t
}
function bench(x, t, heat) {
  // legs, seat, backrest
  R(x, INK, 300, 1300, 22, 100); R(x, INK, 760, 1300, 22, 100)
  box(x, 260, 1250, 560, 40, '#8a5a3a', { b: 7, hi: '#a8744e' })
  box(x, 260, 1130, 560, 26, '#8a5a3a', { b: 6 }); box(x, 260, 1180, 560, 26, '#8a5a3a', { b: 6 })
  R(x, INK, 290, 1130, 18, 130); R(x, INK, 772, 1130, 18, 130)
  // glowing coils under the seat
  if (heat > 0) {
    glow(x, 540, 1300, 320, 0.3 * heat, '255,140,80')
    for (let i = 0; i < 8; i++) { const on = (Math.floor(t * 4 + i) % 3) !== 0; R(x, INK, 300 + i * 62, 1294, 40, 14); R(x, on ? '#ff8a4a' : '#c25a2a', 304 + i * 62, 1297, 32, 8) }
    if (heat > 0.5) { x.save(); x.globalAlpha = 0.35 * heat; for (let i = 0; i < 6; i++) { const ph = (t * 0.6 + i / 6) % 1; R(x, '#ffd6b0', 320 + i * 80 + 8 * Math.sin(t * 2 + i), 1240 - ph * 140, 10, 18 * (1 - ph)) } x.restore() }
  }
}
function dial(x, t, k) {
  if (k <= 0.01) return
  x.save(); x.translate(860, 1220); x.scale(k, k)
  box(x, -60, -40, 120, 80, '#2a2148', { b: 5 }); label(x, 'WARMTH', 0, -18, { size: 18, col: ICE }); label(x, '★★★', 0, 14, { size: 26, col: GOLD })
  x.restore()
}
function sign(x, k, text2 = 'ALL WELCOME') {
  if (k <= 0.01) return
  x.save(); x.translate(540, 960); x.rotate(-0.03); x.scale(k, k)
  R(x, INK, -8, 50, 16, 120); box(x, -220, -60, 440, 112, BONE, { b: 7 })
  label(x, 'FREE WARMTH', 0, -24, { size: 40, col: '#d05a2a', font: 'Inter, sans-serif', weight: 800 }); label(x, text2, 0, 22, { size: 28, col: INK, font: 'Inter, sans-serif', weight: 800 })
  x.restore()
}

function scene(x, t, K) {
  const ok = popOut(t, K.OUT)
  park(x, t)
  const heat = clamp(prog(t, T.coils - 0.8, T.coils + 0.4))
  bench(x, t, Math.max(0.35, heat))
  dial(x, t, easeOutBack(prog(t, T.dial, T.dial + 0.35), 2))
  sign(x, easeOutBack(prog(t, T.sign, T.sign + 0.35), 2) * (t < T.cut ? 1 : outK(t, [T.cut, T.cut + 0.3])))
  if (t < T.b2) {
    const ok1 = outK(t, [T.b2 - 0.15, T.b2])
    // Aquarius tinkering: the wrench turns (mid-turn at frame 0)
    shadow(x, 420, 1400, 220)
    const r = K.star(x, t, 'aquarius', { x: 420, y: 1250, s: 240, pop: ok1, mood: t > T.solve ? 'sparkle' : 'squint', look: [1, 0.6], hops: [0.3, 0.9, T.coils, T.dial, T.sign, T.solve], seed: 9, scarf: GOLD })
    void r
    const wr = Math.sin(t * 6) * 0.5
    x.save(); x.translate(560, 1280); x.rotate(-0.6 + wr); R(x, INK, -8, -100, 16, 110); R(x, '#a0a8c0', -4, -96, 8, 102); box(x, -26, -126, 52, 34, '#a0a8c0', { b: 5 }); R(x, INK, -8, -126, 16, 18); x.restore()
    sparkles(x, t, 540, 1300, T.coils, 10, 200, 1, ['#ff8a4a', GOLD, BONE])
    bubble(x, t, 420, 1000, T.solve, T.b2 - 0.1, 'solving winter. for everyone.', { size: 32 })
    K.pisces(x, t, { x: 180, y: 1180, s: 120, pop: pop01(t, 2.0, 0.3, 2) * ok1 }, 1, 'wide', [1, 0.2])
    return
  }
  if (t < T.cut) {
    const ok2 = outK(t, [T.cut - 0.2, T.cut])
    const droop = clamp(prog(t, T.walkers[2] + 1.5, T.still + 0.5))
    K.star(x, t, 'aquarius', { x: 400, y: 1170, s: 220, pop: ok2, mood: droop > 0.5 ? 'neutral' : 'happy', look: t < T.still ? [1, 0] : [0, 0.6], squash: 0.06 * droop, hops: T.walkers.map(w => w + 0.6), seed: 9, scarf: GOLD })
    WALK.forEach(([id, line], i) => {
      const a = T.walkers[i], p = prog(t, a, a + 2.2)
      if (p <= 0 || p >= 1) return
      const wx = lerp(1250, -170, p)
      K.star(x, t, id, { x: wx, y: 1270, s: 200, mood: 'happy', look: [-1, 0], hops: Array.from({ length: 6 }, (_, j) => a + j * 0.36), seed: 20 + i, scarf: [RED, MINT, PINK][i] })
      if (i === 2) { x.save(); x.translate(wx - 70, 1160); R(x, INK, -16, -30, 32, 56); R(x, '#4f8cff', -12, -26, 24, 44); x.restore() }
      bubble(x, t, wx, 1060, a + 0.5, a + 1.7, line, { size: 30 })
    })
    T.walkers.forEach(w => bubble(x, t, 400, 960, w + 0.25, w + 0.9, 'hi!', { size: 34, col: '#d6f3ff' }))
    if (t > T.still) { label(x, 'STILL WARM', 540, 1470, { size: 34, col: '#ff8a4a', alpha: clamp(prog(t, T.still, T.still + 0.2)) * ok2 }); label(x, '…', 560, 1010, { size: 60, col: BONE, alpha: clamp(prog(t, T.still + 0.4, T.still + 0.6)) }) }
    // Pisces behind a tree
    K.pisces(x, t, { x: 980, y: 1150, s: 130, pop: pop01(t, T.b2 + 0.6, 0.3, 2) * ok2 }, t > T.still ? 3 : 2, 'sparkle', [-1, 0.4])
    R(x, '#163040', 1010, 1100, 70, 300)
    return
  }
  // someone sat down
  const sit = ease.inOutCubic(prog(t, ...T.sit))
  K.star(x, t, 'aquarius', { x: 400, y: 1170, s: 220, pop: ok, mood: t < T.warm ? 'wide' : t < T.why ? 'sparkle' : t < 22.6 ? 'neutral' : t > T.b4 ? 'happy' : 'neutral', look: [1, 0], hops: [T.warm, T.specs, T.specs + 0.4, T.specs + 0.8, ...K.hopsFor(AQ), T.snow + 0.5], seed: 9, scarf: GOLD })
  K.star(x, t, 'cancer', { x: lerp(1250, 680, sit), y: lerp(1270, 1170, sit), s: 210, pop: ok, mood: t > 24.0 ? 'heart' : t > T.why ? 'neutral' : 'happy', look: [-1, 0], hops: [T.sit[0] + 0.2, T.sit[1], T.warm, T.why], seed: 8, scarf: '#f4f0ff' })
  bubble(x, t, 690, 960, T.warm, T.specs - 0.1, "ooh. it's warm.", { size: 34, col: '#d6f0ff' })
  bubble(x, t, 400, 960, T.specs, T.why - 0.1, 'it has three settings and a backup coil and—', { size: 26 })
  bubble(x, t, 690, 960, T.why, 22.6, 'but why did you build it?', { size: 30, col: '#d6f0ff' })
  hearts(x, t, 24.0, 540, 1050, { n: 6 })
  if (t > T.cut && t < T.b4 + 0.3) K.stars(x, t, { x: 540, y: 700, s: 170, pop: pop01(t, 24.2, 0.4, 2) * outK(t, [T.b4, T.b4 + 0.3]), mood: 'happy', look: [0, 0.7], hops: K.hopsFor(SP) })
  // the first snow
  if (t > T.snow) {
    const sp = prog(t, T.snow, T.snow + 0.5)
    for (let i = 0; i < 3; i++) { const fx = [460, 610, 540][i], fy = lerp(560, 1060, prog(t, T.snow + i * 0.6, T.snow + i * 0.6 + 3.2)); if (t > T.snow + i * 0.6) R(x, '#f6f2ff', fx + 20 * Math.sin(t * 1.4 + i), fy, 14, 14) }
    void sp
    const pr = ease.outCubic(prog(t, ...T.pisRun))
    K.pisces(x, t, { x: lerp(1250, 900, pr), y: 1270, s: 180, pop: ok, hops: [T.pisRun[0] + 0.1, T.pisRun[0] + 0.4, T.isSnow] }, 3, 'sparkle', [-1, -1])
    bubble(x, t, 860, 1020, T.isSnow, 32.6, 'IS THAT SNOW', { size: 40, col: '#e6e2ff' })
  } else if (t > T.cut) K.pisces(x, t, { x: 980, y: 1150, s: 120, pop: ok }, 2, 'sparkle', [-1, 0.4])
}

const EP = makeCuff({
  id: 'nc14e12', duration: 40, ep: 12,
  heads: [
    { text: 'Aquarius invented | a *heated bench.*', at: -1.2, out: T.h0Out, size: 96, accent: '#ffae7a' },
    { text: 'Built for *everyone.* | Sat on by no one.', at: T.h1, out: T.h1Out, size: 84 },
    { text: 'Then someone | *sat down.*', at: T.h2, out: T.h2Out, size: 100, accent: GOLD },
    { text: 'Warmer | *together.*', at: T.h3, out: [35.0, 35.3], size: 108, accent: PINK },
  ],
  boxes: [
    { lines: B2, open: 22.4, close: 26.4, y: 1540 },
    { lines: B3, open: T.last - 0.22, close: 34.9, y: 1540 },
  ],
  snow: (t) => t < T.snow ? 0 : 0.8 * clamp(prog(t, T.snow + 1.6, T.snow + 4.5)),
  cuts: [T.b2, { t: T.cut, kind: 'flip' }, T.b4],
  flashes: [T.b2],
  ghost: { x: 941, y: 842, at: 10.4, from: 'below', cell: 3 },
  draw(x, t, K) { scene(x, t, K) },
  cues: [
    ...Array.from({ length: 8 }, (_, i) => ['tick', +(0.15 + i * 0.52).toFixed(3), 0.03]),
    ['riser', T.coils - 0.8, T.coils + 0.4, 0.02], ['glitter', T.coils, T.coils + 0.5], ['pop', T.dial, 1174.66, 0.045, 0.4], ['pop', T.sign, 1318.51, 0.05, 0], ['pop', T.solve, 880, 0.035, -0.3],
    ...T.walkers.flatMap((w, i) => [['pop', +(w + 0.25).toFixed(3), 1174.66, 0.035, -0.3], ['pop', +(w + 0.5).toFixed(3), [880, 987.77, 739.99][i], 0.035, 0.3], ['whoosh', +(w + 1.0).toFixed(3), 0.4, 0.025]]),
    ['pluck', T.still, 440, 0.035, 0.8, 0],
    ['whoosh', T.sit[0], 0.4, 0.035], ['pop', T.warm, 987.77, 0.04, 0.3], ['pop', T.specs, 1318.51, 0.035, -0.3], ['pop', T.why, 739.99, 0.04, 0.3],
    ['pluck', 24.0, 1174.66, 0.04, 0.5, 0], ['glitter', 24.0, 24.4],
    ['bell', T.snow, 2349.32, 0.03, 1.6, 0], ['bell', T.snow + 0.6, 1760, 0.025, 1.6, 0.3], ['bell', T.snow + 1.2, 2093, 0.025, 1.6, -0.3],
    ['whoosh', T.pisRun[0], 0.4, 0.035], ['pop', T.isSnow, 1567.98, 0.05, 0.3], ['glitter', T.isSnow, T.isSnow + 0.5],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [phone, signStar]
