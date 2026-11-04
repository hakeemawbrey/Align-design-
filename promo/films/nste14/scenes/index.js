// nste14: SINGLE AND THRIVING, Ep 14 "A Gift for Me" (23 s vertical, Next 30 b33, music: jazzy · Ab).
// Format kit: ../../nste01/singlekit.js (story 0–20.6, then the short end card). Rows: promo/films/next30/b33.md.
//   0.0–6.8    hook "Wrapping a gift… | *for me.*" Taurus at a snowy market stall, holding up a soft striped scarf against
//              itself: "it's for a friend." → thinks "(it's me.)"  Pisces sniffles.
//   6.8        beat cut → THE STARS: "you're allowed to *treat* you too." / "small, kind, *in budget.* wrap it."
//   13.6       at home: the scarf goes in a box, the bow grows HUGE ("the BIGGEST bow."), Taurus opens it and puts the
//              scarf on: "for me? I love it."  Meter fills.
//   17.4       "Taurus: *thriving.*" in the scarf. Last line: "Yes, you get a *bow* too."
import { makeSingle, street, room, box, R, ink, note, gift, shadow, sparkles, hearts, starFrame, inSprite, scarfCells, drawStarChar, signStar, pop01, prog, lerp, ease, clamp, T, INK, BONE, GOLD } from '../../nste01/singlekit.js'

const TAU = signStar('taurus')
function scarf(x, cx, cy, rot = 0, k = 1) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  R(x, INK, -34, -150, 68, 300)
  for (let i = 0; i < 10; i++) R(x, i % 2 ? '#e8344e' : BONE, -30, -146 + i * 29.6, 60, 29.6)
  for (let i = 0; i < 5; i++) { R(x, INK, -30 + i * 13, 150, 6, 30); R(x, '#e8344e', -29 + i * 13, 150, 4, 28) }
  x.restore()
}
function stall(x) {
  box(x, 520, 900, 520, 360, '#6b4a2f', { b: 7 })
  for (let i = 0; i < 8; i++) R(x, i % 2 ? '#e8344e' : BONE, 500 + i * 70, 840, 70, 70)
  R(x, INK, 500, 906, 560, 10)
  for (const [px, c] of [[600, '#7fd0ff'], [700, '#9fe6b0'], [800, '#ffd23a'], [900, '#c9a6ff']]) { R(x, INK, px - 24, 1020, 48, 120); R(x, c, px - 20, 1024, 40, 112) }
  box(x, 520, 1180, 520, 40, '#8a6440', { b: 6 })
}
function tauWithScarf(x, t, o) {
  drawStarChar(x, o.x, o.y, o.s, t, { color: TAU.color, glyph: o.s >= 150 ? TAU.glyph : null, seed: 3, glow: 1.1, ...o })
  const F = starFrame(o.x, o.y, o.s, t, o)
  inSprite(x, F, () => scarfCells(x, '#e8344e', BONE))
}

