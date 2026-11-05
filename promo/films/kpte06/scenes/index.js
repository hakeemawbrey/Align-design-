// kpte06: THE 10-SECOND PEP TALK, Ep 6 "Leo, you shine with no applause" (17.2 s vertical, batch m14, pop · G).
// Format kit: ../../kpte01/pepkit.js. Rows: promo/films/month2/m14.md.
//   0.0–3.0    frame 0: ♍ Virgo mid-lunge, a spotlight mid-swing back onto a dim Leo · "Leo. Chin up. | *Right now.*"
//              whip zoom at 0.42 · chip "feeling invisible | *to your crush*".
//   3.0–5.4    the spiral: Leo shows off a new haircut ("new cut!!"), the crush walks past on their phone: "oh. hey."
//   5.4–15.4   "you don't have to *perform* to matter." (a NO SHOW NEEDED sign) · "the right person notices *quiet you*
//              too." (a little star in the back with heart eyes) · "notice *yourself* first." (a mirror winks back).
//   15.4–17.2  "You glow | *without* the clapping."  Hard cut.
import { makePep, room, note, label, R, box, INK, BONE, RED, PEP, GOLD, MINT, prog, ease, lerp, pop01, outK, glow, hearts } from '../../kpte01/pepkit.js'

function stage(x, t) {
  room(x, t, { wall: '#2e1f4a', wall2: '#291b44', floor: '#3a2646', win: null, floorY: 1330 })
  // curtains
  for (const d of [-1, 1]) { const cx = d < 0 ? 0 : 1080 - 150; box(x, cx, 380, 150, 950, '#8a2a4a', { b: 6 }); for (let i = 0; i < 4; i++) R(x, '#6e2040', cx + 20 + i * 34, 390, 10, 930) }
}
function spot(x, cx, cy, a, rot = 0) {
  x.save(); x.globalCompositeOperation = 'lighter'; x.translate(cx, 380); x.rotate(rot)
  const g = x.createLinearGradient(0, 0, 0, cy - 380); g.addColorStop(0, `rgba(255,240,200,${0.05 * a})`); g.addColorStop(1, `rgba(255,240,200,${0.28 * a})`)
  x.fillStyle = g; x.beginPath(); x.moveTo(-40, 0); x.lineTo(40, 0); x.lineTo(190, cy - 380); x.lineTo(-190, cy - 380); x.closePath(); x.fill(); x.restore()
}
function hook(x, t, S) {
  stage(x, t)
  const sw = 0.5 * Math.cos(t * 2.4)
  spot(x, 760, 1000, 1, sw)
  S.L(x, t, { x: 780, y: 900, s: 230, mood: 'neutral', look: [0, 1], squash: 0.12, glow: 0.4 })
}
function spiral(x, t, S) {
  stage(x, t)
  spot(x, 300, 1250, 0.8)
  const pass = ease.inOutCubic(prog(t, 3.3, 5.2))
  S.L(x, t, { x: 300, y: 1150, s: 230, mood: t < 4.5 ? 'sparkle' : 'neutral', look: [1, 0], hops: [3.2, 3.5], squash: t > 4.6 ? 0.1 : 0 })
  // the tiny quiff
  if (true) { R(x, INK, 290, 990, 40, 34); R(x, '#ffb86b', 294, 994, 32, 26) }
  S.star(x, t, 'libra', { x: lerp(1150, 650, pass), y: 1160, s: 200, mood: 'neutral', look: [0, 1], seed: 9 })
  if (t > 3.9 && pass < 1) { R(x, INK, lerp(1150, 650, pass) - 70, 1060, 50, 80); R(x, '#7fd0ff', lerp(1150, 650, pass) - 66, 1064, 42, 72) }
}
function pep(x, t, S) {
  const [w0, w1, w2] = S.T.lines
  if (t < w1) note(x, 560, 640, 'NO SHOW | NEEDED', { w: 360, h: 150, col: GOLD, size: 42, rot: -0.05, k: pop01(t, w0 + 0.5, 0.3, 2.4) * outK(t, [w1 - 0.25, w1]) })
  if (t > w1 + 0.4 && t < w2) {
    const k = pop01(t, w1 + 0.4, 0.3, 2.4) * outK(t, [w2 - 0.25, w2])
    S.star(x, t, 'libra', { x: 560, y: 680, s: 150 * k, mood: 'heart', look: [1, 1], seed: 9 })
    hearts(x, t, w1 + 0.7, 560, 600, { n: 5 })
    label(x, 'someone noticed', 560, 790, { size: 28, col: PINK(), alpha: k })
  }
  if (t > w2 + 0.4) {
    const k = pop01(t, w2 + 0.4, 0.3, 2.4)
    x.save(); x.translate(560, 680); x.scale(k, k)
    box(x, -110, -150, 220, 300, '#9fd8f6', { b: 8 }); R(x, '#d9f1fd', -96, -136, 192, 272)
    x.restore()
    if (k > 0.5) S.L(x, t, { x: 560, y: 690, s: 160, mood: t > w2 + 1.2 ? 'wink' : 'sparkle', look: [0, 0], glyph: false })
  }
}
const PINK = () => '#ff8fb1'
function lastSet(x, t) { x.save(); x.globalCompositeOperation = 'lighter'; glow(x, 540, 1000, 360, 0.25, '255,200,120'); x.restore() }
const EP = makePep({
  id: 'kpte06', sign: 'leo', coach: 'virgo', end: 'cut', brk: 'whip',
  hookLine: 'Leo. Chin up. | *Right now.*',
  premise: 'feeling invisible | *to your crush*',
  lines: ['you don’t have to *perform* to matter.', 'the right person notices *quiet you* too.', 'notice *yourself* first.'],
  last: 'You glow | *without* the clapping.', lastLate: 3,
  hook, spiral, pep, lastSet,
  pepSet: (x, t) => stage(x, t),
  bubbles: [{ t0: 3.25, t1: 5.3, x: 330, y: 930, text: 'new cut!!', size: 40, tail: -0.2 }, { t0: 4.2, t1: 5.3, x: 760, y: 960, text: 'oh. hey.', size: 36, tail: 0.3, col: '#cfeaff' }],
  cues: [['pluck', 4.6, 294, 0.035, 0.6, 0], ['pop', 6.3, 1318.51, 0.04, 0], ['pop', 9.35, 1567.98, 0.04, 0], ['pop', 12.6, 1174.66, 0.04, 0], ['pop', 13.4, 1760, 0.03, 0]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [RED, PEP, MINT]
