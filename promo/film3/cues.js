// Film 3 score + sound cues (teaser-sound format). Scenes export `cues`; kinds:
// tick (t, gain) · whoosh (t, len, gain) · bell (t, hz, gain, decay, pan) · boom (t, gain) · glitter (t0, t1) · riser (t0, t1, gain)
import { DURATION } from './scenes/index.js'
import { cues as c1 } from './scenes/g1-rigged.js'
import { cues as c2 } from './scenes/g2-break.js'
import { cues as c3 } from './scenes/g3-blind.js'
import { cues as c4 } from './scenes/g4-end.js'
export default {
  id: 'film3', duration: DURATION,
  music: {
    chords: [
      [0, 3.7, [103.83, 155.56, 207.65, 246.94]],            // G#dim-ish cold, uneasy (rigged)
      [3.7, 6.2, [146.83, 220, 329.63, 369.99, 554.37]],     // Dmaj9 — the break, space floods in
      [6.2, 9.0, [123.47, 185, 293.66, 329.63, 440]],        // Bm9
      [9.0, 11.3, [110, 220, 277.18, 329.63, 493.88]],       // A add9 — lock / face last
      [11.3, 15, [146.83, 220, 293.66, 369.99, 440, 659.25]], // D resolve
    ],
    bpm: 104, beatFrom: 3.7, beatTo: 12.6,
  },
  cues: [...(c1 || []), ...(c2 || []), ...(c3 || []), ...(c4 || [])],
}
