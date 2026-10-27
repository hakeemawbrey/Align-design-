// starcancer (15 s vertical Align ad, Star Talk batch 3) · story 0–10.6, then the shared end card ("come" + the Align logo).
//   0.00–5.10  "Dear *Cancer…*"  A tiny pixel crab shell sits in the sky… two teary eyes peek out from under its rim:
//              the ♋ star (Moon-ruled, cardinal water) hiding inside, glancing left and right, tears dripping.
//              Drop (2.82): the box opens. THE STARS: "your shell is cute. we made it." → a watery smile.
//   5.10–8.40  "Ruled by the Moon. | Feels *everything.*"  THE STARS: "but let someone *in* before you're sure." → the shell
//              lifts off like a lid, the star steps out, blushing, sparkle-eyed.
//   8.45 cut → "Soft is | *strong.*"  The star, shell set down beside it, and a ♑ Capricorn star (its opposite sign)
//              hops in next to it; a pixel heart pops between them. Everything pops out by 10.45; end card at 10.6.
// One canvas (sky + stars + shell), DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, signStar } from '../../startalk.js'

export const DURATION = 15
const W = 1080
const STORY_END = DURATION - ENDCARD_LEN       // 10.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', SKYBLUE = '#8fd3ff'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const SHADOW = '0 4px 30px rgba(6,4,18,0.9), 0 0 4px rgba(6,4,18,0.6)'
const CAN = signStar('cancer'), CAP = signStar('capricorn')
const AQUA = '#7fd6ff'

// ── the timeline
const T = {
  h0: 0.12, h0Out: [4.92, 5.1],
  shell: 0.25, peek: 0.75, glances: [1.0, 1.35, 1.7], tears: 1.15,
  open: 2.36, l1: 2.55, smile: 3.45,
  h1: 5.16, h1Land: 5.6, l2: 5.3, lift: [6.25, 6.75], step: 6.75, blush: 7.05, close: 8.35, h1Out: [8.2, 8.38],
  cut: 8.45,
  h2: 8.5, h2Land: 8.92, capIn: 9.05, heart: 9.45, h2Out: [10.2, 10.42], out: [10.05, 10.45],
}
const SPEAK = 'THE STARS'
const LINES = [
  { t: T.l1, speaker: SPEAK, text: 'your shell is cute. *we made it.*', color: AQUA },
  { t: T.l2, speaker: SPEAK, text: "but let someone *in* before you're sure.", color: AQUA },
]
const CPS = 30

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }

/** springy word-by-word type: `*word*` = accent (Garamond italic, colour), `|` = line break; the last `late` words pop at lateAt */
function popText(parent, text, { top, size, weight = 800, accentColor = GOLD, accentSize, gap = 0.07, at: t0, late = 0, lateAt = null, lateGap = 0.1, wobble = false, lineHeight = 1.02 }) {
  const box = el('div', { position: 'absolute', left: '60px', width: (W - 120) + 'px', top: top + 'px', textAlign: 'center',
    fontFamily: INTER, fontWeight: weight, fontSize: size + 'px', lineHeight, color: BONE, textShadow: SHADOW, letterSpacing: '-0.01em' }, parent)
  const toks = text.split(' '), nW = toks.filter(w => w !== '|').length
  const ws = []
  let n = 0
  toks.forEach(w => {
    if (w === '|') { el('br', {}, box); return }
    const acc = w.startsWith('*') || w.endsWith('*')
    const style = { display: 'inline-block', margin: '0 0.12em', opacity: 0, transformOrigin: '50% 85%' }
    if (acc) Object.assign(style, { fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontWeight: 500, fontSize: (accentSize || size * 1.09) + 'px', color: accentColor, letterSpacing: '0' })
    const big = late > 0 && n >= nW - late
    ws.push({ t: big ? lateAt + (n - (nW - late)) * lateGap : t0 + n * gap, big, e: el('span', style, box, w.replace(/\*/g, '')) })
    n++
  })
  return {
    update(t, out = 1) {
      box.style.display = out <= 0 || t < t0 ? 'none' : 'block'
      if (box.style.display === 'none') return
      for (const w of ws) {
        const p = prog(t, w.t, w.t + (w.big ? 0.4 : 0.28))
        const sc = w.big ? 0.3 + 0.7 * easeOutBack(p, 3.2) : 0.6 + 0.4 * easeOutBack(p, 2.4)
        const rot = w.big && wobble && t > w.t ? 9 * Math.sin((t - w.t) * 14) * Math.exp(-(t - w.t) * 3.2) : 0
        w.e.style.opacity = String(clamp(p * 3) * out)
        w.e.style.transform = `translateY(${((1 - ease.outCubic(p)) * 30 + (1 - out) * 10).toFixed(2)}px) scale(${(sc * lerp(0.9, 1, out)).toFixed(4)}) rotate(${rot.toFixed(2)}deg)`
      }
    },
  }
}

// ── pixel bits
/** draw a bitmap of cells with a 1-cell ink outline, centred on (cx, cy); flip = mirror horizontally */
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
/** a bone pixel speech bubble with text, tail on `side` ('left' | 'right' | null), centred on (cx, cy) */
function bubble(x, cx, cy, text, { size = 34, fill = BONE, ink = INK, k = 1, side = 'left', font = "'Space Mono', monospace", weight = 700, padX = 22, padY = 16 } = {}) {
  if (k <= 0.01) return
  x.save(); x.font = `${weight} ${size}px ${font}`
  const tw = x.measureText(text).width, P = 6
  const w = Math.round((tw + padX * 2) / P) * P, h = Math.round((size + padY * 2) / P) * P
  x.translate(Math.round(cx), Math.round(cy)); x.scale(k, k)
  const ox = -w / 2, oy = -h / 2
  const slab = (o, col) => { x.fillStyle = col; x.fillRect(ox - o + P, oy - o, w + 2 * o - 2 * P, h + 2 * o); x.fillRect(ox - o, oy - o + P, w + 2 * o, h + 2 * o - 2 * P) }
  slab(P, INK); slab(0, fill)
  if (side) {
    const tx = side === 'left' ? ox + 3 * P : ox + w - 5 * P, dir = side === 'left' ? -1 : 1
    x.fillStyle = INK; x.fillRect(tx - P, oy + h, 4 * P, 2 * P); x.fillRect(tx + (dir < 0 ? -P : 2 * P), oy + h + 2 * P, 2 * P, 2 * P)
    x.fillStyle = fill; x.fillRect(tx, oy + h - P, 2 * P, 2 * P); x.fillRect(tx + (dir < 0 ? 0 : P), oy + h + P, P, P)
  }
  x.fillStyle = ink; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText(text, 0, 2)
  x.restore()
}

// ── layout
const HERO = { x: 540, y: 1080, size: 340 }
const SHELL = { x: 540, rim: 1062, c: 11 }          // the dome sits with its rim just above the star's eyes
const L_FIN = { x: 380, y: 1150, size: 330 }, R_FIN = { x: 740, y: 1150, size: 320 }
const HEART = ['.HH.HH.', 'HWHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...']
const DROP = ['.X.', 'XWX', 'XXX', '.X.']

