// kaue05 · ACHIEVEMENT UNLOCKED: SINGLE LIFE E05 "Bought myself the flowers" (15 s, funk · A, loop).
//   0.0  Frame 0: Leo mid-spin with a giant bouquet, petals flying, mid whip zoom. Hook "Delivery for… *me?*"
//   2.2  whip zoom onto the card: TO: LEO · FROM: LEO ♡ → 3.4 ★ SELF-GIFTED
//   5.6  the photo shoot: Leo poses with the bouquet, flash, flash → 7.0 ★ PHOTO SHOOT · 1 MODEL
//   8.6  Pisces cam sobbing: "the CARD though"   9.4 Leo smells the flowers, hearts
//   11.0 last line "Sent by me. *Loved* by me." · 14.6–15.0 loops back into the spin.
import { makeAch } from '../../kaue01/achengine.js'
import { hero, R, box, label, sparkles, hearts, prog, ease, lerp, INK, BONE, GOLD, PINK, RED } from '../../kaue01/achkit.js'
import { daySky } from '../../st9day.js'
import { drawLeoHome } from '../../st9leohome.js'

const FL = [[-70, -150, '#ff5c8a'], [0, -190, '#ffd24a'], [70, -150, '#ff8fb1'], [-40, -100, '#e8344e'], [40, -105, '#ffffff'], [-100, -95, '#ffb03a'], [100, -95, '#c9a6ff'], [0, -130, '#ff5c8a']]
function bouquet(x, t, X, Y, s, rot) {
  x.save(); x.translate(X, Y); x.rotate(rot); x.scale(s, s)
  // stems + leaves
  for (let k = -2; k <= 2; k++) R(x, '#3f9a5a', k * 18 - 4, -110, 8, 150)
  for (const [fx, fy, c] of FL) { box(x, fx - 26, fy - 26, 52, 52, c, { b: 5 }); R(x, '#ffd24a', fx - 8, fy - 8, 16, 16) }
  // wrap (a pink cone)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-130, -80); x.lineTo(130, -80); x.lineTo(20, 130); x.lineTo(-20, 130); x.closePath(); x.fill()
  x.fillStyle = '#ffb8d2'; x.beginPath(); x.moveTo(-118, -74); x.lineTo(118, -74); x.lineTo(14, 120); x.lineTo(-14, 120); x.closePath(); x.fill()
  R(x, RED, -60, 0, 120, 18)
  x.restore()
}
const CARD = [700, 1000]
function card(x, t) {
  x.save(); x.translate(...CARD); x.rotate(0.08)
  R(x, INK, -4, 0, 8, 110)
  box(x, -110, -120, 220, 130, BONE, { b: 6 })
  label(x, 'TO: LEO', 0, -86, { size: 30, col: INK })
  label(x, 'FROM: LEO ♡', 0, -38, { size: 28, col: RED })
  x.restore()
}
function scene(x, t, S) {
  daySky(x, t, { hour: 17 })
  drawLeoHome(x, t, { room: 'bedroom' })
  const spin = Math.max(0, 1 - t / 1.2)
  const pose = S.i === 2
  hero(x, t, 'leo', 470, 1230, 320, { mood: t < 1.2 ? 'wide' : t < 5.6 ? 'sparkle' : t < 9.4 ? 'wink' : 'heart', look: [1, -1], squash: spin * 0.22 * Math.sin(t * 20), hops: [5.7, 6.3, 6.9, 9.5], seed: 9, crown: true, blink: t < 1.2 ? false : undefined })
  bouquet(x, t, 680, 1240, 1.15, (pose ? -0.25 : 0.1) + spin * Math.sin(t * 14) * 0.5)
  card(x, t)
  // petals flying at frame 0
  if (t < 1.8) for (let k = 0; k < 14; k++) { const a = k * 2.4, d = 120 + (t + 0.3) * 420 * (0.6 + (k % 4) * 0.15); R(x, FL[k % FL.length][2], 680 + Math.cos(a) * d, 1080 + Math.sin(a) * d * 0.6 + t * t * 300, 16, 12) }
  sparkles(x, t, CARD[0], CARD[1] - 60, 3.4, 10, 180, 0.4)
  hearts(x, t, 9.5, 600, 1000, { n: 7 })
}

export const { DURATION, SCENES, CUES } = makeAch({
  dur: 15, ending: 'loop', key: 'A',
  shots: [{ at: 0, cam: [1.15, 560, 1150] }, { at: 2.2, cam: [2.0, 700, 960], push: 0.06 }, { at: 5.6, cam: [1.2, 560, 1150] }, { at: 9.2, cam: [1.15, 560, 1150], noBlink: true, silent: true }],
  scene,
  whips: [{ at: -0.22, from: 1.45, blur: 8, cx: 600, cy: 1150 }, { at: 2.2, from: 1.5 }],
  flashes: [{ at: 5.9, a: 0.8 }, { at: 6.5, a: 0.8 }, { at: 7.1, a: 0.6 }],
  shakes: [{ at: 0.02, dur: 0.35, amp: 14 }],
  hook: { text: 'Delivery for… *me?*', out: 2.1, size: 110, accentSize: 150 },
  bubbles: [
    { at: 5.7, out: 7.0, x: 470, y: 900, text: 'get my good side. (both)', tail: 0 },
    { at: 12.4, out: 14.3, x: 470, y: 900, text: 'same time next week, me?', tail: 0 },
  ],
  achs: [
    { at: 3.4, out: 5.3, title: 'SELF-GIFTED', xp: 150, icon: 'heart' },
    { at: 7.2, out: 8.9, title: 'PHOTO SHOOT · 1 MODEL', xp: 100, icon: 'star' },
  ],
  cams: [{ at: 8.6, out: 11.4, line: 'the CARD though', lineAt: 9.0, tears: 3, mood: 'sparkle' }],
  last: { at: 11.0, text: 'Sent by me. | *Loved* by me.', top: 330, out: 14.5 },
  cues: [['pop', 5.92, 1760, 0.03, 0], ['pop', 6.52, 1760, 0.03, 0], ['pop', 7.12, 1760, 0.03, 0]],
})
