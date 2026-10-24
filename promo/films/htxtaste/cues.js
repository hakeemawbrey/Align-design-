// htxtaste score — house, G, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
// The groove drops as the food lands (0.6); it thins to a breakdown under "Your dating app should too." while the plate
// whirls (3.38), builds on the riser and lifts with the full band as the two charts lock (6.16); the end card lands at 10.6.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'htxtaste', duration: DURATION, music: { style: 'house', key: 'G', seed: 8, sections: { drop: 0.6, breakdown: 3.378, lift: 6.156, outroAt: DURATION - 4.4 } }, cues: CUES }
