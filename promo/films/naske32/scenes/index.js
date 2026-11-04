// naske32 · Ask the Stars, Volume 2, ep 32 · "Do I have to tell them about my past?" (20 s, cinematic · Em)
// The format lives in ../../naske19/scenes/askkit2.js. Story 0–15.6, then the shared end card.
//   0.0   DM: "Do I have to tell them about my *past?*"  ♏ Scorpio mid-clutch of a locked diary, the lock rattling.
//   3.0   "you don't owe your whole story on date three."  The diary stays shut. A calm tag: "that's okay."
//   5.9   "share it when there's trust. at your pace."  The lock clicks open; one page glows.
//   8.75  card cut → 8.8 "and when they share theirs, hold it gently."  The partner holds its own diary; both glow.
//   12.1  "Your story, | *your* pace."
import { makeAsk, R, box, drawBits, bubble, sparkles, hearts, shadow, label, pop01, outK, prog, lerp, clamp, ease, INK, BONE, GOLD, RED } from '../../naske19/scenes/askkit2.js'

function diary(x, t, cx, cy, s, { col = '#6b3fa0', open = 0, lock = 0, rattle = 0, glow = 0 } = {}) {
  x.save(); x.translate(cx + rattle * Math.sin(t * 48) * 6, cy); x.rotate(rattle * Math.sin(t * 40) * 0.03); x.scale(s, s)
  if (glow > 0) { x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(0, -20, 10, 0, -20, 260); g.addColorStop(0, `rgba(255,220,150,${0.5 * glow})`); g.addColorStop(1, 'rgba(255,220,150,0)'); x.fillStyle = g; x.fillRect(-280, -300, 560, 560); x.restore() }
  if (open <= 0) {
    box(x, -130, -170, 260, 340, col, { b: 7, hi: '#8a5fc0' })
    R(x, '#f5eedf', 120, -160, 10, 320)
    R(x, GOLD, -130, -30, 260, 22)
    // the lock
    box(x, 90, -60, 70, 80, GOLD, { b: 6, hi: '#ffe6a0' })
    x.strokeStyle = INK; x.lineWidth = 16; x.beginPath(); x.arc(125, -60 - lock * 26, 24, Math.PI, 0); x.stroke()
    x.strokeStyle = '#d9b45a'; x.lineWidth = 8; x.beginPath(); x.arc(125, -60 - lock * 26, 24, Math.PI, 0); x.stroke()
    R(x, INK, 119, -34, 12, 22)
  } else {
    box(x, -260, -150, 250, 300, '#f5eedf', { b: 7 }); box(x, 10, -150, 250, 300, '#f5eedf', { b: 7 })
    R(x, col, -14, -160, 28, 320)
    for (let j = 0; j < 6; j++) { R(x, '#c9bda6', -230, -110 + j * 40, 190, 6); R(x, j < 3 ? '#e8c766' : '#c9bda6', 40, -110 + j * 40, j === 2 ? 120 : 190, 6) }
  }
  x.restore()
}

function scene(x, t, S) {
  const { k, out } = S
  if (k <= 1) {
    diary(x, t, 700, 880, 0.9, { rattle: k === 0 ? 1 : 0 })
    shadow(x, 330, 1180, 230)
    S.hero(x, t, { x: 330, y: 1010, s: 280, mood: k === 0 ? 'squint' : 'neutral', look: [1, 0], hops: [0.4, 1.3, 2.2, ...S.hops(0)] })
    if (k === 1) label(x, "that's okay.", 700, 1120, { size: 40, col: '#c9b8f0', alpha: clamp((t - S.b[1] - 0.9) * 2.5) })
    return
  }
  if (k === 2) {
    const u = t - S.b[2]
    const lock = clamp((u - 0.6) / 0.2)
    const op = u > 1.2 ? 1 : 0
    diary(x, t, 680, 880, 0.9, { lock, open: op, glow: clamp((u - 1.2) / 0.6) })
    if (u > 0.78 && u < 1.2) label(x, 'CLICK', 820, 720, { size: 40, col: GOLD })
    if (op) sparkles(x, t, 790, 860, S.b[2] + 1.25, 10, 120, 1)
    shadow(x, 260, 1180, 220)
    S.hero(x, t, { x: 260, y: 1010, s: 250, mood: u > 1.3 ? 'happy' : 'neutral', look: [1, 0], hops: S.hops(1) })
    if (u > 1.6) label(x, 'one page. for now.', 680, 1110, { size: 34, col: GOLD, alpha: clamp((u - 1.6) * 3) })
    return
  }
  // beat 3: two diaries, both glowing; held gently
  const kk = pop01(t, S.b[3] - 0.05, 0.4, 2) * out
  diary(x, t, 330, 780, 0.55 * kk, { open: 1, glow: 0.8 })
  diary(x, t, 750, 780, 0.55 * pop01(t, S.b[3] + 0.6, 0.4, 2) * out, { open: 1, glow: 0.8, col: '#3a86cc' })
  shadow(x, 330, 1180, 220 * kk); shadow(x, 750, 1180, 220 * kk)
  S.hero(x, t, { x: 330, y: 1040, s: 240, pop: kk, mood: 'happy', look: [1, 0], hops: S.hops(2) })
  S.partner(x, t, { x: 750, y: 1040, s: 240, pop: kk, mood: t > S.b[3] + 1.4 ? 'happy' : 'neutral', look: [-1, 0], hops: [S.b[3] + 1.4] })
  hearts(x, t, S.b[3] + 1.5, 540, 880, { n: 5, cell: 7, spread: 160 })
}

const EP = makeAsk({
  sign: 'scorpio', name: 'SCORPIO', partner: 'pisces',
  question: 'Do I have to tell them | about my *past?*',
  lines: ["you don't owe your whole story on date three.", "share it when there's trust. at your pace.", 'and when they share theirs, hold it gently.'],
  chip: '♏ NATURAL RULER OF THE 8TH HOUSE: TRANSFORMATION',
  last: 'Your story, | *your* pace.', lastLate: 2,
  scene, qSize: 84,
  pis: { x: 965, y: 1270, s: 100 },
  cues: [
    ['tick', 0.1, 0.035], ['tick', 0.25, 0.035], ['tick', 0.4, 0.035], ['tick', 1.2, 0.035], ['tick', 1.35, 0.035], ['tick', 2.1, 0.035], ['tick', 2.25, 0.035],
    ['pluck', 4.0, 659.25, 0.025, 0.6, 0],
    ['tick', 6.7, 0.08], ['pop', 6.72, 1567.98, 0.03, 0.3], ['whoosh', 7.1, 0.3, 0.03], ['bell', 7.2, 1318.51, 0.025, 1.0, 0.3], ['glitter', 7.15, 7.6],
    ['pop', 9.45, 987.77, 0.035, 0.3], ['glitter', 9.5, 10.0],
  ],
})
export const DURATION = EP.DURATION, SCENES = EP.SCENES, CUES = EP.CUES
