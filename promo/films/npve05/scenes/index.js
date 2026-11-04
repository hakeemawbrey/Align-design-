// npve05 · POV: You're Dating a ___ · ep 5 · "POV: you're dating a Leo." (18 s vertical, house · A)
// Story 0–15.6, then the short end card. Rows: promo/films/next30/b43.md. Look: ../../npve01/scenes/datekit.js.
//   0.0–2.3   hook: ♌ LEO at the party mirror, posing at its reflection… then it spins round to the lens.
//   2.3–5.6   (1) LEO: "wait. you look *amazing.*"  Sticker: "it stopped posing to *say that*".
//   5.6–9.0   (2) you laugh ("haha") and it points: "your laugh? *amazing.*"  Sticker: "compliment number *two*".
//   9.15      card cut.
//   9.3–12.7  (3, the twist) it pulls you into the mirror: you're in the reflection, side by side.
//             LEO: "*we* look amazing."  Sticker: "…okay, it has a *point*".
//   12.95     Last line: "*Hype* comes standard."  Pisces, by the tree, cries happy tears all film.
import { makePOV, drawStarChar, signStar, drawBits, HEART, sparkles, pisces, bubble, R, pop01, outK, prog, ease, lerp, clamp, INK, BONE, GOLD, HOT, YOU, r3 } from '../../npve01/scenes/datekit.js'
import { talkHops } from '../../startalk.js'

const LE = signStar('leo'), LN = `${LE.glyph}︎ LEO`
const T = { spin: 1.1, laugh: 5.8, cut: 9.15, pull: [9.4, 10.1], last: 12.95 }
const LINES = [
  { t: 2.4, speaker: LN, text: 'wait. you look *amazing.*', color: '#ffd36a' },
  { t: 6.3, speaker: LN, text: 'your laugh? *amazing.*', color: '#ffd36a' },
  { t: 10.2, speaker: LN, text: '*we* look amazing.', color: '#ffd36a' },
]
const HOPS = [T.spin, ...talkHops(LINES, LN), T.pull[1], T.last + 0.3, T.last + 0.8]
const MX = 840, MY = 800

function mirror(x, t) {
  const w = 280, h = 520
  R(x, INK, MX - w / 2 - 22, MY - h / 2 - 22, w + 44, h + 44); R(x, GOLD, MX - w / 2 - 16, MY - h / 2 - 16, w + 32, h + 32); R(x, '#b8892e', MX - w / 2 - 6, MY - h / 2 - 6, w + 12, h + 12)
  x.save(); x.beginPath(); x.rect(MX - w / 2, MY - h / 2, w, h); x.clip()
  const g = x.createLinearGradient(0, MY - h / 2, 0, MY + h / 2); g.addColorStop(0, '#cfc6f2'); g.addColorStop(1, '#8a7fc0'); x.fillStyle = g; x.fillRect(MX - w / 2, MY - h / 2, w, h)
  // the reflection: Leo (and, after the pull, you)
  const pk = ease.outBack(prog(t, ...T.pull))
  const lx = lerp(MX, MX + 50, pk)
  drawStarChar(x, lx, MY + 90, 180, t, { color: LE.color, mood: t < T.spin ? 'sparkle' : t > T.pull[0] ? 'happy' : 'neutral', look: [t < T.spin ? -1 : 0, 0], seed: 9, hops: HOPS, tips: false })
  if (t > T.pull[0]) drawStarChar(x, lerp(MX - 200, MX - 60, pk), MY + 100, 170, t, { color: YOU, mood: t > T.pull[1] + 0.3 ? 'happy' : 'wide', look: [0, 0], seed: 3, blush: 1, tips: false })
  // a diagonal shine
  x.globalAlpha = 0.25; x.fillStyle = '#fff'; x.beginPath(); x.moveTo(MX - w / 2, MY - 60); x.lineTo(MX - w / 2 + 80, MY - h / 2); x.lineTo(MX - w / 2 + 130, MY - h / 2); x.lineTo(MX - w / 2, MY + 30); x.fill()
  x.restore()
}

const EP = makePOV({
  id: 'npve05', duration: 18, set: 'party',
  caption: 'you’re dating a *Leo.*',
  lines: LINES,
  boxes: [{ from: 0, to: 3, open: 2.2, close: 12.75 }],
  stickers: [
    { at: 3.4, out: [5.4, 5.6], text: 'it stopped posing to *say that*', x: 540, y: 330, rot: -2.5, size: 42, kind: 'light' },
    { at: 7.4, out: [8.9, 9.05], text: 'compliment number *two*', x: 540, y: 330, rot: 2.5, size: 44, kind: 'hot' },
    { at: 11.2, out: [12.6, 12.8], text: '…okay, it has a *point*', x: 540, y: 330, rot: -2, size: 44, kind: 'you' },
  ],
  last: { at: T.last, text: '*Hype* comes standard.', color: '#ffd36a' },
  cuts: [T.cut],
  punch: [{ at: T.spin, dur: 1.0, z: 0.1, x: 540, y: 1000 }, { at: T.pull[0], dur: 2.4, z: 0.14, x: MX - 80, y: 860 }],
  pitch: { [LN]: 880 },
  scene(x, t) {
    pisces(x, t, { x: 170, y: 1080, s: 115, tears: t > T.last ? 3 : t > T.pull[0] ? 2 : 1, mood: t > T.pull[0] ? 'happy' : 'sparkle', look: [1, 0], pop: pop01(t, -1) })
    mirror(x, t)
    let mood = 'sparkle', look = [1, -0.2]
    if (t > T.spin) { mood = 'wide'; look = [0, 0] }
    if (t > T.spin + 0.15) mood = 'happy'
    if (t > T.laugh) { mood = 'sparkle'; look = [0, 0.5] }
    if (t > T.cut) { mood = 'happy'; look = [1, -0.2] }
    if (t > T.last) mood = 'heart'
    const lx = t > T.cut ? lerp(500, 460, ease.outCubic(prog(t, ...T.pull))) : 500
    drawStarChar(x, lx, 1020, 360, t, { color: LE.color, glyph: LE.glyph, mood, look, hops: HOPS, seed: 2, glow: 1.2 })
    if (t > T.spin && t < T.spin + 0.6) sparkles(x, t, 500, 1000, T.spin, 10, 200, 1, [GOLD, BONE, HOT])
    if (t > LINES[0].t + 0.5 && t < 5.6) sparkles(x, t, 500, 1000, LINES[0].t + 0.6, 8, 220, 2, [GOLD, BONE])
    bubble(x, t, 380, 1300, T.laugh, 'haha', { size: 40, col: YOU, out: [7.2, 7.5] })
    if (t > T.laugh + 0.3 && t < T.cut) { const k = pop01(t, T.laugh + 0.5, 0.3, 2.4); x.save(); x.translate(660, 760); x.rotate(0.15); x.scale(k, k); R(x, INK, -90, -50, 180, 100); R(x, BONE, -84, -44, 168, 88); x.fillStyle = HOT; x.font = "800 54px Inter, Arial"; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('10/10', 0, 4); x.restore() }
    if (t > T.pull[1]) sparkles(x, t, MX, MY, T.pull[1], 12, 220, 1, [GOLD, BONE, HOT])
    if (t > T.last) { sparkles(x, t, 500, 980, T.last + 0.35, 12, 240, 1, ['#ffd36a', GOLD, BONE]); for (let i = 0; i < 6; i++) { const ph = t - T.last - 0.3 - i * 0.12; if (ph > 0) drawBits(x, HEART, { H: i % 2 ? HOT : GOLD }, 520 + (i - 2.5) * 110 + Math.sin(ph * 4 + i) * 20, 900 - ph * 160, 9, { alpha: clamp(1 - ph / 2.2) }) } }
  },
  cues: [
    ['whoosh', r3(T.spin - 0.1), 0.3, 0.035], ['pop', r3(T.spin + 0.05), 1318.51, 0.045, 0], ['glitter', r3(T.spin), r3(T.spin + 0.4)],
    ['pop', r3(T.laugh), 783.99, 0.035, -0.3], ['pop', r3(T.laugh + 0.5), 1567.98, 0.045, 0.3], ['clap', r3(T.laugh + 0.6), { gain: 0.1 }],
    ['whoosh', r3(T.pull[0]), 0.5, 0.035], ['tick', r3(T.pull[1] - 0.1), 0.05], ['bell', r3(T.pull[1]), 1760, 0.028, 1, 0.3], ['glitter', r3(T.pull[1]), r3(T.pull[1] + 0.6)],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
