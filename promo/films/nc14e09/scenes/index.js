// nc14e09: CUFFING SEASON, "Scorpio, all in or nothing" (35 s vertical, Season 14 ep 9, music: screwed · Fm).
// Story 0–30.6, then the shared end card. The show look lives in ../../nc14e01/scenes/cuffkit.js.
//   0.0–7.0    "Scorpio doesn't | do *casual.*"  Frame 0: a snowy street at night, Scorpio mid-stare, eyes lit, the snow
//              swirling round it. Gemini bounces up: "want to grab cocoa sometime?"  A soap-opera zoom on Scorpio.
//   7.0–15.0   "Cocoa? | Or *forever?*"  Scorpio's thought bubble fills: matching mittens, a calendar that says EVERY
//              WINTER, a little cabin. SCORPIO: "I'm in. all the way. *forever?*"  Gemini hops back: "…it's cocoa?"
//              Pisces sobs at the romance of it all.
//  15.0        card cut.
//  15.0–22.8   "All in is a | *gift.*"  THE STARS: "all in is a *gift*." → "you can still *start* with cocoa."  The thought
//              bubble pops. Scorpio, softer: "cocoa. yes. let's see where it goes."  Gemini: heart eyes.
//  22.8–30.6   "One sip | at a *time.*"  The two at a cocoa cart, a SIP 1 counter ticking up.
//              THE STARS: "Deep can still go *one sip* at a time."
import {
  makeCuff, R, box, bubble, label, shadow, glow, sparkles, hearts, mug, thought, snowGround, drawBits, HEART,
  pop01, outK, popOut, prog, lerp, clamp, ease, easeOutBack, INK, BONE, GOLD, ICE, PINK, RED, MINT, COCOA, signStar,
} from '../../nc14e01/scenes/cuffkit.js'

const T = {
  h0Out: [6.8, 7.0], gemIn: 1.8, ask: 2.5, zoom: [4.2, 5.4],
  b2: 7.0, h1: 7.15, h1Out: [14.8, 15.0], th: 7.4, items: [8.0, 9.2, 10.4], back: 13.0, itsCocoa: 13.4,
  cut: 15.0, h2: 15.15, h2Out: [22.6, 22.8], popTh: 19.4, soft: 19.9, gemHeart: 21.6,
  b4: 22.8, h3: 22.95, sips: [24.6, 26.2, 27.8], last: 23.8,
}
const SP = 'THE STARS', SC = '♏︎ SCORPIO'
const B1 = [{ t: 11.3, speaker: SC, color: '#ff8aa6', text: "I'm in. all the way. *forever?*" }]
const B2 = [
  { t: 15.4, speaker: SP, text: 'all in is a *gift*.' },
  { t: 17.1, speaker: SP, text: 'you can still *start* with cocoa.' },
]
const B3 = [{ t: T.last, speaker: SP, text: 'Deep can still go *one sip* at a time.' }]
const MITT = ['.MMM..', 'MMMM.M', 'MMMMMM', 'MMMMM.', 'MMMM..', 'WWWW..']

function street(x) {
  for (let i = 0; i < 5; i++) { const X = i * 230 - 40, h = 380 + (i * 77) % 200; R(x, '#1a1634', X, 1400 - h, 210, h); for (let j = 0; j < 3; j++) R(x, '#f7d27a', X + 40 + (j % 2) * 90, 1400 - h + 50 + j * 100, 30, 40) }
  snowGround(x, 1400)
}
function swirl(x, t, cx, cy, k) {
  if (k <= 0) return
  x.save(); x.globalAlpha = 0.8 * k
  for (let i = 0; i < 26; i++) { const a = t * 1.6 + i * 0.75, r = 150 + (i % 5) * 34; R(x, i % 3 ? '#f6f2ff' : ICE, cx + Math.cos(a) * r, cy + Math.sin(a) * r * 0.55, 8, 8) }
  x.restore()
}
function cabin(x, cx, cy, s) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  box(x, -60, -30, 120, 80, '#7b5634', { b: 5 })
  x.fillStyle = INK; x.beginPath(); x.moveTo(-80, -26); x.lineTo(0, -90); x.lineTo(80, -26); x.closePath(); x.fill()
  x.fillStyle = '#e9f2ff'; x.beginPath(); x.moveTo(-70, -32); x.lineTo(0, -82); x.lineTo(70, -32); x.closePath(); x.fill()
  R(x, '#f7d27a', -40, -10, 26, 26); R(x, INK, 10, 0, 26, 50); R(x, INK, 30, -96, 18, 40)
  x.restore()
}

