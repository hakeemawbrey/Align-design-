// sthold score — chiptune, Gm (the engine plays the chiptune preset in G minor's relative, Bb: Bb · Gm · Eb · F), 108 bpm.
//   intro 0–32.8: a thin bed (chip chord arps + hats) while you're on the line. The film's own hold-music jingle rides on
//   top whenever you're on hold, on the same chord grid, sadder each time it comes back (cues in scenes/index.js):
//   cheerful 10.6 · sad 15.3 · slowed + sad 20.6, which dies on a tape stop at 24.49.
//   build 32.8 → drop 35.04: the finger presses 2 · breakdown 40.04: LESSON UNLOCKED · build 45.04 (build2 = 11 beats):
//   the hold jingle comes back HAPPY over the groove · lift 51.16: the last line · outro under the end card.
import { DURATION, CUES, DROP, T } from './scenes/index.js'
export default { id: 'sthold', duration: DURATION, music: { style: 'chiptune', key: 'Gm', seed: 11, sections: { drop: DROP, breakdown: [T.lesson], lift: [T.lift], build2: 11, outroAt: DURATION - 4.4 } }, cues: CUES }
