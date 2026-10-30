// sralignment score — lofi, D minor, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs). Warm and swung.
//   drop 12.27: the two charts SLAM together · breakdown 35.6 into the bonus round → lift on "Push. Pull. Align." (42.82)
//   · breakdown 46.71 → lift on ★ LESSON UNLOCKED (47.27) · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'sralignment', duration: DURATION, music: { style: 'lofi', key: 'Dm', seed: 1302, sections: { drop: 12.267, breakdown: [35.6, 46.71], lift: [42.82, 47.27], outroAt: DURATION - 4.4 }, hits: [12.267] }, cues: CUES }
