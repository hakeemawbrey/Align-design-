import * as A from './a/index.js'
import * as B from './b/index.js'
import * as C from './c/index.js'
export const DURATION = 60
export const SCENES = [...A.SCENES, ...B.SCENES, ...C.SCENES]
export const CUES = [...(A.CUES || []), ...(B.CUES || []), ...(C.CUES || [])]
