// npve23 · POV: You're Dating a ___ · ep 23 · "POV: you're dating an Aquarius. New Year's." (15 s vertical, synthwave · C#m)
// Story 0–12.6, then the short end card. Rows: promo/films/next30/b43.md. Look: ../../npve01/scenes/datekit.js.
//   0.0–2.3   hook: ♒ AQUARIUS on the sofa, blowing a party horn at you. The clock says 7:00 PM. "HAPPY NEW YEAR!"
//   2.3–6.0   (1) AQUARIUS: "it's midnight *somewhere.*"  A cheer every hour: 8:00, 9:00, 10:00… horn, confetti, cocoa.
//             Sticker: "a new year *every hour*".
//   6.2       card cut.
//   6.3–9.8   (2, the turn) 11:59… 12:00 — your actual midnight. It's fast asleep on your shoulder, party hat askew.
//             Sticker: "your *actual* midnight".
//   10.0      Last line: "Midnight, *every* hour."  Pisces, outside the window, cries happy tears all film.
import { makePOV, drawStarChar, signStar, drawBits, HEART, sparkles, pisces, bubble, mug, R, pop01, outK, prog, ease, lerp, clamp, INK, BONE, GOLD, HOT, CYAN, INTER, MONO, r3 } from '../../npve01/scenes/datekit.js'
import { talkHops } from '../../startalk.js'

const AQ = signStar('aquarius'), QN = `${AQ.glyph}︎ AQUARIUS`
const T = { cheers: [0, 3.4, 4.3, 5.2], cut: 6.2, mid: 7.8, last: 10.0 }
const LINES = [{ t: 2.4, speaker: QN, text: 'it’s midnight *somewhere.*', color: '#7fe0ff' }]
const HOPS = [0.1, ...T.cheers.slice(1), ...talkHops(LINES, QN)]
const CLOCK = t => t < 3.4 ? '7:00 PM' : t < 4.3 ? '8:00 PM' : t < 5.2 ? '9:00 PM' : t < T.cut ? '10:00 PM' : t < T.mid ? '11:59 PM' : '12:00 AM'

function horn(x, t, cx, cy, blow) {
  x.save(); x.translate(cx, cy); x.rotate(-0.3)
  x.fillStyle = INK; x.beginPath(); x.moveTo(0, -18); x.lineTo(110, -34); x.lineTo(110, 34); x.lineTo(0, 18); x.fill()
  for (let i = 0; i < 4; i++) { x.fillStyle = i % 2 ? GOLD : HOT; x.beginPath(); x.moveTo(i * 27, -14 - i * 4); x.lineTo((i + 1) * 27, -18 - (i + 1) * 4); x.lineTo((i + 1) * 27, 18 + (i + 1) * 4); x.lineTo(i * 27, 14 + i * 4); x.fill() }
  // the paper curl unrolls when it blows
  const L = 40 + 180 * blow
  x.strokeStyle = INK; x.lineWidth = 26; x.beginPath(); x.moveTo(110, 0); x.lineTo(110 + L, 0); if (blow < 0.6) x.arc(110 + L, -24, 24, Math.PI / 2, Math.PI * 2.4); x.stroke()
  x.strokeStyle = CYAN; x.lineWidth = 16; x.stroke()
  x.restore()
}
function hat(x, cx, cy, rot) {
  x.save(); x.translate(cx, cy); x.rotate(rot)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-52, 6); x.lineTo(0, -126); x.lineTo(52, 6); x.fill()
  x.fillStyle = '#c9a6ff'; x.beginPath(); x.moveTo(-44, 0); x.lineTo(0, -112); x.lineTo(44, 0); x.fill()
  for (let i = 0; i < 3; i++) R(x, GOLD, -30 + i * 24, -30 - i * 26, 12, 12)
  x.fillStyle = INK; x.beginPath(); x.arc(0, -126, 20, 0, Math.PI * 2); x.fill(); x.fillStyle = '#fff8ef'; x.beginPath(); x.arc(0, -126, 14, 0, Math.PI * 2); x.fill()
  x.restore()
}
function confetti(x, t, t0, cx, cy) {
  const p = t - t0; if (p < 0 || p > 1.2) return
  for (let i = 0; i < 18; i++) { const a = i * 2.4, v = 260 + (i % 5) * 60; x.globalAlpha = 1 - p / 1.2; R(x, ['#ff4f86', GOLD, CYAN, '#7dffb0'][i % 4], cx + Math.cos(a) * v * p, cy + Math.sin(a) * v * p * 0.7 + 300 * p * p, 14, 20) }
  x.globalAlpha = 1
}

const EP = makePOV({
  id: 'npve23', duration: 15, set: 'sofa',
  caption: 'you’re dating an *Aquarius.* New Year’s.',
  captionSize: 44,
  lines: LINES,
  boxes: [{ from: 0, to: 1, open: 2.2, close: 6.0 }],
  stickers: [
    { at: 4.4, out: [5.95, 6.1], text: 'a new year *every hour*', x: 540, y: 330, rot: -2.5, size: 46, kind: 'dark' },
    { at: 8.2, out: [9.6, 9.8], text: 'your *actual* midnight', x: 540, y: 330, rot: 2, size: 48, kind: 'you' },
  ],
  last: { at: T.last, text: 'Midnight, *every* hour.', color: '#ffd36a' },
  cuts: [T.cut],
  punch: [{ at: T.mid, dur: 2.2, z: 0.1, x: 640, y: 1150 }],
  pitch: { [QN]: 783.99 },
  scene(x, t) {
    pisces(x, t, { x: 300, y: 690, s: 120, tears: t > T.last ? 3 : t > T.mid ? 2 : 1, mood: t > T.mid ? 'happy' : 'sparkle', look: [1, 0.3], pop: pop01(t, -1) })
    if (t < T.cut) {
      const blowAt = T.cheers.filter(a => t > a).pop() ?? 0, blow = Math.sin(Math.PI * clamp((t - blowAt) / 0.7))
      drawStarChar(x, 540, 1000, 340, t, { color: AQ.color, glyph: AQ.glyph, mood: blow > 0.2 ? 'wide' : 'sparkle', look: [0, 0], hops: HOPS, seed: 14, glow: 1.1 })
      hat(x, 540, 830, -0.08)
      horn(x, t, 600, 1030, blow)
      T.cheers.forEach(a => confetti(x, t, a, 540, 800))
      if (t > 3.0) { mug(x, t, 820, 1260, '#7fe0ff', 0.9); mug(x, t, 250, 1260, '#ff9ec8', 0.9) }
      bubble(x, t, 600, 560, -1, 'HAPPY NEW YEAR!', { size: 42, col: '#7fe0ff', out: [2.0, 2.3] })
    } else {
      // 11:59… then midnight: asleep on your shoulder
      const lean = ease.inOutCubic(prog(t, T.cut + 0.2, T.cut + 1.2))
      x.save(); x.translate(lerp(540, 760, lean), lerp(1000, 1180, lean)); x.rotate(lerp(0, -0.35, lean))
      drawStarChar(x, 0, 0, lerp(340, 460, lean), t, { color: AQ.color, glyph: AQ.glyph, mood: 'sleepy', look: [0, 0], seed: 14, glow: 1.1, bob: 6, blush: 1 })
      hat(x, 30, -200, 0.6)
      x.restore()
      if (t > T.mid) sparkles(x, t, 540, 700, T.mid, 12, 220, 1, [GOLD, BONE, HOT])
      if (t > T.last) for (let i = 0; i < 6; i++) { const ph = t - T.last - 0.3 - i * 0.12; if (ph > 0) drawBits(x, HEART, { H: i % 2 ? HOT : GOLD }, 600 + (i - 2.5) * 100 + Math.sin(ph * 4 + i) * 20, 900 - ph * 160, 9, { alpha: clamp(1 - ph / 2.2) }) }
    }
  },
  front(x, t) {
    // the clock, top right
    const s = CLOCK(t), hot = t > T.mid
    x.save(); x.font = `700 40px ${MONO}`; const w = x.measureText(s).width + 36
    R(x, INK, 1000 - w - 4, 434, w + 8, 72); R(x, hot ? HOT : '#14102a', 1000 - w, 438, w, 64); x.fillStyle = hot ? '#fff8ef' : CYAN; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(s, 1000 - w / 2, 472); x.restore()
  },
  cues: [
    ...T.cheers.map((a, i) => ['pop', r3(Math.max(0.05, a + 0.02)), [1108.73, 1244.51, 1396.91, 1661.22][i], 0.045, 0]),
    ...T.cheers.slice(1).map(a => ['glitter', r3(a), r3(a + 0.5)]), ...T.cheers.slice(1).map(a => ['tick', r3(a - 0.05), 0.04]),
    ['whoosh', r3(T.cut + 0.2), 1.0, 0.02], ['tick', 7.0, 0.03], ['tick', 7.4, 0.03], ['bell', r3(T.mid), 1661.22, 0.03, 1.6, 0], ['glitter', r3(T.mid), r3(T.mid + 0.7)],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
