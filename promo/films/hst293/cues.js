import { DURATION, CUES } from './scenes/index.js'
import { W12G } from '../htxstar/w12game.js'
import { music } from '../htxstar/w12kit.js'
const [style, key, seed] = W12G.hst293.music
export default { id: 'hst293', duration: DURATION, music: music(style, key, seed, DURATION), cues: CUES }
