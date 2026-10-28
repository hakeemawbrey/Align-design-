// st4retro2 (20 s vertical Align ad, Star Talk season 4, EP 034, thread E2: Retro the gremlin) · story 0–15.6, then the
// shared end card.
//   0.00–3.00  "Retro is | *back.*"  Retro, the backwards-spinning Mercury ☿ orb (stretro), drops onto the corner of the
//              water signs' group chat (stwater: ♋ Cancer, ♏ Scorpio, ♓ Pisces, lined up under it). Every message now
//              arrives BACKWARDS: "?rennid" · "edoc a s'ti" · "?yrgna yeht era". Scorpio squints through a pixel
//              magnifier, Pisces tears up, Cancer goes wide-eyed.
//   2.82 drop  Box (♋ CANCER): "remember 'k.'? they were *driving.*" (the batch-3 "k." finally explained.)
//   6.25–12.5  "Mercury rules | *messages.*"  Box (THE STARS): "when it's confusing, don't decode. *call.*"  The chat
//              flips to a call screen: calling… then CONNECTED, and Retro gets bumped off the phone, dizzy. Box
//              (☎ THEM): "hi! i meant: dinner? *:)*"  The water signs melt into heart-eyes.
//  12.60 cut → "When in doubt, | *call.*"  The call timer ticks on; Retro spins (forwards, dizzy) in the corner.
//              Everything pops out by 15.45; the end card takes over at 15.6.
// Easter eggs (stlore.js): the EP 034 seed constellation (top-left), the EP numeral in the frame, and the ghost leaning
// out from behind the phone's right edge (lore.json).
// One canvas (sky + phone + Retro + stars), DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar, STAR } from '../../startalk.js'
import { drawSeedConstellation, drawGhostCameo, episodeNumeral } from '../../stlore.js'

export const DURATION = 20
export const EP = 34
const W = 1080
const STORY_END = DURATION - ENDCARD_LEN       // 15.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', AQUA = '#8fd8f6', GREEN = '#7fe0a0'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', ui-monospace, monospace"
const SYM = "'EB Garamond', 'DejaVu Sans', 'Segoe UI Symbol', 'Noto Sans Symbols', serif"
const SHADOW = '0 4px 30px rgba(6,4,18,0.9), 0 0 4px rgba(6,4,18,0.6)'
const CAN = signStar('cancer'), SCO = signStar('scorpio'), PIS = signStar('pisces')
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }

// ── the timeline
const T = {
  h0: 0.12, h0Out: [6.05, 6.22], drop: [0.45, 0.85], b: [1.2, 1.8, 2.4],
  open: 2.95, l1: 3.15, sheep: 3.9, ghost: 5.05,
  h1: 6.25, h1Land: 6.65, l2: 6.3, dial: 7.85, connect: 8.65, bump: [8.65, 9.2],
  l3: 9.6, melt: 10.4,
  close: 12.5, h1Out: [12.35, 12.52],
  cut: 12.6, h2: 12.65, h2Land: 13.05, h2Out: [15.15, 15.4], out: [15.0, 15.45],
}
const CAN_TAG = '♋ CANCER', SPEAK = 'THE STARS', THEM = '☎ THEM'
const LINES = [
  { t: T.l1, speaker: CAN_TAG, text: "remember 'k.'? they were *driving.*", color: CAN.color },
  { t: T.l2, speaker: SPEAK, text: "when it's confusing, don't decode. *call.*" },
  { t: T.l3, speaker: THEM, text: 'hi! i meant: dinner? *:)*', color: PINK },
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

/** draw a bitmap of cells with a 1-cell ink outline, centred on (cx, cy) */
function drawBits(x, bm, cols, cx, cy, cell, { rot = 0, outline = INK, alpha = 1 } = {}) {
  const w = bm[0].length, h = bm.length
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot)
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

// ── pixel bits
const HEART = ['.H.H.', 'HWHHH', 'HHHHH', '.HHH.', '..H..']
const ARROW = ['..X..', '.XX..', 'XXXXX', '.XX..', '..X..']           // points left; rotated onto Retro's orbit
const MAG = ['..rrrr...', '.rgggGr..', 'rggggggr.', 'rgggggGr.', 'rggggggr.', '.rgggggr.', '..rrrrhh.', '......hhh', '.......hh']
const MAG_C = { r: '#c9a6ff', g: 'rgba(191,230,255,0.55)', G: '#ffffff', h: '#8a5a3c' }
const TEAR = ['.t.', 'ttt', 'tTt', '.t.']

// ── layout
const PH = { x0: 175, x1: 905, y0: 575, y1: 1160 }
const RETRO = { x: 885, y: 585, r: 62 }, RETRO_OFF = { x: 985, y: 1180, r: 46 }
const STARS = [
  { s: CAN, x: 195, y: 1305, size: 215, seed: 4 },
  { s: SCO, x: 540, y: 1325, size: 205, seed: 7 },
  { s: PIS, x: 885, y: 1305, size: 215, seed: 9 },
]
const BUBBLES = [
  { t: T.b[0], who: 'them', text: '?rennid', right: false, col: '#3b3170', ink: BONE },
  { t: T.b[1], who: 'SCORPIO', text: "edoc a s'ti", right: true, col: SCO.color, ink: '#ffffff' },
  { t: T.b[2], who: 'PISCES', text: '?yrgna yeht era', right: true, col: '#5fb8ff', ink: '#0d1a3a' },
]
const LOW = 110
const lowK = t => ease.inOutCubic(prog(t, T.cut - 0.06, T.cut + 0.06))

const HOPS = {
  cancer: [T.b[0] + 0.1, ...talkHops(LINES, CAN_TAG, { cps: CPS }), T.connect + 0.1, T.melt, 13.2, 13.9, 14.7],
  scorpio: [T.b[1] + 0.1, T.connect + 0.15, T.melt + 0.15, 13.2, 14.1],
  pisces: [T.b[2] + 0.1, T.connect + 0.2, T.melt + 0.3, 13.4, 14.3],
}
function starState(id, t) {
  if (t >= T.melt) return { mood: 'heart' }
  if (t >= T.connect) return { mood: 'sparkle', look: [id === 'cancer' ? 1 : id === 'pisces' ? -1 : 0, -1] }
  if (id === 'cancer') {
    if (t < T.b[0]) return { mood: 'neutral', look: [1, -1] }
    if (t < T.l1) return { mood: 'wide', look: [1, -1], blink: false }
    if (t < T.sheep) return { mood: 'neutral', look: [1, 0] }
    if (t < T.l2) return { mood: 'happy' }                                       // sheepish: they were driving
    return { mood: 'wide', look: [1, -1], blink: false }
  }
  if (id === 'scorpio') {
    if (t < T.b[1]) return { mood: 'neutral', look: [0, -1] }
    if (t < T.l2) return { mood: 'squint', look: [0, -1] }                       // decoding
    return { mood: 'wide', look: [0, -1], blink: false }                         // "don't decode"
  }
  if (t < T.b[2]) return { mood: 'neutral', look: [-1, -1] }
  if (t < T.l1) return { mood: 'wide', look: [-1, -1], blink: false }            // teary
  if (t < T.l2) return { mood: 'sparkle', look: [-1, 0] }
  return { mood: 'wide', look: [-1, -1], blink: false }
}

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, 'Retro is | *back.*', { top: 200, size: 128, accentSize: 200, at: T.h0, gap: 0.1, accentColor: GOLD, wobble: true, late: 1, lateAt: T.h0 + 0.36, lineHeight: 0.96 })
  const H1 = popText(root, 'Mercury rules | *messages.*', { top: 215, size: 104, accentSize: 156, at: T.h1, late: 1, lateAt: T.h1Land, wobble: true, accentColor: GOLD })
  const H2 = popText(root, 'When in doubt, | *call.*', { top: 200, size: 124, accentSize: 210, at: T.h2, late: 1, lateAt: T.h2Land, wobble: true, accentColor: GREEN, lineHeight: 0.96 })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1450, width: 960, height: 300, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // Retro's sprite (stretro's 16-cell gold ball)
  const ORB_G = 16
  const orbBuf = document.createElement('canvas'); orbBuf.width = orbBuf.height = ORB_G
  {
    const o = orbBuf.getContext('2d'), h = ORB_G / 2
    for (let j = 0; j < ORB_G; j++) for (let i = 0; i < ORB_G; i++) {
      const u = (i + 0.5 - h) / h, v = (j + 0.5 - h) / h, d = Math.hypot(u, v)
      if (d > 1) continue
      let c = d > 0.86 ? '#b8792a' : (u * 0.6 + v * 0.8 > 0.35 ? '#e0a743' : '#f7cf68')
      if (d <= 0.86 && Math.hypot(u + 0.38, v + 0.4) < 0.24) c = '#fff1c8'
      if (d > 0.86 && u + v < -0.6) c = '#ffd98a'
      o.fillStyle = c; o.fillRect(i, j, 1, 1)
    }
  }
  function glow(cx, cy, r, col, a) {
    if (a <= 0) return
    const g = x.createRadialGradient(cx, cy, 0, cx, cy, r)
    g.addColorStop(0, rgba(col, 0.4 * a)); g.addColorStop(1, rgba(col, 0))
    x.fillStyle = g; x.fillRect(cx - r, cy - r, r * 2, r * 2)
  }
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
  function retroState(t, dy) {
    if (t < T.bump[0]) {
      const k = ease.outCubic(prog(t, ...T.drop))
      return { x: RETRO.x, y: lerp(-120, RETRO.y, k), r: RETRO.r, k: clamp(prog(t, T.drop[0], T.drop[0] + 0.1)), back: true }
    }
    const e = ease.inOutCubic(prog(t, ...T.bump))
    return { x: lerp(RETRO.x, RETRO_OFF.x, e) + Math.sin(Math.PI * e) * 90, y: lerp(RETRO.y, RETRO_OFF.y + dy, e) - Math.sin(Math.PI * e) * 120, r: lerp(RETRO.r, RETRO_OFF.r, e), k: 1, back: false }
  }
  function drawRetro(t, dy, ok) {
    const S = retroState(t, dy)
    if (S.k <= 0 || ok <= 0) return
    const r = S.r * ok, cx = S.x, cy = S.y + Math.sin(t * 2.3) * 5
    glow(cx, cy, r * 2.6, GOLD, 0.8)
    const spin = S.back ? -t * 3.2 : t * 1.4
    if (S.back) {
      const R = r * 1.6, cell = Math.max(3, Math.round(r * 0.08))
      for (let i = 0; i < 3; i++) {
        const a = spin + i * Math.PI * 2 / 3
        for (let s = 1; s <= 4; s++) {
          const b = a + s * 0.16, q = cell * (1.6 - s * 0.25)
          x.fillStyle = rgba(GOLD, 0.55 - s * 0.11)
          x.fillRect(Math.round(cx + Math.cos(b) * R - q / 2), Math.round(cy + Math.sin(b) * R - q / 2), q, q)
        }
        drawBits(x, ARROW, { X: '#fff1c8' }, cx + Math.cos(a) * R, cy + Math.sin(a) * R, cell, { rot: a + Math.PI / 2 })
      }
    } else {
      // dizzy: little stars circling (forwards now)
      for (let i = 0; i < 3; i++) { const a = t * 3 + i * 2.1; drawPixelStar(x, cx + Math.cos(a) * r * 1.4, cy - r * 1.1 + Math.sin(a) * r * 0.35, 18, i % 2, GOLD, '#fff6e6') }
    }
    const SZ = Math.round(r * 2 / ORB_G) * ORB_G || r * 2
    x.save(); x.translate(Math.round(cx), Math.round(cy)); x.rotate(spin); x.imageSmoothingEnabled = false
    x.fillStyle = 'rgba(14,8,32,0.6)'; x.beginPath(); x.arc(0, 0, SZ / 2 + 5, 0, Math.PI * 2); x.fill()
    x.drawImage(orbBuf, -SZ / 2, -SZ / 2, SZ, SZ)
    x.rotate(-spin)
    x.font = `700 ${Math.round(r * 1.3)}px ${SYM}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.fillStyle = INK; x.fillText('☿︎', 0, r * 0.08)
    x.restore()
    // ℞ tag while it's on the phone
    if (S.back && t > T.drop[1]) {
      const tk = pop01(t, T.drop[1], 0.3, 2.2)
      x.save(); x.translate(cx - r * 2.3, cy - 6); x.scale(tk, tk)
      x.font = `700 26px ${MONO}`; const label = '℞', pw = 56, ph = 50
      x.fillStyle = 'rgba(20,12,44,0.92)'; x.beginPath(); x.roundRect(-pw / 2, -ph / 2, pw, ph, ph / 2); x.fill()
      x.lineWidth = 3; x.strokeStyle = rgba(GOLD, 0.9); x.stroke()
      x.fillStyle = GOLD; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(label, 1, 2)
      x.restore()
    }
  }
  function drawPhone(t, dy, k) {
    if (k <= 0) return
    const { x0, x1 } = PH, y0 = PH.y0 + dy, y1 = PH.y1 + dy, w = x1 - x0, h = y1 - y0
    x.save()
    x.translate(540, (y0 + y1) / 2); x.scale(k, k); x.translate(-540, -(y0 + y1) / 2)
    x.fillStyle = INK; x.beginPath(); x.roundRect(x0 - 22, y0 - 22, w + 44, h + 44, 44); x.fill()
    x.fillStyle = '#3a2f6e'; x.beginPath(); x.roundRect(x0 - 14, y0 - 14, w + 28, h + 28, 38); x.fill()
    const call = t >= T.dial
    x.fillStyle = call ? '#10233a' : '#0e0a26'; x.beginPath(); x.roundRect(x0, y0, w, h, 28); x.fill()
    x.save(); x.beginPath(); x.roundRect(x0, y0, w, h, 28); x.clip()
    if (!call) {
      // header: the group chat
      x.fillStyle = '#1d1550'; x.fillRect(x0, y0, w, 86)
      x.font = `700 34px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillStyle = BONE
      x.fillText('WATER SIGNS', x0 + 128, y0 + 44)
      ;[CAN, SCO, PIS].forEach((s, i) => { x.fillStyle = s.color; x.beginPath(); x.arc(x0 + 44 + i * 26, y0 + 44, 17, 0, Math.PI * 2); x.fill(); x.strokeStyle = INK; x.lineWidth = 3; x.stroke() })
      // backwards bubbles (with a glitch jitter as each one lands)
      BUBBLES.forEach((B, i) => {
        const pk = pop01(t, B.t, 0.32, 2.2)
        if (pk <= 0.01) return
        const jit = t - B.t < 0.35 ? Math.round(Math.sin((t - B.t) * 90) * 10 * (1 - (t - B.t) / 0.35)) : 0
        x.font = `700 46px ${MONO}`
        const tw = x.measureText(B.text).width, bw = tw + 60, bh = 92
        const by = y0 + 140 + i * 150
        const bx = B.right ? x1 - 36 - bw : x0 + 36
        x.save(); x.translate(bx + (B.right ? bw : 0) + jit, by + bh); x.scale(pk, pk); x.translate(-(B.right ? bw : 0), -bh)
        x.font = `700 22px ${MONO}`; x.fillStyle = rgba(BONE, 0.6); x.textAlign = B.right ? 'right' : 'left'; x.textBaseline = 'alphabetic'
        x.fillText(B.who, B.right ? bw - 6 : 6, -12)
        x.fillStyle = B.col; x.beginPath(); x.roundRect(0, 0, bw, bh, 26); x.fill()
        x.fillStyle = B.ink; x.font = `700 46px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'
        x.fillText(B.text, 30, bh / 2 + 3)
        x.restore()
      })
      // typing… dots (another one coming, backwards too)
      if (t > T.b[2] + 0.6) {
        x.fillStyle = '#3b3170'; x.beginPath(); x.roundRect(x0 + 36, y0 + 520, 140, 30, 15); x.fill()
        for (let i = 0; i < 3; i++) { x.fillStyle = rgba(BONE, 0.4 + 0.6 * (Math.floor(t * 4) % 3 === 2 - i ? 1 : 0)); x.fillRect(x0 + 70 + i * 30, y0 + 530, 12, 12) }
      }
    } else {
      // the call screen
      const conn = t >= T.connect
      const cx = 540, cy = y0 + 200
      for (let i = 0; i < 3; i++) {
        const ph = ((t - T.dial) * (conn ? 0.7 : 1.1) + i / 3) % 1
        x.strokeStyle = rgba(conn ? GREEN : AQUA, 0.5 * (1 - ph)); x.lineWidth = 6
        x.beginPath(); x.arc(cx, cy, 110 + ph * 150, 0, Math.PI * 2); x.stroke()
      }
      drawStarChar(x, cx, cy, 200, t, { color: STAR.bone, mood: conn ? (t > T.l3 ? 'happy' : 'sparkle') : 'neutral', look: [0, 0], seed: 31, glow: 0.8, hops: [T.connect + 0.05, T.l3 + 0.1, T.l3 + 0.5, 13.5] })
      x.font = `700 40px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
      x.fillStyle = BONE; x.fillText('them', cx, cy + 150)
      x.font = `700 32px ${MONO}`
      const secs = Math.max(0, Math.floor(t - T.connect))
      x.fillStyle = conn ? GREEN : rgba(BONE, 0.7)
      x.fillText(conn ? `connected · 00:${String(secs).padStart(2, '0')}` : 'calling' + '.'.repeat(1 + Math.floor(t * 3) % 3), cx, cy + 200)
      // a voice wave once connected
      if (conn) for (let i = 0; i < 15; i++) {
        const hh = 10 + Math.abs(Math.sin(t * 9 + i * 0.8)) * (t > T.l3 && t < T.melt ? 54 : 22)
        x.fillStyle = rgba(GREEN, 0.85); x.fillRect(cx - 210 + i * 30, cy + 272 - hh / 2, 16, hh)
      }
      // the call button
      x.fillStyle = conn ? '#e0503a' : GREEN; x.beginPath(); x.arc(cx, y1 - 52, 32, 0, Math.PI * 2); x.fill()
      x.fillStyle = '#ffffff'; x.fillRect(cx - 16, y1 - 57, 32, 10)
    }
    x.restore()
    x.restore()
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      drawSky(x, t, t < 3 ? { ...SKY_H, zoom: lerp(1.5, SKY_H.zoom, ss), dy: lerp(-24, 0, ss) } : SKY_H)
      drawSeedConstellation(x, t, EP)
      const ok = popOut(t, T.out), dy = LOW * lowK(t)
      const pk = pop01(t, 0.15, 0.45, 1.6) * ok
      if (ok > 0) {
        // the dial flip: a quick squash of the phone as the chat turns into a call
        const flip = t > T.dial - 0.12 && t < T.dial + 0.12 ? 1 - 0.5 * Math.sin(Math.PI * prog(t, T.dial - 0.12, T.dial + 0.12)) : 1
        drawPhone(t, dy, pk * flip)
        drawGhostCameo(x, t, { x: PH.x1 + 22, y: 820, at: T.ghost, dur: 1.3, from: 'left', cell: 3 })
        sparkles(t, 540, 760 + dy, T.connect, 12, 300, 1, [GREEN, BONE, GOLD])
        STARS.forEach(S => {
          const id = S.s === CAN ? 'cancer' : S.s === SCO ? 'scorpio' : 'pisces'
          const sk = pop01(t, 0.35 + STARS.indexOf(S) * 0.1, 0.4, 1.8) * ok
          const r = drawStarChar(x, S.x, S.y + dy, S.size, t, { color: S.s.color, glyph: S.s.glyph, ...starState(id, t), hops: HOPS[id], pop: sk, seed: S.seed, glow: 0.95 })
          if (id === 'scorpio' && t > T.b[1] && t < T.l2) drawBits(x, MAG, MAG_C, r.x - 40 + Math.sin(t * 2.5) * 40, r.top - 50 + Math.cos(t * 2) * 12, 12, { rot: -0.3 })
          if (id === 'pisces' && t > T.b[2] + 0.2 && t < T.l2) {
            const ph = ((t - T.b[2]) * 1.2) % 1
            drawBits(x, TEAR, { t: AQUA, T: '#ffffff' }, r.x - r.size * 0.2, r.y + ph * 50, 7, { alpha: 1 - ph })
          }
        })
        drawRetro(t, dy, ok)
        if (t > T.melt) {
          for (let i = 0; i < 9; i++) {
            const born = T.melt + i * 0.28, p = (t - born) / 1.4
            if (p < 0 || p >= 1 || born > T.out[0] - 0.4) continue
            drawBits(x, HEART, { H: [CAN.color, '#ff4f86', AQUA][i % 3], W: '#ffd1de' }, 540 + (((i * 37) % 9) / 8 - 0.5) * 820 + Math.sin(p * 7 + i) * 16, 1200 + dy - p * 260, 7, { alpha: Math.sin(Math.PI * p) })
          }
        }
      }
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 6.24 (H0 out → "Mercury rules messages") and 12.6 (box shut → the last line). cardfx keeps 12.6.
const CUTS = [6.24, { t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, numeral: episodeNumeral(EP) }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...wordPops(T.h0, 2, 0.1, 0, 0.026), ['pop', T.h0 + 0.36, 1174.66, 0.045, 0],
  ['whoosh', T.drop[0], 0.45, 0.04], ['pop', T.drop[1], 392, 0.05, 0.5], ['tick', T.drop[1] + 0.02, 0.05],
  ...T.b.flatMap((b, i) => [['pop', b, NOTE[6 - i * 2], 0.035, i ? 0.4 : -0.4], ['tick', b + 0.06, 0.03], ['tick', b + 0.14, 0.02]]),
  ['pop', T.open, 739.99, 0.04, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES, { cps: CPS }),
  ['pop', T.ghost + 0.1, 1318.51, 0.012, 0.6],
  ...wordPops(T.h1, 2, 0.07, 2, 0.025), ['pop', T.h1Land, 1174.66, 0.045, 0],
  ['whoosh', T.dial - 0.1, 0.3, 0.03], ['bell', T.dial + 0.1, 1318.51, 0.025, 0.4, 0], ['bell', T.dial + 0.45, 1318.51, 0.025, 0.4, 0],
  ['pop', T.connect, 1174.66, 0.05, 0], ['glitter', T.connect, T.connect + 0.6], ['whoosh', T.bump[0], 0.5, 0.03], ['pop', T.bump[1], 440, 0.03, 0.6],
  ['pluck', T.melt, 1174.66, 0.04, 0.6, -0.3], ['bell', T.melt + 0.05, 1760, 0.025, 1.0, 0.3],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  ...wordPops(T.h2, 3, 0.08, 1, 0.028), ['pop', T.h2Land, 1318.51, 0.055, 0], ['pluck', T.h2Land + 0.1, 1174.66, 0.05, 0.7, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
