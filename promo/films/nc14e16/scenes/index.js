// nc14e16: CUFFING SEASON, "The matching mittens" (28 s vertical, promo/films/next30/b02.md, music: pop · F)
// Story 0–25.6, then the short end card (no Align card transition). The season look lives in ../../nc14e13/cuffkit.js.
//   0.0–5.4    "Capricorn bought | *matching mittens.*"  Frame 0: ♑ Capricorn mid-pace on a snowy street, a gift box hidden
//              behind its back.
//   5.4–12.6   "Rehearsing on | a *snowman.*"  CAPRICORN (to the snowman): "please accept this *practical* gift." → "a winter
//              *partnership* proposal."  The snowman's carrot nose droops off.  (the ghost peeks round the lamp post, 9.6)
//  12.7–18.6   "Or just | say *why.*"  THE STARS: "or just say *why.*"  ♋ Cancer arrives. CAPRICORN: "your hands are always
//              cold. i *noticed.*"  The lid pops: two green mittens.
//  18.6–25.1   Cancer pulls out a matching green scarf it knitted for Capricorn. Both blush. Pisces sobs into its own
//              mittens by the lamp. Last line: "Small gift. | *Big* sign."
import { makeEp, star, gift, mitten, snowman, bubble, hearts, sparkles, shadow, R, glow,
  pop01, outK, prog, lerp, clamp, ease, talkHops, SNOW, ICE, PINK, GOLD, RED, MINT, INK, BONE, r3 } from '../../nc14e13/cuffkit.js'

const SP = 'THE STARS', CAP = '♑︎ CAPRICORN', CC = '#7ff0c8', GREEN = '#2fc79a'
const L2 = [
  { t: 5.8, speaker: CAP, color: CC, text: 'please accept this *practical* gift.' },
  { t: 8.4, speaker: CAP, color: CC, text: 'a winter *partnership* proposal.' },
]
const L3 = [
  { t: 12.9, speaker: SP, text: 'or just say *why.*' },
  { t: 15.2, speaker: CAP, color: CC, text: 'your hands are always cold. i *noticed.*' },
]
const T = { b2: 5.4, nose: 10.6, cut: 12.6, b3: 12.7, cancer: 14.0, open: 17.6, scarf: 19.0, fin: 18.6 }
const CAP_HOPS = [0.3, 1.5, 2.7, 3.9, ...talkHops(L2, CAP, { cps: 30 }), T.nose + 0.1, ...talkHops(L3, CAP, { cps: 30 }), T.open, T.scarf + 0.6, 22.0, 23.6]
const CAN_HOPS = [T.cancer + 0.3, T.open + 0.1, T.scarf, 20.4, 22.1, 23.7]

function lamp(x, t) {
  R(x, INK, 190, 560, 22, 640); R(x, '#3a3350', 195, 560, 12, 640); R(x, INK, 155, 540, 92, 40); R(x, '#ffd89a', 165, 546, 72, 28)
  glow(x, 201, 600, 440, 0.9)
}

