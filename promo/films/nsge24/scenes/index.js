// nsge24 · Remix: Snow Globe Cities · "Denver: the top" (28 s vertical, music: screwed · Fm) · story 0–25.6, then the short 2.4 s end card (no card cut; CHANGE 4 Nov); was the
// shared end card. Look: ../nsge15/globekit.js. Rows: promo/films/next30/b17.md.
//   0.00–5.2   "Denver, in a | snow *globe.*"  A small skyline at the foot of a big snowy peak (THE MILE HIGH CITY chip:
//              Denver's nickname, it sits about a mile up). ♑ Capricorn mid-climb with a flag in their teeth: "I'll date
//              when I reach the top."
//   5.4–13.0   "Promotion. Savings. | *Peak.*"  Three ledges, one label each. At the peak: wind, a great view, nobody.
//              THE STARS: "babe. the view's better with someone."
//  13.4        card cut.
//  13.55–20.8 "Someone's at | *base camp.*"  ♋ Cancer waves from the bottom with a thermos. Capricorn sleds down on the flag.
//              CANCER: "cocoa? it's still warm." CAPRICORN: "…the view's nicer from here."
//  21.0–25.5   "Don't climb | *alone.*"  A talk card ("Cook at home or try somewhere new?"). Pisces fountains.
import { globeFilm, G, GOLD, BONE, INK, PINK, ICE, pop01, outK, popOut, inR, walk, drawBits, heart, sparkles, chip, drawCard } from '../../nsge15/globekit.js'
import { clamp, lerp, prog, ease } from '../../../src/lib.js'

const T = {
  h0Out: [5.0, 5.2], l1: 2.6,
  h1: 5.4, h1Out: [12.85, 13.05], l2: 6.6, l3: 9.0, wind: 9.4, starsIn: 10.0, cut: 13.4,
  h2: 13.55, h2Out: [20.7, 20.9], wave: 14.0, sled: [15.4, 16.8], share: 17.2,
  h3: 21.0, card: [21.6, 22.1], out: [25.1, 25.45],
}
const GY = G.ground - 62
const LEDGE = [[560, 1060], [660, 940], [740, 800]]
const capPos = t => walk(t, [[0, 420, 1090], [T.l1, LEDGE[0][0], LEDGE[0][1] - 62], [T.l2 - 1.2, LEDGE[0][0], LEDGE[0][1] - 62], [T.l2, LEDGE[1][0], LEDGE[1][1] - 62], [T.l3 - 1.4, LEDGE[1][0], LEDGE[1][1] - 62], [T.l3, LEDGE[2][0], LEDGE[2][1] - 62], [T.sled[0], LEDGE[2][0], LEDGE[2][1] - 62], [T.sled[1], 490, GY]])

function skyline(x, t) {
  x.fillStyle = '#26305e'; x.beginPath(); x.moveTo(140, 1040); x.lineTo(240, 940); x.lineTo(330, 990); x.lineTo(420, 930); x.lineTo(520, 1040); x.fill()
  // the big peak
  x.fillStyle = INK; x.beginPath(); x.moveTo(420, 1200); x.lineTo(740, 740); x.lineTo(960, 1200); x.fill()
  x.fillStyle = '#5a5f8a'; x.beginPath(); x.moveTo(432, 1196); x.lineTo(740, 752); x.lineTo(950, 1196); x.fill()
  x.fillStyle = '#f4f8ff'; x.beginPath(); x.moveTo(740, 752); x.lineTo(680, 840); x.lineTo(710, 830); x.lineTo(740, 850); x.lineTo(770, 826); x.lineTo(800, 840); x.fill()
  x.fillStyle = '#474b74'; x.beginPath(); x.moveTo(740, 752); x.lineTo(950, 1196); x.lineTo(800, 1196); x.fill()
  // ledges
  LEDGE.forEach(([lx, ly]) => { x.fillStyle = INK; x.fillRect(lx - 70, ly - 6, 140, 20); x.fillStyle = '#f4f8ff'; x.fillRect(lx - 66, ly - 4, 132, 14) })
  // the city at the foot
  for (const [bx, h] of [[180, 110], [230, 170], [280, 130], [330, 200], [380, 120]]) { x.fillStyle = '#1e2448'; x.fillRect(bx - 22, 1110 - h, 44, h); x.fillStyle = 'rgba(255,224,138,0.6)'; for (let r = 0; r < h / 30; r++) if ((r + bx) % 3) x.fillRect(bx - 12, 1110 - h + 10 + r * 30, 10, 12) }
}
function flag(x, cx, cy, rot, k = 1) { x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k); x.fillStyle = INK; x.fillRect(-4, -110, 8, 120); x.fillStyle = '#c8955a'; x.fillRect(-2, -108, 4, 116); drawBits(x, ['RRRRRR', 'RRRRRRR', 'RRRRRR', 'RRRRR.'], { R: '#d8283c' }, 26, -90, 7); x.restore() }

