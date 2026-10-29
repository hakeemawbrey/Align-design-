// stpirates score — cinematic, Gm, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs). A swashbuckler.
//   hit 0.6: the map slams down · drop 4.489: "Pirates of the Heart." · breakdown 33.45: three islands, no treasure (rain)
//   lift 37.2: the tiny island · breakdown 45.6: LESSON UNLOCKED · lift 50.3: tonight's deck → "Drop anchor." · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'stpirates', duration: DURATION, music: { style: 'cinematic', key: 'Gm', seed: 41, sections: { drop: 4.489, breakdown: [33.45, 45.6], lift: [37.2, 50.3], outroAt: DURATION - 4.4 }, hits: [0.6, 29.35] }, cues: CUES }
