// kcie19 score: screwed, Em. The beat drops after the record scratch (2.9); a loop: the music runs to the end.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'og-kcie19', duration: DURATION, music: { style: 'screwed', key: 'Em', seed: 2119, sections: { drop: 2.9, breakdown: [26.65, 49.85], lift: [38.25, 61.25], outroAt: DURATION - 0.5 } }, cues: CUES }
