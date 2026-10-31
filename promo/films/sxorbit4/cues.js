// sxorbit4 score — jazzy, B♭ (arranged by the style engine in promo/scripts/teaser-sound.mjs). ORBIT · Ep 4, a soap.
//   hit 2.822: DUNNN on Ember · drop 5.044: Ember spirals · breakdown 12.267: the violins (heartbreak swell → record scratch 17.822)
//   lift 19.489: fainted from joy · breakdown 23.933: LESSON UNLOCKED · lift 28.933: meet the friends · hit 34.7: FREEZE · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'sxorbit4', duration: DURATION, music: { style: 'jazzy', key: 'Bb', seed: 404, sections: { drop: 5.044, breakdown: [12.267, 23.933], lift: [19.489, 28.933], outroAt: DURATION - 4.4 }, hits: [2.822, 34.7] }, cues: CUES }
