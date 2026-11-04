// nhse06: HOLIDAY SURVIVAL GUIDE No. 6, "It's a Gift Swap, Not a Final." (30 s vertical, Next 30 · b29, music: chiptune · B)
// The series look lives in ../../nhse01/survkit.js.
//   0.0–6.6    "It's a *gift swap,* | not a final."  ♈ Aries in a sprinter's crouch (sweatband on) in front of the
//              gift pile; the guests sit in a polite circle. Pisces sniffles.
//   6.6–13.9   "Swap. | *Swap.* SWAP."  Aries draws plays on a whiteboard, grabs the candle, loses the candle to
//              ♉ Taurus, grabs again… the room goes quiet (crickets). ♈: "nobody touch the candle. I have a plan."
//   13.9       card cut.
//   13.9–21.6  "Play to | *laugh.*"  THE STARS: "play to *laugh*, not to win." / "the fun is the chaos. *let it go.*"
//              Aries opens the last gift: novelty socks. It wears them on its hands. The whole room laughs with it.
//   21.6–25.6  "Packed: | *novelty socks.*"  THE STARS: "Lost the candle. Won the room."
import { makeSurv, R, box, ink, room, gift, drawBits, sparkles, hearts, label, shadow, bubble, starFrame, confetti,
  pop01, outK, prog, lerp, clamp, ease, INK, BONE, GOLD, PINK, MINT, RED, PINE, INTER } from '../../nhse01/survkit.js'

const ARI = '#ff6b6b'
const GUESTS = [['gemini', 120, 1010], ['libra', 300, 960], ['taurus', 780, 960], ['leo', 960, 1010]]
function guests(x, t, star, mood = 'happy', laughs = []) {
  GUESTS.forEach(([c, gx, gy], i) => star(c, x, t, { x: gx, y: gy, s: 120, mood, seed: i + 3, look: [gx < 540 ? 1 : -1, 0], hops: laughs }))
}
function candle(x, t, cx, cy, s = 1) {
  box(x, cx - 22 * s, cy - 50 * s, 44 * s, 80 * s, '#ff9ec2', { b: 5 })
  R(x, INK, cx - 2, cy - 64 * s, 4, 14 * s)
  const f = 1 + 0.15 * Math.sin(t * 18)
  drawBits(x, ['.Y.', 'YOY', 'YOY', '.Y.'], { Y: GOLD, O: '#ff8a3a' }, cx, cy - 76 * s, 6 * s, { sy: f, outline: null })
}
function sock(x, cx, cy, rot, s = 1) {
  drawBits(x, ['RRRR..', 'WWWW..', 'RRRR..', 'WWWW..', 'RRRRRR', 'WWWWWW', '.RRRRR'], { R: RED, W: BONE }, cx, cy, 10 * s, { rot })
}
function sweatband(x, F) {
  x.save(); x.translate(F.ox, F.cy - F.S * 0.12); R(x, INK, -F.S * 0.25, -F.cell * 2.2, F.S * 0.5, F.cell * 3.2); R(x, '#ff4f6a', -F.S * 0.24, -F.cell * 1.7, F.S * 0.48, F.cell * 2.2); R(x, BONE, -F.S * 0.24, -F.cell * 1.2, F.S * 0.48, F.cell * 0.6); x.restore()
}
function pile(x, k = 1) {
  const C = [['#3fa86a', 140, 110], ['#d24a3c', 120, 90], ['#3a6a8a', 160, 70], ['#8a5aa8', 100, 120], ['#d4a040', 130, 80]]
  C.forEach(([c, w, h], i) => gift(x, 640 + (i % 3) * 140 - (i > 2 ? 70 : 0), 1240 - (i > 2 ? 130 : 0), w * k, h * k, c, { ribbon: i % 2 ? GOLD : BONE }))
}

