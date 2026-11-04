// naske23 · Ask the Stars, Volume 2, ep 23 · "Their friends don't get me." (20 s, synthwave · Bm)
// The format lives in ../../naske19/scenes/askkit2.js. Story 0–15.6, then the shared end card.
//   0.0   DM: "Their friends don't *get* me."  ♒ Aquarius mid-wave at a party in a HELLO sticker with a doodled
//         planet; a row of guest stars chat among themselves, turned away.
//   3.0   "you don't have to win the whole room."  The crowd dims to one guest.
//   5.9   "find one friend. ask about their thing."  That guest lights up: "I KNIT SCARVES!"  Aquarius: sparkle eyes.
//   8.75  card cut → 8.8 "let your partner bridge the rest."  The partner steps in between; a sparkle bridge joins them.
//   12.1  "Win them over | *one* at a time."
import { makeAsk, R, box, drawBits, bubble, sparkles, hearts, shadow, inSprite, starFrame, label, drawStarChar, signStar, pop01, outK, prog, lerp, clamp, ease, INK, BONE, GOLD, RED, INTER, MONO, drawPixelStar } from '../../naske19/scenes/askkit2.js'

const GUESTS = [
  { id: 'taurus', x: 150, y: 1090, look: [-1, 0] }, { id: 'virgo', x: 330, y: 1120, look: [-1, -0.3] },
  { id: 'leo', x: 760, y: 1110, look: [1, 0] }, { id: 'gemini', x: 940, y: 1080, look: [1, -0.2] },
]
// the HELLO sticker on the body (sprite cells)
function helloCells(x) {
  x.fillStyle = INK; x.fillRect(11.4, 23.4, 13.2, 8.2)
  x.fillStyle = '#e8414f'; x.fillRect(12, 24, 12, 2.6)
  x.fillStyle = '#ffffff'; x.fillRect(12, 26.6, 12, 4.4)
  x.fillStyle = '#ffffff'; x.fillRect(13, 24.8, 1, 1); x.fillRect(15, 24.8, 1, 1); x.fillRect(17, 24.8, 1, 1); x.fillRect(19, 24.8, 1, 1); x.fillRect(21, 24.8, 1, 1)
  // a doodled planet with a ring
  x.fillStyle = '#4a7fff'; x.fillRect(16.4, 27.4, 3.2, 2.8); x.fillStyle = INK; x.fillRect(14.6, 28.6, 6.8, 0.6)
}
const YARN = ['.RRRR.', 'RRWRRR', 'RRRWRR', 'RWRRRR', '.RRRR.']

