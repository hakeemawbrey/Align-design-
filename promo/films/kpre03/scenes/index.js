// kpre03: PISCES REACTS, "The old couple at the bus stop" (10 s vertical trial reel, star_advice, music: dreamy · F). Loop.
// The look lives in ../../kpre01/scenes/reactkit.js.
//   0.00   frame 0: a snowy bus stop at night; Pisces (right) mid-sob, scarf flapping, tears freezing into icicles; the
//          old couple (Capricorn + Aquarius, knit hats, round glasses, a cane) cuddled up. Hook: "The old couple at the *bus stop.*"
//   0.38   record scratch, freeze · 0.72 rewind · 1.12 Capricorn spots the loose scarf, fixes it · Aquarius: "cold hands."
//          Capricorn: "always." and tucks them in its pocket · they swap one glove each · hearts
//   6.12   Pisces: "THE SCARF." · 6.62 last line "Forty winters. *Still* fixing the scarf." · 9.55 loops into frame 0.
import { makeReact, R, box, shadow, bubble, snow, drawStarChar, signStar, drawBits, sparkles, starFrame, inSprite, prog, clamp, lerp, ease, INK, BONE, GOLD } from '../../kpre01/scenes/reactkit.js'

const CAP = signStar('capricorn'), AQU = signStar('aquarius')
const U = { notice: 0.3, fix: [0.8, 1.7], cold: 2.0, always: 2.8, glove: 3.6, END: 5.0 }

