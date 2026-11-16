// og-mldistance score (og: section times mapped to film time with OG_WARP, the score ends with the story): dreamy, Db, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 10.0: Act 1 (the café) · breakdown 62.5: the low point, soft under THE STARS ADVISE · lift 90.0: Act 3
//   ("I miss you. And I'm scared.") · hit 4.4: Cancer realises · outro under the end card.
import { DURATION, CUES, STORY_END, OG_WARP } from './scenes/index.js'
const F = t => OG_WARP.toFilm(t) ?? OG_WARP.toFilm(Math.ceil(t))
export default { id: 'og-mldistance', duration: DURATION, storyEnd: STORY_END, music: { style: 'dreamy', key: 'Db', seed: 77, sections: { drop: F(10.0), breakdown: [F(62.5)], lift: [F(90.0)], outroAt: STORY_END - 2.4}, hits: [] }, cues: CUES }
