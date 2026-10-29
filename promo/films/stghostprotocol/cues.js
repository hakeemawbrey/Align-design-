// stghostprotocol score — screwed, C#m, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 5.4: Exhibit A · breakdown 7.2: the ghost fades (womp, crickets) · lift 13.0: Exhibit B · hit 20.2: the gasp
//   · breakdown 28.4: ★ LESSON UNLOCKED · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'stghostprotocol', duration: DURATION, music: { style: 'screwed', key: 'C#m', seed: 3636, sections: { drop: 5.4, breakdown: [7.2, 28.4], lift: [13.0, 32.6], outroAt: DURATION - 4.4 }, hits: [20.2] }, cues: CUES }
