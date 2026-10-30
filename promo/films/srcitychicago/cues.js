// srcitychicago score — chiptune, D, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
// The drop lands on the big gust that knocks Aries sideways (2.82); it breaks down when THE HAWK takes the dibs chair (5.88);
// it lifts when the two charts link and the snow turns to sparkles (7.82); hit on the TAKEN sign landing (12.6).
import { DURATION, CUES, T } from './scenes/index.js'
export default { id: 'srcitychicago', duration: DURATION, music: { style: 'chiptune', key: 'D', seed: 2403, sections: { drop: T.drop, breakdown: T.hawk, lift: T.link, outroAt: DURATION - 4.4 }, hits: [T.taken] }, cues: CUES }
