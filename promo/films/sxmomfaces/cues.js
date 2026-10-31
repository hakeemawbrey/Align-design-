// sxmomfaces score — cinematic, A♭, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 4.489: "The Stars Explain It to Your Mom." · hits 24.4–24.9: the soap snap-zooms ("LAST?!") · breakdown 25.5: Mom's story
//   lift 31.85: "…oh. I invented this." · breakdown 34.49: LESSON UNLOCKED · lift 38.6: "Card first. Face last." · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'sxmomfaces', duration: DURATION, music: { style: 'cinematic', key: 'Ab', seed: 23, sections: { drop: 4.489, breakdown: [25.5, 34.49], lift: [31.47, 38.6], outroAt: DURATION - 4.4 }, hits: [24.9] }, cues: CUES }
