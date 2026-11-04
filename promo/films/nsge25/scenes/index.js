// nsge25 · Remix: Snow Globe Cities · "Montreal: look down" (30 s vertical, music: chiptune · G) · story 0–25.6, then
// the shared end card. Look: ../nsge15/globekit.js. Rows: promo/films/next30/b17.md.
//   0.00–5.2   "Montreal, in a | snow *globe.*"  The mountain over the city, church spires and snow. ♈ Aries mid-sprint with a
//              WHERE ARE YOU? sign: "if love won't come to me, I'll sprint."
//   5.4–13.0   "Lap two. | *Lap three.*"  Faster each lap, then Aries flops, panting: "…is love also sprinting?" THE STARS:
//              "babe. slow down. look down." A warm stairway glows: THE UNDERGROUND CITY (Montreal really has one: warm
//              walkways under the streets).
//  13.4        card cut: we're underground.
//  13.55–20.8 "Warm walkways, | *under the snow.*"  Lit shopfronts, a tiled floor, a bench. ♎ Libra reading. Aries walks
//              down and sits. Slowly. "hi. sorry. I've been running." LIBRA: "sit. it's warm down here."
//  21.0–25.5   "Slow down. | Look *closer.*"  A mystery card back floats between them. Pisces (at the glass) fountains.
import { globeFilm, G, GOLD, BONE, INK, PINK, ICE, pop01, outK, popOut, inR, walk, drawBits, heart, sparkles, chip, drawCard, bubble } from '../../nsge15/globekit.js'
import { clamp, lerp, prog, ease } from '../../../src/lib.js'

const T = {
  h0Out: [5.0, 5.2], lap1: [0, 3.6],
  h1: 5.4, h1Out: [12.85, 13.05], lap2: [5.5, 7.4], lap3: [7.5, 8.6], flop: 8.7, starsIn: 10.2, glow: 11.2, cut: 13.4,
  h2: 13.55, h2Out: [20.7, 20.9], down: [13.8, 15.2], sit: [15.4, 16.4], love: 20.2,
  h3: 21.0, card: [21.5, 22.0], out: [25.1, 25.45],
}
const GY = G.ground - 62
const UNDER = t => t >= T.cut
function lapX(t, [a, b], n) { const p = prog(t, a, b); return 540 + 240 * Math.sin(p * Math.PI * 2 * n) }
function ariesPos(t) {
  if (t < T.lap1[1]) return [lapX(t, T.lap1, 1.5), GY, Math.cos(prog(t, ...T.lap1) * Math.PI * 3) > 0 ? 1 : -1]
  if (t < T.lap2[0]) return [540, GY, 1]
  if (t < T.lap2[1]) return [lapX(t, T.lap2, 1.5), GY, 1]
  if (t < T.lap3[1]) return [lapX(t, T.lap3, 2), GY, 1]
  if (t < T.cut) return [540, GY + 10, 1]
  return [walk(t, [[T.down[0], 230, 0], [T.down[1], 430, 0], [T.sit[0], 430, 0], [T.sit[1], 560, 0]])[0], walk(t, [[T.down[0], 860, 0], [T.down[1], GY, 0]])[0] === 860 ? lerp(860, GY, ease.inOutCubic(prog(t, ...T.down))) : GY, 1]
}

