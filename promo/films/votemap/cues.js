// votemap score — cinematic, Dm, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
// Pads + arp while the map draws itself on; the band drops as Houston ignites (2.82); it thins to a breakdown for the
// card beats (11.65); the lift lands on "Which city lights up next?" (20.6); hits on the mystery card landing (15.62)
// and the ten stars flaring together (22.27); the tonic rings out under the end card (25.6).
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'votemap', duration: DURATION, music: { style: 'cinematic', key: 'Dm', seed: 79, sections: { drop: 2.822, breakdown: 11.711, lift: 20.6, outroAt: DURATION - 4.4 }, hits: [15.62, 22.267] }, cues: CUES }
