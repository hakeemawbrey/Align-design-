// stmeetfriends score — funk, Dm (D dorian), 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.82: ● LIVE ("WE'RE BACK") · hit 21.71: the giant ✓ (hat trick) · breakdown 23.38: the karaoke story (a tape-stop
//   into silence under the slo-mo breath-hold, 26.3–29.15) · lift 31.16: the booth erupts · breakdown 40.6: LESSON UNLOCKED
//   (the chiptune level-up on top, moved into Dm) · lift 45.6: the reading · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'stmeetfriends', duration: DURATION, music: { style: 'funk', key: 'Dm', seed: 20, sections: { drop: 2.822, breakdown: [23.378, 40.6], lift: [31.156, 45.6], outroAt: DURATION - 4.4 }, hits: [21.711] }, cues: CUES }
