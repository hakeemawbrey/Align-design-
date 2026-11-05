// kpte10: THE 10-SECOND PEP TALK, Ep 10 "Capricorn, close the laptop" (17.6 s vertical, batch m14, lofi · Eb).
// Format kit: ../../kpte01/pepkit.js. Rows: promo/films/month2/m14.md.
//   0.0–3.0    frame 0: ♎ Libra mid-lunge, a laptop lid mid-slam at the desk, papers mid-flight, 11:48 PM on the wall ·
//              "Capricorn. Close it. | *Now.*" · colour flash at 0.42 · chip "too busy for love | *(on purpose)*".
//   3.0–5.4    the spiral: "so sorry, have to cancel tonight, work :(" → "no worries! another time?"
//   5.4–15.4   "rest isn't a prize you *earn.*" (a REST trophy gets crossed out) · "you're *wanted*, not just useful."
//              (a WANTED poster with Capricorn on it) · "say yes to one *slow* evening." (a calendar block: SLOW EVENING).
//   15.4–17.6  "Lovable with the | laptop *closed.*"  Loop.
import { makePep, room, phone, note, label, clockFace, table, R, box, INK, BONE, RED, PEP, GOLD, MINT, prog, ease, lerp, pop01, outK } from '../../kpte01/pepkit.js'

function office(x, t) { room(x, t, { wall: '#232048', wall2: '#1f1c42', floor: '#2d2844', win: { x: 120, y: 500, w: 240, h: 280 }, floorY: 1330 }); clockFace(x, 880, 560, '11:48', { w: 260 }) }
function laptop(x, cx, cy, lid) {
  box(x, cx - 160, cy - 14, 320, 28, '#8f89b8', { b: 6 })
  x.save(); x.translate(cx - 150, cy - 14); x.rotate(-lid * 1.75)
  box(x, 0, -14, 300, 14, '#8f89b8', { b: 5 }); if (lid > 0.3) R(x, '#bcd6ff', 10, -12, 280, 8)
  x.restore()
}
function hook(x, t, S) {
  office(x, t)
  table(x, 760, 1000, 520)
  laptop(x, 760, 990, 0.35 + 0.15 * Math.sin(t * 9))
  S.L(x, t, { x: 840, y: 860, s: 190, mood: 'wide', look: [-1, 0.5], blink: false })
  for (let i = 0; i < 5; i++) { x.save(); x.translate(430 + i * 62 + 20 * Math.sin(t * 3 + i), 760 - i * 22 + 30 * Math.sin(t * 2 + i)); x.rotate(t * 2 + i); box(x, -40, -50, 80, 100, BONE, { b: 4 }); for (let j = 0; j < 4; j++) R(x, '#b9b0c8', -28, -34 + j * 20, 56, 6); x.restore() }
}
const MSGS = [{ at: 3.05, side: 'R', text: 'so sorry, have to cancel tonight, work :(' }, { at: 4.3, side: 'L', text: 'no worries! another time?' }]
function spiral(x, t, S) {
  office(x, t)
  x.fillStyle = 'rgba(5,4,12,0.45)'; x.fillRect(0, 0, 1080, 1920)
  phone(x, t, { cx: 620, top: 660, w: 600, h: 540, title: '♑︎ to: the date', msgs: MSGS, size: 36, glowA: 1 })
  S.L(x, t, { x: 200, y: 1250, s: 200, mood: 'neutral', look: [1, -0.6] })
  label(x, 'cancelled again', 200, 1390, { size: 26, col: '#ff8fa0', alpha: prog(t, 4.6, 4.9) })
}
function pep(x, t, S) {
  const [w0, w1, w2] = S.T.lines
  if (t > w0 + 0.4 && t < w1) {
    const k = pop01(t, w0 + 0.4, 0.3, 2.4) * outK(t, [w1 - 0.25, w1])
    x.save(); x.translate(560, 660); x.scale(k, k)
    x.fillStyle = INK; x.fillRect(-90, -110, 180, 120); x.fillStyle = GOLD; x.fillRect(-82, -102, 164, 104); R(x, INK, -24, 10, 48, 50); R(x, GOLD, -18, 14, 36, 42); box(x, -70, 60, 140, 40, '#8a6440', { b: 5 })
    x.font = "800 34px Inter"; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('REST', 0, -50)
    x.restore()
    const xk = pop01(t, w0 + 1.3, 0.2, 3) * outK(t, [w1 - 0.25, w1])
    if (xk > 0.01) { x.save(); x.translate(560, 660); x.scale(xk, xk); for (const r of [0.6, -0.6]) { x.save(); x.rotate(r); R(x, INK, -150, -14, 300, 28); R(x, RED, -144, -8, 288, 16); x.restore() } x.restore() }
    label(x, 'not a prize', 560, 820, { size: 28, col: '#ff8fa0', alpha: xk })
  }
  if (t > w1 + 0.4 && t < w2) {
    const k = pop01(t, w1 + 0.4, 0.3, 2.4) * outK(t, [w2 - 0.25, w2])
    x.save(); x.translate(560, 660); x.rotate(-0.03); x.scale(k, k)
    box(x, -150, -170, 300, 330, '#f2deb0', { b: 7 })
    x.font = "800 52px Inter"; x.fillStyle = '#8a3a2a'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('WANTED', 0, -128)
    x.font = "700 24px 'Space Mono', monospace"; x.fillText('for: being you', 0, 132)
    x.restore()
    if (k > 0.5) S.L(x, t, { x: 560, y: 680, s: 150 * k, mood: 'happy', look: [0, 0], glyph: false })
  }
  if (t > w2 + 0.4) {
    const k = pop01(t, w2 + 0.4, 0.3, 2.4)
    x.save(); x.translate(560, 660); x.scale(k, k)
    box(x, -200, -130, 400, 260, BONE, { b: 7 }); R(x, PEP, -200, -130, 400, 50)
    x.font = "800 30px Inter"; x.fillStyle = BONE; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('FRIDAY', 0, -104)
    R(x, MINT, -170, -50, 340, 140); x.fillStyle = INK; x.font = "800 34px Inter"; x.fillText('SLOW EVENING', 0, 0); x.font = "700 24px 'Space Mono', monospace"; x.fillText('7:00 – 10:00 · yes', 0, 46)
    x.restore()
  }
}
const EP = makePep({
  id: 'kpte10', sign: 'capricorn', coach: 'libra', end: 'loop', brk: 'flash', flashCol: '#ffd36b',
  hookLine: 'Capricorn. Close it. | *Now.*',
  premise: 'too busy for love | *(on purpose)*',
  lines: ['rest isn’t a prize you *earn.*', 'you’re *wanted*, not just useful.', 'say yes to one *slow* evening.'],
  last: 'Lovable with the | laptop *closed.*', lastLate: 2,
  hook, spiral, pep,
  pepSet: (x, t) => office(x, t),
  cues: [['pop', 3.05, 659.25, 0.04, 0.3], ['pop', 4.3, 880, 0.04, -0.3], ['pluck', 4.6, 262, 0.03, 0.6, 0], ['tom', 7.05, 110, { gain: 0.2, decay: 0.2 }], ['pop', 9.35, 1318.51, 0.04, 0], ['bell', 12.6, 1760, 0.03, 0.8, 0]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [note, ease, lerp]
