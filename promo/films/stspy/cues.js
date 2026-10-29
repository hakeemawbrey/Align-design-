// stspy score — synthwave, Cm, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs). A spy thriller.
//   hit 1.711: "Double-O-Star." · drop 4.489: the agent lands · hit 20.602: the fireworks (Virgo faints)
//   breakdown 32.822: the record scratch ("Mission… compromised.") · lift 38.933: "New plan: sit down."
//   breakdown 43.933: LESSON UNLOCKED · lift 49.489: the talk card → "Mission: cozy." · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'stspy', duration: DURATION, music: { style: 'synthwave', key: 'Cm', seed: 7, sections: { drop: 4.489, breakdown: [32.822, 43.933], lift: [38.933, 49.489], outroAt: DURATION - 4.4 }, hits: [1.711, 20.602] }, cues: CUES }
