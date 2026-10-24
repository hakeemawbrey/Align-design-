// bios score (teaser-sound format), tuned to the edit:
//   0–3.5 cold and sparse (the bios) · 3.5 the bloom opens up (Dmaj9, "Your sky doesn't.") · 5.2 Bm9 (One sky. Three yous.)
//   7.6 A add9 (the user manual) · 10.1 D resolve (end line + lockup). Pulse runs from the turn to just after the lockup.
import { DURATION, CUES } from './scenes/index.js'
export default {
  id: 'bios', duration: DURATION,
  music: {
    chords: [
      [0, 3.5, [110, 164.81, 220, 261.63]],                    // Am (open, cold)
      [3.5, 5.2, [146.83, 220, 329.63, 369.99, 554.37]],       // Dmaj9, the bloom
      [5.2, 7.6, [123.47, 185, 293.66, 329.63, 440]],          // Bm9
      [7.6, 10.1, [110, 220, 277.18, 329.63, 493.88]],         // A add9
      [10.1, 15, [146.83, 220, 293.66, 369.99, 440, 659.25]],  // D resolve
    ],
    bpm: 96, beatFrom: 3.5, beatTo: 12.6,
  },
  cues: CUES,
}
