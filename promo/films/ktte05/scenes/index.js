// ktte05: THIS OR THAT: LOVE EDITION, "Leo, Ask About Them" (~10 s vertical, star advice trial reel, pop · G).
// Rows: promo/films/month2/m29.md. Format: ../../ktte01/scenes/ttkit.js (read-only).
//   frame 0: Leo mid-leap into BIG ENTRANCE (confetti in the air), hook "LEO HAS TO SHARE THE SPOTLIGHT."; whip zoom.
//   BIG ENTRANCE vs QUIET ENTRANCE → BIG · COMPLIMENT THE OUTFIT vs COMPLIMENT THE LAUGH → THE LAUGH
//   twist: TALK ABOUT YOU vs ASK ABOUT THEM → ASK ABOUT THEM; the date (Libra) lights up, hearts. Pisces cries in the
//   tissue cam. Last: "Curiosity is *the best outfit.*" Hard cut.
import { makeTT, star, hearts, confetti, bubble } from '../../ktte01/scenes/ttkit.js'

const EP = makeTT({
  id: 'ktte05', mode: 'solo', signs: ['leo'],
  hook: 'LEO HAS TO SHARE | THE *SPOTLIGHT.*', accent: '#f39a3a',
  brk: { kind: 'whip', t: 0.12 },
  rounds: [
    { a: 'BIG ENTRANCE', b: 'QUIET ENTRANCE', ia: 'star', ib: 'moon', pick: 'a' },
    { a: 'COMPLIMENT THE OUTFIT', b: 'COMPLIMENT THE LAUGH', ia: 'bag', ib: 'heart', pick: 'b', d: 1.5 },
    { a: 'TALK ABOUT YOU', b: 'ASK ABOUT THEM', ia: 'star', ib: 'q', pick: 'b', d: 2.6, pickAt: 2.0, hover: true },
  ],
  last: 'Curiosity is | *the best outfit.*',
  ending: 'cut', fin: 2.4,
  mid(x, t, S) {
    confetti(x, t, -0.5, 290, 700)
    const E = S.T.E
    if (S.v >= E - 0.2) {
      const k = Math.min(1, (S.v - E + 0.2) / 0.3)
      star(x, t, 'libra', { x: 820, y: 1330, s: 230 * k, mood: 'heart', look: [-1, 0], hops: [S.T.realOf(E), S.T.realOf(E + 0.9)] })
      hearts(x, t, S.T.realOf(E + 0.1), 820, 1190, { n: 6 })
      bubble(x, t, 760, 1530, S.T.realOf(E + 0.3), 99, 'nobody ever asks!!', { size: 44, tail: 0.2 })
    }
  },
  camAt: { x: 60, y: 1460, w: 280, h: 260 },
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const LIFT = +EP.T.realOf(EP.T.rounds[EP.T.rounds.length - 1].slam).toFixed(3)
