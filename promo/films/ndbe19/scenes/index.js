// ndbe19: DEALBREAKER OR NOT? E19, "They keep score of | *who texted first.*" (15 s vertical trial reel, cinematic · Bbm).
//   0.0–3.9   frame 0: ♎ Libra mid-type on its phone, a heart text ready; behind it the grey date (no sign) at a tally
//             board: "WHO TEXTED FIRST · ME 4 · YOU 3". 1.5 the date: "your turn to text first." (taps the board). 2.4
//             Libra's heart text deletes itself letter by letter; Libra's phone droops.
//   3.9 the vote · 6.1 the stamp: DEALBREAKER. + "ADDED TO MY DEALBREAKERS".
//   finale    Libra sends the heart anyway, to someone who replies at once: "was JUST about to text you!" — hearts.
//             THE STARS: "Love isn't a *tally.* Text when you miss them."
import { makeDeal, R, box, bubble, label, hearts, sparkles, floor, glow, phoneProp, drawStarChar, signStar, prog, lerp, ease, clamp, pop01, outK, INK, BONE, GOLD, PINK, RED, T } from '../../ndbe01/scenes/dealkit.js'

function tally(x, cx, cy, k = 1) {
  x.save(); x.translate(cx, cy); x.scale(k, k)
  box(x, -170, -120, 340, 240, '#f4f0ff', { b: 7 }); R(x, INK, -6, 120, 12, 70)
  x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = INK
  x.font = "800 22px Inter, sans-serif"; x.fillText('WHO TEXTED FIRST', 0, -88)
  x.font = "800 30px Inter, sans-serif"; x.fillText('ME', -80, -44); x.fillText('YOU', 80, -44)
  const marks = (ox, n) => { for (let i = 0; i < n; i++) R(x, i === 4 ? RED : INK, ox - 40 + i * 18, 0, 8, 70); }
  marks(-80, 4); marks(80, 3)
  x.restore()
}
const SAY = 1.5, DEL = 2.4
const EP = makeDeal({
  id: 'ndbe19', sign: 'libra', date: 'grey', verdict: 'deal', accent: '#ffa6d6', voteMood: 'neutral',
  hook: 'They keep score of | *who texted first.*',
  last: "Love isn't a *tally.* Text when you miss them.",
  scene(x, t, S) {
    const { u, hero, date } = S
    floor(x, 1150, '#2a2040')
    date(x, t, { x: 800, y: 930, s: 220, mood: u > SAY ? 'squint' : 'neutral', look: [-1, -0.4], hops: [SAY, SAY + 0.3] })
    tally(x, 790, 660, 0.85)
    const droop = clamp(prog(u, DEL + 0.4, DEL + 0.8))
    hero(x, t, { x: 300, y: 930, s: 260, mood: u > DEL ? 'neutral' : 'happy', look: u > SAY ? [1, -0.3] : [0.4, 0.8], hops: [SAY + 0.2, DEL] })
    const typed = 'thinking of you ♡', n = u < DEL ? typed.length : Math.max(0, Math.round(typed.length * (1 - prog(u, DEL, DEL + 0.6))))
    phoneProp(x, 470, 940, 0.5, -0.12 + 0.5 * droop, p => { R(p, '#3a3060', 10, 260, 180, 50); p.font = "700 18px 'Space Mono', monospace"; p.fillStyle = BONE; p.textBaseline = 'middle'; p.fillText(typed.slice(0, n) + (Math.sin(t * 8) > 0 ? '|' : ''), 18, 285) })
    bubble(x, t, 640, 470, SAY, 3.85, 'your turn to text first.', { size: 34, tail: 0.2 })
  },
  sceneCues: [['tick', 0.1, 0.03], ['tick', 0.3, 0.03], ['tick', 0.5, 0.03], ['pop', SAY, 523.25, 0.045, 0.3], ['tick', SAY + 0.3, 0.06], ...Array.from({ length: 6 }, (_, i) => ['tick', +(DEL + i * 0.1).toFixed(2), 0.03]), ['pluck', DEL + 0.6, 220, 0.04, 0.8, -0.3]],
  pis: { x: 960, y: 1320, s: 130 },
  finale(x, t, S) {
    const { u, k, hero } = S
    floor(x, 1150, '#2a2040')
    if (k <= 0.01) return
    glow(x, 540, 900, 460, 0.16 * k, '255,166,214')
    hero(x, t, { x: 300, y: 930, s: 250, pop: k, mood: u > 1.4 ? 'heart' : 'happy', look: [1, 0], hops: [T.stamp + 0.8, T.stamp + 1.4] })
    phoneProp(x, 450, 950, 0.45 * k, -0.15)
    drawStarChar(x, 800, 940, 220, t, { ...signStar('aquarius'), pop: k, mood: 'sparkle', look: [-1, 0], seed: 51, hops: [T.stamp + 1.2] })
    bubble(x, t, 330, 690, T.stamp + 0.8, T.out[0], 'thinking of you ♡', { size: 32, col: '#ffd6e8' })
    bubble(x, t, 760, 590, T.stamp + 1.2, T.out[0], 'was JUST about to text you!', { size: 28, col: '#c9f2d4' })
    hearts(x, t, T.stamp + 1.4, 540, 820, { n: 6 })
    sparkles(x, t, 540, 860, T.stamp + 1.3, 8, 160, 1, [GOLD, PINK, BONE])
  },
  finaleCues: [['pop', 0.8, 1174.66, 0.04, -0.3], ['pop', 1.2, 1318.51, 0.045, 0.3], ['pluck', 1.4, 1567.98, 0.04, 0.5, 0]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [label, lerp, ease, pop01, outK]
