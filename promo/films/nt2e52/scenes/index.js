// nt2e52: RATE THE EXCUSE, "The slow reply." (25 s vertical, Trends Vol. 2 ep 52, music: funk · Am)
// Format kit: ../../nt2e51/scenes/excusekit.js. Story 0–20.6, then the shared end card.
//   0.0–2.3    hook "Rate the *excuse:* | took a day to text back." ♒ Aquarius peeking over a phone.
//              The couch: ♍ Virgo, ♌ Leo, ♓ Pisces.
//   2.3        #1 "my phone was in my *other jacket.*" (a jacket, buzzing) → 5 · 4 · 5
//   7.0        #2 "I was writing a draft. *it’s a novel now.*" (a scroll unrolling to the floor) → 3 · 2 · 3
//   11.7       (card cut) #3 the truth: "I didn’t know what to say, but *I wanted to say something.*" → 10 · 10 · 10
//   16.0       the phone lights up: ♋ Cancer replies "glad you did." THE STARS: "Wanting to *counts*."
import { makeExcuse, HX, HY, B } from '../../nt2e51/scenes/excusekit.js'
const { R, box, bubble, hearts, shadow, label, lerp, prog, ease, clamp, INK, BONE, GOLD, INTER } = B

function phone(x, t, cx, cy, s = 1, lit = 0) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  box(x, -60, -110, 120, 220, '#2a2148', { b: 6 }); R(x, lit ? '#3a3a7a' : '#14102a', -50, -96, 100, 180)
  if (lit) { box(x, -42, -40, 84, 40, '#9fe6b0', { b: 3 }); x.font = `800 16px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = INK; x.fillText('glad you did.', 0, -20) }
  x.restore(); void t
}
function jacket(x, t, cx, cy) {
  const j = 4 * Math.sin(t * 50)
  box(x, cx - 80 + j, cy - 70, 160, 150, '#3fb08a', { b: 6 }); R(x, INK, cx - 4 + j, cy - 70, 8, 150); box(x, cx - 60 + j, cy + 10, 40, 34, '#2f8a6a', { b: 4 })
  label(x, 'bzzt', cx + 110, cy - 60, { size: 28, col: BONE, rot: 0.2 })
}
function scroll(x, t, u, cx, cy) {
  const L = lerp(40, 520, ease.outCubic(clamp(u / 1.8)))
  box(x, cx - 70, cy - 40, 140, L, BONE, { b: 5 })
  for (let i = 0; i < L / 22 - 1; i++) R(x, '#b9a88e', cx - 54, cy - 24 + i * 22, 108 - (i % 3) * 20, 6)
  box(x, cx - 84, cy - 56, 168, 26, '#c9844a', { b: 5 })
}
const EP = makeExcuse({
  id: 'nt2e52', hero: 'aquarius', situation: 'took a day *to text back.*', accent: '#7fd0ff', deep: '#1f6fae', judges: ['virgo', 'leo'],
  hook(x, t, S) {
    shadow(x, HX, HY + 140, 220)
    S.hero(x, t, { mood: 'wide', look: [1, 0.6], squash: 0.03, hops: [0.8] })
    phone(x, t, HX + 120, HY + 40, 0.9)
    label(x, 'seen 1 day ago', HX + 220, HY - 150, { size: 26, col: BONE, rot: 0.06 })
  },
  excuses: [
    { text: 'my phone was in my *other jacket.*', scores: [5, 4, 5], mood: 'sparkle', draw(x, t) { jacket(x, t, HX + 260, HY + 40) } },
    { text: 'I was writing a draft. *it’s a novel now.*', scores: [3, 2, 3], mood: 'happy', draw(x, t, S) { scroll(x, t, S.u, HX + 260, HY - 120) } },
    { text: 'I didn’t know what to say, but *I wanted to say something.*', scores: [10, 10, 10], mood: 'wide', draw(x, t) { hearts(x, t, 12.4, HX, HY - 100, { n: 4 }) } },
  ],
  finale(x, t, S) {
    const u = S.u
    shadow(x, HX, HY + 140, 220)
    S.hero(x, t, { mood: u > 0.6 ? 'heart' : 'wide', blush: 1, look: [1, 0.4], hops: [16.6, 17.2] })
    phone(x, t, HX + 170, HY + 20, 1.1, u > 0.4 ? 1 : 0)
    if (u > 0.4) label(x, 'ding!', HX + 300, HY - 140, { size: 40, col: GOLD, font: INTER, weight: 800, alpha: clamp(prog(u, 0.4, 0.5)) })
    hearts(x, t, 16.7, HX + 170, HY - 120, { n: 5 })
    void bubble
  },
  last: 'Wanting to *counts*.',
  hookCues: [['pop', 0.8, 659.25, 0.03, 0.3]],
  finCues: [['bell', 0.4, 1567.98, 0.04, 1.0, 0.3], ['pop', 0.45, 2093.0, 0.03, 0.3], ['glitter', 0.7, 1.2]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
