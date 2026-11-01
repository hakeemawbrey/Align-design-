// trstartedplaylist score: dreamy, Ab, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 6.6: the card cut into HOW IT'S GOING · hit 13.45: "Track *one*, forever." lands · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'trstartedplaylist', duration: DURATION, music: { style: 'dreamy', key: 'Ab', seed: 605, sections: { drop: 6.6, outroAt: DURATION - 4.4 }, hits: [13.45] }, cues: CUES }
