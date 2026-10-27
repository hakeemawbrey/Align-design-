// stintervention score — house, F, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 1.71: Capricorn's whistle opens the meeting · tape stop 7.05–8.38 under the silent stare (crickets) ·
//   breakdown 22.82: Leo bursts into tears · lift 35.05: the first dealbreaker stamps on (after a snare roll) ·
//   hit 42.1: the group hug · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'stintervention', duration: DURATION, music: { style: 'house', key: 'F', seed: 44, sections: { drop: 1.711, breakdown: 22.82, lift: 35.047, outroAt: DURATION - 4.4 }, hits: [42.1] }, cues: CUES }
