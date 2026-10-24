// alignment score — house, F♯ major, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
// House: keys + shaker while the two charts appear; the groove drops as they overlay (12.27); breakdown into part B
// (19.49) → lift on ALIGN 120° (23.38); breakdown for the bonus round (40.04) → lift on “Align.” (48.38); confetti hit 53.94.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'alignment', duration: DURATION, music: { style: 'house', key: 'F#', seed: 67, sections: { drop: 12.27, breakdown: [19.49, 40.04], lift: [23.38, 48.38], outroAt: 57.82 }, hits: [53.94] }, cues: CUES }
