// ktte11: THIS OR THAT: LOVE EDITION, "Aquarius Dodges the Feelings Card" (~10 s vertical, star advice trial reel,
// synthwave · F#). Loops. Rows: promo/films/month2/m29.md. Format: ../../ktte01/scenes/ttkit.js (read-only).
//   frame 0: a FEELINGS card flying at Aquarius' head as it dodges into SPACE FACTS; glitch.
//   DEEP TALK vs SPACE FACTS → SPACE FACTS · HOLD HANDS vs HIGH FIVE → HIGH FIVE
//   twist: the FEELINGS card boomerangs back: SAY THE FEELING vs ANOTHER FUN FACT → SAY THE FEELING:
//   "some stars orbit each other for life. anyway. I like you." (binary stars: real). Pisces cries in the tissue cam.
//   Last: "Say the feeling. *Keep the fun fact.*" Seamless loop back to frame 0.
import { makeTT, drawCard, bubble, ease, prog, lerp } from '../../ktte01/scenes/ttkit.js'

const EP = makeTT({
  id: 'ktte11', mode: 'solo', signs: ['aquarius'],
  hook: 'AQUARIUS DODGES | THE *FEELINGS* CARD.', accent: '#38c4ec',
  brk: { kind: 'glitch', t: 0.12 },
  rounds: [
    { a: 'DEEP TALK', b: 'SPACE FACTS', ia: 'heart', ib: 'star', pick: 'b' },
    { a: 'HOLD HANDS', b: 'HIGH FIVE', ia: 'heart', ib: 'hand', pick: 'b', d: 1.4 },
    { a: 'SAY THE FEELING', b: 'ANOTHER FUN FACT', ia: 'heart', ib: 'star', pick: 'a', d: 2.4, pickAt: 1.8, hover: true },
  ],
  last: 'Say the feeling. | *Keep the fun fact.*',
  ending: 'loop', fin: 3.0,
  mid(x, t, S) {
    // the FEELINGS card whizzing past Aquarius' head at frame 0
    if (S.v < 0.7) { const p = prog(S.v, -0.5, 0.7); drawCard(x, t, { cx: lerp(-200, 1300, p), cy: 1080 - 120 * Math.sin(Math.PI * p), rot: p * 6, k: 0.45, side: 'c', text: 'FEELINGS', ic: 'heart', tag: 'INCOMING' }) }
    const E = S.T.E
    bubble(x, t, 390, 1580, S.T.realOf(E + 0.15), 99, 'some stars orbit each other\nfor life. anyway. I like you.', { size: 38 })
    void ease
  },
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const LIFT = +EP.T.realOf(EP.T.rounds[EP.T.rounds.length - 1].slam).toFixed(3)
