// nhqe02: HOLIDAYS THEN VS NOW, "Taurus's holiday dinner." (15 s vertical trial reel, promo/films/next30/b48.md,
// music: funk · Bb). Story 0–10.6, then the shared end card. The format lives in ../../nhqe01/scenes/hqkit.js.
//   THEN   midnight (12:04 AM): Taurus eats alone in the fridge light. Sticker "dinner for *one*, by the fridge."
//   NOW    Taurus stirs a big pot; Cancer and Libra at the table, plates out. Sticker "a *full* table."
//   7.9    THE STARS: "Good food tastes better shared."
import { makeHQ, box, R, ink, shadow, glow, bubble, hearts, INK, BONE, GOLD, MONO } from '../../nhqe01/scenes/hqkit.js'

function fridge(x, t) {
  box(x, 600, 460, 300, 820, '#dfe6ee', { b: 8 })
  box(x, 612, 476, 276, 790, '#fff8dc', { b: 0 })
  for (let i = 0; i < 3; i++) R(x, '#c9cfd8', 612, 700 + i * 180, 276, 10)
  box(x, 640, 640, 80, 56, '#9fe6b0', { b: 4 }); box(x, 760, 820, 90, 70, '#ffb38a', { b: 4 }); box(x, 650, 1000, 70, 90, '#c9a6ff', { b: 4 })
  // the open door
  x.save(); x.fillStyle = INK; x.beginPath(); x.moveTo(900, 460); x.lineTo(1010, 420); x.lineTo(1010, 1320); x.lineTo(900, 1280); x.closePath(); x.fill()
  x.fillStyle = '#c9cfd8'; x.beginPath(); x.moveTo(906, 470); x.lineTo(1002, 434); x.lineTo(1002, 1306); x.lineTo(906, 1272); x.closePath(); x.fill(); x.restore()
  glow(x, 600, 900, 560, 0.9, '255,250,220')
}
function table(x, t) {
  box(x, 60, 1150, 960, 50, '#8a5a3a', { b: 6, hi: '#a8704a' })
  for (const px of [220, 540, 860]) { x.save(); x.fillStyle = INK; x.beginPath(); x.ellipse(px, 1146, 80, 20, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = '#f4f1ff'; x.beginPath(); x.ellipse(px, 1142, 72, 15, 0, 0, Math.PI * 2); x.fill(); x.restore() }
}
function pot(x, t, cx, cy) {
  box(x, cx - 130, cy - 120, 260, 130, '#3a3a52', { b: 7, hi: '#55556e' }); R(x, INK, cx - 160, cy - 100, 30, 20); R(x, INK, cx + 130, cy - 100, 30, 20)
  x.save(); x.globalAlpha = 0.55; for (let i = 0; i < 5; i++) { const p = (t * 0.6 + i / 5) % 1; R(x, '#f4f1ff', cx - 80 + i * 40 + 10 * Math.sin(t * 3 + i), cy - 140 - p * 140, 12, 12) } x.restore()
  x.save(); x.translate(cx + 40, cy - 120); x.rotate(0.4 + 0.3 * Math.sin(t * 5)); R(x, INK, -8, -150, 16, 160); R(x, '#c89a5a', -4, -146, 8, 152); x.restore()
}

const EP = makeHQ({
  id: 'nhqe02', hook: '*Taurus* holiday dinner: | then vs now', accent: '#9fe07a', deep: '#5a7a2a',
  thenCap: 'dinner for *one*, by the fridge.', nowCap: 'a *full* table.',
  then(x, t, S) {
    fridge(x, t)
    ink(x, '12:04 AM', 300, 520, { size: 44, col: '#ff5c6a', font: MONO })
    shadow(x, 430, 1290, 240)
    S.star(x, t, 'taurus', { x: 430, y: 1100, s: 260, mood: 'neutral', look: [1, 0], hops: [2.8, 3.4, 4.0, 4.6] })
    box(x, 520, 1120, 80, 60, '#ffb38a', { b: 4 })
    bubble(x, t, 400, 880, S.split ? -1 : 2.8, 5.0, '*chews alone*', { size: 32, tail: 0 })
  },
  now(x, t, S) {
    glow(x, 540, 900, 640, 0.7)
    S.star(x, t, 'cancer', { x: 210, y: 1010, s: 200, mood: 'happy', look: [1, 0], hops: [5.6, 6.6], seed: 3 })
    S.star(x, t, 'libra', { x: 870, y: 1010, s: 200, mood: 'heart', look: [-1, 0], hops: [6.0, 7.0], seed: 9 })
    S.star(x, t, 'taurus', { x: 540, y: 780, s: 240, mood: 'happy', look: [0, 1], hops: [5.4, 6.2, 7.2] })
    table(x, t)
    pot(x, t, 540, 1110)
    if (!S.split) hearts(x, t, 5.6, 540, 640, { n: 5, spread: 400 })
  },
  pisNow: { x: 950, y: 1220, s: 110 }, pisThen: { x: 160, y: 1220, s: 110 },
  last: 'Good food tastes better shared.',
  cues: [['pluck', 5.5, 1318.51, 0.03, 0, 0.4], ['pop', 6.0, 1567.98, 0.03, 0.3]],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
