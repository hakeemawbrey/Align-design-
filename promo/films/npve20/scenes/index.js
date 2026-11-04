// npve20 · POV: You're Dating a ___ · ep 20 · "POV: you're dating a Scorpio. The gift." (15 s vertical, screwed · Fm)
// Story 0–12.6, then the short end card. Rows: promo/films/next30/b43.md. Look: ../../npve01/scenes/datekit.js.
//   0.0–2.3   hook: ♏ SCORPIO on the sofa, holding out a wrapped gift, staring. Very serious.
//   2.3–6.0   (1) the lid pops: the frog mug you pointed at in a shop window once, months ago.
//             SCORPIO: "you saw it in *March.*"  Sticker: "you mentioned it *once*".
//   6.2       card cut.
//   6.3–9.8   (2, the turn) you go "!!"; it looks away, blushing hard. SCORPIO: "it's *nothing.*"
//             Sticker: "it is *not* nothing".
//   10.0      Last line: "Listened *once.* Remembered forever."  Pisces, outside the window, cries happy tears all film.
import { makePOV, drawStarChar, signStar, drawBits, HEART, sparkles, pisces, bubble, R, pop01, outK, prog, ease, lerp, clamp, INK, BONE, GOLD, HOT, YOU, r3 } from '../../npve01/scenes/datekit.js'
import { talkHops } from '../../startalk.js'

const SC = signStar('scorpio'), SN = `${SC.glyph}︎ SCORPIO`
const T = { open: 2.5, rise: [2.7, 3.4], cut: 6.2, away: 7.0, last: 10.0 }
const LINES = [
  { t: 3.6, speaker: SN, text: 'you saw it in *March.*', color: '#ff6a8a' },
  { t: 7.2, speaker: SN, text: 'it’s *nothing.*', color: '#ff6a8a' },
]
const HOPS = [T.open, ...talkHops(LINES, SN), T.away, T.last + 0.3, T.last + 0.8]

function frogMug(x, t, cx, by, s = 1) {
  x.save(); x.translate(cx, by); x.scale(s, s)
  R(x, INK, -70, -150, 140, 156); R(x, '#5fc46a', -64, -144, 128, 144); R(x, '#4aa856', -64, -30, 128, 30)
  R(x, INK, 64, -116, 44, 70); R(x, '#5fc46a', 70, -108, 26, 54); R(x, INK, 70, -96, 12, 30)
  for (const d of [-1, 1]) { x.fillStyle = INK; x.beginPath(); x.arc(d * 38, -150, 30, 0, Math.PI * 2); x.fill(); x.fillStyle = '#5fc46a'; x.beginPath(); x.arc(d * 38, -150, 24, 0, Math.PI * 2); x.fill(); x.fillStyle = '#fff'; x.beginPath(); x.arc(d * 38, -150, 14, 0, Math.PI * 2); x.fill(); R(x, INK, d * 38 - 5, -156, 10, 12) }
  x.strokeStyle = INK; x.lineWidth = 6; x.beginPath(); x.arc(0, -96, 30, 0.2, Math.PI - 0.2); x.stroke()
  R(x, '#ff9ec8', -48, -90, 18, 10); R(x, '#ff9ec8', 30, -90, 18, 10)
  x.restore()
}
function gift(x, t, cx, by) {
  const lid = ease.outCubic(prog(t, T.open, T.open + 0.4))
  R(x, INK, cx - 130, by - 170, 260, 176); R(x, '#2a1a36', cx - 124, by - 164, 248, 164); R(x, '#d8344f', cx - 14, by - 164, 28, 164)
  x.save(); x.translate(cx + lid * 520, by - 170 - lid * 900); x.rotate(lid * 1.4)
  R(x, INK, -146, -40, 292, 46); R(x, '#3a2346', -140, -34, 280, 34); R(x, '#d8344f', -14, -34, 28, 34)
  drawBits(x, ['RR...RR', 'RRR.RRR', '.RRRRR.', '...R...'], { R: '#d8344f' }, 0, -58, 11)
  x.restore()
}

const EP = makePOV({
  id: 'npve20', duration: 15, set: 'sofa',
  caption: 'you’re dating a *Scorpio.* The gift.',
  lines: LINES,
  boxes: [{ from: 0, to: 2, open: 3.4, close: 9.8 }],
  stickers: [
    { at: 4.6, out: [5.95, 6.1], text: 'you mentioned it *once*', x: 540, y: 330, rot: -2.5, size: 46, kind: 'light' },
    { at: 8.4, out: [9.6, 9.8], text: 'it is *not* nothing', x: 540, y: 330, rot: 2, size: 48, kind: 'you' },
  ],
  last: { at: T.last, text: 'Listened *once.* Remembered forever.', color: '#ffd36a' },
  cuts: [T.cut],
  punch: [{ at: T.rise[0], dur: 1.8, z: 0.14, x: 700, y: 1080 }, { at: T.away, dur: 2.4, z: 0.1, x: 480, y: 980 }],
  pitch: { [SN]: 466.16 },
  scene(x, t) {
    pisces(x, t, { x: 300, y: 690, s: 120, tears: t > T.last ? 3 : t > T.rise[1] ? 2 : 1, mood: t > T.rise[1] ? 'happy' : 'sparkle', look: [1, 0.3], pop: pop01(t, -1) })
    let mood = 'neutral', look = [0, 0], blink = false
    if (t > T.rise[1]) { mood = 'squint'; look = [1, 0.4]; blink = undefined }
    if (t > 5.0) { mood = 'neutral'; look = [0, 0] }
    if (t > T.away) { mood = 'happy'; look = [-1, 0.5] }
    if (t > T.last) { mood = 'heart'; look = [0, 0] }
    drawStarChar(x, 440, 1000, 350, t, { color: SC.color, glyph: SC.glyph, mood, look, blink, hops: HOPS, seed: 11, glow: 1.1, blush: t > T.away - 0.2 ? 1 : 0 })
    gift(x, t, 730, 1250)
    if (t > T.rise[0]) frogMug(x, t, 730, lerp(1250, 1020, ease.outBack(prog(t, ...T.rise))), 1.1)
    if (t > T.rise[1]) sparkles(x, t, 730, 880, T.rise[1] - 0.2, 12, 200, 1, [GOLD, BONE, '#5fc46a'])
    if (t > T.cut) bubble(x, t, 760, 640, T.cut + 0.15, '!!', { size: 64, col: YOU, out: [6.9, 7.1] })
    if (t > T.away + 0.3 && t < T.last) { x.save(); x.globalAlpha = 0.8; for (let i = 0; i < 3; i++) R(x, '#ff6a8a', 300 + i * 30 + 8 * Math.sin(t * 6 + i), 800 - i * 20, 14, 14); x.restore() }
    if (t > T.last) for (let i = 0; i < 6; i++) { const ph = t - T.last - 0.3 - i * 0.12; if (ph > 0) drawBits(x, HEART, { H: i % 2 ? HOT : GOLD }, 520 + (i - 2.5) * 110 + Math.sin(ph * 4 + i) * 20, 900 - ph * 160, 9, { alpha: clamp(1 - ph / 2.2) }) }
  },
  cues: [
    ['tick', 1.0, 0.03], ['tick', 2.0, 0.03],
    ['pop', r3(T.open), 932.33, 0.05, 0.3], ['whoosh', r3(T.open), 0.4, 0.03], ['riser', r3(T.rise[0]), r3(T.rise[1]), 0.014], ['bell', r3(T.rise[1]), 1396.91, 0.03, 1.2, 0.2], ['glitter', r3(T.rise[1]), r3(T.rise[1] + 0.6)],
    ['pop', r3(T.cut + 0.15), 1567.98, 0.05, 0], ['whoosh', r3(T.away), 0.25, 0.03],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
