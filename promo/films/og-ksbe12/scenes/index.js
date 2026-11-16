// og-ksbe12: social rework of ksbe12 (static HOOK outline 0–3.0 replaces the slammed hook; no bug or episode number;
//   Pisces sob-screams at six hours of soup; Taurus brought blankets AND seconds). Kit: og copies in ./ and ../hookkit.js.
// Was: ksbe12: SAY IT BETTER ep 12, "You don't even care" (♓ Pisces, sobbing, to ♉ Taurus holding soup). dreamy · Db. Hard cut.
//   frame 0: Pisces mid-sob-scream, tears fountaining, "YOU DON'T EVEN CARE!" slamming, Taurus flinching with a bowl.
//   freeze → Taurus: "I… made you *soup?*" → THE STARS: "say what you *need*, not what they *don't* do." →
//   "I'm having a *rough* day. Can you sit with me for a bit?" → Taurus sits; Pisces happy-cries even harder.
import { makeShort } from './sbshort.js'
import { rect, INK, BONE } from './sbkit.js'
export const HOOK = 'Taurus made soup. | Pisces *yelled.*'
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 3.0
export const { DURATION, SCENES, CUES } = makeShort({
  room: 'living',
  A: { sign: 'pisces', red: 0.35, mood0: 'wide' }, B: { sign: 'taurus' },
  hook: 'Bad day. | *Wrong* sentence.', caption: 'what it *really* needs…',
  caught: { x: 264, y: 1150, r: 150 },
  bad: { text: 'You don’t even *care!!*' }, react: 'I… made you *soup.* For six hours.',
  stars: ['say what you *need*,', 'not what they *don’t* do.'],
  better: 'I’m having a *rough* day. Can you sit with me for a bit?',
  replies: ['of course. *scoot over.* I brought blankets.', 'I’m *here.* and I made seconds.'],
  last: 'Say the need, | *not the verdict.*',
  keys: { B: [[13.9, { x: 620, d: 0.7 }], [15.9, { x: 640, d: 0.6 }]] },
  front(x, w, K) {
    const b = K.st.B; if (!b) return
    const X = b.x + 170, Y = b.y + 110   // the soup bowl
    rect(x, X - 60, Y - 10, 120, 50, INK); rect(x, X - 52, Y - 4, 104, 38, BONE); rect(x, X - 48, Y - 8, 96, 12, '#f2a24a')
    for (let i = 0; i < 2; i++) { const ph = (w * 0.8 + i * 0.5) % 1; x.globalAlpha = (1 - ph) * 0.6; rect(x, X - 12 + i * 20, Y - 40 - ph * 60, 8, 18, '#ffffff'); x.globalAlpha = 1 }
  },
})
