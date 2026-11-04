// nsge20 · Remix: Snow Globe Cities · "Prague: on the dot" (28 s vertical, music: funk · Gm) · story 0–25.6, then the short 2.4 s end card (no card cut; CHANGE 4 Nov); was the
// shared end card. Look: ../nsge15/globekit.js. Rows: promo/films/next30/b17.md.
//   0.00–5.2   "Prague, in a | snow *globe.*"  Red roofs, twin spires, and the old astronomical clock tower. ♍ Virgo with a
//              clipboard (ON TIME), pen raised: "date starts when the clock strikes." THE STARS: "fun fact: this clock has
//              the zodiac on it." (true: its dial carries a zodiac ring)
//   5.4–9.5    "The figures | *parade.*"  Little figures pass the windows over the dial. VIRGO: "their spacing is uneven."
//   9.7–13.0   "The clock strikes. | *No* date."  Bong, bong, bong. Nobody. "they're four seconds late." Virgo spirals.
//  13.4        card cut.
//  13.55–20.8 "Then they | *slide in.*"  ♐ Sagittarius skids in on the snow with two cocoas: "sorry! I brought cocoa?"
//              THE STARS: "love isn't on a schedule, babe." Virgo crosses out ON TIME and writes WORTH IT.
//  21.0–25.5   "Some things are | worth *waiting for.*"  A talk card ("Morning person or night owl?"). Pisces fountains.
import { globeFilm, G, GOLD, BONE, INK, PINK, ICE, MONO, pop01, outK, popOut, inR, walk, drawBits, heart, sparkles, chip, drawCard } from '../../nsge15/globekit.js'
import { SIGNS } from '../../wheel.js'
import { clamp, lerp, prog, ease } from '../../../src/lib.js'

const T = {
  h0Out: [5.0, 5.2], starsIn: 3.0,
  h1: 5.4, h1Out: [9.35, 9.55], parade: [5.8, 9.0],
  h1b: 9.7, h1bOut: [12.85, 13.05], bongs: [9.75, 10.35, 10.95], spiral: [11.9, 12.9], cut: 13.4,
  h2: 13.55, h2Out: [20.7, 20.9], sag: [14.0, 15.1], strike: 19.6, write: [19.9, 20.6],
  h3: 21.0, card: [21.6, 22.1], out: [25.1, 25.45],
}
const GY = G.ground - 62
const CLK = { x: 600, y: 900, r: 96 }
const SAG_X = t => walk(t, [[T.sag[0], 1150, 0], [T.sag[1], 690, 0]])[0]

