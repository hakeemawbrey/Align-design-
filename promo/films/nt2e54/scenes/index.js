// nt2e54: RATE THE EXCUSE, "Not dancing." (25 s vertical, Trends Vol. 2 ep 54, music: funk · Cm)
// Format kit: ../../nt2e51/scenes/excusekit.js. Story 0–20.6, then the shared end card.
//   0.0–2.3    hook "Rate the *excuse:* | won't dance at the party." ♌ Leo posing by a light-up dance floor.
//              The couch: ♈ Aries, ♒ Aquarius, ♓ Pisces.
//   2.3        #1 "these shoes are too iconic *to scuff.*" (sparkly shoes) → 7 · 6 · 8
//   7.0        #2 "the floor isn’t *ready for me.*" (the floor tiles flicker nervously) → 4 · 3 · 5
//   11.7       (card cut) #3 the truth: "I don’t know how. *teach me?*" → 10 · 10 · 10
//   16.0       ♐ Sagittarius teaches: step, step, spin; both bouncing. THE STARS: "‘*Teach* me’ is a move."
import { makeExcuse, HX, HY, B } from '../../nt2e51/scenes/excusekit.js'
const { R, box, bubble, hearts, shadow, label, sparkles, lerp, prog, ease, clamp, INK, BONE, GOLD, PINK } = B

function floor(x, t, nervous = 0) {
  const C = ['#ff8fb1', '#7fd0ff', '#f2c75c', '#9fe6b0', '#c58cff']
  for (let r = 0; r < 3; r++) for (let c = 0; c < 8; c++) {
    const on = (Math.floor(t * 4) + r + c) % 3 === 0 && !(nervous && Math.sin(t * 30 + c) > 0)
    R(x, INK, 40 + c * 126, 960 + r * 56, 124, 54); R(x, on ? C[(r + c) % 5] : '#3a2d66', 44 + c * 126, 964 + r * 56, 116, 46)
  }
}
function shoes(x, t, cx, cy) {
  for (const d of [-1, 1]) { box(x, cx + d * 60 - 50, cy - 26, 100, 44, GOLD, { b: 5, hi: '#fff1a8' }); R(x, INK, cx + d * 60 - 50, cy + 18, 100, 10) }
  sparkles(x, t, cx, cy - 10, Math.floor(t * 2) / 2, 6, 90, 1, [BONE, GOLD])
}
const EP = makeExcuse({
  id: 'nt2e54', hero: 'leo', situation: 'won’t dance *at the party.*', accent: '#f39a3a', deep: '#c45a12', judges: ['aries', 'aquarius'],
  hook(x, t, S) {
    floor(x, t)
    shadow(x, HX, HY + 140, 220)
    S.hero(x, t, { mood: 'sparkle', look: [0, 0], squash: -0.04, hops: [0.4, 1.4] })
    label(x, '*strikes a pose*', HX + 230, HY - 160, { size: 28, col: BONE, rot: 0.08 })
  },
  excuses: [
    { text: 'these shoes are too iconic *to scuff.*', scores: [7, 6, 8], mood: 'sparkle', draw(x, t) { floor(x, t); shoes(x, t, HX + 260, HY + 110) } },
    { text: 'the floor isn’t *ready for me.*', scores: [4, 3, 5], mood: 'happy', draw(x, t) { floor(x, t, 1); label(x, '(it’s ready)', HX + 290, HY - 120, { size: 28, col: BONE }) } },
    { text: 'I don’t know how. *teach me?*', scores: [10, 10, 10], mood: 'wide', draw(x, t) { floor(x, t) } },
  ],
  finale(x, t, S) {
    const u = S.u
    floor(x, t)
    const dx = lerp(1200, 760, ease.outCubic(prog(u, 0, 0.6)))
    const beat = [16.6, 17.1, 17.6, 18.1, 18.6, 19.1, 19.6]
    shadow(x, 360, HY + 140, 200); shadow(x, dx, HY + 140, 200)
    S.hero(x, t, { x: 360, s: 220, mood: 'happy', look: [1, 0], hops: beat.map(b => b + 0.05), squash: u > 2 && u < 2.4 ? 0.1 : 0 })
    B.sign(x, t, 'sagittarius', { x: dx, y: HY, s: 220, mood: 'happy', look: [-1, 0], seed: 7, hops: beat })
    bubble(x, t, 760, HY - 230, 16.4, 19.9, 'step, step, spin!', { size: 34, tail: 0.2 })
    hearts(x, t, 18.0, 560, HY - 80, { n: 5, cols: [PINK, GOLD, '#7fd0ff'] })
  },
  last: '‘*Teach* me’ is a move.',
  hookCues: [['pop', 0.4, 880, 0.03, 0.3], ['pluck', 1.4, 1318.51, 0.03, 0.4, 0]],
  finCues: [0.6, 1.1, 1.6, 2.1, 2.6].map(b => ['tick', b, 0.05]),
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void clamp
