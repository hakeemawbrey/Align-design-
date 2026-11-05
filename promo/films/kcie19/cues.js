// kcie19 score: screwed, Em. The beat drops after the record scratch (2.05); a loop: the music runs to the end.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kcie19', duration: DURATION, music: { style: 'screwed', key: 'Em', seed: 2119, sections: { drop: 2.05, breakdown: [25.8, 49.0], lift: [37.4, 60.4], outroAt: DURATION - 0.5 } }, cues: CUES }
