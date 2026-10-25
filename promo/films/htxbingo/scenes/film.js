// htxbingo (30 s vertical Align ad) · story 0–25.6, then the shared END CARD ("come" + the Align logo).
// Beats on the 108 bpm grid (beat n at 0.6 + n·0.5556). One canvas, DOM type above it, grain on top. Pure f(t).
//   0.00–10.50  HOOK  "Houston | first-date *bingo.*" — a 3×3 bingo card springs in; FREE SPACE, then eight squares get
//               daubed on the beat (Blames I-45, "So what do you do?", Phone on table, Talks about the heat, Mentions an ex,
//               Late again, "idk lol", Small talk). Win lines strike, "BINGO!" slams (7.54), then "…*again.*" — older,
//               fully daubed cards slide out from behind it.
//  10.90–13.00  "Align skips | the *bingo.*" — the squares fly off the card one by one and burst into stars.
//  13.30–16.20  "Talk cards, | not *small talk.*" — the "Small talk" square flips over into a real talk card (card-talk-1).
//  16.50–19.50  "Dealbreakers | come *first.*" — three red chips stamp onto a DEALBREAKERS card (the bingo squares, up front).
//  19.80–22.30  "Chart *first.* | Face last." — a veiled mystery card (card-profile-3) floats in on its aura, a wheel behind.
//  22.60–25.30  "Get a *real* | first date." — one gold square, two pictograms; a heart dauber stamps it.
//  25.30–25.60  plain sky (SKY_H + grain GRAIN_H) for the end card hand-off at 25.6.
import { clamp, lerp, prog, ease, el, rng } from '../../../src/lib.js'
import { fill, A } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, TYPE, easeOutBack, drawWheelH } from '../../wheel.js'

const W = 1080
const BONE = '#efe6d6', GOLD = '#f2c75c', PINK = '#ff8fb1', RED = '#ff3d3d', INK = '#1a1430', DULL = '#b9b3d6'
const CYAN = '#8fd8f6', LILAC = '#c9a6ff', ORANGE = '#ffa45c', MINT = '#7fe0b8'
const SHADOW = '0 4px 30px rgba(6,4,18,0.9), 0 0 4px rgba(6,4,18,0.6)'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', monospace"
const SERIF = "'EB Garamond', Georgia, serif"
const D2R = Math.PI / 180, TAU = Math.PI * 2
const BEAT = n => +(0.6 + n * 0.5556).toFixed(3)

export const END = 25.6
export const T = {
  // hook
  h0: 0.1, h0Late: BEAT(1), card: 0.3, free: BEAT(3), stamps: [4, 5, 6, 7, 8, 9, 10, 11].map(BEAT),
  strikes: [BEAT(11.75), BEAT(12), BEAT(12.25)], bingo: BEAT(12.5), again: BEAT(15), stack: BEAT(15.5), h0Out: 10.45,
  // align skips the bingo
  h1: 10.7, h1Late: BEAT(19), fly: BEAT(19.5), h1Out: 12.95,
  // talk cards
  h2: 13.3, h2Late: BEAT(23.5), tile2: 13.2, flip: BEAT(24.5), h2Out: 16.2,
  // dealbreakers
  h3: 16.5, h3Late: BEAT(29), dcard: 16.6, chips: [BEAT(30), BEAT(31), BEAT(32)], h3Out: 19.5,
  // chart first
  h4: 19.8, h4Late: BEAT(34.5), mcard: 19.9, h4Out: 22.3,
  // end line
  h5: 22.6, h5Real: BEAT(40), tile5: 22.65, heart: BEAT(41.5), h5Out: 25.05,
}

const h2r = h => { const n = parseInt(h.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255] }
const rgba = (hex, a) => { const [r, g, b] = h2r(hex); return `rgba(${r},${g},${b},${clamp(a)})` }
const pop01 = (t, t0, d = 0.36, s = 2.0) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, a, d = 0.22) => 1 - ease.inQuad(prog(t, a, a + d))
const thud = (t, t0, f = 30, k = 9) => t > t0 ? Math.sin((t - t0) * f) * Math.exp(-(t - t0) * k) : 0

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
function glow(x, px, py, R, col, a) {
  if (a <= 0) return
  x.save(); x.globalCompositeOperation = 'lighter'
  const g = x.createRadialGradient(px, py, 0, px, py, R)
  g.addColorStop(0, rgba(col, 0.42 * a)); g.addColorStop(0.45, rgba(col, 0.14 * a)); g.addColorStop(1, rgba(col, 0))
  x.fillStyle = g; x.beginPath(); x.arc(px, py, R, 0, TAU); x.fill(); x.restore()
}

/** springy word-by-word type. `*word*` = accent (Garamond italic, colour), `|` = line break.
 *  The last `late` words pop at lateAt (big, optional wobble / heavy drop). `times` overrides per-word times; `big` lists big words. */
