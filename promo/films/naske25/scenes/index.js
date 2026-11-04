// naske25 · Ask the Stars, Volume 2, ep 25 · "They said 'I love you' and I froze." (20 s, funk · E)
// The format lives in ../../naske19/scenes/askkit2.js. Story 0–15.6, then the shared end card.
//   0.0   DM: "They said 'I love you' and I *froze.*"  ♈ Aries frozen solid in a pixel ice block, eyes wide; an
//         "i love you" heart bubble hangs in the air beside the partner.
//   3.0   "freezing is allowed. it's december."  The ice cracks, shatters; Aries pops out, shivering.
//   5.9   "say it true: 'i really like you. i need time.'"  The heart bubble stays, unbroken; the partner nods.
//   8.75  card cut → 8.8 "they asked for the truth, not a reflex."  Two stars, matching mittens.
//   12.1  "Honest beats *rushed.*"
import { makeAsk, R, box, drawBits, bubble, sparkles, hearts, shadow, inSprite, starFrame, label, pop01, outK, prog, lerp, clamp, ease, INK, BONE, GOLD, RED, ICE, HEART } from '../../naske19/scenes/askkit2.js'

const MITT = ['.MMM..', 'MMMM.M', 'MMMMMM', 'MMMMMM', 'WWWWW.', 'WWWWW.']

function iceBlock(x, cx, cy, w, h, t, crack) {
  x.save()
  x.strokeStyle = INK; x.lineWidth = 10; x.strokeRect(cx - w / 2 - 4, cy - h / 2 - 4, w + 8, h + 8)
  x.globalAlpha = 0.38; R(x, ICE, cx - w / 2, cy - h / 2, w, h); x.globalAlpha = 1
  x.strokeStyle = ICE; x.lineWidth = 6; x.strokeRect(cx - w / 2 + 3, cy - h / 2 + 3, w - 6, h - 6)
  R(x, 'rgba(255,255,255,0.75)', cx - w / 2 + 18, cy - h / 2 + 18, 18, h * 0.5); R(x, 'rgba(255,255,255,0.75)', cx - w / 2 + 18, cy - h / 2 + 18, w * 0.35, 14)
  R(x, 'rgba(255,255,255,0.5)', cx + w / 2 - 50, cy + h / 2 - 90, 14, 60)
  if (crack > 0) {
    x.strokeStyle = '#ffffff'; x.lineWidth = 7
    const pts = [[0, -1], [0.1, -0.6], [-0.15, -0.25], [0.12, 0.1], [-0.08, 0.5], [0.05, 1]]
    x.beginPath(); pts.forEach(([u, v], i) => { const p = Math.min(1, crack * 1.4 - i * 0.12); if (p <= 0) return; const X = cx + u * w, Y = cy + v * h / 2; i === 0 ? x.moveTo(X, Y) : x.lineTo(X, Y) }); x.stroke()
  }
  x.restore()
}

