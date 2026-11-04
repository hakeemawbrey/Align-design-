// nc14e06: CUFFING SEASON, "Leo wants a winter photo partner" (35 s vertical, Season 14 ep 6, music: funk · A).
// Story 0–30.6, then the shared end card. The show look lives in ../../nc14e01/scenes/cuffkit.js.
//   0.0–8.0    "Leo is hiring | a *winter photo partner.*"  Frame 0: a snowy park, Leo mid-pose with a camera on a stick
//              next to a NOW HIRING: PHOTO PARTNER sign. Auditions: a snowman (FLASH, ★★☆ "a bit cold"), a lamp post
//              (FLASH, ★☆☆ "very still"), then Sagittarius wanders past: "you! stand there!" FLASH. The print: all Leo,
//              one purple tip in the corner.
//   8.0–15.6   "Great photos. | *Nobody* in them."  A wall of prints, every one of them Leo. LEO: "why do these feel kind of
//              *lonely*?"  Pisces sobs behind the prints.
//  15.6        card cut.
//  15.6–23.4   "Turn the camera | *around.*"  THE STARS: "you want a co-star?" → "get curious about *them*."  Leo turns the
//              camera on Sag, who's catching snowflakes and laughing. FLASH. The print develops. Sag: "wait. I look happy."
//  23.4–30.6   "Best shot | of the *season.*"  The two of them over the print; Sag snaps one of them both.
//              THE STARS: "Point the camera *at them* sometimes."
import {
  makeCuff, R, box, bubble, label, shadow, glow, sparkles, hearts, snowGround,
  pop01, outK, popOut, prog, lerp, clamp, ease, easeOutBack, INK, BONE, GOLD, ICE, PINK, RED, MINT, CREAM, signStar,
} from '../../nc14e01/scenes/cuffkit.js'
import { drawStarChar } from '../../nc14e01/scenes/cuffkit.js'

const T = {
  h0Out: [7.8, 8.0], f1: 1.7, f2: 3.6, sagIn: 4.9, standThere: 5.4, f3: 6.5,
  b2: 8.0, h1: 8.15, h1Out: [15.4, 15.6],
  cut: 15.6, h2: 15.75, h2Out: [23.2, 23.4], turn: 19.4, f4: 20.6, dev: [20.9, 22.0], happy: 21.9,
  b4: 23.4, h3: 23.55, f5: 26.6, last: 24.2,
}
const SP = 'THE STARS', LE = '♌︎ LEO'
const LEO = signStar('leo'), SAG = signStar('sagittarius')
const B1 = [{ t: 10.3, speaker: LE, color: '#ffc27a', text: 'why do these feel kind of *lonely*?' }]
const B2 = [
  { t: 16.0, speaker: SP, text: 'you want a *co-star*?' },
  { t: 17.6, speaker: SP, text: 'get curious about *them*.' },
]
const B3 = [{ t: T.last, speaker: SP, text: 'Point the camera *at them* sometimes.' }]
const FLASHES = [T.f1, T.f2, T.f3, T.f4, T.f5]

function park(x, t) {
  for (let i = 0; i < 5; i++) {
    const X = 60 + i * 240, Y = 1400, H = 520 + (i % 2) * 80
    R(x, '#3a2a2a', X - 10, Y - 120, 20, 120)
    for (let j = 0; j < 4; j++) { const w = 220 - j * 48, y = Y - 120 - j * (H - 120) / 4; x.fillStyle = '#183046'; x.beginPath(); x.moveTo(X - w / 2, y); x.lineTo(X + w / 2, y); x.lineTo(X, y - (H - 120) / 2.6); x.closePath(); x.fill(); R(x, '#e9f2ff', X - w / 2 + 10, y - 8, w - 20, 8) }
  }
  snowGround(x, 1400)
  void t
}
function snowman(x, cx, cy, s) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  for (const [r, y] of [[90, 0], [64, -130], [44, -230]]) { x.fillStyle = INK; x.beginPath(); x.arc(0, y, r + 6, 0, 7); x.fill(); x.fillStyle = '#f6f2ff'; x.beginPath(); x.arc(0, y, r, 0, 7); x.fill() }
  R(x, INK, -16, -244, 8, 8); R(x, INK, 10, -244, 8, 8); R(x, '#f39a3a', -4, -230, 30, 8)
  R(x, RED, -48, -190, 96, 16)
  x.restore()
}
function lamp(x, cx, cy, s) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  R(x, INK, -11, -420, 22, 420); R(x, '#5a5470', -5, -420, 10, 420); box(x, -40, -470, 80, 56, '#f7d27a', { b: 6 })
  x.restore()
  glow(x, cx, cy - 440 * s, 220 * s, 0.25)
}
function camera(x, cx, cy, s = 1, rot = 0) {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
  R(x, INK, -6, 20, 12, 110); box(x, -44, -30, 88, 60, '#2a2148', { b: 6 }); x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 20, 0, 7); x.fill(); x.fillStyle = '#7fd0ff'; x.beginPath(); x.arc(0, 0, 13, 0, 7); x.fill()
  R(x, BONE, 22, -26, 12, 8)
  x.restore()
}
/** a print: a white frame, a picture drawn by fn(x) in a 160×150 window, a caption */
function print(x, t, cx, cy, s, rot, fn, cap, { dev = 1, alpha = 1 } = {}) {
  if (s <= 0.01) return
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
  R(x, 'rgba(6,4,18,0.45)', -86, -86, 190, 230)
  box(x, -100, -100, 200, 236, BONE, { b: 5 })
  R(x, '#1d2550', -80, -80, 160, 150)
  x.save(); x.beginPath(); x.rect(-80, -80, 160, 150); x.clip(); fn(x); if (dev < 1) { x.globalAlpha = 1 - dev; R(x, '#2a2a3a', -80, -80, 160, 150) } x.restore()
  if (cap) label(x, cap, 0, 104, { size: 20, col: INK, font: 'Inter, sans-serif', weight: 800 })
  x.restore()
}
const mini = (id, cx, cy, s, mood = 'happy', t = 0) => x => drawStarChar(x, cx, cy, s, t, { color: signStar(id).color, mood, look: [0, 0], bob: 0, tips: false, glow: 0.4 })

