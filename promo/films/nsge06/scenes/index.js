// nsge06: REMIX: SNOW GLOBE CITIES, Pittsburgh, "Pittsburgh: which bridge?" (28 s vertical, music: jazzy · G)
// Rows: promo/films/next30/b16.md. Look + timeline: ../../nsge01/globekit.js.
//   0–6.4    "Which bridge | do I take?"  Libra spins between golden bridges over the frozen river; an incline car on the hill.
//   6.4–12.7 "Three rivers. | So many bridges."  bridge one, cute · bridge two, also cute · the incline, going up, undecided.
//   13–20    An Aries waves from the far bank with a pierogi. THE STARS: any bridge works if someone kind is waiting.
//   20.2–25.6 the shake; tonight's deck fans in; "Pick a bridge. Cross it."
import { globeFilm } from '../../nsge01/globekit.js'

export const CFG = {
  city: 'PITTSBURGH', hero: 'libra', partner: 'aries',
  music: { style: 'jazzy', key: 'G', seed: 1606 },
  inside: { top: '#18183e', bottom: '#4a4a84' },
  heads: ['Which bridge | do I *take?*', 'Three rivers. | *So many* bridges.', 'Any bridge works | if someone\'s *waiting.*', 'Pick a bridge. *Cross it.*'],
  accents: ['#ffc93a', '#ffc93a', '#ff9a7a', '#ffd23a'], lateWords: 2,
  lines: [
    { who: 'hero', text: 'this bridge? that bridge? *the other gold one?*' },
    { who: 'stars', text: 'babe, they all cross *the same river.*' },
    { who: 'hero', text: "what if the next one's *cuter?*" },
    { who: 'stars', text: 'any bridge works if *someone kind waits.*' },
    { who: 'partner', text: 'I saved you a pierogi! *hurry!*' },
  ],
  gags: [
    { bm: 'bridge', label: 'bridge one:|cute' },
    { bm: 'bridge', label: 'bridge two:|also cute' },
    { bm: 'incline', label: 'the incline:|going up, undecided' },
  ],
  tie: { kind: 'deck', label: "tonight's deck" },
  skyline: [
    { k: 'hill', x: 820, w: 320, h: 230, col: '#27305c' },
    { k: 'blocks', x0: 200, x1: 680, seed: 51, min: 110, max: 230, col: '#1f2550' },
    { k: 'tower', x: 420, w: 70, h: 320, col: '#2b3468', tip: 'spire' },
    { k: 'river', y0: -6, y1: 40, col: '#9fc0e6' },
    { k: 'bridge', x0: 190, x1: 420, y: 40, h: 60 },
    { k: 'bridge', x0: 430, x1: 660, y: 40, h: 70 },
    { k: 'bridge', x0: 670, x1: 900, y: 40, h: 56 },
  ],
  pos: { part: { x: 720, y: 1000, s: 150 } },
  draw(x, t, layer, K) {
    const gy = K.GL.groundY
    if (layer === 'sky') {
      // the incline up the hill (track + a red car that inches up and back)
      x.strokeStyle = '#9aa3b8'; x.lineWidth = 6; x.beginPath(); x.moveTo(700, gy - 40); x.lineTo(860, gy - 210); x.stroke()
    }
    if (layer === 'back') {
      const p = 0.5 + 0.4 * Math.sin(t * 0.6)
      const cx = 700 + 160 * p, cy = gy - 40 - 170 * p
      x.fillStyle = '#ff6b6b'; x.fillRect(cx - 18, cy - 26, 36, 26); x.fillStyle = '#ffe9a0'; x.fillRect(cx - 12, cy - 20, 10, 10); x.fillRect(cx + 2, cy - 20, 10, 10)
      // the pierogi in the Aries' hands at the turn
      if (t > K.T.partnerIn + 0.4 && t < K.T.together) { const b = K.BITS.pierogi; K.drawBits(x, b.rows, b.cols, 770, 1010, 6) }
    }
  },
}
const F = globeFilm(CFG)
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES
