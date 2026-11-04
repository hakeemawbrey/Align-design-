// nhqe09: HOLIDAYS THEN VS NOW, "Sagittarius's trips." (15 s vertical trial reel, promo/films/next30/b48.md,
// music: synthwave · Am). Story 0–10.6, then the shared end card. The format lives in ../../nhqe01/scenes/hqkit.js.
//   THEN   a door with a sticky note "BRB"; Sag dashes off with a backpack; Gemini and Leo: "brb… where??"  Sticker "gone. the note says *BRB.*"
//   NOW    Sag shows the friends a map with the route: "back on the 3rd. postcards for all."  Sticker "plans *shared.*"
//   7.9    THE STARS: "Adventures land better with a heads-up."
import { makeHQ, box, R, ink, shadow, glow, bubble, sparkles, INK, BONE, GOLD, PINK, MONO } from '../../nhqe01/scenes/hqkit.js'

const SAG = '#9b7bff'
function backpack(x, cx, cy) { box(x, cx - 50, cy - 60, 100, 120, '#d36a4a', { b: 5 }); R(x, '#b04f34', cx - 40, cy, 80, 40); R(x, INK, cx - 50, cy - 70, 100, 10) }
function map(x, t, cx, cy, u) {
  x.save(); x.translate(cx, cy); x.rotate(-0.03)
  box(x, -260, -170, 520, 340, '#f3e6c4', { b: 7 })
  R(x, 'rgba(120,90,50,0.25)', -90, -170, 4, 340); R(x, 'rgba(120,90,50,0.25)', 86, -170, 4, 340)
  x.fillStyle = '#9fd0e8'; x.beginPath(); x.ellipse(140, 60, 90, 60, 0.3, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#9fd89a'; x.beginPath(); x.ellipse(-140, -40, 80, 70, 0, 0, Math.PI * 2); x.fill()
  const pts = [[-190, 110], [-120, 20], [-20, 60], [60, -40], [170, -110]]
  const n = Math.min(pts.length, 1 + Math.floor(u * 4))
  x.fillStyle = '#c0392b'
  for (let i = 0; i < n - 1; i++) for (let s = 0; s < 6; s++) { const p = s / 6; R(x, '#c0392b', pts[i][0] + (pts[i + 1][0] - pts[i][0]) * p - 4, pts[i][1] + (pts[i + 1][1] - pts[i][1]) * p - 4, 9, 9) }
  ink(x, 'X', 170, -110, { size: 46, col: '#c0392b', font: MONO })
  ink(x, 'back on the 3rd', -60, 140, { size: 26, col: '#2a1f5a', font: MONO })
  x.restore()
}

const EP = makeHQ({
  id: 'nhqe09', hook: '*Sagittarius* trips: | then vs now', accent: SAG, deep: '#5a3fa0',
  thenCap: 'gone. the note says *BRB.*', nowCap: 'plans *shared.*',
  then(x, t, S) {
    box(x, 380, 470, 320, 790, '#6b4a2f', { b: 8 }); R(x, GOLD, 640, 860, 22, 22)
    x.save(); x.translate(540, 640); x.rotate(0.06); box(x, -80, -70, 160, 140, '#ffe27a', { b: 5 }); ink(x, 'BRB', 0, 2, { size: 54, col: INK, font: MONO }); x.restore()
    S.star(x, t, 'gemini', { x: 150, y: 1100, s: 180, mood: 'wide', look: [1, -0.5], seed: 3 })
    S.star(x, t, 'leo', { x: 320, y: 1110, s: 180, mood: 'wide', look: [1, -0.5], seed: 8 })
    // Sag dashing out of frame, backpack bouncing
    const u = S.split ? 0.3 : S.u
    const sx = 700 + u * 520
    if (sx < 1250) { backpack(x, sx - 70, 1150); S.star(x, t, 'sagittarius', { x: sx, y: 1180, s: 170, mood: 'happy', look: [1, 0], squash: 0.06 * Math.sin(t * 20) }) }
    bubble(x, t, 540, 960, S.split ? -1 : 2.9, 5.0, 'brb… where??', { size: 38, tail: 0 })
  },
  now(x, t, S) {
    glow(x, 540, 900, 600, 0.6)
    map(x, t, 540, 680, S.split ? 2 : S.u)
    S.star(x, t, 'gemini', { x: 200, y: 1100, s: 190, mood: 'happy', look: [1, -0.5], seed: 3, hops: [6.0] })
    S.star(x, t, 'leo', { x: 880, y: 1100, s: 190, mood: 'happy', look: [-1, -0.5], seed: 8, hops: [6.1] })
    S.star(x, t, 'sagittarius', { x: 540, y: 1080, s: 230, mood: 'sparkle', look: [0, -1], hops: [5.3, 5.9, 6.5] })
    bubble(x, t, 540, 900, S.split ? -1 : 5.4, 10.6, 'postcards for all!', { size: 36, tail: 0 })
    if (!S.split) sparkles(x, t, 710, 570, 6.0, 10, 120, 0.3, [GOLD, BONE, PINK])
  },
  pisThen: { x: 960, y: 520, s: 100 }, pisNow: { x: 960, y: 1240, s: 110 },
  last: 'Adventures land better with a heads-up.',
  cues: [['whoosh', 2.4, 0.5, 0.035], ['pop', 2.92, 1046.5, 0.04, 0], ['pop', 5.4, 1318.51, 0.04, 0], ['pluck', 6.0, 1760, 0.035, 0.3, 0.4]],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
