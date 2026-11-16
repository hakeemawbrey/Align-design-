// og: section times are story times, mapped to film time (ogT)
// nml2e07 score: funk, G, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 7.0: the title card · breakdown 70.0: THE STARS ADVISE (the soft bed) · lift 90.0: Act 3 (dessert, take two)
//   hits 11.0: the hug · 55.6: "we are NOT together" · outro under the end card.
import { DURATION, CUES, STORY_END, ogT } from './scenes/index.js'
export default { id: 'og-nml2e07', duration: DURATION, music: { style: 'funk', key: 'G', seed: 71, sections: { drop: ogT(7.0), breakdown: [ogT(70.0)], lift: [ogT(90.0)], outroAt: DURATION - 2.4 }, hits: [ogT(11.0), ogT(55.6)] }, cues: CUES, storyEnd: STORY_END }
