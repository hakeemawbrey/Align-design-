// disposable30 score (teaser-sound format): upbeat from frame one — 104 bpm pulse + hats the whole way, cold Am under
// the hook, the flip lands on D (4.1) and the arp kicks in, warm from there to the lockup.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'disposable30', duration: DURATION, music: {
  chords: [
    [0, 4.1, [110, 164.81, 220, 261.63]],                    // Am — the hook, cold
    [4.1, 10.5, [146.83, 220, 329.63, 369.99, 554.37]],      // Dmaj9 — the flip
    [10.5, 15.5, [123.47, 185, 293.66, 329.63, 440]],        // Bm9 — two charts, the lock
    [15.5, 19.5, [98, 196, 293.66, 369.99, 493.88]],         // Gmaj7 — the reveal
    [19.5, 24, [110, 220, 277.18, 329.63, 493.88]],          // A add9 — talk in cards
    [24, 30, [146.83, 220, 293.66, 369.99, 440, 659.25]],    // D — resolve
  ],
  bpm: 104, beatFrom: 0.05, beatTo: 27.6, pulseGain: 0.28, hatGain: 0.04, arpGain: 0.03, arpFrom: 4.15, arpTo: 27.4, padGain: 0.02 },
  cues: CUES }
