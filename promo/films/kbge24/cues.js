// kbge24 score: house, F (arranged by the style engine in promo/scripts/teaser-sound.mjs). No end card.
//   drop 3.2: Aries' bio · breakdowns at Cancer, Scorpio · lift at Pisces' glow-up · hit on the last line · loops.
import { DURATION, CUES, MARK } from './scenes/index.js'
export default { id: 'kbge24', duration: DURATION, music: { style: 'house', key: 'F', seed: 3424, sections: { drop: MARK.drop, breakdown: MARK.breaks, lift: [MARK.lift], outroAt: DURATION - 0.6 }, hits: [MARK.last + 0.3] }, cues: CUES }
