// st5objection score — cinematic, Gm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop at Ophiuchus's landing ("I OBJECT!") · lift when Saturn opens the rulebook · outro under the end card.
import { DURATION, CUES, TIMES } from './scenes/index.js'
export default { id: 'st5objection', duration: DURATION, music: { style: 'cinematic', key: 'Gm', seed: 707, sections: { drop: +TIMES.land.toFixed(2), lift: +TIMES.h2.toFixed(2), outroAt: DURATION - 4.4 } }, cues: CUES }
