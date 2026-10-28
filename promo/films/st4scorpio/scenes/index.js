// st4scorpio (EP 013, 15 s vertical Align ad, Star Talk season 4, thread F: Taurus × Scorpio) · story 0–10.6, then the
// shared end card ("come" + the Align logo, JOIN THE HOUSTON BETA).
//   0.00–5.45  "Dear Scorpio: | the *detective.*"  The ♏ Scorpio star, in a pixel trench coat and fedora, squints through a
//              magnifying glass at a corkboard: its kolache date's veiled card (♉) in the middle, red string out to four
//              notes: SHARED THE LAST KOLACHE · WEARS A BLANKET AS A CAPE · SNACK BUDGET: HIGH · SAYS "Y'ALL" A LOT.
//              Box (THE STARS): "you know everything about them."  Scorpio, smug.
//   5.55–8.85  "Investigation: | *one-sided.*"  Box: "they know nothing about you. go *first.*"  Scorpio goes wide-eyed; the
//              corkboard flips over: its own card, ABOUT SCORPIO, completely blank.
//   8.9        card cut (flip).
//   9.0–10.5   "Be *known,* too."  Scorpio blushes and chalks the first line onto its own card: "i'm shy at first."
//              Everything pops out by 10.45; the end card takes over at 10.6.
// Season lore: the 100-star constellation (EP 13) top-left; the ghost hangs down under the corkboard's bottom edge
// (3.7–5.0). One canvas (sky + board + Scorpio + props), DOM type + the box above it. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { drawSeedConstellation, drawGhostCameo, episodeNumeral } from '../../stlore.js'

export const EP = 13
export const DURATION = 15
const W = 1080
const STORY_END = DURATION - ENDCARD_LEN       // 10.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', RED = '#ff4a5a', LAV = '#c9a6ff'
const MONO = "'Space Mono', ui-monospace, monospace"
const SERIF = "'EB Garamond', 'DejaVu Sans', serif"
const BEAT = n => 0.6 + n * 0.5556            // 108 bpm grid
const SCO = signStar('scorpio'), TAU = signStar('taurus')

// ── the timeline
const T = {
  h0: 0.1, h0Land: 0.75, h0Out: [5.3, 5.48],
  board: 0.25, scoIn: 0.4, notes: [0.9, 1.15, 1.4, 1.65], strings: [1.0, 2.2], mag: [1.2, 1.6],
  open: 2.66, l1: BEAT(4),                                            // 2.82: the drop
  smug: 4.3,
  h1: 5.55, h1Land: 5.95, l2: 5.6, gasp: 6.7, flip: [7.4, 7.9], stare: 7.95, close: 8.75, h1Out: [8.6, 8.78],
  cut: 8.9,
  h2: 9.0, h2Land: 9.3, write: [9.35, 10.05], h2Out: [10.24, 10.44], out: [10.06, 10.45],
  ghost: 3.7,
}
const NARR = 'THE STARS'
const LINES = [
  { t: T.l1, speaker: NARR, text: 'you know everything about them.' },
  { t: T.l2, speaker: NARR, text: 'they know nothing about you. go *first.*' },
]
const CPS = 30
const NOTES = [
  { x: 528, y: 640, rot: -0.06, a: 'SHARED THE', b: 'LAST KOLACHE' },
  { x: 872, y: 630, rot: 0.07, a: 'BLANKET', b: 'AS A CAPE' },
  { x: 528, y: 885, rot: 0.05, a: 'SNACK', b: 'BUDGET: HIGH' },
  { x: 872, y: 890, rot: -0.05, a: 'SAYS', b: "“Y'ALL” A LOT" },
]
const BOARD = { x: 700, y: 765, w: 600, h: 440 }           // centre + size
const SCO_A = { x: 235, y: 1175, size: 350 }, SCO_B = { x: 330, y: 1390, size: 440 }
const scoP = t => (t >= T.cut ? SCO_B : SCO_A)
const boardY = t => BOARD.y + (t >= T.cut ? 60 : 0)
const OWN = "i'm shy at first."

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }

const BMP = s => s.trim().split(/\s+/)
// fedora (band B) and a trench-coat front (lapels L, belt b, buttons o)
const HAT = BMP(`
....HHHHHHH....
...HHHHHHHHH...
...HhhhhhhhH...
...BBBBBBBBB...
HHHHHHHHHHHHHHH
.HHHHHHHHHHHHH.`)
const COAT = BMP(`
LL.........LL
CLL.......LLC
CCLL.....LLCC
CCCLL...LLCCC
CCCCLL.LLCCCC
CCCCCCoCCCCCC
bbbbbbbbbbbbb
CCCCCCoCCCCCC
CCCCCC.CCCCCC
CCCCCC.CCCCCC`)
const HEART = BMP(`.XX.XX. XXXXXXX XXXXXXX .XXXXX. ..XXX.. ...X...`)
function bits(x, bm, cx, cy, cell, cols, { rot = 0, a = 1 } = {}) {
  if (a <= 0 || cell <= 0) return
  const w = bm[0].length, h = bm.length
  x.save(); x.globalAlpha *= a; x.translate(Math.round(cx), Math.round(cy)); x.rotate(rot)
  x.fillStyle = 'rgba(14,8,32,0.88)'
  bm.forEach((r, j) => [...r].forEach((ch, i) => { if (ch !== '.') x.fillRect((i - w / 2) * cell - cell * 0.5, (j - h / 2) * cell - cell * 0.5, cell * 2, cell * 2) }))
  bm.forEach((r, j) => [...r].forEach((ch, i) => { if (ch === '.') return; x.fillStyle = cols[ch] || cols.X; x.fillRect((i - w / 2) * cell, (j - h / 2) * cell, cell + 0.5, cell + 0.5) }))
  x.restore()
}

function scoState(t) {
  if (t < T.mag[0]) return { mood: 'neutral', look: [1, -1] }
  if (t < T.smug) return { mood: 'squint', look: [1, -1], blink: false }
  if (t < T.l2) return { mood: 'wink', look: [0, 0] }                          // smug: i know EVERYTHING
  if (t < T.gasp) return { mood: 'neutral', look: [0, 0] }
  if (t < T.flip[1]) return { mood: 'wide', look: [0, 0], blink: false }       // …they know nothing about me?
  if (t < T.h2) return { mood: 'wide', look: [1, -1], blink: false }           // the blank card
  if (t < T.write[1]) return { mood: 'sparkle', look: [1, -1], blush: 1 }
  return { mood: 'happy', blush: 1 }
}
const SCO_HOPS = [T.scoIn + 0.3, T.smug, T.smug + 0.35, T.gasp, T.h2Land, T.write[1] + 0.1]

