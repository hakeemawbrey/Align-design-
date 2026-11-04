// npve02 · POV: You're Dating a ___ · ep 2 · "POV: you're dating a Taurus." (20 s vertical, lofi · F)
// Story 0–15.6, then the shared end card. Rows: promo/films/next30/b43.md. Look: ../../npve01/scenes/datekit.js.
//   0.0–2.3   hook: ♉ TAURUS in the snowy café, both arms (points) wrapped round a slice of cake, eyes shut, blissful.
//             A talk card lies on the table: "What's your comfort meal?"
//   2.3–5.6   (1) TAURUS: "the usual. it's *perfect.*"  Sticker: "same order since *forever*".
//   5.6–9.0   (2) your fork reaches in… the plate slides, very slowly, out of reach. Sticker: "*slowly* out of reach".
//   9.15      card cut.
//   9.3–12.7  (3, the twist) a second slice slides over to you. TAURUS: "ordered yours *first.*"
//             Sticker: "it ordered *yours* before you asked".
//   12.95     Last line: "Mine is *yours*. Eventually."  Pisces, outside the window, cries happy tears all film.
import { makePOV, drawStarChar, signStar, drawBits, HEART, sparkles, pisces, drawArm, drawImg, table, mug, R, pop01, outK, prog, ease, lerp, clamp, INK, BONE, GOLD, HOT, r3 } from '../../npve01/scenes/datekit.js'
import { talkHops } from '../../startalk.js'

const TA = signStar('taurus'), TN = `${TA.glyph}︎ TAURUS`
const T = { reach: [5.7, 6.4], slide: [6.3, 8.4], cut: 9.15, plate2: [9.35, 10.0], last: 12.95 }
const LINES = [
  { t: 2.4, speaker: TN, text: 'the usual. it’s *perfect.*', color: '#9fe6b0' },
  { t: 10.1, speaker: TN, text: 'ordered yours *first.*', color: '#9fe6b0' },
]
const HOPS = [...talkHops(LINES, TN), T.plate2[0], T.last + 0.3, T.last + 0.8]

function cake(x, t, cx, by, s = 1) {
  // plate
  x.fillStyle = INK; x.beginPath(); x.ellipse(cx, by, 130 * s + 6, 30 * s + 6, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#f4f1ff'; x.beginPath(); x.ellipse(cx, by, 130 * s, 30 * s, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#d8d2ee'; x.beginPath(); x.ellipse(cx, by, 96 * s, 20 * s, 0, 0, Math.PI * 2); x.fill()
  // the slice: three layers + cream + a berry
  const w = 150 * s, h = 34 * s, x0 = cx - w / 2, y0 = by - 4 * s - h * 3
  R(x, INK, x0 - 6, y0 - 22 * s, w + 12, h * 3 + 22 * s + 8)
  for (let i = 0; i < 3; i++) { R(x, i % 2 ? '#fff4e6' : '#e8b36a', x0, y0 + i * h, w, h); R(x, '#ff9ec8', x0, y0 + i * h + h - 6 * s, w, 6 * s) }
  R(x, '#fff8ef', x0, y0 - 16 * s, w, 18 * s)
  drawBits(x, ['.G.', 'RRR', 'RRR', '.R.'], { G: '#3fb08a', R: '#e8283c' }, cx, y0 - 34 * s, 9 * s)
}
const plateX = t => lerp(540, 200, ease.inOutQuad(prog(t, ...T.slide)))

const EP = makePOV({
  id: 'npve02', duration: 20, set: 'cafe',
  caption: 'you’re dating a *Taurus.*',
  images: { talk: 'card-talk-5.png' },
  lines: LINES,
  boxes: [{ from: 0, to: 2, open: 2.2, close: 12.75 }],
  stickers: [
    { at: 3.2, out: [5.4, 5.6], text: 'same order since *forever*', x: 540, y: 330, rot: -2.5, size: 44, kind: 'dark' },
    { at: 6.5, out: [8.9, 9.05], text: '*slowly* out of reach', x: 540, y: 330, rot: 2.5, size: 46, kind: 'you' },
    { at: 10.9, out: [12.6, 12.8], text: 'it ordered *yours* before you asked', x: 540, y: 330, rot: -2, size: 40, kind: 'light' },
  ],
  last: { at: T.last, text: 'Mine is *yours.* Eventually.', color: '#9fe6b0' },
  cuts: [T.cut],
  punch: [{ at: 6.3, dur: 2.0, z: 0.1, x: 400, y: 1150 }, { at: T.plate2[0], dur: 1.2, z: 0.12, x: 640, y: 1150 }],
  pitch: { [TN]: 523.25 },
  scene(x, t, K) {
    pisces(x, t, { x: 820, y: 720, s: 140, tears: t > T.last ? 3 : t > T.plate2[0] ? 2 : 1, mood: t > T.plate2[0] ? 'happy' : 'sparkle', look: [-1, 0.3], pop: pop01(t, -1) })
    let mood = 'heart', look = [0, 0]
    if (t > 1.4) mood = 'happy'
    if (t > T.reach[0]) { mood = 'squint'; look = [1, 0.6] }
    if (t > T.slide[1]) { mood = 'happy'; look = [0, 0] }
    if (t > T.plate2[0]) { mood = 'sparkle' }
    if (t > T.last) mood = 'heart'
    drawStarChar(x, plateX(t) > 300 ? 540 : lerp(540, 470, prog(t, T.slide[1] - 0.6, T.slide[1])), 960, 360, t, { color: TA.color, glyph: TA.glyph, mood, look, hops: HOPS, seed: 4, glow: 1.1, blush: t > T.plate2[0] ? 1 : 0 })
    table(x, 1150)
    drawImg(x, K.imgs.talk, 900, 1300, 190, { rot: 0.12 })
    mug(x, t, 140, 1250, '#9fe6b0', 0.9)
    cake(x, t, plateX(t), 1250, 1.1)
    const k2 = ease.outBack(prog(t, ...T.plate2))
    if (t > T.plate2[0]) cake(x, t, lerp(1300, 700, k2), 1300, 1.15)
    if (t > T.plate2[1]) sparkles(x, t, 700, 1180, T.plate2[1], 10, 150, 1, [GOLD, BONE, HOT])
    if (t > T.last) { sparkles(x, t, 540, 900, T.last + 0.35, 12, 240, 1, ['#9fe6b0', GOLD, BONE]); for (let i = 0; i < 6; i++) { const ph = t - T.last - 0.3 - i * 0.12; if (ph > 0) drawBits(x, HEART, { H: i % 2 ? HOT : GOLD }, 540 + (i - 2.5) * 110 + Math.sin(ph * 4 + i) * 20, 880 - ph * 160, 9, { alpha: clamp(1 - ph / 2.2) }) } }
  },
  front(x, t) {
    // your fork reaches in… and the plate leaves
    const r = ease.outCubic(prog(t, ...T.reach)) * outK(t, [8.5, 9.0])
    if (r > 0) {
      const hx = lerp(1250, plateX(t) + 170, r), hy = lerp(1500, 1210, r)
      x.save(); x.translate(hx - 40, hy - 10); x.rotate(-0.5); R(x, INK, -110, -9, 120, 18); R(x, '#d8d2ee', -106, -5, 112, 10); for (let i = 0; i < 3; i++) { R(x, INK, -146, -20 + i * 14, 42, 10); R(x, '#d8d2ee', -142, -18 + i * 14, 36, 6) } x.restore()
      drawArm(x, 1250, hx, hy, { r: 48, by: 1560, rot: 0.2 })
    }
  },
  cues: [
    ['pluck', 0.5, 698.46, 0.03, 0.5, 0], ['pluck', 0.9, 880, 0.03, 0.5, 0],
    ['whoosh', r3(T.reach[0]), 0.3, 0.025], ['riser', r3(T.slide[0]), r3(T.slide[1]), 0.012], ['tick', r3(T.slide[1]), 0.05],
    ['whoosh', r3(T.plate2[0]), 0.4, 0.035], ['tick', r3(T.plate2[1] - 0.1), 0.06], ['bell', r3(T.plate2[1]), 1396.91, 0.028, 1, 0.2], ['glitter', r3(T.plate2[1]), r3(T.plate2[1] + 0.5)],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
