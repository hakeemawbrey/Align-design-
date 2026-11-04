// naske05 · Ask the Stars, Volume 2, ep 5 · "What if they don't like my friends?" (20 s, star_advice post)
// Story 0–15.6, then the shared end card. The look lives in ../../naske01/askkit.js.
//   0.00  frame 0: the DM; ♌ Leo beaming, holding a gold group-photo frame up over its head (its crew inside, waving).
//   2.5   LEO: "first hangouts are awkward. give it time."  chip ♌ FIXED FIRE · RULED BY THE SUN
//   ~3.6  a "?" pops over the new pink star standing apart at the edge of the photo. Leo deflates.
//   ~5.6  "ask what felt off, and listen first."  Leo listens (looking down, small).
//   ~8.4  "you don't have to choose. blend slowly."  The pink star scoots in between the crew; everyone hops.
//   card cut → "Your people | *and* your person."  Pisces (left) cries happily.
import { askFilm, crier, drawPixelStar, floatHeart, sparkles, lerp, prog, ease, clamp, pop01, INK, GOLD, PINK, signStar } from '../../naske01/askkit.js'

const FR = { x: 540, y: 690, w: 500, h: 290 }
const CREW = [{ c: signStar('aries').color, u: 0.16 }, { c: signStar('leo').color, u: 0.33 }, { c: signStar('aquarius').color, u: 0.5 }]

const F = askFilm({
  id: 'naske05', sign: 'leo',
  question: "What if they don't *like* my friends?",
  lines: ['first hangouts are awkward. give it time.', 'ask what felt off, and listen first.', "you don't have to choose. blend slowly."],
  chip: '♌ FIXED FIRE · RULED BY THE SUN',
  last: 'Your people | *and* your person.', late: 3, lastSize: 100, lastAccent: 140,
  hero: { x: 540, y: 1020, size: 340 },
  extraT: T => ({ q: T.l[0] + 1.1, blend: T.l[2] + 0.5 }),
  state(t, T) {
    if (t < T.q) return { mood: 'happy', look: [0, -1], squash: -0.05 }
    if (t < T.l[1]) return { mood: 'wide', look: [1, -1], squash: 0.1 * clamp((t - T.q) * 3) }
    if (t < T.blend) return { mood: 'neutral', look: [0, 1], squash: 0.08 }
    return { mood: 'heart', look: [0, -1] }
  },
  front(x, t, T, H) {
    const ok = H.ok
    if (ok <= 0.01) return
    const sag = t > T.q && t < T.blend ? 18 * clamp((t - T.q) * 3) : 0
    const cx = FR.x, cy = FR.y + sag + Math.sin(t * 2.2) * 5, w = FR.w * ok, h = FR.h * ok
    // the arms of the tips holding it up
    x.fillStyle = INK; x.fillRect(cx - 150, cy + h / 2 - 4, 22, H.y - 120 - (cy + h / 2)); x.fillRect(cx + 128, cy + h / 2 - 4, 22, H.y - 120 - (cy + h / 2))
    x.fillStyle = H.opts.color; x.fillRect(cx - 146, cy + h / 2, 14, H.y - 124 - (cy + h / 2)); x.fillRect(cx + 132, cy + h / 2, 14, H.y - 124 - (cy + h / 2))
    // the frame
    x.fillStyle = INK; x.fillRect(cx - w / 2 - 8, cy - h / 2 - 8, w + 16, h + 16)
    x.fillStyle = GOLD; x.fillRect(cx - w / 2, cy - h / 2, w, h)
    x.fillStyle = '#c9952f'; x.fillRect(cx - w / 2 + 6, cy + h / 2 - 12, w - 12, 6)
    x.fillStyle = '#1c1640'; x.fillRect(cx - w / 2 + 22, cy - h / 2 + 22, w - 44, h - 44)
    x.save(); x.beginPath(); x.rect(cx - w / 2 + 22, cy - h / 2 + 22, w - 44, h - 44); x.clip()
    for (let i = 0; i < 9; i++) drawPixelStar(x, cx - w / 2 + 40 + i * 47, cy - h / 2 + 46 + (i % 3) * 18, 10, 1, '#efe6d6')
    const base = cy + h / 2 - 70
    const wave = t > T.blend ? [T.blend + 0.3, T.blend + 0.9, T.blend + 1.5, T.h2Land] : [0.4, 1.4, 2.4]
    CREW.forEach((m, i) => crier(x, t, { x: cx - w / 2 + w * (m.u - (t > T.blend ? 0.0 * ease.outCubic(prog(t, T.blend, T.blend + 0.6)) : 0)), y: base, size: 110 * ok }, { color: m.c, mood: 'happy', seed: i + 2, glow: 0.4, hops: wave.map(v => v + i * 0.12), tips: false }))
    // the new pink star: apart at the right edge, then it scoots in
    const px = lerp(cx - w / 2 + w * 0.86, cx - w / 2 + w * 0.6, ease.outBack(prog(t, T.blend, T.blend + 0.6)))
    crier(x, t, { x: px, y: base, size: 100 * ok }, { color: PINK, mood: t < T.blend ? 'neutral' : 'heart', look: [-1, 0], seed: 8, glow: 0.4, hops: t > T.blend ? [T.blend + 0.1, T.blend + 0.9, T.h2Land] : null, tips: false })
    x.restore()
    // the "?" over the pink star
    const qk = pop01(t, T.q, 0.35, 2.6) * (1 - prog(t, T.blend - 0.3, T.blend))
    if (qk > 0.01) { x.save(); x.font = "800 90px Inter, sans-serif"; x.textAlign = 'center'; x.lineWidth = 10; x.strokeStyle = INK; x.fillStyle = '#ffd34d'; x.translate(px + 30, base - 120); x.scale(qk, qk); x.strokeText('?', 0, 0); x.fillText('?', 0, 0); x.restore() }
    sparkles(x, t, cx, cy, T.blend + 0.3, 12, 260, 1)
    floatHeart(x, t, T.blend + 0.5, px, base - 60)
    floatHeart(x, t, T.h2Land, cx - 120, cy - 120)
  },
  cues: T => [
    ['pluck', 0.4, 880, 0.02, 0.4, -0.2], ['pluck', 1.4, 987.77, 0.02, 0.4, 0.2],
    ['pop', T.q, 523.25, 0.04, 0.4], ['pluck', T.q + 0.2, 392, 0.03, 0.6, 0],
    ['whoosh', T.blend, 0.4, 0.035], ['pop', T.blend + 0.3, 1174.66, 0.03, -0.2], ['pop', T.blend + 0.42, 1318.51, 0.03, 0], ['pop', T.blend + 0.54, 1567.98, 0.03, 0.2], ['glitter', T.blend + 0.3, T.blend + 0.8],
  ],
})
export const { DURATION, SCENES, CUES, T, DROP } = F
export default F
