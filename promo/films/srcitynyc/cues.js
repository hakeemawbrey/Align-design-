// srcitynyc score — dreamy, Fm, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
// Pads while the skyline rises and the gold star wakes; the groove drops as the elevated train whooshes in (2.82); it thins
// to a breakdown while the same five crawl past (5.9); the lift lands on "Tonight's deck" as the star deals (12.27); hits on
// the mystery card landing (18.55) and "actually new" (22.82); the tonic rings out under the end card (25.6).
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'srcitynyc', duration: DURATION, music: { style: 'dreamy', key: 'Fm', seed: 2401, sections: { drop: 2.82, breakdown: 5.9, lift: 12.27, outroAt: DURATION - 4.4 }, hits: [18.55, 22.82] }, cues: CUES }