function skyline(x, t) {
  // red roofs and twin spires
  x.fillStyle = INK; x.fillRect(160, 700, 140, 400); x.fillStyle = '#4a4560'
  for (const sx of [180, 250]) { x.fillStyle = INK; x.fillRect(sx - 4, 760, 58, 340); x.fillStyle = '#4a4560'; x.fillRect(sx, 764, 50, 336); x.fillStyle = INK; x.beginPath(); x.moveTo(sx - 8, 766); x.lineTo(sx + 25, 640); x.lineTo(sx + 58, 766); x.fill(); x.fillStyle = '#3a3550'; x.beginPath(); x.moveTo(sx, 762); x.lineTo(sx + 25, 656); x.lineTo(sx + 50, 762); x.fill(); x.fillStyle = GOLD; x.fillRect(sx + 21, 626, 8, 16) }
  x.fillStyle = '#ffd98a'; x.fillRect(196, 820, 16, 24); x.fillRect(266, 820, 16, 24)
  const R = [[330, 120], [420, 90], [780, 110], [870, 90]]
  for (const [hx, h] of R) { x.fillStyle = INK; x.fillRect(hx - 46, 1100 - h - 4, 92, h + 4); x.fillStyle = '#e8d8b8'; x.fillRect(hx - 42, 1100 - h, 84, h); x.fillStyle = '#c9472f'; x.beginPath(); x.moveTo(hx - 52, 1100 - h); x.lineTo(hx, 1100 - h - 50); x.lineTo(hx + 52, 1100 - h); x.fill(); x.fillStyle = '#e9f2ff'; x.fillRect(hx - 30, 1100 - h - 30, 60, 8); x.fillStyle = '#ffd98a'; x.fillRect(hx - 20, 1100 - h + 24, 14, 20); x.fillRect(hx + 6, 1100 - h + 24, 14, 20) }
  // the clock tower
  x.fillStyle = INK; x.fillRect(500, 640, 200, 470); x.fillStyle = '#8f8676'; x.fillRect(504, 644, 192, 466)
  x.fillStyle = INK; x.beginPath(); x.moveTo(494, 646); x.lineTo(600, 560); x.lineTo(706, 646); x.fill(); x.fillStyle = '#3a3550'; x.beginPath(); x.moveTo(504, 642); x.lineTo(600, 572); x.lineTo(696, 642); x.fill()
  // the two windows where the figures pass
  x.fillStyle = INK; x.fillRect(530, 700, 50, 60); x.fillRect(620, 700, 50, 60)
  const lit = inR(t, T.parade[0], T.parade[1] + 0.3)
  x.fillStyle = lit ? '#ffcf70' : '#2a2040'; x.fillRect(534, 704, 42, 52); x.fillRect(624, 704, 42, 52)
  if (lit) for (let i = 0; i < 6; i++) {
    const ph = (t - T.parade[0]) * 0.9 - i * 0.55
    for (const [wx, off] of [[534, 0], [624, 0.5]]) { const p = ph - off; if (p > 0 && p < 1) { const fx = wx + p * 42; drawBits(x, ['.H.', 'RRR', 'RRR', '.R.'], { H: '#f0d0a8', R: ['#3f7cf0', '#d8484a', '#5fd38a', '#c9a6ff', '#f29a4a', '#e8628a'][i] }, fx, 735, 7) } }
  }
  // the dial: blue sky disc, gold ring of hours, an offset zodiac ring, gold hands
  const { x: cx, y: cy, r } = CLK
  x.fillStyle = INK; x.beginPath(); x.arc(cx, cy, r + 8, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#2b5fae'; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#6a3a28'; x.beginPath(); x.arc(cx, cy + 34, r * 0.55, 0, Math.PI); x.fill()
  x.strokeStyle = GOLD; x.lineWidth = 8; x.beginPath(); x.arc(cx, cy, r - 4, 0, Math.PI * 2); x.stroke()
  for (let i = 0; i < 24; i++) { const a = i / 24 * Math.PI * 2; x.fillStyle = GOLD; x.fillRect(cx + Math.cos(a) * (r - 4) - 3, cy + Math.sin(a) * (r - 4) - 3, 6, 6) }
  const zx = cx + 12, zy = cy - 16, zr = 52, za = t * 0.25
  x.strokeStyle = '#f2c75c'; x.lineWidth = 4; x.beginPath(); x.arc(zx, zy, zr, 0, Math.PI * 2); x.stroke()
  SIGNS.forEach((s, i) => { const a = za + i / 12 * Math.PI * 2; x.fillStyle = s.color; x.fillRect(zx + Math.cos(a) * zr - 4, zy + Math.sin(a) * zr - 4, 8, 8) })
  const bongK = T.bongs.reduce((m, b) => Math.max(m, t > b && t < b + 0.25 ? 1 - (t - b) / 0.25 : 0), 0)
  x.strokeStyle = GOLD; x.lineWidth = 6; x.beginPath(); x.moveTo(cx, cy); x.lineTo(cx + Math.cos(t * 0.6 - 1.57) * 70, cy + Math.sin(t * 0.6 - 1.57) * 70); x.stroke()
  x.lineWidth = 8; x.beginPath(); x.moveTo(cx, cy); x.lineTo(cx, cy - 50 - 8 * bongK); x.stroke()
  x.fillStyle = GOLD; x.beginPath(); x.arc(cx, cy, 9, 0, Math.PI * 2); x.fill()
  if (bongK > 0) { x.strokeStyle = `rgba(255,230,160,${bongK})`; x.lineWidth = 5; x.beginPath(); x.arc(cx, cy, r + 30 * (1 - bongK) + 16, 0, Math.PI * 2); x.stroke() }
}
function clipboard(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(-0.06)
  x.fillStyle = INK; x.fillRect(-84, -104, 168, 208); x.fillStyle = '#8c5638'; x.fillRect(-80, -100, 160, 200)
  x.fillStyle = '#f4f8ff'; x.fillRect(-68, -80, 136, 172); x.fillStyle = '#cfd6ec'; x.fillRect(-30, -110, 60, 22)
  x.font = `700 21px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillStyle = INK
  x.fillText('ON TIME', -54, -46)
  const st = prog(t, T.strike, T.strike + 0.3)
  if (st > 0) { x.fillStyle = '#d8283c'; x.fillRect(-64, -48, 130 * st, 5) }
  const w = prog(t, ...T.write)
  if (w > 0) { x.save(); x.beginPath(); x.rect(-64, -20, 128 * w, 60); x.clip(); x.fillStyle = '#d8283c'; x.font = `700 24px ${MONO}`; x.fillText('WORTH IT', -60, 12); x.restore() }
  x.fillStyle = '#cfd6ec'; for (let i = 0; i < 3; i++) x.fillRect(-60, 46 + i * 18, 110, 4)
  x.restore()
}

export const { DURATION, SCENES, CUES, MUSIC } = globeFilm({
  id: 'nsge20', plate: 'Prague', lead: 'virgo', partner: 'sagittarius',
  sky: { top: '#0b0d2e', bot: '#2e2450', glow: '#ffcf70' },
  shakes: [-0.25],
  skyline,
  cast(t, K) {
    let vm = 'neutral', vl = [1, -1]
    if (inR(t, T.parade[0], T.parade[1])) { vm = 'squint'; vl = [1, -1] }
    if (t > T.bongs[0]) { vm = 'wide'; vl = [-1, 0] }
    if (t > T.bongs[2] + 0.5) { vm = 'squint'; vl = [1, 0] }
    if (inR(t, T.spiral[0], T.cut)) { vm = 'eyeroll'; vl = undefined }
    if (t > T.sag[0]) { vm = 'wide'; vl = [1, 0] }
    if (t > 16.4) vm = 'neutral'
    if (t > T.write[0]) vm = 'happy'
    if (t > T.write[1]) vm = 'heart'
    const sx = inR(t, T.spiral[0], T.spiral[1]) ? 330 + 30 * Math.sin((t - T.spiral[0]) * 18) : 330
    return [
      t > T.sag[0] ? { sign: 'sagittarius', x: SAG_X(t), y: GY, s: 182, mood: t < T.sag[1] + 0.3 ? 'wide' : t < T.write[1] ? 'happy' : 'sparkle', look: [-1, 0], squash: inR(t, T.sag[0], T.sag[1]) ? -0.1 : 0, hops: [T.sag[1], T.write[1] + 0.1, 22.6, ...K.HOPS.partner], seed: 13, hat: '#a07bff' } : null,
      { sign: 'virgo', x: sx, y: GY, s: 186, mood: vm, look: vl, hops: [0.0, ...T.bongs.map(b => b + 0.02), T.sag[1] + 0.05, T.write[1], 22.4, ...K.HOPS.lead], seed: 7, hat: '#5fd38a' },
    ]
  },
  front(x, t) {
    // Sag's two cocoas (one handed over)
    if (t > T.sag[0]) {
      const give = ease.inOutCubic(prog(t, 17.0, 17.5))
      drawBits(x, ['.S.S.', 'MMMM.', 'MMMMH', 'MMMMH', 'MMMM.'], { M: '#f4f8ff', H: '#f4f8ff', S: 'rgba(255,255,255,0.6)' }, SAG_X(t) - 96, GY - 6, 8)
      drawBits(x, ['.S.S.', 'MMMM.', 'MMMMH', 'MMMMH', 'MMMM.'], { M: '#ff8fb1', H: '#ff8fb1', S: 'rgba(255,255,255,0.6)' }, lerp(SAG_X(t) + 96, 440, give), GY - 6, 8)
    }
    if (t > T.write[1] && t < T.out[1]) for (let i = 0; i < 3; i++) { const tt = t - T.write[1] - i * 0.4; if (tt > 0 && tt < 2.4) heart(x, 510 + 26 * Math.sin(tt * 3 + i), GY - 150 - tt * 70, 6, i % 2 ? '#ff4f86' : '#ff8fb1', { alpha: 1 - tt / 2.4 }) }
  },
  stars(t) {
    const k = pop01(t, T.starsIn, 0.4, 2.1) * popOut(t, T.out)
    return { x: 925, y: 650, s: 125, mood: t < 5 ? 'sparkle' : t < T.cut ? 'squint' : t > T.write[1] ? 'sparkle' : 'happy', look: [-1, 0.7], pop: k }
  },
  pisces(t) {
    return { x: 126, y: 1200, s: 150, mood: inR(t, T.bongs[2], T.bongs[2] + 1.4) ? 'wide' : t > T.write[1] ? 'happy' : 'sparkle', look: [1, -0.3], tears: t < T.parade[0] ? 1 : t < T.write[1] ? 2 : 3, hops: [T.bongs[2] + 0.2, T.write[1] + 0.2] }
  },
  over(x, t, K) {
    const ck = pop01(t, 0.6, 0.3, 2.2) * outK(t, [T.h1Out[0], T.h1Out[1]]) + pop01(t, T.strike - 0.5, 0.3, 2.2) * outK(t, [T.h3 + 0.4, T.h3 + 0.6]) + (inR(t, T.h1b, T.cut) ? pop01(t, T.bongs[2] + 0.4, 0.3, 2) * outK(t, [12.85, 13.0]) : 0)
    clipboard(x, t, 260, 760, clamp(ck))
    T.bongs.forEach((b, i) => chip(x, 720 + i * 40, 720 + i * 46, 'BONG', pop01(t, b, 0.2, 2.6) * outK(t, [b + 0.7, b + 0.9]), { size: 30, col: GOLD, rot: (i - 1) * 0.1 }))
    chip(x, 600, 1040, '12:00:04', pop01(t, 11.4, 0.25, 2.6) * outK(t, [12.85, 13.0]), { size: 28, col: '#ff6a6a', bar: '#ff4040' })
    if (t > T.card[0]) {
      const k = ease.outBack(prog(t, ...T.card)), o = popOut(t, T.out)
      drawCard(x, K.img.talk2, 760, lerp(1400, 840, k) + 6 * Math.sin(t * 2), 170 * o, lerp(0.5, 0.06, k))
    }
    sparkles(x, t, 760, 840, T.card[1], 12, 140, 2, [GOLD, PINK, BONE])
  },
  heads: [
    { text: 'Prague, in a | snow *globe.*', at: -1, lateAt: -0.6, out: T.h0Out, accentColor: '#ff8a6a' },
    { text: 'The figures | *parade.*', at: T.h1, lateAt: T.h1 + 0.35, out: T.h1Out, accentColor: GOLD },
    { text: 'The clock strikes. | *No* date.', at: T.h1b, lateAt: T.bongs[2] + 0.3, out: T.h1bOut, accentColor: '#ff6a6a' },
    { text: 'Then they | *slide in.*', at: T.h2, lateAt: T.sag[1] - 0.2, out: T.h2Out, late: 2, accentColor: '#a07bff' },
    { text: 'Some things are | worth *waiting for.*', at: T.h3, lateAt: T.h3 + 0.4, out: T.out, late: 2, size: 86, accentSize: 116, accentColor: PINK },
  ],
  boxes: [
    { open: 0.8, close: 12.8, lines: [
      { t: 1.0, who: 'lead', text: 'date starts when the clock *strikes.*' },
      { t: 3.3, who: 'stars', text: 'fun fact: this clock has *the zodiac* on it.' },
      { t: 6.4, who: 'lead', text: 'their spacing is *uneven.*' },
      { t: 11.2, who: 'lead', text: "they're *four seconds* late." },
    ] },
    { open: 15.3, close: 22.3, lines: [
      { t: 15.5, who: 'partner', text: 'sorry! I brought *cocoa?*' },
      { t: 17.9, who: 'stars', text: "love isn't on a *schedule,* babe." },
    ] },
  ],
  cuts: [T.h1Out[1], { t: T.cut, kind: 'flip' }, T.h2Out[1]],
  music: { style: 'funk', key: 'Gm', seed: 2020, drop: T.h1, breakdown: [T.cut], lift: [T.sag[1]], hits: [T.bongs[0], T.h3] },
  cues: [
    ['pop', T.starsIn, 739.99, 0.035, 0.4], ...Array.from({ length: 8 }, (_, i) => ['tick', +(T.parade[0] + i * 0.4).toFixed(2), 0.025]),
    ...T.bongs.map(b => ['bell', b, 392, 0.06, 1.6, 0]), ...T.bongs.map(b => ['tom', b, 98, { gain: 0.2, decay: 0.5 }]),
    ['pluck', T.spiral[0], 523.25, 0.03, 0.3, 0], ['pluck', T.spiral[0] + 0.25, 493.88, 0.03, 0.3, 0], ['pluck', T.spiral[0] + 0.5, 466.16, 0.03, 0.3, 0],
    ['whoosh', T.sag[0], 1.0, 0.045], ['tick', T.sag[1], 0.05],
    ['tick', T.strike, 0.04], ...Array.from({ length: 6 }, (_, i) => ['tick', +(T.write[0] + i * 0.11).toFixed(2), 0.015]), ['bell', T.write[1], 1760, 0.03, 1, 0],
    ['whoosh', T.card[0], 0.4, 0.04], ['pluck', T.card[1], 1318.51, 0.04, 0.6, 0.2],
  ],
})
