// naske35 · Ask the Stars, Volume 2, ep 35 · "Can we skip the usual holiday stuff?" (20 s, chiptune · E)
// The format lives in ../../naske19/scenes/askkit2.js. Story 0–15.6, then the shared end card.
//   0.0   DM: "Can we *skip* the usual holiday stuff?"  ♒ Aquarius mid-build of an upside-down snowman (the big ball on
//         top) wearing a satellite-dish hat.
//   3.0   "yes. make a tradition that's yours."  A little wooden sign is stuck in the snowman: OURS.
//   5.9   "pancakes at midnight. a walk in the snow."  A pancake stack and a clock striking 12:00.
//   8.75  card cut → 8.8 "tell family early, kindly. then enjoy it."  A sent message: "love you! see you in january"
//   12.1  "Make a *new* | tradition."
import { makeAsk, R, box, drawBits, bubble, sparkles, hearts, shadow, inSprite, starFrame, snowBank, label, pop01, outK, prog, lerp, clamp, ease, INK, BONE, GOLD, RED, SNOW, INTER, MONO } from '../../naske19/scenes/askkit2.js'

function ball(x, cx, cy, r) {
  x.fillStyle = INK; x.beginPath(); x.arc(cx, cy, r + 7, 0, Math.PI * 2); x.fill()
  x.fillStyle = SNOW; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#d6e2f2'; x.beginPath(); x.arc(cx + r * 0.25, cy + r * 0.25, r * 0.7, 0, Math.PI * 2); x.fill()
  x.fillStyle = SNOW; x.beginPath(); x.arc(cx - r * 0.1, cy - r * 0.1, r * 0.75, 0, Math.PI * 2); x.fill()
}
function snowman(x, t, cx, by, place) {
  // upside down: small at the bottom, big on top
  ball(x, cx, by - 60, 60)
  ball(x, cx, by - 170, 85)
  const ty = lerp(by - 520, by - 340, ease.outCubic(place))
  ball(x, cx, ty, 115)
  // face on the big ball (upside-down-ish: smile on top)
  R(x, INK, cx - 40, ty - 20, 16, 16); R(x, INK, cx + 24, ty - 20, 16, 16)
  R(x, '#ff9a4a', cx - 8, ty + 4, 40, 14)
  for (let i = 0; i < 5; i++) R(x, INK, cx - 40 + i * 20, ty + 40 - Math.abs(i - 2) * 6, 10, 10)
  // the satellite-dish hat
  x.save(); x.translate(cx + 10, ty - 120); x.rotate(-0.3 + Math.sin(t * 2) * 0.05)
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 76, 36, 0, Math.PI, 0); x.fill()
  x.fillStyle = '#c9d2e6'; x.beginPath(); x.ellipse(0, -2, 66, 28, 0, Math.PI, 0); x.fill()
  R(x, INK, -4, -64, 8, 40); R(x, RED, -9, -74, 18, 14)
  x.restore()
  // stick arms
  x.strokeStyle = '#6b4a2f'; x.lineWidth = 9; x.beginPath(); x.moveTo(cx - 80, by - 180); x.lineTo(cx - 170, by - 240); x.moveTo(cx + 80, by - 180); x.lineTo(cx + 170, by - 130); x.stroke()
}
function pancakes(x, t, cx, by, k) {
  for (let i = 0; i < 5; i++) { const y = by - i * 30 * k; R(x, INK, cx - 110, y - 26, 220, 34); R(x, '#e8b064', cx - 104, y - 22, 208, 24); R(x, '#c98a3c', cx - 104, y - 2, 208, 6) }
  R(x, INK, cx - 30, by - 150 * k - 12, 60, 30); R(x, '#fff1a8', cx - 26, by - 150 * k - 8, 52, 22)
  x.fillStyle = '#8a4a1c'; x.fillRect(cx - 60, by - 150 * k + 10, 120, 12); x.fillRect(cx + 40, by - 150 * k + 10, 14, 40)
}

function scene(x, t, S) {
  const { k, out } = S
  if (k <= 1) {
    snowBank(x, 1215)
    snowman(x, t, 720, 1200, k === 0 ? prog(t, -0.4, 1.2) : 1)
    if (k === 1) {
      const sk = pop01(t, S.b[1] + 0.5, 0.35, 2.2)
      x.save(); x.translate(560, 1100); x.rotate(-0.12); x.scale(sk, sk)
      R(x, INK, -8, -10, 16, 140); R(x, '#8a5a32', -4, -6, 8, 136)
      box(x, -100, -90, 200, 80, '#c99a5a', { b: 6, hi: '#e0b878' })
      x.font = `800 48px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = INK; x.fillText('OURS', 0, -48)
      x.restore()
      sparkles(x, t, 600, 1020, S.b[1] + 0.55, 10, 140, 1)
    }
    shadow(x, 280, 1185, 220)
    S.hero(x, t, { x: 280, y: 1020, s: 250, mood: k === 0 ? 'squint' : 'happy', look: [1, -1], hops: [0.9, ...S.hops(0)] })
    return
  }
  if (k === 2) {
    const pk = pop01(t, S.b[2] + 0.1, 0.4, 2)
    pancakes(x, t, 360, 1150, pk)
    // the clock at midnight
    const ck = pop01(t, S.b[2] + 0.6, 0.35, 2.2)
    if (ck > 0.01) {
      x.save(); x.translate(760, 780); x.scale(ck, ck)
      x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 138, 0, Math.PI * 2); x.fill(); x.fillStyle = BONE; x.beginPath(); x.arc(0, 0, 128, 0, Math.PI * 2); x.fill()
      R(x, INK, -6, -108, 12, 108); R(x, INK, -8, -80, 16, 80)
      x.font = `700 40px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = RED; x.fillText('12:00', 0, 64)
      x.restore()
    }
    if (t > S.b[2] + 1.2) label(x, 'DONG', 960, 640, { size: 40, col: GOLD, alpha: outK(t, [S.b[2] + 2.2, S.b[2] + 2.5]), rot: 0.12 })
    shadow(x, 700, 1185, 200)
    S.hero(x, t, { x: 700, y: 1060, s: 210, mood: 'sparkle', look: [-1, -0.4], hops: S.hops(1) })
    S.partner(x, t, { x: 900, y: 1080, s: 170, mood: 'happy', look: [-1, -0.4], hops: [S.b[2] + 1.3] })
    return
  }
  // beat 3: the kind, early message
  const kk = pop01(t, S.b[3] - 0.05, 0.4, 2) * out
  x.save(); x.translate(620, 820); x.scale(kk, kk)
  box(x, -200, -280, 400, 560, '#2b2140', { b: 8 })
  R(x, '#1b1236', -176, -250, 352, 500)
  const mk = pop01(t, S.b[3] + 0.5, 0.35, 2.2)
  if (mk > 0.01) {
    x.save(); x.translate(0, -60); x.scale(mk, mk)
    R(x, INK, -168, -70, 336, 140); R(x, '#7fd0ff', -162, -64, 324, 128)
    x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = INK; x.fillText('love you! see you', 0, -20); x.fillText('in january', 0, 22)
    x.restore()
  }
  if (t > S.b[3] + 1.1) { x.font = `700 26px ${MONO}`; x.textAlign = 'right'; x.fillStyle = '#9fe6b0'; x.fillText('sent ✓', 180, 40) }
  if (t > S.b[3] + 1.7) { R(x, INK, -170, 80, 280, 90); R(x, BONE, -164, 86, 268, 78); x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.fillStyle = INK; x.fillText('love you too!!', -30, 128) }
  x.restore()
  shadow(x, 220, 1185, 200 * kk)
  S.hero(x, t, { x: 220, y: 1050, s: 220, pop: kk, mood: t > S.b[3] + 1.8 ? 'happy' : 'neutral', look: [1, -0.6], hops: S.hops(2) })
  hearts(x, t, S.b[3] + 1.8, 560, 860, { n: 4, cell: 6, spread: 140 })
}

const EP = makeAsk({
  sign: 'aquarius', name: 'AQUARIUS', partner: 'sagittarius',
  question: 'Can we *skip* the usual | holiday stuff?',
  lines: ["yes. make a tradition that's yours.", 'pancakes at midnight. a walk in the snow.', 'tell family early, kindly. then enjoy it.'],
  chip: '♒ NATURAL RULER OF THE 11TH HOUSE: FRIENDS & HOPES',
  last: 'Make a *new* | tradition.', lastLate: 2,
  scene, qSize: 84,
  pis: { x: 965, y: 1290, s: 96 },
  cues: [
    ['whoosh', 0.1, 0.4, 0.03], ['tom', 0.85, 120, { gain: 0.15, decay: 0.2 }], ['tick', 0.9, 0.04],
    ['tom', 3.55, 140, { gain: 0.12, decay: 0.15 }], ['pop', 3.6, 1174.66, 0.04, -0.2], ['glitter', 3.6, 4.0],
    ['pop', 6.1, 880, 0.03, -0.4], ['bell', 7.1, 1046.5, 0.035, 1.0, 0.3], ['bell', 7.5, 1046.5, 0.03, 1.0, 0.3],
    ['pop', 9.35, 1318.51, 0.04, 0], ['tick', 9.9, 0.04], ['pop', 10.55, 987.77, 0.04, 0], ['glitter', 10.6, 11.0],
  ],
})
export const DURATION = EP.DURATION, SCENES = EP.SCENES, CUES = EP.CUES
