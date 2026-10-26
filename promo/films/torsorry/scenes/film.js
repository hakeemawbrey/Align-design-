// torsorry (30 s vertical Align ad) · story 0–25.6, then the shared END CARD ("come" + the Align logo + VOTE FOR YOUR CITY).
// Beats on the 108 bpm grid (beat n at 0.6 + n·0.5556). One canvas, DOM type above it, grain on top. Pure f(t).
//   0.00–6.45   HOOK  "Toronto: | so polite, | nobody says | what they *want.*" — a first date at a little table in
//               front of a generic line-art skyline (a needle tower among condo towers). Polite speech bubbles thud down
//               and pile up between the two pictograms, one per beat: "sorry!", "no, sorry!", "no worries!", "all good!",
//               "haha totally", "you pick!", "anything's fine!", "sorry!!", "SORRY!" — the wobbling stack grows taller than
//               the tower, then pops on the beat (6.16).
//   6.60–11.30  "Everyone's | *thinking* it…" → "…nobody's | *saying* it." — thought clouds over each head hold what
//               they really want to ask ("Kids someday?", "Is this serious?"); the speech bubbles still say
//               "haha totally" / "all good!"; the thoughts sink into question marks.
//  11.40–17.80  "On Align, | dealbreakers | come *first.*" — a DEALBREAKERS card; three chips stamp on, the last the
//               callback (✕ "ANYTHING'S FINE"). "Up front. | *No sorry needed.*"
//  18.05–22.30  "See how you fit, | *no guessing.*" — two zodiac wheels lock; Push / Pull / Align lines.
//  22.50–25.30  "Say what you | *mean.*" — the date again: "I like you." / "I like you too." — the bubbles touch, a heart
//               of stars, the skyline windows light up gold.
//  25.30–25.60  plain sky (SKY_H + grain GRAIN_H) for the end card hand-off at 25.6.
import { clamp, lerp, prog, ease, el, rng } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, TYPE, easeOutBack, drawWheelH, READING } from '../../wheel.js'

const W = 1080, H = 1920
const BONE = '#efe6d6', GOLD = '#f2c75c', PINK = '#ff8fb1', RED = '#ff3d3d', INK = '#1a1430', DULL = '#b9b3d6'
const SILVER = '#e3ecff', LILAC = '#c9a6ff', CYAN = '#8fd8f6', TEAL = '#2fc7b0', MAPLE = '#ff5b4d'
const SHADOW = '0 4px 30px rgba(6,4,18,0.9), 0 0 4px rgba(6,4,18,0.6)'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', monospace"
const SERIF = "'EB Garamond', Georgia, serif"
const D2R = Math.PI / 180, TAU = Math.PI * 2
const BEAT = n => +(0.6 + n * 0.5556).toFixed(3)

export const END = 25.6
export const T = {
  // hook: the polite pile
  h0: 0.1, h0Late: BEAT(4), table: 0.12, bubs: [1, 2, 3, 4, 5, 6, 7, 8, 9].map(BEAT), burst: BEAT(10), h0Out: 6.05,
  // thinking it / not saying it
  h1: 6.6, h1Late: BEAT(11.5), think: [BEAT(12.5), BEAT(13.5)], h1Out: 8.75,
  h1b: 8.9, h1bLate: BEAT(15.5), said: [BEAT(16), BEAT(16.5)], sink: BEAT(18), h1bOut: 11.0, tableOut: [10.95, 11.3],
  // dealbreakers
  h2: 11.4, h2Late: BEAT(20), card: 11.95, chips: [BEAT(22), BEAT(23.5), BEAT(25)], s2: BEAT(26.5), h2Out: 17.75,
  // push / pull / align
  h3: 18.05, h3Late: BEAT(32.5), wA: [18.25, 18.9], wB: [18.45, 19.1], lock: BEAT(33.5), dots: BEAT(34.5),
  lines: [BEAT(35.5), BEAT(36.5), BEAT(37.5)], h3Out: 22.05, wOut: 21.85,
  // say what you mean
  h4: 22.5, h4Late: BEAT(40), table4: 22.5, mean: [BEAT(41), BEAT(42)], kiss: BEAT(43), h4Out: 25.0, table4Out: [24.85, 25.3],
}

const h2r = h => { const n = parseInt(h.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255] }
const rgba = (hex, a) => { const [r, g, b] = h2r(hex); return `rgba(${r},${g},${b},${clamp(a)})` }
const pop01 = (t, t0, d = 0.36, s = 2.0) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, a, d = 0.22) => 1 - ease.inQuad(prog(t, a, a + d))
const wob = (t, a, amp = 1, f = 16, k = 5) => t > a ? amp * Math.exp(-(t - a) * k) * Math.sin((t - a) * f) : 0

/** fill the current path at fa, then stroke it thick with a glow */
function ink(x, col, { w = 7, fa = 0.28, glow = 18, fill = col } = {}) {
  if (fa > 0) { x.fillStyle = rgba(fill, fa); x.fill() }
  x.lineJoin = 'round'; x.lineCap = 'round'
  x.shadowColor = col; x.shadowBlur = glow
  x.strokeStyle = col; x.lineWidth = w; x.stroke()
  x.shadowBlur = 0
}
const SPARK = ['#ffd98a', '#f2c75c', '#ff8fb1', '#c9a6ff', '#8fd8f6', '#fff3e0']
function sparkle(x, px, py, t, t0, { n = 10, R = 150, seed = 1, cols = SPARK, size = 28, dur = 0.75 } = {}) {
  const tt = t - t0
  if (tt < 0 || tt > dur) return
  const r = rng(seed)
  x.save()
  for (let i = 0; i < n; i++) {
    const a = (i / n) * TAU + r() * 0.5, d = R * (0.6 + 0.5 * r()), col = cols[Math.floor(r() * cols.length)], kind = Math.floor(r() * 3)
    const p = 1 - Math.pow(1 - Math.min(1, tt / (dur * 0.8)), 3)
    x.globalAlpha = Math.max(0, 1 - Math.max(0, tt - dur * 0.3) / (dur * 0.7))
    drawPixelStar(x, px + Math.cos(a) * d * p, py + Math.sin(a) * d * p, size * (1 - 0.35 * p), kind, col)
  }
  x.restore()
}
function orb(x, px, py, r, color, a = 1, halo = 3.2) {
  if (a <= 0 || r <= 0.5) return
  x.save()
  x.globalCompositeOperation = 'lighter'
  const hr = r * halo, g = x.createRadialGradient(px, py, r * 0.5, px, py, hr)
  g.addColorStop(0, rgba(color, 0.5 * a)); g.addColorStop(0.3, rgba(color, 0.16 * a)); g.addColorStop(1, rgba(color, 0))
  x.fillStyle = g; x.beginPath(); x.arc(px, py, hr, 0, TAU); x.fill()
  x.globalCompositeOperation = 'source-over'
  x.globalAlpha = a
  const s = x.createRadialGradient(px - r * 0.35, py - r * 0.4, r * 0.08, px, py, r)
  s.addColorStop(0, '#fffaf0'); s.addColorStop(0.45, color); s.addColorStop(1, rgba(color, 0.85))
  x.fillStyle = s; x.beginPath(); x.arc(px, py, r, 0, TAU); x.fill()
  x.restore()
}

