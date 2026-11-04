// nsge07: REMIX: SNOW GLOBE CITIES, Anchorage, "Anchorage: the long-night stare" (30 s vertical, music: cinematic · Dm)
// Rows: promo/films/next30/b16.md. Look + timeline: ../../nsge01/globekit.js.
//   0–6.4    "Long nights. | Longer stares."  Scorpio squints into the dark under the mountains as a moose wanders by.
//   6.4–12.7 "Dark before | dinner."  the night, long · the moose, unbothered · my stare, longer (twist).
//   13–20    Northern lights ripple across the globe and a Cancer appears under them. THE STARS: just be there.
//   20.2–25.6 the shake; a blind mystery card; "Let them see you."
import { globeFilm } from '../../nsge01/globekit.js'
import { clamp, prog } from '../../../src/lib.js'

export const CFG = {
  city: 'ANCHORAGE', hero: 'scorpio', partner: 'cancer',
  music: { style: 'cinematic', key: 'Dm', seed: 1607 },
  inside: { top: '#0c1030', bottom: '#2c3a6e' },
  heads: ['Long nights. | *Longer* stares.', 'Dark *before* | dinner.', 'Then the sky | *lights up.*', 'Let them *see* you.'],
  accents: ['#ff8fa0', '#bfe6ff', '#7ff0b0', '#ffd23a'], lateWords: 2,
  lines: [
    { who: 'hero', text: 'long nights mean *longer deep talks.*' },
    { who: 'stars', text: "you've been staring at *that moose* for an hour." },
    { who: 'hero', text: "it's called being *intense.*" },
    { who: 'stars', text: 'no need to be a mystery. *just be there.*' },
    { who: 'hero', text: "…hi. I'm actually *kind of shy.*" },
  ],
  gags: [
    { bm: 'moon', label: 'the night:|long' },
    { bm: 'moose', label: 'the moose:|unbothered' },
    { bm: 'eyes', label: 'my stare:|longer' },
  ],
  tie: { kind: 'mystery', label: 'card first.' },
  mood(t, who) { if (who === 'hero' && t < 13 && !(t > 9.55 && t < 10.9)) return 'squint' },
  skyline: [
    { k: 'peaks', list: [[250, 300, 360], [450, 360, 420], [680, 320, 380], [880, 280, 330]], col: '#28345e' },
    { k: 'blocks', x0: 220, x1: 880, seed: 61, min: 50, max: 140, col: '#18204a' },
    { k: 'tower', x: 560, w: 60, h: 210, col: '#222a5a', tip: 'flat' },
    { k: 'trees', x0: 190, x1: 900, seed: 7, h: 56 },
  ],
  draw(x, t, layer, K) {
    const gy = K.GL.groundY, T = K.T
    if (layer === 'sky') {
      // northern lights from the turn on
      const a = clamp(prog(t, T.partnerIn - 0.4, T.partnerIn + 1.2))
      if (a > 0) for (let b = 0; b < 3; b++) for (let i = 180; i < 900; i += 8) {
        const y = 600 + b * 46 + 40 * Math.sin(i * 0.012 + t * 0.9 + b * 1.7)
        const h = 60 + 30 * Math.sin(i * 0.03 + t * 1.3 + b)
        x.fillStyle = b === 1 ? `rgba(160,120,255,${(0.28 * a).toFixed(3)})` : `rgba(110,240,170,${(0.34 * a).toFixed(3)})`
        x.fillRect(i, y, 8, h)
      }
    }
    if (layer === 'back') {
      // the moose ambles across in the hook, then stands there unbothered
      const mx = Math.max(700, 900 - (t - 0.0) * 40), b = K.BITS.moose
      K.drawBits(x, b.rows, b.cols, mx, gy - 34 + 2 * Math.sin(t * 3), 8)
      x.fillStyle = '#7a4e2e'; x.fillRect(mx - 30, gy - 2, 8, 30); x.fillRect(mx + 22, gy - 2, 8, 30)
    }
  },
}
const F = globeFilm(CFG)
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES
