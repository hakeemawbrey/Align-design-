// nsge01: REMIX: SNOW GLOBE CITIES, Minneapolis, "Minneapolis: never going outside" (30 s vertical, music: dreamy · D)
// Rows: promo/films/next30/b16.md. Look + timeline: ../globekit.js (shared by nsge01–nsge14).
//   0–6.4    "I can cross downtown | and never go outside." Virgo hops through downtown with a colour-coded map; glass
//            skyways link the towers. VIRGO: "skyways! I never have to touch snow." THE STARS: "or touch grass. or meet anyone."
//   6.4–12.7 "Every route, | planned."  skyway map, colour-coded · hotdish, pre-labeled · a backup map for the map (twist).
//            VIRGO: "a backup is responsible, actually."
//   12.9     card cut.
//   13–20    "Some things aren't | on the map."  A Sagittarius waves from an ice house on the frozen lake.
//            THE STARS: "the good stuff isn't always on your map." SAG: "come out! I brought two mittens."
//   20.2–25.6 the globe shakes, the snow swirls, they meet on the ice, talk card "Planned date or spontaneous date?",
//            "Take the outside route."  Pisces, outside the glass, cries the whole time.
import { globeFilm } from '../globekit.js'

const SKYWAYS = [[300, 640 - 0, 120], [500, 640, 170], [380, 560, 90]]
export const CFG = {
  city: 'MINNEAPOLIS', hero: 'virgo', partner: 'sagittarius',
  music: { style: 'dreamy', key: 'D', seed: 1601 },
  inside: { top: '#141c46', bottom: '#43568f' },
  heads: ['I can cross downtown | and never go *outside.*', 'Every route, | *planned.*', "Some things aren't | *on the map.*", 'Take the *outside* route.'],
  accents: ['#bfe6ff', '#c8e6a0', '#d9b3ff', '#ffd23a'],
  lines: [
    { who: 'hero', text: 'skyways! I never have to *touch snow.*' },
    { who: 'stars', text: 'or touch grass. or meet *anyone.*' },
    { who: 'hero', text: 'a backup is *responsible*, actually.' },
    { who: 'stars', text: "the good stuff isn't always *on your map.*" },
    { who: 'partner', text: 'come out! I brought *two mittens.*' },
  ],
  gags: [
    { bm: 'map', label: 'skyway map:|color-coded' },
    { bm: 'bowl', label: 'hotdish:|pre-labeled' },
    { bm: 'map', label: 'a backup map|for the map' },
  ],
  tie: { kind: 'talk', img: 'card-talk-6.png' },
  heroProp: { bm: 'map', dx: 92, dy: 18, cell: 7, rot: -0.15 },
  skyline: [
    { k: 'blocks', x0: 180, x1: 900, seed: 7, min: 70, max: 170, col: '#1f2752' },
    { k: 'tower', x: 300, w: 64, h: 300, col: '#2a3466', tip: 'flat' },
    { k: 'tower', x: 500, w: 80, h: 380, col: '#2e3a70', tip: 'spire' },
    { k: 'tower', x: 640, w: 56, h: 260, col: '#283062', tip: 'antenna' },
    { k: 'river', y0: -60, y1: 6, col: '#a9c8ec' },
  ],
  pos: { part: { x: 700, y: 1000, s: 150 }, partFrom: { x: 760, y: 1000 } },
  draw(x, t, layer, K) {
    if (layer === 'back') {
      // the glass skyways between the towers (y up from the ground)
      const gy = K.GL.groundY
      for (const [x0, h, w] of [[332, 210, 136], [540, 170, 72], [332, 120, 136]]) {
        x.fillStyle = 'rgba(191,230,255,0.75)'; x.fillRect(x0, gy - h, w, 24)
        x.fillStyle = 'rgba(255,214,140,0.9)'; for (let i = x0 + 8; i < x0 + w - 8; i += 20) x.fillRect(i, gy - h + 8, 10, 8)
        x.fillStyle = K.SNOW; x.fillRect(x0, gy - h - 4, w, 4)
      }
      // the ice house on the frozen lake (Sag waves from its door)
      const hx = 790, hy = gy + 40
      x.fillStyle = '#c8402a'; x.fillRect(hx - 44, hy - 70, 88, 70)
      x.fillStyle = K.SNOW; x.fillRect(hx - 52, hy - 84, 104, 16)
      x.fillStyle = '#3a2a2a'; x.fillRect(hx - 14, hy - 44, 28, 44)
      x.fillStyle = 'rgba(255,214,140,0.95)'; x.fillRect(hx + 20, hy - 56, 14, 14)
      x.fillStyle = '#9aa3b8'; x.fillRect(hx + 30, hy - 104, 6, 22)
      void SKYWAYS
    }
  },
}
const F = globeFilm(CFG)
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES
