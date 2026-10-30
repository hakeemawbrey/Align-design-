// srhtxstars score — jazzy, E♭ major, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
// Brushes + Rhodes under the hazy city and the one sad star; the band kicks in as the star blows the haze away (12.82);
// a breakdown under the feature tour's end and the ★ LESSON (33.94); the lift lands on "Look up." (38.38); hits on the
// whoosh (12.82) and the chart blooming (17.82); the tonic rings out under the end card (40.6).
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'srhtxstars', duration: DURATION, music: { style: 'jazzy', key: 'Eb', seed: 18103, sections: { drop: 12.823, breakdown: 33.936, lift: 38.381, outroAt: DURATION - 4.4 }, hits: [12.823, 17.824] }, cues: CUES }
