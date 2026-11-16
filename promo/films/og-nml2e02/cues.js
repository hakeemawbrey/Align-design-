// og: section times are story times, mapped to film time (ogT)
// nml2e02 score: jazzy, F (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 7.0: the title card · breakdown 70.0: THE STARS ADVISE · lift 90.0: Act 3 ("can you hold this end?")
//   hits 28.7: GOT IT · 40.7: the lights tangle · 96.6: the lights go up · outro under the end card.
import { DURATION, CUES, STORY_END, ogT } from './scenes/index.js'
export default { id: 'og-nml2e02', duration: DURATION, music: { style: 'jazzy', key: 'F', seed: 52, sections: { drop: ogT(7.0), breakdown: [ogT(70.0)], lift: [ogT(90.0)], outroAt: DURATION - 2.4 }, hits: [ogT(28.7), ogT(40.7), ogT(96.6)] }, cues: CUES, storyEnd: STORY_END }