function above(x, t) {
  x.fillStyle = '#2c3a66'; x.beginPath(); x.moveTo(140, 1040); x.quadraticCurveTo(420, 820, 700, 960); x.lineTo(940, 1040); x.fill()
  x.fillStyle = '#e9f2ff'; x.beginPath(); x.moveTo(330, 880); x.quadraticCurveTo(420, 840, 520, 880); x.lineTo(500, 890); x.quadraticCurveTo(420, 860, 350, 890); x.fill()
  for (const [bx, h] of [[200, 90], [270, 130], [610, 160], [700, 120], [860, 100]]) { x.fillStyle = '#1e2448'; x.fillRect(bx - 32, 1100 - h, 64, h); x.fillStyle = 'rgba(255,224,138,0.55)'; for (let r = 0; r < h / 30; r++) for (let c = 0; c < 2; c++) if ((r + c + bx) % 3) x.fillRect(bx - 20 + c * 24, 1100 - h + 10 + r * 30, 10, 12) }
  for (const sx of [380, 470]) { x.fillStyle = '#1e2448'; x.fillRect(sx - 16, 990, 32, 110); x.beginPath(); x.moveTo(sx - 20, 992); x.lineTo(sx, 920); x.lineTo(sx + 20, 992); x.fill() }
  // the stairway down (glows when THE STARS point at it)
  const g = clamp(prog(t, T.glow, T.glow + 0.5))
  x.fillStyle = INK; x.fillRect(740, 1080, 130, 110); x.fillStyle = `rgb(${Math.round(lerp(60, 255, g))},${Math.round(lerp(50, 190, g))},${Math.round(lerp(80, 110, g))})`; x.fillRect(746, 1086, 118, 104)
  x.fillStyle = INK; for (let i = 0; i < 4; i++) x.fillRect(746, 1110 + i * 22, 118, 4)
  if (g > 0) { x.save(); x.globalCompositeOperation = 'lighter'; const rg = x.createRadialGradient(805, 1130, 0, 805, 1130, 200); rg.addColorStop(0, `rgba(255,190,110,${0.45 * g})`); rg.addColorStop(1, 'rgba(255,190,110,0)'); x.fillStyle = rg; x.fillRect(605, 930, 400, 400); x.restore() }
}
function below(x, t) {
  const { cx, cy, R } = G
  const g = x.createLinearGradient(0, cy - R, 0, cy + R); g.addColorStop(0, '#3a2440'); g.addColorStop(1, '#6a4038')
  x.fillStyle = g; x.fillRect(cx - R, cy - R, 2 * R, 2 * R)
  // ceiling lights
  for (let i = 0; i < 6; i++) { x.fillStyle = '#ffe9b8'; x.fillRect(190 + i * 140, 700, 80, 10); x.save(); x.globalCompositeOperation = 'lighter'; x.fillStyle = 'rgba(255,220,160,0.08)'; x.beginPath(); x.moveTo(190 + i * 140, 710); x.lineTo(270 + i * 140, 710); x.lineTo(300 + i * 140, 1100); x.lineTo(160 + i * 140, 1100); x.fill(); x.restore() }
  // shopfronts
  const C = ['#5fd38a', '#f2c75c', '#e8628a', '#7fd0f0', '#f29a4a']
  for (let i = 0; i < 5; i++) { const sx = 200 + i * 150; x.fillStyle = INK; x.fillRect(sx - 64, 800, 128, 230); x.fillStyle = '#2a1c22'; x.fillRect(sx - 60, 804, 120, 226); x.fillStyle = C[i]; x.fillRect(sx - 60, 804, 120, 26); x.fillStyle = 'rgba(255,214,150,0.85)'; x.fillRect(sx - 48, 846, 96, 140) }
  // stairs coming down on the left
  x.fillStyle = INK; for (let i = 0; i < 6; i++) x.fillRect(150 + i * 26, 880 + i * 46, 60, 50)
  x.fillStyle = '#8a7a70'; for (let i = 0; i < 6; i++) x.fillRect(152 + i * 26, 882 + i * 46, 56, 10)
}
function floor(x) {
  x.fillStyle = '#c9b49a'; x.fillRect(140, G.ground - 20, 800, 400)
  x.fillStyle = '#a8927a'; for (let r = 0; r < 6; r++) for (let c = 0; c < 14; c++) if ((r + c) % 2) x.fillRect(140 + c * 60, G.ground - 20 + r * 40, 60, 40)
  // the bench
  x.fillStyle = INK; x.fillRect(470, G.ground - 34, 360, 26); x.fillStyle = '#8c5638'; x.fillRect(474, G.ground - 30, 352, 18)
  x.fillStyle = INK; x.fillRect(490, G.ground - 10, 14, 50); x.fillRect(796, G.ground - 10, 14, 50)
}

