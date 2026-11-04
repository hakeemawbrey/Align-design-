// nsge03: REMIX: SNOW GLOBE CITIES, Boston, "Boston: the parking-spot chair" (28 s vertical, music: funk · Eb)
// Rows: promo/films/next30/b16.md. Look + timeline: ../../nsge01/globekit.js.
//   0–6.4    "I shoveled it. | So it's mine."  Aries mid-shovel in front of the brownstones, a lawn chair saving the
//            shoveled spot. ARIES: "the chair says MINE." THE STARS: "chairs work on parking. only parking."
//   6.4–12.7 "Aries saves | everything."  parking spot · train seat · the pond bench, saved for nobody yet (twist).
//   13–20    A Libra skates up on the frozen pond. THE STARS: "people aren't spots, babe. you just ask." ARIES: "wanna skate?"
//   20.2–25.6 the shake; talk card "What's a hill you will die on?"; "Don't save it. Ask."
import { globeFilm } from '../../nsge01/globekit.js'

export const CFG = {
  city: 'BOSTON', hero: 'aries', partner: 'libra',
  music: { style: 'funk', key: 'Eb', seed: 1603 },
  inside: { top: '#1a1840', bottom: '#4c4a86' },
  heads: ["I shoveled it. | So it's *mine.*", 'Aries saves | *everything.*', "People aren't | *parking spots.*", "Don't save it. *Ask.*"],
  accents: ['#ff9a7a', '#ffd23a', '#ffb3d1', '#ffd23a'],
  lines: [
    { who: 'hero', text: 'I shoveled this spot. the chair says *MINE.*' },
    { who: 'stars', text: 'chairs work on parking. *only parking.*' },
    { who: 'hero', text: "I'm *prepared*, okay?" },
    { who: 'stars', text: "people aren't spots, babe. *you just ask.*" },
    { who: 'hero', text: 'hi! do you… *wanna skate?*' },
  ],
  gags: [
    { bm: 'chair', label: 'parking spot:|chair-saved' },
    { bm: 'train', label: 'train seat:|chair-saved' },
    { bm: 'bench', label: 'the pond bench:|saved for nobody yet' },
  ],
  tie: { kind: 'talk', img: 'card-talk-1.png' },
  heroProp: { bm: 'shovel', dx: 84, dy: 0, cell: 9, rot: 0.5 },
  pos: { hero: { x: 380, y: 1000, s: 160 }, heroTurn: { x: 380, y: 1000, s: 150 }, part: { x: 700, y: 1006, s: 150 } },
  skyline: [
    { k: 'blocks', x0: 180, x1: 900, seed: 21, min: 140, max: 250, col: '#1f2550' },
    { k: 'tower', x: 640, w: 70, h: 340, col: '#2a3266', tip: 'flat' },
    { k: 'tower', x: 470, w: 56, h: 290, col: '#29306a', tip: 'spire' },
    { k: 'rows', x0: 180, x1: 900, h: 96 },
  ],
  draw(x, t, layer, K) {
    const gy = K.GL.groundY
    if (layer === 'back') {
      // the frozen pond (right) and the saved spot's lawn chair (left)
      x.fillStyle = '#b9d6f2'; x.fillRect(600, gy + 44, 260, 46); x.fillStyle = 'rgba(255,255,255,0.5)'; x.fillRect(640, gy + 56, 60, 4); x.fillRect(740, gy + 70, 80, 4)
      const c = K.BITS.chair; K.drawBits(x, c.rows, c.cols, 250, gy + 6, 7)
      x.fillStyle = '#ffffff'; x.fillRect(200, gy + 40, 120, 6)
    }
  },
}
const F = globeFilm(CFG)
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES
