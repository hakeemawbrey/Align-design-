// hxpollen score — dreamy, G (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop: OBJECTION!, Taurus (and the sneeze) · lift: the verdict slams · outro under the end card.
import { DURATION, CUES, T } from './scenes/index.js'
export default { id: 'hxpollen', duration: DURATION, music: { style: 'dreamy', key: 'G', seed: 4105, sections: { drop: T.obj, lift: T.verdict, outroAt: DURATION - 4.4 } }, cues: CUES }
