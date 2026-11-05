// kaue01 · ACHIEVEMENT UNLOCKED: SINGLE LIFE E01 "Table for one, and loving it" (16 s, chiptune · E, hard cut).
//   0.0   Frame 0: Aries mid-burst through a restaurant door (door flung, shake, mid whip zoom), Libra the host
//         mid-gasp behind the PARTY OF ___ stand. Hook: "Table for one. *Achievement* unlocked."
//   1.2   LIBRA: "just one?"  2.3 ARIES: "JUST one."  2.9 ★ TABLE FOR ONE +50 XP
//   4.4   the booth: ARIES "dessert first."; the cake lands → 6.4 ★ DESSERT FIRST +100 XP
//   8.0   Pisces, P2 · SPECTATING, sobbing: "so brave…"
//   9.6   Aries stretches out across the whole booth → 10.2 ★ THE WHOLE BOOTH +200 XP
//   14.4  last line "Party of one. *Full* party." holds, hard cut at 16.
import { makeAch } from '../achengine.js'
import { drawDiner } from '../sets.js'
import { hero, box, R, hearts, sparkles, speedLines, prog, ease, lerp, clamp, INK, BONE, PINK, GOLD } from '../achkit.js'

const SHOTS = [
  { at: 0, cam: [1.32, 470, 990], room: 'door' },
  { at: 4.4, cam: [1.32, 540, 1000], room: 'booth' },
  { at: 9.6, cam: [1.22, 540, 990], room: 'booth', push: 0.06 },
]
function cake(x, t, X, Y, k) {
  if (k <= 0) return
  x.save(); x.translate(X, Y); x.scale(k, k)
  box(x, -70, -8, 140, 14, BONE, { b: 5 })                  // plate
  box(x, -50, -70, 100, 62, '#f6c8d8', { b: 6, hi: '#ffe3ec' })
  R(x, '#8a4a3a', -50, -42, 100, 10)
  box(x, -6, -102, 12, 30, '#fff3b0', { b: 4 }); R(x, '#ffcf5a', -5, -118 + Math.sin(t * 14) * 2, 10, 14)
  R(x, '#e8344e', -14, -82, 12, 12); R(x, '#e8344e', 10, -80, 12, 12)
  x.restore()
}
function scene(x, t, S) {
  const { i } = S
  drawDiner(x, t, { room: SHOTS[i].room })
  if (i === 0) {
    // speed lines behind the burst + the host
    hero(x, t, 'libra', 815, 960, 220, { mood: t < 1.1 ? 'wide' : 'neutral', look: [-1, 0], blink: false, seed: 4, hops: [1.25, 1.6] })
    box(x, 700, 1060, 230, 300, '#7a4a2a', { b: 8, hi: '#9a6238' })       // stand in front of the host
    const burst = 1 - ease.outCubic(prog(t, 0, 0.6))
    hero(x, t, 'aries', 300 + burst * -60, 1180, 300, { mood: t < 2.2 ? 'wide' : 'happy', look: [1, 0], squash: 0.18 * burst - 0.05, hops: [2.3, 2.7, 3.1], seed: 2 })
    sparkles(x, t, 300, 1150, 2.9, 10, 220, 0.3)
  } else if (i === 1) {
    hero(x, t, 'aries', 540, 1150, 300, { mood: t < 5.6 ? 'squint' : 'heart', look: [1, 1], hops: [5.0, 5.4, 6.1], seed: 2 })
    // the menu (until the cake), then the cake slides in
    const mk = 1 - ease.inCubic(prog(t, 5.7, 6.0))
    if (mk > 0) { x.save(); x.translate(400, 1250); x.rotate(-0.1); x.scale(1, mk); box(x, -60, -90, 120, 160, '#2a1a3a', { b: 6 }); R(x, GOLD, -40, -60, 80, 8); R(x, BONE, -40, -36, 60, 6); R(x, BONE, -40, -18, 70, 6); R(x, BONE, -40, 0, 50, 6); x.restore() }
    const ck = ease.outBack ? ease.outBack(prog(t, 5.9, 6.3)) : ease.outCubic(prog(t, 5.9, 6.3))
    cake(x, t, lerp(1000, 690, ease.outCubic(prog(t, 5.9, 6.3))), 1284, clamp(ck, 0, 1.2))
    hearts(x, t, 6.4, 540, 1000)
  } else {
    // the whole booth: coat on the left, bag on the right, Aries stretched out across the seat
    box(x, 120, 1080, 150, 110, '#3f6ad8', { b: 6, hi: '#5f8af0' })
    box(x, 820, 1090, 120, 100, '#e9a23a', { b: 6, hi: '#ffc25a' }); R(x, INK, 850, 1060, 60, 10)
    const k = ease.inOutCubic(prog(t, 9.7, 10.2))
    x.save(); x.translate(540, lerp(1150, 1150, k)); x.rotate(lerp(0, -1.57, k))
    hero(x, t, 'aries', 0, 0, 300, { mood: 'happy', bob: 4, seed: 2 })
    x.restore()
    cake(x, t, 690, 1284, 1)
    R(x, 'rgba(0,0,0,0)', 0, 0, 1, 1)
    hearts(x, t, 10.3, 540, 980, { n: 7 })
    sparkles(x, t, 540, 1080, 10.2, 12, 300, 0.7)
  }
}
const overlay = (x, t) => { const a = 1 - prog(t, 0, 0.5); if (a > 0) speedLines(x, t, a * 0.8, { cx: 300, cy: 1100, inner: 260 }) }

export const { DURATION, SCENES, CUES } = makeAch({
  dur: 16, ending: 'cut', key: 'E',
  shots: SHOTS, scene, overlay,
  whips: [{ at: -0.22, from: 1.5, blur: 8, cx: 360, cy: 1180 }, { at: 4.4, from: 1.4 }],
  shakes: [{ at: 0, dur: 0.5, amp: 26 }, { at: 9.7, dur: 0.35, amp: 14 }],
  punch: [{ at: 2.3, dur: 1.2, z: 0.18, x: 330, y: 1120 }, { at: 12.2, dur: 1.6, z: 0.2, x: 560, y: 1100 }],
  hook: { text: 'Table for one. | *Achievement* unlocked.', out: 2.1 },
  bubbles: [
    { at: 1.2, out: 2.5, x: 800, y: 760, text: 'just one?', tail: -0.3 },
    { at: 2.3, out: 3.9, x: 380, y: 860, text: 'JUST one.', size: 56, tail: -0.2 },
    { at: 5.0, out: 6.7, x: 600, y: 860, text: 'dessert first, please.', tail: -0.2 },
    { at: 12.2, out: 14.1, x: 560, y: 830, text: 'no one asked me to scoot.', tail: 0 },
  ],
  achs: [
    { at: 2.9, out: 4.3, title: 'TABLE FOR ONE', xp: 50 },
    { at: 6.4, out: 8.5, title: 'DESSERT FIRST', xp: 100, icon: 'heart' },
    { at: 10.2, out: 12.0, title: 'THE WHOLE BOOTH', xp: 200, sub: 'every seat: yours', icon: 'star' },
  ],
  cams: [{ at: 7.9, out: 11.9, line: 'so brave…', lineAt: 8.3, tears: 3 }],
  last: { at: 14.35, text: 'Party of one. | *Full* party.', top: 330 },
})
