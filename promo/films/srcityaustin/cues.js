// srcityaustin score — house, Dm, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
// The drop lands as the star band starts strumming (2.82); it breaks down on the record scratch when Gemini admits it's
// "between things" (5.88); it lifts as the DEALBREAKERS card rises (10.95); hits on the three ✕ stamps.
import { DURATION, CUES, T } from './scenes/index.js'
export default { id: 'srcityaustin', duration: DURATION, music: { style: 'house', key: 'Dm', seed: 2501, sections: { drop: T.strum[0], breakdown: T.scratch, lift: T.card[0], outroAt: DURATION - 4.4 }, hits: T.stamps }, cues: CUES }
