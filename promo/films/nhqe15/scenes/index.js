// nhqe15: HOLIDAYS THEN VS NOW, "Meeting the friends." (13 s vertical trial reel, promo/films/next30/b48.md,
// music: house · Bb). Story 0–10.6, then the shared end card. The format lives in ../../nhqe01/scenes/hqkit.js.
//   THEN   Libra peeks out from behind a coat rack; Aries blocks the view. Friends: "who’s that?"  Aries: "nobody!"  Sticker "“*nobody!*”"
//   NOW    Aries brings Libra forward with a flourish; Taurus and Virgo cheer and shuffle over: "come sit!"  Sticker "“this is *Libra.*”"
//   7.9    THE STARS: "Bring them. Your people want to know."
import { makeHQ, box, R, shadow, glow, bubble, sparkles, confetti, INK, BONE, GOLD, PINK } from '../../nhqe01/scenes/hqkit.js'

function coatRack(x, t, cx) {
  R(x, INK, cx - 10, 560, 20, 700); R(x, '#8a5a3a', cx - 6, 564, 12, 692); box(x, cx - 90, 1240, 180, 20, '#8a5a3a', { b: 5 })
  const coats = [['#3f7fd8', -70], ['#c0392b', 0], ['#5fbf6a', 70]]
  coats.forEach(([c, dx], i) => { x.save(); x.translate(cx + dx, 600); x.rotate(0.04 * Math.sin(t * 2 + i)); box(x, -70, 0, 140, 420, c, { b: 6 }); R(x, 'rgba(0,0,0,0.18)', -6, 0, 12, 420); x.restore() })
}
function couch(x) { box(x, 60, 1100, 560, 100, '#5b4a8a', { b: 7, hi: '#6e5ca0' }); box(x, 60, 1000, 560, 110, '#4b3c78', { b: 7 }) }

const EP = makeHQ({
  id: 'nhqe15', hook: 'Meeting the *friends:* | then vs now', accent: '#ff9a7a', deep: '#c0392b',
  thenCap: '“*nobody!*”', nowCap: '“this is *Libra.*”',
  then(x, t, S) {
    couch(x)
    S.star(x, t, 'taurus', { x: 200, y: 960, s: 170, mood: 'wide', look: [1, 0], seed: 5 })
    S.star(x, t, 'virgo', { x: 440, y: 960, s: 170, mood: 'wide', look: [1, 0], seed: 7 })
    // Libra peeks out from behind the coats
    S.star(x, t, 'libra', { x: 1010, y: 760, s: 150, mood: 'neutral', look: [-1, 0], seed: 9 })
    coatRack(x, t, 860)
    S.star(x, t, 'aries', { x: 700, y: 1080, s: 220, mood: 'wide', look: [-1, 0], hops: [3.4] })
    bubble(x, t, 320, 780, S.split ? 99 : 2.5, 5.0, 'who’s that?', { size: 36, tail: 0 })
    bubble(x, t, 680, 860, S.split ? -1 : 3.3, 5.0, 'nobody!', { size: 42, tail: 0 })
  },
  now(x, t, S) {
    glow(x, 540, 1000, 620, 0.7)
    couch(x)
    S.star(x, t, 'taurus', { x: 170, y: 960, s: 170, mood: 'happy', look: [1, 0], seed: 5, hops: [5.8, 6.4] })
    S.star(x, t, 'virgo', { x: 360, y: 960, s: 170, mood: 'happy', look: [1, 0], seed: 7, hops: [5.9, 6.5] })
    S.star(x, t, 'aries', { x: 860, y: 1080, s: 210, mood: 'happy', look: [-1, 0], hops: [5.3] })
    S.star(x, t, 'libra', { x: 640, y: 1070, s: 210, mood: 'sparkle', look: [-1, 0], seed: 9, hops: [5.5, 6.6], blush: 1 })
    if (!S.split) { sparkles(x, t, 640, 1000, 5.4, 12, 220, 0.2, [GOLD, BONE, PINK]); confetti(x, t, 5.85, 270, 880) }
    bubble(x, t, 820, 800, S.split ? -1 : 5.3, 6.3, 'this is Libra!', { size: 38, tail: 0.3 })
    bubble(x, t, 270, 780, S.split ? 99 : 6.2, 10.6, 'come sit!', { size: 40, tail: 0, col: '#d9f2c4' })
  },
  pisThen: { x: 560, y: 560, s: 100 }, pisNow: { x: 960, y: 560, s: 110 },
  last: 'Bring them. Your people want to know.',
  cues: [['pop', 2.52, 1046.5, 0.035, -0.3], ['pop', 3.32, 1567.98, 0.045, 0.3], ['pop', 5.32, 1318.51, 0.04, 0.3], ['glitter', 5.4, 5.9], ['clap', 5.9, { gain: 0.12 }], ['clap', 6.15, { gain: 0.12 }], ['pop', 6.22, 1174.66, 0.04, -0.3]],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void shadow
