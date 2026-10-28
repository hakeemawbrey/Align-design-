// st4hotcold (20 s vertical Align ad, Star Talk season 4, EP 017 · thread: dealbreakers) · story 0–15.6, then the end card.
//   0.00–5.90  "Houston weather: | hot, then *cold.*"  A pixel thermometer swings, and so do a date's texts on a pixel phone.
//              HOT (sun, heat shimmer): "miss u!!" · "best night EVER" → the ♋ Cancer star goes heart-eyed.
//              COLD (frost on the screen, a cold-front tint): "1 day later…" "2 days…" "3 days…" → it nods off waiting.
//              (The ghost leans out from behind the phone during the silence: it knows this move.)
//              Then "hey." and the needle stops at lukewarm. The star squints.
//   6.00–11.9  "Mixed | *signals.*"  Box (THE STARS): "the weather can run hot and cold." → "your person *shouldn't*."
//              The phone slides away; the dealbreakers card rises and "✕ HOT AND COLD" stamps onto it.
//   12.0–15.4  "Steady is *sexy.*"  The thermometer settles mid-scale and holds; the star sparkles. Pops out by 15.45.
// One canvas (sky + thermometer + phone + card + star), DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { drawSeedConstellation, drawGhostCameo, episodeNumeral } from '../../stlore.js'

export const DURATION = 20
const EP = 17
const STORY_END = DURATION - ENDCARD_LEN       // 15.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', LAV = '#c9a6ff', RED = '#ff5a5a', ICE = '#9fdcff', HOT = '#ff7a3d'
const MONO = "'Space Mono', ui-monospace, monospace"
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const CAN = signStar('cancer')

// ── the timeline
const T = {
  h0: 0.12, h0Out: [5.72, 5.9],
  thermo: 0.3, phone: 0.5, star: 0.7,
  hot: [0.9, 1.35], m1: 1.45, m2: 2.1, heart: 1.6,
  cold: [3.05, 3.55], days: [3.45, 4.05, 4.65], ghost: 3.5, doze: 3.9,
  luke: [5.15, 5.45], m3: 5.2, squint: 5.6,
  h1: 6.0, h1Land: 6.35, open: 6.2, l1: 6.4, l2: 9.35, close: 11.85, h1Out: [11.72, 11.9],
  phoneOut: [10.25, 10.6], cardUp: [10.4, 10.9], chip: 11.15,
  h2: 12.02, h2Land: 12.4, steady: [12.0, 12.8], h2Out: [15.15, 15.4], out: [15.05, 15.45],
}
const SPEAK = 'THE STARS'
const LINES = [
  { t: T.l1, speaker: SPEAK, text: 'the weather can run hot and cold.' },
  { t: T.l2, speaker: SPEAK, text: 'your person *shouldn\'t*.' },
]
const CPS = 28

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${a})` }

/** a bitmap of cells with a 1-cell ink outline, centred on (cx, cy) */
function drawBits(x, bm, cols, cx, cy, cell, { rot = 0, outline = INK, alpha = 1 } = {}) {
  const w = bm[0].length, h = bm.length
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot)
  const ox = -w * cell / 2, oy = -h * cell / 2
  const on = (i, j) => j >= 0 && j < h && i >= 0 && i < w && bm[j][i] !== '.'
  if (outline) {
    x.fillStyle = outline
    for (let j = -1; j <= h; j++) for (let i = -1; i <= w; i++) if (!on(i, j) && (on(i + 1, j) || on(i - 1, j) || on(i, j + 1) || on(i, j - 1))) x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5)
  }
  for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) { const ch = bm[j][i]; if (ch === '.') continue; x.fillStyle = cols[ch]; x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5) }
  x.restore()
}
const SUN = ['...y...', '.y.y.y.', '..YYY..', 'yYYYYYy', '..YYY..', '.y.y.y.', '...y...']
const FLAKE = ['...w...', '.w.w.w.', '..www..', 'wwwWwww', '..www..', '.w.w.w.', '...w...']
const HEART = ['.H.H.', 'HWHHH', 'HHHHH', '.HHH.', '..H..']

// ── layout
const TH = { x: 170, top: 700, bot: 1290 }                 // thermometer tube
const PH = { x: 610, y: 990, w: 410, h: 640 }              // phone
const STAR_P = { x: 900, y: 1225, size: 272 }
const CARD = { x: 560, y: 985, w: 560, h: 420 }

// the mercury level 0 (cold) … 1 (hot), with springy swings
function level(t) {
  let v = 0.45
  v = lerp(v, 0.97, easeOutBack(prog(t, ...T.hot), 1.8))
  v = lerp(v, 0.06, easeOutBack(prog(t, ...T.cold), 1.6))
  v = lerp(v, 0.5, easeOutBack(prog(t, ...T.luke), 2.2))
  if (t > T.luke[1] && t < T.steady[0]) v += 0.06 * Math.sin((t - T.luke[1]) * 4.2)          // still wobbling
  v = lerp(v, 0.55, ease.inOutCubic(prog(t, ...T.steady)))
  return clamp(v, 0, 1)
}
const heat = t => clamp((level(t) - 0.5) * 2, -1, 1)        // −1 cold … +1 hot

const STAR_HOPS = [T.star + 0.3, T.m1 + 0.1, T.m2 + 0.1, T.m3 + 0.15, T.chip + 0.25, T.chip + 0.6, T.h2Land + 0.1, 13.6, 14.4]

function starState(t) {
  if (t < T.m1) return { mood: 'neutral', look: [-1, 0] }
  if (t < T.heart) return { mood: 'wide', look: [-1, -1], blink: false }
  if (t < T.cold[0] + 0.1) return { mood: 'heart' }
  if (t < T.doze) return { mood: 'neutral', look: [-1, 0], blink: false }
  if (t < T.m3) return { mood: 'sleepy' }
  if (t < T.squint) return { mood: 'wide', look: [-1, 0], blink: false }
  if (t < T.l1 + 0.3) return { mood: 'squint', look: [-1, 0], blink: false }
  if (t < T.l2) return { mood: 'neutral', look: [0, 0] }
  if (t < T.chip) return { mood: 'neutral', look: [-1, -1] }
  if (t < T.chip + 0.4) return { mood: 'wide', look: [-1, 0], blink: false }
  if (t < T.h2) return { mood: 'happy' }
  return { mood: 'sparkle', look: [0, 0] }
}

async function build(stage) {
  try {
    await Promise.all(['800 112px Inter', "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 34px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, 'Houston weather: | hot, then *cold.*', { top: 200, size: 100, accentSize: 156, at: T.h0, gap: 0.1, accentColor: ICE, wobble: true, late: 1, lateAt: T.cold[0] - 0.05, lineHeight: 1.0 })
  const H1 = popText(root, 'Mixed | *signals.*', { top: 190, size: 112, accentSize: 170, at: T.h1, late: 1, lateAt: T.h1Land, wobble: true, accentColor: PINK, lineHeight: 0.95 })
  const H2 = popText(root, 'Steady is *sexy.*', { top: 250, size: 128, accentSize: 196, at: T.h2, late: 1, lateAt: T.h2Land, wobble: true, gap: 0.1, accentColor: GOLD })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1430, width: 960, height: 280, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  function glow(cx, cy, r, col, a) {
    if (a <= 0) return
    const g = x.createRadialGradient(cx, cy, 0, cx, cy, r); g.addColorStop(0, rgba(col, a)); g.addColorStop(1, rgba(col, 0))
    x.fillStyle = g; x.fillRect(cx - r, cy - r, 2 * r, 2 * r)
  }
  function sparkles(t, cx, cy, t0, n, R, seed, cols = [GOLD, BONE, PINK, LAV]) {
    const tt = t - t0
    if (tt < 0 || tt > 0.7) return
    const p = ease.outCubic(tt / 0.7)
    x.save(); x.globalAlpha = 1 - ease.inQuad(tt / 0.7)
    for (let i = 0; i < n; i++) { const a = (i / n) * Math.PI * 2 + seed; drawPixelStar(x, cx + Math.cos(a) * R * (0.7 + 0.5 * p), cy + Math.sin(a) * R * (0.7 + 0.5 * p), 26 * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length]) }
    x.restore()
  }

  // ── the thermometer
  function drawThermo(t) {
    const k = pop01(t, T.thermo, 0.4, 1.7) * popOut(t, T.out)
    if (k <= 0.01) return
    const v = level(t), hv = heat(t)
    // gold when steady, red-orange when hot, ice blue when cold
    const mixc = (a, b, k) => `rgb(${a.map((v, i) => Math.round(lerp(v, b[i], k))).join(',')})`
    const col = hv >= 0 ? mixc([242, 199, 92], [255, 80, 60], clamp(hv * 1.4)) : mixc([242, 199, 92], [110, 200, 255], clamp(-hv * 1.4))
    const c = 8, cx = TH.x, top = lerp(TH.bot, TH.top, k), bot = TH.bot
    x.save(); x.globalAlpha = clamp(k * 1.4)
    // glass tube + bulb
    x.fillStyle = INK; x.fillRect(cx - 5 * c, top - c, 10 * c, bot - top + 2 * c)
    x.fillStyle = '#2a2156'; x.fillRect(cx - 4 * c, top, 8 * c, bot - top)
    x.fillStyle = 'rgba(239,230,214,0.25)'; x.fillRect(cx - 3 * c, top + c, c, bot - top - 2 * c)
    const bulbY = bot + 7 * c
    for (let j = -8; j <= 8; j++) for (let i = -8; i <= 8; i++) {
      const d = (i + 0.5) ** 2 + (j + 0.5) ** 2
      if (d > 64) continue
      x.fillStyle = d > 42 ? INK : d < 6 && i < 0 && j < 0 ? '#ffffff' : col
      x.fillRect(cx + i * c, bulbY + j * c, c + 0.5, c + 0.5)
    }
    // the mercury column
    const colTop = lerp(bot, top + 2 * c, v)
    x.fillStyle = col; x.fillRect(cx - 2 * c, colTop, 4 * c, bot - colTop + 2 * c)
    x.fillStyle = 'rgba(255,255,255,0.45)'; x.fillRect(cx - 2 * c, colTop, c, bot - colTop)
    // ticks
    x.fillStyle = 'rgba(239,230,214,0.6)'
    for (let i = 1; i < 8; i++) x.fillRect(cx + 5 * c, lerp(bot, top, i / 8), (i % 2 ? 2 : 3) * c, c / 2)
    glow(cx, colTop, 120, hv > 0 ? HOT : ICE, 0.35 * Math.abs(hv))
    x.restore()
    // icons: sun at the top (hot), snowflake by the bulb (cold)
    const sunA = clamp(hv * 1.6) * k, flkA = clamp(-hv * 1.6) * k
    if (sunA > 0) { drawBits(x, SUN, { y: '#ffcf5c', Y: '#ffe9a8' }, cx, top - 70 + Math.sin(t * 6) * 4, 10 * (0.8 + 0.2 * sunA), { alpha: sunA, rot: t * 0.6 }); glow(cx, top - 70, 140, '#ffb347', 0.35 * sunA) }
    if (flkA > 0) drawBits(x, FLAKE, { w: ICE, W: '#ffffff' }, cx, top - 70, 10, { alpha: flkA, rot: Math.sin(t * 2) * 0.3 })
    // labels
    x.save(); x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.globalAlpha = k
    x.fillStyle = hv > 0.5 ? HOT : 'rgba(239,230,214,0.35)'; x.fillText('HOT', cx + 4, TH.top - 140)
    x.fillStyle = hv < -0.5 ? ICE : 'rgba(239,230,214,0.35)'; x.fillText('COLD', cx + 4, bulbY + 110)
    x.restore()
  }

  // ── the phone with "them"'s texts
  function phoneK(t) { return pop01(t, T.phone, 0.4, 1.8) * (1 - ease.inCubic(prog(t, ...T.phoneOut))) * popOut(t, T.out) }
  function drawPhone(t) {
    const k = phoneK(t)
    if (k <= 0.01) return
    const hv = heat(t), buzz = [T.m1, T.m2, T.m3].some(m => t > m && t < m + 0.25) ? Math.sin(t * 95) * 6 : 0
    const w = PH.w, h = PH.h, c = 8, X0 = -w / 2, Y0 = -h / 2
    x.save(); x.translate(PH.x + buzz + ease.inCubic(prog(t, ...T.phoneOut)) * 700, PH.y + (1 - k) * 60); x.rotate(0.03); x.scale(k, k)
    glow(0, 0, 420, hv > 0 ? HOT : ICE, 0.22 * Math.abs(hv))
    // body
    x.fillStyle = INK; x.fillRect(X0 + c, Y0 - c, w - 2 * c, h + 2 * c); x.fillRect(X0 - c, Y0 + c, w + 2 * c, h - 2 * c); x.fillRect(X0, Y0, w, h)
    x.fillStyle = '#d9b25a'; x.fillRect(X0 + c, Y0, w - 2 * c, h); x.fillRect(X0, Y0 + c, w, h - 2 * c)
    const sx = X0 + 2 * c, sy = Y0 + 3 * c, sw = w - 4 * c, sh = h - 7 * c
    const g = x.createLinearGradient(0, sy, 0, sy + sh); g.addColorStop(0, '#2b1c55'); g.addColorStop(1, '#170d33')
    x.fillStyle = g; x.fillRect(sx, sy, sw, sh)
    x.fillStyle = '#0c0620'; x.fillRect(-3 * c, Y0 + c, 6 * c, c)
    x.fillStyle = 'rgba(239,230,214,0.5)'; x.fillRect(-5 * c, Y0 + h - 2.5 * c, 10 * c, c * 0.8)
    // header
    x.fillStyle = PINK; x.fillRect(sx + 2 * c, sy + 2 * c, 4 * c, 4 * c)
    x.font = `700 30px ${MONO}`; x.textBaseline = 'middle'; x.textAlign = 'left'; x.fillStyle = 'rgba(239,230,214,0.85)'
    x.fillText('them', sx + 8 * c, sy + 4 * c + 2)
    x.fillStyle = 'rgba(239,230,214,0.18)'; x.fillRect(sx, sy + 8 * c, sw, 3)
    // messages
    const msg = (t0, text, yy, big = false) => {
      const p = easeOutBack(prog(t, t0, t0 + 0.3), 2.4)
      if (p <= 0) return
      x.font = `${big ? 800 : 700} ${big ? 46 : 38}px ${big ? INTER : MONO}`
      const tw = x.measureText(text).width, bw = tw + 44, bh = big ? 78 : 70, bx = sx + 2 * c
      x.save(); x.translate(bx, yy + bh); x.scale(p, p); x.translate(-bx, -(yy + bh))
      x.fillStyle = BONE; x.fillRect(bx + c, yy, bw - 2 * c, bh); x.fillRect(bx, yy + c, bw, bh - 2 * c); x.fillRect(bx, yy + bh - c, 2 * c, 2 * c)
      x.fillStyle = INK; x.textAlign = 'left'; x.fillText(text, bx + 22, yy + bh / 2 + 3)
      x.restore()
    }
    const scroll = ease.inOutCubic(prog(t, T.m3 - 0.25, T.m3)) * 0
    msg(T.m1, 'miss u!!', sy + 12 * c - scroll)
    msg(T.m2, 'best night EVER', sy + 23 * c - scroll)
    // the silence: day stamps
    T.days.forEach((d0, i) => {
      const p = prog(t, d0, d0 + 0.2)
      const gone = i < 2 ? prog(t, T.days[i + 1] - 0.05, T.days[i + 1]) : prog(t, T.m3 - 0.1, T.m3 + 0.1) * 0.6
      if (p <= 0 || gone >= 1) return
      x.save(); x.globalAlpha = p * (1 - gone)
      x.font = `700 32px ${MONO}`; x.textAlign = 'center'; x.fillStyle = 'rgba(239,230,214,0.75)'
      x.fillText(`${i + 1} day${i ? 's' : ''} later…`, 0, sy + 41 * c + (1 - p) * 12)
      x.restore()
    })
    msg(T.m3, 'hey.', sy + 52 * c, true)
    // frost creeping over the screen when it's cold
    const fr = clamp(-hv * 1.3)
    if (fr > 0) {
      x.save(); x.beginPath(); x.rect(sx, sy, sw, sh); x.clip()
      for (let i = 0; i < 60; i++) {
        const a = (i * 2.399) % (Math.PI * 2), corner = i % 4
        const ccx = corner % 2 ? sx + sw : sx, ccy = corner < 2 ? sy : sy + sh
        const r = ((i * 37) % 100) / 100 * 130 * fr
        x.fillStyle = i % 3 ? 'rgba(200,236,255,0.55)' : 'rgba(255,255,255,0.7)'
        x.fillRect(Math.round((ccx + Math.cos(a) * r) / c) * c, Math.round((ccy + Math.sin(a) * r) / c) * c, c, c)
      }
      x.fillStyle = `rgba(160,220,255,${0.12 * fr})`; x.fillRect(sx, sy, sw, sh)
      x.restore()
    }
    x.restore()
    // hearts out of the hot texts
    if (t > T.m1 && t < T.cold[0] + 0.3) for (let i = 0; i < 6; i++) {
      const born = T.m1 + i * 0.25, p = (t - born) / 1.1
      if (p <= 0 || p >= 1) continue
      drawBits(x, HEART, { H: '#ff4f86', W: '#ffd1de' }, PH.x - 140 + i * 50 + Math.sin(p * 7 + i) * 14, PH.y - 260 - p * 200, 7, { alpha: Math.sin(Math.PI * p) * (1 - prog(t, T.cold[0], T.cold[0] + 0.3)) })
    }
  }

  // ── the dealbreakers card
  function drawCard(t) {
    if (t < T.cardUp[0]) return
    const up = easeOutBack(prog(t, ...T.cardUp), 1.4), ok = popOut(t, T.out)
    if (ok <= 0) return
    const w = CARD.w, h = CARD.h, cy = lerp(2200, CARD.y, up)
    glow(CARD.x, cy, 520, GOLD, 0.3 * up * ok)
    x.save(); x.translate(CARD.x, cy); x.rotate(lerp(0.12, -0.03, up)); x.scale(ok, ok)
    x.save(); x.shadowColor = rgba(LAV, 0.6); x.shadowBlur = 50
    x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, 30); const g = x.createLinearGradient(0, -h / 2, 0, h / 2); g.addColorStop(0, '#2a1858'); g.addColorStop(1, '#160c34'); x.fillStyle = g; x.fill(); x.restore()
    x.lineWidth = 5; x.strokeStyle = GOLD; x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, 30); x.stroke()
    x.lineWidth = 2; x.strokeStyle = rgba(BONE, 0.3); x.beginPath(); x.roundRect(-w / 2 + 16, -h / 2 + 16, w - 32, h - 32, 20); x.stroke()
    x.textAlign = 'center'; x.textBaseline = 'middle'
    x.font = `700 32px ${MONO}`; x.fillStyle = GOLD; x.letterSpacing = '0.18em'; x.fillText('MY DEALBREAKERS', 6, -h / 2 + 80); x.letterSpacing = '0px'
    x.fillStyle = rgba(GOLD, 0.5); x.fillRect(-w / 2 + 60, -h / 2 + 124, w - 120, 3)
    const p = prog(t, T.chip, T.chip + 0.22), yy = 40
    if (p <= 0) { x.setLineDash([10, 10]); x.lineWidth = 2; x.strokeStyle = rgba(BONE, 0.25); x.beginPath(); x.roundRect(-w / 2 + 50, yy - 52, w - 100, 104, 52); x.stroke(); x.setLineDash([]) }
    else {
      const s = lerp(2.0, 1, ease.outCubic(p)) + 0.07 * Math.sin(Math.PI * clamp((t - T.chip - 0.22) / 0.2))
      x.save(); x.translate(0, yy); x.rotate(-2 * Math.PI / 180); x.scale(s, s); x.globalAlpha *= clamp(p * 2)
      x.font = `700 40px ${MONO}`
      const tw = x.measureText('✕ HOT AND COLD').width + 40
      x.beginPath(); x.roundRect(-tw / 2 - 16, -48, tw + 32, 96, 48); x.fillStyle = 'rgba(255,90,90,0.16)'; x.fill(); x.lineWidth = 5; x.strokeStyle = RED; x.stroke()
      x.fillStyle = '#ffd0d0'; x.fillText('✕ HOT AND COLD', 0, 3)
      x.restore()
      const dt = t - T.chip - 0.2
      if (dt > 0 && dt < 0.45) { x.save(); x.globalAlpha = 1 - dt / 0.45; x.fillStyle = BONE; for (let q = 0; q < 10; q++) { const a = q / 10 * Math.PI * 2; x.fillRect(Math.cos(a) * (w * 0.4 + dt * 170) - 4, yy + Math.sin(a) * (60 + dt * 90) - 4, 8, 8) } x.restore() }
    }
    x.font = `700 26px ${MONO}`; x.fillStyle = rgba(BONE, 0.45); x.fillText('+ add another', 0, h / 2 - 62)
    x.restore()
  }

  function drawStar(t) {
    const k = pop01(t, T.star, 0.36, 2.2) * popOut(t, T.out)
    if (k <= 0.01) return
    const shiver = t > T.cold[0] + 0.1 && t < T.m3 ? Math.sin(t * 70) * 3 : 0
    const r = drawStarChar(x, STAR_P.x + shiver, STAR_P.y, STAR_P.size, t, { color: CAN.color, glyph: CAN.glyph, ...starState(t), hops: STAR_HOPS, pop: k, seed: 6, glow: t > T.h2 ? 1.35 : 1 })
    if (t > T.h2Land - 0.1) sparkles(t, r.x, r.y, T.h2Land, 10, 180, 2)
    sparkles(t, r.x, r.y, T.chip + 0.2, 8, 150, 4, [GOLD, BONE, RED])
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      const base = t < 3 ? { ...SKY_H, zoom: lerp(1.45, SKY_H.zoom, ss), dy: lerp(-22, 0, ss) } : SKY_H
      drawSky(x, t, base)
      drawSeedConstellation(x, t, EP)
      // the weather tints the whole sky: warm haze when hot, a blue cold front when cold
      const hv = heat(t) * (1 - prog(t, ...T.steady))
      if (Math.abs(hv) > 0.02) {
        const g = x.createLinearGradient(0, 0, 0, 1920)
        if (hv > 0) { g.addColorStop(0, 'rgba(255,120,60,0)'); g.addColorStop(1, `rgba(255,120,60,${0.22 * hv})`) }
        else { g.addColorStop(0, `rgba(120,200,255,${0.16 * -hv})`); g.addColorStop(1, 'rgba(120,200,255,0.02)') }
        x.fillStyle = g; x.fillRect(0, 0, 1080, 1920)
      }
      if (t < T.out[1] + 0.02) {
        drawThermo(t)
        drawCard(t)
        drawPhone(t)
        drawGhostCameo(x, t, { x: PH.x - PH.w / 2 - 12, y: 1060, at: T.ghost, dur: 1.3, from: 'right', cell: 4 })
        drawStar(t)
      }
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 5.92 (the texts → "Mixed signals.") and 11.95 (box shut → "Steady is sexy.").
const CUTS = [5.92, { t: 11.95, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, numeral: episodeNumeral(EP) }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [523.25, 587.33, 622.25, 783.99, 830.61, 1046.5, 1174.66]
const wordPops = (t0, n, gap, base = 0, gain = 0.026) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...wordPops(T.h0, 4, 0.1, 0), ['pop', T.cold[0] - 0.05, 1046.5, 0.045, 0],
  ['pop', T.thermo + 0.05, 523.25, 0.035, -0.4], ['pop', T.phone + 0.05, 783.99, 0.035, 0.2], ['pop', T.star + 0.05, 1046.5, 0.035, 0.4],
  // hot
  ['riser', T.hot[0] - 0.2, T.hot[1], 0.05], ['bell', T.hot[1], 1567.98, 0.03, 1.2, -0.4],
  ['pop', T.m1, 1174.66, 0.045, 0.2], ['tick', T.m1 + 0.02, 0.04], ['pop', T.m2, 1318.51, 0.04, 0.2], ['tick', T.m2 + 0.02, 0.04],
  ['pluck', T.heart, 1174.66, 0.04, 0.5, 0.4], ['pluck', T.heart + 0.12, 1567.98, 0.035, 0.5, 0.4], ['glitter', T.heart, T.heart + 0.6],
  // cold: the drop, the days, the ghost
  ['whoosh', T.cold[0] - 0.1, 0.7, 0.05], ['boom', T.cold[0] + 0.1, 0.16], ['bell', T.cold[1], 2093, 0.02, 1.6, -0.4],
  ...T.days.map(d => ['tick', d + 0.02, 0.05]),
  ['pop', T.m3, 622.25, 0.04, 0.2], ['tick', T.m3 + 0.02, 0.04], ['pop', T.squint, 523.25, 0.03, 0.4],
  // advice
  ...wordPops(T.h1, 1, 0.1, 2), ['pop', T.h1Land, 1046.5, 0.045, 0],
  ['pop', T.open, 783.99, 0.035, 0], ['pop', T.open + 0.06, 1046.5, 0.028, 0],
  ...talkCues(LINES, { cps: CPS }),
  ['whoosh', T.phoneOut[0], 0.4, 0.035], ['whoosh', T.cardUp[0], 0.5, 0.03],
  ['boom', T.chip + 0.2, 0.14], ['tick', T.chip + 0.2, 0.07], ['pop', T.chip + 0.24, 830.61, 0.04, 0],
  ['pop', T.close, 783.99, 0.03, 0], ['pop', T.close + 0.07, 523.25, 0.03, 0],
  // last line
  ...wordPops(T.h2, 2, 0.1, 1, 0.028), ['pop', T.h2Land, 1174.66, 0.055, 0], ['pluck', T.h2Land, 1046.5, 0.05, 0.7, 0], ['glitter', T.h2Land, T.h2Land + 0.5],
  ['bell', 13.6, 1318.51, 0.022, 1.2, 0.3],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
