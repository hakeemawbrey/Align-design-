// st6sag score — house, G (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop at the title card's glyph slam · lift as the interview starts · outro under the end card.
import { DURATION, CUES, T } from './scenes/index.js'
export default { id: 'st6sag', duration: DURATION, music: { style: 'house', key: 'G', seed: 609, sections: { drop: +(T.title + 0.95).toFixed(2), lift: +T.personal[0].toFixed(2), outroAt: DURATION - 4.4 } }, cues: CUES }
