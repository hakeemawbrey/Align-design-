// naske29 · Ask the Stars, Volume 2, ep 29 · "I forgot their birthday." (18 s, jazzy · Bb)
// The format lives in ../../naske19/scenes/askkit2.js. Story 0–15.6, then the short shared end card (2.4 s).
//   0.0   DM: "I forgot their *birthday.*"  ♌ Leo mid-gasp at a wall calendar with yesterday circled in red; a party
//         hat slides off its point.
//   3.0   "own it fast: 'i forgot. i'm really sorry.'"  One big honest bubble: I FORGOT. I'M SORRY.
//   5.9   "no big excuse. a real plan to make it up."  Leo bakes a lopsided cake; the candles light one by one.
//   8.8   "then put it in your calendar. today."  A calendar page with a gold star: REPEATS EVERY YEAR.
//   12.1  "Own it. | Then *make it up.*"
import { makeAsk, R, box, drawBits, bubble, sparkles, hearts, shadow, inSprite, starFrame, label, drawPixelStar, pop01, outK, prog, lerp, clamp, ease, INK, BONE, GOLD, RED, PINK, INTER, MONO } from '../../naske19/scenes/askkit2.js'

function calendar(x, t, cx, cy, s, circ, star) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  box(x, -200, -200, 400, 400, BONE, { b: 7 })
  R(x, RED, -200, -200, 400, 80)
  x.font = `800 44px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = BONE; x.fillText('DECEMBER', 0, -158)
  for (let j = 0; j < 4; j++) for (let i = 0; i < 5; i++) R(x, '#d9cdb6', -180 + i * 74, -100 + j * 72, 56, 52)
  if (circ > 0) { x.strokeStyle = RED; x.lineWidth = 9; x.beginPath(); x.arc(-180 + 2 * 74 + 28, -100 + 2 * 72 + 26, 46, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * circ); x.stroke() }
  if (star > 0) drawPixelStar(x, -180 + 2 * 74 + 28, -100 + 2 * 72 + 26, 70 * star, 2, GOLD)
  x.restore()
}
function partyHat(x, cx, cy, rot, s = 1) {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-46, 20); x.lineTo(0, -96); x.lineTo(46, 20); x.closePath(); x.fill()
  x.fillStyle = '#7fd0ff'; x.beginPath(); x.moveTo(-38, 14); x.lineTo(0, -84); x.lineTo(38, 14); x.closePath(); x.fill()
  x.fillStyle = PINK; x.fillRect(-26, -20, 52, 10); x.fillRect(-14, -50, 28, 8)
  R(x, INK, -12, -110, 24, 24); R(x, GOLD, -8, -106, 16, 16)
  x.restore()
}
function cake(x, t, cx, by, lit) {
  box(x, cx - 150, by - 90, 300, 90, '#f5c6d6', { b: 6, hi: '#ffe0ea' })
  x.save(); x.translate(cx + 22, by - 90); x.rotate(0.07)
  box(x, -100, -80, 200, 80, '#f5c6d6', { b: 6, hi: '#ffe0ea' })
  for (let i = 0; i < 4; i++) {
    const X = -66 + i * 44
    R(x, INK, X - 7, -130, 14, 54); R(x, ['#7fd0ff', GOLD, '#9fe6b0', PINK][i], X - 4, -126, 8, 48)
    if (lit > i) { const f = 1 + 0.2 * Math.sin(t * 19 + i); R(x, '#ffb03c', X - 6, -130 - 26 * f, 12, 24 * f); R(x, '#fff1a8', X - 3, -130 - 14 * f, 6, 12 * f) }
  }
  x.restore()
}

function scene(x, t, S) {
  const { k, out } = S
  if (k === 0) {
    calendar(x, t, 760, 800, 0.8, clamp(t / 0.9 + 0.3), 0)
    const o = { x: 330, y: 1010, s: 290, mood: 'wide', look: [1, -0.4], hops: [0.25], squash: -0.06 }
    shadow(x, 330, 1180, 240)
    S.hero(x, t, o)
    const F = starFrame(o.x, o.y, o.s, t, o)
    const sl = ease.inCubic(prog(t, -0.2, 1.4))
    partyHat(x, o.x + sl * 120, F.cy - F.S * 0.5 - 10 + sl * 140, sl * 1.1)
    label(x, 'YESTERDAY', 760, 1090, { size: 32, col: '#ffd6dc', alpha: clamp((t - 0.6) * 3) })
    return
  }
  if (k === 1) {
    shadow(x, 540, 1180, 250)
    S.hero(x, t, { x: 540, y: 1010, s: 290, mood: t < S.b[1] + 0.6 ? 'neutral' : 'happy', look: [0, 0.4], hops: S.hops(0) })
    bubble(x, t, 540, 690, S.b[1] + 0.5, S.b[2] + 0.1, "I FORGOT. I'M SORRY.", { size: 54, col: BONE })
    label(x, 'no excuse.', 540, 800, { size: 32, col: '#c9b8f0', alpha: clamp((t - S.b[1] - 1.4) * 3) })
    return
  }
  if (k === 2) {
    const u = t - S.b[2]
    const ck = pop01(t, S.b[2] + 0.2, 0.35, 2)
    if (ck > 0.01) { x.save(); x.translate(720, 1140); x.scale(ck, ck); x.translate(-720, -1140); cake(x, t, 720, 1140, clamp((u - 1.0) / 0.25, 0, 4)); x.restore() }
    if (u > 1.0) sparkles(x, t, 740, 900, S.b[2] + 1.9, 10, 160, 1)
    const o = { x: 300, y: 1010, s: 260, mood: u > 1.9 ? 'sparkle' : 'happy', look: [1, 0.3], hops: S.hops(1) }
    shadow(x, 300, 1180, 220)
    S.hero(x, t, o)
    // an oven mitt-ish apron dot of flour on its face
    inSprite(x, starFrame(o.x, o.y, o.s, t, o), () => { x.fillStyle = '#ffffff'; x.fillRect(24, 21, 2, 1.4); x.fillRect(26.5, 22, 1.2, 1) })
    return
  }
  // beat 3: the calendar with a repeating gold star
  const kk = pop01(t, S.b[3] - 0.05, 0.45, 2) * out
  calendar(x, t, 600, 820, 0.95 * kk, 1, pop01(t, S.b[3] + 0.8, 0.35, 2.6))
  if (t > S.b[3] + 1.3) label(x, 'REPEATS: EVERY YEAR', 600, 1080, { size: 34, col: GOLD, alpha: clamp((t - S.b[3] - 1.3) * 3) * out })
  sparkles(x, t, 610, 840, S.b[3] + 0.85, 10, 120, 1)
  shadow(x, 250, 1190, 180 * kk)
  S.hero(x, t, { x: 250, y: 1060, s: 210, pop: kk, mood: 'happy', look: [1, -0.6], hops: S.hops(2) })
}

const EP = makeAsk({
  sign: 'leo', name: 'LEO', partner: 'sagittarius',
  question: 'I forgot their | *birthday.*',
  lines: ["own it fast: 'i forgot. i'm really sorry.'", 'no big excuse. a real plan to make it up.', 'then put it in your calendar. today.'],
  chip: '♌ NATURAL RULER OF THE 5TH HOUSE: ROMANCE & PLAY',
  last: 'Own it. | Then *make it up.*', lastLate: 3,
  scene,
  pis: { x: 965, y: 1270, s: 100 },
  cues: [
    ['pop', 0.25, 523.25, 0.03, 0], ['whoosh', 0.4, 0.4, 0.025], ['tick', 1.2, 0.04],
    ['pop', 3.55, 880, 0.045, 0], ['pop', 3.62, 1174.66, 0.03, 0],
    ['pop', 6.15, 659.25, 0.035, 0.3], ['pluck', 6.9, 1046.5, 0.03, 0.3, 0.3], ['pluck', 7.15, 1174.66, 0.03, 0.3, 0.3], ['pluck', 7.4, 1318.51, 0.03, 0.3, 0.3], ['pluck', 7.65, 1567.98, 0.03, 0.3, 0.3], ['glitter', 7.8, 8.3],
    ['whoosh', 9.0, 0.3, 0.03], ['pop', 9.6, 1567.98, 0.045, 0.2], ['glitter', 9.65, 10.1],
  ],
})
export const DURATION = EP.DURATION, SCENES = EP.SCENES, CUES = EP.CUES