export const { DURATION, SCENES, CUES, MUSIC } = globeFilm({
  id: 'nsge25', plate: 'Montreal', lead: 'aries', partner: 'libra',
  sky: { top: '#0b1032', bot: '#2a2e60', glow: '#ffb070' },
  shakes: [-0.25],
  snowAlpha: t => (UNDER(t) ? 0 : 1),
  skyline(x, t) { if (UNDER(t)) below(x, t); else above(x, t) },
  back(x, t) { if (UNDER(t)) floor(x) },
  cast(t, K) {
    const [ax, ay] = ariesPos(t)
    let am = 'squint', al = [1, 0]
    if (inR(t, T.lap2[0], T.lap3[1])) am = 'wide'
    if (t > T.flop) { am = 'sleepy'; al = undefined }
    if (t > T.starsIn + 0.5) { am = 'neutral'; al = [1, 0.6] }
    if (t > T.glow) { am = 'sparkle'; al = [1, 1] }
    if (t > T.cut) { am = 'wide'; al = [1, 0] }
    if (t > T.sit[1]) am = 'happy'
    if (t > T.love) am = 'heart'
    const runSq = t < T.lap3[1] && !inR(t, T.lap1[1], T.lap2[0]) ? 0.06 * Math.sin(t * 30) : t > T.flop && t < T.starsIn ? 0.25 : 0
    return [
      UNDER(t) ? { sign: 'libra', x: 760, y: GY, s: 176, mood: t < T.sit[1] ? 'neutral' : t < T.love ? 'happy' : 'sparkle', look: t < 15.0 ? [0, 1] : [-1, 0], hops: [T.sit[1] + 0.1, T.love + 0.1, 22.6, ...K.HOPS.partner], seed: 5, hat: '#c9a6ff' } : null,
      { sign: 'aries', x: ax, y: ay, s: 182, mood: am, look: al, squash: runSq, hops: [T.lap1[1], T.flop, T.glow, T.down[1], T.love, 22.4, ...K.HOPS.lead], seed: 1, hat: '#d8484a' },
    ]
  },
  front(x, t) {
    // the WHERE ARE YOU? sign over Aries while running
    if (t < T.flop) { const [ax, ay] = ariesPos(t); x.save(); x.translate(ax, ay - 150); x.rotate(0.08 * Math.sin(t * 14)); x.fillStyle = INK; x.fillRect(-4, 0, 8, 60); x.fillRect(-110, -44, 220, 54); x.fillStyle = '#c8955a'; x.fillRect(-106, -40, 212, 46); x.font = "800 26px Inter"; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = INK; x.fillText('WHERE ARE YOU?', 0, -16); x.restore() }
    // Libra's book
    if (UNDER(t)) drawBits(x, ['BBBBBBBB', 'BPPPBPPP', 'BPPPBPPP', 'BBBBBBBB'], { B: '#3f7cf0', P: '#f4e8cc' }, 780, GY + 30, 9, { alpha: 1 - prog(t, T.sit[1], T.sit[1] + 0.3) })
    if (t > T.love && t < T.out[1]) for (let i = 0; i < 3; i++) { const tt = t - T.love - i * 0.4; if (tt > 0 && tt < 2.4) heart(x, 660 + 26 * Math.sin(tt * 3 + i), GY - 150 - tt * 70, 6, i % 2 ? '#ff4f86' : '#ff8fb1', { alpha: 1 - tt / 2.4 }) }
  },
  stars(t) {
    const k = pop01(t, T.starsIn, 0.4, 2.1) * popOut(t, T.out)
    return { x: 925, y: 650, s: 125, mood: t < T.cut ? 'neutral' : t > T.love ? 'sparkle' : 'happy', look: t < T.cut ? [-1, 1] : [-1, 0.7], pop: k }
  },
  pisces(t) {
    return { x: 126, y: 1200, s: 150, mood: inR(t, T.flop, T.flop + 1.2) ? 'wide' : t > T.love ? 'happy' : 'sparkle', look: [1, -0.3], tears: t < 3 ? 1 : t < T.love ? 2 : 3, hops: [T.flop + 0.1, T.love + 0.2] }
  },
  over(x, t, K) {
    chip(x, 805, 1010, 'THE UNDERGROUND CITY', pop01(t, T.glow, 0.3, 2.4) * outK(t, T.h1Out), { size: 22, col: GOLD })
    ;[['LAP 1', 1.0], ['LAP 2', T.lap2[0] + 0.2], ['LAP 3!!', T.lap3[0] + 0.1]].forEach(([s, at], i) => chip(x, 300 + i * 50, 760 + i * 40, s, pop01(t, at, 0.25, 2.6) * outK(t, [at + 1.4, at + 1.6]), { size: 26, col: '#ff8a6a', bar: '#ff6a4a', rot: (i - 1) * 0.08 }))
    bubble(x, 560, 1000, 'huff… huff…', pop01(t, T.flop + 0.2, 0.25, 2.4) * outK(t, [T.starsIn, T.starsIn + 0.2]), { size: 28 })
    // the mystery card back floats in and turns once
    if (t > T.card[0]) {
      const k = ease.outBack(prog(t, ...T.card)), o = popOut(t, T.out), spin = Math.cos(prog(t, T.card[1], T.card[1] + 0.6) * Math.PI * 2)
      x.save(); x.translate(660, lerp(1300, 870, k)); x.scale(Math.max(0.04, Math.abs(spin)), 1); drawCard(x, K.img.back, 0, 6 * Math.sin(t * 2), 160 * o, 0); x.restore()
    }
    sparkles(x, t, 660, 870, T.card[1] + 0.6, 12, 140, 2, [GOLD, PINK, BONE])
  },
  heads: [
    { text: 'Montreal, in a | snow *globe.*', at: -1, lateAt: -0.6, out: T.h0Out, accentColor: '#ff8a6a' },
    { text: 'Lap two. | *Lap three.*', at: T.h1, lateAt: T.lap3[0], out: T.h1Out, late: 2, accentColor: '#ff8a6a' },
    { text: 'Warm walkways, | *under the snow.*', at: T.h2, lateAt: T.h2 + 0.35, out: T.h2Out, late: 3, accentColor: GOLD },
    { text: 'Slow down. | Look *closer.*', at: T.h3, lateAt: T.h3 + 0.45, out: T.out, accentColor: PINK },
  ],
  boxes: [
    { open: 0.8, close: 12.8, lines: [
      { t: 1.0, who: 'lead', text: "if love won't come to me, I'll *sprint.*" },
      { t: 9.0, who: 'lead', text: '…is love *also* sprinting?' },
      { t: 10.5, who: 'stars', text: 'babe. slow down. *look down.*' },
    ] },
    { open: 16.6, close: 22.3, lines: [
      { t: 16.8, who: 'lead', text: "hi. sorry. I've been *running.*" },
      { t: 18.9, who: 'partner', text: "sit. it's *warm* down here." },
    ] },
  ],
  cuts: [T.h1Out[1] - 0.6, { t: T.cut, kind: 'flip' }, T.h2Out[1]],
  music: { style: 'chiptune', key: 'G', seed: 2525, drop: T.h1, breakdown: [T.cut], lift: [T.sit[1]], hits: [T.flop, T.h3] },
  cues: [
    ...Array.from({ length: 10 }, (_, i) => ['tick', +(0.1 + i * 0.32).toFixed(2), 0.025]),
    ...Array.from({ length: 9 }, (_, i) => ['tick', +(T.lap2[0] + i * 0.22).toFixed(2), 0.028]),
    ...Array.from({ length: 8 }, (_, i) => ['tick', +(T.lap3[0] + i * 0.13).toFixed(2), 0.03]),
    ['tom', T.flop, 90, { gain: 0.25, decay: 0.3 }], ['pop', T.starsIn, 739.99, 0.035, 0.4], ['bell', T.glow, 1318.51, 0.03, 1.0, 0.3],
    ...Array.from({ length: 6 }, (_, i) => ['tick', +(T.down[0] + i * 0.22).toFixed(2), 0.025]), ['pop', T.sit[1], 659.25, 0.04, 0],
    ['pluck', T.love, 1174.66, 0.04, 0.5, 0], ['glitter', T.love, T.love + 0.5],
    ['whoosh', T.card[0], 0.4, 0.04], ['tick', T.card[1] + 0.15, 0.04], ['tick', T.card[1] + 0.45, 0.04], ['glitter', T.card[1] + 0.6, T.card[1] + 1.1],
  ],
})
