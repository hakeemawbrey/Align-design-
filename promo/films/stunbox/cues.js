// stunbox score — jazzy, B♭, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   intro: brushes and rootless piano, whisper-quiet under the ASMR open · drop 8.38: the lid pops (*fwoomp*) and the
//   specs swing · breakdown 14.49: CHEMISTRY · sold separately, the score tape-stops into silence (crickets) ·
//   lift 23.38: THE STARS appear in the ring light · breakdown 29.49: ★ LESSON UNLOCKED · lift 33.93: the mystery card and
//   the five-star finale · outro under the end card.
import { DURATION, CUES, BEAT } from './scenes/index.js'
export default { id: 'stunbox', duration: DURATION, music: { style: 'jazzy', key: 'Bb', seed: 88, sections: { drop: BEAT(14), breakdown: [BEAT(25), BEAT(52)], lift: [BEAT(41), BEAT(60)], outroAt: DURATION - 4.4 } }, cues: CUES }
