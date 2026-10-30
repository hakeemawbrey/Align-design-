// sreightbillion (30 s vertical, Star Talk Remix of "8 billion people." / promo/films/eightbillion) · story 0–25.6, then
// the shared end card. THE STARS (gold) tap on your window and take you on the pull-back themselves.
//   0.00–6.60  "8 billion | *people.*"  one lit window at night: a silhouette, a phone's blue glow. The gold star peeks in
//              at the corner and taps the glass (tik tik). THE STARS: "psst. there are *8 billion* of you."
//   6.70–12.20 "So why does it feel | like *no one?*"  the camera pulls back: the window becomes a building, then a city of
//              windows, and three of them pop the same bubble: "no one gets me" ×2 … "same tbh". On out to a pixel Earth that
//              shrinks to a dot. ♓ Pisces arrives, sobbing. THE STARS: "you're all lonely. *together.*"
//   12.27 cut (music drop) → "Someone's sky | lines up with *yours.*"  ♉ and ♎ drift in from opposite edges and a gold
//              line snaps between them. THE STARS: "somewhere, a sky lines up with *yours.*" Then tonight's deck fans
//              in, five card backs. THE STARS: "tonight's deck is *already dealt.*"
//   18.38      ★ LESSON UNLOCKED: "You're not the only one | *looking up.*" (+1 COMPANY)
//   22.65 cut → "You are not | arriving *alone.*"  the gold star, and a ring of sign stars popping in round it, all
//              looking at you. Out by 25.45.
// One canvas (sky + stars + props), DOM type + two dialogue boxes + the lesson above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill, A } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, STAR, signStar } from '../../startalk.js'
import { buildLesson, lessonCues, popText } from '../../lesson.js'

export const DURATION = 30
const W = 1080
const STORY_END = DURATION - ENDCARD_LEN       // 25.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', BLUE = '#8fc4ff'
const MONO = "'Space Mono', ui-monospace, monospace"
const TAURUS = signStar('taurus'), LIBRA = signStar('libra'), PISCES = signStar('pisces')

// ── the timeline (beat grid 0.6 + n·0.5556)
const T = {
  h0: 0.12, h0Land: 0.5, h0Out: [6.38, 6.56], peek: [1.0, 1.5], taps: [1.75, 1.95, 2.25], open1: 2.62,
  cut1: 6.65,
  pull: [6.65, 10.2], h1: 6.8, h1Land: 7.3, h1Out: [12.0, 12.18], bubbles: [7.75, 8.35, 9.0], earth: [9.8, 11.7], pisces: 10.2, close1: 12.18,
  cut2: 12.27,
  h2: 12.33, h2Land: 12.8, h2Out: [18.1, 18.3], signs: [12.4, 13.6], snap: 13.75, deck: 15.2, open2: 12.95, close2: 18.32, propsOut: [18.2, 18.55],
  lesson: 18.38, lessonOut: [22.4, 22.6],
  cut3: 22.65,
  h3: 22.72, h3Land: 23.2, ring: 22.9, wink: [24.3, 24.75], h3Out: [25.1, 25.4], out: [25.05, 25.45],
}
const SKY = 'THE STARS'
const LINES1 = [
  { t: 2.82, speaker: SKY, text: 'psst. there are *8 billion* of you.' },
  { t: 9.45, speaker: SKY, text: "you're all lonely. *together.*", color: PINK },
]
const LINES2 = [
  { t: 13.15, speaker: SKY, text: 'somewhere, a sky lines up with *yours.*' },
  { t: 15.75, speaker: SKY, text: "tonight's deck is *already dealt.*" },
]
const CPS = 30
const HOPS = [...talkHops(LINES1, SKY, { cps: CPS }), ...talkHops(LINES2, SKY, { cps: CPS })]
const LESSON = { at: T.lesson, out: T.lessonOut, text: "You're not the only one | *looking up.*", chip: '+1 COMPANY' }

const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const hash = (a, b = 0) => { let h = (a * 374761393 + b * 668265263) | 0; h = (h ^ (h >>> 13)) * 1274126177 | 0; return ((h ^ (h >>> 16)) >>> 0) / 4294967295 }

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
const TEAR = ['.X.', 'XWX', 'XXX', '.X.']

