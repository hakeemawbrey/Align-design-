// og-ksbe20: social rework of ksbe20. Static HOOK (outline) 0–3.4 replaces the slam title; kit copies ./sbkit.js and
// ./sblong.js drop the series bug, whip and shakes; last line moved into the safe zone; crazier Scorpio/Aries lines.
// Original notes: "'What Are We?', Played Twice" (♏ Scorpio and ♈ Aries, the café). synthwave · Am.
// ROUND 1: Scorpio leaning in under the hanging lamp, Aries mid-gulp: "YOU'RE NEVER SERIOUS!" / "and you're ALWAYS so
// intense!"; labels fly, two phones face-down, Pisces crying at the next table → ◀◀ REWIND → ROUND 2: "I really like you,
// and I'd love to know where this is going. No pressure to answer tonight." → "I like you too. I'm scared of messing it
// up." → a talk card → THE VERDICT 1/10 vs 10/10. Hard cut.
import { makeLong } from './sblong.js'
import { rect, INK } from './sbkit.js'
export const HOOK = '“What are we?” | asked *the worst way.*'
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 3.4
const L = makeLong({
  room: 'cafe',
  A: { sign: 'scorpio' }, B: { sign: 'aries' }, P: { x: 880, y: 1150, s: 130, look: [-1, 0] },   // og: off the app's right-edge buttons
  r1: [
    { who: 'A', text: 'I *ran a background check* on your feelings!' },
    { who: 'B', text: 'I came here for a *muffin!*' },
    { who: 'A', text: 'I’ve stared at you for *forty minutes!*' },
    { who: 'B', text: 'Labels are for *jam jars!*' },
    { who: 'A', text: 'I’ll *never* ask again. *Ever.*' },
  ],
  r2: [
    { who: 'A', text: 'I really *like* you, and I’d love to know where this is going. No pressure to answer tonight.' },
    { who: 'B', text: 'I like you too. I’m just *scared* I’ll mess it up at full speed.', kind: 'better' },
    { who: 'A', text: 'Me too, honestly. Can we figure it out *together?*' },
    { who: 'B', text: 'Yes. Let’s start with *this* question.', kind: 'better' },
    { who: 'A', text: 'same table. *same lamp.* next week?', kind: 'say' },
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
