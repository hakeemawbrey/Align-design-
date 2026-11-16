// st4venusretro score — dreamy, Db, 108 bpm grid (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.82: Venus starts talking over the old flames · breakdown 6.55: "that's nostalgia" · lift 10.55: "Let old flames stay old." · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'st4venusretro', duration: DURATION, music: { style: 'dreamy', key: 'Db', seed: 861, sections: { drop: 2.82, breakdown: 6.55, lift: 10.55, outroAt: DURATION - 4.4 } }, cues: CUES }
