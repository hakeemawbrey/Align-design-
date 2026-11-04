// npve06 · POV: You're Dating a ___ · ep 6 · "POV: you're dating a Virgo." (20 s vertical, jazzy · Bb)
// Story 0–15.6, then the shared end card. Rows: promo/films/next30/b43.md. Look: ../../npve01/scenes/datekit.js.
//   0.0–2.3   hook: ♍ VIRGO across the café table, lint-rolling your coat sleeve (your arm on the table), fuzz flying.
//   2.3–5.6   (1) VIRGO: "hold still. *one* more fuzz."  Sticker: "date night *lint check*".
//   5.6–9.0   (2) a bowl slides over with a little flag: NO ONIONS. VIRGO: "your usual. minus the *onions.*"
//             Sticker: "it noticed you *pick them out*".
//   9.15      card cut.
//   9.3–12.7  (3, the twist) the napkin you doodled a heart on: Virgo folds it, very neatly, and keeps it.
//             VIRGO: "this one's a *keeper.*"  Sticker: "it *kept* your doodle".
//   12.95     Last line: "Noticed *everything.* Kept the good parts."  Pisces, outside the window, cries all film.
import { makePOV, drawStarChar, signStar, drawBits, HEART, sparkles, pisces, drawArm, table, mug, R, pop01, outK, prog, ease, lerp, clamp, INK, BONE, GOLD, HOT, YOU, INTER, r3 } from '../../npve01/scenes/datekit.js'
import { talkHops } from '../../startalk.js'

const VI = signStar('virgo'), VN = `${VI.glyph}︎ VIRGO`
const T = { bowl: [5.7, 6.2], cut: 9.15, fold: [10.3, 11.3], last: 12.95 }
const LINES = [
  { t: 2.4, speaker: VN, text: 'hold still. *one* more fuzz.', color: '#c9f2a8' },
  { t: 6.3, speaker: VN, text: 'your usual. minus the *onions.*', color: '#c9f2a8' },
  { t: 11.4, speaker: VN, text: 'this one’s a *keeper.*', color: '#c9f2a8' },
]
const HOPS = [...talkHops(LINES, VN), T.bowl[1], T.fold[1], T.last + 0.3, T.last + 0.8]