function act0(x, t, S) {
  const { u, hero, star } = S
  room(x, t, { win: { x: 640, y: 470, w: 260, h: 260 } })
  pile(x)
  const hops = [0.6, 1.2, 1.8]
  const F = starFrame(280, 1130, 260, t, { squash: 0.16, hops })
  shadow(x, 280, 1255, 240)
  hero(x, t, { x: 280, y: 1130, s: 260, mood: u > 3.5 ? 'squint' : 'wide', look: [1, 0.3], squash: 0.16 + 0.02 * Math.sin(t * 20), hops })
  sweatband(x, F)
  // speed lines of pure focus
  for (let i = 0; i < 4; i++) { const p = ((t * 2 + i / 4) % 1); R(x, 'rgba(239,230,214,0.5)', 110 - p * 60, 1060 + i * 30, 50, 6) }
  bubble(x, t, 760, 820, 3.6, 6.5, 'on your marks…', { size: 30, tail: -0.4 })
  void outK
}

function act1(x, t, S) {
  const { u, hero, star } = S
  room(x, t, { win: null })
  const quiet = u > 5.2
  guests(x, t, star, quiet ? 'neutral' : 'happy')
  if (u < 2.6) {
    // the whiteboard: X's and arrows
    box(x, 330, 520, 420, 300, '#f4f4f8', { b: 8 })
    const n = Math.floor(u * 4)
    for (let i = 0; i < Math.min(n, 8); i++) { const px = 380 + (i * 97) % 320, py = 580 + (i * 61) % 200; ink(x, i % 2 ? 'O' : 'X', px, py, { size: 36, col: i % 2 ? '#3a6a8a' : RED, font: INTER, weight: 800 }) }
    if (n > 3) { x.strokeStyle = RED; x.lineWidth = 6; x.beginPath(); x.moveTo(400, 760); x.quadraticCurveTo(540, 560, 700, 700); x.stroke() }
    const F = starFrame(540, 1080, 220, t, { hops: [S.t0 + 0.5, S.t0 + 1.2, S.t0 + 1.9] })
    hero(x, t, { x: 540, y: 1080, s: 220, mood: 'squint', look: [0, -1], hops: [S.t0 + 0.5, S.t0 + 1.2, S.t0 + 1.9] }); sweatband(x, F)
    return
  }
  // the candle: Aries has it… then Taurus has it
  const v = u - 2.6
  const F = starFrame(540, 1080, 220, t, { hops: [S.t0 + 2.7, S.t0 + 4.4] })
  hero(x, t, { x: 540, y: 1080, s: 220, mood: v < 1.5 ? 'happy' : v < 2.6 ? 'wide' : 'neutral', look: v < 1.5 ? [0, -1] : [1, -0.2], hops: [S.t0 + 2.7, S.t0 + 4.4] }); sweatband(x, F)
  const fly = ease.inOutCubic(prog(v, 1.5, 2.0))
  candle(x, t, lerp(540, 780, fly), lerp(880, 880, fly) - 120 * Math.sin(Math.PI * fly))
  if (v > 2.6) { gift(x, 420, 1120, 110, 90, '#8a5aa8', { ribbon: GOLD }) }
  if (quiet) { label(x, '* chirp *', 540, 760, { size: 32, col: '#9fe6b0', alpha: Math.sin(Math.PI * prog(u, 5.2, 6.4)) }) }
}