export const { DURATION, SCENES, CUES, MUSIC } = globeFilm({
  id: 'nsge24', plate: 'Denver', lead: 'capricorn', partner: 'cancer',
  sky: { top: '#0a0f30', bot: '#2b3266', glow: '#9fd8ff' },
  shakes: [-0.25],
  skyline,
  back(x, t) {
    // wind streaks at the top
    if (inR(t, T.wind, T.cut)) for (let i = 0; i < 6; i++) { const p = ((t - T.wind) * 1.4 + i / 6) % 1; x.fillStyle = 'rgba(220,240,255,0.6)'; x.fillRect(560 + p * 380, 740 + i * 22, 70, 4) }
  },
  cast(t, K) {
    const [cx, cy] = capPos(t)
    let cm = 'squint', cl = [1, -1]
    if (inR(t, T.l1, T.l1 + 0.6) || inR(t, T.l2, T.l2 + 0.6)) cm = 'happy'
    if (t > T.l3) { cm = 'sparkle'; cl = [1, 0] }
    if (t > T.wind + 0.6) { cm = 'neutral'; cl = [-1, 0.4] }
    if (t > T.starsIn + 0.6) cm = 'wide'
    if (t > T.wave) { cm = 'wide'; cl = [-1, 1] }
    if (inR(t, T.sled[0], T.sled[1])) cm = 'sparkle'
    if (t > T.share) { cm = 'happy'; cl = [-1, 0] }
    if (t > 19.6) cm = 'heart'
    return [
      t > T.wave - 0.4 ? { sign: 'cancer', x: 250, y: GY, s: 176, pop: pop01(t, T.wave - 0.4, 0.35, 2.2), mood: t < T.share ? 'happy' : 'sparkle', look: [1, -0.6], hops: [T.wave, T.wave + 0.35, T.wave + 0.7, T.sled[1] + 0.1, 22.6, ...K.HOPS.partner], seed: 8, hat: '#ff8fb1' } : null,
      { sign: 'capricorn', x: cx, y: cy, s: 170, mood: cm, look: cl, squash: inR(t, T.sled[0], T.sled[1]) ? -0.08 : 0, hops: [0.0, T.l1, T.l2, T.l3, T.sled[1], 19.6, 22.4, ...K.HOPS.lead], seed: 12, hat: '#3fb0a0' },
    ]
  },
  front(x, t) {
    const [cx, cy] = capPos(t)
    if (t < T.l3) flag(x, cx + 50, cy + 10, 0.9)
    else if (t < T.sled[0] - 0.2) flag(x, LEDGE[2][0] + 70, LEDGE[2][1] + 4, 0.1 + 0.1 * Math.sin(t * 8))
    else if (t < T.sled[1] + 0.1) { x.save(); x.translate(cx, cy + 66); x.rotate(0.5); drawBits(x, ['RRRRRRRR', 'RRRRRRRR'], { R: '#d8283c' }, 0, 0, 10); x.restore() }
    else flag(x, 560, GY + 70, -0.2)
    // the thermos
    if (t > T.wave - 0.2) { const give = ease.inOutCubic(prog(t, T.share, T.share + 0.4)); drawBits(x, ['.CC.', 'TTTT', 'TTTT', 'TTTT', 'TTTT', 'TTTT'], { C: '#cfd6ec', T: '#3fb0a0' }, lerp(380, 365, give), GY + 10, 9) }
    if (t > T.share + 0.3) for (let i = 0; i < 3; i++) { const p = ((t - T.share) * 0.8 + i / 3) % 1; x.fillStyle = `rgba(255,255,255,${0.5 * (1 - p)})`; x.fillRect(365 + 8 * Math.sin(p * 6 + i), GY - 40 - p * 70, 6, 6) }
    if (t > 19.6 && t < T.out[1]) for (let i = 0; i < 3; i++) { const tt = t - 19.6 - i * 0.4; if (tt > 0 && tt < 2.4) heart(x, 365 + 26 * Math.sin(tt * 3 + i), GY - 170 - tt * 70, 6, i % 2 ? '#ff4f86' : '#ff8fb1', { alpha: 1 - tt / 2.4 }) }
  },
  stars(t) {
    const k = pop01(t, T.starsIn, 0.4, 2.1) * popOut(t, T.out)
    return { x: 925, y: 650, s: 125, mood: t < T.cut ? 'neutral' : t > 19.6 ? 'sparkle' : 'happy', look: [-1, 0.7], pop: k }
  },
  pisces(t) {
    return { x: 126, y: 1200, s: 150, mood: inR(t, T.sled[0], T.sled[1]) ? 'wide' : t > 19.6 ? 'happy' : 'sparkle', look: [1, -0.3], tears: t < 3 ? 1 : t < 19.6 ? 2 : 3, hops: [T.sled[1], 19.8] }
  },
  over(x, t, K) {
    chip(x, 280, 1060, 'THE MILE HIGH CITY', pop01(t, 0.3, 0.3, 2.2) * outK(t, [4.8, 5.0]), { size: 22, col: ICE, bar: ICE })
    const labels = [['PROMOTION', T.l1], ['SAVINGS', T.l2], ['PEAK', T.l3]]
    labels.forEach(([s, at], i) => chip(x, LEDGE[i][0] - 200 + i * 20, LEDGE[i][1] + 10, s, pop01(t, at, 0.25, 2.6) * outK(t, T.h1Out), { size: 24, col: GOLD, rot: -0.05 }))
    chip(x, 600, 700, 'whoosh', pop01(t, T.wind, 0.25, 2.4) * outK(t, [T.wind + 1.0, T.wind + 1.2]), { size: 24, col: ICE, bar: ICE })
    if (t > T.card[0]) {
      const k = ease.outBack(prog(t, ...T.card)), o = popOut(t, T.out)
      drawCard(x, K.img.talk4, 560, lerp(1400, 900, k) + 6 * Math.sin(t * 2), 170 * o, lerp(0.5, 0.05, k))
    }
    sparkles(x, t, 560, 900, T.card[1], 12, 140, 2, [GOLD, PINK, BONE])
  },
  heads: [
    { text: 'Denver, in a | snow *globe.*', at: -1, lateAt: -0.6, out: T.h0Out, accentColor: ICE },
    { text: 'Promotion. Savings. | *Peak.*', at: T.h1, lateAt: T.l3, out: T.h1Out, size: 82, accentColor: GOLD },
    { text: "Someone's at | *base camp.*", at: T.h2, lateAt: T.wave + 0.2, out: T.h2Out, late: 2, accentColor: '#ff8fb1' },
    { text: "Don't climb | *alone.*", at: T.h3, lateAt: T.h3 + 0.4, out: T.out, accentColor: PINK },
  ],
  boxes: [
    { open: 0.8, close: 12.8, lines: [
      { t: 1.0, who: 'lead', text: "I'll date when I reach *the top.*" },
      { t: 6.0, who: 'lead', text: 'almost there. *focus.*' },
      { t: 10.3, who: 'stars', text: "babe. the view's better *with someone.*" },
    ] },
    { open: 17.0, close: 22.4, lines: [
      { t: 17.2, who: 'partner', text: "cocoa? it's *still warm.*" },
      { t: 19.0, who: 'lead', text: "…the view's nicer *from here.*" },
    ] },
  ],
  cuts: [T.h1Out[1] - 0.6, { t: T.cut, kind: 'flip' }, T.h2Out[1]],
  music: { style: 'screwed', key: 'Fm', seed: 2424, drop: T.h1, breakdown: [T.cut], lift: [T.sled[0]], hits: [T.l3, T.h3] },
  cues: [
    ['pop', T.l1, 659.25, 0.04, 0], ['pop', T.l2, 880, 0.04, 0], ['pop', T.l3, 1174.66, 0.045, 0], ['bell', T.l3 + 0.1, 1760, 0.03, 1, 0],
    ['whoosh', T.wind, 1.2, 0.05], ['whoosh', T.wind + 1.4, 1.2, 0.04], ['pop', T.starsIn, 739.99, 0.035, 0.4],
    ['pop', T.wave, 987.77, 0.035, -0.3], ['pop', T.wave + 0.35, 987.77, 0.035, -0.3],
    ['riser', T.sled[0], T.sled[1], 0.03], ['whoosh', T.sled[0], 1.4, 0.05], ['tick', T.sled[1], 0.05],
    ['pluck', T.share, 1174.66, 0.04, 0.5, 0], ['glitter', 19.6, 20.1],
    ['whoosh', T.card[0], 0.4, 0.04], ['pluck', T.card[1], 1318.51, 0.04, 0.6, 0.2],
  ],
})
