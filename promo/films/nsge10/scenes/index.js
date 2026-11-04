// nsge10: REMIX: SNOW GLOBE CITIES, Ottawa, "Ottawa: skating to work" (30 s vertical, music: pop · Bb)
// Rows: promo/films/next30/b16.md. Look + timeline: ../../nsge01/globekit.js.
//   0–6.4    "I skate | to my meetings."  Capricorn glides along the frozen canal with a briefcase; Parliament Hill behind.
//   6.4–12.7 "Same canal. | Same cutie."  8:00 skate to work · 12:00 skate to lunch · 5:00 skate past them, again (twist).
//   13–20    A Cancer holds out a cocoa by the canal. THE STARS: you're allowed to slow down and say hi.
//   20.2–25.6 the shake; no tie-in, the two skate off together; "Slow down. Say hi."
import { globeFilm } from '../../nsge01/globekit.js'

export const CFG = {
  city: 'OTTAWA', hero: 'capricorn', partner: 'cancer',
  music: { style: 'pop', key: 'Bb', seed: 1610 },
  inside: { top: '#161c44', bottom: '#46548c' },
  heads: ['I skate | to my *meetings.*', 'Same canal. | *Same cutie.*', 'You can | *slow down.*', '*Slow down.* Say hi.'],
  accents: ['#d9c19a', '#ffb3d1', '#bfe6ff', '#ffd23a'], lateWords: 2,
  lines: [
    { who: 'hero', text: 'skating to work. efficient *AND scenic.*' },
    { who: 'stars', text: "you've skated past *the same cutie* all week." },
    { who: 'hero', text: 'I was *on schedule!*' },
    { who: 'stars', text: "you're allowed to slow down *and say hi.*" },
    { who: 'hero', text: "hi. I'm a Capricorn. *I'm early.*" },
  ],
  gags: [
    { bm: 'briefcase', label: '8:00: skate|to work' },
    { bm: 'clock', label: '12:00: skate|to lunch' },
    { bm: 'heart', label: '5:00: skate past|them. again' },
  ],
  tie: null,
  heroProp: { bm: 'briefcase', dx: 88, dy: 30, cell: 6 },
  skyline: [
    { k: 'hill', x: 420, w: 420, h: 120, col: '#26305e' },
    { k: 'tower', x: 420, w: 56, h: 300, col: '#6a6a7a', tip: 'spire' },
    { k: 'dome', x: 560, w: 110, h: 150, col: '#5a5a6e' },
    { k: 'dome', x: 300, w: 110, h: 140, col: '#5a5a6e' },
    { k: 'blocks', x0: 640, x1: 900, seed: 101, min: 80, max: 200, col: '#20285a' },
    { k: 'river', y0: -64, y1: 8, col: '#c4dcf2' },
  ],
  pos: { part: { x: 700, y: 1000, s: 150 } },
  draw(x, t, layer, K) {
    const T = K.T
    if (layer === 'back') {
      // skate blades under the Capricorn
      if (t < T.out[1]) { const b = K.BITS.skis; K.drawBits(x, b.rows, b.cols, t > T.together ? 462 : t > T.h2 ? 400 : 420, 1068, 7, { outline: K.INK }) }
      if (t > T.partnerIn + 0.4 && t < T.together + 1.5) { const b = K.BITS.cocoa; K.drawBits(x, b.rows, b.cols, t > T.together ? 541 : 600, 990, 7) }
    }
  },
}
const F = globeFilm(CFG)
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES
