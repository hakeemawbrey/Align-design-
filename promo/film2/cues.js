// Film 2 score + sound cues (teaser-sound format). Scene agents ADD their cues to CUES via their own arrays below.
// kinds: tick (t, gain) · whoosh (t, len, gain) · bell (t, hz, gain, decay, pan) · boom (t, gain) · glitter (t0, t1) · riser (t0, t1, gain)
import { DURATION } from './scenes/index.js'
import { cues as c1 } from './scenes/f1-old.js'
import { cues as c2 } from './scenes/f2-flip.js'
import { cues as c3 } from './scenes/f3-chart.js'
import { cues as c4 } from './scenes/f4-chance.js'
import { cues as c5 } from './scenes/f5-stars.js'
import { cues as c6 } from './scenes/f6-reveal.js'
import { cues as c7 } from './scenes/f7-talk.js'
import { cues as c8 } from './scenes/f8-end.js'
export default {
  id: 'film2', duration: DURATION,
  music: {
    // cold, sparse minor pulse for the old way → warm Align D-major world after the flip
    chords: [
      [0, 4.1, [110, 164.81, 220, 261.63]],           // Am (cold)
      [4.1, 10.5, [146.83, 220, 329.63, 369.99, 554.37]], // Dmaj9 — the flip, colour floods in
      [10.5, 15, [123.47, 185, 293.66, 329.63, 440]],    // Bm9
      [15, 20, [98, 196, 293.66, 369.99, 493.88]],       // Gmaj7
      [20, 24, [110, 220, 277.18, 329.63, 493.88]],      // A add9
      [24, 30, [146.83, 220, 293.66, 369.99, 440, 659.25]], // D resolve
    ],
    bpm: 96, beatFrom: 4.4, beatTo: 27,
  },
  cues: [...(c1 || []), ...(c2 || []), ...(c3 || []), ...(c4 || []), ...(c5 || []), ...(c6 || []), ...(c7 || []), ...(c8 || [])],
}
