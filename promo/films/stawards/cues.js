// stawards score — cinematic, Bb, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs). Awards night.
//   hit 0.6: the spotlight snaps on (DUNNN) · drop 4.489: the curtain parts, "The Star Talk Awards." · breakdown 33.6: the
//   drumroll for the final award · lift 37.27: "goes to… you." · breakdown 45.6: LESSON UNLOCKED · lift 50.3: tonight's
//   deck → "See you next season." · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'stawards', duration: DURATION, music: { style: 'cinematic', key: 'Bb', seed: 25, sections: { drop: 4.489, breakdown: [33.6, 45.6], lift: [37.27, 50.3], outroAt: DURATION - 4.4 }, hits: [0.6, 15.3, 37.27] }, cues: CUES }
