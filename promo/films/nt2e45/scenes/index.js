// nt2e45: MAIN CHARACTER MOMENT, "Tears in the snow." (20 s vertical, Trends Vol. 2 ep 45, music: cinematic · A)
// Format kit: ../../nt2e41/scenes/mckit.js. Story 0–15.6, then the shared end card. Pisces is the hero here, so the
// cinema seat holds ♋ Cancer (also crying).
//   0.0–2.2    hook "*Main character moment:* | crying in the first snow." ♓ Pisces, lip wobbling, snow falling.
//   2.2–7.6    THE MOVIE "PISCES · Tears in the Snow": one perfect slow-motion tear.
//   7.3        record scratch.  7.6 card cut.
//   7.6–11.0   REALITY "it’s cold. the tears *freeze.*": tiny ice crystals clink onto the path.
//   11.0–15.6  ♏ Scorpio brings a tissue and a cocoa flask: "tissue? cocoa?"  Happy tears.
//              THE STARS: "Even the *tears* got a close-up."
import { makeMC, B } from '../../nt2e41/scenes/mckit.js'
const { R, box, snow, shadow, hearts, bubble, label, tissues, inSprite, starFrame, tearsCells, lerp, prog, ease, clamp, INK, BONE, GOLD, INTER } = B

const PIS = '#8f9cff'

function park(x) {
  R(x, '#2a2350', 0, 1260, 1080, 660); R(x, '#eef0ff', 0, 1250, 1080, 22)
  // bare trees
  for (const [tx, h] of [[110, 520], [980, 600]]) { R(x, INK, tx - 16, 1250 - h, 32, h); R(x, '#4a3a5a', tx - 10, 1250 - h, 20, h); for (let i = 0; i < 3; i++) { x.save(); x.translate(tx, 1250 - h + 60 + i * 90); x.rotate((i % 2 ? 1 : -1) * 0.8); R(x, INK, -6, -110, 12, 110); x.restore() } R(x, '#eef0ff', tx - 20, 1250 - h - 8, 40, 12) }
  // a bench
  box(x, 600, 1120, 380, 26, '#8a6440', { b: 6 }); box(x, 600, 1060, 380, 22, '#8a6440', { b: 6 }); R(x, INK, 630, 1146, 16, 104); R(x, INK, 934, 1146, 16, 104); R(x, '#eef0ff', 600, 1050, 380, 8)
}
// the hero is Pisces: draw with tears
function pis(x, t, o, tears) {
  const opts = { color: B.signStar('pisces').color, glyph: o.s >= 150 ? B.signStar('pisces').glyph : null, seed: 3, glow: 1.1, ...o }
  B.drawStarChar(x, o.x, o.y, o.s, t, opts)
  if (tears) inSprite(x, starFrame(o.x, o.y, o.s, t, opts), () => tearsCells(x, t, tears))
}
function crystal(x, cx, cy, k = 1) { x.save(); x.translate(cx, cy); x.scale(k, k); R(x, INK, -10, -10, 20, 20); R(x, '#d9f4ff', -6, -6, 12, 12); R(x, '#fff', -6, -6, 5, 5); x.restore() }
function flask(x, cx, cy) {
  box(x, cx - 26, cy - 60, 52, 110, '#e8344e', { b: 5, hi: '#ff6b7f' }); box(x, cx - 20, cy - 80, 40, 22, '#c9cfe0', { b: 4 })
  for (let i = 0; i < 3; i++) R(x, 'rgba(255,255,255,0.5)', cx - 14 + i * 12, cy - 110 - (i % 2) * 14, 6, 18)
}

const EP = makeMC({
  id: 'nt2e45', hero: 'pisces', date: 'scorpio', audience: 'cancer', accent: PIS, deep: '#4a56c8',
  moment: 'crying in *the first snow.*',
  title: ['PISCES', 'Tears in the Snow'],
  movieCap: 'one perfect tear. *in slow motion.*',
  realCap: 'it’s cold. the tears *freeze.*',
  bg(x) { park(x) },
  hook(x, t) {
    snow(x, t, { n: 70, speed: 110, seed: 5 })
    shadow(x, 420, 1250, 240)
    pis(x, t, { x: 420, y: 1040, s: 290, mood: 'wide', look: [1, -1], squash: 0.03 * Math.sin(t * 20), hops: [1.0] }, 3)
  },
  movie(x, tm) {
    snow(x, tm, { n: 90, speed: 120, seed: 6, size: 10 })
    shadow(x, 420, 1250, 240)
    pis(x, tm, { x: 420, y: 1040, s: 290, mood: 'sparkle', look: [1, -1], hops: [2.4] }, 0)
    // the one big tear, sliding down in slow motion
    const p = prog(tm, 2.3, 2.3 + 4.8 * 0.3)
    const tx = 372, ty = lerp(1040, 1230, ease.inQuad(p))
    x.save(); x.translate(tx, ty); x.scale(2.2, 2.2); R(x, INK, -12, -18, 24, 34); R(x, '#8fe3ff', -8, -14, 16, 26); R(x, '#fff', -6, -12, 6, 6); x.restore()
    B.sparkles(x, tm, tx, ty, 2.3, 6, 40, 1, ['#8fe3ff', BONE])
  },
  real(x, t, S) {
    const u = S.u
    snow(x, t, { n: 60, speed: 120, seed: 7 })
    shadow(x, 420, 1250, 240)
    pis(x, t, { x: 420, y: 1040, s: 290, mood: u > 1.2 ? 'wide' : 'sparkle', look: u > 1.2 ? [0, 1] : [1, -1], hops: [8.8, 9.7] }, 1)
    // crystals clinking down and bouncing
    for (let i = 0; i < 6; i++) {
      const b0 = 0.4 + i * 0.3, q = u - b0
      if (q < 0) continue
      const y = q < 0.35 ? lerp(1060, 1240, ease.inQuad(q / 0.35)) : 1240 - Math.abs(Math.sin((q - 0.35) * 9)) * 30 * Math.exp(-(q - 0.35) * 4)
      crystal(x, 300 + i * 48 + (i % 2) * 10, y, 1.7)
    }
    if (u > 0.6) label(x, 'clink', 230, 1170, { size: 30, col: '#d9f4ff', alpha: clamp(prog(u, 0.6, 0.7)), rot: -0.1 })
    if (u > 1.2) label(x, 'clink clink', 600, 1190, { size: 30, col: '#d9f4ff', alpha: clamp(prog(u, 1.2, 1.3)), rot: 0.08 })
  },
  pay(x, t, S) {
    const u = S.u
    snow(x, t, { n: 50, speed: 90, seed: 8 })
    const sx = lerp(1200, 700, ease.outCubic(prog(u, 0, 0.8)))
    shadow(x, 420, 1250, 240); shadow(x, sx, 1250, 220)
    pis(x, t, { x: 420, y: 1040, s: 270, mood: u > 0.9 ? 'heart' : 'wide', look: [1, 0], hops: [12.0, 12.9] }, u > 0.9 ? 3 : 1)
    S.date(x, t, { x: sx, y: 1050, s: 240, mood: 'happy', look: [-1, 0], hops: [11.3, 11.6, 13.0] })
    flask(x, sx - 150, 1180); tissues(x, sx + 140, 1200, 80)
    bubble(x, t, 760, 800, 11.3, 13.6, 'tissue? cocoa?', { size: 34, tail: 0.1 })
    hearts(x, t, 12.0, 560, 900, { n: 6 })
  },
  last: 'Even the *tears* got a close-up.',
  cues: {
    hook: [['pluck', 0.6, 987.77, 0.025, 0.6, 0], ['pluck', 1.0, 880, 0.025, 0.6, 0]],
    movie: [['bell', 0.3, 1760, 0.02, 2.5, -0.2], ['glitter', 0.3, 1.2]],
    real: [0.4, 0.7, 1.0, 1.3, 1.6, 1.9].map((b, i) => ['pluck', b + 0.35, [2349.32, 2637.02, 2093.0, 2793.83, 2349.32, 3135.96][i], 0.03, 0.15, (i % 2 ? 0.3 : -0.3)]),
    pay: [['whoosh', 0.05, 0.5, 0.03], ['pop', 0.3, 880, 0.04, 0.3], ['glitter', 0.9, 1.5], ['pluck', 1.9, 1318.51, 0.03, 0.5, 0]],
  },
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void GOLD; void INTER
