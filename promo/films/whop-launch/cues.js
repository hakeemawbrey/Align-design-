// whop-launch score (teaser-sound format): 124 bpm, D major. Kick on every beat, offbeat hats, an 8th-note arp,
// a gap + riser before each drop (b11, b27, b42–43) and half-time kicks for the slow-motion hero (b20–b25).
import { DURATION, CUES, b } from './scenes/index.js'
const D = [146.83, 220, 293.66, 369.99, 440], Amaj = [110, 220, 277.18, 329.63, 440], Bm = [123.47, 246.94, 293.66, 369.99, 440], Gmaj = [98, 196, 246.94, 293.66, 392, 440]
export default {
  id: 'whop-launch', duration: DURATION,
  music: {
    padGain: 0.024,
    chords: [
      [0, b(8), D], [b(8), b(12), Amaj],
      [b(12), b(16), D], [b(16), b(20), Amaj],
      [b(20), b(24), Bm], [b(24), b(28), Gmaj],
      [b(28), b(32), D], [b(32), b(36), Amaj],
      [b(36), b(40), Bm], [b(40), b(44), Gmaj],
      [b(44), DURATION, [146.83, 220, 293.66, 369.99, 440, 659.25]],
    ],
    tempo: [
      { from: b(0), to: b(10.9), bpm: 124, pulseGain: 0.24, hatGain: 0.03 },
      { from: b(12), to: b(19.9), bpm: 124, pulseGain: 0.3, hatGain: 0.05, arpGain: 0.022 },
      { from: b(20), to: b(25.9), bpm: 62, pulseGain: 0.26 },
      { from: b(26), to: b(26.9), bpm: 124, pulseGain: 0.26, hatGain: 0.05 },
      { from: b(28), to: b(41.9), bpm: 124, pulseGain: 0.3, hatGain: 0.05, arpGain: 0.022 },
      { from: b(44), to: b(48.9), bpm: 62, pulseGain: 0.16 },
    ],
  },
  cues: CUES,
}
