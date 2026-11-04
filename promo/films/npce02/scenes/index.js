// npce02: PISCES CRIES ABOUT… "the lights coming on." (14 s vertical trial reel, promo/films/next30/b48.md,
// music: lofi · Ab). Story 0–9.6, then the shared end card. The format lives in ../../npce01/scenes/criekit.js.
//   0.0       hook: a dark winter street, snow falling; Pisces with cocoa, the first house's lights already on.
//   0.0–4.0   the strings of lights flick on house by house (0.0, 0.9, 1.8, 2.7); sticker (2.75) "every *single* house."
//   4.0       the last window lights up and a Libra neighbour waves from it.  4.4 fountains.
//   5.6       card cut. THE STARS: "Let the little beautiful things land."
import { makeCry, box, R, shadow, glow, snow, mug, sparkles, pop01, prog, ease, INK, BONE, GOLD, PINK } from '../../npce01/scenes/criekit.js'

const BULBS = ['#ff5c6a', '#ffd25c', '#6fe0a0', '#7fbfff', '#ff8fd0']
const HOUSES = [[150, 230, 300, '#3a3a6a', 0.0], [400, 250, 360, '#4a3060', 0.9], [660, 240, 320, '#2f4a5e', 1.8], [920, 250, 380, '#503a52', 2.7]]
function house(x, t, cx, w, h, col, on, base, last) {
  const y = base - h
  box(x, cx - w / 2, y, w, h, col, { b: 6 })
  // roof
  x.fillStyle = INK; x.beginPath(); x.moveTo(cx - w / 2 - 26, y + 6); x.lineTo(cx, y - 120); x.lineTo(cx + w / 2 + 26, y + 6); x.closePath(); x.fill()
  x.fillStyle = '#2a2244'; x.beginPath(); x.moveTo(cx - w / 2 - 12, y); x.lineTo(cx, y - 108); x.lineTo(cx + w / 2 + 12, y); x.closePath(); x.fill()
  R(x, '#f4f1ff', cx - w / 2 - 14, y - 6, w + 28, 10)      // snow on the eave
  const lit = t >= on
  // windows (+ the door)
  for (const [wx, wy] of [[-0.26, 0.22], [0.26, 0.22]]) box(x, cx + wx * w - 30, y + wy * h, 60, 64, lit ? '#ffd98a' : '#1a1430', { b: 5 })
  box(x, cx - 28, base - 110, 56, 110, '#6b4a2f', { b: 5 })
  if (lit) glow(x, cx, y + h * 0.4, w * 0.9, 0.55 * Math.min(1, (t - on) * 4))
  // the string of bulbs along the roof line, popping on one by one from the left
  const n = 9
  for (let i = 0; i < n; i++) {
    const p = i / (n - 1), bx = cx - w / 2 - 10 + p * (w + 20), by = y + 4 + 10 * Math.sin(Math.PI * ((p * 4) % 1))
    const onI = lit && t >= on + i * 0.035
    const tw = onI ? 0.75 + 0.25 * Math.sin(t * 6 + i * 2) : 0
    R(x, INK, bx - 8, by - 2, 16, 18)
    R(x, onI ? BULBS[i % 5] : '#3a3450', bx - 5, by + 1, 10, 13)
    if (onI) { x.save(); x.globalAlpha = 0.35 * tw; x.fillStyle = BULBS[i % 5]; x.fillRect(bx - 12, by - 6, 24, 26); x.restore() }
  }
  void last
}

function street(x, t, S, finale = 0) {
  R(x, '#1a1530', 0, 1040, 1080, 300); R(x, '#e9e6f6', 0, 1040, 1080, 22)
  HOUSES.forEach(([cx, w, h, col, on]) => house(x, t, cx, w, h, col, finale ? -1 : on, 1050))
  // the neighbour in the last house's window, waving
  const nk = finale ? 1 : pop01(t, 3.9, 0.35, 2.4)
  if (nk > 0.01) S.star(x, t, 'libra', { x: 920 - 65, y: 1050 - 380 + 120, s: 92, pop: nk, mood: 'happy', hops: [4.0, 4.4, 4.8], seed: 9 })
  snow(x, t, { n: 46, a: 0.7 })
}

const EP = makeCry({
  id: 'npce02', topic: 'the lights coming on', accent: '#ffd25c', deep: '#c0392b',
  sticker: 'every *single* house.', peak: 4.4,
  tissues: [0.95, 1.85, 2.75, 3.95, 4.4, 4.65, 4.9],
  dim: 0.6,
  scene(x, t, S) {
    street(x, t, S)
    sparkles(x, t, 920, 760, 2.75, 8, 160, 0.4, [GOLD, BONE, PINK])
    sparkles(x, t, 860, 790, 3.95, 8, 120, 0.9, [GOLD, BONE, PINK])
    shadow(x, 540, 1290, 240)
    const look = t < 2.7 ? [-1, -1] : t < 3.9 ? [1, -1] : [1, -0.4]
    S.pis(x, t, { x: 520, y: 1140, s: 270, mood: t < 3.9 ? 'wide' : 'sparkle', look, hops: [0.92, 1.82, 2.72, 3.95, 4.42] })
    mug(x, t, 730, 1250, 70)
  },
  finaleBack(x, t, { ok }) { x.save(); x.globalAlpha = 0.55 * ok; street(x, t, { star: () => {} }, 1); x.restore() },
  last: 'Let the little beautiful things land.',
  cues: [0, 0.9, 1.8, 2.7].flatMap((c, i) => [['tick', c + 0.02, 0.06], ['glitter', c + 0.02, c + 0.35], ['pluck', c + 0.05, [1046.5, 1174.66, 1318.51, 1567.98][i], 0.03, -0.3 + i * 0.2, 0.3]])
    .concat([['pop', 3.95, 1318.51, 0.04, 0.4], ['pop', 4.05, 1760, 0.03, 0.4]]),
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
