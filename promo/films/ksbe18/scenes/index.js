// ksbe18: SAY IT BETTER ep 18 (long), "The Birthday No-Show, Played Twice" (♌ Leo and ♒ Aquarius, the party). funk · Bb.
// ROUND 1: Leo mid-blow on the candles, one empty chair in a spotlight, "YOU DIDN'T EVEN SHOW UP!" at Aquarius in the
// doorway; "you NEVER put me first" / "you're so DRAMATIC"; both storm off, the cake abandoned, Pisces crying into it →
// ◀◀ REWIND → ROUND 2: "It really hurt that you weren't there. What happened?" → the wrong date, too embarrassed to call →
// a make-up dinner → THE VERDICT 2/10 vs 10/10. Hard cut.
import { makeLong } from '../../ksbe01/scenes/sblong.js'
import { rect, INK, BONE } from '../../ksbe01/scenes/sbkit.js'
const L = makeLong({
  ep: 18, room: 'party',
  A: { sign: 'leo' }, B: { sign: 'aquarius' }, P: { x: 900, y: 1000, s: 120, look: [-1, 0] },
  hook: 'They missed the party. | *Now* what?',
  r1: [
    { who: 'A', text: 'You didn’t even *show up!*' },
    { who: 'B', text: 'You’re so *dramatic!*' },
    { who: 'A', text: 'You *never* put me first!' },
    { who: 'B', text: 'What about *my* show in May?!' },
    { who: 'A', text: 'Enjoy the *cake.* Alone.' },
  ],
  r2: [
    { who: 'A', text: 'It really *hurt* that you weren’t there. What happened?' },
    { who: 'B', text: 'I had the wrong date. Then I was too *embarrassed* to call. I’m so sorry.', kind: 'better' },
    { who: 'A', text: 'Thank you for telling me. I *missed* you there.' },
    { who: 'B', text: 'Let me make it up to you. Dinner Friday? *My* treat.', kind: 'better' },
    { who: 'A', text: 'only if there’s *cake.*', kind: 'say' },
  ],
  stars: ['start with *what happened*,', 'not *what it means*.'],
  starsAfter: 1,
  card: { text: 'What makes a birthday feel special to you?', after: 3 },
  scores: ['2/10', '10/10'],
  last: 'Curious first. | *Hurt* second.',
  draw(x, w) {
    // the cake on the party table (candles lit), and the empty chair in a spotlight
    rect(x, 470, 1080, 140, 76, INK); rect(x, 478, 1088, 124, 60, '#ff8fb1'); rect(x, 478, 1088, 124, 14, BONE)
    for (let i = 0; i < 3; i++) { rect(x, 500 + i * 36, 1050, 10, 36, BONE); rect(x, 500 + i * 36 + Math.sin(w * 12 + i) * 2, 1036, 10, 14, '#ffb347') }
    const g = x.createRadialGradient(860, 1180, 0, 860, 1180, 220); g.addColorStop(0, 'rgba(255,240,200,0.35)'); g.addColorStop(1, 'rgba(255,240,200,0)'); x.fillStyle = g; x.fillRect(620, 900, 480, 420)
  },
})
export const { DURATION, SCENES, CUES, TIMES } = L
