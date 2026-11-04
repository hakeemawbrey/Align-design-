// nhqe06: HOLIDAYS THEN VS NOW, "Virgo wrapping gifts." (15 s vertical trial reel, promo/films/next30/b48.md,
// music: lofi · F). Story 0–10.6, then the shared end card. The format lives in ../../nhqe01/scenes/hqkit.js.
//   THEN   3:00 AM: Virgo alone, measuring ribbon with a ruler over one perfect box. Sticker "a *ruler.* at 3 AM."
//   NOW    Gemini and Sagittarius help; three gifts with gloriously crooked bows; everyone laughs. Sticker "crooked bows. *great* night."
//   7.9    THE STARS: "Crooked bows, full hearts."
import { makeHQ, box, R, ink, shadow, glow, bubble, hearts, INK, BONE, GOLD, MONO } from '../../nhqe01/scenes/hqkit.js'

function gift(x, cx, cy, w, h, col, rib, tilt = 0) {
  box(x, cx - w / 2, cy - h, w, h, col, { b: 6 })
  R(x, rib, cx - 10, cy - h, 20, h); R(x, rib, cx - w / 2, cy - h / 2 - 10, w, 20)
  x.save(); x.translate(cx, cy - h - 4); x.rotate(tilt)
  for (const d of [-1, 1]) { x.save(); x.scale(d, 1); x.fillStyle = INK; x.beginPath(); x.moveTo(0, 0); x.lineTo(46, -30); x.lineTo(46, 18); x.closePath(); x.fill(); x.fillStyle = rib; x.beginPath(); x.moveTo(4, 0); x.lineTo(40, -22); x.lineTo(40, 12); x.closePath(); x.fill(); x.restore() }
  R(x, INK, -12, -12, 24, 24); R(x, rib, -8, -8, 16, 16); x.restore()
}
function table(x) { box(x, 60, 1180, 960, 50, '#8a5a3a', { b: 6, hi: '#a8704a' }) }

const EP = makeHQ({
  id: 'nhqe06', hook: '*Virgo* wrapping gifts: | then vs now', accent: '#b4e08a', deep: '#4a7a2a',
  thenCap: 'a *ruler.* at 3 AM.', nowCap: 'crooked bows. *great* night.',
  then(x, t, S) {
    box(x, 700, 470, 250, 100, '#14102a', { b: 6 }); ink(x, '3:00 AM', 825, 522, { size: 46, col: '#ff5c6a', font: MONO })
    glow(x, 540, 1100, 360, 0.6)
    table(x)
    gift(x, 640, 1180, 230, 170, '#3f7fd8', BONE)
    shadow(x, 330, 1180, 200)
    S.star(x, t, 'virgo', { x: 330, y: 1000, s: 240, mood: 'squint', look: [1, 0.6], hops: [3.2, 4.4] })
    // the ruler, measuring
    x.save(); x.translate(560 + 10 * Math.sin(t * 2), 1000); x.rotate(-0.05); box(x, -150, -18, 300, 36, '#f2d27a', { b: 4 }); for (let i = 0; i < 15; i++) R(x, INK, -140 + i * 20, -18, 3, i % 5 ? 12 : 22); x.restore()
    bubble(x, t, 400, 800, S.split ? -1 : 2.6, 5.0, '2 mm off. again.', { size: 36, tail: -0.3 })
  },
  now(x, t, S) {
    glow(x, 540, 1000, 620, 0.7)
    S.star(x, t, 'gemini', { x: 190, y: 960, s: 200, mood: 'happy', look: [1, 0.3], hops: [5.5, 6.3, 7.1], seed: 3 })
    S.star(x, t, 'sagittarius', { x: 890, y: 960, s: 200, mood: 'happy', look: [-1, 0.3], hops: [5.7, 6.5, 7.3], seed: 9 })
    S.star(x, t, 'virgo', { x: 540, y: 880, s: 220, mood: 'happy', look: [0, 0.4], hops: [5.4, 6.1, 6.9] })
    table(x)
    gift(x, 270, 1180, 170, 130, '#e86a5a', GOLD, -0.4)
    gift(x, 540, 1180, 200, 120, '#3f7fd8', BONE, 0.5)
    gift(x, 810, 1180, 150, 150, '#5fbf6a', '#ff8fb1', -0.2)
    if (!S.split) hearts(x, t, 5.9, 540, 760, { n: 6, spread: 500 })
    bubble(x, t, 540, 680, S.split ? -1 : 5.5, 10.6, 'it’s art now', { size: 36, tail: 0 })
  },
  pisNow: { x: 960, y: 640, s: 120 },
  last: 'Crooked bows, full hearts.',
  cues: [['tick', 2.8, 0.03], ['tick', 3.3, 0.03], ['tick', 3.8, 0.03], ['tick', 4.3, 0.03], ['pop', 5.5, 1174.66, 0.035, -0.3], ['pop', 5.7, 1318.51, 0.035, 0.3]],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
