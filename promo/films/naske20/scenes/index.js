// naske20 · Ask the Stars, Volume 2, ep 20 · "They got me a gift I really don't like." (18 s, screwed · Fm)
// The format lives in ../../naske19/scenes/askkit2.js. Story 0–15.6, then the short shared end card (2.4 s).
//   0.0   DM: "They got me a gift I *really* don't like."  ♏ Scorpio mid-unwrap, holding up a lumpy green sweater with a
//         crooked reindeer; wrapping-paper scraps still flying; Scorpio's eyes wide.
//   3.0   "say thank you for the thought. and mean it."  A gift tag flips up: "made it myself!"  Scorpio melts (heart eyes).
//   5.9   "you don't have to love the reindeer."  The reindeer winks.
//   8.8   "if they ask later, be honest. gently."  Scorpio wears it for one photo: viewfinder, CLICK.
//   12.1  "Thank the *thought.* | Keep it kind."
import { makeAsk, R, box, drawBits, bubble, sparkles, hearts, shadow, inSprite, starFrame, label, pop01, outK, prog, lerp, clamp, ease, INK, BONE, GOLD, RED, INTER } from '../../naske19/scenes/askkit2.js'

const CORE = [
  '...GGGGGGGGGG...',
  'GGGGGGGGGGGGGGGG',
  'GGRWRWRWRWRWRWGG',
  'GGGGGBGGGGBGGGGG',
  'GGGGGBBGGBBGGGGG',
  'GGGGGGBBBBGGGGGG',
  'GGGGGGBWBBGGGGGG',
  'GGGGGGBBBBBGGGGG',
  'GGGGGGGBBBNGGGGG',
  'GGGGGGGGBBGGGGGG',
  'GGGGGGGGGGGGGGGG',
  'GGRWRWRWRWRWRWGG',
  '.GGGGGGGGGGGGGG.',
]
const sweater = wink => CORE.map((r, j) => {
  const row = wink && j === 6 ? r.replace('W', 'B') : r
  return (j >= 1 && j <= 9 ? 'GG' : '..') + row + (j >= 1 && j <= 9 ? 'GG' : '..')
})
const SW_C = { G: '#3f9a5a', R: '#e8414f', W: '#ffffff', B: '#8a5a32', N: '#ff3b4f' }
const SCRAPS = [[-1, -0.6, '#e8414f'], [1, -0.8, GOLD], [-0.6, -1, '#3ce6cf'], [0.7, -0.4, '#e8414f'], [0.2, -1.1, GOLD]]

