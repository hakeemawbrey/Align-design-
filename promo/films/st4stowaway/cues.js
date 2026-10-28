// st4stowaway score — lofi, Bb, 108 bpm grid (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.82: the trunk swings open on the ghost · lift 7.9: "Out loud is brave." · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'st4stowaway', duration: DURATION, music: { style: 'lofi', key: 'Bb', seed: 4545, sections: { drop: 2.82, lift: 7.9, outroAt: DURATION - 4.4 } }, cues: CUES }
