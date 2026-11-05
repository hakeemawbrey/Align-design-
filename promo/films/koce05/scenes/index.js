// koce05 · ONE CARD, TWO PEOPLE ep 5 · "Saver or spender?" (20 s vertical, star_advice post, funk · G). Loops.
//   0.0   frame 0: Sagittarius mid-toss of a paper-airplane ticket, Capricorn clutching a piggy bank, the card spinning,
//         Pisces sobbing. Hook: "Saver vs spender. Card's *face down.*"  Colour flash + shake at 0.5.
//   1.1   the card: "Saver or spender?" (real card mo1, Wheel of Fortune, a pick card) · 4.4 both answer
//   7.2   the flip: SAGITTARIUS "Spender. obviously." CAPRICORN "Saver. obviously."
//   7.9   Pisces: "it's over. they're doomed."  THE STARS: "opposites can make a plan."
//   11.6  a jar lands on the table: FUN FUND. Capricorn drops in coins, Sagittarius's paper airplane lands in it.
//   12.4  Capricorn: "i save. you plan the fun."  Sagittarius: "a fun fund? deal."
//   16.9  last line "One jar. *Both* happy." → loops back to frame 0.
import { makeFilm, R, INK, GOLD, BONE, PINK, prog, ease, lerp, clamp, bits, hearts, sparkles } from '../../koce01/scenes/cardkit.js'

