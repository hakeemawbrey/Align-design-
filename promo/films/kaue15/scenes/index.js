// kaue15 · ACHIEVEMENT UNLOCKED: SINGLE LIFE E15 "Slept through the 2 a.m. “u up?”" (15 s, lofi · Db, loop).
//   0.0  Frame 0: 2 a.m., a phone mid-buzz on the nightstand ("u up?" dropping in), Libra asleep under a sleep mask.
//        Hook "2 a.m. “u up?” *Nope.*"
//   2.0  "u up??" · 4.0 "hellooo?" — each buzz louder, Libra snores through all three → 6.0 ★ SLEPT THROUGH IT
//   7.6  morning: Libra stretches, mask up, reads it, smiles: "nah." → 9.4 ★ LEFT IT IN THE PAST
//   10.4 Pisces cam happy-crying: "BOUNDARIES"
//   11.8 last line "Not up. *Moving* on." · 14.6–15.0 loops back into the 2 a.m. buzz.
import { makeAch } from '../../kaue01/achengine.js'
import { hero, R, box, label, sparkles, prog, ease, lerp, clamp, INK, BONE, GOLD, starFrame, inSprite } from '../../kaue01/achkit.js'
import { daySky } from '../../st9day.js'
import { drawLibraHome } from '../../st9librahome.js'

const MORN = 7.6
const BUZZ = [0, 2.0, 4.0]
function phone(x, t, X, Y) {
  const b = BUZZ.some(a => t >= a - 0.05 && t < a + 0.7) && t < MORN
  x.save(); x.translate(X + (b ? Math.sin(t * 70) * 6 : 0), Y); x.rotate(-0.08)
  box(x, -50, -90, 100, 180, '#1a1430', { b: 6 })
  const lit = t < MORN ? (b ? 1 : 0.35) : (t > 8.2 && t < 9.4 ? 1 : 0)
  x.globalAlpha = lit; R(x, '#9fb8ff', -40, -78, 80, 156); x.globalAlpha = 1
  if (lit > 0.5) label(x, t < MORN ? 'u up?' : 'delete?', 0, -10, { size: 20, col: INK })
  x.restore()
  if (b) { x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(X, Y, 10, X, Y, 260); g.addColorStop(0, 'rgba(160,184,255,0.4)'); g.addColorStop(1, 'rgba(160,184,255,0)'); x.fillStyle = g; x.fillRect(X - 260, Y - 260, 520, 520); x.restore() }
}
function mask(x, t, X, Y, size, up, o) {
  const F = starFrame(X, Y, size, t, o)
  inSprite(x, F, () => { const y = 16 - up * 8; x.fillStyle = INK; x.fillRect(7, y - 0.6, 22, 6.2); x.fillStyle = '#c9a6ff'; x.fillRect(7.6, y, 20.8, 5); x.fillStyle = '#efe6d6'; x.fillRect(10, y + 1.6, 4, 1.2); x.fillRect(22, y + 1.6, 4, 1.2) })
}
function scene(x, t) {
  const morning = t >= MORN
  daySky(x, t, { hour: morning ? 8 : 2 })
  drawLibraHome(x, t, { room: 'bedroom', dark: morning ? 0 : 0.8, hour: morning ? 8 : 2 })
  // the bed covers
  box(x, 60, 1280, 700, 150, '#ffb8d2', { b: 8, hi: '#ffd0e0' })
  const stretch = morning ? ease.outBack(prog(t, MORN, MORN + 0.6)) : 0
  const o = { mood: morning ? (t < 8.6 ? 'squint' : 'happy') : 'sleepy', look: morning ? [1, 1] : [0, 0], seed: 15, squash: morning ? -0.1 * Math.sin(Math.PI * prog(t, MORN, MORN + 0.8)) : 0, hops: [8.6, 9.5], blink: morning ? undefined : 1 }
  const Y = lerp(1250, 1180, stretch)
  hero(x, t, 'libra', 430, Y, 320, o)
  mask(x, t, 430, Y, 320, morning ? 1 : 0, o)
  box(x, 60, 1330, 700, 100, '#ffb8d2', { b: 8 })          // the blanket over its lower half
  box(x, 800, 1180, 200, 180, '#8a5a3a', { b: 8, hi: '#a8703e' })   // nightstand
  phone(x, t, 900, 1100)
  sparkles(x, t, 400, 1150, 6.0, 12, 260, 0.3)
  sparkles(x, t, 900, 1100, 9.4, 10, 200, 0.6)
}

export const { DURATION, SCENES, CUES } = makeAch({
  dur: 15, ending: 'loop', key: 'Db',
  shots: [{ at: 0, cam: [1.3, 600, 1150] }, { at: MORN, cam: [1.3, 600, 1150] }],
  scene,
  whips: [{ at: -0.22, from: 1.45, blur: 8, cx: 800, cy: 1120 }, { at: MORN, from: 1.35 }],
  shakes: [{ at: 2.0, dur: 0.4, amp: 12 }, { at: 4.0, dur: 0.5, amp: 20 }],
  kit: [
    ['notification', { at: -1, out: [1.6, 1.8], title: 'texts · 2:03 a.m.', body: 'them: u up?', glyph: '♡', color: '#8a7ac8', y: 560 }],
    ['notification', { at: 2.0, out: [3.6, 3.8], title: 'texts · 2:09 a.m.', body: 'them: u up??', glyph: '♡', color: '#8a7ac8', y: 560 }],
    ['notification', { at: 4.0, out: [5.6, 5.8], title: 'texts · 2:21 a.m.', body: 'them: hellooo?', glyph: '♡', color: '#8a7ac8', y: 560 }],
  ],
  hook: { text: '2 a.m. “u up?” | *Nope.*', out: 1.6 },
  bubbles: [
    { at: 2.4, out: 3.6, x: 400, y: 960, text: 'zzz…', tail: 0 },
    { at: 4.4, out: 5.8, x: 400, y: 960, text: 'ZZZ…', size: 50, tail: 0 },
    { at: 8.6, out: 9.9, x: 420, y: 900, text: 'nah.', size: 56, tail: 0 },
  ],
  achs: [
    { at: 6.0, out: 7.5, title: 'SLEPT THROUGH IT', sub: 'three buzzes, zero replies', xp: 800, icon: 'star' },
    { at: 9.4, out: 11.0, title: 'LEFT IT IN THE PAST', xp: 300, icon: 'heart' },
  ],
  cams: [{ at: 9.9, out: 11.8, line: 'BOUNDARIES', lineAt: 10.2, tears: 3, mood: 'happy' }],
  last: { at: 11.8, text: 'Not up. | *Moving* on.', top: 640, out: 14.5 },
})
