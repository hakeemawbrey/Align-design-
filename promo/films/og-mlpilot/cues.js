// og-mlpilot score: lofi, C, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs). Times are film
// time (the title span 7–10 is cut out, see scenes/index.js): drop 7.0 (Gemini bursts in) · breakdown 67.0: THE STARS
// ADVISE · lift 87.0: Act 3 · outro under the last pastry. storyEnd: the film ends on the tag (no NEXT TIME, no end card).
import { DURATION, CUES, STORY_END } from './scenes/index.js'
export default { id: 'og-mlpilot', duration: DURATION, storyEnd: STORY_END, music: { style: 'lofi', key: 'C', seed: 17, sections: { drop: 7.0, breakdown: [67.0], lift: [87.0], outroAt: STORY_END - 2.4 }, hits: [4.75, 52.2] }, cues: CUES }
