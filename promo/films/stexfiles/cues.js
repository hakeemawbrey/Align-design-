// stexfiles score — screwed, Eb minor (noir), 108 bpm grid played half-time (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   intro: 1:12 AM, the desk lamp · drop 5.04: the pan to the corkboard, red string on the beat · ENHANCE ×3 with a
//   tape stop (17.95–18.55) before the pigeon · breakdown 20.6: CASE: YOU · lift 27.27: the blinds go up, morning ·
//   breakdown 31.16: LESSON UNLOCKED · lift 35.6: the drawer slam, tonight's deck · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'stexfiles', duration: DURATION, music: { style: 'screwed', key: 'Ebm', seed: 24, sections: { drop: 5.044, breakdown: [20.6, 31.156], lift: [27.267, 35.6], outroAt: DURATION - 4.4 } }, cues: CUES }
