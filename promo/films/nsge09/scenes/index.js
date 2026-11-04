// nsge09: REMIX: SNOW GLOBE CITIES, Milwaukee, "Milwaukee: the frozen photo shoot" (30 s vertical, music: house · Fm)
// Rows: promo/films/next30/b16.md. Look + timeline: ../../nsge01/globekit.js.
//   0–6.4    "Get my good side. | And the lake."  Leo poses on the frozen lakefront, camera flashes.
//   6.4–12.7 "Pose. Pose. | Frozen."  photo one, iconic · photo two, iconic · photo three, smile froze (twist).
//   13–20    A Virgo with cheese curds asks what Leo actually likes. THE STARS: the real you, not the photo.
//   20.2–25.6 the shake; a blind mystery card covers the photo; "Be more than the photo."
import { globeFilm } from '../../nsge01/globekit.js'
import { clamp } from '../../../src/lib.js'

export const CFG = {
  city: 'MILWAUKEE', hero: 'leo', partner: 'virgo',
  music: { style: 'house', key: 'Fm', seed: 1609 },
  inside: { top: '#1a1a46', bottom: '#4e5a92' },
  heads: ['Get my good side. | And the *lake.*', 'Pose. Pose. | *Frozen.*', 'Someone asks | *about you.*', 'Be more than the *photo.*'],
  accents: ['#bfe6ff', '#bfe6ff', '#c8e6a0', '#ffd23a'],
  lines: [
    { who: 'hero', text: 'frozen lake, golden light, *my best angle.*' },
    { who: 'stars', text: "babe, it's freezing. *your smile is stuck.*" },
    { who: 'hero', text: 'still iconic. *obviously.*' },
    { who: 'stars', text: 'they want the real you, *not the photo.*' },
    { who: 'hero', text: 'honestly? *bad puns and cheese curds.*' },
  ],
  gags: [
    { bm: 'camera', label: 'photo one:|iconic' },
    { bm: 'camera', label: 'photo two:|iconic' },
    { bm: 'statue', label: 'photo three:|smile froze' },
  ],
  tie: { kind: 'mystery', label: 'card first.' },
  mood(t, who) { if (who === 'hero' && t < 6.3) return Math.floor(t / 1.3) % 2 ? 'wink' : 'happy' },
  skyline: [
    { k: 'blocks', x0: 190, x1: 900, seed: 91, min: 80, max: 190, col: '#20285a' },
    { k: 'tower', x: 520, w: 64, h: 300, col: '#2a3266', tip: 'flat' },
    { k: 'tower', x: 400, w: 52, h: 240, col: '#283062', tip: 'spire' },
    { k: 'river', y0: -70, y1: 6, col: '#c4dcf2' },
  ],
  pos: { part: { x: 700, y: 1000, s: 150 } },
  draw(x, t, layer, K) {
    const T = K.T
    if (layer === 'over') {
      // camera flashes in the hook and on each photo gag
      for (const f of [1.3, 2.6, 3.9, ...T.gags]) { const d = t - f; if (d >= 0 && d < 0.25) { x.fillStyle = `rgba(255,255,255,${(0.45 * clamp(1 - d / 0.25)).toFixed(3)})`; x.fillRect(0, 0, 1080, 1920) } }
    }
    if (layer === 'back' && t > T.partnerIn + 0.4 && t < T.together) { const b = K.BITS.curds; K.drawBits(x, b.rows, b.cols, 780, 1012, 7) }
  },
}
const F = globeFilm(CFG)
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES
