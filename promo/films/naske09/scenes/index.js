// naske09 · Ask the Stars, Volume 2, ep 9 · "I said something too honest. Now what?" (18 s, star_advice post)
// Story 0–15.6, then the short end card (2.4 s). The look lives in ../../naske01/askkit.js.
//   0.00  frame 0: the DM; ♐ Sagittarius, mouth-wide, a big speech bubble bursting out of it: "YOUR SCARF IS… A LOT."
//         Beside it a pink star in an enormous striped scarf, stunned.
//   1.0   Sag grabs the bubble and tries to stuff it back in: it squishes… and BOINGs back out.
//   2.5   SAG: "honest is good. how you say it matters too."  chip ♐ MUTABLE FIRE · RULED BY JUPITER
//   ~5.6  "go back: 'that came out wrong. sorry.'"  The bubble pops; Sag holds up a little SORRY sign with a heart.
//   ~8.4  "then say what you meant, softer."  A soft new bubble: "it's so bold. it really suits you." The pink star blushes.
//   box closes → "Honest, | *and* gentle."  The pink star twirls its scarf. Pisces (left) cries happily.
import { askFilm, crier, drawBubble, drawSign, drawBits, drawBurst, floatHeart, spritePt, lerp, prog, ease, clamp, pop01, INK, PINK, HEART, HEART_C } from '../../naske01/askkit.js'

const FRD = { x: 820, y: 1060, size: 240 }
function scarf(x, t, F, k, twirl = 0) {
  if (k <= 0.01) return
  const a = spritePt(F, 8, 21), b = spritePt(F, 28, 21)
  const cols = ['#2fc79a', '#f2c75c', '#c8283c', '#3f7cf0']
  const seg = 16
  for (let i = 0; i < 12; i++) { x.fillStyle = INK; x.fillRect(Math.round(lerp(a.x, b.x, i / 12)) - 2, Math.round(a.y) - 2, seg + 4, 34); x.fillStyle = cols[i % 4]; x.fillRect(Math.round(lerp(a.x, b.x, i / 12)), Math.round(a.y), seg, 30) }
  // the tail: hangs (and swings on the twirl)
  for (let j = 0; j < 9; j++) {
    const sw = Math.sin(t * 3 + j * 0.4) * 6 + twirl * Math.sin(t * 9 + j * 0.5) * 40 * (j / 9)
    x.fillStyle = INK; x.fillRect(Math.round(b.x - 30 + sw) - 2, Math.round(a.y + 26 + j * 24) - 2, 34, 28); x.fillStyle = cols[j % 4]; x.fillRect(Math.round(b.x - 30 + sw), Math.round(a.y + 26 + j * 24), 30, 24)
  }
}

const F = askFilm({
  id: 'naske09', sign: 'sagittarius',
  question: 'I said something *too* honest. Now what?',
  lines: ['honest is good. how you say it matters too.', "go back: 'that came out wrong. sorry.'", 'then say what you meant, softer.'],
  chip: '♐ MUTABLE FIRE · RULED BY JUPITER',
  last: 'Honest, | *and* gentle.', late: 2,
  hero: { x: 380, y: 1010, size: 320 },
  pisces: { x: 118, y: 1180, size: 170 },
  extraT: T => ({ squish: [0.9, 1.9], boing: 1.9, sorry: T.l[1] + 0.25, soft: T.l[2] + 0.9 }),
  state(t, T) {
    if (t < T.squish[0]) return { mood: 'wide', look: [1, -1], blink: false, hops: false }
    if (t < T.boing + 0.3) return { mood: 'squint', look: [1, -1], squash: 0.08 * Math.sin(t * 18), hops: false }
    if (t < T.sorry) return { mood: 'wide', look: [1, 0] }
    if (t < T.soft) return { mood: 'neutral', look: [1, 0] }
    return { mood: 'happy', look: [1, 0] }
  },
  front(x, t, T, H) {
    const ok = H.ok
    if (ok <= 0.01) return
    // the pink star in the big scarf
    const fm = t < T.sorry ? 'wide' : t < T.soft + 0.3 ? 'neutral' : 'heart'
    const FF = crier(x, t, FRD, { color: PINK, mood: fm, look: [-1, 0], seed: 6, glow: 0.7, pop: ok, blush: t > T.soft, hops: t > T.soft ? [T.soft + 0.4, T.h2Land] : null })
    scarf(x, t, FF, ok, t > T.h2Land ? 1 : 0)
    // the blunt bubble: out at frame 0, squished, BOING, popped at "sorry"
    const sq = t > T.squish[0] && t < T.boing ? ease.inOutCubic(prog(t, T.squish[0], T.boing)) : 0
    const boing = t > T.boing ? 1 + 0.22 * Math.exp(-(t - T.boing) * 5) * Math.sin((t - T.boing) * 20) : 1
    const gone = prog(t, T.sorry - 0.15, T.sorry)
    if (gone < 1) drawBubble(x, lerp(600, H.x + 60, sq * 0.6), lerp(700, H.y - 150, sq * 0.6), 'YOUR SCARF\nIS… A LOT.', { tx: H.x + 40, ty: H.y - 70, size: 62, scale: lerp(1, 0.35, sq) * boing * ok * (1 - gone), rot: -0.04 })
    drawBurst(x, 760, 560, 80, t, T.boing, { word: 'BOING', size: 34, life: 0.7 })
    drawBurst(x, 600, 700, 90, t, T.sorry - 0.1, { word: 'POP', size: 44, life: 0.6, color: '#e9f1ff' })
    // the SORRY sign, held up in its tip
    const sk = pop01(t, T.sorry, 0.35, 2.4) * (1 - prog(t, T.soft - 0.2, T.soft + 0.1))
    if (sk > 0.01) {
      const p = spritePt(H.F, 30, 10)
      drawSign(x, p.x + 40, p.y - 70, 'SORRY', { w: 300, size: 60, color: '#a35cf0', rot: 0.06 * Math.sin(t * 3), scale: sk })
      drawBits(x, HEART, HEART_C, p.x + 200, p.y - 130, 9 * sk)
    }
    // the softer bubble
    const bk = pop01(t, T.soft, 0.4, 2.2) * (1 - prog(t, T.close - 0.1, T.close + 0.15))
    if (bk > 0.01) drawBubble(x, 560, 700, "it's so bold.\nit really suits you.", { tx: H.x + 40, ty: H.y - 70, size: 58, scale: bk, fillC: '#ffe3ee', color: '#7a2a4f', font: "'EB Garamond', serif", weight: 'italic 600' })
    floatHeart(x, t, T.soft + 0.5, FRD.x, FRD.y - 150)
    floatHeart(x, t, T.h2Land, FRD.x - 60, FRD.y - 170)
  },
  cues: T => [
    ['pop', 0.05, 392, 0.04, 0.2], ['whoosh', T.squish[0], 0.6, 0.03], ['tick', 1.2, 0.03], ['tick', 1.5, 0.03],
    ['pop', T.boing, 659.25, 0.05, 0.3], ['pop', T.boing + 0.1, 987.77, 0.035, 0.3],
    ['pop', T.sorry - 0.1, 1318.51, 0.04, 0], ['pluck', T.sorry + 0.1, 880, 0.03, 0.5, -0.2],
    ['pop', T.soft, 1174.66, 0.035, 0.2], ['glitter', T.soft + 0.4, T.soft + 0.8], ['whoosh', T.h2Land, 0.5, 0.025],
  ],
})
export const { DURATION, SCENES, CUES, T, DROP } = F
export default F
