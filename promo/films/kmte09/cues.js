// kmte09 score: synthwave, F#m. drop 1.3: the skid · breakdown 8.4: "I like my freedom" · lift 12.9: the card handed back · hit 13.9: "okay. I'll ask." Hard cut.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kmte09', duration: DURATION, music: { style: 'synthwave', key: 'F#m', seed: 2109, sections: { drop: 1.3, breakdown: [8.4], lift: [12.9], outroAt: DURATION - 1.2 }, hits: [13.9] }, cues: CUES }
