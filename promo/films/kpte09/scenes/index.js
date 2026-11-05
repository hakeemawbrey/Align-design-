// kpte09: THE 10-SECOND PEP TALK, Ep 9 "Sagittarius, unpack the suitcase" (17.2 s vertical, batch m14, synthwave · Bm).
// Format kit: ../../kpte01/pepkit.js. Rows: promo/films/month2/m14.md.
//   0.0–3.0    frame 0: ♑ Capricorn mid-tackle onto a suitcase Sagittarius is zipping, socks mid-air · "Sag. Stop packing.
//              | *Sit down.*" · screen shake at 0.42 · chip "you like them | and *want to run*".
//   3.0–5.4    the spiral: "had the best time tonight" → Sag books a solo trip: TICKET · 1 SEAT · TOMORROW 6:00.
//   5.4–15.4   "liking someone isn't a *cage.*" (an open cage door) · "you can stay and still be *you.*" (a sock goes back
//              in the drawer) · "tell them you're *scared.* it helps." (the note: "I really like you. it scares me a bit.")
//   15.4–17.2  "Freedom includes | *choosing* someone."  Hard cut.
import { makePep, room, phone, note, label, R, box, INK, BONE, RED, PEP, GOLD, MINT, prog, ease, lerp, pop01, outK } from '../../kpte01/pepkit.js'

function den(x, t) { room(x, t, { wall: '#2a1f4a', wall2: '#251a44', floor: '#352646', win: { x: 120, y: 500, w: 240, h: 280 }, floorY: 1330 }) }
function suitcase(x, cx, cy, k = 1, open = 0) {
  x.save(); x.translate(cx, cy); x.scale(k, k)
  box(x, -170, -100, 340, 200, '#3fb08a', { b: 7, hi: 'rgba(255,255,255,0.18)' }); R(x, INK, -50, -134, 100, 34); R(x, '#2a7a5a', -40, -126, 80, 22)
  for (const d of [-1, 1]) R(x, '#2a7a5a', d * 90 - 8, -100, 16, 200)
  if (open > 0) R(x, '#ffd36b', -150, -110 - 40 * open, 300, 30)
  x.restore()
}
function sock(x, cx, cy, rot, col = '#ff8fb1') { x.save(); x.translate(cx, cy); x.rotate(rot); R(x, INK, -14, -40, 34, 70); R(x, col, -10, -36, 26, 50); R(x, INK, -14, 22, 60, 26); R(x, col, -10, 26, 52, 18); R(x, BONE, -10, -36, 26, 10); x.restore() }
function hook(x, t, S) {
  den(x, t)
  suitcase(x, 780, 960, 1, 0.6)
  S.L(x, t, { x: 860, y: 780, s: 200, mood: 'wide', look: [-1, 1], blink: false })
  for (let i = 0; i < 5; i++) sock(x, 600 + i * 90 + 30 * Math.sin(t * 2 + i), 620 - i * 30 + 40 * Math.sin(t * 3 + i * 2), t * 3 + i, ['#ff8fb1', '#7fd0ff', '#ffd36b', '#9fe6b0', '#c9a6ff'][i])
}
const MSGS = [{ at: 3.05, side: 'L', text: 'had the best time tonight :)' }]
function spiral(x, t, S) {
  den(x, t)
  x.fillStyle = 'rgba(5,4,12,0.45)'; x.fillRect(0, 0, 1080, 1920)
  phone(x, t, { cx: 400, top: 640, w: 440, h: 420, title: '♐︎ them', msgs: MSGS, size: 34, glowA: 1 })
  const k = pop01(t, 3.9, 0.3, 2.4)
  if (k > 0.01) {
    x.save(); x.translate(780, 1230); x.rotate(0.06); x.scale(k, k)
    box(x, -220, -90, 440, 180, BONE, { b: 7 }); R(x, PEP, -220, -90, 440, 46)
    x.font = "800 30px Inter"; x.fillStyle = BONE; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('TICKET · SOLO TRIP', 0, -66)
    x.font = "700 28px 'Space Mono', monospace"; x.fillStyle = INK; x.fillText('1 SEAT · TOMORROW 6:00', 0, -6); x.fillText('booked 1 min after', 0, 40)
    x.restore()
  }
  S.L(x, t, { x: 220, y: 1260, s: 200, mood: t > 3.9 ? 'wide' : 'heart', look: [1, -0.5], blink: false })
}
function pep(x, t, S) {
  const [w0, w1, w2] = S.T.lines
  if (t < w1 && t > w0 + 0.4) {
    const k = pop01(t, w0 + 0.4, 0.3, 2.4) * outK(t, [w1 - 0.25, w1]), o = ease.outBack(prog(t, w0 + 1.3, w0 + 1.9))
    x.save(); x.translate(560, 660); x.scale(k, k)
    R(x, INK, -130, -130, 260, 16); R(x, INK, -130, 110, 260, 16)
    for (let i = 0; i < 7; i++) R(x, '#c9b8f0', -120 + i * 40, -120, 8, 236)
    x.save(); x.translate(-130, 0); x.scale(1 - 1.6 * o, 1); for (let i = 0; i < 5; i++) R(x, GOLD, i * 40, -120, 8, 236); R(x, GOLD, 0, -120, 170, 8); R(x, GOLD, 0, 108, 170, 8); x.restore()
    x.restore()
    label(x, 'door’s open', 560, 830, { size: 28, col: GOLD, alpha: k })
  }
  if (t > w1 + 0.4 && t < w2) {
    const k = outK(t, [w2 - 0.25, w2]), p = ease.inOutCubic(prog(t, w1 + 0.8, w1 + 1.6))
    suitcase(x, 560, 720, 0.8 * k, 1)
    if (k > 0.01) sock(x, lerp(560, 760, p), lerp(600, 760, p) - 120 * Math.sin(Math.PI * p), p * 6)
    label(x, 'staying ✓  still you ✓', 560, 860, { size: 28, col: MINT, alpha: pop01(t, w1 + 1.6, 0.3, 2) * k })
  }
  if (t > w2 + 0.4) note(x, 560, 680, 'I really like you. | it scares me a bit.', { w: 520, h: 150, col: '#ffd0e4', size: 36, rot: -0.03, k: pop01(t, w2 + 0.4, 0.3, 2.4) })
}
const EP = makePep({
  id: 'kpte09', sign: 'sagittarius', coach: 'capricorn', end: 'cut', brk: 'shake',
  hookLine: 'Sag. Stop packing. | *Sit down.*',
  premise: 'you like them | and *want to run*',
  lines: ['liking someone isn’t a *cage.*', 'you can stay and still be *you.*', 'tell them you’re *scared.* it helps.'],
  last: 'Freedom includes | *choosing* someone.', lastLate: 2,
  hook, spiral, pep,
  pepSet: (x, t) => den(x, t),
  cues: [['pop', 3.05, 987.77, 0.04, -0.3], ['whoosh', 3.85, 0.3, 0.04], ['pop', 3.95, 1318.51, 0.04, 0.3], ['tick', 4.0, 0.05],
    ['pluck', 6.75, 1318.51, 0.03, 0.6, 0], ['whoosh', 9.75, 0.6, 0.03], ['pop', 10.6, 880, 0.03, 0.3], ['pop', 12.6, 1174.66, 0.04, 0]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [RED]
