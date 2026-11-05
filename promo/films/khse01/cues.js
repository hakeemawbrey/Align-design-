// khse01 score: chiptune, E (style engine in promo/scripts/teaser-sound.mjs). breakdown at the last question
// (the music drops out under a tape stop), lift + hit on THE STARS' last line. Hard cut at the end.
import { DURATION, CUES, T } from './scenes/index.js'
import { hotCues } from './scenes/hotkit.js'
export default hotCues({ DURATION, CUES, T }, { id: 'khse01', ending: 'cut', music: { style: 'chiptune', key: 'E', seed: 3501 } })
