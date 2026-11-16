// og-ktte05: social rework of ktte05 "Leo, Ask About Them" (static HOOK box over a longer opening; no series bug, slam
// title or whip; Leo pushed to full main character; ends on the last line with the date lighting up).
// Kit: ./ttkit.js (og social copy of ../../ktte01/scenes/ttkit.js). Was:
// ktte05: THIS OR THAT: LOVE EDITION, "Leo, Ask About Them" (~10 s vertical, star advice trial reel, pop · G).
//   frame 0: Leo hovering between ENTER WITH A DRUMROLL and JUST WALK IN ("hold for applause."); confetti on the pick.
//   DRUMROLL vs JUST WALK IN → DRUMROLL · COMPLIMENT YOUR OWN OUTFIT vs COMPLIMENT THEIR LAUGH → THEIR LAUGH
//   twist: TALK ABOUT YOU FOR 2 HOURS vs ASK ABOUT THEM → ASK ABOUT THEM; the date (Libra) lights up, hearts. Pisces cries
//   in the tissue cam. Last: "Curiosity is *the best outfit.*" Hard cut.
import { makeTT, star, hearts, confetti, bubble } from './ttkit.js'

const EP = makeTT({
  id: 'og-ktte05', mode: 'solo', signs: ['leo'],
  hook: '', accent: '#f39a3a',
  rounds: [
    { a: 'ENTER WITH A DRUMROLL', b: 'JUST WALK IN', ia: 'star', ib: 'moon', pick: 'a', hover: true,
      extra(x, t, S) { bubble(x, t, 470, 1085, S.T.realOf(S.r.t0 + 0.7), S.T.realOf(S.r.t0 + 2.2), 'hold for applause.', { size: 40 }) } },
    { a: 'COMPLIMENT YOUR OWN OUTFIT', b: 'COMPLIMENT THEIR LAUGH', ia: 'bag', ib: 'heart', pick: 'b', d: 1.6 },
    { a: 'TALK ABOUT YOU FOR 2 HOURS', b: 'ASK ABOUT THEM', ia: 'star', ib: 'q', pick: 'b', d: 2.6, pickAt: 2.0, hover: true },
  ],
  last: 'Curiosity is | *the best outfit.*',
  ending: 'cut', fin: 2.4,
  mid(x, t, S) {
    confetti(x, t, S.T.realOf(S.T.rounds[0].slam), 275, 760)
    const E = S.T.E
    if (S.v >= E - 0.2) {
      const k = Math.min(1, (S.v - E + 0.2) / 0.3)
      star(x, t, 'libra', { x: 800, y: 1330, s: 230 * k, mood: 'heart', look: [-1, 0], hops: [S.T.realOf(E), S.T.realOf(E + 0.9)] })
      hearts(x, t, S.T.realOf(E + 0.1), 800, 1190, { n: 6 })
      bubble(x, t, 735, 1515, S.T.realOf(E + 0.3), 99, 'nobody ever asks!!', { size: 38, tail: 0.2 })
    }
  },
  camAt: { x: 60, y: 1290, w: 260, h: 250 },
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const LIFT = +EP.T.realOf(EP.T.rounds[EP.T.rounds.length - 1].slam).toFixed(3)
export const FIRST = +EP.T.realOf(EP.T.rounds[0].slam).toFixed(3)

export const HOOK = 'Leo brought | *their own spotlight.*'
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 2.6
