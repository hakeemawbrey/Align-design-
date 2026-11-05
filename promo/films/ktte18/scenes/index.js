// ktte18: THIS OR THAT: LOVE EDITION, "Virgo vs Pisces: Moving On" (~10 s vertical, star advice trial reel, lofi · E).
// Rows: promo/films/month2/m29.md. Format: ../../ktte01/scenes/ttkit.js (read-only). Duel: Virgo left, Pisces right.
//   frame 0: Virgo mid-slam on DELETE THE PHOTOS, Pisces mid-sob lunging at ARCHIVE THEM; record scratch.
//   NEW HAIRCUT vs SAME HAIR → Virgo SAME, Pisces NEW (crying).
//   twist: MOVE ON FAST vs MOVE ON SLOW → a card drops: YOUR OWN SPEED; both slam it. Virgo hands Pisces a tissue.
//   Last: "Heal at *your own speed.*" Hard cut.
import { makeTT, bubble, box, R } from '../../ktte01/scenes/ttkit.js'

const EP = makeTT({
  id: 'ktte18', mode: 'duel', signs: ['virgo', 'pisces'],
  hook: 'MOVING ON: | *FAST OR SLOW?*', accent: '#ef5c94',
  brk: { kind: 'scratch', t: 0.12, len: 0.6, cap: 'two ways to *heal.*' },
  rounds: [
    { a: 'DELETE THE PHOTOS', b: 'ARCHIVE THEM', ia: 'cam', ib: 'heart', pick: ['a', 'b'], d: 1.6 },
    { a: 'NEW HAIRCUT', b: 'SAME HAIR', ia: 'spark', ib: 'star', pick: ['b', 'a'], d: 1.5 },
    { a: 'MOVE ON FAST', b: 'MOVE ON SLOW', ia: 'spark', ib: 'clock', pick: ['c', 'c'], c: { text: 'YOUR OWN SPEED', ic: 'heart', at: 0.9, tag: 'BOTH OK' }, d: 2.3, pickAt: 1.6, hover: true },
  ],
  last: 'Heal at | *your own speed.*',
  ending: 'cut', fin: 2.4, finSide: 'c',
  pose(j) { return j === 1 ? { tears: 3 } : null },
  mid(x, t, S) {
    const E = S.T.E
    if (S.v < E + 0.1) return
    box(x, 470, 1300, 90, 56, '#9fd8f6', { b: 5 }); R(x, '#ffffff', 500, 1262, 30, 40)
    bubble(x, t, 300, 1080, S.T.realOf(E + 0.2), 99, 'tissue?', { size: 40, tail: -0.2 })
  },
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const LIFT = +EP.T.realOf(EP.T.rounds[EP.T.rounds.length - 1].slam).toFixed(3)
