// st6taurus score — lofi, Ab (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop at the title card's glyph slam · lift as the interview starts · outro under the end card.
import { DURATION, CUES, T } from './scenes/index.js'
export default { id: 'st6taurus', duration: DURATION, music: { style: 'lofi', key: 'Ab', seed: 602, sections: { drop: +(T.title + 0.95).toFixed(2), lift: +T.personal[0].toFixed(2), outroAt: DURATION - 4.4 } }, cues: CUES }
