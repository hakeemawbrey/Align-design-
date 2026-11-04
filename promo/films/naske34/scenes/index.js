// naske34 · Ask the Stars, Volume 2, ep 34 · "Should I wait for them to change?" (20 s, lofi · Dm)
// The format lives in ../../naske19/scenes/askkit2.js. Story 0–15.6, then the shared end card.
//   0.0   DM: "Should I wait for them to *change?*"  ♑ Capricorn mid-turn of an hourglass that runs with snow, not sand.
//   3.0   "give it time. not forever."  The hourglass runs; the top bulb empties.
//   5.9   "watch what they do, not what they promise."  A big I'LL CHANGE bubble floats beside an empty footprint path.
//   8.75  card cut → 8.8 "your time matters too. count it."  A clock with Capricorn's glyph on its face, ticking.
//   12.1  "Wait with your | *eyes* open."
import { makeAsk, R, box, drawBits, bubble, sparkles, hearts, shadow, label, signStar, pop01, outK, prog, lerp, clamp, ease, INK, BONE, GOLD, RED, SNOW, GLYPH } from '../../naske19/scenes/askkit2.js'

const CAP = signStar('capricorn')
function hourglass(x, t, cx, cy, rot, level) {
  x.save(); x.translate(cx, cy); x.rotate(rot)
  box(x, -140, -230, 280, 30, '#8a5a32', { b: 6, hi: '#a8743f' }); box(x, -140, 200, 280, 30, '#8a5a32', { b: 6, hi: '#a8743f' })
  R(x, INK, -126, -200, 12, 400); R(x, INK, 114, -200, 12, 400)
  const glass = (sgn) => { x.beginPath(); x.moveTo(-100, sgn * 200); x.lineTo(100, sgn * 200); x.lineTo(14, sgn * 14); x.lineTo(-14, sgn * 14); x.closePath() }
  for (const sgn of [-1, 1]) { glass(sgn); x.fillStyle = 'rgba(191,233,255,0.18)'; x.fill(); x.strokeStyle = INK; x.lineWidth = 8; x.stroke(); x.strokeStyle = '#bfe9ff'; x.lineWidth = 3; x.stroke() }
  // snow: top amount = 1 - level, bottom = level
  x.fillStyle = SNOW
  const top = (1 - level), bot = level
  if (top > 0.02) { const h = 150 * top, w = 14 + (100 - 14) * (h / 186); x.beginPath(); x.moveTo(-w, -14 - h); x.lineTo(w, -14 - h); x.lineTo(14, -14); x.lineTo(-14, -14); x.closePath(); x.fill() }
  if (bot > 0.02) { const h = 150 * bot; x.beginPath(); x.moveTo(-100 + 86 * 0.0, 196); x.lineTo(100, 196); x.lineTo(100 - 86 * (h / 186), 196 - h); x.lineTo(-100 + 86 * (h / 186), 196 - h); x.closePath(); x.fill() }
  if (top > 0.02 && bot >= 0) for (let i = 0; i < 6; i++) { const ph = (t * 1.6 + i / 6) % 1; x.fillRect(-4 + Math.sin(i * 3) * 4, -10 + ph * (190 - 150 * bot), 8, 8) }
  x.restore()
}
function clock(x, t, cx, cy, r) {
  R(x, INK, cx - r - 8, cy - r - 8, 2 * r + 16, 2 * r + 16)
  x.fillStyle = INK; x.beginPath(); x.arc(cx, cy, r + 8, 0, Math.PI * 2); x.fill()
  x.fillStyle = BONE; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill()
  for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; R(x, INK, cx + Math.cos(a) * r * 0.82 - 5, cy + Math.sin(a) * r * 0.82 - 5, 10, 10) }
  x.font = `700 ${Math.round(r * 0.7)}px ${GLYPH}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = CAP.color; x.fillText(CAP.glyph + '︎', cx, cy + r * 0.05)
  const a1 = t * 2.2 - Math.PI / 2, a2 = t * 0.4 - Math.PI / 2
  x.strokeStyle = INK; x.lineCap = 'round'; x.lineWidth = 12; x.beginPath(); x.moveTo(cx, cy); x.lineTo(cx + Math.cos(a2) * r * 0.45, cy + Math.sin(a2) * r * 0.45); x.stroke()
  x.lineWidth = 8; x.beginPath(); x.moveTo(cx, cy); x.lineTo(cx + Math.cos(a1) * r * 0.7, cy + Math.sin(a1) * r * 0.7); x.stroke()
  R(x, RED, cx - 8, cy - 8, 16, 16)
}

function scene(x, t, S) {
  const { k, out } = S
  if (k <= 1) {
    const rot = k === 0 ? lerp(Math.PI * 0.75, Math.PI * 2, ease.inOutCubic(prog(t, -0.5, 1.4))) : 0
    const level = k === 0 ? 0.0 : clamp((t - S.b[1]) / 2.6)
    hourglass(x, t, 700, 870, rot, level)
    shadow(x, 330, 1180, 230)
    S.hero(x, t, { x: 330, y: 1010, s: 270, mood: k === 0 ? 'squint' : 'neutral', look: [1, -0.3], hops: [1.45, ...S.hops(0)] })
    return
  }
  if (k === 2) {
    const u = t - S.b[2]
    // the footprint path: dashed outlines, no prints
    for (let i = 0; i < 5; i++) { x.save(); x.globalAlpha = 0.8; x.strokeStyle = BONE; x.setLineDash([10, 10]); x.lineWidth = 4; x.strokeRect(560 + i * 90 - (i % 2) * 10, 1120 - i * 60 + (i % 2) * 20, 46, 66); x.restore() }
    label(x, 'WHAT THEY DO:', 760, 1210, { size: 30, col: '#c9b8f0', alpha: clamp((u - 1.2) * 3) })
    bubble(x, t, 700, 720, S.b[2] + 0.3, S.b[3], "I'LL CHANGE!!", { size: 62, col: '#ffd6dc', ink: RED })
    if (u > 1.0) label(x, '(promise no. 4)', 700, 830, { size: 30, col: BONE, alpha: clamp((u - 1.0) * 3) })
    shadow(x, 240, 1180, 220)
    S.hero(x, t, { x: 240, y: 1010, s: 240, mood: u > 1.2 ? 'eyeroll' : 'neutral', look: [1, 0], hops: S.hops(1) })
    return
  }
  // beat 3: your time, on your clock
  const kk = pop01(t, S.b[3] - 0.05, 0.4, 2) * out
  if (kk > 0.01) { x.save(); x.translate(680, 820); x.scale(kk, kk); x.translate(-680, -820); clock(x, t, 680, 820, 190); x.restore() }
  if (t > S.b[3] + 1.0) label(x, 'YOUR TIME', 680, 1080, { size: 40, col: GOLD, alpha: clamp((t - S.b[3] - 1.0) * 3) * out })
  shadow(x, 260, 1180, 220 * kk)
  S.hero(x, t, { x: 260, y: 1020, s: 250, pop: kk, mood: t > S.b[3] + 1.2 ? 'happy' : 'neutral', look: [1, -0.5], hops: S.hops(2) })
  sparkles(x, t, 680, 820, S.b[3] + 1.0, 12, 240, 1)
}

const EP = makeAsk({
  sign: 'capricorn', name: 'CAPRICORN', partner: 'gemini',
  question: 'Should I wait for | them to *change?*',
  lines: ['give it time. not forever.', 'watch what they do, not what they promise.', 'your time matters too. count it.'],
  chip: '♑ NATURAL RULER OF THE 10TH HOUSE: DIRECTION',
  last: 'Wait with your | *eyes* open.', lastLate: 2,
  scene,
  pis: { x: 965, y: 1270, s: 100 },
  cues: [
    ['whoosh', 0.2, 0.6, 0.03], ['tom', 1.45, 110, { gain: 0.15, decay: 0.25 }], ['tick', 1.45, 0.05],
    ['glitter', 3.2, 5.6],
    ['pop', 6.25, 880, 0.045, 0.3], ['pop', 6.32, 1174.66, 0.03, 0.3], ['pluck', 7.2, 523.25, 0.03, 0.4, -0.3],
    ['tick', 9.0, 0.04], ['tick', 9.5, 0.04], ['tick', 10.0, 0.04], ['tick', 10.5, 0.04], ['tick', 11.0, 0.04], ['tick', 11.5, 0.04], ['glitter', 9.8, 10.3],
  ],
})
export const DURATION = EP.DURATION, SCENES = EP.SCENES, CUES = EP.CUES
