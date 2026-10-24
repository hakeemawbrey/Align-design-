// htxstars score — dreamy, B major, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
// Airy pad + bell arps under the hazy city; the soft groove blooms with the chart wheel (7.27) and carries the feature
// tour; it opens up for “The stars are still up there” (35.6), lifts on “Look up.” (37.82) and rings out under the end card (40.6).
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'htxstars', duration: DURATION, music: { style: 'dreamy', key: 'B', seed: 17, sections: { drop: 7.27, build: 2, breakdown: 35.6, lift: 37.82, outroAt: 40.6 } }, cues: CUES }
