// st4dealbreakers (20 s vertical Align ad, Star Talk season 4, EP 021, thread: dealbreakers) · story 0–15.6, then the end card.
//   0.00–6.10  "Houston dealbreakers, | *ranked.*"  A gold card rises: MY DEALBREAKERS. THE STARS' star stamps three chips on,
//              each stamp harder than the last: "✕ NO PLANS, ONLY VIBES", "✕ 'WE'LL SEE'", "✕ ONLY DATES INSIDE THE LOOP"
//              (a plain 610 shield pops up beside it). No numbers anywhere: the ranking reads "ALL TIED FOR FIRST."
//   6.20–12.0  "Say them | *up front.*"  The card shrinks up; a bone date star ("them") hops in and reads it.
//              Box (THE STARS): "knowing your dealbreakers isn't picky." → "it's *honest*." (the date star goes heart-eyed)
//              Ghost cameo (10.5): it peeks up from behind the card's top edge, right of centre, and ducks back.
//  12.15       card cut (flip).
//  12.25–15.5  "Know your | *no.*"  The star front and centre with the little card; hearts. Pops out by 15.5; end card at 15.6.
// One canvas (sky + constellation + card + stars), DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, STAR } from '../../startalk.js'
import { drawSeedConstellation, drawGhostCameo, episodeNumeral } from '../../stlore.js'

export const DURATION = 20
const EP = 21
const W = 1080
const STORY_END = DURATION - ENDCARD_LEN       // 15.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', LAV = '#c9a6ff', RED = '#ff5a5a', INK = '#1b1236'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', ui-monospace, monospace"
const SHADOW = '0 4px 30px rgba(6,4,18,0.9), 0 0 4px rgba(6,4,18,0.6)'
const BEAT = n => 0.6 + n * 0.5556            // 108 bpm grid

// ── the timeline
const T = {
  h0: 0.15, h0Land: 0.8, h0Out: [5.9, 6.1],
  cardUp: [0.45, 1.05], starIn: 0.9, chips: [BEAT(2), BEAT(4), BEAT(6)], tied: 4.6,
  h1: 6.2, h1Land: 6.6, shrink: [6.1, 6.6], dateIn: 6.55, open: 6.75, l1: 6.95, l2: 9.85, close: 11.95, h1Out: [11.8, 11.98],
  ghost: 10.55,
  cut: 12.15,
  h2: 12.25, h2Land: 12.65, wink: [13.6, 14.0], h2Out: [15.1, 15.32], out: [15.0, 15.45],
}
const SPEAK = 'THE STARS'
const LINES = [
  { t: T.l1, speaker: SPEAK, text: "knowing your dealbreakers isn't *picky.*" },
  { t: T.l2, speaker: SPEAK, text: "it's *honest.*" },
]
const CPS = 28
const LT = lineTimes(LINES, { cps: CPS })
const CHIPS = ['✕ NO PLANS, ONLY VIBES', "✕ 'WE'LL SEE'", '✕ ONLY DATES INSIDE THE LOOP']

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }

/** springy word-by-word type: `*word*` = accent (Garamond italic, colour), `|` = line break; the last `late` words pop at lateAt */
function popText(parent, text, { top, size, weight = 800, accentColor = GOLD, accentSize, gap = 0.07, at: t0, late = 0, lateAt = null, lateGap = 0.1, wobble = false, lineHeight = 1.02 }) {
  const box = el('div', { position: 'absolute', left: '70px', width: (W - 140) + 'px', top: top + 'px', textAlign: 'center',
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

const BMP = s => s.trim().split(/\s+/)
const HEART = BMP(`.H.H. HWHHH HHHHH .HHH. ..H..`)
function bits(x, bm, cx, cy, cell, cols, { rot = 0, a = 1 } = {}) {
  if (a <= 0) return
  const w = bm[0].length, h = bm.length
  x.save(); x.globalAlpha *= a; x.translate(Math.round(cx), Math.round(cy)); x.rotate(rot)
  x.fillStyle = 'rgba(14,8,32,0.88)'
  bm.forEach((r, j) => [...r].forEach((ch, i) => { if (ch !== '.') x.fillRect((i - w / 2) * cell - cell * 0.5, (j - h / 2) * cell - cell * 0.5, cell * 2, cell * 2) }))
  bm.forEach((r, j) => [...r].forEach((ch, i) => { if (ch === '.') return; x.fillStyle = cols[ch] || cols.X; x.fillRect((i - w / 2) * cell, (j - h / 2) * cell, cell + 0.5, cell + 0.5) }))
  x.restore()
}

// placements per beat: the card (centre + scale), the narrator star, the date star
const CARD = { w: 840, h: 600 }
const CARD_A = { x: 540, y: 930, k: 1 }, CARD_B = { x: 540, y: 860, k: 0.72 }, CARD_C = { x: 770, y: 840, k: 0.42 }
const STAR_A = { x: 205, y: 1500, s: 270 }, STAR_B = { x: 195, y: 1215, s: 230 }, STAR_C = { x: 470, y: 1150, s: 400 }
const DATE_B = { x: 885, y: 1215, s: 230 }
const STAR_HOPS = [T.starIn + 0.3, ...T.chips.map(c => c - 0.12), ...talkHops(LINES, SPEAK, { cps: CPS }), T.h2Land + 0.1, T.h2Land + 1.6]
const DATE_HOPS = [T.dateIn + 0.25, LT[1].done + 0.2, LT[1].done + 0.6]

function cardPos(t) {
  if (t >= T.cut) return CARD_C
  const e = ease.inOutCubic(prog(t, ...T.shrink))
  return { x: lerp(CARD_A.x, CARD_B.x, e), y: lerp(CARD_A.y, CARD_B.y, e), k: lerp(CARD_A.k, CARD_B.k, e) }
}
function starPos(t) {
  if (t >= T.cut) return STAR_C
  const e = ease.inOutCubic(prog(t, ...T.shrink))
  return { x: lerp(STAR_A.x, STAR_B.x, e), y: lerp(STAR_A.y, STAR_B.y, e) - Math.sin(Math.PI * e) * 70, s: lerp(STAR_A.s, STAR_B.s, e) }
}
function starState(t) {
  if (t < T.chips[0] - 0.3) return { mood: 'neutral', look: [1, -1] }
  if (t < T.chips[2] - 0.3) return { mood: 'squint', look: [1, -1] }                      // stamping with intent
  if (t < T.chips[2] + 0.6) return { mood: 'wide', look: [1, -1], blink: false }         // THE LOOP. the big one.
  if (t < T.tied) return { mood: 'squint', look: [1, 0] }
  if (t < T.h1) return { mood: 'happy' }
  if (t < LT[0].done) return { mood: 'neutral', look: [0, 0] }
  if (t < T.l2) return { mood: 'wink', look: [0, 0] }
  if (t < T.cut) return { mood: 'sparkle', look: [1, 0] }
  if (t >= T.wink[0] && t < T.wink[1]) return { mood: 'wink', look: [0, 0] }
  return { mood: t < T.h2Land + 0.2 ? 'happy' : 'heart' }
}
function dateState(t) {
  if (t < T.dateIn + 0.6) return { mood: 'neutral', look: [-1, -1] }
  if (t < LT[0].done - 0.4) return { mood: 'squint', look: [-1, -1] }                    // reading the card, suspicious
  if (t < T.l2) return { mood: 'wide', look: [-1, 0], blink: false }                       // oh. they just… said it.
  if (t < LT[1].done + 0.15) return { mood: 'sparkle', look: [-1, 0] }
  return { mood: 'heart' }
}

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 30px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const H0 = popText(root, 'Houston dealbreakers, | *ranked.*', { top: 210, size: 92, accentSize: 170, at: T.h0, late: 1, lateAt: T.h0Land, wobble: true, gap: 0.12, accentColor: RED, lineHeight: 1.05 })
  const H1 = popText(root, 'Say them | *up front.*', { top: 200, size: 112, accentSize: 160, at: T.h1, late: 2, lateAt: T.h1Land, lateGap: 0.12, wobble: true, gap: 0.09, accentColor: GOLD, lineHeight: 1.0 })
  const H2 = popText(root, 'Know your | *no.*', { top: 190, size: 140, accentSize: 240, at: T.h2, late: 1, lateAt: T.h2Land, wobble: true, gap: 0.1, accentColor: RED, lineHeight: 0.95 })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1400, width: 960, height: 300, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  function glow(cx, cy, r, col, a) {
    if (a <= 0) return
    x.save(); x.globalCompositeOperation = 'lighter'
    const g = x.createRadialGradient(cx, cy, 0, cx, cy, r)
    g.addColorStop(0, rgba(col, 0.45 * a)); g.addColorStop(0.45, rgba(col, 0.15 * a)); g.addColorStop(1, rgba(col, 0))
    x.fillStyle = g; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill(); x.restore()
  }

  // a plain freeway shield ("610"), squinting: Houston's Loop, no marks
  function shield(cx, cy, s, t) {
    x.save(); x.translate(cx, cy); x.scale(s, s); x.rotate(0.08 * Math.sin(t * 3))
    const path = () => { x.beginPath(); x.moveTo(-46, -50); x.quadraticCurveTo(0, -38, 46, -50); x.lineTo(46, 4); x.quadraticCurveTo(40, 40, 0, 58); x.quadraticCurveTo(-40, 40, -46, 4); x.closePath() }
    path(); x.fillStyle = INK; x.fill(); x.lineWidth = 12; x.strokeStyle = INK; x.stroke()
    path(); x.fillStyle = '#f4f1ea'; x.fill(); x.lineWidth = 5; x.strokeStyle = '#2b5fd6'; x.stroke()
    x.fillStyle = '#2b5fd6'; x.font = `800 34px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('610', 0, 6)
    x.restore()
  }

  // ── the dealbreakers card
  function drawCard(t) {
    if (t < T.cardUp[0]) return
    const P = cardPos(t), ok = popOut(t, T.out)
    let k = P.k
    if (t >= T.cut) k *= pop01(t, T.cut + 0.12, 0.4, 1.8)
    k *= ok
    if (k <= 0.01) return
    const up = easeOutBack(prog(t, ...T.cardUp), 1.4)
    const cx = P.x, cy = lerp(2300, P.y, up) + Math.sin(t * 1.7) * 5
    const w = CARD.w, h = CARD.h
    // the stamp shake: each chip hits harder than the last
    let shake = 0
    T.chips.forEach((t0, i) => { const d = t - t0 - 0.2; if (d > 0 && d < 0.35) shake += (4 + i * 7) * Math.sin(d * 70) * (1 - d / 0.35) })
    glow(cx, cy, 620 * k, GOLD, 0.35 * up)
    x.save(); x.translate(cx + shake, cy); x.rotate(lerp(0.12, t >= T.cut ? 0.06 : -0.02, up)); x.scale(k, k)
    x.save(); x.shadowColor = rgba(LAV, 0.6); x.shadowBlur = 50
    x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, 30); const g = x.createLinearGradient(0, -h / 2, 0, h / 2); g.addColorStop(0, '#2a1858'); g.addColorStop(1, '#160c34'); x.fillStyle = g; x.fill(); x.restore()
    x.lineWidth = 5; x.strokeStyle = GOLD; x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, 30); x.stroke()
    x.lineWidth = 2; x.strokeStyle = rgba(BONE, 0.3); x.beginPath(); x.roundRect(-w / 2 + 16, -h / 2 + 16, w - 32, h - 32, 20); x.stroke()
    x.textAlign = 'center'; x.textBaseline = 'middle'
    x.font = `700 32px ${MONO}`; x.fillStyle = GOLD; x.letterSpacing = '0.2em'; x.fillText('MY DEALBREAKERS', 6, -h / 2 + 72); x.letterSpacing = '0px'
    x.fillStyle = rgba(GOLD, 0.5); x.fillRect(-w / 2 + 60, -h / 2 + 112, w - 120, 3)
    CHIPS.forEach((label, i) => {
      const t0 = T.chips[i], p = t >= T.cut ? 1 : prog(t, t0, t0 + 0.22)
      const yy = -h / 2 + 200 + i * 132
      if (p <= 0) { x.setLineDash([10, 10]); x.lineWidth = 2; x.strokeStyle = rgba(BONE, 0.2); x.beginPath(); x.roundRect(-w / 2 + 50, yy - 44, w - 100, 88, 44); x.stroke(); x.setLineDash([]); return }
      const s = lerp(1.6 + i * 0.35, 1, ease.outCubic(p)) + 0.06 * Math.sin(Math.PI * clamp((t - t0 - 0.22) / 0.2))
      x.save(); x.translate(0, yy); x.rotate((i % 2 ? 1.6 : -1.4) * Math.PI / 180); x.scale(s, s); x.globalAlpha *= clamp(p * 2)
      x.font = `700 33px ${MONO}`
      const tw = x.measureText(label).width + 36
      x.beginPath(); x.roundRect(-tw / 2 - 18, -42, tw + 36, 84, 42); x.fillStyle = 'rgba(255,90,90,0.16)'; x.fill(); x.lineWidth = 4; x.strokeStyle = RED; x.stroke()
      x.fillStyle = '#ffd0d0'; x.fillText(label, 0, 2)
      x.restore()
      // stamp dust
      const dt = t - t0 - 0.2
      if (dt > 0 && dt < 0.4 && t < T.cut) { x.save(); x.globalAlpha = 1 - dt / 0.4; x.fillStyle = BONE; for (let q = 0; q < 10; q++) { const a = q / 10 * Math.PI * 2; x.fillRect(Math.cos(a) * (w * 0.44 + dt * 160) - 4, yy + Math.sin(a) * (50 + dt * 90) - 4, 8, 8) } x.restore() }
    })
    // the 610 shield, squinting at its own chip
    const sk = t >= T.cut ? 1 : pop01(t, T.chips[2] + 0.25, 0.35, 2.4)
    if (sk > 0.01) {
      const sy = -h / 2 + 200 + 2 * 132 - 100
      shield(w / 2 - 70, sy, 0.95 * sk, t)
    }
    x.restore()
    // the ranking: no numbers
    const tk = t < T.cut ? pop01(t, T.tied, 0.34, 2.2) * outK(t, T.h0Out) : 0
    if (tk > 0.01) {
      x.save(); x.translate(540, cy + h / 2 * k + 64); x.scale(tk, tk); x.rotate(-0.02)
      x.font = `700 34px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.letterSpacing = '0.12em'
      const label = 'RANKING: ALL TIED FOR FIRST.', tw = x.measureText(label).width + 40
      x.fillStyle = 'rgba(13,8,32,0.88)'; x.beginPath(); x.roundRect(-tw / 2, -32, tw, 64, 12); x.fill()
      x.lineWidth = 3; x.strokeStyle = rgba(GOLD, 0.8); x.stroke()
      x.fillStyle = GOLD; x.fillText(label, 6, 2); x.letterSpacing = '0px'
      x.restore()
    }
    return { cx, cy, k, top: cy - h / 2 * k }
  }

  function drawStar(t) {
    const ok = popOut(t, T.out)
    let pk = pop01(t, T.starIn, 0.38, 2.1)
    if (t >= T.cut) pk = pop01(t, T.cut + 0.1, 0.36, 2)
    pk *= ok
    if (pk <= 0.02) return
    const P = starPos(t), st = starState(t)
    let sq = 0
    T.chips.forEach((t0, i) => { const d = t - t0; if (d > -0.15 && d < 0.45) sq += (d < 0 ? -0.12 : 0.18 * Math.exp(-d * 8) * Math.cos(d * 24)) * (0.7 + i * 0.25) })
    drawStarChar(x, P.x, P.y, P.s * pk, t, { color: STAR.sky, ...st, squash: sq, hops: STAR_HOPS, seed: 3, glow: 1.1 })
  }
  function drawDate(t) {
    if (t < T.dateIn || t >= T.cut) return
    const k = pop01(t, T.dateIn, 0.4, 2.2)
    const hx = lerp(1250, DATE_B.x, ease.outCubic(prog(t, T.dateIn, T.dateIn + 0.4)))
    drawStarChar(x, hx, DATE_B.y, DATE_B.s * k, t, { color: STAR.bone, ...dateState(t), hops: DATE_HOPS, seed: 8, glow: 0.9 })
  }

  function sparkles(t, cx, cy, t0, n, R, seed, cols = [GOLD, BONE, PINK, RED]) {
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
  function floatHearts(t, cx, cy, t0, t1, seed, cell = 7, spread = 300) {
    for (let i = 0; i < 8; i++) {
      const born = t0 + i * 0.24, life = 1.6
      if (t < born || born > t1) continue
      const p = (t - born) / life
      if (p >= 1) continue
      const side = ((i * 37 + seed) % 7) / 6 - 0.5
      bits(x, HEART, cx + side * spread + Math.sin(p * 4 + i) * 16, cy - 80 - p * 220, cell * (0.7 + 0.5 * Math.sin(Math.PI * Math.min(1, p * 1.6))), { H: '#ff4f6e', W: '#ffd1de' }, { a: Math.sin(Math.PI * p) })
    }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      let shake = 0
      { const d = t - T.chips[2] - 0.2; if (d > 0 && d < 0.3) shake = 6 * Math.sin(d * 80) * (1 - d / 0.3) }
      drawSky(x, t, { ...SKY_H, dy: shake })
      drawSeedConstellation(x, t, EP)
      if (t < T.out[1] + 0.02) {
        const c = drawCard(t)
        if (c && t < T.cut) drawGhostCameo(x, t, { x: c.cx + 170, y: c.top + 2, at: T.ghost, dur: 1.4, from: 'below', cell: 3 })
        drawDate(t)
        drawStar(t)
        if (t < T.cut) floatHearts(t, DATE_B.x, DATE_B.y - 40, LT[1].done + 0.2, T.close - 0.4, 2, 6, 160)
        sparkles(t, DATE_B.x, DATE_B.y, LT[1].done + 0.1, 10, 170, 1)
        if (t >= T.cut) { sparkles(t, STAR_C.x, STAR_C.y, T.h2Land, 12, 280, 5); if (t > T.h2Land + 0.1) floatHearts(t, STAR_C.x, STAR_C.y - 60, T.h2Land + 0.1, T.out[0], 3, 9) }
      }
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [hd, o] of HEADS) hd.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 6.15 (inert: the ranking clears as "Say them up front" pops) and 12.15 (box shut → "Know your no.", plays).
const CUTS = [6.15, { t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, numeral: episodeNumeral(EP) }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  // houston dealbreakers, ranked: the card rises, three stamps (each harder)
  ...wordPops(T.h0, 2, 0.12, 0, 0.026), ['pop', T.h0Land, 1174.66, 0.05, 0], ['pluck', T.h0Land, 880, 0.035, 0.5, 0],
  ['whoosh', T.cardUp[0], 0.4, 0.035], ['pop', T.starIn, 739.99, 0.035, 0],
  ...T.chips.flatMap((c, i) => [['whoosh', +(c - 0.12).toFixed(3), 0.14, 0.02 + i * 0.01], ['tick', +(c + 0.2).toFixed(3), 0.05 + i * 0.01], ['pop', +(c + 0.2).toFixed(3), [220, 196, 164.81][i], 0.05 + i * 0.008, 0]]),
  ['boom', T.chips[1] + 0.2, 0.08], ['boom', T.chips[2] + 0.2, 0.13], ['pop', T.chips[2] + 0.5, 1318.51, 0.035, 0.3],
  ['pop', T.tied, 987.77, 0.04, 0], ['bell', T.tied + 0.05, 1318.51, 0.02, 0.9, 0],
  // say them up front: the card shrinks, the date star hops in, the box
  ...wordPops(T.h1, 2, 0.09, 1, 0.024), ['pop', T.h1Land, 1174.66, 0.045, 0], ['pop', T.h1Land + 0.12, 1318.51, 0.04, 0],
  ['whoosh', T.dateIn, 0.3, 0.03], ['pop', T.dateIn + 0.3, 659.25, 0.035, 0.4],
  ['pop', T.open, 739.99, 0.04, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES, { cps: CPS }),
  ['glitter', LT[1].done + 0.1, LT[1].done + 0.5], ['bell', LT[1].done + 0.12, 1760, 0.022, 1.2, 0.4],
  ['tick', T.ghost + 0.1, 0.02],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  // know your no
  ...wordPops(T.h2, 2, 0.1, 1, 0.028), ['pop', T.h2Land, 1318.51, 0.055, 0], ['pluck', T.h2Land, 1174.66, 0.05, 0.7, 0], ['glitter', T.h2Land, T.h2Land + 0.45],
  ['pluck', T.wink[0], 1318.51, 0.04, 0.5, 0], ['bell', T.wink[0] + 0.05, 1760, 0.022, 1.0, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