function scene(x, t, S) {
  const { k, out } = S
  // party lights across the top
  for (let i = 0; i < 9; i++) { const on = 0.5 + 0.5 * Math.sin(t * 4 + i * 2.1); x.save(); x.globalAlpha = 0.5 * on * out; x.fillStyle = ['#ff7eb6', '#7fd0ff', GOLD][i % 3]; x.fillRect(80 + i * 115, 600 + (i % 2) * 20, 20, 20); x.restore() }
  if (k <= 2) {
    // the guests (k 0: all chatting, turned away; k ≥ 1: dim except the knitter, index 2)
    GUESTS.forEach((g, i) => {
      const dim = k >= 1 && i !== 2 ? lerp(1, 0.22, prog(t, S.b[1] + 0.3, S.b[1] + 1.0)) : 1
      const lit = k === 2 && i === 2
      shadow(x, g.x, g.y + 110, 140, 0.3 * dim)
      drawStarChar(x, g.x, g.y, lit ? 200 : 170, t, { color: signStar(g.id).color, mood: lit && t > S.b[2] + 0.5 ? 'sparkle' : 'neutral', look: lit ? [-1, -0.2] : g.look, seed: 10 + i, glow: 0.7 * dim, alpha: dim, hops: [0.4 + i * 0.6, 1.9 + i * 0.3, ...(lit ? [S.b[2] + 0.5, S.b[2] + 1.0] : [])], tips: false })
      if (k === 0) bubble(x, t, g.x + (i < 2 ? -20 : 20), g.y - 130, 0.2 + i * 0.35, 2.8, ['…', 'haha', 'lol', 'right?'][i], { size: 30, alpha: 0.85 })
    })
    if (k === 2) {
      bubble(x, t, 760, 900, S.b[2] + 0.45, S.b[3], 'I KNIT SCARVES!', { size: 40, col: '#d9f4e2', tail: 0.2 })
      const yk = pop01(t, S.b[2] + 0.7, 0.3, 2.4)
      if (yk > 0.01) drawBits(x, YARN, { R: '#e8414f', W: '#ffb3bd' }, 880, 1000, 11 * yk, { rot: Math.sin(t * 3) * 0.2 })
      sparkles(x, t, 760, 1100, S.b[2] + 0.5, 10, 160, 1)
    }
    const HX = 540, o = { x: HX, y: 1000, s: 280, mood: k === 0 ? 'happy' : k === 2 && t > S.b[2] + 0.9 ? 'sparkle' : 'neutral', look: k === 2 ? [1, 0] : [0, -0.4], hops: [...(k === 0 ? [0.3, 1.1, 1.9] : []), ...S.hops(0), ...S.hops(1)] }
    shadow(x, HX, 1170, 240)
    S.hero(x, t, o)
    const F = starFrame(o.x, o.y, o.s, t, o)
    inSprite(x, F, () => helloCells(x))
    // the wave (hook): a little waving hand-point arc of motion lines
    if (k === 0) { x.save(); x.strokeStyle = BONE; x.lineWidth = 6; x.globalAlpha = 0.8; for (let i = 0; i < 3; i++) { x.beginPath(); x.arc(HX + 150, F.cy - 110, 40 + i * 22, -1.2 + Math.sin(t * 9) * 0.3, -0.3 + Math.sin(t * 9) * 0.3); x.stroke() } x.restore() }
    return
  }
  // beat 3: the partner bridges Aquarius and the knitter
  const kk = pop01(t, S.b[3] - 0.05, 0.4, 2) * out
  const pk = pop01(t, S.b[3] + 0.5, 0.4, 2) * out
  shadow(x, 230, 1170, 200 * kk); shadow(x, 850, 1170, 200 * kk); shadow(x, 540, 1170, 220 * pk)
  S.hero(x, t, { x: 230, y: 1010, s: 240, pop: kk, mood: t > S.b[3] + 1.4 ? 'happy' : 'neutral', look: [1, 0], hops: S.hops(2) })
  drawStarChar(x, 850, 1010, 240, t, { color: signStar('leo').color, pop: kk, mood: 'happy', look: [-1, 0], seed: 12, glow: 0.9, hops: [S.b[3] + 1.4] })
  S.partner(x, t, { x: 540, y: 1000, s: 250, pop: pk, mood: 'happy', look: [0, -0.3], hops: [S.b[3] + 0.6, S.b[3] + 1.4] })
  // the sparkle bridge
  const bp = prog(t, S.b[3] + 1.0, S.b[3] + 1.8)
  for (let i = 0; i < 14; i++) {
    const u = i / 13; if (u > bp) break
    const bx = lerp(230, 850, u), by = 830 - Math.sin(Math.PI * u) * 150
    drawPixelStar(x, bx, by + Math.sin(t * 5 + i) * 6, 18 + (i % 3) * 6, 1 + (i % 2), [GOLD, '#7fd0ff', BONE][i % 3])
  }
  hearts(x, t, S.b[3] + 1.9, 540, 820, { n: 4, cell: 6, spread: 300 })
}

const EP = makeAsk({
  sign: 'aquarius', name: 'AQUARIUS', partner: 'libra',
  question: "Their friends | don't *get* me.",
  lines: ["you don't have to win the whole room.", 'find one friend. ask about their thing.', 'let your partner bridge the rest.'],
  chip: '♒ FIXED AIR · SATURN (TRAD.) · URANUS (MODERN)',
  last: 'Win them over | *one* at a time.', lastLate: 4,
  pis: { x: 965, y: 1250, s: 100 },
  scene,
  cues: [
    ['pop', 0.3, 659.25, 0.02, -0.6], ['pop', 0.65, 739.99, 0.02, -0.3], ['pop', 1.0, 880, 0.02, 0.3], ['pop', 1.35, 987.77, 0.02, 0.6],
    ['whoosh', 3.4, 0.3, 0.025],
    ['pop', 6.35, 1318.51, 0.045, 0.3], ['glitter', 6.4, 6.9], ['pop', 6.6, 987.77, 0.03, 0.5],
    ['pop', 9.35, 880, 0.035, 0], ['glitter', 9.8, 10.6],
  ],
})
export const DURATION = EP.DURATION, SCENES = EP.SCENES, CUES = EP.CUES
