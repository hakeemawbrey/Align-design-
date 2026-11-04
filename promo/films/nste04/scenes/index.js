// nste04: SINGLE AND THRIVING, Ep 4 "Soup for Everyone" (23 s vertical, Next 30 b33, music: dreamy · Eb).
// Format kit: ../../nste01/singlekit.js (story 0–20.6, then the short end card). Rows: promo/films/next30/b33.md.
//   0.0–3.4    hook "Made soup for *everyone.* | Ate crackers." Cancer in the snowy hallway setting a soup tub on the third
//              doormat (two already delivered): "soup for you! and you!"
//   3.4–6.8    jump cut home: Cancer alone at the table, one cracker. "I'm fine! crackers count."  Pisces sniffles.
//   6.8        beat cut → THE STARS: "you look after *everyone.*" / "who's looking after *you* tonight?"  A to-do note:
//              "1. feed everyone ✓ | 2. feed ME".
//   13.6       Cancer sets a real bowl, a napkin, a spoon; sits; first spoonful; "a bowl. for me." → "mmm. warm."
//   17.4       "Cancer: *thriving.*" Last line: "Put *yourself* on the list."
import { makeSingle, room, street, box, R, ink, note, shadow, sparkles, table, glow, pop01, prog, lerp, ease, clamp, T, INK, BONE, GOLD } from '../../nste01/singlekit.js'

function tub(x, t, cx, cy, { k = 1, steam = true } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  box(x, -46, -64, 92, 64, '#f2efe6', { b: 5 }); R(x, '#e8344e', -50, -76, 100, 16); R(x, INK, -50, -80, 100, 4)
  ink(x, '♡', 0, -30, { size: 30, col: '#e8344e' })
  if (steam) for (let i = 0; i < 2; i++) { const p = (t * 0.7 + i / 2) % 1; x.globalAlpha = 0.5 * Math.sin(Math.PI * p); R(x, BONE, -12 + i * 22, -100 - p * 60, 7, 16) }
  x.restore()
}
function bowl(x, t, cx, cy, k = 1) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, -10, 96, 54, 0, 0, Math.PI); x.fill(); x.fillRect(-100, -16, 200, 10)
  x.fillStyle = '#7fd0ff'; x.beginPath(); x.ellipse(0, -10, 88, 46, 0, 0, Math.PI); x.fill()
  R(x, '#f2a65a', -88, -18, 176, 10); R(x, '#9fe6b0', -40, -20, 14, 6); R(x, '#ffd23a', 20, -20, 14, 6)
  for (let i = 0; i < 3; i++) { const p = (t * 0.6 + i / 3) % 1; x.save(); x.globalAlpha = 0.5 * Math.sin(Math.PI * p); R(x, BONE, -30 + i * 28, -50 - p * 90, 8, 18); x.restore() }
  x.restore()
}
function hallway(x, t) {
  room(x, t, { wall: '#3a2a52', wall2: '#33254a', floor: '#4a3550', win: null })
  for (const dx of [120, 420, 720]) { box(x, dx, 760, 220, 520, '#6b4a2f', { b: 7, hi: '#8a6440' }); R(x, GOLD, dx + 180, 1020, 18, 18); R(x, '#8a3a4a', dx - 10, 1290, 240, 22) }
}
function s1(x, t, S) {
  const { u, hero } = S
  if (u < 3.4) {
    hallway(x, t)
    tub(x, t, 230, 1290); tub(x, t, 530, 1290)
    const put = ease.outCubic(prog(u, 0, 0.7))
    tub(x, t, 830, lerp(1170, 1290, put))
    hero(x, t, { x: 700, y: 1150, s: 250, mood: 'happy', look: [1, 0.6], squash: 0.08 * (1 - put), hops: [1.0, 1.5] })
  } else {
    room(x, t, { wall: '#262046', wall2: '#211b40', floor: '#33284a', win: { x: 660, y: 480, w: 260, h: 280 } })
    table(x, 540, 1260, 600)
    hero(x, t, { x: 470, y: 1090, s: 260, mood: u > 3.8 ? 'happy' : 'neutral', look: [0.4, 0.8], hops: [3.85, 4.2] })
    // one lonely cracker
    const bite = u > 5.2 ? 1 : 0
    R(x, INK, 616, 1214, 70, 46); R(x, '#e8c27a', 620, 1218, 62 - bite * 20, 38); for (let i = 0; i < 3; i++) R(x, '#c69a4f', 630 + i * 16, 1232, 5, 5)
    // the empty pot on the stove, scraped clean
    box(x, 190, 1160, 150, 96, '#5a5470', { b: 6 }); ink(x, 'empty', 265, 1210, { size: 24, col: BONE, font: "'Space Mono', monospace" })
  }
}
function s2(x, t, S) {
  const { hero } = S
  room(x, t, { wall: '#262046', wall2: '#211b40', floor: '#33284a', win: { x: 660, y: 480, w: 260, h: 280 } })
  x.fillStyle = 'rgba(5,4,12,0.5)'; x.fillRect(0, 420, 1080, 1500)
  hero(x, t, { x: 250, y: 1170, s: 200, mood: t > T.B + 1.6 ? 'happy' : 'neutral', look: [1, -1], hops: [T.A + 0.4, T.B + 1.8] })
  note(x, 790, 1170, '1. feed everyone ✓|2. feed ME', { w: 420, h: 160, col: '#ffe27a', rot: 0.05, size: 36, k: pop01(t, T.A + 1.5, 0.3, 2.4) })
  sparkles(x, t, 790, 1170, T.B + 1.2, 8, 180, 1)
}
function s3(x, t, S) {
  const { u, hero } = S
  room(x, t, { wall: '#2e2350', wall2: '#281f48', floor: '#3a2c4e', win: { x: 660, y: 480, w: 260, h: 280 } })
  x.save(); x.globalCompositeOperation = 'lighter'; glow(x, 540, 1150, 500, 0.15, '255,190,120'); x.restore()
  table(x, 540, 1260, 640)
  // napkin + spoon land first, then the bowl
  const nk = pop01(t, S.t0 + 0.2, 0.3, 2.4)
  if (nk > 0.01) { R(x, INK, 700, 1240, 110 * nk, 20); R(x, '#ff8fb1', 704, 1243, 102 * nk, 14); R(x, INK, 720, 1220, 80 * nk, 10); R(x, '#cfd6e6', 722, 1222, 76 * nk, 6) }
  hero(x, t, { x: 400, y: 1090, s: 260, mood: u > 2.2 ? 'happy' : 'sparkle', look: [0.6, 0.6], hops: [0.3, 1.0, 2.2, 2.5].map(v => S.t0 + v) })
  bowl(x, t, 560, 1258, pop01(t, S.t0 + 0.6, 0.35, 2.2))
  sparkles(x, t, 560, 1180, S.t0 + 0.7, 8, 140, 2)
}
function fin(x, t, S) {
  const { hero, ok, u } = S
  shadow(x, 540, 1150, 260 * ok)
  hero(x, t, { x: 540, y: 960, s: 300, pop: ok, mood: u > 1.6 ? 'happy' : 'sparkle', look: [0, 0], hops: [S.t0 + 0.1, S.t0 + 0.6, T.last + 1.5] })
  bowl(x, t, 760, 1140, ok * 0.8)
}

