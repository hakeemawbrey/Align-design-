// npve18 · POV: You're Dating a ___ · ep 18 · "POV: you're dating a Virgo. Gift wrap." (17 s vertical, lofi · Dm)
// Story 0–12.6, then the shared end card. Rows: promo/films/next30/b43.md. Look: ../../npve01/scenes/datekit.js.
//   0.0–2.3   hook: ♍ VIRGO at the kitchen counter, creasing a gift-wrap corner with a ruler. Perfect.
//   2.3–6.0   (1) its present: crisp corners, a symmetrical bow. Yours slides in beside it: a lumpy blob of tape.
//             VIRGO: "those corners are *crisp.*"  Sticker: "yours is… *a shape*".
//   6.2       card cut.
//   6.3–9.8   (2, the turn) it lifts YOUR lumpy one onto the shelf, dead centre, under a little light. Like art.
//             VIRGO: "this one goes on *display.*"  Sticker: "it's *art* now".
//   10.0      Last line: "Perfect corners. *Soft* centre."  Pisces, outside the window, cries happy tears all film.
import { makePOV, drawStarChar, signStar, drawBits, HEART, sparkles, pisces, drawArm, R, pop01, outK, prog, ease, lerp, clamp, INK, BONE, GOLD, HOT, r3 } from '../../npve01/scenes/datekit.js'
import { talkHops } from '../../startalk.js'

const VI = signStar('virgo'), VN = `${VI.glyph}︎ VIRGO`
const T = { crease: [0.0, 1.8], lump: [3.2, 3.8], cut: 6.2, lift: [6.5, 7.6], last: 10.0 }
const LINES = [
  { t: 2.4, speaker: VN, text: 'those corners are *crisp.*', color: '#c9f2a8' },
  { t: 7.7, speaker: VN, text: 'this one goes on *display.*', color: '#c9f2a8' },
]
const HOPS = [1.9, ...talkHops(LINES, VN), T.lift[1], T.last + 0.3, T.last + 0.8]

function neat(x, cx, by, s = 1) {
  x.save(); x.translate(cx, by); x.scale(s, s)
  R(x, INK, -120, -170, 240, 176); R(x, '#3fb08a', -114, -164, 228, 164); for (let i = 0; i < 6; i++) R(x, '#2f8a5a', -114 + i * 40, -164, 12, 164)
  R(x, '#ff4f86', -12, -164, 24, 164); R(x, '#ff4f86', -114, -94, 228, 24)
  drawBits(x, ['PP...PP', 'PPP.PPP', '.PPPPP.', '...P...'], { P: '#ff4f86' }, 0, -190, 11)
  x.restore()
}
function lumpy(x, t, cx, by, s = 1) {
  x.save(); x.translate(cx, by); x.scale(s, s)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-120, 0); x.quadraticCurveTo(-150, -90, -96, -150); x.quadraticCurveTo(-30, -200, 30, -160); x.quadraticCurveTo(130, -190, 124, -80); x.quadraticCurveTo(150, -10, 100, 6); x.closePath(); x.fill()
  x.fillStyle = '#ffd36a'; x.beginPath(); x.moveTo(-112, -6); x.quadraticCurveTo(-138, -88, -90, -142); x.quadraticCurveTo(-30, -188, 30, -152); x.quadraticCurveTo(120, -178, 116, -80); x.quadraticCurveTo(138, -14, 96, -2); x.closePath(); x.fill()
  for (const [a, b, r] of [[-60, -110, 0.6], [40, -60, -0.3], [-20, -40, 0.1], [70, -130, 0.9]]) { x.save(); x.translate(a, b); x.rotate(r); R(x, 'rgba(255,255,255,0.6)', -40, -8, 80, 16); x.restore() }
  drawBits(x, ['R...R', '.R.R.', '..R..', '.R.R.'], { R: '#e8283c' }, 20, -170, 12, { rot: 0.4 })
  x.restore()
}

