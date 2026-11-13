// Align Wisdom: the frame engine. A pixel night sky in one sign's colour,
// Star Talk's pixel star in that colour, and a retro RPG dialogue box where
// the words type out as the voice says them.
//
// Pure f(t): paint(t) can be called for any time, in any order, which is what
// the MP4 renderer needs. The live player (player.js) uses the same engine and
// fills in word times as the browser speaks them.
//
//   const eng = createEngine(canvas, { glyphs })
//   eng.load(reel, timeline)     // reel from bank.mjs compose(), timeline from render.mjs / player.js
//   eng.paint(t)
//
// timeline: { duration, intro?, beats: [{ kind: 'hook'|'wisdom'|'send', start, at, end }],
//             lines: [{ beat, words: [{ w, em, s, e }] }] }   (one line per beat; s/e = when each word is said)

import { drawStarChar } from '../difference/vendor/films/startalk.js'
import { SIGNS, rng } from './bank.mjs'

export const W = 1080, H = 1920
const P = 6                         // one art pixel = 6 screen pixels
const LW = W / P, LH = H / P        // the sky is painted at 180 × 320
const INK = '#0b0716', BONE = '#efe6d6', GOLD = '#f2c75c'
const MONO = "'Space Mono', ui-monospace, monospace"

// ───────────────────────────── colour
const hexToRgb = (h) => { const n = parseInt(h.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255] }
const toHex = (r, g, b) => '#' + [r, g, b].map((v) => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, '0')).join('')
const mix = (a, b, k) => { const A = hexToRgb(a), B = hexToRgb(b); return toHex(...A.map((v, i) => v + (B[i] - v) * k)) }
const rgba = (h, a) => { const [r, g, b] = hexToRgb(h); return `rgba(${r},${g},${b},${a})` }
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v))
const prog = (t, a, b) => clamp((t - a) / (b - a))
const outBack = (x) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2) }
const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16)
const bayer = (x, y) => BAYER[(y & 3) * 4 + (x & 3)]

// ───────────────────────────── a 5×7 pixel font for labels
const FONT = {
  A: '01110 10001 10001 11111 10001 10001 10001', B: '11110 10001 10001 11110 10001 10001 11110',
  C: '01111 10000 10000 10000 10000 10000 01111', D: '11110 10001 10001 10001 10001 10001 11110',
  E: '11111 10000 10000 11110 10000 10000 11111', F: '11111 10000 10000 11110 10000 10000 10000',
  G: '01111 10000 10000 10011 10001 10001 01111', H: '10001 10001 10001 11111 10001 10001 10001',
  I: '11111 00100 00100 00100 00100 00100 11111', J: '00111 00010 00010 00010 00010 10010 01100',
  K: '10001 10010 10100 11000 10100 10010 10001', L: '10000 10000 10000 10000 10000 10000 11111',
  M: '10001 11011 10101 10101 10001 10001 10001', N: '10001 11001 10101 10011 10001 10001 10001',
  O: '01110 10001 10001 10001 10001 10001 01110', P: '11110 10001 10001 11110 10000 10000 10000',
  Q: '01110 10001 10001 10001 10101 10010 01101', R: '11110 10001 10001 11110 10100 10010 10001',
  S: '01111 10000 10000 01110 00001 00001 11110', T: '11111 00100 00100 00100 00100 00100 00100',
  U: '10001 10001 10001 10001 10001 10001 01110', V: '10001 10001 10001 10001 10001 01010 00100',
  W: '10001 10001 10001 10101 10101 10101 01010', X: '10001 10001 01010 00100 01010 10001 10001',
  Y: '10001 10001 01010 00100 00100 00100 00100', Z: '11111 00001 00010 00100 01000 10000 11111',
  '·': '00000 00000 00000 00100 00000 00000 00000', '.': '00000 00000 00000 00000 00000 00000 00100',
  "'": '00100 00100 00000 00000 00000 00000 00000', '@': '01110 10001 10111 10101 10111 10000 01111',
  '♥': '00000 01010 11111 11111 01110 00100 00000', '★': '00100 00100 11111 01110 01110 11011 00000',
  ' ': '00000 00000 00000 00000 00000 00000 00000',
}
for (const k in FONT) FONT[k] = FONT[k].split(' ')
/** pixel text, s = screen px per font pixel; returns its width */
function ptext(g, str, x, y, s, color, { align = 'left', measure = false, shadow = null } = {}) {
  const chars = [...str.toUpperCase()]
  const w = chars.length * 6 * s - s
  if (measure) return w
  let cx = Math.round(align === 'center' ? x - w / 2 : align === 'right' ? x - w : x)
  const draw = (ox, oy, col) => {
    g.fillStyle = col
    let px = cx
    for (const ch of chars) {
      const rows = FONT[ch] || FONT[' ']
      rows.forEach((row, j) => { for (let i = 0; i < 5; i++) if (row[i] === '1') g.fillRect(px + i * s + ox, Math.round(y) + j * s + oy, s, s) })
      px += 6 * s
    }
  }
  if (shadow) draw(s, s, shadow)
  draw(0, 0, color)
  return w
}

// ───────────────────────────── the engine
export function createEngine(canvas, { glyphs = {} } = {}) {
  canvas.width = W; canvas.height = H
  const ctx = canvas.getContext('2d')
  const low = document.createElement('canvas'); low.width = LW; low.height = LH
  const lg = low.getContext('2d')
  const skyC = document.createElement('canvas'); skyC.width = LW; skyC.height = LH
  const GLY = glyphs
  let S, reel, TL, R, STARS, HILLS, CLOUDS, HOPS, PAL, LAYOUT, panel

  function glyphPath(ch) {
    const gl = GLY[ch]
    if (!gl) return null
    if (!gl.path) gl.path = new Path2D(gl.d)
    return gl.path
  }

  // the static sky: dithered bands from ink to the sign's colour at the horizon
  function paintSky() {
    const g = skyC.getContext('2d')
    const img = g.createImageData(LW, LH)
    const stops = [[0, INK], [0.32, mix(INK, S.dark, 0.75)], [0.52, S.dark], [0.66, mix(S.dark, S.color, 0.45)], [0.72, mix(S.color, S.light, 0.25)]]
    const at = (v) => {
      for (let i = 1; i < stops.length; i++) if (v <= stops[i][0]) return mix(stops[i - 1][1], stops[i][1], (v - stops[i - 1][0]) / (stops[i][0] - stops[i - 1][0]))
      return stops[stops.length - 1][1]
    }
    const BANDS = 14
    for (let y = 0; y < LH; y++) {
      const v = y / LH
      for (let x = 0; x < LW; x++) {
        // posterise into bands, dither the step between neighbours
        const q = v * BANDS, b0 = Math.floor(q), f = q - b0
        const band = f > bayer(x, y) ? b0 + 1 : b0
        const [r, gg, bb] = hexToRgb(at(Math.min(1, band / BANDS)))
        const o = (y * LW + x) * 4
        img.data[o] = r; img.data[o + 1] = gg; img.data[o + 2] = bb; img.data[o + 3] = 255
      }
    }
    g.putImageData(img, 0, 0)
    // a planet with dithered shading, in the sign's light colour
    const px = 142 + Math.floor(R() * 14), py = 70 + Math.floor(R() * 14), pr = 13
    for (let y = -pr; y <= pr; y++) for (let x = -pr; x <= pr; x++) {
      const d = Math.hypot(x, y)
      if (d > pr) continue
      const lit = clamp(0.55 + (-(x) * 0.5 - y * 0.5) / pr * 0.6)
      g.fillStyle = lit > bayer(x + 99, y + 99) ? S.light : mix(S.color, S.dark, 0.25)
      g.fillRect(px + x, py + y, 1, 1)
    }
    // its glyph, carved in
    const path = glyphPath(S.glyph)
    if (path) {
      const t = document.createElement('canvas'); t.width = 40; t.height = 40
      const tg = t.getContext('2d')
      tg.translate(20, 20); tg.scale(0.016, 0.016); tg.fillStyle = '#000'; tg.fill(path)
      const d = tg.getImageData(0, 0, 40, 40).data
      g.fillStyle = mix(S.color, S.dark, 0.35)
      for (let y = 0; y < 40; y++) for (let x = 0; x < 40; x++) if (d[(y * 40 + x) * 4 + 3] > 110) g.fillRect(px - 20 + x, py - 20 + y, 1, 1)
    }
    PAL.planet = { x: px, y: py, r: pr }
  }

  function makeWorld() {
    STARS = Array.from({ length: 90 }, () => ({ x: Math.floor(R() * LW), y: Math.floor(R() ** 1.4 * LH * 0.6), ph: R(), sp: 0.3 + R() * 0.9, big: R() < 0.12, col: R() < 0.3 ? S.light : BONE }))
    // hills: three layers, each a looping heightline so they can scroll forever
    HILLS = [0, 1, 2].map((k) => {
      const len = 360, amp = [16, 12, 9][k], base = [196, 208, 222][k]
      const harm = Array.from({ length: 4 }, (_, i) => ({ f: (i + 1) * (1 + Math.floor(R() * 2)), a: amp / (i + 1.3), p: R() * Math.PI * 2 }))
      const hts = Array.from({ length: len }, (_, x) => Math.round(base - harm.reduce((s, h) => s + h.a * Math.sin(h.f * x / len * Math.PI * 2 + h.p), 0)))
      const col = [mix(S.dark, INK, 0.25), mix(S.dark, INK, 0.5), mix(INK, '#000', 0.2)][k]
      return { hts, len, col, speed: [1.2, 2.4, 4][k], rim: k === 0 ? mix(S.color, S.dark, 0.35) : null }
    })
    CLOUDS = Array.from({ length: 4 }, (_, i) => ({ x: R() * 260, y: 60 + i * 26 + R() * 18, w: 18 + Math.floor(R() * 22), sp: 1.5 + R() * 2.5 }))
  }

  function layoutText() {
    // the box text is laid out once per line, so nothing reflows while it types
    const size = LAYOUT.box.font
    ctx.font = `700 ${size}px ${MONO}`
    const maxW = LAYOUT.box.w - 2 * LAYOUT.box.padX
    const sp = ctx.measureText(' ').width
    for (const ln of TL.lines) {
      let x = 0, row = 0
      for (const wd of ln.words) {
        const w = ctx.measureText(wd.w).width
        if (x > 0 && x + w > maxW) { x = 0; row++ }
        wd.x = x; wd.row = row; wd.w_px = w
        x += w + sp
      }
      ln.rows = row + 1
    }
  }

  function makePanel() {
    // a pixel panel: stepped corners, a sign-colour border, a bone hairline, on dark glass
    const { w, h } = LAYOUT.box
    const c = document.createElement('canvas'); c.width = w; c.height = h
    const g = c.getContext('2d')
    const step = (o, col) => {
      g.fillStyle = col
      g.fillRect(o + 2 * P, o, w - 2 * o - 4 * P, h - 2 * o)
      g.fillRect(o, o + 2 * P, w - 2 * o, h - 2 * o - 4 * P)
      g.fillRect(o + P, o + P, w - 2 * o - 2 * P, h - 2 * o - 2 * P)
    }
    step(0, S.color)
    step(P, mix(S.light, S.color, 0.4))
    step(2 * P, rgba(mix(INK, S.dark, 0.35), 0.93))
    g.globalCompositeOperation = 'destination-out'; step(2 * P, '#000'); g.globalCompositeOperation = 'source-over'
    step(2 * P, rgba(mix(INK, S.dark, 0.35), 0.92))
    // inner hairline
    g.fillStyle = rgba(BONE, 0.22)
    g.fillRect(4 * P, 3 * P, w - 8 * P, P / 2); g.fillRect(4 * P, h - 3.5 * P, w - 8 * P, P / 2)
    // little bright pixels on the top-left run
    g.fillStyle = '#fff6dc'; g.fillRect(3 * P, 0, 3 * P, P); g.fillRect(0, 3 * P, P, 2 * P)
    panel = c
  }

  function load(r, timeline) {
    reel = r; TL = timeline
    S = SIGNS.find((s) => s.id === reel.sign)
    R = rng((reel.seed + 7) * 7919 + S.id.length * 31)
    PAL = {}
    LAYOUT = { star: { x: W / 2, y: 850, size: 420 }, box: { x: 54, y: 1290, w: 972, h: 420, padX: 56, padTop: 104, rowH: 72, font: 50 } }
    makeWorld()
    paintSky()
    layoutText()
    makePanel()
    hops()
  }

  function hops() {
    // the star hops along as it talks: roughly every other word
    HOPS = []
    let last = -1e9, n = 0
    for (const ln of TL.lines) for (const wd of ln.words) if (Number.isFinite(wd.s) && n++ % 2 === 0 && wd.s - last >= 0.34) { HOPS.push(wd.s); last = wd.s }
  }

  /** live mode: word times changed, refresh the hops */
  function retime() { hops() }

  // ───────────── drawing
  function drawLow(t) {
    lg.drawImage(skyC, 0, 0)
    // stars twinkle
    for (const s of STARS) {
      const a = 0.5 + 0.5 * Math.sin((t * s.sp + s.ph) * Math.PI * 2)
      if (a < 0.25) continue
      lg.fillStyle = s.col
      lg.globalAlpha = 0.35 + 0.65 * a
      lg.fillRect(s.x, s.y, 1, 1)
      if (s.big && a > 0.7) { lg.fillRect(s.x - 1, s.y, 3, 1); lg.fillRect(s.x, s.y - 1, 1, 3) }
    }
    lg.globalAlpha = 1
    // a shooting star every few seconds
    const per = 6.5, k = Math.floor(t / per), ph = (t % per) / per
    if (ph < 0.16) {
      const r2 = rng(k * 131 + 7), sx = 20 + r2() * 140, sy = 10 + r2() * 70, q = ph / 0.16
      for (let i = 0; i < 9; i++) {
        lg.globalAlpha = (1 - i / 9) * (1 - q)
        lg.fillStyle = i < 2 ? '#ffffff' : S.light
        lg.fillRect(Math.round(sx + q * 46 - i), Math.round(sy + q * 23 - i * 0.5), 1, 1)
      }
      lg.globalAlpha = 1
    }
    // clouds drift right forever
    for (const c of CLOUDS) {
      const x = ((c.x + t * c.sp) % (LW + 60)) - 50
      lg.fillStyle = rgba(S.light, 0.16)
      lg.fillRect(Math.round(x), Math.round(c.y), c.w, 2)
      lg.fillRect(Math.round(x + 3), Math.round(c.y - 2), c.w - 8, 2)
      lg.fillRect(Math.round(x + 7), Math.round(c.y - 4), Math.floor(c.w / 3), 2)
    }
    // hills scroll left forever, back to front
    for (const hl of HILLS) {
      const off = t * hl.speed
      for (let x = 0; x < LW; x++) {
        const xi = Math.floor(x + off), fr = (x + off) - xi
        const y = hl.hts[((xi % hl.len) + hl.len) % hl.len]
        lg.fillStyle = hl.col
        lg.fillRect(x, y, 1, LH - y)
        if (hl.rim) { lg.fillStyle = hl.rim; lg.fillRect(x, y, 1, 1) }
        void fr
      }
    }
    // fireflies over the hills, in the sign's colour
    for (let i = 0; i < 14; i++) {
      const r2 = rng(i * 977 + 3)
      const fx = (r2() * LW + t * (2 + r2() * 3) + Math.sin(t * 0.8 + i) * 6) % LW
      const fy = 196 + r2() * 60 + Math.sin(t * 1.3 + i * 2) * 4
      const a = 0.5 + 0.5 * Math.sin(t * 2.2 + i * 1.7)
      if (a < 0.3) continue
      lg.globalAlpha = a
      lg.fillStyle = i % 3 ? S.light : GOLD
      lg.fillRect(Math.round(fx), Math.round(fy), 1, 1)
    }
    lg.globalAlpha = 1
    ctx.imageSmoothingEnabled = false
    ctx.drawImage(low, 0, 0, W, H)
  }

  function beatAt(t) {
    let i = 0
    for (let k = 0; k < TL.beats.length; k++) if (t >= TL.beats[k].start) i = k
    return i
  }

  function drawHeader(t) {
    // "♏ SCORPIO" in chunky pixels, a pixel glyph to its left
    const s = 10, y = 150
    const name = S.name
    const tw = ptext(ctx, name, 0, 0, s, '', { measure: true })
    const gw = 90, gap = 34, total = gw + gap + tw
    const x0 = W / 2 - total / 2
    const pop = outBack(prog(t, 0.05, 0.5))
    ctx.save()
    ctx.translate(W / 2, y + 35); ctx.scale(pop, pop); ctx.translate(-W / 2, -(y + 35))
    // the glyph, drawn small and blown up so it reads as pixels
    const path = glyphPath(S.glyph)
    if (path) {
      const c = document.createElement('canvas'); c.width = 16; c.height = 16
      const g = c.getContext('2d'); g.translate(8, 8); g.scale(0.0125, 0.0125); g.fillStyle = '#000'; g.fill(path)
      const d = g.getImageData(0, 0, 16, 16).data
      for (const [ox, oy, col] of [[6, 6, mix(S.dark, INK, 0.3)], [0, 0, S.light]]) {
        ctx.fillStyle = col
        for (let j = 0; j < 16; j++) for (let i = 0; i < 16; i++) if (d[(j * 16 + i) * 4 + 3] > 100) ctx.fillRect(x0 + i * 6 - 6 + ox, y - 12 + j * 6 + oy, 6, 6)
      }
    }
    ptext(ctx, name, x0 + gw + gap, y, s, S.light, { shadow: mix(S.dark, INK, 0.3) })
    // a little underline of alternating pixels in the sign colour
    ctx.fillStyle = S.color
    for (let i = 0; i < Math.ceil(total / 12); i++) if (i % 2 === 0) ctx.fillRect(Math.round(x0 + i * 12), y + 92, 12, 6)
    ctx.restore()
    // the subtitle
    ptext(ctx, 'THE STARS · ONE SIGN AT A TIME', W / 2, y + 128, 4, rgba(BONE, 0.62), { align: 'center' })
  }

  function drawStar(t) {
    const b = TL.beats[beatAt(t)]
    const last = beatAt(t) === TL.beats.length - 1
    const lastLine = TL.lines[TL.lines.length - 1]
    const lastEnd = lastLine.words[lastLine.words.length - 1].e
    let mood = 'happy', look = [0, 0.15]
    if (b.kind === 'hook') mood = t < b.at + 0.4 ? 'wide' : 'happy'
    else if (b.kind === 'wisdom') { mood = 'neutral'; look = [0, 0.7] }
    if (last && t > lastEnd + 0.1) { mood = 'heart'; look = [0, 0] }
    const pop = outBack(prog(t, 0.1, 0.55))
    const L = LAYOUT.star
    drawStarChar(ctx, L.x, L.y, L.size, t, { color: S.color, glyph: S.glyph, mood, look, hops: HOPS, seed: 3, pop, glow: 1.1 })
  }

  function drawBox(t) {
    const B = LAYOUT.box
    const bi = beatAt(t), beat = TL.beats[bi], ln = TL.lines[bi]
    const open = outBack(prog(t, (TL.beats[0].at ?? 0) - 0.35, (TL.beats[0].at ?? 0) - 0.05))
    if (open <= 0) return
    ctx.save()
    ctx.translate(B.x + B.w / 2, B.y + B.h * 0.6); ctx.scale(1, open); ctx.translate(-(B.x + B.w / 2), -(B.y + B.h * 0.6))
    ctx.drawImage(panel, B.x, B.y)
    // the name tag
    const tag = `THE STARS ★ ${S.name}`
    const tw = ptext(ctx, tag, 0, 0, 4, '', { measure: true })
    const tx = B.x + 36, ty = B.y - 30
    ctx.fillStyle = S.color; ctx.fillRect(tx - 6, ty - 6, tw + 36, 52)
    ctx.fillStyle = mix(INK, S.dark, 0.3); ctx.fillRect(tx, ty, tw + 24, 40)
    ptext(ctx, tag, tx + 12, ty + 6, 4, S.light)
    // the words: each word types out letter by letter while it's said
    ctx.font = `700 ${B.font}px ${MONO}`
    ctx.textBaseline = 'alphabetic'
    const top = B.y + B.padTop + Math.max(0, (4 - ln.rows) * B.rowH / 2)
    let doneAt = 0
    for (const wd of ln.words) {
      doneAt = Math.max(doneAt, wd.e)
      if (!(t >= wd.s)) continue
      const n = wd.w.length
      const k = wd.e > wd.s ? clamp((t - wd.s) / Math.max(0.06, (wd.e - wd.s) * 0.8)) : 1
      const shown = wd.w.slice(0, Math.max(1, Math.ceil(n * k)))
      const speaking = t < wd.e + 0.05
      ctx.fillStyle = wd.em ? (speaking ? '#ffffff' : S.light) : speaking ? '#ffffff' : BONE
      const x = B.x + B.padX + wd.x, y = top + wd.row * B.rowH
      if (wd.em) {
        // a pixel highlighter under emphasised words, in the sign colour
        ctx.fillStyle = rgba(S.color, 0.38)
        ctx.fillRect(Math.round(x - 4), Math.round(y + 4), Math.round(ctx.measureText(shown).width + 8), 12)
        ctx.fillStyle = speaking ? '#ffffff' : S.light
      }
      ctx.fillText(shown, x, y)
    }
    // the ▼ blinks once the page is done (not on the last page)
    if (t > doneAt + 0.15 && bi < TL.beats.length - 1 && Math.floor(t * 2.4) % 2 === 0) {
      ctx.fillStyle = S.light
      const ax = B.x + B.w - 66, ay = B.y + B.h - 62
      ctx.fillRect(ax, ay, 24, 6); ctx.fillRect(ax + 6, ay + 6, 12, 6); ctx.fillRect(ax + 9, ay + 12, 6, 4)
    }
    ctx.restore()
    // page pips: one per page, the current one lit
    const n = TL.beats.length, pw = 18, gap = 14, total = n * pw + (n - 1) * gap
    for (let i = 0; i < n; i++) {
      const x = B.x + B.w - 36 - total + i * (pw + gap), y = B.y - 22
      ctx.fillStyle = i < bi ? S.color : i === bi ? S.light : rgba(BONE, 0.25)
      ctx.fillRect(x + 6, y, 6, 18); ctx.fillRect(x, y + 6, 18, 6)
    }
    void beat
  }

  function drawFooter(t) {
    const lastLine = TL.lines[TL.lines.length - 1]
    const at = lastLine.words[lastLine.words.length - 1].e + 0.15
    // the pill after the send-off: a pixel button
    const k = outBack(prog(t, at, at + 0.4))
    const y = 1786
    if (k > 0) {
      const text = 'COME ALIGN · JOIN THE BETA'
      const s = 5, tw = ptext(ctx, text, 0, 0, s, '', { measure: true })
      const w = tw + 80, h = 76, x = W / 2 - w / 2
      ctx.save()
      ctx.translate(W / 2, y + h / 2); ctx.scale(k, k); ctx.translate(-W / 2, -(y + h / 2))
      ctx.fillStyle = mix(S.dark, INK, 0.4); ctx.fillRect(x + 6, y + 6 + 6, w, h)
      ctx.fillStyle = S.color; ctx.fillRect(x + 6, y, w - 12, h); ctx.fillRect(x, y + 6, w, h - 12)
      ctx.fillStyle = S.light; ctx.fillRect(x + 12, y + 6, w - 24, 6)
      ptext(ctx, text, W / 2, y + h / 2 - 17, s, INK, { align: 'center' })
      ctx.restore()
    } else {
      ptext(ctx, 'COME ALIGN · JOIN THE BETA', W / 2, y + 22, 4, rgba(BONE, 0.5), { align: 'center' })
    }
  }

  function drawWipe(t) {
    // live player: a dithered pixel dissolve in and out of each sign
    const fin = TL.intro ? 1 - prog(t, 0, 0.6) : 0
    const fout = TL.outro && Number.isFinite(TL.duration) ? prog(t, TL.duration - 0.6, TL.duration) : 0
    const k = Math.max(fin, fout)
    if (k <= 0) return
    ctx.fillStyle = INK
    for (let y = 0; y < LH; y++) for (let x = 0; x < LW; x++) if (bayer(x, y) < k) ctx.fillRect(x * P, y * P, P, P)
  }

  function paint(t) {
    drawLow(t)
    drawHeader(t)
    drawStar(t)
    drawBox(t)
    drawFooter(t)
    drawWipe(t)
  }

  return { load, retime, paint, canvas, get sign() { return S } }
}

// ───────────────────────────── renderer API (render.mjs drives these in Chromium)
if (typeof window !== 'undefined') {
  let eng
  window.setup = async (data) => {
    for (const [family, src, style, weight] of data.fonts) {
      const f = new FontFace(family, `url(${src})`, { style, weight })
      await f.load()
      document.fonts.add(f)
    }
    await document.fonts.ready
    eng = createEngine(document.getElementById('c'), { glyphs: data.glyphs })
    eng.load(data.reel, data.timeline)
    return { duration: data.timeline.duration }
  }
  window.frame = (t, q = 0.9) => { eng.paint(t); return eng.canvas.toDataURL('image/jpeg', q) }
  window.png = (t) => { eng.paint(t); return eng.canvas.toDataURL('image/png') }
}
