// stwestern score — lofi, Am (the preset is major, so it plays in the relative C major; the whistle and the pitched SFX
// are written in A minor), 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   intro: keys under the whistle and the noon bongs · drop 5.04: "High noon." · breakdown 23.38: 9 PM, the score
//   tape-stops into real silence for the draw (crickets) · lift 25.6: BZZT BZZT, the town erupts · breakdown 28.93:
//   ★ LESSON UNLOCKED and the talk cards · lift 38.38: "This town's big enough for two." · outro under the end card.
import { DURATION, CUES, BEAT } from './scenes/index.js'
export default { id: 'stwestern', duration: DURATION, music: { style: 'lofi', key: 'Am', seed: 41, sections: { drop: BEAT(8), breakdown: [BEAT(41), BEAT(51)], lift: [BEAT(45), BEAT(68)], outroAt: DURATION - 4.4 }, hits: [BEAT(45)] }, cues: CUES }
