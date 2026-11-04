// nsge21 · Remix: Snow Globe Cities · "Kyoto: the perfect garden" (30 s vertical, music: pop · E) · story 0–25.6, then
// the shared end card. Look: ../nsge15/globekit.js. Rows: promo/films/next30/b17.md.
//   0.00–5.2   "Kyoto, in a | snow *globe.*"  A snowy temple roof with curved eaves, a stone lantern, a raked garden.
//              ♎ Libra mid-rake, every line perfect: "everything's perfect." → "…so why am I alone?"
//   5.4–13.0   "Then: | *footprints.*"  A trail of footprints crosses the lines. Then a second. Then a third, in a
//              wobbly zig-zag. LIBRA: "WHO is walking on my lines?!" THE STARS: "perfect is lonely, babe."
//  13.4        card cut.
//  13.55–20.8 "Follow the | *footprints.*"  Libra follows them to ♐ Sagittarius, holding a rake: "sorry! I wanted to see
//              the garden." LIBRA: "…want to rake with me?" Two new lines curve in from each of them and meet.
//  21.0–25.5   "Perfect is lonely. | Let someone *in.*"  A talk card ("What does a perfect lazy Sunday look like for
//              you?"). Pisces fountains.
import { globeFilm, G, GOLD, BONE, INK, PINK, ICE, pop01, outK, popOut, inR, walk, drawBits, heart, sparkles, chip, drawCard } from '../../nsge15/globekit.js'
import { clamp, lerp, prog, ease } from '../../../src/lib.js'

const T = {
  h0Out: [5.0, 5.2],
  h1: 5.4, h1Out: [12.85, 13.05], prints: [[5.9, 6.9], [7.0, 7.9], [8.0, 8.7]], starsIn: 10.3, cut: 13.4,
  h2: 13.55, h2Out: [20.7, 20.9], follow: [13.9, 15.3], meet: [19.2, 20.6],
  h3: 21.0, card: [21.6, 22.1], out: [25.1, 25.45],
}
const GY = G.ground - 62
const LIB_X = t => walk(t, [[T.follow[0], 330, 0], [T.follow[1], 500, 0]])[0]
const SAG_X = 800

