// ndbe05: DEALBREAKER OR NOT? E5, "They photograph | *every* dessert." (13 s vertical trial reel, music: funk · E).
//   0.0–3.9   frame 0: ♌ Leo mid-snap over a layer cake, phone up, FLASH popping. Flash at 0.6 (new angle, low), 1.2
//             (overhead, on tiptoe), 1.8. ♐ Sagittarius' fork hovers… 2.2: "…can I eat it now?" 2.9 Leo slides Sag the
//             first slice.
//   3.9 the vote · 6.1 the stamp: NOT A DEALBREAKER.
//   finale    Sag eats, beaming; Leo takes ONE more photo… of Sag. Hearts. THE STARS: "Let the cake have its moment.
//             *Then* share."
import { makeDeal, R, box, bubble, label, hearts, sparkles, table, floor, glow, phoneProp, prog, lerp, ease, clamp, pop01, outK, INK, BONE, GOLD, PINK, T } from '../../ndbe01/scenes/dealkit.js'

function cake(x, cx, cy, s = 1, sliced = 0) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  box(x, -110, -4, 220, 14, BONE, { b: 5 })
  box(x, -80, -110, 160, 106, '#f6d6e6', { b: 6 }); R(x, '#8a4a3c', -80, -70, 160, 16); R(x, '#8a4a3c', -80, -36, 160, 16)
  R(x, '#ffffff', -80, -110, 160, 18); for (let i = 0; i < 5; i++) R(x, '#e8344e', -66 + i * 32, -128, 16, 16)
  if (sliced) { R(x, '#1b1236', 30, -112, 52, 110); R(x, '#30234a', 36, -106, 44, 100) }
  x.restore()
}
function slice(x, cx, cy) { x.save(); x.translate(cx, cy); box(x, -60, -4, 120, 12, BONE, { b: 4 }); box(x, -26, -60, 52, 56, '#f6d6e6', { b: 5 }); R(x, '#8a4a3c', -26, -40, 52, 10); R(x, '#8a4a3c', -26, -20, 52, 10); R(x, '#e8344e', -8, -76, 16, 16); x.restore() }
function flashAt(x, t, t0, cx, cy) {
  const d = t - t0; if (d < 0 || d > 0.35) return
  const a = 1 - d / 0.35
  x.save(); x.globalCompositeOperation = 'lighter'; glow(x, cx, cy, 420, 0.55 * a, '255,255,240'); x.restore()
  label(x, 'FLASH!', cx, cy - 120, { size: 40, col: GOLD, font: 'Inter, sans-serif', weight: 800, alpha: a, rot: -0.1 })
}
const FL = [-0.1, 0.6, 1.2, 1.8], SAY = 2.2, GIVE = 2.9
const EP = makeDeal({
  id: 'ndbe05', sign: 'leo', date: 'sagittarius', verdict: 'not', accent: '#ffb347',
  hook: 'They photograph | *every* dessert.',
  last: 'Let the cake have its moment. *Then* share.',
  scene(x, t, S) {
    const { u, hero, date } = S
    floor(x, 1150, '#30234a')
    // Leo moves for a new angle each flash
    const ang = u < 0.6 ? 0 : u < 1.2 ? 1 : u < 1.8 ? 2 : 3
    const lx = [300, 260, 360, 300][ang], ly = [850, 900, 800, 850][ang]
    hero(x, t, { x: lx, y: ly, s: 250, mood: u > GIVE ? 'happy' : 'sparkle', look: [1, 0.6], hops: FL.filter(f => f > 0).concat([GIVE]) })
    date(x, t, { x: 800, y: 870, s: 230, mood: u > GIVE + 0.1 ? 'heart' : u > 1.5 ? 'eyeroll' : 'wide', look: [-1, 0.6], hops: [SAY, GIVE + 0.1] })
    table(x, 560, 1010, 680)
    cake(x, 560, 1000, 1, u > GIVE ? 1 : 0)
    if (u < GIVE) phoneProp(x, lx + 130, ly - 20 + (ang === 2 ? -40 : 0), 0.38, ang === 1 ? 0.3 : -0.1, p => { R(p, '#f6d6e6', 40, 120, 120, 100); R(p, '#e8344e', 60, 100, 20, 20) })
    // Sag's fork hovering
    if (u < GIVE) { const fy = 900 + 12 * Math.sin(t * 6); R(x, INK, 680, fy, 10, 90); R(x, '#d8d4e8', 683, fy + 3, 4, 84); R(x, INK, 672, fy - 30, 26, 32); for (let i = 0; i < 3; i++) R(x, '#d8d4e8', 675 + i * 7, fy - 28, 4, 28) }
    if (u > GIVE) { const p = ease.outCubic(prog(u, GIVE, GIVE + 0.4)); slice(x, lerp(600, 760, p), 1000) }
    FL.forEach(f => flashAt(x, t, f, 560, 900))
    bubble(x, t, 790, 640, SAY, 3.85, '…can I eat it now?', { size: 34, tail: 0.2 })
    hearts(x, t, GIVE + 0.15, 800, 760, { n: 4 })
    sparkles(x, t, 760, 960, GIVE + 0.35, 8, 80, 1, [GOLD, PINK, BONE])
  },
  sceneCues: [...FL.filter(f => f >= 0).flatMap(f => [['tick', f, 0.08], ['pop', f + 0.02, 1760, 0.035, -0.2]]), ['pop', SAY, 739.99, 0.04, 0.3], ['whoosh', GIVE, 0.3, 0.03], ['pluck', GIVE + 0.35, 1318.51, 0.04, 0.5, 0.3]],
  pis: { x: 960, y: 1320, s: 130 },
  finale(x, t, S) {
    const { u, k, hero, date } = S
    floor(x, 1150, '#30234a')
    if (k <= 0.01) return
    hero(x, t, { x: 310, y: 860, s: 240, pop: k, mood: u > 1.8 ? 'heart' : 'happy', look: [1, 0], hops: [T.stamp + 1.6] })
    const chew = Math.abs(Math.sin(t * 9))
    date(x, t, { x: 780, y: 870, s: 230, pop: k, mood: 'happy', look: [-1, 0], squash: 0.04 * chew, hops: [T.stamp + 0.9] })
    table(x, 560, 1010, 680)
    cake(x, 500, 1000, k, 1)
    slice(x, 760, 1000)
    if (u > 1.0 && u < 1.6) phoneProp(x, 440, 820, 0.36 * k, 0.15)
    flashAt(x, t, T.stamp + 1.6, 780, 860)
    hearts(x, t, T.stamp + 1.75, 545, 800, { n: 5 })
  },
  finaleCues: [['tick', 1.6, 0.08], ['pop', 1.62, 1760, 0.035, 0.3], ['pluck', 1.75, 1174.66, 0.04, 0.5, 0]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [clamp, pop01, outK]
