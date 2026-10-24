// unrationed score (teaser-sound format). Cold, suspended paywall half (A minor-ish pad, no beat) → the turn at 4.25
// opens to D major with the beat from the phone (4.6) to the end line (11.9); the stamp lands on 8.22.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'unrationed', duration: DURATION, music: { chords: [[0, 4.25, [110, 164.81, 220, 261.63]], [4.25, 8.22, [146.83, 220, 329.63, 369.99, 554.37]], [8.22, 11, [123.47, 185, 293.66, 369.99, 493.88]], [11, 15, [146.83, 220, 293.66, 369.99, 440, 659.25]]], bpm: 100, beatFrom: 4.6, beatTo: 11.9 }, cues: CUES }
