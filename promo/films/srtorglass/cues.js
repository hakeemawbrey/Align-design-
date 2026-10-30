// srtorglass score — synthwave, Bb, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
// The groove drops as the skyline's windows light (2.822), breaks down for the binoculars gag (16.5), lifts when the two
// float out of their boxes (20.0) and hits as they meet on the lakeshore (22.27); the outro is the end card (25.6).
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'srtorglass', duration: DURATION, music: { style: 'synthwave', key: 'Bb', seed: 129, sections: { drop: 2.822, breakdown: 16.5, lift: 20.0, outroAt: DURATION - 4.4 }, hits: [14.0, 22.27] }, cues: CUES }
