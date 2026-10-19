// photos score (teaser-sound format). Uneasy A-minor under the glitching hook, warm D under the chart and the reveal,
// open D for the end line and lockup. The pulse carries the answer (3.0–10.2) and stops for the end.
import { DURATION, CUES } from './scenes/index.js'
export default {
  id: 'photos', duration: DURATION,
  music: {
    chords: [[0, 2.9, [110, 164.81, 220, 261.63, 311.13]], [2.9, 7.3, [146.83, 220, 329.63, 369.99, 554.37]], [7.3, 10.3, [123.47, 185, 293.66, 369.99, 493.88]], [10.3, 15, [146.83, 220, 293.66, 369.99, 440, 659.25]]],
    bpm: 96, beatFrom: 3.0, beatTo: 10.2,
  },
  cues: CUES,
}
