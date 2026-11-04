// naske27 · Ask the Stars, Volume 2, ep 27 · "We text all day but say nothing." (20 s, pop · D)
// The format lives in ../../naske19/scenes/askkit2.js. Story 0–15.6, then the shared end card.
//   0.0   DM: "We text all day but say *nothing.*"  ♊ Gemini mid-juggle of message bubbles: "lol" "same" "haha" "ya".
//   3.0   "swap one text for a real phone call."  The bubbles pop; a big phone rings: CALLING…
//   5.9   "then ask: 'what's been on your mind?'"  A talk card flips over with the question.
//   8.75  card cut → 8.8 "small talk is the door. walk through it."  A door swings open on warm light; they step in.
//   12.1  "Ask the one | that *matters.*"
import { makeAsk, R, box, drawBits, bubble, sparkles, hearts, shadow, label, talkCard, pop01, outK, prog, lerp, clamp, ease, INK, BONE, GOLD, RED, INTER, MONO } from '../../naske19/scenes/askkit2.js'

const WORDS = ['lol', 'same', 'haha', 'ya']
function chip(x, cx, cy, text, col) {
  x.font = `800 40px ${INTER}`
  const w = x.measureText(text).width + 40
  R(x, INK, cx - w / 2 - 5, cy - 32, w + 10, 64); R(x, col, cx - w / 2, cy - 27, w, 54)
  x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, cx, cy + 1)
}
function bigPhone(x, t, cx, cy, s, ring) {
  const sh = ring ? Math.sin(t * 50) * 6 : 0
  x.save(); x.translate(cx + sh, cy); x.rotate(sh * 0.01)
  box(x, -110 * s, -200 * s, 220 * s, 400 * s, '#2b2140', { b: 8 })
  R(x, '#7fd0ff', -90 * s, -170 * s, 180 * s, 310 * s)
  x.font = `700 ${Math.round(26 * s)}px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = INK
  x.fillText('CALLING' + '...'.slice(0, 1 + Math.floor(t * 3) % 3), 0, -110 * s)
  drawBits(x, ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: '#ff5c8a' }, 0, -20 * s, 9 * s)
  R(x, '#3ce67a', -60 * s, 80 * s, 120 * s, 44 * s)
  x.restore()
  if (ring) for (let i = 0; i < 3; i++) { const ph = (t * 1.6 + i / 3) % 1; x.save(); x.globalAlpha = 1 - ph; x.strokeStyle = BONE; x.lineWidth = 6; x.beginPath(); x.arc(cx, cy, 240 * s + ph * 120, -0.6, 0.6); x.stroke(); x.beginPath(); x.arc(cx, cy, 240 * s + ph * 120, Math.PI - 0.6, Math.PI + 0.6); x.stroke(); x.restore() }
}

function scene(x, t, S) {
  const { k, out } = S
  if (k === 0 || (k === 1 && t < S.b[1] + 0.4)) {
    shadow(x, 540, 1185, 260)
    S.hero(x, t, { x: 540, y: 1020, s: 290, mood: 'squint', look: [Math.sin(t * 4.4), -1], hops: [0.2, 0.9, 1.6, 2.3] })
    // juggling arc: four bubbles on an ellipse above the head
    const popAt = S.b[1] + 0.05
    WORDS.forEach((w, i) => {
      const a = t * 4.4 + i * Math.PI / 2
      const cx = 540 + Math.cos(a) * 260, cy = 810 - Math.abs(Math.sin(a)) * 150
      if (t >= popAt + i * 0.08) { sparkles(x, t, cx, cy, popAt + i * 0.08, 6, 50, i); return }
      chip(x, cx, cy, w, ['#ffd6dc', '#d9f4e2', '#fff1c8', '#d6e8ff'][i])
    })
    return
  }
  if (k === 1) {
    const pk = pop01(t, S.b[1] + 0.4, 0.4, 2)
    bigPhone(x, t, 720, 860, pk, t < S.b[1] + 2.3)
    shadow(x, 300, 1185, 220)
    S.hero(x, t, { x: 300, y: 1030, s: 250, mood: t > S.b[1] + 1.0 ? 'happy' : 'wide', look: [1, -0.4], hops: S.hops(0) })
    return
  }
  if (k === 2) {
    const u = t - S.b[2]
    const flip = clamp((u - 0.4) / 0.4), sx = Math.abs(Math.cos(Math.PI * flip))
    x.save(); x.translate(540, 800); x.scale(Math.max(0.02, sx), 1)
    talkCard(x, 0, 0, 300, { back: flip < 0.5, text: "what's been on your mind?", size: 40, kicker: 'TALK CARD', color: '#f2c75c' })
    x.restore()
    if (flip >= 1) sparkles(x, t, 540, 800, S.b[2] + 0.8, 10, 240, 1)
    shadow(x, 200, 1185, 180); shadow(x, 880, 1185, 180)
    S.hero(x, t, { x: 200, y: 1060, s: 200, mood: 'happy', look: [1, -1], hops: S.hops(1) })
    S.partner(x, t, { x: 880, y: 1060, s: 200, mood: flip >= 1 && u > 1.3 ? 'sparkle' : 'neutral', look: [-1, -1], hops: [S.b[2] + 1.3] })
    return
  }
  // beat 3: the door opens on warm light
  const kk = pop01(t, S.b[3] - 0.05, 0.4, 2) * out
  const op = ease.inOutCubic(prog(t, S.b[3] + 0.4, S.b[3] + 1.3))
  const dx = 390, dy = 560, dw = 300, dh = 600
  x.save(); x.globalAlpha = kk
  R(x, INK, dx - 16, dy - 16, dw + 32, dh + 16)
  const g = x.createLinearGradient(0, dy, 0, dy + dh); g.addColorStop(0, '#ffd28a'); g.addColorStop(1, '#ffb35c')
  x.fillStyle = g; x.fillRect(dx, dy, dw, dh)
  // light spilling out
  x.save(); x.globalCompositeOperation = 'lighter'; x.globalAlpha = 0.35 * op; x.fillStyle = '#ffd28a'
  x.beginPath(); x.moveTo(dx, dy + dh); x.lineTo(dx + dw, dy + dh); x.lineTo(dx + dw + 260, 1300); x.lineTo(dx - 260, 1300); x.closePath(); x.fill(); x.restore()
  // the door leaf, swinging open (narrows toward the hinge)
  const lw = dw * (1 - 0.82 * op)
  box(x, dx, dy, lw, dh, '#6b4a2f', { b: 6, hi: '#8a6440' })
  if (lw > 60) R(x, GOLD, dx + lw - 40, dy + dh / 2, 18, 18)
  x.restore()
  shadow(x, 360, 1185, 200 * kk); shadow(x, 720, 1185, 200 * kk)
  S.hero(x, t, { x: 360, y: 1050, s: 230, pop: kk, mood: 'happy', look: [0.4, -1], hops: S.hops(2) })
  S.partner(x, t, { x: 720, y: 1050, s: 230, pop: kk, mood: 'happy', look: [-0.4, -1], hops: [S.b[3] + 1.4] })
  hearts(x, t, S.b[3] + 1.4, 540, 800, { n: 5, cell: 7, spread: 200 })
}

const EP = makeAsk({
  sign: 'gemini', name: 'GEMINI', partner: 'aquarius',
  question: 'We text all day | but say *nothing.*',
  lines: ['swap one text for a real phone call.', "then ask: 'what's been on your mind?'", 'small talk is the door. walk through it.'],
  chip: '♊ NATURAL RULER OF THE 3RD HOUSE: TALK & IDEAS',
  last: 'Ask the one | that *matters.*',
  scene,
  pis: { x: 965, y: 1270, s: 100 },
  cues: [
    ['pop', 0.2, 880, 0.02, -0.5], ['pop', 0.55, 987.77, 0.02, 0.5], ['pop', 0.9, 1174.66, 0.02, -0.5], ['pop', 1.25, 1318.51, 0.02, 0.5], ['pop', 1.6, 880, 0.02, -0.5], ['pop', 1.95, 987.77, 0.02, 0.5], ['pop', 2.3, 1174.66, 0.02, -0.5],
    ['glitter', 3.05, 3.45], ['pop', 3.1, 1567.98, 0.03, 0],
    ['bell', 3.5, 1318.51, 0.03, 0.4, 0.3], ['bell', 3.9, 1318.51, 0.03, 0.4, 0.3], ['bell', 4.5, 1318.51, 0.03, 0.4, 0.3], ['bell', 4.9, 1318.51, 0.03, 0.4, 0.3],
    ['whoosh', 6.3, 0.3, 0.03], ['pop', 6.7, 1174.66, 0.04, 0], ['glitter', 6.7, 7.1],
    ['whoosh', 9.2, 0.5, 0.03], ['glitter', 9.6, 10.2],
  ],
})
export const DURATION = EP.DURATION, SCENES = EP.SCENES, CUES = EP.CUES
