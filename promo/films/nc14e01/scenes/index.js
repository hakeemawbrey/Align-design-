// nc14e01: CUFFING SEASON, "The first cold night" (40 s vertical, Season 14 ep 1, music: dreamy · D).
// Story 0–35.6, then the shared end card. The show look lives in ./cuffkit.js (shared by nc14e01–e24).
//   0.0–8.4    "The first cold night | just *dropped.*"  Frame 0: a city rooftop, all twelve signs in two rows mid-shiver,
//              the big thermometer's mercury mid-plunge, frost creeping in from the edges. One by one, everyone's scarf
//              pops on. Pisces (front row): "we're all wearing scarves!!" and sniffles.
//   8.4–17.4   "Suddenly *everyone* | wants a plus-one."  Three phones slide up: ARIES "anyone want to share a blanket??",
//              GEMINI "who's free… like, all winter?", and the twist: CAPRICORN "accepting applications." Pisces cries.
//  17.4        card cut.
//  17.4–27.0   "Cold isn't a | *reason.*"  THE STARS rise over the rooftop; the signs gather round. "cold weather isn't a
//              *reason* to cuff." → "wanting *someone* is." → "so ask yourself what you *actually* want."
//  27.0–35.6   "Start with a | *real question.*"  A talk card ("What does a perfect lazy Sunday look like for you?") floats
//              down into the middle of the group; the snow turns gold for a beat; Pisces fountains.
//              THE STARS: "The cold's just the excuse. *Say the real thing.*"
import {
  makeCuff, R, box, bubble, label, shadow, glow, sparkles, hearts, drawBits, frost, thermometer, phone, talkCard, mug,
  pop01, outK, popOut, win, prog, lerp, clamp, ease, easeOutBack, INK, BONE, GOLD, ICE, PINK, RED, MINT, signStar, talkHops, CPS,
} from './cuffkit.js'

const T = {
  h0Out: [8.2, 8.4], b1: 8.4, h1: 8.55, h1Out: [17.2, 17.4],
  ph: [9.0, 11.0, 13.2], buzz: 15.6,
  cut: 17.4, h2: 17.55, h2Out: [26.8, 27.0], starsUp: [17.5, 18.3],
  b3: 27.0, h3: 27.15, cardDrop: [27.6, 28.6], gold: 28.65, last: 30.2,
}
const SP = 'THE STARS'
const LINES = [
  { t: 18.5, speaker: SP, text: "cold weather isn't a *reason* to cuff." },
  { t: 21.4, speaker: SP, text: 'wanting *someone* is.' },
  { t: 23.4, speaker: SP, text: 'so ask yourself what you *actually* want.' },
]
const LAST = [{ t: T.last, speaker: SP, text: "The cold's just the excuse. *Say the real thing.*" }]
const SCARF = { aries: '#e8344e', taurus: '#7a4a2e', gemini: '#ff8fb1', cancer: '#f4f0ff', leo: '#e8344e', virgo: '#9fe6b0', libra: '#ff8fb1', scorpio: '#1b1236', sagittarius: '#f2c75c', capricorn: '#5a5470', aquarius: '#f2c75c', pisces: '#9fd8ff' }
// two rows on the roof: back (6) and front (6); Pisces front-right
const BACK = ['taurus', 'leo', 'virgo', 'scorpio', 'capricorn', 'aquarius'], FRONT = ['aries', 'gemini', 'cancer', 'libra', 'sagittarius', 'pisces']
const SCARF_AT = [...FRONT, ...BACK].reduce((o, id, i) => (o[id] = 2.2 + i * 0.32, o), {})

