// stfishpic score — funk, Bb (a major key on the dorian funk preset is read as its relative: the groove sits in G dorian),
// 108 bpm, arranged by the style engine in promo/scripts/teaser-sound.mjs. The film sets the sections:
//   drop 2.822: the zoom to the first judge · breakdown 22.267: "fish rights though?" (tape stop, crickets, the slow turn)
//   lift 26.711: the swipe · breakdown 33.933: the sunset fish (record scratch) + real talk · lift 41.156: the mystery card
//   lands · hit 43.933: every paddle flips to 10 · breakdown 46.156: LESSON UNLOCKED · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'stfishpic', duration: DURATION, music: { style: 'funk', key: 'Bb', seed: 9, sections: { drop: 2.822, breakdown: [22.267, 33.933, 46.156], lift: [26.711, 41.156], outroAt: DURATION - 4.4 }, hits: [43.933] }, cues: CUES }
