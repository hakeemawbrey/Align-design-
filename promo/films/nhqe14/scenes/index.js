// nhqe14: HOLIDAYS THEN VS NOW, "The drive home." (15 s vertical trial reel, promo/films/next30/b48.md, music: funk · D).
// Story 0–10.6, then the shared end card. The format lives in ../../nhqe01/scenes/hqkit.js.
//   THEN   Gemini and Sagittarius in the car, a paper map between them: "LEFT!" "RIGHT!" "LEFT!!"  Sticker "two *directions.* one car."
//   NOW    Gemini drives, Sag holds the snack bag: "you drive, I do snacks."  Sticker "*taking turns.*"
//   7.9    THE STARS: "Take turns. Bring snacks."
import { makeHQ, box, R, ink, shadow, glow, bubble, INK, BONE, GOLD, MONO } from '../../nhqe01/scenes/hqkit.js'

function road(x, t, sp) {
  R(x, '#231c3c', 0, 1150, 1080, 180)
  for (let i = -1; i < 8; i++) R(x, 'rgba(239,230,214,0.5)', ((i * 180 - t * sp) % 1260 + 1260) % 1260 - 180, 1240, 100, 10)
  for (let i = 0; i < 6; i++) { const px = ((i * 240 - t * sp * 0.4) % 1440 + 1440) % 1440 - 180; x.fillStyle = '#2c4a3a'; x.beginPath(); x.moveTo(px, 1150); x.lineTo(px + 60, 980); x.lineTo(px + 120, 1150); x.closePath(); x.fill(); R(x, '#e9e6f6', px + 40, 1010, 40, 10) }
}
function carBody(x, t, front) {
  const bob = 4 * Math.sin(t * 9)
  x.save(); x.translate(0, bob)
  if (!front) {
    // the cabin: glass where the two sit
    box(x, 210, 760, 640, 220, '#3a5aa8', { b: 8 }); R(x, '#bfe8ff', 240, 790, 270, 170); R(x, '#bfe8ff', 550, 790, 270, 170)
  } else {
    box(x, 110, 960, 860, 170, '#3a5aa8', { b: 8, hi: 'rgba(255,255,255,0.2)' })
    R(x, '#fff1a8', 930, 1000, 30, 30); R(x, '#e8344e', 120, 1000, 26, 30)
    for (const wx of [270, 810]) { x.fillStyle = INK; x.beginPath(); x.arc(wx, 1140, 70, 0, Math.PI * 2); x.fill(); x.fillStyle = '#5a5470'; x.beginPath(); x.arc(wx, 1140, 34, 0, Math.PI * 2); x.fill() }
  }
  x.restore()
}

const EP = makeHQ({
  id: 'nhqe14', hook: 'The drive *home:* | then vs now', accent: '#9ad8ff', deep: '#2a5aa8',
  thenCap: 'two *directions.* one car.', nowCap: '*taking turns.*',
  then(x, t, S) {
    road(x, t, 500)
    carBody(x, t, false)
    S.star(x, t, 'sagittarius', { x: 380, y: 870, s: 180, mood: 'wide', look: [1, 0], seed: 9 })
    S.star(x, t, 'gemini', { x: 690, y: 870, s: 180, mood: 'squint', look: [-1, 0], seed: 3 })
    // the map, flapping between them
    x.save(); x.translate(540, 880); x.rotate(0.1 * Math.sin(t * 7)); box(x, -110, -70, 220, 140, '#f3e6c4', { b: 5 }); R(x, '#c0392b', -80, -10, 160, 6); R(x, '#3f7fd8', -20, -60, 6, 120); x.restore()
    carBody(x, t, true)
    if (S.split) { bubble(x, t, 300, 690, -1, 9, 'LEFT!', { size: 40 }); bubble(x, t, 780, 690, -1, 9, 'RIGHT!', { size: 40 }) }
    else [[2.5, 300, 'LEFT!'], [2.95, 780, 'RIGHT!'], [3.4, 300, 'LEFT!!'], [3.85, 780, 'RIGHT!!']].forEach(([a, bx, s], i) => bubble(x, t, bx, 650 + (i % 2) * 20, a, a + 0.9, s, { size: 42 }))
  },
  now(x, t, S) {
    road(x, t, 380)
    glow(x, 540, 880, 500, 0.4)
    carBody(x, t, false)
    S.star(x, t, 'gemini', { x: 380, y: 870, s: 180, mood: 'happy', look: [-1, 0], seed: 3, hops: [6.2] })
    S.star(x, t, 'sagittarius', { x: 690, y: 870, s: 180, mood: 'happy', look: [-1, 0], seed: 9, hops: [5.6, 6.6] })
    // the snack bag
    x.save(); x.translate(800, 930); x.rotate(-0.15); box(x, -50, -70, 100, 130, '#ffb347', { b: 5 }); ink(x, 'SNACKS', 0, -10, { size: 18, col: INK, font: MONO }); x.restore()
    carBody(x, t, true)
    bubble(x, t, 640, 680, S.split ? -1 : 5.5, 10.6, 'you drive, I do snacks.', { size: 36, tail: 0.3 })
  },
  pisThen: { x: 960, y: 560, s: 100 }, pisNow: { x: 960, y: 560, s: 110 },
  last: 'Take turns. Bring snacks.',
  cues: [['pop', 2.5, 1174.66, 0.04, -0.4], ['pop', 2.95, 1318.51, 0.04, 0.4], ['pop', 3.4, 1174.66, 0.045, -0.4], ['pop', 3.85, 1318.51, 0.045, 0.4], ['pop', 5.52, 1567.98, 0.04, 0.2]],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [shadow, BONE, GOLD]
