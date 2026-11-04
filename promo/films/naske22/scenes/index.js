// naske22 · Ask the Stars, Volume 2, ep 22 · "When do we talk about the future?" (20 s, cinematic · Dm)
// The format lives in ../../naske19/scenes/askkit2.js. Story 0–15.6, then the shared end card.
//   0.0   DM: "When do we talk about *the future?*"  ♑ Capricorn mid-flip through a towering FIVE-YEAR PLAN, pages flying.
//   3.0   "not on date one. not never, either."  The plan slams shut; one sticky note is left: "date 1: have fun".
//   5.9   "after a few months, ask what they want."  A wall calendar flips its months; a heart lands on the page.
//   8.75  card cut → 8.8 "a calm night. not the holiday dinner table."  A long, full dinner table swaps for a sofa,
//         two mugs and the two of them.
//   12.1  "Big questions, | *calm* nights."
import { makeAsk, R, box, drawBits, mug, bubble, sparkles, hearts, shadow, label, pop01, outK, prog, lerp, clamp, ease, INK, BONE, GOLD, RED, INTER, MONO, HEART } from '../../naske19/scenes/askkit2.js'

const CAP_C = '#9a8cff'
function planner(x, t, cx, by, h, shut) {
  // a towering stack of pages with a cover
  const w = 250
  box(x, cx - w / 2, by - h, w, h, '#f5eedf', { b: 6 })
  for (let y = by - h + 14; y < by - 4; y += 12) R(x, '#d9cdb6', cx - w / 2, y, w, 3)
  box(x, cx - w / 2 - 6, by - h - 30, w + 12, 30, '#4a3f8c', { b: 6, hi: '#6b5fc0' })
  x.save(); x.translate(cx, by - h / 2); x.rotate(-Math.PI / 2)
  x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = '#4a3f8c'; x.fillText('FIVE-YEAR PLAN', 0, 0)
  x.restore()
  void shut
}

