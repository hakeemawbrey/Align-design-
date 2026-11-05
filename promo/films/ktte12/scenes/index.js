// ktte12: THIS OR THAT: LOVE EDITION, "Pisces Can't See the Cards" (~8 s vertical, star advice trial reel, dreamy · Ab).
// Rows: promo/films/month2/m29.md. Format: ../../ktte01/scenes/ttkit.js (read-only).
//   frame 0: Pisces mid-sob lunging into SUNRISE, tears jetting both ways; record scratch "it's both so pretty".
//   HOLD THE DOOR vs HOLD THE HAND → HOLD THE HAND (cries harder).
//   twist: CRY ALONE vs CRY WITH A FRIEND → A FRIEND: Cancer pops in with a tissue box, happy tears.
//   Last: "Feel it. *Just not alone.*" Hard cut.
import { makeTT, star, box, R, ease, prog, lerp } from '../../ktte01/scenes/ttkit.js'

const EP = makeTT({
  id: 'ktte12', mode: 'solo', signs: ['pisces'],
  hook: 'PISCES *CAN’T SEE* | THE CARDS.', accent: '#a9a2ff',
  brk: { kind: 'scratch', t: 0.12, len: 0.5, cap: 'they’re *both* so pretty' },
  rounds: [
    { a: 'SUNRISE', b: 'SUNSET', ia: 'sun', ib: 'moon', pick: 'a' },
    { a: 'HOLD THE DOOR', b: 'HOLD THE HAND', ia: 'house', ib: 'hand', pick: 'b', d: 1.4 },
    { a: 'CRY ALONE', b: 'CRY WITH A FRIEND', ia: 'tissue', ib: 'heart', pick: 'b', d: 2.0, pickAt: 1.3, hover: true },
  ],
  last: 'Feel it. | *Just not alone.*',
  ending: 'cut', fin: 2.3,
  pose: () => ({ tears: 3 }),
  mid(x, t, S) {
    const E = S.T.E, p = ease.outBack ? ease.outBack(prog(S.v, E - 0.5, E)) : ease.outCubic(prog(S.v, E - 0.5, E))
    if (S.v > E - 0.5) {
      const X = lerp(1250, 790, p)
      star(x, t, 'cancer', { x: X, y: 1290, s: 230, mood: 'happy', look: [-1, 0], hops: [S.T.realOf(E + 0.4)] })
      box(x, X - 150, 1360, 90, 60, '#9fd8f6', { b: 5 }); R(x, '#ffffff', X - 120, 1322, 30, 40)
    }
  },
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const LIFT = +EP.T.realOf(EP.T.rounds[EP.T.rounds.length - 1].slam).toFixed(3)
