// nc14e20: CUFFING SEASON, "The cozy-night-in debate" (33 s vertical, promo/films/next30/b02.md, music: house · G)
// Story 0–30.6, then the short end card (no Align card transition). The season look lives in ../../nc14e13/cuffkit.js.
//   0.0–6.4    "Night in or | night *out?*"  Frame 0: ♈ Aries in a hat and scarf, mid-bounce at the front door; ♓ Pisces
//              already under three blankets on the couch. ARIES: "lights walk! *right now!*"  PISCES: "but the blanket is
//              *so* warm…"
//   6.4–13.6   "The *pitches.*"  Aries: string lights, a sled, a snowball… which lands on Aries. Pisces: soup, a blanket, a
//              movie with a sad dog (already crying).  (the ghost, 9.0)
//  13.7–21.0   "You don't need | a *winner.*"  THE STARS: "you don't need a winner. you need a *plan for both.*"
//              ARIES: "lights first…"  PISCES: "then the *couch?*"
//  21.0–30.1   Outside under the lights (Pisces cries at how pretty they are), then the couch, one blanket, two mugs.
//              Last line: "Out, then in. | *Together.*"
import { makeEp, star, room, couch, blanket, door, mug, lights, ground, snowfall, bubble, hearts, sparkles, shadow, R, box, glow, drawBits, HEART,
  pop01, outK, prog, lerp, clamp, ease, talkHops, SNOW, ICE, PINK, GOLD, RED, MINT, INK, BONE, r3 } from '../../nc14e13/cuffkit.js'

const SP = 'THE STARS', ARI = '♈︎ ARIES', PSP = '♓︎ PISCES', AC = '#ff9a7a', PC = '#b9b4ff'
const L1 = [
  { t: 1.0, speaker: ARI, color: AC, text: 'lights walk! *right now!*' },
  { t: 3.5, speaker: PSP, color: PC, text: 'but the blanket is *so* warm…' },
]
const L2 = [
  { t: 6.8, speaker: ARI, color: AC, text: 'sledding! lights! a *snowball—*' },
  { t: 10.4, speaker: PSP, color: PC, text: 'soup. blanket. a movie with a *sad dog.*' },
]
const L3 = [
  { t: 14.0, speaker: SP, text: "you don't need a winner. you need a *plan for both.*" },
  { t: 17.6, speaker: ARI, color: AC, text: 'lights first…' },
  { t: 19.0, speaker: PSP, color: PC, text: 'then the *couch?*' },
]
const T = { b2: 6.4, lt: 7.0, sled: 8.0, ball: 9.0, splat: 9.55, soup: 10.6, bl: 11.4, tv: 12.2, cut: 13.6, b3: 13.7, out: 21.0, home: 25.6 }
const ARI_HOPS = [0.0, 0.45, 0.9, 1.35, 1.8, 2.25, 2.7, 3.15, 6.9, 7.3, 7.7, 8.1, 8.5, T.splat + 0.05, ...talkHops(L3, ARI, { cps: 30 }), 21.4, 22.0, 22.6, 23.2, 23.8, 24.4, 26.0, 28.0]
const PIS_HOPS = [...talkHops(L1, PSP, { cps: 30 }), ...talkHops(L2, PSP, { cps: 30 }), ...talkHops(L3, PSP, { cps: 30 }), 21.5, 22.3, 23.1, 23.9, 26.1, 28.2]

function sled(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  box(x, -110, -30, 220, 34, RED, { b: 6, hi: 'rgba(255,255,255,0.25)' })
  R(x, INK, -110, 10, 230, 8); R(x, INK, 110, -10, 18, 28); R(x, '#c6d6f2', -104, 12, 214, 4)
  x.restore()
}
function tv(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  box(x, -120, -90, 240, 160, '#2a2148', { b: 7 }); R(x, '#3a6ac8', -104, -76, 208, 132)
  // a sad pixel dog in the rain
  drawBits(x, ['B...B.', 'BBBBB.', 'BEBEB.', 'BBBBBB', '.BBBB.', '.B..B.'], { B: '#c99a6a', E: INK }, 0, -6, 14)
  R(x, '#8fe3ff', -20, 14 + ((t * 30) % 20), 4, 8)
  R(x, INK, -50, 70, 100, 14)
  x.restore()
}

