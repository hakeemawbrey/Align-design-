// srtorsorry score — lofi, G, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
// The groove drops as the polite pile starts climbing (1.156); it breaks down when the pile pops and THE STARS reads
// minds (6.6); it lifts on the first dealbreaker stamp (12.9); hits on the pile pop, the twisted third stamp and the
// final "I like you too." The outro is the end card (25.6).
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'srtorsorry', duration: DURATION, music: { style: 'lofi', key: 'G', seed: 130, sections: { drop: 1.156, breakdown: 6.6, lift: 12.9, outroAt: DURATION - 4.4 }, hits: [6.156, 14.3, 23.55] }, cues: CUES }
