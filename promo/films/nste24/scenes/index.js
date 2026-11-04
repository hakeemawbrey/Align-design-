// nste24: SINGLE AND THRIVING, Ep 24 "The Thriving Party" (25 s vertical, Next 30 b33, music: pop · F). Series finale.
// Format kit: ../../nste01/singlekit.js (story 0–20.6, then the shared end card). Rows: promo/films/next30/b33.md.
// The hero IS Pisces (cfg.pisces): it cries (happily) the whole way through.
//   0.0–6.8    hook "A party for everyone | *thriving.*" Pisces on tiptoe hanging a THRIVING PARTY banner, already in happy
//              tears: "everyone's COMING!!" → "(happy sobbing)"
//   6.8        card cut → THE STARS: "single isn't a *waiting room.*" / "it's a *life.* live it out loud."
//   13.6       the batch's signs pile in one after another (Aries, Taurus, Gemini, Cancer, Leo, Virgo…), everybody
//              dances, confetti: "WE'RE THRIVING!!"  Meter fills.
//   17.4       "Pisces: *thriving.*" under the banner. Last line: "Not waiting. *Living.*"
import { makeSingle, room, stringLights, box, R, ink, note, shadow, sparkles, confetti, pop01, prog, lerp, ease, T, INK, BONE, GOLD, PINK, SKYB, MINT } from '../../nste01/singlekit.js'

function banner(x, t, k = 1, sag = 0) {
  if (k <= 0.01) return
  const letters = 'THRIVING PARTY'.split(''), n = letters.length, x0 = 130, x1 = 950
  x.strokeStyle = INK; x.lineWidth = 5; x.beginPath(); x.moveTo(x0 - 20, 560); x.quadraticCurveTo(540, 560 + 80 + sag, x1 + 20, 560); x.stroke()
  const cols = [PINK, GOLD, SKYB, MINT, '#ffb36b']
  letters.forEach((c, i) => {
    if (c === ' ') return
    const p = (i + 0.5) / n, px = lerp(x0, x1, p), py = 560 + (80 + sag) * 4 * p * (1 - p) * 0.5 + 10
    const kk = Math.min(1, Math.max(0, k * n - i))
    if (kk <= 0.01) return
    x.save(); x.translate(px, py); x.rotate(Math.sin(t * 2 + i) * 0.05); x.scale(kk, kk)
    x.fillStyle = INK; x.beginPath(); x.moveTo(-32, -4); x.lineTo(32, -4); x.lineTo(0, 86); x.closePath(); x.fill()
    x.fillStyle = cols[i % 5]; x.beginPath(); x.moveTo(-26, 0); x.lineTo(26, 0); x.lineTo(0, 76); x.closePath(); x.fill()
    ink(x, c, 0, 24, { size: 30 })
    x.restore()
  })
}
const PARTY = (x, t) => { room(x, t, { wall: '#2c1f4e', wall2: '#271b47', floor: '#3b2948', win: null }); stringLights(x, t, -20, 440, 1100, 450, { n: 16, sag: 50 }) }

function s1(x, t, S) {
  const { u, pisces } = S
  PARTY(x, t)
  banner(x, t, 0.35 + 0.65 * ease.outCubic(prog(u, 0, 2.5)))
  pisces(x, t, { x: 540, y: 1150, s: 290, hops: [0.4, 1.0, 1.6, 3.9] }, u > 3.8 ? 3 : 2, 'happy', [0, -1])
}
function s2(x, t, S) {
  const { pisces } = S
  PARTY(x, t); banner(x, t, 1)
  x.fillStyle = 'rgba(5,4,12,0.5)'; x.fillRect(0, 420, 1080, 1500)
  pisces(x, t, { x: 250, y: 1170, s: 200, hops: [T.A + 0.4, T.B + 1.8] }, 2, t > T.B + 1.6 ? 'happy' : 'sparkle', [1, -1])
  note(x, 790, 1170, 'not a|waiting room', { w: 340, h: 150, col: '#ffe27a', rot: 0.05, size: 40, k: pop01(t, T.A + 1.5, 0.3, 2.4) })
  sparkles(x, t, 790, 1170, T.B + 1.3, 8, 180, 1)
}
const GUESTS = [['aries', 140, 1180], ['taurus', 300, 1240], ['gemini', 460, 1180], ['cancer', 780, 1180], ['leo', 940, 1240], ['virgo', 620, 1260], ['libra', 220, 1350], ['scorpio', 860, 1350]]
function s3(x, t, S) {
  const { u, pisces, star } = S
  PARTY(x, t); banner(x, t, 1)
  const beats = Array.from({ length: 14 }, (_, i) => S.t0 + 1.2 + i * 0.25)
  GUESTS.forEach(([sg, gx, gy], i) => {
    const k = pop01(t, S.t0 + 0.15 + i * 0.12, 0.3, 2.3)
    if (k > 0.01) star(x, t, sg, { x: gx, y: gy, s: 160, pop: k, mood: i % 3 ? 'happy' : 'sparkle', look: [0, 0], seed: 100 + i, glyph: false, hops: beats.slice(i % 2).map(v => v + (i % 3) * 0.04) })
  })
  pisces(x, t, { x: 540, y: 1120, s: 260, hops: beats }, 3, 'happy', [0, 0])
  confetti(x, t, S.t0 + 1.2, 540, 800, { n: 40 })
  confetti(x, t, S.t0 + 2.4, 300, 800, { n: 24 })
}
function fin(x, t, S) {
  const { pisces, ok, u } = S
  banner(x, t, ok)
  shadow(x, 540, 1150, 260 * ok)
  pisces(x, t, { x: 540, y: 960, s: 300, pop: ok, hops: [S.t0 + 0.1, S.t0 + 0.6, T.last + 1.5] }, 3, u > 1.6 ? 'happy' : 'sparkle', [0, 0])
}

const EP = makeSingle({
  id: 'nste24', sign: 'pisces', name: 'Pisces', pisces: true, accent: '#8fe3ff',
  hook: 'A party for everyone | *thriving.*',
  h1: 'This is *living.*', h2: 'Everyone’s *here.*',
  lines: ['single isn’t a *waiting room.*', 'it’s a *life.* live it out loud.'],
  last: 'Not waiting. *Living.*',
  bubbles: [
    { t0: 1.0, t1: 3.6, x: 540, y: 900, text: 'everyone’s COMING!!', size: 44, tail: 0 },
    { t0: 3.85, t1: 6.6, x: 540, y: 900, text: '(happy sobbing)', size: 44, tail: 0 },
    { t0: 15.9, t1: 17.3, x: 540, y: 880, text: 'WE’RE THRIVING!!', size: 46, tail: 0, col: '#ffe2c4' },
  ],
  meter: { x: 490, y: 1620 },
  s1, s2, s3, fin,
  cues: [...GUESTS.map((g, i) => ['pop', +(13.75 + i * 0.12).toFixed(2), [880, 987.77, 1174.66, 1318.51][i % 4], 0.035, (i % 2 ? 0.3 : -0.3)]), ['glitter', 14.8, 15.6], ['glitter', 16.0, 16.6]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [box, R, BONE]
