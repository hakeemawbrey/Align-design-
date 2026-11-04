// nt2e44: MAIN CHARACTER MOMENT, "Catching the train." (20 s vertical, Trends Vol. 2 ep 44, music: cinematic · G)
// Format kit: ../../nt2e41/scenes/mckit.js. Story 0–15.6, then the shared end card.
//   0.0–2.2    hook "*Main character moment:* | running for the train." ♐ Sagittarius mid-sprint, speed lines.
//   2.2–7.6    THE MOVIE "SAGITTARIUS · Last Train Home": the slow-motion dash down the platform.
//   7.3        record scratch.  7.6 card cut.
//   7.6–11.0   REALITY "the doors *close.*": ding-dong, the doors shut in Sag's face; squash.
//   11.0–15.6  the doors slide back open: ♒ Aquarius held them. "got it. hop in."  Sag waves, shy.
//              THE STARS: "Someone held the *door*."
import { makeMC, B } from '../../nt2e41/scenes/mckit.js'
const { R, box, shadow, hearts, bubble, label, lerp, prog, ease, clamp, INK, BONE, GOLD, INTER } = B

const SAG = '#c58cff'
const DX = 640, DW = 300   // the door opening: x DX…DX+DW

function station(x, t, open) {
  R(x, '#272046', 0, 0, 1080, 1920)
  // the tiled back wall
  for (let r = 0; r < 8; r++) for (let c = 0; c < 10; c++) R(x, (r + c) % 2 ? '#2f2754' : '#2b234e', c * 108, 300 + r * 60, 106, 58)
  // a destination board
  box(x, 90, 480, 380, 110, '#14102a', { b: 7 })
  x.font = `700 30px ${B.MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillStyle = '#ffb347'; x.fillText('LAST TRAIN', 120, 518); x.fillText('NOW BOARDING', 120, 558)
  // the platform
  R(x, '#3c3468', 0, 1250, 1080, 670); R(x, '#f2c75c', 0, 1250, 1080, 16); for (let i = 0; i < 12; i++) R(x, INK, i * 96, 1250, 48, 16)
  // the train car
  box(x, 560, 560, 600, 690, '#c9cfe0', { b: 8, hi: '#e2e6f2' })
  R(x, '#4f7cd8', 560, 1060, 600, 40)
  R(x, '#1a1534', DX, 640, DW, 600)                                   // inside, dark
  R(x, 'rgba(255,240,200,0.18)', DX, 640, DW, 600)
  // door halves
  const half = DW / 2, off = open * half
  for (const s of [-1, 1]) {
    const dx = s < 0 ? DX - off : DX + half + off
    box(x, dx, 640, half, 600, '#aeb6cc', { b: 6 }); R(x, '#2a2350', dx + 26, 700, half - 52, 200); R(x, 'rgba(255,255,255,0.25)', dx + 32, 706, 20, 120)
  }
  // a little LED over the door
  R(x, INK, DX + DW / 2 - 40, 600, 80, 30); R(x, open < 0.5 ? '#ff5c6a' : '#5cffa0', DX + DW / 2 - 34, 606, 68, 18)
  void t
}
function speedLines(x, t, cx, cy, n = 6) { for (let i = 0; i < n; i++) { const L = 80 + (i * 37) % 70, yy = cy - 120 + i * 45, xx = cx - 200 - ((t * 900 + i * 60) % 160); R(x, 'rgba(239,230,214,0.6)', xx - L, yy, L, 6) } }

const EP = makeMC({
  id: 'nt2e44', hero: 'sagittarius', date: 'aquarius', accent: SAG, deep: '#7a3fc0',
  moment: 'running *for the train.*',
  title: ['SAGITTARIUS', 'Last Train Home'],
  movieCap: 'slow-mo sprint. *swelling strings.*',
  realCap: 'the doors *close.*',
  bg(x, tm, S, t) {
    const u = t - 7.6
    const open = S.phase === 'hook' || S.phase === 'movie' ? 1 : S.phase === 'real' ? 1 - ease.inOutCubic(prog(u, 0.6, 1.1)) : ease.outCubic(prog(t, 11.0, 11.5))
    station(x, tm, open)
  },
  hook(x, t, S) {
    shadow(x, 260, 1250, 220)
    speedLines(x, t, 260, 1040)
    S.hero(x, t, { x: 260, y: 1050, s: 260, mood: 'wide', look: [1, 0], squash: 0.08 * Math.sin(t * 18), hops: [0.25, 0.6, 0.95, 1.3, 1.65, 2.0] })
  },
  movie(x, tm, S) {
    const p = prog(tm, 2.2, 2.2 + 5.1 * 0.3)
    const hx = lerp(200, 420, p)
    shadow(x, hx, 1250, 220)
    speedLines(x, tm * 0.4, hx, 1040, 4)
    S.hero(x, tm, { x: hx, y: 1050, s: 260, mood: 'sparkle', look: [1, -0.3], hops: [2.25, 2.55, 2.85, 3.15, 3.45, 3.75] })
  },
  real(x, t, S) {
    const u = S.u
    const hx = lerp(420, 520, ease.outCubic(prog(u, 0, 1.0)))
    shadow(x, hx, 1250, 220)
    const bonk = u > 1.15 && u < 1.6
    S.hero(x, t, { x: hx - (bonk ? 20 : 0), y: 1050, s: 260, mood: u > 1.15 ? 'wide' : 'sparkle', look: [1, 0], squash: bonk ? -0.14 : 0, hops: [7.6 + 0.2, 7.6 + 0.5, 7.6 + 0.8] })
    if (u > 0.55 && u < 1.4) label(x, 'ding-dong', 790, 560, { size: 34, col: BONE, alpha: clamp(prog(u, 0.55, 0.7)) })
    if (u > 1.6) bubble(x, t, 400, 780, 9.3, 11.0, 'no no no no…', { size: 34, tail: 0.3 })
  },
  pay(x, t, S) {
    const u = S.u
    const ak = B.pop01(t, 11.25, 0.35, 2.2)
    shadow(x, 470, 1250, 220)
    S.hero(x, t, { x: 470, y: 1050, s: 250, mood: u < 1.0 ? 'wide' : 'happy', blush: u > 1.0 ? 1 : 0, look: [1, 0], hops: [12.3, 12.55, 12.8] })
    if (ak > 0.01) S.date(x, t, { x: DX + DW / 2, y: 1030, s: 240, pop: ak, mood: 'happy', look: [-1, 0], hops: [11.6, 13.0] })
    bubble(x, t, 820, 520, 11.45, 13.6, 'got it. hop in.', { size: 34, tail: 0.2 })
    if (u > 1.2) label(x, '*shy wave*', 380, 820, { size: 30, col: BONE, alpha: clamp(prog(u, 1.2, 1.4)), rot: -0.06 })
    hearts(x, t, 13.0, 620, 880, { n: 5 })
  },
  last: 'Someone held the *door*.',
  cues: {
    hook: [['whoosh', 0.1, 0.4, 0.03], ['tick', 0.25, 0.04], ['tick', 0.6, 0.04], ['tick', 0.95, 0.04], ['tick', 1.3, 0.04], ['tick', 1.65, 0.04]],
    movie: [['glitter', 0.8, 1.6]],
    real: [['bell', 0.55, 659.25, 0.04, 0.8, 0.3], ['bell', 0.8, 523.25, 0.04, 0.9, 0.3], ['whoosh', 0.6, 0.5, 0.03], ['tom', 1.15, 120, { gain: 0.25, decay: 0.2 }], ['tick', 1.15, 0.08]],
    pay: [['whoosh', 0.02, 0.5, 0.03], ['pop', 0.3, 880, 0.04, 0.3], ['pluck', 1.3, 1318.51, 0.03, 0.5, -0.2], ['glitter', 2.0, 2.5]],
  },
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void GOLD; void INTER
