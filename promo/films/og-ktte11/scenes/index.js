// og-ktte11: social rework of ktte11 "Aquarius Dodges the Feelings Card" (static HOOK box over a longer opening; no
// series bug, slam title or glitch, no loop; Aquarius pushed to lecture-length deflection; ends on the confession).
// Kit: ./ttkit.js (og social copy of ../../ktte01/scenes/ttkit.js). Was:
// ktte11: THIS OR THAT: LOVE EDITION, "Aquarius Dodges the Feelings Card" (~10 s vertical, star advice trial reel,
// synthwave · F#).
//   frame 0: a FEELINGS card drifting past Aquarius' head as it leans toward A 40-MINUTE SPACE LECTURE.
//   DEEP TALK vs 40-MINUTE SPACE LECTURE → LECTURE · HOLD HANDS vs HIGH FIVE FROM SIX FEET → HIGH FIVE
//   twist: SAY THE FEELING vs ANOTHER FUN FACT → SAY THE FEELING:
//   "some stars orbit each other for life. anyway. I like you." (binary stars: real). Pisces cries in the tissue cam.
//   Last: "Say the feeling. *Keep the fun fact.*" Hard cut.
import { makeTT, drawCard, bubble, prog, lerp } from './ttkit.js'

const EP = makeTT({
  id: 'og-ktte11', mode: 'solo', signs: ['aquarius'],
  hook: '', accent: '#38c4ec',
  rounds: [
    { a: 'DEEP TALK', b: 'A 40-MINUTE SPACE LECTURE', ia: 'heart', ib: 'star', pick: 'b', hover: true },
    { a: 'HOLD HANDS', b: 'HIGH FIVE FROM SIX FEET', ia: 'heart', ib: 'hand', pick: 'b', d: 1.5 },
    { a: 'SAY THE FEELING', b: 'ANOTHER FUN FACT', ia: 'heart', ib: 'star', pick: 'a', d: 2.4, pickAt: 1.8, hover: true },
  ],
  last: 'Say the feeling. | *Keep the fun fact.*',
  ending: 'cut', fin: 3.0, finY: 780,
  mid(x, t, S) {
    // the FEELINGS card drifting past Aquarius' head through the opening
    if (S.v < 1.6) { const p = prog(S.v, -0.5, 1.6); drawCard(x, t, { cx: lerp(-200, 1300, p), cy: 1080 - 120 * Math.sin(Math.PI * p), rot: p * 6, k: 0.45, side: 'c', text: 'FEELINGS', ic: 'heart', tag: 'INCOMING' }) }
    const E = S.T.E
    bubble(x, t, 470, 1125, S.T.realOf(E + 0.15), 99, 'some stars orbit each other\nfor life. anyway. I like you.', { size: 38 })
  },
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const LIFT = +EP.T.realOf(EP.T.rounds[EP.T.rounds.length - 1].slam).toFixed(3)
export const FIRST = +EP.T.realOf(EP.T.rounds[0].slam).toFixed(3)

export const HOOK = 'Say one feeling? | *“Fun fact…”*'
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 2.6
