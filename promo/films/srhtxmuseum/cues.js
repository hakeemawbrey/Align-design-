// srhtxmuseum score — screwed, E, 108 bpm grid (arranged by the style engine in promo/scripts/teaser-sound.mjs).
// It drops as the museum front finishes building (2.267), breaks down for the gilded-frame reveal (11.12), lifts for
// "Skip the small talk" (17.27) and rings out under the end card (25.6).
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'srhtxmuseum', duration: DURATION, music: { style: 'screwed', key: 'E', seed: 22202, sections: { drop: 2.267, breakdown: 11.12, lift: 17.27, outroAt: DURATION - 4.4 } }, cues: CUES }
