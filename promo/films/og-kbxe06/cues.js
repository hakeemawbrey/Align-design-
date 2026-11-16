// og-kbxe06 score: the original's lofi in G, every section shifted by the stretched opening (LEAD). Hard cut, no loop.
import { DURATION, CUES, LEAD } from './scenes/index.js'
const L = LEAD
export default { id: 'og-kbxe06', duration: DURATION, music: { style: 'lofi', key: 'G', seed: 2006, sections: { drop: 1.62 + L, breakdown: [12.9 + L], lift: [17.0 + L], outroAt: DURATION - 0.5 }, hits: [0.35 + L, 18.05 + L] }, cues: CUES }