function scene(x, t, K) {
  const ok = K.ok
  if (t < T.out) {
    room(x, { wall: '#2b1f48', wall2: '#33265a', floorY: 1290, floor: '#3b2b34' })
    door(x, 110, 800, 250, 490, 1, { col: '#3a5290' })
    // through the door: snow outside
    x.save(); x.beginPath(); x.rect(110, 800, 250, 490); x.clip(); R(x, '#22356c', 110, 800, 250, 490); snowfall(x, t, 0.8); R(x, SNOW, 110, 1240, 250, 50); x.restore()
    // the couch + Pisces under three blankets
    couch(x, 770, 1290, 520, '#4a3d8e')
    const pmood = t < T.b2 ? 'sleepy' : t < T.tv ? 'happy' : t < T.b3 ? 'wide' : t < 19 ? 'neutral' : 'sparkle'
    star(x, t, 'pisces', { x: 770, y: 1050, s: 250, mood: pmood, zzz: false, look: [-1, 0], tears: t > T.tv ? 3 : 2, hops: PIS_HOPS, seed: 6 })
    blanket(x, t, 770, 1120, 420, 150, '#7c74f0', BONE); blanket(x, t, 770, 1165, 440, 110, '#2fc79a', GOLD); blanket(x, t, 770, 1205, 460, 80, '#c8283c', GOLD)
    // Pisces's pitch props
    mug(x, t, 990, 1000, pop01(t, T.soup, 0.3, 2.4) * outK(t, [T.b3 - 0.2, T.b3]), '#f39a3a')
    tv(x, t, 780, 820, pop01(t, T.tv, 0.35, 2.2) * outK(t, [T.b3 - 0.2, T.b3]))
    // Aries at the door, bouncing
    const AF = star(x, t, 'aries', { x: 330, y: 1130, s: 250, mood: t < T.splat ? 'sparkle' : t < T.splat + 0.9 ? 'wide' : t < T.b3 ? 'happy' : t < 17.6 ? 'neutral' : 'happy', look: [1, 0], hops: ARI_HOPS, hat: RED, scarf: GOLD, seed: 3 })
    // Aries's pitch props
    const lk = pop01(t, T.lt, 0.3, 2.2) * outK(t, [T.b3 - 0.2, T.b3])
    if (lk > 0.01) { x.save(); x.globalAlpha *= clamp(lk); lights(x, t, 60, 640, 520, 640, { n: 7, sag: 50 }); x.restore() }
    sled(x, 340, 1290, pop01(t, T.sled, 0.3, 2.2) * outK(t, [T.b3 - 0.2, T.b3]))
    // the snowball: flies in through the door and lands on Aries's hat
    if (t > T.ball && t < T.splat) { const p = prog(t, T.ball, T.splat); x.fillStyle = INK; x.beginPath(); x.arc(lerp(150, 330, p), lerp(980, 1000, p) - 160 * Math.sin(Math.PI * p), 30, 0, 7); x.fill(); x.fillStyle = SNOW; x.beginPath(); x.arc(lerp(150, 330, p), lerp(980, 1000, p) - 160 * Math.sin(Math.PI * p), 24, 0, 7); x.fill() }
    if (t > T.splat && t < T.b3 && AF) { R(x, INK, AF.ox - 70, AF.cy - 150, 140, 40); R(x, SNOW, AF.ox - 64, AF.cy - 146, 128, 30); for (let i = 0; i < 5; i++) R(x, SNOW, AF.ox - 60 + i * 30, AF.cy - 110 + (i % 2) * 14, 14, 18) }
    sparkles(x, t, 330, 1000, T.splat, 10, 120, 1, [SNOW, ICE, BONE])
    // THE STARS
    const stk = pop01(t, T.b3, 0.4, 2) * outK(t, [T.out - 0.2, T.out])
    if (stk > 0.01) star(x, t, 'stars', { x: 560, y: 700, s: 160, pop: stk, mood: t > 19 ? 'sparkle' : 'happy', hops: [T.b3 + 0.2, ...talkHops(L3, SP, { cps: 30 })], seed: 2 })
    return
  }
  // ── out: walking under the lights
  if (t < T.home) {
    ground(x, t, 1290)
    for (let i = 0; i < 3; i++) lights(x, t, -40 + i * 380, 600 + (i % 2) * 40, 340 + i * 380, 600 + ((i + 1) % 2) * 40, { n: 6, sag: 60 })
    for (const px of [20, 400, 780]) { R(x, INK, px, 600, 16, 690); R(x, '#5a4636', px + 4, 600, 8, 690) }
    const w = 40 * Math.sin((t - T.out) * 0.6)
    shadow(x, 400 + w, 1300, 240 * ok); shadow(x, 680 + w, 1300, 240 * ok)
    star(x, t, 'aries', { x: 400 + w, y: 1150, s: 260, mood: 'happy', look: [1, -0.4], hops: ARI_HOPS, hat: RED, scarf: GOLD, seed: 3, pop: ok })
    star(x, t, 'pisces', { x: 680 + w, y: 1150, s: 260, mood: 'sparkle', look: [-1, -1], tears: 3, hops: PIS_HOPS, hat: '#7c74f0', scarf: PINK, seed: 6, pop: ok })
    bubble(x, t, 760, 880, 22.2, 24.6, "they're so PRETTY", { size: 34, tail: -0.2, col: '#e2deff' })
    return
  }
  // ── in: one blanket, two mugs
  room(x, { wall: '#2b1f48', wall2: '#33265a', floorY: 1290, floor: '#3b2b34' })
  glow(x, 540, 1050, 560, 0.8)
  couch(x, 540, 1290, 640, '#4a3d8e')
  star(x, t, 'aries', { x: 420, y: 1120, s: 250, mood: 'happy', look: [1, 0], hops: ARI_HOPS, hat: RED, seed: 3, pop: ok })
  star(x, t, 'pisces', { x: 660, y: 1120, s: 250, mood: 'heart', look: [-1, 0], tears: 3, hops: PIS_HOPS, hat: '#7c74f0', seed: 6, pop: ok })
  blanket(x, t, 540, 1170, 560, 110, '#c8283c', GOLD)
  mug(x, t, 300, 1110, 0.8 * ok, RED); mug(x, t, 790, 1110, 0.8 * ok, '#7c74f0')
  hearts(x, t, T.home + 0.3, 540, 930, { n: 6, cell: 7 })
}

