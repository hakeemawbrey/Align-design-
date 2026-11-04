// nsge28 · Remix: Snow Globe Cities · "Helsinki: when the snow settles" (28 s vertical, music: cinematic · Cm) · story
// 0–25.6, then the shared end card. The finale. Look: ../nsge15/globekit.js. Rows: promo/films/next30/b17.md.
//   0.00–5.2   "Helsinki, in a | snow *globe.*"  The white domed cathedral on its steps over the harbour. ♉ Taurus sits on
//              the steps as snow swirls; ♏ Scorpio across the square. "I'll make a move when the snow settles."
//   5.4–13.0   "Shake. | *Shake again.*"  THE STARS keep shaking the globe (three times). TAURUS: "…it's still swirling."
//              THE STARS: "babe. it never fully settles."
//  13.4        card cut.
//  13.55–20.8 "Walk over | *in the swirl.*"  Taurus walks over through the snow: "hi. it's snowing. a lot." SCORPIO: "I was
//              waiting for it to stop too."
//  21.0–25.5   "Don't wait for the | snow *to settle.*"  Pull back: a whole shelf of snow globes, every city of the
//              series glowing. Pisces at the glass fountains.
import { globeFilm, G, BASE, GOLD, BONE, INK, PINK, ICE, MONO, pop01, outK, popOut, inR, walk, drawBits, heart, sparkles, chip } from '../../nsge15/globekit.js'
import { clamp, lerp, prog, ease } from '../../../src/lib.js'

const T = {
  h0Out: [5.0, 5.2],
  h1: 5.4, h1Out: [12.85, 13.05], shakes: [5.8, 7.6, 9.4], starsIn: 5.3, cut: 13.4,
  h2: 13.55, h2Out: [20.7, 20.9], walk: [14.0, 15.6], love: 19.9,
  h3: 21.0, pull: [21.2, 23.0], out: [25.1, 25.45],
}
const GY = G.ground - 62
const TAU_X = t => walk(t, [[T.walk[0], 330, 0], [T.walk[1], 560, 0]])[0]
const TAU_Y = t => walk(t, [[T.walk[0], GY - 70, 0], [T.walk[0] + 0.6, GY, 0]])[0]

