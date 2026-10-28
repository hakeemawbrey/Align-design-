// stname score — dreamy, Eb, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   intro: the heartbeat over the pad (tape stop at 5.6 on "I don't really do labels.") · build into the drop 15.05: the
//   stars snap into the zodiac ring · breakdown 20.05: "can't we just vibe?" · lift 26.71: ★ LESSON UNLOCKED · build
//   36.71 under Aquarius's sigh · lift 37.83: Aquarius slots in · outro under the end card.
import { DURATION, CUES, T, BEAT } from './scenes/index.js'
export default { id: 'stname', duration: DURATION, music: { style: 'dreamy', key: 'Eb', seed: 505, sections: { drop: T.snap, breakdown: [BEAT(35), BEAT(65)], lift: [T.lesson, BEAT(67)], outroAt: DURATION - 4.4 } }, cues: CUES }
