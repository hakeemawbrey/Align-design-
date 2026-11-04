// npve04 · POV: You're Dating a ___ · ep 4 · "POV: you're dating a Cancer." (20 s vertical, dreamy · Db)
// Story 0–15.6, then the shared end card. Rows: promo/films/next30/b43.md. Look: ../../npve01/scenes/datekit.js.
//   0.0–2.3   hook: ♋ CANCER in your open front door, snow behind, holding a striped spare scarf out to you.
//   2.3–5.6   (1) CANCER: "it's *cold.* take my spare."  Sticker: "it brought a *spare* scarf".
//   5.6–9.0   (2) a paper bag pops up: FOR THE ROAD. CANCER: "snacks. in case you get *peckish.*"
//             Sticker: "the walk is *4 minutes*".
//   9.15      card cut.
//   9.3–12.7  (3, the twist) YOU: "honestly? rough day."  Cancer doesn't fix it: it sits down close beside you.
//             CANCER: "no fixing. I'm just *here.*"  Sticker: "it *listened.* that's it. that's the gift."
//   12.95     Last line: "Feels like *home.* Walks sideways."  Pisces, out in the snow, cries happy tears all film.
import { makePOV, drawStarChar, signStar, drawBits, HEART, sparkles, pisces, beanie, R, pop01, outK, prog, ease, lerp, clamp, INK, BONE, GOLD, HOT, INTER, r3 } from '../../npve01/scenes/datekit.js'
import { talkHops } from '../../startalk.js'

const CA = signStar('cancer'), CN = `${CA.glyph}︎ CANCER`, YN = 'YOU'
const T = { bag: [5.7, 6.1], cut: 9.15, sit: [10.3, 11.0], last: 12.95 }
const LINES = [
  { t: 2.4, speaker: CN, text: 'it’s *cold.* take my spare.', color: '#9fd8ff' },
  { t: 6.0, speaker: CN, text: 'snacks. in case you get *peckish.*', color: '#9fd8ff' },
  { t: 9.35, speaker: YN, text: 'honestly? rough day.', color: '#c9a6ff' },
  { t: 11.0, speaker: CN, text: 'no fixing. I’m just *here.*', color: '#9fd8ff' },
]
const HOPS = [...talkHops(LINES, CN), T.bag[0], T.last + 0.3, T.last + 0.8]

function scarf(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.12 * Math.sin(t * 2.4)); x.scale(k, k)
  const N = 9
  for (let i = 0; i < N; i++) { const y = i * 34, sw = 10 * Math.sin(t * 3 + i * 0.6) * (i / N); R(x, INK, -44 + sw, y - 4, 88, 42); R(x, i % 2 ? '#fff8ef' : '#e8283c', -40 + sw, y, 80, 34) }
  for (let i = 0; i < 5; i++) R(x, '#e8283c', -40 + i * 18 + 10 * Math.sin(t * 3 + 5.4), N * 34, 8, 36)
  x.restore()
}
function bag(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.06); x.scale(k, k)
  R(x, INK, -110, -140, 220, 280); R(x, '#c89a62', -104, -134, 208, 268); R(x, '#a87a46', -104, -134, 208, 26)
  for (let i = 0; i < 6; i++) R(x, '#a87a46', -104 + i * 38, -108, 4, 8)
  R(x, '#fff8ef', -84, -40, 168, 90); x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.font = `800 28px ${INTER}`; x.fillText('FOR THE', 0, -12); x.fillText('ROAD', 0, 22)
  drawBits(x, HEART, { H: HOT }, 0, 90, 7)
  // snacks peeking out
  R(x, INK, -70, -186, 60, 60); R(x, '#ffd36a', -64, -180, 48, 48); R(x, INK, 10, -200, 56, 76); R(x, '#ff7eb6', 16, -194, 44, 64)
  x.restore()
}

