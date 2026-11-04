// nsge23 · Remix: Snow Globe Cities · "Sapporo: built together" (28 s vertical, music: house · A) · story 0–25.6, then the short 2.4 s end card (no card cut; CHANGE 4 Nov); was
// the shared end card. Look: ../nsge15/globekit.js. Rows: promo/films/next30/b17.md.
//   0.00–5.2   "Sapporo, in a | snow *globe.*"  Mountains, city blocks, a lattice tower, and a row of snow sculptures (the
//              city is known for them). ♐ Sagittarius mid-chisel on a snow mountain: "my person has to love adventure."
//              → "so I'm sculpting every trip."
//   5.4–13.0   "Mountain. Ship. | *Rocket?*"  A ship, then a tall rocket. The rocket's nose slowly droops: "…the rocket
//              is sagging."
//  13.4        card cut.
//  13.55–20.8 "Help shows up | *with a bucket.*"  ♍ Virgo packs snow and props the rocket straight: "hold still. I'll pack
//              it." SAG: "wait. this is fun." THE STARS: "adventure can be staying and building."
//  21.0–25.5   "The best adventure is | *building* something."  Tonight's deck lands a card on the rocket's tip. Pisces fountains.
import { globeFilm, G, GOLD, BONE, INK, PINK, ICE, pop01, outK, popOut, inR, walk, drawBits, heart, sparkles, chip, drawCard } from '../../nsge15/globekit.js'
import { clamp, lerp, prog, ease } from '../../../src/lib.js'

const T = {
  h0Out: [5.0, 5.2],
  h1: 5.4, h1Out: [12.85, 13.05], ship: [5.8, 6.6], rocket: [7.8, 8.8], droop: [9.6, 11.0], cut: 13.4,
  h2: 13.55, h2Out: [20.7, 20.9], virIn: [13.9, 15.0], fix: [16.0, 17.4], starsIn: 19.0,
  h3: 21.0, deal: [21.6, 22.1], out: [25.1, 25.45],
}
const GY = G.ground - 62
const SAG_X = t => walk(t, [[0, 330, 0], [T.ship[0] - 0.4, 330, 0], [T.ship[0], 470, 0], [T.rocket[0] - 0.4, 470, 0], [T.rocket[0], 560, 0], [T.virIn[0], 560, 0], [T.virIn[1], 470, 0]])[0]
const VIR_X = t => walk(t, [[T.virIn[0], 1100, 0], [T.virIn[1], 850, 0]])[0]
const SNW = '#f4f8ff', SHD = '#c5d4ee', SHD2 = '#a9bde0'

