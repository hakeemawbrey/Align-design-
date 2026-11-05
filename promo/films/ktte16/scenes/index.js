// ktte16: THIS OR THAT: LOVE EDITION, "Cancer vs Capricorn: Whose Family for the Holidays" (~10 s vertical, star advice
// trial reel, cinematic · G). Rows: promo/films/month2/m29.md. Format: ../../ktte01/scenes/ttkit.js (read-only).
//   frame 0: Cancer and Capricorn both mid-lunge at MY FAMILY (a tug-of-war); screen shake.
//   BIG DINNER vs QUIET DAY → Cancer BIG, Capricorn QUIET.
//   twist: TALK IT OUT vs SULK → a card drops: ONE DAY EACH; both slam it. Pisces cries in the tissue cam.
//   Last: "Two families. One calendar. *Talk.*" Hard cut.
import { makeTT, bubble } from '../../ktte01/scenes/ttkit.js'

const EP = makeTT({
  id: 'ktte16', mode: 'duel', signs: ['cancer', 'capricorn'],
  hook: 'WHOSE FAMILY FOR | *THE HOLIDAYS?*', accent: '#7fd0ff',
  brk: { kind: 'shake', t: 0.12 },
  rounds: [
    { a: 'YOUR FAMILY', b: 'MY FAMILY', ia: 'house', ib: 'house', pick: ['b', 'b'], d: 1.7,
      extra(x, t, S) { bubble(x, t, 540, 1085, S.T.realOf(S.r.t0 + 0.9), S.T.realOf(S.r.t0 + 1.6), 'wait. MY family.', { size: 40 }) } },
    { a: 'BIG DINNER', b: 'QUIET DAY', ia: 'fork', ib: 'moon', pick: ['a', 'b'], d: 1.5 },
    { a: 'TALK IT OUT', b: 'SULK', ia: 'bubble', ib: 'sweat', pick: ['c', 'c'], c: { text: 'ONE DAY EACH', ic: 'cal', at: 1.0, tag: 'DEAL' }, d: 2.4, pickAt: 1.7, hover: true,
      extra(x, t, S) { bubble(x, t, 300, 1085, S.T.realOf(S.r.t0 + 0.35), S.T.realOf(S.r.t0 + 1.2), 'okay. talk?', { size: 40, tail: -0.2 }) } },
  ],
  last: 'Two families. | One calendar. *Talk.*',
  ending: 'cut', fin: 2.4, finSide: 'c',
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const LIFT = +EP.T.realOf(EP.T.rounds[EP.T.rounds.length - 1].slam).toFixed(3)