const EP = makeEp({
  id: 'nc14e20', ep: 20, duration: 35, key: 'G',
  heads: [
    { text: 'Night in or | night *out?*', at: -1.2, out: [6.2, 6.4], accentColor: AC, size: 110, accentSize: 150 },
    { text: 'The *pitches.*', at: T.b2 + 0.1, out: [13.4, 13.6], accentColor: PC, size: 112, accentSize: 150 },
    { text: "You don't need | a *winner.*", at: T.b3 + 0.05, out: [20.8, 21.0], accentColor: GOLD, size: 104, accentSize: 140 },
    { text: 'Out, then in. | *Together.*', at: T.out + 0.2, late: 1, lateAt: 22.0, wobble: true, out: [30.0, 30.3], accentColor: AC, size: 108, accentSize: 156 },
  ],
  boxes: [
    { lines: L1, open: 0.8, close: 6.2 },
    { lines: L2, open: 6.6, close: 13.4 },
    { lines: L3, open: 13.8, close: 20.9 },
  ],
  ghost: { at: 9.0, x: 640, y: 1120, from: 'below', cell: 3 },
  snow: t => t > T.out && t < T.home ? 1 : 0, ground: false,
  scene,
  cues: [
    ...[0.45, 1.35, 2.25, 3.15].map(a => ['tick', a, 0.03]),
    ['pop', T.lt, 1567.98, 0.04, -0.3], ['glitter', T.lt, T.lt + 0.4], ['pop', T.sled, 880, 0.04, -0.3],
    ['whoosh', T.ball, 0.4, 0.04], ['tom', T.splat, 110, { gain: 0.22, decay: 0.25 }], ['tick', T.splat, 0.06],
    ['pop', T.soup, 987.77, 0.04, 0.3], ['pop', T.bl, 739.99, 0.04, 0.3], ['pop', T.tv, 659.25, 0.04, 0.3], ['pluck', T.tv + 0.3, 440, 0.03, 0.8, 0.3],
    ['pop', T.b3 + 0.2, 987.77, 0.04, 0], ['glitter', T.b3, T.b3 + 0.4],
    ['whoosh', T.out, 0.5, 0.04], ['glitter', T.out + 0.3, T.out + 1.0], ['whoosh', T.home, 0.4, 0.035], ['pluck', T.home + 0.3, 1174.66, 0.04, 0.6, 0],
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [HEART, MINT, r3]
