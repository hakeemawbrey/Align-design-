// og: section times are story times, mapped to film time (ogT)
// nml2e09 score: cinematic, Dm, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 7.0: the title card · breakdown 70.0: THE STARS ADVISE (the soft bed) · lift 90.0: Act 3 (the back step)
//   hits 0.25: the soup pot · 49.0: the table knows · outro under the end card.
import { DURATION, CUES, STORY_END, ogT } from './scenes/index.js'
export default { id: 'og-nml2e09', duration: DURATION, music: { style: 'cinematic', key: 'Dm', seed: 91, sections: { drop: ogT(7.0), breakdown: [ogT(70.0)], lift: [ogT(90.0)], outroAt: DURATION - 2.4 }, hits: [ogT(0.25), ogT(49.0)] }, cues: CUES, storyEnd: STORY_END }
