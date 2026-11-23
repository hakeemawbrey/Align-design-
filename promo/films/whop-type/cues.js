// whop-type score (teaser-sound format): the feature's palette at 96 bpm. A pad that changes with each
// section, a soft pulse from the first bracket line to the tagline, light hats and a quiet arp in the middle.
import { DURATION, CUES } from './scenes/index.js'
export default {
  id: 'whop-type', duration: DURATION,
  music: {
    padGain: 0.024,
    chords: [
      [0, 6.05, [146.83, 220, 329.63, 369.99, 554.37]],          // Dmaj9 · the stars have aligned / now in Houston
      [6.05, 9.75, [123.47, 185, 293.66, 329.63, 440]],          // Bm9 · the pill
      [9.75, 13.25, [98, 196, 293.66, 369.99, 493.88]],          // Gmaj7 · the deck
      [13.25, 18.55, [110, 220, 277.18, 329.63, 493.88]],        // A add9 · card first, the mystery card
      [18.55, 21.8, [98, 196, 293.66, 369.99, 440]],             // Gmaj7 · the founders card
      [21.8, 27.0, [123.47, 246.94, 293.66, 369.99, 440]],       // Bm · talk deck → tagline
      [27.0, DURATION, [146.83, 220, 293.66, 369.99, 440, 659.25]], // D resolve
    ],
    tempo: [
      { from: 3.6, to: 9.7, bpm: 96, pulseGain: 0.2, hatGain: 0.025 },
      { from: 10.0, to: 26.7, bpm: 96, pulseGain: 0.22, hatGain: 0.035, arpGain: 0.014 },
    ],
  },
  cues: CUES,
}
