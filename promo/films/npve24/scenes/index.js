// npve24 · POV: You're Dating a ___ · ep 24 · "POV: you're dating a Pisces. The gift." (15 s vertical, dreamy · Gb)
// Story 0–12.6, then the short end card. Rows: promo/films/next30/b43.md. Look: ../../npve01/scenes/datekit.js.
//   0.0–2.3   hook: ♓ PISCES by the tree, sobbing while it wraps a present, tape stuck everywhere.
//   2.3–6.0   (1) still crying, it pushes the present to you. PISCES: "I'm FINE. *open it.*"
//             Sticker: "it cried at the *wrapping paper*".
//   6.2       card cut.
//   6.3–9.8   (2, the turn) inside: a framed drawing of your first date (two stars at a café table). Your tears roll
//             down the lens. PISCES: "our *first* date."  Sticker: "now *you're* crying".
//   10.0      Last line: "Now we're *both* crying."
import { makePOV, drawStarChar, signStar, drawBits, HEART, sparkles, pisces, R, pop01, outK, prog, ease, lerp, clamp, INK, BONE, GOLD, HOT, YOU, r3 } from '../../npve01/scenes/datekit.js'
import { inSprite, starFrame } from '../../npve01/scenes/datekit.js'
import { talkHops } from '../../startalk.js'

const PI = signStar('pisces'), PN = `${PI.glyph}︎ PISCES`
const T = { push: [2.4, 3.0], cut: 6.2, open: [6.4, 7.1], tears: 7.4, last: 10.0 }
const LINES = [
  { t: 3.1, speaker: PN, text: 'I’m FINE. *open it.*', color: '#b9a4ff' },
  { t: 7.3, speaker: PN, text: 'our *first* date.', color: '#b9a4ff' },
]
const HOPS = [0.3, 0.9, 1.5, ...talkHops(LINES, PN), T.open[1], T.last + 0.3, T.last + 0.8]

function present(x, t, cx, cy, s = 1) {
  x.save(); x.translate(cx, cy); x.scale(s, s); x.rotate(-0.04)
  R(x, INK, -150, -120, 300, 240); R(x, '#3fb08a', -144, -114, 288, 228); R(x, '#d8344f', -14, -114, 28, 228); R(x, '#d8344f', -144, -14, 288, 28)
  // far too much tape
  for (const [a, b, r] of [[-90, -80, 0.5], [70, -60, -0.4], [-40, 60, 0.2], [100, 70, 0.9], [0, -100, 0], [-110, 20, -0.7], [40, 20, 0.3]]) { x.save(); x.translate(a, b); x.rotate(r); R(x, 'rgba(230,240,255,0.75)', -46, -9, 92, 18); x.restore() }
  drawBits(x, ['RR...RR', 'RRR.RRR', '.RRRRR.', '...R...'], { R: '#d8344f' }, 0, -142, 12)
  x.restore()
}
function frame(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(0.03 * Math.sin(t * 1.5))
  R(x, INK, -200, -160, 400, 320); R(x, GOLD, -192, -152, 384, 304); R(x, '#b8892e', -180, -140, 360, 280); R(x, '#fff8ef', -168, -128, 336, 256)
  // a crayon drawing: a café table, two stars, a heart, wobbly
  R(x, '#c87a3a', -120, 50, 240, 14); R(x, '#c87a3a', -10, 64, 14, 50)
  drawStarChar(x, -70, 0, 110, t, { color: PI.color, mood: 'happy', look: [1, 0], seed: 6, tips: false, bob: 0 })
  drawStarChar(x, 70, 0, 110, t, { color: YOU, mood: 'happy', look: [-1, 0], seed: 3, tips: false, bob: 0 })
  drawBits(x, HEART, { H: HOT }, 0, -70, 7)
  x.fillStyle = '#7a4a9a'; x.font = `italic 500 30px 'EB Garamond', Georgia, serif`; x.textAlign = 'center'; x.fillText('us, date one', 0, 108)
  x.restore()
}

const EP = makePOV({
  id: 'npve24', duration: 15, set: 'party',
  caption: 'you’re dating a *Pisces.* The gift.',
  lines: LINES,
  boxes: [{ from: 0, to: 2, open: 2.9, close: 9.8 }],
  stickers: [
    { at: 4.2, out: [5.95, 6.1], text: 'it cried at the *wrapping paper*', x: 540, y: 330, rot: -2.5, size: 42, kind: 'dark' },
    { at: 8.0, out: [9.6, 9.8], text: 'now *you’re* crying', x: 540, y: 330, rot: 2, size: 48, kind: 'hot' },
  ],
  last: { at: T.last, text: 'Now we’re *both* crying.', color: '#ffd36a' },
  cuts: [T.cut],
  punch: [{ at: T.open[0], dur: 2.6, z: 0.12, x: 660, y: 1000 }],
  pitch: { [PN]: 739.99 },
  scene(x, t) {
    const o = { x: 420, y: 1000, s: 340, hops: HOPS, seed: 6 }
    let tears = 3, mood = 'sparkle', look = [0.6, 0.6]
    if (t > T.push[0]) { tears = 2; look = [0, 0]; mood = 'wide' }
    if (t > T.cut) { tears = 2; mood = 'happy'; look = [1, 0.3] }
    if (t > T.last) { tears = 3; mood = 'heart'; look = [0, 0] }
    pisces(x, t, { ...o, tears, mood, look, pop: pop01(t, -1) })
    // tape stuck on Pisces itself
    inSprite(x, starFrame(o.x, o.y, o.s, t, o), () => { for (const [a, b, r] of [[6, 14, 0.6], [27, 26, -0.4]]) { x.save(); x.translate(a, b); x.rotate(r); x.fillStyle = 'rgba(230,240,255,0.8)'; x.fillRect(-3, -0.6, 6, 1.2); x.restore() } })
    if (t < T.open[0]) { const k = ease.outCubic(prog(t, ...T.push)); present(x, t, lerp(700, 690, k), lerp(1130, 1210, k), lerp(0.9, 1.15, k)) }
    else { const k = ease.outBack(prog(t, ...T.open)); if (k < 0.95) present(x, t, 690, 1210 + 1100 * k, 1.15); frame(x, t, 690, lerp(1300, 1040, k), k) }
    if (t > T.open[1]) sparkles(x, t, 690, 1040, T.open[1], 12, 240, 1, [GOLD, BONE, HOT])
    if (t > T.last) for (let i = 0; i < 6; i++) { const ph = t - T.last - 0.3 - i * 0.12; if (ph > 0) drawBits(x, HEART, { H: i % 2 ? HOT : '#8fe3ff' }, 540 + (i - 2.5) * 110 + Math.sin(ph * 4 + i) * 20, 860 - ph * 160, 9, { alpha: clamp(1 - ph / 2.2) }) }
  },
  front(x, t) {
    // your tears, rolling down the lens
    if (t > T.tears) for (let i = 0; i < 5; i++) { const ph = ((t - T.tears - i * 0.45) / 1.8); if (ph <= 0) continue; const q = ph % 1, px = [140, 940, 230, 880, 80][i], py = 260 + q * 1300; x.save(); x.globalAlpha = 0.8 * outK(t, [12.2, 12.6]); x.fillStyle = 'rgba(160,220,255,0.85)'; x.beginPath(); x.ellipse(px, py, 28, 42, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = 'rgba(255,255,255,0.85)'; x.fillRect(px - 8, py - 18, 8, 10); x.fillStyle = 'rgba(160,220,255,0.35)'; x.fillRect(px - 9, py - 300 * q, 18, 300 * q); x.restore() }
  },
  cues: [
    ['pluck', 0.3, 739.99, 0.03, 0.6, 0], ['tick', 0.6, 0.03], ['tick', 1.2, 0.03], ['tick', 1.8, 0.03],
    ['whoosh', r3(T.push[0]), 0.4, 0.03], ['tick', r3(T.push[1]), 0.05],
    ['whoosh', r3(T.open[0]), 0.6, 0.03], ['bell', r3(T.open[1]), 1479.98, 0.03, 1.4, 0], ['glitter', r3(T.open[1]), r3(T.open[1] + 0.6)], ['pluck', r3(T.tears), 554.37, 0.03, 0.8, 0],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
