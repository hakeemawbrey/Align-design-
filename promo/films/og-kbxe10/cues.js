// og-kbxe10 score: the original's synthwave in Am, every section shifted by the stretched opening (LEAD). Hard cut, no loop.
import { DURATION, CUES, LEAD } from './scenes/index.js'
const L = LEAD
export default { id: 'og-kbxe10', duration: DURATION, music: { style: 'synthwave', key: 'Am', seed: 2010, sections: { drop: 1.62 + L, breakdown: [12.4 + L], lift: [16.0 + L], outroAt: 17.05 + L }, hits: [0.35 + L, 17.05 + L] }, cues: CUES }
