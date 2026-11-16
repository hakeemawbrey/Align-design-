// og-mlfriends score (og: section times mapped to film time with OG_WARP, the score ends with the story): funk, E (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 10.0: Act 1 (the rules) · hits 44.6 / 52.95 / 55.05: the three RULE BROKEN stamps · hit 65.8: "NO."
//   breakdown 70.0: THE STARS ADVISE (the soft bed) · lift 90.0: Act 3 · outro under the end card.
import { DURATION, CUES, STORY_END, OG_WARP } from './scenes/index.js'
const F = t => OG_WARP.toFilm(t) ?? OG_WARP.toFilm(Math.ceil(t))
export default { id: 'og-mlfriends', duration: DURATION, storyEnd: STORY_END, music: { style: 'funk', key: 'E', seed: 303, sections: { drop: F(10.0), breakdown: [F(70.0)], lift: [F(90.0)], outroAt: STORY_END - 2.4}, hits: [] }, cues: CUES }
