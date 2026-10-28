// st4newyork (15 s vertical Align ad, Star Talk season 4 · EP 074, thread A: the vote, a city letter) · story 0–10.6, then
// the shared end card ("come" + the Align logo, cta SIGN UP TO VOTE YOUR CITY).
//   0.00–5.20  "Dear *New York.*"  A dense generic skyline (lit windows, no landmarks you could trademark). A pixel subway car
//              rattles in on an elevated track and jolts to a stop; the ♊ Gemini star is in the big middle window with a
//              buzzing phone. Five chat bubbles pop over the train, one per friend, all typing at once.
//              Drop (2.82): THE STARS: "you're busy. we know." → Gemini, eyes darting bubble to bubble, sweats.
//   5.20–8.45  "Five chats. | *Zero* plans."  THE STARS: "make *one* plan and keep it." → the bubbles pop one by one until only
//              "dinner fri?" is left; it slides to the middle, a reply lands ("yes!!" + a pixel heart), Gemini sparkles.
//   8.45 cut → "Busy isn't | an *excuse.*"  The train doors slide open; Gemini hops out onto the platform heart-eyed, the
//              kept chat over its head with a gold rim. Pops out by 10.45; the end card takes over at 10.6.
// Easter eggs: the seed constellation (EP 74) top-left; the ghost peeks up in the subway car's right-hand window.
// One canvas (sky + city + train), DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, signStar } from '../../startalk.js'
import { drawSeedConstellation, drawGhostCameo, episodeNumeral } from '../../stlore.js'

export const DURATION = 15
const EP = 74
const W = 1080
const STORY_END = DURATION - ENDCARD_LEN       // 10.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', CYAN = '#7fdcff'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', ui-monospace, monospace"
const SHADOW = '0 4px 30px rgba(6,4,18,0.9), 0 0 4px rgba(6,4,18,0.6)'
const GEM = signStar('gemini')

// ── the timeline
const T = {
  h0: 0.12, h0Out: [5.02, 5.2],
  train: [0.2, 1.15], buzz: 1.2,
  bubbles: [1.3, 1.52, 1.74, 1.96, 2.18],
  open: 2.62, l1: 2.82, sweat: 3.7,
  h1: 5.26, h1Land: 5.66, l2: 5.42, pops: [6.25, 6.45, 6.65, 6.85], slide: [7.0, 7.35], reply: 7.55, spark: 7.75,
  close: 8.35, h1Out: [8.2, 8.38],
  cut: 8.45,
  h2: 8.5, h2Land: 8.92, doors: [8.7, 9.05], hop: [9.05, 9.45], heart: 9.6, h2Out: [10.2, 10.42], out: [10.05, 10.45],
  ghost: 3.85,
}
const LINES = [
  { t: T.l1, speaker: 'THE STARS', text: "you're busy. we *know.*" },
  { t: T.l2, speaker: 'THE STARS', text: 'make *one* plan and keep it.' },
]
const CPS = 30
// the five friends' chats (index 2 is the one it keeps); popped in this order
const CHATS = [
  { text: 'brunch sat?', x: 270, y: 780 }, { text: 'drinks thu??', x: 800, y: 740 }, { text: 'dinner fri?', x: 540, y: 620 },
  { text: 'gym at 6?', x: 230, y: 935 }, { text: 'rain check?', x: 840, y: 905 },
]
const POP_ORDER = [4, 0, 3, 1]
const KEEP = 2, KEEP_AT = { x: 540, y: 850 }, KEEP_FIN = { x: 540, y: 820 }

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const hash = n => { const s = Math.sin(n * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s) }

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
const HEART = ['.H.H.', 'HWHHH', 'HHHHH', '.HHH.', '..H..']
const DROP = ['..X..', '.XWX.', 'XWXXX', 'XXXXX', '.XXX.']
const PHONE = ['KKKKK', 'KSSSK', 'KSsSK', 'KSSSK', 'KSsSK', 'KSSSK', 'KKwKK']
const PHONE_C = { K: '#2b2340', S: '#7fdcff', s: '#e9f7ff', w: '#9aa3b0' }

