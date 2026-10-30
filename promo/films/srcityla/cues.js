// srcityla score — pop, F, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
// The drop lands on the PALM TREES flash (2.82); it breaks down as the photo blows out to white glare (5.1) and THE STARS
// squint in; it lifts as the veiled card takes the phone's place (7.6); hit on the ring light clicking off (12.38).
import { DURATION, CUES, T } from './scenes/index.js'
export default { id: 'srcityla', duration: DURATION, music: { style: 'pop', key: 'F', seed: 2402, sections: { drop: T.f[1], breakdown: T.glare, lift: T.card[0], outroAt: DURATION - 4.4 }, hits: [T.click] }, cues: CUES }
