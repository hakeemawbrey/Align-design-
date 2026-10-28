// st6leo score — funk, Bb (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop at the title card's glyph slam · lift as the interview starts · outro under the end card.
import { DURATION, CUES, T } from './scenes/index.js'
export default { id: 'st6leo', duration: DURATION, music: { style: 'funk', key: 'Bb', seed: 605, sections: { drop: +(T.title + 0.95).toFixed(2), lift: +T.personal[0].toFixed(2), outroAt: DURATION - 4.4 } }, cues: CUES }