/** springy word-by-word type. `*word*` = accent (Garamond italic, colour), `|` = line break.
 *  The last `late` words pop at lateAt (big, optional wobble or a heavy drop). `times` overrides per-word times; `colors` per-word colours. */
function popText(parent, text, { top, size, weight = 800, accentColor = GOLD, accentSize, gap = 0.07, at: t0, late = 0, lateAt = null, lateGap = 0.1, wobble = false, drop = false, times = null, colors = {}, lineHeight = 1.02 }) {
  const box = el('div', { position: 'absolute', left: '70px', width: (W - 140) + 'px', top: top + 'px', textAlign: 'center',
    fontFamily: INTER, fontWeight: weight, fontSize: size + 'px', lineHeight, color: BONE, textShadow: SHADOW, letterSpacing: '-0.01em', display: 'none' }, parent)
  const toks = text.split(' '), nW = toks.filter(w => w !== '|').length
  const ws = []
  let n = 0
  toks.forEach(w => {
    if (w === '|') { el('br', {}, box); return }
    const acc = w.startsWith('*') || w.endsWith('*')
    const style = { display: 'inline-block', margin: '0 0.12em', opacity: 0, visibility: 'hidden', transformOrigin: '50% 85%' }
    if (acc) Object.assign(style, { fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontWeight: 500, fontSize: (accentSize || size * 1.09) + 'px', color: accentColor, letterSpacing: '0', margin: '0 0.08em' })
    if (colors[n]) style.color = colors[n]
    const big = late > 0 && n >= nW - late
    const wt = times ? times[n] : big ? lateAt + (n - (nW - late)) * lateGap : t0 + n * gap
    ws.push({ t: wt, big, e: el('span', style, box, w.replace(/\*/g, '')) })
    n++
  })
  const first = Math.min(...ws.map(w => w.t))
  return {
    update(t, out = 1) {
      box.style.display = out <= 0 || t < first ? 'none' : 'block'
      if (box.style.display === 'none') return
      for (const w of ws) {
        // a word is fully hidden until its own pop time
        const on = t >= w.t && out > 0
        w.e.style.visibility = on ? 'visible' : 'hidden'
        if (!on) { w.e.style.opacity = '0'; continue }
        if (w.big && drop) {
          const p = prog(t, w.t, w.t + 0.34), land = w.t + 0.34
          const y = -420 * (1 - ease.inQuad(p))
          const sq = t > land ? 0.3 * Math.exp(-(t - land) * 6) * Math.cos((t - land) * 22) : 0
          w.e.style.opacity = String(clamp(p * 4) * out)
          w.e.style.transform = `translateY(${(y + (1 - out) * 10).toFixed(2)}px) scale(${((1 + sq) * lerp(0.9, 1, out)).toFixed(4)}, ${((1 - sq) * lerp(0.9, 1, out)).toFixed(4)})`
          continue
        }
        const p = prog(t, w.t, w.t + (w.big ? 0.42 : 0.28))
        const sc = w.big ? 0.3 + 0.7 * easeOutBack(p, 3.2) : 0.6 + 0.4 * easeOutBack(p, 2.4)
        const rot = w.big && wobble && t > w.t ? 7 * Math.sin((t - w.t) * 14) * Math.exp(-(t - w.t) * 3.2) : 0
        w.e.style.opacity = String(clamp(p * 3) * out)
        w.e.style.transform = `translateY(${((1 - ease.outCubic(p)) * 30 + (1 - out) * 10).toFixed(2)}px) scale(${(sc * lerp(0.9, 1, out)).toFixed(4)}) rotate(${rot.toFixed(2)}deg)`
      }
    },
  }
}


// ───────────────────────── props (bold line art, flat fills, no faces, no brands)
const TY = 1440                     // table top
const YOU = { cx: 205, col: GOLD }, DATE = { cx: 875, col: LILAC }

/** pictogram person seated behind the table: head + rounded shoulders; (cx, by) = where the torso meets the table */
function person(x, cx, by, col, { a = 1, s = 1, bob = 0, lean = 0, shrink = 0 } = {}) {
  if (a <= 0) return
  x.save(); x.globalAlpha = a; x.translate(cx, by); x.rotate(lean * D2R); x.scale(s * (1 + 0.05 * shrink), s * (1 - 0.12 * shrink)); x.translate(0, bob)
  x.beginPath()
  x.moveTo(-104, 20); x.lineTo(-104, -120)
  x.quadraticCurveTo(-104, -196, -30, -200); x.lineTo(30, -200); x.quadraticCurveTo(104, -196, 104, -120)
  x.lineTo(104, 20); x.closePath()
  ink(x, col, { w: 8, fa: 0.26, glow: 18 })
  x.beginPath(); x.arc(0, -268 + 30 * shrink, 52, 0, TAU)
  ink(x, col, { w: 8, fa: 0.34, glow: 22 })
  x.restore()
}

