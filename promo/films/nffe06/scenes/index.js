// nffe06: FRIENDS FIRST ep 6, "Long-distance friends" (28 s vertical, star_advice, music: synthwave · F#m).
// Story 0–25.6, then the short shared end card (2.4 s). Look: ../../nffe01/scenes/friendskit.js.
//   0.0–8.6    "Your best friend | *moved away.*"  Split screen. Right: Aquarius in a new city, mid-hop, unpacking boxes.
//              Left: Taurus alone on a cushion with a phone. Each half has its own clock. Taurus calls; Aquarius is
//              buried in boxes: MISSED CALL. Aquarius calls back; Taurus is asleep: MISSED CALL. Pisces sniffles.
//   8.6        hard cut.  THE STARS: "a ritual beats a *perfect* plan." → "pick one time. keep it *small*. keep it."
//   16.0       split again. CHECK-IN: "sunday call? same time, *every week.*"  Sunday: both on the call, matching mugs,
//              laughing; hearts float across the divider.
//   20.4       Last line: "Same time. *Every Sunday.*"
import { makeFriends, stars, box, R, INK, BONE, label, pop01, outK, mug, phoneSmall, hearts, glow, sparkles, lerp, prog } from '../../nffe01/scenes/friendskit.js'

const CAN = 'taurus', AQU = 'aquarius'
const CALL1 = [3.9, 5.0], CALL2 = [5.8, 6.9]
function crate(x, cx, y, w, h, tape = '#c99a4a') { box(x, cx - w / 2, y - h, w, h, '#b88a5a', { b: 6, hi: 'rgba(255,255,255,0.18)' }); R(x, tape, cx - 10, y - h, 20, h) }
function clock(x, cx, txt, k = 1) { if (k <= 0.01) return; x.save(); x.translate(cx, 840); x.scale(k, k); box(x, -110, -34, 220, 68, '#141028', { b: 6 }); x.restore(); label(x, txt, cx, 840, { size: 34 * k, col: '#ff9fe0' }) }
function stamp(x, t, cx, cy, at) {
  const k = pop01(t, at, 0.25, 3) * outK(t, [at + 1.7, at + 1.9])
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.12); x.scale(k, k); x.strokeStyle = '#e8344e'; x.lineWidth = 8; x.strokeRect(-170, -40, 340, 80); x.restore()
  label(x, 'MISSED CALL', cx, cy, { size: 40 * k, col: '#ff6b7f', rot: -0.12, font: "Inter, sans-serif", weight: 800 })
}
const EP = makeFriends({
  id: 'nffe06', dur: 30, cut: 8.6,
  hook: { text: 'Your best friend | *moved away.*', out: 3.6, color: '#a8ecff' },
  lines: [
    stars(9.0, 'a ritual beats a *perfect* plan.'),
    stars(11.8, 'pick one time. keep it *small*. keep it.'),
  ],
  boxes: [{ from: 0, to: 2, close: 15.7 }],
  check: { at: 16.3, out: [19.9, 20.2], text: 'sunday call? | same time, *every week.*', accent: '#2a8ab0' },
  last: { at: 20.4, text: 'Same time. *Every Sunday.*', color: '#a8ecff', size: 100, accentSize: 150 },
  shots: [
    { at: 0, set: 'split', cam: [1, 540, 960], pis: { x: 430, y: 1290, s: 100, tears: 1, mood: 'wide', look: [-1, -1] },
      draw(x, t, S) {
        clock(x, 270, '7:00 PM'); clock(x, 810, t < 5.8 ? '10:00 PM' : '1:00 AM')
        // right: Aquarius among boxes
        crate(x, 960, 1170, 150, 130); crate(x, 640, 1170, 130, 110); crate(x, 960, 1040, 120, 100, '#7fd0ff')
        const busy = t < CALL2[0]
        S.star(x, t, AQU, { x: 800, y: 1040, s: 270, mood: busy ? 'happy' : 'sparkle', look: busy ? [1, 1] : [-1, 0], hops: busy ? [-0.12, 0.6, 1.4, 2.2, 3.0, 3.8, 4.6] : [5.85, 6.4] })
        phoneSmall(x, t, 680, 1080, { s: 0.6, rot: 0.2, buzz: t > CALL1[0] && t < CALL1[1] ? 1 : 0, glowA: t > CALL1[0] && t < CALL1[1] ? 1.2 : 0.3 })
        // left: Cancer
        const asleep = t > 5.6
        S.star(x, t, CAN, { x: 270, y: 1060, s: 270, mood: asleep ? 'sleepy' : t > CALL1[1] ? 'neutral' : 'sparkle', look: [1, 0.4], hops: [3.95] })
        phoneSmall(x, t, 370, 1110, { s: 0.6, rot: -0.2, buzz: t > CALL2[0] && t < CALL2[1] ? 1 : 0, glowA: t > CALL2[0] && t < CALL2[1] ? 1.2 : 0.6 })
        stamp(x, t, 270, 640, CALL1[1]); stamp(x, t, 810, 640, CALL2[1])
      } },
    { at: 8.6, set: 'sky', dim: 0.75, pis: { x: 880, y: 1240, s: 130, tears: 2 },
      draw(x, t, S) {
        S.star(x, t, 'stars', { x: 540, y: 860, s: 360, mood: t > 13.4 ? 'happy' : 'neutral', look: [0, 0.2], hops: [8.65, ...S.STARS_HOPS], seed: 2, glow: 1.1 })
        S.star(x, t, CAN, { x: 200, y: 1250, s: 150, mood: 'sparkle', look: [1, -1], hops: [11.7] })
        S.star(x, t, AQU, { x: 360, y: 1260, s: 140, mood: 'sparkle', look: [1, -1], hops: [11.8] })
      } },
    { at: 16.0, set: 'split', cam: [1, 540, 960], pis: { x: 430, y: 1290, s: 100, tears: 3, mood: 'happy' },
      draw(x, t, S) {
        const k = pop01(t, 19.9, 0.3, 2)
        clock(x, 270, 'SUNDAY', k); clock(x, 810, 'SUNDAY', k)
        crate(x, 960, 1170, 150, 130)
        S.star(x, t, CAN, { x: 270, y: 1060, s: 280, mood: t < 20 ? 'neutral' : 'happy', look: [1, 0], hops: t > 20 ? [20.1, 21.0, 22.2, 23.4] : [] })
        S.star(x, t, AQU, { x: 800, y: 1060, s: 280, mood: t < 20 ? 'neutral' : 'happy', look: [-1, 0], hops: t > 20 ? [20.15, 21.4, 22.6, 23.8] : [] })
        if (t > 20) {
          mug(x, t, 400, 1150, 1.1, '#ff8fb1'); mug(x, t, 660, 1150, 1.1, '#ff8fb1')
          phoneSmall(x, t, 130, 1100, { s: 0.7, rot: 0.1, text: 'ON|CALL' }); phoneSmall(x, t, 950, 1100, { s: 0.7, rot: -0.1, text: 'ON|CALL' })
          for (let i = 0; i < 4; i++) { const p = ((t - 20.2) * 0.5 + i / 4) % 1; if (t > 20.2) { glow(x, lerp(330, 750, p), 900 - Math.sin(Math.PI * p) * 120, 40, 0.6); hearts(x, t, 20.3 + i * 1.1, lerp(330, 750, p), 960, { n: 1 }) } }
          sparkles(x, t, 540, 1000, 20.05, 12, 200, 1)
        }
        void prog
      } },
  ],
  cues: [
    ...[0.6, 1.4, 2.2, 3.0].map(a => ['tick', a, 0.03]),
    ...Array.from({ length: 6 }, (_, i) => ['pluck', CALL1[0] + i * 0.18, 1318.51, 0.02, 0.2, 0.4]), ['tom', CALL1[1], 110, { gain: 0.2, decay: 0.2 }], ['pop', CALL1[1], 440, 0.04, -0.3],
    ...Array.from({ length: 6 }, (_, i) => ['pluck', CALL2[0] + i * 0.18, 1174.66, 0.02, 0.2, -0.4]), ['tom', CALL2[1], 104, { gain: 0.2, decay: 0.2 }], ['pop', CALL2[1], 415.3, 0.04, 0.3],
    ['pop', 19.9, 1318.51, 0.04, 0], ['bell', 20.05, 1760, 0.03, 1.2, 0], ['glitter', 20.05, 20.5],
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const WARN = EP.warn
void BONE
