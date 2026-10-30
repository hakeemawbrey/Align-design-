// srvotemap score — chiptune, Fm, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
// The map draws itself on over the intro; the band drops as Houston ignites and the Houston star pops up (2.82); it thins
// to a breakdown while the other cities sleep and nobody answers (8.93); lifts as the votes start waking them (11.15);
// hits on the ten stars flaring together (18.66) and "sky." (20.04); the tonic rings out under the end card (25.6).
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'srvotemap', duration: DURATION, music: { style: 'chiptune', key: 'Fm', seed: 283, sections: { drop: 2.822, breakdown: 8.933, lift: 11.156, outroAt: DURATION - 4.4 }, hits: [18.66, 20.044] }, cues: CUES }
