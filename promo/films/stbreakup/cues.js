// stbreakup score — cinematic, Bb, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs). Warm.
//   drop 9.75: the Booth goes live · lift 16.0: the draft gets out of hand · breakdown 25.8: the thumb over SEND, silence
//   · lift 31.45: the hug · breakdown 42.0: ★ LESSON UNLOCKED · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'stbreakup', duration: DURATION, music: { style: 'cinematic', key: 'Bb', seed: 2424, sections: { drop: 9.75, lift: [16.0, 31.45], breakdown: [25.8, 42.0], outroAt: DURATION - 4.4 } }, cues: CUES }
