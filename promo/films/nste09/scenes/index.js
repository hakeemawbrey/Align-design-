// nste09: SINGLE AND THRIVING, Ep 9 "Nobody Could Come" (25 s vertical, Next 30 b33, music: funk · A).
// Format kit: ../../nste01/singlekit.js (story 0–20.6, then the shared end card). Rows: promo/films/next30/b33.md.
//   0.0–6.8    hook "Everyone bailed. | *Go anyway?*" Sagittarius at the door with a backpack half on while the group
//              chat buzzes: "can't, sorry!" "next time!!" "so busy this week".  Sag: "…I'll just stay home."
//   6.8        card cut → THE STARS: "you're *good* company too." / "go see it. *share* it after."
//   13.6       a cabin window full of snowy pines and stars; Sag with cocoa snaps the view: "look at THIS." The chat:
//              "WOW" "ok next time I'm COMING". Hearts. Meter fills.
//   17.4       "Sagittarius: *thriving.*" Last line: "Go. *Send* the view."
import { makeSingle, room, box, R, phone, note, shadow, sparkles, hearts, mug, snow, glow, pop01, prog, lerp, ease, T, INK, BONE } from '../../nste01/singlekit.js'

const HOME = (x, t) => room(x, t, { wall: '#2b2148', wall2: '#261d42', floor: '#352a48', win: null })
function backpack(x, cx, cy, k = 1, rot = 0) {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  box(x, -60, -80, 120, 150, '#3fb08a', { b: 6, hi: 'rgba(255,255,255,0.2)' }); box(x, -44, 0, 88, 50, '#2f8a6a', { b: 5 }); R(x, INK, -8, -100, 16, 22)
  x.restore()
}
function door(x) { box(x, 760, 760, 240, 660, '#6b4a2f', { b: 7, hi: '#8a6440' }); R(x, '#f2c75c', 960, 1080, 20, 20) }
function cabinWindow(x, t) {
  box(x, 90, 470, 900, 760, '#0f0b28', { b: 12 })
  R(x, '#141040', 90, 470, 900, 760)
  for (let i = 0; i < 16; i++) R(x, i % 3 ? BONE : '#f2c75c', 120 + ((i * 131) % 860), 500 + ((i * 71) % 300), 6, 6)
  // snowy hills + pines
  x.fillStyle = '#cfcbe6'; x.beginPath(); x.moveTo(90, 1000); x.quadraticCurveTo(400, 820, 700, 960); x.quadraticCurveTo(860, 900, 990, 950); x.lineTo(990, 1230); x.lineTo(90, 1230); x.fill()
  for (const [px, s] of [[180, 1], [300, 0.8], [620, 1.1], [760, 0.9], [880, 1]]) { x.fillStyle = '#1f5a46'; x.beginPath(); x.moveTo(px, 1000 - 160 * s); x.lineTo(px + 60 * s, 1040); x.lineTo(px - 60 * s, 1040); x.fill() }
  snow(x, t, { X: 90, Y: 470, w: 900, h: 760, n: 40, seed: 4 })
  R(x, INK, 532, 470, 16, 760); R(x, '#6b4a2f', 60, 1230, 960, 40)
}

