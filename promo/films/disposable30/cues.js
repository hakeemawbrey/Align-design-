// disposable30 score (teaser-sound format) — cold until the turn at ~9.2, warm after. Scenes add their sound cues via CUES.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'disposable30', duration: DURATION, music: { chords: [[0,5.4,[110,164.81,220,261.63]],[5.4,9.2,[98,146.83,233.08,293.66]],[9.2,17,[146.83,220,329.63,369.99,554.37]],[17,23.5,[123.47,185,293.66,329.63,440]],[23.5,30,[146.83,220,293.66,369.99,440,659.25]]], bpm: 92, beatFrom: 9.3, beatTo: 27.5 }, cues: CUES }
