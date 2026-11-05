// kmte19 score: synthwave, Bm. drop 5.0: the situationship · breakdowns 32.0 (the fear), 46.0 (the listen) · lifts 18.0, 60.0 · hits: the slideshow, the line. Hard cut.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kmte19', duration: DURATION, music: { style: 'synthwave', key: 'Bm', seed: 2119, sections: { drop: 5.0, breakdown: [32.0, 46.0], lift: [18.0, 60.0], outroAt: DURATION - 2 }, hits: [25.8, 64.4] }, cues: CUES }
