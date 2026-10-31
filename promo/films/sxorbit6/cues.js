// sxorbit6 score — dreamy, C (arranged by the style engine in promo/scripts/teaser-sound.mjs). ORBIT · Ep 6, the season finale.
//   drop 1.711: very far · hit 12.267: "I don't want to lose you." · breakdown 14.044: no shell · lift 22.267: every night
//   breakdown 40.6: LESSON UNLOCKED · lift 45.6: THE END… for now · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'sxorbit6', duration: DURATION, music: { style: 'dreamy', key: 'C', seed: 606, sections: { drop: 1.711, breakdown: [14.044, 40.6], lift: [22.267, 45.6], outroAt: DURATION - 4.4 }, hits: [12.267] }, cues: CUES }