function scene(x, t, S) {
  const { k, out } = S
  const HX = 400
  // the partner, and the heart bubble that never breaks
  if (k <= 2) {
    shadow(x, 820, 1180, 200)
    S.partner(x, t, { x: 820, y: 1030, s: 230, mood: k === 2 && t > S.b[2] + 1.6 ? 'happy' : 'heart', look: [-1, 0], hops: k === 2 ? [S.b[2] + 1.5, S.b[2] + 1.9] : [0.2] })
    const hb = 1 + 0.05 * Math.sin(t * 5)
    x.save(); x.translate(800, 760); x.scale(hb, hb)
    drawBits(x, HEART, { H: '#ff5c8a' }, 0, 0, 26)
    x.font = `italic 500 40px 'EB Garamond', serif`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = BONE; x.fillText('i love you', 0, -6)
    x.restore()
    if (k === 2) { sparkles(x, t, 800, 760, S.b[2] + 1.6, 10, 140, 1); label(x, 'still here ♥', 800, 600, { size: 32, col: '#ffd6dc', alpha: clamp((t - S.b[2] - 1.6) * 3) }) }
  }
  if (k === 0) {
    shadow(x, HX, 1185, 280)
    S.hero(x, t, { x: HX, y: 1010, s: 270, mood: 'wide', look: [1, 0], blink: false, bob: 0 })
    iceBlock(x, HX, 1000, 330, 360, t, 0)
    for (let i = 0; i < 3; i++) { const ph = (t * 0.6 + i / 3) % 1; x.save(); x.globalAlpha = Math.sin(Math.PI * ph) * 0.7; x.fillStyle = BONE; x.fillRect(HX - 120 + i * 110, 790 - ph * 80, 10, 10); x.restore() }
    return
  }
  if (k === 1) {
    const u = t - S.b[1], crack = prog(u, 0.15, 0.6), shatter = prog(u, 0.65, 1.3)
    const shiver = u > 0.65 && u < 2.4 ? Math.sin(t * 60) * 6 : 0
    shadow(x, HX, 1185, 260)
    S.hero(x, t, { x: HX + shiver, y: 1010, s: 270, mood: u < 0.65 ? 'wide' : u < 2.2 ? 'squint' : 'happy', look: [1, 0], hops: u > 0.65 ? [S.b[1] + 0.68, ...S.hops(0)] : [] })
    if (shatter < 0.02) iceBlock(x, HX, 1000, 330, 360, t, crack)
    else for (let i = 0; i < 10; i++) {
      const a = (i / 10) * Math.PI * 2 + 0.3, v = 380 + (i % 3) * 120
      x.save(); x.globalAlpha = 1 - shatter; x.translate(HX + Math.cos(a) * v * shatter, 1000 + Math.sin(a) * v * shatter + 500 * shatter * shatter); x.rotate(shatter * 6 + i)
      R(x, INK, -28, -20, 56, 40); x.globalAlpha *= 0.8; R(x, ICE, -24, -16, 48, 32); x.restore()
    }
    if (u > 0.7) label(x, 'BRRR', HX + 160, 800, { size: 44, col: ICE, alpha: outK(u, [2.0, 2.3]), rot: -0.15 })
    return
  }
  if (k === 2) {
    shadow(x, HX, 1185, 260)
    S.hero(x, t, { x: HX, y: 1010, s: 270, mood: 'happy', look: [1, -0.2], hops: S.hops(1) })
    return
  }
  // beat 3: matching mittens
  const kk = pop01(t, S.b[3] - 0.05, 0.4, 2) * out
  const P = [[380, 1], [700, -1]]
  P.forEach(([px, d], i) => {
    shadow(x, px, 1180, 220 * kk)
    const o = { x: px, y: 1010, s: 260, pop: kk, mood: 'happy', look: [d, 0], hops: i === 0 ? S.hops(2) : [S.b[3] + 1.0, S.b[3] + 2.2] }
    i === 0 ? S.hero(x, t, o) : S.partner(x, t, o)
    const mk = pop01(t, S.b[3] + 0.5 + i * 0.25, 0.3, 2.6) * kk
    if (mk > 0.01) { drawBits(x, MITT, { M: '#e8414f', W: BONE }, px + d * 120, 1060, 10 * mk, { rot: d * 0.3 }); drawBits(x, MITT, { M: '#e8414f', W: BONE }, px - d * 120, 1060, 10 * mk, { rot: -d * 0.3, sx: -1 }) }
  })
  hearts(x, t, S.b[3] + 1.2, 540, 860, { n: 5, cell: 7, spread: 160 })
  bubble(x, t, 540, 700, S.b[3] + 0.9, 12.2, 'MATCHING. OBVIOUSLY.', { size: 40, col: '#ffd6dc' })
}

const EP = makeAsk({
  sign: 'aries', name: 'ARIES', partner: 'cancer',
  question: "They said 'I love you' | and I *froze.*", qSize: 76,
  lines: ["freezing is allowed. it's december.", "say it true: 'i really like you. i need time.'", 'they asked for the truth, not a reflex.'],
  chip: '♈ NATURAL RULER OF THE 1ST HOUSE: THE SELF',
  last: 'Honest beats | *rushed.*',
  scene,
  cues: [
    ['pluck', 0.4, 1567.98, 0.02, 0.6, 0.2], ['pluck', 1.4, 1760, 0.02, 0.6, -0.2],
    ['tick', 3.2, 0.06], ['tick', 3.4, 0.07], ['boom', 3.65, 0.22], ['glitter', 3.65, 4.1], ['whoosh', 3.7, 0.3, 0.04],
    ['pop', 7.5, 1318.51, 0.04, 0.4], ['glitter', 7.5, 7.9],
    ['pop', 9.3, 987.77, 0.035, -0.3], ['pop', 9.55, 1174.66, 0.035, 0.3], ['pop', 9.7, 1567.98, 0.03, 0],
  ],
})
export const DURATION = EP.DURATION, SCENES = EP.SCENES, CUES = EP.CUES
