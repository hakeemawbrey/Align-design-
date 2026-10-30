// srcitymiami score — jazzy, Bb, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
// The drop lands as the Sagittarius star rolls to a stop in front of Taurus (2.82); it breaks down under THE STARS'
// "that's a gate" (5.9); it lifts with the sunrise (11.0); hit on the ✕ JUST VISITING stamp.
import { DURATION, CUES, T } from './scenes/index.js'
export default { id: 'srcitymiami', duration: DURATION, music: { style: 'jazzy', key: 'Bb', seed: 2502, sections: { drop: T.stop, breakdown: T.l1, lift: T.sun[0], outroAt: DURATION - 4.4 }, hits: [T.stamp] }, cues: CUES }
