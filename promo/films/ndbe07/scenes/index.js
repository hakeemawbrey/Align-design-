// ndbe07: DEALBREAKER OR NOT? E7, "They can't pick | a *restaurant.*" (15 s vertical trial reel, music: jazzy · Bb).
//   0.0–3.9   frame 0: ♎ Libra mid-spin between two glowing menus (NOODLES? TACOS?). 0.8 a third (SOUP?), 1.4 a fourth
//             (PIZZA?), 1.9 a fifth (DUMPLINGS?). ♈ Aries' stomach growls (GRRR) at 1.6. 2.5 Aries holds up two
//             fingers: "pick from two." → the extra menus vanish.
//   3.9 the vote · 6.1 the stamp: NOT A DEALBREAKER.
//   finale    two menus, Libra taps NOODLES instantly: "noodles!" Two steaming bowls; hearts.
//             THE STARS: "Offer two choices. Love is a *short* menu."
import { makeDeal, R, box, bubble, label, hearts, sparkles, floor, glow, prog, lerp, ease, clamp, pop01, outK, INK, BONE, GOLD, PINK, T } from '../../ndbe01/scenes/dealkit.js'

export function menu(x, t, cx, cy, txt, k = 1, col = '#ffe6a8', rot = 0) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy + 6 * Math.sin(t * 2.5 + cx)); x.rotate(rot); x.scale(k, k)
  glow(x, 0, 0, 150, 0.18, '255,230,170')
  box(x, -95, -60, 190, 120, col, { b: 6 })
  x.font = "800 30px Inter, sans-serif"; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = INK; x.fillText(txt, 0, -14)
  for (let i = 0; i < 3; i++) R(x, 'rgba(27,18,54,0.35)', -60, 16 + i * 12, 120 - i * 20, 5)
  x.restore()
}
function bowl(x, t, cx, cy, k) {
  x.save(); x.translate(cx, cy); x.scale(k, k)
  box(x, -60, -20, 120, 44, BONE, { b: 5 }); R(x, '#e8b04a', -54, -24, 108, 10)
  x.globalAlpha *= 0.55; for (let i = 0; i < 3; i++) { const p = (t * 0.9 + i / 3) % 1; R(x, '#f4f0ff', -24 + i * 22 + 5 * Math.sin(t * 4 + i), -40 - p * 50, 7, 14) }
  x.restore()
}
const MENUS = [['NOODLES?', 300, 560, -1], ['TACOS?', 780, 560, -1], ['SOUP?', 540, 470, 0.8], ['PIZZA?', 200, 760, 1.4], ['DUMPLINGS?', 870, 760, 1.9]]
const GROWL = 1.6, TWO = 2.5
const EP = makeDeal({
  id: 'ndbe07', sign: 'libra', date: 'aries', verdict: 'not', accent: '#ffa6d6',
  hook: "They can't pick | a *restaurant.*",
  last: 'Offer two choices. Love is a *short* menu.',
  scene(x, t, S) {
    const { u, hero, date } = S
    floor(x, 1150, '#2a2040')
    MENUS.forEach(([s, mx, my, at], i) => { const k = pop01(t, at, 0.3, 2.3) * (i > 1 ? outK(t, [TWO + 0.1, TWO + 0.3]) : 1); menu(x, t, mx, my, s, k, i % 2 ? '#bfe8ff' : '#ffe6a8', (i - 2) * 0.05) })
    const spin = u < TWO ? Math.sin(u * 7) : 0
    hero(x, t, { x: 460, y: 960, s: 260, mood: u < TWO ? 'wide' : 'sparkle', look: [spin > 0 ? 1 : -1, -0.8], squash: 0.06 * spin, hops: [0.3, 0.9, 1.5, 2.0, TWO + 0.2] })
    date(x, t, { x: 820, y: 1000, s: 210, mood: u > TWO ? 'happy' : u > GROWL ? 'squint' : 'neutral', look: [-1, 0], hops: [GROWL, TWO] })
    const gk = pop01(t, GROWL, 0.2, 3) * outK(t, [GROWL + 0.7, GROWL + 0.9])
    if (gk > 0.01) label(x, 'GRRR', 880, 1150, { size: 44 * gk, col: '#ffb347', font: 'Inter, sans-serif', weight: 800, rot: 0.1 * Math.sin(t * 40) })
    bubble(x, t, 760, 860, TWO, 3.85, 'pick from two.', { size: 36, tail: 0.3 })
  },
  sceneCues: [...MENUS.filter(m => m[3] >= 0).map((m, i) => ['pop', m[3], [880, 987.77, 1174.66][i], 0.045, 0]), ['tom', GROWL, 70, { gain: 0.2, decay: 0.4 }], ['pop', TWO, 659.25, 0.045, 0.3], ['whoosh', TWO + 0.1, 0.3, 0.03]],
  pis: { x: 960, y: 1320, s: 130 },
  finale(x, t, S) {
    const { u, k, hero, date } = S
    floor(x, 1150, '#2a2040')
    if (k <= 0.01) return
    const pick = u > 0.9
    menu(x, t, 330, 690, 'NOODLES?', k * (pick ? 1.12 : 1))
    menu(x, t, 750, 690, 'TACOS?', k * (pick ? outK(t, [T.stamp + 0.95, T.stamp + 1.2]) : 1), '#bfe8ff')
    hero(x, t, { x: 360, y: 1000, s: 230, pop: k, mood: pick ? 'sparkle' : 'neutral', look: [0, -1], hops: [T.stamp + 0.9] })
    date(x, t, { x: 720, y: 1010, s: 210, pop: k, mood: u > 1.6 ? 'heart' : 'happy', look: [-1, 0], hops: [T.stamp + 1.6] })
    bubble(x, t, 540, 830, T.stamp + 0.9, T.out[0], 'noodles!', { size: 36, tail: -0.2 })
    const bk = pop01(t, T.stamp + 1.5, 0.3, 2.2)
    if (bk > 0.01) { bowl(x, t, 450, 1110, bk); bowl(x, t, 640, 1110, bk) }
    sparkles(x, t, 330, 690, T.stamp + 0.92, 8, 120, 1, [GOLD, PINK, BONE])
    hearts(x, t, T.stamp + 1.6, 720, 880, { n: 4 })
  },
  finaleCues: [['pop', 0.9, 1174.66, 0.045, -0.3], ['glitter', 0.92, 1.3], ['pop', 1.5, 880, 0.04, 0], ['pluck', 1.6, 1567.98, 0.035, 0.5, 0.3]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [lerp, ease, clamp]
