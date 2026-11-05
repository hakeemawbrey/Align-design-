// ktte10: THIS OR THAT: LOVE EDITION, "Capricorn, Are You Fine?" (~9 s vertical, star advice trial reel, cinematic · Eb).
// Rows: promo/films/month2/m29.md. Format: ../../ktte01/scenes/ttkit.js (read-only).
//   frame 0: Capricorn mid-lift (straining) into SAY "I'M FINE"; screen shake.
//   ASK FOR HELP vs DO IT ALONE → ALONE. Twist: a friend's card "YOU OK?": "I'M FINE" vs "…NOT REALLY." → NOT REALLY.
//   Pisces leaves the tissue cam and runs in crying with a hug. Last: "Strong people *get hugs too.*" Hard cut.
import { makeTT, star, hearts, bubble, lerp, ease, prog } from '../../ktte01/scenes/ttkit.js'

const EP = makeTT({
  id: 'ktte10', mode: 'solo', signs: ['capricorn'],
  hook: 'CAPRICORN, ARE YOU | *ACTUALLY FINE?*', accent: '#2fc79a',
  brk: { kind: 'shake', t: 0.12 },
  rounds: [
    { a: 'VENT', b: 'SAY “I’M FINE”', ia: 'bubble', ib: 'star', pick: 'b' },
    { a: 'ASK FOR HELP', b: 'DO IT ALONE', ia: 'hand', ib: 'star', pick: 'b', d: 1.3 },
    { a: 'I’M FINE', b: '…NOT REALLY.', ia: 'star', ib: 'sweat', pick: 'b', d: 2.6, pickAt: 2.0, hover: true,
      extra(x, t, S) { bubble(x, t, 540, 1085, S.T.realOf(S.r.t0 + 0.1), S.T.realOf(S.r.t0 + 2.0), 'a friend: “you ok?”', { size: 44, col: '#c9f2d4' }) } },
  ],
  last: 'Strong people | *get hugs too.*',
  ending: 'cut', fin: 2.4,
  camUntil: T => T.rounds[2].t0 + 2.0,
  mid(x, t, S) {
    // Pisces runs in from the right for the hug
    const E = S.T.E, R3 = S.T.rounds[2]
    const p = ease.outCubic(prog(S.v, R3.t0 + 2.05, E + 0.25))
    if (p > 0) { star(x, t, 'pisces', { x: lerp(1200, 640, p), y: 1300, s: 250, mood: 'sparkle', look: [-1, 0], tears: 3, hops: [S.T.realOf(E + 0.3), S.T.realOf(E + 1.0)] }); hearts(x, t, S.T.realOf(E + 0.3), 560, 1140, { n: 6 }) }
  },
  camTears: () => 2,
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const LIFT = +EP.T.realOf(EP.T.rounds[EP.T.rounds.length - 1].slam).toFixed(3)
