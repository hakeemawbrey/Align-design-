// naske26 · Ask the Stars, Volume 2, ep 26 · "How do I make a night in feel special?" (18 s, lofi · F)
// The format lives in ../../naske19/scenes/askkit2.js. Story 0–15.6, then the short shared end card (2.4 s).
//   0.0   DM: "How do I make a night in feel *special?*"  ♉ Taurus in an apron mid-stir of a steaming pot of cocoa;
//         a candle flickers on beside it.
//   3.0   "light one candle. cook one thing together."  The partner pops in with a second spoon; they stir together.
//   5.9   "phones go in a basket by the door."  Two phones drop into a basket: CLUNK. CLUNK.
//   8.8   "deal a few talk cards from tonight's deck."  Three talk cards fan out on the table.
//   12.1  "Slow night. | *Full* heart."
import { makeAsk, R, box, drawBits, mug, bubble, sparkles, hearts, shadow, inSprite, starFrame, label, talkCard, pop01, outK, prog, lerp, clamp, ease, INK, BONE, GOLD, RED, MONO } from '../../naske19/scenes/askkit2.js'

const PHONE = ['KKKKK', 'KSSSK', 'KSSSK', 'KSSSK', 'KSSSK', 'KKHKK']
function apronCells(x) {
  x.fillStyle = INK; x.fillRect(11.4, 21.4, 13.2, 11.2); x.fillStyle = '#f5eedf'; x.fillRect(12, 22, 12, 10)
  x.fillStyle = '#e8a0b4'; x.fillRect(12, 22, 12, 1.2); x.fillStyle = '#d9cdb6'; x.fillRect(15, 27, 6, 3)
}
function candle(x, t, cx, by, s = 1) {
  box(x, cx - 14 * s, by - 70 * s, 28 * s, 70 * s, BONE, { b: 5 })
  const f = 1 + 0.15 * Math.sin(t * 17) + 0.1 * Math.sin(t * 29)
  x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(cx, by - 95 * s, 2, cx, by - 95 * s, 120 * s); g.addColorStop(0, 'rgba(255,200,120,0.4)'); g.addColorStop(1, 'rgba(255,200,120,0)'); x.fillStyle = g; x.fillRect(cx - 130 * s, by - 220 * s, 260 * s, 260 * s); x.restore()
  R(x, '#ffb03c', cx - 8 * s, by - (70 + 30 * f) * s, 16 * s, 30 * f * s); R(x, '#fff1a8', cx - 4 * s, by - (70 + 16 * f) * s, 8 * s, 16 * f * s)
}
function pot(x, t, cx, by) {
  box(x, cx - 120, by - 120, 240, 120, '#5a5f7a', { b: 7, hi: '#7a809e' })
  R(x, INK, cx - 150, by - 128, 30, 18); R(x, INK, cx + 120, by - 128, 30, 18)
  R(x, '#7a4a2a', cx - 112, by - 120, 224, 18)
  for (let i = 0; i < 4; i++) { const ph = (t * 0.7 + i / 4) % 1; x.save(); x.globalAlpha = Math.sin(Math.PI * ph) * 0.7; x.fillStyle = BONE; x.fillRect(Math.round(cx - 70 + i * 45 + Math.sin(ph * 6 + i) * 10), Math.round(by - 150 - ph * 140), 12, 12); x.restore() }
}
function spoon(x, cx, cy, ang, col = '#c9a46a') { x.save(); x.translate(cx, cy); x.rotate(ang); R(x, INK, -8, -170, 16, 180); R(x, col, -4, -166, 8, 172); x.restore() }