const EP = makePOV({
  id: 'npve18', duration: 17, set: 'kitchen',
  caption: 'you’re dating a *Virgo.* Gift wrap.',
  lines: LINES,
  boxes: [{ from: 0, to: 2, open: 2.2, close: 9.8 }],
  stickers: [
    { at: 4.0, out: [5.95, 6.1], text: 'yours is… *a shape*', x: 540, y: 330, rot: -2.5, size: 46, kind: 'you' },
    { at: 8.5, out: [9.6, 9.8], text: 'it’s *art* now', x: 540, y: 330, rot: 2, size: 50, kind: 'light' },
  ],
  last: { at: T.last, text: 'Perfect corners. *Soft* centre.', color: '#ffd36a' },
  cuts: [T.cut],
  punch: [{ at: 0.2, dur: 1.8, z: 0.08, x: 700, y: 1150 }, { at: T.lift[1] - 0.2, dur: 2.2, z: 0.12, x: 780, y: 820 }],
  pitch: { [VN]: 932.33 },
  scene(x, t) {
    pisces(x, t, { x: 650, y: 560, s: 110, tears: t > T.last ? 3 : t > T.lift[1] ? 2 : 1, mood: t > T.lift[1] ? 'happy' : 'sparkle', look: [0.6, 0.5], pop: pop01(t, -1) })
    // the shelf, with a little spotlight once it's there
    R(x, INK, 600, 880, 420, 22); R(x, '#a8693f', 606, 884, 408, 14)
    if (t > T.lift[1]) { const k = ease.outCubic(prog(t, T.lift[1], T.lift[1] + 0.4)); x.save(); x.globalAlpha = 0.3 * k; x.fillStyle = '#fff2c8'; x.beginPath(); x.moveTo(790, 640); x.lineTo(660, 880); x.lineTo(920, 880); x.fill(); x.restore(); R(x, INK, 760, 620, 60, 30); R(x, '#c9c3e6', 766, 626, 48, 18) }
    let mood = 'squint', look = [0.6, 1]
    if (t > 2.3) { mood = 'happy'; look = [0, 0] }
    if (t > T.lump[1]) { mood = 'wide'; look = [1, 0.6] }
    if (t > 5.0) { mood = 'happy'; look = [0, 0] }
    if (t > T.cut) { mood = 'sparkle'; look = [1, -0.3] }
    if (t > T.last) { mood = 'heart'; look = [0, 0] }
    drawStarChar(x, 330, 1000, 330, t, { color: VI.color, glyph: VI.glyph, mood, look, hops: HOPS, seed: 6, glow: 1.1, blush: t > T.lift[1] ? 1 : 0 })
    neat(x, 330, 1290, 0.95)
    // the ruler, creasing
    if (t < 2.2) { const u = Math.sin(t * 6); x.save(); x.translate(lerp(230, 430, (u + 1) / 2), 1110); x.rotate(-0.1); R(x, INK, -90, -16, 180, 32); R(x, '#ffd36a', -84, -10, 168, 20); for (let i = 0; i < 9; i++) R(x, INK, -80 + i * 20, -10, 3, 10); x.restore() }
    // yours: slides in, then flies up to the shelf
    const li = ease.inOutCubic(prog(t, ...T.lift))
    if (t > T.lump[0]) { const k = ease.outBack(prog(t, ...T.lump)); lumpy(x, t, lerp(lerp(1300, 760, k), 800, li), lerp(1300, 872, li), lerp(1, 0.9, li)) }
    if (t > T.lift[1]) sparkles(x, t, 800, 760, T.lift[1], 12, 200, 1, [GOLD, BONE, HOT])
    if (t > T.last) for (let i = 0; i < 6; i++) { const ph = t - T.last - 0.3 - i * 0.12; if (ph > 0) drawBits(x, HEART, { H: i % 2 ? HOT : GOLD }, 500 + (i - 2.5) * 110 + Math.sin(ph * 4 + i) * 20, 900 - ph * 160, 9, { alpha: clamp(1 - ph / 2.2) }) }
  },
  front(x, t) {
    const r = ease.outCubic(prog(t, ...T.lump)) * outK(t, [4.4, 4.9])
    if (r > 0) drawArm(x, 1300, lerp(1300, 980, r), lerp(1400, 1230, r), { r: 46, by: 1500 })
  },
  cues: [
    ['tick', 0.3, 0.03], ['tick', 0.82, 0.03], ['tick', 1.35, 0.03], ['tick', 1.87, 0.04], ['pop', 2.0, 1174.66, 0.035, -0.3],
    ['whoosh', r3(T.lump[0]), 0.4, 0.03], ['tick', r3(T.lump[1]), 0.05], ['pluck', r3(T.lump[1] + 0.1), 293.66, 0.05, 0.4, 0.3],
    ['whoosh', r3(T.lift[0]), 1.0, 0.025], ['bell', r3(T.lift[1]), 1174.66, 0.03, 1.2, 0.2], ['glitter', r3(T.lift[1]), r3(T.lift[1] + 0.6)],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
