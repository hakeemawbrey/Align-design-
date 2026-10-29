// st10capricorn score — cinematic, Cm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 12.2: the meeting nobody came to · breakdown 25.6: alone in the sand · lift 42: Leo takes its hand ·
//   outro under the end card.
import { DURATION, CUES, T } from './scenes/index.js'
export default { id: 'st10capricorn', duration: DURATION, music: { style: 'cinematic', key: 'Cm', seed: 1010, sections: { drop: T.meet, breakdown: T.sad, lift: T.win, outroAt: DURATION - 4.4 } }, cues: CUES }
