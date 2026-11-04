// nste10: SINGLE AND THRIVING, Ep 10 "You Can Cover, Right?" (25 s vertical, Next 30 b33, music: lofi · Cm).
// Format kit: ../../nste01/singlekit.js (story 0–20.6, then the shared end card). Rows: promo/films/next30/b33.md.
//   0.0–6.8    hook "“You're single, so | *you* can cover?”" Capricorn at its desk under a December wall calendar already
//              plastered with COVER notes; Aries leans over the divider: "no plans, right?"  Capricorn: "…sure. always."
//   6.8        card cut → THE STARS: "single doesn't mean your time is *spare.*" / "your plans count. even *solo* ones."
//   13.6       Capricorn: "I have plans that day. I can do the 23rd."  One COVER note flies off, a MINE ♡ note slaps on.
//              Aries: "totally fair! thanks!"  Meter fills.
//   17.4       "Capricorn: *thriving.*" Last line: "Your day off is *yours.*"
import { makeSingle, room, box, R, ink, note, shadow, sparkles, mug, pop01, prog, lerp, ease, T, INK, BONE, MONO } from '../../nste01/singlekit.js'

const OFFICE = (x, t) => room(x, t, { wall: '#29304a', wall2: '#252c44', floor: '#323846', win: null })
// a December wall calendar: 5 rows × 7; cover = list of cells with COVER notes; mine = the MINE cell
function calendar(x, t, { cover = [], mine = null, mineK = 0, flyK = 0, fly = null } = {}) {
  const X = 560, Y = 470, W = 440, H = 400, cw = W / 7, ch = (H - 60) / 5
  box(x, X, Y, W, H, BONE, { b: 6 }); R(x, '#e8344e', X, Y, W, 56); ink(x, 'DECEMBER', X + W / 2, Y + 29, { size: 30, col: BONE, font: MONO, weight: 700 })
  for (let i = 0; i < 35; i++) {
    const cx = X + (i % 7) * cw, cy = Y + 60 + Math.floor(i / 7) * ch
    R(x, '#d9d0bc', cx, cy, 2, ch); R(x, '#d9d0bc', cx, cy, cw, 2)
    if (i < 31) ink(x, String(i + 1), cx + 14, cy + 14, { size: 14, col: '#8a8070', font: MONO, weight: 700 })
  }
  for (const i of cover) {
    if (i === fly && flyK > 0) continue
    const cx = X + (i % 7) * cw + cw / 2, cy = Y + 60 + Math.floor(i / 7) * ch + ch / 2
    note(x, cx, cy, 'COVER', { w: cw - 6, h: ch - 10, col: '#ffe27a', rot: ((i * 7) % 5 - 2) * 0.04, size: 14 })
  }
  if (fly !== null && flyK > 0 && flyK < 1) {
    const i = fly, cx = X + (i % 7) * cw + cw / 2, cy = Y + 60 + Math.floor(i / 7) * ch + ch / 2
    note(x, cx - 500 * flyK, cy - 200 * Math.sin(Math.PI * flyK), 'COVER', { w: cw - 6, h: ch - 10, col: '#ffe27a', rot: -6 * flyK, size: 14 })
  }
  if (mine !== null && mineK > 0.01) {
    const i = mine, cx = X + (i % 7) * cw + cw / 2, cy = Y + 60 + Math.floor(i / 7) * ch + ch / 2
    note(x, cx, cy, 'MINE ♡', { w: cw + 20, h: ch + 6, col: '#ff8fb1', rot: -0.08, size: 15, k: mineK })
  }
}
function desk(x) { box(x, 120, 1280, 840, 40, '#5a4a3a', { b: 6, hi: '#6e5c48' }); R(x, INK, 150, 1326, 24, 120); R(x, INK, 900, 1326, 24, 120); box(x, 640, 1130, 220, 150, '#2a2148', { b: 6 }); R(x, '#7fd0ff', 652, 1142, 196, 120) }
const COVER = [3, 5, 9, 12, 16, 19, 21, 22, 24, 26, 29]