function skyline(x, t) {
  x.fillStyle = '#26305e'; x.beginPath(); x.moveTo(140, 1000); x.lineTo(260, 880); x.lineTo(360, 950); x.lineTo(480, 860); x.lineTo(640, 960); x.lineTo(780, 880); x.lineTo(940, 1000); x.fill()
  x.fillStyle = '#e9f2ff'; for (const [mx, my] of [[260, 880], [480, 860], [780, 880]]) { x.beginPath(); x.moveTo(mx, my); x.lineTo(mx - 34, my + 30); x.lineTo(mx + 34, my + 30); x.fill() }
  for (const [bx, h] of [[200, 120], [300, 90], [620, 110], [720, 140], [860, 100]]) { x.fillStyle = '#1e2448'; x.fillRect(bx - 45, 1080 - h, 90, h); x.fillStyle = 'rgba(255,224,138,0.5)'; for (let r = 0; r < h / 34; r++) for (let c = 0; c < 3; c++) if ((r + c + bx) % 3) x.fillRect(bx - 32 + c * 26, 1080 - h + 12 + r * 34, 12, 14) }
  // lattice tower
  x.strokeStyle = '#d8484a'; x.lineWidth = 6; x.beginPath(); x.moveTo(440, 1080); x.lineTo(470, 780); x.lineTo(500, 1080); x.stroke()
  for (let i = 0; i < 8; i++) { const y = 1060 - i * 36, w = 30 - i * 3.6; x.beginPath(); x.moveTo(470 - w, y); x.lineTo(470 + w, y - 36); x.moveTo(470 + w, y); x.lineTo(470 - w, y - 36); x.stroke() }
  x.fillStyle = '#ffe08a'; x.fillRect(456, 870, 28, 20)
}
function mountainS(x, k) { if (k <= 0.01) return; x.save(); x.translate(330, G.ground + 10); x.scale(k, k); x.fillStyle = INK; x.beginPath(); x.moveTo(-130, 4); x.lineTo(-20, -200); x.lineTo(30, -140); x.lineTo(70, -180); x.lineTo(140, 4); x.fill(); x.fillStyle = SNW; x.beginPath(); x.moveTo(-122, 0); x.lineTo(-20, -190); x.lineTo(30, -130); x.lineTo(70, -170); x.lineTo(132, 0); x.fill(); x.fillStyle = SHD; x.beginPath(); x.moveTo(-20, -190); x.lineTo(10, 0); x.lineTo(-122, 0); x.fill(); x.restore() }
function shipS(x, k) { if (k <= 0.01) return; x.save(); x.translate(560, G.ground + 10); x.scale(k, k); x.fillStyle = INK; x.beginPath(); x.moveTo(-104, -64); x.lineTo(104, -64); x.lineTo(74, 4); x.lineTo(-74, 4); x.fill(); x.fillStyle = SNW; x.beginPath(); x.moveTo(-98, -60); x.lineTo(98, -60); x.lineTo(70, 0); x.lineTo(-70, 0); x.fill(); x.fillStyle = SHD; x.fillRect(-80, -30, 160, 8); x.fillStyle = INK; x.fillRect(-6, -200, 12, 140); x.fillStyle = SNW; x.beginPath(); x.moveTo(8, -190); x.lineTo(90, -80); x.lineTo(8, -80); x.fill(); x.fillStyle = SHD; x.beginPath(); x.moveTo(-8, -170); x.lineTo(-70, -80); x.lineTo(-8, -80); x.fill(); x.restore() }
function rocketS(x, t, k) {
  if (k <= 0.01) return
  const droop = ease.inOutCubic(prog(t, ...T.droop)) * (1 - ease.outBack(prog(t, ...T.fix)))
  x.save(); x.translate(740, G.ground + 10); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-48, -170, 96, 174); x.fillStyle = SNW; x.fillRect(-44, -166, 88, 166); x.fillStyle = SHD; x.fillRect(16, -166, 28, 166)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-48, 4); x.lineTo(-90, 4); x.lineTo(-48, -60); x.fill(); x.beginPath(); x.moveTo(48, 4); x.lineTo(90, 4); x.lineTo(48, -60); x.fill()
  x.fillStyle = SHD2; x.beginPath(); x.moveTo(-50, 0); x.lineTo(-82, 0); x.lineTo(-50, -50); x.fill(); x.beginPath(); x.moveTo(50, 0); x.lineTo(82, 0); x.lineTo(50, -50); x.fill()
  x.fillStyle = '#8fb8ff'; x.beginPath(); x.arc(0, -110, 18, 0, Math.PI * 2); x.fill()
  // the nose (bends over as it sags)
  x.translate(-44, -166); x.rotate(-droop * 1.4)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-4, 4); x.lineTo(44, -110); x.lineTo(92, 4); x.fill(); x.fillStyle = SNW; x.beginPath(); x.moveTo(2, 0); x.lineTo(44, -100); x.lineTo(86, 0); x.fill(); x.fillStyle = SHD; x.beginPath(); x.moveTo(44, -100); x.lineTo(86, 0); x.lineTo(56, 0); x.fill()
  x.restore()
  return droop
}
const CHISEL = (x, cx, cy, rot) => { x.save(); x.translate(cx, cy); x.rotate(rot); x.fillStyle = INK; x.fillRect(-6, -60, 12, 64); x.fillStyle = '#c8955a'; x.fillRect(-4, -58, 8, 40); x.fillStyle = '#cfd6ec'; x.fillRect(-4, -18, 8, 20); x.restore() }