function skyline(x, t) {
  // pines and a far hill
  x.fillStyle = '#1e2a4e'; x.beginPath(); x.moveTo(140, 1060); x.quadraticCurveTo(540, 860, 940, 1060); x.fill()
  for (const [px, s] of [[220, 1], [880, 0.9], [740, 0.7]]) { x.fillStyle = '#1a3a3a'; for (let i = 0; i < 4; i++) x.fillRect(px - (60 - i * 12) * s, 980 - i * 40 * s, (120 - i * 24) * s, 36 * s); x.fillStyle = '#e9f2ff'; for (let i = 0; i < 4; i++) x.fillRect(px - (60 - i * 12) * s, 980 - i * 40 * s, (120 - i * 24) * s, 8 * s) }
  // the temple: dark wood, red posts, a curved roof heavy with snow
  x.fillStyle = INK; x.fillRect(330, 900, 380, 200); x.fillStyle = '#4a2a20'; x.fillRect(334, 904, 372, 196)
  for (let i = 0; i < 6; i++) { x.fillStyle = '#c0392b'; x.fillRect(344 + i * 70, 930, 16, 170) }
  x.fillStyle = '#ffcf70'; for (let i = 0; i < 5; i++) x.fillRect(372 + i * 70, 950, 30, 60)
  const roof = (y, w, h) => { x.fillStyle = INK; x.beginPath(); x.moveTo(520 - w / 2 - 30, y + 10); x.quadraticCurveTo(520 - w / 2, y - 6, 520 - w / 2 + 40, y - 10); x.lineTo(520 + w / 2 - 40, y - 10); x.quadraticCurveTo(520 + w / 2, y - 6, 520 + w / 2 + 30, y + 10); x.lineTo(520 + w / 2 - 20, y - h); x.lineTo(520 - w / 2 + 20, y - h); x.closePath(); x.fill()
    x.fillStyle = '#e9f2ff'; x.beginPath(); x.moveTo(520 - w / 2 - 22, y + 2); x.quadraticCurveTo(520 - w / 2, y - 12, 520 - w / 2 + 40, y - 18); x.lineTo(520 + w / 2 - 40, y - 18); x.quadraticCurveTo(520 + w / 2, y - 12, 520 + w / 2 + 22, y + 2); x.lineTo(520 + w / 2 - 24, y - h + 6); x.lineTo(520 - w / 2 + 24, y - h + 6); x.closePath(); x.fill() }
  roof(905, 440, 70); x.fillStyle = INK; x.fillRect(420, 790, 200, 50); x.fillStyle = '#4a2a20'; x.fillRect(424, 794, 192, 46); roof(800, 280, 60)
  // stone lantern
  drawBits(x, ['.SSSSS.', 'SSSSSSS', '..SSS..', '..SYS..', '..SSS..', '...S...', '...S...', '.SSSSS.'], { S: '#8a8496', Y: '#ffcf70' }, 860, 1080, 12)
}
// the raked lines: gentle arcs across the garden, with the footprint trails over them
function garden(x, t) {
  x.strokeStyle = 'rgba(150,170,210,0.9)'; x.lineWidth = 4
  for (let i = 0; i < 6; i++) { const y = G.ground + 6 + i * 22; x.beginPath(); x.moveTo(150, y); x.quadraticCurveTo(540, y - 14, 930, y); x.stroke() }
  // footprints: three trails, the third a zig-zag
  const trails = [[[900, 1250], [600, 1180]], [[920, 1210], [560, 1260]], [[930, 1230], [600, 1220]]]
  T.prints.forEach(([a, b], k) => {
    const n = 9, [p0, p1] = trails[k]
    for (let i = 0; i < n; i++) {
      const f = i / (n - 1), at = lerp(a, b, f)
      if (t < at) continue
      const zz = k === 2 ? 26 * Math.sin(i * 1.7) : (i % 2 ? 10 : -10)
      const px = lerp(p0[0], p1[0], f), py = lerp(p0[1], p1[1], f) - 8 * Math.sin(Math.PI * f) + zz
      x.fillStyle = '#6f7fae'; x.fillRect(px - 9, py - 6, 18, 12); x.fillRect(px - 6, py - 10, 12, 4)
    }
  })
  // the new pattern: two curves drawn from each of them, meeting in the middle
  const m = prog(t, ...T.meet)
  if (m > 0) {
    x.strokeStyle = '#ffcf70'; x.lineWidth = 6; x.lineCap = 'round'
    for (const [sx, dir] of [[LIB_X(t), 1], [SAG_X, -1]]) {
      x.beginPath()
      for (let i = 0; i <= 40 * m; i++) { const f = i / 40, px = sx + dir * f * (650 - sx * dir * 0 - (dir > 0 ? sx : 0) + (dir > 0 ? 0 : -SAG_X + 660)) * 0 + lerp(sx, 660, f), py = G.ground + 60 + 36 * Math.sin(f * Math.PI * 2) * dir; i ? x.lineTo(px, py) : x.moveTo(px, py) }
      x.stroke()
    }
    if (m >= 1) heart(x, 660, G.ground + 60, 5, '#ff4f86')
  }
}
const RAKE = (x, cx, cy, rot) => { x.save(); x.translate(cx, cy); x.rotate(rot); x.fillStyle = INK; x.fillRect(-5, -150, 10, 160); x.fillStyle = '#c8955a'; x.fillRect(-3, -148, 6, 156); x.fillStyle = INK; x.fillRect(-40, 4, 80, 12); x.fillStyle = '#a6743f'; x.fillRect(-38, 6, 76, 8); for (let i = 0; i < 6; i++) { x.fillStyle = INK; x.fillRect(-36 + i * 14, 14, 6, 14) } x.restore() }

