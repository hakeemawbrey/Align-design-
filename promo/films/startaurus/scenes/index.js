// startaurus (16 s vertical Align ad, Star Talk batch 3) · story 0–11.6, then the shared end card ("come" + the Align logo).
//   0.00–4.85  "Dear *Taurus…*"  The ♉ star (Venus-ruled, fixed earth) is buried up to its eyes in a cozy patchwork
//              pixel blanket, sleepy, a bowl of popcorn tucked in beside it. A phone buzzes: "new plans?" The star
//              squints at it… and pulls the blanket up higher. Drop (2.82): the box opens.
//              THE STARS: "we love that you love *comfort.*"
//   4.85–9.00  "Ruled by Venus, | fluent in *cozy.*"  THE STARS: "but your person won't knock on your *blanket.*" → wide eyes,
//              the blanket slips down and the star peeks out, then hops free, sparkle-eyed.
//   9.00 cut → "Say *yes* | to one | new thing."  The star stands tall with the blanket worn as a cape; it taps a reply on the
//              phone and a gold "yes!" bubble pops. Everything pops out by 11.45; the end card takes over at 11.6.
// One canvas (sky + star + props), DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar } from '../../startalk.js'

export const DURATION = 16
const W = 1080
const STORY_END = DURATION - ENDCARD_LEN       // 11.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', SAGE = '#9fd39a'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const SHADOW = '0 4px 30px rgba(6,4,18,0.9), 0 0 4px rgba(6,4,18,0.6)'
const TAU_ = signStar('taurus')
const AMBER = '#ffc45e'

// ── the timeline
const T = {
  h0: 0.12, h0Out: [4.66, 4.84],
  star: 0.22, munch: [0.5, 0.75, 1.0], phone: 0.95, notif: 1.2, squint: 1.5, burrow: [1.9, 2.25],
  open: 2.3, l1: 2.48, nod: 3.0,
  h1: 4.9, h1Land: 5.34, l2: 5.25, gasp: 6.55, peek: [6.7, 7.2], free: 7.55, sparkle: 7.85, close: 8.9, h1Out: [8.74, 8.92],
  cut: 9.0,
  h2: 9.05, h2Land: 9.42, tap: 9.85, yes: 10.05, h2Out: [11.2, 11.42], out: [11.05, 11.45],
}
const SPEAK = 'THE STARS'
const LINES = [
  { t: T.l1, speaker: SPEAK, text: 'we love that you love *comfort.*', color: AMBER },
  { t: T.l2, speaker: SPEAK, text: "but your person won't knock on your *blanket.*", color: AMBER },
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
const HERO = { x: 470, y: 1060, size: 360 }
const FINAL = { x: 440, y: 1170, size: 440 }
const PHONE = { x: 830, y: 930 }
const PHONE_F = { x: 840, y: 1150 }

function heroState(t) {
  if (t < T.phone + 0.2) return { mood: 'sleepy', zzz: false }
  if (t < T.notif + 0.1) return { mood: 'neutral', look: [1, -1], blink: false }
  if (t < T.burrow[1]) return { mood: 'squint', look: [1, -1], blink: false }      // new plans? ugh.
  if (t < T.nod) return { mood: 'sleepy', zzz: false }
  if (t < T.l2) return { mood: 'happy' }                                          // "we love that you love comfort." yes.
  if (t < T.gasp) return { mood: 'sleepy', zzz: false }
  if (t < T.peek[1]) return { mood: 'wide', look: [0, 0], blink: false }
  if (t < T.sparkle) return { mood: 'neutral', look: [1, -1] }                     // peeks at the phone
  if (t < T.cut) return { mood: 'sparkle', look: [0, 0] }
  if (t < T.tap + 0.1) return { mood: 'happy' }
  if (t < T.yes + 0.15) return { mood: 'neutral', look: [1, 0], blink: false }
  return { mood: 'sparkle', look: [0, 0] }
}
// how deep the star is in the blanket: blanket top edge relative to the star centre (px; bigger = more star showing)
function blanketTop(t) {
  let v = 60
  v = lerp(v, 18, ease.inOutCubic(prog(t, ...T.burrow)))            // pulls it up over the eyes' lower half
  v = lerp(v, 60, ease.inOutCubic(prog(t, T.nod - 0.2, T.nod + 0.15)))
  v = lerp(v, 200, ease.outCubic(prog(t, ...T.peek)))                // slips down: peekaboo
  return v
}

// the quilt patches + the popcorn
const QUILT = ['#e9b24a', '#c75b3a', '#f3e2c0', '#8bbf7a', '#e07a5f', '#f7d488']
const CORN = ['.WWW.', 'WWYWW', 'WWWWW', '.WYW.']
const BOWL = ['RRRRRRRRRRR', 'RWRRRRRRRWR', '.RRRRRRRRR.', '..RRRRRRR..', '...rrrrr...']

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 34px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const H0 = popText(root, 'Dear *Taurus…*', { top: 260, size: 120, accentSize: 170, at: T.h0, gap: 0.12, accentColor: AMBER, wobble: true, late: 1, lateAt: T.h0 + 0.24 })
  const H1 = popText(root, 'Ruled by Venus, | fluent in *cozy.*', { top: 220, size: 96, accentSize: 150, at: T.h1, late: 1, lateAt: T.h1Land, wobble: true, gap: 0.08, accentColor: AMBER })
  const H2 = popText(root, 'Say *yes* | to one | new thing.', { top: 170, size: 124, accentSize: 220, at: T.h2, late: 4, lateAt: T.h2Land + 0.25, lateGap: 0.12, gap: 0.12, wobble: false, accentColor: AMBER, lineHeight: 1.06 })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1420, width: 960, height: 300, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  function sparkles(t, cx, cy, t0, n, R, seed, cols = [GOLD, BONE, PINK, AMBER]) {
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

  // the blanket: a lumpy patchwork mound drawn in 12 px cells, its top edge at `top`
  function drawBlanket(t, cx, top, bottom, { alpha = 1, wob = 0 } = {}) {
    const c = 14, half = 19
    x.save(); x.globalAlpha *= alpha
    for (let i = -half; i < half; i++) {
      const u = Math.abs((i + 0.5) / half)
      // tucked up to the chin: the edge rises where the star's arms hug it, then falls away at the sides
      const hug = -3.2 * Math.exp(-(((u - 0.6) / 0.16) ** 2))
      const fallAway = u > 0.8 ? (u - 0.8) * 34 : 0
      const lump = Math.round(hug + fallAway + Math.sin(i * 1.7 + 0.4) * 0.45 + Math.sin(t * 2 + i * 0.4) * wob)
      const y0 = Math.round(top / c) * c + lump * c
      for (let y = y0, j = 0; y < bottom; y += c, j++) {
        const edge = y === y0 || i === -half || i === half - 1 || y + c >= bottom
        const pc = Math.floor((i + 40) / 4), pr = Math.floor((y - Math.round(top / c) * c + 400 * c) / c / 3)
        let col = QUILT[(pc * 2 + pr * 3) % QUILT.length]
        if ((i + 40) % 4 === 0 && j % 2 === 0) col = '#fff1d6'                     // dashed stitches
        if (edge) col = INK
        else if (y === y0 + c) col = '#fff3dc'                                     // soft fold highlight
        x.fillStyle = col; x.fillRect(cx + i * c, y, c + 0.5, c + 0.5)
      }
    }
    x.restore()
  }

  function drawPopcorn(t, bx, by, k = 1) {
    if (k <= 0.01) return
    drawBits(x, BOWL, { R: '#d6453a', W: '#fff1d6', r: '#8f2a25' }, bx, by, 9 * k)
    for (let i = 0; i < 5; i++) {
      const px = bx + (i - 2) * 22 * k, py = by - 44 * k - (i % 2) * 14 * k
      drawBits(x, CORN, { W: '#fff6dc', Y: '#f7c948' }, Math.round(px), Math.round(py), 6 * k, { outline: '#6b4a2a' })
    }
    // a piece flying up to the star's mouth area on each munch
    for (const m of T.munch) {
      const d = t - m
      if (d < 0 || d > 0.32) continue
      const p = d / 0.32
      drawBits(x, CORN, { W: '#fff6dc', Y: '#f7c948' }, Math.round(lerp(bx, HERO.x + 60, p)), Math.round(lerp(by - 50, HERO.y + 40, p) - Math.sin(Math.PI * p) * 90), 6, { outline: '#6b4a2a', alpha: 1 - p * 0.6 })
    }
  }

  // a small pixel phone: buzzes; "new plans?" arrives; in the final beat a gold "yes!" reply
  function drawPhone(t, P, k, fin) {
    if (k <= 0.01) return
    const buzz = !fin && t > T.phone + 0.1 && t < T.notif + 0.4 ? Math.sin(t * 90) * 6 : 0
    const c = 7, w = 22, h = 38
    x.save(); x.translate(P.x + buzz, P.y + Math.sin(t * 1.8) * 6); x.rotate(0.08 + buzz * 0.004); x.scale(k, k)
    const ox = -w * c / 2, oy = -h * c / 2
    x.fillStyle = INK; x.fillRect(ox - c, oy, (w + 2) * c, h * c); x.fillRect(ox, oy - c, w * c, (h + 2) * c)
    x.fillStyle = '#d9b25a'; x.fillRect(ox, oy, w * c, h * c)
    x.fillStyle = '#1a1033'; x.fillRect(ox + c, oy + c, (w - 2) * c, (h - 2) * c)
    const g = x.createLinearGradient(0, oy, 0, oy + h * c); g.addColorStop(0, '#3a2a6e'); g.addColorStop(1, '#1d1440')
    x.fillStyle = g; x.fillRect(ox + 2 * c, oy + 3 * c, (w - 4) * c, (h - 7) * c)
    x.fillStyle = 'rgba(239,230,214,0.55)'; x.fillRect(-3 * c, oy + (h - 2.5) * c, 6 * c, c)
    // tiny chat inside: a contact dot, their grey bubble, (final) your gold one
    x.fillStyle = PINK; x.fillRect(ox + 4 * c, oy + 5 * c, 2 * c, 2 * c)
    x.fillStyle = 'rgba(239,230,214,0.5)'; x.fillRect(ox + 7 * c, oy + 5.5 * c, 6 * c, c)
    if (fin || t > T.notif) { x.fillStyle = BONE; x.fillRect(ox + 4 * c, oy + 10 * c, 11 * c, 4 * c) }
    if (fin && t > T.yes) { x.fillStyle = GOLD; x.fillRect(ox + 11 * c, oy + 17 * c, 7 * c, 4 * c) }
    x.restore()
    // buzz marks
    if (!fin && t > T.phone + 0.1 && t < T.notif + 0.4) {
      x.save(); x.fillStyle = GOLD; x.globalAlpha = (Math.floor(t * 12) % 2) ? 0.9 : 0.4
      for (const s of [-1, 1]) for (let i = 0; i < 3; i++) x.fillRect(P.x + s * (w * c / 2 + 22 + i * 4), P.y - 60 + i * 44, 8, 26)
      x.restore()
    }
    // the message bubbles float above the phone
    const nk = fin ? 1 : easeOutBack(prog(t, T.notif, T.notif + 0.3), 2.4)
    bubble(x, P.x - 30, P.y - 210, 'new plans?', { k: nk * k, side: 'right', size: 36 })
    if (fin) {
      const yk = easeOutBack(prog(t, T.yes, T.yes + 0.3), 2.6) * k
      bubble(x, P.x + 10, P.y - 110, 'yes!', { k: yk, side: 'right', size: 44, fill: GOLD, weight: 700, font: INTER })
    }
  }

  function drawScene(t) {
    const ok = popOut(t, T.out)
    if (ok <= 0) return
    const fin = t >= T.cut
    const st = heroState(t)
    if (!fin) {
      const pin = easeOutBack(prog(t, T.star, T.star + 0.4), 1.9) * ok
      // hop free of the blanket
      let sq = 0
      if (t > T.gasp && t < T.gasp + 0.5) sq += -0.12 * Math.exp(-(t - T.gasp) * 7) * Math.cos((t - T.gasp) * 20)
      const munch = T.munch.reduce((a, m) => a + (t > m + 0.28 && t < m + 0.5 ? 0.06 * Math.sin(Math.PI * (t - m - 0.28) / 0.22) : 0), 0)
      sq += munch
      const lift = easeOutBack(prog(t, T.free, T.free + 0.35), 2) * 60
      const hops = [T.free, T.sparkle + 0.3]
      drawStarChar(x, HERO.x, HERO.y - lift, HERO.size, t, { color: TAU_.color, glyph: TAU_.glyph, ...st, pop: pin, squash: sq, hops, bob: 4, seed: 6, glow: 1.1 })
      const bt = blanketTop(t)
      drawBlanket(t, HERO.x, HERO.y + bt, HERO.y + 270, { alpha: clamp(pin * 2), wob: t > T.burrow[0] && t < T.burrow[1] + 0.3 ? 0.6 : 0.25 })
      drawPopcorn(t, HERO.x + 250, HERO.y + 150, clamp(pin) )
      drawPhone(t, PHONE, easeOutBack(prog(t, T.phone, T.phone + 0.35), 2.2) * ok, false)
      if (t > T.sparkle) sparkles(t, HERO.x, HERO.y - lift, T.sparkle, 10, 240, 1)
    } else {
      const pk = easeOutBack(prog(t, T.cut - 0.05, T.cut + 0.3), 1.8) * ok
      // the cape: the blanket hanging behind the star
      const c = 12
      x.save(); x.globalAlpha = clamp(pk)
      for (let i = -12; i < 12; i++) {
        const flap = Math.round(Math.sin(t * 3 + i * 0.5) * 1.2)
        const y0 = FINAL.y - 40 + Math.abs(i) * 2, y1 = FINAL.y + 230 + flap * c + (Math.abs(i) > 9 ? -c * 2 : 0)
        for (let y = y0, j = 0; y < y1; y += c, j++) {
          const pi = (Math.floor((i + 40) / 5) + Math.floor(j / 4)) % QUILT.length
          let col = (i + 40) % 5 === 0 || j % 4 === 0 ? '#fff1d6' : QUILT[pi]
          if (i === -12 || i === 11 || y + c >= y1) col = INK
          x.fillStyle = col; x.fillRect(FINAL.x + i * c * lerp(1.0, 1.45, (y - y0) / 270), y, c * lerp(1.0, 1.45, (y - y0) / 270) + 0.5, c + 0.5)
        }
      }
      x.restore()
      const hops = [T.h2Land, T.tap, T.yes + 0.2, T.yes + 0.6]
      drawStarChar(x, FINAL.x, FINAL.y, FINAL.size, t, { color: TAU_.color, glyph: TAU_.glyph, ...st, pop: pk, hops, seed: 6, glow: 1.3 })
      drawPhone(t, PHONE_F, pk, true)
      sparkles(t, FINAL.x, FINAL.y, T.h2Land, 12, 290, 5)
      sparkles(t, PHONE_F.x + 10, PHONE_F.y - 110, T.yes, 8, 110, 2, [GOLD, BONE, SAGE])
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

// card-motif candidates: 4.86 (H0 out → "Ruled by Venus") and 9.0 (box shut → "Say yes to one new thing.").
// cardfx keeps one for this film (the 9.0 one). End card flips at 11.6.
const CUTS = [4.86, { t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const buzz = (t0, n = 7, gap = 0.055, gain = 0.03) => Array.from({ length: n }, (_, i) => ['tick', +(t0 + i * gap).toFixed(3), gain * (i % 2 ? 0.7 : 1)])
export const CUES = [
  // dear taurus: headline, the star in its blanket, munching, the phone buzzes
  ...wordPops(T.h0, 1, 0.12, 0, 0.026), ['pop', T.h0 + 0.24, 1174.66, 0.045, 0],
  ['pop', T.star + 0.08, 659.25, 0.04, -0.2],
  ...T.munch.map(m => ['tick', +(m + 0.3).toFixed(3), 0.03]),
  ['pop', T.phone + 0.05, 587.33, 0.035, 0.3], ...buzz(T.phone + 0.15), ['pop', T.notif + 0.05, 1318.51, 0.035, 0.35],
  ['pop', T.squint, 440, 0.03, -0.2], ['whoosh', T.burrow[0], 0.35, 0.03],
  ['pop', T.open, 739.99, 0.04, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES, { cps: CPS }),
  ['pluck', T.nod, 880, 0.03, 0.5, 0],
  // ruled by venus: peekaboo
  ...wordPops(T.h1, 4, 0.08, 1, 0.022), ['pop', T.h1Land, 1174.66, 0.045, 0], ['pluck', T.h1Land, 880, 0.035, 0.5, 0],
  ['pop', T.gasp, 1318.51, 0.04, 0], ['whoosh', T.peek[0], 0.4, 0.03], ['pop', T.free + 0.05, 987.77, 0.04, 0],
  ['glitter', T.sparkle, T.sparkle + 0.45], ['bell', T.sparkle + 0.05, 1318.51, 0.025, 1.4, 0],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  // say yes
  ...wordPops(T.h2, 1, 0.1, 1, 0.028), ['pop', T.h2Land, 1318.51, 0.055, 0], ['pluck', T.h2Land, 1174.66, 0.05, 0.7, 0], ['glitter', T.h2Land, T.h2Land + 0.45],
  ...wordPops(T.h2Land + 0.25, 4, 0.12, 2, 0.022),
  ['tick', T.tap, 0.04], ['tick', T.tap + 0.1, 0.03], ['pop', T.yes + 0.04, 1567.98, 0.05, 0.3], ['bell', T.yes + 0.06, 1760, 0.03, 1.0, 0.3],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
