// kpte13: THE 10-SECOND PEP TALK, Ep 13 "Taurus, you are not behind" (17.2 s vertical, batch m14, jazzy · D).
// Format kit: ../../kpte01/pepkit.js. Rows: promo/films/month2/m14.md.
//   0.0–3.0    frame 0: ♎ Libra mid-lunge, a TIMELINE chart mid-rip off the wall, pins flying · "Taurus. You are | not
//              *behind.*" · whip zoom at 0.42 · chip "everyone’s engaged | *except you*".
//   3.0–5.4    the spiral: three announcements pop: "WE'RE ENGAGED!!" · "we moved in together!" · "we got a puppy!!"
//   5.4–15.4   "there's no *deadline* on love." (DEADLINE crossed out) · "their timeline isn't your *scoreboard.*" (a
//              scoreboard that just reads N/A) · "build a life you love *meanwhile.*" (a pot, a plant, a pottery wheel).
//   15.4–17.2  "Your life isn’t late. | It’s *yours.*"  Hard cut. Pisces cries at the announcements, then at Taurus.
import { makePep, room, note, label, R, box, INK, BONE, RED, PEP, GOLD, MINT, prog, ease, lerp, pop01, outK, drawBits, HEART } from '../../kpte01/pepkit.js'

function den(x, t) { room(x, t, { wall: '#2a2350', wall2: '#251e4a', floor: '#34284a', win: { x: 120, y: 500, w: 240, h: 280 }, floorY: 1330 }) }
function chart(x, cx, cy, rot, k = 1) {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  box(x, -170, -110, 340, 220, BONE, { b: 6 }); x.font = "800 30px Inter"; x.fillStyle = INK; x.textAlign = 'center'; x.fillText('TIMELINE', 0, -70)
  R(x, INK, -140, 10, 280, 6); ;['25', '28', '30'].forEach((s, i) => { R(x, RED, -120 + i * 110, 0, 14, 26); x.font = "700 20px 'Space Mono', monospace"; x.fillText(s, -113 + i * 110, 60) })
  x.restore()
}
function hook(x, t, S) {
  den(x, t)
  chart(x, 760, 700, -0.25 + 0.08 * Math.sin(t * 6), 1)
  for (let i = 0; i < 5; i++) { R(x, INK, 620 + i * 70 + 20 * Math.sin(t * 4 + i), 560 - i * 30 + 30 * Math.cos(t * 3 + i), 18, 18); R(x, RED, 623 + i * 70 + 20 * Math.sin(t * 4 + i), 563 - i * 30 + 30 * Math.cos(t * 3 + i), 12, 12) }
  S.L(x, t, { x: 820, y: 1010, s: 220, mood: 'wide', look: [-1, -1], blink: false })
}
function spiral(x, t, S) {
  den(x, t)
  ;[['WE’RE ENGAGED!!', '#ffd0e4'], ['we moved in together!', '#cfe6ff'], ['we got a puppy!!', '#fff2c4']].forEach(([s, c], i) => {
    const k = pop01(t, 3.1 + i * 0.6, 0.25, 2.4)
    if (k > 0.01) { note(x, 600, 680 + i * 130, s, { w: 520, h: 90, col: c, size: 38, k, rot: [0.03, -0.02, 0.02][i] }); drawBits(x, HEART, { H: '#ff5c8a' }, 360, 680 + i * 130, 5 * k) }
  })
  S.L(x, t, { x: 200, y: 1250, s: 200, mood: 'neutral', look: [1, -0.6], squash: 0.06 })
}
function pep(x, t, S) {
  const [w0, w1, w2] = S.T.lines
  if (t > w0 + 0.4 && t < w1) {
    const k = pop01(t, w0 + 0.4, 0.3, 2.4) * outK(t, [w1 - 0.25, w1])
    note(x, 560, 660, 'DEADLINE', { w: 340, h: 110, col: '#ffd0d0', size: 46, k, txt: RED })
    const xk = pop01(t, w0 + 1.3, 0.2, 3) * outK(t, [w1 - 0.25, w1])
    if (xk > 0.01) { x.save(); x.translate(560, 660); x.scale(xk, xk); for (const r of [0.45, -0.45]) { x.save(); x.rotate(r); R(x, INK, -190, -14, 380, 28); R(x, RED, -184, -8, 368, 16); x.restore() } x.restore() }
  }
  if (t > w1 + 0.4 && t < w2) {
    const k = pop01(t, w1 + 0.4, 0.3, 2.4) * outK(t, [w2 - 0.25, w2])
    x.save(); x.translate(560, 660); x.scale(k, k)
    box(x, -200, -110, 400, 220, '#14102a', { b: 8 }); x.font = "700 26px 'Space Mono', monospace"; x.fillStyle = BONE; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.fillText('THEM        YOU', 0, -60); x.font = "700 64px 'Space Mono', monospace"; x.fillStyle = '#ffb36b'; x.fillText('N/A', 0, 20)
    x.restore()
    label(x, 'not a game', 560, 820, { size: 28, col: GOLD, alpha: k })
  }
  if (t > w2 + 0.4) {
    ;[['pottery', '#d9805c'], ['a plant', MINT], ['your people', '#ffd0e4']].forEach(([s, c], i) => note(x, 380 + i * 180, 680 + (i % 2) * 40, s, { w: 170, h: 70, col: c, size: 26, rot: [-0.05, 0.03, -0.02][i], k: pop01(t, w2 + 0.4 + i * 0.35, 0.3, 2.4) }))
  }
}
const EP = makePep({
  id: 'kpte13', sign: 'taurus', coach: 'libra', end: 'cut', brk: 'whip',
  hookLine: 'Taurus. You are | not *behind.*',
  premise: 'everyone’s engaged | *except you*',
  lines: ['there’s no *deadline* on love.', 'their timeline isn’t your *scoreboard.*', 'build a life you love *meanwhile.*'],
  last: 'Your life isn’t late. | It’s *yours.*', lastLate: 1,
  hook, spiral, pep,
  pepSet: (x, t) => den(x, t),
  cues: [['pop', 3.1, 880, 0.04, -0.2], ['pop', 3.7, 987.77, 0.04, 0], ['pop', 4.3, 1174.66, 0.04, 0.2], ['tom', 7.05, 110, { gain: 0.2, decay: 0.2 }], ['pop', 9.35, 659.25, 0.04, 0], ['pop', 12.55, 1318.51, 0.03, -0.3], ['pop', 12.9, 1567.98, 0.03, 0], ['pop', 13.25, 1760, 0.03, 0.3]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [PEP, ease, lerp]
