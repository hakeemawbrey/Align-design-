// ngfe22: 24 DAYS OF GREEN FLAGS, door 22: "Keeps your secrets." (18 s vertical, pop · Eb)
//   hook "“So what did | *they tell you?*”" · Gemini leans in at Capricorn: "so? what did Libra say?" Capricorn: "that's
//   theirs to share." and zips its mouth (a pixel zipper, ZZZIP). Gemini deflates: "…fair." Behind them, Libra
//   beams. Last: "*Safe* with them."
import { makeDoor, room, windowFrame, bubble, hearts, shadow, label, drawStarChar, signStar, starFrame, inSprite, sparkles, R, INK, GOLD, BONE, prog, ease, lerp } from '../../ngfe01/scenes/advent.js'
const GEM = signStar('gemini')
function zipper(x, F, k) {
  inSprite(x, F, () => {
    const w = 12 * k
    x.fillStyle = INK; x.fillRect(12 - 0.4, 21.4, w + 0.8, 2.2)
    for (let i = 0; i < w; i += 1) { x.fillStyle = i % 2 ? '#c9c2dc' : '#8f88a8'; x.fillRect(12 + i, 21.8, 1, 1.4) }
    x.fillStyle = INK; x.fillRect(12 + w - 0.4, 21, 2.2, 3.4); x.fillStyle = GOLD; x.fillRect(12 + w, 21.4, 1.4, 2.6)
  })
}
function scene(x, t, S) {
  const { u, hero, mate } = S
  room(x, { wall: '#30264e', wall2: '#382c5a', floor: '#44325a' })
  windowFrame(x, t, 380, 280, 320, 260)
  // Libra in the background (right, smaller)
  shadow(x, 900, 1100, 160)
  mate(x, t, { x: 900, y: 970, s: 170, mood: u < 3.6 ? 'neutral' : 'heart', look: [-1, 0], hops: [S.t0 + 3.65] })
  if (u > 3.6) hearts(x, t, S.t0 + 3.7, 900, 820, { n: 4 })
  // Gemini leans in
  const lean = ease.outCubic(prog(u, 0.2, 0.6)) * (1 - ease.inOutCubic(prog(u, 3.3, 3.7)))
  shadow(x, 250, 1170, 220); shadow(x, 560, 1170, 230)
  drawStarChar(x, lerp(220, 290, lean), 1000, 240, t, { color: GEM.color, glyph: GEM.glyph, mood: u < 3.3 ? 'sparkle' : 'squint', look: [1, -0.2], seed: 9, glow: 1, squash: u > 3.3 && u < 4.2 ? 0.08 : 0, hops: [S.t0 + 0.3, S.t0 + 0.6] })
  const co = { x: 570, y: 1000, s: 250, mood: u < 2.9 ? 'neutral' : 'happy', look: u < 2.9 ? [-1, 0] : [0, 0], hops: [S.t0 + 1.7, S.t0 + 2.95] }
  hero(x, t, co)
  const zk = ease.inOutCubic(prog(u, 2.95, 3.25))
  if (zk > 0) zipper(x, starFrame(co.x, co.y, co.s, t, { hops: co.hops, seed: 3 }), zk)
  if (u > 2.95 && u < 3.6) label(x, 'ZZZIP', 570, 780, { size: 46, col: GOLD, font: 'Inter, sans-serif', weight: 800, rot: -0.05 })
  sparkles(x, t, 570, 1000, S.t0 + 3.25, 8, 150, 2, [GOLD, BONE])
  bubble(x, t, 330, 680, S.t0 + 0.4, S.t0 + 1.7, 'so? what did\nLibra say?', { size: 44, tail: -0.1 })
  bubble(x, t, 570, 700, S.t0 + 1.75, S.t0 + 2.95, "that's theirs\nto share.", { size: 44, tail: 0, col: '#ffe0c2' })
  bubble(x, t, 260, 700, S.t0 + 3.7, S.t1 - 0.2, '…fair.', { size: 46, tail: -0.1 })
  void R
}
const EP = makeDoor({
  day: 22, hero: 'capricorn', mate: 'libra', hook: '“So what did | *they tell you?*”',
  flag: 'keeps *your* secrets.', scene, pis: { x: 950, y: 1720 },
  payoff(x, t, S) { if (S.ok > 0.5) zipper(x, starFrame(280, 1060, 240 * S.ok, t, { hops: S.PAY_HOPS, seed: 3 }), 1) },
  heroMood: 'happy',
  cues: [['whoosh', 0.2, 0.3, 0.03], ['pop', 0.4, 1174.66, 0.04, -0.3], ['pop', 1.75, 880, 0.04, 0], ['riser', 2.95, 3.25, 0.03], ['tick', 3.25, 0.06], ['pop', 3.7, 659.25, 0.035, -0.3], ['pluck', 3.7, 1567.98, 0.035, 0.5, 0.4]],
  last: '*Safe* with them.',
})
export const DURATION = EP.DURATION, SCENES = EP.SCENES, CUES = EP.CUES
