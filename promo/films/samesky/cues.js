// samesky score (teaser-sound format). Scenes add their sound cues via CUES in scenes/a|b/index.js.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'samesky', duration: DURATION, music: { chords: [[0,7.5,[98,146.83,196,246.94]],[7.5,15,[110,164.81,220,277.18]],[15,20,[146.83,220,329.63,369.99,554.37]],[20,25,[98,196,293.66,369.99,493.88]],[25,30,[146.83,220,293.66,369.99,440,659.25]]], bpm: 90, beatFrom: 7.5, beatTo: 27 }, cues: CUES }