function s1(x, t, S) {
  const { u, hero, star } = S
  OFFICE(x, t)
  calendar(x, t, { cover: COVER })
  // the divider + Aries leaning over it
  star(x, t, 'aries', { x: 220, y: 900, s: 200, mood: u > 3.8 ? 'happy' : 'sparkle', look: [1, 0.6], hops: [0.9, 1.3], seed: 9 })
  box(x, 60, 980, 330, 300, '#4a5470', { b: 6 })
  desk(x)
  hero(x, t, { x: 470, y: 1170, s: 260, mood: u > 3.8 ? 'neutral' : 'neutral', look: u > 3.8 ? [0.6, 1] : [-1, -0.6], hops: [3.85], squash: u > 3.8 ? 0.06 : 0 })
  mug(x, t, 290, 1280, { s: 0.8, col: '#4f7cd8' })
}
function s2(x, t, S) {
  const { hero } = S
  OFFICE(x, t); calendar(x, t, { cover: COVER })
  x.fillStyle = 'rgba(5,4,12,0.55)'; x.fillRect(0, 420, 1080, 1500)
  hero(x, t, { x: 250, y: 1170, s: 200, mood: t > T.B + 1.6 ? 'happy' : 'neutral', look: [1, -1], hops: [T.A + 0.4, T.B + 1.8] })
  note(x, 790, 1170, 'your plans|COUNT', { w: 340, h: 150, col: '#ffe27a', rot: 0.05, size: 42, k: pop01(t, T.A + 1.5, 0.3, 2.4) })
  sparkles(x, t, 790, 1170, T.B + 1.3, 8, 180, 1)
}
function s3(x, t, S) {
  const { u, hero, star } = S
  OFFICE(x, t)
  calendar(x, t, { cover: COVER, fly: 24, flyK: prog(u, 1.4, 2.2), mine: 24, mineK: pop01(t, S.t0 + 2.2, 0.3, 2.6) })
  sparkles(x, t, 560 + (24 % 7 + 0.5) * 440 / 7, 530 + (Math.floor(24 / 7) + 0.5) * 68, S.t0 + 2.25, 8, 90, 1)
  star(x, t, 'aries', { x: 220, y: 900, s: 200, mood: u > 2.2 ? 'happy' : 'neutral', look: [1, 0.6], hops: [2.3, 2.6].map(v => S.t0 + v), seed: 9 })
  box(x, 60, 980, 330, 300, '#4a5470', { b: 6 })
  desk(x)
  hero(x, t, { x: 470, y: 1160, s: 270, mood: u > 2.2 ? 'happy' : 'neutral', look: [-1, -0.6], hops: [0.3, 0.6, 2.25].map(v => S.t0 + v) })
  mug(x, t, 290, 1280, { s: 0.8, col: '#4f7cd8' })
}
function fin(x, t, S) {
  const { hero, ok, u } = S
  shadow(x, 540, 1150, 260 * ok)
  hero(x, t, { x: 540, y: 960, s: 300, pop: ok, mood: u > 1.6 ? 'happy' : 'sparkle', look: [0, 0], hops: [S.t0 + 0.1, S.t0 + 0.6, T.last + 1.5] })
  note(x, 790, 760, 'MINE ♡', { w: 170, h: 90, col: '#ff8fb1', rot: 0.1, size: 30, k: ok })
}

const EP = makeSingle({
  id: 'nste10', sign: 'capricorn', name: 'Capricorn',
  hook: '“You’re single, so | *you* can cover?”',
  h1: 'Your time *counts.*', h2: 'Say it *kindly.*',
  lines: ['single doesn’t mean your time is *spare.*', 'your plans count. even *solo* ones.'],
  last: 'Your day off is *yours.*',
  bubbles: [
    { t0: 1.0, t1: 3.6, x: 300, y: 720, text: 'no plans, right?', size: 42, tail: -0.3 },
    { t0: 3.85, t1: 6.6, x: 470, y: 920, text: '…sure. always.', size: 42, tail: 0 },
    { t0: 13.85, t1: 15.75, x: 520, y: 920, text: 'I have plans that day. I can do the 23rd.', size: 34, tail: -0.1 },
    { t0: 15.85, t1: 17.3, x: 300, y: 720, text: 'totally fair! thanks!', size: 40, tail: -0.3, col: '#ffe2c4' },
  ],
  pis1: { x: 970, y: 1620, s: 110 }, pis3: { x: 970, y: 1630, s: 100 },
  meter: { x: 450, y: 1600 },
  s1, s2, s3, fin,
  cues: [['whoosh', 15.0, 0.4, 0.03], ['pop', 15.8, 1318.51, 0.05, 0.3], ['tick', 15.82, 0.06]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [lerp, ease]