async function build(stage) {
  try {
    await Promise.all(["800 104px Inter", "italic 500 160px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 24px 'Space Mono'", "700 30px 'Space Mono'", "bold 58px 'EB Garamond'", "italic 500 44px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, 'Dear Scorpio: | the *detective.*', { top: 190, size: 104, accentSize: 156, at: T.h0, gap: 0.09, late: 1, lateAt: T.h0Land, wobble: true, accentColor: RED })
  const H1 = popText(root, 'Investigation: | *one-sided.*', { top: 190, size: 104, accentSize: 156, at: T.h1, gap: 0.08, late: 1, lateAt: T.h1Land, wobble: true, accentColor: GOLD })
  const H2 = popText(root, 'Be *known,* too.', { top: 230, size: 108, accentSize: 158, fit: true, at: T.h2, gap: 0.08, late: -1, lateAt: T.h2Land, wobble: true, accentColor: PINK })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1420, width: 960, height: 300, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // ── the corkboard: front (the case file on them) flips to the back (Scorpio's own blank card)
  function pin(px, py, col = RED) { x.fillStyle = INK; x.fillRect(px - 8, py - 8, 16, 16); x.fillStyle = col; x.fillRect(px - 6, py - 6, 12, 12); x.fillStyle = '#ffffff'; x.fillRect(px - 4, py - 4, 4, 4) }
  function corkBase(w, h) {
    x.fillStyle = INK; x.fillRect(-w / 2 - 12, -h / 2 - 12, w + 24, h + 24)
    x.fillStyle = '#8a5a2a'; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
    x.fillStyle = '#c99a5a'; x.fillRect(-w / 2 + 8, -h / 2 + 8, w - 16, h - 16)
    x.fillStyle = 'rgba(110,70,32,0.35)'
    for (let i = 0; i < 60; i++) x.fillRect(-w / 2 + 14 + ((i * 97) % (w - 34)), -h / 2 + 14 + ((i * 61) % (h - 34)), 5, 5)
  }
  function front(t) {
    const { w, h } = BOARD
    corkBase(w, h)
    // red string from each note to the veiled card
    const sp = prog(t, ...T.strings)
    x.strokeStyle = RED; x.lineWidth = 4
    NOTES.forEach((n, i) => {
      const k = clamp(sp * 4 - i)
      if (k <= 0) return
      const nx = n.x - BOARD.x, ny = n.y - BOARD.y
      x.beginPath(); x.moveTo(nx, ny - 30); x.lineTo(lerp(nx, 0, k), lerp(ny - 30, -40, k)); x.stroke()
    })
    // the veiled date card in the middle (card back + ♉ coin)
    const ck = pop01(t, T.board + 0.2, 0.35, 2)
    x.save(); x.translate(0, -10); x.scale(ck, ck); x.rotate(0.02)
    x.fillStyle = INK; x.fillRect(-72, -96, 144, 192)
    const g = x.createLinearGradient(0, -90, 0, 90); g.addColorStop(0, '#3a2470'); g.addColorStop(1, '#1d1240')
    x.fillStyle = g; x.fillRect(-66, -90, 132, 180)
    x.strokeStyle = GOLD; x.lineWidth = 3; x.strokeRect(-56, -80, 112, 160)
    x.fillStyle = rgba(GOLD, 0.9); x.font = `700 64px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('?', 0, -6)
    x.fillStyle = TAU.color; x.beginPath(); x.arc(42, 62, 24, 0, Math.PI * 2); x.fill(); x.fillStyle = INK; x.font = `700 30px ${SERIF}`; x.fillText(TAU.glyph + '︎', 42, 64)
    x.restore()
    pin(0, -100)
    // the notes
    NOTES.forEach((n, i) => {
      const k = pop01(t, T.notes[i], 0.3, 2.4)
      if (k <= 0.01) return
      x.save(); x.translate(n.x - BOARD.x, n.y - BOARD.y); x.rotate(n.rot); x.scale(k, k)
      x.fillStyle = INK; x.fillRect(-122, -46, 244, 92)
      x.fillStyle = i % 2 ? '#fff6c8' : '#f7f3ea'; x.fillRect(-118, -42, 236, 84)
      x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
      x.fillText(n.a, 0, -14); x.fillText(n.b, 0, 16)
      x.restore()
      pin(n.x - BOARD.x, n.y - BOARD.y - 34)
    })
  }
  function back(t) {
    const { w, h } = BOARD
    corkBase(w, h)
    x.save(); x.rotate(-0.02)
    x.fillStyle = INK; x.fillRect(-224, -168, 448, 336)
    x.fillStyle = '#f7f3ea'; x.fillRect(-218, -162, 436, 324)
    x.fillStyle = RED; x.fillRect(-218, -110, 436, 4)
    x.fillStyle = 'rgba(80,140,220,0.45)'
    for (let r = 0; r < 4; r++) x.fillRect(-200, -50 + r * 56, 400, 3)
    x.fillStyle = INK; x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.fillText('ABOUT SCORPIO:', 0, -134)
    // the first line, written in (Garamond italic, ink), letter by letter
    const n = Math.floor(clamp(prog(t, ...T.write)) * OWN.length)
    if (n > 0) { x.font = `italic 500 44px ${SERIF}`; x.textAlign = 'left'; x.fillStyle = '#2a1a6a'; x.fillText(OWN.slice(0, n), -190, -68) }
    x.restore()
    pin(0, -172)
  }
  function drawBoard(t) {
    const k = pop01(t, T.board, 0.4, 1.7) * popOut(t, T.out)
    if (k <= 0.01) return
    const fp = prog(t, ...T.flip), sx = Math.cos(Math.PI * ease.inOutCubic(fp))
    x.save(); x.translate(BOARD.x, boardY(t) + Math.sin(Math.PI * fp) * -20); x.scale(k * Math.max(0.02, Math.abs(sx)), k)
    if (sx >= 0) front(t); else back(t)
    x.restore()
  }

  // ── Scorpio: coat, fedora, magnifier
  function drawScorpio(t) {
    const ok = popOut(t, T.out)
    const pk = pop01(t, T.scoIn, 0.38, 2.1) * ok
    if (pk <= 0.02) return null
    const st = scoState(t)
    const gasp = t >= T.gasp && t < T.gasp + 0.5 ? -0.12 * Math.exp(-(t - T.gasp) * 7) * Math.cos((t - T.gasp) * 20) : 0
    const SP = scoP(t), r = drawStarChar(x, SP.x, SP.y, SP.size * pk, t, { color: SCO.color, glyph: SCO.glyph, ...st, hops: SCO_HOPS, seed: 7, glow: 1, squash: gasp })
    const cell = SP.size * pk / 34
    // trench coat over the body (tan), then the fedora on the top tip
    bits(x, COAT, r.x, r.y + cell * 10, cell * 0.85, { C: '#c9a46a', L: '#e2c48c', b: '#7a5a2a', o: '#3a2a14' })
    const tipY = r.top + cell * 3.2 + (t >= T.gasp && t < T.gasp + 0.4 ? -30 * Math.sin(Math.PI * prog(t, T.gasp, T.gasp + 0.4)) : 0)
    bits(x, HAT, r.x, tipY, cell * 1.05, { H: '#6b5a44', h: '#8a765a', B: '#2a2016' }, { rot: -0.1 })
    // the magnifier (until the board flips): rises to the eye-line, aimed at the board
    const mk = pop01(t, T.mag[0], 0.35, 2) * (1 - ease.inCubic(prog(t, T.flip[0], T.flip[0] + 0.3)))
    if (mk > 0.01) {
      const mx = r.x + 140, my = r.y - 10 + Math.sin(t * 3) * 6
      x.save(); x.translate(mx, my); x.rotate(-0.6); x.scale(mk, mk)
      x.fillStyle = INK; x.fillRect(-10, 40, 20, 90); x.fillStyle = '#8a5a2a'; x.fillRect(-6, 44, 12, 82)
      x.lineWidth = 16; x.strokeStyle = INK; x.beginPath(); x.arc(0, 0, 50, 0, Math.PI * 2); x.stroke()
      x.lineWidth = 10; x.strokeStyle = GOLD; x.beginPath(); x.arc(0, 0, 50, 0, Math.PI * 2); x.stroke()
      x.fillStyle = 'rgba(190,230,255,0.25)'; x.beginPath(); x.arc(0, 0, 45, 0, Math.PI * 2); x.fill()
      x.fillStyle = 'rgba(255,255,255,0.7)'; x.fillRect(-26, -26, 10, 10); x.fillRect(-14, -34, 8, 8)
      x.restore()
    }
    // chalk/pencil in the last beat
    if (t > T.write[0] - 0.1) {
      const wk = pop01(t, T.write[0] - 0.1, 0.25, 2) * ok, wig = t < T.write[1] ? Math.sin(t * 40) * 6 : 0
      x.save(); x.globalAlpha = clamp(wk); x.translate(r.x + 150, r.y - 60 + wig); x.rotate(0.6)
      x.fillStyle = INK; x.fillRect(-9, -46, 18, 92); x.fillStyle = '#f7c948'; x.fillRect(-6, -36, 12, 70); x.fillStyle = PINK; x.fillRect(-6, -44, 12, 10); x.fillStyle = '#f3ead8'; x.fillRect(-6, 34, 12, 8)
      x.restore()
    }
    return r
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
  function floatHearts(t, cx, cy, t0, t1) {
    for (let i = 0; i < 6; i++) {
      const born = t0 + i * 0.18, life = 1.1
      if (t < born || born > t1) continue
      const p = (t - born) / life
      if (p >= 1) continue
      bits(x, HEART, cx + (((i * 37) % 7) / 6 - 0.5) * 200 + Math.sin(p * 7 + i) * 12, cy - p * 220, 6, { X: i % 2 ? PINK : '#ff4f86' }, { a: Math.sin(Math.PI * p) })
    }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, { ...SKY_H, dim: (SKY_H.dim ?? 1) * 0.85 })
      drawSeedConstellation(x, t, EP)
      if (t < T.out[1] + 0.02) {
        drawBoard(t)
        // the ghost hangs down under the corkboard's bottom edge (drawn after the board)
        drawGhostCameo(x, t, { x: 930, y: BOARD.y + BOARD.h / 2 + 18, at: T.ghost, dur: 1.3, from: 'above', cell: 3 })
        const r = drawScorpio(t)
        sparkles(t, BOARD.x, boardY(t), T.flip[1], 12, 300, 1)
        if (r && t > T.write[1]) floatHearts(t, r.x, r.y - 80, T.write[1], T.out[0])
      }
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidate: 8.9 (box shut, the board turned → "Be known, too."), the one cut a 15 s film keeps.
const CUTS = [{ t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, numeral: episodeNumeral(EP) }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  // the case file: headline, board, Scorpio, notes pinned (tick + pop), the string, the magnifier
  ...wordPops(T.h0, 3, 0.09, 0, 0.024), ['pop', T.h0Land, 1174.66, 0.045, 0], ['pluck', T.h0Land, 1174.66, 0.035, 0.6, 0],
  ['pop', T.board + 0.1, 587.33, 0.035, 0.3], ['pop', T.scoIn + 0.05, 739.99, 0.04, -0.4],
  ...T.notes.flatMap((n, i) => [['tick', +(n + 0.05).toFixed(3), 0.04], ['pop', +(n + 0.08).toFixed(3), NOTE[(i * 2 + 1) % 7], 0.026, 0.3]]),
  ['whoosh', T.strings[0], 1.0, 0.02], ['whoosh', T.mag[0], 0.4, 0.035], ['bell', T.mag[1], 2093, 0.02, 0.8, -0.3],
  ['pop', T.open, 739.99, 0.04, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES, { cps: CPS }),
  ['pluck', T.smug, 1318.51, 0.035, 0.5, -0.3],
  // one-sided: the gasp, the board flips (whoosh + clack), the blank card
  ...wordPops(T.h1, 1, 0.08, 2, 0.026), ['pop', T.h1Land, 1046.5, 0.045, 0],
  ['pop', T.gasp, 440, 0.04, -0.3], ['whoosh', T.flip[0], 0.5, 0.04], ['tick', T.flip[1], 0.045], ['boom', T.flip[1], 0.08],
  ['pop', T.stare + 0.2, 392, 0.03, 0],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  // be known, too: the pencil scribbles, hearts
  ...wordPops(T.h2, 3, 0.08, 1, 0.026), ['pop', T.h2Land, 1318.51, 0.05, 0], ['pluck', T.h2Land, 1174.66, 0.045, 0.7, 0],
  ...Array.from({ length: 7 }, (_, i) => ['tick', +(T.write[0] + i * 0.1).toFixed(3), 0.018]),
  ['bell', T.write[1] + 0.05, 1760, 0.025, 1.0, 0], ['glitter', T.write[1], T.write[1] + 0.4],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
