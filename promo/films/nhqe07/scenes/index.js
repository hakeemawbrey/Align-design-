// nhqe07: HOLIDAYS THEN VS NOW, "Libra's holiday plans." (13 s vertical trial reel, promo/films/next30/b48.md,
// music: jazzy · Eb). Story 0–10.6, then the shared end card. The format lives in ../../nhqe01/scenes/hqkit.js.
//   THEN   "where should we go?"  Libra shrugs: "whatever you want!" ×3, the friends stare. Sticker "“whatever *you* want!”"
//   NOW    Libra holds up a picture of a snowy cabin: "I’d love the cabin."  The friends: "YES." Sticker "said what *I* want."
//   7.9    THE STARS: "Your preference counts too."
import { makeHQ, box, R, ink, shadow, glow, bubble, sparkles, pop01, INK, BONE, GOLD, PINK, SERIF } from '../../nhqe01/scenes/hqkit.js'

function cabin(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(-0.04)
  box(x, -170, -130, 340, 260, '#1d2a52', { b: 8 })
  R(x, '#e9e6f6', -170, 70, 340, 60)
  box(x, -70, -10, 140, 90, '#8a5a3a', { b: 5 })
  x.fillStyle = INK; x.beginPath(); x.moveTo(-96, -6); x.lineTo(0, -80); x.lineTo(96, -6); x.closePath(); x.fill()
  x.fillStyle = '#f4f1ff'; x.beginPath(); x.moveTo(-84, -12); x.lineTo(0, -70); x.lineTo(84, -12); x.closePath(); x.fill()
  R(x, '#ffd98a', -40, 16, 30, 26); R(x, '#ffd98a', 14, 16, 30, 26)
  for (let i = 0; i < 3; i++) { x.fillStyle = '#3b8a48'; x.beginPath(); x.moveTo(-150 + i * 20, 60); x.lineTo(-130 + i * 20, -10 - i * 6); x.lineTo(-110 + i * 20, 60); x.closePath(); x.fill() }
  x.restore()
}

const EP = makeHQ({
  id: 'nhqe07', hook: '*Libra* holiday plans: | then vs now', accent: '#ffb3d9', deep: '#b0306a',
  thenCap: '“whatever *you* want!”', nowCap: 'said what *I* want.',
  then(x, t, S) {
    shadow(x, 540, 1290, 700)
    S.star(x, t, 'aries', { x: 200, y: 1100, s: 200, mood: 'neutral', look: [1, 0], seed: 3 })
    S.star(x, t, 'taurus', { x: 880, y: 1100, s: 200, mood: S.u > 2 ? 'eyeroll' : 'neutral', look: [-1, 0], seed: 5 })
    const shrug = Math.abs(Math.sin(t * 5))
    S.star(x, t, 'libra', { x: 540, y: 1060 - shrug * 14, s: 240, mood: 'happy', look: [0, 0], squash: -0.05 * shrug })
    bubble(x, t, 540, 560, -1, 5.0, 'where should we go?', { size: 34, col: '#d9e8ff', tail: -0.6 })
    if (S.split) bubble(x, t, 540, 820, -1, 9, 'whatever you want!', { size: 36 })
    else [2.5, 3.2, 3.9].forEach((a, i) => bubble(x, t, 540 + [-120, 110, 0][i], 700 + i * 90, a, 5.0, 'whatever you want!', { size: 34, tail: 0 }))
  },
  now(x, t, S) {
    glow(x, 540, 900, 600, 0.6)
    const k = S.split ? 1 : pop01(t, 5.3, 0.35, 2.4)
    cabin(x, t, 540, 640, k)
    shadow(x, 540, 1290, 700)
    const yes = S.split || t > 6.2
    S.star(x, t, 'aries', { x: 200, y: 1100, s: 200, mood: yes ? 'happy' : 'wide', look: [1, -0.4], seed: 3, hops: [6.2, 6.6] })
    S.star(x, t, 'taurus', { x: 880, y: 1100, s: 200, mood: yes ? 'happy' : 'wide', look: [-1, -0.4], seed: 5, hops: [6.25, 6.7] })
    S.star(x, t, 'libra', { x: 540, y: 1060, s: 240, mood: 'sparkle', look: [0, -1], hops: [5.3, 5.6] })
    bubble(x, t, 540, 870, S.split ? -1 : 5.5, 6.9, 'I’d love the cabin.', { size: 38, tail: 0 })
    bubble(x, t, 210, 870, S.split ? 99 : 6.2, 10.6, 'YES.', { size: 42, tail: 0, col: '#d9f2c4' })
    bubble(x, t, 870, 870, S.split ? 99 : 6.3, 10.6, 'YES.', { size: 42, tail: 0, col: '#d9f2c4' })
    if (!S.split) sparkles(x, t, 540, 640, 5.35, 12, 260, 0.2, [GOLD, BONE, PINK])
  },
  pisThen: { x: 960, y: 640, s: 110 }, pisNow: { x: 960, y: 450, s: 110 },
  last: 'Your preference counts too.',
  cues: [['pop', 2.5, 1174.66, 0.035, -0.3], ['pop', 3.2, 1174.66, 0.035, 0.3], ['pop', 3.9, 1174.66, 0.035, 0], ['pop', 5.3, 1318.51, 0.045, 0], ['pop', 6.2, 1567.98, 0.04, -0.4], ['pop', 6.3, 1760, 0.04, 0.4]],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void SERIF
