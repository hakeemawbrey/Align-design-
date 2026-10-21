// disposable (60s) score — lead-owned. Slow (72 bpm), cold until the turn at ~21, warm after.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'disposable', duration: DURATION, music: { chords: [
  [0,10,[110,164.81,220,261.63]], [10,21,[98,146.83,233.08,293.66]],
  [21,30,[146.83,220,329.63,369.99,554.37]], [30,40,[123.47,185,293.66,329.63,440]],
  [40,50,[98,196,293.66,369.99,493.88]], [50,60,[146.83,220,293.66,369.99,440,659.25]] ],
  bpm: 72, beatFrom: 21.5, beatTo: 54, padGain: 0.024, pulseGain: 0.18 }, cues: CUES }