function skyline(x, t) {
  // harbour water
  x.fillStyle = '#1b2a56'; x.fillRect(140, 1040, 800, 50); for (let i = 0; i < 7; i++) { x.fillStyle = '#2e4a80'; x.fillRect(160 + i * 110 + 20 * Math.sin(t * 0.8 + i), 1060, 50, 4) }
  // the cathedral: white, columns, a green dome and four small domes, on wide steps
  const cx = 470
  x.fillStyle = INK; x.fillRect(cx - 170, 870, 340, 170); x.fillStyle = '#f2f0ea'; x.fillRect(cx - 166, 874, 332, 166)
  x.fillStyle = INK; x.beginPath(); x.moveTo(cx - 120, 876); x.lineTo(cx, 830); x.lineTo(cx + 120, 876); x.fill(); x.fillStyle = '#f2f0ea'; x.beginPath(); x.moveTo(cx - 110, 874); x.lineTo(cx, 838); x.lineTo(cx + 110, 874); x.fill()
  for (let i = 0; i < 6; i++) { x.fillStyle = '#d8d4c8'; x.fillRect(cx - 100 + i * 40, 880, 12, 150) }
  x.fillStyle = INK; x.fillRect(cx - 50, 760, 100, 80); x.fillStyle = '#f2f0ea'; x.fillRect(cx - 46, 764, 92, 76)
  x.fillStyle = INK; x.beginPath(); x.arc(cx, 764, 58, Math.PI, 0); x.fill(); x.fillStyle = '#4fae8e'; x.beginPath(); x.arc(cx, 764, 52, Math.PI, 0); x.fill()
  x.fillStyle = '#e9f2ff'; x.beginPath(); x.arc(cx, 764, 52, Math.PI * 1.15, Math.PI * 1.85); x.lineTo(cx, 740); x.fill()
  x.fillStyle = GOLD; x.fillRect(cx - 4, 690, 8, 26)
  for (const dx of [-140, 140]) { x.fillStyle = INK; x.beginPath(); x.arc(cx + dx, 872, 26, Math.PI, 0); x.fill(); x.fillStyle = '#4fae8e'; x.beginPath(); x.arc(cx + dx, 872, 22, Math.PI, 0); x.fill() }
  x.fillStyle = '#ffe08a'; for (let i = 0; i < 5; i++) x.fillRect(cx - 86 + i * 40, 930, 16, 30)
  // the wide steps
  for (let i = 0; i < 5; i++) { x.fillStyle = INK; x.fillRect(cx - 200 - i * 20, 1040 + i * 22, 400 + i * 40, 24); x.fillStyle = '#d8d4c8'; x.fillRect(cx - 196 - i * 20, 1042 + i * 22, 392 + i * 40, 18); x.fillStyle = '#f4f8ff'; x.fillRect(cx - 196 - i * 20, 1042 + i * 22, 392 + i * 40, 6) }
  // harbour buildings on the right
  for (const [bx, h, c] of [[760, 110, '#f2c75c'], [850, 90, '#e8a0a0']]) { x.fillStyle = INK; x.fillRect(bx - 44, 1040 - h, 88, h); x.fillStyle = c; x.fillRect(bx - 40, 1040 - h + 4, 80, h - 4); x.fillStyle = '#ffe08a'; x.fillRect(bx - 24, 1040 - h + 20, 14, 18); x.fillRect(bx + 10, 1040 - h + 20, 14, 18) }
}
// the shelf of every globe from the series (shown on the pull-back)
const CITIES = [['Reykjavik', '#1b3a66', '#5dffb0'], ['Quebec City', '#2a2f62', '#f5c46a'], ['Edinburgh', '#272a5a', '#8fb8ff'], ['Copenhagen', '#2b2652', '#ffb070'], ['Vienna', '#2c2450', '#ffd98a'], ['Prague', '#2e2450', '#ffcf70'],
  ['Kyoto', '#2a2e5a', '#ffcf70'], ['Minneapolis', '#2b2050', '#ff6ad5'], ['Sapporo', '#2a3060', '#8fb8ff'], ['Denver', '#2b3266', '#9fd8ff'], ['Montreal', '#2a2e60', '#ffb070'], ['Anchorage', '#2c2a60', '#ff9a70'], ['Ottawa', '#2b3266', '#a9d4f5']]
