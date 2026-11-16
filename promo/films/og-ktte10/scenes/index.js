// og-ktte10: social rework of ktte10 "Capricorn, Are You Fine?" (static HOOK outline over a longer opening; no series
// bug, slam title or screen shake; Capricorn pushed to 3 AM do-it-alone levels; ends on the hug and the last line).
// Kit: ./ttkit.js (og social copy of ../../ktte01/scenes/ttkit.js). Was:
// ktte10: THIS OR THAT: LOVE EDITION, "Capricorn, Are You Fine?" (~9 s vertical, star advice trial reel, cinematic · Eb).
//   frame 0: Capricorn hovering toward SAY "I'M FINE" ("fine. just carrying 9 projects.").
//   ASK FOR HELP vs DO IT ALONE AT 3 AM → ALONE. Twist: a friend's card "YOU OK?": "I'M FINE" vs "…NOT REALLY." →
//   NOT REALLY. Pisces leaves the tissue cam and runs in crying with a hug. Last: "Strong people *get hugs too.*" Hard cut.
import { makeTT, star, hearts, bubble, lerp, ease, prog } from './ttkit.js'

const EP = makeTT({
  id: 'og-ktte10', mode: 'solo', signs: ['capricorn'],
  hook: '', accent: '#2fc79a',
  rounds: [
    { a: 'VENT', b: 'SAY “I’M FINE”', ia: 'bubble', ib: 'star', pick: 'b', hover: true,
      extra(x, t, S) { bubble(x, t, 470, 1110, S.T.realOf(S.r.t0 + 0.8), S.T.realOf(S.r.t0 + 2.4), 'fine. just carrying\n9 projects.', { size: 40 }) } },
    { a: 'ASK FOR HELP', b: 'DO IT ALONE AT 3 AM', ia: 'hand', ib: 'moon', pick: 'b', d: 1.5 },
    { a: 'I’M FINE', b: '…NOT REALLY.', ia: 'star', ib: 'sweat', pick: 'b', d: 2.6, pickAt: 2.0, hover: true,
      extra(x, t, S) { bubble(x, t, 540, 1110, S.T.realOf(S.r.t0 + 0.1), S.T.realOf(S.r.t0 + 2.0), 'a friend: “you ok?”', { size: 44, col: '#c9f2d4' }) } },
  ],
  last: 'Strong people | *get hugs too.*',
  ending: 'cut', fin: 2.4,
  camUntil: T => T.rounds[2].t0 + 2.0,
  mid(x, t, S) {
    // Pisces runs in from the right for the hug
    const E = S.T.E, R3 = S.T.rounds[2]
    const p = ease.outCubic(prog(S.v, R3.t0 + 2.05, E + 0.25))
    if (p > 0) { star(x, t, 'pisces', { x: lerp(1200, 680, p), y: 1300, s: 250, mood: 'sparkle', look: [-1, 0], tears: 3, hops: [S.T.realOf(E + 0.3), S.T.realOf(E + 1.0)] }); hearts(x, t, S.T.realOf(E + 0.3), 580, 1140, { n: 6 }) }
  },
  camTears: () => 2,
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const LIFT = +EP.T.realOf(EP.T.rounds[EP.T.rounds.length - 1].slam).toFixed(3)
export const FIRST = +EP.T.realOf(EP.T.rounds[0].slam).toFixed(3)

export const HOOK = 'Capricorn is fine. | *(It is not.)*'
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 2.6
