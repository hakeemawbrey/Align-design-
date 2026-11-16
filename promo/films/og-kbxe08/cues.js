// og-kbxe08 score: the original's house in C, every section shifted by the stretched opening (LEAD). Hard cut, no loop.
import { DURATION, CUES, LEAD } from './scenes/index.js'
const L = LEAD
export default { id: 'og-kbxe08', duration: DURATION, music: { style: 'house', key: 'C', seed: 2008, sections: { drop: 1.62 + L, breakdown: [12.6 + L], lift: [16.0 + L], outroAt: 17.05 + L }, hits: [0.35 + L, 17.05 + L] }, cues: CUES }