/** a little patio table: thick top, checked cloth with a scalloped hem, pedestal, a candle in a jar */
function table(x, a, k = 1, t = 0) {
  if (a <= 0) return
  x.save(); x.globalAlpha = a
  x.translate(540, TY); x.scale(k, k)
  x.beginPath(); x.moveTo(-26, 150); x.lineTo(-26, 330); x.lineTo(26, 330); x.lineTo(26, 150); x.closePath(); ink(x, BONE, { w: 6, fa: 0.12, glow: 10 })
  x.beginPath(); x.roundRect(-150, 322, 300, 28, 14); ink(x, BONE, { w: 6, fa: 0.2, glow: 10 })
  x.beginPath(); x.moveTo(-430, 0); x.lineTo(-430, 150)
  const n = 9
  for (let i = 0; i < n; i++) { const x0 = -430 + (860 / n) * i, x1 = x0 + 860 / n; x.quadraticCurveTo((x0 + x1) / 2, 186, x1, 150) }
  x.lineTo(430, 0); x.closePath()
  ink(x, MAPLE, { w: 7, fa: 0.14, glow: 16 })
  x.save(); x.clip(); x.globalAlpha *= 0.2; x.fillStyle = MAPLE
  for (let i = -430; i < 430; i += 72) x.fillRect(i, 0, 30, 200)
  for (let j = 30; j < 200; j += 72) x.fillRect(-430, j, 860, 30)
  x.restore()
  x.beginPath(); x.roundRect(-460, -14, 920, 28, 14); ink(x, BONE, { w: 7, fa: 0.3, glow: 18 })
  x.restore()
}

/** a candle in a glass jar, flame flickers */
function candle(x, cx, by, t, a = 1, s = 1) {
  if (a <= 0 || s <= 0.01) return
  x.save(); x.globalAlpha = a; x.translate(cx, by); x.scale(s, s)
  const fl = 1 + 0.12 * Math.sin(t * 17) + 0.07 * Math.sin(t * 29 + 1)
  x.save(); x.globalCompositeOperation = 'lighter'
  const g = x.createRadialGradient(0, -110, 0, 0, -110, 120); g.addColorStop(0, rgba(GOLD, 0.35)); g.addColorStop(1, rgba(GOLD, 0))
  x.fillStyle = g; x.beginPath(); x.arc(0, -110, 120, 0, TAU); x.fill(); x.restore()
  x.beginPath(); x.roundRect(-38, -96, 76, 96, 16); ink(x, BONE, { w: 5, fa: 0.1, glow: 10 })
  x.beginPath(); x.roundRect(-24, -64, 48, 60, 6); x.fillStyle = rgba(BONE, 0.75); x.fill()
  x.beginPath(); x.moveTo(0, -66); x.quadraticCurveTo(16 * fl, -86, 0, -112 * fl + 6); x.quadraticCurveTo(-16 * fl, -86, 0, -66)
  x.fillStyle = '#ffd98a'; x.shadowColor = GOLD; x.shadowBlur = 24; x.fill()
  x.restore()
}

// ── the skyline: generic condo towers, a needle tower, a lake line. lit 0..1 = windows glow gold
const TOWERS = [[30, 150, 300], [150, 120, 380], [250, 90, 250], [330, 130, 450], [440, 110, 330], [770, 120, 420], [880, 100, 290], [960, 130, 360]]
const SKY_BASE = 1360, NEEDLE_X = 640
function skyline(x, t, a, lit = 0) {
  if (a <= 0) return
  x.save(); x.globalAlpha = a
  const col = '#7f74b8'
  // lake line + glints
  x.beginPath(); x.moveTo(0, SKY_BASE); x.lineTo(W, SKY_BASE); ink(x, CYAN, { w: 4, fa: 0, glow: 12 })
  for (let i = 0; i < 6; i++) {
    const gx = 60 + i * 190 + 20 * Math.sin(t * 1.3 + i), gw = 40 + 20 * Math.sin(t * 2 + i * 2)
    x.globalAlpha = a * (0.4 + 0.3 * Math.sin(t * 3 + i)); x.beginPath(); x.moveTo(gx, SKY_BASE + 22); x.lineTo(gx + gw, SKY_BASE + 22); ink(x, CYAN, { w: 4, fa: 0, glow: 8 })
  }
  x.globalAlpha = a
  // condo towers
  TOWERS.forEach(([tx, tw, th], i) => {
    x.beginPath(); x.rect(tx, SKY_BASE - th, tw, th); ink(x, col, { w: 5, fa: 0.5, glow: 8, fill: '#2a2152' })
    // windows (a few lit)
    const r = rng(80 + i)
    for (let wy = SKY_BASE - th + 26; wy < SKY_BASE - 20; wy += 40) for (let wx = tx + 18; wx < tx + tw - 22; wx += 34) {
      const on = r() < 0.18 + 0.82 * lit * clamp((lit * 1.4 - r() * 0.4) * 2)
      if (!on) continue
      x.fillStyle = lit > 0.05 ? rgba(GOLD, 0.35 + 0.6 * lit) : rgba(LILAC, 0.35)
      x.fillRect(wx, wy, 14, 18)
    }
  })
  // the needle tower (generic): long shaft, pod, thin spire
  const nx = NEEDLE_X
  x.beginPath(); x.moveTo(nx - 30, SKY_BASE); x.lineTo(nx - 9, SKY_BASE - 470); x.lineTo(nx + 9, SKY_BASE - 470); x.lineTo(nx + 30, SKY_BASE); x.closePath()
  ink(x, col, { w: 5, fa: 0.5, glow: 8, fill: '#2a2152' })
  x.beginPath(); x.ellipse(nx, SKY_BASE - 480, 46, 22, 0, 0, TAU); ink(x, lit > 0.05 ? GOLD : col, { w: 5, fa: 0.55, glow: 10 + 10 * lit, fill: '#2a2152' })
  x.beginPath(); x.ellipse(nx, SKY_BASE - 535, 20, 10, 0, 0, TAU); ink(x, col, { w: 4, fa: 0.5, glow: 8, fill: '#2a2152' })
  x.beginPath(); x.moveTo(nx, SKY_BASE - 545); x.lineTo(nx, SKY_BASE - 680); ink(x, col, { w: 5, fa: 0, glow: 8 })
  // blinking tip light
  const bl = 0.5 + 0.5 * Math.sin(t * 4)
  orb(x, nx, SKY_BASE - 684, 6, RED, a * (0.3 + 0.7 * bl), 3)
  x.restore()
}

/** speech bubble centred at (0,0): rounded pill + tail toward side (-1 = left/down-left, 1 = right) */
function speech(x, txt, { side = -1, size = 50, fillC = '#f3eefc', rim = BONE, col = INK, minW = 0 } = {}) {
  x.font = `800 ${size}px ${INTER}`
  const w = Math.max(minW, x.measureText(txt).width + size * 1.2), h = size * 1.6
  x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, h / 2)
  const tx = side * (w / 2 - h * 0.55)
  x.moveTo(tx - side * 26, h / 2 - 6); x.lineTo(tx + side * 34, h / 2 + 34); x.lineTo(tx + side * 18, h / 2 - 6)
  x.fillStyle = fillC; x.shadowColor = 'rgba(0,0,0,0.45)'; x.shadowBlur = 26; x.shadowOffsetY = 8; x.fill(); x.shadowOffsetY = 0
  ink(x, rim, { w: 5, fa: 0, glow: 14 })
  x.fillStyle = col; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(txt, 0, 3)
  return w
}

