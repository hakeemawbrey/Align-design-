// torsubway score — synthwave, Am, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
// Pads + arp under the hook; the groove drops as face #1 loops round again ("AGAIN.", 2.82); it thins to a breakdown as we
// push into the tunnel and the deck deals (3.66); the lift lands on "Card first." (6.4); hits on the mystery card landing
// (6.99) and the train reaching the star (9.6); the tonic rings out under the end card (10.6).
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'torsubway', duration: DURATION, music: { style: 'synthwave', key: 'Am', seed: 91, sections: { drop: 2.82, breakdown: 3.656, lift: 6.4, outroAt: DURATION - 4.4 }, hits: [6.989, 9.556] }, cues: CUES }
