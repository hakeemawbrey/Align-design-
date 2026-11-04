// ngie11: THE SIGNS AS WINTER GIFTS, "Aquarius as a winter gift" (16 s vertical trial reel, music: synthwave · Gm).
// Story 0–11.6, then the shared end card. The format look lives in ../../npye01/scenes/kit.js.
//   0.0–2.4   hook "If *Aquarius* were a | winter gift:" — Aquarius mid-tug on the ribbon of a teal box, which beeps:
//             "don't worry, it's supposed to beep."
//   2.4–5.2   1 "a homemade *gadget* nobody can explain." A box of dials, an antenna and blinking lights rises.
//   5.2       card cut.
//   5.2–8.0   2 "it keeps your cocoa warm *forever.*" A mug lands on top; the meter reads WARM, then WARMER, then
//             "∞"; steam never stops.
//   8.0–11.6  THE STARS: "Weird and thoughtful is the *best* combo."
import { makeEp, R, box, bubble, shadow, mug, label, giftHook, giftReveal, hookCuesGift, revealCues, prog, ease, INK, BONE, GOLD, PINK, MINT, MONO } from '../../npye01/scenes/kit.js'

function gadget(x, t, cx, cy, k, meter = null) {
  x.save(); x.translate(cx, cy); x.scale(k, k)
  R(x, INK, -6, -230, 12, 110); x.fillStyle = INK; x.beginPath(); x.arc(0, -236, 20, 0, Math.PI * 2); x.fill(); x.fillStyle = Math.floor(t * 4) % 2 ? PINK : GOLD; x.beginPath(); x.arc(0, -236, 13, 0, Math.PI * 2); x.fill()
  box(x, -170, -130, 340, 240, '#2a9d9a', { b: 7, hi: '#3ab8b4' })
  for (let i = 0; i < 3; i++) { x.fillStyle = INK; x.beginPath(); x.arc(-110 + i * 60, -60, 24, 0, Math.PI * 2); x.fill(); x.fillStyle = BONE; x.beginPath(); x.arc(-110 + i * 60, -60, 17, 0, Math.PI * 2); x.fill(); x.save(); x.translate(-110 + i * 60, -60); x.rotate(t * (i + 1)); R(x, INK, -2, -15, 4, 15); x.restore() }
  for (let i = 0; i < 5; i++) R(x, (Math.floor(t * 6) + i) % 3 ? '#14102a' : MINT, -140 + i * 34, 10, 22, 22)
  box(x, 50, -100, 100, 80, '#14102a', { b: 4 })
  if (meter) { x.fillStyle = MINT; x.font = `700 ${meter.length > 2 ? 22 : 40}px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(meter, 100, -58) }
  x.restore()
}

const EP = makeEp({
  id: 'ngie11', series: 'gifts', sign: 'aquarius', name: 'Aquarius', boxCol: '#2a9d9a', ribbon: PINK, finGift: (x2, t2, cx, cy, k) => gadget(x2, t2, cx, cy, k),
  hook(x, t, S) { giftHook(x, t, S, { line: 'it’s supposed to beep.' }); if (Math.floor(t * 3) % 2) label(x, 'beep', 780, 860, { size: 30, col: MINT }) },
  hookCues: [...hookCuesGift, ['pop', 0.33, 1760, 0.015, 0.4], ['pop', 1.0, 1760, 0.015, 0.4]],
  beats: [
    { caption: 'a homemade *gadget* nobody can explain.',
      draw(x, t, S) { giftReveal(x, t, S, (x2, t2, cx, cy, k) => gadget(x2, t2, cx, cy, k), { line: 'don’t ask what this dial does.', heroMood: 'sparkle' }) },
      cues: [...revealCues, ['pop', 1.0, 1760, 0.015, 0.4], ['pop', 1.2, 880, 0.035, 0]] },
    { caption: 'it keeps your cocoa warm *forever.*',
      draw(x, t, S) {
        const { u, hero } = S
        const m = u < 0.7 ? 'WARM' : u < 1.3 ? 'WARMER' : '∞'
        gadget(x, t, 640, 900, 1, m)
        const k = ease.outCubic(prog(u, 0, 0.4))
        mug(x, t, 600, 740 - (1 - k) * 200, 90, '#e8344e')
        shadow(x, 280, 1125, 210)
        hero(x, t, { x: 280, y: 1000, s: 220, mood: u > 1.3 ? 'sparkle' : 'happy', look: [1, -0.5], hops: [S.t0 + 0.7, S.t0 + 1.3] })
        bubble(x, t, 600, 540, S.t0 + 1.4, S.t1, 'patent pending. probably.', { size: 32 })
      },
      cues: [['whoosh', 0.0, 0.3, 0.02], ['tick', 0.4, 0.05], ['pop', 0.7, 1174.66, 0.03, 0], ['pop', 1.3, 1567.98, 0.04, 0], ['pop', 1.4, 880, 0.035, 0]] },
  ],
  last: 'Weird and thoughtful is the *best* combo.',
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
