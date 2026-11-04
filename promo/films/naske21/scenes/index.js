// naske21 · Ask the Stars, Volume 2, ep 21 · "It's too cold to go on dates." (18 s, house · G)
// The format lives in ../../naske19/scenes/askkit2.js. Story 0–15.6, then the short shared end card (2.4 s).
//   0.0   DM: "It's too *cold* to go on dates."  ♐ Sag in a giant puffer and a backpack, mid-hop through the snow,
//         a map flapping in its hand.
//   3.0   "cold is just a plan with a scarf on."  A scarf whips round its neck.
//   5.9   "a winter market. a sunrise walk with cocoa."  String lights swing in; two cocoas pop up.
//   8.8   "or a night in, mapping trips you want."  A big map with dotted heart routes; Sag + partner.
//   12.1  "Bundle up. | Say *yes.*"
import { makeAsk, R, box, drawBits, mug, bubble, sparkles, hearts, shadow, inSprite, starFrame, scarfCells, hatCells, snowBank, label, drawPixelStar, pop01, outK, prog, lerp, clamp, ease, INK, BONE, GOLD, RED, PINK } from '../../naske19/scenes/askkit2.js'

const PUFF = '#5fb8ff', PUFF_D = '#3a86cc'
// the puffer: three fat quilted bands over the lower body (sprite cells)
function pufferCells(x) {
  const bands = [[21.5, 4.2, 9, 27], [25.4, 4.4, 7.5, 28.5], [29.4, 4, 9, 27]]
  for (const [y, h, a, b] of bands) { x.fillStyle = INK; x.fillRect(a - 0.6, y - 0.6, b - a + 1.2, h + 1.2); x.fillStyle = PUFF; x.fillRect(a, y, b - a, h); x.fillStyle = '#a8dcff'; x.fillRect(a + 0.6, y + 0.5, b - a - 1.2, 0.9); x.fillStyle = PUFF_D; x.fillRect(a, y + h - 0.8, b - a, 0.8) }
  x.fillStyle = INK; x.fillRect(17.6, 21.5, 0.8, 12)
}
function backpack(x, cx, cy, s) { box(x, cx - s * 0.32, cy - s * 0.42, s * 0.64, s * 0.84, '#c46a2c', { b: 5, hi: '#e08a48' }); R(x, '#8a4a1c', cx - s * 0.22, cy - s * 0.05, s * 0.44, s * 0.24); R(x, INK, cx - s * 0.22, cy - s * 0.05, s * 0.44, 4) }
function mapSheet(x, cx, cy, w, h, rot, t, flap = 0) {
  x.save(); x.translate(cx, cy); x.rotate(rot)
  const n = 4, sw = w / n
  for (let i = 0; i < n; i++) {
    const sk = flap * Math.sin(t * 14 + i * 1.3) * 0.15
    x.save(); x.translate(-w / 2 + i * sw, 0); x.transform(1, sk, 0, 1, 0, 0)
    R(x, INK, -4, -h / 2 - 4, sw + 8, h + 8); R(x, i % 2 ? '#f1deb0' : '#f7e9c4', 0, -h / 2, sw, h)
    x.restore()
  }
  x.restore()
}

