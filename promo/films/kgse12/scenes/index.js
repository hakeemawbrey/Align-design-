// kgse12: GUESS THE SIGN, "Cried at strangers getting engaged" (8 s vertical, star_advice trial, dreamy · Ab, loop).
//   0.00  frame 0: the silhouette mid-sob, a waterfall of tears, a phone showing a stranger kneeling with a ring.
//         Hook: "Cried at strangers *getting engaged. Again.*"
//   0.35  whip zoom · the tissue tower grows · the contestant buzzes "IT'S ME?!" and cries harder
//   C1 "a tissue tower" · C2 "a heart on its sleeve" · 3·2·1 · reveal: PISCES · last line · loop
import { makeGuess, box, R, phone, bubble, shadow, hearts, tears, drawBits, HEART, pop01, outK, prog, ease, lerp, clamp, INK, BONE, GOLD, PINK, CYAN, INTER, MONO } from '../../kgse01/scenes/guesskit.js'

function video(u) {
  return (x, w, h) => {
    R(x, '#2a2250', 0, 0, w, h); R(x, '#3a5a3a', 0, h * 0.62, w, h * 0.38)
    // two little figures: one kneeling with a ring
    const kx = w * 0.38, sx = w * 0.66
    R(x, INK, sx - 14, h * 0.32, 28, 90); R(x, '#ff8fb1', sx - 10, h * 0.34, 20, 84); x.fillStyle = '#f0c8a0'; x.beginPath(); x.arc(sx, h * 0.28, 16, 0, Math.PI * 2); x.fill()
    R(x, INK, kx - 14, h * 0.45, 28, 56); R(x, '#7fd0ff', kx - 10, h * 0.47, 20, 52); x.fillStyle = '#f0c8a0'; x.beginPath(); x.arc(kx, h * 0.41, 16, 0, Math.PI * 2); x.fill()
    R(x, GOLD, kx + 18, h * 0.47, 14, 14); R(x, '#ffffff', kx + 21, h * 0.46, 6, 6)
    x.font = `700 15px ${MONO}`; x.fillStyle = BONE; x.textAlign = 'left'; x.fillText('▶ a stranger, a park', 10, 22)
    if (u > 1.2) { x.font = `900 30px ${INTER}`; x.fillStyle = PINK; x.textAlign = 'center'; x.fillText('SHE SAID YES', w / 2, h * 0.9) }
  }
}
function tissueTower(x, n) {
  for (let i = 0; i < n; i++) {
    const y = 1230 - i * 54, cx = 190 + 6 * Math.sin(i * 1.7)
    box(x, cx - 70, y - 40, 140, 44, '#9fd8f6', { b: 4, hi: '#c9ecfb' }); R(x, '#ffffff', cx - 14, y - 62, 28, 24)
  }
}

export const EP = makeGuess({
  id: 'kgse12', sign: 'pisces', D: 8, ending: 'loop', brk: 'whip',
  hook: 'Cried at strangers | *getting engaged. Again.*',
  clues: ['a tissue tower', 'a heart on its sleeve'],
  last: 'A big heart | *is not a flaw.*',
  draw(x, S) {
    const { t, u, rv, T } = S
    tissueTower(x, Math.min(8, 2 + Math.floor(u * 1.3)))
    const o = { x: 520, y: 1010, s: 360, mood: rv > 0.5 ? 'sparkle' : 'wide', look: [1, -0.2], hops: [0.6, 1.5, 2.4, 3.3].filter(h => h < S.R), rot: -0.08 + 0.04 * Math.sin(u * 9), squash: 0.06 * Math.sin(u * 8) }
    shadow(x, 520, 1240, 290)
    S.sil(o)
    tears(x, t, o, 3)
    phone(x, 830, 860, { w: 240, h: 380, rot: 0.1, fn: video(u) })
    if (t > T.C1) hearts(x, t, T.C1, 820, 700, { n: 5 })
    if (T.C2 != null && t > T.C2) drawBits(x, HEART, { H: '#ff5c8a' }, o.x - 140, o.y + 70, 9 * pop01(t, T.C2 + 0.05, 0.3, 2.6))
    if (rv > 0.5) bubble(x, t, 480, 700, S.R + 0.3, S.D + 1, 'they looked SO happy.', { size: 32 })
  },
  cues: [['pluck', 0.05, 1318.51, 0.035, 0.3, 0.4], ['pluck', 1.2, 1567.98, 0.04, 0.3, 0.4], ['glitter', 1.2, 1.6], ...[0.6, 1.5, 2.4, 3.3].map(h => ['pop', h, 523.25, 0.03, -0.3])],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
