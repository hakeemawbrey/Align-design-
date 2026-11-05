// kpte03: THE 10-SECOND PEP TALK, Ep 3 "Aries, you shot your shot" (17.2 s vertical, Month 2 batch m14, funk · E).
// Format kit: ../../kpte01/pepkit.js. Rows: promo/films/month2/m14.md.
//   0.0–3.0    frame 0: ♉ Taurus mid-lunge, Aries behind mid-tumble off a park bench · "Aries. | Breathe. Then *listen.*"
//              screen shake at 0.42 · chip "they said ‘I don’t see | it *going anywhere*’".
//   3.0–5.4    the spiral: the text arrives; Aries crumbles into a puddle-flat star.
//   5.4–15.4   "a no is *information*, not a verdict on you." (an INFO card) · "you were brave. brave is the *win.*"
//              (a medal) · "the right yes is still *out there.*" (a little YES flag on the horizon).
//   15.4–17.2  "You asked. | That’s the *flex.*"  Hard cut. Pisces happy-cries with a 10/10 sign.
import { makePep, phone, note, label, R, box, INK, BONE, RED, PEP, GOLD, MINT, prog, ease, lerp, pop01, outK, drawBits } from '../../kpte01/pepkit.js'

function park(x, t) {
  R(x, '#231c44', 0, 1180, 1080, 740); R(x, INK, 0, 1174, 1080, 8); R(x, '#2c2552', 0, 1240, 1080, 20)
  for (const tx of [130, 950]) { R(x, INK, tx - 16, 760, 32, 420); R(x, '#5a4232', tx - 10, 766, 20, 410); x.fillStyle = INK; x.beginPath(); x.arc(tx, 700, 150, 0, Math.PI * 2); x.fill(); x.fillStyle = '#2f7a5a'; x.beginPath(); x.arc(tx, 700, 140, 0, Math.PI * 2); x.fill() }
  // lamp
  R(x, INK, 790, 640, 14, 540); box(x, 772, 600, 50, 44, '#ffe7a6', { b: 6 })
  x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(797, 620, 0, 797, 620, 260); g.addColorStop(0, 'rgba(255,214,150,0.25)'); g.addColorStop(1, 'rgba(255,214,150,0)'); x.fillStyle = g; x.fillRect(537, 360, 520, 520); x.restore()
}
function bench(x, cx, y) { box(x, cx - 200, y, 400, 26, '#8a6440', { b: 6 }); box(x, cx - 200, y - 90, 400, 22, '#8a6440', { b: 6 }); R(x, INK, cx - 180, y + 30, 18, 90); R(x, INK, cx + 162, y + 30, 18, 90) }
function hook(x, t, S) {
  park(x, t)
  bench(x, 720, 1000)
  // Aries mid-tumble off the bench, phone flying
  const rot = 0.9 + 0.3 * Math.sin(t * 4)
  x.save(); x.translate(820, 900); x.rotate(rot); x.translate(-820, -900)
  S.L(x, t, { x: 820, y: 900, s: 220, mood: 'wide', look: [-1, -1], blink: false })
  x.restore()
  x.save(); x.translate(640, 700); x.rotate(-0.5 + t * 4); box(x, -40, -70, 80, 140, '#2a2148', { b: 6 }); R(x, BONE, -30, -40, 60, 30); x.restore()
}
const MSGS = [
  { at: 3.0, side: 'R', text: 'would you want to get dinner sometime?' },
  { at: 3.55, side: 'L', text: 'you’re sweet but I don’t see it going anywhere' },
]
function spiral(x, t, S) {
  park(x, t)
  x.fillStyle = 'rgba(5,4,12,0.45)'; x.fillRect(0, 0, 1080, 1920)
  phone(x, t, { cx: 620, top: 600, w: 600, h: 620, title: '♈︎ to: the cute one', msgs: MSGS, size: 36, glowA: 1 })
  // Aries crumbles flat
  const c = ease.inOutCubic(prog(t, 4.0, 4.6))
  S.L(x, t, { x: 200, y: 1220 + c * 50, s: 210, mood: c > 0.5 ? 'sleepy' : 'wide', look: [1, -0.5], squash: lerp(0, 0.45, c), blink: false, zzz: false })
  if (c > 0.5) label(x, '*crumbles*', 200, 1360, { size: 28, col: '#9a94b8', alpha: c })
}
function pep(x, t, S) {
  const [w0, w1, w2] = S.T.lines
  if (t > w0 + 0.4 && t < w1) note(x, 560, 640, 'INFO, not | a verdict', { w: 360, h: 150, col: SKYB(), size: 38, rot: -0.04, k: pop01(t, w0 + 0.4, 0.3, 2.4) * outK(t, [w1 - 0.25, w1]) })
  if (t > w1 + 0.4 && t < w2) {
    const k = pop01(t, w1 + 0.4, 0.3, 2.4) * outK(t, [w2 - 0.25, w2])
    x.save(); x.translate(560, 640); x.scale(k, k); x.rotate(0.06 * Math.sin(t * 4))
    R(x, INK, -50, -150, 30, 100); R(x, RED, -44, -146, 18, 92); R(x, INK, 20, -150, 30, 100); R(x, '#5fa8ff', 26, -146, 18, 92)
    x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 86, 0, 7); x.fill(); x.fillStyle = GOLD; x.beginPath(); x.arc(0, 0, 76, 0, 7); x.fill()
    x.font = "800 30px Inter"; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('BRAVE', 0, 2)
    x.restore()
  }
  if (t > w2 + 0.4) {
    const k = pop01(t, w2 + 0.4, 0.3, 2.4)
    x.save(); x.translate(560, 720); x.scale(k, k)
    R(x, INK, -6, -150, 12, 170); box(x, 6, -150, 150, 80, MINT, { b: 6 })
    x.font = "800 40px Inter"; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('YES', 81, -108)
    label(x, 'still out there →', 0, 60, { size: 26, col: MINT })
    x.restore()
  }
}
const SKYB = () => '#bfe6ff'
function fin(x, t, S) {
  // Pisces' 10/10 sign
  const k = pop01(t, S.t0 + 0.6, 0.3, 2.4)
  if (k > 0.01) { x.save(); x.translate(895, 1250); x.rotate(0.08 * Math.sin(t * 6)); x.scale(k, k); R(x, INK, -6, 0, 12, 90); box(x, -90, -60, 180, 90, BONE, { b: 6 }); x.font = "800 50px Inter"; x.fillStyle = RED; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('10/10', 0, -14); x.restore() }
}
const EP = makePep({
  id: 'kpte03', sign: 'aries', coach: 'taurus', end: 'cut', brk: 'shake',
  hookLine: 'Aries. | Breathe. Then *listen.*', hookSize: 104,
  premise: 'they said ‘I don’t see | it *going anywhere*’',
  lines: ['a no is *information*, not a verdict on you.', 'you were brave. brave is the *win.*', 'the right yes is still *out there.*'],
  last: 'You asked. | That’s the *flex.*', lastLate: 1,
  hook, spiral, pep, fin,
  pepSet: (x, t) => park(x, t),
  cues: [['pop', 3.0, 880, 0.04, 0.3], ['pop', 3.55, 440, 0.05, -0.3], ['tom', 4.1, 80, { gain: 0.25, decay: 0.4 }], ['pluck', 4.2, 220, 0.03, 0.6, 0],
    ['pop', 9.35, 1318.51, 0.04, 0], ['bell', 9.4, 1760, 0.03, 0.8, 0], ['pop', 12.55, 987.77, 0.04, 0.2], ['pop', 16.0, 1567.98, 0.04, 0.4]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [PEP, drawBits]
