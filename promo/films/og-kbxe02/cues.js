// og-kbxe02 score: the original's lofi in D, every section shifted by the stretched opening (LEAD). Hard cut, no loop.
import { DURATION, CUES, LEAD } from './scenes/index.js'
const L = LEAD
export default { id: 'og-kbxe02', duration: DURATION, music: { style: 'lofi', key: 'D', seed: 2002, sections: { drop: 1.62 + L, breakdown: [12.4 + L], lift: [16.0 + L], outroAt: DURATION - 0.5 }, hits: [0.35 + L, DURATION - 0.95] }, cues: CUES }
