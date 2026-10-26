// torsorry score — funk, Bb, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
// The groove drops as "want." lands and the polite pile starts climbing (2.82); it thins to a breakdown for
// "Everyone's thinking it… nobody's saying it." (6.6); the chorus lift hits on "dealbreakers come first" (11.71);
// sub hits on the pile burst, the last chip and the wheels locking. The outro is the end card (25.6).
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'torsorry', duration: DURATION, music: { style: 'funk', key: 'Bb', seed: 81, sections: { drop: 2.822, breakdown: 6.6, lift: 11.711, outroAt: DURATION - 4.4 }, hits: [6.156, 14.489, 19.211] }, cues: CUES }
