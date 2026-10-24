// htxweather score — jazzy, Bb, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
// The band comes in as the sun pops on "sunny," (0.88); it thins to a breakdown while the weather dial whirls into
// "Mixed signals?" (4.2), and lifts back in as the two charts lock on "Not here." (5.6); the end card lands at 10.6.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'htxweather', duration: DURATION, music: { style: 'jazzy', key: 'Bb', seed: 103, sections: { drop: 0.878, breakdown: 4.2, lift: 5.6, outroAt: DURATION - 4.4 } }, cues: CUES }
