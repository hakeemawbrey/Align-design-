// kpte04: THE 10-SECOND PEP TALK, Ep 4 "Taurus, step away from the old photos" (17.6 s vertical, batch m14, lofi · F).
// Format kit: ../../kpte01/pepkit.js. Rows: promo/films/month2/m14.md.
//   0.0–3.0    frame 0: ♊ Gemini mid-dive over the bed at 2 a.m., Taurus under the covers with a glowing phone · "Taurus.
//              | Do *NOT* open that album." · colour flash at 0.42 · chip "missing your ex | *at 2 a.m.*"
//   3.0–5.4    the spiral: old photos scroll on the phone (a picnic, two mugs, a beach), a tear rolls.
//   5.4–15.4   "missing them doesn't mean *go back.*" (a ↩ sign gets a ✕) · "it means it *mattered.* that's allowed."
//              (a little gold heart frame) · "now drink *water* and sleep." (water glass + the lamp clicks off).
//   15.4–17.6  "Miss them. | Then make *breakfast.*"  Loop.
import { makePep, room, bed, clockFace, note, label, R, box, INK, BONE, RED, PEP, GOLD, MINT, prog, ease, lerp, pop01, outK, drawBits, HEART, glow } from '../../kpte01/pepkit.js'

function night(x, t, lamp = 1) {
  room(x, t, { wall: '#1f1940', wall2: '#1b153a', floor: '#2c2242', win: { x: 120, y: 500, w: 260, h: 300 }, floorY: 1330, lamp: 0 })
  bed(x, 680, 980, { w: 600, sheet: '#a7b8f0', col: '#4a3f86' })
  clockFace(x, 900, 610, '2:07', {})
  void lamp
}
function glowPhone(x, t, cx, cy, s = 1, photo = 0) {
  x.save(); x.globalCompositeOperation = 'lighter'; glow(x, cx, cy, 260 * s, 0.3, '170,200,255'); x.restore()
  x.save(); x.translate(cx, cy); x.scale(s, s)
  box(x, -70, -120, 140, 240, '#2a2148', { b: 7 }); R(x, '#bcd6ff', -58, -100, 116, 190)
  const pics = [['#ffd36b', '#3fb08a'], ['#ff8fb1', '#7fd0ff'], ['#7fd0ff', '#f2c75c']]
  const p = pics[Math.floor(photo) % 3]
  R(x, p[0], -50, -90, 100, 80); R(x, p[1], -50, -10, 100, 90)
  drawBits(x, HEART, { H: RED }, 0, -50, 5)
  x.restore()
}
function hook(x, t, S) {
  night(x, t)
  // Taurus under the covers, only the eyes + the phone glow
  S.L(x, t, { x: 760, y: 920, s: 230, mood: 'wide', look: [0, 1], blink: false })
  R(x, INK, 450, 950, 560, 12); R(x, '#a7b8f0', 456, 956, 548, 60)
  glowPhone(x, t, 760, 830, 0.7, t * 3)
}
function spiral(x, t, S) {
  night(x, t)
  x.fillStyle = 'rgba(5,4,12,0.55)'; x.fillRect(0, 0, 1080, 1920)
  glowPhone(x, t, 600, 860, 2.1, 1 + Math.floor((t - 3) / 0.6))
  label(x, 'memories · 2 years ago', 600, 1160, { size: 30, col: '#bcd6ff' })
  S.L(x, t, { x: 220, y: 1230, s: 210, mood: 'wide', look: [1, -0.7], blink: false, tears: 0 })
  // one tear
  const p = prog(t, 4.2, 5.2)
  if (p > 0) { R(x, INK, 252, 1180 + p * 80, 16, 22); R(x, '#8fe3ff', 255, 1183 + p * 80, 10, 16) }
}
function pep(x, t, S) {
  const [w0, w1, w2] = S.T.lines
  if (t > w0 + 0.4 && t < w1) {
    const k = pop01(t, w0 + 0.4, 0.3, 2.4) * outK(t, [w1 - 0.25, w1])
    note(x, 560, 640, '↩ GO BACK', { w: 320, h: 110, col: '#ffd0d0', size: 44, k, txt: RED })
    const xk = pop01(t, w0 + 1.3, 0.2, 3) * outK(t, [w1 - 0.25, w1])
    if (xk > 0.01) { x.save(); x.translate(560, 640); x.scale(xk, xk); for (const r of [0.5, -0.5]) { x.save(); x.rotate(r); R(x, INK, -170, -16, 340, 32); R(x, RED, -164, -10, 328, 20); x.restore() } x.restore() }
  }
  if (t > w1 + 0.4 && t < w2) {
    const k = pop01(t, w1 + 0.4, 0.3, 2.4) * outK(t, [w2 - 0.25, w2])
    x.save(); x.translate(560, 640); x.scale(k, k); box(x, -110, -110, 220, 220, GOLD, { b: 7 }); R(x, '#2a2148', -86, -86, 172, 172); drawBits(x, HEART, { H: PINK() }, 0, 0, 16); x.restore()
    label(x, 'it mattered', 560, 800, { size: 30, col: GOLD, alpha: k })
  }
  if (t > w2 + 0.4) {
    const k = pop01(t, w2 + 0.4, 0.3, 2.4)
    x.save(); x.translate(560, 680); x.scale(k, k)
    R(x, INK, -46, -80, 92, 160); R(x, '#cfeaff', -40, -74, 80, 148); R(x, '#7fd0ff', -40, -20, 80, 94)
    x.restore()
    label(x, 'water ✓  sleep ✓', 560, 820, { size: 30, col: MINT, alpha: k })
  }
}
const PINK = () => '#ff8fb1'
function lastSet(x, t, S) {
  // morning: a frying pan with an egg
  const k = pop01(t, S.t0 + 0.5, 0.3, 2.4)
  if (k > 0.01) { x.save(); x.translate(820, 880); x.scale(k, k); R(x, INK, 60, -10, 120, 20); x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 80, 0, 7); x.fill(); x.fillStyle = '#5a5470'; x.beginPath(); x.arc(0, 0, 70, 0, 7); x.fill(); x.fillStyle = BONE; x.beginPath(); x.arc(0, 0, 44, 0, 7); x.fill(); x.fillStyle = GOLD; x.beginPath(); x.arc(4, -4, 18, 0, 7); x.fill(); x.restore() }
}
const EP = makePep({
  id: 'kpte04', sign: 'taurus', coach: 'gemini', end: 'loop', brk: 'flash', flashCol: '#7fd0ff',
  hookLine: 'Taurus. Do *NOT* | open that album.', hookSize: 100,
  premise: 'missing your ex | *at 2 a.m.*',
  lines: ['missing them doesn’t mean *go back.*', 'it means it *mattered.* that’s allowed.', 'now drink *water* and sleep.'],
  last: 'Miss them. | Then make *breakfast.*', lastLate: 1,
  hook, spiral, pep, lastSet,
  pepSet: (x, t) => night(x, t),
  cues: [['pop', 3.1, 659.25, 0.03, 0], ['pop', 3.7, 739.99, 0.03, 0], ['pop', 4.3, 880, 0.03, 0], ['pluck', 4.4, 330, 0.03, 0.8, 0],
    ['tick', 7.05, 0.06], ['pop', 9.35, 1318.51, 0.04, 0], ['pluck', 12.55, 880, 0.03, 0.5, 0.2], ['pop', 16.0, 987.77, 0.04, 0.4]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [PEP, ease, lerp]