function set(x, c) {
  const g = x.createLinearGradient(0, 0, 0, 1920); g.addColorStop(0, '#141a3a'); g.addColorStop(1, '#2a2a5a'); x.fillStyle = g; x.fillRect(0, 0, 1080, 1920)
  // a street lamp glow
  R(x, INK, 980, 640, 14, 900); box(x, 930, 640, 110, 40, '#ffd27a', { b: 6 })
  x.save(); x.globalCompositeOperation = 'lighter'; const gl = x.createRadialGradient(985, 700, 10, 985, 700, 600); gl.addColorStop(0, 'rgba(255,210,140,0.3)'); gl.addColorStop(1, 'rgba(255,210,140,0)'); x.fillStyle = gl; x.fillRect(380, 0, 700, 1100); x.restore()
  // the shelter
  box(x, 60, 560, 820, 30, '#3a4a6a', { b: 8 }); R(x, 'rgba(255,255,255,0.88)', 60, 548, 820, 14)
  R(x, INK, 70, 590, 14, 900); R(x, INK, 856, 590, 14, 900)
  R(x, 'rgba(160,200,255,0.12)', 84, 590, 772, 520)
  box(x, 600, 640, 220, 70, '#ffd23a', { b: 6 }); x.font = "800 38px Inter"; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('BUS 12', 710, 676)
  // the bench
  box(x, 130, 1080, 640, 30, '#7a5a3a', { b: 6 }); R(x, INK, 170, 1110, 16, 120); R(x, INK, 710, 1110, 16, 120)
  // snow on the ground
  R(x, '#e8eefc', 0, 1450, 1080, 470); R(x, '#cdd6f0', 0, 1450, 1080, 12)
  snow(x, c, 70, { seed: 3, speed: 60 })
}
function oldify(x, c, P, o, hat) {
  const F = starFrame(P.x, P.y, P.s, c, o)
  inSprite(x, F, () => {
    // knit hat
    x.fillStyle = INK; x.fillRect(12, -1.5, 12, 6.5)
    x.fillStyle = hat; x.fillRect(13, -0.5, 10, 5); x.fillStyle = BONE; x.fillRect(13, 3, 10, 1.4); x.fillRect(17, -3, 2, 2)
    // round glasses
    x.fillStyle = INK; for (const ex of [10.5, 25.5]) { x.fillRect(ex - 3, 17, 6, 1); x.fillRect(ex - 3, 22, 6, 1); x.fillRect(ex - 3.5, 17, 1, 6); x.fillRect(ex + 2.5, 17, 1, 6) }
    x.fillRect(13.5, 19, 9, 0.8)
  })
  return F
}
function scarf(x, F, col, tight) {
  const y = F.oy - F.base - F.S / 2 + 27 * F.cell, cx = F.ox
  box(x, cx - F.S * 0.26, y, F.S * 0.52, F.cell * 3, col, { b: 4 })
  const tl = lerp(1, 0.3, tight)
  x.save(); x.translate(cx + F.S * 0.16, y + F.cell * 2); x.rotate(lerp(0.9, 0.2, tight)); box(x, 0, 0, F.cell * 3, F.S * 0.32 * tl + 20, col, { b: 4 }); x.restore()
}
function moment(x, c, u) {
  const tight = ease.inOutCubic(prog(u, ...U.fix)), lean = ease.inOutCubic(prog(u, U.cold, U.cold + 0.6))
  const A = { x: 300 + lean * 30, y: 990, s: 260 }, Q = { x: 560 - lean * 40, y: 990, s: 260 }
  shadow(x, 430, 1125, 520, 0.25)
  const oa = { color: CAP.color, glyph: CAP.glyph, mood: u < U.notice ? 'neutral' : u < U.always ? 'happy' : 'heart', look: [1, 0], seed: 2 }
  drawStarChar(x, A.x, A.y, A.s, c, oa); const FA = oldify(x, c, A, oa, '#5a7ad8')
  const oq = { color: AQU.color, glyph: AQU.glyph, mood: u < U.fix[1] ? 'neutral' : u < U.glove ? 'happy' : 'sparkle', look: [-1, 0], seed: 8, blush: u > U.fix[1] ? 1 : undefined }
  drawStarChar(x, Q.x, Q.y, Q.s, c, oq); const FQ = oldify(x, c, Q, oq, '#d84a6a')
  scarf(x, FQ, '#ff8f5a', tight); scarf(x, FA, '#5fd38a', 1)
  // the cane
  R(x, INK, A.x - 175, 960, 14, 200); R(x, '#a07850', A.x - 172, 963, 8, 194); R(x, INK, A.x - 175, 956, 44, 14)
  // Capricorn's reaching hand-pixels while fixing
  if (u > U.fix[0] && u < U.fix[1] + 0.2) sparkles(x, u, Q.x, FQ.oy - 40, U.fix[1] - 0.1, 8, 110, 1, [GOLD, BONE])
  bubble(x, u, 640, 660, U.cold, U.glove - 0.05, 'cold hands.', { size: 46, tail: -0.3, col: '#dff2ff' })
  bubble(x, u, 260, 700, U.always, U.END + 1, 'always.', { size: 48, tail: 0.2 })
  // one glove each
  const gk = ease.outBack(prog(u, U.glove, U.glove + 0.5))
  if (gk > 0.01) for (const [gx, col] of [[A.x + 120, '#5fd38a'], [Q.x - 120, '#ff8f5a']]) drawBits(x, ['.GG.', 'GGGG', 'GGGG', 'GGG.'], { G: col }, gx, 1060 - 20 * gk, 12 * gk)
  if (u > U.glove + 0.3) for (let i = 0; i < 4; i++) { const ph = (((c * 0.7 + i / 4) % 1) + 1) % 1; drawBits(x, ['.HH.HH.', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: '#ff4f86' }, 430 + Math.sin(ph * 5 + i) * 80, 840 - ph * 200, 7, { alpha: Math.sin(Math.PI * ph) }) }
}
function front(x, c, u) {
  // Pisces's scarf flapping + tiny icicles while it sobs
  const P = { x: 830, y: 1350, s: 380 }, F = starFrame(P.x, P.y, P.s, c, { seed: 6 })
  const y = F.oy - F.base - F.S / 2 + 27 * F.cell
  box(x, F.ox - F.S * 0.26, y, F.S * 0.52, F.cell * 3, '#9fd8ff', { b: 4 })
  x.save(); x.translate(F.ox - F.S * 0.2, y + F.cell); x.rotate(-1.2 - 0.25 * Math.sin(c * 9)); box(x, 0, 0, F.cell * 3, F.S * 0.36, '#9fd8ff', { b: 4 }); x.restore()
  if (u >= U.END) for (const ex of [10.2, 25.2]) { const ix = F.ox + (ex - 18) * F.cell; for (let k = 0; k < 3; k++) { R(x, INK, ix - 8 + k * 6, y - F.cell * 4, 8, 26 - k * 6); R(x, '#dff6ff', ix - 6 + k * 6, y - F.cell * 4, 4, 22 - k * 6) } }
}

const EP = makeReact({
  id: 'kpre03', D: 10, loop: true, END: U.END, accent: '#ffb38f', label: '8 SECONDS EARLIER',
  hook: 'The old couple | at the *bus stop.*',
  set, moment, front,
  pis: { x: 830, y: 1350, s: 380, look: [-1, -0.7] },
  react: [[0, 0, 'neutral'], [U.fix[0], 1, 'wide'], [U.cold, 2, 'wide'], [U.glove, 3, 'sparkle']],
  line: { text: 'THE SCARF.', x: 470, y: 1240, size: 58, col: '#ffe9a8', tail: 0.6 },
  last: 'Forty winters. *Still* fixing the scarf.',
  cues: T => [
    ['pop', T.u(U.notice), 880, 0.03, -0.3], ['whoosh', T.u(U.fix[0]), 0.6, 0.025], ['pluck', T.u(U.fix[1]), 1174.66, 0.035, 0.5, 0],
    ['pop', T.u(U.cold), 987.77, 0.035, 0.2], ['pop', T.u(U.always), 739.99, 0.04, -0.2],
    ['pluck', T.u(U.glove), 1318.51, 0.04, 0.5, 0], ['pluck', T.u(U.glove) + 0.12, 1760, 0.035, 0.5, 0], ['glitter', T.u(U.glove), T.u(U.glove) + 0.5],
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [clamp]
