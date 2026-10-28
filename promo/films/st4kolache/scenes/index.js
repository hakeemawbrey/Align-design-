// st4kolache (15 s vertical Align ad, Star Talk season 4 · EP 004, thread F: Taurus × Scorpio) · story 0–10.6.
//   0.00–5.45  "Kolaches or | breakfast *tacos?*"  A chalkboard behind the date: a kolache & a taco. A blind date at a little
//              table: the gold ♉ Taurus star (Venus-ruled fixed earth) in its plaid blanket cape, and its date under a
//              lavender veil, the ♏ badge showing through (the Scorpio of EP 013). An open pastry box holds ONE kolache.
//              Taurus drags the box over to its side and squints, guarding. The ghost peeks out of the box (1.4–2.75).
//              Drop (2.84): ♉ TAURUS STAR: "the last one is mine. *obviously.*"
//   5.50–8.60  "Venus-ruled. | Loves a *snack.*"  THE STARS: "the one who shares the last bite is a *keeper*." Taurus's eyes
//              go wide… it softens, lifts the kolache, splits it, and floats half across. The veiled Scorpio sparkles.
//   8.70 cut → "Share the | *last* one."  Both munching halves, heart-eyed. Out by 10.45.
// Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { drawSeedConstellation, drawGhostCameo, episodeNumeral } from '../../stlore.js'

export const DURATION = 15
const EP = 4
const STORY_END = DURATION - ENDCARD_LEN       // 10.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', VEIL = '#c9a6ff', BERRY = '#e8607a'
const MONO = "'Space Mono', ui-monospace, monospace"
const TAU = signStar('taurus'), SCO = signStar('scorpio')

// ── the timeline
const T = {
  h0: 0.15, h0Land: 0.75, stars: 0.3, table: 0.4, box: 0.6, grab: [1.15, 1.5], ghost: 1.45,
  open: 2.62, l1: 2.84, h0Out: [5.3, 5.46],
  l2: 5.5, h1: 5.52, h1Land: 5.95, soften: 6.7, lift: [6.85, 7.2], split: 7.25, pass: [7.4, 7.9], scoHappy: 7.9,
  close: 8.6, h1Out: [8.46, 8.64],
  cut: 8.7, h2: 8.76, h2Land: 9.16, munch: [9.4, 9.85], heart: 9.55, h2Out: [10.15, 10.4], out: [10.05, 10.45],
}
const TAU_TAG = `${TAU.glyph} TAURUS STAR`, SKY_TAG = 'THE STARS'
const LINES = [
  { t: T.l1, speaker: TAU_TAG, color: TAU.color, text: 'the last one is mine. *obviously.*' },
  { t: T.l2, speaker: SKY_TAG, text: 'the one who shares the last bite is a *keeper*.' },
]
const CPS = 32

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }

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
const HEART = ['.H.H.', 'HWHHH', 'HHHHH', '.HHH.', '..H..']
const KOLACHE = ['..yyyyy..', '.yYYYYYy.', 'yYYpppYYy', 'yYpPPPpYy', 'yYpPWPpYy', 'yYYpppYYy', '.yYYYYYy.', '..ddddd..']
const HALF_K = ['..yyy', '.yYYY', 'yYYpp', 'yYpPP', 'yYpPW', 'yYYpp', '.yYYY', '..ddd']
const K_C = { y: '#fff1c8', Y: '#e8b26a', d: '#b07a3a', p: '#a8324a', P: BERRY, W: '#ffd1de' }
const TACO = ['...ggEEgg...', '..gEErEEEg..', '.TTEEEEErTT.', 'TTTTTTTTTTTT', '.TtTTTTTTtT.', '..TTTTTTTT..']
const TACO_C = { T: '#f1e3c4', t: '#d8b98a', E: '#f7d34a', r: '#d6453a', g: '#5fbf6a' }
const PLAID = { A: '#c8443a', B: '#f1e3c4', C: '#8a2a2a' }

// ── layout
const TAU0 = { x: 250, y: 1100, size: 280 }
const SCO0 = { x: 830, y: 1110, size: 270 }
const TABLE = { x: 540, y: 1290, w: 500 }
const BOX = { x0: 610, x1: 470, w: 180, h: 64 }
const LOW = 120
const lowK = t => ease.inOutCubic(prog(t, T.cut - 0.06, T.cut + 0.06))

