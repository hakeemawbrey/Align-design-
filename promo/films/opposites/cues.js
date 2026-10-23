// opposites score — owned by the film's agent (tune freely). Bright, bouncy, playful: 108 bpm, D–A–Bm–G, plucked arpeggio, light hats.
import { DURATION, CUES } from './scenes/index.js'
const BAR = (60 / 108) * 4, END = DURATION - 1.6
const PROG = [[146.83, 220, 293.66, 369.99, 440], [110, 220, 277.18, 329.63, 440], [123.47, 246.94, 293.66, 369.99], [98, 196, 293.66, 392, 493.88]]
const chords = []
for (let i = 0, t = 0; t < END; i++, t += BAR) chords.push([t, Math.min(t + BAR, END), PROG[i % 4]])
chords.push([END, DURATION, [146.83, 220, 293.66, 369.99, 440, 587.33]])
export default { id: 'opposites', duration: DURATION, music: { chords, bpm: 108, beatFrom: 0.6, beatTo: DURATION - 2.2, padGain: 0.018, pulseGain: 0.15, hatGain: 0.035, arpGain: 0.032, arpFrom: 0.6, arpTo: DURATION - 1.8 }, cues: CUES }
