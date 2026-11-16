// og-ktte12: social rework of ktte12 "Pisces Can't See the Cards" (static HOOK outline over a longer opening; no series
// bug, slam title or record scratch; Pisces pushed to full flood; ends on Cancer's tissue box and the last line).
// Kit: ./ttkit.js (og social copy of ../../ktte01/scenes/ttkit.js). Was:
// ktte12: THIS OR THAT: LOVE EDITION, "Pisces Can't See the Cards" (~8 s vertical, star advice trial reel, dreamy · Ab).
//   frame 0: Pisces sobbing between SUNRISE and SUNSET, tears jetting both ways ("they're both so pretty").
//   HOLD THE DOOR vs HOLD THE HAND → HOLD THE HAND (cries harder).
//   twist: CRY ALONE IN THE BATH vs CRY WITH A FRIEND → A FRIEND: Cancer pops in with a tissue box, happy tears.
//   Last: "Feel it. *Just not alone.*" Hard cut.
import { makeTT, star, box, R, ease, prog, lerp, bubble } from './ttkit.js'

const EP = makeTT({
  id: 'og-ktte12', mode: 'solo', signs: ['pisces'],
  hook: '', accent: '#a9a2ff',
  rounds: [
    { a: 'SUNRISE', b: 'SUNSET', ia: 'sun', ib: 'moon', pick: 'a', hover: true,
      extra(x, t, S) { bubble(x, t, 470, 1110, S.T.realOf(S.r.t0 + 0.8), S.T.realOf(S.r.t0 + 2.4), 'they’re BOTH\nso pretty', { size: 42 }) } },
    { a: 'HOLD THE DOOR', b: 'HOLD THE HAND', ia: 'house', ib: 'hand', pick: 'b', d: 1.5 },
    { a: 'CRY ALONE IN THE BATH', b: 'CRY WITH A FRIEND', ia: 'tissue', ib: 'heart', pick: 'b', d: 2.0, pickAt: 1.3, hover: true },
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
export const FIRST = +EP.T.realOf(EP.T.rounds[0].slam).toFixed(3)

export const HOOK = 'Pisces is crying | *at a sunrise card.*'
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 2.6
