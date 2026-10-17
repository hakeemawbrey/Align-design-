// ghosted score (teaser-sound format). Scenes add their sound cues via CUES in scenes/a|b/index.js.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'ghosted', duration: DURATION, music: { chords: [[0,6,[103.83,155.56,207.65,246.94]],[6,13,[110,164.81,220,261.63]],[13,19,[146.83,220,329.63,369.99,554.37]],[19,24,[123.47,185,293.66,329.63,440]],[24,30,[146.83,220,293.66,369.99,440,659.25]]], bpm: 100, beatFrom: 13.2, beatTo: 27 }, cues: CUES }
