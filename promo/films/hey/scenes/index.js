// hey (15s, LOOK B): "Stuck on 'hey'." → talk cards ("Start with a real question.") → "Skip to the good part."
// One scene (hey.js) on one sky; end.js holds the end line + lockup.
import hey, { CUES as HEY_CUES } from './hey.js'
export const DURATION = 15
export const SCENES = [hey]
export const CUES = HEY_CUES
