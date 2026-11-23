import { DURATION, CUES } from './scenes/index.js'
import { W12G } from '../htxstar/w12game.js'
import { music } from '../htxstar/w12kit.js'
const [style, key, seed] = W12G.hst287.music
export default { id: 'hst287', duration: DURATION, music: music(style, key, seed, DURATION), cues: CUES }
