// nste08: SINGLE AND THRIVING, Ep 8 "Just for the Holidays" (23 s vertical, Next 30 b33, music: cinematic · Dm).
// Format kit: ../../nste01/singlekit.js (story 0–20.6, then the short end card). Rows: promo/films/next30/b33.md.
//   0.0–6.8    hook "“Just for the | *holidays?*”" Scorpio on the couch, squinting at a text: "we could be a thing…" then
//              "just till january?"  Scorpio thinks: "…tempting."  Pisces sniffles.
//   6.8        beat cut → THE STARS: "lonely isn't a *reason* to say yes." / "say what you *actually* want. kindly."
//   13.6       Scorpio types the reply: "I want real, not seasonal. take care!" → "fair! happy holidays."
//              Scorpio sits up taller: "that felt good."  Meter fills.
//   17.4       "Scorpio: *thriving.*" Last line: "Wait for *real*, not *warm.*"
import { makeSingle, room, couch, phone, note, shadow, sparkles, mug, pop01, T } from '../../nste01/singlekit.js'

const HOME = (x, t) => room(x, t, { wall: '#2a1e40', wall2: '#251a3a', floor: '#33263f', win: { x: 120, y: 470, w: 240, h: 260 } })
const MSGS1 = [{ at: -1, side: 'L', text: 'we could be a thing…' }, { at: 1.3, side: 'L', text: 'just till january?' }]
const MSGS3 = [...MSGS1, { at: 14.4, side: 'R', text: 'I want real, not seasonal. take care!' }, { at: 15.6, side: 'L', text: 'fair! happy holidays.' }]

function s1(x, t, S) {
  const { u, hero } = S
  HOME(x, t)
  couch(x, 330, 1430, 440, '#6a2f4a')
  hero(x, t, { x: 320, y: 1220, s: 270, mood: u > 3.8 ? 'squint' : 'neutral', look: [1, -0.2], hops: [1.35, 3.85] })
  phone(x, t, { cx: 750, top: 540, w: 520, h: 700, title: 'someone', msgs: MSGS1, typing: [0.5, 1.25], rot: 0.03, size: 36 })
}
function s2(x, t, S) {
  const { hero } = S
  HOME(x, t)
  x.fillStyle = 'rgba(5,4,12,0.5)'; x.fillRect(0, 420, 1080, 1500)
  hero(x, t, { x: 250, y: 1170, s: 200, mood: t > T.B + 1.6 ? 'happy' : 'neutral', look: [1, -1], hops: [T.A + 0.4, T.B + 1.8] })
  note(x, 790, 1170, 'lonely ≠|a reason', { w: 340, h: 150, col: '#ffe27a', rot: 0.05, size: 42, k: pop01(t, T.A + 1.5, 0.3, 2.4) })
  note(x, 800, 1320, 'say what you want', { w: 330, h: 70, col: '#9fe6b0', rot: -0.04, size: 30, k: pop01(t, T.B + 1.4, 0.3, 2.4) })
}
function s3(x, t, S) {
  const { u, hero } = S
  HOME(x, t)
  couch(x, 330, 1430, 440, '#6a2f4a')
  hero(x, t, { x: 320, y: 1200 - (u > 2.3 ? 20 : 0), s: 280, mood: u > 2.3 ? 'happy' : 'neutral', look: [1, -0.2], hops: [0.6, 2.3, 2.6].map(v => S.t0 + v) })
  phone(x, t, { cx: 750, top: 540, w: 520, h: 700, title: 'someone', msgs: MSGS3, typing: [S.t0 + 0.9, S.t0 + 1.95], rot: 0.03, size: 34 })
  mug(x, t, 520, 1330, { s: 0.85, col: '#6a2f4a' })
  sparkles(x, t, 320, 1150, S.t0 + 2.35, 10, 200, 1)
}
function fin(x, t, S) {
  const { hero, ok, u } = S
  shadow(x, 540, 1150, 260 * ok)
  hero(x, t, { x: 540, y: 960, s: 300, pop: ok, mood: u > 1.6 ? 'happy' : 'sparkle', look: [0, 0], hops: [S.t0 + 0.1, S.t0 + 0.6, T.last + 1.5] })
}

const EP = makeSingle({
  id: 'nste08', sign: 'scorpio', name: 'Scorpio',
  hook: '“Just for the | *holidays?*”',
  h1: 'Cold isn’t a *reason.*', h2: 'Say it *straight.*',
  lines: ['lonely isn’t a *reason* to say yes.', 'say what you *actually* want. kindly.'],
  last: 'Wait for *real*, not *warm.*',
  bubbles: [
    { t0: 3.85, t1: 6.6, x: 330, y: 930, text: '…tempting.', size: 46, tail: 0, think: true },
    { t0: 16.2, t1: 17.3, x: 320, y: 930, text: 'that felt good.', size: 42, tail: 0, col: '#ffe2c4' },
  ],
  pis1: { x: 960, y: 1600, s: 120 }, pis3: { x: 960, y: 1620, s: 110 },
  s1, s2, s3, fin,
  cues: [['pop', 1.3, 659.25, 0.04, 0.3], ['tick', 0.6, 0.02], ['tick', 0.8, 0.02], ['tick', 1.0, 0.02], ...[0, 1, 2, 3, 4, 5, 6].map(i => ['tick', 14.5 + i * 0.13, 0.02]), ['pop', 14.4, 880, 0.045, 0.3], ['pop', 15.6, 659.25, 0.04, 0.3]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
