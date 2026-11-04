// nsge27 · Remix: Snow Globe Cities · "Ottawa: your pace" (30 s vertical, music: pop · C) · story 0–25.6, then the shared
// end card. Look: ../nsge15/globekit.js. Rows: promo/films/next30/b17.md.
//   0.00–5.2   "Ottawa, in a | snow *globe.*"  A tall clock tower with a green copper roof on the hill, and the canal frozen
//              into a skateway (it really is, every winter it's cold enough). ♊ Gemini zooms past on skates, mid-sentence:
//              "so anyway my day was a lot, so—" ♉ Taurus skates slowly in the middle.
//   5.4–13.0   "Zoom. | *Zoom again.*"  Gemini laps Taurus twice more, still talking: "…and then! wait, where'd you go?"
//              THE STARS: "babe. you keep lapping them."
//  13.4        card cut.
//  13.55–20.8 "Slow down. | *Speed up.*"  Gemini brakes in a spray of ice; Taurus speeds up a little; they skate side by
//              side. TAURUS: "hi. I skate slow." GEMINI: "…tell me everything." (Gemini listens.)
//  21.0–25.5   "Skate *beside* them, | not past."  A talk card ("Planned date or spontaneous date?"). Pisces fountains.
import { globeFilm, G, GOLD, BONE, INK, PINK, ICE, pop01, outK, popOut, inR, walk, drawBits, heart, sparkles, chip, drawCard, bubble } from '../../nsge15/globekit.js'
import { clamp, lerp, prog, ease } from '../../../src/lib.js'

const T = {
  h0Out: [5.0, 5.2], pass: [[-0.7, 1.9], [5.6, 6.9], [7.5, 8.6]],
  h1: 5.4, h1Out: [12.85, 13.05], starsIn: 9.2, cut: 13.4,
  h2: 13.55, h2Out: [20.7, 20.9], brake: [13.9, 15.0], pair: 15.0, love: 19.6,
  h3: 21.0, card: [21.6, 22.1], out: [25.1, 25.45],
}
const GY = G.ground - 62
const drift = t => (t > T.pair ? 30 * Math.sin((t - T.pair) * 0.9) : 0)
function gemX(t) {
  for (const [a, b] of T.pass) if (inR(t, a, b)) return lerp(-120, 1200, prog(t, a, b))
  if (t >= T.brake[0]) return lerp(-120, 420, ease.outCubic(prog(t, ...T.brake))) + drift(t)
  return -400
}
const tauX = t => (t < T.cut ? 520 + 30 * Math.sin(t * 0.6) : lerp(520 + 30 * Math.sin(T.cut * 0.6), 640, ease.inOutCubic(prog(t, T.cut, T.pair))) + drift(t))

function skyline(x, t) {
  x.fillStyle = '#2a3366'; x.beginPath(); x.moveTo(140, 1060); x.quadraticCurveTo(540, 900, 940, 1060); x.fill()
  // the long gothic building + the tall clock tower
  x.fillStyle = INK; x.fillRect(250, 930, 560, 140); x.fillStyle = '#b9a98f'; x.fillRect(254, 934, 552, 136)
  x.fillStyle = '#3f8a6a'; x.beginPath(); x.moveTo(246, 936); x.lineTo(530, 896); x.lineTo(814, 936); x.fill()
  for (let i = 0; i < 9; i++) { x.fillStyle = (i + Math.floor(t * 0.4)) % 4 ? '#ffe08a' : '#6a5a3a'; x.fillRect(272 + i * 60, 960, 18, 30); x.fillRect(272 + i * 60, 1012, 18, 30) }
  x.fillStyle = INK; x.fillRect(486, 720, 92, 300); x.fillStyle = '#c4b49a'; x.fillRect(490, 724, 84, 296)
  x.fillStyle = INK; x.beginPath(); x.arc(532, 800, 30, 0, Math.PI * 2); x.fill(); x.fillStyle = '#f4e8cc'; x.beginPath(); x.arc(532, 800, 25, 0, Math.PI * 2); x.fill()
  x.strokeStyle = INK; x.lineWidth = 4; x.beginPath(); x.moveTo(532, 800); x.lineTo(532, 782); x.moveTo(532, 800); x.lineTo(546, 806); x.stroke()
  x.fillStyle = INK; x.beginPath(); x.moveTo(478, 726); x.lineTo(532, 600); x.lineTo(586, 726); x.fill(); x.fillStyle = '#3f8a6a'; x.beginPath(); x.moveTo(488, 722); x.lineTo(532, 614); x.lineTo(576, 722); x.fill()
  x.fillStyle = '#e9f2ff'; x.fillRect(486, 714, 92, 8)
}
function canal(x) {
  // the frozen canal across the ground: pale blue ice with skate scratches
  x.fillStyle = '#a9d4f5'; x.fillRect(140, G.ground - 6, 800, 90)
  x.fillStyle = '#d6efff'; x.fillRect(140, G.ground - 6, 800, 10)
  x.strokeStyle = 'rgba(255,255,255,0.7)'; x.lineWidth = 3
  for (let i = 0; i < 7; i++) { x.beginPath(); x.moveTo(170 + i * 110, G.ground + 30 + (i % 3) * 14); x.quadraticCurveTo(220 + i * 110, G.ground + 22 + (i % 3) * 14, 260 + i * 110, G.ground + 34 + (i % 3) * 14); x.stroke() }
}
const skates = (x, cx, cy, s = 1) => { for (const d of [-1, 1]) { x.fillStyle = INK; x.fillRect(cx + d * 34 * s - 26 * s, cy, 52 * s, 16 * s); x.fillStyle = '#f4f8ff'; x.fillRect(cx + d * 34 * s - 22 * s, cy + 2 * s, 44 * s, 8 * s); x.fillStyle = '#cfd6ec'; x.fillRect(cx + d * 34 * s - 26 * s, cy + 14 * s, 54 * s, 5 * s) } }

