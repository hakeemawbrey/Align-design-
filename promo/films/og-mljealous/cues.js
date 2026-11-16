// og-mljealous score (og: section times mapped to film time with OG_WARP, the score ends with the story): jazzy, Bb, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 10.044: Act 1 (after the title card) · breakdown 70.044: THE STARS ADVISE (softer bed) · lift 90.044: Act 3
//   hits 93.9: the green moon turns gold · 110.6: Scorpio buys a flower · outro under the end card.
import { DURATION, CUES, STORY_END, OG_WARP } from './scenes/index.js'
const F = t => OG_WARP.toFilm(t) ?? OG_WARP.toFilm(Math.ceil(t))
export default { id: 'og-mljealous', duration: DURATION, storyEnd: STORY_END, music: { style: 'jazzy', key: 'Bb', seed: 61, sections: { drop: F(10.044), breakdown: [F(70.044)], lift: [F(90.044)], outroAt: STORY_END - 2.4}, hits: [] }, cues: CUES }
