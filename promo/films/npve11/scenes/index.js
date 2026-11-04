// npve11 · POV: You're Dating a ___ · ep 11 · "POV: you're dating an Aquarius." (20 s vertical, house · G)
// Story 0–15.6, then the shared end card. Rows: promo/films/next30/b43.md. Look: ../../npve01/scenes/datekit.js.
//   0.0–2.3   hook: ♒ AQUARIUS at a snowy bus stop, holding out a homemade gadget (gears, a crank, a spout).
//   2.3–5.6   (1) AQUARIUS: "date idea: we each bring *one weird fact.*"  Its fact pops up: a group of flamingos
//             is called a flamboyance (true). Sticker: "first date: *fact swap*".
//   5.6–9.0   (2) it cranks the gadget: it pours you cocoa… one… drop… at a time. AQUARIUS: "I *made* you a gift."
//             Sticker: "it pours cocoa. *slowly.*"
//   9.15      card cut.
//   9.3–12.7  (3, the twist) the mug finally fills; it looks away, quiet. AQUARIUS: "I like you. *specifically.*"
//             Sticker: "the weirdest *sweet* thing".
//   12.95     Last line: "Weird *together* is the best kind."  Pisces, on the bench, cries happy tears all film.
import { makePOV, drawStarChar, signStar, drawBits, HEART, sparkles, pisces, bubble, beanie, mug, R, pop01, outK, prog, ease, lerp, clamp, INK, BONE, GOLD, HOT, INTER, r3 } from '../../npve01/scenes/datekit.js'
import { talkHops } from '../../startalk.js'

const AQ = signStar('aquarius'), QN = `${AQ.glyph}︎ AQUARIUS`
const T = { fact: 3.6, crank: 5.7, full: 10.2, cut: 9.15, last: 12.95 }
const LINES = [
  { t: 2.4, speaker: QN, text: 'date idea: we each bring *one weird fact.*', color: '#7fe0ff' },
  { t: 6.0, speaker: QN, text: 'I *made* you a gift.', color: '#7fe0ff' },
  { t: 10.6, speaker: QN, text: 'I like you. *specifically.*', color: '#7fe0ff' },
]
const HOPS = [...talkHops(LINES, QN), T.full, T.last + 0.3, T.last + 0.8]

