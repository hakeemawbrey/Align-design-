// ktte21: THIS OR THAT: LOVE EDITION, "The Zodiac Votes: After a Fight" (~9 s vertical, star advice trial reel,
// synthwave · Bb). Rows: promo/films/month2/m29.md. Format: ../../ktte01/scenes/ttkit.js (read-only).
//   frame 0: 11 signs mid-sprint to THEM (who texts first after a fight); record scratch "everybody?"
//   AN HOUR LATER: still crowding THEM. A DAY LATER: still THEM, sweating. Pisces stays home, crying at its phone.
//   twist: all 12 sprint to ME.
//   Last: "Whoever *misses them first.*" Hard cut.
import { makeTT, bubble, label, pop01, outK, RED, INTER } from '../../ktte01/scenes/ttkit.js'

const stamp = (txt) => (x, t, S) => {
  const a = S.T.realOf(S.r.t0 + 0.05), k = pop01(t, a, 0.25, 2.6) * outK(t, [S.T.realOf(S.r.t1) - 0.15, S.T.realOf(S.r.t1)])
  if (k > 0.01) label(x, txt, 540, 1085, { size: 64 * k, col: RED, font: INTER, weight: 800, rot: -0.06 })
}
const THEM = [...Array(11).fill('b'), null]
const EP = makeTT({
  id: 'ktte21', mode: 'crowd',
  hook: 'AFTER A FIGHT: | WHO *TEXTS FIRST?*', accent: '#7fd0ff',
  brk: { kind: 'scratch', t: 0.3, len: 0.5, cap: 'everybody?' },
  r0: -0.4,
  rounds: [
    { a: 'ME', b: 'THEM', ia: 'phone', ib: 'clock', pick: THEM, d: 1.9, pickAt: 0.35, stagger: 0.04 },
    { a: 'ME', b: 'THEM', ia: 'phone', ib: 'clock', pick: THEM, d: 1.3, pickAt: 0.4, stagger: 0.02, extra: stamp('AN HOUR LATER') },
    { a: 'ME', b: 'THEM', ia: 'phone', ib: 'clock', pick: THEM, d: 1.3, pickAt: 0.4, stagger: 0.02, hover: true, extra: stamp('A DAY LATER') },
    { a: 'ME', b: 'THEM', ia: 'heart', ib: 'clock', pick: Array(12).fill('a'), d: 1.7, pickAt: 0.5, stagger: 0.03 },
  ],
  last: 'Whoever | *misses them first.*',
  ending: 'cut', fin: 2.3, finSide: 'a',
  over(x, t, S) { const R1 = S.T.rounds[1]; bubble(x, t, 830, 1390, S.T.realOf(R1.t0 + 0.2), S.T.realOf(S.T.rounds[2].t1), 'just text them!!', { size: 42, tail: 0.6 }) },
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const LIFT = +EP.T.realOf(EP.T.rounds[EP.T.rounds.length - 1].slam).toFixed(3)
