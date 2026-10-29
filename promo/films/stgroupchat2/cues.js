// stgroupchat2 score — pop, D, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 4.49: twelve stars start typing · breakdown 15.42: Virgo's whistle, the chat freezes · lift 25.35: the hearts
//   · breakdown 27.0: ★ LESSON UNLOCKED (the level-up sits on top) · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'stgroupchat2', duration: DURATION, music: { style: 'pop', key: 'D', seed: 1212, sections: { drop: 4.489, breakdown: [15.42, 27.0], lift: [25.35, 34.6], outroAt: DURATION - 4.4 } }, cues: CUES }
