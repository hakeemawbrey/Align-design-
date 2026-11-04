// naske04 · Ask the Stars, Volume 2, ep 4 · "How do I let them take care of me?" (20 s, star_advice post)
// Story 0–15.6, then the shared end card. The look lives in ../../naske01/askkit.js.
//   0.00  frame 0: the DM; ♋ Cancer mid-toss, flinging a plaid blanket over the last of three little stars in a row
//         (♓ Pisces, already tucked in, sniffles happily at the end of the row).
//   2.5   CANCER: "you care for everyone. let it come back."  chip ♋ CARDINAL WATER · RULED BY THE MOON
//   ~3.9  it reaches for its own blanket: the stack is empty. "BRRR." A shiver, frost on its tips.
//   ~5.6  "when they offer, try just 'thank you.'"  A blanket drops onto Cancer from above. A heart pops.
//   ~8.4  "receiving is part of loving too."  All four, tucked in, rocking together.
//   card cut → "Let *them* | hold the blanket."  Pisces cries happily.
import { askFilm, crier, drawBurst, floatHeart, lerp, prog, ease, clamp, pop01, INK, signStar } from '../../naske01/askkit.js'

const PLAIDS = [['#c8283c', '#f2c75c'], ['#3f7cf0', '#efe6d6'], ['#2fc79a', '#f5eedf'], ['#e9b24a', '#7a3b2e']]
function blanket(x, cx, cy, w, h, pal, { rot = 0, alpha = 1 } = {}) {
  if (alpha <= 0 || w <= 2) return
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = pal[0]; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = pal[1]
  const s = Math.max(8, Math.round(w / 9))
  for (let i = -w / 2 + s / 2; i < w / 2; i += s * 2) x.fillRect(Math.round(i), -h / 2, Math.round(s / 3), h)
  for (let j = -h / 2 + s / 2; j < h / 2; j += s * 2) x.fillRect(-w / 2, Math.round(j), w, Math.round(s / 3))
  x.fillStyle = 'rgba(255,255,255,0.18)'; x.fillRect(-w / 2, -h / 2, w, 8)
  x.restore()
}
const ROW = [{ x: 345, s: 140, c: signStar('leo').color, seed: 3 }, { x: 505, s: 140, c: signStar('libra').color, seed: 5 }]

const F = askFilm({
  id: 'naske04', sign: 'cancer',
  question: 'How do I let them *take care* of me?',
  lines: ['you care for everyone. let it come back.', "when they offer, try just 'thank you.'", 'receiving is part of loving too.'],
  chip: '♋ CARDINAL WATER · RULED BY THE MOON',
  last: 'Let *them* | hold the blanket.', late: 3, lastSize: 100, lastAccent: 140,
  hero: { x: 800, y: 1010, size: 330 },
  pisces: { x: 185, y: 1130, size: 150 },
  extraT: T => ({ toss: [-0.3, 0.55], empty: T.l[0] + 1.4, gift: T.l[1] + 0.35 }),
  state(t, T) {
    if (t < T.toss[1]) return { mood: 'happy', look: [-1, 0], squash: -0.06, hops: false }
    if (t < T.empty) return { mood: 'happy' }
    if (t < T.gift + 0.25) return { mood: 'squint', look: [0, 0], squash: 0.04 * Math.sin(t * 60), dx: 3 * Math.sin(t * 70) }
    if (t < T.gift + 0.6) return { mood: 'wide', look: [0, -1] }
    return { mood: t < T.l[2] ? 'heart' : 'happy' }
  },
  back(x, t, T, H) {
    // the row of tucked-in friends (Pisces is the cameo at the end of it)
    blanket(x, 185, 1200, 170, 50, PLAIDS[1], { rot: 0.03 })
    ROW.forEach((r, i) => {
      crier(x, t, { x: r.x, y: 1120, size: r.s }, { color: r.c, mood: i ? 'sleepy' : 'happy', seed: r.seed, glow: 0.6, zzz: i === 1, pop: H.ok })
      if (i === 0) blanket(x, r.x, 1190, 160 * H.ok, 56 * H.ok, PLAIDS[2])
      else {
        // the toss on frame 0: the blanket flies from Cancer and lands on the last friend
        const p = ease.outCubic(prog(t, ...T.toss))
        blanket(x, lerp(H.x - 120, r.x, p), lerp(900, 1190, p), lerp(120, 160, p) * H.ok, lerp(50, 56, p) * H.ok, PLAIDS[0], { rot: lerp(-0.8, 0.02, p) })
      }
    })
    // the stack (one left until the toss, then none)
    const sx = H.x + 150
    if (t < T.toss[0] + 0.05) blanket(x, sx, 1195, 110, 26, PLAIDS[0])
    x.save(); x.fillStyle = '#5a3a26'; x.fillRect(sx - 70, 1210, 140, 14); x.restore()
  },
  front(x, t, T, H) {
    drawBurst(x, H.x + 60, 760, 90, t, T.empty, { word: 'BRRR', size: 46, color: '#cfe9ff', life: 1.0 })
    if (t > T.empty && t < T.gift + 0.3) {
      x.save(); x.fillStyle = 'rgba(214,236,255,0.85)'
      for (let i = 0; i < 10; i++) { const a = i * 0.63, r = 150 + (i % 3) * 18; x.fillRect(Math.round(H.x + Math.cos(a) * r), Math.round(H.y - 30 + Math.sin(a) * r * 0.9), 10, 10) }
      x.restore()
    }
    // the gift: a blanket drops from above and wraps it
    if (t > T.gift - 0.35) {
      const p = ease.outBack(prog(t, T.gift - 0.35, T.gift + 0.1))
      blanket(x, H.x, lerp(560, H.y + 95, p), 280 * H.ok, lerp(60, 105, p) * H.ok, PLAIDS[3], { rot: lerp(0.3, -0.06, p) })
    }
    floatHeart(x, t, T.gift + 0.2, H.x + 40, 800)
    floatHeart(x, t, T.h2Land, H.x - 60, 810)
    floatHeart(x, t, T.h2Land + 0.4, 345, 980)
  },
  cues: T => [
    ['whoosh', 0.0, 0.5, 0.04], ['tick', 0.55, 0.04], ['pop', 0.56, 659.25, 0.03, -0.3],
    ['tick', T.empty - 0.2, 0.03], ['pluck', T.empty, 392, 0.04, 0.4, 0.2], ['tick', T.empty + 0.1, 0.02], ['tick', T.empty + 0.2, 0.02], ['tick', T.empty + 0.3, 0.02],
    ['whoosh', T.gift - 0.35, 0.45, 0.04], ['tick', T.gift + 0.08, 0.05], ['pop', T.gift + 0.2, 1318.51, 0.04, 0.3], ['glitter', T.gift + 0.2, T.gift + 0.6],
  ],
})
export const { DURATION, SCENES, CUES, T, DROP } = F
export default F
