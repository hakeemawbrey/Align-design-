// srcitynashville score — synthwave, Gm, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
// The drop lands as Pisces' heart note cracks on "heartbreak" (2.82); it breaks down as the bar row drops away for
// "Write a different song" (5.88); it lifts as the gold Align line draws across the staff (7.82); hit on the heart
// rejoining (11.16).
import { DURATION, CUES, T } from './scenes/index.js'
export default { id: 'srcitynashville', duration: DURATION, music: { style: 'synthwave', key: 'Gm', seed: 2611, sections: { drop: T.drop, breakdown: T.wipe, lift: T.lines[2], outroAt: DURATION - 4.4 }, hits: [T.join] }, cues: CUES }
