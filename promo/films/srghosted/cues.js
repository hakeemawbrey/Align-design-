// srghosted score — jazzy, D, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   intro: seen, ghosted, the flicks speeding up · breakdown 11.25: the whistle (tape stop) · drop 13.93: the card cut into
//   tonight's deck · hits on the dealbreaker stamps and the two cards locking · outro under the end card.
import { DURATION, CUES, T } from './scenes/index.js'
export default { id: 'srghosted', duration: DURATION, music: { style: 'jazzy', key: 'D', seed: 903, sections: { drop: T.cut1, outroAt: DURATION - 4.4 }, hits: [T.stamps[0], T.lock] }, cues: CUES }
