// koce14 score — chiptune, Bb. drop 1.1: the card lands · lift 6.8: the answers flip · plays to the hard cut.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'koce14', duration: DURATION, music: { style: 'chiptune', key: 'Bb', seed: 2214, sections: { drop: 1.1, lift: 6.8, outroAt: DURATION - 0.5 } }, cues: CUES }
