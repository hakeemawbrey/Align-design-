// origins score — cinematic, G minor, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
// Pads + strings for the question; toms drop in Babylon (3.93) with bars landing on the 12 stamp, the Greeks and
// the 0° stamp; it breaks down for “Plot twist: Earth wobbles.” (27.82), lifts on the seasons (34.49), lands on “Old sky.” (40.6).
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'origins', duration: DURATION, music: { style: 'cinematic', key: 'Gm', seed: 2, sections: { drop: 3.93, breakdown: 27.82, lift: 34.49, outroAt: 40.6 }, hits: [8.38, 23.93] }, cues: CUES }
