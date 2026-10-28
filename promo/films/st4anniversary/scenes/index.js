// st4anniversary (EP 095, 20 s vertical, Star Talk season 4, thread F: Aries × Libra) · story 0–15.6, then the end card.
//   0.00–6.20  "Aries and Libra's | *anniversary.*"  The ♈ Aries star (glove at its side) holds one sticky note, "PLAN: GO.",
//              under a chip PLANNED IN 5 MIN. The ♎ Libra star (scale on its head) fans out five option cards A–E under
//              PLANNED 5 OPTIONS.  ARIES: "let's go *NOW.*" (hopping)  →  LIBRA: "let's go… *together.*" (its scale tips
//              toward Aries, then settles level).
//   6.25–10.6  "Option *A.*"  Libra picks the first card: A, OUR FIRST DATE SPOT. The other four flutter away. Aries grabs
//              Libra's hand-point and they RUN off to the right, dust and speed lines. The stage is empty; the little ghost
//              pokes up over the floor line to see where they went.
//  10.9        card cut (flip).
//  11.0–15.5   "Fast *and* fair."  At their spot: a little table, a cake with one candle, card A propped up between them.
//              Both heart-eyed; Libra's scale glows level. Out by 15.5.
// Astrology: Aries (cardinal fire, Mars) and Libra (cardinal air, Venus) are opposite signs: action and balance.
// One canvas (sky + props + stars), DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, signStar } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { drawSeedConstellation, drawGhostCameo, episodeNumeral } from '../../stlore.js'

export const DURATION = 20
export const EP = 95
const STORY_END = DURATION - ENDCARD_LEN       // 15.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', LAV = '#c9a6ff', INK = '#1b1236', RED = '#ff6b5a'
const MONO = "'Space Mono', ui-monospace, monospace"
const BEAT = n => 0.6 + n * 0.5556            // 108 bpm grid
const ARI = signStar('aries'), LIB = signStar('libra')

// ── the timeline
const T = {
  h0: 0.15, h0Land: 0.85, h0Out: [6.0, 6.2],
  starsIn: [0.3, 0.45], note: 1.15, chipA: 1.3, cards: [1.55, 1.75, 1.95, 2.15, 2.35], chipL: 2.45,
  open: 2.66, l1: BEAT(4),                                                    // 2.82
  l2: 4.95, tip: [5.0, 5.5], level: [5.9, 6.4],
  h1: 6.25, h1Land: 6.6, pick: [6.45, 6.9], flutter: [6.7, 7.6], close: 7.75,
  grab: 7.95, run: [8.35, 8.95], ghost: 9.15, h1Out: [10.4, 10.6],
  cut: 10.9,
  h2: 11.0, h2Land: 11.4, clink: 12.6, hearts: 13.2, h2Out: [15.28, 15.5], out: [15.08, 15.48],
}
const AT = '♈ ARIES', LT_ = '♎ LIBRA'
const LINES = [
  { t: T.l1, speaker: AT, color: RED, text: 'let’s go *NOW.*' },
  { t: T.l2, speaker: LT_, color: PINK, text: 'let’s go… *together.*' },
]
const CPS = 26
const LT = lineTimes(LINES, { cps: CPS })
const OPTS = [['A', 'OUR SPOT'], ['B', 'PICNIC'], ['C', 'STARS'], ['D', 'BOWLING'], ['E', 'TACOS']]

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }

function drawBits(x, bm, cols, cx, cy, cell, { rot = 0, outline = INK, alpha = 1, flip = false } = {}) {
  const w = bm[0].length, h = bm.length
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot); if (flip) x.scale(-1, 1)
  const ox = -w * cell / 2, oy = -h * cell / 2
  const on = (i, j) => j >= 0 && j < h && i >= 0 && i < w && bm[j][i] !== '.'
  if (outline) {
    x.fillStyle = outline
    for (let j = -1; j <= h; j++) for (let i = -1; i <= w; i++) if (!on(i, j) && (on(i + 1, j) || on(i - 1, j) || on(i, j + 1) || on(i, j - 1))) x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5)
  }
  for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) {
    const ch = bm[j][i]; if (ch === '.') continue
    x.fillStyle = cols[ch]; x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5)
  }
  x.restore()
}
const GLOVE = ['....hhhhhh...', '..hhRRRRRRR..', '.hRRRRRRRRRR.', 'WWRRRRRRRRRRR', 'WWRRRRRRRRRRR', 'WWRhRRRRRRRRR', 'WWRRhhRRRRRRd', 'WWRRRRhRRRRRd', 'WW.RRRRRRRRd.', '....dddddd...']
const GLOVE_C = { R: '#e8382c', h: '#ff8a6a', d: '#9c1d1d', W: '#f3ead8' }
const HEART = ['.HH.HH.', 'HWHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...']
const PAN = ['PPPPPPPPPPP', '.PpppppppP.', '..PPPPPPP..']
const PAN_C = { P: '#c98a1f', p: '#f7c948' }
const CAKE = [
  '.....F.....', '.....f.....', '.....C.....', '.....C.....',
  '.SSSSSSSSS.', 'SsSsSsSsSsS', 'BBBBBBBBBBB', 'BBhBBBBBhBB', 'BBBBBBBBBBB', 'pppppppppppp'.slice(0, 11),
]
const CAKE_C = { F: '#ffd24a', f: '#ff8a3a', C: '#9ff3ff', S: '#fff4f0', s: PINK, B: '#ff9ab8', h: '#ffffff', p: '#d9a35e' }

