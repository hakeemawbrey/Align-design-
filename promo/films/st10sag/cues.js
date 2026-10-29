// st10sag score — house, Fm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 12.2: the expedition starts (the desert) · breakdown 25.6: behind the slide, lost · lift 42: expedition two,
//   with Gemini · outro under the end card.
import { DURATION, CUES, T } from './scenes/index.js'
export default { id: 'st10sag', duration: DURATION, music: { style: 'house', key: 'Fm', seed: 1009, sections: { drop: T.desert, breakdown: T.behind, lift: T.win, outroAt: DURATION - 4.4 } }, cues: CUES }