/** a thought cloud of w×h centred at (0,0) with text lines; bumps along the rim */
function cloud(x, w, h, lines, { a = 1, size = 60, fillC = '#f3eefc', rim = BONE } = {}) {
  const bumps = []
  const nx = Math.max(3, Math.round(w / 80)), ny = Math.max(1, Math.round(h / 80))
  const r = 40
  for (let i = 0; i <= nx; i++) { const px = -w / 2 + (w * i) / nx; bumps.push([px, -h / 2, r + ((i * 37) % 3) * 5], [px + 20, h / 2, r + ((i * 53) % 3) * 5]) }
  for (let j = 0; j <= ny; j++) { const py = -h / 2 + (h * j) / ny; bumps.push([-w / 2, py, r], [w / 2, py, r]) }
  x.save(); x.globalAlpha *= a
  x.shadowColor = rim; x.shadowBlur = 22; x.fillStyle = rim
  for (const [px, py, rr] of bumps) { x.beginPath(); x.arc(px, py, rr + 7, 0, TAU); x.fill() }
  x.beginPath(); x.rect(-w / 2 - 7, -h / 2 - 7, w + 14, h + 14); x.fill()
  x.shadowBlur = 0; x.fillStyle = fillC
  for (const [px, py, rr] of bumps) { x.beginPath(); x.arc(px, py, rr, 0, TAU); x.fill() }
  x.beginPath(); x.rect(-w / 2, -h / 2, w, h); x.fill()
  x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.font = `800 ${size}px ${INTER}`
  lines.forEach((l, i) => x.fillText(l, 0, (i - (lines.length - 1) / 2) * size * 1.08 + 3))
  x.restore()
}

// the polite pile: [text, who (−1 you / 1 date), x offset from centre]
const PILE = [
  ['sorry!', -1, -40], ['no, sorry!', 1, 40], ['no worries!', -1, -30], ['all good!', 1, 34], ['haha totally', -1, -20],
  ['you pick!', 1, 30], ['anything’s fine!', -1, -14], ['sorry!!', 1, 20], ['SORRY!', -1, 0],
]
const PILE_BASE = 1362, PILE_STEP = 78

/** the DEALBREAKERS card (illustrated, not app UI): dark glass, gold rim, the app's question, three chip slots */
const CARD = { w: 820, h: 760, cx: 540, cy: 1110 }
const CHIP_Y = [-50, 80, 220]
const CHIPS = ['NOT LOOKING FOR SERIOUS', 'FLAKY PLANS', '“ANYTHING’S FINE”']
function dealCard(x) {
  const { w, h } = CARD
  x.shadowColor = 'rgba(0,0,0,0.55)'; x.shadowBlur = 40; x.shadowOffsetY = 16
  x.fillStyle = 'rgba(18,12,40,0.94)'; x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, 40); x.fill()
  x.shadowOffsetY = 0; x.shadowBlur = 0
  const gr = x.createLinearGradient(0, -h / 2, 0, h / 2); gr.addColorStop(0, rgba(LILAC, 0.2)); gr.addColorStop(1, rgba(LILAC, 0.02))
  x.fillStyle = gr; x.fill()
  x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, 40); ink(x, GOLD, { w: 9, fa: 0, glow: 26 })
  x.save(); x.globalAlpha *= 0.4; x.strokeStyle = GOLD; x.lineWidth = 2; x.beginPath(); x.roundRect(-w / 2 + 18, -h / 2 + 18, w - 36, h - 36, 28); x.stroke(); x.restore()
  x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillStyle = GOLD; x.font = `700 36px ${MONO}`; x.fillText('DEALBREAKERS', 0, -h / 2 + 76)
  x.fillStyle = BONE; x.font = `italic 500 64px ${SERIF}`; x.fillText('What ends it before it starts?', 0, -h / 2 + 158)
  CHIP_Y.forEach(y => { x.save(); x.setLineDash([14, 12]); x.strokeStyle = rgba(BONE, 0.32); x.lineWidth = 4; x.beginPath(); x.roundRect(-340, y - 46, 680, 92, 46); x.stroke(); x.restore() })
}
function chip(x, label, hot = 0) {
  const cw = 690, ch = 96
  x.beginPath(); x.roundRect(-cw / 2, -ch / 2, cw, ch, 48)
  x.fillStyle = 'rgba(58,10,22,0.95)'; x.fill()
  ink(x, RED, { w: 7, fa: 0, glow: 18 + 30 * hot })
  x.save(); x.translate(-cw / 2 + 58, 0); x.beginPath(); x.moveTo(-16, -16); x.lineTo(16, 16); x.moveTo(16, -16); x.lineTo(-16, 16); ink(x, '#ff5a52', { w: 9, fa: 0, glow: 12 }); x.restore()
  let fs = 50
  x.font = `900 ${fs}px ${INTER}`
  const room = cw - 150, mw = x.measureText(label).width
  if (mw > room) { fs = Math.floor(fs * room / mw); x.font = `900 ${fs}px ${INTER}` }
  x.fillStyle = '#ffe2dc'; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText(label, 28, 3)
}

// ── wheels (as in htxspacecity / htxbrunch)
const WC = { cx: 540, cy: 1080 }
const WA = { cx: 0, cy: 0, rOut: 430, rIn: 344, rGlyph: 387, alpha: 0.92 }
const WB = { cx: 0, cy: 0, rOut: 328, rIn: 256, rGlyph: 292, alpha: 0.92 }
const pt = (lon, r) => ({ x: WC.cx + Math.cos(Math.PI - lon * D2R) * r, y: WC.cy + Math.sin(Math.PI - lon * D2R) * r })
const PAIRS = [
  { a: 20, b: 110, col: READING.push },
  { a: 145, b: 265, col: READING.pull },
  { a: 228, b: 48, col: READING.align },
]
const R_A = 220, R_B = 128

