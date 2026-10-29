// st8heist score — synthwave, Ebm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 5.9: the crew freeze-frames · lift 13.1: GO (lasers, countdown) · the tape stops on Virgo's tap · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'st8heist', duration: DURATION, music: { style: 'synthwave', key: 'Ebm', seed: 812, sections: { drop: 5.9, lift: 13.1, outroAt: DURATION - 4.4 } }, cues: CUES }