export const { DURATION, SCENES, CUES, MUSIC } = globeFilm({
  id: 'nsge23', plate: 'Sapporo', lead: 'sagittarius', partner: 'virgo',
  sky: { top: '#0a1030', bot: '#2a3060', glow: '#8fb8ff' },
  shakes: [-0.25],
  skyline,
  back(x, t) {
    mountainS(x, 1)
    shipS(x, ease.outBack(prog(t, ...T.ship)))
    rocketS(x, t, ease.outBack(prog(t, ...T.rocket)))
  },
  cast(t, K) {
    let sm = 'sparkle', sl = [-1, -0.5]
    if (t > T.ship[0]) sl = [1, -0.5]
    if (t > T.droop[0] + 0.4) { sm = 'wide'; sl = [1, -1] }
    if (t > T.droop[1]) sm = 'squint'
    if (t > T.virIn[1]) { sm = 'neutral'; sl = [1, 0] }
    if (t > 17.5) sm = 'happy'
    if (t > 21.0) sm = 'heart'
    return [
      t > T.virIn[0] ? { sign: 'virgo', x: VIR_X(t), y: GY, s: 176, mood: t < T.fix[1] ? 'neutral' : 'happy', look: [-1, -0.4], hops: [T.virIn[1], T.fix[0], T.fix[0] + 0.5, T.fix[1], 22.6, ...K.HOPS.partner], seed: 7, hat: '#5fd38a' } : null,
      { sign: 'sagittarius', x: SAG_X(t), y: GY, s: 186, mood: sm, look: sl, hops: [0.0, 0.5, 1.0, 1.6, T.ship[1], T.rocket[1], T.droop[1], 17.8, 21.1, 22.4, ...K.HOPS.lead], seed: 13, hat: '#a07bff' },
    ]
  },
  front(x, t) {
    const chip0 = inR(t, 0, T.rocket[1] + 0.4) ? 0.4 * Math.sin(t * 16) : 0
    if (t < T.droop[0]) CHISEL(x, SAG_X(t) + 96, GY - 20, 0.5 + chip0)
    // Virgo's bucket of packed snow
    if (t > T.virIn[0]) { const vx = VIR_X(t) - 100; drawBits(x, ['BBBBBB', '.BBBB.', '.BBBB.', '.BBBB.'], { B: '#3f7cf0' }, vx, GY + 40, 10); drawBits(x, ['.SSSS.'], { S: SNW }, vx, GY + 18, 10, { alpha: 1 - prog(t, ...T.fix) }) }
    if (t > T.fix[1] && t < T.out[1]) for (let i = 0; i < 3; i++) { const tt = t - T.fix[1] - i * 0.4; if (tt > 0 && tt < 2.4) heart(x, 650 + 26 * Math.sin(tt * 3 + i), GY - 160 - tt * 70, 6, i % 2 ? '#ff4f86' : '#ff8fb1', { alpha: 1 - tt / 2.4 }) }
  },
  stars(t) {
    const k = pop01(t, T.droop[0], 0.4, 2.1) * popOut(t, T.out)
    return { x: 925, y: 650, s: 125, mood: t < T.cut ? 'wide' : t > T.fix[1] ? 'sparkle' : 'happy', look: [-1, 0.7], pop: k }
  },
  pisces(t) {
    return { x: 126, y: 1200, s: 150, mood: inR(t, T.droop[0], T.droop[1] + 1) ? 'wide' : t > T.fix[1] ? 'happy' : 'sparkle', look: [1, -0.3], tears: t < 3.0 ? 1 : t < T.fix[1] ? 2 : 3, hops: [T.droop[1], T.fix[1] + 0.2] }
  },
  over(x, t, K) {
    chip(x, 330, 960, 'MOUNTAIN', pop01(t, 1.6, 0.3, 2.4) * outK(t, T.h1Out), { size: 22, col: ICE, bar: ICE })
    chip(x, 560, 930, 'SHIP', pop01(t, T.ship[1], 0.3, 2.4) * outK(t, T.h1Out), { size: 22, col: ICE, bar: ICE })
    chip(x, 760, 800, 'ROCKET', pop01(t, T.rocket[1], 0.3, 2.4) * outK(t, [T.droop[0] + 0.6, T.droop[0] + 0.8]), { size: 22, col: ICE, bar: ICE })
    chip(x, 760, 800, 'ROCKET (SAGGING)', pop01(t, T.droop[0] + 0.8, 0.3, 2.4) * outK(t, T.h1Out), { size: 22, col: '#ff6a6a', bar: '#ff4040' })
    if (t > T.deal[0]) {
      const k = ease.outBack(prog(t, ...T.deal)), o = popOut(t, T.out)
      drawCard(x, K.img.back, lerp(1250, 720, k), lerp(600, 830, k) + 6 * Math.sin(t * 2), 130 * o, lerp(1.2, 0.08, k))
    }
    sparkles(x, t, 740, 830, T.deal[1], 12, 130, 2, [GOLD, PINK, BONE])
    sparkles(x, t, 740, 900, T.fix[1], 10, 120, 1, [ICE, BONE, GOLD])
  },
  heads: [
    { text: 'Sapporo, in a | snow *globe.*', at: -1, lateAt: -0.6, out: T.h0Out, accentColor: ICE },
    { text: 'Mountain. Ship. | *Rocket?*', at: T.h1, lateAt: T.rocket[0], out: T.h1Out, accentColor: '#ff9a3a' },
    { text: 'Help shows up | *with a bucket.*', at: T.h2, lateAt: T.virIn[1] - 0.2, out: T.h2Out, late: 3, accentColor: '#5fd38a' },
    { text: 'The best adventure is | *building* something.', at: T.h3, lateAt: T.h3 + 0.55, out: T.out, late: 2, size: 80, accentSize: 108, accentColor: PINK },
  ],
  boxes: [
    { open: 0.8, close: 12.8, lines: [
      { t: 1.0, who: 'lead', text: 'my person has to love *adventure.*' },
      { t: 3.2, who: 'lead', text: "so I'm sculpting *every trip.*" },
      { t: 10.4, who: 'lead', text: '…the rocket is *sagging.*' },
    ] },
    { open: 15.1, close: 22.6, lines: [
      { t: 15.3, who: 'partner', text: "hold still. I'll *pack it.*" },
      { t: 17.5, who: 'lead', text: 'wait. this is *fun.*' },
      { t: 19.2, who: 'stars', text: 'adventure can be *staying* and building.' },
    ] },
  ],
  cuts: [T.h1Out[1] - 0.6, { t: T.cut, kind: 'flip' }, T.h2Out[1]],
  music: { style: 'house', key: 'A', seed: 2323, drop: T.h1, breakdown: [T.cut], lift: [T.fix[1]], hits: [T.h3] },
  cues: [
    ...Array.from({ length: 8 }, (_, i) => ['tick', +(0.2 + i * 0.5).toFixed(2), 0.03]),
    ['pop', T.ship[1], 880, 0.04, 0], ['pop', T.rocket[1], 1174.66, 0.045, 0],
    ['pluck', T.droop[0] + 0.2, 587.33, 0.035, 0.6, 0], ['pluck', T.droop[0] + 0.7, 554.37, 0.035, 0.6, 0], ['pluck', T.droop[0] + 1.2, 523.25, 0.035, 0.9, 0],
    ['whoosh', T.virIn[0], 0.5, 0.03], ...[16.1, 16.5, 16.9].map(c => ['tom', c, 140, { gain: 0.12, decay: 0.15 }]), ['bell', T.fix[1], 1760, 0.035, 1, 0], ['glitter', T.fix[1], T.fix[1] + 0.5],
    ['pop', T.droop[0], 739.99, 0.03, 0.4],
    ['whoosh', T.deal[0], 0.4, 0.04], ['tick', T.deal[1], 0.05], ['glitter', T.deal[1], T.deal[1] + 0.5],
  ],
})
