// sthero score — cinematic, Em, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs). A superhero blockbuster.
//   hit 0.6: the signal hits the cloud · drop 4.489: the Captain lands · breakdown 34.49: "No hero nearby." · lift 36.71: Pisces' own
//   force field · breakdown 46.16: LESSON UNLOCKED · lift 50.85: dealbreakers → "Saving the sky…" · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'sthero', duration: DURATION, music: { style: 'cinematic', key: 'Em', seed: 17, sections: { drop: 4.489, breakdown: [34.49, 46.159], lift: [36.711, 50.85], outroAt: DURATION - 4.4 }, hits: [0.6, 36.711] }, cues: CUES }
