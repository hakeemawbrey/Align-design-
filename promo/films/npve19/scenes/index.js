// npve19 · POV: You're Dating a ___ · ep 19 · "POV: you're dating a Libra. Hosting." (17 s vertical, cinematic · F)
// Story 0–12.6, then the shared end card. Rows: promo/films/next30/b43.md. Look: ../../npve01/scenes/datekit.js.
//   0.0–2.3   hook: ♎ LIBRA across a busy holiday party, tray in hand, flashing you a pixel thumbs-up: "you good?"
//   2.3–6.0   (1) it hosts the whole room (snacks, coats, introductions) and checks on you across it, again and again.
//             LIBRA: "everyone has a drink? *great.* you good?"  Sticker: "hosting *everyone*. checking on *you*."
//   6.2       card cut.
//   6.3–9.8   (2, the turn) it slips away to the window and pats the cosy armchair it kept free.
//             LIBRA: "saved you the *quiet* seat."  Sticker: "the *best* seat in the house".
//   10.0      Last line: "Hosts the room. *Saves* you a seat."  Pisces, among the guests, cries happy tears all film.
import { makePOV, drawStarChar, signStar, drawBits, HEART, sparkles, pisces, bubble, R, pop01, outK, prog, ease, lerp, clamp, INK, BONE, GOLD, HOT, r3 } from '../../npve01/scenes/datekit.js'
import { talkHops } from '../../startalk.js'

const LI = signStar('libra'), LN = `${LI.glyph}︎ LIBRA`
const T = { checks: [0, 3.4, 5.0], cut: 6.2, walk: [6.3, 7.0], pat: 7.4, last: 10.0 }
const LINES = [
  { t: 2.4, speaker: LN, text: 'snacks for everyone? *great.* you good?', color: '#ff9ec8' },
  { t: 7.5, speaker: LN, text: 'saved you the *quiet* seat.', color: '#ff9ec8' },
]
const HOPS = [0.2, ...T.checks.slice(1), ...talkHops(LINES, LN), T.pat, T.pat + 0.3, T.last + 0.3, T.last + 0.8]
const THUMB = ['..TT...', '..TT...', '.TTT...', 'TTTTTTT', 'TTTTTTT', 'TTTTTT.', 'TTTTT..']
const GUESTS = [['aries', 380, 1060], ['taurus', 520, 1110], ['capricorn', 150, 1120], ['aquarius', 940, 1110]]

function armchair(x, cx, by) {
  R(x, INK, cx - 170, by - 260, 340, 270); R(x, '#5f8ad8', cx - 162, by - 252, 324, 140); R(x, '#4a70c0', cx - 162, by - 112, 324, 110)
  R(x, INK, cx - 200, by - 160, 70, 170); R(x, '#5f8ad8', cx - 194, by - 154, 58, 158); R(x, INK, cx + 130, by - 160, 70, 170); R(x, '#5f8ad8', cx + 136, by - 154, 58, 158)
  // a little cushion with a heart
  R(x, INK, cx - 60, by - 200, 120, 90); R(x, '#fff8ef', cx - 54, by - 194, 108, 78); drawBits(x, HEART, { H: HOT }, cx, by - 155, 6)
}

const EP = makePOV({
  id: 'npve19', duration: 17, set: 'party',
  caption: 'you’re dating a *Libra.* Hosting.',
  lines: LINES,
  boxes: [{ from: 0, to: 2, open: 2.2, close: 9.8 }],
  stickers: [
    { at: 4.0, out: [5.95, 6.1], text: 'hosting *everyone*. checking on *you*.', x: 540, y: 330, rot: -2.5, size: 40, kind: 'dark' },
    { at: 8.6, out: [9.6, 9.8], text: 'the *best* seat in the house', x: 540, y: 330, rot: 2, size: 44, kind: 'you' },
  ],
  last: { at: T.last, text: 'Hosts the room. *Saves* you a seat.', color: '#ffd36a' },
  cuts: [T.cut],
  punch: [{ at: T.walk[1], dur: 2.6, z: 0.1, x: 760, y: 1000 }],
  pitch: { [LN]: 783.99 },
  scene(x, t) {
    const after = t > T.cut
    if (after) armchair(x, 820, 1200)
    if (!after) GUESTS.forEach(([id, gx, gy], i) => { const S = signStar(id); drawStarChar(x, gx, gy, 170, t, { color: S.color, glyph: S.glyph, mood: ['happy', 'sparkle', 'happy', 'wink'][i], look: [i % 2 ? -1 : 1, 0], hops: [0.5 + i * 0.7, 2.5 + i * 0.9, 4.3 + i * 0.5], seed: 30 + i, glow: 0.7 }) })
    pisces(x, t, after ? { x: 450, y: 1080, s: 120, tears: t > T.last ? 3 : 2, mood: 'happy', look: [1, 0], pop: 1 } : { x: 660, y: 1080, s: 130, tears: 2, mood: 'sparkle', look: [-1, 0], pop: pop01(t, -1) })
    let px = 760, py = 960, s = 250, mood = 'happy', look = [0, 0]
    if (!after) { px = 760 + 40 * Math.sin(t * 0.9); if (t > 3.0 && t < 3.4) look = [-1, 0]; if (t > 4.4 && t < 5.0) look = [1, 0] }
    else { const k = ease.inOutCubic(prog(t, ...T.walk)); px = lerp(760, 600, k); py = lerp(960, 1010, k); s = lerp(250, 330, k); mood = t > T.pat ? 'sparkle' : 'happy'; look = t > T.pat && t < 8.3 ? [1, 0.4] : [0, 0] }
    if (t > T.last) mood = 'heart'
    drawStarChar(x, px, py, s, t, { color: LI.color, glyph: LI.glyph, mood, look, hops: HOPS, seed: 8, glow: 1.1, blush: t > T.pat ? 1 : 0 })
    if (!after) {
      // the snack tray, carried high
      x.save(); x.translate(px + 150, py - 100); x.rotate(0.05 * Math.sin(t * 3)); R(x, INK, -90, -10, 180, 20); R(x, '#c9c3e6', -84, -6, 168, 12); for (let i = 0; i < 4; i++) R(x, ['#ffd36a', '#ff9ec8', '#9fe6b0', '#ffb36a'][i], -70 + i * 40, -34, 26, 26); x.restore()
      // the check-ins: a thumbs-up and a "you good?" each time
      T.checks.forEach((a, i) => { const k = (i === 0 ? 1 : pop01(t, a, 0.3, 2.4)) * outK(t, [a + 1.1, a + 1.3]); if (k > 0.01 && (t > a || i === 0)) { drawBits(x, THUMB, { T: GOLD }, px - 150, py - 210, 12 * k); bubble(x, t, px - 10, py - 330, i === 0 ? -1 : a, 'you good?', { size: 36, col: '#ff9ec8', out: [a + 1.1, a + 1.3] }) } })
    }
    if (t > T.pat) sparkles(x, t, 820, 1050, T.pat, 10, 160, 1, [GOLD, BONE, HOT])
    if (t > T.last) for (let i = 0; i < 6; i++) { const ph = t - T.last - 0.3 - i * 0.12; if (ph > 0) drawBits(x, HEART, { H: i % 2 ? HOT : GOLD }, 640 + (i - 2.5) * 100 + Math.sin(ph * 4 + i) * 20, 900 - ph * 160, 9, { alpha: clamp(1 - ph / 2.2) }) }
  },
  cues: [
    ['pop', 0.2, 1046.5, 0.04, 0.3],
    ...T.checks.slice(1).map((a, i) => ['pop', r3(a + 0.05), [1174.66, 1396.91][i], 0.045, 0.3]),
    ['whoosh', r3(T.walk[0]), 0.7, 0.025], ['tick', r3(T.pat), 0.05], ['tick', r3(T.pat + 0.3), 0.05], ['bell', r3(T.pat + 0.4), 1396.91, 0.028, 1.2, 0.3],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
