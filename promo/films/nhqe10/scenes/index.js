// nhqe10: HOLIDAYS THEN VS NOW, "Capricorn on the 24th." (15 s vertical trial reel, promo/films/next30/b48.md,
// music: pop · A). Story 0–10.6, then the shared end card. The format lives in ../../nhqe01/scenes/hqkit.js.
//   THEN   the holiday table; Capricorn types on a laptop, NEW EMAIL pings: "one sec. one email."  Sticker "*one* more email."
//   NOW    the laptop is shut (an OUT OF OFFICE sticky note on the lid); a board game, dice tumbling, everyone laughing. Sticker "game night, *for real.*"
//   7.9    THE STARS: "Out of office means out of office."
import { makeHQ, box, R, ink, shadow, glow, bubble, hearts, pop01, INK, BONE, GOLD, MONO } from '../../nhqe01/scenes/hqkit.js'

function table(x) { box(x, 40, 1180, 1000, 50, '#6b4a2f', { b: 6, hi: '#8a6440' }) }
function laptopOpen(x, t, cx, cy) {
  box(x, cx - 150, cy - 210, 300, 200, '#2a2148', { b: 6 }); R(x, '#cfe6ff', cx - 134, cy - 196, 268, 172)
  for (let i = 0; i < 5; i++) R(x, '#7f9ab8', cx - 120, cy - 180 + i * 28, 140 + ((i * 53) % 100), 12)
  box(x, cx - 180, cy - 10, 360, 24, '#5a5470', { b: 5 })
}
function laptopShut(x, cx, cy) {
  box(x, cx - 180, cy - 30, 360, 44, '#5a5470', { b: 5 })
  x.save(); x.translate(cx + 40, cy - 64); x.rotate(-0.06); box(x, -100, -32, 200, 60, '#ffe27a', { b: 4 }); ink(x, 'OUT OF OFFICE', 0, 0, { size: 22, col: INK, font: MONO }); x.restore()
}
function boardGame(x, t, cx, cy) {
  box(x, cx - 220, cy - 26, 440, 34, '#f3e6c4', { b: 5 })
  const C = ['#e86a5a', '#5fbf6a', '#3f7fd8', '#ffd25c']
  for (let i = 0; i < 10; i++) R(x, C[i % 4], cx - 206 + i * 42, cy - 18, 36, 18)
  // two dice tumbling
  for (const [d, ph] of [[-60, 0], [60, 1.3]]) { const b = Math.abs(Math.sin(t * 5 + ph)) * 60; x.save(); x.translate(cx + d, cy - 80 - b); x.rotate(t * 4 + ph); box(x, -24, -24, 48, 48, BONE, { b: 4 }); for (let p = 0; p < 6; p++) R(x, INK, (p % 2 ? 8 : -16), -18 + Math.floor(p / 2) * 14, 8, 8); x.restore() }
}

const EP = makeHQ({
  id: 'nhqe10', hook: '*Capricorn* on the 24th: | then vs now', accent: '#c8b4a0', deep: '#6b4a2f',
  thenCap: '*one* more email.', nowCap: 'game night, *for real.*',
  then(x, t, S) {
    S.star(x, t, 'cancer', { x: 160, y: 1040, s: 170, mood: 'neutral', look: [1, 0], seed: 3 })
    S.star(x, t, 'leo', { x: 920, y: 1040, s: 170, mood: 'eyeroll', seed: 8 })
    S.star(x, t, 'capricorn', { x: 420, y: 1010, s: 220, mood: 'squint', look: [1, 0.4], hops: [3.0, 3.6, 4.2] })
    table(x)
    laptopOpen(x, t, 650, 1176)
    const pk = S.split ? 1 : pop01(t, 2.6, 0.25, 2.6)
    if (pk > 0.01) { x.save(); x.translate(720, 860); x.scale(pk, pk); box(x, -120, -36, 240, 72, '#e8344e', { b: 5 }); ink(x, 'NEW EMAIL', 0, 2, { size: 30, col: BONE, font: MONO }); x.restore() }
    bubble(x, t, 400, 760, S.split ? -1 : 3.1, 5.0, 'one sec. one email.', { size: 34, tail: 0 })
  },
  now(x, t, S) {
    glow(x, 540, 1000, 620, 0.7)
    S.star(x, t, 'cancer', { x: 160, y: 1040, s: 170, mood: 'happy', look: [1, 0], seed: 3, hops: [5.8, 6.8] })
    S.star(x, t, 'leo', { x: 920, y: 1040, s: 170, mood: 'happy', look: [-1, 0], seed: 8, hops: [6.0, 7.0] })
    S.star(x, t, 'capricorn', { x: 540, y: 980, s: 220, mood: 'happy', look: [0, 0.5], hops: [5.4, 6.0, 6.6, 7.2] })
    table(x)
    laptopShut(x, 230, 1176)
    boardGame(x, t, 640, 1176)
    if (!S.split) hearts(x, t, 6.1, 540, 780, { n: 5, spread: 400 })
    bubble(x, t, 540, 740, S.split ? -1 : 5.5, 10.6, 'DOUBLE SIX!', { size: 40, tail: 0 })
  },
  pisThen: { x: 960, y: 540, s: 100 }, pisNow: { x: 960, y: 540, s: 110 },
  last: 'Out of office means out of office.',
  cues: [['bell', 2.6, 1567.98, 0.03, 0.8, 0.3], ['pop', 3.12, 987.77, 0.035, 0], ['tick', 5.3, 0.05], ['tick', 5.45, 0.05], ['pop', 5.52, 1318.51, 0.045, 0], ['glitter', 5.5, 6.0]],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