function scene(x, t, S) {
  const { k, out } = S
  if (k <= 1) {
    // counter
    box(x, 80, 1190, 920, 26, '#8a5a32', { b: 6, hi: '#a8743f' })
    pot(x, t, 690, 1190)
    const a1 = t * 4.2
    spoon(x, 690 + Math.cos(a1) * 50, 1075 + Math.sin(a1) * 12, 0.4 + Math.cos(a1) * 0.15)
    if (k === 1) { const a2 = t * 4.2 + Math.PI; const pk = pop01(t, S.b[1] + 0.5, 0.3, 2); if (pk > 0.5) spoon(x, 690 + Math.cos(a2) * 50, 1075 + Math.sin(a2) * 12, -0.4 + Math.cos(a2) * 0.15, '#e8a0b4') }
    const ck = k === 0 ? pop01(t, -0.1, 0.3, 2) : 1
    if (ck > 0.01) candle(x, t, 960, 1190, ck)
    const o = { x: 380, y: 1020, s: 290, mood: 'happy', look: [1, 0.3], hops: S.hops(0), squash: 0.04 * Math.sin(t * 8.4) }
    shadow(x, 380, 1190, 240)
    S.hero(x, t, o)
    inSprite(x, starFrame(o.x, o.y, o.s, t, o), () => apronCells(x))
    if (k === 1) { const pk = pop01(t, S.b[1] + 0.3, 0.4, 2.2); if (pk > 0.01) S.partner(x, t, { x: 880, y: 960, s: 200, pop: pk, mood: 'happy', look: [-1, 0.3], hops: [S.b[1] + 0.8] }); hearts(x, t, S.b[1] + 1.2, 690, 900, { n: 4, cell: 6, spread: 120 }) }
    return
  }
  if (k === 2) {
    // the door, the basket, two phones dropping in
    box(x, 90, 560, 260, 630, '#6b4a2f', { b: 7, hi: '#8a6440' }); R(x, GOLD, 300, 880, 22, 22)
    const bx = 560, by = 1150
    for (const [i, d] of [[0, 0.3], [1, 1.1]]) {
      const p = ease.inCubic(prog(t, S.b[2] + d, S.b[2] + d + 0.45))
      if (t < S.b[2] + d - 0.4) continue
      const yy = p >= 1 ? by - 40 - i * 10 : lerp(560, by - 40, p)
      drawBits(x, PHONE, { K: '#2b2140', S: i ? '#7fd0ff' : '#ffb3bd', H: '#5a5470' }, bx - 20 + i * 50, yy, 12, { rot: p >= 1 ? (i ? 0.4 : -0.3) : Math.sin(t * 9) * 0.3 })
      if (p >= 1) label(x, 'CLUNK', bx + (i ? 150 : -150), 960 - i * 40, { size: 40, col: GOLD, alpha: outK(t, [S.b[2] + d + 0.9, S.b[2] + d + 1.2]), rot: i ? 0.12 : -0.12 })
    }
    // the basket (drawn over the phones)
    box(x, bx - 140, by - 70, 280, 110, '#c99a5a', { b: 7 })
    for (let i = 0; i < 6; i++) R(x, '#a8743f', bx - 130 + i * 48, by - 70, 10, 110)
    R(x, '#a8743f', bx - 140, by - 30, 280, 10)
    shadow(x, 850, 1190, 200)
    S.hero(x, t, { x: 850, y: 1030, s: 240, mood: t > S.b[2] + 1.6 ? 'happy' : 'neutral', look: [-1, 0.4], hops: S.hops(1) })
    return
  }
  // beat 3: tonight's deck on the table
  const kk = pop01(t, S.b[3] - 0.05, 0.4, 2) * out
  box(x, 120, 1080, 840, 40, '#8a5a32', { b: 6, hi: '#a8743f' })
  candle(x, t, 540, 1080, 0.8 * kk)
  label(x, "TONIGHT'S DECK", 540, 560, { size: 34, col: GOLD, alpha: kk })
  const texts = ['best part of your week?', 'a smell that feels like home?', "what's a small thing you love?"]
  texts.forEach((tx, i) => {
    const pk = clamp(prog(t, S.b[3] + 0.3 + i * 0.25, S.b[3] + 0.75 + i * 0.25))
    if (pk <= 0) return
    const q = 1 - (1 - pk) ** 3
    talkCard(x, lerp(540, 300 + i * 240, q), lerp(1000, 780 + Math.abs(i - 1) * 30, q), 210, { rot: (i - 1) * 0.16 * q, text: tx, size: 30, color: ['#e8a0b4', GOLD, '#7fd0ff'][i], alpha: kk })
  })
  S.hero(x, t, { x: 230, y: 1190, s: 200, pop: kk, mood: 'happy', look: [1, -1], hops: S.hops(2) })
  S.partner(x, t, { x: 770, y: 1190, s: 200, pop: kk, mood: 'happy', look: [-1, -1], hops: [S.b[3] + 1.6] })
}

const EP = makeAsk({
  sign: 'taurus', name: 'TAURUS', partner: 'scorpio',
  question: 'How do I make a | night in feel *special?*',
  lines: ['light one candle. cook one thing together.', 'phones go in a basket by the door.', "deal a few talk cards from tonight's deck."],
  chip: '♉ NATURAL RULER OF THE 2ND HOUSE: WHAT YOU VALUE',
  last: 'Slow night. | *Full* heart.', lastLate: 2,
  scene,
  pis: { x: 965, y: 1270, s: 100 },
  cues: [
    ['pluck', 0.3, 659.25, 0.02, 0.4, 0], ['pluck', 1.8, 739.99, 0.02, 0.4, 0],
    ['pop', 3.35, 1046.5, 0.035, 0.4], ['tick', 3.8, 0.03],
    ['tick', 6.65, 0.08], ['tom', 6.65, 140, { gain: 0.2, decay: 0.2 }], ['tick', 7.45, 0.08], ['tom', 7.45, 120, { gain: 0.2, decay: 0.2 }],
    ['whoosh', 9.1, 0.25, 0.03], ['whoosh', 9.35, 0.25, 0.03], ['whoosh', 9.6, 0.25, 0.03], ['pop', 9.9, 1174.66, 0.035, 0],
  ],
})
export const DURATION = EP.DURATION, SCENES = EP.SCENES, CUES = EP.CUES
