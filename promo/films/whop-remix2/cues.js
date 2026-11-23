// whop-remix2 score (teaser-sound format) — see scenes/cues-list.js for the arrangement + cue sheet.
// `master` (teaser-sound opt-in): limiter + two-pass loudnorm → −14 LUFS integrated, ≤ −1.5 dBTP on the wav.
import { DURATION, CUES } from './scenes/index.js'
import { MUSIC } from './scenes/cues-list.js'
export default { id: 'whop-remix2', duration: DURATION, music: MUSIC, cues: CUES, master: { lufs: -14, tp: -1.5 } }
