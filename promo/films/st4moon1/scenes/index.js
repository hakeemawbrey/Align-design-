// st4moon1 (20 s vertical Align ad, Star Talk season 4, EP 023, thread G: sky lessons) · story 0–15.6, then the end card.
//   0.00–6.10  "The Moon has | *notes* for Houston."  The sleepy Moon star (stmoon) naps in its crescent, floating over Buffalo
//              Bayou at night: a generic skyline on the far bank, its lights shimmering in the water. It wakes.
//              Box (☽ THE MOON): "you plan the first date for their *Sun.*" (a little pixel sun in shades pops up: SUN)
//              Ghost cameo (4.7): it peeks up over the bayou railing on the right bank, in front of the towers.
//   6.15–9.10  "Date two: | the *Moon.*"  Box: "plan the next one for their *Moon.*" (the crescent glows; a MOON tag)
//   9.20       card cut (flip).
//   9.30–13.0  "Ask what | they *need.*"  A card back rises and flips: the real talk card card-talk-3,
//              "What does a perfect lazy Sunday look like for you?" The Moon, small in the corner, reads along, happy.
//  13.15–15.5  "Date the | *whole* chart."  The Moon back over the bayou, a faint chart wheel drawing round it, heart eyes.
//              Everything pops out by 15.45; the end card takes over at 15.6.
// Astrology: the Sun sign is the self you show; the Moon sign is what you need to feel safe and cared for (stmoon).
// One canvas (sky + constellation + bayou + moon + card), DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill, A } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes } from '../../startalk.js'
import { drawSeedConstellation, drawGhostCameo, episodeNumeral } from '../../stlore.js'

export const DURATION = 20
const EP = 23
const W = 1080
const STORY_END = DURATION - ENDCARD_LEN       // 15.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', LAV = '#c9a6ff', INK = '#1b1236'
const MOONC = '#e9e4ff', MOONLIGHT = '#bcd2ff'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', ui-monospace, monospace"
const SYM = "'EB Garamond', 'DejaVu Sans', 'Segoe UI Symbol', 'Noto Sans Symbols', serif"
const SHADOW = '0 4px 30px rgba(6,4,18,0.9), 0 0 4px rgba(6,4,18,0.6)'

// ── the timeline
const T = {
  h0: 0.15, h0Land: 0.75, h0Out: [5.92, 6.1],
  moonIn: 0.25, wake: [1.5, 2.1], open: 2.6, l1: 2.8, sun: 3.2, sunOut: [5.8, 6.1],
  ghost: 4.7,
  h1: 6.15, h1Land: 6.6, l2: 6.25, glow: 7.0, close: 9.05, h1Out: [8.9, 9.08],
  cut: 9.2,
  h2: 9.3, h2Land: 9.7, scoot: [9.25, 9.7], cardUp: [9.3, 9.8], flip: [10.05, 10.45], cardOut: [12.8, 13.15], h2Out: [12.85, 13.05],
  h3: 13.15, h3Land: 13.55, back: [12.9, 13.4], wheel: [13.25, 14.1], out: [15.05, 15.45], h3Out: [15.15, 15.4],
}
const MO = '☽ THE MOON'
const LINES = [
  { t: T.l1, speaker: MO, color: MOONLIGHT, text: 'you plan the first date for their *Sun.*' },
  { t: T.l2, speaker: MO, color: MOONLIGHT, text: 'plan the next one for their *Moon.*' },
]
const CPS = 26
const LT = lineTimes(LINES, { cps: CPS })

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }

