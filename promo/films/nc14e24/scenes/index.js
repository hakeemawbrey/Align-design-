// nc14e24: CUFFING SEASON finale, "Not cuffed. Chosen." (45 s vertical, promo/films/next30/b02.md, music: pop · D)
// Story 0–40.6, then the shared end card. The season look lives in ../../nc14e13/cuffkit.js.
//   0.0–6.5    "Winter's here. | Who *stayed?*"  Frame 0: under string lights in the snow, ♈ Aries mid-hop beside ♓ Pisces
//              (crying, obviously). THE STARS: "twelve signs. one *very* cold month." → "let's check in on *everyone.*"
//   6.5–17.0   "Roll | *call.*"  The pairs pop in one by one, each with a tag: ♐+♒ DATE TWO → TEN, ♑+♋ MATCHING MITTENS,
//              ♌+♎ STILL IN SYNC, ♏+♉ SINCE APRIL, ♍+♊ SLOW, ON PURPOSE; ♓+♈ IT'S SNOWING. SAG: "date *ten*, by the way."
//              (the ghost, 12.6)
//  17.0        card cut.
//  17.1–25.8   "Not about | the *cold.*"  THE STARS: "cuffing is about the cold. this is about *you.*" → "swap the blanket for
//              a *talk card.*"  Every pair swaps a talk card; the blankets drop.
//  26.0        ★ LESSON UNLOCKED "Choose someone | *on purpose.*"  chip "+12 signs, 0 blankets needed"
//  31.0–40.1   The snow stops; nobody lets go. Pisces sobs happily in the middle. Last line: "Not cuffed. | *Chosen.*"
import { makeEp, star, lights, blanket, bubble, hearts, sparkles, confetti, shadow, R, box, label, drawBits,
  pop01, outK, prog, lerp, clamp, ease, talkHops, SNOW, ICE, PINK, GOLD, RED, MINT, INK, BONE, INTER, MONO, r3 } from '../../nc14e13/cuffkit.js'

const SP = 'THE STARS', SAG = '♐︎ SAGITTARIUS', SC = '#d0a8ff'
const L1 = [
  { t: 0.9, speaker: SP, text: 'twelve signs. one *very* cold month.' },
  { t: 3.6, speaker: SP, text: "let's check in on *everyone.*" },
]
const L2 = [{ t: 15.0, speaker: SAG, color: SC, text: 'date *ten*, by the way.' }]
const L3 = [
  { t: 17.4, speaker: SP, text: 'cuffing is about the cold. this is about *you.*' },
  { t: 20.6, speaker: SP, text: 'swap the blanket for a *talk card.*' },
]
const T = { b2: 6.5, cut: 17.0, b3: 17.1, swap: 22.6, drop: 23.6, lesson: 26.0, lessonOut: [30.6, 30.8], fin: 31.0, stop: 31.6 }
// the pairs: [a, b, x0, x1, y, s, tag, at, hatA, hatB]
const BACK = 960, FRONT = 1190
const PAIRS = [
  ['sagittarius', 'aquarius', 150, 300, BACK, 150, 'DATE TWO → TEN', 6.8, '#a35cf0', '#38c4ec'],
  ['capricorn', 'cancer', 465, 615, BACK, 150, 'MATCHING MITTENS', 8.5, '#2a2148', '#3fb6f0'],
  ['leo', 'libra', 780, 930, BACK, 150, 'STILL IN SYNC', 10.2, GOLD, PINK],
  ['scorpio', 'taurus', 135, 295, FRONT, 165, 'SINCE APRIL', 11.9, '#e23d66', '#e9b24a'],
  ['virgo', 'gemini', 785, 945, FRONT, 165, 'SLOW, ON PURPOSE', 13.6, '#ef5c94', '#f2cf4a'],
]
const PIS_SLOT = [470, 620, FRONT, 180]
const ARI_HOPS = [0.0, 0.5, 1.0, 1.5, 2.0, 5.0, T.swap, 31.4, 33.0, 35.0, 37.0]

function tag(x, t, cx, cy, text, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.font = `700 22px ${MONO}`; const w = x.measureText(text).width + 30
  R(x, INK, -w / 2 - 5, -22, w + 10, 44); R(x, '#14102a', -w / 2, -17, w, 34)
  x.fillStyle = GOLD; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 1)
  x.restore()
}
function miniCard(x, cx, cy, s, rot) {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
  box(x, -26, -36, 52, 72, '#2a1f55', { b: 4 }); R(x, GOLD, -20, -30, 40, 4); R(x, GOLD, -20, 26, 40, 4)
  drawBits(x, ['..G..', '.GGG.', 'GGGGG', '.GGG.', '..G..'], { G: GOLD }, 0, 0, 4)
  x.restore()
}

function scene(x, t, K) {
  const ok = K.ok
  lights(x, t, -30, 600, 1110, 600, { n: 16, sag: 90 })
  lights(x, t, -30, 760, 1110, 720, { n: 14, sag: 60, cols: [GOLD, PINK, ICE] })
  const blk = 1 - ease.inCubic(prog(t, T.drop, T.drop + 0.6))
  // the pairs (back row first)
  PAIRS.forEach(([a, b, x0, x1, y, s, text, at, ha, hb], i) => {
    const k = pop01(t, at, 0.4, 2.2) * ok
    if (k <= 0.01) return
    const close = ease.inOutCubic(prog(t, T.fin, T.fin + 0.8)) * 14
    shadow(x, (x0 + x1) / 2, y + s * 0.42, (x1 - x0 + s) * k, 0.3)
    const moodA = t > T.swap ? 'heart' : 'happy', moodB = t > T.swap + 0.1 ? 'heart' : i === 4 && t > at ? 'sparkle' : 'happy'
    const hopsA = [at + 0.1, at + 0.5, T.swap, 32 + i * 0.4, 36 + i * 0.3], hopsB = [at + 0.2, at + 0.6, T.swap + 0.1, 32.2 + i * 0.4, 36.2 + i * 0.3]
    star(x, t, a, { x: x0 + close, y, s, pop: k, mood: moodA, look: [1, 0], hat: ha, hops: hopsA, seed: 3 + i * 2 })
    star(x, t, b, { x: x1 - close, y, s, pop: k, mood: moodB, look: [-1, 0], hat: hb, hops: hopsB, seed: 4 + i * 2 })
    if (blk > 0.01 && t > at) { x.save(); x.globalAlpha *= blk; x.translate(0, (1 - blk) * 200); blanket(x, t, (x0 + x1) / 2, y + 20, x1 - x0 + 110, 60, ['#c8283c', '#2f6ad8', '#2fc79a', '#f39a3a', '#7c74f0'][i], BONE); x.restore() }
    tag(x, t, (x0 + x1) / 2, y - s * 0.72, text, pop01(t, at + 0.2, 0.3, 2.4) * outK(t, [T.b3 - 0.2, T.b3]))
    // the talk-card swap: each card arcs from one to the other
    if (t > T.swap && t < T.swap + 1.4) { const p = ease.inOutCubic(prog(t, T.swap, T.swap + 0.8)); miniCard(x, lerp(x0 + 30, x1 - 30, p), y - 40 - 90 * Math.sin(Math.PI * p), 1.2, p * 6) }
    if (t > T.swap + 0.8 && ok > 0.01) miniCard(x, x1 - 40, y + 10, 0.9 * ok, 0.15)
    sparkles(x, t, (x0 + x1) / 2, y - 40, T.swap + 0.8, 6, 80, i, [GOLD, BONE, PINK])
  })
  // Pisces + Aries: front and centre at frame 0, then into their slot
  const m = ease.inOutCubic(prog(t, T.b2 - 0.3, T.b2 + 0.3))
  const px = lerp(400, PIS_SLOT[0], m), ax = lerp(680, PIS_SLOT[1], m), py = lerp(1130, PIS_SLOT[2], m), ps = lerp(290, PIS_SLOT[3], m)
  shadow(x, (px + ax) / 2, py + ps * 0.42, (ax - px + ps) * ok, 0.3)
  star(x, t, 'pisces', { x: px, y: py, s: ps, mood: t < T.b3 ? 'sparkle' : 'heart', look: [1, -0.3], tears: 3, hat: '#7c74f0', scarf: PINK, hops: [T.swap + 0.05, 31.6, 34.0], seed: 6, pop: ok })
  star(x, t, 'aries', { x: ax, y: py, s: ps, mood: t > T.swap ? 'heart' : 'happy', look: [-1, -0.3], hat: RED, scarf: GOLD, hops: ARI_HOPS, seed: 3, pop: ok })
  tag(x, t, (PIS_SLOT[0] + PIS_SLOT[1]) / 2, FRONT - 150, "IT'S SNOWING", pop01(t, 15.3, 0.3, 2.4) * outK(t, [T.b3 - 0.2, T.b3]))
  if (blk > 0.01 && t > T.b2) { x.save(); x.globalAlpha *= blk; x.translate(0, (1 - blk) * 200); blanket(x, t, 545, FRONT + 20, 280, 60, '#c8283c', GOLD); x.restore() }
  if (t > T.swap && t < T.swap + 1.4) { const p = ease.inOutCubic(prog(t, T.swap, T.swap + 0.8)); miniCard(x, lerp(px + 30, ax - 30, p), py - 50 - 90 * Math.sin(Math.PI * p), 1.3, p * 6) }
  // THE STARS (top centre)
  const stk = pop01(t, 0.0, 0.01) * outK(t, [T.lesson - 0.2, T.lesson]) + (t > T.fin ? pop01(t, T.fin + 0.2, 0.4, 2) * ok : 0)
  if (stk > 0.01) star(x, t, 'stars', { x: 540, y: 530, s: 120, pop: stk, mood: t > T.swap ? 'sparkle' : 'happy', hops: [...talkHops(L1, SP, { cps: 30 }), ...talkHops(L3, SP, { cps: 30 })], seed: 2 })
  confetti(x, t, T.fin + 0.3, 540, 700, { n: 34 })
  hearts(x, t, T.fin + 0.6, 545, 1000, { n: 8, cell: 8 })
  hearts(x, t, T.swap + 0.9, 545, 1050, { n: 6, cell: 6 })
}

const EP = makeEp({
  id: 'nc14e24', ep: 24, duration: 45, key: 'D',
  heads: [
    { text: "Winter's here. | Who *stayed?*", at: -1.2, out: [6.3, 6.5], accentColor: GOLD, size: 108, accentSize: 150 },
    { text: 'Roll | *call.*', at: T.b2 + 0.1, out: [16.8, 17.0], accentColor: ICE, size: 112, accentSize: 156 },
    { text: 'Not about | the *cold.*', at: T.b3 + 0.05, out: [25.7, 25.9], accentColor: PINK, size: 108, accentSize: 150 },
    { text: 'Not cuffed. | *Chosen.*', at: T.fin + 0.2, late: 1, lateAt: 32.2, wobble: true, out: [40.0, 40.3], accentColor: GOLD, size: 112, accentSize: 170 },
  ],
  boxes: [
    { lines: L1, open: 0.7, close: 6.3 },
    { lines: L2, open: 14.8, close: 16.9 },
    { lines: L3, open: 17.2, close: 25.8 },
  ],
  lesson: { at: T.lesson, out: T.lessonOut, text: 'Choose someone | *on purpose.*', chip: '+12 signs, 0 blankets needed', color: GOLD },
  ghost: { at: 12.6, x: 1000, y: 1060, from: 'below', cell: 3 },
  cuts: [6.5, { t: T.cut, kind: 'flip' }, 30.9],
  snow: t => 1 - prog(t, T.stop, T.stop + 1.5), ground: 1290,
  scene,
  cues: [
    ...[0.5, 1.0, 1.5, 2.0].map(a => ['tick', a, 0.025]),
    ...PAIRS.flatMap(([, , , , , , , at], i) => [['pop', at, [659.25, 739.99, 880, 987.77, 1174.66][i], 0.045, 0], ['pop', r3(at + 0.12), [880, 987.77, 1174.66, 1318.51, 1567.98][i], 0.035, 0], ['tick', r3(at + 0.2), 0.03]]),
    ['pop', 15.3, 1318.51, 0.04, 0],
    ['whoosh', T.swap, 0.5, 0.05], ['glitter', T.swap + 0.8, T.swap + 1.4], ['bell', T.swap + 0.85, 1760, 0.03, 1.2, 0],
    ['whoosh', T.drop, 0.5, 0.04], ['tom', T.drop + 0.5, 98, { gain: 0.18, decay: 0.3 }],
    ['glitter', T.fin + 0.3, T.fin + 1.2], ['pop', T.fin + 0.3, 1567.98, 0.05, 0], ['bell', T.stop + 0.5, 2349.32, 0.025, 1.6, 0],
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [bubble, label, SNOW, MINT, INTER, clamp]
