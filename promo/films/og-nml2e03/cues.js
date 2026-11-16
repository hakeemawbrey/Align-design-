// og: section times are story times, mapped to film time (ogT)
// nml2e03 score: lofi, Ab (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 7.0: the title card · breakdown 70.0: THE STARS ADVISE · lift 90.0: Act 3 (the knock)
//   hits 53.4: into the snowbank · 96.6: the knitted scarf · outro under the end card.
import { DURATION, CUES, STORY_END, ogT } from './scenes/index.js'
export default { id: 'og-nml2e03', duration: DURATION, music: { style: 'lofi', key: 'Ab', seed: 63, sections: { drop: ogT(7.0), breakdown: [ogT(70.0)], lift: [ogT(90.0)], outroAt: DURATION - 2.4 }, hits: [ogT(53.4), ogT(96.6)] }, cues: CUES, storyEnd: STORY_END }
