// htxhumidity score — lofi, E♭ major, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
// Rhodes + vinyl under the frizz hook; the half-time groove drops after the Poof (2.82); it thins to keys and
// the soft lead on the turn (5.04, face → veil), lifts back as the mystery card glows in (7.27), rings out under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'htxhumidity', duration: DURATION, music: { style: 'lofi', key: 'Eb', seed: 23, sections: { drop: 2.82, breakdown: 5.04, lift: 7.27, outroAt: 10.6 } }, cues: CUES }
