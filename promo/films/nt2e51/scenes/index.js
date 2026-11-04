// nt2e51: RATE THE EXCUSE, "Late to the date." (25 s vertical, Trends Vol. 2 ep 51, music: funk · Gm)
// Format kit: ./excusekit.js (shared by nt2e51–nt2e55). Story 0–20.6, then the shared end card.
//   0.0–2.3    hook "Rate the *excuse:* | late to the date." ♐ Sagittarius bursting in mid-run, out of breath.
//              The couch: ♊ Gemini, ♈ Aries, ♓ Pisces (tissues).
//   2.3        #1 "a dog needed *directions.*" (a little dog with a map) → 4 · 5 · 6
//   7.0        #2 "I took the scenic route. *three times.*" (a loop-the-loop arrow) → 2 · 3 · 2
//   11.7       (card cut) #3 the truth: "I got nervous and changed outfits *four times.*" (a pile of tops) → 10 · 10 · 10
//   16.0       ♎ Libra (the date) arrives: "the fourth one was the one."  THE STARS: "Honest is the *best* outfit."
import { makeExcuse, HX, HY, B } from './excusekit.js'
const { R, box, drawBits, bubble, hearts, shadow, label, lerp, prog, ease, clamp, INK, BONE, GOLD } = B

const DOG = ['..BB......', '.BBBB.....', 'BBEBBBBBBB', 'BBBBBBBBBB', '..BBBBBBB.', '..B.B..B.B']
function dog(x, t, cx, cy) {
  drawBits(x, DOG, { B: '#c9844a', E: INK }, cx, cy + Math.abs(Math.sin(t * 8)) * -6, 14)
  box(x, cx + 50, cy - 110, 90, 64, '#efe6d6', { b: 4 }); R(x, '#7fd0ff', cx + 60, cy - 100, 30, 20); R(x, '#9fe6b0', cx + 95, cy - 80, 36, 24); R(x, '#e8344e', cx + 80, cy - 90, 8, 8)
}
function loop(x, t, u) {
  const pts = []; for (let i = 0; i <= 80; i++) { const a = i / 80 * Math.PI * 6; pts.push([HX + 260 + Math.cos(a) * 70 - i * 0.6, HY - 40 + Math.sin(a) * 70 + i * 1.2]) }
  const n = Math.floor(clamp(u / 1.6) * pts.length)
  for (let i = 0; i < n; i += 2) { R(x, INK, pts[i][0] - 7, pts[i][1] - 7, 14, 14); R(x, GOLD, pts[i][0] - 4, pts[i][1] - 4, 8, 8) }
  void t
}
function tops(x, cx, cy, n = 4) {
  const C = ['#e8344e', '#7fd0ff', '#9fe6b0', '#f2c75c']
  for (let i = 0; i < n; i++) { const yy = cy - i * 26, xx = cx + (i % 2 ? 14 : -10); box(x, xx - 60, yy - 22, 120, 40, C[i], { b: 5 }); R(x, INK, xx - 14, yy - 22, 28, 10) }
}

const EP = makeExcuse({
  id: 'nt2e51', hero: 'sagittarius', situation: 'late *to the date.*', accent: '#c58cff', deep: '#7a3fc0', judges: ['gemini', 'aries'],
  hook(x, t, S) {
    shadow(x, HX, HY + 140, 220)
    for (let i = 0; i < 5; i++) R(x, 'rgba(239,230,214,0.6)', HX - 330 - ((t * 700 + i * 50) % 140), HY - 80 + i * 40, 90, 6)
    S.hero(x, t, { mood: 'wide', look: [1, 0], squash: 0.07 * Math.sin(t * 16), hops: [0.2, 0.55, 0.9, 1.25, 1.6, 1.95] })
    label(x, 'huff… huff…', HX + 230, HY - 150, { size: 30, col: BONE, rot: 0.08 })
  },
  excuses: [
    { text: 'a dog needed *directions.*', scores: [4, 5, 6], mood: 'sparkle', draw(x, t) { dog(x, t, HX + 250, HY + 90) }, cues: [['pop', 0.6, 1046.5, 0.03, 0.5]] },
    { text: 'I took the scenic route. *three times.*', scores: [2, 3, 2], mood: 'happy', draw(x, t, S) { loop(x, t, S.u) } },
    { text: 'I got nervous and changed outfits *four times.*', scores: [10, 10, 10], mood: 'wide', draw(x) { tops(x, HX + 250, HY + 110) } },
  ],
  finale(x, t, S) {
    const u = S.u
    const dx = lerp(1200, 790, ease.outCubic(prog(u, 0, 0.7)))
    shadow(x, 430, HY + 140, 200); shadow(x, dx, HY + 140, 200)
    S.hero(x, t, { x: 430, s: 230, mood: u > 0.9 ? 'heart' : 'wide', blush: 1, look: [1, 0], hops: [17.0, 18.2] })
    B.sign(x, t, 'libra', { x: dx, y: HY, s: 220, mood: 'happy', look: [-1, 0], seed: 7, hops: [16.5, 18.3] })
    bubble(x, t, 760, HY - 230, 16.3, 19.9, 'the fourth one was the one.', { size: 32, tail: 0.2 })
    hearts(x, t, 18.2, 610, HY - 60, { n: 6 })
  },
  last: 'Honest is the *best* outfit.',
  hookCues: [['tick', 0.2, 0.04], ['tick', 0.55, 0.04], ['tick', 0.9, 0.04], ['tick', 1.25, 0.04]],
  finCues: [['whoosh', 0.05, 0.5, 0.03], ['pop', 0.3, 880, 0.04, 0.3], ['glitter', 2.2, 2.7]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void GOLD