// ── the generic skyline: a few rows of blocky towers (stepped tops, a couple of plain spires), lit windows
const TOWERS = (() => {
  const out = []
  let xx = 40, n = 0
  for (const row of [{ base: 1080, hMin: 260, hMax: 560, col: '#1d1640', win: 0.5 }, { base: 1120, hMin: 160, hMax: 360, col: '#2a1f55', win: 0.75 }]) {
    xx = row === undefined ? 0 : (n ? 10 : 40)
    while (xx < 1060) {
      const w = 70 + Math.round(hash(n * 3 + 1) * 70), h = row.hMin + Math.round(hash(n * 3 + 2) * (row.hMax - row.hMin))
      out.push({ x: xx, w, top: row.base - h, base: row.base + 260, col: row.col, win: row.win, step: hash(n * 5) > 0.55, spire: hash(n * 7 + 1) > 0.82, n })
      xx += w + 6 + Math.round(hash(n * 11) * 16); n++
    }
  }
  return out
})()

// ── layout
const CAR = { x: 70, y: 1040, w: 940, h: 300 }
const BIG = { x: 380, y: 1072, w: 320, h: 222 }          // the middle window (Gemini)
const SIDE = [{ x: 140, y: 1092, w: 170, h: 150 }, { x: 770, y: 1092, w: 170, h: 150 }]
const GEMSEAT = { x: 540, y: 1200, size: 236 }
const PLATFORM = { x: 540, y: 1500, size: 320 }          // beat 3: hopped out (the box is gone, so it stands in front)

