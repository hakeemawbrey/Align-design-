// htxtraffic score — funk, E dorian, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
// Stop-and-go funk from beat 0 under the Katy Freeway crawl; it drops to bass + clav while the “hey” bubble deflates
// (2.82); the full band (claps, brass hits, lead) kicks in for ON ALIGN (5.04) and lands under the end card (10.6).
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'htxtraffic', duration: DURATION, music: { style: 'funk', key: 'Em', seed: 5, sections: { drop: 0.6, breakdown: 2.82, lift: 5.04, build2: 4, outroAt: 10.6 } }, cues: CUES }
