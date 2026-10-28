// st4venus1 (20 s vertical Align ad, Star Talk season 4, EP 033, thread G: sky lessons) · story 0–15.6, then the end card.
//   0.00–2.90  "Venus moved to | Houston, *too.*"  A farmers-market stall under string lights: a pink-and-cream striped
//              awning, crates of peaches and tomatoes, a jar of honey, a painted sign "ASK VENUS". The pink ♀ Venus star
//              (starvenus) pops up behind the counter, sparkling. The ♉ Taurus star (with a peach) and the ♎ Libra star (its
//              scale on its head) are first in line.
//   2.82 drop  Box (♀ VENUS): "Venus rules Taurus and Libra."  Taurus and Libra hop proudly (little pink hearts).
//   5.90–9.35  "Everyone has | a *Venus sign.*"  VENUS: "but everyone has a Venus sign. it's *how* you love."  More stars
//              pop into the queue (♈ Aries, ♋ Cancer), each with its own little heart.
//   9.40–12.30 "Start with | *one* question."  Venus steps aside and a talk card rises from the counter and flips:
//              card-talk-6, VI The Lovers, "Planned date or spontaneous date?"  Everyone leans in.
//  12.35 cut → "Know your | *Venus.*"  Venus winks; hearts in every colour float up over the stall.
//              Everything pops out by 15.45; the end card takes over at 15.6.
// Easter eggs (stlore.js): the EP 033 seed constellation (top-left), the EP numeral in the frame, and the ghost peeking up
// from behind the peach crate on the counter (lore.json).
// One canvas (sky + stall + stars + card), DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill, A } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar } from '../../startalk.js'
import { drawSeedConstellation, drawGhostCameo, episodeNumeral } from '../../stlore.js'

export const DURATION = 20
export const EP = 33
const W = 1080
const STORY_END = DURATION - ENDCARD_LEN       // 15.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236'
const VENUS = '#ff86b8'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', ui-monospace, monospace"
const SHADOW = '0 4px 30px rgba(6,4,18,0.9), 0 0 4px rgba(6,4,18,0.6)'
const TAU_S = signStar('taurus'), LIB = signStar('libra'), ARI = signStar('aries'), CAN = signStar('cancer')
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }

// ── the timeline
const T = {
  h0: 0.12, h0Out: [5.72, 5.9], stall: 0.15, venus: 0.75, tl: [1.3, 1.55],
  open: 2.85, l1: 3.05, proud: 4.2, ghost: 4.55,
  h1: 5.95, h1Land: 6.35, l2: 6.0, queue: [6.4, 6.75], how: 7.4,
  close: 9.35, h1Out: [9.2, 9.38], aside: [9.1, 9.5],
  card: [9.4, 9.75], flip: [9.75, 10.15], h3: 9.55, h3Land: 9.95, lean: 10.3, h3Out: [12.15, 12.33],
  cut: 12.35, h2: 12.4, h2Land: 12.8, wink: 13.1, hearts: 13.2, h2Out: [15.15, 15.4], out: [15.0, 15.45],
}
const VS = '♀ VENUS'
const LINES = [
  { t: T.l1, speaker: VS, text: 'Venus rules *Taurus* and *Libra.*', color: VENUS },
  { t: T.l2, speaker: VS, text: "but everyone has a Venus sign. it's *how* you love.", color: VENUS },
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

// ── pixel props
const HEART = ['.H.H.', 'HWHHH', 'HHHHH', '.HHH.', '..H..']
const PEACH = ['...l..', '..lL..', '.pppp.', 'pPpppp', 'pPpppp', 'ppppqp', '.pppq.']
const PEACH_C = { l: '#5fbf74', L: '#3f9a58', p: '#ffab7a', P: '#ffd2b0', q: '#f07a5a' }
const TOMATO = ['..ll..', '.rrrr.', 'rRrrrr', 'rrrrrr', 'rrrrsr', '.rrrr.']
const TOM_C = { l: '#5fbf74', r: '#f0503a', R: '#ff9a84', s: '#b8302a' }
const HONEY = ['.bbbb.', '.cccc.', 'hhhhhh', 'hHhhhh', 'hHhhhh', 'hhhhhh', 'hhhhhh', '.hhhh.']
const HONEY_C = { b: '#efe6d6', c: '#c98a5a', h: '#f2a83a', H: '#ffd98a' }
const SCALE = ['....g....', '....g....', 'ggggggggg', 'g...g...g', 'g...g...g', 'pp..g..pp', '....g....', '..ggggg..']
const SCALE_C = { g: '#f2c75c', p: '#efe6d6' }

// ── layout
const STALL = { x0: 120, x1: 960, awnY: 560, awnH: 120, counterY: 1135, counterH: 200 }
const V_C = { x: 540, y: 1000, size: 300 }      // Venus behind the counter
const V_ASIDE = { x: 905, y: 960, size: 220 }
const TAU_P = { x: 175, y: 1300, size: 200 }, LIB_P = { x: 905, y: 1300, size: 200 }
const QUEUE = [{ id: ARI, x: 70, y: 1110, size: 120, seed: 21 }, { id: CAN, x: 1010, y: 1110, size: 120, seed: 22 }]
const CRATE_L = { x: 270, top: 1085 }, CRATE_R = { x: 815, top: 1085 }
const CARD = { x: 520, y: 900, h: 860 }
const LOW = 110
const lowK = t => ease.inOutCubic(prog(t, T.cut - 0.06, T.cut + 0.06))

const HOPS_V = [T.venus + 0.3, ...talkHops(LINES, VS, { cps: CPS }), T.card[0], T.h2Land, 13.9, 14.6]
const HOPS_T = [T.tl[0] + 0.1, T.proud, T.proud + 0.4, T.lean, T.hearts, 14.0]
const HOPS_L = [T.tl[1] + 0.1, T.proud + 0.2, T.proud + 0.6, T.lean + 0.1, T.hearts + 0.2, 14.3]

function venusState(t) {
  if (t < T.l1) return { mood: 'sparkle', look: [0, 0] }
  if (t < T.proud) return { mood: 'happy', look: [0, 0] }
  if (t < T.l2) return { mood: 'heart' }                                    // proud of its two signs
  if (t < T.how) return { mood: 'neutral', look: [0, 0] }
  if (t < T.aside[0]) return { mood: 'sparkle', look: [0, 0] }
  if (t < T.cut) return { mood: 'happy', look: [-1, 0] }                     // presenting the card
  if (t >= T.wink && t < T.wink + 0.9) return { mood: 'wink' }
  return { mood: 'happy' }
}
function customerState(t, side) {
  if (t < T.l1) return { mood: 'happy', look: [side, -0.4] }
  if (t < T.proud) return { mood: 'neutral', look: [side, -0.5] }
  if (t < T.l2) return { mood: 'sparkle', look: [side, -0.5] }
  if (t < T.card[1]) return { mood: 'happy', look: [side, -0.5] }
  if (t < T.cut) return { mood: 'wide', look: [side * 0.5, -1], blink: false }   // reading the card
  return { mood: 'heart' }
}

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const load = src => new Promise(res => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = A + src })
  const [imBack, imTalk] = await Promise.all([load('card-back.png'), load('card-talk-6.png')])

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, 'Venus moved to | Houston, *too.*', { top: 205, size: 108, accentSize: 162, at: T.h0, gap: 0.09, accentColor: VENUS, wobble: true, late: 1, lateAt: T.h0 + 0.48, lineHeight: 1.0 })
  const H1 = popText(root, 'Everyone has | a *Venus sign.*', { top: 205, size: 108, accentSize: 150, at: T.h1, late: 2, lateAt: T.h1Land, wobble: true, accentColor: VENUS })
  const H3 = popText(root, 'Start with | *one* question.', { top: 205, size: 108, accentSize: 156, at: T.h3, late: 0, wobble: true, accentColor: GOLD })
  const H2 = popText(root, 'Know your | *Venus.*', { top: 200, size: 136, accentSize: 210, at: T.h2, late: 1, lateAt: T.h2Land, wobble: true, accentColor: VENUS, lineHeight: 0.96 })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H3, T.h3Out], [H2, T.h2Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1450, width: 960, height: 300, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  function sparkles(t, cx, cy, t0, n, R, seed, cols = [GOLD, BONE, PINK, VENUS]) {
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
  function glow(cx, cy, r, col, a) {
    if (a <= 0) return
    const g = x.createRadialGradient(cx, cy, 0, cx, cy, r)
    g.addColorStop(0, rgba(col, a)); g.addColorStop(1, rgba(col, 0))
    x.fillStyle = g; x.fillRect(cx - r, cy - r, r * 2, r * 2)
  }
  function heartAbove(t, cx, cy, t0, col, cell = 6) {
    if (t < t0) return
    const k = pop01(t, t0, 0.35, 2.4)
    drawBits(x, HEART, { H: col, W: '#ffffff' }, Math.round(cx), Math.round(cy + Math.sin(t * 4 + cx) * 5), cell * k)
  }
  function floatHearts(t, cx, cy, t0, t1, seed) {
    const cols = [VENUS, '#ff4f86', GOLD, '#8fd8f6', '#c9a6ff', '#7fe0a0']
    for (let i = 0; i < 14; i++) {
      const born = t0 + i * 0.13, life = 1.5
      if (t < born || born > t1) continue
      const p = (t - born) / life
      if (p >= 1) continue
      const side = ((i * 37 + seed) % 11) / 10 - 0.5
      drawBits(x, HEART, { H: cols[i % cols.length], W: '#ffffff' }, Math.round(cx + side * 760 + Math.sin(p * 6 + i) * 18), Math.round(cy - p * 380), 7 * (0.7 + 0.5 * Math.sin(Math.PI * Math.min(1, p * 1.6))), { alpha: Math.sin(Math.PI * p) })
    }
  }
  function drawStall(t, k, dy) {
    if (k <= 0) return
    const { x0, x1, awnY, awnH, counterY, counterH } = STALL
    x.save(); x.globalAlpha = clamp(k * 2)
    // posts
    x.fillStyle = INK; x.fillRect(x0 + 10, awnY + dy, 34, counterY - awnY); x.fillRect(x1 - 44, awnY + dy, 34, counterY - awnY)
    x.fillStyle = '#8a5a3c'; x.fillRect(x0 + 16, awnY + dy, 22, counterY - awnY); x.fillRect(x1 - 38, awnY + dy, 22, counterY - awnY)
    // awning: stripes + scalloped hem, drops in from the top
    const ay = awnY + dy - (1 - k) * 200
    x.fillStyle = INK; x.fillRect(x0 - 26, ay - 8, x1 - x0 + 52, awnH + 16)
    const n = 12, sw = (x1 - x0 + 40) / n
    for (let i = 0; i < n; i++) {
      x.fillStyle = i % 2 ? '#fff1e6' : VENUS
      x.fillRect(x0 - 20 + i * sw, ay, sw + 0.5, awnH)
      x.beginPath(); x.arc(x0 - 20 + i * sw + sw / 2, ay + awnH, sw / 2, 0, Math.PI); x.fill()
    }
    x.fillStyle = 'rgba(27,18,54,0.25)'; x.fillRect(x0 - 20, ay + awnH - 16, x1 - x0 + 40, 16)
    // string lights along the awning top
    for (let i = 0; i <= 14; i++) {
      const lx = lerp(x0 - 10, x1 + 10, i / 14), ly = ay - 26 + Math.sin(Math.PI * ((i % 7) / 7)) * 18
      const on = 0.6 + 0.4 * Math.sin(t * 3 + i * 1.7)
      glow(lx, ly, 26, '#ffd98a', 0.35 * on)
      x.fillStyle = INK; x.fillRect(lx - 7, ly - 7, 14, 14)
      x.fillStyle = i % 3 === 0 ? '#ffd98a' : i % 3 === 1 ? '#ffb3cc' : '#fff6e6'; x.fillRect(lx - 4, ly - 4, 8, 8)
    }
    x.restore()
  }
  function drawCounter(t, k, dy) {
    if (k <= 0) return
    const { x0, x1, counterY, counterH } = STALL, cy = counterY + dy
    x.save(); x.globalAlpha = clamp(k * 2)
    x.fillStyle = INK; x.fillRect(x0 - 16, cy - 10, x1 - x0 + 32, counterH + 10)
    x.fillStyle = '#b07a52'; x.fillRect(x0 - 10, cy - 4, x1 - x0 + 20, 22)
    x.fillStyle = '#8a5a3c'; x.fillRect(x0, cy + 18, x1 - x0, counterH - 24)
    for (let i = 0; i < 6; i++) { x.fillStyle = '#6a4430'; x.fillRect(x0, cy + 40 + i * 28, x1 - x0, 4) }
    // the painted sign
    x.fillStyle = INK; x.fillRect(540 - 214, cy + 46, 428, 104)
    x.fillStyle = '#fff1e6'; x.fillRect(540 - 206, cy + 54, 412, 88)
    x.font = `700 52px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = '#d84a86'
    x.fillText('ASK VENUS', 540, cy + 100)
    drawBits(x, HEART, { H: '#ff4f86', W: '#ffffff' }, 540 - 176, cy + 98, 5, { outline: null })
    drawBits(x, HEART, { H: '#ff4f86', W: '#ffffff' }, 540 + 176, cy + 98, 5, { outline: null })
    x.restore()
  }
  function crate(cx, top, dy, fruit, cols, k) {
    if (k <= 0) return
    const y = top + dy
    x.save(); x.globalAlpha = clamp(k * 2)
    for (let i = 0; i < 4; i++) drawBits(x, fruit, cols, cx - 75 + i * 50, y - 6 + (i % 2) * 6, 7)
    x.fillStyle = INK; x.fillRect(cx - 120, y, 240, 62)
    x.fillStyle = '#c99a62'; x.fillRect(cx - 114, y + 6, 228, 50)
    x.fillStyle = '#a77a48'; x.fillRect(cx - 114, y + 26, 228, 6)
    x.restore()
  }
  function cardState(t) {
    if (t < T.card[0] || t > T.cut + 0.05) return null
    const pin = easeOutBack(prog(t, ...T.card), 1.6)
    const ang = ease.inOutCubic(prog(t, ...T.flip)) * Math.PI
    return { pin, ang, front: ang > Math.PI / 2, cx: CARD.x, cy: lerp(CARD.y + 520, CARD.y, pin) + Math.sin(t * 1.6) * 5 }
  }
  function drawCard(t) {
    const c = cardState(t)
    if (!c) return
    const im = c.front ? imTalk : imBack
    const h = CARD.h * (c.front ? 1 : 1.06), w = h * (im ? im.width / im.height : 0.626)
    const sxk = Math.max(0.02, Math.abs(Math.cos(c.ang)))
    glow(c.cx, c.cy, 520, GOLD, c.front ? 0.24 + 0.3 * Math.exp(-(t - T.flip[1]) * 3) : 0.14)
    x.save(); x.globalAlpha = clamp(c.pin * 2)
    x.translate(c.cx, c.cy); x.rotate((1 - c.pin) * 0.22 + 0.015 * Math.sin(t * 1.3)); x.scale(sxk, 1 + 0.04 * Math.sin(Math.PI * prog(t, ...T.flip)))
    if (im) x.drawImage(im, -w / 2, -h / 2, w, h)
    else { x.fillStyle = '#2a1f5c'; x.fillRect(-w / 2, -h / 2, w, h) }
    x.restore()
    sparkles(t, c.cx, c.cy, T.flip[1] - 0.05, 12, 330, 1)
    // the prompt, big enough to read, under the card
    const qa = clamp(prog(t, T.flip[1] + 0.05, T.flip[1] + 0.3)) * (1 - prog(t, T.cut - 0.15, T.cut))
    if (qa > 0) {
      x.save(); x.globalAlpha = qa
      x.font = `700 40px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
      const msg = '"Planned date or spontaneous date?"', mw = x.measureText(msg).width + 56
      x.fillStyle = 'rgba(16,9,38,0.9)'; x.fillRect(540 - mw / 2, 1395, mw, 76)
      x.fillStyle = GOLD; x.fillRect(540 - mw / 2, 1395, mw, 4); x.fillRect(540 - mw / 2, 1467, mw, 4)
      x.fillStyle = BONE; x.fillText(msg, 540, 1434)
      x.restore()
    }
  }
  function venusPos(t) {
    if (t < T.aside[0] || t >= T.cut) return V_C
    const e = ease.inOutCubic(prog(t, ...T.aside))
    return { x: lerp(V_C.x, V_ASIDE.x, e), y: lerp(V_C.y, V_ASIDE.y, e) - Math.sin(Math.PI * e) * 60, size: lerp(V_C.size, V_ASIDE.size, e) }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      drawSky(x, t, t < 3 ? { ...SKY_H, zoom: lerp(1.5, SKY_H.zoom, ss), dy: lerp(-24, 0, ss) } : SKY_H)
      drawSeedConstellation(x, t, EP)
      const ok = popOut(t, T.out), dy = LOW * lowK(t)
      const sk = pop01(t, T.stall, 0.5, 1.5) * ok
      drawStall(t, sk, dy)
      if (ok > 0) {
        // Venus behind the counter (pink halo)
        if (t > T.venus) {
          const P = venusPos(t), pk = pop01(t, T.venus, 0.45, 1.8) * ok
          glow(P.x, P.y + dy, P.size * 1.1, VENUS, 0.28 * pk)
          drawStarChar(x, P.x, P.y + dy, P.size, t, { color: VENUS, glyph: '♀', ...venusState(t), hops: HOPS_V, pop: pk, seed: 5, glow: 1.25 })
          sparkles(t, P.x, P.y + dy, T.venus + 0.1, 10, P.size * 0.72, 3)
        }
        drawCounter(t, sk, dy)
        // the ghost rises from behind the peach crate (drawn first, so the peaches sit in front of it)
        drawGhostCameo(x, t, { x: CRATE_L.x, y: CRATE_L.top + dy, at: T.ghost, dur: 1.3, from: 'below', cell: 3 })
        crate(CRATE_L.x, CRATE_L.top, dy, PEACH, PEACH_C, sk)
        crate(CRATE_R.x, CRATE_R.top, dy, TOMATO, TOM_C, sk)
        drawBits(x, HONEY, HONEY_C, 680, CRATE_R.top + dy + 10, 7, { alpha: clamp(sk * 2) })
        // the queue: Taurus (peach) and Libra (scale), then Aries and Cancer
        const tk = pop01(t, T.tl[0], 0.4, 1.8) * ok, lk = pop01(t, T.tl[1], 0.4, 1.8) * ok
        for (const q of QUEUE) {
          const qk = pop01(t, T.queue[0] + (q.id === CAN ? 0.2 : 0), 0.4, 1.8) * ok
          if (qk <= 0) continue
          const r = drawStarChar(x, q.x, q.y + dy, q.size, t, { color: q.id.color, mood: t < T.card[1] ? 'sparkle' : t < T.cut ? 'wide' : 'happy', look: [Math.sign(540 - q.x), -0.4], pop: qk, seed: q.seed, glow: 0.8, tips: false, hops: [T.queue[1] + 0.3, T.lean + 0.2, T.hearts + 0.3] })
          heartAbove(t, q.x, r.top - 26, T.queue[1] + 0.25 + (q.id === CAN ? 0.2 : 0), q.id.color, 5)
        }
        if (tk > 0) {
          const r = drawStarChar(x, TAU_P.x, TAU_P.y + dy, TAU_P.size, t, { color: TAU_S.color, glyph: TAU_S.glyph, ...customerState(t, 1), hops: HOPS_T, pop: tk, seed: 12, glow: 0.9 })
          drawBits(x, PEACH, PEACH_C, r.x - r.size * 0.44, r.y + r.size * 0.12, 7 * tk, { rot: -0.2 })
          if (t > T.proud && t < T.cut) heartAbove(t, r.x, r.top - 30, T.proud, VENUS, 6)
        }
        if (lk > 0) {
          const r = drawStarChar(x, LIB_P.x, LIB_P.y + dy, LIB_P.size, t, { color: LIB.color, glyph: LIB.glyph, ...customerState(t, -1), hops: HOPS_L, pop: lk, seed: 14, glow: 0.9 })
          drawBits(x, SCALE, SCALE_C, r.x, r.top - 18 + Math.sin(t * 3) * 3, 7 * lk, { rot: 0.08 * Math.sin(t * 2.2) })
          if (t > T.proud && t < T.cut) heartAbove(t, r.x + 70, r.top - 40, T.proud + 0.2, VENUS, 6)
        }
        drawCard(t)
        if (t > T.hearts) floatHearts(t, 540, 1050 + dy, T.hearts, T.out[0] - 0.6, 3)
      }
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 5.92 (H0 out → "Everyone has a Venus sign") and 12.35 (the talk card → the last line). cardfx keeps 12.35.
const CUTS = [5.92, { t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, numeral: episodeNumeral(EP) }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...wordPops(T.h0, 4, 0.09, 0, 0.026), ['pop', T.h0 + 0.48, 1174.66, 0.045, 0],
  ['whoosh', T.stall, 0.5, 0.03],
  ['bell', T.venus + 0.1, 1567.98, 0.03, 1.6, 0], ['glitter', T.venus + 0.1, T.venus + 0.7],
  ['pop', T.tl[0] + 0.2, 659.25, 0.03, -0.5], ['pop', T.tl[1] + 0.2, 739.99, 0.03, 0.5],
  ['pop', T.open, 739.99, 0.04, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES, { cps: CPS }),
  ['pluck', T.proud, 1174.66, 0.035, 0.6, -0.4], ['pluck', T.proud + 0.2, 1318.51, 0.035, 0.6, 0.4],
  ['pop', T.ghost + 0.1, 1318.51, 0.012, -0.4],
  ...wordPops(T.h1, 2, 0.07, 2, 0.025), ['pop', T.h1Land, 1174.66, 0.045, 0],
  ['pop', T.queue[0] + 0.3, 880, 0.03, -0.6], ['pop', T.queue[0] + 0.5, 987.77, 0.03, 0.6],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  ...wordPops(T.h3, 4, 0.07, 1, 0.025),
  ['whoosh', T.card[0], 0.4, 0.03], ['whoosh', T.flip[0], 0.35, 0.03], ['bell', T.flip[1], 1567.98, 0.035, 1.4, 0], ['glitter', T.flip[1] - 0.05, T.flip[1] + 0.5],
  ...wordPops(T.h2, 2, 0.08, 1, 0.028), ['pop', T.h2Land, 1318.51, 0.055, 0], ['pluck', T.h2Land + 0.1, 1174.66, 0.05, 0.7, 0],
  ['tick', T.wink, 0.03], ['glitter', T.hearts, T.hearts + 1.2], ['bell', T.hearts + 0.1, 1760, 0.025, 1.2, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
