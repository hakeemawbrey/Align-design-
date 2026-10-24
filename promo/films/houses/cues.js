// houses score — funk, G dorian, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
// Clav + hats while the building pops up; the funk drops as the first room lights (6.71) and grooves through all 12;
// it drops to bass + organ for “Your birth time decides…” (23.38) and lands on “Welcome home.” (26.71).
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'houses', duration: DURATION, music: { style: 'funk', key: 'Gm', seed: 19, sections: { drop: 6.71, breakdown: 23.38, outroAt: 26.71 } }, cues: CUES }
