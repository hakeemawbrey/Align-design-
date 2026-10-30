// srvoteballot score — pop, A, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
// Sections follow the picture: the drop lands on "you." (1.16), it breaks down as the ballot sinks and the votes rise as
// stars (5.48), lifts into "Pick the next sky." (10.71); hits on your tap (4.77) and the gold check (13.38);
// outro = the end card (15.6).
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'srvoteballot', duration: DURATION, music: { style: 'pop', key: 'A', seed: 277, sections: { drop: 1.156, breakdown: 5.489, lift: 10.711, outroAt: DURATION - 4.4 }, hits: [4.767, 13.378] }, cues: CUES }