export const { DURATION, SCENES, CUES, MUSIC } = globeFilm({
  id: 'nsge21', plate: 'Kyoto', lead: 'libra', partner: 'sagittarius',
  sky: { top: '#0b0f2e', bot: '#2a2e5a', glow: '#ffcf70' },
  shakes: [-0.25],
  skyline,
  back(x, t) { garden(x, t) },
  cast(t, K) {
    let lm = 'sparkle', ll = [0, 1]
    if (t > 3.0) { lm = 'neutral'; ll = [1, -0.5] }
    T.prints.forEach(([a]) => { if (inR(t, a + 0.2, a + 1.0)) { lm = 'wide'; ll = [1, 0.5] } })
    if (t > T.prints[2][1]) { lm = 'squint'; ll = [1, 0] }
    if (t > T.starsIn + 0.4) { lm = 'neutral'; ll = [1, -1] }
    if (t > T.cut) { lm = 'neutral'; ll = [1, 0.5] }
    if (t > T.follow[1]) lm = 'wide'
    if (t > 17.0) lm = 'happy'
    if (t > T.meet[1]) lm = 'heart'
    return [
      t > T.follow[0] - 0.2 ? { sign: 'sagittarius', x: SAG_X, y: GY, s: 180, mood: t < 17.0 ? 'squint' : t < T.meet[1] ? 'happy' : 'sparkle', look: [-1, 0], pop: pop01(t, T.follow[0] - 0.2, 0.4, 2), hops: [T.meet[1], 22.6, ...K.HOPS.partner], seed: 13, hat: '#a07bff' } : null,
      { sign: 'libra', x: LIB_X(t), y: GY, s: 186, mood: lm, look: ll, hops: [0.0, 1.2, 2.4, ...T.prints.map(p => p[0] + 0.3), T.follow[1], T.meet[1] + 0.05, 22.4, ...K.HOPS.lead], seed: 5, hat: '#c9a6ff' },
    ]
  },
  front(x, t) {
    const rake = inR(t, 0, 5.4) || t > T.meet[0] - 0.3 ? 0.25 * Math.sin(t * 5) : 0
    RAKE(x, LIB_X(t) + 98, GY + 30, 0.35 + rake)
    if (t > T.follow[0]) RAKE(x, SAG_X - 98, GY + 30, -0.35 + (t > T.meet[0] - 0.3 ? 0.25 * Math.sin(t * 5 + 1) : 0))
    if (t > T.meet[1] && t < T.out[1]) for (let i = 0; i < 3; i++) { const tt = t - T.meet[1] - i * 0.4; if (tt > 0 && tt < 2.4) heart(x, 660 + 26 * Math.sin(tt * 3 + i), GY - 150 - tt * 70, 6, i % 2 ? '#ff4f86' : '#ff8fb1', { alpha: 1 - tt / 2.4 }) }
  },
  stars(t) {
    const k = pop01(t, T.starsIn, 0.4, 2.1) * popOut(t, T.out)
    return { x: 925, y: 650, s: 125, mood: t < T.cut ? 'squint' : t > T.meet[1] ? 'sparkle' : 'happy', look: [-1, 0.7], pop: k }
  },
  pisces(t) {
    return { x: 126, y: 1200, s: 150, mood: inR(t, T.prints[2][0], T.prints[2][1] + 0.8) ? 'wide' : t > T.meet[1] ? 'happy' : 'sparkle', look: [1, -0.3], tears: t < 3.0 ? 1 : t < T.meet[1] ? 2 : 3, hops: [T.prints[2][0] + 0.3, T.meet[1] + 0.2] }
  },
  over(x, t, K) {
    T.prints.forEach(([a], i) => chip(x, 780 - i * 40, 1020 + i * 50, ['step', 'step step', 'step?!'][i], pop01(t, a + 0.1, 0.25, 2.6) * outK(t, [a + 0.9, a + 1.1]), { size: 26, col: ICE, bar: ICE, rot: (i - 1) * 0.1 }))
    if (t > T.card[0]) {
      const k = ease.outBack(prog(t, ...T.card)), o = popOut(t, T.out)
      drawCard(x, K.img.talk3, 660, lerp(1400, 860, k) + 6 * Math.sin(t * 2), 170 * o, lerp(0.5, 0.05, k))
    }
    sparkles(x, t, 660, 860, T.card[1], 12, 140, 2, [GOLD, PINK, BONE])
  },
  heads: [
    { text: 'Kyoto, in a | snow *globe.*', at: -1, lateAt: -0.6, out: T.h0Out, accentColor: '#c9a6ff' },
    { text: 'Then: | *footprints.*', at: T.h1, lateAt: T.prints[0][0], out: T.h1Out, accentColor: ICE },
    { text: 'Follow the | *footprints.*', at: T.h2, lateAt: T.h2 + 0.4, out: T.h2Out, accentColor: '#a07bff' },
    { text: 'Perfect is lonely. | Let someone *in.*', at: T.h3, lateAt: T.h3 + 0.5, out: T.out, size: 90, accentColor: PINK },
  ],
  boxes: [
    { open: 0.8, close: 12.8, lines: [
      { t: 1.0, who: 'lead', text: "everything's *perfect.*" },
      { t: 3.0, who: 'lead', text: '…so why am I *alone?*' },
      { t: 8.85, who: 'lead', text: 'WHO is walking on my *lines?!*' },
      { t: 10.6, who: 'stars', text: 'perfect is *lonely,* babe.' },
    ] },
    { open: 15.4, close: 22.3, lines: [
      { t: 15.6, who: 'partner', text: 'sorry! I wanted to see *the garden.*' },
      { t: 18.0, who: 'lead', text: '…want to rake *with me?*' },
    ] },
  ],
  cuts: [T.h1Out[1] - 0.6, { t: T.cut, kind: 'flip' }, T.h2Out[1]],
  music: { style: 'pop', key: 'E', seed: 2121, drop: T.h1, breakdown: [T.cut], lift: [T.meet[0]], hits: [T.h3] },
  cues: [
    ...T.prints.flatMap(([a, b], k) => Array.from({ length: 9 }, (_, i) => ['tick', +lerp(a, b, i / 8).toFixed(2), 0.02 + k * 0.006])),
    ...T.prints.map(([a]) => ['pop', a + 0.3, 1318.51, 0.035, 0]),
    ['pop', T.starsIn, 739.99, 0.035, 0.4], ['whoosh', T.follow[0], 0.5, 0.03],
    ['riser', T.meet[0], T.meet[1], 0.025], ['bell', T.meet[1], 1760, 0.035, 1.0, 0], ['glitter', T.meet[1], T.meet[1] + 0.5],
    ['whoosh', T.card[0], 0.4, 0.04], ['pluck', T.card[1], 1318.51, 0.04, 0.6, 0.2],
  ],
})