// ── layout
const ARI_A = { x: 255, y: 1070, s: 280 }, LIB_A = { x: 825, y: 1070, s: 280 }
const ARI_F = { x: 200, y: 1170, s: 260 }, LIB_F = { x: 880, y: 1170, s: 260 }
const FLOOR = 1330
const BIG_A = { x: 540, y: 880, w: 300 }
const ARM = 78, HANG = 70

function ariState(t) {
  if (t < T.l1) return { mood: 'happy', look: [1, 0] }
  if (t < LT[0].done + 0.5) return { mood: 'wide', look: [0, 0] }
  if (t < T.l2) return { mood: 'squint', look: [1, 0] }                      // tapping its foot
  if (t < T.level[0]) return { mood: 'wide', look: [1, 0] }
  if (t < T.grab) return { mood: 'heart', look: [1, 0] }
  if (t < T.cut) return { mood: 'happy', look: [1, 0] }
  if (t < T.clink) return { mood: 'sparkle', look: [1, 0] }
  return { mood: 'heart', look: [1, 0] }
}
function libState(t) {
  if (t < T.cards[4]) return { mood: 'neutral', look: [0, 1] }
  if (t < T.l1) return { mood: 'happy', look: [0, 0] }
  if (t < T.l2) return { mood: 'wide', look: [-1, 0] }
  if (t < T.pick[0]) return { mood: 'sparkle', look: [-1, 0] }
  if (t < T.flutter[1]) return { mood: 'happy', look: [-1, -1] }
  if (t < T.cut) return { mood: 'wink', look: [-1, 0] }
  if (t < T.clink) return { mood: 'happy', look: [-1, 0] }
  return { mood: 'heart', look: [-1, 0] }
}

async function build(stage) {
  try {
    await Promise.all(["800 96px Inter", "800 44px Inter", "italic 500 150px 'EB Garamond'", "700 52px 'Space Mono'", "700 30px 'Space Mono'", "700 24px 'Space Mono'", "700 20px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const H0 = popText(root, 'Aries and Libra’s | *anniversary.*', { top: 196, size: 92, accentSize: 140, at: T.h0, late: 1, lateAt: T.h0Land, wobble: true, gap: 0.1, accentColor: PINK })
  const H1 = popText(root, 'Option *A.*', { top: 230, size: 136, accentSize: 200, at: T.h1, late: 1, lateAt: T.h1Land, wobble: true, accentColor: GOLD })
  const H2 = popText(root, 'Fast *and* fair.', { top: 250, size: 132, accentSize: 186, at: T.h2, late: 2, lateAt: T.h2Land, lateGap: 0.14, wobble: true, gap: 0.1, accentColor: PINK })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1400, width: 960, height: 300, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  function glow(cx, cy, r, col, a) {
    if (a <= 0) return
    x.save(); x.globalCompositeOperation = 'lighter'
    const g = x.createRadialGradient(cx, cy, 0, cx, cy, r)
    g.addColorStop(0, rgba(col, 0.45 * a)); g.addColorStop(0.45, rgba(col, 0.15 * a)); g.addColorStop(1, rgba(col, 0))
    x.fillStyle = g; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill(); x.restore()
  }
  function sparkles(t, cx, cy, t0, n, R, seed, cols = [GOLD, BONE, PINK, LAV]) {
    const tt = t - t0
    if (tt < 0 || tt > 0.7) return
    const p = ease.outCubic(tt / 0.7)
    x.save(); x.globalAlpha = 1 - ease.inQuad(tt / 0.7)
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 + seed
      drawPixelStar(x, cx + Math.cos(a) * R * (0.7 + 0.5 * p), cy + Math.sin(a) * R * (0.7 + 0.5 * p), 24 * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length])
    }
    x.restore()
  }
  const rr = (X, Y, w, h, r) => { x.beginPath(); x.roundRect(X, Y, w, h, r) }
  function chip(cx, cy, label, col, k) {
    if (k <= 0.01) return
    x.save(); x.translate(cx, cy); x.scale(k, k)
    x.font = `700 30px ${MONO}`; x.letterSpacing = '3px'; const tw = x.measureText(label).width + 44
    rr(-tw / 2, -32, tw, 64, 32); x.fillStyle = 'rgba(20,12,44,0.92)'; x.fill(); x.lineWidth = 3; x.strokeStyle = rgba(col, 0.9); x.stroke()
    x.fillStyle = col; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(label, 2, 2)
    x.restore()
  }

  // the run: both dash off to the right (pure offset)
  const runDX = t => t < T.cut ? ease.inCubic(prog(t, ...T.run)) * 1100 : 0

  // ── Libra's scale on its head: tips toward Aries on "together", then settles level
  function beam(t) {
    if (t >= T.cut) return 0.03 * Math.sin(t * 2)
    const tip = ease.outBack ? 0 : 0
    const a = -0.32 * ease.inOutCubic(prog(t, ...T.tip)) * (1 - ease.inOutCubic(prog(t, ...T.level)))
    const wob = prog(t, ...T.level) > 0 && prog(t, ...T.level) < 1 ? 0.08 * Math.sin((t - T.level[0]) * 18) * (1 - prog(t, ...T.level)) : 0
    return a + wob + 0.025 * Math.sin(t * 2.2) + tip
  }
  function drawScale(t, r, k, glowK) {
    if (k <= 0.01) return
    const a = beam(t), c = 6
    const px = r.x, base = r.top + 6, py = base - 54
    x.save(); x.globalAlpha *= clamp(k)
    x.fillStyle = INK; x.fillRect(px - 2.5 * c, py - c, 5 * c, base - py + 2 * c)
    x.fillStyle = '#c98a1f'; x.fillRect(px - 1.5 * c, py, 3 * c, base - py); x.fillStyle = '#f7c948'; x.fillRect(px - 1.5 * c, py, c, base - py)
    x.fillStyle = INK; x.fillRect(px - 5 * c, base - c, 10 * c, 3 * c); x.fillStyle = '#f7c948'; x.fillRect(px - 4 * c, base, 8 * c, c)
    x.save(); x.translate(px, py); x.rotate(a)
    x.fillStyle = INK; x.fillRect(-ARM - c, -1.5 * c, 2 * ARM + 2 * c, 3 * c)
    x.fillStyle = '#f7c948'; x.fillRect(-ARM, -c / 2 - 2, 2 * ARM, c + 4)
    x.restore()
    for (const s of [-1, 1]) {
      const ex = px + Math.cos(a) * ARM * s, ey = py + Math.sin(a) * ARM * s, by = ey + HANG
      x.fillStyle = 'rgba(255,241,200,0.85)'
      for (let i = 0; i <= 8; i++) { const f = i / 8; x.fillRect(Math.round(lerp(ex, ex - 30, f)) - 2, Math.round(lerp(ey, by - 6, f)), 4, 5); x.fillRect(Math.round(lerp(ex, ex + 30, f)) - 2, Math.round(lerp(ey, by - 6, f)), 4, 5) }
      if (glowK > 0) drawPixelStar(x, ex, by - 22, 26 * glowK, 1, GOLD, '#fff6e6')
      drawBits(x, PAN, PAN_C, ex, by, c)
    }
    x.restore()
  }

  // ── Aries's plan: one sticky note. Libra's plan: five option cards in a fan.
  function drawNote(t) {
    const k = pop01(t, T.note, 0.32, 2.2) * (1 - ease.inCubic(prog(t, T.run[0] - 0.1, T.run[0] + 0.2)))
    if (k <= 0.01) return
    x.save(); x.translate(ARI_A.x + 20, 1255 + Math.sin(t * 9) * (t > T.l1 && t < T.l2 ? 6 : 1)); x.rotate(-0.08); x.scale(k, k)
    x.fillStyle = 'rgba(10,6,24,0.9)'; x.fillRect(-86, -56, 172, 112)
    x.fillStyle = '#ffe36b'; x.fillRect(-80, -50, 160, 100); x.fillStyle = '#f5cf3e'; x.fillRect(-80, 34, 160, 16)
    x.font = `700 22px ${MONO}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.fillText('PLAN:', 0, -18); x.font = `700 34px ${MONO}`; x.fillStyle = '#c4283a'; x.fillText('GO.', 0, 18)
    x.restore()
  }
  function drawOptCard(cx, cy, w, rot, o, k, big = false) {
    if (k <= 0.01) return
    const h = w * 1.36
    x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
    x.fillStyle = 'rgba(10,6,24,0.92)'; rr(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12, 14); x.fill()
    x.fillStyle = '#fbf3e6'; rr(-w / 2, -h / 2, w, h, 10); x.fill()
    x.lineWidth = Math.max(2, w * 0.025); x.strokeStyle = LIB.color; rr(-w / 2 + w * 0.06, -h / 2 + w * 0.06, w * 0.88, h - w * 0.12, 8); x.stroke()
    x.fillStyle = LIB.color; x.font = `800 ${Math.round(w * 0.42)}px Inter, sans-serif`; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.fillText(o[0], 0, -h * 0.14)
    x.fillStyle = INK
    if (big) { x.font = `700 ${Math.round(w * 0.1)}px ${MONO}`; x.fillText('OUR FIRST', 0, h * 0.2); x.fillText('DATE SPOT', 0, h * 0.31) }
    else { x.font = `700 ${Math.round(w * 0.13)}px ${MONO}`; x.fillText(o[1], 0, h * 0.24) }
    x.restore()
  }
  function drawCards(t) {
    if (t >= T.cut) return
    const base = { x: LIB_A.x + 10, y: 1255 }, dx = runDX(t)
    OPTS.forEach((o, i) => {
      const k = pop01(t, T.cards[i], 0.3, 2.2)
      if (k <= 0.01) return
      const fan = (i - 2) * 0.32, fx = base.x + (i - 2) * 52, fy = base.y + Math.abs(i - 2) * 10
      if (i === 0 && t >= T.pick[0]) {
        // option A: picked, grows to centre; at the grab it rides between them and runs with them
        const e = easeOutBack(prog(t, ...T.pick), 1.4)
        let cx = lerp(fx, BIG_A.x, e), cy = lerp(fy, BIG_A.y, e), w = lerp(110, BIG_A.w, clamp(e)), rot = lerp(fan, -0.04, clamp(e))
        if (t > T.grab) { const g = ease.inOutCubic(prog(t, T.grab, T.run[0])); cy = lerp(BIG_A.y, 1010, g); w = lerp(BIG_A.w, 170, g); cx += dx }
        drawOptCard(cx, cy + Math.sin(t * 2) * 5, w, rot + Math.sin(t * 1.6) * 0.02, o, 1, true)
        return
      }
      if (t >= T.flutter[0] && i > 0) {
        const u = prog(t, T.flutter[0] + i * 0.05, T.flutter[1])
        if (u >= 1) return
        drawOptCard(fx + u * (260 + i * 60), fy - u * (520 + i * 70) + u * u * 200, 110 * (1 - 0.3 * u), fan + u * (i % 2 ? 7 : -7), o, k * (1 - ease.inQuad(u)))
        return
      }
      drawOptCard(fx, fy, 110, fan, o, k)
    })
  }

  function drawStars(t) {
    const fin = t >= T.cut, ok = popOut(t, T.out), dx = runDX(t)
    const A = fin ? ARI_F : ARI_A, L = fin ? LIB_F : LIB_A
    const kA = (fin ? pop01(t, T.cut + 0.1, 0.36, 2.1) : pop01(t, T.starsIn[0], 0.4, 2)) * ok
    const kL = (fin ? pop01(t, T.cut + 0.16, 0.36, 2.1) : pop01(t, T.starsIn[1], 0.4, 2)) * ok
    // Aries can't stand still: extra hops all through its line and the wait
    const fast = Array.from({ length: 12 }, (_, i) => +(T.l1 + i * 0.36).toFixed(2))
    const hopsA = [T.starsIn[0] + 0.3, T.note + 0.1, ...fast, T.grab, T.h2Land, T.clink, T.hearts + 0.6]
    const hopsL = [T.starsIn[1] + 0.3, T.cards[4] + 0.1, ...talkHops(LINES, LT_, { cps: CPS }), T.pick[0], T.h2Land + 0.1, T.clink + 0.05, T.hearts + 0.8]
    const lean = t > T.run[0] - 0.25 && t < T.cut ? -0.12 : 0
    if (kA > 0.02) {
      const r = drawStarChar(x, A.x + dx, A.y, A.s * kA, t, { color: ARI.color, glyph: ARI.glyph, ...ariState(t), squash: lean, hops: hopsA, seed: 3 })
      drawBits(x, GLOVE, GLOVE_C, Math.round(r.x - A.s * 0.42), Math.round(r.y + A.s * 0.2), A.s / 64, { flip: true, rot: 0.4 + Math.sin(t * 5) * 0.05, alpha: clamp(kA) })
    }
    if (kL > 0.02) {
      const r = drawStarChar(x, L.x + dx * 1.02, L.y, L.s * kL, t, { color: LIB.color, glyph: LIB.glyph, ...libState(t), squash: lean, hops: hopsL, seed: 8 })
      drawScale(t, r, kL, fin ? clamp(prog(t, T.h2Land, T.h2Land + 0.5)) : clamp(prog(t, T.level[1] - 0.2, T.level[1] + 0.2)) * (1 - prog(t, T.grab, T.grab + 0.3)))
    }
  }
  // speed lines + dust puffs where they were
  function drawRun(t) {
    if (t < T.run[0] - 0.05 || t > T.cut) return
    const u = prog(t, T.run[0], T.run[1] + 0.5)
    x.save()
    for (let i = 0; i < 9; i++) {
      const y = 960 + i * 34, len = 180 + (i * 53) % 160, sx = 100 + ((i * 97) % 300) + u * 900
      x.globalAlpha = 0.55 * (1 - u); x.fillStyle = i % 2 ? BONE : GOLD; x.fillRect(sx - len, y, len, 6)
    }
    for (let i = 0; i < 6; i++) {
      const d = clamp((t - T.run[0] - i * 0.06) / 1.2)
      if (d <= 0 || d >= 1) continue
      const cx = 200 + i * 150, cy = FLOOR - 30 - d * 50, r = 26 + d * 40
      x.globalAlpha = 0.5 * (1 - d); x.fillStyle = '#d9c7a8'
      for (const [ox, oy, rs] of [[0, 0, 1], [-r * 0.7, 10, 0.7], [r * 0.7, 8, 0.75]]) { x.beginPath(); x.arc(cx + ox, cy + oy, r * rs, 0, Math.PI * 2); x.fill() }
    }
    x.restore()
  }
  // the floor (a stage line) and, in the last beat, their table + cake with one candle
  function drawFloor(t, k) {
    if (k <= 0.01) return
    x.save(); x.globalAlpha *= k; x.fillStyle = 'rgba(239,230,214,0.2)'; x.fillRect(80, FLOOR, 920, 4); x.restore()
  }
  function drawTable(t) {
    if (t < T.cut) return
    const k = pop01(t, T.cut + 0.05, 0.4, 1.6) * popOut(t, T.out)
    if (k <= 0.01) return
    const S = 1.3 * k
    x.save(); x.translate(540, FLOOR); x.scale(S, S)
    x.fillStyle = 'rgba(10,6,24,0.95)'; x.fillRect(-170, -150, 340, 34); x.fillRect(-26, -120, 52, 120)
    x.fillStyle = '#b07a3a'; x.fillRect(-164, -144, 328, 22); x.fillStyle = '#d9a35e'; x.fillRect(-164, -144, 328, 6)
    x.fillStyle = '#8a5a2a'; x.fillRect(-20, -122, 40, 122)
    x.restore()
    const top = FLOOR - 144 * S
    drawBits(x, CAKE, CAKE_C, 470, top - 5 * 13 * k, 13 * k)
    glow(470, top - 130 * k, 140, GOLD, 0.5 * k)
    drawOptCard(625, top - 100 * k, 150 * k, 0.12, OPTS[0], 1, true)
  }
  function floatHearts(t, cx, cy, t0) {
    for (let i = 0; i < 8; i++) {
      const born = t0 + i * 0.2, p = (t - born) / 1.3
      if (p < 0 || p >= 1) continue
      const side = ((i * 37) % 9) / 8 - 0.5
      drawBits(x, HEART, { H: [PINK, '#ff4f86', RED][i % 3], W: '#ffffff' }, cx + side * 420 + Math.sin(p * 7 + i) * 14, cy - p * 300, 6 + (i % 3), { alpha: Math.sin(Math.PI * p) })
    }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      drawSeedConstellation(x, t, EP)
      if (t < T.out[1] + 0.02) {
        const ok = popOut(t, T.out)
        drawFloor(t, t < T.cut ? ease.outCubic(prog(t, 0.1, 0.5)) : clamp(ok))
        if (t < T.cut) {
          chip(ARI_A.x + 20, 700, 'PLANNED IN 5 MIN', RED, pop01(t, T.chipA, 0.3, 2.2) * (1 - ease.inCubic(prog(t, T.h0Out[0], T.h0Out[1] + 0.2))))
          chip(LIB_A.x - 20, 700, '5 OPTIONS', PINK, pop01(t, T.chipL, 0.3, 2.2) * (1 - ease.inCubic(prog(t, T.h0Out[0], T.h0Out[1] + 0.2))))
          drawGhostCameo(x, t, { x: 560, y: FLOOR, at: T.ghost, dur: 1.3, from: 'below', look: t > T.ghost + 0.35 && t < T.ghost + 0.95 ? [1, 0] : [0, 0] })
        }
        drawTable(t)
        drawRun(t)
        drawStars(t)
        drawNote(t)
        drawCards(t)
        sparkles(t, BIG_A.x, BIG_A.y, T.pick[1] - 0.1, 12, 260, 1)
        sparkles(t, 540, 1050, T.h2Land, 14, 380, 3)
        if (t >= T.clink && t < T.clink + 0.6) sparkles(t, 540, 1000, T.clink, 8, 120, 2, [GOLD, '#ffffff'])
        floatHearts(t, 540, 1150, T.hearts)
      }
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 6.2 (inert: H0 → H1 as Libra picks), 10.9 (the empty stage → the last line, the one that plays).
const CUTS = [6.2, { t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: episodeNumeral(EP) }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...wordPops(T.h0, 3, 0.1, 0, 0.024), ['pop', T.h0Land, 1046.5, 0.05, 0], ['pluck', T.h0Land, 1046.5, 0.04, 0.6, 0],
  ['pop', T.starsIn[0] + 0.05, 659.25, 0.03, -0.5], ['pop', T.starsIn[1] + 0.05, 783.99, 0.03, 0.5],
  ['tick', T.note, 0.05], ['pop', T.chipA, 880, 0.03, -0.4],
  ...T.cards.map((c, i) => ['tick', +(c + 0.03).toFixed(3), 0.04]), ['pop', T.chipL, 1046.5, 0.03, 0.4],
  ['pop', T.open, 659.25, 0.04, 0], ['pop', T.open + 0.06, 880, 0.03, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { [AT]: 620, [LT_]: 880 } }),
  ...Array.from({ length: 12 }, (_, i) => ['tick', +(T.l1 + i * 0.36 + 0.2).toFixed(3), 0.018]),       // Aries tapping
  ['whoosh', T.tip[0], 0.3, 0.02], ['chip', T.level[0], 1200, 0.1, { wave: 'tri', gain: 0.02 }], ['bell', T.level[1], 1567.98, 0.03, 1.2, 0.3],
  ...wordPops(T.h1, 1, 0.08, 2, 0.026), ['pop', T.h1Land, 1046.5, 0.05, 0],
  ['pluck', T.pick[1], 1318.51, 0.04, 0.6, 0], ['glitter', T.pick[1] - 0.1, T.pick[1] + 0.4], ['whoosh', T.flutter[0], 0.5, 0.03],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  ['pop', T.grab, 783.99, 0.035, 0], ['whoosh', T.run[0], 0.5, 0.05], ['boom', T.run[0] + 0.1, 0.1],
  ['tick', T.ghost + 0.1, 0.016],
  ...wordPops(T.h2, 1, 0.1, 1, 0.026), ['pop', T.h2Land, 1046.5, 0.05, 0], ['pop', T.h2Land + 0.14, 1174.66, 0.045, 0], ['pluck', T.h2Land, 1046.5, 0.045, 0.7, 0], ['glitter', T.h2Land, T.h2Land + 0.5],
  ['bell', T.clink, 2093, 0.035, 1.0, 0], ['tick', T.clink, 0.04],
  ...Array.from({ length: 8 }, (_, i) => ['pop', +(T.hearts + i * 0.2 + 0.4).toFixed(3), NOTE[(i * 2) % 7] * 2, 0.012, i % 2 ? 0.3 : -0.3]),
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
