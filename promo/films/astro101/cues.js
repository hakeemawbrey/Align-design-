// astro101 (60s, vertical) score — lead-owned. Calm, curious, warm throughout (explainer), 80 bpm.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'astro101', duration: DURATION, music: { chords: [
  [0,8,[146.83,220,293.66,369.99,440]], [8,16,[123.47,185,293.66,329.63,440]],
  [16,24,[98,196,293.66,369.99,493.88]], [24,32,[110,220,277.18,329.63,493.88]],
  [32,40,[146.83,220,329.63,369.99,554.37]], [40,48,[123.47,185,293.66,329.63,440]],
  [48,54,[98,196,293.66,369.99,493.88]], [54,60,[146.83,220,293.66,369.99,440,659.25]] ],
  bpm: 80, beatFrom: 3, beatTo: 55, padGain: 0.022, pulseGain: 0.16 }, cues: CUES }
