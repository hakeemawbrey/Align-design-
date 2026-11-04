// nc14e22: CUFFING SEASON, "Taking it slow on purpose" (33 s vertical, promo/films/next30/b02.md, music: screwed · Fm)
// Story 0–30.6, then the short end card (no Align card transition). The season look lives in ../../nc14e13/cuffkit.js.
//   0.0–6.0    "Everyone's sprinting. | *Virgo* is strolling."  Frame 0: a snowy park path; a pair on a sled zooms past in a
//              streak while ♍ Virgo and ♊ Gemini stroll. GEMINI (fast): "so do we… *speed up?*"
//   6.0–13.4   "Slow. | On *purpose.*"  VIRGO: "i like knowing you a little *more* each week."  A SLOW ZONE sign pops up. They
//              stop for a snowflake, a dog ("a DOG!!"), a bench.  (the ghost, 11.8)
//  13.5–20.6   "Slow can be | a *choice.*"  THE STARS: "slow can be a *choice*, not a doubt."  GEMINI (slower): "then… same
//              time *next week?*"  VIRGO: "it's a *date.*"
//  20.6–30.1   They walk on, slow and happy, while Pisces cries at a turtle-shaped snow lump. Last line: "Slow on purpose |
//              is still *moving.*"
import { makeEp, star, bench, note, bubble, hearts, sparkles, shadow, R, box, drawBits, FLAKE, lights,
  pop01, outK, prog, lerp, clamp, ease, talkHops, SNOW, SNOW_D, ICE, PINK, GOLD, RED, MINT, INK, BONE, r3 } from '../../nc14e13/cuffkit.js'

const SP = 'THE STARS', VIR = '♍︎ VIRGO', GEM = '♊︎ GEMINI', VC = '#ff9fc0', GC = '#ffe27a'
const L1 = [{ t: 1.2, speaker: GEM, color: GC, text: 'so do we… *speed up?*' }]
const L2 = [{ t: 6.4, speaker: VIR, color: VC, text: 'i like knowing you a little *more* each week.' }]
const L3 = [
  { t: 13.8, speaker: SP, text: 'slow can be a *choice*, not a doubt.' },
  { t: 16.4, speaker: GEM, color: GC, text: 'then… same time *next week?*' },
  { t: 19.0, speaker: VIR, color: VC, text: "it's a *date.*" },
]
const T = { b2: 6.0, sign: 8.6, flake: 9.6, dog: 10.8, bench: 12.2, cut: 13.4, b3: 13.5, fin: 20.6 }
const ZOOMS = [[-0.6, 0.6, 'sled'], [4.2, 5.2, 'run'], [21.6, 22.6, 'run'], [26.0, 27.0, 'sled']]
const VIR_HOPS = [...talkHops(L2, VIR, { cps: 30 }), T.flake, T.bench + 0.2, ...talkHops(L3, VIR, { cps: 30 }), 22.0, 25.0, 28.0]
const GEM_HOPS = [0.3, 0.6, 0.9, 1.2, 1.5, 1.8, 2.1, T.dog + 0.1, T.dog + 0.4, T.dog + 0.7, ...talkHops(L3, GEM, { cps: 30 }), 22.4, 25.4, 28.4]

function turtle(x, cx, cy) {
  x.fillStyle = INK; x.beginPath(); x.ellipse(cx, cy, 96, 56, 0, Math.PI, 0); x.fill()
  x.fillStyle = SNOW; x.beginPath(); x.ellipse(cx, cy, 88, 50, 0, Math.PI, 0); x.fill()
  x.fillStyle = INK; x.beginPath(); x.arc(cx + 104, cy - 24, 26, 0, 7); x.fill(); x.fillStyle = SNOW; x.beginPath(); x.arc(cx + 104, cy - 24, 20, 0, 7); x.fill()
  R(x, INK, cx + 108, cy - 32, 6, 6)
  for (const d of [-60, 50]) { R(x, INK, cx + d - 4, cy - 4, 30, 18); R(x, SNOW, cx + d, cy - 2, 22, 12) }
  for (let i = 0; i < 3; i++) R(x, SNOW_D, cx - 40 + i * 30, cy - 40 + (i % 2) * 8, 18, 8)
}
function dog(x, t, cx, cy) {
  drawBits(x, ['B...B..', 'BBBBB..', 'BEBEB.T', 'BBBBBBT', '.BBBBB.', '.B.B.B.'], { B: '#c99a6a', E: INK, T: '#c99a6a' }, cx, cy + 3 * Math.abs(Math.sin(t * 9)), 11)
  R(x, RED, cx - 30, cy - 4, 40, 8)
}
function zoomer(x, t, a, b, kind) {
  if (t < a || t > b) return
  const p = prog(t, a, b), cx = lerp(-260, 1340, p)
  for (let i = 0; i < 5; i++) R(x, 'rgba(239,230,214,0.5)', cx - 180 - i * 60, 1050 + i * 18, 140, 8)
  if (kind === 'sled') {
    box(x, cx - 110, 1120, 220, 26, RED, { b: 6 })
    star(x, t, 'leo', { x: cx - 60, y: 1060, s: 140, mood: 'wide', look: [1, 0], hat: GOLD, seed: 5 })
    star(x, t, 'libra', { x: cx + 60, y: 1060, s: 140, mood: 'sparkle', look: [1, 0], hat: PINK, seed: 8 })
  } else {
    star(x, t, 'sagittarius', { x: cx - 60, y: 1070, s: 140, mood: 'happy', look: [1, 0], hat: '#a35cf0', seed: 9, hops: [a, a + 0.3, a + 0.6] })
    star(x, t, 'aquarius', { x: cx + 60, y: 1070, s: 140, mood: 'wide', look: [1, 0], hat: '#38c4ec', seed: 11, hops: [a + 0.15, a + 0.45, a + 0.75] })
  }
}

function scene(x, t, K) {
  const ok = K.ok
  // the path + trees
  R(x, SNOW_D, 0, 1290, 1080, 110); R(x, '#b8c8e8', 0, 1310, 1080, 70)
  for (const [tx, h] of [[90, 380], [1000, 420]]) { R(x, INK, tx - 14, 1290 - h, 28, h); R(x, '#5a4636', tx - 8, 1290 - h, 16, h); for (let j = 0; j < 3; j++) R(x, SNOW, tx - 70 + j * 10, 1290 - h + j * 60, 140 - j * 20, 16) }
  lights(x, t, 90, 960, 1000, 940, { n: 10, sag: 70 })
  // the SLOW ZONE sign
  const sk = pop01(t, T.sign, 0.35, 2.3)
  if (sk > 0.01) { x.save(); x.translate(200, 1290); x.scale(sk, sk); R(x, INK, -8, -260, 16, 260); R(x, '#8a8aa8', -4, -256, 8, 256); note(x, 0, -280, 220, 110, 'SLOW\nZONE', { col: GOLD, size: 36, rot: -0.05 }); x.restore() }
  // the bench they stop at
  const bk = pop01(t, T.bench, 0.35, 2) * outK(t, [T.fin - 0.3, T.fin])
  if (bk > 0.01) { x.save(); x.globalAlpha *= clamp(bk); bench(x, 560, 1270, 440); x.restore() }
  // Pisces + the turtle-shaped snow lump
  star(x, t, 'pisces', { x: 900, y: 1150, s: 160, mood: t > T.fin ? 'heart' : 'sparkle', look: [-1, 0.6], tears: t > T.fin ? 3 : 2, hat: '#7c74f0', seed: 6, pop: ok, hops: [T.fin + 0.3, 24.0] })
  turtle(x, 880, 1300)
  // everyone else zooms past (behind)
  for (const [a, b, kind] of ZOOMS) zoomer(x, t, a, b, kind)
  // the two strollers: walk… stop… walk (slowly)
  const stop = (t > T.flake && t < T.b3 + 0.2) || (t > T.b3 && t < T.fin)
  const walkT = t < T.flake ? t : t < T.fin ? T.flake : T.flake + (t - T.fin)
  const drift = 14 * walkT
  const vx = 360 + (t < T.fin ? Math.min(drift, 110) : 110 + (t - T.fin) * 18), gx = vx + 230
  shadow(x, vx, 1300, 240 * ok); shadow(x, gx, 1300, 240 * ok)
  const vMood = t < T.b2 ? 'happy' : t < T.b3 ? (t > T.dog && t < T.bench ? 'sparkle' : 'happy') : t < 19.0 ? 'neutral' : 'heart'
  const gMood = t < T.b2 ? 'wide' : t > T.dog && t < T.bench ? 'sparkle' : t < T.b3 ? 'happy' : t < 16.4 ? 'neutral' : 'happy'
  const lookUp = t > T.flake && t < T.dog ? [0, -1] : t > T.dog && t < T.bench ? [1, 0.5] : null
  star(x, t, 'virgo', { x: vx, y: 1150, s: 250, mood: vMood, look: lookUp || [1, 0], hops: VIR_HOPS, scarf: VC, hat: '#ef5c94', pop: ok, seed: 7, squash: stop ? 0 : 0.02 * Math.sin(t * 4) })
  star(x, t, 'gemini', { x: gx, y: 1150, s: 250, mood: gMood, look: lookUp || [-1, 0], hops: GEM_HOPS, scarf: GC, hat: '#f2cf4a', pop: ok, seed: 4, squash: stop ? 0 : 0.02 * Math.sin(t * 4 + 1) })
  // the snowflake they stop for
  if (t > T.flake - 0.4 && t < T.dog) { const fy = lerp(700, 930, prog(t, T.flake - 0.4, T.dog)); drawBits(x, FLAKE, { W: SNOW }, (vx + gx) / 2 + 10 * Math.sin(t * 2), fy, 12) }
  // the dog trots past
  if (t > T.dog && t < T.bench + 0.6) dog(x, t, lerp(1180, -100, prog(t, T.dog, T.bench + 0.6)), 1250)
  bubble(x, t, gx + 40, 880, T.dog + 0.1, T.bench, 'a DOG!!', { size: 40, tail: -0.3 })
  // THE STARS
  const stk = pop01(t, T.b3, 0.4, 2) * outK(t, [T.fin - 0.2, T.fin])
  if (stk > 0.01) star(x, t, 'stars', { x: 540, y: 680, s: 150, pop: stk, mood: t > 19 ? 'sparkle' : 'happy', hops: [T.b3 + 0.2, ...talkHops(L3, SP, { cps: 30 })], seed: 2 })
  hearts(x, t, 19.6, (vx + gx) / 2, 950, { n: 6, cell: 7 })
  sparkles(x, t, 200, 1010, T.sign, 8, 120, 1, [GOLD, BONE])
}

const EP = makeEp({
  id: 'nc14e22', ep: 22, duration: 35, key: 'Fm',
  heads: [
    { text: "Everyone's sprinting. | *Virgo* is strolling.", at: -1.2, out: [5.8, 6.0], accentColor: VC, size: 90, accentSize: 128 },
    { text: 'Slow. | On *purpose.*', at: T.b2 + 0.1, out: [13.2, 13.4], accentColor: GC, size: 108, accentSize: 150 },
    { text: 'Slow can be | a *choice.*', at: T.b3 + 0.05, out: [20.4, 20.6], accentColor: GOLD, size: 108, accentSize: 150 },
    { text: 'Slow on purpose | is still *moving.*', at: T.fin + 0.2, late: 1, lateAt: 21.8, wobble: true, out: [30.0, 30.3], accentColor: VC, size: 96, accentSize: 140 },
  ],
  boxes: [
    { lines: L1, open: 1.0, close: 5.8 },
    { lines: L2, open: 6.2, close: 13.2 },
    { lines: L3, open: 13.6, close: 20.5 },
  ],
  ghost: { at: 11.8, x: 1014, y: 900, from: 'left', cell: 3 },
  snow: 0.6, ground: 1290,
  scene,
  cues: [
    ...ZOOMS.filter(z => z[0] > 0).map(([a]) => ['whoosh', a + 0.2, 0.6, 0.05]), ['whoosh', 0.05, 0.5, 0.03],
    ['pop', T.sign, 880, 0.045, -0.4], ['tick', T.sign + 0.1, 0.04],
    ['bell', T.flake, 2349.32, 0.025, 1.4, 0], ['pop', T.dog + 0.1, 1318.51, 0.045, 0.3], ['pop', T.dog + 0.25, 1567.98, 0.04, 0.3],
    ['pop', T.bench, 659.25, 0.035, 0], ['pop', T.b3 + 0.2, 987.77, 0.04, 0], ['glitter', T.b3, T.b3 + 0.4],
    ['pluck', 19.6, 1174.66, 0.04, 0.6, 0], ['glitter', 19.6, 20.2], ['pop', T.fin + 0.3, 880, 0.03, 0.4],
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [ICE, MINT, r3]
