// htxmuseum score — dreamy, Ab, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
// The groove drops as "Museum District." lands (1.156); it thins to a breakdown on "guessing" (6.156); the lift hits on
// "are first." (11.711); sub hits on the drape unveil, the dealbreaker placard and the gold link. Outro under the end card (25.6).
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'htxmuseum', duration: DURATION, music: { style: 'dreamy', key: 'Ab', seed: 93, sections: { drop: 1.156, breakdown: 6.156, lift: 11.711, outroAt: DURATION - 4.4 }, hits: [12.317, 15.6, 23.656] }, cues: CUES }
