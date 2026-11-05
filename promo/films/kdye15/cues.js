// kdye15 score: cinematic, E (style engine in promo/scripts/teaser-sound.mjs). Loops: the outro rings into the seam.
// drop 3.0: the blanket · breakdown 8.4: find Orion · lift 14.0: the free show · hits 1.3 the stamp, 12.3 Aldebaran.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kdye15', duration: DURATION, music: { style: 'cinematic', key: 'E', seed: 1615, sections: { drop: 3.0, breakdown: [8.4], lift: [14.0], outroAt: 20.6 }, hits: [1.3, 12.3] }, cues: CUES }
