// khse17: ZODIAC HOT SEAT, single at the dinner round: Leo (trial reel, December flavour). Kit: ../../khse01/scenes/hotkit.js.
//   0.00  frame 0: Leo mid-wave at a long holiday table of couples (pairs of little stars), the one empty chair beside
//         it, a party cracker mid-snap; the hook "The only single one *at dinner.*" landed. 0.3 screen shake.
//   Q1 "'So… anyone special?'" → "me!"  Q2 "Plus-one?" → "the pie."
//   the last question (silence): "Does it sting?" → "…a little. then the pie comes."
//   THE STARS: "Single at the table. *Whole* at the table."  Hard cut.
import { makeHotSeat, drawStarChar, signStar, box, R, label, sparkles, prog, ease, INK, BONE, GOLD, RED, INTER } from '../../khse01/scenes/hotkit.js'

const PAIRS = [['taurus', 'cancer'], ['virgo', 'capricorn'], ['libra', 'gemini']]
function table(x, t, k) {
  x.save(); x.globalAlpha = k
  // couples seated at both ends of the table, the empty chair right beside Leo
  PAIRS.forEach(([a, b], i) => {
    const cx = [190, 870, 300][i], cy = [1060, 1060, 1010][i]
    for (const [j, s] of [[0, a], [1, b]]) { const S = signStar(s); drawStarChar(x, cx + j * 58 - 29, cy + (j ? 6 : 0), 92, t, { color: S.color, mood: 'heart', seed: i * 2 + j, glow: 0.5 }) }
  })
  box(x, 690, 1000, 80, 110, '#8a1f33', { b: 5 })
  label(x, 'RESERVED', 730, 990, { size: 18, col: BONE, font: INTER, weight: 800 })
  // the table (in front)
  box(x, 130, 1120, 820, 46, '#f4e2c6', { b: 7 }); R(x, '#c9a06a', 130, 1166, 820, 16)
  for (let i = 0; i < 6; i++) box(x, 170 + i * 130, 1100, 46, 18, BONE, { b: 3 })
  // the cracker mid-snap
  const p = prog(t, -0.3, 0.3)
  x.save(); x.translate(300, 1098)
  box(x, -90 - 30 * p, -12, 80, 24, RED, { b: 4 }); box(x, 10 + 30 * p, -12, 80, 24, GOLD, { b: 4 })
  x.restore()
  label(x, 'SNAP!', 300, 930, { size: 46, col: GOLD, font: INTER, weight: 800, rot: -0.1 })
  sparkles(x, t + 0.35, 300, 1098, 0, 10, 120, 3)
  x.restore()
}

const EP = makeHotSeat({
  id: 'khse17', sign: 'leo', name: 'Leo', accent: '#f39a3a',
  hook: 'The only single one | *at dinner.*',
  breakFx: 'shake', breakAt: 0.3,
  hero0: { x: 540, y: 1030, s: 270, mood: 'happy', look: [1, -0.6] },
  frame0(x, t, S) { table(x, t, S.k) },
  qs: [
    { q: '“So… *anyone special?*”', a: 'me!', mood: 'sparkle', size: 62 },
    { q: '*Plus-one?*', a: 'the pie.', mood: 'happy' },
  ],
  final: { q: 'Does it *sting?*', a: '…a little. then the pie comes.', mood: 'neutral', endMood: 'happy' },
  last: 'Single at the table. *Whole* at the table.',
  ending: 'cut',
  music: { style: 'jazzy', key: 'F', seed: 3517 },
})
export const { DURATION, SCENES, CUES, T, META } = EP
void INK
