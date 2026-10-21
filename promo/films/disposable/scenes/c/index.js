// Disposable · part c (39.8–60.0): FACE LAST → BOTH CHOOSE → the match phone → "Be chosen." + lockup → black.
// Starts on H2 (the sky alone, the one moon) and ends on black.
import story, { cues as storyCues } from './story.js'
import end, { cues as endCues } from './end.js'
export const SCENES = [story, end]
export const CUES = [...storyCues, ...endCues]
