// hxboothbar score — pop, D (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop at the first GONG · lift at the big gong (THE STARS cut in) · outro under the end card.
import { DURATION, CUES, T } from './scenes/index.js'
export default { id: 'hxboothbar', duration: DURATION, music: { style: 'pop', key: 'D', seed: 5404, sections: { drop: T.ding, lift: T.stars, outroAt: DURATION - 4.4 } }, cues: CUES }
