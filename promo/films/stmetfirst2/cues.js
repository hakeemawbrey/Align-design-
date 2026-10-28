// stmetfirst2 score — jazzy, A♭, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   intro: polite lounge jazz · 7.95–9.49 the score stops dead (crickets on the patch) · 19.85 stops again for the long
//   look and "…oh." · drop 22.82: the tear lands, plip, the band kicks in (earth meets water) · hit 23.93: the bloom ·
//   lift 27.82: card first, face last · breakdown 33.94: ★ lesson unlocked · outro under the end card.
import { DURATION, CUES, KEY } from './scenes/index.js'
export default { id: 'stmetfirst2', duration: DURATION, music: { style: 'jazzy', key: KEY, seed: 221, sections: { drop: 22.82, lift: 27.82, breakdown: 33.94, outroAt: DURATION - 4.4 }, hits: [23.93] }, cues: CUES }