function roof(x, t, Y = 1330) {
  // far skyline
  for (let i = 0; i < 9; i++) {
    const w = 110 + (i * 37) % 70, h = 300 + (i * 91) % 300, X = i * 125 - 30
    R(x, '#151338', X, Y - h, w, h)
    for (let j = 0; j < 7; j++) for (let k = 0; k < 2; k++) if ((i * 7 + j * 3 + k) % 4 === 0) R(x, '#f7d27a', X + 22 + k * 44, Y - h + 30 + j * 46, 16, 20)
  }
  // our roof: a ledge, a chimney, snow on top
  R(x, '#2a2148', 0, Y, 1080, 1920 - Y); R(x, '#3a2f66', 0, Y, 1080, 18)
  for (let i = 0; i < 6; i++) R(x, '#332a5c', 0, Y + 90 + i * 110, 1080, 6)
  R(x, '#e9f2ff', 0, Y - 10, 1080, 16)
  box(x, 60, Y - 200, 90, 200, '#6b3b48', { b: 6, hi: '#8a4c5a' }); R(x, '#e9f2ff', 54, Y - 206, 102, 12)
  void t
}

function crowd(x, t, K, { k = 1, gather = 0, mood, rows = [[1250, 150, 160], [1490, 178, 168]] } = {}) {
  const R2 = [[BACK, ...rows[0], 0], [FRONT, ...rows[1], 1]]
  for (const [ids, y, s, gap, fr] of R2) ids.forEach((id, i) => {
    let cx = 540 + (i - 2.5) * gap
    let cy = y
    if (gather > 0) { const a = Math.PI + (i + 0.5) / 6 * Math.PI; cx = lerp(cx, 540 + Math.cos(a) * (fr ? 420 : 300), gather); cy = lerp(cy, y + Math.sin(a) * (fr ? -10 : -60), gather) }
    const sc = t > SCARF_AT[id] ? SCARF[id] : null
    const shiv = t < SCARF_AT[id] + 0.2 ? 1.2 : t < 8.4 ? 0.35 : 0
    const isP = id === 'pisces'
    const m = mood ? mood(id, t) : (t < SCARF_AT[id] ? 'squint' : 'happy')
    const hop = [SCARF_AT[id] + 0.02]
    K.star(x, t, id, { x: cx, y: cy, s, pop: k, mood: m, shiver: shiv, scarf: sc, hops: hop, look: isP ? [-1, -0.4] : undefined, tears: isP ? (t > T.gold ? 3 : t > 6.4 ? 2 : t > 5.4 ? 1 : 0) : 0, seed: i + fr * 20 })
  })
}

function beat1(x, t, K) {
  const ok = outK(t, [T.b1 - 0.15, T.b1])
  roof(x, t)
  // the big thermometer plunges (mid-plunge at frame 0)
  const lvl = lerp(0.55, 0.12, ease.outCubic(prog(t, -0.6, 1.8)))
  thermometer(x, 960, 1000, 1.9, lvl)
  if (t < 1.9) for (let i = 0; i < 3; i++) R(x, ICE, 1012 + i * 10, 820 + ((t * 600 + i * 40) % 160), 6, 26)
  label(x, 'BRR.', 960, 690, { size: 46, col: ICE, font: "Inter, sans-serif", weight: 800, rot: 0.1, alpha: clamp(prog(t, 0.6, 0.9)) * ok })
  crowd(x, t, K, { k: ok })
  sparkles(x, t, 540, 1150, 2.2, 10, 260, 1, [ICE, BONE, GOLD])
  bubble(x, t, 640, 1340, 5.3, T.b1 - 0.2, "we're all wearing scarves!!", { size: 38, tail: 0.85, col: '#e6e2ff' })
  frost(x, clamp(0.35 + prog(t, 0, 3) * 0.65) * ok)
}

function beat2(x, t, K) {
  if (t < T.b1 || t > T.cut) return
  roof(x, t)
  frost(x, 0.5)
  const P = [
    { id: 'aries', cx: 200, rot: -0.05, title: '♈︎ ARIES', msgs: [{ at: T.ph[0] + 0.5, side: 'R', text: 'anyone want to share a blanket??', col: '#c8425a' }] },
    { id: 'gemini', cx: 540, rot: 0.02, title: '♊︎ GEMINI', msgs: [{ at: T.ph[1] + 0.45, side: 'R', text: "who's free…", col: '#b89a2a' }, { at: T.ph[1] + 1.0, side: 'R', text: 'like, all winter?', col: '#b89a2a' }] },
    { id: 'capricorn', cx: 880, rot: 0.05, title: '♑︎ CAPRICORN', msgs: [{ at: T.ph[2] + 0.55, side: 'R', text: 'accepting applications.', col: '#1f8f6e' }] },
  ]
  P.forEach((p, i) => {
    const k = easeOutBack(prog(t, T.ph[i], T.ph[i] + 0.4), 1.4) * outK(t, [T.cut - 0.25, T.cut])
    if (k <= 0.01) return
    const buzz = t > T.buzz ? 5 * Math.sin(t * 70 + i) : 0
    phone(x, t, p.cx + buzz, lerp(1900, 500, k), 320, 560, { title: p.title, msgs: p.msgs, rot: p.rot, size: 34 })
    K.star(x, t, p.id, { x: p.cx, y: lerp(2200, 1220, k), s: 190, mood: i === 2 ? 'neutral' : 'sparkle', look: i === 2 ? [0, 0] : [0, -1], scarf: SCARF[p.id], hops: [T.ph[i] + 0.3, T.ph[i] + 0.6], seed: 30 + i })
    if (i === 2 && t > T.ph[2] + 0.9) label(x, '(serious)', p.cx, 1390, { size: 26, col: MINT, alpha: clamp(prog(t, T.ph[2] + 0.9, T.ph[2] + 1.1)) })
  })
  // Pisces bottom-left, tissue in hand, crying at all the love in the air
  const pk = pop01(t, T.b1 + 0.6, 0.3, 2) * outK(t, [T.cut - 0.25, T.cut])
  if (pk > 0.01) K.pisces(x, t, { x: 170, y: 1600, s: 170, pop: pk, scarf: SCARF.pisces, hops: [T.buzz] }, t > T.buzz ? 3 : 2, 'sparkle', [1, -1])
  if (t > T.buzz) for (let i = 0; i < 3; i++) label(x, 'BZZT', 200 + i * 340, 455 + 10 * Math.sin(t * 30 + i), { size: 30, col: GOLD, alpha: outK(t, [T.cut - 0.3, T.cut]) })
}

function beat3(x, t, K, img) {
  if (t < T.cut) return
  const ok = popOut(t, K.OUT)
  roof(x, t, 1205)
  frost(x, 0.45)
  const g = ease.inOutCubic(prog(t, T.cut, T.cut + 0.8))
  // THE STARS rise over the roof (moon-sized), the signs gather in a ring
  const up = easeOutBack(prog(t, ...T.starsUp), 1.3)
  const fin = ease.inOutCubic(prog(t, T.b3, T.b3 + 0.6))
  const SH = talkHops([...LINES, ...LAST], SP, { cps: CPS })
  glow(x, 540, lerp(1100, 760, up), 420, 0.22 * up * ok, '247,207,104')
  K.stars(x, t, { x: lerp(540, 540, fin), y: lerp(1300, lerp(760, 640, fin), up), s: lerp(300, 230, fin), pop: up * ok, mood: t > T.gold ? 'happy' : 'neutral', look: t > T.b3 + 0.4 && t < T.gold ? [0, 1] : [0, 0.3], hops: SH, glow: 1.2 })
  crowd(x, t, K, { k: ok, gather: g, rows: [[1125, 120, 140], [1268, 140, 150]], mood: (id, tt) => tt > T.gold ? (id === 'pisces' ? 'sparkle' : 'happy') : tt > LINES[1].t && tt < LINES[2].t ? 'wide' : 'neutral' })
  // the talk card floats down into the circle
  if (t > T.cardDrop[0]) {
    const c = ease.outCubic(prog(t, ...T.cardDrop))
    const sway = (1 - c) * 0.4 * Math.sin(t * 5)
    glow(x, 540, 1130, 260, 0.25 * c * ok, '255,236,180')
    talkCard(x, img.talk, 540 + sway * 120, lerp(380, 990, c), 240 * ok, sway * 0.6 + 0.04)
    sparkles(x, t, 540, 1010, T.cardDrop[1], 12, 190, 2, [GOLD, BONE, PINK])
  }
  // the snow turns gold for a beat
  if (t > T.gold && t < T.gold + 1.4) {
    x.save(); x.globalAlpha = Math.sin(Math.PI * prog(t, T.gold, T.gold + 1.4)) * 0.8
    for (let i = 0; i < 40; i++) { const hx = (i * 233) % 1080, hy = ((i * 397) % 1300) + 300 + (t - T.gold) * 60; R(x, GOLD, hx, hy, 8, 8) }
    x.restore()
  }
  if (t > T.gold) hearts(x, t, T.gold + 0.3, 960, 1240, { n: 4 })
}

const EP = makeCuff({
  id: 'nc14e01', duration: 40, ep: 1,
  images: { talk: 'card-talk-3.png' },
  heads: [
    { text: 'The first cold night | just *dropped.*', at: -1.2, out: T.h0Out, size: 100 },
    { text: 'Suddenly *everyone* | wants a plus-one.', at: T.h1, out: T.h1Out, size: 92 },
    { text: "Cold isn't a | *reason.*", at: T.h2, out: T.h2Out, size: 104, accent: GOLD },
    { text: 'Start with a | *real question.*', at: T.h3, out: [35.0, 35.3], size: 96, accent: PINK },
  ],
  boxes: [
    { lines: LINES, open: 18.3, close: 26.6 },
    { lines: LAST, open: T.last - 0.22, close: 34.9 },
  ],
  cuts: [T.b1, { t: T.cut, kind: 'flip' }, T.b3],
  flashes: [T.b1, T.b3],
  ghost: { x: 105, y: 974, at: 12.4, from: 'below', cell: 3 },
  draw(x, t, K) {
    if (t < T.b1) beat1(x, t, K)
    beat2(x, t, K)
    beat3(x, t, K, K.img)
  },
  cues: [
    // the plunge + shivers
    ['riser', 0, 0.3, 0.01], ['whoosh', 0.05, 0.6, 0.03], ['pluck', 0.7, 2349.32, 0.02, 0.4, -0.3],
    ...Object.values(SCARF_AT).map((s, i) => ['pop', +s.toFixed(3), [587.33, 659.25, 739.99, 880, 987.77, 1174.66][i % 6], 0.03, ((i % 2) - 0.5) * 0.6]),
    ['glitter', 2.2, 2.8], ['pop', 5.3, 1318.51, 0.035, 0.4], ['pluck', 5.5, 1174.66, 0.025, 0.5, 0.4],
    // the phones
    ...T.ph.flatMap((p, i) => [['whoosh', p, 0.4, 0.035], ['pop', +(p + 0.5).toFixed(3), [880, 987.77, 1174.66][i], 0.045, (i - 1) * 0.5]]),
    ['pop', 12.2, 1318.51, 0.035, 0], ['pluck', 13.75, 440, 0.04, 0.4, 0.5],
    ...Array.from({ length: 8 }, (_, i) => ['tick', +(T.buzz + i * 0.1).toFixed(3), 0.03]),
    // THE STARS rise, the card floats down, the gold snow
    ['riser', T.starsUp[0], T.starsUp[1], 0.02], ['bell', T.starsUp[1], 1760, 0.025, 1.0, 0],
    ['whoosh', T.cardDrop[0], 0.6, 0.03], ['pluck', T.cardDrop[1], 1318.51, 0.04, 0.6, 0], ['glitter', T.cardDrop[1], T.cardDrop[1] + 0.5],
    ['bell', T.gold, 2349.32, 0.03, 1.2, 0], ['glitter', T.gold, T.gold + 1.2],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [box, shadow, mug, RED, drawBits, win, signStar]
