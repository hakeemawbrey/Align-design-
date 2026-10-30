// srhtxtraffic score — pop, G major, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
// A bouncy stop-and-go groove under the Katy Freeway crawl; it breaks down for the "hey" and the flat tyres (5.04);
// the drop lands with the dealbreaker stamps (8.93 = beat 15); the lift carries Aries off down the open road (12.82)
// and rings out under the end card (15.6).
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'srhtxtraffic', duration: DURATION, music: { style: 'pop', key: 'G', seed: 17103, sections: { drop: 0.6, breakdown: 5.045, build: 7.267, lift: 8.934, outroAt: DURATION - 4.4 } }, cues: CUES }