function s1(x, t, S) {
  const { u, hero } = S
  street(x, t, { groundY: 1420, lamps: [90], houses: true })
  stall(x)
  hero(x, t, { x: 330, y: 1220, s: 290, mood: u > 3.8 ? 'wink' : 'sparkle', look: [-0.2, 0], hops: [0.4, 3.85] })
  scarf(x, 470, 1180, 0.25 + 0.06 * Math.sin(u * 3))
}
function s2(x, t, S) {
  const { hero } = S
  street(x, t, { groundY: 1420, lamps: [90], houses: true }); stall(x)
  x.fillStyle = 'rgba(5,4,12,0.55)'; x.fillRect(0, 0, 1080, 1920)
  hero(x, t, { x: 250, y: 1170, s: 200, mood: t > T.B + 1.6 ? 'happy' : 'neutral', look: [1, -1], hops: [T.A + 0.4, T.B + 1.8] })
  note(x, 790, 1170, 'treat you|too', { w: 300, h: 150, col: '#ffe27a', rot: 0.05, size: 44, k: pop01(t, T.A + 1.5, 0.3, 2.4) })
  note(x, 800, 1320, 'small · kind · in budget', { w: 400, h: 70, col: '#9fe6b0', rot: -0.04, size: 28, k: pop01(t, T.B + 1.4, 0.3, 2.4) })
}
function s3(x, t, S) {
  const { u, hero } = S
  room(x, t, { wall: '#2e2350', wall2: '#281f48', floor: '#3a2c4e', win: { x: 120, y: 480, w: 240, h: 260 } })
  box(x, 360, 1290, 600, 34, '#6b4a2f', { b: 6, hi: '#8a6440' })
  const open = clamp(prog(u, 1.7, 2.1))
  const bow = 1 + 1.4 * ease.outBack(prog(u, 0.5, 1.2))
  if (open < 1) gift(x, 760, 1285 - 40 * open, { w: 200, h: 150, col: '#3fb08a', rib: GOLD, bow: bow * (1 - open) })
  if (u > 1.7 && u < 2.5) { const k = prog(u, 1.7, 2.3); scarf(x, lerp(760, 470, k), lerp(1150, 1060, k), lerp(0.5, 0, k), 0.8) }
  if (u < 2.4) hero(x, t, { x: 420, y: 1160, s: 280, mood: u < 1.7 ? 'sparkle' : 'wide', look: [1, 0.3], hops: [0.6, 1.2, 1.8].map(v => S.t0 + v) })
  else tauWithScarf(x, t, { x: 420, y: 1160, s: 280, mood: 'happy', look: [0, 0], hops: [2.45, 2.8, 3.1].map(v => S.t0 + v) })
  sparkles(x, t, 420, 1100, S.t0 + 2.45, 10, 200, 1)
  hearts(x, t, S.t0 + 2.5, 420, 960, { n: 5 })
}
function fin(x, t, S) {
  const { ok, u } = S
  shadow(x, 540, 1150, 260 * ok)
  tauWithScarf(x, t, { x: 540, y: 960, s: 300, pop: ok, mood: u > 1.6 ? 'happy' : 'sparkle', look: [0, 0], hops: [S.t0 + 0.1, S.t0 + 0.6, T.last + 1.5] })
  gift(x, 790, 1120, { w: 120 * ok, h: 90 * ok, col: '#3fb08a', rib: GOLD, bow: 1.4 * ok })
}

const EP = makeSingle({
  id: 'nste14', sign: 'taurus', name: 'Taurus',
  hook: 'Wrapping a gift… | *for me.*',
  h1: 'You’re *on the list.*', h2: 'Biggest *bow.*',
  lines: ['you’re allowed to *treat* you too.', 'small, kind, *in budget.* wrap it.'],
  last: 'Yes, you get a *bow* too.',
  bubbles: [
    { t0: 1.0, t1: 3.6, x: 330, y: 960, text: 'it’s for a friend.', size: 42, tail: 0 },
    { t0: 3.85, t1: 6.6, x: 330, y: 960, text: '(it’s me.)', size: 46, tail: 0, think: true },
    { t0: 14.1, t1: 15.5, x: 760, y: 900, text: 'the BIGGEST bow.', size: 42, tail: 0 },
    { t0: 16.0, t1: 17.3, x: 420, y: 900, text: 'for me? I love it.', size: 42, tail: 0, col: '#ffe2c4' },
  ],
  pis1: { x: 960, y: 1610, s: 120 }, pis3: { x: 970, y: 1630, s: 110 },
  meter: { x: 450, y: 1620 },
  s1, s2, s3, fin,
  cues: [['riser', 14.1, 14.8, 0.02], ['pop', 14.8, 1318.51, 0.045, 0.3], ['whoosh', 15.3, 0.3, 0.03], ['pop', 15.65, 1567.98, 0.04, 0], ['glitter', 16.05, 16.4]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [ink, hero => hero]
