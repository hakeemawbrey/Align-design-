// eightbillion · half b (15.0–30.0): the answer. The field (card backs out of the stars, 333 charts nearby) →
// "Someone's sky lines up with yours." (field → today's sky) → "Tonight's deck is already dealt." →
// "You are not arriving alone." + lockup. Starts on handoff H (the sky, the one moon, nothing else) and ends on black.
import answer, { cues as answerCues } from './answer.js'
import end, { cues as endCues } from './end.js'
export const SCENES = [answer, end]
export const CUES = [...answerCues, ...endCues]