function popText(parent, text, { top, size, weight = 800, accentColor = GOLD, accentSize, gap = 0.07, at: t0, late = 0, lateAt = null, lateGap = 0.1, wobble = false, drop = false, times = null, big: bigSet = null, colors = {}, lineHeight = 1.02 }) {
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
    const big = (late > 0 && n >= nW - late) || (bigSet && bigSet.includes(n))
    const wt = times ? times[n] : (late > 0 && n >= nW - late) ? lateAt + (n - (nW - late)) * lateGap : t0 + n * gap
    ws.push({ t: wt, big, e: el('span', style, box, w.replace(/\*/g, '')) })
    n++
  })
  const first = Math.min(...ws.map(w => w.t))
  return {
    update(t, out = 1) {
      box.style.display = out <= 0 || t < first ? 'none' : 'block'
      if (box.style.display === 'none') return
      for (const w of ws) {
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

// ───────────────────────── the bingo card
const CARD = { x: 91, y: 652, w: 898, head: 92, pad: 25, tile: 272, gap: 16 }
CARD.h = CARD.head + CARD.tile * 3 + CARD.gap * 2 + CARD.pad
CARD.cx = CARD.x + CARD.w / 2; CARD.cy = CARD.y + CARD.h / 2
const tileC = i => ({ x: CARD.x + CARD.pad + CARD.tile / 2 + (i % 3) * (CARD.tile + CARD.gap), y: CARD.y + CARD.head + CARD.tile / 2 + Math.floor(i / 3) * (CARD.tile + CARD.gap) })
const SQUARES = [
  { lines: ['Blames', 'I-45'], icon: 'shield' },
  { lines: ['“So what', 'do you do?”'], icon: 'ask' },
  { lines: ['Phone', 'on table'], icon: 'phone' },
  { lines: ['Talks about', 'the heat'], icon: 'sun' },
  { lines: ['FREE', 'SPACE'], icon: 'star' },
  { lines: ['Mentions', 'an ex'], icon: 'broken' },
  { lines: ['Late', 'again'], icon: 'clock' },
  { lines: ['“idk lol”'], icon: 'dots' },
  { lines: ['Small', 'talk'], icon: 'chat' },
]
const ORDER = [0, 5, 7, 2, 3, 8, 1, 6]                  // stamp order (index into SQUARES); FREE SPACE (4) goes first
const DAUB = [PINK, CYAN, GOLD, LILAC, ORANGE, MINT, PINK, CYAN]
const stampAt = i => i === 4 ? T.free : T.stamps[ORDER.indexOf(i)]
const daubCol = i => i === 4 ? GOLD : DAUB[ORDER.indexOf(i)]

function icon(x, kind, col, t) {
  x.save()
  switch (kind) {
    case 'shield': {   // a plain, generic freeway shield
      x.beginPath(); x.moveTo(-44, -40); x.quadraticCurveTo(0, -54, 44, -40); x.quadraticCurveTo(52, 10, 0, 46); x.quadraticCurveTo(-52, 10, -44, -40); x.closePath()
      ink(x, col, { w: 6, fa: 0.25, glow: 10 })
      x.fillStyle = col; x.font = `900 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('45', 0, 0); break
    }
    case 'ask': {
      x.beginPath(); x.roundRect(-50, -40, 100, 66, 22); x.moveTo(-20, 26); x.lineTo(-34, 46); x.lineTo(0, 26)
      ink(x, col, { w: 6, fa: 0.2, glow: 10 })
      x.fillStyle = col; x.font = `900 44px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('?', 0, -6); break
    }
    case 'phone': {
      x.rotate(-12 * D2R); x.beginPath(); x.roundRect(-26, -46, 52, 92, 12); ink(x, col, { w: 6, fa: 0.2, glow: 10 })
      x.beginPath(); x.roundRect(-16, -34, 32, 58, 4); x.fillStyle = rgba(col, 0.5); x.fill()
      const buzz = Math.sin(t * 40) * (Math.sin(t * 3) > 0.4 ? 1 : 0)
      x.beginPath(); x.moveTo(36 + buzz * 3, -20); x.lineTo(44, -10); x.moveTo(-36 - buzz * 3, 20); x.lineTo(-44, 10); ink(x, col, { w: 5, fa: 0, glow: 8 }); break
    }
    case 'sun': {
      x.rotate(t * 0.8)
      x.beginPath(); x.arc(0, 0, 22, 0, TAU); ink(x, col, { w: 6, fa: 0.4, glow: 12 })
      x.beginPath(); for (let i = 0; i < 8; i++) { const a = i * TAU / 8; x.moveTo(Math.cos(a) * 32, Math.sin(a) * 32); x.lineTo(Math.cos(a) * 46, Math.sin(a) * 46) }
      ink(x, col, { w: 6, fa: 0, glow: 10 }); break
    }
    case 'star': {
      x.beginPath(); for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? 20 : 46; x.lineTo(Math.cos(a) * rr, Math.sin(a) * rr) } x.closePath()
      ink(x, col, { w: 6, fa: 0.4, glow: 14 }); break
    }
    case 'broken': {
      const heart = (sd) => { x.beginPath(); x.moveTo(0, -24); x.bezierCurveTo(sd * 14, -46, sd * 52, -40, sd * 46, -6); x.bezierCurveTo(sd * 40, 16, sd * 12, 30, 0, 44); x.lineTo(sd * 8, 18); x.lineTo(sd * -6, 2); x.lineTo(sd * 6, -12); x.closePath() }
      x.save(); x.translate(-5, 2); x.rotate(-8 * D2R); heart(-1); ink(x, col, { w: 5, fa: 0.3, glow: 10 }); x.restore()
      x.save(); x.translate(5, -2); x.rotate(8 * D2R); heart(1); ink(x, col, { w: 5, fa: 0.3, glow: 10 }); x.restore(); break
    }
    case 'clock': {
      x.beginPath(); x.arc(0, 0, 42, 0, TAU); ink(x, col, { w: 6, fa: 0.15, glow: 10 })
      const a1 = t * 6, a2 = t * 0.5
      x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.sin(a1) * 30, -Math.cos(a1) * 30); x.moveTo(0, 0); x.lineTo(Math.sin(a2) * 20, -Math.cos(a2) * 20); ink(x, col, { w: 6, fa: 0, glow: 8 }); break
    }
    case 'dots': {
      x.beginPath(); x.roundRect(-52, -34, 104, 62, 30); x.moveTo(24, 28); x.lineTo(40, 46); x.lineTo(4, 28); ink(x, col, { w: 6, fa: 0.2, glow: 10 })
      x.fillStyle = col; for (let i = 0; i < 3; i++) { x.beginPath(); x.arc(-24 + i * 24, -3 - 5 * Math.max(0, Math.sin(t * 7 - i * 0.9)), 7, 0, TAU); x.fill() } break
    }
    case 'chat': {
      x.beginPath(); x.roundRect(-52, -42, 70, 44, 16); ink(x, col, { w: 5, fa: 0.2, glow: 8 })
      x.beginPath(); x.roundRect(-14, -2, 68, 42, 16); ink(x, col, { w: 5, fa: 0.2, glow: 8 })
      x.fillStyle = col; x.font = `700 20px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('…', -17, -24); x.fillText('…', 20, 16); break
    }
  }
  x.restore()
}

/** one square, centred at (0,0). d = dauber progress (0 none, then slam), col = dauber colour */
function square(x, i, t, { d = -1, col = PINK, dim = 1 } = {}) {
  const S = SQUARES[i], s = CARD.tile
  const free = i === 4
  x.beginPath(); x.roundRect(-s / 2, -s / 2, s, s, 30)
  x.fillStyle = free ? 'rgba(52,36,22,0.95)' : 'rgba(26,18,52,0.95)'; x.fill()
  ink(x, free ? GOLD : rgba(BONE, 0.8), { w: 4, fa: 0, glow: free ? 14 : 6 })
  // the dauber blot, under the text
  if (d >= 0) {
    const sp = clamp(d / 0.16)                                      // drop in
    const sc = lerp(1.9, 1, ease.inCubic(sp)) * (1 + 0.12 * thud(d, 0.16, 30, 9))
    x.save(); x.scale(sc, sc * (1 - 0.1 * thud(d, 0.16, 30, 9))); x.globalAlpha *= clamp(sp * 2.5) * dim
    const r = rng(7 + i * 13)
    x.beginPath()
    for (let k = 0; k <= 28; k++) { const a = k / 28 * TAU, rr = 112 + 6 * Math.sin(a * 5 + i) + 4 * r(); x.lineTo(Math.cos(a) * rr, Math.sin(a) * rr) }
    x.closePath(); x.fillStyle = rgba(col, 0.62); x.shadowColor = col; x.shadowBlur = 30; x.fill(); x.shadowBlur = 0
    x.lineWidth = 5; x.strokeStyle = rgba('#ffffff', 0.35); x.stroke()
    // splats
    for (let k = 0; k < 5; k++) { const a = r() * TAU, rr = 124 + r() * 14; x.beginPath(); x.arc(Math.cos(a) * rr, Math.sin(a) * rr, 6 + r() * 8, 0, TAU); x.fillStyle = rgba(col, 0.75); x.fill() }
    x.restore()
  }
  const stamped = d >= 0.12
  x.save(); x.translate(0, -58)
  icon(x, S.icon, stamped ? '#fff7ea' : free ? GOLD : col, t)
  x.restore()
  x.fillStyle = stamped ? '#ffffff' : free ? GOLD : BONE; x.textAlign = 'center'; x.textBaseline = 'middle'
  let fs = free ? 50 : 42
  x.font = `${free ? 900 : 800} ${fs}px ${INTER}`
  const mw = Math.max(...S.lines.map(l => x.measureText(l).width))
  if (mw > s - 30) { fs = Math.floor(fs * (s - 30) / mw); x.font = `${free ? 900 : 800} ${fs}px ${INTER}` }
  if (stamped) { x.shadowColor = 'rgba(10,4,30,0.85)'; x.shadowBlur = 10 }
  const y0 = S.lines.length > 1 ? 52 : 70
  S.lines.forEach((l, k) => x.fillText(l, 0, y0 + k * fs * 1.08))
  x.shadowBlur = 0
}

/** the card frame + header (no squares) */
function cardFrame(x, a = 1) {
  const { x: X, y: Y, w, h } = CARD
  x.save(); x.globalAlpha *= a
  x.shadowColor = 'rgba(0,0,0,0.55)'; x.shadowBlur = 44; x.shadowOffsetY = 18
  x.fillStyle = 'rgba(16,10,36,0.96)'; x.beginPath(); x.roundRect(X, Y, w, h, 40); x.fill()
  x.shadowOffsetY = 0; x.shadowBlur = 0
  x.beginPath(); x.roundRect(X, Y, w, h, 40); ink(x, PINK, { w: 9, fa: 0, glow: 26 })
  // header
  x.fillStyle = PINK; x.font = `900 60px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  const L = ['B', 'I', 'N', 'G', 'O']
  L.forEach((c, i) => x.fillText(c, CARD.cx + (i - 2) * 118, Y + CARD.head / 2 + 6))
  ;[-1, 1].forEach(sd => drawPixelStar(x, CARD.cx + sd * 380, Y + CARD.head / 2 + 4, 30, 1, GOLD))
  x.restore()
}

const STRIKES = [[0, 8], [2, 6], [3, 5], [1, 7]]   // win lines (both diagonals, the middle row, the middle column)

export async function build(stage) {
  try {
    await Promise.all(["800 108px Inter", "900 80px Inter", "700 62px Inter", "italic 500 118px 'EB Garamond'", "bold 58px 'EB Garamond'", "700 34px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const load = (f, w) => new Promise(res => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = A + f })
    .then(im => { if (!im) return null; const c = document.createElement('canvas'); c.width = w; c.height = Math.round(w * im.height / im.width); const cx = c.getContext('2d'); cx.imageSmoothingQuality = 'high'; cx.drawImage(im, 0, 0, c.width, c.height); return c })
  const [talkImg, mystImg] = await Promise.all([load('card-talk-1.png', 640), load('card-profile-3.png', 600)])

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const eyebrow = (txt, color = GOLD) => el('div', { position: 'absolute', left: 0, width: W + 'px', top: (TYPE.eyebrowY - 28) + 'px', textAlign: 'center', font: TYPE.eyebrow,
    letterSpacing: '0.25em', color, textShadow: SHADOW, opacity: 0 }, root, txt)
  const EYES = [[eyebrow('ON ALIGN'), T.h2 - 0.1, T.h4Out]]
  const H0 = popText(root, 'Houston | first-date | *bingo.*', { top: 165, size: 120, accentSize: 172, at: T.h0, gap: 0.08, late: 1, lateAt: T.h0Late, wobble: true, accentColor: PINK, lineHeight: 1.0 })
  const S0 = popText(root, '…*again.*', { top: 1672, size: 104, accentSize: 140, at: T.again, late: 1, lateAt: T.again, drop: true, accentColor: PINK })
  const H1 = popText(root, 'Align skips | the *bingo.*', { top: 215, size: 132, accentSize: 172, at: T.h1, gap: 0.08, late: 1, lateAt: T.h1Late, wobble: true, accentColor: GOLD, lineHeight: 1.0 })
  const H2 = popText(root, 'Talk cards, | not *small* *talk.*', { top: 225, size: 116, accentSize: 150, at: T.h2, gap: 0.08, late: 2, lateAt: T.h2Late, lateGap: 0.12, wobble: true, accentColor: CYAN, lineHeight: 1.0 })
  const H3 = popText(root, 'Dealbreakers | come *first.*', { top: 225, size: 124, accentSize: 156, at: T.h3, gap: 0.08, late: 1, lateAt: T.h3Late, wobble: true, accentColor: GOLD })
  const H4 = popText(root, 'Card *first.* | Face last.', { top: 225, size: 130, accentSize: 164, times: [T.h4, T.h4 + 0.12, T.h4Late, T.h4Late + 0.12], big: [1], wobble: true, accentColor: GOLD })
  const H5 = popText(root, 'Get a *real* | first date.', { top: 215, size: 136, accentSize: 184, times: [T.h5, T.h5 + 0.08, T.h5Real, T.h5Real + 0.3, T.h5Real + 0.38], big: [2], wobble: true, accentColor: GOLD, lineHeight: 1.0 })
  const HEADS = [[H0, T.h0Out], [S0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out], [H4, T.h4Out], [H5, T.h5Out]]

  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  // ── 1 · the bingo card (hook) and its squares flying off (act 2)
  function drawBingo(t) {
    if (t > T.h1Out + 0.3) return
    const ck = pop01(t, T.card, 0.5, 1.7)
    const bang = thud(t, T.bingo, 26, 6)
    const sag = ease.inOutCubic(prog(t, T.again, T.again + 0.5))
    const fo = ease.inCubic(prog(t, T.fly + 0.85, T.fly + 1.3))          // the empty frame shrinks away
    // the thuds of each daub
    const thumps = [T.free, ...T.stamps].reduce((s, ts) => s + thud(t, ts, 28, 10), 0)
    // older cards slide out from behind ("…again.")
    const stk = [[-1, -9, -150, 40], [1, 8, 150, 20], [-1, -3, -40, -60]]
    stk.forEach(([sd, rot, dx, dy], k) => {
      const p = easeOutBack(prog(t, T.stack + k * 0.12, T.stack + k * 0.12 + 0.45), 1.5)
      if (p <= 0) return
      const a = (1 - ease.inCubic(prog(t, T.h0Out - 0.2, T.h0Out + 0.2)))
      if (a <= 0) return
      x.save(); x.globalAlpha = 0.55 * a
      x.translate(CARD.cx + dx * p, CARD.cy + 40 + dy * p); x.rotate(rot * p * D2R); x.scale(0.84, 0.84); x.translate(-CARD.cx, -CARD.cy)
      cardFrame(x)
      for (let i = 0; i < 9; i++) { const c = tileC(i); x.save(); x.translate(c.x, c.y); square(x, i, t, { d: 1, col: DAUB[(i + k * 3) % 8] }); x.restore() }
      x.restore()
    })
    x.save()
    const sc = ck * (1 - 0.08 * sag) * (1 - 0.6 * fo) * (1 + 0.04 * bang)
    x.translate(CARD.cx, CARD.cy + 8 * thumps + 30 * sag + 6 * Math.sin(t * 1.8))
    x.rotate((-1.5 + 1.0 * Math.sin(t * 1.3) + 4 * sag + 2 * bang) * D2R)
    x.scale(sc * (1 - 0.015 * thumps), sc * (1 + 0.015 * thumps))
    x.translate(-CARD.cx, -CARD.cy)
    x.globalAlpha = clamp(ck * 3) * (1 - fo)
    cardFrame(x)
    for (let i = 0; i < 9; i++) {
      const c = tileC(i)
      const tk = pop01(t, T.card + 0.18 + ((i % 3) + Math.floor(i / 3)) * 0.05, 0.36, 2.2)
      // act 2: the square pops off and flies
      const tf = T.fly + [4, 0, 6, 2, 8, 7, 3, 5, 1][i] * 0.09
      const fp = prog(t, tf, tf + 0.55)
      if (fp >= 1) continue
      const r = rng(90 + i)
      const vx = (c.x - CARD.cx) * 2.2 + (r() - 0.5) * 300, vy = -500 - r() * 500
      const fx = c.x + vx * fp, fy = c.y + vy * fp + 1900 * fp * fp
      const pre = t < tf ? 1 + 0.1 * Math.max(0, Math.sin(Math.PI * prog(t, tf - 0.12, tf))) : 1
      x.save(); x.translate(fx, fy); x.rotate((r() - 0.5) * 3 * fp); x.scale(tk * pre * (1 - 0.4 * fp), tk * pre * (1 - 0.4 * fp))
      x.globalAlpha *= clamp(tk * 3) * (1 - ease.inQuad(fp))
      const ts = stampAt(i)
      square(x, i, t, { d: t >= ts - 0.16 ? t - (ts - 0.16) : -1, col: daubCol(i) })
      x.restore()
    }
    // win lines strike through, then BINGO!
    STRIKES.forEach(([a0, b0], k) => {
      const ts = k < 3 ? T.strikes[k] : T.strikes[2]
      const p = ease.outCubic(prog(t, ts, ts + 0.2))
      if (p <= 0 || t > T.fly) return
      const A_ = tileC(a0), B_ = tileC(b0)
      const ex = (B_.x - A_.x) * 0.12, ey = (B_.y - A_.y) * 0.12
      x.save(); x.globalAlpha *= 0.9 * (1 - 0.5 * sag)
      x.beginPath(); x.moveTo(A_.x - ex, A_.y - ey); x.lineTo(lerp(A_.x - ex, B_.x + ex, p), lerp(A_.y - ey, B_.y + ey, p))
      ink(x, GOLD, { w: 18, fa: 0, glow: 30 }); x.restore()
    })
    x.restore()
    // sparkles on each daub
    ;[T.free, ...T.stamps].forEach((ts, k) => {
      const i = k === 0 ? 4 : ORDER[k - 1], c = tileC(i)
      sparkle(x, c.x, c.y, t, ts, { n: 9, R: 190, seed: 10 + k, size: 24, cols: [daubCol(i), '#fff3e0', GOLD] })
    })
    // BINGO!
    if (t >= T.bingo - 0.16 && t < T.h0Out + 0.3) {
      const sp = prog(t, T.bingo - 0.16, T.bingo)
      const s2 = lerp(3, 1, ease.inCubic(sp)) * (1 + 0.1 * thud(t, T.bingo, 30, 8)) * (1 - 0.12 * sag)
      const a = clamp(sp * 2.5) * outK(t, T.h0Out, 0.3)
      x.save(); x.translate(540, CARD.cy + 40 * sag); x.rotate((-9 + 6 * sag) * D2R); x.scale(s2, s2); x.globalAlpha = a
      x.font = `900 236px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
      x.lineJoin = 'round'; x.lineWidth = 46; x.strokeStyle = '#1a0b2e'; x.strokeText('BINGO!', 0, 10)
      x.shadowColor = PINK; x.shadowBlur = 40; x.lineWidth = 16; x.strokeStyle = PINK; x.strokeText('BINGO!', 0, 10); x.shadowBlur = 0
      const g = x.createLinearGradient(0, -100, 0, 110); g.addColorStop(0, '#fff1b8'); g.addColorStop(1, GOLD)
      x.fillStyle = g; x.fillText('BINGO!', 0, 10)
      x.restore()
      sparkle(x, 540, CARD.cy, t, T.bingo, { n: 26, R: 560, seed: 3, size: 36, dur: 1.0 })
      sparkle(x, 540, CARD.cy, t, T.bingo + 0.12, { n: 16, R: 330, seed: 4, size: 28, dur: 0.9 })
    }
    // act 2: every flying square bursts into stars
    for (let i = 0; i < 9; i++) {
      const tf = T.fly + [4, 0, 6, 2, 8, 7, 3, 5, 1][i] * 0.09, c = tileC(i)
      sparkle(x, c.x, c.y, t, tf, { n: 8, R: 200, seed: 50 + i, size: 24 })
    }
  }

  // ── 2 · "Small talk" flips into a real talk card
  function drawTalk(t) {
    if (t < T.tile2 || t > T.h2Out + 0.4) return
    const o = ease.inCubic(prog(t, T.h2Out - 0.1, T.h2Out + 0.35))
    const cx = 540, cy = 1130 + 10 * Math.sin((t - T.tile2) * 2) + 140 * o
    const tk = pop01(t, T.tile2, 0.45, 1.8)
    const fp = prog(t, T.flip - 0.3, T.flip)                  // flip: tile closes, card opens
    const ang = fp < 1 ? Math.PI * ease.inOutCubic(fp) : Math.PI
    const sx = Math.abs(Math.cos(ang)) * (1 + 0.08 * thud(t, T.flip, 24, 8))
    glow(x, cx, cy, 620, fp >= 0.5 ? CYAN : DULL, (fp >= 0.5 ? 1 : 0.4) * (1 - o))
    x.save(); x.translate(cx, cy); x.rotate((-2 + 1.5 * Math.sin((t - T.tile2) * 1.4)) * D2R); x.globalAlpha = (1 - o)
    if (ang < Math.PI / 2) {
      x.scale(1.9 * tk * sx, 1.9 * tk); square(x, 8, t, { col: DULL })
      // a little yawn: zzz rising off the small talk
      const zz = prog(t, T.tile2 + 0.3, T.flip - 0.3)
      if (zz > 0) { x.fillStyle = DULL; x.font = `800 34px ${INTER}`; x.textAlign = 'center'; for (let k = 0; k < 3; k++) { const u = (zz * 1.6 + k / 3) % 1; x.globalAlpha = (1 - o) * Math.sin(Math.PI * u); x.fillText('z', 100 + 30 * u + k * 6, -100 - 90 * u) } }
    } else if (talkImg) {
      const s = 1.06 * (1 - 0.15 * o)
      x.scale(s * sx, s)
      x.drawImage(talkImg, -talkImg.width / 2, -talkImg.height / 2)
    }
    x.restore()
    sparkle(x, cx, cy, t, T.flip, { n: 18, R: 470, seed: 21, size: 30, cols: [CYAN, GOLD, '#fff3e0', LILAC] })
  }

  // ── 3 · dealbreakers come first
  const DC = { w: 860, h: 720, cx: 540, cy: 1120 }
  const CHIP_Y = [-50, 80, 210]
  const CHIPS = ['ALWAYS LATE', 'ONE-WORD TEXTS', 'PHONE ON THE TABLE']
  function dealCard() {
    const { w, h } = DC
    x.shadowColor = 'rgba(0,0,0,0.55)'; x.shadowBlur = 40; x.shadowOffsetY = 16
    x.fillStyle = 'rgba(18,12,40,0.95)'; x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, 40); x.fill()
    x.shadowOffsetY = 0; x.shadowBlur = 0
    x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, 40); ink(x, GOLD, { w: 9, fa: 0, glow: 26 })
    x.textAlign = 'center'; x.textBaseline = 'middle'
    x.fillStyle = GOLD; x.font = `700 36px ${MONO}`; x.fillText('DEALBREAKERS', 0, -h / 2 + 76)
    x.fillStyle = BONE; x.font = `italic 500 62px ${SERIF}`; x.fillText('What ends it before it starts?', 0, -h / 2 + 156)
    CHIP_Y.forEach(y => { x.save(); x.setLineDash([14, 12]); x.strokeStyle = rgba(BONE, 0.32); x.lineWidth = 4; x.beginPath(); x.roundRect(-350, y - 46, 700, 92, 46); x.stroke(); x.restore() })
  }
  function chip(label, hot) {
    const cw = 710, ch = 96
    x.beginPath(); x.roundRect(-cw / 2, -ch / 2, cw, ch, 48); x.fillStyle = 'rgba(58,10,22,0.96)'; x.fill()
    ink(x, RED, { w: 7, fa: 0, glow: 18 + 30 * hot })
    x.save(); x.translate(-cw / 2 + 58, 0); x.beginPath(); x.moveTo(-16, -16); x.lineTo(16, 16); x.moveTo(16, -16); x.lineTo(-16, 16); ink(x, '#ff5a52', { w: 9, fa: 0, glow: 12 }); x.restore()
    let fs = 50; x.font = `900 ${fs}px ${INTER}`
    const mw = x.measureText(label).width, room = cw - 150
    if (mw > room) { fs = Math.floor(fs * room / mw); x.font = `900 ${fs}px ${INTER}` }
    x.fillStyle = '#ffe2dc'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(label, 28, 3)
  }
  function drawDeal(t) {
    if (t < T.dcard - 0.05 || t > T.h3Out + 0.45) return
    const o = ease.inCubic(prog(t, T.h3Out - 0.1, T.h3Out + 0.35))
    const ck = pop01(t, T.dcard, 0.5, 1.8)
    const thumps = T.chips.reduce((s, tc) => s + thud(t, tc, 26, 8), 0)
    x.save()
    x.translate(DC.cx, DC.cy + 10 * Math.sin((t - T.dcard) * 2) + 10 * thumps + 160 * o)
    x.rotate((2 - 1.2 * Math.sin((t - T.dcard) * 1.6)) * D2R)
    x.scale(ck * (1 - 0.03 * thumps) * (1 - 0.2 * o), ck * (1 + 0.03 * thumps) * (1 - 0.2 * o))
    x.globalAlpha = clamp(ck * 3) * (1 - o)
    dealCard()
    T.chips.forEach((tc, i) => {
      if (t < tc - 0.18) return
      const sp = prog(t, tc - 0.18, tc)
      const sc = lerp(2.2, 1, ease.inCubic(sp)) * (1 + 0.07 * thud(t, tc, 30, 9))
      x.save(); x.translate(0, CHIP_Y[i]); x.rotate((i === 1 ? 1.5 : -1.5) * D2R); x.scale(sc, sc); x.globalAlpha *= clamp(sp * 3)
      chip(CHIPS[i], Math.exp(-Math.max(0, t - tc) * 3))
      x.restore()
    })
    x.restore()
    sparkle(x, DC.cx, DC.cy, t, T.dcard + 0.2, { n: 12, R: 480, seed: 60, size: 28 })
    T.chips.forEach((tc, i) => sparkle(x, DC.cx, DC.cy + CHIP_Y[i], t, tc, { n: 10, R: 400, seed: 61 + i, size: 24, cols: [RED, '#ff8a80', GOLD, '#fff3e0'] }))
  }

  // ── 4 · chart first, face last: the veiled mystery card on its aura, a wheel turning behind
  const WB = { cx: 0, cy: 0, rOut: 500, rIn: 410, rGlyph: 455, alpha: 0.9 }
  function drawMystery(t) {
    if (t < T.mcard - 0.05 || t > T.h4Out + 0.45) return
    const o = ease.inCubic(prog(t, T.h4Out - 0.1, T.h4Out + 0.35))
    const cy = 1130, ck = easeOutBack(prog(t, T.mcard, T.mcard + 0.6), 1.6)
    const wk = ease.outCubic(prog(t, T.mcard + 0.1, T.mcard + 0.8)) * (1 - o)
    x.save(); x.translate(540, cy); x.rotate(t * 0.18); x.scale(lerp(0.7, 1, wk), lerp(0.7, 1, wk)); drawWheelH(x, { W: WB, k: 0.55 * wk }); x.restore()
    glow(x, 540, cy, 640, LILAC, (0.8 + 0.2 * Math.sin(t * 3)) * clamp(ck) * (1 - o))
    glow(x, 540, cy - 120, 380, PINK, 0.6 * clamp(ck) * (1 - o))
    if (mystImg) {
      const s = 0.98 * ck * (1 - 0.15 * o)
      x.save(); x.translate(540, cy + 18 * Math.sin((t - T.mcard) * 1.7) - 300 * (1 - clamp(ck)) + 140 * o); x.rotate((3 * Math.sin((t - T.mcard) * 1.2) + 8 * (1 - clamp(ck))) * D2R); x.scale(s, s)
      x.globalAlpha = clamp(ck * 3) * (1 - o)
      x.drawImage(mystImg, -mystImg.width / 2, -mystImg.height / 2)
      x.restore()
    }
    sparkle(x, 540, cy, t, T.mcard + 0.4, { n: 18, R: 520, seed: 70, size: 30 })
    sparkle(x, 540, cy - 200, t, T.h4Late, { n: 12, R: 380, seed: 71, size: 26, cols: [GOLD, '#fff3e0', PINK] })
  }

  // ── 5 · get a real first date: one gold square, two pictograms, a heart dauber
  function person(px, py, col, s, a) {
    x.save(); x.globalAlpha *= a; x.translate(px, py); x.scale(s, s)
    x.beginPath(); x.moveTo(-74, 20); x.lineTo(-74, -80); x.quadraticCurveTo(-74, -136, -22, -140); x.lineTo(22, -140); x.quadraticCurveTo(74, -136, 74, -80); x.lineTo(74, 20); x.closePath()
    ink(x, col, { w: 8, fa: 0.3, glow: 18 })
    x.beginPath(); x.arc(0, -190, 38, 0, TAU); ink(x, col, { w: 8, fa: 0.4, glow: 20 })
    x.restore()
  }
  function heartPath(R) { x.beginPath(); for (let k = 0; k <= 40; k++) { const th = k / 40 * TAU; const hx = 16 * Math.pow(Math.sin(th), 3), hy = -(13 * Math.cos(th) - 5 * Math.cos(2 * th) - 2 * Math.cos(3 * th) - Math.cos(4 * th)); x.lineTo(hx * R / 16, hy * R / 16) } x.closePath() }
  function drawEnd(t) {
    if (t < T.tile5 || t > T.h5Out + 0.35) return
    const o = ease.inCubic(prog(t, T.h5Out - 0.1, T.h5Out + 0.3))
    const tk = pop01(t, T.tile5, 0.5, 1.8)
    const cx = 540, cy = 1130 + 10 * Math.sin((t - T.tile5) * 2) + 120 * o
    const S = 600, hb = thud(t, T.heart, 26, 7)
    glow(x, cx, cy, 700, GOLD, 0.7 * clamp(tk) * (1 - o))
    x.save(); x.translate(cx, cy); x.rotate((-2 + 1.2 * Math.sin((t - T.tile5) * 1.5) + 2 * hb) * D2R); x.scale(tk * (1 - 0.15 * o) * (1 + 0.04 * hb), tk * (1 - 0.15 * o) * (1 - 0.04 * hb)); x.globalAlpha = clamp(tk * 3) * (1 - o)
    x.beginPath(); x.roundRect(-S / 2, -S / 2, S, S, 56); x.fillStyle = 'rgba(52,36,22,0.96)'; x.fill(); ink(x, GOLD, { w: 10, fa: 0, glow: 30 })
    x.save(); x.globalAlpha *= 0.45; x.strokeStyle = GOLD; x.lineWidth = 3; x.beginPath(); x.roundRect(-S / 2 + 22, -S / 2 + 22, S - 44, S - 44, 40); x.stroke(); x.restore()
    // the heart dauber, under the people
    const d = t - (T.heart - 0.16)
    if (d >= 0) {
      const sp = clamp(d / 0.16), sc = lerp(2.2, 1, ease.inCubic(sp)) * (1 + 0.12 * thud(d, 0.16, 30, 9))
      x.save(); x.translate(0, 10); x.scale(sc, sc); x.globalAlpha *= clamp(sp * 2.5)
      heartPath(230); x.fillStyle = rgba(PINK, 0.7); x.shadowColor = PINK; x.shadowBlur = 40; x.fill(); x.shadowBlur = 0
      x.lineWidth = 6; x.strokeStyle = rgba('#ffffff', 0.4); x.stroke()
      x.restore()
    }
    const lean = ease.inOutCubic(prog(t, T.heart - 0.1, T.heart + 0.4))
    const bob = k => 6 * Math.sin(t * 4 + k)
    person(-120 + 14 * lean, 200 + bob(0), GOLD, 1, 1)
    person(120 - 14 * lean, 200 + bob(1.5), lean > 0.5 ? '#fff3e0' : CYAN, 1, 1)
    x.fillStyle = GOLD; x.font = `700 40px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.save(); x.letterSpacing = '6px'; x.fillText('★  YOU TWO  ★', 0, -S / 2 + 62); x.restore()
    x.restore()
    sparkle(x, cx, cy, t, T.tile5 + 0.2, { n: 12, R: 420, seed: 80, size: 26 })
    sparkle(x, cx, cy, t, T.heart, { n: 22, R: 520, seed: 81, size: 34, dur: 1.0, cols: [PINK, GOLD, '#fff3e0', LILAC] })
  }

  return {
    start: 0, end: END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      drawSky(x, t, t < 3 ? { ...SKY_H, zoom: lerp(1.6, SKY_H.zoom, ss), dy: lerp(-30, 0, ss) } : SKY_H)
      if (t < END - 0.25) { drawBingo(t); drawTalk(t); drawDeal(t); drawMystery(t); drawEnd(t) }
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

// ── sound (pitched SFX in the films' D-major palette; the engine moves them into F)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const daub = (ts, f, pan) => [['whoosh', +(ts - 0.16).toFixed(3), 0.14, 0.025], ['tick', ts, 0.08], ['pop', ts, f, 0.055, pan]]
export const CUES = [
  // hook
  ...wordPops(T.h0, 2, 0.08, 0, 0.03), ['pop', T.h0Late, 1318.51, 0.06, 0], ['pluck', T.h0Late, 1174.66, 0.05, 0.6, 0],
  ['whoosh', T.card, 0.5, 0.035], ['glitter', T.card + 0.4, T.card + 1.0],
  ...daub(T.free, 880, 0), ['bell', T.free, 1174.66, 0.035, 0.8, 0],
  ...T.stamps.flatMap((ts, k) => daub(ts, NOTE[k % 7], ((ORDER[k] % 3) - 1) * 0.45)),
  ...T.strikes.map((ts, k) => ['pluck', ts, [987.77, 1174.66, 1318.51][k], 0.045, 0.3, (k - 1) * 0.4]),
  ['whoosh', T.bingo - 0.2, 0.2, 0.05], ['boom', T.bingo, 0.16], ['tick', T.bingo, 0.09], ['glitter', T.bingo, T.bingo + 1.0],
  ['bell', T.bingo + 0.02, 1760, 0.05, 1.4, -0.15], ['bell', T.bingo + 0.06, 2349.32, 0.035, 1.4, 0.15],
  ['whoosh', T.again, 0.34, 0.035], ['tick', T.again + 0.34, 0.07],
  ...[880, 739.99, 587.33, 493.88].map((f, i) => ['pluck', +(T.again + 0.36 + i * 0.12).toFixed(3), f, 0.04, 0.3, -0.2 + i * 0.13]),
  ...[0, 1, 2].map(k => ['whoosh', +(T.stack + k * 0.12).toFixed(3), 0.25, 0.025]),
  // align skips the bingo
  ...wordPops(T.h1, 3, 0.08, 1, 0.026), ['pop', T.h1Late, 1318.51, 0.055, 0], ['pluck', T.h1Late, 1174.66, 0.05, 0.6, 0],
  ...[4, 0, 6, 2, 8, 7, 3, 5, 1].map((o, i) => ['pop', +(T.fly + o * 0.09).toFixed(3), NOTE[(o + 2) % 7], 0.035, ((i % 3) - 1) * 0.5]),
  ['riser', T.fly - 0.3, T.fly + 0.5, 0.03], ['glitter', T.fly, T.fly + 1.0],
  // talk cards
  ...wordPops(T.h2, 3, 0.08, 0, 0.026), ['pop', T.h2Late, 1174.66, 0.05, -0.1], ['pop', T.h2Late + 0.12, 1318.51, 0.05, 0.1],
  ['pop', T.tile2, 587.33, 0.05, 0], ['whoosh', T.flip - 0.3, 0.3, 0.04], ['bell', T.flip, 1174.66, 0.05, 1.2, 0], ['glitter', T.flip, T.flip + 0.7],
  // dealbreakers
  ...wordPops(T.h3, 2, 0.08, 2), ['pop', T.h3Late, 1318.51, 0.05, 0], ['pluck', T.h3Late, 987.77, 0.045, 0.6, 0],
  ['pop', T.dcard, 880, 0.055, -0.2], ['whoosh', T.dcard - 0.1, 0.4, 0.035],
  ...T.chips.flatMap((tc, i) => [['whoosh', tc - 0.2, 0.2, 0.035], ['tick', tc, 0.08], ['pop', tc, [739.99, 880, 1174.66][i], 0.05, 0], ['pluck', tc + 0.02, 587.33, 0.035, 0.4, 0]]),
  // chart first
  ...wordPops(T.h4, 2, 0.12, 3, 0.03), ...wordPops(T.h4Late, 2, 0.12, 1, 0.03),
  ['whoosh', T.mcard, 0.6, 0.04], ['bell', T.mcard + 0.4, 880, 0.05, 1.4, 0], ['glitter', T.mcard + 0.4, T.mcard + 1.1],
  // get a real first date
  ...wordPops(T.h5, 2, 0.08, 0, 0.03), ['pop', T.h5Real, 1318.51, 0.055, 0], ['pluck', T.h5Real, 1174.66, 0.05, 0.6, 0], ...wordPops(T.h5Real + 0.3, 2, 0.08, 2, 0.028),
  ['whoosh', T.tile5, 0.5, 0.03], ['riser', T.tile5 + 0.2, T.heart, 0.03],
  ['whoosh', T.heart - 0.18, 0.18, 0.04], ['tick', T.heart, 0.08],
  ['bell', T.heart, 1760, 0.055, 1.4, -0.1], ['bell', T.heart + 0.03, 2349.32, 0.04, 1.4, 0.1], ['glitter', T.heart, T.heart + 0.8],
]