function scene(x, t, S) {
  const { k, out } = S
  if (k <= 1) {
    const slam = k === 1 ? ease.inCubic(prog(t, S.b[1] + 0.15, S.b[1] + 0.45)) : 0
    const h = lerp(560, 300, slam)
    const bounce = k === 1 && t > S.b[1] + 0.45 ? 0.08 * Math.exp(-(t - S.b[1] - 0.45) * 8) * Math.sin((t - S.b[1]) * 40) : 0
    x.save(); x.translate(790, 1180); x.scale(1 + bounce, 1 - bounce); x.translate(-790, -1180)
    planner(x, t, 790, 1180, h)
    x.restore()
    // flying pages (hook only)
    if (k === 0 || t < S.b[1] + 0.2) for (let i = 0; i < 6; i++) {
      const p = ((t + 0.25) * 1.3 + i / 6) % 1
      x.save(); x.globalAlpha = 1 - p; x.translate(790 - 40 + p * (i % 2 ? 260 : -380), 640 - 300 * p + 420 * p * p); x.rotate(p * (i % 2 ? 4 : -4))
      R(x, INK, -44, -30, 88, 60); R(x, '#f5eedf', -40, -26, 80, 52); R(x, '#c9bda6', -30, -14, 60, 4); R(x, '#c9bda6', -30, 0, 44, 4)
      x.restore()
    }
    if (k === 1) {
      const nk = pop01(t, S.b[1] + 0.7, 0.35, 2.6)
      x.save(); x.translate(790, 900 - 0); x.rotate(-0.08); x.scale(nk, nk)
      box(x, -120, -70, 240, 140, '#ffe36a', { b: 5 }); R(x, '#f2c94a', -120, -70, 240, 18)
      x.font = `italic 500 46px 'EB Garamond', serif`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = INK
      x.fillText('date 1:', 0, -10); x.fillText('have fun', 0, 34)
      x.restore()
    }
    shadow(x, 380, 1180, 240)
    S.hero(x, t, { x: 380, y: 1010, s: 290, mood: k === 0 ? 'squint' : t < S.b[1] + 0.6 ? 'wide' : 'happy', look: [1, k === 0 ? 0 : -0.5], hops: k === 0 ? [0.3, 0.9, 1.5, 2.1] : S.hops(0) })
    return
  }
  if (k === 2) {
    // the wall calendar flipping its months
    const u = t - S.b[2]
    const months = ['MONTH 1', 'MONTH 2', 'MONTH 3']
    const idx = Math.min(2, Math.floor(clamp((u - 0.3) / 0.55, 0, 2.99)))
    const fl = (u - 0.3) % 0.55
    box(x, 330, 560, 420, 420, BONE, { b: 7 })
    R(x, RED, 330, 560, 420, 90)
    x.font = `800 50px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = BONE; x.fillText(months[idx], 540, 606)
    for (let j = 0; j < 4; j++) for (let i = 0; i < 5; i++) R(x, '#d9cdb6', 360 + i * 76, 680 + j * 70, 56, 48)
    if (u > 0.3 && u < 0.3 + 0.55 * 2 && fl < 0.18) { const p = fl / 0.18; x.save(); x.globalAlpha = 1 - p; R(x, BONE, 330, 560 - p * 200, 420, 420 * (1 - p)); x.restore() }
    if (idx === 2) {
      const hk = pop01(t, S.b[2] + 1.5, 0.3, 2.6)
      drawBits(x, HEART, { H: '#ff5c8a' }, 540, 790, 18 * hk)
      bubble(x, t, 540, 1040, S.b[2] + 1.8, S.b[3], "what do you want?", { size: 40 })
    }
    shadow(x, 200, 1180, 160)
    S.hero(x, t, { x: 200, y: 1080, s: 200, mood: 'happy', look: [1, -1], hops: S.hops(1) })
    return
  }
  // beat 3: the holiday table (no) → the sofa (yes)
  const u = t - S.b[3]
  if (u < 1.2) {
    const a = outK(u, [1.0, 1.2])
    x.save(); x.globalAlpha = a
    box(x, 120, 900, 840, 60, '#8a5a32', { b: 6, hi: '#a8743f' })
    R(x, INK, 150, 960, 20, 160); R(x, INK, 910, 960, 20, 160)
    for (let i = 0; i < 6; i++) { R(x, INK, 170 + i * 130, 870, 80, 30); R(x, '#efe6d6', 174 + i * 130, 874, 72, 22) }
    const cols = ['#ff8a6e', '#7fd0ff', '#9fe6b0', '#ffd34d', '#c9b8f0', '#ff8fb1']
    for (let i = 0; i < 6; i++) { const yy = 800 + Math.sin(t * 6 + i) * 6; R(x, INK, 180 + i * 130, yy - 40, 60, 60); R(x, cols[i], 184 + i * 130, yy - 36, 52, 52); R(x, INK, 196 + i * 130, yy - 20, 8, 8); R(x, INK, 216 + i * 130, yy - 20, 8, 8) }
    label(x, '"SO WHEN ARE YOU TWO…"', 540, 700, { size: 34, col: '#ffd6dc' })
    if (u > 0.4) { x.strokeStyle = RED; x.lineWidth = 18; x.beginPath(); x.moveTo(200, 640); x.lineTo(880, 1100); x.moveTo(880, 640); x.lineTo(200, 1100); x.stroke() }
    x.restore()
    return
  }
  const sk = pop01(t, S.b[3] + 1.2, 0.4, 2) * out
  sparkles(x, t, 540, 900, S.b[3] + 1.2, 12, 300, 1)
  x.save(); x.translate(540, 1100); x.scale(sk, sk); x.translate(-540, -1100)
  box(x, 180, 980, 720, 170, '#c0587a', { b: 7, hi: '#d97a98' })
  box(x, 150, 900, 70, 250, '#a8486a', { b: 7 }); box(x, 860, 900, 70, 250, '#a8486a', { b: 7 })
  R(x, INK, 200, 1150, 18, 40); R(x, INK, 862, 1150, 18, 40)
  x.restore()
  S.hero(x, t, { x: 390, y: 940, s: 240, pop: sk, mood: 'happy', look: [1, 0], hops: S.hops(2) })
  S.partner(x, t, { x: 690, y: 940, s: 240, pop: sk, mood: 'happy', look: [-1, 0], hops: [S.b[3] + 2.0] })
  if (sk > 0.5) { mug(x, t, 470, 1060, 7); mug(x, t, 610, 1060, 7, { body: '#ffd6dc' }) }
  hearts(x, t, S.b[3] + 1.9, 540, 780, { n: 4, cell: 6, spread: 120 })
}

const EP = makeAsk({
  sign: 'capricorn', name: 'CAPRICORN', partner: 'cancer',
  question: 'When do we talk | about *the future?*',
  lines: ['not on date one. not never, either.', 'after a few months, ask what they want.', 'a calm night. not the holiday dinner table.'],
  chip: '♑ CARDINAL EARTH · RULED BY SATURN',
  last: 'Big questions, | *calm* nights.', lastLate: 2,
  scene,
  cues: [
    ['whoosh', 0.2, 0.2, 0.025], ['whoosh', 0.95, 0.2, 0.025], ['whoosh', 1.7, 0.2, 0.025], ['whoosh', 2.4, 0.2, 0.025],
    ['boom', 3.45, 0.2], ['tick', 3.45, 0.07], ['pop', 3.75, 1318.51, 0.04, 0.3],
    ['whoosh', 6.2, 0.15, 0.03], ['whoosh', 6.75, 0.15, 0.03], ['pop', 7.4, 1174.66, 0.045, 0], ['glitter', 7.4, 7.7],
    ['tick', 9.2, 0.06], ['whoosh', 9.9, 0.3, 0.03], ['glitter', 10.0, 10.5], ['pop', 10.05, 987.77, 0.04, 0],
  ],
})
export const DURATION = EP.DURATION, SCENES = EP.SCENES, CUES = EP.CUES
