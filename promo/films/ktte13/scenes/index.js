// ktte13: THIS OR THAT: LOVE EDITION, "Aries vs Libra: Where Do We Eat" (~10 s vertical, star advice trial reel, pop · C).
// Rows: promo/films/month2/m29.md. Format: ../../ktte01/scenes/ttkit.js (read-only). Duel: Aries left, Libra right.
//   frame 0: Aries mid-slam on TACOS, Libra mid-shrug ("whatever you want"); whip zoom.
//   EARLY vs LATE → Aries EARLY, Libra "whatever you want" again.
//   twist: Aries: "pick one. really." → TACOS vs PASTA again → both slam PASTA: Libra "…PASTA." Aries "PASTA IT IS!"
//   Pisces cries at the growth in the tissue cam. Last: "“Whatever you want” *isn’t an answer.*" Hard cut.
import { makeTT, bubble } from '../../ktte01/scenes/ttkit.js'

const WYW = (x, t, S, a, b) => bubble(x, t, 780, 1060, S.T.realOf(S.r.t0 + a), S.T.realOf(S.r.t0 + b), 'whatever you want!', { size: 40, tail: 0.2 })
const EP = makeTT({
  id: 'ktte13', mode: 'duel', signs: ['aries', 'libra'],
  hook: 'WHERE DO WE EAT? | *FIGHT.*', accent: '#ff7a52',
  brk: { kind: 'whip', t: 0.12 },
  rounds: [
    { a: 'TACOS', b: 'PASTA', ia: 'star', ib: 'fork', pick: ['a', null], d: 1.7, extra: (x, t, S) => WYW(x, t, S, 0.3, 1.6) },
    { a: 'EARLY DINNER', b: 'LATE DINNER', ia: 'sun', ib: 'moon', pick: ['a', null], d: 1.7, extra: (x, t, S) => WYW(x, t, S, 0.5, 1.6) },
    { a: 'TACOS', b: 'PASTA', ia: 'star', ib: 'fork', pick: ['b', 'b'], d: 2.6, pickAt: 2.0, hover: true,
      extra(x, t, S) {
        bubble(x, t, 300, 1060, S.T.realOf(S.r.t0 + 0.25), S.T.realOf(S.r.t0 + 1.2), 'pick one. really.', { size: 40, tail: -0.2 })
        bubble(x, t, 780, 1060, S.T.realOf(S.r.t0 + 1.25), S.T.realOf(S.r.t0 + 2.0), '…PASTA.', { size: 46, tail: 0.2 })
      } },
  ],
  last: '“Whatever you want” | *isn’t an answer.*',
  ending: 'cut', fin: 2.4, finSide: 'b',
  mid(x, t, S) { const E = S.T.E; bubble(x, t, 300, 1090, S.T.realOf(E + 0.05), 99, 'PASTA IT IS!', { size: 42, tail: -0.2 }) },
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const LIFT = +EP.T.realOf(EP.T.rounds[EP.T.rounds.length - 1].slam).toFixed(3)