const EP = makePOV({
  id: 'npve04', duration: 20, set: 'door',
  caption: 'you’re dating a *Cancer.*',
  lines: LINES,
  boxes: [{ from: 0, to: 4, open: 2.2, close: 12.75 }],
  stickers: [
    { at: 3.4, out: [5.4, 5.6], text: 'it brought a *spare* scarf', x: 540, y: 330, rot: -2.5, size: 44, kind: 'light' },
    { at: 7.0, out: [8.9, 9.05], text: 'the walk is *4 minutes*', x: 540, y: 330, rot: 2.5, size: 46, kind: 'you' },
    { at: 11.6, out: [12.6, 12.8], text: 'it *listened.* that’s the gift.', x: 540, y: 330, rot: -2, size: 42, kind: 'dark' },
  ],
  last: { at: T.last, text: 'Feels like *home.* Walks sideways.', color: '#9fd8ff' },
  cuts: [T.cut],
  punch: [{ at: T.bag[0], dur: 1.2, z: 0.1, x: 760, y: 1100 }, { at: T.sit[0], dur: 2.0, z: 0.1, x: 600, y: 1150 }],
  pitch: { [CN]: 659.25, [YN]: 587.33 },
  scene(x, t) {
    pisces(x, t, { x: 270, y: 1010, s: 115, tears: t > T.last ? 3 : t > T.sit[0] ? 2 : 1, mood: t > T.sit[0] ? 'happy' : 'sparkle', look: [1, 0], pop: pop01(t, -1) })
    const sk = ease.inOutCubic(prog(t, ...T.sit))
    let mood = 'happy', look = [0, 0]
    if (t > T.bag[0]) mood = 'sparkle'
    if (t > T.cut) { mood = 'wide'; look = [0, 0.4] }
    if (t > T.sit[0]) { mood = 'neutral'; look = [-1, 0.5] }
    if (t > T.sit[1] + 0.4) mood = 'happy'
    if (t > T.last) mood = 'heart'
    // it sits down, close, at your side (bigger, lower, to the left)
    const o = { x: lerp(520, 740, sk), y: lerp(1050, 1260, sk), s: lerp(360, 470, sk), hops: HOPS, seed: 5 }
    drawStarChar(x, o.x, o.y, o.s, t, { color: CA.color, glyph: CA.glyph, mood, look, hops: HOPS, seed: 5, glow: 1.1, blush: t > T.sit[1] ? 1 : 0 })
    beanie(x, t, o, '#5fb8ff')
    scarf(x, t, 740, 920, pop01(t, -1) * outK(t, [5.4, 5.7]))
    bag(x, t, 800, 1120, pop01(t, T.bag[0], 0.35, 2.4) * outK(t, [8.9, 9.15]))
    if (t > T.bag[0] && t < 7) sparkles(x, t, 800, 1060, T.bag[0] + 0.1, 8, 150, 1, [GOLD, BONE, HOT])
    if (t > T.sit[1]) for (let i = 0; i < 3; i++) { const ph = (t - T.sit[1] - i * 0.6) % 1.8; if (ph > 0 && t < T.last) drawBits(x, HEART, { H: '#9fd8ff' }, 560 + i * 40, 1060 - ph * 90, 7, { alpha: clamp(1 - ph / 1.8) }) }
    if (t > T.last) { sparkles(x, t, 700, 1000, T.last + 0.35, 12, 240, 1, ['#9fd8ff', GOLD, BONE]); for (let i = 0; i < 6; i++) { const ph = t - T.last - 0.3 - i * 0.12; if (ph > 0) drawBits(x, HEART, { H: i % 2 ? HOT : GOLD }, 640 + (i - 2.5) * 100 + Math.sin(ph * 4 + i) * 20, 960 - ph * 160, 9, { alpha: clamp(1 - ph / 2.2) }) } }
  },
  cues: [
    ['pluck', 0.4, 554.37, 0.03, 0.5, 0], ['pluck', 0.8, 698.46, 0.03, 0.5, 0],
    ['pop', r3(T.bag[0]), 1108.73, 0.045, 0.3], ['tick', r3(T.bag[0] + 0.15), 0.05], ['glitter', r3(T.bag[0] + 0.1), r3(T.bag[0] + 0.5)],
    ['whoosh', r3(T.sit[0]), 0.6, 0.025], ['tick', r3(T.sit[1]), 0.04], ['bell', r3(T.sit[1] + 0.1), 1108.73, 0.025, 1.2, 0],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
