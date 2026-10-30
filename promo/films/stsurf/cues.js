// stsurf score — lofi, F, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs), with a tremolo
// surf-guitar twang (pitched plucks) on top.
//   intro: the surf lick · drop 4.49: "Wave one: jealousy." · hits 7.27 / 17.82: the two big crashes · breakdown 20.05:
//   washed up on the sand (a tape stop just before) · lift 26.71: "Don't fight it. Ride it." · breakdown 30.6: ★ LESSON
//   UNLOCKED and the talk cards · lift 38.38: "Hang ten." · outro under the end card.
import { DURATION, CUES, BEAT } from './scenes/index.js'
export default { id: 'stsurf', duration: DURATION, music: { style: 'lofi', key: 'F', seed: 77, sections: { drop: BEAT(7), breakdown: [BEAT(35), BEAT(54)], lift: [BEAT(47), BEAT(68)], outroAt: DURATION - 4.4 }, hits: [BEAT(12), BEAT(31)] }, cues: CUES }
