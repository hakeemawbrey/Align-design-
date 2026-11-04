// nvse18: SIGN VS SIGN, "Who handles the sweater party better?" ♑ Capricorn vs ♒ Aquarius (18 s trial reel, b46,
// music: chiptune · G). Story 0–13.6, then the shared end card. Format: ../../nvse01/scenes/versuskit.js.
//   hook: two sweaters float between them, a grey one and a loud one.
//   ROUND 1 ♑ "wears a *tasteful* grey sweater." one stripe; then it switches to the reindeer one. "it’s festive. it has a stripe." → "…fine. the reindeer one."
//   ROUND 2 ♒ "knitted one that *lights up and beeps.*" blinking lights, a tune, then a clock. "it plays a little tune!" → "it also tells the time."
//   VERDICT "BOTH. | *Had the most fun.*"  THE STARS: "Wear the thing that makes you smile."
import { makeVersus, drawProp, label, R, INK, pop01, SW, T, GOLD, PINK, SKYB, MINT } from '../../nvse01/scenes/versuskit.js'

const AQS = ['.TT..TT.', 'TTTTTTTT', 'TTTTTTTT', 'TTTTTTTT', 'TTTTTTTT', 'TTTTTTTT', '.TTTTTT.']
function lightSweater(x, t, cx, cy, cell, clock) {
  drawProp(x, 'sweaterG', cx, cy, cell, { cols: { M: '#2f8a8a', S: '#2f8a8a' } })
  void AQS
  const pts = [[-2.5, -1.5], [0, -2], [2.5, -1.5], [-2.5, 1], [2.5, 1], [-1.2, 2.3], [1.2, 2.3], [0, 0.3]]
  pts.forEach(([px, py], i) => { const on = Math.sin(t * 8 + i * 1.7) > 0; R(x, INK, cx + px * cell - 7, cy + py * cell - 7, 14, 14); R(x, on ? [GOLD, PINK, SKYB, MINT][i % 4] : '#3a3a4a', cx + px * cell - 4, cy + py * cell - 4, 8, 8) })
  if (clock) { R(x, INK, cx - 52, cy - 16, 104, 34); label(x, '7:42', cx, cy + 1, { size: 24, col: MINT }) }
}

const EP = makeVersus({
  id: 'nvse18', a: 'capricorn', b: 'aquarius', accent: '#ff8fa0',
  hook: 'Who handles | the *sweater party* better?',
  hookMoods: ['neutral', 'sparkle'],
  hookDraw(x, t) { drawProp(x, 'sweaterG', 430, 650, 9, { rot: -0.1 }); lightSweater(x, t, 660, 650, 9, false) },
  rounds: [
    {
      caption: 'wears a *tasteful* grey sweater.', deep: '#4a5a6a',
      set: 'party', tint: '#2a2a40',
      moods: ['neutral', 'happy'], fx: ['sparkle'],
      hero: { x: 540, y: 950, s: 300 },
      front(x, t, S) { drawProp(x, S.u > SW ? 'sweaterR' : 'sweaterG', 540, 1010, 19) },
      bubbles: ['it’s festive. it has a stripe.', '…fine. the reindeer one.'],
      bubblePos: [[540, 620, 0], [540, 730, 0]],
      cues: [['whoosh', 1.7, 0.25, 0.03]],
    },
    {
      caption: 'knitted one that *lights up and beeps.*', deep: '#2a7ab0',
      set: 'party', tint: '#1f2f4a',
      moods: ['sparkle', 'happy'], fx: ['confetti'],
      hero: { x: 540, y: 950, s: 300 },
      front(x, t, S) {
        lightSweater(x, t, 540, 1010, 19, S.u > SW)
        if (S.u < SW) for (let i = 0; i < 3; i++) label(x, '♪', 760 + i * 60, 820 - ((t * 80 + i * 40) % 120), { size: 44, col: GOLD, font: 'serif' })
      },
      bubbles: ['it plays a little tune!', 'it also tells the time.'],
      bubblePos: [[540, 620, 0], [540, 730, 0]],
      cues: [[0.5, 1567.98], [0.7, 1318.51], [0.9, 1174.66], [1.1, 1318.51], [1.3, 1567.98], [1.5, 1760]].map(([c, f]) => ['pluck', c, f, 0.025, 0.25, 0.3]).concat([['tick', 1.8, 0.06], ['tick', 2.3, 0.06]]),
    },
  ],
  verdict: {
    who: 'both', text: 'BOTH. | *Had the most fun.*', late: 4,
    draw(x, t, S) { const k = pop01(t, T.crown + 0.3, 0.3, 2.2) * S.ok; if (k > 0.01) { drawProp(x, 'sweaterR', 280, 1000, 9 * k); lightSweater(x, t, 800, 1000, 9 * k, false) } },
  },
  last: 'Wear the thing that makes you smile.',
})
export const DURATION = EP.DURATION, SCENES = EP.SCENES, CUES = EP.CUES
