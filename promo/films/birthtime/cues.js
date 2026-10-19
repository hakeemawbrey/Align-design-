// birthtime score (teaser-sound format) — owned by the film's agent: tune chords / bpm / beat window to the edit.
// A minor hush under the typing → Dmaj9 lift as the card charges (5.25) → Bm9 tension into the flip → D resolve from the
// flip (8.45) through the lockup. Pulse only under the card (5.55–12.4); endTagAt lines the shared chakra chimes up with
// the lockup's dots (12.48 + i·0.06) and moon row (13.0+).
import { DURATION, CUES } from './scenes/index.js'
export default {
  id: 'birthtime', duration: DURATION,
  music: {
    chords: [
      [0, 5.25, [110, 164.81, 220, 261.63]],
      [5.25, 7.0, [146.83, 220, 329.63, 369.99, 554.37]],
      [7.0, 8.45, [123.47, 185, 293.66, 329.63, 440]],
      [8.45, 15, [146.83, 220, 293.66, 369.99, 440, 659.25]],
    ],
    bpm: 100, beatFrom: 5.55, beatTo: 12.4,
  },
  endTagAt: 12.1,
  cues: CUES,
}