/** springy word-by-word type: `*word*` = accent (Garamond italic, colour), `|` = line break; word bigIdx pops big at lateAt */
function popText(parent, text, { top, size, weight = 800, accentColor = GOLD, accentSize, gap = 0.07, at: t0, bigIdx = -1, lateAt = null, wobble = false, lineHeight = 1.02 }) {
  const box = el('div', { position: 'absolute', left: '70px', width: (W - 140) + 'px', top: top + 'px', textAlign: 'center',
    fontFamily: INTER, fontWeight: weight, fontSize: size + 'px', lineHeight, color: BONE, textShadow: SHADOW, letterSpacing: '-0.01em' }, parent)
  const toks = text.split(' ')
  const ws = []
  let n = 0
  toks.forEach(w => {
    if (w === '|') { el('br', {}, box); return }
    const acc = w.startsWith('*') || w.endsWith('*')
    const style = { display: 'inline-block', margin: '0 0.12em', opacity: 0, transformOrigin: '50% 85%' }
    if (acc) Object.assign(style, { fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontWeight: 500, fontSize: (accentSize || size * 1.09) + 'px', color: accentColor, letterSpacing: '0' })
    const big = n === bigIdx
    ws.push({ t: big ? lateAt : t0 + n * gap, big, e: el('span', style, box, w.replace(/\*/g, '')) })
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

const BMP = s => s.trim().split(/\s+/)
const HEART = BMP(`.H.H. HWHHH HHHHH .HHH. ..H..`)
const SHADES = BMP(`XXXXX.XXXXX XWXXXXXWXXX XXXXX.XXXXX .XXX...XXX.`)
function bits(x, bm, cx, cy, cell, col, { a = 1, col2 = '#ffffff' } = {}) {
  if (a <= 0) return
  const w = bm[0].length, h = bm.length
  x.save(); x.globalAlpha *= a
  bm.forEach((r, j) => [...r].forEach((ch, i) => { if (ch === '.') return; x.fillStyle = ch === 'W' ? col2 : col; x.fillRect(Math.round(cx + (i - w / 2) * cell), Math.round(cy + (j - h / 2) * cell), Math.ceil(cell), Math.ceil(cell)) }))
  x.restore()
}

// ── layout
const HOME = { x: 560, y: 790, s: 0.82 }, CORNER = { x: 190, y: 1300, s: 0.4 }
const STAR_OFF = { x: 70, y: 40, size: 300 }
const SUN = { x: 190, y: 640 }
const CARD = { x: 600, y: 1000, h: 850 }
const BANK = 1150                                     // the far bank / railing of the bayou
const TALK = { iw: 732, ih: 1170, body: [62, 62, 670, 1108] }
const BACK_BODY = 1320 / 1528
const STAR_HOPS = [...talkHops(LINES, MO, { cps: CPS }), T.wake[1] + 0.05, T.flip[1] + 0.1, T.h3Land + 0.1]

function moonState(t) {
  if (t < T.wake[0]) return { mood: 'sleepy' }
  if (t < T.wake[1]) return { mood: 'neutral', look: [0, 0], blink: t < T.wake[0] + 0.25 ? 0.6 : (t - T.wake[0]) % 0.3 < 0.1 ? 1 : 0 }
  if (t < T.l1) return { mood: 'wide', look: [0, 0], blink: false }
  if (t < T.sun + 0.4) return { mood: 'neutral', look: [0, 0] }
  if (t < T.l2) return { mood: 'happy' }
  if (t < LT[1].done) return { mood: 'neutral', look: [0, 0] }
  if (t < T.cut) return { mood: 'sparkle', look: [0, 0] }
  if (t < T.flip[1]) return { mood: 'neutral', look: [1, -1] }
  if (t < T.back[0]) return { mood: 'happy' }
  return { mood: t < T.h3Land ? 'sparkle' : 'heart' }
}

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 28px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const loadImg = src => new Promise(res => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = A + src })
  const bake = (im, w) => { if (!im) return null; const c = document.createElement('canvas'); c.width = w; c.height = Math.round(w * im.height / im.width); const cx = c.getContext('2d'); cx.imageSmoothingQuality = 'high'; cx.drawImage(im, 0, 0, c.width, c.height); return c }
  const [imB, imT] = await Promise.all([loadImg('card-back.png'), loadImg('card-talk-3.png')])
  const BACK = bake(imB, 600), FACE = bake(imT, 732)

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const H0 = popText(root, 'The Moon has | *notes* for Houston.', { top: 205, size: 100, accentSize: 150, at: T.h0, bigIdx: 3, lateAt: T.h0Land, wobble: true, gap: 0.09, accentColor: MOONLIGHT })
  const H1 = popText(root, 'Date two: | the *Moon.*', { top: 205, size: 120, accentSize: 180, at: T.h1, bigIdx: 3, lateAt: T.h1Land, wobble: true, gap: 0.1, accentColor: MOONLIGHT })
  const H2 = popText(root, 'Ask what | they *need.*', { top: 190, size: 104, accentSize: 150, at: T.h2, bigIdx: 3, lateAt: T.h2Land, wobble: true, gap: 0.09, accentColor: MOONLIGHT, lineHeight: 0.98 })
  const H3 = popText(root, 'Date the | *whole* chart.', { top: 200, size: 128, accentSize: 190, at: T.h3, bigIdx: 2, lateAt: T.h3Land, wobble: true, gap: 0.1, accentColor: MOONLIGHT })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1400, width: 960, height: 300, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // crescent sprite (stmoon): a 34-cell disc minus an offset disc, shaded + craters
  const CG = 34
  const cres = document.createElement('canvas'); cres.width = cres.height = CG + 2
  {
    const o = cres.getContext('2d'), h = CG / 2
    const on = (i, j) => { const u = (i + 0.5 - h) / h, v = (j + 0.5 - h) / h; return Math.hypot(u, v) <= 1 && Math.hypot(u - 0.62, v + 0.1) > 0.78 }
    for (let j = -1; j <= CG; j++) for (let i = -1; i <= CG; i++) {
      if (on(i, j)) {
        const u = (i + 0.5 - h) / h, v = (j + 0.5 - h) / h
        let c = u + v < -0.5 ? '#fffbea' : u * 0.3 + v > 0.45 ? '#c9bfe6' : '#f1ecff'
        if ([[-0.62, -0.1, 0.12], [-0.4, 0.5, 0.09], [-0.25, -0.62, 0.08]].some(([a, b, r]) => Math.hypot(u - a, v - b) < r)) c = '#d6cdf2'
        o.fillStyle = c; o.fillRect(i + 1, j + 1, 1, 1)
      } else if (on(i + 1, j) || on(i - 1, j) || on(i, j + 1) || on(i, j - 1)) { o.fillStyle = '#3a2a6e'; o.fillRect(i + 1, j + 1, 1, 1) }
    }
  }
  function glow(cx, cy, r, col, a) {
    if (a <= 0) return
    x.save(); x.globalCompositeOperation = 'lighter'
    const g = x.createRadialGradient(cx, cy, 0, cx, cy, r)
    g.addColorStop(0, rgba(col, 0.45 * a)); g.addColorStop(0.45, rgba(col, 0.15 * a)); g.addColorStop(1, rgba(col, 0))
    x.fillStyle = g; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill(); x.restore()
  }

  // ── Buffalo Bayou at night: a generic far-bank skyline, a railing, and the water with shimmering reflections
  const TOWERS = [[110, 70, 110], [190, 60, 170], [265, 76, 140], [350, 58, 230], [425, 72, 290], [515, 54, 250], [590, 80, 200], [680, 60, 270], [760, 72, 160], [845, 58, 210], [925, 76, 130], [1000, 62, 170]]
  function bayou(t, a) {
    if (a <= 0) return
    x.save(); x.globalAlpha = a
    // trees along the bank (soft pixel blobs)
    for (let i = 0; i < 14; i++) { const tx = 30 + i * 80, r = 34 + (i * 17) % 18; x.fillStyle = '#152a3a'; x.beginPath(); x.arc(tx, BANK - 18 - (i % 3) * 8, r, 0, Math.PI * 2); x.fill() }
    for (const [cx, w, h] of TOWERS) {
      x.fillStyle = '#1b1242'; x.fillRect(cx - w / 2, BANK - h - 20, w, h)
      x.fillStyle = 'rgba(201,166,255,0.16)'; x.fillRect(cx - w / 2, BANK - h - 20, 4, h)
      for (let j = 14; j < h - 14; j += 22) for (let i = 10; i < w - 10; i += 16) {
        if (((cx * 7 + i * 13 + j * 3) % 11) >= 4) continue
        x.fillStyle = ((i + j + Math.floor(t * 0.6)) % 5) ? 'rgba(242,199,92,0.5)' : 'rgba(255,240,200,0.85)'
        x.fillRect(cx - w / 2 + i, BANK - h - 20 + j, 6, 8)
      }
    }
    // water
    const g = x.createLinearGradient(0, BANK, 0, 1920); g.addColorStop(0, '#1d1850'); g.addColorStop(1, '#0b0820'); x.fillStyle = g; x.fillRect(0, BANK, W, 1920 - BANK)
    // reflections: each tower as broken shimmering stripes
    for (const [cx, w, h] of TOWERS) {
      for (let j = 0; j < h * 0.9; j += 14) {
        const wob = Math.sin(t * 2.2 + j * 0.15 + cx) * 8, k = 1 - j / (h * 0.9)
        x.fillStyle = `rgba(242,199,92,${0.12 * k})`; x.fillRect(cx - w / 2 + wob, BANK + 12 + j, w * (0.6 + 0.3 * Math.sin(j + t)), 6)
      }
    }
    // the moon's own shimmer on the water
    for (let j = 0; j < 9; j++) { const ww = 160 - j * 12 + 30 * Math.sin(t * 2 + j); x.fillStyle = rgba(MOONLIGHT, 0.22 - j * 0.02); x.fillRect(HOME.x - 20 - ww / 2 + Math.sin(t * 1.7 + j) * 12, BANK + 30 + j * 26, ww, 7) }
    // the bank + railing
    x.fillStyle = '#0f1a2a'; x.fillRect(0, BANK - 22, W, 26)
    x.fillStyle = 'rgba(239,230,214,0.55)'; x.fillRect(0, BANK - 52, W, 5)
    for (let px = 20; px < W; px += 70) x.fillRect(px, BANK - 52, 5, 32)
    x.restore()
  }

  function place(t) {
    if (t >= T.back[0]) { const e = ease.inOutCubic(prog(t, ...T.back)); return { x: lerp(CORNER.x, HOME.x, e), y: lerp(CORNER.y, HOME.y, e) - Math.sin(Math.PI * e) * 80, s: lerp(CORNER.s, HOME.s, e) } }
    const e = ease.inOutCubic(prog(t, ...T.scoot))
    return { x: lerp(HOME.x, CORNER.x, e), y: lerp(HOME.y, CORNER.y, e) - Math.sin(Math.PI * e) * 60, s: lerp(HOME.s, CORNER.s, e) }
  }
  function drawMoon(t) {
    const ok = popOut(t, T.out), pk = pop01(t, T.moonIn - 0.1, 0.5, 1.6) * ok
    if (pk <= 0.01) return
    const P = place(t), bob = Math.sin(t * 1.6) * 10 * P.s
    const cx = P.x - 60 * P.s, cy = P.y + bob, R = 250 * P.s * pk
    const gl = 0.6 + (t > T.glow && t < T.cut ? 0.7 * pop01(t, T.glow, 0.4, 1.4) : 0) + (t > T.h3Land ? 0.4 : 0)
    glow(cx, cy, R * 1.9, MOONLIGHT, gl)
    const cell = Math.max(2, Math.round(2 * R / CG))
    x.save(); x.imageSmoothingEnabled = false
    x.translate(Math.round(cx), Math.round(cy)); x.rotate(-0.18)
    x.drawImage(cres, -cell * (CG / 2 + 1), -cell * (CG / 2 + 1), cell * (CG + 2), cell * (CG + 2))
    x.restore()
    const st = moonState(t)
    drawStarChar(x, P.x + STAR_OFF.x * P.s, cy + STAR_OFF.y * P.s, STAR_OFF.size * P.s * pk, t, { color: MOONC, glyph: P.s > 0.6 ? '☽' : null, ...st, hops: STAR_HOPS, seed: 7, glow: 1.1 })
    // MOON tag on line 2
    const mk = t < T.cut ? pop01(t, T.glow, 0.36, 2.2) : 0
    if (mk > 0.01) tag('MOON', MOONLIGHT, cx + R * 0.95, cy - R * 0.85, mk)
  }
  function tag(label, col, tx, ty, k) {
    x.save(); x.translate(tx, ty); x.scale(k, k); x.rotate(0.05)
    x.font = `700 30px ${MONO}`; x.letterSpacing = '0.18em'; x.textAlign = 'center'; x.textBaseline = 'middle'
    const tw = x.measureText(label).width + 44
    x.fillStyle = 'rgba(13,8,32,0.9)'; x.beginPath(); x.roundRect(-tw / 2, -28, tw, 56, 12); x.fill()
    x.lineWidth = 3; x.strokeStyle = col; x.stroke(); x.fillStyle = col; x.fillText(label, 5, 2); x.letterSpacing = '0px'
    x.restore()
  }

  // the little sun in shades: "the Sun you show"
  function drawSun(t) {
    const k = pop01(t, T.sun, 0.36, 2.2) * (1 - ease.inCubic(prog(t, ...T.sunOut)))
    if (k <= 0.01) return
    const cx = SUN.x, cy = SUN.y + Math.sin(t * 2.4) * 6, r = 62 * k
    glow(cx, cy, r * 3, GOLD, 0.9)
    x.save(); x.translate(cx, cy); x.rotate(t * 0.8)
    for (let i = 0; i < 8; i++) { x.rotate(Math.PI / 4); x.fillStyle = 'rgba(14,8,32,0.85)'; x.fillRect(-10 * k, -r * 1.62, 20 * k, r * 0.5); x.fillStyle = '#ffd24a'; x.fillRect(-6 * k, -r * 1.58, 12 * k, r * 0.42) }
    x.restore()
    x.fillStyle = 'rgba(14,8,32,0.85)'; x.beginPath(); x.arc(cx, cy, r + 6, 0, Math.PI * 2); x.fill()
    x.fillStyle = '#ffd24a'; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill()
    x.fillStyle = '#fff1a8'; x.beginPath(); x.arc(cx - r * 0.3, cy - r * 0.3, r * 0.3, 0, Math.PI * 2); x.fill()
    bits(x, SHADES, cx, cy - r * 0.05, 9 * k, '#140c2c', { col2: '#8fd8f6' })
    tag('SUN', GOLD, cx, cy + r * 2.1 + 6, k)
  }

  // the talk card: back rises, flips to card-talk-3
  function drawCard(t) {
    if (t < T.cardUp[0] || t > T.cardOut[1]) return
    const up = easeOutBack(prog(t, ...T.cardUp), 1.4), o = prog(t, ...T.cardOut)
    const f = prog(t, ...T.flip), sx = Math.cos(f * Math.PI)
    const h = CARD.h * (1 - 0.8 * ease.inCubic(o)), bodyW = h * (608 / 1046)
    const cx = CARD.x, cy = lerp(2300, CARD.y, up) - ease.inCubic(o) * 200 + Math.sin(t * 1.8) * 6
    glow(cx, cy, 560, MOONLIGHT, 0.5 * up * (1 - o) * (f > 0.5 ? 1 : 0.4))
    x.save(); x.translate(cx, cy); x.rotate(lerp(0.12, -0.03, up)); x.globalAlpha = 1 - o
    if (sx > 0) { x.scale(sx, 1); if (BACK) { const bw = bodyW / BACK_BODY, bh = bw * BACK.height / BACK.width; x.drawImage(BACK, -bw / 2, -bh / 2, bw, bh) } }
    else if (FACE) {
      x.scale(-sx, 1)
      const [bx0, by0, bx1, by1] = TALK.body, s = h / (by1 - by0)
      x.drawImage(FACE, -((bx0 + bx1) / 2) * s, -((by0 + by1) / 2) * s, TALK.iw * s, TALK.ih * s)
    }
    x.restore()
    if (f > 0.5) sparkles(t, cx, cy, T.flip[1] - 0.1, 12, 360, 2)
  }

  // the whole chart: a faint wheel draws itself round the Moon (twelve houses), with tiny Sun and Moon marks
  function drawWheel(t) {
    const p = ease.outCubic(prog(t, ...T.wheel)), ok = popOut(t, T.out)
    if (p <= 0 || ok <= 0) return
    const cx = HOME.x - 20, cy = HOME.y + 50, R = 300
    x.save(); x.globalAlpha = 0.7 * ok
    x.strokeStyle = rgba(BONE, 0.5); x.lineWidth = 3
    x.beginPath(); x.arc(cx, cy, R, -Math.PI / 2, -Math.PI / 2 + p * Math.PI * 2); x.stroke()
    x.strokeStyle = rgba(GOLD, 0.35); x.beginPath(); x.arc(cx, cy, R - 40, -Math.PI / 2, -Math.PI / 2 + p * Math.PI * 2); x.stroke()
    for (let i = 0; i < 12; i++) {
      const a = -Math.PI / 2 + i * Math.PI / 6
      if (i / 12 > p) continue
      x.strokeStyle = rgba(BONE, 0.4); x.beginPath(); x.moveTo(cx + Math.cos(a) * (R - 40), cy + Math.sin(a) * (R - 40)); x.lineTo(cx + Math.cos(a) * R, cy + Math.sin(a) * R); x.stroke()
    }
    x.globalAlpha = ok * clamp((p - 0.5) * 3)
    x.font = `700 46px ${SYM}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    const spin = t * 0.25
    for (const [g, col, a0] of [['☉', GOLD, 0.4], ['☽', MOONLIGHT, 2.5], ['↑', PINK, 4.4]]) {
      const a = a0 + spin
      x.fillStyle = 'rgba(13,8,32,0.9)'; x.beginPath(); x.arc(cx + Math.cos(a) * (R - 20), cy + Math.sin(a) * (R - 20), 32, 0, Math.PI * 2); x.fill()
      x.fillStyle = col; x.fillText(g + '︎', cx + Math.cos(a) * (R - 20), cy + Math.sin(a) * (R - 20) + 2)
    }
    x.restore()
  }

  function sparkles(t, cx, cy, t0, n, R, seed, cols = [GOLD, BONE, MOONLIGHT, LAV]) {
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
  function floatHearts(t, cx, cy, t0, t1, seed) {
    for (let i = 0; i < 9; i++) {
      const born = t0 + i * 0.22, life = 1.5
      if (t < born || born > t1) continue
      const p = (t - born) / life
      if (p >= 1) continue
      const side = ((i * 37 + seed) % 7) / 6 - 0.5
      bits(x, HEART, cx + side * 420 + Math.sin(p * 4 + i) * 16, cy - 60 - p * 200, 8 * (0.7 + 0.5 * Math.sin(Math.PI * Math.min(1, p * 1.6))), [PINK, '#ff4f86', MOONLIGHT][i % 3], { a: Math.sin(Math.PI * p), col2: '#ffffff' })
    }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, { ...SKY_H, moon: null })
      drawSeedConstellation(x, t, EP)
      const ok = popOut(t, T.out)
      if (t < T.out[1] + 0.02) {
        // the bayou fades back while the card is up
        const dim = t < T.cut ? 1 : t < T.back[0] ? 0.45 : lerp(0.45, 1, prog(t, ...T.back))
        bayou(t, clamp(ok) * dim)
        if (t < T.cut) drawGhostCameo(x, t, { x: 880, y: BANK - 52, at: T.ghost, dur: 1.4, from: 'below', cell: 3 })
        drawSun(t)
        drawWheel(t)
        drawCard(t)
        drawMoon(t)
        sparkles(t, HOME.x, HOME.y, T.wake[1], 10, 260, 1)
        sparkles(t, HOME.x, HOME.y, T.glow, 12, 300, 4)
        sparkles(t, HOME.x, HOME.y, T.h3Land, 12, 320, 3)
        if (t > T.h3Land + 0.1) floatHearts(t, HOME.x, HOME.y + 40, T.h3Land + 0.1, T.out[0] - 0.3, 3)
      }
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidate: 9.2 (box shut → the talk card beat). Plays.
const CUTS = [{ t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, numeral: episodeNumeral(EP) }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...wordPops(T.h0, 3, 0.09, 0, 0.024), ['pop', T.h0Land, 1174.66, 0.045, 0], ['bell', T.h0Land + 0.02, 1318.51, 0.02, 1.2, 0],
  ['glitter', T.moonIn, T.moonIn + 0.5],
  ['pop', T.wake[0], 880, 0.03, 0], ['pop', T.wake[0] + 0.3, 987.77, 0.03, 0], ['bell', T.wake[1], 1760, 0.02, 1.0, 0],
  ['pop', T.open, 739.99, 0.035, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { [MO]: 659.25 } }),
  ['pop', T.sun, 1174.66, 0.045, -0.4], ['pluck', T.sun + 0.02, 880, 0.035, 0.5, -0.4],
  ['tick', T.ghost + 0.1, 0.02],
  ...wordPops(T.h1, 3, 0.1, 1, 0.024), ['pop', T.h1Land, 1318.51, 0.05, 0],
  ['glitter', T.glow, T.glow + 0.5], ['bell', T.glow + 0.05, 1318.51, 0.025, 1.4, 0.3],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  ...wordPops(T.h2, 3, 0.09, 2, 0.024), ['pop', T.h2Land, 1174.66, 0.05, 0],
  ['whoosh', T.cardUp[0], 0.45, 0.035], ['tick', T.flip[0] + 0.2, 0.04], ['pluck', T.flip[1], 1318.51, 0.045, 0.8, 0], ['glitter', T.flip[1] - 0.05, T.flip[1] + 0.45],
  ['whoosh', T.cardOut[0], 0.3, 0.03],
  ...wordPops(T.h3, 3, 0.1, 1, 0.026), ['pop', T.h3Land, 1318.51, 0.055, 0], ['pluck', T.h3Land, 1174.66, 0.05, 0.7, 0], ['glitter', T.wheel[0], T.wheel[1]],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