function roller(x, t) {
  if (t > 5.5) return
  const u = Math.sin(t * 5), cx = lerp(330, 470, (u + 1) / 2), cy = lerp(1350, 1270, (u + 1) / 2)
  x.save(); x.translate(cx, cy); x.rotate(-0.5)
  R(x, INK, -14, -150, 28, 120); R(x, '#5a5470', -9, -146, 18, 112)
  R(x, INK, -62, -40, 124, 72); R(x, '#fff8ef', -56, -34, 112, 60); for (let i = 0; i < 4; i++) R(x, '#e8e2f6', -56 + i * 30, -34, 4, 60)
  x.restore()
  // fuzz bits flicking off
  for (let i = 0; i < 6; i++) { const ph = (t * 1.3 + i / 6) % 1; x.globalAlpha = 1 - ph; R(x, '#8a7fc0', 300 + i * 40 + ph * 40, 1280 - ph * 160, 10, 10); x.globalAlpha = 1 }
}
function bowl(x, t, cx, by) {
  x.fillStyle = INK; x.beginPath(); x.ellipse(cx, by - 40, 136, 34, 0, 0, Math.PI * 2); x.fill()
  x.beginPath(); x.moveTo(cx - 136, by - 40); x.quadraticCurveTo(cx, by + 80, cx + 136, by - 40); x.fill()
  x.fillStyle = '#5fb8ff'; x.beginPath(); x.moveTo(cx - 128, by - 40); x.quadraticCurveTo(cx, by + 70, cx + 128, by - 40); x.fill()
  x.fillStyle = '#ffcf7a'; x.beginPath(); x.ellipse(cx, by - 40, 128, 28, 0, 0, Math.PI * 2); x.fill()
  for (let i = 0; i < 6; i++) R(x, ['#3fb08a', '#e8283c', '#fff4e6'][i % 3], cx - 90 + i * 32, by - 50 + (i % 2) * 10, 18, 12)
  // the flag
  R(x, INK, cx + 60, by - 190, 8, 150); R(x, INK, cx + 64, by - 194, 156, 62); R(x, '#fff8ef', cx + 68, by - 190, 148, 54)
  x.fillStyle = '#e8283c'; x.font = `800 22px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('NO ONIONS', cx + 142, by - 162)
}
function napkin(x, t) {
  if (t < T.cut) return
  const f = ease.inOutCubic(prog(t, ...T.fold)), lift = ease.inOutCubic(prog(t, T.fold[0] - 0.4, T.fold[0]))
  const cx = lerp(430, 640, lift), cy = lerp(1300, 1140, lift), w = 230 * (1 - 0.55 * f), h = 200 * (1 - 0.55 * f)
  if (t > T.fold[1] + 0.6) return
  const a = 1 - prog(t, T.fold[1] + 0.2, T.fold[1] + 0.6)
  x.save(); x.globalAlpha = a; x.translate(cx, cy); x.rotate(-0.08 + 0.2 * f)
  R(x, INK, -w / 2 - 5, -h / 2 - 5, w + 10, h + 10); R(x, '#fff8ef', -w / 2, -h / 2, w, h)
  if (f > 0.1) { R(x, 'rgba(140,130,180,0.35)', -2, -h / 2, 4, h); R(x, 'rgba(140,130,180,0.35)', -w / 2, -2, w, 4) }
  // the doodle: a wobbly heart in pen
  x.strokeStyle = '#3a5ad8'; x.lineWidth = 5 * (1 - 0.5 * f); x.beginPath(); const s = 1 - 0.55 * f
  x.moveTo(0, 50 * s); x.bezierCurveTo(-90 * s, -10 * s, -40 * s, -70 * s, 0, -25 * s); x.bezierCurveTo(40 * s, -72 * s, 92 * s, -8 * s, 3 * s, 48 * s); x.stroke()
  x.restore()
}

const EP = makePOV({
  id: 'npve06', duration: 20, set: 'cafe',
  caption: 'you’re dating a *Virgo.*',
  lines: LINES,
  boxes: [{ from: 0, to: 3, open: 2.2, close: 12.75 }],
  stickers: [
    { at: 3.3, out: [5.4, 5.6], text: 'date night *lint check*', x: 540, y: 330, rot: -2.5, size: 46, kind: 'light' },
    { at: 7.3, out: [8.9, 9.05], text: 'it noticed you *pick them out*', x: 540, y: 330, rot: 2.5, size: 42, kind: 'dark' },
    { at: 9.5, out: [10.9, 11.1], text: 'the napkin you *doodled* on', x: 540, y: 330, rot: -2, size: 42, kind: 'you' },
  ],
  last: { at: T.last, text: 'Noticed *everything.* Kept the good parts.', color: '#c9f2a8', size: 104, accentSize: 140 },
  cuts: [T.cut],
  punch: [{ at: 0.6, dur: 1.4, z: 0.08, x: 420, y: 1250 }, { at: T.bowl[0], dur: 1.3, z: 0.1, x: 560, y: 1150 }, { at: T.fold[0], dur: 1.6, z: 0.12, x: 620, y: 1100 }],
  pitch: { [VN]: 932.33 },
  scene(x, t) {
    pisces(x, t, { x: 830, y: 720, s: 135, tears: t > T.last ? 3 : t > T.fold[0] ? 2 : 1, mood: t > T.fold[0] ? 'happy' : 'sparkle', look: [-1, 0.3], pop: pop01(t, -1) })
    let mood = 'squint', look = [-0.6, 1]
    if (t > 2.3) { mood = 'happy'; look = [0, 0] }
    if (t > T.bowl[0]) mood = 'sparkle'
    if (t > T.cut) { mood = 'neutral'; look = [-0.4, 1] }
    if (t > T.fold[0]) { mood = 'happy'; look = [0.6, 0.6] }
    if (t > T.last) { mood = 'heart'; look = [0, 0] }
    drawStarChar(x, 580, 970, 350, t, { color: VI.color, glyph: VI.glyph, mood, look, hops: HOPS, seed: 6, glow: 1.1, blush: t > T.fold[1] ? 1 : 0 })
    table(x, 1150)
    mug(x, t, 160, 1250, '#c9f2a8', 0.9)
    if (t > T.bowl[0] && t < T.cut) bowl(x, t, lerp(1300, 640, ease.outBack(prog(t, ...T.bowl))), 1310)
    napkin(x, t)
    if (t > T.fold[1]) sparkles(x, t, 640, 1140, T.fold[1], 10, 140, 1, [GOLD, BONE, HOT])
    if (t > T.last) { sparkles(x, t, 580, 960, T.last + 0.35, 12, 240, 1, ['#c9f2a8', GOLD, BONE]); for (let i = 0; i < 6; i++) { const ph = t - T.last - 0.3 - i * 0.12; if (ph > 0) drawBits(x, HEART, { H: i % 2 ? HOT : GOLD }, 580 + (i - 2.5) * 110 + Math.sin(ph * 4 + i) * 20, 880 - ph * 160, 9, { alpha: clamp(1 - ph / 2.2) }) } }
  },
  front(x, t) {
    // your coat sleeve on the table, then your pen hand by the napkin
    const a = outK(t, [5.3, 5.7])
    if (a > 0) { x.save(); x.globalAlpha = a; drawArm(x, -100, 470, 1300, { r: 54, by: 1620, col: '#6a5aa8' }); x.restore() }
    if (t > T.cut && t < T.fold[0]) { const k = ease.outCubic(prog(t, T.cut, T.cut + 0.5)) * outK(t, [T.fold[0] - 0.4, T.fold[0]]); if (k > 0) drawArm(x, -100, lerp(-60, 260, k), 1360, { r: 50, by: 1640 }) }
    roller(x, t)
  },
  cues: [
    ...Array.from({ length: 8 }, (_, i) => ['tick', r3(0.1 + i * 0.63), 0.02]),
    ['whoosh', r3(T.bowl[0]), 0.4, 0.035], ['tick', r3(T.bowl[1]), 0.05], ['pop', r3(T.bowl[1] + 0.05), 1174.66, 0.04, 0.3],
    ['tick', r3(T.fold[0] + 0.3), 0.03], ['tick', r3(T.fold[0] + 0.65), 0.03], ['bell', r3(T.fold[1]), 1396.91, 0.028, 1, 0], ['glitter', r3(T.fold[1]), r3(T.fold[1] + 0.5)],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
