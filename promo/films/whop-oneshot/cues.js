// whop-oneshot score (teaser-sound format): 96 bpm, D major, the feature's chord walk (D → Bm → G → A → D).
// A soft pulse carries the camera from the deck to the constellation; the opening line and the end mark breathe without it.
import { DURATION, CUES } from './scenes/index.js'
export default {
  id: 'whop-oneshot', duration: DURATION,
  music: {
    padGain: 0.024,
    chords: [
      [0, 8.4, [146.83, 220, 329.63, 369.99, 554.37]],           // Dmaj9 · the line, the deck
      [8.4, 12.6, [123.47, 185, 293.66, 329.63, 440]],          // Bm9 · Juniper's mystery card
      [12.6, 17.6, [98, 196, 293.66, 369.99, 493.88]],          // Gmaj7 · the founders card
      [17.6, 21.6, [110, 220, 277.18, 329.63, 493.88]],         // A add9 · the talk fan
      [21.6, DURATION, [146.83, 220, 293.66, 369.99, 440, 659.25]], // D · the constellation and the mark
    ],
    bpm: 96, beatFrom: 3.75, beatTo: 24.5, pulseGain: 0.17, hatGain: 0.022, arpGain: 0.011, arpFrom: 8.4, arpTo: 21.6,
  },
  cues: CUES,
}
