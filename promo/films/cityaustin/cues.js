// cityaustin score — funk, G, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
// The groove drops as the band starts strumming (0.6), breaks down on "…and 'between things.'" when the strumming
// stops (2.82), lifts as the DEALBREAKERS card lands (5.6), and the outro is the end card (10.6).
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'cityaustin', duration: DURATION, music: { style: 'funk', key: 'G', seed: 107, sections: { drop: 0.6, breakdown: 2.82, lift: 5.6, outroAt: DURATION - 4.4 } }, cues: CUES }
