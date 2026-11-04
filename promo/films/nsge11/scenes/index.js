// nsge11: REMIX: SNOW GLOBE CITIES, Calgary, "Calgary: the chinook crush" (30 s vertical, music: synthwave · E)
// Rows: promo/films/next30/b16.md. Look + timeline: ../../nsge01/globekit.js.
//   0–6.4    "It was freezing. | Now it's warm?"  Aquarius tosses off a scarf under the chinook arch over the Rockies.
//   6.4–12.7 "Freeze. Melt. | Feelings?"  morning, freezing · noon, chinook · Aquarius, feelings?! (twist).
//   13–20    A Scorpio stands in the thaw. THE STARS: you can be unusual and still care.
//   20.2–25.6 the shake; dealbreakers "must love weird ideas", stamped DAY ONE; "Let the thaw happen."
import { globeFilm } from '../../nsge01/globekit.js'
import { clamp, prog } from '../../../src/lib.js'

export const CFG = {
  city: 'CALGARY', hero: 'aquarius', partner: 'scorpio',
  music: { style: 'synthwave', key: 'E', seed: 1611 },
  inside: { top: '#1a1c4a', bottom: '#5a5a92' },
  heads: ["It was freezing. | Now it's *warm?*", 'Freeze. Melt. | *Feelings?*', 'Let yourself | *warm up.*', 'Let the *thaw* happen.'],
  accents: ['#ffc96b', '#8fd8ff', '#ff8fa0', '#ffd23a'], lateWords: 2,
  lines: [
    { who: 'hero', text: "a warm wind in winter?? *I'm warming up?*" },
    { who: 'stars', text: "that's a chinook, babe. *it happens here.*" },
    { who: 'hero', text: 'this is *not on brand.*' },
    { who: 'stars', text: 'you can be unusual *and still care.*' },
    { who: 'hero', text: 'I like you. weirdly. *a lot.*' },
  ],
  gags: [
    { bm: 'thermo', label: 'morning:|freezing' },
    { bm: 'thermoHot', label: 'noon:|chinook' },
    { bm: 'heart', label: 'Aquarius:|feelings?!' },
  ],
  tie: { kind: 'deal', text: 'must love weird ideas', stamp: 'DAY ONE' },
  heroProp: { bm: 'scarf', dx: 70, dy: -70, cell: 7, rot: -0.6 },
  skyline: [
    { k: 'peaks', list: [[230, 300, 380], [430, 340, 420], [640, 280, 360]], col: '#38457a' },
    { k: 'blocks', x0: 460, x1: 900, seed: 111, min: 80, max: 200, col: '#20285a' },
    { k: 'tower', x: 700, w: 30, h: 330, col: '#9aa3b8', tip: 'flat' },
  ],
  pos: { part: { x: 700, y: 1000, s: 150 } },
  draw(x, t, layer, K) {
    if (layer === 'sky') {
      // the chinook arch: a cloud deck with a clear band of sky under it
      x.fillStyle = 'rgba(40,36,80,0.9)'; x.fillRect(180, 560, 720, 90)
      for (let i = 180; i < 900; i += 8) { const y = 650 + 26 * Math.sin((i - 180) / 720 * Math.PI); x.fillRect(i, 640, 8, y - 640) }
      x.fillStyle = 'rgba(255,200,140,0.35)'; for (let i = 180; i < 900; i += 8) { const y = 650 + 26 * Math.sin((i - 180) / 720 * Math.PI); x.fillRect(i, y, 8, 8) }
      // the round top of the tall tower
      x.fillStyle = '#c8c0d8'; x.fillRect(676, 1072 - 360, 48, 34); x.fillStyle = '#ff6b6b'; x.fillRect(676, 1072 - 330, 48, 6)
    }
    if (layer === 'back') {
      // the snow thaws in patches after noon's chinook
      const a = clamp(prog(t, K.T.gags[1], K.T.gags[1] + 2))
      if (a > 0) { x.fillStyle = `rgba(110,150,90,${(0.6 * a).toFixed(3)})`; for (let i = 0; i < 8; i++) x.fillRect(210 + i * 86, 1086 + (i % 3) * 18, 44, 10) }
    }
  },
}
const F = globeFilm(CFG)
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES
