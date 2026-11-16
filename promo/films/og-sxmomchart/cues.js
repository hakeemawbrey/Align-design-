// sxmomchart score — dreamy, E♭, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 4.489: "The Stars Explain It to Your Mom." · breakdown 25.0: Mom's theory (the hush) · lift 29.75: "Exactly."
//   breakdown 31.157: LESSON UNLOCKED · lift 35.4: Push / Pull / Align → "Now call your mother." · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'sxmomchart', duration: DURATION, music: { style: 'dreamy', key: 'Eb', seed: 17, sections: { drop: 4.489, breakdown: [24.6, 31.157], lift: [29.75, 35.4], outroAt: DURATION - 4.4 }, hits: [29.75] }, cues: CUES }
