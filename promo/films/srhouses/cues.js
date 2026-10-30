// srhouses score — house, C minor, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
// Pads + hats while the building pops up and the landlord star talks; the four-on-the-floor drops as the tour starts
// (5.04) and runs through all 12 rooms; it breaks down for "Who lives where?" (15.2) and lifts into "Welcome home." (21.96).
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'srhouses', duration: DURATION, music: { style: 'house', key: 'Cm', seed: 152, sections: { drop: 5.04, breakdown: 15.2, lift: 21.96, outroAt: DURATION - 4.4 } }, cues: CUES }
