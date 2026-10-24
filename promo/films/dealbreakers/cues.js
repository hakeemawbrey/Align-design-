// dealbreakers score (teaser-sound format): warm A while it's sweet, it sours on the message (3.1), the break opens into
// D maj9 for the answer, D add9/6 for the end line + lockup. Pulse from the break to the lockup.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'dealbreakers', duration: DURATION, music: { chords: [[0,3.1,[110,164.81,220,277.18,329.63]],[3.1,5.1,[103.83,155.56,207.65,246.94]],[5.1,11,[146.83,220,329.63,369.99,554.37]],[11,15,[146.83,220,293.66,369.99,440,659.25]]], bpm: 100, beatFrom: 5.1, beatTo: 12.6 }, cues: CUES }
