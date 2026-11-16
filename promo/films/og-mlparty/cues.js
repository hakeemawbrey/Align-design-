// og-mlparty score (og: section times mapped to film time with OG_WARP, the score ends with the story) — pop, A, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.0: the lane lights up · breakdown 70.0: THE STARS ADVISE (softer bed) · lift 90.0: Act 3 under the middle lamp
//   hits 92.6: "would you—" ×2 · 101.2: the founding card + the lane cheers · outro under the end card.
import { DURATION, CUES, STORY_END, OG_WARP } from './scenes/index.js'
const F = t => OG_WARP.toFilm(t) ?? OG_WARP.toFilm(Math.ceil(t))
export default { id: 'og-mlparty', duration: DURATION, storyEnd: STORY_END, music: { style: 'pop', key: 'A', seed: 1010, sections: { drop: F(2.0), breakdown: [F(70.0)], lift: [F(90.0)], outroAt: STORY_END - 2.4}, hits: [] }, cues: CUES }
