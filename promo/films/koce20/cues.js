// koce20 score — cinematic, F#m. drop 1.9: card one after the freeze · breakdowns at the deals · lift 44.0: card three · lift 54.4: the garden
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'koce20', duration: DURATION, music: { style: 'cinematic', key: 'F#m', seed: 2220, sections: { drop: 1.9, breakdown: [18.4, 36.6], lift: [25.5, 44.0, 54.4], outroAt: DURATION - 0.5 } }, cues: CUES }
