// stelders score — dreamy, F major, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   intro: airy pads and bells under the porch, the chairs creaking · drop 4.49: the evidence · breakdown 17.27: the
//   elders rocked (crickets, creaks) · lift 22.27: grandma's love story · breakdown 35.6: the real question, the rocking
//   stops; ★ LESSON UNLOCKED (level-up on top) · lift 49.49: tonight's deck, get off our porch · outro under the end card.
import { DURATION, CUES, T } from './scenes/index.js'
export default { id: 'stelders', duration: DURATION, music: { style: 'dreamy', key: 'F', seed: 410, sections: { drop: 4.489, breakdown: [T.cut1, T.cut3], lift: [22.271, T.cut4], outroAt: DURATION - 4.4 }, hits: [T.swell[0], T.heart] }, cues: CUES }
