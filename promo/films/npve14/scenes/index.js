// npve14 · POV: You're Dating a ___ · ep 14 · "POV: you're dating a Taurus. Holiday market." (15 s vertical, jazzy · C)
// Story 0–12.6, then the short end card. Rows: promo/films/next30/b43.md. Look: ../../npve01/scenes/datekit.js.
//   0.0–2.3   hook: ♉ TAURUS at a snowy holiday-market stall, eyes shut, savouring a sample. Sticker: "sample *one*".
//   2.3–6.0   (1) it works down the whole tray, slowly, rating each one (8/10 · 9/10 · 10/10, again).
//             YOU: "ooh, the *ginger* one's nice."  Sticker: "every. single. *sample.*"
//   6.2       card cut.
//   6.3–9.8   (2, the turn) it comes back with a whole ribboned box: GINGER. TAURUS: "a whole box. *yours.*"
//             Sticker: "it was *listening*".
//   10.0      Last line: "Sampled it all. *Bought* yours."  Pisces, behind the next stall, cries happy tears all film.
import { makePOV, drawStarChar, signStar, drawBits, HEART, sparkles, pisces, beanie, R, pop01, outK, prog, ease, lerp, clamp, INK, BONE, GOLD, HOT, INTER, r3 } from '../../npve01/scenes/datekit.js'
import { talkHops } from '../../startalk.js'

const TA = signStar('taurus'), TN = `${TA.glyph}︎ TAURUS`, YN = 'YOU'
const T = { taste: [0.0, 2.6, 3.3, 4.0], cut: 6.2, box: [6.5, 7.1], last: 10.0 }
const LINES = [
  { t: 4.5, speaker: YN, text: 'ooh, the *ginger* one’s nice.', color: '#c9a6ff' },
  { t: 7.2, speaker: TN, text: 'a whole box. *yours.*', color: '#9fe6b0' },
]
const HOPS = [...T.taste.slice(1), ...talkHops(LINES, TN), T.box[1], T.last + 0.3, T.last + 0.8]
const RATE = ['8/10', '9/10', '10/10', '10/10 (again)']

function tray(x, t) {
  if (t > T.cut) return
  x.save(); x.translate(790, 1110); x.rotate(-0.05)
  R(x, INK, -150, -20, 300, 40); R(x, '#c89a62', -144, -16, 288, 30)
  for (let i = 0; i < 4; i++) { const gone = t > T.taste[i] + 0.4; R(x, INK, -126 + i * 66, -64, 50, 48); R(x, '#fff8ef', -122 + i * 66, -60, 42, 42); if (!gone) R(x, ['#ffd36a', '#c87a3a', '#e8b36a', '#ff9ec8'][i], -116 + i * 66, -56, 30, 22) }
  x.restore()
}
function giftBox(x, t) {
  const k = pop01(t, T.box[0], 0.4, 2.2)
  if (t < T.box[0] || k <= 0.01) return
  x.save(); x.translate(800, 1130); x.scale(k, k); x.rotate(0.05 * Math.sin(t * 2))
  R(x, INK, -140, -110, 280, 220); R(x, '#d8344f', -134, -104, 268, 208); R(x, GOLD, -18, -104, 36, 208); R(x, GOLD, -134, -18, 268, 36)
  drawBits(x, ['GG...GG', 'GGG.GGG', '.GGGGG.', '...G...'], { G: GOLD }, 0, -130, 12)
  R(x, INK, -110, 34, 220, 54); R(x, '#fff8ef', -106, 38, 212, 46); x.fillStyle = INK; x.font = `800 32px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('GINGER', 0, 62)
  x.restore()
}

const EP = makePOV({
  id: 'npve14', duration: 15, set: 'market',
  caption: 'you’re dating a *Taurus.* Holiday market.',
  captionSize: 42,
  lines: LINES,
  boxes: [{ from: 0, to: 2, open: 4.3, close: 9.8 }],
  stickers: [
    { at: 2.7, out: [5.9, 6.1], text: 'every. single. *sample.*', x: 540, y: 330, rot: -2.5, size: 46, kind: 'dark' },
    { at: 8.4, out: [9.6, 9.8], text: 'it was *listening*', x: 540, y: 330, rot: 2, size: 48, kind: 'you' },
  ],
  last: { at: T.last, text: 'Sampled it all. *Bought* yours.', color: '#ffd36a' },
  cuts: [T.cut],
  punch: [{ at: T.box[0], dur: 1.8, z: 0.12, x: 700, y: 1080 }],
  pitch: { [TN]: 523.25, [YN]: 587.33 },
  scene(x, t) {
    pisces(x, t, { x: 140, y: 1050, s: 125, tears: t > T.last ? 3 : t > T.box[0] ? 2 : 1, mood: t > T.box[0] ? 'happy' : 'sparkle', look: [1, 0], pop: pop01(t, -1) })
    const n = T.taste.filter(a => t > a).length - 1
    const since = t - T.taste[Math.max(0, n)]
    let mood = since < 0.9 ? 'heart' : 'happy', look = [0.6, 0.5]
    if (t > 4.4) { mood = 'wide'; look = [0, 0] }
    if (t > 5.2) mood = 'squint'
    if (t > T.cut) { mood = 'sparkle'; look = [0.5, 0.3] }
    if (t > T.last) { mood = 'heart'; look = [0, 0] }
    const o = { x: 480, y: 1060, s: 350, hops: HOPS, seed: 4 }
    drawStarChar(x, o.x, o.y, o.s, t, { color: TA.color, glyph: TA.glyph, mood, look, hops: HOPS, seed: 4, glow: 1.1, blush: t > T.box[1] ? 1 : 0 })
    beanie(x, t, o, '#3fb08a', '#d8344f')
    tray(x, t); giftBox(x, t)
    // the ratings
    T.taste.forEach((a, i) => { if (t < T.cut) { const k = pop01(t, a + 0.45, 0.25, 2.6) * outK(t, [i < 3 ? T.taste[i + 1] + 0.3 : 5.9, i < 3 ? T.taste[i + 1] + 0.5 : 6.1]); if (k > 0.01 && t > a + 0.45) { x.save(); x.translate(430 + (i % 2) * 120, 720 - i * 10); x.rotate(i % 2 ? 0.08 : -0.08); x.scale(k, k); x.font = `800 ${i === 3 ? 40 : 54}px ${INTER}`; const w = x.measureText(RATE[i]).width + 40; R(x, INK, -w / 2 - 5, -40, w + 10, 80); R(x, i >= 2 ? GOLD : BONE, -w / 2, -35, w, 70); x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(RATE[i], 0, 2); x.restore() } } })
    if (t > T.box[1]) sparkles(x, t, 800, 1100, T.box[1], 12, 200, 1, [GOLD, BONE, HOT])
    if (t > T.last) for (let i = 0; i < 6; i++) { const ph = t - T.last - 0.3 - i * 0.12; if (ph > 0) drawBits(x, HEART, { H: i % 2 ? HOT : GOLD }, 540 + (i - 2.5) * 110 + Math.sin(ph * 4 + i) * 20, 900 - ph * 160, 9, { alpha: clamp(1 - ph / 2.2) }) }
  },
  cues: [
    ...T.taste.map((a, i) => ['pop', r3(Math.max(0.05, a + 0.45)), [783.99, 880, 1046.5, 1174.66][i], 0.04, i % 2 ? 0.3 : -0.3]),
    ['whoosh', r3(T.box[0] - 0.1), 0.4, 0.035], ['bell', r3(T.box[1]), 1567.98, 0.03, 1.2, 0], ['glitter', r3(T.box[1]), r3(T.box[1] + 0.6)],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
