// srsaturnreturn score — synthwave, Fm, 108 bpm grid (arranged by the style engine in promo/scripts/teaser-sound.mjs).
// Night-drive pads under the hook; the drop as the orbit opens (4.49); a breakdown for the eye reveal (19.95: Saturn
// opens its eyes); the lift for the ages 27–30 inspection (22.82); breakdown under the LESSON (33.38); the DING hit at 17.82.
import { DURATION, CUES, T } from './scenes/index.js'
export default { id: 'srsaturnreturn', duration: DURATION, music: { style: 'synthwave', key: 'Fm', seed: 529, sections: { drop: T.drop, breakdown: [T.eyes, T.lesson], lift: [T.lift, T.card], outroAt: DURATION - 4.4 }, hits: [T.ding] }, cues: CUES }
