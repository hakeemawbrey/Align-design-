// og-kbxe03 score: the original's funk in A, every section shifted by the stretched opening (LEAD). Hard cut, no loop.
import { DURATION, CUES, LEAD } from './scenes/index.js'
const L = LEAD
export default { id: 'og-kbxe03', duration: DURATION, music: { style: 'funk', key: 'A', seed: 2003, sections: { drop: 1.62 + L, breakdown: [11.9 + L], lift: [15.0 + L], outroAt: 16.05 + L }, hits: [0.35 + L, 16.05 + L] }, cues: CUES }
