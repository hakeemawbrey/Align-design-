// nsge14: REMIX: SNOW GLOBE CITIES, Salt Lake City, "Salt Lake City: across the widest street" (28 s vertical, music: funk · A)
// Rows: promo/films/next30/b16.md. Look + timeline: ../../nsge01/globekit.js.
//   0–6.4    "“HI!!” | “WHAT?”"  Gemini and Sagittarius wave and shout across a very wide street; the mountains behind.
//   6.4–12.7 "Wave. Wave. | Semaphore."  wave one, polite · wave two, urgent · wave three, flag signals (twist).
//            THE STARS: "you two are literally opposite signs." (Gemini and Sagittarius sit opposite on the zodiac.)
//   13–20    The crosswalk light turns. THE STARS: opposites can meet in the middle. SAG: "middle of the crosswalk. go!"
//   20.2–25.6 the shake; they meet on the stripes; tonight's deck; "The middle is walkable."
import { globeFilm } from '../../nsge01/globekit.js'
import { clamp, prog } from '../../../src/lib.js'

export const CFG = {
  city: 'SALT LAKE CITY', hero: 'gemini', partner: 'sagittarius', duo: true,
  music: { style: 'funk', key: 'A', seed: 1614 },
  inside: { top: '#1a1c4a', bottom: '#56569a' },
  heads: ['“HI!!” | “*WHAT?*”', 'Wave. Wave. | *Semaphore.*', 'Opposite signs. | *Opposite sides.*', 'The middle is *walkable.*'],
  accents: ['#ffe27a', '#ff6b6b', '#d9b3ff', '#ffd23a'],
  lines: [
    { who: 'hero', text: "I've been waving *for ten minutes!*" },
    { who: 'partner', text: 'I thought you were waving *at the mountains!*' },
    { who: 'stars', text: 'you two are literally *opposite signs.*' },
    { who: 'stars', text: 'opposites can *meet in the middle.*' },
    { who: 'partner', text: 'middle of the crosswalk. *go!*' },
  ],
  gags: [
    { bm: 'hand', label: 'wave one:|polite' },
    { bm: 'hand', label: 'wave two:|urgent' },
    { bm: 'flags', label: 'wave three:|flag signals' },
  ],
  tie: { kind: 'deck', label: "tonight's deck" },
  pos: { hero: { x: 280, y: 1000, s: 140 }, heroTurn: { x: 280, y: 1000, s: 140 }, heroEnd: { x: 470, y: 1030, s: 140 }, part: { x: 800, y: 1000, s: 140 }, partEnd: { x: 610, y: 1030, s: 140 } },
  skyline: [
    { k: 'peaks', list: [[260, 330, 420], [520, 390, 480], [780, 320, 400]], col: '#38457a' },
    { k: 'blocks', x0: 200, x1: 880, seed: 141, min: 60, max: 150, col: '#20285a' },
    { k: 'dome', x: 540, w: 120, h: 120, col: '#7a7a8a' },
  ],
  draw(x, t, layer, K) {
    const T = K.T, gy = K.GL.groundY
    if (layer === 'back') {
      // the very wide street between them, lane dashes, and the crosswalk stripes that light up at the turn
      x.fillStyle = '#3a3a52'; x.fillRect(180, gy + 6, 720, 96)
      x.fillStyle = '#ffd23a'; for (let i = 200; i < 900; i += 60) x.fillRect(i, gy + 52, 30, 5)
      const a = clamp(prog(t, T.h2 + 0.3, T.h2 + 0.8))
      if (a > 0) { x.fillStyle = `rgba(244,248,255,${(0.9 * a).toFixed(3)})`; for (let i = 360; i < 720; i += 36) x.fillRect(i, gy + 14, 20, 80) }
      // the walk signal
      x.fillStyle = '#2a2a3a'; x.fillRect(846, gy - 150, 40, 54); x.fillStyle = '#9aa3b8'; x.fillRect(862, gy - 96, 8, 96)
      const walk = t > T.h2 + 0.3
      x.fillStyle = walk ? '#f4f8ff' : '#ff6b6b'; x.fillRect(856, gy - 140, 20, 34)
    }
  },
}
const F = globeFilm(CFG)
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES
