// stcomet score — cinematic, Em, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs). A telenovela.
//   hit 1.711: the third snap-zoom (DUNNN) · drop 4.489: the comet lands · hit 20.044: the whip to your star, fully green
//   breakdown 28.933: "or… you could just say it." · lift 38.378: "Plot twist: cousins." · breakdown 43.933: LESSON UNLOCKED
//   lift 48.933: the talk card → "Comets pass." · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'stcomet', duration: DURATION, music: { style: 'cinematic', key: 'Em', seed: 76, sections: { drop: 4.489, breakdown: [28.933, 43.933], lift: [38.378, 48.933], outroAt: DURATION - 4.4 }, hits: [1.711, 20.044] }, cues: CUES }