const SLOTS = [[-560, 0], [560, 0], [-1120, 0], [1120, 0], [-1120, 1180], [-560, 1180], [0, 1180], [560, 1180], [1120, 1180], [-840, 2360], [-280, 2360], [280, 2360], [840, 2360]]
const LEADS = ['aquarius', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aries', 'pisces', 'gemini']
function miniGlobe(x, t, dx, dy, [name, sky, glow], i, K) {
  x.save(); x.translate(dx, dy)
  const { cx, cy, R } = G
  x.fillStyle = '#120c26'; x.fillRect(cx - 300, BASE.bot, 600, 40)
  x.fillStyle = INK; x.beginPath(); x.moveTo(cx - 280, BASE.top); x.lineTo(cx + 280, BASE.top); x.lineTo(cx + 340, BASE.bot); x.lineTo(cx - 340, BASE.bot); x.fill()
  x.fillStyle = '#6b3d2a'; x.beginPath(); x.moveTo(cx - 270, BASE.top + 6); x.lineTo(cx + 270, BASE.top + 6); x.lineTo(cx + 330, BASE.bot - 4); x.lineTo(cx - 330, BASE.bot - 4); x.fill()
  x.fillStyle = '#d9b05a'; x.fillRect(cx - 200, (BASE.top + BASE.bot) / 2 - 36, 400, 72)
  x.font = `700 44px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = '#3a2410'; x.fillText(name.toUpperCase(), cx, (BASE.top + BASE.bot) / 2 + 2)
  const g = x.createLinearGradient(0, cy - R, 0, cy + R); g.addColorStop(0, '#16205a'); g.addColorStop(1, glow)
  x.fillStyle = INK; x.beginPath(); x.arc(cx, cy, R + 8, 0, Math.PI * 2); x.fill()
  x.fillStyle = g; x.beginPath(); x.arc(cx, cy, R, 0, Math.PI * 2); x.fill()
  const tw = 0.6 + 0.4 * Math.sin(t * 2 + i)
  const rg = x.createRadialGradient(cx, cy + 120, 0, cx, cy + 120, R); rg.addColorStop(0, glow); rg.addColorStop(1, 'rgba(0,0,0,0)')
  x.globalAlpha = 0.55 * tw; x.fillStyle = rg; x.beginPath(); x.arc(cx, cy, R, 0, Math.PI * 2); x.fill(); x.globalAlpha = 1
  x.save(); x.beginPath(); x.arc(cx, cy, R, 0, Math.PI * 2); x.clip()
  for (let k = 0; k < 40; k++) { x.fillStyle = 'rgba(255,255,255,0.8)'; x.fillRect(cx - R + ((k * 97 + i * 31) % (2 * R)), cy - R + ((k * 53 + t * 40 + i * 17) % (2 * R)), 8, 8) }
  x.fillStyle = '#e9f2ff'; x.beginPath(); x.ellipse(cx, G.ground + 160, R * 1.1, 170, 0, Math.PI, Math.PI * 2); x.fill(); x.fillRect(cx - R, G.ground + 150, 2 * R, R)
  x.restore()
  K.drawChar(x, t, { sign: LEADS[i], x: cx, y: G.ground - 90, s: 230, mood: i % 3 ? 'happy' : 'sparkle', seed: i + 2, hops: [T.pull[1] + 0.1 * (i % 5)] })
  x.strokeStyle = 'rgba(255,255,255,0.5)'; x.lineWidth = 14; x.beginPath(); x.arc(cx, cy, R - 34, Math.PI * 1.08, Math.PI * 1.32); x.stroke()
  x.restore()
}

export const { DURATION, SCENES, CUES, MUSIC } = globeFilm({
  id: 'nsge28', plate: 'Helsinki', lead: 'taurus', partner: 'scorpio',
  sky: { top: '#0a0f30', bot: '#2a2c5e', glow: '#9fd8ff' },
  shakes: [-0.25, ...T.shakes],
  settle: false,
  cam: t => { const k = ease.inOutCubic(prog(t, ...T.pull)); return { s: lerp(1, 0.42, k), x: 540, y: lerp(1000, 760, k) } },
  shelf(x, t, K) { if (t > T.pull[0]) CITIES.forEach((c, i) => miniGlobe(x, t, SLOTS[i][0], SLOTS[i][1], c, i, K)) },
  skyline,
  cast(t, K) {
    let tm = 'neutral', tl = [1, -1]
    if (T.shakes.some(s => inR(t, s, s + 0.9))) { tm = 'wide'; tl = [0, -1] }
    if (t > T.shakes[2] + 0.9) { tm = 'squint'; tl = [1, -1] }
    if (t > 10.3 + 1.2) { tm = 'neutral'; tl = [1, 0] }
    if (t > T.walk[0]) { tm = 'happy'; tl = [1, 0] }
    if (t > T.love) tm = 'heart'
    return [
      { sign: 'scorpio', x: 790, y: GY, s: 178, mood: t < 17.8 ? 'neutral' : t < T.love ? 'happy' : 'sparkle', look: [-1, t < T.walk[0] ? -0.6 : 0], hops: [T.walk[1] + 0.2, T.love + 0.1, 22.6, ...K.HOPS.partner], seed: 10 },
      { sign: 'taurus', x: TAU_X(t), y: TAU_Y(t), s: 184, mood: tm, look: tl, hops: [0.0, ...T.shakes.map(s => s + 0.05), T.walk[0] + 0.6, T.walk[1], T.love, 22.4, ...K.HOPS.lead], seed: 9, hat: '#d8484a' },
    ]
  },
  front(x, t) {
    if (t > T.love && t < T.out[1]) for (let i = 0; i < 3; i++) { const tt = t - T.love - i * 0.4; if (tt > 0 && tt < 2.4) heart(x, 675 + 26 * Math.sin(tt * 3 + i), GY - 160 - tt * 70, 6, i % 2 ? '#ff4f86' : '#ff8fb1', { alpha: 1 - tt / 2.4 }) }
  },
  stars(t) {
    const k = pop01(t, T.starsIn, 0.4, 2.1) * popOut(t, T.out)
    const sh = T.shakes.reduce((m, s) => m + (inR(t, s - 0.1, s + 0.5) ? Math.sin((t - s) * 40) * 18 * (1 - prog(t, s, s + 0.5)) : 0), 0)
    return { x: 925 + sh, y: 650, s: 125, mood: t < T.cut ? 'sparkle' : t > T.love ? 'sparkle' : 'happy', look: [-1, 0.7], pop: k, hops: T.shakes.map(s => s - 0.1) }
  },
  pisces(t) {
    return { x: 126, y: 1200, s: 150, mood: T.shakes.some(s => inR(t, s, s + 0.8)) ? 'wide' : t > T.love ? 'happy' : 'sparkle', look: [1, -0.3], tears: t < 3 ? 1 : t < T.love ? 2 : 3, hops: [T.shakes[2] + 0.1, T.love + 0.2, T.pull[1]] }
  },
  over(x, t) {
    T.shakes.forEach((s, i) => chip(x, 800 - i * 30, 560 + i * 60, ['shake', 'shake shake', 'SHAKE'][i], pop01(t, s, 0.2, 2.6) * outK(t, [s + 0.9, s + 1.1]), { size: 26, col: GOLD, rot: (i - 1) * 0.1 }))
    sparkles(x, t, 540, 900, T.pull[1], 16, 420, 2, [GOLD, ICE, PINK, BONE])
  },
  heads: [
    { text: 'Helsinki, in a | snow *globe.*', at: -1, lateAt: -0.6, out: T.h0Out, accentColor: ICE },
    { text: 'Shake. | *Shake again.*', at: T.h1, lateAt: T.shakes[1], out: T.h1Out, late: 2, accentColor: GOLD },
    { text: 'Walk over | *in the swirl.*', at: T.h2, lateAt: T.h2 + 0.4, out: T.h2Out, late: 3, accentColor: '#ff8fb1' },
    { text: "Don't wait for the | snow *to settle.*", at: T.h3, lateAt: T.h3 + 0.5, out: T.out, late: 2, size: 90, accentColor: PINK },
  ],
  boxes: [
    { open: 0.8, close: 12.8, lines: [
      { t: 1.0, who: 'lead', text: "I'll make a move when the snow *settles.*" },
      { t: 8.1, who: 'lead', text: "…it's *still* swirling." },
      { t: 10.3, who: 'stars', text: 'babe. it never fully *settles.*' },
    ] },
    { open: 15.8, close: 22.3, lines: [
      { t: 16.0, who: 'lead', text: "hi. it's snowing. *a lot.*" },
      { t: 17.9, who: 'partner', text: 'I was waiting for it to *stop* too.' },
    ] },
  ],
  cuts: [T.h1Out[1] - 0.6, { t: T.cut, kind: 'flip' }, T.h2Out[1]],
  music: { style: 'cinematic', key: 'Cm', seed: 2828, drop: T.h1, breakdown: [T.cut], lift: [T.walk[1]], hits: [T.pull[0], T.h3] },
  cues: [
    ['pop', T.starsIn, 739.99, 0.035, 0.4],
    ...Array.from({ length: 6 }, (_, i) => ['tick', +(T.walk[0] + i * 0.26).toFixed(2), 0.025]),
    ['pluck', T.love, 1174.66, 0.04, 0.5, 0], ['glitter', T.love, T.love + 0.5],
    ['riser', T.pull[0], T.pull[1], 0.035], ['whoosh', T.pull[0], 1.6, 0.04], ['bell', T.pull[1], 1567.98, 0.035, 1.6, 0], ['glitter', T.pull[1], T.pull[1] + 0.8],
  ],
})
