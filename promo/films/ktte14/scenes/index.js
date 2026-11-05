// ktte14: THIS OR THAT: LOVE EDITION, "Taurus vs Scorpio: Who Says It First" (~10 s vertical, star advice trial reel,
// lofi · Db). Rows: promo/films/month2/m29.md. Format: ../../ktte01/scenes/ttkit.js (read-only).
//   frame 0: Taurus and Scorpio mid-lunge, both slamming WAIT FOR THEM; record scratch "classic."
//   the calendar stamps whip by: WEEK 3 · MONTH 2 · MONTH 5, both still picking WAIT, sweating.
//   twist: a card drops: I LOVE YOU. Both slam it in the same frame, two bubbles collide. Pisces bawls in the tissue cam.
//   Last: "Both waited. *Both meant it.*" Hard cut.
import { makeTT, bubble, label, pop01, outK, RED, INTER } from '../../ktte01/scenes/ttkit.js'

const stamp = (txt) => (x, t, S) => {
  const a = S.T.realOf(S.r.t0 + 0.05), k = pop01(t, a, 0.25, 2.6) * outK(t, [S.T.realOf(S.r.t1) - 0.15, S.T.realOf(S.r.t1)])
  if (k > 0.01) label(x, txt, 540, 1085, { size: 64 * k, col: RED, font: INTER, weight: 800, rot: -0.06 })
}
const EP = makeTT({
  id: 'ktte14', mode: 'duel', signs: ['taurus', 'scorpio'],
  hook: 'WHO SAYS | *“I LOVE YOU”* FIRST?', accent: '#ff8fb1',
  brk: { kind: 'scratch', t: 0.12, len: 0.6, cap: 'classic.' },
  rounds: [
    { a: 'SAY IT FIRST', b: 'WAIT FOR THEM', ia: 'heart', ib: 'clock', pick: ['b', 'b'], d: 1.5, extra: stamp('WEEK 3') },
    { a: 'SAY IT NOW', b: 'WAIT A BIT MORE', ia: 'heart', ib: 'clock', pick: ['b', 'b'], d: 1.4, extra: stamp('MONTH 2') },
    { a: 'SAY IT. TONIGHT.', b: 'WAIT. FOREVER.', ia: 'heart', ib: 'cal', pick: ['b', 'b'], d: 1.4, hover: true, extra: stamp('MONTH 5') },
    { a: 'KEEP WAITING', b: 'KEEP WAITING (BUT SADDER)', ia: 'clock', ib: 'sweat', pick: ['c', 'c'], c: { text: 'I LOVE YOU', ic: 'heart', at: 0.7, tag: 'OKAY FINE' }, d: 2.1, pickAt: 1.4, hover: true },
  ],
  last: 'Both waited. | *Both meant it.*',
  ending: 'cut', fin: 2.4, finSide: 'c',
  mid(x, t, S) {
    const E = S.T.E
    bubble(x, t, 190, 1440, S.T.realOf(E - 0.65), 99, 'I love you!!', { size: 40, tail: -0.2, col: '#ffd6e4' })
    bubble(x, t, 890, 1440, S.T.realOf(E - 0.65), 99, 'I love you!!', { size: 40, tail: 0.2, col: '#ffd6e4' })
  },
  camTears: (t, v) => 3,
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const LIFT = +EP.T.realOf(EP.T.rounds[EP.T.rounds.length - 1].slam).toFixed(3)
