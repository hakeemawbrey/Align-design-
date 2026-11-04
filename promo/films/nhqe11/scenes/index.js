// nhqe11: HOLIDAYS THEN VS NOW, "Aquarius traditions." (15 s vertical trial reel, promo/films/next30/b48.md,
// music: chiptune · F#). Story 0–10.6, then the shared end card. The format lives in ../../nhqe01/scenes/hqkit.js.
//   THEN   a HAPPY TOASTER DAY banner, one toaster, Aquarius alone in a party hat: "happy toaster day… to me."  Sticker "a party of *one.*"
//   NOW    the same banner, the whole crew in party hats; the toast pops and so does the confetti. Sticker "everyone *came.*"
//   7.9    THE STARS: "Weird traditions need witnesses."
import { makeHQ, box, R, ink, shadow, glow, bubble, confetti, INK, BONE, GOLD, PINK, MONO } from '../../nhqe01/scenes/hqkit.js'

function hat(x, cx, topY, s, col) {
  const w = s * 0.32, h = s * 0.42
  x.fillStyle = INK; x.beginPath(); x.moveTo(cx - w / 2 - 6, topY + 10); x.lineTo(cx, topY - h - 8); x.lineTo(cx + w / 2 + 6, topY + 10); x.closePath(); x.fill()
  x.fillStyle = col; x.beginPath(); x.moveTo(cx - w / 2, topY + 4); x.lineTo(cx, topY - h); x.lineTo(cx + w / 2, topY + 4); x.closePath(); x.fill()
  R(x, BONE, cx - w * 0.3, topY - h * 0.45, w * 0.6, 6); R(x, GOLD, cx - 9, topY - h - 16, 18, 18)
}
function banner(x, t) {
  x.save(); x.strokeStyle = INK; x.lineWidth = 6; x.beginPath(); x.moveTo(120, 470); x.quadraticCurveTo(540, 560, 960, 470); x.stroke(); x.restore()
  const txt = 'HAPPY TOASTER DAY'
  ;[...txt].forEach((ch, i) => {
    const p = (i + 0.5) / txt.length, bx = 120 + 840 * p, by = 470 + 90 * 4 * p * (1 - p) * 0.9 + 6 * Math.sin(t * 2 + i)
    if (ch === ' ') return
    x.save(); x.translate(bx, by); x.fillStyle = INK; x.beginPath(); x.moveTo(-24, 0); x.lineTo(24, 0); x.lineTo(0, 64); x.closePath(); x.fill()
    x.fillStyle = [GOLD, PINK, '#7fd0ff', '#9fe6b0'][i % 4]; x.beginPath(); x.moveTo(-19, 4); x.lineTo(19, 4); x.lineTo(0, 56); x.closePath(); x.fill()
    ink(x, ch, 0, 20, { size: 22, col: INK, font: MONO }); x.restore()
  })
}
function toaster(x, t, cx, cy, pop) {
  if (pop > 0) { const y = cy - 80 - 160 * Math.sin(Math.PI * Math.min(1, pop)); box(x, cx - 50, y - 40, 44, 60, '#d9a05b', { b: 4 }); box(x, cx + 6, y - 30, 44, 60, '#d9a05b', { b: 4 }) }
  box(x, cx - 110, cy - 110, 220, 120, '#c9cfd8', { b: 7, hi: '#e8edf4' }); R(x, INK, cx - 70, cy - 116, 50, 10); R(x, INK, cx + 20, cy - 116, 50, 10); R(x, INK, cx + 110, cy - 70, 22, 14)
}
function table(x) { box(x, 60, 1180, 960, 50, '#6b4a2f', { b: 6, hi: '#8a6440' }) }

const EP = makeHQ({
  id: 'nhqe11', hook: '*Aquarius* traditions: | then vs now', accent: '#7fd8ff', deep: '#2a7fb0',
  thenCap: 'a party of *one.*', nowCap: 'everyone *came.*',
  then(x, t, S) {
    banner(x, t)
    S.star(x, t, 'aquarius', { x: 300, y: 1020, s: 230, mood: 'happy', look: [1, 0], hops: [3.4] })
    hat(x, 300, 1020 - 115, 230, PINK)
    table(x)
    toaster(x, t, 700, 1180, 0)
    bubble(x, t, 330, 780, S.split ? -1 : 2.6, 5.0, 'happy toaster day… to me.', { size: 32, tail: 0 })
  },
  now(x, t, S) {
    glow(x, 540, 1000, 640, 0.7)
    banner(x, t)
    table(x)
    toaster(x, t, 540, 1180, S.split ? 0 : (t - 5.8) * 1.4)
    const crew = [['leo', 150, 1010, 170], ['gemini', 330, 960, 180], ['aquarius', 540, 930, 220], ['virgo', 750, 960, 180], ['taurus', 930, 1010, 170]]
    crew.forEach(([s, cx, cy, sz], i) => { S.star(x, t, s, { x: cx, y: cy, s: sz, mood: 'happy', look: [0, 0], seed: 10 + i, hops: [5.9 + i * 0.05, 6.8] }); hat(x, cx, cy - sz * 0.5, sz, [GOLD, '#7fd0ff', PINK, '#9fe6b0', '#c9a6ff'][i]) })
    if (!S.split) confetti(x, t, 5.95, 540, 900, { n: 34 })
  },
  pisThen: { x: 940, y: 900, s: 110 }, pisNow: { x: 960, y: 700, s: 100 },
  last: 'Weird traditions need witnesses.',
  cues: [['pop', 2.62, 880, 0.035, 0], ['tick', 5.8, 0.07], ['pop', 5.85, 1567.98, 0.05, 0], ['glitter', 5.95, 6.6], ['clap', 6.0, { gain: 0.12 }], ['clap', 6.25, { gain: 0.12 }], ['clap', 6.5, { gain: 0.12 }]],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
