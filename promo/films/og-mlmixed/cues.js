// og-mlmixed score (og: section times mapped to film time with OG_WARP, the score ends with the story): synthwave, Am, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 10.044: Act 1 (after the title card) · breakdown 70.044: THE STARS ADVISE (softer bed) · lift 90.044: Act 3
//   hits 94.1: the HONK · 101.3: "for you" · outro under the end card.
import { DURATION, CUES, STORY_END, OG_WARP } from './scenes/index.js'
const F = t => OG_WARP.toFilm(t) ?? OG_WARP.toFilm(Math.ceil(t))
export default { id: 'og-mlmixed', duration: DURATION, storyEnd: STORY_END, music: { style: 'synthwave', key: 'Am', seed: 51, sections: { drop: F(10.044), breakdown: [F(70.044)], lift: [F(90.044)], outroAt: STORY_END - 2.4}, hits: [] }, cues: CUES }
