// srbios score: funk, Gm, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs). A sparse, bored
// intro under the pile of bios; the drop lands as the pile goes poof and the sky answers (5.6); the tonic rings out
// under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'srbios', duration: DURATION, music: { style: 'funk', key: 'Gm', seed: 41, sections: { drop: 5.6, outroAt: DURATION - 4.4 } }, cues: CUES }
