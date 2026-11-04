// nsge08: REMIX: SNOW GLOBE CITIES, Vancouver, "Vancouver: the snow globe that rains" (28 s vertical, music: pop · Cm)
// Rows: promo/films/next30/b16.md. Look + timeline: ../../nsge01/globekit.js.
//   0–6.4    "I shook it. | It rained."  Rain (not snow) falls in the globe; Taurus under an umbrella; snow only on the mountains.
//   6.4–12.7 "Rain. Rain. | Mountain snow."  Monday rain · Tuesday rain · the mountains, snowing, smugly (twist).
//   13–20    A Gemini jogs the seawall and offers half an umbrella. THE STARS: sharing an umbrella counts as a date.
//   20.2–25.6 the shake (still rain); one umbrella over both; talk card "What's your comfort meal?"; "Share the umbrella."
import { globeFilm } from '../../nsge01/globekit.js'
import { lerp, prog, ease } from '../../../src/lib.js'

export const CFG = {
  city: 'VANCOUVER', hero: 'taurus', partner: 'gemini', precip: 'rain',
  music: { style: 'pop', key: 'Cm', seed: 1608 },
  inside: { top: '#1a2444', bottom: '#4a5a80' }, ground: '#9fb0c8',
  heads: ['I shook it. | It *rained.*', 'Rain. Rain. | *Mountain snow.*', "Someone's on | the *seawall.*", 'Share the *umbrella.*'],
  accents: ['#7fd0ff', '#f4f8ff', '#ffe27a', '#ffd23a'],
  lines: [
    { who: 'hero', text: 'snow on the mountains. rain on me. *rude.*' },
    { who: 'stars', text: 'you could go *where the snow is.*' },
    { who: 'hero', text: 'or I stay in. *with soup.*' },
    { who: 'stars', text: 'sharing an umbrella *counts as a date.*' },
    { who: 'hero', text: 'fine. but *soup after.*' },
  ],
  gags: [
    { bm: 'umbrella', label: 'Monday:|rain' },
    { bm: 'umbrella', label: 'Tuesday:|rain' },
    { bm: 'mountain', label: 'the mountains:|snowing, smugly' },
  ],
  tie: { kind: 'talk', img: 'card-talk-5.png' },
  skyline: [
    { k: 'peaks', list: [[260, 340, 420], [500, 390, 460], [760, 330, 420]], col: '#34466e' },
    { k: 'blocks', x0: 200, x1: 880, seed: 81, min: 90, max: 200, col: '#1f3050' },
    { k: 'tower', x: 450, w: 56, h: 300, col: '#2a4060', tip: 'flat' },
    { k: 'tower', x: 620, w: 64, h: 330, col: '#2a4466', tip: 'flat' },
    { k: 'river', y0: -50, y1: 4, col: '#5a7aa0' },
  ],
  pos: { part: { x: 700, y: 1000, s: 150 } },
  draw(x, t, layer, K) {
    const T = K.T, gy = K.GL.groundY
    if (layer === 'back') { x.fillStyle = '#c8c0b0'; x.fillRect(180, gy - 4, 720, 10) }   // the seawall's edge
    if (layer === 'front') {
      // one umbrella: over the Taurus, then over both
      const m = ease.inOutCubic(prog(t, T.together - 0.2, T.together + 0.3))
      const ux = lerp(420, 541, m), cell = lerp(9, 10, m), b = K.BITS.umbrella
      K.drawBits(x, b.rows, b.cols, ux + 20 * (1 - m), 870 + 62 * m + 3 * Math.sin(t * 2), cell, { alpha: K.popOut(t, T.out) })
    }
  },
}
const F = globeFilm(CFG)
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES
