// srhtxloops score — house, E major, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
// Pads + a filtered kick while the three ring roads draw in; the four-on-the-floor drops as Leo and Sag start orbiting
// (5.6); a breakdown under the passport gag (16.16); the lift lands as the wheel turns back into the map (22.04); hits on
// the gold reading line (12.82) and the meeting heart (23.95); the tonic rings out under the end card (25.6).
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'srhtxloops', duration: DURATION, music: { style: 'house', key: 'E', seed: 18102, sections: { drop: 5.6, breakdown: 16.156, lift: 22.044, outroAt: DURATION - 4.4 }, hits: [12.823, 23.95] }, cues: CUES }
