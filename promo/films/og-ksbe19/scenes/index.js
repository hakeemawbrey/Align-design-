// og-ksbe19: social rework of ksbe19 (static HOOK box 0–3.0 replaces the slammed hook; no bug or episode number;
//   Pisces sobs that the stars are watching, Capricorn booked a 9 p.m. bedtime in June; round two ends in matching pyjamas). Kit: og copies in ./ and ../hookkit.js.
// Was: ksbe19: SAY IT BETTER ep 19 (long), "New Year's Eve: In or Out, Played Twice" (♑ Capricorn and ♓ Pisces). cinematic · Eb.
// ROUND 1: a December calendar mid-rip on the 31st, Capricorn (cosy) vs Pisces (party hat, crying): "you ALWAYS want to stay
// in" / "you're so EXHAUSTING"; both dig in and sulk → ◀◀ REWIND → ROUND 2: "What do you love about New Year's Eve?" →
// people at midnight / cosy and not too late → a small party, home by one → THE VERDICT 2/10 vs 10/10. Hard cut.
import { makeLong } from './sblong.js'
import { rect, INK, BONE, RED } from './sbkit.js'
import { prog, ease } from '../../../src/lib.js'
export const HOOK = 'New Year’s Eve: | party or *pyjamas?*'
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 3.0
const L = makeLong({
  room: 'living',
  A: { sign: 'pisces' }, B: { sign: 'capricorn' }, P: null,
  hook: 'Party or pyjamas? | *Round two* wins.',
  r1: [
    { who: 'A', text: 'You *ALWAYS* want to stay in!' },
    { who: 'B', text: 'I booked a *9 p.m.* bedtime. In June.' },
    { who: 'A', text: 'It’s *New Year’s!* The stars are WATCHING!' },
    { who: 'B', text: 'It’s just a Thursday with *confetti!*' },
    { who: 'A', text: 'Fine. I’ll cry at midnight *without* you.' },
  ],
  r2: [
    { who: 'A', text: 'What do you *love* about New Year’s Eve?' },
    { who: 'B', text: 'Being *cosy*, and not out too late. You?', kind: 'better' },
    { who: 'A', text: 'Being with *people* at midnight. That’s the magic for me.' },
    { who: 'B', text: 'So… a small party, and home by *one?*', kind: 'better' },
    { who: 'A', text: 'matching pyjamas *after* midnight?', kind: 'say' },
  ],
  stars: ['you’re not fighting about *plans*.', 'you’re fighting about what *matters*.'],
  starsAfter: 1,
  card: { text: 'What’s one thing you want in the new year?', after: 3 },
  scores: ['2/10', '10/10'],
  last: 'Find the night | you *both* want.',
  keys: T => ({ A: [[0, { tears: 2 }], [T.r1End, { tears: 3 }], [T.R2 - 0.04, { tears: 1, d: 0.01 }], [T.V, { tears: 3 }]] }),
  draw(x, w) {
    // the calendar on the wall: 31 DEC, ripping down the middle in round 1, whole again in round 2
    const T = L.TIMES, rip = w < T.R2 - 0.05 ? ease.outCubic(prog(w, -0.4, 0.6)) : 0
    for (const side of [-1, 1]) {
      x.save(); x.translate(470 + side * rip * 30, 900); x.rotate(side * rip * 0.12)
      x.beginPath(); x.scale(0.8, 0.8); x.rect(side < 0 ? -110 : 0, -110, 110, 260); x.clip()
      rect(x, -100, -100, 200, 240, INK); rect(x, -92, -92, 184, 224, BONE); rect(x, -92, -92, 184, 56, RED)
      x.font = "900 34px Inter"; x.fillStyle = BONE; x.textAlign = 'center'; x.fillText('DEC', 0, -52)
      x.font = "900 110px Inter"; x.fillStyle = INK; x.fillText('31', 0, 80); x.restore()
    }
  },
})
export const { DURATION, SCENES, CUES, TIMES } = L