function tauState(t) {
  if (t < T.grab[0]) return { mood: 'sparkle', look: [1, 1] }                       // a kolache!
  if (t < T.l2 + 0.6) return { mood: 'squint', look: [1, 0] }                         // guarding
  if (t < T.soften) return { mood: 'wide', look: [0, 0], blink: false }              // …a keeper?
  if (t < T.heart) return { mood: 'happy' }
  return { mood: 'heart' }
}
function scoState(t) {
  if (t < T.grab[1]) return { mood: 'neutral', look: [-1, 1] }
  if (t < T.l2) return { mood: 'eyeroll' }
  if (t < T.scoHappy) return { mood: 'wide', look: [-1, 0], blink: false }
  if (t < T.heart) return { mood: 'sparkle', look: [-1, 0] }
  return { mood: 'heart' }
}
const TAU_HOPS = [T.stars + 0.3, ...talkHops(LINES, TAU_TAG, { cps: CPS }), T.split, T.h2Land, ...[0, 1, 2].map(i => T.munch[0] + i * 0.2)]
const SCO_HOPS = [T.stars + 0.4, T.scoHappy, T.h2Land + 0.08, T.munch[0] + 0.1, T.munch[0] + 0.3]
const boxX = t => lerp(BOX.x0, BOX.x1, ease.inOutCubic(prog(t, ...T.grab)))

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 30px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, 'Kolaches or | breakfast *tacos?*', { top: 196, size: 100, accentSize: 150, at: T.h0, gap: 0.09, late: 1, lateAt: T.h0Land, wobble: true, accentColor: GOLD })
  const H1 = popText(root, 'Venus-ruled. | Loves a *snack.*', { top: 196, size: 100, accentSize: 150, at: T.h1, gap: 0.08, late: 1, lateAt: T.h1Land, wobble: true, accentColor: BERRY })
  const H2 = popText(root, 'Share the | *last* one.', { top: 200, size: 136, accentSize: 200, at: T.h2, gap: 0.1, late: 2, lateAt: T.h2Land, lateGap: 0.14, wobble: true, accentColor: GOLD })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1440, width: 960, height: 300, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  function sparkles(t, cx, cy, t0, n, R, seed, cols = [GOLD, BONE, PINK, VEIL]) {
    const tt = t - t0
    if (tt < 0 || tt > 0.7) return
    const p = ease.outCubic(tt / 0.7)
    x.save(); x.globalAlpha = 1 - ease.inQuad(tt / 0.7)
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 + seed
      drawPixelStar(x, cx + Math.cos(a) * R * (0.7 + 0.5 * p), cy + Math.sin(a) * R * (0.7 + 0.5 * p), 26 * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length])
    }
    x.restore()
  }
  function floatHearts(t, cx, cy, t0, t1, seed, cell = 7) {
    for (let i = 0; i < 8; i++) {
      const born = t0 + i * 0.15, life = 1.1
      if (t < born || born > t1) continue
      const p = (t - born) / life
      if (p >= 1) continue
      const side = ((i * 37 + seed) % 7) / 6 - 0.5
      drawBits(x, HEART, { H: '#ff4f86', W: '#ffd1de' }, Math.round(cx + side * 520 + Math.sin(p * 7 + i) * 18), Math.round(cy - 40 - p * 220), cell * (0.7 + 0.5 * Math.sin(Math.PI * Math.min(1, p * 1.6))), { alpha: Math.sin(Math.PI * p) })
    }
  }

  // the chalkboard: kolache & taco
  function drawBoard(t) {
    const a = clamp(prog(t, 0.1, 0.45)) * outK(t, T.out)
    if (a <= 0) return
    const bx = 540, by = 640, bw = 520, bh = 190
    x.save(); x.globalAlpha = a
    x.fillStyle = INK; x.fillRect(bx - bw / 2 - 14, by - bh / 2 - 14, bw + 28, bh + 28)
    x.fillStyle = '#8a5a34'; x.fillRect(bx - bw / 2 - 8, by - bh / 2 - 8, bw + 16, bh + 16)
    x.fillStyle = '#1f3a32'; x.fillRect(bx - bw / 2, by - bh / 2, bw, bh)
    x.fillStyle = 'rgba(255,255,255,0.06)'; for (let k = 0; k < 6; k++) x.fillRect(bx - bw / 2 + 30 + k * 80, by - bh / 2 + 20 + (k % 3) * 40, 50, 6)
    drawBits(x, KOLACHE, K_C, bx - 140, by + 4, 12, { outline: '#efe6d6' })
    drawBits(x, TACO, TACO_C, bx + 140, by + 8, 12, { outline: '#efe6d6' })
    x.font = `700 64px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = BONE
    x.fillText(Math.sin(t * 3) > -0.9 ? '&' : '?', bx, by + 4)
    x.restore()
  }

  function drawTable(t, dy, ok) {
    const tin = ease.outCubic(prog(t, T.table, T.table + 0.35)) * ok
    if (tin <= 0.01) return
    const y = TABLE.y + dy + (1 - tin) * 400, x0 = TABLE.x - TABLE.w / 2
    x.save(); x.globalAlpha = clamp(tin * 2)
    x.fillStyle = INK; x.fillRect(TABLE.x - 18, y, 36, 150); x.fillRect(TABLE.x - 80, y + 140, 160, 22)
    x.fillStyle = '#8a5a34'; x.fillRect(TABLE.x - 12, y, 24, 144); x.fillRect(TABLE.x - 74, y + 144, 148, 12)
    x.fillStyle = INK; x.fillRect(x0 - 6, y - 26, TABLE.w + 12, 34)
    x.fillStyle = BONE; x.fillRect(x0, y - 20, TABLE.w, 22); x.fillStyle = '#e8b26a'; for (let i = 0; i < TABLE.w; i += 44) x.fillRect(x0 + i, y - 20, 22, 22)
    // crumbs
    x.fillStyle = '#e8b26a'; for (const [cx, cy] of [[x0 + 60, -32], [x0 + 330, -30], [x0 + 380, -34], [x0 + 120, -31]]) x.fillRect(cx, y + cy, 8, 6)
    x.restore()
    return y - 20
  }
  // the open pastry box (behind: lid; front: base). Returns where the kolache sits.
  function drawBoxBack(t, top, ok) {
    const bp = pop01(t, T.box, 0.3, 2.4) * ok
    if (bp <= 0.01) return null
    const bx = boxX(t), w = BOX.w * bp, h = BOX.h * bp
    // lid tilted back
    x.fillStyle = INK; x.fillRect(bx - w / 2 - 6, top - h - 62 * bp, w + 12, 68 * bp)
    x.fillStyle = '#ffd1de'; x.fillRect(bx - w / 2, top - h - 56 * bp, w, 56 * bp)
    x.fillStyle = '#ffb3c8'; x.fillRect(bx - w / 2, top - h - 16 * bp, w, 16 * bp)
    return { bx, top, w, h, bp }
  }
  function drawBoxFront(B) {
    if (!B) return
    const { bx, top, w, h } = B
    x.fillStyle = INK; x.fillRect(bx - w / 2 - 6, top - h - 6, w + 12, h + 6)
    x.fillStyle = '#ffb3c8'; x.fillRect(bx - w / 2, top - h, w, h)
    x.fillStyle = '#ff8fb1'; x.fillRect(bx - w / 2, top - h, w, 10); x.fillRect(bx - w / 2, top - 12, w, 12)
    x.fillStyle = '#ffffff'; x.fillRect(bx - 12, top - h / 2 - 10, 24, 20); x.fillStyle = BERRY; x.fillRect(bx - 6, top - h / 2 - 4, 12, 8)
  }

  function cape(r, size, ok) {
    const c = Math.max(4, Math.round(size / 36)), cy = r.y + size * 0.02
    const flap = Math.sin(r.t * 6) > 0 ? c : 0
    x.save(); x.globalAlpha = clamp(ok * 2)
    for (const sd of [-1, 1]) for (let j = 0; j < 9; j++) for (let i = 0; i < 4; i++) {
      const px = r.x + sd * (size * 0.36 + i * c) - (sd < 0 ? c : 0), py = cy + j * c - 2 * c + i * c * 0.6 + (i > 2 ? flap * 0 : 0)
      x.fillStyle = (i + j) % 3 === 0 ? PLAID.C : (i + j) % 2 ? PLAID.A : PLAID.B
      x.fillRect(Math.round(px), Math.round(py), c, c)
    }
    x.restore()
  }
  function veil(t, r, size, ok) {
    x.save(); x.globalAlpha = 0.5 * clamp(ok * 2)
    const c = Math.max(4, Math.round(size / 30)), top = r.top - c * 2
    for (let j = 0; j < 30; j++) {
      const yy = top + j * c, k = j / 30, hw = size * (0.14 + 0.42 * Math.min(1, k * 1.6)) + Math.sin(j * 0.8 + t * 2) * c * 0.5
      x.fillStyle = j % 4 === 0 ? '#e7d8ff' : VEIL
      x.fillRect(Math.round(r.x - hw), Math.round(yy), Math.round(2 * hw), c)
    }
    x.restore()
    for (let i = 0; i < 5; i++) {
      const ph = (t * 0.5 + i * 0.21) % 1
      x.save(); x.globalAlpha = Math.sin(Math.PI * ph) * 0.9 * clamp(ok * 2)
      drawPixelStar(x, r.x + Math.cos(i * 2.3) * size * 0.4, r.y + Math.sin(i * 1.7) * size * 0.3 - ph * 30, 16, 2, '#fff', '#e7d8ff')
      x.restore()
    }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      const base = t < 3 ? { ...SKY_H, zoom: lerp(1.5, SKY_H.zoom, ss), dy: lerp(-24, 0, ss) } : SKY_H
      drawSky(x, t, base)
      drawSeedConstellation(x, t, EP)
      drawBoard(t)
      const ok = popOut(t, T.out), dy = LOW * lowK(t)
      if (ok > 0) {
        const tp = pop01(t, T.stars, 0.38, 2.2) * ok, sp = pop01(t, T.stars + 0.1, 0.38, 2.2) * ok
        const lean = t > T.grab[0] && t < T.l2 + 0.6 ? -0.05 : 0
        const gasp = t >= T.l2 + 0.6 && t < T.l2 + 1.1 ? -0.12 * Math.exp(-(t - T.l2 - 0.6) * 7) * Math.cos((t - T.l2 - 0.6) * 20) : 0
        const preT = { x: TAU0.x, y: TAU0.y + dy, t }
        cape(preT, TAU0.size * tp, tp)
        const rT = drawStarChar(x, TAU0.x, TAU0.y + dy, TAU0.size, t, { color: TAU.color, glyph: TAU.glyph, ...tauState(t), hops: TAU_HOPS, pop: tp, seed: 5, squash: lean + gasp, glow: 1.1 })
        const rS = drawStarChar(x, SCO0.x, SCO0.y + dy, SCO0.size, t, { color: SCO.color, glyph: SCO.glyph, ...scoState(t), hops: SCO_HOPS, pop: sp, seed: 11, glow: 0.9 })
        veil(t, rS, SCO0.size * sp, sp)
        const top = drawTable(t, dy, ok)
        const B = top != null ? drawBoxBack(t, top, ok) : null
        // the kolache: in the box → lifted → split → half floats to Scorpio → munched
        if (B) {
          const kIn = { x: B.bx - 34, y: B.top - B.h - 10 }
          const lp = ease.outBack(prog(t, ...T.lift)), up = { x: lerp(kIn.x, TABLE.x, lp), y: lerp(kIn.y, kIn.y - 150, lp) }
          const munchK = i => { const m = prog(t, T.munch[0] + i * 0.12, T.munch[1] + i * 0.12); return 1 - 0.55 * m }
          const drawK = () => {
          if (t < T.split) drawBits(x, KOLACHE, K_C, Math.round(up.x), Math.round(up.y), 11 * B.bp, { rot: lp > 0 ? Math.sin(t * 8) * 0.06 : 0 })
          else {
            const sp2 = ease.outBack(prog(t, T.split, T.split + 0.3)), pp = ease.inOutCubic(prog(t, ...T.pass))
            const lx = lerp(up.x - 30 - sp2 * 40, rT.x + 120, pp), ly = lerp(up.y, rT.y + 40, pp) - Math.sin(Math.PI * pp) * 60
            const rx = lerp(up.x + 30 + sp2 * 40, rS.x - 120, pp), ry = lerp(up.y, rS.y + 40, pp) - Math.sin(Math.PI * pp) * 120
            drawBits(x, HALF_K, K_C, Math.round(lx), Math.round(ly), 11 * munchK(0), { rot: -0.15 * sp2 })
            drawBits(x, HALF_K, K_C, Math.round(rx), Math.round(ry), 11 * munchK(1), { rot: 0.15 * sp2, flip: true })
            sparkles(t, up.x, up.y, T.split, 10, 110, 2, [GOLD, BERRY, BONE, VEIL])
          }
          }
          if (t < T.lift[0]) { drawK(); drawBoxFront(B) } else { drawBoxFront(B); drawK() }
          // the ghost peeks up out of the pastry box (behind its front panel? no: drawn after it, clipped above its rim)
          drawGhostCameo(x, t, { x: B.bx + 48, y: B.top - B.h - 6, at: T.ghost, dur: 1.3, from: 'below', cell: 2.4 })
        }
        // guard marks
        if (t > T.grab[0] && t < T.grab[0] + 0.7) { x.save(); x.globalAlpha = Math.sin(Math.PI * prog(t, T.grab[0], T.grab[0] + 0.7)); x.font = `700 72px ${MONO}`; x.textAlign = 'center'; x.fillStyle = GOLD; x.fillText('!', rT.x + 120, rT.top - 10); x.restore() }
        sparkles(t, rS.x, rS.y, T.scoHappy, 12, 190, 3, [VEIL, GOLD, BONE, SCO.color])
        if (t > T.heart) floatHearts(t, 540, rT.y - 40, T.heart, T.out[0], 3, 7)
      }
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidate: 8.7 (box shut → "Share the last one."). End card flips at 10.6.
const CUTS = [{ t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, numeral: episodeNumeral(EP) }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...wordPops(T.h0, 3, 0.09, 0, 0.026), ['pop', T.h0Land, 1174.66, 0.045, 0],
  ['pop', T.stars + 0.05, 739.99, 0.04, -0.3], ['pop', T.stars + 0.15, 659.25, 0.035, 0.3], ['tick', T.table + 0.3, 0.04],
  ['pop', T.box + 0.05, 1318.51, 0.035, 0], ['bell', T.box + 0.15, 1760, 0.02, 0.8, 0],
  ['whoosh', T.grab[0], 0.35, 0.03], ['tick', T.grab[1], 0.05], ['pluck', T.grab[0], 440, 0.04, 0.4, -0.3],
  ['pop', T.ghost + 0.1, 1318.51, 0.018, 0],
  ['pop', T.open, 739.99, 0.04, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES, { cps: CPS }),
  ...wordPops(T.h1, 3, 0.08, 2, 0.025), ['pop', T.h1Land, 1174.66, 0.045, 0],
  ['pop', T.l2 + 0.6, 440, 0.035, 0],
  ['whoosh', T.lift[0], 0.3, 0.025], ['pop', T.split, 1318.51, 0.05, 0], ['tick', T.split, 0.05], ['glitter', T.split, T.split + 0.5],
  ['whoosh', T.pass[0], 0.45, 0.03], ['pluck', T.scoHappy, 1174.66, 0.04, 0.6, 0.3], ['bell', T.scoHappy + 0.05, 1567.98, 0.025, 1.0, 0.3],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  ...wordPops(T.h2, 2, 0.1, 1, 0.028), ['pop', T.h2Land, 1318.51, 0.055, 0], ['pop', T.h2Land + 0.14, 1567.98, 0.05, 0], ['pluck', T.h2Land + 0.14, 1174.66, 0.05, 0.7, 0],
  ...[0, 1, 2, 3].map(i => ['tick', +(T.munch[0] + i * 0.15).toFixed(3), 0.035]),
  ['pluck', T.heart, 1174.66, 0.04, 0.5, 0], ['bell', T.heart + 0.05, 1760, 0.025, 1.0, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
