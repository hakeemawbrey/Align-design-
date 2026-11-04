// nole10 score: cinematic, Dm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.0: Q4 OUTLOOK · lift at the card flip into THE LINE · outro under the end card.
import { DURATION, CUES, CUT } from './scenes/index.js'

export default { id: 'nole10', duration: DURATION, music: { style: 'cinematic', key: 'Dm', seed: 4210, sections: { drop: 2.0, lift: [CUT], outroAt: DURATION - 4.4 }, hits: [CUT] }, cues: CUES }
