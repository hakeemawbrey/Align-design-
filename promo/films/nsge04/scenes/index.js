// nsge04: REMIX: SNOW GLOBE CITIES, Denver, "Denver: love at the summit" (30 s vertical, music: synthwave · A)
// Rows: promo/films/next30/b16.md. Look + timeline: ../../nsge01/globekit.js.
//   0–6.4    "Love is up there. | On a summit."  Sagittarius on skis in front of the Rockies, the Mile High City below.
//   6.4–12.7 "Snow. Sun. | Snow again."  Monday snow · Tuesday sunny, jacket off · Wednesday snow (emotionally too).
//   13–20    A Taurus waves from a warm window in town. THE STARS: adventures are better with someone to tell.
//   20.2–25.6 the shake; talk card "What does a perfect lazy Sunday look like for you?"; "Come down for this one."
import { globeFilm } from '../../nsge01/globekit.js'

export const CFG = {
  city: 'DENVER', hero: 'sagittarius', partner: 'taurus',
  music: { style: 'synthwave', key: 'A', seed: 1604 },
  inside: { top: '#1c1a4c', bottom: '#5a4f92' },
  heads: ['Love is up there. | On a *summit.*', 'Snow. Sun. | *Snow again.*', 'Adventures are | *better shared.*', 'Come *down* for this one.'],
  accents: ['#d9b3ff', '#ffd23a', '#9fe6b0', '#ffd23a'], lateWords: 3,
  lines: [
    { who: 'hero', text: "my person's on a peak. *I'll find them.*" },
    { who: 'stars', text: 'or in the city you keep *driving away from.*' },
    { who: 'hero', text: 'I love a *plot twist*, okay.' },
    { who: 'stars', text: 'adventures are better with *someone to tell.*' },
    { who: 'partner', text: 'tell me everything. *I made cocoa.*' },
  ],
  gags: [
    { bm: 'snowflake', label: 'Monday:|snow' },
    { bm: 'sun', label: 'Tuesday: sunny,|jacket off' },
    { bm: 'snowflake', label: 'Wednesday: snow|(emotionally too)' },
  ],
  tie: { kind: 'talk', img: 'card-talk-3.png' },
  heroProp: { bm: 'skis', dx: 0, dy: 74, cell: 9, until: 20.0 },
  skyline: [
    { k: 'peaks', list: [[260, 330, 380], [470, 400, 460], [700, 300, 380], [880, 260, 320]], col: '#38457a' },
    { k: 'blocks', x0: 480, x1: 900, seed: 31, min: 50, max: 130, col: '#1f2752' },
    { k: 'tower', x: 620, w: 56, h: 210, col: '#2a3266', tip: 'flat' },
    { k: 'tower', x: 700, w: 48, h: 170, col: '#283062', tip: 'antenna' },
  ],
  pos: { part: { x: 700, y: 1000, s: 150 } },
  draw(x, t, layer, K) {
    const gy = K.GL.groundY
    if (layer === 'back') {
      // the warm window in town where the Taurus waits
      x.fillStyle = '#6a3e2a'; x.fillRect(770, gy - 120, 110, 120)
      x.fillStyle = K.SNOW; x.fillRect(760, gy - 134, 130, 16)
      x.fillStyle = 'rgba(255,214,140,0.95)'; x.fillRect(790, gy - 96, 36, 30); x.fillRect(836, gy - 96, 30, 30)
    }
  },
}
const F = globeFilm(CFG)
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES
