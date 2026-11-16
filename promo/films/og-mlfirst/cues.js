// og-mlfirst score (og: section times mapped to film time with OG_WARP, the score ends with the story) — house, G, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.0: the cold open · hit 63.9: "I love… yogurt." · breakdown 70.0: THE STARS ADVISE (softer bed)
//   lift 90.0: Act 3 on the bench · hit 96.5: the sparkle fireworks · outro under the end card.
import { DURATION, CUES, STORY_END, OG_WARP } from './scenes/index.js'
const F = t => OG_WARP.toFilm(t) ?? OG_WARP.toFilm(Math.ceil(t))
export default { id: 'og-mlfirst', duration: DURATION, storyEnd: STORY_END, music: { style: 'house', key: 'G', seed: 909, sections: { drop: F(2.0), breakdown: [F(70.0)], lift: [F(90.0)], outroAt: STORY_END - 2.4}, hits: [] }, cues: CUES }
