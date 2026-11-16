// og-kbxe09 score: the original's pop in E, every section shifted by the stretched opening (LEAD). Hard cut, no loop.
import { DURATION, CUES, LEAD } from './scenes/index.js'
const L = LEAD
export default { id: 'og-kbxe09', duration: DURATION, music: { style: 'pop', key: 'E', seed: 2009, sections: { drop: 1.62 + L, breakdown: [13.2 + L], lift: [18.0 + L], outroAt: DURATION - 0.5 }, hits: [0.35 + L, 19.05 + L] }, cues: CUES }
