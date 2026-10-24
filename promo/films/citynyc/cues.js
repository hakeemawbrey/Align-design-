// citynyc score — synthwave, Cm, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
// Pads + arp while the skyline rises; the groove drops as the elevated train whooshes in (2.82); it thins to a
// breakdown while the train crawls past with the same five (5.9); the lift lands on "Tonight's deck" (12.27);
// hits on the mystery card landing (18.55) and "actually new" (22.82); the tonic rings out under the end card (25.6).
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'citynyc', duration: DURATION, music: { style: 'synthwave', key: 'Cm', seed: 77, sections: { drop: 2.82, breakdown: 5.9, lift: 12.27, outroAt: DURATION - 4.4 }, hits: [18.55, 22.82] }, cues: CUES }
