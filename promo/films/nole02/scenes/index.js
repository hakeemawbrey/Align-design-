// nole02: ONE-LINE ADVICE FOR YOUR SIGN, "Taurus, when they pick a new restaurant." (12 s vertical, star_advice trial,
// music: lofi · F). Story 0–7.6, then the shared end card. Format: ../../nole01/scenes/olkit.js.
//   0.0–3.6   "*Taurus*, when they pick | a *new* restaurant."  Taurus at a café table clutching a menu of "???" dishes;
//             a thought cloud of its usual bowl. At 1.7 the cloud drifts off; Taurus goes wide-eyed.
//   3.6       card flip.   3.6–7.6  THE STARS: "Your usual will | *still* be there."  The usual bowl waves back from a
//             little cloud: "see you friday ♡".  Pisces cries into a tissue.
import { makeOneLine, miniPhone, cloud, table, bubble, box, R, label, shadow, sparkles, hearts, snow, drawBits, HEART, starFrame, inSprite, tearsCells, shadesCells, scarfCells, tissues, prog, clamp, lerp, ease, pop01, outK, INK, BONE, GOLD, RED, PINK, LAV, SKYB, MINT, INTER, MONO, SERIF, r3 } from '../../nole01/scenes/olkit.js'
const BOWL = ['..SSS...', '.S...S..', 'NNNNNNNN', 'BBBBBBBB', '.BBBBBB.', '..BBBB..']
const BOWLC = { S: '#ffffff', N: '#f2c75c', B: '#e8344e' }
function menu(x, t, cx, cy, rot) {
  x.save(); x.translate(cx, cy); x.rotate(rot)
  x.scale(0.8, 0.8); box(x, -150, -200, 300, 400, BONE, { b: 7 }); R(x, '#3a2d66', -150, -200, 300, 60)
  x.textAlign = 'center'; x.textBaseline = 'middle'
  x.font = `700 30px ${MONO}`; x.fillStyle = GOLD; x.fillText('MENU', 0, -170)
  x.font = `700 24px ${INTER}`; x.fillStyle = INK
  ;['foam of ???', 'deconstructed ???', 'chef’s ???', 'mystery ??? bites'].forEach((s, i) => x.fillText(s, 0, -100 + i * 62))
  x.restore()
}
function sit(x, t, S) {
  const { hero, date } = S
  table(x, 540, 1330, 700)
  shadow(x, 800, 1290, 180)
  date(x, t, { x: 800, y: 1150, s: 200, mood: 'sparkle', look: [-1, 0], hops: [0.9, 2.4] })
  bubble(x, t, 800, 960, 0.85, 3.5, 'it’s *so* new!!'.replace(/\*/g, ''), { size: 30, tail: -0.3 })
  const mood = t < 1.7 ? 'neutral' : 'wide'
  hero(x, t, { x: 330, y: 1060, s: 270, mood, look: t < 1.7 ? [0.6, -0.9] : [1, -1], hops: [-0.1, 1.75] })
  menu(x, t, 360, 1300, -0.08 + 0.03 * Math.sin(t * 9) * (t > 1.7 ? 1 : 0.2))
  // the usual bowl, in a thought cloud that drifts away
  const d = ease.inCubic(prog(t, 1.7, 3.3))
  const cx = 330 + d * 500, cy = 700 - d * 220, k = 1 - 0.5 * d
  cloud(x, cx, cy, 300, 170, k, { fx: 330, fy: 880 })
  drawBits(x, BOWL, BOWLC, cx, cy - 6, 14 * k)
  label(x, 'my usual', cx, cy + 62 * k, { size: 22 * k, col: INK, alpha: k })
  if (t > 1.8) label(x, 'bye…', cx + 160, cy - 80, { size: 30, col: BONE, alpha: clamp((t - 1.8) * 3) * (1 - d * 0.6) })
}
function after(x, t, S) {
  const { hero, ok, T } = S
  const hk = pop01(t, T.heroIn, 0.38, 2.1) * ok
  shadow(x, 640, 1340, 220 * hk)
  hero(x, t, { x: 640, y: 1180, s: 250, pop: hk, mood: t > T.react ? 'happy' : 'wide', look: [0.6, -1], hops: [T.heroIn + 0.3, T.react, T.react + 0.45] })
  const ck = pop01(t, T.react - 0.1, 0.35, 2.2) * ok
  if (ck > 0.01) {
    const bob = 8 * Math.sin(t * 3)
    cloud(x, 820, 900 + bob, 260, 150, ck, { fx: 680, fy: 1030 })
    drawBits(x, BOWL, BOWLC, 820 + 6 * Math.sin(t * 6), 896 + bob, 12 * ck, { rot: 0.12 * Math.sin(t * 6) })
    bubble(x, t, 820, 790, T.react + 0.25, T.out[1], 'see you friday ♡', { size: 28, col: '#fff1c8' })
  }
}
const EP = makeOneLine({
  id: 'nole02', sign: 'taurus', name: 'Taurus', len: 12,
  hook: '*Taurus*, when they pick | a *new* restaurant.',
  line: 'Your usual will | *still* be there.',
  sit, after,
  cues: [['pop', 0.85, 1174.66, 0.035, 0.3], ['whoosh', 1.7, 0.6, 0.03], ['pluck', 1.85, 659.25, 0.03, 0.5, -0.3], ['pop', 6.4, 1318.51, 0.035, 0.3]],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const CUT = EP.T.cut
