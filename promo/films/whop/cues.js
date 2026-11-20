// whop score (teaser-sound format): a slow, glowing bed; the pulse comes in with the cards and rests for the end card.
import { DURATION, CUES } from './scenes/index.js'
export default {
  id: 'whop', duration: DURATION,
  music: {
    chords: [
      [0, 5.0, [146.83, 220, 329.63, 369.99, 554.37]],          // Dmaj9, the stars gather
      [5.0, 9.4, [123.47, 185, 293.66, 329.63, 440]],          // Bm9, the mystery card
      [9.4, 13.8, [110, 220, 277.18, 329.63, 493.88]],         // A add9, the talk deck
      [13.8, 21.5, [98, 196, 293.66, 369.99, 440]],            // G maj7, the founders card
      [21.5, 25.4, [146.83, 220, 293.66, 369.99, 440, 659.25]], // D resolve
    ],
    bpm: 80, beatFrom: 5.0, beatTo: 21.3, pulseGain: 0.2, hatGain: 0.03, arpGain: 0.012,
  },
  cues: CUES,
}
