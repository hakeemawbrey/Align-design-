// srhtxenergy score — synthwave, E♭, 108 bpm grid (arranged by the style engine in promo/scripts/teaser-sound.mjs).
// The drop is the skyline's surge (2.822); it breaks down for the charts (11.12), lifts on the spark (15.04) and rings
// out under the end card (25.6).
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'srhtxenergy', duration: DURATION, music: { style: 'synthwave', key: 'Eb', seed: 22303, sections: { drop: 2.822, breakdown: 11.12, lift: 15.04, outroAt: DURATION - 4.4 } }, cues: CUES }
