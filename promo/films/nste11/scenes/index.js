// nste11: SINGLE AND THRIVING, Ep 11 "The Friend Dinner" (25 s vertical, Next 30 b33, music: chiptune · C).
// Format kit: ../../nste01/singlekit.js (story 0–20.6, then the shared end card). Rows: promo/films/next30/b33.md.
//   0.0–6.8    hook "No date. | *Twelve* plates." Aquarius setting a long table while its homemade plate-passing gadget
//              slides plates down the line: "who needs a date?" → "I made a SEATING CHART."  Pisces sniffles.
//   6.8        card cut → THE STARS: "friendship is a *real* kind of love." / "and this table is *full* of it."
//   13.6       the friends pop in around the table (Leo, Cancer, Gemini, Taurus), mugs up, a talk card in the middle:
//              "we brought pie!!" → Aquarius: "my favourite people."  Meter fills.
//   17.4       "Aquarius: *thriving.*" Last line: "Love has more than *one* shape."
import { makeSingle, room, stringLights, table, box, R, ink, note, shadow, sparkles, hearts, mug, cardImg, pop01, prog, lerp, ease, T, INK, BONE, MONO } from '../../nste01/singlekit.js'

const HOME = (x, t) => { room(x, t, { wall: '#22344a', wall2: '#1f3044', floor: '#2c3a48', win: null }); stringLights(x, t, -20, 450, 1100, 450, { n: 16, sag: 70 }) }
function plates(x, t, n, { from = 0 } = {}) {
  for (let i = 0; i < n; i++) { const px = 200 + i * 62; if (px > 1000) break; R(x, INK, px - 26, 1238, 52, 16); R(x, BONE, px - 22, 1240, 44, 10) }
  void from
}
function gadget(x, t, u) {
  // a little rail along the table with a claw that slides plates out
  R(x, INK, 140, 1150, 820, 10); R(x, '#7fd0ff', 140, 1152, 820, 6)
  const cx = 160 + ((u * 260) % 800)
  box(x, cx - 24, 1130, 48, 40, '#c9a6ff', { b: 4 }); R(x, INK, cx - 3, 1170, 6, 40)
  R(x, INK, cx - 26, 1208, 52, 14); R(x, BONE, cx - 22, 1210, 44, 8)
}
function chart(x, k = 1) {
  if (k <= 0.01) return
  x.save(); x.translate(860, 720); x.rotate(0.04); x.scale(k, k)
  box(x, -130, -150, 260, 300, BONE, { b: 6 }); ink(x, 'SEATING', 0, -118, { size: 26, font: MONO, weight: 700 })
  for (let i = 0; i < 6; i++) { R(x, '#7fd0ff', -100, -80 + i * 36, 90, 20); R(x, '#ff8fb1', 10, -80 + i * 36, 90, 20) }
  x.restore()
}

function s1(x, t, S) {
  const { u, hero } = S
  HOME(x, t)
  chart(x, 1)
  table(x, 580, 1250, 860, '#6b4a2f')
  plates(x, t, Math.min(12, 6 + Math.floor(u * 1.2)))
  gadget(x, t, u)
  hero(x, t, { x: 240, y: 1070, s: 290, mood: u > 3.8 ? 'sparkle' : 'happy', look: [1, 0], hops: [0.5, 1.0, 3.85, 4.15] })
}
function s2(x, t, S) {
  const { hero } = S
  HOME(x, t)
  x.fillStyle = 'rgba(5,4,12,0.55)'; x.fillRect(0, 420, 1080, 1500)
  hero(x, t, { x: 250, y: 1170, s: 200, mood: t > T.B + 1.6 ? 'happy' : 'neutral', look: [1, -1], hops: [T.A + 0.4, T.B + 1.8] })
  note(x, 790, 1170, 'friendship =|real love', { w: 360, h: 150, col: '#ffe27a', rot: 0.05, size: 40, k: pop01(t, T.A + 1.5, 0.3, 2.4) })
  sparkles(x, t, 790, 1170, T.B + 1.3, 8, 180, 1)
}
const FRIENDS = [['leo', 380, 0.2], ['cancer', 560, 0.35], ['gemini', 740, 0.5], ['taurus', 900, 0.65]]
function s3(x, t, S) {
  const { u, hero, star, img } = S
  HOME(x, t)
  for (const [sg, fx, d] of FRIENDS) {
    const k = pop01(t, S.t0 + d, 0.32, 2.2)
    if (k > 0.01) star(x, t, sg, { x: fx, y: 1110, s: 170, pop: k, mood: 'happy', look: [0, 0], seed: 20 + fx, glyph: false, hops: [S.t0 + d + 0.3, S.t0 + 2.4] })
  }
  table(x, 580, 1250, 860, '#6b4a2f')
  plates(x, t, 12)
  cardImg(x, img('card-talk-3.png'), 640, 1180, 110, { rot: -0.12, k: pop01(t, S.t0 + 1.2, 0.3, 2.2) })
  hero(x, t, { x: 200, y: 1080, s: 240, mood: u > 2.2 ? 'heart' : 'happy', look: [1, 0], hops: [0.4, 2.3, 2.6].map(v => S.t0 + v) })
  for (const [, fx, d] of FRIENDS) { const k = pop01(t, S.t0 + d + 0.5, 0.3, 2.2); if (k > 0.01) mug(x, t, fx + 60, 1150 - 30 * k, { s: 0.6 * k, col: '#e8344e' }) }
  hearts(x, t, S.t0 + 2.3, 200, 940, { n: 6 })
}
function fin(x, t, S) {
  const { hero, ok, u } = S
  shadow(x, 540, 1150, 260 * ok)
  hero(x, t, { x: 540, y: 960, s: 300, pop: ok, mood: u > 1.6 ? 'happy' : 'sparkle', look: [0, 0], hops: [S.t0 + 0.1, S.t0 + 0.6, T.last + 1.5] })
  mug(x, t, 720, 1070, { s: 1.0 * ok, col: '#7fd0ff' })
}

const EP = makeSingle({
  id: 'nste11', sign: 'aquarius', name: 'Aquarius',
  hook: 'No date. | *Twelve* plates.',
  h1: 'This *counts.*', h2: 'Pull up a *chair.*',
  lines: ['friendship is a *real* kind of love.', 'and this table is *full* of it.'],
  last: 'Love has more than *one* shape.',
  images: ['card-talk-3.png'],
  bubbles: [
    { t0: 1.0, t1: 3.6, x: 330, y: 840, text: 'who needs a date?', size: 42, tail: -0.3 },
    { t0: 3.85, t1: 6.6, x: 380, y: 840, text: 'I made a SEATING CHART.', size: 40, tail: -0.4 },
    { t0: 14.4, t1: 15.8, x: 700, y: 900, text: 'we brought pie!!', size: 42, tail: 0 },
    { t0: 15.9, t1: 17.3, x: 330, y: 860, text: 'my favourite people.', size: 40, tail: -0.4, col: '#ffe2c4' },
  ],
  pis1: { x: 960, y: 1610, s: 120 }, pis3: { x: 960, y: 1620, s: 110 },
  s1, s2, s3, fin,
  cues: [...[0, 1, 2, 3, 4].map(i => ['pop', 0.6 + i * 0.83, 1567.98, 0.02, 0.2]), ...[0.2, 0.35, 0.5, 0.65].map((d, i) => ['pop', 13.6 + d + 0.05, [880, 987.77, 1174.66, 1318.51][i], 0.04, -0.3 + i * 0.2]), ['pop', 14.85, 1567.98, 0.04, 0]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [lerp, ease, prog]
