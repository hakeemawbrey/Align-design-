// nsge22 · Remix: Snow Globe Cities · "Minneapolis: the skyway" (28 s vertical, music: synthwave · C#m) · story 0–25.6,
// then the shared end card. Look: ../nsge15/globekit.js. Rows: promo/films/next30/b17.md.
//   0.00–5.2   "Minneapolis, in a | snow *globe.*"  Two towers joined by a glass skyway (the skyways really link downtown
//              buildings). ♏ Scorpio in sunglasses peers down from it: "I don't do outside." ♋ Cancer walks by below:
//              "…but they do." Scorpio ducks behind the wall.
//   5.4–13.0   "Every day. | *Same* crush."  Cancer passes again (duck), and a third time, looks up and waves (Scorpio drops
//              out of sight). THE STARS: "mysterious is cute. saying it is cuter."
//  13.4        card cut.
//  13.55–20.8 "Take the | *stairs.*"  Scorpio walks out of the skyway, down the stairs into the snow, and the sunglasses
//              come off: "hi. I'm the one in the skyway." CANCER: "I know! you duck every day."
//  21.0–25.5   "Come down from | the *skyway.*"  A talk card ("Morning person or night owl?"). Pisces fountains.
import { globeFilm, G, GOLD, BONE, INK, PINK, ICE, pop01, outK, popOut, inR, walk, drawBits, heart, sparkles, chip, drawCard, drawChar, starFrame, inSprite } from '../../nsge15/globekit.js'
import { clamp, lerp, prog, ease } from '../../../src/lib.js'

const T = {
  h0Out: [5.0, 5.2], pass: [[0.2, 3.8], [5.6, 8.2], [8.4, 10.8]], wave: 9.5,
  h1: 5.4, h1Out: [12.85, 13.05], starsIn: 10.7, cut: 13.4,
  h2: 13.55, h2Out: [20.7, 20.9], exit: [14.0, 15.9], shades: 16.0, love: 19.9,
  h3: 21.0, card: [21.6, 22.1], out: [25.1, 25.45],
}
const GY = G.ground - 62, SKY_Y = 858
const SCO = t => walk(t, [[T.exit[0], 520, SKY_Y], [14.5, 770, SKY_Y], [15.4, 790, GY], [T.exit[1], 720, GY]])
const ducking = t => { let d = 0; T.pass.forEach(([a, b], i) => { const mid = lerp(a, b, 0.45); d = Math.max(d, clamp(Math.min(prog(t, mid - 0.6, mid - 0.3), 1 - prog(t, mid + 0.6, mid + 0.9))) * (i === 2 ? 1.25 : 0.85)) }); return t > T.exit[0] ? 0 : d }
function canX(t) {
  for (const [a, b] of T.pass) if (inR(t, a, b)) { const k = prog(t, a, b); return lerp(1000, 80, k) }
  if (t >= T.cut) return walk(t, [[T.exit[0], 80, 0], [15.6, 470, 0]])[0]
  return -400
}

