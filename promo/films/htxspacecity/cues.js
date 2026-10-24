// htxspacecity score — cinematic, D minor, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
// Strings + rising arp for the skyline; taiko toms drop as the rocket clears (2.82); swells under “Earth-bound?”
// (5.04); the big lift lands on the zodiac wheels locking (11.71); sub hit on liftoff (1.71) and the gold heart (22.82).
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'htxspacecity', duration: DURATION, music: { style: 'cinematic', key: 'Dm', seed: 31, sections: { drop: 2.82, breakdown: 5.04, lift: 11.71, outroAt: 25.6 }, hits: [1.71, 22.82] }, cues: CUES }
