// og-mlfight score (og: section times mapped to film time with OG_WARP, the score ends with the story): cinematic, F (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 10.0: Act 1 (the perfect night) · hit 43.9: "was that… the good bread?" (the zoom) · hit 59.6: opposite ends
//   breakdown 70.0: THE STARS ADVISE (the soft bed) · lift 90.0: Act 3 · hit 102.95: the reading lands on ALIGN · outro.
import { DURATION, CUES, STORY_END, OG_WARP } from './scenes/index.js'
const F = t => OG_WARP.toFilm(t) ?? OG_WARP.toFilm(Math.ceil(t))
export default { id: 'og-mlfight', duration: DURATION, storyEnd: STORY_END, music: { style: 'cinematic', key: 'F', seed: 404, sections: { drop: F(10.0), breakdown: [F(70.0)], lift: [F(90.0)], outroAt: STORY_END - 2.4}, hits: [] }, cues: CUES }