function skyline(x, t) {
  // far towers
  for (const [bx, h, w] of [[220, 300, 90], [430, 360, 80], [650, 330, 90], [870, 280, 80]]) { x.fillStyle = '#1e2448'; x.fillRect(bx - w / 2, 1100 - h, w, h); x.fillStyle = 'rgba(255,224,138,0.4)'; for (let r = 0; r < h / 40; r++) for (let c = 0; c < 3; c++) if ((r * 3 + c + bx) % 4) x.fillRect(bx - w / 2 + 12 + c * 24, 1100 - h + 16 + r * 40, 10, 14) }
  // the two near towers
  for (const [x0, x1] of [[150, 320], [740, 930]]) {
    x.fillStyle = INK; x.fillRect(x0, 690, x1 - x0, 500); x.fillStyle = '#3a4a7a'; x.fillRect(x0 + 4, 694, x1 - x0 - 8, 496)
    for (let r = 0; r < 11; r++) for (let c = 0; c < 4; c++) { x.fillStyle = (r + c * 3 + Math.floor(t * 0.3)) % 5 ? '#ffe08a' : '#24305a'; x.fillRect(x0 + 18 + c * ((x1 - x0 - 30) / 4), 710 + r * 44, 22, 26) }
    x.fillStyle = '#e9f2ff'; x.fillRect(x0, 684, x1 - x0, 10)
  }
  // the outdoor stairs down the right tower
  x.strokeStyle = INK; x.lineWidth = 12; x.beginPath(); x.moveTo(760, 960); x.lineTo(820, 1020); x.lineTo(760, 1080); x.lineTo(820, 1150); x.stroke()
  x.strokeStyle = '#9aa6c8'; x.lineWidth = 6; x.beginPath(); x.moveTo(760, 960); x.lineTo(820, 1020); x.lineTo(760, 1080); x.lineTo(820, 1150); x.stroke()
}
function skyway(x, t, K) {
  // back: dark interior
  x.fillStyle = INK; x.fillRect(316, 776, 430, 192); x.fillStyle = '#2a2050'; x.fillRect(320, 780, 422, 184)
  // Scorpio inside the skyway
  if (t < 14.5) {
    const d = ducking(t)
    const F = drawChar(x, t, { sign: 'scorpio', x: t < T.exit[0] ? 520 : SCO(t)[0], y: SKY_Y + 90 * d, s: 150, mood: d > 0.5 ? 'wide' : t > T.starsIn + 0.6 ? 'squint' : 'neutral', look: [0, 1], seed: 10, hops: K.HOPS.lead.filter(h => h < 13) })
    if (F) inSprite(x, F, () => shades(x))
  }
  // the glass + mullions + the opaque lower wall (hides a duck)
  x.fillStyle = 'rgba(160,210,255,0.16)'; x.fillRect(320, 780, 422, 140)
  x.fillStyle = INK; for (let i = 0; i < 6; i++) x.fillRect(320 + i * 84, 780, 5, 140)
  x.fillStyle = INK; x.fillRect(316, 916, 430, 52); x.fillStyle = '#5a6a9a'; x.fillRect(320, 920, 422, 44); x.fillStyle = '#e9f2ff'; x.fillRect(316, 768, 430, 12)
  x.fillStyle = 'rgba(255,255,255,0.35)'; x.fillRect(340, 786, 60, 6)
}
const shades = x => { x.fillStyle = INK; x.fillRect(7.5, 15.5, 21, 5.5); x.fillStyle = '#1b1236'; x.fillRect(8, 16, 9, 4.5); x.fillRect(19, 16, 9, 4.5); x.fillStyle = 'rgba(255,255,255,0.7)'; x.fillRect(9, 16.6, 2.5, 1); x.fillRect(20, 16.6, 2.5, 1) }

