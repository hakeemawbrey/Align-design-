// nfde06 score: cinematic, Dm. drop 3.1: SKIP · breakdown 11.0: TRY · lift 19.3: the tip · hit 8.4: the SKIP stamp.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'nfde06', duration: DURATION, music: { style: 'cinematic', key: 'Dm', seed: 3806, sections: { drop: 3.1, breakdown: [11.0], lift: [19.3], outroAt: DURATION - 2.4 }, hits: [8.4] }, cues: CUES }
