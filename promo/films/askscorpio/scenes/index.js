// askscorpio (20 s vertical Align ad, Star Talk season 1 extra "Ask the Stars") · story 0–15.6, then the shared end card.
//   0.00       A DM lands: "How do I know if I can *trust* them?" The ♏ star is already peering at you through a magnifying
//              glass, one giant eye in the lens, scanning left and right.
//   2.82 drop  ♏ SCORPIO STAR: "watch if their words and actions match."  WORDS and ACTIONS tags pop above it; an "="
//              and then a green ✓ (4.6). The REAL ASTROLOGY chip: fixed water, Mars (traditional) and Pluto (modern).
//   5.95       "over weeks. not one big moment."  A pixel calendar flips WEEK 1 → 2 → 3 → 6.
//   8.95       "and ask. trust is built, not found."  The star slowly LOWERS the magnifying glass, soft sparkle eyes, and
//              pixel bricks stack into a little wall, one by one.
//   12.0       The box shuts, the DM slides away: "Card first. | *Face* last." A face-down reveal card flips to the face.
//   13.74 cut  "Trust is *built.* | Brick by brick."  The star stands on its finished brick wall, a heart on top.
// One canvas (sky + star + props), DOM type above it. Pure f(t).
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { drawStarChar, talkHops, signStar } from '../../startalk.js'
import { askFilm, BEAT, GOLD, BONE, INK, MONO, sparkles } from './ask.js'

const SCO = signStar('scorpio')
const ACC = '#ff6f8f'
const SPEAK = '♏ SCORPIO STAR'
const T = {
  scan: [0, 2.4], open: 2.62,
  l1: BEAT(4) + 0.02, words: 3.3, acts: 3.6, eq: 4.3, check: 4.75,
  l2: 5.95, cal: 6.1, l3: 8.95, lower: [9.0, 10.2], bricks: 9.7, brickGap: 0.28,
  close: 11.85, dmOut: [11.7, 11.95],
  tie: 11.98, flip: [12.42, 12.82], tieOut: [13.5, 13.7],
  cut: 13.74, last: 13.82, lastLand: 14.22, heart: 14.5, out: [15.2, 15.45],
}
const LINES = [
  { t: T.l1, text: 'watch if their *words* and *actions* match.' },
  { t: T.l2, text: 'over *weeks*. not one big moment.' },
  { t: T.l3, text: 'and ask. trust is *built*, not found.' },
]
const HOPS = [...talkHops(LINES.map(l => ({ ...l, speaker: SPEAK })), SPEAK, { cps: 30 }), T.lastLand, T.heart]
const HEART = ['.H.H.', 'HWHHH', 'HHHHH', '.HHH.', '..H..']
const CHECK = ['.......G', '......GG', 'G....GG.', 'GG..GG..', '.GGGG...', '..GG....']

function scoState(t) {
  if (t < T.scan[1]) return { mood: 'squint', look: [Math.sin(t * 2.6 + 0.7) > 0 ? 1 : -1, 0], blink: false }
  if (t < T.check) return { mood: 'squint', look: [0, -1] }
  if (t < T.check + 0.6) return { mood: 'wide', look: [0, -1], blink: false }
  if (t < T.l3) return { mood: 'neutral', look: [1, -1] }
  if (t < T.lower[1]) return { mood: 'wide', look: [0, 0], blink: false }
  if (t < T.cut) return { mood: 'sparkle', look: [0, 0] }
  if (t < T.heart) return { mood: 'happy' }
  return { mood: 'heart' }
}

function label(x, cx, cy, text, col, k, rot = -0.04) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(rot)
  x.font = `700 40px ${MONO}`; const tw = x.measureText(text).width + 44
  x.fillStyle = INK; x.fillRect(-tw / 2 - 7, -36, tw + 14, 72)
  x.fillStyle = col; x.fillRect(-tw / 2, -29, tw, 58)
  x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 3)
  x.restore()
}

/** n bricks (0…6) of a little wall centred at (cx, base), cell = brick height */
function wall(x, t, cx, base, bh, n, t0 = null, gap = 0) {
  const ROWS = [[-1, 0, 1], [-0.5, 0.5], [0]]
  let i = 0
  ROWS.forEach((row, j) => row.forEach(u => {
    if (i >= n) { i++; return }
    const bt = t0 == null ? -1 : t0 + i * gap, p = t0 == null ? 1 : prog(t, bt, bt + 0.22)
    i++
    if (p <= 0) return
    const bw = bh * 2.1, bx = cx + u * bw, by = base - (j + 0.5) * bh - (1 - ease.outBack(p)) * 120
    x.save(); x.globalAlpha = clamp(p * 2)
    x.fillStyle = INK; x.fillRect(bx - bw / 2, by - bh / 2, bw, bh)
    x.fillStyle = '#d0573f'; x.fillRect(bx - bw / 2 + 6, by - bh / 2 + 6, bw - 12, bh - 12)
    x.fillStyle = '#f08a6a'; x.fillRect(bx - bw / 2 + 6, by - bh / 2 + 6, bw - 12, 6)
    x.fillStyle = '#9c3a2b'; x.fillRect(bx - bw / 2 + 6, by + bh / 2 - 12, bw - 12, 6)
    x.restore()
  }))
}

function drawStage(x, t, K) {
  const out = K.popOut(t, T.out)
  if (out <= 0) return
  const tieHide = t >= T.tie - 0.1 && t < T.cut ? ease.inOutCubic(prog(t, T.tie - 0.1, T.tie + 0.25)) : 0
  if (tieHide >= 1) return
  const last = t >= T.cut
  const P = last ? { x: 540, y: 1040, size: 330 } : { x: 540, y: 1020, size: 340 }
  const st = scoState(t)
  const lean = t < T.scan[1] ? 0.06 * Math.sin(t * 2.6 + 0.7) : 0
  const opts = { color: SCO.color, glyph: SCO.glyph, ...st, hops: HOPS, seed: 4, glow: 1.15, pop: out * (1 - tieHide), squash: t >= T.l3 && t < T.lower[1] ? -0.04 : 0 }
  // the finished wall under the star in the last beat
  if (last) wall(x, t, 540, 1385, 70, 6, null)
  const r = drawStarChar(x, P.x + lean * 300, P.y, P.size, t, opts)

  // ── WORDS = ACTIONS ✓ (line 1), the calendar (line 2), the stacking wall (line 3)
  if (!last && t < T.l2 + 0.3) {
    const o = 1 - prog(t, T.l2, T.l2 + 0.25)
    label(x, 300, 650, 'WORDS', '#ffd27a', K.pop01(t, T.words, 0.3, 2.4) * o, -0.05)
    label(x, 790, 650, 'ACTIONS', '#9fe7ff', K.pop01(t, T.acts, 0.3, 2.4) * o, 0.04)
    const eq = K.pop01(t, T.eq, 0.3, 2.4) * o
    if (eq > 0.01) { x.save(); x.translate(545, 650); x.scale(eq, eq); x.fillStyle = INK; x.fillRect(-34, -30, 68, 60); x.fillStyle = BONE; x.fillRect(-26, -20, 52, 12); x.fillRect(-26, 8, 52, 12); x.restore() }
    const ck = K.pop01(t, T.check, 0.35, 2.6) * o
    if (ck > 0.01) K.drawBits(x, CHECK, { G: '#5fe08a' }, 545, 560, 12 * ck)
    sparkles(x, t, 545, 600, T.check, 10, 160, 0.3, ['#5fe08a', BONE, GOLD])
  }
  if (!last && t >= T.cal && t < T.l3 + 0.3) {
    const k = K.pop01(t, T.cal, 0.32, 2.2) * (1 - prog(t, T.l3, T.l3 + 0.25))
    const weeks = [1, 2, 3, 4, 6], i = Math.min(weeks.length - 1, Math.max(0, Math.floor((t - T.cal - 0.4) / 0.5)))
    const flip = (t - T.cal - 0.4) % 0.5, fl = t > T.cal + 0.4 && i < weeks.length - 1 ? clamp(1 - flip / 0.12) : 0
    x.save(); x.translate(540, 660); x.scale(k, k)
    x.fillStyle = INK; x.fillRect(-150, -110, 300, 220)
    x.fillStyle = BONE; x.fillRect(-140, -100, 280, 200)
    x.fillStyle = ACC; x.fillRect(-140, -100, 280, 56)
    x.fillStyle = INK; for (const s of [-1, 1]) x.fillRect(s * 80 - 8, -122, 16, 36)
    x.font = `700 34px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = BONE; x.fillText('WEEK', 0, -70)
    x.fillStyle = INK; x.font = `800 110px Inter, sans-serif`; x.fillText(String(weeks[i]), 0, 34)
    if (fl > 0) { x.fillStyle = 'rgba(239,230,214,0.95)'; x.fillRect(-140, -44, 280, 144 * fl); x.fillStyle = 'rgba(27,18,54,0.25)'; x.fillRect(-140, -44 + 144 * fl - 6, 280, 6) }
    x.restore()
  }
  if (!last && t >= T.bricks) wall(x, t, 540, 760, 66, 6, T.bricks, T.brickGap)

  // ── the magnifying glass: up at the eye, scanning; slowly lowered on "and ask."
  const lw = ease.inOutCubic(prog(t, ...T.lower))
  if (!last && lw < 1 && opts.pop > 0.02) {
    const ex = r.x + lean * 0 + 62 + Math.sin(t * 2.6 + 0.7) * (t < T.scan[1] ? 26 : 0), ey = r.y - 6
    const cx = lerp(ex, r.x + 300, lw), cy = lerp(ey, r.y + 330, lw), rot = lerp(-0.5, 0.9, lw), R = 96 * opts.pop
    x.save(); x.globalAlpha = 1 - clamp((lw - 0.75) * 4)
    x.translate(cx, cy); x.rotate(rot)
    // handle
    x.fillStyle = INK; x.fillRect(-14, R - 4, 28, 150); x.fillStyle = '#8a4b2a'; x.fillRect(-8, R, 16, 140); x.fillStyle = '#b8693e'; x.fillRect(-8, R, 6, 140)
    x.rotate(-rot)
    // lens + the giant eye in it
    x.fillStyle = 'rgba(170,225,255,0.22)'; x.beginPath(); x.arc(0, 0, R, 0, Math.PI * 2); x.fill()
    if (lw < 0.3) {
      const a = 1 - lw / 0.3, look = t < T.scan[1] ? (Math.sin(t * 2.6 + 0.7) > 0 ? 1 : -1) : 0
      x.globalAlpha *= a
      x.fillStyle = INK; x.fillRect(-36, -52, 72, 104)
      x.fillStyle = '#ffffff'; x.fillRect(-28, -44, 56, 88)
      x.fillStyle = INK; x.fillRect(-14 + look * 10, -14, 30, 42); x.fillStyle = '#ffffff'; x.fillRect(-6 + look * 10, -8, 10, 10)
      x.globalAlpha /= a
    }
    x.lineWidth = 16; x.strokeStyle = INK; x.beginPath(); x.arc(0, 0, R + 6, 0, Math.PI * 2); x.stroke()
    x.lineWidth = 10; x.strokeStyle = GOLD; x.beginPath(); x.arc(0, 0, R + 4, 0, Math.PI * 2); x.stroke()
    x.fillStyle = 'rgba(255,255,255,0.7)'; x.fillRect(-R * 0.55, -R * 0.55, 14, 14); x.fillRect(-R * 0.4, -R * 0.68, 10, 10)
    x.restore()
  }
  if (t > T.lower[1] - 0.1) sparkles(x, t, r.x, r.y, T.lower[1] - 0.1, 8, 200, 0.6, [ACC, BONE, GOLD])
  if (last && t > T.heart) { const k = K.pop01(t, T.heart, 0.35, 2.4); K.drawBits(x, HEART, { H: '#ff4f86', W: '#ffd1de' }, 540 + 150, 1385 - 3 * 70 - 30, 12 * k) }
  if (last) sparkles(x, t, 540, 1300, T.lastLand, 10, 260, 0.2, [GOLD, ACC, BONE])
}

const F = askFilm({
  duration: 20, sign: 'scorpio', speaker: SPEAK, accent: ACC,
  question: 'How do I know if | I can *trust* them?', qSize: 90,
  dmOut: T.dmOut,
  lines: LINES, open: T.open, close: T.close,
  note: { t: 1.25, out: [11.65, 11.85], rows: ['♏ SCORPIO · FIXED WATER', 'RULED BY MARS (TRADITIONAL)', 'AND PLUTO (MODERN)'], w: 720, top: 1236 },
  heads: [
    { text: 'Card first. | *Face* last.', at: T.tie + 0.05, out: T.tieOut, top: 150, size: 104, accentSize: 150, accentColor: GOLD, late: 1, lateAt: T.tie + 0.42 },
    { text: 'Trust is *built.* | Brick by brick.', at: T.last, out: T.out, top: 220, size: 104, accentSize: 150, accentColor: ACC, late: 3, lateAt: T.lastLand, lineHeight: 1.02 },
  ],
  tie: { img: 'card-reveal.png', back: 'card-reveal-facedown.png', at: T.tie, flip: T.flip, out: T.tieOut, y: 930, h: 760, chip: { t: T.flip[1] + 0.1, text: 'get to know them before the photo', top: 1340 } },
  drawBack: drawStage,
  cuts: [T.tie - 0.04, { t: T.cut, kind: 'flip' }],
  cues: [
    ['whoosh', 0.5, 0.4, 0.02], ['whoosh', 1.7, 0.4, 0.02],
    ['pop', T.words, 987.77, 0.035, -0.3], ['pop', T.acts, 1174.66, 0.035, 0.3], ['tick', T.eq, 0.04], ['pluck', T.check, 1567.98, 0.05, 0.6, 0], ['glitter', T.check, T.check + 0.4],
    ['pop', T.cal, 880, 0.035, 0], ...[0, 1, 2, 3].map(i => ['tick', +(T.cal + 0.4 + i * 0.5).toFixed(2), 0.04]),
    ['whoosh', T.lower[0], 0.9, 0.03], ['bell', T.lower[1], 1318.51, 0.03, 1.4, 0],
    ...Array.from({ length: 6 }, (_, i) => ['pop', +(T.bricks + i * T.brickGap + 0.2).toFixed(2), 330 + i * 40, 0.045, (i % 3 - 1) * 0.3]),
    ['boom', T.lastLand, 0.1], ['pluck', T.heart, 1174.66, 0.045, 0.6, 0], ['whoosh', T.out[0], 0.35, 0.03],
  ],
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