function piggy(x, X, Y, k = 1, rot = 0) {
  if (k <= 0.01) return
  x.save(); x.translate(X, Y); x.rotate(rot); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 86, 66, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#ff9fc0'; x.beginPath(); x.ellipse(0, 0, 78, 58, 0, 0, Math.PI * 2); x.fill()
  R(x, INK, 64, -18, 34, 36); R(x, '#ff8fb1', 68, -14, 26, 28); R(x, INK, 76, -6, 4, 6); R(x, INK, 84, -6, 4, 6)
  R(x, INK, -30, -64, 40, 10); R(x, INK, 30, -30, 10, 10); R(x, INK, -50, 50, 18, 26); R(x, INK, 30, 50, 18, 26)
  R(x, '#ffd2e2', -40, -40, 30, 12); x.restore()
}
function plane(x, X, Y, rot, k = 1) {
  if (k <= 0.01) return
  x.save(); x.translate(X, Y); x.rotate(rot); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.moveTo(70, 0); x.lineTo(-60, -40); x.lineTo(-40, 0); x.lineTo(-60, 40); x.closePath(); x.fill()
  x.fillStyle = '#fbf3e2'; x.beginPath(); x.moveTo(60, 0); x.lineTo(-52, -32); x.lineTo(-34, 0); x.lineTo(-52, 32); x.closePath(); x.fill()
  R(x, '#7fc8f0', -30, -6, 50, 5); R(x, '#f2c75c', -30, 4, 34, 5); x.restore()
}
function jar(x, t, X, Y, k, coins) {
  if (k <= 0.01) return
  x.save(); x.translate(X, Y); x.scale(k, k)
  R(x, INK, -86, -190, 172, 196); R(x, 'rgba(190,230,255,0.35)', -78, -182, 156, 180); R(x, INK, -70, -214, 140, 30); R(x, '#a87048', -64, -208, 128, 18)
  for (let i = 0; i < coins; i++) { R(x, INK, -60 + (i % 4) * 32 - 2, -26 - Math.floor(i / 4) * 18 - 2, 30, 18); R(x, GOLD, -60 + (i % 4) * 32, -26 - Math.floor(i / 4) * 18, 26, 14) }
  R(x, INK, -66, -130, 132, 56); R(x, '#fbf3e2', -62, -126, 124, 48)
  x.font = `800 22px Inter, sans-serif`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('FUN', 0, -112); x.fillText('FUND', 0, -88)
  R(x, 'rgba(255,255,255,0.5)', -70, -170, 12, 120)
  x.restore()
}
const JAR = 11.6
const F = makeFilm({
  id: 'koce05', dur: 20, ending: 'loop', brk: 'flash', flashes: [0.5], flashCol: '#9fd86a',
  A: 'sagittarius', B: 'capricorn',
  hook: { text: 'Saver vs spender. Card’s *face down.*', out: 1.25 },
  cards: [{ q: '*Saver* or *spender?*', topic: 'money', kind: 'pick', opts: ['Saver', 'Spender'], at: 1.1, big: 4.0, write: 4.4, reveal: 7.2, done: 11.3, ans: { A: 'Spender. *obviously.*', B: 'Saver. *obviously.*' } }],
  lines: [
    { t: 7.9, who: 'P', text: 'it’s *over.* they’re doomed.' },
    { t: 10.0, who: 'S', text: 'opposites can make a *plan.*' },
    { t: 12.4, who: 'B', text: 'i save. you plan the *fun.*' },
    { t: 14.7, who: 'A', text: 'a *fun fund?* deal.' },
  ],
  boxes: [{ from: 0, to: 4, open: 7.7, close: 16.6 }],
  last: { at: 16.9, text: 'One jar. *Both* happy.', size: 110, accentSize: 140 },
  mood: {
    A: [[0, 'wide', [1, -1], -0.1], [1.1, 'wide', [0.4, -1]], [4.4, 'squint', [0.4, 1]], [7.2, 'happy', [1, -0.6]], [7.9, 'wide', [1, 0]], [10.0, 'neutral', [0, -1]], [12.4, 'sparkle', [1, 0]], [14.7, 'happy', [1, 0]], [15.6, 'heart', [1, 0]]],
    B: [[0, 'squint', [-1, -1]], [1.1, 'wide', [-0.4, -1]], [4.4, 'squint', [-0.4, 1]], [7.2, 'neutral', [-1, -0.6]], [7.9, 'wide', [-1, 0]], [10.0, 'neutral', [0, -1]], [12.4, 'happy', [-1, 0]], [15.6, 'heart', [-1, 0]]],
    P: [[0, 'wide', [0, -1]], [1.1, 'sparkle', [0, -1]], [4.4, 'neutral', [0, 1]], [7.2, 'wide', [0, -1]], [7.9, 'wide', [0, -1]], [10.0, 'neutral', [0, -1]], [12.0, 'sparkle', [0, 1]]],
  },
  cry: [[0, 1.2, 2], [7.4, 10.2, 3], [10.2, 12.0, 1], [15.2, 20, 3]],
  offset: { A: t => [0, -26 * Math.sin(Math.PI * prog(t, 0, 0.8))] },
  cam: [[0, 1, 540, 960], [7.6, 1, 540, 960], [8.2, 1.1, 540, 985], [11.2, 1.1, 540, 985], [11.8, 1.15, 540, 1080], [19.4, 1.15, 540, 1080], [20, 1, 540, 960]],
  punch: [{ at: 7.25, dur: 1.1, z: 0.1, x: 540, y: 820 }],
  draw: {
    cast(x, t, S) {
      const a = S.r.A, b = S.r.B
      // Capricorn's piggy bank: clutched at frame 0, set down on the table by 1.5, comes back for the jar
      const pk = ease.inOutCubic(prog(t, 0.9, 1.5))
      piggy(x, lerp(b.x - 130, b.x - 40, pk), lerp(b.y + 40, 1240, pk), 1, Math.sin(t * 18) * 0.05 * (1 - pk))
      // Sagittarius's paper airplane: mid-toss at frame 0 (flies off by 1.0); later it lands in the jar
      const p0 = prog(t, -0.3, 1.0)
      if (p0 < 1) plane(x, lerp(a.x + 120, 1180, p0), lerp(a.y - 160, 420, p0), -0.4, 1)
      const p1 = ease.inOutCubic(prog(t, 13.3, 14.1))
      if (t > 13.3 && p1 < 1) plane(x, lerp(a.x + 60, 540, p1), lerp(a.y - 120, 1190, p1) - Math.sin(Math.PI * p1) * 200, lerp(-0.3, 0.9, p1), 0.8)
    },
    mid(x, t) {
      const k = ease.outBack(prog(t, JAR, JAR + 0.4))
      const coins = Math.min(8, Math.max(0, Math.floor((t - JAR - 0.5) / 0.15)))
      jar(x, t, 540, 1290, k * 0.72, coins)
      if (t > 14.1) plane(x, 540, 1190, 0.9, 0.55)
    },
    front(x, t) {
      if (t > JAR + 0.5 && t < JAR + 1.8) for (let i = 0; i < 6; i++) { const p = (t - JAR - 0.5 - i * 0.15) / 0.4; if (p > 0 && p < 1) { R(x, INK, 640 - p * 90 - 2, 1000 + p * 200 - 2, 30, 18); R(x, GOLD, 640 - p * 90, 1000 + p * 200, 26, 14) } }
      if (t > 14.1 && t < 15) sparkles(x, t, 540, 1150, 14.1, { n: 8, Rr: 120 })
      if (t > 15.6) hearts(x, t, 15.65, 540, 1040, { n: 7, spread: 260 })
    },
  },
  extraCues: [['whoosh', 0.1, 0.6, 0.04], ['pop', JAR, 659.25, 0.05, 0], ...Array.from({ length: 6 }, (_, i) => ['tick', +(JAR + 0.9 + i * 0.15).toFixed(2), 0.05]), ['whoosh', 13.3, 0.8, 0.04], ['bell', 14.1, 1567.98, 0.03, 1, 0]],
})
export const { DURATION, SCENES, CUES } = F