function act2(x, t, S) {
  const { u, hero, star } = S
  room(x, t, { win: null })
  const laughAt = S.t0 + 4.4
  const laughs = Array.from({ length: 8 }, (_, i) => laughAt + i * 0.35)
  guests(x, t, star, u > 4.4 ? 'happy' : 'neutral', laughs)
  const open = prog(u, 1.4, 1.9)
  const F = starFrame(540, 1080, 230, t, { hops: [S.t0 + 1.4, ...laughs] })
  hero(x, t, { x: 540, y: 1080, s: 230, mood: u < 1.9 ? 'neutral' : u < 3.0 ? 'wide' : 'happy', look: u < 3 ? [0, 1] : undefined, hops: [S.t0 + 1.4, ...laughs] })
  if (u < 3.0) { gift(x, 540, 1230, 140, 90, '#8a5aa8', { ribbon: GOLD, lid: open * 160 }); if (open > 0) { sock(x, 470, 1080 - open * 90, -0.3, 0.8); sock(x, 610, 1080 - open * 90, 0.3, 0.8) } }
  else {
    // socks on its hands (the side points), waving
    const wv = Math.sin(t * 8) * 0.3
    sock(x, F.ox - F.S * 0.42, F.cy - F.S * 0.02 - 20 * Math.abs(Math.sin(t * 8)), -1.1 + wv, 0.9)
    sock(x, F.ox + F.S * 0.42, F.cy - F.S * 0.02 - 20 * Math.abs(Math.cos(t * 8)), 1.1 - wv, 0.9)
    sweatband(x, F)
  }
  if (u > 4.4) ['HA!', 'HAHA', 'HA!', 'ha!'].forEach((s, i) => label(x, s, [140, 300, 780, 950][i], [860, 810, 810, 860][i] - 20 * Math.abs(Math.sin(t * 6 + i)), { size: 34, col: GOLD, font: INTER, weight: 800, alpha: clamp(prog(u, 4.4 + i * 0.15, 4.6 + i * 0.15)) }))
  confetti(x, t, laughAt, 540, 900)
}

function item(x, t, cx, cy, s) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  sock(x, -46, 0, -0.2, 1.4); sock(x, 46, 0, 0.2, 1.4)
  x.restore()
}

const EP = makeSurv({
  id: 'nhse06', ep: 6, hero: 'aries', accent: ARI,
  heads: ['It’s a *gift swap,* | not a final.', 'Swap. | *Swap.* SWAP.', 'Play to | *laugh.*', 'Packed: | *novelty socks.*'],
  headSize: [88, 100, 100, 92],
  acts: [act0, act1, act2],
  line1: { t: 8.95, speaker: '♈︎ ARIES', color: ARI, text: 'nobody touch the candle. I have a *plan*.', close: 12.6 },
  tips: ['play to *laugh*, not to win.', 'the fun is the chaos. *let it go.*'],
  last: 'Lost the candle. *Won* the room.',
  item: { label: 'NOVELTY SOCKS', draw: item },
  pis: [{ x: 960, y: 560, s: 100, noTissues: true }, { x: 960, y: 560, s: 100, noTissues: true }, { x: 950, y: 520, s: 100, noTissues: true, mood: 'happy', tears: 3 }],
  cues: [
    [['tick', 0.6, 0.04], ['tick', 1.2, 0.04], ['tick', 1.8, 0.04], ['pluck', 3.6, 1318.51, 0.035, 0.4, 0.2]],
    [...[0.25, 0.5, 0.75, 1.0, 1.25, 1.5, 1.75, 2.0].map(a => ['tick', a, 0.035]), ['pop', 2.7, 1174.66, 0.04, 0], ['whoosh', 4.1, 0.5, 0.035], ['pop', 4.6, 659.25, 0.045, 0.4], ['pop', 5.2, 987.77, 0.03, -0.3],
      ['pluck', 5.3, 2637, 0.012, 0.1, 0.3], ['pluck', 5.39, 2637, 0.012, 0.1, 0.3], ['pluck', 5.7, 2637, 0.012, 0.1, 0.3], ['pluck', 5.79, 2637, 0.012, 0.1, 0.3]],
    [['tick', 1.4, 0.05], ['pop', 1.6, 880, 0.04, 0], ['pluck', 1.9, 1174.66, 0.04, 0.5, 0], ['pop', 3.0, 1318.51, 0.045, 0], ['pop', 3.1, 1567.98, 0.04, 0], ['clap', 4.4, { gain: 0.14, pan: -0.3 }], ['clap', 4.62, { gain: 0.14, pan: 0.3 }], ['clap', 4.85, { gain: 0.14 }], ['glitter', 4.4, 4.9]],
    [],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [hearts, sparkles, PINE, PINK, MINT, GOLD]