function gemState(t) {
  if (t < T.buzz) return { mood: 'happy', look: [0, 0] }
  if (t < T.l1) { const k = Math.floor((t - T.buzz) / 0.28) % 5; const c = CHATS[[2, 1, 0, 4, 3][k]]; return { mood: 'wide', look: [clamp((c.x - 540) / 260, -1, 1), -1], blink: false } }
  if (t < T.sweat) { const k = Math.floor((t - T.l1) / 0.2) % 4; return { mood: 'squint', look: [[-1, 1, -1, 1][k], -1], blink: false } }
  if (t < T.l2) return { mood: 'eyeroll' }
  if (t < T.pops[0]) return { mood: 'wide', look: [0, 0], blink: false }
  if (t < T.slide[1]) return { mood: 'neutral', look: [0, -1] }
  if (t < T.reply) return { mood: 'wide', look: [0, -1], blink: false }
  if (t < T.cut) return { mood: 'sparkle', look: [0, -0.6] }
  if (t < T.heart) return { mood: 'happy' }
  return { mood: 'heart' }
}

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, 'Dear | *New York.*', { top: 196, size: 120, accentSize: 200, at: T.h0, gap: 0.1, late: 2, lateAt: T.h0 + 0.3, lateGap: 0.12, wobble: true, accentColor: GEM.color, lineHeight: 0.96 })
  const H1 = popText(root, 'Five chats. | *Zero* plans.', { top: 196, size: 118, accentSize: 176, at: T.h1, gap: 0.08, late: 2, lateAt: T.h1Land, lateGap: 0.12, wobble: true, accentColor: CYAN, lineHeight: 0.98 })
  const H2 = popText(root, "Busy isn't | an *excuse.*", { top: 196, size: 126, accentSize: 200, at: T.h2, gap: 0.09, late: 1, lateAt: T.h2Land, wobble: true, accentColor: GOLD, lineHeight: 0.98 })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1400, width: 960, height: 300, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  function sparkles(t, cx, cy, t0, n, R, seed, cols = [GOLD, BONE, PINK]) {
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

  function drawCity(t, ok) {
    x.save(); x.globalAlpha = ok
    // a soft city glow behind the towers
    const g = x.createLinearGradient(0, 600, 0, 1200)
    g.addColorStop(0, 'rgba(255,120,200,0)'); g.addColorStop(1, 'rgba(255,140,190,0.16)')
    x.fillStyle = g; x.fillRect(0, 600, W, 600)
    for (const b of TOWERS) {
      x.fillStyle = INK; x.fillRect(b.x - 4, b.top - 4, b.w + 8, b.base - b.top + 4)
      x.fillStyle = b.col; x.fillRect(b.x, b.top, b.w, b.base - b.top)
      if (b.step) { x.fillStyle = INK; x.fillRect(b.x + b.w * 0.2 - 4, b.top - 44, b.w * 0.6 + 8, 44); x.fillStyle = b.col; x.fillRect(b.x + b.w * 0.2, b.top - 40, b.w * 0.6, 40) }
      if (b.spire) { x.fillStyle = b.col; x.fillRect(b.x + b.w / 2 - 4, b.top - (b.step ? 120 : 80), 8, b.step ? 80 : 80) }
      // windows: a grid, some lit (warm / cool), slow flicker per window
      for (let wy = b.top + 18; wy < 1330; wy += 26) for (let wx = b.x + 10; wx < b.x + b.w - 12; wx += 20) {
        const id = b.n * 997 + Math.round(wx) * 13 + Math.round(wy) * 7
        const on = hash(id) < 0.42 * b.win + 0.08 * Math.sin(t * 0.7 + id)
        if (!on) continue
        x.fillStyle = hash(id + 1) > 0.7 ? 'rgba(127,220,255,0.75)' : 'rgba(255,214,140,0.8)'
        x.fillRect(Math.round(wx), Math.round(wy), 8, 12)
      }
    }
    x.restore()
  }

  // the elevated track + the subway car (slides in from the right, jolts to a stop)
  function trainX(t) {
    const p = prog(t, ...T.train)
    const k = 1 - Math.pow(1 - p, 3)
    const jolt = t > T.train[1] && t < T.train[1] + 0.5 ? Math.sin((t - T.train[1]) * 30) * 10 * Math.exp(-(t - T.train[1]) * 8) : 0
    return lerp(1150, 0, k) + jolt
  }
  function drawTrack(ok) {
    x.save(); x.globalAlpha = ok
    x.fillStyle = INK; x.fillRect(0, 1340, W, 34)
    x.fillStyle = '#4a3a78'; x.fillRect(0, 1344, W, 10); x.fillStyle = '#2f2556'; x.fillRect(0, 1354, W, 16)
    for (let gx2 = 20; gx2 < W; gx2 += 90) { x.fillStyle = INK; x.fillRect(gx2, 1374, 16, 120); x.fillStyle = '#2f2556'; x.fillRect(gx2 + 4, 1374, 8, 120) }
    x.restore()
  }
  function drawCar(t, dx, ok, rattle) {
    const { x: cx0, y, w, h } = CAR, L = cx0 + dx, P = 8
    const ry = y + rattle
    x.save(); x.globalAlpha = ok
    x.fillStyle = INK; x.fillRect(L - P, ry, w + 2 * P, h); x.fillRect(L, ry - P, w, h + 2 * P)
    x.fillStyle = '#b9c2cf'; x.fillRect(L, ry, w, h)
    x.fillStyle = '#d8dee6'; x.fillRect(L, ry, w, 2 * P)
    for (let k = 0; k < 9; k++) { x.fillStyle = 'rgba(27,18,54,0.18)'; x.fillRect(L + 30 + k * 104, ry + 2 * P, 4, h - 4 * P) }   // fluting
    x.fillStyle = '#8f98a6'; x.fillRect(L, ry + h - 3 * P, w, 3 * P)
    // a coloured stripe (generic) under the windows
    x.fillStyle = '#7c74f0'; x.fillRect(L, ry + 238, w, 10)
    // wheels
    for (const wx of [L + 110, L + 230, L + w - 230, L + w - 110]) { x.fillStyle = INK; x.fillRect(wx - 30, ry + h - 8, 60, 22); x.fillStyle = '#4a4a5a'; x.fillRect(wx - 24, ry + h - 4, 48, 14) }
    x.restore()
  }
  function windowGlass(t, r, dx, rattle) {
    x.fillStyle = INK; x.fillRect(r.x + dx - 8, r.y + rattle - 8, r.w + 16, r.h + 16)
    const g = x.createLinearGradient(0, r.y, 0, r.y + r.h)
    g.addColorStop(0, '#fff4cf'); g.addColorStop(1, '#f3cf8a')
    x.fillStyle = g; x.fillRect(r.x + dx, r.y + rattle, r.w, r.h)
  }
  function windowShine(r, dx, rattle) {
    x.fillStyle = 'rgba(255,255,255,0.35)'
    for (let k = 0; k < 4; k++) x.fillRect(r.x + dx + 14 + k * 8, r.y + rattle + 14 + k * 8, 8, 8)
  }

  // a chat bubble (bone, ink text, a tail); typing dots when `typing`; gold rim when `gold`
  function bubble(t, text, cx, cy, k, { typing = false, gold = 0, tilt = 0, reply = false } = {}) {
    if (k <= 0.01) return
    x.save(); x.translate(Math.round(cx), Math.round(cy)); x.rotate(tilt); x.scale(k, k)
    x.font = `700 36px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    const bw = x.measureText(text).width + 52 + (typing ? 50 : 0), bh = 72, P = 7
    if (gold > 0) { x.globalAlpha = gold; x.fillStyle = GOLD; x.fillRect(-bw / 2 - 2 * P, -bh / 2 - P, bw + 4 * P, bh + 2 * P); x.fillRect(-bw / 2 - P, -bh / 2 - 2 * P, bw + 2 * P, bh + 4 * P); x.globalAlpha = 1 }
    x.fillStyle = INK; x.fillRect(-bw / 2 - P, -bh / 2, bw + 2 * P, bh); x.fillRect(-bw / 2, -bh / 2 - P, bw, bh + 2 * P)
    x.fillStyle = reply ? '#cfe9ff' : BONE; x.fillRect(-bw / 2, -bh / 2, bw, bh)
    const tx = reply ? bw / 2 - 30 : -bw / 2 + 30
    x.fillStyle = INK; x.fillRect(tx - 12, bh / 2, 24, 22); x.fillStyle = reply ? '#cfe9ff' : BONE; x.fillRect(tx - 6, bh / 2 - 2, 12, 16)
    x.fillStyle = INK; x.fillText(text, typing ? -22 : 0, 3)
    if (typing) {
      const n = 1 + Math.floor(t * 7 + cx * 0.01) % 3
      x.fillStyle = 'rgba(27,18,54,0.55)'
      for (let d = 0; d < 3; d++) x.fillRect(bw / 2 - 58 + d * 14, -4, 9, 9 * (d < n ? 1 : 0.4))
    }
    x.restore()
  }

  function drawChats(t, ok) {
    CHATS.forEach((c, i) => {
      const k0 = pop01(t, T.bubbles[i], 0.28, 2.6)
      const pi = POP_ORDER.indexOf(i)
      let k = k0 * ok
      if (pi >= 0) {
        const pp = prog(t, T.pops[pi], T.pops[pi] + 0.14)
        if (pp >= 1) { sparkles(t, c.x, c.y, T.pops[pi], 6, 70, i, [BONE, CYAN]); return }
        k *= 1 + 0.3 * Math.sin(Math.PI * pp) - pp
      }
      let cx = c.x, cy = c.y + Math.sin(t * 2.6 + i * 1.3) * 6
      let gold = 0
      if (i === KEEP) {
        const s = ease.inOutCubic(prog(t, ...T.slide))
        cx = lerp(c.x, KEEP_AT.x, s); cy = lerp(cy, KEEP_AT.y, s)
        if (t >= T.cut) { cx = KEEP_FIN.x; cy = KEEP_FIN.y + Math.sin(t * 2.6) * 6; gold = 1 }
        else gold = clamp(prog(t, T.reply, T.reply + 0.2))
      }
      const typing = t < T.l2 && t > T.bubbles[i] + 0.2
      const jitter = t < T.l2 ? Math.sin(t * 13 + i * 2) * 0.03 : 0
      bubble(t, c.text, cx, cy, k, { typing, gold, tilt: jitter + (i % 2 ? 0.03 : -0.03) })
    })
    // the reply to the one plan
    const rk = pop01(t, T.reply, 0.3, 2.6) * ok
    if (rk > 0.01) {
      const rx = t >= T.cut ? 640 : 680, ry = t >= T.cut ? 930 : 960
      bubble(t, 'yes!!   ', rx, ry, rk, { reply: true })
      drawBits(x, HEART, { H: '#ff4f86', W: '#ffd1de' }, rx + 62 * rk, ry, 6 * rk)
    }
  }

  function drawStage(t) {
    const ok = popOut(t, T.out)
    if (ok <= 0) return
    const fin = t >= T.cut
    drawCity(t, ok)
    drawTrack(ok)
    const dx = trainX(t)
    const moving = t < T.train[1] + 0.3
    const rattle = moving ? Math.round(Math.sin(t * 40) * 3) : 0
    drawCar(t, dx, ok, rattle)
    x.save(); x.globalAlpha = ok
    // side windows: commuters (little bone date stars) dozing; the ghost rises in the right one
    SIDE.forEach((r, i) => {
      windowGlass(t, r, dx, rattle)
      x.save(); x.beginPath(); x.rect(r.x + dx, r.y + rattle, r.w, r.h); x.clip()
      drawStarChar(x, r.x + dx + r.w / 2 + (i ? 30 : -20), r.y + rattle + r.h - 20, 110, t, { color: BONE, mood: 'sleepy', zzz: false, seed: 11 + i, glow: 0.4, tips: false })
      if (i === 1) drawGhostCameo(x, t, { x: r.x + dx + 50, y: r.y + rattle + r.h - 2, at: T.ghost, dur: 1.4, from: 'below', cell: 3 })
      x.restore()
      windowShine(r, dx, rattle)
    })
    // the big window: doors in beat 3 (two panels slide apart)
    windowGlass(t, BIG, dx, rattle)
    if (!fin) {
      x.save(); x.beginPath(); x.rect(BIG.x + dx, BIG.y + rattle, BIG.w, BIG.h); x.clip()
      const gulp = t >= T.sweat && t < T.sweat + 0.4 ? -0.1 * Math.exp(-(t - T.sweat) * 8) * Math.cos((t - T.sweat) * 20) : 0
      const hops = [T.train[1] + 0.05, ...T.bubbles.map(b => b + 0.05), ...T.pops, T.reply + 0.05]
      const r = drawStarChar(x, GEMSEAT.x + dx, GEMSEAT.y + rattle, GEMSEAT.size, t, { color: GEM.color, glyph: GEM.glyph, ...gemState(t), hops, squash: gulp, seed: 3, glow: 0.9 })
      // the phone at its right point, buzzing
      const bz = t > T.buzz && t < T.l2 ? Math.sin(t * 70) * 3 : 0
      drawBits(x, PHONE, PHONE_C, Math.round(r.x + 112 + bz), Math.round(r.y + 6), 7, { rot: -0.15 })
      x.restore()
      windowShine(BIG, dx, rattle)
      if (t > T.sweat && t < T.l2) for (let s = 0; s < 3; s++) {
        const d = (t - T.sweat - s * 0.4) % 1.2
        if (d < 0 || d > 0.7) continue
        drawBits(x, DROP, { X: '#8fd3ff', W: '#e9f7ff' }, Math.round(GEMSEAT.x - 70 - d * 60 + dx), Math.round(1110 + d * 60 + d * d * 120), 6, { alpha: 1 - d / 0.7 })
      }
      if (t > T.spark) sparkles(t, GEMSEAT.x + dx, GEMSEAT.y, T.spark, 10, 160, 1, [GOLD, GEM.color, BONE])
    } else {
      // doors slide apart, Gemini hops out to the platform in front of the car
      const dp = ease.inOutCubic(prog(t, ...T.doors))
      x.fillStyle = INK; x.fillRect(BIG.x + dx - 8, BIG.y - 8, BIG.w + 16, BIG.h + 16)
      x.fillStyle = '#3a2f66'; x.fillRect(BIG.x + dx, BIG.y, BIG.w, BIG.h)
      for (const s of [-1, 1]) {
        const pw = BIG.w / 2 * (1 - dp)
        if (pw < 1) continue
        const px = s < 0 ? BIG.x + dx : BIG.x + dx + BIG.w - pw
        x.fillStyle = '#b9c2cf'; x.fillRect(px, BIG.y, pw, BIG.h)
        x.fillStyle = '#f3cf8a'; x.fillRect(px + 12, BIG.y + 14, Math.max(0, pw - 24), 110)
      }
      // the platform: a slab with a yellow safety strip, in front of the track
      const sk = easeOutBack(prog(t, T.cut - 0.02, T.cut + 0.3), 1.4)
      x.fillStyle = INK; x.fillRect(0, 1606 + (1 - sk) * 300, W, 330)
      x.fillStyle = '#4a3f6e'; x.fillRect(0, 1614 + (1 - sk) * 300, W, 330)
      x.fillStyle = '#f2c75c'; x.fillRect(0, 1614 + (1 - sk) * 300, W, 14)
      for (let k = 0; k < 27; k++) { x.fillStyle = 'rgba(27,18,54,0.35)'; x.fillRect(k * 40 + 10, 1640 + (1 - sk) * 300, 20, 6) }
      const hp = prog(t, ...T.hop)
      const sx = lerp(GEMSEAT.x, PLATFORM.x, hp), sy = lerp(GEMSEAT.y, PLATFORM.y, ease.inOutCubic(hp)) - Math.sin(Math.PI * hp) * 120
      const sz = lerp(GEMSEAT.size, PLATFORM.size, hp)
      if (hp <= 0) {
        x.save(); x.beginPath(); x.rect(BIG.x + dx, BIG.y, BIG.w, BIG.h); x.clip()
        drawStarChar(x, GEMSEAT.x + dx, GEMSEAT.y, GEMSEAT.size, t, { color: GEM.color, glyph: GEM.glyph, ...gemState(t), seed: 3, glow: 0.9 })
        x.restore()
      } else {
        const r = drawStarChar(x, sx, sy, sz, t, { color: GEM.color, glyph: GEM.glyph, ...gemState(t), hops: [T.hop[1], T.heart], seed: 3, glow: 1.2 })
        sparkles(t, r.x, r.y, T.hop[1], 12, 200, 2, [GOLD, GEM.color, BONE, PINK])
        if (t > T.heart) for (let i = 0; i < 5; i++) {
          const born = T.heart + i * 0.22, p = (t - born) / 1.1
          if (p < 0 || p >= 1) continue
          drawBits(x, HEART, { H: '#ff4f86', W: '#ffd1de' }, Math.round(r.x - 160 + i * 80 + Math.sin(p * 6 + i) * 12), Math.round(r.y - 120 - p * 140), 6, { alpha: Math.sin(Math.PI * p) })
        }
      }
    }
    x.restore()
    if (t > T.bubbles[0] - 0.05) drawChats(t, ok)
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      drawSky(x, t, t < 3 ? { ...SKY_H, zoom: lerp(1.5, SKY_H.zoom, ss), dy: lerp(-24, 0, ss) } : SKY_H)
      drawSeedConstellation(x, t, EP)
      if (t < T.out[1] + 0.02) drawStage(t)
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 5.22 (H0 out → "Five chats.") and 8.45 (box shut → "Busy isn't an excuse.").
// cardfx keeps one for a 15 s film (the 8.45 one). End card flips at 10.6.
const CUTS = [5.22, { t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }),
  cardFrame({ start: 0, end: STORY_END, numeral: episodeNumeral(EP) }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  // dear new york: the train rattles in and jolts, the phone buzzes, five chats pop
  ...wordPops(T.h0, 1, 0.1, 0, 0.026), ['pop', T.h0 + 0.3, 1174.66, 0.045, 0], ['pop', T.h0 + 0.42, 1318.51, 0.04, 0],
  ['whoosh', T.train[0], 0.9, 0.05], ...[0.3, 0.45, 0.6, 0.75, 0.9].map(d => ['tick', +(T.train[0] + d).toFixed(3), 0.03]),
  ['boom', T.train[1], 0.1], ['tick', T.train[1] + 0.02, 0.05],
  ['tick', T.buzz, 0.03], ['tick', T.buzz + 0.06, 0.03], ['tick', T.buzz + 0.12, 0.03],
  ...T.bubbles.map((b, i) => ['pop', b, NOTE[(i * 2 + 1) % 7], 0.04, ((i % 3) - 1) * 0.4]),
  ['pop', T.open, 739.99, 0.04, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES, { cps: CPS }),
  ['pop', T.sweat, 440, 0.035, 0],
  ['pop', T.ghost + 0.1, 1567.98, 0.012, 0.4],
  // five chats, zero plans: pop pop pop pop, the one plan slides in, the reply
  ...wordPops(T.h1, 2, 0.08, 1, 0.024), ['pop', T.h1Land, 1174.66, 0.045, 0], ['pop', T.h1Land + 0.12, 1318.51, 0.04, 0],
  ...T.pops.map((p, i) => ['pop', p, NOTE[6 - i], 0.04, ((i % 2) - 0.5) * 0.6]),
  ['whoosh', T.slide[0], 0.35, 0.025], ['pluck', T.reply, 1318.51, 0.045, 0.5, 0.3], ['bell', T.reply + 0.05, 1760, 0.022, 1.0, 0.3],
  ['glitter', T.spark, T.spark + 0.45],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  // busy isn't an excuse: doors open, it hops out
  ...wordPops(T.h2, 2, 0.09, 2, 0.028), ['pop', T.h2Land, 1318.51, 0.055, 0], ['pluck', T.h2Land, 1174.66, 0.05, 0.7, 0],
  ['whoosh', T.doors[0], 0.35, 0.025], ['tick', T.doors[1], 0.03],
  ['pop', T.hop[0], 880, 0.04, 0], ['pop', T.hop[1], 1174.66, 0.045, 0], ['glitter', T.hop[1], T.hop[1] + 0.45],
  ['pluck', T.heart, 1174.66, 0.04, 0.5, 0], ['bell', T.heart + 0.05, 1760, 0.022, 1.0, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
