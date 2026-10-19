// Butterflies · half b (15.0–30.0): the answer. The blind reveal brings back anticipation.
// Starts on handoff H (the sky alone, one moon at 1716,122) → mystery card "Not knowing is the best part." → a talk card →
// both align (chakra lock) → the veil lifts to Juniper's face, "Then you both align." → "Bring back the butterflies." +
// lockup, fade to black.
import reveal, { cues as revealCues } from './reveal.js'
import end, { cues as endCues } from './end.js'
export const SCENES = [reveal, end]
export const CUES = [...revealCues, ...endCues]
