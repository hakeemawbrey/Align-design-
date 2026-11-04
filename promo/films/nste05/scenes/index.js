// nste05: SINGLE AND THRIVING, Ep 5 "Lights Walk, No Plus-One" (23 s vertical, Next 30 b33, music: pop · E).
// Format kit: ../../nste01/singlekit.js (story 0–20.6, then the short end card). Rows: promo/films/next30/b33.md.
//   0.0–6.8    hook "Lights walk. | *No* plus-one." Leo under a glowing arch of lights on a snowy street, phone up, while
//              two couples pose for each other: "one more! cute!"  Leo: "who takes MY picture?"  Pisces sniffles.
//   6.8        beat cut → THE STARS: "go for the *lights*, not the photo." / "and if you want one, just *ask.*"
//   13.6       Leo asks Sagittarius (also walking solo): "could you take one?" FLASH. Sag: "sure! then me?" They swap
//              phones and laugh. Meter fills.
//   17.4       "Leo: *thriving.*" under the arch. Last line: "Bring yourself. *Glow* anyway."
import { makeSingle, street, stringLights, R, box, note, shadow, sparkles, glow, hearts, pop01, prog, lerp, ease, clamp, T, INK, GOLD } from '../../nste01/singlekit.js'

function arch(x, t, on = 1) {
  // an arch of lights over the path
  x.strokeStyle = INK; x.lineWidth = 14; x.beginPath(); x.arc(540, 1260, 420, Math.PI, 0); x.stroke()
  const cols = [GOLD, '#ff8fb1', '#7fd0ff', '#9fe6b0']
  for (let i = 0; i <= 22; i++) {
    const a = Math.PI + (i / 22) * Math.PI, px = 540 + Math.cos(a) * 420, py = 1260 + Math.sin(a) * 420
    const c = cols[i % 4], tw = on * (0.7 + 0.3 * Math.sin(t * 4 + i))
    x.save(); x.globalCompositeOperation = 'lighter'; glow(x, px, py, 50, 0.3 * tw, '255,226,150'); x.restore()
    R(x, INK, px - 10, py - 10, 20, 20); R(x, c, px - 7, py - 7, 14, 14)
  }
}
function phoneUp(x, cx, cy, rot = 0, flash = 0) {
  x.save(); x.translate(cx, cy); x.rotate(rot)
  R(x, INK, -26, -44, 52, 88); R(x, '#2a2148', -21, -39, 42, 78); R(x, '#7fd0ff', -16, -32, 32, 56)
  if (flash > 0) { x.globalCompositeOperation = 'lighter'; glow(x, 0, -30, 300, 0.7 * flash, '255,255,255') }
  x.restore()
}
const SET = (x, t) => { street(x, t, { groundY: 1420, lamps: [90, 990], houses: true }); arch(x, t) }

function s1(x, t, S) {
  const { u, hero, star } = S
  SET(x, t)
  // two couples posing for each other at the sides
  star(x, t, 'libra', { x: 170, y: 1330, s: 130, mood: 'happy', look: [1, 0], seed: 11, glyph: false })
  star(x, t, 'virgo', { x: 260, y: 1330, s: 130, mood: 'happy', look: [-1, 0], seed: 12, glyph: false })
  star(x, t, 'cancer', { x: 830, y: 1330, s: 130, mood: 'heart', look: [1, 0], seed: 13, glyph: false })
  star(x, t, 'taurus', { x: 920, y: 1330, s: 130, mood: 'happy', look: [-1, 0], seed: 14, glyph: false })
  hero(x, t, { x: 540, y: 1200, s: 290, mood: u > 3.8 ? 'neutral' : 'sparkle', look: u > 3.8 ? [-1, 0.2] : [0.6, -0.8], hops: [0.4, 3.85] })
  phoneUp(x, 680, 1040, 0.2, 0)
}
function s2(x, t, S) {
  const { hero } = S
  SET(x, t)
  x.fillStyle = 'rgba(5,4,12,0.55)'; x.fillRect(0, 0, 1080, 1920)
  hero(x, t, { x: 250, y: 1170, s: 200, mood: t > T.B + 1.6 ? 'happy' : 'neutral', look: [1, -1], hops: [T.A + 0.4, T.B + 1.8] })
  note(x, 790, 1170, 'go for the|LIGHTS', { w: 360, h: 150, col: '#ffe27a', rot: -0.05, size: 40, k: pop01(t, T.A + 1.5, 0.3, 2.4) })
  note(x, 800, 1320, '(then ask)', { w: 260, h: 70, col: '#9fe6b0', rot: 0.04, size: 30, k: pop01(t, T.B + 1.4, 0.3, 2.4) })
}
function s3(x, t, S) {
  const { u, hero, star } = S
  SET(x, t)
  const swap = u > 1.9
  const fl1 = clamp(1 - Math.abs(u - 1.3) / 0.2), fl2 = clamp(1 - Math.abs(u - 2.8) / 0.2)
  hero(x, t, { x: swap ? 360 : 400, y: 1210, s: 270, mood: u > 0.4 && u < 1.6 ? 'sparkle' : 'happy', look: [1, 0], hops: [0.2, 1.35, 3.0, 3.3].map(v => S.t0 + v) })
  star(x, t, 'sagittarius', { x: 790, y: 1230, s: 230, mood: u > 2.9 ? 'happy' : 'sparkle', look: [-1, 0], seed: 15, hops: [0.9, 2.85, 3.1].map(v => S.t0 + v) })
  if (!swap) phoneUp(x, 690, 1080, -0.2, fl1)
  else phoneUp(x, 520, 1060, 0.2, fl2)
  hearts(x, t, S.t0 + 3.0, 580, 1000, { n: 5 })
}
function fin(x, t, S) {
  const { hero, ok, u } = S
  arch(x, t, ok)
  shadow(x, 540, 1150, 260 * ok)
  hero(x, t, { x: 540, y: 960, s: 300, pop: ok, mood: u > 1.6 ? 'happy' : 'sparkle', look: [0, 0], hops: [S.t0 + 0.1, S.t0 + 0.6, T.last + 1.5] })
}

const EP = makeSingle({
  id: 'nste05', sign: 'leo', name: 'Leo',
  hook: 'Lights walk. | *No* plus-one.',
  h1: 'Go *anyway.*', h2: 'Just *ask.*',
  lines: ['go for the *lights*, not the photo.', 'and if you want one, just *ask.*'],
  last: 'Bring yourself. *Glow* anyway.',
  bubbles: [
    { t0: 1.0, t1: 3.6, x: 830, y: 1150, text: 'one more! cute!', size: 38, tail: 0 },
    { t0: 3.85, t1: 6.6, x: 540, y: 940, text: 'who takes MY picture?', size: 42, tail: 0 },
    { t0: 13.85, t1: 15.4, x: 420, y: 950, text: 'could you take one?', size: 40, tail: 0 },
    { t0: 15.5, t1: 17.3, x: 760, y: 970, text: 'sure! then me?', size: 40, tail: 0.1, col: '#ffe2c4' },
  ],
  pis1: { x: 960, y: 1600, s: 120 }, pis3: { x: 960, y: 1620, s: 110 },
  s1, s2, s3, fin,
  cues: [['pop', 14.9, 1760, 0.05, 0.3], ['glitter', 14.9, 15.2], ['pop', 16.4, 1760, 0.05, -0.3], ['glitter', 16.4, 16.7]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [box, sparkles, lerp, ease, stringLights]