function scene(x, t, K) {
  const ok = popOut(t, K.OUT)
  park(x, t)
  if (t < T.b2) {
    const ok1 = outK(t, [T.b2 - 0.15, T.b2])
    // the sign
    x.save(); x.translate(880, 900); x.rotate(0.04); R(x, INK, -8, 40, 16, 460); box(x, -150, -70, 300, 120, BONE, { b: 7 }); label(x, 'NOW HIRING:', 0, -32, { size: 30, col: RED, font: 'Inter, sans-serif', weight: 800 }); label(x, 'PHOTO PARTNER', 0, 14, { size: 30, col: INK, font: 'Inter, sans-serif', weight: 800 }); x.restore()
    // the auditionees
    const stage = t < T.f2 - 0.5 ? 0 : t < T.sagIn ? 1 : 2
    if (stage === 0) snowman(x, 680, 1380, 0.9)
    if (stage === 1) lamp(x, 680, 1400, 1)
    shadow(x, 400, 1400, 230)
    K.star(x, t, 'leo', { x: 400, y: 1260, s: 250, pop: ok1, mood: FLASHES.some(f => t > f && t < f + 0.4) ? 'wink' : 'sparkle', look: [0.4, -0.3], hops: [0.2, T.f1 - 0.1, T.f2 - 0.6, T.f2 - 0.1, T.standThere, T.f3 - 0.1], seed: 5, scarf: RED })
    camera(x, 300, 1040, 1, -0.3)
    if (stage === 2) {
      const w = ease.outCubic(prog(t, T.sagIn, T.sagIn + 0.6))
      K.star(x, t, 'sagittarius', { x: lerp(1200, 700, w), y: 1270, s: 220, mood: t > T.f3 ? 'wide' : 'neutral', look: [-1, 0], hops: [T.sagIn + 0.2, T.sagIn + 0.5, T.f3], seed: 13, scarf: GOLD })
      bubble(x, t, 400, 960, T.standThere, T.f3 + 0.3, 'you! stand there!', { size: 34 })
      bubble(x, t, 720, 1020, T.standThere + 0.5, T.f3 + 0.3, '…ok?', { size: 34, col: '#e6d6ff' })
    }
    // the prints pop out after each flash
    const P = [
      [T.f1, mini('leo', -30, 10, 110), '★★☆  a bit cold'],
      [T.f2, mini('leo', -20, 10, 110), '★☆☆  very still'],
      [T.f3, x2 => { mini('leo', 0, 10, 150)(x2); R(x2, SAG.color, 62, 40, 18, 30) }, 'is that a tip?'],
    ]
    P.forEach(([f, fn, cap], i) => {
      if (t < f + 0.2) return
      const k = easeOutBack(prog(t, f + 0.2, f + 0.6), 1.6), last = i === 2 || t < (P[i + 1] ? P[i + 1][0] + 0.2 : 99)
      if (!last) return
      print(x, t, 560, 700, 1.25 * k * ok1, -0.06 + i * 0.04, fn, cap)
    })
    K.pisces(x, t, { x: 150, y: 1610, s: 140, pop: pop01(t, 1.0, 0.3, 2) * ok1, scarf: ICE }, 1, 'wide', [1, -0.5])
    return
  }
  if (t < T.cut) {
    const ok2 = outK(t, [T.cut - 0.2, T.cut])
    x.save(); x.globalAlpha = 0.5; R(x, '#0b0a20', 0, 0, 1080, 1920); x.restore()
    // Pisces sobs behind the wall of prints
    
    const caps = ['me', 'me again', 'me (snow)', 'me + snowman', 'me + lamp', 'me + tip']
    for (let i = 0; i < 6; i++) {
      const k = easeOutBack(prog(t, T.b2 + 0.2 + i * 0.22, T.b2 + 0.55 + i * 0.22), 1.8) * ok2
      const cx = 220 + (i % 3) * 320, cy = 680 + Math.floor(i / 3) * 400
      const slide = 0
      print(x, t, cx + (i === 1 ? 0 : 0), cy - slide, 1.25 * k, ((i * 37) % 7 - 3) * 0.02, mini('leo', 0, 10, 130, i % 2 ? 'wink' : 'sparkle', t), caps[i])
    }
    K.pisces(x, t, { x: 930, y: 1390, s: 170, pop: pop01(t, T.b2 + 1.6, 0.35, 2) * ok2, scarf: ICE }, 3, 'sparkle', [-1, -0.6])
    K.star(x, t, 'leo', { x: 540, y: 1400, s: 200, pop: ok2, mood: t > 10.0 ? 'neutral' : 'happy', look: [0, -1], hops: K.hopsFor(LE), seed: 5, scarf: RED })
    return
  }
  // turn the camera around
  const fin = ease.inOutCubic(prog(t, T.b4, T.b4 + 0.7))
  K.stars(x, t, { x: 540, y: 680, s: 190, pop: pop01(t, T.cut + 0.15, 0.4, 2) * outK(t, [T.b4, T.b4 + 0.3]), mood: t > T.happy ? 'happy' : 'neutral', look: [0, 0.6], hops: K.hopsFor(SP) })
  const lx = lerp(320, 420, fin), sx = lerp(780, 640, fin)
  shadow(x, lx, 1400, 220 * ok); shadow(x, sx, 1400, 220 * ok)
  // Sag catches snowflakes, laughing
  const catchHops = [16.4, 17.2, 18.0, 18.8, 19.6, 20.2, T.happy]
  K.star(x, t, 'sagittarius', { x: sx, y: 1260, s: 230, pop: ok, mood: t > T.happy && t < T.b4 + 0.4 ? 'wide' : 'happy', look: t > T.b4 ? [-1, 0.6] : [0, -1], hops: [...catchHops, T.f5 - 0.1], seed: 13, scarf: GOLD })
  K.star(x, t, 'leo', { x: lx, y: 1260, s: 240, pop: ok, mood: t > T.b4 + 0.6 ? 'heart' : t > T.turn ? 'sparkle' : 'neutral', look: t > T.turn ? [1, 0] : [-1, 0], hops: [T.turn, T.f4 - 0.1, T.b4 + 0.6, T.f5 - 0.1], seed: 5, scarf: RED })
  const turn = ease.inOutCubic(prog(t, T.turn, T.turn + 0.4))
  if (t < T.b4) camera(x, lerp(lx - 140, lx + 150, turn), 990, 1, lerp(-0.3, 0.3, turn))
  // the print develops
  if (t > T.f4) {
    const k = easeOutBack(prog(t, T.f4 + 0.2, T.f4 + 0.6), 1.6)
    const dev = prog(t, ...T.dev)
    print(x, t, lerp(560, 530, fin), lerp(1000, 1060, fin), lerp(1.3, 1.05, fin) * k * ok, lerp(0.05, -0.04, fin), mini('sagittarius', 0, 10, 140, 'happy', 0), dev > 0.95 ? 'best one yet' : '', { dev })
    bubble(x, t, 820, 900, T.happy, T.b4 + 0.4, 'wait. I look happy.', { size: 34, col: '#e6d6ff' })
  }
  if (t > T.f5 - 0.6) camera(x, sx + 150, 980, 1, 0.3)
  if (t > T.f5 + 0.2) print(x, t, 820, 760, 1.05 * easeOutBack(prog(t, T.f5 + 0.2, T.f5 + 0.6), 1.6) * ok, 0.08, x2 => { mini('leo', -40, 14, 110)(x2); mini('sagittarius', 40, 14, 110)(x2) }, 'us')
  hearts(x, t, T.b4 + 0.6, 500, 1100, { n: 6 })
  K.pisces(x, t, { x: 150, y: 1610, s: 140, pop: ok, scarf: ICE }, t > T.f4 ? 3 : 2, 'sparkle', [1, -0.5])
}