// ── the city: an endless grid of windows in world px, grouped into buildings of 3 columns; the hero window is cell (0, 0)
const CW = 440, CHh = 560, WIN_W = 360, WIN_H = 460
const FOCUS = { x: 540, y: 900 }
const ROWS_DOWN = 5                                 // ground is 5 rows below the hero window
const bHeight = b => (b === 0 ? 9 : 4 + Math.floor(hash(b, 7) * 12))   // rows above the hero row
const BUBBLE_WIN = [{ c: -2, r: -1, text: 'no one gets me' }, { c: 3, r: 1, text: 'no one gets me' }, { c: 1, r: -3, text: 'same tbh' }]

// ── layout
const PEEK = { x: 855, y: 640, size: 230 }
const STAR_B = { x: 870, y: 1280, size: 230 }
const PISCES_P = { x: 190, y: 1300, size: 160 }
const STAR_C = { x: 890, y: 1290, size: 200 }
const CL = { x: 540, y: 1300, size: 300 }
const FINAL = { x: 540, y: 1080, size: 400 }
const DECK = { x: 470, y: 1080 }

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 30px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const loadImg = src => new Promise(res => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = A + src })
  const bake = (im, w) => { if (!im) return null; const c = document.createElement('canvas'); c.width = w; c.height = Math.round(w * im.height / im.width); const cx = c.getContext('2d'); cx.imageSmoothingQuality = 'high'; cx.drawImage(im, 0, 0, c.width, c.height); return c }
  const BACK = bake(await loadImg('card-back.png'), 300)

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, '8 billion | *people.*', { top: 200, size: 140, accentSize: 220, at: T.h0, gap: 0.12, late: 1, lateAt: T.h0Land, wobble: true, accentColor: GOLD, lineHeight: 0.95 })
  const H1 = popText(root, 'So why does it feel | like *no one?*', { top: 200, size: 96, accentSize: 164, at: T.h1, gap: 0.07, late: 2, lateAt: T.h1Land, lateGap: 0.12, wobble: true, accentColor: BLUE, lineHeight: 1.02 })
  const H2 = popText(root, "Someone's sky | lines up with *yours.*", { top: 200, size: 96, accentSize: 150, at: T.h2, gap: 0.07, late: 1, lateAt: T.h2Land, wobble: true, accentColor: GOLD, lineHeight: 1.04 })
  const H3 = popText(root, 'You are not | arriving *alone.*', { top: 220, size: 110, accentSize: 180, at: T.h3, gap: 0.09, late: 1, lateAt: T.h3Land, wobble: true, accentColor: GOLD, lineHeight: 1.0 })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out]]
  const box1 = dialogueBox(root, { lines: LINES1.slice(0, 1), y: 1440, width: 960, height: 300, open: T.open1, close: 6.4, cps: CPS })
  const box1b = dialogueBox(root, { lines: LINES1.slice(1), y: 1440, width: 960, height: 300, open: LINES1[1].t - 0.22, close: T.close1, cps: CPS })
  const box2 = dialogueBox(root, { lines: LINES2, y: 1440, width: 960, height: 300, open: T.open2, close: T.close2, cps: CPS })
  const lesson = buildLesson(root, LESSON)
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  function burst(t, cx, cy, t0, n, R, seed, cols = [GOLD, BONE, PINK, '#ffd98a'], dur = 0.7, sz = 26) {
    const tt = t - t0
    if (tt < 0 || tt > dur) return
    const p = ease.outCubic(tt / dur)
    x.save(); x.globalAlpha = 1 - ease.inQuad(tt / dur)
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 + seed
      drawPixelStar(x, cx + Math.cos(a) * R * (0.4 + 0.8 * p), cy + Math.sin(a) * R * (0.4 + 0.8 * p), sz * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length])
    }
    x.restore()
  }

  // the camera zoom: 1 → 0.09 over the pull-back (log-linear, eased)
  const zoomAt = t => Math.exp(lerp(0, Math.log(0.09), ease.inOutCubic(prog(t, ...T.pull))))

  /** one window, drawn at screen (sx, sy) top-left, size (w, h); lit = warm glow; hero = the person + phone */
  function drawWindow(sx, sy, w, h, lit, hero, t) {
    x.fillStyle = '#0b0a14'; x.fillRect(sx - w * 0.04, sy - h * 0.04, w * 1.08, h * 1.08)
    if (!lit) { x.fillStyle = '#1a1830'; x.fillRect(sx, sy, w, h); return }
    const g = x.createLinearGradient(0, sy, 0, sy + h); g.addColorStop(0, hero ? '#8a6a9c' : '#b98d58'); g.addColorStop(1, hero ? '#3a2c55' : '#6e4a2a')
    x.fillStyle = g; x.fillRect(sx, sy, w, h)
    if (w < 30) return
    // curtains + cross bar
    x.fillStyle = hero ? 'rgba(120,100,180,0.45)' : 'rgba(255,220,170,0.35)'; x.fillRect(sx, sy, w * 0.14, h); x.fillRect(sx + w * 0.86, sy, w * 0.14, h)
    x.fillStyle = '#0b0a14'; x.fillRect(sx, sy + h * 0.38, w, Math.max(2, h * 0.03))
    if (hero) {
      // the person: head + shoulders, lit blue from below by the phone
      const c = w / 30
      x.fillStyle = '#100d1c'
      x.beginPath(); x.arc(sx + w * 0.5, sy + h * 0.5, c * 4.2, 0, Math.PI * 2); x.fill()
      x.beginPath(); x.ellipse(sx + w * 0.5, sy + h * 1.0, c * 9, c * 8, 0, Math.PI, 0); x.fill()
      const gl = x.createRadialGradient(sx + w * 0.5, sy + h * 0.66, 2, sx + w * 0.5, sy + h * 0.66, w * 0.45)
      gl.addColorStop(0, 'rgba(120,190,255,0.55)'); gl.addColorStop(1, 'rgba(120,190,255,0)')
      x.fillStyle = gl; x.fillRect(sx, sy, w, h)
      x.fillStyle = '#bfe2ff'; x.fillRect(sx + w * 0.44, sy + h * 0.68, c * 3.4, c * 1.6)
    }
  }

  function drawCity(t) {
    const z = zoomAt(t)
    const a = 1 - prog(t, T.earth[0] - 0.3, T.earth[0] + 0.4)
    if (a <= 0) return
    x.save(); x.globalAlpha = a
    const cw = CW * z, ch = CHh * z
    const c0 = Math.floor((0 - FOCUS.x) / cw) - 1, c1 = Math.ceil((W - FOCUS.x) / cw) + 1
    const r0 = Math.floor((0 - FOCUS.y) / ch) - 1, r1 = Math.min(ROWS_DOWN, Math.ceil((1920 - FOCUS.y) / ch) + 1)
    for (let c = c0; c <= c1; c++) {
      const b = Math.floor(c / 3)
      const top = -bHeight(b)
      for (let r = Math.max(r0, top); r <= r1; r++) {
        const sx = FOCUS.x + (c * CW - WIN_W / 2) * z
        const sy = FOCUS.y + (r * CHh - WIN_H / 2) * z
        // the building wall behind this cell
        x.fillStyle = (b & 1) ? '#14122a' : '#100e22'
        x.fillRect(FOCUS.x + (c * CW - CW / 2) * z - 0.5, FOCUS.y + (r * CHh - CHh / 2) * z - 0.5, cw + 1, ch + 1)
        if (r === ROWS_DOWN) continue
        const hero = c === 0 && r === 0
        const near = Math.abs(c) <= 1 && Math.abs(r) <= 1
        const lit = hero || (!near && hash(c, r) < 0.34) || BUBBLE_WIN.some(B => B.c === c && B.r === r)
        drawWindow(sx, sy, WIN_W * z, WIN_H * z, lit, hero, t)
      }
    }
    // the ground under the city
    const gy = FOCUS.y + (ROWS_DOWN * CHh - CHh / 2) * z
    if (gy < 1920) { x.fillStyle = '#07060f'; x.fillRect(0, gy, W, 1920 - gy) }
    // the bubbles: same words, three windows (screen-sized, so they read at any zoom)
    BUBBLE_WIN.forEach((B, i) => {
      const t0 = T.bubbles[i]
      const p = easeOutBack(prog(t, t0, t0 + 0.3), 2.2)
      if (p <= 0 || t > T.earth[0]) return
      const wx = FOCUS.x + B.c * CW * z, wy = FOCUS.y + (B.r * CHh - WIN_H / 2) * z
      x.font = `700 38px ${MONO}`
      const tw = x.measureText(B.text).width + 44
      const bxs = clamp(wx, tw / 2 + 40, W - tw / 2 - 40), bys = Math.max(wy - 20, 600 + i * 10)
      x.save(); x.translate(bxs, bys); x.scale(p, p)
      x.fillStyle = i === 2 ? '#fff1c8' : '#f4f1fb'
      x.beginPath(); x.roundRect(-tw / 2, -88, tw, 72, 18); x.fill()
      x.beginPath(); x.moveTo(-10, -17); x.lineTo(10, -17); x.lineTo(0, 0); x.fill()
      x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(B.text, 0, -51)
      x.restore()
    })
    x.restore()
  }

  // the pixel Earth: shrinks from filling the frame to a dot
  function drawEarth(t) {
    const p = prog(t, ...T.earth)
    if (p <= 0 || t > T.cut2 + 0.1) return
    const R = Math.exp(lerp(Math.log(1300), Math.log(5), ease.inOutCubic(p)))
    const a = clamp(prog(t, T.earth[0] - 0.3, T.earth[0] + 0.4))
    const cx = 540, cy = 860
    x.save(); x.globalAlpha = a
    const g = x.createRadialGradient(cx, cy, R * 0.9, cx, cy, R * 1.25); g.addColorStop(0, 'rgba(110,170,255,0.4)'); g.addColorStop(1, 'rgba(110,170,255,0)')
    x.fillStyle = g; x.beginPath(); x.arc(cx, cy, R * 1.25, 0, Math.PI * 2); x.fill()
    x.fillStyle = '#0d1a3c'; x.beginPath(); x.arc(cx, cy, R, 0, Math.PI * 2); x.fill()
    x.save(); x.beginPath(); x.arc(cx, cy, R, 0, Math.PI * 2); x.clip()
    // land blobs + city lights in chunky cells
    const cell = Math.max(2, R / 40)
    for (let i = 0; i < 260; i++) {
      const u = hash(i, 3) * 2 - 1, v = hash(i, 9) * 2 - 1
      if (u * u + v * v > 1) continue
      const land = Math.sin(u * 4 + 1.3) + Math.cos(v * 5 - 0.4) > 0.6
      if (!land) continue
      x.fillStyle = hash(i, 11) < 0.35 ? '#ffd98a' : '#1d2f55'
      x.fillRect(cx + u * R - cell / 2, cy + v * R - cell / 2, cell, cell)
    }
    x.restore()
    x.strokeStyle = 'rgba(150,200,255,0.7)'; x.lineWidth = Math.max(1, R / 60); x.beginPath(); x.arc(cx, cy, R, 0, Math.PI * 2); x.stroke()
    x.restore()
  }

  // ♓ Pisces arrives in the pull-back, sobbing
  function drawPisces(t) {
    if (t < T.pisces || t > T.cut2) return
    const pk = easeOutBack(prog(t, T.pisces, T.pisces + 0.35), 2) * outK(t, [12.0, 12.2])
    const r = drawStarChar(x, PISCES_P.x, PISCES_P.y, PISCES_P.size, t, { ...PISCES, mood: 'squint', look: [1, -1], pop: pk, squash: Math.abs(Math.sin((t - T.pisces) * 9)) * 0.07, seed: 7 })
    for (let i = 0; i < 6; i++) {
      const ph = ((t - T.pisces) * 1.4 + i / 6) % 1, side = i % 2 ? 1 : -1
      drawBits(x, TEAR, { X: '#8fd3ff', W: '#e9f7ff' }, Math.round(PISCES_P.x + side * (28 + ph * 55)), Math.round(r.y - 10 + ph * 140 - Math.sin(ph * Math.PI) * 36), 5, { alpha: (1 - ph) * pk })
    }
  }

  // beat 3: ♉ and ♎ drift in from opposite edges, a gold line snaps between them; tonight's deck fans in
  function drawMatch(t) {
    if (t < T.signs[0] || t > T.propsOut[1]) return
    const ok = 1 - ease.inQuad(prog(t, ...T.propsOut))
    const m = ease.inOutCubic(prog(t, ...T.signs))
    const ax = lerp(-120, 300, m), bx = lerp(1200, 780, m), yy = 790
    if (t > T.snap) {
      const k = ease.outCubic(prog(t, T.snap, T.snap + 0.35))
      x.save(); x.globalAlpha = ok; x.strokeStyle = GOLD; x.lineWidth = 8; x.shadowColor = GOLD; x.shadowBlur = 24
      x.beginPath(); x.moveTo(ax + 80, yy); x.lineTo(lerp(ax + 80, bx - 80, k), yy); x.stroke(); x.restore()
      burst(t, 540, yy, T.snap + 0.3, 12, 200, 0.5)
    }
    const mood = t < T.snap ? 'neutral' : t < T.snap + 0.5 ? 'wide' : 'heart'
    drawStarChar(x, ax, yy, 170, t, { ...TAURUS, mood, look: t < T.snap ? [1, 0] : [1, 0], alpha: ok, seed: 4 })
    drawStarChar(x, bx, yy, 170, t, { ...LIBRA, mood, look: t < T.snap ? [-1, 0] : [-1, 0], alpha: ok, seed: 9 })
    // tonight's deck: five card backs deal into a fan
    if (BACK && t > T.deck) {
      for (let i = 0; i < 5; i++) {
        const t0 = T.deck + i * 0.14
        const p = ease.outCubic(prog(t, t0, t0 + 0.4))
        if (p <= 0) continue
        const ang = (i - 2) * 0.16, cw = 190, chh = cw * BACK.height / BACK.width
        x.save(); x.globalAlpha = ok * clamp(p * 3)
        x.translate(lerp(540, DECK.x + (i - 2) * 70, p), lerp(-300, DECK.y + Math.abs(i - 2) * 16, p)); x.rotate(lerp(-1.2, ang, p))
        x.drawImage(BACK, -cw / 2, -chh / 2, cw, chh); x.restore()
      }
      burst(t, DECK.x, DECK.y, T.deck + 0.7, 10, 280, 1.3)
    }
  }

  // the last beat: a ring of sign stars pops in round the gold star, all looking at you
  function drawRing(t, h) {
    if (t < T.ring || !h) return
    const ok = popOut(t, T.out)
    const ids = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces']
    ids.forEach((id, i) => {
      const t0 = T.ring + i * 0.09
      const pk = easeOutBack(prog(t, t0, t0 + 0.3), 2.2) * ok
      if (pk <= 0) return
      const a = -Math.PI / 2 + (i / 12) * Math.PI * 2
      const R = 360 + (i % 2) * 40
      const s = signStar(id)
      drawStarChar(x, h.hx + Math.cos(a) * R, h.hy + 20 + Math.sin(a) * R * 0.78, 110, t, { ...s, glyph: null, mood: t > T.wink[0] ? 'happy' : 'neutral', look: [0, 0], pop: pk, seed: 20 + i, tips: false, glow: 0.7 })
    })
  }

  function heroState(t) {
    if (t < T.peek[1]) return { mood: 'neutral', look: [-1, 1] }
    if (t < T.taps[2] + 0.4) return { mood: 'happy', look: [-1, 1] }
    if (t < T.cut1) return { mood: 'neutral', look: [0, 0] }
    if (t < T.bubbles[2]) return { mood: 'wide', look: [-1, -1], blink: false }
    if (t < T.bubbles[2] + 0.5) return { mood: 'squint', look: [-1, -1] }
    if (t < T.cut2) return { mood: 'sparkle', look: [-1, -1] }
    if (t < T.snap) return { mood: 'neutral', look: [-1, -1] }
    if (t < T.lesson) return { mood: 'happy', look: [-1, -1] }
    if (t < T.cut3) return { mood: 'happy' }
    if (t >= T.wink[0] && t < T.wink[1]) return { mood: 'wink' }
    return { mood: 'sparkle', look: [0, 0] }
  }
  function drawHero(t) {
    const ok = popOut(t, T.out)
    if (ok <= 0) return null
    let P = PEEK
    let px = PEEK.x
    if (t < T.cut1) px = lerp(1250, PEEK.x, ease.outCubic(prog(t, ...T.peek)))
    if (t >= T.cut1 - 0.05) { const m = ease.inOutCubic(prog(t, T.cut1 - 0.05, T.cut1 + 0.5)); P = { x: lerp(PEEK.x, STAR_B.x, m), y: lerp(PEEK.y, STAR_B.y, m), size: STAR_B.size }; px = P.x }
    if (t >= T.cut2) { P = STAR_C; px = P.x }
    if (t >= T.lesson - 0.2 && t < T.cut3) { const m = ease.inOutCubic(prog(t, T.lesson - 0.2, T.lesson + 0.4)); P = { x: lerp(STAR_C.x, CL.x, m), y: lerp(STAR_C.y, CL.y, m), size: lerp(STAR_C.size, CL.size, m) }; px = P.x }
    if (t >= T.cut3) { P = FINAL; px = P.x }
    let sq = 0, lean = 0
    T.taps.forEach(tp => { const d = t - tp; if (d > 0 && d < 0.18) { sq += 0.06 * Math.sin(Math.PI * d / 0.18); lean = -12 * Math.sin(Math.PI * d / 0.18) } })
    if (t >= T.cut3) sq += 0.03 * Math.sin((t - T.cut3) * 2.4)
    const pin = t >= T.cut3 ? easeOutBack(prog(t, T.cut3 - 0.05, T.cut3 + 0.3), 1.8) : t >= T.cut2 ? easeOutBack(prog(t, T.cut2 - 0.05, T.cut2 + 0.3), 1.8) : 1
    const r = drawStarChar(x, px + lean, P.y, P.size, t, { color: STAR.sky, ...heroState(t), pop: pin * ok, squash: sq, seed: 2, hops: HOPS, glow: t >= T.cut3 ? 1.25 : 1 })
    return { r, hx: px, hy: r.y }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const inCity = t < T.earth[0] + 0.4
      drawSky(x, t, { ...SKY_H, dim: t < T.cut2 ? lerp(0.25, 0.5, prog(t, T.earth[0], T.earth[1])) : SKY_H.dim, zoom: t < T.cut2 ? lerp(1.2, SKY_H.zoom, prog(t, T.earth[0], T.cut2)) : SKY_H.zoom })
      if (t < T.out[1] + 0.02) {
        if (inCity) drawCity(t)
        drawEarth(t)
        drawPisces(t)
        drawMatch(t)
        const h = drawHero(t)
        if (h) {
          T.taps.forEach((tp, i) => { const d = t - tp; if (d > 0 && d < 0.3) { x.save(); x.globalAlpha = 1 - d / 0.3; x.fillStyle = BONE; x.font = `700 44px ${MONO}`; x.textAlign = 'center'; x.shadowColor = 'rgba(6,4,18,0.9)'; x.shadowBlur = 8; x.fillText('tik', h.hx - 170 - i * 14, h.hy + 70 - d * 60 + i * 40); x.restore() } })
          drawRing(t, h)
          burst(t, h.hx, h.hy, T.wink[0], 8, 260, 2.2, [GOLD, PINK], 0.6, 20)
        }
      }
      box1.update(t); box1b.update(t); box2.update(t)
      lesson.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [hd, o] of HEADS) hd.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 6.65 (the window → the pull-back), 12.27 (the drop → the sky), 18.35 (→ lesson), 22.65 (→ the
// last line). cardfx keeps two for a 30 s film: the 12.27 flip and the 22.65 shuffle.
const CUTS = [T.cut1, { t: T.cut2, kind: 'flip' }, 18.35, { t: T.cut3, kind: 'shuffle' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const FX = { bus: 'sfx', rev: 0.2, dly: 0 }
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  // 8 billion people: the window, the star peeks, taps the glass
  ...wordPops(T.h0, 2, 0.12, 0, 0.026), ['pop', T.h0Land, 1174.66, 0.05, 0], ['pluck', T.h0Land, 880, 0.035, 0.6, 0],
  ['whoosh', T.peek[0], 0.4, 0.025], ['pop', T.peek[1], 987.77, 0.035, 0.4],
  ...T.taps.map(tp => ['tick', tp, 0.08]), ...T.taps.map(tp => ['chip', +(tp + 0.005).toFixed(3), 3200, 0.03, { ...FX, wave: 'noise', gain: 0.02, decay: 0.02, sustain: 0.3, pan: 0.4 }]),
  ['pop', T.open1, 739.99, 0.04, 0], ['pop', T.open1 + 0.06, 987.77, 0.03, 0], ['pop', 6.4, 880, 0.03, 0], ['pop', LINES1[1].t - 0.22, 739.99, 0.035, 0],
  ...talkCues(LINES1, { cps: CPS }), ...talkCues(LINES2, { cps: CPS }),
  // the pull-back
  ['whoosh', T.pull[0], 1.4, 0.03], ['whoosh', T.earth[0], 1.6, 0.03],
  ...wordPops(T.h1, 5, 0.07, 1, 0.02), ['pop', T.h1Land, 987.77, 0.04, 0], ['pop', T.h1Land + 0.12, 1174.66, 0.04, 0],
  ...T.bubbles.map((b, i) => ['pop', b, i === 2 ? 1318.51 : 739.99, 0.04, [-0.4, 0.4, 0][i]]),
  ['chip', T.pisces + 0.1, 392, 0.6, { ...FX, wave: 'tri', vib: 0.12, slide: -4, gain: 0.03, decay: 0.5, sustain: 0.7 }],
  ['pop', T.close1, 880, 0.03, 0], ['pop', T.close1 + 0.07, 587.33, 0.03, 0],
  // someone's sky: the signs drift in, a gold line snaps, the deck deals
  ...wordPops(T.h2, 5, 0.07, 2, 0.02), ['pop', T.h2Land, 1318.51, 0.05, 0], ['pluck', T.h2Land, 1174.66, 0.04, 0.6, 0],
  ['pop', T.open2, 739.99, 0.04, 0], ['pop', T.open2 + 0.06, 987.77, 0.03, 0],
  ['whoosh', T.signs[0], 1.0, 0.02], ['pluck', T.snap, 1318.51, 0.045, 0.8, 0], ['bell', T.snap + 0.05, 1760, 0.028, 1.4, 0], ['glitter', T.snap + 0.3, T.snap + 0.9],
  ...[0, 1, 2, 3, 4].flatMap(i => [['tick', +(T.deck + i * 0.14 + 0.3).toFixed(3), 0.05], ['pop', +(T.deck + i * 0.14 + 0.3).toFixed(3), NOTE[i + 1], 0.025, (i - 2) * 0.2]]),
  ['glitter', T.deck + 0.7, T.deck + 1.2],
  ['pop', T.close2, 880, 0.03, 0],
  ...lessonCues(LESSON.at, { ...LESSON, key: 'F' }),
  // you are not arriving alone
  ...wordPops(T.h3, 3, 0.09, 1, 0.024), ['pop', T.h3Land, 1318.51, 0.05, 0], ['pluck', T.h3Land, 1174.66, 0.045, 0.7, 0],
  ...Array.from({ length: 12 }, (_, i) => ['pop', +(T.ring + i * 0.09 + 0.05).toFixed(3), NOTE[i % 7], 0.022, ((i % 4) - 1.5) * 0.25]),
  ['glitter', T.ring + 0.3, T.ring + 1.3],
  ['pluck', T.wink[0], 1318.51, 0.04, 0.5, 0], ['bell', T.wink[0] + 0.05, 1760, 0.022, 1.0, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