export const { DURATION, SCENES, CUES, MUSIC } = globeFilm({
  id: 'nsge22', plate: 'Minneapolis', lead: 'scorpio', partner: 'cancer',
  sky: { top: '#0a0b2a', bot: '#2b2050', glow: '#ff6ad5' },
  shakes: [-0.25],
  skyline,
  back(x, t, K) { skyway(x, t, K) },
  cast(t, K) {
    const out = []
    const cx = canX(t)
    if (cx > -200) {
      let cm = 'happy', cl = [-1, 0]
      if (inR(t, T.wave - 0.4, T.wave + 1)) { cm = 'sparkle'; cl = [0, -1] }
      if (t > 15.6) { cm = t < T.love ? 'happy' : 'heart'; cl = [-1, 0] }
      out.push({ sign: 'cancer', x: cx, y: GY, s: 176, mood: cm, look: t > 15.6 ? [1, 0] : cl, hops: [T.wave, T.wave + 0.35, T.love + 0.1, 22.6, ...K.HOPS.partner], seed: 8, hat: '#ff8fb1' })
    }
    if (t >= 14.5) {
      const [sx, sy] = SCO(t)
      out.push({ sign: 'scorpio', x: sx, y: sy, s: 182, mood: t < T.shades ? 'neutral' : t < 18.4 ? 'happy' : t < T.love ? 'wide' : 'heart', look: [-1, 0], seed: 10, hops: [T.exit[1], T.shades + 0.05, T.love, 22.4, ...K.HOPS.lead] })
    }
    return out
  },
  front(x, t) {
    if (t >= 14.5) {
      const [sx, sy] = SCO(t)
      const F = starFrame(sx, sy, 182, t, { seed: 10 })
      const off = prog(t, T.shades, T.shades + 0.6)
      if (off < 1) { x.save(); x.translate(0, -off * 260); x.globalAlpha = 1 - off; inSprite(x, F, () => shades(x)); x.restore() }
    }
    if (t > T.love && t < T.out[1]) for (let i = 0; i < 3; i++) { const tt = t - T.love - i * 0.4; if (tt > 0 && tt < 2.4) heart(x, 600 + 26 * Math.sin(tt * 3 + i), GY - 150 - tt * 70, 6, i % 2 ? '#ff4f86' : '#ff8fb1', { alpha: 1 - tt / 2.4 }) }
  },
  stars(t) {
    const k = pop01(t, T.starsIn, 0.4, 2.1) * popOut(t, T.out)
    return { x: 925, y: 650, s: 125, mood: t < T.cut ? 'squint' : t > T.love ? 'sparkle' : 'happy', look: [-1, 0.7], pop: k }
  },
  pisces(t) {
    return { x: 126, y: 1200, s: 150, mood: inR(t, T.wave, T.wave + 1.2) ? 'wide' : t > T.love ? 'happy' : 'sparkle', look: [1, -0.3], tears: t < 3.0 ? 1 : t < T.love ? 2 : 3, hops: [T.wave + 0.2, T.love + 0.2] }
  },
  over(x, t, K) {
    chip(x, 530, 740, 'SKYWAY', pop01(t, 0.4, 0.3, 2.2) * outK(t, T.h1Out), { size: 24, col: ICE, bar: ICE })
    T.pass.forEach(([a, b], i) => chip(x, 600, 1000, ['duck', 'duck', 'DUCK!!'][i], pop01(t, lerp(a, b, 0.45) - 0.35, 0.2, 2.6) * outK(t, [lerp(a, b, 0.45) + 0.6, lerp(a, b, 0.45) + 0.8]), { size: 28, col: '#ff6ad5', bar: '#ff6ad5', rot: (i - 1) * 0.08 }))
    chip(x, canX(T.wave) + 10, 990, 'hi!', pop01(t, T.wave, 0.25, 2.6) * outK(t, [T.wave + 0.9, T.wave + 1.1]), { size: 28, col: '#ff8fb1', bar: '#ff8fb1' })
    if (t > T.card[0]) {
      const k = ease.outBack(prog(t, ...T.card)), o = popOut(t, T.out)
      drawCard(x, K.img.talk2, 600, lerp(1400, 850, k) + 6 * Math.sin(t * 2), 170 * o, lerp(0.5, 0.05, k))
    }
    sparkles(x, t, 600, 850, T.card[1], 12, 140, 2, [GOLD, PINK, BONE])
  },
  heads: [
    { text: 'Minneapolis, in a | snow *globe.*', at: -1, lateAt: -0.6, out: T.h0Out, accentColor: '#ff6ad5' },
    { text: 'Every day. | *Same* crush.', at: T.h1, lateAt: T.h1 + 0.35, out: T.h1Out, accentColor: '#ff8fb1' },
    { text: 'Take the | *stairs.*', at: T.h2, lateAt: T.h2 + 0.35, out: T.h2Out, accentColor: ICE },
    { text: 'Come down from | the *skyway.*', at: T.h3, lateAt: T.h3 + 0.45, out: T.out, accentColor: PINK },
  ],
  boxes: [
    { open: 0.8, close: 12.8, lines: [
      { t: 1.0, who: 'lead', text: "I don't do *outside.*" },
      { t: 2.7, who: 'lead', text: '…but *they* do.' },
      { t: 6.3, who: 'lead', text: "don't look. don't look. *don't look.*" },
      { t: 10.95, who: 'stars', text: 'mysterious is cute. *saying it* is cuter.' },
    ] },
    { open: 15.9, close: 22.3, lines: [
      { t: 16.1, who: 'lead', text: "hi. I'm the one in *the skyway.*" },
      { t: 18.4, who: 'partner', text: 'I know! you *duck* every day.' },
    ] },
  ],
  cuts: [T.h1Out[1] - 0.6, { t: T.cut, kind: 'flip' }, T.h2Out[1]],
  music: { style: 'synthwave', key: 'C#m', seed: 2222, drop: T.h1, breakdown: [T.cut], lift: [T.shades], hits: [T.h3] },
  cues: [
    ...T.pass.map(([a, b]) => ['whoosh', lerp(a, b, 0.45) - 0.35, 0.3, 0.04]),
    ['pop', T.wave, 1174.66, 0.04, 0.3], ['pop', T.wave + 0.35, 1318.51, 0.035, 0.3], ['pop', T.starsIn, 739.99, 0.035, 0.4],
    ...Array.from({ length: 6 }, (_, i) => ['tick', +(14.6 + i * 0.15).toFixed(2), 0.03]),
    ['whoosh', T.shades, 0.4, 0.035], ['bell', T.shades + 0.1, 1567.98, 0.03, 0.8, 0],
    ['pluck', T.love, 1174.66, 0.04, 0.5, 0], ['glitter', T.love, T.love + 0.5],
    ['whoosh', T.card[0], 0.4, 0.04], ['pluck', T.card[1], 1318.51, 0.04, 0.6, 0.2],
  ],
})
