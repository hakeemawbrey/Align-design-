// nt2e53: RATE THE EXCUSE, "Skipping the party." (25 s vertical, Trends Vol. 2 ep 53, music: funk · Bbm)
// Format kit: ../../nt2e51/scenes/excusekit.js. Story 0–20.6, then the shared end card.
//   0.0–2.3    hook "Rate the *excuse:* | skipping the holiday party." ♑ Capricorn holding a planner.
//              The couch: ♐ Sagittarius, ♊ Gemini, ♓ Pisces.
//   2.3        #1 "I have a meeting. *with my couch.*" (a tiny armchair with a calendar invite) → 6 · 7 · 6
//   7.0        #2 "my calendar is *full.*" (the planner: every slot says NAP) → 3 · 4 · 2
//   11.7       (card cut) #3 the truth: "big crowds wear me out. *dinner, just us?*" → 10 · 10 · 10
//   16.0       a little table for two with a candle; ♉ Taurus: "yes. obviously."  THE STARS: "Boundaries *with* a plan."
import { makeExcuse, HX, HY, B } from '../../nt2e51/scenes/excusekit.js'
const { R, box, bubble, hearts, shadow, label, lerp, prog, ease, clamp, INK, BONE, GOLD, INTER, MONO } = B

function planner(x, cx, cy, open = 0) {
  box(x, cx - 70, cy - 90, 140, 180, '#7a5a3c', { b: 6 }); R(x, BONE, cx - 58, cy - 78, 116, 156)
  x.font = `700 ${open ? 20 : 18}px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  for (let i = 0; i < 5; i++) { R(x, '#d8cfbd', cx - 50, cy - 62 + i * 30, 100, 3); if (open) { x.fillStyle = '#e8344e'; x.fillText('NAP', cx, cy - 74 + i * 30 + 12) } }
}
function armchair(x, cx, cy) {
  box(x, cx - 70, cy - 60, 140, 90, '#c94a6e', { b: 6 }); box(x, cx - 90, cy - 20, 40, 80, '#a83a5a', { b: 5 }); box(x, cx + 50, cy - 20, 40, 80, '#a83a5a', { b: 5 }); box(x, cx - 60, cy + 20, 120, 40, '#b8405f', { b: 5 })
  box(x, cx - 60, cy - 150, 120, 60, BONE, { b: 4 }); x.font = `700 18px ${MONO}`; x.textAlign = 'center'; x.fillStyle = INK; x.fillText('MEETING', cx, cy - 128); x.fillText('w/ couch', cx, cy - 106)
}
function dinner(x, t, cx, cy) {
  box(x, cx - 140, cy, 280, 26, BONE, { b: 6 }); R(x, INK, cx - 8, cy + 26, 16, 120)
  for (const px of [cx - 80, cx + 80]) { R(x, INK, px - 36, cy - 12, 72, 14); R(x, '#ffffff', px - 30, cy - 9, 60, 8) }
  R(x, INK, cx - 8, cy - 60, 16, 60); R(x, BONE, cx - 4, cy - 56, 8, 56)
  const f = Math.sin(t * 13) * 2; R(x, INK, cx - 9, cy - 86 + f, 18, 28); R(x, '#ffb347', cx - 5, cy - 82 + f, 10, 20); R(x, '#fff1a8', cx - 2, cy - 76 + f, 4, 10)
}
const EP = makeExcuse({
  id: 'nt2e53', hero: 'capricorn', situation: 'skipping *the holiday party.*', accent: '#b8a07a', deep: '#7a5a2c', judges: ['sagittarius', 'gemini'],
  hook(x, t, S) {
    shadow(x, HX, HY + 140, 220)
    S.hero(x, t, { mood: 'squint', look: [1, 0.5], hops: [0.6, 1.5] })
    planner(x, HX + 190, HY + 30)
  },
  excuses: [
    { text: 'I have a meeting. *with my couch.*', scores: [6, 7, 6], mood: 'sparkle', draw(x) { armchair(x, HX + 270, HY + 80) } },
    { text: 'my calendar is *full.*', scores: [3, 4, 2], mood: 'happy', draw(x) { planner(x, HX + 230, HY + 20, 1) } },
    { text: 'big crowds wear me out. *dinner, just us?*', scores: [10, 10, 10], mood: 'wide' },
  ],
  finale(x, t, S) {
    const u = S.u
    const dx = lerp(1200, 790, ease.outCubic(prog(u, 0, 0.7)))
    shadow(x, 300, HY + 140, 200); shadow(x, dx, HY + 140, 200)
    dinner(x, t, 545, HY + 70)
    S.hero(x, t, { x: 300, s: 220, mood: u > 0.9 ? 'heart' : 'happy', look: [1, 0], hops: [17.0, 18.2] })
    B.sign(x, t, 'taurus', { x: dx, y: HY, s: 220, mood: 'happy', look: [-1, 0], seed: 7, hops: [16.5, 18.3] })
    bubble(x, t, 780, HY - 230, 16.3, 19.9, 'yes. obviously.', { size: 34, tail: 0.2 })
    hearts(x, t, 18.2, 545, HY - 80, { n: 6 })
  },
  last: 'Boundaries *with* a plan.',
  hookCues: [['pop', 0.6, 659.25, 0.03, 0.3]],
  finCues: [['whoosh', 0.05, 0.5, 0.03], ['pop', 0.3, 880, 0.04, 0.3], ['glitter', 2.2, 2.7]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void GOLD; void INTER; void label
