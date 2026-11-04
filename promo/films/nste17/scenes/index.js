// nste17: SINGLE AND THRIVING, Ep 17 "No Dance Partner" (23 s vertical, Next 30 b33, music: house · A).
// Format kit: ../../nste01/singlekit.js (story 0–20.6, then the short end card). Rows: promo/films/next30/b33.md.
//   0.0–6.8    hook "Slow song. | *No* partner." The holiday party's glowing dance floor, two couples swaying slowly;
//              Leo at the edge with a mug: "everyone has someone…" → "I'll just… hold my mug."  Pisces sniffles.
//   6.8        beat cut → THE STARS: "the dance floor takes *singles.*" / "dance with your *friends.* or the beat."
//   13.6       Leo sets the mug down and dances; Gemini and Sagittarius bounce in and it becomes a dance circle:
//              "okay, okay!" → "DANCE CIRCLE!!"  Meter fills.
//   17.4       "Leo: *thriving.*" Last line: "Dance like the song is *yours.*"
import { makeSingle, room, stringLights, R, note, shadow, sparkles, mug, confetti, glow, pop01, prog, lerp, ease, T, INK, GOLD, PINK, SKYB } from '../../nste01/singlekit.js'

function floor(x, t, beat = 0) {
  room(x, t, { wall: '#24183f', wall2: '#20153a', floor: '#2a1d44', win: null })
  stringLights(x, t, -20, 440, 560, 480, { n: 9, sag: 60 }); stringLights(x, t, 520, 480, 1100, 440, { n: 9, sag: 60 })
  const cols = [GOLD, PINK, SKYB, '#9fe6b0']
  for (let j = 0; j < 4; j++) for (let i = 0; i < 8; i++) {
    const on = ((i + j + Math.floor(t * (beat ? 4 : 1.5))) % 4)
    const px = i * 135, py = 1430 + j * 70
    R(x, INK, px, py, 135, 70); R(x, on === 0 ? cols[(i + j) % 4] : '#3a2a5a', px + 4, py + 4, 127, 62)
  }
  // a little disco ball
  R(x, INK, 538, 420, 4, 80); x.fillStyle = INK; x.beginPath(); x.arc(540, 540, 48, 0, Math.PI * 2); x.fill()
  for (let i = 0; i < 6; i++) for (let j = 0; j < 6; j++) { const dx = -36 + i * 13, dy = -36 + j * 13; if (dx * dx + dy * dy < 1600) R(x, (i + j + Math.floor(t * 6)) % 3 ? '#c9c2d8' : '#ffffff', 540 + dx, 540 + dy, 11, 11) }
  if (beat) { x.save(); x.globalCompositeOperation = 'lighter'; glow(x, 540, 540, 600, 0.12 + 0.06 * Math.sin(t * 12), '255,200,255'); x.restore() }
}

function s1(x, t, S) {
  const { u, hero, star } = S
  floor(x, t)
  const sway = Math.sin(u * 2.2) * 14
  star(x, t, 'libra', { x: 560 + sway, y: 1300, s: 150, mood: 'heart', look: [1, 0], seed: 61, glyph: false })
  star(x, t, 'cancer', { x: 660 + sway, y: 1300, s: 150, mood: 'happy', look: [-1, 0], seed: 62, glyph: false })
  star(x, t, 'virgo', { x: 830 - sway, y: 1300, s: 150, mood: 'happy', look: [1, 0], seed: 63, glyph: false })
  star(x, t, 'taurus', { x: 930 - sway, y: 1300, s: 150, mood: 'heart', look: [-1, 0], seed: 64, glyph: false })
  hero(x, t, { x: 230, y: 1220, s: 270, mood: u > 3.8 ? 'neutral' : 'sparkle', look: u > 3.8 ? [0.4, 1] : [1, 0], hops: [3.85] })
  mug(x, t, 370, 1290, { s: 1 })
}
function s2(x, t, S) {
  const { hero } = S
  floor(x, t)
  x.fillStyle = 'rgba(5,4,12,0.55)'; x.fillRect(0, 420, 1080, 1500)
  hero(x, t, { x: 250, y: 1170, s: 200, mood: t > T.B + 1.6 ? 'happy' : 'neutral', look: [1, -1], hops: [T.A + 0.4, T.B + 1.8] })
  mug(x, t, 360, 1240, { s: 0.8 })
  note(x, 790, 1170, 'the floor|takes singles', { w: 360, h: 150, col: '#ffe27a', rot: 0.05, size: 40, k: pop01(t, T.A + 1.5, 0.3, 2.4) })
  sparkles(x, t, 790, 1170, T.B + 1.3, 8, 180, 1)
}
function s3(x, t, S) {
  const { u, hero, star } = S
  floor(x, t, 1)
  const beats = Array.from({ length: 16 }, (_, i) => S.t0 + 0.4 + i * 0.235)
  hero(x, t, { x: 540, y: 1230, s: 270, mood: 'happy', look: [0, 0], hops: beats, squash: 0.04 * Math.sin(u * 13) })
  mug(x, t, 140, 1420, { s: 0.8 })
  const gk = pop01(t, S.t0 + 1.4, 0.32, 2.2), sk = pop01(t, S.t0 + 1.7, 0.32, 2.2)
  if (gk > 0.01) star(x, t, 'gemini', { x: 270, y: 1260, s: 200, pop: gk, mood: 'happy', look: [1, 0], seed: 65, hops: beats.slice(5).map(v => v + 0.1) })
  if (sk > 0.01) star(x, t, 'sagittarius', { x: 810, y: 1260, s: 200, pop: sk, mood: 'sparkle', look: [-1, 0], seed: 66, hops: beats.slice(6).map(v => v + 0.05) })
  confetti(x, t, S.t0 + 1.9, 540, 900)
}
function fin(x, t, S) {
  const { hero, ok, u } = S
  shadow(x, 540, 1150, 260 * ok)
  hero(x, t, { x: 540, y: 960, s: 300, pop: ok, mood: u > 1.6 ? 'happy' : 'sparkle', look: [0, 0], hops: [S.t0 + 0.1, S.t0 + 0.6, S.t0 + 1.1, T.last + 1.5] })
}

const EP = makeSingle({
  id: 'nste17', sign: 'leo', name: 'Leo',
  hook: 'Slow song. | *No* partner.',
  h1: 'Partner *optional.*', h2: 'Dance *anyway.*',
  lines: ['the dance floor takes *singles.*', 'dance with your *friends.* or the beat.'],
  last: 'Dance like the song is *yours.*',
  bubbles: [
    { t0: 1.0, t1: 3.6, x: 280, y: 1000, text: 'everyone has someone…', size: 40, tail: -0.2 },
    { t0: 3.85, t1: 6.6, x: 280, y: 1000, text: 'I’ll just… hold my mug.', size: 40, tail: -0.2 },
    { t0: 14.0, t1: 15.2, x: 540, y: 1000, text: 'okay, okay!', size: 44, tail: 0 },
    { t0: 15.6, t1: 17.3, x: 360, y: 1050, text: 'DANCE CIRCLE!!', size: 44, tail: -0.3, col: '#ffe2c4' },
  ],
  pis1: { x: 960, y: 1640, s: 110 }, pis3: { x: 960, y: 1650, s: 100 },
  meter: { x: 490, y: 860 },
  s1, s2, s3, fin,
  cues: [['pop', 15.0, 1174.66, 0.04, -0.3], ['pop', 15.3, 1318.51, 0.04, 0.3], ['glitter', 15.5, 16.4]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [lerp, ease, prog]
