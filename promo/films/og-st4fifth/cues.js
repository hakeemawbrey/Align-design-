// st4fifth score — pop, Db, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.82: inside the 5th-floor party, the stars start talking · lift on "play": the disco ball flares · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'st4fifth', duration: DURATION, music: { style: 'pop', key: 'Db', seed: 147, sections: { drop: 2.82, lift: 6.8, outroAt: DURATION - 4.4 } }, cues: CUES }
