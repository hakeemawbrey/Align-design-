// og-mlneeds score (og: section times mapped to film time with OG_WARP, the score ends with the story): lofi, Eb, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 10.0: Act 1 (Friday on the bench) · breakdown 63.0: the empty tissue box, soft under THE STARS ADVISE
//   · lift 90.0: Act 3 ("I need a check-in when you go quiet.") · hit 102.6: the pixel moon lands · outro under the end card.
import { DURATION, CUES, STORY_END, OG_WARP } from './scenes/index.js'
const F = t => OG_WARP.toFilm(t) ?? OG_WARP.toFilm(Math.ceil(t))
export default { id: 'og-mlneeds', duration: DURATION, storyEnd: STORY_END, music: { style: 'lofi', key: 'Eb', seed: 88, sections: { drop: F(10.0), breakdown: [F(63.0)], lift: [F(90.0)], outroAt: STORY_END - 2.4}, hits: [] }, cues: CUES }