export const { DURATION, SCENES, CUES, MUSIC } = globeFilm({
  id: 'nsge27', plate: 'Ottawa', lead: 'gemini', partner: 'taurus',
  sky: { top: '#0b1236', bot: '#2b3266', glow: '#a9d4f5' },
  shakes: [-0.25],
  skyline,
  back(x, t) {
    canal(x)
    // speed lines behind Gemini while zooming
    const gx = gemX(t)
    if (T.pass.some(([a, b]) => inR(t, a, b))) for (let i = 0; i < 4; i++) { x.fillStyle = 'rgba(255,255,255,0.6)'; x.fillRect(gx - 160 - i * 40, GY - 40 + i * 24, 90, 5) }
    if (inR(t, T.brake[1] - 0.4, T.brake[1] + 0.4)) for (let i = 0; i < 8; i++) { const p = prog(t, T.brake[1] - 0.4, T.brake[1] + 0.4); x.fillStyle = `rgba(214,239,255,${1 - p})`; x.fillRect(gx + 80 + i * 10 * p * 3, GY + 60 - i * 8 * p * 3 + p * 40, 8, 8) }
  },
  cast(t, K) {
    const gx = gemX(t)
    let gm = 'sparkle', gl = [1, 0]
    if (t > T.pass[1][1]) { gm = 'wide'; gl = [-1, 0] }
    if (t > T.starsIn + 0.6) { gm = 'neutral'; gl = [1, -1] }
    if (t > T.cut) { gm = 'squint'; gl = [1, 0] }
    if (t > T.brake[1]) gm = 'happy'
    if (t > 17.6) gm = 'sparkle'
    if (t > T.love) gm = 'heart'
    let tm = 'happy', tl = [-1, 0]
    if (T.pass.some(([a, b]) => inR(t, a + 0.3, b + 0.3))) { tm = 'wide'; tl = [1, 0] }
    if (t > T.pass[2][1] + 0.4) { tm = 'eyeroll'; tl = undefined }
    if (t > T.starsIn + 0.4) { tm = 'neutral'; tl = [-1, 0] }
    if (t > T.brake[1]) { tm = 'happy'; tl = [-1, 0] }
    if (t > T.love) tm = 'sparkle'
    return [
      { sign: 'taurus', x: tauX(t), y: GY, s: 180, mood: tm, look: tl, hops: [T.love + 0.1, 22.6, ...K.HOPS.partner], seed: 9, hat: '#d8484a' },
      gx > -300 ? { sign: 'gemini', x: gx, y: GY - (T.pass.some(([a, b]) => inR(t, a, b)) ? 10 : 0), s: 184, mood: gm, look: gl, squash: T.pass.some(([a, b]) => inR(t, a, b)) ? -0.06 : 0, hops: [T.brake[1], T.love, 22.4, ...K.HOPS.lead], seed: 4, hat: '#ffe27a' } : null,
    ]
  },
  front(x, t) {
    skates(x, tauX(t), GY + 58)
    const gx = gemX(t); if (gx > -300) skates(x, gx, GY + 58)
    // Gemini's talk trail while zooming
    const words = ['so anyway', 'my day', 'was a LOT', 'and then', 'okay so', 'ANOTHER thing']
    T.pass.forEach(([a, b], k) => { if (!inR(t, a, b + 1.0)) return; for (let i = 0; i < 2; i++) { const at = lerp(a, b, 0.3 + i * 0.3); const k2 = pop01(t, at, 0.2, 2.6) * outK(t, [at + 0.8, at + 1.0]); bubble(x, gemX(Math.min(at, b - 0.01)), GY - 170 - i * 50, words[(k * 2 + i) % words.length], k2, { size: 24 }) } })
    if (t > T.love && t < T.out[1]) for (let i = 0; i < 3; i++) { const tt = t - T.love - i * 0.4; if (tt > 0 && tt < 2.4) heart(x, 530 + drift(t) + 26 * Math.sin(tt * 3 + i), GY - 160 - tt * 70, 6, i % 2 ? '#ff4f86' : '#ff8fb1', { alpha: 1 - tt / 2.4 }) }
  },
  stars(t) {
    const k = pop01(t, T.starsIn, 0.4, 2.1) * popOut(t, T.out)
    return { x: 925, y: 650, s: 125, mood: t < T.cut ? 'eyeroll' : t > T.love ? 'sparkle' : 'happy', look: [-1, 0.7], pop: k }
  },
  pisces(t) {
    return { x: 126, y: 1200, s: 150, mood: T.pass.some(([a, b]) => inR(t, a, b)) ? 'wide' : t > T.love ? 'happy' : 'sparkle', look: [1, -0.3], tears: t < 3 ? 1 : t < T.love ? 2 : 3, hops: [T.pass[2][0] + 0.3, T.love + 0.2] }
  },
  over(x, t, K) {
    chip(x, 760, 1120, 'THE CANAL SKATEWAY', pop01(t, 0.4, 0.3, 2.2) * outK(t, [4.8, 5.0]), { size: 22, col: ICE, bar: ICE })
    ;[['LAP', T.pass[1][0] + 0.5], ['LAP!', T.pass[2][0] + 0.4]].forEach(([s, at], i) => chip(x, 380 + i * 300, 860 + i * 30, s, pop01(t, at, 0.25, 2.6) * outK(t, [at + 1.0, at + 1.2]), { size: 28, col: '#ffe27a', bar: '#ffe27a', rot: (i ? 0.08 : -0.08) }))
    chip(x, 420, 880, 'SCREECH', pop01(t, T.brake[1] - 0.3, 0.2, 2.6) * outK(t, [T.brake[1] + 0.6, T.brake[1] + 0.8]), { size: 28 })
    if (t > T.card[0]) {
      const k = ease.outBack(prog(t, ...T.card)), o = popOut(t, T.out)
      drawCard(x, K.img.talk6, 530 + drift(t), lerp(1400, 860, k) + 6 * Math.sin(t * 2), 170 * o, lerp(0.5, 0.05, k))
    }
    sparkles(x, t, 530, 860, T.card[1], 12, 140, 2, [GOLD, PINK, BONE])
  },
  heads: [
    { text: 'Ottawa, in a | snow *globe.*', at: -1, lateAt: -0.6, out: T.h0Out, accentColor: ICE },
    { text: 'Zoom. | *Zoom again.*', at: T.h1, lateAt: T.pass[1][0] + 0.3, out: T.h1Out, late: 2, accentColor: '#ffe27a' },
    { text: 'Slow down. | *Speed up.*', at: T.h2, lateAt: T.brake[1] - 0.1, out: T.h2Out, late: 2, accentColor: '#ff8a6a' },
    { text: 'Skate *beside* them, | not past.', at: T.h3, lateAt: T.h3 + 0.45, out: T.out, late: 0, size: 90, accentColor: PINK },
  ],
  boxes: [
    { open: 0.8, close: 12.8, lines: [
      { t: 1.0, who: 'lead', text: 'so anyway my day was *a lot,* so—' },
      { t: 7.0, who: 'lead', text: "…and then! wait, *where'd you go?*" },
      { t: 9.5, who: 'stars', text: 'babe. you keep *lapping* them.' },
    ] },
    { open: 15.4, close: 22.3, lines: [
      { t: 15.6, who: 'partner', text: 'hi. I skate *slow.*' },
      { t: 17.6, who: 'lead', text: '…tell me *everything.*' },
    ] },
  ],
  cuts: [T.h1Out[1] - 0.6, { t: T.cut, kind: 'flip' }, T.h2Out[1]],
  music: { style: 'pop', key: 'C', seed: 2727, drop: T.h1, breakdown: [T.cut], lift: [T.brake[1]], hits: [T.h3] },
  cues: [
    ...T.pass.filter(([a]) => a > 0).map(([a, b]) => ['whoosh', a + (b - a) * 0.3, 0.6, 0.05]), ['whoosh', 0.05, 0.6, 0.04],
    ['pop', T.starsIn, 739.99, 0.035, 0.4],
    ['riser', T.brake[0], T.brake[1], 0.02], ['tick', T.brake[1] - 0.2, 0.05], ['glitter', T.brake[1] - 0.3, T.brake[1] + 0.3],
    ['pluck', T.love, 1174.66, 0.04, 0.5, 0], ['glitter', T.love, T.love + 0.5],
    ['whoosh', T.card[0], 0.4, 0.04], ['pluck', T.card[1], 1318.51, 0.04, 0.6, 0.2],
  ],
})
