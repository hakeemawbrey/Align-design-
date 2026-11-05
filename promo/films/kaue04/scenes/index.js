// kaue04 · ACHIEVEMENT UNLOCKED: SINGLE LIFE E04 "Cooked for one, made enough for twelve" (17 s, jazzy · Bb, hard cut).
//   0.0  Frame 0: Cancer mid-stir at a giant pot, soup sloshing over, steam whooshing. Hook "Cooked for one. Made for *twelve.*"
//   2.2  shake: the table fills with bowls, one by one, twelve of them → 4.8 ★ MEAL PREP: 11 TOMORROWS
//   6.8  Cancer labels them MON–FRI, then MON–FRI again: "monday. tuesday. …monday again."
//   9.0  Pisces cam happy-crying: "soup is just a hug you eat"
//   10.0 Cancer eats bowl one, hearts → 10.6 ★ ENJOYED EVERY BITE
//   15.4 last line "Leftovers are a *love language.*" · hard cut at 17.
import { makeAch } from '../../kaue01/achengine.js'
import { hero, R, box, label, sparkles, hearts, prog, ease, lerp, clamp, INK, BONE, GOLD } from '../../kaue01/achkit.js'
import { daySky } from '../../st9day.js'
import { drawCancerHome } from '../../st9cancerhome.js'

const DAYS = ['TONIGHT', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
const BOWLS = Array.from({ length: 12 }, (_, i) => [140 + (i % 6) * 160, 1420 + Math.floor(i / 6) * 150])
function pot(x, t) {
  const X = 300, Y = 1120
  box(x, X - 200, Y - 170, 400, 230, '#c8c4d8', { b: 8, hi: '#e8e4f4' })
  box(x, X - 240, Y - 150, 40, 40, '#9a96ae', { b: 6 }); box(x, X + 200, Y - 150, 40, 40, '#9a96ae', { b: 6 })
  // soup + slosh over the rim
  R(x, '#f0a040', X - 192, Y - 170, 384, 26)
  const sl = Math.sin(t * 5)
  for (let k = 0; k < 5; k++) R(x, '#f0a040', X - 180 + k * 80 + sl * 10, Y - 186 - Math.abs(Math.sin(t * 4 + k)) * 18, 46, 20)
  if (t < 2.2) { R(x, '#f0a040', X + 170, Y - 170, 26, 120 + Math.sin(t * 7) * 10); R(x, '#f0a040', X - 196, Y - 160, 22, 90) }
  // steam
  for (let k = 0; k < 6; k++) { const ph = (t * 0.6 + k / 6) % 1; x.save(); x.globalAlpha = 0.5 * Math.sin(Math.PI * ph); R(x, '#ffffff', X - 140 + k * 56 + Math.sin(ph * 6 + k) * 20, Y - 220 - ph * 380, 40 - ph * 16, 40 - ph * 16); x.restore() }
}
function bowl(x, t, X, Y, k, day, lab) {
  if (k <= 0) return
  x.save(); x.translate(X, Y); x.scale(k * 1.2, k * 1.2)
  box(x, -58, -30, 116, 58, '#f3ead8', { b: 6, hi: '#ffffff' }); R(x, '#e88a2a', -52, -36, 104, 18); R(x, '#ffc060', -40, -34, 30, 6); R(x, '#c8b898', -58, 14, 116, 8)
  const s = (t * 0.7 + X * 0.01) % 1; x.globalAlpha = 0.45 * Math.sin(Math.PI * s); R(x, '#fff', -10 + Math.sin(s * 6) * 8, -50 - s * 50, 18, 18); x.globalAlpha = 1
  x.restore()
  if (lab > 0) { x.save(); x.translate(X, Y + 50); x.rotate(-0.06); x.scale(lab, lab); box(x, -60, -16, 120, 32, '#fff1a8', { b: 4 }); label(x, day, 0, 1, { size: day.length > 4 ? 18 : 22, col: INK }); x.restore() }
}
function scene(x, t) {
  daySky(x, t, { hour: 19.5 })
  drawCancerHome(x, t, { room: 'kitchen', hour: 19.5 })
  pot(x, t)
  // the table in front
  box(x, 30, 1360, 1020, 330, '#c98a4a', { b: 8, hi: '#e0a060' })
  const eat = prog(t, 10.0, 10.6)
  BOWLS.forEach(([bx, by], i) => {
    const k = ease.outBack(prog(t, 2.5 + i * 0.16, 2.8 + i * 0.16))
    const lab = ease.outBack(prog(t, 6.9 + i * 0.13, 7.15 + i * 0.13))
    bowl(x, t, bx, by, k, DAYS[i], lab)
  })
  const ladle = Math.sin(t * 7)
  const cx = 740, cy = 1180
  hero(x, t, 'cancer', cx, cy, 300, { mood: t < 2.2 ? 'squint' : t < 4.4 ? 'wide' : t < 10 ? 'happy' : 'heart', look: t < 2.2 ? [-1, 0] : [0, 1], hops: [2.3, 7.0, 7.6, 8.2, 10.1], seed: 7, blink: t < 2.2 ? false : undefined })
  // the ladle in the pot while stirring
  if (t < 2.4) { x.save(); x.translate(470, 960); x.rotate(-0.6 + ladle * 0.25); R(x, INK, -8, -10, 16, 220); R(x, '#9a96ae', -4, -6, 8, 212); x.restore() }
  sparkles(x, t, 540, 1480, 4.8, 12, 360, 0.2)
  hearts(x, t, 10.2, cx, 1040, { n: 7 })
  void eat
}

export const { DURATION, SCENES, CUES } = makeAch({
  dur: 17, ending: 'cut', key: 'Bb',
  shots: [{ at: 0, cam: [1.1, 540, 1040] }, { at: 6.6, cam: [1.3, 540, 1300] }, { at: 9.8, cam: [1.15, 620, 1100] }],
  scene,
  whips: [{ at: -0.22, from: 1.45, blur: 8, cx: 380, cy: 1050 }, { at: 6.6, from: 1.3 }],
  shakes: [{ at: 0.02, dur: 0.4, amp: 18 }, { at: 2.2, dur: 0.6, amp: 26 }],
  hook: { text: 'Cooked for one. | Made for *twelve.*', out: 2.3 },
  bubbles: [
    { at: 2.9, out: 4.6, x: 740, y: 920, text: 'oh. oh no. oh YES.', tail: 0 },
    { at: 7.0, out: 8.7, x: 540, y: 1150, text: 'monday. tuesday. …monday again.', size: 36, tail: 0.3 },
    { at: 11.8, out: 13.8, x: 640, y: 900, text: 'see you tomorrow, soup.', tail: 0.3 },
  ],
  achs: [
    { at: 4.8, out: 6.6, title: 'MEAL PREP: 11 TOMORROWS', xp: 300, size: 40 },
    { at: 10.6, out: 12.4, title: 'ENJOYED EVERY BITE', xp: 150, icon: 'heart' },
  ],
  cams: [{ at: 8.9, out: 11.6, line: 'soup is just a hug you eat', lineAt: 9.3, tears: 3, mood: 'happy' }],
  last: { at: 15.4, text: 'Leftovers are | a *love language.*', top: 330, accentSize: 128 },
})