function s1(x, t, S) {
  const { u, hero } = S
  HOME(x, t)
  door(x)
  backpack(x, 470, 1130, 1, u > 3.8 ? 0.5 : 0.15)
  hero(x, t, { x: 380, y: 1200, s: 270, mood: u > 3.8 ? 'neutral' : 'sparkle', look: u > 3.8 ? [0.8, 1] : [1, -0.5], hops: [0.3, 3.85] })
  phone(x, t, { cx: 650, top: 480, w: 420, h: 540, title: 'the trip', msgs: [{ at: -1, side: 'L', text: 'can’t, sorry!' }, { at: 1.6, side: 'L', text: 'next time!!' }, { at: 2.3, side: 'L', text: 'so busy this week' }], rot: -0.05, size: 32 })
}
function s2(x, t, S) {
  const { hero } = S
  HOME(x, t); door(x)
  x.fillStyle = 'rgba(5,4,12,0.5)'; x.fillRect(0, 420, 1080, 1500)
  hero(x, t, { x: 250, y: 1170, s: 200, mood: t > T.B + 1.6 ? 'happy' : 'neutral', look: [1, -1], hops: [T.A + 0.4, T.B + 1.8] })
  backpack(x, 360, 1240, 0.6, 0.2)
  note(x, 790, 1170, 'you’re good|company too', { w: 380, h: 150, col: '#ffe27a', rot: 0.05, size: 38, k: pop01(t, T.A + 1.5, 0.3, 2.4) })
  sparkles(x, t, 790, 1170, T.B + 1.3, 8, 180, 1)
}
function s3(x, t, S) {
  const { u, hero } = S
  room(x, t, { wall: '#3a2a3a', wall2: '#352636', floor: '#45303e', win: null })
  cabinWindow(x, t)
  x.save(); x.globalCompositeOperation = 'lighter'; glow(x, 300, 1250, 400, 0.15, '255,190,120'); x.restore()
  hero(x, t, { x: 300, y: 1260, s: 260, mood: u > 0.8 ? 'happy' : 'sparkle', look: [1, -0.6], hops: [0.4, 0.9, 2.2, 2.5].map(v => S.t0 + v) })
  mug(x, t, 440, 1390, { s: 0.9 })
  const fl = Math.max(0, 1 - Math.abs(u - 0.9) / 0.18)
  if (fl > 0) { x.save(); x.globalCompositeOperation = 'lighter'; glow(x, 540, 900, 700, 0.5 * fl, '255,255,255'); x.restore() }
  phone(x, t, { cx: 770, top: 920, w: 400, h: 520, title: 'the trip', msgs: [{ at: S.t0 + 1.3, side: 'R', text: '[ the view ]', col: '#7fd0ff' }, { at: S.t0 + 1.9, side: 'L', text: 'WOW' }, { at: S.t0 + 2.4, side: 'L', text: 'ok next time I’m COMING' }], k: pop01(t, S.t0 + 1.0, 0.3, 2), rot: 0.04, size: 30, alpha: Math.min(1, (u - 1.0) * 5) })
  hearts(x, t, S.t0 + 2.0, 770, 980, { n: 6 })
}
function fin(x, t, S) {
  const { hero, ok, u } = S
  shadow(x, 540, 1150, 260 * ok)
  hero(x, t, { x: 540, y: 960, s: 300, pop: ok, mood: u > 1.6 ? 'happy' : 'sparkle', look: [0, 0], hops: [S.t0 + 0.1, S.t0 + 0.6, T.last + 1.5] })
  backpack(x, 760, 1080, ok * 0.6, 0.2)
}

const EP = makeSingle({
  id: 'nste09', sign: 'sagittarius', name: 'Sagittarius',
  hook: 'Everyone bailed. | *Go anyway?*',
  h1: 'Pack *anyway.*', h2: 'Look at *this.*',
  lines: ['you’re *good* company too.', 'go see it. *share* it after.'],
  last: 'Go. *Send* the view.',
  bubbles: [
    { t0: 3.85, t1: 6.6, x: 380, y: 1000, text: '…I’ll just stay home.', size: 42, tail: 0 },
    { t0: 14.0, t1: 15.4, x: 300, y: 1000, text: 'look at THIS.', size: 44, tail: 0 },
  ],
  pis1: { x: 960, y: 1600, s: 120 }, pis3: { x: 970, y: 1640, s: 100 },
  meter: { x: 400, y: 1600 },
  s1, s2, s3, fin,
  cues: [['pop', 1.6, 739.99, 0.035, 0.3], ['pop', 2.3, 587.33, 0.035, 0.3], ['pop', 14.5, 1760, 0.05, 0], ['glitter', 14.5, 14.8], ['whoosh', 14.85, 0.3, 0.03], ['pop', 15.5, 1174.66, 0.04, 0.3], ['pop', 16.0, 1318.51, 0.04, 0.3]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [lerp, ease, prog]
