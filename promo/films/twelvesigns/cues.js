// twelvesigns score — house, E major, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
// House: four-on-the-floor drops with Aries (3.38; two bars per sign); breakdown on Libra (30.04), lift on Scorpio
// (34.49) through Pisces; the final chord lands on “Tag your sign.” (56.72).
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'twelvesigns', duration: DURATION, music: { style: 'house', key: 'E', seed: 53, sections: { drop: 3.38, breakdown: 30.04, lift: 34.49, outroAt: 56.72 }, hits: [0.6] }, cues: CUES }
