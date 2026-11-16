// og: section times are story times, mapped to film time (ogT)
// nml2e01 score: dreamy, E (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 7.0: the title card · breakdown 70.0: THE STARS ADVISE (the soft bed) · lift 90.0: Act 3 (the bench)
//   hits 3.9: heart eyes · 26.9: "…Sagittarius." · 101.9: the snow-star lights · outro under the end card.
import { DURATION, CUES, STORY_END, ogT } from './scenes/index.js'
export default { id: 'og-nml2e01', duration: DURATION, music: { style: 'dreamy', key: 'E', seed: 41, sections: { drop: ogT(7.0), breakdown: [ogT(70.0)], lift: [ogT(90.0)], outroAt: DURATION - 2.4 }, hits: [ogT(3.9), ogT(26.9), ogT(101.9)] }, cues: CUES, storyEnd: STORY_END }
