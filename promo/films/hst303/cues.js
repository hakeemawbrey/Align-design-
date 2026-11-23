import { DURATION, CUES } from './scenes/index.js'
import { W12R } from '../htxstar/w12real.js'
import { music } from '../htxstar/w12kit.js'
const [style, key, seed] = W12R.hst303.music
export default { id: 'hst303', duration: DURATION, music: music(style, key, seed, DURATION), cues: CUES }