const EP = makeSingle({
  id: 'nste04', sign: 'cancer', name: 'Cancer',
  hook: 'Made soup for *everyone.* | Ate crackers.',
  h1: 'Wait. *What about you?*', h2: 'A bowl. *For you.*',
  lines: ['you look after *everyone.*', 'who’s looking after *you* tonight?'],
  last: 'Put *yourself* on the list.',
  bubbles: [
    { t0: 0.9, t1: 3.3, x: 640, y: 880, text: 'soup for you! and you!', size: 40, tail: 0.1 },
    { t0: 3.8, t1: 6.6, x: 480, y: 860, text: 'I’m fine! crackers count.', size: 40, tail: 0 },
    { t0: 14.4, t1: 15.8, x: 420, y: 860, text: 'a bowl. for me.', size: 42, tail: 0 },
    { t0: 15.9, t1: 17.3, x: 440, y: 860, text: 'mmm. warm.', size: 44, tail: 0, col: '#ffe2c4' },
  ],
  pis1: { x: 950, y: 1590, s: 130 }, pis3: { x: 960, y: 1610, s: 120 },
  s1, s2, s3, fin,
  cues: [['tick', 0.6, 0.05], ['whoosh', 3.32, 0.25, 0.03], ['tick', 3.4, 0.05], ['tick', 5.2, 0.04], ['tick', 5.26, 0.03], ['pop', 13.85, 987.77, 0.03, 0.3], ['pop', 14.25, 1174.66, 0.04, 0]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [street, clamp]