// beat 2: what they think vs what they say
const THINK = [
  { lines: ['Kids someday?'], x: 330, y: 840, w: 470, h: 84, rot: -3, col: GOLD, who: YOU },
  { lines: ['Is this serious?'], x: 740, y: 640, w: 520, h: 84, rot: 3, col: LILAC, who: DATE },
]
const SAID = [
  { txt: 'haha totally', x: 370, y: 1070, side: -1 },
  { txt: 'all good!', x: 720, y: 950, side: 1 },
]

export async function build(stage) {
  try {
    await Promise.all(["800 108px Inter", "900 80px Inter", "700 62px Inter", "italic 500 118px 'EB Garamond'", "bold 58px 'EB Garamond'", "700 34px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const eyebrow = (txt, color = GOLD) => el('div', { position: 'absolute', left: 0, width: W + 'px', top: (TYPE.eyebrowY - 28) + 'px', textAlign: 'center', font: TYPE.eyebrow,
    letterSpacing: '0.25em', color, textShadow: SHADOW, opacity: 0 }, root, txt)
  const EYES = [[eyebrow('TORONTO · FIRST DATE'), 0.05, T.h0Out]]
  const H0 = popText(root, 'Toronto: | so polite, | nobody says | what they *want.*', { top: 196, size: 104, accentSize: 140, at: T.h0, gap: 0.07, late: 1, lateAt: T.h0Late, wobble: true, accentColor: PINK, lineHeight: 1.0 })
  const H1 = popText(root, 'Everyone’s | *thinking* it…', { top: 205, size: 116, accentSize: 150, at: T.h1, gap: 0.08, late: 1, lateAt: T.h1Late, wobble: true, accentColor: GOLD })
  const H1b = popText(root, '…nobody’s | *saying* it.', { top: 205, size: 116, accentSize: 150, at: T.h1b, gap: 0.08, late: 1, lateAt: T.h1bLate, drop: true, accentColor: PINK })
  const H2 = popText(root, 'On Align, | dealbreakers | come *first.*', { top: 190, size: 112, accentSize: 150, at: T.h2, gap: 0.08, late: 1, lateAt: T.h2Late, wobble: true, accentColor: GOLD })
  const S2 = popText(root, 'Up front. | *No\u00a0sorry\u00a0needed.*', { top: 1560, size: 76, weight: 800, accentSize: 100, at: T.s2, gap: 0.07, late: 1, lateAt: T.s2 + 0.3, accentColor: PINK })
  const H3 = popText(root, 'See how you fit, | *no\u00a0guessing.*', { top: 200, size: 108, accentSize: 146, at: T.h3, gap: 0.06, late: 1, lateAt: T.h3Late, wobble: true, accentColor: CYAN })
  const S3 = popText(root, 'Push. Pull. *Align.*', { top: 1620, size: 76, weight: 800, accentSize: 90, times: T.lines, colors: { 0: READING.push, 1: READING.pull }, accentColor: READING.align })
  const H4 = popText(root, 'Say what you | *mean.*', { top: 200, size: 140, accentSize: 200, at: T.h4, gap: 0.08, late: 1, lateAt: T.h4Late, wobble: true, accentColor: GOLD, lineHeight: 1.0 })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H1b, T.h1bOut], [H2, T.h2Out], [S2, T.h2Out], [H3, T.h3Out], [S3, T.h3Out], [H4, T.h4Out]]

  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  // ── 1+2 · the date (hook + thinking/saying share it)
  function drawDate(t) {
    if (t > T.tableOut[1]) return
    const a = 1 - ease.inCubic(prog(t, ...T.tableOut))
    const rise = 1 - ease.outCubic(prog(t, T.table, T.table + 0.6))
    const act2 = t >= T.h1 - 0.3
    x.save(); x.translate(0, rise * 180 + 60 * ease.inCubic(prog(t, ...T.tableOut)))
    skyline(x, t, a * 0.85 * clamp(prog(t, 0.0, 0.5)), 0)
    // the people: they shrink a little with every apology, and bow on their own bubbles
    const bowOf = side => T.bubs.reduce((s, tb, i) => s + (PILE[i][1] === side ? Math.max(0, Math.sin(Math.PI * prog(t, tb, tb + 0.42))) : 0), 0)
    const pk = pop01(t, T.table + 0.05, 0.4), dk = pop01(t, T.table + 0.15, 0.4)
    const cringe = act2 ? 0 : 0.6 * ease.inOutQuad(prog(t, T.bubs[0], T.bubs[8]))
    person(x, YOU.cx, TY, YOU.col, { a: a * clamp(pk * 3), s: pk, bob: 6 * Math.sin(t * 2.6) + 26 * bowOf(-1), lean: 7 * bowOf(-1), shrink: cringe })
    person(x, DATE.cx, TY, DATE.col, { a: a * clamp(dk * 3), s: dk, bob: 6 * Math.sin(t * 2.6 + 1) + 26 * bowOf(1), lean: -7 * bowOf(1), shrink: cringe })
    table(x, a, lerp(0.7, 1, pop01(t, T.table, 0.45)), t)
    candle(x, 540, TY - 14, t, a, pop01(t, T.table + 0.3, 0.4))
    if (!act2) drawPile(t, a)
    else drawThinkSay(t, a)
    x.restore()
  }

  function drawPile(t, a) {
    const n = T.bubs.filter(tb => t >= tb - 0.25).length
    if (!n) return
    const sway = 0.6 + n * 0.5
    T.bubs.forEach((tb, i) => {
      if (t < tb - 0.25) return
      const [txt, side, ox] = PILE[i]
      const p = prog(t, tb - 0.25, tb), land = tb
      const hgt = i * PILE_STEP
      const baseY = PILE_BASE - hgt
      const y = baseY - 520 * (1 - ease.inQuad(p))
      const sq = t > land ? 0.18 * Math.exp(-(t - land) * 8) * Math.cos((t - land) * 26) : 0
      // the whole stack sways more the taller it gets (pivot at the table)
      const sw = sway * Math.sin(t * 3.4) * (hgt / 600) * 22 + (i === 8 ? 0 : 0)
      // the burst: top first
      const bt = T.burst + (8 - i) * 0.025
      if (t > bt + 0.12) return
      const bk = prog(t, bt, bt + 0.12)
      const sc = (1 + sq) * (1 + 0.8 * ease.outCubic(bk)) * (i === 8 ? 1.15 : 1)
      x.save(); x.translate(540 + ox + sw, y); x.rotate((side * 2.5 + sw * 0.08) * D2R); x.scale(sc, (1 - sq) * (1 + 0.8 * ease.outCubic(bk)) * (i === 8 ? 1.15 : 1))
      x.globalAlpha = a * clamp(p * 4) * (1 - bk)
      speech(x, txt, { side, size: i === 8 ? 60 : 52, fillC: side < 0 ? '#fff1cf' : '#ece2ff', rim: side < 0 ? GOLD : LILAC, col: i === 8 ? '#b0182b' : INK })
      x.restore()
      sparkle(x, 540 + ox, baseY, t, bt, { n: 7, R: 220, seed: 100 + i, size: 22, cols: [side < 0 ? GOLD : LILAC, BONE, PINK] })
    })
  }

  function drawThinkSay(t, a) {
    // thought trails from heads + clouds
    THINK.forEach((B, i) => {
      const t0 = T.think[i]
      if (t < t0 - 0.3) return
      const sinkK = ease.inCubic(prog(t, T.sink, T.sink + 0.35))
      const headX = B.who.cx, headY = TY - 268
      ;[0, 1, 2].forEach(j => {
        const k = pop01(t, t0 - 0.3 + j * 0.07, 0.25)
        if (k <= 0) return
        const px = lerp(headX, B.x, 0.18 + j * 0.16), py = lerp(headY - 70, B.y + B.h / 2 + 40, 0.18 + j * 0.2)
        x.save(); x.globalAlpha = a * (1 - sinkK); x.beginPath(); x.arc(px, py, (10 + j * 6) * k, 0, TAU); ink(x, BONE, { w: 5, fa: 0.85, glow: 14, fill: '#f3eefc' }); x.restore()
      })
      const k = pop01(t, t0, 0.42, 2.2)
      if (k <= 0) return
      const bob = 8 * Math.sin(t * 2.4 + i * 2)
      x.save(); x.translate(B.x, B.y + bob); x.rotate(B.rot * D2R); x.scale(k * (1 - 0.85 * sinkK), k * (1 - 0.85 * sinkK))
      x.globalAlpha = a * clamp(k * 3)
      cloud(x, B.w, B.h, B.lines, { a: 1, size: 64, rim: B.col })
      x.restore()
      sparkle(x, B.x, B.y, t, t0 + 0.1, { n: 10, R: 300, seed: 140 + i, size: 24, cols: [B.col, BONE, PINK] })
      // after the sink, a big wobbling "?" sits where the cloud was
      const qk = pop01(t, T.sink + 0.25 + i * 0.1, 0.4, 2.6)
      if (qk > 0) {
        x.save(); x.translate(B.x, B.y + bob); x.rotate((wob(t, T.sink + 0.25 + i * 0.1, 14, 14, 3) + (i ? 10 : -10)) * D2R); x.scale(qk, qk)
        x.globalAlpha = a; x.font = `italic 500 220px ${SERIF}`; x.textAlign = 'center'; x.textBaseline = 'middle'
        x.shadowColor = B.col; x.shadowBlur = 30; x.fillStyle = B.col; x.fillText('?', 0, 10)
        x.restore()
      }
    })
    // what they say instead
    SAID.forEach((S, i) => {
      const t0 = T.said[i]
      const k = pop01(t, t0, 0.38, 2.4)
      if (k <= 0) return
      x.save(); x.translate(S.x, S.y + 6 * Math.sin(t * 3 + i)); x.rotate((S.side * 3 + wob(t, t0, 5)) * D2R); x.scale(k, k); x.globalAlpha = a * clamp(k * 3)
      speech(x, S.txt, { side: S.side, size: 54, fillC: S.side < 0 ? '#fff1cf' : '#ece2ff', rim: S.side < 0 ? GOLD : LILAC })
      x.restore()
    })
  }

  // ── 3 · dealbreakers come first
  function drawDeal(t) {
    if (t < T.card - 0.05 || t > T.h2Out + 0.45) return
    const o = ease.inCubic(prog(t, T.h2Out - 0.1, T.h2Out + 0.35))
    const ck = pop01(t, T.card, 0.5, 1.8)
    const thumps = T.chips.reduce((s, tc) => s + (t > tc ? Math.sin((t - tc) * 26) * Math.exp(-(t - tc) * 8) : 0), 0)
    x.save()
    x.translate(CARD.cx, CARD.cy + 10 * Math.sin((t - T.card) * 2) + 10 * thumps + 160 * o)
    x.rotate((-2 + 1.2 * Math.sin((t - T.card) * 1.6)) * D2R)
    x.scale(ck * (1 - 0.03 * thumps) * (1 - 0.2 * o), ck * (1 + 0.03 * thumps) * (1 - 0.2 * o))
    x.globalAlpha = clamp(ck * 3) * (1 - o)
    dealCard(x)
    T.chips.forEach((tc, i) => {
      if (t < tc - 0.18) return
      const sp = prog(t, tc - 0.18, tc)
      const sc = lerp(2.2, 1, ease.inCubic(sp)) * (t > tc ? 1 + 0.07 * Math.sin((t - tc) * 30) * Math.exp(-(t - tc) * 9) : 1)
      const hot = Math.exp(-Math.max(0, t - tc) * 3)
      x.save(); x.translate(0, CHIP_Y[i]); x.rotate((i === 2 ? -2.5 : i ? 1.5 : -1) * D2R); x.scale(sc, sc); x.globalAlpha *= clamp(sp * 3)
      chip(x, CHIPS[i], hot)
      x.restore()
    })
    x.restore()
    sparkle(x, CARD.cx, CARD.cy, t, T.card + 0.2, { n: 12, R: 470, seed: 50, size: 28 })
    T.chips.forEach((tc, i) => sparkle(x, CARD.cx, CARD.cy + CHIP_Y[i], t, tc, { n: i === 2 ? 16 : 10, R: i === 2 ? 460 : 380, seed: 60 + i, size: i === 2 ? 30 : 24, cols: [RED, '#ff8a80', GOLD, '#fff3e0'] }))
  }

  // ── 4 · two wheels lock; Push / Pull / Align
  function drawWheels(t) {
    if (t < T.wA[0] - 0.05 || t > T.h3Out + 0.4) return
    const o = 1 - ease.inCubic(prog(t, T.wOut, T.wOut + 0.4))
    const os = lerp(0.6, 1, o)
    const bump = 1 + 0.06 * Math.exp(-Math.max(0, t - T.lock) * 7) * (t > T.lock ? 1 : 0)
    const pa = easeOutBack(prog(t, ...T.wA), 1.3), pb = easeOutBack(prog(t, ...T.wB), 1.3)
    const ra = -1.75 * Math.PI * (1 - ease.outCubic(prog(t, T.wA[0], T.lock))), rb = 1.5 * Math.PI * (1 - ease.outCubic(prog(t, T.wB[0], T.lock)))
    const ax = lerp(-560, WC.cx, pa), bx = lerp(1640, WC.cx, pb)
    x.save(); x.globalAlpha = o
    if (t >= T.wA[0]) { x.save(); x.translate(ax, WC.cy); x.rotate(ra); x.scale(bump * os, bump * os); drawWheelH(x, { W: WA, k: o }); x.restore() }
    if (t >= T.wB[0]) { x.save(); x.translate(bx, WC.cy); x.rotate(rb); x.scale(bump * os, bump * os); drawWheelH(x, { W: WB, k: o }); x.restore() }
    x.restore()
    const fk = prog(t, T.lock, T.lock + 0.6)
    if (fk > 0 && fk < 1) {
      x.save(); x.globalAlpha = 1 - fk; x.beginPath(); x.arc(WC.cx, WC.cy, 340 + 120 * ease.outCubic(fk), 0, TAU); ink(x, GOLD, { w: 10 * (1 - fk) + 2, fa: 0, glow: 30 }); x.restore()
    }
    sparkle(x, WC.cx, WC.cy, t, T.lock, { n: 16, R: 420, seed: 9, size: 30 })
    PAIRS.forEach((P, i) => {
      const A_ = pt(P.a, R_A * os), B_ = pt(P.b, R_B * os)
      const dk = pop01(t, T.dots + i * 0.08, 0.36, 2.2) * o
      const lk = ease.inOutCubic(prog(t, T.lines[i], T.lines[i] + 0.38)) * o
      if (lk > 0) {
        const pulse = 1 + 0.25 * Math.exp(-Math.max(0, t - T.lines[i] - 0.38) * 4)
        x.save(); x.globalAlpha = o; x.beginPath(); x.moveTo(A_.x, A_.y); x.lineTo(lerp(A_.x, B_.x, lk), lerp(A_.y, B_.y, lk)); ink(x, P.col, { w: 10 * pulse, fa: 0, glow: 26 }); x.restore()
        sparkle(x, B_.x, B_.y, t, T.lines[i] + 0.36, { n: 8, R: 100, seed: 20 + i, cols: [P.col, '#fff3e0'], size: 22 })
      }
      if (dk > 0) {
        orb(x, A_.x, A_.y, 24 * dk, GOLD, clamp(dk * 2) * o)
        orb(x, B_.x, B_.y, 24 * dk, SILVER, clamp(dk * 2) * o)
      }
    })
  }

  // ── 5 · say what you mean: the date again, two honest bubbles meet, a heart of stars, the city lights up
  function drawEnd(t) {
    if (t < T.table4 || t > T.table4Out[1]) return
    const a = 1 - ease.inCubic(prog(t, ...T.table4Out))
    const rise = 1 - ease.outCubic(prog(t, T.table4, T.table4 + 0.55))
    const lit = ease.inOutQuad(prog(t, T.kiss - 0.1, T.kiss + 0.5))
    x.save(); x.translate(0, rise * 200 + 70 * ease.inCubic(prog(t, ...T.table4Out)))
    skyline(x, t, a * 0.9, lit)
    const pk = pop01(t, T.table4 + 0.05, 0.4), dk = pop01(t, T.table4 + 0.12, 0.4)
    const lean = ease.inOutCubic(prog(t, T.mean[1], T.kiss))
    person(x, YOU.cx, TY, GOLD, { a: a * clamp(pk * 3), s: pk, bob: 5 * Math.sin(t * 2.6) - 10 * lean, lean: 6 * lean })
    person(x, DATE.cx, TY, PINK, { a: a * clamp(dk * 3), s: dk, bob: 5 * Math.sin(t * 2.6 + 1) - 10 * lean, lean: -6 * lean })
    table(x, a, lerp(0.7, 1, pop01(t, T.table4, 0.45)), t)
    candle(x, 540, TY - 14, t, a, pop01(t, T.table4 + 0.25, 0.4))
    // the two honest bubbles drift together and touch at the kiss beat
    const meet = ease.inOutCubic(prog(t, T.mean[1] + 0.1, T.kiss))
    const SAYS = [{ txt: 'I like you.', side: -1, x0: 330, y0: 1000, x1: 400, y1: 860, fillC: '#fff1cf', rim: GOLD },
      { txt: 'I like you too.', side: 1, x0: 740, y0: 870, x1: 680, y1: 1010, fillC: '#ffe3ee', rim: PINK }]
    SAYS.forEach((S, i) => {
      const k = pop01(t, T.mean[i], 0.4, 2.4)
      if (k <= 0) return
      const bx = lerp(S.x0, S.x1, meet), by = lerp(S.y0, S.y1, meet)
      x.save(); x.translate(bx, by + 5 * Math.sin(t * 3 + i)); x.rotate((S.side * 3 * (1 - meet) + wob(t, T.mean[i], 5)) * D2R); x.scale(k, k); x.globalAlpha = a * clamp(k * 3)
      speech(x, S.txt, { side: S.side, size: 58, fillC: S.fillC, rim: S.rim })
      x.restore()
    })
    const cx = 540, cy = 935
    const fk = prog(t, T.kiss, T.kiss + 0.5)
    if (fk > 0 && fk < 1) {
      x.save(); x.globalCompositeOperation = 'lighter'
      const g = x.createRadialGradient(cx, cy, 0, cx, cy, 300 * ease.outCubic(fk))
      g.addColorStop(0, rgba(GOLD, 0.6 * (1 - fk))); g.addColorStop(1, rgba(GOLD, 0))
      x.fillStyle = g; x.beginPath(); x.arc(cx, cy, 300, 0, TAU); x.fill(); x.restore()
    }
    sparkle(x, cx, cy, t, T.kiss, { n: 18, R: 380, seed: 70, size: 32, dur: 0.9 })
    const hk = pop01(t, T.kiss + 0.12, 0.5, 2.2)
    if (hk > 0) {
      const hy = cy - 230 - 70 * ease.outCubic(prog(t, T.kiss, T.kiss + 1.4)), pulse = 1 + 0.06 * Math.sin((t - T.kiss) * 8)
      x.save(); x.globalAlpha = a
      for (let i = 0; i < 22; i++) {
        const th = Math.PI + (i / 22) * TAU
        const hx = 16 * Math.pow(Math.sin(th), 3), hyy = -(13 * Math.cos(th) - 5 * Math.cos(2 * th) - 2 * Math.cos(3 * th) - Math.cos(4 * th))
        drawPixelStar(x, cx + hx * 8 * hk * pulse, hy + hyy * 8 * hk * pulse, i % 4 ? 20 : 28, i % 3, i % 2 ? GOLD : PINK)
      }
      x.restore()
    }
    x.restore()
  }

  return {
    start: 0, end: END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      drawSky(x, t, t < 3 ? { ...SKY_H, zoom: lerp(1.6, SKY_H.zoom, ss), dy: lerp(-30, 0, ss) } : SKY_H)
      if (t < T.table4Out[1]) { drawDate(t); drawDeal(t); drawWheels(t); drawEnd(t) }
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [e, t0, o] of EYES) {
        const p = ease.outCubic(prog(t, t0, t0 + 0.35))
        e.style.opacity = String(p * outK(t, o)); e.style.transform = `translateY(${((1 - p) * 16).toFixed(2)}px)`
      }
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

