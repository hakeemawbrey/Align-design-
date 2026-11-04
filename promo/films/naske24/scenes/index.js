// naske24 · Ask the Stars, Volume 2, ep 24 · "I cry at everything. Is that a lot?" (20 s, dreamy · Ab)
// The format lives in ../../naske19/scenes/askkit2.js. Story 0–15.6, then the shared end card.
//   0.0   DM: "I cry at *everything.* Is that a lot?"  ♓ Pisces mid-sob at one snowflake landing on its point,
//         a tissue raised.
//   3.0   "feeling deeply isn't too much. it's you."  More tiny triggers drift by (a holiday card, a lost mitten):
//         the sniffles become streams.
//   5.9   "the right person brings tissues, not jokes."  A partner star walks in carrying a tissue box.
//   8.75  card cut → 8.8 "and tells you when they cry too."  The partner sniffles too; both happy-cry together.
//   12.1  "Big feelings. | *Right* person."  (finale: Pisces and the partner, both crying happy tears)
import { makeAsk, R, box, drawBits, bubble, sparkles, hearts, shadow, inSprite, starFrame, tearsCells, tissues, label, drawStarChar, signStar, pop01, popOut, outK, prog, lerp, clamp, ease, INK, BONE, GOLD, RED, SNOW, T } from '../../naske19/scenes/askkit2.js'

const FLAKE = ['..W.W..', 'W..W..W', '.W.W.W.', 'WWWWWWW', '.W.W.W.', 'W..W..W', '..W.W..']
const CARD = ['RRRRRRRR', 'RBBBBBBR', 'RBBHHBBR', 'RBHHHHBR', 'RBBHHBBR', 'RBBBBBBR', 'RRRRRRRR']
const MITT = ['.MMM..', 'MMMM.M', 'MMMMMM', 'MMMMMM', 'WWWWW.', 'WWWWW.']
const PART = signStar('virgo')

function tissue(x, cx, cy, s, t) { x.save(); x.translate(cx, cy); x.rotate(0.25 + Math.sin(t * 7) * 0.12); R(x, INK, -s / 2 - 4, -s / 2 - 4, s + 8, s * 1.2 + 8); R(x, '#ffffff', -s / 2, -s / 2, s, s * 1.2); R(x, '#dfe9f7', -s / 2, s * 0.5, s, s * 0.2); x.restore() }

function scene(x, t, S) {
  const { k, out } = S
  const HX = k >= 2 ? 400 : 540
  if (k <= 1) {
    const o = { x: HX, y: 1000, s: 310, mood: 'squint', look: [0, -1], hops: [0.6, 1.6, ...S.hops(0)], squash: 0.04 * Math.sin(t * 16) }
    shadow(x, HX, 1180, 260)
    const F = S.pisces(x, t, o, k === 0 ? 2 : 3, 'squint', [0, -1])
    tissue(x, HX + 170, F.cy + 10, 56, t)
    // the snowflake on its top point
    const fy = F.cy - F.S * 0.48 - 26
    drawBits(x, FLAKE, { W: SNOW }, HX, fy + (k === 0 ? Math.max(0, 1 - t * 2) * -120 : 0), 8)
    if (k === 1) {
      // triggers drifting across
      const items = [[CARD, { R: '#e8414f', B: BONE, H: '#ff5c8a' }, 0.0, 760], [MITT, { M: '#4fb3ff', W: BONE }, 0.7, 640]]
      items.forEach(([bm, cols, d, yy], i) => {
        const p = prog(t, S.b[1] + 0.2 + d, S.b[1] + 2.6 + d)
        if (p <= 0 || p >= 1) return
        drawBits(x, bm, cols, lerp(i ? -100 : 1180, i ? 1180 : -100, p), yy + Math.sin(p * 9) * 20, 11, { rot: Math.sin(t * 2 + i) * 0.2 })
      })
      label(x, 'a card!', 900, 680, { size: 30, alpha: clamp((t - S.b[1] - 0.3) * 3) * outK(t, [S.b[1] + 1.4, S.b[1] + 1.6]) })
      label(x, 'one mitten. alone.', 260, 560, { size: 30, alpha: clamp((t - S.b[1] - 1.2) * 3) * outK(t, [S.b[1] + 2.6, S.b[2]]) })
    }
    return
  }
  if (k === 2) {
    const o = { x: HX, y: 1000, s: 290, mood: t > S.b[2] + 1.4 ? 'sparkle' : 'squint', look: [1, -0.3], hops: S.hops(1) }
    shadow(x, HX, 1180, 240)
    S.pisces(x, t, o, 2, o.mood, o.look)
    const wx = lerp(1250, 760, ease.outCubic(prog(t, S.b[2] + 0.2, S.b[2] + 1.2)))
    const walk = t < S.b[2] + 1.2 ? Math.abs(Math.sin(t * 12)) * 0.08 : 0
    shadow(x, wx, 1180, 220)
    drawStarChar(x, wx, 1010, 260, t, { color: PART.color, glyph: PART.glyph, mood: 'happy', look: [-1, 0], seed: 9, glow: 1, squash: walk })
    tissues(x, wx - 140, 1040, 120)
    hearts(x, t, S.b[2] + 1.4, 580, 860, { n: 4, cell: 6, spread: 160 })
    return
  }
  // beat 3: both crying, happily
  const kk = pop01(t, S.b[3] - 0.05, 0.4, 2) * out
  shadow(x, 380, 1180, 230 * kk); shadow(x, 720, 1180, 230 * kk)
  S.pisces(x, t, { x: 380, y: 1010, s: 270, pop: kk, hops: S.hops(2) }, 3, 'sparkle', [1, -0.3])
  const po = { x: 720, y: 1010, s: 270, pop: kk, hops: [S.b[3] + 0.8, S.b[3] + 2.0] }
  drawStarChar(x, po.x, po.y, po.s, t, { color: PART.color, glyph: PART.glyph, mood: 'sparkle', look: [-1, -0.3], seed: 9, glow: 1, pop: kk, hops: po.hops })
  const F = starFrame(po.x, po.y, po.s, t, { pop: kk, hops: po.hops, seed: 9 })
  if (t > S.b[3] + 0.6) inSprite(x, F, () => tearsCells(x, t, t > S.b[3] + 1.6 ? 2 : 1))
  tissues(x, 550, 1150, 100 * kk)
  bubble(x, t, 720, 760, S.b[3] + 0.7, 12.2, "ok i'm crying too", { size: 38, col: '#d9f4e2' })
  hearts(x, t, S.b[3] + 1.5, 550, 860, { n: 6, cell: 7, spread: 220 })
}

function finale(x, t, S) {
  const hk = pop01(t, T.finIn, 0.4, 2.2) * S.ok, pk = pop01(t, T.pisIn, 0.38, 2.2) * S.ok
  if (hk > 0.01) { shadow(x, 330, 1420, 260 * hk); S.pisces(x, t, { x: 330, y: 1220, s: 330, pop: hk, hops: S.FIN_HOPS, tips: true }, t > T.lastLand ? 3 : 2, 'sparkle', [0.6, -0.3]) }
  if (pk > 0.01) {
    shadow(x, 770, 1420, 240 * pk)
    const o = { x: 770, y: 1240, s: 280, pop: pk, hops: [T.pisIn + 0.3, T.lastLand + 0.1] }
    drawStarChar(x, o.x, o.y, o.s, t, { color: PART.color, glyph: PART.glyph, mood: 'sparkle', look: [-0.6, -0.3], seed: 9, glow: 1, pop: pk, hops: o.hops })
    inSprite(x, starFrame(o.x, o.y, o.s, t, { pop: pk, hops: o.hops, seed: 9 }), () => tearsCells(x, t, 2))
    tissues(x, 550, 1400, 100 * pk)
  }
  hearts(x, t, T.lastLand + 0.1, 550, 1080, { n: 6, cell: 7, spread: 260 })
}

const EP = makeAsk({
  sign: 'pisces', name: 'PISCES', partner: 'virgo', pis: false,
  question: 'I cry at *everything.* | Is that a lot?',
  lines: ["feeling deeply isn't too much. it's you.", 'the right person brings tissues, not jokes.', 'and tells you when they cry too.'],
  chip: '♓ MUTABLE WATER · JUPITER (TRAD.) · NEPTUNE (MODERN)',
  last: 'Big feelings. | *Right* person.', lastLate: 2,
  scene, finale,
  cues: [
    ['pop', 0.25, 1567.98, 0.02, 0], ['pluck', 0.6, 523.25, 0.02, 0.3, 0], ['pluck', 1.6, 493.88, 0.02, 0.3, 0],
    ['whoosh', 3.3, 0.4, 0.02], ['pop', 3.5, 1046.5, 0.03, 0.5], ['pop', 4.3, 880, 0.03, -0.5],
    ['tick', 6.3, 0.03], ['tick', 6.55, 0.03], ['tick', 6.8, 0.03], ['tick', 7.05, 0.03], ['pop', 7.3, 1174.66, 0.04, 0.3],
    ['pluck', 9.5, 1318.51, 0.03, 0.5, 0.3], ['glitter', 10.3, 10.8],
  ],
})
export const DURATION = EP.DURATION, SCENES = EP.SCENES, CUES = EP.CUES
