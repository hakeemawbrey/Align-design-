// sxhoodeado score — funk, D minor, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
// Clav and bass under the hook while the mural paints in; the full groove drops with the sketchbook ask (5.6); a breakdown
// when THE STARS cut in (16.3); the lift lands on the card cut into the last beat (22.04); a hit as the book opens (19.15).
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'sxhoodeado', duration: DURATION, music: { style: 'funk', key: 'Dm', seed: 36022, sections: { drop: 5.6, breakdown: 16.156, lift: 22.044, outroAt: DURATION - 4.4 }, hits: [19.15] }, cues: CUES }
