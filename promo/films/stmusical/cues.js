// stmusical score — pop, G, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   intro: keys under the first verse · drop 5.04: the spotlights clunk on and the marquee drops · lift 16.16: the KEY
//   CHANGE (brass pickup into the big chord, after the build's snare roll) · 19.49–23.93 the score cuts dead (chained
//   tape stops = real silence) under "…hi." / "hi!" (crickets) · lift 25.04: they said hi back, everything erupts (the
//   build's drumroll creeps back in under the walk-off) · breakdown 28.38: ★ LESSON UNLOCKED and the card beat · lift
//   37.27: "Curtain. Applause. Hi." · outro under the end card.
import { DURATION, CUES, BEAT } from './scenes/index.js'
export default { id: 'stmusical', duration: DURATION, music: { style: 'pop', key: 'G', seed: 61, sections: { drop: BEAT(8), breakdown: [BEAT(50)], lift: [BEAT(28), BEAT(44), BEAT(66)], outroAt: DURATION - 4.4 } }, cues: CUES }