export const SCENES = [build]

// ── sound (pitched SFX are written in the films' D-major palette; the engine moves them into the film's key)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  // hook: the polite pile
  ...wordPops(T.h0, 7, 0.07, 0, 0.026), ['pop', T.table + 0.05, 587.33, 0.05, -0.4], ['pop', T.table + 0.15, 659.25, 0.05, 0.4],
  ['whoosh', T.table, 0.5, 0.03],
  ['pop', T.h0Late, 1318.51, 0.055, 0], ['pluck', T.h0Late, 1174.66, 0.05, 0.6, 0],
  ...T.bubs.flatMap((tb, i) => [['tick', tb, 0.06], ['pop', tb, NOTE[(i * 2) % 7] * (i % 2 ? 1 : 0.75), i === 8 ? 0.06 : 0.045, PILE[i][1] * 0.35]]),
  ['riser', T.bubs[5], T.burst, 0.03],
  ...[0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => ['pop', +(T.burst + i * 0.025).toFixed(3), NOTE[(8 - i) % 7] * 1.5, 0.03, (i % 2 ? 0.3 : -0.3)]),
  ['boom', T.burst, 0.12], ['glitter', T.burst, T.burst + 0.6],
  // thinking it / not saying it
  ...wordPops(T.h1, 1, 0.08, 1, 0.03), ['pop', T.h1Late, 1174.66, 0.05, 0], ['pluck', T.h1Late, 987.77, 0.045, 0.5, 0],
  ...T.think.flatMap((tt, i) => [['whoosh', tt - 0.1, 0.3, 0.03], ['pop', tt, [880, 987.77][i], 0.05, i ? 0.35 : -0.35], ['glitter', tt + 0.1, tt + 0.5]]),
  ...wordPops(T.h1b, 1, 0.08, 2, 0.03), ['whoosh', T.h1bLate, 0.34, 0.035], ['boom', T.h1bLate + 0.34, 0.08], ['tick', T.h1bLate + 0.34, 0.07],
  ...T.said.map((ts, i) => ['pluck', ts, [659.25, 587.33][i], 0.045, 0.3, i ? 0.3 : -0.3]),
  ['whoosh', T.sink, 0.35, 0.03], ...[0, 1].map(i => ['pluck', +(T.sink + 0.25 + i * 0.1).toFixed(3), [440, 392][i], 0.045, 0.4, i ? 0.3 : -0.3]),
  // dealbreakers
  ...wordPops(T.h2, 3, 0.08, 2), ['pop', T.h2Late, 1318.51, 0.05, 0], ['pluck', T.h2Late, 987.77, 0.045, 0.6, 0],
  ['pop', T.card, 880, 0.055, -0.2], ['whoosh', T.card - 0.1, 0.4, 0.035], ['glitter', T.card + 0.2, T.card + 0.7],
  ...T.chips.flatMap((tc, i) => [['whoosh', tc - 0.2, 0.2, 0.035], ['tick', tc, 0.08], ['pop', tc, [739.99, 880, 1174.66][i], 0.05, 0], i === 2 ? ['boom', tc, 0.14] : ['pluck', tc + 0.02, 587.33, 0.035, 0.4, 0]]),
  ['bell', T.chips[2] + 0.04, 587.33, 0.04, 1.0, 0],
  ...wordPops(T.s2, 2, 0.07, 1, 0.022), ['pop', T.s2 + 0.3, 1318.51, 0.05, 0], ['pluck', T.s2 + 0.3, 1174.66, 0.04, 0.5, 0],
  // push / pull / align
  ...wordPops(T.h3, 4, 0.06, 0, 0.022), ['pop', T.h3Late, 1318.51, 0.05, 0], ['pluck', T.h3Late + 0.12, 1174.66, 0.045, 0.6, 0],
  ['whoosh', T.wA[0], 0.6, 0.04], ['whoosh', T.wB[0], 0.6, 0.035], ['bell', T.lock, 880, 0.05, 1.2, 0], ['glitter', T.lock, T.lock + 0.6],
  ...[0, 1, 2].map(i => ['pop', +(T.dots + i * 0.08).toFixed(3), NOTE[3 + i], 0.035, (i - 1) * 0.4]),
  ...T.lines.map((tl, i) => ['pluck', tl, [739.99, 880, 1174.66][i], 0.05, 0.5, (i - 1) * 0.4]),
  ['bell', T.lines[2] + 0.36, 1174.66, 0.04, 1.2, 0],
  // say what you mean
  ...wordPops(T.h4, 3, 0.08, 2, 0.03), ['pop', T.h4Late, 1318.51, 0.055, 0], ['pluck', T.h4Late, 1174.66, 0.05, 0.7, 0],
  ['whoosh', T.table4, 0.5, 0.03],
  ...T.mean.map((tm, i) => ['pop', tm, [880, 1174.66][i], 0.05, i ? 0.35 : -0.35]),
  ['riser', T.mean[1], T.kiss, 0.03],
  ['bell', T.kiss, 1760, 0.06, 1.4, -0.1], ['bell', T.kiss + 0.03, 2349.32, 0.04, 1.4, 0.1], ['glitter', T.kiss, T.kiss + 0.8],
]
