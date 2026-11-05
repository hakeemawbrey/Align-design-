// kxthe08 score: dreamy, E (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 3.0: can't sleep · lift 10.8: Leo's pep talk · breakdown 21.6: Scorpio's question · lift 44.0: Sag's story
//   breakdown 57.6: the lullaby · lift 84.0: 9 AM · hits 14.4 I AM A CATCH, 52.0 THE FISH WAS FINE · outro 90.25, hard cut at 92.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kxthe08', duration: DURATION, music: { style: 'dreamy', key: 'E', seed: 3808, sections: { drop: 3.0, breakdown: [21.6, 57.6], lift: [10.8, 44.0, 84.0], outroAt: 90.25 }, hits: [14.4, 52.0] }, cues: CUES }
