// ndbe09: DEALBREAKER OR NOT? E9, "They wrap gifts | *terribly.*" (13 s vertical trial reel, music: pop · D).
//   0.0–3.9   frame 0: ♐ Sagittarius mid-wrap, tape stuck to one point, paper flapping. Tape strips fly (RIP!), the parcel
//             grows lumpier. 1.8 it lands on ♋ Cancer's lap: a lumpy ball of paper and tape. 2.4 Cancer unwraps: a
//             hand-drawn star map ("our first night out"). 3.0 Cancer melts (heart eyes).
//   3.9 the vote · 6.1 the stamp: NOT A DEALBREAKER.
//   finale    the star map pinned up on the wall; Cancer hugs Sag; the lumpy paper saved, folded on the side.
//             THE STARS: "Lumpy paper. *Perfect* thought."
import { makeDeal, R, box, bubble, label, hearts, sparkles, floor, glow, prog, lerp, ease, clamp, pop01, outK, starFrame, inSprite, drawBits, drawPixelStar, INK, BONE, GOLD, PINK, T } from '../../ndbe01/scenes/dealkit.js'

function lumpy(x, t, cx, cy, s = 1, open = 0) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  const blobs = [[-50, -10, 70], [30, -30, 64], [10, 30, 74], [-30, 40, 50], [60, 20, 50]]
  for (const [bx, by, r] of blobs) { R(x, INK, bx - r / 2 - 6, by - r / 2 - 6, r + 12, r + 12) }
  for (const [bx, by, r] of blobs) { R(x, open ? '#d8546a' : '#e8344e', bx - r / 2, by - r / 2, r, r); R(x, '#3fcf7a', bx - 4, by - r / 2, 8, r) }
  for (let i = 0; i < 6; i++) { x.save(); x.rotate(i * 1.1); R(x, 'rgba(255,255,255,0.7)', -70, -6 + i * 4, 140, 10); x.restore() }
  x.restore()
}
function starMap(x, t, cx, cy, k, rot = 0) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  box(x, -130, -95, 260, 190, '#1e2a5a', { b: 6 })
  const P = [[-80, -40], [-30, -60], [20, -20], [70, -50], [40, 40], [-50, 30]]
  x.strokeStyle = 'rgba(255,240,200,0.7)'; x.lineWidth = 3; x.beginPath(); P.forEach(([a, b], i) => i ? x.lineTo(a, b) : x.moveTo(a, b)); x.stroke()
  P.forEach(([a, b], i) => drawPixelStar(x, a, b, 18, i % 2 ? 1 : 2, GOLD))
  x.font = "italic 500 26px 'EB Garamond', serif"; x.textAlign = 'center'; x.fillStyle = BONE; x.fillText('our first night out', 0, 78)
  x.restore()
}
const LAND = 1.8, OPEN = 2.4, MELT = 3.0
const EP = makeDeal({
  id: 'ndbe09', sign: 'sagittarius', date: 'cancer', verdict: 'not', accent: '#c9a6ff',
  hook: 'They wrap gifts | *terribly.*',
  last: 'Lumpy paper. *Perfect* thought.',
  scene(x, t, S) {
    const { u, hero, date, heroF } = S
    floor(x, 1150, '#30234a')
    const ho = { x: 300, y: 900, s: 250, mood: u < LAND ? 'squint' : 'sparkle', look: [1, 0.5], hops: [0.4, 0.9, 1.3, LAND] }
    hero(x, t, ho)
    inSprite(x, heroF(t, ho), () => { if (u < LAND) { x.fillStyle = 'rgba(255,255,255,0.8)'; x.fillRect(30, 6, 5, 3) } })
    date(x, t, { x: 790, y: 930, s: 230, mood: u > MELT ? 'heart' : u > OPEN ? 'wide' : 'happy', look: [-1, 0.4], hops: [LAND + 0.05, OPEN, MELT] })
    // the parcel: grows lumpier, flies over at LAND
    const fly = ease.inOutCubic(prog(u, LAND - 0.45, LAND))
    const size = lerp(0.6, 1, clamp(prog(u, -0.5, 1.3)))
    const px = lerp(470, 790, fly), py = lerp(1000, 1040, fly) - 160 * Math.sin(Math.PI * fly)
    if (u < OPEN) lumpy(x, t, px, py, size)
    else { lumpy(x, t, 900, 1110, 0.5, 1); starMap(x, t, 680, 720, pop01(t, OPEN, 0.35, 2), -0.05) }
    ;[0.2, 0.75, 1.25].forEach((r, i) => { const k = pop01(t, r, 0.2, 3) * outK(t, [r + 0.35, r + 0.5]); if (k > 0.01) label(x, 'RIP!', 440 + i * 40, 760 - i * 40, { size: 40 * k, col: GOLD, font: 'Inter, sans-serif', weight: 800, rot: -0.2 + i * 0.2 }) })
    sparkles(x, t, 680, 720, OPEN, 10, 170, 1, [GOLD, BONE, PINK])
    hearts(x, t, MELT, 790, 820, { n: 5 })
  },
  sceneCues: [[ 'tick', 0.2, 0.06], ['tick', 0.75, 0.06], ['tick', 1.25, 0.06], ['whoosh', LAND - 0.45, 0.4, 0.03], ['tom', LAND, 110, { gain: 0.15, decay: 0.2 }], ['pop', OPEN, 1174.66, 0.045, 0], ['glitter', OPEN, OPEN + 0.5], ['pluck', MELT, 1567.98, 0.04, 0.5, 0.3]],
  pis: { x: 960, y: 1320, s: 130 },
  finale(x, t, S) {
    const { u, k, hero, date } = S
    floor(x, 1150, '#30234a')
    if (k <= 0.01) return
    R(x, INK, 536, 580, 8, 30)
    starMap(x, t, 540, 690, k * 0.95, 0.03)
    const hug = ease.inOutCubic(prog(u, 0.8, 1.3))
    hero(x, t, { x: lerp(330, 430, hug), y: 990, s: 230, pop: k, mood: 'happy', look: [1, 0], hops: [T.stamp + 1.3] })
    date(x, t, { x: lerp(760, 650, hug), y: 995, s: 220, pop: k, mood: 'heart', look: [-1, 0], hops: [T.stamp + 1.3] })
    lumpy(x, t, 900, 1110, 0.45 * k, 1)
    hearts(x, t, T.stamp + 1.35, 540, 880, { n: 6 })
  },
  finaleCues: [['whoosh', 0.8, 0.4, 0.02], ['pluck', 1.3, 1174.66, 0.04, 0.5, 0], ['pluck', 1.42, 1567.98, 0.035, 0.5, 0]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [R, box, bubble, glow, starFrame, drawBits]
