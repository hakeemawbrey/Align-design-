// naske12 · Ask the Stars, Volume 2, ep 12 · "I cry at everything. Is that too much?" (18 s, star_advice post)
// Story 0–15.6, then the short end card (2.4 s). The look lives in ../../naske01/askkit.js. Pisces is the hero (no cameo).
//   0.00  frame 0: the DM; ♓ Pisces, sparkly-eyed, happy-crying at a snowflake that just landed on its tip, tissue box
//         in hand, a little tower of used tissues already beside it.
//   2.5   PISCES: "feeling deeply isn't too much."  chip ♓ MUTABLE WATER · JUPITER (TRAD.) & NEPTUNE (MODERN)
//         the tissue tower keeps growing, one tissue per beat.
//   ~5.3  "the right person won't ask you to feel less."
//   ~8.0  "try: 'i'm okay. i'm just moved.'"  A friend star leans in with a fresh tissue… and starts crying too.
//   box closes → "Soft is | a *strength*."  Both of them, happy fountains.
import { askFilm, crier, bigTears, drawBits, floatHeart, spritePt, lerp, prog, ease, clamp, pop01, INK, FLAKE, signStar } from '../../naske01/askkit.js'

const BOX = ['...WW...', '..WWWW..', 'BBBBBBBB', 'BPBBBBPB', 'BBBBBBBB', 'BBBBBBBB']
const BOX_C = { W: '#ffffff', B: '#8fd8f6', P: '#ff8fb1' }
const TIS = ['.WW.', 'WWWW', 'WGWW', '.WW.']
const TIS_C = { W: '#ffffff', G: '#d6dcef' }
const FRIEND = { x: 860, y: 1040, size: 230 }

const F = askFilm({
  id: 'naske12', sign: 'pisces',
  question: 'I cry at everything. Is that *too much*?',
  lines: ["feeling deeply isn't too much.", "the right person won't ask you to feel less.", "try: 'i'm okay. i'm just moved.'"],
  chip: '♓ MUTABLE WATER|JUPITER (TRAD.) & NEPTUNE (MODERN)',
  chipTop: 1262,
  last: 'Soft is | a *strength*.', late: 2,
  hero: { x: 450, y: 1000, size: 350 },
  pisces: false,
  tears: (t, T) => (t < T.l[0] ? 2 : t < T.l[2] ? 1 : t < T.h2Land ? 2 : 3),
  extraT: T => ({ friend: T.l[2] + 0.2, offer: T.l[2] + 0.9, fcry: T.l[2] + 1.6 }),
  state(t, T) {
    if (t < T.l[0]) return { mood: 'sparkle', look: [0, -1] }
    if (t < T.friend) return { mood: 'sparkle', look: [0, 0] }
    if (t < T.h2Land) return { mood: 'sparkle', look: [1, 0] }
    return { mood: 'happy' }
  },
  back(x, t, T, H) {
    // the tissue tower (one more each beat)
    const n = Math.min(11, 4 + Math.floor(Math.max(0, t - 0.6) / 1.1))
    for (let i = 0; i < n; i++) drawBits(x, TIS, TIS_C, 190 + ((i * 29) % 50) - 25, 1190 - i * 30, 12 * H.ok, { rot: ((i * 17) % 9 - 4) * 0.1 })
  },
  front(x, t, T, H) {
    const ok = H.ok
    if (ok <= 0.01) return
    // the snowflake on its top tip
    const fk = 1 - prog(t, T.l[1], T.l[1] + 0.6)
    drawBits(x, FLAKE, { W: '#e9f6ff' }, H.x + 4, H.F.oy - H.F.base - H.F.S * 0.47, 16 * ok * fk, { rot: t * 0.3 })
    // the tissue box in its left tip
    const b = spritePt(H.F, 3, 16)
    drawBits(x, BOX, BOX_C, b.x - 10, b.y + 10, 13 * ok)
    // the friend
    const fp = ease.outBack(prog(t, T.friend, T.friend + 0.6))
    if (fp > 0) {
      const P = { ...FRIEND, x: lerp(1250, FRIEND.x, fp) }
      const opts = { color: signStar('cancer').color, mood: t < T.fcry ? 'happy' : 'sparkle', look: [-1, 0], seed: 5, glow: 0.7, pop: ok, hops: [T.offer, T.h2Land] }
      const FF = crier(x, t, P, opts, t > T.fcry ? (t > T.h2Land ? 3 : 2) : 0)
      if (t > T.fcry) bigTears(x, t, FF, t > T.h2Land ? 3 : 2, ok)
      // the offered tissue
      const tk = pop01(t, T.offer, 0.3, 2.4)
      const tp = spritePt(FF, 2, 15)
      if (tk > 0.01) drawBits(x, TIS, TIS_C, tp.x - 20, tp.y - 10 + Math.sin(t * 4) * 4, 14 * tk * ok)
    }
    floatHeart(x, t, T.fcry + 0.2, 700, 820)
    floatHeart(x, t, T.h2Land, H.x, H.y - 230)
    floatHeart(x, t, T.h2Land + 0.5, FRIEND.x, FRIEND.y - 170)
  },
  cues: T => [
    ['bell', 0.05, 1760, 0.015, 1.0, -0.2], ['pluck', 0.4, 659.25, 0.02, 0.5, -0.2],
    ...Array.from({ length: 7 }, (_, i) => ['tick', 0.6 + 1.1 * (i + 1), 0.015]),
    ['whoosh', T.friend, 0.4, 0.03], ['pop', T.offer, 1174.66, 0.035, 0.3], ['pluck', T.fcry, 880, 0.03, 0.6, 0.3], ['glitter', T.fcry, T.fcry + 0.5],
  ],
})
export const { DURATION, SCENES, CUES, T, DROP } = F
export default F
