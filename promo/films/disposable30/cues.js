// disposable30 score (teaser-sound format): a cold 92 bpm heartbeat under the hook (Am), then at the flip (4.15)
// the tempo jumps to 132 with hats + arp on D, warm and fast from there to the lockup.
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
  padGain: 0.02,
  // the hook: a cold 92 bpm heartbeat, no hats · THE FLIP (4.15): it doubles up — 132 bpm, hats + arp, all the way to the lockup
  tempo: [
    { from: 0.05, to: 4.1, bpm: 92, pulseGain: 0.24 },
    { from: 4.15, to: 27.6, bpm: 132, pulseGain: 0.3, hatGain: 0.05, arpGain: 0.032 },
  ] },
  cues: [...CUES, ['riser', 2.6, 4.12, 0.09]] }
