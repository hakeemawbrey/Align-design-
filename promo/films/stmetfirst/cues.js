// stmetfirst score — jazzy, B♭, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   intro: polite lounge jazz · 4.1–11.7 the score stops dead (tape stop + chained stops = real silence, crickets) ·
//   18.72 record scratch, silence again until the build at 20.05 · drop 22.27: "fire meets fire", the band kicks in ·
//   lift 28.05: card first, face last · breakdown 34.9: ★ lesson unlocked · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'stmetfirst', duration: DURATION, music: { style: 'jazzy', key: 'Bb', seed: 41, sections: { drop: 22.27, lift: 28.05, breakdown: 34.9, outroAt: DURATION - 4.4 }, hits: [24.02] }, cues: CUES }
