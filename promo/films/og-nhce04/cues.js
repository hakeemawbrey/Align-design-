// og-nhce04 score: social cut of nhce04 (no end card).
// nhce04 score: dreamy, Eb (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.4: the hot take's jump cut · breakdown 5.3: the cold take (icy jump cut) · lift 8.2: the warm take · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'og-nhce04', duration: DURATION, music: { style: 'dreamy', key: 'Eb', seed: 4404, sections: { drop: 2.4, breakdown: [5.3], lift: [8.2], outroAt: 11.6 - 0.6 }, hits: [8.2] }, cues: CUES }
