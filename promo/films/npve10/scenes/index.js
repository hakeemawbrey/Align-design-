// npve10 · POV: You're Dating a ___ · ep 10 · "POV: you're dating a Capricorn." (18 s vertical, lofi · Am)
// Story 0–15.6, then the short end card. Rows: promo/films/next30/b43.md. Look: ../../npve01/scenes/datekit.js.
//   0.0–2.3   hook: ♑ CAPRICORN on your doorstep in the snow, two coffees, checking the time. A timestamp: 6:45 PM.
//   2.3–5.6   (1) CAPRICORN: "the date's at 7. *I'm early.*"  Sticker: "it brought *your* coffee order".
//   5.6–9.0   (2) it unrolls a long paper plan: "THE PLANT: A 5-YEAR PLAN" (for the houseplant you bought together).
//             CAPRICORN: "year one: *repot.* year two: sunnier window."  Sticker: "a 5-year plan. for a *plant*".
//   9.15      card cut.
//   9.3–12.7  (3, the twist) the camera follows the scroll to its last line, circled: "YEAR 5: still you."
//             CAPRICORN: "the plan *always* had you in it."  Sticker: "…oh."
//   12.95     Last line: "Planned ahead. *Way* ahead."  Pisces, out in the snow, cries happy tears all film.
import { makePOV, drawStarChar, signStar, drawBits, HEART, sparkles, pisces, beanie, R, pop01, outK, prog, ease, lerp, clamp, INK, BONE, GOLD, HOT, INTER, SERIF, MONO, r3 } from '../../npve01/scenes/datekit.js'
import { talkHops } from '../../startalk.js'

const CP = signStar('capricorn'), PN = `${CP.glyph}︎ CAPRICORN`
const T = { scroll: [5.7, 6.6], cut: 9.15, ring: [10.4, 11.0], last: 12.95 }
const LINES = [
  { t: 2.4, speaker: PN, text: 'the date’s at 7. *I’m early.*', color: '#b9e0c8' },
  { t: 6.4, speaker: PN, text: 'year one: *repot.* year two: sunnier window.', color: '#b9e0c8' },
  { t: 9.6, speaker: PN, text: 'the plan *always* had you in it.', color: '#b9e0c8' },
]
const HOPS = [...talkHops(LINES, PN), T.scroll[0], T.ring[1], T.last + 0.3, T.last + 0.8]

function cup(x, cx, cy, col) {
  R(x, INK, cx - 34, cy - 50, 68, 100); R(x, col, cx - 28, cy - 44, 56, 88); R(x, '#c89a62', cx - 28, cy - 8, 56, 28)
  R(x, INK, cx - 40, cy - 64, 80, 20); R(x, '#fff8ef', cx - 36, cy - 60, 72, 12)
}
function plant(x, t, cx, by) {
  R(x, INK, cx - 56, by - 90, 112, 96); R(x, '#c8643a', cx - 50, by - 84, 100, 84); R(x, '#a84a2a', cx - 56, by - 96, 112, 22)
  for (let i = 0; i < 5; i++) { const a = -Math.PI / 2 + (i - 2) * 0.45 + 0.05 * Math.sin(t * 2 + i); x.save(); x.translate(cx, by - 96); x.rotate(a); R(x, INK, -4, -4, 120, 44); R(x, i % 2 ? '#3fb08a' : '#2f8a5a', 0, 0, 112, 36); x.restore() }
}
const PLAN = ['YEAR 1: repot', 'YEAR 2: sunnier window', 'YEAR 3: name it', 'YEAR 4: second plant?', 'YEAR 5: still you.']
function scroll(x, t) {
  if (t < T.scroll[0]) return
  const k = ease.outCubic(prog(t, ...T.scroll)), H = 820 * k, X = 600, Y = 560, W = 400
  x.save(); x.translate(X, Y); x.rotate(0.04)
  R(x, INK, -6, -6, W + 12, H + 12); R(x, '#fff8ef', 0, 0, W, H)
  x.save(); x.beginPath(); x.rect(0, 0, W, H); x.clip()
  x.fillStyle = INK; x.font = `800 26px ${INTER}`; x.textAlign = 'left'; x.fillText('THE PLANT:', 26, 50); x.fillText('A 5-YEAR PLAN', 26, 82)
  R(x, INK, 26, 100, W - 52, 4)
  PLAN.forEach((p, i) => { const last = i === 4; x.font = last ? `italic 500 40px ${SERIF}` : `700 24px ${MONO}`; x.fillStyle = last ? '#c8283c' : '#3a3456'; x.fillText(p, 26, 170 + i * 130 + (last ? 20 : 0)); if (!last) for (let j = 0; j < 2; j++) R(x, '#d8d2ee', 26, 196 + i * 130 + j * 26, W - 80 - j * 60, 8) })
  // the red circle round the last line
  const r = prog(t, ...T.ring)
  if (r > 0) { x.strokeStyle = '#c8283c'; x.lineWidth = 6; x.beginPath(); x.ellipse(W / 2, 170 + 4 * 130 + 8, 190, 50, -0.05, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * r); x.stroke() }
  x.restore()
  R(x, INK, -14, H - 8, W + 28, 34); R(x, '#e8dcc0', -10, H - 4, W + 20, 26)
  x.restore()
}

const EP = makePOV({
  id: 'npve10', duration: 18, set: 'door',
  caption: 'you’re dating a *Capricorn.*',
  lines: LINES,
  boxes: [{ from: 0, to: 3, open: 2.2, close: 12.75 }],
  stickers: [
    { at: -1, out: [2.1, 2.3], text: '6:45 PM', x: 860, y: 330, rot: 3, size: 44, kind: 'dark' },
    { at: 3.4, out: [5.4, 5.6], text: 'it brought *your* coffee order', x: 540, y: 330, rot: -2.5, size: 42, kind: 'light' },
    { at: 7.6, out: [8.9, 9.05], text: 'a 5-year plan. for a *plant*', x: 540, y: 330, rot: 2.5, size: 42, kind: 'dark' },
    { at: 11.3, out: [12.6, 12.8], text: '…*oh.*', x: 540, y: 330, rot: -2, size: 54, kind: 'you' },
  ],
  last: { at: T.last, text: 'Planned ahead. *Way* ahead.', color: '#b9e0c8' },
  cuts: [T.cut],
  punch: [{ at: 0.2, dur: 1.6, z: 0.06, x: 540, y: 1000 }, { at: T.ring[0] - 0.9, dur: 2.6, z: 0.3, x: 800, y: 1110 }],
  pitch: { [PN]: 440 },
  scene(x, t) {
    pisces(x, t, { x: 270, y: 1010, s: 115, tears: t > T.last ? 3 : t > T.ring[0] ? 2 : 1, mood: t > T.ring[0] ? 'happy' : 'sparkle', look: [1, 0], pop: pop01(t, -1) })
    let mood = 'neutral', look = [-0.6, 1]
    if (t > 1.2) { mood = 'happy'; look = [0, 0] }
    if (t > T.scroll[0]) { mood = 'sparkle'; look = [1, 0.3] }
    if (t > T.cut) { mood = 'happy'; look = [0, 0] }
    if (t > T.ring[1]) mood = 'wink'
    if (t > T.last) mood = 'heart'
    const px = t > T.scroll[0] - 0.3 ? lerp(470, 390, ease.inOutCubic(prog(t, T.scroll[0] - 0.3, T.scroll[0] + 0.3))) : 470
    const o = { x: px, y: 1060, s: 340, hops: HOPS, seed: 12 }
    plant(x, t, 760, 1400)
    drawStarChar(x, o.x, o.y, o.s, t, { color: CP.color, glyph: CP.glyph, mood, look, hops: HOPS, seed: 12, glow: 1.1, blush: t > T.ring[1] ? 1 : 0 })
    beanie(x, t, o, '#4a6a5a', BONE)
    const ck = outK(t, [T.scroll[0] - 0.4, T.scroll[0]])
    if (ck > 0) { x.save(); x.globalAlpha = ck; cup(x, 680, 1050, '#fff8ef'); cup(x, 790, 1080, '#b9e0c8'); x.restore() }
    scroll(x, t)
    if (t > T.ring[1]) sparkles(x, t, 800, 1110, T.ring[1], 10, 180, 1, [GOLD, BONE, HOT])
    if (t > T.last) { sparkles(x, t, 400, 1000, T.last + 0.35, 12, 240, 1, ['#b9e0c8', GOLD, BONE]); for (let i = 0; i < 6; i++) { const ph = t - T.last - 0.3 - i * 0.12; if (ph > 0) drawBits(x, HEART, { H: i % 2 ? HOT : GOLD }, 440 + (i - 2.5) * 100 + Math.sin(ph * 4 + i) * 20, 900 - ph * 160, 9, { alpha: clamp(1 - ph / 2.2) }) } }
  },
  cues: [
    ['tick', 0.3, 0.03], ['tick', 0.8, 0.03], ['tick', 1.3, 0.03],
    ['whoosh', r3(T.scroll[0]), 0.9, 0.03], ['tick', r3(T.scroll[1]), 0.05],
    ['riser', r3(T.ring[0] - 0.9), r3(T.ring[0]), 0.012], ['pluck', r3(T.ring[1]), 880, 0.04, 0.5, 0], ['pluck', r3(T.ring[1] + 0.12), 1318.51, 0.035, 0.5, 0], ['glitter', r3(T.ring[1]), r3(T.ring[1] + 0.5)],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
