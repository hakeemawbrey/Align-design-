// kpte12: THE 10-SECOND PEP TALK, Ep 12 "Pisces, keep some for you" (17.6 s vertical, batch m14, dreamy · Ab).
// Format kit: ../../kpte01/pepkit.js. Rows: promo/films/month2/m14.md. Pisces is the listener (and cries throughout).
//   0.0–3.0    frame 0: ♒ Aquarius mid-lunge for the tissue box, tissues flying everywhere, Pisces behind mid-sob ·
//              "Pisces. Hand over | the *tissues.*" · record scratch + freeze at 0.42 · chip "giving everyone | *everything*".
//   3.0–5.4    the spiral: GAVE AWAY: my coat · my whole Saturday · the last cookie. Pisces, shivering, still smiling.
//   5.4–15.4   "your big heart isn't the *problem.*" (a big heart) · "but your heart lives in *you* too." (an arrow: YOU
//              LIVE HERE TOO) · "keep one piece for *yourself.*" (the cookie, one piece kept).
//   15.4–17.6  "Feel everything. | *Keep* some for you."  Loop.
import { makePep, room, note, label, flyTissue, tissues, R, box, INK, BONE, RED, PEP, GOLD, MINT, prog, ease, lerp, pop01, outK, drawBits, HEART } from '../../kpte01/pepkit.js'

function den(x, t) { room(x, t, { wall: '#2a2456', wall2: '#251f50', floor: '#33294c', win: { x: 120, y: 500, w: 240, h: 280 }, floorY: 1330 }) }
function cookie(x, cx, cy, s, bite = 0) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 66, 0, 7); x.fill(); x.fillStyle = '#d9a35c'; x.beginPath(); x.arc(0, 0, 58, 0, 7); x.fill()
  for (const [a, b] of [[-20, -18], [18, -6], [-6, 22], [26, 26], [-30, 12]]) R(x, '#5a3a22', a - 6, b - 6, 12, 12)
  if (bite > 0) { x.fillStyle = '#251f50'; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, 80, -0.9, -0.9 + bite * 5.6); x.closePath(); x.fill() }
  x.restore()
}
function hook(x, t, S) {
  den(x, t)
  tissues(x, 640, 860, 150)
  S.L(x, t, { x: 820, y: 860, s: 230, mood: 'wide', look: [-1, 0], tears: 3, blink: false })
  for (let i = 0; i < 8; i++) { const p = ((t * 0.5 + i * 0.13) % 1); flyTissue(x, 500 + i * 70 + 40 * Math.sin(t * 2 + i), 760 - p * 300 + 40 * Math.sin(i * 1.7), t * 3 + i, 1) }
}
function spiral(x, t, S) {
  den(x, t)
  ;['gave away: my coat', 'gave away: my whole Saturday', 'gave away: the last cookie'].forEach((s, i) => note(x, 600, 680 + i * 120, s, { w: 560, h: 84, col: ['#ffe27a', '#ffd0e4', '#cfe6ff'][i], size: 34, rot: [-0.03, 0.02, -0.02][i], k: pop01(t, 3.1 + i * 0.6, 0.25, 2.4) }))
  S.L(x, t, { x: 200, y: 1240, s: 210, mood: 'happy', look: [1, -0.5], tears: 2, squash: 0.03 * Math.sin(t * 40) })
  label(x, '*shivering, smiling*', 200, 1380, { size: 24, col: '#bcd6ff' })
}
function pep(x, t, S) {
  const [w0, w1, w2] = S.T.lines
  if (t > w0 + 0.4 && t < w1) {
    const k = pop01(t, w0 + 0.4, 0.3, 2.4) * outK(t, [w1 - 0.25, w1]), b = 1 + 0.08 * Math.sin(t * 8)
    drawBits(x, HEART, { H: '#ff5c8a' }, 560, 660, 26 * k * b)
    label(x, 'not the problem', 560, 830, { size: 30, col: '#ff8fb1', alpha: k })
  }
  if (t > w1 + 0.4 && t < w2) {
    const k = pop01(t, w1 + 0.4, 0.3, 2.4) * outK(t, [w2 - 0.25, w2])
    note(x, 560, 660, 'YOU LIVE | HERE TOO ↓', { w: 380, h: 150, col: MINT, size: 40, k, rot: 0.04 })
  }
  if (t > w2 + 0.4) {
    const k = pop01(t, w2 + 0.4, 0.3, 2.4), sp = ease.outCubic(prog(t, w2 + 1.2, w2 + 1.7))
    cookie(x, 520 - sp * 60, 680, k, 0.18)
    if (sp > 0) { x.save(); x.translate(640 + sp * 60, 700); x.scale(0.5 * k, 0.5 * k); cookie(x, 0, 0, 1); x.restore(); label(x, 'for you', 680, 790, { size: 28, col: GOLD, alpha: sp }) }
  }
}
const EP = makePep({
  id: 'kpte12', sign: 'pisces', coach: 'aquarius', end: 'loop', brk: 'scratch', scratchCap: 'cried at a *commercial.* twice.',
  hookLine: 'Pisces. Hand over | the *tissues.*',
  premise: 'giving everyone | *everything*',
  lines: ['your big heart isn’t the *problem.*', 'but your heart lives in *you* too.', 'keep one piece for *yourself.*'],
  last: 'Feel everything. | *Keep* some for you.', lastLate: 3,
  hook, spiral, pep,
  pepSet: (x, t) => den(x, t),
  cues: [['pop', 3.1, 659.25, 0.035, 0], ['pop', 3.7, 739.99, 0.035, 0], ['pop', 4.3, 880, 0.035, 0], ['pluck', 6.3, 1318.51, 0.035, 0.6, 0], ['pop', 9.35, 1174.66, 0.04, 0], ['pop', 13.75, 1567.98, 0.04, 0.3]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [RED, PEP, BONE, R, box, lerp]
