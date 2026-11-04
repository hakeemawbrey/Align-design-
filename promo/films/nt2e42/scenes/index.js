// nt2e42: MAIN CHARACTER MOMENT, "The window seat." (20 s vertical, Trends Vol. 2 ep 42, music: cinematic · E)
// Format kit: ../../nt2e41/scenes/mckit.js. Story 0–15.6, then the shared end card.
//   0.0–2.2    hook "*Main character moment:* | staring out the bus window." ♋ Cancer pressed to a rainy window.
//   2.2–7.6    THE MOVIE "CANCER · A Window, a Feeling": slow-mo raindrops race down the glass, city lights drift by.
//   7.3        record scratch.  7.6 card cut.
//   7.6–11.0   REALITY "that was *their stop.*": the stop sign whips past; Cancer spins round, too late.
//   11.0–15.6  ♉ Taurus in the next seat: "…that was mine too." They laugh. THE STARS: "Missed the stop. *Met* someone."
import { makeMC, B } from '../../nt2e41/scenes/mckit.js'
const { R, box, rain, shadow, hearts, bubble, label, lerp, prog, ease, clamp, INK, BONE, GOLD } = B

const CANCER = '#9fd8f6'
const WX = 120, WY = 470, WW = 840, WH = 600

// the outside: city blocks drifting past (speed = px/s), lit windows
function outside(x, t, speed) {
  const g = x.createLinearGradient(0, WY, 0, WY + WH); g.addColorStop(0, '#1d1840'); g.addColorStop(1, '#3a2a5e')
  x.fillStyle = g; x.fillRect(WX, WY, WW, WH)
  for (let layer = 0; layer < 2; layer++) {
    const sp = speed * (layer ? 1 : 0.5), base = WY + WH - (layer ? 40 : 120), col = layer ? '#151030' : '#251d48'
    for (let i = 0; i < 9; i++) {
      const bw = 150 + (i * 37) % 90, bh = 180 + (i * 71) % 220
      const bx = WX + ((i * 170 - t * sp) % 1530 + 1530) % 1530 - 300
      R(x, col, bx, base - bh, bw, bh + 200)
      for (let r = 0; r < 6; r++) for (let c = 0; c < 3; c++) if ((i + r * 3 + c) % 3) R(x, layer ? 'rgba(255,214,140,0.55)' : 'rgba(255,214,140,0.3)', bx + 18 + c * 44, base - bh + 20 + r * 40, 20, 18)
    }
  }
}
function bus(x, t, speed, stopAt = null) {
  R(x, '#2b244c', 0, 0, 1080, 1920)
  x.save(); x.beginPath(); x.rect(WX, WY, WW, WH); x.clip()
  outside(x, t, speed)
  if (stopAt !== null) {
    // the bus-stop sign whipping past
    const sx = stopAt
    R(x, INK, sx - 8, WY + 200, 16, 420); box(x, sx - 110, WY + 120, 220, 110, '#3fb08a', { b: 6 })
    x.font = `800 40px ${B.INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = BONE; x.fillText('BUS STOP', sx, WY + 160); x.font = `700 28px ${B.MONO}`; x.fillText('ELM ST', sx, WY + 200)
  }
  rain(x, t, { n: 46, X: WX, Y: WY, W: WW, H: WH, speed: speed > 300 ? 900 : 420, alpha: 0.45 })
  // condensation
  x.fillStyle = 'rgba(200,220,255,0.06)'; x.fillRect(WX, WY, WW, WH)
  x.restore()
  // frame + seats + pole
  box(x, WX - 10, WY - 10, WW + 20, 30, '#5a5185', { b: 6 }); box(x, WX - 10, WY + WH - 20, WW + 20, 30, '#5a5185', { b: 6 })
  R(x, '#3a3264', 0, WY + WH + 10, 1080, 1920)
  for (const sx of [80, 600]) { box(x, sx, 1110, 420, 230, '#3d6fb0', { b: 7, hi: '#5a8fd0' }); box(x, sx + 20, 1330, 380, 70, '#2c5590', { b: 6 }) }
  R(x, INK, 1010, 0, 22, 1500); R(x, '#d8d2ea', 1015, 0, 12, 1500)
}
function droplet(x, cx, cy, k) { if (k <= 0) return; x.save(); x.translate(cx, cy); x.scale(k, k); R(x, INK, -11, -14, 22, 30); R(x, '#bfe0ff', -7, -10, 14, 22); R(x, '#fff', -5, -8, 5, 5); x.restore() }

const EP = makeMC({
  id: 'nt2e42', hero: 'cancer', date: 'taurus', accent: CANCER, deep: '#2f78b0',
  moment: 'staring out *the bus window.*',
  title: ['CANCER', 'A Window, a Feeling'],
  movieCap: 'rain on glass. *deep thoughts.*',
  realCap: 'that was *their stop.*',
  bg(x, tm, S, t) {
    const u = t - 7.6
    const stop = S.phase === 'real' && u > 0.3 && u < 1.5 ? lerp(1100, -200, prog(u, 0.3, 1.4)) : null
    bus(x, tm, S.phase === 'movie' ? 60 : S.phase === 'real' ? 520 : 200, stop)
  },
  hook(x, t, S) {
    S.hero(x, t, { x: 330, y: 960, s: 300, mood: 'sleepy', zzz: false, look: [-1, -0.5], squash: 0.04, hops: [0.9] })
    droplet(x, 520, 640 + (t * 60) % 300, 1)
  },
  movie(x, tm, S) {
    S.hero(x, tm, { x: 330, y: 960, s: 300, mood: 'sleepy', zzz: false, look: [-1, -0.5], hops: [2.6, 3.4] })
    // two raindrops racing (slow-mo)
    const p = prog(tm, 2.2, 3.82)
    droplet(x, 640, lerp(520, 1000, p), 1.3); droplet(x, 760, lerp(520, 1000, p * 0.92), 1.1)
    label(x, 'GO LEFT DROP', 640, 500, { size: 22, col: BONE, alpha: 0.7 })
  },
  real(x, t, S) {
    const u = S.u
    const turn = u > 1.0
    S.hero(x, t, { x: 330 + (turn ? 20 * Math.sin((u - 1) * 30) * Math.exp(-(u - 1) * 5) : 0), y: 960, s: 300, mood: turn ? 'wide' : 'sleepy', zzz: false, look: turn ? [1, 0] : [-1, -0.5], hops: [8.65, 9.6] })
    if (u > 1.1) bubble(x, t, 400, 690, 8.75, 11.0, 'that was my stop.', { size: 34, tail: -0.4 })
    if (u > 0.3 && u < 1.6) label(x, 'WHOOSH', 760, 760, { size: 46, col: GOLD, font: B.INTER, weight: 800, alpha: clamp(prog(u, 0.3, 0.5)) * (1 - prog(u, 1.3, 1.6)), rot: -0.08 })
  },
  pay(x, t, S) {
    const u = S.u
    const dk = B.pop01(t, 11.05, 0.35, 2.2)
    S.hero(x, t, { x: 330, y: 960, s: 280, mood: u < 0.8 ? 'wide' : 'happy', look: [1, 0], hops: [12.1, 12.35, 12.6] })
    if (dk > 0.01) S.date(x, t, { x: 760, y: 960, s: 280, pop: dk, mood: u < 0.8 ? 'neutral' : 'happy', look: [-1, 0], hops: [11.4, 12.2, 12.45, 12.7] })
    bubble(x, t, 720, 700, 11.25, 13.5, '…that was mine too.', { size: 32, tail: 0.3 })
    if (u > 1.1) label(x, 'ha!', 520, 760, { size: 44, col: GOLD, font: B.INTER, weight: 800, rot: -0.15, alpha: clamp(prog(u, 1.1, 1.2)) })
    hearts(x, t, 13.2, 545, 800, { n: 6 })
  },
  last: 'Missed the stop. *Met* someone.',
  cues: {
    hook: [['pluck', 0.9, 1174.66, 0.025, 0.4, -0.2]],
    movie: [['pluck', 0.5, 1318.51, 0.02, 0.8, 0.3], ['pluck', 1.4, 987.77, 0.02, 0.8, -0.3]],
    real: [['whoosh', 0.3, 0.9, 0.05], ['tick', 1.0, 0.08], ['pop', 1.1, 659.25, 0.04, -0.3], ['pop', 1.15, 523.25, 0.03, -0.3]],
    pay: [['pop', 0.08, 880, 0.04, 0.4], ['pop', 1.1, 1318.51, 0.035, 0], ['pop', 1.25, 1567.98, 0.03, 0], ['glitter', 2.2, 2.7]],
  },
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void shadow; void ease