function scene(x, t, S) {
  const { k, out } = S
  snowBank(x, 1215, { a: k <= 2 ? 1 : out })
  if (k <= 1) {
    const HX = 540 + (k === 0 ? Math.sin(t * 2.2) * 40 : 0)
    const o = { x: HX, y: 990, s: 300, mood: k === 0 ? 'happy' : 'sparkle', look: [1, -0.3], hops: k === 0 ? [-0.18, 0.5, 1.15, 1.8, 2.45] : S.hops(0) }
    backpack(x, HX - 150, 990, 170)
    shadow(x, HX, 1180, 260)
    S.hero(x, t, o)
    const F = starFrame(o.x, o.y, o.s, t, o)
    inSprite(x, F, () => { pufferCells(x); hatCells(x, '#e8414f', BONE); if (k === 1) scarfCells(x, GOLD, '#e8414f', Math.min(3, (t - S.b[1]) * 6)) })
    if (k === 0) mapSheet(x, HX + 210, F.cy - 40, 200, 140, -0.25, t, 1)
    if (k === 1) {
      // the scarf whip: a spinning gold streak around the star
      const p = prog(t, S.b[1] + 0.1, S.b[1] + 0.6)
      if (p > 0 && p < 1) { x.save(); x.strokeStyle = GOLD; x.lineWidth = 16; x.globalAlpha = 1 - p; x.beginPath(); x.ellipse(HX, F.cy + 40, 200, 60, 0, p * 9, p * 9 + 2.4); x.stroke(); x.restore() }
      sparkles(x, t, HX, F.cy, S.b[1] + 0.55, 10, 220, 1)
      bubble(x, t, HX, 690, S.b[1] + 0.8, S.b[2], 'COZY: ON', { size: 42, col: '#fff1c8' })
    }
    return
  }
  if (k === 2) {
    // string lights swing in across the top, a market stall glow, two cocoas
    const lk = pop01(t, S.b[2] + 0.1, 0.5, 1.6)
    x.save(); x.translate(0, (1 - lk) * -200)
    x.strokeStyle = INK; x.lineWidth = 5; x.beginPath(); x.moveTo(-20, 600); x.quadraticCurveTo(540, 760, 1100, 600); x.stroke()
    const cols = [GOLD, RED, '#7fd0ff', '#9fe6b0', PINK]
    for (let i = 0; i < 12; i++) {
      const u = (i + 0.5) / 12, bx = lerp(-20, 1100, u), by = lerp(600, 600, u) + 2 * u * (1 - u) * 160 + 14
      const on = 0.6 + 0.4 * Math.sin(t * 5 + i * 1.7)
      x.globalAlpha = on; R(x, INK, bx - 12, by - 4, 24, 30); R(x, cols[i % 5], bx - 8, by, 16, 22); x.globalAlpha = 1
    }
    x.restore()
    shadow(x, 540, 1180, 260)
    const o = { x: 540, y: 1000, s: 290, mood: 'happy', look: [0, -0.4], hops: S.hops(1) }
    S.hero(x, t, o)
    const F = starFrame(o.x, o.y, o.s, t, o)
    inSprite(x, F, () => { pufferCells(x); hatCells(x, '#e8414f', BONE); scarfCells(x, GOLD, '#e8414f', 3) })
    const m1 = pop01(t, S.b[2] + 1.1, 0.3, 2.4), m2 = pop01(t, S.b[2] + 1.35, 0.3, 2.4)
    if (m1 > 0.01) mug(x, t, 270, 1080, 9 * m1)
    if (m2 > 0.01) mug(x, t, 810, 1080, 9 * m2, { body: '#ffd6dc' })
    // a tiny rising sun peeking at the horizon (sunrise walk)
    const sk = prog(t, S.b[2] + 1.6, S.b[2] + 2.6)
    if (sk > 0) { x.save(); x.globalAlpha = 0.85 * sk; x.fillStyle = '#ffb35c'; x.beginPath(); x.arc(860, 1215, 70 * sk, Math.PI, 0); x.fill(); x.restore() }
    return
  }
  // beat 3: the trip map, with dotted heart routes
  const mk = pop01(t, S.b[3] - 0.05, 0.45, 1.8) * out
  if (mk > 0.01) {
    x.save(); x.translate(540, 760); x.scale(mk, mk); x.translate(-540, -760)
    mapSheet(x, 540, 760, 760, 400, -0.03, t, 0)
    // coastline squiggles
    x.strokeStyle = '#9fb8c8'; x.lineWidth = 8
    x.beginPath(); x.moveTo(200, 640); x.bezierCurveTo(300, 600, 340, 720, 430, 690); x.bezierCurveTo(520, 660, 560, 760, 680, 720); x.bezierCurveTo(780, 690, 820, 820, 880, 800); x.stroke()
    const pins = [[260, 820], [470, 640], [690, 860], [840, 680]]
    const dp = prog(t, S.b[3] + 0.5, S.b[3] + 2.3)
    x.fillStyle = RED
    for (let i = 0; i < 3; i++) {
      const [ax, ay] = pins[i], [bx, by] = pins[i + 1]
      for (let d = 0; d < 8; d++) { const u = d / 8; if (u > dp * 3 - i) break; x.fillRect(Math.round(lerp(ax, bx, u) - 5), Math.round(lerp(ay, by, u) - 40 * Math.sin(Math.PI * u) - 5), 10, 10) }
    }
    pins.forEach(([px, py], i) => { if (dp * 3 >= i - 0.02) drawBits(x, ['.HH.HH.', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: '#ff5c8a' }, px, py - 20, 6) })
    x.restore()
  }
  const sk = pop01(t, S.b[3] + 0.3, 0.4, 2) * out
  shadow(x, 330, 1185, 200 * sk); shadow(x, 760, 1185, 200 * sk)
  S.hero(x, t, { x: 330, y: 1060, s: 230, pop: sk, mood: 'sparkle', look: [0.6, -1], hops: S.hops(2) })
  S.partner(x, t, { x: 760, y: 1060, s: 230, pop: sk, mood: 'happy', look: [-0.6, -1], hops: [S.b[3] + 0.9, S.b[3] + 2.4] })
}

const EP = makeAsk({
  sign: 'sagittarius', name: 'SAGITTARIUS', partner: 'gemini',
  question: "It's too *cold* | to go on dates.",
  lines: ['cold is just a plan with a scarf on.', 'a winter market. a sunrise walk with cocoa.', 'or a night in, mapping trips you want.'],
  chip: '♐ MUTABLE FIRE · RULED BY JUPITER',
  last: 'Bundle up. | Say *yes.*',
  scene,
  cues: [
    ['tick', 0.5, 0.03], ['tick', 1.15, 0.03], ['tick', 1.8, 0.03], ['tick', 2.45, 0.03],
    ['whoosh', 3.1, 0.4, 0.04], ['glitter', 3.55, 3.9], ['pop', 3.8, 1318.51, 0.04, 0],
    ['whoosh', 6.0, 0.4, 0.03], ['glitter', 6.4, 6.9], ['pop', 7.0, 880, 0.035, -0.4], ['pop', 7.25, 1046.5, 0.035, 0.4],
    ['pop', 9.4, 659.25, 0.025, -0.3], ['pop', 9.9, 739.99, 0.025, 0], ['pop', 10.4, 880, 0.025, 0.3],
  ],
})
export const DURATION = EP.DURATION, SCENES = EP.SCENES, CUES = EP.CUES
