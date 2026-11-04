// nsge05: REMIX: SNOW GLOBE CITIES, Philadelphia, "Philadelphia: mixed signals, twisted" (28 s vertical, music: chiptune · C)
// Rows: promo/films/next30/b16.md. Look + timeline: ../../nsge01/globekit.js.
//   0–6.4    "Is this a date | or a jawn?"  Gemini twirls a soft pretzel in front of the row homes.
//   6.4–12.7 "Mixed signals, | twisted."  the pretzel, twisted · the bell, cracked · my texts, both (twist).
//   13–20    A Virgo puzzles over the texts. THE STARS: try the plain version. GEMINI: "I like you. dinner Friday?"
//   20.2–25.6 the shake; talk card "Cook at home or try somewhere new?"; "Untwist it."
import { globeFilm } from '../../nsge01/globekit.js'

export const CFG = {
  city: 'PHILADELPHIA', hero: 'gemini', partner: 'virgo',
  music: { style: 'chiptune', key: 'C', seed: 1605 },
  inside: { top: '#1c1c48', bottom: '#53508e' },
  heads: ['Is this a date | or a *jawn?*', 'Mixed signals, | *twisted.*', 'Try the | *plain* version.', '*Untwist* it.'],
  accents: ['#ffe27a', '#c8803a', '#c8e6a0', '#ffd23a'], lateWords: 2,
  lines: [
    { who: 'hero', text: "I said 'let's grab a jawn.' *they're confused.*" },
    { who: 'stars', text: 'sweetie, *so are you.*' },
    { who: 'hero', text: "it's called *range*, babe." },
    { who: 'stars', text: 'try the plain version. *no twists.*' },
    { who: 'hero', text: 'I like you. *dinner Friday?*' },
  ],
  gags: [
    { bm: 'pretzel', label: 'the pretzel:|twisted' },
    { bm: 'bell', label: 'the bell:|cracked' },
    { bm: 'phone', label: 'my texts:|both' },
  ],
  tie: { kind: 'talk', img: 'card-talk-4.png' },
  heroProp: { bm: 'pretzel', dx: 86, dy: -10, cell: 7 },
  skyline: [
    { k: 'blocks', x0: 180, x1: 900, seed: 41, min: 130, max: 230, col: '#1f2550' },
    { k: 'tower', x: 560, w: 72, h: 360, col: '#2b3468', tip: 'spire' },
    { k: 'tower', x: 660, w: 64, h: 330, col: '#283062', tip: 'spire' },
    { k: 'rows', x0: 180, x1: 900, h: 104, cols: ['#8a3a30', '#7a4434', '#90503a', '#6e3a3a'] },
  ],
  draw(x, t, layer, K) {
    const T = K.T
    // the Virgo's puzzled "?" over the texts during the turn
    if (layer === 'over' && t > T.partnerIn + 0.4 && t < T.l4) K.sticker(t, 760, 800, '?', K.pop01(t, T.partnerIn + 0.4, 0.3, 2.4) * K.outK(t, [T.l4 - 0.2, T.l4]), { col: '#c8e6a0', size: 40 })
  },
}
const F = globeFilm(CFG)
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES
