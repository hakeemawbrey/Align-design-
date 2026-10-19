// swipes score (teaser-sound format). Cold and stuck under the swiping, suspended through the look-up, warm from the
// star landing as the card back (6.05); the pulse runs from the landing to the lockup. Scene sound cues: scenes/index.js.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'swipes', duration: DURATION, music: { chords: [[0,3.85,[110,164.81,220,261.63]],[3.85,6.05,[98,146.83,220,293.66]],[6.05,11,[146.83,220,329.63,369.99,554.37]],[11,15,[146.83,220,293.66,369.99,440,659.25]]], bpm: 100, beatFrom: 6.05, beatTo: 12.8 }, cues: CUES }
