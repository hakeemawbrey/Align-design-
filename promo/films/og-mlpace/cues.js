// og-mlpace score (og: section times mapped to film time with OG_WARP, the score ends with the story): pop, D, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 7.0: the title card · breakdown 70.0: THE STARS ADVISE (the soft bed) · lift 90.0: Act 3 (Aries asks)
//   hits 52.6: the arch is complete · 60.2: a balloon pops (the sag) · outro under the end card.
import { DURATION, CUES, STORY_END, OG_WARP } from './scenes/index.js'
const F = t => OG_WARP.toFilm(t) ?? OG_WARP.toFilm(Math.ceil(t))
export default { id: 'og-mlpace', duration: DURATION, storyEnd: STORY_END, music: { style: 'pop', key: 'D', seed: 23, sections: { drop: F(7.0), breakdown: [F(70.0)], lift: [F(90.0)], outroAt: STORY_END - 2.4}, hits: [] }, cues: CUES }
