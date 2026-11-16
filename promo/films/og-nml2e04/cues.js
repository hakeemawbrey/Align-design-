// og: section times are story times, mapped to film time (ogT)
// nml2e04 score: funk, Bb (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 7.0: the title card · breakdown 70.0: THE STARS ADVISE · lift 90.0: Act 3 (one kind no)
//   hits 24.5: yes! yes! · 61.2: Libra bursts in at 10:50 · 97.0: the flour poof · outro under the end card.
import { DURATION, CUES, STORY_END, ogT } from './scenes/index.js'
export default { id: 'og-nml2e04', duration: DURATION, music: { style: 'funk', key: 'Bb', seed: 74, sections: { drop: ogT(7.0), breakdown: [ogT(70.0)], lift: [ogT(90.0)], outroAt: DURATION - 2.4 }, hits: [ogT(24.5), ogT(61.2), ogT(97.0)] }, cues: CUES, storyEnd: STORY_END }