function scene(x, t, K) {
  const ok = K.ok
  x.translate(0, 110)
  lamp(x, t)
  // Pisces behind the lamp, sobbing into its own mittens
  const pis = { x: 130, y: 1060, s: 170, mood: t > T.scarf ? 'heart' : t > T.open ? 'wide' : 'sparkle', look: [1, 0], tears: t > T.open ? 3 : 2, hat: '#7c74f0', pop: ok, seed: 6, hops: [T.open + 0.1, T.scarf + 0.2] }
  const PF = star(x, t, 'pisces', pis)
  if (PF && t > T.scarf + 0.3) { mitten(x, 80, PF.cy + 30, 6, '#7c74f0', { rot: -0.3 }); mitten(x, 180, PF.cy + 30, 6, '#7c74f0', { rot: 0.3, flip: true }) }
  // the snowman stand-in (right of centre), its nose drooping off
  const smk = outK(t, [T.b3 - 0.2, T.b3 + 0.2])
  if (smk > 0.01) {
    snowman(x, t, 800, 1200, 0.9 * smk)
    if (t > T.nose) { const p = ease.inCubic(prog(t, T.nose, T.nose + 0.5)); x.save(); x.translate(818 + p * 10, 961 + p * 230); x.rotate(p * 2); R(x, '#f39a3a', 0, -4, 24, 8); x.restore() }
  }
  // Capricorn paces (cold open), then stands to rehearse / give
  const pace = t < T.b2 ? 420 + 120 * Math.sin(t * 1.6) : lerp(560, 420, ease.inOutCubic(prog(t, T.b3, T.b3 + 0.8)))
  const flip = t < T.b2 && Math.cos(t * 1.6) < 0
  const giving = t > 16.8
  // the gift: behind its back, then held out
  const gx = giving ? lerp(pace + 90, pace + 160, ease.outBack(prog(t, 16.8, 17.2))) : pace + (flip ? 110 : -110)
  const gy = giving ? 1160 : 1150
  if (!giving) gift(x, gx, gy, 120, RED, GOLD, 0)
  shadow(x, pace, 1200, 260 * ok)
  const capMood = t < T.b2 ? 'squint' : t < T.b3 ? 'neutral' : t < 15.2 ? 'wide' : t < T.scarf ? 'happy' : 'heart'
  star(x, t, 'capricorn', { x: pace, y: 1060, s: 260, mood: capMood, look: t < T.b2 ? [flip ? -1 : 1, 0] : t < T.b3 ? [1, 0] : [1, 0], hops: CAP_HOPS, hat: '#2a2148', scarf: t > T.scarf + 0.5 ? GREEN : null, blush: t > 15.2 ? 1 : 0, pop: ok, seed: 10 })
  if (giving) {
    gift(x, gx, gy, 120, RED, GOLD, ease.outBack(prog(t, T.open, T.open + 0.4)))
    const mk = pop01(t, T.open + 0.1, 0.35, 2.4) * (1 - prog(t, T.scarf - 0.2, T.scarf + 0.2))
    if (mk > 0.01) { mitten(x, gx - 40, gy - 150 - 30 * mk, 8 * mk, GREEN); mitten(x, gx + 40, gy - 150 - 30 * mk, 8 * mk, GREEN, { flip: true }) }
  }
  sparkles(x, t, gx, gy - 140, T.open + 0.1, 10, 140, 1, [GREEN, GOLD, BONE])
  // Cancer arrives from the right
  const ck = ease.outCubic(prog(t, T.cancer, T.cancer + 0.8))
  if (ck > 0) {
    const cx = lerp(1250, 790, ck)
    shadow(x, cx, 1200, 240 * ok)
    const CF = star(x, t, 'cancer', { x: cx, y: 1065, s: 250, mood: t < T.open ? 'happy' : t < T.scarf ? 'wide' : 'heart', look: [-1, 0], hops: CAN_HOPS, hat: '#3fb6f0', blush: t > T.open ? 1 : 0, pop: ok, seed: 4 })
    // the matching scarf: pulled out and draped on Capricorn (long ribbon of green)
    if (t > T.scarf && t < T.scarf + 0.6 && CF) {
      const p = ease.inOutCubic(prog(t, T.scarf, T.scarf + 0.6))
      const ax = lerp(cx - 60, pace + 30, p), ay = lerp(1080, 1150, p) - 80 * Math.sin(Math.PI * p)
      R(x, INK, ax - 60, ay - 14, 120, 28); R(x, GREEN, ax - 54, ay - 8, 108, 16)
    }
    // Cancer wears the mittens after the gift
    if (CF && t > T.scarf + 0.2) { mitten(x, cx - 120, CF.cy + 40, 6, GREEN, { rot: -0.4 }); mitten(x, cx + 120, CF.cy + 40, 6, GREEN, { rot: 0.4, flip: true }) }
  }
  bubble(x, t, 820, 740, T.scarf - 0.05, T.scarf + 1.6, 'i made you one too.', { size: 34, tail: 0.1 })
  // THE STARS
  const stk = pop01(t, T.b3, 0.4, 2) * outK(t, [T.fin - 0.2, T.fin])
  if (stk > 0.01) star(x, t, 'stars', { x: 620, y: 700, s: 160, pop: stk, mood: 'happy', hops: [T.b3 + 0.2, ...talkHops(L3, SP, { cps: 30 })], seed: 2 })
  hearts(x, t, T.scarf + 0.6, 600, 880, { n: 7, cell: 7 })
  sparkles(x, t, 600, 940, T.scarf + 0.6, 12, 220, 2, [GREEN, GOLD, PINK])
}

const EP = makeEp({
  id: 'nc14e16', ep: 16, duration: 30, key: 'F',
  heads: [
    { text: 'Capricorn bought | *matching mittens.*', at: -1.2, out: [5.2, 5.4], accentColor: GREEN, size: 96, accentSize: 132 },
    { text: 'Rehearsing on | a *snowman.*', at: T.b2 + 0.1, out: [12.3, 12.5], accentColor: ICE, size: 104, accentSize: 140 },
    { text: 'Or just | say *why.*', at: T.b3 + 0.05, out: [18.4, 18.6], accentColor: GOLD, size: 108, accentSize: 148 },
    { text: 'Small gift. | *Big* sign.', at: T.fin + 0.2, late: 2, lateAt: 19.6, wobble: true, out: [25.0, 25.3], accentColor: CC, size: 108, accentSize: 156 },
  ],
  boxes: [
    { lines: L2, open: 5.6, close: 12.4 },
    { lines: L3, open: 12.8, close: 18.5 },
  ],
  ghost: { at: 9.6, x: 212, y: 870, from: 'left', cell: 3 },
  snow: 0.85, ground: 1290,
  scene,
  cues: [
    ...[0.3, 1.5, 2.7, 3.9].map(h => ['tick', h + 0.05, 0.03]),
    ['whoosh', T.nose, 0.3, 0.03], ['pluck', T.nose + 0.1, 440, 0.035, 0.6, 0.4], ['tick', T.nose + 0.5, 0.05],
    ['pop', T.b3 + 0.2, 987.77, 0.04, 0], ['whoosh', T.cancer, 0.5, 0.035],
    ['pop', T.open, 1318.51, 0.05, 0], ['glitter', T.open + 0.1, T.open + 0.6], ['bell', T.open + 0.15, 1760, 0.03, 1.2, 0],
    ['whoosh', T.scarf, 0.4, 0.04], ['pluck', T.scarf + 0.6, 1174.66, 0.045, 0.5, 0], ['pluck', T.scarf + 0.72, 1567.98, 0.04, 0.5, 0], ['glitter', T.scarf + 0.6, T.scarf + 1.1],
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [SNOW, MINT, clamp, r3]