function scene(x, t, K) {
  const ok = popOut(t, K.OUT)
  // soap zoom on the ask
  const zm = t > T.zoom[0] && t < T.b2 ? 1 + 0.15 * ease.outCubic(prog(t, ...T.zoom)) : 1
  x.save(); x.translate(540, 1180); x.scale(zm, zm); x.translate(-540, -1180)
  street(x)
  if (t < T.cut) {
    const ok1 = outK(t, [T.cut - 0.2, T.cut])
    const intense = t < T.back
    swirl(x, t, 380, 1180, intense ? 1 : 0.3)
    if (intense) glow(x, 380, 1150, 260, 0.2, '226,61,102')
    shadow(x, 380, 1400, 250)
    K.star(x, t, 'scorpio', { x: 380, y: 1230, s: 280, pop: ok1, mood: t < T.ask + 0.8 ? 'squint' : t < T.th ? 'wide' : 'sparkle', look: t < T.gemIn ? [0, 0] : [1, 0], blink: t < T.ask ? false : undefined, scarf: INK, stripe: RED, hops: [T.ask + 1.0, ...K.hopsFor(SC)], seed: 12 })
    const gx = lerp(1250, 790, ease.outCubic(prog(t, T.gemIn, T.gemIn + 0.6))) + (t > T.back ? 90 * ease.outBack(prog(t, T.back, T.back + 0.3)) : 0)
    K.star(x, t, 'gemini', { x: gx, y: 1240, s: 230, pop: ok1, mood: t < T.back ? 'happy' : 'wide', look: [-1, 0], scarf: PINK, hops: [T.gemIn + 0.3, T.gemIn + 0.6, T.ask, T.back], seed: 4 })
    bubble(x, t, 650, 980, T.ask, T.b2 - 0.1, 'want to grab cocoa sometime?', { size: 32, tail: 0.5 })
    if (t > T.zoom[0] && t < T.b2) label(x, '!!', 380, 900, { size: 80, col: RED, font: 'Inter, sans-serif', weight: 800 })
    // the thought bubble: mittens, calendar, cabin
    thought(x, t, 450, 720, 600, 300, T.th, T.cut, 380, 1060, (y) => {
      const k = i => easeOutBack(prog(t, T.items[i], T.items[i] + 0.35), 2)
      if (k(0) > 0.01) { drawBits(y, MITT, { M: RED, W: BONE }, -205, -10, 12 * k(0)); drawBits(y, MITT, { M: RED, W: BONE }, -130, -10, 12 * k(0), { sx: -1 }); label(y, 'matching', -168, 100, { size: 22, col: INK }) }
      if (k(1) > 0.01) { y.save(); y.scale(k(1), k(1)); box(y, -70, -80, 140, 150, BONE, { b: 5 }); R(y, RED, -70, -80, 140, 40); label(y, 'EVERY', 0, 6, { size: 22, col: INK, font: 'Inter, sans-serif', weight: 800 }); label(y, 'WINTER', 0, 36, { size: 22, col: INK, font: 'Inter, sans-serif', weight: 800 }); y.restore(); label(y, 'shared', 0, 100, { size: 22, col: INK }) }
      if (k(2) > 0.01) { cabin(y, 190, 0, 1.1 * k(2)); label(y, 'a cabin', 190, 100, { size: 22, col: INK }) }
    })
    bubble(x, t, 880, 1010, T.itsCocoa, T.cut - 0.1, '…it’s cocoa?', { size: 36, col: '#fff3b0' })
    K.pisces(x, t, { x: 150, y: 1620, s: 140, pop: pop01(t, 1.2, 0.3, 2) * ok1, scarf: ICE }, t > T.items[2] ? 3 : 1, 'sparkle', [1, -0.6])
    x.restore()
    return
  }
  if (t < T.b4) {
    const k3 = outK(t, [T.b4 - 0.2, T.b4])
    K.stars(x, t, { x: 540, y: 720, s: 190, pop: pop01(t, T.cut + 0.15, 0.4, 2) * k3, mood: t > T.gemHeart ? 'happy' : 'neutral', look: [0, 0.6], hops: K.hopsFor(SP) })
    // the thought bubble (still up) pops
    if (t < T.popTh) thought(x, t, 450, 1000, 360, 160, T.cut - 0.4, T.popTh, 380, 1080, (y) => { cabin(y, 0, 10, 0.9) })
    sparkles(x, t, 450, 1000, T.popTh, 12, 180, 1, [BONE, ICE, RED])
    K.star(x, t, 'scorpio', { x: 380, y: 1230, s: 260, pop: k3, mood: t < T.popTh ? 'neutral' : 'happy', look: [1, 0], scarf: INK, stripe: RED, squash: 0.05 * Math.sin(t * 1.5), hops: [T.popTh, T.soft, T.soft + 0.6], seed: 12 })
    K.star(x, t, 'gemini', { x: 820, y: 1240, s: 230, pop: k3, mood: t > T.gemHeart ? 'heart' : t > T.soft ? 'happy' : 'neutral', look: [-1, 0], scarf: PINK, hops: [T.gemHeart, T.gemHeart + 0.4], seed: 4 })
    bubble(x, t, 400, 950, T.soft, T.b4 - 0.1, "cocoa. yes. let's see where it goes.", { size: 30, tail: -0.3 })
    hearts(x, t, T.gemHeart, 820, 1080, { n: 6 })
    K.pisces(x, t, { x: 150, y: 1360, s: 130, pop: k3, scarf: ICE }, 2, 'sparkle', [1, -0.6])
    x.restore()
    return
  }
  // the cocoa cart
  box(x, 360, 1080, 360, 220, '#9b3b48', { b: 7, hi: '#c0566a' }); R(x, INK, 340, 1040, 400, 20)
  for (let i = 0; i < 5; i++) R(x, i % 2 ? BONE : RED, 360 + i * 72, 980, 72, 60)
  label(x, 'COCOA', 540, 1170, { size: 40, col: BONE, font: 'Inter, sans-serif', weight: 800 })
  R(x, INK, 390, 1300, 30, 60); R(x, INK, 660, 1300, 30, 60)
  const sipHops = T.sips.map(s => s - 0.1)
  K.star(x, t, 'scorpio', { x: 240, y: 1250, s: 230, pop: ok, mood: 'happy', look: [1, 0], scarf: INK, stripe: RED, hops: sipHops, seed: 12 })
  K.star(x, t, 'gemini', { x: 850, y: 1250, s: 220, pop: ok, mood: 'sparkle', look: [-1, 0], scarf: PINK, hops: sipHops.map(s => s + 0.1), seed: 4 })
  mug(x, t, 360, 1330, 0.7, { col: '#e23d66' }); mug(x, t, 730, 1330, 0.7, { col: '#f2cf4a' })
  const n = T.sips.filter(s => t > s).length
  if (n) { const bk = 1 + 0.25 * Math.max(0, 1 - (t - T.sips[n - 1]) / 0.25); x.save(); x.translate(540, 870); x.scale(bk, bk); box(x, -110, -36, 220, 72, '#14102a', { b: 6 }); label(x, `SIP ${n}`, 0, 2, { size: 40, col: GOLD }); x.restore() }
  K.pisces(x, t, { x: 960, y: 960, s: 130, pop: pop01(t, T.b4 + 0.4, 0.3, 2) * ok, scarf: ICE }, 3, 'sparkle', [-1, 0.4])
  x.restore()
}

