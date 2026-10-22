// disposable30 (30s): ghosted re-cut to open on the hook "We’ve made people disposable." Half b is ghosted b, unchanged.
import * as A from './a/index.js'
import * as B from './b/index.js'
export const DURATION = 30
export const SCENES = [...A.SCENES, ...B.SCENES]
export const CUES = [...(A.CUES || []), ...(B.CUES || [])]
