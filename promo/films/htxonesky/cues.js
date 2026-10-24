// htxonesky score — dreamy, Db, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
// Pads under the hellos; the groove drops as the skyline springs up behind the crowd on "One city." (2.82); it thins to a
// breakdown for "And one sky" while the bubbles float up into stars (6.45); the lift lands as the stars fall back and bloom
// into charts (11.71); a hit on the gold arc landing (17.82); the tonic rings out under the end card (25.6).
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'htxonesky', duration: DURATION, music: { style: 'dreamy', key: 'Db', seed: 93, sections: { drop: 2.82, breakdown: 6.45, lift: 11.71, outroAt: DURATION - 4.4 }, hits: [0.6, 17.82] }, cues: CUES }