function scene(x, t, S) {
  const { k, out } = S
  if (k <= 2) {
    const HX = 470, HY = 1010
    shadow(x, HX, 1180, 260)
    const mood = t < S.b[1] + 0.9 ? 'wide' : k === 1 ? 'heart' : t < S.b[2] + 1.0 ? 'squint' : 'happy'
    S.hero(x, t, { x: HX, y: HY, s: 290, mood, look: [0.8, -0.8], hops: [0.15, ...S.hops(0), ...S.hops(1)] })
    // wrapping-paper scraps from the unwrap (still in the air at t = 0)
    SCRAPS.forEach(([dx, dy, c], i) => {
      const p = (t + 0.45 + i * 0.07) / 1.6
      if (p > 1) return
      x.save(); x.globalAlpha = 1 - ease.inQuad(p); x.translate(720 + dx * 300 * p, 760 + dy * 360 * p + 500 * p * p); x.rotate(p * 6 + i)
      R(x, INK, -20, -14, 40, 28); R(x, c, -16, -10, 32, 20); x.restore()
    })
    // the sweater, held up high (shakes a little in the hook)
    const shake = k === 0 ? Math.sin(t * 22) * 4 * Math.exp(-t * 0.6) : 0
    const wink = k === 2 && t > S.b[2] + 0.7 && t < S.b[2] + 1.4
    drawBits(x, sweater(wink), SW_C, 730 + shake, 760, 13, { rot: -0.08 })
    if (wink) sparkles(x, t, 735, 745, S.b[2] + 0.7, 6, 60, 1)
    // the gift tag: "made it myself!"
    if (k >= 1) {
      const p = pop01(t, S.b[1] + 0.35, 0.4, 2.2)
      x.save(); x.translate(860, 900); x.rotate(lerp(1.4, 0.12, p) + 0.04 * Math.sin(t * 3)); x.scale(p, p)
      x.strokeStyle = INK; x.lineWidth = 4; x.beginPath(); x.moveTo(-10, -80); x.lineTo(0, -20); x.stroke()
      box(x, -150, -20, 300, 90, '#f7e7c4', { b: 5 })
      x.font = `italic 500 44px 'EB Garamond', serif`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = INK; x.fillText('made it myself!', 0, 26)
      x.restore()
      if (k === 1) hearts(x, t, S.b[1] + 0.9, HX, 860, { n: 5, cell: 7, spread: 140 })
    }
    return
  }
  // beat 3: wearing it for one photo
  const kk = pop01(t, S.b[3] - 0.05, 0.4, 2) * out
  const o = { x: 540, y: 1000, s: 330, pop: kk, mood: t > S.b[3] + 1.6 && t < S.b[3] + 1.8 ? 'squint' : 'happy', look: [0, 0], hops: S.hops(2) }
  shadow(x, 540, 1185, 280 * kk)
  S.hero(x, t, o)
  const F = starFrame(o.x, o.y, o.s, t, o)
  inSprite(x, F, () => { drawBits(x, sweater(false), SW_C, 18, 25.5, 0.82) })
  // viewfinder corners + CLICK
  const vk = pop01(t, S.b[3] + 0.4, 0.3, 2) * out
  if (vk > 0.01) {
    x.save(); x.globalAlpha = vk
    const L = 260, Tp = 720, Rt = 820, B = 1230, c = 70, w = 12
    for (const [px, py, sx, sy] of [[L, Tp, 1, 1], [Rt, Tp, -1, 1], [L, B, 1, -1], [Rt, B, -1, -1]]) { R(x, BONE, px, py, c * sx, w * sy); R(x, BONE, px, py, w * sx, c * sy) }
    x.fillStyle = RED; x.fillRect(L + 30, Tp + 30, 22, 22); label(x, 'REC', L + 100, Tp + 42, { size: 26 })
    x.restore()
  }
  const fl = t > S.b[3] + 1.6 && t < S.b[3] + 1.8 ? 1 - (t - S.b[3] - 1.6) / 0.2 : 0
  if (fl > 0) { x.save(); x.globalAlpha = 0.7 * fl; x.fillStyle = '#fff8ee'; x.fillRect(0, 0, 1080, 1920); x.restore() }
  bubble(x, t, 760, 660, S.b[3] + 1.6, S.b[3] + 2.6, 'CLICK!', { size: 46, tail: -0.6 })
  bubble(x, t, 540, 640, S.b[3] + 2.0, 12.2, 'one photo. for them.', { size: 40, col: '#d9f4e2' })
}

const EP = makeAsk({
  sign: 'scorpio', name: 'SCORPIO', partner: 'leo',
  question: "They got me a gift | I *really* don't like.",
  lines: ['say thank you for the thought. and mean it.', "you don't have to love the reindeer.", 'if they ask later, be honest. gently.'],
  chip: '♏ FIXED WATER · MARS (TRAD.) · PLUTO (MODERN)',
  last: 'Thank the *thought.* | Keep it kind.', lastLate: 3,
  scene,
  cues: [
    ['whoosh', 0.05, 0.3, 0.03], ['tick', 0.2, 0.04], ['pop', 0.5, 523.25, 0.03, 0.3],
    ['whoosh', 3.35, 0.25, 0.03], ['pop', 3.7, 1174.66, 0.04, 0.4], ['glitter', 4.0, 4.5],
    ['pluck', 6.6, 1567.98, 0.04, 0.4, 0.3], ['glitter', 6.6, 6.9],
    ['tick', 10.4, 0.08], ['pop', 10.42, 1760, 0.04, 0.3],
  ],
})
export const DURATION = EP.DURATION, SCENES = EP.SCENES, CUES = EP.CUES
