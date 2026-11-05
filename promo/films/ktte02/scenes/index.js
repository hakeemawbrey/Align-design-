// ktte02: THIS OR THAT: LOVE EDITION, "Taurus Won't Let Go" (~11 s vertical, star advice trial reel, lofi · F).
// Rows: promo/films/month2/m29.md. Format: ../../ktte01/scenes/ttkit.js (read-only).
//   frame 0: Taurus mid-hug-lunge into NIGHT IN, hook "TAURUS VS. LETTING GO."; record scratch on the slam.
//   NIGHT IN vs NIGHT OUT → IN · COOK vs ORDER IN → COOK · SAME SPOT vs NEW SPOT → SAME SPOT
//   twist (missing an ex): TEXT THE EX vs TEXT A FRIEND: a long hover, then A FRIEND. Pisces picks up in the tissue
//   cam ("hiii!! I'm here"), crying. Last: "Miss them. *Text a friend.*" Hard cut.
import { makeTT, bubble } from '../../ktte01/scenes/ttkit.js'

const EP = makeTT({
  id: 'ktte02', mode: 'solo', signs: ['taurus'],
  hook: 'TAURUS VS. | *LETTING GO.*', accent: '#e9b24a',
  brk: { kind: 'scratch', t: 0.12, len: 0.6, cap: 'this card is *mine* now.' },
  rounds: [
    { a: 'NIGHT IN', b: 'NIGHT OUT', ia: 'house', ib: 'moon', pick: 'a' },
    { a: 'COOK TOGETHER', b: 'ORDER IN', ia: 'fork', ib: 'bag', pick: 'a', d: 1.3 },
    { a: 'SAME SPOT AS ALWAYS', b: 'SOMEWHERE NEW', ia: 'heart', ib: 'spark', pick: 'a', d: 1.3 },
    { a: 'TEXT THE EX', b: 'TEXT A FRIEND', ia: 'phone', ib: 'bubble', pick: 'b', d: 3.1, pickAt: 2.5, hover: true },
  ],
  last: 'Miss them. | *Text a friend.*',
  ending: 'cut', fin: 2.3,
  over(x, t, S) { const E = S.T.realOf(S.T.E); bubble(x, t, 760, 1395, E - 0.35, E + 2.4, "hiii!! I'm here", { size: 38, tail: 0.3, col: '#c9f2d4' }) },
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const LIFT = +EP.T.realOf(EP.T.rounds[EP.T.rounds.length - 1].slam).toFixed(3)
