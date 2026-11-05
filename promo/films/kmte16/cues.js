// kmte16 score: cinematic, Dm. drop 5.0: chapter 1 · breakdowns 30.0 (the what-ifs), 44.0 (the old photo) · lifts 17.0, 58.0 · hits: the pick, the flip. Hard cut.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kmte16', duration: DURATION, music: { style: 'cinematic', key: 'Dm', seed: 2116, sections: { drop: 5.0, breakdown: [30.0, 44.0], lift: [17.0, 58.0], outroAt: DURATION - 2 }, hits: [23.6, 51.2] }, cues: CUES }