const EP = makeCuff({
  id: 'nc14e06', duration: 35, ep: 6,
  heads: [
    { text: 'Leo is hiring | a *winter photo partner.*', at: -1.2, out: T.h0Out, size: 90, accent: '#ffc27a' },
    { text: 'Great photos. | *Nobody* in them.', at: T.h1, out: T.h1Out, size: 96 },
    { text: 'Turn the camera | *around.*', at: T.h2, out: T.h2Out, size: 96, accent: GOLD },
    { text: 'Best shot | of the *season.*', at: T.h3, out: [30.0, 30.3], size: 100, accent: PINK },
  ],
  boxes: [
    { lines: B1, open: 10.1, close: 15.2, y: 1540 },
    { lines: B2, open: 15.8, close: 20.3, y: 1540 },
    { lines: B3, open: T.last - 0.22, close: 29.9, y: 1540 },
  ],
  snow: 0.8,
  cuts: [T.b2, { t: T.cut, kind: 'flip' }, T.b4],
  flashes: [T.b2, ...FLASHES],
  ghost: { x: 60, y: 820, at: 12.6, from: 'right', cell: 3 },
  draw(x, t, K) { scene(x, t, K) },
  cues: [
    ...FLASHES.flatMap(f => [['tick', +(f - 0.02).toFixed(3), 0.08], ['pop', +(f + 0.2).toFixed(3), 1318.51, 0.035, 0], ['whoosh', +(f + 0.25).toFixed(3), 0.3, 0.025]]),
    ['pluck', T.f1 + 0.7, 659.25, 0.03, 0.4, 0], ['pluck', T.f2 + 0.7, 587.33, 0.03, 0.4, 0],
    ['whoosh', T.sagIn, 0.4, 0.035], ['pop', T.standThere, 1174.66, 0.045, -0.3], ['pop', T.standThere + 0.5, 880, 0.035, 0.3],
    ...Array.from({ length: 6 }, (_, i) => ['pop', +(T.b2 + 0.2 + i * 0.22).toFixed(3), [880, 987.77, 1174.66, 1318.51, 1174.66, 987.77][i], 0.03, (i % 3 - 1) * 0.5]),
    ['whoosh', T.b2 + 2.2, 0.35, 0.03], ['pluck', T.b2 + 2.6, 440, 0.035, 0.6, 0],
    ['whoosh', T.turn, 0.4, 0.035], ['riser', T.dev[0], T.dev[1], 0.015], ['bell', T.dev[1], 1760, 0.03, 1, 0], ['pop', T.happy, 987.77, 0.04, 0.3],
    ['pluck', T.b4 + 0.6, 1174.66, 0.04, 0.5, -0.2], ['glitter', T.f5 + 0.2, T.f5 + 0.6],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [LEO, MINT, CREAM, sparkles]
