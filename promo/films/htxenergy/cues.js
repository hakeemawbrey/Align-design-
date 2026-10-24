// htxenergy score — cinematic, Em, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
// Pads + arp while the skyline springs up and its energy lines draw on; the band drops with the surge (2.82); it thins
// to a breakdown as the city sinks away and the two people appear (5.6); the lift lands on the lightning spark between
// the two charts (15.04); a hit on the final collision (23.38); the tonic rings out under the end card (25.6).
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'htxenergy', duration: DURATION, music: { style: 'cinematic', key: 'Em', seed: 93, sections: { drop: 2.822, breakdown: 5.6, lift: 15.044, outroAt: DURATION - 4.4 }, hits: [23.378] }, cues: CUES }
