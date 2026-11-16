// sxmomtalk score — pop, B♭, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 4.489: "The Stars Explain It to Your Mom." · hit 23.3: both answers flip · breakdown 25.6: the stars cry
//   lift 28.65: Pisces cries hardest · breakdown 31.71: LESSON UNLOCKED · lift 35.95: talk cards → "Mom wins again." · outro.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'sxmomtalk', duration: DURATION, music: { style: 'pop', key: 'Bb', seed: 31, sections: { drop: 4.489, breakdown: [25.6, 31.71], lift: [28.65, 35.95], outroAt: DURATION - 4.4 }, hits: [23.3] }, cues: CUES }
