import { DURATION, CUES } from './scenes/index.js'
import { W12R } from '../htxstar/w12real.js'
import { music } from '../htxstar/w12kit.js'
const [style, key, seed] = W12R.hst305.music
export default { id: 'hst305', duration: DURATION, music: music(style, key, seed, DURATION), cues: CUES }
