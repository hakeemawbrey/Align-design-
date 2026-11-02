// hxdiarymatch score — synthwave, C# (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.9: the diary opens · lift 15.0: the map · hit 16.7: HALFWAY drops · breakdown 33.94: ★ lesson · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'hxdiarymatch', duration: DURATION, music: { style: 'synthwave', key: 'C#', seed: 80305, sections: { drop: 2.9, lift: 15.0, breakdown: 33.94, outroAt: DURATION - 4.4 }, hits: [16.7] }, cues: CUES }
