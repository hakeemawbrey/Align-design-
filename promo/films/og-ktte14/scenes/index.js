// og-ktte14 (og social cut of ktte14): THIS OR THAT: LOVE EDITION, "Taurus vs Scorpio: Who Says It First".
// Format: ./ttkit.js (the og social copy of ../../ktte01/scenes/ttkit.js).
// og: static HOOK (outline) replaces the slammed title; no series bug; Taurus is immovable and Scorpio is silently
// intense (the calendar stamps get worse, the cards get more extreme); the I-love-you bubbles sit clear of the app.
//   frame 0: Taurus and Scorpio mid-lunge, both slamming WAIT FOR THEM; the frame holds: "classic."
//   the calendar stamps whip by: WEEK 3 · MONTH 2 · MONTH 5, both still picking WAIT, sweating.
//   twist: a card drops: I LOVE YOU. Both slam it in the same frame, two bubbles collide. Pisces bawls in the tissue cam.
//   Last: "Both waited. *Both meant it.*" Hard cut.
import { makeTT, bubble, label, pop01, outK, RED, INTER } from './ttkit.js'

const stamp = (txt) => (x, t, S) => {
  const a = S.T.realOf(S.r.t0 + 0.05), k = pop01(t, a, 0.25, 2.6) * outK(t, [S.T.realOf(S.r.t1) - 0.15, S.T.realOf(S.r.t1)])
  if (k > 0.01) label(x, txt, 420, 1085, { size: 48 * k, col: RED, font: INTER, weight: 800, rot: -0.06 })
}
const EP = makeTT({
  id: 'og-ktte14', mode: 'duel', signs: ['taurus', 'scorpio'],
  hook: 'WHO SAYS | *“I LOVE YOU”* FIRST?', accent: '#ff8fb1', hookUntil: 3.2,
  brk: { kind: 'scratch', t: 0.12, len: 0.6, cap: 'classic.' },
  rounds: [
    { a: 'SAY IT FIRST', b: 'WAIT FOR THEM', ia: 'heart', ib: 'clock', pick: ['b', 'b'], d: 1.5, stampTxt: 'WEEK 3: NOTHING' },
    { a: 'SAY IT NOW', b: 'STARE AT THEM INTENSELY', ia: 'heart', ib: 'clock', pick: ['b', 'b'], d: 1.4, stampTxt: 'MONTH 2: STILL NOTHING' },
    { a: 'SAY IT. TONIGHT.', b: 'WAIT UNTIL WE’RE 90', ia: 'heart', ib: 'cal', pick: ['b', 'b'], d: 1.4, hover: true, stampTxt: 'MONTH 5: SWEATING' },
    { a: 'KEEP WAITING', b: 'KEEP WAITING (BUT SADDER)', ia: 'clock', ib: 'sweat', pick: ['c', 'c'], c: { text: 'I LOVE YOU', ic: 'heart', at: 0.7, tag: 'OKAY FINE' }, d: 2.1, pickAt: 1.4, hover: true },
  ],
  last: 'Both waited. | *Both meant it.*',
  ending: 'cut', fin: 2.4, finSide: 'c',
  mid(x, t, S) {
    const E = S.T.E
    bubble(x, t, 230, 1450, S.T.realOf(E - 0.65), 99, 'I love you!!', { size: 38, tail: -0.2, col: '#ffd6e4' })
    bubble(x, t, 790, 1450, S.T.realOf(E - 0.65), 99, 'I KNEW. I KNEW.', { size: 38, tail: 0.2, col: '#ffd6e4' })
  },
  camTears: (t, v) => 3,
  // og: the calendar stamps sit on the top layer (the lunging heroes used to cover them)
  over(x, t, S) { if (S.r && S.r.stampTxt) stamp(S.r.stampTxt)(x, t, S) },
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const LIFT = +EP.T.realOf(EP.T.rounds[EP.T.rounds.length - 1].slam).toFixed(3)
export const HOOK = 'Five months in. | Nobody *said it yet.*'
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = +EP.T.realOf(EP.HOOK_UNTIL).toFixed(2)