function stop(x) {
  // a bus-stop shelter and bench
  R(x, INK, 70, 600, 20, 570); R(x, '#5a5470', 74, 600, 12, 570); R(x, INK, 60, 580, 420, 30); R(x, '#5a5470', 64, 584, 412, 22)
  R(x, INK, 120, 620, 120, 80); R(x, '#3fb08a', 126, 626, 108, 68); x.fillStyle = '#fff8ef'; x.font = `800 34px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('BUS', 180, 661)
  R(x, INK, 40, 1080, 520, 40); R(x, '#8a5a3a', 46, 1084, 508, 30); R(x, INK, 70, 1110, 20, 70); R(x, INK, 500, 1110, 20, 70)
}
function gadget(x, t, cx, cy) {
  const crank = t > T.crank ? (t - T.crank) * 5 : 0
  R(x, INK, cx - 110, cy - 90, 220, 180); R(x, '#c9d4ff', cx - 104, cy - 84, 208, 168); R(x, '#9aa8e8', cx - 104, cy + 50, 208, 34)
  for (const [gx, gy, r, d] of [[-40, -20, 34, 1], [30, 10, 26, -1]]) { x.save(); x.translate(cx + gx, cy + gy); x.rotate(crank * d); for (let i = 0; i < 8; i++) { x.rotate(Math.PI / 4); R(x, INK, -6, -r - 12, 12, 16) } x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 4, 0, Math.PI * 2); x.fill(); x.fillStyle = GOLD; x.beginPath(); x.arc(0, 0, r, 0, Math.PI * 2); x.fill(); x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 8, 0, Math.PI * 2); x.fill(); x.restore() }
  // crank on the side
  x.save(); x.translate(cx + 110, cy - 30); x.rotate(crank); R(x, INK, -6, -6, 70, 12); R(x, '#ff4f86', 56, -14, 24, 28); x.restore()
  // spout + drip
  R(x, INK, cx - 130, cy + 30, 40, 24); R(x, '#c9d4ff', cx - 126, cy + 34, 36, 16)
  if (t > T.crank + 0.4 && t < T.full) { const ph = ((t - T.crank) * 1.6) % 1; R(x, '#7a4a2f', cx - 116, cy + 60 + ph * 120, 12, 18) }
  // antenna, because of course
  R(x, INK, cx + 40, cy - 150, 8, 64); x.fillStyle = (t * 2) % 1 < 0.5 ? '#ff4f86' : '#ffd36a'; x.beginPath(); x.arc(cx + 44, cy - 156, 14, 0, Math.PI * 2); x.fill()
}

const EP = makePOV({
  id: 'npve11', duration: 20, set: 'street',
  caption: 'you’re dating an *Aquarius.*',
  lines: LINES,
  boxes: [{ from: 0, to: 3, open: 2.2, close: 12.75 }],
  stickers: [
    { at: 4.6, out: [5.4, 5.6], text: 'first date: *fact swap*', x: 540, y: 330, rot: -2.5, size: 44, kind: 'light' },
    { at: 7.2, out: [8.9, 9.05], text: 'it pours cocoa. *slowly.*', x: 540, y: 330, rot: 2.5, size: 46, kind: 'dark' },
    { at: 11.3, out: [12.6, 12.8], text: 'the weirdest *sweet* thing', x: 540, y: 330, rot: -2, size: 44, kind: 'you' },
  ],
  last: { at: T.last, text: 'Weird *together* is the best kind.', color: '#7fe0ff' },
  cuts: [T.cut],
  punch: [{ at: T.crank, dur: 2.0, z: 0.12, x: 760, y: 1100 }, { at: T.full, dur: 2.0, z: 0.1, x: 480, y: 1000 }],
  pitch: { [QN]: 783.99 },
  scene(x, t) {
    stop(x)
    pisces(x, t, { x: 200, y: 1010, s: 120, tears: t > T.last ? 3 : t > T.full ? 2 : 1, mood: t > T.full ? 'happy' : 'sparkle', look: [1, 0], pop: pop01(t, -1) })
    let mood = 'sparkle', look = [0, 0]
    if (t > 2.3) mood = 'happy'
    if (t > T.fact) { mood = 'wide'; look = [-0.5, -1] }
    if (t > T.crank) { mood = 'squint'; look = [1, 0.6] }
    if (t > T.full) { mood = 'happy'; look = [-1, 0.4] }
    if (t > T.last) { mood = 'heart'; look = [0, 0] }
    const o = { x: 480, y: 1030, s: 340, hops: HOPS, seed: 14 }
    drawStarChar(x, o.x, o.y, o.s, t, { color: AQ.color, glyph: AQ.glyph, mood, look, hops: HOPS, seed: 14, glow: 1.1, blush: t > T.full ? 1 : 0 })
    beanie(x, t, o, '#5fb8ff', '#ff4f86')
    gadget(x, t, 820, 1010)
    // your mug under the spout, filling
    const fill = prog(t, T.crank + 0.4, T.full)
    mug(x, t, 704, 1290, '#fff8ef', 1.0)
    R(x, '#7a4a2f', 704 - 38, 1290 - 12 - 76 * fill, 76, 76 * fill)
    if (t > T.full) sparkles(x, t, 704, 1220, T.full, 10, 140, 1, [GOLD, BONE, HOT])
    bubble(x, t, 500, 640, T.fact, 'a group of flamingos is a “flamboyance”', { size: 30, col: '#7fe0ff', out: [5.4, 5.65] })
    if (t > T.last) { sparkles(x, t, 480, 980, T.last + 0.35, 12, 240, 1, ['#7fe0ff', GOLD, BONE]); for (let i = 0; i < 6; i++) { const ph = t - T.last - 0.3 - i * 0.12; if (ph > 0) drawBits(x, HEART, { H: i % 2 ? HOT : GOLD }, 520 + (i - 2.5) * 110 + Math.sin(ph * 4 + i) * 20, 900 - ph * 160, 9, { alpha: clamp(1 - ph / 2.2) }) } }
  },
  cues: [
    ['pop', r3(T.fact), 1174.66, 0.04, -0.2], ['glitter', r3(T.fact), r3(T.fact + 0.4)],
    ...Array.from({ length: 10 }, (_, i) => ['tick', r3(T.crank + 0.2 + i * 0.4), 0.025]),
    ...Array.from({ length: 7 }, (_, i) => ['pluck', r3(T.crank + 0.9 + i * 0.62), 1567.98 - i * 40, 0.02, 0.3, 0]),
    ['bell', r3(T.full), 1567.98, 0.03, 1.2, 0], ['glitter', r3(T.full), r3(T.full + 0.5)],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
