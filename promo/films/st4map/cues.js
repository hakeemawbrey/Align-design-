// st4map score — cinematic, Em, 108 bpm grid (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.82: "every sign-up is a star" as the stream starts · breakdown 6.45: "which city lights up next?" · lift 10.0: "Light it up." · hit 11.3: every city flares · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'st4map', duration: DURATION, music: { style: 'cinematic', key: 'Em', seed: 871, sections: { drop: 2.82, breakdown: 6.45, lift: 10.0, outroAt: DURATION - 4.4 }, hits: [11.3] }, cues: CUES }
