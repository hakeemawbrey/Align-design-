// st9scorpiocrew score — screwed, Am (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop as the scroll unrolls · lift at the window, Scorpius and Orion · outro under the end card.
import { DURATION, CUES, T } from './scenes/index.js'
export default { id: 'st9scorpiocrew', duration: DURATION, music: { style: 'screwed', key: 'Am', seed: 939, sections: { drop: T.roll, lift: T.win, outroAt: DURATION - 4.4 } }, cues: CUES }
