// hxseventy score — lofi, Eb (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop at the first GONG · lift at the big gong (THE STARS cut in) · outro under the end card.
import { DURATION, CUES, T } from './scenes/index.js'
export default { id: 'hxseventy', duration: DURATION, music: { style: 'lofi', key: 'Eb', seed: 5202, sections: { drop: T.ding, lift: T.stars, outroAt: DURATION - 4.4 } }, cues: CUES }
