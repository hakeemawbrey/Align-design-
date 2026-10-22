// disposable30 (30s): opens on the hook "We’ve made people disposable." → the answer is aligning: the alignment reading + chakra lock (from pattern b).
import * as A from './a/index.js'
import * as B from './b/index.js'
export const DURATION = 30
export const SCENES = [...A.SCENES, ...B.SCENES]
export const CUES = [...(A.CUES || []), ...(B.CUES || [])]
