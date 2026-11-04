// naske31 · Ask the Stars, Volume 2, ep 31 · "My friend is dating someone I don't like." (18 s, pop · F)
// The format lives in ../../naske19/scenes/askkit2.js. Story 0–15.6, then the short shared end card (2.4 s).
//   0.0   DM: "My friend is dating someone I *don't* like."  ♎ Libra mid-gasp at an instant photo of its friend and
//         the new date, eyes wide.
//   3.0   "if it's a real worry, say it once. kindly."  One speech bubble: "i'm a bit worried. that's all."
//   5.9   "'i want you happy. i'm here either way.'"  A heart rings the photo.
//   8.8   "then zip it. friend, not judge."  A pixel zipper zips across Libra's mouth; the friend hugs it.
//   12.1  "Be their friend, | *not* their judge."
import { makeAsk, R, box, drawBits, bubble, sparkles, hearts, shadow, inSprite, starFrame, label, drawStarChar, signStar, pop01, outK, prog, lerp, clamp, ease, INK, BONE, GOLD, RED, HEART } from '../../naske19/scenes/askkit2.js'

const FRIEND = signStar('cancer'), DATE = signStar('aries')
function photo(x, t, cx, cy, s, rot) {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
  box(x, -150, -170, 300, 340, BONE, { b: 7 })
  R(x, '#2a1d5c', -126, -146, 252, 230)
  drawStarChar(x, -55, -20, 120, t, { color: FRIEND.color, mood: 'happy', look: [1, 0], seed: 20, glow: 0.6, tips: false, bob: 0 })
  drawStarChar(x, 55, -20, 120, t, { color: DATE.color, mood: 'happy', look: [-1, 0], seed: 21, glow: 0.6, tips: false, bob: 0 })
  x.restore()
}
function zipperCells(x, p) {
  const x0 = 11, x1 = 25, y = 22.6, xe = lerp(x0, x1, p)
  x.fillStyle = INK; x.fillRect(x0 - 0.4, y - 0.8, xe - x0 + 0.8, 2.4)
  x.fillStyle = '#cfd6e6'; for (let X = x0; X < xe; X += 1.2) x.fillRect(X, y - 0.4, 0.7, 1.6)
  x.fillStyle = INK; x.fillRect(xe - 0.6, y - 1.2, 2.2, 3.4); x.fillStyle = GOLD; x.fillRect(xe - 0.2, y - 0.8, 1.4, 2.6)
}

function scene(x, t, S) {
  const { k, out } = S
  if (k <= 2) {
    photo(x, t, 740, 860, 0.95, 0.08 + (k === 0 ? Math.sin(t * 9) * 0.03 : 0))
    if (k === 2) {
      const hp = pop01(t, S.b[2] + 0.4, 0.4, 2.2)
      for (let i = 0; i < 10; i++) { const a = i / 10 * Math.PI * 2 + t * 0.8; if (hp > 0.5) drawBits(x, HEART, { H: i % 2 ? '#ff5c8a' : GOLD }, 740 + Math.cos(a) * 210, 860 + Math.sin(a) * 230, 5) }
    }
    const o = { x: 300, y: 1010, s: 270, mood: k === 0 ? 'wide' : k === 1 ? 'neutral' : 'happy', look: [1, -0.3], hops: [0.2, ...S.hops(0), ...S.hops(1)], squash: k === 0 ? -0.05 : 0 }
    shadow(x, 300, 1180, 230)
    S.hero(x, t, o)
    if (k === 0) label(x, '!!', 300, 760, { size: 70, col: GOLD, rot: -0.1 })
    if (k === 1) bubble(x, t, 400, 640, S.b[1] + 0.5, S.b[2] + 0.1, "i'm a bit worried. that's all.", { size: 38, tail: -0.5 })
    return
  }
  // beat 3: zip it; the friend hugs Libra
  const kk = pop01(t, S.b[3] - 0.05, 0.4, 2) * out
  const o = { x: 380, y: 1010, s: 280, pop: kk, mood: 'happy', look: [1, 0], hops: S.hops(2) }
  shadow(x, 380, 1180, 230 * kk)
  S.hero(x, t, o)
  const zp = ease.inOutCubic(prog(t, S.b[3] + 0.4, S.b[3] + 1.0))
  if (zp > 0) inSprite(x, starFrame(o.x, o.y, o.s, t, o), () => zipperCells(x, zp))
  if (zp > 0 && zp < 1) label(x, 'ZZZIP', 380, 760, { size: 40, col: BONE })
  const fk = pop01(t, S.b[3] + 1.1, 0.4, 2) * out
  shadow(x, 700, 1180, 220 * fk)
  drawStarChar(x, lerp(760, 650, ease.outCubic(prog(t, S.b[3] + 1.1, S.b[3] + 1.7))), 1010, 250, t, { color: FRIEND.color, glyph: FRIEND.glyph, mood: 'happy', look: [-1, 0], seed: 20, pop: fk, hops: [S.b[3] + 1.8] })
  hearts(x, t, S.b[3] + 1.8, 520, 840, { n: 5, cell: 7, spread: 160 })
}

const EP = makeAsk({
  sign: 'libra', name: 'LIBRA', partner: 'cancer',
  question: "My friend is dating | someone I *don't* like.",
  lines: ["if it's a real worry, say it once. kindly.", "'i want you happy. i'm here either way.'", 'then zip it. friend, not judge.'],
  chip: '♎ NATURAL RULER OF THE 7TH HOUSE: PARTNERSHIPS',
  last: 'Be their friend, | *not* their judge.', lastLate: 3,
  scene, qSize: 84,
  pis: { x: 965, y: 1270, s: 100 },
  cues: [
    ['pop', 0.2, 1318.51, 0.04, 0], ['tick', 0.5, 0.04],
    ['pop', 3.5, 880, 0.035, -0.3],
    ['pop', 6.3, 1046.5, 0.04, 0.3], ['glitter', 6.4, 6.9],
    ['whoosh', 9.2, 0.6, 0.035], ['tick', 9.8, 0.06], ['pop', 9.95, 987.77, 0.035, 0.3], ['glitter', 10.6, 11.0],
  ],
})
export const DURATION = EP.DURATION, SCENES = EP.SCENES, CUES = EP.CUES
