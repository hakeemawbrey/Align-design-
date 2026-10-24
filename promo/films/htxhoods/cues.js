// htxhoods score — house, A, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
// The four-on-the-floor drops as Aries lands (2.82; one sign every 4.5 beats); it breaks down for the turn
// "Know your sign?" (32.82), builds under the two cards linking, and lifts on "Tag your neighborhood." (37.27);
// the end card lands at 40.6.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'htxhoods', duration: DURATION, music: { style: 'house', key: 'A', seed: 83, sections: { drop: 2.82, breakdown: 32.82, lift: 37.27, outroAt: DURATION - 4.4 } }, cues: CUES }
