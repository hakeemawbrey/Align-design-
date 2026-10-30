// srplanets score — screwed, A (read by the minor preset as its relative F#m), 108 bpm grid (arranged by the style engine in
// promo/scripts/teaser-sound.mjs). Half-time 808 under the tour: the drop lands with the Sun (2.82), the lift with the
// outer run (Uranus 18.38, the guide falls behind), the burst round "One you." (23.93), outro under the end card.
import { DURATION, CUES, T } from './scenes/index.js'
export default { id: 'srplanets', duration: DURATION, music: { style: 'screwed', key: 'A', seed: 316, sections: { drop: T.drop, lift: T.run, outroAt: DURATION - 4.4 }, hits: [T.burst] }, cues: CUES }
