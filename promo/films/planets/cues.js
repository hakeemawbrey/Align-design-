// planets score — cinematic, C minor, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
// Strings under the hook; taiko toms drop as the Sun lands (2.82; one planet per bar from here); the heroic lift
// arrives with Jupiter (13.93); “Ten planets.” lands the final chord (26.16), sub hit on the burst (27.27).
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'planets', duration: DURATION, music: { style: 'cinematic', key: 'Cm', seed: 13, sections: { drop: 2.82, lift: 13.93, outroAt: 26.16 }, hits: [27.27] }, cues: CUES }