function heroState(t) {
  if (t < T.peek + 0.15) return { mood: 'neutral', look: [0, 0], blink: 1 }        // hidden: eyes shut under the rim
  if (t < T.glances[0]) return { mood: 'wide', look: [0, 0], blink: false }
  if (t < T.smile) {
    const g = T.glances.filter(v => v <= t).length
    return { mood: 'sparkle', look: [[-1, 0], [1, 0], [0, 0]][(g - 1) % 3], blink: false }   // big glossy, teary eyes
  }
  if (t < T.l2) return { mood: 'happy' }                                                // "we made it." aw.
  if (t < T.lift[0]) return { mood: 'sparkle', look: [0, 0] }
  if (t < T.blush) return { mood: 'wide', look: [0, -1], blink: false }                  // the lid lifts: eek
  if (t < T.cut) return { mood: 'happy', blush: 1 }
  if (t < T.capIn + 0.2) return { mood: 'happy', blush: 1 }
  return { mood: 'heart', look: [1, 0], blush: 1 }
}

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const H0 = popText(root, 'Dear *Cancer…*', { top: 265, size: 112, accentSize: 160, at: T.h0, gap: 0.12, accentColor: AQUA, wobble: true, late: 1, lateAt: T.h0 + 0.24 })
  const H1 = popText(root, 'Ruled by the Moon. | Feels *everything.*', { top: 215, size: 92, accentSize: 140, at: T.h1, late: 1, lateAt: T.h1Land, wobble: true, gap: 0.08, accentColor: AQUA })
  const H2 = popText(root, 'Soft is | *strong.*', { top: 190, size: 150, accentSize: 240, at: T.h2, late: 1, lateAt: T.h2Land, wobble: true, gap: 0.1, accentColor: AQUA, lineHeight: 0.95 })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1420, width: 960, height: 300, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  function sparkles(t, cx, cy, t0, n, R, seed, cols = [GOLD, BONE, PINK, AQUA]) {
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

  // the crab shell: a pixel dome (rim at y = 0 in local coords), coral with spots, light from the upper-left,
  // a scalloped dark rim and two tiny claws at the sides
  const RX = 21, RY = 14
  const PINCER_OPEN = ['hh...hh.', 'XXd..XXd', 'XXX...XX', 'XXXX.XXX', 'XXXXXXXX', '.XXXXXX.', '..dXXd..', '...XX...', '...XX...']
  const PINCER_SHUT = ['........', '.hhhhh..', 'XXXXXXXd', 'XXXXXXXX', 'XXXXXXXX', '.XXXXXX.', '..dXXd..', '...XX...', '...XX...']
  function drawShell(cx, rimY, c, { rot = 0, alpha = 1, k = 1, claws = 0, legs = 0 } = {}) {
    if (k <= 0.01 || alpha <= 0) return
    x.save(); x.globalAlpha *= alpha; x.translate(Math.round(cx), Math.round(rimY)); x.rotate(rot); x.scale(k, k)
    const inside = (i, j) => { const u = (i + 0.5) / RX, v = (j + 0.5) / RY; return j >= 0 && u * u + v * v <= 1 }   // j counts up from the rim
    const SPOTS = [[-10, 9], [-3, 13], [6, 11], [12, 6], [-14, 4], [1, 6]]
    for (let j = -1; j <= RY + 1; j++) for (let i = -RX - 1; i <= RX; i++) {
      const on = inside(i, j)
      const edge = !on && (inside(i + 1, j) || inside(i - 1, j) || inside(i, j + 1) || inside(i, j - 1))
      if (!on && !edge) continue
      let col = INK
      if (on) {
        const u = (i + 0.5) / RX, v = (j + 0.5) / RY
        const lit = -u * 0.6 + v * 0.8
        col = lit > 0.75 ? '#ffd2b0' : lit > 0.3 ? '#ff9a6e' : lit > -0.2 ? '#f2734f' : '#c4483a'
        if (j === 0) col = (i + 40) % 3 === 0 ? INK : '#8f2f2a'                 // scalloped rim
        if (j === 1) col = '#d9573f'
        for (const [si, sj] of SPOTS) if ((i - si) ** 2 + (j - sj) ** 2 <= 2.2) col = lit > 0.3 ? '#ffe3cc' : '#ffb894'
      }
      x.fillStyle = col; x.fillRect(i * c, -(j + 1) * c, c + 0.5, c + 0.5)
    }
    // crab legs (three a side, under the rim) + two big pincers raised at the sides, snapping
    const COL = { X: '#f2734f', h: '#ffb894', d: '#c4483a' }
    for (const sd of [-1, 1]) {
      for (let l = 0; l < 3; l++) {
        const lx = sd * (RX - 1 - l * 2.6) * c, wig = (Math.floor(legs * 6 + l) % 2) * c
        x.fillStyle = INK; x.fillRect(lx - c, 0, 3 * c, 5 * c + wig); x.fillRect(lx + sd * c - c, 4 * c + wig, 3 * c, 3 * c)
        x.fillStyle = '#d9573f'; x.fillRect(lx, 0, c, 5 * c + wig); x.fillRect(lx + sd * c, 5 * c + wig, c, c)
      }
      const bm = claws ? PINCER_OPEN : PINCER_SHUT
      drawBits(x, bm, COL, sd * (RX + 5) * c, -9 * c, c * 1.15, { flip: sd < 0, rot: sd * -0.25 })
      x.fillStyle = INK; x.fillRect(sd > 0 ? (RX - 1) * c : -(RX + 3) * c, -4 * c, 4 * c, 3 * c)
      x.fillStyle = '#d9573f'; x.fillRect(sd > 0 ? (RX - 0.5) * c : -(RX + 2.5) * c, -3.5 * c, 3 * c, 2 * c)
    }
    x.restore()
  }

  function tears(t, ex, ey, t0, t1, seed) {
    for (let i = 0; i < 10; i++) {
      const born = t0 + i * 0.28 + (seed % 2) * 0.14
      if (born > t1) break
      const d = t - born
      if (d < 0 || d > 0.6) continue
      const side = i % 2 ? 1 : -1
      drawBits(x, DROP, { X: SKYBLUE, W: '#e9f7ff' }, Math.round(ex + side * 62 + side * d * 20), Math.round(ey + 30 + d * 160 + d * d * 200), 6, { alpha: 1 - d / 0.6 })
    }
  }

  function drawScene(t) {
    const ok = popOut(t, T.out)
    if (ok <= 0) return
    const st = heroState(t)
    if (t < T.cut) {
      const pin = easeOutBack(prog(t, T.shell, T.shell + 0.4), 2) * ok
      // inside the shell the star sits low; stepping out it pops up + forward
      const out = easeOutBack(prog(t, T.step, T.step + 0.35), 2)
      const hy = HERO.y + lerp(30, -20, out), hs = HERO.size * lerp(0.92, 1.05, out)
      let sq = 0
      if (t > T.lift[0] && t < T.lift[0] + 0.5) sq += -0.12 * Math.exp(-(t - T.lift[0]) * 7) * Math.cos((t - T.lift[0]) * 20)
      // shiver while hiding
      const shiver = t < T.l2 ? Math.sin(t * 40) * 2 : 0
      const r = drawStarChar(x, HERO.x + shiver, hy, hs, t, { color: CAN.color, glyph: out > 0.5 ? CAN.glyph : null, ...st, pop: pin, squash: sq, hops: [T.step + 0.1, T.blush + 0.2], bob: 3, seed: 5, glow: 0.7 + 0.5 * out })
      if (t > T.tears && t < T.l2) tears(t, HERO.x, r.y + 10, T.tears, T.smile - 0.3, 1)
      // the shell: drops on, then lifts away like a lid and lands on the right
      const lp = prog(t, ...T.lift), le = ease.inOutCubic(lp)
      const sx = lerp(SHELL.x, 860, le), sy = lerp(SHELL.rim + Math.sin(t * 2.2 + 5 * 2.1) * 3, 1260, le) - Math.sin(Math.PI * lp) * 300
      const claws = t < T.l2 ? (Math.floor(t * 5) % 2) : 0
      drawShell(sx, sy, SHELL.c * lerp(1, 0.55, le), { rot: lerp(0, 0.35, le) + Math.sin(Math.PI * lp) * 0.4, k: pin, claws: t > T.peek ? claws : 0, legs: t < T.lift[0] ? t : 0 })
      if (t > T.blush) sparkles(t, HERO.x, hy, T.blush, 10, 240, 1)
    } else {
      const pk = easeOutBack(prog(t, T.cut - 0.05, T.cut + 0.3), 1.8) * ok
      drawShell(190, 1330, SHELL.c * 0.45, { rot: 0.2, k: pk })
      const lean = 16 * ease.inOutCubic(prog(t, T.heart - 0.2, T.heart + 0.2))
      drawStarChar(x, L_FIN.x + lean, L_FIN.y, L_FIN.size, t, { color: CAN.color, glyph: CAN.glyph, ...st, pop: pk, hops: [T.h2Land, T.heart], seed: 5, glow: 1.25 })
      const cp = easeOutBack(prog(t, T.capIn, T.capIn + 0.35), 2) * ok
      const drop = 1 - ease.outCubic(prog(t, T.capIn - 0.1, T.capIn + 0.22))
      drawStarChar(x, R_FIN.x - lean, R_FIN.y - drop * 380, R_FIN.size, t, { color: CAP.color, glyph: CAP.glyph, mood: t < T.heart ? 'happy' : 'heart', look: [-1, 0], pop: cp, hops: [T.capIn + 0.24, T.heart + 0.1], seed: 9, glow: 1.15 })
      const hk = easeOutBack(prog(t, T.heart, T.heart + 0.3), 2.6) * ok
      if (hk > 0.01) {
        const beat = 1 + 0.08 * Math.max(0, Math.sin((t - T.heart) * 7))
        drawBits(x, HEART, { H: '#ff4f86', W: '#ffd1de' }, 560, 900 + Math.sin(t * 2.2) * 6, 13 * hk * beat)
      }
      sparkles(t, 560, 900, T.heart, 10, 200, 2)
      sparkles(t, L_FIN.x, L_FIN.y, T.h2Land, 10, 260, 5)
    }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      drawSky(x, t, t < 3 ? { ...SKY_H, zoom: lerp(1.5, SKY_H.zoom, ss), dy: lerp(-24, 0, ss) } : SKY_H)
      if (t < T.out[1] + 0.02) drawScene(t)
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [hd, o] of HEADS) hd.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 5.12 (H0 out → "Ruled by the Moon") and 8.45 (box shut → "Soft is strong.").
// cardfx keeps one for a 15 s film (the 8.45 one). End card flips at 10.6.
const CUTS = [5.12, { t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  // dear cancer: the shell, the peeking eyes, sniffles
  ...wordPops(T.h0, 1, 0.12, 0, 0.026), ['pop', T.h0 + 0.24, 1174.66, 0.045, 0],
  ['pop', T.shell + 0.08, 440, 0.04, 0], ['tick', T.shell + 0.3, 0.03],
  ['pluck', T.peek + 0.15, 987.77, 0.035, 0.5, 0],
  ...T.glances.map(g => ['tick', g, 0.022]),
  ['pluck', T.tears, 1318.51, 0.02, 0.8, -0.2], ['pluck', T.tears + 0.56, 1174.66, 0.02, 0.8, 0.2],
  ['pop', T.open, 739.99, 0.04, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES, { cps: CPS }),
  ['bell', T.smile, 1318.51, 0.022, 1.2, 0],
  // ruled by the moon: the lid lifts, it steps out
  ...wordPops(T.h1, 4, 0.08, 1, 0.022), ['pop', T.h1Land, 1174.66, 0.045, 0], ['pluck', T.h1Land, 880, 0.035, 0.5, 0],
  ['whoosh', T.lift[0], 0.45, 0.035], ['tick', T.lift[1], 0.05], ['pop', T.lift[1], 330, 0.035, 0.4],
  ['pop', T.step + 0.05, 987.77, 0.04, 0], ['glitter', T.blush, T.blush + 0.45], ['bell', T.blush + 0.05, 1318.51, 0.025, 1.4, 0],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  // soft is strong
  ...wordPops(T.h2, 2, 0.1, 1, 0.028), ['pop', T.h2Land, 1318.51, 0.055, 0], ['pluck', T.h2Land, 1174.66, 0.05, 0.7, 0], ['glitter', T.h2Land, T.h2Land + 0.45],
  ['pop', T.capIn + 0.05, 659.25, 0.045, 0.3], ['pluck', T.heart, 1174.66, 0.045, 0.6, 0], ['bell', T.heart + 0.05, 1760, 0.028, 1.2, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
