// ksbe20: SAY IT BETTER ep 20 (long), "'What Are We?', Played Twice" (♏ Scorpio and ♈ Aries, the café). synthwave · Am.
// ROUND 1: Scorpio leaning in under the hanging lamp, Aries mid-gulp: "YOU'RE NEVER SERIOUS!" / "and you're ALWAYS so
// intense!"; labels fly, two phones face-down, Pisces crying at the next table → ◀◀ REWIND → ROUND 2: "I really like you,
// and I'd love to know where this is going. No pressure to answer tonight." → "I like you too. I'm scared of messing it
// up." → a talk card → THE VERDICT 1/10 vs 10/10. Hard cut.
import { makeLong } from '../../ksbe01/scenes/sblong.js'
import { rect, INK } from '../../ksbe01/scenes/sbkit.js'
const L = makeLong({
  ep: 20, room: 'cafe',
  A: { sign: 'scorpio' }, B: { sign: 'aries' }, P: { x: 960, y: 1150, s: 130, look: [-1, 0] },
  hook: '“What are we?” | asked *the bad way.*',
  r1: [
    { who: 'A', text: 'You’re *never* serious!' },
    { who: 'B', text: 'And you’re *always* so intense!' },
    { who: 'A', text: 'So I’m just *fun* to you?' },
    { who: 'B', text: 'Why does it need a *label?!*' },
    { who: 'A', text: 'Forget I *asked.*' },
  ],
  r2: [
    { who: 'A', text: 'I really *like* you, and I’d love to know where this is going. No pressure to answer tonight.' },
    { who: 'B', text: 'I like you too. I’m just *scared* of messing it up.', kind: 'better' },
    { who: 'A', text: 'Me too, honestly. Can we figure it out *together?*' },
    { who: 'B', text: 'Yes. Let’s start with *this* question.', kind: 'better' },
    { who: 'A', text: 'same time *next week?*', kind: 'say' },
  ],
  stars: ['“what are we” lands better', 'after *“I like you.”*'],
  starsAfter: 1,
  card: { text: 'What does ‘together’ look like to you?', after: 2 },
  scores: ['1/10', '10/10'],
  last: 'Say *I like you* before | *what are we.*',
  draw(x, w) {
    // two cups on the café table
    for (const X of [380, 690]) { rect(x, X - 26, 1060, 52, 52, INK); rect(x, X - 20, 1066, 40, 40, '#efe6d6'); rect(x, X + 20, 1074, 14, 20, INK) }
    void w
  },
})
export const { DURATION, SCENES, CUES, TIMES } = L