const EP = makeCuff({
  id: 'nc14e09', duration: 35, ep: 9,
  heads: [
    { text: "Scorpio doesn't | do *casual.*", at: -1.2, out: T.h0Out, size: 100, accent: '#ff5a80' },
    { text: 'Cocoa? | Or *forever?*', at: T.h1, out: T.h1Out, size: 108 },
    { text: 'All in is a | *gift.*', at: T.h2, out: T.h2Out, size: 104, accent: GOLD },
    { text: 'One sip | at a *time.*', at: T.h3, out: [30.0, 30.3], size: 106, accent: '#d9a06a' },
  ],
  boxes: [
    { lines: B1, open: 11.1, close: 14.6, y: 1540 },
    { lines: B2, open: 15.2, close: 19.4, y: 1540 },
    { lines: B3, open: T.last - 0.22, close: 29.9, y: 1540 },
  ],
  snow: 0.9,
  cuts: [T.b2, { t: T.cut, kind: 'flip' }, T.b4],
  flashes: [T.b4],
  ghost: { x: 980, y: 1400, at: 6.0, from: 'below', cell: 3 },
  draw(x, t, K) { scene(x, t, K) },
  cues: [
    ['whoosh', 0.1, 0.8, 0.03], ['pop', T.gemIn + 0.3, 1174.66, 0.035, 0.4], ['pop', T.ask, 880, 0.04, 0.4],
    ['riser', T.zoom[0], T.zoom[1], 0.03], ['boom', T.zoom[0], 0.2], ['pluck', T.zoom[0] + 0.05, 1318.51, 0.04, 1, -0.3],
    ['whoosh', T.th, 0.4, 0.035], ...T.items.map((c, i) => ['pop', c, [987.77, 1174.66, 1318.51][i], 0.045, -0.2]), ['glitter', T.items[2], T.items[2] + 0.5],
    ['whoosh', T.back, 0.3, 0.04], ['pop', T.itsCocoa, 739.99, 0.04, 0.4],
    ['pop', T.popTh, 1567.98, 0.05, 0], ['glitter', T.popTh, T.popTh + 0.4], ['pop', T.soft, 880, 0.035, -0.3],
    ['pluck', T.gemHeart, 1174.66, 0.04, 0.5, 0.3], ['pluck', T.gemHeart + 0.12, 1567.98, 0.035, 0.5, 0.3],
    ...T.sips.map((s, i) => ['pop', s, [880, 987.77, 1174.66][i], 0.04, 0]),
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [HEART, MINT, COCOA, signStar, clamp]
