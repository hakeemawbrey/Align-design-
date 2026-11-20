// whop-deal score (teaser-sound format): 128 bpm, I–V–vi–IV in D, kick on every beat, claps on 2 & 4,
// 16th ticks, an 8th-note arp; drops out for the slow-motion flip (beats 29.5–32) and slams back on the holo flash.
import { DURATION, CUES, bt } from './scenes/index.js'
const D = [146.83, 293.66, 369.99, 440, 587.33], Amaj = [110, 277.18, 329.63, 440, 554.37], Bm = [123.47, 293.66, 369.99, 493.88], Gmaj = [98, 293.66, 392, 493.88, 587.33]
const PROG = [D, Amaj, Bm, Gmaj]
const chords = Array.from({ length: 11 }, (_, i) => [bt(4 * i), bt(4 * i + 4), PROG[i % 4]])
chords.push([bt(44), DURATION, [146.83, 220, 293.66, 369.99, 440, 659.25]])
chords[0][0] = 0
export default {
  id: 'whop-deal', duration: DURATION,
  music: {
    chords, padGain: 0.02,
    tempo: [
      { from: bt(0), to: bt(8), bpm: 128, pulseGain: 0.26 },
      { from: bt(8), to: bt(29.5), bpm: 128, pulseGain: 0.32, hatGain: 0.06, arpGain: 0.022 },
      { from: bt(29.5), to: bt(32), bpm: 128, pulseGain: 0, arpGain: 0.01 },
      { from: bt(32), to: bt(43.5), bpm: 128, pulseGain: 0.32, hatGain: 0.06, arpGain: 0.022 },
      { from: bt(44), to: bt(50), bpm: 128, pulseGain: 0.2, hatGain: 0.035, arpGain: 0.016 },
    ],
  },
  cues: CUES,
}
